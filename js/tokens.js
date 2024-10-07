document.addEventListener('DOMContentLoaded', () => {
    const tokens = document.querySelectorAll('.token');

    let estaArrastando = false;
    let tokenAtual = null;
    let deslocamentoX, deslocamentoY;
    let inicioX, inicioY;
    let inicioEsquerda, inicioTopo;

    function atualizarPosicao(token, x, y) {
        token.style.left = `${x}px`;
        token.style.top = `${y}px`;
    }

    function aoMouseDown(e) {
        // Verifica se o clique foi em um token
        if (e.target.classList.contains('token')) {
            estaArrastando = true;
            tokenAtual = e.target;
            const retangulo = tokenAtual.getBoundingClientRect();
            deslocamentoX = e.clientX - retangulo.left;
            deslocamentoY = e.clientY - retangulo.top;
            inicioX = e.clientX;
            inicioY = e.clientY;
            inicioEsquerda = retangulo.left;
            inicioTopo = retangulo.top;
        }
    }

    function aoTouchStart(e) {
        const touch = e.touches[0];
        aoMouseDown({
            target: e.target,
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    }

    function aoMouseMove(e) {
        if (estaArrastando && tokenAtual) {
            const dx = e.clientX - inicioX;
            const dy = e.clientY - inicioY;
            const x = inicioEsquerda + dx;
            const y = inicioTopo + dy;
            atualizarPosicao(tokenAtual, x, y);
        }
    }

    function aoTouchMove(e) {
        const touch = e.touches[0];
        aoMouseMove({
            clientX: touch.clientX,
            clientY: touch.clientY
        });
    }

    function aoMouseUp() {
        if (estaArrastando && tokenAtual) {
            // Adiciona a classe 'fixado' para travar o token na posição
            tokenAtual.classList.add('fixado');
        }
        estaArrastando = false;
        tokenAtual = null;
    }

    function aoTouchEnd() {
        aoMouseUp();
    }

    tokens.forEach(token => {
        token.addEventListener('mousedown', aoMouseDown);
        token.addEventListener('touchstart', aoTouchStart);
    });

    document.addEventListener('mousemove', aoMouseMove);
    document.addEventListener('touchmove', aoTouchMove);
    document.addEventListener('mouseup', aoMouseUp);
    document.addEventListener('touchend', aoTouchEnd);
});
