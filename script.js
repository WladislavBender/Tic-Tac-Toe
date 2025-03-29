let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];


let currentPlayer = 'circle';
let gameOver = false;

function init() {
    render();
}

function render() {
    let html = '<div style="position: relative; display: inline-block;">';
    html += '<svg id="win-line" width="300" height="210" style="position: absolute; top: 0; left: 0; pointer-events: none;"></svg>';
    html += '<table>';
    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] === 'circle' ? generateCircleSVG() :
                (fields[index] === 'cross' ? generateCrossSVG() : '');

            html += `<td id="cell-${index}" onclick="handleClick(${index})">${symbol}</td>`;
        }
        html += '</tr>';
    }
    html += '</table></div>';
    document.getElementById('content').innerHTML = html;
}

function restartGame(){
    window.location.reload();
}

function handleClick(index) {
    if (fields[index] !== null || gameOver) return;

    fields[index] = currentPlayer;

    let cell = document.getElementById(`cell-${index}`);
    cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
    cell.removeAttribute("onclick");

    let winner = checkWinner();
    if (winner) {
        gameOver = true;
        drawWinningLine(winner);
        return;
    }

    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Spalten
        [0, 4, 8], [2, 4, 6]             // Diagonale Linien
    ];

    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return combo;
        }
    }
    return null;
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;

    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;

    document.getElementById('content').appendChild(line);
}


function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="#00B0EF" stroke-width="10" fill="none"
                stroke-dasharray="251.2" stroke-dashoffset="251.2">
                <animate attributeName="stroke-dashoffset" from="251.2" to="0" dur="0.5s" fill="freeze"/>
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#FFC000" stroke-width="10" stroke-linecap="round"
                stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.250s" fill="freeze"/>
            </line>
            <line x1="80" y1="20" x2="20" y2="80" stroke="#FFC000" stroke-width="10" stroke-linecap="round"
                stroke-dasharray="84.85" stroke-dashoffset="84.85">
                <animate attributeName="stroke-dashoffset" from="84.85" to="0" dur="0.125s" begin="0.250s" fill="freeze"/>
            </line>
        </svg>
    `;
}