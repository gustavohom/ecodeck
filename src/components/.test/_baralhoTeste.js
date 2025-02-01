const _baralhoTeste = [
  [
  {
    "tipo": "Pergunta",
    "titulo": "Pergunta com Imagem",
    "pergunta": "<img src=\"/images/pergunta1.jpg\" alt=\"Pergunta 1\" class=\"img-media my-4\" /><br>Qual é o principal elemento natural?",
    "imageType": "clickable",
    "imagem": "/images/pergunta1.jpg",
    "opcoes": [
      { "id": 1, "texto": "Fogo" },
      { "id": 2, "texto": "Água" },
      { "id": 3, "texto": "Terra" },
      { "id": 4, "texto": "Ar" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["_baralhoTeste"],
    "fontes": ["Fonte A"],
    "vantagem": "Você ganha 10 pontos!",
    "desvantagem": "Sem bônus.",
    "dica": "Pense nos elementos naturais."
  },
  {
    "tipo": "MultiplaEscolha",
    "titulo": "Multipla Escolha com Imagem",
    "pergunta": "<img src=\"/images/multipla1.jpg\" alt=\"Multipla 1\" class=\"img-media my-4\" /><br>Quais destes são fontes de energia renovável?",
    "imageType": "clickable",
    "imagem": "/images/multipla1.jpg",
    "opcoes": [
      { "id": 1, "texto": "Energia solar" },
      { "id": 2, "texto": "Energia eólica" },
      { "id": 3, "texto": "Carvão" },
      { "id": 4, "texto": "Petróleo" }
    ],
    "respostaCorreta": [1, 2],
    "dificuldade": "dificil",
    "categorias": ["_baralhoTeste"],
    "fontes": ["Fonte B"],
    "vantagem": "Bônus de 20 pontos!",
    "desvantagem": "Sem bônus se errar.",
    "dica": "Energia solar e eólica são renováveis."
  },
  {
    "tipo": "Ordem",
    "titulo": "Carta de Ordem",
    "pergunta": "Organize as etapas da reciclagem corretamente.",
    "imageType": "clickable",
    "imagem": "/images/ordem1.jpg",
    "opcoes": [
      { "id": 1, "texto": "Coleta", "ordemTemp": "1" },
      { "id": 2, "texto": "Triagem", "ordemTemp": "2" },
      { "id": 3, "texto": "Processamento", "ordemTemp": "3" },
      { "id": 4, "texto": "Reutilização", "ordemTemp": "4" }
    ],
    "respostaCorreta": [1, 2, 3, 4],
    "dificuldade": "normal",
    "categorias": ["_baralhoTeste"],
    "fontes": ["Fonte C"],
    "vantagem": "Você ganha pontos extras!",
    "desvantagem": "Nenhum bônus adicional.",
    "dica": "Siga a sequência lógica dos processos."
  },
  {
    "tipo": "Vantagem",
    "titulo": "Carta de Vantagem",
    "pergunta": "Ganhe um bônus especial!",
    "imageType": "clickable",
    "imagem": "/images/vantagem.jpg",
    "opcoes": [
      { "id": 1, "texto": "Utilize esta vantagem" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "facil",
    "categorias": ["_baralhoTeste"],
    "fontes": [],
    "vantagem": "Bônus de pontos!",
    "desvantagem": "",
    "dica": ""
  },
  {
    "tipo": "Desvantagem",
    "titulo": "Carta de Desvantagem",
    "pergunta": "Sofra uma penalidade!",
    "imageType": "clickable",
    "imagem": "/images/desvantagem.jpg",
    "opcoes": [
      { "id": 1, "texto": "Perda de pontos" },
      { "id": 2, "texto": "Retrocesso" }
    ],
    "respostaCorreta": [],
    "dificuldade": "facil",
    "categorias": ["_baralhoTeste"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Perde 10 pontos",
    "dica": ""
  },
  {
    "tipo": "Outras",
    "titulo": "Carta Outras",
    "pergunta": "Esta carta possui regras especiais.",
    "imageType": "clickable",
    "imagem": "/images/outras.jpg",
    "opcoes": [
      { "id": 1, "texto": "Opção especial" },
      { "id": 2, "texto": "Outra opção" }
    ],
    "respostaCorreta": [1],
    "dificuldade": "normal",
    "categorias": ["_baralhoTeste"],
    "fontes": [],
    "vantagem": "Efeito especial ativado!",
    "desvantagem": "Nenhum efeito negativo.",
    "dica": ""
  },
  {
    "tipo": "Quiz",
    "titulo": "Quiz Card Example",
    "pergunta": "Responda o máximo de perguntas possíveis!",
    "imageType": "clickable",
    "imagem": "/images/quiz.jpg",
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["_quiz"],
    "fontes": [],
    "vantagem": "Bônus por agilidade!",
    "desvantagem": "Tempo esgotado!",
    "dica": "",
    "tempo": 30,
    "microperguntas": [
      {
        "pergunta": "Qual é a cor predominante da natureza?",
        "opcoes": [
          { "id": 1, "texto": "Azul" },
          { "id": 2, "texto": "Verde" },
          { "id": 3, "texto": "Amarelo" }
        ],
        "respostaCorreta": 2
      },
      {
        "pergunta": "Qual destes é uma fonte de energia renovável?",
        "opcoes": [
          { "id": 1, "texto": "Carvão" },
          { "id": 2, "texto": "Energia solar" },
          { "id": 3, "texto": "Petróleo" }
        ],
        "respostaCorreta": 2
      }
    ]
  },
  {
    "tipo": "RiskReward",
    "titulo": "Risk/Reward Card Example",
    "pergunta": "Escolha sua aposta:",
    "imageType": "clickable",
    "imagem": "/images/riskreward.jpg",
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["_riskreward"],
    "fontes": [],
    "vantagem": "Aposta alta gera mais pontos!",
    "desvantagem": "Errar perde a aposta.",
    "dica": "",
    "alternativasAposta": ["Baixa", "Média", "Alta"],
    "respostaCorreta": 1
  },
  {
    "tipo": "Time",
    "titulo": "Time Card Example",
    "pergunta": "Liste animais com a letra C",
    "imageType": "clickable",
    "imagem": "/images/time.jpg",
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["_time"],
    "fontes": [],
    "vantagem": "Ganhe pontos por cada animal correto!",
    "desvantagem": "Perde pontos se errar.",
    "dica": "",
    "tempo": 60
  },
  {
    "tipo": "Rally",
    "titulo": "Rally Card Example",
    "pergunta": "Qual dessas não é uma árvore?",
    "imageType": "clickable",
    "imagem": "/images/rally.jpg",
    "opcoes": [
      { "id": 1, "texto": "Pinheiro" },
      { "id": 2, "texto": "Carvalho" },
      { "id": 3, "texto": "Bicicleta" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "normal",
    "categorias": ["_rally"],
    "fontes": [],
    "vantagem": "Cada acerto vale 1 ponto!",
    "desvantagem": "Errar encerra o rally.",
    "dica": "",
    "tempo": 20
  },
  {
    "tipo": "Memory",
    "titulo": "Memory Card Example",
    "pergunta": "Memorize a seguinte sequência:",
    "imageType": "clickable",
    "imagem": "/images/memory.jpg",
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["_memory"],
    "fontes": [],
    "vantagem": "Bônus se lembrar da sequência completa!",
    "desvantagem": "Erros reduzem pontos.",
    "dica": "",
    "sequencia": ["Sol", "Água", "Terra"]
  },
  {
    "tipo": "WordAssociation",
    "titulo": "Word Association Example",
    "pergunta": "Associe os termos corretamente",
    "imageType": "clickable",
    "imagem": "/images/wordassoc.jpg",
    "opcoes": [
      { "id": 1, "texto": "DAP", "colunaCorreta": 2 },
      { "id": 2, "texto": "ÁREA BASAL", "colunaCorreta": 2 },
      { "id": 3, "texto": "ALTURA", "colunaCorreta": 1 },
      { "id": 4, "texto": "COPA", "colunaCorreta": 1 }
    ],
    "respostaCorreta": 1,
    "dificuldade": "normal",
    "categorias": ["_wordassociation"],
    "fontes": [],
    "vantagem": "Associe corretamente para ganhar pontos!",
    "desvantagem": "Associações erradas não pontuam.",
    "dica": "",
    "coluna1Titulo": "Estrutura Vertical",
    "coluna2Titulo": "Estrutura Horizontal"
  },
  {
    "tipo": "Matching",
    "titulo": "Matching Card Example",
    "pergunta": "Relacione os itens corretamente",
    "imageType": "clickable",
    "imagem": "/images/matching.jpg",
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["_matching"],
    "fontes": [],
    "vantagem": "Cada correspondência correta vale pontos!",
    "desvantagem": "Errar pode zerar a rodada.",
    "dica": "",
    "itensA": [
      { "id": 1, "texto": "Reciclagem" },
      { "id": 2, "texto": "Economia de Energia" }
    ],
    "itensB": [
      { "id": 101, "texto": "Separação de Lixo" },
      { "id": 102, "texto": "Uso de LED" }
    ],
    "associacoesCorretas": { "1": 101, "2": 102 }
  },
  {
    "tipo": "Logic",
    "titulo": "Logic Card Example",
    "pergunta": "Qual é o DAP?",
    "imageType": "clickable",
    "imagem": "/images/logic.jpg",
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["_logic"],
    "fontes": [],
    "vantagem": "Resposta correta aumenta pontos!",
    "desvantagem": "Resposta errada penaliza.",
    "dica": "",
    "respostasAceitas": ["dap", "diametro na altura do peito", "diâmetro em peito"]
  }
];

export default _baralhoTeste;
