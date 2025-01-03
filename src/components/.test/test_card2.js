const test_card = [
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
    categorias: ["_test"],
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
    categorias: ["_test"],
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
    categorias: ["_test"],
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
    categorias: ["_test"],
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
    categorias: ["_test"],
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
    categorias: ["_test"],
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
    categorias: ["_test"],
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
    categorias: ["_test"],
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
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["_test"],
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
    categorias: ["_test"],
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
    categorias: ["_test"],
    fontes: [],
    vantagem: "Ganhe 3 pontos!",
    desvantagem: "Perde 1 ponto.",
    dica: "Pense na sequência lógica das etapas."
  },
  {
    tipo: "Vantagem",
    titulo: "As Estrelas",
    pergunta: `<img src="/5.jpg" style="display: block; margin: 0 auto; width: 150px; height: auto;" alt="Descrição da imagem" />
      Saudações, <b>jogador(a)</b>! <br> <br> Somos as estrelas, <br>os seres antigos e sábios que iluminam o cosmos. Por eras, mantivemos o equilíbrio e a harmonia do universo. Mas uma nova ameaça surgiu, os alienígenas com sua terrível máquina, a Stronberis. Precisamos de sua ajuda para proteger a galáxia e impedir que eles dominem tudo com suas tecnologias malignas. Contamos com você.`,
    opcoes: [
      { id: 1, texto: "Ganhe 1 estrela" },
    ],
    respostaCorreta: [1],
    dificuldade: "facil",
    categorias: ["_test"],
    fontes: ["Imagens: Fonte na descrição do jogo"],
    vantagem: "",
    desvantagem: "",
    dica: "",
  },  
  {
    tipo: "Outras",
    titulo: "Solaris, a Máquina Estelar",
    pergunta: "Você enfrentou desafios inigualáveis, superou todos os obstáculos e agora está diante do último passo. A vitória está ao seu alcance, mas lembre-se, o preço da vitória é alto. Está pronto para fazer o sacrifício final e conquistar o que é seu por direito? O cosmos espera pela sua decisão.",
    opcoes: [
      { id: 1, texto: "Avance 15 casas do tabuleiro, mas para isso, você deve sacrificar todas as suas estrelas" },
      { id: 2, texto: "Cada jogador, exceto você, perde metade de suas estrelas, e você volta 10 casas" },
      { id: 3, texto: "Todos os jogadores, incluindo você, voltam 5 casas (os efeitos das casa não serão aplicados)" },
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["_test"],
    fontes: ["Imagens: Fonte na descrição do jogo"],
    vantagem: "",
    desvantagem: "",
    dica: "",
  },
  {
    tipo: "Outras",
    titulo: "Estrela Vermelha Renegada",
    pergunta: "Você achou que as estrelas estavam ao seu lado, mas a verdade é que a lealdade é uma moeda fácil de ser trocada. Nós, as Estrelas Vermelhas, nunca fomos completamente leais. A rebelião está em nosso sangue, e agora chegou o momento de reivindicar o que é nosso. Jogador, prepare-se para enfrentar a traição em sua forma mais pura.",
    opcoes: [
      { id: 1, texto: "Troque de lugar com o jogador a sua esquerda e em seguida volte 5 casas" },
    ],
    respostaCorreta: [1],
    dificuldade: "facil",
    categorias: ["_test"],
    fontes: ["Imagens: Fonte na descrição do jogo"],
    vantagem: "",
    desvantagem: "",
    dica: "",
  }
];

export default test_card;
