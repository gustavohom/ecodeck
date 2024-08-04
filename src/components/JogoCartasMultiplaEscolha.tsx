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
  MinusCircle,
  ChevronUp,
  Zap, // Importa o ícone de raio
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";
import cartas from './cartas';

// Definição de Tipos
interface Opcao {
  id: number;
  texto: string;
}

interface Carta {
  titulo: string;
  pergunta: string;
  opcoes: Opcao[];
  respostaCorreta: number | number[]; // Pode ser um número ou um array de números
  dificuldade: string;
  categorias: string[];
  fontes: string[];
  vantagem: string;
  desvantagem: string;
  dica: string;
}

interface TelaInicialProps {
  onStartGame: (categoriasSelecionadas: string[]) => void;
  onReset: () => void;
  categoriasDisponiveis: string[];
  categoriasSelecionadas: string[];
  setCategoriasSelecionadas: (categorias: string[]) => void;
}

// Componente Tela Inicial
const TelaInicial: React.FC<TelaInicialProps> = ({
  onStartGame,
  onReset,
  categoriasDisponiveis,
  categoriasSelecionadas,
  setCategoriasSelecionadas,
}) => (
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
      <div>
        {categoriasDisponiveis.map((categoria) => (
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
                  setCategoriasSelecionadas([...categoriasSelecionadas, categoria]);
                }
              }}
              className="mr-2"
            />
            <label htmlFor={categoria} className="text-sm">
              {categoria}
            </label>
          </div>
        ))}
        <Button
          onClick={() => setCategoriasSelecionadas(categoriasDisponiveis)}
          className="mr-2 mt-2"
        >
          Selecionar Todas
        </Button>
        <Button
          onClick={() => setCategoriasSelecionadas([])}
          className="mt-2"
        >
          Limpar Todas
        </Button>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button
        onClick={() => onStartGame(categoriasSelecionadas)}
        className="flex-1 mr-2"
        disabled={categoriasSelecionadas.length === 0} // Desabilita o botão se nenhuma categoria estiver selecionada
      >
        Iniciar Jogo
      </Button>
      <Button onClick={onReset} variant="outline" className="flex-1 ml-2">
        Resetar
      </Button>
    </CardFooter>
  </Card>
);

// Componente Principal EcoChallenge
const EcoChallenge: React.FC = () => {
  const [cartaAtual, setCartaAtual] = useState<Carta | null>(null);
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [respondido, setRespondido] = useState<boolean>(false);
  const [respostasCertas, setRespostasCertas] = useState<number>(0);
  const [respostasErradas, setRespostasErradas] = useState<number>(0);
  const [respostasSeguidas, setRespostasSeguidas] = useState<number>(0);
  const [mensagem, setMensagem] = useState<string>("");
  const [progresso, setProgresso] = useState<number>(0);
  const [mostrarDica, setMostrarDica] = useState<boolean>(false);
  const [mostrarFontes, setMostrarFontes] = useState<boolean>(false);
  const [pulosDisponiveis, setPulosDisponiveis] = useState<number>(0);
  const [jogoIniciado, setJogoIniciado] = useState<boolean>(false);
  const [barrasCompletadas, setBarrasCompletadas] = useState<number>(0);
  const [opcoesEliminadas, setOpcoesEliminadas] = useState<number[]>([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [rodadasPreso, setRodadasPreso] = useState<number>(0);

  const categoriasDisponiveis = Array.from(
    new Set(cartas.flatMap((carta) => carta.categorias))
  );

  const selecionarCartaAleatoria = useCallback(() => {
    const cartasFiltradas = cartas.filter((carta) =>
      carta.categorias.some((categoria) =>
        categoriasSelecionadas.includes(categoria)
      )
    );

    const indiceAleatorio = Math.floor(Math.random() * cartasFiltradas.length);
    setCartaAtual(cartasFiltradas[indiceAleatorio]);
    setSelecionado(null);
    setRespondido(false);
    setMensagem("");
    setMostrarDica(false);
    setMostrarFontes(false);
    setOpcoesEliminadas([]);
  }, [categoriasSelecionadas]);

  useEffect(() => {
    if (jogoIniciado) {
      selecionarCartaAleatoria();
    }
  }, [jogoIniciado, selecionarCartaAleatoria]); // Corrigido o warning de dependência

  const handleSelecao = (id: number) => {
    if (!respondido) {
      setSelecionado(id);
    }
  };

  const verificarResposta = () => {
    if (selecionado !== null && cartaAtual) {
      setRespondido(true);
      
      // Verifica se a resposta correta é um array ou um número único
      const isCorrect = Array.isArray(cartaAtual.respostaCorreta)
        ? cartaAtual.respostaCorreta.includes(selecionado) // Verifica se está no array
        : cartaAtual.respostaCorreta === selecionado; // Compara com o número único
      
      if (isCorrect) {
        setRespostasCertas((prev) => prev + 1);
        setRespostasSeguidas((prev) => prev + 1);
        setMensagem(`Correto! ${cartaAtual.vantagem}`);
        const novoProgresso = progresso + 20;
        if (novoProgresso >= 100) {
          setProgresso(0);
          setMensagem("Correto! Bônus extra! Barra completada!");
          setPulosDisponiveis((prev) => Math.min(prev + 1, 2));
          setBarrasCompletadas((prev) => prev + 1);
        } else {
          setProgresso(novoProgresso);
        }
        if (cartaAtual.dificuldade === "dificil") {
          setPulosDisponiveis((prev) => Math.min(prev + 1, 2));
        }
      } else {
        setRespostasErradas((prev) => prev + 1);
        if (respostasSeguidas >= 5) {
          setMensagem("Resposta incorreta, mas você não será penalizado!");
        } else {
          setMensagem(`Incorreto. ${cartaAtual.desvantagem}`);
        }
        setProgresso((prev) => Math.max(prev - 10, 0));
        setRespostasSeguidas(0);
      }
    }
  };

  const resetarContadores = () => {
    if (window.confirm("Tem certeza que deseja resetar todos os contadores?")) {
      setRespostasCertas(0);
      setRespostasErradas(0);
      setProgresso(0);
      setPulosDisponiveis(0);
      setBarrasCompletadas(0);
      setRespostasSeguidas(0);
      setRodadasPreso(0);
      setMensagem("Todos os contadores foram resetados!");
      setTimeout(() => setMensagem(""), 2000);
    }
  };

  const toggleDica = () => {
    if (respostasSeguidas >= 3 && cartaAtual?.dica) {
      setMostrarDica(!mostrarDica);
      setRespostasSeguidas((prev) => prev - 3);
    } else if (!cartaAtual?.dica) {
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
    if (pulosDisponiveis > 0) {
      setPulosDisponiveis((prev) => prev - 1);
      selecionarCartaAleatoria();
    }
  };

  const removerProgressoBarra = () => {
    if (barrasCompletadas > 0) {
      setBarrasCompletadas((prev) => prev - 1);
      setMensagem("Barra de progresso removida!");
    } else {
      setMensagem("Nenhuma barra de progresso para remover!");
    }
  };

  const adicionarProgressoBarra = () => {
    setBarrasCompletadas((prev) => prev + 1);
    setMensagem("Uma barra de progresso foi adicionada!");
  };

  const eliminarRespostaErrada = () => {
    if (respostasSeguidas >= 6 && cartaAtual) {
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
        setRespostasSeguidas((prev) => prev - 6);
        setMensagem("Uma resposta errada foi eliminada!");
      }
    } else {
      setMensagem("Você precisa de pelo menos 6 respostas corretas seguidas!");
    }
  };

  const aumentarRodadasPreso = () => {
    setRodadasPreso((prev) => prev + 1);
    setMensagem("Rodada de prisão adicionada!");
  };

  const diminuirRodadasPreso = () => {
    if (rodadasPreso > 0) {
      setRodadasPreso((prev) => prev - 1);
      setMensagem("Rodada de prisão removida!");
    } else {
      setMensagem("Nenhuma rodada de prisão para remover!");
    }
  };

  const diminuirRespostasCertas = () => {
    if (respostasCertas > 0) {
      setRespostasCertas((prev) => prev - 1);
      setMensagem("Resposta correta removida!");
    } else {
      setMensagem("Nenhuma resposta correta para remover!");
    }
  };

  const diminuirRespostasErradas = () => {
    if (respostasErradas > 0) {
      setRespostasErradas((prev) => prev - 1);
      setMensagem("Resposta errada removida!");
    } else {
      setMensagem("Nenhuma resposta errada para remover!");
    }
  };

  const voltarTelaInicial = () => {
    setJogoIniciado(false);
  };

  const renderizarConteudoPergunta = () => {
    if (!cartaAtual) return null;

    const conteudo = cartaAtual.pergunta.split("\n").map((linha: string, index: number) => {
      if (linha.includes("<img")) {
        // Captura a tag de imagem e retorna o componente Zoom
        const imgRegex = /<img src="([^"]+)" alt="([^"]+)" class="([^"]+)" \/>/;
        const match = imgRegex.exec(linha);

        if (match) {
          const [_, src, alt, className] = match;
          return (
            <Zoom key={index}>
              <Image
                src={src}
                alt={alt}
                width={500} // Exemplo de largura
                height={300} // Exemplo de altura
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
        onStartGame={() => setJogoIniciado(true)}
        onReset={resetarContadores}
        categoriasDisponiveis={categoriasDisponiveis}
        categoriasSelecionadas={categoriasSelecionadas}
        setCategoriasSelecionadas={setCategoriasSelecionadas}
      />
    );
  }

  if (!cartaAtual) return null;

  return (
    <Card className="w-full max-w-sm mx-auto mt-4">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <CardTitle className="text-xl font-bold">
            {cartaAtual.titulo}
          </CardTitle>
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
              onClick={() => handleSelecao(opcao.id)}
              variant={selecionado === opcao.id ? "secondary" : "outline"}
              className={`w-full justify-start text-sm ${
                respondido && (
                  Array.isArray(cartaAtual.respostaCorreta)
                    ? cartaAtual.respostaCorreta.includes(opcao.id)
                    : cartaAtual.respostaCorreta === opcao.id
                ) ? "bg-green-100" : ""
              } ${
                respondido &&
                selecionado === opcao.id &&
                !(
                  Array.isArray(cartaAtual.respostaCorreta)
                    ? cartaAtual.respostaCorreta.includes(opcao.id)
                    : cartaAtual.respostaCorreta === opcao.id
                ) ? "bg-red-100" : ""
              } ${
                opcoesEliminadas.includes(opcao.id) ? "opacity-50" : ""
              }`} // Adiciona opacidade reduzida para opções eliminadas
              disabled={opcoesEliminadas.includes(opcao.id)}
            >
              {opcao.texto}
              {respondido && (
                Array.isArray(cartaAtual.respostaCorreta)
                  ? cartaAtual.respostaCorreta.includes(opcao.id)
                  : cartaAtual.respostaCorreta === opcao.id
              ) && (
                <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />
              )}
              {respondido &&
                selecionado === opcao.id &&
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
        <div className="flex justify-between w-full mb-2">
          <div className="flex items-center space-x-2">
            <Button onClick={toggleFontes} size="sm" variant="outline">
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button
              onClick={pularPergunta}
              size="sm"
              variant={pulosDisponiveis === 0 ? "outline" : "secondary"} // Muda o estilo se estiver indisponível
              disabled={pulosDisponiveis === 0}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              onClick={toggleDica}
              size="sm"
              variant={
                respostasSeguidas < 3 || !cartaAtual.dica ? "outline" : "secondary"
              } // Muda o estilo se a dica não estiver disponível
              disabled={respostasSeguidas < 3 || !cartaAtual.dica}
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button
              onClick={eliminarRespostaErrada}
              size="sm"
              variant={
                respostasSeguidas < 6 ? "outline" : "secondary"
              } // Muda o estilo se não houver respostas seguidas suficientes
              disabled={respostasSeguidas < 6}
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
        </div>
        <div className="flex justify-between w-full mb-4">
          <div className="flex items-center space-x-2">
            <Button onClick={diminuirRespostasCertas} size="sm" variant="outline">
              <ThumbsUp className="h-4 w-4 text-green-500" />
            </Button>
            <Button onClick={diminuirRespostasErradas} size="sm" variant="outline">
              <ThumbsDown className="h-4 w-4 text-red-500" />
            </Button>
            <Button onClick={removerProgressoBarra} size="sm" variant="outline">
              <Star className="h-4 w-4 text-red-500" />
            </Button>
            <Button onClick={adicionarProgressoBarra} size="sm" variant="outline">
              <Star className="h-4 w-4 text-yellow-500" />
            </Button>
            <Button onClick={diminuirRodadasPreso} size="sm" variant="outline">
              <ChevronUp className="h-4 w-4 text-red-500" />
            </Button>
            <Button onClick={aumentarRodadasPreso} size="sm" variant="outline">
              <ChevronUp className="h-4 w-4 text-yellow-500" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between w-full mb-4">
          {!respondido ? (
            <Button
              onClick={verificarResposta}
              disabled={selecionado === null}
              className="w-full"
            >
              Verificar
            </Button>
          ) : (
            <Button onClick={selecionarCartaAleatoria} className="w-full">
              Próxima Carta
            </Button>
          )}
        </div>
        {mensagem && (
          <p className="text-center font-bold text-sm mb-2">{mensagem}</p>
        )}
        <Progress
          value={progresso}
          className={`w-full ${progresso === 100 ? "bg-green-500" : ""}`}
        />
        <div className="flex justify-between w-full mt-4 text-sm">
          <div className="flex items-center space-x-1">
            <Zap className="h-4 w-4 text-purple-500" />
            <span>{respostasSeguidas}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{barrasCompletadas}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SkipForward className="h-4 w-4" />
            <span>{pulosDisponiveis}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ThumbsUp className="h-4 w-4 text-green-500" />
            <span>{respostasCertas}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ThumbsDown className="h-4 w-4 text-red-500" />
            <span>{respostasErradas}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EcoChallenge;
