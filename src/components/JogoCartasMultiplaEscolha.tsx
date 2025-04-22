import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"; // Adicionado useMemo
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Importar Checkbox
import {
    CheckCircle2, XCircle, ThumbsUp, ThumbsDown, RotateCcw, HelpCircle,
    BookOpen, Home, SkipForward, Star, Award, MinusCircle, ChevronUp, Zap, Filter,
    Trash, EyeOff, Eye, Dice6, X as XIcon, Timer, Link2, MousePointerClick, Check, TextSelect,
    ChevronDown, ChevronRight // Ícones para expandir
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
// ===== MODIFICAÇÃO 1: Adicionar campo 'baralho' =====
interface CartaBase {
    id: string | number; tipo: string; titulo: string; pergunta: string;
    dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[];
    vantagem: string; desvantagem: string; dica: string;
    baralho?: string; // Nome do baralho interno (opcional)
}
// ===== FIM DA MODIFICAÇÃO 1 =====

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
    contadorDeEstrelas: number; rodadasPreso: number;
}
interface PlayerInput { id: number; name: string; color: string; showColorPicker?: boolean; }

// --- Novas Interfaces para Gerenciamento de Fontes e Baralhos ---
const DEFAULT_BARALHO_NAME = "Padrão"; // Nome padrão para cartas sem baralho definido

interface SourceInfo {
    id: string; // Pode ser o nome do built-in ou o ID numérico do custom deck
    name: string; // Nome para exibição
    type: 'builtin' | 'custom';
    cards: Carta[];
    internalBaralhos: string[]; // Nomes dos baralhos internos encontrados
    active: boolean; // Se a fonte (arquivo/built-in) está ativa
}

// --- Constantes ---
const predefinedColors = [/* ... cores ... */];
const probabilitySettings = [/* ... settings ... */];
const tiposPergunta: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];
const tiposEspeciais: Carta['tipo'][] = ["Vantagem", "Desvantagem", "Outras"];

// --- Carregamento Inicial e Estruturação ---

// Helper para extrair baralhos internos e atribuir padrão
function processCardsAndExtractBaralhos(cards: Carta[]): { processedCards: Carta[], internalBaralhos: string[] } {
    const baralhoSet = new Set<string>();
    const processedCards = cards.map(card => {
        const baralhoName = card.baralho?.trim() || DEFAULT_BARALHO_NAME;
        baralhoSet.add(baralhoName);
        return { ...card, baralho: baralhoName }; // Garante que a propriedade existe
    });
    return { processedCards, internalBaralhos: Array.from(baralhoSet).sort() };
}

// Processa os decks built-in
const builtInSourcesData: Omit<SourceInfo, 'active' | 'internalBaralhos'>[] = [
    { id: "manejoPlantadas", name: "Manejo Plantadas", type: 'builtin', cards: manejoPlantadas as Carta[] },
    { id: "manejoNativas", name: "Manejo Nativas", type: 'builtin', cards: manejoNativas as Carta[] },
    { id: "ecologiaFlorestal", name: "Ecologia Florestal", type: 'builtin', cards: ecologiaFlorestal as Carta[] },
    { id: "estrelasAliens", name: "Estrelas & Aliens (DLC)", type: 'builtin', cards: estrelasAliens as Carta[] },
    { id: "testCards", name: "Test Cards", type: 'builtin', cards: testCards as Carta[] },
];

// Inicializa as fontes built-in com baralhos processados
const initialBuiltInSources: SourceInfo[] = builtInSourcesData.map(source => {
    const { processedCards, internalBaralhos } = processCardsAndExtractBaralhos(source.cards);
    return {
        ...source,
        cards: processedCards,
        internalBaralhos: internalBaralhos,
        active: true // Ativo por padrão
    };
});


// --- Funções Utilitárias ---
function parseJSDeckFile(content: string): Carta[] { /* ... sem mudanças ... */ }

// Função para recalcular categorias baseada nos baralhos *ativos*
function recalcularCategoriasAtivas(
    allSources: SourceInfo[],
    activeInternalBaralhos: Record<string, Set<string>> // Chave é source.id (string)
): string[] {
    const activeCards: Carta[] = [];
    allSources.forEach(source => {
        // Considera apenas fontes ativas
        if (!source.active) return;

        const activeBaralhosForSource = activeInternalBaralhos[source.id];
        if (!activeBaralhosForSource) return; // Sanity check

        source.cards.forEach(card => {
            // Inclui a carta se seu baralho interno estiver ativo para esta fonte
            if (activeBaralhosForSource.has(card.baralho || DEFAULT_BARALHO_NAME)) {
                activeCards.push(card);
            }
        });
    });

    return Array.from(new Set(activeCards.flatMap(c => c.categorias || []))).sort();
}

function isClickInZone(clickCoords: { x: number; y: number } | null, zone: ZonaClicavel): boolean { /* ... sem mudanças ... */ }

// --- Componente TelaInicial ---
interface TelaInicialProps {
    onStartGame: (initialState?: Partial<GameState>) => void;
    // Não precisa mais passar categorias iniciais, será calculado
    initialPlayers: Player[];
    initialOcultarCarta: boolean;
    initialProbabilityIndex: number;
    hasSavedGame: boolean;
}

// Estado do Jogo (simplificado, o estado ativo dos baralhos fica na TelaInicial)
interface GameState {
    players: Player[];
    currentPlayerId: number | null;
    categoriasSelecionadas: string[];
    ocultarCarta: boolean;
    probabilityIndex: number;
    jogoIniciado: boolean;
    // Salva quais fontes e baralhos internos estavam ativos
    activeSourceIds: string[];
    activeInternalBaralhosState: Record<string, string[]>; // Salvar como array no localStorage
}

const TelaInicial: React.FC<TelaInicialProps> = ({
    onStartGame, initialPlayers, initialOcultarCarta, initialProbabilityIndex, hasSavedGame,
}) => {
    const [termoBuscaCategoria, setTermoBuscaCategoria] = useState("");
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]); // Começa vazio, será preenchido
    const [ocultarCarta, setOcultarCarta] = useState(initialOcultarCarta);
    const [probabilityIndex, setProbabilityIndex] = useState(initialProbabilityIndex);
    const [playerInputs, setPlayerInputs] = useState<PlayerInput[]>(() => /* ... sem mudanças ... */);

    // Estado para gerenciar todas as fontes (built-in + custom)
    const [allSources, setAllSources] = useState<SourceInfo[]>(() => {
         if (typeof window !== "undefined") {
             const savedCustom = localStorage.getItem("customSourceInfos");
             const savedBuiltInStatus = localStorage.getItem("builtInSourceStatus");
             let customSources: SourceInfo[] = [];
             let builtInStatus: Record<string, boolean> | null = null;

             try { customSources = savedCustom ? JSON.parse(savedCustom) : []; } catch { console.error("Erro ao carregar custom sources salvos."); customSources = []; }
             try { builtInStatus = savedBuiltInStatus ? JSON.parse(savedBuiltInStatus) : null; } catch { console.error("Erro ao carregar status built-in salvos."); builtInStatus = null; }

             const combined = [...initialBuiltInSources.map(bs => ({...bs, active: builtInStatus ? (builtInStatus[bs.id] ?? true) : true})), ...customSources];
             return combined;
         }
         return initialBuiltInSources;
    });

    // Estado para gerenciar baralhos internos ativos { sourceId: Set<baralhoName> }
    const [activeInternalBaralhos, setActiveInternalBaralhos] = useState<Record<string, Set<string>>>(() => {
        let initialState: Record<string, Set<string>> = {};
         if (typeof window !== "undefined") {
             const saved = localStorage.getItem("activeInternalBaralhos");
             try {
                 const parsed = saved ? JSON.parse(saved) : {};
                 // Converte arrays salvos de volta para Sets
                 Object.keys(parsed).forEach(key => {
                     if (Array.isArray(parsed[key])) {
                         initialState[key] = new Set(parsed[key]);
                     }
                 });
             } catch { console.error("Erro ao carregar baralhos internos ativos."); initialState = {}; }
         }

         // Garante que todas as fontes atuais tenham entrada, inicializando com todos ativos se não salvos
         allSources.forEach(source => {
             if (!initialState[source.id]) {
                 initialState[source.id] = new Set(source.internalBaralhos);
             } else {
                 // Garante que baralhos internos que podem ter sido adicionados depois estejam presentes
                 source.internalBaralhos.forEach(bName => {
                    // Poderia ter lógica aqui para não reativar se foi desativado antes, mas vamos manter simples por agora
                    if(!initialState[source.id]) initialState[source.id] = new Set(); // Cria se não existe
                    initialState[source.id].add(bName); // Adiciona (Set lida com duplicatas)

                 })
             }
         });
         return initialState;
    });

    // Estado para categorias disponíveis (calculado)
    const [todasCategorias, setTodasCategorias] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set()); // Para UI

    // Recalcular categorias sempre que fontes ou baralhos internos ativos mudarem
    useEffect(() => {
        const novasCategorias = recalcularCategoriasAtivas(allSources, activeInternalBaralhos);
        setTodasCategorias(novasCategorias);
        // Filtra categorias selecionadas para manter apenas as válidas
        setCategoriasSelecionadas((prev) => prev.filter(cat => novasCategorias.includes(cat)));
    }, [allSources, activeInternalBaralhos]);

    // Salvar estado da UI (fontes, baralhos ativos)
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Salva apenas os custom sources
            const customSourcesToSave = allSources.filter(s => s.type === 'custom');
            localStorage.setItem("customSourceInfos", JSON.stringify(customSourcesToSave));

            // Salva o status 'active' dos built-in sources
            const builtInStatusToSave: Record<string, boolean> = {};
            allSources.filter(s => s.type === 'builtin').forEach(s => { builtInStatusToSave[s.id] = s.active; });
            localStorage.setItem("builtInSourceStatus", JSON.stringify(builtInStatusToSave));

            // Converte Sets para Arrays antes de salvar
            const serializableActiveInternal = Object.entries(activeInternalBaralhos).reduce((acc, [key, value]) => {
                acc[key] = Array.from(value);
                return acc;
            }, {} as Record<string, string[]>);
            localStorage.setItem("activeInternalBaralhos", JSON.stringify(serializableActiveInternal));
        }
    }, [allSources, activeInternalBaralhos]);


    const handleCustomDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; if (!files) return; setIsLoading(true); setErrorMessage(null);
        let newCustomSources: SourceInfo[] = []; let errors: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i]; const content = await file.text();
            try {
                let loadedCards: Carta[] = [];
                const sourceName = file.name.replace(/\.(js|json)$/, "");
                const sourceId = `custom_${Date.now()}_${i}`; // ID único para a fonte custom

                if (allSources.some(s => s.name === sourceName && s.type === 'custom')) {
                    errors.push(`Arquivo/Fonte "${sourceName}" já carregado.`); continue;
                }

                if (file.name.endsWith(".js")) { loadedCards = parseJSDeckFile(content); }
                else if (file.name.endsWith(".json")) { const raw = JSON.parse(content) as any[]; loadedCards = raw.map((card, index) => ({ ...card, id: card.id || `${sourceId}_card_${index}` })) as Carta[]; }
                else { errors.push(`Formato não suportado: ${file.name}. Use .js ou .json.`); continue; }

                if (!Array.isArray(loadedCards) || loadedCards.length === 0) { errors.push(`Nenhuma carta válida encontrada em "${sourceName}".`); continue; }

                // Processa cartas e extrai baralhos internos
                const { processedCards, internalBaralhos } = processCardsAndExtractBaralhos(loadedCards);

                newCustomSources.push({
                    id: sourceId,
                    name: sourceName,
                    type: 'custom',
                    cards: processedCards,
                    internalBaralhos: internalBaralhos,
                    active: true // Ativo por padrão ao carregar
                });

            } catch (error: any) { errors.push(`Erro ao ler ${file.name}: ${error.message}`); }
        }

        if (newCustomSources.length > 0) {
            setAllSources(prev => [...prev, ...newCustomSources]);
            // Ativa todos os baralhos internos das novas fontes por padrão
            setActiveInternalBaralhos(prev => {
                const newState = { ...prev };
                newCustomSources.forEach(source => {
                    newState[source.id] = new Set(source.internalBaralhos);
                });
                return newState;
            });
             setExpandedSources(prev => { // Expande a nova fonte carregada
                const newSet = new Set(prev);
                newCustomSources.forEach(s => newSet.add(s.id));
                return newSet;
             });
        }
        if (errors.length > 0) { setErrorMessage(errors.join("\n")); }
        setIsLoading(false); e.target.value = '';
    };

    // Ativar/Desativar uma fonte (arquivo/built-in)
    const toggleSourceActive = (sourceId: string) => {
        setAllSources(prev => prev.map(s => s.id === sourceId ? { ...s, active: !s.active } : s));
         // Quando desativa uma fonte, pode ser útil desativar seus baralhos internos também
         // ou deixar como está para reativar depois. Vamos deixar como está por enquanto.
    };

    // Remover uma fonte custom
    const removeSource = (sourceId: string) => {
        const sourceToRemove = allSources.find(s => s.id === sourceId);
        if (!sourceToRemove || sourceToRemove.type !== 'custom') return; // Só remove custom

        if (window.confirm(`Remover fonte "${sourceToRemove.name}"?`)) {
            setAllSources(prev => prev.filter(s => s.id !== sourceId));
            // Remove a entrada dos baralhos internos ativos
            setActiveInternalBaralhos(prev => {
                const newState = { ...prev };
                delete newState[sourceId];
                return newState;
            });
        }
    }

     // Ativar/Desativar um baralho interno específico de uma fonte
    const toggleInternalBaralhoActive = (sourceId: string, baralhoName: string) => {
        setActiveInternalBaralhos(prev => {
            const currentSourceSet = prev[sourceId] ? new Set(prev[sourceId]) : new Set<string>();
            if (currentSourceSet.has(baralhoName)) {
                currentSourceSet.delete(baralhoName);
            } else {
                currentSourceSet.add(baralhoName);
            }
            return { ...prev, [sourceId]: currentSourceSet };
        });
    };

    const toggleExpandSource = (sourceId: string) => {
        setExpandedSources(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sourceId)) {
                newSet.delete(sourceId);
            } else {
                newSet.add(sourceId);
            }
            return newSet;
        });
    };


    // Funções de Jogador (sem mudanças)
    const addPlayerInput = () => { /* ... */ };
    const handlePlayerChange = (index: number, field: "name" | "color", value: string) => { /* ... */ };
    const toggleColorPicker = (index: number) => { /* ... */ };
    const deletePlayer = (index: number) => { /* ... */ };

    const handleStartGame = (continueGame = false) => {
        let gameStateToStart: Partial<GameState>;

        // Filtra apenas as cartas que pertencem aos baralhos internos ativos das fontes ativas
        const activeCardsForGame = allSources.flatMap(source => {
            if (!source.active) return [];
            const activeBaralhos = activeInternalBaralhos[source.id];
            if (!activeBaralhos || activeBaralhos.size === 0) return [];
            return source.cards.filter(card => activeBaralhos.has(card.baralho || DEFAULT_BARALHO_NAME));
        });

        // Filtra as categorias selecionadas para incluir apenas as presentes nas cartas ativas
        const finalCategorias = recalcularCategoriasAtivas(allSources, activeInternalBaralhos);
        const finalCategoriasSelecionadas = categoriasSelecionadas.filter(cat => finalCategorias.includes(cat));

        if (finalCategoriasSelecionadas.length === 0) {
            alert("Nenhuma categoria selecionada ou nenhuma categoria disponível com os baralhos ativos. Selecione categorias ou ative mais baralhos.");
            return;
        }
         if (playerInputs.length === 0) {
             alert("Adicione pelo menos um jogador.");
             return;
         }
         if (activeCardsForGame.filter(c => c.categorias?.some(cat => finalCategoriasSelecionadas.includes(cat))).length === 0) {
            alert("Nenhuma carta encontrada com a combinação de baralhos e categorias selecionadas.");
            return;
         }


        if (continueGame && typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
            try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                    // Recupera estado salvo, mas atualiza com seleções atuais da UI
                    gameStateToStart = {
                        ...savedState,
                        categoriasSelecionadas: finalCategoriasSelecionadas,
                        ocultarCarta: ocultarCarta,
                        probabilityIndex: probabilityIndex,
                        // Salva IDs das fontes e nomes dos baralhos internos ativos no momento de iniciar/continuar
                        activeSourceIds: allSources.filter(s => s.active).map(s => s.id),
                        activeInternalBaralhosState: Object.entries(activeInternalBaralhos).reduce((acc, [key, valueSet]) => {
                            if (allSources.find(s => s.id === key)?.active) { // Só salva baralhos de fontes ativas
                                acc[key] = Array.from(valueSet);
                            }
                            return acc;
                        }, {} as Record<string, string[]>),
                    };
                } else { return handleStartGame(false); } // Se não há jogo salvo válido, inicia novo
            } catch (e) { console.error("Erro ao carregar jogo salvo:", e); return handleStartGame(false); }
        } else {
            // Novo Jogo
            if (finalCategoriasSelecionadas.length === 0 || playerInputs.length === 0) {
                 alert("Selecione categorias e adicione jogadores.");
                 return;
            }
            const initializedPlayers: Player[] = playerInputs.map((input, index) => ({ id: index, name: input.name.trim() || `Jogador ${index + 1}`, color: input.color || predefinedColors[index % predefinedColors.length], fixedStars: 0, respostasCertas: 0, respostasErradas: 0, respostasSeguidas: 0, progresso: 0, pulosDisponiveis: 0, contadorDeEstrelas: 0, rodadasPreso: 0 }));
            gameStateToStart = {
                players: initializedPlayers,
                currentPlayerId: initializedPlayers[0]?.id ?? null,
                categoriasSelecionadas: finalCategoriasSelecionadas,
                ocultarCarta: ocultarCarta,
                probabilityIndex: probabilityIndex,
                jogoIniciado: true,
                activeSourceIds: allSources.filter(s => s.active).map(s => s.id),
                activeInternalBaralhosState: Object.entries(activeInternalBaralhos).reduce((acc, [key, valueSet]) => {
                    if (allSources.find(s => s.id === key)?.active) {
                        acc[key] = Array.from(valueSet);
                    }
                    return acc;
                }, {} as Record<string, string[]>),
            };
        }
        onStartGame(gameStateToStart);
    };

    const categoriasFiltradas = todasCategorias.filter((cat) => cat.toLowerCase().includes(termoBuscaCategoria.toLowerCase())).sort();
    const cycleProbability = () => { setProbabilityIndex((prevIndex) => (prevIndex + 1) % probabilitySettings.length); };

    return (
        <Card className="w-full max-w-lg mx-auto mt-8 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-700">Eco Challenge</CardTitle>
                <p className="text-sm text-center text-gray-600">O Jogo da Sustentabilidade</p>
            </CardHeader>
            <CardContent className="space-y-6">

                {/* ===== MODIFICAÇÃO: Seção de Fontes e Baralhos Internos ===== */}
                <div className="space-y-3">
                     <h3 className="text-lg font-semibold text-gray-800">Fontes de Cartas</h3>
                     <ScrollArea className="h-60 border rounded-md p-2 bg-gray-50 space-y-2">
                        {allSources.map((source) => (
                             <div key={source.id} className="border-b last:border-b-0 pb-2 mb-2">
                                <div className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded">
                                    {/* Checkbox para ativar/desativar a FONTE */}
                                    <Checkbox
                                        id={`source-${source.id}`}
                                        checked={source.active}
                                        onCheckedChange={() => toggleSourceActive(source.id)}
                                        className="mt-1"
                                    />
                                     <button
                                        onClick={() => toggleExpandSource(source.id)}
                                        className="flex items-center flex-1 text-left cursor-pointer"
                                    >
                                        {expandedSources.has(source.id) ? <ChevronDown className="h-4 w-4 mr-1 shrink-0"/> : <ChevronRight className="h-4 w-4 mr-1 shrink-0"/>}
                                        <label htmlFor={`source-${source.id}`} className="text-sm font-medium cursor-pointer truncate flex-1" title={source.name}>
                                            {source.name} <span className="text-xs text-gray-500">({source.type === 'builtin' ? 'Incluído' : 'Custom'})</span>
                                        </label>
                                    </button>
                                     {/* Botão de remover apenas para custom */}
                                     {source.type === 'custom' && (
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-7 w-7 p-0 text-red-500 hover:bg-red-100"
                                            onClick={() => removeSource(source.id)}
                                            aria-label={`Remover fonte ${source.name}`}
                                        >
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                 {/* Lista de Baralhos Internos (se a fonte estiver ativa e expandida) */}
                                 {source.active && expandedSources.has(source.id) && (
                                     <div className="pl-8 mt-1 space-y-1">
                                         {source.internalBaralhos.length > 0 ? source.internalBaralhos.map(baralhoName => (
                                             <div key={baralhoName} className="flex items-center space-x-2">
                                                 <Checkbox
                                                     id={`baralho-${source.id}-${baralhoName}`}
                                                     checked={activeInternalBaralhos[source.id]?.has(baralhoName) ?? false}
                                                     onCheckedChange={() => toggleInternalBaralhoActive(source.id, baralhoName)}
                                                 />
                                                 <label htmlFor={`baralho-${source.id}-${baralhoName}`} className="text-xs cursor-pointer">{baralhoName}</label>
                                             </div>
                                         )) : (
                                             <p className="text-xs italic text-gray-500">Nenhum baralho interno definido.</p>
                                         )}
                                     </div>
                                 )}
                            </div>
                        ))}
                     </ScrollArea>
                      {/* Input para carregar novos arquivos */}
                     <div className="mt-2 space-y-1">
                        <label className="text-sm font-medium">Carregar Arquivos (.js/.json)</label>
                         {errorMessage && (<Alert variant="destructive" className="text-xs"><AlertDescription>{errorMessage}</AlertDescription></Alert>)}
                        <Input
                            type="file"
                            multiple
                            accept=".js,.json"
                            onChange={handleCustomDeckUpload}
                            disabled={isLoading}
                            className="text-sm h-9"
                        />
                        {isLoading && <p className="text-xs text-blue-600">Carregando...</p>}
                     </div>
                 </div>
                 {/* ===== FIM DA MODIFICAÇÃO ===== */}

                {/* Seleção de Categorias (agora depende das fontes/baralhos ativos) */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">Categorias (dos baralhos ativos)</h3>
                    <Input
                        type="text"
                        placeholder="Pesquisar Categoria..."
                        value={termoBuscaCategoria}
                        onChange={(e) => setTermoBuscaCategoria(e.target.value)}
                        className="w-full p-2 border rounded h-9"
                    />
                    <ScrollArea className="h-40 border rounded-md p-3 bg-gray-50">
                        {categoriasFiltradas.length > 0 ? (
                            categoriasFiltradas.map((categoria) => (
                                <div key={categoria} className="flex items-center space-x-2 mb-1 hover:bg-gray-100 p-1 rounded">
                                    <Checkbox
                                        id={`cat-${categoria}`}
                                        checked={categoriasSelecionadas.includes(categoria)}
                                        onCheckedChange={() => {
                                            setCategoriasSelecionadas((prev) =>
                                                prev.includes(categoria)
                                                    ? prev.filter((c) => c !== categoria)
                                                    : [...prev, categoria]
                                            );
                                        }}
                                    />
                                    <label htmlFor={`cat-${categoria}`} className="text-sm cursor-pointer flex-1">{categoria}</label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">Nenhuma categoria disponível para os baralhos selecionados.</p>
                        )}
                    </ScrollArea>
                    <div className="flex space-x-2 mt-2">
                        <Button onClick={() => setCategoriasSelecionadas(todasCategorias)} variant="outline" size="sm" className="flex-1" disabled={todasCategorias.length === 0}>Todas</Button>
                        <Button onClick={() => setCategoriasSelecionadas([])} variant="outline" size="sm" className="flex-1">Nenhuma</Button>
                    </div>
                </div>

                {/* Configuração de Jogadores (sem mudanças) */}
                <div className="space-y-3">
                    {/* ... código dos jogadores ... */}
                </div>

                 {/* Opções de Jogo (sem mudanças) */}
                 <div className="space-y-3">
                     {/* ... código das opções (ocultar carta, probabilidade) ... */}
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
    // Removido estado mostrarSomentePerguntas daqui, será controlado pelo gameState
    const [rolledNumber, setRolledNumber] = useState<number | null>(null);
    const [rollingNumber, setRollingNumber] = useState<number | null>(null);
    const [isDieModalOpen, setIsDieModalOpen] = useState(false);
    const [isRolling, setIsRolling] = useState(false);

     // Memoize allSources para evitar recálculos desnecessários em selecionarCartaAleatoria
     const allSourcesMemo = useMemo(() => {
        // Recria a estrutura de fontes a partir dos dados brutos e do localStorage
         const customSourcesRaw = typeof window !== "undefined" ? localStorage.getItem("customSourceInfos") : null;
         const builtInStatusRaw = typeof window !== "undefined" ? localStorage.getItem("builtInSourceStatus") : null;
         let customSources: SourceInfo[] = [];
         let builtInStatus: Record<string, boolean> | null = null;

         try { customSources = customSourcesRaw ? JSON.parse(customSourcesRaw) : []; } catch { customSources = []; }
         try { builtInStatus = builtInStatusRaw ? JSON.parse(builtInStatusRaw) : null; } catch { builtInStatus = null; }

         const combined = [
             ...initialBuiltInSources.map(bs => ({...bs, active: builtInStatus?.[bs.id] ?? true })),
             ...customSources
         ];
         // Re-processa as cartas para garantir que 'baralho' exista (pode ser redundante se já feito na TelaInicial, mas garante consistência)
          return combined.map(source => {
             const { processedCards, internalBaralhos } = processCardsAndExtractBaralhos(source.cards);
             return {...source, cards: processedCards, internalBaralhos };
         });

     }, []); // Dependência vazia significa que só roda uma vez no mount


    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

    const updateGameState = useCallback((newState: Partial<GameState>) => {
        setGameState(prev => {
            if (!prev) return null;
            const updatedState = { ...prev, ...newState };
            if (typeof window !== "undefined") {
                try {
                    // Salva o estado do jogo SEM as fontes/baralhos internos (eles são salvos na TelaInicial)
                    const { activeSourceIds, activeInternalBaralhosState, ...stateToSave } = updatedState;
                    localStorage.setItem("estadoEcoChallenge", JSON.stringify(stateToSave));
                    // Salva separadamente os IDs ativos e baralhos internos (como array)
                    localStorage.setItem("activeSourceIds", JSON.stringify(activeSourceIds));
                    localStorage.setItem("activeInternalBaralhosState", JSON.stringify(activeInternalBaralhosState));

                } catch (e) { console.error("Erro ao salvar estado:", e); }
            }
            return updatedState;
        });
    }, []); // Removida dependência de mostrarSomentePerguntas

    const updateCurrentPlayer = useCallback((partialPlayerData: Partial<Player>) => { /* ... sem mudanças ... */ }, [gameState, updateGameState]);

    // Carregar estado inicial do JOGO
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
            const savedActiveSources = localStorage.getItem("activeSourceIds");
            const savedActiveInternal = localStorage.getItem("activeInternalBaralhosState");

            try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                    // Recupera estado do jogo
                     const activeSourceIds = savedActiveSources ? JSON.parse(savedActiveSources) : [];
                     const activeInternalBaralhosState = savedActiveInternal ? JSON.parse(savedActiveInternal) : {};

                     setGameState({
                         ...savedState,
                         activeSourceIds,
                         activeInternalBaralhosState
                    });
                    return;
                }
            } catch (e) { console.error("Erro ao carregar estado:", e); localStorage.removeItem("estadoEcoChallenge"); localStorage.removeItem("activeSourceIds"); localStorage.removeItem("activeInternalBaralhosState");}
        }
    }, []); // Roda apenas uma vez ao montar


    // ===== MODIFICAÇÃO: Lógica de seleção de carta =====
    const selecionarCartaAleatoria = useCallback(() => {
        if (!gameState || !allSourcesMemo) return; // Usa a versão memoizada das fontes
        const { categoriasSelecionadas, probabilityIndex, activeSourceIds, activeInternalBaralhosState } = gameState;
        const probabilidadeExcluirEspecial = probabilitySettings[probabilityIndex].value;
        const incluirCartasEspeciais = probabilidadeExcluirEspecial === 0 || Math.random() >= probabilidadeExcluirEspecial;

        // 1. Filtra fontes ativas
        const activeSources = allSourcesMemo.filter(s => activeSourceIds.includes(s.id));

        // 2. Filtra cartas baseado em baralhos internos ativos E categorias selecionadas
        const cartasFiltradas = activeSources.flatMap(source => {
            const activeBaralhosForSource = activeInternalBaralhosState[source.id];
            if (!activeBaralhosForSource || activeBaralhosForSource.length === 0) return []; // Pula fonte sem baralhos ativos

            return source.cards.filter(card => {
                // Checa baralho interno
                const baralhoAtivo = activeBaralhosForSource.includes(card.baralho || DEFAULT_BARALHO_NAME);
                if (!baralhoAtivo) return false;

                // Checa categoria
                const categoriaValida = card.categorias?.some(cat => categoriasSelecionadas.includes(cat));
                if (!categoriaValida) return false;

                // Checa tipo (se filtro de perguntas está ativo)
                const isTipoPergunta = tiposPergunta.includes(card.tipo);
                 // A lógica de `mostrarSomentePerguntas` precisa estar no estado do jogo se precisar ser persistida/usada aqui
                 // Assumindo que `gameState.ocultarCarta` não é o filtro de tipo (erro meu anterior?)
                 // Vamos adicionar um estado para isso se necessário, por agora ignorando esse filtro aqui
                 // if (mostrarSomentePerguntas && !isTipoPergunta) return false; // Requer estado no GameState

                // Checa exclusão de especiais
                const isTipoEspecial = tiposEspeciais.includes(card.tipo);
                if (!incluirCartasEspeciais && isTipoEspecial) return false;

                return true; // Passou por todos os filtros
            });
        });


        if (cartasFiltradas.length === 0) {
            setNoCardsAvailable(true); setCartaAtual(null); setMensagem("Nenhuma carta encontrada com os filtros atuais!"); return;
        }

        setNoCardsAvailable(false);
        const idxAleat = Math.floor(Math.random() * cartasFiltradas.length);
        const novaCarta = cartasFiltradas[idxAleat];
        setCartaAtual(novaCarta);

        // Resetar estados da rodada (sem mudanças aqui)
        setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setMostrarFontes(false);
        setOpcoesEliminadas([]); setCartaRevelada(!gameState.ocultarCarta); setRolledNumber(null); setIsDieModalOpen(false);
        setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null);
        setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]);

        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (novaCarta.tipo === "ContraTempo") { setTempoRestante(novaCarta.tempoLimite); }

    }, [gameState, allSourcesMemo]); // Depende do gameState e das fontes memoizadas
    // ===== FIM DA MODIFICAÇÃO =====

    // Resto dos useEffects, handlers e funções (verificarResposta, renderizarConteudoResposta, etc.) permanecem iguais...

    // ... (Restante do componente EcoChallenge) ...

     // --- Renderização ---
     if (!gameState) {
         // Lógica para carregar estado salvo ou mostrar TelaInicial
         const savedStateRaw = typeof window !== "undefined" ? localStorage.getItem("estadoEcoChallenge") : null;
         let savedState = null; try { savedState = savedStateRaw ? JSON.parse(savedStateRaw) : null; } catch {}
         const hasSaved = !!(savedState && savedState.jogoIniciado);
         // Passa props vazias ou padrões, a TelaInicial agora carrega seu próprio estado da UI
         return (<TelaInicial
                    onStartGame={(initialState) => { if (initialState) { setGameState(initialState as GameState); } }}
                    categoriasDisponiveis={[]} // Não mais necessário passar daqui
                    initialCategoriasSelecionadas={[]} // Não mais necessário
                    initialPlayers={initialPlayers} // Passa jogadores salvos (ou vazio)
                    initialOcultarCarta={savedState?.ocultarCarta ?? true}
                    initialProbabilityIndex={savedState?.probabilityIndex ?? 0}
                    hasSavedGame={hasSaved}
                />);
     }

     // Renderização do Jogo Ativo (sem grandes mudanças na estrutura principal, apenas na lógica de seleção)
     const { players, currentPlayerId, ocultarCarta } = gameState;
     const currentPlayer = players.find(p => p.id === currentPlayerId);

     if (noCardsAvailable) { /* ... render erro ... */ }
     if (!cartaAtual || !currentPlayer) { /* ... render loading ... */ }

    // ... (Restante do JSX de renderização do jogo) ...

        // --- Função de Renderização de Conteúdo da Resposta (com estilos inline) ---
        function renderizarConteudoResposta() {
           // ... (código da função como na resposta anterior, usando buttonInlineStyle) ...
           if (!cartaAtual) return null;

           const buttonInlineStyle = {
               maxHeight: "80px",
               height: "auto",
               overflowY: "auto" as React.CSSProperties['overflowY'],
               whiteSpace: "normal" as React.CSSProperties['whiteSpace'],
               alignItems: "flex-start",
               display: "flex",
               textAlign: "left" as React.CSSProperties['textAlign'],
           };

           switch (cartaAtual.tipo) {
                case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras":
                    return cartaAtual.opcoes.map((op) => {
                        const isCorrect = Array.isArray(cartaAtual.respostaCorreta) ? cartaAtual.respostaCorreta.includes(op.id) : cartaAtual.respostaCorreta === op.id;
                        const isSelected = selecionado === op.id;
                        const isEliminated = opcoesEliminadas.includes(op.id);
                        const isWrongSelection = respondido && isSelected && !isCorrect;
                        let btnClass = "border-gray-300 text-gray-900 hover:bg-gray-100";
                        if (respondido) {
                            if (isCorrect) btnClass = "bg-green-100 border-green-400 hover:bg-green-200 text-green-900";
                            else if (isSelected) btnClass = "bg-red-100 border-red-400 hover:bg-red-200 text-red-900";
                            else btnClass = "border-gray-300 text-gray-500";
                        } else if (isSelected) { btnClass = "bg-blue-100 border-blue-400 text-blue-900"; }
                        return (
                            <Button
                                key={op.id}
                                onClick={() => handleSelecao(op.id)}
                                variant={"outline"}
                                className={cn( "w-full justify-start text-sm py-2 px-3", btnClass, isEliminated && "line-through opacity-50 cursor-not-allowed")}
                                style={buttonInlineStyle}
                                disabled={isEliminated || respondido}
                            >
                                <span className="flex-1">{op.texto}</span>
                                {isCorrect && respondido && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />}
                                {isWrongSelection && <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />}
                            </Button>
                        );
                    });
                 case "MultiplaEscolha":
                    return cartaAtual.opcoes.map((op) => {
                        const isCorrect = Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(op.id);
                        const isSelected = selecoesMultiplas.includes(op.id);
                        const isEliminated = opcoesEliminadas.includes(op.id);
                        const isWrongSelection = respondido && isSelected && !isCorrect;
                        const missedCorrect = respondido && isCorrect && !isSelected;
                        let btnClass = "border-gray-300 text-gray-900 hover:bg-gray-100";
                        if (respondido) { if (isCorrect && isSelected) btnClass = "bg-green-100 border-green-400 text-green-900"; else if (isWrongSelection) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (missedCorrect) btnClass = "bg-blue-100 border-blue-400 text-blue-900"; else btnClass = "border-gray-300 text-gray-500"; }
                        else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900"; }
                        return (
                            <Button
                                key={op.id}
                                onClick={() => handleSelecaoMultipla(op.id)}
                                variant="outline"
                                 className={cn( "w-full justify-start text-sm py-2 px-3", btnClass, isEliminated && "line-through opacity-50 cursor-not-allowed")}
                                style={buttonInlineStyle}
                                disabled={isEliminated || respondido}
                            >
                                <div className={`w-4 h-4 mr-2 border rounded flex-shrink-0 flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-700' : 'border-gray-400 bg-white'}`}>{isSelected && <Check className="w-3 h-3 text-white" />}</div>
                                <span className="flex-1">{op.texto}</span>
                                {isCorrect && respondido && <CheckCircle2 className="ml-2 h-4 w-4 text-green-600 flex-shrink-0" />}
                                {isWrongSelection && <XCircle className="ml-2 h-4 w-4 text-red-600 flex-shrink-0" />}
                                {missedCorrect && <span title="Esta era correta" className="ml-2 text-blue-600">✓</span>}
                             </Button>
                        );
                    });
                case "Ordem":
                     const cOrdem = cartaAtual as CartaOrdem;
                     return cOrdem.opcoes.map((op) => {
                        const isSelected = ordemSelecoes.includes(op.id); const selectionIndex = isSelected ? ordemSelecoes.indexOf(op.id) + 1 : null;
                        const correctIndex = Array.isArray(cOrdem.respostaCorreta) ? cOrdem.respostaCorreta.indexOf(op.id) + 1 : null;
                        const isCorrectOrder = respondido && isSelected && selectionIndex === correctIndex; const isWrongOrder = respondido && isSelected && selectionIndex !== correctIndex;
                        const isCorrectOptionOverall = respondido && correctIndex !== null && correctIndex > 0;
                        let btnClass = "border-gray-300 text-gray-900 hover:bg-gray-100";
                        if (respondido) { if (isCorrectOrder) btnClass = "bg-green-100 border-green-400 text-green-900"; else if (isWrongOrder) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (isCorrectOptionOverall) btnClass = "border-gray-300 text-gray-700"; else btnClass = "border-gray-300 text-gray-500"; }
                        else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900"; }
                        return (
                            <Button
                                key={op.id}
                                onClick={() => handleSelecaoOrdem(op.id)}
                                variant="outline"
                                 className={cn("w-full justify-start text-sm py-2 px-3", btnClass )}
                                style={buttonInlineStyle}
                                disabled={respondido}
                            >
                                {isSelected && !respondido && (<span className="mr-2 font-bold text-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-white ring-1 ring-blue-500">{selectionIndex}</span>)}
                                <span className="flex-1">{op.texto}</span>
                                {respondido && isCorrectOptionOverall && (
                                    <> {/* Usar Fragment para agrupar os spans condicionais */}
                                        {/* Círculo Primário: Verde (correto) ou Vermelho (incorreto com a posição do usuário) */}
                                        <span
                                            className={`ml-2 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 ${
                                                isCorrectOrder ? 'bg-green-500 text-white' : 'bg-red-500 text-white' // Verde se correto, Vermelho se errado
                                            }`}
                                            title={isCorrectOrder ? `Posição Correta: ${correctIndex}` : `Sua Posição: ${selectionIndex}`}
                                        >
                                            {isCorrectOrder ? correctIndex : selectionIndex} {/* Mostra índice correto OU o selecionado pelo usuário */}
                                        </span>

                                        {/* Círculo Azul (Hint): Somente se a ordem estiver errada, mostra a posição correta */}
                                        {isWrongOrder && correctIndex !== null && (
                                            <span
                                                className="ml-1 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white"
                                                title={`Posição Correta: ${correctIndex}`}
                                            >
                                                {correctIndex}
                                            </span>
                                        )}
                                    </>
                                )}
                            </Button>
                        );
                    });
                // ... outros cases ...
                default: return <p className="text-sm text-red-500">Erro: Tipo de carta não renderizado.</p>;
           }
        }

};

export default EcoChallenge;