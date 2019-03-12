import React from 'react';

class Weather extends React.Component {


    render(){
        
        return (

            <div className = "result">
                <div className = "result_text">
                    <h1>{this.props.city && this.props.country && <p>{this.props.city} , {this.props.country}</p>}</h1>

                    {this.props.temperature && <p>Temperature: {(this.props.temperature -273.15).toFixed(2)} &deg;C </p>}

                    {this.props.minimum && <p>Minimum Temperature: {(this.props.minimum -273.15).toFixed(2)} &deg;C </p>}

                    {this.props.maximum && <p>Maximum Temperature: {(this.props.maximum -273.15).toFixed(2)} &deg;C </p>}

                    {this.props.pressure && <p>Pressure: {(this.props.pressure)} hPA</p>}

                    {this.props.humidity && <p>Humidity: {this.props.humidity}</p>}

                    {this.props.icon && <p> {this.props.icon}</p>}

                    {this.props.description &&  <p>Description: {this.props.description}</p>}

                    {this.props.error && <h1>{this.props.error}</h1>}
                </div>
            </div>
        ); 
    }
};

export default Weather;