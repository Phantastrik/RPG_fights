<?php

class WebPage {
    /**
     * @var string Texte compris entre <head> et </head>
     */
    private $head  = null ;
    /**
     * @var string Texte compris entre <title> et </title>
     */
    private $title = null ;
    /**
     * @var string Texte compris entre <body> et </body>
     */
    private $body  = null ;

    /**
     * Constructeur
     * @param string $title Titre de la page
     */
    public function __construct($title=null) {
        $this->title = $title;
    }

    /**
     * Protéger les caractères spéciaux pouvant dégrader la page Web
     * @param string $string La chaîne à protéger
     * @return string La chaîne protégée
     */
    public function escapeString($string) {
        return htmlentities($string);
    }

    /**
     * Affecter le titre de la page
     * @param string $title Le titre
     */
    public function setTitle($title) {
        $this->title = $title;
    }

    /**
     * Ajouter un contenu dans head
     * @param string $content Le contenu à ajouter
     * @return void
     */
    public function appendToHead($content) {
        $this->head .= $content;
    }

    /**
     * Ajouter un contenu CSS dans head
     * @param string $css Le contenu CSS à ajouter
     * @return void
     */
    public function appendCss($css){
        $this->appendToHead(<<<css
        <style type="text/css">
            $css
        </style>

css
        );
    }

    /**
     * Ajouter l'URL d'un script CSS dans head
     * @param string $url L'URL du script CSS
     * @return void
     */
    public function appendCssUrl($url){
        $this->appendToHead(<<<HTML
    <link rel ="stylesheet" href="$url"/>

HTML
        );
    }

    /**
     * Ajouter un contenu JavaScript dans head
     * @param string $js Le contenu JavaScript à ajouter
     * @return void
     */
    public function appendJs($js) {
        $this->appendToHead(<<<HTML
    <script type='text/javascript'>
    {$js}
    </script>
HTML
        );
    }

    /**
     * Ajouter l'URL d'un script JavaScript dans head
     * @param string $url L'URL du script JavaScript
     * @return void
     */
    public function appendJsUrl($url) {
        $this->appendToHead(<<<js
    <script src="$url"></script>
js
        );
    }

    /**
     * Ajouter un contenu dans body
     * @param string $content Le contenu à ajouter
     * @return void
     */
    public function appendContent($content) {
        $this->body .= $content;
    }

    /**
     * Produire la page Web complète
     * @return string
     */
    public function toHTML() {
        $html = <<<html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        $this->head
    </head>
    <body>
        $this->body
    </body>
</html>
html;
        return $html;
    }
}
