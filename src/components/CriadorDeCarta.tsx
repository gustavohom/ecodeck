// src/components/CriadorDeCarta.tsx

import React, { useState } from "react";

interface Opcao {
  id: number;
  texto: string;
  ordemTemp?: string;
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
  imageType?: "clickable" | "hero";
  imagem?: string;
  origBaralhoId?: number;
  edited?: boolean;
}

const CARD_TYPES = [
  "Pergunta",
  "MultiplaEscolha",
  "Ordem",
  "Vantagem",
  "Desvantagem",
  "Outras",
] as const;
type TipoCarta = typeof CARD_TYPES[number];

const DIFFICULTIES = ["facil", "normal", "dificil"] as const;
type Dificuldade = typeof DIFFICULTIES[number];

interface BaralhoCarregado {
  id: number;
  nome: string;
  cartas: Carta[];
  adicionado: boolean;
}

const CardStaticView: React.FC<{ card: Carta }> = ({ card }) => {
  const {
    tipo,
    titulo,
    pergunta,
    opcoes,
    respostaCorreta,
    dificuldade,
    categorias,
    fontes,
    vantagem,
    desvantagem,
    dica,
  } = card;

  let renderedOptions: React.ReactNode = null;

  if (tipo === "Ordem") {
    const seq = Array.isArray(respostaCorreta) ? respostaCorreta : [];
    const ordemMap = new Map<number, number>();
    seq.forEach((id, index) => {
      ordemMap.set(id, index + 1);
    });

    renderedOptions = (
      <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
        {opcoes.map((op) => {
          const pos = ordemMap.get(op.id);
          const finalPos = pos !== undefined ? pos : "?";
          return (
            <li key={op.id} style={{ marginBottom: "4px" }}>
              {op.texto} ({finalPos})
            </li>
          );
        })}
      </ul>
    );
  } else {
    const correctSet = new Set<number>();

    if (tipo === "Vantagem") {
      opcoes.forEach((o) => correctSet.add(o.id));
    } else if (tipo === "Desvantagem") {
      // Todas as opções são incorretas
    } else if (tipo === "Pergunta") {
      if (typeof respostaCorreta === "number" && respostaCorreta !== 0) {
        correctSet.add(respostaCorreta);
      } else if (Array.isArray(respostaCorreta) && respostaCorreta.length === 1) {
        correctSet.add(respostaCorreta[0]);
      }
    } else {
      if (Array.isArray(respostaCorreta)) {
        respostaCorreta.forEach((x) => correctSet.add(x));
      } else if (respostaCorreta !== 0) {
        correctSet.add(respostaCorreta as number);
      }
    }

    renderedOptions = (
      <ul style={{ marginTop: "8px", paddingLeft: "20px" }}>
        {opcoes.map((op) => {
          const isCorrect = correctSet.has(op.id);
          return (
            <li
              key={op.id}
              style={{
                marginBottom: "4px",
                color: isCorrect ? "green" : "inherit",
                fontWeight: isCorrect ? "bold" : "normal",
              }}
            >
              {op.texto}
              {isCorrect && <span> (correta)</span>}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "400px",
        margin: "1rem 0",
      }}
    >
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "4px" }}>
        {titulo}
      </h2>
      <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "8px" }}>
        Tipo: {tipo} | Dificuldade: {dificuldade}
      </p>

      <div
        style={{ margin: "8px 0", fontSize: "0.875rem" }}
        dangerouslySetInnerHTML={{ __html: pergunta }}
      />

      {renderedOptions}

      <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "#999" }}>
        <p>Categorias: {categorias.join(", ")}</p>
        <p>Fontes: {fontes.join(", ")}</p>
      </div>

      {dica && (
        <p style={{ fontSize: "0.75rem", color: "#0a0", marginTop: "4px" }}>
          <strong>Dica:</strong> {dica}
        </p>
      )}
      {vantagem && (
        <p style={{ fontSize: "0.75rem", color: "#090", marginTop: "4px" }}>
          <strong>Vantagem:</strong> {vantagem}
        </p>
      )}
      {desvantagem && (
        <p style={{ fontSize: "0.75rem", color: "#900", marginTop: "4px" }}>
          <strong>Desvantagem:</strong> {desvantagem}
        </p>
      )}
    </div>
  );
};

const CriadorDeCarta: React.FC = () => {
  const [deckName, setDeckName] = useState("meu_baralho");
  const [cards, setCards] = useState<Carta[]>([]);

  const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
  const [titulo, setTitulo] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [novaOpcao, setNovaOpcao] = useState("");

  const [imageType, setImageType] = useState<"clickable" | "hero">("clickable");
  const [imagem, setImagem] = useState("");

  const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
  const [dificuldade, setDificuldade] = useState<Dificuldade>("facil");

  const [categorias, setCategorias] = useState<string[]>([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [categoriasBloqueadas, setCategoriasBloqueadas] = useState(false);

  const [fontes, setFontes] = useState<string[]>([]);
  const [novaFonte, setNovaFonte] = useState("");
  const [fontesBloqueadas, setFontesBloqueadas] = useState(false);

  const [vantagem, setVantagem] = useState("");
  const [desvantagem, setDesvantagem] = useState("");
  const [dica, setDica] = useState("");

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
  const [manterCartasEditadas, setManterCartasEditadas] = useState(false);

  const parseJSDeckFile = (content: string): Carta[] => {
    const match = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);/);
    if (!match) {
      throw new Error("Não foi possível encontrar um array exportado no arquivo JS.");
    }
    const arrayStr = match[1];
    const array = new Function(`return ${arrayStr};`)();
    return array as Carta[];
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newBaralhos: BaralhoCarregado[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = await file.text();
      try {
        let newCards: Carta[] = [];
        if (file.name.endsWith(".js")) {
          newCards = parseJSDeckFile(content);
        } else if (file.name.endsWith(".json")) {
          newCards = JSON.parse(content) as Carta[];
        } else {
          alert("Formato não suportado. Use arquivos .js ou .json");
          continue;
        }
        const nome = file.name.replace(/\.(js|json)$/, "");
        newBaralhos.push({
          id: Date.now() + Math.random(),
          nome,
          cartas: newCards,
          adicionado: false,
        });
      } catch (error: any) {
        alert("Erro ao ler o arquivo " + file.name + ": " + error.message);
      }
    }

    if (newBaralhos.length > 0) {
      setBaralhosCarregados((prev) => [...prev, ...newBaralhos]);
    }
  };

  const adicionarBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId) {
          const newCards = b.cartas.map((c) => ({
            ...c,
            origBaralhoId: b.id,
            edited: false,
          }));
          setCards((oldCards) => [...oldCards, ...newCards]);
          return { ...b, adicionado: true };
        }
        return b;
      })
    );
  };

  const removerBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId) {
          setCards((oldCards) =>
            oldCards.filter((c) => {
              if (c.origBaralhoId === baralhoId) {
                if (c.edited && manterCartasEditadas) return true;
                if (c.edited && !manterCartasEditadas) return false;
                if (!c.edited) return false;
              }
              return true;
            })
          );
          return { ...b, adicionado: false };
        }
        return b;
      })
    );
  };

  const handleAddOpcao = () => {
    if (novaOpcao.trim() !== "") {
      setOpcoes((old) => [
        ...old,
        {
          id: old.length > 0 ? Math.max(...old.map((o) => o.id)) + 1 : 1,
          texto: novaOpcao,
          ordemTemp: tipo === "Ordem" ? "" : undefined,
        },
      ]);
      setNovaOpcao("");
    }
  };

  const handleRemoveOpcao = (id: number) => {
    setOpcoes((old) => old.filter((o) => o.id !== id));
    setRespostaCorreta((rc) => rc.filter((x) => x !== id));
  };

  const handleToggleRespostaCorreta = (id: number) => {
    if (tipo === "Pergunta") {
      setRespostaCorreta([id]);
    } else if (tipo === "MultiplaEscolha" || tipo === "Outras") {
      setRespostaCorreta((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
  };

  const handleSetOrder = (optionId: number, newValue: number | null) => {
    setOpcoes((old) =>
      old.map((op) =>
        op.id === optionId
          ? { ...op, ordemTemp: newValue === null ? "" : String(newValue) }
          : op
      )
    );
  };

  const handleAddCategoria = () => {
    if (novaCategoria.trim() !== "") {
      setCategorias((old) => [...old, novaCategoria]);
      setNovaCategoria("");
    }
  };
  const handleRemoveCategoria = (cat: string) => {
    setCategorias((old) => old.filter((c) => c !== cat));
  };

  const handleAddFonte = () => {
    if (novaFonte.trim() !== "") {
      setFontes((old) => [...old, novaFonte]);
      setNovaFonte("");
    }
  };
  const handleRemoveFonte = (f: string) => {
    setFontes((old) => old.filter((fon) => fon !== f));
  };

  const resetCarta = () => {
    if (!categoriasBloqueadas) setCategorias([]);
    if (!fontesBloqueadas) setFontes([]);

    setTipo("Pergunta");
    setTitulo("");
    setPergunta("");
    setOpcoes([]);
    setNovaOpcao("");
    setImagem("");
    setDica("");
    setVantagem("");
    setDesvantagem("");
    setRespostaCorreta([]);
    setDificuldade("facil");
    setImageType("clickable");
    setEditIndex(null);
    setShowPreview(false);
  };

  const handleAddOrUpdateCard = () => {
    let finalRespostaCorreta: number | number[] = respostaCorreta;

    if (tipo === "Ordem") {
      const sorted = [...opcoes].sort((a, b) => {
        const posA = a.ordemTemp?.trim() ? parseInt(a.ordemTemp, 10) : 9999;
        const posB = b.ordemTemp?.trim() ? parseInt(b.ordemTemp, 10) : 9999;
        return posA - posB;
      });
      finalRespostaCorreta = sorted.map((o) => o.id);
    } else if (tipo === "Vantagem") {
      finalRespostaCorreta = opcoes.map((o) => o.id);
    } else if (tipo === "Desvantagem") {
      finalRespostaCorreta = [];
    } else if (tipo === "Pergunta") {
      finalRespostaCorreta = respostaCorreta.length > 0 ? respostaCorreta[0] : 0;
    }

    let computedPergunta = "";

    if (imageType === "clickable" && imagem) {
      computedPergunta = `
<style>
  .zoom-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-align: center; 
    margin-bottom: 1em;
  }
  .zoom-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.8);
    z-index: 9999;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .zoom-modal-content {
    margin: 1rem auto;
    max-width: 90%;
    max-height: 100%;
    position: relative;
  }
  .zoom-modal-content img {
    display: block;
    margin: auto;
    width: auto;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
  .zoom-modal-close {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    color: white;
    font-size: 2rem;
    text-decoration: none;
    cursor: pointer;
  }
</style>

<div class="zoom-container" onclick="document.getElementById('zoomModal').style.display='flex'">
  <img src="${imagem}" alt="${titulo}" style="width: 300px; height: auto; display: block; margin: 0 auto;" />
</div>

<div id="zoomModal" class="zoom-modal" onclick="this.style.display='none'">
  <div class="zoom-modal-content" onclick="event.stopPropagation()">
    <a class="zoom-modal-close" onclick="document.getElementById('zoomModal').style.display='none'">&times;</a>
    <img src="${imagem}" alt="${titulo}" />
  </div>
</div>

${pergunta}
`;
    } else if (imageType === "hero" && imagem) {
      computedPergunta = `
<img src="${imagem}" style="display: block; margin: 0 auto; width: 120px; height: auto;" alt="${titulo}" /><br>
${pergunta}
`;
    } else {
      computedPergunta = `${pergunta}`;
    }

    const novaCarta: Carta = {
      tipo,
      titulo,
      pergunta: computedPergunta,
      imageType,
      imagem,
      opcoes,
      respostaCorreta: finalRespostaCorreta,
      dificuldade,
      categorias,
      fontes,
      vantagem,
      desvantagem,
      dica,
    };

    if (editIndex !== null) {
      setCards((oldCards) =>
        oldCards.map((c, i) =>
          i === editIndex
            ? { ...novaCarta, origBaralhoId: c.origBaralhoId, edited: true }
            : c
        )
      );
    } else {
      setCards((oldCards) => [...oldCards, { ...novaCarta, edited: true }]);
    }

    resetCarta();
  };

  const loadCardForEdit = (index: number) => {
    setShowPreview(false);

    const carta = cards[index];
    setEditIndex(index);
    setTipo(carta.tipo as TipoCarta);
    setTitulo(carta.titulo);

    let p = carta.pergunta;
    let extractedImage = "";
    let usedHeroStyle = false;

    const heroImgRegex = /<img[^>]+style="[^"]+"[^>]*src="([^"]+)"[^>]*>/;
    const modalImgRegex = /<div class="zoom-container"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<\/div>/;

    const heroMatch = p.match(heroImgRegex);
    const modalMatch = p.match(modalImgRegex);

    if (heroMatch) {
      usedHeroStyle = true;
      extractedImage = heroMatch[1];
      p = p.replace(heroMatch[0], "");
    } else if (modalMatch) {
      extractedImage = modalMatch[1];
      p = p.replace(modalMatch[0], "");
    }

    setImagem(extractedImage);
    setImageType(usedHeroStyle ? "hero" : "clickable");
    setPergunta(p.trim());

    const copyOp = carta.opcoes.map((o) => ({ ...o }));

    if (carta.tipo === "Ordem" && Array.isArray(carta.respostaCorreta)) {
      const seq = carta.respostaCorreta as number[];
      copyOp.forEach((op) => {
        const pos = seq.indexOf(op.id);
        if (pos >= 0) {
          op.ordemTemp = String(pos + 1);
        } else {
          op.ordemTemp = "";
        }
      });
    } else if (carta.tipo === "Vantagem") {
      setRespostaCorreta(carta.opcoes.map((o) => o.id));
    } else if (carta.tipo === "Desvantagem") {
      setRespostaCorreta([]);
    } else if (carta.tipo === "Pergunta") {
      const rc = carta.respostaCorreta;
      if (typeof rc === "number") {
        setRespostaCorreta(rc ? [rc] : []);
      } else if (Array.isArray(rc) && rc.length === 1) {
        setRespostaCorreta([rc[0]]);
      } else {
        setRespostaCorreta([]);
      }
    } else if (carta.tipo === "MultiplaEscolha" || carta.tipo === "Outras") {
      const arr = Array.isArray(carta.respostaCorreta)
        ? (carta.respostaCorreta as number[])
        : [carta.respostaCorreta];
      setRespostaCorreta(arr.filter((x) => x !== 0));
    }

    setOpcoes(copyOp);

    setDificuldade(carta.dificuldade as Dificuldade);
    setCategorias(carta.categorias);
    setFontes(carta.fontes);
    setVantagem(carta.vantagem);
    setDesvantagem(carta.desvantagem);
    setDica(carta.dica);
  };

  const deleteCard = (index: number) => {
    setCards((old) => old.filter((_, i) => i !== index));
    if (editIndex === index) {
      resetCarta();
    }
  };

  const cancelEdit = () => {
    resetCarta();
  };

  const prepareForDownload = (): Carta[] => {
    return cards.map(({ origBaralhoId, edited, ...rest }) => rest);
  };

  const generateCode = () => {
    const deckFinal = prepareForDownload();
    const deck = JSON.stringify(deckFinal, null, 2);
    return `const ${deckName} = ${deck};\n\nexport default ${deckName};`;
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
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Criador de Baralho</h1>

      <div className="bg-white shadow p-4 rounded mb-6">
        <label className="block text-sm font-medium mb-2">Nome do Baralho:</label>
        <input
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Nome do baralho"
          className="border p-2 w-full rounded"
        />
      </div>

      <div className="bg-white shadow p-4 rounded mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Carregar Baralhos</h2>
        <p className="text-sm text-gray-500">
          Selecione um ou mais arquivos .js ou .json contendo arrays de cartas.
        </p>
        <input type="file" accept=".js,.json" onChange={handleFileUpload} multiple />
      </div>

      {baralhosCarregados.length > 0 && (
        <div className="bg-white shadow p-4 rounded mb-6 space-y-4">
          <h2 className="text-xl font-semibold">Baralhos Carregados</h2>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={manterCartasEditadas}
              onChange={(e) => setManterCartasEditadas(e.target.checked)}
            />
            <label className="text-sm">Manter cartas editadas ao remover baralho</label>
          </div>
          <ul className="space-y-2">
            {baralhosCarregados.map((b) => (
              <li key={b.id} className="flex items-center space-x-4">
                <span className="font-medium">{b.nome}</span>
                <span className="text-sm text-gray-500">{b.cartas.length} cartas</span>
                {!b.adicionado ? (
                  <button
                    onClick={() => adicionarBaralho(b.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded"
                  >
                    Adicionar
                  </button>
                ) : (
                  <button
                    onClick={() => removerBaralho(b.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Remover
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500">
            Ao remover um baralho, cartas não editadas desse baralho serão removidas do baralho principal.
            Se Manter cartas editadas estiver marcado, cartas editadas permanecem.
          </p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">
        {editIndex !== null ? "Editar Carta" : "Adicionar Carta"}
      </h2>
      <div className="bg-white shadow p-4 rounded mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo da Carta</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoCarta)}
            className="border p-2 rounded w-full"
          >
            {CARD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Pergunta: 1 correta; MultiplaEscolha: múltiplas corretas; Ordem:
            precisa de numeração; Vantagem: todas corretas; Desvantagem: todas
            erradas; Outras: mistas ou livres.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Título da Carta</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Imagem</label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value as "clickable" | "hero")}
              className="border p-2 rounded w-full"
            >
              <option value="clickable">Clicável (Modal)</option>
              <option value="hero">Personagem (Hero)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Caminho da Imagem</label>
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="/minha_imagem.png"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Clicável → abre modal de zoom, Hero → imagem centralizada.
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">Pergunta/Descrição</label>
          <textarea
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            className="border p-2 w-full rounded h-24"
          />
        </div>

        {(tipo === "Pergunta" ||
          tipo === "MultiplaEscolha" ||
          tipo === "Ordem" ||
          tipo === "Outras") && (
          <div className="bg-gray-50 p-4 rounded space-y-4">
            <h3 className="text-lg font-semibold">Opções</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={novaOpcao}
                onChange={(e) => setNovaOpcao(e.target.value)}
                placeholder="Texto da opção"
                className="border p-2 rounded flex-1"
              />
              <button
                onClick={handleAddOpcao}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Adicionar Opção
              </button>
            </div>

            <ul className="space-y-2">
              {opcoes.map((o) => (
                <li
                  key={o.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-2"
                >
                  <span className="flex-1">{o.texto}</span>

                  {tipo === "Ordem" && (
                    <div className="flex items-center space-x-1 my-1">
                      <label className="text-sm">Pos:</label>
                      <input
                        type="number"
                        min={1}
                        step={1}
                        onChange={(e) => {
                          const value = e.target.value.trim();
                          if (value === "") {
                            handleSetOrder(o.id, null);
                          } else {
                            const num = parseInt(value, 10);
                            if (!isNaN(num)) {
                              handleSetOrder(o.id, num);
                            }
                          }
                        }}
                        value={o.ordemTemp ?? ""}
                        className="border p-1 w-16 rounded text-sm"
                        style={{
                          MozAppearance: "textfield",
                          WebkitAppearance: "textfield",
                          appearance: "textfield",
                        }}
                      />
                    </div>
                  )}

                  {(tipo === "Pergunta" ||
                    tipo === "MultiplaEscolha" ||
                    tipo === "Outras") && (
                    <button
                      onClick={() => handleToggleRespostaCorreta(o.id)}
                      className={`${
                        respostaCorreta.includes(o.id)
                          ? "bg-green-500 text-white"
                          : "bg-gray-300"
                      } px-2 py-1 rounded text-sm mt-2 sm:mt-0`}
                    >
                      {respostaCorreta.includes(o.id)
                        ? "Correta"
                        : "Marcar correta"}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemoveOpcao(o.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm mt-2 sm:mt-0"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            <div>
              <label className="block text-sm font-medium mb-1">Dificuldade</label>
              <select
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value as Dificuldade)}
                className="border p-2 rounded w-full"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {(tipo === "Vantagem" || tipo === "Desvantagem") && (
          <div className="bg-gray-50 p-4 rounded space-y-4">
            <h3 className="text-lg font-semibold">Opções</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={novaOpcao}
                onChange={(e) => setNovaOpcao(e.target.value)}
                placeholder="Texto da opção"
                className="border p-2 rounded flex-1"
              />
              <button
                onClick={handleAddOpcao}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Adicionar Opção
              </button>
            </div>
            <ul className="space-y-2">
              {opcoes.map((o) => (
                <li key={o.id} className="flex items-center space-x-2">
                  <span className="flex-1">{o.texto}</span>
                  <button
                    onClick={() => handleRemoveOpcao(o.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <label className="block text-sm font-medium mb-1">Dificuldade</label>
              <select
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value as Dificuldade)}
                className="border p-2 rounded w-full"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            {tipo === "Desvantagem" && (
              <p className="text-xs text-gray-500">
                Todas as opções serão incorretas.
              </p>
            )}
            {tipo === "Vantagem" && (
              <p className="text-xs text-gray-500">
                Todas as opções serão corretas.
              </p>
            )}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Categorias</h3>
            <button
              onClick={() => setCategoriasBloqueadas(!categoriasBloqueadas)}
              className={`px-4 py-1 rounded text-white ${
                categoriasBloqueadas ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {categoriasBloqueadas ? "Destravar Categorias" : "Travar Categorias"}
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Nova categoria"
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={handleAddCategoria}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Adicionar
            </button>
          </div>
          <ul className="space-y-1">
            {categorias.map((c, i) => (
              <li key={i} className="flex items-center space-x-2">
                <span>{c}</span>
                <button
                  onClick={() => handleRemoveCategoria(c)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500">
            Se Travar estiver ativado, as categorias **não** serão limpas ao criar nova carta.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Fontes</h3>
            <button
              onClick={() => setFontesBloqueadas(!fontesBloqueadas)}
              className={`px-4 py-1 rounded text-white ${
                fontesBloqueadas ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {fontesBloqueadas ? "Destravar Fontes" : "Travar Fontes"}
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={novaFonte}
              onChange={(e) => setNovaFonte(e.target.value)}
              placeholder="Nova fonte"
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={handleAddFonte}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Adicionar
            </button>
          </div>
          <ul className="space-y-1">
            {fontes.map((f, i) => (
              <li key={i} className="flex items-center space-x-2">
                <span>{f}</span>
                <button
                  onClick={() => handleRemoveFonte(f)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500">
            Se Travar estiver ativado, as fontes **não** serão limpas ao criar nova carta.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Vantagem:</label>
            <input
              type="text"
              value={vantagem}
              onChange={(e) => setVantagem(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Desvantagem:</label>
            <input
              type="text"
              value={desvantagem}
              onChange={(e) => setDesvantagem(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Dica:</label>
            <input
              type="text"
              value={dica}
              onChange={(e) => setDica(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <button
            onClick={handleAddOrUpdateCard}
            className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto mt-4"
          >
            {editIndex !== null ? "Atualizar Carta" : "Adicionar Carta"}
          </button>
          {editIndex !== null && (
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full md:w-auto mt-4"
            >
              Cancelar Edição
            </button>
          )}
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto mt-4"
          >
            {showPreview ? "Fechar Preview Estático" : "Preview Estático"}
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">Preview da Carta Atual (JSON)</h2>
      <div className="bg-white shadow p-4 rounded mb-6 overflow-auto max-h-64">
        <pre className="text-sm whitespace-pre-wrap break-all">
          {JSON.stringify(
            {
              tipo,
              titulo,
              pergunta:
                imageType === "clickable" && imagem
                  ? `
<style>
  .zoom-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-align: center; 
    margin-bottom: 1em;
  }
  .zoom-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.8);
    z-index: 9999;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .zoom-modal-content {
    margin: 1rem auto;
    max-width: 90%;
    max-height: 100%;
    position: relative;
  }
  .zoom-modal-content img {
    display: block;
    margin: auto;
    width: auto;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
  .zoom-modal-close {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    color: white;
    font-size: 2rem;
    text-decoration: none;
    cursor: pointer;
  }
</style>

<div class="zoom-container" onclick="document.getElementById('zoomModal').style.display='flex'">
  <img src="${imagem}" alt="${titulo}" style="width: 300px; height: auto; display: block; margin: 0 auto;" />
</div>

<div id="zoomModal" class="zoom-modal" onclick="this.style.display='none'">
  <div class="zoom-modal-content" onclick="event.stopPropagation()">
    <a class="zoom-modal-close" onclick="document.getElementById('zoomModal').style.display='none'">&times;</a>
    <img src="${imagem}" alt="${titulo}" />
  </div>
</div>

${pergunta}
`
                  : imageType === "hero" && imagem
                  ? `
<img src="${imagem}" style="display: block; margin: 0 auto; width: 120px; height: auto;" alt="${titulo}" /><br>
${pergunta}
`
                  : pergunta,
              imageType,
              imagem,
              opcoes,
              respostaCorreta:
                tipo === "Ordem"
                  ? (() => {
                      const sorted = [...opcoes].sort((a, b) => {
                        const posA = a.ordemTemp?.trim()
                          ? parseInt(a.ordemTemp, 10)
                          : 9999;
                        const posB = b.ordemTemp?.trim()
                          ? parseInt(b.ordemTemp, 10)
                          : 9999;
                        return posA - posB;
                      });
                      return sorted.map((o) => o.id);
                    })()
                  : tipo === "Vantagem"
                  ? opcoes.map((o) => o.id)
                  : tipo === "Desvantagem"
                  ? []
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
      </div>

      {showPreview && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Pré-visualização Estática</h2>
          <CardStaticView
            card={{
              tipo,
              titulo,
              pergunta:
                imageType === "clickable" && imagem
                  ? `
<style>
  .zoom-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
    text-align: center; 
    margin-bottom: 1em;
  }
  .zoom-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: none;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.8);
    z-index: 9999;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .zoom-modal-content {
    margin: 1rem auto;
    max-width: 90%;
    max-height: 100%;
    position: relative;
  }
  .zoom-modal-content img {
    display: block;
    margin: auto;
    width: auto;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
  .zoom-modal-close {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    color: white;
    font-size: 2rem;
    text-decoration: none;
    cursor: pointer;
  }
</style>

<div class="zoom-container" onclick="document.getElementById('zoomModal').style.display='flex'">
  <img src="${imagem}" alt="${titulo}" style="width: 300px; height: auto; display: block; margin: 0 auto;" />
</div>

<div id="zoomModal" class="zoom-modal" onclick="this.style.display='none'">
  <div class="zoom-modal-content" onclick="event.stopPropagation()">
    <a class="zoom-modal-close" onclick="document.getElementById('zoomModal').style.display='none'">&times;</a>
    <img src="${imagem}" alt="${titulo}" />
  </div>
</div>

${pergunta}
`
                  : imageType === "hero" && imagem
                  ? `
<img src="${imagem}" style="display: block; margin: 0 auto; width: 120px; height: auto;" alt="${titulo}" /><br>
${pergunta}
`
                  : pergunta,
              imageType,
              imagem,
              opcoes,
              respostaCorreta:
                tipo === "Ordem"
                  ? (() => {
                      const sorted = [...opcoes].sort((a, b) => {
                        const posA = a.ordemTemp?.trim()
                          ? parseInt(a.ordemTemp, 10)
                          : 9999;
                        const posB = b.ordemTemp?.trim()
                          ? parseInt(b.ordemTemp, 10)
                          : 9999;
                        return posA - posB;
                      });
                      return sorted.map((o) => o.id);
                    })()
                  : tipo === "Vantagem"
                  ? opcoes.map((o) => o.id)
                  : tipo === "Desvantagem"
                  ? []
                  : respostaCorreta,
              dificuldade,
              categorias,
              fontes,
              vantagem,
              desvantagem,
              dica,
            }}
          />
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">Cartas Criadas</h2>
      {cards.length === 0 && (
        <p className="text-gray-500 mb-4">Nenhuma carta criada ainda.</p>
      )}
      <div className="flex flex-wrap gap-2 mb-6">
        {cards.map((c, index) => (
          <div key={index} className="flex items-center space-x-2">
            <button
              onClick={() => loadCardForEdit(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {c.titulo || `Carta ${index + 1}`}
            </button>
            <button
              onClick={() => deleteCard(index)}
              className="bg-red-500 text-white px-2 py-2 rounded"
              title="Excluir Carta"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="flex space-x-4">
        <button onClick={downloadCode} className="bg-blue-500 text-white px-4 py-2 rounded">
          Baixar Código
        </button>
      </div>
    </div>
  );
};

export default CriadorDeCarta;
