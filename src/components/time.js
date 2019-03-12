import React from "react";

class Time extends React.Component {
    constructor () {
        super()
        this.state = {time:new Date()}
    }

    currentTime(){
        this.setState({
            time:new Date()
        })
    }

    componentWillMount(){
        setInterval (() => this.currentTime(),1000)
    }

    render() {
        return(
            <div>
                <h1>
                    {this.state.time.toLocaleTimeString()}
                    {this.state.time.toLocaleDateString()}
                </h1>
            </div>
        )
    }
}

export default Time;