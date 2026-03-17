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
        24: { t: "Nettoyer les espaces", c: "Supprimer les espaces inutiles ?", quiz: true, answer: "=SUPPRESPACE(A1)", r: "Base de données propre ! +50 XP" },
        25: { t: "Majuscules", c: "Mettre A1 en majuscules ?", quiz: true, answer: "=MAJUSCULE(A1)", r: "C'est bien plus lisible ! +30 XP" },
        26: { t: "Trouver la position", c: "Chercher la position d'un texte dans A1 ?", quiz: true, answer: "=TROUVE(A1)", r: "Repérage précis ! +60 XP" },
        27: { t: "Remplacer du texte", c: "Changer un mot par un autre dans A1 ?", quiz: true, answer: "=SUBSTITUE(A1)", r: "Correction automatique validée ! +60 XP" },
        28: { t: "Nombre de caractères", c: "Compter la longueur du texte en A1 ?", quiz: true, answer: "=NBCAR(A1)", r: "Mesure effectuée ! +40 XP" },
        29: { t: "Convertir en nombre", c: "Transformer du texte '12' en vrai chiffre ?", quiz: true, answer: "=VALEUR(A1)", r: "Calculs désormais possibles ! +50 XP" },
        30: { t: "EXAMEN : Niveau 3", c: "Quelle fonction permet de mettre seulement la 1ère lettre en Majuscule ?", quiz: true, answer: "=NOMPROPRE(A1)", r: "GÉNIAL ! Niveau 3 validé. Expert en données ! +200 XP" }
    },31: { 
            t: "SI imbriqués", 
            c: "Si A1 > 10 affiche 'Top', si A1 > 5 affiche 'Moyen', sinon 'Bas' ?", 
            quiz: true, 
            answer: '=SI(A1>10;"Top";SI(A1>5;"Moyen";"Bas"))', 
            r: "Impressionnant ! Vous gérez des conditions multiples. +80 XP" 
        },
        32: { 
            t: "La fonction ET", 
            c: "Vérifier si A1 est > 0 ET B1 est < 100 ?", 
            quiz: true, 
            answer: "=ET(A1>0;B1<100)", 
            r: "Double vérification réussie ! +50 XP" 
        },
        33: { 
            t: "La fonction OU", 
            c: "Vérifier si A1 est égal à 'OUI' OU à 'YES' ?", 
            quiz: true, 
            answer: '=OU(A1="OUI";A1="YES")', 
            r: "Flexible et efficace ! +50 XP" 
        },
        34: { 
            t: "Gérer les erreurs", 
            c: "Si la formule en A1 fait une erreur, afficher 0 ?", 
            quiz: true, 
            answer: "=SIERREUR(A1;0)", 
            r: "Fini les #N/A qui gâchent vos tableaux ! +60 XP" 
        },
        35: { 
            t: "Compter avec critères", 
            c: "Compter les 'Ventes' en A1:A10 si le prix en B1:B10 est > 100 ?", 
            quiz: true, 
            answer: '=NB.SI.ENS(A1:A10;"Ventes";B1:B10;">100")', 
            r: "C'est du reporting de haut niveau ! +80 XP" 
        }

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
                        if(i === 10) alert("Félicitations Michel ! Niveau 1 validé !");
                        if(i === 20) alert("Bravo ! Niveau 2 terminé !");
                        if(i === 30) alert("MAÎTRISE ! Niveau 3 terminé !");
                    } else {
                        f.textContent = "Faux. Indice : " + item.answer;
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
            } else {
                display.innerHTML = `<h2>Chapitre ${i}</h2><p>Contenu en cours de rédaction par Michel.</p>`;
            }
        };
        list.appendChild(li);
    }
});
