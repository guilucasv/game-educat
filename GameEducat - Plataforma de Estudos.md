# GameEducat - Plataforma de Estudos

## Descrição
O GameEducat é uma plataforma educativa moderna e atraente, desenvolvida especialmente para alunos do ensino médio. A interface permite navegar e acessar diferentes jogos educativos de forma intuitiva e divertida.

## Características da Plataforma

### 🎮 Interface Moderna
- **Design Inspirado em Gaming**: Interface baseada nos melhores game centers modernos
- **Gradientes Vibrantes**: Cores atraentes que chamam a atenção dos estudantes
- **Animações Suaves**: Transições e efeitos visuais polidos
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile

### 🎯 Funcionalidades
- **Listagem de Jogos**: Visualização em cards dos jogos disponíveis
- **Modal de Detalhes**: Informações detalhadas sobre cada jogo antes de jogar
- **Sistema de Status**: Diferenciação entre jogos "Disponíveis" e "Em Breve"
- **Atividade Recente**: Histórico das atividades do usuário
- **Navegação Intuitiva**: Acesso direto aos jogos com um clique

### 📚 Jogos Incluídos
- **SQL Quest**: Jogo interativo de SQL e Tabela Verdade (Disponível)
- **Desafio ER/SQL**: Teste seus conhecimentos em modelagem de dados e SQL (Disponível)
- **Plataforma SQL**: Uma plataforma completa para praticar e aprimorar suas habilidades em SQL (Disponível)
- **Math Challenge**: Desafios matemáticos progressivos (Em Breve)
- **Code Master**: Aprendizado de programação interativo (Em Breve)

## Estrutura do Projeto

### Arquivos Principais
- `game-center.html` - Estrutura principal da plataforma
- `game-center.css` - Estilos e animações
- `game-center.js` - Lógica de interação e navegação

### Recursos Visuais
- **Ícones Emoji**: Representação visual dos jogos
- **Gradientes Personalizados**: Cada jogo tem sua identidade visual
- **Sistema de Dificuldade**: Indicadores visuais de nível
- **Backdrop Blur**: Efeitos de vidro fosco modernos

## Como Usar

### Para Estudantes
1. **Acesse** o GameEducat abrindo o arquivo `game-center.html`
2. **Explore** os jogos disponíveis na seção "Jogos Populares"
3. **Clique** em um card de jogo para ver mais detalhes
4. **Jogue** clicando em "Jogar Agora" (para jogos disponíveis)

### Para Desenvolvedores
1. **Adicionar Novos Jogos**: Edite o array `gamesData` em `game-center.js`
2. **Personalizar Estilos**: Modifique `game-center.css`
3. **Expandir Funcionalidades**: Use as funções exportadas em `window.GameEducat`

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com gradientes, backdrop-filter e animações
- **JavaScript ES6+**: Lógica interativa e manipulação do DOM
- **Google Fonts**: Tipografia Inter para melhor legibilidade

## Recursos Implementados

✅ Interface moderna inspirada em game centers  
✅ Sistema de cards para jogos  
✅ Modal de detalhes dos jogos  
✅ Navegação entre Game Center e jogos individuais  
✅ Sistema de status (Disponível/Em Breve)  
✅ Seção de atividade recente  
✅ Design totalmente responsivo  
✅ Animações e transições suaves  
✅ Integração com jogos existentes  

## Compatibilidade

### Navegadores Suportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Recursos CSS Utilizados
- CSS Grid e Flexbox
- Backdrop Filter
- CSS Gradients
- CSS Animations
- CSS Custom Properties

## Expansibilidade

A plataforma foi desenvolvida pensando na expansão futura:

### Adicionar Novos Jogos
```javascript
// Exemplo de como adicionar um novo jogo
const novoJogo = {
    id: 'physics-lab',
    title: 'Physics Lab',
    description: 'Experimentos de física interativos',
    icon: '⚗️',
    difficulty: 4,
    duration: '25-45 min',
    status: 'Disponível',
    link: './physics-lab.html',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    subjects: ['Física', 'Experimentos', 'Ciências']
};

// Adicionar à plataforma
window.GameEducat.addGame(novoJogo);
```

### Atualizar Status de Jogos
```javascript
// Marcar um jogo como disponível
window.GameEducat.updateGameStatus('math-challenge', 'Disponível');
```

## Estrutura de Dados dos Jogos

Cada jogo na plataforma segue esta estrutura:

```javascript
{
    id: 'identificador-unico',
    title: 'Nome do Jogo',
    description: 'Descrição detalhada do jogo',
    icon: 'emoji-representativo',
    difficulty: 1-5, // Nível de dificuldade
    duration: 'tempo-estimado',
    status: 'Disponível' | 'Em Breve',
    link: 'caminho-para-o-jogo',
    gradient: 'gradiente-css-personalizado',
    subjects: ['array', 'de', 'matérias']
}
```

## Próximos Passos

- [ ] Sistema de login e perfis de usuário
- [ ] Estatísticas detalhadas de progresso
- [ ] Sistema de conquistas e badges
- [ ] Modo escuro/claro
- [ ] Integração com APIs de gamificação
- [ ] Sistema de ranking entre estudantes

