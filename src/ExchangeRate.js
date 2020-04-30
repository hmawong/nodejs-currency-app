import React from 'react';
import { Link } from "react-router-dom";
import currencies_name_symbol from './currencies-name-symbol';
import { json, checkStatus } from './utils';

class ExchangeRate extends React.Component {
  constructor () {
    super();
    this.state = {
      base: 'USD',
      rates: null,
    }
  }

  changeBase = (event) => {
    this.setState({ base: event.target.value });
  }

  render () {
    const { base, rates } = this.state;

    return (
      <React.Fragment>
        <form className="p-3 bg-light form-inline justify-content-center">
          <h3 className="mb-2">Base currency: <b className="mr-2">1</b></h3>
          <select value={base} onChange={this.changeBase} className="form-control form-control-lg mb-2">
            <option value="USD">USD</option>
            <option value="USD">HKD</option>
          </select>
        </form>
      </React.Fragment>
    )
  }
}

export default ExchangeRate;
