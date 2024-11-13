const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.width = CANVAS_DIMENSIONS.width;
ctx.height = CANVAS_DIMENSIONS.height;
ctx.font = "10px verdana";
ctx.textAlign = "left";
// Variables pour le chargement de l'image et l'animation
let spriteSheet;
let currentFrame = 0; // Nombre total de frames dans la sprite sheet
let animationSpeed = 100;  // Vitesse d'animation en millisecondes
let lastUpdateTime = 0;
let playerAnimationId = null;
let spriteSource = {
    warrior: {
        frameWidth: 256,
        frameHeight: 256,
        src: `../assets/player/warrior_sprite.png`,
        walk: { x: 0, y: 0, frameCount: 8,},
        run: { x: 0, y: 256, frameCount: 7 },
        attaques: [
            { x: 0, y: 512, frameCount: 6 },
            { x: 0, y: 768, frameCount: 5 },
            { x: 0, y: 1024, frameCount: 4 },
            { x: 0, y: 1280, frameCount: 4 }
        ]
    },
    rogue: {
        frameWidth: 256,
        frameHeight: 256,
        src: `../assets/player/rogue_sprite.png`,
        walk: { x: 0, y: 256, frameCount: 9 },
        run: { x: 0, y: 512, frameCount: 8 },
        attaques: [
            { x: 0, y: 768, frameCount: 4 },
            { x: 0, y: 1024, frameCount: 5 },
            { x: 0, y: 1280, frameCount: 4 },
        ]
    },
    mage: {
        frameWidth: 256,
        frameHeight: 256,
        src: `../assets/player/mage_sprite.png`,
        walk: { x: 0, y: 256, frameCount: 7},
        run: { x: 0, y: 512, frameCount: 8},
        attaques: [
            { x: 0, y: 768, frameCount: 7 },
            { x: 0, y: 1024, frameCount: 9 },
            { x: 0, y: 1280, frameCount: 16 }
        ]
    }
};

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/// Fonction de dessin 
function drawHealthBar(hb) {
    // shadow
    ctx.strokeStyle = "black";
    ctx.strokeRect(hb.x, hb.y, hb.l + 2, hb.h + 2);
    // main
    ctx.fillStyle = "white";
    ctx.fillRect(hb.x - 1, hb.y - 1, hb.l + 2, hb.h + 2);
    ctx.fillStyle = "red"; // Bleu pour le joueur, rouge pour l'ennemi
    ctx.fillRect(hb.x, hb.y, hb.lval, hb.h);

}
function drawManaBar(mb) {
    // shadow
    ctx.strokeStyle = "black";
    ctx.strokeRect(mb.x, mb.y, mb.l + 2, mb.h + 2);
    // main
    ctx.fillStyle = "white";
    ctx.fillRect(mb.x - 1, mb.y - 1, mb.l + 2, mb.h + 2);
    ctx.fillStyle = "rgb(100,100,255)";
    ctx.fillRect(mb.x, mb.y, mb.lval, mb.h);

}
// dessin de la liste des stages
function drawStagesSideBar() {
    SSBpad = 10;
    SSB = {
        x: Math.floor(ctx.width / 4) * 3 + SSBpad,
        y: SSBpad,
        w: Math.floor(ctx.width / 4) - (2 * SSBpad),
        h: ctx.height - (2 * SSBpad),
        backgroundColor: "rgba(255,255,240,0.3)",
        stageTextColor: "white",
        textLPad: 10,
        stages: []
    }
    i = 0
    runState.stages.forEach((stage) => {
        pad = 3;
        hei = 20
        SSB.stages.push(
            {
                x: (SSB.x + pad),
                y: (SSB.y + pad) + (hei + pad) * i,
                text: (stage.stageNumber + " " + (stage.type == "event" ? (stage.type + " " + stage.name) : stage.type)),
                w: (SSB.w - (pad * 2)),
                h: hei,
                stageBackgroundColor: (stage.done ? "#bfb9ac" : "#ad8a5f"),
            }
        );
        i++;
    });
    //console.log(SSB);
    // ---------encadré a droite
    shadowPad = 2;
    // shadow 
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fillRect(SSB.x + shadowPad, SSB.y + shadowPad, SSB.w, SSB.h);
    // dessin
    ctx.fillStyle = SSB.backgroundColor;
    ctx.fillRect(SSB.x, SSB.y, SSB.w, SSB.h);

    // dessin de chaque stage
    SSB.stages.forEach((stage) => {

        // -------fond---------
        // shadow 
        ctx.fillStyle = "black";
        ctx.fillRect(stage.x + shadowPad, stage.y + shadowPad, stage.w, stage.h);
        // dessin
        ctx.fillStyle = stage.stageBackgroundColor;
        ctx.fillRect(stage.x, stage.y, stage.w, stage.h);
        // -------texte--------
        shadowPad = 1;
        //shadow
        ctx.fillStyle = SSB.stageTextColor;
        ctx.fillText(stage.text, stage.x + SSB.textLPad, stage.y + (stage.h / 2) + 5, stage.w);
        // dessin
        ctx.fillStyle = SSB.stageTextColor;
        ctx.fillText(stage.text, stage.x + SSB.textLPad, stage.y + (stage.h / 2) + 5, stage.w);


    });

}


function drawPlayerStats(x, y) {
    const player = runState.player;

    // Style et configuration de la police;
    ctx.fillStyle = "black";

    // Définir les statiques du joueur dans un tableau pour affichage
    const stats = [
        `Nom: ${player.name}`,
        `Niveau: ${player.niveau}`,
        `PV: ${player.pv} / ${player.pvMax}`,
        `PM: ${player.pm} / ${player.pmMax}`,
        `Attaque: ${player.attaque}`,
        `Défense: ${player.defense}`,
        `Sagesse: ${player.sagesse}`,
        `Vitesse: ${player.vitesse}`,
        `XP: ${player.exp} / ${player.baseExp}`
    ];

    // Dimensions pour le fond du tableau
    const padding = 10;
    const lineHeight = 21;
    const boxWidth = 120;
    const boxHeight = stats.length * lineHeight + padding * 2;

    // Dessiner le fond de la boîte des stats
    ctx.fillStyle = "rgba(255, 255, 255, 0)";  // Fond semi-transparent
    ctx.fillRect(x, y, boxWidth, boxHeight);

    // Dessiner les statistiques
    ctx.fillStyle = "black";  // Texte en noir
    stats.forEach((text, index) => {
        pad = 5;
        // shadow
        ctx.fillStyle = "rgba(0,0,0,0.5)"
        ctx.fillRect(x + padding + 2, y + padding + pad + (index) * lineHeight + 2, 100, 20);
        ctx.fillStyle = "black"
        ctx.fillText(text, x + padding + pad, y + padding + (index + 1) * lineHeight - pad);
        // main
        ctx.fillStyle = "rgba(130,200,200,1)"
        ctx.fillRect(x + padding, y + padding + pad + (index) * lineHeight, 100, 20);
        ctx.fillStyle = "black"
        ctx.fillText(text, x + padding + pad + 2, y + padding + (index + 1) * lineHeight - pad + 2);

    });
}




// Fonction pour dessiner l'animation d'un personnage
function drawCharacter(charData, state, x, y,stateVariant) {
    // Charger la sprite sheet si elle n'est pas déjà chargée
    let stateAnimation = charData[state];
    
   // console.log(stateAnimation);
    if(stateVariant !== undefined){
       // console.log(stateAnimation);
        stateAnimation = charData[state][stateVariant];
    }
    // console.log(state);
    // console.log(stateAnimation);
    // console.log(stateAnimation.y);
    // Charger une nouvelle sprite sheet si l'état a changé
    if (!spriteSheet || spriteSheet.src !== charData.src) {
        spriteSheet = new Image();
        spriteSheet.src = charData.src;
    }
   // console.log(stateAnimation);
    // Définir la vitesse d'animation pour alterner les frames
    let now = Date.now();
    if (now - lastUpdateTime > animationSpeed) {
        currentFrame = (currentFrame + 1) % stateAnimation.frameCount;  // Passer à la frame suivante
        lastUpdateTime = now;
    }
    // frameCount = charData[state].frameCount;
    // Calculer la position de la frame actuelle dans la sprite sheet
    sourceX = (currentFrame *  charData.frameWidth) + stateAnimation.x;
    sourceY = 0 + stateAnimation.y;
    // Dessiner la frame actuelle sur le canvas
    ctx.clearRect(x, y, charData.frameWidth, charData.frameHeight);  // Effacer l'emplacement précédent
    ctx.drawImage(
        spriteSheet,
        sourceX, sourceY, charData.frameWidth, charData.frameHeight,  // Découpe de la frame
        x, y, charData.frameWidth, charData.frameHeight               // Position de la frame sur le canvas
    );
}

// Fonction d'animation
function animate(charData, state, x, y,stateVariant) {
    // Appeler `drawCharacter` avec la position souhaitée
    drawCharacter(spriteSource[charData], state, x, y,stateVariant);

    playerAnimationId = requestAnimationFrame(() => animate(charData, state, x, y,stateVariant));  // Boucle d'animation
}

// Fonction pour démarrer l'animation avec un nouveau personnage ou un nouvel état
function startAnimation(charData, state, x, y,stateVariant) {
    // Annule l'animation précédente s'il y en a une
    if (playerAnimationId !== null) {
        cancelAnimationFrame(playerAnimationId);
    }
    animate(charData, state, x, y,stateVariant);  // Lance la première frame de l'animation
}