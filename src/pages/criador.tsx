import React from "react";
import CriadorDeCarta from "@/components/CriadorDeCarta";

const CriadorPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Criador de Cartas</h1>
      <CriadorDeCarta />
    </div>
  );
};

export default CriadorPage;