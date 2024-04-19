let spaekButton = document.createElement("button");
let btnContainer = document.getElementById("control-btns");
spaekButton.innerHTML = "▶️";
spaekButton.onclick = toggleSpeech;
spaekButton.id = "listen-btn";
spaekButton.title = "Listen to the article";

btnContainer.appendChild(spaekButton);

let isSpeaking = false;
let utterance;

async function toggleSpeech() {
  if (isSpeaking) {
    window.speechSynthesis.cancel();
    spaekButton.innerHTML = "▶️";
  } else {
    speakText();
    spaekButton.innerHTML = "⏹️";
  }

  isSpeaking = !isSpeaking;
}

async function speakText() {
  const allTextNodes = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let fullText = "";

  while (allTextNodes.nextNode()) {
    fullText += allTextNodes.currentNode.textContent + " ";
  }

  utterance = new SpeechSynthesisUtterance(fullText);
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices[0];

  utterance.onend = function () {
    spaekButton.innerHTML = "▶️";
    isSpeaking = false;
  };

  window.speechSynthesis.speak(utterance);
}
