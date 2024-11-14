const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.width = CANVAS_DIMENSIONS.width;
ctx.height = CANVAS_DIMENSIONS.height;
ctx.font = "10px verdana";
ctx.textAlign = "left";
// Variables pour le chargement de l'image et l'animation
let spriteSheet;
let frameSheet;
let currentFrame = 0; // Nombre total de frames dans la sprite sheet
let animationSpeed = 100;  // Vitesse d'animation en millisecondes
let lastUpdateTime = 0;


/** ========== Utilitaires ========== **/
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawShadowedText(text, x, y, shadowOffset = UI_CONFIG.shadowPad,
    shadowColor = UI_COLORS.shadow,
    textColor = UI_COLORS.text.dark,
    font = UI_FONTS.getFont("small", "primary")) {
    ctx.font = font;
    ctx.fillStyle = shadowColor;
    ctx.fillText(text, x + shadowOffset, y + shadowOffset);
    ctx.fillStyle = textColor;
    ctx.fillText(text, x, y);
}
function drawText(text, x, y,
    textColor = UI_COLORS.text.dark,
    font = UI_FONTS.getFont("small", "primary")) {
    ctx.font = font;
    ctx.fillStyle = textColor;
    ctx.fillText(text, x, y);
}

function drawBox(x, y, width, height, color = UI_COLORS.primary,
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
    // panneau de fond
    pos = grid.pos(-1,-1);
    drawPanel(pos.x,pos.y,27,3);
    // texte 
    pos = grid.pos(16,4);
    ctx.testAlign = "center";
    drawShadowedText(text, pos.x, pos.y, 2,
        UI_COLORS.shadow,
        UI_COLORS.text.light,
        UI_FONTS.getFont("big", "primary"));
}

function drawCharacterSelectionSelected(text, x, y) {
    //drawBox(x - 100, y - 30, 200, 60, UI_COLORS.secondary);
    // panneau de fond
    pos = grid.pos(x,y);
    //console.log(pos);
    drawPanel(pos.x,pos.y,5,2,"secondary");
    ctx.textAlign = "center";
    pos = grid.pos(x+3,y+3);
    drawShadowedText(text, pos.x, pos.y, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("big", "primary"));
}
// box avec image
function drawPanel(x,y,width,height,color = "primary"){
    // chargement de lm'image si nécessaire
    if (!frameSheet || frameSheet.src !== frameSheet_data.src[color]) {
        frameSheet = new Image();
        frameSheet.src = frameSheet_data.src[color];
    }
    for (let i = 0; i < width; i++) {
        
        for (let j=0; j<height; j++) {
            
            let key1 = "";
            if(j==0){
                key1 = "top";
            }else{
                if(j===(height-1)){
                    key1 = "bottom"; 
                }else{
                    key1 = "middle";
                }
            }
            let key2 = "";
            if(i==0){
                key2 = "_left";
            }else{
                if(i===(width-1)){
                    key2 = "_right"; 
                }
            }
            // console.log(width-1);
            let key = key1 + key2;           
            let pane = frameSheet_data.elements.panel[key];
            let posx = x + i*frameSheet_data.cellSize;
            let posy = y + j*frameSheet_data.cellSize; 

            ctx.drawImage(frameSheet,
                pane.x*frameSheet_data.cellSize,
                pane.y*frameSheet_data.cellSize,
                frameSheet_data.cellSize, frameSheet_data.cellSize,
                posx, posy,
                frameSheet_data.cellSize, frameSheet_data.cellSize);

        }

        
    }
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
function drawCharacter(charData, x, y, state, stateVariant) {
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

    ctx.clearRect(x, y, charData.frameWidth - charData.xcrop,
        charData.frameHeight - charData.ycrop);
    ctx.drawImage(spriteSheet,
        sourceX + charData.xcrop,
        sourceY + charData.ycrop,
        charData.frameWidth - charData.xcrop,
        charData.frameHeight - charData.ycrop,
        x, y,
        charData.displayWidth - charData.xcrop,
        charData.displayHeight - charData.ycrop);
}


/** ========== Affichage des Abilities ========== **/
const abilities_sizing = {
    w: 150,
    h: 40
}
function drawAbility(ability, x, y) {
    const flavorConfig = {
        "Attaque physique": { color: UI_COLORS.abilities.physicAttack, textColor: UI_COLORS.text.light },
        "Attaque magique": { color: UI_COLORS.abilities.magicAttack, textColor: UI_COLORS.text.dark }
    };

    drawBox(x - abilities_sizing.w / 2, y - abilities_sizing.h / 2, abilities_sizing.w, abilities_sizing.h, flavorConfig[ability.flavor].color);
    ctx.textAlign = "center";
    drawShadowedText(ability.name, x, y,
        UI_CONFIG.shadowPad,
        UI_COLORS.shadow,
        UI_COLORS.text.light,
        UI_FONTS.getFont("small", "primary"));
    drawText(("PM:" + ability.pm_cost + "/ base damage : " + ability.basic_damage), x, y + 13,
        UI_COLORS.text.medium,
        UI_FONTS.getFont("tiny", "secondary"));
}
function drawCharacterAbilities(character_to_draw, x, y) {
    pos = grid.pos(x,y);
    
    drawBox(pos.x - abilities_sizing.w / 2,
        pos.y - abilities_sizing.h / 2,
        abilities_sizing.w,
        abilities_sizing.h,
        UI_COLORS.primary);
    ctx.textAlign = "center";
    drawShadowedText("Abilities", pos.x, pos.y,
        UI_CONFIG.shadowPad,
        UI_COLORS.shadow,
        UI_COLORS.text.light,
        UI_FONTS.getFont("medium", "primary"));
    
    let i = 1;
    character_to_draw.abilities.forEach(element => {
        drawAbility(element, pos.x, pos.y + (i * (abilities_sizing.h + 2)));
        i++;
    });
}
