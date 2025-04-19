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
    "pergunta": "Clique no símbolo univeimages/simbolos_variados.pngrsal da reciclagem na imagem abaixo.",
    "imagemURL": "https://static.escolakids.uol.com.br/2019/09/arvore.jpg", // <-- SUBSTITUA PELO CAMINHO REAL
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
    "pergunta": "A imagem abaixo mostra um exemplo de qual tipo de poluição?<br><img src=\"https://static.escolakids.uol.com.br/2019/09/arvore.jpg\" alt=\"Rio poluído com lixo\" class=\"img-fluid my-2 rounded border\">", // <-- SUBSTITUA CAMINHO
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
    "pergunta": "Observe o diagrama de uma célula vegetal (tente dar zoom para ver detalhes). Qual organela é responsável pela fotossíntese?<br><img src=\"https://static.escolakids.uol.com.br/2019/09/arvore.jpg\" alt=\"Diagrama de célula vegetal\" class=\"img-fluid my-2 rounded border img-zoomable cursor-zoom-in\">", // <-- SUBSTITUA CAMINHO
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
  // 1. Formatação Básica (Negrito, Itálico, Quebra de Linha)
  {
    "id": "html_ex_1",
    "tipo": "Pergunta",
    "titulo": "HTML: Formatação",
    "pergunta": "Qual destes é o <b>principal</b> objetivo da reciclagem?<br><i>Pense no ciclo de vida dos materiais.</i>",
    "opcoes": [
      { "id": 1, "texto": "Apenas economizar espaço em aterros." },
      { "id": 2, "texto": "Reduzir a extração de novas matérias-primas." },
      { "id": 3, "texto": "Gerar empregos (embora seja um benefício)." },
      { "id": 4, "texto": "Tornar o lixo mais bonito." }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["HTML_FormatacaoBasica"],
    "fontes": ["Conceitos de Reciclagem"],
    "vantagem": "Exato! Preservar recursos é fundamental.",
    "desvantagem": "O foco principal é outro.",
    "dica": "O que evitamos ao reutilizar materiais?"
  },

  // 2. Imagem Simples Incorporada
  {
    "id": "html_ex_2",
    "tipo": "Pergunta",
    "titulo": "HTML: Imagem Simples",
    "pergunta": "A imagem abaixo representa qual conceito ecológico?<br><img src=\"https://static.escolakids.uol.com.br/2019/09/arvore.jpg\" alt=\"Símbolo da pegada ecológica\" style=\"display: block; margin: 10px auto; width: 100px; height: auto; border: 1px solid #ccc; padding: 5px;\" class=\"img-fluid rounded\">",
    "opcoes": [
      { "id": 1, "texto": "Ciclo da Água" },
      { "id": 2, "texto": "Pegada Ecológica" },
      { "id": 3, "texto": "Cadeia Alimentar" },
      { "id": 4, "texto": "Bioma" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["HTML_ImagemSimples"],
    "fontes": ["WWF"],
    "vantagem": "Correto! É a Pegada Ecológica.",
    "desvantagem": "Não, este símbolo representa outra coisa.",
    "dica": "Mede o impacto humano nos recursos naturais."
  },

  // 3. Lista Não Ordenada (<ul>)
  {
    "id": "html_ex_3",
    "tipo": "MultiplaEscolha",
    "titulo": "HTML: Lista Não Ordenada",
    "pergunta": "Selecione os itens que <b>NÃO</b> devem ir para a composteira doméstica comum:<ul><li>Restos de frutas e vegetais</li><li>Carnes e laticínios</li><li>Borra de café e filtros de papel</li><li>Produtos de higiene pessoal usados</li><li>Cascas de ovos</li></ul>",
    "opcoes": [
      { "id": 1, "texto": "Restos de frutas e vegetais" },
      { "id": 2, "texto": "Carnes e laticínios" },
      { "id": 3, "texto": "Borra de café" },
      { "id": 4, "texto": "Produtos de higiene pessoal" },
      { "id": 5, "texto": "Cascas de ovos" }
    ],
    "respostaCorreta": [2, 4],
    "dificuldade": "normal",
    "categorias": ["HTML_ListaNaoOrdenada"],
    "fontes": ["Manual de Compostagem"],
    "vantagem": "Exato! Evitar esses itens previne odores e patógenos.",
    "desvantagem": "Alguns desses podem ir para a composteira, outros não.",
    "dica": "Pense no que pode atrair animais ou causar mau cheiro."
  },

  // 4. Lista Ordenada (<ol>)
  {
    "id": "html_ex_4",
    "tipo": "Ordem",
    "titulo": "HTML: Lista Ordenada",
    "pergunta": "A sequência abaixo descreve (de forma simplificada) a formação de chuva ácida. Ordene as opções para completar a lógica:<br><ol><li>Liberação de óxidos (SO₂ e NOx) na atmosfera.</li><li>Reação com vapor d'água formando ácidos.</li><li>______</li><li>Precipitação ácida (chuva, neve).</li></ol>",
    "opcoes": [
      { "id": 1, "texto": "Transporte dos poluentes pelo vento." }
    ],
    "respostaCorreta": [1], // Só há uma opção para encaixar na ordem
    "dificuldade": "facil",
    "categorias": ["HTML_ListaOrdenada"],
    "fontes": ["Química Ambiental"],
    "vantagem": "Sequência lógica correta!",
    "desvantagem": "A etapa que falta é o transporte.",
    "dica": "O que acontece com os poluentes antes de reagirem e caírem?"
  },

  // 5. Link Externo (<a>)
  {
    "id": "html_ex_5",
    "tipo": "Outras",
    "titulo": "HTML: Link Externo",
    "pergunta": "Os Objetivos de Desenvolvimento Sustentável (ODS) são uma agenda global. <a href=\"https://brasil.un.org/pt-br/sdgs\" target=\"_blank\" rel=\"noopener noreferrer\" style=\"color: blue; text-decoration: underline;\">Clique aqui</a> para conhecer mais (abrirá em nova aba). <br><br>Quantos ODS existem?",
    "opcoes": [
      { "id": 1, "texto": "10" },
      { "id": 2, "texto": "17" },
      { "id": 3, "texto": "25" }
    ],
    "respostaCorreta": [2], // A resposta correta é 17
    "dificuldade": "facil",
    "categorias": ["HTML_LinkExterno"],
    "fontes": ["ONU"],
    "vantagem": "Correto! São 17 objetivos importantes.",
    "desvantagem": "Incorreto. São 17 ODS.",
    "dica": "Visite o link para ter certeza!"
  },

  // 6. Imagem Clicável (Intenção) - Usando a URL fornecida
  {
    "id": "html_ex_6",
    "tipo": "Pergunta",
    "titulo": "HTML: Imagem Clicável (Intenção)",
    "pergunta": "Esta imagem mostra um teste. Imagine que você pudesse clicar nela para ver mais detalhes. <br><img src=\"https://rockapps.com.br/wp-content/uploads/2020/09/teste.jpg\" alt=\"Imagem de Teste RockApps\" class=\"img-fluid my-2 rounded border img-clickable cursor-pointer\" style=\"max-width: 200px; height: auto; display: block; margin: auto;\"><br>Qual elemento HTML é usado para exibir imagens?",
    "opcoes": [
      { "id": 1, "texto": "<link>" },
      { "id": 2, "texto": "<pic>" },
      { "id": 3, "texto": "<img>" },
      { "id": 4, "texto": "<image>" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": ["HTML_ImagemClicavel"],
    "fontes": ["HTML Docs"],
    "vantagem": "Correto! A tag <img> é a resposta.",
    "desvantagem": "Essa tag serve para outra coisa.",
    "dica": "É uma abreviação de 'image'."
  },

  // 7. Texto Estilizado (<strong>, style)
  {
    "id": "html_ex_7",
    "tipo": "Vantagem",
    "titulo": "HTML: Texto Estilizado",
    "pergunta": "Parabéns! Você adotou um animal de um abrigo. <strong style=\"color: green;\">Ações como essa fazem a diferença!</strong>",
    "opcoes": [
      { "id": 1, "texto": "Receber Recompensa (+1 Pulo)" }
    ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["HTML_EstiloTexto"],
    "fontes": [],
    "vantagem": "Ganhou 1 Pulo pela boa ação!",
    "desvantagem": "",
    "dica": ""
  },

  // 8. Parágrafos (<p>) e Quebras (<br>)
  {
    "id": "html_ex_8",
    "tipo": "Desvantagem",
    "titulo": "HTML: Parágrafos",
    "pergunta": "<p>Oh não! Um cano estourou na sua casa enquanto você viajava.</p><p>Houve um grande desperdício de água.</p><br>Perca 20 pontos de progresso.",
    "opcoes": [
      { "id": 1, "texto": "Confirmar (-20 Progresso)" }
    ],
    "respostaCorreta": [],
    "dificuldade": "facil",
    "categorias": ["HTML_Paragrafos"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Perdeu 20 de Progresso devido ao vazamento.",
    "dica": ""
  },

  // 9. Combinação (Imagem e Texto Formatado)
  {
    "id": "html_ex_9",
    "tipo": "ContraTempo",
    "titulo": "HTML: Combinado",
    "pergunta": "Rápido! A imagem mostra um painel solar. Qual efeito ele utiliza para gerar eletricidade?<br><img src=\"https://static.escolakids.uol.com.br/2019/09/arvore.jpg\" alt=\"Painel Solar\" class=\"img-fluid my-2 rounded border\" style=\"max-width: 150px; display:block; margin:auto;\"><br><b>Pista:</b> Envolve fótons!",
    "opcoes": [
      { "id": 1, "texto": "Efeito Estufa" },
      { "id": 2, "texto": "Efeito Joule" },
      { "id": 3, "texto": "Efeito Fotoelétrico (Fotovoltaico)" },
      { "id": 4, "texto": "Efeito Doppler" }
    ],
    "respostaCorreta": 3,
    "tempoLimite": 18,
    "dificuldade": "normal",
    "categorias": ["HTML_Combinado"],
    "fontes": ["Física Moderna", "Energia Solar"],
    "vantagem": "Correto! É o efeito fotoelétrico.",
    "desvantagem": "Não, o efeito é outro.",
    "dica": "O nome 'Fotovoltaico' vem disso."
  },

  // 10. Tabela Simples (<table>)
  {
    "id": "html_ex_10",
    "tipo": "Pergunta",
    "titulo": "HTML: Tabela Simples",
    "pergunta": "A tabela compara o consumo de água. Qual atividade gasta <strong>MAIS</strong> água?<br><table class=\"simple-table my-2\" style=\"width: 80%; margin: auto; border-collapse: collapse; text-align: left;\"><thead><tr style=\"border-bottom: 1px solid #ccc;\"><th style=\"padding: 4px;\">Atividade</th><th style=\"padding: 4px;\">Consumo (Litros)</th></tr></thead><tbody><tr><td style=\"padding: 4px;\">Lavar Louça (15min)</td><td style=\"padding: 4px;\">~117 L</td></tr><tr><td style=\"padding: 4px;\">Tomar Banho (5min)</td><td style=\"padding: 4px;\">~45 L</td></tr><tr><td style=\"padding: 4px;\">Escovar Dentes (torneira aberta)</td><td style=\"padding: 4px;\">~12 L</td></tr></tbody></table>",
    "opcoes": [
      { "id": 1, "texto": "Lavar Louça" },
      { "id": 2, "texto": "Tomar Banho" },
      { "id": 3, "texto": "Escovar Dentes" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "facil",
    "categorias": ["HTML_TabelaSimples"],
    "fontes": ["Dados de Consumo Médio"],
    "vantagem": "Correto! Lavar louça pode gastar muita água.",
    "desvantagem": "Observe os valores na tabela.",
    "dica": "Compare os números na coluna 'Consumo'."
  },
  {
    "id": "html_img_click_rockapps",
    "tipo": "Pergunta",
    "titulo": "HTML: Imagem Clicável Exemplo",
    "pergunta": "A imagem abaixo é um exemplo. <br><i>(Imagine que clicar nela revelaria mais informações)</i><br><br><img src=\"https://rockapps.com.br/wp-content/uploads/2020/09/teste.jpg\" alt=\"Imagem de Teste da RockApps\" class=\"img-fluid my-2 rounded border img-clickable cursor-pointer\" style=\"max-width: 250px; height: auto; display: block; margin: auto;\"><br><br>Qual tecnologia <strong>NÃO</strong> é comumente usada no desenvolvimento Front-End moderno?",
    "opcoes": [
      { "id": 1, "texto": "React" },
      { "id": 2, "texto": "Vue.js" },
      { "id": 3, "texto": "PHP (Lado Servidor)" },
      { "id": 4, "texto": "CSS / Tailwind" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": ["HTML_ImagemClicavelExemplo"],
    "fontes": ["Conhecimento Geral WebDev"],
    "vantagem": "Correto! PHP geralmente roda no servidor.",
    "desvantagem": "Incorreto. Essa tecnologia é comum no front-end.",
    "dica": "Pense em qual tecnologia é primariamente executada no servidor web, não no navegador do usuário."
  },
  {
    "id": "ex_img_clicavel_1",
    "tipo": "Pergunta", // Poderia ser Outras, depende da interação desejada
    "titulo": "Exemplo: Imagem Clicável (Intenção)",
    "pergunta": "A imagem mostra diferentes tipos de lixeiras da coleta seletiva. Qual cor representa o VIDRO? (Imagine clicar na lixeira correta)<br><img src=\"https://static.escolakids.uol.com.br/2019/09/arvore.jpg\" alt=\"Lixeiras coloridas da coleta seletiva\" class=\"img-fluid my-2 rounded border img-clickable cursor-pointer\">", // <-- SUBSTITUA CAMINHO
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
