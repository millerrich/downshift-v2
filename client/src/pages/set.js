import React, { useState, useEffect } from 'react';
import TimeKeeper from 'react-timekeeper';
import { CardGroup, Card, List, ListItem} from 'react-bootstrap';
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

  useEffect(() => {
    getBreaks()
  }, [])

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
      savedTimes = response.data.breaktime;
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
              <ul>
                {breaks.map(break => {
                  <li>
                   {break}
                  </li>
                })}
              </ul>
        </Card>
      </CardGroup>
    </>
  )
}

export default setAlarm;