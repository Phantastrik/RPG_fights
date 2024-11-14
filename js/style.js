const CANVAS_DIMENSIONS = { width: 800, height: 400 };
const UI_CONFIG = {
    shadowPad: 2
}
const UI_COLORS = {
    primary: '#5186b8',
    shadow: '#293b4d',
    secondary: '#519eb8',
    contrast: '#b86c51',
    light: '#FFFFFF',
    text: {
        light: '#ffffff',
        medium : '#444444',
        dark: '#000000'
    },
    abilities: {
        physicAttack: '#c4547c',
        magicAttack: '#54c4a8'
    },
    stats: {
        pv: {
            primary: "red"
        },
        pm: {
            primary: "blue"
        }

    }
}
const UI_FONTS = {
    size: {
        tiny : "10px",
        small: "15px",
        medium: "20px",
        big: "30px"
    },
    police: {
        primary: "Bestigia",
        secondary: "Verdana"
    },
    getFont: (size, police) => {
        return (UI_FONTS.size[size] + " " + UI_FONTS.police[police]);
    }
}