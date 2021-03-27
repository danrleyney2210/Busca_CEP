var submitButton = document.querySelector("#main form button");
var zipCode = document.querySelector("#main form input");
var content = document.querySelector("#container #main main");

submitButton.addEventListener("click", run);

function run() {
  event.preventDefault();

  var zipCodeField = zipCode.value;

  zipCodeField = zipCodeField.replace(" ", "");
  zipCodeField = zipCodeField.replace(".", "");
  zipCodeField = zipCodeField.trim();

  axios
    .get("https://viacep.com.br/ws/" + zipCodeField + "/json/")
    .then(function (response) {
      if (response.data.error) {
        throw new Error("CEP Inválido");
      }

      content.innerHTML = "";
      createLine(response.data.logradouro);
      createLine(response.data.localidade + "/" + response.data.uf);
      createLine(response.data.bairro);
    })
    .catch(function (error) {
      content.innerHTML = "";
      createLine("Ops, Algo deu errado!");
    });
}

function createLine(text) {
  var line = document.createElement("p");
  var text = document.createTextNode(text);

  line.appendChild(text);
  content.appendChild(line);
}
