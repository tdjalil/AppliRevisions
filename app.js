let fiches = [];
let currentFicheIndex = 0;

const btnGenFiche = document.getElementById("genFiche");
const btnPrev = document.getElementById("prevFiche");
const btnNext = document.getElementById("nextFiche");
const btnSave = document.getElementById("saveFiches");
const ficheTitle = document.getElementById("ficheTitle");
const ficheContent = document.getElementById("ficheContent");
const quizAnswer = document.getElementById("quizAnswer");
const btnCheckQuiz = document.getElementById("checkQuiz");
const tableBody = document.getElementById("tableBody");

function genererFiche() {
    const sujets = ["Maths", "Histoire", "Géographie", "Français", "SVT"];
    const contenus = [
        "Résumé du chapitre 1...",
        "Points clés à retenir...",
        "Exemples pratiques...",
        "Dates importantes...",
        "Formules à connaître..."
    ];

    const sujet = sujets[Math.floor(Math.random() * sujets.length)];
    const contenu = contenus[Math.floor(Math.random() * contenus.length)];

    const fiche = { sujet, contenu };
    fiches.push(fiche);
    currentFicheIndex = fiches.length - 1;
    afficherFiche(currentFicheIndex);
    majTableau();
}

function afficherFiche(index) {
    if(fiches[index]) {
        ficheTitle.textContent = fiches[index].sujet;
        ficheContent.textContent = fiches[index].contenu;
    }
}

function fichePrecedente() {
    if(currentFicheIndex > 0) {
        currentFicheIndex--;
        afficherFiche(currentFicheIndex);
    }
}

function ficheSuivante() {
    if(currentFicheIndex < fiches.length - 1) {
        currentFicheIndex++;
        afficherFiche(currentFicheIndex);
    }
}

function checkQuiz() {
    if(!fiches[currentFicheIndex]) return;
    const userAnswer = quizAnswer.value.trim();
    if(userAnswer === fiches[currentFicheIndex].contenu) {
        alert("✅ Correct !");
    } else {
        alert("❌ Essaie encore !");
    }
}

function saveFiches() {
    localStorage.setItem("fiches", JSON.stringify(fiches));
    alert("💾 Fiches sauvegardées !");
}

function loadFiches() {
    const data = localStorage.getItem("fiches");
    if(data) {
        fiches = JSON.parse(data);
        afficherFiche(currentFicheIndex);
        majTableau();
    }
}

function majTableau() {
    tableBody.innerHTML = "";
    fiches.forEach((f, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${index+1}</td><td>${f.sujet}</td><td>${f.contenu}</td>`;
        tableBody.appendChild(row);
    });
}

btnGenFiche.addEventListener("click", genererFiche);
btnPrev.addEventListener("click", fichePrecedente);
btnNext.addEventListener("click", ficheSuivante);
btnSave.addEventListener("click", saveFiches);
btnCheckQuiz.addEventListener("click", checkQuiz);

loadFiches();
