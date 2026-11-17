<div align="center">

<img src="assets/Logo%20FinUP.png" alt="FinUP" width="260">

# FinUP — Dashboard de Gestão Financeira Pessoal

**Organize suas finanças. Visualize seus resultados. Tenha mais controle sobre seu dinheiro.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

[**Acessar aplicação**](https://finupproject.vercel.app/) · [**Repositório GitHub**](https://github.com/viniciusluchtenberg/FINUP-PROJETO-2SEM)

</div>

---

## 📌 Sobre o projeto

O **FinUP** é um dashboard de gestão financeira pessoal desenvolvido com o objetivo de facilitar o acompanhamento e a visualização das finanças. A aplicação reúne informações sobre receitas, despesas e saldo em uma interface simples e organizada, utilizando gráficos e indicadores para tornar os dados mais compreensíveis.

O projeto foi desenvolvido como atividade acadêmica do **2º semestre do curso de Análise e Desenvolvimento de Sistemas**, colocando em prática conhecimentos de desenvolvimento web, lógica de programação, manipulação de dados e construção de interfaces.

## 📑 Índice

- [Sobre o projeto](#-sobre-o-projeto)
- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Organização dos arquivos](#-organização-dos-arquivos)
- [Como executar](#-como-executar)
- [Como os dados funcionam](#-como-os-dados-funcionam)
- [Desenvolvimento](#-desenvolvimento)
- [Autor](#-autor)

## 🖥️ Demonstração

Acesse a versão publicada do FinUP:

<div align="center">

[![Acessar FinUP](https://img.shields.io/badge/Acessar%20FinUP-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://finupproject.vercel.app/)

</div>

## ✨ Funcionalidades

### 📊 Dashboard
- Visualização do saldo financeiro acumulado.
- Gráfico de evolução do saldo ao longo dos meses.
- Gráfico de despesas distribuídas por categoria.
- Comparação entre entradas e despesas.
- Área destinada à visualização de metas de economia.

### 💰 Receitas
- Página dedicada ao acompanhamento das receitas.
- Indicadores de valores totais, fixos e variáveis.
- Área de visualização gráfica e listagem de registros.

### 💸 Despesas
- Página dedicada ao acompanhamento das despesas.
- Indicadores de despesas totais, fixas e variáveis.
- Visualização de despesas por categoria.
- Gráfico de evolução das despesas.
- Listagem das despesas.

### 🔄 Transações
- Seção própria para centralizar a visualização das transações financeiras.

## 🧰 Tecnologias utilizadas

| Tecnologia | Aplicação no projeto |
|---|---|
| HTML5 | Estruturação das páginas |
| CSS3 | Estilização e identidade visual |
| JavaScript | Lógica, processamento e apresentação dos dados |
| Bootstrap 5 | Componentes e organização responsiva da interface |
| Bootstrap Icons | Ícones utilizados na navegação |
| Chart.js | Criação e configuração dos gráficos |
| JSON | Organização dos dados utilizados pela aplicação |
| Vercel | Hospedagem da aplicação |

## 📁 Organização dos arquivos

```text
FINUP-PROJETO-2SEM/
│
├── assets/
│   └── Logo FinUP.png
│
├── css/
│   └── style.css
│
├── js/
│   ├── dados.json
│   ├── script.js
│   └── utils.js
│
├── index.html
├── transacoes.html
├── receitas.html
├── despesas.html
└── README.md
```

## 🚀 Como executar

O FinUP é uma aplicação web estática. Para executá-la localmente, não é necessário instalar dependências de back-end.

### Pré-requisitos

- Navegador atualizado (Google Chrome, Firefox, Edge ou outro).
- Git (opcional, para clonar o repositório).
- Um servidor local para servir os arquivos, especialmente porque os dados JSON são carregados com `fetch()`.

### 1. Clone o repositório

```bash
git clone https://github.com/viniciusluchtenberg/FINUP-PROJETO-2SEM.git
```

### 2. Entre na pasta do projeto

```bash
cd FINUP-PROJETO-2SEM
```

### 3. Inicie um servidor local

Uma opção simples é utilizar a extensão **Live Server** no Visual Studio Code:

1. Abra a pasta do projeto no Visual Studio Code.
2. Instale a extensão Live Server, caso ainda não esteja instalada.
3. Clique com o botão direito no arquivo `index.html`.
4. Selecione **Open with Live Server**.

O projeto será aberto no navegador por meio de um endereço local.

> Não é recomendado abrir o `index.html` diretamente pelo sistema de arquivos (`file://`), pois o navegador pode bloquear a leitura do JSON feita com `fetch()`.

## 🗂️ Como os dados funcionam

Os dados utilizados pelo dashboard são organizados no arquivo `js/dados.json`. O arquivo `js/utils.js` realiza a leitura desse JSON e disponibiliza funções para processar os valores financeiros.

O processamento considera os dados mensais de receitas e despesas para calcular:

- Total de receitas de cada mês.
- Total de despesas de cada mês.
- Saldo acumulado ao longo dos meses.
- Valores utilizados na construção dos gráficos.
- Categorias de despesas.

O arquivo `js/script.js` utiliza os dados processados para atualizar os indicadores e construir os gráficos com Chart.js.

**Observação:** nesta versão, os dados são carregados de um arquivo JSON estático. O projeto não utiliza banco de dados ou uma API de back-end.

## 🛠️ Desenvolvimento

O FinUP é um projeto acadêmico em desenvolvimento, construído para aplicar e aprimorar conhecimentos em desenvolvimento front-end e visualização de dados.

A estrutura foi organizada separando:
- **HTML:** conteúdo e estrutura das páginas.
- **CSS:** aparência e responsividade.
- **JavaScript:** lógica da aplicação e configuração dos gráficos.
- **JSON:** dados financeiros utilizados na demonstração.

## 👨‍💻 Autor

**Vinícius Luchtenberg Pagnussat**

Estudante de Análise e Desenvolvimento de Sistemas — UniFasipe.

- GitHub: [@viniciusluchtenberg](https://github.com/viniciusluchtenberg)
- Projeto: [FINUP-PROJETO-2SEM](https://github.com/viniciusluchtenberg/FINUP-PROJETO-2SEM)
- Aplicação: [finupproject.vercel.app](https://finupproject.vercel.app/)

---

<div align="center">

Desenvolvido como projeto acadêmico do 2º semestre de Análise e Desenvolvimento de Sistemas.

**FinUP — Gestão financeira de forma simples e visual.**

</div>
