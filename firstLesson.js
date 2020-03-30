const redux=require('redux');
const createStore=redux.createStore;


const initailStore = {
    numberOfBooks:12
}

function bus(){
    return{
        type:"buy_book",
        info:"this is my code"
    }
}

const Reducer = (state=initailStore,action) => {
    switch(action.type){
        case "buy_book": return{
            ...state,
            numberOfBooks:state.numberOfBooks + 1
        }
        default: return state;
    }
}

const store = createStore(Reducer);
console.log("intail value",store.getState());
const unsubscribe = store.subscribe(() => {console.log("UpdateValue",store.getState())});
store.dispatch(bus());


unsubscribe();