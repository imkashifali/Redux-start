const redux=require('redux');
const createStore=redux.createStore;
const  combineReducers=redux.combineReducers
const applyMiddleware = redux.applyMiddleware


const initailStateBook = {
   numberOfBooks:12,

}
const initailStatePen = {
   numberOfPens:32

}

function buyBook(){
   return{
       type:"buy_book",
       playload:"this is buyBook"
   }
}
function buyPen(){
   return{
       type:"buy_pen",
       playload:"this is buyPen"
   }
}

const bookReducer = (state=initailStateBook,action) => {
   switch(action.type){
       case "buy_book": return{
           ...state,
           numberOfBooks:state.numberOfBooks + 1
       }
       default: return state;
   }
}
const penReducer = (state=initailStatePen,action) => {
   switch(action.type){
       case "buy_pen": return{
           ...state,
           numberOfPens:state.numberOfPens + 1
       }
       default: return state;
   }
}

const reducer = combineReducers({
   book:bookReducer,
   pen:penReducer
})
const logger=store => {
    return next => {
        return action=>{
            const result=next(action);
            console.log("Middle Waare",result);
            return result;
        }
    }
}

const store = createStore(reducer,applyMiddleware(logger));

console.log("intail value",store.getState());
const unsubscribe = store.subscribe(() => {console.log("UpdateValue",store.getState())});
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen());
store.dispatch(buyPen());
store.dispatch(buyPen());





unsubscribe();