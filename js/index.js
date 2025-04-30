//-----------------------------------------
// Global Variables
//-----------------------------------------
let timerInterval;
let timeLeft = 60;
const video = document.getElementById("patientVideo");
const toggleBtn = document.getElementById("videoToggle");
const icon = toggleBtn.querySelector("i");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
let isListening = false; 

//-----------------------------------------
// Helper Functions
//-----------------------------------------
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";
} else {
  alert("Error. Speech recognition not supported in this browser. Please switch to another browser.");
}

$("#micModal").modal({
  closable: false,
  autofocus: false,
  observeChanges: true,
  onHide: resetTimer
});

//Reset timer for modal
function resetTimer() {
  timeLeft = 60;
  clearInterval(timerInterval); 
  $("#timer").text(timeLeft + "s");
  
  recognition.stop();
  isListening = false;
}

//Toggle button play/pause functionality
toggleBtn.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    icon.classList.remove("play");
    icon.classList.add("pause");
  } else {
    video.pause();
    icon.classList.remove("pause");
    icon.classList.add("play");
  }
});

function stopListening() {
  $("#micModal").modal("hide");
}

function renderUserMessage(message) {
  const messageHtml = `
    <div class="message-wrapper user">
      <div class="message user"><strong>You</strong><br>${message}</div>
    </div>
  `;
  $(".chat-log").append(messageHtml);
}

recognition.onresult = function(event) {
  const transcript = event.results[0][0].transcript;
  console.log(transcript)
  renderUserMessage(transcript);
};

//-----------------------------------------
// Modal Functions
//-----------------------------------------
function askPatient(){
  $("#micModal").modal("show");

  recognition.start();
  isListening = true;

  timerInterval = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      stopListening();
    } else {
      $("#timer").text(timeLeft + "s");
      timeLeft--;
    }
  }, 1000);
}

function showAbout() {
  $("#aboutModal").modal("show");
}

function showFinish(){
  $("#finishModal").modal("show");
}

function showHint(){
  $("#hintModal").modal("show");
}

function showSummary(){
  $(".ui.modal").modal("hide");
  //TODO:: show summary screen
  //Hide modals
}

function closeModal() {
  $(".ui.modal").modal("hide");
}

