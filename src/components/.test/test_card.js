const meu_baralho = [
  {
    "tipo": "Pergunta",
    "titulo": "Pergunta 1",
    "pergunta": `<img src="/7.jpg" alt="Pergunta 1" class="img-media my-4" />
Pergunta com imagem e facil`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "errado"
      },
      {
        "id": 2,
        "texto": "errado"
      },
      {
        "id": 3,
        "texto": "certo"
      },
      {
        "id": 4,
        "texto": "errado"
      }
    ],
    "respostaCorreta": 3,
    "dificuldade": "facil",
    "categorias": [
      "_gus"
    ],
    "fontes": [
      "fonte 1",
      "fonte 2",
      "fonte 3"
    ],
    "vantagem": "Vant",
    "desvantagem": "Desvant",
    "dica": "Dica"
  },
  {
    "tipo": "Pergunta",
    "titulo": "Pergunta 2",
    "pergunta": `<img src="/7.jpg" style="display: block; margin: 0 auto; width: 120px; height: auto;" alt="Pergunta 2" /><br>
Pergunta com carta hero normal`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "errado"
      },
      {
        "id": 2,
        "texto": "correto"
      }
    ],
    "respostaCorreta": 2,
    "dificuldade": "normal",
    "categorias": [
      "_gus"
    ],
    "fontes": [
      "fonte 1",
      "fonte 2",
      "fonte 3"
    ],
    "vantagem": "vant",
    "desvantagem": "desv",
    "dica": "dica"
  },
  {
    "tipo": "MultiplaEscolha",
    "titulo": "Multipla Escolha 3",
    "pergunta": `Multipla escolha dificil`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "errada"
      },
      {
        "id": 2,
        "texto": "certa"
      },
      {
        "id": 3,
        "texto": "certa"
      },
      {
        "id": 4,
        "texto": "errada"
      }
    ],
    "respostaCorreta": [
      2,
      3
    ],
    "dificuldade": "dificil",
    "categorias": [
      "_gus"
    ],
    "fontes": [
      "fonte 1",
      "fonte 2",
      "fonte 3"
    ],
    "vantagem": "vant",
    "desvantagem": "desv",
    "dica": "dica"
  },
  {
    "tipo": "Ordem",
    "titulo": "Ordem 4",
    "pergunta": `carta ordem dificil`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "quatro",
        "ordemTemp": "4"
      },
      {
        "id": 2,
        "texto": "dois",
        "ordemTemp": "2"
      },
      {
        "id": 3,
        "texto": "um",
        "ordemTemp": "1"
      },
      {
        "id": 4,
        "texto": "tres",
        "ordemTemp": "3"
      }
    ],
    "respostaCorreta": [
      3,
      2,
      4,
      1
    ],
    "dificuldade": "dificil",
    "categorias": [
      "_gus"
    ],
    "fontes": [
      "fonte 1",
      "fonte 2",
      "fonte 3"
    ],
    "vantagem": "vant",
    "desvantagem": "desv",
    "dica": "dica"
  },
  {
    "tipo": "Ordem",
    "titulo": "carta ordem reaproveitada 5",
    "pergunta": `<img src="/9.jpg" alt="carta ordem" class="img-media my-4" />
Veja se imagem deu certo`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "dois",
        "ordemTemp": "2"
      },
      {
        "id": 2,
        "texto": "tres",
        "ordemTemp": "3"
      },
      {
        "id": 3,
        "texto": "um",
        "ordemTemp": "1"
      },
      {
        "id": 4,
        "texto": "quatro",
        "ordemTemp": "4"
      }
    ],
    "respostaCorreta": [
      3,
      1,
      2,
      4
    ],
    "dificuldade": "dificil",
    "categorias": [
      "_gus"
    ],
    "fontes": [],
    "vantagem": "vat",
    "desvantagem": "devat",
    "dica": "dic"
  },
  {
    "tipo": "Vantagem",
    "titulo": "Vantagem simples 6",
    "pergunta": `Uma unica alternativa`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "Certa"
      }
    ],
    "respostaCorreta": [
      1
    ],
    "dificuldade": "facil",
    "categorias": [
      "_gus"
    ],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "",
    "dica": ""
  },
  {
    "tipo": "Vantagem",
    "titulo": "Vantagem dupla 7",
    "pergunta": `Duas vantagens`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "Certa"
      },
      {
        "id": 2,
        "texto": "Certa 2"
      }
    ],
    "respostaCorreta": [
      1,
      2
    ],
    "dificuldade": "facil",
    "categorias": [
      "_gus"
    ],
    "fontes": [
      "Fonte"
    ],
    "vantagem": "vant",
    "desvantagem": "desv",
    "dica": "dica"
  },
  {
    "tipo": "Desvantagem",
    "titulo": "Desvantagem Simples 8",
    "pergunta": ``,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "Errada 1"
      },
      {
        "id": 2,
        "texto": "Errada 2"
      }
    ],
    "respostaCorreta": [],
    "dificuldade": "facil",
    "categorias": [
      "_gus"
    ],
    "fontes": [
      "Fonte"
    ],
    "vantagem": "vant",
    "desvantagem": "desv",
    "dica": "dica"
  },
  {
    "tipo": "Outras",
    "titulo": "Outras 9",
    "pergunta": `Outras dificil`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "Certa"
      },
      {
        "id": 2,
        "texto": "Errada"
      }
    ],
    "respostaCorreta": [
      1
    ],
    "dificuldade": "dificil",
    "categorias": [
      "_gus"
    ],
    "fontes": [
      "Fonte"
    ],
    "vantagem": "vant",
    "desvantagem": "desv",
    "dica": "dica"
  },
  {
    "tipo": "Ordem",
    "titulo": "carta ordem reaproveita integralmente 10",
    "pergunta": `<img src="/9.jpg" alt="carta ordem" class="img-media my-4" />
Veja se imagem deu certo`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "dois",
        "ordemTemp": "2"
      },
      {
        "id": 2,
        "texto": "tres",
        "ordemTemp": "3"
      },
      {
        "id": 3,
        "texto": "um",
        "ordemTemp": "1"
      }
    ],
    "respostaCorreta": [
      3,
      1,
      2
    ],
    "dificuldade": "dificil",
    "categorias": [
      "_gus"
    ],
    "fontes": [],
    "vantagem": "vant",
    "desvantagem": "desva",
    "dica": "dica"
  },
  {
    "tipo": "Outras",
    "titulo": "Carta com Pop-up de Vídeo",
    "pergunta": `<!-- Botão para Abrir Pop-up de Vídeo -->
<style>
  .botao-popup {
    background-color: #2196F3;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 4px;
    display: inline-block;
    margin: 20px 0;
  }

  /* Estilos do Pop-up */
  .popup-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    display: none;
    align-items: center;
    justify-content: center;
  }

  .popup-video:target {
    display: flex;
  }

  .popup-conteudo-video {
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    position: relative;
    width: 80%;
    max-width: 800px;
  }

  .popup-conteudo-video iframe {
    width: 100%;
    height: 450px;
    border: none;
    border-radius: 4px;
  }

  .fechar-video {
    position: absolute;
    top: 10px;
    right: 15px;
    text-decoration: none;
    font-size: 24px;
    color: #333;
  }

  .fechar-video:hover {
    color: #000;
  }

  @media screen and (max-width: 600px) {
    .popup-conteudo-video iframe {
      height: 250px;
    }
  }
</style>

<!-- Link para Abrir o Pop-up de Vídeo -->
<a href="#popup-video" class="botao-popup">Assistir Vídeo</a>

<!-- Estrutura do Pop-up de Vídeo -->
<div id="popup-video" class="popup-video">
  <div class="popup-conteudo-video">
    <a href="#" class="fechar-video">&times;</a>
    <iframe 
      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
      title="YouTube video player" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  </div>
</div>`,
    "imageType": "clickable",
    "imagem": "",
    "opcoes": [
      {
        "id": 1,
        "texto": "Opção 1"
      },
      {
        "id": 2,
        "texto": "Opção 2"
      }
    ],
    "respostaCorreta": [1, 2],
    "dificuldade": "facil",
    "categorias": [
      "_gus"
    ],
    "fontes": [
      "Fonte Popup"
    ],
    "vantagem": "",
    "desvantagem": "",
    "dica": ""
  }
];

export default meu_baralho;
