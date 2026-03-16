document.addEventListener('DOMContentLoaded', () => {
    const chaptersList = document.getElementById('chapters-list');
    const lessonContent = document.getElementById('lesson-content');

    // Génération automatique des 50 chapitres
    for (let i = 1; i <= 50; i++) {
        let li = document.createElement('li');
        li.textContent = `Chapitre ${i} : ${getChapterTitle(i)}`;
        li.onclick = () => loadChapter(i);
        chaptersList.appendChild(li);
    }

    function getChapterTitle(id) {
        const titles = ["Les Fondations", "Saisie de données", "Calculs de base", "Formatage"];
        return titles[id-1] || "À venir...";
    }

    function loadChapter(id) {
        lessonContent.innerHTML = `
            <h2>Chapitre ${id} : ${getChapterTitle(id)}</h2>
            <hr>
            <p>Ici commencera le contenu interactif du chapitre ${id}.</p>
            <button style="margin-top:20px; padding:10px; background:#217346; color:white; border:none; cursor:pointer;">
                Valider cet exercice (+10 XP)
            </button>
        `;
    }
});
