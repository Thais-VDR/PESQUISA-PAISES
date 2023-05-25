let campoFiltro = document.querySelector('#filtrar-paises')

campoFiltro.addEventListener('input', function () {
    let cards = document.querySelectorAll('.card')

    if (this.value.length > 0) {
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i]
            let nome = card.querySelector('.pais').textContent

            let expressao = new RegExp(this.value, 'i')

            if (!expressao.test(nome)) {
                card.classList.add('invisivel')
            } else {
                card.classList.remove('invisivel')
            }
        }
    } else {
        for (let i = 0; i < cards.length; i++) {
            let card = cards[i]
            card.classList.remove('invisivel')
        }
    }

})