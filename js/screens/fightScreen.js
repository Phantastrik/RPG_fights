
let selectedAbilityIndex = 0;
let fightPlayerState = "idle";
let monsterState = "idle";
let stateVariant = 0;
let monsterStateVariant = 0;
function showFightScreen(runState) {

    controls = [
        { key: 'Q', label: "Previous" },
        { key: 'D', label: "Next" },
        { key: 'Enter', label: "Choose Ability" },
    ]

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
       endPhaseAnimation();

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
    if (fightPlayerState === "attaques") {
        drawCharacter(spriteSource[runState.player.className], pos.x, pos.y, fightPlayerState, stateVariant);
    } else {
        drawCharacter(spriteSource[runState.player.className], pos.x, pos.y, fightPlayerState);
    }

    // monster
    if (runState.stages[runState.currentStage].type === "fight") {
        setBackground(UI_BG.bg4);
        // sprite
        pos = grid.pos(20, 7);

        if (monsterState === "attaques") {
            drawMonster("gobelin", pos.x, pos.y, monsterState, monsterStateVariant);
        } else {   
            drawMonster("gobelin", pos.x, pos.y, monsterState);
        }
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
                i += 0.8;
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
        runState.player.activeEffects.forEach(effect => {
            pos = grid.pos(5, 3.5 + i);
            drawEffect(pos.x, pos.y, effect);
            i += 0.8;
        });

    }
    // controls hint
    pos = grid.pos(21, 2);
    drawControlsHint(pos.x, pos.y);

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

function endPhaseAnimation() {
    
    playerFirst = runState.stages[runState.currentStage].enemy.vitesse <= runState.player.vitesse;
    if (playerFirst) {
        // le joueur attaque
        fightPlayerState = "attaques";
        stateVariant = selectedAbilityIndex % spriteSource[runState.player.className].attaques.length;
        
        
        setTimeout(() => {
            fightPlayerState = "idle";
     
            // le monstra attaque
            monsterState = "attaques";
            monsterStateVariant = Math.floor(Math.random() * monster_spritesheet_data["gobelin"].attaques.length);
            // fin des animations 
            setTimeout(endTurn,
             monster_spritesheet_data["gobelin"]["attaques"][monsterStateVariant].frameCount * animationSpeed);

            showStageScreen(runState);

        }, spriteSource[runState.player.className]["attaques"][stateVariant].frameCount * animationSpeed);
        
        showStageScreen(runState);
    } else {
        // le monstra attaque
        monsterState = "attaques";
        monsterStateVariant = Math.floor(Math.random() * monster_spritesheet_data["gobelin"].attaques.length);
        setTimeout(() => {
            monsterState = 'idle';

            // le player attaque
            fightPlayerState = "attaques";
            stateVariant = selectedAbilityIndex % spriteSource[runState.player.className].attaques.length;
            // fin des animations 
            setTimeout(endTurn, spriteSource[runState.player.className]["attaques"][stateVariant].frameCount * animationSpeed);

            showStageScreen(runState);

        }, monster_spritesheet_data["gobelin"]["attaques"][monsterStateVariant].frameCount * animationSpeed);
        showStageScreen(runState);
    }
}

function endTurn() {
    fightPlayerState = "idle";
    monsterState = "idle";
    // document.removeEventListener("keydown", handleCharacterSelection); // Retirer le gestionnaire d'événements
    cancelAnimationFrame(fightScreenAnimationId);
    // cancelAnimationFrame(fightScreenAnimationId);
    nextRound(selectedAbilityIndex);
    showStageScreen(runState);
}