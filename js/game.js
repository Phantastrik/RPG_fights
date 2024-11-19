let runState;
let playerPreset;

function startGame() {
    deleteSession().then(
        fetchPlayerPreset().then(response => {
            playerPreset = response;
            showStartScreen(playerPreset);
        })
    );
}

function initRun(characterClass) {
    fetchRunState(characterClass).then(state => {
        runState = state;
        showStageScreen(runState);
    });
}

function nextRound(choosedAbility) {
    fetchNextRound(choosedAbility).then(state => {
        runState = state;
        console.log(runState);
        // showStageScreen(runState);
    });
}

function endGame() {
    showEndScreen();
    deleteSession();
}

startGame();  // Lance le jeu
