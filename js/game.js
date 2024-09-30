window.addEventListener('beforeunload', function (event) {
    // Define a mensagem de aviso
    var message = "Tem certeza que deseja sair desta página? As mudanças não salvas serão perdidas.";
    
    // Para navegadores modernos
    event.preventDefault();
    event.returnValue = message; 
    
    // Para navegadores mais antigos
    return message;
});
