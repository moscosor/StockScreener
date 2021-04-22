import React, { Component } from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {Tooltip} from '@material-ui/core';
import Button from '@material-ui/core/Button'
import BasicInfoTile from './BasicInfoTile';
import TimeFrameDropDown from './TimeFrameDropDown';
import StockGraph from './StockGraph';
import StrategiesTable from './StrategiesTable'

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_API_BASE_ROUTE;

class Stock extends Component {

    constructor(props){
        super(props);

        this.state = {
            loading: true,
            tickerBasicInfo: [],
            tickerData: [],
            timeInterval: "1day",
            indicator: null
        };
    }

    async fetchNecessaryIndicators(){
        const ticker = this.props.match.params.ticker;
        const stockRsiRoute = "/rsi";
        const stockRsiIndicatorUrl = `${baseUrl}${stockRsiRoute}?apikey=${apiKey}&symbol=${ticker}&interval=${this.state.timeInterval}`;
        
        const fetchStockData = await fetch(stockRsiIndicatorUrl);
        let data = await fetchStockData.json();
        if(data.status === "error" || data.values[0].rsi === null){
            data = "Not Enough Information";
        } else{
            data = data.values[0].rsi
        }

        this.setState({
            indicator: {
                rsi: data
            }
        })
    }

    async fetchStockTimeData(){
        const ticker = this.props.match.params.ticker;
        const stockDataRoute = "/time_series";
        const stockDataUrl = `${baseUrl}${stockDataRoute}?apikey=${apiKey}&symbol=${ticker}&interval=${this.state.timeInterval}&outputsize=250`;
        
        const fetchStockData = await fetch(stockDataUrl);
        const data = await fetchStockData.json();

        this.setState({
            tickerData: this.state.tickerData.concat(data.values),
        }, () => {
            this.fetchNecessaryIndicators();
        })
        
    }

   async componentDidMount() {
        const ticker = this.props.match.params.ticker;
        const stockDataRoute = "/time_series";
        const stockBasicInfoRoute = "/quote";

        const stockBasicInfoUrl = `${baseUrl}${stockBasicInfoRoute}?symbol=${ticker}&apikey=${apiKey}`;
        const stockDataUrl = `${baseUrl}${stockDataRoute}?apikey=${apiKey}&symbol=${ticker}&interval=${this.state.timeInterval}&outputsize=250`;
        
        const fetchStockBasicInfo = fetch(stockBasicInfoUrl);
        const fetchStockData = fetch(stockDataUrl);
        
        this.fetchNecessaryIndicators();
        Promise.all([fetchStockBasicInfo, fetchStockData])
            .then(responses => {
                return Promise.all(responses.map(res => res.json()))
            })
            .then(responses => {
                 this.setState({ 
                    loading: false,
                    tickerBasicInfo: this.state.tickerBasicInfo.concat(responses[0]),
                    tickerData: this.state.tickerData.concat(responses[1].values)
                });
            });

    }

    componentDidUpdate(prevProps, prevState){
        if(prevState.timeInterval !== this.state.timeInterval){
            this.setState({
                tickerData: []
            });

            this.fetchStockTimeData();
        }
    }

    handleTimeIntervalChange = (e) => {
        this.setState({
            timeInterval: e.target.value
        });
    }
    
    render() {
        return (
            <>
                {this.state.loading ? (
                    <div className="loading">loading...</div>
                    ) : (
                        <div>
                            <Tooltip arrow title="Go Back">
                                <Button href="/" startIcon={<ArrowBackIcon style={{color:"white", fontSize:"2.5rem", marginLeft:"10px"}}/>}/>
                            </Tooltip>
                            <p className="title">{this.props.match.params.ticker}</p>
                            <TimeFrameDropDown defaultTime={this.state.timeInterval} handler={this.handleTimeIntervalChange}/>
                            <StockGraph ticker={this.props.match.params.ticker} data={this.state.tickerData}/>
                            <BasicInfoTile data={this.state.tickerBasicInfo[0]} />
                            <StrategiesTable indicators={this.state.indicator} data={this.state.tickerData}/>
                        </div>
                    )}
            </>
        );
    }
}

export default Stock;