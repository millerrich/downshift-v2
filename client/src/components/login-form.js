import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { Button, Card, Form, Container, Row, Col, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      redirectTo: null
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

    axios
      .post('/user/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          })
          // update the state to redirect to home
          this.setState({
            redirectTo: '/'
          })
        }
      }).catch(error => {
        console.log(error);

      })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <>

          <Container className="formMargin">
            <CardGroup className="cG" style={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <Col lg={6} sm={12}>
                <Card id="port" border="dark" className="text-center mt-5 bS" style={{ width: '20rem', height: '15rem', }}>
                  <Card.Body>
                    <Card.Title>
                     <h2 className="loginTitle">Welcome Back!</h2> 
                    </Card.Title>
                    <Card.Text>
                      If you do not have an account <br />click the sign up button below <br />
                    </Card.Text>

                    <Card.Text>
                      <Link to="/signup" className="signupSwitch">
                        <span className="text-secondary signColor">Sign Up</span>
                      </Link>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} sm={12}>
                <Card id="port"  className="text-center mt-5 bS1" style={{ width: '20rem', height: '15rem' }}>
                  <Card.Body>
                  <Card.Title>
                    <h4 style={{fontWeight:'Bold'}}>Login</h4>
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
                        type="submit">Login</Button>
                       
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
}

export default LoginForm
