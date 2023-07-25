import React from "react";
import Plot from 'react-plotly.js';
import ReactDOM from 'react-dom';
import './styling/Stocks.css';
let stockName = "MSFT"; 
const math = require('mathjs');

class Stock extends React.Component{

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedStock !== this.state.selectedStock) {
          this.fetchStock();
        }
      }

    constructor (props){
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues:[],
            stockChartXValuesFull: [],
            stockChartYValuesFull:[],
            selectedStock: stockName
        }
        this.handleStockChange = this.handleStockChange.bind(this); // Bind the method
    }

    handleStockChange(event) {
        this.setState({ selectedStock: event.target.value });
      }

    componentDidMount (){
        this.fetchStock();
    }

    fetchStock(){
        const pointerToThis = this;
        const API_KEY = 'CSAMBGSZAOQJD97Q';
        const API_KEY2 = '88W27I2HX2M3HO8F';
        let API_CALL = 
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.selectedStock}&outputsize=compact&apikey=${API_KEY}`;
        let API_CALL2 = 
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${this.state.selectedStock}&outputsize=full&apikey=${API_KEY}`;
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
    <div class = "title-text">
         <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-black from-red-600">Stalkin'</span>Stocks.</h1>
         <h3 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white">Choose from the dropdown to view <span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">stock data</span></h3>
         <h4>Stock Symbol: <span id="demo">MSFT</span></h4>
         <p class="text-sm font-normal text-gray-500 lg:sm dark:text-gray-400">Hey there! AlphaVantage API only supports 5 API calls/min upto 100 calls/day so please be patient!</p>
         <div className="form-group">
  <select
    className="form-control"
    value={this.state.selectedStock}
    onChange={this.handleStockChange}
  >
    <option value="MSFT">Microsoft (MSFT)</option>
    <option value="AAPL">Apple (AAPL)</option>
    <option value="GOOGL">Alphabet (GOOGL)</option>
    <option value="IBM">IBM (IBM)</option>
    <option value="AMZN">Amazon (AMZN)</option>
    {/* Add more options for other stocks */}
  </select>
  <button type="submit" className="form-control btn btn-whatever">
    Select Stock
  </button>
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
    {

    <body class = "bg-cyan-900 flex justify-center items-center h-screen" >
        <table class = "shadow-2x1 font-[Poppins] border-2 border-cyan-200 w-6/12">
            <thead class = "text-white">
                <tr>
                    <th class = "py-3 bg-cyan-800">Hey</th>
                    <th class = "py-3 bg-cyan-800">There</th>
                    <th class = "py-3 bg-cyan-800">Hows</th>
                    <th class = "py-3 bg-cyan-800">It</th>
                </tr>
            </thead>
            <tbody class = "text-cyan-900 text-center">
                <tr class = "bg-cyan-200 cursor-pointer duration-300">
                    <td class = "py-3 px-6"> 1</td>
                    <td class = "py-3 px-6"> 2</td>
                    <td class = "py-3 px-6"> 3</td>
                    <td class = "py-3 px-6"> 4</td>
                </tr>
                <tr class = "bg-cyan-200 cursor-pointer duration-300">
                    <td class = "py-3 px-6"> 5</td>
                    <td class = "py-3 px-6"> 6</td>
                    <td class = "py-3 px-6"> 7</td>
                    <td class = "py-3 px-6"> 8</td>
                </tr>
                <tr class = "bg-cyan-200 cursor-pointer duration-300">
                    <td class = "py-3 px-6"> 9</td>
                    <td class = "py-3 px-6"> 10</td>
                    <td class = "py-3 px-6"> 11</td>
                    <td class = "py-3 px-6"> 12</td>
                </tr>

            </tbody>
        </table>
    </body>
        }




</div>
        )
    }
}
export default Stock;