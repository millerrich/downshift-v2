import React, { useEffect, useState } from "react";
import TimeKeeper from "react-timekeeper";
import { CardGroup, Card, Button } from "react-bootstrap";
import "../App.css";
import moment from "moment";
import Slots from "../components/slot";
import axios from "axios";
import Schedule from "../components/schedule";
import * as Tone from "tone";
let current;
let timer;

const synth = new Tone.Synth().toDestination();

function setAlarm() {
  const [seconds, setSeconds] = useState(current);
  const [time, setTime] = useState(current);
  const [timeArray, setTimeArray] = useState([]);
  const [visibility, setVisibility] = useState(true);
  
  useEffect(() => {
    console.log("use effect number one");
    getTime();
    getBreaks();
  }, []);
  
  useEffect(() => {
    console.log("use effect number two");
    if (timeArray.includes(seconds)) {
      console.log("use effect conditional");
      setVisibility(false);
      const now = Tone.now();
      synth.triggerAttackRelease("C4", 1, now)
      synth.triggerAttackRelease("E4", 1, now + 0.5)
      synth.triggerAttackRelease("G4", 1, now + 1)
    }
  }, [seconds]);
  
  function goBack(e){
    console.log("function go back pre interval")
    setTimeout(function () {
      console.log("hit function go back");
      setVisibility(e);
    }, 30000);
  }
  
  function getTime() {
    setInterval(function () {
      current = moment().format("h:mm a");
      setSeconds(current);
    }, 1000);
  }
  
  function reset(event) {
    event.preventDefault();
    setVisibility(true);
  }
  
  function saveBreak() {
    setTimeArray(timeArray.concat(time));
    axios.put("/user", { breaktime: timeArray.concat(time) }).then((req) => {
      if (req.user) {
        console.log("updated");
      }
    });
    getBreaks();
  }
  
  function getBreaks() {
    axios
      .get("/user/userdata")
      .then(function (response) {
        setTimeArray(response.data.breaktime);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function deleteBreak(event, index) {
    event.preventDefault();
    console.log(index);
    let removeTime = [];
    removeTime = timeArray.splice(index, 1);
    console.log(removeTime);
    axios
      .put("/user", { breaktime: timeArray })
      .then((req) => {
        if (req.user) {
          console.log("removed");
        }
      })
      .then(getBreaks());
  }

  return (
    <>
      <p>{seconds}</p>

      
        {visibility ? (
         <>
            <Card className='clockBckg'>
            <CardGroup className="ff" style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Card className="clock">
              <TimeKeeper
                time={time}
                onChange={(data) => setTime(data.formatted12)}
              />
              <Card.Body>
                <Card.Text className="text-center">
                  <p className="timeSet">Selected Time: {time}</p>
                </Card.Text>
                <Button className="setAlarm" size='lg' onClick={saveBreak}>
                  Set Alarm
                  </Button>
              </Card.Body>


            </Card>
            <Card className='clockPointer' style={{ width: "25rem" }}>
              <Card.Body>
                <Card.Title>

                </Card.Title>
                <Card.Text>
                  <p>To get started, click on the clock and choose the times you are going to take your daily breaks <br />↩</p>
                </Card.Text>
              </Card.Body>
            </Card>
            </CardGroup>
            </Card>
          </>

        ) : (
            <div>
              <Button size='lg' className = 'goBack' onClick={event => reset(event)}>↲ Go Back</Button>
              <Slots  goBack={goBack} />
              
            </div>

          )}
      


      <Card className='coloredBckg'>

        <CardGroup className="ff" style={{
          display: 'flex',
          justifyContent: 'center',
        }}>
           <Card className='schedulePointer' style={{ width: "20rem" }}>
            <Card.Body>
              <Card.Text>
                <p>Your set breaks will be tracked in the scheduler <br /> ↪</p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="Schedule" style={{ width: '20rem', height: '19rem' }}>
            <Card.Title>
              <h3 className="titleWords">Schedule</h3>
            </Card.Title>
            <Card.Body>
              <Card.Text >
                
                {timeArray.map((t, index) => (
                  <p className="scheduleBorder">
                  <li key={index}>
                    {t}
                    <Button className="removeB"
                      onClick={(event) => {
                        deleteBreak(event, index);
                      }}
                    >
                      REMOVE
                      </Button>
                  </li>
                  </p>
                ))}
                
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Card>


    </>
  );
}

export default setAlarm;
