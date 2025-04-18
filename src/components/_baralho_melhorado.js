// Baralho gerado por CriadorDeCarta
// Nome: baralho_melhorado
// Data: <Data Atual>

const baralho_melhorado = [
  {
    "tipo": "Pergunta",
    "titulo": "Identificação (Imagem Clicável)",
    "pergunta": "\nQual animal está representado na imagem?",
    "imageType": "clickable",
    "imagem": "/img/exemplo_animal.jpg", // <-- ADICIONADO CAMPO IMAGEM
    "opcoes": [
      { "id": 1, "texto": "Cachorro" },
      { "id": 2, "texto": "Gato" },
      { "id": 3, "texto": "Capivara" }, // <-- Correta
      { "id": 4, "texto": "Pássaro" }
    ],
    "respostaCorreta": 3, // <-- Resposta única como número
    "dificuldade": "facil",
    "categorias": ["_baralhoTeste", "animais", "identificacao"], // <-- Categorias mais descritivas
    "fontes": ["Fonte: Imagem Própria"],
    "vantagem": "Ajuda na percepção visual.",
    "desvantagem": "Requer que a imagem carregue.",
    "dica": "É um roedor famoso no Brasil."
  },
  {
    "tipo": "Pergunta",
    "titulo": "Conceito (Imagem Hero)",
    "pergunta": "\nEsta imagem representa qual conceito da física?",
    "imageType": "hero", // <-- ADICIONADO TIPO HERO
    "imagem": "/img/exemplo_atomo.png", // <-- ADICIONADO CAMPO IMAGEM
    "opcoes": [
      { "id": 1, "texto": "Gravidade" },
      { "id": 2, "texto": "Estrutura Atômica" } // <-- Correta
    ],
    "respostaCorreta": 2,
    "dificuldade": "normal",
    "categorias": ["_baralhoTeste", "fisica", "conceitos"],
    "fontes": ["Livro de Física XYZ"],
    "vantagem": "",
    "desvantagem": "",
    "dica": "Pense nos componentes básicos da matéria."
  },
  {
    "tipo": "MultiplaEscolha",
    "titulo": "Características de Planetas",
    "pergunta": "Quais destes são planetas gasosos do nosso sistema solar?",
    "imageType": undefined, // <-- Sem imagem
    "imagem": undefined,
    "opcoes": [
      { "id": 1, "texto": "Mercúrio" },
      { "id": 2, "texto": "Júpiter" }, // <-- Correta
      { "id": 3, "texto": "Saturno" }, // <-- Correta
      { "id": 4, "texto": "Marte" }
    ],
    "respostaCorreta": [2, 3], // <-- Array de respostas corretas
    "dificuldade": "normal",
    "categorias": ["_baralhoTeste", "astronomia", "sistema solar"],
    "fontes": ["NASA", "Livro de Astronomia ABC"],
    "vantagem": "Testa conhecimento específico.",
    "desvantagem": "",
    "dica": "São os maiores planetas e não possuem superfície sólida definida."
  },
  {
    "tipo": "Ordem",
    "titulo": "Fases da Mitose",
    "pergunta": "Ordene as fases principais da mitose:",
    "imageType": undefined,
    "imagem": undefined,
    "opcoes": [
      { "id": 1, "texto": "Anáfase" },   // Posição 3
      { "id": 2, "texto": "Telófase" },  // Posição 4
      { "id": 3, "texto": "Prófase" },   // Posição 1
      { "id": 4, "texto": "Metáfase" }   // Posição 2
    ],
    "respostaCorreta": [3, 4, 1, 2], // <-- Ordem correta dos IDs: Prófase(3), Metáfase(4), Anáfase(1), Telófase(2)
    "dificuldade": "dificil",
    "categorias": ["_baralhoTeste", "biologia", "celulas"],
    "fontes": ["Livro de Biologia Celular"],
    "vantagem": "Avalia compreensão de processos sequenciais.",
    "desvantagem": "Requer memorização da ordem.",
    "dica": "Lembre-se do ciclo celular."
  },
  {
    "tipo": "Vantagem",
    "titulo": "Benefícios da Leitura",
    "pergunta": "Quais são considerados benefícios da leitura regular?",
    "imageType": undefined,
    "imagem": undefined,
    "opcoes": [
      { "id": 1, "texto": "Expansão do vocabulário" }, // <-- Vantagem
      { "id": 2, "texto": "Melhora da concentração" }, // <-- Vantagem
      { "id": 3, "texto": "Redução do estresse" }     // <-- Vantagem
    ],
    "respostaCorreta": [1, 2, 3], // <-- Todas as opções são 'corretas' (vantagens)
    "dificuldade": "facil",
    "categorias": ["_baralhoTeste", "habilidades", "bem-estar"],
    "fontes": ["Estudos diversos"],
    "vantagem": "Incentiva hábitos positivos.",
    "desvantagem": "",
    "dica": "Pense em como a leitura afeta a mente e o conhecimento."
  },
  {
    "tipo": "Desvantagem",
    "titulo": "Riscos de Segurança Online",
    "pergunta": "Quais das seguintes práticas representam riscos de segurança online?",
    "imageType": undefined,
    "imagem": undefined,
    "opcoes": [
      { "id": 1, "texto": "Usar a mesma senha para vários sites" }, // <-- Desvantagem
      { "id": 2, "texto": "Clicar em links suspeitos em emails" }, // <-- Desvantagem
      { "id": 3, "texto": "Manter softwares desatualizados" }      // <-- Desvantagem
    ],
    "respostaCorreta": [], // <-- Nenhuma opção é 'correta' (são desvantagens/riscos)
    "dificuldade": "normal",
    "categorias": ["_baralhoTeste", "seguranca", "internet"],
    "fontes": ["Cartilha de Segurança CERT.br"],
    "vantagem": "Promove consciência sobre segurança.",
    "desvantagem": "Pode assustar alguns usuários.",
    "dica": "Pense em ações que podem expor seus dados."
  },
  {
    "tipo": "Outras",
    "titulo": "Opinião sobre Tecnologia",
    "pergunta": "Qual sua principal ferramenta de comunicação digital hoje?",
    "imageType": undefined,
    "imagem": undefined,
    "opcoes": [
      { "id": 1, "texto": "Email" },
      { "id": 2, "texto": "WhatsApp / Mensageiros" },
      { "id": 3, "texto": "Redes Sociais (Feed/DM)" },
      { "id": 4, "texto": "Videochamadas (Zoom, Meet)" }
    ],
    "respostaCorreta": [], // <-- Sem resposta 'correta', pode ser usado para pesquisa ou reflexão
    "dificuldade": "facil",
    "categorias": ["_baralhoTeste", "tecnologia", "opiniao"],
    "fontes": [],
    "vantagem": "Inicia discussão.",
    "desvantagem": "Não avalia conhecimento.",
    "dica": "Qual você mais usa no dia a dia?"
  },
  {
    "tipo": "Pergunta",
    "titulo": "Desafio Temporal: Capitais",
    "pergunta": "Qual a capital da Austrália? Você tem 15 segundos!",
    "imageType": undefined,
    "imagem": undefined,
    "opcoes": [
      { "id": 1, "texto": "Sydney" },
      { "id": 2, "texto": "Melbourne" },
      { "id": 3, "texto": "Camberra" }, // <-- Correta
      { "id": 4, "texto": "Brisbane" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "normal",
    "categorias": ["_baralhoTeste", "geografia", "capitais", "desafio temporal"],
    "fontes": ["Geografia Mundial"],
    "vantagem": "Adiciona elemento de pressão.",
    "desvantagem": "Requer lógica de tempo no jogo.",
    "dica": "Não é a cidade mais famosa!",
    "meta": { // <-- NOVO CAMPO META
      "timeLimit": 15, // Segundos
      "pointsPerSecondLeft": 2 // Exemplo: 2 pontos por segundo restante
    }
  },
  {
    "tipo": "MultiplaEscolha",
    "titulo": "Cenário: Projeto Atrasado",
    "pergunta": "Seu projeto está atrasado. Quais as ações mais adequadas a tomar imediatamente?",
    "imageType": undefined,
    "imagem": undefined,
    "opcoes": [
      { "id": 1, "texto": "Ignorar o problema e esperar que se resolva." },
      { "id": 2, "texto": "Comunicar o atraso e o motivo aos interessados." }, // <-- Correta
      { "id": 3, "texto": "Reavaliar o escopo e prioridades restantes." },   // <-- Correta
      { "id": 4, "texto": "Pedir mais prazo sem apresentar um plano." }
    ],
    "respostaCorreta": [2, 3],
    "dificuldade": "normal",
    "categorias": ["_baralhoTeste", "gerenciamento", "cenarios"],
    "fontes": ["Boas práticas de Gestão de Projetos"],
    "vantagem": "Avalia tomada de decisão.",
    "desvantagem": "",
    "dica": "Pense em transparência e proatividade."
  },
  {
    "tipo": "Pergunta",
    "titulo": "Verdadeiro ou Falso: Água",
    "pergunta": "A fórmula química da água é CO2.",
    "imageType": undefined,
    "imagem": undefined,
    "opcoes": [
      { "id": 1, "texto": "Verdadeiro" },
      { "id": 2, "texto": "Falso" } // <-- Correta
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["_baralhoTeste", "quimica", "verdadeiro-falso"],
    "fontes": ["Conhecimento Geral"],
    "vantagem": "Simples e direto.",
    "desvantagem": "50% de chance de acerto aleatório.",
    "dica": "CO2 é dióxido de carbono."
  }
];

export default baralho_melhorado;