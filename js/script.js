const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

async function carregarGraficos() {
    const dados = await carregarDados();
    const valores = processarDados(dados);

    Chart.defaults.maintainAspectRatio = false;

    document.getElementById('valorSaldo').textContent =
        valores.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const ultimoIndice = valores.meses.length - 1;

    const saldoAtual = valores.entradas[ultimoIndice] + valores.saidas[ultimoIndice];
    const saldoAnterior = valores.entradas[ultimoIndice - 1] + valores.saidas[ultimoIndice - 1];
    const elementoVariacao = document.getElementById('variacaoSaldo');
    const elementoComparacao = document.getElementById('comparacaoMes');

    const variacao = ((saldoAtual - saldoAnterior) / Math.abs(saldoAnterior)) * 100;

    if (saldoAnterior !== 0) {
        let sinal = '';

        if (variacao > 0) {
            sinal = '+';
        }

        elementoVariacao.textContent = sinal + variacao.toFixed(1) + '%';

        if (variacao >= 0) {
            elementoVariacao.className = 'fw-bold text-success';
        } else {
            elementoVariacao.className = 'fw-bold text-danger';
        }

    } else {
        elementoVariacao.textContent = 'N/D';
    }

    elementoComparacao.textContent = 'Em relação a ' + valores.meses[ultimoIndice - 1];

    const ctx = document.getElementById('chartSaldo');
    const ctx1 = document.getElementById('chartCategorias');
    const ctx2 = document.getElementById('chartEntradas');
    const ctx3 = document.getElementById('chartEconomia');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: valores.meses,
            datasets: [{
                label: 'Saldo',
                data: valores.evolucaoSaldo,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });

    new Chart(ctx1, {
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
                    display: true,
                    position: 'left',
                }
            }
        }
    });

    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: valores.meses,
            datasets: [
                {
                    label: 'Entradas',
                    data: valores.entradas,
                    backgroundColor: '#45B7D1',
                },
                {
                    label: 'Saídas',
                    data: valores.saidas,
                    backgroundColor: '#FF6B6B',
                }
            ]
        },
        options: {
            responsive: true,
        }
    });
}

carregarGraficos();
