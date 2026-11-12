async function carregarDados() {
    const resposta = await fetch('js/dados.json');
    const dados = await resposta.json();
    return dados
}

const MESES = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

function totalDe(lista) {
    let total = 0;
    for (const item of lista) {
        total += item.valor;
    }
    return Number(total.toFixed(2));
}

function processarDados(dados) {
    const entradas = [];
    const despesas = [];
    const evolucaoSaldo = [];
    let saldo = 0;

    for (let i = 0; i < dados.meses.length; i++) {
        const mes = dados[MESES[i]];
        const receita = totalDe(mes.receitas);
        const despesa = totalDe(mes.despesas);

        saldo = Number((saldo + receita - despesa).toFixed(2));

        entradas.push(receita);
        despesas.push(-despesa);
        evolucaoSaldo.push(saldo)
    }

    const ultimoMes = dados[MESES[dados.meses.length - 1]];

    return {
        saldo: saldo,
        meses: dados.meses,
        entradas: entradas,
        despesas: despesas,
        evolucaoSaldo: evolucaoSaldo,
        categorias: ultimoMes.despesas,
    };
}