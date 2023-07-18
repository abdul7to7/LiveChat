import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Contacts from '../Components/Contacts';
import Welcome from '../Components/Welcome';
import ChatContainer from '../Components/ChatContainer';
import {io} from "socket.io-client"
function Chat() {
  const socket=useRef();
  const navigate=useNavigate();
  const [currentUser,setCurrentUser]=useState(undefined);
  const [contacts,setContacts]=useState([]);
  const [currentChatUser,setCurrentChatUser]=useState(undefined);
  
  
  useEffect( ()=>{

    const getlocaluser=async ()=>{  
        if(!localStorage.getItem("ChatIo_User")){
          navigate("/login");
        }else{
          await setCurrentUser(JSON.parse(localStorage.getItem("ChatIo_User")));
        }
      }
    getlocaluser();  
    },[])

    useEffect(()=>{
      if(currentUser){
        socket.current=io("http://localhost:5000")
        socket.current.emit("add-user",currentUser._id)
      }
    },[currentUser])  
    
  useEffect(()=>{
    const getallcontacts=async()=>{
      
      try{
        if(currentUser){
          
        const data=await axios.get(`http://localhost:5000/api/auth/getallusers/${currentUser._id}`);
        setContacts(data.data.users);
        }
        
      }catch(err){
  
      }
    }
    
    getallcontacts();
   // console.log(`here-->${currentUser._id}`)
  },[currentUser])

  
  return (
    <Container>
      
      <div className='chatContainer'>
        <Contacts contacts={contacts} currentUser={currentUser} setCurrentChatUser={setCurrentChatUser}/>
        {
        currentChatUser===undefined?<Welcome currentUser={currentUser}/>:
        <ChatContainer currentChatUser={currentChatUser} currentUser={currentUser} socket={socket}/>
        }
      </div>
    </Container>
  )
}
const Container=styled.div`
height:100vh;
width:100vw;
display:flex;
justify-content:center;
flex-direction:column;
gap:1rem;
align-items:center;
background-color:#131324;
.chatContainer{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  display:grid;
  grid-template-columns:25% 75%;
  @media screen and (min-width:720px) and (max-width:1080px);
  grid-template-columns:35% 65%;
}
`
export default Chat