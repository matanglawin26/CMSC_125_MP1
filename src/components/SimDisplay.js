import React from 'react'

const SimDisplay = ({ data }) => {    
    const userArr = Object.values(data);

    const divStyles = (req) => {
      if(req.isExecuting()){
        return {
          backgroundColor: '#C0E2BF'
        }
      }else if(req.isWaiting()){
        return {
          backgroundColor: '#E0D263'
        }
      }else if(req.isDone()){
        return {
          backgroundColor: '#040F15',
          color: 'white'
        }
      }else{
        return {
          backgroundColor: '#6C757D'
        }
      }
    }

    const pStyles = (req) => {
      if(req.isExecuting()){
        return {
          color: 'black'
        }
      }else if(req.isWaiting()){
        return {
          color: 'black'
        }
      }else if(req.isDone()){
        return {
          color: 'white'
        }
      }else{
        return {
          color: 'black'
        }
      }
    }

    const reqList = (user) => {
        return user.reqList().map((req, idx) => 
          (
            <div key={idx} className="col">
              <div className='p-3' style={divStyles(req)}>
                <p className='text-center mb-0' style={pStyles(req)}>
                  {req.isDone() ? `R${req.id} Complete!`: req.toString()} 
                  {/* - {req.isWaiting()? "WAITING" : "NOT WAITING"} */}
                </p>
              </div>
            </div>
            // <div className={`col box-outline justify-content-center align-items-center ${req.isWaiting()? 'bg-warning' : 'bg-secondary'}`} key={idx}>
              // <p style={{textAlign:'center'}}>
              // {req.isDone() ? `R${req.id} Complete!`: req.toString()} - {req.isWaiting()? "WAITING" : "NOT WAITING"}
              // </p>
            // </div>
          )
        )
      }
    const userReq = userArr.map((user, index) => (
        <li key={user.id} className='mb-3'>
          User {user.id} Requests:
          <div className="container px-4">
            <div className="row gx-4">
              {reqList(user) }
              {/* {user.isComplete() ? "No Requests Left!" : reqList(user) } */}

              {/* <div class="col">
                <div class="p-3 border bg-light">Custom column padding</div>
              </div>
              <div class="col">
                <div class="p-3 border bg-light">Custom column padding</div>
              </div> */}


            </div>
          </div>

        {/* <div className="container px-4">
          <div className="row gx-5 d-flex req-div">
              {user.isComplete() ? "No Requests Left!" : reqList(user) }
          </div>
        </div> */}
        </li>
      ));
    // const userReq = userArr.map((user, index) => (
    //     <li key={user.id} className='mb-3'>
    //       User {user.id} Requests:
    //     <div className="container px-4">
    //       <div className="row gx-5 d-flex req-div">
    //           {user.isComplete() ? "No Requests Left!" : reqList(user) }
    //       </div>
    //     </div>
    //     </li>
    //   ));
    
  
    return (
        <ul>
            {userReq}
        </ul>
    )
}

export default SimDisplay
