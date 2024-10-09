const manejo_nativas_cards = [
 
  // Carta 1: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Estrutura Florestal",
    pergunta: "Em uma floresta, o dossel refere-se a qual parte?",
    opcoes: [
      { id: 1, texto: "Camada inferior composta por arbustos" },
      { id: 2, texto: "Camada superior formada pelas copas das árvores" },
      { id: 3, texto: "Camada do solo" },
      { id: 4, texto: "Camada aquática adjacente" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Estrutura Florestal"],
    fontes: [
      "1. Silva, J. (2020). Ecologia Florestal.",
      "2. Pereira, L. (2019). Botânica Florestal."
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Perde 1 estrela.",
    dica: "O dossel é importante para a fotossíntese."
  },

  // Carta 2: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Descoberta de Nascentes",
    pergunta: "Você encontrou uma nascente em sua área de manejo!",
    opcoes: [
      { id: 1, texto: "Proteja a nascente para garantir a sustentabilidade." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo Sustentável"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas!",
    desvantagem: "",
    dica: ""
  },

  // Carta 3: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Queimada Inesperada",
    pergunta: "Uma queimada atingiu parte da sua área de manejo.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de controle imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Riscos"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e volte 3 casas.",
    dica: ""
  },

  // Carta 4: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Dinâmica de Populações",
    pergunta: "O que significa 'recrutamento' em ecologia florestal?",
    opcoes: [
      { id: 1, texto: "Entrada de novas espécies invasoras" },
      { id: 2, texto: "Morte de árvores adultas" },
      { id: 3, texto: "Crescimento de plântulas para o estágio jovem" },
      { id: 4, texto: "Perda de diversidade genética" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Dinâmica Florestal"],
    fontes: [
      "1. Lima, F. (2018). Dinâmica de Ecossistemas.",
      "2. Mendes, A. (2019). Populações Florestais."
    ],
    vantagem: "Avance o número de casas igual aos seus acertos consecutivos.",
    desvantagem: "Perde 1 estrela.",
    dica: "Recrutamento é crucial para a regeneração."
  },

  // Carta 5: Outras
  {
    tipo: "Outras",
    titulo: "Parceria com Comunidade Local",
    pergunta: "Você firmou uma parceria com a comunidade local para manejo sustentável.",
    opcoes: [
      { id: 1, texto: "Implementar projetos colaborativos." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Manejo Participativo"],
    fontes: [],
    vantagem: "Ganhe 5 moedas e remova 2 erros do seu contador.",
    desvantagem: "",
    dica: ""
  },

  // Carta 6: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Manejo de Impacto Reduzido",
    pergunta: "Qual técnica NÃO é característica do manejo de impacto reduzido?",
    opcoes: [
      { id: 1, texto: "Planejamento de estradas" },
      { id: 2, texto: "Corte seletivo de árvores" },
      { id: 3, texto: "Uso de fogo para limpeza de área" },
      { id: 4, texto: "Treinamento de operadores" },
      { id: 5, texto: "Monitoramento pós-colheita" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Manejo Sustentável"],
    fontes: [
      "1. Carvalho, D. (2021). Técnicas de Manejo Florestal.",
      "2. Santos, E. (2020). Práticas Sustentáveis."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "O uso do fogo geralmente não é sustentável."
  },

  // Carta 7: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Incremento Diamétrico",
    pergunta: "As árvores em sua área apresentaram alto incremento diamétrico.",
    opcoes: [
      { id: 1, texto: "Planejar a colheita sustentável." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Dinâmica Florestal"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 3 casas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 8: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Praga Florestal",
    pergunta: "Uma praga está afetando suas árvores.",
    opcoes: [
      { id: 1, texto: "Iniciar controle biológico imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Sanidade Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 moedas e fique uma rodada sem jogar.",
    dica: ""
  },

  // Carta 9: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Espécies Pioneiras",
    pergunta: "Quais são características típicas de espécies pioneiras?",
    opcoes: [
      { id: 1, texto: "Crescimento lento e sombra" },
      { id: 2, texto: "Crescimento rápido e tolerância ao sol" },
      { id: 3, texto: "Longa vida e baixa produção de sementes" },
      { id: 4, texto: "Dependência de solos férteis" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Rodrigues, V. (2018). Sucessão Ecológica.",
      "2. Barros, T. (2019). Dinâmica de Espécies."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Pioneiras colonizam áreas abertas."
  },

  // Carta 10: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Financiamento Aprovado",
    pergunta: "Seu projeto de manejo sustentável recebeu financiamento.",
    opcoes: [
      { id: 1, texto: "Investir em tecnologia e capacitação." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Gestão Florestal"],
    fontes: [],
    vantagem: "Ganhe 10 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 11: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Certificação Florestal",
    pergunta: "Qual é o principal objetivo da certificação florestal?",
    opcoes: [
      { id: 1, texto: "Aumentar a produtividade a qualquer custo" },
      { id: 2, texto: "Garantir práticas sustentáveis de manejo" },
      { id: 3, texto: "Reduzir os custos de operação" },
      { id: 4, texto: "Eliminar a concorrência no mercado" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Sustentável"],
    fontes: [
      "1. Gomes, P. (2020). Certificação Florestal.",
      "2. Lima, R. (2019). Sustentabilidade em Manejo."
    ],
    vantagem: "Ganhe 1 estrela e 5 moedas.",
    desvantagem: "Perde 2 moedas.",
    dica: "A certificação agrega valor ao produto."
  },

  // Carta 12: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Conflito com Comunidade",
    pergunta: "Ocorreram conflitos com a comunidade local.",
    opcoes: [
      { id: 1, texto: "Negociar e buscar soluções conjuntas." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo Participativo"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 5 moedas ou 2 estrelas.",
    dica: ""
  },

  // Carta 13: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Espécies Clímax",
    pergunta: "Qual das seguintes é uma espécie clímax típica da Mata Atlântica?",
    opcoes: [
      { id: 1, texto: "Embaúba (Cecropia sp.)" },
      { id: 2, texto: "Jequitibá-rosa (Cariniana legalis)" },
      { id: 3, texto: "Capim-colonião (Panicum maximum)" },
      { id: 4, texto: "Sibipiruna (Caesalpinia peltophoroides)" },
      { id: 5, texto: "Pinus elliottii" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Botânica Florestal"],
    fontes: [
      "1. Fernandes, H. (2021). Flora da Mata Atlântica.",
      "2. Costa, S. (2020). Espécies Arbóreas Brasileiras."
    ],
    vantagem: "Ganhe 1 contador de progresso e 2 estrelas.",
    desvantagem: "Perde 1 contador de progresso.",
    dica: "Jequitibá-rosa é uma das maiores árvores brasileiras."
  },

  // Carta 14: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Tecnologia Inovadora",
    pergunta: "Você implementou tecnologia de ponta em seu manejo.",
    opcoes: [
      { id: 1, texto: "Utilizar drones para monitoramento." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Inovação Florestal"],
    fontes: [],
    vantagem: "Remova 2 erros do seu contador ou ganhe 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 15: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Regeneração Natural",
    pergunta: "O que é regeneração natural em florestas?",
    opcoes: [
      { id: 1, texto: "Plantio de mudas exóticas" },
      { id: 2, texto: "Crescimento espontâneo de espécies nativas" },
      { id: 3, texto: "Uso de fertilizantes químicos" },
      { id: 4, texto: "Desmatamento controlado" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Dinâmica Florestal"],
    fontes: [
      "1. Barros, S. (2018). Regeneração de Ecossistemas.",
      "2. Costa, L. (2019). Ecologia Florestal."
    ],
    vantagem: "Ganhe 1 estrela.",
    desvantagem: "Perde 1 estrela.",
    dica: "A regeneração natural ocorre sem intervenção humana."
  },

  // Carta 16: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Invasão de Espécies Exóticas",
    pergunta: "Espécies exóticas estão invadindo sua área.",
    opcoes: [
      { id: 1, texto: "Implementar ações de controle imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Sanidade Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas ou 4 moedas.",
    dica: ""
  },

  // Carta 17: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Corredores Ecológicos",
    pergunta: "Qual é a função principal dos corredores ecológicos?",
    opcoes: [
      { id: 1, texto: "Isolar espécies ameaçadas" },
      { id: 2, texto: "Conectar fragmentos de habitats" },
      { id: 3, texto: "Aumentar a área para agricultura" },
      { id: 4, texto: "Servir como barreira contra incêndios" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação"],
    fontes: [
      "1. Nascimento, L. (2019). Conectividade Florestal.",
      "2. Albuquerque, M. (2020). Ecologia da Paisagem."
    ],
    vantagem: "Avance 3 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Eles facilitam o fluxo gênico entre populações."
  },

  // Carta 18: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Capacitação da Equipe",
    pergunta: "Sua equipe recebeu treinamento avançado.",
    opcoes: [
      { id: 1, texto: "Aplicar os novos conhecimentos no campo." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Gestão de Pessoas"],
    fontes: [],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "",
    dica: ""
  },

  // Carta 19: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Lei de Gestão de Florestas Públicas",
    pergunta: "Qual o número da lei que institui a Gestão de Florestas Públicas no Brasil?",
    opcoes: [
      { id: 1, texto: "Lei 9.605/1998" },
      { id: 2, texto: "Lei 11.284/2006" },
      { id: 3, texto: "Lei 12.651/2012" },
      { id: 4, texto: "Lei 6.938/1981" },
      { id: 5, texto: "Lei 4.771/1965" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Legislação Florestal"],
    fontes: [
      "1. Oliveira, F. (2021). Legislação Ambiental.",
      "2. Martins, C. (2020). Política Florestal."
    ],
    vantagem: "Ganhe 1 contador de progresso e 5 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Foi sancionada em 2006."
  },

  // Carta 20: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Multa Ambiental",
    pergunta: "Você foi multado por infrações ambientais.",
    opcoes: [
      { id: 1, texto: "Pagar a multa e corrigir as irregularidades." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Legislação Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 10 moedas ou 2 estrelas.",
    dica: ""
  },

  // Carta 21: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Sucessão Ecológica",
    pergunta: "O que é sucessão ecológica em ecossistemas florestais?",
    opcoes: [
      { id: 1, texto: "Processo de evolução genética rápida" },
      { id: 2, texto: "Mudança gradual na composição das espécies ao longo do tempo" },
      { id: 3, texto: "Extinção em massa de espécies" },
      { id: 4, texto: "Introdução de espécies exóticas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Silva, J. (2018). Sucessão Ecológica.",
      "2. Pereira, L. (2019). Dinâmica de Ecossistemas."
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Perde 1 estrela.",
    dica: "É um processo natural após uma perturbação."
  },

  // Carta 22: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Melhoria do Solo",
    pergunta: "Você implementou técnicas de conservação do solo.",
    opcoes: [
      { id: 1, texto: "Continuar práticas sustentáveis." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Conservação do Solo"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 23: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Erosão do Solo",
    pergunta: "Sua área de manejo está sofrendo erosão.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de controle imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Conservação do Solo"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e volte 2 casas.",
    dica: ""
  },

  // Carta 24: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Biodiversidade",
    pergunta: "Por que a biodiversidade é importante em florestas nativas?",
    opcoes: [
      { id: 1, texto: "Reduz a resiliência do ecossistema" },
      { id: 2, texto: "Aumenta a produtividade e estabilidade do ecossistema" },
      { id: 3, texto: "Facilita a invasão de espécies exóticas" },
      { id: 4, texto: "Não tem impacto significativo" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Lima, F. (2018). Biodiversidade e Ecossistemas.",
      "2. Mendes, A. (2019). Conservação da Biodiversidade."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Diversidade genética é crucial para a saúde do ecossistema."
  },

  // Carta 25: Outras
  {
    tipo: "Outras",
    titulo: "Doação de Mudas",
    pergunta: "Você recebeu uma doação de mudas nativas.",
    opcoes: [
      { id: 1, texto: "Plantar as mudas para enriquecer a floresta." }
    ],
    respostaCorreta: [1],
    dificuldade: "facil",
    categorias: ["Reflorestamento"],
    fontes: [],
    vantagem: "Ganhe 1 estrela e 2 moedas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 26: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Ciclo de Corte",
    pergunta: "Em um manejo sustentável, o ciclo de corte é determinado com base em:",
    opcoes: [
      { id: 1, texto: "A demanda do mercado" },
      { id: 2, texto: "O tempo necessário para a floresta se regenerar" },
      { id: 3, texto: "A disponibilidade de mão de obra" },
      { id: 4, texto: "A estação do ano" },
      { id: 5, texto: "A idade das máquinas utilizadas" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal"],
    fontes: [
      "1. Carvalho, D. (2021). Planejamento Florestal.",
      "2. Santos, E. (2020). Manejo Sustentável."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "O objetivo é não comprometer a capacidade produtiva da floresta."
  },

  // Carta 27: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Reconhecimento Ambiental",
    pergunta: "Você recebeu um prêmio por práticas sustentáveis.",
    opcoes: [
      { id: 1, texto: "Divulgar o reconhecimento para inspirar outros." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Gestão Florestal"],
    fontes: [],
    vantagem: "Ganhe 5 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 28: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Doença de Plantas",
    pergunta: "Uma doença está se espalhando entre as árvores.",
    opcoes: [
      { id: 1, texto: "Implementar medidas fitossanitárias." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Sanidade Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 estrela e fique uma rodada sem jogar.",
    dica: ""
  },

  // Carta 29: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Mata Ciliar",
    pergunta: "A função principal das matas ciliares é:",
    opcoes: [
      { id: 1, texto: "Produzir madeira" },
      { id: 2, texto: "Proteger cursos d'água" },
      { id: 3, texto: "Facilitar a urbanização" },
      { id: 4, texto: "Diminuir a biodiversidade" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação"],
    fontes: [
      "1. Nascimento, L. (2019). Matas Ciliares.",
      "2. Albuquerque, M. (2020). Preservação de Rios."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "São importantes para evitar erosão nas margens."
  },

  // Carta 30: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Crédito de Carbono",
    pergunta: "Você recebeu créditos de carbono por preservar a floresta.",
    opcoes: [
      { id: 1, texto: "Investir os créditos em melhorias." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Serviços Ambientais"],
    fontes: [],
    vantagem: "Ganhe 8 moedas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 31: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Fragmentação Florestal",
    pergunta: "A fragmentação florestal pode levar a:",
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Redução de habitats e isolamento de espécies" },
      { id: 3, texto: "Melhoria da conectividade" },
      { id: 4, texto: "Equilíbrio ecológico" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecologia da Paisagem"],
    fontes: [
      "1. Lima, M. (2020). Fragmentação de Ecossistemas.",
      "2. Andrade, F. (2019). Impactos Ambientais."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Isolamento pode afetar a reprodução das espécies."
  },

  // Carta 32: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Furto de Madeira",
    pergunta: "Madeireiros ilegais furtaram madeira de sua área.",
    opcoes: [
      { id: 1, texto: "Reforçar a vigilância e segurança." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Gestão de Riscos"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 4 moedas e 1 estrela.",
    dica: ""
  },

  // Carta 33: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Taxa de Exploração",
    pergunta: "A taxa de exploração em manejo florestal sustentável é determinada por:",
    opcoes: [
      { id: 1, texto: "Necessidades econômicas imediatas" },
      { id: 2, texto: "Capacidade de regeneração da floresta" },
      { id: 3, texto: "Espaço disponível no mercado" },
      { id: 4, texto: "Quantidade de mão de obra disponível" },
      { id: 5, texto: "Condições climáticas do dia" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal"],
    fontes: [
      "1. Ferreira, G. (2019). Taxas de Exploração.",
      "2. Almeida, S. (2020). Planejamento Sustentável."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 2 estrelas.",
    dica: "A sustentabilidade a longo prazo é o foco."
  },

  // Carta 34: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Programa de Reflorestamento",
    pergunta: "Você iniciou um programa de reflorestamento.",
    opcoes: [
      { id: 1, texto: "Envolver a comunidade no projeto." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Reflorestamento"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e 3 moedas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 35: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Espécies Endêmicas",
    pergunta: "Espécies endêmicas são aquelas que:",
    opcoes: [
      { id: 1, texto: "Existem apenas em uma determinada região" },
      { id: 2, texto: "São encontradas em todo o mundo" },
      { id: 3, texto: "São espécies invasoras" },
      { id: 4, texto: "Foram recentemente extintas" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Biodiversidade"],
    fontes: [
      "1. Silva, K. (2018). Espécies Endêmicas.",
      "2. Ramos, J. (2019). Conservação da Fauna e Flora."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Sua distribuição é restrita."
  },

  // Carta 36: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Seca Prolongada",
    pergunta: "Uma seca está afetando sua área de manejo.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de mitigação." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Gestão de Riscos"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 2 moedas.",
    dica: ""
  },

  // Carta 37: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Anéis de Crescimento",
    pergunta: "Os anéis de crescimento em árvores indicam:",
    opcoes: [
      { id: 1, texto: "A idade da árvore" },
      { id: 2, texto: "A altura da árvore" },
      { id: 3, texto: "A largura das folhas" },
      { id: 4, texto: "A profundidade das raízes" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Dendrocronologia"],
    fontes: [
      "1. Fernandes, H. (2021). Estudo dos Anéis de Crescimento.",
      "2. Costa, S. (2020). Idade das Árvores."
    ],
    vantagem: "Ganhe 1 estrela e avance 1 casa.",
    desvantagem: "Perde 1 estrela.",
    dica: "Cada anel geralmente representa um ano."
  },

  // Carta 38: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Certificação Obtida",
    pergunta: "Sua área de manejo foi certificada.",
    opcoes: [
      { id: 1, texto: "Usar a certificação para agregar valor ao produto." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Certificação Florestal"],
    fontes: [],
    vantagem: "Ganhe 5 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 39: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Legislação Ambiental",
    pergunta: "A Lei 12.651/2012 é conhecida como:",
    opcoes: [
      { id: 1, texto: "Código Florestal Brasileiro" },
      { id: 2, texto: "Lei de Crimes Ambientais" },
      { id: 3, texto: "Política Nacional do Meio Ambiente" },
      { id: 4, texto: "Lei da Mata Atlântica" },
      { id: 5, texto: "Lei de Gestão de Florestas Públicas" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Legislação Florestal"],
    fontes: [
      "1. Oliveira, F. (2021). Legislação Ambiental.",
      "2. Martins, C. (2020). Política Florestal."
    ],
    vantagem: "Ganhe 1 contador de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Atualizou o antigo código de 1965."
  },

  // Carta 40: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Ataque de Insetos",
    pergunta: "Insetos desfolhadores estão atacando suas árvores.",
    opcoes: [
      { id: 1, texto: "Aplicar controle biológico." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Sanidade Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 estrela e 2 moedas.",
    dica: ""
  },

  // Carta 41: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Fotossíntese",
    pergunta: "A fotossíntese é o processo pelo qual as plantas:",
    opcoes: [
      { id: 1, texto: "Respiram oxigênio e liberam dióxido de carbono" },
      { id: 2, texto: "Convertem luz solar em energia química" },
      { id: 3, texto: "Absorvem nutrientes do solo" },
      { id: 4, texto: "Perdem água para o ambiente" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Fisiologia Vegetal"],
    fontes: [
      "1. Silva, J. (2018). Fisiologia das Plantas.",
      "2. Pereira, L. (2019). Processos Vegetais."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "É fundamental para a produção de glicose."
  },

  // Carta 42: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Parceria Internacional",
    pergunta: "Você fechou uma parceria com uma ONG internacional.",
    opcoes: [
      { id: 1, texto: "Desenvolver projetos conjuntos de conservação." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Gestão Florestal"],
    fontes: [],
    vantagem: "Ganhe 5 moedas e 2 estrelas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 43: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Metodologias de Inventário",
    pergunta: "O método de Bitterlich é utilizado para:",
    opcoes: [
      { id: 1, texto: "Estimativa de volume por amostragem de área fixa" },
      { id: 2, texto: "Estimativa de área basal por amostragem de ponto" },
      { id: 3, texto: "Contagem total de árvores em uma área" },
      { id: 4, texto: "Análise de solo" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Inventário Florestal"],
    fontes: [
      "1. Ferreira, G. (2019). Métodos de Inventário.",
      "2. Almeida, S. (2020). Técnicas de Amostragem."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "É um método de amostragem probabilística."
  },

  // Carta 44: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Fiscalização Surpresa",
    pergunta: "Uma fiscalização encontrou irregularidades.",
    opcoes: [
      { id: 1, texto: "Regularizar a situação imediatamente." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Legislação Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 5 moedas ou 2 estrelas.",
    dica: ""
  },

  // Carta 45: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Projeto Educacional",
    pergunta: "Você iniciou um projeto educacional na comunidade.",
    opcoes: [
      { id: 1, texto: "Ensinar sobre a importância da conservação." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Educação Ambiental"],
    fontes: [],
    vantagem: "Ganhe 1 estrela e remova 2 erros do seu contador.",
    desvantagem: "",
    dica: ""
  },

  // Carta 46: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Zona Ripária",
    pergunta: "A zona ripária refere-se a:",
    opcoes: [
      { id: 1, texto: "Área desértica com pouca vegetação" },
      { id: 2, texto: "Área montanhosa acima de 1000 metros" },
      { id: 3, texto: "Área adjacente a corpos d'água, como rios e lagos" },
      { id: 4, texto: "Área urbana com alta densidade populacional" },
      { id: 5, texto: "Área de floresta boreal" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Nascimento, L. (2019). Ecossistemas Aquáticos.",
      "2. Albuquerque, M. (2020). Áreas Ripárias."
    ],
    vantagem: "Ganhe 1 contador de progresso.",
    desvantagem: "Perde 1 estrela.",
    dica: "São áreas críticas para a qualidade da água."
  },

  // Carta 47: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Deslizamento de Terra",
    pergunta: "Um deslizamento afetou sua área de manejo.",
    opcoes: [
      { id: 1, texto: "Realizar recuperação ambiental." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Gestão de Riscos"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e fique uma rodada sem jogar.",
    dica: ""
  },

  // Carta 48: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Clímax Florestal",
    pergunta: "O clímax em uma sucessão ecológica é:",
    opcoes: [
      { id: 1, texto: "O início do processo de sucessão" },
      { id: 2, texto: "Uma perturbação ambiental" },
      { id: 3, texto: "O estágio final e estável da comunidade" },
      { id: 4, texto: "A fase de invasão por espécies exóticas" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Silva, J. (2018). Sucessão Ecológica.",
      "2. Pereira, L. (2019). Comunidades Vegetais."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "É o ponto de equilíbrio do ecossistema."
  },

  // Carta 49: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Apoio Governamental",
    pergunta: "Você recebeu apoio governamental para seu projeto.",
    opcoes: [
      { id: 1, texto: "Expandir as atividades de manejo sustentável." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Gestão Florestal"],
    fontes: [],
    vantagem: "Ganhe 5 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 50: Outras
  {
    tipo: "Outras",
    titulo: "Troca de Experiências",
    pergunta: "Você participou de um congresso internacional.",
    opcoes: [
      { id: 1, texto: "Aplicar os conhecimentos adquiridos." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Educação e Pesquisa"],
    fontes: [],
    vantagem: "Remova 2 erros do seu contador ou ganhe 1 estrela.",
    desvantagem: "",
    dica: ""
  },
 
  // Carta 51: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Espécies Sombra",
    pergunta: "Qual das seguintes espécies é considerada uma espécie sombra em florestas nativas?",
    opcoes: [
      { id: 1, texto: "Ipê-amarelo (Tabebuia serratifolia)" },
      { id: 2, texto: "Castanheira (Bertholletia excelsa)" },
      { id: 3, texto: "Araucária (Araucaria angustifolia)" },
      { id: 4, texto: "Embaúba (Cecropia spp.)" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Estrutura Florestal"],
    fontes: [
      "1. Silva, J. (2020). Ecologia Florestal.",
      "2. Pereira, L. (2019). Botânica Florestal."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Espécies sombra são adaptadas para crescer sob a copa de outras árvores."
  },

  // Carta 52: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Silvicultura",
    pergunta: "Você implementou práticas de silvicultura sustentável.",
    opcoes: [
      { id: 1, texto: "Continuar com as práticas para melhorar a estrutura florestal." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Silvicultura"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e avance 3 casas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 53: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Desastre Natural",
    pergunta: "Um tufão atingiu sua área de manejo, causando danos significativos.",
    opcoes: [
      { id: 1, texto: "Iniciar recuperação imediata da área." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Gestão de Riscos"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 5 moedas.",
    dica: ""
  },

  // Carta 54: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Cobertura Vegetal",
    pergunta: "A cobertura vegetal em uma floresta influencia:",
    opcoes: [
      { id: 1, texto: "A taxa de fotossíntese apenas" },
      { id: 2, texto: "A regulação do clima local" },
      { id: 3, texto: "A biodiversidade e a proteção do solo" },
      { id: 4, texto: "Todas as anteriores" }
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Estrutura Florestal"],
    fontes: [
      "1. Lima, F. (2018). Dinâmica de Ecossistemas.",
      "2. Mendes, A. (2019). Cobertura Vegetal em Florestas."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Cobertura vegetal é essencial para a saúde do ecossistema."
  },

  // Carta 55: Outras
  {
    tipo: "Outras",
    titulo: "Pesquisa Científica",
    pergunta: "Você conduziu uma pesquisa sobre a dinâmica de espécies na floresta.",
    opcoes: [
      { id: 1, texto: "Publicar os resultados e aplicar os conhecimentos adquiridos." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Pesquisa e Desenvolvimento"],
    fontes: [],
    vantagem: "Ganhe 1 contador de progresso e 2 estrelas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 56: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Biodiversidade Funcional",
    pergunta: "O que é biodiversidade funcional em ecossistemas florestais?",
    opcoes: [
      { id: 1, texto: "Variedade de espécies em um ecossistema" },
      { id: 2, texto: "Diversidade genética dentro de uma espécie" },
      { id: 3, texto: "Variedade de funções ecológicas desempenhadas pelas espécies" },
      { id: 4, texto: "Distribuição espacial das espécies" },
      { id: 5, texto: "Níveis tróficos em uma cadeia alimentar" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Ecologia"],
    fontes: [
      "1. Carvalho, D. (2021). Ecologia Funcional.",
      "2. Santos, E. (2020). Biodiversidade e Funcionalidade."
    ],
    vantagem: "Ganhe 2 contadores de progresso.",
    desvantagem: "Perde 3 estrelas.",
    dica: "Biodiversidade funcional refere-se às funções ecológicas que as espécies desempenham."
  },

  // Carta 57: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Gestão Integrada",
    pergunta: "Você adotou uma abordagem de gestão integrada para manejar a floresta.",
    opcoes: [
      { id: 1, texto: "Equilibrar produção, conservação e bem-estar social." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Gestão Integrada"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 58: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falta de Recursos",
    pergunta: "Sua equipe enfrenta falta de recursos para continuar o manejo.",
    opcoes: [
      { id: 1, texto: "Buscar financiamento adicional ou reduzir atividades." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Gestão de Recursos"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 moedas e 1 estrela.",
    dica: ""
  },

  // Carta 59: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Espécies Indígenas",
    pergunta: "Espécies indígenas são aquelas que:",
    opcoes: [
      { id: 1, texto: "São encontradas em várias regiões do mundo" },
      { id: 2, texto: "São nativas de uma região específica" },
      { id: 3, texto: "São sempre árvores de grande porte" },
      { id: 4, texto: "São introduzidas por atividades humanas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Biodiversidade"],
    fontes: [
      "1. Silva, K. (2018). Espécies Indígenas.",
      "2. Ramos, J. (2019). Conservação de Espécies Nativas."
    ],
    vantagem: "Avance 1 casa.",
    desvantagem: "Perde 1 estrela.",
    dica: "Indígenas são nativas de uma região específica."
  },

  // Carta 60: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Tecnologia de Monitoramento",
    pergunta: "Você implementou tecnologia avançada de monitoramento na floresta.",
    opcoes: [
      { id: 1, texto: "Utilizar sensores para acompanhar a saúde das árvores." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Tecnologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 contador de progresso.",
    desvantagem: "",
    dica: ""
  },

  // Carta 61: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Habitat",
    pergunta: "Uma parte da floresta foi desmatada ilegalmente.",
    opcoes: [
      { id: 1, texto: "Reverter o desmatamento e restaurar a área." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Conservação"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 contadores de progresso.",
    dica: ""
  },

  // Carta 62: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Serviços Ecossistêmicos",
    pergunta: "Qual dos seguintes é um serviço ecossistêmico fornecido pelas florestas nativas?",
    opcoes: [
      { id: 1, texto: "Produção de energia elétrica" },
      { id: 2, texto: "Regulação do clima" },
      { id: 3, texto: "Manutenção de estradas" },
      { id: 4, texto: "Desenvolvimento urbano" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Serviços Ecossistêmicos"],
    fontes: [
      "1. Lima, M. (2020). Serviços Ecossistêmicos.",
      "2. Andrade, F. (2019). Ecologia Aplicada."
    ],
    vantagem: "Ganhe 2 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Florestas ajudam a regular o clima global."
  },

  // Carta 63: Outras
  {
    tipo: "Outras",
    titulo: "Implementação de Zonesamento Ecológico",
    pergunta: "Você estabeleceu zonas de uso na floresta para manejo adequado.",
    opcoes: [
      { id: 1, texto: "Definir áreas para conservação e áreas para exploração sustentável." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Planejamento Florestal"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e remova 1 erro do seu contador.",
    desvantagem: "",
    dica: ""
  },

  // Carta 64: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Biomassa Florestal",
    pergunta: "Biomassa florestal refere-se a:",
    opcoes: [
      { id: 1, texto: "Volume total de madeira disponível para corte" },
      { id: 2, texto: "Peso total da matéria orgânica nas árvores e no solo" },
      { id: 3, texto: "Número de espécies em uma floresta" },
      { id: 4, texto: "Altura média das árvores" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Fisiologia Florestal"],
    fontes: [
      "1. Barros, S. (2018). Biomassa e Ecossistemas.",
      "2. Costa, L. (2019). Estudos de Biomassa."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Inclui a matéria orgânica acima e abaixo do solo."
  },

  // Carta 65: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Colaboração Interinstitucional",
    pergunta: "Você firmou uma parceria com outra instituição para manejo.",
    opcoes: [
      { id: 1, texto: "Compartilhar recursos e conhecimentos." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Colaboração"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 66: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Contaminação do Solo",
    pergunta: "Produtos químicos foram liberados na floresta, contaminando o solo.",
    opcoes: [
      { id: 1, texto: "Realizar descontaminação e restaurar a área afetada." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Sanidade Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 2 contadores de progresso.",
    dica: ""
  },

  // Carta 67: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Manejo de Espécies",
    pergunta: "Qual é o objetivo principal do manejo de espécies em florestas nativas?",
    opcoes: [
      { id: 1, texto: "Eliminar todas as espécies invasoras" },
      { id: 2, texto: "Promover a diversidade e saúde da floresta" },
      { id: 3, texto: "Aumentar a produção de madeira" },
      { id: 4, texto: "Facilitar o acesso para madeireiros" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo de Espécies"],
    fontes: [
      "1. Lima, F. (2018). Manejo de Espécies.",
      "2. Mendes, A. (2019). Diversidade e Saúde Florestal."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Foca na saúde e equilíbrio do ecossistema."
  },

  // Carta 68: Outras
  {
    tipo: "Outras",
    titulo: "Implementação de Trilhas de Uso Múltiplo",
    pergunta: "Você criou trilhas que permitem múltiplos usos sustentáveis na floresta.",
    opcoes: [
      { id: 1, texto: "Facilitar acesso para monitoramento, pesquisa e recreação." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Infraestrutura Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e avance 2 casas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 69: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Ecosserviços",
    pergunta: "Qual dos seguintes é um ecosserviço fornecido pelas florestas nativas?",
    opcoes: [
      { id: 1, texto: "Produção de plástico" },
      { id: 2, texto: "Regulação de nutrientes no solo" },
      { id: 3, texto: "Construção de edifícios" },
      { id: 4, texto: "Produção de combustíveis fósseis" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Serviços Ecossistêmicos"],
    fontes: [
      "1. Lima, M. (2020). Serviços Ecossistêmicos.",
      "2. Andrade, F. (2019). Ecologia Aplicada."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Regulação de nutrientes é crucial para a fertilidade do solo."
  },

  // Carta 70: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Buffer Zones",
    pergunta: "Você estabeleceu zonas de proteção (buffer zones) ao redor de corpos d'água.",
    opcoes: [
      { id: 1, texto: "Proteger a qualidade da água e prevenir erosão." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Conservação da Água"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e remova 1 erro do contador.",
    desvantagem: "",
    dica: ""
  },

  // Carta 71: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Acidente com Equipamento",
    pergunta: "Um acidente com equipamentos de manejo ocorreu na floresta.",
    opcoes: [
      { id: 1, texto: "Realizar manutenção e treinamento adicionais." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Segurança no Manejo"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: ""
  },

  // Carta 72: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Sucessão Primária",
    pergunta: "Sucessão primária ocorre em áreas que:",
    opcoes: [
      { id: 1, texto: "Já possuem uma floresta madura" },
      { id: 2, texto: "São recém-formadas, sem solo pré-existente" },
      { id: 3, texto: "Sofreram desmatamento recente" },
      { id: 4, texto: "Têm presença de espécies invasoras" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Sucessão Ecológica"],
    fontes: [
      "1. Silva, J. (2018). Sucessão Ecológica.",
      "2. Pereira, L. (2019). Dinâmica de Ecossistemas."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Sucessão primária ocorre sem solo pré-existente."
  },

  // Carta 73: Outras
  {
    tipo: "Outras",
    titulo: "Conferência Ambiental",
    pergunta: "Você participou de uma conferência sobre manejo florestal sustentável.",
    opcoes: [
      { id: 1, texto: "Aplicar as melhores práticas aprendidas." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Educação e Pesquisa"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 contador de progresso.",
    desvantagem: "",
    dica: ""
  },

  // Carta 74: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Zonas de Conservação",
    pergunta: "As zonas de conservação em florestas nativas servem para:",
    opcoes: [
      { id: 1, texto: "Permitir a exploração intensiva de recursos" },
      { id: 2, texto: "Proteção de áreas sensíveis e biodiversidade" },
      { id: 3, texto: "Facilitar o acesso para turistas" },
      { id: 4, texto: "Reduzir a biodiversidade" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação"],
    fontes: [
      "1. Lima, M. (2020). Conservação Florestal.",
      "2. Andrade, F. (2019). Proteção de Biodiversidade."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Zonas de conservação visam preservar a biodiversidade."
  },

  // Carta 75: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Tecnologias Limpas",
    pergunta: "Você implementou tecnologias limpas em suas operações de manejo.",
    opcoes: [
      { id: 1, texto: "Reduzir o impacto ambiental das atividades." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Tecnologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 76: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falta de Mão de Obra",
    pergunta: "Sua equipe está enfrentando escassez de mão de obra qualificada.",
    opcoes: [
      { id: 1, texto: "Contratar temporariamente ou treinar a equipe existente." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Gestão de Pessoas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: ""
  },

  // Carta 77: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Ciclo de Nutrientes",
    pergunta: "Qual é a importância do ciclo de nutrientes em florestas nativas?",
    opcoes: [
      { id: 1, texto: "Aumentar a disponibilidade de nutrientes no solo" },
      { id: 2, texto: "Reduzir a biodiversidade" },
      { id: 3, texto: "Facilitar a erosão do solo" },
      { id: 4, texto: "Aumentar a compactação do solo" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal"],
    fontes: [
      "1. Silva, J. (2018). Ciclo de Nutrientes.",
      "2. Pereira, L. (2019). Ecologia de Solos."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Ciclo de nutrientes mantém a fertilidade do solo."
  },

  // Carta 78: Outras
  {
    tipo: "Outras",
    titulo: "Intervenção Governamental",
    pergunta: "O governo implementou novas políticas de manejo florestal.",
    opcoes: [
      { id: 1, texto: "Adaptar-se às novas regulamentações." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Legislação Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e remova 1 erro do contador.",
    desvantagem: "",
    dica: ""
  },

  // Carta 79: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Reflorestamento",
    pergunta: "Reflorestamento refere-se a:",
    opcoes: [
      { id: 1, texto: "Desmatamento controlado" },
      { id: 2, texto: "Plantio de árvores em áreas desmatadas" },
      { id: 3, texto: "Construção de infraestruturas florestais" },
      { id: 4, texto: "Corte seletivo de árvores" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Reflorestamento"],
    fontes: [
      "1. Barros, S. (2018). Técnicas de Reflorestamento.",
      "2. Costa, L. (2019). Recuperação de Áreas Degradadas."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Reflorestamento ajuda na recuperação de áreas desmatadas."
  },

  // Carta 80: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Monitoramento Remoto",
    pergunta: "Você instalou sistemas de monitoramento remoto na floresta.",
    opcoes: [
      { id: 1, texto: "Melhorar a vigilância e a resposta a ameaças." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Tecnologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  {
    tipo: "Pergunta",
    titulo: "Estrutura Vertical",
    pergunta: "A estrutura vertical de uma floresta inclui todas as seguintes camadas EXCETO:",
    opcoes: [
      { id: 1, texto: "Dossel" },
      { id: 2, texto: "Sub-bosque" },
      { id: 3, texto: "Camada de solo" },
      { id: 4, texto: "Estrato arbustivo" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Estrutura Florestal"],
    fontes: [
      "1. Silva, J. (2020). Estrutura Vertical das Florestas.",
      "2. Pereira, L. (2019). Botânica Florestal."
    ],
    vantagem: "Avance 1 casa.",
    desvantagem: "Perde 1 estrela.",
    dica: "A camada de solo é considerada horizontal, não vertical."
  },

  // Carta 82: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Criação de Refúgios de Vida Silvestre",
    pergunta: "Você criou refúgios de vida silvestre na sua área de manejo.",
    opcoes: [
      { id: 1, texto: "Aumentar a biodiversidade e atrair fauna local." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Conservação"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 83: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Invasão de Animais Silvestres",
    pergunta: "Animais silvestres invadiram sua área de manejo, causando danos.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de controle humanitário." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Sanidade Florestal"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: ""
  },

  // Carta 84: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Estratos da Floresta",
    pergunta: "Quais são os principais estratos em uma floresta tropical?",
    opcoes: [
      { id: 1, texto: "Dossel, Sub-bosque, Herbáceo" },
      { id: 2, texto: "Camada de solo, Dossel, Arbustivo" },
      { id: 3, texto: "Estrato arbustivo, Sub-bosque, Dossel" },
      { id: 4, texto: "Estrato arbustivo, Herbáceo, Camada de solo" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Estrutura Florestal"],
    fontes: [
      "1. Lima, F. (2018). Estrutura das Florestas Tropicais.",
      "2. Mendes, A. (2019). Ecologia de Florestas."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Os estratos são organizados verticalmente."
  },

  // Carta 85: Outras
  {
    tipo: "Outras",
    titulo: "Implementação de Sistemas Agroflorestais",
    pergunta: "Você implementou sistemas agroflorestais em sua área.",
    opcoes: [
      { id: 1, texto: "Integrar agricultura com manejo florestal sustentável." }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Agroflorestas"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e remova 1 erro do contador.",
    desvantagem: "",
    dica: ""
  },

  // Carta 86: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Espécies Clímax",
    pergunta: "Espécies clímax em uma sucessão ecológica são aquelas que:",
    opcoes: [
      { id: 1, texto: "São as primeiras a colonizar áreas abertas" },
      { id: 2, texto: "Têm rápido crescimento e curto ciclo de vida" },
      { id: 3, texto: "Dominam na fase madura do ecossistema" },
      { id: 4, texto: "São sempre espécies invasoras" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Sucessão Ecológica"],
    fontes: [
      "1. Silva, J. (2018). Sucessão Ecológica.",
      "2. Pereira, L. (2019). Comunidades Vegetais."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "Espécies clímax são aquelas que dominam o ecossistema em estágios avançados."
  },

  // Carta 87: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Uso de Drones para Monitoramento",
    pergunta: "Você utiliza drones para monitorar a saúde da floresta.",
    opcoes: [
      { id: 1, texto: "Obter dados precisos e em tempo real." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Tecnologia Florestal"],
    fontes: [],
    vantagem: "Ganhe 3 moedas e 1 contador de progresso.",
    desvantagem: "",
    dica: ""
  },
  // Carta 88: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Corredores Ecológicos",
    pergunta: "Qual é a principal função dos corredores ecológicos em florestas nativas?",
    opcoes: [
      { id: 1, texto: "Isolar espécies ameaçadas" },
      { id: 2, texto: "Conectar fragmentos de habitats" },
      { id: 3, texto: "Aumentar a produção de madeira" },
      { id: 4, texto: "Facilitar a expansão urbana" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação", "Dinâmica Florestal"],
    fontes: [
      "1. Barros, S. (2018). Corredores Ecológicos e Conectividade.",
      "2. Costa, L. (2019). Conservação de Paisagens."
    ],
    vantagem: "Remova 1 erro por cada estrela que possui.",
    desvantagem: "Adicione 1 erro por cada estrela que possui.",
    dica: "Eles facilitam o fluxo gênico entre populações."
  },

  // Carta 89: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Agricultura de Baixo Impacto",
    pergunta: "Você adotou práticas de agricultura de baixo impacto em áreas adjacentes à floresta.",
    opcoes: [
      { id: 1, texto: "Manter a sustentabilidade e proteger a floresta." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo Sustentável", "Agricultura Sustentável"],
    fontes: [],
    vantagem: "Ganhe 2 estrelas e avance 3 casas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 90: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Desmatamento Ilegal",
    pergunta: "Você foi flagrado desmatando ilegalmente.",
    opcoes: [
      { id: 1, texto: "Regularizar a situação e pagar multas." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Legislação Florestal", "Gestão de Riscos"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 5 moedas e 2 estrelas.",
    dica: ""
  },

  // Carta 91: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Silvicultura Sustentável",
    pergunta: "Qual das seguintes práticas NÃO é considerada parte da silvicultura sustentável?",
    opcoes: [
      { id: 1, texto: "Corte seletivo de árvores maduras" },
      { id: 2, texto: "Reflorestamento com espécies nativas" },
      { id: 3, texto: "Aumento da densidade de plantio sem controle" },
      { id: 4, texto: "Monitoramento pós-colheita" },
      { id: 5, texto: "Proteção contra pragas e doenças" }
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Silvicultura", "Manejo Sustentável"],
    fontes: [
      "1. Carvalho, D. (2021). Técnicas de Manejo Florestal.",
      "2. Santos, E. (2020). Práticas Sustentáveis em Florestas Nativas."
    ],
    vantagem: "Ganhe 1 contador de progresso e 2 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O aumento descontrolado da densidade prejudica o crescimento."
  },

  // Carta 92: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Ações de Conservação",
    pergunta: "Você implementou ações de conservação para proteger espécies ameaçadas.",
    opcoes: [
      { id: 1, texto: "Continuar com as ações para garantir a preservação." }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Conservação", "Gestão de Biodiversidade"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e 5 moedas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 93: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Invasão de Espécies Exóticas",
    pergunta: "Espécies exóticas estão se estabelecendo em sua área de manejo.",
    opcoes: [
      { id: 1, texto: "Implementar controle de espécies invasoras." }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Sanidade Florestal", "Conservação"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: ""
  },

  // Carta 94: Pergunta Normal
  {
    tipo: "Pergunta",
    titulo: "Ciclo Hidrológico",
    pergunta: "Como o manejo florestal afeta o ciclo hidrológico?",
    opcoes: [
      { id: 1, texto: "Reduz a infiltração de água no solo" },
      { id: 2, texto: "Aumenta a evapotranspiração" },
      { id: 3, texto: "Mantém a qualidade e quantidade de água" },
      { id: 4, texto: "Não tem impacto significativo" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Ecologia Florestal", "Manejo Sustentável"],
    fontes: [
      "1. Lima, F. (2018). Ciclo Hidrológico em Ecossistemas.",
      "2. Mendes, A. (2019). Gestão de Recursos Hídricos."
    ],
    vantagem: "Ganhe 2 estrelas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O manejo adequado preserva os recursos hídricos."
  },

  // Carta 95: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Projetos de Pesquisa",
    pergunta: "Seu projeto de pesquisa sobre dinâmica florestal foi bem-sucedido.",
    opcoes: [
      { id: 1, texto: "Publicar os resultados e expandir o projeto." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Pesquisa e Desenvolvimento"],
    fontes: [],
    vantagem: "Ganhe 4 moedas e 1 estrela.",
    desvantagem: "",
    dica: ""
  },

  // Carta 96: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Perda de Biodiversidade",
    pergunta: "Há uma redução significativa na biodiversidade da sua área de manejo.",
    opcoes: [
      { id: 1, texto: "Implementar medidas de recuperação e conservação." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Conservação", "Gestão de Biodiversidade"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 3 estrelas e 4 moedas.",
    dica: ""
  },

  // Carta 97: Pergunta Fácil
  {
    tipo: "Pergunta",
    titulo: "Estrutura Vertical",
    pergunta: "Qual camada da floresta é responsável pela maior parte da fotossíntese?",
    opcoes: [
      { id: 1, texto: "Sub-bosque" },
      { id: 2, texto: "Dossel" },
      { id: 3, texto: "Solo" },
      { id: 4, texto: "Camada de arbustos" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Estrutura Florestal"],
    fontes: [
      "1. Silva, J. (2020). Estrutura das Florestas Tropicais.",
      "2. Pereira, L. (2019). Fisiologia Vegetal."
    ],
    vantagem: "Avance 2 casas.",
    desvantagem: "Perde 1 estrela.",
    dica: "O dossel é a camada mais alta da floresta."
  },

  // Carta 98: Vantagem
  {
    tipo: "Vantagem",
    titulo: "Implementação de Sistemas Agroflorestais",
    pergunta: "Você integrou sistemas agroflorestais em sua área de manejo.",
    opcoes: [
      { id: 1, texto: "Promover a diversidade e a sustentabilidade." }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Agricultura Sustentável", "Manejo Integrado"],
    fontes: [],
    vantagem: "Ganhe 3 estrelas e 4 moedas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 99: Desvantagem
  {
    tipo: "Desvantagem",
    titulo: "Falha na Reflorestamento",
    pergunta: "Seu projeto de reflorestamento teve alta taxa de mortalidade das mudas.",
    opcoes: [
      { id: 1, texto: "Reavaliar técnicas de plantio e implementação." }
    ],
    respostaCorreta: [],
    dificuldade: "dificil",
    categorias: ["Reflorestamento", "Gestão de Projetos"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 2 estrelas e 3 moedas.",
    dica: ""
  },

  // Carta 100: Pergunta Difícil
  {
    tipo: "Pergunta",
    titulo: "Modelagem de Dinâmica Florestal",
    pergunta: "Qual das seguintes ferramentas é comumente utilizada para modelar a dinâmica florestal?",
    opcoes: [
      { id: 1, texto: "GIS (Sistemas de Informação Geográfica)" },
      { id: 2, texto: "R (Software Estatístico)" },
      { id: 3, texto: "Cortiça de papel" },
      { id: 4, texto: "Photoshop" },
      { id: 5, texto: "AutoCAD" }
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Modelagem Florestal", "Tecnologia em Manejo"],
    fontes: [
      "1. Fernandes, H. (2021). Ferramentas de Modelagem Florestal.",
      "2. Costa, S. (2020). Tecnologias em Gestão Florestal."
    ],
    vantagem: "Ganhe 2 contadores de progresso e 3 moedas.",
    desvantagem: "Perde 1 estrela.",
    dica: "GIS é fundamental para análise espacial."
  },
 
    // Carta 101 Pergunta Fácil - Integrando Contadores
  {
    tipo: "Pergunta",
    titulo: "Ciclo de Vida das Árvores",
    pergunta: "As árvores pioneiras são as primeiras a colonizar áreas abertas em florestas nativas.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Nativas"],
    fontes: [
      "1. Silva, J. (2020). Ecologia Florestal.",
      "2. Pereira, L. (2019). Sucessão Ecológica."
    ],
    vantagem: "Avance o número de casas igual ao seu contador de respostas corretas.",
    desvantagem: "Volte o número de casas igual ao seu contador de respostas erradas.",
    dica: "Pioneiras são espécies que iniciam a sucessão ecológica."
  },

  // Carta 102 - Carta de Vantagem - Troca de Estrelas por Moedas
  {
    tipo: "Vantagem",
    titulo: "Comércio Justo",
    pergunta: "Você pode trocar suas estrelas por moedas para comprar itens na Venda.",
    opcoes: [
      { id: 1, texto: "Trocar 1 estrela por 5 moedas" },
      { id: 2, texto: "Trocar 2 estrelas por 12 moedas" },
      { id: 3, texto: "Não trocar agora" }
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Manejo de Nativas"],
    fontes: [],
    vantagem: "Obtenha moedas extras para futuras compras!",
    desvantagem: "",
    dica: ""
  },

  // Carta 103 - Pergunta Normal - Impacto nos Contadores
  {
    tipo: "Pergunta",
    titulo: "Taxa de Crescimento",
    pergunta: "A taxa de crescimento das árvores em uma floresta nativa é constante ao longo do ano.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo de Nativas"],
    fontes: [
      "1. Lima, F. (2018). Dinâmica Florestal.",
      "2. Mendes, A. (2019). Fisiologia de Árvores."
    ],
    vantagem: "Ganhe uma estrela e remova 2 erros do seu contador.",
    desvantagem: "Perde uma estrela e adicione 2 erros ao seu contador.",
    dica: "Fatores sazonais influenciam o crescimento."
  },

  // Carta 104 - Carta de Desvantagem - Ficar Preso ou Perder Estrelas
  {
    tipo: "Desvantagem",
    titulo: "Fiscalização Ambiental",
    pergunta: "Você foi autuado por irregularidades no manejo.",
    opcoes: [
      { id: 1, texto: "Ficar preso por uma rodada" },
      { id: 2, texto: "Perder 2 estrelas" }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Nativas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Escolha uma penalidade para cumprir.",
    dica: ""
  },

  // Carta 105 - Pergunta Difícil - Avançar ou Voltar com Base nos Contadores
  {
    tipo: "Pergunta",
    titulo: "Métodos de Inventário",
    pergunta: "Qual dos seguintes métodos é utilizado para estimar a biomassa em florestas nativas?",
    opcoes: [
      { id: 1, texto: "Parcelas Permanentes" },
      { id: 2, texto: "Método de Bitterlich" },
      { id: 3, texto: "Censo Populacional" },
      { id: 4, texto: "Método de Quadrantes" },
      { id: 5, texto: "Análise de Tronco" }
    ],
    respostaCorreta: [1, 2],
    dificuldade: "dificil",
    categorias: ["Manejo de Nativas"],
    fontes: [
      "1. Carvalho, D. (2021). Inventário Florestal.",
      "2. Santos, E. (2020). Técnicas de Mensuração Florestal."
    ],
    vantagem: "Avance o número de casas igual ao seu contador de progresso.",
    desvantagem: "Volte o número de casas igual ao seu contador de erros.",
    dica: "Parcelas permanentes e método de Bitterlich são comumente usados."
  },

  // Carta 106 - Carta de Vantagem - Remover Erros ou Ganhar Estrelas
  {
    tipo: "Vantagem",
    titulo: "Capacitação em Manejo",
    pergunta: "Você participou de um curso avançado em manejo florestal.",
    opcoes: [
      { id: 1, texto: "Remover 3 erros do contador" },
      { id: 2, texto: "Ganhar 2 estrelas" }
    ],
    respostaCorreta: [1, 2],
    dificuldade: "facil",
    categorias: ["Manejo de Nativas"],
    fontes: [],
    vantagem: "Escolha como quer se beneficiar do seu aprimoramento!",
    desvantagem: "",
    dica: ""
  },

  // Carta 107 - Pergunta Normal - Troca de Estrelas por Diminuição de Erros
  {
    tipo: "Pergunta",
    titulo: "Espécies Invasoras",
    pergunta: "A introdução de espécies exóticas pode ameaçar a biodiversidade das florestas nativas.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Nativas"],
    fontes: [
      "1. Nascimento, L. (2019). Impacto de Espécies Invasoras.",
      "2. Albuquerque, M. (2020). Conservação Florestal."
    ],
    vantagem: "Troque 1 estrela para remover 2 erros do seu contador.",
    desvantagem: "Adicione 2 erros ao seu contador ou perca 1 estrela.",
    dica: "Espécies exóticas podem competir com nativas."
  },

  // Carta 108 - Carta de Outras - Avançar Baseado em Acertos
  {
    tipo: "Outras",
    titulo: "Reconhecimento Científico",
    pergunta: "Seu trabalho em manejo florestal recebeu um prêmio.",
    opcoes: [
      { id: 1, texto: "Celebrar o reconhecimento!" }
    ],
    respostaCorreta: [1],
    dificuldade: "normal",
    categorias: ["Manejo de Nativas"],
    fontes: [],
    vantagem: "Avance o número de casas igual ao seu contador de respostas corretas.",
    desvantagem: "",
    dica: ""
  },

  // Carta 109 - Pergunta Fácil - Impacto nos Contadores
  {
    tipo: "Pergunta",
    titulo: "Biodiversidade",
    pergunta: "A biodiversidade é um indicador importante da saúde de uma floresta nativa.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo de Nativas"],
    fontes: [
      "1. Silva, K. (2018). Biodiversidade Florestal.",
      "2. Ramos, J. (2019). Ecologia de Ecossistemas."
    ],
    vantagem: "Ganhe 1 estrela por cada 3 acertos que possui.",
    desvantagem: "Perde 1 estrela por cada 3 erros que possui.",
    dica: "Mais espécies geralmente indicam um ecossistema saudável."
  },

  // Carta 110 - Carta de Desvantagem - Voltar Casas e Afetar Outros Jogadores
  {
    tipo: "Desvantagem",
    titulo: "Conflito Territorial",
    pergunta: "Disputas de terra afetam seu projeto de manejo.",
    opcoes: [
      { id: 1, texto: "Voltar 3 casas e o jogador à sua esquerda volta 2 casas" }
    ],
    respostaCorreta: [],
    dificuldade: "normal",
    categorias: ["Manejo de Nativas"],
    fontes: [],
    vantagem: "",
    desvantagem: "Consequências aplicadas a você e outro jogador.",
    dica: ""
  },

  // Carta 111 - Pergunta Difícil - Troca de Estrelas por Progresso
  {
    tipo: "Pergunta",
    titulo: "Regulamentações Ambientais",
    pergunta: "Qual legislação brasileira regula o manejo sustentável de florestas nativas?",
    opcoes: [
      { id: 1, texto: "Lei da Mata Atlântica" },
      { id: 2, texto: "Código Florestal" },
      { id: 3, texto: "Lei de Crimes Ambientais" },
      { id: 4, texto: "Política Nacional do Meio Ambiente" },
      { id: 5, texto: "Lei de Gestão de Florestas Públicas" }
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo de Nativas"],
    fontes: [
      "1. Ferreira, L. (2019). Legislação Florestal.",
      "2. Sousa, P. (2020). Política Ambiental no Brasil."
    ],
    vantagem: "Troque 2 estrelas para ganhar 1 contador de progresso.",
    desvantagem: "Adicione 2 erros ao seu contador ou perca 1 contador de progresso.",
    dica: "O Código Florestal estabelece regras para uso e proteção das florestas."
  },

  // Carta 112 - Carta de Vantagem - Avançar com Base nas Estrelas
  {
    tipo: "Vantagem",
    titulo: "Financiamento Extra",
    pergunta: "Você recebeu um financiamento adicional para pesquisa.",
    opcoes: [
      { id: 1, texto: "Investir no projeto." }
    ],
    respostaCorreta: [1],
    dificuldade: "facil",
    categorias: ["Manejo de Nativas"],
    fontes: [],
    vantagem: "Avance o número de casas igual às estrelas que possui.",
    desvantagem: "",
    dica: ""
  },

  // Carta 113 - Pergunta Normal - Remover Erros Baseado em Estrelas
  {
    tipo: "Pergunta",
    titulo: "Corredores Ecológicos",
    pergunta: "Corredores ecológicos conectam fragmentos florestais, permitindo fluxo genético entre populações.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo de Nativas"],
    fontes: [
      "1. Barros, S. (2018). Fragmentação Florestal.",
      "2. Costa, L. (2019). Conservação de Paisagens."
    ],
    vantagem: "Remova 1 erro para cada estrela que possui.",
    desvantagem: "Adicione 1 erro para cada estrela que possui.",
    dica: "Corredores ajudam a manter a biodiversidade."
  },

  // Carta 114 - Carta de Outras - Troca de Estrelas por Diminuição de Erros
  {
    tipo: "Outras",
    titulo: "Programa de Recuperação",
    pergunta: "Você tem a chance de participar de um programa de recuperação ambiental.",
    opcoes: [
      { id: 1, texto: "Trocar 1 estrela para remover 3 erros do contador" },
      { id: 2, texto: "Manter suas estrelas atuais" }
    ],
    respostaCorreta: [1, 2],
    dificuldade: "normal",
    categorias: ["Manejo de Nativas"],
    fontes: [],
    vantagem: "Opção de reduzir erros em troca de estrelas.",
    desvantagem: "",
    dica: ""
  }
    
];

export default manejo_nativas_cards;

