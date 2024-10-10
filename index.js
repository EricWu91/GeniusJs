function gerarSequencia()
{
	let campoSequencia = document.getElementById('sequencia');
	let resultado = document.getElementById('resultado');
	let numeroAleatorio = (gerarAleatorioEntre1E4());
	resultado.innerHTML = numeroAleatorio;
	resultado.classList = "borda-"+numeroAleatorio;
	
}

function gerarAleatorioEntre1E4(){
	let aleatorio = Math.floor(Math.random() * 100) ;
	return (aleatorio % 4) + 1;
}