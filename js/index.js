//-----------------------------------------
// Global Variables
//-----------------------------------------
let timerInterval;
let timeLeft = 60;
let recognition;
let isListening = false; 
let activePatient = getRandomCharacter();
let currentScenario = "";
let fullPatientName = setPatientFullName();
let patientTranscript = "";
let shownHintCategories = [];
const maxHints = 3;
let hintCounter = 0;
const video = document.getElementById("patientVideo");
const toggleBtn = document.getElementById("videoToggle");
const icon = toggleBtn.querySelector("i");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//-----------------------------------------
// Helper Functions
//-----------------------------------------
//Check for speech recognition
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  $("#main").removeClass("hidden");
  showPatientVideo("neutral");
  currentScenario = getRandomScenario(activePatient);

} else {
  $("#speechWarning").removeClass("hidden");
}

$("#patientName").html(fullPatientName);

function setPatientFullName(){
  let fullName = "unknown";
  switch(activePatient){
    case "randy":
      fullName = "Randy Brooks";
    break;
    case "tracy":
      fullName = "Tracy Ellis";
    break;
  }
  return fullName;
}

function getRandomScenario(patient) {
  const patientScenarios = Object.keys(scenarios).filter(key => {
    return key.startsWith(patient) || !key.includes("-");
  });
  return randomFromArray(patientScenarios);
}

//Modal information
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
  $("#timer").html(timeLeft + "s");
  
  recognition.stop();
  isListening = false;
 
  setTimeout(function(){  
    renderPatientMessage(patientTranscript);
    setTimeout(function() {
      $("#chatArea").scrollTop($("#chatArea")[0].scrollHeight);
    }, 100);
  }, 800);
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

//Stop listining to the user
function stopListening() {
  $("#micModal").modal("hide");
}

//Display the message in the div and in the chat log
function renderUserMessage(message) {
  const messageHtml = `
    <div class="message-wrapper user">
      <div class="message user">
      <strong>You</strong><br>
      ${message}
      </div>
    </div>
  `;
  $(".chat-log").append(messageHtml);
}

//Display the message in the div and in the chat log
function renderPatientMessage(message) {

  if(message == "")
    return;
  
  let tmpPatient = capitalizeFirst(activePatient);
  const messageHtml = `
    <div class="message-wrapper patient">
      <div class="message patient">
      <strong>${tmpPatient}</strong><br>
      ${message}
      </div>
    </div>
  `;
  $(".chat-log").append(messageHtml);
}

function getRandomCharacter() {
  const characters = ["randy", "tracy"];
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

//Helper function that shows a particular video based on thier emotion (e.g., neutral, sad, angry)
function showPatientVideo(emotion) {
  const videoContainer = $(".video-container");
  const overlay = $(".overlay");
  const videoElement = $("#patientVideo")[0];
  const videoSource = $("#video-source");

  const videoName = `${activePatient}_${emotion}.mp4`;
  videoSource.attr("src", `videos/${videoName}`);

  videoElement.pause();
  videoElement.load();

  overlay.css("opacity", 1);
  videoContainer.show();

  setTimeout(function() {
    overlay.css("opacity", 0);
    videoElement.classList.add("videoFadeIn");
    videoElement.oncanplay = function() {
      videoElement.play();
    };
  }, 100);
}

//Helper function that capitalizes the first word of a string
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//Handles speech recognition
recognition.onresult = function(event) {
  $(".chatPrompt").addClass("hidden");

  let transcript = capitalizeFirst(event.results[0][0].transcript);
  const categoryKey = detectCategory(transcript);

  renderUserMessage(transcript);
  $("#liveTranscript").html(transcript);

  const response = getResponse(activePatient, categoryKey, currentScenario, transcript);
  patientTranscript = response;  
};

function randomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function getResponse(character, categoryKey, scenarioKey, userInput) {
  const scenario = scenarios[scenarioKey];
  const category = categories[categoryKey];

  console.log(categoryKey)
  if(categoryKey === null){
    return randomFromArray(characterFallbackResponses);
  }

  if (category.covered) {
     return "We've already talked about that. Is there anything else you'd like to ask?";
  }

  if (scenario?.[categoryKey]?.override) {
    category.covered = true;
    return randomFromArray(scenario[categoryKey].responses);
  }

  if (characters[character]?.[categoryKey]) {
    category.covered = true;
    return randomFromArray(characters[character][categoryKey]);
  }

  return randomFromArray(category.defaultResponses);
}

function detectCategory(input) {
  const keywords = {
    greeting: [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
      "greetings", "howdy", "how is it going", "how are you", 
      "pleasure", "nice to", "help you", "good to see you",
      "welcome", "hey there"
    ],
  
    lifestyle: [
      "lifestyle", "routine", "daily", "activity", "habits", "exercise", "workout", "physical activity",
      "fitness", "schedule", "work life", "daily routine", "stress levels", "routine maintenance",
      "balance", "hobbies", "well-being", "routine changes"
    ],
  
    sleep: [
      "sleep", "insomnia", "tired", "rest", "fatigue", "bedtime", "sleep quality", "sleep pattern",
      "trouble sleeping", "waking up", "night sleep", "restful sleep", "rested", "naps", "sleeping habits",
      "snoring", "dreams", "deep sleep", "poor sleep", "circadian rhythm"
    ],
  
    diet: [
      "diet", "food", "eating", "eat", "appetite", "nutrition", "meals", "snacks", "calories", 
      "healthy eating", "meal plan", "balanced diet", "junk food", "vegetables", "fruit", "fast food",
      "sugar", "processed food", "eating habits", "meal timing", "drinks", "sweets", "carbs", "protein",
      "dietary preferences", "diet changes", "nutrition plan"
    ],
  
    pain: [
      "pain", "ache", "hurt", "sore", "discomfort", "stiffness", "pressure", "pain level", "muscle pain",
      "joint pain", "headache", "back pain", "neck pain", "throbbing", "sharp pain", "chronic pain", 
      "nagging pain", "cramps", "tenderness", "body aches", "pain management", "pain relief", "pain medication"
    ],
  
    stress: [
      "stress", "anxiety", "worried", "overwhelmed", "pressure", "mental", "worry", "mood", "nervous",
      "stressed out", "panic", "tension", "burnout", "feeling tense", "unsettled", "nervousness", "mental health",
      "emotional strain", "frustration", "feeling anxious", "stress management", "feeling overwhelmed", 
      "emotional pressure", "restlessness", "work stress", "life stress", "personal stress"
    ],
  
    medication: [
      "medication", "pills", "prescription", "taking", "medicine", "drugs", "treatment", "pharmacy", 
      "prescribed", "dosage", "medicine regimen", "doctor's orders", "health supplements", "antidepressants",
      "painkillers", "antibiotics", "heart medication", "blood pressure meds", "sleep aids", "inhaler", 
      "insulin", "meds", "prescriptions"
    ],
  
    substance: [
      "alcohol", "drinking", "smoking", "drugs", "substance", "substance abuse", "alcoholism", "drunken", 
      "beer", "wine", "cocktails", "liquor", "cigarettes", "tobacco", "vape", "addiction", "substance use",
      "dependency", "recovery", "drug use", "marijuana", "weed", "pills", "overuse", "alcohol consumption",
      "drug abuse"
    ],
  
    goodbyes: [
      "bye", "goodbye", "take care", "see you later", "have a good day", "good evening", "good night", 
      "see you soon", "farewell", "until next time", "catch you later", "later", "adios",
      "so long", "take it easy", "talk soon", "goodbye for now", "until we meet again", "ciao", "have a good one"
    ]
  };

  input = input.trim().toLowerCase().replace(/[^\w\s]/g, "");

   
  for (const category in keywords) {
    if (keywords[category].some(word => input.includes(word))) {
      return category;
    }
  }
  
  return null;
}

function getRandomHint() {
  const closeModalStr = `<i class="close icon" onclick="closeModal()"></i>`;
  const uncoveredHints = hintSuggestions.filter(
    h => !categories[h.category].covered && !shownHintCategories.includes(h.category)
  );

  if (uncoveredHints.length === 0 || hintCounter >= maxHints) {
    $(".hint.header").html("Hints" + closeModalStr);
    $("#hintText").html("Sorry, you've already seen all the available hints!");
    return;
  }

  const randomHint = randomFromArray(uncoveredHints);
  shownHintCategories.push(randomHint.category);
  hintCounter++;

  const hintsString = `Hints (${hintCounter} of ${maxHints})`;
  $(".hint.header").html(hintsString + closeModalStr);
  $("#hintText").html(randomHint.hint);
}

function generateSummary() {
  const coveredCategories = [];
  const missedCategories = [];

  for (const key in categories) {
    //if (key === "greeting" || key === "goodbyes") continue;

    const category = categories[key];
    const listItem = `<li><strong>${capitalizeFirst(key)}:</strong> ${category.importance || 'No description available.'}</li>`;

    if (category.covered) {
      coveredCategories.push(listItem);
    } else {
      missedCategories.push(listItem);
    }
  }

  // Add default if nothing was covered/missed
  if (coveredCategories.length === 0) {
    coveredCategories.push("<li>N/A</li>");
  }

  if (missedCategories.length === 0) {
    missedCategories.push("<li>N/A</li>");
  }

  $("#covered-list").html(coveredCategories.join(""));
  $("#missed-list").html(missedCategories.join(""));
}

//-----------------------------------------
// Modal Functions
//-----------------------------------------
function askPatient(){
  $("#micModal").modal("show");

  $("#liveTranscript").html("");
  patientTranscript = "";
  recognition.start();
  isListening = true;

  timerInterval = setInterval(function() {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      stopListening();
    } else {
      $("#timer").html(timeLeft + "s");
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
  getRandomHint();
}

function showSummary(){
  $(".ui.modal").modal("hide");

  $("#interview").transition("fade out", 300, function() {
    $("#interview").addClass("hidden");
    $("#summary").removeClass("hidden").transition("fade in", 300);
  });
  generateSummary();
}

function startInterview() {
  $("#home").transition("fade out", 300, function() {
    $("#home").addClass("hidden");
    $("#interview").removeClass("hidden").transition("fade in", 300);
  });
}

function reset() {
  location.reload();
}

function closeModal() {
  $(".ui.modal").modal("hide");
}

