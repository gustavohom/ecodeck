// src/components/CriadorDeCarta.tsx

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash, Youtube, Image as ImageIcon, Video, ArrowUpCircle, Lock, LockOpen } from "lucide-react"; // Importar Ícones + Locks
import { cn } from "@/lib/utils";

// --- Tipos de Dados (mantidos) ---
interface Opcao { id: number; texto: string; ordemTemp?: string; }
interface ItemRelacionar { id: number; texto: string; }
interface ZonaClicavel { id: number; x: number; y: number; largura: number; altura: number; descricao?: string; }
interface FragmentoCompletar { id: number; texto: string; }
interface CartaBase { id: string | number; tipo: string; titulo: string; pergunta: string; dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[]; vantagem: string; desvantagem: string; dica: string; opcoes?: Opcao[]; baralho?: string; }
interface CartaComOpcoes extends CartaBase { opcoes: Opcao[]; }
interface CartaPergunta extends CartaComOpcoes { tipo: "Pergunta"; respostaCorreta: number; }
interface CartaMultiplaEscolha extends CartaComOpcoes { tipo: "MultiplaEscolha"; respostaCorreta: number[]; }
interface CartaOrdem extends CartaComOpcoes { tipo: "Ordem"; respostaCorreta: number[]; }
interface CartaVantagem extends CartaComOpcoes { tipo: "Vantagem"; respostaCorreta: number[]; }
interface CartaDesvantagem extends CartaComOpcoes { tipo: "Desvantagem"; respostaCorreta: number[]; }
interface CartaOutras extends CartaComOpcoes { tipo: "Outras"; respostaCorreta: number[]; }
interface CartaContraTempo extends CartaComOpcoes { tipo: "ContraTempo"; respostaCorreta: number; tempoLimite?: number; }
interface CartaRelacionarColunas extends CartaBase { tipo: "RelacionarColunas"; colunaA: ItemRelacionar[]; colunaB: ItemRelacionar[]; respostaCorreta: { aId: number; bId: number }[]; }
interface CartaPontoCerto extends CartaBase { tipo: "PontoCerto"; imagemURL?: string; zonasClicaveis?: ZonaClicavel[]; respostaCorreta?: number; }
interface CartaCompletarFrase extends CartaBase { tipo: "CompletarFrase"; fraseIncompleta?: string; fragmentos?: FragmentoCompletar[]; respostaCorreta?: number[]; }
type Carta = | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;
type CartaInterna = Carta & { origBaralhoId?: number; edited?: boolean; };
const CARD_TYPES = [ "Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase" ] as const;
type TipoCarta = typeof CARD_TYPES[number];
const DIFFICULTIES = ["facil", "normal", "dificil"] as const;
type Dificuldade = typeof DIFFICULTIES[number];
interface BaralhoCarregado { id: number; nome: string; cartas: Carta[]; adicionado: boolean; }
const DEFAULT_BARALHO_NAME = "Padrão";
interface TelaInicialUISettings { categoriasSelecionadas: string[]; ocultarCarta: boolean; probabilityIndex: number; }
const LOCALSTORAGE_KEYS = { /* ... (mantido) ... */ CUSTOM_SOURCES: "customSourceInfos", BUILTIN_STATUS: "builtInSourceStatus", ACTIVE_INTERNAL_BARALHOS: "activeInternalBaralhos", UI_SETTINGS: "ecoChallengeUISettings", GAME_STATE: "estadoEcoChallenge" };

// --- Funções Utilitárias (mantidas) ---
function processCardsAndExtractBaralhos(cards: Carta[]): { processedCards: Carta[], internalBaralhos: Record<string, number>, totalCards: number } { /* ... */
    const baralhoCounts: Record<string, number> = {}; let totalCards = 0;
    const processedCards = cards.map((card, index) => {
        const uniqueId = card.id || `card_${Date.now()}_${index}_${Math.random().toString(16).slice(2)}`;
        // Correção: Tratar baralho como string opcional novamente
        const baralhoName = card.baralho?.trim() || DEFAULT_BARALHO_NAME;
        baralhoCounts[baralhoName] = (baralhoCounts[baralhoName] || 0) + 1; totalCards++;
        // Atribui o nome (ou default) de volta
        return { ...card, id: uniqueId, baralho: baralhoName };
    });
    const sortedBaralhoNames = Object.keys(baralhoCounts).sort((a, b) => { if (a === DEFAULT_BARALHO_NAME) return -1; if (b === DEFAULT_BARALHO_NAME) return 1; return a.localeCompare(b); });
    const sortedInternalBaralhos: Record<string, number> = {};
    sortedBaralhoNames.forEach(name => { sortedInternalBaralhos[name] = baralhoCounts[name]; });
    return { processedCards, internalBaralhos: sortedInternalBaralhos, totalCards };
}
const builtInSourcesData: Omit<SourceInfo, 'active' | 'internalBaralhos' | 'totalCards'>[] = [ /* ... */ { id: "builtin-manejoPlantadas", name: "Manejo Plantadas", type: 'builtin', cards: manejoPlantadas as Carta[] },{ id: "builtin-manejoNativas", name: "Manejo Nativas", type: 'builtin', cards: manejoNativas as Carta[] },{ id: "builtin-ecologiaFlorestal", name: "Ecologia Florestal", type: 'builtin', cards: ecologiaFlorestal as Carta[] },{ id: "builtin-estrelasAliens", name: "Estrelas & Aliens (DLC)", type: 'builtin', cards: estrelasAliens as Carta[] },{ id: "builtin-testCards", name: "Test Cards", type: 'builtin', cards: testCards as Carta[] },];
const initialBuiltInSources: SourceInfo[] = builtInSourcesData.map(source => { /* ... */ const { processedCards, internalBaralhos, totalCards } = processCardsAndExtractBaralhos(source.cards); return { ...source, cards: processedCards, internalBaralhos: internalBaralhos, totalCards, active: true };});
function parseJSDeckFileLocal(content: string): Carta[] { /* ... (mantida) ... */
     try {
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) { throw new Error("Array não encontrado."); } const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[]; if (!Array.isArray(rawArray)) { throw new Error("Conteúdo não é array."); }
        return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_js_${Date.now()}_${index}_${Math.random().toString(16).slice(2)}` })) as Carta[];
    } catch (error: any) { console.error("Erro parse JS:", error); throw new Error(`Erro processar JS: ${error.message}`); }
}
function parseParesRelacionar(input: string): { aId: number; bId: number }[] { /* ... (mantida) ... */
    const paresFormatados: { aId: number; bId: number }[] = [];
    if (!input || !input.trim()) { return paresFormatados; }
    const paresString = input.split(',');
    for (const parStr of paresString) {
        const partes = parStr.trim().split('-');
        if (partes.length !== 2) { throw new Error(`Formato inválido "${parStr.trim()}". Use IDa-IDb.`); }
        const aId = parseInt(partes[0].trim(), 10);
        const bId = parseInt(partes[1].trim(), 10);
        if (isNaN(aId) || isNaN(bId)) { throw new Error(`IDs não numéricos em "${parStr.trim()}".`); }
        paresFormatados.push({ aId, bId });
    }
    return paresFormatados;
}

// --- Componente de Preview Estático ---
const CardStaticView: React.FC<{ card: Partial<Carta> }> = ({ card }) => {
    const { tipo = "Pergunta", titulo = "", pergunta = "", dificuldade = "facil", categorias = [], fontes = [], vantagem = "", desvantagem = "", dica = "", baralho } = card;
    let renderedSpecifics: React.ReactNode = null; let renderedOptions: React.ReactNode = null; const opcoes = card.opcoes || []; const respostaCorreta = card.respostaCorreta;
    // ... (lógica switch case mantida) ...
    switch (tipo) { case "ContraTempo": const cardContraTempo = card as Partial<CartaContraTempo>; renderedSpecifics = <p className="text-xs text-orange-600">Tempo Limite: {cardContraTempo.tempoLimite || '?'}s</p>; break; case "RelacionarColunas": const cardRelCol = card as Partial<CartaRelacionarColunas>; renderedSpecifics = ( <div className="flex gap-4 text-xs mt-2"> <div className="flex-1"><strong>Coluna A:</strong><ul>{cardRelCol.colunaA?.map(i => <li key={`a-${i.id}`}>{i.id}: {i.texto}</li>)}</ul></div> <div className="flex-1"><strong>Coluna B:</strong><ul>{cardRelCol.colunaB?.map(i => <li key={`b-${i.id}`}>{i.id}: {i.texto}</li>)}</ul></div> </div> ); const pairsPreview = Array.isArray(cardRelCol.respostaCorreta) ? cardRelCol.respostaCorreta.map(p => `${p.aId}-${p.bId}`).join(', ') : '(Inválida)'; renderedOptions = <p className="text-xs mt-1">Pares Corretos: [{pairsPreview}]</p>; break; case "PontoCerto": const cardPontoCerto = card as Partial<CartaPontoCerto>; renderedSpecifics = ( <> <p className="text-xs">Imagem URL: <span className="font-mono bg-gray-100 px-1 rounded break-all">{cardPontoCerto.imagemURL || '(Nenhuma)'}</span></p> {cardPontoCerto.imagemURL && ( <img src={cardPontoCerto.imagemURL} alt="Preview Ponto Certo" className="my-2 max-w-full h-auto max-h-40 object-contain border rounded"/> )} {cardPontoCerto.zonasClicaveis && cardPontoCerto.zonasClicaveis.length > 0 && ( <details className="text-xs mt-1"> <summary className="cursor-pointer font-medium">Zonas Clicáveis ({cardPontoCerto.zonasClicaveis.length})</summary> <ul className="pl-4 list-disc"> {cardPontoCerto.zonasClicaveis.map(z => <li key={z.id}>ID:{z.id} ({z.x},{z.y} - {z.largura}x{z.altura}) {z.descricao || ''}</li>)} </ul> </details> )} </> ); renderedOptions = <p className="text-xs mt-1">Zona Correta ID: {typeof cardPontoCerto.respostaCorreta === 'number' ? cardPontoCerto.respostaCorreta : '(Inválido)'}</p>; break; case "CompletarFrase": const cardCompFrase = card as Partial<CartaCompletarFrase>; renderedSpecifics = <p className="text-xs mt-1 italic">Frase: "{cardCompFrase.fraseIncompleta || '...'}"</p>; renderedOptions = ( <> {cardCompFrase.fragmentos && cardCompFrase.fragmentos.length > 0 && ( <details className="text-xs mt-1"> <summary className="cursor-pointer font-medium">Fragmentos ({cardCompFrase.fragmentos.length})</summary> <ul className="pl-4 list-disc"> {cardCompFrase.fragmentos.map(f => <li key={f.id}>{f.id}: {f.texto}</li>)} </ul> </details> )} <p className="text-xs mt-1">Ordem Correta IDs: [{(Array.isArray(cardCompFrase.respostaCorreta) ? cardCompFrase.respostaCorreta.join(', ') : '(Inválida)')}]</p> </> ); break; }
    if (["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo)) { /* ... */ const correctSet = new Set<number>(); const currentOptions = opcoes || []; if (tipo === "Vantagem") { currentOptions.forEach(o => correctSet.add(o.id)); } else if (tipo !== "Desvantagem") { if (Array.isArray(respostaCorreta)) { (respostaCorreta as number[]).forEach(id => typeof id === 'number' && correctSet.add(id)); } else if (typeof respostaCorreta === 'number') { correctSet.add(respostaCorreta); } } renderedOptions = ( <ul className="mt-2 pl-5 list-decimal space-y-1"> {currentOptions.map((op) => { const isCorrect = correctSet.has(op.id); const orderIndex = (tipo === 'Ordem' && Array.isArray(respostaCorreta)) ? (respostaCorreta as number[]).indexOf(op.id) : -1; const orderInfo = tipo === 'Ordem' ? (orderIndex !== -1 ? ` (Pos: ${orderIndex + 1})` : ` (Não na ordem)`) : ''; return ( <li key={op.id} className={cn("mb-1 text-sm", isCorrect && tipo !== 'Ordem' && "text-green-700 font-semibold")}> {op.texto} {isCorrect && tipo !== 'Vantagem' && tipo !== 'Ordem' && <span className="text-green-600 text-xs font-normal"> (Correta)</span>} {tipo === 'Ordem' && <span className="text-blue-600 text-xs font-normal">{orderInfo}</span>} </li> ); })} {currentOptions.length === 0 && <li className="text-xs italic text-gray-500 list-none">Nenhuma opção definida.</li>} </ul> ); }

    return (
        <Card className="max-w-md mx-auto my-4 shadow-md border">
            <CardHeader className="pb-2 bg-slate-50 rounded-t-lg">
                <CardTitle className="text-lg font-bold">{titulo || "(Sem Título)"}</CardTitle>
                <div className="flex justify-between items-center text-xs text-gray-500 pt-1">
                    <span>Tipo: <Badge variant="secondary" className="ml-1">{tipo}</Badge></span>
                    {baralho && baralho !== DEFAULT_BARALHO_NAME && ( <span>Baralho: <Badge variant="outline" className="ml-1">{baralho}</Badge></span> )}
                    <span>Dific.: <Badge variant={dificuldade === 'facil' ? 'default' : dificuldade === 'normal' ? 'outline' : 'destructive'} className="ml-1 capitalize">{dificuldade}</Badge></span>
                </div>
            </CardHeader>
            <CardContent className="pt-2 pb-3 space-y-2">
                {renderedSpecifics}
                <ScrollArea className="h-auto max-h-60 rounded-md border p-3 mt-2 bg-white/80 shadow-inner min-h-[100px]">
                     <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-img:my-2 prose-ul:my-1 prose-ol:my-1 overflow-hidden" dangerouslySetInnerHTML={{ __html: pergunta || '<p class="italic text-gray-500">(Sem Pergunta)</p>' }} />
                </ScrollArea>
                {renderedOptions}
            </CardContent>
            {(categorias.length > 0 || fontes.length > 0 || dica || vantagem || desvantagem) && (
                 <CardFooter className="flex flex-col items-start text-xs text-gray-600 border-t pt-2 pb-2 space-y-1 bg-slate-50 rounded-b-lg">
                    {categorias.length > 0 && <p><strong>Categorias:</strong> {categorias.join(", ")}</p>}
                    {fontes.length > 0 && <p><strong>Fontes:</strong> {fontes.join(", ")}</p>}
                    {dica && <p className="text-blue-600"><strong>Dica:</strong> {dica}</p>}
                    {vantagem && <p className="text-green-600"><strong>Vantagem:</strong> {vantagem}</p>}
                    {desvantagem && <p className="text-red-600"><strong>Desvantagem:</strong> {desvantagem}</p>}
                 </CardFooter>
            )}
        </Card>
    );
};

// --- Componente Criador Principal ---
const CriadorDeCarta: React.FC = () => {
    // --- Estados ---
    const [deckName, setDeckName] = useState("meu_baralho");
    const [cards, setCards] = useState<CartaInterna[]>([]);
    // Campos da carta atual
    const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
    const [titulo, setTitulo] = useState("");
    const [baralhoCartaAtual, setBaralhoCartaAtual] = useState(""); // <<--- Inicia vazio
    const [baralhoBloqueado, setBaralhoBloqueado] = useState(false); // <<--- NOVO ESTADO
    const [pergunta, setPergunta] = useState("");
    const [opcoes, setOpcoes] = useState<Opcao[]>([]);
    const [novaOpcao, setNovaOpcao] = useState("");
    const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
    const [dificuldade, setDificuldade] = useState<Dificuldade>("facil");
    const [categorias, setCategorias] = useState<string[]>([]);
    const [novaCategoria, setNovaCategoria] = useState("");
    const [categoriasBloqueadas, setCategoriasBloqueadas] = useState(false);
    const [fontes, setFontes] = useState<string[]>([]);
    const [novaFonte, setNovaFonte] = useState("");
    const [fontesBloqueadas, setFontesBloqueadas] = useState(false);
    const [vantagem, setVantagem] = useState("");
    const [desvantagem, setDesvantagem] = useState("");
    const [dica, setDica] = useState("");
    // Estados específicos por tipo
    const [tempoLimite, setTempoLimite] = useState<number>(30);
    const [colunaAItems, setColunaAItems] = useState<ItemRelacionar[]>([]);
    const [novaColunaA, setNovaColunaA] = useState("");
    const [colunaBItems, setColunaBItems] = useState<ItemRelacionar[]>([]);
    const [novaColunaB, setNovaColunaB] = useState("");
    const [paresCorretosInput, setParesCorretosInput] = useState("");
    const [imagemURLPontoCerto, setImagemURLPontoCerto] = useState("");
    const [zonasClicaveis, setZonasClicaveis] = useState<ZonaClicavel[]>([]);
    const [novaZona, setNovaZona] = useState<Partial<ZonaClicavel>>({x:0, y:0, largura: 0.1, altura: 0.1});
    const [respostaCorretaPontoCerto, setRespostaCorretaPontoCerto] = useState<number | null>(null);
    const [fraseIncompleta, setFraseIncompleta] = useState("");
    const [fragmentos, setFragmentos] = useState<FragmentoCompletar[]>([]);
    const [novoFragmento, setNovoFragmento] = useState("");
    const [ordemFragmentos, setOrdemFragmentos] = useState("");
    // Controle de edição e UI
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [popupImageUrl, setPopupImageUrl] = useState("");
    const [popupVideoUrl, setPopupVideoUrl] = useState("");
    const [popupYouTubeUrl, setPopupYouTubeUrl] = useState("");
    const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
    const [manterCartasEditadas, setManterCartasEditadas] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    // Refs
    const perguntaTextareaRef = useRef<HTMLTextAreaElement>(null);
    const previewImageRefPontoCerto = useRef<HTMLImageElement>(null);
    const [previewImageSize, setPreviewImageSize] = useState({ width: 0, height: 0 });

    // --- UseEffects (mantidos) ---
    useEffect(() => { /* Preview Ponto Certo */ if (tipo === 'PontoCerto' && previewImageRefPontoCerto.current) { const updateSize = () => { if (previewImageRefPontoCerto.current) { setPreviewImageSize({ width: previewImageRefPontoCerto.current.offsetWidth, height: previewImageRefPontoCerto.current.offsetHeight }); } }; const img = previewImageRefPontoCerto.current; img.onload = updateSize; if (img.complete) updateSize(); const observer = new ResizeObserver(updateSize); observer.observe(img); window.addEventListener('resize', updateSize); return () => { window.removeEventListener('resize', updateSize); observer.disconnect(); img.onload = null;}; } }, [tipo, imagemURLPontoCerto]);
    useEffect(() => { /* Botão Voltar ao Topo */ const handleScroll = () => { setShowScrollTop(window.scrollY > 200); }; window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);

    // --- Funções Auxiliares (mantidas e atualizadas) ---
    const parseJSDeckFileLocal = (content: string): Carta[] => { /* ... */
        try { const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m); if (!match || !match[1]) { throw new Error("Array não encontrado."); } const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[]; if (!Array.isArray(rawArray)) { throw new Error("Conteúdo não é array."); } return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_js_${Date.now()}_${index}_${Math.random().toString(16).slice(2)}` })) as Carta[]; } catch (error: any) { console.error("Erro parse JS:", error); throw new Error(`Erro processar JS: ${error.message}`); }
    };
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */
        const files = e.target.files; if (!files) return; setIsLoading(true); setErrorMessage(null); let loadErrors: string[] = []; const newBaralhos: BaralhoCarregado[] = []; for (let i = 0; i < files.length; i++) { const file = files[i]; const content = await file.text(); try { let newCards: Carta[] = []; const nome = file.name.replace(/\.(js|json)$/, ""); if (baralhosCarregados.some(b => b.nome === nome)) { loadErrors.push(`Baralho "${nome}" já carregado.`); continue; } if (file.name.endsWith(".js")) { newCards = parseJSDeckFileLocal(content); } else if (file.name.endsWith(".json")) { newCards = JSON.parse(content) as Carta[]; } else { loadErrors.push(`Formato ${file.name} não suportado.`); continue; } if (!Array.isArray(newCards) || newCards.length === 0) { loadErrors.push(`Nenhuma carta válida em "${nome}".`); continue; } newCards = newCards.map((c, idx) => ({...c, id: c.id || `${nome}_${idx}`})); newBaralhos.push({ id: Date.now() + Math.random(), nome, cartas: newCards, adicionado: false }); } catch (error: any) { loadErrors.push(`Erro ao ler ${file.name}: ${error.message}`); } } if (newBaralhos.length > 0) { setBaralhosCarregados((prev) => [...prev, ...newBaralhos]); } if (loadErrors.length > 0) { setErrorMessage(loadErrors.join(" ")); } setIsLoading(false); e.target.value = '';
    };
    const adicionarBaralho = (baralhoId: number) => { /* ... */
         setBaralhosCarregados((prev) => prev.map((b) => { if (b.id === baralhoId && !b.adicionado) { const newCards: CartaInterna[] = b.cartas.map((c) => ({ ...c, id: c.id || `${b.nome}_${Math.random().toString(16).slice(2)}`, origBaralhoId: b.id, edited: false })); setCards((oldCards) => [...oldCards, ...newCards]); return { ...b, adicionado: true }; } return b; }));
    };
    const removerBaralho = (baralhoId: number) => { /* ... */
         setBaralhosCarregados((prev) => prev.map((b) => { if (b.id === baralhoId && b.adicionado) { setCards((oldCards) => oldCards.filter((c) => { if (c.origBaralhoId === baralhoId) { return c.edited && manterCartasEditadas; } return true; })); return { ...b, adicionado: false }; } return b; }));
    };
    const handleAddOpcao = () => { if (novaOpcao.trim() !== "") { const newId = opcoes.length > 0 ? Math.max(...opcoes.map(o => o.id)) + 1 : 1; setOpcoes(prev => [...prev, { id: newId, texto: novaOpcao, ordemTemp: tipo === 'Ordem' ? '' : undefined }]); setNovaOpcao(""); }};
    const handleRemoveOpcao = (id: number) => { setOpcoes((prev) => prev.filter(o => o.id !== id)); setRespostaCorreta((prev) => prev.filter(rcId => rcId !== id)); };
    const handleToggleRespostaCorreta = (id: number) => { if (tipo === "Pergunta" || tipo === "ContraTempo") { setRespostaCorreta(prev => prev.includes(id) ? [] : [id]); } else if (tipo === "MultiplaEscolha" || tipo === "Outras") { setRespostaCorreta(prev => prev.includes(id) ? prev.filter(rcId => rcId !== id) : [...prev, id]); }};
    const handleSetOrder = (optionId: number, orderValue: string) => { setOpcoes(prev => prev.map(op => op.id === optionId ? { ...op, ordemTemp: orderValue } : op)); };
    const handleAddColunaA = () => { if (novaColunaA.trim()) { const newId = colunaAItems.length > 0 ? Math.max(...colunaAItems.map(i => i.id)) + 1 : 1; setColunaAItems(prev => [...prev, { id: newId, texto: novaColunaA }]); setNovaColunaA(""); }};
    const handleRemoveColunaA = (id: number) => setColunaAItems(prev => prev.filter(i => i.id !== id));
    const handleAddColunaB = () => { if (novaColunaB.trim()) { const newId = colunaBItems.length > 0 ? Math.max(...colunaBItems.map(i => i.id), 100) + 1 : 101; setColunaBItems(prev => [...prev, { id: newId, texto: novaColunaB }]); setNovaColunaB(""); }};
    const handleRemoveColunaB = (id: number) => setColunaBItems(prev => prev.filter(i => i.id !== id));
    const handleAddZona = () => { /* ... */ const id = zonasClicaveis.length > 0 ? Math.max(...zonasClicaveis.map(z => z.id)) + 1 : 1; const x = parseFloat(String(novaZona.x || 0).replace(',', '.')); const y = parseFloat(String(novaZona.y || 0).replace(',', '.')); const w = parseFloat(String(novaZona.largura || 0.1).replace(',', '.')); const h = parseFloat(String(novaZona.altura || 0.1).replace(',', '.')); if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) && w > 0 && h > 0 && x>=0 && x<=1 && y>=0 && y<=1 && w+x<=1 && h+y<=1) { setZonasClicaveis(prev => [...prev, { id, x, y, largura: w, altura: h, descricao: novaZona.descricao || "" }]); setNovaZona({x:0, y:0, largura: 0.1, altura: 0.1}); } else { alert("Valores inválidos para a zona (X, Y, Largura, Altura devem ser números entre 0 e 1, e X+Largura <= 1, Y+Altura <= 1). Use ponto ou vírgula."); } };
    const handleRemoveZona = (id: number) => { setZonasClicaveis(prev => prev.filter(z => z.id !== id)); if (respostaCorretaPontoCerto === id) setRespostaCorretaPontoCerto(null); };
    const handleNovaZonaChange = (field: keyof Partial<ZonaClicavel>, value: string) => { setNovaZona(prev => ({ ...prev, [field]: value })); };
    const handleSetRespostaPontoCerto = (id: number) => setRespostaCorretaPontoCerto(id);
    const handleAddFragmento = () => { if (novoFragmento.trim()) { const newId = fragmentos.length > 0 ? Math.max(...fragmentos.map(f => f.id)) + 1 : 1; setFragmentos(prev => [...prev, { id: newId, texto: novoFragmento }]); setNovoFragmento(""); }};
    const handleRemoveFragmento = (id: number) => setFragmentos(prev => prev.filter(f => f.id !== id));
    const handleAddCategoria = () => { if (novaCategoria.trim() !== "" && !categorias.includes(novaCategoria)) { setCategorias((old) => [...old, novaCategoria]); setNovaCategoria(""); } };
    const handleRemoveCategoria = (cat: string) => { setCategorias((old) => old.filter((c) => c !== cat)); };
    const handleAddFonte = () => { if (novaFonte.trim() !== "" && !fontes.includes(novaFonte)) { setFontes((old) => [...old, novaFonte]); setNovaFonte(""); } };
    const handleRemoveFonte = (f: string) => { setFontes((old) => old.filter((fon) => fon !== f)); };
    const inserirTemplatePopup = (tipoPopup: 'imagem' | 'video') => { /* ... */
        const idUnico = `popup-${Date.now()}`; let urlPrincipal = ''; let urlThumb = ''; let desc = ''; let thumbHtml = '';
        const templateCSS = `\n<style>\n.popup-overlay-${idUnico} { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.75); display: none; justify-content: center; align-items: center; z-index: 1000; padding: 20px; box-sizing: border-box; }\n.popup-overlay-${idUnico}:target { display: flex; }\n.popup-content-${idUnico} { position: relative; background-color: #fff; padding: 20px; border-radius: 8px; max-width: 90%; max-height: 90%; overflow: auto; }\n.popup-content-${idUnico} img, .popup-content-${idUnico} video { display: block; max-width: 100%; max-height: 80vh; height: auto; margin: 0 auto 15px auto; }\n.popup-close-${idUnico} { position: absolute; top: 10px; right: 15px; font-size: 24px; font-weight: bold; color: #555; text-decoration: none; line-height: 1; }\n.popup-close-${idUnico}:hover { color: #000; }\n.thumb-link-${idUnico} { display: block; margin: 10px auto; width: fit-content; cursor: zoom-in; border: 1px solid #ccc; padding: 3px; border-radius: 4px; background: white; }\n.thumb-link-${idUnico} img, .thumb-link-${idUnico} span { max-width: 180px; height: auto; display: block; }\n.thumb-link-${idUnico} span{padding:10px; color:blue; text-decoration:underline}\n</style>\n`;
        let templateElemento: string; let scriptStop: string = "";
        if (tipoPopup === 'imagem') { if (!popupImageUrl.trim()) { alert("Insira a URL da Imagem."); return; } urlPrincipal = popupImageUrl; urlThumb = popupImageUrl; desc = 'Descrição da Imagem'; thumbHtml = `<img src=\"${urlThumb}\" alt=\"Clique para ampliar\"/>`; templateElemento = `<!-- Link/Thumb da Imagem -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\">\n  ${thumbHtml}\n</a>\n\n<!-- Popup da Imagem -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\">\n  <div class=\"popup-content-${idUnico}\">\n    <a href=\"#\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>\n    <img src=\"${urlPrincipal}\" alt=\"Imagem Ampliada\"/>\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">${desc}</p>\n  </div>\n</div>\n`;
        } else { if (!popupVideoUrl.trim()) { alert("Insira a URL do Vídeo (.mp4)."); return; } urlPrincipal = popupVideoUrl; desc = 'Descrição do Vídeo'; thumbHtml = `<span>🎬 Clique para ver o vídeo</span>`; templateElemento = `<!-- Link/Thumb do Vídeo -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\" style=\"border:none; background:none; padding:0;\">\n  ${thumbHtml}\n</a>\n\n<!-- Popup do Vídeo -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\">\n  <div class=\"popup-content-${idUnico}\">\n    <a href=\"#\" id=\"close-btn-${idUnico}\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>\n    <video controls width=\"100%\" style=\"max-width: 700px; max-height: 70vh;\" id=\"video-${idUnico}\">\n      <source src=\"${urlPrincipal}\" type=\"video/mp4\">\n      Seu navegador não suporta vídeo.\n    </video>\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">${desc}</p>\n  </div>\n</div>\n`; scriptStop = `<script>\n  (function() { var closeBtn = document.getElementById('close-btn-${idUnico}'); var videoElement = document.getElementById('video-${idUnico}'); if (closeBtn && videoElement) { closeBtn.addEventListener('mousedown', function() { if (!videoElement.paused) { videoElement.pause(); } setTimeout(function() { window.location.hash = '#_'; }, 10); }); } })();\n</script>\n`; }
        const htmlParaInserir = `\n<br>\n${templateCSS}${templateElemento}${scriptStop}<br>\n`; const textarea = perguntaTextareaRef.current;
        if (textarea) { const start = textarea.selectionStart; const end = textarea.selectionEnd; const textoAtual = textarea.value; const novoTexto = textoAtual.substring(0, start) + htmlParaInserir + textoAtual.substring(end); setPergunta(novoTexto); if(tipoPopup === 'imagem') { setPopupImageUrl(""); } else { setPopupVideoUrl(""); } textarea.focus(); textarea.selectionStart = start + htmlParaInserir.length; textarea.selectionEnd = start + htmlParaInserir.length; } else { setPergunta(prev => prev + htmlParaInserir); if(tipoPopup === 'imagem') { setPopupImageUrl(""); } else { setPopupVideoUrl(""); } }
    };
    const inserirTemplatePopupYouTube = () => { /* ... */
         if (!popupYouTubeUrl.trim()) { alert("Insira a URL do vídeo do YouTube."); return; } let videoId = ''; const url = popupYouTubeUrl; const patterns = [ /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/, /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/, /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/ ]; for (const pattern of patterns) { const match = url.match(pattern); if (match && match[1]) { videoId = match[1]; break; } } if (!videoId) { alert("URL do YouTube inválida. Use o link completo."); return; } const idUnico = `popup-yt-${Date.now()}`; const embedUrl = `https://www.youtube.com/embed/${videoId}`; const templateCSS = `\n<style>\n.popup-overlay-${idUnico} { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.85); display: none; justify-content: center; align-items: center; z-index: 1000; padding: 20px; box-sizing: border-box; }\n.popup-overlay-${idUnico}:target { display: flex; }\n.popup-content-${idUnico} { position: relative; background-color: #000; padding: 10px; border-radius: 8px; width: 90%; max-width: 800px; aspect-ratio: 16 / 9; }\n.popup-content-${idUnico} iframe { display: block; width: 100%; height: 100%; border: none; }\n.popup-close-${idUnico} { position: absolute; top: -15px; right: -15px; width: 30px; height: 30px; background: white; border-radius: 50%; font-size: 20px; font-weight: bold; color: #333; text-decoration: none; line-height: 30px; text-align: center; box-shadow: 0 0 5px black; }\n.popup-close-${idUnico}:hover { color: #000; background: #eee; }\n.thumb-link-${idUnico} { display: block; margin: 10px auto; width: fit-content; cursor: pointer; }\n.thumb-link-${idUnico} span { background:#eee; border: 1px solid #ccc; padding: 10px 15px; border-radius:5px; color: #c4302b; font-weight: bold; display: flex; align-items: center; gap: 5px; }\n</style>\n`; const templateElemento = `<!-- Link/Thumb YouTube -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\">\n  <span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"currentColor\" style=\"margin-right: 5px;\"><path d=\"M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z\"/></svg> Ver Vídeo YouTube</span>\n</a>\n\n<!-- Popup YouTube -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\">\n  <div class=\"popup-content-${idUnico}\">\n    <a href=\"#\" id=\"close-btn-yt-${idUnico}\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>\n    <iframe id=\"iframe-yt-${idUnico}\" src=\"${embedUrl}\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>\n  </div>\n</div>\n`; const scriptStopYouTube = `\n<script>\n  (function() { var closeBtn = document.getElementById('close-btn-yt-${idUnico}'); var iframe = document.getElementById('iframe-yt-${idUnico}'); if (closeBtn && iframe) { var originalSrc = iframe.src; closeBtn.addEventListener('mousedown', function() { iframe.src = ''; iframe.src = originalSrc; setTimeout(function() { window.location.hash = '#_'; }, 10); }); } })();\n</script>\n`; const htmlParaInserir = `\n<br>\n${templateCSS}${templateElemento}${scriptStopYouTube}<br>\n`; const textarea = perguntaTextareaRef.current; if (textarea) { const start = textarea.selectionStart; const end = textarea.selectionEnd; const textoAtual = textarea.value; const novoTexto = textoAtual.substring(0, start) + htmlParaInserir + textoAtual.substring(end); setPergunta(novoTexto); setPopupYouTubeUrl(""); textarea.focus(); textarea.selectionStart = start + htmlParaInserir.length; textarea.selectionEnd = start + htmlParaInserir.length; } else { setPergunta(prev => prev + htmlParaInserir); setPopupYouTubeUrl(""); }
    };

    // Reset Carta (considera campos bloqueados)
    const resetCarta = () => {
        setTipo("Pergunta"); setTitulo(""); setPergunta(""); setOpcoes([]); setNovaOpcao("");
        setRespostaCorreta([]); setDificuldade("facil");
        setVantagem(""); setDesvantagem(""); setDica("");
        setTempoLimite(30); setColunaAItems([]); setNovaColunaA(""); setColunaBItems([]); setNovaColunaB("");
        setParesCorretosInput(""); setImagemURLPontoCerto(""); setZonasClicaveis([]); setNovaZona({x:0, y:0, largura: 0.1, altura: 0.1}); setRespostaCorretaPontoCerto(null);
        setFraseIncompleta(""); setFragmentos([]); setNovoFragmento(""); setOrdemFragmentos("");
        if (!baralhoBloqueado) setBaralhoCartaAtual(""); // <<--- Não reseta se bloqueado
        if (!categoriasBloqueadas) setCategorias([]);
        if (!fontesBloqueadas) setFontes([]);
        setEditIndex(null);
        setPopupImageUrl(""); setPopupVideoUrl(""); setPopupYouTubeUrl("");
    };

    // Adicionar/Atualizar Carta
    const handleAddOrUpdateCard = () => {
        if (!titulo.trim() || !tipo) { alert("Título e Tipo são obrigatórios."); return; }
        let finalRespostaCorreta: number | number[] | { aId: number; bId: number }[] = [];
        let cartaEspecificaProps: any = {};
        // <<--- Usa DEFAULT se vazio, senão usa o valor trimado
        const nomeBaralhoFinal = baralhoCartaAtual.trim() || DEFAULT_BARALHO_NAME;

        try { // ... (lógica switch case mantida) ...
            switch (tipo) { case "Pergunta": case "ContraTempo": if (respostaCorreta.length !== 1) throw new Error(`Tipo ${tipo} exige uma resposta correta.`); finalRespostaCorreta = respostaCorreta[0]; cartaEspecificaProps.opcoes = opcoes; if(tipo === 'ContraTempo') cartaEspecificaProps.tempoLimite = tempoLimite; break; case "MultiplaEscolha": case "Outras": case "Vantagem": case "Desvantagem": finalRespostaCorreta = (tipo === "Vantagem") ? opcoes.map(o => o.id) : (tipo === "Desvantagem" ? [] : respostaCorreta); cartaEspecificaProps.opcoes = opcoes; break; case "Ordem": const posicoes = new Map<number, number>(); let maxPos = 0; const ordemIds: number[] = []; let ordemValida = true; opcoes.forEach(op => { const pos = op.ordemTemp?.trim() ? parseInt(op.ordemTemp, 10) : NaN; if (isNaN(pos) || pos <= 0 || posicoes.has(pos)) { ordemValida = false; } else { posicoes.set(pos, op.id); maxPos = Math.max(maxPos, pos); } }); if (!ordemValida || posicoes.size !== opcoes.length || maxPos !== opcoes.length) { throw new Error("Erro na ordem: posições devem ser únicas de 1 a N."); } for (let i = 1; i <= maxPos; i++) { ordemIds.push(posicoes.get(i)!); } finalRespostaCorreta = ordemIds; cartaEspecificaProps.opcoes = opcoes.map(({ordemTemp, ...rest}) => rest); break; case "RelacionarColunas": try { finalRespostaCorreta = parseParesRelacionar(paresCorretosInput); if (colunaAItems.length === 0 || colunaBItems.length === 0) { throw new Error("Adicione itens às Colunas A e B."); } if (finalRespostaCorreta.length === 0 && paresCorretosInput.trim() !== '') { throw new Error("Formato inválido para Pares Corretos. Use IDa-IDb, IDa-IDb."); } } catch (error: any) { throw new Error(`Erro ao processar Pares Corretos: ${error.message}`); } cartaEspecificaProps.colunaA = colunaAItems; cartaEspecificaProps.colunaB = colunaBItems; break; case "PontoCerto": if (!imagemURLPontoCerto) throw new Error("URL da Imagem é obrigatória."); if (zonasClicaveis.length === 0) throw new Error("Adicione pelo menos uma Zona Clicável."); if (respostaCorretaPontoCerto === null || !zonasClicaveis.some(z => z.id === respostaCorretaPontoCerto)) throw new Error("Selecione uma Zona Correta válida."); finalRespostaCorreta = respostaCorretaPontoCerto; cartaEspecificaProps.imagemURL = imagemURLPontoCerto; cartaEspecificaProps.zonasClicaveis = zonasClicaveis; break; case "CompletarFrase": if (!fraseIncompleta.trim()) throw new Error("Frase Incompleta é obrigatória."); if (fragmentos.length === 0) throw new Error("Adicione pelo menos um Fragmento."); const ordemIdsFrag = ordemFragmentos.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)); if (ordemIdsFrag.length === 0 || !ordemIdsFrag.every(id => fragmentos.some(f => f.id === id))) throw new Error("Ordem dos Fragmentos inválida ou IDs não encontrados."); finalRespostaCorreta = ordemIdsFrag; cartaEspecificaProps.fraseIncompleta = fraseIncompleta; cartaEspecificaProps.fragmentos = fragmentos; break; default: const check: never = tipo; throw new Error(`Tipo de carta desconhecido: ${check}`); }
        } catch (error: any) { alert(`Erro ao preparar carta: ${error.message}`); return; }

        const cartaBaseProps = {
             id: editIndex !== null ? cards[editIndex].id : `new_${Date.now()}_${Math.random().toString(16).slice(2)}`,
             tipo, titulo, pergunta, dificuldade, categorias, fontes, vantagem, desvantagem, dica,
             baralho: nomeBaralhoFinal, // <<--- BARALHO ATUALIZADO AQUI
             respostaCorreta: finalRespostaCorreta, edited: true,
             origBaralhoId: editIndex !== null ? cards[editIndex].origBaralhoId : undefined
        };
        // ... (restante da função mantido) ...
        if (!["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo)) { delete cartaEspecificaProps.opcoes; } else if (cartaEspecificaProps.opcoes === undefined) { cartaEspecificaProps.opcoes = []; }
        const novaCarta: CartaInterna = { ...cartaBaseProps, ...cartaEspecificaProps } as CartaInterna;
        if (editIndex !== null) { setCards((oldCards) => oldCards.map((c, i) => i === editIndex ? novaCarta : c )); } else { setCards((oldCards) => [...oldCards, novaCarta]); }
        resetCarta();
    };

    // Atualizado para incluir baralho
    const loadCardForEdit = (index: number) => {
        resetCarta(); const carta = cards[index]; setEditIndex(index); setTipo(carta.tipo as TipoCarta); setTitulo(carta.titulo);
        setBaralhoCartaAtual(carta.baralho || ""); // <<--- CARREGA (vazio se for default/undefined)
        setPergunta(carta.pergunta); setDificuldade(carta.dificuldade as Dificuldade); setCategorias([...carta.categorias]); setFontes([...carta.fontes]); setVantagem(carta.vantagem); setDesvantagem(carta.desvantagem); setDica(carta.dica);
        // ... (lógica switch case mantida) ...
        switch (carta.tipo) { case "Pergunta": case "MultiplaEscolha": case "Vantagem": case "Desvantagem": case "Outras": case "ContraTempo": setOpcoes(carta.opcoes ? [...carta.opcoes] : []); const rcArray = Array.isArray(carta.respostaCorreta) ? carta.respostaCorreta : (typeof carta.respostaCorreta === 'number' ? [carta.respostaCorreta] : []); setRespostaCorreta(rcArray.filter(id => typeof id === 'number')); if(carta.tipo === 'ContraTempo') setTempoLimite((carta as CartaContraTempo).tempoLimite || 30); break; case "Ordem": setOpcoes((carta as CartaOrdem).opcoes?.map(op => ({...op})) || []); if (Array.isArray(carta.respostaCorreta) && carta.opcoes) { const ordemCorreta = carta.respostaCorreta as number[]; setOpcoes(currentOpts => currentOpts.map(op => ({...op, ordemTemp: ordemCorreta.indexOf(op.id) >= 0 ? String(ordemCorreta.indexOf(op.id) + 1) : "" }))); } setRespostaCorreta([]); break; case "RelacionarColunas": const cRel = carta as CartaRelacionarColunas; setColunaAItems(cRel.colunaA ? [...cRel.colunaA] : []); setColunaBItems(cRel.colunaB ? [...cRel.colunaB] : []); const paresStringFormat = Array.isArray(cRel.respostaCorreta) ? cRel.respostaCorreta.map(p => `${p.aId}-${p.bId}`).join(', ') : ""; setParesCorretosInput(paresStringFormat); break; case "PontoCerto": const cPonto = carta as CartaPontoCerto; setImagemURLPontoCerto(cPonto.imagemURL || ""); setZonasClicaveis(cPonto.zonasClicaveis ? [...cPonto.zonasClicaveis] : []); setRespostaCorretaPontoCerto(typeof cPonto.respostaCorreta === 'number' ? cPonto.respostaCorreta : null); break; case "CompletarFrase": const cFrase = carta as CartaCompletarFrase; setFraseIncompleta(cFrase.fraseIncompleta || ""); setFragmentos(cFrase.fragmentos ? [...cFrase.fragmentos] : []); setOrdemFragmentos(Array.isArray(cFrase.respostaCorreta) ? cFrase.respostaCorreta.join(', ') : ""); break; }
    };
    const deleteCard = (index: number) => { /* ... */ setCards((old) => old.filter((_, i) => i !== index)); if (editIndex === index) { resetCarta(); } };
    const handleRemoveAllCards = () => { /* ... */ if (window.confirm(`Remover TODAS as ${cards.length} cartas?`)) { setCards([]); setEditIndex(null); resetCarta(); } };
    const cancelEdit = () => { resetCarta(); };

    // Atualizado para incluir baralho (e remover se for default)
    const prepareForDownload = (): Partial<Carta>[] => {
        return cards.map(({ origBaralhoId, edited, ...rest }: CartaInterna) => {
            const cardData: Partial<Carta> = { ...rest };
            // ... (remoção de campos específicos mantida) ...
            if (rest.tipo !== "ContraTempo") delete (cardData as Partial<CartaContraTempo>).tempoLimite; if (rest.tipo !== "RelacionarColunas") { delete (cardData as Partial<CartaRelacionarColunas>).colunaA; delete (cardData as Partial<CartaRelacionarColunas>).colunaB; } if (rest.tipo !== "PontoCerto") { delete (cardData as Partial<CartaPontoCerto>).imagemURL; delete (cardData as Partial<CartaPontoCerto>).zonasClicaveis; } if (rest.tipo !== "CompletarFrase") { delete (cardData as Partial<CartaCompletarFrase>).fraseIncompleta; delete (cardData as Partial<CartaCompletarFrase>).fragmentos; } if (!["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(rest.tipo) || cardData.opcoes === undefined ) { delete cardData.opcoes; } else if (rest.tipo === "Ordem" && cardData.opcoes) { cardData.opcoes = cardData.opcoes.map(({ ordemTemp, ...o }) => o); }
            // Remove 'baralho' se for vazio ou o nome padrão
            if (!cardData.baralho || cardData.baralho === DEFAULT_BARALHO_NAME) {
                delete cardData.baralho;
            }
            return cardData;
        });
    };
    const generateCode = (format: 'js' | 'json') => { /* ... */ const deckFinal = prepareForDownload(); if (format === 'json') { return JSON.stringify(deckFinal, null, 2); } else { const deck = JSON.stringify(deckFinal, null, 2); return `const ${deckName || 'meu_baralho'} = ${deck};\n\nexport default ${deckName || 'meu_baralho'};`; } };
    const downloadCode = (format: 'js' | 'json') => { /* ... */ const element = document.createElement("a"); const fileContent = generateCode(format); const fileType = format === 'js' ? 'text/javascript' : 'application/json'; const fileName = `${deckName || 'meu_baralho'}.${format}`; const file = new Blob([fileContent], { type: fileType }); element.href = URL.createObjectURL(file); element.download = fileName; document.body.appendChild(element); element.click(); document.body.removeChild(element); };
    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

    // --- JSX do Criador ---
    return (
        <div className="p-4 max-w-7xl mx-auto relative">
            <h1 className="text-3xl font-bold mb-6 text-center">Criador de Cartas Eco Challenge</h1>

            {/* Seção Superior */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Nome do Baralho & Download */}
                <Card>
                    {/* ... (mantido) ... */}
                     <CardHeader><CardTitle className="text-xl">Nome do Baralho & Download</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div> <label className="block text-sm font-medium mb-1">Nome (para arquivo .js)</label> <Input type="text" value={deckName} onChange={(e) => setDeckName(e.target.value.replace(/[^a-zA-Z0-9_]/g, '_'))} placeholder={DEFAULT_BARALHO_NAME}/> </div>
                        <div className="flex space-x-4"> <Button onClick={() => downloadCode('js')} className="bg-blue-600 hover:bg-blue-700 text-white flex-1">Baixar .js</Button> <Button onClick={() => downloadCode('json')} className="bg-purple-600 hover:bg-purple-700 text-white flex-1">Baixar .json</Button> </div>
                         {cards.length > 0 && ( <Button onClick={handleRemoveAllCards} variant="destructive" className="w-full mt-2">Remover Todas as {cards.length} Cartas</Button> )}
                    </CardContent>
                </Card>
                 {/* Carregar/Gerenciar Baralhos */}
                 <Card>
                   {/* ... (mantido) ... */}
                    <CardHeader><CardTitle className="text-xl">Carregar/Gerenciar Baralhos</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <Input type="file" accept=".js,.json" onChange={handleFileUpload} multiple />
                        {isLoading && <p className="text-sm text-blue-600">Carregando...</p>}
                        {errorMessage && <Alert variant="destructive"><AlertDescription>{errorMessage}</AlertDescription></Alert>}
                        {baralhosCarregados.length > 0 && (
                             <>
                                <div className="flex items-center space-x-2 pt-2"> <Checkbox id="manterEditadas" checked={manterCartasEditadas} onCheckedChange={(checked) => setManterCartasEditadas(Boolean(checked))} /> <label htmlFor="manterEditadas" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Manter editadas ao remover</label> </div>
                                <ScrollArea className="h-40 border rounded-md p-2">
                                    <ul className="space-y-1">
                                        {baralhosCarregados.map((b) => ( <li key={b.id} className="flex items-center justify-between p-1 even:bg-gray-50"> <div><span className="font-medium text-sm">{b.nome}</span><span className="text-xs text-gray-500 ml-2">({b.cartas.length})</span></div> {!b.adicionado ? (<Button onClick={() => adicionarBaralho(b.id)} size="sm" variant="outline" className="h-7 px-2 text-xs">Add</Button>) : (<Button onClick={() => removerBaralho(b.id)} size="sm" variant="destructive" className="h-7 px-2 text-xs">Remover</Button>)} </li> ))}
                                    </ul>
                                </ScrollArea>
                             </>
                        )}
                    </CardContent>
                </Card>
            </div>

             {/* Seção Principal: Layout 3 colunas */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Coluna Esquerda+Meio: Formulário */}
                <Card className="lg:col-span-2 max-h-[90vh] overflow-y-auto self-start shadow-lg border">
                    <CardHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b pb-3">
                         <CardTitle className="text-2xl">{editIndex !== null ? `Editando: ${cards[editIndex]?.titulo || `Carta ${editIndex + 1}`}` : "Criar Nova Carta"}</CardTitle>
                         <AlertDescription>Preencha os campos para {editIndex !== null ? 'atualizar' : 'criar'} uma carta.</AlertDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 p-4 md:p-6">
                         {/* Card: Campos Comuns Base */}
                        <Card className="border bg-slate-50 p-4 rounded-lg shadow-sm">
                             <CardContent className="p-0 space-y-4">
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="card-tipo" className="block text-sm font-medium mb-1">Tipo*</label>
                                        <Select value={tipo} onValueChange={(value) => setTipo(value as TipoCarta)}>
                                            <SelectTrigger id="card-tipo"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                            <SelectContent> {CARD_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)} </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label htmlFor="card-dificuldade" className="block text-sm font-medium mb-1">Dificuldade</label>
                                        <Select value={dificuldade} onValueChange={(value) => setDificuldade(value as Dificuldade)}>
                                            <SelectTrigger id="card-dificuldade"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                            <SelectContent> {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)} </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                     <label htmlFor="card-titulo" className="block text-sm font-medium mb-1">Título*</label>
                                     <Input id="card-titulo" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card: Pergunta e Popups */}
                        <Card className="border bg-white p-4 rounded-lg shadow-sm">
                             <CardContent className="p-0 space-y-3">
                                <div>
                                    <label htmlFor="card-pergunta" className="block text-sm font-medium mb-1">Pergunta/Descrição* (HTML)</label>
                                    <Textarea ref={perguntaTextareaRef} id="card-pergunta" value={pergunta} onChange={(e) => setPergunta(e.target.value)} className="h-40 font-mono text-sm" placeholder="Escreva aqui..."/>
                                </div>
                                <Card className="border-dashed bg-gray-50">
                                    <CardHeader className="p-2"><CardTitle className="text-sm font-medium">Inserir Popup de Mídia</CardTitle></CardHeader>
                                    <CardContent className="p-2 space-y-2">
                                        <div className="flex items-center gap-2"> <ImageIcon className="h-4 w-4 text-gray-500 shrink-0"/> <Input type="text" value={popupImageUrl} onChange={e => setPopupImageUrl(e.target.value)} placeholder="URL Imagem" className="text-xs h-8 flex-1"/> <Button type="button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('imagem')} className="h-8 text-xs px-2 shrink-0">Add Img Popup</Button> </div>
                                        <div className="flex items-center gap-2"> <Video className="h-4 w-4 text-gray-500 shrink-0"/> <Input type="text" value={popupVideoUrl} onChange={e => setPopupVideoUrl(e.target.value)} placeholder="URL Vídeo (.mp4)" className="text-xs h-8 flex-1"/> <Button type="button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('video')} className="h-8 text-xs px-2 shrink-0">Add Vídeo Popup</Button> </div>
                                        <div className="flex items-center gap-2"> <Youtube className="h-4 w-4 text-red-600 shrink-0"/> <Input type="text" value={popupYouTubeUrl} onChange={e => setPopupYouTubeUrl(e.target.value)} placeholder="URL YouTube (Completa)" className="text-xs h-8 flex-1"/> <Button type="button" size="sm" variant="outline" onClick={inserirTemplatePopupYouTube} className="h-8 text-xs px-2 shrink-0">Add YouTube Popup</Button> </div>
                                    </CardContent>
                                 </Card>
                            </CardContent>
                        </Card>

                        {/* --- Campos Condicionais (Opções, ContraTempo, etc.) --- */}
                         {["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo) && (
                            <Card className="border bg-gray-50 p-4 rounded-lg shadow-sm">
                                {/* ... (renderização de opções mantida) ... */}
                                <CardHeader className="p-0 mb-3"><CardTitle className="text-lg">Opções</CardTitle></CardHeader>
                                <CardContent className="p-0 space-y-3">
                                    <div className="flex space-x-2"> <Input type="text" value={novaOpcao} onChange={(e) => setNovaOpcao(e.target.value)} placeholder="Texto da nova opção" className="flex-1"/> <Button type="button" onClick={handleAddOpcao}>Adicionar</Button> </div>
                                    <ScrollArea className="max-h-48 pr-2 border rounded bg-white">
                                        <ul className="space-y-2 p-2">
                                            {opcoes.map((o) => (
                                                <li key={o.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 border-b pb-2 last:border-b-0">
                                                    <span className="flex-1 text-sm py-1">{o.id}: {o.texto}</span>
                                                    {tipo === "Ordem" && (<div className="flex items-center space-x-1 my-1"> <label htmlFor={`order-${o.id}`} className="text-xs shrink-0">Pos:</label> <Input id={`order-${o.id}`} type="number" min="1" step="1" onChange={(e) => handleSetOrder(o.id, e.target.value)} value={o.ordemTemp ?? ""} className="border p-1 w-16 rounded text-sm h-8 shrink-0"/> </div>)}
                                                    {(tipo === "Pergunta" || tipo === "MultiplaEscolha" || tipo === "Outras" || tipo === "ContraTempo") && (<Button type="button" onClick={() => handleToggleRespostaCorreta(o.id)} variant={respostaCorreta.includes(o.id) ? "default" : "outline"} size="sm" className={cn("h-8 shrink-0", respostaCorreta.includes(o.id) && "bg-green-600 hover:bg-green-700")}> {respostaCorreta.includes(o.id) ? "Correta" : "Marcar"} </Button> )}
                                                    <Button type="button" onClick={() => handleRemoveOpcao(o.id)} variant="destructive" size="sm" className="h-8 shrink-0">Remover</Button>
                                                </li>
                                            ))}
                                            {opcoes.length === 0 && <p className="text-xs text-center text-gray-500 py-2">Nenhuma opção.</p>}
                                        </ul>
                                    </ScrollArea>
                                    {tipo === "Ordem" && <p className="text-xs text-gray-500 mt-2">Defina a posição correta (1 a N).</p>}
                                    {tipo === "Vantagem" && <p className="text-xs text-green-600 mt-2">Opções são para confirmação.</p>}
                                    {tipo === "Desvantagem" && <p className="text-xs text-red-600 mt-2">Opções são para confirmação.</p>}
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "ContraTempo" && (
                            <Card className="border bg-yellow-50 border-yellow-200 p-4 rounded-lg shadow-sm"> <CardContent className="p-0"> <label className="block text-sm font-medium mb-1">Tempo Limite (segundos)</label> <Input type="number" value={tempoLimite} onChange={(e) => setTempoLimite(Math.max(5, parseInt(e.target.value, 10) || 5))} min="5" className="w-24"/> </CardContent> </Card>
                        )}

                        {tipo === "RelacionarColunas" && (
                            <Card className="border bg-blue-50 border-blue-200 p-4 rounded-lg shadow-sm">
                                {/* ... (renderização Relacionar Colunas mantida) ... */}
                                <CardHeader className="p-0 mb-3"><CardTitle className="text-lg">Relacionar Colunas</CardTitle></CardHeader>
                                <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div> <h4 className="text-md font-semibold mb-2">Coluna A</h4> <div className="flex space-x-2 mb-2"> <Input type="text" value={novaColunaA} onChange={e => setNovaColunaA(e.target.value)} placeholder="Texto item A" className="flex-1"/> <Button type="button" onClick={handleAddColunaA} size="sm">Add A</Button> </div> <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{colunaAItems.map(item => <li key={item.id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveColunaA(item.id)}>X</Button></li>)}</ul></ScrollArea> </div>
                                    <div> <h4 className="text-md font-semibold mb-2">Coluna B</h4> <div className="flex space-x-2 mb-2"> <Input type="text" value={novaColunaB} onChange={e => setNovaColunaB(e.target.value)} placeholder="Texto item B" className="flex-1"/> <Button type="button" onClick={handleAddColunaB} size="sm">Add B</Button> </div> <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{colunaBItems.map(item => <li key={item.id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveColunaB(item.id)}>X</Button></li>)}</ul></ScrollArea> </div>
                                    <div className="md:col-span-2"> <label className="block text-sm font-medium mb-1">Pares Corretos (Formato: IDa-IDb, IDa-IDb)</label> <Textarea value={paresCorretosInput} onChange={e => setParesCorretosInput(e.target.value)} className="h-20 font-mono text-xs" placeholder='Ex: 1-101, 2-102, 3-103' /> </div>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "PontoCerto" && (
                             <Card className="border bg-indigo-50 border-indigo-200 p-4 rounded-lg shadow-sm">
                                {/* ... (renderização Ponto Certo mantida) ... */}
                                <CardHeader className="p-0 mb-3"><CardTitle className="text-lg">Ponto Certo</CardTitle></CardHeader>
                                <CardContent className="p-0 space-y-4">
                                    <div> <label className="block text-sm font-medium mb-1">URL da Imagem Principal*</label> <Input type="text" value={imagemURLPontoCerto} onChange={e => setImagemURLPontoCerto(e.target.value)} placeholder="/images/mapa.png" /> </div>
                                    {imagemURLPontoCerto && ( <div className="relative border rounded overflow-hidden max-w-sm mx-auto aspect-video bg-gray-200 my-2"> <img ref={previewImageRefPontoCerto} src={imagemURLPontoCerto} alt="Preview" className="block w-full h-full object-contain" onError={(e) => { e.currentTarget.src = '/images/placeholder_error.png'; e.currentTarget.classList.add('opacity-50');}}/> {zonasClicaveis.map(z => (<div key={`zone-vis-${z.id}`} className={cn( "absolute border-2 pointer-events-none", respostaCorretaPontoCerto === z.id ? "border-green-500 bg-green-500/30" : "border-dashed border-red-500 bg-red-500/20" )} style={{ left: `${z.x * 100}%`, top: `${z.y * 100}%`, width: `${z.largura * 100}%`, height: `${z.altura * 100}%` }} title={`ID: ${z.id} - ${z.descricao || 'Zona'}`}><span className="absolute -top-5 left-0 text-xs bg-black/50 text-white px-1 rounded">{z.id}</span></div>))}{novaZona.x != null && novaZona.y != null && novaZona.largura != null && novaZona.altura != null && (<div className="absolute border-2 border-blue-500 border-dotted pointer-events-none bg-blue-500/20" style={{ left: `${(parseFloat(String(novaZona.x).replace(',','.')) || 0) * 100}%`, top: `${(parseFloat(String(novaZona.y).replace(',','.')) || 0) * 100}%`, width: `${(parseFloat(String(novaZona.largura).replace(',','.')) || 0.1) * 100}%`, height: `${(parseFloat(String(novaZona.altura).replace(',','.')) || 0.1) * 100}%` }} title="Nova Zona"/>)}</div> )}
                                    <div> <h4 className="text-md font-semibold mb-2">Adicionar Zona Clicável</h4> <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 border p-2 rounded items-end bg-white"> <Input type="number" placeholder="X (0-1)" value={novaZona.x ?? ""} onChange={e => handleNovaZonaChange('x', e.target.value)} className="text-sm h-9" step="0.01" min="0" max="1"/> <Input type="number" placeholder="Y (0-1)" value={novaZona.y ?? ""} onChange={e => handleNovaZonaChange('y', e.target.value)} className="text-sm h-9" step="0.01" min="0" max="1"/> <Input type="number" placeholder="Largura (0-1)" value={novaZona.largura ?? ""} onChange={e => handleNovaZonaChange('largura', e.target.value)} className="text-sm h-9" step="0.01" min="0.01" max="1"/> <Input type="number" placeholder="Altura (0-1)" value={novaZona.altura ?? ""} onChange={e => handleNovaZonaChange('altura', e.target.value)} className="text-sm h-9" step="0.01" min="0.01" max="1"/> <Input type="text" placeholder="Descrição (Opc)" value={novaZona.descricao ?? ""} onChange={e => handleNovaZonaChange('descricao', e.target.value)} className="text-sm h-9 col-span-2 sm:col-span-3"/> <Button type="button" onClick={handleAddZona} size="sm" className="h-9">Add Zona</Button> </div>
                                         <h4 className="text-md font-semibold mb-1 mt-3">Zonas (Selecione a correta)</h4> <ScrollArea className="h-32 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{zonasClicaveis.map(z => ( <li key={z.id} className="flex justify-between items-center odd:bg-gray-50 even:bg-white px-1 py-0.5"> <span>ID:{z.id} ({z.x},{z.y} {z.largura}x{z.altura}) {z.descricao}</span> <div className="flex items-center gap-1"> <Button type="button" variant={respostaCorretaPontoCerto === z.id ? "default" : "outline"} className={cn("h-6 px-1.5 text-xs", respostaCorretaPontoCerto === z.id && "bg-green-600")} onClick={() => handleSetRespostaPontoCerto(z.id)}>Correta</Button> <Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveZona(z.id)}>X</Button> </div> </li> ))} {zonasClicaveis.length === 0 && <p className="text-xs text-center text-gray-500 py-2">Nenhuma zona.</p>} </ul></ScrollArea>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "CompletarFrase" && ( /* ... (mantido, com melhorias de UI) ... */
                            <Card className="border bg-pink-50 border-pink-200 p-4 rounded-lg shadow-sm">
                                 <CardHeader className="p-0 mb-3"><CardTitle className="text-lg">Completar Frase</CardTitle></CardHeader>
                                 <CardContent className="p-0 space-y-4">
                                    <div> <label className="block text-sm font-medium mb-1">Frase Incompleta* (use __1__, __2__)</label> <Textarea value={fraseIncompleta} onChange={e => setFraseIncompleta(e.target.value)} className="h-20 font-mono text-sm" placeholder="O __1__ é essencial para a __2__."/> </div>
                                    <div> <h4 className="text-md font-semibold mb-2">Fragmentos</h4> <div className="flex space-x-2 mb-2"> <Input type="text" value={novoFragmento} onChange={e => setNovoFragmento(e.target.value)} placeholder="Texto do fragmento" className="flex-1"/> <Button type="button" onClick={handleAddFragmento}>Add Frag.</Button> </div> <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{fragmentos.map(f => <li key={f.id} className="flex justify-between items-center"><span>{f.id}: {f.texto}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveFragmento(f.id)}>X</Button></li>)}</ul></ScrollArea> </div>
                                    <div> <label className="block text-sm font-medium mb-1">Ordem Correta* (IDs por vírgula)</label> <Input type="text" value={ordemFragmentos} onChange={e => setOrdemFragmentos(e.target.value)} placeholder="1, 3, 2" /> </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Card: Categorias, Fontes, Baralho */}
                         <Card className="border bg-slate-50 p-4 rounded-lg shadow-sm">
                             <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Categorias */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-sm font-medium">Categorias</label>
                                        <div className="flex items-center space-x-1" title="Travar para manter ao criar nova carta">
                                            <Checkbox id="lockCat" checked={categoriasBloqueadas} onCheckedChange={checked => setCategoriasBloqueadas(Boolean(checked))} />
                                            <label htmlFor="lockCat" className="text-xs cursor-help">Travar</label>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 mb-1"> <Input type="text" value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} placeholder="Nova categoria" className="flex-1 h-9"/> <Button type="button" onClick={handleAddCategoria} size="sm" className="h-9">Add</Button> </div>
                                    <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="space-y-1 text-sm">{categorias.map((c, i) => <li key={i} className="flex justify-between items-center"><span>{c}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveCategoria(c)}>X</Button></li>)}</ul></ScrollArea>
                                </div>
                                {/* Fontes */}
                                 <div>
                                     <div className="flex items-center justify-between mb-2">
                                          <label className="text-sm font-medium">Fontes</label>
                                          <div className="flex items-center space-x-1" title="Travar para manter ao criar nova carta">
                                               <Checkbox id="lockFont" checked={fontesBloqueadas} onCheckedChange={checked => setFontesBloqueadas(Boolean(checked))} />
                                               <label htmlFor="lockFont" className="text-xs cursor-help">Travar</label>
                                          </div>
                                     </div>
                                    <div className="flex space-x-2 mb-1"> <Input type="text" value={novaFonte} onChange={(e) => setNovaFonte(e.target.value)} placeholder="Nova fonte" className="flex-1 h-9"/> <Button type="button" onClick={handleAddFonte} size="sm" className="h-9">Add</Button> </div>
                                    <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="space-y-1 text-sm">{fontes.map((f, i) => <li key={i} className="flex justify-between items-center"><span>{f}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveFonte(f)}>X</Button></li>)}</ul></ScrollArea>
                                </div>
                                {/* Baralho */}
                                 <div>
                                      <div className="flex items-center justify-between mb-2">
                                          <label htmlFor="card-baralho-input" className="text-sm font-medium">Baralho</label>
                                          <div className="flex items-center space-x-1" title="Travar para manter ao criar nova carta">
                                               <Checkbox id="lockBaralho" checked={baralhoBloqueado} onCheckedChange={checked => setBaralhoBloqueado(Boolean(checked))} />
                                               <label htmlFor="lockBaralho" className="text-xs cursor-help">Travar</label>
                                          </div>
                                      </div>
                                      <Input id="card-baralho-input" type="text" value={baralhoCartaAtual} onChange={(e) => setBaralhoCartaAtual(e.target.value)} placeholder={DEFAULT_BARALHO_NAME} className="h-9"/>
                                      <p className="text-xs text-gray-500 mt-1">Deixe em branco para usar "{DEFAULT_BARALHO_NAME}".</p>
                                 </div>
                            </CardContent>
                         </Card>

                        {/* Card: Vantagem, Desvantagem, Dica */}
                        <Card className="border bg-slate-50 p-4 rounded-lg shadow-sm">
                            <CardContent className="p-0 space-y-3">
                                <div><label htmlFor="card-vantagem" className="block text-sm font-medium mb-1 text-green-700">Vantagem (Msg Acerto)</label><Input id="card-vantagem" type="text" value={vantagem} onChange={(e) => setVantagem(e.target.value)} className="border-green-200"/></div>
                                <div><label htmlFor="card-desvantagem" className="block text-sm font-medium mb-1 text-red-700">Desvantagem (Msg Erro)</label><Input id="card-desvantagem" type="text" value={desvantagem} onChange={(e) => setDesvantagem(e.target.value)} className="border-red-200"/></div>
                                <div><label htmlFor="card-dica" className="block text-sm font-medium mb-1 text-blue-700">Dica</label><Input id="card-dica" type="text" value={dica} onChange={(e) => setDica(e.target.value)} className="border-blue-200"/></div>
                            </CardContent>
                        </Card>

                        {/* Botões de Ação */}
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 pt-4 border-t mt-6">
                            <Button type="button" onClick={handleAddOrUpdateCard} className="bg-green-600 hover:bg-green-700 text-white flex-1 h-10">
                                {editIndex !== null ? "Salvar Edições" : "Adicionar Carta ao Baralho"}
                            </Button>
                            {editIndex !== null && (<Button type="button" onClick={cancelEdit} variant="outline" className="flex-1 h-10">Cancelar Edição</Button>)}
                        </div>
                    </CardContent>
                </Card>

                 {/* Coluna Direita: Lista e Preview Fixo */}
                 <div className="space-y-4 lg:sticky lg:top-4 self-start">
                     {/* Preview Estático */}
                     <Card className="border-2 border-gray-300 shadow-lg">
                            <CardHeader className="bg-gray-100 py-2"><CardTitle className="text-lg text-center font-semibold">Preview da Carta</CardTitle></CardHeader>
                            <CardContent className="p-2">
                                 <CardStaticView card={
                                    editIndex !== null
                                    ? cards[editIndex]
                                    : (() => {
                                        const finalRespostaCorretaPreview = (() => { /* ... (lógica mantida) ... */ if (tipo === 'Pergunta' || tipo === 'ContraTempo') return respostaCorreta[0]; if (tipo === 'PontoCerto') return respostaCorretaPontoCerto ?? undefined; if (tipo === 'RelacionarColunas') { try { return parseParesRelacionar(paresCorretosInput); } catch { return []; } } if (tipo === 'CompletarFrase') return ordemFragmentos.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n)); if (tipo === 'Ordem') { const sorted = [...opcoes].sort((a, b) => (parseInt(a.ordemTemp || '999', 10) - parseInt(b.ordemTemp || '999', 10))); return sorted.map(o => o.id); } if (tipo === 'Vantagem') return opcoes.map(o => o.id); if (tipo === 'Desvantagem') return []; return respostaCorreta; })();
                                        const previewCard: Partial<Carta> = { tipo, titulo, baralho: baralhoCartaAtual.trim() || undefined, pergunta, dificuldade, categorias, fontes, vantagem, desvantagem, dica, respostaCorreta: finalRespostaCorretaPreview as any, };
                                        switch (tipo) { case "Pergunta": case "MultiplaEscolha": case "Ordem": case "Vantagem": case "Desvantagem": case "Outras": previewCard.opcoes = opcoes; break; case "ContraTempo": previewCard.opcoes = opcoes; (previewCard as Partial<CartaContraTempo>).tempoLimite = tempoLimite; break; case "RelacionarColunas": (previewCard as Partial<CartaRelacionarColunas>).colunaA = colunaAItems; (previewCard as Partial<CartaRelacionarColunas>).colunaB = colunaBItems; break; case "PontoCerto": (previewCard as Partial<CartaPontoCerto>).imagemURL = imagemURLPontoCerto; (previewCard as Partial<CartaPontoCerto>).zonasClicaveis = zonasClicaveis; break; case "CompletarFrase": (previewCard as Partial<CartaCompletarFrase>).fraseIncompleta = fraseIncompleta; (previewCard as Partial<CartaCompletarFrase>).fragmentos = fragmentos; break; }
                                        return previewCard;
                                    })()
                                 }/>
                             </CardContent>
                     </Card>

                     {/* Lista de Cartas */}
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Baralho Atual ({cards.length} Cartas)</CardTitle>
                            <AlertDescription>Clique em uma carta abaixo para editá-la.</AlertDescription>
                        </CardHeader>
                        <CardContent>
                             {cards.length === 0 ? (<p className="text-gray-500 italic text-center py-4">Nenhuma carta.</p>) : (
                                <ScrollArea className="h-[calc(50vh - 8rem)] min-h-[200px] pr-3 border rounded-md bg-gray-50 p-2">
                                    <div className="space-y-2">
                                        {cards.map((c, index) => (
                                            <Card key={`card-display-${c.id || index}`} className={cn("hover:shadow-md transition-shadow cursor-pointer border", editIndex === index && "ring-2 ring-blue-500 border-blue-400")} onClick={() => loadCardForEdit(index)}>
                                                <CardContent className="p-2 flex items-center justify-between gap-2">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-xs font-semibold text-blue-700">{c.tipo} - {c.dificuldade} {c.baralho && c.baralho !== DEFAULT_BARALHO_NAME ? `(${c.baralho})`: ''}</p>
                                                        <p className="font-medium truncate text-sm" title={c.titulo}>{c.titulo || `Carta ${index + 1}`}</p>
                                                    </div>
                                                    <Button onClick={(e) => {e.stopPropagation(); deleteCard(index)}} size="sm" variant="ghost" className="text-red-500 hover:bg-red-100 h-7 w-7 p-0 flex-shrink-0">
                                                        <Trash className="h-4 w-4"/>
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                             )}
                         </CardContent>
                     </Card>
                 </div>
             </div>

              {/* Botão Voltar ao Topo Fixo */}
              {showScrollTop && (
                <Button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full p-0 shadow-lg bg-gray-700 hover:bg-gray-900 text-white"
                    title="Voltar ao Topo"
                    aria-label="Voltar ao topo da página"
                >
                    <ArrowUpCircle className="h-6 w-6" />
                </Button>
             )}
        </div>
    );
};

export default CriadorDeCarta;