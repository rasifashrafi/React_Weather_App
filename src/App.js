import React from 'react';
import './App.css';

import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";
import Location from "./components/location";
import CurrentLocation from './components/current_location';
import Time from './components/time';


const API_KEY = "b7d967612159884789686c4f5c41c455";
class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    pressure: undefined,
    minimum: undefined,
    maximum: undefined,
    icon: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city =e.target.elements.city.value;
    const country =e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json();


    

    if (city && country){
      console.log(data)
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        minimum: data.main.temp_min,
        maximum: data.main.temp_max,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        error: ""
      })  
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        pressure: undefined,
        minimum: undefined,
        maximum: undefined,
        error: "Please insert your country and city"
      })
    }
    }
  

  render() {
    return (
      <div className="app">
        <Titles />
        <div className = "weather">
          <Form getWeather = {this.getWeather}/>
          <Weather 
          temperature = {this.state.temperature}
          pressure = {this.state.pressure}
          minimum = {this.state.minimum}
          maximum = {this.state.maximum}
          city= {this.state.city}
          country = {this.state.country}
          humidity = {this.state.humidity}
          icon =  {this.state.icon}
          description = {this.state.description}
          error = {this.state.error}
        />
        </div> 
        <div>
          <Location/>
        </div>
        <div>
          <CurrentLocation />
        </div>
        <div>
          <Time />
        </div>

      </div>
    );
  }
}

export default App;
