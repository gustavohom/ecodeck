import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

// Definição das cartas
const cartas = [
  {
    titulo: "Agricultura Sustentável",
    pergunta: `Qual das seguintes práticas é considerada mais sustentável na agricultura moderna?¹ ²
    
    <img src="/1.jpg" alt="Agricultura Sustentável" class="img-media my-4" />
    
    A agricultura sustentável visa produzir alimentos de forma ecologicamente responsável e economicamente viável, preservando os recursos naturais para as gerações futuras.`,
    opcoes: [
      { id: 1, texto: "Monocultura intensiva" },
      { id: 2, texto: "Uso excessivo de fertilizantes químicos" },
      { id: 3, texto: "Rotação de culturas" },
      { id: 4, texto: "Desmatamento para expansão agrícola" },
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    fontes: [
      "¹FAO. (2018). Sustainable Agriculture for Biodiversity.",
      "²USDA. (2020). Sustainable Agriculture Practices.",
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de sustentabilidade.",
    dica: "Considere práticas que protegem e enriquecem o solo ao longo do tempo.",
  },
  {
    titulo: "Energia Renovável",
    pergunta: `Qual fonte de energia renovável tem o maior potencial de crescimento nos próximos anos?²
    
    <img src="/1.png" alt="Energia Solar" class="img-pequena my-4" />
    
    As energias renováveis são cruciais para combater as mudanças climáticas³.`,
    opcoes: [
      { id: 1, texto: "Energia Solar" },
      { id: 2, texto: "Energia Eólica" },
      { id: 3, texto: "Energia Hidroelétrica" },
      { id: 4, texto: "Energia Geotérmica" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    fontes: [
      "² IRENA. (2021). Renewable Energy Statistics 2021.",
      "³ IPCC. (2022). Climate Change 2022: Mitigation of Climate Change.",
      "Fonte da imagem: Pexels - Painéis Solares",
    ],
    vantagem: "Avance 3 casas no tabuleiro!",
    desvantagem: "Volte 1 casa no tabuleiro.",
    dica: "Pense na fonte de energia que está se tornando mais acessível em áreas urbanas e rurais.",
  },
  {
    titulo: "Conservação Marinha",
    pergunta: `Qual ação é mais eficaz para proteger os ecossistemas marinhos⁴?
    
    <img src="/3.jpg" alt="Recife de Coral" class="img-grande my-4" />
    
    Os oceanos desempenham um papel crucial na regulação do clima global⁵.`,
    opcoes: [
      { id: 1, texto: "Aumento da pesca industrial" },
      { id: 2, texto: "Criação de áreas marinhas protegidas" },
      { id: 3, texto: "Expansão do turismo de massa" },
      { id: 4, texto: "Extração de petróleo offshore" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    fontes: [
      "⁴ UNEP. (2022). State of Finance for Nature in the Ocean.",
      "⁵ NOAA. (2021). Ocean-Atmosphere CO2 Exchange.",
      "Fonte da imagem: Unsplash - Recife de Coral",
    ],
    vantagem: "Receba uma carta bônus!",
    desvantagem: "Perde uma rodada.",
    dica: "Considere ações que reduzem o impacto humano e preservam a biodiversidade.",
  },
  // Adicione mais cartas conforme necessário
];

// Tela Inicial
const TelaInicial = ({ onStartGame, onReset }) => (
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
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button onClick={onStartGame} className="flex-1 mr-2">
        Iniciar Jogo
      </Button>
      <Button onClick={onReset} variant="outline" className="flex-1 ml-2">
        Resetar
      </Button>
    </CardFooter>
  </Card>
);

// Componente principal
const EcoChallenge = () => {
  const [cartaAtual, setCartaAtual] = useState(null);
  const [selecionado, setSelecionado] = useState(null);
  const [respondido, setRespondido] = useState(false);
  const [respostasCertas, setRespostasCertas] = useState(0);
  const [respostasErradas, setRespostasErradas] = useState(0);
  const [respostasSeguidas, setRespostasSeguidas] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [progresso, setProgresso] = useState(0);
  const [mostrarDica, setMostrarDica] = useState(false);
  const [mostrarFontes, setMostrarFontes] = useState(false);
  const [pulosDisponiveis, setPulosDisponiveis] = useState(0);
  const [jogoIniciado, setJogoIniciado] = useState(false);
  const [barrasCompletadas, setBarrasCompletadas] = useState(0);
  const [opcoesEliminadas, setOpcoesEliminadas] = useState([]);

  useEffect(() => {
    if (jogoIniciado) {
      selecionarCartaAleatoria();
    }
  }, [jogoIniciado]);

  const selecionarCartaAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * cartas.length);
    setCartaAtual(cartas[indiceAleatorio]);
    setSelecionado(null);
    setRespondido(false);
    setMensagem("");
    setMostrarDica(false);
    setMostrarFontes(false);
    setOpcoesEliminadas([]);
  };

  const handleSelecao = (id) => {
    if (!respondido) {
      setSelecionado(id);
    }
  };

  const verificarResposta = () => {
    if (selecionado !== null) {
      setRespondido(true);
      if (selecionado === cartaAtual.respostaCorreta) {
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

  const resetarJogo = () => {
    if (window.confirm("Tem certeza que deseja resetar o jogo?")) {
      setRespostasCertas(0);
      setRespostasErradas(0);
      setProgresso(0);
      setPulosDisponiveis(0);
      setBarrasCompletadas(0);
      setRespostasSeguidas(0);
      setMensagem("Jogo resetado!");
      setTimeout(() => setMensagem(""), 2000);
      selecionarCartaAleatoria();
    }
  };

  const toggleDica = () => {
    if (respostasSeguidas >= 3 && cartaAtual.dica) {
      setMostrarDica(!mostrarDica);
      setRespostasSeguidas((prev) => prev - 3);
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

  const eliminarRespostaErrada = () => {
    if (respostasSeguidas >= 6) {
      const opcoesErradas = cartaAtual.opcoes.filter(
        (opcao) => opcao.id !== cartaAtual.respostaCorreta
      );

      const opcoesRestantes = opcoesErradas.filter(
        (opcao) => !opcoesEliminadas.includes(opcao.id)
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

  const voltarTelaInicial = () => {
    setJogoIniciado(false);
  };

  const renderizarConteudoPergunta = () => {
    const conteudo = cartaAtual.pergunta.split("\n").map((linha, index) => {
      if (linha.includes("<img")) {
        // Captura a tag de imagem e retorna o componente Zoom
        const imgRegex = /<img src="([^"]+)" alt="([^"]+)" class="([^"]+)" \/>/;
        const match = imgRegex.exec(linha);

        if (match) {
          const [_, src, alt, className] = match;
          return (
            <Zoom key={index}>
              <img src={src} alt={alt} className={`${className} img-zoom`} />
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
        onReset={resetarJogo}
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
          {cartaAtual.opcoes.map((opcao) => (
            <Button
              key={opcao.id}
              onClick={() => handleSelecao(opcao.id)}
              variant={selecionado === opcao.id ? "secondary" : "outline"}
              className={`w-full justify-start text-sm ${
                respondido && opcao.id === cartaAtual.respostaCorreta
                  ? "bg-green-100"
                  : ""
              } ${
                respondido &&
                selecionado === opcao.id &&
                opcao.id !== cartaAtual.respostaCorreta
                  ? "bg-red-100"
                  : ""
              } ${
                opcoesEliminadas.includes(opcao.id) ? "opacity-50" : ""
              }`} // Adiciona opacidade reduzida para opções eliminadas
              disabled={opcoesEliminadas.includes(opcao.id)}
            >
              {opcao.texto}
              {respondido && opcao.id === cartaAtual.respostaCorreta && (
                <CheckCircle2 className="ml-auto h-4 w-4 text-green-500" />
              )}
              {respondido &&
                selecionado === opcao.id &&
                opcao.id !== cartaAtual.respostaCorreta && (
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
                {cartaAtual.fontes.map((fonte, index) => (
                  <li key={index}>{fonte}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="flex justify-between w-full mb-4">
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
            <Button
              onClick={removerProgressoBarra}
              size="sm"
              variant={
                barrasCompletadas === 0 ? "outline" : "secondary"
              } // Muda o estilo se não houver barras para remover
              disabled={barrasCompletadas === 0}
            >
              <Star className="h-4 w-4 text-yellow-500" />
            </Button>
            <Button onClick={resetarJogo} size="sm" variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button onClick={voltarTelaInicial} size="sm" variant="outline">
              <Home className="h-4 w-4" />
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
            <ChevronUp className="h-4 w-4 text-purple-500" />
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
