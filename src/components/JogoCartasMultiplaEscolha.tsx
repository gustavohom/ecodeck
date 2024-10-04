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
  UserPlus,
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

// Combine as cartas simples e complexas em um único array
const cartas = [...cartasSimples, ...cartasComplexas];

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

interface Jogador {
  nome: string;
  cor: string;
  respostasCertas: number;
  respostasErradas: number;
  respostasSeguidas: number;
  progresso: number;
  pulosDisponiveis: number;
  contadorDeEstrelas: number;
  rodadasPreso: number;
  fixedStars: number;
  opcoesEliminadas: number[];
  mostrarDica: boolean;
  mostrarFontes: boolean;
  selecoesMultiplas: number[];
  ordemSelecoes: number[];
  selecionado: number | null;
}

interface TelaInicialProps {
  onStartGame: (categoriasSelecionadas: string[]) => void;
  onContinueGame: () => void;
  onReset: () => void;
  categoriasDisponiveis: string[];
  categoriasSelecionadas: string[];
  setCategoriasSelecionadas: (categorias: string[]) => void;
  hasSavedGame: boolean;
  jogadores: Jogador[];
  setJogadores: React.Dispatch<React.SetStateAction<Jogador[]>>;
}

const coresDisponiveis = [
  "#F44336",
  "#9C27B0",
  "#3F51B5",
  "#03A9F4",
  "#4CAF50",
  "#FF9800",
  "#795548",
  "#607D8B",
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
  jogadores,
  setJogadores,
}) => {
  const [termoBusca, setTermoBusca] = useState<string>("");
  const [novoJogadorNome, setNovoJogadorNome] = useState<string>("");

  const categoriasFiltradas = categoriasDisponiveis.filter((categoria) =>
    categoria.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const adicionarJogador = () => {
    if (jogadores.length >= 8) {
      alert("Máximo de 8 jogadores alcançado.");
      return;
    }
    if (!novoJogadorNome) {
      alert("Por favor, insira um nome para o jogador.");
      return;
    }
    const cor = coresDisponiveis[jogadores.length % coresDisponiveis.length];
    setJogadores([
      ...jogadores,
      {
        nome: novoJogadorNome,
        cor,
        respostasCertas: 0,
        respostasErradas: 0,
        respostasSeguidas: 0,
        progresso: 0,
        pulosDisponiveis: 0,
        contadorDeEstrelas: 0,
        rodadasPreso: 0,
        fixedStars: 0,
        opcoesEliminadas: [],
        mostrarDica: false,
        mostrarFontes: false,
        selecoesMultiplas: [],
        ordemSelecoes: [],
        selecionado: null,
      },
    ]);
    setNovoJogadorNome("");
  };

  const removerJogador = (index: number) => {
    setJogadores(jogadores.filter((_, i) => i !== index));
  };

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

        {/* Gerenciamento de jogadores */}
        <div className="mt-4">
          <h3 className="text-md font-bold">Jogadores:</h3>
          {jogadores.map((jogador, index) => (
            <div
              key={index}
              className="flex items-center justify-between mt-2 p-2 rounded"
              style={{ backgroundColor: jogador.cor }}
            >
              <span className="text-white ml-2">{jogador.nome}</span>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removerJogador(index)}
              >
                Remover
              </Button>
            </div>
          ))}
          {jogadores.length < 8 && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Nome do Jogador"
                value={novoJogadorNome}
                onChange={(e) => setNovoJogadorNome(e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
              <Button onClick={adicionarJogador} className="w-full">
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Jogador
              </Button>
            </div>
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
            if (jogadores.length === 0) {
              alert("Por favor, adicione pelo menos um jogador.");
              return;
            }
            onReset(); // Reseta tudo, inclusive fixedStars
            onStartGame(categoriasSelecionadas);
          }}
          className="w-full"
          disabled={categoriasSelecionadas.length === 0}
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
  const [respondido, setRespondido] = useState<boolean>(false);
  const [mensagem, setMensagem] = useState<string>("");
  const [jogoIniciado, setJogoIniciado] = useState<boolean>(false);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    string[]
  >([]);
  const [mostrarSomentePerguntas, setMostrarSomentePerguntas] =
    useState<boolean>(false);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [jogadorAtivoIndex, setJogadorAtivoIndex] = useState<number>(0);

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
        setJogadores(estado.jogadores || []);
        setCategoriasSelecionadas(estado.categoriasSelecionadas || []);
        setMostrarSomentePerguntas(estado.mostrarSomentePerguntas || false);
        setJogadorAtivoIndex(estado.jogadorAtivoIndex || 0);
        setJogoIniciado(estado.jogoIniciado || false);
        setCartaAtual(estado.cartaAtual || null);
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
        jogadores,
        categoriasSelecionadas,
        mostrarSomentePerguntas,
        jogadorAtivoIndex,
        jogoIniciado,
        cartaAtual,
      };
      localStorage.setItem("estadoEcoChallenge", JSON.stringify(estado));
    }
  }, [
    jogadores,
    categoriasSelecionadas,
    mostrarSomentePerguntas,
    jogadorAtivoIndex,
    jogoIniciado,
    cartaAtual,
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
    setRespondido(false);
    setMensagem("");

    // Reseta estados específicos do jogador
    const jogadorAtivo = jogadores[jogadorAtivoIndex];
    if (jogadorAtivo) {
      jogadorAtivo.selecoesMultiplas = [];
      jogadorAtivo.ordemSelecoes = [];
      jogadorAtivo.opcoesEliminadas = [];
      jogadorAtivo.mostrarDica = false;
      jogadorAtivo.mostrarFontes = false;
      jogadorAtivo.selecionado = null;
      setJogadores([...jogadores]);
    }
  }, [
    categoriasSelecionadas,
    mostrarSomentePerguntas,
    jogadores,
    jogadorAtivoIndex,
  ]);

  useEffect(() => {
    if (jogoIniciado) {
      selecionarCartaAleatoria();
    }
  }, [jogoIniciado, selecionarCartaAleatoria]);

  // Funções para obter e atualizar o estado do jogador ativo
  const jogadorAtivo = jogadores[jogadorAtivoIndex];

  const handleSelecao = (id: number) => {
    if (!respondido && jogadorAtivo) {
      jogadorAtivo.selecionado = id;
      setJogadores([...jogadores]);
    }
  };

  const handleSelecaoMultipla = (id: number) => {
    if (!respondido && jogadorAtivo) {
      jogadorAtivo.selecoesMultiplas = jogadorAtivo.selecoesMultiplas.includes(id)
        ? jogadorAtivo.selecoesMultiplas.filter((selecaoId) => selecaoId !== id)
        : [...jogadorAtivo.selecoesMultiplas, id];
      setJogadores([...jogadores]);
    }
  };

  const handleSelecaoOrdem = (id: number) => {
    if (!respondido && jogadorAtivo) {
      jogadorAtivo.ordemSelecoes = jogadorAtivo.ordemSelecoes.includes(id)
        ? jogadorAtivo.ordemSelecoes.filter((selecaoId) => selecaoId !== id)
        : [...jogadorAtivo.ordemSelecoes, id];
      setJogadores([...jogadores]);
    }
  };

  const verificarResposta = () => {
    if (!jogadorAtivo || !cartaAtual) return;

    setRespondido(true);

    let isCorrect = false;

    if (cartaAtual.tipo === "MultiplaEscolha" && jogadorAtivo.selecoesMultiplas.length > 0) {
      isCorrect =
        Array.isArray(cartaAtual.respostaCorreta) &&
        jogadorAtivo.selecoesMultiplas.sort().toString() ===
          (cartaAtual.respostaCorreta as number[]).sort().toString();
    } else if (cartaAtual.tipo === "Ordem" && jogadorAtivo.ordemSelecoes.length > 0) {
      isCorrect =
        jogadorAtivo.ordemSelecoes.toString() ===
        (cartaAtual.respostaCorreta as number[]).toString();
    } else if (jogadorAtivo.selecionado !== null) {
      isCorrect = Array.isArray(cartaAtual.respostaCorreta)
        ? cartaAtual.respostaCorreta.includes(jogadorAtivo.selecionado)
        : cartaAtual.respostaCorreta === jogadorAtivo.selecionado;
    }

    if (isCorrect) {
      jogadorAtivo.respostasCertas += 1;
      jogadorAtivo.respostasSeguidas += 1;
      const novoProgresso = jogadorAtivo.progresso + 20;
      if (novoProgresso >= 100) {
        jogadorAtivo.progresso = 0;
        setMensagem("Correto! Bônus extra! Barra completada!");
        jogadorAtivo.pulosDisponiveis = Math.min(
          jogadorAtivo.pulosDisponiveis + 1,
          2
        );
        jogadorAtivo.fixedStars += 1;
      } else {
        jogadorAtivo.progresso = novoProgresso;
      }
      if (cartaAtual.dificuldade === "dificil") {
        jogadorAtivo.pulosDisponiveis = Math.min(
          jogadorAtivo.pulosDisponiveis + 1,
          2
        );
      }
      setMensagem(`Correto! ${cartaAtual.vantagem}`);
    } else {
      jogadorAtivo.respostasErradas += 1;
      if (jogadorAtivo.respostasSeguidas >= 5) {
        setMensagem("Resposta incorreta, mas você não será penalizado!");
      } else {
        setMensagem(`Incorreto. ${cartaAtual.desvantagem}`);
      }
      jogadorAtivo.progresso = Math.max(jogadorAtivo.progresso - 10, 0);
      jogadorAtivo.respostasSeguidas = 0;
    }

    setJogadores([...jogadores]);
  };

  const resetarContadores = () => {
    if (window.confirm("Tem certeza que deseja resetar todos os contadores?")) {
      if (jogadorAtivo) {
        jogadorAtivo.respostasCertas = 0;
        jogadorAtivo.respostasErradas = 0;
        jogadorAtivo.progresso = 0;
        jogadorAtivo.pulosDisponiveis = 0;
        jogadorAtivo.respostasSeguidas = 0;
        jogadorAtivo.rodadasPreso = 0;
        jogadorAtivo.contadorDeEstrelas = 0;
        jogadorAtivo.fixedStars = 0;
        setJogadores([...jogadores]);
      }
      setMensagem("Contadores resetados!");
      setTimeout(() => setMensagem(""), 2000);
    }
  };

  const resetarTudo = () => {
    // Reseta tudo, incluindo fixedStars
    setJogadores([]);
    setCartaAtual(null);
    setJogadorAtivoIndex(0);
    setJogoIniciado(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("estadoEcoChallenge");
    }
  };

  const toggleDica = () => {
    if (jogadorAtivo.respostasSeguidas >= 3 && cartaAtual?.dica) {
      jogadorAtivo.mostrarDica = !jogadorAtivo.mostrarDica;
      jogadorAtivo.respostasSeguidas -= 3;
      setJogadores([...jogadores]);
    } else if (!cartaAtual?.dica) {
      setMensagem("Esta carta não possui dica.");
    } else {
      setMensagem(
        "Você precisa de pelo menos 3 respostas corretas seguidas para usar a dica!"
      );
    }
  };

  const toggleFontes = () => {
    jogadorAtivo.mostrarFontes = !jogadorAtivo.mostrarFontes;
    setJogadores([...jogadores]);
  };

  const pularPergunta = () => {
    if (jogadorAtivo.pulosDisponiveis > 0) {
      jogadorAtivo.pulosDisponiveis -= 1;
      setJogadores([...jogadores]);
      selecionarCartaAleatoria();
    }
  };

  const eliminarRespostaErrada = () => {
    if (jogadorAtivo.respostasSeguidas >= 4 && cartaAtual) {
      const opcoesErradas = cartaAtual.opcoes.filter((opcao: Opcao) => {
        if (Array.isArray(cartaAtual.respostaCorreta)) {
          return !cartaAtual.respostaCorreta.includes(opcao.id);
        } else {
          return opcao.id !== cartaAtual.respostaCorreta;
        }
      });

      const opcoesRestantes = opcoesErradas.filter(
        (opcao: Opcao) => !jogadorAtivo.opcoesEliminadas.includes(opcao.id)
      );

      if (opcoesRestantes.length > 0) {
        const indiceAleatorio = Math.floor(
          Math.random() * opcoesRestantes.length
        );
        const opcaoEliminada = opcoesRestantes[indiceAleatorio].id;

        jogadorAtivo.opcoesEliminadas = [
          ...jogadorAtivo.opcoesEliminadas,
          opcaoEliminada,
        ];
        jogadorAtivo.respostasSeguidas -= 4;
        setJogadores([...jogadores]);
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
    jogadorAtivo.rodadasPreso += 1;
    setJogadores([...jogadores]);
    setMensagem("Um contador adicionado!");
  };

  const diminuirRodadasPreso = () => {
    jogadorAtivo.rodadasPreso -= 1; // Agora permite valores negativos
    setJogadores([...jogadores]);
    setMensagem("Um contador removido!");
  };

  const diminuirAcertos = () => {
    jogadorAtivo.respostasCertas = Math.max(jogadorAtivo.respostasCertas - 1, 0);
    setJogadores([...jogadores]);
    setMensagem("Acerto removido!");
  };

  const diminuirErros = () => {
    jogadorAtivo.respostasErradas = Math.max(jogadorAtivo.respostasErradas - 1, 0);
    setJogadores([...jogadores]);
    setMensagem("Erro removido!");
  };

  const incrementarContadorDeEstrelas = () => {
    jogadorAtivo.contadorDeEstrelas += 1;
    setJogadores([...jogadores]);
    setMensagem("Estrela adicionada!");
  };

  const diminuirContadorDeEstrelas = () => {
    if (jogadorAtivo.contadorDeEstrelas > 0) {
      jogadorAtivo.contadorDeEstrelas -= 1;
      setJogadores([...jogadores]);
      setMensagem("Estrela removida!");
    } else {
      setMensagem("Nenhuma estrela para remover!");
    }
  };

  // Função para alternar o jogador ativo
  const alternarJogador = (index: number) => {
    setJogadorAtivoIndex(index);
    setMensagem("");
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
        jogadores={jogadores}
        setJogadores={setJogadores}
      />
    );
  }

  if (!cartaAtual || !jogadorAtivo) return null;

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
    <div
      style={{ backgroundColor: jogadorAtivo.cor }}
      className="w-full max-w-sm mx-auto mt-4"
    >
      <Card className={`w-full ${obterEstiloCarta()}`}>
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
                  jogadorAtivo.selecionado === opcao.id ? "secondary" : "outline"
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
                  jogadorAtivo.selecionado === opcao.id &&
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
                  jogadorAtivo.selecoesMultiplas.includes(opcao.id)
                    ? "bg-red-100"
                    : ""
                } ${
                  respondido &&
                  cartaAtual.tipo === "MultiplaEscolha" &&
                  Array.isArray(cartaAtual.respostaCorreta) &&
                  cartaAtual.respostaCorreta.includes(opcao.id) &&
                  !jogadorAtivo.selecoesMultiplas.includes(opcao.id)
                    ? "bg-blue-100"
                    : ""
                } ${
                  respondido &&
                  cartaAtual.tipo === "Ordem" &&
                  jogadorAtivo.ordemSelecoes.includes(opcao.id) &&
                  jogadorAtivo.ordemSelecoes.indexOf(opcao.id) + 1 !==
                    (cartaAtual.respostaCorreta as number[]).indexOf(opcao.id) + 1
                    ? "bg-red-100"
                    : ""
                } ${
                  respondido &&
                  cartaAtual.tipo === "Ordem" &&
                  jogadorAtivo.ordemSelecoes.includes(opcao.id) &&
                  jogadorAtivo.ordemSelecoes.indexOf(opcao.id) + 1 ===
                    (cartaAtual.respostaCorreta as number[]).indexOf(opcao.id) + 1
                    ? "bg-green-100"
                    : ""
                } ${
                  jogadorAtivo.opcoesEliminadas.includes(opcao.id)
                    ? "opacity-50"
                    : ""
                }`}
                disabled={jogadorAtivo.opcoesEliminadas.includes(opcao.id)}
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
                    {jogadorAtivo.selecoesMultiplas.includes(opcao.id) ? (
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    ) : (
                      <span className="h-4 w-4 border rounded" />
                    )}
                  </span>
                )}
                {cartaAtual.tipo === "Ordem" &&
                  jogadorAtivo.ordemSelecoes.includes(opcao.id) && (
                    <span className="ml-2">
                      {jogadorAtivo.ordemSelecoes.indexOf(opcao.id) + 1}
                      {respondido &&
                        jogadorAtivo.ordemSelecoes.indexOf(opcao.id) + 1 !==
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
                  jogadorAtivo.selecionado === opcao.id &&
                  !(
                    Array.isArray(cartaAtual.respostaCorreta)
                      ? cartaAtual.respostaCorreta.includes(opcao.id)
                      : cartaAtual.respostaCorreta === opcao.id
                  ) && (
                    <XCircle className="ml-auto h-4 w-4 text-red-500" />
                  )}
              </Button>
            ))}
          </div>
          {jogadorAtivo.mostrarDica && (
            <Alert className="mt-4">
              <AlertDescription>{cartaAtual.dica}</AlertDescription>
            </Alert>
          )}
          {jogadorAtivo.mostrarFontes && (
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
                jogadorAtivo.pulosDisponiveis === 0 ? "outline" : "secondary"
              }
              disabled={
                jogadorAtivo.pulosDisponiveis === 0 ||
                !["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo)
              }
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              onClick={toggleDica}
              size="sm"
              variant={
                jogadorAtivo.respostasSeguidas < 3 || !cartaAtual.dica
                  ? "outline"
                  : "secondary"
              }
              disabled={jogadorAtivo.respostasSeguidas < 3 || !cartaAtual.dica}
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button
              onClick={eliminarRespostaErrada}
              size="sm"
              variant={
                jogadorAtivo.respostasSeguidas < 4 ? "outline" : "secondary"
              }
              disabled={jogadorAtivo.respostasSeguidas < 4}
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
                    jogadorAtivo.ordemSelecoes.length !==
                      cartaAtual.opcoes.length) ||
                  (cartaAtual.tipo !== "Ordem" &&
                    jogadorAtivo.selecionado === null &&
                    jogadorAtivo.selecoesMultiplas.length === 0)
                }
                className="w-full mt-2"
              >
                Verificar
              </Button>
            ) : (
              <Button
                onClick={() => {
                  selecionarCartaAleatoria();
                  // Alterna para o próximo jogador
                  setJogadorAtivoIndex(
                    (jogadorAtivoIndex + 1) % jogadores.length
                  );
                }}
                className="w-full mt-2"
              >
                Próxima Carta
              </Button>
            )}
          </div>
          {["Pergunta", "MultiplaEscolha", "Ordem"].includes(cartaAtual.tipo) &&
            mensagem && (
              <p className="text-center font-bold text-sm mb-2">{mensagem}</p>
            )}
          <Progress
            value={jogadorAtivo.progresso}
            className={`w-full ${
              jogadorAtivo.progresso === 100 ? "bg-green-500" : ""
            }`}
          />
          <div className="flex justify-between w-full mt-4 text-sm">
            <div className="flex items-center space-x-1">
              <ChevronUp className="h-4 w-4 text-purple-500" />
              <span>{jogadorAtivo.rodadasPreso}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4 text-yellow-500" />
              <span>{jogadorAtivo.fixedStars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{jogadorAtivo.contadorDeEstrelas}</span>
            </div>
            <div className="flex items-center space-x-1">
              <SkipForward className="h-4 w-4" />
              <span>{jogadorAtivo.pulosDisponiveis}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="h-4 w-4 text-green-500" />
              <span>{jogadorAtivo.respostasCertas}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsDown className="h-4 w-4 text-red-500" />
              <span>{jogadorAtivo.respostasErradas}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-purple-500" />
              <span>{jogadorAtivo.respostasSeguidas}</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Interface para alternar entre jogadores */}
      <div className="flex justify-center mt-4 space-x-2">
        {jogadores.map((jogador, index) => (
          <Button
            key={index}
            onClick={() => alternarJogador(index)}
            style={{
              backgroundColor: jogador.cor,
              border:
                index === jogadorAtivoIndex ? "2px solid black" : "1px solid gray",
            }}
          >
            {jogador.nome}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EcoChallenge;
