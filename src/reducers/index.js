const initialState = {
    error: false,
    tog: true,
    defCurr: 'USD',
    defArrRates: [],
    localCurrency:'',
    firstCurrency: 'USD',
    currencyOpt: [],
    fromCurr: ''
    

}

const reducer = (state = initialState, action)=>{
    switch(action.type){
        case 'MANU_ERROR':
            return{
                ...state,
                error: true,
            };
        case 'DEF_ARR':
            return{
                ...state,
                defArrRates: action.defArr
                
            };
        case 'LOCAL_CURR':
        return{
            ...state,
            localCurrency: action.localCurrency
            
        };
        case 'CURR_OPTIONS':
        return{
            ...state,
            currencyOpt: action.currencyOpt
            
        };
        case 'FROM_CURR':
        return{
            ...state,
            fromCurr: action.fromCurr
            
        };
        default:
            return state;
    }
}

export default reducer;