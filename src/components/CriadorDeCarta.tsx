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

const CriadorDeCarta: React.FC = () => {
  const [tipoCarta, setTipoCarta] = useState<string>("Pergunta");
  const [cartas, setCartas] = useState<Carta[]>([]);
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

  const handleOpcaoChange = (index: number, value: string) => {
    const novasOpcoes = [...(cartaAtual.opcoes || [])];
    novasOpcoes[index].texto = value;
    setCartaAtual({ ...cartaAtual, opcoes: novasOpcoes });
  };

  const salvarCarta = () => {
    setCartas([...cartas, { ...cartaAtual, tipo: tipoCarta }]);
    setCartaAtual({
      tipo: tipoCarta,
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

  const gerarCodigoFinal = () => {
    const codigo = `const baralhoPersonalizado = ${JSON.stringify(cartas, null, 2)};\n\nexport default baralhoPersonalizado;`;
    const blob = new Blob([codigo], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "baralho_personalizado.js";
    link.click();
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Criador de Cartas</h1>

      {/* Seleção do Tipo de Carta */}
      <div className="mb-4">
        <label>Tipo de Carta:</label>
        <select
          value={tipoCarta}
          onChange={(e) => setTipoCarta(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="Pergunta">Pergunta</option>
          <option value="MultiplaEscolha">Multipla Escolha</option>
          <option value="Ordem">Ordem</option>
          <option value="Vantagem">Vantagem</option>
          <option value="Desvantagem">Desvantagem</option>
          <option value="Outras">Outras</option>
        </select>
      </div>

      {/* Formulário Dinâmico */}
      <div className="grid grid-cols-2 gap-4">
        <input
          placeholder="Título da Carta"
          value={cartaAtual.titulo}
          onChange={(e) => setCartaAtual({ ...cartaAtual, titulo: e.target.value })}
          className="p-2 border rounded"
        />
        <textarea
          placeholder="Pergunta / Descrição"
          value={cartaAtual.pergunta}
          onChange={(e) => setCartaAtual({ ...cartaAtual, pergunta: e.target.value })}
          className="p-2 border rounded"
        />
        {["Pergunta", "MultiplaEscolha", "Ordem"].includes(tipoCarta) && (
          <>
            <div className="col-span-2">
              <button
                onClick={adicionarOpcao}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Adicionar Opção
              </button>
              {cartaAtual.opcoes?.map((opcao, index) => (
                <input
                  key={index}
                  placeholder={`Opção ${index + 1}`}
                  value={opcao.texto}
                  onChange={(e) => handleOpcaoChange(index, e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
            </div>
            <input
              placeholder="Resposta(s) Correta(s)"
              onChange={(e) =>
                setCartaAtual({
                  ...cartaAtual,
                  respostaCorreta: e.target.value.split(",").map(Number),
                })
              }
              className="p-2 border rounded"
            />
          </>
        )}
        <input
          placeholder="Categorias (separadas por vírgula)"
          onChange={(e) =>
            setCartaAtual({
              ...cartaAtual,
              categorias: e.target.value.split(",").map((c) => c.trim()),
            })
          }
          className="p-2 border rounded"
        />
      </div>

      <button onClick={salvarCarta} className="bg-green-500 text-white p-2 rounded mt-4">
        Salvar Carta
      </button>

      <h2 className="text-xl font-bold mt-8">Cartas Criadas</h2>
      <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(cartas, null, 2)}</pre>

      <button
        onClick={gerarCodigoFinal}
        className="bg-purple-600 text-white p-2 rounded mt-4"
      >
        Gerar Arquivo
      </button>
    </div>
  );
};

export default CriadorDeCarta;
