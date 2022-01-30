import React, { useEffect } from "react";
import { connect } from 'react-redux';
import {catchError,LocalCurr} from '../../actions/index';
import Error from '../message';
import './oneCurrency.scss';

const OneCurrency = (props) => {
    const {error,defCurr,defArrRates,LocalCurr } = props;
    useEffect(()=>{
        LocalCurr(localStorage.getItem('currency'));
    },[])

     if(error){
        return <Error/>
      }

    return(
        <div className="secondPage">
            <p className="secondPage__currency">Relevant for 1 {localStorage.getItem('currency')? localStorage.getItem('currency'): defCurr}</p>
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
}

const mapStateToProps = (state)=>{
    return{
        error: state.error,
        defCurr: state.defCurr,
        defArrRates: state.defArrRates
    }
  }
  
  const mapDispatchToProps = { 
    catchError,
    LocalCurr
  };

export default connect(mapStateToProps,mapDispatchToProps)(OneCurrency);