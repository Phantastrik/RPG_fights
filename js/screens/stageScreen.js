let stageScreenAnimationId = null; //id pour l'animation

function showStageScreen(runState) {
    clearCanvas();
    // ecran fight
    if (runState.stages[runState.currentStage].type === "fight") {
        showFightScreen(runState);
    }else{ // ecran event
        showEventScreen(runState);
    }
}