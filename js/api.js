// Récupère l'état de la Run
function fetchRunState(characterClass = null,seed=null) {
    let route = API_ROUTES.getRunState;
    if(characterClass !== null){
        route += "?class=" + characterClass;
    }
    if(seed !== null){
        route += "?seed=" + seed;
    }
    
    return fetch(route).then(response => response.json());
}

// Supprime la session de jeu (fin de partie)
function deleteSession() {
    return fetch(API_ROUTES.deleteSession).catch(error => console.error('Erreur:', error));
}

// Récupère le prochain round de combat
function fetchNextRound(choosedAbility,choosedEffect) {
    if(choosedAbility !== null && choosedAbility!== undefined ){
        $route = API_ROUTES.fetchNextRound + "?ability=" + choosedAbility;
    }else{
        
        console.log(choosedEffect);
        if(choosedEffect !== null && choosedEffect!== undefined ){
            $route = API_ROUTES.fetchNextRound + "?eventChoice=" + choosedEffect;
        }else{
            $route = API_ROUTES.fetchNextRound;
        }
    }
    return fetch($route).then(response => response.json());
}
function fetchPlayerPreset() {
    return fetch(API_ROUTES.fetchPlayerPresets).then(response => response.json());
}
