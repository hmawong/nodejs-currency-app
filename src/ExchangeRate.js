import React from 'react';
import { Link } from "react-router-dom";
import currencies_name_symbol from './utils/currencies_name_symbol';
import { json, checkStatus } from './utils/utils';
import CurrencyConverter from './currencyconverter';
import CurrencyList from './currencylist';

class ExchangeRate extends React.Component {
  constructor () {
    super();
    this.state = {
      base: 'USD',
      rates: null,
    }
  }

  componentDidMount() {
    this.getRatesData(this.state.base);
  }

  getRatesData = (base) => {
    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rates = Object.keys(data.rates)
          .filter(acronym => acronym !== base)
          .map(acronym => ({
            acronym,
            rate: data.rates[acronym],
            name: currencies_name_symbol[acronym].name,
            symbol: currencies_name_symbol[acronym].symbol,
          }))
          this.setState({ rates });
        })
    .catch(error => console.error(error.message));
  }

  changeBase = (event) => {
    this.setState({ base: event.target.value });
    this.getRatesData(event.target.value);
  }

  render () {
    const { base, rates } = this.state;

    return (
      <React.Fragment>
        <CurrencyConverter />
        <form className="p-1 form-inline justify-content-center">
          <h6 className="mb-1">Base currency</h6>
          <select value={base} onChange={this.changeBase} className="form-control form-control-sm ml-2 mb-2">
            {Object.keys(currencies_name_symbol).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
          </select>
        </form>
        <CurrencyList base={base} rates={rates} />
      </React.Fragment>
    )
  }
}

export default ExchangeRate;
