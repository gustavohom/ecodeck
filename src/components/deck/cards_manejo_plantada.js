const manejo = [

  // --- Exemplos por Tipo de Carta ---
  {
    "id": "ex_pergunta_1",
    "tipo": "Pergunta",
    "titulo": "Exemplo: Pergunta Simples",
    "pergunta": "Qual a cor primária resultante da mistura de azul e amarelo?",
    "opcoes": [
      { "id": 1, "texto": "Vermelho" },
      { "id": 2, "texto": "Verde" },
      { "id": 3, "texto": "Laranja" },
      { "id": 4, "texto": "Roxo" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["Exemplo_Pergunta"],
    "fontes": ["Teoria das Cores Básica"],
    "vantagem": "Correto, é verde!",
    "desvantagem": "Incorreto, a mistura dá verde.",
    "dica": "Pense nas cores das folhas das árvores."
  },
  {
    "id": "ex_multi_1",
    "tipo": "MultiplaEscolha",
    "titulo": "Exemplo: Múltipla Escolha",
    "pergunta": "Selecione os itens que normalmente são recicláveis na coleta seletiva comum:",
    "opcoes": [
      { "id": 1, "texto": "Garrafa PET" },
      { "id": 2, "texto": "Papelão limpo" },
      { "id": 3, "texto": "Pilha comum" },
      { "id": 4, "texto": "Lata de alumínio" },
      { "id": 5, "texto": "Espelho quebrado" }
    ],
    "respostaCorreta": [1, 2, 4],
    "dificuldade": "normal",
    "categorias": ["Exemplo_MultiplaEscolha"],
    "fontes": ["Manual de Reciclagem"],
    "vantagem": "Boa separação!",
    "desvantagem": "Alguns itens aí não vão para a reciclagem comum.",
    "dica": "Pilhas e espelhos geralmente têm descarte especial."
  },
  {
    "id": "ex_ordem_1",
    "tipo": "Ordem",
    "titulo": "Exemplo: Ordem Cronológica",
    "pergunta": "Ordene as etapas básicas do tratamento de água:",
    "opcoes": [
      { "id": 1, "texto": "Filtração" },
      { "id": 2, "texto": "Decantação" },
      { "id": 3, "texto": "Cloração/Desinfecção" },
      { "id": 4, "texto": "Coagulação/Floculação" }
    ],
    "respostaCorreta": [4, 2, 1, 3],
    "dificuldade": "normal",
    "categorias": ["Exemplo_Ordem"],
    "fontes": ["Saneamento Básico"],
    "vantagem": "Processo correto!",
    "desvantagem": "A ordem das etapas está trocada.",
    "dica": "Primeiro agrupa a sujeira, depois ela desce..."
  },
  {
    "id": "ex_vantagem_1",
    "tipo": "Vantagem",
    "titulo": "Exemplo: Vantagem",
    "pergunta": "Você participou de um mutirão de limpeza na praia!",
    "opcoes": [
      { "id": 1, "texto": "Que legal! Avance 20 de Progresso." }
    ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Exemplo_Vantagem"],
    "fontes": [],
    "vantagem": "Ação recompensada com +20 Progresso!",
    "desvantagem": "",
    "dica": ""
  },
  {
    "id": "ex_desvantagem_1",
    "tipo": "Desvantagem",
    "titulo": "Exemplo: Desvantagem",
    "pergunta": "Eita! Você esqueceu a luz acesa ao sair de casa por um dia inteiro.",
    "opcoes": [
      { "id": 1, "texto": "Ops! Fique uma rodada preso." }
    ],
    "respostaCorreta": [],
    "dificuldade": "facil",
    "categorias": ["Exemplo_Desvantagem"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Desperdício de energia! Fique 1 rodada preso.",
    "dica": ""
  },
  {
    "id": "ex_outras_1",
    "tipo": "Outras",
    "titulo": "Exemplo: Outras (Escolha)",
    "pergunta": "Você encontra uma carteira perdida. O que você faz?",
    "opcoes": [
      { "id": 1, "texto": "Procuro o dono ou entrego às autoridades (+1 Estrela Fixa)" },
      { "id": 2, "texto": "Pego o dinheiro e deixo a carteira (-20 Progresso)" }
    ],
    "respostaCorreta": [1], // Define qual é a ação "correta" ou esperada
    "dificuldade": "normal",
    "categorias": ["Exemplo_Outras"],
    "fontes": [],
    "vantagem": "Honestidade recompensada!", // Se escolher 1
    "desvantagem": "Ação desonesta tem consequências.", // Se escolher 2
    "dica": "Faça a coisa certa."
  },
  {
    "id": "ex_ct_1",
    "tipo": "ContraTempo",
    "titulo": "Exemplo: Contra o Tempo",
    "pergunta": "Rápido! Qual destes animais NÃO é um mamífero?",
    "opcoes": [
      { "id": 1, "texto": "Baleia" },
      { "id": 2, "texto": "Morcego" },
      { "id": 3, "texto": "Pinguim" },
      { "id": 4, "texto": "Ornitorrinco" }
    ],
    "respostaCorreta": 3,
    "tempoLimite": 12,
    "dificuldade": "facil",
    "categorias": ["Exemplo_ContraTempo"],
    "fontes": ["Biologia Animal"],
    "vantagem": "Veloz e correto!",
    "desvantagem": "Tempo esgotado ou resposta errada.",
    "dica": "Pense em aves que não voam."
  },
  {
    "id": "ex_rc_1",
    "tipo": "RelacionarColunas",
    "titulo": "Exemplo: Relacionar Colunas",
    "pergunta": "Associe o resíduo ao seu tempo aproximado de decomposição:",
    "colunaA": [
      { "id": 1, "texto": "Papel" },
      { "id": 2, "texto": "Lata de Alumínio" },
      { "id": 3, "texto": "Garrafa Plástica" },
      { "id": 4, "texto": "Vidro" }
    ],
    "colunaB": [
      { "id": 10, "texto": "Centenas de anos (200-500)" },
      { "id": 11, "texto": "Tempo indeterminado (milhares de anos)" },
      { "id": 12, "texto": "Meses (3-6 meses)" },
      { "id": 13, "texto": "Muito longo (mais de 400 anos)" }
    ],
    "respostaCorreta": [
      { "aId": 1, "bId": 12 },
      { "aId": 2, "bId": 10 },
      { "aId": 3, "bId": 13 },
      { "aId": 4, "bId": 11 }
    ],
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["Exemplo_RelacionarColunas"],
    "fontes": ["Dados Ambientais"],
    "vantagem": "Associações corretas!",
    "desvantagem": "Tempos de decomposição misturados.",
    "dica": "Alguns materiais duram muito mais que outros."
  },
  {
    "id": "ex_pc_1",
    "tipo": "PontoCerto",
    "titulo": "Exemplo: Ponto Certo",
    "pergunta": "Clique no símbolo universal da reciclagem na imagem abaixo.",
    "imagemURL": "/images/simbolos_variados.png", // <-- SUBSTITUA PELO CAMINHO REAL
    "zonasClicaveis": [
      // Coordenadas e dimensões como fração da imagem (0 a 1)
      { "id": 1, "x": 0.1, "y": 0.1, "largura": 0.3, "altura": 0.3, "descricao": "Símbolo Reciclagem" }, // Correta
      { "id": 2, "x": 0.6, "y": 0.1, "largura": 0.3, "altura": 0.3, "descricao": "Símbolo Inflamável" },
      { "id": 3, "x": 0.1, "y": 0.6, "largura": 0.3, "altura": 0.3, "descricao": "Símbolo Orgânico" },
      { "id": 4, "x": 0.6, "y": 0.6, "largura": 0.3, "altura": 0.3, "descricao": "Símbolo Radioativo" }
    ],
    "respostaCorreta": 1,
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["Exemplo_PontoCerto"],
    "fontes": ["Sinalização Universal"],
    "vantagem": "Clicou no símbolo certo!",
    "desvantagem": "Este é outro símbolo.",
    "dica": "São três setas formando um ciclo."
  },
   {
    "id": "ex_cf_1",
    "tipo": "CompletarFrase",
    "titulo": "Exemplo: Completar Frase",
    "pergunta": "Complete a frase sobre o ciclo da água:",
    "fraseIncompleta": "A água __1__ dos rios e oceanos, forma __2__ através da condensação, e retorna à Terra como __3__.",
    "fragmentos": [
      { "id": 1, "texto": "precipitação" },
      { "id": 2, "texto": "evapora" },
      { "id": 3, "texto": "nuvens" },
      { "id": 4, "texto": "geleiras" },
      { "id": 5, "texto": "infiltra" }
    ],
    "respostaCorreta": [2, 3, 1], // evapora, nuvens, precipitação
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["Exemplo_CompletarFrase"],
    "fontes": ["Ciclo Hidrológico"],
    "vantagem": "Ciclo completo!",
    "desvantagem": "As etapas do ciclo se confundiram.",
    "dica": "Sobe como vapor, vira gota, cai."
  },

  // --- Exemplos com Imagens HTML ---
  {
    "id": "ex_img_simples_1",
    "tipo": "Pergunta",
    "titulo": "Exemplo: Imagem Simples",
    "pergunta": "A imagem abaixo mostra um exemplo de qual tipo de poluição?<br><img src=\"/images/rio_poluido.jpg\" alt=\"Rio poluído com lixo\" class=\"img-fluid my-2 rounded border\">", // <-- SUBSTITUA CAMINHO
    "opcoes": [
      { "id": 1, "texto": "Poluição Sonora" },
      { "id": 2, "texto": "Poluição Visual" },
      { "id": 3, "texto": "Poluição Hídrica" },
      { "id": 4, "texto": "Poluição do Ar" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": ["Exemplo_ImagemSimples"],
    "fontes": ["Foto Ilustrativa"],
    "vantagem": "Correto, é a poluição da água.",
    "desvantagem": "Observe a imagem com atenção.",
    "dica": "O que está sendo afetado na foto?"
  },
  {
    "id": "ex_img_zoom_1",
    "tipo": "Pergunta",
    "titulo": "Exemplo: Imagem com Zoom (Intenção)",
    "pergunta": "Observe o diagrama de uma célula vegetal (tente dar zoom para ver detalhes). Qual organela é responsável pela fotossíntese?<br><img src=\"/images/celula_vegetal_diagrama.png\" alt=\"Diagrama de célula vegetal\" class=\"img-fluid my-2 rounded border img-zoomable cursor-zoom-in\">", // <-- SUBSTITUA CAMINHO
    "opcoes": [
      { "id": 1, "texto": "Mitocôndria" },
      { "id": 2, "texto": "Núcleo" },
      { "id": 3, "texto": "Vacúolo" },
      { "id": 4, "texto": "Cloroplasto" }
    ],
    "respostaCorreta": 4,
    "dificuldade": "normal",
    "categorias": ["Exemplo_ImagemZoom"],
    "fontes": ["Biologia Celular"],
    "vantagem": "Exato! São os cloroplastos.",
    "desvantagem": "Esta organela tem outra função.",
    "dica": "Procure pela estrutura verde dentro da célula."
  },
  {
    "id": "ex_img_clicavel_1",
    "tipo": "Pergunta", // Poderia ser Outras, depende da interação desejada
    "titulo": "Exemplo: Imagem Clicável (Intenção)",
    "pergunta": "A imagem mostra diferentes tipos de lixeiras da coleta seletiva. Qual cor representa o VIDRO? (Imagine clicar na lixeira correta)<br><img src=\"/images/lixeiras_coleta.png\" alt=\"Lixeiras coloridas da coleta seletiva\" class=\"img-fluid my-2 rounded border img-clickable cursor-pointer\">", // <-- SUBSTITUA CAMINHO
    "opcoes": [
      { "id": 1, "texto": "Azul" },
      { "id": 2, "texto": "Amarelo" },
      { "id": 3, "texto": "Verde" },
      { "id": 4, "texto": "Vermelho" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": ["Exemplo_ImagemClicavel"],
    "fontes": ["Padrão Coleta Seletiva"],
    "vantagem": "Correto, vidro é na lixeira verde!",
    "desvantagem": "Cor incorreta para o vidro.",
    "dica": "Lembre das cores: papel, metal, vidro, plástico."
  }
];

export default manejo;