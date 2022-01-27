const initialState = {
    error: false,
    tog: true,
    defCurr: 'UAH',
    currency: localStorage.getItem('currency')

}

const reducer = (state = initialState, action)=>{
    console.log(state);
    switch(action.type){
        case 'MANU_ERROR':
            return{
                error: true,
            };
        default:
            return state;
    }
}

export default reducer;