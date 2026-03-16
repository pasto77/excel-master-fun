document.addEventListener('DOMContentLoaded', () => {
    const chaptersList = document.getElementById('chapters-list');
    const lessonContent = document.getElementById('lesson-content');

    const content = {
        1: { title: "Les Fondations", coach: "Une cellule, c'est comme une boîte. Tu peux y mettre ce que tu veux.", action: "Clique pour valider", result: "Bravo ! +10 XP" },
        2: { title: "Saisie de données", coach: "Apprendre à taper sans se tromper est la base.", action: "Appuie sur Entrée", result: "Excellent. +10 XP" },
        3: { title: "Calculs de base", coach: "Oublie la calculette. Tape '=' pour réfléchir.", action: "Tape =1+1", result: "Parfait ! +10 XP" },
        4: { title: "Formatage", coach: "Un tableau sans style est triste. On va le rendre lisible.", action: "Clique pour styliser", result: "Magnifique ! +10 XP" }
    };

    window.loadChapter = function(id) {
        const data = content[id];
        if (!data) {
            lessonContent.innerHTML = `<h2>Chapitre ${id}</h2><p>Ce chapitre est en cours de création, Michel.</p>`;
        } else {
            lessonContent.innerHTML = `
                <h2>${data.title}</h2>
                <div style="margin:20px 0; padding:15px; background:#f0f0f0;"><strong>Excelix :</strong> ${data.coach}</div>
                <button id="action-btn" onclick="triggerAction('${data.result}')" style="padding:10px; background:#217346; color:white; border:none; cursor:pointer;">${data.action}</button>
                <div id="result-area" style="margin-top:20px; font-weight:bold; color:green;"></div>
            `;
        }
    };

    window.triggerAction = function(res) {
        document.getElementById('result-area').textContent = res;
        document.getElementById('action-btn').style.display = 'none';
    };
});
