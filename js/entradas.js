const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

async function carregarEntradas() {
    const dados = await carregarDados();
    const valores = processarDados(dados);
    const totaisMesAtual = totaisMesVigente(dados);

    const listaEntradas = document.getElementById('listaEntradas');

    const ultimoMes = MESES[dados.meses.length - 1];
    const entradas = dados[ultimoMes].entradas || [];

    const ultimasEntradas = entradas.slice(-5).reverse();

    listaEntradas.innerHTML = '';

    for (const entrada of ultimasEntradas) {
        const linha = document.createElement('tr');

        linha.innerHTML = `<td>${entrada.nome}</td>
        <td>${entrada.Data}</td>
        <td class="text-end">
            ${Number(entrada.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </td>`;

        listaEntradas.appendChild(linha);
    }

    Chart.defaults.maintainAspectRatio = false;

    const nomesEntradasFixas = ['Salário', 'Vale-Alimentação'];

    const entradasFixas = valores.categoriasEntradas
        .filter(item => nomesEntradasFixas.includes(item.nome))
        .reduce((total, item) => total + item.valor, 0);

    const entradasVariaveis = valores.categoriasEntradas
        .filter(item => !nomesEntradasFixas.includes(item.nome))
        .reduce((total, item) => total + item.valor, 0);

    const diasMes = new Date(2026, dados.meses.length, 0).getDate();

    const mediaEntrada = totaisMesAtual.entradas / diasMes;

    document.getElementById('valorSaldo').textContent =
        valores.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('totalEntradas').textContent =
        totaisMesAtual.entradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('entradasFixas').textContent =
        entradasFixas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('entradasVariaveis').textContent =
        entradasVariaveis.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('mediaEntrada').textContent =
        mediaEntrada.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const ctx = document.getElementById('chartCategoriasEntradas');
    const ctx1 = document.getElementById('chartEvolucaoEntradas');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: valores.categoriasEntradas.map(c => c.nome),
            datasets: [{
                data: valores.categoriasEntradas.map(c => c.valor),
                backgroundColor: ['#6C5CE7', '#4ECDC4', '#45B7D1', '#FF6B6B', '#FFEAA7', '#DDA0DD', '#96CEB4', '#A8E6CF', '#FFB347', '#FF8A65', '#5DADE2', '#F06292'],
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
                label: 'Entradas',
                data: valores.entradas.map(valor => Math.abs(valor)),
                backgroundColor: '#6b93ff',
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

carregarEntradas();
