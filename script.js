// Dados do jogo
let gameData = {
    currentLevel: 1,
    currentQuestion: 0,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    questions: [],
    levels: [
        { name: 'Básico SQL', questions: [] },
        { name: 'Médio SQL', questions: [] },
        { name: 'Tabela Verdade', questions: [] }
    ]
};

// Mensagens positivas
const positiveMessages = [
    "Excelente!",
    "Muito bem!",
    "Perfeito!",
    "Incrível!",
    "Fantástico!",
    "Brilhante!",
    "Parabéns!",
    "Ótimo trabalho!",
    "Você é demais!",
    "Continue assim!"
];

// Elementos DOM
const screens = {
    start: document.getElementById('start-screen'),
    game: document.getElementById('game-screen'),
    end: document.getElementById('end-screen')
};

const gameElements = {
    startBtn: document.getElementById('start-btn'),
    restartBtn: document.getElementById('restart-btn'),
    currentLevel: document.getElementById('current-level'),
    questionCounter: document.getElementById('question-counter'),
    progressFill: document.getElementById('progress-fill'),
    score: document.getElementById('score'),
    gameCharacter: document.getElementById('game-character'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    feedback: document.getElementById('feedback'),
    feedbackIcon: document.getElementById('feedback-icon'),
    feedbackMessage: document.getElementById('feedback-message'),
    positiveMessages: document.getElementById('positive-messages'),
    messageText: document.getElementById('message-text'),
    finalScore: document.getElementById('final-score'),
    finalCorrect: document.getElementById('final-correct'),
    finalAccuracy: document.getElementById('final-accuracy'),
    confettiCanvas: document.getElementById('confetti-canvas')
};

// Inicialização
document.addEventListener('DOMContentLoaded', async function() {
    await loadQuestions();
    setupEventListeners();
    initializeGame();
});

// Carregar perguntas dos arquivos JSON
async function loadQuestions() {
    try {
        const [basicSQL, mediumSQL, truthTable] = await Promise.all([
            fetch('questions_basic_sql.json').then(r => r.json()),
            fetch('questions_medium_sql.json').then(r => r.json()),
            fetch('questions_truth_table.json').then(r => r.json())
        ]);

        gameData.levels[0].questions = basicSQL;
        gameData.levels[1].questions = mediumSQL;
        gameData.levels[2].questions = truthTable;

        // Embaralhar perguntas
        gameData.levels.forEach(level => {
            level.questions = shuffleArray(level.questions);
        });

        console.log('Perguntas carregadas com sucesso!');
    } catch (error) {
        console.error('Erro ao carregar perguntas:', error);
        // Fallback com perguntas de exemplo
        loadFallbackQuestions();
    }
}

// Perguntas de fallback caso não consiga carregar os arquivos
function loadFallbackQuestions() {
    gameData.levels[0].questions = [
        {
            question: "Qual comando SQL é usado para recuperar dados?",
            options: ["UPDATE", "INSERT", "SELECT", "DELETE"],
            answer: "SELECT"
        }
    ];
    
    gameData.levels[1].questions = [
        {
            question: "O que é uma subconsulta em SQL?",
            options: ["Uma consulta dentro de outra consulta", "Uma consulta rápida", "Uma consulta simples", "Uma consulta externa"],
            answer: "Uma consulta dentro de outra consulta"
        }
    ];
    
    gameData.levels[2].questions = [
        {
            question: "Qual é o resultado de (VERDADEIRO AND FALSO)?",
            options: ["VERDADEIRO", "FALSO"],
            answer: "FALSO"
        }
    ];
}

// Configurar event listeners
function setupEventListeners() {
    gameElements.startBtn.addEventListener('click', startGame);
    gameElements.restartBtn.addEventListener('click', restartGame);
}

// Inicializar o jogo
function initializeGame() {
    showScreen('start');
    resetGameData();
}

// Resetar dados do jogo
function resetGameData() {
    gameData.currentLevel = 1;
    gameData.currentQuestion = 0;
    gameData.score = 0;
    gameData.correctAnswers = 0;
    gameData.totalQuestions = 0;
    
    // Reembaralhar perguntas
    gameData.levels.forEach(level => {
        level.questions = shuffleArray(level.questions);
    });
}

// Iniciar o jogo
function startGame() {
    showScreen('game');
    gameData.questions = gameData.levels[gameData.currentLevel - 1].questions;
    updateUI();
    showQuestion();
}

// Mostrar tela
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Atualizar interface
function updateUI() {
    const levelNames = ['Básico SQL', 'Médio SQL', 'Tabela Verdade'];
    gameElements.currentLevel.textContent = `Nível ${gameData.currentLevel}: ${levelNames[gameData.currentLevel - 1]}`;
    gameElements.questionCounter.textContent = `${gameData.currentQuestion + 1}/20`;
    gameElements.score.textContent = `Pontuação: ${gameData.score}`;
    
    // Atualizar barra de progresso
    const totalProgress = ((gameData.currentLevel - 1) * 20 + gameData.currentQuestion) / 60 * 100;
    gameElements.progressFill.style.width = `${totalProgress}%`;
    
    // Atualizar posição do personagem
    updateCharacterPosition();
}

// Atualizar posição do personagem
function updateCharacterPosition() {
    const progress = gameData.currentQuestion / 20;
    const position = progress * 80; // 80% é a largura máxima do caminho
    gameElements.gameCharacter.style.left = `${position}%`;
    
    // Atualizar segmentos do caminho
    const pathSegments = document.querySelectorAll('.path-segment');
    pathSegments.forEach((segment, index) => {
        segment.classList.remove('completed', 'current');
        if (index < gameData.currentLevel - 1) {
            segment.classList.add('completed');
        } else if (index === gameData.currentLevel - 1) {
            segment.classList.add('current');
        }
    });
}

// Mostrar pergunta
function showQuestion() {
    if (gameData.currentQuestion >= gameData.questions.length) {
        nextLevel();
        return;
    }
    
    const question = gameData.questions[gameData.currentQuestion];
    gameElements.questionText.textContent = question.question;
    
    // Limpar opções anteriores
    gameElements.optionsContainer.innerHTML = '';
    
    // Criar botões de opção
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(option, button));
        gameElements.optionsContainer.appendChild(button);
    });
}

// Selecionar resposta
function selectAnswer(selectedAnswer, buttonElement) {
    const question = gameData.questions[gameData.currentQuestion];
    const isCorrect = selectedAnswer === question.answer;
    
    // Desabilitar todos os botões
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.add('disabled'));
    
    // Marcar resposta correta e incorreta
    allButtons.forEach(btn => {
        if (btn.textContent === question.answer) {
            btn.classList.add('correct');
        } else if (btn === buttonElement && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // Atualizar pontuação
    if (isCorrect) {
        gameData.score += 10;
        gameData.correctAnswers++;
        showPositiveMessage();
        createConfetti();
    }
    
    gameData.totalQuestions++;
    
    // Mostrar feedback
    showFeedback(isCorrect);
    
    // Próxima pergunta após delay
    setTimeout(() => {
        hideFeedback();
        gameData.currentQuestion++;
        updateUI();
        showQuestion();
    }, 2000);
}

// Mostrar feedback
function showFeedback(isCorrect) {
    if (isCorrect) {
        gameElements.feedbackIcon.textContent = '✅';
        gameElements.feedbackMessage.textContent = 'Correto!';
    } else {
        gameElements.feedbackIcon.textContent = '❌';
        gameElements.feedbackMessage.textContent = 'Incorreto!';
    }
    
    gameElements.feedback.classList.remove('hidden');
}

// Esconder feedback
function hideFeedback() {
    gameElements.feedback.classList.add('hidden');
}

// Mostrar mensagem positiva
function showPositiveMessage() {
    const randomMessage = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
    gameElements.messageText.textContent = randomMessage;
    gameElements.positiveMessages.classList.remove('hidden');
    
    setTimeout(() => {
        gameElements.positiveMessages.classList.add('hidden');
    }, 3000);
}

// Próximo nível
function nextLevel() {
    if (gameData.currentLevel < 3) {
        gameData.currentLevel++;
        gameData.currentQuestion = 0;
        gameData.questions = gameData.levels[gameData.currentLevel - 1].questions;
        updateUI();
        showQuestion();
    } else {
        endGame();
    }
}

// Finalizar jogo
function endGame() {
    const accuracy = Math.round((gameData.correctAnswers / gameData.totalQuestions) * 100);
    
    gameElements.finalScore.textContent = gameData.score;
    gameElements.finalCorrect.textContent = `${gameData.correctAnswers}/${gameData.totalQuestions}`;
    gameElements.finalAccuracy.textContent = `${accuracy}%`;
    
    showScreen('end');
    createCelebrationConfetti();
}

// Reiniciar jogo
function restartGame() {
    resetGameData();
    startGame();
}

// Embaralhar array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Sistema de confetes
function createConfetti() {
    const canvas = gameElements.confettiCanvas;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd'];
    
    // Criar peças de confete
    for (let i = 0; i < 50; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        });
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            const piece = confettiPieces[i];
            
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.rotation += piece.rotationSpeed;
            
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();
            
            if (piece.y > canvas.height) {
                confettiPieces.splice(i, 1);
            }
        }
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(animateConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animateConfetti();
}

// Confetes de celebração (mais intenso)
function createCelebrationConfetti() {
    const canvas = gameElements.confettiCanvas;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#ff9ff3', '#54a0ff'];
    
    // Criar mais peças de confete para celebração
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: -10 - Math.random() * 100,
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * 4 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 12 + 6,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 15
        });
    }
    
    function animateCelebrationConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            const piece = confettiPieces[i];
            
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.rotation += piece.rotationSpeed;
            
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();
            
            if (piece.y > canvas.height + 50) {
                confettiPieces.splice(i, 1);
            }
        }
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(animateCelebrationConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animateCelebrationConfetti();
}

// Redimensionar canvas quando a janela muda de tamanho
window.addEventListener('resize', () => {
    const canvas = gameElements.confettiCanvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

