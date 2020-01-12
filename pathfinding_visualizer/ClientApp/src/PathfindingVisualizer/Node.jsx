import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            col: null,
            row: null,
            isStart: false,
            isFinish: false,
            distance: null,
            visited: false,
            previous: null,
            isPath: false,
        }
    }

       
    render() {
        //const onpath = this.state.isPath ? "node-on-path" : ""; 
        if (this.props.isStart) {
            return (
                <div id={`node-${this.props.row}-${this.props.col}`} className={'node node-start'} onClick={()=>this.props.onClick()}>
                </div>
            );
        }
        else if (this.props.isFinish) {
            return (
                <div id={`node-${this.props.row}-${this.props.col}`} className={'node node-finish'} onClick={() => this.props.onClick()}>
                </div>
            );
        }
        else {
            return (
                <div id={`node-${this.props.row}-${this.props.col}`} className={'node'} onClick={() => this.props.onClick()}>
                </div>
            );
        }
    }
}
