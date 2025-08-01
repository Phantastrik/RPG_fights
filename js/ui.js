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
function headerGUI(text, subText) {
    // panneau de fond
    pos = grid.pos(-1, -1);
    dim = grid.pos(27, 2.5);
    drawBox(pos.x, pos.y, dim.x, dim.y, UI_COLORS.primary, UI_CONFIG.shadowPad, UI_COLORS.shadowColor);
    // texte 
    pos = grid.pos(16, 0.75);

    ctx.testAlign = "center";
    drawShadowedText(text, grid.x_center, pos.y, 2,
        UI_COLORS.shadow,
        UI_COLORS.text.light,
        UI_FONTS.getFont("big", "primary"));

    pos = grid.pos(16, 1.4);

    ctx.testAlign = "center";
    drawShadowedText(subText, grid.x_center, pos.y, 2,
        UI_COLORS.shadow,
        UI_COLORS.text.light,
        UI_FONTS.getFont("small", "secondary"));
}

function drawCharacterSelectionSelected(text, x, y) {
    // panneau de fond
    pos = grid.pos(x, y);

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
            if (height > 1) { // si c'est une ligne pas de position verticale
                if (j == 0) {
                    key1 = "top";
                } else {
                    if (j === (height - 1)) {
                        key1 = "bottom";
                    } else {
                        key1 = "middle";
                    }
                }
            }

            let key2 = "";
            if (i == 0) {
                key2 = "left";
            } else {
                if (i === (width - 1)) {
                    key2 = "right";
                } else {
                    // cas pour une simple ligne
                    // if(height === 1){
                    key2 = "center"
                    // }
                }
            }
            let key;
            if (height > 1) {
                key = key1 + '_' + key2;
            } else {
                key = key2;
            }
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
function drawPane(x, y, color = "primary") {
    if (!frameSheet_data[color].img || frameSheet_data[color].img.src !== frameSheet_data[color].src) {
        frameSheet_data[color].img = new Image();
        frameSheet_data[color].img.src = frameSheet_data[color].src;
    }

    let pane = frameSheet_data.elements.pane;
    ctx.drawImage(frameSheet_data[color].img,
        pane.x * frameSheet_data.cellSize,
        pane.y * frameSheet_data.cellSize,
        frameSheet_data.cellSize, frameSheet_data.cellSize,
        x, y,
        frameSheet_data.cellSize, frameSheet_data.cellSize);
}
function drawKey(x, y, label) {
    drawPanel(x, y, "secondary");
    // pos = grid.pos(x,y)
    drawShadowedText(label, x + frameSheet_data.frameWidth / 2, y + frameSheet_data.frameHeight / 2 + 2, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("small", "primary"));
}
// icon 
function drawIcon(x, y, icon, sizing = 1) {
    if (!UI_ICONS.img || UI_ICONS.img.src !== UI_ICONS.src) {
        UI_ICONS.img = new Image();
        UI_ICONS.img.src = UI_ICONS.src;
    }


    ctx.drawImage(UI_ICONS.img,
        icon.x * UI_ICONS.cellSize,
        icon.y * UI_ICONS.cellSize,
        UI_ICONS.cellSize, UI_ICONS.cellSize,
        x, y,
        UI_ICONS.cellSize * sizing, UI_ICONS.cellSize * sizing);
}
function drawEffect(x, y, effect, drawPermanent = false, selected = false) {
    if (!effect.permanent || drawPermanent) {

        let stats = {
            pvMax_modifier: { icon: UI_ICONS.elements.pvMax },
            pv_modifier: { icon: UI_ICONS.elements.pv },
            pmMax_modifier: { icon: UI_ICONS.elements.pmMax },
            pm_modifier: { icon: UI_ICONS.elements.pm },
            attaque_modifier: { icon: UI_ICONS.elements.attaque },
            defense_modifier: { icon: UI_ICONS.elements.defense },
            sagesse_modifier: { icon: UI_ICONS.elements.sagesse },
            vitesse_modifier: { icon: UI_ICONS.elements.vitesse }
        }
        let i = 0;
        for (const [key, value] of Object.entries(effect.modifier)) {
            if (value != 0) {
                let j = 0;
                // longueur du bandeau
                let boxWidth = 3;
                // if (effect.permanent) { boxWidth--; }
                let modifierPad = i * boxWidth * UI_ICONS.cellSize;
                // panneau de fond
                drawPanel(x + (modifierPad) + j * UI_ICONS.cellSize,
                    y, boxWidth, 1,
                    selected ? "primary" : "secondary"
                )

                // icone de la stat
                drawIcon(x + (modifierPad) + j * UI_ICONS.cellSize, y, stats[key].icon);
                j++;
                // couleur positif / negatif
                let colorValue = UI_COLORS.text.light;
                if (value < 0) {
                    colorValue = UI_COLORS.text.danger;
                }
                if (value > 0) {
                    colorValue = UI_COLORS.text.sucess
                }
                // valeur modifier 
                ctx.textAlign = "left";
                drawShadowedText(value,
                    x + (modifierPad) + j * UI_ICONS.cellSize,
                    y + UI_ICONS.cellSize / 1.5,
                    2, UI_COLORS.shadow,
                    colorValue, UI_FONTS.getFont("small", "secondary"));
                j += 0.5;
                // si l'effet est permanent, on ne dessine pas le timer
                //permanence
                if (effect.permanent) {
                    j += 0.5
                    drawIcon(x + (modifierPad) + j * UI_ICONS.cellSize, y, UI_ICONS.elements.permanent);
                } else {
                    // duration icon
                    drawIcon(x + (modifierPad) + j * UI_ICONS.cellSize, y, UI_ICONS.elements.time);
                    j++
                    // duration text
                    drawShadowedText(effect.duration,
                        x + (modifierPad) + j * UI_ICONS.cellSize,
                        y + UI_ICONS.cellSize / 1.5,
                        2, UI_COLORS.shadow,
                        UI_COLORS.text.light, UI_FONTS.getFont("small", "secondary"));
                    j++
                }

                i = (i + 1) % 3;


            }
        }

    }

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
    dim = grid.pos(27,2);
    // drawPanel(pos.x, pos.y, 27, 3, "primary");
    drawBox(pos.x,pos.y,dim.x,dim.y,UI_COLORS.primary,UI_CONFIG.shadowPad,UI_COLORS.shadow);
   // icon 
    pos = grid.pos(1, 0);
    drawIcon(pos.x, pos.y, UI_ICONS.elements[nextStage.type], 1);

    // title
    let stageCur = runState.currentStage + 1;
    let screenTitle = "Stage " + stageCur;
    if (nextStage.type === "fight") {
        // rien
    } else if (nextStage.type === "event") {
        screenTitle += ` ${nextStage.name}`;
    }
    pos = grid.pos(3, 0.75);
    ctx.textAlign = "left";
    drawShadowedText(screenTitle, pos.x, pos.y, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("medium", "primary"));
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
function drawAbility(ability, x, y, disabled = false) {
    const flavorConfig = {
        "Attaque physique": { color: UI_COLORS.abilities.physicAttack, textColor: UI_COLORS.text.light },
        "Attaque magique": { color: UI_COLORS.abilities.magicAttack, textColor: UI_COLORS.text.dark },
        "spell": { color: UI_COLORS.abilities.spell, textColor: UI_COLORS.text.dark },
    };
    dim = grid.pos(1, 0);
    drawBox(x - abilities_sizing.w / 2, y - abilities_sizing.h / 2, abilities_sizing.w, abilities_sizing.h,
        disabled ? UI_COLORS.disabled : flavorConfig[ability.flavor].color);
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
            label: `${character.name} (Lvl. ${character.niveau})`, width: 4, color: UI_COLORS.stats.lvl.primary, ratio: null, minimal: true,
            modified_value: character.modifiedStats.niveau, value: character.niveau,
            modifiable: false, icon: null, textPad: -20
        },
        pv: {
            label: `${character.modifiedStats.pv}/${character.modifiedStats.pvMax}`, width: 4, color: UI_COLORS.stats.pv.secondary,
            ratio: character.modifiedStats.pv / character.modifiedStats.pvMax, color_ratio: UI_COLORS.stats.pv.primary, minimal: true,
            modifiable: true, icon: UI_ICONS.elements.pv, textPad: 0
        },
        pm: {
            label: `${character.modifiedStats.pm}/${character.modifiedStats.pmMax}`, width: 4, color: UI_COLORS.stats.pm.secondary,
            ratio: character.modifiedStats.pm / character.modifiedStats.pmMax, color_ratio: UI_COLORS.stats.pm.primary, minimal: true,
            modifiable: true, icon: UI_ICONS.elements.pm, textPad: 0
        },
        attaque: {
            label: `${character.modifiedStats.attaque}`, width: 2, color: UI_COLORS.stats.attaque.primary, ratio: null, minimal: false,
            modifiable: true, icon: UI_ICONS.elements.attaque, textPad: 0
        },
        defense: {
            label: `${character.modifiedStats.defense}`, width: 2, color: UI_COLORS.stats.defense.primary, ratio: null, minim1al: false,
            modifiable: true, icon: UI_ICONS.elements.defense, textPad: 0
        },
        sagesse: {
            label: `${character.modifiedStats.sagesse}`, width: 2, color: UI_COLORS.stats.sagesse.primary, ratio: null, minimal: false,
            modifiable: true, icon: UI_ICONS.elements.sagesse, textPad: 0
        },
        vitesse: {
            label: `${character.modifiedStats.vitesse}`, width: 2, color: UI_COLORS.stats.vitesse.primary, ratio: null, minimal: false,
            modifiable: true, icon: UI_ICONS.elements.vitesse, textPad: 0
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
            if (stat.icon !== null) {
                drawIcon(pos.x, pos.y, stat.icon);
            }

            // Dessiner le texte centré
            ctx.textAlign = "center";
            drawShadowedText(
                stat.label,
                pos.x + dim.x / 1.5 + stat.textPad,
                pos.y + dim.y / 1.5,
                UI_CONFIG.shadowPad,
                UI_COLORS.shadow,
                valmod == 0 ? UI_COLORS.text.light :
                    valmod < 0 ? UI_COLORS.text.danger : UI_COLORS.text.sucess,
                UI_FONTS.getFont("medium", "secondary")
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

function drawControlsHint(x, y) {
    dim = grid.pos(4, controls.length * 0.5 + 1);
    drawBox(x, y, dim.x, dim.y, UI_COLORS.light_alpha, 2, UI_COLORS.transparent);
    //
    let i = 0.5;
    ctx.textAlign = "left";
    pad = grid.pos(0.2, i);
    drawShadowedText("Controls:", x + pad.x, y + pad.y, 2, UI_COLORS.shadow, UI_COLORS.light, UI_FONTS.getFont("small", "primary"));
    i += 0.7;
    controls.forEach(element => {
        // key
        pad = grid.pos(0.2, i);
        drawShadowedText(element.key, x + pad.x, y + pad.y, 2, UI_COLORS.shadow, UI_COLORS.light, UI_FONTS.getFont("tiny", "secondary"));
        // label
        pad = grid.pos(1.5, i);
        drawShadowedText(`: ${element.label}`, x + pad.x, y + pad.y, 2, UI_COLORS.shadow, UI_COLORS.light, UI_FONTS.getFont("tiny", "secondary"));
        i += 0.4;
    });
}

function drawEndScreenHeader() {
    // panneau fond 
    pos = grid.pos(-1, -1);
    dim = grid.pos(27,2);
    // drawPanel(pos.x, pos.y, 27, 3, "primary");
    drawBox(pos.x,pos.y,dim.x,dim.y,UI_COLORS.primary,UI_CONFIG.shadowPad,UI_COLORS.shadowColor)
    // icon 
    pos = grid.pos(1, 0);
    drawIcon(pos.x, pos.y, UI_ICONS.elements.dead, 1);

    // title
    let screenTitle = "This is the end " + runState.player.className;

    pos = grid.pos(2, 0.75);
    ctx.textAlign = "left";
    drawShadowedText(screenTitle, pos.x, pos.y, 2, UI_COLORS.shadow, UI_COLORS.text.light, UI_FONTS.getFont("medium", "primary"));

}