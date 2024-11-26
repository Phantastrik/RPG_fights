
let endPlayerState = "die";
let drawPlayer = true;

function showEndScreen() {
    controls = [
        { key: 'R', label: "Restart seed" },
        { key: 'Enter', label: "New game" }
    ]

    clearCanvas();
    // bg pour la fin


    setBackground(UI_BG.bg1);
    // animation de fin 
    fightPlayerState = "hurt";
    setTimeout(() => {
        fightPlayerState = 'die';

        setTimeout(() => {
            fightPlayerState = 'die';
            cancelAnimationFrame(endScreenAnimationId);
            drawPlayer = false;

        }, spriteSource[runState.player.className].die.frameCount * animationSpeed);
        startEndScreenAnimation();

    }, spriteSource[runState.player.className].hurt.frameCount * animationSpeed);
    startEndScreenAnimation();
    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleEndKeys);
}


// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleEndKeys(event) {
    if (event.key === "r" || event.key === "R") {

        cancelAnimationFrame(endScreenAnimationId);
        initRun();
    } else if (event.key === "Enter") {
        cancelAnimationFrame(endScreenAnimationId);
        initRun();
    }
}

// Animation / dessin de l'ecran de démarrage
function animateEndScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // header
    drawStagesScreenHeader();
    // player sprite
    if (drawPlayer) {
        pos = grid.pos(-1, 3);
        drawCharacter(spriteSource[runState.player.className],
            pos.x, pos.y, endPlayerState);
    }


    // statbar du perso
    drawStatsBar(0, 1.8, runState.player);

    // controls hint
    pos = grid.pos(21, 2);
    drawControlsHint(pos.x, pos.y);


    endScreenAnimationId = requestAnimationFrame(() => animateEndScreen());  // Boucle d'animation
}

// Fonction pour démarrer l'animation avec un nouvel état
function startEndScreenAnimation() {
    // Annule l'animation précédente s'il y en a une
    if (endScreenAnimationId !== null) {
        cancelAnimationFrame(endScreenAnimationId);
    }
    animateEndScreen();  // Lance la première frame de l'animation
}
