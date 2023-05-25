//Definir a URL que será utilizada para consumir a API
const url = 'https://restcountries.com/v2/all'

//Criar variavel para a lista
//const listaPaises = document.querySelector('#paises')

//Declarand Variavel em Jquery
const listaPaises = $('#paises')

const cardsPorPagina = 12

let paginaAtual = 1

//Faz um solicitação GET para a URL da API usando a função fetch() 
//fetch() retorna uma promessa (Promise) que será resolvida com o objeto JavaScript equivalente aos dados JSON retornados pela API
fetch(url)
  //Quando a promessa for resolvida, converte a resposta em formato JSON usando o método.json()
  .then(response => response.json())

  //then: se for valido, ele manda as respostas, se for invalido, ele manda erro.E tudo isso funciona na estrutura FETCH.
  //data: tamanho do vetor

  .then(data => {

    //O método Math.ceil() irá arredondar o resultado da divisão para cima
    let totalPaginas = Math.ceil(data.length / cardsPorPagina)

    function mostrarPagina(pagina) {

      let inicio = (pagina - 1) * cardsPorPagina
      let fim = inicio + cardsPorPagina

      //empty é vazio
      listaPaises.empty()

      for (let i = inicio; i < fim && i < data.length; i++) {
        let pais = data[i]
        let div = document.createElement('div')
        div.innerHTML =
          `

    <div class="card" style="width: 18rem; height: 25rem;">
  <img src="${pais.flag}" class="card-img-top" alt="Bandeira_${pais.name}">
  <div class="card-body">
    <h5 class="card-title pais">${pais.name}</h5>
    <p class="card-text">${pais.region}</p>
    <p class="card-text">${pais.capital}</p>
    <p class="card-text">${pais.population}</p>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${[i]}">
     Ver mais
    </button>


    <div class="modal fade" id="staticBackdrop${[i]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">${pais.name}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

          <p>${pais.region}</p>
          <p>${pais.population}</p>
          <p>${pais.subRegion}</p>
          <p>${pais.demonym}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
        listaPaises.append(div)

      }
    }
    function atualizarPagina() {
      $("#contador-pagina").text(`Página ${paginaAtual} de ${totalPaginas}`)
      $("#anterior").prop('disabled', paginaAtual === 1)
      $("#proximo").prop('disabled', paginaAtual === totalPaginas)
      mostrarPagina(paginaAtual)
    }
    atualizarPagina()

    $("#anterior").click(() => {
      if (paginaAtual > 1) {
        paginaAtual--
        atualizarPagina()
      }
    })

    $("#proximo").click(() => {
      if (paginaAtual < totalPaginas) {
        paginaAtual++
        atualizarPagina()
      }
    })

  })
  //Se ocorrer um erro durante a solicitação fetch(), esse erro será capturado por .catch() e o erro será impresso no console
  .catch(error => console.error(error))