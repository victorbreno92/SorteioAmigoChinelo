const participants = [
    "Marcos", "Andressa", "Victor", "Ana", "Lara", "Helbert", "Tereza", "Lucas", "Matheus", 
    "Phelippe", "André", "Matheus", "André", "Tascyla", "Anthony", "Rainner", "Lorrayne", "Walisson", 
    "Renam", "Júlia", "Ronaldo", "Lorena", "Juninho" ,"Tássila"
];

let drawnNames = [];
let drawnName = "";

document.getElementById('draw-button').addEventListener('click', function() {
    if (drawnNames.length === participants.length) {
        alert("Todos os nomes já foram sorteados!");
        return;
    }

    let randomIndex;
    
    do {
        randomIndex = Math.floor(Math.random() * participants.length);
        drawnName = participants[randomIndex];
    } while (drawnNames.includes(drawnName));

    drawnNames.push(drawnName);

    const resultElement = document.getElementById('result');
    resultElement.textContent = `Você tirou: ${drawnName}`;
    resultElement.classList.remove('hidden');

    const emailButton = document.getElementById('email-button');
    emailButton.classList.remove('hidden');

    const viewAgainButton = document.getElementById('view-again-button');
    viewAgainButton.classList.remove('hidden');

    // Desativa o botão de sorteio após sortear um nome
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

    // Mantém o nome visível por 3 segundos ao clicar em "Visualizar Nome Novamente"
    setTimeout(() => {
        resultElement.classList.add('hidden');
    }, 3000);
});
