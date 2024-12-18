import React, { useState } from "react";

// Tipos de Cartas
const CARD_TYPES = [
  "Pergunta",
  "MultiplaEscolha",
  "Ordem",
  "Vantagem",
  "Desvantagem",
  "Outras",
];

// Dificuldades possíveis
const DIFFICULTIES = ["facil", "normal", "dificil"];

const CardCreator = () => {
  const [deckName, setDeckName] = useState("");
  const [cards, setCards] = useState([]);
  
  // Estados do formulário de criação de carta
  const [tipo, setTipo] = useState("Pergunta");
  const [titulo, setTitulo] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [novaOpcao, setNovaOpcao] = useState("");

  const [imagem, setImagem] = useState(""); // apenas nome do arquivo da imagem

  const [respostaCorreta, setRespostaCorreta] = useState([]); // pode ser number[] se múltiplas, ou único número se único
  const [dificuldade, setDificuldade] = useState("facil");
  const [categorias, setCategorias] = useState([]);
  const [novaCategoria, setNovaCategoria] = useState("");

  const [fontes, setFontes] = useState([]);
  const [novaFonte, setNovaFonte] = useState("");

  const [vantagem, setVantagem] = useState("");
  const [desvantagem, setDesvantagem] = useState("");
  const [dica, setDica] = useState("");

  // Adicionar opcao
  const handleAddOpcao = () => {
    if (novaOpcao.trim() !== "") {
      setOpcoes([...opcoes, { id: opcoes.length + 1, texto: novaOpcao }]);
      setNovaOpcao("");
    }
  };

  // Remover uma opção
  const handleRemoveOpcao = (id) => {
    setOpcoes(opcoes.filter((o) => o.id !== id));
    setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
  };

  // Selecionar resposta(s) correta(s)
  const handleToggleRespostaCorreta = (id) => {
    if (tipo === "Ordem") {
      // Em "Ordem" não marcamos correto/errado, apenas definimos a ordem.
      // Aqui poderíamos ter outro tipo de input para definir ordem.
      return;
    }

    if (tipo === "MultiplaEscolha") {
      // Seleção múltipla
      if (respostaCorreta.includes(id)) {
        setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
      } else {
        setRespostaCorreta([...respostaCorreta, id]);
      }
    } else {
      // Seleção única
      setRespostaCorreta([id]);
    }
  };

  // Para tipo Ordem: definir a ordem final
  const [ordemMap, setOrdemMap] = useState({});
  const handleSetOrder = (opcaoId, position) => {
    setOrdemMap({ ...ordemMap, [opcaoId]: position });
  };

  // Adicionar categoria
  const handleAddCategoria = () => {
    if (novaCategoria.trim() !== "") {
      setCategorias([...categorias, novaCategoria]);
      setNovaCategoria("");
    }
  };

  // Remover categoria
  const handleRemoveCategoria = (cat) => {
    setCategorias(categorias.filter((c) => c !== cat));
  };

  // Adicionar fonte
  const handleAddFonte = () => {
    if (novaFonte.trim() !== "") {
      setFontes([...fontes, novaFonte]);
      setNovaFonte("");
    }
  };

  // Remover fonte
  const handleRemoveFonte = (f) => {
    setFontes(fontes.filter((fon) => fon !== f));
  };

  const handleAddCard = () => {
    let finalRespostaCorreta = respostaCorreta;
    if (tipo === "Ordem") {
      // Montar array da ordem correta baseada no ordemMap
      const sortedOpcoes = opcoes
        .slice()
        .sort((a, b) => (ordemMap[a.id] || 999) - (ordemMap[b.id] || 999));
      finalRespostaCorreta = sortedOpcoes.map(o => o.id);
    }

    const newCard = {
      tipo,
      titulo,
      pergunta: imagem ? `<img src="${imagem}" alt="${titulo}" class="img-media" />\n` + pergunta : pergunta,
      opcoes: opcoes,
      respostaCorreta: 
        tipo === "Vantagem" || tipo === "Desvantagem" || tipo === "Outras"
          ? finalRespostaCorreta // pode ser vazio ou tudo certo dependendo da lógica
          : (tipo === "MultiplaEscolha" || tipo === "Ordem") ? finalRespostaCorreta : finalRespostaCorreta[0],
      dificuldade,
      categorias,
      fontes,
      vantagem,
      desvantagem,
      dica,
    };

    setCards([...cards, newCard]);
    // reset campos da carta
    setTipo("Pergunta");
    setTitulo("");
    setPergunta("");
    setOpcoes([]);
    setRespostaCorreta([]);
    setOrdemMap({});
    setImagem("");
    setDica("");
    setVantagem("");
    setDesvantagem("");
    setFontes([]);
    setCategorias([]);
  };

  // Gerar código do baralho
  const generateCode = () => {
    const deck = JSON.stringify(cards, null, 2);
    // Formatado como um arquivo JS exportando o array
    const code = `const ${deckName || 'meu_baralho'} = ${deck};\n\nexport default ${deckName || 'meu_baralho'};`;
    return code;
  };

  // Baixar arquivo
  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([generateCode()], { type: "text/javascript" });
    element.href = URL.createObjectURL(file);
    element.download = `${deckName || 'meu_baralho'}.js`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Criador de Baralho</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>Nome do Baralho: </label>
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Nome do baralho"
          style={{ width: '200px', marginLeft: '0.5rem' }}
        />
      </div>

      <h2>Adicionar Carta</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>Tipo da Carta: </label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} style={{ marginLeft: '0.5rem' }}>
          {CARD_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Título: </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ width: '300px', marginLeft: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Imagem (nome do arquivo, opcional): </label>
        <input
          type="text"
          value={imagem}
          onChange={(e) => setImagem(e.target.value)}
          style={{ width: '300px', marginLeft: '0.5rem' }}
          placeholder="/minha_imagem.jpg"
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Pergunta/Descrição: </label>
        <textarea
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          style={{ width: '300px', height: '100px', marginLeft: '0.5rem' }}
        />
      </div>

      {["Pergunta", "MultiplaEscolha", "Ordem"].includes(tipo) && (
        <>
          <h3>Opções</h3>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={novaOpcao}
              onChange={(e) => setNovaOpcao(e.target.value)}
              placeholder="Texto da opção"
              style={{ marginRight: '0.5rem' }}
            />
            <button onClick={handleAddOpcao}>Adicionar Opção</button>
          </div>
          <ul>
            {opcoes.map((o) => (
              <li key={o.id} style={{ marginBottom: '0.5rem' }}>
                {o.texto}{" "}
                <button onClick={() => handleRemoveOpcao(o.id)} style={{ marginRight: '0.5rem' }}>
                  Remover
                </button>
                {tipo === "Ordem" ? (
                  <span>
                    Ordem: 
                    <input
                      type="number"
                      style={{ width: '50px', marginLeft: '0.5rem' }}
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
        </>
      )}

      {(tipo === "Vantagem" || tipo === "Desvantagem" || tipo === "Outras") && (
        <>
          <h3>Opções</h3>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={novaOpcao}
              onChange={(e) => setNovaOpcao(e.target.value)}
              placeholder="Texto da opção"
              style={{ marginRight: '0.5rem' }}
            />
            <button onClick={handleAddOpcao}>Adicionar Opção</button>
          </div>
          <ul>
            {opcoes.map((o) => (
              <li key={o.id} style={{ marginBottom: '0.5rem' }}>
                {o.texto}{" "}
                <button onClick={() => handleRemoveOpcao(o.id)}>Remover</button>
              </li>
            ))}
          </ul>
          {/* Para vantagem/desvantagem/outros, as respostas corretas podem ser definidas conforme a lógica do jogo.
             Aqui assumiremos que o usuário pode marcar todas como corretas, se quiser. */}
          {tipo === "Vantagem" && (
            <p>Caso queira, marque todas as opções como corretas (opcional):</p>
          )}
          {tipo !== "Ordem" && tipo !== "Pergunta" && tipo !== "MultiplaEscolha" && opcoes.map((o) => (
            <div key={o.id}>
              <input
                type="checkbox"
                checked={respostaCorreta.includes(o.id)}
                onChange={() => handleToggleRespostaCorreta(o.id)}
              /> {o.texto}
            </div>
          ))}
        </>
      )}

      {["Pergunta", "MultiplaEscolha", "Ordem"].includes(tipo) && (
        <div style={{ marginBottom: '1rem' }}>
          <label>Dificuldade: </label>
          <select value={dificuldade} onChange={(e) => setDificuldade(e.target.value)} style={{ marginLeft: '0.5rem' }}>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <h3>Categorias</h3>
        <input
          type="text"
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          placeholder="Nova categoria"
          style={{ marginRight: '0.5rem' }}
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

      <div style={{ marginBottom: '1rem' }}>
        <h3>Fontes</h3>
        <input
          type="text"
          value={novaFonte}
          onChange={(e) => setNovaFonte(e.target.value)}
          placeholder="Nova fonte"
          style={{ marginRight: '0.5rem' }}
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

      <div style={{ marginBottom: '1rem' }}>
        <label>Vantagem: </label>
        <input
          type="text"
          value={vantagem}
          onChange={(e) => setVantagem(e.target.value)}
          style={{ width: '300px', marginLeft: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Desvantagem: </label>
        <input
          type="text"
          value={desvantagem}
          onChange={(e) => setDesvantagem(e.target.value)}
          style={{ width: '300px', marginLeft: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Dica: </label>
        <input
          type="text"
          value={dica}
          onChange={(e) => setDica(e.target.value)}
          style={{ width: '300px', marginLeft: '0.5rem' }}
        />
      </div>

      <button onClick={handleAddCard} style={{ marginBottom: '2rem' }}>Adicionar Carta ao Baralho</button>

      <h2>Preview da Carta Atual</h2>
      <pre style={{ border: '1px solid #ccc', padding: '1rem' }}>
        {JSON.stringify({
          tipo,
          titulo,
          pergunta: imagem ? `<img src="${imagem}" alt="${titulo}" class="img-media" />\n` + pergunta : pergunta,
          opcoes,
          respostaCorreta:
            tipo === "Ordem"
              ? Object.entries(ordemMap).sort((a,b) => a[1]-b[1]).map(([key]) => Number(key))
              : respostaCorreta,
          dificuldade,
          categorias,
          fontes,
          vantagem,
          desvantagem,
          dica,
        }, null, 2)}
      </pre>

      <h2>Baralho {deckName}</h2>
      <pre style={{ border: '1px solid #ccc', padding: '1rem' }}>
        {JSON.stringify(cards, null, 2)}
      </pre>

      <button onClick={downloadCode} style={{ marginRight: '1rem' }}>Baixar Código</button>
      <button onClick={() => alert("Visualização Integrada no Jogo - depende da sua implementação")}>
        Visualizar no Jogo
      </button>
    </div>
  );
};

export default CardCreator;
