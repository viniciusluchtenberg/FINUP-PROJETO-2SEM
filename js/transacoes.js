const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

async function carregarTransacoes() {
    const dados = await carregarDados();
    const valores = processarDados(dados);

    const listaTransacoes = document.getElementById('listaTransacoes');

    const ultimoMes = MESES[dados.meses.length - 1];
    const transacoes = dados[ultimoMes].transacoes || [];

    const ultimasTransacoes = transacoes.slice(-5).reverse();

    const quantidadePorLugar = {};

    for (const transacao of transacoes) {
        const lugar = transacao.lugar;

        quantidadePorLugar[lugar] = (quantidadePorLugar[lugar] || 0) + 1;
    }

    const lugaresOrdenados = Object.entries(quantidadePorLugar)
        .sort((a, b) => b[1] - a[1]);

    listaTransacoes.innerHTML = '';

    document.getElementById('valorSaldo').textContent =
        valores.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    for (const transacao of ultimasTransacoes) {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${transacao.lugar}</td>
            <td>${transacao.tipo}</td>
            <td>${transacao.Data}</td>
            <td class="text-end">
                ${Number(transacao.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </td>
        `;

        listaTransacoes.appendChild(linha);
    }

    Chart.defaults.maintainAspectRatio = false;

    const ctx = document.getElementById('graficoTransacoes');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: lugaresOrdenados.map(item => item[0]),
            datasets: [{
                label: 'Quantidade de transações',
                data: lugaresOrdenados.map(item => item[1]),
                backgroundColor: ['#B3EBF2','#6fe2f2','#62c7d4', '#52a6b1', '#3e7d85']
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
                        precision: 0,
                        stepSize: 1
                    }
                }
            }
        }
    });
}

carregarTransacoes();
