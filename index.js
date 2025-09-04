// Dados dos jogos disponíveis
const gamesData = [
    {
        id: 'sql-quest',
        title: 'SQL Quest',
        description: 'Aventure-se pelo mundo do SQL e da Lógica. Responda perguntas de SQL e Tabela Verdade para avançar com seu personagem mago.',
        icon: '🧙‍♂️',
        difficulty: 3,
        duration: '15-30 min',
        status: 'Disponível',
        link: './index.html',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        subjects: ['SQL', 'Tabela Verdade', 'Lógica']
    },
    {
        id: 'desafio-er-sql',
        title: 'Desafio ER/SQL',
        description: 'Teste seus conhecimentos em modelagem de dados e SQL com este desafio.',
        icon: '📊',
        difficulty: 4,
        duration: '20-40 min',
        status: 'Disponível',
        link: 'https://testes2025.netlify.app/sql/02/',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        subjects: ['SQL', 'Modelagem de Dados', 'ER']
    },
    {
        id: 'plataforma-sql',
        title: 'Plataforma SQL',
        description: 'Uma plataforma completa para praticar e aprimorar suas habilidades em SQL.',
        icon: '🚀',
        difficulty: 5,
        duration: '30-60 min',
        status: 'Disponível',
        link: 'https://68a55f7099505d8d7817e8cc--aquamarine-valkyrie-61ba6f.netlify.app/menuj',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        subjects: ['SQL', 'Banco de Dados', 'Consultas']
    },
    {
        id: 'math-challenge',
        title: 'Math Challenge',
        description: 'Desafie suas habilidades matemáticas com problemas progressivos. Álgebra, geometria e cálculo em um ambiente gamificado.',
        icon: '🔢',
        difficulty: 4,
        duration: '20-40 min',
        status: 'Em Breve',
        link: '#',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        subjects: ['Álgebra', 'Geometria', 'Cálculo']
    },
    {
        id: 'code-master',
        title: 'Code Master',
        description: 'Aprenda programação de forma interativa. Resolva desafios de código em Python, JavaScript e outras linguagens.',
        icon: '💻',
        difficulty: 5,
        duration: '30-60 min',
        status: 'Em Breve',
        link: '#',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        subjects: ['Python', 'JavaScript', 'Algoritmos']
    }
];

// Elementos DOM
const gamesGrid = document.getElementById('games-grid');
const gameModal = document.getElementById('game-modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const modalCancel = document.getElementById('modal-cancel');
const modalPlay = document.getElementById('modal-play');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalDifficulty = document.getElementById('modal-difficulty');
const modalDuration = document.getElementById('modal-duration');
const previewIcon = document.getElementById('preview-icon');

let currentGame = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderGames();
    setupEventListeners();
    addAnimations();
});

// Renderizar jogos na grid
function renderGames() {
    gamesGrid.innerHTML = '';
    
    gamesData.forEach(game => {
        const gameCard = createGameCard(game);
        gamesGrid.appendChild(gameCard);
    });
}

// Criar card de jogo
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.style.background = `${game.gradient}, rgba(255, 255, 255, 0.1)`;
    card.style.backgroundBlendMode = 'overlay';
    
    // Criar dots de dificuldade
    const difficultyDots = Array.from({ length: 5 }, (_, i) => 
        `<div class="difficulty-dot ${i < game.difficulty ? 'active' : ''}"></div>`
    ).join('');
    
    card.innerHTML = `
        <div class="game-header">
            <div class="game-icon" style="background: ${game.gradient}">
                ${game.icon}
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="game-status">${game.status}</div>
            </div>
        </div>
        <div class="game-description">
            ${game.description}
        </div>
        <div class="game-footer">
            <div class="game-difficulty">
                <span>Dificuldade</span>
                <div class="difficulty-dots">
                    ${difficultyDots}
                </div>
            </div>
            <button class="play-button" ${game.status === 'Em Breve' ? 'disabled' : ''}>
                ${game.status === 'Em Breve' ? 'Em Breve' : 'Jogar'}
            </button>
        </div>
    `;
    
    // Adicionar event listener
    card.addEventListener('click', () => openGameModal(game));
    
    return card;
}

// Abrir modal do jogo
function openGameModal(game) {
    currentGame = game;
    
    modalTitle.textContent = game.title;
    modalDescription.textContent = game.description;
    modalDifficulty.textContent = getDifficultyText(game.difficulty);
    modalDuration.textContent = game.duration;
    
    previewIcon.innerHTML = game.icon;
    previewIcon.style.background = game.gradient;
    
    // Atualizar botão de jogar
    const playButton = modalPlay;
    if (game.status === 'Em Breve') {
        playButton.textContent = 'Em Breve';
        playButton.disabled = true;
        playButton.style.opacity = '0.5';
    } else {
        playButton.textContent = 'Jogar Agora';
        playButton.disabled = false;
        playButton.style.opacity = '1';
    }
    
    gameModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeGameModal() {
    gameModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    currentGame = null;
}

// Obter texto da dificuldade
function getDifficultyText(difficulty) {
    const levels = {
        1: 'Muito Fácil',
        2: 'Fácil',
        3: 'Médio',
        4: 'Difícil',
        5: 'Muito Difícil'
    };
    return levels[difficulty] || 'Médio';
}

// Configurar event listeners
function setupEventListeners() {
    // Modal
    modalClose.addEventListener('click', closeGameModal);
    modalCancel.addEventListener('click', closeGameModal);
    modalOverlay.addEventListener('click', closeGameModal);
    
    // Botão de jogar
    modalPlay.addEventListener('click', () => {
        if (currentGame && currentGame.status !== 'Em Breve') {
            if (currentGame.link === '#') {
                showComingSoonMessage();
            } else {
                window.location.href = currentGame.link;
            }
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !gameModal.classList.contains('hidden')) {
            closeGameModal();
        }
    });
    
    // Animações de hover nos cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Mostrar mensagem de "em breve"
function showComingSoonMessage() {
    const message = document.createElement('div');
    message.className = 'coming-soon-message';
    message.innerHTML = `
        <div class="message-content">
            <div class="message-icon">🚀</div>
            <div class="message-text">Este jogo estará disponível em breve!</div>
        </div>
    `;
    
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        color: #333;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        text-align: center;
        backdrop-filter: blur(20px);
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => {
            document.body.removeChild(message);
        }, 300);
    }, 2000);
}

// Adicionar animações CSS
function addAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
        
        .game-card {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
        }
        
        .game-card:nth-child(1) { animation-delay: 0.1s; }
        .game-card:nth-child(2) { animation-delay: 0.2s; }
        .game-card:nth-child(3) { animation-delay: 0.3s; }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-title {
            animation: fadeInDown 0.8s ease-out;
        }
        
        .hero-subtitle {
            animation: fadeInUp 0.8s ease-out 0.2s both;
        }
        
        .hero-stats {
            animation: fadeInUp 0.8s ease-out 0.4s both;
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .section-title {
            animation: fadeInLeft 0.6s ease-out;
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .activity-item {
            animation: fadeInRight 0.6s ease-out;
        }
        
        .activity-item:nth-child(1) { animation-delay: 0.1s; }
        .activity-item:nth-child(2) { animation-delay: 0.2s; }
        
        @keyframes fadeInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Função para adicionar novos jogos (para futuras expansões)
function addGame(gameData) {
    gamesData.push(gameData);
    renderGames();
    setupEventListeners();
}

// Função para atualizar status de um jogo
function updateGameStatus(gameId, newStatus) {
    const game = gamesData.find(g => g.id === gameId);
    if (game) {
        game.status = newStatus;
        renderGames();
        setupEventListeners();
    }
}

// Exportar funções para uso externo (se necessário)
window.GameEducat = {
    addGame,
    updateGameStatus,
    gamesData
};


