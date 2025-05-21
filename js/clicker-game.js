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
const mpsTracker = document.querySelector('#mps'); // money per slime
const spcTracker = document.querySelector('#spc'); // slime per click
const spsTracker = document.querySelector('#sps'); // slime per second
const upgradesTracker = document.querySelector('#upgrades');
const upgradeList = document.querySelector('#upgradelist');
const machineList = document.querySelector('#machinelist');
const achievementsAcquired = document.querySelector('#achievementlist');
const msgbox = document.querySelector('#msgbox');
const trophy = document.querySelector('#trophy');
/* Följande variabler använder vi för att hålla reda på hur mycket pengar som
 * spelaren, har och tjänar.
 * last används för att hålla koll på tiden.
 * För dessa variabler kan vi inte använda const, eftersom vi tilldelar dem nya
 * värden, utan då använder vi let.
 * Läs mer: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
 */

let unlockedAchievements = [];
let earned_money = 0;
let slimeWorth = 1;
let money = 0;
let slimePerClick = 1;
let slimePerSecond = 0;
let acquiredUpgrades = 0;
let acquiredMachines = 0;
let acquiredClicks = 0;
let last = 0;
let numberOfClicks = 0; // hur många gånger har spelare eg. klickat
let active = false; // exempel för att visa att du kan lägga till klass för att indikera att spelare får valuta

// likt upgrades skapas här en array med objekt som innehåller olika former
// av achievements.
// requiredSOMETHING är vad som krävs för att få dem

let achievementList = [
    {
        name: 'Stor byggarn',
        description: 'Bygg 1 maskin',
        requiredMachines: 1,
        acquired: false,
    },
    {
        name: 'Galen vetenskaps man',
        description: 'Bygg 100 maskiner',
        requiredMachines: 100,
        acquired: false,
    },
    {
        name: 'Tillbaka till fabriken',
        description: 'Bygg 1000 maskiner',
        requiredMachines: 1000,
        acquired: false,
    },
    {
        name: 'Upgraderings Good',
        description: 'Köp din allra första upgradering',
        requiredUpgrades: 1,
        acquired:false
    },
    {
        name: '!!!',
        description: 'Köp 10 upgraderingar',
        requiredUpgrades: 10,
        acquired:false
    },
    {
        name: 'Ojoj',
        description: 'Köp din allra första upgradering',
        requiredUpgrades: 1000,
        acquired:false
    },
    {
        name: 'En otydlig start',
        description: 'Klicka för första gången',
        requiredClicks: 1,
        acquired: false,
    },
    {
        name: 'Nu börjar det likna något!',
        description: 'Kilcka 100 gånger',
        requiredClicks: 100,
        acquired: false,
    },
    {
        name: 'En vägg byggd av slime',
        description: 'Kilcka 1000 gånger',
        requiredClicks: 1000,
        acquired: false,
    },
    {
        description: 'Slime doctor',
        description: 'Klicka 10000 gånger',
        requiredClicks: 10000,
        acquired: false,
    },
    {
        name: 'Click kungen',
        description: 'Klicka 100000 gånger',
        requiredClicks: 100000,
        acquired: false,
    },
    {
        name: 'Bra jobbat!',
        description: 'Tjäna 100 smilings',
        earned_money: 100,
        acquired: false,
    },
    {
        name: 'Vilken penga kung du är',
        description: 'Tjäna 10000 smilings',
        earned_money: 10000,
        acquired: false,
    },
    {
        name: 'Moneymaker',
        description: 'Tjäna 100000 smilings',
        earned_money: 100000,
        acquired: false,
    },
    {
        name: 'Jeff Pesos',
        description: 'Tjäna 10000000 smilings',
        earned_money: 10000000,
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
        money += slimePerClick * slimeWorth;
        // håll koll på hur många gånger spelaren klickat
        numberOfClicks += 1;
        // console.log(clicker.score);
    },
    false
);


function open_close() {
    if (achievementsAcquired.style.display == "none") {
        achievementsAcquired.style.display = "block";
    } else {
        achievementsAcquired.style.display = "none";
    }
}

trophy.addEventListener(
    'click',
    () => {
        open_close();
    },
    false
)

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
    console.log(money)
    moneyTracker.textContent = `Börs: ${Math.round(money)}`;
    spsTracker.textContent = `Slimes per sekund: ${slimePerSecond}`;
    spcTracker.textContent = `Slimes per klicks: ${slimePerClick}`;
    mpsTracker.textContent = `Smilings per slime: ${slimeWorth}`;

    if (timestamp >= last + 1000) {
        money += slimePerSecond * slimeWorth;
        earned_money += money;
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

    achievementList = achievementList.filter((achievement) => {
        if (achievement.acquired) {
            return false;
        }
        if (
            achievement.requiredUpgrades &&
            acquiredUpgrades >= achievement.requiredUpgrades
        ) {
            achievement.acquired = true;
            message(achievement.name, 'achievement', achievement.description);
            return false;
        } else if (
            achievement.requiredClicks &&
            numberOfClicks >= achievement.requiredClicks
        ) {
            achievement.acquired = true;
            message(achievement.name, 'achievement', achievement.description);
            return false;
        } else if (
            achievement.requiredMachines &&
            acquiredMachines >= achievement.requiredMachines
        ) {
            achievement.acquired = true;
            message(achievement.name, 'achievement', achievement.description);
            return false;
        }
        return true;
    });

    if (acquiredMachines > 0) {
        document.getElementById('map-part-one').style.visibility = "visible";
    }
    if (acquiredMachines > 10) {
        document.getElementById('map-part-two').style.visibility = "visible";
    }
    if (acquiredMachines > 20) {
        document.getElementById('map-part-three').style.visibility = "visible";
    }
    if (acquiredMachines > 30) {
        document.getElementById('map-part-four').style.visibility = "visible";
    }

    if (acquiredClicks > 0) {
        document.getElementById('bolt-one').style.visibility = "visible";
    }
    if (acquiredClicks > 5) {
        document.getElementById('bolt-two').style.visibility = "visible";
    }
    if (acquiredClicks > 10) {
        document.getElementById('bolt-three').style.visibility = "visible";
    }
    if (acquiredClicks > 15) {
        document.getElementById('bolt-four').style.visibility = "visible";
    }
    if (acquiredClicks > 20) {
        document.getElementById('bolt-five').style.visibility = "visible";
    }
    if (acquiredClicks > 25) {
        document.getElementById('bolt-six').style.visibility = "visible";
    }
    if (acquiredClicks > 30) {
        document.getElementById('bolt-seven').style.visibility = "visible";
    }
    if (acquiredClicks > 35) {
        document.getElementById('bolt-eight').style.visibility = "visible";
    }
    if (acquiredClicks > 40) {
        document.getElementById('bolt-nine').style.visibility = "visible";
    }
    if (acquiredClicks > 45) {
        document.getElementById('bolt-ten').style.visibility = "visible";
    }

    if (earned_money > 10000000000) {
        window.location.replace("http://127.0.0.1:5500/end.html");
    }

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
    machines.forEach((machine) => {
        machineList.appendChild(createMachineCard(machine));
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
        worth: 1,
    },
    {
        name: 'Röd slime',
        image: 'red-slime.png',
        cost: 50,
        worth: 2,
    },
    
    {
        name: 'Blå slime',
        image: 'blue-slime.png',
        cost: 100,
        worth: 10,
    },
    {
        name: 'Lila slime',
        image: 'purple-slime.png',
        cost: 500,
        worth: 25,
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
        cost: 3000,
        amount: 160,
    },
    {
        name: 'Mer pengar 2',
        image: '100-smiling.png',
        cost: 60000,
        amount: 250,
    },
    {
        name: 'Mäst pengar',
        image: '1000-smiling.png',
        cost: 100000,
        amount: 10000,
    },
    {
        name: 'Hastighet grad 1',
        image: 'speed-one.png',
        cost: 1500,
        clicks: 10,
    },
    {
        name: 'Hastighet grad 2',
        image: 'speed-two.png',
        cost: 5000,
        clicks: 100,
    },
    {
        name: 'Hatsighet grad 3',
        image: 'speed-three.png',
        cost: 15000,
        clicks: 300,
    },
    {
        name: 'Hatsighet grad 4',
        image: 'speed-four.png',
        cost: 1200000,
        clicks: 1000,
    },
];


machines = [
    {
        name: 'Mixer',
        image: 'mixer.png',
        des: 'Ett fantastiskt sätt att mixa din slime på',
        cost: 10,
        amount: 2,
        bought: 0
    },
    {
        name: 'Slime blandare',
        image: 'slime-mixer-cement.png',
        des: 'Det kan inte bli bättre än så här',
        cost: 1300,
        amount: 20,
        bought: 0
    },
    {
        name: 'Modifierad mixer',
        image: 'mixer-modified.png',
        des: 'Ett ännu bättre sätt att blanda på',
        cost: 6000,
        amount: 50,
        bought: 0
    },
    {
        name: 'Bladblandare',
        image: 'bladblandare.png',
        des: 'Va?',
        cost: 10000,
        amount: 140,
        bought: 0
    },    {
        name: 'Bladblandare 2.0',
        image: 'bladblandare-modified.png',
        des: 'Seriöst? Ett bättre sätt...',
        cost: 400000,
        amount: 300,
        bought: 0
    },
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

function createMachineCard(machine) {
    const itemBox = document.createElement('div');
    itemBox.classList.add('machine-box');

    const item = document.createElement('div');
    item.classList.add('machine');

    const machineImage = document.createElement('img');
    const img = new Image();
    img.src = machine.image;
    machineImage.src = `./img/${machine.image}`;

    item.appendChild(machineImage);
    const text = document.createElement('div');
    const name = document.createElement('h4');
    const des = document.createElement('p');
    const divider = document.createElement('img');
    divider.classList.add('horizontal-divider')

    name.textContent = `${machine.name}`;
    des.textContent = `${machine.des}`

    const textBox = document.createElement('div');
    textBox.classList.add('upgrade-text-box');
    const popUpName = document.createElement('p');
    popUpName.classList.add('upgrade-name');
    const popUpDes = document.createElement('p');
    popUpDes.classList.add('upgrade-des-cost');
    const cost = document.createElement('p');
    cost.classList.add('upgrade-des-cost');

    popUpName.textContent = `${machine.name}`;
    if (machine.amount) {
        popUpDes.textContent = `+ ${machine.amount} per sekund`;
    } else if (machine.clicks) {
        popUpDes.textContent = `+ ${machine.clicks} per clicks`;
    } else {
        popUpDes.textContent = `+ ${machine.worth} per slime`;
    }
    cost.textContent = `Kostnad: ${machine.cost} smilings`;

    item.addEventListener('click', (e) => {
        if (money >= machine.cost) {
            acquiredMachines++;
            money -= machine.cost;
            machine.cost *= 1.2;
            machine.cost = Math.round(machine.cost);
            slimePerSecond += machine.amount ? machine.amount : 0;
            slimePerClick += machine.clicks ? machine.clicks : 0;
            slimeWorth += machine.worth ? machine.worth : 0;
            message('Du har köpt en uppgradering!', 'success', '0');
        } else {
            message('Du har inte råd.', 'warning', '0');
        }
    });

    textBox.appendChild(popUpName);
    textBox.appendChild(popUpDes);
    textBox.appendChild(cost);
    text.appendChild(name);
    text.appendChild(des);
    item.appendChild(text);
    item.appendChild(textBox);
    itemBox.appendChild(item);
    itemBox.appendChild(divider);
    return itemBox;
};

function createCard(upgrade) {
    const item = document.createElement('div');
    item.classList.add('item');

    const upgradeImage = document.createElement('img');
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
    } else if (upgrade.clicks) {
        des.textContent = `+ ${upgrade.clicks} per clicks`;
    } else {
        des.textContent = `+ ${upgrade.worth} per slime`;
    }
    cost.textContent = `Kostnad: ${upgrade.cost} smilings`;

    item.addEventListener('click', (e) => {
        if (money >= upgrade.cost) {
            acquiredUpgrades++;
            if (upgrade.requiredUpgrades) {
                acquiredUpgrades++;
            } else if (upgrade.clicks) {
                acquiredClicks++;
            }
            money -= upgrade.cost;
            upgrade.cost *= 1.5;
            upgrade.cost = Math.round(upgrade.cost);
            cost.textContent = 'Köp för ' + upgrade.cost + ' smilings';
            slimePerSecond += upgrade.amount ? upgrade.amount : 0;
            slimePerClick += upgrade.clicks ? upgrade.clicks : 0;
            slimeWorth += upgrade.worth ? upgrade.worth : 0;
            message('Du har köpt en uppgradering!', 'success', '0');
        } else {
            message('Du har inte råd.', 'warning', '0');
        }
    });
    textBox.appendChild(name);
    textBox.appendChild(des);
    textBox.appendChild(cost);
    item.appendChild(textBox);
    return item;
};

function createAchievementCard(name, description) {
    const div = document.createElement('div');
    div.classList.add('unlocked-achievement');
    const h4 = document.createElement('h4');
    h4.textContent = name;
    const p = document.createElement('p');
    p.textContent = description;

    div.appendChild(h4);
    div.appendChild(p);
    return div;
};
/* Message visar hur vi kan skapa ett html element och ta bort det.
 * appendChild används för att lägga till och removeChild för att ta bort.
 * Detta görs med en timer.
 * Läs mer:
 * https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
 * https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 */
function message(text, type, description) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    if (type === 'achievement') {
        a = createAchievementCard(text, description);
        achievementsAcquired.append(a);
    }
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
};