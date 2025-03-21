let inventory;
let heroName;
let weapon;

function checkSelection() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    return selectedOption.value;
  } else {
    alert("Bitte eine Option auswählen!");
  }
}

function startGame() {
  const content = document.getElementById("content");
  content.innerHTML =
    "<p>Wie Lautet dein Name?</p><br><input id='nameInput' placeholder='Namen eingeben...'><br><br><button onclick='chooseWeapon()'>Weiter</button>";
  inventory = [];
}

function chooseWeapon() {
  const nameInput = document.getElementById("nameInput");
  const header = document.getElementById("header");
  const content = document.getElementById("content");

  if (nameInput.value) {
    heroName = nameInput.value;
    header.innerHTML = `<p>Name: ${heroName}</p>`;
    content.innerHTML =
      "<form><p>Wähle eine Waffe:</p><label><input type='radio' name='option' value='Schwert'>Schwert</label><br><label><input type='radio' name='option' value='Bogen'>Bogen</label><br><label><input type='radio' name='option' value='Feuerstab'>Feuerstab</label><br><br><button onclick='checkWeapon()' type='button'>Weiter</button></form>";
  } else {
    alert("Du hast keinen Namen eingegeben!");
  }
}

function checkWeapon() {
  weapon = checkSelection();
  const header = document.getElementById("header");
  if (weapon) {
    const newElement = document.createElement("p");
    newElement.textContent = `Waffe: ${weapon}`;
    header.appendChild(newElement);
    choosePath();
  }
}

function choosePath() {
  const content = document.getElementById("content");
  content.innerHTML =
    "<form><p>Du stehst vor dem dichten Dschungel. Zwei Wege führen hinein:</p><label><input type='radio' name='option' value='Fluss'>Der Flussweg</label><br><label><input type='radio' name='option' value='Wald'>Der Waldpfad</label><br><p>Welchen Weg nimmst du?</p><br><br><button onclick='checkPath()' type='button'>Weiter</button></form>";
}

function checkPath() {
  const chosenOption = checkSelection();

  if (chosenOption === "Fluss") {
    riverPath();
  } else if (chosenOption === "Wald") {
    forestPath();
  }
}

function riverPath() {
  const choice = prompt(
    "Ein Krokodil taucht vor dir auf! Was tust du?\n1) Kämpfen\n2) Wegrennen\n3) Versuchen, es mit Essen abzulenken\n(Wähle 1, 2 oder 3)"
  );

  if (choice === "1") {
    fightCrocodile();
  } else if (choice === "2") {
    alert("Du rennst weg und findest einen alternativen Weg.");
    findCave();
  } else if (choice === "3") {
    alert("Das Krokodil nimmt das Essen und lässt dich passieren.");
    findBoat();
  } else {
    alert("Ungültige Eingabe. Bitte wähle 1, 2 oder 3");
    riverPath();
  }
}

function fightCrocodile() {
  alert(`Du kämpfst gegen das Krokodil mit deinem ${weapon}!`);
  let success;

  if (weapon === "Schwert") {
    success = Math.random() > 0.3;
  } else if (weapon === "Bogen") {
    success = Math.random() > 0.5;
  } else if (weapon === "Feuerstab") {
    success = Math.random() > 0.2;
  }

  if (success) {
    alert("Du besiegst das Krokodil und setzt deine Reise fort!");
    findBoat();
  } else {
    alert(
      "Das Krokodil verletzt dich schwer, aber du schaffst es zu fliehen und deine Wunden mit einem Verband zu versorgen!"
    );
    inventory.push("Verband");
    findBoat();
  }
}

function findBoat() {
  const choice = prompt(
    "Du findest ein altes Boot. Was tust du?\n1) Es benutzen\n2) Nach einer anderen Möglichkeit suchen\n(Wähle 1 oder 2)"
  );

  if (choice === "1") {
    alert("Das Boot bringt dich sicher weiter.");
    enterRuins();
  } else if (choice === "2") {
    alert("Du findest eine versteckte Brücke und gehst darüber.");
    enterRuins();
  } else {
    alert("Ungültige Eingabe. Bitte wähle 1 oder 2");
    findBoat();
  }
}

function forestPath() {
  const choice = prompt(
    "Ein Stamm hält dich auf und stellt dir ein Rätsel. Was tust du?\n1) Rätsel lösen\n2) Ein Geschenk anbieten\n3) Wegrennen\n(Wähle 1, 2 oder 3)"
  );

  if (choice === "1") {
    alert(
      "Du löst das Rätsel und wirst als Freund akzeptiert und erhälst von Ihnen ein Stammesamulet"
    );
    inventory.push("Stammesamulet");
    findHiddenPath();
  } else if (choice === "2") {
    alert("Dein Geschenk gefällt ihnen, sie lassen dich weiterziehen.");
    findHiddenPath();
  } else if (choice === "3") {
    alert("Du rennst in den Wald, verlierst dich aber für eine Weile.");
    findCave();
  } else {
    alert("Ungültige Eingabe. Bitte wähle 1, 2 oder 3");
    forestPath();
  }
}

function findHiddenPath() {
  const choice = prompt(
    "Du entdeckst einen versteckten Pfad. Was tust du?\n1) Ihn erkunden\n2) Einen anderen Weg nehmen\n(Wähle 1 oder 2)"
  );

  if (choice === "1") {
    alert("Der Pfad führt dich sicher zu den Ruinen.");
    enterRuins();
  } else if (choice === "2") {
    alert("Du gerätst in ein Sumpfgebiet und musst einen Umweg nehmen.");
    enterRuins();
  } else {
    console.log("Ungültige Eingabe. Bitte wähle 1 oder 2");
    findHiddenPath();
  }
}

function findCave() {
  const choice = prompt(
    "Du findest eine Höhle. Möchtest du hineingehen?\n1) Ja\n2) Nein\n(Wähle 1 oder 2)"
  );

  if (choice === "1") {
    alert(
      "In der Höhle findest du eine alte Karte, in der ein Alter rostiger Schlüssel eingewickelt war!\nAußerdem ist ein Geheimer Weg zu den Ruinen auf der Karte eingezeichnet!"
    );
    inventory.push("Alte Karte");
    enterRuins();
  } else if (choice === "2") {
    alert("Du gehst außen herum und kommst später an.");
    enterRuins();
  } else {
    alert("Ungültige Eingabe. Bitte wähle 1 oder 2");
    findCave();
  }
}

function enterRuins() {
  const choice = prompt(
    "Du erreichst die Ruinen. Was möchtest du tun?\n1) Die Inschriften an der Wand untersuchen\n2) Eine alte Schatztruhe öffnen\n3) Den Boden nach Fallen absuchen\n4) Ein geheimes Symbol berühren\n(Wähle 1, 2, 3 oder 4)"
  );

  if (choice === "1") {
    alert("Die Inschriften enthüllen Hinweise auf einen verborgenen Schatz!");
    findTreasure();
  } else if (choice === "2") {
    if (inventory.includes("Alte Karte")) {
      alert("Die Truhe enthält alte Artefakte und einige Edelsteine!");
      findTreasure();
    } else {
      alert(
        "Die Truhe ist mit einem Massiven Schloss gesichert!\n Es ist unmöglich zu knacken!"
      );
      enterRuins();
    }
  } else if (choice === "3") {
    alert("Du entdeckst eine Falle und entschärfst sie rechtzeitig!");
    this.findTreasure();
  } else if (choice === "4") {
    if (inventory.includes("Stammesamulet")) {
      alert(
        "Als du dich dem Symbol nährst beginnt es Stark zu leuchten!\nVielleicht hat es was mit dem Stammesamulet zu tun?\nAls du das Symbol berührst, öffnet sich ein Geheimgang!"
      );
      findTreasure();
    } else {
      alert("Du berührst das Symbol, aber nichts passiert!");
      enterRuins();
    }
  } else {
    alert("Ungültige Eingabe. Bitte wähle 1, 2, 3 oder 4");
    enterRuins();
  }
}

function findTreasure() {
  alert(
    `Herzlichen Glückwunsch ${heroName}! Du hast das Geheimnis der Ruinen gelüftet und einen großen Schatz gefunden!`
  );
  if (inventory.length === 0) {
    alert("Deine gesammelten Gegenstände: Keine");
    restartGame();
  } else {
    alert("Deine gesammelten Gegenstände: " + inventory.join(", "));
    restartGame();
  }
}

function restartGame() {
  const choice = prompt(
    "Du hast das Spiel erfolgreich beendet. Was möchtest du tun?\n1) Noch eine Runde spielen\n2) Spiel beenden\n(Wähle 1 oder 2)"
  );

  if (choice === "1") {
    alert(
      "Jetzt beginnt eine neue Runde, vielleicht triffst du dieses mal andere Entscheidungen!\n Viel Spaß!"
    );
    startGame();
  } else if (choice === "2") {
    alert("Das Spiel wird beendet!");
  } else {
    alert("Ungültige Eingabe. Bitte wähle 1 oder 2");
  }
}
