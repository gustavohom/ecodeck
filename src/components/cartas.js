// components/cartas.js

const cartas = [
  // Perguntas Fáceis - Verdadeiro ou Falso
  {
    tipo: "Pergunta",
    titulo: "Manejo Florestal de Plantadas",
    pergunta:
      "O manejo florestal sustentável de florestas plantadas sempre resulta em maior biodiversidade.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal de Plantadas"],
    fontes: [
      "1. Santos, A. (2024). Introdução ao Manejo Florestal de Plantadas.",
      "2. Pereira, J. (2023). Princípios de Sustentabilidade Florestal.",
    ],
    vantagem: "Você ganha uma carta bônus!",
    desvantagem: "Perca 2 pontos.",
    dica: "Considere os efeitos da monocultura.",
  },
  {
    tipo: "Pergunta",
    titulo: "Silvicultura Básica",
    pergunta:
      "Silvicultura refere-se exclusivamente ao cultivo de árvores para madeira.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Almeida, R. (2024). Conceitos Fundamentais de Silvicultura.",
      "2. Gomes, L. (2023). A Importância da Silvicultura.",
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte uma casa.",
    dica: "Silvicultura é mais do que apenas madeira.",
  },
  {
    tipo: "Pergunta",
    titulo: "Inventário Florestal",
    pergunta: "Inventário florestal é realizado apenas para avaliação econômica.",
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Inventário Florestal"],
    fontes: [
      "1. Oliveira, T. (2024). Técnicas de Inventário Florestal.",
      "2. Silva, M. (2023). Inventário Florestal: Aplicações e Métodos.",
    ],
    vantagem: "Ganhe 3 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Considera aspectos além da economia.",
  },

  // Perguntas Fáceis - Mais de uma Alternativa Correta
  {
    tipo: "Pergunta",
    titulo: "Espécies Nativas do Brasil",
    pergunta: "Quais dessas espécies são nativas do Brasil?",
    opcoes: [
      { id: 1, texto: "Ipê-amarelo" },
      { id: 2, texto: "Eucalipto" },
      { id: 3, texto: "Copaíba" },
      { id: 4, texto: "Pau-brasil" },
      { id: 5, texto: "Carvalho" },
    ],
    respostaCorreta: [1, 3, 4],
    dificuldade: "facil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Fernandes, E. (2024). Guia de Árvores Nativas do Brasil.",
      "2. Ribeiro, F. (2023). Conservação de Espécies Nativas.",
    ],
    vantagem: "Escolha duas casas para avançar!",
    desvantagem: "Perca uma casa.",
    dica: "Pense nas espécies endêmicas.",
  },
  {
    tipo: "Pergunta",
    titulo: "Silvicultura de Precisão",
    pergunta: "Quais práticas estão associadas à silvicultura de precisão?",
    opcoes: [
      { id: 1, texto: "Monitoramento remoto" },
      { id: 2, texto: "Poda manual" },
      { id: 3, texto: "Uso de drones" },
      { id: 4, texto: "Análise de dados geoespaciais" },
      { id: 5, texto: "Colheita convencional" },
    ],
    respostaCorreta: [1, 3, 4],
    dificuldade: "facil",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Silva, J. (2024). Tecnologias na Silvicultura.",
      "2. Castro, R. (2023). Inovações em Silvicultura.",
    ],
    vantagem: "Receba um bônus de 5 pontos!",
    desvantagem: "Perde 2 pontos.",
    dica: "A precisão envolve tecnologia.",
  },
  {
    tipo: "Pergunta",
    titulo: "Objetivos do Inventário Florestal",
    pergunta: "Quais são objetivos do inventário florestal?",
    opcoes: [
      { id: 1, texto: "Avaliação econômica" },
      { id: 2, texto: "Estimativa de biodiversidade" },
      { id: 3, texto: "Medição de volume de madeira" },
      { id: 4, texto: "Monitoramento de saúde florestal" },
      { id: 5, texto: "Estudo de solo" },
    ],
    respostaCorreta: [1, 2, 3, 4],
    dificuldade: "facil",
    categorias: ["Inventário Florestal"],
    fontes: [
      "1. Lima, A. (2024). Inventário Florestal: Práticas e Aplicações.",
      "2. Cardoso, P. (2023). Métodos de Inventário Florestal.",
    ],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Os objetivos são variados.",
  },

  // Perguntas Fáceis - Uma Resposta Correta
  {
    tipo: "Pergunta",
    titulo: "Dendrometria Básica",
    pergunta: "O que é medido pela dendrometria?",
    opcoes: [
      { id: 1, texto: "Altura das árvores" },
      { id: 2, texto: "Cor das folhas" },
      { id: 3, texto: "Tipo de solo" },
      { id: 4, texto: "Presença de fauna" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Dendrometria"],
    fontes: [
      "1. Moreira, L. (2024). Introdução à Dendrometria.",
      "2. Santos, M. (2023). Práticas de Medição em Florestas.",
    ],
    vantagem: "Ganhe 1 ponto extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Mede dimensões da árvore.",
  },
  {
    tipo: "Pergunta",
    titulo: "Propagação de Espécies",
    pergunta: "Qual método é mais comum para propagar Eucalyptus?",
    opcoes: [
      { id: 1, texto: "Sementes" },
      { id: 2, texto: "Enxertia" },
      { id: 3, texto: "Mudas clonadas" },
      { id: 4, texto: "Divisão de raízes" },
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Costa, R. (2024). Métodos de Propagação de Espécies.",
      "2. Oliveira, N. (2023). Práticas em Silvicultura.",
    ],
    vantagem: "Avance 1 casa!",
    desvantagem: "Volte uma casa.",
    dica: "Métodos comerciais são preferidos.",
  },
  {
    tipo: "Pergunta",
    titulo: "Espécies Invasoras",
    pergunta: "Qual dessas é considerada uma espécie invasora no Brasil?",
    opcoes: [
      { id: 1, texto: "Pinus" },
      { id: 2, texto: "Jacarandá" },
      { id: 3, texto: "Pau-brasil" },
      { id: 4, texto: "Copaíba" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Carvalho, J. (2024). Impacto das Espécies Invasoras.",
      "2. Lima, F. (2023). Conservação de Florestas Nativas.",
    ],
    vantagem: "Você ganha uma carta bônus!",
    desvantagem: "Perca 2 pontos.",
    dica: "Esta árvore é comumente plantada, mas não é nativa.",
  },
  {
    tipo: "Pergunta",
    titulo: "Classificação de Solos",
    pergunta: "Qual classe de solo é mais adequada para plantios de Eucalyptus?",
    opcoes: [
      { id: 1, texto: "Latossolo" },
      { id: 2, texto: "Argissolo" },
      { id: 3, texto: "Neossolo" },
      { id: 4, texto: "Gleissolo" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Santos, D. (2024). Solo e Silvicultura.",
      "2. Moraes, L. (2023). Avaliação de Solos para Florestas.",
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte uma casa.",
    dica: "Solos profundos e bem drenados são preferidos.",
  },
  {
    tipo: "Pergunta",
    titulo: "Espécies Exóticas",
    pergunta: "Qual dessas é uma espécie exótica cultivada no Brasil?",
    opcoes: [
      { id: 1, texto: "Eucalyptus" },
      { id: 2, texto: "Ipê-roxo" },
      { id: 3, texto: "Cedro" },
      { id: 4, texto: "Copaíba" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Manejo Florestal de Plantadas"],
    fontes: [
      "1. Costa, M. (2024). Introdução às Espécies Exóticas.",
      "2. Almeida, P. (2023). Cultivo de Espécies Florestais.",
    ],
    vantagem: "Ganhe 3 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "É amplamente utilizado para celulose.",
  },
  {
    tipo: "Pergunta",
    titulo: "Dendrometria Avançada",
    pergunta: "Qual é a fórmula correta para o cálculo do volume de uma árvore?",
    opcoes: [
      { id: 1, texto: "Altura x DAP x 0.7" },
      { id: 2, texto: "Altura x DAP x Forma" },
      { id: 3, texto: "DAP x Área basal" },
      { id: 4, texto: "Altura x Forma" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Dendrometria"],
    fontes: [
      "1. Souza, A. (2024). Fórmulas de Dendrometria.",
      "2. Lima, T. (2023). Mensuração Florestal.",
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte uma casa.",
    dica: "Lembre-se da importância do coeficiente de forma.",
  },
  {
    tipo: "Pergunta",
    titulo: "Sistemas Agroflorestais",
    pergunta: "Qual é uma característica de um sistema agroflorestal?",
    opcoes: [
      { id: 1, texto: "Monocultura" },
      { id: 2, texto: "Diversidade de espécies" },
      { id: 3, texto: "Uso exclusivo de químicos" },
      { id: 4, texto: "Produção apenas de madeira" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal de Plantadas"],
    fontes: [
      "1. Ferreira, G. (2024). Práticas em Sistemas Agroflorestais.",
      "2. Carvalho, J. (2023). Agroflorestas e Sustentabilidade.",
    ],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Os sistemas agroflorestais promovem a biodiversidade.",
  },
  {
    tipo: "Pergunta",
    titulo: "Biomassa Florestal",
    pergunta: "Qual componente contribui mais para a biomassa de uma floresta?",
    opcoes: [
      { id: 1, texto: "Folhas" },
      { id: 2, texto: "Tronco" },
      { id: 3, texto: "Raízes" },
      { id: 4, texto: "Galhos" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Dendrometria"],
    fontes: [
      "1. Sousa, H. (2024). Biomassa em Florestas.",
      "2. Martins, R. (2023). Estudo da Biomassa Florestal.",
    ],
    vantagem: "Ganhe 1 ponto extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "É a parte mais volumosa da árvore.",
  },
  {
    tipo: "Pergunta",
    titulo: "Impacto da Silvicultura",
    pergunta: "Qual prática silvicultural ajuda na conservação do solo?",
    opcoes: [
      { id: 1, texto: "Queima controlada" },
      { id: 2, texto: "Plantio direto" },
      { id: 3, texto: "Corte raso" },
      { id: 4, texto: "Poda severa" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Costa, R. (2024). Práticas de Conservação na Silvicultura.",
      "2. Oliveira, M. (2023). Silvicultura e Sustentabilidade.",
    ],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Evita o revolvimento do solo.",
  },

  // Perguntas Normais
  {
    tipo: "Pergunta",
    titulo: "Estrutura de Dossel",
    pergunta: "Qual é a principal função do dossel em uma floresta?",
    opcoes: [
      { id: 1, texto: "Proteção do solo" },
      { id: 2, texto: "Controle do clima" },
      { id: 3, texto: "Suporte à fauna" },
      { id: 4, texto: "Redução de competição" },
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Almeida, C. (2024). Ecologia de Florestas Tropicais.",
      "2. Ribeiro, S. (2023). Dinâmica do Dossel Florestal.",
    ],
    vantagem: "Avance 3 casas!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Muitas espécies dependem do dossel para sobrevivência.",
  },
  {
    tipo: "Pergunta",
    titulo: "Metodologia de Inventário",
    pergunta:
      "Qual método é utilizado para estimar a biomassa em inventários florestais?",
    opcoes: [
      { id: 1, texto: "Método de quadrantes" },
      { id: 2, texto: "Método de parcelas permanentes" },
      { id: 3, texto: "Método de linha reta" },
      { id: 4, texto: "Método de captura e recaptura" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Inventário Florestal"],
    fontes: [
      "1. Cardoso, F. (2024). Técnicas de Inventário e Mensuração.",
      "2. Lima, A. (2023). Avaliação de Biomassa Florestal.",
    ],
    vantagem: "Ganhe 3 pontos extra!",
    desvantagem: "Perda de 2 pontos.",
    dica: "O método envolve repetidas medições ao longo do tempo.",
  },
  {
    tipo: "Pergunta",
    titulo: "Dinâmica Florestal",
    pergunta:
      "Qual fator influencia mais a regeneração natural em florestas tropicais?",
    opcoes: [
      { id: 1, texto: "Precipitação" },
      { id: 2, texto: "Solo" },
      { id: 3, texto: "Cobertura de dossel" },
      { id: 4, texto: "Presença de herbívoros" },
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Souza, P. (2024). Regeneração Natural em Florestas Tropicais.",
      "2. Gomes, V. (2023). Fatores que Influenciam a Regeneração Florestal.",
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte uma casa.",
    dica: "A luz e o microclima desempenham papéis cruciais.",
  },
  {
    tipo: "Pergunta",
    titulo: "Espécies Tolerantes à Sombra",
    pergunta: "Qual espécie é conhecida por sua tolerância à sombra?",
    opcoes: [
      { id: 1, texto: "Copaíba" },
      { id: 2, texto: "Jacarandá" },
      { id: 3, texto: "Ipê-amarelo" },
      { id: 4, texto: "Cedro" },
    ],
    respostaCorreta: 4,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Ribeiro, L. (2024). Adaptações de Espécies Florestais.",
      "2. Oliveira, N. (2023). Tolerância à Sombra em Florestas.",
    ],
    vantagem: "Ganhe 3 pontos extra!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Pense em árvores que crescem sob o dossel.",
  },
  {
    tipo: "Pergunta",
    titulo: "Crescimento de Eucalyptus",
    pergunta: "Qual é o ciclo de corte típico para plantações de Eucalyptus?",
    opcoes: [
      { id: 1, texto: "2-4 anos" },
      { id: 2, texto: "5-7 anos" },
      { id: 3, texto: "8-10 anos" },
      { id: 4, texto: "12-15 anos" },
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Plantadas"],
    fontes: [
      "1. Carvalho, R. (2024). Ciclos de Corte em Plantações Florestais.",
      "2. Almeida, P. (2023). Práticas de Cultivo de Eucalyptus.",
    ],
    vantagem: "Avance 1 casa!",
    desvantagem: "Volte uma casa.",
    dica: "O ciclo de corte depende do produto final desejado.",
  },
  {
    tipo: "Pergunta",
    titulo: "Desenho de Experimentos",
    pergunta: "Qual é o objetivo principal do desenho de experimentos em florestas?",
    opcoes: [
      { id: 1, texto: "Maximizar a colheita" },
      { id: 2, texto: "Estudar efeitos de tratamentos" },
      { id: 3, texto: "Aumentar a biodiversidade" },
      { id: 4, texto: "Melhorar a qualidade do solo" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Inventário Florestal"],
    fontes: [
      "1. Lima, G. (2024). Métodos de Pesquisa em Florestas.",
      "2. Sousa, J. (2023). Análise de Experimentos Florestais.",
    ],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Trata-se de validar hipóteses com dados controlados.",
  },
  {
    tipo: "Pergunta",
    titulo: "Restauração Florestal",
    pergunta: "Qual é a melhor prática para restauração de florestas degradadas?",
    opcoes: [
      { id: 1, texto: "Plantio de espécies exóticas" },
      { id: 2, texto: "Uso de espécies nativas" },
      { id: 3, texto: "Controle químico" },
      { id: 4, texto: "Monocultura" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Ferreira, A. (2024). Práticas de Restauração Ecológica.",
      "2. Oliveira, T. (2023). Métodos de Restauração Florestal.",
    ],
    vantagem: "Avance 3 casas!",
    desvantagem: "Perda de 2 pontos.",
    dica: "A biodiversidade é fundamental para a restauração.",
  },
  {
    tipo: "Pergunta",
    titulo: "Pragas Florestais",
    pergunta: "Qual praga é comumente encontrada em plantações de Eucalyptus?",
    opcoes: [
      { id: 1, texto: "Broca-da-madeira" },
      { id: 2, texto: "Cupins" },
      { id: 3, texto: "Lagarta-do-pinheiro" },
      { id: 4, texto: "Ácaro-da-telha" },
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Plantadas"],
    fontes: [
      "1. Almeida, V. (2024). Pragas em Florestas Comerciais.",
      "2. Santos, L. (2023). Controle de Pragas Florestais.",
    ],
    vantagem: "Ganhe 2 pontos extra!",
    desvantagem: "Perda de 1 ponto.",
    dica: "Esta praga ataca diretamente a madeira.",
  },
  {
    tipo: "Pergunta",
    titulo: "Ciclo do Carbono",
    pergunta: "Qual prática florestal contribui para o sequestro de carbono?",
    opcoes: [
      { id: 1, texto: "Corte raso" },
      { id: 2, texto: "Reflorestamento" },
      { id: 3, texto: "Queima controlada" },
      { id: 4, texto: "Desbaste seletivo" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Costa, S. (2024). Mudanças Climáticas e Florestas.",
      "2. Ribeiro, P. (2023). Florestas e o Ciclo do Carbono.",
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte uma casa.",
    dica: "Novas árvores absorvem CO2 da atmosfera.",
  },
  {
    tipo: "Pergunta",
    titulo: "Erros em Mensuração",
    pergunta: "Qual erro é mais comum ao medir o DAP de árvores?",
    opcoes: [
      { id: 1, texto: "Erro de paralaxe" },
      { id: 2, texto: "Erro de inclinação" },
      { id: 3, texto: "Erro de altura" },
      { id: 4, texto: "Erro de calibração" },
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Dendrometria"],
    fontes: [
      "1. Sousa, M. (2024). Erros em Mensuração Florestal.",
      "2. Almeida, J. (2023). Precisão em Dendrometria.",
    ],
    vantagem: "Ganhe 3 pontos extra!",
    desvantagem: "Perda de 2 pontos.",
    dica: "O erro ocorre devido à visão incorreta da escala.",
  },
  {
    tipo: "Pergunta",
    titulo: "Erosão do Solo",
    pergunta: "Qual prática reduz a erosão do solo em florestas?",
    opcoes: [
      { id: 1, texto: "Desbaste total" },
      { id: 2, texto: "Cobertura vegetal permanente" },
      { id: 3, texto: "Corte raso" },
      { id: 4, texto: "Queima controlada" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Carvalho, B. (2024). Conservação do Solo em Florestas.",
      "2. Pereira, H. (2023). Manejo de Solo em Áreas Florestais.",
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte uma casa.",
    dica: "A proteção contínua do solo é chave.",
  },
  {
    tipo: "Pergunta",
    titulo: "Sistemas Radiculares",
    pergunta: "Qual sistema radicular é mais profundo?",
    opcoes: [
      { id: 1, texto: "Fasciculado" },
      { id: 2, texto: "Pivotante" },
      { id: 3, texto: "Adventício" },
      { id: 4, texto: "Radial" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Martins, G. (2024). Estruturas Radiculares das Árvores.",
      "2. Lima, P. (2023). Sistemas Radiculares em Espécies Florestais.",
    ],
    vantagem: "Ganhe 3 pontos extra!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Este sistema se desenvolve verticalmente no solo.",
  },
  {
    tipo: "Pergunta",
    titulo: "Legislação Florestal",
    pergunta: "Qual é a principal função do Código Florestal Brasileiro?",
    opcoes: [
      { id: 1, texto: "Aumentar a produção de madeira" },
      { id: 2, texto: "Proteger áreas de preservação permanente" },
      { id: 3, texto: "Controlar preços de madeira" },
      { id: 4, texto: "Permitir a exploração de todas as áreas" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Souza, R. (2024). Legislação Ambiental e Florestal.",
      "2. Ribeiro, D. (2023). Código Florestal: Diretrizes e Aplicações.",
    ],
    vantagem: "Avance 3 casas!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Foca em proteção e conservação.",
  },
  {
    tipo: "Pergunta",
    titulo: "Manejo de Fogo",
    pergunta: "Qual é o objetivo do manejo integrado do fogo em florestas?",
    opcoes: [
      { id: 1, texto: "Eliminar toda a vegetação" },
      { id: 2, texto: "Prevenir incêndios descontrolados" },
      { id: 3, texto: "Aumentar a temperatura do solo" },
      { id: 4, texto: "Promover crescimento rápido" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Oliveira, A. (2024). Gestão de Incêndios Florestais.",
      "2. Lima, S. (2023). Práticas de Manejo do Fogo.",
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte uma casa.",
    dica: "O controle é crucial para evitar desastres.",
  },
  {
    tipo: "Pergunta",
    titulo: "Qualidade da Madeira",
    pergunta: "Qual fator afeta a qualidade da madeira para uso em móveis?",
    opcoes: [
      { id: 1, texto: "Velocidade de crescimento" },
      { id: 2, texto: "Tipo de solo" },
      { id: 3, texto: "Espessura da casca" },
      { id: 4, texto: "Altura da árvore" },
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Dendrometria"],
    fontes: [
      "1. Santos, F. (2024). Propriedades da Madeira para Móveis.",
      "2. Oliveira, M. (2023). Avaliação da Qualidade da Madeira.",
    ],
    vantagem: "Ganhe 3 pontos extra!",
    desvantagem: "Perda de 2 pontos.",
    dica: "Um crescimento mais lento tende a resultar em madeira mais densa.",
  },
  {
    tipo: "Pergunta",
    titulo: "Gestão de Recursos Hídricos",
    pergunta: "Como as florestas contribuem para a gestão de recursos hídricos?",
    opcoes: [
      { id: 1, texto: "Aumentando a erosão do solo" },
      { id: 2, texto: "Reduzindo a infiltração de água" },
      { id: 3, texto: "Ajudando na recarga de aquíferos" },
      { id: 4, texto: "Aumentando a salinidade do solo" },
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Carvalho, E. (2024). Florestas e Recursos Hídricos.",
      "2. Pereira, L. (2023). Importância das Florestas na Gestão da Água.",
    ],
    vantagem: "Avance 2 casas!",
    desvantagem: "Volte uma casa.",
    dica: "Pense no ciclo da água e no papel das florestas.",
  },

  // Perguntas Difíceis
  {
    tipo: "Pergunta",
    titulo: "Diversidade Genética",
    pergunta: "Por que a diversidade genética é importante em florestas?",
    opcoes: [
      { id: 1, texto: "Promove a uniformidade das espécies" },
      { id: 2, texto: "Facilita o controle de pragas" },
      { id: 3, texto: "Aumenta a resiliência a doenças" },
      { id: 4, texto: "Reduz a competição por recursos" },
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Souza, H. (2024). Genética Florestal e Conservação.",
      "2. Ferreira, T. (2023). Importância da Diversidade Genética.",
    ],
    vantagem: "Avance 4 casas!",
    desvantagem: "Perda de 3 pontos.",
    dica: "A diversidade ajuda na adaptação a mudanças ambientais.",
  },
  {
    tipo: "Pergunta",
    titulo: "Planejamento Florestal",
    pergunta: "Qual é o primeiro passo no planejamento de um manejo florestal?",
    opcoes: [
      { id: 1, texto: "Colheita de madeira" },
      { id: 2, texto: "Inventário florestal" },
      { id: 3, texto: "Estudo de impacto ambiental" },
      { id: 4, texto: "Seleção de espécies" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal de Plantadas"],
    fontes: [
      "1. Almeida, J. (2024). Princípios de Planejamento Florestal.",
      "2. Lima, F. (2023). Estratégias de Manejo Florestal.",
    ],
    vantagem: "Ganhe 4 pontos extra!",
    desvantagem: "Perda de 3 pontos.",
    dica: "É necessário avaliar o que se tem antes de decidir o que fazer.",
  },
  {
    tipo: "Pergunta",
    titulo: "Modelagem de Crescimento",
    pergunta:
      "Qual modelo é mais utilizado para prever o crescimento de florestas?",
    opcoes: [
      { id: 1, texto: "Modelo de regressão linear" },
      { id: 2, texto: "Modelo de crescimento logístico" },
      { id: 3, texto: "Modelo de crescimento exponencial" },
      { id: 4, texto: "Modelo de crescimento polinomial" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Inventário Florestal"],
    fontes: [
      "1. Cardoso, A. (2024). Modelos de Crescimento Florestal.",
      "2. Santos, G. (2023). Previsão de Crescimento de Florestas.",
    ],
    vantagem: "Avance 4 casas!",
    desvantagem: "Perda de 3 pontos.",
    dica: "O modelo considera limites ambientais e competitivos.",
  },
  {
    tipo: "Pergunta",
    titulo: "Impacto das Mudanças Climáticas",
    pergunta:
      "Como as mudanças climáticas afetam mais diretamente as florestas?",
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Redução da área de floresta" },
      { id: 3, texto: "Melhoria na qualidade do solo" },
      { id: 4, texto: "Aumento do ciclo de carbono" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Pereira, M. (2024). Efeitos das Mudanças Climáticas em Florestas.",
      "2. Almeida, F. (2023). Florestas e Clima: Desafios e Soluções.",
    ],
    vantagem: "Ganhe 4 pontos extra!",
    desvantagem: "Perda de 3 pontos.",
    dica: "Considere os impactos físicos e ecológicos.",
  },
  {
    tipo: "Pergunta",
    titulo: "Defensivos Florestais",
    pergunta:
      "Qual é o maior desafio no uso de defensivos químicos em florestas?",
    opcoes: [
      { id: 1, texto: "Eficiência do produto" },
      { id: 2, texto: "Custo de aplicação" },
      { id: 3, texto: "Impacto ambiental" },
      { id: 4, texto: "Disponibilidade no mercado" },
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Silvicultura"],
    fontes: [
      "1. Silva, J. (2024). Uso de Defensivos em Florestas.",
      "2. Costa, E. (2023). Práticas Sustentáveis na Silvicultura.",
    ],
    vantagem: "Ganhe 4 pontos extra!",
    desvantagem: "Perda de 3 pontos.",
    dica: "O foco é evitar danos ao ecossistema.",
  },
  {
    tipo: "Pergunta",
    titulo: "Sistemas de Colheita",
    pergunta: "Qual é o sistema de colheita mais sustentável em florestas?",
    opcoes: [
      { id: 1, texto: "Corte raso" },
      { id: 2, texto: "Seleção individual" },
      { id: 3, texto: "Colheita por faixa" },
      { id: 4, texto: "Sistema de talhadia" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Oliveira, R. (2024). Métodos de Colheita Sustentável.",
      "2. Almeida, C. (2023). Estratégias de Colheita em Florestas.",
    ],
    vantagem: "Avance 4 casas!",
    desvantagem: "Perda de 3 pontos.",
    dica: "Permite a regeneração natural da floresta.",
  },
  {
    tipo: "Pergunta",
    titulo: "Gestão de Conflitos",
    pergunta: "Qual é o maior desafio na gestão de conflitos em áreas florestais?",
    opcoes: [
      { id: 1, texto: "Acesso à tecnologia" },
      { id: 2, texto: "Pressões sociais e econômicas" },
      { id: 3, texto: "Disponibilidade de mão de obra" },
      { id: 4, texto: "Infraestrutura local" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Santos, H. (2024). Conflitos Socioambientais em Florestas.",
      "2. Oliveira, S. (2023). Gestão de Conflitos em Áreas Florestais.",
    ],
    vantagem: "Ganhe 4 pontos extra!",
    desvantagem: "Perda de 3 pontos.",
    dica: "Envolve o equilíbrio entre conservação e necessidades humanas.",
  },
  {
    tipo: "Pergunta",
    titulo: "Produtos Florestais Não Madeireiros",
    pergunta: "Qual é o produto florestal não madeireiro mais comercializado?",
    opcoes: [
      { id: 1, texto: "Óleo de Copaíba" },
      { id: 2, texto: "Castanha-do-pará" },
      { id: 3, texto: "Açaí" },
      { id: 4, texto: "Látex" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal de Nativas"],
    fontes: [
      "1. Ferreira, M. (2024). Produtos Não Madeireiros: Potencial e Desafios.",
      "2. Souza, A. (2023). Economia de Produtos Florestais.",
    ],
    vantagem: "Ganhe 4 pontos extra!",
    desvantagem: "Perda de 3 pontos.",
    dica: "É uma importante fonte de renda para comunidades locais.",
  },

  // Vantagens
  {
    tipo: "Vantagem",
    titulo: "Vantagem Estratégica",
    pergunta: "Escolha uma vantagem para progredir no jogo.",
    opcoes: [
      { id: 1, texto: "Avance 5 casas" },
      { id: 2, texto: "Ganhe 10 pontos" },
      { id: 3, texto: "Receba um bônus de 15 MM" },
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Todas as opções oferecem benefícios!",
    desvantagem: "",
    dica: "",
  },
  {
    tipo: "Vantagem",
    titulo: "Bônus Especial",
    pergunta: "Você encontrou um item raro! Escolha uma recompensa:",
    opcoes: [
      { id: 1, texto: "Ganhe um turno extra" },
      { id: 2, texto: "Avance para a próxima etapa" },
      { id: 3, texto: "Dobrar seus pontos atuais" },
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Escolha qualquer opção para ganhar!",
    desvantagem: "",
    dica: "",
  },
  {
    tipo: "Vantagem",
    titulo: "Surpresa Florestal",
    pergunta: "Uma oportunidade única! Qual vantagem você deseja?",
    opcoes: [
      { id: 1, texto: "Ganhe 20 pontos extras" },
      { id: 2, texto: "Avance 7 casas" },
      { id: 3, texto: "Triplique seus bônus de MM" },
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Aproveite qualquer opção para se beneficiar!",
    desvantagem: "",
    dica: "",
  },
  {
    tipo: "Vantagem",
    titulo: "Avanço Rápido",
    pergunta: "Escolha seu benefício para avançar no jogo.",
    opcoes: [
      { id: 1, texto: "Avance 10 casas" },
      { id: 2, texto: "Receba 5 pontos extras" },
      { id: 3, texto: "Ganhe um prêmio surpresa" },
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Recompensas"],
    fontes: [],
    vantagem: "Todas as opções são vantajosas!",
    desvantagem: "",
    dica: "",
  },

  // Desvantagens
  {
    tipo: "Desvantagem",
    titulo: "Penalidade Imediata",
    pergunta: "Escolha uma penalidade para enfrentar.",
    opcoes: [
      { id: 1, texto: "Perda de 10 pontos" },
      { id: 2, texto: "Volte 4 casas" },
      { id: 3, texto: "Perca um turno" },
    ],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Todas as opções são desvantajosas!",
    dica: "",
  },
  {
    tipo: "Desvantagem",
    titulo: "Reversão de Sorte",
    pergunta: "Escolha uma desvantagem a ser enfrentada:",
    opcoes: [
      { id: 1, texto: "Redução de 5 MM" },
      { id: 2, texto: "Perda de todos os pontos extras" },
      { id: 3, texto: "Volte ao início da etapa" },
    ],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Todas as opções resultam em perdas!",
    dica: "",
  },
  {
    tipo: "Desvantagem",
    titulo: "Desafio Adicional",
    pergunta: "Escolha uma penalidade para prosseguir:",
    opcoes: [
      { id: 1, texto: "Perda de 20 pontos" },
      { id: 2, texto: "Volte 6 casas" },
      { id: 3, texto: "Perca dois turnos" },
    ],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Cada escolha leva a um revés!",
    dica: "",
  },
  {
    tipo: "Desvantagem",
    titulo: "Recuo Estratégico",
    pergunta: "Escolha uma penalidade para o próximo turno:",
    opcoes: [
      { id: 1, texto: "Volte 3 casas" },
      { id: 2, texto: "Perda de 15 pontos" },
      { id: 3, texto: "Redução de 10 MM" },
    ],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: ["Penalidades"],
    fontes: [],
    vantagem: "",
    desvantagem: "Todas as opções são desvantajosas!",
    dica: "",
  },

  // Outras
  {
    tipo: "Outras",
    titulo: "Escolha de Itens",
    pergunta: "Escolha um item para uso futuro:",
    opcoes: [
      { id: 1, texto: "Ganhe um mapa especial" },
      { id: 2, texto: "Receba um kit de sobrevivência" },
      { id: 3, texto: "Adquira um amuleto da sorte" },
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Outras"],
    fontes: [],
    vantagem: "Itens adquiridos podem ser usados posteriormente.",
    desvantagem: "",
    dica: "",
  }, 
  {
    tipo: "Outras",
    titulo: "Decisão Estratégica",
    pergunta: "Escolha um caminho a seguir:",
    opcoes: [
      { id: 1, texto: "Rota A: Avançar lentamente" },
      { id: 2, texto: "Rota B: Risco médio" },
      { id: 3, texto: "Rota C: Alto risco, alta recompensa" },
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Outras"],
    fontes: [],
    vantagem: "A escolha pode influenciar sua estratégia futura.",
    desvantagem: "",
    dica: "",
  },
  {
    tipo: "Outras",
    titulo: "Redefinir contadores",
    pergunta: "Zere todos os seus contadores, mantendo apenas o contador de progresso",
    opcoes: [
      { id: 1, texto: "OK, entendi" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Outras"],
    fontes: [],
    vantagem: "Isso pode ser bom ou ruim",
    desvantagem: "",
    dica: "",
  }
];

export default cartas;
