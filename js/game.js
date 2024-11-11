const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let imgDir = "../assets/";
let runState;
let playerBundle = {
    x: 200,
    y: 200,
    img: new Image(),
    setImage: function (spritename) {
        this.img.src = imgDir + "player/" + spritename + "_sprite.png"
    },
    draw: function () {
        this.img = new Image();
        this.setImage(runState.player.className);
        this.img.onload = () => {
             ctx.drawImage(this.img, this.x, this.y) 
        };
        // health bar
        let hb = {
            x:0,
            y:0,
            h:0,
            l:0,
            lval:0
        };
        hb.x = this.x;
        hb.y = this.y + 120
        hb.h = 10;
        hb.l = 100;
        hb.lval = Math.floor(runState.player.pv / runState.player.pvMax*hb.l);
        
        drawHealthBar(hb);
    }
};

// Fonction pour démarrer le jeu
function startGame() {
    fetchRunState().then(() => {
        initData();
        // Exemple de dessin d'éléments à partir des données
        drawInitialScene();
    });
}

// Fonction pour récupérer l'état de la Run via AJAX
function fetchRunState() {
    return fetch('../main/controllers/getRunState.php')
        .then(response => response.json())
        .then(data => updateCanvas(data))
        .catch(error => console.error('Erreur:', error))
        //.catch(error => console.log(error))
        ;
}

// Fonction pour mettre à jour le canvas en fonction des données reçues
function updateCanvas(data) {
    runState = data;
}

// initialise les données a partir du RunState
function initData() {
    //playerBundle.setImage(runState.player.className);
}

function drawInitialScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerBundle.draw();


    // ctx.fillStyle = "blue" ; // Bleu pour le joueur, rouge pour l'ennemi
    // ctx.fillRect(0, 0, 50, 50);

}


/// Fonction de dessin 
function drawHealthBar(hb) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(hb.x,hb.y, hb.l, hb.h);

    // ctx.setStrokeColor("red", 0);
    // health bar size
//     console.log(runState.player.pv);
//     console.log(runState.player.pv);
    ctx.fillStyle = "red" ; // Bleu pour le joueur, rouge pour l'ennemi
    ctx.fillRect(hb.x, hb.y, hb.lval, hb.h);
    ctx.strokeStyle = "white";
    ctx.fillRect(hb.x+2, hb.y+2, hb.lval -2 , hb.h -2);
}