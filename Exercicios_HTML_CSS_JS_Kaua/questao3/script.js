$(function() {
  var tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

  function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  function mostrarTarefas() {
    $("#lista").empty();

    if (tarefas.length === 0) {
      $("#lista-vazia").show();
      return;
    }

    $("#lista-vazia").hide();

    tarefas.forEach(function(tarefa, indice) {
      var classe = tarefa.concluida ? "tarefa concluida" : "tarefa";
      var textoBotao = tarefa.concluida ? "Desfazer" : "Concluir";

      var item = $("<li>").addClass(classe);
      var informacoes = $("<div>");
      var titulo = $("<h2>").text(tarefa.texto);
      var data = $("<small>").text("Criada em " + tarefa.data);
      var acoes = $("<div>").addClass("acoes");
      var concluir = $("<button>").addClass("concluir").attr("data-indice", indice).text(textoBotao);
      var excluir = $("<button>").addClass("excluir").attr("data-indice", indice).text("Excluir");

      informacoes.append(titulo, data);
      acoes.append(concluir, excluir);
      item.append(informacoes, acoes);
      $("#lista").append(item);
    });
  }

  $("#mostrar-formulario").click(function() {
    $("#formulario").css("display", "grid");
    $("#nova-tarefa").focus();
  });

  $("#cancelar").click(function() {
    $("#formulario").hide();
    $("#nova-tarefa").val("");
  });

  $("#formulario").submit(function(evento) {
    evento.preventDefault();
    var texto = $("#nova-tarefa").val().toString().trim();

    if (texto === "") {
      return;
    }

    tarefas.push({
      texto: texto,
      data: new Date().toLocaleString("pt-BR"),
      concluida: false
    });

    salvar();
    mostrarTarefas();
    $("#nova-tarefa").val("");
    $("#formulario").hide();
  });

  $("#lista").on("click", ".concluir", function() {
    var indice = Number($(this).attr("data-indice"));
    tarefas[indice].concluida = !tarefas[indice].concluida;
    salvar();
    mostrarTarefas();
  });

  $("#lista").on("click", ".excluir", function() {
    var indice = Number($(this).attr("data-indice"));
    tarefas.splice(indice, 1);
    salvar();
    mostrarTarefas();
  });

  mostrarTarefas();
});
