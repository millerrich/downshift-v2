import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';
import axios from 'axios';

class Navbar extends Component {
  constructor() {
    super()
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    axios.post('/user/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        })
      }
    }).catch(error => {
      console.log('Logout error')
    })
  }

  render() {
    const loggedIn = this.props.loggedIn;

    return (

      <Container fluid className="navColor">
        <Row>
          {loggedIn ? (
            <Col className="navbar-section float-left">
              <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                <span className="text-secondary">logout</span></Link>

            </Col>
          ) : (
              <Col className="navbar-section float-left">
                <Link to="/" className="btn btn-link text-secondary">
                  <span className="text-secondary">home</span>
                </Link>
                <Link to="/login" className="btn btn-link text-secondary">
                  <span className="text-secondary">login</span>
                </Link>
                <Link to="/signup" className="btn btn-link">
                  <span className="text-secondary">sign up</span>
                </Link>
              </Col >
            )}
          <Col>
            <h1 className="App-title text-secondary">Downshift</h1>
          </Col>
        </Row>
      </Container>
    );

  }
}

export default Navbar;