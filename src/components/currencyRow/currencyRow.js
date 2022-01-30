import React from "react";

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency = '' ,
        onChangeCurrency,
        onChangeAmount,
        amount
      } = props
      return (
        <div>
          <input type="number" className="input" value={amount} onChange={onChangeAmount} />
          <select value={selectedCurrency == null ? '' : selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map((option,i) => (
              <option key={option+i} value={option}>{option}</option>
            ))}
          </select>
        </div>
      )
    
}