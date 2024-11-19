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
    drawStagesScreenHeader();
    // player sprite
    pos = grid.pos(-1, 3);
    drawCharacter(spriteSource[runState.player.className], pos.x, pos.y, "idle");
    // player description
    // drawCharacterAbilities(runState.player,20,4);
    pos = grid.pos(8, 12);
    drawAbility(runState.player.abilities[selectedAbilityIndex], pos.x, pos.y)
    // vie / mana
    pos = grid.pos(1, 11.5);
    dim = grid.pos(4, 0.5);
    drawHealthBar(pos.x, pos.y, dim.x, dim.y, runState.player);
    pos = grid.pos(1, 12);
    drawManaBar(pos.x, pos.y, dim.x, dim.y, runState.player);



    // monster
    if (runState.stages[runState.currentStage].type === "fight") {
        pos = grid.pos(20, 7);
        drawMonster("gobelin", pos.x, pos.y, "idle");
        // vie / mana
        pos = grid.pos(20, 11.5);
        dim = grid.pos(4, 0.5);
        drawHealthBar(pos.x, pos.y, dim.x, dim.y, runState.stages[runState.currentStage].enemy);
        pos = grid.pos(20, 12);
        drawManaBar(pos.x, pos.y, dim.x, dim.y, runState.stages[runState.currentStage].enemy);

    }

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