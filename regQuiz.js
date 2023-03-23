const questions = [
    {
        question: "Which of the following characters in regular expressions matches any single character?",
        optionA: ".",
        optionB: "+",
        optionC: "*",
        optionD: "[]",
        correctOption: "optionA"
    },

    {
        question: "Which of the following regular expressions matches a string containing only digits ?",
        optionA: "\d+",
        optionB: "\D+",
        optionC: "\w+",
        optionD: "\W+",
        correctOption: "optionA"
    },

    {
        question: "Which of these regular expressions matches a string starting with the letter 'a' and ending with 'z' ?",
        optionA: "a.*z",
        optionB: "^a.*z$",
        optionC: "[a-z]",
        optionD: "a-z",
        correctOption: "optionB"
    },

    {
        question: "Which of these regular expressions matches a string containing any number of characters between the letters 'a' and 'z', inclusive ?",
        optionA: "[a-z]*",
        optionB: "[a-z]{1,}",
        optionC: "[a-z]{0,}",
        optionD: "[a-z]+",
        correctOption: "optionD"
    },

    {
        question: "Which of the following characters matches any whitespace character? ?",
        optionA: "_",
        optionB: "/w",
        optionC: "/s",
        optionD: ".",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is an example of a problem that can be solved using recursion ?",
        optionA: "Calculating the sum of an array of numbers",
        optionB: "Sorting an array of strings in alphabetical order",
        optionC: "Displaying a message to the user",
        optionD: "Checking whether a number is prime or not",
        correctOption: "optionA"
    },

    {
        question: "Which of the following characters matches the start of a String ?",
        optionA: "^",
        optionB: "$",
        optionC: "/",
        optionD: "/n",
        correctOption: "optionD"
    },

    {
        question: "Which of these regex matches a string containing any number of characters except the letters 'x' and 'y' ?",
        optionA: "[^xy]+",
        optionB: "[xy]*",
        optionC: "[^xy]*",
        optionD: "[xy]+",
        correctOption: "optionC"
    },


    {
        question: "Which of these answers does this regex not represent: ba[gdr] ?",
        optionA: "bag",
        optionB: "bar",
        optionC: "ba",
        optionD: "bad",
        correctOption: "optionC"
    },

    {
        question: "Which of these answers is correct for this regex: ca[^rtb] ?",
        optionA: "car",
        optionB: "cart",
        optionC: "cat",
        optionD: "cap",
        correctOption: "optionD"
    },

    {
        question: "Which of these answers does this regex accept : Colou?r ?",
        optionA: "Color",
        optionB: "Colou",
        optionC: "Colr",
        optionD: "All of the above",
        correctOption: "optionA"
    },

    {
        question: "Which of these answers does this regex accept : x{3,} ?",
        optionA: "x",
        optionB: "xx",
        optionC: "xxxx",
        optionD: "None of the above",
        correctOption: "optionC"
    }

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let qNum = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("qnum").innerHTML = qNum
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "lightgreen"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                qNum++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "lightgreen"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                qNum++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "More hours of work needed, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Good, but keep practicing."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep working hard."
        remarkColor = "lightgreen"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong').innerHTML = wrongAttempt
    document.getElementById('right').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    qNum = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}