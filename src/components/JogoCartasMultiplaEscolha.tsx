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

// Interfaces e tipos – extensão para novas cartas
interface Opcao {
  id: number;
  texto: string;
  // Para WordAssociation, incluímos a coluna correta (1 ou 2)
  colunaCorreta?: number;
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
  // Campos opcionais para novas dinâmicas:
  tempo?: number; // para Quiz, Time, Rally
  microperguntas?: { pergunta: string; opcoes: Opcao[]; respostaCorreta: number }[];
  alternativasAposta?: string[]; // para RiskReward
  sequencia?: string[]; // para Memory
  // Para WordAssociation
  coluna1Titulo?: string;
  coluna2Titulo?: string;
  // Para Logic
  respostasAceitas?: string[];
  // Para Matching
  itensA?: { id: number; texto: string }[];
  itensB?: { id: number; texto: string }[];
  associacoesCorretas?: { [key: number]: number };
}

interface CartaSingleAnswer extends CartaBase {
  respostaCorreta: number;
}

interface CartaMultipleAnswers extends CartaBase {
  respostaCorreta: number[];
}

type Carta = CartaSingleAnswer | CartaMultipleAnswers | CartaBase;

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
  const array = new Function(`return ${arrayStr};`)();
  return array as Carta[];
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
  const [termoBusca, setTermoBusca] = useState("");
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

  // Estados extras para as novas cartas
  const [quizState, setQuizState] = useState({ currentIndex: 0, score: 0 });
  const [riskRewardAnswer, setRiskRewardAnswer] = useState<number | null>(null);
  const [timeCardCounter, setTimeCardCounter] = useState(0);
  const [rallyScore, setRallyScore] = useState(0);
  const [rallyActive, setRallyActive] = useState(true);
  const [memoryInput, setMemoryInput] = useState<string[]>([]);
  const [wordAssocAnswers, setWordAssocAnswers] = useState<{ [key: number]: number }>({});
  const [matchingAnswers, setMatchingAnswers] = useState<{ [key: number]: number }>({});
  const [logicAnswer, setLogicAnswer] = useState("");

  function renderizarConteudoPergunta() {
    if (!cartaAtual) return null;
    switch (cartaAtual.tipo) {
      case "Quiz":
        {
          // Exibe a micropergunta atual do quiz
          const micro = cartaAtual.microperguntas ? cartaAtual.microperguntas[quizState.currentIndex] : null;
          if (!micro)
            return <div>Quiz: Nenhuma micropergunta encontrada</div>;
          return (
            <div>
              <div dangerouslySetInnerHTML={{ __html: micro.pergunta }} />
              {micro.opcoes.map((op) => (
                <Button key={op.id} onClick={() => {
                  // Aqui você implementaria a verificação da resposta e avanço do quiz
                  if (micro.respostaCorreta === op.id) {
                    setQuizState((prev) => ({ ...prev, score: prev.score + 1 }));
                  }
                  setQuizState((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
                }}>
                  {op.texto}
                </Button>
              ))}
              <div>Tempo: {cartaAtual.tempo} segundos</div>
            </div>
          );
        }
      case "RiskReward":
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta }} />
            {cartaAtual.alternativasAposta?.map((alt, idx) => (
              <Button key={idx} onClick={() => setRiskRewardAnswer(idx)}>
                {alt}
              </Button>
            ))}
            {riskRewardAnswer !== null && (
              <div>
                Você escolheu: {cartaAtual.alternativasAposta?.[riskRewardAnswer]}
              </div>
            )}
          </div>
        );
      case "Time":
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Button onClick={() => setTimeCardCounter((prev) => prev + 1)}>+</Button>
              <span>{timeCardCounter}</span>
              <Button onClick={() => setTimeCardCounter((prev) => prev - 1)}>-</Button>
            </div>
            <div>Tempo: {cartaAtual.tempo} segundos</div>
          </div>
        );
      case "Rally":
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta }} />
            {cartaAtual.opcoes.map((op) => (
              <Button
                key={op.id}
                onClick={() => {
                  // Se a resposta estiver correta, acumula pontos; se errar, desativa o rally
                  if (Array.isArray(cartaAtual.respostaCorreta)) {
                    if (cartaAtual.respostaCorreta.includes(op.id)) {
                      setRallyScore((prev) => prev + 1);
                    } else {
                      setRallyActive(false);
                    }
                  } else {
                    if (cartaAtual.respostaCorreta === op.id) {
                      setRallyScore((prev) => prev + 1);
                    } else {
                      setRallyActive(false);
                    }
                  }
                }}
              >
                {op.texto}
              </Button>
            ))}
            <div>Pontuação Rally: {rallyScore}</div>
            {!rallyActive && <div>Rally encerrado!</div>}
          </div>
        );
      case "Memory":
        return (
          <div>
            <div>Memorize a sequência: {cartaAtual.sequencia?.join(", ")}</div>
            <div style={{ marginTop: "8px" }}>
              <input
                type="text"
                placeholder="Digite a sequência separada por vírgula"
                value={memoryInput.join(", ")}
                onChange={(e) =>
                  setMemoryInput(e.target.value.split(",").map((s) => s.trim()))
                }
              />
            </div>
          </div>
        );
      case "WordAssociation":
        return (
          <div>
            <div>{cartaAtual.pergunta}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%" }}>
                <h4>{cartaAtual.coluna1Titulo}</h4>
                {cartaAtual.opcoes
                  .filter((op) => op.colunaCorreta === 1)
                  .map((op) => (
                    <div key={op.id} style={{ padding: "4px", border: "1px solid #ccc", marginBottom: "4px" }}>
                      {op.texto}
                    </div>
                  ))}
              </div>
              <div style={{ width: "45%" }}>
                <h4>{cartaAtual.coluna2Titulo}</h4>
                {cartaAtual.opcoes
                  .filter((op) => op.colunaCorreta === 2)
                  .map((op) => (
                    <div key={op.id} style={{ padding: "4px", border: "1px solid #ccc", marginBottom: "4px" }}>
                      {op.texto}
                    </div>
                  ))}
              </div>
            </div>
            <div style={{ marginTop: "8px" }}>
              (Simulação de arrastar e soltar as alternativas para a coluna correta)
            </div>
          </div>
        );
      case "Matching":
        return (
          <div>
            <div>{cartaAtual.pergunta}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <h4>Coluna A</h4>
                {cartaAtual.itensA?.map((item) => (
                  <div key={item.id} style={{ padding: "4px", border: "1px solid #ccc", marginBottom: "4px" }}>
                    {item.texto}
                  </div>
                ))}
              </div>
              <div>
                <h4>Coluna B</h4>
                {cartaAtual.itensB?.map((item) => (
                  <div key={item.id} style={{ padding: "4px", border: "1px solid #ccc", marginBottom: "4px" }}>
                    {item.texto}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "8px" }}>
              (Simulação de selecionar as correspondências corretas)
            </div>
          </div>
        );
      case "Logic":
        return (
          <div>
            <div dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta }} />
            <div style={{ marginTop: "8px" }}>
              <input
                type="text"
                value={logicAnswer}
                onChange={(e) => setLogicAnswer(e.target.value)}
                placeholder="Digite sua resposta"
              />
            </div>
          </div>
        );
      default:
        return <div dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta }} />;
    }
  }

  // Atualização da verificação de resposta para a carta Logic (exemplo)
  const verificarResposta = () => {
    if (!cartaAtual || !currentPlayer) return;
    if (cartaAtual.tipo === "Logic") {
      if (
        cartaAtual.respostasAceitas &&
        cartaAtual.respostasAceitas
          .map((resp) => resp.toLowerCase())
          .includes(logicAnswer.trim().toLowerCase())
      ) {
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
        setMensagem(`Correto! ${cartaAtual.vantagem}`);
      } else {
        updateCurrentPlayer({
          respostasErradas: currentPlayer.respostasErradas + 1,
          respostasSeguidas: 0,
          progresso: Math.max(currentPlayer.progresso - 10, 0),
        });
        setMensagem(`Incorreto. ${cartaAtual.desvantagem}`);
      }
      setRespondido(true);
    } else {
      // Lógica original para os demais tipos (Pergunta, MultiplaEscolha, Ordem, etc.)
      if (cartaAtual.tipo === "MultiplaEscolha" && selecoesMultiplas.length > 0) {
        const cor =
          Array.isArray(cartaAtual.respostaCorreta) &&
          selecoesMultiplas.sort().toString() === (cartaAtual.respostaCorreta as number[]).sort().toString();
        setRespondido(true);
        if (cor) {
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
        const cor = ordemSelecoes.toString() === (cartaAtual.respostaCorreta as number[]).toString();
        setRespondido(true);
        if (cor) {
          updateCurrentPlayer({
            respostasCertas: currentPlayer.respostasCertas + 1,
            respostasSeguidas: currentPlayer.respostasSeguidas + 1,
          });
          const prog2 = currentPlayer.progresso + 20;
          if (prog2 >= 100) {
            updateCurrentPlayer({
              progresso: 0,
              pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
              fixedStars: currentPlayer.fixedStars + 1,
            });
            setMensagem("Correto! Bônus extra! Barra completada!");
          } else {
            updateCurrentPlayer({ progresso: prog2 });
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
        const cor = Array.isArray(cartaAtual.respostaCorreta)
          ? cartaAtual.respostaCorreta.includes(selecionado)
          : cartaAtual.respostaCorreta === selecionado;
        if (cor) {
          if (["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo)) {
            updateCurrentPlayer({
              respostasCertas: currentPlayer.respostasCertas + 1,
              respostasSeguidas: currentPlayer.respostasSeguidas + 1,
            });
            const prog = currentPlayer.progresso + 20;
            if (prog >= 100) {
              updateCurrentPlayer({
                progresso: 0,
                pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
                fixedStars: currentPlayer.fixedStars + 1,
              });
              setMensagem("Correto! Bônus extra! Barra completada!");
            } else {
              updateCurrentPlayer({ progresso: prog });
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
    }
  };

  const updateCurrentPlayer = (partial: Partial<Player>) => {
    setPlayers((prev) =>
      prev.map((pl) => (pl.id === currentPlayerId ? { ...pl, ...partial } : pl))
    );
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

  const [mensagem, setMensagem] = useState("");
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [respondido, setRespondido] = useState(false);
  const [mostrarDica, setMostrarDica] = useState(false);
  const [dicaUsada, setDicaUsada] = useState(false);
  const [mostrarFontes, setMostrarFontes] = useState(false);
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [opcoesEliminadas, setOpcoesEliminadas] = useState<number[]>([]);
  const [mostrarSomentePerguntas, setMostrarSomentePerguntas] = useState(false);
  const [selecoesMultiplas, setSelecoesMultiplas] = useState<number[]>([]);
  const [ordemSelecoes, setOrdemSelecoes] = useState<number[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<number | null>(null);
  const [noCardsAvailable, setNoCardsAvailable] = useState(false);
  const [ocultarCarta, setOcultarCarta] = useState(true);
  const [cartaRevelada, setCartaRevelada] = useState(false);
  const [rolledNumber, setRolledNumber] = useState<number | null>(null);
  const [rollingNumber, setRollingNumber] = useState<number | null>(null);
  const [isDieModalOpen, setIsDieModalOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);

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
  }, [
    players,
    currentPlayerId,
    categoriasSelecionadas,
    mostrarSomentePerguntas,
    jogoIniciado,
    ocultarCarta,
    probabilityIndex,
  ]);

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
        const usedDecks = JSON.parse(usedDecksData) as {
          id: number;
          name: string;
          cards: Carta[];
          used: boolean;
        }[];
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
    ((cartaAtual?.tipo === "Ordem" && ordemSelecoes.length !== cartaAtual.opcoes.length) ||
      (cartaAtual?.tipo !== "Ordem" && selecionado === null && selecoesMultiplas.length === 0));

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
        <Button onClick={() => setJogoIniciado(false)} className="mt-4">
          Voltar para a Tela Inicial
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Card
        className={`w-full max-w-sm mx-auto mt-4 ${ocultarCarta && !cartaRevelada ? "border-gray-200 bg-white" : ""}`}
        style={
          players.length > 1 && currentPlayer && !(ocultarCarta && !cartaRevelada)
            ? { boxShadow: `0 0 10px 5px ${currentPlayer.color}` }
            : {}
        }
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
                {(!ocultarCarta || cartaRevelada) && (
                  <p className="text-xs text-gray-500">{cartaAtual.categorias.join(", ")}</p>
                )}
              </div>
            </div>
            {(!ocultarCarta || cartaRevelada) && (
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
            )}
          </div>
          {(!ocultarCarta || cartaRevelada) ? (
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
        {(!ocultarCarta || cartaRevelada) && (
          <CardContent>
            <div className="space-y-2">
              {cartaAtual.opcoes.map((op) => {
                const isCorrect = Array.isArray(cartaAtual.respostaCorreta)
                  ? cartaAtual.respostaCorreta.includes(op.id)
                  : cartaAtual.respostaCorreta === op.id;
                const selected = selecionado === op.id || selecoesMultiplas.includes(op.id);
                const wrongSelection =
                  respondido &&
                  selected &&
                  !isCorrect &&
                  (cartaAtual.tipo === "MultiplaEscolha"
                    ? !(Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(op.id))
                    : cartaAtual.respostaCorreta !== op.id);
                const eliminated = opcoesEliminadas.includes(op.id);
                return (
                  <Button
                    key={op.id}
                    onClick={() => {
                      if (cartaAtual.tipo === "MultiplaEscolha") {
                        setSelecoesMultiplas((prev) => (prev.includes(op.id) ? prev.filter((z) => z !== op.id) : [...prev, op.id]));
                      } else if (cartaAtual.tipo === "Ordem") {
                        setOrdemSelecoes((prevSelecoes) =>
                          prevSelecoes.includes(op.id) ? prevSelecoes.filter((selecaoId) => selecaoId !== op.id) : [...prevSelecoes, op.id]
                        );
                      } else {
                        setSelecionado(op.id);
                      }
                    }}
                    variant={selected ? "secondary" : "outline"}
                    className={`w-full justify-start text-sm ${respondido && isCorrect ? "bg-green-100" : ""} ${respondido && wrongSelection ? "bg-red-100" : ""} ${respondido &&
                      cartaAtual.tipo === "MultiplaEscolha" &&
                      Array.isArray(cartaAtual.respostaCorreta) &&
                      cartaAtual.respostaCorreta.includes(op.id) &&
                      !selecoesMultiplas.includes(op.id)
                        ? "bg-blue-100"
                        : ""} ${respondido &&
                      cartaAtual.tipo === "Ordem" &&
                      ordemSelecoes.includes(op.id) &&
                      ordemSelecoes.indexOf(op.id) + 1 !==
                        (cartaAtual.respostaCorreta as number[]).indexOf(op.id) + 1
                        ? "bg-red-100"
                        : ""} ${respondido &&
                      cartaAtual.tipo === "Ordem" &&
                      ordemSelecoes.includes(op.id) &&
                      ordemSelecoes.indexOf(op.id) + 1 ===
                        (cartaAtual.respostaCorreta as number[]).indexOf(op.id) + 1
                        ? "bg-green-100"
                        : ""} ${eliminated ? "opacity-50" : ""}`}
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
        )}
        <CardFooter className="flex flex-col items-center">
          <div className="flex flex-wrap justify-between w-full mb-1 space-x-2">
            <Button onClick={() => setMostrarFontes(!mostrarFontes)} size="sm" variant="outline" disabled={ocultarCarta && !cartaRevelada}>
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                if (currentPlayer?.pulosDisponiveis) {
                  updateCurrentPlayer({ pulosDisponiveis: currentPlayer.pulosDisponiveis - 1 });
                  selecionarCartaAleatoria();
                }
              }}
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
              onClick={() => {
                if (currentPlayer && cartaAtual) {
                  if (currentPlayer.respostasSeguidas >= 2) {
                    const opcoesErradas = cartaAtual.opcoes.filter((op) => {
                      if (Array.isArray(cartaAtual.respostaCorreta)) {
                        return !cartaAtual.respostaCorreta.includes(op.id);
                      }
                      return op.id !== cartaAtual.respostaCorreta;
                    });
                    const opcoesRestantes = opcoesErradas.filter((op) => !opcoesEliminadas.includes(op.id));
                    if (opcoesRestantes.length > 0) {
                      const idxAleat = Math.floor(Math.random() * opcoesRestantes.length);
                      const opcaoEliminada = opcoesRestantes[idxAleat].id;
                      setOpcoesEliminadas((prev) => [...prev, opcaoEliminada]);
                      updateCurrentPlayer({ respostasSeguidas: currentPlayer.respostasSeguidas - 2 });
                      setMensagem("Uma resposta errada foi eliminada!");
                    }
                  } else {
                    setMensagem("Você precisa de pelo menos 2 respostas corretas seguidas!");
                  }
                }
              }}
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
            <Button onClick={() => setJogoIniciado(false)} size="sm" variant="outline">
              <Home className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap justify-between w-full space-x-2">
            <Button onClick={() => {
              if (currentPlayer) {
                updateCurrentPlayer({
                  respostasCertas: currentPlayer.respostasCertas > 0 ? currentPlayer.respostasCertas - 1 : 0,
                });
                setMensagem("Acerto removido!");
              }
            }} size="sm" variant="outline">
              <ThumbsDown className="h-4 w-4 text-green-500" />
            </Button>
            <Button onClick={() => {
              if (currentPlayer) {
                updateCurrentPlayer({
                  respostasErradas: currentPlayer.respostasErradas > 0 ? currentPlayer.respostasErradas - 1 : 0,
                });
                setMensagem("Erro removido!");
              }
            }} size="sm" variant="outline">
              <ThumbsUp className="h-4 w-4 text-red-500" />
            </Button>
            <Button onClick={() => {
              if (currentPlayer) {
                updateCurrentPlayer({ contadorDeEstrelas: currentPlayer.contadorDeEstrelas - 1 });
                setMensagem("Estrela removida!");
              }
            }} size="sm" variant="outline">
              <Star className="h-4 w-4 text-red-500" />
            </Button>
            <Button onClick={() => {
              if (currentPlayer) {
                updateCurrentPlayer({ contadorDeEstrelas: currentPlayer.contadorDeEstrelas + 1 });
                setMensagem("Estrela adicionada!");
              }
            }} size="sm" variant="outline">
              <Star className="h-4 w-4 text-yellow-500" />
            </Button>
            <Button onClick={() => {
              if (currentPlayer) {
                updateCurrentPlayer({ rodadasPreso: currentPlayer.rodadasPreso - 1 });
                setMensagem("Um contador removido!");
              }
            }} size="sm" variant="outline">
              <ChevronUp className="h-4 w-4 text-purple-500 transform rotate-180" />
            </Button>
            <Button onClick={() => {
              if (currentPlayer) {
                updateCurrentPlayer({ rodadasPreso: currentPlayer.rodadasPreso + 1 });
                setMensagem("Um contador adicionado!");
              }
            }} size="sm" variant="outline">
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
          <Progress
            value={currentPlayer.progresso}
            className={`w-full ${currentPlayer.progresso === 100 ? "bg-green-500" : ""}`}
          />
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
      <div
        className={`grid gap-1 mt-4 ${players.length > 4 ? "grid-cols-4" : `grid-cols-${players.length}`}`}
        style={{ width: "100%", maxWidth: "400px" }}
      >
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
            <Button
              className="absolute top-4 right-4"
              variant="ghost"
              onClick={() => setIsDieModalOpen(false)}
              disabled={isRolling}
            >
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
