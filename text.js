

// let btn = document.querySelector("#btn");
// let content = document.querySelector("#content");
// let voice = document.querySelector("#voice");

// function speak(text) {
//     let text_speak = new SpeechSynthesisUtterance(text);
//     text_speak.rate = 1;
//     text_speak.pitch = 1;
//     text_speak.volume = 1;
//     text_speak.lang = "en-US";  // Use a more commonly supported language code
//     window.speechSynthesis.speak(text_speak);
// }

// function wishMe() {
//     let day = new Date();
//     let hours = day.getHours();
//     if (hours >= 0 && hours < 12) {
//         speak("Good morning Sir");
//     } else if (hours >= 12 && hours < 16) {
//         speak("Good afternoon Sir");
//     } else {
//         speak("Good evening Sir");
//     }
// }

// window.addEventListener('load', () => {
//     wishMe();
// });

// let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// let recognition = new speechRecognition();

// recognition.onresult = (event) => {
//     let currentIndex = event.resultIndex;
//     let transcript = event.results[currentIndex][0].transcript;
//     content.innerText = transcript;
//     takeCommand(transcript.toLowerCase());
// };

// btn.addEventListener("click", () => {
//     recognition.start();
//     btn.style.display = "none";
//     voice.style.display = "block";
// });

// function takeCommand(message) {
//     btn.style.display = "flex";
//     voice.style.display = "none";

//     if (message.includes("hello") || message.includes("hey")) {
//         speak("Hello Sir, what can I help you with?");
//     } else if (message.includes("who are you")) {
//         speak("I am a virtual assistant, created by Misbah Sir");
//     } else if (message.includes("open youtube")) {
//         speak("Opening YouTube...");
//         window.open("https://www.youtube.com/", "_blank");
//     } else if (message.includes("open google")) {
//         speak("Opening Google...");
//         window.open("https://www.google.com/", "_blank");
//     } else if (message.includes("open instagram")) {
//         speak("Opening Instagram...");
//         window.open("https://www.instagram.com/", "_blank");
//     } else if (message.includes("open calculator")) {
//         speak("Opening calculator...");
//         window.open("calculator://");
//     } else if (message.includes("open whatsapp")) {
//         speak("Opening WhatsApp...");
//         window.open("whatsapp://");
//     } else if (message.includes("time")) {
//         let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
//         speak(time);
//     } else if (message.includes("date")) {
//         let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
//         speak(date);
//     } else {
//         let FinalTest = "This is what I found on the internet regarding: " + message.replace("HADI", "");
//         speak(FinalTest);
//         window.open(`https://www.google.com/search?q=${message.replace("hadi", "")}`, "_blank");
//     }
// }
// // https://en.wikipedia.org/wiki/Virat_Kohli
//********************************************************************************************************************************************************** */

const btn = document.querySelector("#btn");
const content = document.querySelector("#content");
const voice = document.querySelector("#voice");
const originalText = content.innerText;

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-US";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 12) {
    speak("Good morning Sir");
  } else if (hour >= 12 && hour < 16) {
    speak("Good afternoon Sir");
  } else {
    speak("Good evening Sir");
  }
}

window.addEventListener("load", () => {
  if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
    alert("Speech Recognition is not supported in your browser.");
  } else {
    wishMe();
  }
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const transcript = event.results[event.resultIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

recognition.onerror = (e) => {
  speak("Sorry, I couldn't understand. Please try again.");
  btn.style.display = "flex";
  voice.style.display = "none";
};

recognition.onend = () => {
  btn.style.display = "flex";
  voice.style.display = "none";
};

btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "flex";
  voice.style.display = "none";
  content.innerText = originalText;

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello Sir, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant, created by Misbah Sir");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://www.youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://www.google.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://www.instagram.com/", "_blank");
  } else if (message.includes("time")) {
    const time = new Date().toLocaleTimeString();
    speak("The current time is " + time);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleDateString();
    speak("Today's date is " + date);
  } else {
    const response = "This is what I found on the internet about " + message;
    speak(response);
    window.open(`https://www.google.com/search?q=${message}`, "_blank");
  }
}
