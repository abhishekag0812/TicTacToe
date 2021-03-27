import React , { Component } from 'react'
import Cell from './Cell'
import styles from './Grid.module.css'

class Grid extends Component {

    render () {

        let board = [] ;
        let i;
        for ( i = 0 ; i < 9 ; i ++ ){
            board . push (<Cell key = {i} val = {this.props.cells[i]} onPlay = {this.props.onPlay} turn = {this.props.turn} id = {i} ></Cell>)
        }

        return(
            <div className = {styles.Grid}>
                {board}
            </div>
        )
    }

}

export default Grid;