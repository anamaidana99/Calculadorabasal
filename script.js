const BOTON = document.getElementById("calcular");
const ERROR = document.getElementById("error");
const FLUJO = document.getElementById("flu");
const INPUT = document.getElementById("peso");
const MAN = document.getElementById("man");

function cambiarTamano(event) {
  const teclaPresionada = event.keyCode || event.which;

  // Verifica si la tecla presionada es la tecla "Enter" (código 13)
  if (teclaPresionada === 13) {
    const nuevoTamano = Math.floor(Math.random() * 21 + 10) + "px"; // Random font size between 10px and 30px
    document.body.style.fontSize = nuevoTamano;
  }
}

// Agrega el listener de evento al body
document.body.addEventListener("keypress", cambiarTamano);

BOTON.addEventListener("click", calcular);

function calcular() {
  const DATO = parseFloat(INPUT.value);
  if (!isNaN(DATO) && DATO > 0) {
    ERROR.style.display = "none";
    if (DATO <= 30) {
      // Holliday
      let flujo = holliday(DATO);
      let mantenimiento = (flujo / 24 * 1.5).toFixed(2);
      FLUJO.textContent = "Volumen diario: " + flujo + " cc";
      MAN.textContent = "m+m/2: " + mantenimiento + " cc/hr";
      FLUJO.style.display = "block";
      MAN.style.display = "block";
    } else {
      // Supercorporal
      let flujo = supCorporal(DATO);
      let mantenimiento = (flujo[0] / 24 * 1.5).toFixed(2);
      FLUJO.textContent = "Volumen diario: " + flujo[0] + " - " + flujo[1] + " cc";
      MAN.textContent = "m+m/2: " + mantenimiento + " cc/hr";
      FLUJO.style.display = "block";
      MAN.style.display = "block";
    }
  } else {
    ERROR.style.display = "block";
    FLUJO.style.display = "none";
    MAN.style.display = "none";
  }
}

function holliday(peso) {
  let flujo = 0;
  if (peso <= 10) {
    flujo = peso * 100;
  } else if (peso > 10 && peso <= 20) {
    flujo = 1000 + (peso - 10) * 50;
  } else if (peso > 20) {
    flujo = 1500 + (peso - 20) * 20;
  }
  return flujo.toFixed(2);
}

function supCorporal(peso) {
  let supeficieCorporal = (peso * 4 + 7) / (peso + 90);
  return [(supeficieCorporal * 1500).toFixed(2), (supeficieCorporal * 2000).toFixed(2)];
}
