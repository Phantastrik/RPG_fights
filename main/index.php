<?php
require_once __DIR__ . '/../config/autoload.php';

if (isset($_SESSION['player'])) {
    unset($_SESSION['player']);
}
if (isset($_SESSION['run'])) {
    unset($_SESSION['run']);
}



$w = new Webpage("Foggy's Castle");

$w->appendContent(
    <<<HTML
    <div class="container-fluid" style = "background-color:#252525;text-align:center">
        <h1 class="text-light" style = "margin-bottom:25px">Foggy's Castle</h1>
        <canvas id="gameCanvas" width="800" height="416" style="display:inline-block;margin-bottom:25px" ></canvas>
        <div class="container-fluid" style = "background-color:#252525;padding-bottom:300px" >
            <p class ="text-light"> Bienvenue dans les contrées du Foggy's Castle. <br>
                Choisissez votre héro et courrez a votre perte.
            </p>
        </div>
    </div>
    
HTML
);
$w->appendCssUrl('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
$w->appendCss(
    <<<CSS
    @font-face {

        font-family: "DigitalDisco";
        src: url('../assets/fonts/DigitalDisco.ttf');

    }
    @font-face {

        font-family: "DigitalDisco Thin";
        src: url('../assets/fonts/DigitalDisco-Thin.ttf');

    }
    canvas{
        border:solid black 1px;
        background-image: url(../assets/bg/bg_prairie.jpg);
        background-size: 800px;
    }$
    body {
        background-image: url(../assets/bg/bg_prairie.jpg);
    }
CSS
);

$w->appendContent(
    <<<HTML
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
HTML
);
$w->appendContent(
    <<<HTML

<script src="../js/style.js"></script>
<script src="../js/config.js"></script>
<script src="../js/api.js"></script>
<script src="../js/ui.js"></script>
<script src="../js/screens/startScreen.js"></script>
<script src="../js/screens/stageScreen.js"></script>
<script src="../js/screens/eventScreen.js"></script>
<script src="../js/screens/fightScreen.js"></script>
<script src="../js/screens/endScreen.js"></script>
<script src="../js/game.js"></script>
HTML
);
/*$w->appendContent(<<<HTML
<script src="../js/old.game.js"></script>
HTML
);*/
echo ($w->toHTML());

// <script src="game.js"></script>
