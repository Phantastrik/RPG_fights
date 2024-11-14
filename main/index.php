<?php
require_once __DIR__.'/../config/autoload.php';

if(isset($_SESSION['player'])){
    unset($_SESSION['player']);
}
if(isset($_SESSION['run'])){
    unset($_SESSION['run']);
}



$w = new Webpage("RPG Fight");

$w->appendContent(<<<HTML
    <h1>RPG Fight Game</h1>
    <div class="container">
        <canvas id="gameCanvas" width="800" height="416" ></canvas>
        <br><button onclick="startGame()">Démarrer la Partie</button>
        <button onclick="nextRound()">Round Suivant</button>
    </div>
    
HTML
);
$w->appendCssUrl('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
$w->appendCss(<<<CSS
    canvas{
        border:solid black 1px;
        background-image: url(../assets/bg/bg_prairie.jpg);
        background-size: 800px;
    }
CSS
);

$w->appendContent(<<<HTML
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
HTML
);
$w->appendContent(<<<HTML

<script src="../js/style.js"></script>
<script src="../js/config.js"></script>
<script src="../js/api.js"></script>
<script src="../js/ui.js"></script>
<script src="../js/screens/startScreen.js"></script>
<script src="../js/screens/stageScreen.js"></script>
<script src="../js/screens/endScreen.js"></script>
<script src="../js/game.js"></script>
HTML
);
/*$w->appendContent(<<<HTML
<script src="../js/old.game.js"></script>
HTML
);*/
echo($w->toHTML());

// <script src="game.js"></script>

