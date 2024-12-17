import React, { useState } from "react";

interface Opcao {
  id: number;
  texto: string;
}

interface Carta {
  tipo: string;
  titulo: string;
  pergunta: string;
  opcoes?: Opcao[];
  respostaCorreta?: number | number[];
  dificuldade: string;
  categorias: string[];
  fontes: string[];
  vantagem?: string;
  desvantagem?: string;
  dica?: string;
}

interface CriadorDeCartaProps {
  onAddCarta: (carta: Carta) => void;
  categoriaFixa: string[];
  setCategoriaFixa: (categorias: string[]) => void;
}

const CriadorDeCarta: React.FC<CriadorDeCartaProps> = ({
  onAddCarta,
  categoriaFixa,
  setCategoriaFixa,
}) => {
  const [carta, setCarta] = useState<Carta>({
    tipo: "Pergunta",
    titulo: "",
    pergunta: "",
    opcoes: [],
    respostaCorreta: [],
    dificuldade: "facil",
    categorias: categoriaFixa,
    fontes: [],
    vantagem: "",
    desvantagem: "",
    dica: "",
  });

  const adicionarOpcao = () => {
    setCarta({
      ...carta,
      opcoes: [...(carta.opcoes || []), { id: (carta.opcoes?.length || 0) + 1, texto: "" }],
    });
  };

  const handleRespostaCorreta = (id: number) => {
    if (carta.tipo === "MultiplaEscolha" || carta.tipo === "Ordem") {
      const novasRespostas = Array.isArray(carta.respostaCorreta)
        ? carta.respostaCorreta.includes(id)
          ? carta.respostaCorreta.filter((res) => res !== id)
          : [...carta.respostaCorreta, id]
        : [id];
      setCarta({ ...carta, respostaCorreta: novasRespostas });
    } else {
      setCarta({ ...carta, respostaCorreta: id });
    }
  };

  const salvarCarta = () => {
    onAddCarta(carta);
    setCarta({
      ...carta,
      titulo: "",
      pergunta: "",
      opcoes: [],
      respostaCorreta: [],
      vantagem: "",
      desvantagem: "",
      dica: "",
    });
  };

  return (
    <div className="p-6 bg-gray-50 shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Criador de Cartas</h2>

      {/* Tipo de Carta */}
      <label className="block font-semibold mb-1">Tipo de Carta</label>
      <select
        value={carta.tipo}
        onChange={(e) => setCarta({ ...carta, tipo: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="Pergunta">Pergunta</option>
        <option value="MultiplaEscolha">Multipla Escolha</option>
        <option value="Ordem">Ordem</option>
        <option value="Vantagem">Vantagem</option>
        <option value="Desvantagem">Desvantagem</option>
        <option value="Outras">Outras</option>
      </select>

      {/* Campos Gerais */}
      <input
        placeholder="Título"
        value={carta.titulo}
        onChange={(e) => setCarta({ ...carta, titulo: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Pergunta / Descrição"
        value={carta.pergunta}
        onChange={(e) => setCarta({ ...carta, pergunta: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Opções */}
      {["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras"].includes(
        carta.tipo
      ) && (
        <>
          <button onClick={adicionarOpcao} className="bg-blue-500 text-white p-2 rounded mb-2">
            Adicionar Opção
          </button>
          {carta.opcoes?.map((opcao) => (
            <div key={opcao.id} className="flex items-center mb-2">
              <input
                placeholder={`Opção ${opcao.id}`}
                value={opcao.texto}
                onChange={(e) => {
                  const novasOpcoes = carta.opcoes?.map((o) =>
                    o.id === opcao.id ? { ...o, texto: e.target.value } : o
                  );
                  setCarta({ ...carta, opcoes: novasOpcoes });
                }}
                className="p-2 border rounded w-full"
              />
              <input
                type="checkbox"
                checked={Array.isArray(carta.respostaCorreta) && carta.respostaCorreta.includes(opcao.id)}
                onChange={() => handleRespostaCorreta(opcao.id)}
                className="ml-2"
              />
            </div>
          ))}
        </>
      )}

      {/* Vantagem, Desvantagem e Dica */}
      <input
        placeholder="Vantagem"
        value={carta.vantagem}
        onChange={(e) => setCarta({ ...carta, vantagem: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        placeholder="Desvantagem"
        value={carta.desvantagem}
        onChange={(e) => setCarta({ ...carta, desvantagem: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        placeholder="Dica"
        value={carta.dica}
        onChange={(e) => setCarta({ ...carta, dica: e.target.value })}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Categorias */}
      <input
        placeholder="Categorias (separadas por vírgula)"
        value={carta.categorias.join(", ")}
        onChange={(e) =>
          setCarta({ ...carta, categorias: e.target.value.split(",").map((c) => c.trim()) })
        }
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={() => setCategoriaFixa(carta.categorias)}
        className="bg-gray-600 text-white p-2 rounded mb-4"
      >
        Manter Categoria
      </button>

      {/* Salvar */}
      <button onClick={salvarCarta} className="bg-green-500 text-white p-2 rounded w-full">
        Salvar Carta
      </button>
    </div>
  );
};

export default CriadorDeCarta;
