import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from '../header';
import { connect } from 'react-redux';
import {catchError,defArr, LocalCurr, CurrencyOptions} from '../../actions/index';
import './app.scss';

const BASE_URL = 'https://v6.exchangerate-api.com/v6/d0978667068dde0fbd88efe3/latest';

const OneExchangePage = React.lazy(()=> import('../pages/oneExchangePage'));
const ExchangeRatesPage = React.lazy(()=> import('../pages/exchangeRatesPage'));

const App = (props) => {

    const { defCurr, defArr,catchError,localCurrency , CurrencyOptions} = props;
    
    useEffect(() => {
        
        fetch(`${BASE_URL}/${localCurrency || defCurr}`)
        .then(res => res.json())
        .then(data => {
          CurrencyOptions([...Object.keys(data.conversion_rates)])
          defArr( [Object.entries(data.conversion_rates)[145],
          Object.entries(data.conversion_rates)[43],
          Object.entries(data.conversion_rates)[118],
          Object.entries(data.conversion_rates)[113],
          Object.entries(data.conversion_rates)[45],
          Object.entries(data.conversion_rates)[144],])
        })
        .catch(error => catchError(error));
        
    } ,[localCurrency])
    
    return (
        <React.Suspense fallback={<span>Loading...</span> }>
            <Router>
                <Header/>
                <div className="container">
                    <Routes>
                        <Route  path="/" exact element={<OneExchangePage/>}/>  
                        <Route  path="/exchangeRates" element={<ExchangeRatesPage/>}/> 
                    </Routes>
                </div>
            </Router>
        </React.Suspense>
    )
}

const mapStateToProps = (state)=>{
    return{
        defCurr: state.defCurr,
        localCurrency: state.localCurrency,
        
    }
  }
  
  const mapDispatchToProps = { 
    catchError,
    defArr,
    LocalCurr,
    CurrencyOptions
  };
  export default connect(mapStateToProps,mapDispatchToProps)(App);