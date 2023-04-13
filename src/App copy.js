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

function App() {
  const [isInitdisabled, setIsInitDisabled] = useState(false);
  const [isStartdisabled, setIsStartDisabled] = useState(true);
  const [isStopdisabled, setIsStopDisabled] = useState(true);
  const [userReqlist, setUserReqList] = useState({});
  const [init, setInit] = useState(false);
  const [userNum, setUserNum] = useState(0);
  const [resourceNum, setResourceNum] = useState(0);
  const [availableRes, setAvailableRes] = useState([]);
  const [userList, setUserList] = useState([]);
  const [users, setUsers] = useState([]);
  const [sim, setSim] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [stop, setStop] = useState(false);
  
  useEffect(() => {
    // setAvailableRes(uniqueList(resourceNum));
    // setUserList(uniqueList(userNum));
    
    // setUserNum(Math.floor(Math.random() * 10) + 1);
    // setResourceNum(Math.floor(Math.random() * 10) + 1);
    // console.log('userNum: ', userNum);
    console.log("USERNUM:",userNum);
    console.log("RESOURCENUM:",resourceNum);
  },[userNum, resourceNum]);

  useEffect(() => {
    if(userList && availableRes){
      setUsers(userArray(userList, availableRes));
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
    }
  }, [sim]);

  const handleInit = (e) => {
    e.preventDefault();
    setInit(!init);
    setIsStartDisabled(false);
    setUserNum(5);
    setAvailableRes([5, 7, 8, 25, 30]);
    setUserList([5, 9, 11, 23]);

    // setUserNum(Math.floor(Math.random() * 10) + 1);
    // setResourceNum(Math.floor(Math.random() * 10) + 1);
    // setUsers(userArray(userList, availableRes));
    // setSim(simulation);
  }

  const handleStart = (e) => {
    e.preventDefault();
    setIsStopDisabled(false);
    console.log("USER LIST:",userList);
    console.log("AVAILABLE RES:",availableRes);
    console.log("LENGTH:",Object.keys(sim.process()).length);
    loop();
  }

  const loop = () => {
    if (Object.keys(sim.process()).length > 0 && !stop) {
      console.log(`TIME ELAPSED: ${sim.time()}s`);
      for (const [user, res] of Object.entries(sim.process())) {
        if (res.isDone()) {
          sim.remove(user);
          sim.initialize(users);
        }
        res.decrement();
      }
      sim.timeUp();
      setTimeElapsed(sim.time());
      setTimeout(loop, 1000); // call loop function again after a delay
    }
  }


  return (
    <div className="App">
      <div className='container'>
        <div className='container text-center my-4'>
          <p className="h1 text-light">
            CMSC 125 - MP1
          </p>
          <p className="h4 text-light made-by">
            by Dinniel Gie S. Gilig
          </p>
        </div>

        <div className="row gx-5">
          <div className="col col-3">
            <p className='text-center text-uppercase fs-3'>User Requests</p>
            <div className='py-2 bg-1 container-height box-outline'>
                <UserList data={users}/>
            </div>
          </div>
          <div className="col col-6">
            <p className='text-center text-uppercase fs-3'>Simulation</p>
            <div className='py-2 bg-2 container-height box-outline sim-box'>
                {sim && <p className='text-center'>Time Elapsed: {timeElapsed}</p>}
            </div>
          </div>
          <div className="col col-3">
            <p className='text-center text-uppercase fs-3'>Queue/In Waiting...</p>
            <div className='p-2 bg-1 container-height box-outline'>
                <p className='text-left'>
                  Test
                </p>
            </div>
          </div>
        </div>

        <div className="d-flex flex-row justify-content-center mt-5">
          <button className='sim-button sim-button-1' type="button" disabled={isInitdisabled} onClick={handleInit}>Initialize</button>
          <button className='sim-button sim-button-2' type="button" disabled={isStartdisabled} onClick={handleStart}>Start</button>
          <button className='sim-button bg-danger sim-button-3' type="button" disabled={isStopdisabled} onClick={() => setStop(true)}>Stop</button>
        </div>
      </div>
      <Background />
    </div>
  );
}

export default App;
