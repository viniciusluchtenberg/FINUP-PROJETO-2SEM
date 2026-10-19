const dados = {
  "saldo": 5345.92,
  "meses": ["Mai", "Jun", "Jul", "Ago", "Set", "Out"],
  "evolucaoSaldo": [2800, 3200, 2950, 4100, 4700, 6000],
  "categorias": [
    { "nome": "Moradia", "valor": 1500 },
    { "nome": "Alimentação", "valor": 900 },
    { "nome": "Transporte", "valor": 450 },
    { "nome": "Lazer", "valor": 300 },
    { "nome": "Outros", "valor": 250 }
  ],
  "metas": [
    { "nome": "Reserva de emergência", "percentual": 65 },
    { "nome": "Viagem", "percentual": 40 },
    { "nome": "Notebook novo", "percentual": 85 }
  ],
  "entradas": [1800, 2800, 1400, 4000, 3500, 3500],
  "despesas": [-1400, -3050, -250, -3400, -2200, 3500]
}

const ctx = document.getElementById('chartSaldo')
const ctx1 = document.getElementById('chartCategorias')  
const ctx2 = document.getElementById('chartEntradas')
const ctx3 = document.getElementById('chartEconomia')

new Chart(ctx, {
    type: 'line',
    data: {
        labels: dados.meses,
        datasets: [{
            label: 'Saldo',
            data: dados.evolucaoSaldo,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function(value, index, ticks) {
                        return 'R$ ' + value;
                    }}
            }
        }
    },
    plugins: []
});

new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: dados.categorias.map(c => c.nome),
        datasets: [{
            data: dados.categorias.map(c => c.valor),
            backgroundColor: ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#6C5CE7','#A8E6CF','#FFB347','#FF8A65','#5DADE2','#F06292'],
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                position: 'right'
            }
        }
    },
    plugins: []
});

new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: dados.meses,
        datasets: [
            {
            label: 'Entradas',
            data: dados.entradas,
            backgroundColor: ['#45B7D1'],
            },
            {
            label: 'Despesas',
            data: dados.despesas,
            backgroundColor: ['#FF6B6B'],
            }
        ]
    },
    options: {
        responsive: true,
    },
    plugins: []
})