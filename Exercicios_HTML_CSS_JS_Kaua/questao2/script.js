$(function() {
  var filtros = {
    2: /[^01]/g,
    8: /[^0-7]/g,
    10: /[^0-9]/g,
    16: /[^0-9A-F]/g
  };

  $("input").on("input", function() {
    var campo = $(this);
    var base = Number(campo.data("base"));
    var valor = campo.val().toString().toUpperCase().replace(filtros[base], "");

    campo.val(valor);

    if (valor === "") {
      $("input").val("");
      return;
    }

    var numeroDecimal = parseInt(valor, base);

    $("#binario").val(numeroDecimal.toString(2));
    $("#decimal").val(numeroDecimal.toString(10));
    $("#octal").val(numeroDecimal.toString(8));
    $("#hexadecimal").val(numeroDecimal.toString(16).toUpperCase());
  });

  $("#limpar").click(function() {
    $("input").val("");
    $("#binario").focus();
  });
});
