const CANVAS_DIMENSIONS = { width: 800, height: 416 };
const UI_CONFIG = {
    shadowPad: 2,
    textShadowPad: 1
}
const UI_BG = {
    bg1: 'url(../assets/bg/background_1.png)',
    bg2: 'url(../assets/bg/background_2.png)',
    bg3: 'url(../assets/bg/background_3.png)',
    bg4: 'url(../assets/bg/background_4.png)'
}
const UI_COLORS = {
    primary: '#5186b8',
    shadow: '#293b4d',
    secondary: '#519eb8',
    contrast: '#b86c51',
    light: '#FFFFFF',
    text: {
        light: '#ffffff',
        medium: '#444444',
        dark: '#000000',
        sucess: '#00FF00',
        danger: '#FF0000'
    },
    abilities: {
        physicAttack: '#c4547c',
        magicAttack: '#54c4a8',
        spell: '#bfc431'
    },
    stats: {
        lvl: {
            primary: '#000000'
        },
        pv: {
            primary: "#f54242",
            secondary: 'f54242'
        },
        pm: {
            primary: "#42b9f5",
            secondary: '#1c516b'
        },
        attaque: {
            primary: "#a84632"
        },
        defense: {
            primary: '#a87d32'
        },
        sagesse: {
            primary: '#32a889'
        },
        vitesse: {
            primary: '#59a832'
        }


    }
}
const UI_FONTS = {
    size: {
        tiny: "10px",
        small: "15px",
        medium: "20px",
        big: "30px"
    },
    police: {
        primary: "Bestigia",
        secondary: "Verdana",
    },
    getFont: (size, police) => {
        return (UI_FONTS.size[size] + " " + UI_FONTS.police[police]);
    }
}
const digitalDisco = new FontFace('DigitalDisco', 'url(../assets/fonts/DigitalDisco.ttf)');
digitalDisco.load().then(function (font) {
    UI_FONTS.police.primary = font.family;
});
const digitalDiscoThin = new FontFace('DigitalDisco Thin', 'url(../assets/fonts/DigitalDisco-Thin.ttf)');
digitalDiscoThin.load().then(function (font) {
    UI_FONTS.police.secondary = font.family;
});
// grille d'accroche
const grid = {
    x_subdivision: 25,
    y_subdivision: 13,
    x_center: CANVAS_DIMENSIONS.width / 2,
    y_center: CANVAS_DIMENSIONS.height / 2,
    cell_width: null,
    cell_height: null,
    // return the real pixel position
    pos: function (gridx, gridy) {
        if (this.cell_width === null) {
            this.cell_width = CANVAS_DIMENSIONS.width / this.x_subdivision;
        }
        if (this.cell_height === null) {
            this.cell_height = CANVAS_DIMENSIONS.height / this.y_subdivision;
        }
        // console.log(this); 
        return { x: gridx * this.cell_width, y: gridy * this.cell_height };
    }
};

const UI_ICONS = {
    src: `../assets/UI/icons.png`,
    img: null,
    cellSize: 32,
    elements: {
        arrow_up: { x: 0, y: 2 },
        arrow_down: { x: 1, y: 2 },
        pv: { x: 0, y: 6 },
        pvMax: { x: 0, y: 1 },
        pm: { x: 10, y: 0 },
        pmMax : {x: 5, y:19},
        attaque: { x: 1, y: 5 },
        defense: { x: 1, y: 6 },
        sagesse: { x: 10, y: 13 },
        vitesse: { x: 14, y: 3 },
        exp: { x: 5, y: 0 }
    }
}

let spriteSource = {
    warrior: {
        lastUpdateTime: 0,
        currentFrame: 0,
        frameWidth: 256,
        frameHeight: 256,
        displayWidth: 256,
        displayHeight: 256,
        xcrop: 0,
        ycrop: 0,
        src: `../assets/player/warrior_sprite.png`,
        idle: { x: 0, y: 1536, frameCount: 1, },
        walk: { x: 0, y: 0, frameCount: 7, },
        run: { x: 0, y: 256, frameCount: 6 },
        attaques: [
            { x: 0, y: 512, frameCount: 6 },
            { x: 0, y: 768, frameCount: 5 },
            { x: 0, y: 1024, frameCount: 4 },
            { x: 0, y: 1280, frameCount: 4 }
        ]
    },
    rogue: {
        lastUpdateTime: 0,
        currentFrame: 0,
        frameWidth: 256,
        frameHeight: 256,
        displayWidth: 256,
        displayHeight: 256,
        xcrop: 0,
        ycrop: 0,
        src: `../assets/player/rogue_sprite.png`,
        idle: { x: 0, y: 0, frameCount: 6 },
        walk: { x: 0, y: 256, frameCount: 9 },
        run: { x: 0, y: 512, frameCount: 8 },
        attaques: [
            { x: 0, y: 768, frameCount: 4 },
            { x: 0, y: 1024, frameCount: 5 },
            { x: 0, y: 1280, frameCount: 4 },
        ]
    },
    mage: {
        lastUpdateTime: 0,
        currentFrame: 0,
        frameWidth: 256,
        frameHeight: 256,
        displayWidth: 256,
        displayHeight: 256,
        xcrop: 0,
        ycrop: 0,
        src: `../assets/player/mage_sprite.png`,
        idle: { x: 0, y: 0, frameCount: 8 },
        walk: { x: 0, y: 256, frameCount: 7 },
        run: { x: 0, y: 512, frameCount: 8 },
        attaques: [
            { x: 0, y: 768, frameCount: 7 },
            { x: 0, y: 1024, frameCount: 9 },
            { x: 0, y: 1280, frameCount: 16 }
        ]
    }
};
const frameSheet_data = {
    primary: {
        src: `../assets/UI/frames_primary.png`,
        img: null,
    },
    secondary: {
        src: `../assets/UI/frames_secondary.png`,
        img: null,
    },
    frameWidth: 32,
    frameHeight: 32,
    cellSize: 32,
    elements: {
        pane: { x: 0, y: 4 },
        panel: {
            top_left: { x: 0, y: 5 },
            top: { x: 1, y: 5 },
            top_right: { x: 2, y: 5 },
            middle_left: { x: 0, y: 6 },
            middle: { x: 1, y: 6 },
            middle_right: { x: 2, y: 6 },
            bottom_left: { x: 0, y: 7 },
            bottom: { x: 1, y: 7 },
            bottom_right: { x: 2, y: 7 }
        }
    },
    getSource: function (element) {
        return {
            x: element.x * this.cellSize,
            y: element.y * this.cellSize,
        }
    }
};
const monster_spritesheet_data = {
    gobelin: {
        lastUpdateTime: 0,
        currentFrame: 0,
        img: null,
        src: `../assets/monster/gobelin_sprite_reverse.png`,
        frameWidth: 96,
        frameHeight: 96,
        displayWidth: 128,
        displayHeight: 128,
        xcrop: 0,
        ycrop: 0,
        idle: { x: 0, y: 0, frameCount: 5 },
        walk: { x: 0, y: 96, frameCount: 7 },
        run: { x: 0, y: 192, frameCount: 6 },
        attaques: [
            { x: 0, y: 288, frameCount: 4 },
            { x: 0, y: 384, frameCount: 4 },
            { x: 0, y: 480, frameCount: 4 }
        ]
    }
};