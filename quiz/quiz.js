// sélection de tous les éléments requis
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector(".header-quiz .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

// gestionnaire d'évènements lorsque le bouton "Commencer le Quiz" qui cliqué
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // afficher la boîte d'infos
}

// gestionnaire d'évènements lorsque le bouton "Quitter" de la boîte d'informations est cliqué
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // masque la boîte d'informations
}

// gestionnaire d'évènements lorsque le bouton "Continuer" de la boîte d'informations est cliqué
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); // masquer la boîte d'informations
    quiz_box.classList.add("activeQuiz"); // afficher la boîte de quiz
    showQuetions(0); // appeler la fonction showQuestions avec l'index de la première question
    queCounter(1); // appeler la fonction queCounter avec la première question
    startTimer(15); // appeler la fonction startTimer avec une durée de 15 secondes
    startTimerLine(0); // appeler la fonction startTimerLine avec une largeur initiale de 0
}

// initialisation des variables
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// sélection des boutons "Recommencer" et "Quitter" de la boîte de résultat
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// gestionnaire d'évènements lorsque le bouton "Recommencer" de la boîte de résultat est cliqué
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); // afficher la boîte de quiz
    result_box.classList.remove("activeResult"); // masquer la boîte de résultats
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // appeler la fonction showQuestions avec l'index de la première question
    queCounter(que_numb); // appeler la fonction queCounter avec la première question
    clearInterval(counter); // effacer le compteur
    clearInterval(counterLine); // effacer le compteur de la ligne de temps
    startTimer(timeValue); // appelle la fonction startTimer avec une durée de 15s
    startTimerLine(widthValue); // appeler la fonction startTimerLine avec une largeur initiale de 0
    timeText.textContent = "Temps"; // modifier le texte du temps restant
    next_btn.classList.remove("show"); // masquer le bouton suivant
}

// gestionnaire d'évènements lorsque le bouton "Quitter" de la boîte de résultats est cliqué
quit_quiz.onclick = ()=>{
    window.location.reload(); // recharger la fenêtre actuelle
}

// sélection du bouton "Prochaine question"
const next_btn = document.querySelector(".footer-quiz .next_btn");
const bottom_ques_counter = document.querySelector(".footer-quiz .total_que");

// gestionnaire d'évènements lorsque le bouton "Prochaine question" est cliqué
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ // vérifier si l'index de la question est inférieur au nombre total de questions
        que_count++; // incrémenter l'index de la question
        que_numb++; // incrémenter le numéro de la question
        showQuetions(que_count); // appeler la fonction showQuestions avec le nouvel index de la question
        queCounter(que_numb); // appeler la fonction queCounter avec le nouveau numéro de la question
        clearInterval(counter); // effacer le compteur
        clearInterval(counterLine); // effacer le compteur de la ligne de temps
        startTimer(timeValue); // appeler la fonction startTimer avec une durée de 15s
        startTimerLine(widthValue); // appeler la fonction startTimerLine avec une largeur initiale de 0
        timeText.textContent = "Temps"; // modifier le texte du temps restant
        next_btn.classList.remove("show"); // masquer le bouton suivant
    }else{
        clearInterval(counter); // effacer le compteur
        clearInterval(counterLine); // effacer le compteur de la ligne de temps
        showResult(); // appeler la fonction showResult pour afficher les résultats
    }
}

// fonction pour afficher les questions et les options
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    // création des balises span et div pour la question et les options
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; // ajouter la balise span à l'intérieur de que_text
    option_list.innerHTML = option_tag; // ajouter la balise div à l'intérieur d'option_tag
    
    const option = option_list.querySelectorAll(".option");

    // attribuer l'attribut onclick à toutes les options disponibles
    for (i=0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// création des balises div pour les icônes des questions
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// fonction appelée lorsqu'une option est sélectionnée
function optionSelected(answer) {
    clearInterval(counter); // effacer le compteur lorsqu'une option est sélectionnée
    clearInterval(counterLine); // effacer le compteur de la ligne de temps lorsqu'une option est sélectionnée
    let userAns = answer.textContent; // stocker la réponse sélectionnée par l'utilisateur
    let correcAns = questions[que_count].answer; // stocker la réponse correcte pour la question actuelle
    const allOptions = option_list.children.length; // récupérer le nombre total d'options de réponses
    
    // vérifier si la réponse sélectionnée est égale à la réponse correcte
    if(userAns == correcAns){ 
        userScore += 1; // incrémenter le score de l'utilisateur
        answer.classList.add("correct"); // ajouter la classe "correct" à l'option sélectionnée
        answer.insertAdjacentHTML("beforeend", tickIconTag); // ajouter la balise div avec l'icône de coche verte à l'option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else { // ie. la réponse sélectionnée est fausse
        answer.classList.add("incorrect"); // ajouter la classe "incorrect" à l'option sélectionnée
        answer.insertAdjacentHTML("beforeend", crossIconTag); // ajouter la balise div avec l'icône de croix rouge à l'option
        console.log("Wrong Answer");

        // si la réponse est incorrecte, afficher la réponse correcte (en vert)
        for (i=0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correcAns) {
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }

    // désactiver la sélection après que l'utilisateur ait choisi une option
    for(i=0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    // afficher le bouton suivant après que l'utilisateur ait choisi une option
    next_btn.classList.add("show"); 
}

// fonction pour afficher les résultats de l'utilisateur
function showResult() {
    info_box.classList.remove("activeInfo"); // cacher l'info box
    quiz_box.classList.remove("activeQuiz"); // cacher la quiz box
    result_box.classList.add("activeResult"); // afficher la result box
    const scoreText = result_box.querySelector(".score_text");

    let congratulationsText = "";
    let scoreDetailsText = "";

    if (userScore > 3) {
        congratulationsText = "Félicitations ! 🎉";
    } else if (userScore > 1) {
        congratulationsText = "Bien joué ! 😎";
    } else {
        congratulationsText = "Oups... 😐";
    }

    scoreDetailsText = `Tu as eu ${userScore} points sur ${questions.length}`;

    // créer des span tags pour chaque partie du texte
    let congratulationsTag = `<span>${congratulationsText}</span>`;
    let scoreDetailsTag = `<span>${scoreDetailsText}</span>`;

    // modifier le contenu HTML de scoreText
    scoreText.innerHTML = congratulationsTag + "<br>" + scoreDetailsTag;
}

// fonction pour démarrer le compte à rebours
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; // mise à jour du texte du compte à rebours
        time--; // décrémentet le temps 
        if(time < 9) { // si le temps restant est inférieur à 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        // si le temps restant est inférieur à 0, arrêter le compteur
        if(time < 0) { 
            clearInterval(counter); 
            timeText.textContent = "Temps"; // modifier le texte du temps restant
            const allOptions = option_list.children.length; // récupérer le nombre total d'options
            let correcAns = questions[que_count].answer; //getting correct answer from array
            // parcourir toutes les options et ajouter la classe "disabled" pour les désactiver
            for(i=0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correcAns){ 
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Temps : Auto selected correct answer.");
                }
            }
            // afficher la réponse correcte surlignée en rouge
            for (i=0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); 
            }
            next_btn.classList.add("show"); // afficher le bouton suivant
        }
    }
}

// fonction pour démarrer la ligne de temps
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; // incrémenter le temps
        time_line.style.width = time + "px"; // mise à jour de la largeur de ligne de temps
        if(time > 549){ // si la largeur de la ligne de temps dépasse la largeur de la boîte de quiz, arrêter le compte à rebours
            clearInterval(counterLine); //clear counterLine
        }
    }
}

// fonction pour afficher le numéro de la question actuelle
function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> sur <p>'+ questions.length +'</p> questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  // ajoute la balise de bottom_ques_counter
}
