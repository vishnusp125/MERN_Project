import React, { useEffect, useRef, useState } from 'react'
import { getConversations } from '../../../axios/services/ConversationServices'
import { getMessages, postMessages } from '../../../axios/services/MessageServices'
import Conversation from '../../../Components/GuideComponents/Conversation/Conversation'
import NavbarGuide from '../../../Components/GuideComponents/Navbar/NavBar/Navbar'
import Message from '../../../Components/UserComponents/Message/Message'
import './Chat.css'
import { io } from "socket.io-client"

function Chat() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setcurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef()
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:5000");
        // socket.current = io("https://travelbuffbackend.onrender.com");
    }, [])

    useEffect(() => {
        if (socket.current) {
            socket.current.on("getMessage", (data) => {
                setArrivalMessage({
                    sender: data.senderId,
                    text: data.text,
                    createdAt: Date.now(),
                })
            })
        }

    }, [socket.current])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage?.sender) &&
            setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])


    const user = JSON.parse(localStorage.getItem("guide"))
    const userid = user?.result?._id;

    useEffect(() => {
        socket.current.emit("addUser", userid)
    }, [userid])

    useEffect(() => {
        const getConversatns = async () => {
            const response = await getConversations(userid)
            setConversations(response.data);
        }
        getConversatns()
    }, [userid])

    useEffect(() => {
        const getMessage = async () => {
            const response = await getMessages(currentChat?._id)
            setMessages(response)
        }
        getMessage()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedMessage = newMessage.trim()
        if (trimmedMessage !== "") {

            const message = {
                sender: userid,
                text: newMessage,
                conversationId: currentChat._id
            };

            const receiverId = currentChat.members.find(member => member !== userid)

            socket.current.emit("sendMessage", {
                senderId: userid,
                receiverId,
                text: newMessage,
            })

            try {
                const response = await postMessages(message)
                setMessages([...messages, response])
                setNewMessage("")

            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (
        <>
            <div style={{ height: "150px" }}>
                <NavbarGuide />
            </div>
            <div className='messenger mx-5'>
                <div className='chatMenu'><div className="chatMenuWrapper">
                    {/* <input type="text" placeholder='Search' className='chatMenuInput' /> */}
                    {conversations.map((c) => (
                        <div onClick={() => setcurrentChat(c)}>
                            <Conversation conversation={c} currentUser={userid} key={c._id} />
                        </div>
                    ))}
                </div>
                </div>
                <div className='chatBox'>
                    <div className="chatBoxWrapper">
                        {
                            currentChat
                                ? (
                                    <>
                                        <div className="chatBoxTop">
                                            {messages.map(m => (
                                                <div ref={scrollRef}>
                                                    <Message message={m} own={m.sender === userid} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="chatBoxBottom">
                                            <textarea
                                                className='chatMessageInput'
                                                placeholder='Write message ...'
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                value={newMessage}
                                            ></textarea>
                                            <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>
                                        </div>
                                    </>
                                ) : (
                                    <span className='noConversationText'>Open a conversation to start chat</span>
                                )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat