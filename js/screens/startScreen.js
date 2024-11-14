// Variables globales pour la sélection de personnage
let characters = [];
let selectedIndex = 0;
let startScreenAnimationId = null; //id pour l'animation

// Fonction pour afficher l'écran de démarrage
function showStartScreen(playerPreset) {
    // Effacer le canvas
    Object.keys(playerPreset).forEach(key => {
        characters.push(key);
    });
    //  console.log(playerPreset[1]);
    clearCanvas();
    // Dessiner le personnage sélectionné
    startStartScreenAnimation();
    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleCharacterSelection);
}

// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleCharacterSelection(event) {
    if (event.key === "q" || event.key === "Q") {
        // Aller à gauche dans la sélection
        selectedIndex = (selectedIndex - 1 + characters.length) % characters.length;
        startStartScreenAnimation();
    } else if (event.key === "d" || event.key === "D") {
        // Aller à droite dans la sélection
        selectedIndex = (selectedIndex + 1) % characters.length;
        startStartScreenAnimation();
    } else if (event.key === "Enter") {
        // Valider le choix
        cancelAnimationFrame(startScreenAnimationId);
        selectCharacter();
        initRun();
    }
}

// Fonction pour valider la sélection et passer à l'écran suivant
function selectCharacter() {
    document.removeEventListener("keydown", handleCharacterSelection); // Retirer le gestionnaire d'événements
     // Passer à l'écran suivant ou initialiser la partie avec le personnage sélectionné
    //initRun(characters[selectedIndex]);
}

// Animation / dessin de l'ecran de démarrage
function animateStartScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // player sprite
    drawCharacter(spriteSource[characters[selectedIndex]],ctx.width/10,2*(ctx.height)/5,"walk");
    // choosed player box
    drawCharacterSelectionSelected(characters[selectedIndex],ctx.width/2,ctx.height/3);
    // player description
    /*
    i = 0
    playerPreset[characters[selectedIndex]].abilities.forEach(element => {
        drawAbility(element,(ctx.width/5)*2,ctx.height/5*(3+i/2)+(2*i));
        i++;
    }); */
    drawCharacterAbilities(playerPreset[characters[selectedIndex]],ctx.width/2,(ctx.height/6)*3);
    
    // bandeau header de l'ecran
    headerGUI("CHOOSE PLAYER");

    startScreenAnimationId = requestAnimationFrame(() => animateStartScreen());  // Boucle d'animation
}

// Fonction pour démarrer l'animation avec un nouvel état
function startStartScreenAnimation() {
    // Annule l'animation précédente s'il y en a une
    if (startScreenAnimationId !== null) {
        cancelAnimationFrame(startScreenAnimationId);
    }
    animateStartScreen();  // Lance la première frame de l'animation
}