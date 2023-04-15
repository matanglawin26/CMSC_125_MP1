import React from 'react'

const QueueList = ({ data, using }) => {
  const queueKeys = Object.keys(data);
  
  const queueList = (key) => {
    return data[key].map(({user, req}, idx) => (
        <li key={idx}>
           User {user.id} (Waiting Time: {req.time()} s)
        </li>
    ))
  }

  const queue = queueKeys.map((key, index) => (
    <li key={index} style={{color:'#C0E2BF', fontSize:'20px'}}>
      Resource {key} - <span style={{fontSize:'initial', color:'#86E5F8'}}>(Current User: {using[key] ? `U${using[key]}` : "None"})</span>
      <ul>
        {data[key].length? queueList(key) : <li>No Users Waiting!</li>}
      </ul>
    </li>
  ));

  return (
    <ul>
      {queue}
    </ul>
  )
}

export default QueueList
