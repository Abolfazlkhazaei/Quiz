const questions = [
    {
        question : "which is largest animal in the world?",
        answers : [
            { text : "Shark", correct : false},
            { text : "Blue whale", correct : true},
            { text : "Elephant", correct : false},
            { text : "Giraffe", correct : false},

        ]
    },
    {
        question : "which  is the smallest continent in the world?",
        answers : [
            { text : "Asia", correct : false},
            { text : "Australia", correct : true},
            { text : "Arctic", correct : false},
            { text : "Africa", correct : false},
        ]
    },
    {
        question : "which is largest desrt in the world?",
        answers : [
            { text : "kalahari", correct : false},
            { text : "Gobi", correct : false},
            { text : "Sahara", correct : false},
            { text : "Antarctica", correct : true},
        ]
    },
    {
        question : "which is smallest country in the world?",
        answers : [
            { text : "Vatican City", correct : true},
            { text : "Bhutan", correct : false},
            { text : "Nepal", correct : false},
            { text : "Qatar", correct : false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");
 
let currentQuestionIndex = 0;
let score = 0;
function startQuiz(){
    currentQuestionIndex  = 0;
    score =0;
    nextbutton.innerHTML = "Next";
    showQuestion()

}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer =>{
        const button =  document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",SelectAnswer)
    })
}

function resetState(){
    nextbutton.style.display = "none";
   while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
   }
}
function SelectAnswer(e){
    const selectbtn = e.target;
    const iscorrect = selectbtn.dataset.correct === "true";
    if(iscorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextbutton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}

function handelnextbutton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handelnextbutton();
    }else{
        startQuiz();
    }
})
startQuiz();