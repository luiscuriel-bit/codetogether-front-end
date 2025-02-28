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
    const [isViewer, setIsViewer] = useState(null);
    const [isEditor, setIsEditor] = useState(null);
    const [code, setCode] = useState('');
    const [socket, setSocket] = useState(null);
    const token = useContext(AuthedUserContext);


    useEffect(() => {
        const checkAccess = async () => {
            if (!token) {
                console.error("🚨 No token.");
                setIsViewer(false);
                return;
            }

            try {
                const collaborators = await getCollaborators(id);
                const user = jwtDecode(token).user_id;
                const collaborator = collaborators.find(collaborator => collaborator.user === user);
                console.log(collaborator)
                if (collaborator) {
                    setIsViewer(true);
                    setIsEditor(collaborator.role === 'admin');
                } else {
                    setIsViewer(false);
                }

            } catch (error) {
                console.error("Error checking access:", error.message);
                setIsViewer(false);
            }
        };

        checkAccess();
    }, [id, token]);

    useEffect(() => {
        const webSocket = new WebSocket(`${import.meta.env.VITE_DJANGO_WEBSOCKET_URL}${id}/?token=${token}`);
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
            if (webSocket.readyState === WebSocket.OPEN && isEditor) {
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

        if (socket && socket.readyState === WebSocket.OPEN && isEditor) {
            socket.send(JSON.stringify({ message: newCode }));
        }
    };

    if (isViewer === null) return <p>Verifying access...</p>;
    if (!isViewer) return <p>❌ You do not have permission to edit this project. Contact the owner.</p>;

    // return (
    //     <div>
    //         <textarea value={code} onChange={handleChange} aria-label="Code Editor" readOnly={!isEditor} />
    //     </div>
    // );
    return (
        <div className="h-screen bg-gray-900 text-gray-100 pt-16">
            <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-mono font-semibold">Editor: {id}</h2>
                    <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
                        {isEditor ? "Admin" : "Viewer"}
                    </span>
                </div>

                <textarea
                    value={code}
                    onChange={handleChange}
                    readOnly={!isEditor}
                    className="w-full h-full font-mono text-sm bg-gray-800 p-6 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 border-none"
                    style={{ tabSize: 4 }}
                />
            </div>
        </div>
    );
}
export default CodeEditor;