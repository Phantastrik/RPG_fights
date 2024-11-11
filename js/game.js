const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
ctx.width = 800;
ctx.height = 400;
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
            x: 0,
            y: 0,
            h: 0,
            l: 0,
            lval: 0
        };
        hb.x = this.x;
        hb.y = this.y + 120
        hb.h = 10;
        hb.l = 100;
        hb.lval = Math.floor(runState.player.pv / runState.player.pvMax * hb.l);
        drawHealthBar(hb);
        // manabar
        let mb = {
            x: 0,
            y: 0,
            h: 0,
            l: 0,
            lval: 0
        };
        mb.x = this.x;
        mb.y = this.y + 120 + hb.h + 3,
            mb.h = 10;
        mb.l = 100;
        mb.lval = Math.floor(runState.player.pm / runState.player.pmMax * mb.l);
        drawManaBar(mb);
    }
};

// Fonction pour démarrer le jeu
function startGame() {
    delete runState;
    deleteSession().then(
        fetchRunState().then(() => {
            initData();
            // Exemple de dessin d'éléments à partir des données
            drawInitialScene();
        })
    );
}
// round suivant
function nextRound() {
    if (!runState.player.isDead) {
        delete runState;
        fetchNextRound().then(() => {
            initData();
            // Exemple de dessin d'éléments à partir des données
            drawInitialScene();
        });
    }
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
function deleteSession() {
    return fetch('../main/controllers/endGame.php').catch(error => console.error('Erreur:', error));
}
// Fonction pour récupérer l'état de la Run via AJAX
function fetchNextRound() {
    return fetch('../main/controllers/playNextRound.php')
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
    drawStagesSideBar();
    drawPlayerStats(10, 10);

    // ctx.fillStyle = "blue" ; // Bleu pour le joueur, rouge pour l'ennemi
    // ctx.fillRect(0, 0, 50, 50);

}


/// Fonction de dessin 
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
// dessin de la liste des stages
function drawStagesSideBar() {
    SSBpad = 10;
    SSB = {
        x: Math.floor(ctx.width / 4) * 3 + SSBpad,
        y: SSBpad,
        w: Math.floor(ctx.width / 4) - (2 * SSBpad),
        h: ctx.height - (2 * SSBpad),
        backgroundColor: "rgba(255,255,240,0.3)",
        stageTextColor: "white",
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
                stageBackgroundColor: (stage.done ? "#bfb9ac" : "#ad8a5f"),
            }
        );
        i++;
    });
    console.log(SSB);
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
        ctx.font = "10px verdana";
        ctx.fillStyle = SSB.stageTextColor;
        ctx.fillText(stage.text, stage.x + SSB.textLPad, stage.y + (stage.h / 2) + 5, stage.w);
        // dessin
        ctx.font = "10px verdana";
        ctx.fillStyle = SSB.stageTextColor;
        ctx.fillText(stage.text, stage.x + SSB.textLPad, stage.y + (stage.h / 2) + 5, stage.w);


    });

}


function drawPlayerStats(x, y) {
    const player = runState.player;

    // Style et configuration de la police
    ctx.font = "12px verdana";
    ctx.fillStyle = "black";

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
        ctx.fillRect(x + padding + 2, y + padding + pad + (index) * lineHeight +2, 100, 20);
        ctx.fillStyle = "black"
        ctx.fillText(text, x + padding + pad, y + padding + (index + 1) * lineHeight - pad);
        // main
        ctx.fillStyle = "rgba(130,200,200,1)"
        ctx.fillRect(x + padding, y + padding + pad + (index) * lineHeight, 100, 20);
        ctx.fillStyle = "black"
        ctx.fillText(text, x + padding + pad + 2, y + padding + (index + 1) * lineHeight - pad +2 );
       
    });
}
