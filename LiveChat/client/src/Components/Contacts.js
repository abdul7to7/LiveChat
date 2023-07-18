import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
function Contacts({contacts,currentUser,setCurrentChatUser}) {
  const [currentUserName,setCurrentUserName]=useState(undefined);
  const [selectedUser,setSelectedUser]=useState(undefined);
  //console.log(contacts,currentUser);
  useEffect(()=>{
    if(currentUser){
      setCurrentUserName(currentUser.userName);
    }
  },[currentUser])


  const onClickhandle=(index)=>{
    setSelectedUser(index);
    setCurrentChatUser(contacts[index]);
  }
 
  //console.log(currentUser.userName);
  return (
    <>
      {
        currentUser && (
          <Container>
            <div className='brand'>
              <h3>ChatIo</h3>
            </div>
            <div className='contacts'>
            {
            contacts?.map((contact,index)=>{
              return (
                  
                  <div key={index} className={`contact ${index===selectedUser?"selected":""}`} onClick={()=>onClickhandle(index)}>
                      <h3  className='username'>{contact.userName}</h3>
                  </div>
              )
            })
            }
            
            </div>
            <div className='currentUser'>
              <h2 className='username'>{currentUserName}</h2>
            </div>
          </Container>
        )
      }
    </>
  )
}
const Container=styled.div`
  display:grid;
  grid-template-rows:10% 75% 15%;
  overflow:hidden;
  background-color:#080420;
  .brand{
    display:flex;
    align-items:center;
    justify-content:center;
    gap:1rem;
    img{
      height:2rem;
    }
    h3{
      color:white;
      text-transfrom:uppercase;
    }
  }
  .contacts{
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    gap:0.8rem;
    &::-webkit-scrollbar{
      width:0.2rem;
      &-thumb{
        background-color:#ffffff39;
        width:0.1rem;
        border-radius:1rem;
      }
    }
    .contact{
      background-color:#ffffff39;
      min-height:3.5rem;
      width:90%;
      cursor:pointer;
      border-radius:0.2rem;
      padding:0.4rem;
      gap:1rem;
      align-items:center;
      justify-content:center;
      display:flex;
      transition:0.2s ease-in-out;
      .username{
          color:white;
      }
    }
    .selected{
      background-color:#9186f3;
    }
  }
  .currentUser{
    background-color:#0d0d30;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:2rem;
    .username{
        color:white;
    }
  @media screen and (min-width:720px) and (max-width:1080px);
    gap:0.5rem;
    .username{
      font-size:1rem;
    }
  }
`

export default Contacts