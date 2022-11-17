import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {useState} from 'react';
import axios from "axios"
import { useEffect } from "react";

function App() {
  const apiKey="f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity]=useState("");
  const [data, setData]=useState({})
  

  useEffect(() => {
    getWeatherDetail("Kathmandu");
  }, []);

  const getWeatherDetail = (cityName) =>{
    const apiURL="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey;
    axios.get(apiURL).then((res)=>{
      setData(res.data);
    }).catch((err)=>{
      console.log("Error",err);
    })
  }

  const handleInputChange=(e)=> {
    setInputCity(e.target.value);
  }

  const handleSearch=()=>{
    getWeatherDetail(inputCity);
   }

  return (
    <div className="col-md-12">
      <div className="weatherBg">
        <h1 className="weatherName">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" onChange={handleInputChange}  value={inputCity} />
          <button type="button" onClick={handleSearch} className="btn btn-primary">Search</button>
        </div>
      </div>

      {Object.keys(data).length>0 &&
      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResult">
          <img className="weatherIcon" src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="weatherIcon"/>
          <h5 className="weatherCity">{data?.name}</h5>
          <h5 className="weatherTemp">{((data?.main?.temp)-273.15).toFixed(2)}</h5>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
