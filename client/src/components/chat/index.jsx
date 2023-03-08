import React from 'react'
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced'
import Ai from '../customMessageForms/Ai'
import AiAssist from '../customMessageForms/AiAssist'
import AiCode from '../customMessageForms/AiCode'
import StandartMessageForm from '../customMessageForms/StandartMessageForm'
import Header from '../header'

const Chat = ({user, secret}) => {
    const chatProps = useMultiChatLogic(
        import.meta.env.VITE_PROJECT_ID,
        user,
        secret
    )
    return (
        <div style={{ flexBasis: "100%" }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow
                {...chatProps}
                style={{ height: "100vh" }}
                renderChatHeader={(chat) => <Header chat={chat} />}
                renderMessageForm={(props) => {
                    if (chatProps.chat?.title.startsWith("AiChat_")) {
                        return <Ai props={props} activeChat={chatProps.chat} />
                    }
                    if (chatProps.chat?.title.startsWith("AiCode_")) {
                        return <AiCode props={props} activeChat={chatProps.chat} />
                    }
                    if (chatProps.chat?.title.startsWith("AiAssist_")) {
                        return <AiAssist props={props} activeChat={chatProps.chat} />
                    }
                    return (
                        <StandartMessageForm props={props} activeChat={chatProps.chat} />
                    )
                }}
            />
        </div>
    )
}

export default Chat
