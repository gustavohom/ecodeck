import React, { useState } from "react";

interface Opcao {
  id: number;
  texto: string;
}

interface Carta {
  tipo: string;
  titulo: string;
  pergunta: string;
  opcoes: Opcao[];
  respostaCorreta: number | number[];
  dificuldade: string;
  categorias: string[];
  fontes: string[];
  vantagem: string;
  desvantagem: string;
  dica: string;
}

const CriadorDeCarta: React.FC<{ onAddCarta: (carta: Carta) => void }> = ({
  onAddCarta,
}) => {
  const [carta, setCarta] = useState<Carta>({
    tipo: "Pergunta",
    titulo: "",
    pergunta: "",
    opcoes: [],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: [],
    fontes: [],
    vantagem: "",
    desvantagem: "",
    dica: "",
  });

  const tiposCarta = [
    "Pergunta",
    "MultiplaEscolha",
    "Ordem",
    "Vantagem",
    "Desvantagem",
    "Outras",
  ];

  const dificuldades = ["facil", "normal", "dificil"];

  const adicionarOpcao = () => {
    const novaOpcao = {
      id: carta.opcoes.length + 1,
      texto: "",
    };
    setCarta({
      ...carta,
      opcoes: [...carta.opcoes, novaOpcao],
    });
  };

  const handleOpcaoChange = (index: number, texto: string) => {
    const novasOpcoes = [...carta.opcoes];
    novasOpcoes[index].texto = texto;
    setCarta({ ...carta, opcoes: novasOpcoes });
  };

  const handleSubmit = () => {
    if (carta.titulo && carta.pergunta && carta.opcoes.length > 0) {
      onAddCarta(carta);
      resetarFormulario();
    } else {
      alert("Preencha todos os campos obrigatórios!");
    }
  };

  const resetarFormulario = () => {
    setCarta({
      tipo: "Pergunta",
      titulo: "",
      pergunta: "",
      opcoes: [],
      respostaCorreta: [],
      dificuldade: "facil",
      categorias: [],
      fontes: [],
      vantagem: "",
      desvantagem: "",
      dica: "",
    });
  };

  return (
    <div className="formulario-criador-carta">
      <h2>Criar Nova Carta</h2>

      <label>Título da Carta *</label>
      <input
        type="text"
        placeholder="Título"
        value={carta.titulo}
        onChange={(e) =>
          setCarta({ ...carta, titulo: e.target.value })
        }
      />

      <label>Pergunta / Descrição *</label>
      <textarea
        placeholder="Descrição da Carta"
        value={carta.pergunta}
        onChange={(e) =>
          setCarta({ ...carta, pergunta: e.target.value })
        }
      />

      <label>Tipo de Carta *</label>
      <select
        value={carta.tipo}
        onChange={(e) => setCarta({ ...carta, tipo: e.target.value })}
      >
        {tiposCarta.map((tipo) => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      {(carta.tipo === "Pergunta" ||
        carta.tipo === "MultiplaEscolha" ||
        carta.tipo === "Ordem") && (
        <>
          <label>Opções *</label>
          <button onClick={adicionarOpcao}>Adicionar Opção</button>

          {carta.opcoes.map((opcao, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Opção ${index + 1}`}
                value={opcao.texto}
                onChange={(e) => handleOpcaoChange(index, e.target.value)}
              />
            </div>
          ))}

          <label>Respostas Corretas *</label>
          <input
            type="text"
            placeholder="Ex: 1 ou 1,2,3"
            onChange={(e) =>
              setCarta({
                ...carta,
                respostaCorreta: e.target.value
                  .split(",")
                  .map((id) => parseInt(id)),
              })
            }
          />
        </>
      )}

      <label>Dificuldade *</label>
      <select
        value={carta.dificuldade}
        onChange={(e) =>
          setCarta({ ...carta, dificuldade: e.target.value })
        }
      >
        {dificuldades.map((dif) => (
          <option key={dif} value={dif}>
            {dif}
          </option>
        ))}
      </select>

      <label>Categorias</label>
      <input
        type="text"
        placeholder="Categorias separadas por vírgula"
        onChange={(e) =>
          setCarta({
            ...carta,
            categorias: e.target.value.split(",").map((c) => c.trim()),
          })
        }
      />

      <label>Fontes</label>
      <textarea
        placeholder="Fontes separadas por linha"
        onChange={(e) =>
          setCarta({
            ...carta,
            fontes: e.target.value.split("\n").map((f) => f.trim()),
          })
        }
      />

      <label>Vantagem</label>
      <textarea
        placeholder="Descrição da Vantagem"
        onChange={(e) =>
          setCarta({ ...carta, vantagem: e.target.value })
        }
      />

      <label>Desvantagem</label>
      <textarea
        placeholder="Descrição da Desvantagem"
        onChange={(e) =>
          setCarta({ ...carta, desvantagem: e.target.value })
        }
      />

      <label>Dica</label>
      <textarea
        placeholder="Dica Opcional"
        onChange={(e) =>
          setCarta({ ...carta, dica: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Salvar Carta</button>
    </div>
  );
};

export default CriadorDeCarta;
