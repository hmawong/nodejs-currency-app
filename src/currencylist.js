import React from 'react';

const CurrencyList = (props) => {
  const { rates, base } = props;
  if (!rates) {
    return null;
  }
  return (

    <div>
    <hr></hr>
      <h6 className="mb-2 text-center">Currency List</h6>
      <table className="table table-sm bg-white mt-4">
        <thead>
          <tr>
            <th scope="col" className="pr-4 py-2">Currency <small>against 1 {base}</small></th>
            <th scope="col" className="text-right pr-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {rates.map(currency =>
            <tr key={currency.acronym}>
              <td className="pl-4 py-2">{currency.name} <small>({currency.acronym}) [{currency.symbol}]</small></td>
              <td className="text-right pr-4 py-2">{currency.rate.toFixed(5)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CurrencyList
