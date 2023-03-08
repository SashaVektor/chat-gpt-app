import { usePostAiAssistMutation } from '@/state/api';
import React, { useEffect, useState } from 'react'
import MessageFormUi from './MessageFormUi'

function useDebounce(value, delay) {
    const [debouncedValue, setDebauncedValue] = useState();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebauncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }

    }, [delay, value])

    return debouncedValue
}

const AiAssist = ({ props, activeChat }) => {

    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [appendText, setAppendText] = useState("")
    const [triggerAssist, resultAssist] = usePostAiAssistMutation();

    
    const handleChange = e => setMessage(e.target.value)

    const handleSubmit = async () => {
        const date = new Date().toISOString()
            .replace("T", " ").replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`)
        const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
        const form = {
            attachments: at,
            created: date,
            sender_username: props.username,
            text: message,
            activeChatId: activeChat.id
        }

        props.onSubmit(form)
        setMessage("")
        setAttachment("")
    }

    const debouncedValue = useDebounce(message, 1000)

    useEffect(() => {
        if (debouncedValue) {
            const form = { text: message }
            triggerAssist(form)
        }
    }, [debouncedValue]) // eslint-disable-line

    const hanldeKeyDown = (e) => {
        if(e.keyCode === 9 || e.keyCode === 13) {
            e.preventDefault();
            setMessage(`${message} ${appendText}`)
        }
        setAppendText("");
    }

    useEffect(() => {
     if(resultAssist.data?.text) {
        setAppendText(resultAssist.data?.text)
     }   
    }, [resultAssist]) // eslint-disable-line

    return (
        <MessageFormUi
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            appendText={appendText}
            hanldeKeyDown={hanldeKeyDown}
        />
    )
}

export default AiAssist