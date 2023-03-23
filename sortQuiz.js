const questions = [
    {
        question: "Which of the following is an advantage of using binary search over linear search ?",
        optionA: "Binary search always finds the element in O(1) time",
        optionB: "Binary search works for unsorted arrays",
        optionC: "Binary search has a worst-case time complexity of O(n)",
        optionD: "Binary search is simpler to implement than linear search",
        correctOption: "optionA"
    },

    {
        question: "Which of the following sorting algorithms is best suited for sorting a small number of elements ?",
        optionA: "Bubble sort",
        optionB: "Quick sort",
        optionC: "Insertion Sort",
        optionD: "Merge sort",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is a disadvantage of using linear search over binary search ?",
        optionA: "Linear search requires the array to be sorted",
        optionB: "Linear search has a worst-case time complexity of O(log n)",
        optionC: "Linear search may need to examine every element in the array",
        optionD: "Linear search is more complex to implement than binary search",
        correctOption: "optionC"
    },

    {
        question: "What is the Bubble sorting algorithm ?",
        optionA: "An algorithm to find the smallest and find the largest element in an array",
        optionB: "An algorithm for arranging the elements in an array so that they are in numerical order (ascending or descending)",
        optionC: "An algorithm for arranging the elements in an array so that they are in descending order only",
        optionD: "An algorithm for arranging the elements in an array so that they are in ascending order only",
        correctOption: "optionB"
    },

    {
        question: "What is the simpliest sorting algorithm ?",
        optionA: "Merge sort",
        optionB: "Insertion sort",
        optionC: "Bubble sort",
        optionD: "Quick sort",
        correctOption: "optionC"
    },

    {
        question: "What is the purpose of Binary Search ?",
        optionA: "To find a value in a sorted array",
        optionB: "To find a value in an unsorted array",
        optionC: "To sort an array of values",
        optionD: "To remove duplicates from an array of values",
        correctOption: "optionA"
    },

    {
        question: "What is the time complexity of binary search ?",
        optionA: "O(n)",
        optionB: "O(log n)",
        optionC: "O(n^2)",
        optionD: "O(1)",
        correctOption: "optionB"
    },

    {
        question: "What type of data structure is required for binary search ?",
        optionA: "A linked list",
        optionB: "A heap",
        optionC: "A sorted array",
        optionD: "An unsorted array",
        correctOption: "optionC"
    },

    {
        question: "What happens if the array is not sorted in binary search ?",
        optionA: "The algorithm will fail and return an error",
        optionB: "The algorithm will still work",
        optionC: "The algorithm will sort the array before searching for the element",
        optionD: "The algorithm will use a different search algorithm, such as linear search",
        correctOption: "optionA"
    },

    {
        question: "What is the best time complexity of Bubble sort?",
        optionA: "O(n)",
        optionB: "O(nlogn)",
        optionC: "O(log n)",
        optionD: "O(n^2)",
        correctOption: "optionA"
    },

    {
        question: "If we look at a sorted array containing the values between 1 and 20, how many steps will it take at most ?",
        optionA: "20",
        optionB: "5",
        optionC: "1",
        optionD: "10",
        correctOption: "optionB"
    },

    
    {
        question: "Which of the following is not a stable sorting algorithm in its typical implementation ?",
        optionA: "Bubble sort",
        optionB: "Merge sort",
        optionC: "Insertion sort",
        optionD: "Quick sort",
        correctOption: "optionD"
    },
    
    {
        question: "Which algorithm is this? The elements are compared and swapped if the first is found to be greater than the second ?",
        optionA: "Binary search",
        optionB: "Linear search",
        optionC: "Bubble sort",
        optionD: "All of the above",
        correctOption: "optionC"
    },

    {
        question: "Which of the following is an example of a search algorithm that is not based on a sorted array ?",
        optionA: "Binary search",
        optionB: "Linear search",
        optionC: "Merge sort",
        optionD: "Quick sort",
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