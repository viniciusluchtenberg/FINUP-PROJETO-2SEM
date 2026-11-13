const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

async function carregarEntradas() {
    const dados = await carregarDados();            
    const valores = processarDados(dados);    
    const totaisMesAtual = totaisMesVigente(dados);

    let entradasFixas = valores.categoriasEntradas.map(c => c.nome);


    Chart.defaults.maintainAspectRatio = false;

    document.getElementById('valorSaldo').textContent =
        valores.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('totalEntradas').textContent =
        totaisMesAtual.entradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const ctx = document.getElementById('graficoCategoriasEntradas');
    const ctx1 = document.getElementById('graficoEvolucaoEntradas');
    
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
                        callback: function(value) {
                            return 'R$ ' + value;
                        }
                    }
                }
            }
        }
    });
}

carregarEntradas();
