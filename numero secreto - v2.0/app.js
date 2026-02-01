// aqui vamos colocar o titulo do jogo - jeito fácil
/// let titulo = document.querySelector('h1');
/// titulo.innerHTML = 'Jogo Mortal do Número Secreto';

//nessa linha vamos colocar a descrição do jogo - jeito fácil
/// let paragrafo = document.querySelector('p');
/// paragrafo.innerHTML = 'Tente adivinhar o número secreto entre 1 e 10!';


// gerar lista dos numeros secretos sorteados e o limite dela
let listaNumerosSorteados = [];
let numeroLimite = 100;

//gerar número secreto e guardar na lista de numeros sorteados
function gerarNumeroSecreto() {
     let numeroAleatorio = parseInt(Math.random() * numeroLimite) + 1; //número entre 1 e 100
     let quantidadeDeNumerosSorteados = listaNumerosSorteados.length;
     // se já sorteou todos os números possíveis, limpar a lista
     if (quantidadeDeNumerosSorteados == numeroLimite) {
        listaNumerosSorteados = [];
     }
     if (listaNumerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroSecreto();
     } else {
        listaNumerosSorteados.push(numeroAleatorio);
        console.log('Números sorteados até agora: ' + listaNumerosSorteados);
        return numeroAleatorio;
     }
}

// definir número secreto//
let numeroSecreto = gerarNumeroSecreto();
console.log('Número secreto é: ' + numeroSecreto); //aqui eu vejo o número secreto pelo console//
let tentativas = 1; //porque começa em 1//

// mudar os titulos - mais dinâmica - usando função
function textosDoJogo(tag, texto) {
    let titulo = document.querySelector(tag);
    titulo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

//limpar campo de input após o chute
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
// texto inicial do jogo
function textoInicialDoJogo() {
    textosDoJogo('h1', 'Jogo Mortal do Número Secreto');
    textosDoJogo('p', 'Tente adivinhar o número secreto entre 1 e 100!');
}
textoInicialDoJogo();

//verificar chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        textosDoJogo('h1', 'Que bom, você ficará vivo.');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativas}. Aproveite sua vida!`;
        textosDoJogo('h1', mensagemTentativas);
        textosDoJogo('p', '');
        //habilitando o botão de novo jogo - removendo o atributo disabled do html
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            textosDoJogo('h1', 'Errado, você pode morrer, cuidado!');
            textosDoJogo('p', 'O número secreto é menor que ' + chute + '.');
        } else {
            textosDoJogo('h1', 'Errado, você pode morrer, cuidado!');
            textosDoJogo('p', 'O número secreto é maior que ' + chute + '.');
        }   
        tentativas++;
    }
    limparCampo();
}
//colocando o botao de novo jogo para funcionar
function reiniciarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    console.log('Número secreto é: ' + numeroSecreto);
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
    textoInicialDoJogo();
}