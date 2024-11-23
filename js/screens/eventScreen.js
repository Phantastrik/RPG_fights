let eventScreenAnimationId = null; //id pour l'animation

function showEventScreen(runState) {
    clearCanvas();
    startEventScreenAnimation();
    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleAbilitySelection);
}


// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleAbilitySelection(event) {
    if (event.key === "q" || event.key === "Q") {
        // Aller à gauche dans la sélection
        startEventScreenAnimation();
    } else if (event.key === "d" || event.key === "D") {
        // Aller à droite dans la sélection
       startEventScreenAnimation();
    } else if (event.key === "Enter") {
        // Valider le choix
        nextRound();
        startEventScreenAnimation();
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
         pos.x, pos.y, "walk");

    // bg pour les event
    setBackground(UI_BG.bg3);

    // statbar du perso
    drawStatsBar(0, 1.8, runState.player);
    
    if (runState.player.activeEffects.length > 0) {
        let i = 0;
        runState.player.activeEffects.forEach(effect =>{
            pos = grid.pos(5, 3.5+i);
            drawEffect(pos.x, pos.y, effect);
            i+=0.8;
        });   
    }

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