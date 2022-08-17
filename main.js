let seuVotoPara = document.querySelector('.superior-esquerda .voto span');
let cargo = document.querySelector('.superior-esquerda .cargo span');
let descricao = document.querySelector('.superior-esquerda .info');
let aviso = document.querySelector('.inferior');
let lateral = document.querySelector('.superior-direita');
let numeros = document.querySelector('.superior-esquerda .numeros');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function iniciarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += `<div class="numero pisca"></div>`;
        } else {
            numeroHtml += `<div class="numero"></div>`;
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;

        let fotosHtml = '';

        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHtml += `
                <div class="imagem small">
                    <img src="img/${candidato.fotos[i].url}">
                    ${candidato.fotos[i].legenda}
                </div>
            `;
            } else {
                fotosHtml += `
                <div class="imagem">
                    <img src="img/${candidato.fotos[i].url}">
                    ${candidato.fotos[i].legenda}
                </div>
            `;
            }

        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso-grande pisca">VOTO NULO</div>`;
    }
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;
        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }

    }
}

function branco() {
    numero = '';
    votoBranco = true;
    lateral.innerHTML = '';
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = ``;
    descricao.innerHTML = `<div class="aviso-grande pisca">VOTO EM BRANCO</div>`;
}

function corrige() {
    iniciarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBranco) {
        votoConfirmado = true;
        seuVotoPara.style.display = 'none';
        cargo.innerHTML = '';
        aviso.style.display = 'none';
        lateral.innerHTML = '';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso-grande pisca">CONFIRMANDO...</div>`;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;

        seuVotoPara.style.display = 'none';
        cargo.innerHTML = '';
        aviso.style.display = 'none';
        lateral.innerHTML = '';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso-grande pisca">CONFIRMADO...</div>`;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            iniciarEtapa();
        } else {
            lateral.style.display = 'none';
            document.querySelector('.tela').innerHTML = `<div class="aviso-gigante pisca">FIM</div>`;
            console.log(votos);
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    }
}

iniciarEtapa()