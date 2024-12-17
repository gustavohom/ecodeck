import React, { useState } from "react";
import CriadorDeCarta from "./CriadorDeCarta";

const GerenciadorDeBaralhos: React.FC = () => {
  const [cartas, setCartas] = useState<any[]>([]);
  const [nomeBaralho, setNomeBaralho] = useState<string>("MeuBaralho");

  const adicionarCarta = (carta: any) => {
    setCartas([...cartas, carta]);
  };

  const salvarBaralho = () => {
    const json = JSON.stringify(cartas, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${nomeBaralho}.json`;
    a.click();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Gerenciar Baralhos</h1>
      <input
        type="text"
        placeholder="Nome do Baralho"
        value={nomeBaralho}
        onChange={(e) => setNomeBaralho(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />
      <CriadorDeCarta onAddCarta={adicionarCarta} />
      <h2 className="text-xl font-bold mt-8">Cartas Criadas</h2>
      <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(cartas, null, 2)}</pre>
      <button
        onClick={salvarBaralho}
        className="bg-purple-500 text-white py-2 px-4 rounded mt-4"
      >
        Salvar Baralho
      </button>
    </div>
  );
};

export default GerenciadorDeBaralhos;
