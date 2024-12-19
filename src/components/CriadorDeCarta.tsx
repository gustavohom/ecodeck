import React, { useState } from "react";

interface Opcao {
  id: number;
  texto: string;
}

// Adicionamos campos opcionais: origBaralhoId e edited
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
  origBaralhoId?: number; // Id do baralho de onde veio
  edited?: boolean; // Se a carta foi editada
}

const CARD_TYPES = ["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras"] as const;
type TipoCarta = typeof CARD_TYPES[number];

const DIFFICULTIES = ["facil", "normal", "dificil"] as const;
type Dificuldade = typeof DIFFICULTIES[number];

interface BaralhoCarregado {
  id: number;
  nome: string;
  cartas: Carta[];
  adicionado: boolean; // se já foram adicionadas as cartas ao baralho principal
}

const CriadorDeCarta: React.FC = () => {
  const [deckName, setDeckName] = useState<string>("meu_baralho");
  const [cards, setCards] = useState<Carta[]>([]);

  // Estados da carta atual
  const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
  const [titulo, setTitulo] = useState<string>("");
  const [pergunta, setPergunta] = useState<string>("");
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [novaOpcao, setNovaOpcao] = useState<string>("");
  const [imagem, setImagem] = useState<string>("");
  const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
  const [dificuldade, setDificuldade] = useState<Dificuldade>("facil");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [novaCategoria, setNovaCategoria] = useState<string>("");
  const [fontes, setFontes] = useState<string[]>([]);
  const [novaFonte, setNovaFonte] = useState<string>("");
  const [vantagem, setVantagem] = useState<string>("");
  const [desvantagem, setDesvantagem] = useState<string>("");
  const [dica, setDica] = useState<string>("");
  const [ordemMap, setOrdemMap] = useState<Record<number, number>>({});
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [categoriasBloqueadas, setCategoriasBloqueadas] = useState<boolean>(false);

  // Lista de baralhos carregados
  const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
  
  // Manter cartas editadas ao remover baralho
  const [manterCartasEditadas, setManterCartasEditadas] = useState<boolean>(false);

  let baralhoIdCounter = 0; // contador para atribuir ids aos baralhos carregados

  // Função para tentar extrair o array de um arquivo .js
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
        // Cria um novo baralho carregado, inicialmente não adicionado
        newBaralhos.push({
          id: Date.now() + Math.random(),
          nome,
          cartas: newCards,
          adicionado: false
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
          // Marca como adicionado e insere as cartas no baralho principal
          const newCards = b.cartas.map((carta) => ({
            ...carta,
            origBaralhoId: baralhoId,
            edited: false
          }));
          setCards((oldCards) => [...oldCards, ...newCards]);
          return { ...b, adicionado: true };
        }
        return b;
      })
    );
  };

  const removerBaralho = (baralhoId: number) => {
    // Ao remover o baralho, removemos as cartas não editadas desse baralho
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId) {
          // Ajustar o array de cards
          setCards((oldCards) =>
            oldCards.filter((c) => {
              if (c.origBaralhoId === baralhoId) {
                // Se a carta pertence a esse baralho
                if (c.edited && manterCartasEditadas) {
                  // Se carta editada e manterCartasEditadas = true, mantem
                  return true;
                } else if (c.edited && !manterCartasEditadas) {
                  // carta editada e nao manter? Remove também? 
                  // Pela descrição, manter cartas editadas significa que se desmarcarmos, remove tudo.
                  // Ajustando a interpretação: "Se clicasse em remover baralho e manter editadas estivesse ON,
                  // as editadas ficam. Se não, apaga todas, inclusive as editadas."
                  return false;
                } else if (!c.edited) {
                  // carta não editada remove
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
    if (tipo === "MultiplaEscolha" || tipo === "Vantagem" || tipo === "Outras") {
      if (respostaCorreta.includes(id)) {
        setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
      } else {
        setRespostaCorreta([...respostaCorreta, id]);
      }
    } else if (tipo === "Pergunta") {
      setRespostaCorreta([id]);
    }
  };

  const handleSetOrder = (opcaoId: number, position: number) => {
    if (position < 1) return; 
    setOrdemMap({ ...ordemMap, [opcaoId]: position });
  };

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

  const handleAddFonte = () => {
    if (novaFonte.trim() !== "") {
      setFontes([...fontes, novaFonte]);
      setNovaFonte("");
    }
  };

  const handleRemoveFonte = (f: string) => {
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
    setEditIndex(null);
  };

  const handleAddOrUpdateCard = () => {
    let finalRespostaCorreta: number | number[] = respostaCorreta;

    if (tipo === "Ordem") {
      const sortedOpcoes = opcoes
        .slice()
        .sort((a, b) => (ordemMap[a.id] || 999) - (ordemMap[b.id] || 999));
      finalRespostaCorreta = sortedOpcoes.map((o) => o.id);
    } else if (tipo === "Pergunta") {
      finalRespostaCorreta = respostaCorreta.length > 0 ? respostaCorreta[0] : 0;
    }

    const novaCarta: Carta = {
      tipo,
      titulo,
      pergunta: imagem
        ? `<img src="${imagem}" alt="${titulo}" class="img-media my-4" />\n` + pergunta
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

    if (editIndex !== null) {
      setCards((oldCards) =>
        oldCards.map((c, i) => {
          if (i === editIndex) {
            // marcar como editado
            return { ...novaCarta, origBaralhoId: c.origBaralhoId, edited: true };
          }
          return c;
        })
      );
    } else {
      // Carta nova adicionada manualmente não pertence a nenhum baralho (origBaralhoId undefined)
      setCards((oldCards) => [...oldCards, { ...novaCarta, edited: true }]);
    }

    resetCarta();
  };

  const loadCardForEdit = (index: number) => {
    const carta = cards[index];
    setEditIndex(index);
    setTipo(carta.tipo as TipoCarta);
    setTitulo(carta.titulo);

    let p = carta.pergunta;
    let imgSrc = "";
    if (p.startsWith("<img")) {
      const imgTagMatch = p.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]+)"[^>]*class="([^"]+)"[^>]*>\n?/);
      if (imgTagMatch) {
        imgSrc = imgTagMatch[1];
        p = p.replace(imgTagMatch[0], "");
      }
    }
    setImagem(imgSrc);
    setPergunta(p);

    setOpcoes(carta.opcoes);

    if (carta.tipo === "Ordem") {
      const ordemArray = carta.respostaCorreta as number[];
      const newOrdemMap: Record<number, number> = {};
      carta.opcoes.forEach((op) => {
        const pos = ordemArray.indexOf(op.id);
        if (pos >= 0) {
          newOrdemMap[op.id] = pos + 1;
        }
      });
      setOrdemMap(newOrdemMap);
      setRespostaCorreta([]);
    } else if (carta.tipo === "Pergunta") {
      const correct = typeof carta.respostaCorreta === "number" ? [carta.respostaCorreta] : [];
      setRespostaCorreta(correct);
      setOrdemMap({});
    } else {
      const correctArr = Array.isArray(carta.respostaCorreta)
        ? carta.respostaCorreta
        : [carta.respostaCorreta];
      setRespostaCorreta(correctArr.filter((x) => x !== 0));
      setOrdemMap({});
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

  // Antes de baixar, remover campos origBaralhoId e edited das cartas
  const prepareForDownload = (): Carta[] => {
    return cards.map(({ origBaralhoId, edited, ...rest }) => rest);
  };

  const generateCode = () => {
    const deckFinal = prepareForDownload();
    const deck = JSON.stringify(deckFinal, null, 2);
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
          Selecione um ou mais arquivos .js ou .json contendo arrays de cartas. Eles serão listados abaixo.
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

      <h2 className="text-2xl font-bold mb-4">{editIndex !== null ? "Editar Carta" : "Adicionar Carta"}</h2>
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
            Pergunta: uma resposta correta; MultiplaEscolha: múltiplas corretas; Ordem: defina a
            sequência (sem negativos); Vantagem: apenas corretas; Desvantagem: apenas erradas; Outras: mistas.
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

        <div>
          <label className="block text-sm font-medium mb-1">Imagem (nome do arquivo, opcional)</label>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="/minha_imagem.jpg"
          />
          <p className="text-xs text-gray-500 mt-1">Se tiver imagem, ela aparecerá no início da pergunta.</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Pergunta/Descrição</label>
          <textarea
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            className="border p-2 w-full rounded h-24"
          />
        </div>

        {["Pergunta", "MultiplaEscolha", "Ordem"].includes(tipo) && (
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
              <button onClick={handleAddOpcao} className="bg-blue-500 text-white px-4 py-2 rounded">
                Adicionar Opção
              </button>
            </div>
            <ul className="space-y-2">
              {opcoes.map((o) => (
                <li key={o.id} className="flex items-center space-x-2">
                  <span className="flex-1">{o.texto}</span>
                  {tipo === "Ordem" ? (
                    <div className="flex items-center space-x-1">
                      <label className="text-sm">Posição:</label>
                      <input
                        type="number"
                        min="1"
                        value={ordemMap[o.id] || ""}
                        onChange={(e) => handleSetOrder(o.id, Number(e.target.value))}
                        className="border p-1 w-16 rounded"
                      />
                      <p className="text-xs text-gray-500 ml-2">1,2,3... sem negativos</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleToggleRespostaCorreta(o.id)}
                      className={`${
                        respostaCorreta.includes(o.id) ? "bg-green-500" : "bg-gray-300"
                      } text-white px-2 py-1 rounded text-sm`}
                    >
                      {respostaCorreta.includes(o.id) ? "Correta" : "Marcar correta"}
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

        {(tipo === "Vantagem" || tipo === "Desvantagem" || tipo === "Outras") && (
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
              <button onClick={handleAddOpcao} className="bg-blue-500 text-white px-4 py-2 rounded">
                Adicionar Opção
              </button>
            </div>
            <ul className="space-y-2">
              {opcoes.map((o) => (
                <li key={o.id} className="flex items-center space-x-2">
                  <span className="flex-1">{o.texto}</span>
                  {(tipo === "Vantagem" || tipo === "Outras") && (
                    <button
                      onClick={() => handleToggleRespostaCorreta(o.id)}
                      className={`${
                        respostaCorreta.includes(o.id) ? "bg-green-500" : "bg-gray-300"
                      } text-white px-2 py-1 rounded text-sm`}
                    >
                      {respostaCorreta.includes(o.id) ? "Correta" : "Marcar correta"}
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
            {tipo === "Desvantagem" && (
              <p className="text-xs text-gray-500">
                Em cartas de desvantagem, geralmente não há respostas corretas.
              </p>
            )}
            {tipo === "Vantagem" && (
              <p className="text-xs text-gray-500">
                Em cartas de vantagem, todas as marcadas serão consideradas corretas.
              </p>
            )}
            {tipo === "Outras" && (
              <p className="text-xs text-gray-500">
                Em cartas Outras, você pode ter um mix de certas e erradas.
              </p>
            )}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Categorias</h3>
            <button
              onClick={() => setCategoriasBloqueadas(!categoriasBloqueadas)}
              className={`px-4 py-1 rounded text-white ${categoriasBloqueadas ? "bg-red-500" : "bg-green-500"}`}
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
              disabled={categoriasBloqueadas}
            />
            <button
              onClick={handleAddCategoria}
              className={`${
                categoriasBloqueadas ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
              } text-white px-4 py-2 rounded`}
              disabled={categoriasBloqueadas}
            >
              Adicionar Categoria
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
            Ao travar as categorias, não é possível adicionar ou remover mais categorias.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded space-y-4">
          <h3 className="text-lg font-semibold">Fontes</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              value={novaFonte}
              onChange={(e) => setNovaFonte(e.target.value)}
              placeholder="Nova fonte"
              className="border p-2 rounded flex-1"
            />
            <button onClick={handleAddFonte} className="bg-blue-500 text-white px-4 py-2 rounded">
              Adicionar Fonte
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

      <h2 className="text-2xl font-bold mb-4">Preview da Carta Atual</h2>
      <div className="bg-white shadow p-4 rounded mb-6 overflow-auto max-h-64">
        <pre className="text-sm whitespace-pre-wrap break-all">
          {JSON.stringify(
            {
              tipo,
              titulo,
              pergunta: imagem
                ? `<img src="${imagem}" alt="${titulo}" class="img-media my-4" />\n` + pergunta
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
      </div>

      <h2 className="text-2xl font-bold mb-4">Cartas Criadas</h2>
      {cards.length === 0 && <p className="text-gray-500 mb-4">Nenhuma carta criada ainda.</p>}
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

      <div className="flex space-x-4">
        <button onClick={downloadCode} className="bg-blue-500 text-white px-4 py-2 rounded">
          Baixar Código
        </button>
      </div>
    </div>
  );
};

export default CriadorDeCarta;
