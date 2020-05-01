import React from 'react';
import { Link } from "react-router-dom";
import currencies_name_symbol from './utils/currencies_name_symbol';
import { checkStatus, json } from './utils/utils';
import Chart from 'chart.js';

class HistChart extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      rate: 0,
      baseAcronym: params.get('base') || 'USD',
      baseValue: 0,
      quoteAcronym: params.get('quote') || 'HKD',
      quoteValue: 0,
      loading: false,
    };

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const { baseAcronym, quoteAcronym } = this.state;
    this.getRate(baseAcronym, quoteAcronym);
    this.getHistoricalRates(baseAcronym, quoteAcronym);
  }

  getRate = (base, quote) => {
    this.setState({ loading: true });
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}&symbols=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rate = data.rates[quote];

        this.setState({
          rate,
          baseValue: 1,
          quoteValue: Number((1 * rate).toFixed(3)),
          loading: false,
        });
      })
      .catch(error => console.error(error.message));
  }

  getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date()).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");

    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })
  }

  toBase(amount, rate) {
    return amount * (1 / rate);
  }

  toQuote(amount, rate) {
    return amount * rate;
  }

  convert(amount, rate, equation) {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(3);
  }

  changeBaseAcronym = (event) => {
    const baseAcronym = event.target.value;
    this.setState({ baseAcronym });
    this.getRate(baseAcronym, this.state.quoteAcronym);
    this.getHistoricalRates(baseAcronym, this.state.quoteAcronym);
  }


  changeQuoteAcronym = (event) => {
    const quoteAcronym = event.target.value;
    this.setState({ quoteAcronym });
    this.getRate(this.state.baseAcronym, quoteAcronym);
    this.getHistoricalRates(this.state.baseAcronym, quoteAcronym);
  }

  render() {
    const { rate, baseAcronym, quoteAcronym, loading } = this.state;

    const currencyOptions = Object.keys(currencies_name_symbol).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>);

    return (
      <React.Fragment>
        <div className="text-center p-3">
          <h3 className="mb-2">Historical Rate Chart</h3>
          <h5>1 {baseAcronym} {currencies_name_symbol[baseAcronym].name} = {rate.toFixed(4)} {quoteAcronym}  {currencies_name_symbol[quoteAcronym].name}</h5>
        </div>
        <form className="form-row p-3 mb-4 bg-white justify-content-center">
          <div className="form-group col-md-5 mb-0">
            <select value={baseAcronym} onChange={this.changeBaseAcronym} className="form-control form-control-sm mb-2" disabled={loading}>
              {currencyOptions}
            </select>
          </div>
          <div className="col-md-2 d-flex justify-content-center align-items-center">
            <h5>=</h5>
          </div>
          <div className="form-group col-md-5 mb-0">
            <select value={quoteAcronym} onChange={this.changeQuoteAcronym} className="form-control form-control-sm mb-2" disabled={loading}>
              {currencyOptions}
            </select>
          </div>
        </form>
        <canvas ref={this.chartRef} />
      </React.Fragment>
    )
  }
}

export default HistChart;
