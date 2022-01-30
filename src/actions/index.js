const catchError = (error)=>{
    return{
        type:'MANU_ERROR'
    }
}
const defArr = (item)=>{
    return{
        type:'DEF_ARR',
        defArr: item
    }
}

const LocalCurr = (item)=>{
    return{
        type:'LOCAL_CURR',
        localCurrency: item
    }
}
const CurrencyOptions = (item)=>{
    return{
        type:'CURR_OPTIONS',
        currencyOpt: item
    }
}
const fromCurrency = (item)=>{
    return{
        type:'FROM_CURR',
        fromCurr: item
    }
}
export {
    catchError,
    defArr,
    LocalCurr,
    CurrencyOptions,
    fromCurrency
};