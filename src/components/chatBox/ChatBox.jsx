import React, {useEffect, useState} from "react";
import chatApi from "../../services/chatApi";

const ChatBox = (props) => {

    useEffect(() => {
        //initChat();
        //initWebSocket();
    });

    const [websocketServer, setWebsocketServer] = useState();
    const [messages, setMessages] = useState();

    const initChat = async () => {
        await chatApi.init();
    }

    const initWebSocket = () => {
        setWebsocketServer( new WebSocket("ws://localhost:8080/"), () => {
            websocketServer.onopen = (e) => {
                websocketServer.send(
                    JSON.stringify({
                        'type': 'socket',
                        'user_id': props.user.userId,
                    })
                );
            };

            websocketServer.onerror = (e) =>  {
                // Errorhandling
            }

            websocketServer.onmessage = (e) => {
                const json = JSON.parse(e.data);
                switch(json.type) {
                    case 'chat':
                        console.log(json.msg)
                        setMessages(...messages, json.msg);
                }
            }
        } );
    }

    const handleChange = (e) => {
        if(e.keyCode==13 && !e.shiftKey) {
            const chat_msg = e.target.value;
            websocketServer.send(
                JSON.stringify({
                    'type': 'chat',
                    'user_id': props.user.userId,
                    'chat_msg': chat_msg
                })
            );
        }
    }

    return(
        <>
            <div className="messages">
                {messages && messages.map((message) => (
                    <p>{message}</p>
                    )
                )}
            </div>
            <label>Tapez un message et inch'hallah</label>
            <input type="text" onChange={handleChange}/>
        </>
    )
}

export default ChatBox;