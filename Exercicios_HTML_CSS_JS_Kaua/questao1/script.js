$(document).keydown(function(evento) {
  var tecla = evento.key.toUpperCase();

  if (!/^[A-ZÁÉÍÓÚÂÊÔÃÕÇ]$/.test(tecla)) {
    return;
  }

  $("#letra").text(tecla);

  var exemplos = {
    A: { nome: "Abacaxi", imagem: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f34d.svg" },
    E: { nome: "Elefante", imagem: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f418.svg" },
    I: { nome: "Ilha", imagem: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f3dd.svg" },
    O: { nome: "Olhos", imagem: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f440.svg" },
    U: { nome: "Uvas", imagem: "https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/1f347.svg" }
  };

  if (exemplos[tecla]) {
    $("#imagem").attr("src", exemplos[tecla].imagem).attr("alt", exemplos[tecla].nome);
    $("#palavra").text(exemplos[tecla].nome);
    $("#exemplo").show();
  } else {
    $("#exemplo").hide();
  }

  var sintetizador = new SpeechSynthesisUtterance(tecla);
  sintetizador.lang = "pt-BR";
  sintetizador.rate = 0.9;
  sintetizador.pitch = 1;

  speechSynthesis.cancel();
  speechSynthesis.speak(sintetizador);
});
