const redux=require('redux');
const createStore=redux.createStore;
const applyMiddleware=redux.applyMiddleware;
const thunkMiddleware=require('redux-thunk').default;
const axios=require('axios');

const initalState={
    loading:false,
    users:[],
    error:''
}

const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_ERROR = 'USER_ERROR';

const userRequest = () => {
    return{
        type:USER_REQUEST
    }
}

const UserSucess = (users) => {
    return{
        type:USER_SUCCESS,
        payload:users
    }
}

const userError = (error) => {
    return{
        type:USER_ERROR,
        payload:error

    }
}

const Reducer = (state=initalState, action) => {
    switch(action.type){
        case "USER_REQUEST":return {
            ...state,loading:true
        }
        case "USER_SUCCESS":return {
            loading:false,users:action.payload,error:''
        }
        case "USER_ERROR":return {
            loading:false, users:[],error:action.payload
        }
    }
}
const fetchUsers = () => {
    return function(dispatch){
        dispatch(userRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response=>{
            //response.data
            const users=response.data.map(user => user.name)
            dispatch(UserSucess(users))
        })
   
    .catch(error=>{
        //error message
        dispatch(userError(error))
        });
    }
}
const store =createStore(Reducer,applyMiddleware(thunkMiddleware));
store.subscribe(() => {console.log(store.getState())});
store.dispatch(fetchUsers());