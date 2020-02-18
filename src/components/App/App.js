import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './_App.scss';
import {SearchBar} from '../SearchBar/SearchBar';
import {Weather} from '../Weather/Weather';
import {Venue} from '../Venue/Venue';




export class App extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {
            openWeatherAPIInfo: {
                openWeatherKey: '807e356de39b752f52630cbfa917d4cd',
                weatherURL: 'https://api.openweathermap.org/data/2.5/weather'
            },
            
            foursquareAPIInfo: {
                foursquareUrl: 'https://api.foursquare.com/v2/venues/explore',
                clientId: 'SWARZUFB1ZITKU0MLL5V05HAVYIDBFV23IXB4XGOESGDNVYX',
                clientSecret: 'X3J5TPVF0QEWD1YLPYND5TBPE4IHHVU1Z2DWWI0PG2A4ON3R'
            },
            openWeatherSearchResults: [],
            foursquareSearchResults:[],
            inputSearch: '',
            foursquareTitle: 'foursquare__title'
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.getVenue = this.getVenue.bind(this);
        
    }
    
    
    getWeather() {
        let city = this.state.inputSearch;
        fetch(`${this.state.openWeatherAPIInfo.weatherURL}?&q=${city}&units=metric&APPID=${this.state.openWeatherAPIInfo.openWeatherKey}`).then(res=>{
            if(res.ok){
                return res.json()
            }
            
            throw new Error('Request failed!')
        }, networkError => console.log(networkError.message)).then(jsonRes=>{
                        
            this.setState({
                openWeatherSearchResults: [jsonRes]
            })
            
            console.log(this.state.openWeatherSearchResults[0]);
            
        }, error=>{
            console.log(error)
        })
    }
    
    getVenue(){
        let city = this.state.inputSearch;
        
        const currentDate=()=>{
            let date = new Date();
            
            let day = date.getDate();
            let month = date.getMonth()+1;
            let year = date.getFullYear();
            
            if(day<10 || month<10){
                return `${year}0${month}0${day}`
            }
            
            else {
                return `${year}${month}${day}`
            } 
            
        }
                
        fetch(`${this.state.foursquareAPIInfo.foursquareUrl}?client_id=${this.state.foursquareAPIInfo.clientId}&client_secret=${this.state.foursquareAPIInfo.clientSecret}&v=${currentDate()}&limit=10&near=${city}&section=food&price=1&openNow=1`).then(
            res=>{
                if(res.ok){
                    return res.json();
                }
                
                throw new Error('Request failed')
            }, networkError => console.log(networkError.messege)).then(jsonRes=>{
            
            this.setState({
                foursquareSearchResults: jsonRes.response.groups[0].items
            })
            console.log(this.state.foursquareSearchResults);
          
        }, error=>{
            console.log(error)
        })
        
        this.setState({foursquareTitle: 'foursquare__title foursquare__title_visible'})
        
    }
    
    handleChange(e){
        let inputSearchVal = e.target.value;
        this.setState({
            
            inputSearch: `${inputSearchVal}`
        })    
    }
    
    handleSubmit(event){
        
        this.getWeather(); 
        this.getVenue();
        event.preventDefault();
        
    }
     
   render(){
       
        return (
            <div className = "app">
                <header>
                    <img src = {logo} alt = "logo"/>
                    <SearchBar onChange = {this.handleChange}  onSubmit = {this.handleSubmit}/>
                    
                    {this.state.openWeatherSearchResults.map(el=>{
                        return <Weather key = {el.id} searchResult={el}/>
                    })}
                    
                    <section className = "foursquare">
                        <h1 className = {this.state.foursquareTitle}>VENUES</h1>
                        <div className = "foursquare__search-results">
                            {this.state.foursquareSearchResults.map(el=>{
                            return <Venue key = {el.venue.id} venueInfo = {el.venue}/>
                        })}
                        </div>
                    </section>          
                </header>
            </div>  
        );
    } 
}



