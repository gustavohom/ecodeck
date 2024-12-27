// src/components/CriadorDeCarta.tsx
import React, { useState } from "react";

// -----------------------------
// Tipos e interfaces
// -----------------------------

interface Opcao {
  id: number;
  texto: string;
  ordemTemp?: number; // Para armazenar a posição temporária no tipo "Ordem"
}

interface Carta {
  tipo: string;
  titulo: string;
  pergunta: string; // pode conter <img ...> etc.
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

// -----------------------------
// Componente estático para Preview da carta
// -----------------------------
const CardStaticView: React.FC<{ card: Carta }> = ({ card }) => {
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
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{card.titulo}</h2>
      <p style={{ fontSize: "0.875rem", color: "#666" }}>
        Tipo: {card.tipo} | Dificuldade: {card.dificuldade}
      </p>

      {/* Renderiza a pergunta, que pode conter HTML */}
      <div
        style={{ margin: "8px 0", fontSize: "0.875rem" }}
        dangerouslySetInnerHTML={{ __html: card.pergunta }}
      />

      {/* Lista de opções (sem clique) */}
      {card.opcoes && card.opcoes.length > 0 && (
        <ul style={{ marginTop: "8px", paddingLeft: "20px", fontSize: "0.875rem" }}>
          {card.opcoes.map((op) => (
            <li key={op.id}>{op.texto}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "#999" }}>
        <p>Categorias: {card.categorias.join(", ")}</p>
        <p>Fontes: {card.fontes.join(", ")}</p>
      </div>
      {card.dica && (
        <p style={{ fontSize: "0.75rem", color: "#0a0" }}>Dica: {card.dica}</p>
      )}
      {card.vantagem && (
        <p style={{ fontSize: "0.75rem", color: "#090" }}>
          Vantagem: {card.vantagem}
        </p>
      )}
      {card.desvantagem && (
        <p style={{ fontSize: "0.75rem", color: "#900" }}>
          Desvantagem: {card.desvantagem}
        </p>
      )}
    </div>
  );
};

// -----------------------------
// Componente principal: CriadorDeCarta
// -----------------------------
const CriadorDeCarta: React.FC = () => {
  // Nome do baralho final
  const [deckName, setDeckName] = useState("meu_baralho");
  // Lista de cartas
  const [cards, setCards] = useState<Carta[]>([]);

  // -----------------------------
  // Estados de criação/edição da carta atual
  // -----------------------------
  const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
  const [titulo, setTitulo] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [novaOpcao, setNovaOpcao] = useState("");

  // Imagem
  const [imageType, setImageType] = useState<"clickable" | "hero">("clickable");
  const [imagem, setImagem] = useState("");

  // Resposta correta (para Pergunta, MultiplaEscolha, Outras). Para "Ordem", salvamos no final via "ordemTemp".
  const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
  const [dificuldade, setDificuldade] = useState<Dificuldade>("facil");

  // Categorias e Fontes — se "travar", não limpamos no reset
  const [categorias, setCategorias] = useState<string[]>([]);
  const [novaCategoria, setNovaCategoria] = useState("");
  const [categoriasBloqueadas, setCategoriasBloqueadas] = useState(false);

  const [fontes, setFontes] = useState<string[]>([]);
  const [novaFonte, setNovaFonte] = useState("");
  const [fontesBloqueadas, setFontesBloqueadas] = useState(false);

  // Vantagem/Desvantagem/Dica
  const [vantagem, setVantagem] = useState("");
  const [desvantagem, setDesvantagem] = useState("");
  const [dica, setDica] = useState("");

  // Index do modo edição
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Preview estático
  const [showPreview, setShowPreview] = useState(false);

  // -----------------------------
  // Baralhos externos carregados
  // -----------------------------
  const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
  const [manterCartasEditadas, setManterCartasEditadas] = useState(false);

  // -----------------------------
  // Função para parse de arquivo .js
  // -----------------------------
  const parseJSDeckFile = (content: string): Carta[] => {
    const match = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);/);
    if (!match) {
      throw new Error("Nao foi possivel encontrar um array exportado no arquivo JS.");
    }
    const arrayStr = match[1];
    const json = JSON.parse(arrayStr) as Carta[];
    return json;
  };

  // Carrega baralhos .js ou .json
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
          alert("Formato nao suportado. Use arquivos .js ou .json");
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

  // Adicionar baralho ao baralho principal
  const adicionarBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId) {
          const newCards = b.cartas.map((carta) => ({
            ...carta,
            origBaralhoId: baralhoId,
            edited: false,
          }));
          setCards((oldCards) => [...oldCards, ...newCards]);
          return { ...b, adicionado: true };
        }
        return b;
      })
    );
  };

  // Remover baralho => remove as cartas não editadas desse baralho
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

  // -----------------------------
  // Handlers de opções
  // -----------------------------
  const handleAddOpcao = () => {
    if (novaOpcao.trim() !== "") {
      const newOpt: Opcao = {
        id: opcoes.length + 1,
        texto: novaOpcao,
        ordemTemp: opcoes.length + 1, // se for "Ordem", já iniciamos com idx+1
      };
      setOpcoes([...opcoes, newOpt]);
      setNovaOpcao("");
    }
  };

  const handleRemoveOpcao = (id: number) => {
    setOpcoes(opcoes.filter((o) => o.id !== id));
    setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
  };

  const handleToggleRespostaCorreta = (id: number) => {
    // Se for Pergunta, só 1 correta
    if (tipo === "Pergunta") {
      setRespostaCorreta([id]);
    }
    // Se for MultiplaEscolha ou Outras, podemos ter várias
    else if (tipo === "MultiplaEscolha" || tipo === "Outras") {
      if (respostaCorreta.includes(id)) {
        setRespostaCorreta(respostaCorreta.filter((x) => x !== id));
      } else {
        setRespostaCorreta([...respostaCorreta, id]);
      }
    }
  };

  // Campo numérico para "Ordem"
  const handleSetOrder = (optionId: number, position: number) => {
    setOpcoes((old) =>
      old.map((op) =>
        op.id === optionId
          ? { ...op, ordemTemp: position }
          : op
      )
    );
  };

  // -----------------------------
  // Categorias / Fontes
  // -----------------------------
  // Agora, "travar" significa apenas que não será apagado ao criar nova carta;
  // mas o usuário ainda pode adicionar/remover manualmente a qualquer momento.
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

  // -----------------------------
  // Criar / Atualizar / Editar / Remover
  // -----------------------------
  const resetCarta = () => {
    // Se estiver travado, não limpa; se não estiver, zera
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
      // Ordena as opções segundo ordemTemp
      const sorted = [...opcoes].sort((a, b) => {
        const A = a.ordemTemp || 9999;
        const B = b.ordemTemp || 9999;
        return A - B;
      });
      finalRespostaCorreta = sorted.map((o) => o.id);
    } else if (tipo === "Vantagem") {
      // Todas corretas
      finalRespostaCorreta = opcoes.map((o) => o.id);
    } else if (tipo === "Desvantagem") {
      // Todas erradas => array vazio
      finalRespostaCorreta = [];
    } else if (tipo === "Pergunta") {
      // só 1
      finalRespostaCorreta = respostaCorreta.length > 0 ? respostaCorreta[0] : 0;
    }
    // MultiplaEscolha ou Outras => array do state

    const novaCarta: Carta = {
      tipo,
      titulo,
      pergunta:
        imageType === "hero" && imagem
          ? `<img src=\"${imagem}\" style=\"display: block; margin: 0 auto; width: 120px; height: auto;\" alt=\"${titulo}\" /><br>\n` +
            pergunta
          : imagem
          ? `<img src=\"${imagem}\" alt=\"${titulo}\" class=\"img-media my-4\" />\n` + pergunta
          : pergunta,
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

  // Carregar uma carta para edição
  const loadCardForEdit = (index: number) => {
    setShowPreview(false);

    const carta = cards[index];
    setEditIndex(index);
    setTipo(carta.tipo as TipoCarta);
    setTitulo(carta.titulo);

    let p = carta.pergunta;
    let extractedImage = "";
    let usedHeroStyle = false;

    // Regex para hero e clickable
    const heroImgRegex = /<img[^>]+style="[^"]+"[^>]*src="([^"]+)"[^>]*>/;
    const clickableImgRegex = /<img[^>]+class="[^"]+"[^>]*src="([^"]+)"[^>]*>/;

    const heroMatch = p.match(heroImgRegex);
    const clickableMatch = p.match(clickableImgRegex);

    if (heroMatch) {
      usedHeroStyle = true;
      extractedImage = heroMatch[1];
      p = p.replace(heroMatch[0], "");
    } else if (clickableMatch) {
      extractedImage = clickableMatch[1];
      p = p.replace(clickableMatch[0], "");
    }

    setImagem(extractedImage);
    setImageType(usedHeroStyle ? "hero" : "clickable");
    setPergunta(p.trim());

    setOpcoes(carta.opcoes);

    // Reconstruir resposta
    if (carta.tipo === "Ordem") {
      if (Array.isArray(carta.respostaCorreta)) {
        const seq = carta.respostaCorreta;
        const sorted = carta.opcoes.slice().sort(
          (a, b) => seq.indexOf(a.id) - seq.indexOf(b.id)
        );
        const withPos = sorted.map((o, idx) => ({
          ...o,
          ordemTemp: idx + 1,
        }));
        setOpcoes(withPos);
      }
      setRespostaCorreta([]);
    } else if (carta.tipo === "Vantagem") {
      setRespostaCorreta(carta.opcoes.map((o) => o.id));
    } else if (carta.tipo === "Desvantagem") {
      setRespostaCorreta([]);
    } else if (carta.tipo === "Pergunta") {
      const correctId =
        typeof carta.respostaCorreta === "number" ? (carta.respostaCorreta as number) : 0;
      setRespostaCorreta(correctId ? [correctId] : []);
    } else if (carta.tipo === "MultiplaEscolha" || carta.tipo === "Outras") {
      const arr = Array.isArray(carta.respostaCorreta)
        ? (carta.respostaCorreta as number[])
        : [carta.respostaCorreta];
      setRespostaCorreta(arr.filter((x) => x !== 0));
    }

    setDificuldade(carta.dificuldade as Dificuldade);
    setCategorias(carta.categorias);
    setFontes(carta.fontes);
    setVantagem(carta.vantagem);
    setDesvantagem(carta.desvantagem);
    setDica(carta.dica);
  };

  // Deletar carta
  const deleteCard = (index: number) => {
    setCards((oldCards) => oldCards.filter((_, i) => i !== index));
    if (editIndex === index) {
      resetCarta();
    }
  };

  const cancelEdit = () => {
    resetCarta();
  };

  // -----------------------------
  // Download do código
  // -----------------------------
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

  // -----------------------------
  // Render final
  // -----------------------------
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Criador de Baralho</h1>

      {/* Nome do Baralho */}
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

      {/* Carregar Baralhos */}
      <div className="bg-white shadow p-4 rounded mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Carregar Baralhos</h2>
        <p className="text-sm text-gray-500">
          Selecione um ou mais arquivos .js ou .json contendo arrays de cartas.
        </p>
        <input type="file" accept=".js,.json" onChange={handleFileUpload} multiple />
      </div>

      {/* Lista de Baralhos Carregados */}
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
            Ao remover um baralho, cartas nao editadas desse baralho serao removidas do baralho principal.
            Se &quot;Manter cartas editadas&quot; estiver marcado, cartas editadas permanecem.
          </p>
        </div>
      )}

      {/* Formulário de Criação/Edição */}
      <h2 className="text-2xl font-bold mb-4">
        {editIndex !== null ? "Editar Carta" : "Adicionar Carta"}
      </h2>
      <div className="bg-white shadow p-4 rounded mb-6 space-y-4">
        {/* Tipo da Carta */}
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
            Pergunta: 1 correta; MultiplaEscolha: multiplas corretas; Ordem: numeração das opções;
            Vantagem: todas corretas; Desvantagem: todas erradas; Outras: mistas.
          </p>
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium mb-1">Título da Carta</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Tipo de imagem e caminho */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Imagem</label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value as "clickable" | "hero")}
              className="border p-2 rounded w-full"
            >
              <option value="clickable">Clicavel (Zoom)</option>
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
          &quot;Clicavel&quot; &rarr; usa Zoom, &quot;Hero&quot; &rarr; imagem centralizada.
        </p>

        {/* Pergunta/Descrição */}
        <div>
          <label className="block text-sm font-medium mb-1">Pergunta/Descrição</label>
          <textarea
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            className="border p-2 w-full rounded h-24"
          />
        </div>

        {/* Opções para Pergunta/MultiplaEscolha/Ordem/Outras */}
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
              {opcoes.map((o, idx) => (
                <li
                  key={o.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-2"
                >
                  <span className="flex-1">{o.texto}</span>

                  {/* Se for "Ordem": input numérico para posição */}
                  {tipo === "Ordem" && (
                    <div className="flex items-center space-x-1 my-1">
                      <label className="text-sm">Pos:</label>
                      <input
                        type="number"
                        min={1}
                        max={opcoes.length}
                        step={1}
                        onChange={(e) => handleSetOrder(o.id, Number(e.target.value))}
                        value={o.ordemTemp || idx + 1}
                        className="border p-1 w-16 rounded text-sm"
                      />
                    </div>
                  )}

                  {/* "Marcar correta" se for Pergunta/MultiplaEscolha/Outras */}
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

        {/* Se for Vantagem/Desvantagem */}
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

        {/* Categorias */}
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
            Se &quot;Travar&quot; estiver ativado, as categorias **não** serão limpas ao criar nova carta.
          </p>
        </div>

        {/* Fontes */}
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
            Se &quot;Travar&quot; estiver ativado, as fontes **não** serão limpas ao criar nova carta.
          </p>
        </div>

        {/* Vantagem, Desvantagem, Dica */}
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

        {/* Botões de ação (Salvar, Cancelar, Preview) */}
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
          {/* Botão para abrir/fechar preview estático */}
          <button
            onClick={() => setShowPreview((prev) => !prev)}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto mt-4"
          >
            {showPreview ? "Fechar Preview Estático" : "Preview Estático"}
          </button>
        </div>
      </div>

      {/* Pré-visualização JSON da carta atual */}
      <h2 className="text-2xl font-bold mb-2">Preview da Carta Atual (JSON)</h2>
      <div className="bg-white shadow p-4 rounded mb-6 overflow-auto max-h-64">
        <pre className="text-sm whitespace-pre-wrap break-all">
          {JSON.stringify(
            {
              tipo,
              titulo,
              pergunta:
                imageType === "hero" && imagem
                  ? `<img src=\"${imagem}\" style=\"display: block; margin: 0 auto; width: 120px; height: auto;\" alt=\"${titulo}\" /><br>\n${pergunta}`
                  : imagem
                  ? `<img src=\"${imagem}\" alt=\"${titulo}\" class=\"img-media my-4\" />\n${pergunta}`
                  : pergunta,
              imageType,
              imagem,
              opcoes,
              respostaCorreta:
                tipo === "Ordem"
                  ? [...opcoes]
                      .sort((a, b) => (a.ordemTemp || 9999) - (b.ordemTemp || 9999))
                      .map((o) => o.id)
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

      {/* Se showPreview == true, exibe pré-visualização estática */}
      {showPreview && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Pré-visualização Estática</h2>
          <CardStaticView
            card={{
              tipo,
              titulo,
              pergunta:
                imageType === "hero" && imagem
                  ? `<img src=\"${imagem}\" style=\"display: block; margin: 0 auto; width: 120px; height: auto;\" alt=\"${titulo}\" /><br>\n${pergunta}`
                  : imagem
                  ? `<img src=\"${imagem}\" alt=\"${titulo}\" class=\"img-media my-4\" />\n${pergunta}`
                  : pergunta,
              imageType,
              imagem,
              opcoes,
              respostaCorreta:
                tipo === "Ordem"
                  ? [...opcoes]
                      .sort((a, b) => (a.ordemTemp || 9999) - (b.ordemTemp || 9999))
                      .map((o) => o.id)
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

      {/* Cartas Criadas */}
      <h2 className="text-2xl font-bold mb-4">Cartas Criadas</h2>
      {cards.length === 0 && (
        <p className="text-gray-500 mb-4">Nenhuma carta criada ainda.</p>
      )}
      <div className="flex flex-wrap gap-2 mb-6">
        {cards.map((carta, index) => (
          <div key={index} className="flex items-center space-x-2">
            <button
              onClick={() => loadCardForEdit(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {carta.titulo || `Carta ${index + 1}`}
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

      {/* Botão de download do baralho */}
      <div className="flex space-x-4">
        <button onClick={downloadCode} className="bg-blue-500 text-white px-4 py-2 rounded">
          Baixar Código
        </button>
      </div>
    </div>
  );
};

export default CriadorDeCarta;
