import React from 'react';
import ReactDOM from 'react-dom'
import './_Weather.scss';

let date = new Date();
let dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export class Weather extends React.Component{
    
    
    render(){
        return (
            
            <section className = "weather">
                <header className = "weather__header">
                    <h1 className = "weather__title">
                        {this.props.searchResult.name}, {this.props.searchResult.sys.country}
                    </h1>
                    <h2 className = "weather__subtitle">
                        CURRENT WEATHER
                    </h2>
                </header>
                
                <div className = "weather__search-result">
                    <p>{dayOfWeek[date.getDay()]}</p>
                    <p>Temperature: {this.props.searchResult.main.temp} {'\u00BA'}C</p>
                    <p>Temperature feels like: {this.props.searchResult.main.feels_like} {'\u00BA'}C</p>
                    <p>Condition: {this.props.searchResult.weather[0].description} </p>
                    
                    <img src = {`https://openweathermap.org/img/wn/${this.props.searchResult.weather[0].icon}@2x.png`} alt = " "/>
                </div>
            
            </section>
        
        
        )
    }
}
