import React from 'react';

class BasicInfoTile extends React.Component {
    render(){
        return (
            <>
                <h1 className="littleTitle">Stock Info</h1>
                <div className="stockInfoTile">
                    <p>Name: {this.props.data.name}</p>
                    <p>Exchange: {this.props.data.exchange}</p>
                    <p>Open: ${Number (this.props.data.open).toFixed(2)}</p>
                    <p>Close: ${Number (this.props.data.close).toFixed(2)}</p>
                    <p>High: ${Number (this.props.data.high).toFixed(2)}</p>
                    <p>Low: ${Number (this.props.data.low).toFixed(2)}</p>
                    <p>Average Volume: {this.props.data.average_volume}</p>
                    <p>Volume: {this.props.data.volume}</p>
                    <p>Percent Change: {Number (this.props.data.percent_change).toFixed(2)}%</p>
                    <p>52 Week High: ${Number (this.props.data.fifty_two_week.high).toFixed(2)}</p>
                    <p>52 Week Low: ${Number (this.props.data.fifty_two_week.low).toFixed(2)}</p>
                </div>
            </>
        );
    }
}

export default BasicInfoTile;