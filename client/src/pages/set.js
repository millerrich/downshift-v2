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
      <CardGroup>
        <Card className="homeCard">
          {visibility ? (
            <div
              className="mt-5"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Card className="clock">
                <TimeKeeper
                  time={time}
                  onChange={(data) => setTime(data.formatted12)}
                />
                <Card.Body>
                  <Card.Text className="text-center">
                    <span className="timeSet">Selected Time: {time}</span>
                  </Card.Text>
                  <button className="setAlarm" onClick={saveBreak}>
                    Set Alarm
                  </button>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <div>
              <Slots goBack={goBack} />
              <Button onClick={event => reset(event)}>Go Back</Button>
            </div>
          )}
          <div className="container">
            <CardGroup>
              <Card>
                <h3>SCHEDULE</h3>
                <Card.Body>
                  {timeArray.map((t, index) => (
                    <li key={index}>
                      {t}
                      <Button
                        onClick={(event) => {
                          deleteBreak(event, index);
                        }}
                      >
                        REMOVE
                      </Button>
                    </li>
                  ))}
                </Card.Body>
              </Card>
            </CardGroup>
          </div>
        </Card>
      </CardGroup>
    </>
  );
}

export default setAlarm;
