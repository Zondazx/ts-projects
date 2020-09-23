var keys = document.querySelectorAll(".key");
keys.forEach(function (key) { return key.addEventListener("transitionend", removeTransition); });
window.addEventListener("keydown", playSound);
function playSound(e) {
    var audio = document.querySelector("audio[data-key=\"" + e.key + "\"]");
    var key = document.querySelector(".key[data-key=\"" + e.key + "\"]");
    if (!audio)
        return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
}
function removeTransition(e) {
    if (e.propertyName !== "transform")
        return;
    this.classList.remove("playing");
}
