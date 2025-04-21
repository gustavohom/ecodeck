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
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Tipos de Dados ---
interface Opcao { id: number; texto: string; ordemTemp?: string; }
interface ItemRelacionar { id: number; texto: string; }
interface ZonaClicavel { id: number; x: number; y: number; largura: number; altura: number; descricao?: string; }
interface FragmentoCompletar { id: number; texto: string; }

interface CartaBase {
    id: string | number; tipo: string; titulo: string; pergunta: string;
    dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[];
    vantagem: string; desvantagem: string; dica: string;
    // Adicionando 'opcoes' como opcional na base para permitir 'delete' seguro
    opcoes?: Opcao[];
}
// Tipos específicos herdam e podem tornar 'opcoes' obrigatório onde necessário
interface CartaComOpcoes extends CartaBase { opcoes: Opcao[]; } // Tipo auxiliar

interface CartaPergunta extends CartaComOpcoes { tipo: "Pergunta"; respostaCorreta: number; }
interface CartaMultiplaEscolha extends CartaComOpcoes { tipo: "MultiplaEscolha"; respostaCorreta: number[]; }
interface CartaOrdem extends CartaComOpcoes { tipo: "Ordem"; respostaCorreta: number[]; } // resposta é array de IDs
interface CartaVantagem extends CartaComOpcoes { tipo: "Vantagem"; respostaCorreta: number[]; }
interface CartaDesvantagem extends CartaComOpcoes { tipo: "Desvantagem"; respostaCorreta: number[]; }
interface CartaOutras extends CartaComOpcoes { tipo: "Outras"; respostaCorreta: number[]; }
interface CartaContraTempo extends CartaComOpcoes { tipo: "ContraTempo"; respostaCorreta: number; tempoLimite: number; }

// Tipos sem 'opcoes' padrão (opcoes se torna opcional herdado da base)
interface CartaRelacionarColunas extends CartaBase { tipo: "RelacionarColunas"; colunaA: ItemRelacionar[]; colunaB: ItemRelacionar[]; respostaCorreta: { aId: number; bId: number }[]; }
interface CartaPontoCerto extends CartaBase { tipo: "PontoCerto"; imagemURL: string; zonasClicaveis: ZonaClicavel[]; respostaCorreta: number; }
interface CartaCompletarFrase extends CartaBase { tipo: "CompletarFrase"; fraseIncompleta: string; fragmentos: FragmentoCompletar[]; respostaCorreta: number[]; }

type Carta =
    | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras
    | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;

// --- Fim dos Tipos ---

const CARD_TYPES = [
    "Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras",
    "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"
] as const;
type TipoCarta = typeof CARD_TYPES[number];

const DIFFICULTIES = ["facil", "normal", "dificil"] as const;
type Dificuldade = typeof DIFFICULTIES[number];

interface BaralhoCarregado {
    id: number; nome: string; cartas: Carta[]; adicionado: boolean;
}

// --- Componente de Preview Estático ---
const CardStaticView: React.FC<{ card: Partial<Carta> }> = ({ card }) => {
    const {
        tipo = "Pergunta", titulo = "", pergunta = "", opcoes = [], respostaCorreta,
        dificuldade = "facil", categorias = [], fontes = [], vantagem = "", desvantagem = "", dica = ""
    } = card;

    let renderedSpecifics: React.ReactNode = null;
    let renderedOptions: React.ReactNode = null;

    switch (tipo) {
        case "ContraTempo":
            const cardContraTempo = card as Partial<CartaContraTempo>;
            renderedSpecifics = <p className="text-xs text-orange-600">Tempo Limite: {cardContraTempo.tempoLimite || '?'}s</p>;
            break;
        case "RelacionarColunas":
            const cardRelCol = card as Partial<CartaRelacionarColunas>;
            renderedSpecifics = (
                <div className="flex gap-4 text-xs mt-2">
                    <div className="flex-1"><strong>Coluna A:</strong><ul>{cardRelCol.colunaA?.map(i => <li key={`a-${i.id}`}>{i.id}: {i.texto}</li>)}</ul></div>
                    <div className="flex-1"><strong>Coluna B:</strong><ul>{cardRelCol.colunaB?.map(i => <li key={`b-${i.id}`}>{i.id}: {i.texto}</li>)}</ul></div>
                </div>
            );
             const pairs = Array.isArray(cardRelCol.respostaCorreta) ? cardRelCol.respostaCorreta.map(p => `${p.aId}-${p.bId}`).join(', ') : '(Inválida)';
             renderedOptions = <p className="text-xs mt-1">Pares Corretos: [{pairs}]</p>;
            break;
        case "PontoCerto":
            const cardPontoCerto = card as Partial<CartaPontoCerto>;
            renderedSpecifics = (
                <>
                    <p className="text-xs">Imagem URL: <span className="font-mono bg-gray-100 px-1 rounded">{cardPontoCerto.imagemURL || '(Nenhuma)'}</span></p>
                    {cardPontoCerto.zonasClicaveis && cardPontoCerto.zonasClicaveis.length > 0 && (
                        <details className="text-xs mt-1">
                            <summary className="cursor-pointer font-medium">Zonas Clicáveis ({cardPontoCerto.zonasClicaveis.length})</summary>
                            <ul className="pl-4 list-disc">
                                {cardPontoCerto.zonasClicaveis.map(z => <li key={z.id}>ID:{z.id} ({z.x},{z.y} - {z.largura}x{z.altura}) {z.descricao || ''}</li>)}
                            </ul>
                        </details>
                    )}
                </>
            );
            renderedOptions = <p className="text-xs mt-1">Zona Correta ID: {typeof cardPontoCerto.respostaCorreta === 'number' ? cardPontoCerto.respostaCorreta : '(Inválido)'}</p>;
            break;
        case "CompletarFrase":
            const cardCompFrase = card as Partial<CartaCompletarFrase>;
            renderedSpecifics = <p className="text-xs mt-1 italic">Frase: quot;{cardCompFrase.fraseIncompleta || '...'}quot;</p>;
            renderedOptions = (
                <>
                 {cardCompFrase.fragmentos && cardCompFrase.fragmentos.length > 0 && (
                    <details className="text-xs mt-1">
                        <summary className="cursor-pointer font-medium">Fragmentos ({cardCompFrase.fragmentos.length})</summary>
                        <ul className="pl-4 list-disc">
                            {cardCompFrase.fragmentos.map(f => <li key={f.id}>{f.id}: {f.texto}</li>)}
                        </ul>
                    </details>
                  )}
                 <p className="text-xs mt-1">Ordem Correta IDs: [{(Array.isArray(cardCompFrase.respostaCorreta) ? cardCompFrase.respostaCorreta.join(', ') : '(Inválida)')}]</p>
                </>
            );
            break;
        // Tipos que usam as 'opcoes' padrão
        case "Pergunta": case "MultiplaEscolha": case "Ordem": case "Vantagem": case "Desvantagem": case "Outras":
            const correctSet = new Set<number>();
            if (tipo === "Vantagem" && opcoes) { // Verifica se opcoes existe
                opcoes.forEach(o => correctSet.add(o.id));
            } else if (tipo !== "Desvantagem") {
                if (Array.isArray(respostaCorreta)) { (respostaCorreta as number[]).forEach(id => typeof id === 'number' && correctSet.add(id)); }
                else if (typeof respostaCorreta === 'number') { correctSet.add(respostaCorreta); }
            }

            renderedOptions = (
                <ul className="mt-2 pl-5 list-decimal space-y-1">
                    {opcoes?.map((op) => { // Adiciona verificação opcional
                        const isCorrect = correctSet.has(op.id);
                        const orderInfo = tipo === 'Ordem' && Array.isArray(respostaCorreta) && (respostaCorreta as number[]).includes(op.id)
                            ? ` (Pos: ${(respostaCorreta as number[]).indexOf(op.id) + 1})`
                            : tipo === 'Ordem' ? ` (Ordem Inválida)` : '';

                        return (
                            <li key={op.id} className={cn("mb-1 text-sm", isCorrect && "text-green-700 font-semibold")}>
                                {op.texto}
                                {isCorrect && tipo !== 'Vantagem' && tipo !== 'Ordem' && <span className="text-green-600 text-xs font-normal"> (Correta)</span>}
                                {tipo === 'Ordem' && <span className="text-blue-600 text-xs font-normal">{orderInfo}</span>}
                            </li>
                        );
                    })}
                </ul>
            );
            break;
    }

    return (
        <Card className="max-w-md mx-auto my-4 shadow-md">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">{titulo || "(Sem Título)"}</CardTitle>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Tipo: <Badge variant="secondary" className="ml-1">{tipo}</Badge></span>
                    <span>Dificuldade: <Badge variant={dificuldade === 'facil' ? 'default' : dificuldade === 'normal' ? 'outline' : 'destructive'} className="ml-1 capitalize">{dificuldade}</Badge></span>
                </div>
            </CardHeader>
            <CardContent className="pt-2 pb-3 space-y-2">
                {renderedSpecifics}
                <ScrollArea className="h-auto max-h-60 rounded-md border p-3 mt-2 bg-white/80 min-h-[100px]">
                     <div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-img:my-2 prose-ul:my-1 prose-ol:my-1" dangerouslySetInnerHTML={{ __html: pergunta || "(Sem Pergunta/Descrição)" }} />
                </ScrollArea>
                {renderedOptions}
            </CardContent>
            {(categorias.length > 0 || fontes.length > 0 || dica || vantagem || desvantagem) && (
                 <CardFooter className="flex flex-col items-start text-xs text-gray-600 border-t pt-2 pb-2 space-y-1">
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


// --- Componente Criador Principal (ATUALIZADO) ---
const CriadorDeCarta: React.FC = () => {
    const [deckName, setDeckName] = useState("meu_baralho");
    const [cards, setCards] = useState<(Carta & { origBaralhoId?: number, edited?: boolean })[]>([]); // Adiciona tipos opcionais aqui
    const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
    const [titulo, setTitulo] = useState("");
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
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
    const [manterCartasEditadas, setManterCartasEditadas] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const perguntaTextareaRef = useRef<HTMLTextAreaElement>(null);

    const parseJSDeckFileLocal = (content: string): Carta[] => {
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) { throw new Error("Array não encontrado no arquivo JS."); }
        const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[];
        return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[];
     };
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; if (!files) return;
        setIsLoading(true); setErrorMessage(null); let loadErrors: string[] = [];
        const newBaralhos: BaralhoCarregado[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i]; const content = await file.text();
            try {
                let newCards: Carta[] = []; const nome = file.name.replace(/\.(js|json)$/, "");
                if (baralhosCarregados.some(b => b.nome === nome)) { loadErrors.push(`Baralho "${nome}" já carregado.`); continue; }
                if (file.name.endsWith(".js")) { newCards = parseJSDeckFileLocal(content); }
                else if (file.name.endsWith(".json")) { newCards = JSON.parse(content) as Carta[]; }
                else { loadErrors.push(`Formato ${file.name} não suportado.`); continue; }
                if (!Array.isArray(newCards) || newCards.length === 0) { loadErrors.push(`Nenhuma carta válida em "${nome}".`); continue; }
                // Adiciona IDs únicos às cartas carregadas se não existirem
                newCards = newCards.map((c, idx) => ({...c, id: c.id || `${nome}_${idx}`}));
                newBaralhos.push({ id: Date.now() + Math.random(), nome, cartas: newCards, adicionado: false });
            } catch (error: any) { loadErrors.push(`Erro ao ler ${file.name}: ${error.message}`); }
        }
        if (newBaralhos.length > 0) { setBaralhosCarregados((prev) => [...prev, ...newBaralhos]); }
        if (loadErrors.length > 0) { setErrorMessage(loadErrors.join(" ")); }
        setIsLoading(false); e.target.value = '';
     };
    const adicionarBaralho = (baralhoId: number) => {
        setBaralhosCarregados((prev) => prev.map((b) => {
            if (b.id === baralhoId && !b.adicionado) {
                const newCards = b.cartas.map((c) => ({ ...c, id: c.id || `${b.nome}_${Math.random().toString(16).slice(2)}`, origBaralhoId: b.id, edited: false }));
                setCards((oldCards) => [...oldCards, ...newCards]); return { ...b, adicionado: true };
            } return b;
        }));
     };
     // CORREÇÃO AQUI: Adicionar tipo explícito para 'c' no filter
    const removerBaralho = (baralhoId: number) => {
         setBaralhosCarregados((prev) => prev.map((b) => {
            if (b.id === baralhoId && b.adicionado) {
                setCards((oldCards) => oldCards.filter((c: Carta & { origBaralhoId?: number, edited?: boolean }) => { // <-- Tipo adicionado
                    if (c.origBaralhoId === baralhoId) { return c.edited && manterCartasEditadas; } return true;
                })); return { ...b, adicionado: false };
            } return b;
         }));
     };
    const handleAddOpcao = () => { if (novaOpcao.trim() !== "") { const newId = opcoes.length > 0 ? Math.max(...opcoes.map(o => o.id)) + 1 : 1; setOpcoes(prev => [...prev, { id: newId, texto: novaOpcao, ordemTemp: tipo === 'Ordem' ? '' : undefined }]); setNovaOpcao(""); }};
    const handleRemoveOpcao = (id: number) => { setOpcoes((prev) => prev.filter(o => o.id !== id)); setRespostaCorreta((prev) => prev.filter(rcId => rcId !== id)); };
    const handleToggleRespostaCorreta = (id: number) => { if (tipo === "Pergunta" || tipo === "ContraTempo") { setRespostaCorreta(prev => prev.includes(id) ? [] : [id]); } else if (tipo === "MultiplaEscolha" || tipo === "Outras") { setRespostaCorreta(prev => prev.includes(id) ? prev.filter(rcId => rcId !== id) : [...prev, id]); }};
    const handleSetOrder = (optionId: number, orderValue: string) => { setOpcoes(prev => prev.map(op => op.id === optionId ? { ...op, ordemTemp: orderValue } : op)); };
    const handleAddColunaA = () => { if (novaColunaA.trim()) { const newId = colunaAItems.length > 0 ? Math.max(...colunaAItems.map(i => i.id)) + 1 : 1; setColunaAItems(prev => [...prev, { id: newId, texto: novaColunaA }]); setNovaColunaA(""); }};
    const handleRemoveColunaA = (id: number) => setColunaAItems(prev => prev.filter(i => i.id !== id));
    const handleAddColunaB = () => { if (novaColunaB.trim()) { const newId = colunaBItems.length > 0 ? Math.max(...colunaBItems.map(i => i.id), 100) + 1 : 101; setColunaBItems(prev => [...prev, { id: newId, texto: novaColunaB }]); setNovaColunaB(""); }};
    const handleRemoveColunaB = (id: number) => setColunaBItems(prev => prev.filter(i => i.id !== id));
    const handleAddZona = () => {
         const id = zonasClicaveis.length > 0 ? Math.max(...zonasClicaveis.map(z => z.id)) + 1 : 1;
         const x = parseFloat(String(novaZona.x || 0).replace(',', '.'));
         const y = parseFloat(String(novaZona.y || 0).replace(',', '.'));
         const w = parseFloat(String(novaZona.largura || 0.1).replace(',', '.'));
         const h = parseFloat(String(novaZona.altura || 0.1).replace(',', '.'));
         if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) && w > 0 && h > 0 && x>=0 && x<=1 && y>=0 && y<=1 && w+x<=1 && h+y<=1) {
            setZonasClicaveis(prev => [...prev, { id, x, y, largura: w, altura: h, descricao: novaZona.descricao || "" }]);
            setNovaZona({x:0, y:0, largura: 0.1, altura: 0.1});
         } else { alert("Valores inválidos para a zona (X, Y, Largura, Altura devem ser números entre 0 e 1, e X+Largura <= 1, Y+Altura <= 1). Use ponto ou vírgula."); }
     };
    const handleRemoveZona = (id: number) => { setZonasClicaveis(prev => prev.filter(z => z.id !== id)); if (respostaCorretaPontoCerto === id) setRespostaCorretaPontoCerto(null); };
    const handleNovaZonaChange = (field: keyof Partial<ZonaClicavel>, value: string) => { setNovaZona(prev => ({ ...prev, [field]: value })); };
    const handleSetRespostaPontoCerto = (id: number) => setRespostaCorretaPontoCerto(id);
    const handleAddFragmento = () => { if (novoFragmento.trim()) { const newId = fragmentos.length > 0 ? Math.max(...fragmentos.map(f => f.id)) + 1 : 1; setFragmentos(prev => [...prev, { id: newId, texto: novoFragmento }]); setNovoFragmento(""); }};
    const handleRemoveFragmento = (id: number) => setFragmentos(prev => prev.filter(f => f.id !== id));
    const handleAddCategoria = () => { if (novaCategoria.trim() !== "" && !categorias.includes(novaCategoria)) { setCategorias((old) => [...old, novaCategoria]); setNovaCategoria(""); } };
    const handleRemoveCategoria = (cat: string) => { setCategorias((old) => old.filter((c) => c !== cat)); };
    const handleAddFonte = () => { if (novaFonte.trim() !== "" && !fontes.includes(novaFonte)) { setFontes((old) => [...old, novaFonte]); setNovaFonte(""); } };
    const handleRemoveFonte = (f: string) => { setFontes((old) => old.filter((fon) => fon !== f)); };

    const inserirTemplatePopup = (tipoPopup: 'imagem' | 'video') => {
        const idUnico = `popup-${Date.now()}`;
        const templateCSS = `\n<style>\n.popup-overlay-${idUnico} { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.75); display: none; justify-content: center; align-items: center; z-index: 1000; padding: 20px; box-sizing: border-box; }\n.popup-overlay-${idUnico}:target { display: flex; }\n.popup-content-${idUnico} { position: relative; background-color: #fff; padding: 20px; border-radius: 8px; max-width: 90%; max-height: 90%; overflow: auto; }\n.popup-content-${idUnico} img, .popup-content-${idUnico} video { display: block; max-width: 100%; max-height: 80vh; height: auto; margin: 0 auto 15px auto; }\n.popup-close-${idUnico} { position: absolute; top: 10px; right: 15px; font-size: 24px; font-weight: bold; color: #555; text-decoration: none; line-height: 1; }\n.popup-close-${idUnico}:hover { color: #000; }\n.thumb-link-${idUnico} { display: inline-block; cursor: zoom-in; border: 1px solid #ccc; padding: 3px; border-radius: 4px; background: white; }\n.thumb-link-${idUnico} img, .thumb-link-${idUnico} span { max-width: 180px; height: auto; display: block; }\n.thumb-link-${idUnico} span{padding:10px; color:blue; text-decoration:underline}\n</style>\n`;
        let templateElemento: string;
        if (tipoPopup === 'imagem') {
            templateElemento = `<!-- Link/Thumb da Imagem -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\">\n  <img src=\"/images/placeholder_thumb.png\" alt=\"Clique para ampliar\"/>\n</a>\n\n<!-- Popup da Imagem -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\">\n  <div class=\"popup-content-${idUnico}\">\n    <a href=\"#\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>\n    <img src=\"/images/placeholder_grande.png\" alt=\"Imagem Ampliada\"/>\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">Descrição da Imagem</p>\n  </div>\n</div>\n`;
        } else {
            templateElemento = `<!-- Link/Thumb do Vídeo -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\">\n  <span>🎬 Clique para ver o vídeo</span>\n</a>\n\n<!-- Popup do Vídeo -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\">\n  <div class=\"popup-content-${idUnico}\">\n    <a href=\"#\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>\n    <video controls width=\"100%\" style=\"max-width: 700px; max-height: 70vh;\">\n      <source src=\"/videos/placeholder_video.mp4\" type=\"video/mp4\">\n      Seu navegador não suporta vídeo.\n    </video>\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">Descrição do Vídeo</p>\n  </div>\n</div>\n`;
        }
        const htmlParaInserir = templateCSS + templateElemento;
        const textarea = perguntaTextareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart; const end = textarea.selectionEnd;
            const textoAtual = textarea.value;
            const novoTexto = textoAtual.substring(0, start) + htmlParaInserir + textoAtual.substring(end);
            setPergunta(novoTexto);
        } else { setPergunta(prev => prev + htmlParaInserir); }
    };

    const resetCarta = () => {
        setTipo("Pergunta"); setTitulo(""); setPergunta(""); setOpcoes([]); setNovaOpcao("");
        setRespostaCorreta([]); setDificuldade("facil");
        setVantagem(""); setDesvantagem(""); setDica("");
        setTempoLimite(30); setColunaAItems([]); setNovaColunaA(""); setColunaBItems([]); setNovaColunaB(""); setParesCorretosInput("");
        setImagemURLPontoCerto(""); setZonasClicaveis([]); setNovaZona({x:0, y:0, largura: 0.1, altura: 0.1}); setRespostaCorretaPontoCerto(null);
        setFraseIncompleta(""); setFragmentos([]); setNovoFragmento(""); setOrdemFragmentos("");
        if (!categoriasBloqueadas) setCategorias([]);
        if (!fontesBloqueadas) setFontes([]);
        setEditIndex(null); setShowPreview(false);
    };

    const handleAddOrUpdateCard = () => {
        if (!titulo.trim() || !tipo) { alert("Título e Tipo são obrigatórios."); return; }
        let finalRespostaCorreta: number | number[] | { aId: number; bId: number }[] = [];
        let cartaEspecificaProps: Partial<Carta> = {};
        let camposNecessarios: Partial<Carta> & { opcoes?: Opcao[] } = { opcoes: [] }; // Tipo ajustado

        try {
            switch (tipo) {
                case "Pergunta": case "ContraTempo":
                    if (respostaCorreta.length !== 1) throw new Error(`Tipo ${tipo} exige uma resposta correta.`);
                    finalRespostaCorreta = respostaCorreta[0];
                    camposNecessarios = { opcoes };
                    if(tipo === 'ContraTempo') cartaEspecificaProps = { tempoLimite };
                    break;
                case "MultiplaEscolha": case "Outras": case "Vantagem": case "Desvantagem":
                    finalRespostaCorreta = (tipo === "Vantagem") ? opcoes.map(o => o.id) : (tipo === "Desvantagem" ? [] : respostaCorreta);
                    camposNecessarios = { opcoes };
                    break;
                case "Ordem":
                    const posicoes = new Map<number, number>(); let maxPos = 0;
                    const ordemIds: number[] = []; let ordemValida = true;
                    opcoes.forEach(op => {
                        const pos = op.ordemTemp?.trim() ? parseInt(op.ordemTemp, 10) : NaN;
                        if (isNaN(pos) || pos <= 0 || posicoes.has(pos)) { ordemValida = false; }
                        else { posicoes.set(pos, op.id); maxPos = Math.max(maxPos, pos); }
                    });
                    if (!ordemValida || posicoes.size !== opcoes.length || maxPos !== opcoes.length) { throw new Error("Erro na ordem: posições devem ser únicas de 1 a N."); }
                    for (let i = 1; i <= maxPos; i++) { ordemIds.push(posicoes.get(i)!); }
                    finalRespostaCorreta = ordemIds;
                    camposNecessarios = { opcoes: opcoes.map(({ordemTemp, ...rest}) => rest) };
                    break;
                case "RelacionarColunas":
                    try {
                        const pares = JSON.parse(paresCorretosInput || '[]');
                        if (!Array.isArray(pares) || !pares.every(p => typeof p === 'object' && 'aId' in p && 'bId' in p && typeof p.aId === 'number' && typeof p.bId === 'number')) throw new Error();
                        finalRespostaCorreta = pares;
                    } catch { throw new Error("Formato JSON inválido para Pares Corretos."); }
                    camposNecessarios = { colunaA: colunaAItems, colunaB: colunaBItems, opcoes: [] };
                    break;
                case "PontoCerto":
                    if (!imagemURLPontoCerto) throw new Error("URL da Imagem é obrigatória.");
                    if (zonasClicaveis.length === 0) throw new Error("Adicione pelo menos uma Zona Clicável.");
                    if (respostaCorretaPontoCerto === null || !zonasClicaveis.some(z => z.id === respostaCorretaPontoCerto)) throw new Error("Selecione uma Zona Correta válida.");
                    finalRespostaCorreta = respostaCorretaPontoCerto;
                    camposNecessarios = { imagemURL: imagemURLPontoCerto, zonasClicaveis, opcoes: [] };
                    break;
                case "CompletarFrase":
                    if (!fraseIncompleta.trim()) throw new Error("Frase Incompleta é obrigatória.");
                    if (fragmentos.length === 0) throw new Error("Adicione pelo menos um Fragmento.");
                    const ordemIdsFrag = ordemFragmentos.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
                    if (ordemIdsFrag.length === 0 || !ordemIdsFrag.every(id => fragmentos.some(f => f.id === id))) throw new Error("Ordem dos Fragmentos inválida ou IDs não encontrados.");
                    finalRespostaCorreta = ordemIdsFrag;
                    camposNecessarios = { fraseIncompleta, fragmentos, opcoes: [] };
                    break;
                default: const check: never = tipo; throw new Error(`Tipo de carta desconhecido: ${check}`);
            }
        } catch (error: any) { alert(`Erro ao preparar carta: ${error.message}`); return; }

        const novaCarta: Carta = {
            id: editIndex !== null ? cards[editIndex].id : `new_${Date.now()}_${Math.random().toString(16).slice(2)}`,
            tipo, titulo, pergunta, dificuldade, categorias, fontes,
            vantagem, desvantagem, dica,
            respostaCorreta: finalRespostaCorreta,
            ...camposNecessarios,
            ...cartaEspecificaProps,
        } as Carta;

        if (editIndex !== null) {
            setCards((oldCards) => oldCards.map((c, i) => i === editIndex ? { ...novaCarta, origBaralhoId: c.origBaralhoId, edited: true } : c ));
        } else {
            setCards((oldCards) => [...oldCards, { ...novaCarta, edited: true }]);
        }
        resetCarta();
    };

    const loadCardForEdit = (index: number) => {
        setShowPreview(false); resetCarta();
        const carta = cards[index];
        setEditIndex(index); setTipo(carta.tipo as TipoCarta); setTitulo(carta.titulo); setPergunta(carta.pergunta);
        setDificuldade(carta.dificuldade as Dificuldade); setCategorias([...carta.categorias]); setFontes([...carta.fontes]);
        setVantagem(carta.vantagem); setDesvantagem(carta.desvantagem); setDica(carta.dica);

        switch (carta.tipo) {
            case "Pergunta": case "MultiplaEscolha": case "Vantagem": case "Desvantagem": case "Outras": case "ContraTempo":
                setOpcoes((carta as any).opcoes ? [...(carta as any).opcoes] : []);
                const rcArray = Array.isArray(carta.respostaCorreta) ? carta.respostaCorreta : (typeof carta.respostaCorreta === 'number' ? [carta.respostaCorreta] : []);
                setRespostaCorreta(rcArray.filter(id => typeof id === 'number'));
                if(carta.tipo === 'ContraTempo') setTempoLimite((carta as CartaContraTempo).tempoLimite || 30);
                break;
            case "Ordem":
                 setOpcoes((carta as CartaOrdem).opcoes?.map(op => ({...op})) || []); // Verifica se opcoes existe
                 if (Array.isArray(carta.respostaCorreta) && carta.opcoes) { // Verifica se opcoes existe
                     const ordemCorreta = carta.respostaCorreta as number[];
                     setOpcoes(currentOpts => currentOpts.map(op => ({...op, ordemTemp: ordemCorreta.indexOf(op.id) >= 0 ? String(ordemCorreta.indexOf(op.id) + 1) : "" })));
                 }
                 setRespostaCorreta([]);
                 break;
            case "RelacionarColunas":
                const cRel = carta as CartaRelacionarColunas; setColunaAItems(cRel.colunaA ? [...cRel.colunaA] : []); setColunaBItems(cRel.colunaB ? [...cRel.colunaB] : []); setParesCorretosInput(Array.isArray(cRel.respostaCorreta) ? JSON.stringify(cRel.respostaCorreta, null, 2) : "[]"); break;
            case "PontoCerto":
                const cPonto = carta as CartaPontoCerto; setImagemURLPontoCerto(cPonto.imagemURL || ""); setZonasClicaveis(cPonto.zonasClicaveis ? [...cPonto.zonasClicaveis] : []); setRespostaCorretaPontoCerto(typeof cPonto.respostaCorreta === 'number' ? cPonto.respostaCorreta : null); break;
            case "CompletarFrase":
                const cFrase = carta as CartaCompletarFrase; setFraseIncompleta(cFrase.fraseIncompleta || ""); setFragmentos(cFrase.fragmentos ? [...cFrase.fragmentos] : []); setOrdemFragmentos(Array.isArray(cFrase.respostaCorreta) ? cFrase.respostaCorreta.join(', ') : ""); break;
        }
    };
    const deleteCard = (index: number) => { if(window.confirm(`Excluir "${cards[index]?.titulo || `Carta ${index+1}`}"?`)){ setCards((old) => old.filter((_, i) => i !== index)); if (editIndex === index) { resetCarta(); } }};
    const cancelEdit = () => { resetCarta(); };

    const prepareForDownload = (): Partial<Carta>[] => {
        return cards.map(({ origBaralhoId, edited, ...rest }: Carta & { origBaralhoId?: number, edited?: boolean }) => {
            const cardData: Partial<Carta> = { ...rest };
            if (rest.tipo !== "ContraTempo") delete (cardData as Partial<CartaContraTempo>).tempoLimite;
            if (rest.tipo !== "RelacionarColunas") { delete (cardData as Partial<CartaRelacionarColunas>).colunaA; delete (cardData as Partial<CartaRelacionarColunas>).colunaB; }
            if (rest.tipo !== "PontoCerto") { delete (cardData as Partial<CartaPontoCerto>).imagemURL; delete (cardData as Partial<CartaPontoCerto>).zonasClicaveis; }
            if (rest.tipo !== "CompletarFrase") { delete (cardData as Partial<CartaCompletarFrase>).fraseIncompleta; delete (cardData as Partial<CartaCompletarFrase>).fragmentos; }

            // CORREÇÃO: Usar 'delete' apenas se 'opcoes' for opcional na base
            if (!["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(rest.tipo)) {
                 delete cardData.opcoes; // Agora é seguro pois 'opcoes' é opcional em CartaBase
            } else if (rest.tipo === "Ordem" && cardData.opcoes) {
                 // Remove ordemTemp das opções para Ordem
                 cardData.opcoes = cardData.opcoes.map(({ ordemTemp, ...o }) => o);
            }

            // Garante que 'opcoes' seja array vazio para tipos que não o usam explicitamente, se existir
             if ((rest.tipo === "RelacionarColunas" || rest.tipo === "PontoCerto" || rest.tipo === "CompletarFrase") && cardData.opcoes !== undefined) {
                 cardData.opcoes = [];
             }

            return cardData;
        });
    };
    const generateCode = (format: 'js' | 'json') => { const deckFinal = prepareForDownload(); if (format === 'json') { return JSON.stringify(deckFinal, null, 2); } else { const deck = JSON.stringify(deckFinal, null, 2); return `const ${deckName || 'meu_baralho'} = ${deck};\n\nexport default ${deckName || 'meu_baralho'};`; } };
    const downloadCode = (format: 'js' | 'json') => { const element = document.createElement("a"); const fileContent = generateCode(format); const fileType = format === 'js' ? 'text/javascript' : 'application/json'; const fileName = `${deckName || 'meu_baralho'}.${format}`; const file = new Blob([fileContent], { type: fileType }); element.href = URL.createObjectURL(file); element.download = fileName; document.body.appendChild(element); element.click(); document.body.removeChild(element); };

    // --- JSX do Criador ---
    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Criador de Cartas Eco Challenge</h1>

            {/* Seção Superior */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader><CardTitle className="text-xl">Nome do Baralho & Download</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome (para arquivo .js)</label>
                            <Input type="text" value={deckName} onChange={(e) => setDeckName(e.target.value.replace(/[^a-zA-Z0-9_]/g, '_'))} placeholder="meu_baralho"/>
                        </div>
                        <div className="flex space-x-4">
                            <Button onClick={() => downloadCode('js')} className="bg-blue-600 hover:bg-blue-700 text-white flex-1">Baixar .js</Button>
                            <Button onClick={() => downloadCode('json')} className="bg-purple-600 hover:bg-purple-700 text-white flex-1">Baixar .json</Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-xl">Carregar/Gerenciar Baralhos</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                        <Input type="file" accept=".js,.json" onChange={handleFileUpload} multiple />
                        {isLoading && <p className="text-sm text-blue-600">Carregando...</p>}
                        {errorMessage && <Alert variant="destructive"><AlertDescription>{errorMessage}</AlertDescription></Alert>}
                        {baralhosCarregados.length > 0 && (
                             <>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="manterEditadas" checked={manterCartasEditadas} onCheckedChange={(checked) => setManterCartasEditadas(Boolean(checked))} />
                                    <label htmlFor="manterEditadas" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Manter editadas ao remover</label>
                                </div>
                                <ScrollArea className="h-40 border rounded-md p-2">
                                    <ul className="space-y-1">
                                        {baralhosCarregados.map((b) => (
                                            <li key={b.id} className="flex items-center justify-between p-1 even:bg-gray-50">
                                                <div><span className="font-medium text-sm">{b.nome}</span><span className="text-xs text-gray-500 ml-2">({b.cartas.length})</span></div>
                                                {!b.adicionado ? (<Button onClick={() => adicionarBaralho(b.id)} size="sm" variant="outline" className="h-7 px-2 text-xs">Add</Button>) : (<Button onClick={() => removerBaralho(b.id)} size="sm" variant="destructive" className="h-7 px-2 text-xs">Remover</Button>)}
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                             </>
                        )}
                    </CardContent>
                </Card>
            </div>

             {/* Seção Principal */}
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Coluna Esquerda: Formulário */}
                <Card className="lg:sticky lg:top-4 self-start max-h-[90vh] overflow-y-auto">
                    <CardHeader>
                         <CardTitle className="text-2xl">{editIndex !== null ? `Editando: ${cards[editIndex]?.titulo || `Carta ${editIndex + 1}`}` : "Criar Nova Carta"}</CardTitle>
                         <AlertDescription>Preencha os campos para {editIndex !== null ? 'atualizar' : 'criar'} uma carta.</AlertDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 pb-6">
                         {/* Campos Comuns */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo*</label>
                                <Select value={tipo} onValueChange={(value) => setTipo(value as TipoCarta)}>
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                    <SelectContent>
                                        {CARD_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium mb-1">Título*</label>
                                <Input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Pergunta/Descrição* (HTML)</label>
                             <Textarea ref={perguntaTextareaRef} value={pergunta} onChange={(e) => setPergunta(e.target.value)} className="h-36 font-mono text-sm" placeholder="Escreva aqui..."/>
                             <div className="flex gap-2 mt-1">
                                <Button type="button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('imagem')}>+ Popup Imagem</Button>
                                <Button type="button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('video')}>+ Popup Vídeo</Button>
                             </div>
                        </div>

                        {/* --- Campos Condicionais --- */}
                         {["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo) && (
                            <Card className="bg-gray-50 border">
                                <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Opções</CardTitle></CardHeader>
                                <CardContent className="space-y-3 pt-0">
                                    <div className="flex space-x-2">
                                        <Input type="text" value={novaOpcao} onChange={(e) => setNovaOpcao(e.target.value)} placeholder="Texto da nova opção" className="flex-1"/>
                                        <Button type="button" onClick={handleAddOpcao}>Adicionar</Button>
                                    </div>
                                    <ScrollArea className="max-h-48 pr-2 border rounded bg-white">
                                        <ul className="space-y-2 p-2">
                                            {opcoes.map((o) => (
                                                <li key={o.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 border-b pb-2 last:border-b-0">
                                                    <span className="flex-1 text-sm py-1">{o.id}: {o.texto}</span>
                                                    {tipo === "Ordem" && (
                                                        <div className="flex items-center space-x-1 my-1">
                                                            <label htmlFor={`order-${o.id}`} className="text-xs shrink-0">Pos:</label>
                                                            <Input id={`order-${o.id}`} type="number" min="1" step="1" onChange={(e) => handleSetOrder(o.id, e.target.value)} value={o.ordemTemp ?? ""} className="border p-1 w-16 rounded text-sm h-8 shrink-0"/>
                                                        </div>
                                                    )}
                                                    {(tipo === "Pergunta" || tipo === "MultiplaEscolha" || tipo === "Outras" || tipo === "ContraTempo") && tipo !== "Vantagem" && tipo !== "Desvantagem" && (
                                                        <Button type="button" onClick={() => handleToggleRespostaCorreta(o.id)} variant={respostaCorreta.includes(o.id) ? "default" : "outline"} size="sm" className={cn("h-8 shrink-0", respostaCorreta.includes(o.id) && "bg-green-600 hover:bg-green-700")}>
                                                            {respostaCorreta.includes(o.id) ? "Correta" : "Marcar"}
                                                        </Button>
                                                    )}
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
                            <Card className="bg-yellow-50 border border-yellow-200">
                                <CardContent className="pt-4">
                                    <label className="block text-sm font-medium mb-1">Tempo Limite (segundos)</label>
                                    <Input type="number" value={tempoLimite} onChange={(e) => setTempoLimite(Math.max(5, parseInt(e.target.value, 10) || 5))} min="5" className="w-24"/>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "RelacionarColunas" && (
                            <Card className="bg-blue-50 border border-blue-200">
                                <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Relacionar Colunas</CardTitle></CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <div> {/* Coluna A */}
                                        <h4 className="text-md font-semibold mb-2">Coluna A</h4>
                                        <div className="flex space-x-2 mb-2">
                                            <Input type="text" value={novaColunaA} onChange={e => setNovaColunaA(e.target.value)} placeholder="Texto item A" className="flex-1"/>
                                            <Button type="button" onClick={handleAddColunaA} size="sm">Add A</Button>
                                        </div>
                                        <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{colunaAItems.map(item => <li key={item.id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" size="xs" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveColunaA(item.id)}>X</Button></li>)}</ul></ScrollArea>
                                    </div>
                                    <div> {/* Coluna B */}
                                        <h4 className="text-md font-semibold mb-2">Coluna B</h4>
                                        <div className="flex space-x-2 mb-2">
                                            <Input type="text" value={novaColunaB} onChange={e => setNovaColunaB(e.target.value)} placeholder="Texto item B" className="flex-1"/>
                                            <Button type="button" onClick={handleAddColunaB} size="sm">Add B</Button>
                                        </div>
                                        <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{colunaBItems.map(item => <li key={item.id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" size="xs" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveColunaB(item.id)}>X</Button></li>)}</ul></ScrollArea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Pares Corretos (JSON)</label>
                                        <Textarea value={paresCorretosInput} onChange={e => setParesCorretosInput(e.target.value)} className="h-20 font-mono text-xs" placeholder='[{"aId": 1, "bId": 101}, {"aId": 2, "bId": 102}]'/>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "PontoCerto" && (
                             <Card className="bg-indigo-50 border border-indigo-200">
                                <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Ponto Certo</CardTitle></CardHeader>
                                <CardContent className="space-y-4 pt-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">URL da Imagem Principal*</label>
                                        <Input type="text" value={imagemURLPontoCerto} onChange={e => setImagemURLPontoCerto(e.target.value)} placeholder="/images/mapa.png" />
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold mb-2">Adicionar Zona Clicável</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 border p-2 rounded items-end bg-white">
                                            <Input type="number" placeholder="X (0-1)" value={novaZona.x ?? ""} onChange={e => handleNovaZonaChange('x', e.target.value)} className="text-sm h-9" step="0.01" min="0" max="1"/>
                                            <Input type="number" placeholder="Y (0-1)" value={novaZona.y ?? ""} onChange={e => handleNovaZonaChange('y', e.target.value)} className="text-sm h-9" step="0.01" min="0" max="1"/>
                                            <Input type="number" placeholder="Largura (0-1)" value={novaZona.largura ?? ""} onChange={e => handleNovaZonaChange('largura', e.target.value)} className="text-sm h-9" step="0.01" min="0.01" max="1"/>
                                            <Input type="number" placeholder="Altura (0-1)" value={novaZona.altura ?? ""} onChange={e => handleNovaZonaChange('altura', e.target.value)} className="text-sm h-9" step="0.01" min="0.01" max="1"/>
                                            <Input type="text" placeholder="Descrição (Opc)" value={novaZona.descricao ?? ""} onChange={e => handleNovaZonaChange('descricao', e.target.value)} className="text-sm h-9 col-span-2 sm:col-span-3"/>
                                            <Button type="button" onClick={handleAddZona} size="sm" className="h-9">Add Zona</Button>
                                        </div>
                                         <h4 className="text-md font-semibold mb-1 mt-3">Zonas (Selecione a correta)</h4>
                                         <ScrollArea className="h-32 border rounded p-1 bg-white">
                                             <ul className="text-sm space-y-1">
                                                {zonasClicaveis.map(z => (
                                                    <li key={z.id} className="flex justify-between items-center odd:bg-gray-50 even:bg-white px-1 py-0.5">
                                                        <span>ID:{z.id} ({z.x},{z.y} {z.largura}x{z.altura}) {z.descricao}</span>
                                                        <div className="flex items-center gap-1">
                                                            <Button type="button" variant={respostaCorretaPontoCerto === z.id ? "default" : "outline"} size="xs" className={cn("h-6 px-1.5", respostaCorretaPontoCerto === z.id && "bg-green-600")} onClick={() => handleSetRespostaPontoCerto(z.id)}>Correta</Button>
                                                            <Button type="button" variant="ghost" size="xs" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveZona(z.id)}>X</Button>
                                                        </div>
                                                    </li>
                                                ))}
                                                 {zonasClicaveis.length === 0 && <p className="text-xs text-center text-gray-500 py-2">Nenhuma zona.</p>}
                                             </ul>
                                         </ScrollArea>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "CompletarFrase" && (
                            <Card className="bg-pink-50 border border-pink-200">
                                 <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Completar Frase</CardTitle></CardHeader>
                                 <CardContent className="space-y-4 pt-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Frase Incompleta* (use __1__, __2__)</label>
                                        <Textarea value={fraseIncompleta} onChange={e => setFraseIncompleta(e.target.value)} className="h-20 font-mono text-sm" placeholder="O __1__ é essencial para a __2__."/>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold mb-2">Fragmentos</h4>
                                        <div className="flex space-x-2 mb-2">
                                            <Input type="text" value={novoFragmento} onChange={e => setNovoFragmento(e.target.value)} placeholder="Texto do fragmento" className="flex-1"/>
                                            <Button type="button" onClick={handleAddFragmento}>Add Frag.</Button>
                                        </div>
                                         <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{fragmentos.map(f => <li key={f.id} className="flex justify-between items-center"><span>{f.id}: {f.texto}</span><Button type="button" variant="ghost" size="xs" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveFragmento(f.id)}>X</Button></li>)}</ul></ScrollArea>
                                    </div>
                                    <div>
                                         <label className="block text-sm font-medium mb-1">Ordem Correta* (IDs por vírgula)</label>
                                         <Input type="text" value={ordemFragmentos} onChange={e => setOrdemFragmentos(e.target.value)} placeholder="1, 3, 2" />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Dificuldade */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Dificuldade</label>
                            <Select value={dificuldade} onValueChange={(value) => setDificuldade(value as Dificuldade)}>
                                <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                    {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Categorias e Fontes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="bg-gray-50 border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                                    <CardTitle className="text-base font-semibold">Categorias</CardTitle>
                                    <div className="flex items-center space-x-1">
                                        <Checkbox id="lockCat" checked={categoriasBloqueadas} onCheckedChange={checked => setCategoriasBloqueadas(Boolean(checked))} />
                                        <label htmlFor="lockCat" className="text-xs">Travar</label>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2 pt-2">
                                    <div className="flex space-x-2">
                                        <Input type="text" value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} placeholder="Nova categoria" className="flex-1 h-9"/>
                                        <Button type="button" onClick={handleAddCategoria} size="sm" className="h-9">Add</Button>
                                    </div>
                                    <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="space-y-1 text-sm">{categorias.map((c, i) => <li key={i} className="flex justify-between items-center"><span>{c}</span><Button type="button" variant="ghost" size="xs" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveCategoria(c)}>X</Button></li>)}</ul></ScrollArea>
                                </CardContent>
                            </Card>
                             <Card className="bg-gray-50 border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                                     <CardTitle className="text-base font-semibold">Fontes</CardTitle>
                                      <div className="flex items-center space-x-1">
                                          <Checkbox id="lockFont" checked={fontesBloqueadas} onCheckedChange={checked => setFontesBloqueadas(Boolean(checked))} />
                                          <label htmlFor="lockFont" className="text-xs">Travar</label>
                                      </div>
                                </CardHeader>
                                <CardContent className="space-y-2 pt-2">
                                    <div className="flex space-x-2">
                                        <Input type="text" value={novaFonte} onChange={(e) => setNovaFonte(e.target.value)} placeholder="Nova fonte" className="flex-1 h-9"/>
                                        <Button type="button" onClick={handleAddFonte} size="sm" className="h-9">Add</Button>
                                    </div>
                                    <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="space-y-1 text-sm">{fontes.map((f, i) => <li key={i} className="flex justify-between items-center"><span>{f}</span><Button type="button" variant="ghost" size="xs" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveFonte(f)}>X</Button></li>)}</ul></ScrollArea>
                                </CardContent>
                             </Card>
                        </div>

                        {/* Vantagem, Desvantagem, Dica */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                             <div><label className="block text-sm font-medium mb-1">Vantagem (Msg Acerto)</label><Input type="text" value={vantagem} onChange={(e) => setVantagem(e.target.value)} /></div>
                            <div><label className="block text-sm font-medium mb-1">Desvantagem (Msg Erro)</label><Input type="text" value={desvantagem} onChange={(e) => setDesvantagem(e.target.value)} /></div>
                            <div><label className="block text-sm font-medium mb-1">Dica</label><Input type="text" value={dica} onChange={(e) => setDica(e.target.value)} /></div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 pt-4 border-t">
                            <Button type="button" onClick={handleAddOrUpdateCard} className="bg-green-600 hover:bg-green-700 text-white">
                                {editIndex !== null ? "Salvar Edições" : "Adicionar Carta ao Baralho"}
                            </Button>
                            {editIndex !== null && (<Button type="button" onClick={cancelEdit} variant="outline">Cancelar Edição</Button>)}
                            <Button type="button" onClick={() => setShowPreview(!showPreview)} variant="outline">
                                {showPreview ? "Esconder Preview" : "Mostrar Preview Estático"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                 {/* Coluna Direita: Lista de Cartas e Preview */}
                 <div className="space-y-4">
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Baralho Sendo Criado ({cards.length} Cartas)</CardTitle>
                            <AlertDescription>Clique em uma carta abaixo para editá-la.</AlertDescription>
                        </CardHeader>
                        <CardContent>
                             {cards.length === 0 ? (<p className="text-gray-500 italic">Nenhuma carta.</p>) : (
                                <ScrollArea className="h-[60vh] pr-3">
                                    <div className="space-y-2">
                                        {cards.map((c, index) => (
                                            <Card key={`card-display-${c.id || index}`} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => loadCardForEdit(index)}>
                                                <CardContent className="p-3 flex items-start justify-between gap-2">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-xs font-semibold text-blue-700">{c.tipo} - {c.dificuldade}</p>
                                                        <p className="font-medium truncate" title={c.titulo}>{c.titulo || `Carta ${index + 1}`}</p>
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

                     {/* Preview Estático */}
                     {showPreview && (
                        <Card className="mt-4 lg:sticky lg:top-4 self-start">
                            <CardHeader><CardTitle className="text-lg text-center">Preview Estático</CardTitle></CardHeader>
                            <CardContent>
                                 <CardStaticView card={
                                     editIndex !== null
                                     ? cards[editIndex]
                                     : { // Monta preview da carta sendo criada
                                         tipo, titulo, pergunta, opcoes,
                                         respostaCorreta: (() => {
                                             if (tipo === 'Pergunta' || tipo === 'ContraTempo') return respostaCorreta[0];
                                             if (tipo === 'PontoCerto') return respostaCorretaPontoCerto ?? undefined;
                                             if (tipo === 'RelacionarColunas') try { return JSON.parse(paresCorretosInput || '[]'); } catch { return []; }
                                             if (tipo === 'CompletarFrase') return ordemFragmentos.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
                                             if (tipo === 'Ordem') {
                                                const sorted = [...opcoes].sort((a, b) => (parseInt(a.ordemTemp || '999', 10) - parseInt(b.ordemTemp || '999', 10)));
                                                return sorted.map(o => o.id);
                                             }
                                             if (tipo === 'Vantagem') return opcoes.map(o => o.id);
                                             if (tipo === 'Desvantagem') return [];
                                             return respostaCorreta;
                                         })(),
                                         dificuldade, categorias, fontes, vantagem, desvantagem, dica, tempoLimite,
                                         colunaA: colunaAItems, colunaB: colunaBItems, imagemURL: imagemURLPontoCerto, zonasClicaveis,
                                         fraseIncompleta, fragmentos
                                     }
                                 }/>
                             </CardContent>
                         </Card>
                     )}
                 </div>
             </div>
        </div>
    );
};

export default CriadorDeCarta;