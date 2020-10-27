import React, { Component, createRef } from 'react'


class Slots extends Component {
  static defaultProps = {
    options: ["Meditate", "Yoga", "Run", "Walk the Dog", "Read", "Paint", "Journal", "Brain Teasers"]
  };

  constructor(props) {
    super(props);
    this.state = { option1: "Meditate", option2: "Run", option3: "Read", rolling: false };

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

  };

  // this will create a rolling effect and return random selected option
  triggerSlotRotation = ref => {
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
      <div className="SlotMachine">
        <div className="slot">
          <section>
            <div className="container " ref={this.slotRef[0]}>
              {Slots.defaultProps.options.map((option, i) => (
                <div key={i}>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        {/* <div className="slot">
          <section>
            <div className="container" ref={this.slotRef[1]}>
              {Slots.defaultProps.options.map(option => (
                <div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        <div className="slot">
          <section>
            <div className="container" ref={this.slotRef[2]}>
              {Slots.defaultProps.options.map(option => (
                <div>
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </section>
        </div> */}
        <div
          className={!this.state.rolling ? "roll rolling" : "roll"}
          onClick={!this.state.rolling && this.roll}
          disabled={this.state.rolling}
        >
          {this.state.rolling ? "Rolling..." : "ROLL"}
        </div>
      </div>
    );
  }
}
export default Slots