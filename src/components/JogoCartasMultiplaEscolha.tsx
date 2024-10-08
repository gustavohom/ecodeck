import React, { useState, useEffect, useCallback } from "react";
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
  ChevronDown,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import cartasSimples from "./cartas";
import cartasComplexas from "./cartas_complexas";
import estrelasAliens from "./estrelas_aliens";

// Combine as cartas simples e complexas em um único array
const cartas = [...cartasSimples, ...cartasComplexas, ...estrelasAliens];

// Definição de Tipos
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

interface TelaInicialProps {
  onStartGame: () => void;
  onContinueGame: () => void;
  onReset: () => void;
  categoriasDisponiveis: string[];
  categoriasSelecionadas: string[];
  setCategoriasSelecionadas: (categorias: string[]) => void;
  hasSavedGame: boolean;
  onPlayersSetup: (players: Player[]) => void;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

const predefinedColors = [
  "#FF0000", // Vermelho
  "#0000FF", // Azul
  "#008000", // Verde
  "#FFFF00", // Amarelo
  "#FFA500", // Laranja
  "#800080", // Roxo
  "#00FFFF", // Ciano
  "#FFC0CB", // Rosa
  "#808080", // Cinza
  "#000000", // Preto
  "#FFFFFF", // Branco
  "#00FF00", // Lima
  "#800000", // Marrom
  "#000080", // Azul Marinho
  "#FFD700", // Dourado
  "#A52A2A", // Castanho
];

// Componente Tela Inicial
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
}) => {
  const [termoBusca, setTermoBusca] = useState<string>("");

  // Inicialize os inputs dos jogadores com os dados existentes
  const [playerInputs, setPlayerInputs] = useState<
    { id: number; name: string; color: string }[]
  >(
    players.length > 0
      ? players.map((p) => ({ id: p.id, name: p.name, color: p.color }))
      : [
          {
            id: 0,
            name: "",
            color: predefinedColors[0],
          },
        ]
  );

  const addPlayerInput = () => {
    if (playerInputs.length < 8) {
      setPlayerInputs([
        ...playerInputs,
        {
          id: playerInputs.length,
          name: "",
          color: predefinedColors[playerInputs.length % predefinedColors.length],
        },
      ]);
    }
  };

  const handlePlayerChange = (
    index: number,
    field: "name" | "color",
    value: string
  ) => {
    const updatedPlayers = [...playerInputs];
    updatedPlayers[index][field] = value;
    setPlayerInputs(updatedPlayers);
  };

  const deletePlayer = (index: number) => {
    const updatedPlayers = playerInputs.filter((_, i) => i !== index);
    setPlayerInputs(updatedPlayers);
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
    onStartGame();
  };

  const categoriasFiltradas = categoriasDisponiveis.filter((categoria) =>
    categoria.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <Card className="w-full max-w-sm mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-4">
          Eco Challenge: O Jogo da Sustentabilidade
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">
          Bem-vindo ao Eco Challenge! Teste seus conhecimentos sobre
          sustentabilidade e faça escolhas que impactam o meio ambiente.
        </p>
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
                    setCategoriasSelecionadas(
                      categoriasSelecionadas.filter((c) => c !== categoria)
                    );
                  } else {
                    setCategoriasSelecionadas([
                      ...categoriasSelecionadas,
                      categoria,
                    ]);
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={categoria} className="text-sm">
                {categoria}
              </label>
            </div>
          ))}
        </ScrollArea>
        <Button
          onClick={() => setCategoriasSelecionadas(categoriasDisponiveis)}
          className="mr-2 mt-2"
        >
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
                  onChange={(e) =>
                    handlePlayerChange(index, "name", e.target.value)
                  }
                  className="p-2 border rounded w-full"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deletePlayer(index)}
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => {
                    const updatedPlayers = [...playerInputs];
                    updatedPlayers[index].showColorPicker =
                      !updatedPlayers[index].showColorPicker;
                    setPlayerInputs(updatedPlayers);
                  }}
                  className="w-full"
                >
                  Selecionar Cor
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
                {player.showColorPicker && (
                  <div className="absolute z-10 bg-white border rounded mt-1 p-2 grid grid-cols-4 gap-2">
                    {predefinedColors.map((color, idx) => (
                      <button
                        key={idx}
                        style={{
                          backgroundColor: color,
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          border:
                            player.color === color
                              ? "2px solid black"
                              : "1px solid #ccc",
                        }}
                        onClick={() => {
                          handlePlayerChange(index, "color", color);
                          const updatedPlayers = [...playerInputs];
                          updatedPlayers[index].showColorPicker = false;
                          setPlayerInputs(updatedPlayers);
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {playerInputs.length < 8 && (
            <Button onClick={addPlayerInput} className="mt-2">
              Adicionar Jogador
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {hasSavedGame && (
          <Button onClick={onContinueGame} className="w-full">
            Continuar Jogo
          </Button>
        )}
        <Button
          onClick={() => {
            startGame();
          }}
          className="w-full"
          disabled={
            categoriasSelecionadas.length === 0 || playerInputs.length === 0
          }
        >
          Iniciar Novo Jogo
        </Button>
      </CardFooter>
    </Card>
  );
};

// Componente Principal EcoChallenge
const EcoChallenge: React.FC = () => {
  const [cartaAtual, setCartaAtual] = useState<Carta | null>(null);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [respondido, setRespondido] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>("");
  const [mostrarDica, setMostrarDica] = useState<boolean>(false);
  const [mostrarFontes, setMostrarFontes] = useState<boolean>(false);
  const [jogoIniciado, setJogoIniciado] = useState<boolean>(false);
  const [opcoesEliminadas, setOpcoesEliminadas] = useState<number[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    string[]
  >([]);
  const [mostrarSomentePerguntas, setMostrarSomentePerguntas] =
    useState<boolean>(false);

  const [selecoesMultiplas, setSelecoesMultiplas] = useState<number[]>([]);
  const [ordemSelecoes, setOrdemSelecoes] = useState<number[]>([]);

  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<number | null>(null);

  const categoriasDisponiveis = Array.from(
    new Set(cartas.flatMap((carta) => carta.categorias))
  );

  // Verifica se há um jogo salvo no localStorage
  const hasSavedGame =
    typeof window !== "undefined" &&
    !!localStorage.getItem("estadoEcoChallenge");

  // Função para carregar o estado do jogo do localStorage
  const carregarEstado = useCallback(() => {
    if (typeof window !== "undefined") {
      const estadoSalvo = localStorage.getItem("estadoEcoChallenge");
      if (estadoSalvo) {
        const estado = JSON.parse(estadoSalvo);
        setPlayers(estado.players || []);
        setCurrentPlayerId(estado.currentPlayerId || null);
        setCategoriasSelecionadas(estado.categoriasSelecionadas || []);
        setMostrarSomentePerguntas(estado.mostrarSomentePerguntas || false);
        setJogoIniciado(estado.jogoIniciado || false);
      }
    }
  }, []);

  // Carrega o estado ao montar o componente
  useEffect(() => {
    carregarEstado();
  }, [carregarEstado]);

  // Salva o estado no localStorage sempre que algum estado relevante mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const estado = {
        players,
        currentPlayerId,
        categoriasSelecionadas,
        mostrarSomentePerguntas,
        jogoIniciado,
      };
      localStorage.setItem("estadoEcoChallenge", JSON.stringify(estado));
    }
  }, [
    players,
    currentPlayerId,
    categoriasSelecionadas,
    mostrarSomentePerguntas,
    jogoIniciado,
  ]);

  const selecionarCartaAleatoria = useCallback(() => {
    const cartasFiltradas = cartas.filter(
      (carta) =>
        carta.categorias.some((categoria) =>
          categoriasSelecionadas.includes(categoria)
        ) &&
        (!mostrarSomentePerguntas ||
          ["Pergunta", "MultiplaEscolha", "Ordem"].includes(carta.tipo))
    );

    const indiceAleatorio = Math.floor(Math.random() * cartasFiltradas.length);
    setCartaAtual(cartasFiltradas[indiceAleatorio]);
    setSelecionado(null);
    setSelecoesMultiplas([]);
    setOrdemSelecoes([]);
    setRespondido(false);
    setMensagem("");
    setMostrarDica(false);
    setMostrarFontes(false);
    setOpcoesEliminadas([]);
  }, [categoriasSelecionadas, mostrarSomentePerguntas]);

  useEffect(() => {
    if (jogoIniciado) {
      selecionarCartaAleatoria();
    }
  }, [jogoIniciado, selecionarCartaAleatoria]);

  const handleSelecao = (id: number) => {
    if (!respondido) {
      setSelecionado(id);
    }
  };

  const handleSelecaoMultipla = (id: number) => {
    if (!respondido) {
      setSelecoesMultiplas((prevSelecoes) =>
        prevSelecoes.includes(id)
          ? prevSelecoes.filter((selecaoId) => selecaoId !== id)
          : [...prevSelecoes, id]
      );
    }
  };

  const handleSelecaoOrdem = (id: number) => {
    if (!respondido) {
      setOrdemSelecoes((prevSelecoes) =>
        prevSelecoes.includes(id)
          ? prevSelecoes.filter((selecaoId) => selecaoId !== id)
          : [...prevSelecoes, id]
      );
    }
  };

  const currentPlayer = players.find((p) => p.id === currentPlayerId);

  const updateCurrentPlayer = (updatedData: Partial<Player>) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.id === currentPlayerId ? { ...player, ...updatedData } : player
      )
    );
  };

  const verificarResposta = () => {
    if (!currentPlayer || !cartaAtual) return;

    if (cartaAtual?.tipo === "MultiplaEscolha" && selecoesMultiplas.length > 0) {
      const isCorrect =
        Array.isArray(cartaAtual.respostaCorreta) &&
        selecoesMultiplas.sort().toString() ===
          (cartaAtual.respostaCorreta as number[]).sort().toString();

      setRespondido(true);

      if (isCorrect) {
        updateCurrentPlayer({
          respostasCertas: currentPlayer.respostasCertas + 1,
          respostasSeguidas: currentPlayer.respostasSeguidas + 1,
        });
        const novoProgresso = currentPlayer.progresso + 20;
        if (novoProgresso >= 100) {
          updateCurrentPlayer({
            progresso: 0,
            pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
            fixedStars: currentPlayer.fixedStars + 1,
          });
          setMensagem("Correto! Bônus extra! Barra completada!");
        } else {
          updateCurrentPlayer({ progresso: novoProgresso });
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
    } else if (cartaAtual?.tipo === "Ordem" && ordemSelecoes.length > 0) {
      const isCorrect =
        ordemSelecoes.toString() ===
        (cartaAtual.respostaCorreta as number[]).toString();

      setRespondido(true);

      if (isCorrect) {
        updateCurrentPlayer({
          respostasCertas: currentPlayer.respostasCertas + 1,
          respostasSeguidas: currentPlayer.respostasSeguidas + 1,
        });
        const novoProgresso = currentPlayer.progresso + 20;
        if (novoProgresso >= 100) {
          updateCurrentPlayer({
            progresso: 0,
            pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
            fixedStars: currentPlayer.fixedStars + 1,
          });
          setMensagem("Correto! Bônus extra! Barra completada!");
        } else {
          updateCurrentPlayer({ progresso: novoProgresso });
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

      const isCorrect = Array.isArray(cartaAtual.respostaCorreta)
        ? cartaAtual.respostaCorreta.includes(selecionado)
        : cartaAtual.respostaCorreta === selecionado;

      if (isCorrect) {
        if (["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo)) {
          updateCurrentPlayer({
            respostasCertas: currentPlayer.respostasCertas + 1,
            respostasSeguidas: currentPlayer.respostasSeguidas + 1,
          });
          const novoProgresso = currentPlayer.progresso + 20;
          if (novoProgresso >= 100) {
            updateCurrentPlayer({
              progresso: 0,
              pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2),
              fixedStars: currentPlayer.fixedStars + 1,
            });
            setMensagem("Correto! Bônus extra! Barra completada!");
          } else {
            updateCurrentPlayer({ progresso: novoProgresso });
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
    if (
      window.confirm(
        "Tem certeza que deseja resetar os contadores do jogador atual?"
      )
    ) {
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
      setMensagem("Contadores resetados!");
      setTimeout(() => setMensagem(""), 2000);
    }
  };

  const resetarTudo = () => {
    if (window.confirm("Tem certeza que deseja resetar todo o jogo?")) {
      // Não redefinir players e currentPlayerId aqui
      setCategoriasSelecionadas([]);
      setMensagem("Jogo resetado!");
      if (typeof window !== "undefined") {
        localStorage.removeItem("estadoEcoChallenge");
      }
    }
  };

  const toggleDica = () => {
    if (!currentPlayer || !cartaAtual) return;
    if (currentPlayer.respostasSeguidas >= 3 && cartaAtual.dica) {
      setMostrarDica(!mostrarDica);
      updateCurrentPlayer({
        respostasSeguidas: currentPlayer.respostasSeguidas - 3,
      });
    } else if (!cartaAtual.dica) {
      setMensagem("Esta carta não possui dica.");
    } else {
      setMensagem(
        "Você precisa de pelo menos 3 respostas corretas seguidas para usar a dica!"
      );
    }
  };

  const toggleFontes = () => {
    setMostrarFontes(!mostrarFontes);
  };

  const pularPergunta = () => {
    if (!currentPlayer || !cartaAtual) return;
    if (currentPlayer.pulosDisponiveis > 0) {
      updateCurrentPlayer({
        pulosDisponiveis: currentPlayer.pulosDisponiveis - 1,
      });
      selecionarCartaAleatoria();
    }
  };

  const eliminarRespostaErrada = () => {
    if (!currentPlayer || !cartaAtual) return;
    if (currentPlayer.respostasSeguidas >= 4 && cartaAtual) {
      const opcoesErradas = cartaAtual.opcoes.filter((opcao: Opcao) => {
        if (Array.isArray(cartaAtual.respostaCorreta)) {
          return !cartaAtual.respostaCorreta.includes(opcao.id);
        } else {
          return opcao.id !== cartaAtual.respostaCorreta;
        }
      });

      const opcoesRestantes = opcoesErradas.filter(
        (opcao: Opcao) => !opcoesEliminadas.includes(opcao.id)
      );

      if (opcoesRestantes.length > 0) {
        const indiceAleatorio = Math.floor(
          Math.random() * opcoesRestantes.length
        );
        const opcaoEliminada = opcoesRestantes[indiceAleatorio].id;

        setOpcoesEliminadas((prev) => [...prev, opcaoEliminada]);
        updateCurrentPlayer({
          respostasSeguidas: currentPlayer.respostasSeguidas - 4,
        });
        setMensagem("Uma resposta errada foi eliminada!");
      }
    } else {
      setMensagem("Você precisa de pelo menos 4 respostas corretas seguidas!");
    }
  };

  const voltarTelaInicial = () => {
    setJogoIniciado(false);
  };

  const incrementarRodadasPreso = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({
      rodadasPreso: currentPlayer.rodadasPreso + 1,
    });
    setMensagem("Um contador adicionado!");
  };

  const diminuirRodadasPreso = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({
      rodadasPreso: currentPlayer.rodadasPreso - 1,
    });
    setMensagem("Um contador removido!");
  };

  const diminuirAcertos = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({
      respostasCertas:
        currentPlayer.respostasCertas > 0
          ? currentPlayer.respostasCertas - 1
          : 0,
    });
    setMensagem("Acerto removido!");
  };

  const diminuirErros = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({
      respostasErradas:
        currentPlayer.respostasErradas > 0
          ? currentPlayer.respostasErradas - 1
          : 0,
    });
    setMensagem("Erro removido!");
  };

  const incrementarContadorDeEstrelas = () => {
    if (!currentPlayer) return;
    updateCurrentPlayer({
      contadorDeEstrelas: currentPlayer.contadorDeEstrelas + 1,
    });
    setMensagem("Estrela adicionada!");
  };

  const diminuirContadorDeEstrelas = () => {
    if (!currentPlayer) return;
    if (currentPlayer.contadorDeEstrelas > 0) {
      updateCurrentPlayer({
        contadorDeEstrelas: currentPlayer.contadorDeEstrelas - 1,
      });
      setMensagem("Estrela removida!");
    } else {
      setMensagem("Nenhuma estrela para remover!");
    }
  };

  const renderizarConteudoPergunta = () => {
    if (!cartaAtual) return null;

    const conteudo = cartaAtual.pergunta
      .split("\n")
      .map((linha: string, index: number) => {
        if (linha.includes("<img")) {
          const imgRegex = /<img src="([^"]+)" alt="([^"]+)" class="([^"]+)" \/>/;
          const match = imgRegex.exec(linha);

          if (match) {
            const [_, src, alt, className] = match;
            return (
              <Zoom key={index}>
                <Image
                  src={src}
                  alt={alt}
                  width={500}
                  height={300}
                  className={`${className} img-zoom`}
                />
              </Zoom>
            );
          }
        }
        return <p key={index} dangerouslySetInnerHTML={{ __html: linha }} />;
      });

    return conteudo;
  };

  const handlePlayersSetup = (initializedPlayers: Player[]) => {
    setPlayers(initializedPlayers);
    setCurrentPlayerId(initializedPlayers[0].id);
  };

  if (!jogoIniciado) {
    return (
      <TelaInicial
        onStartGame={() => {
          setJogoIniciado(true);
        }}
        onContinueGame={() => {
          setJogoIniciado(true);
        }}
        onReset={() => {
          resetarTudo(); // Reseta tudo, inclusive fixedStars
        }}
        categoriasDisponiveis={categoriasDisponiveis}
        categoriasSelecionadas={categoriasSelecionadas}
        setCategoriasSelecionadas={setCategoriasSelecionadas}
        hasSavedGame={hasSavedGame}
        onPlayersSetup={handlePlayersSetup}
        players={players}
        setPlayers={setPlayers}
      />
    );
  }

  if (!cartaAtual || !currentPlayer) return null;

  const obterEstiloCarta = () => {
    switch (cartaAtual.tipo) {
      case "Outras":
        return "border-blue-200 bg-blue-50";
      case "Vantagem":
        return "border-green-200 bg-green-50";
      case "Desvantagem":
        return "border-red-200 bg-red-50";
      default:
        return mostrarSomentePerguntas
          ? "border-blue-500 bg-gray-50"
          : "border-gray-200 bg-white";
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-4 space-x-2">
        {players.map((player) => (
          <Button
            key={player.id}
            onClick={() => setCurrentPlayerId(player.id)}
            size="sm"
            variant={currentPlayerId === player.id ? "default" : "outline"}
            style={{
              backgroundColor:
                currentPlayerId === player.id ? player.color : undefined,
              color: currentPlayerId === player.id ? "#fff" : undefined,
            }}
          >
            {player.name}
          </Button>
        ))}
      </div>
      <Card className={`w-full max-w-sm mx-auto mt-4 ${obterEstiloCarta()}`}>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setMostrarSomentePerguntas((prev) => !prev)}
                size="sm"
                variant="outline"
              >
                <Filter className="h-4 w-4" />
              </Button>
              <CardTitle className="text-xl font-bold">
                {cartaAtual.titulo}
              </CardTitle>
            </div>
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
          </div>
          <ScrollArea className="h-56 rounded-md border p-4">
            <div className="text-sm">{renderizarConteudoPergunta()}</div>
          </ScrollArea>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {cartaAtual.opcoes.map((opcao: Opcao) => (
              <Button
                key={opcao.id}
                onClick={() =>
                  cartaAtual.tipo === "MultiplaEscolha"
                    ? handleSelecaoMultipla(opcao.id)
                    : cartaAtual.tipo === "Ordem"
                    ? handleSelecaoOrdem(opcao.id)
                    : handleSelecao(opcao.id)
                }
                variant={
                  selecionado === opcao.id || selecoesMultiplas.includes(opcao.id)
                    ? "secondary"
                    : "outline"
                }
                className={`w-full justify-start text-sm ${
                  respondido &&
                  (Array.isArray(cartaAtual.respostaCorreta)
                    ? cartaAtual.respostaCorreta.includes(opcao.id)
                    : cartaAtual.respostaCorreta === opcao.id)
                    ? "bg-green-100"
                    : ""
                } ${
                  respondido &&
                  selecionado === opcao.id &&
                  !(
                    Array.isArray(cartaAtual.respostaCorreta)
                      ? cartaAtual.respostaCorreta.includes(opcao.id)
                      : cartaAtual.respostaCorreta === opcao.id
                  )
                    ? "bg-red-100"
                    : ""
                } ${
                  respondido &&
                  cartaAtual.tipo === "MultiplaEscolha" &&
                  Array.isArray(cartaAtual.respostaCorreta) &&
                  !cartaAtual.respostaCorreta.includes(opcao.id) &&
                  selecoesMultiplas.includes(opcao.id)
                    ? "bg-red-100"
                    : ""
                } ${
                  respondido &&
                  cartaAtual.tipo === "MultiplaEscolha" &&
                  Array.isArray(cartaAtual.respostaCorreta) &&
                  cartaAtual.respostaCorreta.includes(opcao.id) &&
                  !selecoesMultiplas.includes(opcao.id)
                    ? "bg-blue-100"
                    : ""
                } ${
                  respondido &&
                  cartaAtual.tipo === "Ordem" &&
                  ordemSelecoes.includes(opcao.id) &&
                  ordemSelecoes.indexOf(opcao.id) + 1 !==
                    (cartaAtual.respostaCorreta as number[]).indexOf(opcao.id) + 1
                    ? "bg-red-100"
                    : ""
                } ${
                  respondido &&
                  cartaAtual.tipo === "Ordem" &&
                  ordemSelecoes.includes(opcao.id) &&
                  ordemSelecoes.indexOf(opcao.id) + 1 ===
                    (cartaAtual.respostaCorreta as number[]).indexOf(opcao.id) + 1
                    ? "bg-green-100"
                    : ""
                } ${opcoesEliminadas.includes(opcao.id) ? "opacity-50" : ""}`}
                disabled={opcoesEliminadas.includes(opcao.id)}
                style={{
                  maxHeight: "60px",
                  height: "auto",
                  overflowY: "auto",
                  whiteSpace: "normal",
                  alignItems: "flex-start",
                  display: "flex",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                {opcao.texto}
                {cartaAtual.tipo === "MultiplaEscolha" && (
                  <span className="ml-2">
                    {selecoesMultiplas.includes(opcao.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    ) : (
                      <span className="h-4 w-4 border rounded" />
                    )}
                  </span>
                )}
                {cartaAtual.tipo === "Ordem" &&
                  ordemSelecoes.includes(opcao.id) && (
                    <span className="ml-2">
                      {ordemSelecoes.indexOf(opcao.id) + 1}
                      {respondido &&
                        ordemSelecoes.indexOf(opcao.id) + 1 !==
                          (cartaAtual.respostaCorreta as number[]).indexOf(
                            opcao.id
                          ) +
                            1 && (
                          <span className="ml-1 text-blue-500">
                            (
                            {
                              (cartaAtual.respostaCorreta as number[]).indexOf(
                                opcao.id
                              ) + 1
                            }
                            )
                          </span>
                        )}
                    </span>
                  )}
                {respondido &&
                  (Array.isArray(cartaAtual.respostaCorreta)
                    ? cartaAtual.respostaCorreta.includes(opcao.id)
                    : cartaAtual.respostaCorreta === opcao.id) && (
                    <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />
                  )}
                {respondido &&
                  selecionado === opcao.id &&
                  !(
                    Array.isArray(cartaAtual.respostaCorreta)
                      ? cartaAtual.respostaCorreta.includes(opcao.id)
                      : cartaAtual.respostaCorreta === opcao.id
                  ) && <XCircle className="ml-auto h-4 w-4 text-red-500" />}
              </Button>
            ))}
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
                  {cartaAtual.fontes.map((fonte: string, index: number) => (
                    <li key={index}>{fonte}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <div className="flex flex-wrap justify-between w-full mb-1 space-x-2">
            <Button onClick={toggleFontes} size="sm" variant="outline">
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button
              onClick={pularPergunta}
              size="sm"
              variant={
                currentPlayer.pulosDisponiveis === 0 ? "outline" : "secondary"
              }
              disabled={
                currentPlayer.pulosDisponiveis === 0 ||
                !["Pergunta", "MultiplaEscolha", "Ordem"].includes(
                  cartaAtual.tipo
                )
              }
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              onClick={toggleDica}
              size="sm"
              variant={
                currentPlayer.respostasSeguidas < 3 || !cartaAtual.dica
                  ? "outline"
                  : "secondary"
              }
              disabled={currentPlayer.respostasSeguidas < 3 || !cartaAtual.dica}
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button
              onClick={eliminarRespostaErrada}
              size="sm"
              variant={
                currentPlayer.respostasSeguidas < 4 ? "outline" : "secondary"
              }
              disabled={currentPlayer.respostasSeguidas < 4}
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
            <Button
              onClick={diminuirContadorDeEstrelas}
              size="sm"
              variant="outline"
            >
              <Star className="h-4 w-4 text-red-500" />
            </Button>
            <Button
              onClick={incrementarContadorDeEstrelas}
              size="sm"
              variant="outline"
            >
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
            {!respondido ? (
              <Button
                onClick={verificarResposta}
                disabled={
                  (cartaAtual.tipo === "Ordem" &&
                    ordemSelecoes.length !== cartaAtual.opcoes.length) ||
                  (cartaAtual.tipo !== "Ordem" &&
                    selecionado === null &&
                    selecoesMultiplas.length === 0)
                }
                className="w-full mt-2"
              >
                Verificar
              </Button>
            ) : (
              <Button onClick={selecionarCartaAleatoria} className="w-full mt-2">
                Próxima Carta
              </Button>
            )}
          </div>
          {["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo) &&
            mensagem && (
              <p className="text-center font-bold text-sm mb-2">{mensagem}</p>
            )}
          <Progress
            value={currentPlayer.progresso}
            className={`w-full ${
              currentPlayer.progresso === 100 ? "bg-green-500" : ""
            }`}
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
    </div>
  );
};

export default EcoChallenge;
