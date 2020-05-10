import React,{Component} from 'react';
import {connect}  from 'react-redux';
import { fetchPosts } from '../actions';
import UserHeader from './UserHeader';

class PostList extends Component{

    // after the app render first time then call this function 
    componentDidMount(){
        this.props.fetchPosts();
    }
    
    renderList = ()=>{
        return this.props.posts.slice(0,10).map( post =>{
            return (
                <div className="item" key={post.id}>
                    <i className =" large middgle aligned icon user"></i>
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <UserHeader userId ={post.userId}/>
                    </div>
                </div>
            );
        });
    };

    render(){
        // the initial: first time run , posts = []
        console.log(this.props.posts);
        return (
            
        <div className ="ui divided list">
            Post List:{this.renderList()}
        </div>)
    }
}
// need to map state from provider to connect 
// so that the PostList can get state
const mapStateToProps = (state)=>{
    return{ posts: state.posts}; 
};
// using HOC to pass state = null - initial state and action from action creator
export default connect(mapStateToProps,{fetchPosts})(PostList);