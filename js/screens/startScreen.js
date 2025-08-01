// Variables globales pour la sélection de personnage
let characters = [];
let selectedIndex = 0;



// Fonction pour afficher l'écran de démarrage
function showStartScreen(playerPreset) {
    // tableau des controls 
    controls = [
        {key:'Q', label:"Previous"},
        {key:'D', label:"Next"},
        {key:'Enter', label:"Choose player"},
    ]

    // player presets
    Object.keys(playerPreset).forEach(key => {
        characters.push(key);
    });
    
    // background de depart
    setBackground(UI_BG.bg2);
    // animation de l'ecran
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
        initRun(characters[selectedIndex]);
    }
}


// Animation / dessin de l'ecran de démarrage
function animateStartScreen() {
    // Effacer la zone de sélection
    clearCanvas();
    // player sprite
    pos = grid.pos(-1,3);
    drawCharacter(spriteSource[characters[selectedIndex]],pos.x,pos.y,"walk");
    

    // choosed player box
    drawCharacterSelectionSelected(characters[selectedIndex],10,4);
    // player description
    // drawCharacterAbilities(playerPreset[characters[selectedIndex]],12.5,7);
 
   // drawKey(pos.x, pos.y,"Q");
    // bandeau header de l'ecran
    headerGUI("Welcome to foggy's Castle","Choose a hero and defeat the foes");
    pos = grid.pos(21,2);
    drawControlsHint(pos.x,pos.y);
   
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