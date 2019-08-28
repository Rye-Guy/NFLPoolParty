import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions'

class UserProfile extends Component{
    componentDidMount(){
        this.props.fetchUserProfile()   
    }

    renderPickedTeams = () =>{
        return this.props.currentUser.teams.map((team)=>{
            return (
                <div className="item">
                    <img className="ui avatar image" src={team.team_logo}/>
                    <div className="content">
                        <div className="header">{team.team_name}</div>
                    </div>
                </div>
            )
        });
    }

    renderGamesTeams = () =>{
        return this.props.currentUser.games.map((game)=>{
            return (
                <div>{game.id}</div>
            )
        })
    }

    renderUserProfile = () =>{ 
        if(this.props.currentUser){
            return (
                <div className="margin-me">
                    <h1>{`Hello ${this.props.currentUser.user.username}, you currently have ${this.props.currentUser.points_awarded ? this.props.currentUser.points_awarded : 0} points`}</h1>
                    <h3>Teams You've picked</h3>
                    <div class="ui big horizontal divided list">
                        {this.renderPickedTeams()}
                    </div>  
                    <h3>Your Games</h3>
                        {this.renderGamesTeams()}
                </div>
            );
        }
    }

    render(){
        return (
            <div>{this.renderUserProfile()}</div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        currentUser: state.picksReducer.userProfile
    }
}

export default connect(mapStateToProps, {fetchUserProfile})(UserProfile)

