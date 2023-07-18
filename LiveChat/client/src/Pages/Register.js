import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
function Register() {
    const navigate=useNavigate(); 
    
    useEffect(()=>{
        if(localStorage.getItem("ChatIo_User")){
            navigate("/");
        }
    },[]);

    

    const handleSubmit=async (event)=>{
        event.preventDefault();
        if(handleValidation()){
            const {userName,userMail,password}=values;
            console.log(values);
            const {data}= await axios.post("http://localhost:5000/api/auth/register",{
                userName,
                userMail,
                password
            })
            console.log(data);
            if(data.status===false){
                toast.error(data.message,toastOptions)
            }else{
                localStorage.setItem("ChatIo_User",JSON.stringify(data));
                navigate("/")
            }
        }
        
    }
    const handleChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value})
    }
    const [values,setValues]=useState({
        userName:"",
        userMail:"",
        password:"",
        confirmPassword:"",
    })
    const toastOptions={
        position:'bottom-right',
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark",
    }
    const handleValidation=()=>{
        const {userName,userMail,password,confirmPassword}=values;
        if(password!==confirmPassword){
            toast.error("Password and Confirm password are not the same",toastOptions)
            return false;
        }else if(password.length<8){
            toast.error("Password should have min 8 characters",toastOptions)
            return false;
        }else if(userName.length<3){
            toast.error("Username should have min 3 characters",toastOptions)
            return false;
        }else if(userMail.length<8){
            toast.error("Email should have min 8 characters",toastOptions)
            return false;
        }
        return true;
    }
  return (
    <div>
        <FormContainer>
        
            <form onSubmit={handleSubmit}>
            <div className="brand">
                    <img src="" alt=""/>
                    <h1>Chat.I-O</h1>
                </div>
                <input type='text' placeholder='User Name' name='userName' onChange={handleChange} />
                <input type='email' placeholder='User Mail' name='userMail' onChange={handleChange} />
                <input type='password' placeholder='Password' name='password' onChange={handleChange} />
                <input type='password' placeholder='Confirm Password' name='confirmPassword' onChange={handleChange} />
                <button type='submit'>Create User</button>
                <span>already have an account ? <Link to='/login' >Login</Link></span>
            </form>
        </FormContainer>
        <ToastContainer/>
    </div>
  )
}

const FormContainer=styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:#131324;
    .brand{
        display:flex;
        align-items:center;
        gap:1 rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        border-radius:2rem;
        background-color:#00000076;
        padding:3rem 5rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1rem;
            &:focus{
                border:0.1rem solid #997af0;
                outline:none;
            }
        }
        button{
            width:100%;
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none;
            font-weigt:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:upercase;
            transition:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{
            color:white;
            text-transform:uppercase;
            a{
                color:#4e0eff;
                text-decoration:none;
            }
        }
    }
`;

export default Register