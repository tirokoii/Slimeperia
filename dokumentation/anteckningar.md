## Ungefärlig tidslinje för skapandet
- Planering
- Ideer
- Research/referencer
- Skiss
- Research/referencer
- Figma
- Skapa layout för webbsida i html
- Kopiera coden från det forkade js till en ny fil
- Byt namn på variablerna, klasserna samt id's
- Skapa den första logiken (trackers)
- Bygga om upgrades sectorn, så att javascript skapade elementen och en popup med information om upgraderingen visades
- Göra på samma viss som med upgrades på machines
- Göra mapen som är i mitten och få dem att ha villkor för när de ska bli synlig
- Göra samma sak med blixtarna på den vänstra sidan
- Responsivitet


## Problem

### img
Jag visste inte allts hur jag skulle få individuella images för varje upgrade. Jag prövade flera sätt och sökte up men inget fungerade. Jag fick fråga våran lärare om hur man gjorde. Det visade sig att man först behövde skapa en ny variabel med värdet: new Image(), och sedan sätta sources för variabel till bilden man ville ha.

Problem löst!

### Utdata
Jag stötte på problemet att utdatan för description på upgraderingarna vart NumN. 

Det första jag gjorde var att kolla när det vart problem i if satsen som jag hade skrivit till description av upgraderingar. Jag prövade ändra på den och skriva den på olika vis, men inget fungerade. 

Efter en stud så kollade jag om det var något problem med min if sats, det var då jag kom på att när jag skrev den så var jag osäker på om elif var skrivet korrekt. Så jag kollade upp hur man ska skriva i javascript och ändrade det från elif till else if.

Problemet löst!

### Map inte synlig
Min map ville inte bli visable. Det visade sig att jag var tvungen att skriva getElementById för att få ankommst till funktionen style för att ändra visability. 
Under prövningen av att ändra aquiredMachines i console logen fungerade den inte, det var bara den första bilden som visades. 

Jag hade skrivit if satsen så att den alltid gör det första villkoret genom att skriva det minsta värdet först. Vilket är förståligt, så jag ändrade så att det största villkoret var först. Men av någon anledning fungerade det inte heller... Så jag prövade skriva om det igen, inget kom upp. Jag gick tillbaka till när den första dök up och skrev om det som separata if satser, och då äntligen fungerade det.

Problemet löst!


### Hela knappen snurrar!

När jag försökte få en spin animation på hjulet runt knappen började helt plötsligt knappen och staven snurra. Det var för att knappen och staven var cildren av hjulet. Det fixade jag genom att separera dem och istället göra dem children av button-box.

Problemet löst!

### Responsivitet fungerar inte

Spelet är inte ett dugg resposivt. Den skalar inte med sidan allts. Det är för att jag har satt ett betämt värde på alla längder och höjder. Exempelvis width: 10ch. Vilket betyder att den inte kommer att skala till min skärm. Jag började med att ändra width och height på de 3 containerna jag har: left, middle, right, så att de skalade med skrämen. Sedan ändrade jag individuella element som även behövde vara responsiva inom containerna. Det fungerade inte rikigt som jag tänkte, eftersom visa element fortfarande inte skalade ordentligt. Jag prövade då att ändra enheten på width vw (viewport width) för att se om det gjorde någon skillnad, vilket det gjorde. Jag fick aldrig riktigt till responsiviteten för mindre skärmar men de andra fungerar hyfsat.

Problemet inte rikitgt löst


Phone-versionen är inte klar ännu. Men mitt spel är inte tänkt att spelas på telefon. Den kommer när jag orkar

### List problem

Jag ville implementera en lista som samlar de "utmärkelserna" spelaren har uppnått under sin spel gång. Och sedan göra den tillgänglig för spelaren att hitta dem genom att trycka på en trophy.
Jag började med att placera ut dem som jag ville att det skulle se ut i html mappen, länkade trophyns och boxens html id'n till javascript filen för att sedan kunna använda dem för att clicka och lägga till element från java. Det första jag gjorde var att skapa en ny function för skapandet av "korten", den heter createAchievementCard, sedan skapande jag elementen jag ville skulle ingå i korten och gav dem css klasser.
Nästa steg var att få den att skriva ut korten med text. I slut ändan lade jag till parametrar och lade in functionen i message functionen, för att få den att lägga till dem när meddelandena dök up. Men när jag gjorde det lade den även till fel meddelandena och köpen, därför skrev jag ett villkor som gjorde så att om typen var achivement skulle den skapa.

# Till nästa gång:
- Achivements (machines), acquired machines (messege) 
- Acquired achivements list, (java), appear after acquired in list.
- Earnings, (math), graphs
- Phone version
- Trophy scaling problem

Fixat: 
Acquired achivements list
Achivements (acquired machines)
