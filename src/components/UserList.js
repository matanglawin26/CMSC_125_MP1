import React from 'react'

const UserList = ({ data }) => {
  // console.log("DATA: ",JSON.stringify(data));

  const userArr = Object.values(data);

  const reqList = (user) => {
    return user.reqList().map((req, idx) => 
      (
        <li key={idx}>
          {req.toString(true)}
        </li>
      )
    )
  }

  const userReq = userArr.map((user, index) => (
    <li key={user.id} style={{color:'#C0E2BF', fontSize:'20px'}}>
      User {user.id} (U{user.id}) 
      <ul>
        {reqList(user)}
      </ul>
    </li>
  ));

  return (
    <ul>
      {userReq}
    </ul>
  )
}

export default UserList
