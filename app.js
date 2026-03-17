document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('chapters-list');
    const display = document.getElementById('lesson-content');
    
    // MÉMOIRE : Récupération de la progression sauvegardée
    let savedData = localStorage.getItem('excelMasterProgress');
    let completedChapters = savedData ? new Set(JSON.parse(savedData)) : new Set();

    const content = {
        1: { t: "Les Fondations", c: "Une cellule est une boîte pour vos données. Cliquez pour valider.", a: "Valider", r: "+10 XP" },
        2: { t: "Saisie de données", c: "La précision est la clé du succès. Chaque donnée compte.", a: "Saisir", r: "+10 XP" },
        3: { t: "Calculs de base", c: "Utilisez '=' pour lancer un calcul (ex: =5+2).", a: "Calculer", r: "+10 XP" },
        4: { t: "Formatage", c: "Rendez vos données professionnelles avec les bordures.", a: "Styliser", r: "+10 XP" },
        5: { t: "Somme auto", c: "L'icône Sigma (Σ) additionne tout en un clic.", a: "Sommer", r: "+20 XP" },
        6: { t: "Défi : La Moyenne", c: "Formule pour la moyenne de A1 à A10 ?", quiz: true, answer: "=MOYENNE(A1:A10)", r: "Correct ! +50 XP" },
        7: { t: "Le secret du '$'", c: "Comment figer la cellule B1 dans une formule ?", quiz: true, answer: "$B$1", r: "Gagné ! +50 XP" },
        8: { t: "La fonction SI", c: "Si A1 > 10, affiche 'OK', sinon 'NON' ?", quiz: true, answer: '=SI(A1>10;"OK";"NON")', r: "Logique parfaite ! +60 XP" },
        9: { t: "Tri & Filtres", c: "Le tri permet de classer vos données de A à Z.", a: "Classer", r: "C'est bien plus clair ainsi ! +20 XP" },
        10: { t: "Graphiques", c: "Un dessin vaut mille chiffres pour vos présentations.", a: "Tracer", r: "Superbe courbe ! Niveau 1 terminé. +100 XP" },
        11: { t: "Le puissant RECHERCHEV", c: "Cherche A1 dans D1:E10, ramène col 2. (Vrai = 0)", quiz: true, answer: "=RECHERCHEV(A1;D1:E10;2;0)", r: "Magique ! +80 XP" },
        12: { t: "Tableaux Croisés Dynamiques", c: "Le TCD sert à synthétiser des milliers de lignes.", a: "Générer", r: "Analyse terminée ! +30 XP" },
        13: { t: "Nettoyage : Les Doublons", c: "Utilisez 'Supprimer les doublons' dans l'onglet Données.", a: "Nettoyer", r: "+20 XP" },
        14: { t: "Listes déroulantes", c: "Outil pour créer un menu de choix dans une cellule ?", quiz: true, answer: "Validation des données", r: "Exact ! +50 XP" },
        15: { t: "Calcul de dates", c: "Écart en jours entre A1 et B1 ?", quiz: true, answer: "=B1-A1", r: "+40 XP" },
        16: { t: "Figer les Volets", c: "Garder les titres visibles même en défilant.", a: "Figer", r: "+20 XP" },
        17: { t: "Mise en forme Conditionnelle", c: "Colorer automatiquement selon la valeur.", a: "Colorer", r: "+30 XP" },
        18: { t: "Protection", c: "Onglet pour verrouiller une feuille ou un classeur ?", quiz: true, answer: "Révision", r: "Sécurité activée. +40 XP" },
        19: { t: "Somme SI", c: "Somme de A1:A10 si la valeur est > 100 ?", quiz: true, answer: '=SOMME.SI(A1:A10;">100")', r: "+70 XP" },
        20: { t: "EXAMEN : Niveau 2", c: "Fonction pour compter les cellules contenant du texte ?", quiz: true, answer: "=NBVAL", r: "Niveau 2 validé ! +200 XP" },
        21: { t: "Extraire à GAUCHE", c: "Prendre les 3 premiers caractères de A1 ?", quiz: true, answer: "=GAUCHE(A1;3)", r: "+40 XP" },
        22: { t: "Extraire à DROITE", c: "Prendre les 2 derniers caractères de A1 ?", quiz: true, answer: "=DROITE(A1;2)", r: "+40 XP" },
        23: { t: "Fusionner : CONCAT", c: "Coller le texte de A1 et B1 ensemble ?", quiz: true, answer: "=CONCAT(A1;B1)", r: "+50 XP" },
        24: { t: "Nettoyage : Espaces", c: "Supprimer les espaces inutiles en début/fin ?", quiz: true, answer: "=SUPPRESPACE(A1)", r: "+50 XP" },
        25: { t: "Majuscules", c: "Transformer le texte de A1 en majuscules ?", quiz: true, answer: "=MAJUSCULE(A1)", r: "+30 XP" },
        26: { t: "Trouver la position", c: "Chercher la position d'un caractère ?", quiz: true, answer: "=TROUVE(A1)", r: "+60 XP" },
        27: { t: "Remplacer du texte", c: "Changer un mot par un autre dans une cellule ?", quiz: true, answer: "=SUBSTITUE(A1)", r: "+60 XP" },
        28: { t: "Nombre de caractères", c: "Compter la longueur totale du texte ?", quiz: true, answer: "=NBCAR(A1)", r: "+40 XP" },
        29: { t: "Convertir en nombre", c: "Transformer du texte numérique en vrai chiffre ?", quiz: true, answer: "=VALEUR(A1)", r: "+50 XP" },
        30: { t: "EXAMEN : Niveau 3", c: "Mettre la 1ère lettre en Majuscule seulement ?", quiz: true, answer: "=NOMPROPRE(A1)", r: "Niveau 3 validé ! +200 XP" },
        31: { t: "SI imbriqués", c: "A1>10 'Top', A1>5 'Moyen', sinon 'Bas' ?", quiz: true, answer: '=SI(A1>10;"Top";SI(A1>5;"Moyen";"Bas"))', r: "Stratège ! +80 XP" },
        32: { t: "La fonction ET", c: "Vérifier si A1 > 0 ET B1 < 100 ?", quiz: true, answer: "=ET(A1>0;B1<100)", r: "+50 XP" },
        33: { t: "La fonction OU", c: "Vérifier si A1 = 'OUI' OU 'YES' ?", quiz: true, answer: '=OU(A1="OUI";A1="YES")', r: "+50 XP" },
        34: { t: "Gérer les erreurs", c: "Si erreur en A1, afficher 0 ?", quiz: true, answer: "=SIERREUR(A1;0)", r: "+60 XP" },
        35: { t: "Compter avec critères", c: "A1:A10='Ventes' et B1:B10>100 ?", quiz: true, answer: '=NB.SI.ENS(A1:A10;"Ventes";B1:B10;">100")', r: "+80 XP" },
        36: { t: "RECHERCHEX", c: "Quelle fonction moderne remplace RECHERCHEV ?", quiz: true, answer: "=RECHERCHEX", r: "Futuriste ! +90 XP" },
        37: { t: "SOMMEPROD", c: "Total (Prix * Qté) sans colonne intermédiaire ?", quiz: true, answer: "=SOMMEPROD(A1:A10;B1:B10)", r: "+90 XP" },
        38: { t: "Gestion des dates", c: "Trouver le dernier jour du mois de A1 ?", quiz: true, answer: "=FIN.MOIS(A1;0)", r: "+70 XP" },
        39: { t: "Calcul de l'âge", c: "Extraire l'année actuelle par formule ?", quiz: true, answer: "=ANNEE(AUJOURDHUI())", r: "+60 XP" },
        40: { t: "EXAMEN : Niveau 4", c: "Combiner ET/OU est une logique dite... ?", quiz: true, answer: "Booléenne", r: "Niveau 4 validé ! +300 XP" },
        41: { t: "Intro aux Macros", c: "Quel est le langage de programmation d'Excel ?", quiz: true, answer: "VBA", r: "+50 XP" },
        42: { t: "Enregistreur", c: "Onglet à activer pour gérer les macros ?", quiz: true, answer: "Développeur", r: "Activé ! +40 XP" },
        43: { t: "Extensions", c: "Extension d'un fichier Excel avec macros ?", quiz: true, answer: ".xlsm", r: "+40 XP" },
        44: { t: "Sécurité", c: "Message d'alerte jaune à l'ouverture d'une macro ?", quiz: true, answer: "Avertissement de sécurité", r: "+30 XP" },
        45: { t: "Premier script", c: "Commande VBA pour afficher un message ?", quiz: true, answer: "MsgBox", r: "Codeur ! +100 XP" },
        46: { t: "VBA : Variables", c: "Déclarer la variable 'Nom' en texte ?", quiz: true, answer: "Dim Nom As String", r: "+60 XP" },
        47: { t: "VBA : Boucles", c: "Répéter une action sur chaque cellule ?", quiz: true, answer: "For Each", r: "+80 XP" },
        48: { t: "Power Query", c: "Outil pour transformer des données externes ?", quiz: true, answer: "Power Query", r: "+70 XP" },
        49: { t: "Analyse Scénario", c: "Outil pour trouver une valeur cible ?", quiz: true, answer: "Valeur cible", r: "+60 XP" },
        50: { t: "DIPLÔME FINAL", c: "Raccourci universel pour sauvegarder votre travail ?", quiz: true, answer: "CTRL+S", r: "MAÎTRE EXCEL ! Félicitations Michel ! +1000 XP" }
    };

    function updateProgressBar() {
        const progress = (completedChapters.size / 50) * 100;
        document.getElementById('progress-bar').style.width = progress + "%";
        document.getElementById('progress-text').textContent = Math.round(progress) + "% Complété";
        localStorage.setItem('excelMasterProgress', JSON.stringify(Array.from(completedChapters)));
    }

    function showDiploma() {
        display.innerHTML = `
            <div class="certificate-overlay">
                <span class="medal">🏆</span>
                <h2>FÉLICITATIONS !</h2>
                <p>Vous avez complété les 50 chapitres de</p>
                <h3>EXCEL MASTER FUN</h3>
                <p>Ce certificat atteste de votre maîtrise technique et de votre persévérance.</p>
                <div style="margin-top:30px; border-top: 1px solid #ddd; padding-top:20px;">
                    <p><strong>Auteur : Ntsanli Michel</strong></p>
                    <button onclick="window.print()">Imprimer mon certificat</button>
                </div>
            </div>
        `;
    }

    // Initialisation
    updateProgressBar();

    for (let i = 1; i <= 50; i++) {
        const li = document.createElement('li');
        li.id = `chap-${i}`;
        li.textContent = `Chapitre ${i}: ${content[i].t}`;
        
        if (completedChapters.has(i)) {
            li.style.background = "#e8f5e9";
            li.style.borderLeft = "5px solid #ffd700";
        }

        li.onclick = () => {
            const item = content[i];
            if (item.quiz) {
                display.innerHTML = `
                    <h2>${item.t}</h2>
                    <div class="coach-box"><strong>Défi :</strong> ${item.c}</div>
                    <input type="text" id="q-in" placeholder="Réponse ici...">
                    <button id="q-bt">Vérifier</button>
                    <p id="fb" style="margin-top:15px; font-weight:bold;"></p>
                `;
                document.getElementById('q-bt').onclick = () => {
                    const val = document.getElementById('q-in').value.trim();
                    if (val.toUpperCase() === item.answer.toUpperCase()) {
                        completedChapters.add(i);
                        updateProgressBar();
                        li.style.background = "#e8f5e9";
                        li.style.borderLeft = "5px solid #ffd700";
                        if (i === 50) {
                            showDiploma();
                        } else {
                            const f = document.getElementById('fb');
                            f.textContent = item.r;
                            f.style.color = "green";
                        }
                    } else {
                        document.getElementById('fb').textContent = "Indice : " + item.answer;
                        document.getElementById('fb').style.color = "red";
                    }
                };
            } else {
                display.innerHTML = `
                    <h2>${item.t}</h2>
                    <div class="coach-box"><strong>Coach Excelix:</strong> ${item.c}</div>
                    <button id="simple-btn">${item.a}</button>
                    <p id="fb" style="margin-top:15px; color:green; font-weight:bold;"></p>
                `;
                document.getElementById('simple-btn').onclick = () => {
                    completedChapters.add(i);
                    updateProgressBar();
                    li.style.background = "#e8f5e9";
                    li.style.borderLeft = "5px solid #ffd700";
                    document.getElementById('fb').textContent = item.r;
                    if (i === 50) showDiploma();
                };
            }
        };
        list.appendChild(li);
    }
});
