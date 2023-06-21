
var vencedor = false;
var sorteio = [];
var sorteioloop = false;
var todasCartelas = [];
var c = 0;

function criarBolasSorteadas() {
  var tabela = document.createElement("table");
  var header = document.querySelector("header");
  header.appendChild(tabela);
  tabela.id = "sorteados";

  for (var i = 1; i < 76; i++) {
    if ((i - 1) % 15 === 0) {
      var linha = document.createElement("tr");
      tabela.appendChild(linha);
    }
    var celula = document.createElement("td");
    linha.appendChild(celula);
    celula.id = "bola " + i;
    celula.className = "bola";
    celula.innerText = i;
    celula.addEventListener("click", function () {
      marcar(parseInt(this.innerText));
    });
  }
}

function sortear() {
  if (sorteio.length === 75 || vencedor === true) {
    sorteioloop = false;
  } else {
    sorteioloop = true;
  }
  while (sorteioloop === true && sorteio.length < 75) {
    var n = parseInt(Math.random() * 75) + 1;
    var celula = document.getElementById("bola " + n);
    if (sorteio.indexOf(n) === -1 && n !== 0) {
      var celulaanterior = document.getElementById(
        "bola " + sorteio[sorteio.length - 1]
      );
      marcar(n);
      sorteio.push(n);
      celula.style.backgroundColor = "green";
      celula.style.color = "white";
      celulaanterior.style.backgroundColor = "black";
      verificarVencedor();
      sorteioloop = false;
    }
  }
  sorteioloop = false;
}

function verificarVencedor() {
  for (var ncartela = 0; ncartela < todasCartelas.length; ncartela++) {
    var v = 0;
    for (var num = 0; num < 24; num++) {
      if (sorteio.indexOf(todasCartelas[ncartela][num]) !== -1) {
        v++;
        if (v === 24) {
          vencedor = true;
          var nomeVencedor = document.createElement("p");
          nomeVencedor.innerText =
            "parabénsssss " +
            todasCartelas[ncartela].nome +
            ", ganhou um Marea turbo 98!!";

          var parabensDiv = document.createElement("div");
          parabensDiv.className = "divParabens";

          parabensDiv.appendChild(nomeVencedor);
          document.body.appendChild(parabensDiv);
        }
      }
    }
  }
}

function marcar(n) {
  var celula = document.getElementsByClassName("numero");
  for (var i = 0; i < todasCartelas.length; i++) {
    if (todasCartelas[i].indexOf(n) === -1) {
      continue;
    } else {
      for (var c = 0; c < celula.length; c++) {
        if (celula[c].innerText == n) {
          celula[c].style.backgroundColor = "green";
        }
      }
    }
  }
}

function reiniciarSorteio() {
  sorteio = [];
  vencedor = false;
  todasCartelas = [];
  c = 0;
  location.reload();
}

function gerarNovaCartela() {
  if (sorteio.length === 0) {
    var nomeJogador = prompt("Digite seu nome:");

    var cartelaDiv = document.createElement("div");
    cartelaDiv.className = "cartela";

    var nomeJogadorElement = document.createElement("h2");
    nomeJogadorElement.style.textAlign = "center";
    nomeJogadorElement.innerText = nomeJogador;
    cartelaDiv.appendChild(nomeJogadorElement);

    var cartela = document.createElement("table");
    cartelaDiv.appendChild(cartela);

    var area = document.getElementById("cartelas");
    area.appendChild(cartelaDiv);

    var thead = document.createElement("thead");
    cartela.appendChild(thead);

    var colb = document.createElement("th");
    var coli = document.createElement("th");
    var coln = document.createElement("th");
    var colg = document.createElement("th");
    var colo = document.createElement("th");
    colb.innerText = "B";
    coli.innerText = "I";
    coln.innerText = "N";
    colg.innerText = "G";
    colo.innerText = "O";
    thead.appendChild(colb);
    thead.appendChild(coli);
    thead.appendChild(coln);
    thead.appendChild(colg);
    thead.appendChild(colo);

    gerarNumerosCartela();
    var id = 0;
    for (var l = 0; l < 5; l++) {
      var linha = document.createElement("tr");
      cartela.appendChild(linha);
      for (var n = 0; n < 3; n++) {
        if (l === 2 && n === 2) {
          var numero = document.createElement("p");
          linha.appendChild(numero);
          numero.innerText = "FREE";
        } else if (l === 4 && n === 2) {
          var numero = document.createElement("td");
          linha.appendChild(numero);
          numero.className = "numero";
          numero.innerText = todasCartelas[c][12];
        } else {
          var numero = document.createElement("td");
          linha.appendChild(numero);
          numero.className = "numero";
          numero.id = "numero " + id;
          numero.innerText = todasCartelas[c][n * 5 + l];
          id++;
        }
      }
      for (var n = 3; n < 5; n++) {
        var numero = document.createElement("td");
        linha.appendChild(numero);
        numero.className = "numero";
        numero.id = "numero " + id;
        numero.innerText = todasCartelas[c][n * 5 - 1 + l];
        id++;
      }
    }
    todasCartelas[c].nome = nomeJogador;
    c++;
  } else {
  }
}

function gerarNumerosCartela() {
  var numeros = [];
  while (numeros.length < 5) {
    var b = parseInt(Math.random() * 16);
    if (numeros.indexOf(b) === -1 && b !== 0) {
      numeros.push(b);
    }
  }
  while (numeros.length < 10) {
    var i = parseInt(Math.random() * 16 + 15);
    if (numeros.indexOf(i) === -1 && i !== 115) {
      numeros.push(i);
    }
  }
  while (numeros.length < 14) {
    var n = parseInt(Math.random() * 16 + 30);
    if (numeros.indexOf(n) === -1 && n !== 30) {
      numeros.push(n);
    }
  }
  while (numeros.length < 19) {
    var g = parseInt(Math.random() * 16 + 45);
    if (numeros.indexOf(g) === -1 && g !== 45) {
      numeros.push(g);
    }
  }
  while (numeros.length < 24) {
    var o = parseInt(Math.random() * 16 + 60);
    if (numeros.indexOf(o) === -1 && o !== 60) {
      numeros.push(o);
    }
  }
  todasCartelas.push(numeros);
}

function iniciarSorteio() {
  if (sorteio.length === 0 || vencedor === true) {
    sorteioInterval = setInterval(sortear, 1000);
  }
}

criarBolasSorteadas();