// src/components/EcoChallenge.tsx

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    CheckCircle2, XCircle, ThumbsUp, ThumbsDown, RotateCcw, HelpCircle,
    BookOpen, Home, SkipForward, Star, Award, MinusCircle, ChevronUp, Zap, Filter,
    Trash, EyeOff, Eye, Dice6, X as XIcon, Timer, Link2, MousePointerClick, Check, TextSelect,
    ChevronDown, ChevronRight
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Importar Decks
import manejoPlantadas from "./deck/cards_manejo_plantada";
import manejoNativas from "./deck/cards_manejo_nativa";
import ecologiaFlorestal from "./deck/cards_ecologia_florestal";
import estrelasAliens from "./dlc/cards_estrelas_aliens";
import testCards from "./.test/test_card";

// --- Tipos de Dados ---
interface Opcao { id: number; texto: string; }
interface CartaBase { id: string | number; tipo: string; titulo: string; pergunta: string; dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[]; vantagem: string; desvantagem: string; dica: string; baralho?: string; }
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
type Carta = | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;

// --- Interfaces de Jogador e Jogo ---
interface Player { id: number; name: string; color: string; fixedStars: number; respostasCertas: number; respostasErradas: number; respostasSeguidas: number; progresso: number; pulosDisponiveis: number; contadorDeEstrelas: number; rodadasPreso: number; }
interface PlayerInput { id: number; name: string; color: string; showColorPicker?: boolean; }

// --- Novas Interfaces para Gerenciamento de Fontes e Baralhos ---
const DEFAULT_BARALHO_NAME = "Padrão";
interface SourceInfo { id: string; name: string; type: 'builtin' | 'custom'; cards: Carta[]; internalBaralhos: Record<string, number>; totalCards: number; active: boolean; }

// Estado do Jogo
interface GameState { players: Player[]; currentPlayerId: number | null; categoriasSelecionadas: string[]; ocultarCarta: boolean; probabilityIndex: number; jogoIniciado: boolean; activeSourceIds: string[]; activeInternalBaralhosState: Record<string, string[]>; }

// --- Constantes ---
const predefinedColors: string[] = [ "#9e0142","#f46d43","#fee08b","#66c2a5","#5e4fa2","#ff6699","#33a02c","#ff7f00", "#3288bd","#999999","#8dd3c7","#ffffb3","#fb8072","#80b1d3","#b3de69","#fccde5", "#bc80bd","#1f78b4","#e31a1c","#ffcc33","#6a3d9a","#b15928","#b2df8a","#cab2d6", "#a6cee3","#fb9a99","#fdbf6f","#ffed6f","#ccebc5","#ff4444", ];
const probabilitySettings = [ { value: 0, color: "#e5e7eb", label: "0%", textColor: "#1f2937" }, { value: 0.4, color: "#16a34a", label: "40%", textColor: "#ffffff" }, { value: 0.6, color: "#f97316", label: "60%", textColor: "#ffffff" }, { value: 0.8, color: "#dc2626", label: "80%", textColor: "#ffffff" }, ];
const tiposPergunta: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];
const tiposEspeciais: Carta['tipo'][] = ["Vantagem", "Desvantagem", "Outras"];

// --- Carregamento Inicial e Estruturação ---
function processCardsAndExtractBaralhos(cards: Carta[]): { processedCards: Carta[], internalBaralhos: Record<string, number>, totalCards: number } { const baralhoCounts: Record<string, number> = {}; let totalCards = 0; const processedCards = cards.map(card => { const baralhoName = card.baralho?.trim() || DEFAULT_BARALHO_NAME; baralhoCounts[baralhoName] = (baralhoCounts[baralhoName] || 0) + 1; totalCards++; return { ...card, baralho: baralhoName }; }); const sortedBaralhoNames = Object.keys(baralhoCounts).sort(); const sortedInternalBaralhos: Record<string, number> = {}; sortedBaralhoNames.forEach(name => { sortedInternalBaralhos[name] = baralhoCounts[name]; }); return { processedCards, internalBaralhos: sortedInternalBaralhos, totalCards }; }
const builtInSourcesData: Omit<SourceInfo, 'active' | 'internalBaralhos' | 'totalCards'>[] = [ { id: "manejoPlantadas", name: "Manejo Plantadas", type: 'builtin', cards: manejoPlantadas as Carta[] }, { id: "manejoNativas", name: "Manejo Nativas", type: 'builtin', cards: manejoNativas as Carta[] }, { id: "ecologiaFlorestal", name: "Ecologia Florestal", type: 'builtin', cards: ecologiaFlorestal as Carta[] }, { id: "estrelasAliens", name: "Estrelas & Aliens (DLC)", type: 'builtin', cards: estrelasAliens as Carta[] }, { id: "testCards", name: "Test Cards", type: 'builtin', cards: testCards as Carta[] }, ];
const initialBuiltInSources: SourceInfo[] = builtInSourcesData.map(source => { const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards); return { ...source, cards: processedCards, internalBaralhos: internalBaralhos, totalCards, active: true }; });

// --- Funções Utilitárias ---
function parseJSDeckFile(content: string): Carta[] { try { const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m); if (!match || !match[1]) { throw new Error("Array de cartas não encontrado no arquivo JS."); } const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[]; if (!Array.isArray(rawArray)) { throw new Error("O conteúdo extraído não é um array."); } return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[]; } catch (error: any) { console.error("Erro ao processar arquivo JS:", error); throw new Error(`Erro ao processar arquivo JS: ${error.message}`); } }
function recalcularCategoriasAtivas( allSources: SourceInfo[], activeInternalBaralhos: Record<string, Set<string>> ): { categorias: string[], contagens: Record<string, number> } { const activeCards: Carta[] = []; const categoryCounts: Record<string, number> = {}; allSources.forEach(source => { if (!source.active) return; const activeBaralhosForSource = activeInternalBaralhos[source.id]; if (!activeBaralhosForSource) return; source.cards.forEach(card => { if (activeBaralhosForSource.has(card.baralho || DEFAULT_BARALHO_NAME)) { activeCards.push(card); (card.categorias || []).forEach(cat => { categoryCounts[cat] = (categoryCounts[cat] || 0) + 1; }); } }); }); const categorias = Array.from(new Set(activeCards.flatMap(c => c.categorias || []))).sort(); return { categorias, contagens: categoryCounts }; }
function isClickInZone(clickCoords: { x: number; y: number } | null, zone: ZonaClicavel): boolean { if (!clickCoords) return false; const { x, y } = clickCoords; return (x >= zone.x && x <= zone.x + zone.largura && y >= zone.y && y <= zone.y + zone.altura); }

// --- Componente TelaInicial ---
interface TelaInicialProps {
    onStartGame: (gameState: Partial<GameState>, sourcesForGame: SourceInfo[]) => void;
    initialPlayers: Player[];
    initialOcultarCarta: boolean;
    initialProbabilityIndex: number;
    hasSavedGame: boolean;
}

const TelaInicial: React.FC<TelaInicialProps> = ({
    onStartGame, initialPlayers, initialOcultarCarta, initialProbabilityIndex, hasSavedGame,
}) => {
    const [termoBuscaCategoria, setTermoBuscaCategoria] = useState("");
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
    const [ocultarCarta, setOcultarCarta] = useState(initialOcultarCarta);
    const [probabilityIndex, setProbabilityIndex] = useState(initialProbabilityIndex);
    const [playerInputs, setPlayerInputs] = useState<PlayerInput[]>(() => initialPlayers.length > 0 ? initialPlayers.map((p) => ({ id: p.id, name: p.name, color: p.color, showColorPicker: false })) : [{ id: 0, name: "", color: predefinedColors[0], showColorPicker: false }] );
    const [allSources, setAllSources] = useState<SourceInfo[]>([]);
    const [activeInternalBaralhos, setActiveInternalBaralhos] = useState<Record<string, Set<string>>>({});
    const [todasCategorias, setTodasCategorias] = useState<string[]>([]);
    const [categoriasComContagem, setCategoriasComContagem] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const savedCustom = localStorage.getItem("customSourceInfos"); const savedBuiltInStatus = localStorage.getItem("builtInSourceStatus"); let loadedCustomSources: SourceInfo[] = []; let loadedBuiltInStatus: Record<string, boolean> | null = null;
        try { loadedCustomSources = savedCustom ? JSON.parse(savedCustom) : []; } catch { loadedCustomSources = []; } try { loadedBuiltInStatus = savedBuiltInStatus ? JSON.parse(savedBuiltInStatus) : null; } catch { loadedBuiltInStatus = null; }
        const processedCustomSources = loadedCustomSources.map(source => { const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards || []); return { ...source, cards: processedCards, internalBaralhos, totalCards }; });
        const combinedSources = [...initialBuiltInSources.map(bs => ({...bs, active: loadedBuiltInStatus ? (loadedBuiltInStatus[bs.id] ?? true) : true})), ...processedCustomSources];
        setAllSources(combinedSources);

        const savedActiveInternal = localStorage.getItem("activeInternalBaralhos"); let initialActiveBaralhos: Record<string, Set<string>> = {};
        try { const parsed = savedActiveInternal ? JSON.parse(savedActiveInternal) : {}; Object.keys(parsed).forEach(key => { if (Array.isArray(parsed[key])) { initialActiveBaralhos[key] = new Set(parsed[key]); } }); } catch { initialActiveBaralhos = {}; }
        combinedSources.forEach(source => { if (!initialActiveBaralhos[source.id]) { initialActiveBaralhos[source.id] = new Set(Object.keys(source.internalBaralhos)); } else { Object.keys(source.internalBaralhos).forEach(bName => { initialActiveBaralhos[source.id].add(bName); }); initialActiveBaralhos[source.id].forEach(savedBName => { if (!(savedBName in source.internalBaralhos)) { initialActiveBaralhos[source.id].delete(savedBName); }}); } });
        setActiveInternalBaralhos(initialActiveBaralhos);
    }, []);

    useEffect(() => { if(isClient) { const { categorias, contagens } = recalcularCategoriasAtivas(allSources, activeInternalBaralhos); setTodasCategorias(categorias); setCategoriasComContagem(contagens); setCategoriasSelecionadas((prev) => prev.filter(cat => categorias.includes(cat))); } }, [allSources, activeInternalBaralhos, isClient]);
    useEffect(() => { if (isClient) { const customSourcesToSave = allSources.filter(s => s.type === 'custom'); localStorage.setItem("customSourceInfos", JSON.stringify(customSourcesToSave)); const builtInStatusToSave: Record<string, boolean> = {}; allSources.filter(s => s.type === 'builtin').forEach(s => { builtInStatusToSave[s.id] = s.active; }); localStorage.setItem("builtInSourceStatus", JSON.stringify(builtInStatusToSave)); const serializableActiveInternal = Object.entries(activeInternalBaralhos).reduce((acc, [key, valueSet]) => { acc[key] = Array.from(valueSet); return acc; }, {} as Record<string, string[]>); localStorage.setItem("activeInternalBaralhos", JSON.stringify(serializableActiveInternal)); } }, [allSources, activeInternalBaralhos, isClient]);

    const handleCustomDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => { const files = e.target.files; if (!files) return; setIsLoading(true); setErrorMessage(null); let newCustomSources: SourceInfo[] = []; let errors: string[] = []; for (let i = 0; i < files.length; i++) { const file = files[i]; const content = await file.text(); try { let loadedCards: Carta[] = []; const sourceName = file.name.replace(/\.(js|json)$/, ""); const sourceId = `custom_${Date.now()}_${i}`; if (allSources.some(s => s.name === sourceName && s.type === 'custom')) { errors.push(`Arquivo/Fonte "${sourceName}" já carregado.`); continue; } if (file.name.endsWith(".js")) { loadedCards = parseJSDeckFile(content); } else if (file.name.endsWith(".json")) { const raw = JSON.parse(content) as any[]; loadedCards = raw.map((card, index) => ({ ...card, id: card.id || `${sourceId}_card_${index}` })) as Carta[]; } else { errors.push(`Formato não suportado: ${file.name}. Use .js ou .json.`); continue; } if (!Array.isArray(loadedCards) || loadedCards.length === 0) { errors.push(`Nenhuma carta válida encontrada em "${sourceName}".`); continue; } const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(loadedCards); newCustomSources.push({ id: sourceId, name: sourceName, type: 'custom', cards: processedCards, internalBaralhos, totalCards, active: true }); } catch (error: any) { errors.push(`Erro ao ler ${file.name}: ${error.message}`); } } if (newCustomSources.length > 0) { setAllSources(prev => [...prev, ...newCustomSources]); setActiveInternalBaralhos(prev => { const newState = { ...prev }; newCustomSources.forEach(source => { newState[source.id] = new Set(Object.keys(source.internalBaralhos)); }); return newState; }); setExpandedSources(prev => { const newSet = new Set(prev); newCustomSources.forEach(s => newSet.add(s.id)); return newSet; }); } if (errors.length > 0) { setErrorMessage(errors.join("\n")); } setIsLoading(false); e.target.value = ''; };
    const toggleSourceActive = (sourceId: string) => { setAllSources(prev => prev.map(s => s.id === sourceId ? { ...s, active: !s.active } : s)); };
    const removeSource = (sourceId: string) => { const sourceToRemove = allSources.find(s => s.id === sourceId); if (!sourceToRemove || sourceToRemove.type !== 'custom') return; if (window.confirm(`Remover fonte "${sourceToRemove.name}"?`)) { setAllSources(prev => prev.filter(s => s.id !== sourceId)); setActiveInternalBaralhos(prev => { const newState = { ...prev }; delete newState[sourceId]; return newState; }); setExpandedSources(prev => { const newSet = new Set(prev); newSet.delete(sourceId); return newSet; }); } }
    const toggleInternalBaralhoActive = (sourceId: string, baralhoName: string) => { setActiveInternalBaralhos(prev => { const currentSourceSet = prev[sourceId] ? new Set(prev[sourceId]) : new Set<string>(); if (currentSourceSet.has(baralhoName)) { currentSourceSet.delete(baralhoName); } else { currentSourceSet.add(baralhoName); } return { ...prev, [sourceId]: currentSourceSet }; }); };
    const toggleExpandSource = (sourceId: string) => { setExpandedSources(prev => { const newSet = new Set(prev); if (newSet.has(sourceId)) { newSet.delete(sourceId); } else { newSet.add(sourceId); } return newSet; }); };
    const addPlayerInput = () => { if (playerInputs.length < 8) { setPlayerInputs([...playerInputs, { id: playerInputs.length, name: "", color: predefinedColors[playerInputs.length % predefinedColors.length], showColorPicker: false, }]); } };
    const handlePlayerChange = (index: number, field: "name" | "color", value: string) => { const updatedPlayers = [...playerInputs]; const player = updatedPlayers[index]; if (field === 'name') player.name = value; if (field === 'color') player.color = value; setPlayerInputs(updatedPlayers); };
    const toggleColorPicker = (index: number) => { const updatedPlayers = playerInputs.map((p, i) => i === index ? { ...p, showColorPicker: !p.showColorPicker } : {...p, showColorPicker: false}); setPlayerInputs(updatedPlayers); };
    const deletePlayer = (index: number) => { setPlayerInputs((prev) => prev.filter((_, i) => i !== index)); };

    const handleStartGame = (continueGame = false) => {
        let gameStateToPass: Partial<GameState>;
        const finalCategorias = recalcularCategoriasAtivas(allSources, activeInternalBaralhos).categorias;
        const finalCategoriasSelecionadas = categoriasSelecionadas.filter(cat => finalCategorias.includes(cat));
        if (playerInputs.length === 0) { alert("Adicione pelo menos um jogador."); return; }
        const anySourceActive = allSources.some(s => s.active); if (!anySourceActive) { alert("Ative pelo menos uma Fonte de Cartas."); return; }
        const anyInternalDeckActive = Object.entries(activeInternalBaralhos).some(([sourceId, activeSet]) => allSources.find(s => s.id === sourceId)?.active && activeSet.size > 0); if (!anyInternalDeckActive) { alert("Ative pelo menos um baralho interno dentro das fontes ativas."); return; }
        if (finalCategoriasSelecionadas.length === 0) { alert("Nenhuma categoria selecionada ou nenhuma categoria disponível com os baralhos ativos. Selecione categorias ou ative mais baralhos."); return; }
        const activeCardsForGame = allSources.flatMap(source => { if (!source.active) return []; const activeBaralhos = activeInternalBaralhos[source.id]; if (!activeBaralhos || activeBaralhos.size === 0) return []; return source.cards.filter(card => activeBaralhos.has(card.baralho || DEFAULT_BARALHO_NAME)); }); if (activeCardsForGame.filter(c => c.categorias?.some(cat => finalCategoriasSelecionadas.includes(cat))).length === 0) { alert("Nenhuma carta encontrada com a combinação de baralhos e categorias selecionadas."); return; }

        const activeSourcesForGame = allSources.filter(s => s.active);
        const activeInternalBaralhosStateForSave = Object.entries(activeInternalBaralhos).reduce((acc, [key, valueSet]) => { if (activeSourcesForGame.some(s => s.id === key)) { acc[key] = Array.from(valueSet); } return acc; }, {} as Record<string, string[]>);

        if (continueGame && typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
            try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) { gameStateToPass = { ...savedState, categoriasSelecionadas: finalCategoriasSelecionadas, ocultarCarta: ocultarCarta, probabilityIndex: probabilityIndex, activeSourceIds: activeSourcesForGame.map(s => s.id), activeInternalBaralhosState: activeInternalBaralhosStateForSave, }; }
                else { return handleStartGame(false); }
            } catch (e) { console.error("Erro ao carregar jogo salvo:", e); return handleStartGame(false); }
        } else {
            const initializedPlayers: Player[] = playerInputs.map((input, index) => ({ id: index, name: input.name.trim() || `Jogador ${index + 1}`, color: input.color || predefinedColors[index % predefinedColors.length], fixedStars: 0, respostasCertas: 0, respostasErradas: 0, respostasSeguidas: 0, progresso: 0, pulosDisponiveis: 0, contadorDeEstrelas: 0, rodadasPreso: 0 }));
            gameStateToPass = { players: initializedPlayers, currentPlayerId: initializedPlayers[0]?.id ?? null, categoriasSelecionadas: finalCategoriasSelecionadas, ocultarCarta: ocultarCarta, probabilityIndex: probabilityIndex, jogoIniciado: true, activeSourceIds: activeSourcesForGame.map(s => s.id), activeInternalBaralhosState: activeInternalBaralhosStateForSave, };
        }
        onStartGame(gameStateToPass, activeSourcesForGame);
    };

    const categoriasFiltradasParaExibicao = useMemo(() => { return Object.entries(categoriasComContagem) .filter(([categoria]) => categoria.toLowerCase().includes(termoBuscaCategoria.toLowerCase())) .sort(([catA], [catB]) => catA.localeCompare(catB)); }, [categoriasComContagem, termoBuscaCategoria]);
    const cycleProbability = () => { setProbabilityIndex((prevIndex) => (prevIndex + 1) % probabilitySettings.length); };
    const builtInSourcesUI = allSources.filter(s => s.type === 'builtin');
    const customSourcesUI = allSources.filter(s => s.type === 'custom');

    if (!isClient) { return null; }

    return (
        <Card className="w-full max-w-lg mx-auto mt-8 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-700">Eco Challenge</CardTitle>
                <p className="text-sm text-center text-gray-600">O Jogo da Sustentabilidade</p>
            </CardHeader>
            <CardContent className="space-y-6">
                 {/* Gerenciamento de Fontes */}
                 <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Baralhos Incluídos</h3>
                        <ScrollArea className="h-40 border rounded-md p-2 bg-gray-100 space-y-2">
                             {builtInSourcesUI.length > 0 ? builtInSourcesUI.map((source) => (
                                <div key={source.id} className="border-b last:border-b-0 pb-2 mb-2 bg-white px-2 py-1 rounded shadow-sm">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id={`source-${source.id}`} checked={source.active} onCheckedChange={() => toggleSourceActive(source.id)} className="mt-1"/>
                                        <button onClick={() => toggleExpandSource(source.id)} className="flex items-center flex-1 text-left cursor-pointer min-w-0" aria-expanded={expandedSources.has(source.id)}>
                                            {expandedSources.has(source.id) ? <ChevronDown className="h-4 w-4 mr-1 shrink-0"/> : <ChevronRight className="h-4 w-4 mr-1 shrink-0"/>}
                                            <label htmlFor={`source-${source.id}`} className="text-sm font-medium cursor-pointer truncate flex-1" title={`${source.name} (${source.totalCards} cartas)`}>
                                                {source.name} <span className="text-gray-500">({source.totalCards})</span>
                                            </label>
                                        </button>
                                    </div>
                                     {source.active && expandedSources.has(source.id) && (
                                         <div className="pl-8 mt-1 space-y-1">
                                            {Object.entries(source.internalBaralhos).length > 0 ? Object.entries(source.internalBaralhos).map(([baralhoName, count]) => ( <div key={`${source.id}-${baralhoName}`} className="flex items-center space-x-2"> <Checkbox id={`baralho-${source.id}-${baralhoName}`} checked={activeInternalBaralhos[source.id]?.has(baralhoName) ?? false} onCheckedChange={() => toggleInternalBaralhoActive(source.id, baralhoName)} /> <label htmlFor={`baralho-${source.id}-${baralhoName}`} className="text-xs cursor-pointer"> {baralhoName} <span className="text-gray-500">({count})</span> </label> </div> )) : ( <p className="text-xs italic text-gray-500">Nenhum baralho interno definido.</p> )}
                                         </div>
                                     )}
                                </div>
                            )) : <p className="text-sm text-gray-500 italic p-2">Nenhum baralho incluído encontrado.</p>}
                        </ScrollArea>
                    </div>
                     <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Baralhos Carregados (Arquivos)</h3>
                         {errorMessage && (<Alert variant="destructive" className="text-xs mb-2"><AlertDescription>{errorMessage}</AlertDescription></Alert>)}
                         <Input type="file" multiple accept=".js,.json" onChange={handleCustomDeckUpload} disabled={isLoading} className="text-sm h-9 mb-2"/>
                         {isLoading && <p className="text-xs text-blue-600 mb-2">Carregando...</p>}
                         {customSourcesUI.length > 0 ? (
                            <ScrollArea className="h-40 border rounded-md p-2 bg-gray-100 space-y-2">
                                 {customSourcesUI.map((source) => (
                                     <div key={source.id} className="border-b last:border-b-0 pb-2 mb-2 bg-white px-2 py-1 rounded shadow-sm">
                                         <div className="flex items-center space-x-2">
                                             <Checkbox id={`source-${source.id}`} checked={source.active} onCheckedChange={() => toggleSourceActive(source.id)} className="mt-1"/>
                                             <button onClick={() => toggleExpandSource(source.id)} className="flex items-center flex-1 text-left cursor-pointer min-w-0" aria-expanded={expandedSources.has(source.id)}>
                                                 {expandedSources.has(source.id) ? <ChevronDown className="h-4 w-4 mr-1 shrink-0"/> : <ChevronRight className="h-4 w-4 mr-1 shrink-0"/>}
                                                 <label htmlFor={`source-${source.id}`} className="text-sm font-medium cursor-pointer truncate flex-1" title={`${source.name} (${source.totalCards} cartas)`}> {source.name} <span className="text-gray-500">({source.totalCards})</span> </label>
                                             </button>
                                             <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500 hover:bg-red-100 shrink-0" onClick={(e) => {e.stopPropagation(); removeSource(source.id);}} aria-label={`Remover fonte ${source.name}`}><Trash className="h-4 w-4" /></Button>
                                         </div>
                                         {source.active && expandedSources.has(source.id) && (
                                             <div className="pl-8 mt-1 space-y-1">
                                                {Object.entries(source.internalBaralhos).length > 0 ? Object.entries(source.internalBaralhos).map(([baralhoName, count]) => ( <div key={`${source.id}-${baralhoName}`} className="flex items-center space-x-2"> <Checkbox id={`baralho-${source.id}-${baralhoName}`} checked={activeInternalBaralhos[source.id]?.has(baralhoName) ?? false} onCheckedChange={() => toggleInternalBaralhoActive(source.id, baralhoName)} /> <label htmlFor={`baralho-${source.id}-${baralhoName}`} className="text-xs cursor-pointer"> {baralhoName} <span className="text-gray-500">({count})</span> </label> </div> )) : ( <p className="text-xs italic text-gray-500">Nenhum baralho interno definido.</p> )}
                                             </div>
                                         )}
                                    </div>
                                ))}
                            </ScrollArea>
                         ) : ( !isLoading && <p className="text-sm text-gray-500 italic p-2 border rounded bg-gray-100">Nenhum arquivo carregado.</p> )}
                    </div>
                 </div>
                {/* Seleção de Categorias */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">Categorias (dos baralhos ativos)</h3>
                    <Input type="text" placeholder="Pesquisar Categoria..." value={termoBuscaCategoria} onChange={(e) => setTermoBuscaCategoria(e.target.value)} className="w-full p-2 border rounded h-9"/>
                    <ScrollArea className="h-40 border rounded-md p-3 bg-gray-50">
                        {categoriasFiltradasParaExibicao.length > 0 ? (
                            categoriasFiltradasParaExibicao.map(([categoria, count]) => (
                                <div key={categoria} className="flex items-center space-x-2 mb-1 hover:bg-gray-100 p-1 rounded">
                                    <Checkbox id={`cat-${categoria}`} checked={categoriasSelecionadas.includes(categoria)} onCheckedChange={() => { setCategoriasSelecionadas((prev) => prev.includes(categoria) ? prev.filter((c) => c !== categoria) : [...prev, categoria]); }} />
                                    <label htmlFor={`cat-${categoria}`} className="text-sm cursor-pointer flex-1"> {categoria} <span className="text-gray-500">({count})</span> </label>
                                </div>
                            ))
                        ) : ( <p className="text-sm text-gray-500 italic">Nenhuma categoria disponível para os baralhos selecionados.</p> )}
                    </ScrollArea>
                    <div className="flex space-x-2 mt-2">
                        <Button onClick={() => setCategoriasSelecionadas(todasCategorias)} variant="outline" size="sm" className="flex-1" disabled={todasCategorias.length === 0}>Todas</Button>
                        <Button onClick={() => setCategoriasSelecionadas([])} variant="outline" size="sm" className="flex-1">Nenhuma</Button>
                    </div>
                </div>
                {/* Configuração de Jogadores */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Jogadores</h3>
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                        {playerInputs.map((player, index) => ( <div key={player.id} className="border p-3 rounded-md shadow-sm bg-white relative"> <div className="flex items-center space-x-2"> <Input type="text" placeholder={`Jogador ${index + 1}`} value={player.name} maxLength={12} onChange={(e) => handlePlayerChange(index, "name", e.target.value)} className="flex-grow"/> <Button variant="outline" size="icon" className="w-8 h-8 flex-shrink-0" onClick={() => toggleColorPicker(index)} style={{ backgroundColor: player.color }} aria-label="Selecionar cor"/> <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-red-500 hover:bg-red-100" onClick={() => deletePlayer(index)} aria-label="Remover jogador"><Trash className="h-4 w-4" /></Button> </div> {player.showColorPicker && ( <div className="absolute z-20 mt-2 right-12 w-48 bg-white border rounded-md shadow-lg p-2 grid grid-cols-6 gap-1"> {predefinedColors.map((color, idx) => ( <button key={idx} aria-label={`Selecionar cor ${color}`} style={{ backgroundColor: color }} className={cn('w-6 h-6 rounded border', player.color === color ? 'ring-2 ring-offset-1 ring-black' : 'border-gray-300')} onClick={() => {handlePlayerChange(index, "color", color); toggleColorPicker(index);}} /> ))} </div> )} </div> ))}
                    </div>
                    {playerInputs.length < 8 && (<Button onClick={addPlayerInput} variant="secondary" className="w-full">+ Adicionar Jogador</Button>)}
                </div>
                 {/* Opções de Jogo */}
                 <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Opções</h3>
                     <Button onClick={() => setOcultarCarta(!ocultarCarta)} variant="outline" className="w-full flex items-center justify-center space-x-2"> {ocultarCarta ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} <span>{ocultarCarta ? "Ocultar Carta Ativado" : "Ocultar Carta Desativado"}</span> </Button>
                     <Button onClick={cycleProbability} className="w-full flex items-center justify-center space-x-2" style={{ backgroundColor: probabilitySettings[probabilityIndex].color, color: probabilitySettings[probabilityIndex].textColor }}> <span>% Excluir Especiais:</span> <span className="font-bold">{probabilitySettings[probabilityIndex].label}</span> </Button>
                 </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3 pt-6 border-t">
                {hasSavedGame && (<Button onClick={() => handleStartGame(true)} className="w-full bg-blue-600 hover:bg-blue-700">Continuar Jogo Salvo</Button>)}
                <Button onClick={() => handleStartGame(false)} className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>{hasSavedGame ? "Iniciar Novo Jogo" : "Iniciar Jogo"}</Button>
            </CardFooter>
        </Card>
    );
};

// --- Componente Principal EcoChallenge ---
const EcoChallenge: React.FC = () => {
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
    const [selecionado, setSelecionado] = useState<number | null>(null);
    const [selecoesMultiplas, setSelecoesMultiplas] = useState<number[]>([]);
    const [ordemSelecoes, setOrdemSelecoes] = useState<number[]>([]);
    const [tempoRestante, setTempoRestante] = useState<number | null>(null);
    const [selecaoColunaA, setSelecaoColunaA] = useState<number | null>(null);
    const [paresFormados, setParesFormados] = useState<{ aId: number; bId: number }[]>([]);
    const [coordenadasClique, setCoordenadasClique] = useState<{ x: number; y: number } | null>(null);
    const [fragmentosSelecionados, setFragmentosSelecionados] = useState<number[]>([]);
    const [rolledNumber, setRolledNumber] = useState<number | null>(null);
    const [rollingNumber, setRollingNumber] = useState<number | null>(null);
    const [isDieModalOpen, setIsDieModalOpen] = useState(false);
    const [isRolling, setIsRolling] = useState(false);
    const [isClientReady, setIsClientReady] = useState(false);

    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

    // Função para iniciar/continuar o jogo
    const handleGameStart = useCallback((initialGameState?: Partial<GameState>, sourcesForGame?: SourceInfo[]) => {
        console.log("EcoChallenge: handleGameStart chamado", { initialGameState, sourcesForGame });
        if (initialGameState && sourcesForGame && initialGameState.jogoIniciado) {
             setGameState(initialGameState as GameState);
             setCurrentGameSources(sourcesForGame); // Armazena as fontes que serão usadas neste jogo
             // Resetar estados da rodada
             setCartaAtual(null); setNoCardsAvailable(false); setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null); setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]); setOpcoesEliminadas([]); setCartaRevelada(!(initialGameState.ocultarCarta ?? true));
        } else if (initialGameState) { // Tenta reconstruir fontes para saves antigos
             console.warn("Reconstruindo fontes para jogo salvo (fallback)...");
             const customSourcesRaw = typeof window !== "undefined" ? localStorage.getItem("customSourceInfos") : null;
             // ===== CORREÇÃO DO TYPO AQUI =====
             const builtInStatusRaw = typeof window !== "undefined" ? localStorage.getItem("builtInSourceStatus") : null;
             // ===== FIM DA CORREÇÃO =====
             let customSources: SourceInfo[] = []; let builtInStatus: Record<string, boolean> | null = null;
             try { customSources = customSourcesRaw ? JSON.parse(customSourcesRaw) : []; } catch { customSources = []; }
             // ===== CORREÇÃO DO TYPO AQUI =====
             try { builtInStatus = builtInStatusRaw ? JSON.parse(builtInStatusRaw) : null; } catch { builtInStatus = null; }
             // ===== FIM DA CORREÇÃO =====
             const processedCustomSources = customSources.map(source => { const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards || []); return { ...source, cards: processedCards, internalBaralhos, totalCards }; });
             const reconstructedSources = [ ...initialBuiltInSources.map(bs => ({...bs, active: builtInStatus?.[bs.id] ?? true })), ...processedCustomSources ].filter(s => initialGameState.activeSourceIds?.includes(s.id));
             setGameState(initialGameState as GameState); setCurrentGameSources(reconstructedSources);
             setCartaAtual(null); setNoCardsAvailable(false); setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null); setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]); setOpcoesEliminadas([]); setCartaRevelada(!(initialGameState.ocultarCarta ?? true));
        } else { console.error("handleGameStart chamado sem dados válidos."); setGameState(null); }
     }, []);

    // Persiste o estado do jogo
    const updateGameState = useCallback((newState: Partial<GameState>) => { setGameState(prev => { if (!prev) return null; const updatedState = { ...prev, ...newState }; if (typeof window !== "undefined") { try { localStorage.setItem("estadoEcoChallenge", JSON.stringify(updatedState)); } catch (e) { console.error("Erro ao salvar estado:", e); } } return updatedState; }); }, []);
    const updateCurrentPlayer = useCallback((partialPlayerData: Partial<Player>) => { if (!gameState || gameState.currentPlayerId === null) return; const updatedPlayers = gameState.players.map(p => p.id === gameState.currentPlayerId ? { ...p, ...partialPlayerData } : p ); updateGameState({ players: updatedPlayers }); }, [gameState, updateGameState]);

    // Marca cliente pronto e tenta carregar jogo salvo
    useEffect(() => {
        setIsClientReady(true);
        if (!gameState && typeof window !== "undefined") { // Só tenta carregar se gameState ainda for null
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
            try { const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null; if (savedState && savedState.jogoIniciado) { handleGameStart(savedState); } }
            catch (e) { console.error("Erro ao carregar estado inicial:", e); localStorage.removeItem("estadoEcoChallenge"); }
        }
    }, [handleGameStart, gameState]); // Reage a gameState para evitar chamar handleGameStart se ele já foi definido

    // Seleciona a primeira carta
    useEffect(() => { if (gameState?.jogoIniciado && currentGameSources.length > 0 && !cartaAtual && !noCardsAvailable) { selecionarCartaAleatoria(); } }, [gameState?.jogoIniciado, currentGameSources, cartaAtual, noCardsAvailable, selecionarCartaAleatoria]);
    // Timer do ContraTempo
    useEffect(() => { if (cartaAtual?.tipo === "ContraTempo" && tempoRestante !== null && tempoRestante > 0 && !respondido && gameState?.jogoIniciado && cartaRevelada) { timerIntervalRef.current = setInterval(() => { setTempoRestante((prev) => { if (prev === null || prev <= 1) { clearInterval(timerIntervalRef.current!); setRespondido(true); setMensagem(`Tempo esgotado! ${cartaAtual.desvantagem || 'Tente novamente.'}`); if (gameState && gameState.currentPlayerId !== null) { const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId); if (currentPlayer) { updateCurrentPlayer({ respostasErradas: currentPlayer.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(currentPlayer.progresso - 10, 0) }); } } return 0; } return prev - 1; }); }, 1000); } else if (timerIntervalRef.current && (respondido || tempoRestante === 0 || !cartaRevelada)) { clearInterval(timerIntervalRef.current); } return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); }; }, [cartaAtual, tempoRestante, respondido, gameState?.jogoIniciado, cartaRevelada, gameState?.currentPlayerId, updateCurrentPlayer]);

    // Selecionar Carta Aleatória
    const selecionarCartaAleatoria = useCallback(() => {
        if (!gameState || currentGameSources.length === 0) { setNoCardsAvailable(true); return; }
        const { categoriasSelecionadas, probabilityIndex, activeInternalBaralhosState } = gameState;
        const probabilidadeExcluirEspecial = probabilitySettings[probabilityIndex].value; const incluirCartasEspeciais = probabilidadeExcluirEspecial === 0 || Math.random() >= probabilidadeExcluirEspecial;
        const activeSources = currentGameSources;
        const cartasFiltradas = activeSources.flatMap(source => { const activeBaralhosForSource = activeInternalBaralhosState[source.id]; if (!activeBaralhosForSource || activeBaralhosForSource.length === 0) return []; const activeBaralhoSet = new Set(activeBaralhosForSource); return source.cards.filter(card => { const baralhoAtivo = activeBaralhoSet.has(card.baralho || DEFAULT_BARALHO_NAME); if (!baralhoAtivo) return false; const categoriaValida = card.categorias?.some(cat => categoriasSelecionadas.includes(cat)); if (!categoriaValida) return false; const isTipoEspecial = tiposEspeciais.includes(card.tipo); if (!incluirCartasEspeciais && isTipoEspecial) return false; return true; }); });
        if (cartasFiltradas.length === 0) { setNoCardsAvailable(true); setCartaAtual(null); setMensagem("Nenhuma carta encontrada com os filtros atuais!"); return; }
        setNoCardsAvailable(false); const idxAleat = Math.floor(Math.random() * cartasFiltradas.length); const novaCarta = cartasFiltradas[idxAleat]; setCartaAtual(novaCarta);
        setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setMostrarFontes(false); setOpcoesEliminadas([]); setCartaRevelada(!gameState.ocultarCarta); setRolledNumber(null); setIsDieModalOpen(false); setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null); setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); if (novaCarta.tipo === "ContraTempo") { setTempoRestante(novaCarta.tempoLimite); }
    }, [gameState, currentGameSources]); // Depende do estado do jogo e das fontes atuais

    // Handlers de Seleção e Ações
    const handleSelecao = (id: number) => { if (!respondido) setSelecionado(id); };
    const handleSelecaoMultipla = (id: number) => { if (!respondido) { setSelecoesMultiplas((prev) => prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]); } };
    const handleSelecaoOrdem = (id: number) => { if (!respondido) { setOrdemSelecoes((prev) => prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]); } };
    const handleSelecionarColunaA = (id: number) => { if (respondido) return; const parExistenteIndex = paresFormados.findIndex(p => p.aId === id); if (parExistenteIndex > -1) { setParesFormados(prev => prev.filter((_, index) => index !== parExistenteIndex)); setSelecaoColunaA(null); } else { setSelecaoColunaA(id === selecaoColunaA ? null : id); } };
    const handleSelecionarColunaB = (id: number) => { if (respondido || selecaoColunaA === null) return; if (paresFormados.some(p => p.bId === id)) return; setParesFormados(prev => [...prev, { aId: selecaoColunaA, bId: id }]); setSelecaoColunaA(null); };
    const handleImagemClick = (event: React.MouseEvent<HTMLDivElement>) => { if (respondido || !cartaAtual || cartaAtual.tipo !== 'PontoCerto') return; const target = event.currentTarget; const rect = target.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height; const clampedX = Math.max(0, Math.min(1, x)); const clampedY = Math.max(0, Math.min(1, y)); setCoordenadasClique({ x: clampedX, y: clampedY }); };
    const handleSelecionarFragmento = (id: number) => { if (respondido) return; setFragmentosSelecionados(prev => [...prev, id]); };
    const limparFragmentos = () => { if (!respondido) { setFragmentosSelecionados([]); } };
    const verificarResposta = () => { if (!cartaAtual || !gameState || !gameState.players || gameState.currentPlayerId === null || respondido) return; const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId); if (!currentPlayer) return; let cor = false; let pontosGanhos = 20; let pontosPerdidos = 10; let darPuloDificil = cartaAtual.dificuldade === "dificil"; let mensagemFinal = ""; let aplicarEfeitoPadrao = false; if (cartaAtual.tipo === "ContraTempo" && timerIntervalRef.current) { clearInterval(timerIntervalRef.current); } switch (cartaAtual.tipo) { case "Pergunta": case "ContraTempo": if (cartaAtual.tipo === "ContraTempo" && (tempoRestante === null || tempoRestante <= 0)) { cor = false; } else { cor = selecionado === cartaAtual.respostaCorreta; } aplicarEfeitoPadrao = true; break; case "MultiplaEscolha": cor = Array.isArray(cartaAtual.respostaCorreta) && selecoesMultiplas.length === cartaAtual.respostaCorreta.length && selecoesMultiplas.sort().toString() === cartaAtual.respostaCorreta.sort().toString(); if (cor) pontosGanhos = 25; aplicarEfeitoPadrao = true; break; case "Ordem": cor = Array.isArray(cartaAtual.respostaCorreta) && ordemSelecoes.length === cartaAtual.respostaCorreta.length && ordemSelecoes.toString() === cartaAtual.respostaCorreta.toString(); if (cor) pontosGanhos = 30; darPuloDificil = true; aplicarEfeitoPadrao = true; break; case "RelacionarColunas": if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } cor = paresFormados.length === cartaAtual.respostaCorreta.length && paresFormados.map(p => `${p.aId}-${p.bId}`).sort().join(',') === cartaAtual.respostaCorreta.map(p => `${p.aId}-${p.bId}`).sort().join(','); if (cor) pontosGanhos = 30; darPuloDificil = true; aplicarEfeitoPadrao = true; break; case "PontoCerto": if (!coordenadasClique || !Array.isArray(cartaAtual.zonasClicaveis)) { cor = false; break; } const zonaCorreta = cartaAtual.zonasClicaveis.find(z => z.id === cartaAtual.respostaCorreta); cor = zonaCorreta ? isClickInZone(coordenadasClique, zonaCorreta) : false; if (cor) pontosGanhos = 25; darPuloDificil = true; aplicarEfeitoPadrao = true; break; case "CompletarFrase": if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } cor = fragmentosSelecionados.length === cartaAtual.respostaCorreta.length && fragmentosSelecionados.toString() === cartaAtual.respostaCorreta.toString(); if (cor) pontosGanhos = 25; darPuloDificil = true; aplicarEfeitoPadrao = true; break; case "Vantagem": if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } cor = selecionado !== null && cartaAtual.respostaCorreta.includes(selecionado); mensagemFinal = cor ? (cartaAtual.vantagem || "Vantagem aplicada!") : "Ação não confirmada."; break; case "Desvantagem": cor = false; mensagemFinal = cartaAtual.desvantagem || "Desvantagem aplicada."; break; case "Outras": if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } cor = selecionado !== null && cartaAtual.respostaCorreta.includes(selecionado); mensagemFinal = cor ? (cartaAtual.vantagem || 'Ok!') : (cartaAtual.desvantagem || 'Hmm...'); break; default: const _exhaustiveCheck: never = cartaAtual; console.error("Tipo não tratado:", _exhaustiveCheck); return; } setRespondido(true); if (aplicarEfeitoPadrao) { if (cor) { const novoProgresso = currentPlayer.progresso + pontosGanhos; const completouBarra = novoProgresso >= 100; const pulosGanhos = (completouBarra ? 1 : 0) + (darPuloDificil ? 1 : 0); const estrelasFixasGanhsa = completouBarra ? 1 : 0; updateCurrentPlayer({ respostasCertas: currentPlayer.respostasCertas + 1, respostasSeguidas: currentPlayer.respostasSeguidas + 1, progresso: completouBarra ? 0 : novoProgresso, pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + pulosGanhos, 2), fixedStars: currentPlayer.fixedStars + estrelasFixasGanhsa, }); mensagemFinal = `Correto! ${cartaAtual.vantagem || ''}${completouBarra ? ' Barra completa!' : ''}`; } else { updateCurrentPlayer({ respostasErradas: currentPlayer.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(currentPlayer.progresso - pontosPerdidos, 0), }); mensagemFinal = `Incorreto. ${cartaAtual.desvantagem || ''}`; } } setMensagem(mensagemFinal); };
    const resetarContadoresJogador = () => { /* ... */ }; const toggleDica = () => { /* ... */ }; const toggleFontes = () => { /* ... */ }; const pularPergunta = () => { const cp = gameState?.players.find(p => p.id === gameState.currentPlayerId); if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return; if (!tiposPergunta.includes(cartaAtual.tipo)) { setMensagem("Não pode pular este tipo."); return; } if (cp.pulosDisponiveis > 0) { updateCurrentPlayer({ pulosDisponiveis: cp.pulosDisponiveis - 1 }); setMensagem("Carta pulada!"); setTimeout(() => selecionarCartaAleatoria(), 500); } else { setMensagem("Sem pulos disponíveis."); } }; const eliminarRespostaErrada = () => { /* ... */ }; const voltarTelaInicial = () => { if (window.confirm("Voltar para a Tela Inicial? Progresso salvo.")) { setGameState(null); setCartaAtual(null); setNoCardsAvailable(false); setRespondido(false); setMensagem(""); setCurrentGameSources([]) } }; const diminuirAcertos = () => { /* ... */ }; const diminuirErros = () => { /* ... */ }; const incrementarContadorDeEstrelas = () => { /* ... */ }; const diminuirContadorDeEstrelas = () => { /* ... */ }; const incrementarRodadasPreso = () => { /* ... */ }; const diminuirRodadasPreso = () => { /* ... */ }; const rolarDado = () => { /* ... */ }; const handleLongPressStart = (action: () => void) => { /* ... */ }; const handleLongPressEnd = () => { /* ... */ };

    // --- Renderização do Jogo ---
    if (!isClientReady) { return <div className="flex items-center justify-center min-h-screen"><p>Carregando Interface...</p></div>; }
    if (!gameState) { let hasSaved = false; let initialPlayersData: Player[] = []; let initialOcultar = true; let initialProb = 0; if (typeof window !== "undefined") { const savedStateRaw = localStorage.getItem("estadoEcoChallenge"); try { const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null; if (savedState && savedState.jogoIniciado) { hasSaved = true; initialPlayersData = savedState.players || []; initialOcultar = savedState.ocultarCarta ?? true; initialProb = savedState.probabilityIndex ?? 0; } } catch {} } return (<TelaInicial onStartGame={handleGameStart} initialPlayers={initialPlayersData} initialOcultarCarta={initialOcultar} initialProbabilityIndex={initialProb} hasSavedGame={hasSaved} />); }

    const { players, currentPlayerId, ocultarCarta } = gameState;
    const currentPlayer = players.find(p => p.id === currentPlayerId);

    if (noCardsAvailable) { return (<div className="flex flex-col items-center justify-center min-h-screen p-4 text-center"><Card className="p-6 shadow-lg"><CardHeader><CardTitle className="text-xl text-red-600">Erro!</CardTitle></CardHeader><CardContent><p className="mb-4">Nenhuma carta disponível.</p><p className="text-sm text-gray-600 mb-4">Verifique filtros/categorias ou adicione baralhos na tela inicial.</p></CardContent><CardFooter><Button onClick={voltarTelaInicial} className="w-full">Voltar para Tela Inicial</Button></CardFooter></Card></div>); }
    if (!cartaAtual || !currentPlayer) { return (<div className="flex items-center justify-center min-h-screen"><p>Selecionando carta...</p><Button onClick={voltarTelaInicial} className="ml-4">Voltar</Button></div>); }

    const obterEstiloCarta = () => { if (ocultarCarta && !cartaRevelada) return "border-gray-300 bg-gray-100"; switch (cartaAtual.tipo) { case "Vantagem": return "border-green-500 bg-green-50"; case "Desvantagem": return "border-red-500 bg-red-50"; case "Outras": return "border-blue-500 bg-blue-50"; case "ContraTempo": return "border-yellow-500 bg-yellow-50"; default: return "border-gray-300 bg-white"; } };
    const isVerificarDisabled = () => { if (respondido) return true; switch (cartaAtual.tipo) { case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras": return selecionado === null; case "MultiplaEscolha": return selecoesMultiplas.length === 0; case "Ordem": return !(cartaAtual as CartaOrdem).opcoes || ordemSelecoes.length !== (cartaAtual as CartaOrdem).opcoes.length; case "RelacionarColunas": return !Array.isArray(cartaAtual.respostaCorreta) || paresFormados.length !== cartaAtual.respostaCorreta.length; case "PontoCerto": return coordenadasClique === null; case "CompletarFrase": return !Array.isArray(cartaAtual.respostaCorreta) || fragmentosSelecionados.length !== cartaAtual.respostaCorreta.length; default: return true; } };
    const getAlertVariant = (): "default" | "destructive" => { if (!mensagem) return "default"; const lowerMsg = mensagem.toLowerCase(); if (lowerMsg.includes('incorreto') || lowerMsg.includes('desvantagem') || lowerMsg.includes('tempo esgotado')) return "destructive"; if (lowerMsg.includes('correto') || lowerMsg.includes('vantagem')) return "default"; return "default"; };
    const isInfoAlert = !mensagem.toLowerCase().includes('correto') && !mensagem.toLowerCase().includes('vantagem') && !mensagem.toLowerCase().includes('incorreto') && !mensagem.toLowerCase().includes('desvantagem') && !mensagem.toLowerCase().includes('tempo esgotado') && cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem';

    return (
        <div className="flex flex-col items-center p-2 md:p-4 min-h-screen bg-gradient-to-b from-green-50 to-blue-50 font-sans">
             <Card className={cn("w-full max-w-lg mx-auto mt-4 shadow-xl border-2 rounded-lg", obterEstiloCarta())} style={players.length > 0 && currentPlayer && !(ocultarCarta && !cartaRevelada) ? { boxShadow: `0 0 15px 3px ${currentPlayer.color}` } : {}}>
                 <CardHeader className="pb-3">
                       <div className="flex justify-between items-start mb-2 gap-2">
                         <div className="flex items-center space-x-2 flex-1 min-w-0">
                             <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg md:text-xl font-bold leading-tight truncate" title={cartaAtual.titulo}> {ocultarCarta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo} </CardTitle>
                                {(!ocultarCarta || cartaRevelada) && ( <p className="text-xs text-gray-500 mt-1 truncate" title={(cartaAtual.categorias ? cartaAtual.categorias.join(", ") : '') + (cartaAtual.baralho && cartaAtual.baralho !== DEFAULT_BARALHO_NAME ? ` (${cartaAtual.baralho})` : '')}> {cartaAtual.categorias?.join(", ")} {cartaAtual.baralho && cartaAtual.baralho !== DEFAULT_BARALHO_NAME && ` (${cartaAtual.baralho})`} </p> )}
                            </div>
                        </div>
                         {(!ocultarCarta || cartaRevelada) && ( <Badge variant={ cartaAtual.dificuldade === "facil" ? "secondary" : cartaAtual.dificuldade === "normal" ? "default" : "destructive" } className="capitalize flex-shrink-0 h-6 ml-2"> {cartaAtual.dificuldade} </Badge> )}
                    </div>
                     {cartaAtual.tipo === "ContraTempo" && tempoRestante !== null && !respondido && cartaRevelada && ( <div className="mt-2"> <Progress value={(tempoRestante / ((cartaAtual as CartaContraTempo).tempoLimite || 30)) * 100} className="h-2 [&>*]:bg-yellow-500" /> <p className="text-center text-sm font-semibold text-yellow-700 mt-1"> <Timer className="inline h-4 w-4 mr-1" /> Tempo: {tempoRestante}s </p> </div> )}
                    {(!ocultarCarta || cartaRevelada) ? ( <ScrollArea className="h-64 md:h-80 rounded-md border p-3 mt-2 bg-white/80"> <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-img:my-2 prose-ul:my-1 prose-ol:my-1" dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta || '' }} /> </ScrollArea>
                    ) : ( <div className="h-64 md:h-80 flex flex-col items-center justify-center space-y-2 rounded-md border p-3 mt-2 bg-gray-200"> <EyeOff className="h-8 w-8 text-gray-500" /> <p className="text-sm text-gray-600">Carta Oculta</p> {rolledNumber !== null && <p className="text-lg font-bold">Dado: {rolledNumber}</p>} <Button onClick={rolarDado} variant="outline" size="sm" className="mt-2 bg-white" onMouseDown={() => handleLongPressStart(rolarDado)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart(rolarDado)} onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}> <Dice6 className="h-4 w-4 mr-1" /> Rolar Dado </Button> </div> )}
                </CardHeader>

                {(!ocultarCarta || cartaRevelada) && (
                    <CardContent className="pt-0 pb-4">
                        <div className="space-y-2">
                            {renderizarConteudoResposta()}
                        </div>
                        {mostrarDica && cartaAtual.dica && ( <Alert variant="default" className="mt-4 bg-blue-50 border-blue-300 text-blue-800"> <HelpCircle className="h-4 w-4 text-blue-700" /> <AlertDescription className="text-sm"> <strong>Dica:</strong> {cartaAtual.dica} </AlertDescription> </Alert> )}
                        {mostrarFontes && cartaAtual.fontes && cartaAtual.fontes.length > 0 && ( <Alert variant="default" className="mt-4 bg-gray-50 border-gray-300"> <BookOpen className="h-4 w-4 text-gray-700" /> <AlertDescription className="text-sm text-gray-800"> <strong>Fontes:</strong> <ul className="list-disc list-inside mt-1 text-xs"> {cartaAtual.fontes.map((fonte, idx) => (<li key={idx}>{fonte}</li>))} </ul> </AlertDescription> </Alert> )}
                    </CardContent>
                )}

                 <CardFooter className="flex flex-col items-center pt-4 border-t bg-gray-50/50 rounded-b-lg">
                     <div className="flex flex-wrap justify-center gap-1.5 w-full mb-3"> <Button onClick={toggleFontes} variant="outline" disabled={!cartaAtual.fontes || cartaAtual.fontes.length === 0 || (ocultarCarta && !cartaRevelada)} className="h-9 px-2.5"> <BookOpen className="h-5 w-5" /></Button> <Button onClick={pularPergunta} variant={currentPlayer.pulosDisponiveis > 0 ? "secondary" : "outline"} disabled={currentPlayer.pulosDisponiveis === 0 || !tiposPergunta.includes(cartaAtual.tipo) || respondido || (ocultarCarta && !cartaRevelada)} className="h-9 px-2.5"> <SkipForward className="h-5 w-5" /> </Button> <Button onClick={toggleDica} variant={currentPlayer.respostasSeguidas >= 2 && !dicaUsada && !!cartaAtual.dica ? "secondary" : "outline"} disabled={currentPlayer.respostasSeguidas < 2 || dicaUsada || !cartaAtual.dica || respondido || (ocultarCarta && !cartaRevelada)} className="h-9 px-2.5"> <HelpCircle className="h-5 w-5" /> </Button> <Button onClick={eliminarRespostaErrada} variant={currentPlayer.respostasSeguidas >= 2 ? "secondary" : "outline"} disabled={currentPlayer.respostasSeguidas < 2 || !("opcoes" in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || cartaAtual.opcoes.length <= 2 || !["Pergunta", "MultiplaEscolha", "ContraTempo", "Outras"].includes(cartaAtual.tipo) || respondido || (ocultarCarta && !cartaRevelada)} className="h-9 px-2.5"> <MinusCircle className="h-5 w-5" /> </Button> <Button onClick={resetarContadoresJogador} variant="outline" className="h-9 px-2.5"> <RotateCcw className="h-5 w-5" /> </Button> <Button onClick={voltarTelaInicial} variant="outline" className="h-9 px-2.5"> <Home className="h-5 w-5" /> </Button> </div>
                    <div className="flex flex-wrap justify-center gap-1.5 w-full mb-3"> <Button onClick={diminuirAcertos} variant="outline" className="h-9 px-2.5" title="Diminuir Acertos"><ThumbsUp className="h-5 w-5 text-green-500 transform scale-x-[-1]" /></Button> <Button onClick={diminuirErros} variant="outline" className="h-9 px-2.5" title="Diminuir Erros"><ThumbsDown className="h-5 w-5 text-red-500 transform scale-x-[-1]" /></Button> <Button onClick={diminuirContadorDeEstrelas} variant="outline" className="h-9 px-2.5" title="Diminuir Estrela Bônus"><Star className="h-5 w-5 text-red-500" /></Button> <Button onClick={incrementarContadorDeEstrelas} variant="outline" className="h-9 px-2.5" title="Aumentar Estrela Bônus"><Star className="h-5 w-5 text-yellow-500" /></Button> <Button onClick={diminuirRodadasPreso} variant="outline" className="h-9 px-2.5" title="Diminuir Rodada Preso"><ChevronUp className="h-5 w-5 text-red-500 transform rotate-180" /></Button> <Button onClick={incrementarRodadasPreso} variant="outline" className="h-9 px-2.5" title="Aumentar Rodada Preso"><ChevronUp className="h-5 w-5 text-purple-500" /></Button> </div>
                    <div className="w-full mb-3"> {ocultarCarta && !cartaRevelada ? ( <Button onClick={() => setCartaRevelada(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white"> <Eye className="mr-2 h-4 w-4"/> Revelar Carta </Button> ) : !respondido ? ( <Button onClick={isVerificarDisabled() ? undefined : verificarResposta} className={cn( "w-full bg-green-600 hover:bg-green-700 text-white", isVerificarDisabled() && "opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400" )} onMouseDown={() => handleLongPressStart(rolarDado)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart(rolarDado)} onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd} aria-disabled={isVerificarDisabled()} tabIndex={isVerificarDisabled() ? -1 : 0} > <Check className="mr-2 h-4 w-4"/> Verificar </Button> ) : ( <Button onClick={selecionarCartaAleatoria} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onMouseDown={() => handleLongPressStart(selecionarCartaAleatoria)} onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd} onTouchStart={() => handleLongPressStart(selecionarCartaAleatoria)} onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}> <SkipForward className="mr-2 h-4 w-4"/> Próxima Carta </Button> )} </div>
                    {mensagem && ( <Alert variant={getAlertVariant()} className={cn( 'text-center text-sm font-semibold mb-3 w-full', cartaAtual?.tipo === 'Vantagem' && 'bg-green-100 border-green-300 text-green-800', cartaAtual?.tipo === 'Desvantagem' && 'bg-red-100 border-red-300 text-red-800', cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'default' && isInfoAlert && 'bg-blue-100 border-blue-300 text-blue-800', cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'default' && !isInfoAlert && 'bg-green-100 border-green-300 text-green-800', cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'destructive' && 'bg-red-100 border-red-300 text-red-800' )}> <AlertDescription>{mensagem}</AlertDescription> </Alert> )}
                    <div className="w-full"> <Progress value={currentPlayer.progresso} className="h-2.5 [&>*]:bg-orange-500" /> <div className="flex justify-between items-center w-full mt-2 text-sm text-gray-700 flex-wrap gap-x-4 gap-y-1 font-semibold"> <span className="flex items-center" title="Rodadas Preso"><ChevronUp className="h-4 w-4 text-purple-500 mr-1"/>{currentPlayer.rodadasPreso}</span> <span className="flex items-center" title="Estrelas Fixas"><Award className="h-4 w-4 text-yellow-600 mr-1"/>{currentPlayer.fixedStars}</span> <span className="flex items-center" title="Estrelas Bônus"><Star className="h-4 w-4 text-yellow-500 mr-1"/>{currentPlayer.contadorDeEstrelas}</span> <span className="flex items-center" title="Pulos Disponíveis"><SkipForward className="h-4 w-4 text-blue-500 mr-1"/>{currentPlayer.pulosDisponiveis}</span> <span className="flex items-center" title="Respostas Corretas"><ThumbsUp className="h-4 w-4 text-green-500 mr-1"/>{currentPlayer.respostasCertas}</span> <span className="flex items-center" title="Respostas Erradas"><ThumbsDown className="h-4 w-4 text-red-500 mr-1"/>{currentPlayer.respostasErradas}</span> <span className="flex items-center" title="Respostas Seguidas"><Zap className="h-4 w-4 text-orange-500 mr-1"/>{currentPlayer.respostasSeguidas}</span> </div> </div>
                 </CardFooter>
            </Card>

             {/* Seleção de Jogador */}
             <div className="mt-6 w-full max-w-lg"> <p className="text-center text-sm font-medium mb-2 text-gray-800"> Vez de: <span style={{ color: currentPlayer.color }} className="font-bold">{currentPlayer.name}</span> </p> <div className={cn('grid gap-2', players.length > 4 ? (players.length > 6 ? "grid-cols-4" : "grid-cols-3") : `grid-cols-${Math.max(players.length, 1)}`)}> {players.map((pl) => ( <Button key={pl.id} onClick={() => updateGameState({ currentPlayerId: pl.id })} size="sm" variant={currentPlayerId === pl.id ? "default" : "outline"} className="truncate text-xs md:text-sm h-9" style={{ backgroundColor: currentPlayerId === pl.id ? pl.color : 'white', color: currentPlayerId === pl.id ? 'white' : pl.color, borderColor: pl.color, borderWidth: currentPlayerId === pl.id ? '2px' : '1px', }}>{pl.name}</Button>))} </div> </div>

            {/* Modal do Dado */}
            {isDieModalOpen && ( <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"><div className="bg-white p-6 rounded-lg shadow-xl text-center relative w-64 h-64 flex flex-col justify-center items-center"><Button className="absolute top-2 right-2" variant="ghost" size="icon" onClick={() => setIsDieModalOpen(false)} disabled={isRolling}><XIcon className="h-6 w-6 text-gray-500" /></Button>{isRolling ? (<><p className="text-lg mb-4 font-semibold">Rolando...</p><p className="text-7xl font-bold mb-6 animate-bounce">{rollingNumber}</p></>) : (<><p className="text-lg mb-2">Resultado:</p><p className="text-8xl font-bold mb-4">{rolledNumber}</p><Button onClick={rolarDado} size="lg"><Dice6 className="h-5 w-5 mr-2" /> Rolar Novamente</Button></>)}</div></div> )}
        </div>
    );

    function renderizarConteudoResposta() {
        if (!cartaAtual) return null;
        const buttonInlineStyle: React.CSSProperties = { maxHeight: "80px", height: "auto", overflowY: "auto", whiteSpace: "normal", alignItems: "flex-start", display: "flex", textAlign: "left", };

        switch (cartaAtual.tipo) {
            case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras": if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes)) return <p className="text-xs text-red-500">Erro: Opções inválidas.</p>; return cartaAtual.opcoes.map((op: Opcao) => { const isCorrect = Array.isArray(cartaAtual.respostaCorreta) ? cartaAtual.respostaCorreta.includes(op.id) : cartaAtual.respostaCorreta === op.id; const isSelected = selecionado === op.id; const isEliminated = opcoesEliminadas.includes(op.id); const isWrongSelection = respondido && isSelected && !isCorrect; let btnClass = "border-gray-300 text-gray-900 hover:bg-gray-100"; if (respondido) { if (isCorrect) btnClass = "bg-green-100 border-green-400 hover:bg-green-200 text-green-900"; else if (isSelected) btnClass = "bg-red-100 border-red-400 hover:bg-red-200 text-red-900"; else btnClass = "border-gray-300 text-gray-500"; } else if (isSelected) { btnClass = "bg-blue-100 border-blue-400 text-blue-900"; } return ( <Button key={op.id} onClick={() => handleSelecao(op.id)} variant={"outline"} className={cn( "w-full justify-start text-sm py-2 px-3", btnClass, isEliminated && "line-through opacity-50 cursor-not-allowed")} style={buttonInlineStyle} disabled={isEliminated || respondido}> <span className="flex-1">{op.texto}</span> {isCorrect && respondido && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />} {isWrongSelection && <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />} </Button> ); });
             case "MultiplaEscolha": if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes)) return <p className="text-xs text-red-500">Erro: Opções inválidas.</p>; return cartaAtual.opcoes.map((op: Opcao) => { const isCorrect = Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(op.id); const isSelected = selecoesMultiplas.includes(op.id); const isEliminated = opcoesEliminadas.includes(op.id); const isWrongSelection = respondido && isSelected && !isCorrect; const missedCorrect = respondido && isCorrect && !isSelected; let btnClass = "border-gray-300 text-gray-900 hover:bg-gray-100"; if (respondido) { if (isCorrect && isSelected) btnClass = "bg-green-100 border-green-400 text-green-900"; else if (isWrongSelection) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (missedCorrect) btnClass = "bg-blue-100 border-blue-400 text-blue-900"; else btnClass = "border-gray-300 text-gray-500"; } else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900"; } return ( <Button key={op.id} onClick={() => handleSelecaoMultipla(op.id)} variant="outline" className={cn( "w-full justify-start text-sm py-2 px-3", btnClass, isEliminated && "line-through opacity-50 cursor-not-allowed")} style={buttonInlineStyle} disabled={isEliminated || respondido}> <div className={cn("w-4 h-4 mr-2 border rounded flex-shrink-0 flex items-center justify-center", isSelected ? 'bg-blue-600 border-blue-700' : 'border-gray-400 bg-white')}>{isSelected && <Check className="w-3 h-3 text-white" />}</div> <span className="flex-1">{op.texto}</span> {isCorrect && respondido && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />} {isWrongSelection && <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />} {missedCorrect && <span title="Esta era correta" className="ml-2 text-blue-600 font-bold">✓</span>} </Button> ); });
            case "Ordem": if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || !Array.isArray(cartaAtual.respostaCorreta)) return <p className="text-xs text-red-500">Erro: Dados inválidos.</p>; const cOrdem = cartaAtual as CartaOrdem; return cOrdem.opcoes.map((op) => { const isSelected = ordemSelecoes.includes(op.id); const selectionIndex = isSelected ? ordemSelecoes.indexOf(op.id) + 1 : null; const correctIndex = Array.isArray(cOrdem.respostaCorreta) ? cOrdem.respostaCorreta.indexOf(op.id) + 1 : null; const isCorrectOrder = respondido && isSelected && selectionIndex === correctIndex; const isWrongOrder = respondido && isSelected && selectionIndex !== correctIndex; const isCorrectOptionOverall = respondido && correctIndex !== null && correctIndex > 0; let btnClass = "border-gray-300 text-gray-900 hover:bg-gray-100"; if (respondido) { if (isCorrectOrder) btnClass = "bg-green-100 border-green-400 text-green-900"; else if (isWrongOrder) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (isCorrectOptionOverall) btnClass = "border-gray-300 text-gray-700"; else btnClass = "border-gray-300 text-gray-500"; } else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900"; } return ( <Button key={op.id} onClick={() => handleSelecaoOrdem(op.id)} variant="outline" className={cn("w-full justify-start text-sm py-2 px-3", btnClass )} style={buttonInlineStyle} disabled={respondido}> {isSelected && !respondido && (<span className="mr-2 font-bold text-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-white ring-1 ring-blue-500">{selectionIndex}</span>)} <span className="flex-1">{op.texto}</span> {respondido && isCorrectOptionOverall && ( <> <span className={`ml-2 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 ${isCorrectOrder ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} title={isCorrectOrder ? `Posição Correta: ${correctIndex}` : `Sua Posição: ${selectionIndex}`}>{isCorrectOrder ? correctIndex : selectionIndex}</span> {isWrongOrder && correctIndex !== null && ( <span className="ml-1 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white" title={`Posição Correta: ${correctIndex}`}>{correctIndex}</span> )} </> )} </Button> ); });
            case "RelacionarColunas": const cRel = cartaAtual as CartaRelacionarColunas; if (!Array.isArray(cRel.colunaA) || !Array.isArray(cRel.colunaB) || !Array.isArray(cRel.respostaCorreta)) return <p className="text-xs text-red-500">Erro: Dados inválidos.</p>; return (<div className="flex space-x-2 md:space-x-4"> <div className="w-1/2 space-y-1.5"><p className="text-xs font-semibold text-center mb-1 text-gray-600">Coluna A</p>{cRel.colunaA.map(itemA => { const isSelectedA = selecaoColunaA === itemA.id; const par = paresFormados.find(p => p.aId === itemA.id); const parCorreto = respondido ? cRel.respostaCorreta.find(rc => rc.aId === itemA.id) : undefined; const isCorrectPair = respondido && par && parCorreto && par.bId === parCorreto.bId; const isWrongPair = respondido && par && (!parCorreto || par.bId !== parCorreto.bId); let btnClass = "border-gray-300 text-gray-900"; if (isSelectedA) btnClass = "ring-2 ring-blue-500 border-blue-500"; if (par && !respondido) btnClass = "bg-gray-200 border-gray-400"; if (isCorrectPair) btnClass = "bg-green-100 border-green-400 text-green-900"; if (isWrongPair) btnClass = "bg-red-100 border-red-400 text-red-900"; return (<Button key={`A-${itemA.id}`} variant="outline" onClick={() => handleSelecionarColunaA(itemA.id)} disabled={respondido} className={cn("w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal", btnClass)}><span className="flex-1">{itemA.texto}</span>{isCorrectPair && <CheckCircle2 className="ml-1 h-3.5 w-3.5 text-green-600 flex-shrink-0" />}{isWrongPair && <XCircle className="ml-1 h-3.5 w-3.5 text-red-600 flex-shrink-0" />}{isWrongPair && parCorreto && (<span className="text-[10px] ml-1 text-blue-600 hidden md:inline">({cRel.colunaB.find(iB => iB.id === parCorreto.bId)?.texto})</span>)}</Button>); })}</div> <div className="w-1/2 space-y-1.5"><p className="text-xs font-semibold text-center mb-1 text-gray-600">Coluna B</p>{cRel.colunaB.map(itemB => { const isPairedB = paresFormados.some(p => p.bId === itemB.id); const isDisabled = respondido || selecaoColunaA === null || isPairedB; let btnClass = "border-gray-300 hover:bg-gray-100 text-gray-900"; if (isPairedB) btnClass = "bg-gray-200 border-gray-400 text-gray-600"; return (<Button key={`B-${itemB.id}`} variant="outline" onClick={() => handleSelecionarColunaB(itemB.id)} disabled={isDisabled} className={cn("w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal", btnClass, !isDisabled && selecaoColunaA !== null && "hover:border-blue-400" )}><span className="flex-1">{itemB.texto}</span></Button>); })}</div></div>);
            case "PontoCerto": const cPonto = cartaAtual as CartaPontoCerto; if (!cPonto.imagemURL || !Array.isArray(cPonto.zonasClicaveis)) return <p className="text-xs text-red-500">Erro: Dados inválidos.</p>; return (<div className="relative w-full max-w-md mx-auto aspect-video overflow-hidden rounded border border-gray-300 cursor-crosshair" onClick={handleImagemClick} role="button" aria-label={`Imagem interativa: ${cPonto.titulo}`}><img src={cPonto.imagemURL} alt={`Imagem para: ${cPonto.titulo}`} className={`block w-full h-full object-contain ${respondido ? 'cursor-not-allowed' : ''}`}/>{coordenadasClique && (<div className={`absolute w-3 h-3 rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2 ${respondido ? (mensagem.toLowerCase().includes('correto') ? 'bg-green-500 border-white' : 'bg-red-500 border-white') : 'bg-blue-500 border-white'}`} style={{ left: `${coordenadasClique.x * 100}%`, top: `${coordenadasClique.y * 100}%` }}>{respondido && (mensagem.toLowerCase().includes('correto') ? <Check className="w-2 h-2 text-white" /> : <XIcon className="w-2 h-2 text-white" />)}</div>)}{respondido && (() => { const zonaCorreta = cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta); return zonaCorreta ? ( <div className="absolute border-2 border-dashed border-green-500 pointer-events-none animate-pulse" style={{ left: `${zonaCorreta.x * 100}%`, top: `${zonaCorreta.y * 100}%`, width: `${zonaCorreta.largura * 100}%`, height: `${zonaCorreta.altura * 100}%` }} title={zonaCorreta.descricao || "Área correta"}/> ) : null; })()} </div>);
            case "CompletarFrase": const cComp = cartaAtual as CartaCompletarFrase; if (!cComp.fraseIncompleta || !Array.isArray(cComp.fragmentos) || !Array.isArray(cComp.respostaCorreta)) return <p className="text-xs text-red-500">Erro: Dados inválidos.</p>; let fraseR = cComp.fraseIncompleta; fragmentosSelecionados.forEach((fragId, index) => { const frag = cComp.fragmentos.find(f => f.id === fragId); if (frag) { fraseR = fraseR.replace(`__${index + 1}__`, `<strong class="text-blue-600 underline underline-offset-2 mx-1">${frag.texto}</strong>`); } }); fraseR = fraseR.replace(/__\d+__/g, '<span class="text-gray-400 border-b border-dashed border-gray-400 mx-1">___</span>'); const isCorretoComp = respondido && mensagem.toLowerCase().includes('correto'); return (<div className="space-y-3"><div className={`p-3 border rounded bg-gray-50 text-sm ${respondido ? (isCorretoComp ? 'border-green-300' : 'border-red-300') : 'border-gray-300'}`} dangerouslySetInnerHTML={{ __html: fraseR }}/>{!respondido && (<div className="flex flex-wrap gap-2 justify-center">{cComp.fragmentos.filter(f => !fragmentosSelecionados.includes(f.id)).map(frag => (<Button key={frag.id} variant="outline" size="sm" onClick={() => handleSelecionarFragmento(frag.id)} className="bg-white hover:bg-blue-50">{frag.texto}</Button>))}{(fragmentosSelecionados.length > 0 && <Button variant="ghost" size="sm" onClick={limparFragmentos} className="text-red-500 hover:bg-red-100" title="Limpar"><RotateCcw className="h-4 w-4 mr-1"/> Limpar</Button>)}</div>)}{respondido && !isCorretoComp && (<div className="text-xs text-center text-green-700 mt-2"><strong>Resposta:</strong> {cComp.respostaCorreta.map(id => cComp.fragmentos.find(f => f.id === id)?.texto).join(' / ')}</div>)}</div>);
            default: return <p className="text-sm text-red-500">Erro: Tipo de carta não renderizado.</p>;
        }
    }

};

export default EcoChallenge; 