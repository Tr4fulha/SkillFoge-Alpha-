
// Fix: Added missing Comment and Solution to the import list from types.ts
import { Category, Challenge, Company, Difficulty, UserProfile, Rarity, Achievement, Comment, Solution } from './types';

export const ALL_ACHIEVEMENTS: Achievement[] = [
  // --- COMUNS (12) ---
  { id: 'c1', name: 'Primeiro Passo', description: 'Complete seu primeiro desafio.', icon: 'Zap', rarity: Rarity.COMMON, points: 20, isUnlocked: true, date: '10/05/2024' },
  { id: 'c2', name: 'Curioso', description: 'Abra o Mentor IA pela primeira vez.', icon: 'Bot', rarity: Rarity.COMMON, points: 10, isUnlocked: true, date: '11/05/2024' },
  { id: 'c3', name: 'Socializador', description: 'Siga 5 usuários da comunidade.', icon: 'UserPlus', rarity: Rarity.COMMON, points: 30, isUnlocked: false },
  { id: 'c4', name: 'Hello World', description: 'Envie uma solução na categoria Programação.', icon: 'Code', rarity: Rarity.COMMON, points: 25, isUnlocked: true, date: '12/05/2024' },
  { id: 'c5', name: 'Conectado', description: 'Acesse o app por 2 dias seguidos.', icon: 'Flame', rarity: Rarity.COMMON, points: 20, isUnlocked: true },
  { id: 'c6', name: 'Perfil Completo', description: 'Visualize seu próprio perfil.', icon: 'User', rarity: Rarity.COMMON, points: 10, isUnlocked: true },
  { id: 'c7', name: 'Feedback', description: 'Abra a aba de comentários de um desafio.', icon: 'MessageCircle', rarity: Rarity.COMMON, points: 15, isUnlocked: false },
  { id: 'c8', name: 'Lógico Jr.', description: 'Complete 1 flashcard no LogicLab.', icon: 'Layers', rarity: Rarity.COMMON, points: 20, isUnlocked: false },
  { id: 'c9', name: 'Economista', description: 'Acumule 50 SkillCoins.', icon: 'Coins', rarity: Rarity.COMMON, points: 30, isUnlocked: false },
  { id: 'c10', name: 'Explorador', description: 'Visite a aba de empresas.', icon: 'Building', rarity: Rarity.COMMON, points: 10, isUnlocked: true },
  { id: 'c11', name: 'Caçador de Bugs', description: 'Encontre um erro de sintaxe proposital em um desafio.', icon: 'Bug', rarity: Rarity.COMMON, points: 25, isUnlocked: false },
  { id: 'c12', name: 'Madrugador', description: 'Faça login antes das 8:00 da manhã.', icon: 'Sun', rarity: Rarity.COMMON, points: 15, isUnlocked: false },

  // --- INCOMUNS (12) ---
  { id: 'u1', name: 'Focado', description: 'Mantenha um streak de 7 dias.', icon: 'Flame', rarity: Rarity.UNCOMMON, points: 80, reward: 'Moldura Verde', isUnlocked: false },
  { id: 'u2', name: 'Poliglota', description: 'Resolva desafios em 2 categorias diferentes.', icon: 'Globe', rarity: Rarity.UNCOMMON, points: 100, isUnlocked: false },
  { id: 'u3', name: 'Ajudante', description: 'Ganhe 5 pontos de reputação.', icon: 'Star', rarity: Rarity.UNCOMMON, points: 60, isUnlocked: false },
  { id: 'u4', name: 'Database Beginner', description: 'Complete 3 desafios de Banco de Dados.', icon: 'Database', rarity: Rarity.UNCOMMON, points: 90, isUnlocked: false },
  { id: 'u5', name: 'Net Explorer', description: 'Complete 3 desafios de Redes.', icon: 'Shield', rarity: Rarity.UNCOMMON, points: 90, isUnlocked: false },
  { id: 'u6', name: 'Investidor', description: 'Desbloqueie seu primeiro desafio pago.', icon: 'Unlock', rarity: Rarity.UNCOMMON, points: 120, isUnlocked: false },
  { id: 'u7', name: 'Rápido no Gatilho', description: 'Resolva um desafio em menos de 5 minutos.', icon: 'Clock', rarity: Rarity.UNCOMMON, points: 150, isUnlocked: false },
  { id: 'u8', name: 'Noite em Claro', description: 'Resolva um desafio entre 00:00 e 05:00.', icon: 'Moon', rarity: Rarity.UNCOMMON, points: 100, isUnlocked: false },
  { id: 'u9', name: 'Diqueiro', description: 'Use 5 dicas progressivas.', icon: 'Lightbulb', rarity: Rarity.UNCOMMON, points: 70, isUnlocked: false },
  { id: 'u10', name: 'Mentor Amigo', description: 'Pergunte 10 vezes ao Mentor IA.', icon: 'MessageSquare', rarity: Rarity.UNCOMMON, points: 80, isUnlocked: false },
  { id: 'u11', name: 'Vaga à Vista', description: 'Visualize 10 detalhes de empresas.', icon: 'Search', rarity: Rarity.UNCOMMON, points: 50, isUnlocked: false },
  { id: 'u12', name: 'Colecionador', description: 'Ganhe 10 conquistas comuns.', icon: 'Trophy', rarity: Rarity.UNCOMMON, points: 100, isUnlocked: false },

  // --- RARAS (10) ---
  { id: 'r1', name: 'Mestre da Lógica', description: 'Complete todos os flashcards do LogicLab.', icon: 'Brain', rarity: Rarity.RARE, points: 300, reward: 'Bônus 1.2x XP', isUnlocked: false },
  { id: 'r2', name: 'Dev Full Stack', description: 'Resolva 10 desafios de Programação.', icon: 'Terminal', rarity: Rarity.RARE, points: 350, isUnlocked: false },
  { id: 'r3', name: 'Arquiteto de Dados', description: 'Resolva 10 desafios de Banco de Dados.', icon: 'Database', rarity: Rarity.RARE, points: 350, isUnlocked: false },
  { id: 'r4', name: 'Engenheiro de Redes', description: 'Resolva 10 desafios de Redes.', icon: 'Server', rarity: Rarity.RARE, points: 350, isUnlocked: false },
  { id: 'r5', name: 'Popular', description: 'Alcance 100 seguidores.', icon: 'Users', rarity: Rarity.RARE, points: 250, isUnlocked: false },
  { id: 'r6', name: 'Sábio', description: 'Acumule 1000 pontos de reputação.', icon: 'Sparkles', rarity: Rarity.RARE, points: 400, isUnlocked: false },
  { id: 'r7', name: 'Inquebrável', description: 'Streak de 30 dias seguidos.', icon: 'ShieldCheck', rarity: Rarity.RARE, points: 400, reward: 'Moldura Cromo', isUnlocked: false },
  { id: 'r8', name: 'Top 100', description: 'Entre no Top 100 do ranking global.', icon: 'Award', rarity: Rarity.RARE, points: 300, isUnlocked: false },
  { id: 'r9', name: 'Perfeito', description: 'Resolva 5 desafios sem usar nenhuma dica.', icon: 'CheckCircle', rarity: Rarity.RARE, points: 350, isUnlocked: false },
  { id: 'r10', name: 'Beta Tester', description: 'Encontre e reporte um feedback técnico.', icon: 'Bug', rarity: Rarity.RARE, points: 200, isUnlocked: false },

  // --- ÉPICAS (10) ---
  { id: 'e1', name: 'Lendário do Código', description: 'Resolva 50 desafios de Programação.', icon: 'Cpu', rarity: Rarity.EPIC, points: 600, reward: 'Syntax Theme Dark', isUnlocked: false },
  { id: 'e2', name: 'Oráculo SQL', description: 'Resolva 50 desafios de Banco de Dados.', icon: 'Table', rarity: Rarity.EPIC, points: 600, isUnlocked: false },
  { id: 'e3', name: 'Lorde do Tráfego', description: 'Resolva 50 desafios de Redes.', icon: 'Wifi', rarity: Rarity.EPIC, points: 600, isUnlocked: false },
  { id: 'e4', name: 'Mentor Supremo', description: 'Ajude 100 alunos através do fórum.', icon: 'Crown', rarity: Rarity.EPIC, points: 700, reward: 'Selo de Verificado', isUnlocked: false },
  { id: 'e5', name: 'Influenciador Tech', description: 'Alcance 1000 seguidores.', icon: 'Megaphone', rarity: Rarity.EPIC, points: 500, isUnlocked: false },
  { id: 'e6', name: 'Milionário', description: 'Acumule 10.000 SkillCoins.', icon: 'Banknote', rarity: Rarity.EPIC, points: 550, isUnlocked: false },
  { id: 'e7', name: 'Nível Hardcore', description: 'Alcance o Nível 50.', icon: 'TrendingUp', rarity: Rarity.EPIC, points: 800, isUnlocked: false },
  { id: 'e8', name: 'Executor de Elite', description: 'Resolva 5 desafios de nível "Avançado".', icon: 'Target', rarity: Rarity.EPIC, points: 750, isUnlocked: false },
  { id: 'e9', name: 'Hacker Ético', description: 'Resolva todos os desafios de Segurança/Redes.', icon: 'UserSecret', rarity: Rarity.EPIC, points: 700, isUnlocked: false },
  { id: 'e10', name: 'Maratonista', description: 'Resolva 10 desafios em menos de 24 horas.', icon: 'Timer', rarity: Rarity.EPIC, points: 650, isUnlocked: false },

  // --- LENDÁRIAS (8) ---
  { id: 'l1', name: 'Deus da Forja', description: 'Resolva TODOS os desafios da plataforma.', icon: 'Hammer', rarity: Rarity.LEGENDARY, points: 1500, reward: 'Título: Forge God', isUnlocked: false },
  { id: 'l2', name: 'Invicto', description: 'Mantenha um streak de 365 dias.', icon: 'Sun', rarity: Rarity.LEGENDARY, points: 1200, reward: 'Aura Dourada Perfil', isUnlocked: false },
  { id: 'l3', name: 'Mestre Supremo', description: 'Alcance 100 pontos em todas as categorias de Skill.', icon: 'Diamond', rarity: Rarity.LEGENDARY, points: 1300, isUnlocked: false },
  { id: 'l4', name: 'Top 1 Global', description: 'Fique em primeiro lugar no ranking mundial.', icon: 'Medal', rarity: Rarity.LEGENDARY, points: 1500, reward: 'Troféu Ouro Real', isUnlocked: false },
  { id: 'l5', name: 'Visionário', description: 'Tenha uma solução validada por uma empresa parceira.', icon: 'Eye', rarity: Rarity.LEGENDARY, points: 1100, reward: 'Badge: Hiring Ready', isUnlocked: false },
  { id: 'l6', name: 'Filantropo', description: 'Doe 5.000 SkillCoins para a comunidade.', icon: 'HeartHandshake', rarity: Rarity.LEGENDARY, points: 1000, isUnlocked: false },
  { id: 'l7', name: 'Imortal', description: 'Resolva 1000 desafios no total.', icon: 'Infinite', rarity: Rarity.LEGENDARY, points: 1400, isUnlocked: false },
  { id: 'l8', name: 'Arquiteto do Futuro', description: 'Crie um desafio que seja aprovado para o catálogo oficial.', icon: 'PenTool', rarity: Rarity.LEGENDARY, points: 1200, isUnlocked: false },
];

export const CURRENT_USER: UserProfile = {
  id: "u1",
  name: "Alex Silva",
  role: "Student",
  points: 450,
  level: 5,
  skills: {
    [Category.DEV]: 65,
    [Category.NET]: 40,
    [Category.DB]: 55,
    [Category.LOGIC]: 80,
  },
  completedChallenges: ['1', '3'],
  badges: [],
  achievements: ALL_ACHIEVEMENTS.filter(a => a.isUnlocked),
  reputation: 120,
  followers: 45,
  following: 12,
  messages: [
    { id: 'm1', senderId: 'u3', senderName: 'Prof. Carlos', text: 'Parabéns pela solução na VLAN!', timestamp: 'Ontem' }
  ]
};

export const MOCK_USERS: UserProfile[] = [
  {
    id: "u2",
    name: "Beatriz Costa",
    role: "Student",
    points: 890,
    level: 8,
    skills: { [Category.DEV]: 90, [Category.NET]: 30, [Category.DB]: 40, [Category.LOGIC]: 70 },
    completedChallenges: [],
    badges: [],
    achievements: [],
    reputation: 340,
    followers: 120,
    following: 30,
    messages: []
  },
  {
    id: "u3",
    name: "Prof. Carlos",
    role: "Teacher",
    points: 15000,
    level: 99,
    skills: { [Category.DEV]: 100, [Category.NET]: 100, [Category.DB]: 100, [Category.LOGIC]: 100 },
    completedChallenges: [],
    badges: [],
    achievements: [],
    reputation: 5000,
    followers: 1200,
    following: 0,
    messages: []
  }
];

export const MOCK_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Configuração de VLAN',
    description: 'Configure uma VLAN para separar o tráfego de voz e dados em um switch Cisco Packet Tracer simulado.',
    category: Category.NET,
    difficulty: Difficulty.MEDIUM,
    pointsReward: 100,
    costToUnlock: 0,
    isLocked: false,
    author: 'TechCorp Solutions',
    participants: 120,
    hints: [
      { id: 'h1_1', type: 'CONCEPT', title: 'Conceito', content: 'Dica conceitual...', minProgress: 30, cost: 10 }
    ]
  },
  {
    id: 'd1',
    title: 'Desafio Diário: Loops em Python',
    description: 'Crie um loop que percorra uma lista de usuários e filtre apenas os administradores.',
    category: Category.DEV,
    difficulty: Difficulty.EASY,
    pointsReward: 200,
    costToUnlock: 0,
    isLocked: false,
    author: 'SkillForge Daily',
    participants: 1500,
    isDaily: true
  },
  {
    id: '2',
    title: 'API RESTful com Node.js',
    description: 'Crie uma rota GET e uma POST para gerenciar um cadastro de produtos.',
    category: Category.DEV,
    difficulty: Difficulty.MEDIUM,
    pointsReward: 150,
    costToUnlock: 50,
    isLocked: true,
    author: 'DevCommunity',
    participants: 85
  }
];

export const MOCK_COMPANIES: Company[] = [
  { id: 'comp1', name: 'TechCorp', industry: 'Redes', logoUrl: 'https://picsum.photos/60/60?random=1', openPositions: 3 }
];

export const MOCK_COMMENTS: Comment[] = [];
export const MOCK_SOLUTIONS: Solution[] = [];
