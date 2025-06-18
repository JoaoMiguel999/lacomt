document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formAnamnese');
    const mensagem = document.getElementById('mensagem');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Verifica se o formulário é válido
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Exibe a mensagem de sucesso
        mensagem.style.display = 'block';
        mensagem.style.opacity = 1;

        // Após 3 segundos, esconde a mensagem, limpa o formulário e volta para o topo
        setTimeout(() => {
            mensagem.style.opacity = 0;
            setTimeout(() => {
                mensagem.style.display = 'none';
                form.reset();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 500);
        }, 3000);
    });
});
