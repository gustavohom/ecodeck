// components/cartas.js

const cartas = [

  // Pergunta Fácil com Verdadeiro ou Falso
  {
    "tipo": "Pergunta",
    "titulo": "Impacto das Energias Renováveis",
    "pergunta": "A energia solar é uma fonte inesgotável de energia e não emite gases poluentes durante seu uso.",
    "opcoes": [
      { "id": 1, "texto": "Verdadeiro" },
      { "id": 2, "texto": "Falso" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "facil",
    "categorias": ["Energias Renováveis", "Sustentabilidade"],
    "fontes": [
      "1. Silva, A. (2023). Fontes de Energia e o Futuro.",
      "2. Rocha, B. (2022). Energia Sustentável para Todos."
    ],
    "vantagem": "Avance uma casa!",
    "desvantagem": "Volte uma casa.",
    "dica": "A energia solar é limpa e renovável."
  },

  // Pergunta Fácil com 4 Alternativas e uma Resposta Correta
  {
    "tipo": "Pergunta",
    "titulo": "Reciclagem de Materiais",
    "pergunta": "Qual desses materiais é considerado o mais reciclável?",
    "opcoes": [
      { "id": 1, "texto": "Plástico" },
      { "id": 2, "texto": "Vidro" },
      { "id": 3, "texto": "Papelão" },
      { "id": 4, "texto": "Isopor" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "facil",
    "categorias": ["Reciclagem", "Sustentabilidade"],
    "fontes": [
      "1. Costa, M. (2023). O Guia Completo da Reciclagem.",
      "2. Almeida, P. (2022). Reciclagem e Meio Ambiente."
    ],
    "vantagem": "Ganhe 2 pontos extra!",
    "desvantagem": "Perda de 1 ponto.",
    "dica": "Pense em algo que pode ser reciclado infinitamente."
  },

  // Pergunta Fácil com 5 Alternativas e Duas Respostas Corretas
  {
    "tipo": "Pergunta",
    "titulo": "Plantas Medicinais",
    "pergunta": "Quais dessas plantas são conhecidas por suas propriedades medicinais?",
    "opcoes": [
      { "id": 1, "texto": "Camomila" },
      { "id": 2, "texto": "Margarida" },
      { "id": 3, "texto": "Alecrim" },
      { "id": 4, "texto": "Dente-de-leão" },
      { "id": 5, "texto": "Flor de Lis" }
    ],
    "respostaCorreta": [1, 3],
    "dificuldade": "facil",
    "categorias": ["Plantas Medicinais", "Saúde"],
    "fontes": [
      "1. Fernandes, T. (2023). O Poder das Plantas Medicinais.",
      "2. Ribeiro, L. (2022). Ervas que Curam."
    ],
    "vantagem": "Escolha uma planta para ganhar 2 pontos!",
    "desvantagem": "Perde 1 ponto.",
    "dica": "Camomila e alecrim são populares na medicina herbal."
  },

  // Pergunta Normal com 4 Alternativas e uma Resposta Correta com Imagem
  {
    "tipo": "Pergunta",
    "titulo": "Efeito Estufa",
    "pergunta": `O que mais contribui para o efeito estufa?
    <img src="/5.jpg" alt="Efeito Estufa" class="img-media my-4" />`,
    "opcoes": [
      { "id": 1, "texto": "Energia Eólica" },
      { "id": 2, "texto": "Combustíveis Fósseis" },
      { "id": 3, "texto": "Energia Solar" },
      { "id": 4, "texto": "Plantas Marinhas" }
    ],
    "respostaCorreta": 2,
    "dificuldade": "normal",
    "categorias": ["Meio Ambiente", "Clima"],
    "fontes": [
      "1. Oliveira, R. (2023). Mudanças Climáticas e Efeito Estufa.",
      "2. Silva, A. (2022). Aquecimento Global e o Futuro do Planeta."
    ],
    "vantagem": "Ganhe 3 pontos!",
    "desvantagem": "Perde 2 pontos.",
    "dica": "Os combustíveis fósseis são uma grande fonte de gases do efeito estufa."
  },

  // Pergunta Difícil com 5 Alternativas, uma Resposta Correta e Imagem
  {
    "tipo": "Pergunta",
    "titulo": "Florestas Tropicais",
    "pergunta": `Qual é o principal fator que ameaça as florestas tropicais?
    <img src="/7.jpg" alt="Florestas Tropicais" class="img-grande my-4" />`,
    "opcoes": [
      { "id": 1, "texto": "Desmatamento para Agricultura" },
      { "id": 2, "texto": "Conservação Ambiental" },
      { "id": 3, "texto": "Turismo Sustentável" },
      { "id": 4, "texto": "Programas de Reflorestamento" },
      { "id": 5, "texto": "Mudança para Energias Renováveis" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "dificil",
    "categorias": ["Florestas", "Conservação"],
    "fontes": [
      "1. Souza, E. (2023). Protegendo Nossas Florestas Tropicais.",
      "2. Costa, M. (2022). A Batalha Contra o Desmatamento."
    ],
    "vantagem": "Ganhe 4 pontos e avance 2 casas!",
    "desvantagem": "Perde 3 pontos e volte 1 casa.",
    "dica": "A agricultura é uma das maiores ameaças às florestas."
  },

  // Cartas do Tipo Outras

  // Carta para Escolher uma entre 3 Vantagens (todas respostas corretas)
  {
    "tipo": "Vantagem",
    "titulo": "Escolha sua Recompensa",
    "pergunta": "Escolha uma vantagem entre as opções abaixo:",
    "opcoes": [
      { "id": 1, "texto": "Jogue novamente" },
      { "id": 2, "texto": "Avance 3 casas" },
      { "id": 3, "texto": "Receba um bônus de 10 MM" }
    ],
    "respostaCorreta": [1, 2, 3],
    "dificuldade": "facil",
    "categorias": ["Recompensas"],
    "fontes": [],
    "vantagem": "Todas as opções são vantajosas!",
    "desvantagem": "",
    "dica": ""
  },

  // Carta para Escolher uma entre 3 Desvantagens (todas respostas erradas)
  {
    "tipo": "Desvantagem",
    "titulo": "Escolha sua Penalidade",
    "pergunta": "Escolha uma desvantagem entre as opções abaixo:",
    "opcoes": [
      { "id": 1, "texto": "Perde 5 pontos" },
      { "id": 2, "texto": "Volte 3 casas" },
      { "id": 3, "texto": "Perca um turno" }
    ],
    "respostaCorreta": [],
    "dificuldade": "facil",
    "categorias": ["Penalidades"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Todas as opções são desvantajosas!",
    "dica": ""
  },

  // Carta contendo apenas uma Alternativa (Vantagem)
  {
    "tipo": "Vantagem",
    "titulo": "Recompensa Especial",
    "pergunta": "Você ganhou um bônus especial!",
    "opcoes": [
      { "id": 1, "texto": "Entendi" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "facil",
    "categorias": ["Recompensas"],
    "fontes": [],
    "vantagem": "Receba um bônus de 20 MM!",
    "desvantagem": "",
    "dica": ""
  },

  // Carta contendo apenas uma Alternativa (Desvantagem)
  {
    "tipo": "Desvantagem",
    "titulo": "Penalidade Especial",
    "pergunta": "Você perdeu uma rodada!",
    "opcoes": [
      { "id": 1, "texto": "Estou triste mas entendi" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "facil",
    "categorias": ["Penalidades"],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "Perca uma rodada e 5 pontos.",
    "dica": ""
  },
  {
    "tipo": "Outras",
    "titulo": "Reset seus contadores",
    "pergunta": "Aperte o botão de zerar seus contadores. Entretanto mantenha todos os contadores de progresso que você possuí (acrescente-os manualmente)",
    "opcoes": [
      { "id": 1, "texto": "Entendi" }
    ],
    "respostaCorreta": 1,
    "dificuldade": "facil",
    "categorias": ["Outras"],
    "fontes": [],
    "vantagem": "Resetado",
    "desvantagem": "",
    "dica": ""
  },
];

export default cartas;
