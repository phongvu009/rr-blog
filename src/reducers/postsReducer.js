// !rules of reducers
// reducer has to return some kind of values besides undifined;
// return new state or data to used inside the app using the previous state and an action
//  (initial state will undefined);

// Must not mutate its state args such push , pop,... to the array or object
// return could be array or object
// copy and make new array and object to make comparion
// !compasion of 2 different memory addresses.
// if somehow state argument ===  return state nothing change, no update to the app .
export default (state=[],action)=>{
    // action object = {type: @@redux?INIT} from inital stage by redux library
    // console.log(JSON.stringify({action}));
    // if(action.type === 'FETCH_POSTS'){
    //     return action.payload;
    // }
    // return state;
   switch(action.type){
       case 'FETCH_POSTS':
           return action.payload;
           
        default:
            return state;
   }
}