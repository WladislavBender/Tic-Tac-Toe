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


let currentPlayer = 'circle'; // Startet mit "circle"

function init() {
    render();
}

function render() {
    let html = '<table>';
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
    html += '</table>';
    document.getElementById('content').innerHTML = html;
}

function handleClick(index) {
    // Prüfen, ob das Feld bereits belegt ist
    if (fields[index] !== null) {
        return;
    }

    // Setze das Symbol im `fields`-Array
    fields[index] = currentPlayer;

    // Füge das SVG direkt in das <td>-Element ein
    let cell = document.getElementById(`cell-${index}`);
    cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();

    // Entferne das onclick-Attribut, damit das Feld nicht erneut angeklickt werden kann
    cell.removeAttribute("onclick");

    // Wechsel den Spieler
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
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