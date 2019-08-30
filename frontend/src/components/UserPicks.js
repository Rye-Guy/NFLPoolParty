import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile, selectPick, patchUserPick, } from '../actions'

class UserPicks extends Component{
    
    selectUserPick = (game, pickedTeamId, teamToLose) =>{
        this.props.selectPick(game, pickedTeamId, teamToLose)
    }

    patchUserPick = (gameId, pickedTeamId, weekInt) =>{
        this.props.patchUserPick(gameId, pickedTeamId, weekInt)
        this.props.fetchUserProfile()
        
    }


    userHasPickedCurrentWeek = () =>{
        if(this.props.currentUser){
            if(this.props.currentUser.games.find(obj => obj.week === 1)){
                return true
            }else{
                return false
            }
        }
    }
    
    renderGamesWithPickOptions = () =>{
        return this.props.games.map((game)=>{
            console.log(game)
            return (
            <div className="card">
                <div className="content">
                    <div className="header match-up-header">
                        {game.team_1.team_name} VS {game.team_2.team_name}
                    </div>
                    <div className="description vs-logo-container">
                       <img alt={`${game.team_1.team_name} Logo`} className="mini ui image" src={game.team_1.team_logo}></img>
                       <div className="meta">
                        VS.
                        </div>
                       <img alt={`${game.team_2.team_name} Logo`} className="mini ui image" src={game.team_2.team_logo}></img>
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div onClick={this.userHasPickedCurrentWeek() ? ()=>{console.log('you already have a pick')} : ()=>{this.selectUserPick(game, game.team_1, game.team_2)}} className={this.userHasPickedCurrentWeek() ? "ui basic gray button" : "ui basic green button" }>{game.team_1.team_name}</div>
                        <div onClick={this.userHasPickedCurrentWeek() ? ()=>{console.log('you already have a pick')} : ()=>{this.selectUserPick(game, game.team_2, game.team_1)}} className={this.userHasPickedCurrentWeek() ? "ui basic gray button" : "ui basic blue button" }>{game.team_2.team_name}</div>
                    </div>
                </div>
            </div>
            )
        })
    }

    renderCurrentPick = () =>{
        if(this.userHasPickedCurrentWeek()){
            return(
                <div class="ui placeholder segment">
                    <div class="ui header">
                        You are have already selected a team to win this week. 
                    </div>
                </div>
            )
        }else if(this.props.currentPick){
            return(
                <div class="ui placeholder segment">
                    <div class="ui header">
                        {`You have selected ${this.props.currentPick[1].team_name} to win against ${this.props.currentPick[2].team_name} on ${this.props.currentPick[0].date}`}
                    </div>
                <div class="inline">
                    <div onClick={()=>{this.patchUserPick(this.props.currentPick[0].id, this.props.currentPick[1].id, this.props.currentPick[0].week)}} class="ui button">Submit Pick</div>
                </div>
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                {this.userHasPickedCurrentWeek()}
                {this.renderCurrentPick()}
                <div className="ui cards">
                    {this.renderGamesWithPickOptions()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        games: state.gamesReducer.games,
        currentPick: state.picksReducer.currentPick,
        currentUser: state.picksReducer.userProfile
    }
}

export default connect(mapStateToProps, {fetchUserProfile, selectPick, patchUserPick})(UserPicks)