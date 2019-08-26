import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGames} from '../actions' 

class CurrentGames extends Component{
    componentDidMount(){
        this.props.fetchGames()
    }

    renderGamesList(){
        return this.props.games.map((game)=>{
            return(
                <tr>
                    <td data-label="Team 1">{game.team_1}</td>
                    <td data-label="Team 2">{game.team_2}</td>
                    <td data-label="Date">{game.date}</td>
                    <td data-label="Winner">{game.winner}</td>
                </tr>
            )
        })
    }


    render(){
        return(
            <div>
                <h2 className="ui header">This weeks games</h2>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Team 1</th>
                            <th>Team 2</th>
                            <th>Date</th>
                            <th>Winner</th>
                        </tr>
                        {this.renderGamesList()}
                    </thead>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        games: state.gamesReducer.games
    }
}

export default connect(mapStateToProps, {fetchGames})(CurrentGames)
