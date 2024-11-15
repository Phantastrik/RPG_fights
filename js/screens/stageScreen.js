let stageScreenAnimationId = null; //id pour l'animation
function showStageScreen(runState) {
    clearCanvas();
    console.log(runState.stages[0].enemy);
    // Dessiner le personnage sélectionné
    startStageScreenAnimation();

    
}

// Animation / dessin de l'ecran de démarrage
function animateStageScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // player sprite
    drawCharacter(spriteSource[runState.player.className],ctx.width/10,2*(ctx.height)/5,"run");
    pos = grid.pos(20,10);
    drawMonster("gobelin",pos.x,pos.y,"run");

    // player description
    drawCharacterAbilities(runState.player,12.5,7);
     
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