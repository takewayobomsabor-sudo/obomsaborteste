const diasSemana = ["DOMINGO", "SEGUNDA-FEIRA", "TERÇA-FEIRA", "QUARTA-FEIRA", "QUINTA-FEIRA", "SEXTA-FEIRA", "SÁBADO"];
const hojeNome = diasSemana[new Date().getDay()];

// Variável global para guardar os dados vindos do Firebase
window.dadosEstoque = {};

// 1. FUNÇÃO GERAR ID PADRONIZADA
function gerarId(nome) {
    return nome.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9]/g, '_')     
        .replace(/_+/g, '_')            
        .replace(/^_|_$/g, '');         
}

const menu = [
    // PRATOS DO DIA
    { nome: "Petinga frita c/ arroz de tomate", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEGUNDA-FEIRA" },
    { nome: "Bacalhau à Brás", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEGUNDA-FEIRA" },
    { nome: "Jardineira de vitela", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEGUNDA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "SEGUNDA-FEIRA" },

    { nome: "Arroz de Marisco", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "TERÇA-FEIRA" },
    { nome: "Bifinhos de Lombo", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "TERÇA-FEIRA" },
    { nome: "Carne de Porco á Alentejana", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "TERÇA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "TERÇA-FEIRA" },

    { nome: "Arroz de pato", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUARTA-FEIRA" },
    { nome: "Entrecosto c/Favas", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUARTA-FEIRA" },
    { nome: "Solha Frita", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUARTA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "QUARTA-FEIRA" },

    { nome: "Feijoada de Lingueirão", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUINTA-FEIRA" },
    { nome: "Bacalhau c/Natas", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUINTA-FEIRA" },
    { nome: "Panados de frango", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "QUINTA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "QUINTA-FEIRA" },

    { nome: "Bifinhos c/Natas", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEXTA-FEIRA" },
    { nome: "Lasanha", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEXTA-FEIRA" },
    { nome: "Choco Frito", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SEXTA-FEIRA" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "SEXTA-FEIRA" },

    { nome: "Arroz de Polvo", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SÁBADO" },
    { nome: "Esparguete á bolonhesa", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SÁBADO" },
    { nome: "Filetes de Linguado", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "SÁBADO" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "SÁBADO" },

    { nome: "Bacalhau á casa", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "DOMINGO" },
    { nome: "Feijoada de choco", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "DOMINGO" },
    { nome: "Massa c/frango", meia: 9.00, inteira: 12.00, cat: "Dia", dia: "DOMINGO" },
    { nome: "Sopa de Legumes", preco: 2.00, cat: "Dia", dia: "DOMINGO" },

    // PIZZAS
    { nome: "Pizza Portuguesa", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela, chourição e ovo" },
    { nome: "Pizza Camponesa", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela, bacon e cogumelos" },
    { nome: "Pizza Tropical", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela, ananás e fiambre" },
    { nome: "Pizza do Mar", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela, atum e camarão" },
    { nome: "Pizza de Frango", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Frango, milho e mozarela" },
    { nome: "Pizza Vegetariana", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Legumes variados e mozarela" },
    { nome: "Pizza Pepperoni", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Tomate, mozarela e pepperoni" },
    { nome: "Pizza 3 Ingredientes", cat: "Pizzas", temTamanhos: true, precos: { mini: 7.00, media: 14.00, familiar: 24.00 }, desc: "Escolha 3 ingredientes à sua medida" },

    // GRELHADOS
    { nome: "Frango (Chicken)", preco: 9.00, meia: 5.00, cat: "Grelhados", temOpcoes: true }, 
    { nome: "Entrecosto de Porco", preco: 10.00, meia: 5.00, cat: "Grelhados", temOpcoes: true },
    { nome: "Febras", preco: 9.00, meia: 5.00, cat: "Grelhados", temOpcoes: true },
    { nome: "Bife frango grelhado", preco: 9.00, meia: 5.00, cat: "Grelhados", temOpcoes: true },
    { nome: "Entremeada de Porco", preco: 11.00, meia: 5.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Salsichas", preco: 11.00, meia: 5.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Secretos de Porco Ibérico", preco: 14.00, meia: 7.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Picanha", preco: 14.00, meia: 7.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Dourada Escalada", preco: 12.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Robalo escalado c/ batatas assadas", preco: 14.50, cat: "Grelhados", temOpcoes: true },
    { nome: "Sardinhas", preco: 14.50, cat: "Grelhados", temOpcoes: true },
    
    // ACOMPANHAMENTOS
    { nome: "Dose de Batata Frita", preco: 3.00, cat: "Acompanhamentos" },
    { nome: "Meia Dose de Batata Frita", preco: 1.50, cat: "Acompanhamentos" },
    { nome: "Dose de Arroz", preco: 2.50, cat: "Acompanhamentos" },
    { nome: "Meia Dose de Arroz", preco: 1.25, cat: "Acompanhamentos" },
    { nome: "Salada Mista", preco: 3.00, cat: "Acompanhamentos" },

    // PETISCOS
    { nome: "Caracóis 1LT", preco: 12.00, cat: "Petiscos" },
    { nome: "Pastéis de Bacalhau (un)", preco: 1.20, cat: "Petiscos" },
    { nome: "Rissóis de Leitão (un)", preco: 1.50, cat: "Petiscos" },
    { nome: "Rissóis de Carne (un)", preco: 1.50, cat: "Petiscos" },
    { nome: "Rissóis de Camarão (un)", preco: 1.50, cat: "Petiscos" },

    // BEBIDAS
    { nome: "Coca Cola", preco: 1.50, cat: "Bebidas" },
    { nome: "Nectar", preco: 1.25, cat: "Bebidas" },
    { nome: "Fanta Laranja", preco: 1.50, cat: "Bebidas" },
    { nome: "Sprite", preco: 1.50, cat: "Bebidas" },
    { nome: "Ice Tea", preco: 1.50, cat: "Bebidas" },
    { nome: "Cerveja Sagres", preco: 1.20, cat: "Bebidas" },
    { nome: "Casal Garcia", preco: 6.00, cat: "Bebidas" },

    // SOBREMESAS
    { nome: "Arroz Doce", preco: 1.50, cat: "Sobremesas" }
];

let carrinho = [];
let pizzaSelecionada = null;
let quantidadePizza = 1;
let grelhadoSelecionado = null;

const acompanhamentosGrelhados = [
    { grupo: "Batata Frita", itens: [{ n: "Dose Batata", p: 3.00 }, { n: "1/2 Batata", p: 1.50 }] },
    { grupo: "Arroz", itens: [{ n: "Dose Arroz", p: 2.50 }, { n: "1/2 Arroz", p: 1.25 }] },
    { grupo: "Salada", itens: [{ n: "Salada Mista", p: 3.00 }] }
];

// OUVINTE FIREBASE
if (typeof db !== 'undefined') {
    db.ref("estoque").on("value", (snap) => {
        window.dadosEstoque = snap.val() || {};
        const modal = document.getElementById('modal-menu');
        if (modal && modal.style.display === 'block') {
            const catAtiva = document.querySelector('.cat-item.active');
            if (catAtiva) {
                if (catAtiva.innerText.includes('Hoje')) filtrar('Dia');
                else if (catAtiva.innerText.includes('Grelhados')) filtrar('Grelhados');
                else if (catAtiva.innerText.includes('Pizzas')) filtrar('Pizzas');
                else if (catAtiva.innerText.includes('Petiscos')) filtrar('Petiscos');
                else if (catAtiva.innerText.includes('Doces')) filtrar('Sobremesas');
                else if (catAtiva.innerText.includes('Extras')) filtrar('Acompanhamentos');
                else if (catAtiva.innerText.includes('Bebidas')) filtrar('Bebidas');
            }
        }
    });
}

window.onload = () => {
    const btnDinamico = document.getElementById('btn-menu-dinamico');
    if(btnDinamico) btnDinamico.innerText = `VER MENU ${hojeNome} E PEDIR`;
    gerarHorarios();
    verificarHorario();
};

function abrirMenu() {
    const modal = document.getElementById('modal-menu');
    if(modal) {
        modal.style.display = 'block';
        filtrar('Dia');
    }
}

function fecharMenu() {
    document.getElementById('modal-menu').style.display = 'none';
}

function filtrar(categoria) {
    const lista = document.getElementById('lista-pratos');
    const todosItensCat = document.querySelectorAll('.cat-item');
    
    todosItensCat.forEach(item => item.classList.remove('active'));
    
    todosItensCat.forEach(item => {
        const texto = item.innerText;
        if((texto.includes('Hoje') && categoria === 'Dia') || 
           (texto.includes('Doces') && categoria === 'Sobremesas') || 
           (texto.includes('Extras') && categoria === 'Acompanhamentos') || 
           texto.includes(categoria)) {
            item.classList.add('active');
        }
    });

    let itens = [];
    if (categoria === 'Dia') {
        itens = menu.filter(p => p.cat === 'Dia' && p.dia === hojeNome);
        document.getElementById('titulo-modal').innerText = `MENU DE HOJE (${hojeNome})`;
    } else {
        itens = menu.filter(p => p.cat === categoria);
        document.getElementById('titulo-modal').innerText = categoria === 'Acompanhamentos' ? 'EXTRAS' : categoria.toUpperCase();
    }

    lista.innerHTML = itens.map(p => {
        const meuId = gerarId(p.nome);
        const dadosFB = window.dadosEstoque[meuId] || {};
        let nomeExibir = dadosFB.nome_custom || p.nome;
        let valorMeia = (dadosFB.preco_meia !== undefined && dadosFB.preco_meia !== "") ? parseFloat(dadosFB.preco_meia) : p.meia;
        let valorInteira = (dadosFB.preco !== undefined && dadosFB.preco !== "") ? parseFloat(dadosFB.preco) : (p.inteira || p.preco);

        let botoes = '';
        if (p.cat === "Pizzas") {
            botoes = `<button class="btn-opcao" id="btn-${meuId}" onclick="abrirOpcoesPizza('${p.nome}')">Escolher</button>`;
        } else if (p.cat === "Grelhados") {
            botoes = `<button class="btn-opcao" id="btn-${meuId}" onclick="abrirOpcoesGrelhado('${p.nome}')">Escolher</button>`;
        } else if (p.meia && p.inteira) {
            botoes = `
                <button class="btn-opcao" id="btn-meia-${meuId}" onclick="adicionar('${nomeExibir} (1/2)', ${valorMeia})">
                    1/2 (<span id="preco-${meuId}_meia">${valorMeia.toFixed(2)}</span>€)
                </button>
                <button class="btn-opcao" id="btn-inteira-${meuId}" onclick="adicionar('${nomeExibir} (Dose)', ${valorInteira})">
                    Dose (<span id="preco-${meuId}">${valorInteira.toFixed(2)}</span>€)
                </button>`;
        } else {
            botoes = `<button class="btn-opcao" id="btn-${meuId}" onclick="adicionar('${nomeExibir}', ${valorInteira})">
                Add (<span id="preco-${meuId}">${valorInteira.toFixed(2)}</span>€)
            </button>`;
        }

        const estiloEsgotado = dadosFB.esgotado ? 'style="opacity:0.4; filter:grayscale(1); pointer-events:none;"' : '';
        return `
            <div class="caixa-item" id="item-${meuId}" ${estiloEsgotado}>
                <div class="item-info"><strong id="nome-${meuId}">${nomeExibir}</strong>${p.desc ? '<br><small>'+p.desc+'</small>' : ''}</div>
                <div class="item-actions" style="display:flex; gap:5px;">${botoes}</div>
            </div>`;
    }).join('');
}

// GRELHADOS, PIZZAS E CARRINHO
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
            <div style="margin-top:10px; font-weight:bold; color:var(--accent); text-align:left;">TAMANHO DA DOSE</div>
            <div class="caixa-item" style="padding:10px; margin-bottom:5px; border: 1px solid #444;">
                <label style="display:flex; justify-content:space-between; width:100%; cursor:pointer;">
                    <span>Dose Inteira (${pInteira.toFixed(2)}€)</span>
                    <input type="radio" name="tipo_dose" value="Dose" data-preco="${pInteira}" checked>
                </label>
            </div>
            <div class="caixa-item" style="padding:10px; margin-bottom:15px; border: 1px solid #444;">
                <label style="display:flex; justify-content:space-between; width:100%; cursor:pointer;">
                    <span>1/2 Dose (${pMeia.toFixed(2)}€)</span>
                    <input type="radio" name="tipo_dose" value="1/2" data-preco="${pMeia}">
                </label>
            </div>
            <hr style="border:0; border-top:1px solid #333; margin:15px 0;">`;
    }

    html += `<div style="text-align:left; font-size:0.8rem; color:#888; margin-bottom:5px;">ACOMPANHAMENTOS (Opcional):</div>`;
    acompanhamentosGrelhados.forEach((grupo) => {
        html += `<div style="margin-top:10px; font-weight:bold; color:#e67e22; text-align:left;">${grupo.grupo}</div>`;
        grupo.itens.forEach((it) => {
            html += `
                <div class="caixa-item" style="padding:10px; margin-bottom:5px;">
                    <span>${it.n} (+${it.p.toFixed(2)}€)</span>
                    <input type="checkbox" class="check-acompanhamento" data-nome="${it.n}" data-preco="${it.p}">
                </div>`;
        });
    });
    document.getElementById('lista-acompanhamentos').innerHTML = html;
    document.getElementById('modal-grelhados').style.display = 'flex';
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
    if(checks.length > 0) {
        let nomesAcomp = [];
        checks.forEach(c => {
            nomesAcomp.push(c.getAttribute('data-nome'));
            precoFinal += parseFloat(c.getAttribute('data-preco'));
        });
        nomeFinal += ` + ${nomesAcomp.join(', ')}`;
    }
    if(obs) nomeFinal += ` [Obs: ${obs}]`;
    adicionar(nomeFinal, precoFinal);
    fecharModalGrelhados();
}

function fecharModalGrelhados() { document.getElementById('modal-grelhados').style.display = 'none'; }
function abrirOpcoesPizza(nome) {
    pizzaSelecionada = menu.find(p => p.nome === nome);
    quantidadePizza = 1;
    document.getElementById('detalhe-nome-pizza').innerText = pizzaSelecionada.nome;
    document.getElementById('qtd-pizza').innerText = quantidadePizza;
    document.getElementById('obs-pizza').value = "";
    document.getElementById('modal-detalhe-pizza').style.display = 'flex';
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
    document.getElementById('preco-total-pizza').innerText = (precoUnitario * quantidadePizza).toFixed(2) + "€";
}
function confirmarPizza() {
    const tamanho = document.getElementById('tamanho-pizza').value;
    const obs = document.getElementById('obs-pizza').value;
    const precoUnitario = pizzaSelecionada.precos[tamanho];
    const nomeFormatado = `${pizzaSelecionada.nome} (${tamanho.toUpperCase()})${obs ? ' [Obs: ' + obs + ']' : ''}`;
    for(let i=0; i<quantidadePizza; i++) { adicionar(nomeFormatado, precoUnitario); }
    document.getElementById('modal-detalhe-pizza').style.display = 'none';
}
function fecharOpcoes() { document.getElementById('modal-detalhe-pizza').style.display = 'none'; }

function adicionar(nome, preco) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) { itemExistente.quantidade += 1; } 
    else { carrinho.push({ nome, preco, quantidade: 1 }); }
    atualizarCarrinho();
    document.getElementById('carrinho-lateral').classList.add('active');
}

function mudarQtdCarrinho(index, valor) {
    carrinho[index].quantidade += valor;
    if (carrinho[index].quantidade <= 0) { carrinho.splice(index, 1); }
    atualizarCarrinho();
}

// CORREÇÃO: Função atualizarCarrinho agora soma o Saco
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
                <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                    <span style="font-size:0.9rem; font-weight:bold; flex:1;">${item.nome}</span>
                    <span style="color:#e67e22; font-weight:bold; margin-left:10px;">${subtotal.toFixed(2)}€</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                    <div style="display:flex; align-items:center; gap:12px; background:#333; padding:2px 8px; border-radius:5px;">
                        <button onclick="mudarQtdCarrinho(${index}, -1)" style="background:none; border:none; color:#ffcc00; font-weight:bold; cursor:pointer;">-</button>
                        <span>${item.quantidade}</span>
                        <button onclick="mudarQtdCarrinho(${index}, 1)" style="background:none; border:none; color:#ffcc00; font-weight:bold; cursor:pointer;">+</button>
                    </div>
                    <i class="fa-solid fa-trash" style="color:#ff4444;" onclick="remover(${index})"></i>
                </div>
            </div>`;
    }).join('');

    // SOMA O SACO SE ESTIVER MARCADO
    const checkSaco = document.getElementById('check-saco');
    if (checkSaco && checkSaco.checked) {
        totalGeral += 0.20;
    }

    totalDoc.innerText = totalGeral.toFixed(2) + "€";
    if(count) { count.innerText = totalItens; count.style.display = totalItens > 0 ? 'flex' : 'none'; }
}

// Função chamada pelo HTML quando clicas na checkbox do saco
function atualizarTotalComSaco() {
    atualizarCarrinho();
}

function remover(index) { carrinho.splice(index, 1); atualizarCarrinho(); }
function toggleCart() { document.getElementById('carrinho-lateral').classList.toggle('active'); }

function gerarHorarios() {
    const select = document.getElementById('hora-pedido');
    if(!select) return;
    let h = "";
    for (let hora = 11; hora <= 13; hora++) {
        for (let min = 0; min < 60; min += 20) {
            if (hora === 13 && min > 40) break;
            let f = `${hora}:${min === 0 ? '00' : min}`;
            h += `<option value="${f}">${f}</option>`;
        }
    }
    for (let hora = 18; hora <= 20; hora++) {
        for (let min = 0; min < 60; min += 20) {
            if (hora === 20 && min > 40) break;
            let f = `${hora}:${min === 0 ? '00' : min}`;
            h += `<option value="${f}">${f}</option>`;
        }
    }
    select.innerHTML = h;
}

// CORREÇÃO: Função finalizarPedido agora inclui o saco no Firebase e no WhatsApp
function finalizarPedido() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");
    const nome = document.getElementById('cliente-nome').value;
    const tel = document.getElementById('cliente-tel').value;
    const horaLev = document.getElementById('hora-pedido').value;
    const pag = document.getElementById('metodo-pagamento').value;
    const querSaco = document.getElementById('check-saco').checked;

    if (!nome || !tel) return alert("Preencha Nome e Telemóvel!");

    // Cria uma cópia dos itens para o pedido
    let itensFinal = [...carrinho];
    if (querSaco) {
        itensFinal.push({ nome: "Saco Plástico", preco: 0.20, quantidade: 1 });
    }

    const pedidoAdmin = { 
        cliente: nome, 
        telefone: tel, 
        itens: itensFinal, 
        total: document.getElementById('valor-total').innerText, 
        hora_levantamento: horaLev, 
        pagamento: pag,
        saco: querSaco ? "Sim" : "Não"
    };

    db.ref('pedidos').push(pedidoAdmin);

    let texto = `*NOVO PEDIDO - O BOM SABOR*%0A*CLIENTE:* ${nome}%0A*PEDIDO:*%0A`;
    carrinho.forEach(i => { texto += `${i.quantidade}x ${i.nome}: ${(i.preco * i.quantidade).toFixed(2)}€%0A`; });
    if (querSaco) texto += `1x Saco Plástico: 0.20€%0A`;
    
    texto += `*TOTAL:* ${pedidoAdmin.total}%0A*LEVANTAMENTO:* ${horaLev}%0A*PAGAMENTO:* ${pag}`;
    window.open(`https://wa.me/351912345678?text=${texto}`, '_blank');
}

function verificarHorario() {
    const agora = new Date();
    // Obtém a hora e minutos atuais
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const tempoAtualEmMinutos = (hora * 60) + minutos;

    // Definição dos períodos em minutos (Hora * 60 + Minutos)
    const inicioAlmoco = (11 * 60) + 40; // 11:40
    const fimAlmoco    = (13 * 60) + 45; // 13:45
    
    const inicioJantar = (18 * 60) + 45; // 18:45
    const fimJantar    = (20 * 60) + 45; // 20:45

    const statusDiv = document.getElementById('status-loja');
    if(!statusDiv) return;

    // Lógica de Verificação
    let aberto = (tempoAtualEmMinutos >= inicioAlmoco && tempoAtualEmMinutos <= fimAlmoco) || 
                 (tempoAtualEmMinutos >= inicioJantar && tempoAtualEmMinutos <= fimJantar);

    if (aberto) {
        statusDiv.innerHTML = "● ABERTO";
        statusDiv.className = "neon-verde"; // Garante que usa o estilo verde
    } else {
        statusDiv.innerHTML = "○ FECHADO";
        statusDiv.className = "neon-vermelho"; // Garante que usa o estilo vermelho
    }
}

// Executa ao carregar e atualiza a cada 1 minuto
verificarHorario();
setInterval(verificarHorario, 60000);
