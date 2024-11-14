// Récupère l'état de la Run
function fetchRunState() {
    return fetch(API_ROUTES.getRunState).then(response => response.json());
}

// Supprime la session de jeu (fin de partie)
function deleteSession() {
    return fetch(API_ROUTES.deleteSession).catch(error => console.error('Erreur:', error));
}

// Récupère le prochain round de combat
function fetchNextRound(choosedAbility) {
    if(choosedAbility !== null && choosedAbility!== undefined ){
        $route = API_ROUTES.fetchNextRound + "?ability=" + choosedAbility;
    }else{
        $route = API_ROUTES.fetchNextRound;
    }
    return fetch($route).then(response => response.json());
}
function fetchPlayerPreset() {
    return fetch(API_ROUTES.fetchPlayerPresets).then(response => response.json());
}
