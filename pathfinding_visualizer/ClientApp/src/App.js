import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Node from './PathfindingVisualizer/Node';
import { dijkstrasAlgo, ShortestPath } from './Algorithms/Dijkstras';
import './App.css';

var start_row = 10;
var start_col = 20;
var finish_row = 10;
var finish_col = 40;
export default class PathfindingVisualizer extends Component {
    displayName = PathfindingVisualizer.name
    constructor(props) {
        super(props);
        //this.getinitialgrid = this.getinitialgrid.bind(this);
        const initialgrid = [];
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                initialgrid.push(this.createNode(row, col));
            }
        }
        this.reset = this.reset.bind(this);
        this.set_start = this.set_start.bind(this);
        this.state = {
            start_pressed: false,
            end_pressed: false,
            grid: initialgrid,
        };
    }
    createNode(row, col) {
        return ({
            col,
            row,
            isStart: row === start_row && col === start_col,
            isFinish: row === finish_row && col === finish_col,
            distance: Infinity,
            visited: false,
            isWall: false,
            previousNode: null,
            isPath: false,
        });
    }

    animateDijkstra(visited,path) {
        for (let i = 1; i < visited.length; i++) {
            if (i === visited.length-1) {
                setTimeout(() => {
                    this.animateShortestPath(path);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visited[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-on-path';
            }, 50 * i);
        }
    }


    animation() {
        const grid = this.state.grid;
        var startNode = grid[start_row * 50 + start_col];
        var finishNode = grid[finish_row * 50 + finish_col];
        const visited = dijkstrasAlgo( grid, startNode, finishNode );
        const path = ShortestPath(finishNode);
        console.log(path.length);
        this.animateDijkstra(visited,path);
    }

    set_start() {
        this.reset_grid.bind(this);
        document.getElementById(`node-${start_row}-${start_col}`).className =
            'node';
        this.setState({ start_pressed: true });
    }

    set_end() {
        this.reset_grid.bind(this);
        document.getElementById(`node-${finish_row}-${finish_col}`).className =
            'node';
        this.setState({ end_pressed: true });
    }

    handleClick(row, col) {
        if (this.state.start_pressed) {
            start_row = row;
            start_col = col;
            document.getElementById(`node-${row}-${col}`).className =
                'node node-start';
        }
        if (this.state.end_pressed) {
            finish_col = col;
            finish_row = row;
            document.getElementById(`node-${row}-${col}`).className =
                'node node-finish';
        }
        
    }

    reset_grid() {
        const new_grid = [];
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                if ((row == start_row) && (col == start_col)) {
                    document.getElementById(`node-${row}-${col}`).className =
                        'node node-start';
                }
                else if ((row == finish_row) && (col == finish_col)) {
                    document.getElementById(`node-${row}-${col}`).className =
                        'node node-finish';
                }
                else {
                    document.getElementById(`node-${row}-${col}`).className =
                        'node';
                }
                new_grid.push(this.createNode(row, col));
            }
        }
        this.setState({ grid: new_grid });
    }

    reset() {
        start_row = 10;
        start_col = 20;
        finish_row = 10;
        finish_col = 40;
        this.reset_grid();
    }

    render() {
        //const visitedNodesInOrder = dijkstra(grid.slice(), startNode, finishNode);
        return (
            <div className="body">
                <button className="top_button" onClick={this.animation.bind(this)}>
                    Visualize Dijkstra's Algorithm
                </button>
                <button className="top_button" onClick={this.reset.bind(this)}>
                    Reset
                </button>
                <button className="top_button" onClick={this.set_start.bind(this)}>
                    Set Start Point
                </button>
                <button className="top_button" onClick={this.set_end.bind(this)}>
                    Set Finish Point
                </button>
                <div className="grid">
                    {this.state.grid.map((node, index) => {
                        const { row, col, isFinish, isStart, isWall } = node;
                        return (
                            <Node
                                key={index}
                                col={col}
                                isFinish={isFinish}
                                isStart={isStart}
                                row={row}
                                onClick={() => this.handleClick(row,col)}
                                > </Node>
                            );
                    })}
                </div>
            </div>
        );      
     }       
}