const questions = [
    {
        question: "What is a turing machine ?",
        optionA: "A Turing Machine is a function",
        optionB: "A Turing Machine is a mathematical model of computation that defines an abstract machine",
        optionC: " A method that can be called on both object instances and the class itself",
        optionD: "A method that can only be called within the same package",
        correctOption: "optionB"
    },

    {
        question: "Which of the following is a characteristic of a Turing machine ?",
        optionA: "It has a finite tape",
        optionB: "It has a finite number of states",
        optionC: "It can recognize only regular languages",
        optionD: "It can simulate any computer algorithm",
        correctOption: "optionD"
    },

    {
        question: "What is the function of the tape in a Turing machine ?",
        optionA: "To store the input",
        optionB: "To store the output",
        optionC: "To store the program",
        optionD: "To store the state",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is NOT a component of a Turing machine ?",
        optionA: "Tape",
        optionB: "Read/Write head",
        optionC: "Registers",
        optionD: "Control Unit",
        correctOption: "optionC"
    },

    {
        question: "Which of these is not a special state of a Turing Machine ?",
        optionA: "Start state;",
        optionB: "Null State",
        optionC: "Accept State;",
        optionD: "Reject state;",
        correctOption: "optionB"
    },

    {
        question: "Which of these is an example of a problem that can be solved by a Turing machine ?",
        optionA: "Sorting a list of integers",
        optionB: "Finding the shortest path in a graph",
        optionC: "Recognizing whether a string is a palindrome",
        optionD: "Solving a system of linear equations",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is an example of a limitation of Turing machines ?",
        optionA: "They can recognize only regular languages",
        optionB: "They require infinite time and space to simulate some algorithms",
        optionC: "They can solve all computable problems",
        optionD: "They can simulate quantum computing",
        correctOption: "optionB"
    },

    {
        question: "In definition of TM T=(Q,Σ,┌,q0,δ) what ┌ represents ?",
        optionA: "Tape alphabets",
        optionB: "Input Symbols",
        optionC: "Transition fucntion",
        optionD: "Start State",
        correctOption: "optionA"
    },

    {
        question: "Which of the following statements is true regarding the Church-Turing thesis ?",
        optionA: "It states that every algorithm can be solved using a Turing machine",
        optionB: "It is a conjecture that has yet to be proven",
        optionC: "It states that the capabilities of Turing machines are equivalent to those of any other computational device",
        optionD: "It only applies to problems that can be solved in polynomial time",
        correctOption: "optionC"
    },

    {
        question: "In definition of TM T=(Q,Σ,┌,q0,δ) what does q0 represents ?",
        optionA: "Input alphabet",
        optionB: "Accepting states",
        optionC: "Output alphabet",
        optionD: "Starting state",
        correctOption: "optionD"
    },

    {
        question: "What is the purpose of the designated halt states in a Turing machine ?",
        optionA: "To indicate when the machine has finished computing",
        optionB: "To indicate when the machine has encountered an error",
        optionC: "To indicate when the machine has run out of memory",
        optionD: "To indicate when the machine has entered an infinite loop",
        correctOption: "optionA"
    },

    
    {
        question: "What happens if a Turing machine never enters an accepting or rejecting state ?",
        optionA: "The machine produces an output",
        optionB: "The machine enters an infinite loop",
        optionC: "The machine runs out of memory",
        optionD: "The machine encounters an error",
        correctOption: "optionB"
    },
    
    {
        question: "Can a Turing machine operate without entering a designated halt state ?",
        optionA: "Yes, it can continue computing indefinitely",
        optionB: "No, it must enter a halt state to indicate that it has finished computing",
        optionC: "It depends on the specific problem being solved",
        optionD: "It depends on the type of Turing machine",
        correctOption: "optionA"
    },

    {
        question: "What is the significance of a Turing machine entering an infinite loop ?",
        optionA: "It indicates that the machine has produced an output",
        optionB: "It indicates that the machine has encountered an error",
        optionC: "It indicates that the machine has run out of memory",
        optionD: "It indicates that the machine will continue computing indefinitely without producing an output",
        correctOption: "optionD"
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