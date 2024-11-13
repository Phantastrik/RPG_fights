let runState;
let playerPreset;

function startGame() {
    fetchPlayerPreset().then(response => {
        playerPreset = response;
        showStartScreen(playerPreset);
    });
}

function initRun(characterClass) {
    fetchRunState(characterClass).then(state => {
        runState = state;
        runState.player.className = characterClass;  // Init avec la classe choisie
        showStageScreen(runState);
    });
}

function nextRound() {
    fetchNextRound().then(state => {
        runState = state;
        showStageScreen(runState);
    });
}

function endGame() {
    showEndScreen();
    deleteSession();
}

startGame();  // Lance le jeu
