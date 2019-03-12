import React from "react";
import axios from 'axios';
import Moment from "react-moment";

class Location extends React.Component {
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
     newData:[]
   };
 }

 fetchData = () => {
   const url = this.buildUrlApi();

   axios.get(url).then(response => {
     this.setState({
       data: response.data
     });


     const newData =[];

     for (let i = 0; i < this.state.data.list.length; i = i+1){  
       newData.push({
         days:this.state.data.list[i].dt,
         temps:Math.round(this.state.data.list[i].main.temp),
         minTemps:this.state.data.list[i].main.temp_min,
         maxTemps:this.state.data.list[i].main.temp_max,
         humidity:this.state.data.list[i].main.humidity,
         pressure:this.state.data.list[i].main.pressure,
         wind:this.state.data.list[i].wind.speed,
         weather:this.state.data.list[i].weather[0].description,
         icons:this.state.data.list[i].weather[0].icon
       })
     }

     this.setState({
      newData ,
     });
   });
 };

 buildUrlApi = () => {
   const location = encodeURIComponent(this.state.location);
   const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
   const urlSuffix = "&APPID=b7d967612159884789686c4f5c41c455&units=metric";
   return [urlPrefix, location, urlSuffix].join("");
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
    newData
   } = this.state;

   return (
     <div className="main-div">
     <form onSubmit={this.changeLocation}>
     <div className="input1">
       <input
         className="input2"
         defaultValue={location}
         type="text"
         ref={input => (this.locationInput = input)}
       />
     </div>
   </form>

   <div className="weather_data_days">
       {newData.map(item => {
         return(

          <div className= "days_data_container" key={item.days}>
          <div className="days_data" style={{border: "1px solid black"}}>
          <div className="days"><Moment unix format="ddd">{item.days}</Moment></div>
          <img width="150" height="150" src={`http://openweathermap.org/img/w/${item.icons}.png`} />
          <div>{item.temps}°c</div>
          <div>min-{item.minTemps}</div>
          <div>max-{item.maxTemps}</div>


         </div>
         </div>)
       })}
   </div>
 </div>
  );
 }
}
export default Location;