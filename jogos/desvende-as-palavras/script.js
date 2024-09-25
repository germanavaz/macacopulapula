function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();

    // Pega o ID da imagem arrastada
    var imageId = event.dataTransfer.getData("text");
    var imageElement = document.getElementById(imageId);

    // Garante que o drop seja feito na caixa, usando closest('.box')
    var targetBox = event.target.closest('.box');  // Garante que esteja pegando a caixa correta
    if (!targetBox) {
        return;  // Se não for uma caixa, sai da função
    }

    var targetBoxId = targetBox.id;
    var correctBoxId = imageElement.getAttribute("data-target");

    // Verifica se a imagem está sendo solta na caixa correta
    if (targetBoxId === correctBoxId) {
        if (targetBox.childNodes.length === 0 || targetBox.children.length === 0) {  // Garante que a caixa esteja vazia

            // Remove o texto da caixa e coloca a imagem
            targetBox.innerHTML = '';
            targetBox.appendChild(imageElement);
            
            // Adiciona a classe "correct" para aplicar o estilo de borda verde
            targetBox.classList.add("correct");

            // Exibe a mensagem de sucesso
            document.getElementById("message").textContent = "Correto!";
            
            // Verifica se o jogador acertou todas as imagens
            verificarVitoria();
        }
    } else {
        document.getElementById("message").textContent = "Tente novamente!";
    }
}

// Função para verificar se todas as imagens estão nas caixas corretas
function verificarVitoria() {
    var totalCaixas = 5;
    var caixasCorretas = document.querySelectorAll('.box.correct').length;

    if (caixasCorretas === totalCaixas) {
        // Exibe a mensagem de parabéns e os botões
        document.getElementById("congratulations").style.display = "block";
    }
}

// Função para recarregar a página e começar de novo
function jogarNovamente() {
    window.location.reload();
}

// Função para voltar a outra página (pode ser personalizada com uma URL específica)
function voltar() {
    window.location.href = "/index.html";  // Altere para a página desejada
}
