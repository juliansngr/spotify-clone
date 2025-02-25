import { audioDatabase } from "../../utils/audio-database.js";
import { pauseSymbol, playSymbol } from "../../utils/svg.js";
import Volumeslider from "../volume-slider/Volumeslider.js";

function playAudio(audioElement) {
  audioElement.play();
}

function pauseAudio(audioElement) {
  audioElement.pause();
}

function stopAudio(audioElement) {
  audioElement.load();
}

export function AudioPlayer() {
  const audioElement = document.createElement("audio");

  const audioSource = document.createElement("source");
  audioElement.append(audioSource);

  const audioPlayerElement = document.createElement("div");
  audioPlayerElement.classList.add("audioplayer");

  const coverElement = document.createElement("img");
  coverElement.classList.add("audioplayer__coverimage");

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("audioplayer__buttoncontainer");

  const playButton = document.createElement("button");
  playButton.innerHTML = playSymbol;
  playButton.classList.add("audioplayer__button");

  buttonContainer.append(playButton);

  const durationBar = document.createElement("input");
  durationBar.setAttribute("type", "range");
  durationBar.classList.add("audioplayer__progressbar");

  audioElement.src = audioDatabase[0].path;
  coverElement.src = audioDatabase[0].cover;

  const trackSelect = document.createElement("select");
  trackSelect.classList.add("trackselect__select");

  audioDatabase.forEach((track) => {
    const trackOption = document.createElement("option");
    trackOption.value = `${track.path}`;
    trackOption.textContent = `${track.name}`;
    trackOption.setAttribute("img", `${track.cover}`);
    trackSelect.append(trackOption);
  });

  trackSelect.addEventListener("change", () => {
    audioElement.pause();
    audioElement.src = trackSelect.value;
    coverElement.src = trackSelect.selectedOptions[0].getAttribute("img");

    //update Playbar
    const percentage = 0;
    durationBar.style.background = `linear-gradient(to right, #4ddd6f ${percentage}%, rgb(83, 83, 83) ${percentage}%)`;

    playButton.innerHTML = playSymbol;
  });

  playButton.addEventListener("click", () => {
    durationBar.setAttribute("max", `${audioElement.duration}`);
    if (audioElement.paused) {
      playAudio(audioElement);
      playButton.innerHTML = pauseSymbol;
    } else {
      audioElement.pause();
      playButton.innerHTML = playSymbol;
    }
  });

  audioElement.addEventListener("timeupdate", () => {
    durationBar.value = audioElement.currentTime;
    const percentage = (durationBar.value / audioElement.duration) * 100;

    durationBar.style.background = `linear-gradient(to right, #4ddd6f ${percentage}%, rgb(83, 83, 83) ${percentage}%)`;
  });

  durationBar.addEventListener("input", (event) => {
    audioElement.currentTime = event.target.value;
    const percentage = (durationBar.value / audioElement.duration) * 100;

    durationBar.style.background = `linear-gradient(to right, #4ddd6f ${percentage}%,rgb(83, 83, 83) ${percentage}%)`;
  });

  const VolumesliderComponent = Volumeslider(audioElement);

  audioPlayerElement.append(
    coverElement,
    trackSelect,
    durationBar,
    buttonContainer,
    VolumesliderComponent
  );

  document.body.append(audioPlayerElement);
}
