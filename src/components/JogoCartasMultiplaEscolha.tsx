import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    CheckCircle2, XCircle, ThumbsUp, ThumbsDown, RotateCcw, HelpCircle,
    BookOpen, Home, SkipForward, Star, Award, MinusCircle, ChevronUp, ChevronDown, Zap, Filter, // Adicionado ChevronDown aqui
    Trash, EyeOff, Eye, Dice6, X as XIcon, Timer, Link2, MousePointerClick, Check, TextSelect,
    ChevronRight
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// --- Importar Decks ---
import manejoPlantadas from "./deck/cards_manejo_plantada";
import manejoNativas from "./deck/cards_manejo_nativa";
import ecologiaFlorestal from "./deck/cards_ecologia_florestal";
import estrelasAliens from "./dlc/cards_estrelas_aliens";
import testCards from "./.test/test_card";

// --- Tipos de Dados ---
interface Opcao { id: number; texto: string; }
interface CartaBase {
    id: string | number; tipo: string; titulo: string; pergunta: string;
    dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[];
    vantagem: string; desvantagem: string; dica: string;
    baralho?: string;
}
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
type Carta =
    | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras
    | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;

// --- Interfaces de Jogador e Jogo ---
interface Player {
    id: number; name: string; color: string; fixedStars: number; respostasCertas: number;
    respostasErradas: number; respostasSeguidas: number; progresso: number; pulosDisponiveis: number;
    contadorDeEstrelas: number; rodadasPreso: number; // Pode ser negativo
}
interface PlayerInput { id: number; name: string; color: string; showColorPicker?: boolean; }
const DEFAULT_BARALHO_NAME = "Padrão";
interface SourceInfo {
    id: string; name: string; type: 'builtin' | 'custom'; cards: Carta[];
    internalBaralhos: Record<string, number>; totalCards: number; active: boolean;
}
// Estado do Jogo (GameState)
interface GameState {
    players: Player[]; // Array de jogadores com seus estados completos
    currentPlayerId: number | null;
    categoriasSelecionadas: string[];
    ocultarCarta: boolean;
    probabilityIndex: number;
    jogoIniciado: boolean;
    activeSourceIds: string[]; // IDs das fontes usadas neste jogo
    activeInternalBaralhosState: Record<string, string[]>; // Baralhos internos ativos por fonte
}
// Estado da UI da Tela Inicial (Salvo separadamente)
interface TelaInicialUISettings {
    categoriasSelecionadas: string[];
    ocultarCarta: boolean;
    probabilityIndex: number;
    // Nota: Fontes e baralhos ativos são salvos em chaves separadas
}


// --- Constantes ---
const predefinedColors: string[] = [ "#9e0142","#f46d43","#fee08b","#66c2a5","#5e4fa2","#ff6699","#33a02c","#ff7f00", "#3288bd","#999999","#8dd3c7","#ffffb3","#fb8072","#80b1d3","#b3de69","#fccde5", "#bc80bd","#1f78b4","#e31a1c","#ffcc33","#6a3d9a","#b15928","#b2df8a","#cab2d6", "#a6cee3","#fb9a99","#fdbf6f","#ffed6f","#ccebc5","#ff4444", ];
const probabilitySettings = [ { value: 0, color: "#e5e7eb", label: "0%", textColor: "#1f2937" }, { value: 0.4, color: "#16a34a", label: "40%", textColor: "#ffffff" }, { value: 0.6, color: "#f97316", label: "60%", textColor: "#ffffff" }, { value: 0.8, color: "#dc2626", label: "80%", textColor: "#ffffff" }, ];
const tiposPergunta: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];
const tiposEspeciais: Carta['tipo'][] = ["Vantagem", "Desvantagem", "Outras"];
const LOCALSTORAGE_KEYS = {
    CUSTOM_SOURCES: "customSourceInfos",
    BUILTIN_STATUS: "builtInSourceStatus",
    ACTIVE_INTERNAL_BARALHOS: "activeInternalBaralhos",
    UI_SETTINGS: "ecoChallengeUISettings", // Chave para salvar/carregar categorias selecionadas, etc.
    GAME_STATE: "estadoEcoChallenge" // Chave para o estado do jogo salvo
};

// --- Carregamento Inicial e Estruturação ---
function processCardsAndExtractBaralhos(cards: Carta[]): { processedCards: Carta[], internalBaralhos: Record<string, number>, totalCards: number } {
    const baralhoCounts: Record<string, number> = {}; let totalCards = 0;
    const processedCards = cards.map((card, index) => {
        const uniqueId = card.id || `card_${Date.now()}_${index}_${Math.random().toString(16).slice(2)}`;
        const baralhoName = card.baralho?.trim() || DEFAULT_BARALHO_NAME;
        baralhoCounts[baralhoName] = (baralhoCounts[baralhoName] || 0) + 1; totalCards++;
        return { ...card, id: uniqueId, baralho: baralhoName };
    });
    const sortedBaralhoNames = Object.keys(baralhoCounts).sort((a, b) => {
        if (a === DEFAULT_BARALHO_NAME) return -1; if (b === DEFAULT_BARALHO_NAME) return 1;
        return a.localeCompare(b);
    });
    const sortedInternalBaralhos: Record<string, number> = {};
    sortedBaralhoNames.forEach(name => { sortedInternalBaralhos[name] = baralhoCounts[name]; });
    return { processedCards, internalBaralhos: sortedInternalBaralhos, totalCards };
}
const builtInSourcesData: Omit<SourceInfo, 'active' | 'internalBaralhos' | 'totalCards'>[] = [
    { id: "builtin-manejoPlantadas", name: "Manejo Plantadas", type: 'builtin', cards: manejoPlantadas as Carta[] },
    { id: "builtin-manejoNativas", name: "Manejo Nativas", type: 'builtin', cards: manejoNativas as Carta[] },
    { id: "builtin-ecologiaFlorestal", name: "Ecologia Florestal", type: 'builtin', cards: ecologiaFlorestal as Carta[] },
    { id: "builtin-estrelasAliens", name: "Estrelas & Aliens (DLC)", type: 'builtin', cards: estrelasAliens as Carta[] },
    { id: "builtin-testCards", name: "Test Cards", type: 'builtin', cards: testCards as Carta[] },
];
const initialBuiltInSources: SourceInfo[] = builtInSourcesData.map(source => {
    const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards);
    return { ...source, cards: processedCards, internalBaralhos: internalBaralhos, totalCards, active: true }; // Começa ativo por padrão
});

// --- Funções Utilitárias ---
function parseJSDeckFile(content: string): Carta[] {
    try {
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) { throw new Error("Array não encontrado."); }
        const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[];
        if (!Array.isArray(rawArray)) { throw new Error("Conteúdo não é array."); }
        return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_js_${Date.now()}_${index}_${Math.random().toString(16).slice(2)}` })) as Carta[];
    } catch (error: any) { console.error("Erro parse JS:", error); throw new Error(`Erro processar JS: ${error.message}`); }
}
function recalcularCategoriasAtivas( allSources: SourceInfo[], activeInternalBaralhos: Record<string, Set<string>> ): { categorias: string[], contagens: Record<string, number> } {
    const activeCards: Carta[] = []; const categoryCounts: Record<string, number> = {};
    allSources.forEach(source => { if (!source.active) return; const activeBaralhosForSource = activeInternalBaralhos[source.id]; if (!activeBaralhosForSource || activeBaralhosForSource.size === 0) return;
        source.cards.forEach(card => { if (activeBaralhosForSource.has(card.baralho || DEFAULT_BARALHO_NAME)) { activeCards.push(card); (card.categorias || []).forEach(cat => { categoryCounts[cat] = (categoryCounts[cat] || 0) + 1; }); } });
    });
    const categorias = Array.from(new Set(Object.keys(categoryCounts))).sort();
    return { categorias, contagens: categoryCounts };
}
function isClickInZone(clickCoords: { x: number; y: number } | null, zone: ZonaClicavel): boolean { if (!clickCoords) return false; const { x, y } = clickCoords; return (x >= zone.x && x <= zone.x + zone.largura && y >= zone.y && y <= zone.y + zone.altura); }

// --- Componente TelaInicial ---
interface TelaInicialProps {
    onStartGame: (gameState: Partial<GameState>, sourcesForGame: SourceInfo[]) => void;
    // Passa os dados do jogo salvo para inicializar a UI se necessário
    initialPlayers: Player[];
    initialOcultarCarta: boolean;
    initialProbabilityIndex: number;
    hasSavedGame: boolean;
}

const TelaInicial: React.FC<TelaInicialProps> = ({
    onStartGame, initialPlayers, initialOcultarCarta: initialOcultarCartaFromSave, // Renomeado para clareza
    initialProbabilityIndex: initialProbabilityIndexFromSave, hasSavedGame,
}) => {
    const [termoBuscaCategoria, setTermoBuscaCategoria] = useState("");
    // Estados da UI - Tentar carregar do localStorage primeiro, depois usar o do jogo salvo, senão default
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
    const [ocultarCarta, setOcultarCarta] = useState(initialOcultarCartaFromSave);
    const [probabilityIndex, setProbabilityIndex] = useState(initialProbabilityIndexFromSave);
    const [playerInputs, setPlayerInputs] = useState<PlayerInput[]>(() =>
        initialPlayers.length > 0
            ? initialPlayers.map((p, index) => ({ id: p.id ?? index, name: p.name, color: p.color, showColorPicker: false })) // Usa ID salvo se existir, senão index
            : [{ id: Date.now(), name: "", color: predefinedColors[0], showColorPicker: false }] // Novo jogador inicial
    );
    // Estados para gerenciamento de fontes/baralhos
    const [allSources, setAllSources] = useState<SourceInfo[]>([]);
    const [activeInternalBaralhos, setActiveInternalBaralhos] = useState<Record<string, Set<string>>>({});
    const [todasCategorias, setTodasCategorias] = useState<string[]>([]); // Categorias disponíveis GERAL
    const [categoriasAtivasComContagem, setCategoriasAtivasComContagem] = useState<Record<string, number>>({}); // Categorias dos baralhos ATIVOS
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());
    const [isClient, setIsClient] = useState(false);

    // Efeito para carregar TUDO (Fontes, Baralhos, UI Settings) do localStorage no cliente
    useEffect(() => {
        setIsClient(true); // Marca que estamos no cliente

        // 1. Carregar Fontes Customizadas
        const savedCustomRaw = localStorage.getItem(LOCALSTORAGE_KEYS.CUSTOM_SOURCES);
        let loadedCustomSources: SourceInfo[] = [];
        try { const parsedCustom = savedCustomRaw ? JSON.parse(savedCustomRaw) : []; loadedCustomSources = Array.isArray(parsedCustom) ? parsedCustom.map(s => ({...s, cards: Array.isArray(s.cards) ? s.cards : []})) : []; } catch (e) { console.error("Erro carregar customSourceInfos:", e); }
        const processedCustomSources = loadedCustomSources.map(source => { const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards || []); return { ...source, cards: processedCards, internalBaralhos, totalCards, type: 'custom' as const }; });

        // 2. Carregar Status das Fontes Built-in
        const savedBuiltInStatusRaw = localStorage.getItem(LOCALSTORAGE_KEYS.BUILTIN_STATUS);
        let loadedBuiltInStatus: Record<string, boolean> | null = null;
        try { loadedBuiltInStatus = savedBuiltInStatusRaw ? JSON.parse(savedBuiltInStatusRaw) : null; } catch (e) { console.error("Erro carregar builtInSourceStatus:", e); }
        const combinedSources = [ ...initialBuiltInSources.map(bs => ({...bs, active: loadedBuiltInStatus ? (loadedBuiltInStatus[bs.id] ?? true) : true})), ...processedCustomSources ];
        setAllSources(combinedSources);

        // 3. Carregar Baralhos Internos Ativos
        const savedActiveInternalRaw = localStorage.getItem(LOCALSTORAGE_KEYS.ACTIVE_INTERNAL_BARALHOS);
        let initialActiveBaralhosState: Record<string, Set<string>> = {};
        try { const parsedActiveInternal = savedActiveInternalRaw ? JSON.parse(savedActiveInternalRaw) : {}; Object.keys(parsedActiveInternal).forEach(sourceId => { if (Array.isArray(parsedActiveInternal[sourceId])) { initialActiveBaralhosState[sourceId] = new Set(parsedActiveInternal[sourceId]); } }); } catch (e) { console.error("Erro carregar activeInternalBaralhos:", e); }
        combinedSources.forEach(source => { if (!initialActiveBaralhosState[source.id]) { initialActiveBaralhosState[source.id] = new Set(Object.keys(source.internalBaralhos)); } else { const currentInternalBaralhoNames = Object.keys(source.internalBaralhos); const savedBaralhoSet = initialActiveBaralhosState[source.id]; /* currentInternalBaralhoNames.forEach(bName => {}); // Não precisa adicionar aqui */ savedBaralhoSet.forEach(savedBName => { if (!source.internalBaralhos[savedBName]) { savedBaralhoSet.delete(savedBName); }}); if (currentInternalBaralhoNames.length === 0) { savedBaralhoSet.clear(); } } });
        setActiveInternalBaralhos(initialActiveBaralhosState);

        // 4. Carregar Configurações da UI (Categorias, Ocultar, Probabilidade)
        const savedUISettingsRaw = localStorage.getItem(LOCALSTORAGE_KEYS.UI_SETTINGS);
        let loadedUISettings: Partial<TelaInicialUISettings> = {};
        try { loadedUISettings = savedUISettingsRaw ? JSON.parse(savedUISettingsRaw) : {}; } catch (e) { console.error("Erro carregar UI Settings:", e); }

        // Define os estados da UI usando: 1º localStorage, 2º Jogo Salvo, 3º Default
        setCategoriasSelecionadas(loadedUISettings.categoriasSelecionadas ?? initialCategoriasSelecionadas ?? []);
        setOcultarCarta(loadedUISettings.ocultarCarta ?? initialOcultarCartaFromSave ?? true); // Default true
        setProbabilityIndex(loadedUISettings.probabilityIndex ?? initialProbabilityIndexFromSave ?? 0); // Default 0

    }, []); // Roda apenas uma vez na montagem do cliente

    // Efeito para recalcular categorias ativas quando fontes/baralhos mudam
    useEffect(() => {
        if (isClient) {
            const { categorias, contagens } = recalcularCategoriasAtivas(allSources, activeInternalBaralhos);
            setTodasCategorias(categorias); // Atualiza lista de categorias disponíveis com base nos filtros
            setCategoriasAtivasComContagem(contagens); // Atualiza contagens
            // Mantém apenas as categorias selecionadas que AINDA SÃO VÁLIDAS
            setCategoriasSelecionadas((prev) => prev.filter(cat => categorias.includes(cat)));
        }
    }, [allSources, activeInternalBaralhos, isClient]);

    // Efeito para salvar Fontes, Baralhos e Configurações da UI no localStorage
    useEffect(() => {
        if (isClient) {
            // 1. Salvar Fontes Customizadas
            const customSourcesToSave = allSources.filter(s => s.type === 'custom');
            localStorage.setItem(LOCALSTORAGE_KEYS.CUSTOM_SOURCES, JSON.stringify(customSourcesToSave));

            // 2. Salvar Status das Fontes Built-in
            const builtInStatusToSave: Record<string, boolean> = {};
            allSources.filter(s => s.type === 'builtin').forEach(s => { builtInStatusToSave[s.id] = s.active; });
            localStorage.setItem(LOCALSTORAGE_KEYS.BUILTIN_STATUS, JSON.stringify(builtInStatusToSave));

            // 3. Salvar Baralhos Internos Ativos
            const serializableActiveInternal = Object.entries(activeInternalBaralhos).reduce((acc, [key, valueSet]) => { acc[key] = Array.from(valueSet); return acc; }, {} as Record<string, string[]>);
            localStorage.setItem(LOCALSTORAGE_KEYS.ACTIVE_INTERNAL_BARALHOS, JSON.stringify(serializableActiveInternal));

            // 4. Salvar Configurações da UI
            const uiSettings: TelaInicialUISettings = {
                categoriasSelecionadas: categoriasSelecionadas,
                ocultarCarta: ocultarCarta,
                probabilityIndex: probabilityIndex,
            };
            localStorage.setItem(LOCALSTORAGE_KEYS.UI_SETTINGS, JSON.stringify(uiSettings));
        }
    }, [allSources, activeInternalBaralhos, categoriasSelecionadas, ocultarCarta, probabilityIndex, isClient]); // Salva sempre que algo relevante mudar

    // --- Handlers ---
    const handleCustomDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; if (!files) return; setIsLoading(true); setErrorMessage(null); let newCustomSources: SourceInfo[] = []; let errors: string[] = [];
        for (let i = 0; i < files.length; i++) { const file = files[i]; const content = await file.text(); try { let loadedCards: Carta[] = []; const sourceName = file.name.replace(/\.(js|json)$/, ""); const sourceId = `custom_${Date.now()}_${i}_${Math.random().toString(16).slice(2)}`; if (allSources.some(s => s.name === sourceName && s.type === 'custom')) { errors.push(`Fonte "${sourceName}" já carregada.`); continue; } if (file.name.endsWith(".js")) { loadedCards = parseJSDeckFile(content); } else if (file.name.endsWith(".json")) { const raw = JSON.parse(content) as any[]; if (!Array.isArray(raw)) throw new Error("JSON não é array."); loadedCards = raw.map((card, index) => ({ ...card, id: card.id || `${sourceId}_card_${index}_${Math.random().toString(16).slice(2)}` })) as Carta[]; } else { errors.push(`Formato não suportado: ${file.name}.`); continue; } if (loadedCards.length === 0) { errors.push(`Nenhuma carta em "${sourceName}".`); continue; } const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(loadedCards); newCustomSources.push({ id: sourceId, name: sourceName, type: 'custom', cards: processedCards, internalBaralhos, totalCards, active: true }); } catch (error: any) { errors.push(`Erro ao ler ${file.name}: ${error.message}`); } }
        if (newCustomSources.length > 0) { setAllSources(prev => [...prev, ...newCustomSources]); setActiveInternalBaralhos(prev => { const newState = { ...prev }; newCustomSources.forEach(source => { newState[source.id] = new Set(Object.keys(source.internalBaralhos)); }); return newState; }); setExpandedSources(prev => { const newSet = new Set(prev); newCustomSources.forEach(s => newSet.add(s.id)); return newSet; }); } if (errors.length > 0) { setErrorMessage(errors.join("\n")); } setIsLoading(false); e.target.value = '';
    };
    const toggleSourceActive = (sourceId: string) => { setAllSources(prev => prev.map(s => s.id === sourceId ? { ...s, active: !s.active } : s)); };
    const removeSource = (sourceId: string) => { const sourceToRemove = allSources.find(s => s.id === sourceId); if (!sourceToRemove || sourceToRemove.type !== 'custom') return; if (window.confirm(`Remover fonte "${sourceToRemove.name}"?`)) { setAllSources(prev => prev.filter(s => s.id !== sourceId)); setActiveInternalBaralhos(prev => { const newState = { ...prev }; delete newState[sourceId]; return newState; }); setExpandedSources(prev => { const newSet = new Set(prev); newSet.delete(sourceId); return newSet; }); } };
    const toggleInternalBaralhoActive = (sourceId: string, baralhoName: string) => { setActiveInternalBaralhos(prev => { const currentSourceSet = prev[sourceId] ? new Set(prev[sourceId]) : new Set<string>(); if (currentSourceSet.has(baralhoName)) { currentSourceSet.delete(baralhoName); } else { currentSourceSet.add(baralhoName); } return { ...prev, [sourceId]: currentSourceSet }; }); };
    const toggleExpandSource = (sourceId: string) => { setExpandedSources(prev => { const newSet = new Set(prev); if (newSet.has(sourceId)) { newSet.delete(sourceId); } else { newSet.add(sourceId); } return newSet; }); };
    const addPlayerInput = () => { if (playerInputs.length < 8) { setPlayerInputs([...playerInputs, { id: Date.now(), name: "", color: predefinedColors[playerInputs.length % predefinedColors.length], showColorPicker: false, }]); } };
    const handlePlayerChange = (id: number, field: "name" | "color", value: string) => { setPlayerInputs(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p)); };
    const toggleColorPicker = (id: number) => { setPlayerInputs(prev => prev.map(p => p.id === id ? { ...p, showColorPicker: !p.showColorPicker } : { ...p, showColorPicker: false })); };
    const deletePlayer = (id: number) => { if (playerInputs.length > 1) { setPlayerInputs((prev) => prev.filter((p) => p.id !== id)); } else { setErrorMessage("É necessário pelo menos um jogador."); setTimeout(() => setErrorMessage(null), 3000); } };

    const handleStartGame = (continueGame = false) => {
        let gameStateToPass: Partial<GameState>; let sourcesForGame: SourceInfo[] = [];
        if (!isClient) { alert("Aguarde inicialização."); return; }
        // Valida se há pelo menos um jogador *com nome*
        const namedPlayers = playerInputs.filter(p => p.name.trim());
        if (namedPlayers.length === 0) { alert("Adicione e nomeie pelo menos um jogador."); return; }
        const activeSources = allSources.filter(s => s.active); if (activeSources.length === 0) { alert("Nenhuma Fonte ativa."); return; }
        const anyInternalDeckActive = activeSources.some(source => activeInternalBaralhos[source.id]?.size > 0); if (!anyInternalDeckActive) { alert("Nenhum baralho interno ativo."); return; }
        const { categorias: finalCategoriasDisponiveis } = recalcularCategoriasAtivas(allSources, activeInternalBaralhos);
        const finalCategoriasSelecionadas = categoriasSelecionadas.filter(cat => finalCategoriasDisponiveis.includes(cat)); if (finalCategoriasSelecionadas.length === 0) { alert("Nenhuma categoria selecionada/disponível."); return; }
        const finalActiveCards = activeSources.flatMap(source => { const activeBaralhosSet = activeInternalBaralhos[source.id]; if (!activeBaralhosSet || activeBaralhosSet.size === 0) return []; return source.cards.filter(card => activeBaralhosSet.has(card.baralho || DEFAULT_BARALHO_NAME) && card.categorias?.some(cat => finalCategoriasSelecionadas.includes(cat))); }); if (finalActiveCards.length === 0) { alert("Nenhuma carta encontrada."); return; }
        sourcesForGame = activeSources; const activeInternalBaralhosStateForSave = Object.entries(activeInternalBaralhos).filter(([sourceId]) => sourcesForGame.some(s => s.id === sourceId)).reduce((acc, [key, valueSet]) => { acc[key] = Array.from(valueSet); return acc; }, {} as Record<string, string[]>);

        if (continueGame && hasSavedGame && typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem(LOCALSTORAGE_KEYS.GAME_STATE);
            try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                    // Usa estado salvo, mas atualiza configurações da UI e fontes/baralhos ativos
                    gameStateToPass = {
                        ...savedState, // Mantém players, currentPlayerId, progresso etc.
                        categoriasSelecionadas: finalCategoriasSelecionadas, // Usa as categorias da UI atual revalidadas
                        ocultarCarta: ocultarCarta, // Usa UI atual
                        probabilityIndex: probabilityIndex, // Usa UI atual
                        activeSourceIds: sourcesForGame.map(s => s.id), // Usa fontes ativas atuais
                        activeInternalBaralhosState: activeInternalBaralhosStateForSave, // Usa baralhos ativos atuais
                        jogoIniciado: true,
                    };
                    console.log("Continuando jogo:", gameStateToPass);
                } else { console.warn("Jogo salvo inválido. Iniciando novo."); return handleStartGame(false); }
            } catch (e) { console.error("Erro carregar jogo:", e); return handleStartGame(false); }
        } else {
            // Inicia NOVO jogo - USA os players da UI atual (namedPlayers)
            const initializedPlayers: Player[] = namedPlayers.map((input, index) => ({
                id: index, // IDs sequenciais para novo jogo
                name: input.name.trim(),
                color: input.color || predefinedColors[index % predefinedColors.length],
                fixedStars: 0, respostasCertas: 0, respostasErradas: 0, respostasSeguidas: 0,
                progresso: 0, pulosDisponiveis: 0, contadorDeEstrelas: 0, rodadasPreso: 0
            }));
            gameStateToPass = {
                players: initializedPlayers, // Usa os players da UI
                currentPlayerId: initializedPlayers[0]?.id ?? null,
                categoriasSelecionadas: finalCategoriasSelecionadas,
                ocultarCarta: ocultarCarta,
                probabilityIndex: probabilityIndex,
                activeSourceIds: sourcesForGame.map(s => s.id),
                activeInternalBaralhosState: activeInternalBaralhosStateForSave,
                jogoIniciado: true
            };
            console.log("Iniciando novo jogo:", gameStateToPass);
        }
        onStartGame(gameStateToPass, sourcesForGame);
    };
    const categoriasFiltradasParaExibicao = useMemo(() => { return Object.entries(categoriasAtivasComContagem).filter(([categoria]) => categoria.toLowerCase().includes(termoBuscaCategoria.toLowerCase())).sort(([catA], [catB]) => catA.localeCompare(catB)); }, [categoriasAtivasComContagem, termoBuscaCategoria]);
    const cycleProbability = () => { setProbabilityIndex((prevIndex) => (prevIndex + 1) % probabilitySettings.length); };
    const builtInSourcesUI = allSources.filter(s => s.type === 'builtin');
    const customSourcesUI = allSources.filter(s => s.type === 'custom');
    if (!isClient) { return null; }

    // --- JSX da Tela Inicial ---
    return (
        <Card className="w-full max-w-lg mx-auto mt-8 mb-8 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-700">Eco Challenge</CardTitle>
                <p className="text-sm text-center text-gray-600">O Jogo da Sustentabilidade</p>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Gerenciamento de Fontes/Baralhos */}
                <div className="space-y-4">
                    {/* Incluídos */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Baralhos Incluídos</h3>
                        <ScrollArea className="h-40 border rounded-md p-2 bg-gray-100 space-y-2">
                            {builtInSourcesUI.length > 0 ? builtInSourcesUI.map((source) => (
                                <div key={source.id} className="border-b last:border-b-0 pb-2 mb-2 bg-white px-2 py-1.5 rounded shadow-sm">
                                    {/* ... (renderização da fonte built-in - sem mudanças) ... */}
                                     <div className="flex items-center space-x-2">
                                        <Checkbox id={`source-${source.id}`} checked={source.active} onCheckedChange={() => toggleSourceActive(source.id)} aria-label={`Ativar/desativar ${source.name}`} className="mt-1 flex-shrink-0"/>
                                        <button onClick={() => toggleExpandSource(source.id)} className="flex items-center flex-1 text-left cursor-pointer min-w-0 group" aria-expanded={expandedSources.has(source.id)} aria-controls={`baralhos-${source.id}`}>
                                            {expandedSources.has(source.id) ? <ChevronDown className="h-4 w-4 mr-1.5 shrink-0 text-gray-500 group-hover:text-gray-700"/> : <ChevronRight className="h-4 w-4 mr-1.5 shrink-0 text-gray-500 group-hover:text-gray-700"/>}
                                            <label htmlFor={`source-${source.id}`} className="text-sm font-medium cursor-pointer truncate flex-1 group-hover:text-blue-700" title={`${source.name} (${source.totalCards} cartas)`}>
                                                {source.name} <span className="text-gray-500">({source.totalCards})</span>
                                            </label>
                                        </button>
                                    </div>
                                    {source.active && expandedSources.has(source.id) && (
                                        <div id={`baralhos-${source.id}`} className="pl-7 mt-1.5 space-y-1">
                                            {Object.entries(source.internalBaralhos).length > 0 ? Object.entries(source.internalBaralhos).map(([baralhoName, count]) => (
                                                <div key={`${source.id}-${baralhoName}`} className="flex items-center space-x-2">
                                                    <Checkbox id={`baralho-${source.id}-${baralhoName}`} checked={activeInternalBaralhos[source.id]?.has(baralhoName) ?? false} onCheckedChange={() => toggleInternalBaralhoActive(source.id, baralhoName)} aria-label={`Ativar/desativar ${baralhoName}`} className="flex-shrink-0"/>
                                                    <label htmlFor={`baralho-${source.id}-${baralhoName}`} className="text-xs cursor-pointer text-gray-700 hover:text-black" title={`${baralhoName} (${count} cartas)`}>
                                                        {baralhoName} <span className="text-gray-500">({count})</span>
                                                    </label>
                                                </div>
                                            )) : ( <p className="text-xs italic text-gray-500 pl-1">Nenhum baralho interno.</p> )}
                                        </div>
                                    )}
                                </div>
                            )) : ( <p className="text-sm text-gray-500 italic p-2">Nenhum baralho incluído.</p> )}
                        </ScrollArea>
                    </div>
                    {/* Carregados */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Baralhos Carregados</h3>
                        {errorMessage && ( <Alert variant="destructive" className="text-xs mb-2 py-1.5 px-3"><AlertDescription>{errorMessage}</AlertDescription></Alert> )}
                        <Input type="file" multiple accept=".js,.json" onChange={handleCustomDeckUpload} disabled={isLoading} className="text-sm h-9 mb-2 w-full" aria-label="Carregar baralhos"/>
                        {isLoading && <p className="text-xs text-blue-600 mb-2 ml-1">Carregando...</p>}
                        {customSourcesUI.length > 0 ? (
                            <ScrollArea className="h-40 border rounded-md p-2 bg-gray-100 space-y-2">
                                {customSourcesUI.map((source) => (
                                    <div key={source.id} className="border-b last:border-b-0 pb-2 mb-2 bg-white px-2 py-1.5 rounded shadow-sm">
                                       {/* ... (renderização da fonte customizada - sem mudanças) ... */}
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id={`source-${source.id}`} checked={source.active} onCheckedChange={() => toggleSourceActive(source.id)} aria-label={`Ativar/desativar ${source.name}`} className="mt-1 flex-shrink-0"/>
                                            <button onClick={() => toggleExpandSource(source.id)} className="flex items-center flex-1 text-left cursor-pointer min-w-0 group" aria-expanded={expandedSources.has(source.id)} aria-controls={`baralhos-${source.id}`}>
                                                {expandedSources.has(source.id) ? <ChevronDown className="h-4 w-4 mr-1.5 shrink-0 text-gray-500 group-hover:text-gray-700"/> : <ChevronRight className="h-4 w-4 mr-1.5 shrink-0 text-gray-500 group-hover:text-gray-700"/>}
                                                <label htmlFor={`source-${source.id}`} className="text-sm font-medium cursor-pointer truncate flex-1 group-hover:text-blue-700" title={`${source.name} (${source.totalCards} cartas)`}>
                                                    {source.name} <span className="text-gray-500">({source.totalCards})</span>
                                                </label>
                                            </button>
                                            <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500 hover:bg-red-100 shrink-0" onClick={(e) => { e.stopPropagation(); removeSource(source.id); }} aria-label={`Remover ${source.name}`} title={`Remover ${source.name}`}>
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {source.active && expandedSources.has(source.id) && (
                                            <div id={`baralhos-${source.id}`} className="pl-7 mt-1.5 space-y-1">
                                                {Object.entries(source.internalBaralhos).length > 0 ? Object.entries(source.internalBaralhos).map(([baralhoName, count]) => (
                                                    <div key={`${source.id}-${baralhoName}`} className="flex items-center space-x-2">
                                                        <Checkbox id={`baralho-${source.id}-${baralhoName}`} checked={activeInternalBaralhos[source.id]?.has(baralhoName) ?? false} onCheckedChange={() => toggleInternalBaralhoActive(source.id, baralhoName)} aria-label={`Ativar/desativar ${baralhoName}`} className="flex-shrink-0"/>
                                                        <label htmlFor={`baralho-${source.id}-${baralhoName}`} className="text-xs cursor-pointer text-gray-700 hover:text-black" title={`${baralhoName} (${count} cartas)`}>
                                                            {baralhoName} <span className="text-gray-500">({count})</span>
                                                        </label>
                                                    </div>
                                                )) : ( <p className="text-xs italic text-gray-500 pl-1">Nenhum baralho interno.</p> )}
                                            </div>
                                        )}
                                   </div>
                                ))}
                           </ScrollArea>
                        ) : ( !isLoading && <p className="text-sm text-gray-500 italic p-2 border rounded bg-gray-100 text-center">Nenhum arquivo carregado.</p> )}
                   </div>
                </div>

                {/* Seleção de Categorias */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">Categorias <span className="text-sm font-normal text-gray-600">(dos baralhos ativos)</span></h3>
                    <Input type="text" placeholder="Pesquisar Categoria..." value={termoBuscaCategoria} onChange={(e) => setTermoBuscaCategoria(e.target.value)} className="w-full p-2 border rounded h-9" aria-label="Pesquisar categorias"/>
                    <ScrollArea className="h-40 border rounded-md p-3 bg-gray-50">
                        {categoriasFiltradasParaExibicao.length > 0 ? (
                            categoriasFiltradasParaExibicao.map(([categoria, count]) => (
                                <div key={categoria} className="flex items-center space-x-2 mb-1 hover:bg-gray-100 p-1 rounded group">
                                    <Checkbox id={`cat-${categoria}`} checked={categoriasSelecionadas.includes(categoria)} onCheckedChange={() => { setCategoriasSelecionadas((prev) => prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria]); }} aria-label={`Selecionar ${categoria}`}/>
                                    <label htmlFor={`cat-${categoria}`} className="text-sm cursor-pointer flex-1 group-hover:text-blue-700" title={`${categoria} (${count} cartas)`}>
                                        {categoria} <span className="text-gray-500">({count})</span>
                                    </label>
                                </div>
                            ))
                        ) : ( <p className="text-sm text-gray-500 italic text-center pt-4">Nenhuma categoria disponível.</p> )}
                    </ScrollArea>
                    <div className="flex space-x-2 mt-2">
                        <Button onClick={() => setCategoriasSelecionadas(todasCategorias)} variant="outline" size="sm" className="flex-1" disabled={todasCategorias.length === 0} title="Selecionar todas">Todas ({todasCategorias.length})</Button>
                        <Button onClick={() => setCategoriasSelecionadas([])} variant="outline" size="sm" className="flex-1" title="Desselecionar todas">Nenhuma</Button>
                    </div>
                </div>

                {/* Configuração de Jogadores */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Jogadores</h3>
                    {/* ScrollArea para a lista de jogadores */}
                    <ScrollArea className="max-h-60 space-y-2 pr-2 border rounded-md bg-gray-50 p-2">
                        {playerInputs.map((player, index) => (
                            <div key={player.id} className="border p-3 rounded-md shadow-sm bg-white relative">
                                <div className="flex items-center space-x-2">
                                    <Input type="text" placeholder={`Jogador ${index + 1}`} value={player.name} maxLength={15} onChange={(e) => handlePlayerChange(player.id, "name", e.target.value)} className="flex-grow h-8 text-sm" aria-label={`Nome Jogador ${index + 1}`}/>
                                    <Button variant="outline" size="icon" className="w-8 h-8 flex-shrink-0 border-2" onClick={() => toggleColorPicker(player.id)} style={{ backgroundColor: player.color }} aria-label="Selecionar cor"/>
                                    <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-red-500 hover:bg-red-100" onClick={() => deletePlayer(player.id)} aria-label="Remover jogador" title="Remover Jogador" disabled={playerInputs.length <= 1}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                {player.showColorPicker && (
                                    <div className="absolute z-20 mt-2 right-12 w-48 bg-white border rounded-md shadow-lg p-2 grid grid-cols-6 gap-1">
                                        {predefinedColors.map((color, idx) => (
                                            <button key={idx} aria-label={`Selecionar cor ${color}`} style={{ backgroundColor: color }} className={cn('w-6 h-6 rounded border hover:ring-2 hover:ring-offset-1 hover:ring-gray-500', player.color === color ? 'ring-2 ring-offset-1 ring-black' : 'border-gray-300')} onClick={() => { handlePlayerChange(player.id, "color", color); toggleColorPicker(player.id); }}/>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                    {playerInputs.length < 8 && ( <Button onClick={addPlayerInput} variant="secondary" className="w-full mt-1 h-9">+ Adicionar Jogador</Button> )}
                </div>

                {/* Opções de Jogo */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Opções</h3>
                    <Button onClick={() => setOcultarCarta(!ocultarCarta)} variant="outline" className="w-full flex items-center justify-center space-x-2 h-9" title={ocultarCarta ? "Desativar ocultar carta" : "Ativar ocultar carta"}>
                        {ocultarCarta ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{ocultarCarta ? "Ocultar Carta Ativado" : "Ocultar Carta Desativado"}</span>
                    </Button>
                    <Button onClick={cycleProbability} className="w-full flex items-center justify-center space-x-2 h-9" style={{ backgroundColor: probabilitySettings[probabilityIndex].color, color: probabilitySettings[probabilityIndex].textColor, border: `1px solid ${probabilitySettings[probabilityIndex].textColor === '#ffffff' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)'}` }} title={`Probabilidade de excluir especiais. Atual: ${probabilitySettings[probabilityIndex].label}`}>
                        <span>% Excluir Especiais:</span>
                        <span className="font-bold">{probabilitySettings[probabilityIndex].label}</span>
                    </Button>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 pt-6 border-t">
                {hasSavedGame && ( <Button onClick={() => handleStartGame(true)} className="w-full bg-blue-600 hover:bg-blue-700 h-10" disabled={isLoading}>Continuar Jogo Salvo</Button> )}
                <Button onClick={() => handleStartGame(false)} className="w-full bg-green-600 hover:bg-green-700 h-10" disabled={isLoading}>{hasSavedGame ? "Iniciar Novo Jogo" : "Iniciar Jogo"}</Button>
            </CardFooter>
        </Card>
    );
};


// --- Componente Principal EcoChallenge ---
const EcoChallenge: React.FC = () => {
    // --- Estados do Jogo ---
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [currentGameSources, setCurrentGameSources] = useState<SourceInfo[]>([]);
    const [cartaAtual, setCartaAtual] = useState<Carta | null>(null);
    const [respondido, setRespondido] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [mostrarDica, setMostrarDica] = useState(false);
    const [dicaUsada, setDicaUsada] = useState(false);
    const [mostrarFontes, setMostrarFontes] = useState(false);
    const [opcoesEliminadas, setOpcoesEliminadas] = useState<number[]>([]);
    const [cartaRevelada, setCartaRevelada] = useState(false);
    const [noCardsAvailable, setNoCardsAvailable] = useState(false);
    // --- Estados de Resposta Específica ---
    const [selecionado, setSelecionado] = useState<number | null>(null);
    const [selecoesMultiplas, setSelecoesMultiplas] = useState<number[]>([]);
    const [ordemSelecoes, setOrdemSelecoes] = useState<number[]>([]);
    const [tempoRestante, setTempoRestante] = useState<number | null>(null);
    const [selecaoColunaA, setSelecaoColunaA] = useState<number | null>(null);
    const [paresFormados, setParesFormados] = useState<{ aId: number; bId: number }[]>([]);
    const [coordenadasClique, setCoordenadasClique] = useState<{ x: number; y: number } | null>(null);
    const [fragmentosSelecionados, setFragmentosSelecionados] = useState<number[]>([]);
    // --- Estados de UI/Extras ---
    const [mostrarSomentePerguntas, setMostrarSomentePerguntas] = useState(false); // Não usado no filtro
    const [rolledNumber, setRolledNumber] = useState<number | null>(null);
    const [rollingNumber, setRollingNumber] = useState<number | null>(null);
    const [isDieModalOpen, setIsDieModalOpen] = useState(false);
    const [isRolling, setIsRolling] = useState(false);
    const [isClientReady, setIsClientReady] = useState(false);
    // --- Refs ---
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

    // --- Funções de Gerenciamento ---
    const handleGameStart = useCallback((initialGameState?: Partial<GameState>, sourcesForGame?: SourceInfo[]) => {
        console.log("EcoChallenge: handleGameStart", { initialGameState, sourcesForGame });
        if (initialGameState && initialGameState.jogoIniciado && sourcesForGame && sourcesForGame.length > 0) {
            // Recebe estado e fontes, reseta estado da rodada
            setGameState(initialGameState as GameState);
            setCurrentGameSources(sourcesForGame);
            setCartaAtual(null); setNoCardsAvailable(false); setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setMostrarFontes(false); setOpcoesEliminadas([]); setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null); setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]); setRolledNumber(null); setIsDieModalOpen(false);
            setCartaRevelada(!(initialGameState.ocultarCarta ?? true));
            console.log("Jogo iniciado/continuado com sucesso. Jogadores:", initialGameState.players); // Log dos jogadores
        } else if (initialGameState && initialGameState.jogoIniciado && initialGameState.activeSourceIds) {
             // Fallback para reconstruir fontes se não foram passadas (menos ideal)
             console.warn("Reconstruindo fontes (fallback)...");
             if (typeof window !== "undefined") {
                 // ... (lógica de reconstrução - mantida) ...
             } else { /* ... */ }
        } else { console.error("handleGameStart sem dados válidos."); setGameState(null); setCurrentGameSources([]); }
     }, []); // Dependência vazia

    const updateGameState = useCallback((newState: Partial<GameState>) => {
        setGameState(prev => { if (!prev) return null; const updatedState = { ...prev, ...newState }; if (typeof window !== "undefined") { try { localStorage.setItem(LOCALSTORAGE_KEYS.GAME_STATE, JSON.stringify(updatedState)); } catch (e) { console.error("Erro ao salvar estado:", e); } } return updatedState; });
    }, []); // Dependência vazia

    const updateCurrentPlayer = useCallback((partialPlayerData: Partial<Player>) => {
        if (!gameState || gameState.currentPlayerId === null) return;
        // Garante que o ID do jogador a ser atualizado existe
        const playerExists = gameState.players.some(p => p.id === gameState.currentPlayerId);
        if (!playerExists) {
            console.error(`Jogador com ID ${gameState.currentPlayerId} não encontrado para atualização.`);
            return;
        }
        const updatedPlayers = gameState.players.map(p =>
            p.id === gameState.currentPlayerId ? { ...p, ...partialPlayerData } : p
        );
        updateGameState({ players: updatedPlayers });
    }, [gameState, updateGameState]); // Depende de gameState e updateGameState

    useEffect(() => { setIsClientReady(true); }, []);

    // --- Lógica de Seleção de Carta ---
    const selecionarCartaAleatoria = useCallback(() => {
        console.log("Selecionando carta...");
        if (!gameState || currentGameSources.length === 0) { console.error("Impossível selecionar: gameState/currentGameSources ausentes."); setNoCardsAvailable(true); setCartaAtual(null); return; }
        const { categoriasSelecionadas, probabilityIndex, activeInternalBaralhosState } = gameState;
        if (!activeInternalBaralhosState) { console.error("activeInternalBaralhosState ausente."); setNoCardsAvailable(true); setCartaAtual(null); return; }
        const probabilidadeExcluirEspecial = probabilitySettings[probabilityIndex].value; const incluirCartasEspeciais = probabilidadeExcluirEspecial === 0 || Math.random() >= probabilidadeExcluirEspecial;
        const cartasFiltradas = currentGameSources.flatMap(source => { const activeBaralhosArray = activeInternalBaralhosState[source.id]; if (!activeBaralhosArray || activeBaralhosArray.length === 0) return []; const activeBaralhoSet = new Set(activeBaralhosArray);
            return source.cards.filter(card => {
                const baralhoAtivo = activeBaralhoSet.has(card.baralho || DEFAULT_BARALHO_NAME); if (!baralhoAtivo) return false;
                const categoriaValida = card.categorias?.some(cat => categoriasSelecionadas.includes(cat)); if (!categoriaValida) return false;
                const isTipoEspecial = tiposEspeciais.includes(card.tipo); if (!incluirCartasEspeciais && isTipoEspecial) return false;
                if (mostrarSomentePerguntas && !tiposPergunta.includes(card.tipo)) return false;
                return true;
            });
        });
        console.log(`Cartas filtradas: ${cartasFiltradas.length}`);
        if (cartasFiltradas.length === 0) { setNoCardsAvailable(true); setCartaAtual(null); setMensagem("Nenhuma carta encontrada com os filtros atuais!"); console.warn("Nenhuma carta encontrada."); return; }
        setNoCardsAvailable(false); const idxAleat = Math.floor(Math.random() * cartasFiltradas.length); const novaCarta = cartasFiltradas[idxAleat]; setCartaAtual(novaCarta); console.log("Nova carta:", novaCarta);
        setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setMostrarFontes(false); setOpcoesEliminadas([]); setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null); setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]); setRolledNumber(null); setIsDieModalOpen(false); setCartaRevelada(!gameState.ocultarCarta);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (novaCarta.tipo === "ContraTempo") { setTempoRestante(novaCarta.tempoLimite); console.log(`Timer ContraTempo: ${novaCarta.tempoLimite}s`); }
    }, [gameState, currentGameSources, mostrarSomentePerguntas]); // Dependências principais

    // Efeito para selecionar a primeira carta
    useEffect(() => {
        // Adiciona uma verificação extra `gameState.players.length > 0`
        if (gameState?.jogoIniciado && gameState.players.length > 0 && currentGameSources.length > 0 && !cartaAtual && !noCardsAvailable) {
            console.log("Selecionando primeira carta (ou após reset)...");
            selecionarCartaAleatoria();
        }
    }, [gameState?.jogoIniciado, gameState?.players, currentGameSources, cartaAtual, noCardsAvailable, selecionarCartaAleatoria]); // Adicionada dependência gameState.players

     // Efeito do Timer ContraTempo
    useEffect(() => {
        if (cartaAtual?.tipo === "ContraTempo" && tempoRestante !== null && tempoRestante > 0 && !respondido && gameState?.jogoIniciado && cartaRevelada) {
            timerIntervalRef.current = setInterval(() => {
                setTempoRestante((prev) => {
                    if (prev === null || prev <= 1) {
                        clearInterval(timerIntervalRef.current!); timerIntervalRef.current = null; console.log("Tempo esgotado!"); setRespondido(true); const penalidade = cartaAtual.dificuldade === 'dificil' ? 15 : 10;
                        setMensagem(`Tempo esgotado! ${cartaAtual.desvantagem || 'Tente novamente.'}`);
                        // Usa setGameState para atualizar de forma segura
                        setGameState(currentGameState => {
                           if (!currentGameState || currentGameState.currentPlayerId === null) return currentGameState;
                           const updatedPlayers = currentGameState.players.map(p => p.id === currentGameState.currentPlayerId ? { ...p, respostasErradas: p.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(0, p.progresso - penalidade) } : p );
                           const finalState = { ...currentGameState, players: updatedPlayers };
                           // Salva estado após atualização
                           if (typeof window !== "undefined") { localStorage.setItem(LOCALSTORAGE_KEYS.GAME_STATE, JSON.stringify(finalState)); }
                           return finalState;
                       }); return 0;
                    } return prev - 1;
                });
            }, 1000);
        } else if (timerIntervalRef.current && (respondido || tempoRestante === 0 || !cartaRevelada || !gameState?.jogoIniciado)) {
            console.log("Limpando timer ContraTempo."); clearInterval(timerIntervalRef.current); timerIntervalRef.current = null;
        }
        return () => { if (timerIntervalRef.current) { console.log("Limpando timer na desmontagem."); clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
    }, [cartaAtual, tempoRestante, respondido, gameState?.jogoIniciado, cartaRevelada, gameState?.currentPlayerId]); // Dependências revisadas


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
        if (!cartaAtual || !gameState || !gameState.players || gameState.currentPlayerId === null || respondido) return;
        const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId); if (!currentPlayer) return;
        let cor = false; let pontosGanhos = 20; let pontosPerdidos = 10; let darPuloDificil = false; let mensagemFinal = ""; let aplicarEfeitoPadrao = false;
        if (cartaAtual.tipo === "ContraTempo" && timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
        // ... (lógica switch case para verificar cada tipo - mantida como antes) ...
         switch (cartaAtual.tipo) {
            case "Pergunta": case "ContraTempo": if (cartaAtual.tipo === "ContraTempo" && tempoRestante !== null && tempoRestante <= 0) { cor = false; mensagemFinal = mensagem || `Tempo esgotado! ${cartaAtual.desvantagem || ''}`; } else { cor = selecionado === cartaAtual.respostaCorreta; } aplicarEfeitoPadrao = true; break;
            case "MultiplaEscolha": cor = Array.isArray(cartaAtual.respostaCorreta) && selecoesMultiplas.length === cartaAtual.respostaCorreta.length && selecoesMultiplas.every(sel => cartaAtual.respostaCorreta.includes(sel)) && cartaAtual.respostaCorreta.every(res => selecoesMultiplas.includes(res)); if (cor) pontosGanhos = 25; aplicarEfeitoPadrao = true; break;
            case "Ordem": cor = Array.isArray(cartaAtual.respostaCorreta) && ordemSelecoes.length === cartaAtual.respostaCorreta.length && ordemSelecoes.toString() === cartaAtual.respostaCorreta.toString(); if (cor) pontosGanhos = 30; darPuloDificil = cor; aplicarEfeitoPadrao = true; break;
            case "RelacionarColunas": if (!Array.isArray(cartaAtual.respostaCorreta) || !Array.isArray(cartaAtual.colunaA) || !Array.isArray(cartaAtual.colunaB)) { cor = false; break; } const paresFormadosStr = paresFormados.map(p => `${p.aId}-${p.bId}`).sort().join(','); const paresCorretosStr = cartaAtual.respostaCorreta.map(p => `${p.aId}-${p.bId}`).sort().join(','); cor = paresFormados.length === cartaAtual.respostaCorreta.length && paresFormadosStr === paresCorretosStr; if (cor) pontosGanhos = 30; darPuloDificil = cor; aplicarEfeitoPadrao = true; break;
            case "PontoCerto": if (!coordenadasClique || !Array.isArray(cartaAtual.zonasClicaveis)) { cor = false; break; } const zonaCorreta = cartaAtual.zonasClicaveis.find(z => z.id === cartaAtual.respostaCorreta); cor = zonaCorreta ? isClickInZone(coordenadasClique, zonaCorreta) : false; if (cor) pontosGanhos = 25; darPuloDificil = cor; aplicarEfeitoPadrao = true; break;
            case "CompletarFrase": if (!Array.isArray(cartaAtual.respostaCorreta) || !Array.isArray(cartaAtual.fragmentos)) { cor = false; break; } cor = fragmentosSelecionados.length === cartaAtual.respostaCorreta.length && fragmentosSelecionados.toString() === cartaAtual.respostaCorreta.toString(); if (cor) pontosGanhos = 25; darPuloDificil = cor; aplicarEfeitoPadrao = true; break;
            case "Vantagem": cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado); if (selecionado === null) { mensagemFinal = "Nenhuma opção selecionada."; } else { mensagemFinal = cor ? (cartaAtual.vantagem || "Vantagem aplicada!") : "Opção inválida."; } aplicarEfeitoPadrao = false; break; // TODO: Efeitos Vantagem
            case "Desvantagem": cor = false; mensagemFinal = cartaAtual.desvantagem || "Desvantagem aplicada."; aplicarEfeitoPadrao = false; break; // TODO: Efeitos Desvantagem
            case "Outras": cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado); if (selecionado === null) { mensagemFinal = "Nenhuma opção selecionada."; } else { mensagemFinal = cor ? (cartaAtual.vantagem || 'Ok!') : (cartaAtual.desvantagem || 'Hmm...'); } aplicarEfeitoPadrao = false; break; // TODO: Efeitos Outras
            default: const _exhaustiveCheck: never = cartaAtual; console.error("Tipo não tratado:", _exhaustiveCheck); return;
        }
        setRespondido(true);
        if (aplicarEfeitoPadrao) {
            // Ajusta pontos baseado na dificuldade
            if (cartaAtual.dificuldade === 'facil') { pontosGanhos *= 0.8; pontosPerdidos *= 0.8; } if (cartaAtual.dificuldade === 'dificil') { pontosGanhos *= 1.2; pontosPerdidos *= 1.2; } pontosGanhos = Math.round(pontosGanhos); pontosPerdidos = Math.round(pontosPerdidos);
            if (cor) { // Acertou
                const novoProgresso = Math.min(100, currentPlayer.progresso + pontosGanhos); const completouBarra = novoProgresso >= 100; const pulosGanhosBase = completouBarra ? 1 : 0; const pulosGanhosExtra = darPuloDificil ? 1 : 0; const estrelasFixasGanhsa = completouBarra ? 1 : 0;
                updateCurrentPlayer({ respostasCertas: currentPlayer.respostasCertas + 1, respostasSeguidas: currentPlayer.respostasSeguidas + 1, progresso: completouBarra ? 0 : novoProgresso, pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + pulosGanhosBase + pulosGanhosExtra, 2), fixedStars: currentPlayer.fixedStars + estrelasFixasGanhsa, });
                mensagemFinal = `Correto! ${cartaAtual.vantagem || ''}${completouBarra ? ' Barra completa! (+1 Estrela Fixa, +1 Pulo)' : ''}${!completouBarra && pulosGanhosExtra > 0 ? ' (+1 Pulo)' : ''}`;
            } else { // Errou
                updateCurrentPlayer({ respostasErradas: currentPlayer.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(0, currentPlayer.progresso - pontosPerdidos), });
                let detalheErro = ""; if (cartaAtual.tipo === 'Pergunta' && 'respostaCorreta' in cartaAtual && 'opcoes' in cartaAtual) { const opCorreta = cartaAtual.opcoes.find(o => o.id === cartaAtual.respostaCorreta); if (opCorreta) detalheErro = ` Correto: ${opCorreta.texto}.`; } else if (cartaAtual.tipo === 'MultiplaEscolha' && Array.isArray(cartaAtual.respostaCorreta) && 'opcoes' in cartaAtual) { const opsCorretas = cartaAtual.opcoes.filter(o => cartaAtual.respostaCorreta.includes(o.id)).map(o => o.texto).join(', '); if (opsCorretas) detalheErro = ` Correto: ${opsCorretas}.`; }
                mensagemFinal = mensagemFinal || `Incorreto. ${cartaAtual.desvantagem || ''}${detalheErro}`;
            }
        }
        setMensagem(mensagemFinal.trim());
    };

    // --- Ações do Jogador ---
    const resetarContadoresJogador = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; if (window.confirm(`Resetar TODAS as estatísticas de ${cp.name}?`)) { updateCurrentPlayer({ respostasCertas: 0, respostasErradas: 0, progresso: 0, pulosDisponiveis: 0, respostasSeguidas: 0, rodadasPreso: 0, contadorDeEstrelas: 0, fixedStars: 0 }); setMensagem(`${cp.name} resetado.`); } };
    const toggleDica = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return; if (dicaUsada) { setMensagem("Dica já usada."); return; } if (!cartaAtual.dica) { setMensagem("Carta sem dica."); return; } if (cp.respostasSeguidas >= 2) { setMostrarDica(true); setDicaUsada(true); updateCurrentPlayer({ respostasSeguidas: cp.respostasSeguidas - 2 }); setMensagem("Dica revelada! (-2 Seguidos)"); } else { setMensagem("Necessário 2 acertos seguidos."); } };
    const toggleFontes = () => { if (!cartaAtual || (gameState?.ocultarCarta && !cartaRevelada)) return; if (cartaAtual.fontes && cartaAtual.fontes.length > 0) { setMostrarFontes(!mostrarFontes); if (!mostrarFontes) setMensagem("Fontes exibidas."); else setMensagem(""); } else { setMensagem("Nenhuma fonte disponível."); } };
    const pularPergunta = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return; if (!tiposPergunta.includes(cartaAtual.tipo)) { setMensagem("Não pode pular este tipo."); return; } if (cp.pulosDisponiveis > 0) { updateCurrentPlayer({ pulosDisponiveis: cp.pulosDisponiveis - 1 }); setMensagem("Carta pulada!"); setTimeout(() => selecionarCartaAleatoria(), 600); } else { setMensagem("Sem pulos disponíveis."); } };
    const eliminarRespostaErrada = () => {
        const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return;
        const tiposEliminaveis: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "ContraTempo", "Outras"]; if (!tiposEliminaveis.includes(cartaAtual.tipo) || !('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes)) { setMensagem("Não pode eliminar opções."); return; }
        const opcoesAtivas = cartaAtual.opcoes.filter(op => !opcoesEliminadas.includes(op.id)); if (opcoesAtivas.length <= 2) { setMensagem("Não pode eliminar mais."); return; } if (cp.respostasSeguidas < 2) { setMensagem("Necessário 2 acertos seguidos."); return; }
        let respostaCorretaIds: number[] = []; if ('respostaCorreta' in cartaAtual) { if (Array.isArray(cartaAtual.respostaCorreta)) { respostaCorretaIds = cartaAtual.respostaCorreta.filter(id => typeof id === 'number'); } else if (typeof cartaAtual.respostaCorreta === 'number') { respostaCorretaIds = [cartaAtual.respostaCorreta]; } }
        const opcoesErradasDisp = cartaAtual.opcoes.filter(op => !respostaCorretaIds.includes(op.id) && !opcoesEliminadas.includes(op.id));
        if (opcoesErradasDisp.length > 0) { const idxAleat = Math.floor(Math.random() * opcoesErradasDisp.length); const opcaoEliminadaId = opcoesErradasDisp[idxAleat].id; setOpcoesEliminadas((prev) => [...prev, opcaoEliminadaId]); updateCurrentPlayer({ respostasSeguidas: cp.respostasSeguidas - 2 }); setMensagem("Opção incorreta eliminada! (-2 Seguidos)"); } else { setMensagem("Não há mais incorretas para eliminar."); }
    };
    const voltarTelaInicial = () => { if (window.confirm("Voltar para Tela Inicial? Seu progresso será salvo.")) { setGameState(null); setCartaAtual(null); setNoCardsAvailable(false); setRespondido(false); setMensagem(""); setCurrentGameSources([]); } };
    // --- Ajustes Manuais ---
    const diminuirAcertos = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ respostasCertas: Math.max(0, cp.respostasCertas - 1) }); setMensagem("Acerto removido."); };
    const diminuirErros = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ respostasErradas: Math.max(0, cp.respostasErradas - 1) }); setMensagem("Erro removido."); };
    const incrementarContadorDeEstrelas = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ contadorDeEstrelas: cp.contadorDeEstrelas + 1 }); setMensagem("Estrela bônus adicionada."); };
    const diminuirContadorDeEstrelas = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ contadorDeEstrelas: Math.max(0, cp.contadorDeEstrelas - 1) }); setMensagem("Estrela bônus removida."); };
    const incrementarRodadasPreso = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ rodadasPreso: cp.rodadasPreso + 1 }); setMensagem("Rodada preso adicionada."); };
    const diminuirRodadasPreso = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ rodadasPreso: cp.rodadasPreso - 1 }); setMensagem("Rodada preso removida."); }; // Permite negativo

    // --- Dado e Long Press ---
    const rolarDado = () => { if (isRolling) return; setIsRolling(true); setIsDieModalOpen(true); setRolledNumber(null); setRollingNumber(Math.floor(Math.random() * 6) + 1); let rollCount = 0; const maxRolls = 15; const rollInterval = setInterval(() => { setRollingNumber(Math.floor(Math.random() * 6) + 1); rollCount++; if (rollCount >= maxRolls) { clearInterval(rollInterval); const finalNumber = Math.floor(Math.random() * 6) + 1; setRolledNumber(finalNumber); setRollingNumber(null); setIsRolling(false); } }, 80); };
    const handleLongPressStart = (action: () => void) => { console.log("Long press start..."); longPressTimeout.current = setTimeout(() => { console.log("Long press timeout - Rolar Dado!"); rolarDado(); }, 700); };
    const handleLongPressEnd = () => { if (longPressTimeout.current) { console.log("Long press end/cancel."); clearTimeout(longPressTimeout.current); longPressTimeout.current = null; } };

    // --- Renderização ---
    if (!isClientReady) { return <div className="flex items-center justify-center min-h-screen"><p>Carregando...</p></div>; }
    // Se não há estado de jogo, renderiza a TelaInicial
    if (!gameState) {
        let hasSaved = false; let initialPlayersData: Player[] = []; let initialOcultar = true; let initialProb = 0;
        if (typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem(LOCALSTORAGE_KEYS.GAME_STATE);
            try { const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null; if (savedState && savedState.jogoIniciado) { hasSaved = true; initialPlayersData = Array.isArray(savedState.players) ? savedState.players : []; initialOcultar = savedState.ocultarCarta ?? true; initialProb = savedState.probabilityIndex ?? 0; } } catch(e) { console.error("Erro ler estado salvo:", e); }
        }
        return ( <TelaInicial onStartGame={handleGameStart} initialPlayers={initialPlayersData} initialOcultarCarta={initialOcultar} initialProbabilityIndex={initialProb} hasSavedGame={hasSaved} /> );
    }
    // Se o jogo está ativo, mas dados estão faltando (temporariamente)
    const { players, currentPlayerId, ocultarCarta: isCartaOculta } = gameState;
    const currentPlayer = players.find(p => p.id === currentPlayerId);
    if (noCardsAvailable) { return ( <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center"><Card className="p-6 shadow-lg max-w-sm"><CardHeader><CardTitle className="text-xl text-red-600">Sem Cartas!</CardTitle></CardHeader><CardContent><p className="mb-4">Nenhuma carta encontrada.</p><p className="text-sm text-gray-600 mb-4">Ajuste filtros/baralhos na tela inicial.</p></CardContent><CardFooter><Button onClick={voltarTelaInicial} className="w-full">Voltar</Button></CardFooter></Card></div> ); }
    if (!cartaAtual || !currentPlayer) { return ( <div className="flex flex-col items-center justify-center min-h-screen"><p className="mb-4">Carregando...</p><Button onClick={voltarTelaInicial} variant="outline">Voltar (Forçar)</Button></div> ); }

    // --- Definições para Renderização ---
    const obterEstiloCarta = () => { if (isCartaOculta && !cartaRevelada) return "border-gray-400 bg-gray-100"; switch (cartaAtual.tipo) { case "Vantagem": return "border-green-500 bg-green-50"; case "Desvantagem": return "border-red-500 bg-red-50"; case "Outras": return "border-blue-500 bg-blue-50"; case "ContraTempo": return "border-yellow-500 bg-yellow-50"; default: return "border-gray-300 bg-white"; } };
    const isVerificarDisabled = () => { if (respondido) return true; if (isCartaOculta && !cartaRevelada) return true; switch (cartaAtual.tipo) { case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras": return selecionado === null; case "MultiplaEscolha": return selecoesMultiplas.length === 0; case "Ordem": return !('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || ordemSelecoes.length !== cartaAtual.opcoes.length; case "RelacionarColunas": return !('respostaCorreta' in cartaAtual) || !Array.isArray(cartaAtual.respostaCorreta) || paresFormados.length !== cartaAtual.respostaCorreta.length; case "PontoCerto": return coordenadasClique === null; case "CompletarFrase": return !('respostaCorreta' in cartaAtual) || !Array.isArray(cartaAtual.respostaCorreta) || fragmentosSelecionados.length !== cartaAtual.respostaCorreta.length; default: return true; } };
    const getAlertVariant = (): "default" | "destructive" => { if (!mensagem) return "default"; const lowerMsg = mensagem.toLowerCase(); if (lowerMsg.includes('incorreto') || lowerMsg.includes('desvantagem') || lowerMsg.includes('tempo esgotado') || lowerMsg.includes('erro')) return "destructive"; if (lowerMsg.includes('correto') || lowerMsg.includes('vantagem') || lowerMsg.includes('barra completa')) return "default"; return "default"; };
    const isInfoAlert = !mensagem.toLowerCase().includes('correto') && !mensagem.toLowerCase().includes('vantagem') && !mensagem.toLowerCase().includes('barra completa') && !mensagem.toLowerCase().includes('incorreto') && !mensagem.toLowerCase().includes('desvantagem') && !mensagem.toLowerCase().includes('tempo esgotado') && !mensagem.toLowerCase().includes('erro') && cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem';

    // --- JSX Principal ---
    return (
        <div className="flex flex-col items-center p-2 md:p-4 min-h-screen bg-gradient-to-b from-green-50 to-blue-100 font-sans">
            {/* Card Principal */}
            <Card
                className={cn("w-full max-w-lg mx-auto mt-4 mb-6 shadow-xl border-2 rounded-lg transition-all duration-300", obterEstiloCarta())}
                style={players.length > 0 && currentPlayer && !(isCartaOculta && !cartaRevelada) ? { boxShadow: `0 0 15px 3px ${currentPlayer.color}` } : {}}
            >
                {/* CardHeader */}
                <CardHeader className="pb-3">
                    {/* Título, Categoria, Dificuldade */}
                    <div className="flex justify-between items-start mb-2 gap-2">
                        <div className="flex-1 min-w-0 pr-2">
                            <CardTitle className="text-lg md:text-xl font-bold leading-tight truncate" title={isCartaOculta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo}>
                                {isCartaOculta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo}
                            </CardTitle>
                            {(!isCartaOculta || cartaRevelada) && (
                                <p className="text-xs text-gray-500 mt-1 truncate" title={(cartaAtual.categorias ? cartaAtual.categorias.join(", ") : 'Sem Categoria') + (cartaAtual.baralho && cartaAtual.baralho !== DEFAULT_BARALHO_NAME ? ` (Baralho: ${cartaAtual.baralho})` : '')}>
                                    {cartaAtual.categorias && cartaAtual.categorias.length > 0 ? cartaAtual.categorias.join(", ") : <span className="italic">Sem Categoria</span>}
                                    {cartaAtual.baralho && cartaAtual.baralho !== DEFAULT_BARALHO_NAME && (<span className="ml-1 font-medium text-gray-600">({cartaAtual.baralho})</span>)}
                                </p>
                            )}
                        </div>
                        {(!isCartaOculta || cartaRevelada) && (
                            <Badge variant={ cartaAtual.dificuldade === "facil" ? "secondary" : cartaAtual.dificuldade === "normal" ? "default" : "destructive" } className="capitalize flex-shrink-0 h-6 px-2.5 text-xs">
                                {cartaAtual.dificuldade}
                            </Badge>
                        )}
                    </div>
                    {/* Timer */}
                    {cartaAtual.tipo === "ContraTempo" && tempoRestante !== null && !respondido && cartaRevelada && (
                        <div className="mt-2">
                            <Progress value={(tempoRestante / cartaAtual.tempoLimite) * 100} className="h-2 [&>*]:bg-yellow-500 transition-all duration-1000 linear"/>
                            <p className="text-center text-sm font-semibold text-yellow-700 mt-1"><Timer className="inline h-4 w-4 mr-1" /> Tempo: {tempoRestante}s</p>
                        </div>
                    )}
                    {/* Pergunta / Placeholder */}
                    {(!isCartaOculta || cartaRevelada) ? (
                        <ScrollArea className="h-64 md:h-72 rounded-md border p-3 mt-2 bg-white/80 shadow-inner">
                            <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-blockquote:my-1 prose-img:my-2 prose-img:rounded prose-img:border prose-a:text-blue-600 hover:prose-a:text-blue-800" dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta || '<p class="italic text-gray-500">Sem pergunta.</p>' }}/>
                        </ScrollArea>
                    ) : (
                        <div className="h-64 md:h-72 flex flex-col items-center justify-center space-y-3 rounded-md border p-3 mt-2 bg-gray-200 border-gray-300">
                            <EyeOff className="h-10 w-10 text-gray-500" />
                            <p className="text-base font-medium text-gray-700">Carta Oculta</p>
                            {rolledNumber !== null && <p className="text-xl font-bold">Dado: {rolledNumber}</p>}
                            <Button onClick={rolarDado} variant="outline" size="sm" className="mt-3 bg-white shadow" onMouseDown={() => handleLongPressStart(rolarDado)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart(rolarDado)} onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}>
                                <Dice6 className="h-4 w-4 mr-1.5" /> Rolar Dado
                            </Button>
                        </div>
                    )}
                </CardHeader>

                {/* CardContent */}
                {(!isCartaOculta || cartaRevelada) && (
                    <CardContent className="pt-0 pb-4">
                        <div className="space-y-2">
                            {renderizarConteudoResposta()}
                        </div>
                        {mostrarDica && cartaAtual.dica && (
                            <Alert variant="default" className="mt-4 bg-blue-50 border-blue-300 text-blue-800"><HelpCircle className="h-4 w-4 text-blue-700" /><AlertDescription className="text-sm ml-2"><strong>Dica:</strong> {cartaAtual.dica}</AlertDescription></Alert>
                        )}
                        {mostrarFontes && cartaAtual.fontes && cartaAtual.fontes.length > 0 && (
                            <Alert variant="default" className="mt-4 bg-gray-50 border-gray-300"><BookOpen className="h-4 w-4 text-gray-700" /><AlertDescription className="text-sm ml-2 text-gray-800"><strong>Fontes:</strong><ul className="list-disc list-inside mt-1 text-xs space-y-0.5">{cartaAtual.fontes.map((fonte, idx) => (<li key={idx}>{fonte}</li>))}</ul></AlertDescription></Alert>
                        )}
                    </CardContent>
                )}

                {/* CardFooter */}
                <CardFooter className="flex flex-col items-center pt-4 border-t bg-gray-50/50 rounded-b-lg">
                    {/* Botões Ação Primários */}
                    <div className="flex flex-wrap justify-center gap-1.5 w-full mb-3">
                        <Button onClick={toggleFontes} variant="outline" size="icon" disabled={!cartaAtual.fontes || cartaAtual.fontes.length === 0 || (isCartaOculta && !cartaRevelada)} className="h-9 w-9" title={mostrarFontes ? "Ocultar Fontes" : "Mostrar Fontes"}> <BookOpen className="h-5 w-5" /> </Button>
                        <Button onClick={pularPergunta} variant={currentPlayer.pulosDisponiveis > 0 ? "secondary" : "outline"} size="icon" disabled={currentPlayer.pulosDisponiveis === 0 || !tiposPergunta.includes(cartaAtual.tipo) || respondido || (isCartaOculta && !cartaRevelada)} className="h-9 w-9" title={`Pular (${currentPlayer.pulosDisponiveis} restantes)`}> <SkipForward className="h-5 w-5" /> </Button>
                        <Button onClick={toggleDica} variant={currentPlayer.respostasSeguidas >= 2 && !dicaUsada && !!cartaAtual.dica ? "secondary" : "outline"} size="icon" disabled={dicaUsada || !cartaAtual.dica || respondido || (isCartaOculta && !cartaRevelada) || currentPlayer.respostasSeguidas < 2} className="h-9 w-9" title={dicaUsada ? "Dica usada" : !cartaAtual.dica ? "Sem dica" : currentPlayer.respostasSeguidas < 2 ? "Necessário 2 seguidos" : "Usar Dica (-2)"}> <HelpCircle className="h-5 w-5" /> </Button>
                        <Button onClick={eliminarRespostaErrada} variant={currentPlayer.respostasSeguidas >= 2 ? "secondary" : "outline"} size="icon" disabled={ respondido || (isCartaOculta && !cartaRevelada) || !["Pergunta", "MultiplaEscolha", "ContraTempo", "Outras"].includes(cartaAtual.tipo) || !('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || cartaAtual.opcoes.filter(op => !opcoesEliminadas.includes(op.id)).length <= 2 || currentPlayer.respostasSeguidas < 2 } className="h-9 w-9" title={currentPlayer.respostasSeguidas < 2 ? "Necessário 2 seguidos" : "Eliminar Opção (-2)"}> <MinusCircle className="h-5 w-5" /> </Button>
                        <Button onClick={resetarContadoresJogador} variant="outline" size="icon" className="h-9 w-9 text-orange-600 hover:bg-orange-100" title={`Resetar ${currentPlayer.name}`}> <RotateCcw className="h-5 w-5" /> </Button>
                        <Button onClick={voltarTelaInicial} variant="outline" size="icon" className="h-9 w-9 text-indigo-600 hover:bg-indigo-100" title="Voltar (Salva jogo)"> <Home className="h-5 w-5" /> </Button>
                    </div>
                    {/* Botões Ajuste Manual - CORRIGIDO ORDEM E ÍCONES */}
                    <div className="flex flex-wrap justify-center gap-1.5 w-full mb-3 p-2 border rounded-md bg-gray-100 shadow-inner">
                         {/* - Rodada */}
                        <Button onClick={diminuirRodadasPreso} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Rodada Preso (-1)">
                            <ChevronDown className="h-5 w-5 text-purple-600" /> {/* Ícone h-5 */}
                        </Button>
                         {/* + Rodada */}
                        <Button onClick={incrementarRodadasPreso} variant="outline" size="icon" className="h-8 w-8" title="Aumentar Rodada Preso (+1)">
                            <ChevronUp className="h-5 w-5 text-purple-600" /> {/* Ícone h-5 */}
                        </Button>
                         {/* - Estrela */}
                        <Button onClick={diminuirContadorDeEstrelas} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Estrela Bônus (-1)">
                            <Star className="h-5 w-5 text-red-500 fill-current" /> {/* Ícone h-5, vermelho e preenchido */}
                        </Button>
                         {/* + Estrela */}
                        <Button onClick={incrementarContadorDeEstrelas} variant="outline" size="icon" className="h-8 w-8" title="Aumentar Estrela Bônus (+1)">
                            <Star className="h-5 w-5 text-yellow-500 fill-current" /> {/* Ícone h-5 */}
                        </Button>
                         {/* - Certa */}
                        <Button onClick={diminuirAcertos} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Acertos (-1)">
                            <ThumbsUp className="h-5 w-5 text-green-600 transform scale-x-[-1]" /> {/* Ícone h-5 */}
                        </Button>
                         {/* - Errada */}
                        <Button onClick={diminuirErros} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Erros (-1)">
                            <ThumbsDown className="h-5 w-5 text-red-600 transform scale-x-[-1]" /> {/* Ícone h-5 */}
                        </Button>
                    </div>
                    {/* Botão Principal */}
                    <div className="w-full mb-3">
                        {isCartaOculta && !cartaRevelada ? (
                            <Button onClick={() => setCartaRevelada(true)} className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold">
                                <Eye className="mr-2 h-5 w-5"/> Revelar Carta
                            </Button>
                        ) : !respondido ? (
                            <Button
                                onClick={isVerificarDisabled() ? undefined : verificarResposta}
                                className={cn( "w-full h-10 text-base font-semibold text-white", isVerificarDisabled() ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700" )}
                                onMouseDown={() => handleLongPressStart(verificarResposta)}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(verificarResposta)}
                                onTouchEnd={handleLongPressEnd}
                                onTouchCancel={handleLongPressEnd}
                                aria-disabled={isVerificarDisabled()}
                                tabIndex={isVerificarDisabled() ? -1 : 0}
                            >
                                <Check className="mr-2 h-5 w-5"/> Verificar
                            </Button>
                        ) : (
                            <Button onClick={selecionarCartaAleatoria} className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold" onMouseDown={() => handleLongPressStart(selecionarCartaAleatoria)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart(selecionarCartaAleatoria)} onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}>
                                <SkipForward className="mr-2 h-5 w-5"/> Próxima Carta
                            </Button>
                        )}
                    </div>
                    {/* Mensagem Feedback */}
                    {mensagem && ( <Alert variant={getAlertVariant()} className={cn( 'text-center text-sm font-semibold mb-3 w-full py-2 px-3 shadow-sm', cartaAtual?.tipo === 'Vantagem' && 'bg-green-100 border-green-300 text-green-800', cartaAtual?.tipo === 'Desvantagem' && 'bg-red-100 border-red-300 text-red-800', cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'default' && isInfoAlert && 'bg-blue-100 border-blue-300 text-blue-800', cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'default' && !isInfoAlert && 'bg-green-100 border-green-300 text-green-800', cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'destructive' && 'bg-red-100 border-red-300 text-red-800' )}> <AlertDescription>{mensagem}</AlertDescription> </Alert> )}
                    {/* Progresso e Stats */}
                    <div className="w-full border-t pt-3 mt-1">
                        <Progress value={currentPlayer.progresso} className="h-2.5 [&>*]:bg-orange-500 mb-2" />
                         <div className="flex justify-between items-center w-full text-xs sm:text-sm text-gray-700 flex-wrap gap-x-3 gap-y-1 font-medium">
                             <span className="flex items-center" title="Rodadas Preso"><ChevronUp className="h-4 w-4 text-purple-500 mr-0.5"/>{currentPlayer.rodadasPreso}</span>
                             <span className="flex items-center" title="Estrelas Fixas"><Award className="h-4 w-4 text-yellow-600 mr-0.5"/>{currentPlayer.fixedStars}</span>
                             <span className="flex items-center" title="Estrelas Bônus"><Star className="h-4 w-4 text-yellow-500 mr-0.5"/>{currentPlayer.contadorDeEstrelas}</span>
                             <span className="flex items-center" title="Pulos Disponíveis"><SkipForward className="h-4 w-4 text-blue-500 mr-0.5"/>{currentPlayer.pulosDisponiveis}</span>
                             <span className="flex items-center" title="Respostas Corretas"><ThumbsUp className="h-4 w-4 text-green-500 mr-0.5"/>{currentPlayer.respostasCertas}</span>
                             <span className="flex items-center" title="Respostas Erradas"><ThumbsDown className="h-4 w-4 text-red-500 mr-0.5"/>{currentPlayer.respostasErradas}</span>
                             <span className="flex items-center" title="Acertos Seguidos"><Zap className="h-4 w-4 text-orange-500 mr-0.5"/>{currentPlayer.respostasSeguidas}</span>
                         </div>
                    </div>
                </CardFooter>
            </Card>

            {/* Seleção de Jogador */}
            <div className="mt-4 w-full max-w-lg px-1">
                 {/* Verifica se 'players' existe antes de tentar acessar */}
                 {gameState && gameState.players && gameState.players.length > 0 && currentPlayer ? (
                    <>
                        <p className="text-center text-sm font-medium mb-2 text-gray-800">Vez de: <span style={{ color: currentPlayer.color }} className="font-bold">{currentPlayer.name}</span></p>
                         <div className={cn('grid gap-2', players.length <= 2 ? 'grid-cols-2' : players.length <= 4 ? 'grid-cols-4' : players.length <= 6 ? 'grid-cols-3' : 'grid-cols-4' )}>
                            {players.map((pl) => (
                                <Button key={pl.id} onClick={() => updateGameState({ currentPlayerId: pl.id })} size="sm" variant={currentPlayerId === pl.id ? "default" : "outline"} className={cn( "truncate text-xs sm:text-sm h-9 font-medium transition-all duration-150", currentPlayerId === pl.id ? 'text-white ring-2 ring-offset-1 ring-black/50' : 'hover:bg-gray-100' )} style={{ backgroundColor: currentPlayerId === pl.id ? pl.color : 'white', color: currentPlayerId === pl.id ? 'white' : pl.color, borderColor: pl.color, borderWidth: currentPlayerId === pl.id ? '2px' : '1px', }} title={`Mudar para ${pl.name}`}>
                                     {pl.name}
                                 </Button>
                             ))}
                         </div>
                     </>
                ) : (
                     <p className="text-center text-sm text-red-500">Erro: Jogadores não carregados.</p>
                 )}
            </div>

            {/* Modal do Dado */}
            {isDieModalOpen && ( <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm"><div className="bg-white p-6 rounded-lg shadow-xl text-center relative w-64 h-64 flex flex-col justify-center items-center border-4 border-gray-300"><Button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" variant="ghost" size="icon" onClick={() => setIsDieModalOpen(false)} disabled={isRolling} aria-label="Fechar dado"><XIcon className="h-6 w-6" /></Button>{isRolling ? ( <> <p className="text-lg mb-4 font-semibold text-gray-700">Rolando...</p><p className="text-7xl font-bold mb-6 text-blue-600 animate-bounce">{rollingNumber}</p><div className="h-10"></div> </> ) : ( <> <p className="text-lg mb-2 font-semibold text-gray-700">Resultado:</p><p className="text-8xl font-bold mb-4 text-green-700">{rolledNumber}</p><Button onClick={rolarDado} size="lg" variant="secondary" className="mt-2"><Dice6 className="h-5 w-5 mr-2" /> Rolar Novamente</Button> </> )}</div></div> )}
        </div>
    );

    // --- Função Renderizar Conteúdo da Resposta ---
    function renderizarConteudoResposta() {
        if (!cartaAtual) return null;
        const buttonInlineStyle: React.CSSProperties = { maxHeight: "90px", height: "auto", overflowY: "auto", whiteSpace: "normal", lineHeight: "1.4", display: "flex", alignItems: "center", textAlign: "left", };
        switch (cartaAtual.tipo) {
            // ... (cases para cada tipo de carta - mantidos como antes) ...
            case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras": if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Opções inválidas.</p>; } return cartaAtual.opcoes.map((op: Opcao) => { const isCorrect = Array.isArray(cartaAtual.respostaCorreta) ? cartaAtual.respostaCorreta.includes(op.id) : cartaAtual.respostaCorreta === op.id; const isSelected = selecionado === op.id; const isEliminated = opcoesEliminadas.includes(op.id); const isWrongSelection = respondido && isSelected && !isCorrect; let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400"; if (respondido) { if (isCorrect) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; else if (isSelected) btnClass = "bg-red-100 border-red-400 text-red-900"; else btnClass = "border-gray-300 text-gray-500 opacity-70"; } else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300"; } if (isEliminated) { btnClass = "line-through opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-500"; } return ( <Button key={op.id} onClick={() => handleSelecao(op.id)} variant={"outline"} className={cn( "w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150", btnClass )} style={buttonInlineStyle} disabled={isEliminated || respondido} aria-pressed={isSelected}> {!respondido && !isEliminated && ( <span className={cn( "flex-shrink-0 w-4 h-4 rounded-full border-2 mr-2.5", isSelected ? "bg-blue-600 border-blue-700" : "border-gray-400 bg-white" )}></span> )} <span className="flex-1">{op.texto}</span> {isCorrect && respondido && <CheckCircle2 className="ml-2 h-5 w-5 text-green-600 flex-shrink-0" />} {isWrongSelection && <XCircle className="ml-2 h-5 w-5 text-red-600 flex-shrink-0" />} </Button> ); });
             case "MultiplaEscolha": if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || !Array.isArray(cartaAtual.respostaCorreta)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; } return cartaAtual.opcoes.map((op: Opcao) => { const isCorrect = cartaAtual.respostaCorreta.includes(op.id); const isSelected = selecoesMultiplas.includes(op.id); const isEliminated = opcoesEliminadas.includes(op.id); const isWrongSelection = respondido && isSelected && !isCorrect; const missedCorrect = respondido && isCorrect && !isSelected; let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400"; if (respondido) { if (isCorrect && isSelected) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; else if (isWrongSelection) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (missedCorrect) btnClass = "bg-blue-100 border-blue-400 text-blue-800"; else btnClass = "border-gray-300 text-gray-500 opacity-70"; } else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300"; } if (isEliminated) { btnClass = "line-through opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-500"; } return ( <Button key={op.id} onClick={() => handleSelecaoMultipla(op.id)} variant="outline" className={cn( "w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150", btnClass )} style={buttonInlineStyle} disabled={isEliminated || respondido} aria-checked={isSelected}> {!isEliminated && ( <div className={cn("flex-shrink-0 w-4 h-4 mr-2.5 border rounded-sm flex items-center justify-center", isSelected ? 'bg-blue-600 border-blue-700' : 'border-gray-400 bg-white')}>{isSelected && <Check className="w-3 h-3 text-white" />}</div> )} <span className="flex-1">{op.texto}</span> {isCorrect && respondido && isSelected && <CheckCircle2 className="ml-2 h-5 w-5 text-green-600 flex-shrink-0" />} {isWrongSelection && <XCircle className="ml-2 h-5 w-5 text-red-600 flex-shrink-0" />} {missedCorrect && <span title="Correta" className="ml-2 text-blue-600 font-bold text-lg">✓</span>} </Button> ); });
            case "Ordem": if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || !Array.isArray(cartaAtual.respostaCorreta)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; } const cOrdem = cartaAtual as CartaOrdem; return cOrdem.opcoes.map((op) => { const isSelected = ordemSelecoes.includes(op.id); const selectionIndex = isSelected ? ordemSelecoes.indexOf(op.id) + 1 : null; const correctIndex = cOrdem.respostaCorreta.indexOf(op.id) + 1; const isCorrectOrder = respondido && isSelected && selectionIndex === correctIndex; const isWrongOrder = respondido && isSelected && selectionIndex !== correctIndex; const isCorrectOptionOverall = respondido && correctIndex > 0; let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400"; if (respondido) { if (isCorrectOrder) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; else if (isWrongOrder) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (isCorrectOptionOverall) btnClass = "border-gray-400 text-gray-600"; else btnClass = "border-gray-300 text-gray-500 opacity-70"; } else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300"; } return ( <Button key={op.id} onClick={() => handleSelecaoOrdem(op.id)} variant="outline" className={cn("w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150", btnClass )} style={buttonInlineStyle} disabled={respondido} aria-current={isSelected ? "step" : undefined}> {isSelected && !respondido && (<span className="mr-2.5 font-bold text-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-white ring-1 ring-blue-500 flex-shrink-0">{selectionIndex}</span>)} <span className="flex-1">{op.texto}</span> {respondido && isCorrectOptionOverall && ( <> <span className={cn( "ml-2 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 text-white", isCorrectOrder ? 'bg-green-500' : 'bg-red-500' )} title={isCorrectOrder ? `Correta: ${correctIndex}` : `Sua Posição: ${selectionIndex}`}>{selectionIndex ?? '?'}</span> {isWrongOrder && correctIndex > 0 && ( <span className="ml-1 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0" title={`Posição Correta: ${correctIndex}`}>{correctIndex}</span> )} </> )} </Button> ); });
            case "RelacionarColunas": const cRel = cartaAtual as CartaRelacionarColunas; if (!Array.isArray(cRel.colunaA) || !Array.isArray(cRel.colunaB) || !Array.isArray(cRel.respostaCorreta)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; } return (<div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4"> <div className="w-full sm:w-1/2 space-y-1.5"><p className="text-xs font-semibold text-center mb-1 text-gray-600 uppercase tracking-wider">Coluna A</p>{cRel.colunaA.map(itemA => { const isSelectedA = selecaoColunaA === itemA.id; const parFormado = paresFormados.find(p => p.aId === itemA.id); const parCorretoDef = respondido ? cRel.respostaCorreta.find(rc => rc.aId === itemA.id) : undefined; const isCorrectPair = respondido && parFormado && parCorretoDef && parFormado.bId === parCorretoDef.bId; const isWrongPair = respondido && parFormado && (!parCorretoDef || parFormado.bId !== parCorretoDef.bId); const missedPair = respondido && !parFormado && parCorretoDef; let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100"; if (respondido) { if (isCorrectPair) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; else if (isWrongPair) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (missedPair) btnClass = "bg-blue-100 border-blue-400 text-blue-800"; else btnClass = "border-gray-300 text-gray-500 opacity-70"; } else { if (isSelectedA) btnClass = "ring-2 ring-blue-500 border-blue-500 bg-blue-50"; else if (parFormado) btnClass = "bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed"; } return (<Button key={`A-${itemA.id}`} variant="outline" onClick={() => handleSelecionarColunaA(itemA.id)} disabled={respondido || (parFormado && !isSelectedA) ? true : false} className={cn("w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal transition-all duration-150", btnClass)} aria-pressed={isSelectedA}> <span className="flex-1">{itemA.texto}</span> {isCorrectPair && <CheckCircle2 className="ml-1 h-4 w-4 text-green-600 flex-shrink-0" />} {isWrongPair && <XCircle className="ml-1 h-4 w-4 text-red-600 flex-shrink-0" />} {isWrongPair && parCorretoDef && (<span className="text-[10px] ml-1 text-blue-600 hidden md:inline" title={`Correto: ${cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto}`}>({cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto.substring(0,10)}...)</span>)} {missedPair && (<span className="text-[10px] ml-1 text-blue-700 hidden md:inline" title={`Parear com: ${cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto}`}> (Faltou: {cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto.substring(0,10)}...)</span>)}</Button>); })}</div> <div className="w-full sm:w-1/2 space-y-1.5"><p className="text-xs font-semibold text-center mb-1 text-gray-600 uppercase tracking-wider">Coluna B</p>{cRel.colunaB.map(itemB => { const isPairedB = paresFormados.some(p => p.bId === itemB.id); const isDisabled = respondido || selecaoColunaA === null || isPairedB; let btnClass = "border-gray-300 text-gray-800"; if (respondido || isPairedB) { btnClass = "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed opacity-70"; } else if (selecaoColunaA !== null) { btnClass = "hover:bg-blue-50 hover:border-blue-400 cursor-pointer"; } else { btnClass = "hover:bg-gray-100"; } return (<Button key={`B-${itemB.id}`} variant="outline" onClick={() => handleSelecionarColunaB(itemB.id)} disabled={isDisabled} className={cn("w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal transition-all duration-150", btnClass)} aria-disabled={isDisabled}> <span className="flex-1">{itemB.texto}</span> </Button>); })}</div></div>);
            case "PontoCerto": const cPonto = cartaAtual as CartaPontoCerto; if (!cPonto.imagemURL || !Array.isArray(cPonto.zonasClicaveis)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; } const clickCorrect = respondido && coordenadasClique && cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta && isClickInZone(coordenadasClique, z)); const clickIncorrect = respondido && coordenadasClique && !clickCorrect; return (<div className="relative w-full max-w-md mx-auto aspect-video overflow-hidden rounded border border-gray-300 shadow-inner" style={{ cursor: respondido ? 'not-allowed' : 'crosshair' }} onClick={handleImagemClick} role="button" aria-label={`Imagem interativa: ${cPonto.titulo}`} tabIndex={respondido ? -1 : 0}> <img src={cPonto.imagemURL} alt={`Imagem: ${cPonto.titulo}`} className={cn( 'block w-full h-full object-contain bg-gray-100', respondido ? 'opacity-75' : '' )}/> {coordenadasClique && (<div className={cn( `absolute w-3.5 h-3.5 rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center`, respondido ? (clickCorrect ? 'bg-green-500 border-white' : 'bg-red-500 border-white') : 'bg-blue-500 border-white' )} style={{ left: `${coordenadasClique.x * 100}%`, top: `${coordenadasClique.y * 100}%` }} title="Seu clique"> {respondido && (clickCorrect ? <Check className="w-2 h-2 text-white" /> : <XIcon className="w-2 h-2 text-white" />)} </div>)} {respondido && (() => { const zonaCorreta = cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta); return zonaCorreta ? ( <div className="absolute border-2 border-dashed border-green-500 pointer-events-none animate-pulse rounded bg-green-500/10" style={{ left: `${zonaCorreta.x * 100}%`, top: `${zonaCorreta.y * 100}%`, width: `${zonaCorreta.largura * 100}%`, height: `${zonaCorreta.altura * 100}%` }} title={zonaCorreta.descricao || "Área correta"}/> ) : null; })()} </div>);
            case "CompletarFrase": const cComp = cartaAtual as CartaCompletarFrase; if (!cComp.fraseIncompleta || !Array.isArray(cComp.fragmentos) || !Array.isArray(cComp.respostaCorreta)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; } let fraseRenderizada = cComp.fraseIncompleta; fragmentosSelecionados.forEach((fragId, index) => { const frag = cComp.fragmentos.find(f => f.id === fragId); if (frag) { fraseRenderizada = fraseRenderizada.replace(`__${index + 1}__`, `<strong class="text-blue-600 underline underline-offset-2 mx-1 px-1 rounded bg-blue-50">${frag.texto}</strong>`); } }); fraseRenderizada = fraseRenderizada.replace(/__\d+__/g, '<span class="text-gray-400 border-b border-dashed border-gray-400 mx-1 px-2">___</span>'); const isCompletarCorreto = respondido && fragmentosSelecionados.toString() === cComp.respostaCorreta.toString(); return (<div className="space-y-3"><div className={cn( 'p-3 border rounded bg-gray-50 text-sm leading-relaxed shadow-inner', respondido ? (isCompletarCorreto ? 'border-green-300' : 'border-red-300') : 'border-gray-300' )} dangerouslySetInnerHTML={{ __html: fraseRenderizada }}/> {!respondido && (<div className="flex flex-wrap gap-2 justify-center items-center border-t pt-3 mt-3"> {cComp.fragmentos.filter(f => !fragmentosSelecionados.includes(f.id)).map(frag => (<Button key={frag.id} variant="outline" size="sm" onClick={() => handleSelecionarFragmento(frag.id)} className="bg-white hover:bg-blue-50 border-blue-300 text-blue-800 text-xs px-2 py-1 h-auto">{frag.texto}</Button>))} {fragmentosSelecionados.length > 0 && (<Button variant="ghost" size="sm" onClick={limparFragmentos} className="text-red-500 hover:bg-red-100 px-2 py-1 h-auto" title="Limpar"><RotateCcw className="h-4 w-4 mr-1"/> Limpar</Button>)}</div>)} {respondido && !isCompletarCorreto && (<div className="text-xs text-center text-green-700 mt-2 border-t pt-2"><strong>Correto:</strong> {cComp.respostaCorreta.map(id => cComp.fragmentos.find(f => f.id === id)?.texto).join(' → ')}</div>)}</div>);

            default: console.error("Tipo não renderizado:", cartaAtual); return <p className="text-sm text-red-500 text-center italic py-4">Erro: Tipo de carta desconhecido.</p>;
        }
    }

}; // Fim do Componente EcoChallenge

export default EcoChallenge;