import React from "react";
import Plot from 'react-plotly.js';

let stockName = "MSFT";

class Stock extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues:[],
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
        //let StockSymbol = 'AMZN';
        let API_CALL = 
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockName}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

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
    }
        





    render(){
        return (
        <div className="App"> 
         <br />
         <div className="form-group">
               <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange}/>
                        <button type="submit" className="form-control btn btn-whatever" >Select Stock</button>
                </form>
                </div>
            <h1> Financial Projection Model</h1>
            <h4>Stock Symbol: <span id="demo">MSFT</span></h4>
        <Plot
            data={[
             {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            }
        ]}
            layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
      />
        </div>
        )
    }
}

export default Stock;