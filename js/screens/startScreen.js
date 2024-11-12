// Variables globales pour la sélection de personnage
let characters = ["Warrior", "Rogue", "Mage"];
let selectedIndex = 0;

// Fonction pour afficher l'écran de démarrage
function showStartScreen() {
    // Effacer le canvas
    clearCanvas();

    // Afficher les instructions
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Sélectionnez un personnage :", 100, 100);
    ctx.fillText("Utilisez Q et D pour changer, Entrée pour valider.", 100, 130);

    // Dessiner le personnage sélectionné
    drawCharacterSelection();
    // Démarrer l'animation en appelant `animate()`
animate();

    // Ajouter le gestionnaire d'événements pour la sélection
    document.addEventListener("keydown", handleCharacterSelection);
}

// Fonction pour dessiner le personnage actuellement sélectionné
function drawCharacterSelection() {
    // Effacer la zone de sélection
    clearCanvas();

    // Calculer la position et afficher le personnage sélectionné
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.textAlign = "center";
    ctx.fillText(characters[selectedIndex], canvas.width / 2, canvas.height / 2);
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
    console.log("Personnage sélectionné :", characters[selectedIndex]);
    // Passer à l'écran suivant ou initialiser la partie avec le personnage sélectionné
    initRun(characters[selectedIndex]);
}
