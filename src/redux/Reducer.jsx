import * as constants from './Constants';

const weatherInitialState = {
    loading: false,
    error: false,
    success: false,
    data: {}
};

export const WeatherReducer = (state = weatherInitialState, action) => {
    switch(action.type) {
        case constants.GET_WEATHER_PENDING:
            return {
                ...state,
                loading: true
            };
        case constants.GET_WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                data: action.payload
            };
        case constants.GET_WEATHER_REJECTED: 
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
}

