import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { useParams } from "react-router-dom";
import { getCollaborators } from "../services/collaboratorService";
import { jwtDecode } from "jwt-decode";
import { useContext } from 'react';
import AuthedUserContext from '../context/AuthedUserContext.js';

function CodeEditor() {
    const { id } = useParams();
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [code, setCode] = useState('');
    const [socket, setSocket] = useState(null);
    const token = useContext(AuthedUserContext);


    useEffect(() => {
        const checkAccess = async () => {
            if (!token) {
                console.error("🚨 No token.");
                setIsAuthorized(false);
                return;
            }

            try {
                const collaborators = await getCollaborators(id);
                const user = jwtDecode(token).user_id;
                const userIsCollaborator = collaborators.some(collaborator => collaborator.user == user);
                setIsAuthorized(userIsCollaborator);
            } catch (error) {
                console.error("Error checking access:", error.message);
                setIsAuthorized(false);
            }
        };

        checkAccess();
    }, [id, token]);

    useEffect(() => {

        const webSocket = new WebSocket(`${import.meta.env.VITE_DJANGO_WEBSOCKET_URL}${id}/`);
        setSocket(webSocket);

        webSocket.onerror = (error) => console.error("❌ WebSocket error:", error);
        webSocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.message !== undefined) {
                    setCode(data.message);
                } else {
                    console.warn("⚠️ WebSocket received an invalid message:", data);
                }
            } catch (error) {
                console.error("❌ Error parsing message from WebSocket:", error);
            }
        };
        return () => {
            if (webSocket.readyState === WebSocket.OPEN) {
                webSocket.close();
            }
        };

    }, [id]);


    useEffect(() => {
        Prism.highlightAll();
    }, [code]);

    const handleChange = (event) => {
        const newCode = event.target.value;
        setCode(newCode);

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ message: newCode }));
        }
    };

    if (isAuthorized === null) return <p>Verifying access...</p>;
    if (!isAuthorized) return <p>❌ You do not have permission to edit this project. Contact the owner.</p>;

    return (
        <div>
            <textarea value={code} onChange={handleChange} aria-label="Code Editor" />
            <pre>
                <code>{code}</code>
            </pre>
        </div>
    );
}
export default CodeEditor;