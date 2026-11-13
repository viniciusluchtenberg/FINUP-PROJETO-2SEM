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
    const saidas = [];
    const evolucaoSaldo = [];
    let saldo = 0;

    for (let i = 0; i < dados.meses.length; i++) {
        const mes = dados[MESES[i]];
        const receita = totalDe(mes.entradas);
        const despesa = totalDe(mes.saidas);
        
        saldo = Number((saldo + receita - despesa).toFixed(2));

        entradas.push(receita);
        saidas.push(-despesa);
        evolucaoSaldo.push(saldo);
    }

    const ultimoMes = dados[MESES[dados.meses.length - 1]];

    return {
        saldo: saldo,
        meses: dados.meses,
        entradas: entradas,
        saidas: saidas,
        evolucaoSaldo: evolucaoSaldo,
        categorias: ultimoMes.saidas,
        categoriasEntradas: ultimoMes.entradas,
    };
}

function totaisMesVigente(dados) {
    const mesAtual = MESES[new Date().getMonth()];
    const mesVigente = dados[mesAtual];
    const entradas = totalDe(mesVigente.entradas);
    const saidas = totalDe(mesVigente.saidas);

    return {
        saidas: saidas,
        entradas: entradas,
        saldoMesAtual: Number((entradas - saidas).toFixed(2))
    }
}