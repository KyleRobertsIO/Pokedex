import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component{
    
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.name !== nextProps.name){
            return true;
        }else{
            return false;
        }
    }

    render(){
        return (
            <div className="chart">
                <Bar
                data={this.props.chartData}
                width={400}
                height={300}
                options={{
                    maintainAspectRatio: false,
                    legend: {
                        display: false
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                fontColor: "white"
                            }
                        }],
                        yAxes: [{
                            gridLines: {
                                display: true,
                                drawBorder: false,
                                color: 'white',
                                zeroLineColor: 'white'
                            },
                            ticks: {
                                beginAtZero: true,
                                fontColor: "white"
                            }
                        }]
                    }
                }}
                />
            </div>
        )
    }
}

export default Chart;