
function showStageScreen(runState) {
    clearCanvas();
    // ecran fight
    document.removeEventListener("keydown", handleCharacterSelection); // evennt du start Screen
    if (gameStarted) {
        document.removeEventListener("keydown", handleAbilitySelection); // event du fight screen
        document.removeEventListener("keydown", handleEventKeys); // EventScreen
    }

    if (runState.stages[runState.currentStage].type === "fight") {
        if (eventScreenAnimationId !== null) {
            cancelAnimationFrame(eventScreenAnimationId);
        }
        showFightScreen(runState);
    } else { // ecran event
        if (fightScreenAnimationId !== null) {
            cancelAnimationFrame(fightScreenAnimationId);
        }
        showEventScreen(runState);
    }
    gameStarted = true;
}