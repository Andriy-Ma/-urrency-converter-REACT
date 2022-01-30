import React,{useState,useEffect} from 'react';
import ChooseCurrency from '../chooseСurrency';
import CurrencyRow from '../currencyRow';
import { connect } from 'react-redux';
import {catchError} from '../../actions/index';
import Error from '../message';

import './oneExchangePage.scss';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/d0978667068dde0fbd88efe3/latest';

const OneExchangePage = (props) => {
    const {error , tog , defCurr, firstCurrency,currencyOpt} = props;
    const [toggle, setToggle]= useState({toggle: tog});
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
      fetch(`${BASE_URL}/${defCurr}`)
        .then(res => res.json())
        .then(data => {
          setFromCurrency(currency || firstCurrency);
          setToCurrency('UAH');
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
       setFromCurrency("USD" );
       setToCurrency("UAH");
       setToggle({toggle: !toggle});
    }

    function yourChouse() {
      return(
          <>
            <p>You chose the "{currency}"</p>
            <button onClick={()=> changeChoise()}>Change currency</button>
          </>
      )
    
  }

  if(error){
    return <Error/>
  }

      return (
          <div className="firstPage">
            {localStorage.getItem('currency') && toggle ? yourChouse() :  <ChooseCurrency onChangeCurrency={(item) => setFromCurrency(item)}/>}
          <div className="firstPage__inputs">
              <CurrencyRow
                  currencyOptions={currencyOpt}
                  selectedCurrency={fromCurrency}
                  onChangeCurrency={e => setFromCurrency(e.target.value)}
                  onChangeAmount={handleFromAmountChange}
                  amount={fromAmount}
              />
              <span><i className="fas fa-exchange-alt"></i></span>
              <CurrencyRow
                  currencyOptions={currencyOpt}
                  selectedCurrency={toCurrency}
                  onChangeCurrency={e => setToCurrency(e.target.value)}
                  onChangeAmount={handleToAmountChange}
                  amount={toAmount}
              />
          </div>
     </div>
      )
    
};
const mapStateToProps = (state)=>{
  return{
      error: state.error,
      tog: state.tog,
      defCurr: state.defCurr,
      firstCurrency: state.firstCurrency,
      currencyOpt: state.currencyOpt
  }
}

const mapDispatchToProps = { 
  catchError
};
export default connect(mapStateToProps,mapDispatchToProps)(OneExchangePage);