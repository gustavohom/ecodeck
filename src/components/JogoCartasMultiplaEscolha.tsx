import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Adicionado para a nova UI
import {
    CheckCircle2, XCircle, ThumbsUp, ThumbsDown, RotateCcw, HelpCircle,
    BookOpen, Home, SkipForward, Star, Award, MinusCircle, ChevronUp, Zap, Filter,
    Trash, EyeOff, Eye, Dice6, X as XIcon, Timer, Link2, MousePointerClick, Check, TextSelect,
    ChevronDown, ChevronRight // Adicionado para a nova UI
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // Assumindo que você tem este utilitário

// --- Importar Decks (Mantido do original) ---
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
    baralho?: string; // <-- Adicionado para a nova funcionalidade
}
// Tipos de Carta específicos (mantidos do original)
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

// Tipo Carta unificado (mantido do original)
type Carta =
    | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras
    | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;

// --- Interfaces de Jogador (Mantidas do original) ---
interface Player {
    id: number; name: string; color: string; fixedStars: number; respostasCertas: number;
    respostasErradas: number; respostasSeguidas: number; progresso: number; pulosDisponiveis: number;
    contadorDeEstrelas: number; rodadasPreso: number;
}
interface PlayerInput { id: number; name: string; color: string; showColorPicker?: boolean; }

// --- Novas Interfaces para Gerenciamento de Fontes e Baralhos (do Código 2) ---
const DEFAULT_BARALHO_NAME = "Padrão";
interface SourceInfo {
    id: string;             // Identificador único (builtin-nome ou custom-timestamp)
    name: string;           // Nome exibido (nome do arquivo ou nome do builtin)
    type: 'builtin' | 'custom';
    cards: Carta[];         // Cartas processadas (com baralho atribuído)
    internalBaralhos: Record<string, number>; // {'Nome Baralho Interno': contagem}
    totalCards: number;     // Contagem total de cartas na fonte
    active: boolean;        // Se a fonte está ativa (controlado pelo usuário)
}

// Estado do Jogo (Modificado para incluir a nova estrutura)
interface GameState {
    players: Player[];
    currentPlayerId: number | null;
    categoriasSelecionadas: string[]; // Categorias selecionadas pelo usuário
    ocultarCarta: boolean;
    probabilityIndex: number;
    jogoIniciado: boolean;
    // --- Campos específicos da nova funcionalidade ---
    activeSourceIds: string[];                // IDs das SourceInfo ativas no momento do início/salvamento
    activeInternalBaralhosState: Record<string, string[]>; // Estado serializável { sourceId: ['baralho1', 'baralho2'] }
}

// --- Constantes (Combinação do Original e Código 2) ---
const predefinedColors: string[] = [ "#9e0142","#f46d43","#fee08b","#66c2a5","#5e4fa2","#ff6699","#33a02c","#ff7f00", "#3288bd","#999999","#8dd3c7","#ffffb3","#fb8072","#80b1d3","#b3de69","#fccde5", "#bc80bd","#1f78b4","#e31a1c","#ffcc33","#6a3d9a","#b15928","#b2df8a","#cab2d6", "#a6cee3","#fb9a99","#fdbf6f","#ffed6f","#ccebc5","#ff4444", ];
const probabilitySettings = [ { value: 0, color: "#e5e7eb", label: "0%", textColor: "#1f2937" }, { value: 0.4, color: "#16a34a", label: "40%", textColor: "#ffffff" }, { value: 0.6, color: "#f97316", label: "60%", textColor: "#ffffff" }, { value: 0.8, color: "#dc2626", label: "80%", textColor: "#ffffff" }, ];
const tiposPergunta: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];
const tiposEspeciais: Carta['tipo'][] = ["Vantagem", "Desvantagem", "Outras"];

// --- Carregamento Inicial e Estruturação (Adaptado do Código 2) ---

// Função para processar cartas, extrair baralhos internos e contar
function processCardsAndExtractBaralhos(cards: Carta[]): { processedCards: Carta[], internalBaralhos: Record<string, number>, totalCards: number } {
    const baralhoCounts: Record<string, number> = {};
    let totalCards = 0;
    const processedCards = cards.map((card, index) => {
        // Garante que cada carta tenha um ID único, especialmente as sem ID original
        const uniqueId = card.id || `card_${Date.now()}_${index}_${Math.random().toString(16).slice(2)}`;
        const baralhoName = card.baralho?.trim() || DEFAULT_BARALHO_NAME;
        baralhoCounts[baralhoName] = (baralhoCounts[baralhoName] || 0) + 1;
        totalCards++;
        return { ...card, id: uniqueId, baralho: baralhoName };
    });

    // Ordena os nomes dos baralhos alfabeticamente para consistência
    const sortedBaralhoNames = Object.keys(baralhoCounts).sort((a, b) => {
        if (a === DEFAULT_BARALHO_NAME) return -1; // Mantém "Padrão" primeiro
        if (b === DEFAULT_BARALHO_NAME) return 1;
        return a.localeCompare(b);
    });
    const sortedInternalBaralhos: Record<string, number> = {};
    sortedBaralhoNames.forEach(name => {
        sortedInternalBaralhos[name] = baralhoCounts[name];
    });

    return { processedCards, internalBaralhos: sortedInternalBaralhos, totalCards };
}

// Define os dados das fontes built-in
const builtInSourcesData: Omit<SourceInfo, 'active' | 'internalBaralhos' | 'totalCards'>[] = [
    { id: "builtin-manejoPlantadas", name: "Manejo Plantadas", type: 'builtin', cards: manejoPlantadas as Carta[] },
    { id: "builtin-manejoNativas", name: "Manejo Nativas", type: 'builtin', cards: manejoNativas as Carta[] },
    { id: "builtin-ecologiaFlorestal", name: "Ecologia Florestal", type: 'builtin', cards: ecologiaFlorestal as Carta[] },
    { id: "builtin-estrelasAliens", name: "Estrelas & Aliens (DLC)", type: 'builtin', cards: estrelasAliens as Carta[] },
    { id: "builtin-testCards", name: "Test Cards", type: 'builtin', cards: testCards as Carta[] },
];

// Processa as fontes built-in para inicialização
const initialBuiltInSources: SourceInfo[] = builtInSourcesData.map(source => {
    const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards);
    // Define built-in como ativo por padrão inicialmente (será sobrescrito pelo localStorage se existir)
    return { ...source, cards: processedCards, internalBaralhos: internalBaralhos, totalCards, active: true };
});


// --- Funções Utilitárias (Combinação do Original e Código 2) ---

// Parser de arquivo JS (Mantido do original, mas com IDs mais robustos)
function parseJSDeckFile(content: string): Carta[] {
    try {
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) { throw new Error("Array de cartas não encontrado no arquivo JS."); }
        const arrayStr = match[1];
        // Usar Function constructor é um risco de segurança se o conteúdo não for confiável.
        // Alternativa mais segura seria usar uma biblioteca de parsing ou validar estritamente.
        // Por ora, mantemos a lógica original, ciente do risco.
        const rawArray = new Function(`return ${arrayStr};`)() as any[];
        if (!Array.isArray(rawArray)) { throw new Error("O conteúdo extraído não é um array."); }
        return rawArray.map((card, index) => ({
            ...card,
            // Garante ID único para cartas de arquivos JS
            id: card.id || `custom_js_${Date.now()}_${index}_${Math.random().toString(16).slice(2)}`
        })) as Carta[];
    } catch (error: any) {
        console.error("Erro ao processar arquivo JS:", error);
        throw new Error(`Erro ao processar arquivo JS: ${error.message}`);
    }
}

// Nova função para recalcular categorias ativas (do Código 2)
function recalcularCategoriasAtivas(
    allSources: SourceInfo[],
    activeInternalBaralhos: Record<string, Set<string>> // Recebe Sets para facilitar a verificação
): { categorias: string[], contagens: Record<string, number> } {
    const activeCards: Carta[] = [];
    const categoryCounts: Record<string, number> = {};

    allSources.forEach(source => {
        // Só considera fontes ativas
        if (!source.active) return;

        // Pega o Set de baralhos ativos para esta fonte
        const activeBaralhosForSource = activeInternalBaralhos[source.id];
        if (!activeBaralhosForSource || activeBaralhosForSource.size === 0) return; // Pula se não houver baralhos ativos para esta fonte

        // Itera sobre as cartas da fonte
        source.cards.forEach(card => {
            // Verifica se o baralho da carta está no Set de baralhos ativos
            if (activeBaralhosForSource.has(card.baralho || DEFAULT_BARALHO_NAME)) {
                activeCards.push(card);
                // Conta as categorias desta carta ativa
                (card.categorias || []).forEach(cat => {
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
                });
            }
        });
    });

    // Gera a lista final de categorias únicas e ordenadas
    const categorias = Array.from(new Set(Object.keys(categoryCounts))).sort();
    return { categorias, contagens: categoryCounts };
}

// Função isClickInZone (Mantida do original)
function isClickInZone(clickCoords: { x: number; y: number } | null, zone: ZonaClicavel): boolean {
    if (!clickCoords) return false;
    const { x, y } = clickCoords;
    return (x >= zone.x && x <= zone.x + zone.largura && y >= zone.y && y <= zone.y + zone.altura);
}

// --- Componente TelaInicial (Refatorado com a nova lógica) ---
interface TelaInicialProps {
    onStartGame: (gameState: Partial<GameState>, sourcesForGame: SourceInfo[]) => void; // Passa as fontes também
    // Props do estado inicial mantidos do original, para carregar o jogo salvo
    initialPlayers: Player[];
    initialOcultarCarta: boolean;
    initialProbabilityIndex: number;
    hasSavedGame: boolean;
}

const TelaInicial: React.FC<TelaInicialProps> = ({
    onStartGame, initialPlayers, initialOcultarCarta, initialProbabilityIndex, hasSavedGame,
}) => {
    const [termoBuscaCategoria, setTermoBuscaCategoria] = useState("");
    const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]); // Categorias selecionadas pelo usuário
    const [ocultarCarta, setOcultarCarta] = useState(initialOcultarCarta);
    const [probabilityIndex, setProbabilityIndex] = useState(initialProbabilityIndex);
    const [playerInputs, setPlayerInputs] = useState<PlayerInput[]>(() =>
        initialPlayers.length > 0
            ? initialPlayers.map((p) => ({ id: p.id, name: p.name, color: p.color, showColorPicker: false }))
            : [{ id: 0, name: "", color: predefinedColors[0], showColorPicker: false }]
    );

    // --- Estados para gerenciar fontes e baralhos ---
    const [allSources, setAllSources] = useState<SourceInfo[]>([]); // Todas as fontes (builtin + custom)
    const [activeInternalBaralhos, setActiveInternalBaralhos] = useState<Record<string, Set<string>>>({}); // { sourceId: Set<baralhoName> }
    const [todasCategorias, setTodasCategorias] = useState<string[]>([]); // Categorias disponíveis DADO os baralhos ativos
    const [categoriasComContagem, setCategoriasComContagem] = useState<Record<string, number>>({}); // { categoria: contagem }
    const [isLoading, setIsLoading] = useState(false); // Para upload de arquivos
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [expandedSources, setExpandedSources] = useState<Set<string>>(new Set()); // Quais fontes estão expandidas na UI
    const [isClient, setIsClient] = useState(false); // Para evitar SSR/hydration issues com localStorage

    // Efeito para carregar o estado da UI (fontes/baralhos ativos) do localStorage APÓS a montagem no cliente
    useEffect(() => {
        setIsClient(true); // Marca que estamos no cliente

        // Carrega fontes customizadas salvas
        const savedCustomRaw = localStorage.getItem("customSourceInfos");
        let loadedCustomSources: SourceInfo[] = [];
        try {
            // Faz parse e garante que 'cards' seja um array, mesmo que vazio, em caso de erro ou ausência
            const parsedCustom = savedCustomRaw ? JSON.parse(savedCustomRaw) : [];
            loadedCustomSources = Array.isArray(parsedCustom) ? parsedCustom.map(s => ({...s, cards: Array.isArray(s.cards) ? s.cards : []})) : [];
        } catch (e) {
            console.error("Erro ao carregar customSourceInfos do localStorage:", e);
            loadedCustomSources = []; // Reseta em caso de erro de parse
        }

        // Processa as fontes customizadas carregadas para garantir estrutura correta
        const processedCustomSources = loadedCustomSources.map(source => {
            const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards || []); // Usa || [] para segurança
            return { ...source, cards: processedCards, internalBaralhos, totalCards, type: 'custom' as const }; // Garante type: 'custom'
        });

        // Carrega o status salvo das fontes built-in (quais estavam ativas/inativas)
        const savedBuiltInStatusRaw = localStorage.getItem("builtInSourceStatus");
        let loadedBuiltInStatus: Record<string, boolean> | null = null;
        try {
            loadedBuiltInStatus = savedBuiltInStatusRaw ? JSON.parse(savedBuiltInStatusRaw) : null;
        } catch (e) {
            console.error("Erro ao carregar builtInSourceStatus do localStorage:", e);
            loadedBuiltInStatus = null;
        }

        // Combina as fontes built-in (aplicando o status salvo) com as customizadas
        const combinedSources = [
            ...initialBuiltInSources.map(bs => ({
                ...bs,
                // Usa o status salvo se existir, senão mantém o padrão (true)
                active: loadedBuiltInStatus ? (loadedBuiltInStatus[bs.id] ?? true) : true
            })),
            ...processedCustomSources
        ];
        setAllSources(combinedSources);

        // Carrega os baralhos internos ativos salvos
        const savedActiveInternalRaw = localStorage.getItem("activeInternalBaralhos");
        let initialActiveBaralhosState: Record<string, Set<string>> = {};
        try {
            const parsedActiveInternal = savedActiveInternalRaw ? JSON.parse(savedActiveInternalRaw) : {};
            // Converte o formato salvo (array de strings) de volta para Set<string>
            Object.keys(parsedActiveInternal).forEach(sourceId => {
                if (Array.isArray(parsedActiveInternal[sourceId])) {
                    initialActiveBaralhosState[sourceId] = new Set(parsedActiveInternal[sourceId]);
                }
            });
        } catch (e) {
            console.error("Erro ao carregar activeInternalBaralhos do localStorage:", e);
            initialActiveBaralhosState = {};
        }

        // Garante que cada fonte em combinedSources tenha uma entrada em initialActiveBaralhosState.
        // Se uma fonte não está no estado salvo, inicializa com todos os seus baralhos internos ativos.
        // Se está, verifica se baralhos foram adicionados/removidos na definição da fonte desde o último salvamento.
        combinedSources.forEach(source => {
            if (!initialActiveBaralhosState[source.id]) {
                // Fonte nova ou não salva antes: ativa todos os baralhos internos por padrão
                initialActiveBaralhosState[source.id] = new Set(Object.keys(source.internalBaralhos));
            } else {
                // Fonte já existia: garante que todos os baralhos *atuais* da fonte estejam no Set,
                // e remove quaisquer baralhos do Set que não existem mais na definição da fonte.
                const currentInternalBaralhoNames = Object.keys(source.internalBaralhos);
                const savedBaralhoSet = initialActiveBaralhosState[source.id];

                // Adiciona baralhos novos que não estavam no Set salvo
                currentInternalBaralhoNames.forEach(bName => {
                    if (!savedBaralhoSet.has(bName)) {
                        // Poderíamos decidir se baralhos novos devem começar ativos ou não.
                        // Aqui, vamos assumir que começam ativos para simplicidade.
                        // savedBaralhoSet.add(bName); // Descomente se quiser ativar novos automaticamente
                    }
                });

                // Remove baralhos do Set que não existem mais na fonte
                savedBaralhoSet.forEach(savedBName => {
                    if (!source.internalBaralhos[savedBName]) {
                        savedBaralhoSet.delete(savedBName);
                    }
                });
                 // Garante que se a fonte não tem baralhos internos, o set fique vazio
                 if (currentInternalBaralhoNames.length === 0) {
                    savedBaralhoSet.clear();
                 }
            }
        });
        setActiveInternalBaralhos(initialActiveBaralhosState);

    }, []); // Roda apenas uma vez na montagem do cliente

    // Efeito para recalcular categorias e contagens QUANDO as fontes ou baralhos ativos mudam
    useEffect(() => {
        // Só roda no cliente e depois da inicialização
        if (isClient) {
            const { categorias, contagens } = recalcularCategoriasAtivas(allSources, activeInternalBaralhos);
            setTodasCategorias(categorias);
            setCategoriasComContagem(contagens);
            // Filtra as categorias selecionadas para manter apenas as que ainda são válidas
            setCategoriasSelecionadas((prev) => prev.filter(cat => categorias.includes(cat)));
        }
    }, [allSources, activeInternalBaralhos, isClient]); // Depende das fontes e baralhos ativos

    // Efeito para salvar o estado da UI no localStorage QUANDO ele muda
    useEffect(() => {
        if (isClient) {
            // Salva apenas as fontes customizadas
            const customSourcesToSave = allSources.filter(s => s.type === 'custom');
            localStorage.setItem("customSourceInfos", JSON.stringify(customSourcesToSave));

            // Salva o status (ativo/inativo) das fontes built-in
            const builtInStatusToSave: Record<string, boolean> = {};
            allSources.filter(s => s.type === 'builtin').forEach(s => {
                builtInStatusToSave[s.id] = s.active;
            });
            localStorage.setItem("builtInSourceStatus", JSON.stringify(builtInStatusToSave));

            // Salva os baralhos internos ativos (convertendo Set para Array)
            const serializableActiveInternal = Object.entries(activeInternalBaralhos).reduce((acc, [key, valueSet]) => {
                acc[key] = Array.from(valueSet); // Converte Set para Array
                return acc;
            }, {} as Record<string, string[]>);
            localStorage.setItem("activeInternalBaralhos", JSON.stringify(serializableActiveInternal));
        }
    }, [allSources, activeInternalBaralhos, isClient]); // Depende das fontes e baralhos ativos

    // --- Handlers para a nova UI de Fontes/Baralhos ---

    const handleCustomDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        setIsLoading(true);
        setErrorMessage(null);
        let newCustomSources: SourceInfo[] = [];
        let errors: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const content = await file.text();
            try {
                let loadedCards: Carta[] = [];
                const sourceName = file.name.replace(/\.(js|json)$/, "");
                // Gera um ID único para a fonte customizada
                const sourceId = `custom_${Date.now()}_${i}_${Math.random().toString(16).slice(2)}`;

                // Verifica se já existe uma fonte customizada com o mesmo nome
                if (allSources.some(s => s.name === sourceName && s.type === 'custom')) {
                    errors.push(`Arquivo/Fonte "${sourceName}" já carregado.`);
                    continue; // Pula este arquivo
                }

                // Processa o arquivo .js ou .json
                if (file.name.endsWith(".js")) {
                    loadedCards = parseJSDeckFile(content);
                } else if (file.name.endsWith(".json")) {
                    const raw = JSON.parse(content) as any[];
                    if (!Array.isArray(raw)) throw new Error("JSON não contém um array de cartas.");
                    // Garante ID único para cartas de arquivos JSON
                    loadedCards = raw.map((card, index) => ({
                        ...card,
                        id: card.id || `${sourceId}_card_${index}_${Math.random().toString(16).slice(2)}`
                    })) as Carta[];
                } else {
                    errors.push(`Formato não suportado: ${file.name}. Use .js ou .json.`);
                    continue;
                }

                if (loadedCards.length === 0) {
                    errors.push(`Nenhuma carta válida encontrada em "${sourceName}".`);
                    continue;
                }

                // Processa as cartas carregadas para extrair baralhos internos
                const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(loadedCards);
                newCustomSources.push({
                    id: sourceId,
                    name: sourceName,
                    type: 'custom',
                    cards: processedCards,
                    internalBaralhos,
                    totalCards,
                    active: true // Nova fonte começa ativa
                });

            } catch (error: any) {
                errors.push(`Erro ao ler ${file.name}: ${error.message}`);
            }
        }

        // Adiciona as novas fontes ao estado
        if (newCustomSources.length > 0) {
            setAllSources(prev => [...prev, ...newCustomSources]);
            // Ativa todos os baralhos internos das novas fontes por padrão
            setActiveInternalBaralhos(prev => {
                const newState = { ...prev };
                newCustomSources.forEach(source => {
                    newState[source.id] = new Set(Object.keys(source.internalBaralhos));
                });
                return newState;
            });
            // Expande as novas fontes na UI
            setExpandedSources(prev => {
                const newSet = new Set(prev);
                newCustomSources.forEach(s => newSet.add(s.id));
                return newSet;
            });
        }

        // Exibe mensagens de erro, se houver
        if (errors.length > 0) {
            setErrorMessage(errors.join("\n"));
        }

        setIsLoading(false);
        e.target.value = ''; // Limpa o input de arquivo
    };

    // Ativa/desativa uma fonte inteira (SourceInfo)
    const toggleSourceActive = (sourceId: string) => {
        setAllSources(prev =>
            prev.map(s => (s.id === sourceId ? { ...s, active: !s.active } : s))
        );
        // Opcional: Poderia desativar/reativar baralhos internos quando a fonte é desativada/reativada,
        // mas a lógica de `recalcularCategoriasAtivas` já ignora fontes inativas,
        // então talvez não seja necessário mexer em `activeInternalBaralhos` aqui.
    };

    // Remove uma fonte customizada
    const removeSource = (sourceId: string) => {
        const sourceToRemove = allSources.find(s => s.id === sourceId);
        // Só permite remover fontes do tipo 'custom'
        if (!sourceToRemove || sourceToRemove.type !== 'custom') return;

        if (window.confirm(`Remover fonte "${sourceToRemove.name}"? Esta ação não pode ser desfeita.`)) {
            // Remove a fonte da lista principal
            setAllSources(prev => prev.filter(s => s.id !== sourceId));
            // Remove a entrada correspondente dos baralhos ativos
            setActiveInternalBaralhos(prev => {
                const newState = { ...prev };
                delete newState[sourceId];
                return newState;
            });
            // Remove a fonte dos expandidos
            setExpandedSources(prev => {
                const newSet = new Set(prev);
                newSet.delete(sourceId);
                return newSet;
            });
        }
    }

    // Ativa/desativa um baralho interno específico dentro de uma fonte
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

    // Expande/recolhe a lista de baralhos internos de uma fonte na UI
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

    // --- Handlers para Jogadores (Mantidos do original) ---
    const addPlayerInput = () => {
        if (playerInputs.length < 8) {
            setPlayerInputs([...playerInputs, {
                id: Date.now(), // Usar timestamp para ID único ao adicionar dinamicamente
                name: "",
                color: predefinedColors[playerInputs.length % predefinedColors.length],
                showColorPicker: false,
            }]);
        }
    };
    const handlePlayerChange = (id: number, field: "name" | "color", value: string) => {
        setPlayerInputs(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, [field]: value };
            }
            return p;
        }));
    };
    const toggleColorPicker = (id: number) => {
        setPlayerInputs(prev => prev.map(p =>
            p.id === id ? { ...p, showColorPicker: !p.showColorPicker } : { ...p, showColorPicker: false }
        ));
    };
    const deletePlayer = (id: number) => {
        // Só permite deletar se houver mais de um jogador
        if (playerInputs.length > 1) {
           setPlayerInputs((prev) => prev.filter((p) => p.id !== id));
        } else {
            // Ou talvez limpar o nome/cor do último jogador em vez de deletar?
            // Por ora, vamos impedir a exclusão do último.
             setErrorMessage("É necessário pelo menos um jogador.");
             setTimeout(() => setErrorMessage(null), 3000);
        }
    };


    // --- Lógica de Iniciar/Continuar Jogo (Adaptada) ---
    const handleStartGame = (continueGame = false) => {
        let gameStateToPass: Partial<GameState>; // O estado a ser passado para o componente principal
        let sourcesForGame: SourceInfo[] = [];    // As definições completas das fontes ativas para o jogo

        // 1. Validações Essenciais
        if (!isClient) { alert("Aguarde a inicialização completa."); return; }
        if (playerInputs.filter(p => p.name.trim()).length === 0) { // Verifica se há pelo menos um jogador com nome
             alert("Adicione e nomeie pelo menos um jogador."); return;
        }
        const activeSources = allSources.filter(s => s.active);
        if (activeSources.length === 0) {
            alert("Nenhuma Fonte de Cartas está ativa. Ative pelo menos uma fonte (Built-in ou Carregada)."); return;
        }
        const anyInternalDeckActive = activeSources.some(source => activeInternalBaralhos[source.id]?.size > 0);
        if (!anyInternalDeckActive) {
            alert("Nenhum baralho interno está ativo nas fontes selecionadas. Expanda as fontes ativas e selecione pelo menos um baralho interno."); return;
        }
        // Recalcula categorias *exatamente* com base no que está ativo agora
        const { categorias: finalCategoriasDisponiveis, contagens: finalContagens } = recalcularCategoriasAtivas(allSources, activeInternalBaralhos);
        // Filtra as categorias selecionadas pelo usuário para incluir apenas as realmente disponíveis
        const finalCategoriasSelecionadas = categoriasSelecionadas.filter(cat => finalCategoriasDisponiveis.includes(cat));
        if (finalCategoriasSelecionadas.length === 0) {
            alert("Nenhuma categoria selecionada ou nenhuma categoria disponível com os baralhos ativos. Selecione categorias válidas ou ative mais baralhos."); return;
        }
        // Verifica se *existem* cartas que correspondem à seleção final
        const finalActiveCards = activeSources.flatMap(source => {
             const activeBaralhosSet = activeInternalBaralhos[source.id];
             if (!activeBaralhosSet || activeBaralhosSet.size === 0) return [];
             return source.cards.filter(card =>
                 activeBaralhosSet.has(card.baralho || DEFAULT_BARALHO_NAME) &&
                 card.categorias?.some(cat => finalCategoriasSelecionadas.includes(cat))
             );
        });
        if (finalActiveCards.length === 0) {
             alert("Nenhuma carta encontrada com a combinação de baralhos e categorias selecionadas. Ajuste suas seleções."); return;
        }


        // 2. Preparar Dados para o Jogo
        sourcesForGame = activeSources; // Passa as definições das fontes ativas
        // Cria o estado serializável dos baralhos internos ativos para salvar no GameState
        const activeInternalBaralhosStateForSave = Object.entries(activeInternalBaralhos)
            .filter(([sourceId]) => sourcesForGame.some(s => s.id === sourceId)) // Inclui apenas fontes ativas
            .reduce((acc, [key, valueSet]) => {
                acc[key] = Array.from(valueSet); // Converte Set para Array
                return acc;
            }, {} as Record<string, string[]>);

        // 3. Lógica de Continuar ou Iniciar Novo Jogo
        if (continueGame && hasSavedGame && typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
            try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                    // Carrega o estado salvo, mas atualiza com as configurações da UI atual
                    // (exceto jogadores e progresso que vêm do save)
                    gameStateToPass = {
                        ...savedState, // Mantém players, currentPlayerId, etc do save
                        // Atualiza com as seleções atuais da UI:
                        categoriasSelecionadas: finalCategoriasSelecionadas, // Usa as categorias revalidadas
                        ocultarCarta: ocultarCarta,
                        probabilityIndex: probabilityIndex,
                        // Atualiza com as fontes e baralhos ativos atuais:
                        activeSourceIds: sourcesForGame.map(s => s.id),
                        activeInternalBaralhosState: activeInternalBaralhosStateForSave,
                        jogoIniciado: true,
                    };
                    console.log("Continuando jogo salvo com estado atualizado:", gameStateToPass);
                } else {
                    // Se o jogo salvo for inválido, inicia um novo
                    console.warn("Jogo salvo inválido encontrado. Iniciando novo jogo.");
                    return handleStartGame(false);
                }
            } catch (e) {
                console.error("Erro ao carregar jogo salvo:", e);
                // Se houver erro ao carregar, inicia um novo jogo
                return handleStartGame(false);
            }
        } else {
            // Iniciar Novo Jogo
            const initializedPlayers: Player[] = playerInputs
                .filter(input => input.name.trim() !== "") // Garante que apenas jogadores nomeados entrem
                .map((input, index) => ({
                    id: index, // IDs sequenciais para novo jogo (0, 1, 2...)
                    name: input.name.trim(),
                    color: input.color || predefinedColors[index % predefinedColors.length],
                    // Reseta todas as estatísticas para novo jogo
                    fixedStars: 0,
                    respostasCertas: 0,
                    respostasErradas: 0,
                    respostasSeguidas: 0,
                    progresso: 0,
                    pulosDisponiveis: 0,
                    contadorDeEstrelas: 0,
                    rodadasPreso: 0
            }));

            if (initializedPlayers.length === 0) {
                 alert("Nenhum jogador nomeado válido para iniciar o jogo."); return;
            }

            gameStateToPass = {
                players: initializedPlayers,
                currentPlayerId: initializedPlayers[0]?.id ?? null, // Começa com o primeiro jogador
                categoriasSelecionadas: finalCategoriasSelecionadas,
                ocultarCarta: ocultarCarta,
                probabilityIndex: probabilityIndex,
                activeSourceIds: sourcesForGame.map(s => s.id),
                activeInternalBaralhosState: activeInternalBaralhosStateForSave,
                jogoIniciado: true,
            };
             console.log("Iniciando novo jogo com estado:", gameStateToPass);
        }

        // 4. Chamar a função para iniciar o jogo no componente pai
        onStartGame(gameStateToPass, sourcesForGame);
    };

    // Filtra categorias para exibição com base na busca
    const categoriasFiltradasParaExibicao = useMemo(() => {
        return Object.entries(categoriasComContagem)
            .filter(([categoria]) => categoria.toLowerCase().includes(termoBuscaCategoria.toLowerCase()))
            .sort(([catA], [catB]) => catA.localeCompare(catB));
    }, [categoriasComContagem, termoBuscaCategoria]);

    // Ciclo de probabilidade (Mantido do original)
    const cycleProbability = () => { setProbabilityIndex((prevIndex) => (prevIndex + 1) % probabilitySettings.length); };

    // Separa fontes para a UI
    const builtInSourcesUI = allSources.filter(s => s.type === 'builtin');
    const customSourcesUI = allSources.filter(s => s.type === 'custom');

    // Evita renderizar no servidor ou antes do estado do cliente ser carregado
    if (!isClient) { return null; }

    return (
        <Card className="w-full max-w-lg mx-auto mt-8 mb-8 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-700">Eco Challenge</CardTitle>
                <p className="text-sm text-center text-gray-600">O Jogo da Sustentabilidade</p>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* --- Gerenciamento de Fontes e Baralhos (Nova UI) --- */}
                <div className="space-y-4">
                    {/* Baralhos Incluídos (Built-in) */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Baralhos Incluídos</h3>
                        <ScrollArea className="h-40 border rounded-md p-2 bg-gray-100 space-y-2">
                            {builtInSourcesUI.length > 0 ? builtInSourcesUI.map((source) => (
                                <div key={source.id} className="border-b last:border-b-0 pb-2 mb-2 bg-white px-2 py-1.5 rounded shadow-sm">
                                    {/* Linha da Fonte */}
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`source-${source.id}`}
                                            checked={source.active}
                                            onCheckedChange={() => toggleSourceActive(source.id)}
                                            aria-label={`Ativar/desativar fonte ${source.name}`}
                                            className="mt-1 flex-shrink-0"
                                        />
                                        <button
                                            onClick={() => toggleExpandSource(source.id)}
                                            className="flex items-center flex-1 text-left cursor-pointer min-w-0 group"
                                            aria-expanded={expandedSources.has(source.id)}
                                            aria-controls={`baralhos-${source.id}`}
                                        >
                                            {expandedSources.has(source.id)
                                                ? <ChevronDown className="h-4 w-4 mr-1.5 shrink-0 text-gray-500 group-hover:text-gray-700"/>
                                                : <ChevronRight className="h-4 w-4 mr-1.5 shrink-0 text-gray-500 group-hover:text-gray-700"/>
                                            }
                                            <label
                                                htmlFor={`source-${source.id}`} // Associar ao checkbox também
                                                className="text-sm font-medium cursor-pointer truncate flex-1 group-hover:text-blue-700"
                                                title={`${source.name} (${source.totalCards} cartas)`}
                                            >
                                                {source.name} <span className="text-gray-500">({source.totalCards})</span>
                                            </label>
                                        </button>
                                    </div>
                                    {/* Baralhos Internos (se fonte ativa e expandida) */}
                                    {source.active && expandedSources.has(source.id) && (
                                        <div id={`baralhos-${source.id}`} className="pl-7 mt-1.5 space-y-1">
                                            {Object.entries(source.internalBaralhos).length > 0 ? Object.entries(source.internalBaralhos).map(([baralhoName, count]) => (
                                                <div key={`${source.id}-${baralhoName}`} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`baralho-${source.id}-${baralhoName}`}
                                                        checked={activeInternalBaralhos[source.id]?.has(baralhoName) ?? false}
                                                        onCheckedChange={() => toggleInternalBaralhoActive(source.id, baralhoName)}
                                                        aria-label={`Ativar/desativar baralho interno ${baralhoName}`}
                                                        className="flex-shrink-0"
                                                    />
                                                    <label
                                                        htmlFor={`baralho-${source.id}-${baralhoName}`}
                                                        className="text-xs cursor-pointer text-gray-700 hover:text-black"
                                                        title={`${baralhoName} (${count} cartas)`}
                                                    >
                                                        {baralhoName} <span className="text-gray-500">({count})</span>
                                                    </label>
                                                </div>
                                            )) : (
                                                <p className="text-xs italic text-gray-500 pl-1">Nenhum baralho interno definido.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )) : (
                                <p className="text-sm text-gray-500 italic p-2">Nenhum baralho incluído encontrado.</p>
                            )}
                        </ScrollArea>
                    </div>

                    {/* Baralhos Carregados (Custom) */}
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Baralhos Carregados (Arquivos)</h3>
                        {errorMessage && (
                            <Alert variant="destructive" className="text-xs mb-2 py-1.5 px-3">
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                        )}
                        <Input
                            type="file"
                            multiple
                            accept=".js,.json"
                            onChange={handleCustomDeckUpload}
                            disabled={isLoading}
                            className="text-sm h-9 mb-2 w-full"
                            aria-label="Carregar arquivos de baralho (.js ou .json)"
                        />
                        {isLoading && <p className="text-xs text-blue-600 mb-2 ml-1">Carregando...</p>}
                        {customSourcesUI.length > 0 ? (
                            <ScrollArea className="h-40 border rounded-md p-2 bg-gray-100 space-y-2">
                                {customSourcesUI.map((source) => (
                                    <div key={source.id} className="border-b last:border-b-0 pb-2 mb-2 bg-white px-2 py-1.5 rounded shadow-sm">
                                        {/* Linha da Fonte Customizada */}
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`source-${source.id}`}
                                                checked={source.active}
                                                onCheckedChange={() => toggleSourceActive(source.id)}
                                                aria-label={`Ativar/desativar fonte ${source.name}`}
                                                className="mt-1 flex-shrink-0"
                                            />
                                            <button
                                                onClick={() => toggleExpandSource(source.id)}
                                                className="flex items-center flex-1 text-left cursor-pointer min-w-0 group"
                                                aria-expanded={expandedSources.has(source.id)}
                                                aria-controls={`baralhos-${source.id}`}
                                            >
                                                {expandedSources.has(source.id)
                                                    ? <ChevronDown className="h-4 w-4 mr-1.5 shrink-0 text-gray-500 group-hover:text-gray-700"/>
                                                    : <ChevronRight className="h-4 w-4 mr-1.5 shrink-0 text-gray-500 group-hover:text-gray-700"/>
                                                }
                                                <label
                                                    htmlFor={`source-${source.id}`}
                                                    className="text-sm font-medium cursor-pointer truncate flex-1 group-hover:text-blue-700"
                                                    title={`${source.name} (${source.totalCards} cartas)`}
                                                >
                                                    {source.name} <span className="text-gray-500">({source.totalCards})</span>
                                                </label>
                                            </button>
                                            {/* Botão de Remover */}
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-7 w-7 p-0 text-red-500 hover:bg-red-100 shrink-0"
                                                onClick={(e) => { e.stopPropagation(); removeSource(source.id); }} // Evita expandir/recolher ao clicar
                                                aria-label={`Remover fonte ${source.name}`}
                                                title={`Remover fonte ${source.name}`}
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        {/* Baralhos Internos (se fonte ativa e expandida) */}
                                        {source.active && expandedSources.has(source.id) && (
                                            <div id={`baralhos-${source.id}`} className="pl-7 mt-1.5 space-y-1">
                                                {Object.entries(source.internalBaralhos).length > 0 ? Object.entries(source.internalBaralhos).map(([baralhoName, count]) => (
                                                    <div key={`${source.id}-${baralhoName}`} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`baralho-${source.id}-${baralhoName}`}
                                                            checked={activeInternalBaralhos[source.id]?.has(baralhoName) ?? false}
                                                            onCheckedChange={() => toggleInternalBaralhoActive(source.id, baralhoName)}
                                                            aria-label={`Ativar/desativar baralho interno ${baralhoName}`}
                                                            className="flex-shrink-0"
                                                        />
                                                        <label
                                                            htmlFor={`baralho-${source.id}-${baralhoName}`}
                                                            className="text-xs cursor-pointer text-gray-700 hover:text-black"
                                                            title={`${baralhoName} (${count} cartas)`}
                                                        >
                                                            {baralhoName} <span className="text-gray-500">({count})</span>
                                                        </label>
                                                    </div>
                                                )) : (
                                                    <p className="text-xs italic text-gray-500 pl-1">Nenhum baralho interno definido neste arquivo.</p>
                                                )}
                                            </div>
                                        )}
                                   </div>
                               ))}
                           </ScrollArea>
                        ) : (
                            !isLoading && <p className="text-sm text-gray-500 italic p-2 border rounded bg-gray-100 text-center">Nenhum arquivo carregado.</p>
                        )}
                   </div>
                </div>

                {/* --- Seleção de Categorias (Baseada nos baralhos ativos) --- */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">Categorias <span className="text-sm font-normal text-gray-600">(dos baralhos ativos)</span></h3>
                    <Input
                        type="text"
                        placeholder="Pesquisar Categoria..."
                        value={termoBuscaCategoria}
                        onChange={(e) => setTermoBuscaCategoria(e.target.value)}
                        className="w-full p-2 border rounded h-9"
                        aria-label="Pesquisar categorias disponíveis"
                    />
                    <ScrollArea className="h-40 border rounded-md p-3 bg-gray-50">
                        {categoriasFiltradasParaExibicao.length > 0 ? (
                            categoriasFiltradasParaExibicao.map(([categoria, count]) => (
                                <div key={categoria} className="flex items-center space-x-2 mb-1 hover:bg-gray-100 p-1 rounded group">
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
                                        aria-label={`Selecionar categoria ${categoria}`}
                                    />
                                    <label
                                        htmlFor={`cat-${categoria}`}
                                        className="text-sm cursor-pointer flex-1 group-hover:text-blue-700"
                                        title={`${categoria} (${count} cartas disponíveis)`}
                                    >
                                        {categoria} <span className="text-gray-500">({count})</span>
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic text-center pt-4">Nenhuma categoria disponível para os baralhos selecionados.</p>
                        )}
                    </ScrollArea>
                    <div className="flex space-x-2 mt-2">
                        <Button
                            onClick={() => setCategoriasSelecionadas(todasCategorias)}
                            variant="outline" size="sm"
                            className="flex-1"
                            disabled={todasCategorias.length === 0}
                            title="Selecionar todas as categorias disponíveis"
                        >
                            Todas ({todasCategorias.length})
                        </Button>
                        <Button
                            onClick={() => setCategoriasSelecionadas([])}
                            variant="outline" size="sm"
                            className="flex-1"
                            title="Desselecionar todas as categorias"
                        >
                            Nenhuma
                        </Button>
                    </div>
                </div>

                {/* --- Configuração de Jogadores (Mantida do original, com correção no delete) --- */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Jogadores</h3>
                    <ScrollArea className="max-h-60 space-y-2 pr-2"> {/* Usar ScrollArea aqui também */}
                        {playerInputs.map((player, index) => (
                            <div key={player.id} className="border p-3 rounded-md shadow-sm bg-white relative mb-2">
                                <div className="flex items-center space-x-2">
                                    {/* Input Nome */}
                                    <Input
                                        type="text"
                                        placeholder={`Jogador ${index + 1}`}
                                        value={player.name}
                                        maxLength={15} // Aumentado um pouco
                                        onChange={(e) => handlePlayerChange(player.id, "name", e.target.value)}
                                        className="flex-grow h-8 text-sm"
                                        aria-label={`Nome do Jogador ${index + 1}`}
                                    />
                                    {/* Botão Cor */}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="w-8 h-8 flex-shrink-0 border-2"
                                        onClick={() => toggleColorPicker(player.id)}
                                        style={{ backgroundColor: player.color }}
                                        aria-label="Selecionar cor do jogador"
                                    />
                                    {/* Botão Deletar */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-8 h-8 flex-shrink-0 text-red-500 hover:bg-red-100"
                                        onClick={() => deletePlayer(player.id)}
                                        aria-label="Remover jogador"
                                        title="Remover Jogador"
                                        disabled={playerInputs.length <= 1} // Desabilita se for o último
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                {/* Color Picker */}
                                {player.showColorPicker && (
                                    <div className="absolute z-20 mt-2 right-12 w-48 bg-white border rounded-md shadow-lg p-2 grid grid-cols-6 gap-1">
                                        {predefinedColors.map((color, idx) => (
                                            <button
                                                key={idx}
                                                aria-label={`Selecionar cor ${color}`}
                                                style={{ backgroundColor: color }}
                                                className={cn(
                                                    'w-6 h-6 rounded border hover:ring-2 hover:ring-offset-1 hover:ring-gray-500',
                                                    player.color === color ? 'ring-2 ring-offset-1 ring-black' : 'border-gray-300'
                                                )}
                                                onClick={() => { handlePlayerChange(player.id, "color", color); toggleColorPicker(player.id); }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                    {/* Botão Adicionar Jogador */}
                    {playerInputs.length < 8 && (
                        <Button onClick={addPlayerInput} variant="secondary" className="w-full mt-1 h-9">
                            + Adicionar Jogador
                        </Button>
                    )}
                </div>

                {/* --- Opções de Jogo (Mantidas do original) --- */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Opções</h3>
                    {/* Botão Ocultar Carta */}
                    <Button
                        onClick={() => setOcultarCarta(!ocultarCarta)}
                        variant="outline"
                        className="w-full flex items-center justify-center space-x-2 h-9"
                        title={ocultarCarta ? "Clique para desativar o modo de ocultar carta" : "Clique para ativar o modo de ocultar carta"}
                    >
                        {ocultarCarta ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{ocultarCarta ? "Ocultar Carta Ativado" : "Ocultar Carta Desativado"}</span>
                    </Button>
                    {/* Botão Probabilidade */}
                    <Button
                        onClick={cycleProbability}
                        className="w-full flex items-center justify-center space-x-2 h-9"
                        style={{
                            backgroundColor: probabilitySettings[probabilityIndex].color,
                            color: probabilitySettings[probabilityIndex].textColor,
                            border: `1px solid ${probabilitySettings[probabilityIndex].textColor === '#ffffff' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)'}` // Adiciona borda sutil
                        }}
                        title={`Probabilidade de excluir cartas especiais (Vantagem/Desvantagem/Outras). Clique para alterar. Atual: ${probabilitySettings[probabilityIndex].label}`}
                    >
                        <span>% Excluir Especiais:</span>
                        <span className="font-bold">{probabilitySettings[probabilityIndex].label}</span>
                    </Button>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 pt-6 border-t">
                {/* Botão Continuar Jogo */}
                {hasSavedGame && (
                    <Button
                        onClick={() => handleStartGame(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 h-10"
                        disabled={isLoading} // Desabilita se estiver carregando arquivo
                    >
                        Continuar Jogo Salvo
                    </Button>
                )}
                {/* Botão Iniciar Jogo */}
                <Button
                    onClick={() => handleStartGame(false)}
                    className="w-full bg-green-600 hover:bg-green-700 h-10"
                    disabled={isLoading} // Desabilita se estiver carregando arquivo
                >
                    {hasSavedGame ? "Iniciar Novo Jogo" : "Iniciar Jogo"}
                </Button>
            </CardFooter>
        </Card>
    );
};


// --- Componente Principal EcoChallenge (Refatorado) ---
const EcoChallenge: React.FC = () => {
    // --- Estados do Jogo ---
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [currentGameSources, setCurrentGameSources] = useState<SourceInfo[]>([]); // Definições das fontes ativas neste jogo
    const [cartaAtual, setCartaAtual] = useState<Carta | null>(null);
    const [respondido, setRespondido] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [mostrarDica, setMostrarDica] = useState(false);
    const [dicaUsada, setDicaUsada] = useState(false);
    const [mostrarFontes, setMostrarFontes] = useState(false);
    const [opcoesEliminadas, setOpcoesEliminadas] = useState<number[]>([]);
    const [cartaRevelada, setCartaRevelada] = useState(false); // Para o modo 'Ocultar Carta'
    const [noCardsAvailable, setNoCardsAvailable] = useState(false); // Flag se não houver cartas válidas

    // --- Estados para Tipos de Resposta Específicos ---
    const [selecionado, setSelecionado] = useState<number | null>(null); // Pergunta, Vantagem, Desvantagem, Outras
    const [selecoesMultiplas, setSelecoesMultiplas] = useState<number[]>([]); // MultiplaEscolha
    const [ordemSelecoes, setOrdemSelecoes] = useState<number[]>([]); // Ordem
    const [tempoRestante, setTempoRestante] = useState<number | null>(null); // ContraTempo
    const [selecaoColunaA, setSelecaoColunaA] = useState<number | null>(null); // RelacionarColunas
    const [paresFormados, setParesFormados] = useState<{ aId: number; bId: number }[]>([]); // RelacionarColunas
    const [coordenadasClique, setCoordenadasClique] = useState<{ x: number; y: number } | null>(null); // PontoCerto
    const [fragmentosSelecionados, setFragmentosSelecionados] = useState<number[]>([]); // CompletarFrase

    // --- Estados para UI/Funcionalidades Extras ---
    const [mostrarSomentePerguntas, setMostrarSomentePerguntas] = useState(false); // Filtro interno (não implementado no original, mas presente)
    const [rolledNumber, setRolledNumber] = useState<number | null>(null); // Dado
    const [rollingNumber, setRollingNumber] = useState<number | null>(null); // Animação do Dado
    const [isDieModalOpen, setIsDieModalOpen] = useState(false); // Modal do Dado
    const [isRolling, setIsRolling] = useState(false); // Animação do Dado
    const [isClientReady, setIsClientReady] = useState(false); // Garante que o cliente está pronto

    // --- Refs ---
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null); // Timer ContraTempo
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null); // Long press para dado/próxima

    // --- Funções de Gerenciamento de Estado ---

    // Função chamada pela TelaInicial para iniciar/continuar o jogo
    const handleGameStart = useCallback((initialGameState?: Partial<GameState>, sourcesForGame?: SourceInfo[]) => {
        console.log("EcoChallenge: handleGameStart recebido", { initialGameState, sourcesForGame });
        // Verifica se recebeu dados válidos para iniciar
        if (initialGameState && initialGameState.jogoIniciado && sourcesForGame && sourcesForGame.length > 0) {
            setGameState(initialGameState as GameState);
            setCurrentGameSources(sourcesForGame);
            // Reseta estados específicos da carta/rodada
            setCartaAtual(null);
            setNoCardsAvailable(false);
            setRespondido(false);
            setMensagem("");
            setMostrarDica(false);
            setDicaUsada(false);
            setMostrarFontes(false);
            setOpcoesEliminadas([]);
            setSelecionado(null);
            setSelecoesMultiplas([]);
            setOrdemSelecoes([]);
            setTempoRestante(null);
            setSelecaoColunaA(null);
            setParesFormados([]);
            setCoordenadasClique(null);
            setFragmentosSelecionados([]);
            setRolledNumber(null);
            setIsDieModalOpen(false);
            // Define se a carta começa revelada baseado na opção do jogo
            setCartaRevelada(!(initialGameState.ocultarCarta ?? true)); // Usa ?? true como fallback
        }
        // Tenta reconstruir fontes se elas não foram passadas (caso de um carregamento antigo ou falho)
        else if (initialGameState && initialGameState.jogoIniciado && initialGameState.activeSourceIds) {
             console.warn("Tentando reconstruir fontes para jogo salvo (fallback)...");
             if (typeof window !== "undefined") {
                // Carrega definições salvas de fontes customizadas
                const customSourcesRaw = localStorage.getItem("customSourceInfos");
                const builtInStatusRaw = localStorage.getItem("builtInSourceStatus"); // Corrigido typo
                let customSources: SourceInfo[] = [];
                let builtInStatus: Record<string, boolean> | null = null;

                try { customSources = customSourcesRaw ? JSON.parse(customSourcesRaw) : []; } catch { customSources = []; }
                try { builtInStatus = builtInStatusRaw ? JSON.parse(builtInStatusRaw) : null; } catch { builtInStatus = null; }

                // Processa custom sources carregadas
                const processedCustomSources = customSources.map(source => {
                    const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards || []);
                    return { ...source, cards: processedCards, internalBaralhos, totalCards, type: 'custom' as const };
                });

                // Reconstrói a lista de fontes combinando built-in (com status salvo) e custom
                const reconstructedSources = [
                    ...initialBuiltInSources.map(bs => ({
                        ...bs,
                        active: builtInStatus?.[bs.id] ?? true // Usa status salvo ou default true
                    })),
                    ...processedCustomSources
                ].filter(s => initialGameState.activeSourceIds?.includes(s.id)); // Filtra apenas pelas IDs salvas no GameState

                if (reconstructedSources.length > 0) {
                    console.log("Fontes reconstruídas:", reconstructedSources);
                    setGameState(initialGameState as GameState);
                    setCurrentGameSources(reconstructedSources);
                     // Reseta estados da rodada como no caso normal
                    setCartaAtual(null); setNoCardsAvailable(false); setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setMostrarFontes(false); setOpcoesEliminadas([]); setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null); setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]); setRolledNumber(null); setIsDieModalOpen(false);
                    setCartaRevelada(!(initialGameState.ocultarCarta ?? true));
                } else {
                    console.error("Falha ao reconstruir fontes. Voltando para a tela inicial.");
                    setGameState(null); // Falha crítica, volta para tela inicial
                    setCurrentGameSources([]);
                }
             } else {
                 console.error("Não é possível reconstruir fontes fora do ambiente do navegador.");
                 setGameState(null);
                 setCurrentGameSources([]);
             }
        } else {
             console.error("handleGameStart chamado sem dados válidos. Voltando para tela inicial.");
             setGameState(null); // Estado inválido recebido, volta para tela inicial
             setCurrentGameSources([]);
        }
     }, []); // Dependências vazias, pois a função em si não muda

    // Atualiza o GameState e salva no localStorage
    const updateGameState = useCallback((newState: Partial<GameState>) => {
        setGameState(prev => {
            if (!prev) return null; // Não faz nada se o jogo não estiver iniciado
            const updatedState = { ...prev, ...newState };
            if (typeof window !== "undefined") {
                try {
                    // Salva o estado atualizado no localStorage
                    localStorage.setItem("estadoEcoChallenge", JSON.stringify(updatedState));
                } catch (e) {
                    console.error("Erro ao salvar estado do jogo:", e);
                    // Poderia tentar salvar um estado mais simples ou notificar o usuário
                }
            }
            return updatedState;
        });
    }, []); // Dependência vazia, a lógica interna é sempre a mesma

    // Atualiza dados específicos do jogador atual
    const updateCurrentPlayer = useCallback((partialPlayerData: Partial<Player>) => {
        if (!gameState || gameState.currentPlayerId === null) return;
        const updatedPlayers = gameState.players.map(p =>
            p.id === gameState.currentPlayerId ? { ...p, ...partialPlayerData } : p
        );
        updateGameState({ players: updatedPlayers });
    }, [gameState, updateGameState]); // Depende do gameState para acesso aos players e da função de update

    // Marca que o cliente está pronto após a montagem inicial
    useEffect(() => {
        setIsClientReady(true);
    }, []);

    // --- Lógica de Seleção de Carta (Adaptada) ---
    const selecionarCartaAleatoria = useCallback(() => {
        console.log("Selecionando nova carta...");
        if (!gameState || currentGameSources.length === 0) {
            console.error("Não é possível selecionar carta: gameState ou currentGameSources ausentes.");
            setNoCardsAvailable(true); // Marca que não há cartas
            setCartaAtual(null);
            return;
        }

        const { categoriasSelecionadas, probabilityIndex, activeInternalBaralhosState } = gameState;

        // Validação adicional: Garantir que activeInternalBaralhosState existe
        if (!activeInternalBaralhosState) {
            console.error("Estado de baralhos internos ativos ausente no GameState.");
            setNoCardsAvailable(true);
            setCartaAtual(null);
            return;
        }


        // Lógica de probabilidade para excluir cartas especiais
        const probabilidadeExcluirEspecial = probabilitySettings[probabilityIndex].value;
        const incluirCartasEspeciais = probabilidadeExcluirEspecial === 0 || Math.random() >= probabilidadeExcluirEspecial;

        // Filtra as cartas com base em: Fontes Ativas, Baralhos Internos Ativos, Categorias Selecionadas e Probabilidade
        const cartasFiltradas = currentGameSources.flatMap(source => {
            // Pega os baralhos ativos para esta fonte do GameState (formato array)
            const activeBaralhosArray = activeInternalBaralhosState[source.id];
            // Se não houver array ou estiver vazio, pula esta fonte
            if (!activeBaralhosArray || activeBaralhosArray.length === 0) return [];

            // Converte para Set para busca eficiente O(1)
            const activeBaralhoSet = new Set(activeBaralhosArray);

            // Filtra as cartas desta fonte
            return source.cards.filter(card => {
                // 1. Baralho da carta está ativo?
                const baralhoAtivo = activeBaralhoSet.has(card.baralho || DEFAULT_BARALHO_NAME);
                if (!baralhoAtivo) return false;

                // 2. Categoria da carta está selecionada? (Se a carta tiver categorias)
                // Se categoriasSelecionadas for vazio, talvez devesse incluir todas? Não, a UI força selecionar categorias.
                const categoriaValida = card.categorias?.some(cat => categoriasSelecionadas.includes(cat));
                if (!categoriaValida) return false;

                // 3. Deve incluir esta carta com base na probabilidade de especiais?
                const isTipoEspecial = tiposEspeciais.includes(card.tipo);
                if (!incluirCartasEspeciais && isTipoEspecial) return false; // Exclui se for especial e a probabilidade falhou

                // 4. (Opcional: Filtro 'Mostrar Somente Perguntas')
                if (mostrarSomentePerguntas && !tiposPergunta.includes(card.tipo)) return false;

                // Se passou por todos os filtros, inclui a carta
                return true;
            });
        });

        console.log(`Total de cartas filtradas disponíveis: ${cartasFiltradas.length}`);

        // Verifica se há cartas após filtrar
        if (cartasFiltradas.length === 0) {
            setNoCardsAvailable(true);
            setCartaAtual(null);
            setMensagem("Nenhuma carta encontrada com os filtros e baralhos ativos atuais!");
            console.warn("Nenhuma carta encontrada após filtragem.");
            return;
        }

        // Seleciona uma carta aleatória do pool filtrado
        setNoCardsAvailable(false);
        const idxAleat = Math.floor(Math.random() * cartasFiltradas.length);
        const novaCarta = cartasFiltradas[idxAleat];
        setCartaAtual(novaCarta);
        console.log("Nova carta selecionada:", novaCarta);

        // Reseta o estado da rodada para a nova carta
        setRespondido(false);
        setMensagem("");
        setMostrarDica(false);
        setDicaUsada(false);
        setMostrarFontes(false);
        setOpcoesEliminadas([]);
        setSelecionado(null);
        setSelecoesMultiplas([]);
        setOrdemSelecoes([]);
        setTempoRestante(null);
        setSelecaoColunaA(null);
        setParesFormados([]);
        setCoordenadasClique(null);
        setFragmentosSelecionados([]);
        setRolledNumber(null);
        setIsDieModalOpen(false);
        setCartaRevelada(!gameState.ocultarCarta); // Reseta baseado na configuração do jogo

        // Limpa timer anterior e inicia novo se for ContraTempo
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (novaCarta.tipo === "ContraTempo") {
            setTempoRestante(novaCarta.tempoLimite);
            console.log(`Iniciando timer para ContraTempo: ${novaCarta.tempoLimite}s`);
        }

    }, [gameState, currentGameSources, mostrarSomentePerguntas]); // Depende do estado do jogo, das fontes e do filtro opcional

    // Efeito para selecionar a primeira carta quando o jogo inicia ou fontes mudam
    // CORRIGIDO: Removido 'selecionarCartaAleatoria' das dependências
    useEffect(() => {
        // Roda SOMENTE se o jogo está iniciado, as fontes foram carregadas,
        // NÃO há uma carta atual E não estamos no estado de "sem cartas disponíveis"
        if (gameState?.jogoIniciado && currentGameSources.length > 0 && !cartaAtual && !noCardsAvailable) {
            console.log("Condição para selecionar primeira carta atendida. Chamando selecionarCartaAleatoria...");
            selecionarCartaAleatoria();
        }
    }, [gameState?.jogoIniciado, currentGameSources, cartaAtual, noCardsAvailable]); // Dependências corretas

    // Efeito para o Timer de ContraTempo (Mantido do original, com dependências revisadas)
    useEffect(() => {
        if (cartaAtual?.tipo === "ContraTempo" && tempoRestante !== null && tempoRestante > 0 && !respondido && gameState?.jogoIniciado && cartaRevelada) {
            console.log(`Timer ContraTempo rodando: ${tempoRestante}s restantes`);
            timerIntervalRef.current = setInterval(() => {
                setTempoRestante((prev) => {
                    if (prev === null || prev <= 1) {
                        clearInterval(timerIntervalRef.current!);
                        console.log("Tempo esgotado!");
                        setRespondido(true);
                        // Aplica penalidade por tempo esgotado
                        setMensagem(`Tempo esgotado! ${cartaAtual.desvantagem || 'Tente novamente.'}`);
                        // Atualiza jogador (sem usar updateCurrentPlayer diretamente aqui para evitar loop de dependência complexo)
                        setGameState(currentGameState => {
                           if (!currentGameState || currentGameState.currentPlayerId === null) return currentGameState;
                           const localCurrentPlayer = currentGameState.players.find(p => p.id === currentGameState.currentPlayerId);
                           if (localCurrentPlayer) {
                               const updatedPlayers = currentGameState.players.map(p =>
                                   p.id === currentGameState.currentPlayerId
                                       ? { ...p, respostasErradas: p.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(0, p.progresso - (cartaAtual.dificuldade === 'dificil' ? 15 : 10)) } // Penalidade maior para difícil
                                       : p
                               );
                               const finalState = { ...currentGameState, players: updatedPlayers };
                               // Salva o estado atualizado
                                if (typeof window !== "undefined") {
                                    localStorage.setItem("estadoEcoChallenge", JSON.stringify(finalState));
                                }
                               return finalState;
                           }
                           return currentGameState;
                       });
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timerIntervalRef.current && (respondido || tempoRestante === 0 || !cartaRevelada || !gameState?.jogoIniciado)) {
            // Limpa o timer se a resposta foi dada, o tempo acabou, a carta foi ocultada, ou o jogo terminou
            console.log("Limpando timer ContraTempo.");
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
        // Função de limpeza para desmontagem ou antes do próximo efeito
        return () => {
            if (timerIntervalRef.current) {
                console.log("Limpando timer ContraTempo na desmontagem/re-execução do efeito.");
                clearInterval(timerIntervalRef.current);
                timerIntervalRef.current = null;
            }
        };
    }, [cartaAtual, tempoRestante, respondido, gameState?.jogoIniciado, cartaRevelada, gameState?.currentPlayerId]); // Dependências incluem ID do jogador para recalcular penalidade


    // --- Handlers de Interação com a Carta (Mantidos do original) ---
    const handleSelecao = (id: number) => { if (!respondido) setSelecionado(id); };
    const handleSelecaoMultipla = (id: number) => { if (!respondido) { setSelecoesMultiplas((prev) => prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]); } };
    const handleSelecaoOrdem = (id: number) => { if (!respondido) { setOrdemSelecoes((prev) => prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]); } };
    const handleSelecionarColunaA = (id: number) => { if (respondido) return; const parExistenteIndex = paresFormados.findIndex(p => p.aId === id); if (parExistenteIndex > -1) { setParesFormados(prev => prev.filter((_, index) => index !== parExistenteIndex)); setSelecaoColunaA(null); } else { setSelecaoColunaA(id === selecaoColunaA ? null : id); } };
    const handleSelecionarColunaB = (id: number) => { if (respondido || selecaoColunaA === null) return; if (paresFormados.some(p => p.bId === id)) return; setParesFormados(prev => [...prev, { aId: selecaoColunaA, bId: id }]); setSelecaoColunaA(null); };
    const handleImagemClick = (event: React.MouseEvent<HTMLDivElement>) => { if (respondido || !cartaAtual || cartaAtual.tipo !== 'PontoCerto') return; const target = event.currentTarget; const rect = target.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height; const clampedX = Math.max(0, Math.min(1, x)); const clampedY = Math.max(0, Math.min(1, y)); setCoordenadasClique({ x: clampedX, y: clampedY }); };
    const handleSelecionarFragmento = (id: number) => { if (respondido) return; setFragmentosSelecionados(prev => [...prev, id]); };
    const limparFragmentos = () => { if (!respondido) { setFragmentosSelecionados([]); } };

    // --- Lógica de Verificação da Resposta (Mantida do original, com pequenos ajustes) ---
    const verificarResposta = () => {
        if (!cartaAtual || !gameState || !gameState.players || gameState.currentPlayerId === null || respondido) {
            console.warn("verificarResposta chamado em condição inválida.");
            return;
        }
        const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);
        if (!currentPlayer) {
            console.error("Jogador atual não encontrado no estado.");
            return;
        }

        console.log("Verificando resposta para:", cartaAtual.tipo, "por", currentPlayer.name);

        let cor = false; // Flag se a resposta está correta
        let pontosGanhos = 20; // Pontos base para acerto
        let pontosPerdidos = 10; // Pontos base para erro
        let darPuloDificil = false; // Flag se a carta concede pulo extra por dificuldade/tipo
        let mensagemFinal = ""; // Mensagem de feedback
        let aplicarEfeitoPadrao = false; // Flag para aplicar pontos/progresso padrão

        // Interrompe o timer de ContraTempo, se ativo
        if (cartaAtual.tipo === "ContraTempo" && timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }

        // Lógica de Verificação por Tipo de Carta
        switch (cartaAtual.tipo) {
            case "Pergunta":
            case "ContraTempo":
                // Verifica se o tempo esgotou primeiro para ContraTempo
                if (cartaAtual.tipo === "ContraTempo" && tempoRestante !== null && tempoRestante <= 0) {
                    cor = false; // Tempo esgotado conta como erro
                    mensagemFinal = mensagem || `Tempo esgotado! ${cartaAtual.desvantagem || 'Tente novamente.'}`; // Usa mensagem já definida se houver
                } else {
                    cor = selecionado === cartaAtual.respostaCorreta;
                }
                aplicarEfeitoPadrao = true;
                break;
            case "MultiplaEscolha":
                 // Verifica se respostaCorreta é um array antes de usar sort/toString
                cor = Array.isArray(cartaAtual.respostaCorreta) &&
                      selecoesMultiplas.length === cartaAtual.respostaCorreta.length &&
                      selecoesMultiplas.every(sel => cartaAtual.respostaCorreta.includes(sel)) &&
                      cartaAtual.respostaCorreta.every(res => selecoesMultiplas.includes(res));
                if (cor) pontosGanhos = 25;
                aplicarEfeitoPadrao = true;
                break;
            case "Ordem":
                cor = Array.isArray(cartaAtual.respostaCorreta) &&
                      ordemSelecoes.length === cartaAtual.respostaCorreta.length &&
                      ordemSelecoes.toString() === cartaAtual.respostaCorreta.toString();
                if (cor) pontosGanhos = 30;
                darPuloDificil = cor; // Pulo extra se acertar ordem
                aplicarEfeitoPadrao = true;
                break;
            case "RelacionarColunas":
                if (!Array.isArray(cartaAtual.respostaCorreta) || !Array.isArray(cartaAtual.colunaA) || !Array.isArray(cartaAtual.colunaB)) {
                    cor = false; break; // Dados inválidos
                }
                // Compara os pares formados com os corretos, ignorando a ordem
                const paresFormadosStr = paresFormados.map(p => `${p.aId}-${p.bId}`).sort().join(',');
                const paresCorretosStr = cartaAtual.respostaCorreta.map(p => `${p.aId}-${p.bId}`).sort().join(',');
                cor = paresFormados.length === cartaAtual.respostaCorreta.length && paresFormadosStr === paresCorretosStr;
                if (cor) pontosGanhos = 30;
                darPuloDificil = cor; // Pulo extra se acertar relacionar
                aplicarEfeitoPadrao = true;
                break;
            case "PontoCerto":
                if (!coordenadasClique || !Array.isArray(cartaAtual.zonasClicaveis)) {
                    cor = false; break; // Sem clique ou zonas inválidas
                }
                const zonaCorreta = cartaAtual.zonasClicaveis.find(z => z.id === cartaAtual.respostaCorreta);
                cor = zonaCorreta ? isClickInZone(coordenadasClique, zonaCorreta) : false;
                if (cor) pontosGanhos = 25;
                darPuloDificil = cor; // Pulo extra se acertar ponto certo
                aplicarEfeitoPadrao = true;
                break;
            case "CompletarFrase":
                if (!Array.isArray(cartaAtual.respostaCorreta) || !Array.isArray(cartaAtual.fragmentos)) {
                     cor = false; break; // Dados inválidos
                }
                cor = fragmentosSelecionados.length === cartaAtual.respostaCorreta.length &&
                      fragmentosSelecionados.toString() === cartaAtual.respostaCorreta.toString();
                if (cor) pontosGanhos = 25;
                darPuloDificil = cor; // Pulo extra se acertar completar frase
                aplicarEfeitoPadrao = true;
                break;

            // --- Tipos Especiais (sem efeito padrão de pontos/progresso) ---
            case "Vantagem":
                 // Verifica se selecionou uma das opções definidas como "corretas" para ativar o efeito
                cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado);
                 // A mensagem é *apenas* a vantagem/desvantagem definida na carta
                 // Se não selecionou nada ou selecionou uma opção inválida, não aplica efeito.
                 if (selecionado === null) {
                    mensagemFinal = "Nenhuma opção selecionada."; // Ou outra mensagem neutra
                 } else {
                    mensagemFinal = cor ? (cartaAtual.vantagem || "Vantagem aplicada!") : "Opção inválida selecionada."; // Ou pode usar a 'desvantagem' como feedback de erro se fizer sentido
                    // TODO: Aplicar efeito específico da vantagem AQUI se cor for true
                    // Exemplo: if(cor) { updateCurrentPlayer({ pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + 1, 2) }); }
                 }
                 aplicarEfeitoPadrao = false; // NÃO aplica pontos/progresso padrão
                 break;
            case "Desvantagem":
                cor = false; // Desvantagem nunca é "correta" no sentido de ganhar pontos
                 // A mensagem é a desvantagem definida na carta
                mensagemFinal = cartaAtual.desvantagem || "Desvantagem aplicada.";
                 // TODO: Aplicar efeito específico da desvantagem AQUI
                 // Exemplo: updateCurrentPlayer({ progresso: Math.max(currentPlayer.progresso - 15, 0) });
                 aplicarEfeitoPadrao = false; // NÃO aplica pontos/progresso padrão
                 break;
            case "Outras":
                 // Verifica se selecionou uma das opções definidas como "corretas" (que podem ter efeitos diferentes)
                cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado);
                 if (selecionado === null) {
                    mensagemFinal = "Nenhuma opção selecionada.";
                 } else {
                     // A mensagem depende da opção selecionada (se corresponde a vantagem ou desvantagem)
                     mensagemFinal = cor ? (cartaAtual.vantagem || 'Ok!') : (cartaAtual.desvantagem || 'Hmm...');
                     // TODO: Aplicar efeitos específicos baseados na escolha (selecionado) AQUI
                     // Exemplo: if(cor && selecionado === 1) { updateCurrentPlayer({ contadorDeEstrelas: currentPlayer.contadorDeEstrelas + 1 }); }
                     //          else if (!cor && selecionado === 2) { updateCurrentPlayer({ progresso: Math.max(currentPlayer.progresso - 20, 0) }); }
                 }
                 aplicarEfeitoPadrao = false; // NÃO aplica pontos/progresso padrão
                 break;
            default:
                // Garante que todos os tipos de carta sejam tratados (checagem exaustiva)
                const _exhaustiveCheck: never = cartaAtual;
                console.error("Tipo de carta não tratado na verificação:", _exhaustiveCheck);
                return; // Sai da função se o tipo for desconhecido
        }

        setRespondido(true); // Marca que a carta foi respondida

        // --- Atualiza Estado do Jogador e Define Mensagem Final ---
        if (aplicarEfeitoPadrao) {
            // Ajusta pontos ganhos/perdidos pela dificuldade
            if (cartaAtual.dificuldade === 'facil') { pontosGanhos *= 0.8; pontosPerdidos *= 0.8; }
            if (cartaAtual.dificuldade === 'dificil') { pontosGanhos *= 1.2; pontosPerdidos *= 1.2; }
            pontosGanhos = Math.round(pontosGanhos);
            pontosPerdidos = Math.round(pontosPerdidos);

            if (cor) {
                const novoProgresso = Math.min(100, currentPlayer.progresso + pontosGanhos); // Limita progresso a 100
                const completouBarra = novoProgresso >= 100;
                const pulosGanhosBase = completouBarra ? 1 : 0; // Ganha 1 pulo ao completar a barra
                const pulosGanhosExtra = darPuloDificil ? 1 : 0; // Ganha pulo extra por tipo/dificuldade
                const estrelasFixasGanhsa = completouBarra ? 1 : 0; // Ganha estrela fixa ao completar

                updateCurrentPlayer({
                    respostasCertas: currentPlayer.respostasCertas + 1,
                    respostasSeguidas: currentPlayer.respostasSeguidas + 1,
                    progresso: completouBarra ? 0 : novoProgresso, // Reseta se completou
                    // Limita pulos a 2 no máximo
                    pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + pulosGanhosBase + pulosGanhosExtra, 2),
                    fixedStars: currentPlayer.fixedStars + estrelasFixasGanhsa,
                });
                // Define mensagem padrão de acerto
                mensagemFinal = `Correto! ${cartaAtual.vantagem || ''}${completouBarra ? ' Barra completa! (+1 Estrela Fixa, +1 Pulo)' : ''}${!completouBarra && pulosGanhosExtra > 0 ? ' (+1 Pulo)' : ''}`;

            } else {
                updateCurrentPlayer({
                    respostasErradas: currentPlayer.respostasErradas + 1,
                    respostasSeguidas: 0, // Reseta sequência
                    progresso: Math.max(0, currentPlayer.progresso - pontosPerdidos), // Limita progresso a 0
                });

                // Define mensagem padrão de erro (sem mostrar resposta correta de Ordem, como no original)
                 let detalheErro = "";
                 if (cartaAtual.tipo === 'Pergunta' && 'respostaCorreta' in cartaAtual && 'opcoes' in cartaAtual) {
                     const opcaoCorreta = cartaAtual.opcoes.find(o => o.id === cartaAtual.respostaCorreta);
                     if (opcaoCorreta) detalheErro = ` Correto: ${opcaoCorreta.texto}.`;
                 } else if (cartaAtual.tipo === 'MultiplaEscolha' && Array.isArray(cartaAtual.respostaCorreta) && 'opcoes' in cartaAtual) {
                     const opcoesCorretas = cartaAtual.opcoes.filter(o => cartaAtual.respostaCorreta.includes(o.id)).map(o => o.texto).join(', ');
                     if (opcoesCorretas) detalheErro = ` Correto: ${opcoesCorretas}.`;
                 } // Não adiciona detalhe para 'Ordem' ou outros tipos complexos por padrão

                 // Usa a mensagem já definida se o tempo esgotou, senão cria a padrão
                mensagemFinal = mensagemFinal || `Incorreto. ${cartaAtual.desvantagem || ''}${detalheErro}`;
            }
        }

        // Define a mensagem final (seja de efeito padrão ou de carta especial)
        setMensagem(mensagemFinal.trim());
        console.log("Resultado:", cor ? "Correto" : "Incorreto", "| Mensagem:", mensagemFinal);
    };

    // --- Handlers para Ações do Jogador (Mantidos do original, com pequenas melhorias) ---
    const resetarContadoresJogador = () => {
        const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId);
        if (!cp) return;
        if (window.confirm(`Tem certeza que deseja resetar TODAS as estatísticas e progresso de ${cp.name}?`)) {
            updateCurrentPlayer({
                respostasCertas: 0, respostasErradas: 0, progresso: 0, pulosDisponiveis: 0,
                respostasSeguidas: 0, rodadasPreso: 0, contadorDeEstrelas: 0, fixedStars: 0
            });
            setMensagem(`${cp.name} teve suas estatísticas resetadas.`);
        }
    };

    const toggleDica = () => {
        const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId);
        if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return;
        if (dicaUsada) { setMensagem("Dica já utilizada nesta carta."); return; }
        if (!cartaAtual.dica) { setMensagem("Esta carta não possui dica."); return; }
        if (cp.respostasSeguidas >= 2) {
            setMostrarDica(true);
            setDicaUsada(true);
            updateCurrentPlayer({ respostasSeguidas: cp.respostasSeguidas - 2 }); // Custa 2 acertos seguidos
            setMensagem("Dica revelada! (-2 Acertos Seguidos)");
        } else {
            setMensagem("São necessários 2 acertos seguidos para usar a dica.");
        }
    };

    const toggleFontes = () => {
        if (!cartaAtual || (gameState?.ocultarCarta && !cartaRevelada)) return;
        if (cartaAtual.fontes && cartaAtual.fontes.length > 0) {
            setMostrarFontes(!mostrarFontes);
            if (!mostrarFontes) setMensagem("Fontes exibidas."); else setMensagem(""); // Limpa msg ao ocultar
        } else {
            setMensagem("Nenhuma fonte disponível para esta carta.");
        }
    };

    const pularPergunta = () => {
        const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId);
        if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return;
        // Só pode pular cartas que são efetivamente perguntas/desafios
        if (!tiposPergunta.includes(cartaAtual.tipo)) {
            setMensagem("Não é possível pular este tipo de carta (Vantagem/Desvantagem/Outras)."); return;
        }
        if (cp.pulosDisponiveis > 0) {
            updateCurrentPlayer({ pulosDisponiveis: cp.pulosDisponiveis - 1 });
            setMensagem("Carta pulada! Selecionando próxima...");
            // Atraso para o jogador ver a mensagem antes da próxima carta aparecer
            setTimeout(() => selecionarCartaAleatoria(), 600);
        } else {
            setMensagem("Você não tem pulos disponíveis.");
        }
    };

    const eliminarRespostaErrada = () => {
        const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId);
        if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return;

        // Verifica se a carta tem 'opcoes' e é de um tipo aplicável
        const tiposEliminaveis: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "ContraTempo", "Outras"]; // Adicionado Outras
        if (!tiposEliminaveis.includes(cartaAtual.tipo) || !('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes)) {
             setMensagem("Não é possível eliminar opções para este tipo de carta."); return;
        }

        // Verifica se há opções suficientes para eliminar
        const opcoesAtivas = cartaAtual.opcoes.filter(op => !opcoesEliminadas.includes(op.id));
        if (opcoesAtivas.length <= 2) { // Não elimina se restarem 2 ou menos opções
            setMensagem("Não é possível eliminar mais opções."); return;
        }

        // Verifica custo (2 acertos seguidos)
        if (cp.respostasSeguidas < 2) {
            setMensagem("São necessários 2 acertos seguidos para eliminar uma opção."); return;
        }

        // Determina quais são as opções corretas
        let respostaCorretaIds: number[] = [];
        if ('respostaCorreta' in cartaAtual) {
             if (Array.isArray(cartaAtual.respostaCorreta)) {
                 respostaCorretaIds = cartaAtual.respostaCorreta.filter(id => typeof id === 'number');
             } else if (typeof cartaAtual.respostaCorreta === 'number') {
                 respostaCorretaIds = [cartaAtual.respostaCorreta];
             }
        }

        // Encontra as opções que são erradas E ainda não foram eliminadas
        const opcoesErradasDisponiveis = cartaAtual.opcoes.filter(op =>
            !respostaCorretaIds.includes(op.id) &&
            !opcoesEliminadas.includes(op.id)
        );

        if (opcoesErradasDisponiveis.length > 0) {
            // Escolhe aleatoriamente uma das erradas disponíveis
            const idxAleat = Math.floor(Math.random() * opcoesErradasDisponiveis.length);
            const opcaoEliminadaId = opcoesErradasDisponiveis[idxAleat].id;
            setOpcoesEliminadas((prev) => [...prev, opcaoEliminadaId]);
            // Aplica o custo
            updateCurrentPlayer({ respostasSeguidas: cp.respostasSeguidas - 2 });
            setMensagem("Uma opção incorreta foi eliminada! (-2 Acertos Seguidos)");
        } else {
            setMensagem("Não há mais opções incorretas para eliminar.");
        }
    };

    const voltarTelaInicial = () => {
        if (window.confirm("Tem certeza que deseja voltar para a Tela Inicial? Seu progresso será salvo.")) {
            // O progresso já é salvo a cada ação via updateGameState
            setGameState(null); // Limpa o estado do jogo principal
            setCartaAtual(null);
            setNoCardsAvailable(false);
            setRespondido(false);
            setMensagem("");
            setCurrentGameSources([]); // Limpa as fontes do jogo atual
        }
    };

    // --- Handlers para Ajustes Manuais (Mantidos do original) ---
    const diminuirAcertos = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ respostasCertas: Math.max(0, cp.respostasCertas - 1) }); setMensagem("Acerto removido manualmente."); };
    const diminuirErros = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ respostasErradas: Math.max(0, cp.respostasErradas - 1) }); setMensagem("Erro removido manualmente."); };
    const incrementarContadorDeEstrelas = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ contadorDeEstrelas: cp.contadorDeEstrelas + 1 }); setMensagem("Estrela bônus adicionada manualmente."); };
    const diminuirContadorDeEstrelas = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ contadorDeEstrelas: Math.max(0, cp.contadorDeEstrelas - 1) }); setMensagem("Estrela bônus removida manualmente."); };
    const incrementarRodadasPreso = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ rodadasPreso: cp.rodadasPreso + 1 }); setMensagem("Rodada preso adicionada manualmente."); };
    const diminuirRodadasPreso = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ rodadasPreso: Math.max(0, cp.rodadasPreso - 1) }); setMensagem("Rodada preso removida manualmente."); };

    // --- Handlers do Dado e Long Press (Mantidos do original) ---
    const rolarDado = () => {
        if (isRolling) return;
        setIsRolling(true);
        setIsDieModalOpen(true);
        setRolledNumber(null);
        setRollingNumber(Math.floor(Math.random() * 6) + 1); // Mostra um número inicial
        let rollCount = 0;
        const maxRolls = 15; // Número de "piscadas"
        const rollInterval = setInterval(() => {
            setRollingNumber(Math.floor(Math.random() * 6) + 1);
            rollCount++;
            if (rollCount >= maxRolls) {
                clearInterval(rollInterval);
                const finalNumber = Math.floor(Math.random() * 6) + 1;
                setRolledNumber(finalNumber);
                setRollingNumber(null); // Limpa o número que estava piscando
                setIsRolling(false);
            }
        }, 80); // Intervalo da animação
    };
    const handleLongPressStart = (action: () => void) => {
        // Impede long press se o botão estiver desabilitado (ex: Verificar)
        if (action === verificarResposta && isVerificarDisabled()) return;
        if (action === selecionarCartaAleatoria && !respondido) return; // Só permite long press em Próxima Carta

        longPressTimeout.current = setTimeout(() => {
            rolarDado(); // Ação do long press é sempre rolar o dado
        }, 700); // Tempo para ativar o long press (700ms)
    };
    const handleLongPressEnd = () => {
        if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
        }
    };

    // --- Lógica de Renderização ---

    // Renderiza TelaInicial se o jogo não começou
    if (!isClientReady) {
         // Mostra um placeholder enquanto o cliente hidrata
         return <div className="flex items-center justify-center min-h-screen"><p>Carregando Interface...</p></div>;
    }
    if (!gameState) {
        let hasSaved = false;
        let initialPlayersData: Player[] = [];
        let initialOcultar = true;
        let initialProb = 0;
        // Tenta carregar dados do jogo salvo para passar para TelaInicial
        if (typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
            try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                    hasSaved = true;
                    // Garante que players seja um array
                    initialPlayersData = Array.isArray(savedState.players) ? savedState.players : [];
                    initialOcultar = savedState.ocultarCarta ?? true;
                    initialProb = savedState.probabilityIndex ?? 0;
                }
            } catch(e) {
                 console.error("Erro ao ler estado salvo para TelaInicial:", e);
                 // Mantém os defaults se houver erro
            }
        }
        return (
            <TelaInicial
                onStartGame={handleGameStart}
                initialPlayers={initialPlayersData}
                initialOcultarCarta={initialOcultar}
                initialProbabilityIndex={initialProb}
                hasSavedGame={hasSaved}
            />
        );
    }

    // Extrai dados do gameState atual
    const { players, currentPlayerId, ocultarCarta } = gameState;
    const currentPlayer = players.find(p => p.id === currentPlayerId);

    // Renderiza erro se não houver cartas disponíveis
    if (noCardsAvailable) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
                <Card className="p-6 shadow-lg max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl text-red-600">Sem Cartas!</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">Nenhuma carta foi encontrada com os filtros e baralhos ativos selecionados.</p>
                        <p className="text-sm text-gray-600 mb-4">
                            Verifique as categorias selecionadas, os baralhos internos ativos nas fontes ou adicione/ative mais fontes na tela inicial.
                        </p>
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

    // Renderiza carregando se a carta ou jogador não estiver pronto
    if (!cartaAtual || !currentPlayer) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p className="mb-4">Carregando jogo...</p>
                {/* Adiciona um botão de voltar caso algo trave */}
                 <Button onClick={voltarTelaInicial} variant="outline">
                    Voltar para Tela Inicial (Forçar)
                </Button>
            </div>
        );
    }

    // --- Funções Auxiliares de Renderização ---
    const obterEstiloCarta = () => {
        if (ocultarCarta && !cartaRevelada) return "border-gray-400 bg-gray-100"; // Cinza para oculta
        switch (cartaAtual.tipo) {
            case "Vantagem": return "border-green-500 bg-green-50";
            case "Desvantagem": return "border-red-500 bg-red-50";
            case "Outras": return "border-blue-500 bg-blue-50";
            case "ContraTempo": return "border-yellow-500 bg-yellow-50";
            default: return "border-gray-300 bg-white"; // Padrão
        }
    };

    const isVerificarDisabled = () => {
        if (respondido) return true; // Já respondido
        if (ocultarCarta && !cartaRevelada) return true; // Carta oculta
        switch (cartaAtual.tipo) {
            case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras":
                return selecionado === null; // Precisa selecionar uma opção
            case "MultiplaEscolha":
                return selecoesMultiplas.length === 0; // Precisa selecionar pelo menos uma
            case "Ordem":
                 // Verifica se 'opcoes' existe e se selecionou a quantidade correta
                 return !('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || ordemSelecoes.length !== cartaAtual.opcoes.length;
            case "RelacionarColunas":
                 // Verifica se 'respostaCorreta' existe e se formou a quantidade correta de pares
                 return !('respostaCorreta' in cartaAtual) || !Array.isArray(cartaAtual.respostaCorreta) || paresFormados.length !== cartaAtual.respostaCorreta.length;
            case "PontoCerto":
                return coordenadasClique === null; // Precisa clicar na imagem
            case "CompletarFrase":
                 // Verifica se 'respostaCorreta' existe e se selecionou a quantidade correta de fragmentos
                 return !('respostaCorreta' in cartaAtual) || !Array.isArray(cartaAtual.respostaCorreta) || fragmentosSelecionados.length !== cartaAtual.respostaCorreta.length;
            default:
                return true; // Desabilita por padrão para tipos desconhecidos
        }
    };

    // Define a variante do Alert (cor) com base na mensagem
    const getAlertVariant = (): "default" | "destructive" => {
        if (!mensagem) return "default";
        const lowerMsg = mensagem.toLowerCase();
        // Prioriza mensagens de erro/negativas
        if (lowerMsg.includes('incorreto') || lowerMsg.includes('desvantagem') || lowerMsg.includes('tempo esgotado') || lowerMsg.includes('erro')) {
            return "destructive";
        }
        // Considera mensagens de sucesso/positivas como 'default' (serão estilizadas depois)
        if (lowerMsg.includes('correto') || lowerMsg.includes('vantagem') || lowerMsg.includes('barra completa')) {
            return "default"; // Será verde pelo estilo customizado
        }
        // Outras mensagens (neutras/informativas)
        return "default"; // Será azul/cinza pelo estilo customizado
    };

    // Verifica se o Alert é informativo (nem sucesso, nem erro explícito)
     const isInfoAlert = !mensagem.toLowerCase().includes('correto') &&
                         !mensagem.toLowerCase().includes('vantagem') &&
                         !mensagem.toLowerCase().includes('barra completa') && // Verifica barra completa também
                         !mensagem.toLowerCase().includes('incorreto') &&
                         !mensagem.toLowerCase().includes('desvantagem') &&
                         !mensagem.toLowerCase().includes('tempo esgotado') &&
                         !mensagem.toLowerCase().includes('erro') && // Verifica erro genérico
                         // Garante que Vantagem/Desvantagem não sejam 'info' mesmo se a msg for neutra
                         cartaAtual?.tipo !== 'Vantagem' &&
                         cartaAtual?.tipo !== 'Desvantagem';


    // --- JSX Principal do Jogo ---
    return (
        <div className="flex flex-col items-center p-2 md:p-4 min-h-screen bg-gradient-to-b from-green-50 to-blue-100 font-sans">

            {/* --- Card Principal --- */}
            <Card
                className={cn(
                    "w-full max-w-lg mx-auto mt-4 mb-6 shadow-xl border-2 rounded-lg transition-all duration-300",
                    obterEstiloCarta() // Estilo baseado no tipo/estado da carta
                )}
                // Adiciona sombra colorida do jogador atual (se a carta estiver revelada)
                style={players.length > 0 && currentPlayer && !(ocultarCarta && !cartaRevelada)
                    ? { boxShadow: `0 0 15px 3px ${currentPlayer.color}` }
                    : {}
                }
            >
                {/* --- Cabeçalho da Carta --- */}
                <CardHeader className="pb-3">
                    {/* Linha Título, Categorias, Dificuldade */}
                    <div className="flex justify-between items-start mb-2 gap-2">
                        {/* Esquerda: Título e Categorias/Baralho */}
                        <div className="flex-1 min-w-0 pr-2"> {/* Garante que o texto não empurre a badge */}
                            <CardTitle
                                className="text-lg md:text-xl font-bold leading-tight truncate"
                                title={ocultarCarta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo} // Mostra título completo no hover
                            >
                                {ocultarCarta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo}
                            </CardTitle>
                            {/* Mostra Categorias e Baralho (se não for padrão) se a carta estiver revelada */}
                            {(!ocultarCarta || cartaRevelada) && (
                                <p
                                    className="text-xs text-gray-500 mt-1 truncate"
                                    title={
                                        (cartaAtual.categorias ? cartaAtual.categorias.join(", ") : 'Sem Categoria') +
                                        (cartaAtual.baralho && cartaAtual.baralho !== DEFAULT_BARALHO_NAME ? ` (Baralho: ${cartaAtual.baralho})` : '')
                                    }
                                >
                                    {/* Junta categorias */}
                                    {cartaAtual.categorias && cartaAtual.categorias.length > 0
                                        ? cartaAtual.categorias.join(", ")
                                        : <span className="italic">Sem Categoria</span>
                                    }
                                    {/* Adiciona nome do baralho se for customizado */}
                                    {cartaAtual.baralho && cartaAtual.baralho !== DEFAULT_BARALHO_NAME && (
                                        <span className="ml-1 font-medium text-gray-600">({cartaAtual.baralho})</span>
                                    )}
                                </p>
                            )}
                        </div>
                        {/* Direita: Badge de Dificuldade */}
                        {(!ocultarCarta || cartaRevelada) && (
                            <Badge
                                variant={
                                    cartaAtual.dificuldade === "facil" ? "secondary" :
                                    cartaAtual.dificuldade === "normal" ? "default" :
                                    "destructive" // difícil
                                }
                                className="capitalize flex-shrink-0 h-6 px-2.5 text-xs" // Tamanho e padding ajustados
                            >
                                {cartaAtual.dificuldade}
                            </Badge>
                        )}
                    </div>

                    {/* Timer (se for ContraTempo e estiver rodando) */}
                    {cartaAtual.tipo === "ContraTempo" && tempoRestante !== null && !respondido && cartaRevelada && (
                        <div className="mt-2">
                            <Progress
                                value={(tempoRestante / cartaAtual.tempoLimite) * 100}
                                className="h-2 [&>*]:bg-yellow-500 transition-all duration-1000 linear" // Transição suave
                            />
                            <p className="text-center text-sm font-semibold text-yellow-700 mt-1">
                                <Timer className="inline h-4 w-4 mr-1" /> Tempo: {tempoRestante}s
                            </p>
                        </div>
                    )}

                    {/* Área da Pergunta (ou placeholder se oculta) */}
                    {(!ocultarCarta || cartaRevelada) ? (
                        // ScrollArea para perguntas longas
                        <ScrollArea className="h-64 md:h-72 rounded-md border p-3 mt-2 bg-white/80 shadow-inner"> {/* Altura ajustada */}
                            {/* Renderiza HTML da pergunta */}
                            <div
                                className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-blockquote:my-1 prose-img:my-2 prose-img:rounded prose-img:border prose-a:text-blue-600 hover:prose-a:text-blue-800"
                                dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta || '<p class="italic text-gray-500">Sem texto de pergunta.</p>' }}
                            />
                        </ScrollArea>
                    ) : (
                        // Placeholder para carta oculta
                        <div className="h-64 md:h-72 flex flex-col items-center justify-center space-y-3 rounded-md border p-3 mt-2 bg-gray-200 border-gray-300">
                            <EyeOff className="h-10 w-10 text-gray-500" />
                            <p className="text-base font-medium text-gray-700">Carta Oculta</p>
                            {/* Mostra resultado do dado se foi rolado */}
                            {rolledNumber !== null && <p className="text-xl font-bold">Dado: {rolledNumber}</p>}
                            {/* Botão para rolar dado (disponível apenas quando oculta) */}
                            <Button
                                onClick={rolarDado}
                                variant="outline"
                                size="sm"
                                className="mt-3 bg-white shadow"
                                onMouseDown={() => handleLongPressStart(rolarDado)} // Rola com long press também
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(rolarDado)}
                                onTouchEnd={handleLongPressEnd}
                                onTouchCancel={handleLongPressEnd}
                            >
                                <Dice6 className="h-4 w-4 mr-1.5" /> Rolar Dado
                            </Button>
                        </div>
                    )}
                </CardHeader>

                {/* --- Conteúdo da Resposta (Opções, Imagem, etc.) --- */}
                {/* Só renderiza se a carta estiver revelada */}
                {(!ocultarCarta || cartaRevelada) && (
                    <CardContent className="pt-0 pb-4">
                        {/* Container para as opções/interações */}
                        <div className="space-y-2">
                            {renderizarConteudoResposta()} {/* Função que renderiza o tipo específico */}
                        </div>

                        {/* Dica (se disponível e revelada) */}
                        {mostrarDica && cartaAtual.dica && (
                            <Alert variant="default" className="mt-4 bg-blue-50 border-blue-300 text-blue-800">
                                <HelpCircle className="h-4 w-4 text-blue-700" />
                                <AlertDescription className="text-sm ml-2">
                                    <strong>Dica:</strong> {cartaAtual.dica}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Fontes (se disponíveis e reveladas) */}
                        {mostrarFontes && cartaAtual.fontes && cartaAtual.fontes.length > 0 && (
                            <Alert variant="default" className="mt-4 bg-gray-50 border-gray-300">
                                <BookOpen className="h-4 w-4 text-gray-700" />
                                <AlertDescription className="text-sm ml-2 text-gray-800">
                                    <strong>Fontes:</strong>
                                    <ul className="list-disc list-inside mt-1 text-xs space-y-0.5">
                                        {cartaAtual.fontes.map((fonte, idx) => (
                                            <li key={idx}>{fonte}</li>
                                        ))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                )}

                {/* --- Rodapé da Carta (Ações, Feedback, Progresso) --- */}
                <CardFooter className="flex flex-col items-center pt-4 border-t bg-gray-50/50 rounded-b-lg">
                    {/* --- Botões de Ação Primários (h-9) --- */}
                    <div className="flex flex-wrap justify-center gap-1.5 w-full mb-3">
                        {/* Fontes */}
                        <Button
                            onClick={toggleFontes}
                            variant="outline"
                            size="icon" // Ícone apenas
                            disabled={!cartaAtual.fontes || cartaAtual.fontes.length === 0 || (ocultarCarta && !cartaRevelada)}
                            className="h-9 w-9"
                            title={mostrarFontes ? "Ocultar Fontes" : "Mostrar Fontes"}
                        > <BookOpen className="h-5 w-5" /> </Button>
                        {/* Pular */}
                        <Button
                            onClick={pularPergunta}
                            variant={currentPlayer.pulosDisponiveis > 0 ? "secondary" : "outline"}
                            size="icon"
                            disabled={currentPlayer.pulosDisponiveis === 0 || !tiposPergunta.includes(cartaAtual.tipo) || respondido || (ocultarCarta && !cartaRevelada)}
                            className="h-9 w-9"
                            title={`Pular Carta (${currentPlayer.pulosDisponiveis} pulos restantes)`}
                        > <SkipForward className="h-5 w-5" /> </Button>
                        {/* Dica */}
                        <Button
                            onClick={toggleDica}
                            variant={currentPlayer.respostasSeguidas >= 2 && !dicaUsada && !!cartaAtual.dica ? "secondary" : "outline"}
                            size="icon"
                            disabled={dicaUsada || !cartaAtual.dica || respondido || (ocultarCarta && !cartaRevelada) || currentPlayer.respostasSeguidas < 2}
                            className="h-9 w-9"
                            title={dicaUsada ? "Dica já usada" : !cartaAtual.dica ? "Sem dica" : currentPlayer.respostasSeguidas < 2 ? "Necessário 2 acertos seguidos" : "Usar Dica (-2 acertos seguidos)"}
                        > <HelpCircle className="h-5 w-5" /> </Button>
                        {/* Eliminar Opção */}
                        <Button
                            onClick={eliminarRespostaErrada}
                            variant={currentPlayer.respostasSeguidas >= 2 ? "secondary" : "outline"}
                            size="icon"
                            disabled={
                                respondido || (ocultarCarta && !cartaRevelada) ||
                                !["Pergunta", "MultiplaEscolha", "ContraTempo", "Outras"].includes(cartaAtual.tipo) ||
                                !('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || cartaAtual.opcoes.filter(op => !opcoesEliminadas.includes(op.id)).length <= 2 || // Já tem poucas opções
                                currentPlayer.respostasSeguidas < 2
                             }
                             className="h-9 w-9"
                             title={currentPlayer.respostasSeguidas < 2 ? "Necessário 2 acertos seguidos" : "Eliminar Opção Incorreta (-2 acertos seguidos)"}
                        > <MinusCircle className="h-5 w-5" /> </Button>
                         {/* Resetar Jogador */}
                         <Button
                            onClick={resetarContadoresJogador}
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 text-orange-600 hover:bg-orange-100"
                            title={`Resetar estatísticas de ${currentPlayer.name}`}
                        > <RotateCcw className="h-5 w-5" /> </Button>
                        {/* Voltar Tela Inicial */}
                        <Button
                            onClick={voltarTelaInicial}
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 text-indigo-600 hover:bg-indigo-100"
                            title="Voltar para Tela Inicial (Salva o jogo)"
                        > <Home className="h-5 w-5" /> </Button>
                    </div>

                    {/* --- Botões de Ajuste Manual (h-9) --- */}
                    {/* Mantidos do original, mas agrupados visualmente */}
                    <div className="flex flex-wrap justify-center gap-1.5 w-full mb-3 p-2 border rounded-md bg-gray-100 shadow-inner">
                        {/* Diminuir Acertos */}
                        <Button onClick={diminuirAcertos} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Acertos (-1)">
                            <ThumbsUp className="h-4 w-4 text-green-600 transform scale-x-[-1]" />
                        </Button>
                        {/* Diminuir Erros */}
                        <Button onClick={diminuirErros} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Erros (-1)">
                            <ThumbsDown className="h-4 w-4 text-red-600 transform scale-x-[-1]" />
                        </Button>
                         {/* Diminuir Estrela Bônus */}
                         <Button onClick={diminuirContadorDeEstrelas} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Estrela Bônus (-1)">
                            <Star className="h-4 w-4 text-orange-500 fill-current opacity-50" /> {/* Estrela vazia? */}
                        </Button>
                        {/* Aumentar Estrela Bônus */}
                        <Button onClick={incrementarContadorDeEstrelas} variant="outline" size="icon" className="h-8 w-8" title="Aumentar Estrela Bônus (+1)">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" /> {/* Estrela cheia */}
                        </Button>
                        {/* Diminuir Rodada Preso */}
                        <Button onClick={diminuirRodadasPreso} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Rodada Preso (-1)">
                             <ChevronDown className="h-5 w-5 text-purple-600" /> {/* Icone para baixo */}
                        </Button>
                        {/* Aumentar Rodada Preso */}
                        <Button onClick={incrementarRodadasPreso} variant="outline" size="icon" className="h-8 w-8" title="Aumentar Rodada Preso (+1)">
                            <ChevronUp className="h-5 w-5 text-purple-600" /> {/* Icone para cima */}
                        </Button>
                    </div>

                    {/* --- Botão Principal (Revelar / Verificar / Próxima) --- */}
                    <div className="w-full mb-3">
                        {ocultarCarta && !cartaRevelada ? (
                            // Botão Revelar Carta
                            <Button
                                onClick={() => setCartaRevelada(true)}
                                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold"
                            >
                                <Eye className="mr-2 h-5 w-5"/> Revelar Carta
                            </Button>
                        ) : !respondido ? (
                            // Botão Verificar
                            <Button
                                onClick={isVerificarDisabled() ? undefined : verificarResposta} // Só chama se não estiver desabilitado
                                className={cn(
                                    "w-full h-10 text-base font-semibold text-white",
                                    isVerificarDisabled()
                                        ? "bg-gray-400 cursor-not-allowed" // Estilo desabilitado
                                        : "bg-green-600 hover:bg-green-700" // Estilo habilitado
                                )}
                                // Long press para rolar dado
                                onMouseDown={() => handleLongPressStart(verificarResposta)} // Passa a ação original
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
                            // Botão Próxima Carta
                            <Button
                                onClick={selecionarCartaAleatoria}
                                className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold"
                                // Long press para rolar dado
                                onMouseDown={() => handleLongPressStart(selecionarCartaAleatoria)} // Passa a ação original
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(selecionarCartaAleatoria)}
                                onTouchEnd={handleLongPressEnd}
                                onTouchCancel={handleLongPressEnd}
                            >
                                <SkipForward className="mr-2 h-5 w-5"/> Próxima Carta
                            </Button>
                        )}
                    </div>

                    {/* --- Mensagem de Feedback --- */}
                    {/* Renderiza apenas se houver mensagem */}
                    {mensagem && (
                        <Alert
                            variant={getAlertVariant()} // 'default' ou 'destructive'
                            className={cn(
                                'text-center text-sm font-semibold mb-3 w-full py-2 px-3 shadow-sm',
                                // Aplica cores específicas com base no tipo de carta e resultado
                                // Vantagem é sempre verde
                                cartaAtual?.tipo === 'Vantagem' && 'bg-green-100 border-green-300 text-green-800',
                                // Desvantagem é sempre vermelha
                                cartaAtual?.tipo === 'Desvantagem' && 'bg-red-100 border-red-300 text-red-800',
                                // Outros tipos: Azul para info, Verde para acerto, Vermelho para erro
                                cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'default' && isInfoAlert && 'bg-blue-100 border-blue-300 text-blue-800',
                                cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'default' && !isInfoAlert && 'bg-green-100 border-green-300 text-green-800',
                                cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'destructive' && 'bg-red-100 border-red-300 text-red-800'
                            )}
                        >
                            <AlertDescription>{mensagem}</AlertDescription>
                        </Alert>
                    )}

                    {/* --- Progresso e Estatísticas do Jogador Atual --- */}
                    {/* Mantido do original, com indentação melhorada */}
                    <div className="w-full border-t pt-3 mt-1">
                        {/* Barra de Progresso */}
                        <Progress value={currentPlayer.progresso} className="h-2.5 [&>*]:bg-orange-500 mb-2" />
                        {/* Estatísticas */}
                        <div className="flex justify-between items-center w-full text-xs sm:text-sm text-gray-700 flex-wrap gap-x-3 gap-y-1 font-medium">
                             {/* Rodadas Preso */}
                             <span className="flex items-center" title="Rodadas Preso">
                                <ChevronUp className="h-4 w-4 text-purple-500 mr-0.5"/>
                                {currentPlayer.rodadasPreso}
                             </span>
                              {/* Estrelas Fixas */}
                             <span className="flex items-center" title="Estrelas Fixas (Barras Completas)">
                                <Award className="h-4 w-4 text-yellow-600 mr-0.5"/>
                                {currentPlayer.fixedStars}
                             </span>
                              {/* Estrelas Bônus */}
                             <span className="flex items-center" title="Estrelas Bônus (Cartas/Eventos)">
                                <Star className="h-4 w-4 text-yellow-500 mr-0.5"/>
                                {currentPlayer.contadorDeEstrelas}
                             </span>
                              {/* Pulos Disponíveis */}
                             <span className="flex items-center" title="Pulos Disponíveis">
                                <SkipForward className="h-4 w-4 text-blue-500 mr-0.5"/>
                                {currentPlayer.pulosDisponiveis}
                             </span>
                              {/* Respostas Corretas */}
                             <span className="flex items-center" title="Respostas Corretas">
                                <ThumbsUp className="h-4 w-4 text-green-500 mr-0.5"/>
                                {currentPlayer.respostasCertas}
                             </span>
                             {/* Respostas Erradas */}
                             <span className="flex items-center" title="Respostas Erradas">
                                <ThumbsDown className="h-4 w-4 text-red-500 mr-0.5"/>
                                {currentPlayer.respostasErradas}
                             </span>
                             {/* Respostas Seguidas */}
                             <span className="flex items-center" title="Acertos Seguidos">
                                <Zap className="h-4 w-4 text-orange-500 mr-0.5"/>
                                {currentPlayer.respostasSeguidas}
                             </span>
                         </div>
                    </div>
                    {/* Fim da área de Progresso e Estatísticas */}
                </CardFooter>
                 {/* --- Fim do Rodapé da Carta --- */}
            </Card>
            {/* --- Fim do Card Principal --- */}


            {/* --- Seleção de Jogador --- */}
            {/* Container responsivo para seleção de jogador */}
            <div className="mt-4 w-full max-w-lg px-1">
                {/* Texto "Vez de:" */}
                <p className="text-center text-sm font-medium mb-2 text-gray-800">
                    Vez de: <span style={{ color: currentPlayer.color }} className="font-bold">{currentPlayer.name}</span>
                </p>
                {/* Grid de botões dos jogadores */}
                <div className={cn(
                    'grid gap-2',
                    // Define o número de colunas com base na quantidade de jogadores
                    players.length <= 2 ? 'grid-cols-2' :
                    players.length <= 4 ? 'grid-cols-4' :
                    players.length <= 6 ? 'grid-cols-3' : // 3 colunas para 5 ou 6
                    'grid-cols-4' // 4 colunas para 7 ou 8
                 )}>
                    {/* Mapeia cada jogador para um botão */}
                    {players.map((pl) => (
                        <Button
                            key={pl.id}
                            onClick={() => updateGameState({ currentPlayerId: pl.id })} // Muda o jogador atual ao clicar
                            size="sm"
                            // Variante 'default' para o jogador atual, 'outline' para os outros
                            variant={currentPlayerId === pl.id ? "default" : "outline"}
                            className={cn(
                                "truncate text-xs sm:text-sm h-9 font-medium transition-all duration-150", // Estilos base e transição
                                // Estilos específicos do jogador atual
                                currentPlayerId === pl.id
                                    ? 'text-white ring-2 ring-offset-1 ring-black/50' // Texto branco, anel de destaque
                                    : 'hover:bg-gray-100' // Hover sutil para os outros
                            )}
                            // Aplica a cor do jogador (background se ativo, cor da borda/texto se inativo)
                            style={{
                                backgroundColor: currentPlayerId === pl.id ? pl.color : 'white',
                                color: currentPlayerId === pl.id ? 'white' : pl.color,
                                borderColor: pl.color,
                                borderWidth: currentPlayerId === pl.id ? '2px' : '1px', // Borda mais grossa se ativo
                             }}
                             title={`Mudar para ${pl.name}`} // Tooltip
                         >
                             {pl.name} {/* Nome do jogador */}
                         </Button>
                    ))}
                </div>
            </div>
            {/* --- Fim da Seleção de Jogador --- */}


            {/* --- Modal do Dado --- */}
            {/* Renderiza o modal se isDieModalOpen for true */}
            {isDieModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
                    {/* Container do modal */}
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center relative w-64 h-64 flex flex-col justify-center items-center border-4 border-gray-300">
                        {/* Botão de fechar */}
                        <Button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            variant="ghost" size="icon"
                            onClick={() => setIsDieModalOpen(false)}
                            disabled={isRolling} // Desabilita enquanto rola
                            aria-label="Fechar modal do dado"
                        >
                            <XIcon className="h-6 w-6" />
                        </Button>
                        {/* Conteúdo do modal (rolando ou resultado) */}
                        {isRolling ? (
                            // Estado "Rolando..."
                            <>
                                <p className="text-lg mb-4 font-semibold text-gray-700">Rolando...</p>
                                {/* Número piscando com animação */}
                                <p className="text-7xl font-bold mb-6 text-blue-600 animate-bounce">
                                    {rollingNumber}
                                </p>
                                <div className="h-10"></div> {/* Espaço para alinhar com o botão */}
                            </>
                        ) : (
                            // Estado "Resultado"
                            <>
                                <p className="text-lg mb-2 font-semibold text-gray-700">Resultado:</p>
                                {/* Número final */}
                                <p className="text-8xl font-bold mb-4 text-green-700">
                                    {rolledNumber}
                                </p>
                                {/* Botão para rolar novamente */}
                                <Button onClick={rolarDado} size="lg" variant="secondary" className="mt-2">
                                    <Dice6 className="h-5 w-5 mr-2" /> Rolar Novamente
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
            {/* --- Fim do Modal do Dado --- */}

        </div>
    );
    // --- Fim do Return Principal do Jogo ---


    // --- Função Interna para Renderizar Conteúdo da Resposta (Baseado no Tipo da Carta) ---
    // (Mantida do original, com verificações e estilos aprimorados)
    function renderizarConteudoResposta() {
        if (!cartaAtual) return null; // Segurança

        // Estilo comum para botões de opção (permite quebra de linha e scroll interno)
        const buttonInlineStyle: React.CSSProperties = {
            maxHeight: "90px", // Altura máxima antes de scrollar
            height: "auto",    // Altura automática
            overflowY: "auto",
            whiteSpace: "normal", // Permite quebra de linha
            lineHeight: "1.4",    // Espaçamento entre linhas
            display: "flex",      // Necessário para alignItems
            alignItems: "center", // Alinha ícone e texto verticalmente
            textAlign: "left",
        };

        switch (cartaAtual.tipo) {
            // --- Tipos com Opções Simples (Pergunta, ContraTempo, Vantagem, Desvantagem, Outras) ---
            case "Pergunta":
            case "ContraTempo":
            case "Vantagem":
            case "Desvantagem":
            case "Outras":
                 // Validação: Verifica se 'opcoes' existe e é um array
                if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes)) {
                    return <p className="text-xs text-red-500 text-center italic py-2">Erro: Opções inválidas para esta carta.</p>;
                }
                // Mapeia cada opção para um botão
                return cartaAtual.opcoes.map((op: Opcao) => {
                    // Determina o estado da opção
                    const isCorrect = Array.isArray(cartaAtual.respostaCorreta)
                        ? cartaAtual.respostaCorreta.includes(op.id)
                        : cartaAtual.respostaCorreta === op.id;
                    const isSelected = selecionado === op.id;
                    const isEliminated = opcoesEliminadas.includes(op.id);
                    const isWrongSelection = respondido && isSelected && !isCorrect;

                    // Define classes CSS com base no estado
                    let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400"; // Padrão
                    if (respondido) { // Após responder
                        if (isCorrect) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; // Correta
                        else if (isSelected) btnClass = "bg-red-100 border-red-400 text-red-900"; // Selecionada errada
                        else btnClass = "border-gray-300 text-gray-500 opacity-70"; // Não selecionada e errada
                    } else if (isSelected) { // Antes de responder, selecionada
                        btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300";
                    }
                    if (isEliminated) { // Opção eliminada
                        btnClass = "line-through opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-500";
                    }

                    return (
                        <Button
                            key={op.id}
                            onClick={() => handleSelecao(op.id)}
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150", // Estilos base e transição
                                btnClass // Classes condicionais
                            )}
                            style={buttonInlineStyle} // Aplica estilo para altura/scroll
                            disabled={isEliminated || respondido} // Desabilita se eliminada ou já respondido
                            aria-pressed={isSelected}
                        >
                            {/* Ícone de seleção (antes de responder) */}
                            {!respondido && !isEliminated && (
                                <span className={cn(
                                    "flex-shrink-0 w-4 h-4 rounded-full border-2 mr-2.5",
                                    isSelected ? "bg-blue-600 border-blue-700" : "border-gray-400 bg-white"
                                )}></span>
                            )}
                            {/* Texto da opção */}
                            <span className="flex-1">{op.texto}</span>
                            {/* Ícone de feedback (depois de responder) */}
                            {isCorrect && respondido && <CheckCircle2 className="ml-2 h-5 w-5 text-green-600 flex-shrink-0" />}
                            {isWrongSelection && <XCircle className="ml-2 h-5 w-5 text-red-600 flex-shrink-0" />}
                        </Button>
                    );
                });

             // --- Tipo MultiplaEscolha ---
             case "MultiplaEscolha":
                 // Validação
                if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || !Array.isArray(cartaAtual.respostaCorreta)) {
                    return <p className="text-xs text-red-500 text-center italic py-2">Erro: Opções ou resposta inválida.</p>;
                }
                 // Mapeia cada opção
                return cartaAtual.opcoes.map((op: Opcao) => {
                    // Determina estado
                    const isCorrect = cartaAtual.respostaCorreta.includes(op.id);
                    const isSelected = selecoesMultiplas.includes(op.id);
                    const isEliminated = opcoesEliminadas.includes(op.id);
                    const isWrongSelection = respondido && isSelected && !isCorrect; // Selecionou, mas estava errada
                    const missedCorrect = respondido && isCorrect && !isSelected; // Era correta, mas não selecionou

                    // Define classes CSS
                    let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400"; // Padrão
                    if (respondido) {
                        if (isCorrect && isSelected) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; // Acertou
                        else if (isWrongSelection) btnClass = "bg-red-100 border-red-400 text-red-900"; // Errou ao selecionar
                        else if (missedCorrect) btnClass = "bg-blue-100 border-blue-400 text-blue-800"; // Deveria ter selecionado
                        else btnClass = "border-gray-300 text-gray-500 opacity-70"; // Errada e não selecionada
                    } else if (isSelected) { // Antes de responder, selecionada
                        btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300";
                    }
                     if (isEliminated) { // Eliminada
                        btnClass = "line-through opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-500";
                    }

                    return (
                        <Button
                            key={op.id}
                            onClick={() => handleSelecaoMultipla(op.id)}
                            variant="outline"
                             className={cn(
                                "w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150",
                                btnClass
                             )}
                            style={buttonInlineStyle}
                            disabled={isEliminated || respondido}
                            aria-checked={isSelected} // Usa aria-checked para checkboxes
                        >
                            {/* Checkbox visual */}
                            {!isEliminated && (
                                 <div className={cn(
                                    "flex-shrink-0 w-4 h-4 mr-2.5 border rounded-sm flex items-center justify-center",
                                    isSelected ? 'bg-blue-600 border-blue-700' : 'border-gray-400 bg-white'
                                )}>
                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                            )}
                             {/* Texto da opção */}
                            <span className="flex-1">{op.texto}</span>
                            {/* Ícones de feedback */}
                            {isCorrect && respondido && isSelected && <CheckCircle2 className="ml-2 h-5 w-5 text-green-600 flex-shrink-0" />}
                            {isWrongSelection && <XCircle className="ml-2 h-5 w-5 text-red-600 flex-shrink-0" />}
                            {/* Feedback para corretas não marcadas */}
                            {missedCorrect && <span title="Esta era correta" className="ml-2 text-blue-600 font-bold text-lg">✓</span>}
                         </Button>
                    );
                });

            // --- Tipo Ordem ---
            case "Ordem":
                 // Validação
                 if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || !Array.isArray(cartaAtual.respostaCorreta)) {
                     return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos para Ordem.</p>;
                 }
                 const cOrdem = cartaAtual as CartaOrdem; // Type cast para facilitar acesso
                 // Mapeia cada opção
                 return cOrdem.opcoes.map((op) => {
                    // Determina estado
                    const isSelected = ordemSelecoes.includes(op.id);
                    const selectionIndex = isSelected ? ordemSelecoes.indexOf(op.id) + 1 : null; // Posição selecionada (1-based)
                    const correctIndex = cOrdem.respostaCorreta.indexOf(op.id) + 1; // Posição correta (1-based, 0 se não estiver na resposta)
                    const isCorrectOrder = respondido && isSelected && selectionIndex === correctIndex;
                    const isWrongOrder = respondido && isSelected && selectionIndex !== correctIndex;
                    const isCorrectOptionOverall = respondido && correctIndex > 0; // Se a opção faz parte da resposta correta

                    // Define classes CSS
                    let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400"; // Padrão
                    if (respondido) {
                        if (isCorrectOrder) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium";
                        else if (isWrongOrder) btnClass = "bg-red-100 border-red-400 text-red-900";
                        else if (isCorrectOptionOverall) btnClass = "border-gray-400 text-gray-600"; // Correta, mas não selecionada (ou ordem geral errada)
                        else btnClass = "border-gray-300 text-gray-500 opacity-70"; // Errada e não selecionada
                    } else if (isSelected) { // Antes de responder, selecionada
                        btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300";
                    }

                    return (
                        <Button
                            key={op.id}
                            onClick={() => handleSelecaoOrdem(op.id)}
                            variant="outline"
                             className={cn(
                                "w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150",
                                btnClass
                             )}
                            style={buttonInlineStyle}
                            disabled={respondido} // Desabilita após responder
                            aria-current={isSelected ? "step" : undefined} // Indica item atual na sequência
                        >
                            {/* Número da ordem (se selecionado antes de responder) */}
                            {isSelected && !respondido && (
                                <span className="mr-2.5 font-bold text-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-white ring-1 ring-blue-500 flex-shrink-0">
                                    {selectionIndex}
                                </span>
                            )}
                            {/* Texto da opção */}
                            <span className="flex-1">{op.texto}</span>
                            {/* Feedback de ordem (depois de responder) */}
                             {respondido && isCorrectOptionOverall && (
                                <> {/* Fragmento para agrupar spans */}
                                    {/* Feedback da Posição do Usuário (Verde se correto, Vermelho se errado) */}
                                    <span
                                        className={cn(
                                            "ml-2 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 text-white",
                                            isCorrectOrder ? 'bg-green-500' : 'bg-red-500'
                                        )}
                                        title={isCorrectOrder ? `Posição Correta: ${correctIndex}` : `Sua Posição: ${selectionIndex}`}
                                    >
                                        {selectionIndex ?? '?'} {/* Mostra a posição que o usuário colocou */}
                                    </span>

                                    {/* Hint da Posição Correta (Azul, apenas se o usuário errou a posição) */}
                                    {isWrongOrder && correctIndex > 0 && (
                                        <span
                                            className="ml-1 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0"
                                            title={`Posição Correta Era: ${correctIndex}`}
                                        >
                                            {correctIndex}
                                        </span>
                                    )}
                                </>
                            )}
                            {/* Fim do Feedback */}
                        </Button>
                    );
                });

            // --- Tipo RelacionarColunas ---
            case "RelacionarColunas":
                // Validação
                const cRel = cartaAtual as CartaRelacionarColunas;
                if (!Array.isArray(cRel.colunaA) || !Array.isArray(cRel.colunaB) || !Array.isArray(cRel.respostaCorreta)) {
                     return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos para Relacionar Colunas.</p>;
                }
                // Renderiza as duas colunas lado a lado
                return (
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        {/* Coluna A */}
                        <div className="w-full sm:w-1/2 space-y-1.5">
                            <p className="text-xs font-semibold text-center mb-1 text-gray-600 uppercase tracking-wider">Coluna A</p>
                            {cRel.colunaA.map(itemA => {
                                const isSelectedA = selecaoColunaA === itemA.id; // Item A selecionado no momento
                                const parFormado = paresFormados.find(p => p.aId === itemA.id); // Par já formado para este item A
                                const parCorretoDef = respondido ? cRel.respostaCorreta.find(rc => rc.aId === itemA.id) : undefined; // Definição do par correto (após responder)
                                const isCorrectPair = respondido && parFormado && parCorretoDef && parFormado.bId === parCorretoDef.bId; // O par formado está correto?
                                const isWrongPair = respondido && parFormado && (!parCorretoDef || parFormado.bId !== parCorretoDef.bId); // O par formado está errado?
                                const missedPair = respondido && !parFormado && parCorretoDef; // Deveria ter formado par, mas não formou

                                // Define classes CSS
                                let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100";
                                if (respondido) {
                                    if (isCorrectPair) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium";
                                    else if (isWrongPair) btnClass = "bg-red-100 border-red-400 text-red-900";
                                    else if (missedPair) btnClass = "bg-blue-100 border-blue-400 text-blue-800"; // Indica que faltou par
                                    else btnClass = "border-gray-300 text-gray-500 opacity-70"; // Não formou par e não era pra formar (ou erro)
                                } else { // Antes de responder
                                    if (isSelectedA) btnClass = "ring-2 ring-blue-500 border-blue-500 bg-blue-50"; // Selecionado
                                    else if (parFormado) btnClass = "bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed"; // Já pareado
                                }

                                return (
                                    <Button
                                        key={`A-${itemA.id}`}
                                        variant="outline"
                                        onClick={() => handleSelecionarColunaA(itemA.id)}
                                        disabled={respondido || (parFormado && !isSelectedA) ? true : false} // Desabilita se respondido ou já pareado (exceto se for o selecionado para desparear)
                                        className={cn(
                                            "w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal transition-all duration-150",
                                            btnClass
                                         )}
                                        aria-pressed={isSelectedA}
                                    >
                                        <span className="flex-1">{itemA.texto}</span>
                                        {/* Feedback */}
                                        {isCorrectPair && <CheckCircle2 className="ml-1 h-4 w-4 text-green-600 flex-shrink-0" />}
                                        {isWrongPair && <XCircle className="ml-1 h-4 w-4 text-red-600 flex-shrink-0" />}
                                         {/* Hint da resposta correta se errou */}
                                        {isWrongPair && parCorretoDef && (
                                            <span className="text-[10px] ml-1 text-blue-600 hidden md:inline" title={`Correto: ${cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto}`}>
                                                ({cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto.substring(0,10)}...)
                                            </span>
                                        )}
                                         {/* Hint se faltou par */}
                                         {missedPair && (
                                            <span className="text-[10px] ml-1 text-blue-700 hidden md:inline" title={`Deveria parear com: ${cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto}`}>
                                                 (Faltou: {cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto.substring(0,10)}...)
                                            </span>
                                         )}
                                    </Button>
                                );
                            })}
                        </div>
                        {/* Coluna B */}
                        <div className="w-full sm:w-1/2 space-y-1.5">
                             <p className="text-xs font-semibold text-center mb-1 text-gray-600 uppercase tracking-wider">Coluna B</p>
                            {cRel.colunaB.map(itemB => {
                                const isPairedB = paresFormados.some(p => p.bId === itemB.id); // Se este item B já foi usado em algum par
                                const isDisabled = respondido || selecaoColunaA === null || isPairedB; // Quando desabilitar o botão B

                                // Define classes CSS
                                let btnClass = "border-gray-300 text-gray-800";
                                if (respondido || isPairedB) { // Após responder ou se já pareado
                                    btnClass = "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed opacity-70";
                                } else if (selecaoColunaA !== null) { // Antes de responder e com item A selecionado
                                     btnClass = "hover:bg-blue-50 hover:border-blue-400 cursor-pointer"; // Hover ativo
                                } else {
                                     btnClass = "hover:bg-gray-100"; // Hover normal
                                }


                                return (
                                    <Button
                                        key={`B-${itemB.id}`}
                                        variant="outline"
                                        onClick={() => handleSelecionarColunaB(itemB.id)}
                                        disabled={isDisabled}
                                        className={cn(
                                            "w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal transition-all duration-150",
                                            btnClass
                                        )}
                                        aria-disabled={isDisabled}
                                    >
                                        <span className="flex-1">{itemB.texto}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                );

            // --- Tipo PontoCerto ---
            case "PontoCerto":
                 // Validação
                 const cPonto = cartaAtual as CartaPontoCerto;
                 if (!cPonto.imagemURL || !Array.isArray(cPonto.zonasClicaveis)) {
                     return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos para Ponto Certo.</p>;
                 }
                 const clickCorrect = respondido && coordenadasClique && cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta && isClickInZone(coordenadasClique, z));
                 const clickIncorrect = respondido && coordenadasClique && !clickCorrect;

                 // Renderiza a imagem interativa
                 return (
                    <div
                        className="relative w-full max-w-md mx-auto aspect-video overflow-hidden rounded border border-gray-300 shadow-inner"
                        // Aplica cursor diferente dependendo do estado
                        style={{ cursor: respondido ? 'not-allowed' : 'crosshair' }}
                        onClick={handleImagemClick} // Registra clique
                        role="button" // Semântica
                        aria-label={`Imagem interativa: ${cPonto.titulo}. Clique na área correta.`}
                        tabIndex={respondido ? -1 : 0} // Permite foco via teclado antes de responder
                    >
                        {/* Imagem */}
                        <img
                            src={cPonto.imagemURL}
                            alt={`Imagem para: ${cPonto.titulo}`}
                            className={cn(
                                'block w-full h-full object-contain bg-gray-100', // Estilo base
                                respondido ? 'opacity-75' : '' // Levemente opaca após responder
                            )}
                        />
                        {/* Marcador do Clique do Usuário */}
                        {coordenadasClique && (
                            <div
                                className={cn(
                                    `absolute w-3.5 h-3.5 rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center`,
                                    // Cor baseada no resultado (após responder) ou azul (antes)
                                    respondido
                                        ? (clickCorrect ? 'bg-green-500 border-white' : 'bg-red-500 border-white')
                                        : 'bg-blue-500 border-white'
                                )}
                                style={{
                                    left: `${coordenadasClique.x * 100}%`,
                                    top: `${coordenadasClique.y * 100}%`,
                                }}
                                title="Seu clique"
                             >
                                 {/* Ícone dentro do marcador */}
                                 {respondido && (clickCorrect ? <Check className="w-2 h-2 text-white" /> : <XIcon className="w-2 h-2 text-white" />)}
                             </div>
                        )}
                        {/* Highlight da Zona Correta (após responder) */}
                        {respondido && (() => {
                                const zonaCorreta = cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta);
                                return zonaCorreta ? (
                                    <div
                                        className="absolute border-2 border-dashed border-green-500 pointer-events-none animate-pulse rounded bg-green-500/10" // Fundo semi-transparente
                                        style={{
                                            left: `${zonaCorreta.x * 100}%`,
                                            top: `${zonaCorreta.y * 100}%`,
                                            width: `${zonaCorreta.largura * 100}%`,
                                            height: `${zonaCorreta.altura * 100}%`,
                                        }}
                                        title={zonaCorreta.descricao || "Área correta"}
                                    />
                                ) : null; // Não mostra nada se não houver zona correta definida
                            })()}
                    </div>
                );

            // --- Tipo CompletarFrase ---
            case "CompletarFrase":
                 // Validação
                const cComp = cartaAtual as CartaCompletarFrase;
                if (!cComp.fraseIncompleta || !Array.isArray(cComp.fragmentos) || !Array.isArray(cComp.respostaCorreta)) {
                    return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos para Completar Frase.</p>;
                }
                // Constrói a frase com os fragmentos selecionados (ou placeholders)
                let fraseRenderizada = cComp.fraseIncompleta;
                // Substitui placeholders pelos fragmentos selecionados
                fragmentosSelecionados.forEach((fragId, index) => {
                    const frag = cComp.fragmentos.find(f => f.id === fragId);
                    if (frag) {
                        // Estilo para fragmento selecionado
                        fraseRenderizada = fraseRenderizada.replace(`__${index + 1}__`, `<strong class="text-blue-600 underline underline-offset-2 mx-1 px-1 rounded bg-blue-50">${frag.texto}</strong>`);
                    }
                });
                // Substitui placeholders restantes
                fraseRenderizada = fraseRenderizada.replace(/__\d+__/g, '<span class="text-gray-400 border-b border-dashed border-gray-400 mx-1 px-2">___</span>');

                const isCompletarCorreto = respondido && fragmentosSelecionados.toString() === cComp.respostaCorreta.toString();

                 // Renderiza a frase e os botões de fragmentos
                return (
                    <div className="space-y-3">
                        {/* Frase Renderizada */}
                        <div
                             className={cn(
                                'p-3 border rounded bg-gray-50 text-sm leading-relaxed shadow-inner',
                                // Estilo da borda baseado no resultado
                                respondido
                                    ? (isCompletarCorreto ? 'border-green-300' : 'border-red-300')
                                    : 'border-gray-300'
                             )}
                             dangerouslySetInnerHTML={{ __html: fraseRenderizada }} // Renderiza HTML
                        />
                        {/* Botões de Fragmentos (se não respondido) */}
                        {!respondido && (
                            <div className="flex flex-wrap gap-2 justify-center items-center border-t pt-3 mt-3">
                                {/* Fragmentos disponíveis */}
                                {cComp.fragmentos
                                    .filter(f => !fragmentosSelecionados.includes(f.id)) // Filtra já selecionados
                                    .map(frag => (
                                        <Button
                                            key={frag.id}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleSelecionarFragmento(frag.id)}
                                            className="bg-white hover:bg-blue-50 border-blue-300 text-blue-800 text-xs px-2 py-1 h-auto"
                                        >
                                            {frag.texto}
                                        </Button>
                                ))}
                                {/* Botão Limpar (se algo foi selecionado) */}
                                {fragmentosSelecionados.length > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={limparFragmentos}
                                        className="text-red-500 hover:bg-red-100 px-2 py-1 h-auto"
                                        title="Limpar seleção"
                                    >
                                        <RotateCcw className="h-4 w-4 mr-1"/> Limpar
                                    </Button>
                                )}
                            </div>
                        )}
                        {/* Resposta Correta (se respondido e incorreto) */}
                        {respondido && !isCompletarCorreto && (
                            <div className="text-xs text-center text-green-700 mt-2 border-t pt-2">
                                <strong>Resposta Correta:</strong> {cComp.respostaCorreta.map(id => cComp.fragmentos.find(f => f.id === id)?.texto).join(' → ')}
                            </div>
                        )}
                    </div>
                );

            // --- Tipo Padrão (Erro) ---
            default:
                console.error("Tipo de carta não renderizado:", cartaAtual);
                return <p className="text-sm text-red-500 text-center italic py-4">Erro: Tipo de carta desconhecido ou não renderizável.</p>;
        }
    }
    // --- Fim da Função renderizarConteudoResposta ---

}; // --- Fim do Componente EcoChallenge ---

export default EcoChallenge;