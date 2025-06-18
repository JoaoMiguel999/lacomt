document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const mensagemEl = document.getElementById('mensagem');
    const modalEl = new bootstrap.Modal(document.getElementById('modalAgendamento'));
    const horaSelect = document.getElementById('horaConsulta');
    const confirmarBtn = document.getElementById('confirmarBtn');

    // Horários de exemplo para agendamento
    const horariosDisponiveis = [
        "08:00", "09:00", "10:00", "11:00",
        "13:00", "14:00", "15:00", "16:00"
    ];

    // Função para capitalizar primeira letra de cada palavra
    function capitalizeWords(str) {
        return str.replace(/\b\w/g, c => c.toUpperCase());
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Inicializa o calendário FullCalendar
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        height: 'auto',
        headerToolbar: {
            left: 'prev,next',   // só botões anterior e próximo
            center: 'title',
            right: ''           // remove botões do lado direito
        },
        buttonText: {
            prev: 'Anterior',
            next: 'Próximo'
            // outros removidos pois não aparecem
        },
        dayCellClassNames(arg) {
            const day = arg.date.getDay();
            // Disponibiliza somente Terça (2) e Quarta (3)
            if (day === 2 || day === 3) {
                return ['dia-disponivel'];
            }
            return [];
        },
        dayCellDidMount(arg) {
            if (arg.el.classList.contains('dia-disponivel')) {
                const icon = document.createElement('i');
                icon.className = 'bi bi-check2-circle icone-disponivel';
                arg.el.appendChild(icon);
            }
            // Bloqueia dias passados para clique e visual
            const dataDia = arg.date;
            dataDia.setHours(0, 0, 0, 0);
            if (dataDia < hoje) {
                arg.el.classList.remove('dia-disponivel');
                arg.el.classList.add('fc-day-disabled');
                arg.el.style.pointerEvents = 'none';
                arg.el.style.opacity = '0.45';
            }
        },
        dateClick(info) {
            if (!info.dayEl.classList.contains('dia-disponivel')) {
                return;
            }
            mensagemEl.classList.add('d-none');

            // Preenche select com horários disponíveis
            horaSelect.innerHTML = '';
            horariosDisponiveis.forEach(hora => {
                const option = document.createElement('option');
                option.value = hora;
                option.textContent = hora;
                horaSelect.appendChild(option);
            });

            confirmarBtn.dataset.dataSelecionada = info.dateStr;
            modalEl.show();
        },
        dayHeaderContent(arg) {
            return capitalizeWords(arg.text);
        }
    });

    calendar.render();

    confirmarBtn.addEventListener('click', () => {
        const data = confirmarBtn.dataset.dataSelecionada;
        const hora = horaSelect.value;

        if (!data || !hora) {
            mensagemEl.textContent = 'Selecione uma data e horário válidos.';
            mensagemEl.className = 'alert alert-danger';
            mensagemEl.classList.remove('d-none');
            return;
        }

        // Formata data e hora no padrão brasileiro
        const dataObj = new Date(`${data}T${hora}:00`);
        const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'America/Sao_Paulo'
        }).format(dataObj);

        mensagemEl.textContent = `Consulta agendada para ${dataFormatada}.`;
        mensagemEl.className = 'alert alert-success';
        mensagemEl.classList.remove('d-none');

        modalEl.hide();

        
        setTimeout(() => {
            window.location.href = 'anamenese.html';
        }, 1000);
    });
});
