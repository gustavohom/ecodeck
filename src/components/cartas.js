// components/cartas.js

const cartas = [
  // Pergunta Fácil com Verdadeiro ou Falso
  {
    tipo: "Pergunta",
    titulo: "Impacto das Energias Renováveis",
    pergunta: "A energia solar é uma fonte inesgotável de energia e não emite gases poluentes durante seu uso.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Energias Renováveis", "Sustentabilidade"],
    fontes: [
      "1. Silva, A. (2023). Fontes de Energia e o Futuro.",
      "2. Rocha, B. (2022). Energia Sustentável para Todos."
    ],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "A energia solar é limpa e renovável."
  },

  // Pergunta Fácil com 4 Alternativas e uma Resposta Correta
  {
    tipo: "Pergunta",
    titulo: "Reciclagem de Materiais",
    pergunta: "Qual desses materiais é considerado o mais reciclável?",
    opcoes: [
      { id: 1, texto: "Plástico" },
      { id: 2, texto: "Vidro" },
      { id: 3, texto: "Papelão" },
      { id: 4, texto: "Isopor" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Reciclagem", "Sustentabilidade"],
    fontes: [
      "1. Costa, M. (2023). O Guia Completo da Reciclagem.",
      "2. Almeida, P. (2022). Reciclagem e Meio Ambiente."
    ],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Pense em algo que pode ser reciclado infinitamente."
  },

  // Pergunta Fácil com 5 Alternativas e Duas Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Plantas Medicinais",
    pergunta: "Quais dessas plantas são conhecidas por suas propriedades medicinais?",
    opcoes: [
      { id: 1, texto: "Camomila" },
      { id: 2, texto: "Margarida" },
      { id: 3, texto: "Alecrim" },
      { id: 4, texto: "Dente-de-leão" },
      { id: 5, texto: "Flor de Lis" }
    ],
    respostaCorreta: [1, 3],
    dificuldade: "facil",
    categorias: ["Plantas Medicinais", "Saúde"],
    fontes: [
      "1. Fernandes, T. (2023). O Poder das Plantas Medicinais.",
      "2. Ribeiro, L. (2022). Ervas que Curam."
    ],
    vantagem: "Escolha uma planta para ganhar 2 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Camomila e alecrim são populares na medicina herbal."
  },

  // Pergunta Normal com 4 Alternativas e uma Resposta Correta com Imagem
  {
    tipo: "Pergunta",
    titulo: "Efeito Estufa",
    pergunta: `O que mais contribui para o efeito estufa?
    <img src="/5.jpg" alt="Efeito Estufa" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Energia Eólica" },
      { id: 2, texto: "Combustíveis Fósseis" },
      { id: 3, texto: "Energia Solar" },
      { id: 4, texto: "Plantas Marinhas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Meio Ambiente", "Clima"],
    fontes: [
      "1. Oliveira, R. (2023). Mudanças Climáticas e Efeito Estufa.",
      "2. Silva, A. (2022). Aquecimento Global e o Futuro do Planeta."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Os combustíveis fósseis são uma grande fonte de gases do efeito estufa."
  },

  // Pergunta Difícil com 5 Alternativas, uma Resposta Correta e Imagem
  {
    tipo: "Pergunta",
    titulo: "Florestas Tropicais",
    pergunta: `Qual é o principal fator que ameaça as florestas tropicais?
    <img src="/7.jpg" alt="Florestas Tropicais" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Desmatamento para Agricultura" },
      { id: 2, texto: "Conservação Ambiental" },
      { id: 3, texto: "Turismo Sustentável" },
      { id: 4, texto: "Programas de Reflorestamento" },
      { id: 5, texto: "Mudança para Energias Renováveis" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Florestas", "Conservação"],
    fontes: [
      "1. Souza, E. (2023). Protegendo Nossas Florestas Tropicais.",
      "2. Costa, M. (2022). A Batalha Contra o Desmatamento."
    ],
    vantagem: "Ganhe 4 pontos e avance 2 casas!",
    desvantagem: "Perde 3 pontos e volte 1 casa.",
    dica: "A agricultura é uma das maiores ameaças às florestas."
  },

  // Cartas do Tipo Outras

  // Carta para Escolher uma entre 3 Vantagens (todas respostas corretas)
  {
    tipo: "Vantagem",
    titulo: "Escolha sua Recompensa",
    pergunta: "Escolha uma vantagem entre as opções abaixo:",
    opcoes: [
      { id: 1, texto: "Jogue novamente" },
      { id: 2, texto: "Avance 3 casas" },
      { id: 3, texto: "Receba um bônus de 10 MM" }
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Todas as opções são vantajosas!",
    desvantagem: "",
    dica: ""
  },

  // Carta para Escolher uma entre 3 Desvantagens (todas respostas erradas)
  {
    tipo: "Desvantagem",
    titulo: "Escolha sua Penalidade",
    pergunta: "Escolha uma desvantagem entre as opções abaixo:",
    opcoes: [
      { id: 1, texto: "Perde 5 pontos" },
      { id: 2, texto: "Volte 3 casas" },
      { id: 3, texto: "Perca um turno" }
    ],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Todas as opções são desvantajosas!",
    dica: ""
  },

  // Carta contendo apenas uma Alternativa (Vantagem)
  {
    tipo: "Vantagem",
    titulo: "Recompensa Especial",
    pergunta: "Você ganhou um bônus especial!",
    opcoes: [
      { id: 1, texto: "Entendi" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Receba um bônus de 20 MM!",
    desvantagem: "",
    dica: ""
  },

  // Carta contendo apenas uma Alternativa (Desvantagem)
  {
    tipo: "Desvantagem",
    titulo: "Penalidade Especial",
    pergunta: "Você perdeu uma rodada!",
    opcoes: [
      { id: 1, texto: "Estou triste mas entendi" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perca uma rodada e 5 pontos.",
    dica: ""
  },

  // Carta para Resetar Contadores
  {
    tipo: "Outras",
    titulo: "Reset seus contadores",
    pergunta: "Aperte o botão de zerar seus contadores. Entretanto mantenha todos os contadores de progresso que você possuí (acrescente-os manualmente)",
    opcoes: [
      { id: 1, texto: "Entendi" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Outras"],
    fontes: [],
    vantagem: "Resetado",
    desvantagem: "",
    dica: ""
  },

  // Nova Carta de Ordem
  {
    tipo: "Ordem",
    titulo: "Ordem das Etapas",
    pergunta: "Coloque as etapas na ordem correta para fazer um café:",
    opcoes: [
      { id: 1, texto: "Colocar açúcar na água" },
      { id: 2, texto: "Colocar água na panela" },
      { id: 3, texto: "Passar o café no coador" },
      { id: 4, texto: "Colocar pó de café no coador" }
    ],
    respostaCorreta: [2, 1, 4, 3],
    dificuldade: "normal",
    categorias: ["Rotinas Diárias"],
    fontes: [],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Pense na sequência lógica das etapas."
  },
  {
    tipo: "Pergunta",
    titulo: "Tratamentos Pré-Germinativos",
    pergunta: "Tratamentos pré-germinativos são usados para sementes florestais nativas que apresentam dormência ou germinação desuniforme.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Germinação", "Sementes Florestais"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "Pense em como melhorar a germinação de sementes difíceis."
  },

  // Pergunta 2: Formações Vegetais
  {
    tipo: "Pergunta",
    titulo: "Formações Vegetais em São Paulo",
    pergunta: "Quais das seguintes formações vegetais são comuns no estado de São Paulo?",
    opcoes: [
      { id: 1, texto: "Floresta Ombrófila Densa" },
      { id: 2, texto: "Floresta Estacional Semidecidual" },
      { id: 3, texto: "Cerrado" },
      { id: 4, texto: "Todas as opções acima" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Lembre-se das principais formações vegetais do estado."
  },

  // Pergunta 3: Quebra de Dormência
  {
    tipo: "Pergunta",
    titulo: "Métodos de Quebra de Dormência",
    pergunta: "Qual dos seguintes métodos NÃO é usado para a quebra de dormência de sementes?",
    opcoes: [
      { id: 1, texto: "Escarificação mecânica" },
      { id: 2, texto: "Imersão em água quente" },
      { id: 3, texto: "Plantio direto sem tratamento" },
      { id: 4, texto: "Estratificação a frio" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Germinação", "Sementes Florestais"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Pense em como acelerar a germinação de sementes."
  },

  // Pergunta 4: Estratégias de Germinação
  {
    tipo: "MultiplaEscolha",
    titulo: "Estratégias de Sobrevivência",
    pergunta: "Quais dessas estratégias são usadas por plantas com dormência para garantir sua sobrevivência?",
    opcoes: [
      { id: 1, texto: "Germinação esparsa" },
      { id: 2, texto: "Dormência do embrião" },
      { id: 3, texto: "Resistência ao fogo" },
      { id: 4, texto: "Todas as opções acima" }
    ],
    respostaCorreta: [1, 2, 4],
    dificuldade: "normal",
    categorias: ["Germinação", "Sobrevivência"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Plantas utilizam várias estratégias para garantir a sobrevivência."
  },

  // Pergunta 5: Dormência Fisiológica
  {
    tipo: "Pergunta",
    titulo: "Causa da Dormência Fisiológica",
    pergunta: "A dormência fisiológica é causada por:",
    opcoes: [
      { id: 1, texto: "Resistência do tegumento" },
      { id: 2, texto: "Imaturidade do embrião" },
      { id: 3, texto: "Falta de substâncias essenciais" },
      { id: 4, texto: "Condições climáticas desfavoráveis" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Germinação", "Dormência"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Pense em processos internos da semente."
  },

  // Pergunta 6: Técnica de Escarificação
  {
    tipo: "Pergunta",
    titulo: "Método de Escarificação",
    pergunta: "O método de escarificação química usa qual dos seguintes produtos para promover a corrosão do tegumento?",
    opcoes: [
      { id: 1, texto: "Ácido Sulfúrico" },
      { id: 2, texto: "Água Oxigenada" },
      { id: 3, texto: "Ácido Muriático" },
      { id: 4, texto: "Todos os acima" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Germinação", "Tratamento de Sementes"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "Vários produtos podem ser usados para escarificação."
  },

  // Pergunta 7: Imersão em Água Quente
  {
    tipo: "Pergunta",
    titulo: "Choque Térmico",
    pergunta: "No método de imersão em água quente, o que deve ser feito após submeter as sementes à água quente?",
    opcoes: [
      { id: 1, texto: "Colocá-las em água fria" },
      { id: 2, texto: "Deixá-las secar ao sol" },
      { id: 3, texto: "Plantar imediatamente" },
      { id: 4, texto: "Nada, apenas esperar" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Germinação", "Tratamento de Sementes"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "O choque térmico envolve variação de temperatura."
  },

  // Pergunta 8: Estratificação a Frio
  {
    tipo: "Pergunta",
    titulo: "Estratificação a Frio",
    pergunta: "Por quanto tempo as sementes podem ser mantidas em estratificação a frio?",
    opcoes: [
      { id: 1, texto: "5 dias" },
      { id: 2, texto: "15 dias" },
      { id: 3, texto: "6 meses" },
      { id: 4, texto: "1 ano" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Germinação", "Tratamento de Sementes"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Pense em um período médio de armazenamento."
  },

  // Pergunta 9: Vegetação Ribeirinha
  {
    tipo: "Pergunta",
    titulo: "Importância das Florestas Ribeirinhas",
    pergunta: "As florestas ribeirinhas desempenham qual das seguintes funções?",
    opcoes: [
      { id: 1, texto: "Conectam formações florestais isoladas" },
      { id: 2, texto: "Regulam a temperatura local" },
      { id: 3, texto: "Controlam a erosão do solo" },
      { id: 4, texto: "Todas as opções acima" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Florestas", "Meio Ambiente"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Florestas ribeirinhas têm múltiplas funções ecológicas."
  },

  // Pergunta 10: Floresta Estacional Decidual
  {
    tipo: "Pergunta",
    titulo: "Características da Floresta Decidual",
    pergunta: "Qual característica define uma floresta estacional decidual?",
    opcoes: [
      { id: 1, texto: "Presença de árvores sempre verdes" },
      { id: 2, texto: "Perda total das folhas na estação seca" },
      { id: 3, texto: "Abundância de plantas herbáceas" },
      { id: 4, texto: "Proliferação de epífitas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Florestas", "Botânica"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "A queda das folhas é uma resposta à seca."
  },

  // Pergunta 11: Dormência Combinada
  {
    tipo: "Pergunta",
    titulo: "Quebra de Dormência Combinada",
    pergunta: "Em espécies com dormência combinada, o tratamento deve começar com:",
    opcoes: [
      { id: 1, texto: "Quebra do tegumento" },
      { id: 2, texto: "Estratificação a frio" },
      { id: 3, texto: "Choque térmico" },
      { id: 4, texto: "Imersão em água corrente" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Germinação", "Dormência"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "O tegumento resistente precisa ser rompido primeiro."
  },

  // Pergunta 12: Espécies Clímax
  {
    tipo: "Pergunta",
    titulo: "Germinação das Espécies Clímax",
    pergunta: "Espécies clímax geralmente germinam:",
    opcoes: [
      { id: 1, texto: "Logo após o amadurecimento do fruto" },
      { id: 2, texto: "Apenas após a estratificação" },
      { id: 3, texto: "Após a passagem pelo trato digestivo" },
      { id: 4, texto: "Somente em clareiras" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Botânica", "Germinação"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Essas espécies não necessitam de dormência prolongada."
  },

  // Pergunta 13: Savanas do Cerrado
  {
    tipo: "Pergunta",
    titulo: "Vegetação do Cerrado",
    pergunta: "A formação mais aberta do Cerrado é conhecida como:",
    opcoes: [
      { id: 1, texto: "Cerradão" },
      { id: 2, texto: "Campo Limpo" },
      { id: 3, texto: "Campo Cerrado" },
      { id: 4, texto: "Mata Ciliar" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Formações Vegetais", "Cerrado"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "Pense na formação mais aberta e rasa do Cerrado."
  },

  // Pergunta 14: Espécies Invasoras
  {
    tipo: "MultiplaEscolha",
    titulo: "Impacto das Espécies Exóticas",
    pergunta: "Quais desses problemas podem ser causados por espécies exóticas invasoras?",
    opcoes: [
      { id: 1, texto: "Deslocamento de espécies nativas" },
      { id: 2, texto: "Redução da biodiversidade" },
      { id: 3, texto: "Alteração dos processos ecológicos" },
      { id: 4, texto: "Todos os acima" }
    ],
    respostaCorreta: [1, 2, 3, 4],
    dificuldade: "dificil",
    categorias: ["Ecologia", "Conservação"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Espécies invasoras têm múltiplos impactos negativos."
  },

  // Pergunta 15: Formação do Cerradão
  {
    tipo: "Pergunta",
    titulo: "Cerradão",
    pergunta: "O cerradão é uma formação do Cerrado que se caracteriza por:",
    opcoes: [
      { id: 1, texto: "Predomínio de árvores baixas e espaçadas" },
      { id: 2, texto: "Estrutura florestal densa com árvores entre 8 e 15 metros" },
      { id: 3, texto: "Árvores de folha larga com alta umidade" },
      { id: 4, texto: "Plantas herbáceas predominantes" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Cerrado", "Formações Vegetais"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "O cerradão é a formação mais florestal do Cerrado."
  },

  // Pergunta 16: Manguezais
  {
    tipo: "Pergunta",
    titulo: "Função dos Manguezais",
    pergunta: "Os manguezais são fundamentais para:",
    opcoes: [
      { id: 1, texto: "A formação de dunas" },
      { id: 2, texto: "A regulação das marés" },
      { id: 3, texto: "A manutenção de cadeias alimentares marinhas" },
      { id: 4, texto: "A criação de florestas estacionais" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Ecologia", "Conservação"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "Manguezais são cruciais para a vida marinha."
  },

  // Pergunta 17: Floresta Ombrófila Densa
  {
    tipo: "Pergunta",
    titulo: "Características da Floresta Ombrófila Densa",
    pergunta: "Qual das seguintes características NÃO se aplica à Floresta Ombrófila Densa?",
    opcoes: [
      { id: 1, texto: "Alta umidade relativa do ar" },
      { id: 2, texto: "Topografia acidentada" },
      { id: 3, texto: "Perda acentuada de folhas no inverno" },
      { id: 4, texto: "Flora rica em epífitas" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Essa floresta se mantém verde o ano todo."
  },

  // Pergunta 18: Florestas Ombrófilas Mistas
  {
    tipo: "Pergunta",
    titulo: "Floresta de Araucária",
    pergunta: "A Floresta Ombrófila Mista é também conhecida como:",
    opcoes: [
      { id: 1, texto: "Floresta Tropical" },
      { id: 2, texto: "Pinhal" },
      { id: 3, texto: "Cerrado" },
      { id: 4, texto: "Campo Limpo" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "Pense na espécie Araucaria angustifolia."
  },

  // Pergunta 19: Ecótonos
  {
    tipo: "Pergunta",
    titulo: "Áreas de Transição",
    pergunta: "Ecótonos são áreas que:",
    opcoes: [
      { id: 1, texto: "Apresentam vegetação homogênea" },
      { id: 2, texto: "Estão em transição entre dois tipos de vegetação" },
      { id: 3, texto: "São dominadas por uma única espécie" },
      { id: 4, texto: "São inabitáveis devido a condições extremas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia", "Conservação"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
        desvantagem: "Perde 2 pontos.",
    dica: "Pense em áreas onde duas vegetações diferentes se encontram."
  },

  // Pergunta 20: Regiões Úmidas e Áridas
  {
    tipo: "Pergunta",
    titulo: "Adaptação Vegetal",
    pergunta: "Em regiões áridas, as plantas frequentemente desenvolvem dormência para:",
    opcoes: [
      { id: 1, texto: "Economizar água" },
      { id: 2, texto: "Evitar predadores" },
      { id: 3, texto: "Aumentar a fotossíntese" },
      { id: 4, texto: "Acelerar o crescimento" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia", "Botânica"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "A dormência é uma estratégia para sobreviver em ambientes difíceis."
  },

  // Pergunta 21: Importância das Espécies Regionais
  {
    tipo: "Pergunta",
    titulo: "Espécies Nativas Regionais",
    pergunta: "O uso de espécies nativas regionais em reflorestamentos aumenta a probabilidade de sucesso porque:",
    opcoes: [
      { id: 1, texto: "São adaptadas ao clima local" },
      { id: 2, texto: "Interagem bem com a fauna local" },
      { id: 3, texto: "Têm maior resistência a doenças locais" },
      { id: 4, texto: "Todas as opções acima" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Ecologia", "Restauração Florestal"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Espécies locais estão bem adaptadas ao seu ambiente."
  },

  // Pergunta 22: Sementes de Embaúba
  {
    tipo: "Pergunta",
    titulo: "Germinação da Embaúba",
    pergunta: "A germinação das sementes de embaúba é induzida por:",
    opcoes: [
      { id: 1, texto: "Maior incidência de luz" },
      { id: 2, texto: "Baixa temperatura" },
      { id: 3, texto: "Alta umidade do solo" },
      { id: 4, texto: "Passagem pelo trato digestivo de animais" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Germinação", "Botânica"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Pense nas condições que favorecem plantas pioneiras."
  },

  // Pergunta 23: Florestas e Sazonalidade
  {
    tipo: "Pergunta",
    titulo: "Florestas Estacionais",
    pergunta: "As florestas estacionais são definidas por qual característica climática?",
    opcoes: [
      { id: 1, texto: "Chove o ano todo" },
      { id: 2, texto: "Alta sazonalidade com períodos de seca e chuva" },
      { id: 3, texto: "Temperatura constante" },
      { id: 4, texto: "Baixa umidade do ar" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Formações Vegetais", "Clima"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "Estas florestas estão adaptadas a climas com estações distintas."
  },

  // Pergunta 24: Regeneração Natural
  {
    tipo: "Pergunta",
    titulo: "Regeneração em Florestas Naturais",
    pergunta: "Qual das seguintes técnicas é comum em viveiros para acelerar a regeneração natural?",
    opcoes: [
      { id: 1, texto: "Uso de ácido sulfúrico" },
      { id: 2, texto: "Plantio direto" },
      { id: 3, texto: "Substituição do solo" },
      { id: 4, texto: "Nenhuma das opções acima" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Restauração Florestal", "Germinação"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Pense em métodos químicos para melhorar a germinação."
  },

  // Pergunta 25: Floresta Ombrófila
  {
    tipo: "Pergunta",
    titulo: "Floresta Ombrófila",
    pergunta: "As florestas ombrófilas são 'amigas das chuvas' porque:",
    opcoes: [
      { id: 1, texto: "Crescem em áreas com precipitação alta e constante" },
      { id: 2, texto: "São formadas principalmente por epífitas" },
      { id: 3, texto: "Estão localizadas em áreas de baixa umidade" },
      { id: 4, texto: "Se desenvolvem em regiões de savana" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Formações Vegetais", "Clima"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Volte uma casa.",
    dica: "Essas florestas dependem de muita chuva para crescer."
  },

  // Pergunta 26: Impacto das Espécies Exóticas
  {
    tipo: "MultiplaEscolha",
    titulo: "Espécies Invasoras",
    pergunta: "Quais das seguintes espécies são consideradas exóticas invasoras?",
    opcoes: [
      { id: 1, texto: "Pinus elliottii" },
      { id: 2, texto: "Acacia mearnsii" },
      { id: 3, texto: "Eucalyptus grandis" },
      { id: 4, texto: "Todas as opções acima" }
    ],
    respostaCorreta: [1, 2, 3, 4],
    dificuldade: "dificil",
    categorias: ["Ecologia", "Conservação"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Essas espécies são comuns, mas não são nativas do Brasil."
  },

  // Pergunta 27: Florestas de Araucária
  {
    tipo: "Pergunta",
    titulo: "Araucária",
    pergunta: "A Araucaria angustifolia é a espécie dominante em qual tipo de formação vegetal?",
    opcoes: [
      { id: 1, texto: "Floresta Ombrófila Densa" },
      { id: 2, texto: "Floresta Ombrófila Mista" },
      { id: 3, texto: "Floresta Estacional Decidual" },
      { id: 4, texto: "Cerrado" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Essa espécie é conhecida como o pinheiro brasileiro."
  },

  // Pergunta 28: Dormência Tegumentar
  {
    tipo: "Pergunta",
    titulo: "Dormência por Resistência Tegumentar",
    pergunta: "A dormência tegumentar é causada por:",
    opcoes: [
      { id: 1, texto: "Espessura da casca" },
      { id: 2, texto: "Ausência de oxigênio" },
      { id: 3, texto: "Baixa temperatura" },
      { id: 4, texto: "Falta de luz" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Germinação", "Dormência"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Pense na resistência física que impede a germinação."
  },

  // Pergunta 29: Savana e Campo Limpo
  {
    tipo: "Pergunta",
    titulo: "Diferenças entre Savana e Campo Limpo",
    pergunta: "Qual das seguintes opções descreve corretamente o campo limpo?",
    opcoes: [
      { id: 1, texto: "Predomínio de árvores altas" },
      { id: 2, texto: "Vegetação herbácea sem árvores" },
      { id: 3, texto: "Árvores espaçadas com arbustos" },
      { id: 4, texto: "Árvores de copa densa" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Formações Vegetais", "Cerrado"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "O campo limpo é a formação mais aberta do Cerrado."
  },

  // Pergunta 30: Relação Flora-Fauna
  {
    tipo: "Pergunta",
    titulo: "Interação Flora e Fauna",
    pergunta: "A relação entre flora e fauna é importante porque:",
    opcoes: [
      { id: 1, texto: "Animais dependem das plantas para abrigo e alimento" },
      { id: 2, texto: "Plantas dependem dos animais para polinização e dispersão" },
      { id: 3, texto: "Mantém o equilíbrio ecológico" },
      { id: 4, texto: "Todas as opções acima" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Ecologia", "Conservação"],
    fontes: [
      "1. Mori et al. (2012). Sementes Florestais: Guia para Germinação de 100 Espécies Nativas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Flora e fauna têm uma interdependência crítica."
  },
  {
    tipo: "Pergunta",
    titulo: "Plano de Manejo Florestal Sustentável",
    pergunta: "Qual é o principal objetivo do Plano de Manejo Florestal Sustentável (PMFS)?",
    opcoes: [
      { id: 1, texto: "Exploração máxima dos recursos florestais" },
      { id: 2, texto: "Garantir a sustentabilidade da floresta a longo prazo" },
      { id: 3, texto: "Produção exclusiva de madeira" },
      { id: 4, texto: "Redução imediata de custos operacionais" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal", "Sustentabilidade"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "O objetivo principal é manter a floresta saudável a longo prazo."
  },

  // Pergunta 2: Autorização Prévia à Análise Técnica (APAT)
  {
    tipo: "Pergunta",
    titulo: "APAT",
    pergunta: "O que é a Autorização Prévia à Análise Técnica (APAT) no contexto do PMFS?",
    opcoes: [
      { id: 1, texto: "Documento que aprova imediatamente o plano de manejo" },
      { id: 2, texto: "Permissão para iniciar a avaliação técnica do PMFS" },
      { id: 3, texto: "Licença para a exploração florestal" },
      { id: 4, texto: "Autorização para venda de produtos madeireiros" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Legislação", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "APAT é necessário para começar a análise técnica."
  },

  // Pergunta 3: Unidade de Manejo Florestal (UMF)
  {
    tipo: "Pergunta",
    titulo: "Unidade de Manejo Florestal",
    pergunta: "O que é uma Unidade de Manejo Florestal (UMF)?",
    opcoes: [
      { id: 1, texto: "Área destinada ao plantio de culturas agrícolas" },
      { id: 2, texto: "Área de um imóvel rural utilizada no manejo florestal" },
      { id: 3, texto: "Área destinada exclusivamente para a conservação da fauna" },
      { id: 4, texto: "Área urbana destinada ao reflorestamento" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal", "Conceitos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "UMF é uma parte do imóvel rural usada para manejo."
  },

  // Pergunta 4: Ciclo de Corte
  {
    tipo: "Pergunta",
    titulo: "Ciclo de Corte",
    pergunta: "Qual é a definição de ciclo de corte em um PMFS?",
    opcoes: [
      { id: 1, texto: "O período de tempo entre colheitas sucessivas na mesma área" },
      { id: 2, texto: "A quantidade de árvores cortadas em um único ano" },
      { id: 3, texto: "O tempo necessário para regenerar uma área desmatada" },
      { id: 4, texto: "O período entre plantios de novas mudas" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo Florestal", "Conceitos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O ciclo de corte é calculado para garantir a sustentabilidade."
  },

  // Pergunta 5: Intensity de Corte
  {
    tipo: "Pergunta",
    titulo: "Intensidade de Corte",
    pergunta: "O que determina a intensidade de corte em um PMFS?",
    opcoes: [
      { id: 1, texto: "O número de árvores cortadas por unidade de área" },
      { id: 2, texto: "O volume comercial de árvores derrubadas por hectare" },
      { id: 3, texto: "O número de pessoas envolvidas na exploração" },
      { id: 4, texto: "O tempo gasto para a exploração de uma área" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Conceitos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "A intensidade é medida em metros cúbicos por hectare."
  },

  // Pergunta 6: Unidade de Produção Anual (UPA)
  {
    tipo: "Pergunta",
    titulo: "Unidade de Produção Anual",
    pergunta: "O que é uma Unidade de Produção Anual (UPA) no contexto do PMFS?",
    opcoes: [
      { id: 1, texto: "Área total de manejo florestal" },
      { id: 2, texto: "Subdivisão da AMF a ser explorada em um ano" },
      { id: 3, texto: "Área destinada à preservação permanente" },
      { id: 4, texto: "Unidade de trabalho na exploração florestal" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal", "Conceitos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "UPA é uma subdivisão específica para exploração anual."
  },

  // Pergunta 7: Vistoria Técnica
  {
    tipo: "Pergunta",
    titulo: "Vistoria Técnica",
    pergunta: "Qual é o objetivo da vistoria técnica em um PMFS?",
    opcoes: [
      { id: 1, texto: "Aumentar a produção florestal" },
      { id: 2, texto: "Controlar e acompanhar as operações e atividades na AMF" },
      { id: 3, texto: "Reavaliar a área de manejo para novas atividades" },
      { id: 4, texto: "Autorizar a comercialização dos produtos florestais" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Legislação", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Vistorias garantem que as operações estejam em conformidade."
  },

  // Pergunta 8: Autorização para Exploração (AUTEX)
  {
    tipo: "Pergunta",
    titulo: "AUTEX",
    pergunta: "O que é a AUTEX no contexto do PMFS?",
    opcoes: [
      { id: 1, texto: "Licença para exportação de produtos florestais" },
      { id: 2, texto: "Autorização para iniciar a exploração florestal" },
      { id: 3, texto: "Documento que autoriza o uso de produtos químicos na floresta" },
      { id: 4, texto: "Permissão para o transporte de madeira cortada" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Legislação", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "AUTEX é emitido antes do início da exploração."
  },

  // Pergunta 9: Diâmetro Mínimo de Corte (DMC)
  {
    tipo: "Pergunta",
    titulo: "Diâmetro Mínimo de Corte",
    pergunta: "O Diâmetro Mínimo de Corte (DMC) para espécies comerciais em um PMFS é determinado com base em:",
    opcoes: [
      { id: 1, texto: "A altura da árvore" },
      { id: 2, texto: "A idade da árvore" },
      { id: 3, texto: "Estudos técnicos específicos por espécie" },
      { id: 4, texto: "O volume total de madeira na área" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Conceitos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O DMC é baseado em estudos técnicos detalhados."
  },

  // Pergunta 10: Relatório de Atividades
  {
    tipo: "Pergunta",
    titulo: "Relatório de Atividades",
    pergunta: "O que deve ser incluído no Relatório de Atividades anual de um PMFS?",
    opcoes: [
      { id: 1, texto: "Apenas o volume de madeira cortada" },
      { id: 2, texto: "A descrição das atividades realizadas em toda a AMF" },
      { id: 3, texto: "Apenas os dados financeiros do manejo" },
      { id: 4, texto: "Uma estimativa do crescimento da floresta" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Legislação", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 2 pontos.",
    dica: "O relatório deve ser abrangente, incluindo todas as atividades."
  },

  // Pergunta 11: Regulação da Produção Florestal
  {
    tipo: "Pergunta",
    titulo: "Regulação da Produção Florestal",
    pergunta: "O que visa a regulação da produção florestal em um PMFS?",
    opcoes: [
      { id: 1, texto: "Maximizar o corte de árvores em menor tempo" },
      { id: 2, texto: "Estabelecer um equilíbrio entre a exploração e a regeneração" },
      { id: 3, texto: "Reduzir o impacto ambiental a zero" },
      { id: 4, texto: "Minimizar o uso de tecnologia no manejo florestal" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Sustentabilidade"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "A regulação é para garantir a sustentabilidade a longo prazo."
  },

  // Pergunta 12: Inventário Florestal a 100%
  {
    tipo: "Pergunta",
    titulo: "Inventário Florestal a 100%",
    pergunta: "Qual é o propósito do inventário florestal a 100% em um PMFS?",
    opcoes: [
      { id: 1, texto: "Determinar a quantidade exata de madeira a ser cortada" },
      { id: 2, texto: "Identificar todas as espécies presentes na AMF" },
      { id: 3, texto: "Monitorar a regeneração natural da floresta" },
      { id: 4, texto: "Avaliar as condições do solo para o manejo florestal" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo Florestal", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "O inventário é essencial para a gestão sustentável dos recursos."
  },

  // Pergunta 13: Avaliação Técnica do PMFS
  {
    tipo: "Pergunta",
    titulo: "Avaliação Técnica do PMFS",
    pergunta: "Quando começa a avaliação técnica de um PMFS em florestas privadas?",
    opcoes: [
      { id: 1, texto: "Após a emissão da Autorização Prévia à Análise Técnica (APAT)" },
      { id: 2, texto: "Imediatamente após a submissão do PMFS" },
      { id: 3, texto: "Após a aprovação do Relatório de Atividades" },
      { id: 4, texto: "Somente após a emissão da AUTEX" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Legislação", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "APAT é crucial para iniciar a avaliação técnica."
  },

  // Pergunta 14: Controle de Origem da Produção
  {
    tipo: "Pergunta",
    titulo: "Controle de Origem da Produção",
    pergunta: "Qual é a importância do controle de origem da produção em um PMFS?",
    opcoes: [
      { id: 1, texto: "Permitir a exportação de produtos florestais" },
      { id: 2, texto: "Rastrear a madeira desde a floresta até o local de desdobramento" },
      { id: 3, texto: "Reduzir os custos de manejo florestal" },
      { id: 4, texto: "Aumentar a eficiência do corte de árvores" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Legislação", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O controle de origem é fundamental para a legalidade do manejo."
  },

  // Pergunta 15: Termo de Responsabilidade de Manutenção da Floresta
  {
    tipo: "Pergunta",
    titulo: "Termo de Responsabilidade",
    pergunta: "Qual é a função do Termo de Responsabilidade de Manutenção da Floresta?",
    opcoes: [
      { id: 1, texto: "Garantir a produção máxima de madeira" },
      { id: 2, texto: "Comprometer o detentor do PMFS com o uso sustentável da floresta" },
      { id: 3, texto: "Autorizar a exploração de produtos não-madeireiros" },
      { id: 4, texto: "Permitir a venda de produtos florestais no mercado internacional" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Legislação", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O termo vincula o detentor ao manejo sustentável da floresta."
  },

  // Pergunta 16: Categoria de PMFS
  {
    tipo: "Pergunta",
    titulo: "Categoria de PMFS",
    pergunta: "Qual das seguintes categorias de PMFS se aplica a florestas privadas?",
    opcoes: [
      { id: 1, texto: "PMFS em Floresta Nacional" },
      { id: 2, texto: "PMFS em Floresta Pública" },
      { id: 3, texto: "PMFS Comunitário" },
      { id: 4, texto: "PMFS Empresarial" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Legislação", "Manejo Florestal"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "A categoria empresarial se aplica a florestas privadas."
  },

  // Pergunta 17: PMFS Pleno
  {
    tipo: "Pergunta",
    titulo: "PMFS Pleno",
    pergunta: "O que caracteriza um PMFS Pleno?",
    opcoes: [
      { id: 1, texto: "Baixa intensidade de corte" },
      { id: 2, texto: "Uso de máquinas para o arraste de toras" },
      { id: 3, texto: "Exploração exclusiva de produtos não-madeireiros" },
      { id: 4, texto: "Apenas o uso de métodos manuais" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "PMFS Pleno envolve uso intensivo de máquinas."
  },

  // Pergunta 18: PMFS de Baixa Intensidade
  {
    tipo: "Pergunta",
    titulo: "PMFS de Baixa Intensidade",
    pergunta: "Qual é a principal característica de um PMFS de Baixa Intensidade?",
    opcoes: [
      { id: 1, texto: "Uso de máquinas para extração florestal" },
      { id: 2, texto: "Proibição total de corte de árvores" },
      { id: 3, texto: "Exploração manual com arraste mínimo de toras" },
      { id: 4, texto: "Exploração intensiva de produtos não-madeireiros" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Baixa intensidade significa menos impacto na floresta."
  },

  // Pergunta 19: Produtos Florestais Não-Madeireiros (PFNM)
  {
    tipo: "Pergunta",
    titulo: "PFNM",
    pergunta: "O que é um PMFS para a produção de Produtos Florestais Não-Madeireiros (PFNM)?",
    opcoes: [
      { id: 1, texto: "Exploração de madeira de forma sustentável" },
      { id: 2, texto: "Produção de recursos como resinas, frutos e sementes" },
      { id: 3, texto: "Corte raso de florestas para plantio de culturas agrícolas" },
      { id: 4, texto: "Exploração de florestas secundárias" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal", "Sustentabilidade"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 1 ponto!",
    desvantagem: "Volte uma casa.",
    dica: "PFNM inclui todos os produtos não-madeireiros da floresta."
  },

  // Pergunta 20: Ciclo de Corte no PMFS Pleno
  {
    tipo: "Pergunta",
    titulo: "Ciclo de Corte no PMFS Pleno",
    pergunta: "Qual é o ciclo de corte mínimo recomendado para um PMFS Pleno?",
    opcoes: [
      { id: 1, texto: "10 anos" },
      { id: 2, texto: "25 anos" },
      { id: 3, texto: "35 anos" },
      { id: 4, texto: "50 anos" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Procedimentos"],
    fontes: [
      "1. Instrução Normativa MMA nº 5 (2006)."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O ciclo de corte deve ser suficiente para a regeneração florestal."
  },
  {
    tipo: "Pergunta",
    titulo: "Degradação de Áreas",
    pergunta: "O que é considerado como degradação de uma área de acordo com o Decreto nº 97.632/89?",
    opcoes: [
      { id: 1, texto: "Perda de biodiversidade" },
      { id: 2, texto: "Compactação do solo" },
      { id: 3, texto: "Desertificação" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Degradação"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Pense nas consequências amplas da degradação ambiental."
  },
  {
    tipo: "Pergunta",
    titulo: "Diferenças Conceituais",
    pergunta: "Quais são as principais diferenças entre restauração, recuperação e reabilitação?",
    opcoes: [
      { id: 1, texto: "Restauração é a total recuperação; Reabilitação é parcial; Recuperação é ecológica" },
      { id: 2, texto: "Reabilitação é a total recuperação; Restauração é parcial; Recuperação é econômica" },
      { id: 3, texto: "Recuperação é a total recuperação; Restauração é parcial; Reabilitação é ecológica" },
      { id: 4, texto: "Todas estão incorretas" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Conceitos"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "Lembre-se da diferença entre totalidade e parcialidade."
  },
  {
    tipo: "Pergunta",
    titulo: "Objetivos da Recuperação",
    pergunta: "Quais os objetivos primários na recuperação de uma área degradada?",
    opcoes: [
      { id: 1, texto: "Reestabelecer a vegetação" },
      { id: 2, texto: "Restaurar a funcionalidade ecológica" },
      { id: 3, texto: "Prevenir a erosão do solo" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "A recuperação é um processo abrangente."
  },
  {
    tipo: "MultiplaEscolha",
    titulo: "Fatores na Recuperação",
    pergunta: "Quais fatores devem ser considerados na recuperação de uma área degradada?",
    opcoes: [
      { id: 1, texto: "Tipo de solo" },
      { id: 2, texto: "Clima local" },
      { id: 3, texto: "Espécies nativas" },
      { id: 4, texto: "Métodos de intervenção" },
      { id: 5, texto: "Todos os fatores acima" }
    ],
    respostaCorreta: [1, 2, 3, 4, 5],
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Planejamento"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Escolha uma vantagem extra!",
    desvantagem: "Perde 2 pontos.",
    dica: "A recuperação envolve uma análise holística."
  },
  {
    tipo: "Pergunta",
    titulo: "Importância da Fitogeografia",
    pergunta: "Por que é importante entender a fitogeografia na recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Para escolher as espécies corretas" },
      { id: 2, texto: "Para planejar a sucessão ecológica" },
      { id: 3, texto: "Para garantir a compatibilidade com o ecossistema" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Ecologia"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte 1 casa.",
    dica: "O sucesso depende de escolhas bem informadas."
  },
  {
    tipo: "Pergunta",
    titulo: "Definição de Solo",
    pergunta: "Como a apostila define o solo?",
    opcoes: [
      { id: 1, texto: "Uma camada de material orgânico e inorgânico" },
      { id: 2, texto: "Um meio físico onde as plantas crescem" },
      { id: 3, texto: "Um recurso natural essencial" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Solo", "Ecologia"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 1 ponto extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O solo é mais do que apenas um suporte físico."
  },
  {
    tipo: "Pergunta",
    titulo: "Erosão do Solo",
    pergunta: "Quais são os principais fatores que contribuem para a erosão do solo?",
    opcoes: [
      { id: 1, texto: "Chuvas intensas" },
      { id: 2, texto: "Desmatamento" },
      { id: 3, texto: "Práticas agrícolas inadequadas" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Solo", "Erosão"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "Pense nas causas humanas e naturais."
  },
  {
    tipo: "Vantagem",
    titulo: "Escolha sua Recompensa",
    pergunta: "Escolha uma vantagem entre as opções abaixo:",
    opcoes: [
      { id: 1, texto: "Jogue novamente" },
      { id: 2, texto: "Avance 3 casas" },
      { id: 3, texto: "Receba um bônus de 10 pontos" }
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Todas as opções são vantajosas!",
    desvantagem: "",
    dica: ""
  },
  {
    tipo: "Pergunta",
    titulo: "Tipos de Degradação",
    pergunta: "Quais são os principais tipos de degradação ambiental abordados na apostila?",
    opcoes: [
      { id: 1, texto: "Física, química e biológica" },
      { id: 2, texto: "Química e física" },
      { id: 3, texto: "Biológica e econômica" },
      { id: 4, texto: "Econômica e física" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Degradação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Considere as diversas facetas da degradação."
  },
  {
    tipo: "Desvantagem",
    titulo: "Escolha sua Penalidade",
    pergunta: "Escolha uma desvantagem entre as opções abaixo:",
    opcoes: [
      { id: 1, texto: "Perde 5 pontos" },
      { id: 2, texto: "Volte 3 casas" },
      { id: 3, texto: "Perca um turno" }
    ],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Todas as opções são desvantajosas!",
    dica: ""
  },
  {
    tipo: "Pergunta",
    titulo: "Diagnóstico Ambiental",
    pergunta: "Qual é a primeira etapa na recuperação de uma área degradada, de acordo com a apostila?",
    opcoes: [
      { id: 1, texto: "Plantio de espécies nativas" },
      { id: 2, texto: "Controle de erosão" },
      { id: 3, texto: "Diagnóstico ambiental" },
      { id: 4, texto: "Elaboração de um plano de manejo" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Planejamento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Antes de agir, é necessário entender o problema."
  },
  {
    tipo: "MultiplaEscolha",
    titulo: "Técnicas de Recuperação",
    pergunta: "Quais técnicas são recomendadas para a recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Controle de erosão" },
      { id: 2, texto: "Plantio de espécies nativas" },
      { id: 3, texto: "Adubação orgânica" },
      { id: 4, texto: "Monitoramento contínuo" },
      { id: 5, texto: "Todas as opções acima" }
    ],
    respostaCorreta: [1, 2, 3, 4, 5],
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Técnicas"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Escolha uma vantagem extra!",
    desvantagem: "Perda de 2 pontos.",
    dica: "A recuperação é um processo contínuo e integrado."
  },
  {
    tipo: "Pergunta",
    titulo: "Seleção de Espécies",
    pergunta: "Qual é o critério principal na seleção de espécies para a recuperação?",
    opcoes: [
      { id: 1, texto: "Tolerância à seca" },
      { id: 2, texto: "Adaptabilidade ao solo" },
      { id: 3, texto: "Compatibilidade com a fauna local" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Biodiversidade"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "A biodiversidade é essencial para o sucesso."
  },
  {
    tipo: "Pergunta",
    titulo: "Monitoramento e Avaliação",
    pergunta: "Qual é a importância do monitoramento na recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Avaliar o sucesso das intervenções" },
      { id: 2, texto: "Ajustar as técnicas conforme necessário" },
      { id: 3, texto: "Prevenir novas degradações" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Monitoramento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "O monitoramento é contínuo e necessário."
  },
  {
    tipo: "Pergunta",
    titulo: "Controle de Erosão",
    pergunta: "Quais são as principais técnicas de controle de erosão mencionadas na apostila?",
    opcoes: [
      { id: 1, texto: "Plantio em curvas de nível" },
      { id: 2, texto: "Cobertura vegetal" },
      { id: 3, texto: "Construção de terraços" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Solo", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte 1 casa.",
    dica: "A prevenção da erosão envolve múltiplas abordagens."
  },
  {
    tipo: "Desvantagem",
    titulo: "Penalidade Ambiental",
    pergunta: "Você não considerou os aspectos sociais na recuperação de uma área. Escolha sua penalidade:",
    opcoes: [
      { id: 1, texto: "Perde 5 pontos" },
      { id: 2, texto: "Volte 3 casas" },
      { id: 3, texto: "Perca um turno" }
    ],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Todas as opções são desvantajosas!",
    dica: ""
  },
  {
    tipo: "Pergunta",
    titulo: "Plantio de Espécies Nativas",
    pergunta: "Qual é a principal vantagem de utilizar espécies nativas na recuperação?",
    opcoes: [
      { id: 1, texto: "Maior taxa de crescimento" },
      { id: 2, texto: "Compatibilidade com o ambiente local" },
      { id: 3, texto: "Menor custo" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Biodiversidade", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Espécies nativas têm adaptabilidade ao seu favor."
  },
  {
    tipo: "Pergunta",
    titulo: "Sucessão Ecológica",
    pergunta: "O que é sucessão ecológica e como ela é importante na recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Processo natural de mudança na estrutura das espécies" },
      { id: 2, texto: "Uma técnica de plantio em recuperação ambiental" },
      { id: 3, texto: "Um método de controle de erosão" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "É um processo de longo prazo."
  },
  {
    tipo: "MultiplaEscolha",
    titulo: "Tipos de Vegetação",
    pergunta: "Quais tipos de vegetação são mencionados na apostila como importantes para recuperação?",
    opcoes: [
      { id: 1, texto: "Florestas" },
      { id: 2, texto: "Cerrado" },
      { id: 3, texto: "Manguezais" },
      { id: 4, texto: "Savanicultura" },
      { id: 5, texto: "Todos os tipos mencionados acima" }
    ],
    respostaCorreta: [1, 2, 3, 4],
    dificuldade: "normal",
    categorias: ["Vegetação", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Escolha uma vantagem extra!",
    desvantagem: "Perda de 2 pontos.",
    dica: "A vegetação varia conforme o ecossistema."
  },
  {
    tipo: "Pergunta",
    titulo: "Conservação do Solo",
    pergunta: "Por que a conservação do solo é crucial na recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Evita a erosão" },
      { id: 2, texto: "Mantém a fertilidade" },
      { id: 3, texto: "Promove o crescimento das plantas" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Solo", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 1 ponto extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O solo é a base de tudo."
  },
  {
    tipo: "Pergunta",
    titulo: "Intervenções Emergenciais",
    pergunta: "Quais são as intervenções emergenciais recomendadas para áreas altamente degradadas?",
    opcoes: [
      { id: 1, texto: "Cercamento da área" },
      { id: 2, texto: "Controle imediato da erosão" },
      { id: 3, texto: "Adubação e plantio de gramíneas" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Recuperação Ambiental", "Intervenções"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 1 ponto.",
    dica: "As emergências requerem respostas rápidas."
  },
  {
    tipo: "Desvantagem",
    titulo: "Penalidade Ambiental",
    pergunta: "Você subestimou o impacto da erosão. Escolha sua penalidade:",
    opcoes: [
      { id: 1, texto: "Perde 5 pontos" },
      { id: 2, texto: "Volte 3 casas" },
      { id: 3, texto: "Perca um turno" }
    ],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Todas as opções são desvantajosas!",
    dica: ""
  },
  {
    tipo: "Pergunta",
    titulo: "Riscos de Invasão",
    pergunta: "Quais são os principais riscos associados ao uso de espécies exóticas na recuperação?",
    opcoes: [
      { id: 1, texto: "Competição com espécies nativas" },
      { id: 2, texto: "Alteração do ecossistema local" },
      { id: 3, texto: "Possibilidade de se tornarem invasoras" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Biodiversidade", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte 1 casa.",
    dica: "As espécies exóticas podem ter impactos negativos."
  },
  {
    tipo: "Pergunta",
    titulo: "Planejamento de Longo Prazo",
    pergunta: "Por que o planejamento de longo prazo é essencial na recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Para garantir a sustentabilidade" },
      { id: 2, texto: "Para prever desafios futuros" },
      { id: 3, texto: "Para monitorar e ajustar estratégias" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Planejamento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "A recuperação é um compromisso de longo prazo."
  },
  {
    tipo: "Pergunta",
    titulo: "Benefícios da Recuperação",
    pergunta: "Quais são os benefícios sociais e econômicos da recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Melhoria da qualidade de vida" },
      { id: 3, texto: "Desenvolvimento sustentável" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Recuperação Ambiental", "Sustentabilidade"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 2 pontos.",
    dica: "A recuperação traz benefícios além do ambiente."
  },
  {
    tipo: "Pergunta",
    titulo: "Desafios na Recuperação",
    pergunta: "Quais são os principais desafios enfrentados na recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Falta de recursos" },
      { id: 2, texto: "Complexidade ecológica" },
      { id: 3, texto: "Engajamento da comunidade" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Desafios"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Os desafios são múltiplos e variados."
  },
  {
    tipo: "Pergunta",
    titulo: "Mitigação de Impactos",
    pergunta: "Quais são as estratégias recomendadas para mitigar os impactos da recuperação?",
    opcoes: [
      { id: 1, texto: "Monitoramento contínuo" },
      { id: 2, texto: "Uso de tecnologias limpas" },
      { id: 3, texto: "Engajamento das partes interessadas" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Mitigação"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte 1 casa.",
    dica: "A mitigação é uma parte crucial do processo."
  },
  {
    tipo: "Pergunta",
    titulo: "Impactos Ambientais",
    pergunta: "Quais são os principais impactos ambientais que a recuperação de áreas degradadas visa reduzir?",
    opcoes: [
      { id: 1, texto: "Erosão do solo" },
      { id: 2, texto: "Perda de biodiversidade" },
      { id: 3, texto: "Desertificação" },
      { id: 4, texto: "Todas as alternativas" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Impactos Ambientais", "Recuperação"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 2 pontos.",
    dica: "A recuperação visa neutralizar vários impactos."
  }
];

const cartas = [
  // Ordem: Etapas para Recuperação de Áreas Degradadas
  {
    tipo: "Ordem",
    titulo: "Etapas da Recuperação",
    pergunta: "Coloque as etapas na ordem correta para a recuperação de áreas degradadas:",
    opcoes: [
      { id: 1, texto: "Diagnóstico ambiental" },
      { id: 2, texto: "Elaboração do plano de recuperação" },
      { id: 3, texto: "Execução das técnicas de recuperação" },
      { id: 4, texto: "Monitoramento e avaliação" }
    ],
    respostaCorreta: [1, 2, 3, 4],
    dificuldade: "normal",
    categorias: ["Planejamento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "O diagnóstico é sempre o primeiro passo."
  },

  // Ordem: Sequência para Controle de Erosão
  {
    tipo: "Ordem",
    titulo: "Controle de Erosão",
    pergunta: "Organize as ações para o controle da erosão na ordem correta:",
    opcoes: [
      { id: 1, texto: "Identificação das áreas vulneráveis" },
      { id: 2, texto: "Implementação de técnicas de controle" },
      { id: 3, texto: "Monitoramento da eficácia" },
      { id: 4, texto: "Revegetação da área" }
    ],
    respostaCorreta: [1, 2, 4, 3],
    dificuldade: "normal",
    categorias: ["Solo", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte 1 casa.",
    dica: "Primeiro identifique, depois atue."
  },

  // Ordem: Fases do Monitoramento
  {
    tipo: "Ordem",
    titulo: "Monitoramento Ambiental",
    pergunta: "Qual é a ordem correta das fases de monitoramento de uma área recuperada?",
    opcoes: [
      { id: 1, texto: "Definição de indicadores" },
      { id: 2, texto: "Coleta de dados" },
      { id: 3, texto: "Análise dos resultados" },
      { id: 4, texto: "Ajustes no plano de recuperação" }
    ],
    respostaCorreta: [1, 2, 3, 4],
    dificuldade: "normal",
    categorias: ["Monitoramento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O monitoramento é um ciclo contínuo."
  },

  // Ordem: Passos para Seleção de Espécies
  {
    tipo: "Ordem",
    titulo: "Seleção de Espécies",
    pergunta: "Qual a sequência correta na seleção de espécies para recuperação?",
    opcoes: [
      { id: 1, texto: "Análise do solo" },
      { id: 2, texto: "Identificação das condições climáticas" },
      { id: 3, texto: "Escolha das espécies compatíveis" },
      { id: 4, texto: "Planejamento da plantação" }
    ],
    respostaCorreta: [1, 2, 3, 4],
    dificuldade: "normal",
    categorias: ["Biodiversidade", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "Condições do solo e clima são essenciais."
  },

  // Ordem: Implementação de Técnicas de Recuperação
  {
    tipo: "Ordem",
    titulo: "Implementação de Técnicas",
    pergunta: "Coloque as etapas para a implementação de técnicas de recuperação na ordem correta:",
    opcoes: [
      { id: 1, texto: "Planejamento das intervenções" },
      { id: 2, texto: "Identificação das áreas críticas" },
      { id: 3, texto: "Execução das intervenções" },
      { id: 4, texto: "Avaliação dos resultados" }
    ],
    respostaCorreta: [2, 1, 3, 4],
    dificuldade: "normal",
    categorias: ["Técnicas de Recuperação", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Sempre comece identificando as áreas de maior necessidade."
  }
];


const cartas = [
  // Pergunta Múltipla Escolha - 1 Resposta Correta
  {
    tipo: "MultiplaEscolha",
    titulo: "Tipos de Florestas",
    pergunta: "Qual destas é uma característica da Floresta Ombrófila Densa?",
    opcoes: [
      { id: 1, texto: "Predominância de árvores caducifólias" },
      { id: 2, texto: "Alta biodiversidade e dossel fechado" },
      { id: 3, texto: "Presença de árvores com raízes tabulares" },
      { id: 4, texto: "Solo arenoso e pobre em nutrientes" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Florestas", "Botânica"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte 1 casa.",
    dica: "Considere as características das florestas tropicais úmidas."
  },

  // Pergunta Múltipla Escolha - 2 Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Sistemas de Recuperação",
    pergunta: "Quais são métodos eficazes para a recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Revegetação com espécies nativas" },
      { id: 2, texto: "Uso de espécies exóticas invasoras" },
      { id: 3, texto: "Construção de barragens" },
      { id: 4, texto: "Controle de erosão com bioengenharia" },
      { id: 5, texto: "Queimadas controladas" }
    ],
    respostaCorreta: [1, 4],
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Ecologia"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Métodos sustentáveis e naturais são preferidos."
  },

  // Pergunta Múltipla Escolha - 1 Resposta Correta
  {
    tipo: "MultiplaEscolha",
    titulo: "Diagnóstico Ambiental",
    pergunta: "O que é considerado na fase de diagnóstico ambiental?",
    opcoes: [
      { id: 1, texto: "Escolha das espécies a serem plantadas" },
      { id: 2, texto: "Avaliação dos impactos ambientais existentes" },
      { id: 3, texto: "Definição do plano de monitoramento" },
      { id: 4, texto: "Execução das técnicas de recuperação" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Planejamento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "O diagnóstico é o primeiro passo para entender o que precisa ser feito."
  },

  // Pergunta Múltipla Escolha - 2 Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Escolha de Espécies",
    pergunta: "Quais fatores são importantes na escolha de espécies para recuperação?",
    opcoes: [
      { id: 1, texto: "Adaptabilidade ao clima local" },
      { id: 2, texto: "Baixa taxa de crescimento" },
      { id: 3, texto: "Compatibilidade com a fauna local" },
      { id: 4, texto: "Capacidade de causar impacto mínimo no solo" },
      { id: 5, texto: "Altos custos de manutenção" }
    ],
    respostaCorreta: [1, 3],
    dificuldade: "normal",
    categorias: ["Biodiversidade", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Pense em como as espécies interagem com o ambiente."
  },

  // Pergunta Múltipla Escolha - 1 Resposta Correta
  {
    tipo: "MultiplaEscolha",
    titulo: "Controle de Erosão",
    pergunta: "Qual é uma técnica eficaz para o controle da erosão em áreas recuperadas?",
    opcoes: [
      { id: 1, texto: "Remoção da cobertura vegetal" },
      { id: 2, texto: "Construção de terraços" },
      { id: 3, texto: "Aplicação de fertilizantes químicos" },
      { id: 4, texto: "Compactação do solo" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Solo", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Volte 1 casa.",
    dica: "A técnica deve reduzir a velocidade do escoamento superficial."
  },

  // Pergunta Múltipla Escolha - 1 Resposta Correta
  {
    tipo: "MultiplaEscolha",
    titulo: "Monitoramento",
    pergunta: "O que é um indicador comum usado no monitoramento de áreas recuperadas?",
    opcoes: [
      { id: 1, texto: "Número de turistas na área" },
      { id: 2, texto: "Taxa de sobrevivência das plantas" },
      { id: 3, texto: "Custo das operações de recuperação" },
      { id: 4, texto: "Quantidade de chuva na área" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Monitoramento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance uma casa!",
    desvantagem: "Volte uma casa.",
    dica: "Monitoramento deve focar no sucesso das plantas reintroduzidas."
  }
];
const cartas = [
  // Pergunta Múltipla Escolha - 2 Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Fatores de Sucesso na Recuperação",
    pergunta: "Quais fatores são essenciais para o sucesso na recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Escolha adequada de espécies" },
      { id: 2, texto: "Uso intensivo de fertilizantes" },
      { id: 3, texto: "Monitoramento contínuo" },
      { id: 4, texto: "Remoção de toda a vegetação nativa" },
      { id: 5, texto: "Baixa diversidade de espécies" }
    ],
    respostaCorreta: [1, 3],
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Planejamento"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Fatores que garantem a sustentabilidade do ecossistema são essenciais."
  },

  // Pergunta Múltipla Escolha - 3 Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Técnicas de Recuperação",
    pergunta: "Quais destas técnicas são comumente utilizadas na recuperação de áreas degradadas?",
    opcoes: [
      { id: 1, texto: "Plantio direto" },
      { id: 2, texto: "Controle de erosão com bioengenharia" },
      { id: 3, texto: "Compactação do solo" },
      { id: 4, texto: "Uso de espécies exóticas" },
      { id: 5, texto: "Reflorestamento com espécies nativas" }
    ],
    respostaCorreta: [1, 2, 5],
    dificuldade: "normal",
    categorias: ["Recuperação Ambiental", "Ecologia"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance 3 casas!",
    desvantagem: "Volte 2 casas.",
    dica: "Pense em técnicas que ajudam a restaurar o ecossistema."
  },

  // Pergunta Múltipla Escolha - 2 Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Processo de Diagnóstico Ambiental",
    pergunta: "Quais são as etapas importantes no processo de diagnóstico ambiental?",
    opcoes: [
      { id: 1, texto: "Identificação dos impactos ambientais" },
      { id: 2, texto: "Definição do cronograma de plantio" },
      { id: 3, texto: "Levantamento da fauna e flora local" },
      { id: 4, texto: "Escolha das espécies a serem utilizadas" },
      { id: 5, texto: "Construção de infraestruturas de suporte" }
    ],
    respostaCorreta: [1, 3],
    dificuldade: "normal",
    categorias: ["Planejamento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "O diagnóstico envolve uma avaliação detalhada do ambiente."
  },

  // Pergunta Múltipla Escolha - 3 Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Escolha de Espécies para Reflorestamento",
    pergunta: "Quais critérios são importantes na escolha de espécies para reflorestamento?",
    opcoes: [
      { id: 1, texto: "Adaptabilidade ao solo local" },
      { id: 2, texto: "Facilidade de manejo" },
      { id: 3, texto: "Capacidade invasiva" },
      { id: 4, texto: "Compatibilidade com a fauna local" },
      { id: 5, texto: "Taxa de crescimento rápido" },
      { id: 6, texto: "Resistência a pragas locais" }
    ],
    respostaCorreta: [1, 4, 6],
    dificuldade: "dificil",
    categorias: ["Reflorestamento", "Biodiversidade"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Volte 3 casas.",
    dica: "Pense em características que garantem a sobrevivência das espécies no local."
  },

  // Pergunta Múltipla Escolha - 3 Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Controle de Erosão",
    pergunta: "Quais técnicas são eficazes para o controle da erosão em áreas recuperadas?",
    opcoes: [
      { id: 1, texto: "Construção de terraços" },
      { id: 2, texto: "Uso de barreiras vegetativas" },
      { id: 3, texto: "Compactação intensa do solo" },
      { id: 4, texto: "Cobertura do solo com mantas vegetais" },
      { id: 5, texto: "Remoção total da cobertura vegetal" },
      { id: 6, texto: "Aplicação de fertilizantes químicos" }
    ],
    respostaCorreta: [1, 2, 4],
    dificuldade: "dificil",
    categorias: ["Solo", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Técnicas que estabilizam o solo e reduzem o escoamento superficial são eficazes."
  },

  // Pergunta Múltipla Escolha - 2 Respostas Corretas
  {
    tipo: "MultiplaEscolha",
    titulo: "Monitoramento de Áreas Recuperadas",
    pergunta: "Quais indicadores são comuns no monitoramento de áreas recuperadas?",
    opcoes: [
      { id: 1, texto: "Taxa de sobrevivência das plantas" },
      { id: 2, texto: "Quantidade de chuva anual" },
      { id: 3, texto: "Cobertura de solo por vegetação" },
      { id: 4, texto: "Número de visitantes na área" },
      { id: 5, texto: "Custo das operações de manutenção" }
    ],
    respostaCorreta: [1, 3],
    dificuldade: "facil",
    categorias: ["Monitoramento", "Recuperação Ambiental"],
    fontes: ["1. Apostila de Recuperação de Áreas Degradadas."],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte 1 casa.",
    dica: "Indicadores que medem o sucesso da vegetação são essenciais."
  },
  {
    tipo: "Vantagem",
    titulo: "Escolha sua Recompensa",
    pergunta: "Escolha uma vantagem entre as opções abaixo:",
    opcoes: [
      { id: 1, texto: "Ganhe 5 pontos" },
      { id: 2, texto: "Avance 3 casas" },
      { id: 3, texto: "Receba um bônus de 10 MM" }
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Todas as opções são vantajosas!",
    desvantagem: "",
    dica: ""
  },

  // Carta de Vantagem - Bônus Extra
  {
    tipo: "Vantagem",
    titulo: "Bônus Extra",
    pergunta: "Parabéns! Você ganhou um bônus extra.",
    opcoes: [
      { id: 1, texto: "Receber bônus" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Receba um bônus de 20 MM!",
    desvantagem: "",
    dica: ""
  },

  // Carta de Vantagem - Avanço Extra
  {
    tipo: "Vantagem",
    titulo: "Avanço Extra",
    pergunta: "Você ganhou a chance de avançar mais no jogo!",
    opcoes: [
      { id: 1, texto: "Avançar" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Avance 2 casas!",
    desvantagem: "",
    dica: ""
  },

  // Carta de Vantagem - Escolha uma Habilidade
  {
    tipo: "Vantagem",
    titulo: "Escolha uma Habilidade",
    pergunta: "Selecione uma habilidade para usar no jogo:",
    opcoes: [
      { id: 1, texto: "Ganhar 1 ponto de habilidade" },
      { id: 2, texto: "Recuperar um turno perdido" },
      { id: 3, texto: "Duplicar pontos em uma rodada" }
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Todas as opções são vantajosas!",
    desvantagem: "",
    dica: ""
  },

  // Carta de Outras - Resete seu Progresso
  {
    tipo: "Outras",
    titulo: "Resete seu Progresso",
    pergunta: "Você tem a chance de resetar seu progresso, mantendo os bônus acumulados.",
    opcoes: [
      { id: 1, texto: "Resetar progresso" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Outras"],
    fontes: [],
    vantagem: "Progresso resetado, mas os bônus são mantidos.",
    desvantagem: "",
    dica: ""
  },

  // Carta de Outras - Troca de Posição
  {
    tipo: "Outras",
    titulo: "Troca de Posição",
    pergunta: "Troque de posição com o jogador à sua escolha.",
    opcoes: [
      { id: 1, texto: "Trocar de posição" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Outras"],
    fontes: [],
    vantagem: "Você trocou de posição com outro jogador.",
    desvantagem: "",
    dica: ""
  },

  // Carta de Outras - Salte uma Rodada
  {
    tipo: "Outras",
    titulo: "Salte uma Rodada",
    pergunta: "Você pode escolher saltar uma rodada e preservar seus pontos.",
    opcoes: [
      { id: 1, texto: "Saltar rodada" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Outras"],
    fontes: [],
    vantagem: "Rodada saltada, pontos preservados.",
    desvantagem: "",
    dica: ""
  },

  // Carta de Outras - Ajuda Extra
  {
    tipo: "Outras",
    titulo: "Ajuda Extra",
    pergunta: "Você pode receber uma dica adicional para a próxima pergunta.",
    opcoes: [
      { id: 1, texto: "Receber dica" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Outras"],
    fontes: [],
    vantagem: "Você recebeu uma dica extra para a próxima pergunta.",
    desvantagem: "",
    dica: ""
  },
  {
    tipo: "Pergunta",
    titulo: "Identificação de Espécies",
    pergunta: `Qual das plantas abaixo pertence ao gênero *Cecropia*?
    <img src="/1.jpg" alt="Plantas Cecropia" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Planta A" },
      { id: 2, texto: "Planta B" },
      { id: 3, texto: "Planta C" },
      { id: 4, texto: "Planta D" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Identificação de Plantas", "Botânica"],
    fontes: [
      "Silva, M. (2023). Guia de Identificação de Plantas Nativas."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Observe as folhas."
  },

  {
    tipo: "Pergunta",
    titulo: "Tipos de Solo",
    pergunta: `Qual dos solos abaixo é mais adequado para a plantação de *Araucaria angustifolia*?
    <img src="/2.jpg" alt="Tipos de Solo" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Solo A" },
      { id: 2, texto: "Solo B" },
      { id: 3, texto: "Solo C" },
      { id: 4, texto: "Solo D" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Pedologia", "Silvicultura"],
    fontes: [
      "Ribeiro, L. (2022). Solo e Silvicultura."
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "Procure um solo bem drenado e ácido."
  },

  {
    tipo: "Pergunta",
    titulo: "Identificação de Sementes",
    pergunta: `Qual das sementes abaixo pertence à *Virola gardneri*?
    <img src="/3.jpg" alt="Sementes de Virola" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Semente A" },
      { id: 2, texto: "Semente B" },
      { id: 3, texto: "Semente C" },
      { id: 4, texto: "Semente D" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Sementes", "Botânica"],
    fontes: [
      "Moraes, A. (2023). Manual de Sementes Florestais."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Observe o formato e a cor."
  },

  {
    tipo: "Pergunta",
    titulo: "Dinâmica de Florestas",
    pergunta: `Qual das imagens abaixo representa uma floresta semidecidual?
    <img src="/4.jpg" alt="Floresta Semidecidual" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Imagem A" },
      { id: 2, texto: "Imagem B" },
      { id: 3, texto: "Imagem C" },
      { id: 4, texto: "Imagem D" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Dinâmica Florestal", "Ecologia"],
    fontes: [
      "Ivanauskas, N. (2022). Florestas do Brasil."
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "Procure as árvores com perda parcial de folhas."
  },

  {
    tipo: "Pergunta",
    titulo: "Erosão do Solo",
    pergunta: `Qual das práticas abaixo é a mais eficaz para prevenir a erosão em áreas de encosta?
    <img src="/5.jpg" alt="Prevenção de Erosão" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Plantio Direto" },
      { id: 2, texto: "Terraceamento" },
      { id: 3, texto: "Cobertura do Solo" },
      { id: 4, texto: "Canalização da Água" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação do Solo", "Sustentabilidade"],
    fontes: [
      "Silva, J. (2023). Técnicas de Conservação do Solo."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Foque em técnicas que controlam o fluxo de água."
  },

  {
    tipo: "Pergunta",
    titulo: "Práticas Agroflorestais",
    pergunta: `Qual das imagens abaixo representa uma prática agroflorestal?
    <img src="/6.jpg" alt="Prática Agroflorestal" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Imagem A" },
      { id: 2, texto: "Imagem B" },
      { id: 3, texto: "Imagem C" },
      { id: 4, texto: "Imagem D" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Agrofloresta", "Sustentabilidade"],
    fontes: [
      "Almeida, P. (2022). Agroflorestas: Práticas Sustentáveis."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Procure a combinação de árvores e culturas agrícolas."
  },

  {
    tipo: "Pergunta",
    titulo: "Ciclos de Corte",
    pergunta: `Qual das áreas abaixo está mais adequada para um ciclo de corte de 25 anos?
    <img src="/7.jpg" alt="Áreas de Ciclo de Corte" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Área A" },
      { id: 2, texto: "Área B" },
      { id: 3, texto: "Área C" },
      { id: 4, texto: "Área D" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Silvicultura"],
    fontes: [
      "Martins, R. (2023). Ciclos de Corte Sustentáveis."
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "Considere o crescimento das árvores e a regeneração natural."
  },

  {
    tipo: "Pergunta",
    titulo: "Impacto das Atividades Madeireiras",
    pergunta: `Qual das imagens abaixo mostra o impacto negativo das atividades madeireiras na floresta?
    <img src="/8.jpg" alt="Impacto Madeireiro" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Imagem A" },
      { id: 2, texto: "Imagem B" },
      { id: 3, texto: "Imagem C" },
      { id: 4, texto: "Imagem D" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Impacto Ambiental"],
    fontes: [
      "Costa, M. (2022). Impactos Ambientais do Manejo Florestal."
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "Procure sinais de degradação da vegetação."
  },

  {
    tipo: "Pergunta",
    titulo: "Plantio de Mudas",
    pergunta: `Qual das imagens abaixo representa a técnica correta de plantio de mudas em áreas de recuperação?
    <img src="/9.jpg" alt="Técnica de Plantio de Mudas" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Imagem A" },
      { id: 2, texto: "Imagem B" },
      { id: 3, texto: "Imagem C" },
      { id: 4, texto: "Imagem D" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Recuperação Ambiental", "Reflorestamento"],
    fontes: [
      "Silva, A. (2023). Reflorestamento e Recuperação de Áreas Degradadas."
    ],
    vantagem: "Ganhe 2 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Procure a técnica que garante a melhor sobrevivência das mudas."
  },

  {
    tipo: "Pergunta",
    titulo: "Tipos de Estratificação Florestal",
    pergunta: `Qual das imagens abaixo mostra a estratificação de uma floresta ombrófila densa?
    <img src="/10.jpg" alt="Estratificação Florestal" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Imagem A" },
      { id: 2, texto: "Imagem B" },
      { id: 3, texto: "Imagem C" },
      { id: 4, texto: "Imagem D" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Estratificação Florestal", "Ecologia"],
    fontes: [
      "Ivanauskas, N. (2023). Estratificação Florestal no Brasil."
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "Procure as camadas distintas de vegetação."
  },
  {
    tipo: "Pergunta",
    titulo: "Manejo Florestal Sustentável",
    pergunta: "O que é um Plano de Manejo Florestal Sustentável (PMFS) e quais são os principais critérios para sua elaboração e execução, de acordo com a Instrução Normativa MMA nº 5 de 11/12/2006?",
    opcoes: [
      { id: 1, texto: "Um PMFS é um documento que descreve as técnicas de manejo que visam garantir a sustentabilidade da exploração florestal, com critérios como ciclo de corte, intensidade de exploração e manutenção de árvores." },
      { id: 2, texto: "Um PMFS é uma licença que permite a exploração ilimitada de recursos florestais, sem necessidade de reposição ou controle." },
      { id: 3, texto: "Um PMFS é um relatório de atividades florestais que detalha apenas as espécies exploradas e o volume extraído." },
      { id: 4, texto: "Um PMFS é uma autorização para a queima controlada de áreas florestais visando a regeneração natural." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Legislação Ambiental"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "O PMFS visa garantir a sustentabilidade."
  },

  {
    tipo: "Pergunta",
    titulo: "Critérios para Corte de Árvores",
    pergunta: "De acordo com a Instrução Normativa MMA nº 5 de 11/12/2006, quais são os critérios básicos para a seleção de árvores que podem ser cortadas em um Plano de Manejo Florestal Sustentável?",
    opcoes: [
      { id: 1, texto: "As árvores devem ter um Diâmetro Mínimo de Corte (DMC) específico, com a manutenção de um percentual mínimo por espécie, visando a regeneração natural." },
      { id: 2, texto: "As árvores podem ser cortadas indiscriminadamente, sem necessidade de respeitar DMC ou manutenção de espécies." },
      { id: 3, texto: "Apenas árvores mortas ou caídas naturalmente podem ser cortadas, independentemente do DMC." },
      { id: 4, texto: "Árvores com DMC inferior a 20 cm podem ser cortadas livremente para fins de exploração madeireira." }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Silvicultura"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "O DMC é um critério fundamental."
  },

  {
    tipo: "Pergunta",
    titulo: "Planejamento de Ciclos de Corte",
    pergunta: "Qual é a importância do ciclo de corte em um Plano de Manejo Florestal Sustentável, conforme descrito na Instrução Normativa MMA nº 5 de 11/12/2006?",
    opcoes: [
      { id: 1, texto: "O ciclo de corte define o período necessário para que a floresta se regenere e garanta a sustentabilidade da produção florestal." },
      { id: 2, texto: "O ciclo de corte é irrelevante, pois a floresta pode ser explorada continuamente sem impacto na regeneração." },
      { id: 3, texto: "O ciclo de corte é apenas uma recomendação sem necessidade de ser seguido rigorosamente." },
      { id: 4, texto: "O ciclo de corte permite que as áreas sejam desmatadas completamente antes de serem abandonadas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Legislação Ambiental"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "O ciclo de corte é essencial para a sustentabilidade."
  },

  {
    tipo: "Pergunta",
    titulo: "Impactos da Exploração Florestal",
    pergunta: "Quais são os principais impactos ambientais da exploração florestal sem manejo adequado, conforme descrito na Instrução Normativa MMA nº 5 de 11/12/2006?",
    opcoes: [
      { id: 1, texto: "Destruição de habitats, perda de biodiversidade e degradação do solo, além de impacto negativo sobre a regeneração natural." },
      { id: 2, texto: "Aumento da biodiversidade, melhoria do solo e regeneração acelerada das áreas exploradas." },
      { id: 3, texto: "Nenhum impacto significativo, pois a floresta se regenera naturalmente sem necessidade de manejo." },
      { id: 4, texto: "A exploração sem manejo adequado não afeta o meio ambiente, desde que realizada em pequena escala." }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Impacto Ambiental"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "Considere os impactos negativos da exploração."
  },

  {
    tipo: "Pergunta",
    titulo: "Atribuições do IBAMA",
    pergunta: "Quais são as principais atribuições do IBAMA na aprovação e fiscalização dos Planos de Manejo Florestal Sustentável (PMFS), segundo a Instrução Normativa MMA nº 5 de 11/12/2006?",
    opcoes: [
      { id: 1, texto: "Aprovação de PMFS em florestas públicas de domínio da União, fiscalização de atividades de manejo e emissão de autorizações para exploração." },
      { id: 2, texto: "Apenas aprovar PMFS em florestas privadas e não realizar fiscalização." },
      { id: 3, texto: "Emitir licenças de desmatamento e fiscalizar a regeneração natural das florestas desmatadas." },
      { id: 4, texto: "O IBAMA não tem participação na aprovação ou fiscalização dos PMFS." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Legislação Ambiental", "Manejo Florestal"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "O IBAMA desempenha um papel crucial na aprovação e fiscalização."
  },

  {
    tipo: "Pergunta",
    titulo: "Definição de Áreas de Manejo Florestal",
    pergunta: "Como a Instrução Normativa MMA nº 5 de 11/12/2006 define a Área de Manejo Florestal (AMF) e sua importância na elaboração de um PMFS?",
    opcoes: [
      { id: 1, texto: "A AMF é o conjunto de Unidades de Manejo Florestal que compõe o PMFS, sendo essencial para o planejamento e execução das atividades de manejo." },
      { id: 2, texto: "A AMF é a área total do imóvel rural onde qualquer tipo de exploração florestal pode ser realizada sem necessidade de planejamento." },
      { id: 3, texto: "A AMF é uma área protegida onde não se pode realizar nenhum tipo de exploração florestal." },
      { id: 4, texto: "A AMF é uma área destinada exclusivamente ao plantio de espécies exóticas para fins comerciais." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Legislação Ambiental"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "A AMF é crucial para o planejamento do manejo."
  },

  {
    tipo: "Pergunta",
    titulo: "Uso de Espécies Exóticas",
    pergunta: "Segundo a Instrução Normativa MMA nº 5 de 11/12/2006, qual é a recomendação para o uso de espécies exóticas em Planos de Manejo Florestal Sustentável?",
    opcoes: [
      { id: 1, texto: "O uso de espécies exóticas deve ser evitado em PMFS voltados à restauração de florestas naturais." },
      { id: 2, texto: "O uso de espécies exóticas é incentivado para aumentar a produtividade e a diversidade da floresta." },
      { id: 3, texto: "Espécies exóticas devem ser utilizadas apenas em florestas primárias de alto valor econômico." },
      { id: 4, texto: "O uso de espécies exóticas é obrigatório em todas as áreas de manejo florestal." }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Silvicultura"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "Espécies exóticas não são recomendadas para restauração."
  },

  {
    tipo: "Pergunta",
    titulo: "Requisitos para Emissão de AUTEX",
    pergunta: "Quais são os requisitos básicos para a emissão da Autorização para Exploração (AUTEX), conforme descrito na Instrução Normativa MMA nº 5 de 11/12/2006?",
    opcoes: [
      { id: 1, texto: "A apresentação de um POA aprovado, manutenção das árvores exigidas por espécie, e cumprimento das diretrizes técnicas do PMFS." },
      { id: 2, texto: "Apenas o pagamento de uma taxa ao órgão ambiental competente." },
      { id: 3, texto: "A solicitação ao órgão ambiental sem necessidade de planejamento ou documentação." },
      { id: 4, texto: "A apresentação de um relatório anual com as atividades realizadas, independentemente do cumprimento do PMFS." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Legislação Ambiental", "Manejo Florestal"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "A AUTEX depende de planejamento e aprovação do POA."
  },

  {
    tipo: "Pergunta",
    titulo: "Fiscalização de PMFS",
    pergunta: "Como a Instrução Normativa MMA nº 5 de 11/12/2006 estabelece a fiscalização dos Planos de Manejo Florestal Sustentável, e qual a frequência das vistorias?",
    opcoes: [
      { id: 1, texto: "Os PMFS devem ser vistoriados por amostragem, com intervalos não superiores a 3 anos." },
      { id: 2, texto: "Os PMFS não necessitam de vistorias, apenas de relatórios anuais." },
      { id: 3, texto: "A fiscalização é opcional e realizada apenas se houver denúncias de irregularidades." },
      { id: 4, texto: "As vistorias são realizadas anualmente, independentemente de amostragens." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Legislação Ambiental", "Manejo Florestal"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "A fiscalização é feita por amostragem."
  },

  {
    tipo: "Pergunta",
    titulo: "Penalidades em PMFS",
    pergunta: "Quais são as penalidades previstas para o descumprimento das diretrizes de um Plano de Manejo Florestal Sustentável, conforme a Instrução Normativa MMA nº 5 de 11/12/2006?",
    opcoes: [
      { id: 1, texto: "Advertência, suspensão do PMFS, embargo e multas, dependendo da gravidade da infração." },
      { id: 2, texto: "Somente multas, sem impacto na continuidade das atividades de manejo." },
      { id: 3, texto: "Apenas advertências sem aplicação de outras penalidades." },
      { id: 4, texto: "As penalidades incluem apenas a suspensão temporária do PMFS, sem outras consequências." }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Legislação Ambiental", "Manejo Florestal"],
    fontes: [
      "Instrução Normativa MMA nº 5 de 11/12/2006"
    ],
    vantagem: "Ganhe 4 pontos!",
    desvantagem: "Perde 3 pontos.",
    dica: "As penalidades variam de acordo com a infração."
  }
];

export default cartas;
