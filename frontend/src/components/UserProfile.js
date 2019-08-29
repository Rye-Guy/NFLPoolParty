import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component{
 
    
    renderPickedTeams = () =>{
        return this.props.currentUser.teams.map((team)=>{
            return (
                <div className="item">
                    <img alt={`${team.team_name} Logo`} className="ui avatar image" src={team.team_logo}/>
                    <div className="content">
                        <div className="header">{team.team_name}</div>
                    </div>
                </div>
            )
        });
    }

    renderUserGamesList = () =>{
        return this.props.currentUser.games.map((game)=>{
            return(
                <tr key={game.id}>
                    <td data-label="Team 1">
                        <div className="team-row">
                            {game.team_1.team_name}
                            <img className="team-row--logo" src={game.team_1.team_logo} alt={`${game.team_1.team_logo} Logo`}></img>
                        </div>
                    </td>
                    <td data-label="Team 2">
                        <div className="team-row">
                            {game.team_2.team_name}
                            <img className="team-row--logo" src={game.team_2.team_logo} alt={`${game.team_2.team_logo} Logo`}></img>
                        </div>
                    </td>
                    <td data-label="Date">
                        {game.date}
                    </td>
                    <td data-label="Winner">
                        {game.winner}
                    </td>
                </tr>
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
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Team 1</th>
                                <th>Team 2</th>
                                <th>Date</th>
                                <th>Winner</th>
                            </tr>
                            {this.renderUserGamesList()}
                        </thead>
                    </table>
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

export default connect(mapStateToProps, {})(UserProfile)

