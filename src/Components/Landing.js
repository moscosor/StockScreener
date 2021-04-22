import React, { Component } from 'react';
import {TextField, InputAdornment, IconButton, withStyles} from '@material-ui/core';
import {Search} from '@material-ui/icons';
import stockTicker from '../data/stockTickers';
import StockTile from './StockTile';


const styles = {
    input: {
        // border: "1px solid white",
        borderRadius: "5px",
        background: "black",
        color: "white"
    },
    textField: {
        border: "1px solid white",
        borderRadius: "5px",
        background: "black",
        margin: "40px auto",
        display: 'table'
    },
    icon: {
        color: 'white',
        marginRight: "-25px"
    }
}

class Landing extends Component {
    constructor(){
        super()

        this.state = {
            searchQuery: ""
        }
    }

    handleSearchToUpperCase = (event) => {
        this.setState({
            searchQuery: (event.target.value).toUpperCase()
        })
    }

    handleEnterKeyPressSearch = (event) => {
        if(event.keyCode === 13){
            event.preventDefault();
            this.handleSearchClick();
        }
    }

    handleSearchClick = () => {
        window.location.assign(`/stocks/${this.state.searchQuery}`)
    }

    render() {
        const {classes} = this.props;
        const stockTiles = stockTicker.map(ticker => {
            return <StockTile key={ticker} ticker={ticker} />
        });

        return (
            <>
                <h1 className="title">Stock Screener</h1>
                <div className="questionContainer">
                    <p className="questionText">Search For Your Favorite Stock</p>
                </div>
                <TextField 
                    placeholder="Search Ticker"
                    variant="outlined"
                    value={this.state.searchQuery}
                    className={classes.textField}
                    onKeyUp={this.handleEnterKeyPressSearch}
                    onChange={this.handleSearchToUpperCase}
                    InputProps={{
                        className: classes.input,
                        endAdornment: (
                            <InputAdornment position="start">
                                <IconButton onClick={this.handleSearchClick} >
                                    <Search className={classes.icon} />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <div className="questionContainer">
                    <p className="questionText">...or browse our colletion of the top 50 most popular stocks below.</p>
                </div>
                <div className="stockListContainer">
                    {stockTiles}
                </div>
            </>
        )
    }
}

export default withStyles(styles)(Landing);