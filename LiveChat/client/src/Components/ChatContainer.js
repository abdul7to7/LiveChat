import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import axios from 'axios'
import { BsArrowRight } from 'react-icons/bs'
import {v4 as uuidv4} from 'uuid'

function ChatContainer({currentChatUser,currentUser,socket}) {
  const scrollRef=useRef()
  const [messages,setMessages]=useState([])
  const [arrivalMessage,setArrivalMessage]=useState(null)
  useEffect(()=>{
    const fetchData = async()=> {
      const response=await axios.post("http://localhost:5000/api/messages/getmsg",{
      from:currentUser._id,
      to:currentChatUser._id,
    })
    setMessages(response.data);
    }
    fetchData(); 
  },[currentChatUser])
  const handleSendMsg=async (msg)=>{
    //alert(msg);
    await axios.post("http://localhost:5000/api/messages/addmsg",{
      from: currentUser._id,
      to: currentChatUser._id,
      message: msg,
    })
    socket.current.emit("send-msg",{
      to: currentChatUser._id,
      from : currentUser._id,
      message:msg,
    })
    const msgs =[...messages];
    msgs.push({ fromSelf:true, message:msg});
    setMessages(msgs);
  }

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-recieve",(msg)=>{
          setArrivalMessage({fromSelf:false, message:msg})
      })

    }
  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour:"smooth"});
  },[messages])
  return (
    
    <>
    {currentChatUser && (
      <Container>
        <div className='chat-header'>
          <div className='user-details'>
            <div className='username'>
              <h3>{currentChatUser.userName}</h3>
            </div>
          </div>
          <Logout/>
        </div>
        <div className="chat-messages">
          {messages &&
            messages?.map((message)=>{
                return(
                  <div ref={scrollRef} key={uuidv4()}>
                  <div className={`message ${message.fromSelf?"sended":"recieved"}`}>
                    <div className='content'>
                      <p>{message.message}</p>
                    </div>
                  </div>
                  </div>
                )
            })
          }
        </div>
        <ChatInput handleSendMsg={handleSendMsg}/>
      </Container>
    )}
    </>)
}

const Container=styled.div`
 padding-top:1rem;
 display:grid;
 grid-template-rows:10% 78% 12%;
 gap:0.1rem;
 overflow:hidden;
 @media screen and (min-width:720px) and (max-width:1080px){
  grid-auto-rows:15% 70% 15%;
 };
 .chat-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 2rem;
  .user-details{
    display:flex;
    align-items:center;
    gap:1rem;
    .username{
      h3{
        color:white;
      }
    }
  }
 }
 .chat-messages{
  padding:1rem 2rem;
  display:flex;
  flex-direction:column;
  gap:1rem;
  overflow:auto;
  .message{
    display:flex;
    align-items:center;
    .content{
      max-width:40%;
      overflow-wrap:break-word;
      padding:1rem;
      font-size:1.1rem;
      border-radius:1rem;
      color:#d1d1d1;
    }
  }
  .sended{
    justify-content:flex-end;
    .content{
      background-color:#4f04ff21;
    }
  }
  .recieved{
    justify-content:flex-start;
    .content{
      background-color:#9900ff20;
    }
  }
 }
`
export default ChatContainer