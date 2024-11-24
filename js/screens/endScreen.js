
let endPlayerState = "die";

function showEndScreen() {
    controls = [
        { key: 'R', label: "Restart seed" },
        { key: 'Enter', label: "New game" }
    ]

    clearCanvas();
    startEndScreenAnimation();
    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleEventKeys);
}


// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleEventKeys(event) {
    if (event.key === "q" || event.key === "Q") {
        // Aller à gauche dans la sélection
        selectedEffectIndex = (selectedEffectIndex - 1
            + runState.stages[runState.currentStage].effects.length)
            % runState.stages[runState.currentStage].effects.length;
        startEndScreenAnimation();
    } else if (event.key === "d" || event.key === "D") {
        // Aller à droite dans la sélection
        selectedEffectIndex = (selectedEffectIndex + 1) % runState.stages[runState.currentStage].effects.length;
        startEndScreenAnimation();
    } else if (event.key === "Enter") {
        endPlayerState = "jump";
        setTimeout(() => {
            endPlayerState = "walk";
            // Valider le choix
            cancelAnimationFrame(EndScreenAnimationId);
            eventSelected(selectedEffectIndex);
        }, spriteSource[runState.player.className].jump.frameCount * animationSpeed) * 1.5;

        showStageScreen();
    }
}

// Animation / dessin de l'ecran de démarrage
function animateEndScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // header
    drawStagesScreenHeader();
    // player sprite
    pos = grid.pos(-1, 3);
    drawCharacter(spriteSource[runState.player.className],
        pos.x, pos.y, endPlayerState);

    // bg pour les event
    setBackground(UI_BG.bg1);

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
