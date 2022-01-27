import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Header from '../header';
import './app.scss';

const OneExchangePage = React.lazy(()=> import('../pages/oneExchangePage'));
const ExchangeRatesPage = React.lazy(()=> import('../pages/exchangeRatesPage'));
const App = () => {

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

export default App;