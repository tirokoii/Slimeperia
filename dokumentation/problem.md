## Problem

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
