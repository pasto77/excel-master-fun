document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('chapters-list');
    const display = document.getElementById('lesson-content');

    const content = {
        1: { t: "Les Fondations", c: "Une cellule est une boîte pour vos données.", a: "Valider", r: "+10 XP" },
        2: { t: "Saisie de données", c: "La précision est la clé du succès.", a: "Saisir", r: "+10 XP" },
        3: { t: "Calculs de base", c: "Utilisez '=' pour lancer un calcul.", a: "Calculer", r: "+10 XP" },
        4: { t: "Formatage", c: "Rendez vos données professionnelles.", a: "Styliser", r: "+10 XP" },
        5: { t: "Somme auto", c: "Additionnez tout en un clic.", a: "Sommer", r: "+20 XP" }
    };

    for (let i = 1; i <= 50; i++) {
        const li = document.createElement('li');
        li.textContent = `Chapitre ${i}: ${content[i] ? content[i].t : 'À venir'}`;
        li.onclick = () => {
            const item = content[i];
            if (item) {
                display.innerHTML = `
                    <h2>${item.t}</h2>
                    <div class="coach-box"><strong>Excelix:</strong> ${item.c}</div>
                    <button id="btn-action">${item.a}</button>
                    <p id="feedback" style="margin-top:15px; color:green; font-weight:bold;"></p>
                `;
                document.getElementById('btn-action').onclick = () => {
                    document.getElementById('feedback').textContent = item.r;
                };
            } else {
                display.innerHTML = `<h2>Chapitre ${i}</h2><p>Contenu en cours de rédaction.</p>`;
            }
        };
        list.appendChild(li);
    }
});
