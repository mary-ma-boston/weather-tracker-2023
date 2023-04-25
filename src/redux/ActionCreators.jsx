import axios from "axios";
import {toast} from 'react-toastify';
import * as constants from './Constants';
import {BASE_URL} from '../components/ApiConstants';


export const getWeatherDetails = (location="westford") => async (dispatch) => {
    dispatch({type: constants.GET_WEATHER_PENDING});
    await axios.get(BASE_URL, {
        params: {
            q: location,
            units: "Metric",
            lang: "en"
        }
    })
    .then(res=> dispatch({type: constants.GET_WEATHER_SUCCESS, payload: res.data}))
    .catch(err=> {
        console.log(err.response, err);
        toast.error(err.response.data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false
        });
        dispatch({type: constants.GET_WEATHER_REJECTED, payload: err.res})
    });
};


