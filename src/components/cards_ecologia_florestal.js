const ecologia_forestal_cards = [
  // Carta 1: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Sucessão Primária",
    pergunta: "O que caracteriza a sucessão primária em ecossistemas florestais?",
    opcoes: [
      { id: 1, texto: "Ocorre em áreas já ocupadas por comunidades vegetais" },
      { id: 2, texto: "Inicia-se em superfícies expostas sem solo pré-existente" },
      { id: 3, texto: "Envolve apenas espécies pioneiras" },
      { id: 4, texto: "Não inclui mudanças na composição das espécies" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Begon, M., Townsend, C.R., Harper, J.L. (2006). Ecology: From Individuals to Ecosystems.",
      "2. Odum, E.P. (2004). Fundamentals of Ecology."
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Perde 1 estrela.",
    dica: "Sucessão primária começa em áreas sem solo."
  },

  // Carta 2: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Trilhas Ecologicamente Sustentáveis",
    pergunta: "Você implementou trilhas de baixo impacto em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Continuar monitorando e mantendo as trilhas para minimizar o impacto." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e 2 moedas!",
    desvantagem: "",
    dica: "Trilhas sustentáveis reduzem a degradação do solo e perturbam menos a fauna."
  },

  // Carta 3: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Introdução de Espécies Invasoras",
    pergunta: "Espécies exóticas invasoras estão se estabelecendo em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de controle biológico e químico." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Espécies invasoras podem desequilibrar ecossistemas nativos."
  },

  // Carta 4: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Ciclagem de Nutrientes",
    pergunta: "Qual é a principal função da ciclagem de nutrientes em ecossistemas florestais?",
    opcoes: [
      { id: 1, texto: "Aumentar a biodiversidade" },
      { id: 2, texto: "Regenerar o solo" },
      { id: 3, texto: "Manter a produtividade do ecossistema" },
      { id: 4, texto: "Controlar a população de herbívoros" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Chapin, F.S., Matson, P.A., Vitousek, P.M. (2011). Principles of Terrestrial Ecosystem Ecology.",
      "2. Molles, M.C. (2016). Ecology: Concepts and Applications."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A ciclagem de nutrientes garante a disponibilidade contínua de elementos essenciais."
  },

  // Carta 5: Outras
  {
    tipo: "Outras",
    titulo: "Estudo Longitudinal de Comunidades",
    pergunta: "Você iniciou um estudo longitudinal para monitorar mudanças nas comunidades florestais ao longo do tempo.",
    opcoes: [
      { id: 1, texto: "Coletar dados periódicos e analisar tendências." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 5 moedas e remova 2 erros do seu contador.",
    desvantagem: "",
    dica: "Estudos longitudinais ajudam a entender dinâmicas de longo prazo."
  },

  // Carta 6: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Modelagem de Crescimento de Árvores",
    pergunta: "Qual modelo matemático é frequentemente usado para prever o crescimento de árvores em plantações florestais?",
    opcoes: [
      { id: 1, texto: "Modelo de Gompertz" },
      { id: 2, texto: "Modelo de Logística" },
      { id: 3, texto: "Modelo Exponencial" },
      { id: 4, texto: "Modelo de Weibull" },
      { id: 5, texto: "Modelo de Moran" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Drake, J.M., Andren, J.C., Brower, R.C., Giblin, D.E., Shipley, B.D. (2008). Modeling tree growth and yield.",
      "2. Lima, F. (2018). Técnicas de Amostragem."
    ],
    vantagem: "Ganhe 1 contador de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O modelo de Gompertz é ideal para crescimento limitado."
  },

  // Carta 7: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de GIS em Ecologia Florestal",
    pergunta: "Você implementou o uso de Sistemas de Informação Geográfica (GIS) em sua pesquisa.",
    opcoes: [
      { id: 1, texto: "Utilizar GIS para análise espacial e gestão de dados." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 2 casas.",
    desvantagem: "",
    dica: "GIS facilita a visualização e análise de dados geográficos."
  },

  // Carta 8: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Biodiversidade",
    pergunta: "Há uma redução significativa na biodiversidade de sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de conservação e recuperação." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Redução de biodiversidade afeta a resiliência do ecossistema."
  },

  // Carta 9: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Sucessão Secundária",
    pergunta: "Qual das seguintes situações é um exemplo de sucessão secundária?",
    opcoes: [
      { id: 1, texto: "Colonização de uma nova ilha vulcânica" },
      { id: 2, texto: "Recuperação de uma floresta após um incêndio" },
      { id: 3, texto: "Formação de um lago a partir de uma cratera" },
      { id: 4, texto: "Desenvolvimento de um deserto em uma área anteriormente florestal" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Odum, E.P. (2004). Fundamentals of Ecology.",
      "2. Begon, M., Townsend, C.R., Harper, J.L. (2006). Ecology: From Individuals to Ecosystems."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Sucessão secundária ocorre após uma perturbação em um ecossistema existente."
  },

  // Carta 10: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Reservas Biológicas",
    pergunta: "Você estabeleceu uma reserva biológica em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Proteger a biodiversidade e monitorar espécies nativas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Reservas biológicas ajudam na conservação e pesquisa científica."
  },

  // Carta 11: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Poluição Hídrica",
    pergunta: "A poluição hídrica afetou a qualidade da água em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Implementar sistemas de tratamento e monitoramento da água." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 5 moedas.",
    dica: "Água de má qualidade afeta a flora e fauna aquáticas."
  },

  // Carta 12: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Equações de Crescimento",
    pergunta: "Qual das seguintes equações é utilizada para modelar o crescimento logístico de uma população de árvores?",
    opcoes: [
      { id: 1, texto: "N(t) = N0 * e^(rt)" },
      { id: 2, texto: "N(t) = K / (1 + ((K - N0)/N0) * e^(-rt))" },
      { id: 3, texto: "N(t) = N0 + rt" },
      { id: 4, texto: "N(t) = N0 * (1 + rt)" },
      { id: 5, texto: "N(t) = K * e^(rt)" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Gause, G.F. (1934). The Struggle for Existence.",
      "2. Gompertz, B.E. (1825). On the Nature of the Military Process."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O modelo logístico considera o limite de capacidade de suporte (K)."
  },

  // Carta 13: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Programas de Monitoramento",
    pergunta: "Você implementou programas de monitoramento contínuo em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Coletar dados regulares para avaliar a saúde do ecossistema." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Monitoramento contínuo ajuda a detectar mudanças e ameaças precocemente."
  },

  // Carta 14: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Erosão do Solo",
    pergunta: "Sua área de estudo está sofrendo erosão do solo devido a práticas inadequadas.",
    opcoes: [
      { id: 1, texto: "Implementar práticas de conservação do solo imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "A erosão do solo pode levar à perda de nutrientes e degradação do habitat."
  },

  // Carta 15: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Índice de Diversidade de Shannon",
    pergunta: "Qual é a fórmula do Índice de Diversidade de Shannon utilizada em ecologia?",
    opcoes: [
      { id: 1, texto: "H' = -Σ (p_i * ln(p_i))" },
      { id: 2, texto: "H' = Σ (p_i^2)" },
      { id: 3, texto: "H' = ln(Σ p_i)" },
      { id: 4, texto: "H' = Σ (p_i)" },
      { id: 5, texto: "H' = -Σ (p_i)" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Shannon, C.E. (1948). A Mathematical Theory of Communication.",
      "2. Magurran, A.E. (2004). Measuring Biological Diversity."
    ],
    vantagem: "Ganhe 1 contador de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O Índice de Shannon mede a diversidade considerando a riqueza e a equitatividade das espécies."
  },

  // Carta 16: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Técnicas de Remote Sensing",
    pergunta: "Você utilizou técnicas de sensoriamento remoto para monitorar a cobertura vegetal.",
    opcoes: [
      { id: 1, texto: "Melhorar a precisão e a abrangência das análises." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Sensoriamento remoto permite a coleta de dados em grandes áreas de forma eficiente."
  },

  // Carta 17: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Declínio de População de Espécies-chave",
    pergunta: "Há um declínio na população de espécies-chave em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Implementar ações de conservação específicas para essas espécies." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Espécies-chave desempenham papéis fundamentais na estrutura do ecossistema."
  },

  // Carta 18: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Métodos de Inventário",
    pergunta: "Qual dos seguintes métodos é utilizado para estimar a biomassa acima do solo em florestas?",
    opcoes: [
      { id: 1, texto: "Método de Loftus" },
      { id: 2, texto: "Método de Britt" },
      { id: 3, texto: "Método de Chimera" },
      { id: 4, texto: "Método de Hoefner" },
      { id: 5, texto: "Método de Smith" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Loftus, A. (1971). Sampling Methods for Forest Vegetation Surveys.",
      "2. Britt, C.B. (1990). Biomass Estimation Techniques."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O método de Britt é amplamente utilizado para estimar biomassa."
  },

  // Carta 19: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Monitoramento de Fauna",
    pergunta: "Você implementou um sistema de monitoramento de fauna em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Coletar dados sobre a diversidade e abundância das espécies." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Monitorar a fauna auxilia na compreensão das interações ecológicas."
  },

  // Carta 20: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Efeito de Ilhas de Calor",
    pergunta: "Sua área de estudo está sofrendo efeito de ilhas de calor devido a fragmentação florestal.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de mitigação, como reflorestamento e criação de corredores verdes." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Ilhas de calor aumentam a temperatura local e afetam o clima microambiental."
  },

  // Carta 21: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Análise de Diversidade Beta",
    pergunta: "O que mede a diversidade beta em ecologia?",
    opcoes: [
      { id: 1, texto: "Diversidade dentro de uma única comunidade" },
      { id: 2, texto: "Diversidade entre diferentes comunidades" },
      { id: 3, texto: "Diversidade genética dentro de uma espécie" },
      { id: 4, texto: "Diversidade funcional das espécies" },
      { id: 5, texto: "Diversidade temporal ao longo de um ano" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Whittaker, R.J. (1960). Vegetation of the Siskiyou Mountains, Oregon.",
      "2. Magurran, A.E. (2004). Measuring Biological Diversity."
    ],
    vantagem: "Ganhe 1 contador de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Diversidade beta avalia a variação de espécies entre diferentes áreas."
  },

  // Carta 22: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Sistemas de Referência",
    pergunta: "Você estabeleceu áreas de referência para monitorar mudanças na vegetação.",
    opcoes: [
      { id: 1, texto: "Utilizar as áreas de referência para comparar e avaliar mudanças ecológicas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 2 casas.",
    desvantagem: "",
    dica: "Áreas de referência são essenciais para avaliar impactos e sucessões ecológicas."
  },

  // Carta 23: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Habitat",
    pergunta: "Há uma perda significativa de habitat devido à expansão agrícola.",
    opcoes: [
      { id: 1, texto: "Implementar práticas de manejo integradas para mitigar a perda de habitat." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "A perda de habitat leva à redução da biodiversidade e fragmentação de populações."
  },

  // Carta 24: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Tipos de Sucessão Ecológica",
    pergunta: "Quais são os dois principais tipos de sucessão ecológica?",
    opcoes: [
      { id: 1, texto: "Sucessão primária e secundária" },
      { id: 2, texto: "Sucessão natural e artificial" },
      { id: 3, texto: "Sucessão ascendente e descendente" },
      { id: 4, texto: "Sucessão biológica e abiótica" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Odum, E.P. (2004). Fundamentals of Ecology.",
      "2. Begon, M., Townsend, C.R., Harper, J.L. (2006). Ecology: From Individuals to Ecosystems."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Sucessão primária começa em áreas sem solo, enquanto a secundária ocorre em áreas com solo existente."
  },

  // Carta 25: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Estabelecimento de Corredores Verdes",
    pergunta: "Você estabeleceu corredores verdes para conectar fragmentos florestais.",
    opcoes: [
      { id: 1, texto: "Promover a movimentação de fauna e fluxo gênico entre populações." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Corredores verdes reduzem os efeitos negativos da fragmentação."
  },

  // Carta 26: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Inundações Recorrentes",
    pergunta: "Sua área de estudo está enfrentando inundações frequentes.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de controle de enchentes e restauração de áreas úmidas." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Inundações podem alterar a estrutura do ecossistema e afetar a biodiversidade."
  },

  // Carta 27: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Taxa de Recrutamento",
    pergunta: "O que representa a taxa de recrutamento em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "A taxa de mortalidade de plantas" },
      { id: 2, texto: "A taxa de crescimento das árvores maduras" },
      { id: 3, texto: "A taxa de estabelecimento de novas plantas" },
      { id: 4, texto: "A taxa de dispersão de sementes" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Chapin, F.S., Matson, P.A., Vitousek, P.M. (2006). Principles of Terrestrial Ecosystem Ecology.",
      "2. Odum, E.P. (2004). Fundamentals of Ecology."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Recrutamento é crucial para a regeneração e manutenção das populações."
  },

  // Carta 28: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Estabelecimento de Réplicas em Experimentos",
    pergunta: "Você estabeleceu réplicas adequadas em seus experimentos de ecologia florestal.",
    opcoes: [
      { id: 1, texto: "Aumentar a robustez e a validade estatística dos resultados." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Réplicas reduzem a variabilidade e melhoram a confiabilidade dos dados."
  },

  // Carta 29: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Deficiências na Amostragem",
    pergunta: "Sua amostragem apresentou deficiências metodológicas.",
    opcoes: [
      { id: 1, texto: "Reestruturar o desenho amostral para corrigir as deficiências." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "A amostragem adequada é essencial para resultados precisos e representativos."
  },

  // Carta 30: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Biomassa Total",
    pergunta: "O que representa a biomassa total em um ecossistema florestal?",
    opcoes: [
      { id: 1, texto: "A soma da massa de todos os organismos vivos na floresta" },
      { id: 2, texto: "A massa das árvores apenas" },
      { id: 3, texto: "A massa da fauna presente na floresta" },
      { id: 4, texto: "A quantidade de carbono armazenado nas árvores" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Chapin, F.S., Matson, P.A., Vitousek, P.M. (2006). Principles of Terrestrial Ecosystem Ecology.",
      "2. Odum, E.P. (2004). Fundamentals of Ecology."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A biomassa inclui todas as formas de vida na floresta."
  },

  // Carta 31: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Análise de Dados Multivariados",
    pergunta: "Você aplicou técnicas de análise de dados multivariados em seu estudo ecológico.",
    opcoes: [
      { id: 1, texto: "Utilizar ferramentas como PCA para identificar padrões nos dados." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Análises multivariadas ajudam a interpretar grandes conjuntos de dados complexos."
  },

  // Carta 32: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falha na Calibração de Instrumentos",
    pergunta: "Os instrumentos de medição utilizados em seu inventário não foram devidamente calibrados.",
    opcoes: [
      { id: 1, texto: "Calibrar corretamente os instrumentos antes de coletar novos dados." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Instrumentos calibrados garantem a precisão das medições."
  },

  // Carta 33: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Reabastecimento de Sementes",
    pergunta: "O que significa o reabastecimento de sementes em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "Aumento da produção de sementes pelas árvores" },
      { id: 2, texto: "Redistribuição de sementes para áreas degradadas" },
      { id: 3, texto: "Coleta de sementes para armazenamento" },
      { id: 4, texto: "Plantações de mudas a partir de sementes coletadas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Midgley, J., & Rees, W. (2005). Replenishment of Seed Banks.",
      "2. Odum, E.P. (2004). Fundamentals of Ecology."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O reabastecimento de sementes ajuda na regeneração de áreas degradadas."
  },

  // Carta 34: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Estudo de Nicho Ecológico",
    pergunta: "Você realizou um estudo de nicho ecológico para espécies em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Identificar as condições ambientais ideais para cada espécie." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Estudos de nicho ecológico ajudam a entender as preferências ambientais das espécies."
  },

  // Carta 35: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Declínio na Produtividade",
    pergunta: "A produtividade da sua plantação florestal está em declínio.",
    opcoes: [
      { id: 1, texto: "Analisar fatores limitantes e implementar ações corretivas." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Identificar causas de declínio é essencial para restaurar a produtividade."
  },

  // Carta 36: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Biodiversidade de Espécies",
    pergunta: "Qual índice é utilizado para medir a biodiversidade de espécies em uma comunidade?",
    opcoes: [
      { id: 1, texto: "Índice de Dominância de Simpson" },
      { id: 2, texto: "Índice de Shannon-Weaver" },
      { id: 3, texto: "Índice de Evenness" },
      { id: 4, texto: "Todas as anteriores" }
    ],
    respostaCorreta: 4,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Magurran, A.E. (2004). Measuring Biological Diversity.",
      "2. Begon, M., Townsend, C.R., Harper, J.L. (2006). Ecology: From Individuals to Ecosystems."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Diversos índices ajudam a quantificar diferentes aspectos da biodiversidade."
  },

  // Carta 37: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Zones de Exclusão",
    pergunta: "Você estabeleceu zonas de exclusão para proteger áreas críticas de sua plantação.",
    opcoes: [
      { id: 1, texto: "Reduzir a interferência humana e promover a regeneração natural." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Zonas de exclusão ajudam a preservar habitats sensíveis e biodiversidade."
  },

  // Carta 38: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Contaminação por Poluentes",
    pergunta: "Sua plantação foi contaminada por poluentes atmosféricos.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de remediação e monitoramento da qualidade do ar." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 5 moedas.",
    dica: "Poluentes podem afetar a saúde das plantas e a composição da comunidade."
  },

  // Carta 39: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Fluxo Gênico",
    pergunta: "O que é fluxo gênico em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "Movimentação de indivíduos entre habitats" },
      { id: 2, texto: "Transferência de genes entre populações" },
      { id: 3, texto: "Dispersão de sementes por vento" },
      { id: 4, texto: "Reprodução sexuada das plantas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Frissell, C.A., Bode, M. (2012). Population Biology and Conservation Ecology.",
      "2. Sih, A. (2004). Ecological Consequences of Invasive Species."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Fluxo gênico é crucial para manter a diversidade genética das populações."
  },

  // Carta 40: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Técnicas de Bioindicadores",
    pergunta: "Você implementou o uso de bioindicadores para avaliar a saúde do ecossistema.",
    opcoes: [
      { id: 1, texto: "Utilizar espécies sensíveis para monitorar mudanças ambientais." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Bioindicadores fornecem informações sobre a qualidade ambiental e saúde do ecossistema."
  },

  // Carta 41: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Net Primary Productivity (NPP)",
    pergunta: "O que representa a Net Primary Productivity (NPP) em ecologia?",
    opcoes: [
      { id: 1, texto: "A quantidade total de biomassa produzida pelos produtores primários." },
      { id: 2, texto: "A quantidade de biomassa consumida pelos herbívoros." },
      { id: 3, texto: "A quantidade de biomassa transferida para os consumidores secundários." },
      { id: 4, texto: "A quantidade de biomassa perdida por decomposição." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Vitousek, P.M., Matson, P.A., Firestone, J.A. (1997). Nutrient Cycles and Ecosystem Productivity.",
      "2. Chapin, F.S., Matson, P.A., Vitousek, P.M. (2006). Principles of Terrestrial Ecosystem Ecology."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "NPP é a energia disponível para os consumidores após a respiração dos produtores."
  },

  // Carta 42: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Sistemas de Longa Duração",
    pergunta: "Você estabeleceu sistemas de monitoramento de longa duração em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Coletar dados consistentes ao longo do tempo para análises detalhadas." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Monitoramento de longa duração permite identificar tendências e padrões sazonais."
  },

  // Carta 43: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Competição entre Espécies",
    pergunta: "Há uma forte competição entre espécies em sua plantação, afetando a diversidade.",
    opcoes: [
      { id: 1, texto: "Implementar manejo para reduzir a competição e promover a coexistência." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Competição intensa pode levar à exclusão competitiva de algumas espécies."
  },

  // Carta 44: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Taxa de Crescimento Basal",
    pergunta: "Como é definida a taxa de crescimento basal (BGR) em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "A taxa de crescimento em altura das árvores" },
      { id: 2, texto: "A taxa de aumento na área basal das árvores" },
      { id: 3, texto: "A taxa de acumulação de biomassa foliar" },
      { id: 4, texto: "A taxa de produção de sementes" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Franklin, J.F. (1997). Measuring Forest Structure.",
      "2. Odum, E.P. (2004). Fundamentals of Ecology."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "BGR é uma medida importante para avaliar a produtividade da floresta."
  },

  // Carta 45: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Experimentos de Campo",
    pergunta: "Você implementou experimentos de campo para estudar interações ecológicas.",
    opcoes: [
      { id: 1, texto: "Coletar dados experimentais para entender as dinâmicas de interação." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Experimentos de campo fornecem insights sobre relações causais no ecossistema."
  },

  // Carta 46: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Introdução de Espécies Invasoras",
    pergunta: "Espécies exóticas invasoras estão competindo com espécies nativas em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de controle biológico e restaurar espécies nativas." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Espécies invasoras podem reduzir a diversidade e alterar as interações ecológicas."
  },

  // Carta 47: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Estratégias de Resiliência",
    pergunta: "Qual das seguintes é uma estratégia de resiliência em ecossistemas florestais?",
    opcoes: [
      { id: 1, texto: "Aumento da homogeneidade das espécies" },
      { id: 2, texto: "Diversidade de espécies e funções" },
      { id: 3, texto: "Eliminação de espécies invasoras" },
      { id: 4, texto: "Redução da variabilidade ambiental" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Holling, C.S. (1973). Resilience and Stability of Ecological Systems.",
      "2. Gunderson, L.H., Holling, C.S. (2002). Panarchy: Understanding Transformations in Systems."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A diversidade aumenta a capacidade de recuperação dos ecossistemas."
  },

  // Carta 48: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Estudo de Ecossistemas",
    pergunta: "Você conduziu um estudo detalhado sobre a interação entre componentes bióticos e abióticos.",
    opcoes: [
      { id: 1, texto: "Entender melhor as dinâmicas e processos ecológicos." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Estudos integrados de ecossistemas ajudam a compreender as interdependências no ambiente."
  },

  // Carta 49: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Impacto das Mudanças Climáticas",
    pergunta: "Mudanças climáticas estão alterando as condições ambientais de sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Adaptar práticas de manejo para mitigar os efeitos das mudanças climáticas." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Mudanças climáticas podem afetar a distribuição de espécies e a produtividade."
  },

  // Carta 50: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Biodiversidade Funcional",
    pergunta: "O que é biodiversidade funcional em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "Variedade de espécies em um ecossistema" },
      { id: 2, texto: "Variedade de funções que as espécies desempenham no ecossistema" },
      { id: 3, texto: "Variedade de habitats dentro de uma floresta" },
      { id: 4, texto: "Variedade genética dentro de uma espécie" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Hooper, D.U., et al. (2005). Effects of Biodiversity on Ecosystem Functioning: A Consensus of Current Knowledge.",
      "2. Cardinale, B.J., et al. (2012). Biodiversity Loss and Its Impact on Humanity."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Biodiversidade funcional está relacionada às funções ecológicas realizadas pelas espécies."
  },

  // Carta 51: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Utilização de Bioindicadores",
    pergunta: "Você utilizou bioindicadores para avaliar a qualidade ambiental de sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Utilizar espécies sensíveis para detectar mudanças ambientais." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Bioindicadores fornecem informações sobre a saúde do ecossistema."
  },

  // Carta 52: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Alterações na Estrutura do Solo",
    pergunta: "Alterações na estrutura do solo estão afetando a flora de sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Implementar práticas de manejo para restaurar a estrutura do solo." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "A estrutura do solo influencia a disponibilidade de nutrientes e a saúde das plantas."
  },

  // Carta 53: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Interações Tróficas",
    pergunta: "O que são interações tróficas em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "Interações entre diferentes ecossistemas" },
      { id: 2, texto: "Relacionamentos entre predadores e presas" },
      { id: 3, texto: "Ciclagem de nutrientes no solo" },
      { id: 4, texto: "Mudanças climáticas e seus efeitos" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Krebs, C.J. (2001). Ecological Methodology.",
      "2. Begon, M., Townsend, C.R., Harper, J.L. (2006). Ecology: From Individuals to Ecosystems."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Interações tróficas envolvem cadeias alimentares e redes de consumo."
  },

  // Carta 54: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Estudo de Espécies-chave",
    pergunta: "Você realizou um estudo aprofundado sobre espécies-chave em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Entender o papel dessas espécies na manutenção do ecossistema." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Espécies-chave têm grande impacto nas estruturas e processos ecológicos."
  },

  // Carta 55: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Redução da Capacidade de Suporte",
    pergunta: "A capacidade de suporte do ecossistema está sendo reduzida devido à sobreexploração.",
    opcoes: [
      { id: 1, texto: "Implementar práticas de manejo sustentável para restaurar a capacidade de suporte." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Capacidade de suporte é a quantidade máxima de organismos que o ambiente pode sustentar."
  },

  // Carta 56: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Taxa de Mortalidade",
    pergunta: "Como a taxa de mortalidade afeta a dinâmica de uma plantação florestal?",
    opcoes: [
      { id: 1, texto: "Aumenta a produtividade do ecossistema" },
      { id: 2, texto: "Reduz a densidade das plantas e pode afetar a regeneração" },
      { id: 3, texto: "Não tem impacto significativo" },
      { id: 4, texto: "Melhora a qualidade do solo" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Chapin, F.S., Matson, P.A., Vitousek, P.M. (2006). Principles of Terrestrial Ecosystem Ecology.",
      "2. Odum, E.P. (2004). Fundamentals of Ecology."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Taxas de mortalidade influenciam a densidade populacional e a sucessão."
  },

  // Carta 57: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Estudos de Nicho",
    pergunta: "Você conduziu estudos de nicho ecológico para diferentes espécies em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Identificar as necessidades e preferências ambientais de cada espécie." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Estudos de nicho ajudam a entender as interações e a coexistência das espécies."
  },

  // Carta 58: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Alteração no Ciclo Hidrológico",
    pergunta: "Mudanças no ciclo hidrológico estão afetando sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de manejo para conservar recursos hídricos." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Alterações no ciclo hidrológico podem impactar a vegetação e a fauna aquática."
  },
  
  // Carta 1: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Sucessão Ecológica",
    pergunta: "Qual das seguintes espécies é considerada uma espécie clímax na sucessão ecológica de uma floresta tropical?",
    opcoes: [
      { id: 1, texto: "Cecropia spp." },
      { id: 2, texto: "Hevea brasiliensis" },
      { id: 3, texto: "Vochysia spp." },
      { id: 4, texto: "Schizolobium amazonicum" },
      { id: 5, texto: "Tabebuia serratifolia" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Silva, J. (2020). Sucessão Ecológica em Florestas Tropicais.",
      "2. Pereira, L. (2019). Dinâmica de Espécies Arbóreas."
    ],
    vantagem: "Ganhe 2 contadores de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Espécies clímax são predominantes no estágio final da sucessão."
  },

  // Carta 2: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Modelos de Crescimento",
    pergunta: "Você adotou um modelo de crescimento de árvores para prever a biomassa futura.",
    opcoes: [
      { id: 1, texto: "Utilizar o modelo para planejar o manejo sustentável." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e avance 2 casas.",
    desvantagem: "",
    dica: "Modelos de crescimento ajudam na previsão e planejamento do manejo."
  },

  // Carta 3: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Erros na Amostragem",
    pergunta: "Você identificou erros sistemáticos na amostragem do inventário.",
    opcoes: [
      { id: 1, texto: "Reavaliar e ajustar o método de amostragem." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 4 moedas.",
    dica: "Erros na amostragem podem comprometer toda a análise do inventário."
  },

  // Carta 4: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Densidade de Plantio",
    pergunta: "Como a densidade de plantio afeta a competitividade entre as árvores?",
    opcoes: [
      { id: 1, texto: "Aumenta a competição por recursos como luz, água e nutrientes." },
      { id: 2, texto: "Reduz a competição, favorecendo o crescimento individual." },
      { id: 3, texto: "Não tem impacto significativo na competitividade." },
      { id: 4, texto: "Aumenta a diversidade de espécies na plantação." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Lima, F. (2018). Manejo de Plantadas e Competitividade.",
      "2. Mendes, A. (2019). Ecologia de Plantadas."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Maior densidade leva a mais competição entre as árvores."
  },

  // Carta 5: Outras
  {
    tipo: "Outras",
    titulo: "Monitoramento de Fauna",
    pergunta: "Você implementou um programa de monitoramento da fauna na sua plantação.",
    opcoes: [
      { id: 1, texto: "Continuar a coletar dados para analisar a interação entre fauna e flora." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 2 contadores de progresso e remova 1 erro.",
    desvantagem: "",
    dica: "A interação entre fauna e flora é crucial para a saúde do ecossistema."
  },

  // Carta 6: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Modelagem de Dinâmica Populacional",
    pergunta: "Qual modelo é frequentemente utilizado para prever a dinâmica populacional de espécies em ecossistemas florestais?",
    opcoes: [
      { id: 1, texto: "Modelo Logístico" },
      { id: 2, texto: "Modelo Exponencial" },
      { id: 3, texto: "Modelo de Lotka-Volterra" },
      { id: 4, texto: "Modelo de Gompertz" },
      { id: 5, texto: "Modelo de Beverton-Holt" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Fernandes, H. (2021). Modelagem Populacional em Ecossistemas.",
      "2. Costa, S. (2020). Ecologia Matemática."
    ],
    vantagem: "Ganhe 1 contador de progresso e 2 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O modelo de Lotka-Volterra é usado para interações predador-presa."
  },

  // Carta 7: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Sensoriamento Remoto",
    pergunta: "Você implementou o uso de sensoriamento remoto para monitorar a saúde da floresta.",
    opcoes: [
      { id: 1, texto: "Melhorar a coleta de dados e a análise espacial." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Sensoriamento remoto fornece dados precisos e abrangentes."
  },

  // Carta 8: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Dados Ambientais",
    pergunta: "Você perdeu parte dos dados coletados sobre a biodiversidade da floresta.",
    opcoes: [
      { id: 1, texto: "Recolher novamente os dados faltantes." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "A perda de dados pode afetar a precisão das análises ecológicas."
  },

  // Carta 9: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Cobertura Vegetal",
    pergunta: "Como a cobertura vegetal influencia o microclima de uma floresta?",
    opcoes: [
      { id: 1, texto: "Aumenta a temperatura do solo." },
      { id: 2, texto: "Reduz a umidade relativa do ar." },
      { id: 3, texto: "Regula a temperatura e a umidade do ambiente." },
      { id: 4, texto: "Não tem impacto significativo." }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Barros, S. (2018). Microclima em Ecossistemas Florestais.",
      "2. Costa, L. (2019). Dinâmica de Ecossistemas."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A cobertura vegetal ajuda a manter condições climáticas estáveis."
  },

  // Carta 10: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Trilhas Ecologicamente Sustentáveis",
    pergunta: "Você implementou trilhas de baixo impacto em sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Continuar monitorando e mantendo as trilhas para minimizar o impacto." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e avance 2 casas.",
    desvantagem: "",
    dica: "Trilhas sustentáveis reduzem a degradação do solo e perturbam menos a fauna."
  },

  // Carta 11: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Biodiversidade",
    pergunta: "Qual é a importância da biodiversidade funcional em ecossistemas florestais?",
    opcoes: [
      { id: 1, texto: "Aumenta a redundância de funções ecológicas." },
      { id: 2, texto: "Reduz a resiliência do ecossistema." },
      { id: 3, texto: "Facilita a invasão de espécies exóticas." },
      { id: 4, texto: "Não tem impacto significativo na estabilidade do ecossistema." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Lima, F. (2018). Biodiversidade Funcional em Ecossistemas.",
      "2. Mendes, A. (2019). Conservação da Biodiversidade."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Biodiversidade funcional aumenta a resiliência e a estabilidade do ecossistema."
  },

  // Carta 12: Outras
  {
    tipo: "Outras",
    titulo: "Projeto de Reflorestamento",
    pergunta: "Você iniciou um projeto de reflorestamento em uma área degradada.",
    opcoes: [
      { id: 1, texto: "Selecionar espécies nativas para maximizar a recuperação ecológica." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Espécies nativas são essenciais para a restauração do ecossistema."
  },

  // Carta 13: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Resiliência Ecológica",
    pergunta: "O que é resiliência ecológica em um ecossistema florestal?",
    opcoes: [
      { id: 1, texto: "Capacidade de um ecossistema de resistir a mudanças externas sem alterar sua estrutura." },
      { id: 2, texto: "Aumentar a produtividade do ecossistema." },
      { id: 3, texto: "A capacidade de um ecossistema de se adaptar rapidamente a novas condições." },
      { id: 4, texto: "Reduzir a diversidade de espécies para aumentar a eficiência." },
      { id: 5, texto: "Aumentar a competição entre espécies para fortalecer o ecossistema." }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Holling, C.S. (1973). Resilience and Stability of Ecological Systems.",
      "2. Carpenter, S.R. (1999). Encyclopedia of Ecology."
    ],
    vantagem: "Ganhe 2 contadores de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Resiliência ecológica permite ao ecossistema retornar ao estado original após uma perturbação."
  },

  // Carta 14: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Áreas de Preservação Permanente (APP)",
    pergunta: "Você designou áreas de preservação permanente dentro de sua plantação.",
    opcoes: [
      { id: 1, texto: "Garantir a conservação de recursos hídricos e biodiversidade." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 1 estrela.",
    desvantagem: "",
    dica: "APPs protegem recursos essenciais e mantêm a saúde do ecossistema."
  },

  // Carta 15: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Estrutura Vertical da Floresta",
    pergunta: "Qual camada da floresta é responsável por abrigar a maior parte da biodiversidade?",
    opcoes: [
      { id: 1, texto: "Sub-bosque" },
      { id: 2, texto: "Dossel" },
      { id: 3, texto: "Solo" },
      { id: 4, texto: "Camada de arbustos" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Silva, J. (2020). Estrutura das Florestas Tropicais.",
      "2. Pereira, L. (2019). Biodiversidade em Ecossistemas."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O dossel é a camada mais alta e rica em espécies."
  },

  // Carta 16: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Deslocamento de Espécies Nativas",
    pergunta: "Espécies nativas estão sendo deslocadas por invasoras em sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar controle de espécies invasoras imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 5 moedas.",
    dica: "O controle de invasoras é essencial para preservar a biodiversidade nativa."
  },

  // Carta 17: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Interações Tróficas",
    pergunta: "Como as interações tróficas afetam a estrutura da comunidade em uma floresta?",
    opcoes: [
      { id: 1, texto: "Determinam a diversidade de espécies vegetais apenas." },
      { id: 2, texto: "Influenciam a abundância e a diversidade de organismos em diferentes níveis tróficos." },
      { id: 3, texto: "Não têm impacto na estrutura da comunidade." },
      { id: 4, texto: "Aumentam a competição entre espécies herbívoras." }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Begon, M., Townsend, C.R., Harper, J.L. (2006). Ecology: From Individuals to Ecosystems.",
      "2. Odum, E.P. (2004). Fundamentals of Ecology."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Interações tróficas incluem predadores, herbívoros e decompositores."
  },

  // Carta 18: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Análise de Redes Tróficas",
    pergunta: "Você realizou uma análise de redes tróficas em sua plantação.",
    opcoes: [
      { id: 1, texto: "Utilizar os resultados para entender as interações entre espécies." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Redes tróficas ajudam a visualizar as relações alimentares no ecossistema."
  },

  // Carta 19: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Índice de Similaridade",
    pergunta: "Qual índice de similaridade é mais adequado para comparar a composição de espécies entre duas parcelas florestais?",
    opcoes: [
      { id: 1, texto: "Índice de Jaccard" },
      { id: 2, texto: "Índice de Shannon" },
      { id: 3, texto: "Índice de Simpson" },
      { id: 4, texto: "Índice de Sørensen" },
      { id: 5, texto: "Índice de Margalef" }
    ],
    respostaCorreta: 4,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Clarke, K.R. (1993). Non-parametric Multivariate Analysis of Changes in Community Structure.",
      "2. Legendre, P., Legendre, L. (2012). Numerical Ecology."
    ],
    vantagem: "Ganhe 2 contadores de progresso e 4 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Índice de Sørensen é sensível à presença/ausência de espécies."
  },

  // Carta 20: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Poluição Atmosférica",
    pergunta: "Sua plantação está sendo afetada por altos níveis de poluição atmosférica.",
    opcoes: [
      { id: 1, texto: "Implementar medidas para reduzir a poluição e proteger as árvores." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 5 moedas.",
    dica: "A poluição pode afetar a saúde das árvores e a biodiversidade."
  },

  // Carta 21: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Efeito de Ilha de Calor",
    pergunta: "Como as florestas ajudam a mitigar o efeito de ilha de calor urbano?",
    opcoes: [
      { id: 1, texto: "Aumentando a temperatura local através da transpiração" },
      { id: 2, texto: "Reduzindo a temperatura através da sombra e evapotranspiração" },
      { id: 3, texto: "Não têm impacto no efeito de ilha de calor" },
      { id: 4, texto: "Aumentando a impermeabilidade do solo" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Oke, T.R. (1982). The Energetics of Cities.",
      "2. Grimm, N.B., Faeth, S.H., Golubiewski, N.E., Redman, C.L., Wu, J., Bai, X., Briggs, J.M. (2008). Global Change and Cities."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A sombra e a evapotranspiração das florestas reduzem a temperatura ambiente."
  },

  // Carta 22: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Monitoramento Longitudinal",
    pergunta: "Você iniciou um monitoramento longitudinal da biodiversidade na sua plantação.",
    opcoes: [
      { id: 1, texto: "Coletar dados contínuos para analisar tendências de biodiversidade." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Monitoramento longitudinal permite observar mudanças ao longo do tempo."
  },

  // Carta 23: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Aumento da Temperatura Global",
    pergunta: "O aumento da temperatura global está afetando o crescimento das árvores em sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar estratégias de adaptação ao clima." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Mudanças climáticas podem afetar a saúde e o crescimento das árvores."
  },

  // Carta 24: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Resiliência Ecológica",
    pergunta: "Quais fatores contribuem para a resiliência ecológica de uma floresta?",
    opcoes: [
      { id: 1, texto: "Alta diversidade de espécies" },
      { id: 2, texto: "Estrutura vertical complexa" },
      { id: 3, texto: "Redundância funcional" },
      { id: 4, texto: "Todas as anteriores" },
      { id: 5, texto: "Nenhuma das anteriores" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Holling, C.S. (1973). Resilience and Stability of Ecological Systems.",
      "2. Gunderson, L.H. (2000). Ecological Resilience and Biodiversity in a Changing World."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Diversidade e complexidade estrutural aumentam a resiliência."
  },

  // Carta 25: Outras
  {
    tipo: "Outras",
    titulo: "Restauro Ecológico",
    pergunta: "Você iniciou um projeto de restauro ecológico para recuperar uma área degradada.",
    opcoes: [
      { id: 1, texto: "Implementar técnicas de regeneração natural e plantio de espécies nativas." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "O restauro ecológico promove a recuperação da biodiversidade e funcionalidade do ecossistema."
  },

  // Carta 26: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Modelo de Crescimento de Araujo",
    pergunta: "Qual é a principal aplicação do modelo de crescimento de Araujo em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "Prever a biodiversidade de uma floresta" },
      { id: 2, texto: "Estimar a biomassa de uma plantação" },
      { id: 3, texto: "Analisar a dinâmica populacional de predadores" },
      { id: 4, texto: "Determinar a taxa de sucessão ecológica" },
      { id: 5, texto: "Avaliar a eficiência da fotossíntese" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Araujo, L. (2005). Modelos de Crescimento Florestal.",
      "2. Silva, T. (2018). Biomassa e Crescimento em Plantadas."
    ],
    vantagem: "Ganhe 1 contador de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Modelos de crescimento auxiliam na previsão da biomassa futura."
  },

  // Carta 27: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Reservatórios de Carbono",
    pergunta: "Você implementou reservatórios de carbono em sua plantação.",
    opcoes: [
      { id: 1, texto: "Aumentar a captura de carbono e contribuir para a mitigação das mudanças climáticas." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Reservatórios de carbono armazenam CO2 e ajudam na luta contra o aquecimento global."
  },

  // Carta 28: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Redução da Cobertura de Solo",
    pergunta: "A cobertura de solo na sua plantação está diminuindo, aumentando a erosão.",
    opcoes: [
      { id: 1, texto: "Implementar práticas de conservação do solo, como plantio de cobertura." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Cobertura de solo protege contra a erosão e mantém a umidade."
  },

  // Carta 29: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Espectro de Luz",
    pergunta: "Qual a importância do espectro de luz para a fotossíntese nas árvores?",
    opcoes: [
      { id: 1, texto: "Não influencia a fotossíntese" },
      { id: 2, texto: "Somente luz vermelha é necessária" },
      { id: 3, texto: "Luz azul e vermelha são essenciais para a fotossíntese" },
      { id: 4, texto: "Somente luz verde é necessária" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Taiz, L., Zeiger, E. (2010). Plant Physiology.",
      "2. Raven, P.H., Evert, R.F., Eichhorn, S.E. (2005). Biology of Plants."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Luz azul e vermelha são absorvidas pelas clorofilas."
  },

  // Carta 30: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Trilhas de Monitoramento",
    pergunta: "Você estabeleceu trilhas para monitorar a biodiversidade e a saúde do ecossistema.",
    opcoes: [
      { id: 1, texto: "Utilizar as trilhas para coleta de dados e observação contínua." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Trilhas de monitoramento facilitam a coleta de dados precisos."
  },

  // Carta 31: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Equações de Crescimento",
    pergunta: "Qual equação é comumente utilizada para modelar o crescimento logístico de árvores em plantações?",
    opcoes: [
      { id: 1, texto: "P(t) = P0 * e^(rt)" },
      { id: 2, texto: "P(t) = K / (1 + ((K - P0)/P0) * e^(-rt))" },
      { id: 3, texto: "P(t) = P0 + rt" },
      { id: 4, texto: "P(t) = P0 * (1 + rt)" },
      { id: 5, texto: "P(t) = K * log(t)" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Verhulst, P.F. (1838). Logistic Growth.",
      "2. Silva, T. (2018). Modelagem de Crescimento em Plantadas."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A equação logística incorpora a capacidade de suporte do ambiente."
  },

  // Carta 32: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Declínio de Populações de Polinizadores",
    pergunta: "Há um declínio nas populações de polinizadores na sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar medidas para proteger e atrair polinizadores, como plantio de flores nativas." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Polinizadores são essenciais para a reprodução de muitas espécies vegetais."
  },
  
  // Carta 101: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Fluxo de Energia em Ecossistemas",
    pergunta: "Qual é a eficiência média da transferência de energia entre níveis tróficos em um ecossistema florestal?",
    opcoes: [
      { id: 1, texto: "5%" },
      { id: 2, texto: "10%" },
      { id: 3, texto: "20%" },
      { id: 4, texto: "30%" },
      { id: 5, texto: "40%" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Begon, M., Townsend, C.R., Harper, J.L. (2006). Ecology: From Individuals to Ecosystems.",
      "2. Odum, E.P. (2004). Fundamentals of Ecology."
    ],
    vantagem: "Ganhe 2 contadores de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "A transferência de energia entre níveis tróficos é geralmente baixa."
  },

  // Carta 102: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Reserva de Biodiversidade",
    pergunta: "Você estabeleceu uma reserva de biodiversidade dentro da sua área de estudo.",
    opcoes: [
      { id: 1, texto: "Manter a reserva e monitorar a biodiversidade regularmente." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e 2 moedas.",
    desvantagem: "",
    dica: "Reservas de biodiversidade ajudam na conservação de espécies."
  },

  // Carta 103: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Efeito de Bordas",
    pergunta: "Sua plantação está sofrendo com efeitos de bordas que impactam a fauna local.",
    opcoes: [
      { id: 1, texto: "Implementar barreiras ou corredores para mitigar os efeitos." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Efeitos de bordas podem alterar microclimas e habitats."
  },

  // Carta 104: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Estudos de Nicho Ecológico",
    pergunta: "Qual é o principal objetivo dos estudos de nicho ecológico em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "Determinar a distribuição espacial das espécies" },
      { id: 2, texto: "Aumentar a produtividade da plantação" },
      { id: 3, texto: "Identificar interações competitivas" },
      { id: 4, texto: "Planejar o corte seletivo" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Wiens, J.A. (2014). Spatial Ecology: The Role of Scale in Population and Community Ecology.",
      "2. Peterson, A.T., Nakagawa, S. (2008). Niche Overlap and Resource Partitioning."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Estudos de nicho ajudam a entender onde e como as espécies vivem."
  },

  // Carta 105: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Modelos de Ecossistemas",
    pergunta: "Você começou a utilizar modelos computacionais para simular dinâmicas de ecossistemas florestais.",
    opcoes: [
      { id: 1, texto: "Aplicar os modelos para prever mudanças futuras." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Modelos ajudam na previsão e planejamento de manejos."
  },

  // Carta 106: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Redução da Correnteza Genética",
    pergunta: "Você identificou uma redução na diversidade genética de espécies chave na plantação.",
    opcoes: [
      { id: 1, texto: "Implementar programas de melhoramento genético." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Diversidade genética é crucial para a resiliência das espécies."
  },

  // Carta 107: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Fator de Competência",
    pergunta: "O que é o fator de competência em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "A capacidade de uma espécie competir por recursos" },
      { id: 2, texto: "A taxa de crescimento de uma espécie" },
      { id: 3, texto: "A resistência de uma espécie a doenças" },
      { id: 4, texto: "A tolerância de uma espécie a variações climáticas" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Gleason, H.A. (2015). The Individualistic Concept of Plant Communities.",
      "2. Chesson, P. (2000). Mechanisms of Maintenance of Species Diversity."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Fator de competência envolve competição por recursos essenciais."
  },

  // Carta 108: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Técnicas de Biomanipulação",
    pergunta: "Você adotou técnicas de biomanipulação para controlar a população de herbívoros.",
    opcoes: [
      { id: 1, texto: "Equilibrar a população de herbívoros para proteger a vegetação." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Biomanipulação ajuda a manter o equilíbrio entre predadores e presas."
  },

  // Carta 109: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Desbalanceamento Trófico",
    pergunta: "Você observou um desbalanceamento trófico em sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar medidas para restaurar o equilíbrio trófico." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "Desbalanceamento trófico pode afetar toda a cadeia alimentar."
  },

  // Carta 110: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Método de Plotagem",
    pergunta: "Qual é a principal vantagem do método de plotagem quadrada em inventários florestais?",
    opcoes: [
      { id: 1, texto: "Facilidade de execução em terrenos irregulares" },
      { id: 2, texto: "Alta precisão na estimativa de densidade de árvores" },
      { id: 3, texto: "Redução do tempo necessário para o inventário" },
      { id: 4, texto: "Eliminação de vieses de seleção" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Ferreira, G. (2019). Métodos de Inventário Florestal.",
      "2. Almeida, S. (2020). Técnicas de Amostragem em Ecologia."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Plotagem quadrada é eficaz para estimar densidade e volume."
  },

  // Carta 111: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Monitoramento Remoto",
    pergunta: "Você implementou técnicas de monitoramento remoto usando satélites.",
    opcoes: [
      { id: 1, texto: "Melhorar a coleta de dados e a análise espacial." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Monitoramento remoto oferece dados abrangentes e atualizados."
  },

  // Carta 112: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Habitat",
    pergunta: "Houve uma perda significativa de habitat devido a atividades humanas próximas.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de restauração de habitat." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: "Perda de habitat afeta a biodiversidade e os processos ecológicos."
  },

  // Carta 113: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Efeito de Ilha de Isolamento",
    pergunta: "O que é o efeito de ilha de isolamento em ecologia?",
    opcoes: [
      { id: 1, texto: "Isolamento de espécies em ilhas físicas" },
      { id: 2, texto: "Isolamento de populações em fragmentos de habitat" },
      { id: 3, texto: "Isolamento de ecossistemas aquáticos" },
      { id: 4, texto: "Isolamento de espécies exóticas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Hanski, I. (1998). Metapopulation Ecology.",
      "2. Wilson, E.O. (1984). Biophilia."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O isolamento de populações pode levar à perda de diversidade genética."
  },

  // Carta 114: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Sistemas de Indicadores Ecológicos",
    pergunta: "Você implementou sistemas de indicadores ecológicos para monitorar a saúde da floresta.",
    opcoes: [
      { id: 1, texto: "Utilizar os indicadores para tomar decisões informadas de manejo." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: "Indicadores ecológicos ajudam a monitorar mudanças ambientais."
  },

  // Carta 115: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Mudanças Climáticas",
    pergunta: "Mudanças climáticas estão afetando a distribuição de espécies em sua plantação.",
    opcoes: [
      { id: 1, texto: "Implementar estratégias de adaptação para mitigar os impactos." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 5 moedas.",
    dica: "Mudanças climáticas podem alterar habitats e processos ecológicos."
  },

  // Carta 116: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Interações Bióticas",
    pergunta: "Qual das seguintes é uma interação biótica que pode influenciar a estrutura de uma plantação florestal?",
    opcoes: [
      { id: 1, texto: "Precipitação" },
      { id: 2, texto: "Temperatura" },
      { id: 3, texto: "Competição entre espécies" },
      { id: 4, texto: "Erosão do solo" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Chapin, F.S., Matson, P.A., Vitousek, P.M. (2006). Principles of Terrestrial Ecosystem Ecology.",
      "2. Molles, M.C. (2016). Ecology: Concepts and Applications."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Interações bióticas incluem competição, predação e mutualismo."
  },

  // Carta 117: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Adoção de Manejo Adaptativo",
    pergunta: "Você implementou um plano de manejo adaptativo em sua plantação.",
    opcoes: [
      { id: 1, texto: "Ajustar as estratégias de manejo com base em monitoramentos contínuos." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Manejo adaptativo permite flexibilidade e resposta a mudanças."
  },

  // Carta 118: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Declínio de Espécies",
    pergunta: "Algumas espécies estão em declínio em sua plantação devido à perda de habitat.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de conservação específicas para essas espécies." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: "O declínio de espécies pode afetar a dinâmica ecológica da plantação."
  },

  // Carta 119: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Resiliência Ecológica",
    pergunta: "O que significa resiliência ecológica em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "A capacidade de uma floresta resistir a perturbações" },
      { id: 2, texto: "A rapidez com que uma floresta se desenvolve" },
      { id: 3, texto: "A diversidade de espécies em uma floresta" },
      { id: 4, texto: "A produtividade de uma floresta" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Holling, C.S. (1973). Resilience and Stability of Ecological Systems.",
      "2. Walker, B., Holling, C.S., Carpenter, S.R., Kinzig, A. (2004). Resilience, Adaptability and Transformability in Social–Ecological Systems."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Resiliência envolve a capacidade de se recuperar de perturbações."
  },

  // Carta 120: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Desenvolvimento de Redes Alimentares",
    pergunta: "Você mapeou e desenvolveu redes alimentares para entender as interações entre espécies.",
    opcoes: [
      { id: 1, texto: "Utilizar as redes para identificar espécies-chave e vulneráveis." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 2 estrelas.",
    desvantagem: "",
    dica: "Redes alimentares ajudam a entender as interações e dependências entre espécies."
  }
];

export default ecologia_forestal_cards;
