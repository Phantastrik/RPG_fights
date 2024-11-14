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
let spriteSource = {
    warrior: {
        frameWidth: 256,
        frameHeight: 256,
        displayWidth : 256,
        displayHeight : 256,
        xcrop : 75,
        ycrop : 75,
        src: `../assets/player/warrior_sprite.png`,
        walk: { x: 0, y: 0, frameCount: 8, },
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
        displayWidth : 256,
        displayHeight : 256,
        xcrop : 75,
        ycrop : 75,
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
        displayWidth : 256,
        displayHeight : 256,
        xcrop : 75,
        ycrop : 75,
        src: `../assets/player/mage_sprite.png`,
        walk: { x: 0, y: 256, frameCount: 7 },
        run: { x: 0, y: 512, frameCount: 8 },
        attaques: [
            { x: 0, y: 768, frameCount: 7 },
            { x: 0, y: 1024, frameCount: 9 },
            { x: 0, y: 1280, frameCount: 16 }
        ]
    }
};

/** ========== Utilitaires ========== **/
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawShadowedText(  text, x, y, shadowOffset = UI_CONFIG.shadowPad,
                            shadowColor = UI_COLORS.shadow,
                            textColor = UI_COLORS.text.dark,
                            font = UI_FONTS.getFont("small", "primary")) {
    ctx.font = font;
    ctx.fillStyle = shadowColor;
    ctx.fillText(text, x + shadowOffset, y + shadowOffset);
    ctx.fillStyle = textColor;
    ctx.fillText(text, x, y);
}
function drawText( text, x, y, 
                    textColor = UI_COLORS.text.dark,
                    font = UI_FONTS.getFont("small", "primary")){
    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.fillText(text, x, y);
}

function drawBox(   x, y, width, height, color = UI_COLORS.primary ,
                    shadowOffset = UI_CONFIG.shadowPad,
                    shadowColor = UI_COLORS.shadow) {
    ctx.fillStyle = shadowColor;
    ctx.fillRect(x + shadowOffset, y + shadowOffset, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}


/** ========== Barre de Statistiques du Joueur ========== **/
function drawHealthBar(hb) {
    drawBox(hb.x - 1, hb.y - 1, hb.l + 2, hb.h + 2, UI_COLORS.light);  // Cadre
    drawBox(hb.x, hb.y, hb.lval, hb.h, UI_COLORS.stats.pv.primary);  // Barre de santé
}

function drawManaBar(mb) {
    drawBox(mb.x - 1, mb.y - 1, mb.l + 2, mb.h + 2, UI_COLORS.light);  // Cadre
    drawBox(mb.x, mb.y, mb.lval, mb.h, UI_COLORS.stats.pm.primary);  // Barre de mana
}


/** ========== Affichage des Informations du Joueur ========== **/
function drawPlayerStats(x, y) {
    const player = runState.player;
    const stats = [
        `name: ${player.name}`,
        `niveau: ${player.niveau}`,
        `pv: ${player.pv} / ${player.pvMax}`,
        `pm: ${player.pm} / ${player.pmMax}`,
        `attaque: ${player.attaque}`,
        `defense: ${player.defense}`,
        `sagesse: ${player.sagesse}`,
        `vitesse: ${player.vitesse}`,
        `exp: ${player.exp} / ${player.baseExp}`
    ];
    const lineHeight = 21, padding = 10;

    drawBox(x, y, 120, stats.length * lineHeight + padding * 2, UI_COLORS.light);

    stats.forEach((text, index) => {
        drawShadowedText(text, x + padding, y + padding + (index + 1) * lineHeight);
    });
}


/** ========== Interface de Sélection de Personnage ========== **/
function headerGUI(text) {
    drawBox(10, 10, ctx.width - 20, 75, UI_COLORS.primary);
    drawShadowedText(text, ctx.width / 2, 50, 2,
                    UI_COLORS.shadow,
                    UI_COLORS.text.dark,
                    UI_FONTS.getFont("big", "primary"));
}

function drawCharacterSelectionSelected(text, x, y) {
    drawBox(x - 100, y - 30, 200, 60, UI_COLORS.secondary);
    drawShadowedText(text, x, y + 10, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("big", "primary"));
}



/** ========== Affichage des Stages ========== **/
function drawStagesSideBar() {
    const SSBpad = 10;
    const SSB = {
        x: Math.floor(ctx.width / 4) * 3 + SSBpad,
        y: SSBpad,
        w: Math.floor(ctx.width / 4) - (2 * SSBpad),
        h: ctx.height - (2 * SSBpad),
        stages: []
    };
    
    runState.stages.forEach((stage, i) => {
        const pad = 3, height = 20;
        SSB.stages.push({
            x: SSB.x + pad,
            y: SSB.y + pad + (height + pad) * i,
            text: `${stage.stageNumber} ${stage.type === "event" ? stage.type + " " + stage.name : stage.type}`,
            width: SSB.w - (pad * 2),
            height,
            color: stage.done ? UI_COLORS.primary : UI_COLORS.secondary
        });
    });

    drawBox(SSB.x, SSB.y, SSB.w, SSB.h, UI_COLORS.primary);
    SSB.stages.forEach(stage => {
        drawBox(stage.x, stage.y, stage.width, stage.height, stage.color);
        drawShadowedText(stage.text, stage.x + 10, stage.y + stage.height / 2 + 5, 1, UI_COLORS.shadow, UI_COLORS.text.light);
    });
}

/** ========== Affichage des Personnages ========== **/
function drawCharacter(charData,  x, y, state, stateVariant) {
    const stateAnimation = stateVariant !== undefined ? charData[state][stateVariant] : charData[state];

    if (!spriteSheet || spriteSheet.src !== charData.src) {
        spriteSheet = new Image();
        spriteSheet.src = charData.src;
    }

    const now = Date.now();
    if (now - lastUpdateTime > animationSpeed) {
        currentFrame = (currentFrame + 1) % stateAnimation.frameCount;
        lastUpdateTime = now;
    }

    const sourceX = currentFrame * charData.frameWidth + stateAnimation.x;
    const sourceY = stateAnimation.y;
        
    ctx.clearRect(x, y, charData.frameWidth-charData.xcrop,
         charData.frameHeight-charData.ycrop);
    ctx.drawImage(spriteSheet, 
        sourceX + charData.xcrop,
        sourceY + charData.ycrop,
        charData.frameWidth -charData.xcrop,
        charData.frameHeight -charData.ycrop,
        x, y, 
        charData.displayWidth -charData.xcrop,
        charData.displayHeight -charData.ycrop);
}


/** ========== Affichage des Abilities ========== **/
const abilities_sizing = {
    w:150,
    h:40
}
function drawAbility(ability, x, y) {
    const flavorConfig = {
        "Attaque physique": { color: UI_COLORS.abilities.physicAttack, textColor: UI_COLORS.text.light },
        "Attaque magique": { color: UI_COLORS.abilities.magicAttack, textColor: UI_COLORS.text.dark }
    };


    drawBox(x - abilities_sizing.w/2, y - abilities_sizing.h/2, abilities_sizing.w, abilities_sizing.h, flavorConfig[ability.flavor].color);
    ctx.textAlign = "center";
    drawShadowedText(ability.name, x, y,
        UI_CONFIG.shadowPad,
        UI_COLORS.shadow,
        UI_COLORS.text.light,
        UI_FONTS.getFont("small", "primary"));
    drawText(("PM:"+ability.pm_cost+"/ base damage : "+ability.basic_damage), x, y+13,
        UI_COLORS.text.medium,
        UI_FONTS.getFont("tiny", "secondary"));
}
function drawCharacterAbilities(character_to_draw,x,y){
    drawBox(x - abilities_sizing.w/2,
            y - abilities_sizing.h/2,
            abilities_sizing.w,
            abilities_sizing.h,
            UI_COLORS.primary);
    drawShadowedText("Abilities", x, y,
        UI_CONFIG.shadowPad,
        UI_COLORS.shadow,
        UI_COLORS.text.light,
        UI_FONTS.getFont("medium", "primary"));     
    ctx.textAlign = "center";
    let i = 1;
    character_to_draw.abilities.forEach(element => {
        drawAbility(element,x,y+(i*(abilities_sizing.h+2)));
        i++;
    });
}
