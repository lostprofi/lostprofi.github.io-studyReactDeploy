import React from 'react';
import ReactDom from 'react-dom';
import './_Venue.scss';

export class Venue extends React.Component{
    
    render(){
        return(
                                    
            <div className = "venue__search-result">
                <h1>{this.props.venueInfo.name}</h1>
                <p>Адресс: {this.props.venueInfo.location.address}</p>
                <p>{this.props.venueInfo.categories[0].name}</p>
                <img src = {`${this.props.venueInfo.categories[0].icon.prefix}bg_32${this.props.venueInfo.categories[0].icon.suffix}`} alt = {this.props.venueInfo.categories[0].name}/>  
            </div>
            
           
        
        )
    }
    
    
}