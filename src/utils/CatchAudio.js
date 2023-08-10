import kuru1 from '../assets/audio/kuru1.mp3'
import kuru2 from '../assets/audio/kuru2.mp3'
import kuru3 from '../assets/audio/kuruto.mp3'

var audioList = [
    new Audio(kuru1),
    new Audio(kuru2),
    new Audio(kuru3),
];

for (const audio of audioList) {
    audio.preload = "auto";
}

var firstSquish = true;

function playKuru() {
    var audio;

    if (firstSquish) {
        firstSquish = false;
        audio = audioList[0].cloneNode();
    } else {
        var random = Math.floor(Math.random() * 2) + 1;
        audio = audioList[random].cloneNode();
    }

    audio.play();

    audio.addEventListener("ended", function () {
        this.remove();
    });
}

export default playKuru