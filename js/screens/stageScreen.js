function showStageScreen(runState) {
    clearCanvas();
    drawPlayerStats(10, 10, runState.player);
    
    // Dessin des ennemis et du stage actuel
    // Par exemple :
    runState.stages.forEach(stage => {
        // Dessiner chaque élément du stage
    });
}
