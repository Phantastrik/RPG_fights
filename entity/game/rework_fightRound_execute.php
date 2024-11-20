<?

public function execute() {
    $roundLog = [];  // Stocker les logs du tour
    $participants = $this->getParticipants();  // Récupérer les personnages du round

    // 1. Trier les participants par vitesse (ou autre critère d'initiative)
    usort($participants, function($a, $b) {
        return $b->getSpeed() - $a->getSpeed();
    });

    // 2. Phase d'Action
    foreach ($participants as $participant) {
        if ($participant->isAlive()) {
            // Déterminer l'action (attaque, défense, capacité, etc.)
            $action = $this->determineAction($participant);
            
            // Résoudre l'action
            $actionLog = $this->resolveAction($participant, $action);
            
            // Ajouter l'action au log du tour
            $roundLog[] = $actionLog;
        }
    }

    // 3. Phase de Résolution
    foreach ($participants as $participant) {
        $this->applyEndOfTurnEffects($participant);
    }

    // Vérifier les conditions de fin de combat
    if ($this->checkVictory()) {
        $roundLog[] = "Combat terminé : victoire !";
    } elseif ($this->checkDefeat()) {
        $roundLog[] = "Combat terminé : défaite...";
    }

    // 4. Retourner les résultats du tour
    return [
        'log' => $roundLog,
        'participants' => $this->getParticipantsState(),
        'combatOver' => $this->checkVictory() || $this->checkDefeat()
    ];
}
