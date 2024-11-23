let fightScreenAnimationId = null; //id pour l'animation

let selectedAbilityIndex = 0;

function showFightScreen(runState) {
    clearCanvas();
    // Dessiner le personnage sélectionné
    startFightScreenAnimation();

    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleAbilitySelection);
}


// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleAbilitySelection(event) {
    if (event.key === "q" || event.key === "Q") {
        // Aller à gauche dans la sélection
        selectedAbilityIndex = (selectedAbilityIndex - 1 + runState.player.abilities.length) % runState.player.abilities.length;
        startFightScreenAnimation();
    } else if (event.key === "d" || event.key === "D") {
        // Aller à droite dans la sélection
        selectedAbilityIndex = (selectedAbilityIndex + 1) % runState.player.abilities.length;
        startFightScreenAnimation();
    } else if (event.key === "Enter") {
        // Valider le choix
        // document.removeEventListener("keydown", handleCharacterSelection); // Retirer le gestionnaire d'événements

        // cancelAnimationFrame(fightScreenAnimationId);
        nextRound(selectedAbilityIndex);
        startFightScreenAnimation();
        // selectCharacter();
        // initRun(characters[selectedIndex]);
    }
}

// Animation / dessin de l'ecran de démarrage
function animateFightScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // header
    drawStagesScreenHeader();
    // player sprite
    pos = grid.pos(-1, 3);
    drawCharacter(spriteSource[runState.player.className], pos.x, pos.y, "idle");

    // monster
    if (runState.stages[runState.currentStage].type === "fight") {
        setBackground(UI_BG.bg4);
        // sprite
        pos = grid.pos(20, 7);
        drawMonster("gobelin", pos.x, pos.y, "idle");
        // stats
        drawStatsBar(25, 12, runState.stages[runState.currentStage].enemy, true, false);
        // player ability
        pos = grid.pos(2, 4);
        drawAbility(runState.player.abilities[selectedAbilityIndex], pos.x, pos.y)

        if (runState.stages[runState.currentStage].enemy.activeEffects.length > 0) {
            let i = 0;
            runState.stages[runState.currentStage].enemy.activeEffects.forEach(effect => {
                pos = grid.pos(20, 5 + i);
                drawEffect(pos.x, pos.y, effect);
                i+=0.5;
            });

        }

    } else {
        // bg pour les event
        setBackground(UI_BG.bg3);
    }
    // statbar du perso
    drawStatsBar(0, 1.8, runState.player);
    
    if (runState.player.activeEffects.length > 0) {
        let i = 0;
        runState.player.activeEffects.forEach(effect =>{
            pos = grid.pos(5, 3.5+i);
            console.log(pos.y);
            drawEffect(pos.x, pos.y, effect);
            i+=1;
        });
       
    }

    fightScreenAnimationId = requestAnimationFrame(() => animateFightScreen());  // Boucle d'animation
}

// Fonction pour démarrer l'animation avec un nouvel état
function startFightScreenAnimation() {
    // Annule l'animation précédente s'il y en a une
    if (fightScreenAnimationId !== null) {
        cancelAnimationFrame(fightScreenAnimationId);
    }
    animateFightScreen();  // Lance la première frame de l'animation
}