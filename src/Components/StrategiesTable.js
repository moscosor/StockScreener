import React from 'react';
import Strategy from './Strategy';
import {stratDescriptions, stratResultDescriptions} from '../data/descriptions'
import {morningGap, momentumGap, aboveMovingAverage, movingAverageCrossover} from '../HelperFunctions/Strategies';

class StrategiesTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: [],
            close: [],
            volume: [],
            shortPeriod: 13,
            longPeriod: 50,
            morningGap: null,
            momentumGap: null,
            aboveMovingAverage: null,
            movingAverageCrossover: null,
            rsi: null
        }
    }

    seperateTickerData() {
        const tickerData = this.props.data;
        let open = [];
        let close = [];
        let volume = [];

        tickerData.forEach((element) => {
            open.push(Number (element.open));
            close.push(Number (element.close));
            volume.push(Number (element.volume));
        });

        this.setState({
            open: this.state.open.concat(open),
            close: this.state.close.concat(close),
            volume: this.state.volume.concat(volume),
            rsi: this.props.indicators.rsi === null ? "N/A" : this.props.indicators.rsi
        }, () => {
            this.calculateAllStrategies();
        });
    }

    componentDidMount() {
        this.seperateTickerData();
    }

    calculateAllNonDailyStrategies() {
        let aboveMovingAverageRes = aboveMovingAverage(this.state.close, this.state.shortPeriod);
        let movingAverageCrossoverRes = movingAverageCrossover(this.state.close, this.state.shortPeriod, this.state.longPeriod);
        
        this.setState({
                aboveMovingAverage: aboveMovingAverageRes[0],
                movingAverageCrossover: movingAverageCrossoverRes,
                rsi: this.props.indicators.rsi
            });
    }

    calculateAllStrategies() {
        let morningGapRes = morningGap(this.state.close, this.state.open);
        let momentumGapRes = momentumGap(this.state.close, this.state.open, this.state.volume);
        let aboveMovingAverageRes = aboveMovingAverage(this.state.close, this.state.shortPeriod);
        let movingAverageCrossoverRes = movingAverageCrossover(this.state.close, this.state.shortPeriod, this.state.longPeriod);
        
        // console.log(morningGapRes)
        // console.log(momentumGapRes)
        // console.log(aboveMovingAverageRes)
        // console.log(movingAverageCrossoverRes)
        
        this.setState({
                morningGap: morningGapRes,
                momentumGap: momentumGapRes,
                aboveMovingAverage: aboveMovingAverageRes[0],
                movingAverageCrossover: movingAverageCrossoverRes,
                rsi: this.props.indicators.rsi
            });
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data.length < this.props.data.length){
            console.log(this.state.tickerData)
            this.setState({
                open: [],
                close: [],
                volume: [],
                tickerData: [],
                aboveMovingAverage: null,
                movingAverageCrossover: null,
                rsi: null
            }, () => {
                this.seperateTickerData();
            });
            console.log("-------------UPDATING STRATEGIES------------")
        }
    }

    
    
    render() {
        return(
            <>
                <h1 className="littleTitle">Stock Strategies</h1>
                <div className="strategyTable">
                <div className="strategyTitle">
                    <p className="tableCell littleTitle">Strategy Name</p>
                    <p className="tableCell littleTitle">Result</p>
                </div>
                    <Strategy 
                        resultMeaning={stratResultDescriptions.morningGapRes} 
                        description={stratDescriptions.morningGapScan} 
                        style={{ color: Number (this.state.morningGap) > 1 ? 'green': 'red'}}  
                        name={"Morning Gap"} 
                        result={typeof this.state.morningGap == 'boolean' ? `${this.state.morningGap}` : `${this.state.morningGap}%`}/>
                    <Strategy 
                        resultMeaning={stratResultDescriptions.momentumGapRes} 
                        description={stratDescriptions.momentumGapScan} 
                        style={{ color: this.state.momentumGap > 1 ? 'green': 'red'}}  
                        name={"Momentum Gap"} 
                        result={typeof this.state.momentumGap == 'boolean' ? `${this.state.momentumGap}` : `${this.state.momentumGap}%`}/>
                    <Strategy 
                        resultMeaning={stratResultDescriptions.aboveMovingAverageRes} 
                        description={stratDescriptions.aboveMovingAverageScan} 
                        name={"Above Moving Average"} 
                        result={typeof this.state.aboveMovingAverage == 'number' ? `${this.state.aboveMovingAverage} ticks ago` : `${this.state.aboveMovingAverage}`}/>
                    <Strategy 
                        resultMeaning={stratResultDescriptions.movingAverageRes} 
                        description={stratDescriptions.movingAverageScan} 
                        style={{ color: typeof this.state.movingAverageCrossover != 'number' ? 'orange': 'green'}} 
                        name={"Moving Average Crossover"} 
                        result={typeof this.state.movingAverageCrossover == 'number' ? `${this.state.movingAverageCrossover} ticks ago` : `${this.state.movingAverageCrossover}`}/>
                    <Strategy 
                        resultMeaning={stratResultDescriptions.rsiRes} 
                        style={{color: Number (this.state.rsi) > 70 ? 'red': Number (this.state.rsi) < 30 ? 'green' : '#BA55D3'}}
                        description={stratDescriptions.rsiScan} 
                        name={"Relative Strength Index"} 
                        result={String (this.state.rsi)}/>
                </div>
            </>
        )
    }
}

export default StrategiesTable;