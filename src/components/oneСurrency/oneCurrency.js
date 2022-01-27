import React,{useEffect, useState} from "react";
import { connect } from 'react-redux';
import {catchError} from '../../actions/index';
import Error from '../message';
import './oneCurrency.scss';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/68550d100fd4323af51f3b06/latest';

const OneCurrency = (props) => {
    const {error,defCurr } = props;
    const currency = localStorage.getItem('currency');
    const [def, setDefCurr] = useState(defCurr);
    const [defArrRates, setDefArrRates] = useState([]);
    const [fromCurrency, setFromCurrency] = useState(currency);
    const [arrRates, setArrRates] = useState([]);
    
    
    useEffect(() => {
          fetch(`${BASE_URL}/${def}`)
          .then(res => res.json())
          .then(data => {
            const firstCurrency = Object.keys(data.conversion_rates)[0];
            setDefCurr(firstCurrency);
            setDefArrRates( [Object.entries(data.conversion_rates)[145],
            Object.entries(data.conversion_rates)[43],
            Object.entries(data.conversion_rates)[118],
            Object.entries(data.conversion_rates)[113],
            Object.entries(data.conversion_rates)[45],
            Object.entries(data.conversion_rates)[12],])
          })
          .catch(error => props.catchError(error));
      }, [])

    useEffect(() => {
        if(localStorage.getItem('currency')){
        fetch(`${BASE_URL}/${fromCurrency}`)
         .then(res => res.json())
         .then(data => {
           setFromCurrency(currency)
           setArrRates( [Object.entries(data.conversion_rates)[145],
           Object.entries(data.conversion_rates)[43],
           Object.entries(data.conversion_rates)[118],
           Object.entries(data.conversion_rates)[113],
           Object.entries(data.conversion_rates)[45],
           Object.entries(data.conversion_rates)[12],])
         })
         .catch(error => props.catchError(error))}
     }, [])
    
     if(error){
        return <Error/>
      }

    if(!localStorage.getItem('currency')){
    return(
        <div className="secondPage">
            <p className="secondPage__currency">Relevant for 1 {def}</p>
                {defArrRates.map((item,i)=>{
                    const key = Math.floor(item[1] * Math.random()*100) + item[0];
                    return (
                    <div key={key} className="secondPage__choice">
                        <p className="secondPage__choice-value">{item[0]}</p>
                        <span className="secondPage__choice-even"><i className="fas fa-equals"></i></span>
                        <span>{item[1]} </span>
                    </div>
                    )
                })}
        </div>
    )
}   else {
    return(
        <div className="secondPage">
            <p className="secondPage__currency">Relevant for 1 {fromCurrency}</p>
                {arrRates.map((item,i)=>{
                    const key = Math.floor(item[1] * Math.random()*100) + item[0];
                    return (
                    <div key={key} className="secondPage__choice">
                        <p className="secondPage__choice-value">{item[0]}</p>
                        <span className="secondPage__choice-even"><i className="fas fa-equals"></i></span>
                        <span>{item[1]} </span>
                    </div>
                    )
                })}
        </div>
    )
}
}

const mapStateToProps = (state)=>{
    return{
        error: state.error,
        defCurr: state.defCurr
    }
  }
  
  const mapDispatchToProps = { 
    catchError
  };

export default connect(mapStateToProps,mapDispatchToProps)(OneCurrency);