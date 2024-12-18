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

const CARD_TYPES = ["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras"] as const;
type TipoCarta = typeof CARD_TYPES[number];

const DIFFICULTIES = ["facil", "normal", "dificil"] as const;
type Dificuldade = typeof DIFFICULTIES[number];

const CriadorDeCarta: React.FC = () => {
  const [deckName, setDeckName] = useState<string>("meu_baralho");
  const [cards, setCards] = useState<Carta[]>([]);

  // Estados da carta
  const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
  const [titulo, setTitulo] = useState<string>("");
  const [pergunta, setPergunta] = useState<string>("");
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [novaOpcao, setNovaOpcao] = useState<string>("");
  const [imagem, setImagem] = useState<string>(""); // nome do arquivo da imagem
  const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
  const [dificuldade, setDificuldade] = useState<Dificuldade>("facil");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [novaCategoria, setNovaCategoria] = useState<string>("");
  const [fontes, setFontes] = useState<string[]>([]);
  const [novaFonte, setNovaFonte] = useState<string>("");
  const [vantagem, setVantagem] = useState<string>("");
  const [desvantagem, setDesvantagem] = useState<string>("");
  const [dica, setDica] = useState<string>("");

  // Para ordem
  const [ordemMap, setOrdemMap] = useState<Record<number, number>>({});

  const handleAddOpcao = () => {
    if (novaOpcao.trim() !== "") {
      setOpcoes([...opcoes, { id: opcoes.length + 1, texto: novaOpcao }]);
      setNovaOpcao("");
    }
  };

  const handleRemoveOpcao = (id: number) => {
    setOpcoes(opcoes.filter((o) => o.id !== id));
    setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
    const newOrdemMap = { ...ordemMap };
    delete newOrdemMap[id];
    setOrdemMap(newOrdemMap);
  };

  const handleToggleRespostaCorreta = (id: number) => {
    if (tipo === "MultiplaEscolha") {
      // múltiplas corretas
      if (respostaCorreta.includes(id)) {
        setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
      } else {
        setRespostaCorreta([...respostaCorreta, id]);
      }
    } else if (tipo === "Pergunta") {
      // única resposta correta
      setRespostaCorreta([id]);
    } else if (tipo === "Vantagem" || tipo === "Desvantagem" || tipo === "Outras") {
      // Pode marcar todas como corretas se quiser, não é obrigatório, depende da lógica do jogo.
      if (respostaCorreta.includes(id)) {
        setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
      } else {
        setRespostaCorreta([...respostaCorreta, id]);
      }
    }
  };

  const handleSetOrder = (opcaoId: number, position: number) => {
    setOrdemMap({ ...ordemMap, [opcaoId]: position });
  };

  const handleAddCategoria = () => {
    if (novaCategoria.trim() !== "") {
      setCategorias([...categorias, novaCategoria]);
      setNovaCategoria("");
    }
  };

  const handleRemoveCategoria = (cat: string) => {
    setCategorias(categorias.filter((c) => c !== cat));
  };

  const handleAddFonte = () => {
    if (novaFonte.trim() !== "") {
      setFontes([...fontes, novaFonte]);
      setNovaFonte("");
    }
  };

  const handleRemoveFonte = (f: string) => {
    setFontes(fontes.filter((fon) => fon !== f));
  };

  const handleAddCard = () => {
    let finalRespostaCorreta: number | number[] = respostaCorreta;
    if (tipo === "Ordem") {
      // Ordenar as opções com base no ordemMap
      const sortedOpcoes = opcoes
        .slice()
        .sort((a, b) => (ordemMap[a.id] || 999) - (ordemMap[b.id] || 999));
      finalRespostaCorreta = sortedOpcoes.map((o) => o.id);
    } else if (tipo === "Pergunta") {
      // resposta única
      finalRespostaCorreta = respostaCorreta.length > 0 ? respostaCorreta[0] : 0;
    }

    const novaCarta: Carta = {
      tipo,
      titulo,
      pergunta: imagem
        ? `<img src="${imagem}" alt="${titulo}" class="img-media" />\n` + pergunta
        : pergunta,
      opcoes,
      respostaCorreta: finalRespostaCorreta,
      dificuldade,
      categorias,
      fontes,
      vantagem,
      desvantagem,
      dica,
    };

    setCards([...cards, novaCarta]);
    // Resetar estados da carta
    setTipo("Pergunta");
    setTitulo("");
    setPergunta("");
    setOpcoes([]);
    setNovaOpcao("");
    setImagem("");
    setDica("");
    setVantagem("");
    setDesvantagem("");
    setFontes([]);
    setCategorias([]);
    setRespostaCorreta([]);
    setOrdemMap({});
    setDificuldade("facil");
  };

  const generateCode = () => {
    const deck = JSON.stringify(cards, null, 2);
    const code = `const ${deckName} = ${deck};\n\nexport default ${deckName};`;
    return code;
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([generateCode()], { type: "text/javascript" });
    element.href = URL.createObjectURL(file);
    element.download = `${deckName}.js`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Criador de Baralho</h1>
      <div style={{ marginBottom: "1rem" }}>
        <label>Nome do Baralho: </label>
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Nome do baralho"
          style={{ width: "200px", marginLeft: "0.5rem" }}
        />
      </div>

      <h2>Adicionar Carta</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>Tipo da Carta: </label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoCarta)}
          style={{ marginLeft: "0.5rem" }}
        >
          {CARD_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Título: </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ width: "300px", marginLeft: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Imagem (nome do arquivo, opcional): </label>
        <input
          type="text"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          style={{ width: "300px", marginLeft: "0.5rem" }}
          placeholder="/minha_imagem.jpg"
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Pergunta/Descrição: </label>
        <textarea
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          style={{ width: "300px", height: "100px", marginLeft: "0.5rem" }}
        />
      </div>

      {["Pergunta", "MultiplaEscolha", "Ordem"].includes(tipo) && (
        <>
          <h3>Opções</h3>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              value={novaOpcao}
              onChange={(e) => setNovaOpcao(e.target.value)}
              placeholder="Texto da opção"
              style={{ marginRight: "0.5rem" }}
            />
            <button onClick={handleAddOpcao}>Adicionar Opção</button>
          </div>
          <ul>
            {opcoes.map((o) => (
              <li key={o.id} style={{ marginBottom: "0.5rem" }}>
                {o.texto}{" "}
                <button onClick={() => handleRemoveOpcao(o.id)} style={{ marginRight: "0.5rem" }}>
                  Remover
                </button>
                {tipo === "Ordem" ? (
                  <span>
                    Ordem:{" "}
                    <input
                      type="number"
                      style={{ width: "50px", marginLeft: "0.5rem" }}
                      value={ordemMap[o.id] || ""}
                      onChange={(e) => handleSetOrder(o.id, Number(e.target.value))}
                    />
                  </span>
                ) : (
                  <button onClick={() => handleToggleRespostaCorreta(o.id)}>
                    {respostaCorreta.includes(o.id) ? "Correta" : "Marcar como correta"}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div style={{ marginBottom: "1rem" }}>
            <label>Dificuldade: </label>
            <select
              value={dificuldade}
              onChange={(e) => setDificuldade(e.target.value as Dificuldade)}
              style={{ marginLeft: "0.5rem" }}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {(tipo === "Vantagem" || tipo === "Desvantagem" || tipo === "Outras") && (
        <>
          <h3>Opções</h3>
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              value={novaOpcao}
              onChange={(e) => setNovaOpcao(e.target.value)}
              placeholder="Texto da opção"
              style={{ marginRight: "0.5rem" }}
            />
            <button onClick={handleAddOpcao}>Adicionar Opção</button>
          </div>
          <ul>
            {opcoes.map((o) => (
              <li key={o.id} style={{ marginBottom: "0.5rem" }}>
                {o.texto}{" "}
                <button onClick={() => handleRemoveOpcao(o.id)}>Remover</button>
              </li>
            ))}
          </ul>
          <p>Marque as opções corretas (se desejar, para Vantagem/Desvantagem/Outras):</p>
          {opcoes.map((o) => (
            <div key={o.id}>
              <input
                type="checkbox"
                checked={respostaCorreta.includes(o.id)}
                onChange={() => handleToggleRespostaCorreta(o.id)}
              />{" "}
              {o.texto}
            </div>
          ))}
        </>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <h3>Categorias</h3>
        <input
          type="text"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          placeholder="Nova categoria"
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleAddCategoria}>Adicionar Categoria</button>
        <ul>
          {categorias.map((c) => (
            <li key={c}>
              {c} <button onClick={() => handleRemoveCategoria(c)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h3>Fontes</h3>
        <input
          type="text"
          value={novaFonte}
          onChange={(e) => setNovaFonte(e.target.value)}
          placeholder="Nova fonte"
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleAddFonte}>Adicionar Fonte</button>
        <ul>
          {fontes.map((f) => (
            <li key={f}>
              {f} <button onClick={() => handleRemoveFonte(f)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Vantagem: </label>
        <input
          type="text"
          value={vantagem}
          onChange={(e) => setVantagem(e.target.value)}
          style={{ width: "300px", marginLeft: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Desvantagem: </label>
        <input
          type="text"
          value={desvantagem}
          onChange={(e) => setDesvantagem(e.target.value)}
          style={{ width: "300px", marginLeft: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Dica: </label>
        <input
          type="text"
          value={dica}
          onChange={(e) => setDica(e.target.value)}
          style={{ width: "300px", marginLeft: "0.5rem" }}
        />
      </div>

      <button onClick={handleAddCard} style={{ marginBottom: "2rem" }}>
        Adicionar Carta ao Baralho
      </button>

      <h2>Preview da Carta Atual</h2>
      <pre style={{ border: "1px solid #ccc", padding: "1rem", maxHeight: "300px", overflow: "auto" }}>
        {JSON.stringify(
          {
            tipo,
            titulo,
            pergunta: imagem
              ? `<img src="${imagem}" alt="${titulo}" class="img-media" />\n` + pergunta
              : pergunta,
            opcoes,
            respostaCorreta:
              tipo === "Ordem"
                ? Object.entries(ordemMap)
                    .sort((a, b) => a[1] - b[1])
                    .map(([key]) => Number(key))
                : respostaCorreta,
            dificuldade,
            categorias,
            fontes,
            vantagem,
            desvantagem,
            dica,
          },
          null,
          2
        )}
      </pre>

      <h2>Baralho {deckName}</h2>
      <pre style={{ border: "1px solid #ccc", padding: "1rem", maxHeight: "300px", overflow: "auto" }}>
        {JSON.stringify(cards, null, 2)}
      </pre>

      <button onClick={downloadCode} style={{ marginRight: "1rem" }}>
        Baixar Código
      </button>
      <button onClick={() => alert("Visualização no jogo - Integrar conforme necessidade")}>
        Visualizar no Jogo
      </button>
    </div>
  );
};

export default CriadorDeCarta;
