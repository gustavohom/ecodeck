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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Importar Decks (ajuste os caminhos conforme sua estrutura)
import manejoPlantadas from "./deck/cards_manejo_plantada";
import manejoNativas from "./deck/cards_manejo_nativa";
import ecologiaFlorestal from "./deck/cards_ecologia_florestal";
import estrelasAliens from "./dlc/cards_estrelas_aliens";
import testCards from "./.test/test_card";

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

// Tipos Existentes + Novos
interface CartaPergunta extends CartaBase { tipo: "Pergunta"; opcoes: Opcao[]; respostaCorreta: number; }
interface CartaMultiplaEscolha extends CartaBase { tipo: "MultiplaEscolha"; opcoes: Opcao[]; respostaCorreta: number[]; }
interface CartaOrdem extends CartaBase { tipo: "Ordem"; opcoes: Opcao[]; respostaCorreta: number[]; }
interface CartaVantagem extends CartaBase { tipo: "Vantagem"; opcoes: Opcao[]; respostaCorreta: number[]; }
interface CartaDesvantagem extends CartaBase { tipo: "Desvantagem"; opcoes: Opcao[]; respostaCorreta: number[]; }
interface CartaOutras extends CartaBase { tipo: "Outras"; opcoes: Opcao[]; respostaCorreta: number[]; }
interface CartaContraTempo extends CartaBase { tipo: "ContraTempo"; opcoes: Opcao[]; respostaCorreta: number; tempoLimite: number; }
interface ItemRelacionar { id: number; texto: string; }
interface CartaRelacionarColunas extends CartaBase { tipo: "RelacionarColunas"; colunaA: ItemRelacionar[]; colunaB: ItemRelacionar[]; respostaCorreta: { aId: number; bId: number }[]; opcoes: []; }
interface ZonaClicavel { id: number; x: number; y: number; largura: number; altura: number; descricao?: string; }
interface CartaPontoCerto extends CartaBase { tipo: "PontoCerto"; imagemURL: string; zonasClicaveis: ZonaClicavel[]; respostaCorreta: number; opcoes: []; }
interface FragmentoCompletar { id: number; texto: string; }
interface CartaCompletarFrase extends CartaBase { tipo: "CompletarFrase"; fraseIncompleta: string; fragmentos: FragmentoCompletar[]; respostaCorreta: number[]; opcoes: []; }

// Tipo União Completo
type Carta =
    | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras
    | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;

// --- Interfaces de Jogador e Jogo ---
interface Player {
    id: number; name: string; color: string; fixedStars: number; respostasCertas: number;
    respostasErradas: number; respostasSeguidas: number; progresso: number; pulosDisponiveis: number;
    contadorDeEstrelas: number; rodadasPreso: number;
}
interface PlayerInput { id: number; name: string; color: string; showColorPicker?: boolean; }
interface CustomDeck { id: number; name: string; cards: Carta[]; used: boolean; }

// --- Constantes ---
const predefinedColors = [
    "#9e0142","#f46d43","#fee08b","#66c2a5","#5e4fa2","#ff6699","#33a02c","#ff7f00",
    "#3288bd","#999999","#8dd3c7","#ffffb3","#fb8072","#80b1d3","#b3de69","#fccde5",
    "#bc80bd","#1f78b4","#e31a1c","#ffcc33","#6a3d9a","#b15928","#b2df8a","#cab2d6",
    "#a6cee3","#fb9a99","#fdbf6f","#ffed6f","#ccebc5","#ff4444",
];
const probabilitySettings = [
    { value: 0, color: "#ffffff", label: "0%" }, { value: 0.4, color: "#4ade80", label: "40%" },
    { value: 0.6, color: "#facc15", label: "60%" }, { value: 0.8, color: "#f87171", label: "80%" },
];
// Tipos considerados "perguntas" para o filtro
const tiposPergunta: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];
// Tipos considerados "especiais" para o ajuste de probabilidade
const tiposEspeciais: Carta['tipo'][] = ["Vantagem", "Desvantagem", "Outras"];

// --- Carregamento Inicial das Cartas ---
const manejoPlantadas_raw = manejoPlantadas;
const manejoNativas_raw = manejoNativas;
const ecologiaFlorestal_raw = ecologiaFlorestal;
const estrelasAliens_raw = estrelasAliens;
const testCards_raw = testCards;

const cartasOriginais: Carta[] = [
    ...(manejoPlantadas_raw as Carta[]),
    ...(manejoNativas_raw as Carta[]),
    ...(ecologiaFlorestal_raw as Carta[]),
    ...(estrelasAliens_raw as Carta[]),
    ...(testCards_raw as Carta[]),
].map((card, index) => ({
    ...card,
    id: card.id || `orig_${index}_${Math.random().toString(16).slice(2)}`
}));


// --- Funções Utilitárias ---
function parseJSDeckFile(content: string): Carta[] {
    try {
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) { throw new Error("Não foi possível encontrar um array exportado no arquivo JS."); }
        const arrayStr = match[1];
        const rawArray = new Function(`return ${arrayStr};`)() as any[];
        return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[];
    } catch (error: any) {
        console.error("Erro ao parsear arquivo JS:", error);
        throw new Error(`Erro ao processar arquivo JS: ${error.message}`);
    }
}
function recalcularCategorias(baseCards: Carta[], decks: CustomDeck[]): string[] {
    let allCards = [...baseCards];
    decks.forEach(d => { if (d.used) { allCards = [...allCards, ...d.cards]; } });
    const novasCategorias = Array.from(new Set(allCards.flatMap(c => c.categorias || []))).sort();
    return novasCategorias;
}
function isClickInZone(clickCoords: { x: number; y: number } | null, zone: ZonaClicavel): boolean {
    if (!clickCoords) return false;
    const { x, y } = clickCoords;
    return (x >= zone.x && x <= zone.x + zone.largura && y >= zone.y && y <= zone.y + zone.altura);
}


// --- Componente TelaInicial ---
interface TelaInicialProps {
    onStartGame: (initialState?: Partial<GameState>) => void; // Única prop para iniciar/continuar
    categoriasDisponiveis: string[];
    initialCategoriasSelecionadas: string[];
    initialPlayers: Player[];
    initialOcultarCarta: boolean;
    initialProbabilityIndex: number;
    hasSavedGame: boolean;
}
interface GameState {
    players: Player[]; currentPlayerId: number | null; categoriasSelecionadas: string[];
    ocultarCarta: boolean; probabilityIndex: number; jogoIniciado: boolean;
    customDecks: CustomDeck[]; usedDeckIds: number[];
}

const TelaInicial: React.FC<TelaInicialProps> = ({
    onStartGame, categoriasDisponiveis: baseCategorias, initialCategoriasSelecionadas,
    initialPlayers, initialOcultarCarta, initialProbabilityIndex, hasSavedGame,
}) => {
    const [termoBusca, setTermoBusca] = useState("");
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>(initialCategoriasSelecionadas);
    const [ocultarCarta, setOcultarCarta] = useState(initialOcultarCarta);
    const [probabilityIndex, setProbabilityIndex] = useState(initialProbabilityIndex);
    const [playerInputs, setPlayerInputs] = useState<PlayerInput[]>(() =>
        initialPlayers.length > 0
            ? initialPlayers.map((p) => ({ id: p.id, name: p.name, color: p.color, showColorPicker: false }))
            : [{ id: 0, name: "", color: predefinedColors[0], showColorPicker: false }]
    );
    const [customDecks, setCustomDecks] = useState<CustomDeck[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("customDecks");
            try { return saved ? JSON.parse(saved) as CustomDeck[] : []; } catch { return []; }
        } return [];
    });
    const [todasCategorias, setTodasCategorias] = useState<string[]>(() => recalcularCategorias(cartasOriginais, customDecks));
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const allCats = recalcularCategorias(cartasOriginais, customDecks);
        setTodasCategorias(allCats);
        setCategoriasSelecionadas((prevCats) => prevCats.filter((c) => allCats.includes(c)));
    }, [customDecks]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("customDecks", JSON.stringify(customDecks));
        }
    }, [customDecks]);

    const handleCustomDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; if (!files || files.length === 0) return; setIsLoading(true); setErrorMessage(null);
        let newDecks: CustomDeck[] = []; let errors: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i]; const content = await file.text();
            try {
                let newCards: Carta[] = []; const deckName = file.name.replace(/\.(js|json)$/, "");
                if (customDecks.some(d => d.name === deckName)) { errors.push(`Baralho "${deckName}" já existe.`); continue; }
                if (file.name.endsWith(".js")) { newCards = parseJSDeckFile(content); }
                else if (file.name.endsWith(".json")) { const rawArray = JSON.parse(content) as any[]; newCards = rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[]; }
                else { errors.push(`Formato não suportado: ${file.name}. Use .js ou .json.`); continue; }
                if (!Array.isArray(newCards) || newCards.length === 0) { errors.push(`Nenhuma carta válida encontrada em "${deckName}".`); continue; }
                newDecks.push({ id: Date.now() + Math.random(), name: deckName, cards: newCards, used: false });
            } catch (error: any) { errors.push(`Erro ao ler ${file.name}: ${error.message}`); }
        }
        if (newDecks.length > 0) { setCustomDecks((prev) => [...prev, ...newDecks]); }
        if (errors.length > 0) { setErrorMessage(errors.join("\n")); }
        setIsLoading(false); e.target.value = '';
    };
    const toggleDeckUsage = (deckId: number) => { setCustomDecks((prev) => prev.map((d) => (d.id === deckId ? { ...d, used: !d.used } : d))); };
    const removeDeck = (deckId: number) => { if (window.confirm("Remover baralho?")) { setCustomDecks((prev) => prev.filter((d) => d.id !== deckId)); } }
    const addPlayerInput = () => { if (playerInputs.length < 8) { setPlayerInputs([...playerInputs, { id: playerInputs.length, name: "", color: predefinedColors[playerInputs.length % predefinedColors.length], showColorPicker: false, }]); } };
    const handlePlayerChange = (index: number, field: "name" | "color", value: string) => { const updatedPlayers = [...playerInputs]; const player = updatedPlayers[index]; if (field === 'name') player.name = value; if (field === 'color') player.color = value; setPlayerInputs(updatedPlayers); };
    const toggleColorPicker = (index: number) => { const updatedPlayers = playerInputs.map((p, i) => i === index ? { ...p, showColorPicker: !p.showColorPicker } : {...p, showColorPicker: false}); setPlayerInputs(updatedPlayers); };
    const deletePlayer = (index: number) => { setPlayerInputs((prev) => prev.filter((_, i) => i !== index)); };

    const handleStartGame = (continueGame = false) => {
        let gameStateToStart: Partial<GameState>;
        if (continueGame && typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
             try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                     const currentCustomDecks = JSON.parse(localStorage.getItem("customDecks") || '[]') as CustomDeck[];
                     const usedDeckIdsFromSave = savedState.usedDeckIds || [];
                     const finalCustomDecks = currentCustomDecks.map(deck => ({ ...deck, used: usedDeckIdsFromSave.includes(deck.id) }));
                     gameStateToStart = { ...savedState, customDecks: finalCustomDecks, jogoIniciado: true, };
                     gameStateToStart.categoriasSelecionadas = categoriasSelecionadas;
                     gameStateToStart.ocultarCarta = ocultarCarta;
                     gameStateToStart.probabilityIndex = probabilityIndex;
                } else { return handleStartGame(false); }
            } catch (e) { console.error("Erro ao carregar jogo salvo:", e); return handleStartGame(false); }
        } else {
            if (categoriasSelecionadas.length === 0 || playerInputs.length === 0) return;
            const initializedPlayers: Player[] = playerInputs.map((input, index) => ({
                id: index, name: input.name.trim() || `Jogador ${index + 1}`, color: input.color || predefinedColors[index % predefinedColors.length],
                fixedStars: 0, respostasCertas: 0, respostasErradas: 0, respostasSeguidas: 0, progresso: 0, pulosDisponiveis: 0, contadorDeEstrelas: 0, rodadasPreso: 0,
            }));
            gameStateToStart = {
                players: initializedPlayers, currentPlayerId: initializedPlayers[0]?.id ?? null, categoriasSelecionadas: categoriasSelecionadas,
                ocultarCarta: ocultarCarta, probabilityIndex: probabilityIndex, customDecks: customDecks,
                usedDeckIds: customDecks.filter(d => d.used).map(d => d.id), jogoIniciado: true,
            };
        }
        onStartGame(gameStateToStart);
    };

    const categoriasFiltradas = todasCategorias.filter((cat) => cat.toLowerCase().includes(termoBusca.toLowerCase())).sort();
    const cycleProbability = () => { setProbabilityIndex((prevIndex) => (prevIndex + 1) % probabilitySettings.length); };

    return (
        <Card className="w-full max-w-md mx-auto mt-8 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-700">Eco Challenge</CardTitle>
                <p className="text-sm text-center text-gray-600">O Jogo da Sustentabilidade</p>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Seleção de Categorias */}
                <div className="space-y-2">
                     <h3 className="text-lg font-semibold text-gray-800">Categorias</h3>
                     <Input type="text" placeholder="Pesquisar Categoria..." value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} className="w-full p-2 border rounded"/>
                     <ScrollArea className="h-40 border rounded-md p-3 bg-gray-50">
                         {categoriasFiltradas.length > 0 ? (categoriasFiltradas.map((categoria) => (<div key={categoria} className="flex items-center space-x-2 mb-1 hover:bg-gray-100 p-1 rounded"><input type="checkbox" id={`cat-${categoria}`} checked={categoriasSelecionadas.includes(categoria)} onChange={() => {setCategoriasSelecionadas((prev) => prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria]);}} className="form-checkbox h-4 w-4 text-green-600"/><label htmlFor={`cat-${categoria}`} className="text-sm cursor-pointer flex-1">{categoria}</label></div>))) : (<p className="text-sm text-gray-500 italic">Nenhuma categoria encontrada.</p>)}
                     </ScrollArea>
                     <div className="flex space-x-2 mt-2">
                         <Button onClick={() => setCategoriasSelecionadas(todasCategorias)} variant="outline" size="sm" className="flex-1">Todas</Button>
                         <Button onClick={() => setCategoriasSelecionadas([])} variant="outline" size="sm" className="flex-1">Nenhuma</Button>
                     </div>
                </div>
                {/* Configuração de Jogadores */}
                <div className="space-y-3">
                     <h3 className="text-lg font-semibold text-gray-800">Jogadores</h3>
                     <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                         {playerInputs.map((player, index) => (<div key={player.id} className="border p-3 rounded-md shadow-sm bg-white relative"><div className="flex items-center space-x-2"><Input type="text" placeholder={`Jogador ${index + 1}`} value={player.name} maxLength={12} onChange={(e) => handlePlayerChange(index, "name", e.target.value)} className="flex-grow"/><Button variant="outline" size="icon" className="w-8 h-8 flex-shrink-0" onClick={() => toggleColorPicker(index)} style={{ backgroundColor: player.color }} aria-label="Selecionar cor"/><Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-red-500 hover:bg-red-100" onClick={() => deletePlayer(index)} aria-label="Remover jogador"><Trash className="h-4 w-4" /></Button></div>{player.showColorPicker && (<div className="absolute z-20 mt-2 right-12 w-48 bg-white border rounded-md shadow-lg p-2 grid grid-cols-6 gap-1">{predefinedColors.map((color, idx) => (<button key={idx} aria-label={`Selecionar cor ${color}`} style={{ backgroundColor: color }} className={`w-6 h-6 rounded border ${player.color === color ? 'ring-2 ring-offset-1 ring-black' : 'border-gray-300'}`} onClick={() => {handlePlayerChange(index, "color", color); toggleColorPicker(index);}}/>))}</div>)}</div>))}
                     </div>
                     {playerInputs.length < 8 && (<Button onClick={addPlayerInput} variant="secondary" className="w-full">+ Adicionar Jogador</Button>)}
                </div>
                 {/* Baralhos Personalizados */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">Baralhos Personalizados</h3>
                    {errorMessage && (<Alert variant="destructive"><AlertDescription>{errorMessage}</AlertDescription></Alert>)}
                    <Input type="file" multiple accept=".js,.json" onChange={handleCustomDeckUpload} disabled={isLoading} className="text-sm"/>
                    {isLoading && <p className="text-sm text-blue-600">Carregando baralhos...</p>}
                    {customDecks.length > 0 && (<ScrollArea className="h-32 border rounded-md p-2 bg-gray-50 space-y-2">{customDecks.map((deck) => (<div key={deck.id} className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded"><span className="flex-1 text-sm truncate" title={`${deck.name} (${deck.cards.length} cartas)`}>{deck.name} ({deck.cards.length})</span><Button size="sm" variant={deck.used ? "default" : "outline"} onClick={() => toggleDeckUsage(deck.id)} className={`h-7 px-2 text-xs ${deck.used ? 'bg-green-600 hover:bg-green-700' : ''}`}>{deck.used ? "Ativo" : "Usar"}</Button><Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500 hover:bg-red-100" onClick={() => removeDeck(deck.id)} aria-label={`Remover baralho ${deck.name}`}><Trash className="h-4 w-4" /></Button></div>))}</ScrollArea>)}
                    {customDecks.length === 0 && !isLoading && (<p className="text-sm text-gray-500 italic">Nenhum baralho personalizado adicionado.</p>)}
                </div>
                {/* Opções de Jogo */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Opções</h3>
                    <Button onClick={() => setOcultarCarta(!ocultarCarta)} variant="outline" className="w-full flex items-center justify-center space-x-2">{ocultarCarta ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}<span>{ocultarCarta ? "Ocultar Carta Ativado" : "Ocultar Carta Desativado"}</span></Button>
                    <Button onClick={cycleProbability} className="w-full flex items-center justify-center space-x-2 text-white" style={{ backgroundColor: probabilitySettings[probabilityIndex].color }}><span>% Cartas Especiais:</span><span className="font-bold">{probabilitySettings[probabilityIndex].label}</span></Button>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pt-6 border-t">
                {hasSavedGame && (<Button onClick={() => handleStartGame(true)} className="w-full bg-blue-600 hover:bg-blue-700">Continuar Jogo Salvo</Button>)}
                <Button onClick={() => handleStartGame(false)} className="w-full bg-green-600 hover:bg-green-700" disabled={categoriasSelecionadas.length === 0 || playerInputs.length === 0 || isLoading}>{hasSavedGame ? "Iniciar Novo Jogo" : "Iniciar Jogo"}</Button>
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
    const [cartaRevelada, setCartaRevelada] = useState(false);
    const [noCardsAvailable, setNoCardsAvailable] = useState(false);
    const [selecionado, setSelecionado] = useState<number | null>(null);
    const [selecoesMultiplas, setSelecoesMultiplas] = useState<number[]>([]);
    const [ordemSelecoes, setOrdemSelecoes] = useState<number[]>([]);
    const [tempoRestante, setTempoRestante] = useState<number | null>(null);
    const [selecaoColunaA, setSelecaoColunaA] = useState<number | null>(null);
    const [paresFormados, setParesFormados] = useState<{ aId: number; bId: number }[]>([]);
    const [coordenadasClique, setCoordenadasClique] = useState<{ x: number; y: number } | null>(null);
    const [fragmentosSelecionados, setFragmentosSelecionados] = useState<number[]>([]);
    const [mostrarSomentePerguntas, setMostrarSomentePerguntas] = useState(false);
    const [rolledNumber, setRolledNumber] = useState<number | null>(null);
    const [rollingNumber, setRollingNumber] = useState<number | null>(null);
    const [isDieModalOpen, setIsDieModalOpen] = useState(false);
    const [isRolling, setIsRolling] = useState(false);

    // Refs
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

    // --- Funções de Gerenciamento de Estado ---
    const updateGameState = useCallback((newState: Partial<GameState>) => {
        setGameState(prev => {
            if (!prev) return null;
            const updatedState = { ...prev, ...newState };
            if (typeof window !== "undefined") {
                 try {
                     const { customDecks, ...stateToSave } = updatedState;
                     stateToSave.usedDeckIds = customDecks.filter(d => d.used).map(d => d.id);
                     localStorage.setItem("estadoEcoChallenge", JSON.stringify({...stateToSave, mostrarSomentePerguntas: mostrarSomentePerguntas})); // Salva mostrarSomentePerguntas
                 } catch (e) { console.error("Erro ao salvar estado:", e); }
            }
            return updatedState;
        });
    }, [mostrarSomentePerguntas]);

     const updateCurrentPlayer = useCallback((partialPlayerData: Partial<Player>) => {
        if (!gameState || gameState.currentPlayerId === null) return;
        const updatedPlayers = gameState.players.map(p =>
            p.id === gameState.currentPlayerId ? { ...p, ...partialPlayerData } : p
        );
        updateGameState({ players: updatedPlayers });
    }, [gameState, updateGameState]);

    // --- Inicialização e Carregamento ---
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
             try {
                // Adiciona tipo opcional para mostrarSomentePerguntas ao carregar
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState & {mostrarSomentePerguntas?: boolean} : null;
                if (savedState && savedState.jogoIniciado) {
                     const savedCustomDecksRaw = localStorage.getItem("customDecks");
                     const currentCustomDecks = savedCustomDecksRaw ? JSON.parse(savedCustomDecksRaw) as CustomDeck[] : [];
                     const usedDeckIdsFromSave = savedState.usedDeckIds || [];
                     const finalCustomDecks = currentCustomDecks.map(deck => ({ ...deck, used: usedDeckIdsFromSave.includes(deck.id) }));
                     setGameState({ ...savedState, customDecks: finalCustomDecks });
                     setMostrarSomentePerguntas(savedState.mostrarSomentePerguntas ?? false); // Restaura do save
                     return;
                }
            } catch (e) { console.error("Erro ao carregar estado:", e); localStorage.removeItem("estadoEcoChallenge"); }
        }
    }, []);

    // --- Seleção de Carta ---
    const selecionarCartaAleatoria = useCallback(() => {
        if (!gameState) return;
        const { categoriasSelecionadas, probabilityIndex, customDecks } = gameState;
        const p = probabilitySettings[probabilityIndex].value;
        const incluirCartasEspeciais = p === 0 || Math.random() >= p;

        let baralhoCompleto = [...cartasOriginais];
        customDecks.forEach(deck => { if (deck.used) { baralhoCompleto = [...baralhoCompleto, ...deck.cards]; } });

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
            setNoCardsAvailable(true); setCartaAtual(null); setMensagem("Nenhuma carta encontrada com os filtros atuais!"); return;
        }

        setNoCardsAvailable(false);
        const idxAleat = Math.floor(Math.random() * cartasFiltradas.length);
        const novaCarta = cartasFiltradas[idxAleat];
        setCartaAtual(novaCarta);

        setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setMostrarFontes(false);
        setOpcoesEliminadas([]); setCartaRevelada(!gameState.ocultarCarta); setRolledNumber(null); setIsDieModalOpen(false);
        setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null);
        setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]);

        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (novaCarta.tipo === "ContraTempo") { setTempoRestante(novaCarta.tempoLimite); }

    }, [gameState, mostrarSomentePerguntas]);

    // --- Efeitos ---
    useEffect(() => {
        if (gameState?.jogoIniciado && !cartaAtual && !noCardsAvailable) { selecionarCartaAleatoria(); }
    }, [gameState?.jogoIniciado, cartaAtual, noCardsAvailable, selecionarCartaAleatoria]);

    useEffect(() => {
         if (cartaAtual?.tipo === "ContraTempo" && tempoRestante !== null && tempoRestante > 0 && !respondido && gameState?.jogoIniciado && cartaRevelada) {
            timerIntervalRef.current = setInterval(() => {
                setTempoRestante((prev) => {
                    if (prev === null || prev <= 1) {
                        clearInterval(timerIntervalRef.current!);
                        setRespondido(true); setMensagem(`Tempo esgotado! ${cartaAtual.desvantagem || 'Tente novamente.'}`);
                        const localCurrentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);
                        if (localCurrentPlayer) {
                            updateCurrentPlayer({ respostasErradas: localCurrentPlayer.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(localCurrentPlayer.progresso - 10, 0), });
                        } return 0;
                    } return prev - 1;
                });
            }, 1000);
        } else if (timerIntervalRef.current && (respondido || tempoRestante === 0)) { clearInterval(timerIntervalRef.current); }
        return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
    }, [cartaAtual, tempoRestante, respondido, gameState, cartaRevelada, updateCurrentPlayer]);

    // --- Handlers de Interação ---
    const handleSelecao = (id: number) => { if (!respondido) setSelecionado(id); };
    const handleSelecaoMultipla = (id: number) => { if (!respondido) { setSelecoesMultiplas((prev) => prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]); } };
    const handleSelecaoOrdem = (id: number) => { if (!respondido) { setOrdemSelecoes((prev) => prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]); } };
    const handleSelecionarColunaA = (id: number) => { if (respondido) return; const parExistenteIndex = paresFormados.findIndex(p => p.aId === id); if (parExistenteIndex > -1) { setParesFormados(prev => prev.filter((_, index) => index !== parExistenteIndex)); setSelecaoColunaA(null); } else { setSelecaoColunaA(id === selecaoColunaA ? null : id); } };
    const handleSelecionarColunaB = (id: number) => { if (respondido || selecaoColunaA === null) return; if (paresFormados.some(p => p.bId === id)) return; setParesFormados(prev => [...prev, { aId: selecaoColunaA, bId: id }]); setSelecaoColunaA(null); };
    const handleImagemClick = (event: React.MouseEvent<HTMLDivElement>) => { if (respondido || !cartaAtual || cartaAtual.tipo !== 'PontoCerto') return; const target = event.currentTarget; const rect = target.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height; const clampedX = Math.max(0, Math.min(1, x)); const clampedY = Math.max(0, Math.min(1, y)); setCoordenadasClique({ x: clampedX, y: clampedY }); };
    const handleSelecionarFragmento = (id: number) => { if (respondido) return; setFragmentosSelecionados(prev => [...prev, id]); };
    const limparFragmentos = () => { if (!respondido) { setFragmentosSelecionados([]); } };

    // --- Verificação da Resposta ---
    const verificarResposta = () => {
        if (!cartaAtual || !currentPlayer || respondido) return;
        let cor = false; let pontosGanhos = 20; let pontosPerdidos = 10;
        let darPuloDificil = cartaAtual.dificuldade === "dificil"; let mensagemResultado = "";
        if (cartaAtual.tipo === "ContraTempo" && timerIntervalRef.current) { clearInterval(timerIntervalRef.current); }
        switch (cartaAtual.tipo) {
            case "Pergunta": case "ContraTempo": if (cartaAtual.tipo === "ContraTempo" && (tempoRestante === null || tempoRestante <= 0)) { cor = false; } else { cor = selecionado === cartaAtual.respostaCorreta; } break;
            case "MultiplaEscolha": cor = Array.isArray(cartaAtual.respostaCorreta) && selecoesMultiplas.length === cartaAtual.respostaCorreta.length && selecoesMultiplas.sort().toString() === cartaAtual.respostaCorreta.sort().toString(); if (cor) pontosGanhos = 25; break;
            case "Ordem": cor = Array.isArray(cartaAtual.respostaCorreta) && ordemSelecoes.length === cartaAtual.respostaCorreta.length && ordemSelecoes.toString() === cartaAtual.respostaCorreta.toString(); if (cor) pontosGanhos = 30; darPuloDificil = true; break;
            case "RelacionarColunas": if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } cor = paresFormados.length === cartaAtual.respostaCorreta.length && paresFormados.map(p => `${p.aId}-${p.bId}`).sort().join(',') === cartaAtual.respostaCorreta.map(p => `${p.aId}-${p.bId}`).sort().join(','); if (cor) pontosGanhos = 30; darPuloDificil = true; break;
            case "PontoCerto": if (!coordenadasClique || !Array.isArray(cartaAtual.zonasClicaveis)) { cor = false; break; } const zonaCorreta = cartaAtual.zonasClicaveis.find(z => z.id === cartaAtual.respostaCorreta); cor = zonaCorreta ? isClickInZone(coordenadasClique, zonaCorreta) : false; if (cor) pontosGanhos = 25; darPuloDificil = true; break;
            case "CompletarFrase": if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } cor = fragmentosSelecionados.length === cartaAtual.respostaCorreta.length && fragmentosSelecionados.toString() === cartaAtual.respostaCorreta.toString(); if (cor) pontosGanhos = 25; darPuloDificil = true; break;
            case "Vantagem": cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado); mensagemResultado = `Vantagem: ${cartaAtual.pergunta}. ${cartaAtual.vantagem || ''}`; break;
            case "Desvantagem": cor = false; mensagemResultado = `Desvantagem: ${cartaAtual.pergunta}. ${cartaAtual.desvantagem || ''}`; break;
            case "Outras": cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado); mensagemResultado = `${cartaAtual.titulo}: ${cor ? (cartaAtual.vantagem || 'Ok!') : (cartaAtual.desvantagem || 'Hmm...')}`; break;
            default: const _exhaustiveCheck: never = cartaAtual; console.error("Tipo não tratado:", _exhaustiveCheck); return;
        }
        setRespondido(true);
        if (tiposPergunta.includes(cartaAtual.tipo)) {
            if (cor) {
                const novoProgresso = currentPlayer.progresso + pontosGanhos; const completouBarra = novoProgresso >= 100;
                const pulosGanhos = (completouBarra ? 1 : 0) + (darPuloDificil ? 1 : 0); const estrelasFixasGanhsa = completouBarra ? 1 : 0;
                updateCurrentPlayer({ respostasCertas: currentPlayer.respostasCertas + 1, respostasSeguidas: currentPlayer.respostasSeguidas + 1, progresso: completouBarra ? 0 : novoProgresso, pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + pulosGanhos, 2), fixedStars: currentPlayer.fixedStars + estrelasFixasGanhsa, });
                mensagemResultado = `Correto! ${cartaAtual.vantagem || ''}${completouBarra ? ' Barra completa!' : ''}`;
            } else {
                updateCurrentPlayer({ respostasErradas: currentPlayer.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(currentPlayer.progresso - pontosPerdidos, 0), });
                let detalheErro = "";
                if (cartaAtual.tipo === "Ordem" && Array.isArray(cartaAtual.respostaCorreta) && Array.isArray(cartaAtual.opcoes)) { const ordemCorretaTexto = cartaAtual.respostaCorreta.map(id => cartaAtual.opcoes.find(o => o.id === id)?.texto).join(" -> "); detalheErro = ` Ordem correta: ${ordemCorretaTexto}.`; }
                mensagemResultado = `Incorreto. ${cartaAtual.desvantagem || ''}${detalheErro}`;
            }
        }
        setMensagem(mensagemResultado);
    };

    // --- Funções Auxiliares de Jogo ---
    const resetarContadoresJogador = () => { if (!currentPlayer || !window.confirm(`Resetar ${currentPlayer.name}?`)) return; updateCurrentPlayer({ respostasCertas: 0, respostasErradas: 0, progresso: 0, pulosDisponiveis: 0, respostasSeguidas: 0, rodadasPreso: 0, contadorDeEstrelas: 0, fixedStars: 0 }); setMensagem(`${currentPlayer.name} resetado.`); };
    const toggleDica = () => { if (!currentPlayer || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return; if (dicaUsada) { setMensagem("Dica já utilizada."); return; } if (!cartaAtual.dica) { setMensagem("Carta sem dica."); return; } if (currentPlayer.respostasSeguidas >= 2) { setMostrarDica(true); setDicaUsada(true); updateCurrentPlayer({ respostasSeguidas: currentPlayer.respostasSeguidas - 2 }); setMensagem("Dica revelada! (-2 sequências)"); } else { setMensagem("São necessárias 2 respostas corretas seguidas."); } };
    const toggleFontes = () => { if (!cartaAtual || (gameState?.ocultarCarta && !cartaRevelada)) return; if (cartaAtual.fontes && cartaAtual.fontes.length > 0) { setMostrarFontes(!mostrarFontes); } else { setMensagem("Nenhuma fonte disponível."); } };
    const pularPergunta = () => { if (!currentPlayer || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return; if (!tiposPergunta.includes(cartaAtual.tipo)) { setMensagem("Não pode pular este tipo."); return; } if (currentPlayer.pulosDisponiveis > 0) { updateCurrentPlayer({ pulosDisponiveis: currentPlayer.pulosDisponiveis - 1 }); setMensagem("Carta pulada!"); setTimeout(selecionarCartaAleatoria, 500); } else { setMensagem("Sem pulos disponíveis."); } };
    const eliminarRespostaErrada = () => {
        if (!currentPlayer || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return;
        const tiposEliminaveis: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "ContraTempo", "Outras"];
        if (!tiposEliminaveis.includes(cartaAtual.tipo) || !('opcoes' in cartaAtual) || cartaAtual.opcoes.length <= 2) { setMensagem("Não é possível eliminar opções para este tipo de carta ou já há poucas opções."); return; }
        if (currentPlayer.respostasSeguidas < 2) { setMensagem("São necessárias 2 respostas corretas seguidas."); return; }
        let respostaCorretaNumeros: number[] = [];
        if (cartaAtual.tipo === "Pergunta" || cartaAtual.tipo === "ContraTempo") { respostaCorretaNumeros = [cartaAtual.respostaCorreta]; }
        else if (cartaAtual.tipo === "MultiplaEscolha" || cartaAtual.tipo === "Outras") { if (Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.every(item => typeof item === 'number')) { respostaCorretaNumeros = cartaAtual.respostaCorreta as number[]; } else { console.error("Formato inesperado:", cartaAtual); setMensagem("Erro interno."); return; } }
        else { console.error("Tipo inesperado:", cartaAtual.tipo); return; }
        const opcoesErradasDisponiveis = cartaAtual.opcoes.filter(op => !respostaCorretaNumeros.includes(op.id) && !opcoesEliminadas.includes(op.id));
        if (opcoesErradasDisponiveis.length > 0) { const idxAleat = Math.floor(Math.random() * opcoesErradasDisponiveis.length); const opcaoEliminada = opcoesErradasDisponiveis[idxAleat].id; setOpcoesEliminadas((prev) => [...prev, opcaoEliminada]); updateCurrentPlayer({ respostasSeguidas: currentPlayer.respostasSeguidas - 2 }); setMensagem("Uma opção incorreta foi eliminada! (-2 sequências)"); }
        else { setMensagem("Não há mais opções incorretas para eliminar."); }
    };
    const voltarTelaInicial = () => { if (window.confirm("Voltar para a Tela Inicial? Progresso salvo.")) { setGameState(null); setCartaAtual(null); setNoCardsAvailable(false); setRespondido(false); setMensagem(""); } };
    const diminuirAcertos = () => { if (!currentPlayer) return; updateCurrentPlayer({ respostasCertas: Math.max(0, currentPlayer.respostasCertas - 1) }); setMensagem("Acerto removido."); };
    const diminuirErros = () => { if (!currentPlayer) return; updateCurrentPlayer({ respostasErradas: Math.max(0, currentPlayer.respostasErradas - 1) }); setMensagem("Erro removido."); };
    const incrementarContadorDeEstrelas = () => { if (!currentPlayer) return; updateCurrentPlayer({ contadorDeEstrelas: currentPlayer.contadorDeEstrelas + 1 }); setMensagem("Estrela bônus adicionada."); };
    const diminuirContadorDeEstrelas = () => { if (!currentPlayer) return; updateCurrentPlayer({ contadorDeEstrelas: Math.max(0, currentPlayer.contadorDeEstrelas - 1) }); setMensagem("Estrela bônus removida."); };
    const incrementarRodadasPreso = () => { if (!currentPlayer) return; updateCurrentPlayer({ rodadasPreso: currentPlayer.rodadasPreso + 1 }); setMensagem("Rodada preso adicionada."); };
    const diminuirRodadasPreso = () => { if (!currentPlayer) return; updateCurrentPlayer({ rodadasPreso: Math.max(0, currentPlayer.rodadasPreso - 1) }); setMensagem("Rodada preso removida."); };
    const rolarDado = () => { if (isRolling) return; setIsRolling(true); setIsDieModalOpen(true); setRolledNumber(null); let rollCount = 0; const maxRolls = 15; const rollInterval = setInterval(() => { setRollingNumber(Math.floor(Math.random() * 6) + 1); rollCount++; if (rollCount >= maxRolls) { clearInterval(rollInterval); const finalNumber = Math.floor(Math.random() * 6) + 1; setRolledNumber(finalNumber); setRollingNumber(null); setIsRolling(false); } }, 80); };
    const handleLongPressStart = (action: () => void) => { longPressTimeout.current = setTimeout(() => { action(); }, 800); };
    const handleLongPressEnd = () => { if (longPressTimeout.current) { clearTimeout(longPressTimeout.current); longPressTimeout.current = null; } };

    // --- Renderização ---
    if (!gameState) {
         const savedStateRaw = typeof window !== "undefined" ? localStorage.getItem("estadoEcoChallenge") : null;
         let savedState = null; try { savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null; } catch {}
         const hasSaved = !!(savedState && savedState.jogoIniciado);
         const initialPlayers = savedState?.players || []; const initialCategorias = savedState?.categoriasSelecionadas || [];
         const initialOcultar = savedState?.ocultarCarta ?? true; const initialProbIndex = savedState?.probabilityIndex ?? 0;
        return (<TelaInicial onStartGame={(initialState) => { if (initialState) { setGameState(initialState as GameState); } }} categoriasDisponiveis={Array.from(new Set(cartasOriginais.flatMap(c => c.categorias || []))).sort()} initialCategoriasSelecionadas={initialCategorias} initialPlayers={initialPlayers} initialOcultarCarta={initialOcultar} initialProbabilityIndex={initialProbIndex} hasSavedGame={hasSaved} />);
    }
    const { players, currentPlayerId, ocultarCarta } = gameState;
    const currentPlayer = players.find(p => p.id === currentPlayerId);
    if (noCardsAvailable) { return (<div className="flex flex-col items-center justify-center min-h-screen p-4 text-center"><Card className="p-6 shadow-lg"><CardHeader><CardTitle className="text-xl text-red-600">Erro!</CardTitle></CardHeader><CardContent><p className="mb-4">Nenhuma carta disponível.</p><p className="text-sm text-gray-600 mb-4">Verifique filtros/categorias ou adicione baralhos.</p></CardContent><CardFooter><Button onClick={voltarTelaInicial} className="w-full">Voltar</Button></CardFooter></Card></div>); }
    if (!cartaAtual || !currentPlayer) { return (<div className="flex items-center justify-center min-h-screen"><p>Carregando...</p><Button onClick={voltarTelaInicial} className="ml-4">Voltar</Button></div>); }
    const obterEstiloCarta = () => { if (ocultarCarta && !cartaRevelada) return "border-gray-300 bg-gray-100"; switch (cartaAtual.tipo) { case "Vantagem": return "border-green-500 bg-green-50"; case "Desvantagem": return "border-red-500 bg-red-50"; case "Outras": return "border-blue-500 bg-blue-50"; case "ContraTempo": return "border-yellow-500 bg-yellow-50"; default: return "border-gray-300 bg-white"; } };
    const isVerificarDisabled = () => { if (respondido) return true; switch (cartaAtual.tipo) { case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras": return selecionado === null; case "MultiplaEscolha": return selecoesMultiplas.length === 0; case "Ordem": return ordemSelecoes.length !== (cartaAtual.opcoes?.length ?? 0); case "RelacionarColunas": return paresFormados.length !== (cartaAtual.respostaCorreta?.length ?? 0); case "PontoCerto": return coordenadasClique === null; case "CompletarFrase": return fragmentosSelecionados.length !== (cartaAtual.respostaCorreta?.length ?? 0); default: return true; } };

    return (
        <div className="flex flex-col items-center p-2 md:p-4 min-h-screen bg-gradient-to-b from-green-50 to-blue-50 font-sans">
            <Card className={cn("w-full max-w-lg mx-auto mt-4 shadow-xl border-2 rounded-lg", obterEstiloCarta())} style={players.length > 0 && currentPlayer && !(ocultarCarta && !cartaRevelada) ? { boxShadow: `0 0 15px 3px ${currentPlayer.color}` } : {}}>
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="flex items-center space-x-2">
                             <Button onClick={() => setMostrarSomentePerguntas(!mostrarSomentePerguntas)} size="sm" variant={mostrarSomentePerguntas ? "secondary" : "outline"} title={mostrarSomentePerguntas ? "Mostrar todas" : "Só perguntas"} className="flex-shrink-0"> <Filter className="h-4 w-4" /> </Button>
                             <div className="flex-1">
                                <CardTitle className="text-lg md:text-xl font-bold leading-tight">{ocultarCarta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo}</CardTitle>
                                {(!ocultarCarta || cartaRevelada) && cartaAtual.categorias && (<p className="text-xs text-gray-500 mt-1">{cartaAtual.categorias.join(", ")}</p>)}
                             </div>
                        </div>
                         {(!ocultarCarta || cartaRevelada) && (<Badge variant={cartaAtual.dificuldade === "facil" ? "secondary" : cartaAtual.dificuldade === "normal" ? "default" : "destructive"} className="capitalize flex-shrink-0 h-6">{cartaAtual.dificuldade}</Badge>)}
                    </div>
                    {cartaAtual.tipo === "ContraTempo" && tempoRestante !== null && !respondido && cartaRevelada && ( <div className="mt-2"><Progress value={(tempoRestante / cartaAtual.tempoLimite) * 100} className="h-2 [&>*]:bg-yellow-500" /><p className="text-center text-sm font-semibold text-yellow-700 mt-1"><Timer className="inline h-4 w-4 mr-1" /> Tempo: {tempoRestante}s</p></div> )}
                    {(!ocultarCarta || cartaRevelada) ? (
                        <ScrollArea className="h-32 md:h-40 rounded-md border p-3 mt-2 bg-white/80">
                            <div className="text-sm prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta || '' }}/>
                        </ScrollArea>
                    ) : (
                        <div className="h-32 md:h-40 flex flex-col items-center justify-center space-y-2 rounded-md border p-3 mt-2 bg-gray-200">
                            <EyeOff className="h-8 w-8 text-gray-500" /> <p className="text-sm text-gray-600">Carta Oculta</p>
                            {rolledNumber !== null && <p className="text-lg font-bold">Dado: {rolledNumber}</p>}
                            <Button onClick={rolarDado} variant="outline" size="sm" className="mt-2 bg-white" onMouseDown={() => handleLongPressStart(rolarDado)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart(rolarDado)} onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}> <Dice6 className="h-4 w-4 mr-1" /> Rolar Dado </Button>
                        </div>
                    )}
                </CardHeader>

                {(!ocultarCarta || cartaRevelada) && (
                    <CardContent className="pt-0 pb-4">
                        <div className="space-y-2">{renderizarConteudoResposta()}</div>
                        {mostrarDica && cartaAtual.dica && ( <Alert variant="default" className="mt-4 bg-blue-50 border-blue-300"><HelpCircle className="h-4 w-4 text-blue-700" /><AlertDescription className="text-sm text-blue-800"><strong>Dica:</strong> {cartaAtual.dica}</AlertDescription></Alert> )}
                        {mostrarFontes && cartaAtual.fontes && cartaAtual.fontes.length > 0 && ( <Alert variant="default" className="mt-4 bg-gray-50 border-gray-300"><BookOpen className="h-4 w-4 text-gray-700" /><AlertDescription className="text-sm text-gray-800"><strong>Fontes:</strong><ul className="list-disc list-inside mt-1 text-xs">{cartaAtual.fontes.map((fonte, idx) => (<li key={idx}>{fonte}</li>))}</ul></AlertDescription></Alert> )}
                    </CardContent>
                )}

                <CardFooter className="flex flex-col items-center pt-4 border-t bg-gray-50/50 rounded-b-lg">
                    <div className="flex flex-wrap justify-center gap-1.5 w-full mb-3">
                        <Button onClick={toggleFontes} size="sm" variant="outline" disabled={!cartaAtual.fontes || cartaAtual.fontes.length === 0 || (ocultarCarta && !cartaRevelada)} className="h-8 px-2"> <BookOpen className="h-4 w-4" /></Button>
                        <Button onClick={pularPergunta} size="sm" variant={currentPlayer.pulosDisponiveis > 0 ? "secondary" : "outline"} disabled={currentPlayer.pulosDisponiveis === 0 || !tiposPergunta.includes(cartaAtual.tipo) || respondido || (ocultarCarta && !cartaRevelada)} className="h-8 px-2"> <SkipForward className="h-4 w-4" /> </Button>
                        <Button onClick={toggleDica} size="sm" variant={currentPlayer.respostasSeguidas >= 2 && !dicaUsada && !!cartaAtual.dica ? "secondary" : "outline"} disabled={currentPlayer.respostasSeguidas < 2 || dicaUsada || !cartaAtual.dica || respondido || (ocultarCarta && !cartaRevelada)} className="h-8 px-2"> <HelpCircle className="h-4 w-4" /> </Button>
                        <Button onClick={eliminarRespostaErrada} size="sm" variant={currentPlayer.respostasSeguidas >= 2 ? "secondary" : "outline"} disabled={currentPlayer.respostasSeguidas < 2 || !["Pergunta", "MultiplaEscolha", "ContraTempo"].includes(cartaAtual.tipo) || respondido || (ocultarCarta && !cartaRevelada)} className="h-8 px-2"> <MinusCircle className="h-4 w-4" /> </Button>
                        <Button onClick={resetarContadoresJogador} size="sm" variant="outline" className="h-8 px-2"> <RotateCcw className="h-4 w-4" /> </Button>
                        <Button onClick={voltarTelaInicial} size="sm" variant="outline" className="h-8 px-2"> <Home className="h-4 w-4" /> </Button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 w-full mb-3">
                        <Button onClick={diminuirAcertos} size="sm" variant="outline" className="h-7 px-1.5" title="Diminuir Acertos"><ThumbsUp className="h-3.5 w-3.5 text-green-500 transform scale-x-[-1]" /></Button>
                        <Button onClick={diminuirErros} size="sm" variant="outline" className="h-7 px-1.5" title="Diminuir Erros"><ThumbsDown className="h-3.5 w-3.5 text-red-500 transform scale-x-[-1]" /></Button>
                        <Button onClick={diminuirContadorDeEstrelas} size="sm" variant="outline" className="h-7 px-1.5" title="Diminuir Estrela Bônus"><Star className="h-3.5 w-3.5 text-red-500" /></Button>
                        <Button onClick={incrementarContadorDeEstrelas} size="sm" variant="outline" className="h-7 px-1.5" title="Aumentar Estrela Bônus"><Star className="h-3.5 w-3.5 text-yellow-500" /></Button>
                        <Button onClick={diminuirRodadasPreso} size="sm" variant="outline" className="h-7 px-1.5" title="Diminuir Rodada Preso"><ChevronUp className="h-4 w-4 text-red-500 transform rotate-180" /></Button>
                        <Button onClick={incrementarRodadasPreso} size="sm" variant="outline" className="h-7 px-1.5" title="Aumentar Rodada Preso"><ChevronUp className="h-4 w-4 text-purple-500" /></Button>
                    </div>
                    <div className="w-full mb-3">
                        {ocultarCarta && !cartaRevelada ? ( <Button onClick={() => setCartaRevelada(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white"><Eye className="mr-2 h-4 w-4"/> Revelar Carta</Button>
                        ) : !respondido ? ( <Button onClick={verificarResposta} className={cn("w-full bg-green-600 hover:bg-green-700 text-white", isVerificarDisabled() && "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400")} disabled={isVerificarDisabled()} onMouseDown={() => handleLongPressStart(rolarDado)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart(rolarDado)} onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}><Check className="mr-2 h-4 w-4"/> Verificar</Button>
                        ) : ( <Button onClick={selecionarCartaAleatoria} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onMouseDown={() => handleLongPressStart(selecionarCartaAleatoria)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart(selecionarCartaAleatoria)} onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}><SkipForward className="mr-2 h-4 w-4"/> Próxima Carta</Button> )}
                    </div>
                    {mensagem && ( <Alert variant={mensagem.toLowerCase().includes('correto') || mensagem.toLowerCase().includes('vantagem') ? "default" : "destructive"} className={`text-center text-sm font-semibold mb-3 ${mensagem.toLowerCase().includes('correto') || mensagem.toLowerCase().includes('vantagem') ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'}`}><AlertDescription>{mensagem}</AlertDescription></Alert> )}
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
                 <p className="text-center text-sm font-medium mb-2 text-gray-800">Vez de: <span style={{ color: currentPlayer.color }} className="font-bold">{currentPlayer.name}</span></p>
                 <div className={`grid gap-2 ${ players.length > 4 ? (players.length > 6 ? "grid-cols-4" : "grid-cols-3") : `grid-cols-${Math.max(players.length, 1)}` }`}>
                     {players.map((pl) => (<Button key={pl.id} onClick={() => updateGameState({ currentPlayerId: pl.id })} size="sm" variant={currentPlayerId === pl.id ? "default" : "outline"} className="truncate text-xs md:text-sm h-9" style={{ backgroundColor: currentPlayerId === pl.id ? pl.color : 'white', color: currentPlayerId === pl.id ? 'white' : pl.color, borderColor: pl.color, borderWidth: currentPlayerId === pl.id ? '2px' : '1px', }}>{pl.name}</Button>))}
                 </div>
            </div>

            {/* Modal do Dado */}
            {isDieModalOpen && ( <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"><div className="bg-white p-6 rounded-lg shadow-xl text-center relative w-64 h-64 flex flex-col justify-center items-center"><Button className="absolute top-2 right-2" variant="ghost" size="icon" onClick={() => setIsDieModalOpen(false)} disabled={isRolling}><XIcon className="h-6 w-6 text-gray-500" /></Button>{isRolling ? (<><p className="text-lg mb-4 font-semibold">Rolando...</p><p className="text-7xl font-bold mb-6 animate-bounce">{rollingNumber}</p></>) : (<><p className="text-lg mb-2">Resultado:</p><p className="text-8xl font-bold mb-4">{rolledNumber}</p><Button onClick={rolarDado} size="lg"><Dice6 className="h-5 w-5 mr-2" /> Rolar Novamente</Button></>)}</div></div> )}
        </div>
    );

    // --- Função de Renderização de Conteúdo da Resposta (Interna e Refinada) ---
    function renderizarConteudoResposta() {
        if (!cartaAtual) return null;
        switch (cartaAtual.tipo) {
            case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras":
                return cartaAtual.opcoes.map((op) => {
                    const isCorrect = Array.isArray(cartaAtual.respostaCorreta) ? cartaAtual.respostaCorreta.includes(op.id) : cartaAtual.respostaCorreta === op.id;
                    const isSelected = selecionado === op.id;
                    const isEliminated = opcoesEliminadas.includes(op.id);
                    const isWrongSelection = respondido && isSelected && !isCorrect;
                    let btnClass = "";
                    if (respondido) { if (isCorrect) btnClass = "bg-green-100 border-green-400 hover:bg-green-200 text-green-900"; else if (isSelected) btnClass = "bg-red-100 border-red-400 hover:bg-red-200 text-red-900"; else btnClass = "opacity-60"; }
                    else if (isSelected) { btnClass = "bg-blue-100 border-blue-400"; }
                    return ( <Button key={op.id} onClick={() => handleSelecao(op.id)} variant={isSelected || (respondido && isCorrect) ? "secondary" : "outline"} className={cn("w-full justify-start text-left text-sm h-auto py-2 px-3 whitespace-normal", btnClass, isEliminated && "line-through opacity-50 cursor-not-allowed")} disabled={isEliminated || respondido}> <span className="flex-1">{op.texto}</span> {isCorrect && respondido && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />} {isWrongSelection && <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />} </Button> );
                });
             case "MultiplaEscolha":
                return cartaAtual.opcoes.map((op) => {
                    const isCorrect = Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(op.id);
                    const isSelected = selecoesMultiplas.includes(op.id);
                    const isEliminated = opcoesEliminadas.includes(op.id);
                    const isWrongSelection = respondido && isSelected && !isCorrect;
                    const missedCorrect = respondido && isCorrect && !isSelected;
                    let btnClass = "";
                    if (respondido) { if (isCorrect && isSelected) btnClass = "bg-green-100 border-green-400 text-green-900"; else if (isWrongSelection) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (missedCorrect) btnClass = "bg-blue-100 border-blue-400 text-blue-900"; else btnClass = "opacity-60"; }
                    else if (isSelected) { btnClass = "bg-blue-100 border-blue-500"; }
                    return ( <Button key={op.id} onClick={() => handleSelecaoMultipla(op.id)} variant={isSelected ? "secondary" : "outline"} className={cn("w-full justify-start text-left text-sm h-auto py-2 px-3 whitespace-normal", btnClass, isEliminated && "line-through opacity-50 cursor-not-allowed")} disabled={isEliminated || respondido}> <div className={`w-4 h-4 mr-2 border rounded flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-700' : 'border-gray-400 bg-white'}`}>{isSelected && <Check className="w-3 h-3 text-white" />}</div> <span className="flex-1">{op.texto}</span> {isCorrect && respondido && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />} {isWrongSelection && <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />} {missedCorrect && <span title="Esta era correta" className="ml-2 text-blue-600">✓</span>} </Button> );
                });
            case "Ordem":
                 const cOrdem = cartaAtual as CartaOrdem;
                 return cOrdem.opcoes.map((op) => {
                    const isSelected = ordemSelecoes.includes(op.id); const selectionIndex = isSelected ? ordemSelecoes.indexOf(op.id) + 1 : null;
                    const correctIndex = Array.isArray(cOrdem.respostaCorreta) ? cOrdem.respostaCorreta.indexOf(op.id) + 1 : null;
                    const isCorrectOrder = respondido && isSelected && selectionIndex === correctIndex; const isWrongOrder = respondido && isSelected && selectionIndex !== correctIndex;
                    const isCorrectOptionOverall = respondido && correctIndex !== null;
                    let btnClass = "";
                    if (respondido) { if (isCorrectOrder) btnClass = "bg-green-100 border-green-400 text-green-900"; else if (isWrongOrder) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (isCorrectOptionOverall) btnClass = "opacity-70 border-gray-300"; else btnClass = "opacity-50"; }
                    else if (isSelected) { btnClass = "bg-blue-100 border-blue-500"; }
                    return ( <Button key={op.id} onClick={() => handleSelecaoOrdem(op.id)} variant={isSelected ? "secondary" : "outline"} className={cn("w-full justify-start text-left text-sm h-auto py-2 px-3 whitespace-normal", btnClass )} disabled={respondido}> {isSelected && !respondido && (<span className="mr-2 font-bold text-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-white ring-1 ring-blue-500">{selectionIndex}</span>)} <span className="flex-1">{op.texto}</span> {respondido && isCorrectOptionOverall && (<span className={`ml-2 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 ${ isCorrectOrder ? 'bg-green-500 text-white' : isWrongOrder ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}>{correctIndex}</span>)} {isWrongOrder && selectionIndex !== null && <span className="text-xs text-red-600 ml-1">(Sua: {selectionIndex})</span>} </Button> );
                });
            case "RelacionarColunas":
                const cRel = cartaAtual as CartaRelacionarColunas; return (<div className="flex space-x-2 md:space-x-4"> <div className="w-1/2 space-y-1.5"><p className="text-xs font-semibold text-center mb-1 text-gray-600">Coluna A</p>{cRel.colunaA.map(itemA => { const isSelectedA = selecaoColunaA === itemA.id; const par = paresFormados.find(p => p.aId === itemA.id); const parCorreto = respondido ? cRel.respostaCorreta.find(rc => rc.aId === itemA.id) : undefined; const isCorrectPair = respondido && par && parCorreto && par.bId === parCorreto.bId; const isWrongPair = respondido && par && (!parCorreto || par.bId !== parCorreto.bId); let btnClass = "border-gray-300"; if (isSelectedA) btnClass = "ring-2 ring-blue-500 border-blue-500"; if (par && !respondido) btnClass = "bg-gray-200 border-gray-400"; if (isCorrectPair) btnClass = "bg-green-100 border-green-400 text-green-900"; if (isWrongPair) btnClass = "bg-red-100 border-red-400 text-red-900"; return (<Button key={`A-${itemA.id}`} variant="outline" onClick={() => handleSelecionarColunaA(itemA.id)} disabled={respondido} className={cn("w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal", btnClass)}><span className="flex-1">{itemA.texto}</span>{isCorrectPair && <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-600 flex-shrink-0" />}{isWrongPair && <XCircle className="ml-1 h-3.5 w-3.5 text-red-600 flex-shrink-0" />}{isWrongPair && parCorreto && (<span className="text-[10px] ml-1 text-blue-600 hidden md:inline">({cRel.colunaB.find(iB => iB.id === parCorreto.bId)?.texto})</span>)}</Button>); })}</div> <div className="w-1/2 space-y-1.5"><p className="text-xs font-semibold text-center mb-1 text-gray-600">Coluna B</p>{cRel.colunaB.map(itemB => { const isPairedB = paresFormados.some(p => p.bId === itemB.id); const isDisabled = respondido || selecaoColunaA === null || isPairedB; let btnClass = "border-gray-300 hover:bg-gray-100"; if (isPairedB) btnClass = "bg-gray-200 border-gray-400 opacity-70"; return (<Button key={`B-${itemB.id}`} variant="outline" onClick={() => handleSelecionarColunaB(itemB.id)} disabled={isDisabled} className={cn("w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal", btnClass, !isDisabled && selecaoColunaA !== null && "hover:border-blue-400" )}><span className="flex-1">{itemB.texto}</span></Button>); })}</div></div>);
            case "PontoCerto":
                 const cPonto = cartaAtual as CartaPontoCerto; return (<div className="relative w-full max-w-md mx-auto aspect-video overflow-hidden rounded border border-gray-300 cursor-crosshair" onClick={handleImagemClick} role="button" aria-label={`Imagem interativa: ${cPonto.titulo}`}><img src={cPonto.imagemURL} alt={`Imagem para: ${cPonto.titulo}`} className={`block w-full h-full object-contain ${respondido ? 'cursor-not-allowed' : ''}`}/>{coordenadasClique && (<div className={`absolute w-3 h-3 rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2 ${respondido ? (mensagem.toLowerCase().includes('correto') ? 'bg-green-500 border-white' : 'bg-red-500 border-white') : 'bg-blue-500 border-white'}`} style={{ left: `${coordenadasClique.x * 100}%`, top: `${coordenadasClique.y * 100}%` }}>{respondido && (mensagem.toLowerCase().includes('correto') ? <Check className="w-2 h-2 text-white" /> : <XIcon className="w-2 h-2 text-white" />)}</div>)}{respondido && !mensagem.toLowerCase().includes('correto') && (() => { const zCor = cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta); return zCor ? (<div className="absolute border-2 border-dashed border-green-500 pointer-events-none" style={{ left: `${zCor.x * 100}%`, top: `${zCor.y * 100}%`, width: `${zCor.largura * 100}%`, height: `${zCor.altura * 100}%` }} title={zCor.descricao || "Área correta"}/>) : null; })()}</div>);
            case "CompletarFrase":
                const cComp = cartaAtual as CartaCompletarFrase; let fraseR = cComp.fraseIncompleta; fragmentosSelecionados.forEach((fragId, index) => { const frag = cComp.fragmentos.find(f => f.id === fragId); if (frag) { fraseR = fraseR.replace(`__${index + 1}__`, `<strong class="text-blue-600 underline underline-offset-2 mx-1">${frag.texto}</strong>`); } }); fraseR = fraseR.replace(/__\d+__/g, '<span class="text-gray-400 border-b border-dashed border-gray-400 mx-1">___</span>'); const isCorretoComp = respondido && mensagem.toLowerCase().includes('correto'); return (<div className="space-y-3"><div className={`p-3 border rounded bg-gray-50 text-sm ${respondido ? (isCorretoComp ? 'border-green-300' : 'border-red-300') : 'border-gray-300'}`} dangerouslySetInnerHTML={{ __html: fraseR }}/>{!respondido && (<div className="flex flex-wrap gap-2 justify-center">{cComp.fragmentos.filter(f => !fragmentosSelecionados.includes(f.id)).map(frag => (<Button key={frag.id} variant="outline" size="sm" onClick={() => handleSelecionarFragmento(frag.id)} className="bg-white hover:bg-blue-50">{frag.texto}</Button>))}{(fragmentosSelecionados.length > 0 && <Button variant="ghost" size="sm" onClick={limparFragmentos} className="text-red-500 hover:bg-red-100" title="Limpar"><RotateCcw className="h-4 w-4 mr-1"/> Limpar</Button>)}</div>)}{respondido && !isCorretoComp && (<div className="text-xs text-center text-green-700 mt-2"><strong>Resposta:</strong> {cComp.respostaCorreta.map(id => cComp.fragmentos.find(f => f.id === id)?.texto).join(' / ')}</div>)}</div>);
            default: return <p className="text-sm text-red-500">Erro: Tipo de carta não renderizado.</p>;
        }
    }

};

export default EcoChallenge;