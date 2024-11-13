const participants = [
    "Marcos", "Andressa", "Victor", "Ana", "Lara", "Helbert", "Tereza", "Lucas", "Matheus", 
    "Phelippe", "André", "Matheus", "André", "Tascyla", "Anthony", "Rainner", "Lorrayne", "Walisson", 
    "Renam", "Júlia", "Ronaldo", "Lorena", "Juninho", "Tássila"
];

let drawnNames = JSON.parse(localStorage.getItem('drawnNames')) || []; // Lista de nomes já sorteados
let drawnName = localStorage.getItem('drawnName'); // Nome sorteado atualmente

// Se um nome foi sorteado antes, mostra o resultado
if (drawnName) {
    document.getElementById('result').textContent = `Você tirou: ${drawnName}`;
    document.getElementById('draw-button').disabled = true;  // Desativa o botão de sorteio
    document.getElementById('email-button').classList.remove('hidden');
    document.getElementById('view-again-button').classList.remove('hidden');
    document.getElementById('reset-button').classList.remove('hidden');
}

document.getElementById('draw-button').addEventListener('click', function() {
    if (drawnNames.length === participants.length) {
        alert("Todos os nomes já foram sorteados!");
        return;
    }

    let randomIndex;
    
    do {
        randomIndex = Math.floor(Math.random() * participants.length);
        drawnName = participants[randomIndex];
    } while (drawnNames.includes(drawnName)); // Impede sorteio de nome repetido

    drawnNames.push(drawnName);
    localStorage.setItem('drawnName', drawnName);  // Armazena o nome sorteado
    localStorage.setItem('drawnNames', JSON.stringify(drawnNames));  // Armazena a lista de nomes sorteados

    // Atualiza a interface
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Você tirou: ${drawnName}`;
    resultElement.classList.remove('hidden');

    const emailButton = document.getElementById('email-button');
    emailButton.classList.remove('hidden');

    const viewAgainButton = document.getElementById('view-again-button');
    viewAgainButton.classList.remove('hidden');

    // Desativa o botão de sorteio após o nome ser sorteado
    const drawButton = document.getElementById('draw-button');
    drawButton.disabled = true;

    setTimeout(() => {
        resultElement.classList.add('hidden');
    }, 3000); // O nome desaparece após 3 segundos
});

document.getElementById('email-button').addEventListener('click', function() {
    const emailSubject = "Amigo Oculto - Nome Sorteado";
    const emailBody = `Você tirou: ${drawnName} no sorteio de amigo oculto.`;
    const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
});

document.getElementById('view-again-button').addEventListener('click', function() {
    const resultElement = document.getElementById('result');
    resultElement.textContent = `Você tirou: ${drawnName}`;
    resultElement.classList.remove('hidden');

    setTimeout(() => {
        resultElement.classList.add('hidden');
    }, 3000); // O nome desaparece após 3 segundos
});

// Adicionando o comportamento do botão Resetar Sorteio
document.getElementById('reset-button').addEventListener('click', function() {
    // Limpar o localStorage
    localStorage.removeItem('drawnName');
    localStorage.removeItem('drawnNames');

    // Resetar as variáveis
    drawnNames = [];
    drawnName = "";

    // Atualizar a interface
    document.getElementById('result').textContent = "";
    document.getElementById('result').classList.add('hidden');
    document.getElementById('draw-button').disabled = false;
    document.getElementById('draw-button').style.backgroundColor = "#4caf50"; // Reverter a cor do botão
    document.getElementById('email-button').classList.add('hidden');
    document.getElementById('view-again-button').classList.add('hidden');
    document.getElementById('reset-button').classList.add('hidden'); // Ocultar o botão de reset
});
