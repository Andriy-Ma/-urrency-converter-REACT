export default class GotService{
    constructor(){
      this._apiBase = 'http://api.exchangeratesapi.io/v1/latest?access_key=e42b57017ff4d788677ba1088454efd0&symbols=USD,AUD,CAD,PLN,MXN,UAH';
    }
     getResource = async () => {
      const res = await fetch(`${this._apiBase}`);
      
      if(!res.ok){
          throw new Error(`Could not fetch  , ${res.status}`);
      }
      return await res.json();
  };
  getAllСurrencys = async () =>{
    const res = await this.getResource();
    return this._transformСurrency(res);
    
}
_transformСurrency =(obj)=>{
        return{
            rates: obj.rates
    }
}
}
