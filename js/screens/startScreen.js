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
        document.removeEventListener("keydown", handleCharacterSelection); // Retirer le gestionnaire d'événements
        initRun(characters[selectedIndex]);
    }
}


// Animation / dessin de l'ecran de démarrage
function animateStartScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    setBackground(UI_BG.bg2);
    // player sprite
    pos = grid.pos(-1,3);
    drawCharacter(spriteSource[characters[selectedIndex]],pos.x,pos.y,"walk");
    // choosed player box
    drawCharacterSelectionSelected(characters[selectedIndex],10,4);
    // player description
    drawCharacterAbilities(playerPreset[characters[selectedIndex]],12.5,7);
    
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