const cartas = [
  {
    tipo: "MultiplaEscolha",
    titulo: "Casa",
    pergunta: "Qual numero da minha casa",
    opcoes: [
      { id: 1, texto: "Casinha" },
      { id: 2, texto: "Casebre" },
      { id: 3, texto: "Casada" },
    ],
    respostaCorreta: [2, 3],
    dificuldade: "normal",
    categorias: [
      "Casa",
    ],
    fontes: [
      "Gustavo 2023",
      "Carro 2022",
    ],
    vantagem: "Ganhe uma chave",
    desvantagem: "Perca uma chave",
    dica: "Sua casa caramba",
  },
  {
    tipo: "Pergunta",
    titulo: "Prrea",
    pergunta: "qual a pergunta?",
    opcoes: [
      { id: 1, texto: "cas" },
      { id: 2, texto: "asd" },
      { id: 3, texto: "asd" },
      { id: 4, texto: "eee" },
      { id: 5, texto: "re" },
    ],
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: [
      "casa",
      "casebre",
      "casinha",
      "casao",
    ],
    fontes: [
      "gustavinho 2021",
      "henrique 2020",
    ],
    vantagem: "sua",
    desvantagem: "minha",
    dica: "nossa",
  },
  {
    tipo: "Desvantagem",
    titulo: "vantagem",
    pergunta: "ganhe dois toletões",
    opcoes: [
      { id: 1, texto: "Valeu" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: [
      "vnat",
    ],
    fontes: [
      "euzinho",
    ],
    vantagem: "",
    desvantagem: "",
    dica: "",
  }
];

export default cartas;
