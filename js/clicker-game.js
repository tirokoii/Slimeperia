/* Med document.queryselector(selector) kan vi hämta
 * de element som vi behöver från html dokumentet.
 * Vi spearar elementen i const variabler då vi inte kommer att
 * ändra dess värden.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 * Viktigt: queryselector ger oss ett html element eller flera om det finns.
 */
const clickerButton = document.querySelector('#game-button');
const moneyTracker = document.querySelector('#money');
const ss = document.querySelector('#ss'); // sold slimes
const mpsTracker = document.querySelector('#mps'); // money per slime
const spcTracker = document.querySelector('#spc'); // slime per click
const spsTracker = document.querySelector('#sps'); // slime per second
const upgradesTracker = document.querySelector('#upgrades');
const upgradeList = document.querySelector('#upgradelist');
const msgbox = document.querySelector('#msgbox');
const audioAchievement = document.querySelector('#swoosh');

/* Följande variabler använder vi för att hålla reda på hur mycket pengar som
 * spelaren, har och tjänar.
 * last används för att hålla koll på tiden.
 * För dessa variabler kan vi inte använda const, eftersom vi tilldelar dem nya
 * värden, utan då använder vi let.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
 */
let slime = 0;
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let acquiredUpgrades = 0;
let last = 0;
let numberOfClicks = 0; // hur många gånger har spelare eg. klickat
let active = false; // exempel för att visa att du kan lägga till klass för att indikera att spelare får valuta

// likt upgrades skapas här en array med objekt som innehåller olika former
// av achievements.
// requiredSOMETHING är vad som krävs för att få dem

let achievements = [
    {
        description: 'Stor byggarn',
        requiredUpgrades: 1,
        acquired: false,
    },
    {
        description: 'Galen vetenskaps man',
        requiredUpgrades: 100,
        acquired: false,
    },
    {
        description: 'Tillbaka till fabriken',
        requiredUpgrades: 1000,
        acquired: false,
    },
    {
        description: 'En otydlig start',
        requiredClicks: 1,
        acquired: false,
    },
    {
        description: 'Nu börjar det likna något!',
        requiredClicks: 100,
        acquired: false,
    },
    {
        description: 'En vägg byggd av slime',
        requiredClicks: 1000,
        acquired: false,
    },
    {
        description: 'Slime doctor',
        requiredClicks: 10000,
        acquired: false,
    },
    {
        description: 'Nu börjar du bli girig',
        requiredClicks: 10001,
        acquired: false,
    },
];

/* Med ett valt element, som knappen i detta fall så kan vi skapa listeners
 * med addEventListener så kan vi lyssna på ett specifikt event på ett html-element
 * som ett klick.
 * Detta kommer att driva klickerknappen i spelet.
 * Efter 'click' som är händelsen vi lyssnar på så anges en callback som kommer
 * att köras vi varje klick. I det här fallet så använder vi en anonym funktion.
 * Koden som körs innuti funktionen är att vi lägger till moneyPerClick till
 * money.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
clickerButton.addEventListener(
    'click',
    () => {
        // vid click öka score med moneyPerClick
        money += slimePerClick;
        // håll koll på hur många gånger spelaren klickat
        numberOfClicks += 1;
        // console.log(clicker.score);
    },
    false
);

/* För att driva klicker spelet så kommer vi att använda oss av en metod som heter
 * requestAnimationFrame.
 * requestAnimationFrame försöker uppdatera efter den refresh rate som användarens
 * maskin har, vanligtvis 60 gånger i sekunden.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * funktionen step används som en callback i requestanaimationframe och det är
 * denna metod som uppdaterar webbsidans text och pengarna.
 * Sist i funktionen så kallar den på sig själv igen för att fortsätta uppdatera.
 */
function step(timestamp) {
    moneyTracker.textContent = Math.round(money);
    spsTracker.textContent = slimePerSecond;
    spcTracker.textContent = slimePerClick;
    mpsTracker.textContent = moneyPerSlime
    upgradesTracker.textContent = acquiredUpgrades;

    if (timestamp >= last + 1000) {
        money += slimePerSecond;
        last = timestamp;
    }

    if (slimePerSecond > 0 && !active) {
        spsTracker.classList.add('active');
        active = true;
    }

    // achievements, utgår från arrayen achievements med objekt
    // koden nedan muterar (ändrar) arrayen och tar bort achievements
    // som spelaren klarat
    // villkoren i första ifsatsen ser till att achivments som är klarade
    // tas bort. Efter det så kontrolleras om spelaren har uppfyllt kriterierna
    // för att få den achievement som berörs.
    achievements = achievements.filter((achievement) => {
        if (achievement.acquired) {
            return false;
        }
        if (
            achievement.requiredUpgrades &&
            acquiredUpgrades >= achievement.requiredUpgrades
        ) {
            achievement.acquired = true;
            message(achievement.description, 'achievement');
            return false;
        } else if (
            achievement.requiredClicks &&
            numberOfClicks >= achievement.requiredClicks
        ) {
            achievement.acquired = true;
            message(achievement.description, 'achievement');
            return false;
        }
        return true;
    });

    window.requestAnimationFrame(step);
}

/* Här använder vi en listener igen. Den här gången så lyssnar iv efter window
 * objeket och när det har laddat färdigt webbsidan(omvandlat html till dom)
 * När detta har skett så skapar vi listan med upgrades, för detta använder vi
 * en forEach loop. För varje element i arrayen upgrades så körs metoden upgradeList
 * för att skapa korten. upgradeList returnerar ett kort som vi fäster på webbsidan
 * med appendChild.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * Efter det så kallas requestAnimationFrame och spelet är igång.
 */
window.addEventListener('load', (event) => {
    upgrades.forEach((upgrade) => {
        upgradeList.appendChild(createCard(upgrade));
    });
    window.requestAnimationFrame(step);
});


/* En array med upgrades. Varje upgrade är ett objekt med egenskaperna name, cost
 * och amount. Önskar du ytterligare text eller en bild så går det utmärkt att
 * lägga till detta.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer
 */

upgrades = [
    {
        name: 'Grön slime',
        image: 'green-slime.png',
        cost: 10,
        amount: 1,
    },
    {
        name: 'Röd slime',
        image: 'red-slime.png',
        cost: 50,
        clicks: 2,
    },
    
    {
        name: 'Blå slime',
        image: 'blue-slime.png',
        cost: 100,
        clicks: 10,
    },
    {
        name: 'Lila slime',
        image: 'purple-slime.png',
        cost: 500,
        clicks: 10,
    },
    {
        name: 'Mycke pengar',
        image: '1-smiling.png',
        cost: 1000,
        amount: 100,
    },
    {
        name: 'Mer pengar',
        image: '10-smiling.png',
        cost: 1500,
        amount: 100,
    },
    {
        name: 'Mer pengar 2',
        image: '100-smiling.png',
        cost: 1500,
        amount: 100,
    },
    {
        name: 'Mäst pengar',
        image: '1000-smiling.png',
        cost: 1500,
        amount: 100,
    },
    {
        name: 'Hastighet grad 1',
        image: 'speed-one.png',
        cost: 1500,
        amount: 100,
    },
    {
        name: 'Hastighet grad 2',
        image: 'speed-two.png',
        cost: 1500,
        amount: 100,
    },
    {
        name: 'Hatsighet grad 3',
        image: 'speed-three.png',
        cost: 1500,
        amount: 100,
    },
    {
        name: 'Hatsighet grad 4',
        image: 'speed-four.png',
        cost: 1500,
        amount: 100,
    },
];

machines = [
    {
        name: mixer,
        image: 'mixer-png',
        cost: 1,
        amount: 10
    }
]

/* createCard är en funktion som tar ett upgrade objekt som parameter och skapar
 * ett html kort för det.
 * För att skapa nya html element så används document.createElement(), elementen
 * sparas i en variabel så att vi kan manipulera dem ytterligare.
 * Vi kan lägga till klasser med classList.add() och text till elementet med
 * textcontent = 'värde'.
 * Sedan skapas en listener för kortet och i den hittar vi logiken för att köpa
 * en uppgradering.
 * Funktionen innehåller en del strängar och konkatenering av dessa, det kan göras
 * med +, variabel + 'text'
 * Sist så fäster vi kortets innehåll i kortet och returnerar elementet.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 */


function createCard(upgrade) {
    const item = document.createElement('div');
    item.classList.add('item');
    const upgradeImage = document.createElement("img");
    const img = new Image();
    img.src = upgrade.image;
    upgradeImage.src = `./img/${upgrade.image}`;

    item.appendChild(upgradeImage)
    
    const textBox = document.createElement('div');
    textBox.classList.add('upgrade-text-box');
    const name = document.createElement('p');
    name.classList.add('upgrade-name');
    const des = document.createElement('p');
    des.classList.add('upgrade-des-cost');
    const cost = document.createElement('p');
    cost.classList.add('upgrade-des-cost');

    name.textContent = `${upgrade.name}`;
    if (upgrade.amount) {
        des.textContent = `+ ${upgrade.amount} per sekund`;
    } else {
        des.textContent = `+ ${upgrade.clicks} per clicks`;
    }
    cost.textContent = `Kostnad: ${upgrade.cost} smilings`;

    item.addEventListener('click', (e) => {
        if (money >= upgrade.cost) {
            acquiredUpgrades++;
            money -= upgrade.cost;
            upgrade.cost *= 1.5;
            cost.textContent = 'Köp för ' + upgrade.cost + ' smilings';
            slimePerSecond += upgrade.amount ? upgrade.amount : 0;
            slimePerClick += upgrade.clicks ? upgrade.clicks : 0;
            message('Grattis du har köpt en uppgradering!', 'success');
        } else {
            message('Du har inte råd.', 'warning');
        }
    });
    textBox.appendChild(name);
    textBox.appendChild(des);
    textBox.appendChild(cost);
    item.appendChild(textBox)
    return item;
}

/* Message visar hur vi kan skapa ett html element och ta bort det.
 * appendChild används för att lägga till och removeChild för att ta bort.
 * Detta görs med en timer.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
function message(text, type) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    if (type === 'achievement') {
        audioAchievement.play();
    }
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
}