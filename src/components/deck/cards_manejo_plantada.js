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
    "id": "html_popup_target_1",
    "tipo": "Pergunta",
    "titulo": "HTML: Imagem Popup (CSS :target)",
    "pergunta": "Observe a imagem (clique para ampliar). Que tipo de interface ela mostra?<br><br>\n\n<!-- CSS para o Popup (incorporado na pergunta) -->\n<style>\n  .popup-overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.75); /* Fundo escuro semi-transparente */\n    display: none; /* Escondido por padrão */\n    justify-content: center;\n    align-items: center;\n    z-index: 1000; /* Para ficar sobre outros elementos */\n    padding: 20px; /* Espaçamento interno */\n    box-sizing: border-box;\n  }\n  .popup-overlay:target {\n    display: flex; /* Mostra quando é o alvo */\n  }\n  .popup-content {\n    position: relative;\n    background-color: #fff;\n    padding: 20px;\n    border-radius: 8px;\n    max-width: 90%;\n    max-height: 90%;\n    overflow: auto; /* Barra de rolagem se a imagem for muito grande */\n  }\n  .popup-content img {\n    display: block;\n    max-width: 100%;\n    max-height: 80vh; /* Limita altura da imagem */\n    height: auto;\n    margin: 0 auto 15px auto; /* Centraliza e dá espaço abaixo */\n  }\n  .popup-close {\n    position: absolute;\n    top: 10px;\n    right: 15px;\n    font-size: 24px;\n    font-weight: bold;\n    color: #555;\n    text-decoration: none;\n    line-height: 1;\n  }\n  .popup-close:hover {\n    color: #000;\n  }\n  .image-thumbnail-link img {\n    cursor: zoom-in;\n    border: 1px solid #ccc;\n    padding: 3px;\n    border-radius: 4px;\n    background: white;\n    max-width: 180px; /* Tamanho da miniatura */\n    height: auto;\n    display: block;\n    margin: 10px auto;\n  }\n</style>\n\n<!-- Link que ativa o Popup -->\n<a href=\"#rockapps-popup\" class=\"image-thumbnail-link\">\n  <img \n    src=\"https://rockapps.com.br/wp-content/uploads/2020/09/teste.jpg\" \n    alt=\"Clique para ampliar - Teste RockApps\"\n  />\n</a>\n\n<!-- O Popup (escondido por padrão) -->\n<div id=\"rockapps-popup\" class=\"popup-overlay\">\n  <div class=\"popup-content\">\n    <a href=\"#\" class=\"popup-close\" title=\"Fechar\">×</a>\n    <img \n      src=\"https://rockapps.com.br/wp-content/uploads/2020/09/teste.jpg\" \n      alt=\"Imagem Ampliada - Teste RockApps\"\n    />\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">Teste RockApps</p>\n  </div>\n</div>\n\n<br><strong>Pergunta:</strong> A imagem parece ser um teste de qual tipo de aplicativo?",
    "opcoes": [
      { "id": 1, "texto": "Aplicativo de Clima" },
      { "id": 2, "texto": "Aplicativo Bancário/Financeiro" },
      { "id": 3, "texto": "Aplicativo de Rede Social" },
      { "id": 4, "texto": "Aplicativo de Jogo" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["HTML_PopupTarget"],
    "fontes": ["Imagem Fornecida"],
    "vantagem": "Correto! Parece uma interface financeira.",
    "desvantagem": "Incorreto, observe os elementos da interface.",
    "dica": "Gráficos, valores e talvez opções de investimento sugerem um tipo específico."
  },
  // 1. Carta Loja de Trocas
  {
    "id": "shop_card_1",
    "tipo": "Outras", // Usamos 'Outras' para que as opções padrão do React funcionem como botões de compra
    "titulo": "Loja de Trocas Sustentáveis",
    "pergunta": "<div style='text-align: center; padding: 10px; border: 2px dashed #66c2a5; border-radius: 8px; background-color: #f0f7f6;'>\n  <h4 style='margin-bottom: 15px; color: #166534;'>Bem-vindo(a) à Loja!</h4>\n  <p style='font-size: 0.9em; margin-bottom: 20px;'>Troque seus pontos de esforço (barra de progresso cheia ou estrelas bônus - conforme regra do jogo) por benefícios!</p>\n  \n  <div style='display: flex; justify-content: space-around; flex-wrap: wrap; gap: 15px;'>\n    \n    <!-- Item 1: Pulo -->\n    <div style='border: 1px solid #ccc; padding: 10px; border-radius: 5px; width: 120px; background-color: white;'>\n      <span style='font-size: 2em; display: block; text-align: center;'>⏭️</span> \n      <p style='font-weight: bold; margin-top: 5px; text-align: center;'>Pulo Extra</p>\n      <p style='font-size: 0.8em; text-align: center; color: #555;'>(+1 Pulo)</p>\n      <p style='font-size: 0.7em; text-align: center; color: #888;'>Custo: Esforço</p>\n    </div>\n    \n    <!-- Item 2: Estrela Bônus -->\n    <div style='border: 1px solid #ccc; padding: 10px; border-radius: 5px; width: 120px; background-color: white;'>\n      <span style='font-size: 2em; display: block; text-align: center;'>⭐</span> \n      <p style='font-weight: bold; margin-top: 5px; text-align: center;'>Estrela Bônus</p>\n      <p style='font-size: 0.8em; text-align: center; color: #555;'>(+1 Estrela)</p>\n       <p style='font-size: 0.7em; text-align: center; color: #888;'>Custo: Esforço</p>\n    </div>\n\n     <!-- Adicione mais itens aqui se desejar -->\n\n  </div>\n  <p style='font-size: 0.9em; margin-top: 20px;'>Escolha o item desejado clicando na opção correspondente abaixo:</p>\n</div>",
    "opcoes": [
      // As opções correspondem aos itens da loja. O React renderiza estes botões.
      { "id": 101, "texto": "Comprar Pulo Extra (+1)" },
      { "id": 102, "texto": "Comprar Estrela Bônus (+1)" },
      { "id": 103, "texto": "Não comprar nada desta vez" } // Opção para sair
    ],
    // A resposta correta aqui define qual opção dá qual benefício na lógica 'verificarResposta'
    "respostaCorreta": [101, 102], // IDs das opções que concedem algo
    "dificuldade": "normal", // Dificuldade não se aplica muito aqui
    "categorias": ["Mecânica_Loja"],
    "fontes": [],
    "vantagem": "Compra efetuada com sucesso!", // Mensagem para opção 101 ou 102
    "desvantagem": "Ok, talvez na próxima!", // Mensagem para opção 103
    "dica": "Use seus recursos com sabedoria!"
  },

  // 2. Carta Baú da Sorte (com CSS :target)
  {
    "id": "luck_chest_1",
    "tipo": "Vantagem", // O ato de abrir já é uma vantagem (receberá o efeito padrão da vantagem)
    "titulo": "Baú da Sorte!",
    "pergunta": "<style>\n  .chest-overlay {\n    position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n    background-color: rgba(0, 0, 0, 0.8); display: none; justify-content: center;\n    align-items: center; z-index: 1000; padding: 20px; box-sizing: border-box;\n  }\n  .chest-overlay:target { display: flex; }\n  .chest-content {\n    position: relative; background-color: #fff; padding: 30px; border-radius: 10px;\n    max-width: 90%; max-height: 90%; overflow: auto; text-align: center;\n    background: linear-gradient(145deg, #ffffff, #e6e6e6);\n    box-shadow: 5px 5px 15px #bebebe, -5px -5px 15px #ffffff;\n    border: 3px solid #b48b59; /* Cor de madeira */\n  }\n  .chest-content img {\n    display: block; max-width: 150px; height: auto; margin: 0 auto 20px auto;\n  }\n  .chest-close {\n    position: absolute; top: 5px; right: 10px; font-size: 28px; font-weight: bold;\n    color: #8c6b44; text-decoration: none; line-height: 1;\n  }\n  .chest-close:hover { color: #5a442a; }\n  .chest-trigger img {\n    cursor: pointer; border: 2px solid #8c6b44; padding: 5px; border-radius: 8px;\n    background: #f5e5c3; max-width: 150px; height: auto; display: block; margin: 20px auto;\n    transition: transform 0.2s ease-in-out;\n  }\n  .chest-trigger:hover img { transform: scale(1.05); }\n</style>\n\n<p style='text-align:center; margin-bottom: 15px;'>Você encontrou um Baú da Sorte! O que será que tem dentro?</p>\n\n<!-- Link que ativa o Popup do Baú -->\n<a href=\"#chest-prize-1\" class=\"chest-trigger\">\n  <img \n    src=\"/img/moedas/bau-de-tesouro.png\" \n    alt=\"Clique para abrir o baú\"\n  />\n</a>\n\n<!-- O Popup do Baú (escondido por padrão) -->\n<div id=\"chest-prize-1\" class=\"chest-overlay\">\n  <div class=\"chest-content\">\n    <a href=\"#\" class=\"chest-close\" title=\"Fechar\">×</a>\n    <img \n      src=\"/img/moedas/casca-de-ovo.png\" \n      alt=\"Baú Aberto com Estrelas\"\n    />\n    <h4 style='margin-bottom: 10px; color: #ca8a04;'>Prêmio Revelado!</h4>\n    <!-- *** O PRÊMIO ESPECÍFICO DESTA CARTA VAI AQUI *** -->\n    <p style='font-size: 1.1em; font-weight: bold;'>Você ganhou +2 Estrelas Bônus!</p> \n    <!-- ************************************************* -->\n  </div>\n</div>\n<p style='text-align:center; font-size: 0.9em; color: #555;'>Clique no baú para descobrir!</p>",
    "opcoes": [
      // A opção padrão confirma o recebimento da Vantagem base
      { "id": 1, "texto": "Legal! (Confirmar)" }
    ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Mecânica_BauDaSorte"],
    "fontes": [],
    "vantagem": "Sorte grande! Você ganhou um prêmio!", // Mensagem genérica da vantagem
    "desvantagem": "",
    "dica": "A sorte favorece os sustentáveis!"
  },
  {
    "id": "html_zoom_details_1",
    "tipo": "Pergunta",
    "titulo": "HTML: Zoom Simples com <details>",
    "pergunta": "Observe a imagem abaixo. Qual componente principal de um computador ela representa?<br><br><!-- Início do Bloco <details> para Zoom -->\n<details style=\"margin: 15px auto; display: block; width: fit-content; max-width: 200px; border: 1px solid #ccc; border-radius: 5px; overflow: hidden;\">\n  <summary style=\"cursor: zoom-in; list-style: none; /* Remove marcador padrão */\">\n    <!-- Imagem Pequena Visível -->\n    <img \n      src=\"https://rockapps.com.br/wp-content/uploads/2020/09/teste.jpg\" \n      alt=\"Clique para ampliar - Exemplo\" \n      style=\"display: block; max-width: 100%; height: auto;\"\n    >\n    <span style=\"display: block; text-align: center; font-size: 0.8em; padding: 5px; background-color: #f0f0f0;\">Clique na imagem para ampliar</span>\n  </summary>\n  <!-- Conteúdo Oculto (Imagem Maior) -->\n  <div style=\"padding: 10px; background-color: #fff;\">\n    <img \n      src=\"https://rockapps.com.br/wp-content/uploads/2020/09/teste.jpg\" \n      alt=\"Imagem Ampliada - Exemplo\" \n      style=\"display: block; width: 100%; max-width: 600px; /* Limite o tamanho máximo */ height: auto; margin: auto;\"\n    >\n    <p style=\"text-align: center; font-size: 0.8em; margin-top: 10px;\">(Clique no cabeçalho acima para fechar)</p>\n  </div>\n</details>\n<!-- Fim do Bloco <details> -->\n<br><strong>Pergunta:</strong> O que é mostrado na imagem?",
    "opcoes": [
      { "id": 1, "texto": "Memória RAM" },
      { "id": 2, "texto": "Placa de Vídeo (GPU)" },
      { "id": 3, "texto": "Processador (CPU)" },
      { "id": 4, "texto": "Placa-Mãe" }
    ],
    "respostaCorreta": 4,
    "dificuldade": "facil",
    "categorias": ["HTML_ZoomDetalhes"],
    "fontes": ["Componentes de PC"],
    "vantagem": "Correto! É a Placa-Mãe, onde tudo se conecta.",
    "desvantagem": "Incorreto. Este componente tem outra aparência/função.",
    "dica": "É a maior placa onde os outros componentes são encaixados."
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
  },

  // --- CARTAS COM FOCO EM MECÂNICAS DE TABULEIRO ---

  // 1. Atalho Sustentável
  {
    "id": "criativa_atalho_1",
    "tipo": "Vantagem",
    "titulo": "Atalho Verde",
    "pergunta": "<div style='text-align:center; padding:10px; border: 2px solid green; border-radius: 5px; background: #e8f5e9;'>\n  <p>Você descobriu um caminho eficiente e de baixo impacto!</p>\n  <p style='font-size: 2em; margin: 10px 0;'></p> <!-- Pedestre + Árvore -->\n  <strong>Avance 3 casas extras no tabuleiro!</strong>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Seguir pelo atalho!" } ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Criativa_Movimento"],
    "fontes": [],
    "vantagem": "Você avançou 3 casas!", // Efeito a ser implementado no jogo
    "desvantagem": "",
    "dica": "A sustentabilidade te leva mais longe."
  },

  // 2. Obstáculo: Trânsito Poluente
  {
    "id": "criativa_obstaculo_1",
    "tipo": "Desvantagem",
    "titulo": "Congestionamento",
    "pergunta": "<div style='text-align:center; padding:10px; border: 2px solid red; border-radius: 5px; background: #ffebee;'>\n  <p>Preso no trânsito! A poluição atmosférica atrasa seu progresso.</p>\n  <p style='font-size: 2em; margin: 10px 0;'></p> <!-- Carros -->\n  <strong>Perca sua próxima jogada (fique 1 rodada preso).</strong>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Esperar passar..." } ],
    "respostaCorreta": [],
    "dificuldade": "facil",
    "categorias": ["Criativa_Movimento"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Você perdeu uma rodada!", // Efeito a ser implementado no jogo
    "dica": "Transporte público ou bicicleta poderiam evitar isso."
  },

  // 3. Investimento em Energia Limpa (Escolha)
  {
    "id": "criativa_investimento_1",
    "tipo": "Outras",
    "titulo": "Investir em Solar?",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px solid #fbbf24; border-radius: 5px; background: #fffbeb;'>\n  <p>Oportunidade de investir em painéis solares para sua comunidade.</p>\n  <p style='font-size: 2em; margin: 10px 0;'></p> <!-- Lâmpada + Gráfico Subindo -->\n  <p><strong>Custo:</strong> Perca 1 Estrela Bônus agora.<br><strong>Retorno Potencial:</strong> Ganhe 3 Estrelas Bônus daqui a 5 rodadas.</p>\n  <p style='font-size:0.8em'>(O Jogo controlará o retorno futuro)</p>\n</div>\n<br>Você deseja fazer o investimento?",
    "opcoes": [
      { "id": 1, "texto": "Sim, investir! (-1 Estrela Agora)" },
      { "id": 2, "texto": "Não, obrigado." }
    ],
    "respostaCorreta": [1], // ID da opção de investir
    "dificuldade": "normal",
    "categorias": ["Criativa_EscolhaRecurso"],
    "fontes": [],
    "vantagem": "Investimento realizado! Aguarde o retorno.", // Se escolher 1 (Efeito -1 estrela aplicado no verificarResposta)
    "desvantagem": "Oportunidade de investimento recusada.", // Se escolher 2
    "dica": "Pensar a longo prazo pode valer a pena."
  },

  // 4. Desastre Ambiental (Afeta Todos)
  {
    "id": "criativa_desastre_1",
    "tipo": "Desvantagem",
    "titulo": "Derramamento Químico",
    "pergunta": "<div style='text-align:center; padding:10px; border: 2px solid purple; border-radius: 5px; background: #f3e8ff;'>\n  <p>Um acidente industrial causou um derramamento químico no rio!</p>\n  <p style='font-size: 2em; margin: 10px 0;'>☣️</p> <!-- Radioativo + Peixe Morto -->\n  <strong>Todos os jogadores perdem 15 de Progresso imediatamente!</strong>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Que tragédia!" } ],
    "respostaCorreta": [],
    "dificuldade": "normal",
    "categorias": ["Criativa_EventoGlobal"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Todos perderam 15 de Progresso!", // Efeito deve ser aplicado a todos no jogo
    "dica": "A falta de regulamentação afeta a todos."
  },

  // 5. Inovação Tecnológica (Beneficia Todos)
  {
    "id": "criativa_inovacao_1",
    "tipo": "Vantagem",
    "titulo": "Tecnologia de Captura de Carbono",
    "pergunta": "<div style='text-align:center; padding:10px; border: 2px solid cyan; border-radius: 5px; background: #ecfeff;'>\n  <p>Uma nova tecnologia eficiente de captura de carbono foi implementada!</p>\n   <p style='font-size: 2em; margin: 10px 0;'>️✨</p> <!-- Ferramenta + Brilhos -->\n  <strong>Todos os jogadores ganham 1 Pulo imediatamente!</strong>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Ótima notícia!" } ],
    "respostaCorreta": [1],
    "dificuldade": "normal",
    "categorias": ["Criativa_EventoGlobal"],
    "fontes": [],
    "vantagem": "Todos ganharam 1 Pulo!", // Efeito deve ser aplicado a todos no jogo
    "desvantagem": "",
    "dica": "A inovação pode trazer soluções."
  },

  // --- REFORÇANDO TIPOS EXISTENTES COM HTML ---

  // 6. Quiz Rápido com Imagem (ContraTempo)
  {
    "id": "criativa_ct_img_1",
    "tipo": "ContraTempo",
    "titulo": "Identificação Rápida",
    "pergunta": "Rápido! Que animal ameaçado é este?<br><img src='/images/mico_leao_dourado.jpg' alt='Mico-leão-dourado' style='max-width:150px; height:auto; display:block; margin:10px auto; border-radius:4px;'>",
    "opcoes": [
      { "id": 1, "texto": "Onça Pintada" },
      { "id": 2, "texto": "Mico-Leão-Dourado" },
      { "id": 3, "texto": "Arara Azul" },
      { "id": 4, "texto": "Lobo Guará" }
    ],
    "respostaCorreta": 2,
    "tempoLimite": 10,
    "dificuldade": "facil",
    "categorias": ["Criativa_ContraTempo"],
    "fontes": ["Fauna Brasileira"],
    "vantagem": "Correto! Um símbolo da Mata Atlântica.",
    "desvantagem": "Não é esse. Tempo ou resposta incorreta!",
    "dica": "É um primata pequeno e de pelagem laranja."
  },

  // 7. Quebra-Cabeça Visual (PontoCerto)
  {
    "id": "criativa_pc_puzzle_1",
    "tipo": "PontoCerto",
    "titulo": "Encaixe a Peça",
    "pergunta": "Clique no local onde a peça de energia eólica se encaixa no cenário de energias renováveis.",
    "imagemURL": "/images/cenario_energias_puzzle.png", // Imagem com um espaço faltando
    "zonasClicaveis": [
      // Coordenadas e dimensões como fração da imagem (0 a 1)
      { "id": 1, "x": 0.65, "y": 0.2, "largura": 0.25, "altura": 0.35, "descricao": "Espaço para Eólica" }, // Correta
      { "id": 2, "x": 0.1, "y": 0.5, "largura": 0.3, "altura": 0.3, "descricao": "Painel Solar" },
      { "id": 3, "x": 0.4, "y": 0.7, "largura": 0.4, "altura": 0.2, "descricao": "Represa Hidrelétrica" }
    ],
    "respostaCorreta": 1,
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["Criativa_PontoCerto"],
    "fontes": ["Ilustração"],
    "vantagem": "Encaixe perfeito!",
    "desvantagem": "A peça não se encaixa aí.",
    "dica": "Procure por um espaço vazio no céu ou colina."
  },

  // 8. Dilema Ético (Outras)
  {
    "id": "criativa_dilema_1",
    "tipo": "Outras",
    "titulo": "Dilema da Empresa",
    "pergunta": "Sua empresa pode economizar muito usando um fornecedor mais barato, mas que tem práticas ambientais duvidosas. O que você faz?",
    "opcoes": [
      { "id": 1, "texto": "Escolho o fornecedor barato (Ganha 2 Estrelas Bônus, -10 Progresso)" },
      { "id": 2, "texto": "Procuro um fornecedor sustentável, mesmo mais caro (+10 Progresso)" }
    ],
    "respostaCorreta": [1, 2], // Ambas são escolhas válidas com consequências
    "dificuldade": "normal",
    "categorias": ["Criativa_EscolhaEtica"],
    "fontes": [],
    "vantagem": "Decisão tomada. As consequências virão...", // Mensagem genérica, efeito aplicado no verificarResposta
    "desvantagem": "Decisão tomada. As consequências virão...",
    "dica": "Qual o impacto a longo prazo?"
  },

    // 9. Relacionar Causa e Efeito (RelacionarColunas)
  {
    "id": "criativa_rc_causa_efeito_1",
    "tipo": "RelacionarColunas",
    "titulo": "Causa e Efeito Ambiental",
    "pergunta": "Relacione a causa ao seu principal efeito ambiental:",
    "colunaA": [
      { "id": 1, "texto": "Desmatamento Excessivo" },
      { "id": 2, "texto": "Emissão de CFCs (antigo)" },
      { "id": 3, "texto": "Uso de Agrotóxicos" },
      { "id": 4, "texto": "Queima de Combustíveis Fósseis" }
    ],
    "colunaB": [
      { "id": 10, "texto": "Destruição da Camada de Ozônio" },
      { "id": 11, "texto": "Aumento do Efeito Estufa" },
      { "id": 12, "texto": "Perda de Biodiversidade e Erosão" },
      { "id": 13, "texto": "Contaminação do Solo e da Água" }
    ],
    "respostaCorreta": [
      { "aId": 1, "bId": 12 }, { "aId": 2, "bId": 10 },
      { "aId": 3, "bId": 13 }, { "aId": 4, "bId": 11 }
    ],
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["Criativa_RelacionarColunas"],
    "fontes": ["Ecologia Geral"],
    "vantagem": "Conexões bem estabelecidas!",
    "desvantagem": "Algumas relações estão trocadas.",
    "dica": "CFCs afetavam algo lá no alto..."
  },

  // 10. Complete a Lei (CompletarFrase)
  {
    "id": "criativa_cf_lei_1",
    "tipo": "CompletarFrase",
    "titulo": "Complete a Lei",
    "pergunta": "Complete o princípio da Política Nacional de Resíduos Sólidos:",
    "fraseIncompleta": "A responsabilidade pelo ciclo de vida dos produtos é __1__, envolvendo fabricantes, importadores, distribuidores, comerciantes, consumidores e titulares dos serviços públicos de __2__ e manejo de resíduos sólidos.",
    "fragmentos": [
      { "id": 1, "texto": "limpeza urbana" },
      { "id": 2, "texto": "compartilhada" },
      { "id": 3, "texto": "exclusiva" },
      { "id": 4, "texto": "voluntária" }
    ],
    "respostaCorreta": [2, 1], // compartilhada, limpeza urbana
    "opcoes": [],
    "dificuldade": "dificil",
    "categorias": ["Criativa_CompletarFrase"],
    "fontes": ["Lei 12.305/2010"],
    "vantagem": "Exato! A responsabilidade é de todos.",
    "desvantagem": "Princípio importante, mas não é bem assim.",
    "dica": "A palavra chave indica que vários atores estão envolvidos."
  },

  // --- CARTAS COM MAIS FOCO VISUAL/HTML ---

  // 11. Mini-Relatório com Tabela
  {
    "id": "criativa_html_tabela_1",
    "tipo": "Pergunta",
    "titulo": "Relatório de Emissões (Fictício)",
    "pergunta": "Analise a tabela de emissões de CO₂ por setor em Megatoneladas (Mt). Qual setor emitiu <strong>MENOS</strong>?<br>\n<style>\n.report-table { width: 90%; margin: 15px auto; border-collapse: collapse; font-size: 0.9em; }\n.report-table th, .report-table td { border: 1px solid #ddd; padding: 6px; text-align: left; }\n.report-table th { background-color: #f2f2f2; }\n.report-table tr:nth-child(even) { background-color: #f9f9f9; }\n</style>\n<table class=\"report-table\">\n  <thead><tr><th>Setor</th><th>Emissão (Mt CO₂)</th></tr></thead>\n  <tbody>\n    <tr><td>Energia</td><td>450</td></tr>\n    <tr><td>Indústria</td><td>320</td></tr>\n    <tr><td>Transporte</td><td>510</td></tr>\n    <tr><td>Agropecuária</td><td>280</td></tr>\n  </tbody>\n</table>",
    "opcoes": [
      { "id": 1, "texto": "Energia" },
      { "id": 2, "texto": "Indústria" },
      { "id": 3, "texto": "Transporte" },
      { "id": 4, "texto": "Agropecuária" }
    ],
    "respostaCorreta": 4,
    "dificuldade": "facil",
    "categorias": ["Criativa_HTML_Tabela"],
    "fontes": ["Dados Fictícios"],
    "vantagem": "Correto! A agropecuária foi a menor emissora nesta tabela.",
    "desvantagem": "Incorreto, compare os valores numéricos.",
    "dica": "Procure o menor número na segunda coluna."
  },

  // 12. "Antes e Depois" com <details>
  {
    "id": "criativa_html_details_1",
    "tipo": "Vantagem",
    "titulo": "Restauração Florestal",
    "pergunta": "<div style='text-align: center;'>\n  <p>Sua iniciativa ajudou a restaurar uma área degradada!</p>\n  <details style=\"margin: 10px auto; display: block; width: fit-content; max-width: 220px; border: 1px solid #ccc; border-radius: 5px; overflow: hidden;\">\n    <summary style=\"cursor: pointer; list-style: none; padding: 5px; background: #e0e0e0;\">Ver Antes e Depois</summary>\n    <div style=\"padding: 5px;\">\n      <p style=\"font-size:0.8em; margin:0 0 5px 0;\"><strong>Antes:</strong></p>\n      <img src=\"/images/area_degradada.jpg\" alt=\"Área degradada\" style=\"max-width:100%; height:auto; margin-bottom:10px;\">\n      <p style=\"font-size:0.8em; margin:0 0 5px 0;\"><strong>Depois:</strong></p>\n      <img src=\"/images/area_restaurada.jpg\" alt=\"Área restaurada\" style=\"max-width:100%; height:auto;\">\n    </div>\n  </details>\n  <p><strong>Receba +20 de Progresso!</strong></p>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Ver o resultado!" } ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Criativa_HTML_Detalhes"],
    "fontes": [],
    "vantagem": "+20 de Progresso pela restauração!",
    "desvantagem": "",
    "dica": "Clique para ver a transformação."
  },

  // --- CARTAS SIMULANDO INTERAÇÕES MAIS COMPLEXAS ---
  // (Lembre-se: A lógica real pode precisar ser gerenciada fora da carta)

  // 13. Leilão de Créditos de Carbono (Simulado)
  {
    "id": "criativa_leilao_1",
    "tipo": "Outras",
    "titulo": "Leilão de Carbono",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px solid #4b5563; border-radius: 5px; background: #f3f4f6;'>\n  <p>Um leilão de créditos de carbono está acontecendo!</p>\n  <p style='font-size: 2em; margin: 10px 0;'></p> <!-- Dinheiro + Martelo Leilão -->\n  <p>Você pode dar um lance usando Estrelas Bônus. O maior lance leva um benefício (ex: avançar casas).</p>\n  <p style='font-size:0.8em'>(O Mestre do Jogo conduzirá o leilão entre os interessados)</p>\n  <br><strong>Deseja participar do leilão?</strong>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Sim, quero participar!" },
      { "id": 2, "texto": "Não, vou observar." }
    ],
    "respostaCorreta": [1, 2], // Ambas são válidas
    "dificuldade": "normal",
    "categorias": ["Criativa_LeilaoSimulado"],
    "fontes": [],
    "vantagem": "Boa sorte no leilão!", // Se escolher 1
    "desvantagem": "Você decidiu não participar.", // Se escolher 2
    "dica": "Créditos de carbono ajudam a compensar emissões."
  },

  // 14. Desafio Comunitário (Simulado)
  {
    "id": "criativa_desafio_1",
    "tipo": "Outras",
    "titulo": "Desafio Comunitário: Meta de Reciclagem",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px solid #2563eb; border-radius: 5px; background: #eff6ff;'>\n  <p><strong>Desafio para TODOS os jogadores!</strong></p>\n  <p style='font-size: 2em; margin: 10px 0;'>炙</p> <!-- Símbolo Reciclar + Alvo -->\n  <p>Se, coletivamente, os jogadores conseguirem doar (perder voluntariamente) um total de <strong>5 Estrelas Bônus</strong> até o início da próxima rodada deste jogador, todos ganham +1 Pulo.</p>\n  <p style='font-size:0.8em'>(Coordene com os outros jogadores! O Mestre valida a meta)</p>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Entendido! Vamos tentar!" }
    ],
    "respostaCorreta": [1],
    "dificuldade": "dificil",
    "categorias": ["Criativa_DesafioComunitario"],
    "fontes": [],
    "vantagem": "Boa sorte no desafio!",
    "desvantagem": "",
    "dica": "Trabalho em equipe é essencial."
  },

  // 15. Pegadinha / Fake News
  {
    "id": "criativa_pegadinha_1",
    "tipo": "Pergunta",
    "titulo": "Notícia Urgente?",
    "pergunta": "“Cientistas descobrem que plantar eucalipto <i>cura</i> o aquecimento global por absorver CO₂ mais rápido que florestas nativas!”<br><br>Esta afirmação é totalmente <strong>verdadeira</strong> ou <strong>enganosa</strong>?",
    "opcoes": [
      { "id": 1, "texto": "Totalmente Verdadeira" },
      { "id": 2, "texto": "Enganosa (ignora biodiversidade, uso de água, etc.)" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "normal",
    "categorias": ["Criativa_Pegadinha"],
    "fontes": ["Discussões sobre Monoculturas"],
    "vantagem": "Correto! É uma visão simplista e enganosa.",
    "desvantagem": "Cuidado! Absorver CO₂ rápido não é toda a história.",
    "dica": "Sustentabilidade envolve mais do que apenas um fator."
  },

  // --- MAIS EXEMPLOS VARIADOS ---

  // 16. Ciclo de Vida do Produto (Ordem)
  {
    "id": "criativa_ordem_ciclo_1",
    "tipo": "Ordem",
    "titulo": "Ciclo de Vida Simplificado",
    "pergunta": "Ordene as fases do ciclo de vida de um produto eletrônico:",
    "opcoes": [
      { "id": 1, "texto": "Uso pelo consumidor" },
      { "id": 2, "texto": "Descarte / Fim de vida" },
      { "id": 3, "texto": "Extração de Matéria-Prima" },
      { "id": 4, "texto": "Produção / Manufatura" },
      { "id": 5, "texto": "Distribuição" }
    ],
    "respostaCorreta": [3, 4, 5, 1, 2],
    "dificuldade": "normal",
    "categorias": ["Criativa_Ordem"],
    "fontes": ["Análise de Ciclo de Vida"],
    "vantagem": "Ciclo completo e na ordem certa!",
    "desvantagem": "A sequência das fases está incorreta.",
    "dica": "Tudo começa com a retirada de recursos da natureza."
  },

  // 17. Oportunidade de Mercado (Vantagem Condicional Simulada)
  {
    "id": "criativa_vantagem_mercado_1",
    "tipo": "Vantagem",
    "titulo": "Mercado de Orgânicos em Alta",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px solid #16a34a; border-radius: 5px; background: #f0fdf4;'>\n <p>A demanda por produtos orgânicos disparou!</p>\n <p style='font-size: 2em; margin: 10px 0;'>塞</p> <!-- Vegetal + Saco Dinheiro -->\n <p>Se você tiver <strong>pelo menos 2 Estrelas Bônus</strong>, pode trocá-las agora por <strong>+30 de Progresso</strong>.</p>\n <p style='font-size:0.8em'>(O jogo verificará suas estrelas)</p>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Aproveitar a oportunidade!" } ],
    "respostaCorreta": [1],
    "dificuldade": "normal",
    "categorias": ["Criativa_VantagemCondicional"],
    "fontes": [],
    "vantagem": "+30 Progresso (se tinha estrelas suficientes)!", // Efeito aplicado no verificarResposta
    "desvantagem": "Não tinha estrelas suficientes.", // Mensagem alternativa se a condição não for atendida
    "dica": "Investir em orgânicos pode dar retorno."
  },

  // 18. Fiscalização Ambiental (Desvantagem Condicional Simulada)
  {
    "id": "criativa_desvantagem_fiscal_1",
    "tipo": "Desvantagem",
    "titulo": "Fiscalização Surpresa",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px solid #ef4444; border-radius: 5px; background: #fee2e2;'>\n <p>Um fiscal ambiental apareceu para verificar suas práticas!</p>\n <p style='font-size: 2em; margin: 10px 0;'></p> <!-- Guarda + Prancheta -->\n <p>Se você tiver <strong>mais de 3 Respostas Erradas</strong> no total, você foi multado!</p>\n <p><strong>Penalidade:</strong> Perca 1 Estrela Bônus (se tiver) ou 1 Pulo (se não tiver estrela).</p>\n <p style='font-size:0.8em'>(O jogo verificará seus erros e aplicará a penalidade)</p>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Receber a fiscalização..." } ],
    "respostaCorreta": [],
    "dificuldade": "normal",
    "categorias": ["Criativa_DesvantagemCondicional"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Multado! Perdeu 1 Estrela ou Pulo.", // Mensagem se a condição for atendida
    "dica": "Manter boas práticas evita problemas."
  },

  // 19. "O Que Falta?" (PontoCerto)
  {
    "id": "criativa_pc_falta_1",
    "tipo": "PontoCerto",
    "titulo": "Completando o Ciclo",
    "pergunta": "Este diagrama simplificado mostra a compostagem. Clique onde o <strong>adubo final</strong> seria aplicado.",
    "imagemURL": "/images/diagrama_compostagem_incompleto.png", // Imagem mostrando lixo orgânico -> composteira -> ??? -> Horta/Jardim
    "zonasClicaveis": [
      { "id": 1, "x": 0.7, "y": 0.6, "largura": 0.25, "altura": 0.3, "descricao": "Horta/Jardim" }, // Correta
      { "id": 2, "x": 0.1, "y": 0.1, "largura": 0.3, "altura": 0.4, "descricao": "Lixo Orgânico Inicial" },
      { "id": 3, "x": 0.4, "y": 0.3, "largura": 0.25, "altura": 0.4, "descricao": "Composteira" }
    ],
    "respostaCorreta": 1,
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["Criativa_PontoCerto"],
    "fontes": ["Compostagem"],
    "vantagem": "Exato! O adubo volta para a terra.",
    "desvantagem": "O adubo é usado em outro lugar do ciclo.",
    "dica": "Onde as plantas crescem?"
  },

  // 20. Decodificador Simples
  {
    "id": "criativa_decodificador_1",
    "tipo": "Pergunta",
    "titulo": "Mensagem Secreta Verde",
    "pergunta": "Decifre a mensagem usando a cifra de César simples (deslocamento de +1 letra, A->B, B->C,... Z->A):<br><br><strong style='font-family: monospace; font-size: 1.2em; display: block; text-align: center; letter-spacing: 3px; background: #eee; padding: 10px; border-radius: 4px;'>QFDJDMBS FN QPSUBOUF</strong>",
    "opcoes": [
      { "id": 1, "texto": "PLANTAR ARVORES" },
      { "id": 2, "texto": "RECICLAR E IMPORTANTE" },
      { "id": 3, "texto": "SALVAR AS BALEIAS" },
      { "id": 4, "texto": "ECONOMIZAR AGUA" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "normal",
    "categorias": ["Criativa_Puzzle"],
    "fontes": [],
    "vantagem": "Mensagem decifrada corretamente!",
    "desvantagem": "Código errado. Tente deslocar as letras.",
    "dica": "A letra 'Q' vira 'R', 'F' vira 'G'..."
  },

  // 21. Ajuda Externa (Vantagem Direta)
  {
    "id": "criativa_ajuda_1",
    "tipo": "Vantagem",
    "titulo": "Consultoria Ambiental",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px solid #06b6d4; border-radius: 5px; background: #ecfeff;'>\n  <p>Você contratou uma consultoria e otimizou seus processos!</p>\n  <p style='font-size: 2em; margin: 10px 0;'></p> <!-- Pasta + Gráfico -->\n  <strong>Ganhe 2 Pulos para usar quando quiser!</strong>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Excelente!" } ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Criativa_BonusDireto"],
    "fontes": [],
    "vantagem": "Você ganhou 2 Pulos!", // Efeito aplicado no verificarResposta
    "desvantagem": "",
    "dica": "Buscar conhecimento especializado ajuda."
  },
  {
    "id": "criativa_video_1",
    "tipo": "Pergunta",
    "titulo": "Vídeo: Ciclo da Água",
    "pergunta": "Assista ao vídeo sobre o ciclo da água e responda:<br><br>\n<div style=\"margin: 10px auto; max-width: 400px; border: 1px solid #ccc; padding: 5px; background: #f9f9f9; border-radius: 5px;\">\n  <video controls width=\"100%\" preload=\"metadata\">\n    <source src=\"/videos/ciclo_agua_exemplo.mp4#t=0.1\" type=\"video/mp4\"> <!-- #t=0.1 ajuda a carregar o primeiro frame -->\n    Seu navegador não suporta o elemento video.\n  </video>\n  <p style=\"text-align:center; font-size:0.8em; margin-top: 5px;\">Use o controle de tela cheia (fullscreen) do player para \"ampliar\".</p>\n</div>\n<br>Qual processo transforma a água líquida em vapor?",
    "opcoes": [
      { "id": 1, "texto": "Condensação" },
      { "id": 2, "texto": "Precipitação" },
      { "id": 3, "texto": "Evaporação" },
      { "id": 4, "texto": "Infiltração" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": ["Criat__Video"],
    "fontes": ["Vídeo Educacional"],
    "vantagem": "Correto!",
    "desvantagem": "Incorreto, reveja o vídeo.",
    "dica": "É quando a água 'sobe' invisível."
  },

  // 2. Carta de Contato/Social
  {
    "id": "criativa_social_1",
    "tipo": "Outras", // Tipo 'Outras' para interação simples
    "titulo": "Conecte-se!",
    "pergunta": "<div style='text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; background: #fafafa;'>\n  <h4 style='margin-bottom: 15px;'>Gostou do Jogo? Conecte-se!</h4>\n  <p style='margin-bottom: 20px; font-size: 0.9em;'>Siga o desenvolvedor nas redes ou entre em contato:</p>\n  <div style='display: flex; justify-content: center; gap: 20px; margin-bottom: 20px;'>\n    <!-- LinkedIn -->\n    <a href=\"https://www.linkedin.com/in/gustavomourao1\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"LinkedIn: gustavomourao1\" style=\"text-decoration: none; color: #0a66c2;\">\n      <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z\"/></svg>\n    </a>\n    <!-- Instagram (Exemplo) -->\n    <a href=\"https://www.instagram.com/SEU_INSTAGRAM_AQUI\" target=\"_blank\" rel=\"noopener noreferrer\" title=\"Instagram\" style=\"text-decoration: none; color: #e1306c;\">\n       <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 24 24\" fill=\"currentColor\" ><path d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z\"/></svg>\n    </a>\n  </div>\n  <p style='font-size: 0.9em;'><strong>Email:</strong> seu.email.aqui@provedor.com</p>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Obrigado pela informação!" }
    ],
    "respostaCorreta": [1], // Apenas confirmação
    "dificuldade": "facil",
    "categorias": ["Criat__Social"],
    "fontes": [],
    "vantagem": "Conexões fortalecem a rede!",
    "desvantagem": "",
    "dica": ""
  },

  // 3. Carta com Áudio
  {
    "id": "criativa_audio_1",
    "tipo": "Pergunta",
    "titulo": "Som da Natureza",
    "pergunta": "Ouça o som abaixo. A qual animal pertence este canto?<br><br>\n<div style='text-align: center; margin: 15px 0;'>\n  <audio controls controlsList=\"nodownload noplaybackrate\" preload=\"metadata\">\n    <source src=\"/audio/canto_sabia_exemplo.mp3\" type=\"audio/mpeg\">\n    Seu navegador não suporta o elemento áudio.\n  </audio>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Sabiá-laranjeira" },
      { "id": 2, "texto": "Bem-te-vi" },
      { "id": 3, "texto": "Canário-da-terra" },
      { "id": 4, "texto": "Coruja" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "normal",
    "categorias": ["Criat__Audio"],
    "fontes": ["Sons da Fauna Brasileira"],
    "vantagem": "Correto! É o belo canto do Sabiá.",
    "desvantagem": "Não, este é outro pássaro ou animal.",
    "dica": "É um canto melodioso, comum em jardins."
  },

  // --- MAIS 21 CARTAS CRIATIVAS ---

  // 4. Mini-Jogo: Separando o Lixo (Pergunta com Imagem/Lista)
  {
    "id": "criativa_minigame_lixo_1",
    "tipo": "MultiplaEscolha",
    "titulo": "Mini-Jogo: Coleta Seletiva",
    "pergunta": "Arraste (mentalmente) os itens para suas lixeiras corretas. Quais itens vão para a lixeira <strong>AZUL</strong> (Papel)?<br>\n<ul style='list-style: none; padding: 0; margin: 10px 0;'>\n  <li>📰 Jornal Velho</li>\n  <li>🍾 Garrafa de Vidro</li>\n  <li>📦 Caixa de Papelão</li>\n  <li>🥫 Lata de Alumínio</li>\n  <li><span style='text-decoration: line-through;'>🚫</span> Guardanapo Sujo</li>\n  <li>✉️ Envelope</li>\n</ul>\n<img src='/images/lixeiras_4cores.png' alt='Lixeiras coloridas' style='max-width: 200px; display: block; margin: 10px auto;'>",
    "opcoes": [
      { "id": 1, "texto": "Jornal Velho" },
      { "id": 2, "texto": "Garrafa de Vidro" },
      { "id": 3, "texto": "Caixa de Papelão" },
      { "id": 4, "texto": "Lata de Alumínio" },
      { "id": 5, "texto": "Guardanapo Sujo" },
      { "id": 6, "texto": "Envelope" }
    ],
    "respostaCorreta": [1, 3, 6], // Jornal, Caixa, Envelope
    "dificuldade": "normal",
    "categorias": ["Criat__Minigame"],
    "fontes": ["Regras Coleta Seletiva"],
    "vantagem": "Separação perfeita!",
    "desvantagem": "Algum item foi para a lixeira errada.",
    "dica": "Papel e papelão limpos vão no azul. Lixo orgânico ou sujo não!"
  },

  // 5. Efeito Cascata (Desvantagem com Atraso Simulado)
  {
    "id": "criativa_cascata_1",
    "tipo": "Desvantagem",
    "titulo": "Efeito Cascata: Poluição",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px solid #f59e0b; border-radius: 5px; background: #fffbeb;'>\n <p>Um pequeno descuido (como jogar lixo no lugar errado) iniciou uma reação em cadeia negativa no ecossistema local.</p>\n <p style='font-size: 2em; margin: 10px 0;'> dominoes ➡️</p> <!-- Dominó -> Seta -> Cocô -->\n <p><strong>Penalidade:</strong> Você está bem por enquanto, mas perderá <strong>10 de Progresso</strong> no <strong>início</strong> da sua próxima jogada.</p>\n <p style='font-size:0.8em'>(O Jogo controlará a penalidade futura)</p>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Entendido..." } ],
    "respostaCorreta": [],
    "dificuldade": "normal",
    "categorias": ["Criat__EfeitoAtrasado"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "A consequência virá na próxima rodada (-10 Progresso).",
    "dica": "Pequenas ações podem ter grandes impactos."
  },

  // 6. Medidor de Poluição (Visualização Simples)
  {
    "id": "criativa_medidor_1",
    "tipo": "Pergunta",
    "titulo": "Qualidade do Ar",
    "pergunta": "O medidor indica a qualidade do ar na região. Qual o nível atual?<br><br>\n<style>\n.air-gauge { width: 80%; max-width: 300px; height: 25px; background: linear-gradient(to right, lime, yellow, orange, red, purple); margin: 15px auto; border: 1px solid #555; border-radius: 15px; position: relative; }\n.air-needle { position: absolute; top: -5px; left: 70%; /* Posição da agulha indica o nível */ width: 3px; height: 35px; background: black; border-radius: 2px; transform-origin: bottom center; transform: translateX(-50%); box-shadow: 0 0 3px rgba(0,0,0,0.5); }\n.air-label { position: absolute; top: 30px; left: 70%; transform: translateX(-50%); font-size: 0.8em; font-weight: bold; background: rgba(255,255,255,0.7); padding: 2px 4px; border-radius: 3px; }\n</style>\n<div class=\"air-gauge\">\n  <div class=\"air-needle\"></div>\n  <div class=\"air-label\">Ruim</div> <!-- O texto indica o nível -->\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Boa (Verde)" },
      { "id": 2, "texto": "Moderada (Amarelo)" },
      { "id": 3, "texto": "Ruim (Laranja/Vermelho)" },
      { "id": 4, "texto": "Péssima (Roxo)" }
    ],
    "respostaCorreta": 3, // Corresponde à posição da agulha e ao label
    "dificuldade": "facil",
    "categorias": ["Criat__Visualizacao"],
    "fontes": ["Monitoramento Fictício"],
    "vantagem": "Correto! A qualidade do ar precisa melhorar.",
    "desvantagem": "Incorreto, veja a posição da 'agulha' e o rótulo.",
    "dica": "A cor e o texto indicam o nível."
  },

  // 7. Carta de Evento Aleatório (Popup :target)
  {
    "id": "criativa_evento_popup_1",
    "tipo": "Vantagem", // Ou Desvantagem, dependendo do evento
    "titulo": "Evento Inesperado!",
    "pergunta": "<style>\n.event-popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.7); display: none; justify-content: center; align-items: center; z-index: 1001; }\n.event-popup-overlay:target { display: flex; }\n.event-popup-content { background: white; padding: 25px; border-radius: 8px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.3); position: relative; max-width: 300px; }\n.event-popup-close { position: absolute; top: 8px; right: 12px; font-size: 24px; color: #888; text-decoration: none; }\n.event-popup-close:hover { color: #333; }\n.event-trigger { display: inline-block; padding: 10px 20px; background: #ffc107; color: black; text-decoration: none; border-radius: 5px; font-weight: bold; cursor: pointer; }\n.event-trigger:hover { background: #e0a800; }\n</style>\n<p style='text-align: center;'>Um evento aleatório ocorreu! Clique para revelar:</p>\n<div style='text-align: center; margin-top: 15px;'>\n  <a href=\"#event-reveal-1\" class=\"event-trigger\">Revelar Evento!</a>\n</div>\n<div id=\"event-reveal-1\" class=\"event-popup-overlay\">\n  <div class=\"event-popup-content\">\n    <a href=\"#\" class=\"event-popup-close\" title=\"Fechar\">×</a>\n    <h4>Chuva de Meteoros!</h4>\n    <p style='font-size: 3em; margin: 10px 0;'>☄️✨</p>\n    <p>Um fenômeno raro! Por sorte, nenhum dano. Todos os jogadores ganham <strong>+1 Estrela Bônus</strong> pela observação!</p>\n  </div>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Ver o que aconteceu!" } ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Criat__EventoPopup"],
    "fontes": [],
    "vantagem": "Evento revelado!", // Efeito aplicado no jogo
    "desvantagem": "",
    "dica": "Clique no botão amarelo!"
  },

  // 8. "Construa" sua Solução (MultiplaEscolha Temática)
  {
    "id": "criativa_construcao_1",
    "tipo": "MultiplaEscolha",
    "titulo": "Construa um Filtro de Água Caseiro",
    "pergunta": "Selecione os <strong>materiais corretos e na ordem aproximada</strong> (de baixo para cima) para montar um filtro de água caseiro simples:",
    "opcoes": [
      { "id": 1, "texto": "1º (Fundo): Algodão" },
      { "id": 2, "texto": "2º: Carvão Ativado" },
      { "id": 3, "texto": "3º: Areia Fina" },
      { "id": 4, "texto": "4º: Areia Grossa" },
      { "id": 5, "texto": "5º: Cascalho/Pedras Pequenas" },
      { "id": 6, "texto": "Adicionar Açúcar" },
      { "id": 7, "texto": "Usar Terra Comum" }
    ],
    "respostaCorreta": [1, 2, 3, 4, 5],
    "dificuldade": "normal",
    "categorias": ["Criat__Construcao"],
    "fontes": ["Experimentos Científicos"],
    "vantagem": "Filtro montado corretamente!",
    "desvantagem": "Algum material ou a ordem está incorreta.",
    "dica": "Começa com o filtro mais fino no fundo e vai aumentando a granulação."
  },

  // 9. Carta de Política Pública (Outras - Escolha com Efeito)
  {
    "id": "criativa_politica_1",
    "tipo": "Outras",
    "titulo": "Votação: Incentivo a Ciclovias",
    "pergunta": "<div style='padding:10px; border: 1px solid gray; border-radius: 4px; background: #eee;'>\n <p>Está em votação uma nova política para expandir massivamente as ciclovias na cidade.</p>\n <p style='font-size: 2em; text-align: center; margin: 10px 0;'>🗳️🚲</p>\n <p><strong>Aprovar:</strong> Melhora a qualidade do ar e saúde (+15 Progresso), mas requer investimento (-1 Estrela Bônus).</p>\n <p><strong>Rejeitar:</strong> Mantém o status quo (sem efeito).</p>\n <br><strong>Qual seu voto?</strong>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Aprovar (+15 Progresso, -1 Estrela)" },
      { "id": 2, "texto": "Rejeitar (Sem Efeito)" }
    ],
    "respostaCorreta": [1, 2], // Ambas válidas
    "dificuldade": "normal",
    "categorias": ["Criat__Politica"],
    "fontes": [],
    "vantagem": "Política votada! As consequências foram aplicadas.", // Se escolher 1
    "desvantagem": "Política votada! O status quo foi mantido.", // Se escolher 2
    "dica": "Pese os custos e benefícios para a cidade."
  },

  // 10. Memória Ecológica (<details>)
  {
    "id": "criativa_memoria_1",
    "tipo": "Pergunta",
    "titulo": "Jogo da Memória Ecológica",
    "pergunta": "Clique para revelar a imagem escondida por 3 segundos e tente lembrar qual animal era.<br><br>\n<style>\n.memory-reveal { display: block; width: 120px; height: 120px; border: 2px dashed blue; margin: 15px auto; background: lightblue; text-align:center; line-height: 120px; font-weight:bold; cursor: pointer; user-select: none; }\n.memory-reveal:active + .memory-hidden-content { display: block; animation: flashReveal 3s forwards; }\n.memory-hidden-content { display: none; text-align:center; }\n.memory-hidden-content img { max-width: 100px; height: auto; margin-top: 10px; }\n@keyframes flashReveal { 0% { opacity: 1; } 99% { opacity: 1; } 100% { opacity: 0; display:none !important; } /* Hack to re-hide */ }\n</style>\n<div class=\"memory-reveal\" onclick=\"this.nextElementSibling.style.display='block'; setTimeout(() => { this.nextElementSibling.style.display='none'; }, 3000);\">Clique Aqui</div>\n<div class=\"memory-hidden-content\">\n  <img src=\"/images/arara_azul.jpg\" alt=\"Animal escondido\">\n</div>\n<br>Qual animal apareceu rapidamente?",
    "opcoes": [
      { "id": 1, "texto": "Tucano" },
      { "id": 2, "texto": "Mico-Leão" },
      { "id": 3, "texto": "Arara Azul" },
      { "id": 4, "texto": "Capivara" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "normal",
    "categorias": ["Criat__Memoria"],
    "fontes": [],
    "vantagem": "Boa memória!",
    "desvantagem": "Não era esse. Tente observar mais rápido!",
    "dica": "É uma ave grande e azul."
  },

    // 11. Carta de Notícia com Imagem e Link
    {
    "id": "criativa_noticia_1",
    "tipo": "Pergunta",
    "titulo": "Notícia: Recorde de Energia Eólica",
    "pergunta": "<div style='border: 1px solid #ddd; padding: 15px; border-radius: 5px; background: #fff;'>\n  <img src='/images/turbinas_eolicas.jpg' alt='Turbinas eólicas' style='float: left; width: 100px; height: auto; margin-right: 15px; margin-bottom: 5px; border-radius: 3px;'>\n  <h4 style='margin-top: 0; margin-bottom: 5px;'>Brasil Bate Recorde de Geração Eólica</h4>\n  <p style='font-size: 0.9em; text-align: justify;'>A geração de energia a partir dos ventos atingiu um novo pico histórico no último mês, suprindo XX% da demanda do Nordeste. <a href='#' onclick='alert(\"Link clicado! Em um jogo real, isso poderia abrir uma notícia externa.\"); return false;' style='color: blue; text-decoration: underline;'>Leia mais...</a></p>\n  <div style='clear: both;'></div>\n</div><br>Este tipo de notícia é positivo ou negativo para a sustentabilidade?",
    "opcoes": [
      { "id": 1, "texto": "Positivo" },
      { "id": 2, "texto": "Negativo" },
      { "id": 3, "texto": "Indiferente" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "facil",
    "categorias": ["Criat__Noticia"],
    "fontes": ["Noticiário Fictício"],
    "vantagem": "Correto! Mais energia limpa é ótimo.",
    "desvantagem": "Energia eólica é uma fonte renovável importante.",
    "dica": "Energia do vento polui?"
  },

  // 12. Slide de Decisão (Simulado com HTML/CSS)
  {
    "id": "criativa_slider_1",
    "tipo": "Outras",
    "titulo": "Termostato Inteligente",
    "pergunta": "Ajuste o termostato para economizar energia. <br><i>(Imagine deslizar o controle)</i><br><br>\n<style>\n.slider-track { width: 80%; max-width: 300px; height: 10px; background: linear-gradient(to right, lightblue, yellow, orange, red); margin: 25px auto 5px auto; border-radius: 5px; position: relative; }\n.slider-thumb { position: absolute; top: 50%; left: 30%; /* Posição inicial simulada */ width: 20px; height: 20px; background: #555; border-radius: 50%; transform: translate(-50%, -50%); cursor: pointer; border: 2px solid white; }\n.slider-labels { display: flex; justify-content: space-between; width: 80%; max-width: 300px; margin: 0 auto; font-size: 0.8em; }\n</style>\n<div class=\"slider-track\"><div class=\"slider-thumb\"></div></div>\n<div class=\"slider-labels\"><span>❄️ Frio (Gasta +)</span><span>🔥 Quente (Gasta -)</span></div>\n<br>Qual opção abaixo melhor representa uma configuração <strong>econômica</strong>?",
    "opcoes": [
      { "id": 1, "texto": "Manter muito Frio (Azul)" },
      { "id": 2, "texto": "Deixar Moderado/Quente (Laranja/Vermelho)" }
    ],
    "respostaCorreta": [2], // Indica a opção que representa economia
    "dificuldade": "facil",
    "categorias": ["Criat__SliderSimulado"],
    "fontes": [],
    "vantagem": "Boa escolha! Menos ar condicionado, mais economia.",
    "desvantagem": "Temperaturas extremas no ar condicionado gastam mais.",
    "dica": "Qual extremo gasta menos energia?"
  },

  // 13. Carta de Troca entre Jogadores (Simulada)
  {
    "id": "criativa_troca_1",
    "tipo": "Outras",
    "titulo": "Mercado de Trocas",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px dashed #9ca3af; border-radius: 5px; background: #f9fafb;'>\n <p>Oportunidade de trocar recursos com outro jogador!</p>\n <p style='font-size: 2em; margin: 10px 0;'>🤝</p>\n <p>Você pode oferecer <strong>1 Pulo</strong> em troca de <strong>1 Estrela Bônus</strong> de alguém.</p>\n <p style='font-size:0.8em'>(Negocie com os outros jogadores. Se alguém aceitar, ambos confirmam na próxima rodada e o Mestre ajusta os contadores)</p>\n <br><strong>Quer propor essa troca?</strong>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Sim, vou procurar um parceiro!" },
      { "id": 2, "texto": "Não, prefiro manter meu Pulo." }
    ],
    "respostaCorreta": [1, 2],
    "dificuldade": "normal",
    "categorias": ["Criat__TrocaJogadores"],
    "fontes": [],
    "vantagem": "Proposta feita! Veja se alguém aceita.",
    "desvantagem": "Ok, sem trocas por agora.",
    "dica": "Negociar pode beneficiar ambos."
  },

  // 14. Charada Ambiental
  {
    "id": "criativa_charada_1",
    "tipo": "Pergunta",
    "titulo": "Charada Verde",
    "pergunta": "Sou essencial para a vida, cubro a maior parte do planeta, mas estou cada vez mais poluída e meu nível sobe.<br><br>Quem sou eu?",
    "opcoes": [
      { "id": 1, "texto": "O Ar" },
      { "id": 2, "texto": "A Floresta" },
      { "id": 3, "texto": "O Oceano" },
      { "id": 4, "texto": "O Solo" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": ["Criat__Charada"],
    "fontes": [],
    "vantagem": "Correto! Precisamos cuidar dos nossos oceanos.",
    "desvantagem": "Pense na maior extensão do planeta.",
    "dica": "É azul e salgado."
  },

    // 15. Infográfico Simples (HTML/CSS)
    {
    "id": "criativa_infografico_1",
    "tipo": "Pergunta",
    "titulo": "Impacto do Plástico",
    "pergunta": "Observe o infográfico simplificado. Qual a maior fonte de plástico nos oceanos mencionada?<br><br>\n<style>\n.infographic { border: 1px solid #ccc; padding: 15px; background: white; border-radius: 5px; max-width: 350px; margin: auto; font-size: 0.9em; }\n.infographic h5 { margin: 0 0 10px 0; text-align: center; color: #1d4ed8; }\n.info-item { display: flex; align-items: center; margin-bottom: 8px; }\n.info-icon { font-size: 1.5em; margin-right: 10px; width: 30px; text-align: center; }\n.info-text { flex-grow: 1; }\n.info-bar { height: 10px; background-color: #bfdbfe; border-radius: 5px; margin-top: 3px; overflow: hidden; }\n.info-bar-fill { height: 100%; background-color: #3b82f6; border-radius: 5px; }\n</style>\n<div class=\"infographic\">\n  <h5>Fontes de Plástico nos Oceanos (Estimativa)</h5>\n  <div class=\"info-item\">\n    <span class=\"info-icon\">🎣</span>\n    <div class=\"info-text\">Pesca (Redes, etc.)<div class=\"info-bar\"><div class=\"info-bar-fill\" style=\"width: 45%;\"></div></div></div>\n  </div>\n  <div class=\"info-item\">\n    <span class=\"info-icon\">🛍️</span>\n    <div class=\"info-text\">Embalagens e Descarte Urbano<div class=\"info-bar\"><div class=\"info-bar-fill\" style=\"width: 80%;\"></div></div></div>\n  </div>\n   <div class=\"info-item\">\n    <span class=\"info-icon\">🚢</span>\n    <div class=\"info-text\">Transporte Marítimo<div class=\"info-bar\"><div class=\"info-bar-fill\" style=\"width: 25%;\"></div></div></div>\n  </div>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Pesca" },
      { "id": 2, "texto": "Embalagens / Descarte Urbano" },
      { "id": 3, "texto": "Transporte Marítimo" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["Criat__Infografico"],
    "fontes": ["Dados Ambientais"],
    "vantagem": "Correto! O descarte inadequado é um grande problema.",
    "desvantagem": "Observe qual barra é a maior.",
    "dica": "Qual barra azul é a mais longa?"
  },

  // 16. Escolha de Transporte (Impacto no Progresso)
  {
    "id": "criativa_transporte_1",
    "tipo": "Outras",
    "titulo": "Como ir ao Trabalho?",
    "pergunta": "Você precisa ir trabalhar. Qual meio de transporte você escolhe hoje?",
    "opcoes": [
      { "id": 1, "texto": "Carro Sozinho (-5 Progresso)" },
      { "id": 2, "texto": "Transporte Público (+5 Progresso)" },
      { "id": 3, "texto": "Bicicleta (+10 Progresso)" },
      { "id": 4, "texto": "Carona Solidária (+3 Progresso)" }
    ],
    "respostaCorreta": [1, 2, 3, 4], // Todas são escolhas
    "dificuldade": "facil",
    "categorias": ["Criat__EscolhaTransporte"],
    "fontes": [],
    "vantagem": "Escolha feita! O impacto no progresso foi aplicado.", // Mensagem genérica
    "desvantagem": "", // Não há resposta errada, apenas consequências diferentes
    "dica": "Pense no impacto ambiental e na eficiência."
  },

    // 17. Animação CSS Simples
    {
    "id": "criativa_css_anim_1",
    "tipo": "Pergunta",
    "titulo": "Ciclo Animado",
    "pergunta": "A animação CSS abaixo tenta representar um ciclo. Qual ciclo natural ela melhor simboliza?<br><br>\n<style>\n@keyframes waterCycle { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 25% { transform: translateY(-20px) rotate(5deg); opacity: 0.5; } 50% { transform: translateY(-40px) rotate(0deg); opacity: 0.2; } 75% { transform: translateY(-20px) rotate(-5deg); opacity: 0.5; } 100% { transform: translateY(0) rotate(0deg); opacity: 1; } }\n.water-drop { display: inline-block; font-size: 2.5em; animation: waterCycle 4s ease-in-out infinite; margin: 20px; }\n</style>\n<div style='text-align:center;'>\n  <span>☀️</span>\n  <span class='water-drop'>💧</span>\n  <span>☁️</span>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Ciclo do Carbono" },
      { "id": 2, "texto": "Ciclo da Água" },
      { "id": 3, "texto": "Ciclo do Nitrogênio" },
      { "id": 4, "texto": "Cadeia Alimentar" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["Criat__CSSAnimacao"],
    "fontes": [],
    "vantagem": "Correto! Simboliza a evaporação e condensação.",
    "desvantagem": "Incorreto. Observe os símbolos e o movimento.",
    "dica": "Gota d'água, Sol, Nuvem..."
  },

  // 18. Verdadeiro ou Falso com Justificativa (Pergunta)
  {
    "id": "criativa_vf_justifica_1",
    "tipo": "Pergunta",
    "titulo": "Verdadeiro ou Falso?",
    "pergunta": "Afirmação: \"Produtos com selo 'natural' são sempre livres de agrotóxicos.\"<br><br>Esta afirmação é verdadeira ou falsa?",
    "opcoes": [
      { "id": 1, "texto": "Verdadeira" },
      { "id": 2, "texto": "Falsa (Selo 'orgânico' que garante ausência de agrotóxicos sintéticos)" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "normal",
    "categorias": ["Criat__VerdadeiroFalso"],
    "fontes": ["Certificação Orgânica"],
    "vantagem": "Correto! 'Natural' não tem regulamentação clara como 'orgânico'.",
    "desvantagem": "Incorreto. O termo 'natural' pode ser vago.",
    "dica": "Qual selo tem regras mais rígidas sobre pesticidas?"
  },

  // 19. Conselho Ambiental (Vantagem)
  {
    "id": "criativa_conselho_1",
    "tipo": "Vantagem",
    "titulo": "Conselho do Sábio",
    "pergunta": "<div style='padding: 15px; border-left: 5px solid #16a34a; background-color: #f0fdf4;'>\n  <p style='font-style: italic;'>\"A melhor forma de prever o futuro é criá-lo. Pequenas ações sustentáveis hoje garantem um amanhã melhor.\"</p>\n  <p style='text-align: right; font-size: 0.9em; margin-top: 10px;'>- Sábio da Montanha Verde</p>\n  <p style='text-align: center; font-weight: bold; margin-top: 15px;'>Ganhe +10 de Progresso pela inspiração!</p>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Absorver a sabedoria" } ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Criat__Conselho"],
    "fontes": [],
    "vantagem": "+10 de Progresso pela inspiração!",
    "desvantagem": "",
    "dica": "Inspire-se!"
  },

  // 20. Código Morse Ambiental (Pergunta)
  {
    "id": "criativa_morse_1",
    "tipo": "Pergunta",
    "titulo": "Código Morse Verde",
    "pergunta": "Decifre a mensagem em código Morse:<br><br><code style='font-size: 1.3em; display: block; text-align: center; letter-spacing: 5px; margin: 15px 0; padding: 10px; background:#eee;'>... .- .-.. ...- . / .- / ..-. .-.. --- .-. . ... - .-</code><br><br><small>(Lembrete: S=... A=.- L=.-.. V=...- E= . / F=..-. L=.-.. O=--- R=.-. E= . S=... T= - A=.-)</small>",
    "opcoes": [
      { "id": 1, "texto": "RECICLE O LIXO" },
      { "id": 2, "texto": "PROTEJA OS RIOS" },
      { "id": 3, "texto": "SALVE A FLORESTA" },
      { "id": 4, "texto": "USE MENOS PLASTICO" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "normal",
    "categorias": ["Criat__CodigoMorse"],
    "fontes": ["Código Morse"],
    "vantagem": "Mensagem decifrada!",
    "desvantagem": "Tradução incorreta.",
    "dica": "Use o lembrete para traduzir letra por letra."
  },

    // 21. Gerador de Ideias (Outras - Informativo)
  {
    "id": "criativa_gerador_ideia_1",
    "tipo": "Outras",
    "titulo": "Gerador de Ideias Sustentáveis",
    "pergunta": "<div style='padding: 15px; border: 1px solid #6366f1; border-radius: 5px; background: #eef2ff; text-align: center;'>\n  <p>Precisando de inspiração? Aqui vai uma ideia aleatória:</p>\n  <p style='font-size: 2em; margin: 10px 0;'>💡</p>\n  <p style='font-size: 1.1em; font-style: italic; margin-bottom: 15px;'><strong>\"Organize um dia de troca de roupas e objetos usados com seus amigos ou vizinhos.\"</strong></p>\n  <p style='font-size: 0.8em;'>Reduz o consumo, fortalece laços!</p>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Boa ideia!" }
    ],
    "respostaCorreta": [1], // Apenas confirmação
    "dificuldade": "facil",
    "categorias": ["Criat__GeradorIdeia"],
    "fontes": [],
    "vantagem": "Que a ideia inspire boas ações!",
    "desvantagem": "",
    "dica": "Compartilhar é cuidar (do planeta também)."
  },

  // 22. Previsão do Tempo Extremo (Desvantagem)
  {
    "id": "criativa_previsao_1",
    "tipo": "Desvantagem",
    "titulo": "Alerta de Temporal!",
    "pergunta": "<div style='padding: 15px; border: 2px solid #facc15; border-radius: 5px; background: #fefce8; text-align: center;'>\n  <p><strong>ALERTA METEOROLÓGICO!</strong></p>\n  <p style='font-size: 2.5em; margin: 5px 0;'>⛈️🌬️</p>\n  <p>Fortes chuvas e ventos se aproximam. Prepare-se!</p>\n  <p><strong>Todos os jogadores devem recuar 1 casa no tabuleiro como medida de precaução.</strong></p>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Se preparar para o impacto!" } ],
    "respostaCorreta": [],
    "dificuldade": "facil",
    "categorias": ["Criat__Previsao"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Todos recuaram 1 casa!", // Efeito aplicado a todos
    "dica": "Eventos climáticos extremos exigem cautela."
  },

  // 23. Caça ao Tesouro Ecológico (Pergunta com Descrição)
  {
    "id": "criativa_caca_tesouro_1",
    "tipo": "Pergunta",
    "titulo": "Caça ao Tesouro Verde",
    "pergunta": "Você seguiu as pistas e encontrou um local descrito como:<br><br><i>\"Onde a água doce encontra a salgada, lar de caranguejos e raízes aéreas que se adaptam à maré.\"</i><br><br>Que ecossistema é esse?",
    "opcoes": [
      { "id": 1, "texto": "Recife de Coral" },
      { "id": 2, "texto": "Manguezal" },
      { "id": 3, "texto": "Floresta Temperada" },
      { "id": 4, "texto": "Deserto" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "normal",
    "categorias": ["Criat__CacaTesouro"],
    "fontes": ["Ecossistemas Costeiros"],
    "vantagem": "Tesouro encontrado! É o manguezal.",
    "desvantagem": "Pista errada. Esse ecossistema é diferente.",
    "dica": "Pense em áreas costeiras com lama e árvores adaptadas."
  },

    // 24. Medidor de Biodiversidade (Visualização Simples)
  {
    "id": "criativa_biodiv_meter_1",
    "tipo": "Vantagem",
    "titulo": "Biodiversidade Local",
    "pergunta": "Seus esforços de conservação aumentaram a biodiversidade local! Veja o indicador:<br><br>\n<style>\n.bio-meter { width: 70%; max-width: 250px; height: 120px; border: 2px solid #15803d; border-radius: 8px; margin: 15px auto; padding: 10px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to top, #bbf7d0, #f0fdf4); }\n.bio-level { background-color: #22c55e; height: 85%; /* Nível Alto */ border-radius: 4px; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:1.1em; transition: height 0.5s ease; }\n.bio-icon { font-size: 1.5em; margin-right: 5px; }\n</style>\n<div class=\"bio-meter\">\n  <div class=\"bio-level\"><span class=\"bio-icon\">🦋</span><span>Alta</span></div>\n</div>\n<p style=\"text-align:center; font-weight:bold;\">Ganhe +1 Estrela Fixa!</p>",
    "opcoes": [ { "id": 1, "texto": "Comemorar a vida!" } ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Criat__Biodiversidade"],
    "fontes": [],
    "vantagem": "Ganhou 1 Estrela Fixa pela alta biodiversidade!", // Efeito aplicado
    "desvantagem": "",
    "dica": "Quanto mais vida, melhor!"
  },

  // 25. Quebra-Cabeça de Palavras (CompletarFrase Desafiador)
  {
    "id": "criativa_cf_palavras_1",
    "tipo": "CompletarFrase",
    "titulo": "Termo Ambiental Oculto",
    "pergunta": "Reorganize os fragmentos para formar um termo importante relacionado à variedade de vida na Terra:",
    "fraseIncompleta": "O termo é: __1____2____3____4____5____6____7____8____9____10____11____12____13____14__",
    "fragmentos": [
      { "id": 1, "texto": "D" }, { "id": 2, "texto": "I" }, { "id": 3, "texto": "V" },
      { "id": 4, "texto": "E" }, { "id": 5, "texto": "R" }, { "id": 6, "texto": "S" },
      { "id": 7, "texto": "I" }, { "id": 8, "texto": "D" }, { "id": 9, "texto": "A" },
      { "id": 10, "texto": "D" }, { "id": 11, "texto": "E" }, { "id": 12, "texto": "B" },
      { "id": 13, "texto": "I" }, { "id": 14, "texto": "O" } // Letras extras para confundir
    ],
    "respostaCorreta": [12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], // B I O D I V E R S I D A D E
    "opcoes": [],
    "dificuldade": "dificil",
    "categorias": ["Criat__QuebraCabeca"],
    "fontes": [],
    "vantagem": "Correto! BIODIVERSIDADE é a chave!",
    "desvantagem": "Letras fora de ordem.",
    "dica": "Começa com 'B' e se refere à variedade de vida."
  },

  // 22. Impacto a Longo Prazo (Outras - Escolha Simulada)
  {
    "id": "criativa_longo_prazo_1",
    "tipo": "Outras",
    "titulo": "Plantar Agora, Colher Depois",
    "pergunta": "<div style='text-align:center; padding:10px; border: 1px solid #fb923c; border-radius: 5px; background: #fff7ed;'>\n  <p>Você tem a chance de dedicar tempo agora para plantar árvores frutíferas.</p>\n  <p style='font-size: 2em; margin: 10px 0;'></p> <!-- Árvore + Maçã -->\n  <p><strong>Opção 1:</strong> Não plantar (sem efeito imediato).</p>\n  <p><strong>Opção 2:</strong> Plantar (-5 Progresso agora, mas existe uma chance de ganhar +1 Estrela Fixa no futuro).</p>\n  <p style='font-size:0.8em'>(O jogo/mestre pode sortear a chance da colheita futura)</p>\n</div>\n<br>Você vai plantar?",
    "opcoes": [
      { "id": 1, "texto": "Sim, vou plantar! (-5 Progresso)" },
      { "id": 2, "texto": "Não, foco no presente." }
    ],
    "respostaCorreta": [1, 2], // Ambas válidas
    "dificuldade": "normal",
    "categorias": ["Criativa_LongoPrazo"],
    "fontes": [],
    "vantagem": "Plantação iniciada! Tomara que dê bons frutos.", // Se escolher 1 (Efeito -5 Progresso no verificarResposta)
    "desvantagem": "Decidiu não plantar.", // Se escolher 2
    "dica": "Paciência e cuidado podem gerar grandes recompensas."
  },


    // 1. Bifurcação no Caminho (Escolha com HTML/CSS)
  {
    "id": "tabuleiro_bifurcacao_1",
    "tipo": "Outras",
    "titulo": "Bifurcação: Rota Cênica ou Atalho Industrial?",
    "pergunta": "<style>\n.path-choice-container { display: flex; justify-content: space-around; gap: 15px; margin: 15px 0; }\n.path-option { border: 2px solid #ccc; border-radius: 8px; padding: 10px; width: 45%; text-align: center; background: white; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }\n.path-option:hover { transform: scale(1.03); box-shadow: 0 4px 10px rgba(0,0,0,0.15); }\n.path-option strong { display: block; margin-bottom: 5px; }\n.path-icon { font-size: 2em; margin-bottom: 5px; }\n.path-consequence { font-size: 0.8em; color: #555; margin-top: 8px; }\n</style>\n<p style='text-align:center;'>Você chegou a uma bifurcação. Qual caminho seguir?</p>\n<div class=\"path-choice-container\">\n  <div class=\"path-option\" onclick=\"document.getElementById('opt-1').click();\" style=\"border-color: #22c55e;\">\n    <span class=\"path-icon\">🏞️</span>\n    <strong>Rota Cênica</strong>\n    <span class=\"path-consequence\">(+5 Progresso, +1 Rodada Preso - mais demorado)</span>\n  </div>\n  <div class=\"path-option\" onclick=\"document.getElementById('opt-2').click();\" style=\"border-color: #78716c;\">\n    <span class=\"path-icon\">🏭</span>\n    <strong>Atalho Industrial</strong>\n    <span class=\"path-consequence\">(-5 Progresso, avança 2 casas extras)</span>\n  </div>\n</div>\n<p style='text-align:center; font-size:0.9em;'>Clique na opção desejada ou escolha abaixo.</p>",
    "opcoes": [
      { "id": 1, "texto": "Escolher Rota Cênica" },
      { "id": 2, "texto": "Escolher Atalho Industrial" }
    ],
    "respostaCorreta": [1, 2], // Ambas válidas
    "dificuldade": "normal",
    "categorias": ["Tabuleiro_EscolhaCaminho"],
    "fontes": [],
    "vantagem": "Caminho escolhido! Aplique as consequências.", // Efeito aplicado no jogo
    "desvantagem": "Caminho escolhido! Aplique as consequências.",
    "dica": "Qual o seu objetivo: progresso ou avanço rápido?"
  },

  // 2. Ponte Quebrada (Necessita Recurso - Simulado)
  {
    "id": "tabuleiro_ponte_1",
    "tipo": "Desvantagem", // Bloqueia se não tiver recurso
    "titulo": "Ponte Quebrada!",
    "pergunta": "<div style='text-align:center; padding:10px; border: 2px dashed #b91c1c; border-radius: 5px; background: #fee2e2;'>\n  <p>A ponte à frente está quebrada!</p>\n  <p style='font-size: 2em; margin: 10px 0;'>🌉💥</p>\n  <p>Você precisa de <strong>1 'Kit de Reparo'</strong> (recurso do jogo) para consertá-la e prosseguir.</p>\n  <p><strong>Se tiver o kit:</strong> Perca o kit e avance normalmente.</p>\n  <p><strong>Se NÃO tiver:</strong> Volte 3 casas.</p>\n  <p style='font-size:0.8em'>(O Mestre do Jogo verifica seu inventário)</p>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Verificar inventário..." } ],
    "respostaCorreta": [],
    "dificuldade": "normal",
    "categorias": ["Tabuleiro_BloqueioRecurso"],
    "fontes": [],
    "vantagem": "Você usou o Kit de Reparo e consertou a ponte!", // Mensagem se tiver o kit
    "desvantagem": "Sem Kit de Reparo! Volte 3 casas.", // Mensagem se não tiver
    "dica": "Esteja sempre preparado com recursos!"
  },

  // 3. Teletransporte Ecológico (Movimento Especial)
  {
    "id": "tabuleiro_teleporte_1",
    "tipo": "Vantagem",
    "titulo": "Portal da Reciclagem",
    "pergunta": "<div style='text-align:center; padding:10px; border: 2px solid #8b5cf6; border-radius: 50%; width: 200px; height: 200px; margin: auto; display: flex; flex-direction: column; justify-content: center; background: radial-gradient(circle, #ede9fe, #d8b4fe);'>\n  <p style='font-size: 2.5em; margin-bottom: 5px;'>♻️</p>\n  <p style='font-weight: bold; color: #5b21b6;'>Portal Mágico!</p>\n  <p style='font-size: 0.9em;'>Descarte corretamente e viaje instantaneamente!</p>\n  <strong>Avance para a próxima casa 'Ponto de Coleta' do tabuleiro.</strong>\n</div>",
    "opcoes": [ { "id": 1, "texto": "Viajar!" } ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["Tabuleiro_Teleporte"],
    "fontes": [],
    "vantagem": "Você foi transportado para o Ponto de Coleta!", // Efeito no jogo
    "desvantagem": "",
    "dica": "A reciclagem abre caminhos!"
  },

  // --- CARTAS DE TAREFA E INTERAÇÃO COM CASAS ---

  // 4. Tarefa: Coleta de Lixo na Casa Atual
  {
    "id": "tabuleiro_tarefa_coleta_1",
    "tipo": "Pergunta", // Uma pergunta simples para simular a tarefa
    "titulo": "Tarefa: Limpeza Local",
    "pergunta": "<div style='text-align:center; padding: 10px; border: 1px solid #fb923c; background: #fff7ed; border-radius: 5px;'>\n  <p>Você parou em uma casa que precisa de limpeza!</p>\n  <p style='font-size: 2em; margin: 10px 0;'>🗑️🧹</p>\n  <p>Para concluir a tarefa e ganhar a recompensa (+10 Progresso), responda:</p>\n  <strong>Qual o tempo médio de decomposição de uma bituca de cigarro?</strong>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "1 a 6 meses" },
      { "id": 2, "texto": "1 a 2 anos" },
      { "id": 3, "texto": "5 a 10 anos" },
      { "id": 4, "texto": "Mais de 100 anos" }
    ],
    "respostaCorreta": 3,
    "dificuldade": "normal",
    "categorias": ["Tabuleiro_TarefaCasa"],
    "fontes": ["Tempo de Decomposição"],
    "vantagem": "Correto! Tarefa concluída, +10 Progresso!",
    "desvantagem": "Incorreto. A bituca demora bastante. Tarefa não concluída.",
    "dica": "Filtros de cigarro contêm plástico."
  },

  // 5. Casa de Conhecimento (Quiz com <details>)
  {
    "id": "tabuleiro_casa_quiz_1",
    "tipo": "Pergunta",
    "titulo": "Casa do Saber Ambiental",
    "pergunta": "Você caiu na Casa do Saber! Responda corretamente para ganhar um benefício.<br><br>\n<details style='margin: 10px 0;'>\n  <summary style='cursor: pointer; font-weight: bold; color: #1d4ed8;'>Ver Pergunta</summary>\n  <p style='margin-top: 10px; padding: 10px; background: #eff6ff; border-left: 3px solid #60a5fa;'>\n    Qual o nome do processo pelo qual plantas e algas usam luz solar, água e CO₂ para criar seu próprio alimento?\n  </p>\n</details>",
    "opcoes": [
      { "id": 1, "texto": "Respiração Celular" },
      { "id": 2, "texto": "Fotossíntese" },
      { "id": 3, "texto": "Decomposição" },
      { "id": 4, "texto": "Quimiossíntese" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["Tabuleiro_CasaEspecial"],
    "fontes": ["Biologia Básica"],
    "vantagem": "Correto! Ganhe +1 Pulo pelo seu conhecimento!",
    "desvantagem": "Incorreto. Continue estudando!",
    "dica": "Começa com 'Foto' e tem a ver com luz."
  },

  // 6. Casa 'Mercado' (Link para Loja - Simulado)
  {
    "id": "tabuleiro_casa_mercado_1",
    "tipo": "Outras",
    "titulo": "Visita ao Mercado Sustentável",
    "pergunta": "<div style='text-align:center;'>\n <p>Você chegou ao Mercado! Quer dar uma olhada nas ofertas?</p>\n <p style='font-size: 2em; margin: 10px 0;'>🛒</p>\n <p><a href='#shop-popup' style='display: inline-block; padding: 8px 15px; background: #16a34a; color: white; text-decoration: none; border-radius: 5px;'>Ver Ofertas (Abrir Loja)</a></p>\n \n <style>\n .shop-popup-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: none; justify-content: center; align-items: center; z-index: 1002; }\n .shop-popup-overlay:target { display: flex; }\n .shop-popup-content { background: #f0fdf4; padding: 20px; border-radius: 8px; max-width: 400px; border: 2px solid #15803d; position: relative; }\n .shop-popup-content h5 { text-align:center; margin: 0 0 15px 0; color: #14532d; }\n .shop-item { display: flex; justify-content: space-between; align-items: center; padding: 8px; border-bottom: 1px dashed #a7f3d0; }\n .shop-item span { font-size: 0.9em; }\n .shop-close { position: absolute; top: 5px; right: 10px; font-size: 24px; color: #166534; text-decoration: none; }\n </style>\n \n <div id='shop-popup' class='shop-popup-overlay'>\n  <div class='shop-popup-content'>\n   <a href='#' class='shop-close' title='Fechar'>×</a>\n   <h5>Ofertas Especiais</h5>\n   <div class='shop-item'><span>Kit de Reparo 🛠️</span> <strong>Custo: 1 Estrela</strong></div>\n   <div class='shop-item'><span>Semente Mágica 🌱 (+5 Progresso)</span> <strong>Custo: 1 Estrela</strong></div>\n   <div class='shop-item'><span>Garrafa Reutilizável 💧 (Evita próxima Desvantagem de Lixo)</span> <strong>Custo: 2 Estrelas</strong></div>\n   <p style='font-size: 0.8em; text-align: center; margin-top: 15px;'>Use o botão 'Próxima Carta' para comprar (se tiver estrelas).</p>\n  </div>\n </div>\n</div>",
    "opcoes": [
      // O jogador usaria as opções normais do jogo para "comprar" após ver o popup
      { "id": 201, "texto": "Comprar Kit Reparo (Custo: 1 Estrela)" },
      { "id": 202, "texto": "Comprar Semente Mágica (Custo: 1 Estrela)" },
      { "id": 203, "texto": "Comprar Garrafa (Custo: 2 Estrelas)" },
      { "id": 204, "texto": "Sair do Mercado" }
    ],
    "respostaCorreta": [201, 202, 203], // IDs das compras
    "dificuldade": "normal",
    "categorias": ["Tabuleiro_CasaEspecial"],
    "fontes": [],
    "vantagem": "Item comprado!", // Se escolher 201, 202 ou 203 (efeito aplicado no verificarResposta)
    "desvantagem": "Obrigado pela visita!", // Se escolher 204
    "dica": "Invista em itens úteis!"
  },

  // --- CARTAS DE SORTE/AZAR ---

  // 7. Roda da Fortuna Ambiental (CSS :target)
  {
    "id": "criativa_roda_fortuna_1",
    "tipo": "Vantagem", // A base é sorte, geralmente positiva
    "titulo": "Roda da Fortuna Verde",
    "pergunta": "<style>\n@keyframes spin { 100% { transform: rotate(1800deg); } } \n.wheel-container { text-align: center; margin: 15px 0; }\n.wheel { width: 150px; height: 150px; border-radius: 50%; border: 5px solid #65a30d; background: conic-gradient(#bef264 0% 25%, #a3e635 25% 50%, #84cc16 50% 75%, #65a30d 75% 100%); position: relative; margin: auto; animation: spin 3s ease-out forwards; /* Simula giro */ }\n.wheel-pointer { width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 20px solid #dc2626; position: absolute; top: -25px; left: 50%; transform: translateX(-50%); }\n.wheel-result { font-weight: bold; margin-top: 15px; font-size: 1.1em; animation: fadeInResult 1s 3s forwards; opacity: 0; }\n@keyframes fadeInResult { to { opacity: 1; } }\n</style>\n<p style='text-align:center;'>Gire a Roda da Fortuna Ambiental!</p>\n<div class='wheel-container'>\n <div class='wheel'><div class='wheel-pointer'></div></div>\n <p class='wheel-result'>Resultado: +1 Pulo!</p> <!-- Prêmio desta instância -->\n</div>",
    "opcoes": [ { "id": 1, "texto": "Girar a Roda!" } ],
    "respostaCorreta": [1],
    "dificuldade": "facil",
    "categorias": ["_Criativa_SorteAzar"],
    "fontes": [],
    "vantagem": "Você ganhou +1 Pulo!", // Efeito real aplicado
    "desvantagem": "",
    "dica": "Veja onde a sorte te leva."
  },

  // 8. Carta 'Imprevisto' com opções ocultas (<details>)
  {
    "id": "criativa_imprevisto_1",
    "tipo": "Outras",
    "titulo": "Imprevisto na Trilha",
    "pergunta": "<p style='text-align:center;'>Um imprevisto aconteceu! Escolha uma opção para lidar com a situação (clique para revelar as consequências):</p>\n<div style='margin-top: 15px; display: flex; justify-content: space-around;'>\n <details style='width: 45%; border: 1px solid #ccc; border-radius: 4px; background: white;'>\n   <summary style='padding: 10px; cursor: pointer; font-weight: bold;'>Opção A: Agir Rápido</summary>\n   <p style='padding: 10px; border-top: 1px solid #eee; font-size: 0.9em;'>Resolve rápido, mas pode ter pequeno impacto negativo (-5 Progresso).</p>\n </details>\n <details style='width: 45%; border: 1px solid #ccc; border-radius: 4px; background: white;'>\n   <summary style='padding: 10px; cursor: pointer; font-weight: bold;'>Opção B: Analisar Melhor</summary>\n   <p style='padding: 10px; border-top: 1px solid #eee; font-size: 0.9em;'>Leva mais tempo (fique 1 rodada preso), mas evita impacto negativo.</p>\n </details>\n</div>",
    "opcoes": [
      { "id": 1, "texto": "Escolher A: Agir Rápido (-5 Progresso)" },
      { "id": 2, "texto": "Escolher B: Analisar Melhor (-1 Rodada)" }
    ],
    "respostaCorreta": [1, 2],
    "dificuldade": "normal",
    "categorias": ["_Criativa_EscolhaOculta"],
    "fontes": [],
    "vantagem": "Decisão tomada e consequência aplicada!", // Se escolheu 1
    "desvantagem": "Decisão tomada e consequência aplicada!", // Se escolheu 2
    "dica": "Clique nas opções para ver o que acontece."
  },

  // --- MAIS 17 CARTAS VARIADAS ---

  // 9. Enigma Visual (PontoCerto)
  { "id": "criativa_pc_enigma_1", "tipo": "PontoCerto", "titulo": "Símbolo Oculto", "pergunta": "Há um símbolo de 'energia limpa' escondido sutilmente nesta paisagem industrial. Clique nele!", "imagemURL": "/images/paisagem_industrial_com_simbolo.png", "zonasClicaveis": [ { "id": 1, "x": 0.75, "y": 0.15, "largura": 0.08, "altura": 0.12, "descricao": "Símbolo Eólico Pequeno" } ], "respostaCorreta": 1, "opcoes": [], "dificuldade": "dificil", "categorias": ["_Criativa_PontoCerto"], "fontes": [], "vantagem": "Olho de águia! Encontrou.", "desvantagem": "Não está ali. Procure bem!", "dica": "Pode estar em uma chaminé ou telhado..." },

  // 10. "Arrume a Frase" (Ordem)
  { "id": "criativa_ordem_frase_1", "tipo": "Ordem", "titulo": "Arrume o Slogan", "pergunta": "Coloque as palavras na ordem correta para formar um slogan sustentável:", "opcoes": [ { "id": 1, "texto": "PLANETA" }, { "id": 2, "texto": "UM" }, { "id": 3, "texto": "SALVAR" }, { "id": 4, "texto": "NÃO HÁ" }, { "id": 5, "texto": "B" } ], "respostaCorreta": [4, 1, 5, 3, 2], // NÃO HÁ PLANETA B SALVAR UM (?? - ajustar lógica ou palavras) - Exemplo: [4, 5, 1, 3, 2] -> NÃO HÁ PLANETA B SALVAR UM -> Ajuste: [4,5,1,2] -> Não Há Planeta B
    "respostaCorreta": [4, 5, 1], // Ajuste para "NÃO HÁ PLANETA B"
    "opcoes": [ { "id": 1, "texto": "PLANETA" }, { "id": 2, "texto": "UM FUTURO" }, { "id": 3, "texto": "SALVAR" }, { "id": 4, "texto": "NÃO HÁ" }, { "id": 5, "texto": "B" } ],
    "respostaCorreta": [4, 5, 1], // NÃO HÁ PLANETA B
    "dificuldade": "facil", "categorias": ["_Criativa_Ordem"], "fontes": [], "vantagem": "Slogan correto!", "desvantagem": "Palavras fora do lugar.", "dica": "É uma frase famosa sobre alternativas." },

  // 11. Escolha de Dieta (Outras)
  { "id": "criativa_dieta_1", "tipo": "Outras", "titulo": "Escolha sua Refeição", "pergunta": "Qual refeição tem, geralmente, o <strong>menor impacto ambiental</strong> (em termos de emissões e uso de terra)?", "opcoes": [ { "id": 1, "texto": "Prato com Carne Vermelha (-10 Progresso)" }, { "id": 2, "texto": "Prato com Frango (-3 Progresso)" }, { "id": 3, "texto": "Prato Vegetariano/Vegano (+5 Progresso)" } ], "respostaCorreta": [1, 2, 3], "dificuldade": "facil", "categorias": ["_Criativa_EscolhaImpacto"], "fontes": ["Impacto Alimentar"], "vantagem": "Escolha alimentar feita!", "desvantagem": "", "dica": "Produção animal tem maior pegada." },

  // 12. Identifique a Espécie Invasora (Pergunta com Imagem)
  { "id": "criativa_invasora_1", "tipo": "Pergunta", "titulo": "Espécie Invasora?", "pergunta": "Qual destes peixes é considerado uma espécie invasora prejudicial em muitos ecossistemas brasileiros?<br><img src='/images/peixes_variados.png' alt='Peixes' style='max-width:250px; margin:10px auto; display:block;'>", "opcoes": [ { "id": 1, "texto": "Tucunaré (Nativo Amazônia)" }, { "id": 2, "texto": "Tilápia (Exótica/Invasora)" }, { "id": 3, "texto": "Dourado (Nativo Bacia Paraná)" }, { "id": 4, "texto": "Pirarucu (Nativo Amazônia)" } ], "respostaCorreta": 2, "dificuldade": "normal", "categorias": ["_Criativa_EspeciesInvasoras"], "fontes": ["Biologia Aquática"], "vantagem": "Correto! A tilápia, apesar de cultivada, causa problemas solta.", "desvantagem": "Incorreto. Este peixe é nativo ou menos problemático.", "dica": "Qual deles foi introduzido da África?" },

  // 13. Carta de Legislação (Vantagem/Desvantagem Condicional)
  { "id": "criativa_lei_1", "tipo": "Outras", "titulo": "Nova Lei Ambiental", "pergunta": "<p>Uma nova lei de proteção de mananciais foi aprovada!</p> <ul><li>Se você tiver <strong>mais Acertos do que Erros</strong>: Ganhe +15 Progresso.</li><li>Se tiver <strong>mais Erros do que Acertos</strong>: Perca 1 Pulo (se tiver).</li></ul>", "opcoes": [ { "id": 1, "texto": "Verificar meu histórico..." } ], "respostaCorreta": [1], "dificuldade": "normal", "categorias": ["_Criativa_LeiCondicional"], "fontes": [], "vantagem": "Lei aplicada! (+15 Progresso)", // Mensagem se condição OK
    "desvantagem": "Lei aplicada! (-1 Pulo ou sem efeito)", // Mensagem se condição NOK
    "dica": "Boas ações são recompensadas pela lei!" },

  // 14. Reparo Coletivo (Simulado)
  { "id": "criativa_reparo_coletivo_1", "tipo": "Outras", "titulo": "Mutirão: Consertar Bem Comum", "pergunta": "<p>A praça local precisa de reparos (bancos quebrados, lixeiras danificadas).</p><p style='font-size: 1.8em; text-align:center; margin:10px;'>🛠️🌳</p><p>Se <strong>pelo menos 2 jogadores</strong> (incluindo você) concordarem em 'gastar' 5 de Progresso cada um neste turno, a praça é consertada e <strong>todos</strong> os participantes do mutirão ganham +1 Estrela Bônus na próxima rodada.</p>", "opcoes": [ { "id": 1, "texto": "Eu topo participar! (-5 Progresso)" }, { "id": 2, "texto": "Não posso ajudar agora." } ], "respostaCorreta": [1, 2], "dificuldade": "normal", "categorias": ["_Criativa_Mutirao"], "fontes": [], "vantagem": "Você se ofereceu! Veja se outros topam.", "desvantagem": "Você decidiu não participar do mutirão.", "dica": "A união faz a força (e conserta a praça)." },

  // 15. "Qual o Intruso?" (Pergunta com Lista HTML)
  { "id": "criativa_intruso_1", "tipo": "Pergunta", "titulo": "Qual o Intruso?", "pergunta": "Todos os itens abaixo são fontes de energia renovável, <strong>EXCETO UM</strong>. Qual é o intruso?<ul><li>Solar</li><li>Eólica</li><li>Hidrelétrica</li><li>Biomassa</li><li>Gás Natural</li><li>Geotérmica</li></ul>", "opcoes": [ { "id": 1, "texto": "Solar" }, { "id": 2, "texto": "Eólica" }, { "id": 3, "texto": "Hidrelétrica" }, { "id": 4, "texto": "Biomassa" }, { "id": 5, "texto": "Gás Natural" }, { "id": 6, "texto": "Geotérmica" } ], "respostaCorreta": 5, "dificuldade": "facil", "categorias": ["_Criativa_Intruso"], "fontes": ["Fontes de Energia"], "vantagem": "Correto! Gás natural é fóssil.", "desvantagem": "Incorreto. Esta é uma fonte renovável.", "dica": "Qual deles vem do subsolo e levou milhões de anos para se formar?" },

  // 16. Carta de Reflexão (Sem Efeito Mecânico Direto)
  { "id": "criativa_reflexao_1", "tipo": "Outras", "titulo": "Momento de Reflexão", "pergunta": "<div style='padding: 15px; font-style: italic; text-align: center; background-color: #fef9c3; border: 1px solid #fde047; border-radius: 5px;'>\"O maior perigo para o nosso planeta é a crença de que outra pessoa o salvará.\"<br>- Robert Swan</div><br><p style='text-align:center;'>Pense sobre isso em sua jornada.</p>", "opcoes": [ { "id": 1, "texto": "Refletir..." } ], "respostaCorreta": [1], "dificuldade": "facil", "categorias": ["_Criativa_Reflexao"], "fontes": ["Citações"], "vantagem": "Momento importante para pensar.", "desvantagem": "", "dica": "" },

  // 17. "Complete o Ditado" (CompletarFrase)
  { "id": "criativa_cf_ditado_1", "tipo": "CompletarFrase", "titulo": "Ditado Popular Verde", "pergunta": "Complete o ditado popular adaptado:", "fraseIncompleta": "\"Água mole em pedra dura, tanto bate até que __1__... <br>...e o __2__ agradece!\"", "fragmentos": [ { "id": 1, "texto": "fura" }, { "id": 2, "texto": "rio" }, { "id": 3, "texto": "seca" }, { "id": 4, "texto": "mar" }, { "id": 5, "texto": "solo" } ], "respostaCorreta": [1, 5], // fura, solo
    "dificuldade": "facil", "categorias": ["_Criativa_CompletarFrase"], "fontes": [], "vantagem": "Ditado completo!", "desvantagem": "Não é bem assim o ditado (adaptado).", "dica": "A primeira parte é o ditado original. O que se beneficia da infiltração?" },

  // 18. Escolha de Investimento P&D (Pesquisa e Desenvolvimento)
    { "id": "criativa_invest_pd_1", "tipo": "Outras", "titulo": "Investir em P&D Verde", "pergunta": "Sua fundação pode investir em uma de duas áreas de pesquisa. Qual escolher?", "opcoes": [ {"id": 1, "texto": "Baterias mais eficientes (Ajuda transporte elétrico) (-1 Estrela, + chance futura Vantagem)"}, {"id": 2, "texto": "Técnicas de agricultura vertical (Ajuda alimentação urbana) (-1 Estrela, + chance futura Vantagem)"}], "respostaCorreta": [1, 2], "dificuldade": "normal", "categorias": ["Criativa_InvestimentoPD"], "fontes": [], "vantagem": "Investimento direcionado! Que traga bons resultados.", "desvantagem": "", "dica": "Ambos são importantes, qual te parece mais estratégico?"},

    // 19. Carta "O que você faria?" - Cenário Aberto
    { "id": "criativa_cenario_1", "tipo": "Outras", "titulo": "Cenário: Falta de Água", "pergunta": "<p>A sua comunidade enfrenta uma severa falta de água devido à seca.</p><p style='font-size: 2em; text-align:center; margin:10px;'>🚱</p><p><strong>Descreva brevemente (para os outros jogadores) uma ação concreta que você tomaria para ajudar.</strong></p><p style='font-size:0.8em'>(Não há resposta certa/errada mecânica, mas a discussão pode gerar bônus pelo Mestre)</p>", "opcoes": [ {"id": 1, "texto": "Compartilhar minha ideia"} ], "respostaCorreta": [1], "dificuldade": "normal", "categorias": ["_Criativa_CenarioAberto"], "fontes": [], "vantagem": "Obrigado por compartilhar sua iniciativa!", "desvantagem": "", "dica": "Pense em reúso, economia, conscientização..." },

    // 20. Tabuleiro de Jogo da Velha Ecológico (Simulado)
    { "id": "criativa_jogo_velha_1", "tipo": "Pergunta", "titulo": "# Ecológico", "pergunta": "No jogo da velha abaixo, qual símbolo representa uma ação MAIS sustentável para se 'vencer' (fazer 3 em linha)?<br><br>\n<style>\n.tic-tac-toe { display: grid; grid-template-columns: repeat(3, 50px); grid-template-rows: repeat(3, 50px); gap: 5px; justify-content: center; margin: 15px auto; }\n.tic-tac-toe div { border: 2px solid #6b7280; display: flex; justify-content: center; align-items: center; font-size: 24px; background: white; }\n</style>\n<div class=\"tic-tac-toe\">\n  <div>🚲</div> <div>🌳</div> <div><span style='color:red'>🚗</span></div>\n  <div><span style='color:red'>🏭</span></div> <div>♻️</div> <div>☀️</div>\n  <div><span style='color:red'>🗑️</span></div> <div>💧</div> <div>🌱</div>\n</div>", "opcoes": [ {"id": 1, "texto": "Carro (🚗)"}, {"id": 2, "texto": "Reciclagem (♻️)"}, {"id": 3, "texto": "Fábrica (🏭)"}, {"id": 4, "texto": "Lixo (🗑️)"} ], "respostaCorreta": 2, "dificuldade": "facil", "categorias": ["_Criativa_JogoSimulado"], "fontes": [], "vantagem": "Correto! Reciclar é uma jogada vencedora.", "desvantagem": "Incorreto. Esse símbolo representa algo menos sustentável.", "dica": "Procure pelos símbolos verdes ou que representam a natureza/renovação." },

    // 21. Carta de Mímica/Desenho (Tarefa Interativa)
    { "id": "criativa_mimica_1", "tipo": "Outras", "titulo": "Mímica Verde!", "pergunta": "<p style='text-align:center'>É hora de interagir!</p><p style='font-size: 2em; text-align:center; margin:10px;'>🎭✏️</p><p>Você deve fazer uma <strong>mímica</strong> ou <strong>desenhar</strong> para os outros jogadores adivinharem o seguinte termo ambiental:</p><p style='font-size: 1.2em; font-weight: bold; text-align:center; background: #eee; padding: 8px; margin: 10px auto; width: fit-content;'>\"ENERGIA SOLAR\"</p><p style='font-size:0.8em'>(Se alguém acertar em 1 minuto, você e quem acertou ganham +10 Progresso. O Mestre controla o tempo e a pontuação)</p>", "opcoes": [ {"id": 1, "texto": "Começar a Mímica/Desenho!"} ], "respostaCorreta": [1], "dificuldade": "normal", "categorias": ["_Criativa_Interativa"], "fontes": [], "vantagem": "Prepare-se para atuar/desenhar!", "desvantagem": "", "dica": "Use gestos para o sol e eletricidade!" },

    // 22. Carta "Escolha Seu Destino" (Aleatório Simulado com :target)
    { "id": "criativa_destino_1", "tipo": "Outras", "titulo": "Encruzilhada do Destino", "pergunta": "<style>\n.destiny-choice a { display: inline-block; padding: 15px; margin: 10px; border: 2px solid #8b5cf6; border-radius: 50%; font-size: 2em; text-decoration: none; background: white; transition: background 0.3s; }\n.destiny-choice a:hover { background: #ede9fe; }\n.destiny-popup { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.7); display:none; justify-content:center; align-items:center; z-index:1003; }\n.destiny-popup:target { display:flex; }\n.destiny-content { background:white; padding:20px; border-radius:5px; text-align:center; position:relative; }\n.destiny-close { position:absolute; top:5px; right:10px; font-size:24px; text-decoration:none; color:#888; }\n</style>\n<p style='text-align:center;'>O destino te oferece três caminhos misteriosos. Escolha um clicando no símbolo:</p>\n<div class='destiny-choice' style='text-align:center;'>\n  <a href='#destiny-1'>❓</a>\n  <a href='#destiny-2'>❓</a>\n  <a href='#destiny-3'>❓</a>\n</div>\n\n<div id='destiny-1' class='destiny-popup'><div class='destiny-content'><a href='#' class='destiny-close'>×</a><h4>Caminho da Água</h4><p style='font-size:3em'>💧</p><p>Você encontrou uma nascente! <strong>+10 Progresso.</strong></p></div></div>\n<div id='destiny-2' class='destiny-popup'><div class='destiny-content'><a href='#' class='destiny-close'>×</a><h4>Caminho da Terra</h4><p style='font-size:3em'>🌳</p><p>Boas práticas de manejo! <strong>+1 Pulo.</strong></p></div></div>\n<div id='destiny-3' class='destiny-popup'><div class='destiny-content'><a href='#' class='destiny-close'>×</a><h4>Caminho do Vento</h4><p style='font-size:3em'>💨</p><p>Uma rajada te atrasou! <strong>-5 Progresso.</strong></p></div></div>\n<p style='text-align:center; font-size:0.8em;'>Após escolher, clique no botão abaixo para confirmar o efeito.</p>", "opcoes": [ {"id": 1, "texto": "Confirmar Destino Escolhido"} ], // Jogador clica no símbolo, depois confirma aqui
    "respostaCorreta": [1], "dificuldade": "facil", "categorias": ["_Criativa_EscolhaDestino"], "fontes": [], "vantagem": "Destino revelado!", "desvantagem": "", "dica": "Qual elemento te trará mais sorte?" },

    // 24. Barra de Saúde do Planeta (Visualização)
    {
        "id": "criativa_healthbar_1",
        "tipo": "Outras", // Informativo
        "titulo": "Status Global",
        "pergunta": "A saúde geral do planeta, baseada nas ações de todos, está assim:<br><br>\n<style>\n.planet-health-bar { width: 90%; height: 30px; background-color: #ef4444; /* Vermelho base */ margin: 15px auto; border-radius: 15px; border: 2px solid #b91c1c; overflow: hidden; position: relative; }\n.planet-health-fill { width: 40%; /* Nível atual da saúde */ height: 100%; background-color: #84cc16; /* Verde */ border-radius: 13px 0 0 13px; transition: width 0.5s ease-in-out; }\n.planet-health-text { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; text-shadow: 1px 1px 2px black; font-size: 0.9em; }\n</style>\n<div class=\"planet-health-bar\">\n  <div class=\"planet-health-fill\"></div>\n  <div class=\"planet-health-text\">Saúde do Planeta: 40%</div>\n</div>\n<p style='text-align:center; font-size:0.8em'>Melhorem suas ações para aumentar a barra!</p>",
        "opcoes": [ { "id": 1, "texto": "Entendido" } ],
        "respostaCorreta": [1],
        "dificuldade": "facil",
        "categorias": ["_Criativa_HealthBar"],
        "fontes": [],
        "vantagem": "Continue jogando para melhorar a saúde do planeta!",
        "desvantagem": "",
        "dica": "A barra verde indica a saúde atual."
    },

    // 25. Mensagem Criptografada (Atbash Simples)
    {
        "id": "criativa_atbash_1",
        "tipo": "Pergunta",
        "titulo": "Código Secreto Atbash",
        "pergunta": "Decifre a mensagem usando a cifra Atbash (A=Z, B=Y, C=X,...):<br><br><code style='font-family: monospace; font-size: 1.2em; display: block; text-align: center; letter-spacing: 3px; background: #eee; padding: 10px; border-radius: 4px;'>HVWFIGZ URIZ</code>",
        "opcoes": [
            { "id": 1, "texto": "PLANTE ARVORE" },
            { "id": 2, "texto": "RECICLE LIXO" },
            { "id": 3, "texto": "PRESERVE AGUA" },
            { "id": 4, "texto": "REDUZA CONSUMO" }
        ],
        "respostaCorreta": 1, // HVWFIGZ URIZ -> PLANTAR ARVORE
        "dificuldade": "normal",
        "categorias": ["_Criativa_Criptografia"],
        "fontes": ["Cifra Atbash"],
        "vantagem": "Código quebrado! Mensagem revelada.",
        "desvantagem": "Tradução incorreta. Lembre-se: A vira Z, B vira Y...",
        "dica": "É uma inversão direta do alfabeto."
    },
      // --- LAYOUT E APRESENTAÇÃO ---
      {
        "id": "html_grid_layout_1",
        "tipo": "Pergunta",
        "titulo": "Análise de Impacto (Grid)",
        "pergunta": "<style>\n.impact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-top: 10px; }\n.impact-item { border: 1px solid #ccc; padding: 8px; border-radius: 4px; text-align: center; background-color: #f9f9f9; }\n.impact-item strong { display: block; margin-bottom: 5px; font-size: 1.1em; }\n.impact-value { font-size: 1.5em; font-weight: bold; }\n.impact-value.high { color: #dc2626; } /* Red */\n.impact-value.medium { color: #f97316; } /* Orange */\n.impact-value.low { color: #16a34a; } /* Green */\n</style>\n<p>Compare o impacto ambiental aproximado (emissões de CO₂eq por porção):</p>\n<div class=\"impact-grid\">\n  <div class=\"impact-item\"><strong>Carne Bovina</strong><span class=\"impact-value high\">🥩 ALTO</span></div>\n  <div class=\"impact-item\"><strong>Frango</strong><span class=\"impact-value medium\">🍗 MÉDIO</span></div>\n  <div class=\"impact-item\"><strong>Lentilhas</strong><span class=\"impact-value low\">🌱 BAIXO</span></div>\n  <div class=\"impact-item\"><strong>Arroz</strong><span class=\"impact-value low\">🍚 BAIXO</span></div>\n</div>\n<br>Qual alimento listado tem o <strong>MAIOR</strong> impacto?",
        "opcoes": [
            {"id": 1, "texto": "Carne Bovina"},
            {"id": 2, "texto": "Frango"},
            {"id": 3, "texto": "Lentilhas"},
            {"id": 4, "texto": "Arroz"}
        ],
        "respostaCorreta": 1,
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_Grid"],
        "fontes": ["Dados de Pegada de Carbono"],
        "vantagem": "Correto! A pecuária bovina tem um impacto significativo.",
        "desvantagem": "Incorreto. Compare os níveis de impacto.",
        "dica": "Procure pela classificação 'ALTO'."
    },
    {
        "id": "html_flex_columns_1",
        "tipo": "Pergunta",
        "titulo": "Prós e Contras (Flexbox)",
        "pergunta": "<style>\n.pros-cons-container { display: flex; gap: 15px; margin-top: 10px; }\n.pros-cons-col { flex: 1; border: 1px solid; border-radius: 5px; padding: 10px; }\n.pros-col { border-color: #16a34a; background-color: #f0fdf4; }\n.cons-col { border-color: #dc2626; background-color: #fee2e2; }\n.pros-cons-col h5 { margin: 0 0 10px 0; text-align: center; }\n.pros-cons-col ul { list-style: none; padding-left: 0; font-size: 0.9em; margin: 0; }\n.pros-cons-col li { margin-bottom: 5px; padding-left: 1.2em; position: relative; }\n.pros-col li::before { content: '✓'; color: #16a34a; position: absolute; left: 0; font-weight: bold; }\n.cons-col li::before { content: '✗'; color: #dc2626; position: absolute; left: 0; font-weight: bold; }\n</style>\n<p>Analise os prós e contras da energia hidrelétrica:</p>\n<div class=\"pros-cons-container\">\n  <div class=\"pros-cons-col pros-col\">\n    <h5>Prós (+)</h5>\n    <ul><li>Energia Renovável</li><li>Baixa emissão de GEE</li><li>Custo operacional baixo</li></ul>\n  </div>\n  <div class=\"pros-cons-col cons-col\">\n    <h5>Contras (-)</h5>\n    <ul><li>Impacto social (deslocamentos)</li><li>Impacto ambiental (alagamentos)</li><li>Dependência de chuvas</li></ul>\n  </div>\n</div><br>Qual é um <strong>CONTRA</strong> significativo da energia hidrelétrica listado?",
        "opcoes": [
            {"id": 1, "texto": "Baixa emissão de GEE"},
            {"id": 2, "texto": "Impacto social"},
            {"id": 3, "texto": "Custo operacional baixo"}
        ],
        "respostaCorreta": 2,
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_Flexbox"],
        "fontes": ["Fontes de Energia"],
        "vantagem": "Correto! O impacto social é um grande desafio.",
        "desvantagem": "Incorreto. Esse item está listado como um 'Pró'.",
        "dica": "Procure na coluna com o 'X' vermelho."
    },
    {
        "id": "html_gradient_bg_1",
        "tipo": "Vantagem",
        "titulo": "Amanhecer Sustentável",
        "pergunta": "<div style='padding: 20px; border-radius: 8px; color: #333; text-align: center; background: linear-gradient(to bottom, #a7f3d0, #6ee7b7, #34d399);'>\n  <p style='font-size: 2.5em; margin-bottom: 10px;'>🌅</p>\n  <p style='font-weight: bold; font-size: 1.1em;'>Um novo dia começa com esperança e ações verdes!</p>\n  <p>Seu compromisso inspira! Ganhe <strong>+15 de Progresso</strong>.</p>\n</div>",
        "opcoes": [ { "id": 1, "texto": "Começar bem o dia!" } ],
        "respostaCorreta": [1],
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_Gradient"],
        "fontes": [],
        "vantagem": "Ganhou +15 Progresso!",
        "desvantagem": "",
        "dica": "Aproveite a energia positiva!"
    },
    {
        "id": "html_blockquote_1",
        "tipo": "Outras",
        "titulo": "Voz da Experiência",
        "pergunta": "<blockquote style='border-left: 4px solid #fbbf24; margin: 15px 0; padding: 10px 15px; background-color: #fffbeb; font-style: italic;'>\n  \"Não herdamos a terra de nossos ancestrais, nós a pegamos emprestada de nossos filhos.\"\n  <footer style='text-align: right; font-style: normal; font-size: 0.9em; margin-top: 8px;'>— Provérbio Nativo Americano</footer>\n</blockquote>\n<p>Esta citação enfatiza principalmente qual aspecto da sustentabilidade?</p>",
        "opcoes": [
            {"id": 1, "texto": "Lucro econômico a curto prazo"},
            {"id": 2, "texto": "Responsabilidade intergeracional"},
            {"id": 3, "texto": "Exploração máxima de recursos"}
        ],
        "respostaCorreta": 2,
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_Blockquote"],
        "fontes": ["Citações Famosas"],
        "vantagem": "Correto! Pensar nas futuras gerações é crucial.",
        "desvantagem": "Incorreto. A citação fala sobre o futuro.",
        "dica": "A quem pertence a terra no futuro, segundo o provérbio?"
    },

    // --- INTERATIVIDADE SIMULADA ---

    {
        "id": "html_tooltip_1",
        "tipo": "Pergunta",
        "titulo": "Glossário Rápido (Tooltip)",
        "pergunta": "<style>\n.tooltip { position: relative; display: inline-block; border-bottom: 1px dotted black; cursor: help; }\n.tooltip .tooltiptext { visibility: hidden; width: 160px; background-color: #555; color: #fff; text-align: center; border-radius: 6px; padding: 5px 8px; position: absolute; z-index: 1; bottom: 125%; /* Position above */ left: 50%; margin-left: -80px; opacity: 0; transition: opacity 0.3s; font-size: 0.85em; }\n.tooltip:hover .tooltiptext { visibility: visible; opacity: 1; }\n.tooltip .tooltiptext::after { content: \"\"; position: absolute; top: 100%; left: 50%; margin-left: -5px; border-width: 5px; border-style: solid; border-color: #555 transparent transparent transparent; }\n</style>\nO que significa <span class=\"tooltip\">ESG<span class=\"tooltiptext\">Environmental, Social, and Governance (Ambiental, Social e Governança) - Fatores usados para medir a sustentabilidade e o impacto ético de um investimento.</span></span> no mundo corporativo?",
        "opcoes": [
            {"id": 1, "texto": "Energia Solar Garantida"},
            {"id": 2, "texto": "Padrões de Sustentabilidade e Governança"},
            {"id": 3, "texto": "Estratégia de Superávit Global"}
        ],
        "respostaCorreta": 2,
        "dificuldade": "normal",
        "categorias": ["_test_cri_iva_Tooltip"],
        "fontes": ["Termos Corporativos"],
        "vantagem": "Correto! ESG é um critério cada vez mais importante.",
        "desvantagem": "Incorreto. Passe o mouse sobre ESG para ver a sigla.",
        "dica": "Passe o mouse sobre a sigla 'ESG' na pergunta."
    },
    {
        "id": "html_flipcard_1",
        "tipo": "Vantagem",
        "titulo": "Carta Surpresa (Flip)",
        "pergunta": "<style>\n.flip-card-container { perspective: 1000px; width: 180px; height: 100px; margin: 15px auto; }\n.flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }\n.flip-card-container:hover .flip-card-inner { transform: rotateY(180deg); }\n.flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; border: 1px solid #ccc; border-radius: 8px; display: flex; justify-content: center; align-items: center; text-align: center; padding: 10px; }\n.flip-card-front { background-color: #bbdefb; color: black; }\n.flip-card-back { background-color: #a5d6a7; color: #1b5e20; transform: rotateY(180deg); }\n</style>\n<p style='text-align:center;'>Passe o mouse sobre a carta para revelar sua sorte!</p>\n<div class=\"flip-card-container\">\n  <div class=\"flip-card-inner\">\n    <div class=\"flip-card-front\">\n      <p style='font-size: 1.5em;'>?</p>\n      <p style='font-size: 0.9em;'>Carta Misteriosa</p>\n    </div>\n    <div class=\"flip-card-back\">\n      <p>🍀 Sorte! Você encontrou um recurso raro! Ganhe <strong>+1 Estrela Bônus</strong>.</p>\n    </div>\n  </div>\n</div>",
        "opcoes": [ { "id": 1, "texto": "Revelar a Sorte!" } ],
        "respostaCorreta": [1],
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_FlipCard"],
        "fontes": [],
        "vantagem": "Ganhou +1 Estrela Bônus!", // Efeito real
        "desvantagem": "",
        "dica": "Passe o mouse (ou toque em mobile) na carta azul."
    },
    {
        "id": "html_secret_reveal_1",
        "tipo": "Outras",
        "titulo": "Pista Secreta",
        "pergunta": "<p>Você encontrou uma mensagem cifrada deixada por um antigo protetor da floresta.</p>\n<details style='margin: 10px auto; width: fit-content;'>\n  <summary style='cursor: pointer; border: 1px solid; padding: 5px 10px; border-radius: 4px; background: #fef3c7; color: #ca8a04;'>Revelar Mensagem</summary>\n  <p style='margin-top: 10px; padding: 10px; background: #fffbeb; border: 1px dashed #fde047;'>\n    <i>\"O verdadeiro tesouro não é ouro, mas a <strong>água limpa</strong> que flui livremente.\"</i>\n    <br><br><strong>Efeito:</strong> Se estiver em uma casa de RIO ou NASCENTE, ganhe +10 Progresso.\n  </p>\n</details>",
        "opcoes": [ { "id": 1, "texto": "Entendido." } ],
        "respostaCorreta": [1],
        "dificuldade": "normal",
        "categorias": ["_test_cri_iva_SecretReveal"],
        "fontes": [],
        "vantagem": "Mensagem revelada! Verifique sua posição no tabuleiro.", // Efeito condicional aplicado no jogo
        "desvantagem": "",
        "dica": "Clique para ler a mensagem."
    },
    {
        "id": "html_checklist_1",
        "tipo": "Pergunta",
        "titulo": "Checklist de Ações",
        "pergunta": "<style>\n.checklist { list-style: none; padding-left: 0; margin: 10px 0; }\n.checklist li { margin-bottom: 8px; position: relative; padding-left: 25px; }\n.checklist li::before { content: ''; display: inline-block; width: 16px; height: 16px; border: 2px solid #6ee7b7; border-radius: 3px; position: absolute; left: 0; top: 2px; background-color: white; }\n/* Marcar um item (exemplo) */\n.checklist li.checked::after { content: '✔'; color: #047857; position: absolute; left: 3px; top: 1px; font-size: 14px; font-weight: bold; }\n</style>\n<p>Qual ação deste checklist <strong>NÃO</strong> contribui diretamente para reduzir sua pegada de carbono?</p>\n<ul class=\"checklist\">\n  <li class=\"checked\">Reduzir consumo de carne</li>\n  <li class=\"checked\">Usar transporte público/bicicleta</li>\n  <li>Comprar produtos locais</li>\n  <li class=\"checked\">Economizar energia em casa</li>\n</ul>",
        "opcoes": [
            {"id": 1, "texto": "Reduzir consumo de carne"},
            {"id": 2, "texto": "Usar transporte público/bicicleta"},
            {"id": 3, "texto": "Comprar produtos locais"}, // Embora bom, o impacto direto no *carbono* é menor que os outros
            {"id": 4, "texto": "Economizar energia"}
        ],
        "respostaCorreta": 3,
        "dificuldade": "normal",
        "categorias": ["_test_cri_iva_Checklist"],
        "fontes": ["Pegada de Carbono"],
        "vantagem": "Correto! Embora comprar local seja bom, os outros têm impacto mais direto nas emissões de carbono.",
        "desvantagem": "Incorreto. Esta ação tem um impacto significativo na pegada de carbono.",
        "dica": "Pense em emissões de transporte e produção de energia/alimentos."
    },

    // --- APRESENTAÇÃO VISUAL TEMÁTICA ---
    {
        "id": "html_torn_paper_1",
        "tipo": "Desvantagem",
        "titulo": "Notificação Urgente",
        "pergunta": "<style>\n.torn-paper {\n  background-color: #fdf6e3; /* Cor de papel velho */\n  padding: 25px;\n  margin: 15px auto;\n  max-width: 300px;\n  border: 1px solid #ddd;\n  box-shadow: 2px 2px 5px rgba(0,0,0,0.1);\n  position: relative;\n  /* Efeito \"rasgado\" (simplificado com pseudo-elementos) */\n}\n.torn-paper::before, .torn-paper::after {\n  content: ''; position: absolute; width: 100%; height: 10px; background-size: 20px 10px;\n}\n.torn-paper::before { top: -1px; background-image: linear-gradient(45deg, transparent 75%, #fdf6e3 75%), linear-gradient(-45deg, transparent 75%, #fdf6e3 75%); background-position: 0 0, 10px 0; }\n.torn-paper::after { bottom: -1px; transform: rotate(180deg); background-image: linear-gradient(45deg, transparent 75%, #fdf6e3 75%), linear-gradient(-45deg, transparent 75%, #fdf6e3 75%); background-position: 10px 0, 0 0; }\n</style>\n<div class=\"torn-paper\">\n  <h5 style='text-align:center; color: #b91c1c; margin:0 0 10px 0;'>AVISO DE MULTA</h5>\n  <p style='font-size:0.9em; text-align:center;'>Descarte inadequado de resíduos detectado! Pague a multa ou perca a próxima rodada.</p>\n  <p style='text-align:center; font-weight:bold; margin-top:15px;'>Opção: Perca 1 Estrela Bônus</p>\n</div>",
        "opcoes": [ { "id": 1, "texto": "Pagar a Multa (-1 Estrela)" } ], // Ou lógica para perder rodada
        "respostaCorreta": [1],
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_PapelRasgado"],
        "fontes": [],
        "vantagem": "Multa paga (se tinha estrela).",
        "desvantagem": "Não tinha estrela para pagar (perde rodada - efeito no jogo).",
        "dica": "O descarte correto é importante."
    },
    {
        "id": "html_calendar_1",
        "tipo": "Vantagem",
        "titulo": "Dia da Terra!",
        "pergunta": "<style>\n.calendar-day { width: 150px; border: 1px solid #ccc; margin: 15px auto; border-radius: 5px; overflow: hidden; box-shadow: 1px 1px 3px rgba(0,0,0,0.1); }\n.calendar-header { background-color: #16a34a; color: white; text-align: center; padding: 5px; font-weight: bold; }\n.calendar-date { font-size: 3em; text-align: center; padding: 15px 10px; background: white; font-weight: bold; }\n.calendar-event { font-size: 0.9em; text-align: center; padding: 8px; background: #d1fae5; color: #065f46; }\n</style>\n<div class=\"calendar-day\">\n  <div class=\"calendar-header\">Abril</div>\n  <div class=\"calendar-date\">22</div>\n  <div class=\"calendar-event\">🌍 Dia da Terra!</div>\n</div>\n<p style='text-align:center; margin-top: 10px;'>Em comemoração, todos os jogadores ganham +5 de Progresso!</p>",
        "opcoes": [ { "id": 1, "texto": "Celebrar!" } ],
        "respostaCorreta": [1],
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_Calendario"],
        "fontes": ["Datas Comemorativas"],
        "vantagem": "Todos ganharam +5 Progresso!", // Efeito em todos
        "desvantagem": "",
        "dica": "Uma data importante para o planeta."
    },
    {
        "id": "html_comic_strip_1",
        "tipo": "Outras",
        "titulo": "A Gota Viajante",
        "pergunta": "<style>\n.comic-panel { border: 2px solid #3b82f6; background: white; padding: 8px; margin: 5px auto; max-width: 300px; border-radius: 4px; }\n.comic-panel img { display: block; width: 80%; margin: 5px auto; height: auto; border: 1px solid #eee; }\n.comic-caption { font-size: 0.85em; text-align: center; margin-top: 5px; font-style: italic; color: #1e3a8a; }\n</style>\n<div style='border: 1px solid #ccc; padding: 10px; background: #eff6ff;'>\n <p style='text-align:center; font-weight:bold; margin-bottom: 10px;'>A Jornada da Gotinha:</p>\n <div class='comic-panel'>\n   <img src='/images/gota_no_rio.png' alt='Gota no rio'>\n   <p class='comic-caption'>1. No rio, tranquila...</p>\n </div>\n <div class='comic-panel'>\n   <img src='/images/gota_evaporando.png' alt='Gota evaporando'>\n   <p class='comic-caption'>2. O sol esquenta, hora de subir!</p>\n </div>\n <div class='comic-panel'>\n   <img src='/images/gota_na_nuvem.png' alt='Gota na nuvem'>\n   <p class='comic-caption'>3. Encontro amigas na nuvem...</p>\n </div>\n <div class='comic-panel'>\n   <img src='/images/gota_caindo.png' alt='Gota caindo'>\n   <p class='comic-caption'>4. Pesa demais! Hora de voltar!</p>\n </div>\n</div><br>Qual etapa crucial do ciclo falta entre a 3 e a 4?",
        "opcoes": [ {"id": 1, "texto": "Congelamento"}, {"id": 2, "texto": "Condensação (formação da gota maior)"}, {"id": 3, "texto": "Infiltração no solo"} ],
        "respostaCorreta": 2,
        "dificuldade": "normal",
        "categorias": ["_test_cri_iva_ComicStrip"],
        "fontes": ["Ciclo da Água"],
        "vantagem": "Correto! A condensação forma as gotas de chuva.",
        "desvantagem": "Essa etapa ocorre em outro momento do ciclo.",
        "dica": "O que acontece com o vapor na nuvem antes de chover?"
    },
     {
        "id": "html_qrcode_1",
        "tipo": "Outras",
        "titulo": "Dica Extra (QR Code)",
        "pergunta": "<p style='text-align:center;'>Escaneie o QR Code com seu celular (se possível) para uma dica valiosa sobre pegada hídrica!</p>\n<img src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.watercalculator.org/' alt='QR Code para Water Calculator' style='display: block; margin: 15px auto; border: 5px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.2);'>\n<p style='text-align:center; font-size: 0.8em;'>(Aponta para watercalculator.org)</p>\n<br><p style='text-align:center;'>Use a dica para responder: Qual item geralmente tem a <strong>maior</strong> pegada hídrica?</p>",
        "opcoes": [ {"id": 1, "texto": "1kg de Arroz"}, {"id": 2, "texto": "1kg de Carne Bovina"}, {"id": 3, "texto": "1 Camiseta de Algodão"} ],
        "respostaCorreta": 2,
        "dificuldade": "normal",
        "categorias": ["_test_cri_iva_QRCode"],
        "fontes": ["Water Footprint Network"],
        "vantagem": "Correto! A produção de carne bovina consome muita água.",
        "desvantagem": "Incorreto. A dica no QR Code ajudaria!",
        "dica": "A produção de carne envolve água para o animal e para cultivar seu alimento."
    },
    {
        "id": "html_spot_diff_1",
        "tipo": "Pergunta",
        "titulo": "Jogo dos 7 Erros (1 Erro)",
        "pergunta": "<style>\n.diff-container { display: flex; justify-content: space-around; gap: 10px; margin: 15px 0; padding: 5px; background: #f3f4f6; border-radius: 5px; }\n.diff-img { width: 48%; border: 1px solid #d1d5db; }\n</style>\n<p>Encontre a <strong>única</strong> diferença significativa entre as duas imagens de reciclagem:</p>\n<div class=\"diff-container\">\n <img src=\"/images/reciclagem_a.png\" alt=\"Cena A\" class=\"diff-img\">\n <img src=\"/images/reciclagem_b_com_erro.png\" alt=\"Cena B com erro\" class=\"diff-img\">\n</div>",
        "opcoes": [
            {"id": 1, "texto": "A cor da lixeira de metal"},
            {"id": 2, "texto": "Uma garrafa plástica no lixo de papel"}, // A diferença
            {"id": 3, "texto": "O tipo de árvore ao fundo"},
            {"id": 4, "texto": "A presença de uma pessoa"}
        ],
        "respostaCorreta": 2,
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_SpotDifference"],
        "fontes": [],
        "vantagem": "Exato! Separar corretamente é essencial.",
        "desvantagem": "Olhe com mais atenção para os detalhes das lixeiras.",
        "dica": "Verifique o conteúdo de cada lixeira."
    },
     {
        "id": "html_wordsearch_1",
        "tipo": "Pergunta",
        "titulo": "Caça-Palavras Verde",
        "pergunta": "<style>\n.wordsearch-grid { font-family: monospace; line-height: 1.2; font-size: 1.1em; border-collapse: collapse; margin: 15px auto; user-select: none; }\n.wordsearch-grid td { border: 1px solid #eee; padding: 2px 4px; text-align: center; width: 20px; height: 20px; }\n.wordsearch-grid .found { background-color: #a7f3d0; font-weight: bold; } /* Exemplo de marcação */\n</style>\n<p>Encontre a palavra <strong>\"SOLAR\"</strong> (horizontal, vertical ou diagonal) no caça-palavras abaixo. Em qual linha ela <strong>começa</strong>?</p>\n<table class=\"wordsearch-grid\">\n  <tr><td>R</td><td>E</td><td>N</td><td>O</td><td>V</td><td>A</td><td>R</td></tr>\n  <tr><td>S</td><td>O</td><td>L</td><td>A</td><td>R</td><td>G</td><td>U</td></tr>\n  <tr><td>U</td><td>L</td><td>I</td><td>X</td><td>O</td><td>U</td><td>A</td></tr>\n  <tr><td>S</td><td>A</td><td>R</td><td>V</td><td>O</td><td>A</td><td>T</td></tr>\n  <tr><td>T</td><td>M</td><td>E</td><td>T</td><td>A</td><td>L</td><td>E</td></tr>\n  <tr><td>A</td><td>A</td><td>Z</td><td>U</td><td>L</td><td>M</td><td>R</td></tr>\n</table>",
        "opcoes": [ {"id": 1, "texto": "Linha 1"}, {"id": 2, "texto": "Linha 2"}, {"id": 3, "texto": "Linha 4"}, {"id": 4, "texto": "Linha 6"} ],
        "respostaCorreta": 2,
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_WordSearch"],
        "fontes": [],
        "vantagem": "Correto! Achou a energia limpa.",
        "desvantagem": "Procure novamente, a palavra está lá!",
        "dica": "Está na horizontal."
    },
    {
        "id": "html_crossword_1",
        "tipo": "Pergunta",
        "titulo": "Cruzadinha Ecológica",
        "pergunta": "Qual palavra de 6 letras completa a cruzadinha?<br><br><i>1. Vertical:</i> Processo de transformar lixo orgânico em adubo.<br><br>\n<code style='font-family: monospace; font-size: 1.4em; display: block; margin: 10px auto; width: fit-content;'>\n  _ _ <span style='border-bottom: 2px solid black;'>C</span> _ _ _ <br>\n     O<br>\n     M<br>\n     P<br>\n     O<br>\n     S<br>\n     T<br>\n     A<br>\n     G<br>\n     E<br>\n     M<br>\n</code>",
        "opcoes": [ {"id": 1, "texto": "RECICLAGEM"}, {"id": 2, "texto": "POLUIÇÃO"}, {"id": 3, "texto": "COMPOSTAGEM"} ],
        "respostaCorreta": 3,
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_Crossword"],
        "fontes": [],
        "vantagem": "Correto!",
        "desvantagem": "Essa palavra não se encaixa.",
        "dica": "Começa com C e termina com M."
    },
    {
        "id": "html_repair_diagram_1",
        "tipo": "CompletarFrase", // Usando este tipo para a interação
        "titulo": "Repare o Ciclo",
        "pergunta": "O diagrama mostra o ciclo do Nitrogênio simplificado. Qual processo, realizado por bactérias no solo, converte nitrito em nitrato, forma utilizável pelas plantas?<br><br>\n<div style='text-align:center;'>\n  N₂ (Atmosfera) → Fixação → Amônia (NH₃) → Nitrificação (1ª parte) → Nitrito (NO₂) → <strong>__1__</strong> → Nitrato (NO₃) → Plantas\n</div>",
        "fraseIncompleta": "O processo é a __1__.", // A frase a ser completada é implícita
        "fragmentos": [
            { "id": 1, "texto": "Desnitrificação" },
            { "id": 2, "texto": "Nitrificação (2ª parte)" },
            { "id": 3, "texto": "Amonificação" }
        ],
        "respostaCorreta": [2], // Nitrificação (2ª parte)
        "opcoes": [], // Não usado diretamente
        "dificuldade": "dificil",
        "categorias": ["_test_cri_iva_RepairDiagram"],
        "fontes": ["Ciclo do Nitrogênio"],
        "vantagem": "Correto! É a segunda etapa da nitrificação.",
        "desvantagem": "Incorreto. Esse processo ocorre em outra parte do ciclo.",
        "dica": "É a continuação da Nitrificação."
    },
    {
        "id": "html_soundwave_1",
        "tipo": "Pergunta",
        "titulo": "Poluição Sonora",
        "pergunta": "A 'onda sonora' abaixo representa o nível de ruído. Qual situação ela provavelmente descreve?<br><br>\n<style>\n@keyframes wavePulse { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.4); } }\n.sound-wave { display: flex; align-items: flex-end; justify-content: center; height: 60px; margin: 15px auto; width: 150px; }\n.sound-wave div { width: 8px; height: 100%; margin: 0 2px; background-color: #f87171; /* Vermelho indica alto ruído */ border-radius: 4px; animation: wavePulse 0.8s infinite ease-in-out; }\n.sound-wave div:nth-child(2) { animation-delay: 0.1s; height: 80%; }\n.sound-wave div:nth-child(3) { animation-delay: 0.2s; height: 90%; }\n.sound-wave div:nth-child(4) { animation-delay: 0.3s; height: 70%; }\n.sound-wave div:nth-child(5) { animation-delay: 0.4s; height: 85%; }\n</style>\n<div class=\"sound-wave\">\n  <div></div><div></div><div></div><div></div><div></div>\n</div>",
        "opcoes": [
            {"id": 1, "texto": "Biblioteca silenciosa"},
            {"id": 2, "texto": "Parque tranquilo"},
            {"id": 3, "texto": "Rua com tráfego intenso e buzinas"}
        ],
        "respostaCorreta": 3,
        "dificuldade": "facil",
        "categorias": ["_test_cri_iva_SoundWave"],
        "fontes": [],
        "vantagem": "Correto! A intensidade visual representa barulho alto.",
        "desvantagem": "Incorreto. Uma situação calma teria 'ondas' menores.",
        "dica": "A cor vermelha e a animação indicam intensidade."
    }

];

export default manejo;
