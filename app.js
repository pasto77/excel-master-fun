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
        10: { t: "Graphiques", c: "Un dessin vaut mille chiffres.", a: "Tracer", r: "Superbe courbe ! Niveau 1 terminé. +100 XP" }
    };

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
