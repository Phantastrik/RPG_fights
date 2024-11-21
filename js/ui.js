const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.width = CANVAS_DIMENSIONS.width;
ctx.height = CANVAS_DIMENSIONS.height;
ctx.font = "10px verdana";
ctx.textAlign = "left";
// Variables pour le chargement de l'image et l'animation
let spriteSheet;
let animationSpeed = 100;  // Vitesse d'animation en millisecondes


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
function drawHealthBar(x, y, w, h, player) {
    let ratio = player.pv / player.pvMax;
    ratio = Math.floor(ratio * w);
    drawBox(x - 1, y - 1, w + 2, h + 2, UI_COLORS.light);  // Cadre
    drawBox(x, y, ratio, h, UI_COLORS.stats.pv.primary);  // Barre de santé
    // texte
    let barText = "" + player.pv + " / " + player.pvMax
    ctx.textAlign = "center";
    drawShadowedText(barText, x + (w / 2), y + (h / 2) + 3, 1, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("small", "secondary"));
}

function drawManaBar(x, y, w, h, player) {
    let ratio = player.pm / player.pmMax;
    ratio = Math.floor(ratio * w);
    drawBox(x - 1, y - 1, w + 2, h + 2, UI_COLORS.light);  // Cadre 
    drawBox(x, y, ratio, h, UI_COLORS.stats.pm.primary);  // Barre de mana
    // texte
    let barText = "" + player.pm + " / " + player.pmMax
    ctx.textAlign = "center";
    drawShadowedText(barText, x + (w / 2), y + (h / 2) + 3, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("small", "secondary"));
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
    pos = grid.pos(-1, -1);
    drawPanel(pos.x, pos.y, 27, 3);
    // texte 
    pos = grid.pos(16, 1);

    ctx.testAlign = "center";
    drawShadowedText(text, grid.x_center, pos.y, 2,
        UI_COLORS.shadow,
        UI_COLORS.text.light,
        UI_FONTS.getFont("big", "primary"));
}

function drawCharacterSelectionSelected(text, x, y) {
    // panneau de fond
    pos = grid.pos(x, y);

    //console.log(pos);
    drawPanel(pos.x, pos.y, 5, 2, "secondary");
    ctx.textAlign = "center";
    pos = grid.pos(x + 2.5, y + 1.3);
    drawShadowedText(text, pos.x, pos.y, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("big", "primary"));
}
// box avec image
function drawPanel(x, y, width, height, color = "primary") {
    // chargement de lm'image si nécessaire
    if (!frameSheet_data[color].img || frameSheet_data[color].img.src !== frameSheet_data[color].src) {
        frameSheet_data[color].img = new Image();
        frameSheet_data[color].img.src = frameSheet_data[color].src;
    }
    for (let i = 0; i < width; i++) {

        for (let j = 0; j < height; j++) {

            let key1 = "";
            if (j == 0) {
                key1 = "top";
            } else {
                if (j === (height - 1)) {
                    key1 = "bottom";
                } else {
                    key1 = "middle";
                }
            }
            let key2 = "";
            if (i == 0) {
                key2 = "_left";
            } else {
                if (i === (width - 1)) {
                    key2 = "_right";
                }
            }
            // console.log(width-1);
            let key = key1 + key2;
            let pane = frameSheet_data.elements.panel[key];
            let posx = x + i * frameSheet_data.cellSize;
            let posy = y + j * frameSheet_data.cellSize;

            ctx.drawImage(frameSheet_data[color].img,
                pane.x * frameSheet_data.cellSize,
                pane.y * frameSheet_data.cellSize,
                frameSheet_data.cellSize, frameSheet_data.cellSize,
                posx, posy,
                frameSheet_data.cellSize, frameSheet_data.cellSize);

        }
    }
}
// box avec image
function drawPane(x, y,color = "primary") {
    let pane = frameSheet_data.elements.pane;
    console.log([x,y])
    ctx.drawImage(frameSheet_data[color].img,
        pane.x * frameSheet_data.cellSize,
        pane.y * frameSheet_data.cellSize,
        frameSheet_data.cellSize, frameSheet_data.cellSize,
        x, y,
        frameSheet_data.cellSize, frameSheet_data.cellSize);
}
function drawKey(x,y,label){
    drawPane(x,y,"secondary");
   // pos = grid.pos(x,y)
    drawShadowedText(label, x, y, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("small", "primary"));
}

/** ========== Affichage des Stages ========== **/
function drawStagesSideBar() {
    // fond 
    pos = grid.pos(20, -1);
    drawPanel(pos.x, pos.y, 6, grid.y_subdivision + 2, "secondary");
    // etages
    runState.stages.forEach((stage, i) => {
        const pad = 10;
        pos = grid.pos(20, 2 * i);
        dim = grid.pos(5, 1);
        // drawBox(pos.x+pad, pos.y+pad*(i+1), dim.x, dim.y, UI_COLORS.primary);
        drawPanel(pos.x + pad, pos.y + pad, 5, 2, "primary");
        pos = grid.pos(21, 2 * i);
        ctx.textAlign = "left";
        drawShadowedText(stage.type, pos.x + (pad), pos.y + pad + grid.cell_height, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("big", "primary"));
    });

}
function drawStagesScreenHeader() {
    // panneau fond 
    let nextStage = runState.stages[runState.currentStage];
    pos = grid.pos(-1, -1);
    drawPanel(pos.x, pos.y, 27, 3, "primary");
    // title
    let stageCur = runState.currentStage + 1;
    let stageTotal = runState.maxStageNumber + 1;
    let screenTitle = "Stage " + stageCur + "/" + stageTotal + " : ";
    if (nextStage.type === "fight") {
        screenTitle += "Fight against " + nextStage.enemy.name;
    } else if (nextStage.type === "event") {
        screenTitle += "Event : " + nextStage.name;
    }
    pos = grid.pos(2, 1);
    ctx.textAlign = "left";
    drawShadowedText(screenTitle, pos.x, pos.y, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("big", "primary"));
}

/** ========== Affichage des Personnages ========== **/
function drawCharacter(charData, x, y, state, stateVariant) {
    const stateAnimation = stateVariant !== undefined ? charData[state][stateVariant] : charData[state];

    if (!spriteSheet || spriteSheet.src !== charData.src) {
        spriteSheet = new Image();
        spriteSheet.src = charData.src;
    }

    const now = Date.now();
    if (now - charData.lastUpdateTime > animationSpeed) {
        charData.currentFrame = (charData.currentFrame + 1) % stateAnimation.frameCount;
        charData.lastUpdateTime = now;
    }

    const sourceX = charData.currentFrame * charData.frameWidth + stateAnimation.x;
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
function drawMonster(name, x, y, state, stateVariant) {
    // prise en charge de la variante pour les attaques
    const stateAnimation = stateVariant !== undefined ? monster_spritesheet_data[name][state][stateVariant] : monster_spritesheet_data[name][state];

    // récupération des filenames des source images
    let img_filename = monster_spritesheet_data[name].img === null ? { src: '' } : monster_spritesheet_data[name].img.src.substring(monster_spritesheet_data[name].img.src.lastIndexOf('/') + 1);
    let src_filename = monster_spritesheet_data[name].src.substring(monster_spritesheet_data[name].src.lastIndexOf('/') + 1);

    // déclartation de l'image si elle n'est pas chargée
    if (monster_spritesheet_data[name].img === null || img_filename !== src_filename) {
        monster_spritesheet_data[name].img = new Image();
        monster_spritesheet_data[name].img.src = monster_spritesheet_data[name].src;
    }
    // timing de l'animation
    const now = Date.now();
    if (now - monster_spritesheet_data[name].lastUpdateTime > animationSpeed) {
        monster_spritesheet_data[name].currentFrame = (monster_spritesheet_data[name].currentFrame + 1) % stateAnimation.frameCount;
        monster_spritesheet_data[name].lastUpdateTime = now;


    }
    // prise en charge d'un crop pour les sprites
    const sourceX = monster_spritesheet_data[name].currentFrame * monster_spritesheet_data[name].frameWidth + stateAnimation.x;
    const sourceY = stateAnimation.y;

    ctx.clearRect(x, y, monster_spritesheet_data[name].frameWidth - monster_spritesheet_data[name].xcrop,
        monster_spritesheet_data[name].frameHeight - monster_spritesheet_data[name].ycrop);
    ctx.drawImage(monster_spritesheet_data[name].img,
        sourceX + monster_spritesheet_data[name].xcrop,
        sourceY + monster_spritesheet_data[name].ycrop,
        (monster_spritesheet_data[name].frameWidth - monster_spritesheet_data[name].xcrop),
        monster_spritesheet_data[name].frameHeight - monster_spritesheet_data[name].ycrop,
        x, y,
        (monster_spritesheet_data[name].displayWidth - monster_spritesheet_data[name].xcrop),
        monster_spritesheet_data[name].displayHeight - monster_spritesheet_data[name].ycrop);
}

/** ========== Affichage des Abilities ========== **/
const abilities_sizing = {
    w: 150,
    h: 40
}
function drawAbility(ability, x, y) {
    const flavorConfig = {
        "Attaque physique": { color: UI_COLORS.abilities.physicAttack, textColor: UI_COLORS.text.light },
        "Attaque magique": { color: UI_COLORS.abilities.magicAttack, textColor: UI_COLORS.text.dark },
        "spell": { color: UI_COLORS.abilities.spell, textColor: UI_COLORS.text.dark },
    };
    dim = grid.pos(1,0);
    drawKey(x-abilities_sizing.w / 2-dim.x, y - abilities_sizing.h / 2, "Q");
    drawKey(x+abilities_sizing.w / 2+dim.x, y - abilities_sizing.h / 2, "D");
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
    pos = grid.pos(x, y);

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

// -------------- stat bar ----
function drawStatsBar(x, y, character, reverse = false, minimal = false) {
    const stats = {
        niveau: {
            label: `Lvl. ${character.niveau}`, width: 1.5, color: UI_COLORS.stats.lvl.primary, ratio: null, minimal: true,
            modified_value: character.modifiedStats.niveau, value: character.niveau,
            modifiable: false
        },
        pv: {
            label: `PV ${character.modifiedStats.pv}/${character.modifiedStats.pvMax}`, width: 4, color: UI_COLORS.stats.pv.secondary,
            ratio: character.pv / character.pvMax, color_ratio: UI_COLORS.stats.pv.primary, minimal: true,
            modifiable: true
        },
        pm: {
            label: `PM ${character.modifiedStats.pm}/${character.modifiedStats.pmMax}`, width: 4, color: UI_COLORS.stats.pm.secondary,
            ratio: character.pm / character.pmMax, color_ratio: UI_COLORS.stats.pm.primary, minimal: true,
            modifiable: true
        },
        attaque: {
            label: `ATT ${character.modifiedStats.attaque}`, width: 2, color: UI_COLORS.stats.attaque.primary, ratio: null, minimal: false,
            modifiable: true
        },
        defense: {
            label: `DEF ${character.modifiedStats.defense}`, width: 2, color: UI_COLORS.stats.defense.primary, ratio: null, minim1al: false,
            modifiable: true
        },
        sagesse: {
            label: `SAG ${character.modifiedStats.sagesse}`, width: 2, color: UI_COLORS.stats.sagesse.primary, ratio: null, minimal: false,
            modifiable: true
        },
        vitesse: {
            label: `VIT ${character.modifiedStats.vitesse}`, width: 2, color: UI_COLORS.stats.vitesse.primary, ratio: null, minimal: false,
            modifiable: true
        },
    };

    // Calcul de la largeur totale si reverse
    let totalWidth = 0;
    if (reverse) {
        for (const [key, stat] of Object.entries(stats)) {
            totalWidth += stat.width;
        }
    }

    let offsetX = reverse ? 0 : 0; // Départ à gauche ou à droite
    // stats.forEach(stat => {
    for (const [key, stat] of Object.entries(stats)) {
        if (!minimal || (minimal && stat.minimal)) {
            // console.log(stat.modified_value-stat.value);

            offsetX = reverse ? offsetX - stat.width : offsetX;
            const dim = grid.pos(stat.width, 1);
            const pos = grid.pos(x + offsetX, y);

            // Dessiner la boîte de fond
            drawBox(pos.x, pos.y, dim.x, dim.y, stat.color);

            // Dessiner la boîte de ratio si applicable
            if (stat.ratio !== null) {
                drawBox(pos.x, pos.y, Math.floor(dim.x * stat.ratio), dim.y, stat.color_ratio);
            }
            let valmod = 0;
            // stat.modifiable ? character.modifiedStats[key] : character[key];
            if (character.modifiedStats[key] - character[key] !== 0) {
                valmod = character.modifiedStats[key] - character[key];
            }

            // Dessiner le texte centré
            ctx.textAlign = "center";
            drawShadowedText(
                stat.label,
                pos.x + dim.x / 2,
                pos.y + dim.y / 2,
                UI_CONFIG.shadowPad,
                UI_COLORS.shadow,
                valmod == 0 ? UI_COLORS.text.light :
                    valmod < 0 ? UI_COLORS.text.danger : UI_COLORS.text.sucess,
                UI_FONTS.getFont("small", "secondary")
            );

        }

        // Avancer horizontalement
        offsetX += reverse ? 0 : stat.width;
    }
};


function setBackground(bg) {
    canvas.style.background = bg;
    canvas.style.backgroundSize = ctx.width + "px";
}
