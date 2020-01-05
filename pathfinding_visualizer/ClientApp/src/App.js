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
        this.state = {
            grid: initialgrid,
        };
    }

   /* getinitialgrid() {
        const initialgrid = [];
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                initialgrid.push(this.createNode(row, col));
            }
        }
        return initialgrid;
    }*/
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
        for (let i = 0; i < visited.length; i++) {
            /*if (i === visited.length-1) {
                setTimeout(() => {
                    this.animateShortestPath(path);
                }, 10 * i);
                return;
            }*/
            const node = visited[i];
            if (visited[i].isPath) {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-on-path';
            }
            setTimeout(() => {
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    /*animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }*/


    animation() {
        //alert("wtf?");
        const grid = this.state.grid;
        var startNode = grid[start_row * 50 + start_col];
        var finishNode = grid[finish_row * 50 + finish_col];
        //console.log(startNode.props.row);
        const visited = dijkstrasAlgo( grid, startNode, finishNode );
        const path = ShortestPath(finishNode);
        console.log(path.length);
        //alert(visited.length);
        this.animateDijkstra(visited,path);
    }

    /*
                <div className="ControlPanel">
                    <button className="top_button" onClick={this.animation.bind(this)}>
                        Visualize Dijkstra's Algorithm
                    </button>
                </div> */

    render() {
        //const visitedNodesInOrder = dijkstra(grid.slice(), startNode, finishNode);
        return (
            <div>
                <button onClick={this.animation.bind(this)}>
                    Visualize Dijkstra's Algorithm 2
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
                                > </Node>
                            );
                    })}
                </div>
            </div>
        );      
     }       
}