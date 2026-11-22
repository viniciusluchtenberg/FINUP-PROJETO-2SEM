const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

async function carregarGraficos() {
    const dados = await carregarDados();
    const valores = processarDados(dados);

    Chart.defaults.maintainAspectRatio = false;

    document.getElementById('valorSaldo').textContent =
        valores.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const gastosPorEstabelecimento = {};

    for (const nomeMes of dados.meses) {
        const mes = MESES[dados.meses.indexOf(nomeMes)];
        const transacoes = dados[mes]?.transacoes || [];

        for (const transacao of transacoes) {
            const lugar = transacao.lugar;

            if (gastosPorEstabelecimento[lugar] === undefined) {
                gastosPorEstabelecimento[lugar] = 0;
            }

            gastosPorEstabelecimento[lugar] += Number(transacao.valor);
        }
    }

    const estabelecimentosOrdenados = Object.entries(gastosPorEstabelecimento)
        .sort((a, b) => b[1] - a[1]);

    const ctx = document.getElementById('chartSaldo');
    const ctx1 = document.getElementById('chartCategorias');
    const ctx2 = document.getElementById('chartEntradas');
    const ctx3 = document.getElementById('chartEstabelecimentos');

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
    
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: estabelecimentosOrdenados.map(item => item[0]),
            datasets: [{
                label: 'Total gasto',
                data: estabelecimentosOrdenados.map(item => item[1]),
                backgroundColor: '#45B7D1',
                borderRadius: 5,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (valor) {
                            return valor.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            });
                        }
                    }
                }
            }
        }
    });
}
carregarGraficos();
