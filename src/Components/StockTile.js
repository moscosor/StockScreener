import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StockTile extends Component {
    render() {
        return (
            <div id={this.props.ticker} className="stockTile">
                <Link to={`/stocks/${this.props.ticker}`}>{this.props.ticker}</Link>
            </div>
        );
    }
}

export default StockTile;