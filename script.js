// Global variables
let nodes = [];
let selectedRoute = [];
let totalCost = 0;

// Node locations on the map
const nodeCoordinates = [
    { x: 50, y: 50 },  // Node 1
    { x: 500, y: 50 }, // Node 2
    { x: 500, y: 350 },// Node 3
    { x: 50, y: 350 }, // Node 4
];

// Function to calculate Euclidean distance
function calculateDistance(node1, node2) {
    return Math.sqrt(Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2));
}

// Function to start a new game
function startGame() {
    nodes = [];
    selectedRoute = [];
    totalCost = 0;
    document.getElementById("result").textContent = '';
    document.getElementById("total-cost").textContent = '';

    const mapDiv = document.getElementById("map");
    mapDiv.innerHTML = ''; // Clear the map

    // Create nodes
    nodeCoordinates.forEach((coords, index) => {
        const node = document.createElement('div');
        node.classList.add('node');
        node.style.left = `${coords.x}px`;
        node.style.top = `${coords.y}px`;
        node.setAttribute('data-id', index);
        node.addEventListener('click', selectNode);
        mapDiv.appendChild(node);
        nodes.push(node);
    });
}

// Function to handle node selection
function selectNode(event) {
    const nodeId = event.target.getAttribute('data-id');
    const node = nodes[nodeId];

    // Toggle node selection
    if (selectedRoute.includes(nodeId)) {
        selectedRoute = selectedRoute.filter(id => id !== nodeId);
        node.classList.remove('selected');
    } else {
        selectedRoute.push(nodeId);
        node.classList.add('selected');
    }
}

// Function to check the selected route
function checkRoute() {
    if (selectedRoute.length !== nodeCoordinates.length) {
        document.getElementById("result").textContent = "You must visit all nodes!";
        return;
    }

    // Check if the route starts and ends at the same node
    if (selectedRoute[0] !== selectedRoute[selectedRoute.length - 1]) {
        document.getElementById("result").textContent = "Route must start and end at the same node!";
        return;
    }

    // Calculate the total cost of the selected route
    totalCost = 0;
    for (let i = 0; i < selectedRoute.length - 1; i++) {
        const fromNode = nodeCoordinates[selectedRoute[i]];
        const toNode = nodeCoordinates[selectedRoute[i + 1]];
        totalCost += calculateDistance(fromNode, toNode);
    }

    document.getElementById("result").textContent = "Route is valid!";
    document.getElementById("total-cost").textContent = `Total Cost: ${totalCost.toFixed(2)} units`;
}
