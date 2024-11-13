const API_ROUTES = {
    getRunState: '../main/controllers/getRunState.php',
    deleteSession: '../main/controllers/endGame.php',
    fetchNextRound: '../main/controllers/playNextRound.php',
    fetchPlayerPresets: '../main/controllers/fetchPlayerPreset.php'
};

const CANVAS_DIMENSIONS = { width: 800, height: 400 };
const UI_COLORS = {
    primary : '#5186b8',
    shadow : '#293b4d',
    secondary : '#519eb8',
    contrast : '#b86c51',
    text : {
        light : '#ffffff',
        dark : '#000000'
    },
    abilities : {
        physicAttack : '#c4547c',
        magicAttack : '#54c4a8'
    }
}