import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  HelpCircle,
  BookOpen,
  Home,
  SkipForward,
  Star,
  Award,
  MinusCircle,
  ChevronUp,
  Zap,
  Filter,
  Trash,
  EyeOff,
  Eye,
  Dice6,
  XCircle as XIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import manejoPlantadas from "./deck/cards_manejo_plantada";
import manejoNativas from "./deck/cards_manejo_nativa";
import ecologiaFlorestal from "./deck/cards_ecologia_florestal";
import estrelasAliens from "./dlc/cards_estrelas_aliens";
import testCards from "./.test/test_card";

interface Opcao {
  id: number;
  texto: string;
}

interface CartaBase {
  tipo: string;
  titulo: string;
  pergunta: string;
  opcoes: Opcao[];
  dificuldade: string;
  categorias: string[];
  fontes: string[];
  vantagem: string;
  desvantagem: string;
  dica: string;
}

interface CartaSingleAnswer extends CartaBase {
  respostaCorreta: number;
}

interface CartaMultipleAnswers extends CartaBase {
  respostaCorreta: number[];
}

type Carta = CartaSingleAnswer | CartaMultipleAnswers;

interface Player {
  id: number;
  name: string;
  color: string;
  fixedStars: number;
  respostasCertas: number;
  respostasErradas: number;
  respostasSeguidas: number;
  progresso: number;
  pulosDisponiveis: number;
  contadorDeEstrelas: number;
  rodadasPreso: number;
}

interface PlayerInput {
  id: number;
  name: string;
  color: string;
  showColorPicker?: boolean;
}

interface TelaInicialProps {
  onStartGame: () => void;
  onContinueGame: () => void;
  onReset: () => void;
  categoriasDisponiveis: string[];
  categoriasSelecionadas: string[];
  setCategoriasSelecionadas: React.Dispatch<React.SetStateAction<string[]>>;
  hasSavedGame: boolean;
  onPlayersSetup: (players: Player[]) => void;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  ocultarCarta: boolean;
  setOcultarCarta: React.Dispatch<React.SetStateAction<boolean>>;
  probabilityIndex: number;
  setProbabilityIndex: React.Dispatch<React.SetStateAction<number>>;
}

const predefinedColors = [
  "#9e0142",
  "#f46d43",
  "#fee08b",
  "#66c2a5",
  "#5e4fa2",
  "#ff6699",
  "#33a02c",
  "#ff7f00",
  "#3288bd",
  "#999999",
  "#8dd3c7",
  "#ffffb3",
  "#fb8072",
  "#80b1d3",
  "#b3de69",
  "#fccde5",
  "#bc80bd",
  "#1f78b4",
  "#e31a1c",
  "#ffcc33",
  "#6a3d9a",
  "#b15928",
  "#b2df8a",
  "#cab2d6",
  "#a6cee3",
  "#fb9a99",
  "#fdbf6f",
  "#ffed6f",
  "#ccebc5",
  "#ff4444",
];

const probabilitySettings = [
  { value: 0, color: "white", label: "0%" },
  { value: 0.4, color: "green", label: "40%" },
  { value: 0.6, color: "orange", label: "60%" },
  { value: 0.8, color: "red", label: "80%" },
];

const cartasOriginais = [
  ...manejoPlantadas,
  ...manejoNativas,
  ...ecologiaFlorestal,
  ...estrelasAliens,
  ...testCards,
];

interface CustomDeck {
  id: number;
  name: string;
  cards: Carta[];
  used: boolean;
}

function parseJSDeckFile(content: string): Carta[] {
  const match = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);/);
  if (!match) {
    throw new Error("Não foi possível encontrar um array exportado no arquivo JS.");
  }
  const arrayStr = match[1];
  const json = JSON.parse(arrayStr) as Carta[];
  return json;
}

function recalcularCategorias(baseCards: Carta[], decks: CustomDeck[]) {
  let allCards = [...baseCards];
  for (const d of decks) {
    allCards = [...allCards, ...d.cards];
  }
  const novasCategorias = Array.from(new Set(allCards.flatMap((c) => c.categorias))).sort();
  return novasCategorias;
}

const TelaInicial: React.FC<TelaInicialProps> = ({
  onStartGame,
  onContinueGame,
  onReset,
  categoriasDisponiveis,
  categoriasSelecionadas,
  setCategoriasSelecionadas,
  hasSavedGame,
  onPlayersSetup,
  players,
  setPlayers,
  ocultarCarta,
  setOcultarCarta,
  probabilityIndex,
  setProbabilityIndex,
}) => {
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [playerInputs, setPlayerInputs] = useState<PlayerInput[]>(
    players.length > 0
      ? players.map((p) => ({
          id: p.id,
          name: p.name,
          color: p.color,
          showColorPicker: false,
        }))
      : [
          {
            id: 0,
            name: "",
            color: predefinedColors[0],
            showColorPicker: false,
          },
        ]
  );

  const [customDecks, setCustomDecks] = useState<CustomDeck[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("customDecks");
      if (saved) {
        return JSON.parse(saved) as CustomDeck[];
      }
    }
    return [];
  });

  const [todasCategorias, setTodasCategorias] = useState<string[]>(() => {
    const baseCats = Array.from(new Set(cartasOriginais.flatMap((c) => c.categorias))).sort();
    return baseCats;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("customDecks", JSON.stringify(customDecks));
    }
    const allCats = recalcularCategorias(cartasOriginais, customDecks);
    setTodasCategorias(allCats);
    setCategoriasSelecionadas((prevCats) => prevCats.filter((c) => allCats.includes(c)));
  }, [customDecks]);

  const handleCustomDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    let newDecks: CustomDeck[] = [];
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
        newDecks.push({
          id: Date.now() + Math.random(),
          name: file.name.replace(/\.(js|json)$/, ""),
          cards: newCards,
          used: false,
        });
      } catch (error: any) {
        alert("Erro ao ler o arquivo " + file.name + ": " + error.message);
      }
    }
    if (newDecks.length > 0) {
      setCustomDecks((prev) => [...prev, ...newDecks]);
    }
  };

  const toggleDeckUsage = (deckId: number) => {
    setCustomDecks((prev) =>
      prev.map((d) => (d.id === deckId ? { ...d, used: !d.used } : d))
    );
  };

  const addPlayerInput = () => {
    if (playerInputs.length < 8) {
      setPlayerInputs([
        ...playerInputs,
        {
          id: playerInputs.length,
          name: "",
          color: predefinedColors[playerInputs.length % predefinedColors.length],
          showColorPicker: false,
        },
      ]);
    }
  };

  const handlePlayerChange = (index: number, field: "name" | "color", value: string) => {
    const updatedPlayers = [...playerInputs];
    (updatedPlayers[index] as any)[field] = value;
    setPlayerInputs(updatedPlayers);
  };

  const deletePlayer = (index: number) => {
    setPlayerInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const startGame = () => {
    const initializedPlayers: Player[] = playerInputs.map((input, index) => ({
      id: index,
      name: input.name || `Jogador ${index + 1}`,
      color: input.color || predefinedColors[index % predefinedColors.length],
      fixedStars: 0,
      respostasCertas: 0,
      respostasErradas: 0,
      respostasSeguidas: 0,
      progresso: 0,
      pulosDisponiveis: 0,
      contadorDeEstrelas: 0,
      rodadasPreso: 0,
    }));
    onPlayersSetup(initializedPlayers);
    const usedDecks = customDecks.filter((d) => d.used);
    localStorage.setItem("customUsedDecks", JSON.stringify(usedDecks));
    localStorage.setItem(
      "estadoEcoChallenge",
      JSON.stringify({
        isGameActive: true,
        jogoIniciado: true,
        players: initializedPlayers,
        currentPlayerId: 0,
        categoriasSelecionadas,
        ocultarCarta,
        probabilityIndex,
      })
    );
    onStartGame();
  };

  const categoriasFiltradas = todasCategorias
    .filter((cat) => cat.toLowerCase().includes(termoBusca.toLowerCase()))
    .sort();

  const cycleProbability = () => {
    setProbabilityIndex((prevIndex) => (prevIndex + 1) % probabilitySettings.length);
  };

  const forcedHasSavedGame = true;

  const TelaInicial: React.FC<TelaInicialProps> = () => null;

  return (
    <Card className="w-full max-w-sm mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-4">Eco Challenge: O Jogo da Sustentabilidade</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">Bem-vindo ao Eco Challenge! Teste seus conhecimentos sobre sustentabilidade.</p>
        <input
          type="text"
          placeholder="Pesquisar Categoria"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <ScrollArea className="h-40 mb-4 border rounded">
          {categoriasFiltradas.map((categoria) => (
            <div key={categoria} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={categoria}
                checked={categoriasSelecionadas.includes(categoria)}
                onChange={() => {
                  if (categoriasSelecionadas.includes(categoria)) {
                    setCategoriasSelecionadas(categoriasSelecionadas.filter((c) => c !== categoria));
                  } else {
                    setCategoriasSelecionadas([...categoriasSelecionadas, categoria]);
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={categoria} className="text-sm">{categoria}</label>
            </div>
          ))}
        </ScrollArea>
        <Button onClick={() => setCategoriasSelecionadas(todasCategorias)} className="mr-2 mt-2">
          Selecionar Todas
        </Button>
        <Button onClick={() => setCategoriasSelecionadas([])} className="mt-2">
          Limpar Todas
        </Button>
        <div className="mb-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Adicionar Jogadores</h2>
          {playerInputs.map((player, index) => (
            <div key={index} className="mb-2 border p-2 rounded">
              <div className="flex items-center space-x-2 mb-1">
                <input
                  type="text"
                  placeholder={`Nome do Jogador ${index + 1}`}
                  value={player.name}
                  maxLength={10}
                  onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
                  className="p-2 border rounded w-full"
                />
                <div className="relative">
                  <button
                    onClick={() => {
                      const copy = [...playerInputs];
                      copy[index].showColorPicker = !copy[index].showColorPicker;
                      setPlayerInputs(copy);
                    }}
                    style={{
                      backgroundColor: player.color,
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                  {player.showColorPicker && (
                    <div className="absolute z-10 bg-white border rounded mt-1 p-2 grid grid-cols-5 gap-5">
                      {predefinedColors.map((color, idx) => (
                        <button
                          key={idx}
                          style={{
                            backgroundColor: color,
                            width: "20px",
                            height: "20px",
                            borderRadius: "4px",
                            border: player.color === color ? "2px solid black" : "1px solid #ccc",
                          }}
                          onClick={() => {
                            handlePlayerChange(index, "color", color);
                            const upd = [...playerInputs];
                            upd[index].showColorPicker = false;
                            setPlayerInputs(upd);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => deletePlayer(index)}>
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
          {playerInputs.length < 8 && (
            <Button onClick={addPlayerInput} className="mt-2">
              Adicionar Jogador
            </Button>
          )}
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Baralhos Personalizados</h2>
          <input type="file" multiple accept=".js,.json" onChange={handleCustomDeckUpload} className="mb-2" />
          {customDecks.length > 0 && (
            <div className="mb-2 border p-2 rounded space-y-2">
              {customDecks.map((deck) => (
                <div key={deck.id} className="flex items-center space-x-2">
                  <span className="flex-1 text-sm">{deck.name} ({deck.cards.length} cartas)</span>
                  <Button
                    size="sm"
                    variant={deck.used ? "secondary" : "outline"}
                    onClick={() => toggleDeckUsage(deck.id)}
                  >
                    {deck.used ? "Ativo" : "Ativar"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (window.confirm("Tem certeza que deseja remover este baralho personalizado?")) {
                        setCustomDecks((prev) => prev.filter((d) => d.id !== deck.id));
                      }
                    }}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {customDecks.length === 0 && (
            <p className="text-sm text-gray-500">Nenhum baralho personalizado adicionado.</p>
          )}
        </div>
        <div className="mt-4">
          <Button
            onClick={() => setOcultarCarta(!ocultarCarta)}
            variant={ocultarCarta ? "default" : "outline"}
            className="w-full"
          >
            {ocultarCarta ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Ocultar Carta Ativado
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Ocultar Carta Desativado
              </>
            )}
          </Button>
        </div>
        <div className="mt-4">
          <Button
            onClick={cycleProbability}
            className="w-full"
            style={{
              backgroundColor: probabilitySettings[probabilityIndex].color,
              color: probabilitySettings[probabilityIndex].color === "white" ? "black" : "white",
            }}
          >
            Ajuste de Cartas Especiais: {probabilitySettings[probabilityIndex].label}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {forcedHasSavedGame && (
          <Button onClick={onContinueGame} className="w-full">
            Continuar Jogo
          </Button>
        )}
        <Button
          onClick={() => {
            startGame();
          }}
          className="w-full"
          disabled={categoriasSelecionadas.length === 0 || playerInputs.length === 0}
        >
          Iniciar Novo Jogo
        </Button>
      </CardFooter>
    </Card>
  );
};

const EcoChallenge: React.FC = () => {
  const [cartaAtual, setCartaAtual] = useState<Carta | null>(null);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mostrarDica, setMostrarDica] = useState(false);
  const [dicaUsada, setDicaUsada] = useState(false);
  const [mostrarFontes, setMostrarFontes] = useState(false);
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [opcoesEliminadas, setOpcoesEliminadas] = useState<number[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [mostrarSomentePerguntas, setMostrarSomentePerguntas] = useState(false);
  const [selecoesMultiplas, setSelecoesMultiplas] = useState<number[]>([]);
  const [ordemSelecoes, setOrdemSelecoes] = useState<number[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<number | null>(null);
  const [noCardsAvailable, setNoCardsAvailable] = useState(false);
  const [ocultarCarta, setOcultarCarta] = useState(true);
  const [cartaRevelada, setCartaRevelada] = useState(false);
  const [rolledNumber, setRolledNumber] = useState<number | null>(null);
  const [rollingNumber, setRollingNumber] = useState<number | null>(null);
  const [isDieModalOpen, setIsDieModalOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [probabilityIndex, setProbabilityIndex] = useState(0);

  const baseCategorias = Array.from(new Set(cartasOriginais.flatMap((c) => c.categorias))).sort();

  const carregarEstado = useCallback(() => {
    if (typeof window === "undefined") return;
    const st = localStorage.getItem("estadoEcoChallenge");
    if (st) {
      const data = JSON.parse(st);
      setPlayers(data.players || []);
      setCurrentPlayerId(data.currentPlayerId ?? null);
      setCategoriasSelecionadas(data.categoriasSelecionadas || []);
      setMostrarSomentePerguntas(data.mostrarSomentePerguntas || false);
      setJogoIniciado(data.jogoIniciado || false);
      setOcultarCarta(data.ocultarCarta !== undefined ? data.ocultarCarta : true);
      setProbabilityIndex(data.probabilityIndex || 0);
    }
  }, []);

  useEffect(() => {
    carregarEstado();
  }, [carregarEstado]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newState = {
        isGameActive: jogoIniciado,
        players,
        currentPlayerId,
        categoriasSelecionadas,
        mostrarSomentePerguntas,
        jogoIniciado,
        ocultarCarta,
        probabilityIndex,
      };
      localStorage.setItem("estadoEcoChallenge", JSON.stringify(newState));
    }
  }, [players, currentPlayerId, categoriasSelecionadas, mostrarSomentePerguntas, jogoIniciado, ocultarCarta, probabilityIndex]);

  const selecionarCartaAleatoria = useCallback(() => {
    const p = probabilitySettings[probabilityIndex].value;
    let incluirCartasEspeciais = true;
    if (p > 0) {
      const rv = Math.random();
      if (rv < p) {
        incluirCartasEspeciais = false;
      }
    }
    let finalCartas = [...cartasOriginais];
    if (typeof window !== "undefined") {
      const usedDecksData = localStorage.getItem("customUsedDecks");
      if (usedDecksData) {
        const usedDecks = JSON.parse(usedDecksData) as { id: number; name: string; cards: Carta[]; used: boolean }[];
        for (const d of usedDecks) {
          if (d.used) {
            finalCartas = [...finalCartas, ...d.cards];
          }
        }
      }
    }
    const filtradas = finalCartas.filter((c) => {
      const catOk = c.categorias.some((cat) => categoriasSelecionadas.includes(cat));
      const tipoOk = !mostrarSomentePerguntas || ["Pergunta", "MultiplaEscolha", "Ordem"].includes(c.tipo);
      const isEspecial = ["Vantagem", "Desvantagem", "Outras"].includes(c.tipo);
      if (!incluirCartasEspeciais && isEspecial) return false;
      return catOk && tipoOk;
    });
    if (filtradas.length === 0) {
      setNoCardsAvailable(true);
      setCartaAtual(null);
      return;
    }
    setNoCardsAvailable(false);
    const idxAleat = Math.floor(Math.random() * filtradas.length);
    const novaCarta = filtradas[idxAleat];
    setCartaAtual(novaCarta);
    setSelecionado(null);
    setSelecoesMultiplas([]);
    setOrdemSelecoes([]);
    setRespondido(false);
    setMensagem("");
    setMostrarDica(false);
    setDicaUsada(false);
    setMostrarFontes(false);
    setOpcoesEliminadas([]);
    setCartaRevelada(!ocultarCarta);
    setRolledNumber(null);
    setIsDieModalOpen(false);
  }, [categoriasSelecionadas, mostrarSomentePerguntas, ocultarCarta, probabilityIndex]);

  useEffect(() => {
    if (jogoIniciado) {
      selecionarCartaAleatoria();
    }
  }, [jogoIniciado, selecionarCartaAleatoria]);

  const currentPlayer = players.find((p) => p.id === currentPlayerId);

  const updateCurrentPlayer = (partial: Partial<Player>) => {
    setPlayers((prev) => prev.map((pl) => (pl.id === currentPlayerId ? { ...pl, ...partial } : pl)));
  };

  const handleSelecao = (id: number) => {
    if (!respondido) {
      setSelecionado(id);
    }
  };

  const handleSelecaoMultipla = (id: number) => {
    if (!respondido) {
      setSelecoesMultiplas((prev) => (prev.includes(id) ? prev.filter((z) => z !== id) : [...prev, id]));
    }
  };

  const handleSelecaoOrdem = (id: number) => {
    if (!respondido) {
      setOrdemSelecoes((prevSelecoes) =>
        prevSelecoes.includes(id) ? prevSelecoes.filter((selecaoId) => selecaoId !== id) : [...prevSelecoes, id]
      );
    }
  };

  const verificarResposta = () => {
    if (!cartaAtual || !currentPlayer) return;
    if (cartaAtual.tipo === "MultiplaEscolha" && selecoesMultiplas.length > 0) {
      const certo = Array.isArray(cartaAtual.respostaCorreta) &&
        selecoesMultiplas.sort().toString() === (cartaAtual.respostaCorreta as number[]).sort().toString();
      setRespondido(true);
      if (certo) {
        updateCurrentPlayer({
          respostasCertas: currentPlayer.respostasCertas + 1,
          respostasSeguidas: currentPlayer.respostasSeguidas + 1,
        });
        const novoProg = currentPlayer.progresso + 20;
        if (novoProg >= 100) {
          updateCurrentPlayer({
            progresso: 0,
            pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
            fixedStars: currentPlayer.fixedStars + 1,
          });
          setMensagem("Correto! Bônus extra! Barra completada!");
        } else {
          updateCurrentPlayer({ progresso: novoProg });
        }
        if (cartaAtual.dificuldade === "dificil") {
          updateCurrentPlayer({
            pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
          });
        }
        setMensagem(`Correto! ${cartaAtual.vantagem}`);
      } else {
        updateCurrentPlayer({
          respostasErradas: currentPlayer.respostasErradas + 1,
          respostasSeguidas: 0,
          progresso: Math.max(currentPlayer.progresso - 10, 0),
        });
        setMensagem(`Incorreto. ${cartaAtual.desvantagem}`);
      }
    } else if (cartaAtual.tipo === "Ordem" && ordemSelecoes.length > 0) {
      const certo = ordemSelecoes.toString() === (cartaAtual.respostaCorreta as number[]).toString();
      setRespondido(true);
      if (certo) {
        updateCurrentPlayer({
          respostasCertas: currentPlayer.respostasCertas + 1,
          respostasSeguidas: currentPlayer.respostasSeguidas + 1,
        });
        const p2 = currentPlayer.progresso + 20;
        if (p2 >= 100) {
          updateCurrentPlayer({
            progresso: 0,
            pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
            fixedStars: currentPlayer.fixedStars + 1,
          });
          setMensagem("Correto! Bônus extra! Barra completada!");
        } else {
          updateCurrentPlayer({ progresso: p2 });
        }
        if (cartaAtual.dificuldade === "dificil") {
          updateCurrentPlayer({
            pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
          });
        }
        setMensagem(`Correto! ${cartaAtual.vantagem}`);
      } else {
        updateCurrentPlayer({
          respostasErradas: currentPlayer.respostasErradas + 1,
          respostasSeguidas: 0,
          progresso: Math.max(currentPlayer.progresso - 10, 0),
        });
        setMensagem(`Incorreto. ${cartaAtual.desvantagem}`);
      }
    } else if (cartaAtual && selecionado !== null) {
      setRespondido(true);
      const certo = Array.isArray(cartaAtual.respostaCorreta)
        ? cartaAtual.respostaCorreta.includes(selecionado)
        : cartaAtual.respostaCorreta === selecionado;
      if (certo) {
        if (["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo)) {
          updateCurrentPlayer({
            respostasCertas: currentPlayer.respostasCertas + 1,
            respostasSeguidas: currentPlayer.respostasSeguidas + 1,
          });
          const p3 = currentPlayer.progresso + 20;
          if (p3 >= 100) {
            updateCurrentPlayer({
              progresso: 0,
              pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
              fixedStars: currentPlayer.fixedStars + 1,
            });
            setMensagem("Correto! Bônus extra! Barra completada!");
          } else {
            updateCurrentPlayer({ progresso: p3 });
          }
          if (cartaAtual.dificuldade === "dificil") {
            updateCurrentPlayer({
              pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
            });
          }
        }
        setMensagem(`Correto! ${cartaAtual.vantagem}`);
      } else {
        if (["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo)) {
          updateCurrentPlayer({
            respostasErradas: currentPlayer.respostasErradas + 1,
            respostasSeguidas: 0,
            progresso: Math.max(currentPlayer.progresso - 10, 0),
          });
          setMensagem(`Incorreto. ${cartaAtual.desvantagem}`);
        }
      }
    }
  };

  const resetarContadores = () => {
    if (window.confirm("Tem certeza que deseja resetar os contadores do jogador atual?")) {
      if (!currentPlayer) return;
      updateCurrentPlayer({
        respostasCertas: 0,
        respostasErradas: 0,
        progresso: 0,
        pulosDisponiveis: 0,
        respostasSeguidas: 0,
        rodadasPreso: 0,
        contadorDeEstrelas: 0,
      });
      setMensagem("");
      setTimeout(() => setMensagem(""), 2000);
    }
  };

  const resetarTudo = () => {
    if (window.confirm("Tem certeza que deseja resetar todo o jogo?")) {
      setCategoriasSelecionadas([]);
      setMensagem("Jogo resetado!");
      if (typeof window !== "undefined") {
        localStorage.removeItem("estadoEcoChallenge");
      }
    }
  };

  const toggleDica = () => {
    if (!currentPlayer || !cartaAtual) return;
    if (dicaUsada) {
      setMensagem("Você já usou a dica para esta pergunta.");
      return;
    }
    if (currentPlayer.respostasSeguidas >= 2 && cartaAtual.dica) {
      setMostrarDica(true);
      setDicaUsada(true);
      updateCurrentPlayer({ respostasSeguidas: currentPlayer.respostasSeguidas - 2 });
    } else if (!cartaAtual.dica) {
      setMensagem("Esta carta não possui dica.");
    } else {
      setMensagem("Você precisa de pelo menos 2 respostas corretas seguidas para usar a dica!");
    }
  };

  const toggleFontes = () => {
    setMostrarFontes(!mostrarFontes);
  };

  const pularPergunta = () => {
    if (!currentPlayer || !cartaAtual) return;
    if (currentPlayer.pulosDisponiveis > 0) {
      updateCurrentPlayer({ pulosDisponiveis: currentPlayer.pulosDisponiveis - 1 });
      selecionarCartaAleatoria();
    }
  };

  const eliminarRespostaErrada = () => {
    if (!currentPlayer || !cartaAtual) return;
    if (currentPlayer.respostasSeguidas >= 2) {
      const opsErradas = cartaAtual.opcoes.filter((op) => {
        if (Array.isArray(cartaAtual.respostaCorreta)) {
          return !cartaAtual.respostaCorreta.includes(op.id);
        }
        return op.id !== cartaAtual.respostaCorreta;
      });
      const rest = opsErradas.filter((op) => !opcoesEliminadas.includes(op.id));
      if (rest.length > 0) {
        const idx = Math.floor(Math.random() * rest.length);
        const elim = rest[idx].id;
        setOpcoesEliminadas((prev) => [...prev, elim]);
        updateCurrentPlayer({ respostasSeguidas: currentPlayer.respostasSeguidas - 2 });
        setMensagem("Uma resposta errada foi eliminada!");
      }
    } else {
      setMensagem("Você precisa de pelo menos 2 respostas corretas seguidas!");
    }
  };

  const voltarTelaInicial = () => {
    setJogoIniciado(false);
  };

  const incrementarRodadasPreso = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({ rodadasPreso: currentPlayer.rodadasPreso + 1 });
    setMensagem("Um contador adicionado!");
  };

  const diminuirRodadasPreso = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({ rodadasPreso: currentPlayer.rodadasPreso - 1 });
    setMensagem("Um contador removido!");
  };

  const diminuirAcertos = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({
      respostasCertas: currentPlayer.respostasCertas > 0 ? currentPlayer.respostasCertas - 1 : 0,
    });
    setMensagem("Acerto removido!");
  };

  const diminuirErros = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({
      respostasErradas: currentPlayer.respostasErradas > 0 ? currentPlayer.respostasErradas - 1 : 0,
    });
    setMensagem("Erro removido!");
  };

  const incrementarContadorDeEstrelas = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({ contadorDeEstrelas: currentPlayer.contadorDeEstrelas + 1 });
    setMensagem("Estrela adicionada!");
  };

  const diminuirContadorDeEstrelas = () => {
    if (!currentPlayer) return;
    if (currentPlayer.contadorDeEstrelas > 0) {
      updateCurrentPlayer({ contadorDeEstrelas: currentPlayer.contadorDeEstrelas - 1 });
      setMensagem("Estrela removida!");
    } else {
      setMensagem("Nenhuma estrela para remover!");
    }
  };

  function renderizarConteudoPergunta() {
    if (!cartaAtual) return null;
    return <div dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta }} />;
  }

  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleLongPressStart = () => {
    longPressTimeout.current = setTimeout(() => {
      rolarDado();
    }, 1000);
  };

  const handleLongPressEnd = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const handleLongPressCancel = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
  };

  const rolarDado = () => {
    if (isRolling) return;
    setIsRolling(true);
    setIsDieModalOpen(true);
    let rollCount = 0;
    const maxRolls = 10;
    const rollInterval = setInterval(() => {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      setRollingNumber(randomNum);
      rollCount++;
      if (rollCount >= maxRolls) {
        clearInterval(rollInterval);
        const finalNumber = Math.floor(Math.random() * 6) + 1;
        setRolledNumber(finalNumber);
        setRollingNumber(null);
        setIsRolling(false);
      }
    }, 100);
  };

  const isDisabled =
    !cartaAtual ||
    ((cartaAtual.tipo === "Ordem" && ordemSelecoes.length !== cartaAtual.opcoes.length) ||
      (cartaAtual.tipo !== "Ordem" && selecionado === null && selecoesMultiplas.length === 0));

  const verificarRespostaProps = {
    className: `w-full mt-2 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`,
    onMouseDown: handleLongPressStart,
    onMouseUp: handleLongPressEnd,
    onMouseLeave: handleLongPressEnd,
    onTouchStart: handleLongPressStart,
    onTouchEnd: handleLongPressEnd,
    onTouchCancel: handleLongPressCancel,
    ...(isDisabled ? {} : { onClick: verificarResposta }),
  };

  if (!jogoIniciado) {
    return (
      <TelaInicial
        onStartGame={() => setJogoIniciado(true)}
        onContinueGame={() => {
          carregarEstado();
          setJogoIniciado(true);
        }}
        onReset={() => {
          resetarTudo();
        }}
        categoriasDisponiveis={baseCategorias}
        categoriasSelecionadas={categoriasSelecionadas}
        setCategoriasSelecionadas={setCategoriasSelecionadas}
        hasSavedGame={true}
        onPlayersSetup={(initPlayers) => {
          setPlayers(initPlayers);
          setCurrentPlayerId(initPlayers[0]?.id ?? null);
        }}
        players={players}
        setPlayers={setPlayers}
        ocultarCarta={ocultarCarta}
        setOcultarCarta={setOcultarCarta}
        probabilityIndex={probabilityIndex}
        setProbabilityIndex={setProbabilityIndex}
      />
    );
  }

  const hasQuestionCards = cartasOriginais.some(
    (c) => c.categorias.some((cat) => categoriasSelecionadas.includes(cat)) &&
           ["Pergunta", "MultiplaEscolha", "Ordem"].includes(c.tipo)
  );

  if (noCardsAvailable) {
    return (
      <div className="flex flex-col items-center">
        <p className="mt-4 text-center">Nenhuma carta disponível com os filtros atuais.</p>
        <Button
          onClick={() => {
            setMostrarSomentePerguntas(false);
            setJogoIniciado(false);
            setNoCardsAvailable(false);
            setCategoriasSelecionadas([]);
          }}
          className="mt-4"
        >
          Remover Filtro
        </Button>
      </div>
    );
  }

  if (!cartaAtual || !currentPlayer) {
    return (
      <div className="flex flex-col items-center">
        <p className="mt-4 text-center">O jogo não pôde ser carregado.</p>
        <Button onClick={voltarTelaInicial} className="mt-4">
          Voltar para a Tela Inicial
        </Button>
      </div>
    );
  }

  function obterEstiloCarta() {
    if (ocultarCarta && !cartaRevelada) return "border-gray-200 bg-white";
    if (cartaAtual.tipo === "Outras") return "border-blue-200 bg-blue-50";
    if (cartaAtual.tipo === "Vantagem") return "border-green-200 bg-green-50";
    if (cartaAtual.tipo === "Desvantagem") return "border-red-200 bg-red-50";
    return mostrarSomentePerguntas ? "border-blue-500 bg-gray-50" : "border-gray-200 bg-white";
  }

  return (
    <div className="flex flex-col items-center">
      <Card
        className={`w-full max-w-sm mx-auto mt-4 ${obterEstiloCarta()}`}
        style={players.length > 1 && currentPlayer && !(ocultarCarta && !cartaRevelada)
          ? { boxShadow: `0 0 10px 5px ${currentPlayer.color}` }
          : {}}
      >
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setMostrarSomentePerguntas((prev) => !prev)}
                size="sm"
                variant={mostrarSomentePerguntas ? "default" : "outline"}
                disabled={!hasQuestionCards}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <div className="flex flex-col">
                <CardTitle className="text-xl font-bold">
                  {ocultarCarta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo}
                </CardTitle>
                {!ocultarCarta || cartaRevelada ? (
                  <p className="text-xs text-gray-500">{cartaAtual.categorias.join(", ")}</p>
                ) : null}
              </div>
            </div>
            {!ocultarCarta || cartaRevelada ? (
              <Badge
                variant={
                  cartaAtual.dificuldade === "facil"
                    ? "secondary"
                    : cartaAtual.dificuldade === "normal"
                    ? "default"
                    : "destructive"
                }
              >
                {cartaAtual.dificuldade}
              </Badge>
            ) : null}
          </div>
          {!ocultarCarta || cartaRevelada ? (
            <ScrollArea className="h-56 rounded-md border p-4">
              <div className="text-sm">{renderizarConteudoPergunta()}</div>
            </ScrollArea>
          ) : (
            <div className="h-56 flex flex-col items-center justify-center space-y-2">
              <p className="text-sm">Conteúdo da carta oculto</p>
              {rolledNumber !== null && <p className="text-xl font-bold">Você rolou um {rolledNumber}</p>}
              <Button
                onClick={rolarDado}
                variant="outline"
                className="mt-2"
                onTouchStart={handleLongPressStart}
                onTouchEnd={handleLongPressEnd}
                onTouchCancel={handleLongPressCancel}
                onMouseDown={handleLongPressStart}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
              >
                <Dice6 className="h-6 w-6" />
                Rolar Dado
              </Button>
            </div>
          )}
        </CardHeader>
        {!ocultarCarta || cartaRevelada ? (
          <CardContent>
            <div className="space-y-2">
              {cartaAtual.opcoes.map((op) => {
                const isCorrect = Array.isArray(cartaAtual.respostaCorreta)
                  ? cartaAtual.respostaCorreta.includes(op.id)
                  : cartaAtual.respostaCorreta === op.id;
                const selected = selecionado === op.id || selecoesMultiplas.includes(op.id);
                const wrongSelection =
                  respondido && selected && !isCorrect && (
                    cartaAtual.tipo === "MultiplaEscolha"
                      ? !(Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(op.id))
                      : cartaAtual.respostaCorreta !== op.id
                  );
                const missingSelection =
                  respondido && !selected && isCorrect && cartaAtual.tipo === "MultiplaEscolha";
                const eliminated = opcoesEliminadas.includes(op.id);
                return (
                  <Button
                    key={op.id}
                    onClick={() => {
                      if (cartaAtual.tipo === "MultiplaEscolha") {
                        handleSelecaoMultipla(op.id);
                      } else if (cartaAtual.tipo === "Ordem") {
                        handleSelecaoOrdem(op.id);
                      } else {
                        handleSelecao(op.id);
                      }
                    }}
                    variant={selected ? "secondary" : "outline"}
                    className={`w-full justify-start text-sm ${
                      respondido && isCorrect ? "bg-green-100" : ""
                    } ${
                      respondido && selected && !isCorrect ? "bg-red-100" : ""
                    } ${
                      respondido &&
                      cartaAtual.tipo === "MultiplaEscolha" &&
                      Array.isArray(cartaAtual.respostaCorreta) &&
                      !cartaAtual.respostaCorreta.includes(op.id) &&
                      selecoesMultiplas.includes(op.id)
                        ? "bg-red-100"
                        : ""
                    } ${
                      respondido &&
                      cartaAtual.tipo === "MultiplaEscolha" &&
                      Array.isArray(cartaAtual.respostaCorreta) &&
                      cartaAtual.respostaCorreta.includes(op.id) &&
                      !selecoesMultiplas.includes(op.id)
                        ? "bg-blue-100"
                        : ""
                    } ${
                      respondido &&
                      cartaAtual.tipo === "Ordem" &&
                      ordemSelecoes.includes(op.id) &&
                      ordemSelecoes.indexOf(op.id) + 1 !==
                        (cartaAtual.respostaCorreta as number[]).indexOf(op.id) + 1
                        ? "bg-red-100"
                        : ""
                    } ${
                      respondido &&
                      cartaAtual.tipo === "Ordem" &&
                      ordemSelecoes.includes(op.id) &&
                      ordemSelecoes.indexOf(op.id) + 1 ===
                        (cartaAtual.respostaCorreta as number[]).indexOf(op.id) + 1
                        ? "bg-green-100"
                        : ""
                    } ${eliminated ? "opacity-50" : ""}`}
                    disabled={eliminated}
                    style={{
                      maxHeight: "80px",
                      height: "auto",
                      overflowY: "auto",
                      whiteSpace: "normal",
                      alignItems: "flex-start",
                      display: "flex",
                      textAlign: "left",
                      padding: "8px",
                    }}
                  >
                    {op.texto}
                    {cartaAtual.tipo === "MultiplaEscolha" && (
                      <span className="ml-2">
                        {selecoesMultiplas.includes(op.id) ? (
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        ) : (
                          <span className="h-4 w-4 border rounded" />
                        )}
                      </span>
                    )}
                    {cartaAtual.tipo === "Ordem" && ordemSelecoes.includes(op.id) && (
                      <span className="ml-2">
                        {ordemSelecoes.indexOf(op.id) + 1}
                        {respondido &&
                          ordemSelecoes.indexOf(op.id) + 1 !==
                            (cartaAtual.respostaCorreta as number[]).indexOf(op.id) + 1 && (
                            <span className="ml-1 text-blue-500">
                              ({(cartaAtual.respostaCorreta as number[]).indexOf(op.id) + 1})
                            </span>
                          )}
                      </span>
                    )}
                    {respondido && isCorrect && <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />}
                    {respondido && selected && !isCorrect && <XCircle className="ml-auto h-4 w-4 text-red-500" />}
                  </Button>
                );
              })}
            </div>
            {mostrarDica && (
              <Alert className="mt-4">
                <AlertDescription>{cartaAtual.dica}</AlertDescription>
              </Alert>
            )}
            {mostrarFontes && (
              <Alert className="mt-4">
                <AlertDescription>
                  <ul className="list-disc list-inside">
                    {cartaAtual.fontes.map((fonte, idx) => (
                      <li key={idx}>{fonte}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        ) : null}
        <CardFooter className="flex flex-col items-center">
          <div className="flex flex-wrap justify-between w-full mb-1 space-x-2">
            <Button onClick={toggleFontes} size="sm" variant="outline" disabled={ocultarCarta && !cartaRevelada}>
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button
              onClick={pularPergunta}
              size="sm"
              variant={currentPlayer?.pulosDisponiveis === 0 ? "outline" : "secondary"}
              disabled={
                (currentPlayer?.pulosDisponiveis === 0 ||
                  !["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo)) ||
                (ocultarCarta && !cartaRevelada)
              }
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              onClick={toggleDica}
              size="sm"
              variant={
                currentPlayer &&
                (currentPlayer.respostasSeguidas < 2 || !cartaAtual.dica || dicaUsada)
                  ? "outline"
                  : "secondary"
              }
              disabled={
                !currentPlayer ||
                currentPlayer.respostasSeguidas < 2 ||
                !cartaAtual.dica ||
                (ocultarCarta && !cartaRevelada) ||
                dicaUsada
              }
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button
              onClick={eliminarRespostaErrada}
              size="sm"
              variant={currentPlayer && currentPlayer.respostasSeguidas < 2 ? "outline" : "secondary"}
              disabled={
                !currentPlayer ||
                currentPlayer.respostasSeguidas < 2 ||
                (ocultarCarta && !cartaRevelada)
              }
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            <Button onClick={resetarContadores} size="sm" variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button onClick={voltarTelaInicial} size="sm" variant="outline">
              <Home className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap justify-between w-full space-x-2">
            <Button onClick={diminuirAcertos} size="sm" variant="outline">
              <ThumbsDown className="h-4 w-4 text-green-500" />
            </Button>
            <Button onClick={diminuirErros} size="sm" variant="outline">
              <ThumbsUp className="h-4 w-4 text-red-500" />
            </Button>
            <Button onClick={diminuirContadorDeEstrelas} size="sm" variant="outline">
              <Star className="h-4 w-4 text-red-500" />
            </Button>
            <Button onClick={incrementarContadorDeEstrelas} size="sm" variant="outline">
              <Star className="h-4 w-4 text-yellow-500" />
            </Button>
            <Button onClick={diminuirRodadasPreso} size="sm" variant="outline">
              <ChevronUp className="h-4 w-4 text-purple-500 transform rotate-180" />
            </Button>
            <Button onClick={incrementarRodadasPreso} size="sm" variant="outline">
              <ChevronUp className="h-4 w-4 text-purple-500" />
            </Button>
          </div>
          <div className="flex justify-between w-full mb-4">
            {ocultarCarta && !cartaRevelada ? (
              <Button onClick={() => setCartaRevelada(true)} className="w-full mt-2">
                Revelar
              </Button>
            ) : !respondido ? (
              <Button {...verificarRespostaProps}>Verificar</Button>
            ) : (
              <Button
                onClick={selecionarCartaAleatoria}
                className="w-full mt-2"
                onMouseDown={handleLongPressStart}
                onMouseUp={handleLongPressEnd}
                onMouseLeave={handleLongPressEnd}
                onTouchStart={handleLongPressStart}
                onTouchEnd={handleLongPressEnd}
                onTouchCancel={handleLongPressCancel}
              >
                Próxima Carta
              </Button>
            )}
          </div>
          {["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo) && mensagem && (
            <p className="text-center font-bold text-sm mb-2">{mensagem}</p>
          )}
          <Progress value={currentPlayer.progresso} className={`w-full ${currentPlayer.progresso === 100 ? "bg-green-500" : ""}`} />
          <div className="flex justify-between w-full mt-4 text-sm">
            <div className="flex items-center space-x-1">
              <ChevronUp className="h-4 w-4 text-purple-500" />
              <span>{currentPlayer.rodadasPreso}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-yellow-500" />
              <span>{currentPlayer.fixedStars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{currentPlayer.contadorDeEstrelas}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SkipForward className="h-4 w-4" />
              <span>{currentPlayer.pulosDisponiveis}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span>{currentPlayer.respostasCertas}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsDown className="h-4 w-4 text-red-500" />
              <span>{currentPlayer.respostasErradas}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-purple-500" />
              <span>{currentPlayer.respostasSeguidas}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
      <div className={`grid gap-1 mt-4 ${players.length > 4 ? "grid-cols-4" : `grid-cols-${players.length}`}`} style={{ width: "100%", maxWidth: "400px" }}>
        {players.map((pl) => (
          <Button
            key={pl.id}
            onClick={() => setCurrentPlayerId(pl.id)}
            size="sm"
            variant={currentPlayerId === pl.id ? "default" : "outline"}
            style={{
              backgroundColor: currentPlayerId === pl.id ? pl.color : undefined,
              color: currentPlayerId === pl.id ? "#fff" : undefined,
              width: "100%",
            }}
          >
            {pl.name}
          </Button>
        ))}
      </div>
      {isDieModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center relative w-96 h-96 flex flex-col justify-center">
            <Button className="absolute top-4 right-4" variant="ghost" onClick={() => setIsDieModalOpen(false)} disabled={isRolling}>
              <XIcon className="h-8 w-8 text-gray-500" />
            </Button>
            {isRolling ? (
              <>
                <p className="text-lg mb-2">Rolando o dado...</p>
                <p className="text-6xl font-bold mb-6 animate-bounce">{rollingNumber}</p>
              </>
            ) : (
              <>
                <p className="text-lg mb-2">Você sorteou um</p>
                <p className="text-6xl font-bold mb-6">{rolledNumber}</p>
                <Button onClick={rolarDado}>
                  <Dice6 className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoChallenge;
