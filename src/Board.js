import React , { Component } from 'react'
import Grid from './Grid'

class Board extends Component {

    state = {
        turn : 'X' ,
        cells : ['','','','','','','','','',''],
        play : true,
        score : {
             x : 0,
             o : 0,
             ties : 0
        }
    }

    toggleTurn = (turn) => {
        if ( turn == 'X' )
            this.setState( {turn : 'O' } )
        else
            this.setState ( {turn : 'X' } )
    }

    onPlay = (key, turn) => {
        if (this.state.play ){
            let updatedCells = [...this.state.cells]
            updatedCells[key] = turn
            this.setState( { cells : updatedCells } )
            this.toggleTurn( turn )
        }
    }

    checkStatus = (cells) => {
        
        let winningStates =[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for ( let i = 0 ; i < winningStates.length ; i++ ) {
            if ( cells[winningStates[i][0]] == cells[winningStates[i][1]] && cells[winningStates[i][1]] == cells[winningStates[i][2]] &&  cells[winningStates[i][0]] != '') {
                return cells[winningStates[i][0]]
            }
        }
        let empty = 0
        for ( let i = 0; i < 9 ; i ++ ) {
            if ( cells [i] == '' ) empty ++
        }
        if ( empty == 9) return 'Start' 
        else if ( empty == 0) return 'Tie'
        else return 'Mid Game'
 
    }

    reset = () => {
       this.setState(
           {
                cells : ['','','','','','','','','',''],
                play : true
           }
       )
    }

    resetScore = () => {
        this.setState( 
            {
                score : {
                    x : 0,
                    o : 0,
                    ties : 0
                }
            }
        )
    }

    resetEverything = () => {
        this.reset()
        this.resetScore()
    }

    toss = (cells) => {
        let status = this.checkStatus(cells)
        if( status == 'Mid Game') return
        if (Math.floor(Math.random() * 2) ) this.state.turn = 'X'
        else this.state.turn = 'O'
        this.reset()
    }

    render () {

        let status = <p>Next Turn: {this.state.turn}</p>

        switch ( this.checkStatus(this.state.cells) ) {
             case 'X' : status = <p> Winner is X</p>
             this.state.score.x++
             this.state.play = false
             break;
             case 'O' : status = <p> Winner is O</p>
             this.state.score.o++
             this.state.play = false
             break;
             case 'Tie' : status = <p> Everybody Wins</p>
             this.state.score.ties++
             this.state.play = false
             break;
             default:
        }

        return (
            <div >
                <Grid onPlay = {this.onPlay} turn = {this.state.turn} cells = {this.state.cells}>
                </Grid>
                {status}
                <button onClick = {() => this.toss(this.state.cells) } >Toss and New Match</button>
                <button onClick = {this.resetEverything } >Reset</button>
                <p> X : {this.state.score.x}</p>
                <p> O : {this.state.score.o}</p>
                <p> Ties : {this.state.score.ties}</p>
            </div>

        )
    }
}

export default Board