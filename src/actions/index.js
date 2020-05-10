// action creator

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
    return async (dispatch)=>{

        const response = await jsonPlaceHolder.get('/posts'); //pass params to the endpoint
        // pass thre objection action result as params
        
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        })
    }
};

export const fetchUser = (id)=>{
    return async (dispatch)=>{
        const response = await jsonPlaceHolder.get(`/users/${id}`);

        dispatch({
            type:'FETCH_USER',
            payload: response.data
        });
    }
}