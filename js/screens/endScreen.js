
let endPlayerState = "die";
let drawPlayer = true;
let runStats = [];
function showEndScreen() {
    controls = [
        { key: 'R', label: "Restart seed" },
        { key: 'Enter', label: "New game" }
    ]
    if (gameStarted) {
        document.removeEventListener("keydown", handleAbilitySelection); // event du fight screen
        document.removeEventListener("keydown", handleEventKeys); // EventScreen    
    }
    cancelAnimationFrame(eventScreenAnimationId);
    cancelAnimationFrame(fightScreenAnimationId);


    clearCanvas();
    // bg pour la fin
    calculateStats();


    setBackground(UI_BG.bg1);
    // animation de fin 
    fightPlayerState = "hurt";
    setTimeout(() => {
        fightPlayerState = 'die';

        setTimeout(() => {
            fightPlayerState = 'die';
            cancelAnimationFrame(endScreenAnimationId);

            drawPlayer = false;

        }, spriteSource[runState.player.className].die.frameCount * animationSpeed);
        startEndScreenAnimation();

    }, spriteSource[runState.player.className].hurt.frameCount * animationSpeed);
    startEndScreenAnimation();
    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleEndKeys);
}


// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleEndKeys(event) {
    if (event.key === "r" || event.key === "R") {

        cancelAnimationFrame(endScreenAnimationId);
        initRun();
    } else if (event.key === "Enter") {
        cancelAnimationFrame(endScreenAnimationId);
        initRun();
    }
}

// Animation / dessin de l'ecran de démarrage
function animateEndScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // header
    drawEndScreenHeader();

    // player sprite
    if (drawPlayer) {
        pos = grid.pos(-1, 3);
        drawCharacter(spriteSource[runState.player.className],
            pos.x, pos.y, endPlayerState);
    }


    // statbar du perso
    drawStatsBar(0, 1.8, runState.player);
    drawStats()

    // controls hint
    pos = grid.pos(21, 2);
    drawControlsHint(pos.x, pos.y);


    endScreenAnimationId = requestAnimationFrame(() => animateEndScreen());  // Boucle d'animation
}

// Fonction pour démarrer l'animation avec un nouvel état
function startEndScreenAnimation() {
    // Annule l'animation précédente s'il y en a une
    if (endScreenAnimationId !== null) {
        cancelAnimationFrame(endScreenAnimationId);
    }
    animateEndScreen();  // Lance la première frame de l'animation
}

function calculateStats(){

    runStats.push({ key : 'Stage number', value: runState.stages.length});

    let count = 0;
    let enemies = 0
    runState.stages.forEach(stage => {
        if(stage.type=="fight"){
            stage.fightRound.forEach(round => {
                count += round.enemy.damageReceived;
            })
            if(stage.playerWon){
                enemies++;
            }
        }
    });
    
    runStats.damageDealt = count;
    runStats.push({ key : 'Damage Dealt', value: count});
    runStats.enemyDefeated = enemies;
    runStats.push({ key : 'Enemy defeated', value: enemies});
}

function drawStats(){
    
    pos = grid.pos(7.5,4);
    dim = grid.pos(10,6);
    drawBox(pos.x, pos.y, dim.x, dim.y,
         UI_COLORS.light_alpha, 2, UI_COLORS.transparent);

          //
    let i = 0.5;
    ctx.textAlign = "left";
    pad = grid.pos(0.2, i);
    drawShadowedText("Stats", pos.x + pad.x, pos.y + pad.y, 2, UI_COLORS.shadow, UI_COLORS.light, UI_FONTS.getFont("small", "primary"));
    i += 0.7;
    console.log(runStats);
    runStats.forEach(element => {
        // key
        pad = grid.pos(0.2, i);
        drawShadowedText(element.key, pos.x + pad.x, pos.y + pad.y, 2, UI_COLORS.shadow, UI_COLORS.light, UI_FONTS.getFont("small", "secondary"));
        // label
        pad = grid.pos(5, i);
        drawShadowedText(`: ${element.value}`, pos.x + pad.x, pos.y + pad.y, 2, UI_COLORS.shadow, UI_COLORS.light, UI_FONTS.getFont("small", "secondary"));
        i += 1;
    });
    
}
