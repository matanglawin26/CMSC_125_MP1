import React from 'react'

const UserList = ({ data }) => {
  // console.log("DATA: ",JSON.stringify(data));

  const userArr = Object.values(data);

  const reqList = (user) => {
    return user.reqList().map((req, idx) => 
      (
        <li key={idx}>
          {req.toString()}
        </li>
      )
    )
  }

  const userReq = userArr.map((user, index) => (
    <li key={user.id}>
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
