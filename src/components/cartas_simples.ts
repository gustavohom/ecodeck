// cartas_simples.ts

const cartasSimples: Carta[] = [
  {
    tipo: "Pergunta",
    titulo: "Simples - Pergunta 1",
    pergunta: "Carta simples",
    opcoes: [
      { id: 1, texto: "Usar recursos de forma consciente" },
      { id: 2, texto: "Explorar ao máximo os recursos" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Sustentabilidade"],
    fontes: ["Fonte 1"],
    vantagem: "Você ganha 1 ponto.",
    desvantagem: "Você não ganha ponto.",
    dica: "Pense em equilíbrio.",
  },
  // Adicione mais cartas simples aqui
];

export default cartasSimples;
