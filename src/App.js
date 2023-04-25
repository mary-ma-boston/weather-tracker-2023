import React from 'react';
import {Provider} from 'react-redux';
import Weather from './components/Weather';


import WeatherStore from './redux/Store';
import './App.css';

const App = () => {
  return (
    <Provider store={WeatherStore}>
        <div>
          <Weather />
        </div>
    </Provider>
    
  );
}

export default App;
