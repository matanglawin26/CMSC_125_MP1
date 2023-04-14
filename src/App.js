import { useEffect, useState } from 'react';
import { uniqueList, userArray } from './utils/helperFunctions';
import Simulation from './classes/Simulation';
import Background from "./bg/Background";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/UserList';
import SimDisplay from './components/SimDisplay';
import QueueList from './components/QueueList';

function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isStartDisabled, setIsStartDisabled] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [userNum, setUserNum] = useState(0);
  const [resourceNum, setResourceNum] = useState(0);
  const [availableRes, setAvailableRes] = useState([]);
  const [userList, setUserList] = useState([]);
  const [users, setUsers] = useState([]);
  const [sim, setSim] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [queue, setQueue] = useState([])
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setAvailableRes(uniqueList(resourceNum));
    setUserList(uniqueList(userNum));
  },[userNum, resourceNum]);

  useEffect(() => {
    if(userList && availableRes){
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
    setIsStartDisabled(false);
    setIsComplete(false);

    setUserNum(Math.floor(Math.random() * 10) + 1);
    setResourceNum(Math.floor(Math.random() * 10) + 1);
  }

  const handleStart = (e) => {
    e.preventDefault();
    setIsStartDisabled(true);
    setIsDisabled(true);
    setIsComplete(false);
    setIsExecuting(true);
    
    main();
  }

  const main = () => {
    let intervalId = setInterval(() => {
      if (Object.keys(sim.process()).length > 0) {
        sim.updateQueue();

        for (let [userId, res] of Object.entries(sim.process())) {
          res.decrement();
          if (res.isDone()) {
              res.setIsExecuting(false);
              sim.remove(userId);
              sim.initialize(users);
          }else{
            // res.decrement();        
          }
        }
        sim.timeUp();
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
            <p className='text-center text-uppercase fs-3'>Simulation - <span className='text-center fs-2 text-uppercase time-elapsed'>Time Elapsed: <span className='text-lowercase'>{timeElapsed}s</span></span></p>
            <div className='py-2 bg-2 box-outline sim-box'>
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
          : isDisabled ? null :
          <div className="d-flex flex-row justify-content-center">
          <button className='sim-button sim-button-1' type="button" onClick={handleInit}>Initialize</button>
          <button className='sim-button sim-button-2' type="button" onClick={handleStart} disabled={isStartDisabled}>Start</button>
        </div>}
      </div>
      <Background />
    </div>
  );
}

export default App;
