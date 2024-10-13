/**
 * Método chamado para iniciar o jogo. 
 */
async function iniciarRodada()
{

	// Se a rodada atual não foi iniciada ainda, 
	if(window.instancia.situacaoRodadaAtual == "NaoIniciado")
	{
		mostrarMensagem("Iniciando rodada nº "+(window.instancia.quantidadeRodadas + 1)+"!")

		window.instancia.respostasDadas = [];

		// Altera a situação da rodada para "IniciandoRodada"
		window.instancia.situacaoRodadaAtual = "IniciandoRodada";

		// Gera uma sequência.
		gerarSequencia();

		// Pisca os botões do genius
		await piscarBotoesGenius();

		// Altera a situação da rodada para "AguardandoResposta"
		window.instancia.situacaoRodadaAtual = "AguardandoResposta";
		mostrarMensagem("Aguardando resposta...")
	}
}
/**
 * Método chamado para dizer que a rodada atual foi ganha.
 */
function avancarRodada()
{
	// Adiciona 1 à qtde de rodadas 
	window.instancia.quantidadeRodadas += 1;

	mostrarMensagem("Você ganhou! Estamos indo para a rodada nº "+(window.instancia.quantidadeRodadas + 1)+"!.<br>Inicie a próxima rodada quando quiser.")


	
	// Deixa a rodada pronta para jogar de novo
	window.instancia.situacaoRodadaAtual = "NaoIniciado";

}

function brilharBotao(cor)
{
	// Se o jogo permite a interação do usuário, 
	if(window.instancia.situacaoRodadaAtual == "AguardandoResposta")
	{
		// Pisca o controle referente ao item da sequencia, incluindo a classe "glowing"
		document.getElementsByClassName("genius-" + cor)[0].classList.add("glowing");
	}	
}
function apagarBotao(cor)
{
	// Se o jogo permite a interação do usuário, 
	if(window.instancia.situacaoRodadaAtual == "AguardandoResposta")
	{
		// Apaga o controle referente ao item da sequencia, retirando a classe "glowing"
		document.getElementsByClassName("genius-" + cor)[0].classList.remove("glowing");
	}	
}
function clicarCor(cor)
{
	// Se o jogo permite a interação do usuário, 
	if(window.instancia.situacaoRodadaAtual == "AguardandoResposta")
	{
		// Adiciona a cor atual às respostas dadas
		window.instancia.respostasDadas.push(cor);

		avaliarRespostas();
	}
}

/**
 * Método chamado para dizer que a rodada atual foi ganha.
 */
function reportarErro()
{
	let textoResposta = "";
	for(let resposta of window.instancia.sequenciasRodadaAtual){
		textoResposta += resposta + ",";
	}
	mostrarMensagem("Iiiiiiiiihhh, você errou. Estamos voltando do zero!<br> A resposta era: <br>"+ textoResposta + "<br> Seu recorde foi de "+window.instancia.quantidadeRodadas+" rodadas.")

	// Zera a quantidade de rodadas.
	window.instancia.quantidadeRodadas = 0;
	window.instancia.sequenciasRodadaAtual = [];
	
	// Deixa a rodada pronta para jogar de novo
	window.instancia.situacaoRodadaAtual = "NaoIniciado";

}
function avaliarRespostas()
{
	let itensSequencia = window.instancia.sequenciasRodadaAtual;
	let respostasDadas = window.instancia.respostasDadas;
	let indiceItemAvaliado = 0;
	for(indiceItemAvaliado; indiceItemAvaliado < respostasDadas.length; indiceItemAvaliado ++)
	{
		let respostaAtual = respostasDadas[indiceItemAvaliado];
		let itemSequenciaAtual = itensSequencia[indiceItemAvaliado];

		// Se o item atual é diferente do esperado
		if(respostaAtual != itemSequenciaAtual)
		{
			reportarErro();
			break;
		}
	}

	// se conseguiu chegar aqui e respondeu todas as sequencias, ganhou!
	if(indiceItemAvaliado == itensSequencia.length){
		avancarRodada();
	}

}

async function piscarBotoesGenius()
{
	let itensSequencia = window.instancia.sequenciasRodadaAtual;
	 
	// Para cada item da sequencia
	for(let itemSequencia of itensSequencia)
	{
		await new Promise((resolve)=>{setTimeout(()=>{
			resolve();
			}, 100);
		});
		// pisca o controle referente ao item da sequencia, incluindo a classe "glowing"
		document.getElementsByClassName("genius-" + itemSequencia)[0].classList.add("glowing");

		// deixa aceso por 500ms, e depois retira a classe de "glowing"

		await new Promise((resolve)=>{setTimeout(()=>{
				document.getElementsByClassName("genius-" + itemSequencia)[0].classList.remove("glowing");
				resolve();

			}, 500);
		});
	}
}

function mostrarRespostas()
{
	let textoResposta = "";
	for(let resposta of window.instancia.sequenciasRodadaAtual){
		textoResposta += resposta + ",";
	}

	mostrarMensagem(textoResposta);
}
function gerarSequencia()
{

	// Recebe a sequência anterior
	let sequencia = window.instancia.sequenciasRodadaAtual;

	let coresPossiveis  = ["green", "red", "yellow", "blue"];
	
	// Gera um numero aleatorio de 0 a 3
	let numeroSelecionado = gerarAleatorioEntre0E3();

	// Seleciona a cor das cores possíveis pelo índice
	let corSelecionada = coresPossiveis[numeroSelecionado];

	// Adiciona a cor selecionada à sequencia
	sequencia.push(corSelecionada);

	// Salva a nova sequencia
	window.instancia.sequenciasRodadaAtual = sequencia;
}
function mostrarMensagem(mensagem){
	document.getElementById("mensagem").innerHTML = mensagem;
}
function gerarAleatorioEntre0E3(){
	let aleatorio = parseInt(Math.random() * 100)
	console.log(aleatorio);
	return (aleatorio % 4);
}

/**
 * Instância com os parâmetros do jogo.
 * Mantém histórico de quantidade de rodadas passadas e sequências por rodadas.
 */
window.instancia = {
	quantidadeRodadas : 0, 
	sequenciasRodadaAtual : [],
	respostasDadas : [],
	situacaoRodadaAtual : "NaoIniciado"
};
