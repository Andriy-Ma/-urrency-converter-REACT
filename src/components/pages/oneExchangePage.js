import React,{useState,useEffect} from 'react';
import ChooseCurrency from '../chooseСurrency';
import CurrencyRow from '../currencyRow';
import { connect } from 'react-redux';
import {catchError} from '../../actions/index';
import Error from '../message';

import './oneExchangePage.scss';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/68550d100fd4323af51f3b06/latest';

const OneExchangePage = (props) => {
    const {error , tog} = props;
    const [toggle, setToggle]= useState({toggle: tog});
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState('');
    const [amount, setAmount] = useState('');
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
    const currency = localStorage.getItem('currency');


    let toAmount, fromAmount
    if (amountInFromCurrency) {
      fromAmount = amount;
      toAmount = amount * exchangeRate;
    } else {
      toAmount = amount;
      fromAmount = amount / exchangeRate;
    }
  
    useEffect(() => {
      fetch(`${BASE_URL}/USD`)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.conversion_rates)[144];
          setCurrencyOptions( [...Object.keys(data.conversion_rates)]);
          setFromCurrency(currency);
          setToCurrency(firstCurrency);
          setExchangeRate(data.conversion_rates[firstCurrency]);
        })
        .catch(error => props.catchError(error))
    }, [])
  
    useEffect(() => {
      if (fromCurrency != null && toCurrency != null) {
        fetch(`${BASE_URL}/${fromCurrency}`)
          .then(res => res.json())
          .then(data => {  
            setExchangeRate(data.conversion_rates[toCurrency])})
          .catch(error => props.catchError(error))
      }
    }, [fromCurrency, toCurrency])
  
    function handleFromAmountChange(e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(true)
    }
  
    function handleToAmountChange(e) {
      setAmount(e.target.value)
      setAmountInFromCurrency(false)
    }

    function changeChoise(item) {
       localStorage.removeItem('currency');
       setFromCurrency(item);
       setToggle({toggle: !toggle});
    }

    if(error){
      return <Error/>
    }

    if(localStorage.getItem('currency') && toggle){
        return (
            <div className="firstPage">
                <p>You chose the "{currency}"</p>
                <button onClick={()=> changeChoise()}>Change currency</button>
            <div className="firstPage__inputs">
                <CurrencyRow
                    currencyOptions={currencyOptions}
                    selectedCurrency={fromCurrency}
                    onChangeCurrency={e => setFromCurrency(e.target.value)}
                    onChangeAmount={handleFromAmountChange}
                    amount={fromAmount}
                />
                <span><i className="fas fa-exchange-alt"></i></span>
                <CurrencyRow
                    currencyOptions={currencyOptions}
                    selectedCurrency={toCurrency}
                    onChangeCurrency={e => setToCurrency(e.target.value)}
                    onChangeAmount={handleToAmountChange}
                    amount={toAmount}
                />
            </div>
       </div>
        )
    } 
    return (
        <div className="firstPage">
            <ChooseCurrency onChangeCurrency={(item) => setFromCurrency(item)}/>
            <div className="firstPage__inputs">
            <CurrencyRow
                currencyOptions={currencyOptions}
                selectedCurrency={fromCurrency}
                onChangeCurrency={e => setFromCurrency(e.target.value)}
                onChangeAmount={handleFromAmountChange}
                amount={fromAmount}
            />
                <span><i className="fas fa-exchange-alt"></i></span>
                <CurrencyRow
                    currencyOptions={currencyOptions}
                    selectedCurrency={toCurrency}
                    onChangeCurrency={e => setToCurrency(e.target.value)}
                    onChangeAmount={handleToAmountChange}
                    amount={toAmount}
                />
            </div>
       </div>
    );
    
};
const mapStateToProps = (state)=>{
  return{
      error: state.error,
      tog: state.tog
  }
}

const mapDispatchToProps = { 
  catchError
};
export default connect(mapStateToProps,mapDispatchToProps)(OneExchangePage);