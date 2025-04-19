import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2, XCircle, ThumbsUp, ThumbsDown, RotateCcw, HelpCircle,
    BookOpen, Home, SkipForward, Star, Award, MinusCircle, ChevronUp, Zap, Filter,
    Trash, EyeOff, Eye, Dice6, X as XIcon, Timer, Link2, MousePointerClick, Check, TextSelect
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input"; // Usar Input do shadcn
import { cn } from "@/lib/utils"; // Utilitário para classes condicionais (se você usa shadcn)


// Importar Decks (ajuste os caminhos conforme sua estrutura)
import manejoPlantadas from "./deck/cards_manejo_plantada";
import manejoNativas from "./deck/cards_manejo_nativa";
import ecologiaFlorestal from "./deck/cards_ecologia_florestal";
import estrelasAliens from "./dlc/cards_estrelas_aliens";
import testCards from "./.test/test_card";

// Primeiro, carregue os arrays brutos
const manejoPlantadas_raw = manejoPlantadas;
//const manejoNativas_raw = manejoNativas;
//const ecologiaFlorestal_raw = ecologiaFlorestal;
const estrelasAliens_raw = estrelasAliens;
const testCards_raw = testCards;

// >>>>> MANTENHA ESTA VERSÃO ABAIXO <<<<<
// Agora, combine e faça a asserção de tipo, garantindo IDs únicos
const cartasOriginais: Carta[] = [
    ...(manejoPlantadas_raw as Carta[]),
//    ...(manejoNativas_raw as Carta[]),
//    ...(ecologiaFlorestal_raw as Carta[]),
    ...(estrelasAliens_raw as Carta[]),
//    ...(testCards_raw as Carta[]),
].map((card, index) => ({
    // Garante que cada carta tenha um ID único, mesmo que venha sem um
    ...card,
    id: card.id || `orig_${index}_${Math.random().toString(16).slice(2)}` // ID mais robusto
}));

// --- Tipos de Dados ---

interface Opcao {
    id: number;
    texto: string;
}

interface CartaBase {
    id: string | number; // ID único para a carta
    tipo: string;
    titulo: string;
    pergunta: string; // Pode conter HTML básico
    dificuldade: "facil" | "normal" | "dificil";
    categorias: string[];
    fontes: string[];
    vantagem: string;
    desvantagem: string;
    dica: string;
}

// Tipos Existentes
interface CartaPergunta extends CartaBase {
    tipo: "Pergunta";
    opcoes: Opcao[];
    respostaCorreta: number;
}

interface CartaMultiplaEscolha extends CartaBase {
    tipo: "MultiplaEscolha";
    opcoes: Opcao[];
    respostaCorreta: number[];
}

interface CartaOrdem extends CartaBase {
    tipo: "Ordem";
    opcoes: Opcao[];
    respostaCorreta: number[];
}

interface CartaVantagem extends CartaBase {
    tipo: "Vantagem";
    opcoes: Opcao[];
    respostaCorreta: number[];
}

interface CartaDesvantagem extends CartaBase {
    tipo: "Desvantagem";
    opcoes: Opcao[];
    respostaCorreta: number[]; // Geralmente vazio
}

interface CartaOutras extends CartaBase {
    tipo: "Outras";
    opcoes: Opcao[];
    respostaCorreta: number[];
}

// Novos Tipos
interface CartaContraTempo extends CartaBase {
    tipo: "ContraTempo";
    opcoes: Opcao[];
    respostaCorreta: number; // ou number[] se permitir múltipla escolha com tempo
    tempoLimite: number; // Segundos
}

interface ItemRelacionar {
    id: number;
    texto: string;
}

interface CartaRelacionarColunas extends CartaBase {
    tipo: "RelacionarColunas";
    colunaA: ItemRelacionar[];
    colunaB: ItemRelacionar[];
    respostaCorreta: { aId: number; bId: number }[];
    opcoes: []; // Não usado
}

interface ZonaClicavel {
    id: number;
    x: number; // Percentual x (0 a 1)
    y: number; // Percentual y (0 a 1)
    largura: number; // Percentual w (0 a 1)
    altura: number; // Percentual h (0 a 1)
    descricao?: string;
}

interface CartaPontoCerto extends CartaBase {
    tipo: "PontoCerto";
    imagemURL: string; // Caminho para a imagem
    zonasClicaveis: ZonaClicavel[];
    respostaCorreta: number; // ID da zona correta
    opcoes: []; // Não usado
}

interface FragmentoCompletar {
    id: number;
    texto: string;
}

interface CartaCompletarFrase extends CartaBase {
    tipo: "CompletarFrase";
    fraseIncompleta: string; // Ex: "A fotossíntese converte __1__ e __2__ em glicose."
    fragmentos: FragmentoCompletar[]; // Opções para preencher
    respostaCorreta: number[]; // Array de IDs dos fragmentos na ordem correta
    opcoes: []; // Não usado
}

// Tipo União
type Carta =
    | CartaPergunta
    | CartaMultiplaEscolha
    | CartaOrdem
    | CartaVantagem
    | CartaDesvantagem
    | CartaOutras
    | CartaContraTempo
    | CartaRelacionarColunas
    | CartaPontoCerto
    | CartaCompletarFrase;

// --- Interfaces de Jogador e Jogo ---
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
    contadorDeEstrelas: number; // Renomeado para clareza
    rodadasPreso: number;
}

interface PlayerInput {
    id: number;
    name: string;
    color: string;
    showColorPicker?: boolean;
}

interface CustomDeck {
    id: number;
    name: string;
    cards: Carta[];
    used: boolean;
}

// --- Constantes ---
const predefinedColors = [
    "#9e0142", "#f46d43", "#fee08b", "#66c2a5", "#5e4fa2", "#ff6699", "#33a02c", "#ff7f00",
    "#3288bd", "#999999", "#8dd3c7", "#ffffb3", "#fb8072", "#80b1d3", "#b3de69", "#fccde5",
    "#bc80bd", "#1f78b4", "#e31a1c", "#ffcc33", "#6a3d9a", "#b15928", "#b2df8a", "#cab2d6",
    "#a6cee3", "#fb9a99", "#fdbf6f", "#ffed6f", "#ccebc5", "#ff4444",
];

const probabilitySettings = [
    { value: 0, color: "#ffffff", label: "0%" },
    { value: 0.4, color: "#4ade80", label: "40%" }, // Green-400
    { value: 0.6, color: "#facc15", label: "60%" }, // Yellow-400
    { value: 0.8, color: "#f87171", label: "80%" }, // Red-400
];

// --- Funções Utilitárias ---

// Função para parsear arquivos JS (simplificada)
function parseJSDeckFile(content: string): Carta[] {
    try {
        // Tenta extrair o array diretamente (mais robusto se o formato for consistente)
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) {
            throw new Error("Não foi possível encontrar um array exportado no arquivo JS.");
        }
        const arrayStr = match[1];
        // Usar Function é um risco de segurança se o conteúdo não for confiável,
        // mas comum para esse tipo de parse dinâmico.
        // Alternativa mais segura seria usar uma biblioteca de AST parser (complexo).
        // Adiciona tratamento para garantir que os IDs sejam únicos ao carregar
        const rawArray = new Function(`return ${arrayStr};`)() as any[];
        return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[];
    } catch (error: any) {
        console.error("Erro ao parsear arquivo JS:", error);
        throw new Error(`Erro ao processar arquivo JS: ${error.message}`);
    }
}

// Recalcular categorias disponíveis
function recalcularCategorias(baseCards: Carta[], decks: CustomDeck[]): string[] {
    let allCards = [...baseCards];
    decks.forEach(d => {
        if (d.used) { // Considerar apenas decks marcados como 'used' para as categorias ativas? Ou todos? Vamos incluir todos.
            allCards = [...allCards, ...d.cards];
        }
    });
    //flatMap(c => c.categorias) garante que mesmo que categorias seja undefined ou null, não quebre
    const novasCategorias = Array.from(new Set(allCards.flatMap(c => c.categorias || []))).sort();
    return novasCategorias;
}

// Verificar se clique está na zona (para PontoCerto)
function isClickInZone(clickCoords: { x: number; y: number } | null, zone: ZonaClicavel): boolean {
    if (!clickCoords) return false;
    const { x, y } = clickCoords;
    return (
        x >= zone.x &&
        x <= zone.x + zone.largura &&
        y >= zone.y &&
        y <= zone.y + zone.altura
    );
}


// --- Componente TelaInicial ---
interface TelaInicialProps {
    onStartGame: (initialState?: Partial<GameState>) => void;
    categoriasDisponiveis: string[];
    initialCategoriasSelecionadas: string[];
    initialPlayers: Player[];
    initialOcultarCarta: boolean;
    initialProbabilityIndex: number;
    hasSavedGame: boolean;
}

interface GameState {
    players: Player[];
    currentPlayerId: number | null;
    categoriasSelecionadas: string[];
    ocultarCarta: boolean;
    probabilityIndex: number;
    jogoIniciado: boolean;
    customDecks: CustomDeck[]; // Salvar os decks carregados também
    usedDeckIds: number[]; // Salvar IDs dos decks usados
}

const TelaInicial: React.FC<TelaInicialProps> = ({
    onStartGame,
    categoriasDisponiveis: baseCategorias,
    initialCategoriasSelecionadas,
    initialPlayers,
    initialOcultarCarta,
    initialProbabilityIndex,
    hasSavedGame,
}) => {
    const [termoBusca, setTermoBusca] = useState("");
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>(initialCategoriasSelecionadas);
    const [ocultarCarta, setOcultarCarta] = useState(initialOcultarCarta);
    const [probabilityIndex, setProbabilityIndex] = useState(initialProbabilityIndex);
    const [playerInputs, setPlayerInputs] = useState<PlayerInput[]>(() =>
        initialPlayers.length > 0
            ? initialPlayers.map((p) => ({
                id: p.id, name: p.name, color: p.color, showColorPicker: false,
            }))
            : [{ id: 0, name: "", color: predefinedColors[0], showColorPicker: false }]
    );
    const [customDecks, setCustomDecks] = useState<CustomDeck[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("customDecks");
            try {
                return saved ? JSON.parse(saved) as CustomDeck[] : [];
            } catch { return []; }
        }
        return [];
    });
    const [todasCategorias, setTodasCategorias] = useState<string[]>(baseCategorias);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Recalcula categorias quando decks mudam
    useEffect(() => {
        const allCats = recalcularCategorias(cartasOriginais, customDecks);
        setTodasCategorias(allCats);
        // Mantém selecionadas apenas as categorias que ainda existem
        setCategoriasSelecionadas((prevCats) => prevCats.filter((c) => allCats.includes(c)));
    }, [customDecks]);

    // Salva decks customizados no localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("customDecks", JSON.stringify(customDecks));
        }
    }, [customDecks]);

    const handleCustomDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setIsLoading(true);
        setErrorMessage(null);
        let newDecks: CustomDeck[] = [];
        let errors: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const content = await file.text();
            try {
                let newCards: Carta[] = [];
                const deckName = file.name.replace(/\.(js|json)$/, "");
                // Evitar duplicatas pelo nome do arquivo
                if (customDecks.some(d => d.name === deckName)) {
                    errors.push(`Baralho "${deckName}" já existe.`);
                    continue;
                }

                if (file.name.endsWith(".js")) {
                    newCards = parseJSDeckFile(content);
                } else if (file.name.endsWith(".json")) {
                    // Adiciona IDs únicos ao carregar JSON também
                    const rawArray = JSON.parse(content) as any[];
                    newCards = rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[];
                } else {
                    errors.push(`Formato não suportado: ${file.name}. Use .js ou .json.`);
                    continue;
                }
                // Validação básica das cartas (opcional, mas recomendado)
                if (!Array.isArray(newCards) || newCards.length === 0) {
                     errors.push(`Nenhuma carta válida encontrada em "${deckName}".`);
                     continue;
                }
                // Adicionar mais validações se necessário (ex: campos obrigatórios)

                newDecks.push({
                    id: Date.now() + Math.random(), // ID único para o deck
                    name: deckName,
                    cards: newCards,
                    used: false, // Começa desativado por padrão
                });
            } catch (error: any) {
                errors.push(`Erro ao ler ${file.name}: ${error.message}`);
            }
        }

        if (newDecks.length > 0) {
            setCustomDecks((prev) => [...prev, ...newDecks]);
        }
        if (errors.length > 0) {
            setErrorMessage(errors.join("\n"));
        }
        setIsLoading(false);
        // Limpa o input para permitir re-upload do mesmo arquivo
        e.target.value = '';
    };

    const toggleDeckUsage = (deckId: number) => {
        setCustomDecks((prev) =>
            prev.map((d) => (d.id === deckId ? { ...d, used: !d.used } : d))
        );
    };

    const removeDeck = (deckId: number) => {
         if (window.confirm("Tem certeza que deseja remover este baralho personalizado?")) {
            setCustomDecks((prev) => prev.filter((d) => d.id !== deckId));
          }
    }

    const addPlayerInput = () => {
        if (playerInputs.length < 8) {
            setPlayerInputs([
                ...playerInputs,
                {
                    id: playerInputs.length, // ID simples baseado no índice
                    name: "",
                    color: predefinedColors[playerInputs.length % predefinedColors.length],
                    showColorPicker: false,
                },
            ]);
        }
    };

    const handlePlayerChange = (index: number, field: "name" | "color", value: string) => {
        const updatedPlayers = [...playerInputs];
        const player = updatedPlayers[index];
        if (field === 'name') player.name = value;
        if (field === 'color') player.color = value;
        setPlayerInputs(updatedPlayers);
    };

    const toggleColorPicker = (index: number) => {
         const updatedPlayers = playerInputs.map((p, i) =>
             i === index ? { ...p, showColorPicker: !p.showColorPicker } : {...p, showColorPicker: false} // Fecha outros pickers
         );
         setPlayerInputs(updatedPlayers);
    }

    const deletePlayer = (index: number) => {
        setPlayerInputs((prev) => prev.filter((_, i) => i !== index));
    };

    const handleStartGame = (continueGame = false) => {
        let gameStateToStart: Partial<GameState>;

        if (continueGame && typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
             try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                    // Carregar estado salvo
                     // Recarregar os custom decks do localStorage atual, mas usar os IDs salvos
                     const currentCustomDecks = JSON.parse(localStorage.getItem("customDecks") || '[]') as CustomDeck[];
                     const usedDeckIdsFromSave = savedState.usedDeckIds || [];
                     const finalCustomDecks = currentCustomDecks.map(deck => ({
                         ...deck,
                         used: usedDeckIdsFromSave.includes(deck.id)
                     }));

                    gameStateToStart = {
                         ...savedState,
                         customDecks: finalCustomDecks, // Usa os decks atuais com o estado 'used' salvo
                         jogoIniciado: true,
                     };
                     // Não sobrescrever as configurações da tela inicial (categorias, ocultar, prob)
                     // A menos que elas também estivessem salvas e queiramos restaurá-las
                     // Vamos usar as configurações atuais da tela inicial para o jogo continuado
                     gameStateToStart.categoriasSelecionadas = categoriasSelecionadas;
                     gameStateToStart.ocultarCarta = ocultarCarta;
                     gameStateToStart.probabilityIndex = probabilityIndex;

                } else {
                    // Não há jogo salvo válido, iniciar novo
                    return handleStartGame(false);
                }
            } catch (e) {
                 console.error("Erro ao carregar jogo salvo:", e);
                 // Falha ao carregar, iniciar novo
                 return handleStartGame(false);
            }

        } else {
            // Iniciar Novo Jogo
            if (categoriasSelecionadas.length === 0 || playerInputs.length === 0) return;

            const initializedPlayers: Player[] = playerInputs.map((input, index) => ({
                id: index, // Garante ID sequencial 0, 1, 2...
                name: input.name.trim() || `Jogador ${index + 1}`,
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

            gameStateToStart = {
                players: initializedPlayers,
                currentPlayerId: initializedPlayers[0]?.id ?? null,
                categoriasSelecionadas: categoriasSelecionadas,
                ocultarCarta: ocultarCarta,
                probabilityIndex: probabilityIndex,
                customDecks: customDecks, // Passa os decks atuais
                usedDeckIds: customDecks.filter(d => d.used).map(d => d.id), // Passa os IDs usados
                jogoIniciado: true,
            };
        }

        onStartGame(gameStateToStart);
    };

    const categoriasFiltradas = todasCategorias
        .filter((cat) => cat.toLowerCase().includes(termoBusca.toLowerCase()))
        .sort();

    const cycleProbability = () => {
        setProbabilityIndex((prevIndex) => (prevIndex + 1) % probabilitySettings.length);
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-8 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-700">
                    Eco Challenge
                </CardTitle>
                 <p className="text-sm text-center text-gray-600">O Jogo da Sustentabilidade</p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Seleção de Categorias */}
                <div className="space-y-2">
                     <h3 className="text-lg font-semibold text-gray-800">Categorias</h3>
                     <Input
                        type="text"
                        placeholder="Pesquisar Categoria..."
                        value={termoBusca}
                        onChange={(e) => setTermoBusca(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <ScrollArea className="h-40 border rounded-md p-3 bg-gray-50">
                        {categoriasFiltradas.length > 0 ? (
                            categoriasFiltradas.map((categoria) => (
                                <div key={categoria} className="flex items-center space-x-2 mb-1 hover:bg-gray-100 p-1 rounded">
                                    <input
                                        type="checkbox"
                                        id={`cat-${categoria}`} // ID único para o label htmlFor
                                        checked={categoriasSelecionadas.includes(categoria)}
                                        onChange={() => {
                                            setCategoriasSelecionadas((prev) =>
                                                prev.includes(categoria)
                                                    ? prev.filter((c) => c !== categoria)
                                                    : [...prev, categoria]
                                            );
                                        }}
                                        className="form-checkbox h-4 w-4 text-green-600"
                                    />
                                    <label htmlFor={`cat-${categoria}`} className="text-sm cursor-pointer flex-1">
                                        {categoria}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">Nenhuma categoria encontrada.</p>
                        )}
                    </ScrollArea>
                    <div className="flex space-x-2 mt-2">
                         <Button onClick={() => setCategoriasSelecionadas(todasCategorias)} variant="outline" size="sm" className="flex-1">
                            Todas
                        </Button>
                         <Button onClick={() => setCategoriasSelecionadas([])} variant="outline" size="sm" className="flex-1">
                            Nenhuma
                        </Button>
                    </div>
                </div>

                 {/* Configuração de Jogadores */}
                <div className="space-y-3">
                     <h3 className="text-lg font-semibold text-gray-800">Jogadores</h3>
                     <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                        {playerInputs.map((player, index) => (
                            <div key={player.id} className="border p-3 rounded-md shadow-sm bg-white relative">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="text"
                                        placeholder={`Jogador ${index + 1}`}
                                        value={player.name}
                                        maxLength={12}
                                        onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
                                        className="flex-grow"
                                    />
                                    <Button
                                        variant="outline" size="icon" className="w-8 h-8 flex-shrink-0"
                                        onClick={() => toggleColorPicker(index)}
                                        style={{ backgroundColor: player.color }}
                                        aria-label="Selecionar cor"
                                    />
                                     <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-red-500 hover:bg-red-100" onClick={() => deletePlayer(index)} aria-label="Remover jogador">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                {player.showColorPicker && (
                                    <div className="absolute z-20 mt-2 right-12 w-48 bg-white border rounded-md shadow-lg p-2 grid grid-cols-6 gap-1">
                                        {predefinedColors.map((color, idx) => (
                                            <button
                                                key={idx}
                                                aria-label={`Selecionar cor ${color}`}
                                                style={{ backgroundColor: color }}
                                                className={`w-6 h-6 rounded border ${player.color === color ? 'ring-2 ring-offset-1 ring-black' : 'border-gray-300'}`}
                                                onClick={() => {
                                                    handlePlayerChange(index, "color", color);
                                                    toggleColorPicker(index); // Fecha o picker
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {playerInputs.length < 8 && (
                         <Button onClick={addPlayerInput} variant="secondary" className="w-full">
                            + Adicionar Jogador
                        </Button>
                    )}
                </div>

                 {/* Baralhos Personalizados */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">Baralhos Personalizados</h3>
                     {errorMessage && (
                         <Alert variant="destructive">
                             <AlertDescription>{errorMessage}</AlertDescription>
                         </Alert>
                     )}
                    <Input
                        type="file"
                        multiple
                        accept=".js,.json"
                        onChange={handleCustomDeckUpload}
                        disabled={isLoading}
                        className="text-sm"
                    />
                    {isLoading && <p className="text-sm text-blue-600">Carregando baralhos...</p>}
                    {customDecks.length > 0 && (
                        <ScrollArea className="h-32 border rounded-md p-2 bg-gray-50 space-y-2">
                            {customDecks.map((deck) => (
                                <div key={deck.id} className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded">
                                    <span className="flex-1 text-sm truncate" title={`${deck.name} (${deck.cards.length} cartas)`}>
                                        {deck.name} ({deck.cards.length})
                                    </span>
                                    <Button
                                        size="sm"
                                        variant={deck.used ? "default" : "outline"}
                                        onClick={() => toggleDeckUsage(deck.id)}
                                        className={`h-7 px-2 text-xs ${deck.used ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                    >
                                        {deck.used ? "Ativo" : "Usar"}
                                    </Button>
                                    <Button
                                        size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500 hover:bg-red-100"
                                        onClick={() => removeDeck(deck.id)}
                                        aria-label={`Remover baralho ${deck.name}`}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </ScrollArea>
                    )}
                    {customDecks.length === 0 && !isLoading && (
                        <p className="text-sm text-gray-500 italic">Nenhum baralho personalizado adicionado.</p>
                    )}
                </div>

                 {/* Opções de Jogo */}
                 <div className="space-y-3">
                     <h3 className="text-lg font-semibold text-gray-800">Opções</h3>
                    <Button
                        onClick={() => setOcultarCarta(!ocultarCarta)}
                        variant="outline"
                        className="w-full flex items-center justify-center space-x-2"
                    >
                        {ocultarCarta ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{ocultarCarta ? "Ocultar Carta Ativado" : "Ocultar Carta Desativado"}</span>
                    </Button>
                     <Button
                        onClick={cycleProbability}
                        className="w-full flex items-center justify-center space-x-2 text-white" // Forçar texto branco
                        style={{ backgroundColor: probabilitySettings[probabilityIndex].color }}
                    >
                         <span>% Cartas Especiais:</span>
                         <span className="font-bold">{probabilitySettings[probabilityIndex].label}</span>
                    </Button>
                 </div>

            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pt-6 border-t">
                 {hasSavedGame && (
                     <Button onClick={() => handleStartGame(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                        Continuar Jogo Salvo
                    </Button>
                )}
                <Button
                    onClick={() => handleStartGame(false)}
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={categoriasSelecionadas.length === 0 || playerInputs.length === 0 || isLoading}
                >
                    {hasSavedGame ? "Iniciar Novo Jogo" : "Iniciar Jogo"}
                </Button>
                {/* <Button onClick={onReset} variant="destructive" className="w-full">Resetar Tudo</Button> */}
            </CardFooter>
        </Card>
    );
};


// --- Componente Principal EcoChallenge ---

const EcoChallenge: React.FC = () => {
    // --- State Hooks ---
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [cartaAtual, setCartaAtual] = useState<Carta | null>(null);
    const [respondido, setRespondido] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [mostrarDica, setMostrarDica] = useState(false);
    const [dicaUsada, setDicaUsada] = useState(false);
    const [mostrarFontes, setMostrarFontes] = useState(false);
    const [opcoesEliminadas, setOpcoesEliminadas] = useState<number[]>([]);
    const [cartaRevelada, setCartaRevelada] = useState(false); // Para modo 'ocultarCarta'
    const [noCardsAvailable, setNoCardsAvailable] = useState(false);

    // States para tipos específicos
    const [selecionado, setSelecionado] = useState<number | null>(null); // Pergunta, ContraTempo, Vantagem, etc.
    const [selecoesMultiplas, setSelecoesMultiplas] = useState<number[]>([]); // MultiplaEscolha
    const [ordemSelecoes, setOrdemSelecoes] = useState<number[]>([]); // Ordem
    const [tempoRestante, setTempoRestante] = useState<number | null>(null); // ContraTempo
    const [selecaoColunaA, setSelecaoColunaA] = useState<number | null>(null); // RelacionarColunas
    const [paresFormados, setParesFormados] = useState<{ aId: number; bId: number }[]>([]); // RelacionarColunas
    const [coordenadasClique, setCoordenadasClique] = useState<{ x: number; y: number } | null>(null); // PontoCerto
    const [fragmentosSelecionados, setFragmentosSelecionados] = useState<number[]>([]); // CompletarFrase

    // States de UI
    const [mostrarSomentePerguntas, setMostrarSomentePerguntas] = useState(false); // Filtro de UI
    const [rolledNumber, setRolledNumber] = useState<number | null>(null); // Dado
    const [rollingNumber, setRollingNumber] = useState<number | null>(null); // Animação Dado
    const [isDieModalOpen, setIsDieModalOpen] = useState(false); // Modal Dado
    const [isRolling, setIsRolling] = useState(false); // Animação Dado

    // Refs
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);


    // --- Funções de Gerenciamento de Estado ---

    const updateGameState = useCallback((newState: Partial<GameState>) => {
        setGameState(prev => {
            if (!prev) return null;
            const updatedState = { ...prev, ...newState };
            // Salvar no localStorage
            if (typeof window !== "undefined") {
                 try {
                    // Não salvar as cartas em si no estado principal do jogo para evitar sobrecarga
                    const { customDecks, ...stateToSave } = updatedState;
                    stateToSave.usedDeckIds = customDecks.filter(d => d.used).map(d => d.id); // Salva só os IDs usados
                    localStorage.setItem("estadoEcoChallenge", JSON.stringify(stateToSave));
                     // Salvar decks customizados separadamente (já feito no useEffect da TelaInicial)
                 } catch (e) {
                     console.error("Erro ao salvar estado:", e);
                 }
            }
            return updatedState;
        });
    }, []);

     const updateCurrentPlayer = useCallback((partialPlayerData: Partial<Player>) => {
        if (!gameState || gameState.currentPlayerId === null) return;
        const updatedPlayers = gameState.players.map(p =>
            p.id === gameState.currentPlayerId ? { ...p, ...partialPlayerData } : p
        );
        updateGameState({ players: updatedPlayers });
    }, [gameState, updateGameState]);


    // --- Inicialização e Carregamento ---
    useEffect(() => {
        // Tenta carregar o jogo salvo ao montar o componente
        if (typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
             try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                     // Recarregar os custom decks do localStorage e aplicar o estado 'used' salvo
                     const savedCustomDecksRaw = localStorage.getItem("customDecks");
                     const currentCustomDecks = savedCustomDecksRaw ? JSON.parse(savedCustomDecksRaw) as CustomDeck[] : [];
                     const usedDeckIdsFromSave = savedState.usedDeckIds || [];
                     const finalCustomDecks = currentCustomDecks.map(deck => ({
                         ...deck,
                         used: usedDeckIdsFromSave.includes(deck.id)
                     }));

                     setGameState({ ...savedState, customDecks: finalCustomDecks });
                     // Seleciona a primeira carta se o jogo estava ativo
                     // A seleção de carta agora acontece dentro do onStartGame ou no botão Próxima
                     // selecionarCartaAleatoria(); // Cuidado para não chamar antes do gameState estar pronto
                     return; // Estado carregado
                }
            } catch (e) {
                 console.error("Erro ao carregar estado salvo:", e);
                 localStorage.removeItem("estadoEcoChallenge"); // Limpa estado inválido
            }
        }
         // Se não carregou estado, gameState continua null, mostrando TelaInicial
    }, []); // Executa apenas uma vez na montagem

    // --- Seleção de Carta ---
    const selecionarCartaAleatoria = useCallback(() => {
        if (!gameState) return;

        const { categoriasSelecionadas, probabilityIndex, customDecks } = gameState;
        const p = probabilitySettings[probabilityIndex].value;
        const incluirCartasEspeciais = p === 0 || Math.random() >= p;

        // Combina cartas originais e decks customizados ativos
        let baralhoCompleto = [...cartasOriginais];
        customDecks.forEach(deck => {
            if (deck.used) {
                baralhoCompleto = [...baralhoCompleto, ...deck.cards];
            }
        });

        const tiposPergunta = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];
        const tiposEspeciais = ["Vantagem", "Desvantagem", "Outras"];

        const cartasFiltradas = baralhoCompleto.filter(c => {
            const categoriaValida = c.categorias?.some(cat => categoriasSelecionadas.includes(cat));
            if (!categoriaValida) return false;

            const isTipoPergunta = tiposPergunta.includes(c.tipo);
            const isTipoEspecial = tiposEspeciais.includes(c.tipo);

            if (mostrarSomentePerguntas && !isTipoPergunta) return false;
            if (!incluirCartasEspeciais && isTipoEspecial) return false;

            return true;
        });

        if (cartasFiltradas.length === 0) {
            setNoCardsAvailable(true);
            setCartaAtual(null);
            setMensagem("Nenhuma carta encontrada com os filtros atuais!");
            return;
        }

        setNoCardsAvailable(false);
        const idxAleat = Math.floor(Math.random() * cartasFiltradas.length);
        const novaCarta = cartasFiltradas[idxAleat];

        setCartaAtual(novaCarta);

        // Resetar estados específicos da carta anterior
        setRespondido(false);
        setMensagem("");
        setMostrarDica(false);
        setDicaUsada(false);
        setMostrarFontes(false);
        setOpcoesEliminadas([]);
        setCartaRevelada(!gameState.ocultarCarta); // Resetar revelação conforme opção
        setRolledNumber(null);
        setIsDieModalOpen(false);

        // Resetar states dos tipos específicos
        setSelecionado(null);
        setSelecoesMultiplas([]);
        setOrdemSelecoes([]);
        setTempoRestante(null);
        setSelecaoColunaA(null);
        setParesFormados([]);
        setCoordenadasClique(null);
        setFragmentosSelecionados([]);

        // Limpar e iniciar timer se for ContraTempo
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (novaCarta.tipo === "ContraTempo") {
            setTempoRestante(novaCarta.tempoLimite);
        }

    }, [gameState, mostrarSomentePerguntas]);


    // --- Efeitos ---

    // Inicia a primeira carta quando o jogo começa
    useEffect(() => {
        if (gameState?.jogoIniciado && !cartaAtual && !noCardsAvailable) {
            selecionarCartaAleatoria();
        }
    }, [gameState?.jogoIniciado, cartaAtual, noCardsAvailable, selecionarCartaAleatoria]);


    // Lógica do Timer (ContraTempo)
    useEffect(() => {
        if (cartaAtual?.tipo === "ContraTempo" && tempoRestante !== null && tempoRestante > 0 && !respondido && gameState?.jogoIniciado && cartaRevelada) {
            timerIntervalRef.current = setInterval(() => {
                setTempoRestante((prev) => {
                    if (prev === null || prev <= 1) {
                        clearInterval(timerIntervalRef.current!);
                        // Tempo esgotado - marcar como erro
                        setRespondido(true);
                        setMensagem(`Tempo esgotado! ${cartaAtual.desvantagem || 'Tente novamente.'}`);
                        if (currentPlayer) {
                            updateCurrentPlayer({
                                respostasErradas: currentPlayer.respostasErradas + 1,
                                respostasSeguidas: 0,
                                progresso: Math.max(currentPlayer.progresso - 10, 0),
                            });
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timerIntervalRef.current && (respondido || tempoRestante === 0)) {
             // Limpa se respondeu ou tempo acabou
            clearInterval(timerIntervalRef.current);
        }

        // Limpeza ao desmontar ou mudar carta/estado
        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [cartaAtual, tempoRestante, respondido, gameState?.jogoIniciado, cartaRevelada, updateCurrentPlayer]); // Adicionado updateCurrentPlayer


    // --- Handlers de Interação ---

    const handleSelecao = (id: number) => {
        if (!respondido) setSelecionado(id);
    };

    const handleSelecaoMultipla = (id: number) => {
        if (!respondido) {
            setSelecoesMultiplas((prev) =>
                prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]
            );
        }
    };

    const handleSelecaoOrdem = (id: number) => {
        if (!respondido) {
            setOrdemSelecoes((prev) =>
                prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]
            );
        }
    };

     const handleSelecionarColunaA = (id: number) => {
        if (respondido) return;
        const parExistenteIndex = paresFormados.findIndex(p => p.aId === id);
        if (parExistenteIndex > -1) {
             // Clicar novamente em A desfaz o par
            setParesFormados(prev => prev.filter((_, index) => index !== parExistenteIndex));
            setSelecaoColunaA(null);
        } else {
            setSelecaoColunaA(id === selecaoColunaA ? null : id); // Permite deselecionar A
        }
    };

    const handleSelecionarColunaB = (id: number) => {
        if (respondido || selecaoColunaA === null) return;
        // Impede que B seja pareado multiplas vezes
        if (paresFormados.some(p => p.bId === id)) return;

        setParesFormados(prev => [...prev, { aId: selecaoColunaA, bId: id }]);
        setSelecaoColunaA(null); // Reseta seleção de A
    };

     const handleImagemClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (respondido || !cartaAtual || cartaAtual.tipo !== 'PontoCerto') return;

        const target = event.currentTarget; // O div container da imagem
        const rect = target.getBoundingClientRect();
        // Calcula coordenadas relativas (0 a 1) dentro do div
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;

         // Garante que o clique esteja dentro dos limites 0-1
         const clampedX = Math.max(0, Math.min(1, x));
         const clampedY = Math.max(0, Math.min(1, y));

        setCoordenadasClique({ x: clampedX, y: clampedY });
    };

     const handleSelecionarFragmento = (id: number) => {
         if (respondido) return;
         setFragmentosSelecionados(prev => {
             // Simplesmente adiciona na ordem clicada
             // Para remover, o usuário teria que clicar no fragmento já adicionado (lógica não implementada aqui)
             // ou ter um botão de limpar
             return [...prev, id];
         });
     };

     const limparFragmentos = () => {
         if (!respondido) {
             setFragmentosSelecionados([]);
         }
     }

    // --- Verificação da Resposta ---
    const verificarResposta = () => {
        if (!cartaAtual || !currentPlayer || respondido) return;

        let cor = false;
        let pontosGanhos = 20; // Padrão
        let pontosPerdidos = 10; // Padrão
        let darPuloDificil = cartaAtual.dificuldade === "dificil";

        // Parar timer se for ContraTempo
        if (cartaAtual.tipo === "ContraTempo" && timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
        }

        // Lógica de Verificação por Tipo
        switch (cartaAtual.tipo) {
            case "Pergunta":
            case "ContraTempo": // Mesma lógica de seleção, mas tempo importa
                 // A verificação de tempo esgotado já aconteceu no useEffect
                 if (cartaAtual.tipo === "ContraTempo" && (tempoRestante === null || tempoRestante <= 0)) {
                     cor = false; // Já foi marcado como errado
                 } else {
                     cor = selecionado === cartaAtual.respostaCorreta;
                 }
                break;
            case "MultiplaEscolha":
                cor = Array.isArray(cartaAtual.respostaCorreta) &&
                      selecoesMultiplas.length === cartaAtual.respostaCorreta.length &&
                      selecoesMultiplas.sort().toString() === cartaAtual.respostaCorreta.sort().toString();
                 if (cor) pontosGanhos = 25; // Bônus por múltipla escolha
                break;
            case "Ordem":
                cor = Array.isArray(cartaAtual.respostaCorreta) &&
                      ordemSelecoes.length === cartaAtual.respostaCorreta.length &&
                      ordemSelecoes.toString() === cartaAtual.respostaCorreta.toString();
                 if (cor) pontosGanhos = 30; // Bônus por ordem
                 darPuloDificil = true; // Ordem sempre conta como difícil para pulo
                break;
             case "RelacionarColunas":
                if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } // Defensivo
                 cor = paresFormados.length === cartaAtual.respostaCorreta.length &&
                       paresFormados.map(p => `${p.aId}-${p.bId}`).sort().join(',') ===
                       cartaAtual.respostaCorreta.map(p => `${p.aId}-${p.bId}`).sort().join(',');
                 if (cor) pontosGanhos = 30;
                 darPuloDificil = true;
                break;
             case "PontoCerto":
                if (!coordenadasClique || !Array.isArray(cartaAtual.zonasClicaveis)) { cor = false; break; }
                 const zonaCorreta = cartaAtual.zonasClicaveis.find(z => z.id === cartaAtual.respostaCorreta);
                 if (zonaCorreta) {
                     cor = isClickInZone(coordenadasClique, zonaCorreta);
                 } else {
                     cor = false; // Zona correta não definida? Erro na carta.
                 }
                 if (cor) pontosGanhos = 25;
                 darPuloDificil = true;
                break;
            case "CompletarFrase":
                 if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; }
                 cor = fragmentosSelecionados.length === cartaAtual.respostaCorreta.length &&
                       fragmentosSelecionados.toString() === cartaAtual.respostaCorreta.toString();
                 if (cor) pontosGanhos = 25;
                 darPuloDificil = true;
                break;
            // Tipos que não são perguntas de resposta
            case "Vantagem":
                // Considera correto se selecionou qualquer opção listada como correta (geralmente todas)
                cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado);
                pontosGanhos = 0; // Vantagem não dá pontos diretos, aplica efeito
                pontosPerdidos = 0;
                darPuloDificil = false;
                 // Lógica da vantagem (ex: ganhar pulo, avançar progresso) deve ser aplicada aqui ou na mensagem
                 setMensagem(`Vantagem: ${cartaAtual.pergunta}. ${cartaAtual.vantagem || ''}`);
                 // Exemplo de efeito:
                 // updateCurrentPlayer({ pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2) });
                break;
            case "Desvantagem":
                 // Geralmente não há resposta "correta", apenas confirmação
                 cor = false; // Sempre incorreto para fins de pontuação
                 pontosGanhos = 0;
                 pontosPerdidos = 0; // Penalidade vem do efeito
                 darPuloDificil = false;
                 setMensagem(`Desvantagem: ${cartaAtual.pergunta}. ${cartaAtual.desvantagem || ''}`);
                 // Exemplo de efeito:
                 // updateCurrentPlayer({ progresso: Math.max(currentPlayer.progresso - 15, 0) });
                 // updateCurrentPlayer({ rodadasPreso: currentPlayer.rodadasPreso + 1 });
                break;
            case "Outras":
                 // Lógica pode variar muito, tratar como pergunta simples por padrão
                 cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado);
                 // Pontos e efeitos podem ser definidos na carta se necessário
                 setMensagem(`${cartaAtual.titulo}: ${cor ? cartaAtual.vantagem : cartaAtual.desvantagem}`);
                break;
            default:
                const _exhaustiveCheck: never = cartaAtual; // Se adicionar novo tipo a 'Carta' e esquecer o case, isso dará erro!
                console.error("Tipo de carta não tratado na verificação:", _exhaustiveCheck);
                // ---- FIM DA CORREÇÃO ----
                return; // Não fazer nada se o tipo for desconhecido
        }

        setRespondido(true);

        // Atualizar Estado do Jogador e Mensagem (se não for Vantagem/Desvantagem/Outras que definem a própria msg)
        const tiposPerguntaPontuaveis = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];

        if (tiposPerguntaPontuaveis.includes(cartaAtual.tipo)) {
            if (cor) {
                const novoProgresso = currentPlayer.progresso + pontosGanhos;
                const completouBarra = novoProgresso >= 100;
                const pulosGanhos = (completouBarra ? 1 : 0) + (darPuloDificil ? 1 : 0);
                const estrelasFixasGanhsa = completouBarra ? 1 : 0;

                updateCurrentPlayer({
                    respostasCertas: currentPlayer.respostasCertas + 1,
                    respostasSeguidas: currentPlayer.respostasSeguidas + 1,
                    progresso: completouBarra ? 0 : novoProgresso,
                    pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + pulosGanhos, 2),
                    fixedStars: currentPlayer.fixedStars + estrelasFixasGanhsa,
                });
                setMensagem(`Correto! ${cartaAtual.vantagem || ''}${completouBarra ? ' Barra de progresso completa!' : ''}`);

            } else {
                updateCurrentPlayer({
                    respostasErradas: currentPlayer.respostasErradas + 1,
                    respostasSeguidas: 0,
                    progresso: Math.max(currentPlayer.progresso - pontosPerdidos, 0),
                });
                 // Para RelacionarColunas e Ordem, pode ser útil mostrar a resposta correta na mensagem
                 let detalheErro = "";
                 if (cartaAtual.tipo === "Ordem" && Array.isArray(cartaAtual.respostaCorreta)) {
                      const ordemCorretaTexto = cartaAtual.respostaCorreta.map(id => cartaAtual.opcoes.find(o => o.id === id)?.texto).join(" -> ");
                      detalheErro = ` Ordem correta: ${ordemCorretaTexto}.`;
                 } else if (cartaAtual.tipo === "RelacionarColunas" && Array.isArray(cartaAtual.respostaCorreta)) {
                      // Montar string da resposta correta pode ser complexo aqui, talvez melhor no render
                 }

                setMensagem(`Incorreto. ${cartaAtual.desvantagem || ''}${detalheErro}`);
            }
        }
    };

    // --- Funções Auxiliares de Jogo ---

    const resetarContadoresJogador = () => {
        if (!currentPlayer || !window.confirm(`Resetar contadores de ${currentPlayer.name}?`)) return;
        updateCurrentPlayer({
            respostasCertas: 0,
            respostasErradas: 0,
            progresso: 0,
            pulosDisponiveis: 0,
            respostasSeguidas: 0,
            rodadasPreso: 0,
            contadorDeEstrelas: 0,
            fixedStars: 0, // Resetar estrelas fixas também? Decidir.
        });
        setMensagem(`${currentPlayer.name} resetado.`);
    };

    const toggleDica = () => {
        if (!currentPlayer || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return;
        if (dicaUsada) {
            setMensagem("Dica já utilizada para esta carta.");
            return;
        }
        if (!cartaAtual.dica) {
            setMensagem("Esta carta não possui dica.");
            return;
        }
        if (currentPlayer.respostasSeguidas >= 2) {
            setMostrarDica(true);
            setDicaUsada(true);
            updateCurrentPlayer({ respostasSeguidas: currentPlayer.respostasSeguidas - 2 });
            setMensagem("Dica revelada! (-2 sequências)");
        } else {
            setMensagem("São necessárias 2 respostas corretas seguidas para usar a dica.");
        }
    };

    const toggleFontes = () => {
         if (!cartaAtual || (gameState?.ocultarCarta && !cartaRevelada)) return;
         if (cartaAtual.fontes && cartaAtual.fontes.length > 0) {
             setMostrarFontes(!mostrarFontes);
         } else {
             setMensagem("Nenhuma fonte disponível para esta carta.");
         }
    };

    const pularPergunta = () => {
        if (!currentPlayer || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return;
        const tiposPulaveis = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];
        if (!tiposPulaveis.includes(cartaAtual.tipo)) {
            setMensagem("Não é possível pular este tipo de carta.");
            return;
        }
        if (currentPlayer.pulosDisponiveis > 0) {
            updateCurrentPlayer({ pulosDisponiveis: currentPlayer.pulosDisponiveis - 1 });
            setMensagem("Carta pulada!");
            // Atraso pequeno para a mensagem ser vista antes da próxima carta
            setTimeout(selecionarCartaAleatoria, 500);
        } else {
            setMensagem("Você não tem pulos disponíveis.");
        }
    };

    const eliminarRespostaErrada = () => {
        if (!currentPlayer || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return;
        const tiposEliminaveis = ["Pergunta", "MultiplaEscolha", "ContraTempo"]; // Ordem, etc não faz sentido eliminar
        if (!tiposEliminaveis.includes(cartaAtual.tipo) || !('opcoes' in cartaAtual) || cartaAtual.opcoes.length <= 2) {
            setMensagem("Não é possível eliminar opções para este tipo de carta.");
            return;
        }

        if (currentPlayer.respostasSeguidas >= 2) {
            const respostaCorretaArr = Array.isArray(cartaAtual.respostaCorreta) ? cartaAtual.respostaCorreta : [cartaAtual.respostaCorreta];
            const opcoesErradasDisponiveis = cartaAtual.opcoes.filter(
                op => !respostaCorretaArr.includes(op.id) && !opcoesEliminadas.includes(op.id)
            );

            if (opcoesErradasDisponiveis.length > 0) {
                const idxAleat = Math.floor(Math.random() * opcoesErradasDisponiveis.length);
                const opcaoEliminada = opcoesErradasDisponiveis[idxAleat].id;
                setOpcoesEliminadas((prev) => [...prev, opcaoEliminada]);
                updateCurrentPlayer({ respostasSeguidas: currentPlayer.respostasSeguidas - 2 });
                setMensagem("Uma opção incorreta foi eliminada! (-2 sequências)");
            } else {
                setMensagem("Não há mais opções incorretas para eliminar.");
            }
        } else {
            setMensagem("São necessárias 2 respostas corretas seguidas para eliminar uma opção.");
        }
    };

    const voltarTelaInicial = () => {
        if (window.confirm("Voltar para a Tela Inicial? O progresso atual será salvo.")) {
             // O estado já é salvo automaticamente pelo updateGameState
            setGameState(null); // Volta para a tela inicial
            setCartaAtual(null); // Limpa carta
             // Resetar outros estados de UI se necessário
             setNoCardsAvailable(false);
             setRespondido(false);
             setMensagem("");
        }
    };

    // Funções de ajuste manual (simplificadas)
    const ajustarContador = (field: keyof Player, delta: number, min?: number, max?: number) => {
        if (!currentPlayer) return;
        const currentValue = currentPlayer[field] as number;
        let newValue = currentValue + delta;
        if (min !== undefined) newValue = Math.max(min, newValue);
        if (max !== undefined) newValue = Math.min(max, newValue);
        updateCurrentPlayer({ [field]: newValue });
        // Opcional: adicionar mensagem de feedback
    };

    // --- Funções do Dado ---
    const rolarDado = () => {
        if (isRolling) return;
        setIsRolling(true);
        setIsDieModalOpen(true);
        setRolledNumber(null); // Limpa resultado anterior
        let rollCount = 0;
        const maxRolls = 15; // Mais rolagens para melhor efeito
        const rollInterval = setInterval(() => {
            setRollingNumber(Math.floor(Math.random() * 6) + 1);
            rollCount++;
            if (rollCount >= maxRolls) {
                clearInterval(rollInterval);
                const finalNumber = Math.floor(Math.random() * 6) + 1;
                setRolledNumber(finalNumber);
                setRollingNumber(null);
                setIsRolling(false);
            }
        }, 80); // Intervalo mais rápido
    };

    const handleLongPressStart = (action: () => void) => {
        longPressTimeout.current = setTimeout(() => {
            action(); // Executa a ação (rolar dado ou próxima carta)
        }, 800); // Tempo para long press
    };

    const handleLongPressEnd = () => {
        if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
        }
    };


    // --- Renderização ---

    // Se não há estado de jogo, mostra a tela inicial
    if (!gameState) {
         const savedStateRaw = typeof window !== "undefined" ? localStorage.getItem("estadoEcoChallenge") : null;
         let savedState = null;
         try { savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null; } catch {}
         const hasSaved = !!(savedState && savedState.jogoIniciado);

         // Carrega configurações iniciais ou salvas
         const initialPlayers = savedState?.players || [];
         const initialCategorias = savedState?.categoriasSelecionadas || [];
         const initialOcultar = savedState?.ocultarCarta ?? true;
         const initialProbIndex = savedState?.probabilityIndex ?? 0;

        return (
            <TelaInicial
                 // Passar uma função que atualiza o estado principal
                onStartGame={(initialState) => {
                     if (initialState) {
                         setGameState(initialState as GameState);
                         // A seleção da primeira carta agora acontece no useEffect acima
                     }
                 }}
                categoriasDisponiveis={Array.from(new Set(cartasOriginais.flatMap(c => c.categorias || []))).sort()}
                initialCategoriasSelecionadas={initialCategorias}
                initialPlayers={initialPlayers}
                initialOcultarCarta={initialOcultar}
                initialProbabilityIndex={initialProbIndex}
                hasSavedGame={hasSaved}
             />
        );
    }

    // Se o jogo iniciou, mas algo deu errado (sem jogador, etc.)
    const { players, currentPlayerId, ocultarCarta } = gameState;
    const currentPlayer = players.find(p => p.id === currentPlayerId);

    if (noCardsAvailable) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <Card className="p-6 shadow-lg">
                    <CardHeader>
                         <CardTitle className="text-xl text-red-600">Erro!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">Nenhuma carta disponível com as categorias selecionadas.</p>
                        <p className="text-sm text-gray-600 mb-4">Verifique as categorias na Tela Inicial ou adicione/ative baralhos personalizados.</p>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={voltarTelaInicial} className="w-full">
                            Voltar para Tela Inicial
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (!cartaAtual || !currentPlayer) {
         // Pode acontecer brevemente durante o carregamento ou se o estado estiver inconsistente
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Carregando jogo...</p> {/* Ou uma tela de erro melhor */}
                <Button onClick={voltarTelaInicial} className="ml-4">Voltar</Button>
            </div>
        );
    }

    // Função para obter classes de estilo da carta
    const obterEstiloCarta = () => {
        if (ocultarCarta && !cartaRevelada) return "border-gray-300 bg-gray-100"; // Cinza claro quando oculto
        switch (cartaAtual.tipo) {
            case "Vantagem": return "border-green-500 bg-green-50";
            case "Desvantagem": return "border-red-500 bg-red-50";
            case "Outras": return "border-blue-500 bg-blue-50";
            case "ContraTempo": return "border-yellow-500 bg-yellow-50";
            default: return "border-gray-300 bg-white"; // Padrão
        }
    };

     // Lógica para desabilitar o botão Verificar
     const isVerificarDisabled = () => {
         if (respondido) return true;
         switch (cartaAtual.tipo) {
             case "Pergunta":
             case "ContraTempo":
             case "Vantagem":
             case "Desvantagem":
             case "Outras":
                 return selecionado === null;
             case "MultiplaEscolha":
                 return selecoesMultiplas.length === 0;
             case "Ordem":
                 return ordemSelecoes.length !== (cartaAtual.opcoes?.length ?? 0);
             case "RelacionarColunas":
                 return paresFormados.length !== (cartaAtual.respostaCorreta?.length ?? 0);
             case "PontoCerto":
                 return coordenadasClique === null;
             case "CompletarFrase":
                 return fragmentosSelecionados.length !== (cartaAtual.respostaCorreta?.length ?? 0);
             default: return true;
         }
     };


    // --- Renderização Principal do Jogo ---
    return (
        <div className="flex flex-col items-center p-2 md:p-4 min-h-screen bg-gradient-to-b from-green-50 to-blue-50 font-sans">

            {/* Card Principal do Jogo */}
            <Card
                className={cn(
                    "w-full max-w-lg mx-auto mt-4 shadow-xl border-2 rounded-lg transition-all duration-300",
                    obterEstiloCarta()
                )}
                style={
                     players.length > 0 && currentPlayer && !(ocultarCarta && !cartaRevelada)
                        ? { boxShadow: `0 0 15px 3px ${currentPlayer.color}` } // Sombra mais sutil
                        : {}
                }
            >
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="flex-1">
                            <CardTitle className="text-lg md:text-xl font-bold leading-tight">
                                {ocultarCarta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo}
                            </CardTitle>
                            {(!ocultarCarta || cartaRevelada) && cartaAtual.categorias && (
                                <p className="text-xs text-gray-500 mt-1">
                                    {cartaAtual.categorias.join(", ")}
                                </p>
                            )}
                        </div>
                         {(!ocultarCarta || cartaRevelada) && (
                            <Badge
                                variant={
                                    cartaAtual.dificuldade === "facil" ? "secondary" :
                                    cartaAtual.dificuldade === "normal" ? "default" : "destructive"
                                }
                                className="capitalize flex-shrink-0 h-6"
                             >
                                {cartaAtual.dificuldade}
                            </Badge>
                        )}
                    </div>

                     {/* Timer para ContraTempo */}
                    {cartaAtual.tipo === "ContraTempo" && tempoRestante !== null && !respondido && cartaRevelada && (
                        <div className="mt-2">
                            <Progress value={(tempoRestante / cartaAtual.tempoLimite) * 100} className="h-2 [&>*]:bg-yellow-500" />
                            <p className="text-center text-sm font-semibold text-yellow-700 mt-1">
                                <Timer className="inline h-4 w-4 mr-1" /> Tempo: {tempoRestante}s
                            </p>
                        </div>
                    )}

                    {/* Área da Pergunta */}
                    {(!ocultarCarta || cartaRevelada) ? (
                        <ScrollArea className="h-32 md:h-40 rounded-md border p-3 mt-2 bg-white/80">
                            {/* Usar dangerouslySetInnerHTML para renderizar HTML da pergunta */}
                            <div
                                className="text-sm prose prose-sm max-w-none" // Tailwind typography plugin
                                dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta || '' }}
                            />
                        </ScrollArea>
                    ) : (
                        // Placeholder quando a carta está oculta
                        <div className="h-32 md:h-40 flex flex-col items-center justify-center space-y-2 rounded-md border p-3 mt-2 bg-gray-200">
                            <EyeOff className="h-8 w-8 text-gray-500" />
                            <p className="text-sm text-gray-600">Carta Oculta</p>
                            {/* Dado pode ser rolado aqui ou no botão de revelar? Adicionar botão específico */}
                            {rolledNumber !== null && <p className="text-lg font-bold">Dado: {rolledNumber}</p>}
                             <Button
                                onClick={rolarDado}
                                variant="outline"
                                size="sm"
                                className="mt-2 bg-white"
                                onMouseDown={() => handleLongPressStart(rolarDado)}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(rolarDado)}
                                onTouchEnd={handleLongPressEnd}
                                onTouchCancel={handleLongPressEnd}
                            >
                                <Dice6 className="h-4 w-4 mr-1" /> Rolar Dado
                            </Button>
                        </div>
                    )}
                </CardHeader>

                {/* Conteúdo da Resposta (Opções, Imagem, etc.) */}
                {(!ocultarCarta || cartaRevelada) && (
                    <CardContent className="pt-0 pb-4">
                        <div className="space-y-2">
                             {/* Renderização Condicional das Opções/Interações */}
                             {renderizarConteudoResposta()}
                        </div>

                        {/* Dica */}
                        {mostrarDica && cartaAtual.dica && (
                            <Alert variant="default" className="mt-4 bg-blue-50 border-blue-300">
                                <HelpCircle className="h-4 w-4 text-blue-700" />
                                <AlertDescription className="text-sm text-blue-800">
                                    <strong>Dica:</strong> {cartaAtual.dica}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Fontes */}
                        {mostrarFontes && cartaAtual.fontes && cartaAtual.fontes.length > 0 && (
                            <Alert variant="default" className="mt-4 bg-gray-50 border-gray-300">
                                <BookOpen className="h-4 w-4 text-gray-700" />
                                <AlertDescription className="text-sm text-gray-800">
                                    <strong>Fontes:</strong>
                                    <ul className="list-disc list-inside mt-1 text-xs">
                                        {cartaAtual.fontes.map((fonte, idx) => (
                                            <li key={idx}>{fonte}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                )}

                {/* Footer com Ações e Stats */}
                <CardFooter className="flex flex-col items-center pt-4 border-t bg-gray-50/50 rounded-b-lg">

                     {/* Botões de Ação Primários (linha 1) */}
                    <div className="flex flex-wrap justify-center gap-2 w-full mb-3">
                         <Button onClick={toggleFontes} size="sm" variant="outline" disabled={!cartaAtual.fontes || cartaAtual.fontes.length === 0 || (ocultarCarta && !cartaRevelada)} className="h-8"> <BookOpen className="h-4 w-4" /></Button>
                         <Button onClick={pularPergunta} size="sm" variant={currentPlayer.pulosDisponiveis > 0 ? "secondary" : "outline"} disabled={currentPlayer.pulosDisponiveis === 0 || !["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"].includes(cartaAtual.tipo) || respondido || (ocultarCarta && !cartaRevelada)} className="h-8"> <SkipForward className="h-4 w-4" /> </Button>
                         <Button onClick={toggleDica} size="sm" variant={currentPlayer.respostasSeguidas >= 2 && !dicaUsada && !!cartaAtual.dica ? "secondary" : "outline"} disabled={currentPlayer.respostasSeguidas < 2 || dicaUsada || !cartaAtual.dica || respondido || (ocultarCarta && !cartaRevelada)} className="h-8"> <HelpCircle className="h-4 w-4" /> </Button>
                         <Button onClick={eliminarRespostaErrada} size="sm" variant={currentPlayer.respostasSeguidas >= 2 ? "secondary" : "outline"} disabled={currentPlayer.respostasSeguidas < 2 || !["Pergunta", "MultiplaEscolha", "ContraTempo"].includes(cartaAtual.tipo) || respondido || (ocultarCarta && !cartaRevelada)} className="h-8"> <MinusCircle className="h-4 w-4" /> </Button>
                         <Button onClick={resetarContadoresJogador} size="sm" variant="outline" className="h-8"> <RotateCcw className="h-4 w-4" /> </Button>
                         <Button onClick={voltarTelaInicial} size="sm" variant="outline" className="h-8"> <Home className="h-4 w-4" /> </Button>
                    </div>

                    {/* Botões de Ajuste Manual (linha 2) - Opcional, pode poluir */}
                    {/*
                    <div className="flex flex-wrap justify-center gap-1 w-full mb-3 text-xs">
                         <Button onClick={() => ajustarContador('respostasCertas', -1, 0)} size="xs" variant="ghost" className="h-6 px-1"><ThumbsUp className="h-3 w-3 text-green-500 mr-0.5"/>-</Button>
                         <Button onClick={() => ajustarContador('respostasErradas', -1, 0)} size="xs" variant="ghost" className="h-6 px-1"><ThumbsDown className="h-3 w-3 text-red-500 mr-0.5"/>-</Button>
                         <Button onClick={() => ajustarContador('contadorDeEstrelas', -1, 0)} size="xs" variant="ghost" className="h-6 px-1"><Star className="h-3 w-3 text-yellow-500 mr-0.5"/>-</Button>
                         <Button onClick={() => ajustarContador('contadorDeEstrelas', 1)} size="xs" variant="ghost" className="h-6 px-1"><Star className="h-3 w-3 text-yellow-500 mr-0.5"/>+</Button>
                         <Button onClick={() => ajustarContador('rodadasPreso', -1, 0)} size="xs" variant="ghost" className="h-6 px-1"><ChevronUp className="h-3 w-3 text-purple-500 transform rotate-180 mr-0.5"/>-</Button>
                         <Button onClick={() => ajustarContador('rodadasPreso', 1)} size="xs" variant="ghost" className="h-6 px-1"><ChevronUp className="h-3 w-3 text-purple-500 mr-0.5"/>+</Button>
                    </div>
                    */}


                     {/* Botão Principal: Revelar / Verificar / Próxima */}
                    <div className="w-full mb-3">
                        {ocultarCarta && !cartaRevelada ? (
                            <Button onClick={() => setCartaRevelada(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                <Eye className="mr-2 h-4 w-4"/> Revelar Carta
                            </Button>
                        ) : !respondido ? (
                            <Button
                                onClick={verificarResposta}
                                className={cn(
                                    "w-full bg-green-600 hover:bg-green-700 text-white",
                                    isVerificarDisabled() && "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400"
                                )}
                                disabled={isVerificarDisabled()}
                                onMouseDown={() => handleLongPressStart(rolarDado)} // Long press no Verificar = Rolar dado
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(rolarDado)}
                                onTouchEnd={handleLongPressEnd}
                                onTouchCancel={handleLongPressEnd}
                            >
                                <Check className="mr-2 h-4 w-4"/> Verificar Resposta
                            </Button>
                        ) : (
                            <Button
                                onClick={selecionarCartaAleatoria}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                onMouseDown={() => handleLongPressStart(selecionarCartaAleatoria)} // Long press no Próxima = Próxima
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(selecionarCartaAleatoria)}
                                onTouchEnd={handleLongPressEnd}
                                onTouchCancel={handleLongPressEnd}
                            >
                                <SkipForward className="mr-2 h-4 w-4"/> Próxima Carta
                            </Button>
                        )}
                    </div>

                     {/* Mensagem de Feedback */}
                    {mensagem && (
                        <Alert variant={mensagem.toLowerCase().includes('correto') || mensagem.toLowerCase().includes('vantagem') ? "default" : "destructive"} className={`text-center text-sm font-semibold mb-3 ${mensagem.toLowerCase().includes('correto') || mensagem.toLowerCase().includes('vantagem') ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}>
                             <AlertDescription>{mensagem}</AlertDescription>
                        </Alert>
                    )}

                     {/* Barra de Progresso e Estatísticas */}
                    <div className="w-full">
                        <Progress value={currentPlayer.progresso} className="h-2.5 [&>*]:bg-orange-500" />
                         <div className="flex justify-between items-center w-full mt-2 text-xs text-gray-700 flex-wrap gap-x-3 gap-y-1">
                            <span className="flex items-center" title="Rodadas Preso"><ChevronUp className="h-3.5 w-3.5 text-purple-500 mr-0.5"/>{currentPlayer.rodadasPreso}</span>
                            <span className="flex items-center" title="Estrelas Fixas"><Award className="h-3.5 w-3.5 text-yellow-600 mr-0.5"/>{currentPlayer.fixedStars}</span>
                            <span className="flex items-center" title="Estrelas Bônus"><Star className="h-3.5 w-3.5 text-yellow-500 mr-0.5"/>{currentPlayer.contadorDeEstrelas}</span>
                            <span className="flex items-center" title="Pulos Disponíveis"><SkipForward className="h-3.5 w-3.5 text-blue-500 mr-0.5"/>{currentPlayer.pulosDisponiveis}</span>
                            <span className="flex items-center" title="Respostas Corretas"><ThumbsUp className="h-3.5 w-3.5 text-green-500 mr-0.5"/>{currentPlayer.respostasCertas}</span>
                            <span className="flex items-center" title="Respostas Erradas"><ThumbsDown className="h-3.5 w-3.5 text-red-500 mr-0.5"/>{currentPlayer.respostasErradas}</span>
                            <span className="flex items-center" title="Respostas Seguidas"><Zap className="h-3.5 w-3.5 text-orange-500 mr-0.5"/>{currentPlayer.respostasSeguidas}</span>
                        </div>
                    </div>

                </CardFooter>
            </Card>

            {/* Seleção de Jogador */}
            <div className="mt-6 w-full max-w-md">
                 <p className="text-center text-sm font-medium mb-2 text-gray-800">
                     Vez de: <span style={{ color: currentPlayer.color }} className="font-bold">{currentPlayer.name}</span>
                 </p>
                <div
                    className={`grid gap-2 ${
                        players.length > 4 ? (players.length > 6 ? "grid-cols-4" : "grid-cols-3") : `grid-cols-${Math.max(players.length, 1)}`
                    }`}
                >
                    {players.map((pl) => (
                        <Button
                            key={pl.id}
                            onClick={() => updateGameState({ currentPlayerId: pl.id })}
                            size="sm"
                            variant={currentPlayerId === pl.id ? "default" : "outline"}
                            className="truncate text-xs md:text-sm h-9" // Ajustar altura
                            style={{
                                backgroundColor: currentPlayerId === pl.id ? pl.color : 'white',
                                color: currentPlayerId === pl.id ? 'white' : pl.color, // Cor do texto = cor do jogador quando não selecionado
                                borderColor: pl.color,
                                borderWidth: currentPlayerId === pl.id ? '2px' : '1px',
                                // fontWeight: currentPlayerId === pl.id ? 'bold' : 'normal',
                            }}
                        >
                            {pl.name}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Modal do Dado */}
            {isDieModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center relative w-64 h-64 flex flex-col justify-center items-center">
                        <Button
                            className="absolute top-2 right-2"
                            variant="ghost" size="icon"
                            onClick={() => setIsDieModalOpen(false)}
                            disabled={isRolling}
                        >
                            <XIcon className="h-6 w-6 text-gray-500" />
                        </Button>
                        {isRolling ? (
                            <>
                                <p className="text-lg mb-4 font-semibold">Rolando...</p>
                                <p className="text-7xl font-bold mb-6 animate-bounce">{rollingNumber}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-lg mb-2">Resultado:</p>
                                <p className="text-8xl font-bold mb-4">{rolledNumber}</p>
                                <Button onClick={rolarDado} size="lg">
                                    <Dice6 className="h-5 w-5 mr-2" /> Rolar Novamente
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );


    // --- Função de Renderização de Conteúdo da Resposta (Interna) ---
    function renderizarConteudoResposta() {
        if (!cartaAtual) return null;

        switch (cartaAtual.tipo) {
            case "Pergunta":
            case "ContraTempo":
            case "Vantagem":
            case "Desvantagem":
            case "Outras":
                const isSingleChoice = ["Pergunta", "ContraTempo", "Vantagem", "Desvantagem", "Outras"].includes(cartaAtual.tipo);
                return cartaAtual.opcoes.map((op) => {
                    const isCorrect = isSingleChoice
                        ? (Array.isArray(cartaAtual.respostaCorreta) ? cartaAtual.respostaCorreta.includes(op.id) : cartaAtual.respostaCorreta === op.id)
                        : false; // Correção depende do tipo exato
                    const selected = selecionado === op.id;
                    const isEliminated = opcoesEliminadas.includes(op.id);

                    let buttonClass = "";
                    if (respondido) {
                        if (isCorrect) buttonClass = "bg-green-100 border-green-400 hover:bg-green-200";
                        else if (selected && !isCorrect) buttonClass = "bg-red-100 border-red-400 hover:bg-red-200";
                        else buttonClass = "opacity-70"; // Não selecionada e não correta
                    } else if (selected) {
                         buttonClass = "bg-blue-100 border-blue-400"; // Seleção ativa
                    }

                    return (
                        <Button
                            key={op.id}
                            onClick={() => handleSelecao(op.id)}
                            variant={selected || (respondido && isCorrect) ? "secondary" : "outline"}
                             className={cn(
                                "w-full justify-start text-left text-sm h-auto py-2 px-3 whitespace-normal transition-colors duration-150",
                                buttonClass,
                                isEliminated && "line-through opacity-50 cursor-not-allowed"
                            )}
                            disabled={isEliminated || respondido}
                        >
                             <span className="flex-1">{op.texto}</span>
                             {respondido && isCorrect && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />}
                             {respondido && selected && !isCorrect && <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />}
                        </Button>
                    );
                });

             case "MultiplaEscolha":
                return cartaAtual.opcoes.map((op) => {
                    const isCorrect = Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(op.id);
                    const selected = selecoesMultiplas.includes(op.id);
                    const isEliminated = opcoesEliminadas.includes(op.id);
                    let buttonClass = "";

                    if (respondido) {
                         if (isCorrect) buttonClass = "bg-green-100 border-green-400 hover:bg-green-200"; // Correta sempre destaca verde
                         if (selected && !isCorrect) buttonClass = "bg-red-100 border-red-400 hover:bg-red-200"; // Selecionada errada
                         if (!selected && isCorrect) buttonClass = "bg-green-100 border-green-400 opacity-80"; // Correta não selecionada
                         if (!selected && !isCorrect) buttonClass = "opacity-60"; // Errada não selecionada

                    } else if (selected) {
                         buttonClass = "bg-blue-100 border-blue-400"; // Seleção ativa
                    }

                    return (
                         <Button
                            key={op.id}
                            onClick={() => handleSelecaoMultipla(op.id)}
                            variant={selected ? "secondary" : "outline"}
                            className={cn(
                                "w-full justify-start text-left text-sm h-auto py-2 px-3 whitespace-normal transition-colors duration-150",
                                buttonClass,
                                isEliminated && "line-through opacity-50 cursor-not-allowed"
                            )}
                            disabled={isEliminated || respondido}
                        >
                            {/* Checkbox visual */}
                             <div className={`w-4 h-4 mr-2 border rounded flex-shrink-0 flex items-center justify-center ${selected ? 'bg-blue-500 border-blue-600' : 'border-gray-400'}`}>
                                 {selected && <Check className="w-3 h-3 text-white" />}
                             </div>
                            <span className="flex-1">{op.texto}</span>
                            {/* Feedback pós-resposta */}
                             {respondido && isCorrect && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />}
                             {respondido && selected && !isCorrect && <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />}
                        </Button>
                    );
                });

            case "Ordem":
                 const cOrdem = cartaAtual as CartaOrdem; // Cast para tipo específico
                 return cOrdem.opcoes.map((op) => {
                    const isSelected = ordemSelecoes.includes(op.id);
                    const selectionIndex = isSelected ? ordemSelecoes.indexOf(op.id) + 1 : null;
                    const correctIndex = Array.isArray(cOrdem.respostaCorreta) ? cOrdem.respostaCorreta.indexOf(op.id) + 1 : null;
                    const isCorrectOrder = respondido && isSelected && selectionIndex === correctIndex;
                    const isWrongOrder = respondido && isSelected && selectionIndex !== correctIndex;

                    let buttonClass = "";
                     if (respondido) {
                         if (isCorrectOrder) buttonClass = "bg-green-100 border-green-400 hover:bg-green-200";
                         else if (isWrongOrder) buttonClass = "bg-red-100 border-red-400 hover:bg-red-200";
                         else buttonClass = "opacity-70"; // Não selecionada
                     } else if (isSelected) {
                         buttonClass = "bg-blue-100 border-blue-400"; // Seleção ativa
                     }

                    return (
                        <Button
                            key={op.id}
                            onClick={() => handleSelecaoOrdem(op.id)}
                            variant={isSelected ? "secondary" : "outline"}
                             className={cn(
                                "w-full justify-start text-left text-sm h-auto py-2 px-3 whitespace-normal transition-colors duration-150",
                                buttonClass
                            )}
                            disabled={respondido}
                        >
                             {/* Número da ordem selecionada */}
                             {isSelected && !respondido && (
                                 <span className="mr-2 font-bold text-blue-600 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-white">{selectionIndex}</span>
                             )}
                            <span className="flex-1">{op.texto}</span>
                            {/* Feedback pós-resposta */}
                             {isCorrectOrder && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />}
                             {isWrongOrder && (
                                 <div className="flex items-center ml-2 flex-shrink-0">
                                     <span className="text-xs font-bold text-red-600 mr-1">({selectionIndex})</span>
                                     <XCircle className="h-4 w-4 text-red-600" />
                                     {correctIndex !== null && <span className="text-xs ml-1 text-blue-600">({correctIndex})</span>}
                                 </div>
                             )}
                        </Button>
                    );
                });

            case "RelacionarColunas":
                 const cRel = cartaAtual as CartaRelacionarColunas;
                 return (
                    <div className="flex space-x-2 md:space-x-4">
                        {/* Coluna A */}
                        <div className="w-1/2 space-y-1.5">
                             <p className="text-xs font-semibold text-center mb-1 text-gray-600">Coluna A</p>
                             {cRel.colunaA.map(itemA => {
                                const isSelectedA = selecaoColunaA === itemA.id;
                                const par = paresFormados.find(p => p.aId === itemA.id);
                                const parCorreto = respondido ? cRel.respostaCorreta.find(rc => rc.aId === itemA.id) : undefined;
                                const isCorrectPair = respondido && par && parCorreto && par.bId === parCorreto.bId;
                                const isWrongPair = respondido && par && (!parCorreto || par.bId !== parCorreto.bId);

                                let buttonClass = "border-gray-300";
                                if (isSelectedA) buttonClass = "ring-2 ring-blue-500 border-blue-500";
                                if (par) buttonClass = "bg-gray-200 border-gray-400"; // Já pareado
                                if (isCorrectPair) buttonClass = "bg-green-100 border-green-400 hover:bg-green-200";
                                if (isWrongPair) buttonClass = "bg-red-100 border-red-400 hover:bg-red-200";

                                return (
                                    <Button
                                        key={`A-${itemA.id}`}
                                        variant="outline"
                                        onClick={() => handleSelecionarColunaA(itemA.id)}
                                        disabled={respondido}
                                        className={cn(
                                            "w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal",
                                            buttonClass
                                        )}
                                    >
                                        <span className="flex-1">{itemA.texto}</span>
                                        {isCorrectPair && <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-600 flex-shrink-0" />}
                                        {isWrongPair && <XCircle className="ml-1 h-3.5 w-3.5 text-red-600 flex-shrink-0" />}
                                        {/* Opcional: Mostrar par correto se errou */}
                                        {isWrongPair && parCorreto && (
                                             <span className="text-xs ml-1 text-blue-600 hidden md:inline">
                                                  ({cRel.colunaB.find(iB => iB.id === parCorreto.bId)?.texto})
                                             </span>
                                         )}
                                    </Button>
                                );
                            })}
                        </div>
                        {/* Coluna B */}
                        <div className="w-1/2 space-y-1.5">
                             <p className="text-xs font-semibold text-center mb-1 text-gray-600">Coluna B</p>
                             {cRel.colunaB.map(itemB => {
                                const isPairedB = paresFormados.some(p => p.bId === itemB.id);
                                const par = paresFormados.find(p => p.bId === itemB.id);
                                const itemAPaired = par ? cRel.colunaA.find(iA => iA.id === par.aId) : undefined;

                                let buttonClass = "border-gray-300 hover:bg-gray-100";
                                let isDisabled = respondido || selecaoColunaA === null || isPairedB;
                                if (isPairedB) buttonClass = "bg-gray-200 border-gray-400 opacity-70";

                                return (
                                    <Button
                                        key={`B-${itemB.id}`}
                                        variant="outline"
                                        onClick={() => handleSelecionarColunaB(itemB.id)}
                                        disabled={isDisabled}
                                        className={cn(
                                             "w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal",
                                             buttonClass,
                                             !isDisabled && selecaoColunaA !== null && "hover:border-blue-400" // Hint ao selecionar A
                                         )}
                                    >
                                         <span className="flex-1">{itemB.texto}</span>
                                         {/* Feedback de pareamento em B é menos direto, A mostra o resultado */}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                );

             case "PontoCerto":
                const cPonto = cartaAtual as CartaPontoCerto;
                 return (
                     <div
                         className="relative w-full max-w-md mx-auto aspect-video overflow-hidden rounded border border-gray-300 cursor-crosshair"
                         onClick={handleImagemClick}
                         role="button" // Semântica
                         aria-label={`Imagem interativa: ${cPonto.titulo}`}
                     >
                         <img
                             src={cPonto.imagemURL}
                             alt={`Imagem para: ${cPonto.titulo}`}
                             className={`block w-full h-full object-contain ${respondido ? 'cursor-not-allowed' : ''}`} // object-contain para não distorcer
                         />
                         {/* Feedback visual do clique */}
                         {coordenadasClique && (
                             <div
                                 className={`absolute w-3 h-3 rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2 ${
                                     respondido
                                         ? (mensagem.toLowerCase().includes('correto') ? 'bg-green-500 border-white' : 'bg-red-500 border-white')
                                         : 'bg-blue-500 border-white'
                                 }`}
                                 style={{ left: `${coordenadasClique.x * 100}%`, top: `${coordenadasClique.y * 100}%` }}
                             >
                                 {respondido && (
                                     mensagem.toLowerCase().includes('correto')
                                         ? <Check className="w-2 h-2 text-white" />
                                         : <XIcon className="w-2 h-2 text-white" />
                                 )}
                             </div>
                         )}
                         {/* Opcional: Mostrar zona correta se errou */}
                         {respondido && !mensagem.toLowerCase().includes('correto') && (() => {
                             const zonaCorreta = cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta);
                             return zonaCorreta ? (
                                 <div
                                     className="absolute border-2 border-dashed border-green-500 pointer-events-none"
                                     style={{
                                         left: `${zonaCorreta.x * 100}%`,
                                         top: `${zonaCorreta.y * 100}%`,
                                         width: `${zonaCorreta.largura * 100}%`,
                                         height: `${zonaCorreta.altura * 100}%`,
                                     }}
                                     title={zonaCorreta.descricao || "Área correta"}
                                 />
                             ) : null;
                         })()}
                     </div>
                 );

            case "CompletarFrase":
                 const cComp = cartaAtual as CartaCompletarFrase;
                 // Substitui placeholders na frase pelos fragmentos selecionados
                 let fraseRenderizada = cComp.fraseIncompleta;
                 fragmentosSelecionados.forEach((fragId, index) => {
                     const fragmento = cComp.fragmentos.find(f => f.id === fragId);
                     if (fragmento) {
                         fraseRenderizada = fraseRenderizada.replace(`__${index + 1}__`, `<strong class="text-blue-600 underline underline-offset-2 mx-1">${fragmento.texto}</strong>`);
                     }
                 });
                  // Remove placeholders restantes
                 fraseRenderizada = fraseRenderizada.replace(/__\d+__/g, '<span class="text-gray-400 border-b border-dashed border-gray-400 mx-1">___</span>');

                 const isCompleto = fragmentosSelecionados.length === cComp.respostaCorreta.length;
                 const isCorreto = respondido && mensagem.toLowerCase().includes('correto');

                 return (
                     <div className="space-y-3">
                         {/* Frase sendo completada */}
                          <div
                              className={`p-3 border rounded bg-gray-50 text-sm ${respondido ? (isCorreto ? 'border-green-300' : 'border-red-300') : 'border-gray-300'}`}
                              dangerouslySetInnerHTML={{ __html: fraseRenderizada }}
                          />

                          {/* Botões de Fragmentos */}
                          {!respondido && (
                             <div className="flex flex-wrap gap-2 justify-center">
                                 {cComp.fragmentos
                                     .filter(f => !fragmentosSelecionados.includes(f.id)) // Mostra apenas não usados
                                     .map(frag => (
                                         <Button
                                             key={frag.id}
                                             variant="outline"
                                             size="sm"
                                             onClick={() => handleSelecionarFragmento(frag.id)}
                                             className="bg-white hover:bg-blue-50"
                                         >
                                             {frag.texto}
                                         </Button>
                                 ))}
                                 {fragmentosSelecionados.length > 0 && (
                                     <Button
                                         variant="ghost"
                                         size="sm"
                                         onClick={limparFragmentos}
                                         className="text-red-500 hover:bg-red-100"
                                         title="Limpar seleção"
                                     >
                                         <RotateCcw className="h-4 w-4 mr-1"/> Limpar
                                     </Button>
                                 )}
                             </div>
                         )}
                          {/* Mostrar resposta correta se errou */}
                          {respondido && !isCorreto && (
                               <div className="text-xs text-center text-green-700 mt-2">
                                   <strong>Resposta:</strong> {cComp.respostaCorreta.map(id => cComp.fragmentos.find(f => f.id === id)?.texto).join(' / ')}
                               </div>
                           )}
                     </div>
                 );


            default:
                return <p className="text-sm text-red-500">Erro: Tipo de carta não suportado para renderização.</p>;
        }
    } // Fim de renderizarConteudoResposta

}; // Fim do Componente EcoChallenge

export default EcoChallenge;

// --- Exemplo de Cartas Novas (para adicionar a um arquivo .js/.json) ---
/*
[
  // --- ContraTempo ---
  {
    "id": "ct1",
    "tipo": "ContraTempo",
    "titulo": "Ciclo da Água Rápido",
    "pergunta": "Qual etapa do ciclo da água envolve a transformação de vapor d'água em líquido, formando nuvens?",
    "opcoes": [
      { "id": 1, "texto": "Evaporação" },
      { "id": 2, "texto": "Condensação" },
      { "id": 3, "texto": "Precipitação" },
      { "id": 4, "texto": "Infiltração" }
    ],
    "respostaCorreta": 2,
    "tempoLimite": 15,
    "dificuldade": "normal",
    "categorias": ["Ecologia Básica", "Ciclos Naturais"],
    "fontes": ["Livro de Ciências 7º ano"],
    "vantagem": "Rápido e certeiro!",
    "desvantagem": "O tempo acabou!",
    "dica": "Pense na formação de gotículas nas nuvens."
  },

  // --- RelacionarColunas ---
  {
    "id": "rc1",
    "tipo": "RelacionarColunas",
    "titulo": "Fontes de Energia",
    "pergunta": "Associe o tipo de energia renovável à sua fonte principal:",
    "colunaA": [
      { "id": 1, "texto": "Solar Fotovoltaica" },
      { "id": 2, "texto": "Eólica" },
      { "id": 3, "texto": "Hidrelétrica" },
      { "id": 4, "texto": "Biomassa" }
    ],
    "colunaB": [
      { "id": 10, "texto": "Vento" },
      { "id": 11, "texto": "Matéria Orgânica" },
      { "id": 12, "texto": "Luz do Sol" },
      { "id": 13, "texto": "Força da Água" }
    ],
    "respostaCorreta": [
      { "aId": 1, "bId": 12 },
      { "aId": 2, "bId": 10 },
      { "aId": 3, "bId": 13 },
      { "aId": 4, "bId": 11 }
    ],
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["Energia Renovável"],
    "fontes": ["ANEEL"],
    "vantagem": "Conexões perfeitas!",
    "desvantagem": "Algumas ligações se cruzaram.",
    "dica": "Pense na origem de cada palavra (hidro = água)."
  },

  // --- PontoCerto ---
  {
    "id": "pc1",
    "tipo": "PontoCerto",
    "titulo": "Camadas da Atmosfera",
    "pergunta": "Clique na camada da atmosfera onde ocorrem os fenômenos meteorológicos (chuva, nuvens).",
    "imagemURL": "/images/camadas_atmosfera.png", // ----> SUBSTITUIR PELO CAMINHO REAL <----
    "zonasClicaveis": [
      { "id": 1, "x": 0.1, "y": 0.7, "largura": 0.8, "altura": 0.25, "descricao": "Troposfera" }, // Correta
      { "id": 2, "x": 0.1, "y": 0.45, "largura": 0.8, "altura": 0.25, "descricao": "Estratosfera" },
      { "id": 3, "x": 0.1, "y": 0.2, "largura": 0.8, "altura": 0.25, "descricao": "Mesosfera" },
      { "id": 4, "x": 0.1, "y": 0.0, "largura": 0.8, "altura": 0.2, "descricao": "Termosfera/Exosfera" }
    ],
    "respostaCorreta": 1,
    "opcoes": [],
    "dificuldade": "normal",
    "categorias": ["Clima", "Geografia"],
    "fontes": ["INPE"],
    "vantagem": "Localização exata!",
    "desvantagem": "Um pouco acima ou abaixo.",
    "dica": "É a camada mais próxima da superfície terrestre."
  },

   // --- CompletarFrase ---
   {
    "id": "cf1",
    "tipo": "CompletarFrase",
    "titulo": "Processo de Reciclagem",
    "pergunta": "Complete a frase: A reciclagem transforma materiais __1__ em __2__ produtos, economizando __3__ e reduzindo a poluição.",
    "fraseIncompleta": "A reciclagem transforma materiais __1__ em __2__ produtos, economizando __3__ e reduzindo a poluição.",
    "fragmentos": [
      { "id": 1, "texto": "usados" },
      { "id": 2, "texto": "energia" },
      { "id": 3, "texto": "novos" },
      { "id": 4, "texto": "caros" },
      { "id": 5, "texto": "água" }
    ],
    "respostaCorreta": [1, 3, 2], // IDs na ordem: usados, novos, energia
    "opcoes": [],
    "dificuldade": "facil",
    "categorias": ["Reciclagem", "Sustentabilidade"],
    "fontes": ["Manual de Reciclagem"],
    "vantagem": "Frase completa e correta!",
    "desvantagem": "As palavras se misturaram um pouco.",
    "dica": "Pense no ciclo: algo velho vira algo... ?"
  }
]
*/