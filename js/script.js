const dados = {
  "saldo": 5345.92,
  "meses": ["Mai", "Jun", "Jul", "Ago", "Set", "Out"],
  "evolucaoSaldo": [2800, 3200, 2950, 4100, 4700, 5345.92],
  "receitas": [4200, 4200, 4500, 4800, 5000, 5200],
  "despesas": [3800, 3600, 3900, 3700, 3900, 3400],
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
  ]
}

const ctx = document.getElementById('chartSaldo')
const ctx1 = document.getElementById('chartCategorias')  

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
            label: 'Grafico Teste',
            data: dados.categorias.map(c => c.valor),
            backgroundColor: ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#6C5CE7','#A8E6CF','#FFB347','#FF8A65','#5DADE2','#F06292'],
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    },
    plugins: []
})