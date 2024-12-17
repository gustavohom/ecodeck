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
  dificuldade?: string;
  categorias?: string[];
  fontes?: string[];
  vantagem?: string;
  desvantagem?: string;
  dica?: string;
}

interface CriadorDeCartaProps {
  onAddCarta: (carta: Carta) => void;
  categoriaFixa?: string[];
  setCategoriaFixa: (categorias: string[]) => void;
}

const CriadorDeCarta: React.FC<CriadorDeCartaProps> = ({
  onAddCarta,
  categoriaFixa,
  setCategoriaFixa,
}) => {
  const [cartaAtual, setCartaAtual] = useState<Carta>({
    tipo: "Pergunta",
    titulo: "",
    pergunta: "",
    opcoes: [],
    respostaCorreta: undefined,
    dificuldade: "facil",
    categorias: categoriaFixa || [],
    fontes: [],
    vantagem: "",
    desvantagem: "",
    dica: "",
  });

  const adicionarOpcao = () => {
    setCartaAtual({
      ...cartaAtual,
      opcoes: [...(cartaAtual.opcoes || []), { id: (cartaAtual.opcoes?.length || 0) + 1, texto: "" }],
    });
  };

  const handleRespostaCorreta = (id: number) => {
    if (cartaAtual.tipo === "MultiplaEscolha") {
      const resposta = cartaAtual.respostaCorreta as number[] || [];
      const novaResposta = resposta.includes(id)
        ? resposta.filter((res) => res !== id)
        : [...resposta, id];
      setCartaAtual({ ...cartaAtual, respostaCorreta: novaResposta });
    } else {
      setCartaAtual({ ...cartaAtual, respostaCorreta: id });
    }
  };

  const salvarCarta = () => {
    onAddCarta(cartaAtual);
    setCartaAtual({
      ...cartaAtual,
      titulo: "",
      pergunta: "",
      opcoes: [],
      respostaCorreta: undefined,
    });
  };

  return (
    <div className="p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Criador de Cartas</h2>

      {/* Tipo de Carta */}
      <label>Tipo da Carta</label>
      <select
        value={cartaAtual.tipo}
        onChange={(e) => setCartaAtual({ ...cartaAtual, tipo: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
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
        value={cartaAtual.titulo}
        onChange={(e) => setCartaAtual({ ...cartaAtual, titulo: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />

      <textarea
        placeholder="Pergunta / Descrição"
        value={cartaAtual.pergunta}
        onChange={(e) => setCartaAtual({ ...cartaAtual, pergunta: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
      />

      {/* Opções */}
      {["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo) && (
        <>
          <button onClick={adicionarOpcao} className="bg-blue-500 text-white p-2 rounded mb-2">
            Adicionar Opção
          </button>
          {cartaAtual.opcoes?.map((opcao) => (
            <div key={opcao.id} className="flex items-center mb-2">
              <input
                placeholder={`Opção ${opcao.id}`}
                value={opcao.texto}
                onChange={(e) => {
                  const novasOpcoes = cartaAtual.opcoes?.map((o) =>
                    o.id === opcao.id ? { ...o, texto: e.target.value } : o
                  );
                  setCartaAtual({ ...cartaAtual, opcoes: novasOpcoes });
                }}
                className="p-2 border rounded w-full"
              />
              <input
                type={cartaAtual.tipo === "MultiplaEscolha" ? "checkbox" : "radio"}
                name="respostaCorreta"
                checked={
                  cartaAtual.tipo === "MultiplaEscolha"
                    ? (cartaAtual.respostaCorreta as number[])?.includes(opcao.id)
                    : cartaAtual.respostaCorreta === opcao.id
                }
                onChange={() => handleRespostaCorreta(opcao.id)}
                className="ml-2"
              />
            </div>
          ))}
        </>
      )}

      {/* Categorias e Outros */}
      <input
        placeholder="Categorias (separadas por vírgula)"
        value={cartaAtual.categorias?.join(", ")}
        onChange={(e) =>
          setCartaAtual({ ...cartaAtual, categorias: e.target.value.split(",").map((c) => c.trim()) })
        }
        className="w-full p-2 mb-2 border rounded"
      />

      <button
        onClick={() => setCategoriaFixa(cartaAtual.categorias || [])}
        className="bg-gray-500 text-white p-2 rounded mb-2"
      >
        Manter Categoria
      </button>

      <input
        placeholder="Fontes (separadas por linha)"
        onChange={(e) =>
          setCartaAtual({ ...cartaAtual, fontes: e.target.value.split("\n").map((f) => f.trim()) })
        }
        className="w-full p-2 mb-2 border rounded"
      />

      {/* Botão Salvar */}
      <button onClick={salvarCarta} className="bg-green-500 text-white p-2 rounded">
        Salvar Carta
      </button>
    </div>
  );
};

export default CriadorDeCarta;
