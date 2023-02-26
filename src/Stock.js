import React from "react";
import Plot from 'react-plotly.js';
import ReactDOM from 'react-dom';
import './Stocks.css';


let stockName = "MSFT"; 

const math = require('mathjs');
var projection = 0;

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
        //let StockSymbol = 'AMZN';
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

                projection = projectTmrwPrice(stockChartYValuesFunction, 1, 2);

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
        <div className="App"> 
         <br />
         <div className="bg-blue-500 text-white p-4">
        This component has a blue background and white text.
        <div className="bg-blue-500 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Stocks</h1>
         
        <p>{projection}</p>
    </div>
        </div>
         <h1 className="text-4xl text-red-500">Financial Projection Model</h1>
         <h4>Stock Symbol: <span id="demo">MSFT</span></h4>
         <div className="form-group">
               <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                        <button type="submit" className="form-control btn btn-whatever" >Select Stock</button>
                </form>
            </div>
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
            layout={{width: 720, height: 440, title: `This is ${stockName} recent performance`}}/>

            



        
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
            layout={{width: 720, height: 440, title: `Long-term performance  ${stockName}`}}/>
        </div>
        )
    }
}

//calculation functions

//meanDailyChange = (endPrice - startPrice) / startPrice / n
//stdDevDailyChange = sqrt(sum((price[i] / price[i-1] - 1 - meanDailyChange)^2) / (n-1))

//meandailyaverage of an array

function dailyChange(arr){
    var length = arr.length;
    var first = arr[0];
    var last = arr[length];
    return (last - first) / first / length; 
}

function calculateStdDevAsPercent(numbers) {
    const mean = numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
    const variance = numbers.reduce((acc, val) => acc + (val - mean) ** 2, 0) / numbers.length;
    const stdDev = Math.sqrt(variance);
    const stdDevAsPercent = (stdDev / mean) * 100;
    return stdDevAsPercent;
  }

function projectTmrwPrice (curr_price, meanDailyChange, stdDailyChange)
{
    const drift = meanDailyChange - (stdDailyChange * stdDailyChange) / 2;
    const randomShock = stdDailyChange * normSinv(Math.Random());
    return curr_price * Math.exp(drift + randomShock);
}

function normSinv(prob) {
    // Compute the inverse of the CDF of the standard normal distribution
    return math.round(math.invCdf('normal', prob, {mu: 0, sigma: 1}), 4);
  }

export default Stock;