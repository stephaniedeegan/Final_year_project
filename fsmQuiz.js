const questions = [
    {
        question: "What is a finite state machine ?",
        optionA: "A machine that can only accept finite inputs",
        optionB: "A mathematical model of computation that describes a system's behavior as a set of states and transitions",
        optionC: "A machine that can accept infinite inputs",
        optionD: "A machine that can only accept binary inputs",
        correctOption: "optionB"
    },

    {
        question: "What is a state in a finite state machine ?",
        optionA: "A set of inputs that the machine can accept",
        optionB: "A condition or situation in which the machine can be found",
        optionC: "A type of transition in the machine",
        optionD: "A way to output data from the machine",
        correctOption: "optionB"
    },

    {
        question: "What is a transition in a finite state machine ?",
        optionA: "A connection between two states that describes the machine's behavior",
        optionB: "A way to switch between different machines",
        optionC: "A way to input data into the machine",
        optionD: "A way to output data from the machine",
        correctOption: "optionA"
    },

    {
        question: "How is the start state represeted ?",
        optionA: "A looping arrow",
        optionB: "With an arrow pointing in at it",
        optionC: "Double circle",
        optionD: "Blank circle",
        correctOption: "optionB"
    },

    {
        question: "How is an accepting state represented ?",
        optionA: "Represented by a looping arrow",
        optionB: "Represented by a single circle",
        optionC: "Represented by a blank circle",
        optionD: "Represented by double circles",
        correctOption: "optionD"
    },

    {
        question: "Which of the following statements is true about deterministic finite state machines (DFSMs) ?",
        optionA: "Machines in which each state can have multiple transitions to other states",
        optionB: "Machines in which each transition is uniquely determined by the current state and input",
        optionC: "They are machines that can accept any input, regardless of its length",
        optionD: "They are machines that can accept infinite inputs",
        correctOption: "optionB"
    },

    {
        question: "Which of the following is not a component of a finite state machine ?",
        optionA: "Input alphabet",
        optionB: "Output alphabet",
        optionC: "Transition function",
        optionD: "Start state",
        correctOption: "optionB"
    },

    {
        question: "What is the purpose of a start state in a finite state machine ?",
        optionA: "To indicate the input alphabet of the machine",
        optionB: "To indicate the final state of the machine",
        optionC: "To indicate the initial state of the machine",
        optionD: "To indicate the accepting states",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is an example of a problem that can be solved using a finite state machine ?",
        optionA: "Sorting a list of numbers in descending order",
        optionB: "Calculating the value of pi to a given precision",
        optionC: "Recognizing whether a given string is a valid email address",
        optionD: "Converting a decimal number to a hexadecimal number",
        correctOption: "optionC"
    },

    {
        question: "What best describes Non-deterministic Finite Automata(NFA) ?",
        optionA: "They have one single transition",
        optionB: "They have no transitions",
        optionC: "Allow for one transition for each label in a state",
        optionD: "Allow for multiple transitions with the same label for many states",
        correctOption: "optionD"
    },

    {
        question: "What does q0 usually represent ?",
        optionA: "The alphabet set",
        optionB: "Final state",
        optionC: "Accepting states",
        optionD: "The initial state",
        correctOption: "optionD"
    },

    
    {
        question: "What does Q usually represent ?",
        optionA: "Finite set of states",
        optionB: "Finite alphabet set",
        optionC: "Start state",
        optionD: "Accepting states",
        correctOption: "optionA"
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