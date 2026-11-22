const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

async function carregarSaidas() {
    const dados = await carregarDados();
    const valores = processarDados(dados);
    const totaisMesAtual = totaisMesVigente(dados);

    const listaSaidas = document.getElementById('listaSaidas');

    const ultimoMes = MESES[dados.meses.length - 1];
    const saidas = dados[ultimoMes].transacoes || [];

    const ultimasSaidas = saidas.slice(-5).reverse();

    listaSaidas.innerHTML = '';

    for (const saida of ultimasSaidas) {
        const linha = document.createElement('tr');

        linha.innerHTML = `<td>${saida.lugar}</td>
        <td>${saida.Data}</td>
        <td class="text-end">
            ${Number(saida.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </td>`;

        listaSaidas.appendChild(linha);
    }

    Chart.defaults.maintainAspectRatio = false;

    const nomesSaidasFixas = ['Aluguel', 'Energia', 'Saneamento'];

    const saidasFixas = valores.categorias
        .filter(item => nomesSaidasFixas.includes(item.nome))
        .reduce((total, item) => total + item.valor, 0);

    const saidasVariaveis = valores.categorias
        .filter(item => !nomesSaidasFixas.includes(item.nome))
        .reduce((total, item) => total + item.valor, 0);

    const diasMes = new Date(2026, dados.meses.length, 0).getDate();

    const mediaSaida = totaisMesAtual.saidas / diasMes;

    document.getElementById('valorSaldo').textContent =
        valores.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('totalSaidas').textContent =
        totaisMesAtual.saidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('saidasFixas').textContent =
        saidasFixas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('saidaVariavel').textContent =
        saidasVariaveis.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('mediaSaida').textContent =
        mediaSaida.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const ctx = document.getElementById('chartCategorias');
    const ctx1 = document.getElementById('chartEvolucao');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: valores.categorias.map(c => c.nome),
            datasets: [{
                data: valores.categorias.map(c => c.valor),
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#6C5CE7', '#A8E6CF', '#FFB347', '#FF8A65', '#5DADE2', '#F06292'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: 'left',
                }
            }
        }
    });

    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: valores.meses,
            datasets: [{
                label: 'Saídas',
                data: valores.saidas.map(valor => Math.abs(valor)),
                backgroundColor: '#FF6B6B',
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return 'R$ ' + value;
                        }
                    }
                }
            }
        }
    });
}

carregarSaidas();
