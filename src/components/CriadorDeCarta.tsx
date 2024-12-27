import React, { useState } from "react";
import { DragEvent } from "react";

// Tipos e interfaces
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
  imageType: "clickable" | "hero"; // NOVO: tipo da imagem
  imagem?: string; // caso deseje guardar separadamente
  // campos opcionais que já existiam
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

// Componente principal
const CriadorDeCarta: React.FC = () => {
  const [deckName, setDeckName] = useState<string>("meu_baralho");
  const [cards, setCards] = useState<Carta[]>([]);

  // -- Estados da carta atual
  const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
  const [titulo, setTitulo] = useState<string>("");
  const [pergunta, setPergunta] = useState<string>("");
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [novaOpcao, setNovaOpcao] = useState<string>("");

  // NOVO: tipo de imagem
  const [imageType, setImageType] = useState<"clickable" | "hero">("clickable");
  const [imagem, setImagem] = useState<string>("");

  const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
  const [dificuldade, setDificuldade] = useState<Dificuldade>("facil");

  const [categorias, setCategorias] = useState<string[]>([]);
  const [novaCategoria, setNovaCategoria] = useState<string>("");
  const [categoriasBloqueadas, setCategoriasBloqueadas] = useState<boolean>(false);

  const [fontes, setFontes] = useState<string[]>([]);
  const [novaFonte, setNovaFonte] = useState<string>("");
  const [fontesBloqueadas, setFontesBloqueadas] = useState<boolean>(false); // NOVO

  const [vantagem, setVantagem] = useState<string>("");
  const [desvantagem, setDesvantagem] = useState<string>("");
  const [dica, setDica] = useState<string>("");

  const [ordemMap, setOrdemMap] = useState<Record<number, number>>({}); // não mais usado? depende
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Lista de baralhos carregados
  const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
  const [manterCartasEditadas, setManterCartasEditadas] = useState<boolean>(false);

  // Função p/ extrair array de um .js
  const parseJSDeckFile = (content: string): Carta[] => {
    const match = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);/);
    if (!match) {
      throw new Error("Não foi possível encontrar um array exportado no arquivo JS.");
    }
    const arrayStr = match[1];
    const json = JSON.parse(arrayStr) as Carta[];
    return json;
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

  const removerBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId) {
          setCards((oldCards) =>
            oldCards.filter((c) => {
              if (c.origBaralhoId === baralhoId) {
                if (c.edited && manterCartasEditadas) {
                  return true;
                } else if (c.edited && !manterCartasEditadas) {
                  return false;
                } else if (!c.edited) {
                  return false;
                }
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

  // Opções
  const handleAddOpcao = () => {
    if (novaOpcao.trim() !== "") {
      setOpcoes([...opcoes, { id: opcoes.length + 1, texto: novaOpcao }]);
      setNovaOpcao("");
    }
  };

  const handleRemoveOpcao = (id: number) => {
    setOpcoes(opcoes.filter((o) => o.id !== id));
    setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
  };

  // Mover opção para cima/para baixo (Ordem)
  const moveOpcaoUp = (index: number) => {
    if (index <= 0) return;
    const newOpcoes = [...opcoes];
    const temp = newOpcoes[index];
    newOpcoes[index] = newOpcoes[index - 1];
    newOpcoes[index - 1] = temp;
    setOpcoes(newOpcoes);
  };
  const moveOpcaoDown = (index: number) => {
    if (index >= opcoes.length - 1) return;
    const newOpcoes = [...opcoes];
    const temp = newOpcoes[index];
    newOpcoes[index] = newOpcoes[index + 1];
    newOpcoes[index + 1] = temp;
    setOpcoes(newOpcoes);
  };

  // Em Pergunta e MultiplaEscolha -> marcar correção
  const handleToggleRespostaCorreta = (id: number) => {
    // Se for Pergunta: só 1 correta
    if (tipo === "Pergunta") {
      setRespostaCorreta([id]);
      return;
    }
    // Se for MultiplaEscolha, Outras (só se não for Vantagem/Desvantagem):
    if (tipo === "MultiplaEscolha" || tipo === "Outras") {
      if (respostaCorreta.includes(id)) {
        setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
      } else {
        setRespostaCorreta([...respostaCorreta, id]);
      }
    }
  };

  // Categorias
  const handleAddCategoria = () => {
    if (categoriasBloqueadas) return;
    if (novaCategoria.trim() !== "") {
      setCategorias([...categorias, novaCategoria]);
      setNovaCategoria("");
    }
  };
  const handleRemoveCategoria = (cat: string) => {
    if (categoriasBloqueadas) return;
    setCategorias(categorias.filter((c) => c !== cat));
  };

  // Fontes (bloqueio semelhante a categorias)
  const handleAddFonte = () => {
    if (fontesBloqueadas) return;
    if (novaFonte.trim() !== "") {
      setFontes([...fontes, novaFonte]);
      setNovaFonte("");
    }
  };
  const handleRemoveFonte = (f: string) => {
    if (fontesBloqueadas) return;
    setFontes(fontes.filter((fon) => fon !== f));
  };

  const resetCarta = () => {
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
    setRespostaCorreta([]);
    setOrdemMap({});
    setDificuldade("facil");
    setImageType("clickable");
    setEditIndex(null);
  };

  const handleAddOrUpdateCard = () => {
    let finalRespostaCorreta: number | number[] = respostaCorreta;

    // Se for "Ordem", a ordem final será a do array opcoes atual:
    if (tipo === "Ordem") {
      // a resposta correta será a sequência de IDs na ordem atual
      finalRespostaCorreta = opcoes.map((o) => o.id);
    } else if (tipo === "Pergunta") {
      // pega a 1a (ou zero)
      finalRespostaCorreta = respostaCorreta.length > 0 ? respostaCorreta[0] : 0;
    } else if (tipo === "Vantagem") {
      // TODAS as opções são corretas; salva array c/ todos
      finalRespostaCorreta = opcoes.map((o) => o.id);
    } else if (tipo === "Desvantagem") {
      // TODAS as opções são erradas => array vazio
      finalRespostaCorreta = [];
    }

    const novaCarta: Carta = {
      tipo,
      titulo,
      // Se for imageType = "hero", envolve outro style.
      pergunta:
        imageType === "hero" && imagem
          ? `<img src="${imagem}" style="display: block; margin: 0 auto; width: 120px; height: auto;" alt="${titulo}" /><br>\n` +
            pergunta
          : imagem
          ? `<img src="${imagem}" alt="${titulo}" class="img-media my-4" />\n` + pergunta
          : pergunta,
      imageType,
      imagem, // só pra guardar a info também
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
      // Edição
      setCards((oldCards) =>
        oldCards.map((c, i) => {
          if (i === editIndex) {
            return { ...novaCarta, origBaralhoId: c.origBaralhoId, edited: true };
          }
          return c;
        })
      );
    } else {
      // Nova
      setCards((oldCards) => [...oldCards, { ...novaCarta, edited: true }]);
    }

    resetCarta();
  };

  const loadCardForEdit = (index: number) => {
    const carta = cards[index];
    setEditIndex(index);
    setTipo(carta.tipo as TipoCarta);
    setTitulo(carta.titulo);

    // extrair imagem e resto do texto
    let p = carta.pergunta;
    let extractedImage = "";
    let usedHeroStyle = false;

    // tente checar se tem <img style=...>
    const heroImgRegex = /<img[^>]+style="[^"]+"[^>]*src="([^"]+)"[^>]*>/;
    const clickableImgRegex = /<img[^>]+class="[^"]+"[^>]*src="([^"]+)"[^>]*>/;

    const heroMatch = p.match(heroImgRegex);
    const clickableMatch = p.match(clickableImgRegex);

    if (heroMatch) {
      usedHeroStyle = true;
      extractedImage = heroMatch[1];
      // remove a tag
      p = p.replace(heroMatch[0], "");
    } else if (clickableMatch) {
      extractedImage = clickableMatch[1];
      p = p.replace(clickableMatch[0], "");
    }

    setImagem(extractedImage);
    setImageType(usedHeroStyle ? "hero" : "clickable");
    setPergunta(p.trim());

    setOpcoes(carta.opcoes);

    // Monta a resposta
    if (carta.tipo === "Ordem") {
      // Em baralhos antigos, a "respostaCorreta" é a ordem. Precisamos reordenar opcoes
      // ou assumimos que opcoes já estão na ordem salva.  
      // Se quisermos reordenar na tela, poderíamos ordenar via "respostaCorreta"...
      // Aqui, vamos apenas ignorar se elas não estiverem na ordem.  
      // Caso queira reordenar realmente, faça algo como:
      const desiredOrder = carta.respostaCorreta as number[];
      const sortedOpcoes = carta.opcoes.slice().sort(
        (a, b) => desiredOrder.indexOf(a.id) - desiredOrder.indexOf(b.id)
      );
      setOpcoes(sortedOpcoes);

      setRespostaCorreta([]); 
    } else if (carta.tipo === "Pergunta") {
      const correctId =
        typeof carta.respostaCorreta === "number"
          ? (carta.respostaCorreta as number)
          : 0;
      setRespostaCorreta(correctId ? [correctId] : []);
    } else if (carta.tipo === "Vantagem") {
      // Vantagem => tudo é correto, mas não precisamos exibir
      // Ajustando, mas deixamos salvo:
      setRespostaCorreta(carta.opcoes.map((o) => o.id));
    } else if (carta.tipo === "Desvantagem") {
      setRespostaCorreta([]); 
    } else {
      // MultiplaEscolha ou Outras
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

  const deleteCard = (index: number) => {
    setCards((oldCards) => oldCards.filter((_, i) => i !== index));
    if (editIndex === index) {
      resetCarta();
    }
  };

  const cancelEdit = () => {
    resetCarta();
  };

  // Antes de baixar, remover fields extras
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

      {/* Nome do Baralho */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <label className="block text-sm font-medium mb-2">
          Nome do Baralho:
        </label>
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
        <input
          type="file"
          accept=".js,.json"
          onChange={handleFileUpload}
          multiple
        />
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
            <label className="text-sm">
              Manter cartas editadas ao remover baralho
            </label>
          </div>
          <ul className="space-y-2">
            {baralhosCarregados.map((b) => (
              <li key={b.id} className="flex items-center space-x-4">
                <span className="font-medium">{b.nome}</span>
                <span className="text-sm text-gray-500">
                  {b.cartas.length} cartas
                </span>
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
            Ao remover um baralho, cartas não editadas desse baralho serão
            removidas do baralho principal. Se "Manter cartas editadas" estiver
            marcado, cartas editadas permanecem.
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
          <label className="block text-sm font-medium mb-1">
            Tipo da Carta
          </label>
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
            definir sequência; Vantagem: todas corretas; Desvantagem: todas
            erradas; Outras: mistas.
          </p>
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Título da Carta
          </label>
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
            <label className="block text-sm font-medium mb-1">
              Tipo de Imagem
            </label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value as "clickable" | "hero")}
              className="border p-2 rounded w-full"
            >
              <option value="clickable">Clicável (Zoom)</option>
              <option value="hero">Personagem (Hero)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Caminho da Imagem
            </label>
            <input
              type="text"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="/meu_arquivo.png"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500">
          "Clicável" → usa Zoom, "Hero" → imagem centralizada menor, etc.
        </p>

        {/* Pergunta */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Pergunta/Descrição
          </label>
          <textarea
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            className="border p-2 w-full rounded h-24"
          />
        </div>

        {/* Opções */}
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
                <li key={o.id} className="flex items-center space-x-2">
                  {/* Botão mover para cima/baixo (se for ORDEM) */}
                  {tipo === "Ordem" && (
                    <>
                      <button
                        onClick={() => moveOpcaoUp(idx)}
                        className="bg-gray-200 px-2 py-1 rounded text-sm"
                        title="Mover para cima"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveOpcaoDown(idx)}
                        className="bg-gray-200 px-2 py-1 rounded text-sm"
                        title="Mover para baixo"
                      >
                        ↓
                      </button>
                    </>
                  )}
                  <span className="flex-1">{o.texto}</span>

                  {/* Se NÃO for Vantagem/Desvantagem e for Pergunta/MultiplaEscolha/Outras, exibe "Correta" */}
                  {(tipo === "Pergunta" ||
                    tipo === "MultiplaEscolha" ||
                    tipo === "Outras") && (
                    <button
                      onClick={() => handleToggleRespostaCorreta(o.id)}
                      className={`${
                        respostaCorreta.includes(o.id)
                          ? "bg-green-500 text-white"
                          : "bg-gray-300"
                      } px-2 py-1 rounded text-sm`}
                    >
                      {respostaCorreta.includes(o.id)
                        ? "Correta"
                        : "Marcar correta"}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemoveOpcao(o.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            {/* Dificuldade */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Dificuldade
              </label>
              <select
                value={dificuldade}
                onChange={(e) =>
                  setDificuldade(e.target.value as Dificuldade)
                }
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

        {/* Caso seja Vantagem ou Desvantagem */}
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
            {tipo === "Desvantagem" && (
              <p className="text-xs text-gray-500">
                Todas as opções são incorretas.
              </p>
            )}
            {tipo === "Vantagem" && (
              <p className="text-xs text-gray-500">
                Todas as opções são corretas.
              </p>
            )}

            {/* Dificuldade */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Dificuldade
              </label>
              <select
                value={dificuldade}
                onChange={(e) =>
                  setDificuldade(e.target.value as Dificuldade)
                }
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
              {categoriasBloqueadas
                ? "Destravar Categorias"
                : "Travar Categorias"}
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Nova categoria"
              className="border p-2 rounded flex-1"
              disabled={categoriasBloqueadas}
            />
            <button
              onClick={handleAddCategoria}
              className={`${
                categoriasBloqueadas
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500"
              } text-white px-4 py-2 rounded`}
              disabled={categoriasBloqueadas}
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
                  className={`bg-red-500 text-white px-2 py-1 rounded text-sm ${
                    categoriasBloqueadas ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={categoriasBloqueadas}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500">
            Ao travar as categorias, não é possível adicionar ou remover mais.
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
              disabled={fontesBloqueadas}
            />
            <button
              onClick={handleAddFonte}
              className={`${
                fontesBloqueadas
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500"
              } text-white px-4 py-2 rounded`}
              disabled={fontesBloqueadas}
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
                  className={`bg-red-500 text-white px-2 py-1 rounded text-sm ${
                    fontesBloqueadas ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={fontesBloqueadas}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500">
            Ao travar as fontes, não é possível adicionar ou remover mais.
          </p>
        </div>

        {/* Vantagem, Desvantagem, Dica */}
        <div className="bg-gray-50 p-4 rounded space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Vantagem:
            </label>
            <input
              type="text"
              value={vantagem}
              onChange={(e) => setVantagem(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Desvantagem:
            </label>
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

        {/* Botões de ação */}
        <div className="flex space-x-4">
          <button
            onClick={handleAddOrUpdateCard}
            className="bg-green-600 text-white px-4 py-2 rounded w-full mt-4"
          >
            {editIndex !== null ? "Atualizar Carta" : "Adicionar Carta ao Baralho"}
          </button>
          {editIndex !== null && (
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded w-full mt-4"
            >
              Cancelar Edição
            </button>
          )}
        </div>
      </div>

      {/* Preview da Carta Atual */}
      <h2 className="text-2xl font-bold mb-4">Preview da Carta Atual</h2>
      <div className="bg-white shadow p-4 rounded mb-6 overflow-auto max-h-64">
        <pre className="text-sm whitespace-pre-wrap break-all">
          {JSON.stringify(
            {
              tipo,
              titulo,
              pergunta:
                imageType === "hero" && imagem
                  ? `<img src="${imagem}" style="display: block; margin: 0 auto; width: 120px; height: auto;" alt="${titulo}" /><br>\n${pergunta}`
                  : imagem
                  ? `<img src="${imagem}" alt="${titulo}" class="img-media my-4" />\n${pergunta}`
                  : pergunta,
              imageType,
              opcoes,
              respostaCorreta:
                tipo === "Ordem"
                  ? opcoes.map((o) => o.id)
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

      {/* Botão de download */}
      <div className="flex space-x-4">
        <button
          onClick={downloadCode}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Baixar Código
        </button>
      </div>
    </div>
  );
};

export default CriadorDeCarta;
