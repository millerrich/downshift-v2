import React, { useState } from 'react';
import TimeKeeper from 'react-timekeeper';
import { CardGroup, Card} from 'react-bootstrap';
import '../App.css'
import moment from 'moment';
import Slots from "../components/slot";
import axios from 'axios';
import Schedule from '../components/schedule';

let timeArray = [];
let savedTimes;

function setAlarm() {
  let current = moment().format('h:mm a');

  const [time, setTime] = useState(current)

  function saveBreak() {
    timeArray.push(time);
    axios.put("/user", { breaktime: timeArray })
      .then(req => {
        if (req.user) {
          console.log(time);
        }
      })
      getBreaks();
  }

  function getBreaks() {
    axios.get("/user/userdata")
    .then(function (response) {
      // console.log(response.data)
      savedTimes = response.data.breaktime;
      console.log(savedTimes);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (

    <>
      <CardGroup>
        <Card className="homeCard">
          <div className="mt-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
            <Card className="clock">
              <TimeKeeper
                time={time}
                onChange={(data) => setTime(data.formatted24)}
              />
              <Card.Body>
                <Card.Text className="text-center">
                  <span className="timeSet">Selected Time: {time}</span>
                </Card.Text>
                <button className="setAlarm" onClick={saveBreak}>Set Alarm</button>
              </Card.Body>
            </Card>
          </div>
          <Slots />
      <h3>SCHEDULE</h3>
      {/* {savedTimes.map(times => <p>{times}</p>)} */}
        </Card>
      </CardGroup>
    </>
  )
}

export default setAlarm;