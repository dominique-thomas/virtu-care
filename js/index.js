/**
 * Project: VirtuCare
 * Description: Handles core logic for voice recognition, session flow, patient responses, and summary feedback generation.
 * Author: Dominique Thomas (github.com/dominique-thomas)
 * License: Shared publicly for demonstration purposes only. Reuse or redistribution not permitted without permission.
 */
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
let isVideoPaused = false;
let hintCounter = 0;
let currentEmotionVideo = null;
const maxHints = 2;
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
  generatePatientProfile();
  $("#patientName").html(fullPatientName);
} else {
  $("#speechWarning").removeClass("hidden");
}

//Set the patient's full name
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

//Show a random patient
function getRandomCharacter() {
  const characters = ["randy", "tracy"];
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

//Get a random scenario 
function getRandomScenario(patient) {
  const patientScenarios = Object.keys(scenarios).filter(key => {
    return key.startsWith(patient) || !key.includes("-");
  });
  return randomFromArray(patientScenarios);
}

//Helper function that shows a particular video based on thier emotion (e.g., neutral, sad, angry)
function showPatientVideo(emotion) {
  const videoContainer = $(".video-container");
  const overlay = $(".overlay");
  const videoElement = $("#patientVideo")[0];
  const videoSource = $("#video-source");

  //Don't do anything if the video same video is already playing or if the video is paused by the user
  if (currentEmotionVideo === emotion && !videoElement.paused) {
    return;
  }

  currentEmotionVideo = emotion;

  const videoName = `${activePatient}_${emotion}.mp4`;
  videoSource.attr("src", `videos/${videoName}`);

  videoElement.pause();
  videoElement.load();

  overlay.css("opacity", 1);
  videoContainer.show();

  setTimeout(function() {
    overlay.css("opacity", 0);
    videoElement.classList.add("videoFadeIn");
    
    // Only play the video if it's not paused
    videoElement.oncanplay = function() {
      if (!isVideoPaused) {
        videoElement.play();
      }
    };
  }, 100);
}

// Function to handle pausing
function toggleVideoPause() {

  const icon = $("#videoToggle i");
  const videoElement = $("#patientVideo")[0];
  
  if (videoElement.paused) {
    isVideoPaused = false;
    videoElement.play();
    icon.removeClass("play").addClass("pause");
  } else {
    isVideoPaused = true;
    videoElement.pause();
    icon.removeClass("pause").addClass("play");
  }
}

//Modal information
$("#micModal").modal({
  closable: false,
  autofocus: false,
  observeChanges: true,
  onHide: resetTimer
});

//Reset timer for the speech modal
function resetTimer() {
  timeLeft = 60;
  
  clearInterval(timerInterval); 
  $("#timer").html(timeLeft);
  
  recognition.stop();
  isListening = false;
 
  setTimeout(function(){  
    renderPatientMessage(patientTranscript);
    setTimeout(function() {
      $("#chatArea").scrollTop($("#chatArea")[0].scrollHeight);
    }, 100);
  }, 800);
} 

//Stop listining to the user's speech
function stopListening() {
  $("#micModal").modal("hide");
}

//Display the message in the div and in the chat log
function renderUserMessage(message) {
  const messageHtml = `
    <div class="message-wrapper user">
      <div class="message user">
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

  const messageHtml = `
    <div class="message-wrapper patient">
      <div class="message patient">
      ${message}
      </div>
    </div>
  `;
  $(".chat-log").append(messageHtml);
}

//Change the video to show their 'trigger' keywords
function showEmotionForResponse(response) {

  const characterEmotionKeywords = emotionKeywords[activePatient];
  const scenarioEmotionKeywords = emotionKeywords[currentScenario] || { sad: [], angry: [] };

  //For specific characters
  for (let keyword of characterEmotionKeywords.sad) {
    if (response.includes(keyword)) {
      showPatientVideo("sad");
      return;
    }
  }

  for (let keyword of characterEmotionKeywords.angry) {
    if (response.includes(keyword)) {
      showPatientVideo("angry");
      return;
    }
  }

  // Check for scenarios
  for (let keyword of scenarioEmotionKeywords.sad) {
    if (response.includes(keyword)) {
      showPatientVideo("sad");
      return;
    }
  }

  for (let keyword of scenarioEmotionKeywords.angry) {
    if (response.includes(keyword)) {
      showPatientVideo("angry");
      return;
    }
  }

  //By default show neutral
  showPatientVideo("neutral");
}

//Handles speech recognition
recognition.onresult = function(event) {
  $(".chatPrompt").addClass("hidden");

  let tmpTranscript = capitalizeFirst(event.results[0][0].transcript);
  let transcript = addPunctuation(tmpTranscript);
  const categoryKey = detectCategory(transcript);

  //Display the user's speech
  renderUserMessage(transcript);
  $("#liveTranscript").html(transcript);
  showEmotionForResponse(transcript);

  //Display the patient's response
  const response = getResponse(activePatient, categoryKey, currentScenario, transcript);
  patientTranscript = response;  
};

//Helper function used to get the 
function getResponse(character, categoryKey, scenarioKey) {
  const scenario = scenarios[scenarioKey];
  const category = categories[categoryKey];

  console.log(categoryKey)
  if(categoryKey === null){
    return randomFromArray(characterFallbackResponses);
  }

  if (category.covered && categoryKey !== "insult") {
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

  category.covered = true;
  return randomFromArray(category.defaultResponses);
}

function detectCategory(input) {

  input = input.trim().toLowerCase().replace(/[^\w\s]/g, "");
   
  for (const category in keywords) {
    if (keywords[category].some(word => input.includes(word))) {
      return category;
    }
  }
  
  return null;
}

//Show a random hint
function getRandomHint() {
  const closeModalStr = `<i class="close icon" onclick="closeModal()"></i>`;
  const scenario = scenarios[currentScenario];
  const required = scenario.requiredCategories || [];

  const uncoveredHints = hintSuggestions.filter(h => {
    return (
      required.includes(h.category) &&
      !categories[h.category].covered &&
      !shownHintCategories.includes(h.category)
    );
  });

  if (uncoveredHints.length === 0 || hintCounter >= maxHints) {
    $(".hint.header").html("Hints" + closeModalStr);
    $("#hintText").html("Sorry, you've already seen all the available hints for this interview session!");
    return;
  }

  const randomHint = randomFromArray(uncoveredHints);
  shownHintCategories.push(randomHint.category);
  hintCounter++;

  const hintsString = `Hints (${hintCounter} of ${maxHints})`;
  $(".hint.header").html(hintsString + closeModalStr);
  $("#hintText").html(randomHint.hint);
}

//Show the patient profile
function generatePatientProfile(){

  const profile = patientProfiles[activePatient];
  let profileHTML = "";

  for (const [key, value] of Object.entries(profile)) {
    const label = capitalizeFirst(key.replace(/([A-Z])/g, ' $1'));
    profileHTML += `<div class="item"><span class="emphasis">${label}:</span> ${value}</div>`;
  }

  $("#profileDetails").html(profileHTML);
}

//Generate the summary
function generateSummary() {
  const scenario = scenarios[currentScenario];  
  const requiredCategories = scenario.requiredCategories || []; 
  const keyConcerns = scenario.keyConcerns
    ? `<li>${scenario.keyConcerns}</li>`
    : "<li>The patient came in for a routine annual checkup.</li>";
  
  const fullRequired = ["greeting", ...requiredCategories, "closing"];

  const coveredCategories = [];
  const missedCategories = [];

  // Loop through all categories and list ones that were covered
  Object.keys(categories).forEach(key => {
    const category = categories[key];
    if (category.covered) {
      const iconClass = categoryIcons[key] || "fa-circle";
      const listItem = `
        <li>
          <i class="emphasis fas ${iconClass}" style="margin-right: 8px;"></i>
          <span class="emphasis">${capitalizeFirst(key)}:</span> ${category.importance || 'No description available.'}
        </li>`;
      coveredCategories.push(listItem);
    }
  });

  // Loop through required categories and find ones that were missed
  fullRequired.forEach(key => {
    const category = categories[key];
    if (!category || category.covered) return;

    const iconClass = categoryIcons[key] || "fa-circle";
    const listItem = `
      <li>
        <i class="emphasis fas ${iconClass}" style="margin-right: 8px;"></i>
        <span class="emphasis">${capitalizeFirst(key)}:</span> ${category.importance || 'No description available.'}
      </li>`;
    missedCategories.push(listItem);
  });

  if (coveredCategories.length === 0) {
    coveredCategories.push("<li>N/A</li>");
  }

  if (missedCategories.length === 0) {
    missedCategories.push("<li>N/A</li>");
  }

  $("#reasonForVisitList").html(keyConcerns);
  $("#coveredList").html(coveredCategories.join(""));
  $("#missedList").html(missedCategories.join(""));
}
  
//Check to see if the user asked a question or made a statement
function addPunctuation(response) {
  const questionWords = ["who", "what", "when", "where", "how", "why", "is", "are", "can", "do", "does"];
  response = response.trim();

  const firstWord = response.split(' ')[0].toLowerCase();

  if (questionWords.includes(firstWord)) {
    return response + "?";
  }

  return response + ".";
}

//Helper function used to get a random element from the array
function randomFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

//Helper function that capitalizes the first word of a string
function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//-----------------------------------------
// Testing and Debugging
//-----------------------------------------
function runAudit(character, scenarioKey) {
  const scenario = scenarios[scenarioKey];
  
  console.log(`Key Concerns: ${scenario.keyConcerns || "No key concerns provided"}`);

  for (const categoryKey in categories) {
    const category = categories[categoryKey];

    const question = getCategoryQuestion(categoryKey);
    
    let response = scenario[categoryKey]?.override
    ? scenario[categoryKey].responses.join(" / ")
    : character[categoryKey]?.[0] || category.defaultResponses?.[0] || "No response provided";  

    console.log(`Q: ${question}\nA: ${response}\n`);

    if (!response || response === "No response provided") {
      console.log(`${categoryKey} is missing!`);
    }
  }
}


function getCategoryQuestion(category) {
  const questions = {
    greeting: "Good afternoon.",
    reason: "What are we seeing you for today?",
    reproductive: "Is your cycle normal?",
    duration: "How long has this issue occured?", 
    lifestyle: "Can you tell me about your daily activities?",
    sleep: "How has your sleep been lately?",
    diet: "What is your diet like?",
    pain: "Are you experiencing any pain?",
    stress: "How are you managing your stress levels?",
    medication: "Are you on any medications?",
    substance: "Do you use any substances like alcohol or caffeine?",
    insult: "Are you stupid?",
    closing: "Goodbye."
  };

  return questions[category] || "No question defined for this category.";
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
      $("#timer").html(timeLeft);
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

function showPatientProfile(){
  $("#profileModal").modal("show");
}

function showMicPrompt(){
  $("#micAccessModal").modal("show");
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

