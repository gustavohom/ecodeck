const ecologia_forestal_cards = [
  {
    "id": "json_pergunta_1",
    "tipo": "Pergunta",
    "titulo": "Principal Gás Estufa",
    "pergunta": "Qual é o principal gás de efeito estufa liberado pela queima de combustíveis fósseis?",
    "opcoes": [
      { "id": 1, "texto": "Oxigênio (O₂)" },
      { "id": 2, "texto": "Nitrogênio (N₂)" },
      { "id": 3, "texto": "Dióxido de Carbono (CO₂)" },
      { "id": 4, "texto": "Hidrogênio (H₂)" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": ["Aquecimento Global", "Poluição"],
    "fontes": ["IPCC Report"],
    "vantagem": "Correto! O CO₂ é um grande vilão.",
    "desvantagem": "Incorreto. O principal é o CO₂.",
    "dica": "Pense no gás que mais falamos sobre mudanças climáticas."
  },

  // --- MultiplaEscolha ---
  {
    "id": "json_multi_1",
    "tipo": "MultiplaEscolha",
    "titulo": "Energias Renováveis",
    "pergunta": "Quais das seguintes são fontes de energia renovável?",
    "opcoes": [
      { "id": 1, "texto": "Energia Solar" },
      { "id": 2, "texto": "Gás Natural" },
      { "id": 3, "texto": "Energia Eólica" },
      { "id": 4, "texto": "Carvão Mineral" },
      { "id": 5, "texto": "Energia Geotérmica" }
    ],
    "respostaCorreta": [1, 3, 5],
    "dificuldade": "normal",
    "categorias": ["Energia Renovável"],
    "fontes": ["Ministério de Minas e Energia"],
    "vantagem": "Excelente! Você conhece as fontes limpas.",
    "desvantagem": "Algumas dessas fontes não são renováveis.",
    "dica": "Renovável significa que a fonte se regenera naturalmente."
  },

  // --- Ordem ---
  {
    "id": "json_ordem_1",
    "tipo": "Ordem",
    "titulo": "Os 5 R's da Sustentabilidade",
    "pergunta": "Coloque os 5 R's da sustentabilidade na ordem geralmente recomendada (do mais ao menos prioritário):",
    "opcoes": [
      { "id": 1, "texto": "Reciclar" },
      { "id": 2, "texto": "Repensar" },
      { "id": 3, "texto": "Reutilizar" },
      { "id": 4, "texto": "Recusar" },
      { "id": 5, "texto": "Reduzir" }
    ],
    "respostaCorreta": [2, 4, 5, 3, 1], // Repensar, Recusar, Reduzir, Reutilizar, Reciclar
    "dificuldade": "dificil",
    "categorias": ["Sustentabilidade", "Consumo Consciente"],
    "fontes": ["Instituto Akatu"],
    "vantagem": "Ordem perfeita! A prioridade é a chave.",
    "desvantagem": "A ordem está um pouco fora de lugar.",
    "dica": "O primeiro passo é questionar a necessidade."
  },

  // --- Vantagem ---
  {
    "id": "json_vantagem_1",
    "tipo": "Vantagem",
    "titulo": "Compostagem Caseira",
    "pergunta": "Você iniciou uma composteira em casa! Isso reduz o lixo orgânico e gera adubo.",
    "opcoes": [
      { "id": 1, "texto": "Ótimo! Ganhe 1 Pulo extra." }
    ],
    "respostaCorreta": [1], // O jogador apenas clica para confirmar
    "dificuldade": "facil",
    "categorias": ["Resíduos", "Sustentabilidade"],
    "fontes": [],
    "vantagem": "Recebeu 1 Pulo!", // Efeito a ser aplicado pelo jogo
    "desvantagem": "",
    "dica": ""
  },

  // --- Desvantagem ---
  {
    "id": "json_desvantagem_1",
    "tipo": "Desvantagem",
    "titulo": "Vazamento de Óleo",
    "pergunta": "Um pequeno vazamento de óleo do seu carro não foi consertado e contaminou o solo.",
    "opcoes": [
      { "id": 1, "texto": "Que pena! Perca 15 de Progresso." }
    ],
    "respostaCorreta": [], // Nenhuma opção é "correta", apenas confirmação
    "dificuldade": "facil",
    "categorias": ["Poluição", "Manutenção"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Perdeu 15 de Progresso.", // Efeito a ser aplicado
    "dica": ""
  },

  // --- Outras ---
  {
    "id": "json_outras_1",
    "tipo": "Outras",
    "titulo": "Evento Climático Extremo",
    "pergunta": "Uma enchente atingiu a região. Você ajudou os vizinhos ou ficou em casa?",
    "opcoes": [
      { "id": 1, "texto": "Ajudei os vizinhos (Ganhe 1 Estrela Bônus)" },
      { "id": 2, "texto": "Fiquei em casa (Sem efeito)" }
    ],
    "respostaCorreta": [1, 2], // Ambas são "válidas" no sentido de escolha
    "dificuldade": "normal",
    "categorias": ["Eventos Climáticos", "Comunidade"],
    "fontes": [],
    "vantagem": "Ação comunitária recompensada!", // Se escolher 1
    "desvantagem": "A segurança é importante.", // Se escolher 2
    "dica": "Solidariedade fortalece a resiliência."
  },

  // --- ContraTempo ---
  {
    "id": "json_ct_1",
    "tipo": "ContraTempo",
    "titulo": "Coleta Seletiva Rápida",
    "pergunta": "Em qual lixeira se descarta uma garrafa PET?",
    "opcoes": [
      { "id": 1, "texto": "Azul (Papel)" },
      { "id": 2, "texto": "Amarelo (Metal)" },
      { "id": 3, "texto": "Verde (Vidro)" },
      { "id": 4, "texto": "Vermelho (Plástico)" }
    ],
    "respostaCorreta": 4,
    "tempoLimite": 10, // 10 segundos
    "dificuldade": "facil",
    "categorias": ["Reciclagem", "Resíduos"],
    "fontes": ["CONAMA"],
    "vantagem": "Rápido e correto na separação!",
    "desvantagem": "Tempo esgotado ou lixeira errada!",
    "dica": "Lembre-se das cores padrão da coleta seletiva."
  },

  // --- RelacionarColunas ---
  {
    "id": "json_rc_1",
    "tipo": "RelacionarColunas",
    "titulo": "Biomas Brasileiros",
    "pergunta": "Associe o Bioma à sua característica principal:",
    "colunaA": [
      { "id": 1, "texto": "Amazônia" },
      { "id": 2, "texto": "Cerrado" },
      { "id": 3, "texto": "Caatinga" },
      { "id": 4, "texto": "Mata Atlântica" }
    ],
    "colunaB": [
      { "id": 10, "texto": "Savana com árvores tortuosas" },
      { "id": 11, "texto": "Floresta tropical úmida e densa" },
      { "id": 12, "texto": "Região semiárida com plantas adaptadas à seca" },
      { "id": 13, "texto": "Floresta costeira com alta biodiversidade" }
    ],
    "respostaCorreta": [
      { "aId": 1, "bId": 11 },
      { "aId": 2, "bId": 10 },
      { "aId": 3, "bId": 12 },
      { "aId": 4, "bId": 13 }
    ],
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["Biomas", "Ecologia", "Brasil"],
    "fontes": ["IBGE"],
    "vantagem": "Você conhece bem os biomas do Brasil!",
    "desvantagem": "Algumas associações estão incorretas.",
    "dica": "Pense nas paisagens típicas de cada região."
  },

  // --- PontoCerto ---
  {
    "id": "json_pc_1",
    "tipo": "PontoCerto",
    "titulo": "Partes da Árvore",
    "pergunta": "Clique na Copa da árvore (parte superior com folhas e galhos).",
    "imagemURL": "/images/diagrama_arvore.png", // <-- SUBSTITUA PELO CAMINHO REAL DA SUA IMAGEM
    "zonasClicaveis": [
      { "id": 1, "x": 0.1, "y": 0.05, "largura": 0.8, "altura": 0.45, "descricao": "Copa" }, // Correta
      { "id": 2, "x": 0.4, "y": 0.5, "largura": 0.2, "altura": 0.4, "descricao": "Tronco" },
      { "id": 3, "x": 0.2, "y": 0.9, "largura": 0.6, "altura": 0.1, "descricao": "Raízes (solo)" }
    ],
    "respostaCorreta": 1,
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["Botânica", "Árvores"],
    "fontes": ["Livro de Biologia"],
    "vantagem": "Exato! Bem na copa.",
    "desvantagem": "O clique foi um pouco fora da copa.",
    "dica": "É a parte mais alta e cheia de folhas."
  },

  // --- CompletarFrase ---
   {
    "id": "json_cf_1",
    "tipo": "CompletarFrase",
    "titulo": "Fotossíntese",
    "pergunta": "Complete a frase sobre a fotossíntese:",
    "fraseIncompleta": "As plantas usam __1__, __2__ e luz solar para produzir __3__ (seu alimento) e liberar __4__.",
    "fragmentos": [
      { "id": 1, "texto": "água" },
      { "id": 2, "texto": "oxigênio (O₂)" },
      { "id": 3, "texto": "dióxido de carbono (CO₂)" },
      { "id": 4, "texto": "glicose" },
      { "id": 5, "texto": "nitrogênio (N₂)" }
    ],
    "respostaCorreta": [1, 3, 4, 2], // água, CO₂, glicose, O₂
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["Botânica", "Ecologia Básica", "Ciclos Naturais"],
    "fontes": ["Livro de Ciências"],
    "vantagem": "Frase completa e cientificamente correta!",
    "desvantagem": "A ordem dos fatores alterou o produto!",
    "dica": "O que as plantas absorvem vs. o que elas liberam?"
  }
];

export default ecologia_forestal_cards;