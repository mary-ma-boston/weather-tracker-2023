import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment';
import {getWeatherDetails} from '../redux/ActionCreators';

import './weather.css';


const Weather = () => {
    const dispatch = useDispatch();
    const getWeatherDetail = (loc) => dispatch(getWeatherDetails(loc));

    const [searchInput, setSearchInput] = useState('');
   
    const weatherData = useSelector((state)=>state);
    const {data, success} = weatherData;
    const {weather, sys, name, main} = data;

    useEffect(()=>{ 
        getWeatherDetail();
    }, []);

    const handleOnChange=(e)=>{
        setSearchInput(e.target.value);
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log(weatherData)
        
        if(searchInput) {
            getWeatherDetail(searchInput);
        }
        setSearchInput("");
    }

    return (
        <>
            <div className='container'>
                <div className='heading'>Weather Tracker</div>
                <form className='search-form' onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        placeholder='Search Weather by City'
                        value={searchInput}
                        onChange={e=>handleOnChange(e)}
                    />
                    <button>Find</button>
                </form>
                <div className='helper-text'>Type City Name and Hit Enter</div>
                <div className='info'>
                    <div className='sub-heading'>
                        Weather Forecast <div>on</div>
                    </div>
                    <div className='showDate'>
                        {success? moment().format("MMM DD YYYY"):null}
                    </div>
                    <div className='location'>
                        {success? name: null}
                        <div>({success? sys.country: null})</div>
                    </div>
                    <div className='forecast-info'>
                        <div className='forecast-icon'>
                            {success ? (
                                <img 
                                    src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                                    alt=""
                                />
                            ) : null}
                        </div>
                        <div className='forecast-value'>
                            <div className='degrees'>
                                <span className='degrees-count'>
                                    {success? main.temp: null}
                                </span>
                                C
                            </div>
                            <span className='weather-condition'>
                                {success? weather[0].main: null}
                            </span>
                        </div>
                    </div>
                    <div className='additional-info'>
                        <ul className='list'>
                            <li>
                                <b>Feels Like</b> {success? main.feels_like: null}
                            </li>
                            <li>
                                <b>Min Temp</b> {success? main.temp_min: null}
                            </li>
                            <li>
                                <b>Max Temp</b> {success? main.temp_max: null}
                            </li>
                            <li>
                                <b>Pressure</b> {success? main.pressure: null}
                            </li>
                            <li>
                                <b>Humidity</b> {success? main.humidity: null}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}



export default Weather