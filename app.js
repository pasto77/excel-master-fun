document.addEventListener('DOMContentLoaded', () => {
    const chaptersList = document.getElementById('chapters-list');
    const lessonContent = document.getElementById('lesson-content');

    const content = {
        1: { title: "Les Fondations", coach: "Une cellule est une boîte. Tu peux y mettre ce que tu veux.", action: "Clique pour valider", result: "Bravo ! +10 XP" },
        2: { title: "Saisie de données", coach: "Taper sans erreur est la base.", action: "Appuie sur Entrée", result: "Excellent. +10 XP" },
        3: { title: "Calculs de base", coach: "Tape '=' pour calculer.", action: "Tape =1+1", result: "Parfait ! +10 XP" },
        4: { title: "Formatage", coach: "Rends ton tableau lisible.", action: "Clique pour styliser", result: "Magnifique ! +10 XP" },
        5: { title: "Somme auto", coach: "SOMME est ton premier super-pouvoir.", action: "Applique SOMME", result: "Calcul instantané ! +20 XP" },
        6: { title: "Moyenne", coach: "La moyenne montre la tendance.", action: "Calcule la moyenne", result: "Tendance identifiée. +20 XP" },
        7: { title: "Min et Max", coach: "Identifie tes extrêmes.", action: "Trouve le max", result: "Extrême détecté. +20 XP" },
        8: { title: "Multiplication", coach: "La base pour les prix.", action: "Multiplie tes valeurs", result: "Facturation prête. +20 XP" },
        9: { title: "Division", coach: "Partage tes ressources.", action: "Divise ton stock", result: "Répartition faite. +20 XP" },
        10: { title: "Le compte est bon", coach: "Jeu : atteint 100.", action: "Lance le défi", result: "Cible atteinte ! +50 XP" }
    };

    window.loadChapter = (id) => {
        const data = content[id];
        if (!data) {
            lessonContent.innerHTML = `<h2>Chapitre ${id}</h2><p>À venir...</p>`;
        } else {
            lessonContent.innerHTML = `
                <h2>${data.title}</h2>
                <div class="coach-box"><strong>Excelix :</strong> ${data.coach}</div>
                <button id="action-btn" onclick="triggerAction('${data.result}')">${data.action}</button>
                <div id="result-area"></div>
            `;
        }
    };

    window.triggerAction = (res) => {
        document.getElementById('result-area').textContent = res;
        document.getElementById('action-btn').style.display = 'none';
    };

    for (let i = 1; i <= 50; i++) {
        let li = document.createElement('li');
        li.textContent = `Chapitre ${i} ${content[i] ? ": " + content[i].title : ": À venir..."}`;
        li.style.cursor = "pointer";
        li.onclick = () => loadChapter(i);
        chaptersList.appendChild(li);
    }
});
