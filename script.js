const diasSemana = ["DOMINGO", "SEGUNDA-FEIRA", "TERCA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SABADO"];
const hojeNome = diasSemana[new Date().getDay()];

window.dadosEstoque = {};

function gerarId(nome) {
    return nome.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

const menu = [
    { nome: "Petinga frita c/ arroz de tomate", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEGUNDA-FEIRA" },
    { nome: "Bacalhau a Bras", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEGUNDA-FEIRA" },
    { nome: "Jardineira de vitela", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEGUNDA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "SEGUNDA-FEIRA" },
    { nome: "Arroz de Marisco", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "TERCA-FEIRA" },
    { nome: "Bifinhos de Lombo", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "TERCA-FEIRA" },
    { nome: "Carne de Porco a Alentejana", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "TERCA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "TERCA-FEIRA" },
    { nome: "Arroz de pato", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUARTA-FEIRA" },
    { nome: "Entrecosto c/Favas", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUARTA-FEIRA" },
    { nome: "Solha Frita", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUARTA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "QUARTA-FEIRA" },
    { nome: "Feijoada de Liguerao", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUINTA-FEIRA" },
    { nome: "Bacalhau c/Natas", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUINTA-FEIRA" },
    { nome: "Panados de frango", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUINTA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "QUINTA-FEIRA" },
    { nome: "Bifinhos c/Natas", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEXTA-FEIRA" },
    { nome: "Lasanha", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEXTA-FEIRA" },
    { nome: "Choco Frito", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEXTA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "SEXTA-FEIRA" },
    { nome: "Arroz de Polvo", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SABADO" },
    { nome: "Esparguete a bolonhesa", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SABADO" },
    { nome: "Filetes de Linguado", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SABADO" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "SABADO" },
    { nome: "Bacalhau a casa", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "DOMINGO" },
    { nome: "Feijoada de choco", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "DOMINGO" },
    { nome: "Massa c/frango", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "DOMINGO" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "DOMINGO" },

    { nome: "Pizza Portuguesa", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela, chouricao e ovo" },
    { nome: "Pizza Camponesa", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela, bacon e cogumelos" },
    { nome: "Pizza Tropical", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela, ananas e fiambre" },
    { nome: "Pizza do Mar", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela, atum e camarao" },
    { nome: "Pizza de Frango", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Frango, milho e mozarela" },
    { nome: "Pizza Vegetariana", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Legumes variados e mozarela" },
    { nome: "Pizza Pepperoni", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela e pepperoni" },
    { nome: "Pizza 3 Ingredientes", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Escolha 3 ingredientes a sua medida" },

    { nome: "Frango (Chicken)", preco: 9.00, meia: 5.00, cat: "Grelhados", temOpcoes: true },
    { nome: "Entrecosto de Porco", preco: 10.00, meia: 5.00, cat: "Grelhados", temOpcoes: true },
    { nome: "Febras", preco: 9.00, meia: 5.00, cat: "Grelhados", temOpcoes: true },
    { nome: "Bife frango grelhado", preco: 9.00, meia: 5.00, cat: "Grelhados", temOpcoes: true },
    { nome: "Entremeada de Porco", preco: 11.00, meia: 5.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Salsichas", preco: 11.00, meia: 5.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Secretos de Porco Iberico", preco: 14.00, meia: 7.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Picanha", preco: 14.00, meia: 7.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Dourada Escalada", preco: 12.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Robalo escalado c/ batatas assadas", preco: 14.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Sardinhas", preco: 14.50, cat: "Grelhados", temOpcoes: true },

    { nome: "Dose de Batata Frita", preco: 3.00, cat: "Acompanhamentos" },
    { nome: "Meia Dose de Batata Frita", preco: 1.50, cat: "Acompanhamentos" },
    { nome: "Dose de Arroz", preco: 2.50, cat: "Acompanhamentos" },
    { nome: "Meia Dose de Arroz", preco: 1.25, cat: "Acompanhamentos" },
    { nome: "Salada Mista", preco: 3.00, cat: "Acompanhamentos" },

    { nome: "Caracois 1LT", preco: 12.00, cat: "Petiscos" },
    { nome: "Pasteis de Bacalhau (un)", preco: 1.20, cat: "Petiscos" },
    { nome: "Rissois de Leitao (un)", preco: 1.50, cat: "Petiscos" },
    { nome: "Rissois de Carne (un)", preco: 1.50, cat: "Petiscos" },
    { nome: "Rissois de Camarao (un)", preco: 1.50, cat: "Petiscos" },

    { nome: "Coca Cola", preco: 1.50, cat: "Bebidas" },
    { nome: "Nectar", preco: 1.25, cat: "Bebidas" },
    { nome: "Fanta Laranja", preco: 1.50, cat: "Bebidas" },
    { nome: "Sprite", preco: 1.50, cat: "Bebidas" },
    { nome: "Ice Tea", preco: 1.50, cat: "Bebidas" },
    { nome: "Cerveja Sagres", preco: 1.20, cat: "Bebidas" },
    { nome: "Casal Garcia", preco: 6.00, cat: "Bebidas" },

    { nome: "Arroz Doce", preco: 1.50, cat: "Sobremesas" }
];

let carrinho = [];
let pizzaSelecionada = null;
let quantidadePizza = 1;
let grelhadoSelecionado = null;
let toastTimeout = null;

const acompanhamentosGrelhados = [
    { grupo: "Batata Frita", itens: [{ n: "Dose Batata", p: 3.00 }, { n: "1/2 Batata", p: 1.50 }] },
    { grupo: "Arroz", itens: [{ n: "Dose Arroz", p: 2.50 }, { n: "1/2 Arroz", p: 1.25 }] },
    { grupo: "Salada", itens: [{ n: "Salada Mista", p: 3.00 }] }
];

if (typeof db !== 'undefined') {
    db.ref("estoque").on("value", (snap) => {
        window.dadosEstoque = snap.val() || {};
        const modal = document.getElementById('modal-menu');
        if (modal && modal.classList.contains('modal-open')) {
            const catAtiva = document.querySelector('.cat-item.active');
            if (catAtiva) {
                const texto = catAtiva.innerText;
                if (texto.includes('Hoje')) filtrar('Dia');
                else if (texto.includes('Grelhados')) filtrar('Grelhados');
                else if (texto.includes('Pizzas')) filtrar('Pizzas');
                else if (texto.includes('Petiscos')) filtrar('Petiscos');
                else if (texto.includes('Doces')) filtrar('Sobremesas');
                else if (texto.includes('Extras')) filtrar('Acompanhamentos');
                else if (texto.includes('Bebidas')) filtrar('Bebidas');
            }
        }
    });
}

window.onload = () => {
    const btnDinamico = document.getElementById('btn-menu-dinamico');
    if (btnDinamico) btnDinamico.innerText = `VER MENU ${hojeNome} E PEDIR`;
    gerarHorarios();
    verificarHorario();
};

function abrirMenu() {
    const modal = document.getElementById('modal-menu');
    if (modal) {
        modal.classList.add('modal-open');
        document.body.classList.add('menu-open');
        filtrar('Dia');
    }
}

function fecharMenu() {
    const modal = document.getElementById('modal-menu');
    if (modal) modal.classList.remove('modal-open');
    document.body.classList.remove('menu-open');
}

function filtrar(categoria) {
    const lista = document.getElementById('lista-pratos');
    const todosItensCat = document.querySelectorAll('.cat-item');

    todosItensCat.forEach(item => item.classList.remove('active'));

    todosItensCat.forEach(item => {
        const texto = item.innerText;
        if ((texto.includes('Hoje') && categoria === 'Dia') ||
            (texto.includes('Doces') && categoria === 'Sobremesas') ||
            (texto.includes('Extras') && categoria === 'Acompanhamentos') ||
            (texto.includes('Bebidas') && categoria === 'Bebidas') ||
            (texto.includes('Pizzas') && categoria === 'Pizzas') ||
            (texto.includes('Petiscos') && categoria === 'Petiscos') ||
            (texto.includes('Grelhados') && categoria === 'Grelhados')) {
            item.classList.add('active');
        }
    });

    let itens = [];
    if (categoria === 'Dia') {
        itens = menu.filter(p => p.cat === 'Dia' && p.dia === hojeNome);
        document.getElementById('titulo-modal').innerText = `MENU DE HOJE (${hojeNome})`;
    } else {
        itens = menu.filter(p => p.cat === categoria);
        const titulos = {
            Acompanhamentos: 'EXTRAS',
            Sobremesas: 'DOCES',
            Bebidas: 'BEBIDAS',
            Pizzas: 'PIZZAS',
            Petiscos: 'PETISCOS',
            Grelhados: 'GRELHADOS'
        };
        document.getElementById('titulo-modal').innerText = titulos[categoria] || categoria.toUpperCase();
    }

    lista.innerHTML = itens.map(p => {
        const meuId = gerarId(p.nome);
        const dadosFB = window.dadosEstoque[meuId] || {};
        const nomeExibir = dadosFB.nome_custom || p.nome;
        const valorMeia = (dadosFB.preco_meia !== undefined && dadosFB.preco_meia !== "") ? parseFloat(dadosFB.preco_meia) : p.meia;
        const valorInteira = (dadosFB.preco !== undefined && dadosFB.preco !== "") ? parseFloat(dadosFB.preco) : (p.inteira || p.preco);

        let botoes = '';
        if (p.cat === "Pizzas") {
            botoes = `<button class="btn-opcao" onclick="abrirOpcoesPizza('${p.nome}')">Escolher</button>`;
        } else if (p.cat === "Grelhados") {
            botoes = `<button class="btn-opcao" onclick="abrirOpcoesGrelhado('${p.nome}')">Escolher</button>`;
        } else if (p.meia && p.inteira) {
            botoes = `
                <button class="btn-opcao" onclick="adicionar('${nomeExibir} (1/2)', ${valorMeia})">1/2 (${valorMeia.toFixed(2)}EUR)</button>
                <button class="btn-opcao" onclick="adicionar('${nomeExibir} (Dose)', ${valorInteira})">Dose (${valorInteira.toFixed(2)}EUR)</button>`;
        } else {
            botoes = `<button class="btn-opcao" onclick="adicionar('${nomeExibir}', ${valorInteira})">Add (${valorInteira.toFixed(2)}EUR)</button>`;
        }

        const estiloEsgotado = dadosFB.esgotado ? 'style="opacity:0.4; filter:grayscale(1); pointer-events:none;"' : '';
        return `
            <div class="caixa-item" id="item-${meuId}" ${estiloEsgotado}>
                <div class="item-info"><strong>${nomeExibir}</strong>${p.desc ? '<br><small>' + p.desc + '</small>' : ''}</div>
                <div class="item-actions">${botoes}</div>
            </div>`;
    }).join('');
}

function abrirOpcoesGrelhado(nome) {
    const meuId = gerarId(nome);
    const dadosFB = window.dadosEstoque[meuId] || {};
    grelhadoSelecionado = menu.find(p => p.nome === nome);
    document.getElementById('grelhado-nome').innerText = dadosFB.nome_custom || nome;
    document.getElementById('obs-grelhado').value = "";
    let html = "";

    if (grelhadoSelecionado.meia) {
        const pMeia = (dadosFB.preco_meia !== undefined && dadosFB.preco_meia !== "") ? parseFloat(dadosFB.preco_meia) : grelhadoSelecionado.meia;
        const pInteira = (dadosFB.preco !== undefined && dadosFB.preco !== "") ? parseFloat(dadosFB.preco) : grelhadoSelecionado.preco;
        html += `
            <div style="margin-top:10px; font-weight:bold; color:#e67e22; text-align:left;">TAMANHO DA DOSE</div>
            <div class="caixa-item" style="padding:10px; margin-bottom:5px; border: 1px solid #444;">
                <label style="display:flex; justify-content:space-between; width:100%; cursor:pointer;">
                    <span>Dose Inteira (${pInteira.toFixed(2)}EUR)</span>
                    <input type="radio" name="tipo_dose" value="Dose" data-preco="${pInteira}" checked>
                </label>
            </div>
            <div class="caixa-item" style="padding:10px; margin-bottom:15px; border: 1px solid #444;">
                <label style="display:flex; justify-content:space-between; width:100%; cursor:pointer;">
                    <span>1/2 Dose (${pMeia.toFixed(2)}EUR)</span>
                    <input type="radio" name="tipo_dose" value="1/2" data-preco="${pMeia}">
                </label>
            </div>`;
    }

    html += `<div style="text-align:left; font-size:0.8rem; color:#888; margin-bottom:5px;">ACOMPANHAMENTOS:</div>`;
    acompanhamentosGrelhados.forEach((grupo) => {
        html += `<div style="margin-top:10px; font-weight:bold; color:#e67e22; text-align:left;">${grupo.grupo}</div>`;
        grupo.itens.forEach((it) => {
            html += `
                <div class="caixa-item" style="padding:10px; margin-bottom:5px;">
                    <span>${it.n} (+${it.p.toFixed(2)}EUR)</span>
                    <input type="checkbox" class="check-acompanhamento" data-nome="${it.n}" data-preco="${it.p}">
                </div>`;
        });
    });
    document.getElementById('lista-acompanhamentos').innerHTML = html;
    document.getElementById('modal-grelhados').classList.add('modal-open');
}

function confirmarGrelhado() {
    const checks = document.querySelectorAll('.check-acompanhamento:checked');
    const radioDose = document.querySelector('input[name="tipo_dose"]:checked');
    const obs = document.getElementById('obs-grelhado').value;
    const meuId = gerarId(grelhadoSelecionado.nome);
    const dadosFB = window.dadosEstoque[meuId] || {};

    let nomeFinal = dadosFB.nome_custom || grelhadoSelecionado.nome;
    let precoFinal = radioDose ? parseFloat(radioDose.getAttribute('data-preco')) : ((dadosFB.preco !== undefined && dadosFB.preco !== "") ? parseFloat(dadosFB.preco) : grelhadoSelecionado.preco);

    if (radioDose) nomeFinal += ` (${radioDose.value})`;
    if (checks.length > 0) {
        const nomesAcomp = [];
        checks.forEach(c => {
            nomesAcomp.push(c.getAttribute('data-nome'));
            precoFinal += parseFloat(c.getAttribute('data-preco'));
        });
        nomeFinal += ` + ${nomesAcomp.join(', ')}`;
    }
    if (obs) nomeFinal += ` [Obs: ${obs}]`;

    adicionar(nomeFinal, precoFinal);
    fecharModalGrelhados();
}

function fecharModalGrelhados() {
    document.getElementById('modal-grelhados').classList.remove('modal-open');
}

function abrirOpcoesPizza(nome) {
    pizzaSelecionada = menu.find(p => p.nome === nome);
    quantidadePizza = 1;
    document.getElementById('detalhe-nome-pizza').innerText = pizzaSelecionada.nome;
    document.getElementById('qtd-pizza').innerText = quantidadePizza;
    document.getElementById('obs-pizza').value = "";
    document.getElementById('modal-detalhe-pizza').classList.add('modal-open');
    atualizarPrecoFinal();
}

function mudarQuantidade(valor) {
    quantidadePizza += valor;
    if (quantidadePizza < 1) quantidadePizza = 1;
    document.getElementById('qtd-pizza').innerText = quantidadePizza;
    atualizarPrecoFinal();
}

function atualizarPrecoFinal() {
    const tamanho = document.getElementById('tamanho-pizza').value;
    const precoUnitario = pizzaSelecionada.precos[tamanho];
    document.getElementById('preco-total-pizza').innerText = (precoUnitario * quantidadePizza).toFixed(2) + "EUR";
}

function confirmarPizza() {
    const tamanho = document.getElementById('tamanho-pizza').value;
    const obs = document.getElementById('obs-pizza').value;
    const precoUnitario = pizzaSelecionada.precos[tamanho];
    const nomeFormatado = `${pizzaSelecionada.nome} (${tamanho.toUpperCase()})${obs ? ' [Obs: ' + obs + ']' : ''}`;
    for (let i = 0; i < quantidadePizza; i++) adicionar(nomeFormatado, precoUnitario);
    fecharOpcoes();
}

function fecharOpcoes() {
    document.getElementById('modal-detalhe-pizza').classList.remove('modal-open');
}

function mudarAba(aba) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (aba === 'itens') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active');
        document.getElementById('tab-itens').classList.add('active');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('tab-dados').classList.add('active');
    }
}

function toggleCart() {
    const cart = document.getElementById('carrinho-lateral');
    cart.classList.toggle('active');
    if (cart.classList.contains('active')) mudarAba('itens');
}

function adicionar(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) itemExistente.quantidade += 1;
    else carrinho.push({ nome, preco, quantidade: 1 });
    atualizarCarrinho();
    mostrarToastCarrinho(nome);
}

function mostrarToastCarrinho(nomeProduto) {
    const toast = document.getElementById('toast-carrinho');
    const texto = document.getElementById('toast-carrinho-texto');
    if (!toast || !texto) return;

    texto.innerText = nomeProduto;
    toast.classList.add('show');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

function mudarQtdCarrinho(index, valor) {
    carrinho[index].quantidade += valor;
    if (carrinho[index].quantidade <= 0) carrinho.splice(index, 1);
    atualizarCarrinho();
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById('itens-lista');
    const totalDoc = document.getElementById('valor-total');
    const count = document.getElementById('cart-count');
    let totalGeral = 0;
    let totalItens = 0;

    lista.innerHTML = carrinho.map((item, index) => {
        const subtotal = item.preco * item.quantidade;
        totalGeral += subtotal;
        totalItens += item.quantidade;
        return `
            <div style="display:flex; flex-direction:column; margin-bottom:10px; background:#1a1a1a; padding:10px; border-radius:8px; border-left: 4px solid #e67e22;">
                <div style="display:flex; justify-content:space-between; gap:10px;">
                    <span style="font-size:0.9rem; font-weight:bold;">${item.nome}</span>
                    <span style="color:#e67e22; font-weight:bold;">${subtotal.toFixed(2)}EUR</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                    <div style="display:flex; align-items:center; gap:12px; background:#333; padding:2px 8px; border-radius:5px;">
                        <button onclick="mudarQtdCarrinho(${index}, -1)" style="background:none; border:none; color:#ffcc00; cursor:pointer;">-</button>
                        <span>${item.quantidade}</span>
                        <button onclick="mudarQtdCarrinho(${index}, 1)" style="background:none; border:none; color:#ffcc00; cursor:pointer;">+</button>
                    </div>
                    <button onclick="remover(${index})" style="background:none; border:none; color:#ff4444; cursor:pointer;">Apagar</button>
                </div>
            </div>`;
    }).join('');

    const checkSaco = document.getElementById('check-saco');
    if (checkSaco && checkSaco.checked) totalGeral += 0.20;

    totalDoc.innerText = totalGeral.toFixed(2) + "EUR";
    if (count) {
        count.innerText = totalItens;
        count.style.display = totalItens > 0 ? 'flex' : 'none';
    }
}

function atualizarTotalComSaco() {
    atualizarCarrinho();
}

function gerarHorarios() {
    const select = document.getElementById('hora-pedido');
    if (!select) return;
    let h = "";
    for (let hora = 11; hora <= 13; hora++) {
        for (let min = 0; min < 60; min += 20) {
            if (hora === 13 && min > 40) break;
            const f = `${hora}:${min === 0 ? '00' : min}`;
            h += `<option value="${f}">${f}</option>`;
        }
    }
    for (let hora = 18; hora <= 20; hora++) {
        for (let min = 0; min < 60; min += 20) {
            if (hora === 20 && min > 40) break;
            const f = `${hora}:${min === 0 ? '00' : min}`;
            h += `<option value="${f}">${f}</option>`;
        }
    }
    select.innerHTML = h;
}

function finalizarPedido() {
    if (carrinho.length === 0) return alert("O seu carrinho esta vazio!");

    const nome = document.getElementById('cliente-nome').value;
    const tel = document.getElementById('cliente-tel').value;
    const email = document.getElementById('cliente-email').value;

    if (!nome || !tel) {
        alert("Por favor, preencha os seus dados na aba '2. DADOS'.");
        mudarAba('dados');
        return;
    }

    const horaLev = document.getElementById('hora-pedido').value;
    const pag = document.getElementById('metodo-pagamento').value;
    const querSaco = document.getElementById('check-saco').checked;
    const totalTexto = document.getElementById('valor-total').innerText;

    if (typeof db !== 'undefined') {
        const pedidoAdmin = {
            cliente: nome,
            telefone: tel,
            email: email || "Nao fornecido",
            itens: carrinho,
            total: totalTexto,
            hora_levantamento: horaLev,
            pagamento: pag,
            saco: querSaco ? "Sim" : "Nao",
            data: new Date().toLocaleString()
        };
        db.ref('pedidos').push(pedidoAdmin);
    }

    let texto = `*NOVO PEDIDO - O BOM SABOR*%0A*CLIENTE:* ${nome}%0A*TELEMOVEL:* ${tel}%0A*EMAIL:* ${email || "N/A"}%0A%0A*ITENS:*%0A`;
    carrinho.forEach(i => {
        texto += `${i.quantidade}x ${i.nome}: ${(i.preco * i.quantidade).toFixed(2)}EUR%0A`;
    });
    if (querSaco) texto += `1x Saco Plastico: 0.20EUR%0A`;

    texto += `%0A*TOTAL:* ${totalTexto}%0A*LEVANTAMENTO:* ${horaLev}%0A*PAGAMENTO:* ${pag}`;

    window.open(`https://wa.me/351912345678?text=${texto}`, '_blank');
}

function verificarHorario() {
    const agora = new Date();
    const tempo = agora.getHours() * 60 + agora.getMinutes();
    const statusDiv = document.getElementById('status-loja');
    if (!statusDiv) return;
    const aberto = (tempo >= 660 && tempo <= 825) || (tempo >= 1125 && tempo <= 1240);
    statusDiv.innerHTML = aberto ? '<span class="neon-verde">● ABERTO</span>' : '<span class="neon-vermelho">● FECHADO</span>';
}

document.addEventListener('click', (event) => {
    const modalMenu = document.getElementById('modal-menu');
    if (event.target === modalMenu) fecharMenu();

    const modalPizza = document.getElementById('modal-detalhe-pizza');
    if (event.target === modalPizza) fecharOpcoes();

    const modalGrelhados = document.getElementById('modal-grelhados');
    if (event.target === modalGrelhados) fecharModalGrelhados();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fecharMenu();
        fecharOpcoes();
        fecharModalGrelhados();
    }
});

setInterval(verificarHorario, 60000);
