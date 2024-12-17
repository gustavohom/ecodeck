import React, { useState } from "react";
import CriadorDeCarta from "./CriadorDeCarta";

const GerenciadorDeBaralhos: React.FC = () => {
  const [cartas, setCartas] = useState<any[]>([]);
  const [nomeBaralho, setNomeBaralho] = useState<string>("MeuBaralho");

  const adicionarCarta = (carta: any) => {
    setCartas([...cartas, carta]);
  };

  const salvarBaralho = () => {
    if (cartas.length === 0) {
      alert("Nenhuma carta foi criada!");
      return;
    }

    const baralhoData = JSON.stringify(cartas, null, 2);
    const blob = new Blob([baralhoData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${nomeBaralho || "baralho_personalizado"}.json`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Gerenciar Baralhos</h1>

      <input
        type="text"
        placeholder="Nome do Baralho"
        value={nomeBaralho}
        onChange={(e) => setNomeBaralho(e.target.value)}
      />

      <CriadorDeCarta onAddCarta={adicionarCarta} />

      <h2>Cartas Criadas</h2>
      {cartas.length > 0 ? (
        <ul>
          {cartas.map((carta, index) => (
            <li key={index}>
              <strong>{carta.titulo}</strong> - {carta.tipo} (
              {carta.dificuldade})
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma carta adicionada ainda.</p>
      )}

      <button onClick={salvarBaralho}>Salvar Baralho</button>
    </div>
  );
};

export default GerenciadorDeBaralhos;
