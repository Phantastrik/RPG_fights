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
    primary: '#24395c',
    shadow: '#293b4d',
    secondary: '#0e1624',
    contrast: '#b86c51',
    light: '#FFFFFF',
    hint : '#595959',
    disabled : "#757575",
    transparent : 'rgba(0,0,0,0)',
    light_alpha : 'rgba(89, 89, 89,0.7)',
    text: {
        light: '#ffffff',
        medium: '#444444',
        dark: '#000000',
        sucess: '#00FF00',
        danger: '#e8d207'
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
            secondary: '#822222'
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
        pv: { x: 6, y: 0 },
        pvMax: { x: 0, y: 1 },
        pm: { x: 10, y: 0 },
        pmMax : {x: 5, y:19},
        attaque: { x: 2, y: 5 },
        defense: { x: 1, y: 6 },
        sagesse: { x: 10, y: 13 },
        vitesse: { x: 12, y: 3 },
        exp: { x: 5, y: 0 },
        time : {x:15,y:10},
        permanent : {x:5,y:3},
        fight : {x:9,y:5},
        event : {x: 14,y:16},
        dead : {x:0,y:0}
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
        hurt: { x: 0, y: 1792, frameCount: 2 },
        attaques: {
            physic : { x: 0, y: 512, frameCount: 6 },
            magic : { x: 0, y: 768, frameCount: 5 },
            spell : { x: 0, y: 1024, frameCount: 4 },
            else : { x: 0, y: 1280, frameCount: 4 }
        },
        die : {x:0,y:2304, frameCount:6},
        jump : {x:0, y:2048, frameCount : 6}
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
        hurt: { x: 0, y: 2048, frameCount: 3 },
        attaques: {
           magic:  { x: 0, y: 768, frameCount: 4 },
           physic :  { x: 0, y: 1024, frameCount: 5 },
           spell : { x: 0, y: 1280, frameCount: 4 },
        },
        die : {x:0,y:2304, frameCount:6},
        jump : {x:0, y:1792, frameCount : 9}
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
        hurt: { x: 0, y: 2048, frameCount: 4 },
        attaques: {
           spell: { x: 0, y: 768, frameCount: 7 },
           physic: { x: 0, y: 1024, frameCount: 9 },
           magic : { x: 0, y: 1280, frameCount: 16 }
        },
        die : {x:0,y:2304, frameCount:4},
        jump : {x:0, y:1792, frameCount : 8}
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
            top_center: { x: 1, y: 5 },
            top_right: { x: 2, y: 5 },
            middle_left: { x: 0, y: 6 },
            middle_center: { x: 1, y: 6 },
            middle_right: { x: 2, y: 6 },
            bottom_left: { x: 0, y: 7 },
            bottom_center: { x: 1, y: 7 },
            bottom_right: { x: 2, y: 7 },
            left: {x:1 ,y:4 },
            right : {x:3,y:4},
            center : {x:2,y:4}
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
        src: `../assets/monster/gobelin_sprite.png`,
        frameWidth: 96,
        frameHeight: 96,
        displayWidth: 128,
        displayHeight: 128,
        xcrop: 0,
        ycrop: 0,
       
        idle: { x: 0, y: 0, frameCount: 5 },
        walk: { x: 0, y: 96, frameCount: 7 },
        run: { x: 0, y: 192, frameCount: 6 },
        
        jump : {x:0,y:672,frameCount:8},
        hurt : {x:0,y:768,frameCount:2},
        die : {x:0,y:864,frameCount:4},
        attaques: {
            magic : { x: 0, y: 288, frameCount: 4 },
            physic : { x: 0, y: 384, frameCount: 4 },
            spell : { x: 0, y: 480, frameCount: 4 }
        }
    },
    orc: {
        lastUpdateTime: 0,
        currentFrame: 0,
        img: null,
        src: `../assets/monster/orc_sprite.png`,
        frameWidth: 96,
        frameHeight: 96,
        displayWidth: 128,
        displayHeight: 128,
        xcrop: 0,
        ycrop: 0,
        idle: { x: 0, y: 0, frameCount: 5 },
        walk: { x: 0, y: 96, frameCount: 7 },
        run: { x: 0, y: 192, frameCount: 6 },
        jump : {x:0,y:672,frameCount:5},
        hurt : {x:0,y:768,frameCount:2},
        die : {x:0,y:864,frameCount:4},
        attaques: {
            physic : { x: 0, y: 288, frameCount: 5 },
            magic : { x: 0, y: 384, frameCount: 4 },
            spell : { x: 0, y: 480, frameCount: 4 },
            else : { x: 0, y: 576, frameCount: 2 },
        }
    },
    shaman: {
        lastUpdateTime: 0,
        currentFrame: 0,
        img: null,
        src: `../assets/monster/shaman_sprite.png`,
        frameWidth: 96,
        frameHeight: 96,
        displayWidth: 128,
        displayHeight: 128,
        xcrop: 0,
        ycrop: 0,
        idle: { x: 0, y: 0, frameCount: 5 },
        walk: { x: 0, y: 96, frameCount: 7 },
        run: { x: 0, y: 192, frameCount: 6 },
        jump : {x:0,y:672,frameCount:6},
        hurt : {x:0,y:768,frameCount:2},
        die : {x:0,y:864,frameCount:5},
        attaques: {
            physic : { x: 0, y: 288, frameCount: 4 },
            spell : { x: 0, y: 384, frameCount: 2 },
            else : { x: 0, y: 480, frameCount: 8 },
            magic : { x: 0, y: 576, frameCount: 6 },
        }
    },
    lamia: {
        lastUpdateTime: 0,
        currentFrame: 0,
        img: null,
        src: `../assets/monster/lamia_sprite.png`,
        frameWidth: 128,
        frameHeight: 128,
        displayWidth: 150,
        displayHeight: 150,
        xcrop: 0,
        ycrop: 0,
        idle: { x: 0, y: 0, frameCount: 7 },
        walk: { x: 0, y: 256, frameCount: 13 },
        run: { x: 0, y: 384, frameCount: 7 },
    
        jump : {x:0,y:128,frameCount:5},
        hurt : {x:0,y:1024,frameCount:3},
        die : {x:0,y:1152,frameCount:3},
        attaques: {
            physic : { x: 0, y: 512, frameCount: 16 },
            spell : { x: 0, y: 640, frameCount: 7 },
            magic : { x: 0, y: 768, frameCount: 10 },
            else : { x: 0, y: 896, frameCount: 5 },
        }
    },
    gorgon: {
        lastUpdateTime: 0,
        currentFrame: 0,
        img: null,
        src: `../assets/monster/gorgon_sprite.png`,
        frameWidth: 128,
        frameHeight: 128,
        displayWidth: 150,
        displayHeight: 150,
        xcrop: 0,
        ycrop: 0,
        idle: { x: 0, y: 0, frameCount: 7 },
        walk: { x: 0, y: 256, frameCount: 13 },
        run: { x: 0, y: 384, frameCount: 7 },
    
        jump : {x:0,y:128,frameCount:5},
        hurt : {x:0,y:1024,frameCount:3},
        die : {x:0,y:1152,frameCount:3},
        attaques: {
            physic : { x: 0, y: 512, frameCount: 16 },
            spell : { x: 0, y: 640, frameCount: 7 },
            magic : { x: 0, y: 768, frameCount: 10 },
            else : { x: 0, y: 896, frameCount: 5 },
        }
    },
    spirit: {
        lastUpdateTime: 0,
        currentFrame: 0,
        img: null,
        src: `../assets/monster/spirit_sprite.png`,
        frameWidth: 128,
        frameHeight: 128,
        displayWidth: 128,
        displayHeight: 128,
        xcrop: 0,
        ycrop: 0,
        idle: { x: 0, y: 0, frameCount: 6 },
        walk: { x: 0, y: 128, frameCount: 7 },
        run: { x: 0, y: 254, frameCount: 7 },
    
        jump : {x:0,y:384,frameCount:5},
        hurt : {x:0,y:1024,frameCount:3},
        die : {x:0,y:1152,frameCount:5},
        attaques: {
            else : { x: 0, y: 512, frameCount: 13 },
            physic : { x: 0, y: 640, frameCount: 14 },
            magic : { x: 0, y: 768, frameCount: 11 },
            spell : { x: 0, y: 896, frameCount: 13 },
        }
    },
    spore: {
        lastUpdateTime: 0,
        currentFrame: 0,
        img: null,
        src: `../assets/monster/spore_sprite.png`,
        frameWidth: 128,
        frameHeight: 128,
        displayWidth: 128,
        displayHeight: 128,
        xcrop: 0,
        ycrop: 0,
        idle: { x: 0, y: 0, frameCount: 5 },
        walk: { x: 0, y: 128, frameCount: 7 },
        run: { x: 0, y: 254, frameCount: 7 },
    
        jump : {x:0,y:384,frameCount:5},
        hurt : {x:0,y:1024,frameCount:3},
        die : {x:0,y:1152,frameCount:5},
        attaques: {
            physic : { x: 0, y: 512, frameCount: 13 },
            magic : { x: 0, y: 640, frameCount: 14 },
            spell : { x: 0, y: 768, frameCount: 11 },
            else : { x: 0, y: 896, frameCount: 13 },
        }
    },
};