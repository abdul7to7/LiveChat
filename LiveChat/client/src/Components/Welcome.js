import React from 'react'
import styled from 'styled-components'
function Welcome({currentUser}) {
  //console.log(currentUser);
  return (
    <Container>
        <h1>
            Welcome, <span>{currentUser?.userName}!</span>
        </h1>
        <h3>Please select a chat to start messages</h3>
    </Container>
  )
}

export default Welcome

const Container=styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
span{
    color:#4e0eff;
}
`