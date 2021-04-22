import React from 'react';
import ReactApexChart from 'react-apexcharts';


class StockGraph extends React.Component {
    constructor(props) {
      super(props);

      this.state = {   
        series: [{
          data: []
        }],
        options: {
          chart: {
            type: 'candlestick',
            height: 400
          },
          title: {
            text: `${this.props.ticker} Chart`,
            align: 'left'
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: {
            tooltip: {
              enabled: true
            }
          }
        }
      };
    }

    setPlotData() {
        const plotData = []
        this.props.data.forEach(element => {
            let open = Number (element.open);
            let high = Number (element.high);
            let low = Number (element.low);
            let close = Number (element.close);

            let individual = {
                x: element.datetime,
                y: [open.toFixed(2), high.toFixed(2), low.toFixed(2), close.toFixed(2)]
            }
            plotData.push(individual);
        })

        this.setState({
            series: [{
                data: plotData
            }]
        })
    }

    componentDidMount() {
        this.setPlotData();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data.length < this.props.data.length){
            // this.setState({
            //   tickerData: []
            // });
            this.setPlotData();
        }
        console.log("-------------UPDATING GRAPH---------")
    }

    render() {

        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
            </div>
        );
    }
}

export default StockGraph;