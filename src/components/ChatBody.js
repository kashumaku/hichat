import { AiOutlineSend } from 'react-icons/ai'
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { ImHome } from "react-icons/im";
import { BiMenuAltLeft } from "react-icons/bi";
import logo from '../images/logo.jpg'
import nochat from '../images/nochat.gif'

import { useContext, useState } from "react";
import { chatContext, toggleContext } from "../context";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ChatBody = ({ messages }) => {
    const [newMessage, setNewMessage] = useState("")
    const { userId } = useContext(chatContext) //current chat user
    const { setToggleMenu, setToggleFeeds, setToggleMessage } = useContext(toggleContext)
    const { chatUserId, chatUserName } = userId

    const logedInId = localStorage.getItem("id")

    const message = messages.filter(m => {
        return ((m.sender_id === chatUserId) && (m.receiver_id === logedInId)) || ((m.receiver_id === chatUserId) && (m.sender_id === logedInId))
    })

    const handelSendMessage = async (e) => {
        const date = new Date()
        //date format YYYY-MM-DDTHH:MM:SS
        const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), h = date.getHours(), mt = date.getMinutes(), s = date.getSeconds()
        const sentDate = (`${y}-${m}-${d}T${h}:${mt}:${s}`)
        const timeStamp = Timestamp.now()
        const messageCollection = collection(db, "messages")
        const messageContent = { message: newMessage, sender_id: chatUserId, receiver_id: logedInId, timestamp: timeStamp, sent_date: sentDate }
        await addDoc(messageCollection, messageContent, message)
        setNewMessage("")
    }

    return (
        <div className="w-full bg-gray-300 h-screen ">
            <div className="flex justify-between items-center  bg-black w-full h-[70px] px-2">
                {/* menu */}
                <BiMenuAltLeft size={30} fill="white"
                    onClick={() => {
                        setToggleMenu(true)
                        setToggleFeeds(false)
                        setToggleMessage(false)
                    }}
                />
                {/* home */}
                <ImHome size={25} fill="white"
                    onClick={() => {
                        setToggleFeeds(true)
                        setToggleMessage(false)
                        setToggleMenu(false)

                    }}
                />
                {/* message */}
                <HiChatBubbleOvalLeftEllipsis fill='white' size={30}
                    onClick={() => {
                        setToggleMessage(true)
                        setToggleFeeds(false)
                        setToggleMenu(false)
                    }} className='w-7 text-white cursor-pointer' />
                <div className="flex  gap-2  text-white items-center">
                    <img src={logo} alt="" className="rounded-full w-[30px] h-[30px]" />
                    <span>{chatUserName}</span>
                </div>
            </div>
            {chatUserId && <>
                <div className="lg:px-[100px] w-full bg-[#3b3b69] h-[95%] pb-[100px] overflow-y-scroll">
                    {message.length > 0 ? message.map(m => {
                        return (
                            <div key={m.id} className={`px-4 text-white flex flex-col ${m.receiver_id === logedInId ? 'items-end' : 'items-start'}`}>
                                <div className={`break-words px-3 py-1 mt-4 max-w-[300px] md:max-w-[450px] ${m.receiver_id === logedInId ? 'bg-indigo-400 rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px]' : 'bg-gray-500  rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px]'}`} >
                                    {m.message}
                                    <p className='text-orange-200  '>{new Date(m.sent_date).getFullYear()}-{new Date(m.sent_date).getMonth() + 1}-{new Date(m.sent_date).getDate()} {new Date(m.sent_date).getHours()}:{new Date(m.sent_date).getMinutes()} </p>
                                </div>
                            </div>
                        )
                    }) : <div className='w-full flex gap-36 flex-col items-center text-white'>
                        No chat
                        <img src={nochat} width={150} height={100} alt="" className='rounded-full' />
                    </div>}
                    <div className=" fixed bg-white bottom-0 flex items-center w-[100vw] max-w-[500px]">
                        <input className=' p-3 w-full  outline-none border-b border-b-blue-700 mb-2' placeholder="Write message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <svg className='w-10 h-10 mr-2 text-blue-600' aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <svg className='w-10 h-10 mr-2 text-blue-600' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"></path>
                        </svg>
                        <span onClick={handelSendMessage} className={`cursor-pointer mr-4 text-blue-600 ${newMessage.trim() ? 'inline' : 'hidden'}`}><AiOutlineSend size={30} /></span>
                    </div>
                </div>
            </>}

        </div>
    );
}

export default ChatBody;