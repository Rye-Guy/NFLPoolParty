import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStandings } from '../actions/index';

class UserStandings extends Component{
    
    componentDidMount(){
        this.props.dispatch(fetchUserStandings())
        console.log(this.props)
    }

    renderUserStandings = ()=>{
        if(this.props.userStandings){
            return this.props.userStandings.map((user)=>{
                return (
                    <tr key={user.user.id}>
                    <td data-label="Username">
                        <div className="team-row">
                            {user.user.username}
                        </div>
                    </td>
                    <td data-label="Points Awarded">
                        <div className="team-row">
                            {user.points_awarded}
                        </div>
                    </td>
                    </tr>
                )
            })
        }
    }
    
    render(){
        return (
            <div className="margin-me">
                <h2 className="ui header">Game Standings</h2>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Points Awarded</th>
                        </tr>
                        {this.renderUserStandings()}
                    </thead>
                </table>
            </div>
        )
    }
}

const mapPropsToState = (state)=>{
    return {
        userStandings: state.picksReducer.userStandings
    }
}

export default connect(mapPropsToState, )(UserStandings)