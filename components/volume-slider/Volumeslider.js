// import { audioElement } from "../audioplayer/Audioplayer.js";

export default function Volumeslider(audioElement) {
  const volumeSlider = document.createElement("input");
  volumeSlider.setAttribute("type", "range");
  volumeSlider.max = 1;
  volumeSlider.step = 0.01;
  volumeSlider.classList.add("volume__slider");

  volumeSlider.addEventListener("input", () => {
    console.log(volumeSlider.value);
    console.log(audioElement.src);
    audioElement.volume = volumeSlider.value;

    const percentage = (volumeSlider.value / 1) * 100;
    volumeSlider.style.background = `linear-gradient(to right, #4ddd6f ${percentage}%, rgb(83, 83, 83) ${percentage}%)`;
  });

  return volumeSlider;
}
