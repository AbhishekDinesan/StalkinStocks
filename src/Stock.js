//testing
import React from "react";
import Plot from 'react-plotly.js';
import { BsArrowLeftCircleFill } from "react-icons/bs";
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
        const API_KEY = '';
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
        }
    )
    }
    render(){
        const trace1 = {
            x: this.state.stockChartXValuesFull,
            close: this.state.stockChartYValuesFull,
            decreasing: { line: { color: '##ff0000' } },
            high: this.state.stockChartYValuesFull,
            increasing: { line: { color: '#000000' } },
            line: { color: 'rgba(31,119,180,1)' },
            low: this.state.stockChartYValuesFull,
            open: this.state.stockChartYValuesFull,
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
          };
      
          const data = [trace1];
      
          const layout = {
            dragmode: 'zoom',
            margin: {
              r: 10,
              t: 25,
              b: 40,
              l: 60,
            },
            title: {
                text: `20Y Candlestick for ${stockName}`, // Your desired title
                x: 0.5,  // Adjust the horizontal alignment of the title
                font: {
                  size: 16,  // Adjust the font size of the title
                  color: 'black',
                  weight: 'bold',
                },
              },
            showlegend: false,
            xaxis: {
              autorange: true,
              domain: [0, 1],
              range: [
                this.state.stockChartXValues[0],
                this.state.stockChartXValuesFull[this.state.stockChartXValuesFull.length - 1]
              ],
              rangeslider: {
                range: [
                  this.state.stockChartXValuesFull[0],
                  this.state.stockChartXValuesFull[this.state.stockChartXValuesFull.length - 1]
                ],
              },
              type: 'date',
            },
            yaxis: {
              autorange: true,
              domain: [0, 1],
              range: [
                Math.min(...this.state.stockChartYValuesFull),
                Math.max(...this.state.stockChartYValuesFull)
              ],
              type: 'linear',
            },
            paper_bgcolor: 'rgba(0, 0, 0, 0)',    // Make the paper background transparent
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
          };
        return (
            
    <div class = "title-text">
         <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-black from-red-600">Stalkin'</span>Stocks.</h1>
         <h3 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white">Choose from the dropdown to view <span class="underline underline-offset-3 decoration-8 decoration-red-400 dark:decoration-red-600">stock data</span></h3>
         <h4>Stock Symbol: <span id="demo">MSFT</span></h4>
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
            plot_bgcolor: 'rgba(0,0,0,0)' ,
            title: {
                text: `6M Scatter for ${stockName}`, // Your desired title
                x: 0.5,  // Adjust the horizontal alignment of the title
                font: {
                  size: 16,  // Adjust the font size of the title
                  color: 'black',
                  weight: 'bold',
                },
              },
            }}/>
    </div>
        <div className="card">
        
        <Plot
        data={data}
        layout={layout}
            />
        </div>
    </div>

</div>
        )
    }
}
export default Stock;