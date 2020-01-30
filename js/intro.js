// comment and uncomment the examples to try them out

const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shuffle = array => array.sort(() => Math.random() - 0.5);

let floorPosition = 110;
let totalMonsters = 40;
let tween;
let tl1;
let tl2;

function setupMonsters() {
    let characters = Array(totalMonsters)
        .fill()
        .map((_, idx) => idx);

    characters.forEach((characterId, idx) => {
        const domEl = document.createElement("div");
        domEl.className = "character monster-" + idx;
        domEl.innerHTML = `<img src='images/PNG/${characterId}.png'>`;
        document.body.appendChild(domEl);
    });
}

function showObstacle() {
    let obstacle = document.querySelector(".obstacle1");
    obstacle.style.display = `block`;
    obstacle.style.bottom = `${floorPosition}px`;
    obstacle.style.left = `700px`;
}

function generateJustOneMonster(requestedMonster) {
    let chosenMonster =
        requestedMonster === undefined ? randomInt(0, totalMonsters - 1) : requestedMonster;
    let character = document.querySelector(`.monster-${chosenMonster}`);

    character.style.display = "block";
    character.style.bottom = `${floorPosition}px`;

    return character;
}

setupMonsters();



example11();

function example11() {
    // let characters = document.querySelectorAll(".character");
    // characters = [...characters].splice(0, 7);
    // characters = shuffle([...characters]);

    characters.forEach((character, idx) => {
        character.style.opacity = 0;
        character.style.display = "block";
        character.style.left = `${150 * idx}px`;
        character.style.bottom = `${floorPosition}px`;
    });

    tween = gsap.to(".character", {
        duration: 1,
        opacity: 1,
        delay: 0.25,
        stagger: 0.5,
        ease: "elastic"
    });

    characters[3].onclick = function () {
        gsap.to(this, {
            duration: 1,
            opacity: 1,
            delay: 0.25,
            stagger: 0.5,
            ease: "elastic",
            bottom: 300
        });
    };
}
