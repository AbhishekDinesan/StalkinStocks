import React from "react";
import Plot from 'react-plotly.js';
import ReactDOM from 'react-dom';
import './styling/Stocks.css';
let stockName = "MSFT"; 
const math = require('mathjs');

class Stock extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues:[],
            stockChartXValuesFull: [],
            stockChartYValuesFull:[],
            stkName: stockName
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    handleSubmit(event) {
        //changes the new stock symbol, prevents page from refreshing to default
        const cat = document.getElementById("demo").innerHTML =  this.state.value;
        stockName = cat;
        this.setState.value = cat;
        this.fetchStock();
        event.preventDefault();
    }

    componentDidMount (){
        this.fetchStock();
    }

    fetchStock(){
        const pointerToThis = this;
        const API_KEY = 'CSAMBGSZAOQJD97Q';
        const API_KEY2 = '88W27I2HX2M3HO8F';
        let API_CALL = 
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=compact&apikey=${API_KEY}`;
        let API_CALL2 = 
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=full&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];
        let stockChartXValuesFunctionFull = [];
        let stockChartYValuesFunctionFull = [];

    fetch (API_CALL)
        .then (
            function(response){
                return response.json();
            }
        )
        .then (
            function(data){
                console.log(data);
                for (var key in data['Time Series (Daily)']){
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
                }

                pointerToThis.setState({
                    stockChartXValues: stockChartXValuesFunction,
                    stockChartYValues: stockChartYValuesFunction
                });


                if(!stockName){
                    document.getElementById('demo').innerHTML= "Nothing available at this time";
                }     

            }
        )
    
    fetch (API_CALL2)
    .then (
        function(response){
            return response.json();
        }
    )
    .then (
        function(data){
            console.log(data);
        
            for (var key in data['Time Series (Daily)']){
                stockChartXValuesFunctionFull.push(key);
                stockChartYValuesFunctionFull.push(data['Time Series (Daily)'][key]['1. open']);
            }

            pointerToThis.setState({
                stockChartXValuesFull: stockChartXValuesFunctionFull,
                stockChartYValuesFull: stockChartYValuesFunctionFull
            });

            if(!stockName){
                document.getElementById('demo').innerHTML= "Nothing available at this time";
            }     

        }
    )
    }
    render(){
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        return (
    <div>
         <h1>Stalkin' Stocks</h1>
         <h4>Stock Symbol: <span id="demo">MSFT</span></h4>
         <h1>`This is ${stockName} recent performance`</h1>
    <div className="form-group">
               <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                        <button type="submit" className="form-control btn btn-whatever" >Select Stock</button>
                </form>
    </div>
    <div className="card-container">        
    <div className="card">
        <Plot
            data={[
             {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'black' },
            }
        ]}
        
            layout={{width: 620, height: 440,  paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)' }}/>
    </div>
        <div className="card">
        <Plot
            data={[
             {
                x: this.state.stockChartXValuesFull,
                y: this.state.stockChartYValuesFull,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'red' },
            }
        ]}
            layout={{width: 620, height: 440, paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)',
            }}/>
        </div>
    </div>
</div>
        )
    }
}
export default Stock;