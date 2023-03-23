const questions = [
    {
        question: "What is a static method ?",
        optionA: "A method that can only be called on the class itself",
        optionB: "A method that can only be called on an object instance",
        optionC: " A method that can be called on both object instances and the class itself",
        optionD: "A method that can only be called within the same package",
        correctOption: "optionC"
    },

    {
        question: "How do you define a static method in Java ?",
        optionA: "By using the keyword 'final' before the method name",
        optionB: "By using the keyword 'private' before the method name",
        optionC: "By using the keyword 'static' before the method name",
        optionD: "By using the keyword 'void' before the method name",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is an example of a static method in the Math class in Java ?",
        optionA: "abs(int a)",
        optionB: "pow(double a, double b)",
        optionC: "cos(double a)",
        optionD: "random()",
        correctOption: "optionA"
    },

    {
        question: "Can a static method access non-static variables ?",
        optionA: "Yes, if the non-static variable is final",
        optionB: "Yes, if the non-static variable is public",
        optionC: " Yes, a static method can access both static and non-static variables",
        optionD: "No, a static method can only access static variables",
        correctOption: "optionD"
    },

    {
        question: "How do you create an instance of the Scanner class ?",
        optionA: "Scanner sc = new Scanner(System.in);",
        optionB: "Scanner sc = new scanner(System.out);",
        optionC: "Scan sc = new scanner(System.in);",
        optionD: "Scanner sc = Scanner(System.in);",
        correctOption: "optionA"
    },

    {
        question: "What are overloaded methods ?",
        optionA: "3 or more methods in the same class with the same name, with different parameter declarations",
        optionB: "2 or more methods in the same class with the same name, with the same parameter declarations",
        optionC: "2 or more methods in different classes share the same name",
        optionD: "When there are 2 methods in a class",
        correctOption: "optionB"
    },

    {
        question: "What is the scope of a variable ?",
        optionA: "The scope of a variable is the part of the program in which you can access it",
        optionB: "The scope of a variable is the value of the variable",
        optionC: "The scope of a variable is the part of the program in which you can't access it",
        optionD: "The scope of all variables is 0",
        correctOption: "optionA"
    },

    {
        question: "What type of function takes a positive integer value n and adds all the integers from 0 to n?",
        optionA: "Multiplicative",
        optionB: "Raising a number to a power",
        optionC: "Additivie",
        optionD: "Sigma",
        correctOption: "optionD"
    },

    {
        question: "Which of these is correct ?",
        optionA: "A method must be written or declared before it can be used",
        optionB: "A method does not need to be declared",
        optionC: "One can invoke a method before it is declared",
        optionD: "A method is the same as a variable",
        correctOption: "optionA"
    },

    {
        question: "Which of the following is a valid way to call a static method in Java ?",
        optionA: "MyClass.myStaticMethod()",
        optionB: "myObject.myStaticMethod()",
        optionC: " myStaticMethod()",
        optionD: "new MyClass().myStaticMethod()",
        correctOption: "optionA"
    },

    {
        question: "What is the main advantage of using a static method ?",
        optionA: "Static methods can be called on object instances",
        optionB: "Static methods can access non-static variables",
        optionC: "Static methods can be called on the class itself without the need for an object instance",
        optionD: "Static methods can be overridden by subclasses",
        correctOption: "optionC"
    },

    
    {
        question: "What is the purpose of the'main' method in a Java program ?",
        optionA: "To provide documentation for the class",
        optionB: "To define a static method that can be called by other classes",
        optionC: "To provide a starting point for the program's execution",
        optionD: "To create object instances of the class",
        correctOption: "optionC"
    },
    
    {
        question: "Which of the following is true about static variables in Java ?",
        optionA: "Static variables are initialized when an object is created",
        optionB: "Static variables are shared among all instances of a class",
        optionC: "Static variables cannot be declared as final",
        optionD: " Static variables can only be accessed from within the same class",
        correctOption: "optionB"
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