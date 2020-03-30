const redux=require('redux');
const createStore=redux.createStore;


const initailStore = {
    numberOfBooks:12,
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

const Reducer = (state=initailStore,action) => {
    switch(action.type){
        case "buy_book": return{
            ...state,
            numberOfBooks:state.numberOfBooks + 1
        }
        case "buy_pen": return {
            ...state,
            numberOfPens:state.numberOfPens + 2
        }
        default: return state;
    }
}

const store = createStore(Reducer);
console.log("intail value",store.getState());
const unsubscribe = store.subscribe(() => {console.log("UpdateValue",store.getState())});
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen());
store.dispatch(buyPen());
store.dispatch(buyPen());





unsubscribe();