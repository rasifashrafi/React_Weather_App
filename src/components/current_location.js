import React,{Component}from "react";
import axios from 'axios';

class CurrentLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: "Miami",
      days: [],
      daysFull: [],
      temps: [],
      minTemps: [],
      maxTemps: [],
      humidity: [],
      pressure: [],
      wind: [],
      weather: [],
      icons: [],
      displayIndex: 0
    };
  }

  fetchData = () => {
    const url = this.buildUrlApi();

    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });

      const currentData = this.currentData();
      const dayOfWeekFull = [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ];
      const currentDay = "Now";
      const currentDayFull =
        dayOfWeekFull[new Date(currentData.dt_txt).getDay()];
      const currentTemp = Math.round(currentData.main.temp);
      const currentMinTemp = Math.round(currentData.main.temp_min);
      const currentMaxTemp = Math.round(currentData.main.temp_max);
      const currentHumidity = Math.round(currentData.main.humidity);
      const currentPressure = Math.round(currentData.main.pressure);
      const currentWind = Math.round(currentData.wind.speed);
      const currentWeather = currentData.weather[0].description;
      const currentIcon = currentData.weather[0].icon;

      const days = [];
      const daysFull = [];
      const temps = [];
      const minTemps = [];
      const maxTemps = [];
      const humidity = [];
      const pressure = [];
      const wind = [];
      const weather = [];
      const icons = [];
      for (let i = 0; i < this.state.data.list.length; i = i + 1) {
        let date = new Date(this.state.data.list[i].dt_txt);
        // let day = dayOfWeek[date.getDay()];
        let dayFull = dayOfWeekFull[date.getDay()];
        days.push(this.state.data.list[i].dt_txt);
        daysFull.push(dayFull);
        temps.push(Math.round(this.state.data.list[i].main.temp));
        minTemps.push(Math.round(this.state.data.list[i].main.temp_min));
        maxTemps.push(Math.round(this.state.data.list[i].main.temp_max));
        humidity.push(Math.round(this.state.data.list[i].main.humidity));
        pressure.push(Math.round(this.state.data.list[i].main.pressure));
        wind.push(Math.round(this.state.data.list[i].wind.speed));
        weather.push(this.state.data.list[i].weather[0].description);
        icons.push(this.state.data.list[i].weather[0].icon)
      }
        console.log(icons);
        console.log(days);

      this.setState({
        days: [currentDay, ...days.slice(1)],
        daysFull: [currentDayFull, ...daysFull.slice(1)],
        temps: [currentTemp, ...temps.slice(1)],
        minTemps: [currentMinTemp, ...minTemps.slice(1)],
        maxTemps: [currentMaxTemp, ...maxTemps.slice(1)],
        humidity: [currentHumidity, ...humidity.slice(1)],
        pressure: [currentPressure, ...pressure.slice(1)],
        wind: [currentWind, ...wind.slice(1)],
        weather: [currentWeather, ...weather.slice(1)],
        icons: [currentIcon, ...icons.slice(1)]
      });
    });
  };

  buildUrlApi = () => {
    const location = encodeURIComponent(this.state.location);
    const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const urlSuffix = "&APPID=b7d967612159884789686c4f5c41c455&units=metric";
    return [urlPrefix, location, urlSuffix].join("");
  };

  currentData = () => {
    const list = this.state.data.list;
    return list.find(e => new Date(e.dt_txt));
  };

  componentDidMount() {
    this.fetchData();
  }

  changeLocation = e => {
    e.preventDefault();
    const inputLocation = this.locationInput.value;
    this.setState(
      {
        location: inputLocation
      },
      () => {
        this.fetchData();
      }
    );
  };

  setIndex = index => {
    this.setState({
      displayIndex: index
    });
  };

  render() {
    const {
      location,
      days,
      daysFull,
      temps,
      maxTemps,
      minTemps,
      humidity,
      pressure,
      wind,
      weather,
      icons,
      displayIndex
    } = this.state;

    return (
      <div className = "current_location">
      <form onSubmit={this.changeLocation}>
          <div className="inline-input">
            {/* <i className="mdi mdi-magnify"></i> */}
            <input
              className="location-input"
              defaultValue={location}
              type="text"
              ref={input => (this.locationInput = input)}
            />
          </div>
        </form><hr/>
        <div className= "location">
        {location}
        </div>
        <div className="main-display">
          <div className="selection-panel">
            <div className="selection-row">
              {days.map((item, index) => {
                if (displayIndex === index) {
                  return (
                    <li className = "days_list">
                    <button
                      className="selected"
                      key={index + 1}
                      onClick={() => this.setIndex(index)}
                      >
                      {item}
                    </button>
                      </li>
                    
                  );
                } else {
                  return (
                    <li className ="days_list">
                    <button
                      key={index + 1}
                      onClick={() => this.setIndex(index)}
                      >
                      {item}
                    </button>
                      </li>
                  );
                }
              })}
            </div>  
          </div>
          <div className="weather-information">
            <div className="day">{daysFull[displayIndex]}</div><hr />
              <div className="temp-measurement">
                <div><img width = "150" height= "150" src={'http://openweathermap.org/img/w/'+`${icons[displayIndex]}`+'.png'} alt="weater-icon"/></div>
                {temps[displayIndex]}°C
              </div> 
              <div className="weather-description"><strong>Description : </strong>{weather[displayIndex]}</div>
              <div className="weather-description"><strong>Humidity : </strong>{humidity[displayIndex]}%</div>
              <div className="weather-description"><strong>Pressure : </strong>{pressure[displayIndex]} hPa</div>
              <div className="weather-description"><strong>Wind-Speed : </strong>{wind[displayIndex]} m/s</div>
              <div className="weather-description"><strong> Max.Temp. : </strong>{maxTemps[displayIndex]}°C</div>
              <div className="weather-description"><strong>Min.Temp. : </strong>{minTemps[displayIndex]}°C</div>
          </div>
        </div><hr/>

      </div>
    );
  }
}

export default CurrentLocation;
