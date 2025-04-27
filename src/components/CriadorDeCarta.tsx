import React, { useState, useEffect, useCallback, useRef, useMemo } from "react"; // useMemo adicionado se necessário para otimizações futuras
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Importar Checkbox
import {
    CheckCircle2, XCircle, ThumbsUp, ThumbsDown, RotateCcw, HelpCircle,
    BookOpen, Home, SkipForward, Star, Award, MinusCircle, ChevronUp, ChevronDown, Zap, Filter,
    Trash, EyeOff, Eye, Dice6, X as XIcon, Timer, Link2, MousePointerClick, Check, TextSelect,
    ChevronRight, Lock, LockOpen, ArrowUpCircle, Video, Image as ImageIcon, Youtube // Adicionar ícones que faltavam
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Adicionar Textarea
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Adicionar Select
import { cn } from "@/lib/utils";

// --- Importar Decks (do Original) ---
import manejoPlantadas from "./deck/cards_manejo_plantada";
import manejoNativas from "./deck/cards_manejo_nativa";
import ecologiaFlorestal from "./deck/cards_ecologia_florestal";
import estrelasAliens from "./dlc/cards_estrelas_aliens";
import testCards from "./.test/test_card";

// --- Tipos de Dados (do Original + baralho) ---
interface Opcao { id: number; texto: string; ordemTemp?: string; } // Adicionado ordemTemp para Criador
interface ItemRelacionar { id: number; texto: string; }
interface ZonaClicavel { id: number; x: number; y: number; largura: number; altura: number; descricao?: string; }
interface FragmentoCompletar { id: number; texto: string; }
interface CartaBase {
    id: string | number; tipo: string; titulo: string; pergunta: string;
    dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[];
    vantagem: string; desvantagem: string; dica: string;
    baralho?: string; // <<--- Adicionado/Confirmado: string opcional
    opcoes?: Opcao[]; // <<--- Adicionado como opcional na base
}
interface CartaComOpcoes extends CartaBase { opcoes: Opcao[]; } // Para tipos que sempre têm opções
interface CartaPergunta extends CartaComOpcoes { tipo: "Pergunta"; respostaCorreta: number; }
interface CartaMultiplaEscolha extends CartaComOpcoes { tipo: "MultiplaEscolha"; respostaCorreta: number[]; }
interface CartaOrdem extends CartaComOpcoes { tipo: "Ordem"; respostaCorreta: number[]; }
interface CartaVantagem extends CartaComOpcoes { tipo: "Vantagem"; respostaCorreta: number[]; }
interface CartaDesvantagem extends CartaComOpcoes { tipo: "Desvantagem"; respostaCorreta: number[]; }
interface CartaOutras extends CartaComOpcoes { tipo: "Outras"; respostaCorreta: number[]; }
interface CartaContraTempo extends CartaComOpcoes { tipo: "ContraTempo"; respostaCorreta: number; tempoLimite: number; } // TempoLimite agora é obrigatório aqui
interface CartaRelacionarColunas extends CartaBase { tipo: "RelacionarColunas"; colunaA: ItemRelacionar[]; colunaB: ItemRelacionar[]; respostaCorreta: { aId: number; bId: number }[]; } // opcoes removido daqui
interface CartaPontoCerto extends CartaBase { tipo: "PontoCerto"; imagemURL: string; zonasClicaveis: ZonaClicavel[]; respostaCorreta: number; } // opcoes removido daqui, imagemURL/zonas/resposta obrigatórios
interface CartaCompletarFrase extends CartaBase { tipo: "CompletarFrase"; fraseIncompleta: string; fragmentos: FragmentoCompletar[]; respostaCorreta: number[]; } // opcoes removido daqui, frase/fragmentos/resposta obrigatórios

type Carta =
    | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras
    | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;

// --- Interfaces de Jogador e Jogo (do Original) ---
interface Player {
    id: number; name: string; color: string; fixedStars: number; respostasCertas: number;
    respostasErradas: number; respostasSeguidas: number; progresso: number; pulosDisponiveis: number;
    contadorDeEstrelas: number; rodadasPreso: number;
}
interface PlayerInput { id: number; name: string; color: string; showColorPicker?: boolean; }
interface CustomDeck { id: number; name: string; cards: Carta[]; used: boolean; } // Mantido do original
interface GameState {
    players: Player[]; currentPlayerId: number | null; categoriasSelecionadas: string[]; ocultarCarta: boolean;
    probabilityIndex: number; jogoIniciado: boolean; customDecks: CustomDeck[]; usedDeckIds: number[]; // Mantido do original
    // Adicionado estado do filtro (se era do seu original, senão pode remover)
    mostrarSomentePerguntas?: boolean;
}
// Tipo interno para o estado do CriadorDeCarta
type CartaInterna = Carta & {
    origBaralhoId?: number; // ID do baralho de onde foi carregado (se aplicável)
    edited?: boolean;       // Flag se a carta foi editada
};


// --- Constantes (do Original) ---
const predefinedColors = [ "#9e0142","#f46d43","#fee08b","#66c2a5","#5e4fa2","#ff6699","#33a02c","#ff7f00", "#3288bd","#999999","#8dd3c7","#ffffb3","#fb8072","#80b1d3","#b3de69","#fccde5", "#bc80bd","#1f78b4","#e31a1c","#ffcc33","#6a3d9a","#b15928","#b2df8a","#cab2d6", "#a6cee3","#fb9a99","#fdbf6f","#ffed6f","#ccebc5","#ff4444", ];
const probabilitySettings = [ { value: 0, color: "#e5e7eb", label: "0%", textColor: "#1f2937" }, { value: 0.4, color: "#16a34a", label: "40%", textColor: "#ffffff" }, { value: 0.6, color: "#f97316", label: "60%", textColor: "#ffffff" }, { value: 0.8, color: "#dc2626", label: "80%", textColor: "#ffffff" }, ];
const tiposPergunta: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "Ordem", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"];
const tiposEspeciais: Carta['tipo'][] = ["Vantagem", "Desvantagem", "Outras"];
const CARD_TYPES = [ "Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase" ] as const; // Para Criador
type TipoCarta = typeof CARD_TYPES[number]; // Para Criador
const DIFFICULTIES = ["facil", "normal", "dificil"] as const; // Para Criador
type Dificuldade = typeof DIFFICULTIES[number]; // Para Criador
const DEFAULT_BARALHO_NAME = "Padrão"; // Adicionado para Criador


// --- Carregamento Inicial das Cartas (do Original) ---
const manejoPlantadas_raw = manejoPlantadas;
const manejoNativas_raw = manejoNativas;
const ecologiaFlorestal_raw = ecologiaFlorestal;
const estrelasAliens_raw = estrelasAliens;
const testCards_raw = testCards;
const cartasOriginais: Carta[] = [
    ...(manejoPlantadas_raw as Carta[]), ...(manejoNativas_raw as Carta[]), ...(ecologiaFlorestal_raw as Carta[]),
    ...(estrelasAliens_raw as Carta[]), ...(testCards_raw as Carta[]),
].map((card, index) => ({ ...card, id: card.id || `orig_${index}_${Math.random().toString(16).slice(2)}` }));

// --- Funções Utilitárias (do Original + parseParesRelacionar) ---
function parseJSDeckFile(content: string): Carta[] {
    try {
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) { throw new Error("Array não encontrado no arquivo JS."); }
        const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[];
        if (!Array.isArray(rawArray)) throw new Error("Conteúdo não é array.");
        return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[];
    } catch (error: any) { console.error("Erro parse JS:", error); throw new Error(`Erro processar JS: ${error.message}`); }
}
function recalcularCategorias(baseCards: Carta[], decks: CustomDeck[]): string[] {
    let allCards = [...baseCards]; decks.forEach(d => { if (d.used) { allCards = [...allCards, ...d.cards]; } });
    return Array.from(new Set(allCards.flatMap(c => c.categorias || []))).sort();
}
function isClickInZone(clickCoords: { x: number; y: number } | null, zone: ZonaClicavel): boolean {
    if (!clickCoords) return false; const { x, y } = clickCoords;
    return (x >= zone.x && x <= zone.x + zone.largura && y >= zone.y && y <= zone.y + zone.altura);
}
function parseParesRelacionar(input: string): { aId: number; bId: number }[] { // Adicionado do Criador
    const paresFormatados: { aId: number; bId: number }[] = []; if (!input || !input.trim()) { return paresFormatados; } const paresString = input.split(',');
    for (const parStr of paresString) { const partes = parStr.trim().split('-'); if (partes.length !== 2) { throw new Error(`Formato inválido "${parStr.trim()}". Use IDa-IDb.`); } const aId = parseInt(partes[0].trim(), 10); const bId = parseInt(partes[1].trim(), 10); if (isNaN(aId) || isNaN(bId)) { throw new Error(`IDs não numéricos em "${parStr.trim()}".`); } paresFormatados.push({ aId, bId }); } return paresFormatados;
}

// --- Componente TelaInicial (do Original, com ajustes menores) ---
interface TelaInicialProps {
    onStartGame: (initialState?: Partial<GameState>) => void; // Usa GameState do original
    categoriasDisponiveis: string[];
    initialCategoriasSelecionadas: string[];
    initialPlayers: Player[];
    initialOcultarCarta: boolean;
    initialProbabilityIndex: number;
    hasSavedGame: boolean;
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
            ? initialPlayers.map((p, index) => ({ id: p.id ?? index, name: p.name, color: p.color, showColorPicker: false }))
            : [{ id: Date.now(), name: "", color: predefinedColors[0], showColorPicker: false }]
    );
    const [customDecks, setCustomDecks] = useState<CustomDeck[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("customDecks"); // Chave original
            try { return saved ? JSON.parse(saved) as CustomDeck[] : []; } catch { return []; }
        } return [];
    });
    const [todasCategorias, setTodasCategorias] = useState<string[]>(() => recalcularCategorias(cartasOriginais, customDecks));
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Recalcula categorias se customDecks mudar
    useEffect(() => {
        const allCats = recalcularCategorias(cartasOriginais, customDecks);
        setTodasCategorias(allCats);
        // Mantém apenas categorias selecionadas que ainda existem
        setCategoriasSelecionadas((prevCats) => prevCats.filter((c) => allCats.includes(c)));
    }, [customDecks]);

    // Salva customDecks no localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("customDecks", JSON.stringify(customDecks));
        }
    }, [customDecks]);

    // Salva categorias selecionadas, ocultarCarta, probabilityIndex no localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const uiSettings = { categoriasSelecionadas, ocultarCarta, probabilityIndex };
            localStorage.setItem("ecoChallengeUISettings", JSON.stringify(uiSettings));
        }
    }, [categoriasSelecionadas, ocultarCarta, probabilityIndex]);

    // Carrega categorias, ocultar, prob do localStorage na montagem
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedUISettingsRaw = localStorage.getItem("ecoChallengeUISettings");
            try {
                const loadedUISettings = savedUISettingsRaw ? JSON.parse(savedUISettingsRaw) : {};
                setCategoriasSelecionadas(loadedUISettings.categoriasSelecionadas ?? initialCategoriasSelecionadas ?? []);
                setOcultarCarta(loadedUISettings.ocultarCarta ?? initialOcultarCarta ?? true);
                setProbabilityIndex(loadedUISettings.probabilityIndex ?? initialProbabilityIndex ?? 0);
            } catch (e) { console.error("Erro ao carregar UI Settings:", e); }
        }
    }, []); // Roda só na montagem

    const handleCustomDeckUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; if (!files || files.length === 0) return;
        setIsLoading(true); setErrorMessage(null);
        let newDecks: CustomDeck[] = []; let errors: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i]; const content = await file.text();
            try {
                let newCards: Carta[] = []; const deckName = file.name.replace(/\.(js|json)$/, "");
                if (customDecks.some(d => d.name === deckName)) { errors.push(`Baralho "${deckName}" já existe.`); continue; }
                if (file.name.endsWith(".js")) { newCards = parseJSDeckFile(content); }
                else if (file.name.endsWith(".json")) { const rawArray = JSON.parse(content) as any[]; newCards = rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${deckName}_${index}_${Date.now()}` })) as Carta[]; }
                else { errors.push(`Formato não suportado: ${file.name}. Use .js ou .json.`); continue; }
                if (!Array.isArray(newCards) || newCards.length === 0) { errors.push(`Nenhuma carta válida encontrada em "${deckName}".`); continue; }
                // Validação básica da estrutura da primeira carta (exemplo)
                if (!newCards[0] || typeof newCards[0].tipo !== 'string' || typeof newCards[0].titulo !== 'string') {
                    errors.push(`Estrutura inválida detectada em "${deckName}". Verifique o formato das cartas.`); continue;
                }
                newDecks.push({ id: Date.now() + Math.random(), name: deckName, cards: newCards, used: false });
            } catch (error: any) { errors.push(`Erro ao ler ${file.name}: ${error.message}`); }
        }
        if (newDecks.length > 0) { setCustomDecks((prev) => [...prev, ...newDecks]); }
        if (errors.length > 0) { setErrorMessage(errors.join("\n")); }
        setIsLoading(false); e.target.value = '';
    };
    const toggleDeckUsage = (deckId: number) => { setCustomDecks((prev) => prev.map((d) => (d.id === deckId ? { ...d, used: !d.used } : d))); };
    const removeDeck = (deckId: number) => { if (window.confirm("Remover baralho permanentemente?")) { setCustomDecks((prev) => prev.filter((d) => d.id !== deckId)); } };
    const addPlayerInput = () => { if (playerInputs.length < 8) { setPlayerInputs([...playerInputs, { id: Date.now(), name: "", color: predefinedColors[playerInputs.length % predefinedColors.length], showColorPicker: false, }]); } };
    const handlePlayerChange = (id: number, field: "name" | "color", value: string) => { setPlayerInputs(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p)); };
    const toggleColorPicker = (id: number) => { setPlayerInputs(prev => prev.map(p => p.id === id ? { ...p, showColorPicker: !p.showColorPicker } : { ...p, showColorPicker: false })); };
    const deletePlayer = (id: number) => { if(playerInputs.length > 1) {setPlayerInputs((prev) => prev.filter((p) => p.id !== id)); } else { setErrorMessage("É necessário pelo menos um jogador.") } };

    const handleStartGame = (continueGame = false) => {
        let gameStateToStart: Partial<GameState>;
        if (continueGame && typeof window !== "undefined") {
             const savedStateRaw = localStorage.getItem("estadoEcoChallenge"); // Usa constante
             try {
                 const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                 if (savedState && savedState.jogoIniciado) {
                      // Recarrega os custom decks salvos para garantir consistência
                      const currentCustomDecks = JSON.parse(localStorage.getItem("customDecks") || '[]') as CustomDeck[];
                      const usedDeckIdsFromSave = savedState.usedDeckIds || [];
                      const finalCustomDecks = currentCustomDecks.map(deck => ({ ...deck, used: usedDeckIdsFromSave.includes(deck.id) }));
                      gameStateToStart = {
                          ...savedState, // Usa estado salvo (players, currentPlayerId, etc)
                          customDecks: finalCustomDecks, // Atualiza com base no localStorage atual
                          // Atualiza com configurações da UI atual
                          categoriasSelecionadas: categoriasSelecionadas,
                          ocultarCarta: ocultarCarta,
                          probabilityIndex: probabilityIndex,
                          jogoIniciado: true,
                      };
                 } else { console.warn("Jogo salvo inválido, iniciando novo."); return handleStartGame(false); }
             } catch (e) { console.error("Erro ao carregar jogo salvo:", e); return handleStartGame(false); }
        } else {
            // Iniciar novo jogo
            if (categoriasSelecionadas.length === 0) { alert("Selecione pelo menos uma categoria."); return; }
            if (playerInputs.length === 0) { alert("Adicione pelo menos um jogador."); return;}
            // Usa nome padrão se vazio
            const initializedPlayers: Player[] = playerInputs.map((input, index) => ({
                id: index, // IDs sequenciais 0, 1, 2...
                name: input.name.trim() || `Jogador ${index + 1}`,
                color: input.color || predefinedColors[index % predefinedColors.length],
                fixedStars: 0, respostasCertas: 0, respostasErradas: 0, respostasSeguidas: 0,
                progresso: 0, pulosDisponiveis: 0, contadorDeEstrelas: 0, rodadasPreso: 0
            }));
             if (initializedPlayers.length === 0) { alert("Erro: Nenhum jogador válido."); return; } // Verificação extra
            gameStateToStart = {
                players: initializedPlayers,
                currentPlayerId: initializedPlayers[0]?.id ?? null,
                categoriasSelecionadas: categoriasSelecionadas,
                ocultarCarta: ocultarCarta,
                probabilityIndex: probabilityIndex,
                customDecks: customDecks, // Passa os decks atuais
                usedDeckIds: customDecks.filter(d => d.used).map(d => d.id), // IDs dos decks usados
                jogoIniciado: true,
                mostrarSomentePerguntas: false // Default para novo jogo
            };
        }
        onStartGame(gameStateToStart); // Passa o estado para o componente pai
    };

    const categoriasFiltradas = todasCategorias.filter((cat) => cat.toLowerCase().includes(termoBusca.toLowerCase())).sort();
    const cycleProbability = () => { setProbabilityIndex((prevIndex) => (prevIndex + 1) % probabilitySettings.length); };

    // --- JSX Tela Inicial (com indentação melhorada) ---
    return (
        <Card className="w-full max-w-lg mx-auto mt-8 mb-8 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-700">Eco Challenge</CardTitle>
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
                        className="w-full p-2 border rounded h-9"
                        aria-label="Pesquisar categorias"
                    />
                    <ScrollArea className="h-40 border rounded-md p-3 bg-gray-50">
                        {categoriasFiltradas.length > 0 ? (
                            categoriasFiltradas.map((categoria) => (
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
                                    >
                                        {categoria}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic text-center pt-4">
                                Nenhuma categoria encontrada{termoBusca ? ' para "' + termoBusca + '"' : ''}.
                            </p>
                        )}
                    </ScrollArea>
                    <div className="flex space-x-2 mt-2">
                        <Button
                            onClick={() => setCategoriasSelecionadas(todasCategorias)}
                            variant="outline" size="sm" className="flex-1"
                            disabled={todasCategorias.length === 0}
                        >
                            Todas ({todasCategorias.length})
                        </Button>
                        <Button
                            onClick={() => setCategoriasSelecionadas([])}
                            variant="outline" size="sm" className="flex-1"
                        >
                            Nenhuma
                        </Button>
                    </div>
                </div>

                {/* Configuração de Jogadores */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Jogadores</h3>
                    {/* ScrollArea com altura corrigida */}
                    <ScrollArea className="max-h-60 space-y-2 pr-2 border rounded-md bg-gray-50 p-2">
                        {playerInputs.map((player, index) => (
                            <div key={player.id} className="border p-3 rounded-md shadow-sm bg-white relative">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="text"
                                        placeholder={`Jogador ${index + 1}`}
                                        value={player.name}
                                        maxLength={15}
                                        onChange={(e) => handlePlayerChange(player.id, "name", e.target.value)}
                                        className="flex-grow h-8 text-sm"
                                        aria-label={`Nome Jogador ${index + 1}`}
                                    />
                                    <Button
                                        variant="outline" size="icon" className="w-8 h-8 flex-shrink-0 border-2"
                                        onClick={() => toggleColorPicker(player.id)}
                                        style={{ backgroundColor: player.color }} aria-label="Selecionar cor"
                                    />
                                    <Button
                                        variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 text-red-500 hover:bg-red-100"
                                        onClick={() => deletePlayer(player.id)} aria-label="Remover jogador" title="Remover Jogador"
                                        disabled={playerInputs.length <= 1}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                                {player.showColorPicker && (
                                    <div className="absolute z-20 mt-2 right-12 w-48 bg-white border rounded-md shadow-lg p-2 grid grid-cols-6 gap-1">
                                        {predefinedColors.map((color, idx) => (
                                            <button
                                                key={idx} aria-label={`Selecionar cor ${color}`} style={{ backgroundColor: color }}
                                                className={cn('w-6 h-6 rounded border hover:ring-2 hover:ring-offset-1 hover:ring-gray-500', player.color === color ? 'ring-2 ring-offset-1 ring-black' : 'border-gray-300')}
                                                onClick={() => { handlePlayerChange(player.id, "color", color); toggleColorPicker(player.id); }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                    {playerInputs.length < 8 && (
                        <Button onClick={addPlayerInput} variant="secondary" className="w-full mt-1 h-9">
                            + Adicionar Jogador
                        </Button>
                    )}
                </div>

                {/* Baralhos Personalizados */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">Baralhos Personalizados (.js/.json)</h3>
                    {errorMessage && (<Alert variant="destructive"><AlertDescription>{errorMessage}</AlertDescription></Alert>)}
                    <Input
                        type="file" multiple accept=".js,.json" onChange={handleCustomDeckUpload}
                        disabled={isLoading} className="text-sm h-9" aria-label="Carregar baralhos personalizados"
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
                                        size="sm" variant={deck.used ? "default" : "outline"}
                                        onClick={() => toggleDeckUsage(deck.id)}
                                        className={cn('h-7 px-2 text-xs', deck.used ? 'bg-green-600 hover:bg-green-700' : '')}
                                    >
                                        {deck.used ? "Ativo" : "Usar"}
                                    </Button>
                                    <Button
                                        size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-500 hover:bg-red-100"
                                        onClick={() => removeDeck(deck.id)} aria-label={`Remover baralho ${deck.name}`}
                                        title={`Remover baralho ${deck.name}`}
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </ScrollArea>
                    )}
                    {customDecks.length === 0 && !isLoading && (<p className="text-sm text-gray-500 italic">Nenhum baralho personalizado carregado.</p>)}
                </div>

                {/* Opções de Jogo */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Opções</h3>
                    <Button
                        onClick={() => setOcultarCarta(!ocultarCarta)} variant="outline"
                        className="w-full flex items-center justify-center space-x-2 h-9"
                        title={ocultarCarta ? "Desativar ocultar carta" : "Ativar ocultar carta"}
                    >
                        {ocultarCarta ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{ocultarCarta ? "Ocultar Carta Ativado" : "Ocultar Carta Desativado"}</span>
                    </Button>
                    <Button
                        onClick={cycleProbability} className="w-full flex items-center justify-center space-x-2 h-9"
                        style={{ backgroundColor: probabilitySettings[probabilityIndex].color, color: probabilitySettings[probabilityIndex].textColor, border: `1px solid ${probabilitySettings[probabilityIndex].textColor === '#ffffff' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.2)'}` }}
                        title={`Probabilidade de excluir especiais. Atual: ${probabilitySettings[probabilityIndex].label}`}
                    >
                        <span>% Excluir Especiais:</span>
                        <span className="font-bold">{probabilitySettings[probabilityIndex].label}</span>
                    </Button>
                </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 pt-6 border-t">
                {hasSavedGame && (
                    <Button onClick={() => handleStartGame(true)} className="w-full bg-blue-600 hover:bg-blue-700 h-10" disabled={isLoading}>
                        Continuar Jogo Salvo
                    </Button>
                )}
                <Button
                    onClick={() => handleStartGame(false)}
                    className="w-full bg-green-600 hover:bg-green-700 h-10"
                    disabled={categoriasSelecionadas.length === 0 || playerInputs.length === 0 || isLoading}
                >
                    {hasSavedGame ? "Iniciar Novo Jogo" : "Iniciar Jogo"}
                </Button>
            </CardFooter>
        </Card>
    );
};

// --- Componente Principal EcoChallenge (do Original, com filtro reintegrado e correções) ---
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
    const [mostrarSomentePerguntas, setMostrarSomentePerguntas] = useState(false); // <<--- REINTEGRADO
    const [rolledNumber, setRolledNumber] = useState<number | null>(null);
    const [rollingNumber, setRollingNumber] = useState<number | null>(null);
    const [isDieModalOpen, setIsDieModalOpen] = useState(false);
    const [isRolling, setIsRolling] = useState(false);
    const [isClientReady, setIsClientReady] = useState(false); // Para evitar hydration mismatch

    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

    // Função para salvar estado (incluindo filtro)
    const saveGameState = useCallback((stateToSave: GameState | null) => {
        if (stateToSave && typeof window !== "undefined") {
            try {
                localStorage.setItem("estadoEcoChallenge", JSON.stringify(stateToSave));
            } catch (e) { console.error("Erro ao salvar estado:", e); }
        }
    }, []);

    // Função para atualizar o estado e salvar
    const updateGameState = useCallback((newState: Partial<GameState>) => {
        setGameState(prev => {
            if (!prev) return null;
            const updatedState = { ...prev, ...newState };
            saveGameState(updatedState); // Salva após cada atualização
            return updatedState;
        });
    }, [saveGameState]); // Depende da função de salvar

    const updateCurrentPlayer = useCallback((partialPlayerData: Partial<Player>) => {
        if (!gameState || gameState.currentPlayerId === null) return;
        const playerExists = gameState.players.some(p => p.id === gameState.currentPlayerId);
        if (!playerExists) return;
        const updatedPlayers = gameState.players.map(p =>
            p.id === gameState.currentPlayerId ? { ...p, ...partialPlayerData } : p
        );
        updateGameState({ players: updatedPlayers });
    }, [gameState, updateGameState]);

    // Carregar estado na montagem
    useEffect(() => {
        setIsClientReady(true); // Indica que estamos no cliente
        if (typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
            try {
                const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null;
                if (savedState && savedState.jogoIniciado) {
                    console.log("Carregando jogo salvo:", savedState);
                    // Recarrega custom decks do local storage deles
                    const savedCustomDecksRaw = localStorage.getItem("customDecks");
                    const currentCustomDecks = savedCustomDecksRaw ? JSON.parse(savedCustomDecksRaw) as CustomDeck[] : [];
                    const usedDeckIdsFromSave = savedState.usedDeckIds || [];
                    const finalCustomDecks = currentCustomDecks.map(deck => ({ ...deck, used: usedDeckIdsFromSave.includes(deck.id) }));
                    setGameState({ ...savedState, customDecks: finalCustomDecks });
                    setMostrarSomentePerguntas(savedState.mostrarSomentePerguntas ?? false); // Carrega o filtro
                }
            } catch (e) {
                console.error("Erro ao carregar estado:", e);
                localStorage.removeItem("estadoEcoChallenge"); // Limpa estado inválido
            }
        }
    }, []); // Roda apenas na montagem inicial do cliente

    // Selecionar carta (considerando o filtro)
    const selecionarCartaAleatoria = useCallback(() => {
        if (!gameState || !gameState.players || gameState.players.length === 0) return;
        const { categoriasSelecionadas, probabilityIndex, customDecks, mostrarSomentePerguntas: filtroPerguntasAtivo } = gameState;
        const probabilidadeExcluirEspecial = probabilitySettings[probabilityIndex].value;
        const incluirCartasEspeciais = probabilidadeExcluirEspecial === 0 || Math.random() >= probabilidadeExcluirEspecial;

        let baralhoCompleto = [...cartasOriginais];
        customDecks.forEach(deck => { if (deck.used) { baralhoCompleto = [...baralhoCompleto, ...deck.cards]; } });

        const cartasFiltradas = baralhoCompleto.filter(c => {
            const categoriaValida = c.categorias?.some(cat => categoriasSelecionadas.includes(cat));
            if (!categoriaValida) return false;
            const isTipoPergunta = tiposPergunta.includes(c.tipo);
            const isTipoEspecial = tiposEspeciais.includes(c.tipo);
            // Aplica filtros
            if (filtroPerguntasAtivo && !isTipoPergunta) return false;
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

        // Reset estado da rodada
        setRespondido(false); setMensagem(""); setMostrarDica(false); setDicaUsada(false); setMostrarFontes(false);
        setOpcoesEliminadas([]); setCartaRevelada(!gameState.ocultarCarta); setRolledNumber(null); setIsDieModalOpen(false);
        setSelecionado(null); setSelecoesMultiplas([]); setOrdemSelecoes([]); setTempoRestante(null); setSelecaoColunaA(null);
        setParesFormados([]); setCoordenadasClique(null); setFragmentosSelecionados([]);

        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (novaCarta.tipo === "ContraTempo") { setTempoRestante(novaCarta.tempoLimite); }

    }, [gameState]); // Depende do gameState completo

    // Efeito para selecionar primeira carta
    useEffect(() => {
        if (gameState?.jogoIniciado && gameState.players.length > 0 && !cartaAtual && !noCardsAvailable) {
            selecionarCartaAleatoria();
        }
    }, [gameState?.jogoIniciado, gameState?.players, cartaAtual, noCardsAvailable, selecionarCartaAleatoria]);

    // Efeito do Timer
    useEffect(() => {
        if (cartaAtual?.tipo === "ContraTempo" && tempoRestante !== null && tempoRestante > 0 && !respondido && gameState?.jogoIniciado && cartaRevelada) {
            timerIntervalRef.current = setInterval(() => {
                setTempoRestante((prev) => {
                    if (prev === null || prev <= 1) {
                        clearInterval(timerIntervalRef.current!); timerIntervalRef.current = null;
                        setRespondido(true); setMensagem(`Tempo esgotado! ${cartaAtual.desvantagem || 'Tente novamente.'}`);
                        // Atualiza jogador diretamente para evitar loop de dependência complexo
                        setGameState(currentGameState => {
                            if (!currentGameState || currentGameState.currentPlayerId === null) return currentGameState;
                            const updatedPlayers = currentGameState.players.map(p => p.id === currentGameState.currentPlayerId ? { ...p, respostasErradas: p.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(0, p.progresso - 10) } : p );
                            const finalState = { ...currentGameState, players: updatedPlayers };
                            saveGameState(finalState); // Salva o estado atualizado
                            return finalState;
                        }); return 0;
                    } return prev - 1;
                });
            }, 1000);
        } else if (timerIntervalRef.current && (respondido || tempoRestante === 0 || !cartaRevelada || !gameState?.jogoIniciado)) {
            clearInterval(timerIntervalRef.current); timerIntervalRef.current = null;
        }
        return () => { if (timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; } };
    }, [cartaAtual, tempoRestante, respondido, gameState?.jogoIniciado, cartaRevelada, gameState?.currentPlayerId, saveGameState]); // Adicionado saveGameState


    // --- Handlers ---
    const handleSelecao = (id: number) => { if (!respondido) setSelecionado(id); };
    const handleSelecaoMultipla = (id: number) => { if (!respondido) { setSelecoesMultiplas((prev) => prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]); } };
    const handleSelecaoOrdem = (id: number) => { if (!respondido) { setOrdemSelecoes((prev) => prev.includes(id) ? prev.filter((selId) => selId !== id) : [...prev, id]); } };
    const handleSelecionarColunaA = (id: number) => { if (respondido) return; const parExistenteIndex = paresFormados.findIndex(p => p.aId === id); if (parExistenteIndex > -1) { setParesFormados(prev => prev.filter((_, index) => index !== parExistenteIndex)); setSelecaoColunaA(null); } else { setSelecaoColunaA(id === selecaoColunaA ? null : id); } };
    const handleSelecionarColunaB = (id: number) => { if (respondido || selecaoColunaA === null) return; if (paresFormados.some(p => p.bId === id)) return; setParesFormados(prev => [...prev, { aId: selecaoColunaA, bId: id }]); setSelecaoColunaA(null); };
    const handleImagemClick = (event: React.MouseEvent<HTMLDivElement>) => { if (respondido || !cartaAtual || cartaAtual.tipo !== 'PontoCerto') return; const target = event.currentTarget; const rect = target.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width; const y = (event.clientY - rect.top) / rect.height; const clampedX = Math.max(0, Math.min(1, x)); const clampedY = Math.max(0, Math.min(1, y)); setCoordenadasClique({ x: clampedX, y: clampedY }); };
    const handleSelecionarFragmento = (id: number) => { if (respondido) return; setFragmentosSelecionados(prev => [...prev, id]); };
    const limparFragmentos = () => { if (!respondido) { setFragmentosSelecionados([]); } };

    // Verificar Resposta (Lógica original mantida)
    const verificarResposta = () => {
        if (!cartaAtual || !gameState || !gameState.players || gameState.currentPlayerId === null || respondido) return;
        const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId); if (!currentPlayer) return;
        let cor = false; let pontosGanhos = 20; let pontosPerdidos = 10; let darPuloDificil = cartaAtual.dificuldade === "dificil"; let mensagemFinal = ""; let aplicarEfeitoPadrao = false;
        if (cartaAtual.tipo === "ContraTempo" && timerIntervalRef.current) { clearInterval(timerIntervalRef.current); timerIntervalRef.current = null; }
        switch (cartaAtual.tipo) {
            case "Pergunta": case "ContraTempo": if (cartaAtual.tipo === "ContraTempo" && (tempoRestante === null || tempoRestante <= 0)) { cor = false; } else { cor = selecionado === cartaAtual.respostaCorreta; } aplicarEfeitoPadrao = true; break;
            case "MultiplaEscolha": cor = Array.isArray(cartaAtual.respostaCorreta) && selecoesMultiplas.length === cartaAtual.respostaCorreta.length && selecoesMultiplas.every(sel => cartaAtual.respostaCorreta.includes(sel)) && cartaAtual.respostaCorreta.every(res => selecoesMultiplas.includes(res)); if (cor) pontosGanhos = 25; aplicarEfeitoPadrao = true; break;
            case "Ordem": cor = Array.isArray(cartaAtual.respostaCorreta) && ordemSelecoes.length === cartaAtual.respostaCorreta.length && ordemSelecoes.toString() === cartaAtual.respostaCorreta.toString(); if (cor) pontosGanhos = 30; darPuloDificil = true; aplicarEfeitoPadrao = true; break;
            case "RelacionarColunas": if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } const paresFormadosStr = paresFormados.map(p => `${p.aId}-${p.bId}`).sort().join(','); const paresCorretosStr = cartaAtual.respostaCorreta.map(p => `${p.aId}-${p.bId}`).sort().join(','); cor = paresFormados.length === cartaAtual.respostaCorreta.length && paresFormadosStr === paresCorretosStr; if (cor) pontosGanhos = 30; darPuloDificil = true; aplicarEfeitoPadrao = true; break;
            case "PontoCerto": if (!coordenadasClique || !Array.isArray(cartaAtual.zonasClicaveis)) { cor = false; break; } const zonaCorreta = cartaAtual.zonasClicaveis.find(z => z.id === cartaAtual.respostaCorreta); cor = zonaCorreta ? isClickInZone(coordenadasClique, zonaCorreta) : false; if (cor) pontosGanhos = 25; darPuloDificil = true; aplicarEfeitoPadrao = true; break;
            case "CompletarFrase": if (!Array.isArray(cartaAtual.respostaCorreta)) { cor = false; break; } cor = fragmentosSelecionados.length === cartaAtual.respostaCorreta.length && fragmentosSelecionados.toString() === cartaAtual.respostaCorreta.toString(); if (cor) pontosGanhos = 25; darPuloDificil = true; aplicarEfeitoPadrao = true; break;
            case "Vantagem": cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado); mensagemFinal = cor ? (cartaAtual.vantagem || "Vantagem aplicada!") : "Ação não confirmada."; break;
            case "Desvantagem": cor = false; mensagemFinal = cartaAtual.desvantagem || "Desvantagem aplicada."; break;
            case "Outras": cor = selecionado !== null && Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.includes(selecionado); mensagemFinal = cor ? (cartaAtual.vantagem || 'Ok!') : (cartaAtual.desvantagem || 'Hmm...'); break;
            default: const _exhaustiveCheck: never = cartaAtual; return;
        }
        setRespondido(true);
        if (aplicarEfeitoPadrao) {
            if (cartaAtual.dificuldade === 'facil') { pontosGanhos *= 0.8; pontosPerdidos *= 0.8; } if (cartaAtual.dificuldade === 'dificil') { pontosGanhos *= 1.2; pontosPerdidos *= 1.2; } pontosGanhos = Math.round(pontosGanhos); pontosPerdidos = Math.round(pontosPerdidos);
            if (cor) { const novoProgresso = currentPlayer.progresso + pontosGanhos; const completouBarra = novoProgresso >= 100; const pulosGanhos = (completouBarra ? 1 : 0) + (darPuloDificil ? 1 : 0); const estrelasFixasGanhsa = completouBarra ? 1 : 0; updateCurrentPlayer({ respostasCertas: currentPlayer.respostasCertas + 1, respostasSeguidas: currentPlayer.respostasSeguidas + 1, progresso: completouBarra ? 0 : novoProgresso, pulosDisponiveis: Math.min(currentPlayer.pulosDisponiveis + pulosGanhos, 2), fixedStars: currentPlayer.fixedStars + estrelasFixasGanhsa, }); mensagemFinal = `Correto! ${cartaAtual.vantagem || ''}${completouBarra ? ' Barra completa! (+1 Estrela, +1 Pulo)' : ''}${!completouBarra && pulosGanhos > 0 ? ' (+1 Pulo)' : ''}`; }
            else { updateCurrentPlayer({ respostasErradas: currentPlayer.respostasErradas + 1, respostasSeguidas: 0, progresso: Math.max(0, currentPlayer.progresso - pontosPerdidos), }); let detalheErro = ""; /* Removida lógica de detalhe de erro para Ordem */ mensagemFinal = `Incorreto. ${cartaAtual.desvantagem || ''}${detalheErro}`; }
        }
        setMensagem(mensagemFinal);
    };

    // Ações do Jogador (Mantidas do original, com filtro reintegrado)
    const resetarContadoresJogador = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp || !window.confirm(`Resetar ${cp.name}?`)) return; updateCurrentPlayer({ respostasCertas: 0, respostasErradas: 0, progresso: 0, pulosDisponiveis: 0, respostasSeguidas: 0, rodadasPreso: 0, contadorDeEstrelas: 0, fixedStars: 0 }); setMensagem(`${cp.name} resetado.`); };
    const toggleDica = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return; if (dicaUsada) { setMensagem("Dica já utilizada."); return; } if (!cartaAtual.dica) { setMensagem("Carta sem dica."); return; } if (cp.respostasSeguidas >= 2) { setMostrarDica(true); setDicaUsada(true); updateCurrentPlayer({ respostasSeguidas: cp.respostasSeguidas - 2 }); setMensagem("Dica revelada! (-2 sequências)"); } else { setMensagem("São necessárias 2 respostas corretas seguidas."); } };
    const toggleFontes = () => { if (!cartaAtual || (gameState?.ocultarCarta && !cartaRevelada)) return; if (cartaAtual.fontes && cartaAtual.fontes.length > 0) { setMostrarFontes(!mostrarFontes); } else { setMensagem("Nenhuma fonte disponível."); } };
    const pularPergunta = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return; if (!tiposPergunta.includes(cartaAtual.tipo)) { setMensagem("Não pode pular este tipo."); return; } if (cp.pulosDisponiveis > 0) { updateCurrentPlayer({ pulosDisponiveis: cp.pulosDisponiveis - 1 }); setMensagem("Carta pulada!"); setTimeout(selecionarCartaAleatoria, 500); } else { setMensagem("Sem pulos disponíveis."); } };
    const eliminarRespostaErrada = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp || !cartaAtual || respondido || (gameState?.ocultarCarta && !cartaRevelada)) return; const tiposEliminaveis: Carta['tipo'][] = ["Pergunta", "MultiplaEscolha", "ContraTempo", "Outras"]; if (!tiposEliminaveis.includes(cartaAtual.tipo) || !('opcoes' in cartaAtual) || cartaAtual.opcoes.length <= 2) { setMensagem("Não é possível eliminar opções."); return; } if (cp.respostasSeguidas < 2) { setMensagem("São necessárias 2 respostas corretas seguidas."); return; } let respostaCorretaNumeros: number[] = []; if (cartaAtual.tipo === "Pergunta" || cartaAtual.tipo === "ContraTempo") { respostaCorretaNumeros = [cartaAtual.respostaCorreta]; } else if (cartaAtual.tipo === "MultiplaEscolha" || cartaAtual.tipo === "Outras") { if (Array.isArray(cartaAtual.respostaCorreta) && cartaAtual.respostaCorreta.every(item => typeof item === 'number')) { respostaCorretaNumeros = cartaAtual.respostaCorreta as number[]; } else { return; } } else { return; } const opcoesErradasDisponiveis = cartaAtual.opcoes.filter(op => !respostaCorretaNumeros.includes(op.id) && !opcoesEliminadas.includes(op.id)); if (opcoesErradasDisponiveis.length > 0) { const idxAleat = Math.floor(Math.random() * opcoesErradasDisponiveis.length); const opcaoEliminada = opcoesErradasDisponiveis[idxAleat].id; setOpcoesEliminadas((prev) => [...prev, opcaoEliminada]); updateCurrentPlayer({ respostasSeguidas: cp.respostasSeguidas - 2 }); setMensagem("Uma opção incorreta foi eliminada! (-2 sequências)"); } else { setMensagem("Não há mais opções incorretas para eliminar."); } };
    const voltarTelaInicial = () => { if (window.confirm("Voltar para a Tela Inicial? Progresso salvo.")) { setGameState(null); setCartaAtual(null); setNoCardsAvailable(false); setRespondido(false); setMensagem(""); } };
    const diminuirAcertos = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ respostasCertas: Math.max(0, cp.respostasCertas - 1) }); setMensagem("Acerto removido."); };
    const diminuirErros = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ respostasErradas: Math.max(0, cp.respostasErradas - 1) }); setMensagem("Erro removido."); };
    const incrementarContadorDeEstrelas = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ contadorDeEstrelas: cp.contadorDeEstrelas + 1 }); setMensagem("Estrela bônus adicionada."); };
    const diminuirContadorDeEstrelas = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ contadorDeEstrelas: Math.max(0, cp.contadorDeEstrelas - 1) }); setMensagem("Estrela bônus removida."); };
    const incrementarRodadasPreso = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ rodadasPreso: cp.rodadasPreso + 1 }); setMensagem("Rodada preso adicionada."); };
    const diminuirRodadasPreso = () => { const cp = gameState?.players.find(p => p.id === gameState?.currentPlayerId); if (!cp) return; updateCurrentPlayer({ rodadasPreso: cp.rodadasPreso - 1 }); setMensagem("Rodada preso removida."); };
    const rolarDado = () => { if (isRolling) return; setIsRolling(true); setIsDieModalOpen(true); setRolledNumber(null); let rollCount = 0; const maxRolls = 15; const rollInterval = setInterval(() => { setRollingNumber(Math.floor(Math.random() * 6) + 1); rollCount++; if (rollCount >= maxRolls) { clearInterval(rollInterval); const finalNumber = Math.floor(Math.random() * 6) + 1; setRolledNumber(finalNumber); setRollingNumber(null); setIsRolling(false); } }, 80); };
    const handleLongPressStart = (action: () => void) => { longPressTimeout.current = setTimeout(() => { rolarDado(); }, 700); }; // Permite long press mesmo desabilitado
    const handleLongPressEnd = () => { if (longPressTimeout.current) { clearTimeout(longPressTimeout.current); longPressTimeout.current = null; } };

    // --- Renderização ---
    if (!isClientReady) { return <div className="flex items-center justify-center min-h-screen"><p>Carregando...</p></div>; }
    if (!gameState) {
        // Lógica para buscar dados iniciais para TelaInicial (se necessário)
        let hasSaved = false; let initialPlayersData: Player[] = []; let initialOcultar = true; let initialProb = 0; let initialCategorias: string[] = [];
        if (typeof window !== "undefined") {
            const savedStateRaw = localStorage.getItem("estadoEcoChallenge");
            const savedUISettingsRaw = localStorage.getItem(LOCALSTORAGE_KEYS.UI_SETTINGS);
            try { const savedState = savedStateRaw ? JSON.parse(savedStateRaw) as GameState : null; if (savedState && savedState.jogoIniciado) { hasSaved = true; initialPlayersData = savedState.players || []; } } catch(e) { console.error("Erro ler estado salvo (jogo):", e); }
            try { const loadedUISettings = savedUISettingsRaw ? JSON.parse(savedUISettingsRaw) : {}; initialCategorias = loadedUISettings.categoriasSelecionadas ?? []; initialOcultar = loadedUISettings.ocultarCarta ?? true; initialProb = loadedUISettings.probabilityIndex ?? 0; } catch(e) { console.error("Erro ler estado salvo (UI):", e); }
        }
        const catsDisponiveis = recalcularCategorias(cartasOriginais, []); // Calcula categorias base sem carregar custom decks aqui
        return (
            <TelaInicial
                onStartGame={(initialState) => { if (initialState) { setGameState(initialState as GameState); } }}
                categoriasDisponiveis={catsDisponiveis}
                initialCategoriasSelecionadas={initialCategorias}
                initialPlayers={initialPlayersData}
                initialOcultarCarta={initialOcultar}
                initialProbabilityIndex={initialProb}
                hasSavedGame={hasSaved}
            />
        );
    }

    // Se o jogo está ativo
    const { players, currentPlayerId, ocultarCarta: isCartaOculta, mostrarSomentePerguntas: filtroPerguntasAtivo } = gameState;
    const currentPlayer = players.find(p => p.id === currentPlayerId);
    if (noCardsAvailable) { return ( <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center"><Card className="p-6 shadow-lg max-w-sm"><CardHeader><CardTitle className="text-xl text-red-600">Sem Cartas!</CardTitle></CardHeader><CardContent><p className="mb-4">Nenhuma carta encontrada.</p><p className="text-sm text-gray-600 mb-4">Ajuste filtros/baralhos na tela inicial.</p></CardContent><CardFooter><Button onClick={voltarTelaInicial} className="w-full">Voltar</Button></CardFooter></Card></div> ); }
    if (!cartaAtual || !currentPlayer) { return ( <div className="flex flex-col items-center justify-center min-h-screen"><p className="mb-4">Carregando...</p><Button onClick={voltarTelaInicial} variant="outline">Voltar (Forçar)</Button></div> ); }

    // Funções auxiliares de renderização
    const obterEstiloCarta = () => { if (isCartaOculta && !cartaRevelada) return "border-gray-400 bg-gray-100"; switch (cartaAtual.tipo) { case "Vantagem": return "border-green-500 bg-green-50"; case "Desvantagem": return "border-red-500 bg-red-50"; case "Outras": return "border-blue-500 bg-blue-50"; case "ContraTempo": return "border-yellow-500 bg-yellow-50"; default: return "border-gray-300 bg-white"; } };
    const isVerificarDisabled = () => { if (respondido) return true; if (isCartaOculta && !cartaRevelada) return true; switch (cartaAtual.tipo) { case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras": return selecionado === null; case "MultiplaEscolha": return selecoesMultiplas.length === 0; case "Ordem": return !('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || ordemSelecoes.length !== cartaAtual.opcoes.length; case "RelacionarColunas": return !('respostaCorreta' in cartaAtual) || !Array.isArray(cartaAtual.respostaCorreta) || paresFormados.length !== cartaAtual.respostaCorreta.length; case "PontoCerto": return coordenadasClique === null; case "CompletarFrase": return !('respostaCorreta' in cartaAtual) || !Array.isArray(cartaAtual.respostaCorreta) || fragmentosSelecionados.length !== cartaAtual.respostaCorreta.length; default: return true; } };
    const getAlertVariant = (): "default" | "destructive" => { if (!mensagem) return "default"; const lowerMsg = mensagem.toLowerCase(); if (lowerMsg.includes('incorreto') || lowerMsg.includes('desvantagem') || lowerMsg.includes('tempo esgotado') || lowerMsg.includes('erro')) return "destructive"; if (lowerMsg.includes('correto') || lowerMsg.includes('vantagem') || lowerMsg.includes('barra completa')) return "default"; return "default"; };
    const isInfoAlert = !mensagem.toLowerCase().includes('correto') && !mensagem.toLowerCase().includes('vantagem') && !mensagem.toLowerCase().includes('barra completa') && !mensagem.toLowerCase().includes('incorreto') && !mensagem.toLowerCase().includes('desvantagem') && !mensagem.toLowerCase().includes('tempo esgotado') && !mensagem.toLowerCase().includes('erro') && cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem';

    // --- JSX Principal do Jogo (Com Indentação Melhorada) ---
    return (
        <div className="flex flex-col items-center p-2 md:p-4 min-h-screen bg-gradient-to-b from-green-50 to-blue-100 font-sans">
            {/* Card Principal */}
            <Card
                className={cn(
                    "w-full max-w-lg mx-auto mt-4 mb-6 shadow-xl border-2 rounded-lg transition-all duration-300",
                    obterEstiloCarta()
                )}
                style={players.length > 0 && currentPlayer && !(isCartaOculta && !cartaRevelada)
                    ? { boxShadow: `0 0 15px 3px ${currentPlayer.color}` }
                    : {}
                }
            >
                {/* CardHeader */}
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2 gap-2">
                        {/* Esquerda: Filtro + Título/Categoria */}
                        <div className="flex items-start space-x-2 flex-1 min-w-0">
                             {/* Botão Filtro */}
                            <Button
                                onClick={() => updateGameState({ mostrarSomentePerguntas: !filtroPerguntasAtivo })}
                                size="sm"
                                variant={filtroPerguntasAtivo ? "secondary" : "outline"}
                                title={filtroPerguntasAtivo ? "Mostrar todas as cartas" : "Mostrar somente perguntas"}
                                className={cn(
                                    "flex-shrink-0 h-9 w-9 p-0 mt-0.5", // Alinhamento sutil
                                    filtroPerguntasAtivo && "ring-2 ring-offset-1 ring-blue-500 bg-blue-100 border-blue-300"
                                )}
                            >
                                <Filter className="h-4 w-4" />
                            </Button>
                             {/* Título e Categoria */}
                            <div className="flex-1 min-w-0">
                                <CardTitle
                                    className="text-lg md:text-xl font-bold leading-tight truncate"
                                    title={isCartaOculta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo}
                                >
                                    {isCartaOculta && !cartaRevelada ? "Carta Oculta" : cartaAtual.titulo}
                                </CardTitle>
                                {(!isCartaOculta || cartaRevelada) && (
                                    <p
                                        className="text-xs text-gray-500 mt-1 truncate"
                                        title={cartaAtual.categorias?.join(", ") || 'Sem Categoria'}
                                    >
                                        {cartaAtual.categorias && cartaAtual.categorias.length > 0
                                            ? cartaAtual.categorias.join(", ")
                                            : <span className="italic">Sem Categoria</span>
                                        }
                                        {/* Baralho não é mais mostrado aqui, pois usa a estrutura original */}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Direita: Badge Dificuldade */}
                        {(!isCartaOculta || cartaRevelada) && (
                            <Badge
                                variant={ cartaAtual.dificuldade === "facil" ? "secondary" : cartaAtual.dificuldade === "normal" ? "default" : "destructive" }
                                className="capitalize flex-shrink-0 h-6 px-2.5 text-xs ml-2"
                            >
                                {cartaAtual.dificuldade}
                            </Badge>
                        )}
                    </div>
                     {/* Timer */}
                    {cartaAtual.tipo === "ContraTempo" && tempoRestante !== null && !respondido && cartaRevelada && (
                        <div className="mt-2">
                            <Progress
                                value={(tempoRestante / cartaAtual.tempoLimite) * 100}
                                className="h-2 [&>*]:bg-yellow-500 transition-all duration-1000 linear"
                            />
                            <p className="text-center text-sm font-semibold text-yellow-700 mt-1">
                                <Timer className="inline h-4 w-4 mr-1" /> Tempo: {tempoRestante}s
                            </p>
                        </div>
                    )}
                     {/* Pergunta / Placeholder */}
                    {(!isCartaOculta || cartaRevelada) ? (
                        <ScrollArea className="h-64 md:h-72 rounded-md border p-3 mt-2 bg-white/80 shadow-inner">
                            <div
                                className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-blockquote:my-1 prose-img:my-2 prose-img:rounded prose-img:border prose-a:text-blue-600 hover:prose-a:text-blue-800"
                                dangerouslySetInnerHTML={{ __html: cartaAtual.pergunta || '<p class="italic text-gray-500">Sem pergunta.</p>' }}
                            />
                        </ScrollArea>
                    ) : (
                        <div className="h-64 md:h-72 flex flex-col items-center justify-center space-y-3 rounded-md border p-3 mt-2 bg-gray-200 border-gray-300">
                            <EyeOff className="h-10 w-10 text-gray-500" />
                            <p className="text-base font-medium text-gray-700">Carta Oculta</p>
                            {rolledNumber !== null && <p className="text-xl font-bold">Dado: {rolledNumber}</p>}
                            <Button
                                onClick={rolarDado}
                                variant="outline" size="sm" className="mt-3 bg-white shadow"
                                onMouseDown={() => handleLongPressStart(rolarDado)}
                                onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(rolarDado)}
                                onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}
                            >
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
                            <Alert variant="default" className="mt-4 bg-blue-50 border-blue-300 text-blue-800">
                                <HelpCircle className="h-4 w-4 text-blue-700" />
                                <AlertDescription className="text-sm ml-2"><strong>Dica:</strong> {cartaAtual.dica}</AlertDescription>
                            </Alert>
                        )}
                        {mostrarFontes && cartaAtual.fontes && cartaAtual.fontes.length > 0 && (
                            <Alert variant="default" className="mt-4 bg-gray-50 border-gray-300">
                                <BookOpen className="h-4 w-4 text-gray-700" />
                                <AlertDescription className="text-sm ml-2 text-gray-800">
                                    <strong>Fontes:</strong>
                                    <ul className="list-disc list-inside mt-1 text-xs space-y-0.5">
                                        {cartaAtual.fontes.map((fonte, idx) => (<li key={idx}>{fonte}</li>))}
                                    </ul>
                                </AlertDescription>
                            </Alert>
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
                    {/* Botões Ajuste Manual */}
                    <div className="flex flex-wrap justify-center gap-1.5 w-full mb-3 p-2 border rounded-md bg-gray-100 shadow-inner">
                        <Button onClick={diminuirRodadasPreso} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Rodada Preso (-1)">
                            <ChevronDown className="h-5 w-5 text-purple-600" />
                        </Button>
                        <Button onClick={incrementarRodadasPreso} variant="outline" size="icon" className="h-8 w-8" title="Aumentar Rodada Preso (+1)">
                            <ChevronUp className="h-5 w-5 text-purple-600" />
                        </Button>
                        <Button onClick={diminuirContadorDeEstrelas} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Estrela Bônus (-1)">
                            <Star className="h-5 w-5 text-red-500" /> {/* Sem fill */}
                        </Button>
                        <Button onClick={incrementarContadorDeEstrelas} variant="outline" size="icon" className="h-8 w-8" title="Aumentar Estrela Bônus (+1)">
                            <Star className="h-5 w-5 text-yellow-500" /> {/* Sem fill */}
                        </Button>
                        <Button onClick={diminuirAcertos} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Acertos (-1)">
                            <ThumbsUp className="h-5 w-5 text-green-600 transform scale-x-[-1]" />
                        </Button>
                        <Button onClick={diminuirErros} variant="outline" size="icon" className="h-8 w-8" title="Diminuir Erros (-1)">
                            <ThumbsDown className="h-5 w-5 text-red-600 transform scale-x-[-1]" />
                        </Button>
                    </div>
                    {/* Botão Principal */}
                    <div className="w-full mb-3">
                        {isCartaOculta && !cartaRevelada ? (
                            <Button
                                onClick={() => setCartaRevelada(true)}
                                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold"
                            >
                                <Eye className="mr-2 h-5 w-5"/> Revelar Carta
                            </Button>
                        ) : !respondido ? (
                            <Button
                                onClick={isVerificarDisabled() ? undefined : verificarResposta}
                                className={cn(
                                    "w-full h-10 text-base font-semibold text-white",
                                    isVerificarDisabled() ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                                )}
                                onMouseDown={() => handleLongPressStart(verificarResposta)}
                                onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(verificarResposta)}
                                onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}
                                aria-disabled={isVerificarDisabled()}
                                tabIndex={isVerificarDisabled() ? -1 : 0}
                            >
                                <Check className="mr-2 h-5 w-5"/> Verificar
                            </Button>
                        ) : (
                            <Button
                                onClick={selecionarCartaAleatoria}
                                className="w-full h-10 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-semibold"
                                onMouseDown={() => handleLongPressStart(selecionarCartaAleatoria)}
                                onMouseUp={handleLongPressEnd} onMouseLeave={handleLongPressEnd}
                                onTouchStart={() => handleLongPressStart(selecionarCartaAleatoria)}
                                onTouchEnd={handleLongPressEnd} onTouchCancel={handleLongPressEnd}
                            >
                                <SkipForward className="mr-2 h-5 w-5"/> Próxima Carta
                            </Button>
                        )}
                    </div>
                    {/* Mensagem Feedback */}
                    {mensagem && (
                        <Alert
                            variant={getAlertVariant()}
                            className={cn(
                                'text-center text-sm font-semibold mb-3 w-full py-2 px-3 shadow-sm',
                                cartaAtual?.tipo === 'Vantagem' && 'bg-green-100 border-green-300 text-green-800',
                                cartaAtual?.tipo === 'Desvantagem' && 'bg-red-100 border-red-300 text-red-800',
                                cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'default' && isInfoAlert && 'bg-blue-100 border-blue-300 text-blue-800',
                                cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'default' && !isInfoAlert && 'bg-green-100 border-green-300 text-green-800',
                                cartaAtual?.tipo !== 'Vantagem' && cartaAtual?.tipo !== 'Desvantagem' && getAlertVariant() === 'destructive' && 'bg-red-100 border-red-300 text-red-800'
                            )}
                        >
                            <AlertDescription>{mensagem}</AlertDescription>
                        </Alert>
                     )}
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
                 {gameState && gameState.players && gameState.players.length > 0 && currentPlayer ? (
                    <>
                        <p className="text-center text-sm font-medium mb-2 text-gray-800">
                            Vez de: <span style={{ color: currentPlayer.color }} className="font-bold">{currentPlayer.name}</span>
                        </p>
                         <div className={cn(
                            'grid gap-2',
                            players.length <= 2 ? 'grid-cols-2' :
                            players.length <= 4 ? 'grid-cols-4' :
                            players.length <= 6 ? 'grid-cols-3' :
                            'grid-cols-4'
                         )}>
                            {players.map((pl) => (
                                <Button
                                    key={pl.id}
                                    onClick={() => updateGameState({ currentPlayerId: pl.id })}
                                    size="sm"
                                    variant={currentPlayerId === pl.id ? "default" : "outline"}
                                    className={cn(
                                        "truncate text-xs sm:text-sm h-9 font-medium transition-all duration-150",
                                        currentPlayerId === pl.id ? 'text-white ring-2 ring-offset-1 ring-black/50' : 'hover:bg-gray-100'
                                    )}
                                    style={{
                                        backgroundColor: currentPlayerId === pl.id ? pl.color : 'white',
                                        color: currentPlayerId === pl.id ? 'white' : pl.color,
                                        borderColor: pl.color,
                                        borderWidth: currentPlayerId === pl.id ? '2px' : '1px',
                                     }}
                                     title={`Mudar para ${pl.name}`}
                                 >
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
            {isDieModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-center relative w-64 h-64 flex flex-col justify-center items-center border-4 border-gray-300">
                        <Button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" variant="ghost" size="icon" onClick={() => setIsDieModalOpen(false)} disabled={isRolling} aria-label="Fechar dado">
                            <XIcon className="h-6 w-6" />
                        </Button>
                        {isRolling ? (
                            <>
                                <p className="text-lg mb-4 font-semibold text-gray-700">Rolando...</p>
                                <p className="text-7xl font-bold mb-6 text-blue-600 animate-bounce">{rollingNumber}</p>
                                <div className="h-10"></div> {/* Spacer */}
                            </>
                        ) : (
                            <>
                                <p className="text-lg mb-2 font-semibold text-gray-700">Resultado:</p>
                                <p className="text-8xl font-bold mb-4 text-green-700">{rolledNumber}</p>
                                <Button onClick={rolarDado} size="lg" variant="secondary" className="mt-2">
                                    <Dice6 className="h-5 w-5 mr-2" /> Rolar Novamente
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    // --- Função Renderizar Conteúdo da Resposta ---
    function renderizarConteudoResposta() {
        if (!cartaAtual) return null;
        const buttonInlineStyle: React.CSSProperties = { maxHeight: "90px", height: "auto", overflowY: "auto", whiteSpace: "normal", lineHeight: "1.4", display: "flex", alignItems: "center", textAlign: "left", };

        switch (cartaAtual.tipo) {
            case "Pergunta": case "ContraTempo": case "Vantagem": case "Desvantagem": case "Outras":
                // Verifica se 'opcoes' existe antes de mapear
                if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes)) {
                    return <p className="text-xs text-red-500 text-center italic py-2">Erro: Opções inválidas para esta carta.</p>;
                }
                return cartaAtual.opcoes.map((op: Opcao) => {
                    const isCorrect = Array.isArray(cartaAtual.respostaCorreta) ? cartaAtual.respostaCorreta.includes(op.id) : cartaAtual.respostaCorreta === op.id;
                    const isSelected = selecionado === op.id;
                    const isEliminated = opcoesEliminadas.includes(op.id);
                    const isWrongSelection = respondido && isSelected && !isCorrect;
                    let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400";
                    if (respondido) { if (isCorrect) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; else if (isSelected) btnClass = "bg-red-100 border-red-400 text-red-900"; else btnClass = "border-gray-300 text-gray-500 opacity-70"; }
                    else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300"; }
                    if (isEliminated) { btnClass = "line-through opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-500"; }
                    return (
                        <Button
                            key={op.id} onClick={() => handleSelecao(op.id)} variant={"outline"}
                            className={cn( "w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150", btnClass )}
                            style={buttonInlineStyle} disabled={isEliminated || respondido} aria-pressed={isSelected}
                        >
                            {!respondido && !isEliminated && ( <span className={cn( "flex-shrink-0 w-4 h-4 rounded-full border-2 mr-2.5", isSelected ? "bg-blue-600 border-blue-700" : "border-gray-400 bg-white" )}></span> )}
                            <span className="flex-1">{op.texto}</span>
                            {isCorrect && respondido && <CheckCircle2 className="ml-2 h-5 w-5 text-green-600 flex-shrink-0" />}
                            {isWrongSelection && <XCircle className="ml-2 h-5 w-5 text-red-600 flex-shrink-0" />}
                        </Button>
                    );
                });
             case "MultiplaEscolha":
                if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || !Array.isArray(cartaAtual.respostaCorreta)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; }
                return cartaAtual.opcoes.map((op: Opcao) => {
                    const isCorrect = cartaAtual.respostaCorreta.includes(op.id); const isSelected = selecoesMultiplas.includes(op.id); const isEliminated = opcoesEliminadas.includes(op.id); const isWrongSelection = respondido && isSelected && !isCorrect; const missedCorrect = respondido && isCorrect && !isSelected;
                    let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400";
                    if (respondido) { if (isCorrect && isSelected) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; else if (isWrongSelection) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (missedCorrect) btnClass = "bg-blue-100 border-blue-400 text-blue-800"; else btnClass = "border-gray-300 text-gray-500 opacity-70"; }
                    else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300"; }
                    if (isEliminated) { btnClass = "line-through opacity-50 cursor-not-allowed bg-gray-200 border-gray-300 text-gray-500"; }
                    return (
                        <Button
                            key={op.id} onClick={() => handleSelecaoMultipla(op.id)} variant="outline"
                            className={cn( "w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150", btnClass )}
                            style={buttonInlineStyle} disabled={isEliminated || respondido} aria-checked={isSelected}
                        >
                            {!isEliminated && ( <div className={cn("flex-shrink-0 w-4 h-4 mr-2.5 border rounded-sm flex items-center justify-center", isSelected ? 'bg-blue-600 border-blue-700' : 'border-gray-400 bg-white')}>{isSelected && <Check className="w-3 h-3 text-white" />}</div> )}
                            <span className="flex-1">{op.texto}</span>
                            {isCorrect && respondido && isSelected && <CheckCircle2 className="ml-2 h-5 w-5 text-green-600 flex-shrink-0" />}
                            {isWrongSelection && <XCircle className="ml-2 h-5 w-5 text-red-600 flex-shrink-0" />}
                            {missedCorrect && <span title="Correta" className="ml-2 text-blue-600 font-bold text-lg">✓</span>}
                         </Button>
                    );
                });
            case "Ordem":
                 if (!('opcoes' in cartaAtual) || !Array.isArray(cartaAtual.opcoes) || !Array.isArray(cartaAtual.respostaCorreta)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; }
                 const cOrdem = cartaAtual as CartaOrdem;
                 return cOrdem.opcoes.map((op) => {
                    const isSelected = ordemSelecoes.includes(op.id); const selectionIndex = isSelected ? ordemSelecoes.indexOf(op.id) + 1 : null;
                    const correctIndex = cOrdem.respostaCorreta.indexOf(op.id) + 1;
                    const isCorrectOrder = respondido && isSelected && selectionIndex === correctIndex; const isWrongOrder = respondido && isSelected && selectionIndex !== correctIndex; const isCorrectOptionOverall = respondido && correctIndex > 0;
                    let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100 hover:border-gray-400";
                    if (respondido) { if (isCorrectOrder) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; else if (isWrongOrder) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (isCorrectOptionOverall) btnClass = "border-gray-400 text-gray-600"; else btnClass = "border-gray-300 text-gray-500 opacity-70"; }
                    else if (isSelected) { btnClass = "bg-blue-100 border-blue-500 text-blue-900 ring-1 ring-blue-300"; }
                    return (
                        <Button
                            key={op.id} onClick={() => handleSelecaoOrdem(op.id)} variant="outline"
                            className={cn("w-full justify-start text-sm py-2.5 px-3 transition-colors duration-150", btnClass )}
                            style={buttonInlineStyle} disabled={respondido} aria-current={isSelected ? "step" : undefined}
                        >
                            {isSelected && !respondido && (<span className="mr-2.5 font-bold text-blue-600 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-white ring-1 ring-blue-500 flex-shrink-0">{selectionIndex}</span>)}
                            <span className="flex-1">{op.texto}</span>
                            {respondido && isCorrectOptionOverall && (
                                <>
                                    <span className={cn( "ml-2 font-bold text-xs w-5 h-5 flex items-center justify-center rounded-full flex-shrink-0 text-white", isCorrectOrder ? 'bg-green-500' : 'bg-red-500' )} title={isCorrectOrder ? `Correta: ${correctIndex}` : `Sua Posição: ${selectionIndex}`}>{selectionIndex ?? '?'}</span>
                                    {isWrongOrder && correctIndex > 0 && ( <span className="ml-1 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white flex-shrink-0" title={`Posição Correta: ${correctIndex}`}>{correctIndex}</span> )}
                                </>
                            )}
                        </Button>
                    );
                });
            case "RelacionarColunas":
                const cRel = cartaAtual as CartaRelacionarColunas;
                if (!Array.isArray(cRel.colunaA) || !Array.isArray(cRel.colunaB) || !Array.isArray(cRel.respostaCorreta)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; }
                return (
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                        {/* Coluna A */}
                        <div className="w-full sm:w-1/2 space-y-1.5">
                            <p className="text-xs font-semibold text-center mb-1 text-gray-600 uppercase tracking-wider">Coluna A</p>
                            {cRel.colunaA.map(itemA => {
                                const isSelectedA = selecaoColunaA === itemA.id; const parFormado = paresFormados.find(p => p.aId === itemA.id); const parCorretoDef = respondido ? cRel.respostaCorreta.find(rc => rc.aId === itemA.id) : undefined; const isCorrectPair = respondido && parFormado && parCorretoDef && parFormado.bId === parCorretoDef.bId; const isWrongPair = respondido && parFormado && (!parCorretoDef || parFormado.bId !== parCorretoDef.bId); const missedPair = respondido && !parFormado && parCorretoDef;
                                let btnClass = "border-gray-300 text-gray-800 hover:bg-gray-100";
                                if (respondido) { if (isCorrectPair) btnClass = "bg-green-100 border-green-400 text-green-900 font-medium"; else if (isWrongPair) btnClass = "bg-red-100 border-red-400 text-red-900"; else if (missedPair) btnClass = "bg-blue-100 border-blue-400 text-blue-800"; else btnClass = "border-gray-300 text-gray-500 opacity-70"; }
                                else { if (isSelectedA) btnClass = "ring-2 ring-blue-500 border-blue-500 bg-blue-50"; else if (parFormado) btnClass = "bg-gray-200 border-gray-400 text-gray-600 cursor-not-allowed"; }
                                return (
                                    <Button
                                        key={`A-${itemA.id}`} variant="outline" onClick={() => handleSelecionarColunaA(itemA.id)}
                                        disabled={respondido || (parFormado && !isSelectedA) ? true : false}
                                        className={cn("w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal transition-all duration-150", btnClass)}
                                        aria-pressed={isSelectedA}
                                    >
                                        <span className="flex-1">{itemA.texto}</span>
                                        {isCorrectPair && <CheckCircle2 className="ml-1 h-4 w-4 text-green-600 flex-shrink-0" />}
                                        {isWrongPair && <XCircle className="ml-1 h-4 w-4 text-red-600 flex-shrink-0" />}
                                        {isWrongPair && parCorretoDef && (<span className="text-[10px] ml-1 text-blue-600 hidden md:inline" title={`Correto: ${cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto}`}>({cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto.substring(0,10)}...)</span>)}
                                        {missedPair && (<span className="text-[10px] ml-1 text-blue-700 hidden md:inline" title={`Parear com: ${cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto}`}> (Faltou: {cRel.colunaB.find(iB => iB.id === parCorretoDef.bId)?.texto.substring(0,10)}...)</span>)}
                                    </Button>
                                );
                            })}
                        </div>
                        {/* Coluna B */}
                        <div className="w-full sm:w-1/2 space-y-1.5">
                             <p className="text-xs font-semibold text-center mb-1 text-gray-600 uppercase tracking-wider">Coluna B</p>
                            {cRel.colunaB.map(itemB => {
                                const isPairedB = paresFormados.some(p => p.bId === itemB.id);
                                const isDisabled = respondido || selecaoColunaA === null || isPairedB;
                                let btnClass = "border-gray-300 text-gray-800";
                                if (respondido || isPairedB) { btnClass = "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed opacity-70"; }
                                else if (selecaoColunaA !== null) { btnClass = "hover:bg-blue-50 hover:border-blue-400 cursor-pointer"; }
                                else { btnClass = "hover:bg-gray-100"; }
                                return (
                                    <Button
                                        key={`B-${itemB.id}`} variant="outline" onClick={() => handleSelecionarColunaB(itemB.id)}
                                        disabled={isDisabled}
                                        className={cn("w-full justify-start text-left h-auto py-1.5 px-2 text-xs md:text-sm whitespace-normal transition-all duration-150", btnClass)}
                                        aria-disabled={isDisabled}
                                    >
                                        <span className="flex-1">{itemB.texto}</span>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                );
            case "PontoCerto":
                 const cPonto = cartaAtual as CartaPontoCerto;
                 if (!cPonto.imagemURL || !Array.isArray(cPonto.zonasClicaveis)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; }
                 const clickCorrect = respondido && coordenadasClique && cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta && isClickInZone(coordenadasClique, z));
                 const clickIncorrect = respondido && coordenadasClique && !clickCorrect;
                 return (
                    <div
                        className="relative w-full max-w-md mx-auto aspect-video overflow-hidden rounded border border-gray-300 shadow-inner"
                        style={{ cursor: respondido ? 'not-allowed' : 'crosshair' }}
                        onClick={handleImagemClick} role="button" aria-label={`Imagem interativa: ${cPonto.titulo}`} tabIndex={respondido ? -1 : 0}
                    >
                        <img
                            src={cPonto.imagemURL} alt={`Imagem: ${cPonto.titulo}`}
                            className={cn( 'block w-full h-full object-contain bg-gray-100', respondido ? 'opacity-75' : '' )}
                        />
                        {coordenadasClique && (
                            <div
                                className={cn( `absolute w-3.5 h-3.5 rounded-full border-2 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-md flex items-center justify-center`, respondido ? (clickCorrect ? 'bg-green-500 border-white' : 'bg-red-500 border-white') : 'bg-blue-500 border-white' )}
                                style={{ left: `${coordenadasClique.x * 100}%`, top: `${coordenadasClique.y * 100}%` }} title="Seu clique"
                             >
                                 {respondido && (clickCorrect ? <Check className="w-2 h-2 text-white" /> : <XIcon className="w-2 h-2 text-white" />)}
                             </div>
                        )}
                        {respondido && (() => {
                                const zonaCorreta = cPonto.zonasClicaveis.find(z => z.id === cPonto.respostaCorreta);
                                return zonaCorreta ? ( <div className="absolute border-2 border-dashed border-green-500 pointer-events-none animate-pulse rounded bg-green-500/10" style={{ left: `${zonaCorreta.x * 100}%`, top: `${zonaCorreta.y * 100}%`, width: `${zonaCorreta.largura * 100}%`, height: `${zonaCorreta.altura * 100}%` }} title={zonaCorreta.descricao || "Área correta"}/> ) : null;
                            })()}
                    </div>
                );
            case "CompletarFrase":
                const cComp = cartaAtual as CartaCompletarFrase;
                if (!cComp.fraseIncompleta || !Array.isArray(cComp.fragmentos) || !Array.isArray(cComp.respostaCorreta)) { return <p className="text-xs text-red-500 text-center italic py-2">Erro: Dados inválidos.</p>; }
                let fraseRenderizada = cComp.fraseIncompleta;
                fragmentosSelecionados.forEach((fragId, index) => { const frag = cComp.fragmentos.find(f => f.id === fragId); if (frag) { fraseRenderizada = fraseRenderizada.replace(`__${index + 1}__`, `<strong class="text-blue-600 underline underline-offset-2 mx-1 px-1 rounded bg-blue-50">${frag.texto}</strong>`); } });
                fraseRenderizada = fraseRenderizada.replace(/__\d+__/g, '<span class="text-gray-400 border-b border-dashed border-gray-400 mx-1 px-2">___</span>');
                const isCompletarCorreto = respondido && fragmentosSelecionados.toString() === cComp.respostaCorreta.toString();
                return (
                    <div className="space-y-3">
                        <div className={cn( 'p-3 border rounded bg-gray-50 text-sm leading-relaxed shadow-inner', respondido ? (isCompletarCorreto ? 'border-green-300' : 'border-red-300') : 'border-gray-300' )} dangerouslySetInnerHTML={{ __html: fraseRenderizada }}/>
                        {!respondido && (
                            <div className="flex flex-wrap gap-2 justify-center items-center border-t pt-3 mt-3">
                                {cComp.fragmentos.filter(f => !fragmentosSelecionados.includes(f.id)).map(frag => (<Button key={frag.id} variant="outline" size="sm" onClick={() => handleSelecionarFragmento(frag.id)} className="bg-white hover:bg-blue-50 border-blue-300 text-blue-800 text-xs px-2 py-1 h-auto">{frag.texto}</Button>))}
                                {fragmentosSelecionados.length > 0 && (<Button variant="ghost" size="sm" onClick={limparFragmentos} className="text-red-500 hover:bg-red-100 px-2 py-1 h-auto" title="Limpar"><RotateCcw className="h-4 w-4 mr-1"/> Limpar</Button>)}
                            </div>
                        )}
                        {respondido && !isCompletarCorreto && (
                            <div className="text-xs text-center text-green-700 mt-2 border-t pt-2">
                                <strong>Correto:</strong> {cComp.respostaCorreta.map(id => cComp.fragmentos.find(f => f.id === id)?.texto).join(' → ')}
                            </div>
                        )}
                    </div>
                );

            default:
                console.error("Tipo não renderizado:", cartaAtual);
                return <p className="text-sm text-red-500 text-center italic py-4">Erro: Tipo de carta desconhecido.</p>;
        }
    } // --- Fim de renderizarConteudoResposta ---

}; // --- Fim do Componente EcoChallenge ---

export default CriadorDeCarta;