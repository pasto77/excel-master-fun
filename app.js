document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('chapters-list');
    const display = document.getElementById('lesson-content');

    const content = {
        1: { t: "Les Fondations", c: "Une cellule est une boîte pour vos données.", a: "Valider", r: "+10 XP" },
        2: { t: "Saisie de données", c: "La précision est la clé du succès.", a: "Saisir", r: "+10 XP" },
        3: { t: "Calculs de base", c: "Utilisez '=' pour lancer un calcul.", a: "Calculer", r: "+10 XP" },
        4: { t: "Formatage", c: "Rendez vos données professionnelles.", a: "Styliser", r: "+10 XP" },
        5: { t: "Somme auto", c: "Additionnez tout en un clic.", a: "Sommer", r: "+20 XP" },
        6: { t: "Défi : La Moyenne", c: "Formule pour la moyenne de A1 à A10 ?", quiz: true, answer: "=MOYENNE(A1:A10)", r: "Correct ! +50 XP" },
        7: { t: "Le secret du '$'", c: "Comment figer la cellule B1 dans une formule ?", quiz: true, answer: "$B$1", r: "Gagné ! Vous avez verrouillé la cellule. +50 XP" },
        8: { t: "La fonction SI", c: "Si A1 > 10, affiche 'OK', sinon 'NON' ?", quiz: true, answer: '=SI(A1>10;"OK";"NON")', r: "Logique parfaite ! +60 XP" },
        9: { t: "Tri & Filtres", c: "Le tri permet de classer de A à Z.", a: "Classer", r: "C'est bien plus clair ainsi ! +20 XP" },
        10: { t: "Graphiques", c: "Un dessin vaut mille chiffres.", a: "Tracer", r: "Superbe courbe ! Niveau 1 terminé. +100 XP" },
        11: { t: "Le puissant RECHERCHEV", c: "Cherche A1 dans D1:E10, ramène col 2. (Vrai = 0)", quiz: true, answer: "=RECHERCHEV(A1;D1:E10;2;0)", r: "Magique ! +80 XP" },
        12: { t: "Tableaux Croisés Dynamiques", c: "Le TCD sert à synthétiser des milliers de lignes.", a: "Générer", r: "Analyse terminée ! +30 XP" },
        13: { t: "Nettoyage : Les Doublons", c: "Supprimer les répétitions inutiles.", a: "Nettoyer", r: "Base de données propre ! +20 XP" },
        14: { t: "Listes déroulantes", c: "Outil pour créer un menu de choix dans une cellule ?", quiz: true, answer: "Validation des données", r: "Exact ! +50 XP" },
        15: { t: "Calcul de dates", c: "Formule pour calculer l'écart en jours entre A1 et B1 ?", quiz: true, answer: "=B1-A1", r: "Bravo ! Simple et efficace. +40 XP" },
        16: { t: "Figer les Volets", c: "Garder les titres visibles en faisant défiler.", a: "Figer", r: "Navigation optimisée ! +20 XP" },
        17: { t: "Mise en forme Conditionnelle", c: "Colorer les cellules selon leur valeur automatiquement.", a: "Colorer", r: "Visuel parfait ! +30 XP" },
        18: { t: "Protection", c: "Comment s'appelle l'onglet pour verrouiller une feuille ?", quiz: true, answer: "Révision", r: "Exactement, c'est là que se trouve la sécurité. +40 XP" },
        19: { t: "Somme SI", c: "Additionner les cellules de A1:A10 si elles sont > 100 ?", quiz: true, answer: '=SOMME.SI(A1:A10;">100")', r: "Expertise confirmée ! +70 XP" },
        20: { t: "EXAMEN FINAL : Niveau 2", c: "Quelle fonction permet de compter le nombre de cellules non vides ?", quiz: true, answer: "=NBVAL", r: "INCROYABLE ! Vous avez terminé le Niveau 2 ! +200 XP" },
        21: { t: "Extraire à GAUCHE", c: "Prendre les 3 premiers caractères de A1 ?", quiz: true, answer: "=GAUCHE(A1;3)", r: "Parfait pour les codes ! +40 XP" },
        22: { t: "Extraire à DROITE", c: "Prendre les 2 derniers caractères de A1 ?", quiz: true, answer: "=DROITE(A1;2)", r: "Utile pour les extensions ! +40 XP" },
        23: { t: "Fusionner : CONCAT", c: "Coller le texte de A1 et B1 ensemble ?", quiz: true, answer: "=CONCAT(A1;B1)", r: "Fusion réussie ! +50 XP" },
        24: { t: "Nettoyage : Espaces", c: "Supprimer les espaces inutiles ?", quiz: true, answer: "=SUPPRESPACE(A1)", r: "Base de données propre ! +50 XP" },
        25: { t: "Majuscules", c: "Mettre A1 en majuscules ?", quiz: true, answer: "=MAJUSCULE(A1)", r: "C'est bien plus lisible ! +30 XP" },
        26: { t: "Trouver la position", c: "Chercher la position d'un texte dans A1 ?", quiz: true, answer: "=TROUVE(A1)", r: "Repérage précis ! +60 XP" },
        27: { t: "Remplacer du texte", c: "Changer un mot par un autre dans A1 ?", quiz: true, answer: "=SUBSTITUE(A1)", r: "Correction automatique validée ! +60 XP" },
        28: { t: "Nombre de caractères", c: "Compter la longueur du texte en A1 ?", quiz: true, answer: "=NBCAR(A1)", r: "Mesure effectuée ! +40 XP" },
        29: { t: "Convertir en nombre", c: "Transformer du texte '12' en vrai chiffre ?", quiz: true, answer: "=VALEUR(A1)", r: "Calculs désormais possibles ! +50 XP" },
        30: { t: "EXAMEN : Niveau 3", c: "Quelle fonction met la 1ère lettre en Majuscule ?", quiz: true, answer: "=NOMPROPRE(A1)", r: "Niveau 3 validé ! +200 XP" },
        31: { t: "SI imbriqués", c: "Si A1 > 10 'Top', si A1 > 5 'Moyen', sinon 'Bas' ?", quiz: true, answer: '=SI(A1>10;"Top";SI(A1>5;"Moyen";"Bas"))', r: "Conditions multiples gérées ! +80 XP" },
        32: { t: "La fonction ET", c: "A1 > 0 ET B1 < 100 ?", quiz: true, answer: "=ET(A1>0;B1<100)", r: "Double vérification OK ! +50 XP" },
        33: { t: "La fonction OU", c: "A1 = 'OUI' OU 'YES' ?", quiz: true, answer: '=OU(A1="OUI";A1="YES")', r: "Flexibilité acquise ! +50 XP" },
        34: { t: "Gérer les erreurs", c: "Si erreur en A1, afficher 0 ?", quiz: true, answer: "=SIERREUR(A1;0)", r: "Tableaux propres ! +60 XP" },
        35: { t: "Compter avec critères", c: "A1:A10='Ventes' et B1:B10>100 ?", quiz: true, answer: '=NB.SI.ENS(A1:A10;"Ventes";B1:B10;">100")', r: "Reporting précis ! +80 XP" },
        36: { t: "RECHERCHEX (L'élite)", c: "Quelle fonction remplace RECHERCHEV ?", quiz: true, answer: "=RECHERCHEX", r: "Vous utilisez le futur d'Excel ! +90 XP" },
        37: { t: "SOMMEPROD", c: "Calculer le total (Prix * Qté) sans colonne ?", quiz: true, answer: "=SOMMEPROD(A1:A10;B1:B10)", r: "Puissance de calcul ! +90 XP" },
        38: { t: "Gestion des dates", c: "Dernier jour du mois de A1 ?", quiz: true, answer: "=FIN.MOIS(A1;0)", r: "Calendrier maîtrisé ! +70 XP" },
        39: { t: "Calcul de l'âge", c: "Extraire l'année actuelle ?", quiz: true, answer: "=ANNEE(AUJOURDHUI())", r: "Temps réel capturé ! +60 XP" },
        40: { t: "EXAMEN : Niveau 4", c: "Combiner ET/OU s'appelle la logique... ?", quiz: true, answer: "Booléenne", r: "BRAVO ! Niveau 4 terminé. +300 XP" },
        41: { t: "Intro aux Macros", c: "Quel langage est utilisé pour les macros ?", quiz: true, answer: "VBA", r: "Bienvenue dans l'automatisation ! +50 XP" },
        42: { t: "Enregistreur de Macros", c: "Quel onglet secret pour les macros ?", quiz: true, answer: "Développeur", r: "L'onglet secret est activé ! +40 XP" },
        43: { t: "Extensions", c: "Extension Excel avec macros ?", quiz: true, answer: ".xlsm", r: "Format correct ! +40 XP" },
        44: { t: "Sécurité", c: "Alerte jaune à l'ouverture ?", quiz: true, answer: "Avertissement de sécurité", r: "Prudence acquise. +30 XP" },
        45: { t: "Premier script", c: "VBA pour afficher un message ?", quiz: true, answer: "MsgBox", r: "Code validé ! +100 XP" },
        46: { t: "VBA : Les Variables", c: "Déclarer 'Nom' en texte ?", quiz: true, answer: "Dim Nom As String", r: "Structure propre ! +60 XP" },
        47: { t: "VBA : Les Boucles", c: "Instruction pour répéter une action ?", quiz: true, answer: "For Each", r: "Vitesse multipliée ! +80 XP" },
        48: { t: "Power Query", c: "Nettoyer des données externes ?", quiz: true, answer: "Power Query", r: "Nettoyage pro ! +70 XP" },
        49: { t: "Analyse Scénario", c: "Trouver la valeur cible ?", quiz: true, answer: "Valeur cible", r: "Prédicteur expert ! +60 XP" },
        50: { t: "DIPLÔME FINAL", c: "Raccourci pour sauvegarder ?", quiz: true, answer: "CTRL+S", r: "DIPLÔME OBTENU ! Félicitations Maître Michel ! +1000 XP" }
    }; // FIN DE L'OBJET CONTENT

    for (let i = 1; i <= 50; i++) {
        const li = document.createElement('li');
        li.textContent = `Chapitre ${i}: ${content[i] ? content[i].t : 'À venir'}`;
        li.style.cursor = "pointer";
        li.onclick = () => {
            const item = content[i];
            if (item && item.quiz) {
                display.innerHTML = `
                    <h2>${item.t}</h2>
                    <div class="coach-box"><strong>Défi :</strong> ${item.c}</div>
                    <input type="text" id="q-in" placeholder="Réponse ici..." style="width:70%; padding:10px;">
                    <button id="q-bt" style="padding:10px; background:#217346; color:white; border:none; cursor:pointer;">Vérifier</button>
                    <p id="fb" style="margin-top:15px; font-weight:bold;"></p>
                `;
                document.getElementById('q-bt').onclick = () => {
                    const val = document.getElementById('q-in').value.trim();
                    const isOk = (val.toUpperCase() === item.answer.toUpperCase());
                    const f = document.getElementById('fb');
                    if (isOk) {
                        f.textContent = item.r;
                        f.style.color = "green";
                        if(i === 10) alert("Niveau 1 validé !");
                        if(i === 20) alert("Niveau 2 validé !");
                        if(i === 30) alert("Niveau 3 validé !");
                        if(i === 40) alert("Niveau 4 validé !");
                        if(i === 50) alert("INCROYABLE MICHEL ! VOUS ÊTES UN EXPERT EXCEL !");
                    } else {
                        f.textContent = "Indice : " + item.answer;
                        f.style.color = "red";
                    }
                };
            } else if (item) {
                display.innerHTML = `
                    <h2>${item.t}</h2>
                    <div class="coach-box"><strong>Excelix:</strong> ${item.c}</div>
                    <button id="simple-btn" style="padding:10px; background:#217346; color:white; border:none; cursor:pointer;">${item.a}</button>
                    <p id="fb" style="margin-top:15px; color:green; font-weight:bold;"></p>
                `;
                document.getElementById('simple-btn').onclick = () => {
                    document.getElementById('fb').textContent = item.r;
                };
            }
        };
        list.appendChild(li);
    }
});
