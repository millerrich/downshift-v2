import React, { Component } from 'react'
import Slots from "./slot";

class Home extends Component {
  constructor() {
    super()
  }


    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <p>It's good to be home</p>
                <img style={imageStyle} src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg" />
                <Slots />
            </div>
        )
  }
}

export default Home
