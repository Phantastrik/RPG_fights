let stageScreenAnimationId = null; //id pour l'animation
function showStageScreen(runState) {
    clearCanvas();
    // Dessiner le personnage sélectionné
    startStageScreenAnimation();

    
}

// Animation / dessin de l'ecran de démarrage
function animateStageScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    drawStagesScreenHeader();
    // player sprite
    pos = grid.pos(2,5);
    drawCharacter(spriteSource[runState.player.className],pos.x,pos.y,"run");
    pos = grid.pos(20,7);
    drawMonster("gobelin",pos.x,pos.y,"run");

    // player description
    drawCharacterAbilities(runState.player,20,4);
     
    // bandeau header de l'ecran
    // headerGUI("Stage");
    
    //  drawStagesSideBar();

    stageScreenAnimationId = requestAnimationFrame(() => animateStageScreen());  // Boucle d'animation
}

// Fonction pour démarrer l'animation avec un nouvel état
function startStageScreenAnimation() {
    // Annule l'animation précédente s'il y en a une
    if (stageScreenAnimationId !== null) {
        cancelAnimationFrame(stageScreenAnimationId);
    }
    animateStageScreen();  // Lance la première frame de l'animation
}