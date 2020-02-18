import React from 'react';
import ReactDOM from 'react-dom';
import "./_SearchBar.scss";



export class SearchBar extends React.Component{
    
    render(){
        return (
            
            <form className = "SearchBar" onSubmit = {this.props.onSubmit}>
                <h1 className = "SearchBar__title">Where do you want to land?</h1>
                <div className = "wrapper">
                    <input className = "SearchBar__searchInput" type = "text" onChange = {this.props.onChange}></input>
                    <input type = "submit" className = "SearchBar__searchSubmit" value = "Submit"></input>
                </div>
            </form>
            
        );
    }
    
    
}