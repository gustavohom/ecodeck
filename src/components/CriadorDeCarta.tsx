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
  onAddCarta: (carta: Carta) => void; // Define a prop corretamente
}

const CriadorDeCarta: React.FC<CriadorDeCartaProps> = ({ onAddCarta }) => {
  const [cartaAtual, setCartaAtual] = useState<Carta>({
    tipo: "Pergunta",
    titulo: "",
    pergunta: "",
    opcoes: [],
    respostaCorreta: undefined,
    dificuldade: "facil",
    categorias: [],
    fontes: [],
    vantagem: "",
    desvantagem: "",
    dica: "",
  });

  const adicionarOpcao = () => {
    const novaOpcao = { id: (cartaAtual.opcoes?.length || 0) + 1, texto: "" };
    setCartaAtual({
      ...cartaAtual,
      opcoes: [...(cartaAtual.opcoes || []), novaOpcao],
    });
  };

  const salvarCarta = () => {
    onAddCarta(cartaAtual);
    setCartaAtual({
      tipo: "Pergunta",
      titulo: "",
      pergunta: "",
      opcoes: [],
      respostaCorreta: undefined,
      dificuldade: "facil",
      categorias: [],
      fontes: [],
      vantagem: "",
      desvantagem: "",
      dica: "",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Criar Nova Carta</h2>
      <input
        type="text"
        placeholder="Título da Carta"
        value={cartaAtual.titulo}
        onChange={(e) => setCartaAtual({ ...cartaAtual, titulo: e.target.value })}
        className="p-2 border rounded w-full mb-2"
      />
      <textarea
        placeholder="Pergunta ou Descrição"
        value={cartaAtual.pergunta}
        onChange={(e) => setCartaAtual({ ...cartaAtual, pergunta: e.target.value })}
        className="p-2 border rounded w-full mb-2"
      />
      <button
        onClick={adicionarOpcao}
        className="bg-blue-500 text-white py-1 px-4 rounded"
      >
        Adicionar Opção
      </button>
      {cartaAtual.opcoes?.map((opcao, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Opção ${index + 1}`}
          value={opcao.texto}
          onChange={(e) => {
            const novasOpcoes = [...cartaAtual.opcoes!];
            novasOpcoes[index].texto = e.target.value;
            setCartaAtual({ ...cartaAtual, opcoes: novasOpcoes });
          }}
          className="p-2 border rounded w-full my-2"
        />
      ))}
      <button
        onClick={salvarCarta}
        className="bg-green-500 text-white py-2 px-4 rounded"
      >
        Salvar Carta
      </button>
    </div>
  );
};

export default CriadorDeCarta;
