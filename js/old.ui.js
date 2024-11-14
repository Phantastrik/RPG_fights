/// Player - stats - health bar
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
// Player - stats - mana bar
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

// Player - stats - all
function drawPlayerStats(x, y) {
    const player = runState.player;

    // Style et configuration de la police;
    ctx.fillStyle = UI_COLORS.text.dark;

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



// StartScreen - GUI - Header
function headerGUI(text) {
    let pad = 10;
    // Shadow     
    ctx.fillStyle = UI_COLORS.shadow;  // Fond semi-transparent
    ctx.fillRect(UI_CONFIG.shadowPad + pad,
        UI_CONFIG.shadowPad + pad,
        ctx.width - 2 * pad, 75);
    // main
    ctx.fillStyle = UI_COLORS.primary;  // Fond semi-transparent
    ctx.fillRect(0 + pad, 0 + pad, ctx.width - 2 * pad, 75);

    // text
    ctx.fillStyle = UI_COLORS.text.dark
    ctx.font = UI_FONTS.getFont("big", "primary");
    ctx.textAlign = "center";
    ctx.fillText(text, ctx.width / 2, 50);

}

// StartScreen - GUI - character selector
function drawCharacterSelectionSelected(text, x, y) {
    // -- BOX --
    size = {
        w: 200,
        h: 60
    }
    // Shadow
    ctx.fillStyle = UI_COLORS.shadow;  // Fond noir semi-transparent
    ctx.fillRect(x - (size.w / 2) + UI_CONFIG.shadowPad,
        y - (size.h / 2) + UI_CONFIG.shadowPad,
        size.w, size.h);
    // main
    ctx.fillStyle = UI_COLORS.secondary;
    ctx.fillRect(x - (size.w / 2),
        y - (size.h / 2),
        size.w, size.h);
    // --- TEXT -- 

    ctx.textAlign = "center";
    ctx.font = UI_FONTS.getFont("big", "primary");
    // shadow
    ctx.fillStyle = UI_COLORS.shadow
    ctx.fillText(text,
        x + UI_CONFIG.shadowpad,
        y + UI_CONFIG.shadowPad + 10);
    // main
    ctx.fillStyle = UI_COLORS.text.light
    ctx.fillText(text, x, y + 10);
}




// stageScreen - UI - stages
function drawStagesSideBar() {
    SSBpad = 10;
    SSB = {
        x: Math.floor(ctx.width / 4) * 3 + SSBpad,
        y: SSBpad,
        w: Math.floor(ctx.width / 4) - (2 * SSBpad),
        h: ctx.height - (2 * SSBpad),
        backgroundColor: UI_COLORS.primary,
        stageTextColor: UI_COLORS.text.light,
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
                stageBackgroundColor: (stage.done ? UI_COLORS.primary : UI_COLORS.secondary),
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



// Charactr - draw from spritesheet 
function drawCharacter(charData, state, x, y, stateVariant) {
    let stateAnimation = charData[state];
    // Charger la sprite sheet si elle n'est pas déjà chargée
    if (stateVariant !== undefined) {
        stateAnimation = charData[state][stateVariant];
    }
    // Charger une nouvelle sprite sheet si l'état a changé
    if (!spriteSheet || spriteSheet.src !== charData.src) {
        spriteSheet = new Image();
        spriteSheet.src = charData.src;
    }
    // Définir la vitesse d'animation pour alterner les frames
    let now = Date.now();
    if (now - lastUpdateTime > animationSpeed) {
        currentFrame = (currentFrame + 1) % stateAnimation.frameCount;  // Passer à la frame suivante
        lastUpdateTime = now;
    }
    // frameCount = charData[state].frameCount;
    // Calculer la position de la frame actuelle dans la sprite sheet
    sourceX = (currentFrame * charData.frameWidth) + stateAnimation.x;
    sourceY = 0 + stateAnimation.y;
    // Dessiner la frame actuelle sur le canvas
    ctx.clearRect(x, y, charData.frameWidth, charData.frameHeight);  // Effacer l'emplacement précédent
    ctx.drawImage(
        spriteSheet,
        sourceX, sourceY, charData.frameWidth, charData.frameHeight,  // Découpe de la frame
        x, y, charData.frameWidth, charData.frameHeight               // Position de la frame sur le canvas
    );
}



// Player - ability
function drawAbility(ability, x, y) {
    flavors = {
        "Attaque physique": {
            color: UI_COLORS.abilities.physicAttack,
            textColor: UI_COLORS.text.dark,
        },
        "Attaque magique": {
            color: UI_COLORS.abilities.magicAttack,
            textColor: UI_COLORS.text.dark
        }
    };
    // -- BOX --
    size = {
        w: 50,
        h: 30
    }
    // Shadow
    ctx.fillStyle = UI_COLORS.shadow;  // Fond noir semi-transparent
    ctx.fillRect(x - (size.w / 2) + UI_CONFIG.shadowpad,
        y - (size.h / 2) + UI_CONFIG.shadowPad, size.w, size.h);
    // main
    ctx.fillStyle = flavors[ability.flavor].color;
    ctx.fillRect(x - (size.w / 2), y - (size.h / 2), size.w, size.h);
    // --- TEXT -- 

    ctx.textAlign = "center";
    ctx.font = UI_FONTS.getFont("medium", "primary");
    // shadow
    ctx.fillStyle = UI_COLORS.shadow
    ctx.fillText(ability.name,
        x + UI_CONFIG.shadowPad,
        y + 10 + UI_CONFIG.shadowPad);
    // main
    ctx.fillStyle = flavors[ability.flavor].textColor
    ctx.fillText(ability.name, x, y + 10);

    console.log(ctx.fillStyle);


    //// Work IN Progress
}