import { useEffect, useState } from 'react';
import { uniqueList, userArray } from './utils/helperFunctions';
import Simulation from './classes/Simulation';
import Display from './classes/Display';
// import User from './classes/User';
import Background from "./bg/Background";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/UserList';
import SimDisplay from './components/SimDisplay';
import QueueList from './components/QueueList';

function App() {
  const [isInitdisabled, setIsInitDisabled] = useState(false);
  const [isStartDisabled, setIsStartDisabled] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [userReqlist, setUserReqList] = useState({});
  const [init, setInit] = useState(false);
  const [userNum, setUserNum] = useState(0);
  const [resourceNum, setResourceNum] = useState(0);
  const [availableRes, setAvailableRes] = useState([]);
  const [userList, setUserList] = useState([]);
  const [users, setUsers] = useState([]);
  const [sim, setSim] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [queue, setQueue] = useState([])
  const [isComplete, setIsComplete] = useState(false);
  // const userNum = 5;
  // const userNum = Math.floor(Math.random() * 10) + 1;
  // const userNum = Math.floor(Math.random() * 30) + 1;
  // const availableRes = [5, 7, 8, 25, 30];
  // const availableRes = uniqueList(resourceNum);
  // const userList = [5, 9, 11, 23];
  // const userList = uniqueList(userNum);
  // const userList = userList.map(user => new User(user));
  // const users = userArray(userList, availableRes);
  
  // console.log('available: ', availableRes);
  // console.log('number of users: ', userNum);
  // console.log('user: ', users);
  
  // console.log("LUSOT?")
  // console.log("USER LIST: ",userList)
  // console.log('available: ', availableRes);
  // console.log('number of users: ', userNum);
  // console.log('user: ', users);

  useEffect(() => {
    setAvailableRes(uniqueList(resourceNum));
    setUserList(uniqueList(userNum));
    
    // setUserNum(Math.floor(Math.random() * 10) + 1);
    // setResourceNum(Math.floor(Math.random() * 10) + 1);
    // console.log('userNum: ', userNum);
    console.log("USERNUM:",userNum);
    console.log("RESOURCENUM:",resourceNum);
  },[userNum, resourceNum]);

  useEffect(() => {
    if(userList && availableRes){
      console.log("\n\nEVER CHANGING MOFO\n\n")
      const userArr = userArray(userList, availableRes);
      setUsers(userArr);
    }
  },[availableRes, userList])

  useEffect(() => {
    if(users.length > 0){
      const simulation = new Simulation(availableRes, users);
      setSim(simulation);
    }
  },[users])

  useEffect(() => {
    if (sim) {
      setTimeElapsed(sim.time());
      setQueue(sim.queue());
    }
  }, [sim]);

  const handleInit = (e) => {
    e.preventDefault();
    setInit(!init);
    setIsStartDisabled(false);
    setIsComplete(false);

    // setUserNum(5);
    // setAvailableRes([5, 7, 8, 25, 30]);
    // setUserList([5, 9, 11, 23]);
    setUserNum(Math.floor(Math.random() * 10) + 1);
    setResourceNum(Math.floor(Math.random() * 10) + 1);
    // setUsers(userArray(userList, availableRes));
    // setSim(simulation);
  }


  // const display = new Display(availableRes, userList);
  // display.header();
  // console.log('\n===============================\n');
  // console.log("SIM PROCESS(): ",typeof sim.process())
  const handleStart = (e) => {
    e.preventDefault();
    setIsStartDisabled(true);
    // setIsInitDisabled(true);
    setIsComplete(false);
    setIsExecuting(true);
    // setInitialData(users);
    console.log("USER LIST:",userList);
    console.log("AVAILABLE RES:",availableRes);
    // const users = userArray(userList, availableRes);
    // const sim = new Simulation(availableRes, users);
    // setSimulation(sim);
    // console.log("LENGTH:",Object.keys(sim.process()).length);
    console.log('LENGTH: ',Object.keys(sim.process()).length);
    // if(!stop){
    //   console.log("STOP!")
      // loop();
    main();
    console.log("SIM.QUEUEawd: ",queue)
    // sim.status()
    // }
    // while (Object.keys(sim.process()).length > 0) {
    //   console.log(`TIME ELAPSED: ${sim.time()}s`);
    //   // console.log('\nQUEUE:', sim.queue());
    //   // console.log('PROCESSES: ', sim.process());
    //   // console.log();
    //   // prompt('Press Enter to continue');
    //   for (const [user, res] of Object.entries(sim.process())) {
    //     // console.log(user.display());
    //     if (res.isDone()) {
    //       sim.remove(user);
    //       sim.initialize(users);
    //     }
    //     // console.log(`${user}: ${res}`);
    //     res.decrement();
    //   }
    //   sim.timeUp();
    // }
  }

  // const loop = () => {
  //   if (Object.keys(sim.process()).length > 0 && !stop) {
  //     console.log(`TIME ELAPSED: ${sim.time()}s`);
  //     // console.log('\nQUEUE:', sim.queue());
  //     // console.log('PROCESSES: ', sim.process());
  //     // console.log();
  //     // prompt('Press Enter to continue');
  //     for (const [user, res] of Object.entries(sim.process())) {
  //       // console.log(user.display());
  //       if (res.isDone()) {
  //         sim.remove(user);
  //         sim.initialize(users);
  //       }
  //       // console.log(`${user}: ${res}`);
  //       res.decrement();
  //     }
  //     sim.timeUp();
  //     setTimeout(loop, 1000); // call loop function again after a delay
  //     setTimeElapsed(sim.time());
  //   }
  // }

  const updateQueue = () => {
    setQueue(prevQueue => {
      const updatedQueue = {};
      for (let [id, users] of Object.entries(prevQueue)) {
        const updatedUsers = users.map(user => ({...user, timeLeft: user.timeLeft - 1}));
        updatedQueue[id] = updatedUsers;
      }
      return {...prevQueue, ...updatedQueue};
    });
  }

  const main = () => {
    let intervalId = setInterval(() => {
      if (Object.keys(sim.process()).length > 0) {
        // console.log(`TIME ELAPSED: ${sim.time()}s`);
        // console.log("\n\nIN SIM PROCESS:", sim.process());
        sim.updateQueue();

        for (let [userId, res] of Object.entries(sim.process())) {
          // if(res.id === 30)
            console.log("RES ID:", res.id, "TIME: ",res.time());
            res.decrement();
          if (res.isDone()) {
              // console.log("USER ID: ", userId, "TYPE OF: ", typeof userId);
              // userId = parseInt(userId);
              // const currUser = sim.getUser(userId);
              res.setIsExecuting(false);
              sim.remove(userId);
              // currUser.dumpReq();
              sim.initialize(users);
              // res.decrement();        
          }else{
            // res.decrement();        
          }
        }
        console.log("SIM QUEUE: ", sim.queue());
        sim.timeUp();
        // alert();
        // sim.status
        setTimeElapsed(sim.time());
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
        setIsExecuting(false);
        return;
      }
    }, 1000);
  }

  return (
    <div className="App">
      <div className='container-fluid'>
        <div className='container text-center my-4'>
          <p className="h3 text-light">
            CMSC 125 - MP1
          </p>
          <p className="h6 text-light made-by">
            by Dinniel Gie S. Gilig
          </p>
        </div>

        <div className="row justify-content-center gx-4 mb-4">
          <div className="col col-2">
            <p className='text-center text-uppercase fs-3'>User Requests</p>
            <div className='py-2 bg-1 container-height box-outline'>
                <UserList data={users}/>
            </div>
          </div>
          <div className="col col-7">
            <p className='text-center text-uppercase fs-3'>Simulation</p>
            <div className='py-2 bg-2 box-outline sim-box'>
                {sim && <p className='text-center fs-2 text-uppercase time-elapsed'>Time Elapsed: <span className='text-lowercase'>{timeElapsed}s</span></p>
                }
                <SimDisplay data={users} />
            </div>
          </div>
          <div className="col col-2">
            <p className='text-center text-uppercase fs-3'>All Resources</p>
            <div className='p-2 bg-1 container-height box-outline'>
                <p className='text-center fs-5'>Queue/In Waiting...</p>
                <QueueList data={queue} />
            </div>
          </div>
        </div>

        {isComplete && 
        <p className='mt-2 text-center process-done fs-1'>ALL PROCESSES DONE!</p>
        }
        {isExecuting ? 
          <p className='mt-2 text-center process-done fs-1'>EXECUTING...</p> 
          : isStartDisabled ? null :
          <div className="d-flex flex-row justify-content-center">
          <button className='sim-button sim-button-1' type="button" disabled={isInitdisabled} onClick={handleInit}>Initialize</button>
          <button className='sim-button sim-button-2' type="button" disabled={isStartDisabled} onClick={handleStart}>Start</button>
          {/* <button className='sim-button bg-danger sim-button-3' type="button" disabled={isStopdisabled} onClick={() => setStop(true)}>Stop</button> */}
        </div>}
      </div>
      <Background />
    </div>
  );
}

export default App;
