const data = [
    {
      id: 1,
      question: "Toyota-ambassadør Fredric Aasbø har blitt kåret til verdensmester i Formula Drift __ ganger.",
      answers: [
        { text: "4", correct: false },
        { text: "2", correct: false },
        { text: "3", correct: true }
      ]
    },
    {
      id: 2,
      question: "Hvilken Toyota-modell bruker Toyota-ambassadør Fredric Aasbø til drifting?",
      answers: [
        { text: "GT86", correct: false },
        { text: "GR86", correct: false },
        { text: "GR Supra", correct: true }
      ]
    },
    {
      id: 3,
      question: "Ca. hvor mange mennesker bor i California?",
      answers: [
        { text: "Ca. 40 millioner", correct: true },
        { text: "Ca. 30 millioner", correct: false },
        { text: "Ca. 20 millioner", correct: false }
      ]
    },
    {
      id: 4,
      question: "Hva heter den største byen i California?",
      answers: [
        { text: "San Francisco", correct: false },
        { text: "Los Angeles", correct: true },
        { text: "San José", correct: false }
      ]
    },
    {
      id: 5,
      question: "Hva betyr det japanske ordet “Kaizen\”?",
      answers: [
        { text: "Kaizen er kallenavnet til Toyota presidenten Akio Toyoda", correct: false },
        { text: "Kaizen betyr “Kontinuerlig Forbedring\"", correct: true },
        { text: "Kaizen er en måte å møblere på.", correct: false }
      ]
    },
    {
      id: 6,
      question: "Toyota GR Supra kan fra 2023 fås med…",
      answers: [
        { text: "Manuell girkasse", correct: true },
        { text: "Parasoll", correct: false },
        { text: "Ekstra ratt", correct: false }
      ]
    },
    {
      id: 7,
      question: "Hvilken modell er oppfølgeren til velkjente Toyota GT86?",
      answers: [
        { text: "GR Supra", correct: false },
        { text: "GR86", correct: true },
        { text: "GR Yaris", correct: false }
      ]
    },
    {
      id: 8,
      question: "\"Gazoo\" i Toyota Gazoo Racing stammer fra det japanske ordet for…",
      answers: [
        { text: "Fotografi", correct: true },
        { text: "Garasje", correct: false  },
        { text: "Fart", correct: false }
      ]
    },
    {
      id: 9,
      question: "Team Toyota-ambassadør Birgit Skarstein tok i september 2022 sitt _____ VM-gull i roing.",
      answers: [
        { text: "Tredje", correct: false },
        { text: "Fjerde", correct: false },
        { text: "Femte", correct: true }
      ]
    },
    {
      id: 10,
      question: "Johannes Høsflot Klæbo er en del av Team Toyota. Hvilken idrett driver han med?",
      answers: [
        { text: "Langrenn", correct: true },
        { text: "Svømming", correct: false },
        { text: "Sandvolleyball", correct: false }
      ]
    },
    {
      id: 11,
      question: "Team Toyota-ambassadørene Anders Mol og Christian Sørum tok OL-gull i Tokyo 2021. Hvilken idrett konkurrerer de i?",
      answers: [
        { text: "Sandvolleyball", correct: true },
        { text: "Roing", correct: false },
        { text: "Vannpolo", correct: false }
      ]
    },
  ];

let startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startGame);
let playAgain = document.querySelector(".play-again");
playAgain.addEventListener("click", startGame);
let playAnother = document.querySelector(".play-another");
playAnother.addEventListener("click", startGame);
let intro = document.querySelector(".intro");
let countdown = document.querySelector(".countdown-timer");
let quiz = document.querySelector(".quiz");
let lose = document.querySelector(".lose");
let win = document.querySelector(".win");
let points = document.querySelector(".points");
let numberOfPoints = document.querySelector(".numberOfPoints");
let finishTime = document.querySelector(".finishTime");
let timer = document.querySelector(".timer");
let questionElement = document.querySelector(".question");
let answers = document.querySelector(".answers");
let answerButtons = document.querySelector(".answer");
let countdownTimer = 3;
let selectedAnswer = null;
let correctCount = 0;
let disableButton = false;
let questionsList = [];
let className = "answer";
let startingSeconds = 9;
let startingTenthOfSeconds = 9;
let steps = document.querySelector(".steps");


var backgroundMusic = new Audio("/sounds/background.mp3");
var countdownSound = new Audio("/sounds/countdown.mp3");
var correctSound = new Audio("/sounds/correct.mp3");
var wrongSound = new Audio("/sounds/wrong.mp3");
var wonSound = new Audio("/sounds/victory.mp3");
var lostSound = new Audio("/sounds/lost.mp3");



var sounds = [
  {src: backgroundMusic},
  {src: countdownSound},
  {src: correctSound},
  {src: wrongSound},
  {src: wonSound},
  {src: lostSound}
]


let muteButton = document.querySelector(".mute-box");
muteButton.addEventListener("click", muteSound);

let muteButtonImg = document.querySelector(".mute");
let unmuteButtonImg = document.querySelector(".unmute");

let soundMuteStatus = false;

function muteSound() {

  muteButtonImg.classList.toggle('hide');
  unmuteButtonImg.classList.toggle('hide');

  soundMuteStatus = soundMuteStatus ? false : true;

  if(soundMuteStatus) {
    soundMuteStatus = true;
    sounds.forEach(sound => {
      sound.src.muted = true;
    })

  } else {
    sounds.forEach(sound => {
      sound.src.muted = false;
    })
  }
  


}

function playAudio(file, status) {
      file.play();
      file.volume = 0.07;
      file.muted = status;
    }

function pauseAudio(status) {
  file.muted = status;
}


    function stopAudio(file) {
      file.pause();
      file.currentTime = 0
    }    

let generateQuestionList = () => {

  data.sort(() => Math.random() - 0.5)
  const newArray = [...data, ...data, ...data, ...data, ...data, ...data];
  questionsList = newArray;
  
  }


const delay = (duration, callback) => {

    setTimeout(() => {
        callback();
    }, duration);
  
  };

  generateQuestionList();

function startGame() {




    playAudio(backgroundMusic, soundMuteStatus);
    playAudio(countdownSound, soundMuteStatus);

  countdown.innerHTML = `03<div class="red"><img class="logo" src="images/logo-tgr.png" alt="" />`
  timer.innerHTML = `60:00`
  correctCount = 0;
  styleScoreboard();
  currentQuestionIndex = 0;
  countdownTimer = 3;
  startingSeconds = 59;
  startingTenthOfSeconds = 9;
  intro.classList.add('hide');
  lose.classList.add('hide');
  win.classList.add('hide');
  countdown.classList.remove('hide');



  let countdownId = setInterval(function() {
    countdownTimer--
    countdown.innerHTML = `0${countdownTimer}<div class="red"><img class="logo" src="images/logo-tgr.png" alt="" />`

      if(countdownTimer === 0) {
        clearInterval(countdownId)
      }
  }, 1000);

  setNextQuestion();

  delay(3000, () => {
    countdown.classList.add('hide');
  accelerate(); 
  });

  delay(4200, () => {
    quiz.classList.remove('hide'); 
  accelerate(); 


  let timerId = setInterval(function() {

  let seconds = startingSeconds;
  let tenthOfSeconds = startingTenthOfSeconds;
  
  if (startingTenthOfSeconds === 0) {
    startingTenthOfSeconds = 10;
    startingSeconds--
  };
  
  seconds = seconds < 10 ? '0' + seconds : seconds;
  tenthOfSeconds = tenthOfSeconds < 10 ? '0' + tenthOfSeconds : tenthOfSeconds;
  
  timer.innerHTML = `${seconds}:${tenthOfSeconds}`
  startingTenthOfSeconds--;
  


  if(correctCount === 8) {



    finishTime.innerText = `Du kom i mål på ${59-startingSeconds},${9-startingTenthOfSeconds} sekunder!`;




    clearInterval(timerId);

  }
  
  if((startingSeconds === 0) && (startingTenthOfSeconds === 0)) {

    playAgain.disabled = true;

    breakingDown();

    delay(1500, () => {
      playAgain.disabled = false;
    });


    stopAudio(backgroundMusic);

      playAudio(lostSound, soundMuteStatus);
    quiz.classList.add('hide');
    lose.classList.remove('hide');
    steps.innerText = `Du var ${8-correctCount} steg unna!`
    numberOfPoints.innerText = `${correctCount}/8 poeng`



      clearInterval(timerId);

  }

  }, 100);


  });

}









const setNextQuestion = () => {
resetState();

showQuestion(questionsList[currentQuestionIndex]);

}

function showQuestion(question) {

questionElement.innerText = question.question
question.answers.forEach(answer => {

const button = document.createElement('button')
button.innerText = answer.text;
button.classList.add('answer')

if (answer.correct) {
  button.dataset.correct = answer.correct;
}

button.addEventListener('click', selectAnswer)
answers.appendChild(button);

})

}





function resetState() {
  
  while (answers.firstChild) {
    answers.removeChild(answers.firstChild)
  }

}




function styleScoreboard() {


  const allLines = document.querySelectorAll(".line");

  const linesArray = Array.from(allLines);
  
  linesArray.forEach(line => {
    
    if (line.getAttribute('id') <= (correctCount+1)) {
  
      line.classList.add('currentLine');
    } else {
      line.classList.remove('currentLine');
    }
    
  })

const allCircles = document.querySelectorAll(".circle");

const circleArray = Array.from(allCircles);

circleArray.forEach(circle => {
  
  if (circle.getAttribute('id') <= (correctCount+1)) {

    circle.classList.add('current');
  } else {
    circle.classList.remove('current');
  }


  if (circle.getAttribute('id') <= correctCount) {

    circle.classList.add('correctCircle');
  } else {
    circle.classList.remove('correctCircle');
  }
  
})

}




function selectAnswer(e) {

const selectedButton = e.target;
const correct = selectedButton.dataset.correct


  setStatusClass(selectedButton, correct)



currentQuestionIndex++


Array.from(answers.children).forEach(button => {

  button.disabled = true;

})

delay(1500, () => {
  setNextQuestion();
});

}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correctCount === 7) {
    playAudio(correctSound, soundMuteStatus);
    correctCount++
    styleScoreboard();
    currentQuestionIndex = 0;
    element.classList.add('correct')
    delay(1500, () => {
      stopAudio(backgroundMusic);
      playAudio(wonSound, soundMuteStatus);
      playAnother.disabled = true;
      breakingDown();


      quiz.classList.add('hide')
      win.classList.remove('hide')
    });

    delay(3000, () => {
      playAnother.disabled = false;
    });


  } else if (correct) {
    playAudio(correctSound, soundMuteStatus);
    correctCount++
    styleScoreboard();
    element.classList.add('correct')
    speedUp();
  } else if (correctCount === 0) {
    playAudio(wrongSound, soundMuteStatus);
    styleScoreboard();
    element.classList.add('wrong')
    slowDown();
  } else {
    playAudio(wrongSound, soundMuteStatus);
    correctCount--
    styleScoreboard();
    element.classList.add('wrong')
    slowDown();
  }
}





function clearStatusClass(element) {

  element.classList.remove('correct')
  element.classList.remove('wrong')

}



