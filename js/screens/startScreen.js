// Variables globales pour la sélection de personnage
let characters = [];
let selectedIndex = 0;

// Fonction pour afficher l'écran de démarrage
function showStartScreen(playerPreset) {
    // Effacer le canvas
    Object.keys(playerPreset).forEach(key => {
        characters.push(key);
    });
  //  console.log(playerPreset[1]);
    clearCanvas();

    // Dessiner le personnage sélectionné
    drawCharacterSelection();


    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleCharacterSelection);
}

// Fonction pour dessiner le personnage actuellement sélectionné
function drawCharacterSelection() {
    // Effacer la zone de sélection
    clearCanvas();
    // Calculer la position et afficher le personnage sélectionné
    startAnimation(characters[selectedIndex],"walk",-50, 100);
    headerGUI("CHOOSE PLAYER");
  
    drawCharacterSelectionSelected(characters[selectedIndex],ctx.width/2,ctx.height/2);
    drawAbility(playerPreset[characters[selectedIndex]].abilities[0],100,100);

}

// Fonction de gestion des touches pour naviguer dans la sélection de personnages
function handleCharacterSelection(event) {
    if (event.key === "q" || event.key === "Q") {
        // Aller à gauche dans la sélection
        selectedIndex = (selectedIndex - 1 + characters.length) % characters.length;
        drawCharacterSelection();
    } else if (event.key === "d" || event.key === "D") {
        // Aller à droite dans la sélection
        selectedIndex = (selectedIndex + 1) % characters.length;
        drawCharacterSelection();
    } else if (event.key === "Enter") {
        // Valider le choix
        selectCharacter();
    }
}

// Fonction pour valider la sélection et passer à l'écran suivant
function selectCharacter() {
    document.removeEventListener("keydown", handleCharacterSelection); // Retirer le gestionnaire d'événements
    // console.log("Personnage sélectionné :", characters[selectedIndex]);
    // Passer à l'écran suivant ou initialiser la partie avec le personnage sélectionné
    initRun(characters[selectedIndex]);
}
