import React from 'react';
import {Tooltip} from '@material-ui/core';

class Strategy extends React.Component {
    
    render() {

        return(
            <>
                <div className="strategyRow">
                    <Tooltip arrow title={
                        <div className="tooltipTextContainer">
                            <p className="tooltipTextTitle">{this.props.name}:</p>
                            <p>{this.props.description}</p>
                        </div>}>
                            <p className="tableCell">{this.props.name}</p>
                    </Tooltip>
                    <Tooltip arrow title={
                        <div className="tooltipTextContainer">
                            <p className="tooltipTextTitle">What Does This Mean For Me?</p>
                            <p>{this.props.resultMeaning}</p>
                        </div>}>
                            <p style={this.props.style} className="tableCell">{this.props.result}</p>
                    </Tooltip>
                </div>
            </>
        )
    }
}

export default Strategy;