function gerarSequencia()
{
	let campoSequencia = document.getElementById('sequencia');
	let numeroAleatorio = (gerarAleatorioEntre1E4());
	campoSequencia.value = numeroAleatorio;
	campoSequencia.classList = "borda-"+numeroAleatorio;
	
}

function validarSequencia(){
	let sequencia = document.getElementById('sequencia').value;

	let valorEntrada = document.getElementById('entrada').value;


	if(valorEntrada != sequencia){
		document.getElementById('resultadoValidacao').value = "Estão diferentes!"
	}		
	else{
		document.getElementById('resultadoValidacao').value = "Estão iguais!"

	}
}


function gerarAleatorioEntre1E4(){
	let aleatorio = Math.floor(Math.random() * 100) ;
	return (aleatorio % 4) + 1;
}