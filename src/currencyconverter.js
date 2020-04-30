import React from 'react';
import currencies_name_symbol from './utils/currencies_name_symbol';
import { checkStatus, json } from './utils/utils';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 7.75,
      baseAcronym: 'USD',
      baseValue: 1,
      quoteAcronym: 'HKD',
      quoteValue: 1 * 7.75,
      loading: false,
    };
  }

  componentDidMount() {
    const { baseAcronym, quoteAcronym } = this.state;
    this.getRate(baseAcronym, quoteAcronym);
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
  }

  changeBaseValue = (event) => {
    const quoteValue = this.convert(event.target.value, this.state.rate, this.toQuote);
    this.setState({
      baseValue: event.target.value,
      quoteValue,
    });
  }

  changeQuoteAcronym = (event) => {
    const quoteAcronym = event.target.value;
    this.setState({ quoteAcronym });
    this.getRate(this.state.baseAcronym, quoteAcronym);
  }

  changeQuoteValue = (event) => {
    const baseValue = this.convert(event.target.value, this.state.rate, this.toBase);
    this.setState({
      quoteValue: event.target.value,
      baseValue,
    });
  }

  render() {
    const { baseAcronym, baseValue, quoteAcronym, quoteValue, loading } = this.state;

    const currencyOptions = Object.keys(currencies_name_symbol).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>);

    return (
      <React.Fragment>
        <div className="text-center p-3">
          <h2 className="mb-2">Currency Converter</h2>
        </div>
        <form className="form-row row-no-gutters justify-content-center">
          <div className="form-group col-md-5 mb-0">
            <div className="row">
              <div className="col-3">
                <select value={baseAcronym} onChange={this.changeBaseAcronym} className="form-control form-control-sm mb-2" disabled={loading}>
                  {currencyOptions}
                </select>
              </div>
              <div className="col-9">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text input-sm">{currencies_name_symbol[baseAcronym].symbol}</div>
                  </div>
                  <input id="base" className="form-control form-control-sm" value={baseValue} onChange={this.changeBaseValue} type="number" />
                </div>
              </div>
            </div>
            <div className="col-12 text-center">
              <small className="text-secondary">{currencies_name_symbol[baseAcronym].name}</small>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-center ">
            <h5>=</h5>
          </div>
          <div className="form-group col-md-5 mb-0">
          <div className="row">
            <div className="col-3">
            <select value={quoteAcronym} onChange={this.changeQuoteAcronym} className="form-control form-control-sm mb-2" disabled={loading}>
              {currencyOptions}
            </select>
            </div>
            <div className="col-9">
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text input-sm">{currencies_name_symbol[quoteAcronym].symbol}</div>
              </div>
              <input id="quote" className="form-control form-control-sm" value={quoteValue} onChange={this.changeQuoteValue} type="number" />
            </div>
            </div>
          </div>
            <div className="col-12 text-center">
              <small className="text-secondary">{currencies_name_symbol[quoteAcronym].name}</small>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default CurrencyConverter
