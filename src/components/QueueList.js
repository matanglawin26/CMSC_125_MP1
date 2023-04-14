import React from 'react'

const QueueList = ({ data }) => {
  // console.log("DATA: ",JSON.stringify(data));

  const queueKeys = Object.keys(data);
  // const key = Object.keys(data).__queue;

  const queueList = (key) => {
    return data[key].map(({user, req}, idx) => (
        <li key={idx}>
           User {user.id} (Waiting Time: {req.time()} s)
        </li>
    ))
  }
  const queue = queueKeys.map((key, index) => (
    <li key={index} style={{color:'#C0E2BF', fontSize:'20px'}}>
      Resource {key}
      <ul>
        {data[key].length? queueList(key) : <li>No Users Waiting!</li>}
      </ul>
    </li>
  ));
  // const queue = Object.values(data).map((item, index) => {
  //   console.log("ITEM: ", item)
  //   return (
    // <li key={index}>
    //   Resource {item} (R{item}):
    //   <ul>
    //   {/* {data[req.id].length > 0 ?        
    //     queueList(data[req.id])
    //     : <li>None</li>
    //   }       */}
    //   </ul>
    // </li>
  // )});

  return (
    <ul>
      {/* {queue} */}
      {queue}
    </ul>
  )
}

export default QueueList
