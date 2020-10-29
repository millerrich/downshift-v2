import React, { useEffect, useState } from 'react';
import TimeKeeper from 'react-timekeeper';
import { CardGroup, Card} from 'react-bootstrap';
import '../App.css'
import moment from 'moment';
import Slots from "../components/slot";
import axios from 'axios';
import Schedule from '../components/schedule';

let timeArray = [];

function setAlarm() {
  let current = moment().format('h:mm a');
  const [time, setTime] = useState(current)

  // useEffect(() => {
  //   getBreaks();
  // })

  function saveBreak() {
    timeArray.push(time);
    axios.put("/user", { breaktime: timeArray })
      .then(req => {
        if (req.user) {
          console.log("updated");
        }
      })
      getBreaks();
  }

  function getBreaks() {
    axios.get("/user/userdata")
    .then(function (response) {
      // console.log(response.data)
      timeArray = [];
      let x = response.data.breaktime;
      x.map(t => timeArray.push(t));
      console.log(timeArray);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  function deleteBreak(event, index) {
    event.preventDefault();
    console.log("clicked")
    console.log(index);
    let removeTime = [];
    removeTime = timeArray.splice(index, 1)
    console.log(removeTime);
    axios.put("/user", { breaktime: timeArray })
    .then(req => {
      if (req.user) {
        console.log("removed");
        }
      })
      .then(getBreaks());
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
          <Slots />
          <div className="container">
      <CardGroup>
        <Card>
      <h3>SCHEDULE</h3>
          <Card.Body>
     {timeArray.map((t, index) => <li key={index}>{t}<button onClick={event => {deleteBreak(event, index)}}>REMOVE</button></li>)}
          </Card.Body>
        </Card>
      </CardGroup>
      
      </div>
        </Card>
      </CardGroup>
    </>
  )
}


export default setAlarm;