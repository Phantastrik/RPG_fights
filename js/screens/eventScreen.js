
let eventPlayerState = "walk";
let selectedEffectIndex = 0;

function showEventScreen() {
    controls = [
        { key: 'Q', label: "Previous" },
        { key: 'D', label: "Next" },
        { key: 'Enter', label: "Choose Effect" }
    ]

    clearCanvas();
    startEventScreenAnimation();
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
        startEventScreenAnimation();
    } else if (event.key === "d" || event.key === "D") {
        // Aller à droite dans la sélection
        selectedEffectIndex = (selectedEffectIndex + 1) % runState.stages[runState.currentStage].effects.length;
        startEventScreenAnimation();
    } else if (event.key === "Enter") {
        eventPlayerState = "jump";
        setTimeout(() => {
            eventPlayerState = "walk";
            // Valider le choix
            cancelAnimationFrame(eventScreenAnimationId);
            eventSelected(selectedEffectIndex);
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

    // effets de l'event
    drawEventPanel();
    // controls hint
    pos = grid.pos(21, 2);
    drawControlsHint(pos.x, pos.y);


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
        dim: { x: 8, y: runState.stages[runState.currentStage].effects.length * 2 + 1 }
    };
    pos = grid.pos(mainframe.pos.x, mainframe.pos.y);
    dim = grid.pos(mainframe.dim.x,mainframe.dim.y);
   // drawPanel(pos.x, pos.y, mainframe.dim.x, mainframe.dim.y, "primary");
    
    let index = 0;
    // Liste des effets
    if (runState.stages[runState.currentStage].effects.length > 0) {
        let i = 1;
        let j = 0.8;
        runState.stages[runState.currentStage].effects.forEach(effect => {
            pos = grid.pos(mainframe.pos.x + j-0.5, mainframe.pos.y + i-0.75);
            dim = grid.pos(8,2);
            // boite de fond 
            drawBox(pos.x + j, pos.y + i,dim.x,dim.y,
                index == selectedEffectIndex ? UI_COLORS.primary : UI_COLORS.light_alpha
                ,UI_CONFIG.shadowPad,
                index == selectedEffectIndex ? UI_COLORS.shadow : UI_COLORS.transparent);
            pos = grid.pos(mainframe.pos.x + j, mainframe.pos.y + i);
            // texte 
            ctx.textAlign = "left";
            drawShadowedText(`${effect.name} : `, pos.x, pos.y, 2
                , UI_COLORS.shadow, UI_COLORS.light, UI_FONTS.getFont("medium", "secondary"));

            pos = grid.pos(mainframe.pos.x + j, mainframe.pos.y + i);
            drawEffect(pos.x,
                pos.y, effect, true,
                 false);
            i += 2.2;
            index++;
        });
    }


}