import React from 'react';

class TimeFrameDropDown extends React.Component {

    render() {
        return (
            <div className="chartContainer">
                    <label className="labelStyle">Time Frame: </label>
                    <select name="timeFrame" 
                            id="timeFrame" 
                            defaultValue={this.props.defaultTime}
                            onChange={this.props.handler}>
                        <option value="1h">1 Hour</option>
                        <option value="1day">1 Day</option>
                        <option value="1week">1 Week</option>
                        <option value="1month">1 Month</option>
                    </select>
            </div>
        )
    }
}

export default TimeFrameDropDown;