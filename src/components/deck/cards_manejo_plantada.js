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
  }
];

export default manejo;
