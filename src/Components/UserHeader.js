import React from 'react';
import {connect} from 'react-redux';



class UserHeader extends React.Component{
    

    render(){
        // this.props.users : array of object user
        // const user = this.props.users.find( user => user.id === this.props.userId);

        // refactor: get user from mapStateToProps
        const {user} = this.props;
       
// initial stage there is no data to show
        return user ? 
            (<div className = "header"> {user.name}</div> ) 

            :(<div >Nothing</div>);

    }
};
// ownPeops is the props of UserHeader
const mapStateToProps = (state,ownProps) =>{
    return {
        user : state.users.find( user => user.id === ownProps.userId)
    };
}
export default connect(mapStateToProps)(UserHeader);