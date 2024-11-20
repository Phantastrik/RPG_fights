let stageScreenAnimationId = null; //id pour l'animation

let selectedAbilityIndex = 0;
let stageNumber = 0;

function showStageScreen(runState) {
    clearCanvas();
    // Dessiner le personnage sélectionné
    startStageScreenAnimation();
    stageNumber = runState.stageNumber;


    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleAbilitySelection);
}


// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleAbilitySelection(event) {
    if (event.key === "q" || event.key === "Q") {
        // Aller à gauche dans la sélection
        selectedAbilityIndex = (selectedAbilityIndex - 1 + runState.player.abilities.length) % runState.player.abilities.length;
        startStageScreenAnimation();
    } else if (event.key === "d" || event.key === "D") {
        // Aller à droite dans la sélection
        selectedAbilityIndex = (selectedAbilityIndex + 1) % runState.player.abilities.length;
        startStageScreenAnimation();
    } else if (event.key === "Enter") {
        // Valider le choix
        // document.removeEventListener("keydown", handleCharacterSelection); // Retirer le gestionnaire d'événements

        // cancelAnimationFrame(stageScreenAnimationId);
        nextRound(selectedAbilityIndex);
        startStageScreenAnimation();
        // selectCharacter();
        // initRun(characters[selectedIndex]);
    }
}

// Animation / dessin de l'ecran de démarrage
function animateStageScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // header
    drawStagesScreenHeader();
    // player sprite
    pos = grid.pos(-1, 3);
    drawCharacter(spriteSource[runState.player.className], pos.x, pos.y, "idle");
    // player description
    pos = grid.pos(8, 12);
    drawAbility(runState.player.abilities[selectedAbilityIndex], pos.x, pos.y)

    // monster
    if (runState.stages[runState.currentStage].type === "fight") {
        setBackground(UI_BG.bg4);
        // sprite
        pos = grid.pos(20, 7);
        drawMonster("gobelin", pos.x, pos.y, "idle");
        // stats
        drawStatsBar(25, 12, runState.stages[runState.currentStage].enemy, true, false);
    } else {
        // bg pour les event
        setBackground(UI_BG.bg3);
    }
    // statbar du perso
    drawStatsBar(0, 1.8, runState.player);

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