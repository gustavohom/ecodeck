const manejoPlantadas = [
  // Carta 1: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Dendrometria Básica",
    pergunta: "Qual equação é comumente utilizada para estimar o volume de uma árvore em plantações florestais?",
    opcoes: [
      { id: 1, texto: "Volume = Área da base x altura" },
      { id: 2, texto: "Volume = (π x D^2 / 4) x altura" },
      { id: 3, texto: "Volume = (A x B x C)" },
      { id: 4, texto: "Volume = (2 x PI x raio x altura)" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Fernandes, H. (2021). Dendrometria Avançada.",
      "2. Costa, S. (2020). Técnicas de Inventário Florestal."
    ],
    vantagem: "Avance 3 casas!",
    desvantagem: "Perde 1 estrela.",
    dica: "A equação de volume utiliza o diâmetro na altura do peito."
  },

  // Carta 2: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Amostragem Sistemática",
    pergunta: "Você adotou um delineamento de amostragem sistemática em seu inventário.",
    opcoes: [
      { id: 1, texto: "Aplicar a metodologia sistemática para maior precisão. Ganhe 2 estrelas e avance 2 casas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 2 casas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 3: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Erro de Medição",
    pergunta: "Você cometeu um erro na medição do diâmetro das árvores.",
    opcoes: [
      { id: 1, texto: "Recalcular os dados com precisão." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 estrela e 2 moedas.",
    dica: "Erros de medição podem comprometer o inventário."
  },

  // Carta 4: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Amostragem Aleatória Estratificada",
    pergunta: "Qual a principal vantagem da amostragem aleatória estratificada em plantações florestais?",
    opcoes: [
      { id: 1, texto: "Reduz o tempo de inventário" },
      { id: 2, texto: "Aumenta a representatividade das amostras" },
      { id: 3, texto: "Elimina a necessidade de delineamento" },
      { id: 4, texto: "Facilita a coleta de dados" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Técnicas de Amostragem.",
      "2. Mendes, A. (2019). Estatística Aplicada à Floresta."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Estratificação melhora a precisão das estimativas."
  },

  // Carta 5: Outras
  {
    tipo: "Outras",
    titulo: "Troca de Dados com Outro Jogador",
    pergunta: "Você pode trocar parte dos seus dados de inventário com outro jogador.",
    opcoes: [
      { id: 1, texto: "Escolher trocar 2 acertos por 1 estrela." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Troque 2 acertos por 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 6: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Equação de Schumacher-Hall",
    pergunta: "A equação de Schumacher-Hall é utilizada para estimar:",
    opcoes: [
      { id: 1, texto: "Crescimento radial anual" },
      { id: 2, texto: "Volume total da árvore" },
      { id: 3, texto: "Área foliar" },
      { id: 4, texto: "Biomassa aérea" },
      { id: 5, texto: "Número de acúmulo de anéis" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Carvalho, D. (2021). Modelos de Crescimento.",
      "2. Santos, E. (2020). Dendrometria Aplicada."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "Ela relaciona o crescimento radial com o tempo."
  },

  // Carta 7: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Melhoria da Acessibilidade",
    pergunta: "Você melhorou a acessibilidade nas áreas de plantação.",
    opcoes: [
      { id: 1, texto: "Facilitar o acesso para manejo e colheita. Ganhe 3 moedas e avance 2 casas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 8: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Mudas",
    pergunta: "Mudas de uma parcela foram perdidas devido a pragas.",
    opcoes: [
      { id: 1, texto: "Replantar as mudas perdidas." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 1 contador de progresso.",
    dica: "Pragas podem comprometer o desenvolvimento da plantação."
  },

  // Carta 9: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Crescimento Alométrico",
    pergunta: "O crescimento alométrico refere-se a:",
    opcoes: [
      { id: 1, texto: "Crescimento linear da árvore" },
      { id: 2, texto: "Relação não linear entre diâmetro e altura" },
      { id: 3, texto: "Aumento da densidade de plantio" },
      { id: 4, texto: "Expansão horizontal da copa" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Rodrigues, V. (2018). Crescimento Alométrico em Árvores.",
      "2. Barros, T. (2019). Dendrometria."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "É a relação entre diferentes medidas de crescimento."
  },

  // Carta 10: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Tecnologia de Monitoramento",
    pergunta: "Você implementou tecnologia de monitoramento remoto em sua plantação.",
    opcoes: [
      { id: 1, texto: "Utilizar dados para otimizar o manejo. Ganhe 2 estrelas e 3 moedas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e 3 moedas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 11: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Amostragem por Pontos Fixos",
    pergunta: "A amostragem por pontos fixos é utilizada para:",
    opcoes: [
      { id: 1, texto: "Medir a altura das árvores" },
      { id: 2, texto: "Estimativa de densidade e distribuição das árvores" },
      { id: 3, texto: "Calcular a biomassa do solo" },
      { id: 4, texto: "Analisar a qualidade da água" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Métodos de Amostragem.",
      "2. Almeida, S. (2020). Estatística Aplicada à Floresta."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Pontuações fixas permitem uma amostragem mais estruturada."
  },

  // Carta 12: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falha no Reflorestamento",
    pergunta: "Seu projeto de reflorestamento apresentou baixa taxa de sobrevivência das mudas.",
    opcoes: [
      { id: 1, texto: "Reavaliar e ajustar as técnicas de plantio." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 moedas.",
    dica: "Ajustes são necessários para melhorar a sobrevivência das mudas."
  },

  // Carta 13: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Equação de Espécies",
    pergunta: "A equação de Espécies utilizada em inventários florestais serve para:",
    opcoes: [
      { id: 1, texto: "Calcular a altura média das árvores" },
      { id: 2, texto: "Determinar a diversidade de espécies em uma parcela" },
      { id: 3, texto: "Estimar o volume de madeira" },
      { id: 4, texto: "Analisar a composição do solo" },
      { id: 5, texto: "Prever o crescimento das árvores" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Carvalho, D. (2021). Diversidade de Espécies em Florestas.",
      "2. Santos, E. (2020). Técnicas de Inventário Florestal."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "A equação ajuda a quantificar a diversidade."
  },

  // Carta 14: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Integração Lavoura-Floresta",
    pergunta: "Você implementou um sistema de integração lavoura-floresta.",
    opcoes: [
      { id: 1, texto: "Combinar produção agrícola com manejo florestal. Ganhe 2 estrelas e 3 moedas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e 2 moedas.",
    desvantagem: "",
    dica: "Essa integração promove sustentabilidade e diversificação."
  },

  // Carta 15: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Rotação de Corte",
    pergunta: "O que significa rotação de corte em manejo de plantadas?",
    opcoes: [
      { id: 1, texto: "O corte das árvores em intervalos de tempo fixos" },
      { id: 2, texto: "O corte seletivo baseado na idade das árvores" },
      { id: 3, texto: "A colheita de todas as árvores de uma vez" },
      { id: 4, texto: "Aumento progressivo da densidade de plantio" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Barros, S. (2018). Planejamento de Rotação de Corte.",
      "2. Costa, L. (2019). Silvicultura Sustentável."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Rotação de corte ajuda a manter a sustentabilidade da plantação."
  },

  // Carta 16: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Invasão de Formigas",
    pergunta: "Formigas invasoras estão afetando a saúde das mudas.",
    opcoes: [
      { id: 1, texto: "Aplicar controle biológico adequado." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 1 contador de progresso.",
    dica: "Controles biológicos são essenciais para manejar pragas."
  },

  // Carta 17: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Biomassa Aérea",
    pergunta: "Qual a importância de estimar a biomassa aérea em plantadas?",
    opcoes: [
      { id: 1, texto: "Avaliar a qualidade do solo" },
      { id: 2, texto: "Determinar a quantidade de carbono estocado" },
      { id: 3, texto: "Medir a taxa de crescimento das raízes" },
      { id: 4, texto: "Avaliar a saúde das folhas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, M. (2020). Biomassa e Carbono em Florestas.",
      "2. Andrade, F. (2019). Estudo da Biomassa."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A biomassa aérea é um indicador chave do sequestro de carbono."
  },

  // Carta 18: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Melhoria Genética",
    pergunta: "Você iniciou um programa de melhoramento genético nas plantadas.",
    opcoes: [
      { id: 1, texto: "Selecionar clones com melhores características de crescimento. Ganhe 2 estrelas e 3 moedas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e 4 moedas.",
    desvantagem: "",
    dica: "Melhoramento genético pode aumentar a produtividade."
  },

  // Carta 19: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Análise de Inventário",
    pergunta: "Qual método estatístico é mais adequado para analisar a distribuição espacial das árvores em uma plantação?",
    opcoes: [
      { id: 1, texto: "Regressão Linear" },
      { id: 2, texto: "Análise de Variância (ANOVA)" },
      { id: 3, texto: "Índice de Moran" },
      { id: 4, texto: "Teste t de Student" },
      { id: 5, texto: "Análise de Componentes Principais (PCA)" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Estatística em Inventário Florestal.",
      "2. Almeida, S. (2020). Métodos Estatísticos para Florestas."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "Índice de Moran mede a autocorrelação espacial."
  },

  // Carta 20: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Dados",
    pergunta: "Você perdeu os dados de inventário devido a falha no equipamento.",
    opcoes: [
      { id: 1, texto: "Recoletar os dados perdidos imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 contadores de progresso.",
    dica: "Backup regular é essencial para evitar perdas de dados."
  },

  // Carta 21: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Ciclo de Vida das Árvores",
    pergunta: "O que caracteriza uma árvore de ciclo de vida curto em plantadas?",
    opcoes: [
      { id: 1, texto: "Baixa taxa de crescimento" },
      { id: 2, texto: "Longa vida e alta longevidade" },
      { id: 3, texto: "Crescimento rápido e colheita em menos tempo" },
      { id: 4, texto: "Resistência a pragas e doenças" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Ciclo de Vida em Plantadas.",
      "2. Pereira, B. (2019). Silvicultura Comercial."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Ciclos curtos são comuns em espécies de rápido crescimento."
  },

  // Carta 22: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Planejamento de Rotação",
    pergunta: "Você implementou um planejamento de rotação eficiente em sua plantação.",
    opcoes: [
      { id: 1, texto: "Planejar cortes de acordo com o crescimento das árvores. Ganhe 2 estrelas e avance 3 casas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 3 casas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 23: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Erros no Delineamento Experimental",
    pergunta: "Seu delineamento experimental apresentou vieses significativos.",
    opcoes: [
      { id: 1, texto: "Reformular o delineamento para eliminar os vieses." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Delineamentos robustos evitam resultados enviesados."
  },

  // Carta 24: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Equações de Crescimento",
    pergunta: "A equação de Richards é utilizada para modelar:",
    opcoes: [
      { id: 1, texto: "Crescimento logístico das árvores" },
      { id: 2, texto: "Distribuição espacial das árvores" },
      { id: 3, texto: "Produção de madeira" },
      { id: 4, texto: "Resiliência do ecossistema" },
      { id: 5, texto: "Taxa de fotossíntese" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Modelagem de Crescimento Florestal.",
      "2. Mendes, A. (2019). Equações de Crescimento."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A equação de Richards é flexível para diferentes padrões de crescimento."
  },

  // Carta 25: Outras
  {
    tipo: "Outras",
    titulo: "Colaboração com Pesquisadores",
    pergunta: "Você estabeleceu uma colaboração com pesquisadores para otimizar o manejo.",
    opcoes: [
      { id: 1, texto: "Implementar as sugestões científicas no manejo." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e remova 1 erro do contador.",
    desvantagem: "",
    dica: ""
  },

  // Carta 26: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Métodos de Inventário",
    pergunta: "Qual método é mais adequado para estimar a densidade de árvores em uma plantação irregular?",
    opcoes: [
      { id: 1, texto: "Amostragem por quadrantes fixos" },
      { id: 2, texto: "Amostragem por pontos aleatórios" },
      { id: 3, texto: "Amostragem sistemática" },
      { id: 4, texto: "Amostragem em transecto" },
      { id: 5, texto: "Amostragem de parcelas permanentes" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Carvalho, D. (2021). Métodos de Inventário Florestal.",
      "2. Santos, E. (2020). Técnicas de Amostragem."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "A amostragem aleatória minimiza vieses em distribuições irregulares."
  },

  // Carta 27: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Plano de Manejo",
    pergunta: "Você desenvolveu e implementou um plano de manejo detalhado para sua plantação.",
    opcoes: [
      { id: 1, texto: "Seguir o plano para maximizar a produtividade e sustentabilidade. Ganhe 4 moedas e 2 estrelas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 28: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Danos Causados por Animais",
    pergunta: "Animais silvestres estão danificando suas mudas.",
    opcoes: [
      { id: 1, texto: "Implementar barreiras físicas ou repelentes." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 estrela e 2 moedas.",
    dica: "Barreiras físicas podem proteger as mudas contra danos."
  },

  // Carta 29: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Seleção Natural em Plantadas",
    pergunta: "Como a seleção natural pode influenciar o manejo de plantadas?",
    opcoes: [
      { id: 1, texto: "Eliminando espécies desejadas" },
      { id: 2, texto: "Promovendo o crescimento uniforme" },
      { id: 3, texto: "Adaptando as espécies às condições locais" },
      { id: 4, texto: "Reduzindo a diversidade genética" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, J. (2020). Seleção Natural em Florestas.",
      "2. Pereira, L. (2019). Adaptabilidade das Espécies."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A adaptação às condições locais melhora a resiliência das plantadas."
  },

  // Carta 30: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Sistemas Agroflorestais",
    pergunta: "Você integrou sistemas agroflorestais em sua plantação.",
    opcoes: [
      { id: 1, texto: "Combinar produção agrícola com manejo florestal. Ganhe 3 estrelas e 4 moedas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e 4 moedas.",
    desvantagem: "",
    dica: "Sistemas agroflorestais promovem sustentabilidade e diversificação."
  },

  // Carta 31: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Análise de Crescimento",
    pergunta: "Qual parâmetro é essencial para realizar uma análise de crescimento alométrico em uma plantação?",
    opcoes: [
      { id: 1, texto: "Número de folhagens" },
      { id: 2, texto: "Diâmetro à altura do peito (DAP)" },
      { id: 3, texto: "Cor da casca" },
      { id: 4, texto: "Forma da copa" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Dendrometria Aplicada.",
      "2. Almeida, S. (2020). Crescimento Florestal."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O DAP é fundamental para estimar volume e biomassa."
  },

  // Carta 32: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Problemas de Irrigação",
    pergunta: "Sua plantação enfrenta problemas de irrigação inadequada.",
    opcoes: [
      { id: 1, texto: "Reavaliar e ajustar o sistema de irrigação." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 1 moeda.",
    dica: "Irrigação adequada é crucial para o crescimento das plantas."
  },

  // Carta 33: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Modelagem de Crescimento",
    pergunta: "Qual modelo é amplamente utilizado para prever o crescimento futuro das árvores em plantadas?",
    opcoes: [
      { id: 1, texto: "Modelo de Crescimento Logístico" },
      { id: 2, texto: "Modelo de Crescimento Exponencial" },
      { id: 3, texto: "Modelo de Crescimento de Schumacher-Hall" },
      { id: 4, texto: "Modelo de Crescimento de Gompertz" },
      { id: 5, texto: "Modelo de Crescimento de Michaelis-Menten" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Modelos de Crescimento Florestal.",
      "2. Mendes, A. (2019). Previsão de Crescimento de Árvores."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "O modelo de Schumacher-Hall relaciona crescimento radial com tempo."
  },

  // Carta 34: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Melhoria da Qualidade do Solo",
    pergunta: "Você implementou práticas para melhorar a qualidade do solo em sua plantação.",
    opcoes: [
      { id: 1, texto: "Aplicar cobertura morta e rotação de culturas. Ganhe 2 estrelas e 3 moedas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e 3 moedas.",
    desvantagem: "",
    dica: "Práticas de conservação do solo aumentam a produtividade."
  },

  // Carta 35: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Densidade de Plantio",
    pergunta: "Qual é o efeito principal de uma alta densidade de plantio em uma plantação florestal?",
    opcoes: [
      { id: 1, texto: "Aumento da competição por recursos" },
      { id: 2, texto: "Redução da biodiversidade" },
      { id: 3, texto: "Crescimento mais rápido das árvores" },
      { id: 4, texto: "Melhoria da qualidade do solo" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Planejamento de Plantadas.",
      "2. Pereira, B. (2019). Silvicultura Comercial."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Alta densidade pode levar a maior competição por luz e nutrientes."
  },

  // Carta 36: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falha na Fertilização",
    pergunta: "A fertilização inadequada resultou em crescimento deficiente das árvores.",
    opcoes: [
      { id: 1, texto: "Reavaliar o plano de fertilização e corrigir deficiências." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 estrela e 2 moedas.",
    dica: "Fertilização correta é essencial para o crescimento saudável das árvores."
  },

  // Carta 37: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Aproveitamento de Resíduos",
    pergunta: "Qual a principal vantagem do aproveitamento de resíduos de poda em plantadas?",
    opcoes: [
      { id: 1, texto: "Reduz o custo de mão de obra" },
      { id: 2, texto: "Melhora a saúde das árvores" },
      { id: 3, texto: "Aumenta a biodiversidade" },
      { id: 4, texto: "Contribui para a sustentabilidade do manejo" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, M. (2020). Manejo Sustentável de Resíduos.",
      "2. Mendes, A. (2019). Práticas Sustentáveis em Silvicultura."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O reaproveitamento de resíduos promove sustentabilidade."
  },

  // Carta 38: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Drones para Monitoramento",
    pergunta: "Você implementou o uso de drones para monitorar sua plantação.",
    opcoes: [
      { id: 1, texto: "Coletar dados precisos e em tempo real. Ganhe 3 moedas e avance 2 casas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: "Drones facilitam o monitoramento eficiente das plantadas."
  },

  // Carta 39: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Métodos de Estimativa de Biomassa",
    pergunta: "Qual método é mais adequado para estimar a biomassa aérea de uma plantação homogênea?",
    opcoes: [
      { id: 1, texto: "Método de Correnteza" },
      { id: 2, texto: "Modelagem Alométrica" },
      { id: 3, texto: "Análise de Crescimento" },
      { id: 4, texto: "Medição Direta da Biomassa" },
      { id: 5, texto: "Uso de Satélites" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Fernandes, H. (2021). Biomassa Florestal.",
      "2. Costa, S. (2020). Estimativa de Biomassa."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "Modelagem alométrica relaciona características mensuráveis com biomassa."
  },

  // Carta 40: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Problemas de Irrigação",
    pergunta: "Sua plantação enfrenta problemas de irrigação inadequada.",
    opcoes: [
      { id: 1, texto: "Reavaliar e ajustar o sistema de irrigação." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 1 contador de progresso.",
    dica: "Irrigação correta é vital para o crescimento saudável das plantas."
  },

  // Carta 41: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Monocultura",
    pergunta: "Qual é uma desvantagem principal da monocultura em plantadas?",
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Redução da resistência a pragas" },
      { id: 3, texto: "Facilidade de manejo" },
      { id: 4, texto: "Maior eficiência de produção" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Diversidade em Plantadas.",
      "2. Pereira, B. (2019). Vantagens e Desvantagens da Monocultura."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Monoculturas são mais suscetíveis a pragas e doenças específicas."
  },

  // Carta 42: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Fertilizantes Orgânicos",
    pergunta: "Você começou a usar fertilizantes orgânicos em sua plantação.",
    opcoes: [
      { id: 1, texto: "Melhorar a saúde do solo e promover crescimento sustentável. Ganhe 3 moedas e 1 estrela." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Fertilizantes orgânicos melhoram a estrutura do solo."
  },

  // Carta 43: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Densidade de Plantio Ideal",
    pergunta: "Qual fator é crucial para determinar a densidade de plantio ideal em uma plantação?",
    opcoes: [
      { id: 1, texto: "Cor das folhas das árvores" },
      { id: 2, texto: "Objetivo do manejo" },
      { id: 3, texto: "Tempo de colheita" },
      { id: 4, texto: "Disponibilidade de mão de obra" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Planejamento de Plantadas.",
      "2. Almeida, S. (2020). Silvicultura Comercial."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A densidade deve alinhar-se com os objetivos de produção e sustentabilidade."
  },

  // Carta 44: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Erosão do Solo",
    pergunta: "A erosão do solo está afetando a produtividade de sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de controle de erosão." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 2 moedas.",
    dica: "Controle de erosão é essencial para a saúde do solo."
  },

  // Carta 45: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Sistemas de Irrigação",
    pergunta: "Você implementou sistemas de irrigação eficientes em sua plantação.",
    opcoes: [
      { id: 1, texto: "Garantir uma distribuição uniforme de água. Ganhe 3 moedas e avance 2 casas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: "Irrigação eficiente promove crescimento uniforme das plantas."
  },

  // Carta 46: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Índice de Shannon-Wiener",
    pergunta: "O Índice de Shannon-Wiener é utilizado para medir:",
    opcoes: [
      { id: 1, texto: "Diversidade de espécies" },
      { id: 2, texto: "Taxa de crescimento das árvores" },
      { id: 3, texto: "Volume de madeira" },
      { id: 4, texto: "Densidade de plantio" },
      { id: 5, texto: "Qualidade do solo" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, M. (2020). Diversidade e Complexidade de Ecossistemas.",
      "2. Mendes, A. (2019). Ecologia e Diversidade."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "O índice mede tanto a riqueza quanto a equitabilidade das espécies."
  },

  // Carta 47: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Desvio no Delineamento Experimental",
    pergunta: "Seu delineamento experimental apresentou desvios significativos.",
    opcoes: [
      { id: 1, texto: "Reformular o delineamento para corrigir os desvios." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 moedas.",
    dica: "Delineamentos precisos são essenciais para resultados confiáveis."
  },

  // Carta 48: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Silvicultura Integral",
    pergunta: "A silvicultura integral visa:",
    opcoes: [
      { id: 1, texto: "Maximizar a produção de madeira" },
      { id: 2, texto: "Integrar a produção florestal com a conservação ambiental" },
      { id: 3, texto: "Aumentar a densidade de plantio" },
      { id: 4, texto: "Eliminar espécies concorrentes" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Silvicultura Sustentável.",
      "2. Pereira, B. (2019). Conservação e Manejo."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A silvicultura integral combina produção e conservação."
  },

  // Carta 49: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Planejamento de Manejo Adaptativo",
    pergunta: "Você adotou um planejamento de manejo adaptativo em sua plantação.",
    opcoes: [
      { id: 1, texto: "Ajustar o manejo conforme as condições observadas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "O manejo adaptativo permite respostas flexíveis a mudanças."
  },

  // Carta 50: Outras
  {
    tipo: "Outras",
    titulo: "Parceria com Instituição de Pesquisa",
    pergunta: "Você estabeleceu uma parceria com uma instituição de pesquisa para melhorar o manejo.",
    opcoes: [
      { id: 1, texto: "Aplicar as inovações científicas no manejo." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e remova 1 erro do contador.",
    desvantagem: "",
    dica: ""
  },

  // Carta 51: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Índice de Basal",
    pergunta: "O que representa o índice basal em uma plantação florestal?",
    opcoes: [
      { id: 1, texto: "A altura média das árvores" },
      { id: 2, texto: "A área da copa das árvores" },
      { id: 3, texto: "A soma das áreas basais de todas as árvores por hectare" },
      { id: 4, texto: "A densidade de plantio" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Rodrigues, V. (2018). Biomassa e Índices Florestais.",
      "2. Barros, T. (2019). Métodos de Inventário."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O índice basal é crucial para estimativas de volume."
  },

  // Carta 52: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Tecnologias Sustentáveis",
    pergunta: "Você adotou tecnologias sustentáveis para o manejo da plantação.",
    opcoes: [
      { id: 1, texto: "Utilizar ferramentas de baixo impacto ambiental." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: "Tecnologias sustentáveis promovem a conservação."
  },

  // Carta 53: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Infestação de Fungos",
    pergunta: "Fungos patogênicos estão afetando a saúde das árvores.",
    opcoes: [
      { id: 1, texto: "Aplicar fungicidas e remover árvores infectadas." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 2 moedas.",
    dica: "Fungos podem comprometer seriamente a plantação."
  },

  // Carta 54: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Equação de Volume",
    pergunta: "Qual dos seguintes parâmetros não é necessário para calcular o volume de uma árvore usando a equação de volume?",
    opcoes: [
      { id: 1, texto: "Diâmetro à altura do peito (DAP)" },
      { id: 2, texto: "Altura total da árvore" },
      { id: 3, texto: "Área da copa" },
      { id: 4, texto: "Forma da árvore" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Modelos de Volume Florestal.",
      "2. Almeida, S. (2020). Dendrometria Aplicada."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A área da copa não é necessária para a maioria das equações de volume."
  },

  // Carta 55: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Planejamento de Corte Seletivo",
    pergunta: "Você implementou um plano de corte seletivo para otimizar a produção.",
    opcoes: [
      { id: 1, texto: "Selecionar árvores maduras para colheita, promovendo a regeneração natural." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: "Corte seletivo mantém a estrutura e biodiversidade da plantação."
  },

  // Carta 56: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Excesso de Poda",
    pergunta: "Poda excessiva está afetando o crescimento das árvores.",
    opcoes: [
      { id: 1, texto: "Reavaliar e ajustar as técnicas de poda." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 estrela e 2 moedas.",
    dica: "Poda deve ser balanceada para promover a saúde das árvores."
  },

  // Carta 57: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Ajuste de Equações Alométricas",
    pergunta: "Quando é necessário ajustar uma equação alométrica para uma plantação específica?",
    opcoes: [
      { id: 1, texto: "Quando há variação significativa nas espécies plantadas" },
      { id: 2, texto: "Sempre que a plantação muda de localização" },
      { id: 3, texto: "Somente para plantadas de eucalipto" },
      { id: 4, texto: "Quando a densidade de plantio é alta" },
      { id: 5, texto: "Nunca, uma equação geral é suficiente" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Equações Alométricas Avançadas.",
      "2. Mendes, A. (2019). Modelagem de Crescimento."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "A diversidade de espécies pode exigir ajustes específicos nas equações."
  },

  // Carta 58: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Agroindústria",
    pergunta: "Você iniciou uma agroindústria para valorizar os produtos de sua plantação.",
    opcoes: [
      { id: 1, texto: "Processar e vender produtos de forma mais lucrativa." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Agroindústrias agregam valor e aumentam a rentabilidade."
  },

  // Carta 59: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Ciclo de Reposição",
    pergunta: "O que é ciclo de reposição em plantadas florestais?",
    opcoes: [
      { id: 1, texto: "Plantio contínuo sem interrupções" },
      { id: 2, texto: "Substituição das árvores colhidas por novas mudas" },
      { id: 3, texto: "Aumento da densidade de plantio ao longo do tempo" },
      { id: 4, texto: "Redução do número de espécies plantadas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Barros, S. (2018). Planejamento de Reposição.",
      "2. Costa, L. (2019). Silvicultura Sustentável."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Ciclo de reposição garante a continuidade da plantação."
  },

  // Carta 60: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Insuficiência de Nutrientes",
    pergunta: "A plantação está apresentando sinais de deficiência de nutrientes.",
    opcoes: [
      { id: 1, texto: "Aplicar fertilizantes balanceados." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 1 moeda.",
    dica: "Fertilização adequada é essencial para a saúde das plantas."
  },

  // Carta 61: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Análise de Variância (ANOVA)",
    pergunta: "Em um delineamento de parcelas ao acaso, a ANOVA é utilizada para:",
    opcoes: [
      { id: 1, texto: "Determinar a média de cada tratamento" },
      { id: 2, texto: "Comparar as médias entre os tratamentos" },
      { id: 3, texto: "Identificar a variabilidade dentro de cada tratamento" },
      { id: 4, texto: "Todas as anteriores" },
      { id: 5, texto: "Nenhuma das anteriores" }
    ],
    respostaCorreta: 4,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Estatística em Silvicultura.",
      "2. Almeida, S. (2020). Métodos Estatísticos em Manejo Florestal."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "ANOVA ajuda a entender se há diferenças significativas entre os tratamentos."
  },

  // Carta 62: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Técnicas de Irrigação Eficiente",
    pergunta: "Você adotou técnicas de irrigação eficiente em sua plantação.",
    opcoes: [
      { id: 1, texto: "Melhorar a utilização da água e promover o crescimento saudável." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: "Irrigação eficiente reduz desperdício e promove crescimento uniforme."
  },

  // Carta 63: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Impacto de Eventos Climáticos Extremos",
    pergunta: "Um evento climático extremo afetou sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de recuperação rápida." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 moedas.",
    dica: "Eventos climáticos extremos podem causar danos significativos."
  },

  // Carta 64: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Crescimento Anual Incremental",
    pergunta: "O crescimento anual incremental é definido como:",
    opcoes: [
      { id: 1, texto: "Aumento total de volume durante a vida da árvore" },
      { id: 2, texto: "Aumento de altura em um ano" },
      { id: 3, texto: "Aumento de diâmetro à altura do peito em um ano" },
      { id: 4, texto: "Aumento da área foliar em um ano" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Crescimento de Árvores.",
      "2. Mendes, A. (2019). Dendrometria."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O crescimento incremental reflete o aumento no diâmetro."
  },

  // Carta 65: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Sistemas de Cobertura",
    pergunta: "Você implementou sistemas de cobertura no solo em sua plantação.",
    opcoes: [
      { id: 1, texto: "Reduzir a erosão e manter a umidade do solo." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: "Cobertura adequada protege o solo contra erosão e desidratação."
  },

  // Carta 66: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Contaminação do Solo",
    pergunta: "Produtos químicos usados no manejo contaminaram o solo.",
    opcoes: [
      { id: 1, texto: "Realizar remediação do solo imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "A contaminação do solo pode afetar a saúde das plantas."
  },

  // Carta 67: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Densidade de Plantio Otimizada",
    pergunta: "Qual fator não deve ser considerado ao determinar a densidade de plantio otimizada?",
    opcoes: [
      { id: 1, texto: "Espécie das árvores" },
      { id: 2, texto: "Objetivos do manejo" },
      { id: 3, texto: "Disponibilidade de recursos hídricos" },
      { id: 4, texto: "Altura média das árvores" },
      { id: 5, texto: "Cor das flores das árvores" }
    ],
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Planejamento de Plantadas.",
      "2. Almeida, S. (2020). Silvicultura."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "A cor das flores não influencia a densidade de plantio."
  },

  // Carta 68: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Monitoramento Ambiental",
    pergunta: "Você implementou um sistema de monitoramento ambiental contínuo.",
    opcoes: [
      { id: 1, texto: "Detectar precocemente problemas ambientais e agir rapidamente." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Monitoramento eficaz previne danos maiores."
  },

  // Carta 69: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Declínio da Saúde das Árvores",
    pergunta: "A saúde das árvores em sua plantação está declinando.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de recuperação e manejo adequado." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 moedas.",
    dica: "Manutenção adequada é crucial para a saúde das plantas."
  },

  // Carta 70: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Crescimento em Plantadas",
    pergunta: "Qual fator tem maior influência no crescimento das árvores em plantadas?",
    opcoes: [
      { id: 1, texto: "Cor das folhas" },
      { id: 2, texto: "Disponibilidade de luz" },
      { id: 3, texto: "Tipo de solo" },
      { id: 4, texto: "Altura das árvores vizinhas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Fatores de Crescimento em Plantadas.",
      "2. Pereira, B. (2019). Silvicultura."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A luz é essencial para a fotossíntese e crescimento."
  },

  // Carta 71: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Biofertilizantes",
    pergunta: "Você começou a usar biofertilizantes em sua plantação.",
    opcoes: [
      { id: 1, texto: "Promover a saúde do solo e o crescimento das plantas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Biofertilizantes são mais sustentáveis e melhoram a qualidade do solo."
  },

  // Carta 72: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Problemas de Compactação do Solo",
    pergunta: "A compactação do solo está prejudicando o desenvolvimento das raízes.",
    opcoes: [
      { id: 1, texto: "Implementar práticas de manejo para aliviar a compactação." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 1 contador de progresso.",
    dica: "Solos compactados dificultam o crescimento das raízes."
  },

  // Carta 73: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Densidade de DAP",
    pergunta: "Como a densidade de DAP (Diâmetro à Altura do Peito) influencia o manejo de plantadas?",
    opcoes: [
      { id: 1, texto: "Indica a quantidade de folhas por árvore" },
      { id: 2, texto: "Reflete o potencial de crescimento em volume" },
      { id: 3, texto: "Determina a altura máxima das árvores" },
      { id: 4, texto: "Não tem impacto significativo" },
      { id: 5, texto: "Afeta a cor das folhas" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Crescimento e DAP em Silvicultura.",
      "2. Mendes, A. (2019). Dendrometria Aplicada."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "DAP é um indicador chave para estimar o volume e o crescimento das árvores."
  },

  // Carta 74: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Práticas de Agroecologia",
    pergunta: "Você adotou práticas de agroecologia em sua plantação.",
    opcoes: [
      { id: 1, texto: "Promover a sustentabilidade e diversificação do manejo." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Práticas agroecológicas promovem a saúde do ecossistema."
  },

  // Carta 75: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falta de Recursos Hídricos",
    pergunta: "Sua plantação está enfrentando escassez de recursos hídricos.",
    opcoes: [
      { id: 1, texto: "Implementar sistemas de captação e uso eficiente da água." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 moedas.",
    dica: "Gerenciamento eficiente da água é crucial para a sustentabilidade."
  },

  // Carta 76: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Clorofila e Crescimento",
    pergunta: "Qual a relação entre a clorofila e o crescimento das plantas?",
    opcoes: [
      { id: 1, texto: "Clorofila impede a fotossíntese" },
      { id: 2, texto: "Clorofila é responsável pela fotossíntese, essencial para o crescimento" },
      { id: 3, texto: "Clorofila aumenta a resistência a pragas" },
      { id: 4, texto: "Clorofila diminui a necessidade de água" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, J. (2020). Fisiologia das Plantas.",
      "2. Pereira, L. (2019). Fotossíntese e Crescimento."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A clorofila é essencial para a produção de energia nas plantas."
  },

  // Carta 77: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Barreiras Físicas",
    pergunta: "Você instalou barreiras físicas para proteger sua plantação contra animais.",
    opcoes: [
      { id: 1, texto: "Reduzir danos causados por animais silvestres." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: "Barreiras físicas são eficazes para proteger as mudas."
  },

  // Carta 78: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Mudas por Seca",
    pergunta: "A seca prolongada resultou na perda de mudas em sua plantação.",
    opcoes: [
      { id: 1, texto: "Replantar as mudas e implementar sistemas de irrigação." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 2 moedas.",
    dica: "Sistemas de irrigação ajudam a mitigar os efeitos da seca."
  },

  // Carta 79: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Modelagem de Distribuição Espacial",
    pergunta: "Qual técnica é usada para modelar a distribuição espacial das árvores em uma plantação?",
    opcoes: [
      { id: 1, texto: "Regressão Linear" },
      { id: 2, texto: "Geostatística" },
      { id: 3, texto: "Análise de Componentes Principais (PCA)" },
      { id: 4, texto: "Clusterização Hierárquica" },
      { id: 5, texto: "Redes Neurais" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Geostatística em Florestas.",
      "2. Mendes, A. (2019). Técnicas de Modelagem Espacial."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "Geostatística é fundamental para análise espacial."
  },

  // Carta 80: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Técnicas de Agrofloresta",
    pergunta: "Você integrou técnicas de agrofloresta em sua plantação.",
    opcoes: [
      { id: 1, texto: "Combinar culturas agrícolas com plantação florestal para diversificação." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Agroflorestas promovem sustentabilidade e múltiplas fontes de renda."
  },

  // Carta 81: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falha na Irrigação",
    pergunta: "Seu sistema de irrigação falhou durante uma estação crítica.",
    opcoes: [
      { id: 1, texto: "Reparar o sistema e implementar backup." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 moedas.",
    dica: "Sistemas de backup garantem irrigação contínua."
  },

  // Carta 82: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Crescimento Vertical",
    pergunta: "O que caracteriza o crescimento vertical das árvores em plantadas?",
    opcoes: [
      { id: 1, texto: "Aumento da copa" },
      { id: 2, texto: "Aumento da altura" },
      { id: 3, texto: "Aumento do diâmetro" },
      { id: 4, texto: "Crescimento das raízes" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Fisiologia das Plantas.",
      "2. Pereira, B. (2019). Crescimento das Árvores."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Crescimento vertical refere-se ao aumento da altura das árvores."
  },

  // Carta 83: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Técnicas de Silvicultura",
    pergunta: "Você adotou técnicas avançadas de silvicultura em sua plantação.",
    opcoes: [
      { id: 1, texto: "Aumentar a produtividade e sustentabilidade do manejo." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: "Silvicultura avançada melhora a eficiência do manejo."
  },

  // Carta 84: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Desconformidade com Regulamentos",
    pergunta: "Sua plantação não está em conformidade com os regulamentos ambientais.",
    opcoes: [
      { id: 1, texto: "Regularizar a situação e pagar multas." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 4 estrelas e 3 moedas.",
    dica: "Conformidade regulatória evita penalidades legais."
  },

  // Carta 85: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Aquecimento Global e Manejo de Plantadas",
    pergunta: "Como o aquecimento global pode afetar o manejo de plantadas florestais?",
    opcoes: [
      { id: 1, texto: "Aumentando a incidência de pragas e doenças" },
      { id: 2, texto: "Alterando os padrões de precipitação" },
      { id: 3, texto: "Promovendo o estresse hídrico nas árvores" },
      { id: 4, texto: "Todas as anteriores" },
      { id: 5, texto: "Nenhuma das anteriores" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Impactos do Clima em Plantadas.",
      "2. Mendes, A. (2019). Manejo em Climas Variáveis."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O clima afeta diretamente a saúde e produtividade das plantadas."
  },

  // Carta 86: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Práticas de Bioeconomia",
    pergunta: "Você iniciou práticas de bioeconomia em sua plantação.",
    opcoes: [
      { id: 1, texto: "Utilizar recursos renováveis para gerar produtos de valor agregado." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Bioeconomia promove a sustentabilidade econômica e ambiental."
  },

  // Carta 87: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falta de Mão de Obra Qualificada",
    pergunta: "Sua plantação está enfrentando falta de mão de obra qualificada.",
    opcoes: [
      { id: 1, texto: "Investir em treinamento e capacitação da equipe." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 2 moedas.",
    dica: "Capacitação é essencial para um manejo eficiente."
  },

  // Carta 88: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Métodos de Inventário",
    pergunta: "Qual método é mais adequado para estimar o crescimento anual de uma plantação homogênea?",
    opcoes: [
      { id: 1, texto: "Método de Transecto" },
      { id: 2, texto: "Método de Pontos Aleatórios" },
      { id: 3, texto: "Método de Parcelas Permanentes" },
      { id: 4, texto: "Método de Quadrat" },
      { id: 5, texto: "Método de População Total" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Métodos de Inventário.",
      "2. Almeida, S. (2020). Crescimento e Biomassa."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Parcelas permanentes permitem acompanhamento contínuo do crescimento."
  },

  // Carta 89: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Sistemas de Energia Renovável",
    pergunta: "Você instalou sistemas de energia renovável na plantação.",
    opcoes: [
      { id: 1, texto: "Reduzir custos operacionais e promover sustentabilidade." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 5 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Energia renovável reduz a dependência de fontes não sustentáveis."
  },

  // Carta 90: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falta de Recursos Hídricos",
    pergunta: "Sua plantação está enfrentando escassez de recursos hídricos.",
    opcoes: [
      { id: 1, texto: "Implementar sistemas de captação e uso eficiente da água." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 moedas.",
    dica: "Gerenciamento eficiente da água é crucial para a sustentabilidade."
  },

  // Carta 91: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Biomassa de Raízes",
    pergunta: "Qual é a importância da biomassa de raízes em uma plantação florestal?",
    opcoes: [
      { id: 1, texto: "Melhorar a resistência das árvores a ventos fortes" },
      { id: 2, texto: "Aumentar a fotossíntese" },
      { id: 3, texto: "Promover a absorção de nutrientes e estabilização do solo" },
      { id: 4, texto: "Reduzir a incidência de pragas" },
      { id: 5, texto: "Facilitar a propagação de espécies exóticas" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Funções das Raízes em Florestas.",
      "2. Mendes, A. (2019). Ecologia das Raízes."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "Raízes saudáveis são essenciais para a absorção de nutrientes."
  },

  // Carta 92: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Manejo Integrado de Pragas",
    pergunta: "Você adotou o manejo integrado de pragas em sua plantação.",
    opcoes: [
      { id: 1, texto: "Reduzir a dependência de pesticidas químicos e controlar pragas de forma sustentável." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "MIP promove a saúde das plantas e do ecossistema."
  },

  // Carta 93: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Equação de Espessura de Tronco",
    pergunta: "Qual é a equação de espessura de tronco (d) utilizada na dendrometria para árvores com formato cilíndrico?",
    opcoes: [
      { id: 1, texto: "d = (4V) / (πh)" },
      { id: 2, texto: "d = √(V / (πh))" },
      { id: 3, texto: "d = (V / h)^(1/3)" },
      { id: 4, texto: "d = 2V / (πh)" },
      { id: 5, texto: "d = (V * π) / (4h)" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Fernandes, H. (2021). Dendrometria Avançada.",
      "2. Costa, S. (2020). Técnicas de Inventário Florestal."
    ],
    vantagem: "Ganhe 1 contador de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A equação relaciona volume, altura e diâmetro."
  },

  // Carta 94: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Delineamento Fatorial",
    pergunta: "Você adotou um delineamento fatorial em seus experimentos de manejo de plantadas.",
    opcoes: [
      { id: 1, texto: "Utilizar o delineamento para analisar efeitos de múltiplos fatores." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 2 casas.",
    desvantagem: "",
    dica: "Delinamentos fatoriais permitem estudar interações entre fatores."
  },

  // Carta 95: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falha na Estimativa de Biomassa",
    pergunta: "Houve uma falha na estimativa da biomassa de sua plantação.",
    opcoes: [
      { id: 1, texto: "Recalcular a biomassa utilizando métodos alternativos." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 4 moedas.",
    dica: "Métodos precisos são essenciais para manejo sustentável."
  },

  // Carta 96: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Método de Quatro Paredes",
    pergunta: "O que é o método de quatro paredes na amostragem florestal?",
    opcoes: [
      { id: 1, texto: "Dividir a área em quatro quadrantes iguais." },
      { id: 2, texto: "Utilizar quatro amostras em cada parcela." },
      { id: 3, texto: "Estabelecer quatro pontos de amostragem ao longo de uma linha." },
      { id: 4, texto: "Aplicar quatro diferentes métodos de amostragem simultaneamente." }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Técnicas de Amostragem Florestal.",
      "2. Mendes, A. (2019). Métodos de Inventário."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O método envolve pontos distribuídos ao longo de uma transecta."
  },

  // Carta 97: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Análise de Variância (ANOVA)",
    pergunta: "Você aplicou ANOVA para analisar os dados do seu inventário.",
    opcoes: [
      { id: 1, texto: "Utilizar ANOVA para determinar diferenças significativas entre grupos." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "ANOVA ajuda a comparar médias de múltiplos grupos."
  },

  // Carta 98: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Erro no Delineamento Experimental",
    pergunta: "Você cometeu um erro no delineamento experimental de seu estudo.",
    opcoes: [
      { id: 1, texto: "Reestruturar o delineamento para corrigir os erros." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 contador de progresso e 2 estrelas.",
    dica: "Delinamentos precisos são cruciais para resultados confiáveis."
  },

  // Carta 99: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Amostragem Sistemática",
    pergunta: "Qual é a principal característica da amostragem sistemática em plantações?",
    opcoes: [
      { id: 1, texto: "Selecionar amostras aleatoriamente" },
      { id: 2, texto: "Amostras são escolhidas a intervalos fixos" },
      { id: 3, texto: "Cada amostra tem a mesma probabilidade de ser escolhida" },
      { id: 4, texto: "Amostragem baseada em clusters" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2019). Técnicas de Amostragem.",
      "2. Almeida, S. (2020). Métodos de Inventário Florestal."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Amostras são coletadas a intervalos regulares."
  },

  // Carta 100: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Software de Inventário",
    pergunta: "Você começou a utilizar um software especializado para análise de inventário florestal.",
    opcoes: [
      { id: 1, texto: "Automatizar cálculos e melhorar a precisão dos dados." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Softwares facilitam a análise e gestão de dados."
  },

  // Carta 101: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Fator de Correção",
    pergunta: "O que é um fator de correção na estimativa de volume florestal?",
    opcoes: [
      { id: 1, texto: "Uma constante usada para ajustar medições de diâmetro" },
      { id: 2, texto: "Um método para corrigir erros de medição" },
      { id: 3, texto: "Uma técnica para aumentar a precisão das fórmulas de volume" },
      { id: 4, texto: "Uma variável utilizada em modelos de crescimento" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Dendrometria Avançada.",
      "2. Pereira, B. (2019). Técnicas de Inventário."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Fatores de correção melhoram a precisão das estimativas."
  },

  // Carta 102: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Amostragem Aleatória",
    pergunta: "Você adotou a amostragem aleatória em seu inventário florestal.",
    opcoes: [
      { id: 1, texto: "Aumentar a representatividade das amostras." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 2 casas.",
    desvantagem: "",
    dica: "Amostragem aleatória reduz vieses na seleção de amostras."
  },

  // Carta 103: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Dados",
    pergunta: "Você perdeu parte dos dados coletados no inventário.",
    opcoes: [
      { id: 1, texto: "Recolher os dados faltantes novamente." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 contador de progresso e 2 estrelas.",
    dica: "A integridade dos dados é essencial para análises precisas."
  },

  // Carta 104: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Modelagem de Crescimento",
    pergunta: "Qual modelo é frequentemente utilizado para prever o crescimento de árvores em plantações?",
    opcoes: [
      { id: 1, texto: "Modelo Exponencial" },
      { id: 2, texto: "Modelo Logístico" },
      { id: 3, texto: "Modelo de Gompertz" },
      { id: 4, texto: "Modelo de Croston" },
      { id: 5, texto: "Modelo de Weibull" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Modelos de Crescimento Florestal.",
      "2. Mendes, A. (2019). Previsão de Crescimento em Plantadas."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O modelo de Gompertz é usado para crescimento limitado."
  },

  // Carta 105: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Capacitação em Dendrometria",
    pergunta: "Sua equipe participou de um curso avançado de dendrometria.",
    opcoes: [
      { id: 1, texto: "Aplicar técnicas aprimoradas no inventário." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Técnicas aprimoradas melhoram a precisão das medições."
  },

  // Carta 106: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Dificuldade na Acesso aos Dados",
    pergunta: "Você encontrou dificuldades no acesso aos dados de sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar um sistema de backup de dados." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 moedas e 1 estrela.",
    dica: "Sistemas de backup evitam perda de dados importantes."
  },

  // Carta 107: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Fator de Conversão",
    pergunta: "Qual é a finalidade do fator de conversão na estimativa de volume florestal?",
    opcoes: [
      { id: 1, texto: "Aumentar a velocidade das medições" },
      { id: 2, texto: "Converter diâmetro em diâmetro na altura do peito" },
      { id: 3, texto: "Ajustar o volume calculado para condições específicas" },
      { id: 4, texto: "Simplificar a equação de volume" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Dendrometria Avançada.",
      "2. Pereira, B. (2019). Técnicas de Inventário."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Fatores de conversão ajustam o volume para condições reais."
  },

  // Carta 108: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Utilização de GPS",
    pergunta: "Você começou a utilizar GPS para a localização de parcelas em sua plantação.",
    opcoes: [
      { id: 1, texto: "Melhorar a precisão na localização das parcelas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 2 casas.",
    desvantagem: "",
    dica: "GPS aumenta a precisão na delimitação das áreas amostradas."
  },

  // Carta 109: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Incêndio na Plantação",
    pergunta: "Um incêndio atingiu parte da sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de recuperação e prevenção." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 5 moedas.",
    dica: "Incêndios podem causar perdas significativas na plantação."
  },

  // Carta 110: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Método de Acurácia",
    pergunta: "Qual método é utilizado para avaliar a acurácia das estimativas de volume em inventários florestais?",
    opcoes: [
      { id: 1, texto: "Análise de regressão" },
      { id: 2, texto: "Coeficiente de variação" },
      { id: 3, texto: "Erro padrão" },
      { id: 4, texto: "Desvio padrão" },
      { id: 5, texto: "Todas as anteriores" }
    ],
    respostaCorreta: 5,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Técnicas de Amostragem.",
      "2. Mendes, A. (2019). Métodos de Inventário Florestal."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A acurácia pode ser avaliada por diferentes métricas estatísticas."
  },

  // Carta 111: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Parceria com Instituição de Pesquisa",
    pergunta: "Você firmou uma parceria com uma instituição de pesquisa para melhorar o manejo da plantação.",
    opcoes: [
      { id: 1, texto: "Aplicar técnicas avançadas de manejo e monitoramento." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Parcerias podem trazer conhecimento e recursos adicionais."
  },

  // Carta 112: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Contaminação do Solo",
    pergunta: "O solo da sua plantação foi contaminado por substâncias químicas.",
    opcoes: [
      { id: 1, texto: "Realizar remediação do solo imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "A contaminação do solo afeta a saúde das plantas e a produtividade."
  },

  // Carta 113: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Sistema de Gestão Florestal",
    pergunta: "Qual é a principal função de um sistema de gestão florestal em plantações?",
    opcoes: [
      { id: 1, texto: "Aumentar a produção de madeira a qualquer custo" },
      { id: 2, texto: "Garantir práticas sustentáveis e monitoramento contínuo" },
      { id: 3, texto: "Reduzir os custos operacionais" },
      { id: 4, texto: "Facilitar a venda de produtos florestais" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Gestão Florestal Sustentável.",
      "2. Pereira, B. (2019). Sistemas de Gestão em Plantadas."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Sistemas de gestão sustentáveis promovem a conservação e produtividade."
  },

  // Carta 114: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Sensoriamento Remoto",
    pergunta: "Você implementou o uso de sensoriamento remoto para monitorar sua plantação.",
    opcoes: [
      { id: 1, texto: "Melhorar o monitoramento e a gestão da plantação." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Sensoriamento remoto oferece dados precisos e em tempo real."
  },

  // Carta 115: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Inundações na Plantação",
    pergunta: "Sua plantação foi afetada por inundações recorrentes.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de drenagem e proteção contra enchentes." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Inundações podem danificar a infraestrutura e as plantas."
  },

  // Carta 116: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Densidade de Plantio",
    pergunta: "Qual é a principal consequência de uma densidade de plantio muito alta?",
    opcoes: [
      { id: 1, texto: "Maior competição por luz, água e nutrientes" },
      { id: 2, texto: "Redução da biodiversidade" },
      { id: 3, texto: "Aumento da produtividade individual das árvores" },
      { id: 4, texto: "Melhoria na qualidade da madeira" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Lima, F. (2018). Manejo de Plantadas.",
      "2. Mendes, A. (2019). Densidade de Plantio e Crescimento."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Competição excessiva pode limitar o crescimento das árvores."
  },

  // Carta 117: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Agroflorestas",
    pergunta: "Você integrou práticas de agrofloresta em sua plantação.",
    opcoes: [
      { id: 1, texto: "Promover a diversidade e sustentabilidade na plantação." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Agroflorestas combinam árvores com culturas agrícolas, aumentando a biodiversidade."
  },

  // Carta 118: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Redução de Crescimento",
    pergunta: "Algumas árvores da sua plantação estão apresentando crescimento reduzido.",
    opcoes: [
      { id: 1, texto: "Investigar e corrigir possíveis causas, como pragas ou falta de nutrientes." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Crescimento reduzido pode ser sinal de problemas ambientais ou biológicos."
  },

  // Carta 119: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Índice de Área Foliar (IAF)",
    pergunta: "O que representa o Índice de Área Foliar (IAF) em uma plantação?",
    opcoes: [
      { id: 1, texto: "A quantidade de folhas por árvore" },
      { id: 2, texto: "A área total das folhas em relação à área do solo" },
      { id: 3, texto: "A densidade das folhas na copa das árvores" },
      { id: 4, texto: "O crescimento das folhas ao longo do tempo" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo de Plantadas"],
    fontes: [
      "1. Silva, A. (2020). Fisiologia Vegetal.",
      "2. Pereira, B. (2019). Ecologia de Plantadas."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "IAF é um indicador da produtividade e saúde das plantas."
  },

  // Carta 120: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Tecnologias de Irrigação",
    pergunta: "Você implementou sistemas de irrigação eficiente em sua plantação.",
    opcoes: [
      { id: 1, texto: "Melhorar a disponibilidade de água e o crescimento das plantas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Plantadas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Irrigação eficiente promove o crescimento saudável das plantas."
  }
];

export default manejoPlantadas;
