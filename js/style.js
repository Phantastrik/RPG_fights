const CANVAS_DIMENSIONS = { width: 800, height: 400 };
const UI_CONFIG = {
    shadowPad : 5
}
const UI_COLORS = {
    primary : '#5186b8',
    shadow : '#293b4d',
    secondary : '#519eb8',
    contrast : '#b86c51',
    text : {
        light : '#ffffff',
        dark : '#000000'
    },
    abilities : {
        physicAttack : '#c4547c',
        magicAttack : '#54c4a8'
    }
}
const UI_FONTS = {
    size : {
        small : "10px",
        medium : "15px",
        big : "20px"
    },
    police : {
        primary : "Bestigia",
        secondary : "Verdana"
    },
    getFont : (size,police) => {
        return (UI_FONTS.size[size] + " " + UI_FONTS.police[police]);
    }
}