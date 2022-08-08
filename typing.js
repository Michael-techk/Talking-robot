const box = document.querySelector('.typing');
const text = [
  "Wow!^Cieszę się, że jesteś.^Lubię mówić do ludzi!",
  "Jak masz na imię? Może Stanisław?^Był tu taki Stanisław kiedyś, spędziliśmy razem piękne wspólne chwile.",
  "Niestety żona kazała mu odejść od monitora i wrzucić węgiel do pieca.^Mam nadzieję, że Ty nie masz pieca!"
];
let wordIndex = 0;
let textIndex = 0;
let oldTime = 0;
const speed = 80; //czym większa wartość tym wolniejszy typing
const stop = 2000; //zatrzymanie między kolejnymi tekstami
let activeDOMElement = box;

const typing = (newTime) => {
  if (newTime - oldTime > speed) {
    const letter = text[textIndex].substr(wordIndex, 1);
    if (wordIndex === text[textIndex].length - 1) {
      if (textIndex === text.length - 1) {
        return;
      }
      return setTimeout(() => {
        box.textContent = "";
        textIndex++
        wordIndex = 0;
        requestAnimationFrame(typing)
      }, stop)

    } else if (wordIndex === 0 || letter === "^") {
      const p = document.createElement('p');
      box.appendChild(p);
      activeDOMElement = p;
    }

    if (!(letter === "^")) {
      activeDOMElement.textContent += letter;
    }

    oldTime = newTime;
    wordIndex++;
  }
  requestAnimationFrame(typing);

}

const bars = () => {
  const tl = new TimelineMax({ onComplete: bars });
  const scale = () => {
    return 0.1 + Math.random() * 3;
  }

//funckja ustalająca kolor i rozmiar elementu voice-bars
  const color = () => {
    const colors = ['green', 'red', 'yellow'];
    return colors[Math.floor(Math.random() * 3)];
  }
  const barsElement = document.querySelectorAll('#voice-bars > *');
  tl.set(barsElement, { y: -30, transformOrigin: '50% 50%' })
  tl.staggerTo(barsElement, .7, { scaleY: scale, repeat: 1, yoyo: true, fill: color, ease: Bounce.easeIn }, .1)
  return tl;
}

//funckja mrugania
const blink = () => {
  const tl = new TimelineMax({ repeat: -1, repeatDelay: 3, delay: 2 });
  const eyes = document.querySelectorAll('#eye-left, #eye-right');
  tl
    .set(eyes, { transformOrigin: "50% 50%" })
    .to(eyes, .1, { scaleY: 0, fill: "#231f20" })
    .to(eyes, .05, { scaleY: 1, fill: "#48b3e6" })
    .to(eyes, .12, { scaleY: 0, fill: "#231f20" }, "+=0.5")
    .to(eyes, .03, { scaleY: 1, fill: "#48b3e6" })
    .to(eyes, .08, { scaleY: 0, fill: "#231f20" }, "+=1.5")
    .to(eyes, .08, { scaleY: 1, fill: "#48b3e6" })

  return tl;
}

//funkcja poruszająca pojedynczą nogą
const move = (legs) => {
  const tl = new TimelineMax();
  tl.staggerTo(legs, .5, { y: -60, repeat: -1, yoyo: true, ease: Power0.easeNone }, .5)
  return tl;
}

// Master Timeline
const master = new TimelineMax();
master.add('start');
master.add(move(document.querySelectorAll('#leg-right, #leg-left')), "start");
master.add(bars(), "start");
master.add(blink(), "start");


typing()
