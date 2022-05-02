import Button from "../button/Button";
import Header from "../header/Header";
import { useState,useEffect} from "react";
import { Footer } from '../footer/Footer'
import './container.css';

export const Container = () => {
  const [time, setTime] = useState(25);
  const [timerStatus, setTimerStatus] = useState(false); 
  const [curBreak,setCurBreak] = useState('focus');

  const handleFocus = () => {
    setTime(25*60*1000);
    setCurBreak('focus');
  };
  const handleShort = () => {
    setTime(5*60*1000);
    setCurBreak('short');
    setTimerStatus(false);
  };

  const handleLong = () => {
    setTime(20*60*1000);
    setCurBreak('long');
    setTimerStatus(false);
  };
  const handleStart = () => {
    if(time!==0){
     if(curBreak==='focus'){
      handleFocus();
     }else if(curBreak==='short'){
      handleShort();
     }else{
      handleLong();
     }
      setTimerStatus(true);
    }
  };
  const handleStop = () => {
   setTimerStatus(false);
  };
  const handleReset = () => {
    if(curBreak==='focus'){
      handleFocus();
    }else if(curBreak==='short'){
      handleShort();
    }else{
      handleLong();
    }    
 };
const toMinutes=()=>{
  return ("0"+Math.floor((time/1000/60)%60)).slice(-2);
}
const toSeconds=()=>{
  return ("0"+Math.floor((time/1000)%60)).slice(-2);
}
  const decreaseTimer = () => {
    setTime((time) => {
      if (time !== 0) {
        return time - 1000;
      }
      return 0;
    });
  };

  useEffect(()=>{
    let timeInterval = null;
    if(timerStatus & time!==0){
      timeInterval=setInterval(decreaseTimer,1000);
    }else{
      clearInterval(timeInterval);
    }
    return ()=>clearInterval(timeInterval);
  },[timerStatus,time]);

  return (
    <div className="container">
      <Header title={"Timer"} />
      <Button name="Focus" handleClick={handleFocus} cls="btn btn-top"/>
      <Button name="Short Break" handleClick={handleShort} cls="btn btn-top"/>
      <Button name="Long Break" handleClick={handleLong} cls="btn btn-top"/>
      <div className="timer">{toMinutes()}:{toSeconds()}</div>
      <Button name="Start" handleClick={handleStart} cls="btn btn-start"/>
      <Button name="Stop" handleClick={handleStop} cls="btn btn-stop"/>
      <Button name="Reset" handleClick={handleReset} cls="btn btn-reset"/>
      <Footer/>
    </div>
  );
};

export default Container;
