import React,{useEffect, useState} from "react";
import GotService from '../service';
import { connect } from 'react-redux';
import './chooseCurrency.scss'



const ChooseCurrency = (props) => {
    const {onChangeCurrency, tog} = props;
    const gotService = new GotService();
    const [arr, setArr]= useState([]);
    const [toggle, setToggle]= useState({toggle: tog});
    useEffect(()=>{
        const fetch = async () => {
            const res = await gotService.getAllСurrencys();
            const {rates}= res;
            let arr2 =[];
            for (let name in rates){
                arr2=[...arr2,name];
            }
            setArr(arr2);
        }
        fetch();
    },[])
    function closeChoise(item) {
        localStorage.setItem('currency', item);
        onChangeCurrency(item);
        setToggle({toggle: !tog});
    }
    if(toggle){
    return(
        <div className="choice">
            <p className="choice-text">Choose your currency </p>
            <div className="choice-buttons">
                {arr.map((item,i)=>{
                    return <button key={i} onClick={()=>closeChoise(item)}>{item}</button>
                })}
            </div>
        </div>
    ) 
    
}else {
    return console.log(1)
}
}
const mapStateToProps = (state)=>{
    return{
        tog: state.tog
    }
  }

export default connect(mapStateToProps)(ChooseCurrency);