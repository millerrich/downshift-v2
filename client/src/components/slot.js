import React, { Component, createRef } from "react";
import { Container, Row, Col } from "react-bootstrap";

class Slots extends Component {
  static defaultProps = {
    options: [
      "Meditate",
      "Yoga",
      "Run",
      "Walk the Dog",
      "Read",
      "Paint",
      "Journal",
      "Brain Teasers"
    ]
  };

  constructor(props) {
    super(props);
    this.state = {
      rolling: false
    };

    // get ref of dic onn which elements will roll
    this.slotRef = [createRef()];
    // this.slotRef = [createRef(), createRef(), createRef()];
  }

  // to trigger roolling and maintain state
  roll = () => {
    this.setState({
      rolling: true
    });
    setTimeout(() => {
      this.setState({ rolling: false });
    }, 700);

    // looping through all 3 slots to start rolling
    this.slotRef.forEach((slot, i) => {
      // this will trigger rolling effect
      const selected = this.triggerSlotRotation(slot.current);
      this.setState({ [`option${i + 1}`]: selected });
    });
    
  this.props.goBack(true);
  };

  // this will create a rolling effect and return random selected option
  triggerSlotRotation = (ref) => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(
      Math.random() * Slots.defaultProps.options.length
    );
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
    return Slots.defaultProps.options[randomOption];
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <section>
              <Container ref={this.slotRef[0]}>
                {Slots.defaultProps.options.map((option, i) => (
                  <div key={i}>
                    <span>{option}</span>
                  </div>
                ))}
              </Container>
            </section>
          </Col>
        </Row>
        <Row>
          <Col>
            <div
              className={!this.state.rolling ? "roll rolling" : "roll"}
              onClick={!this.state.rolling ? this.roll : undefined}
              disabled={this.state.rolling}
            >
              {this.state.rolling ? "Rolling..." : "ROLL"}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Slots;
