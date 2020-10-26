import React, { useState } from 'react';
import TimeKeeper from 'react-timekeeper';
import {CardGroup, Card, Nav } from 'react-bootstrap';
import '../App.css'
import Navbar from './Navbar';

function setAlarm() {
    const [time, setTime] = useState('12:34pm')

    return (

        <>

            < Navbar />
            <CardGroup>
                <Card className="homeCard">
                    <div className="mt-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <Card className="clock">
                            <TimeKeeper
                                time={time}
                                onChange={(data) => setTime(data.formatted12)}
                            />
                            <Card.Body>
                                <Card.Text className="text-center">
                                    <span className="timeSet">Selected Time: {time}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </Card>
            </CardGroup>

        </>
    )
}

export default setAlarm;