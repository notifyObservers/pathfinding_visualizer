import { Heapify, DeleteMin} from '../DataStructures/MinHeap'

export function dijkstrasAlgo(grid, startNode, finishNode) {
    var unvisited = grid.slice();
    unvisited[startNode.row * 50 + startNode.col].distance = 0;
    var visited = [];
    while (unvisited.length !== 0) {
        Heapify(unvisited);
        //console.log(unvisited);
        var currentNode = DeleteMin(unvisited);
        //console.log(unvisited);
        if (currentNode.distance === Infinity) {
            return visited;
        }
        if (currentNode === finishNode) {
            return visited;
        }
        currentNode.visited = true;
        visited.push(currentNode);
        updateDistance(grid, currentNode);
    }
}

function getUnvisitedNeighbours(grid, currentNode) {
    var neighbours = [];
    var row = currentNode.row;
    var col = currentNode.col;
    //console.log(row);
    // top neighbours
    if (row > 0) {
        neighbours.push(grid[(row-1)*50 + col]);
    }
    // left
    if (col > 0) {
        neighbours.push(grid[row*50+col - 1]);
    }
    // right 
    if (col < 49) {
        neighbours.push(grid[row*50 + col + 1]);
    }
    // down
    if (row < 19) {
        neighbours.push(grid[(row + 1)*50 + col]);
    }
    //console.log(neighbours);
    return neighbours.filter(neighbour => (!neighbour.visited));
}

function updateDistance(grid, currentNode) {
    const neighbours = getUnvisitedNeighbours(grid, currentNode);
    //alert(currentNode.distance);
    for (const node of neighbours) {
        node.distance = currentNode.distance + 1;
        //alert(node.distance);
        node.previousNode = currentNode;
    }
}

export function ShortestPath(finishNode) {
    const shortestPath = [];
    var current = finishNode;
    while (current != null) {
        shortestPath.unshift(current);
        current.isPath = true;
        current = current.previousNode;
    }
    return shortestPath;
}