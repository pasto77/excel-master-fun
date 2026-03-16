document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('chapters-list');
    const display = document.getElementById('lesson-content');

    const content = {
        1: { t: "Les Fondations", c: "Une cellule est une boîte pour vos données.", a: "Valider", r: "+10 XP" },
        2: { t: "Saisie de données", c: "La précision est la clé du succès.", a: "Saisir", r: "+10 XP" },
        3: { t: "Calculs de base", c: "Utilisez '=' pour lancer un calcul.", a: "Calculer", r: "+10 XP" },
        4: { t: "Formatage", c: "Rendez vos données professionnelles.", a: "Styliser", r: "+10 XP" },
        5: { t: "Somme auto", c: "Additionnez tout en un clic.", a: "Sommer", r: "+20 XP" },
        6: { t: "Défi : La Moyenne", c: "Formule pour la moyenne de A1 à A10 ?", quiz: true, answer: "=MOYENNE(A1:A10)", r: "Correct ! +50 XP" }
    };

    for (let i = 1; i <= 50; i++) {
        const li = document.createElement('li');
        li.textContent = `Chapitre ${i}: ${content[i] ? content[i].t : 'À venir'}`;
        li.style.cursor = "pointer";
        li.onclick = () => {
            const item = content[i];
            if (item && item.quiz) {
                display.innerHTML = `<h2>${item.t}</h2><div class="coach-box">${item.c}</div><input type="text" id="q-in" style="padding:10px;"><button id="q-bt">Vérifier</button><p id="fb"></p>`;
                document.getElementById('q-bt').onclick = () => {
                    const isOk = document.getElementById('q-in').value.toUpperCase().trim() === item.answer;
                    const f = document.getElementById('fb');
                    f.textContent = isOk ? item.r : "Faux. Indice : " + item.answer;
                    f.style.color = isOk ? "green" : "red";
                };
            } else if (item) {
                display.innerHTML = `<h2>${item.t}</h2><div class="coach-box">${item.c}</div><button onclick="document.getElementById('fb').textContent='${item.r}'">${item.a}</button><p id="fb" style="color:green; font-weight:bold;"></p>`;
            } else {
                display.innerHTML = `<h2>Chapitre ${i}</h2><p>Contenu en cours...</p>`;
            }
        };
        list.appendChild(li);
    }
});
