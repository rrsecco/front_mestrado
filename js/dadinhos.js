const givenElements = document.querySelectorAll('.given');
const goneElements = document.querySelectorAll('.gone');
const gtwoElements = document.querySelectorAll('.gtwo');
const handElement = document.querySelector('.hand');
const clickSound = document.getElementById('click-sound-given');

// Array de imagens de dados
const diceImages = [
    './imgs/dados/dado_um.png',
    './imgs/dados/dado_dois.png',
    './imgs/dados/dado_tres.png',
    './imgs/dados/dado_quatro.png',
    './imgs/dados/dado_cinco.png',
    './imgs/dados/dado_seis.png'
];

function changeDiceImage(element) {
    // Gera um número aleatório de 0 a 5
    const randomIndex = Math.floor(Math.random() * diceImages.length);
    element.style.backgroundImage = `url('${diceImages[randomIndex]}')`;
}

function resetRotation(elements) {
    elements.forEach(element => {
        gsap.set(element, { rotation: 0 });
    });
}

handElement.addEventListener('click', () => {
    // Toca o som
    clickSound.play();

    // Animação de rotação para a mão
    gsap.to(handElement, {
        rotation: '+=15', // Gira a mão 15 graus
        duration: 0.1, // Duração da rotação
        onComplete: () => {
            // Volta a mão para a posição original com uma pequena aleatoriedade
            gsap.to(handElement, {
                rotation: '+=-15', // Volta 15 graus
                duration: 0.1,
                onComplete: () => {
                    // Redefine a rotação dos elementos .given
                    resetRotation(givenElements);

                    // Animação de rotação para os elementos .given
                    gsap.to(givenElements, { rotation: '+=360', duration: 0.5 });

                    // Troca a imagem de cada dado após a rotação
                    givenElements.forEach(changeDiceImage);
                }
            });
        }
    });
});

gtwoElements.forEach(element => {
    element.addEventListener('click', () => {
        // Toca o som
        clickSound.play();

        // Redefine a rotação dos elementos .gtwo
        resetRotation(gtwoElements);

        // Animação de rotação para os elementos gtwo
        gsap.to(gtwoElements, { rotation: '+=360', duration: 0.5 });

        // Troca a imagem do dado clicado
        changeDiceImage(element);
    });
});

goneElements.forEach(element => {
    element.addEventListener('click', () => {
        // Toca o som
        clickSound.play();

        // Redefine a rotação dos elementos .gone
        resetRotation(goneElements);

        // Animação de rotação para os elementos gone
        gsap.to(goneElements, { rotation: '+=360', duration: 0.5 });

        // Troca a imagem do dado clicado
        changeDiceImage(element);
    });
});
