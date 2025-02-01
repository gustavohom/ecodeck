const meu_baralho = [
  // Cartas originais existentes (exemplos)
  {
    "tipo": "Pergunta",
    "titulo": "Pergunta 1",
    "pergunta": "<img src=\"/7.jpg\" alt=\"Pergunta 1\" class=\"img-media my-4\" />\nPergunta com imagem e facil",
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      { "id": 1, "texto": "errado" },
      { "id": 2, "texto": "errado" },
      { "id": 3, "texto": "certo" },
      { "id": 4, "texto": "errado" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": ["_baralhoTeste"],
    "fontes": ["fonte 1", "fonte 2", "fonte 3"],
    "vantagem": "Vant",
    "desvantagem": "Desvant",
    "dica": "Dica"
  },
  {
    "tipo": "MultiplaEscolha",
    "titulo": "Multipla Escolha 3",
    "pergunta": "Multipla escolha dificil",
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      { "id": 1, "texto": "errada" },
      { "id": 2, "texto": "certa" },
      { "id": 3, "texto": "certa" },
      { "id": 4, "texto": "errada" }
    ],
    "respostaCorreta": [2, 3],
    "dificuldade": "dificil",
    "categorias": ["_baralhoTeste"],
    "fontes": ["fonte 1", "fonte 2", "fonte 3"],
    "vantagem": "vant",
    "desvantagem": "desv",
    "dica": "dica"
  },
  // NOVAS CARTAS DINÂMICAS:
  {
    "tipo": "Quiz",
    "titulo": "Quiz Card Example",
    "pergunta": "Responda o máximo de perguntas possíveis!",
    "imageType": "clickable",
    "imagem": "",
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
        "pergunta": "Qual é a cor da natureza?",
        "opcoes": [
          { "id": 1, "texto": "Azul" },
          { "id": 2, "texto": "Verde" },
          { "id": 3, "texto": "Vermelho" }
        ],
        "respostaCorreta": 2
      },
      {
        "pergunta": "Qual destes é renovável?",
        "opcoes": [
          { "id": 1, "texto": "Petróleo" },
          { "id": 2, "texto": "Energia solar" },
          { "id": 3, "texto": "Carvão" }
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
    "imagem": "",
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
    "imagem": "",
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
    "imagem": "",
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
    "imagem": "",
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["_memory"],
    "fontes": [],
    "vantagem": "Bônus se lembrar da sequência completa!",
    "desvantagem": "Erros podem reduzir pontos.",
    "dica": "",
    "sequencia": ["Sol", "Água", "Terra"]
  },
  {
    "tipo": "WordAssociation",
    "titulo": "Word Association Example",
    "pergunta": "Associe os termos corretamente",
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      { "id": 1, "texto": "DAP", "colunaCorreta": 2 },
      { "id": 2, "texto": "ÁREA BASAL", "colunaCorreta": 2 },
      { "id": 3, "texto": "ALTURA", "colunaCorreta": 1 },
      { "id": 4, "texto": "COPA", "colunaCorreta": 1 }
    ],
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
    "imagem": "",
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
    "imagem": "",
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

export default meu_baralho;
