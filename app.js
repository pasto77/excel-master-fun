document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('chapters-list');
    const display = document.getElementById('lesson-content');
    
    // GESTION LANGUE & MÉMOIRE
    let currentLang = localStorage.getItem('excelLang') || 'fr';
    let savedData = localStorage.getItem('excelMasterProgress');
    let completedChapters = savedData ? new Set(JSON.parse(savedData)) : new Set();

    const translations = {
        fr: {
            welcome: "Bienvenue, Maître !",
            desc: "Sélectionnez un chapitre à gauche pour commencer votre ascension.",
            valBtn: "Valider",
            checkBtn: "Vérifier",
            certTitle: "FÉLICITATIONS !",
            certDesc: "Vous avez complété les 50 chapitres de EXCEL MASTER FUN.",
            certAuth: "Auteur : Ntsanli Michel",
            print: "Imprimer mon certificat",
            hint: "Indice : ",
            chapters: {
                1: { t: "Les Fondations", c: "Une cellule est une boîte pour vos données.", a: "Valider", r: "+10 XP" },
                2: { t: "Saisie de données", c: "La précision est la clé du succès.", a: "Saisir", r: "+10 XP" },
                3: { t: "Calculs de base", c: "Utilisez '=' pour lancer un calcul.", a: "Calculer", r: "+10 XP" },
                4: { t: "Formatage", c: "Rendez vos données professionnelles.", a: "Styliser", r: "+10 XP" },
                5: { t: "Somme auto", c: "Additionnez tout en un clic.", a: "Sommer", r: "+20 XP" },
                6: { t: "Défi : La Moyenne", c: "Formule pour la moyenne de A1 à A10 ?", quiz: true, ans: "=MOYENNE(A1:A10)", r: "Correct ! +50 XP" },
                7: { t: "Le secret du '$'", c: "Comment figer la cellule B1 ?", quiz: true, ans: "$B$1", r: "Gagné ! +50 XP" },
                8: { t: "La fonction SI", c: "Si A1 > 10, affiche 'OK', sinon 'NON' ?", quiz: true, ans: '=SI(A1>10;"OK";"NON")', r: "Logique parfaite !" },
                9: { t: "Tri & Filtres", c: "Classez vos données de A à Z.", a: "Classer", r: "+20 XP" },
                10: { t: "Graphiques", c: "Un dessin vaut mille chiffres.", a: "Tracer", r: "Niveau 1 terminé !" },
                11: { t: "RECHERCHEV", c: "Cherche A1 dans D1:E10, col 2.", quiz: true, ans: "=RECHERCHEV(A1;D1:E10;2;0)", r: "Magique !" },
                12: { t: "TCD", c: "Synthétisez des milliers de lignes.", a: "Générer", r: "+30 XP" },
                13: { t: "Doublons", c: "Supprimer les répétitions.", a: "Nettoyer", r: "+20 XP" },
                14: { t: "Listes déroulantes", c: "Outil pour créer un menu ?", quiz: true, ans: "Validation des données", r: "Exact !" },
                15: { t: "Calcul de dates", c: "Écart en jours entre A1 et B1 ?", quiz: true, ans: "=B1-A1", r: "+40 XP" },
                16: { t: "Figer les Volets", c: "Gardez les titres visibles.", a: "Figer", r: "+20 XP" },
                17: { t: "Mise en forme Cond.", c: "Colorer selon la valeur.", a: "Colorer", r: "+30 XP" },
                18: { t: "Protection", c: "Onglet pour verrouiller ?", quiz: true, ans: "Révision", r: "Sécurisé !" },
                19: { t: "Somme SI", c: "Somme de A1:A10 si > 100 ?", quiz: true, ans: '=SOMME.SI(A1:A10;">100")', r: "+70 XP" },
                20: { t: "EXAMEN : Niveau 2", c: "Compter les cellules non vides ?", quiz: true, ans: "=NBVAL", r: "Niveau 2 validé !" },
                21: { t: "GAUCHE", c: "Prendre les 3 premiers caractères de A1 ?", quiz: true, ans: "=GAUCHE(A1;3)", r: "+40 XP" },
                22: { t: "DROITE", c: "Prendre les 2 derniers caractères de A1 ?", quiz: true, ans: "=DROITE(A1;2)", r: "+40 XP" },
                23: { t: "CONCAT", c: "Coller A1 et B1 ?", quiz: true, ans: "=CONCAT(A1;B1)", r: "+50 XP" },
                24: { t: "SUPPRESPACE", c: "Supprimer les espaces inutiles ?", quiz: true, ans: "=SUPPRESPACE(A1)", r: "+50 XP" },
                25: { t: "MAJUSCULE", c: "Mettre A1 en majuscules ?", quiz: true, ans: "=MAJUSCULE(A1)", r: "+30 XP" },
                26: { t: "TROUVE", c: "Chercher la position d'un texte ?", quiz: true, ans: "=TROUVE(A1)", r: "+60 XP" },
                27: { t: "SUBSTITUE", c: "Changer un mot par un autre ?", quiz: true, ans: "=SUBSTITUE(A1)", r: "+60 XP" },
                28: { t: "NBCAR", c: "Compter la longueur du texte ?", quiz: true, ans: "=NBCAR(A1)", r: "+40 XP" },
                29: { t: "VALEUR", c: "Texte en chiffre ?", quiz: true, ans: "=VALEUR(A1)", r: "+50 XP" },
                30: { t: "EXAMEN : Niveau 3", c: "1ère lettre en Majuscule ?", quiz: true, ans: "=NOMPROPRE(A1)", r: "Niveau 3 validé !" },
                31: { t: "SI imbriqués", c: "A1>10 'Top', A1>5 'Moyen' ?", quiz: true, ans: '=SI(A1>10;"Top";SI(A1>5;"Moyen";"Bas"))', r: "Pro !" },
                32: { t: "ET", c: "A1 > 0 ET B1 < 100 ?", quiz: true, ans: "=ET(A1>0;B1<100)", r: "+50 XP" },
                33: { t: "OU", c: "A1 = 'OUI' OU 'YES' ?", quiz: true, ans: '=OU(A1="OUI";A1="YES")', r: "+50 XP" },
                34: { t: "SIERREUR", c: "Si erreur, afficher 0 ?", quiz: true, ans: "=SIERREUR(A1;0)", r: "+60 XP" },
                35: { t: "NB.SI.ENS", c: "A1:A10='Ventes' et B1:B10>100 ?", quiz: true, ans: '=NB.SI.ENS(A1:A10;"Ventes";B1:B10;">100")', r: "+80 XP" },
                36: { t: "RECHERCHEX", c: "Remplace RECHERCHEV ?", quiz: true, ans: "=RECHERCHEX", r: "Futuriste !" },
                37: { t: "SOMMEPROD", c: "Total (Prix * Qté) ?", quiz: true, ans: "=SOMMEPROD(A1:A10;B1:B10)", r: "+90 XP" },
                38: { t: "FIN.MOIS", c: "Dernier jour du mois de A1 ?", quiz: true, ans: "=FIN.MOIS(A1;0)", r: "+70 XP" },
                39: { t: "Année Actuelle", c: "Extraire l'année d'aujourd'hui ?", quiz: true, ans: "=ANNEE(AUJOURDHUI())", r: "+60 XP" },
                40: { t: "EXAMEN : Niveau 4", c: "Logique ET/OU ?", quiz: true, ans: "Booléenne", r: "Niveau 4 validé !" },
                41: { t: "VBA", c: "Langage des macros ?", quiz: true, ans: "VBA", r: "+50 XP" },
                42: { t: "Développeur", c: "Onglet pour les macros ?", quiz: true, ans: "Développeur", r: "+40 XP" },
                43: { t: "Extensions", c: "Fichier Excel avec macros ?", quiz: true, ans: ".xlsm", r: "+40 XP" },
                44: { t: "Sécurité", c: "Alerte jaune à l'ouverture ?", quiz: true, ans: "Avertissement de sécurité", r: "+30 XP" },
                45: { t: "MsgBox", c: "VBA pour un message ?", quiz: true, ans: "MsgBox", r: "Codeur !" },
                46: { t: "VBA : Variables", c: "Déclarer 'Nom' en texte ?", quiz: true, ans: "Dim Nom As String", r: "+60 XP" },
                47: { t: "VBA : Boucles", c: "Répéter une action ?", quiz: true, ans: "For Each", r: "+80 XP" },
                48: { t: "Power Query", c: "Nettoyer des données externes ?", quiz: true, ans: "Power Query", r: "+70 XP" },
                49: { t: "Valeur cible", c: "Trouver un résultat voulu ?", quiz: true, ans: "Valeur cible", r: "+60 XP" },
                50: { t: "DIPLÔME FINAL", c: "Sauvegarder ?", quiz: true, ans: "CTRL+S", r: "MAÎTRE EXCEL !" }
            }
        },
        en: {
            welcome: "Welcome, Master!",
            desc: "Select a chapter on the left to start your journey.",
            valBtn: "Validate",
            checkBtn: "Check",
            certTitle: "CONGRATULATIONS!",
            certDesc: "You have completed the 50 chapters of EXCEL MASTER FUN.",
            certAuth: "Author: Ntsanli Michel",
            print: "Print my certificate",
            hint: "Hint: ",
            chapters: {
                1: { t: "Foundations", c: "A cell is a box for your data.", a: "Validate", r: "+10 XP" },
                2: { t: "Data Entry", c: "Precision is the key to success.", a: "Enter", r: "+10 XP" },
                3: { t: "Basic Maths", c: "Use '=' to start a calculation.", a: "Calculate", r: "+10 XP" },
                4: { t: "Formatting", c: "Make your data look professional.", a: "Style", r: "+10 XP" },
                5: { t: "AutoSum", c: "Add everything with one click.", a: "Sum", r: "+20 XP" },
                6: { t: "Average Challenge", c: "Formula for average of A1 to A10 ?", quiz: true, ans: "=AVERAGE(A1:A10)", r: "Correct! +50 XP" },
                7: { t: "The '$' Secret", c: "How to freeze cell B1 ?", quiz: true, ans: "$B$1", r: "Winner! +50 XP" },
                8: { t: "IF Function", c: "If A1 > 10, show 'OK', else 'NO' ?", quiz: true, ans: '=IF(A1>10,"OK","NO")', r: "Perfect logic!" },
                9: { t: "Sort & Filter", c: "Organize your data A to Z.", a: "Sort", r: "+20 XP" },
                10: { t: "Charts", c: "A picture is worth a thousand numbers.", a: "Draw", r: "Level 1 Complete!" },
                11: { t: "VLOOKUP", c: "Search A1 in D1:E10, col 2.", quiz: true, ans: "=VLOOKUP(A1,D1:E10,2,0)", r: "Magic!" },
                12: { t: "Pivot Tables", c: "Summarize thousands of rows.", a: "Generate", r: "+30 XP" },
                13: { t: "Duplicates", c: "Remove repeated entries.", a: "Clean", r: "+20 XP" },
                14: { t: "Drop-down Lists", c: "Tool to create a menu ?", quiz: true, ans: "Data Validation", r: "Exact!" },
                15: { t: "Date Calculation", c: "Days between A1 and B1 ?", quiz: true, ans: "=B1-A1", r: "+40 XP" },
                16: { t: "Freeze Panes", c: "Keep titles visible.", a: "Freeze", r: "+20 XP" },
                17: { t: "Cond. Formatting", c: "Color based on value.", a: "Color", r: "+30 XP" },
                18: { t: "Protection", c: "Tab to lock a sheet ?", quiz: true, ans: "Review", r: "Secured!" },
                19: { t: "SUMIF", c: "Sum A1:A10 if > 100 ?", quiz: true, ans: '=SUMIF(A1:A10,">100")', r: "+70 XP" },
                20: { t: "EXAM : Level 2", c: "Count non-empty cells ?", quiz: true, ans: "=COUNTA", r: "Level 2 Validated!" },
                21: { t: "LEFT", c: "Take first 3 chars of A1 ?", quiz: true, ans: "=LEFT(A1,3)", r: "+40 XP" },
                22: { t: "RIGHT", c: "Take last 2 chars of A1 ?", quiz: true, ans: "=RIGHT(A1,2)", r: "+40 XP" },
                23: { t: "CONCAT", c: "Join A1 and B1 ?", quiz: true, ans: "=CONCAT(A1,B1)", r: "+50 XP" },
                24: { t: "TRIM", c: "Remove useless spaces ?", quiz: true, ans: "=TRIM(A1)", r: "+50 XP" },
                25: { t: "UPPER", c: "Make A1 uppercase ?", quiz: true, ans: "=UPPER(A1)", r: "+30 XP" },
                26: { t: "FIND", c: "Search text position ?", quiz: true, ans: "=FIND(A1)", r: "+60 XP" },
                27: { t: "SUBSTITUTE", c: "Change one word for another ?", quiz: true, ans: "=SUBSTITUTE(A1)", r: "+60 XP" },
                28: { t: "LEN", c: "Count text length ?", quiz: true, ans: "=LEN(A1)", r: "+40 XP" },
                29: { t: "VALUE", c: "Text to number ?", quiz: true, ans: "=VALUE(A1)", r: "+50 XP" },
                30: { t: "EXAM : Level 3", c: "First letter to Uppercase ?", quiz: true, ans: "=PROPER(A1)", r: "Level 3 Validated!" },
                31: { t: "Nested IF", c: "A1>10 'Top', A1>5 'Mid' ?", quiz: true, ans: '=IF(A1>10,"Top",IF(A1>5,"Mid","Low"))', r: "Pro!" },
                32: { t: "AND", c: "A1 > 0 AND B1 < 100 ?", quiz: true, ans: "=AND(A1>0,B1<100)", r: "+50 XP" },
                33: { t: "OR", c: "A1 = 'YES' OR 'OUI' ?", quiz: true, ans: '=OR(A1="YES",A1="OUI")', r: "+50 XP" },
                34: { t: "IFERROR", c: "If error, show 0 ?", quiz: true, ans: "=IFERROR(A1,0)", r: "+60 XP" },
                35: { t: "COUNTIFS", c: "A1:A10='Sales' and B1:B10>100 ?", quiz: true, ans: '=COUNTIFS(A1:A10,"Sales",B1:B10,">100")', r: "+80 XP" },
                36: { t: "XLOOKUP", c: "Replaces VLOOKUP ?", quiz: true, ans: "=XLOOKUP", r: "Futuristic!" },
                37: { t: "SUMPRODUCT", c: "Total (Price * Qty) ?", quiz: true, ans: "=SUMPRODUCT(A1:A10,B1:B10)", r: "+90 XP" },
                38: { t: "EOMONTH", c: "Last day of month A1 ?", quiz: true, ans: "=EOMONTH(A1,0)", r: "+70 XP" },
                39: { t: "Current Year", c: "Extract today's year ?", quiz: true, ans: "=YEAR(TODAY())", r: "+60 XP" },
                40: { t: "EXAM : Level 4", c: "AND/OR logic name ?", quiz: true, ans: "Boolean", r: "Level 4 Validated!" },
                41: { t: "VBA", c: "Macro language name ?", quiz: true, ans: "VBA", r: "+50 XP" },
                42: { t: "Developer", c: "Tab for macros ?", quiz: true, ans: "Developer", r: "+40 XP" },
                43: { t: "Extensions", c: "Excel file with macros ?", quiz: true, ans: ".xlsm", r: "+40 XP" },
                44: { t: "Security", c: "Yellow alert at opening ?", quiz: true, ans: "Security warning", r: "+30 XP" },
                45: { t: "MsgBox", c: "VBA for a message ?", quiz: true, ans: "MsgBox", r: "Coder!" },
                46: { t: "VBA : Variables", c: "Declare 'Name' as text ?", quiz: true, ans: "Dim Name As String", r: "+60 XP" },
                47: { t: "VBA : Loops", c: "Repeat an action ?", quiz: true, ans: "For Each", r: "+80 XP" },
                48: { t: "Power Query", c: "Clean external data ?", quiz: true, ans: "Power Query", r: "+70 XP" },
                49: { t: "Goal Seek", c: "Find a specific result ?", quiz: true, ans: "Goal Seek", r: "+60 XP" },
                50: { t: "FINAL DIPLOMA", c: "Save your work shortcut ?", quiz: true, ans: "CTRL+S", r: "EXCEL MASTER!" }
            }
        }
    };

    const lang = translations[currentLang];

    window.changeLanguage = (l) => {
        localStorage.setItem('excelLang', l);
        location.reload();
    };

    function updateProgressBar() {
        const progress = (completedChapters.size / 50) * 100;
        document.getElementById('progress-bar').style.width = progress + "%";
        document.getElementById('progress-text').textContent = Math.round(progress) + "%";
        localStorage.setItem('excelMasterProgress', JSON.stringify(Array.from(completedChapters)));
    }

    function showDiploma() {
        display.innerHTML = `
            <div class="certificate-overlay">
                <span class="medal">🏆</span>
                <h2>${lang.certTitle}</h2>
                <p>${lang.certDesc}</p>
                <div style="margin-top:30px; border-top: 1px solid #ddd; padding-top:20px;">
                    <p><strong>${lang.certAuth}</strong></p>
                    <button onclick="window.print()">${lang.print}</button>
                </div>
            </div>
        `;
    }

    updateProgressBar();

    for (let i = 1; i <= 50; i++) {
        const li = document.createElement('li');
        const chData = lang.chapters[i];
        li.textContent = `Cap. ${i}: ${chData.t}`;
        if (completedChapters.has(i)) { li.style.borderLeft = "5px solid #ffd700"; li.style.background = "#e8f5e9"; }

        li.onclick = () => {
            if (chData.quiz) {
                display.innerHTML = `
                    <h2>${chData.t}</h2>
                    <div class="coach-box">${chData.c}</div>
                    <input type="text" id="q-in" placeholder="...">
                    <button id="q-bt">${lang.checkBtn}</button>
                    <p id="fb" style="margin-top:10px;"></p>
                `;
                document.getElementById('q-bt').onclick = () => {
                    const val = document.getElementById('q-in').value.trim();
                    if (val.toUpperCase() === chData.ans.toUpperCase()) {
                        completedChapters.add(i); updateProgressBar();
                        li.style.background = "#e8f5e9"; li.style.borderLeft = "5px solid #ffd700";
                        if (i === 50) showDiploma(); else document.getElementById('fb').innerHTML = `<span style="color:green">${chData.r}</span>`;
                    } else {
                        document.getElementById('fb').innerHTML = `<span style="color:red">${lang.hint} ${chData.ans}</span>`;
                    }
                };
            } else {
                display.innerHTML = `<h2>${chData.t}</h2><div class="coach-box">${chData.c}</div><button id="s-bt">${chData.a}</button><p id="fb"></p>`;
                document.getElementById('s-bt').onclick = () => {
                    completedChapters.add(i); updateProgressBar();
                    li.style.background = "#e8f5e9"; li.style.borderLeft = "5px solid #ffd700";
                    document.getElementById('fb').innerHTML = `<span style="color:green">${chData.r}</span>`;
                    if (i === 50) showDiploma();
                };
            }
        };
        list.appendChild(li);
    }
});
