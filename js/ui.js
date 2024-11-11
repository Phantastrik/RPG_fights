const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.width = CANVAS_DIMENSIONS.width;
ctx.height = CANVAS_DIMENSIONS.height;

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawHealthBar(x, y, length, height, value, maxValue) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, length, height);
    ctx.fillStyle = "white";
    ctx.fillRect(x + 1, y + 1, length - 2, height - 2);
    ctx.fillStyle = "red";
    ctx.fillRect(x + 1, y + 1, (value / maxValue) * (length - 2), height - 2);
}

function drawPlayerStats(x, y, player) {
    const stats = [
        `Nom: ${player.name}`,
        `Niveau: ${player.niveau}`,
        `PV: ${player.pv} / ${player.pvMax}`,
        `PM: ${player.pm} / ${player.pmMax}`,
        `Attaque: ${player.attaque}`,
        `Défense: ${player.defense}`,
        `Sagesse: ${player.sagesse}`,
        `Vitesse: ${player.vitesse}`,
        `XP: ${player.exp} / ${player.baseExp}`
    ];
    const padding = 10;
    const lineHeight = 20;

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.fillRect(x, y, 150, stats.length * lineHeight + padding * 2);

    ctx.fillStyle = "black";
    stats.forEach((text, i) => {
        ctx.fillText(text, x + padding, y + padding + i * lineHeight);
    });
}
