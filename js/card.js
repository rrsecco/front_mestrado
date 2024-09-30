const deck = document.querySelector('.deck');
const modal = document.getElementById('myModal');

// Função utilitária para criar e retornar o elemento de conteúdo do modal
function getModalContent() {
    let modalContent = modal.querySelector('.modal-content');
    if (!modalContent) {
        modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modal.appendChild(modalContent);
    }
    return modalContent;
}

// Função para buscar dados do backend
async function fetchData(endpoint) {
    try {
        const response = await fetch(`https://web-c391urlhqs1y.up-de-fra1-k8s-1.apps.run-on-seenode.com/api/${endpoint}`);
        if (!response.ok) throw new Error('Erro ao buscar dados');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}

// Função para selecionar um item aleatório de um array
function getRandomItem(items, usedItems) {
    const availableItems = items.filter(item => !usedItems.has(item.id));
    if (availableItems.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableItems.length);
    const selectedItem = availableItems[randomIndex];
    usedItems.add(selectedItem.id);
    return selectedItem;
}

// Função para resetar o estado de itens usados
function resetUsedItems() {
    return new Set();
}

// Estados para rastrear itens usados
let usedSorteOuAzar = resetUsedItems();
let usedQuizzes = resetUsedItems();
let usedCuriosidades = resetUsedItems();
let usedConsequencias = resetUsedItems();

// Manipulador de clique no deck
deck.addEventListener('click', async (event) => {
    let content = '';
    const modalContent = getModalContent();

    if (event.target.closest('.card-luck-or-bad-luck')) {
        document.getElementById('click-sound-card').play();

        // Buscar dados para "Sorte ou Azar"
        const sorteOuAzar = await fetchData('sorte_ou_azar');
        const item = getRandomItem(sorteOuAzar, usedSorteOuAzar);
        if (!item) {
            usedSorteOuAzar = resetUsedItems();
            const newSorteOuAzar = await fetchData('sorte_ou_azar');
            const newItem = getRandomItem(newSorteOuAzar, usedSorteOuAzar);
            content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">Sorte ou Azar?</h2>
                <p style="font-size: ${pFontSize}px;">${newItem ? newItem.descricao : 'Nenhum item encontrado'}</p>
                <img src="./back-end/${newItem.url}" />
            `;
            modalContent.style.border = "5px solid green";
        } else {
            content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">Sorte ou Azar?</h2>
                <p style="font-size: ${pFontSize}px;">${item ? item.descricao : 'Nenhum item encontrado'}</p>
                <img src="./back-end/${item.url}" />
            `;
            modalContent.style.border = "5px solid green";
        }

    } else if (event.target.closest('.card-quiz')) {
        document.getElementById('click-sound-card').play();

        // Buscar dados para "Quiz"
        const quizzes = await fetchData('quiz');
        const quiz = getRandomItem(quizzes, usedQuizzes);
        if (!quiz) {
            usedQuizzes = resetUsedItems();
            const newQuizzes = await fetchData('quiz');
            const newQuiz = getRandomItem(newQuizzes, usedQuizzes);
            content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">Hora do Quiz</h2>
                <p style="font-size: ${pFontSize}px;">${newQuiz ? newQuiz.pergunta : 'Pergunta não encontrada'}</p>
                <div id="resposta" style="display:none;">
                    <p style="color: green; font-size: ${pFontSize}px;">${newQuiz ? newQuiz.resposta : 'Resposta não encontrada'}</p>
                </div>
                <button id="mostrar-resposta">Mostrar Resposta</button>
                <img src="./back-end/${newQuiz.url}" />
            `;
            modalContent.style.border = "5px solid blue";
        } else {
            content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">Hora do Quiz</h2>
                <p style="font-size: ${pFontSize}px;">${quiz ? quiz.pergunta : 'Pergunta não encontrada'}</p>
                <div id="resposta" style="display:none;">
                    <p style="color: green; font-size: ${pFontSize}px;">${quiz ? quiz.resposta : 'Resposta não encontrada'}</p>
                </div>
                <button id="mostrar-resposta">Mostrar Resposta</button>
                <img src="./back-end/${quiz.url}" />
            `;
            modalContent.style.border = "5px solid blue";
        }

    } else {
        return; // Se nenhum dos cartões for clicado, não faça nada
    }

    // Atualiza o conteúdo do modal
    modalContent.innerHTML = content;
    modal.style.display = "block";

    const botaoMostrarResposta = document.getElementById('mostrar-resposta');
    botaoMostrarResposta.addEventListener('click', function() {
        const resposta = document.getElementById('resposta');
        resposta.style.display = 'block';
        botaoMostrarResposta.style.display = 'none'; // Esconde o botão após mostrar a resposta
    });
});

// Manipulador de clique nos elementos com id "id-info-curiosity"
document.querySelectorAll('#id-info-curiosity').forEach(element => {
    element.addEventListener('click', async () => {
        const modalContent = getModalContent();

        document.getElementById('click-sound-card').play();
        // Buscar dados para "Curiosidade"
        const curiosidades = await fetchData('curiosidade');
        const curiosidade = getRandomItem(curiosidades, usedCuriosidades);
        if (!curiosidade) {
            usedCuriosidades = resetUsedItems();
            const newCuriosidades = await fetchData('curiosidade');
            const newCuriosidade = getRandomItem(newCuriosidades, usedCuriosidades);
            const content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">Curiosidade</h2>
                <p style="font-size: ${pFontSize}px;">${newCuriosidade ? newCuriosidade.descricao : 'Descrição não encontrada'}</p>
                <img src="./back-end/${newCuriosidade.url}" />
            `;
            // Atualiza o conteúdo do modal
            modalContent.style.border = "0px";
            modalContent.innerHTML = content;
            modal.style.display = "block";
        } else {
            const content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">Curiosidade</h2>
                <p style="font-size: ${pFontSize}px;">${curiosidade ? curiosidade.descricao : 'Descrição não encontrada'}</p>
                <img src="./back-end/${curiosidade.url}" />
            `;
            // Atualiza o conteúdo do modal
            modalContent.style.border = "0px";
            modalContent.innerHTML = content;
            modal.style.display = "block";
        }
    });
});

// Manipulador de clique nos elementos com id "id-info-card"
document.querySelectorAll('#id-info-card').forEach(element => {
    element.addEventListener('click', async () => {
        const modalContent = getModalContent();

        document.getElementById('click-sound-card').play();
        // Buscar dados para "Azar ou Sorte"
            const content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">SORTE OU AZAR? </h2>
                <p style="font-size: ${pFontSize}px;">Você caiu na casa prêmio! Será que você irá se dar bem? Puxe cartas do baralho 1 até retirar a primeira carta prêmio*</p>
                <img src="./back-end/uploads/ddd.png" />
            `;
            // Atualiza o conteúdo do modal
            modalContent.style.border = "0px";
            modalContent.innerHTML = content;
            modal.style.display = "block";
    });
});

// Manipulador de clique nos elementos com id "id-info"
document.querySelectorAll('#id-info').forEach(element => {
    element.addEventListener('click', async () => {
        const modalContent = getModalContent();

        document.getElementById('click-sound-card').play();
        // Buscar dados para "PERIGO ou NÃO?"
        const dados = await fetchData('consequencia'); // Adapte o endpoint conforme necessário
        const dado = getRandomItem(dados, usedConsequencias);
        if (!dado) {
            usedConsequencias = resetUsedItems();
            const newDados = await fetchData('consequencia');
            const newDado = getRandomItem(newDados, usedConsequencias);
            const content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">PERIGO ou NÃO?</h2>
                <p style="font-size: ${pFontSize}px;">${newDado ? newDado.descricao : 'Descrição não encontrada'}</p>
                <img src="./back-end/${newDado.url}" />
            `;
            // Atualiza o conteúdo do modal
            modalContent.style.border = "0px";
            modalContent.innerHTML = content;
            modal.style.display = "block";
        } else {
            const content = `
                <span class="close">&times;</span>
                <h2 style="font-size: ${h2FontSize}px;">PERIGO ou NÃO?</h2>
                <p style="font-size: ${pFontSize}px;">${dado ? dado.descricao : 'Descrição não encontrada'}</p>
                <img src="./back-end/${dado.url}" />
            `;
            // Atualiza o conteúdo do modal
            modalContent.style.border = "0px";
            modalContent.innerHTML = content;
            modal.style.display = "block";
        }
    });
});

// Manipulador de clique no botão de fechar e clique fora do modal
modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('close') || event.target === modal) {
        modal.style.display = "none";
    }
});