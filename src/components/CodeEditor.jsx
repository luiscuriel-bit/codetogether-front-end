import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "../services/projectService";
import { getCollaborators } from "../services/collaboratorService";
import { jwtDecode } from "jwt-decode";

function CodeEditor({ initialCode = "", onChange, token }) {
    const { id } = useParams();
    const [isAuthorized, setIsAuthorized] = useState(null); 
    const [code, setCode] = useState(initialCode);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const checkAccess = async () => {
            if (!token) {
                console.error("🚨 No token.");
                setIsAuthorized(false);
                return;
            }

            try {
                const collaborators = await getCollaborators(id);
                const userId = jwtDecode(token).user_id;
                const userIsCollaborator = collaborators.some(collab => collab.user_id == userId);
                setIsAuthorized(userIsCollaborator);
            } catch (error) {
                console.error("Error checking access:", error);
                setIsAuthorized(false);
            }
        };

        checkAccess();
    }, [id, token]);

    useEffect(() => {
        const createSocket = async () => {
            const webSocket = new WebSocket(`ws://${import.meta.env.VITE_DJANGO_BACKEND_URL}/ws/code/${id}/`);
            setSocket(webSocket);

            webSocket.onopen = () => console.log("✅ Connected to WebSocket");
            webSocket.onerror = (error) => console.error("❌ WebSocket error:", error);

            webSocket.onmessage = (event) => {
                setCode(event.data.code);
            };
        };

        createSocket();
    }, [id]);

    useEffect(() => {
        const loadProject = async () => {
            const project = await fetchProjectById(id);
            setCode(project.description || '');
        };
        loadProject();
    }, [id]);

    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    const handleChange = event => {
        const newCode = event.target.value;
        setCode(newCode);
        if (socket) {
            socket.send(JSON.stringify({ code: newCode }));
        }
    };

    if (isAuthorized === null) return <p>Verificando permisos...</p>;
    if (!isAuthorized) return <p>No tienes acceso a este proyecto.</p>;

    return (
        <div>
            <textarea value={code} onChange={handleChange} />
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
}
export default CodeEditor;