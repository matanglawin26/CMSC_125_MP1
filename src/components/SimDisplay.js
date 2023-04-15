import React from 'react'

const SimDisplay = ({ data }) => {    
    const userArr = Object.values(data);

    const divStyles = (req) => {
      if(req.isDone()){
        return {
          backgroundColor: '#040F15',
        }
      }else if(req.isWaiting()){
        return {
          backgroundColor: '#E0D263'
        }
      }else if(req.isExecuting()){
        return {
          backgroundColor: '#C0E2BF'
        }
      }else{
        return {
          backgroundColor: '#6C757D'
        }
      }
    }

    const pStyles = (req) => {
      if(req.isDone()){
        return {
          color: 'white'
        }
      }else if(req.isWaiting()){
        return {
          color: 'black'
        }
      }else if(req.isExecuting()){
        return {
          color: 'black'
        }
      }else{
        return {
          color: '#FAFAFA'
        }
      }
    }

    const reqList = (user) => {
        return user.reqList().map((req, idx) => 
          (
            <div key={idx} className="col">
              <div className='p-3' style={divStyles(req)}>
                <p className='text-center mb-0 res-info' style={pStyles(req)}>
                  {req.isDone() ? `R${req.id} Complete!`: req.toString()} 
                </p>
              </div>
            </div>
          )
        )
      }
    const userReq = userArr.map((user, index) => (
        <li key={user.id} className='mb-3'>
          User {user.id} Requests:
          <div className="container px-4">
            <div className="row gx-4 gy-4">
              {user.isComplete() ? 
                <div className='p-3' style={{backgroundColor:'#129FBB'}}>
                  <p className='text-center mb-0 res-info' >
                    All Requests Completed!
                  </p>
                </div>
              : 
              reqList(user)}             
            </div>
          </div>
        </li>
      ));   
  
    return (
        <ul>
            {userReq}
        </ul>
    )
}

export default SimDisplay
