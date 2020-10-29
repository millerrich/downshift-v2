import React from 'react'
import { CardGroup, Card} from 'react-bootstrap';


function Schedule(props) {

    return (
        <CardGroup>
        <Card className="schedCard">
        <div className="mt-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
          <Card.Body>
            <Card.Text>
                <span>{props}</span>
            </Card.Text>
          </Card.Body>
        </div>
        </Card>
      </CardGroup>
    )
}

export default Schedule;