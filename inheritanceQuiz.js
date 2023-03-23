const questions = [
    {
        question: "Which keyword is used to implement inheritance in Java?",
        optionA: "implements",
        optionB: "extends",
        optionC: "abstract",
        optionD: "this",
        correctOption: "optionB"
    },

    {
        question: "Which of the following is true about inheritance in Java ?",
        optionA: "Java does not support multiple inheritance",
        optionB: "Java allows a class to inherit from multiple classes",
        optionC: "Java only allows inheritance from abstract classes",
        optionD: "Java inheritance can only be achieved through interfaces",
        correctOption: "optionA"
    },

    {
        question: "Which of the following statements is true about the 'super' keyword in Java ?",
        optionA: "It refers to the object of the current class",
        optionB: "It is used to call a constructor of the current class",
        optionC: "It is used to refer to a method or variable of the superclass",
        optionD: "It is used to create a new instance of a subclass",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is not a benefit of using inheritance in Java ?",
        optionA: "Code reusability",
        optionB: "Code maintainability",
        optionC: "Polymorphism",
        optionD: "Encapsulation",
        correctOption: "optionD"
    },

    {
        question: "What is inheritance in Java ?",
        optionA: "The process of creating a new class by absorbing data and methods from an existing class",
        optionB: "The process of creating a new object by copying data and methods from an existing object",
        optionC: "The process of creating a new class by copying data and methods from an existing class",
        optionD: "The process of creating a new object by absorbing data and methods from an existing object",
        correctOption: "optionA"
    },

    {
        question: "What is the superclass in inheritance ?",
        optionA: "The class that extends another class",
        optionB: "The class that is extended by another class",
        optionC: "The class that has no inheritance relationship with any other class",
        optionD: "The class that is instantiated to create objects",
        correctOption: "optionB"
    },

    {
        question: "What is a subclass in inheritance ?",
        optionA: "The class that extends another class",
        optionB: "The class that is extended by another class",
        optionC: "The class that has no inheritance relationship with any other class",
        optionD: "The class that is instantiated to create objects",
        correctOption: "optionA"
    },

    {
        question: "Which of the following statements is true about the super() keyword in Java ?",
        optionA: "It is used to call the constructor of the superclass",
        optionB: "t is used to call the constructor of the subclass",
        optionC: "It is used to call the methods of the superclass",
        optionD: "It is used to call the methods of the subclass",
        correctOption: "optionA"
    },

    {
        question: "What is method overriding in Java ?",
        optionA: "Creating a new method with the same name as an existing method in the superclass",
        optionB: "Modifying the implementation of a method in the superclass",
        optionC: "Creating a new method with a different name as an existing method in the superclass",
        optionD: "Creating a new method with the same signature as an existing method in the superclass",
        correctOption: "optionD"
    },

    {
        question: "What is the purpose of using the 'extends' keyword in Java ?",
        optionA: "To create a new object",
        optionB: "To call a method in a superclass",
        optionC: "To inherit properties and methods from a superclass to a subclass",
        optionD: "To declare a new variable",
        correctOption: "optionC"
    },

    {
        question: "Can a subclass override the behavior of a method defined in its superclass in Java?",
        optionA: "Yes, by using the 'super' keyword",
        optionB: "Yes, by using the 'overide' keyword",
        optionC: "Yes, by redefining the method with the same signature in the subclass",
        optionD: " No, it is not possible to override a method in a subclass",
        correctOption: "optionC"
    },

    {
        question: "WWhich of these is correct way of inheriting class A by class B ?",
        optionA: "class B extends class A {}",
        optionB: "class B + class A {}",
        optionC: "class B extends A {}",
        optionD: "class B inherits class A {}",
        correctOption: "optionC"
    },

    {
        question: "Which of these statements correctly invokes the setAnimalSound method on an Animal object named dog to set its sound to 'Bark' ?",
        optionA: 'setAnimalSound(dog, "Bark");',
        optionB: 'Animal.setAnimalSound(dog, "Bark");',
        optionC: 'dog.setAnimalSound("Bark");',
        optionD: 'Animal.setAnimalSound("Bark");',
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