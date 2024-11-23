
let eventPlayerState = "walk";

function showEventScreen(runState) {
    clearCanvas();
    startEventScreenAnimation();
    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleEventKeys);
}


// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleEventKeys(event) {
    if (event.key === "Enter") {
        eventPlayerState = "jump";

        setTimeout(() => {
            eventPlayerState = "walk";
            // Valider le choix
            cancelAnimationFrame(eventScreenAnimationId);
            nextRound();
        }, spriteSource[runState.player.className].jump.frameCount * animationSpeed) * 1.5;

        showStageScreen();
    }
}

// Animation / dessin de l'ecran de démarrage
function animateEventScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // header
    drawStagesScreenHeader();
    // player sprite
    pos = grid.pos(-1, 3);
    drawCharacter(spriteSource[runState.player.className],
        pos.x, pos.y, eventPlayerState);

    // bg pour les event
    setBackground(UI_BG.bg3);

    // statbar du perso
    drawStatsBar(0, 1.8, runState.player);

    // effets du joueur
    if (runState.player.activeEffects.length > 0) {
        let i = 0;
        runState.player.activeEffects.forEach(effect => {
            pos = grid.pos(5, 3.5 + i);
            drawEffect(pos.x, pos.y, effect);
            i += 0.8;
        });
    }
    // effets de l'event
    drawEventPanel();


    eventScreenAnimationId = requestAnimationFrame(() => animateEventScreen());  // Boucle d'animation
}

// Fonction pour démarrer l'animation avec un nouvel état
function startEventScreenAnimation() {
    // Annule l'animation précédente s'il y en a une
    if (eventScreenAnimationId !== null) {
        cancelAnimationFrame(eventScreenAnimationId);
    }
    animateEventScreen();  // Lance la première frame de l'animation
}
function drawEventPanel() {
    mainframe = {
        pos: { x: 8, y: 4 },
        dim: { x: 8, y: 6 }
    };
    pos = grid.pos(mainframe.pos.x, mainframe.pos.y);
   // drawPanel(pos.x, pos.y, mainframe.dim.x, mainframe.dim.y, "secondary");

    // Liste des effets
    if (runState.stages[runState.currentStage].effects.length > 0) {
        let i = 0;
        let j = 1
        runState.stages[runState.currentStage].effects.forEach(effect => {
            pos = grid.pos(mainframe.pos.x + i, mainframe.pos.y + j * frameSheet_data.cellSize * 2);
            // texte 
            ctx.textAlign = "left";
            drawShadowedText(`${effect.name} : `, pos.x, pos.y, 0
                , UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("medium", "secondary"));
            j++;
            pos = grid.pos(mainframe.pos.x + i, mainframe.pos.y + j * frameSheet_data.cellSize * 2);
            drawEffect(grid.x_center + pos.x,
                pos.y, effect);
            i += 0.8;
        });
    }


}