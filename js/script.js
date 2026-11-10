const dados = {
    "meses": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    "janeiro": {
        "receitas": [
            { "nome": "salario", "valor": 3500.00},
            { "nome": "valeAlimentacao", "valor": 450.00},   
        ],
        "despesas": [
            { "nome": "Aluguel", "valor": 1000.00},
            { "nome": "Alimentação", "valor": 400.00},
            { "nome": "Transporte", "valor": 200.00},
            { "nome": "Energia", "valor": 300.00},
            { "nome": "Saneamento", "valor": 150.00},
        ]
    },        
    "fevereiro": {
        "receitas": [
            { "nome": "salario", "valor": 3500.00},
            { "nome": "valeAlimentacao", "valor": 450.00},   
        ],
        "despesas": [
            { "nome": "Aluguel", "valor": 1000.00},
            { "nome": "Alimentação", "valor": 300.00},
            { "nome": "Transporte", "valor": 150.00},
            { "nome": "Energia", "valor": 450.45},
            { "nome": "Saneamento", "valor": 100.09},
        ]
    },        
    "marco": {
        "receitas": [
            { "nome": "salario", "valor": 3500.00},
            { "nome": "valeAlimentacao", "valor": 450.00},   
        ],
        "despesas": [
            { "nome": "Aluguel", "valor": 1000.00},
            { "nome": "Alimentação", "valor": 450.00},
            { "nome": "Transporte", "valor": 210.00},
            { "nome": "Energia", "valor": 275.80},
            { "nome": "Saneamento", "valor": 125.50},
        ]
    },        
}

const ctx = document.getElementById('chartSaldo')
const ctx1 = document.getElementById('chartCategorias')  
const ctx2 = document.getElementById('chartEntradas')
const ctx3 = document.getElementById('chartEconomia')
Chart.defaults.maintainAspectRatio = false;

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
                display: false,
                position: 'left',
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