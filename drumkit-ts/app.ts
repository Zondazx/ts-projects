const keys: NodeList = document.querySelectorAll(".key");

keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);

function playSound(e: KeyboardEvent): void {
    const audio: HTMLAudioElement = document.querySelector(`audio[data-key="${e.key}"]`);
    const key: HTMLElement = document.querySelector(`.key[data-key="${e.key}"]`);

    if (!audio) return;

    audio.currentTime = 0;
    audio.play();

    key.classList.add("playing");
}

function removeTransition(e: TransitionEvent): void {
    if (e.propertyName !== "transform") return;

    this.classList.remove("playing");
}