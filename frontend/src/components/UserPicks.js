import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchGames } from '../actions'

class UserPicks extends Component{
    
    renderGamesWithPickOptions = () =>{
        return this.props.games.map((game)=>{
            console.log(game)
            return (
            <div className="card">
                <div className="content">
                    <img className="right floated mini ui image" src="/images/avatar/large/elliot.jpg" />
                    <div className="header">
                        Elliot Fu
                    </div>
                    <div className="meta">
                        Friends of Veronika
                    </div>
                    <div className="description">
                        Elliot requested permission to view your contact details
                    </div>
                </div>
                <div className="extra content">
                    <div className="ui two buttons">
                        <div className="ui basic green button">Approve</div>
                        <div className="ui basic red button">Decline</div>
                    </div>
                </div>
            </div>
            )
        })
    }

    render(){
        return(
            <div>
                <div className="ui cards">
                    {this.renderGamesWithPickOptions()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        games: state.gamesReducer.games
    }
}

export default connect(mapStateToProps, {fetchGames})(UserPicks)