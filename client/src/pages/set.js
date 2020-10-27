import React, { useState, useEffect } from 'react';
import TimeKeeper from 'react-timekeeper';
import { CardGroup, Card, Nav } from 'react-bootstrap';
import '../App.css'
import moment from 'moment';
import Slots from "../components/slot";
import axios from 'axios';

function setAlarm() {
  let current = moment().format('h:mm a');

  const [time, setTime] = useState(current)

  function saveBreak(){
    axios.put("/user", {break: time})
    .then(req => {
      if(req.user){
        console.log(time);
      }
    })
  }

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
        </Card>
      </CardGroup>
      <Slots />
    </>
  )
}

export default setAlarm;