import React, { Component } from 'react'
import { render } from 'react-dom'
import styles from './Cell.module.css'

class Cell extends Component {

    render(){
        return(
            <button className = {styles.Cell} onClick = {  this.props.val == '' ? () => this.props.onPlay( this.props.id,  this.props.turn ) : () => {} }>{this.props.val}</button>
        )
    }
}

export default Cell