document.addEventListener('DOMContentLoaded', () => {
    const chaptersList = document.getElementById('chapters-list');
    const lessonContent = document.getElementById('lesson-content');

    const content = {
        1: {
            title: "Les Fondations : C'est quoi ce truc ?",
            coach: "Salut ! Je suis Excelix. T'as peur d'Excel ? Normal, c'est un monstre à première vue. Mais regarde, c'est juste un grand tableau avec des cases.",
            action: "Clique pour ton premier succès",
            result: "BRAVO ! Tu vois, rien n'a explosé. Badge débloqué : 'J'ai osé ouvrir Excel'. (+10 XP)"
        }
    };

    function getChapterTitle(id) {
        const titles = ["Les Fondations", "Saisie de données", "Calculs de base", "Formatage"];
        return titles[id-1] || "À venir...";
    }

    // Génération automatique des 50 chapitres
    for (let i = 1; i <= 50; i++) {
        let li = document.createElement('li');
        li.textContent = `Chapitre ${i} : ${getChapterTitle(i)}`;
        li.style.cursor = "pointer";
        li.onclick = () => loadChapter(i);
        chaptersList.appendChild(li);
    }

    window.loadChapter = function(id) {
        const data = content[id];
        if (!data) {
            lessonContent.innerHTML = `<h2>Chapitre ${id}</h2><p>Ce chapitre est en cours de création, Michel.</p>`;
            return;
        }
        lessonContent.innerHTML = `
            <h2>${data.title}</h2>
            <hr>
            <div id="coach-box" style="margin:20px 0; padding:15px; background:#f0f0f0;"><strong>Excelix :</strong> ${data.coach}</div>
            <button id="action-btn" onclick="triggerAction('${data.result}')" style="padding:10px; background:#217346; color:white; border:none; cursor:pointer;">${data.action}</button>
            <div id="result-area" style="margin-top:20px; font-weight:bold; color:green;"></div>
        `;
    };

    window.triggerAction = function(res) {
        document.getElementById('result-area').textContent = res;
        document.getElementById('action-btn').style.display = 'none';
    };
});
