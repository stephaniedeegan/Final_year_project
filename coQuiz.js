const questions = [
    {
        question: "What is an object ?",
        optionA: "A function",
        optionB: "A variable",
        optionC: "An instance of a class",
        optionD: "A conditional statement",
        correctOption: "optionC"
    },

    {
        question: "What statement must you include at the top of your program to use the Scanner class ?",
        optionA: "import java.util.Scan;",
        optionB: "import java.io;",
        optionC: "import java.lang;",
        optionD: "import java.util.*;",
        correctOption: "optionD"
    },

    {
        question: "What method do you need to call to read a string input using a Scanner object ?",
        optionA: "nextLine()",
        optionB: "nextInt()",
        optionC: "nextString()",
        optionD: "nextDouble()",
        correctOption: "optionB"
    },

    {
        question: "What is encapsulation ?",
        optionA: "The process of hiding implementation details",
        optionB: "The process of exposing implementation details",
        optionC: "The process of creating objects",
        optionD: "The process of defining variables",
        correctOption: "optionA"
    },

    {
        question: "What is the class scope in Java?",
        optionA: "The area of a program where a class is defined",
        optionB: "The area of a program where a class variable is defined",
        optionC: "The area of a program where a method is defined",
        optionD: "The area of a program where an object is created",
        correctOption: "optionC"
    },

    {
        question: "Where is a class variable declared to have class scope ?",
        optionA: "Inside a method",
        optionB: "Inside a loop",
        optionC: "Just inside the first line of a class after the first brace",
        optionD: "Inside an if statement",
        correctOption: "optionC"
    },

    {
        question: "Where is an access modifier placed in Java code ?",
        optionA: "At the beginning of a class definition",
        optionB: "At the beginning of a method definition",
        optionC: "At the end of a class definition",
        optionD: "At the end of a variable definition",
        correctOption: "optionB"
    },

    {
        question: "What does an access modifier do ?",
        optionA: "It defines the scope of a variable or method",
        optionB: "It defines the type of a variable or method",
        optionC: "It defines the return value of a method",
        optionD: "It defines the parameters of a method",
        correctOption: "optionA"
    },

    {
        question: "What is the name of the constructor method ?",
        optionA: "It is the same as the name of the first attribute in the class",
        optionB: "It is the same as the name of the last attribute in the class",
        optionC: "It is the same as the name of the class itself",
        optionD: "It is the same as the name of the main method",
        correctOption: "optionC"
    },

    {
        question: "What is the purpose of making the constructor method public ?",
        optionA: "To prevent other classes from accessing it",
        optionB: "To allow other classes to access it",
        optionC: "To restrict the number of objects that can be created from the class",
        optionD: "To make the constructor method more efficient",
        correctOption: "optionB"
    },

    {
        question: "What is method overloading ?",
        optionA: "Creating multiple versions of the same method with different return types",
        optionB: "Creating multiple versions of the same method with different access modifiers",
        optionC: "Creating multiple versions of the same method with different parameters",
        optionD: "Creating multiple versions of the same method with different names",
        correctOption: "optionC"
    },

    
    {
        question: "Which keyword followed by the dot “.” operator allows you to explicitly specify which variable you are referring to ?",
        optionA: "it",
        optionB: "here",
        optionC: "that",
        optionD: "this",
        correctOption: "optionD"
    },

    {
        question: "What is inheritance ?",
        optionA: "The process of creating a new class from an existing class",
        optionB: "The process of creating an object",
        optionC: "The process of encapsulating data",
        optionD: "The process of defining variables",
        correctOption: "optionA"
    },

    {
        question: "When do we use the keyword 'final' to define a variable in Java ?",
        optionA: "When we want the variable to be changed throughout the program",
        optionB: "When we want to declare a constant variable",
        optionC: "When we want the variable to be shared across multiple instances of the same class",
        optionD: "When we want to create a new instance of a class",
        correctOption: "optionB"
    },

    {
        question: "What is the purpose of using the 'static' keyword when declaring a variable or method?",
        optionA: "To ensure that the variable can be accessed from anywhere in the program",
        optionB: "To make sure the variable can be modified throughout the program",
        optionC: "To create a new instance of the variable or method",
        optionD: "To ensure that there is only one copy of the variable or method that exists",
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