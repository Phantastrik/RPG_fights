let runState;
let playerPreset;
fightScreenAnimationId = null; //id pour l'animation
stageScreenAnimationId = null; //id pour l'animation
eventScreenAnimationId = null; //id pour l'animation
startScreenAnimationId = null; //id pour l'animation
gameStarted = false;
let controls = [];

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

        console.log(runState.player);
        showStageScreen(runState);
    });
}

function nextRound(choosedAbility) {
    fetchNextRound(choosedAbility).then(state => {
        runState = state;
        console.log(runState);
        showStageScreen(runState);
    });
}

function endGame() {
    showEndScreen();
    deleteSession();
}

startGame();  // Lance le jeu
