import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import {Buffer} from 'buffer'

function SetAvatar() {
    const api="https://api.multiavatar.com/45678945";
    const navigate=useNavigate();
    const [avatars,setAvatars]=useState([]);
    const [selectedAvatar,setSelectedAvatar]=useState(undefined);

    const setProfilePic = async()=>{

    }
    const getAvatars=async ()=>{
        const data=[];
        for(let i=0;i<4;i++){
            try{
                
            const image=await axios.get(`${api}/${Math.round(Math.random()*30)}`)
            
            const buffer = new Buffer(image.data);
            
            data.push(buffer.toString("base64"));
            //console.log(data);
            }catch(err){

            }
        }
        setAvatars(data);
    }
    useEffect( ()=>{
    getAvatars();
    },[])
    
  return (
    <>
    <Container>
        <div className='titleContainer'>
            <h1>Pick an avatar as your profile picture</h1>

        </div>
        <div className='avatar'>
            {
                avatars.map((item,index)=>{
                    return (
                        <div key={index} className={`avatar ${selectedAvatar===index?"selected":""}`}>
                            <img src={`data:image/svg+xml;base64,${item}`} alt="avatar" onClick={()=>setSelectedAvatar(index)}/>
                        </div>
                    )
                })
            }
        </div>
    </Container>
    <ToastContainer/>
    </>
  )
}

const Container=styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:3rem;
background-color:#131324;
height:100vh;
width:100vw;
.loader{
    max-inline-size:100%;
}
.titleContainer{
    h1{
        color:white;
    }
}
.avatars{
    display:flex;
    gap:2rem;
    .avatar{
        border:0.4rem solid transparent;
        padding:0.4rem;
        border-radius:5rem;
        display:flex;
        justify-content:center;
        align-items:center;
        transition:0.5s ease-in-out;
        img{
            height:6rem;
        }
    }
    .selected{
        border:0.4rem solid #4e0eff;
    }
}
`

export default SetAvatar