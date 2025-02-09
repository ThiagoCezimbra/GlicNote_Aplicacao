// menu.js
document.addEventListener('DOMContentLoaded', function () {
    fetch('/get-session-data')
        .then(response => response.json())
        .then(data => {
            const usuarioId = data.usuarioId;

            if (usuarioId) {
                // Atualiza os links para incluir o usuarioId dinamicamente
                const links = document.querySelectorAll('.dynamic-usuarioId');
                links.forEach(link => {
                    // Atualiza os href de cada link com o usuarioId
                    link.href = link.href.replace(':usuarioId', usuarioId);
                });
            } else {
                // Caso o usuário não tenha um ID na sessão, redireciona para login
                window.location.href = '/login';
            }
        })
        .catch(err => {
            console.error('Erro ao obter dados da sessão', err);
        });
});
