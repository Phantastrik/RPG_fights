
let selectedAbilityIndex = 0;
let fightPlayerState = "idle";
let monsterState = "idle";
let stateVariant = 0;
let monsterStateVariant = 0;
let monsterName;

function showFightScreen(runState) {

    controls = [
        { key: 'Q', label: "Previous" },
        { key: 'D', label: "Next" },
        { key: 'Enter', label: "Choose Ability" },
    ]
    monsterName = runState.stages[runState.currentStage].enemy.name;

    clearCanvas();

    // stge
    setBackground(UI_BG.bg4);

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
        let selectedAbility = runState.player.abilities[selectedAbilityIndex];
        // declenche uniquement si assez de pm
        if (selectedAbility.pm_cost <= runState.player.modifiedStats.pm) {
            endPhaseAnimation();
        } else {
            startFightScreenAnimation();
        }

    }
}

// Animation / dessin de l'ecran de démarrage
function animateFightScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // header
    drawStagesScreenHeader();
    // -----------player 
    // sprite
    pos = grid.pos(-1, 3);
    if (fightPlayerState === "attaques") {
        drawCharacter(spriteSource[runState.player.className], pos.x, pos.y, fightPlayerState, stateVariant);
    } else {
        drawCharacter(spriteSource[runState.player.className], pos.x, pos.y, fightPlayerState);
    }
    // player ability
    pos = grid.pos(2, 4);
    // si pas assez de pm on la dessine en disabled
    let selectedAbility = runState.player.abilities[selectedAbilityIndex];

    if (selectedAbility.pm_cost > runState.player.modifiedStats.pm) {
        drawAbility(runState.player.abilities[selectedAbilityIndex], pos.x, pos.y, true)
    } else {
        drawAbility(runState.player.abilities[selectedAbilityIndex], pos.x, pos.y, false)
    }



    // ----- monster
    // choosed ability 
    let enemyAbility = runState.stages[runState.currentStage].fightRound[
        runState.stages[runState.currentStage].currentRound
    ].enemy.usedAbility
    // sprite
    pos = grid.pos(20, 7);
    if (monsterState === "attaques") {
        drawMonster(monsterName, pos.x, pos.y, monsterState, monsterStateVariant);
    } else {
        drawMonster(monsterName, pos.x, pos.y, monsterState);
    }
    // Monster ability
    pos = grid.pos(23, 6);
    drawAbility(enemyAbility, pos.x, pos.y)


    // stats
    drawStatsBar(25, 12, runState.stages[runState.currentStage].enemy, true, false);

    if (runState.stages[runState.currentStage].enemy.activeEffects.length > 0) {
        let i = 0;
        runState.stages[runState.currentStage].enemy.activeEffects.forEach(effect => {
            pos = grid.pos(16, 5 + i);
            drawEffect(pos.x, pos.y, effect);
            i += 0.8;
        });
    }
    // statbar du perso
    drawStatsBar(0, 1, runState.player);

    if (runState.player.activeEffects.length > 0) {
        let i = 0;
        runState.player.activeEffects.forEach(effect => {
            pos = grid.pos(5, 3.5 + i);
            drawEffect(pos.x, pos.y, effect);
            i += 0.8;
        });

    }
    // controls hint
    pos = grid.pos(21, 1);
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
    console.log(runState.stages[runState.currentStage].fightRound);
    console.log(runState.stages[runState.currentStage].currentRound);

    enemyAttackFlavor = runState.stages[runState.currentStage].fightRound[
        runState.stages[runState.currentStage].currentRound
    ].enemy.usedAbility.flavor;


    playerAttackFlavor = runState.player.abilities[selectedAbilityIndex].flavor;

    playerFirst = runState.stages[runState.currentStage].enemy.vitesse <= runState.player.vitesse;
    if (playerFirst) {
        // le joueur attaque
        fightPlayerState = "attaques";
        stateVariant = getAttackType(playerAttackFlavor);
        monsterState = 'hurt';
        setTimeout(() => {
            monsterState = 'idle';
        }, monster_spritesheet_data[monsterName].hurt.frameCount * animationSpeed);
        showStageScreen(runState);

        setTimeout(() => {
            fightPlayerState = "hurt";

            setTimeout(() => {
                fightPlayerState = 'idle';
            }, spriteSource[runState.player.className]["attaques"][stateVariant].frameCount * animationSpeed);
            showStageScreen(runState);


            // le monstra attaque
            monsterState = "attaques";
            monsterStateVariant = getAttackType(enemyAttackFlavor);
            // fin des animations 
            setTimeout(endTurn,
                monster_spritesheet_data[monsterName]["attaques"][monsterStateVariant].frameCount * animationSpeed);

            showStageScreen(runState);

        }, spriteSource[runState.player.className]["attaques"][stateVariant].frameCount * animationSpeed);

        showStageScreen(runState);
    } else {
        // le monstra attaque
        monsterState = "attaques";
        monsterStateVariant = getAttackType(enemyAttackFlavor);
        setTimeout(() => {
            monsterState = 'idle';

            // le player attaque
            fightPlayerState = "attaques";
            console.log(playerAttackFlavor);
            stateVariant = getAttackType(playerAttackFlavor);
            // fin des animations 
            setTimeout(endTurn, spriteSource[runState.player.className]["attaques"][stateVariant].frameCount * animationSpeed);

            showStageScreen(runState);

        }, monster_spritesheet_data[monsterName]["attaques"][monsterStateVariant].frameCount * animationSpeed);
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
function getAttackType(flavor) {
    $res = 'else';
    if (flavor === "Attaque magique") {
        $res = "magic";
    } else if (flavor === "Attaque physique") {
        $res = "physic"
    } else if (flavor === 'spell') {
        $res = "spell";
    }
    return $res;
}