const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

async function carregarSaidas() {
    const dados = await carregarDados();            
    const valores = processarDados(dados);    
    const totaisMesAtual = totaisMesVigente(dados);

    Chart.defaults.maintainAspectRatio = false;

    document.getElementById('valorSaldo').textContent =
        valores.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    document.getElementById('totalSaidas').textContent =
        totaisMesAtual.saidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const ctx = document.getElementById('graficoCategorias');
    const ctx1 = document.getElementById('graficoEvolucao');
    
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
                        callback: function(value) {
                            return 'R$ ' + value;
                        }
                    }
                }
            }
        }
    });
}

carregarSaidas();
