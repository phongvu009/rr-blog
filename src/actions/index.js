// action creator
import _ from 'lodash';
// add endpoint api 
import jsonPlaceHolder from '../apis/jsonPlaceHolder';
// !problem : using asynchronous in action creator!!
// !bad approach : assign response to payload. need a plain object action.
// do a fetch to return promise(async/await)
// assign that promise the payload\\\\

// since: using async /await : it will return jsonPlaceHolder.get('/posts') 
//or object action under the hood by using es15
// that is why we got the  error:

// Error: Actions must be plain objects. Use custom middleware for async actions.

// we can take off async /await : it turns into synchronous action
// but the app will run without data since
// the request take time to get data to load to the app
// by time time our action  gets to reducer, the is no data.

// !solution is using middleware: Redux-thunk to deal with async issues;
//middleware allow to return action object or functions

export const fetchPosts = ()=>{
    // clousure: function return a fucntion. pass callback: dispatch as params
    // fetchPost = ()=> async dispatch =>{}; ~ less syntax way
    // callback : dispatch = store.dispatch
    return async (dispatch)=>{

        const response = await jsonPlaceHolder.get('/posts'); //pass params to the endpoint
        // pass the objection action result as params
        
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        })
    }
};


export const fetchUser = (id)=>{
    return async  (dispatch)=>{
        const response = await jsonPlaceHolder.get(`/users/${id}`);

        dispatch({
            type:'FETCH_USER',
            payload: response.data
        });
    }
};


// Solution 1:
// use lodash library to create memorise function
// since the userId get fectch repeatly we need to fix it to get call one time
// for each userId
// this can do fetch one time if using memoize
// export const fetchUser = (id)=>{
//     return (dispatch)=>{
//        return _fetchUser(id,dispatch);
//     }
// };

// wrap a function to the dispatch
// const _fetchUser = _.memoize(async(id, dispatch)=>{
//     const response = await jsonPlaceHolder.get(`/users/${id}`);

//     dispatch({
//         type:'FETCH_USER',
//         payload: response.data
//     });
// });

// Solution 2: create fetchPostsAndUser function

export const fetchPostsAndUser = ()=> async (dispatch,getState )=>{ //return a Promise
     //  this function goes to middleware function = thunk
//  thunk pick it up and invoke it

//  wait for the result of the Promise from dispatch(fetchPosts()) 
// and the go to next function
  await  dispatch(fetchPosts()); 
  // ? Refactor:
  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)));

  // // get uniquer userId from posts and then pass id array to fectchUser
  // const userId = _.uniq(_.map(getState().posts, 'userId'));
  // // no need to use await since there is no other function down  
  // userId.forEach(id => dispatch(fetchUser(id)));

//! If it's a function, call it.
// if (typeof action === 'function') {
// return action(dispatch, getState, extraArgument); 


};











/**
    https://daveceddia.com/what-is-a-thunk/

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
		// This gets called for every action you dispatch.
		// If it's a function, call it.
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

		// Otherwise, just continue processing this action as usual
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

every action you dispatch will pass through this bit of code. 
It calls actions that are functions (and returns whatever they return),
and otherwise passes the action along to then next middleware, 
or to Redux itself (which is what next(action) does).
*/