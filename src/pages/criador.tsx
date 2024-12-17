import React from "react";
import GerenciadorDeBaralhos from "../components/GerenciadorDeBaralhos";

const Criador: React.FC = () => {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Criador de Cartas</h1>
      <GerenciadorDeBaralhos />
    </main>
  );
};

export default Criador;
