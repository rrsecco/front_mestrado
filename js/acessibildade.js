let h2FontSize = 24; // Tamanho inicial do h2
let pFontSize = 16; // Tamanho inicial do p
let infoFontSize = 19; // Tamanho inicial da fonte para os elementos .info, .info-curiosity, e .info-card
const minInfoFontSize = 10;
const maxInfoFontSize = 30;
let fontSize = 14;
const minFontSize = 12;
const maxFontSize = 26;

// Função para aplicar os tamanhos de fonte iniciais
function applyInitialFontSizes() {
    const modalContentH2 = document.querySelector('.modal-content h2');
    const modalContentP = document.querySelector('.modal-content p');
    
    if (modalContentH2) {
        modalContentH2.style.fontSize = h2FontSize + 'px';
    }
    if (modalContentP) {
        modalContentP.style.fontSize = pFontSize + 'px';
    }
}

// Adiciona evento para quando o modal for aberto
document.querySelector('.modal').addEventListener('show', function() {
    applyInitialFontSizes();
});

document.getElementById('increase-font').addEventListener('click', function () {
    if (h2FontSize < maxFontSize) {
        h2FontSize += 2;
        const modalContentH2 = document.querySelector('.modal-content h2');
        if (modalContentH2) {
            modalContentH2.style.fontSize = h2FontSize + 'px';
        }
    }
    if (fontSize < maxFontSize) {
        fontSize += 2;
        document.body.style.fontSize = fontSize + 'px';
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.fontSize = fontSize + 'px';
        }
    }
    if (pFontSize < maxFontSize) {
        pFontSize += 2;
        const modalContentP = document.querySelector('.modal-content p');
        if (modalContentP) {
            modalContentP.style.fontSize = pFontSize + 'px';
        }
    }
    if (infoFontSize < maxInfoFontSize) {
        infoFontSize += 2;
        const infoElements = document.querySelectorAll('.info, .info-curiosity, .info-card');
        infoElements.forEach(element => {
            element.style.fontSize = infoFontSize + 'px';
        });
    }
});

document.getElementById('decrease-font').addEventListener('click', function () {
    if (h2FontSize > minFontSize) {
        h2FontSize -= 2;
        const modalContentH2 = document.querySelector('.modal-content h2');
        if (modalContentH2) {
            modalContentH2.style.fontSize = h2FontSize + 'px';
        }
    }
    if (fontSize > minFontSize) {
        fontSize -= 2;
        document.body.style.fontSize = fontSize + 'px';
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.fontSize = fontSize + 'px';
        }
    }
    if (pFontSize > minFontSize) {
        pFontSize -= 2;
        const modalContentP = document.querySelector('.modal-content p');
        if (modalContentP) {
            modalContentP.style.fontSize = pFontSize + 'px';
        }
    }
    if (infoFontSize > minInfoFontSize) {
        infoFontSize -= 2;
        const infoElements = document.querySelectorAll('.info, .info-curiosity, .info-card');
        infoElements.forEach(element => {
            element.style.fontSize = infoFontSize + 'px';
        });
    }
});

document.getElementById('toggle-contrast').addEventListener('click', function () {
    document.body.classList.toggle('high-contrast');
    const item1 = document.querySelector('.item1');
    if (item1) {
        item1.style.filter = document.body.classList.contains('high-contrast') ? "contrast(80%)" : "none";
    }
});


// Função para aumentar/diminuir o tamanho do ponteiro do mouse
document.getElementById('pointer-more').addEventListener('click', function() {
    const body = document.body;
    const button = this;

    if (body.classList.contains('large-pointer')) {
        body.classList.remove('large-pointer');
        button.classList.remove('active');
        document.getElementById('pointer-more').style.backgroundColor = "";
        removeCustomPointer();
    } else {
        body.classList.add('large-pointer');
        button.classList.add('active');
        document.getElementById('pointer-more').style.backgroundColor = "blue";
        addCustomPointer();
    }
});

function addCustomPointer() {
    console.log("Adding custom pointer");
    document.addEventListener('mousemove', moveCustomPointer);
}

function removeCustomPointer() {
    console.log("Removing custom pointer");
    document.removeEventListener('mousemove', moveCustomPointer);
    const pointer = document.querySelector('.custom-pointer');
    if (pointer) {
        pointer.remove();
    }
}

function moveCustomPointer(e) {
    let pointer = document.querySelector('.custom-pointer');
    if (!pointer) {
        pointer = document.createElement('div');
        pointer.classList.add('custom-pointer');
        document.body.appendChild(pointer);
    }
    pointer.style.left = `${e.clientX - 5}px`; // Ajuste horizontal
    pointer.style.top = `${e.clientY}px`;  // Ajuste vertical
}

// Adicionando o estilo CSS para o ponteiro customizado
const style = document.createElement('style');
style.textContent = `
    .custom-pointer {
        position: absolute;
        width: 50px;
        left: 200px;
        height: 85px;
        background-image: url('./imgs/pointer.png');
        background-size: cover;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease-in-out;
    }
`;
document.head.appendChild(style);

let saturationLevel = 0; // Nível inicial de saturação

document.getElementById('saturate-more').addEventListener('click', function() {
    const body = document.body;
    saturationLevel = (saturationLevel + 1) % 5; // Cicla entre 0, 1, 2, 3 e 4

    switch (saturationLevel) {
        case 0:
            body.style.filter = 'saturate(100%)'; // Saturação padrão
            this.classList.remove('active');
            this.style.backgroundColor = ''; // Remove a cor de fundo para o nível 0
            break;
        case 1:
            body.style.filter = 'saturate(120%)'; // Saturação de 20%
            this.classList.add('active');
            this.style.backgroundColor = '#ffcc00'; // Amarelo para o nível 1
            break;
        case 2:
            body.style.filter = 'saturate(150%)'; // Saturação de 50%
            this.classList.add('active');
            this.style.backgroundColor = '#ff6600'; // Laranja para o nível 2
            break;
        case 3:
            body.style.filter = 'saturate(200%)'; // Saturação de 100%
            this.classList.add('active');
            this.style.backgroundColor = '#ff0000'; // Vermelho para o nível 3
            break;
        case 4:
            body.style.filter = 'saturate(0%)'; // Saturação desativada
            this.classList.add('active');
            this.style.backgroundColor = '#ff0000'; // Vermelho para o nível 4
            break;
    }
});
