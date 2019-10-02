import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile, selectPick, patchUserPick, } from '../actions'
const CURRENT_WEEK = 5

class UserPicks extends Component{
    componentDidMount(){
        this.props.fetchUserProfile()
    }
    
    selectUserPick = (game, pickedTeamId, teamToLose) =>{
        this.props.selectPick(game, pickedTeamId, teamToLose)
    }

    patchUserPick = (gameId, pickedTeamId, weekInt) =>{
        if(!this.userHasPickedCurrentTeam(pickedTeamId)){
            this.props.patchUserPick(gameId, pickedTeamId, weekInt)
            this.props.fetchUserProfile()
        }
        
    }
    userHasPickedCurrentTeam = (pickedTeamId) =>{
        if(this.props.currentUser){
            return this.props.currentUser.teams.find(obj => obj.id === pickedTeamId)
        }
    }

    userHasPickedCurrentWeek = () =>{
        if(this.props.currentUser){        
            if(this.props.currentUser.games.find(obj => obj.week === CURRENT_WEEK)){
                return true
            }else{
                return false
            }
        }
    }

    hasDatePassed = (date)=>{
        const now = new Date()
        const gameDate = new Date(date)
        if(now >= gameDate){
            return true
        }else{
            return false
        }
    }
    
    renderGamesWithPickOptions = () =>{
        return this.props.games.map((game)=>{
            return (
            <div key={game.id} className="card">
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
                        <div onClick={(this.hasDatePassed(game.date) || this.userHasPickedCurrentWeek() || this.userHasPickedCurrentTeam(game.team_1.id)) ? ()=>{console.log('you already have a pick')} : ()=>{this.selectUserPick(game, game.team_1, game.team_2)}} className={(this.hasDatePassed(game.date) ||this.userHasPickedCurrentWeek() || this.userHasPickedCurrentTeam(game.team_1.id)) ? "ui basic gray button" : "ui basic green button" }>{game.team_1.team_name}</div>
                        <div onClick={(this.hasDatePassed(game.date) ||this.userHasPickedCurrentWeek() || this.userHasPickedCurrentTeam(game.team_2.id)) ? ()=>{console.log('you already have a pick')} : ()=>{this.selectUserPick(game, game.team_2, game.team_1)}} className={(this.hasDatePassed(game.date) || this.userHasPickedCurrentWeek() || this.userHasPickedCurrentTeam(game.team_2.id)) ? "ui basic gray button" : "ui basic blue button" }>{game.team_2.team_name}</div>
                    </div>
                </div>
            </div>
            )
        })
    }

    renderCurrentPick = () =>{
        if(this.userHasPickedCurrentWeek()){
            return(
                <div className="ui placeholder segment">
                    <div className="ui header">
                        You have already selected a team to win this week. 
                    </div>
                </div>
            )
        }else if(this.props.currentPick){
            if(this.userHasPickedCurrentTeam(this.props.currentPick[1].id)){
                return(
                    <div className="ui placeholder segment">
                        <div className="ui header">
                            The team you have selected has already been picked.
                        </div>
                    </div>
                )
            }
            else{ 
                return(
                <div className="ui placeholder segment">
                    <div className="ui header">
                        {`You have selected ${this.props.currentPick[1].team_name} to win against ${this.props.currentPick[2].team_name} on ${this.props.currentPick[0].date}`}
                    </div>
                <div className="inline">
                    <div onClick={()=>{this.patchUserPick(this.props.currentPick[0].id, this.props.currentPick[1].id, this.props.currentPick[0].week)}} className="ui button">Submit Pick</div>
                </div>
                </div>
            );
            }
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

const mapStateToProps = ({ gamesReducer, picksReducer }) => ({
    games: gamesReducer.games,
    currentPick: picksReducer.currentPick,
    currentUser: picksReducer.userProfile
})

export default connect(mapStateToProps, {fetchUserProfile, selectPick, patchUserPick})(UserPicks)