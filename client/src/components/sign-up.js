import React, { Component } from 'react'
import axios from 'axios'
import { Button, Card, Form, Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',

    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()

    //request to server to add a new username/password
    axios.post('/user/', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        if (!response.data.errmsg) {
          console.log('successful signup')
          this.setState({ //redirect to login page
            redirectTo: '/login'
          })
        } else {
          console.log('username already taken')
        }
      }).catch(error => {
        console.log('signup error: ')
        console.log(error)

      })
  }


  render() {
    return (
      <>
        <Container className="formMargin">
          <CardGroup className="cG" style={{
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Col lg={6} sm={12}>
              <Card id="port"  className="text-center mt-5 bS1" style={{ width: '20rem', height: '15rem' }}>
                <Card.Body>
                <Card.Title>
                  <h4 style={{fontWeight:'Bold'}}>Sign Up</h4>
                </Card.Title>
                  <Card.Text>
                    <input className="form-input"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    <input className="form-input"
                      placeholder="password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />

                  </Card.Text>
                  <Card.Text className="displaySm" style={{ display: 'flex', justifyContent: 'center', }}>
                    <Button  className="but" onClick={this.handleSubmit}
                      type="submit">Sign up</Button>
                     
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6} sm={12}>
              <Card id="port" border="dark" className="text-center mt-5 bS" style={{ width: '20rem', height: '15rem', }}>
                <Card.Body>
                  <Card.Title>
                   <h2 className="loginTitle">Welcome!</h2> 
                  </Card.Title>
                  <Card.Text>
                    If already have an account <br />click the login button below <br />
                  </Card.Text>

                  <Card.Text>
                    <Link to="/login" className="signupSwitch">
                      <span className="text-secondary signColor">Login</span>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </CardGroup>
        </Container>
      </>
    )
  }
}

export default Signup;
