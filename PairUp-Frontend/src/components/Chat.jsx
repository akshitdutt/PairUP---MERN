import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import createSocketConnection from "../utils/socket";
import { create } from "axios";

const Chat = () =>{
    const user = useSelector((store)=>store.user);
    const connections = useSelector((store) => store.connection);
    const userId = user?._id;
    const {targetID} = useParams();
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const targetUser = connections?.find(
    (connection) => connection._id === targetID
    );


    useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
        userId,
        targetID
    });

    

    socket.on("messageReceived", ({ text, senderId }) => {
        setMessages((messages) => [
            ...messages,
            {
                text,
                senderId
            }
        ]);
    });

    return () => {
        socket.disconnect();
    };
}, [userId, targetID]);


    const sendMessage = () =>{
        if (!newMessage.trim()) return;
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            userId, 
            targetID, 
            text: newMessage
        } )
        setNewMessage("");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-6">
    
    <div className="card bg-base-100 w-full max-w-5xl h-[85vh] shadow-2xl overflow-hidden">

    <div className="card-body p-0 h-full min-h-0">

        {/* Chat Header */}
        <div className="p-5 border-b shrink-0">
            <h2 className="card-title">
                {targetUser?.firstName} {targetUser?.lastName}
            </h2>

            <p className="text-sm text-gray-500">
                Online
            </p>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5">

            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`chat ${
                        message.senderId === userId
                            ? "chat-end"
                            : "chat-start"
                    }`}
                >
                    <div className="chat-bubble">
                        {message.text}
                    </div>
                </div>
            ))}

        </div>

        {/* Message Input */}
        <div className="p-4 border-t shrink-0">
            <div className="flex gap-3">

                <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    type="text"
                    placeholder="Type a message..."
                    className="input input-bordered flex-1"
                />

                <button
                    onClick={sendMessage}
                    className="btn btn-primary"
                >
                    Send
                </button>

            </div>
        </div>

    </div>
</div>
</div>
    );
}

export default Chat;