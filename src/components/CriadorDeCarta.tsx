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
import { Trash, Youtube, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Tipos de Dados ---
interface Opcao { id: number; texto: string; ordemTemp?: string; }
interface ItemRelacionar { id: number; texto: string; }
interface ZonaClicavel { id: number; x: number; y: number; largura: number; altura: number; descricao?: string; }
interface FragmentoCompletar { id: number; texto: string; }

interface CartaBase {
    id: string | number; tipo: string; titulo: string; pergunta: string;
    dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[];
    vantagem: string; desvantagem: string;``` dica: string;
    opcoes?: Opcao[];
}
interface CartaComOpcoes extends CartaBase { opcoestypescript
// src/components/CriadorDeCarta.tsx

import React, { useState, useRef, useEffect }: Opcao[]; }
interface CartaPergunta extends CartaComOpcoes { tipo: "Pergunta"; respostaCorreta: number; }
 from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/inputinterface CartaMultiplaEscolha extends CartaComOpcoes { tipo: "MultiplaEscolha"; respostaCorreta: number[]; }
interface CartaOrdem extends CartaComOpcoes { tipo: "Ordem"; respostaCorreta: number[]; }
interface";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ CartaVantagem extends CartaComOpcoes { tipo: "Vantagem"; respostaCorreta: number[]; }
interface CartaDesvantagem extends CartaComOpcoes { tipo: "Desvantagem"; respostaCorreta: numberui/alert";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash, Youtube, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

// ---[]; }
interface CartaOutras extends CartaComOpcoes { tipo: "Outras"; respostaCorreta: number[]; }
interface CartaContraTempo extends CartaComOpcoes { tipo: "ContraTempo"; respostaCorreta: number; tempoLimite?: number; }
interface CartaRelacionarColunas extends CartaBase { tipo: "RelacionarColunas"; colunaA: ItemRelacionar[]; colunaB: ItemRelacionar[]; respostaCorreta: { aId: number; bId: number }[]; }
interface CartaPontoCerto extends CartaBase { tipo: "PontoCerto Tipos de Dados ---
interface Opcao { id: number; texto: string; ordemTemp?: string; }
interface ItemRelacionar { id: number; texto: string; }
interface ZonaClicavel { id: number; x: number; y: number; largura: number; altura: number; descricao?: string; }
interface Fragment"; imagemURL?: string; zonasClicaveis?: ZonaClicavel[]; respostaCorreta?: number; }
interface CartaCompletarFrase extends CartaBase { tipo: "CompletarFrase"; fraseIncompleta?: string; fragmentos?: FragmentoCompletar[]; respostaCorreta?: number[]; }

type Carta =
    | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras
    | CartaContraTempo | CartaReloCompletar { id: number; texto: string; }

interface CartaBase {
    id: string | number; tipo: string; titulo: string; pergunta: string;
    dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[];
    vantagem: string; desvantagem: string; dica: string;
    opcoes?: Opcao[];
}
interface CartaComOpcoes extends CartaBase { opcoes: Opcao[]; }
interface CartaPergunta extends CartaComOpcoes { tipo: "Pergunta";acionarColunas | CartaPontoCerto | CartaCompletarFrase;

type CartaInterna = Carta & { origBaralhoId?: number; edited?: boolean; };

const CARD_TYPES = [
    "Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras",
    "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"
] as const; respostaCorreta: number; }
interface CartaMultiplaEscolha extends CartaComOpcoes { tipo: "MultiplaEscolha"; respostaCorreta: number[]; }
interface CartaOrdem extends CartaComOpcoes { tipo: "Ordem"; respostaCorreta: number[]; }
interface CartaVantagem extends CartaComOpcoes { tipo: "Vantagem"; respostaCorreta: number[]; }
interface CartaDesvantagem extends CartaComOpcoes { tipo: "Des
type TipoCarta = typeof CARD_TYPES[number];

const DIFFICULTIES = ["facil", "normal", "dificil"] as const;
type Dificuldade = typeof DIFFICULTIES[number];

interface BaralhoCarregado { id: number; nome: string; cartas: Carta[]; adicionado: boolean; }

// --- Componente de Preview Estático ---
const CardStaticView: React.FC<{ card: Partial<Carta> }> = ({ card }) => {
vantagem"; respostaCorreta: number[]; }
interface CartaOutras extends CartaComOpcoes { tipo: "Outras"; respostaCorreta: number[]; }
interface CartaContraTempo extends CartaComOpcoes { tipo: "ContraTempo"; respostaCorreta: number; tempoLimite?: number; }
interface CartaRelacionarColunas extends CartaBase { tipo: "RelacionarCol    const {
        tipo = "Pergunta", titulo = "", pergunta = "", opcoes = [], respostaCorreta,
        dificuldade = "facil", categorias = [], fontes = [], vantagem = "", desvantagem = "", dica = ""
    } = card;

    let renderedSpecifics: React.ReactNode = null;
    let renderedOptions: React.ReactNode =unas"; colunaA: ItemRelacionar[]; colunaB: ItemRelacionar[]; respostaCorreta: { aId: number; bId: number }[]; }
interface CartaPontoCerto extends CartaBase { tipo: "PontoCerto"; imagemURL?: string; zonasClicaveis?: ZonaClicavel[]; respostaCorreta?: number; }
interface CartaCompletarFrase extends CartaBase { tipo: "CompletarFrase"; fraseIncompleta?: string; fragment null;

    switch (tipo) {
        case "ContraTempo":
            const cardContraTempo = card as Partial<CartaContraTempo>;
            renderedSpecifics = <p className="text-xs text-orange-600">Tempo Limite: {cardContraTempo.tempoLimite || '?'}s</p>;
            break;
        case "RelacionarColunas":
            const cardRelCol = card as Partial<CartaRelacionarColunas>;
            renderedSpecificos?: FragmentoCompletar[]; respostaCorreta?: number[]; }

type Carta =
    | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras
    | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;

type CartaInterna = Carta & { origBaralhoId?: number; edited?: boolean; };

const CARD_TYPESs = (
                <div className="flex gap-4 text-xs mt-2">
                    <div className="flex-1"><strong>Coluna A:</strong><ul>{cardRelCol.colunaA?.map(i => <li key={`a-${i.id}`}>{i.id}: {i.texto}</li>)}</ul></div>
                    <div className="flex-1"><strong>Coluna B:</strong><ul>{cardRelCol.colunaB?.map(i => <li key={` = [
    "Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras",
    "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"
] as const;
type TipoCarta = typeof CARD_TYPES[number];

const DIFFICULTIES = ["facil", "normal", "dificb-${i.id}`}>{i.id}: {i.texto}</li>)}</ul></div>
                </div>
            );
             const pairs = Array.isArray(cardRelCol.respostaCorreta) ? cardRelCol.respostaCorreta.il"] as const;
type Dificuldade = typeof DIFFICULTIES[number];

interface BaralhoCarregado { id: number; nome: string; cartas: Carta[]; adicionado: boolean; }

// --- Componente de Preview Estático ---
const CardStaticView: React.FC<{ card: Partial<Carta> }> = ({ card }) => {
    const {
map(p => `${p.aId}-${p.bId}`).join(', ') : '(Inválida)';
             renderedOptions = <p className="text-xs mt-1">Pares Corretos: [{pairs}]</p>;
            break;
        case "PontoCerto":
            const cardPontoCerto = card as Partial<CartaPontoCerto>;
            renderedSpecifics = (
                <>
                    <p className="text-xs">Imagem URL: <span className        tipo = "Pergunta", titulo = "", pergunta = "", opcoes = [], respostaCorreta,
        dificuldade = "facil", categorias = [], fontes = [], vantagem = "", desvantagem = "", dica = ""
    } = card;

    let renderedSpecifics: React.ReactNode = null;
    let renderedOptions: React.ReactNode =="font-mono bg-gray-100 px-1 rounded break-all">{cardPontoCerto.imagemURL || '(Nenhuma)'}</span></p>
                    {cardPontoCerto.imagemURL && (
                         <img src={cardPontoC null;

    switch (tipo) {
        case "ContraTempo":
            const cardContraTempo = card as Partial<CartaContraTempo>;
            renderedSpecifics = <p className="text-xs text-orange-600">Tempo Limite: {cardContraTempo.tempoLimite || '?'}s</p>;
            break;
        case "Relerto.imagemURL} alt="Preview Ponto Certo" className="my-2 max-w-full h-auto max-h-40 object-contain border rounded"/>
                    )}
                    {cardPontoCerto.zonasClicaveis && cardPontoCerto.zonasClicaveis.length > 0 && (
                        <details className="text-xs mtacionarColunas":
            const cardRelCol = card as Partial<CartaRelacionarColunas>;
            renderedSpecifics = (
                <div className="flex gap-4 text-xs mt-2">
                    <div className="flex-1"><strong>Coluna A:</strong><ul>{cardRelCol.colunaA?.map(i => <li key={`a-${i.id}`}>{i-1">
                            <summary className="cursor-pointer font-medium">Zonas Clicáveis ({cardPontoCerto.zonasClicaveis.length})</summary>
                            <ul className="pl-4 list-disc">
                                {cardPontoCerto.zonasClicaveis.map(z => <li key={z.id.id}: {i.texto}</li>)}</ul></div>
                    <div className="flex-1"><strong>Coluna B:</strong><ul>{cardRelCol.colunaB?.map(i => <li key={`b-${i.id}`}>{i}>ID:{z.id} ({z.x},{z.y} - {z.largura}x{z.altura}) {z.descricao || ''}</li>)}
                            </ul>
                        </details>
                    )}
                </>
            );
            renderedOptions = <p className="text-xs mt-1">Zona Correta ID: {typeof card.id}: {i.texto}</li>)}</ul></div>
                </div>
            );
             const pairs = Array.isArray(cardRelCol.respostaCorreta) ? cardRelCol.respostaCorreta.map(p => `${p.aId}-${p.bId}`).join(', ') : '(Inválida)';
             renderedOptions = <p className="text-xsPontoCerto.respostaCorreta === 'number' ? cardPontoCerto.respostaCorreta : '(Inválido)'}</p>;
            break;
        case "CompletarFrase":
            const cardCompFrase = card as Partial<CartaCompletarFrase>;
            renderedSpecifics = <p className="text mt-1">Pares Corretos: [{pairs}]</p>;
            break;
        case "PontoCerto":
            const cardPontoCerto = card as Partial<CartaPontoCerto>;
            renderedSpecifics = (
                <>
                    <p className="text-xs">Imagem URL: <span className="font-xs mt-1 italic">Frase: &quot;{cardCompFrase.fraseIncompleta || '...'}&-mono bg-gray-100 px-1 rounded break-all">{cardPontoCerto.imagemquot;</p>;
            renderedOptions = (
                <>
                 {cardCompFrase.fragmentos && cardCompFrase.fragmentURL || '(Nenhuma)'}</span></p>
                    {cardPontoCerto.imagemURL && (
                         os.length > 0 && (
                    <details className="text-xs mt-1">
                        <summary className="cursor<img src={cardPontoCerto.imagemURL} alt="Preview Ponto Certo" className="my-2 max-w--pointer font-medium">Fragmentos ({cardCompFrase.fragmentos.length})</summary>
                        <ul className="pl-4 list-disc">
                            {cardCompFrase.fragmentos.map(f => <li key={ffull h-auto max-h-40 object-contain border rounded"/>
                    )}
                    {cardPontoCerto.zonasClicaveis && cardPontoCerto.zonasClicaveis.length > 0 && (
                        .id}>{f.id}: {f.texto}</li>)}
                        </ul>
                    </details>
                  )}
                 <p className="text-xs mt-1">Ordem Correta IDs: [{(Array.isArray(cardCompFrase.<details className="text-xs mt-1">
                            <summary className="cursor-pointer font-medium">Zonas Clicáveis ({cardPontoCerto.zonasClicaveis.length})</summary>
                            <ul className="pl-4 list-disc">
                                {cardPontoCerto.zonasClicaveisrespostaCorreta) ? cardCompFrase.respostaCorreta.join(', ') : '(Inválida)')}]</p>
                </>
            );
            break;
    }

    if (["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo)).map(z => <li key={z.id}>ID:{z.id} ({z.x},{z.y} - {z.largura}x{z.altura}) {z.descricao || ''}</li>)}
 {
        const correctSet = new Set<number>();
        const currentOptions = card.opcoes || [];
        if (                            </ul>
                        </details>
                    )}
                </>
            );
            renderedOptions = <p className="text-xs mt-1">Zona Correta ID: {typeof cardPontoCerto.respostaCorreta === 'number' ? cardtipo === "Vantagem") {
            currentOptions.forEach(o => correctSet.add(o.id));
        } else if (tipo !== "Desvantagem") {
            if (Array.isArray(PontoCerto.respostaCorreta : '(Inválido)'}</p>;
            break;
        case "CompletarFrase":
            const cardCompFrase = card as Partial<CartaCompletarFrase>;
            renderedSpecificsrespostaCorreta)) { (respostaCorreta as number[]).forEach(id => typeof id === 'number' && correctSet.add(id)); }
            else if (typeof respostaCorreta === 'number') { correctSet.add(respostaCorreta); }
        }

        renderedOptions = (
            <ul className="mt-2 pl-5 list-decimal space-y-1 = <p className="text-xs mt-1 italic">Frase: &quot;{cardCompFrase.fraseIncompleta || '...'}&quot;</p>;
            renderedOptions = (
                <>
                 {cardCompFrase.fragment">
                {currentOptions.map((op) => {
                    const isCorrect = correctSet.has(op.id);os && cardCompFrase.fragmentos.length > 0 && (
                    <details className="text-
                    const orderIndex = (tipo === 'Ordem' && Array.isArray(respostaCorreta)) ? (xs mt-1">
                        <summary className="cursor-pointer font-medium">Fragmentos ({cardCompFrase.fragmentos.length})</summary>
                        <ul className="pl-4 list-disc">
                            {cardCompFrase.fragmentos.map(f => <li key={f.id}>{f.id}: {f.textorespostaCorreta as number[]).indexOf(op.id) : -1;
                    const orderInfo = tipo === 'Ordem' ? (orderIndex !== -1 ? ` (Pos: ${orderIndex + 1})` : ` (Não na ordem)`) : '';

                    return (
                        <li key={op.id} className={cn("mb-1 text}</li>)}
                        </ul>
                    </details>
                  )}
                 <p className="text-xs mt-1">Ordem Correta IDs: [{(Array.isArray(cardCompFrase.respostaCorreta) ? cardCompFr-sm", isCorrect && tipo !== 'Ordem' && "text-green-700 font-semibold")}>
                            {op.texto}
                            {isCorrect && tipo !== 'Vantagem' && tipo !== 'ase.respostaCorreta.join(', ') : '(Inválida)')}]</p>
                </>
            );Ordem' && <span className="text-green-600 text-xs font-normal"> (Cor
            break;
    }

    // Renderizador de opções padrão
    if (["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo))reta)</span>}
                            {tipo === 'Ordem' && <span className="text-blue-600 text-xs {
        const correctSet = new Set<number>();
        const currentOptions = card.opcoes || [];
        if (tipo === "Vantagem") {
            currentOptions.forEach(o => correctSet.add(o.id));
        } else if (tipo !== "Desvantagem") {
            if (Array.isArray( font-normal">{orderInfo}</span>}
                        </li>
                    );
                })}
                {currentOptions.length === 0 && ["Pergunta", "MultiplaEscolha", "Ordem", "Outras", "ContraTempo"].includes(tipo)respostaCorreta)) { (respostaCorreta as number[]).forEach(id => typeof id === 'number' && correctSet.add(id)); }
            else if (typeof respostaCorreta === 'number') { correctSet.add(respostaCorreta && <li className="text-xs italic text-gray-500 list-none">Nenhuma opção definida.</li>}
            </ul>
        );
    }

    return (
        <Card className="max-w-md mx-auto my-4 shadow-md">
            <CardHeader className="pb-2">
                <CardTitle className="text); }
        }

        renderedOptions = (
            <ul className="mt-2 pl-5 list-decimal space-y-1">
                {currentOptions.map((op) => {
                    const isCorrect = correct-lg font-bold">{titulo || "(Sem Título)"}</CardTitle>
                <div className="flex justifySet.has(op.id);
                    const orderIndex = (tipo === 'Ordem' && Array.isArray(resposta-between items-center text-xs text-gray-500">
                    <span>Tipo: <Badge variant="secondary" className="ml-1">{tipo}</Badge></span>
                    <span>Dificuldade: <Badge variant={dificuldade === 'Correta)) ? (respostaCorreta as number[]).indexOf(op.id) : -1;
                    const orderInfo = tipo === 'Ordem' ? (orderIndex !== -1 ? ` (Pos: ${orderIndex + 1facil' ? 'default' : dificuldade === 'normal' ? 'outline' : 'destructive'} className="ml-1 capitalize">{dificuldade}</Badge></span>
                </div>
            </CardHeader>
            <CardContent className="pt})` : ` (Não na ordem)`) : '';

                    return (
                        <li key={op.id}-2 pb-3 space-y-2">
                {renderedSpecifics}
                <ScrollArea className="h-auto max-h-60 rounded-md border p-3 mt-2 bg-white/80 min-h-[1 className={cn("mb-1 text-sm", isCorrect && tipo !== 'Ordem' && "text-green-700 font-semibold")}>
                            {op.texto}
                            {isCorrect && tipo !== 'Vantagem' && tipo !== 'Or00px]">
                     <div className="text-sm prose prose-sm max-w-none prose-p:my-1dem' && <span className="text-green-600 text-xs font-normal"> (Correta)</span>}
                            {tipo === 'Ordem' && <span className="text-blue-600 prose-img:my-2 prose-ul:my-1 prose-ol:my-1" dangerouslySetInnerHTML={{ __html: pergunta || "(Sem Pergunta/Descrição)" }} />
                </ScrollArea>
                {renderedOptions}
            </CardContent>
            {( text-xs font-normal">{orderInfo}</span>}
                        </li>
                    );
                })}
                {currentOptions.length === 0 && ["Pergunta", "MultiplaEscolha", "Ordem", "Outras",categorias.length > 0 || fontes.length > 0 || dica || vantagem || desvantagem) && (
                  "ContraTempo"].includes(tipo) && <li className="text-xs italic text-gray-500 list-none">Nenhuma opção definida.</li>}
            </ul>
        );
    }


    return (
        <<CardFooter className="flex flex-col items-start text-xs text-gray-600 border-t pt-2 pb-2 space-y-1">
                    {categorias.length > 0 && <p><strong>Categorias:</strong> {categorias.join(", ")}</p>}
                    {fontes.length > 0 && <p><strong>FontesCard className="max-w-md mx-auto my-4 shadow-md">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">{titulo || "(Sem Título)"}</Card:</strong> {fontes.join(", ")}</p>}
                    {dica && <p className="text-blue-600"><strong>Dica:</strong> {dica}</p>}
                    {vantagem && <pTitle>
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Tipo: <Badge variant="secondary" className="ml-1">{tipo}</Badge></span> className="text-green-600"><strong>Vantagem:</strong> {vantagem}</p>}
                    {desvantagem && <p className="text-red-600"><strong>Desvantagem:</strong> {
                    <span>Dificuldade: <Badge variant={dificuldade === 'facil' ? 'default' : dificuldade === 'normal' ? 'outline' : 'destructive'} className="ml-1 capitalize">{dificuldade}</Badge></span>
desvantagem}</p>}
                 </CardFooter>
            )}
        </Card>
    );
};

                </div>
            </CardHeader>
            <CardContent className="pt-2 pb-3 space-y-2">
                {renderedSpecifics}
                <ScrollArea className="h-auto max-h-60 rounded-// --- Componente Criador Principal ---
const CriadorDeCarta: React.FC = () => {
    const [deckName, setDeckName] = useState("meu_baralho");
    const [cards, setCards] = useStatemd border p-3 mt-2 bg-white/80 min-h-[100px]">
                     <CartaInterna[]>([]);
    const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
    const [titulo<div className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-img:my-2 prose-ul:my-1 prose-ol:my-1" dangerouslySetInnerHTML={{ __html: pergunta || "(, setTitulo] = useState("");
    const [pergunta, setPergunta] = useState("");
    const [opcoes, setOpcoes] = useState<Opcao[]>([]);
    const [novaOpcao, setNovaOpcao] = useState("");
    const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
Sem Pergunta/Descrição)" }} />
                </ScrollArea>
                {renderedOptions}
            </CardContent>
            {(categorias.length > 0 || fontes.length > 0 || dica || vantagem || desvantagem) && (
                     const [dificuldade, setDificuldade] = useState<Dificuldade>("facil");
    const [categorias, setCategorias] = useState<string[]>([]);
    const [novaCategoria, setNova<CardFooter className="flex flex-col items-start text-xs text-gray-600 border-t pt-2 pb-2 space-y-1">
                    {categorias.length > 0 && <p><strong>Categorias:</strong> {categorias.Categoria] = useState("");
    const [categoriasBloqueadas, setCategoriasBloqueadas] = useState(false);
    const [fontes, setFontes] = useState<string[]>([]);
    const [novaFonte, setNovaFonte] = useState("");
    const [fontesBloqueadas, setFontesBloqueadas] = useState(false);
    const [vantagem, setVantagem] = useState("");
    const [desvantagem, setDesvantagem]join(", ")}</p>}
                    {fontes.length > 0 && <p><strong>Fontes:</strong> {fontes.join(", ")}</p>}
                    {dica && <p className="text-blue-600"><strong>Dica:</strong> {dica}</p>}
                    {vantagem && <p = useState("");
    const [dica, setDica] = useState("");
    const [tempoLimite, setTempoLimite] = useState<number>(30);
    const [colunaAItems, setColunaAItems] = useState<ItemRelacionar[]>([]);
    const [novaColunaA, setNovaColunaA] = useState("");
    const [colunaBItems, setColunaBItems] = useState<ItemRelacionar[]>([]);
    const [nova className="text-green-600"><strong>Vantagem:</strong> {vantagem}</p>}
                    {desvantagem && <p className="text-red-600"><strong>Desvantagem:</strong> {desvantagem}</p>}
                 </CardFooter>
            )}
        </Card>
    );
};

ColunaB, setNovaColunaB] = useState("");
    const [paresCorretosInput, setParesCorretosInput] = useState("");
    const [imagemURLPontoCerto, setImagemURLPontoCerto] = useState("");
    const [zonasClicaveis, setZonasClicaveis] =// --- Componente Criador Principal ---
const CriadorDeCarta: React.FC = () => {
    const [deckName, setDeckName] = useState("meu_baralho");
    const [cards, setCards] = useState<CartaInterna[]>([]);
    const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
    const [titulo, setTitulo] = useState("");
    const [pergunta, setPergunta] = useState("");
    const [ useState<ZonaClicavel[]>([]);
    const [novaZona, setNovaZona] = useState<Partial<ZonaClicavel>>({x:0, y:0, largura: 0.1, altura: 0.1});
    const [respostaCorretaPontoCerto, setRespostaCorretaPontoCerto] = useState<number | null>(opcoes, setOpcoes] = useState<Opcao[]>([]);
    const [novaOpcao, setNovaOpcao] = useState("");
    const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
    const [dificuldade, setDificuldade] = useState<Dificuldade>("facil");
    const [categorias,null);
    const [fraseIncompleta, setFraseIncompleta] = useState("");
    const [fragmentos, setFragmentos] = useState<FragmentoCompletar[]>([]);
    const [novoFragmento, setNovoFragmento] = useState("");
    const [ordemFragmentos, setOrdemFragmentos] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [popupImageUrl, setPopup setCategorias] = useState<string[]>([]);
    const [novaCategoria, setNovaCategoria] = useState("");
    const [categoriasBloqueadas, setCategoriasBloqueadas] = useState(false);
    const [fontes, setFontes] = useState<string[]>([]);
    const [novaFonte, setNovaFonte] = useState("");
    const [fontesBloImageUrl] = useState(""); // Unificado para thumb e grande
    const [popupVideoUrl, setPopupVideoUrl] = useState("");
    const [popupYouTubeUrl, setPopupYouTubeUrl] = useState("");
    const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
    const [manterCartasEditadas, setManterCartasEditadas] = useState(false);
    constqueadas, setFontesBloqueadas] = useState(false);
    const [vantagem, setVantagem] = useState("");
    const [desvantagem, setDesvantagem] = useState("");
    const [dica, setDica] = useState("");
    const [tempoLimite, setTempoLimite] = useState<number>(30);
    const [colunaAItems, setColunaAItems] = useState<ItemRelacionar[]>([]);
    const [novaColunaA, setNovaColunaA] = useState("");
    const [colunaBItems, [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const perguntaTextareaRef = useRef<HTMLTextAreaElement>(null);
    const previewImageRefPontoCerto = useRef<HTMLImageElement>(null);
    const [previewImageSize, setPreviewImageSize] = useState({ width: 0, height: 0 });

    // --- Efeitos ---
    useEffect(() => {
        if (tipo === 'PontoCerto' && previewImageRefPontoCerto.current) {
            const updateSize = () => setColunaBItems] = useState<ItemRelacionar[]>([]);
    const [novaColunaB, setNovaColunaB] = useState("");
    const [paresCorretosInput, setParesCorretosInput] = useState("");
    const [imagemURLPontoCerto, setImagemURLPontoCerto] = useState("");
    const [zonasClicaveis, setZonasClicaveis] = useState<ZonaClicavel[]>([]);
    const [novaZona, setNovaZona] = useState<Partial<ZonaClicavel>>({x:0, y:0, largura: {
                if (previewImageRefPontoCerto.current) {
                    setPreviewImageSize({ width: previewImageRefPontoCerto.current.offsetWidth, height: previewImageRefPontoCerto.current.offsetHeight });
                }
            };
            const img = previewImageRefPontoCerto.current;
            img.onload = updateSize;
            if (img.complete) updateSize();
            const observer = new ResizeObserver(updateSize);
            observer 0.1, altura: 0.1});
    const [respostaCorretaPontoCerto, setRespostaCorretaPontoCerto] = useState<number | null>(null);
    const [fraseIncompleta, setFraseIncompleta] = useState("");
    const [fragmentos, setFragmentos] = useState<FragmentoCompletar[]>([]);
    const [novoFragmento, setNovoFragmento] = useState("");
    const.observe(img);
            window.addEventListener('resize', updateSize);
            return () => { window.removeEventListener('resize', updateSize); observer.disconnect(); img.onload = null;};
        }
    }, [tipo, imagemURLPontoCerto]);

    // Adiciona função global para parar mídia ao montar
    useEffect(() => {
        ( [ordemFragmentos, setOrdemFragmentos] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [popupImageUrl, setPopupImageUrl] = useState("");
    const [popupVideoUrl, setPopupVideoUrl] = useState("");
    const [popupYouTubeUrl, setPopupYouTubeUrl] = useState("");
    const [baralhosCarregados, setBaralhosCarregwindow as any).pararMediaPorId = (mediaId: string) => {
            // console.log("Tentando parar media com ID:", mediaId); // Log para depuração
            const mediaElement = document.getElementById(mediaIdados] = useState<BaralhoCarregado[]>([]);
    const [manterCartasEditadas, setManterCartasEditadas] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const perguntaTextareaRef = useRef<HTMLTextAreaElement>(null);
    const previewImageRefPontoCerto = useRef<HTMLImageElement>(null););
            if (mediaElement) {
                if (mediaElement.tagName === 'VIDEO' && typeof (mediaElement as HTMLVideoElement).pause === 'function') {
                    (mediaElement as HTMLVideoElement).pause();
                    (mediaElement as HTMLVideoElement).currentTime = 0;
                }
                else if (mediaElement.tagName === 'IFRAME' && (mediaElement as HTMLIFrameElement).src.includes('youtube.com')) {
                    const
    const [previewImageSize, setPreviewImageSize] = useState({ width: 0, height: 0 });

    // Efeito para adicionar/remover a função global para parar mídia
    useEffect(() => {
         iframe = mediaElement as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage('{"event":"command(window as any).pararMediaPorId = (mediaId: string) => {
            const mediaElement = document.getElementById(","func":"stopVideo","args":""}', '*'); // Tenta parar via API JS
                    // Fallback: recarregar srcmediaId);
            if (mediaElement) {
                if (mediaElement.tagName === 'VIDEO' && typeof (mediaElement as HTMLVideoElement).pause === 'function') {
                    (mediaElement as HTMLVideoElement).pause se a API falhar ou não estiver pronta
                    // setTimeout(() => { if(iframe.src) iframe.src = iframe();
                    (mediaElement as HTMLVideoElement).currentTime = 0;
                } else if (mediaElement.tagName === '.src; }, 100); // Pequeno delay pode ajudar
                }
            }
        };
        returnIFRAME' && (mediaElement as HTMLIFrameElement).src.includes('youtube.com')) {
                    const iframe = mediaElement as HTMLIFrameElement;
                    // Recarrega o src para parar efetivamente o player () => { delete (window as any).pararMediaPorId; };
    }, []);


    // --- Funções Ut do YouTube
                    const currentSrc = iframe.src;
                    iframe.src = currentSrc; // Ou definirilitárias Locais ---
    const parseJSDeckFileLocal = (content: string): Carta[] => {
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export como '' e depois restaurar se causar problemas
                }
            }
        };
        return () => { delete default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) { throw new Error(" (window as any).pararMediaPorId; };
    }, []);

    useEffect(() => {
        if (tipo === 'PontoCerto' && previewImageRefPontoCerto.current) {
            const updateSize = () => {
                if (previewImageRefPontoCerto.current) {
                    setPreviewImageSize({ widthArray não encontrado no arquivo JS."); }
        const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[];
        return rawArray.map((card, index) => ({ ...card, id: card.id ||: previewImageRefPontoCerto.current.offsetWidth, height: previewImageRefPontoCerto.current.offsetHeight });
                }
            };
            const img = previewImageRefPontoCerto.current;
            img.onload = updateSize;
            if (img.complete) updateSize();
            const observer `custom_${Date.now()}_${index}` })) as Carta[];
     };
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files; if (!files) return;
 = new ResizeObserver(updateSize);
            observer.observe(img);
            window.addEventListener('resize', updateSize);
            return () => { window.removeEventListener('resize', updateSize); observer.disconnect(); img.onload = null;};        setIsLoading(true); setErrorMessage(null); let loadErrors: string[] = [];
        const newBaralhos: BaralhoCarregado[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i]; const content = await file.text();
            try {
                let newCards: Carta[] = []; const nome = file.name.replace(/\.(js|json)$/, "");
                
        }
    }, [tipo, imagemURLPontoCerto]);

    const parseJSDeckFileLocal = (content: string): Carta[] => {
        const match = content.match(/export default\s+(\[[\s\Sif (baralhosCarregados.some(b => b.nome === nome)) { loadErrors.push(`Baralho "${nome}" já carregado.`); continue; }
                if (file.name.endsWith(".js")) { new]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!matchCards = parseJSDeckFileLocal(content); }
                else if (file.name.endsWith(".json")) { newCards = JSON.parse(content) as Carta[]; }
                else { loadErrors.push(`Formato ${file.name} não suportado.`); continue; }
                if (!Array.isArray(newCards) || newCards.length === 0) { loadErrors.push(`Nenhuma carta válida em "${nome}".`); continue; }
                newCards = || !match[1]) { throw new Error("Array não encontrado no arquivo JS."); }
        const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[];
        return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[];
     };
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
         newCards.map((c, idx) => ({...c, id: c.id || `${nome}_${idx}`}));
                newBaralhos.push({ id: Date.now() + Math.random(), nome, cartas: newCards, adicionado: false });
            } catch (error: any) { loadErrors.push(`Erro ao ler ${file.name}: ${error.message}`); }
        }
        if (newBaralhos.length > 0) { setBaralconst files = e.target.files; if (!files) return;
        setIsLoading(true); setErrorMessage(null); let loadErrors: string[] = [];
        const newBaralhos: BaralhoCarregado[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i]; const content = await file.text();
            try {
                let newCards: Carta[] = []; const nome = file.name.replace(/\hosCarregados((prev) => [...prev, ...newBaralhos]); }
        if (loadErrors.length > 0) { setErrorMessage(loadErrors.join(" ")); }
        setIsLoading(false); e.target.value = '';
     };
    const adicionarBaralho = (baralhoId: number) => {
        setBaralhosCarregados((prev) => prev.map((b) => {
            if (b.id.(js|json)$/, "");
                if (baralhosCarregados.some(b => b.nome === nome)) { loadErrors.push(`Baralho "${nome}" já carregado.`); continue; }
                if (file.name.endsWith(".js")) { newCards = parseJSDeckFileLocal(content); }
                else if (file.name.endsWith(".json")) { newCards = JSON.parse(content) as Carta[]; }
                else { loadErrors.push(`Form === baralhoId && !b.adicionado) {
                const newCards: CartaInterna[] = b.cartas.map((c) => ({ ...c, id: c.id || `${b.nome}_${Math.random().toString(16).slice(2)}`, origBaralhoId: b.id, edited: false }));
                setCards((oldCards) => [...oldCardsato ${file.name} não suportado.`); continue; }
                if (!Array.isArray(newCards) || newCards.length === 0) { loadErrors.push(`Nenhuma carta válida em "${nome}".`); continue; }
                newCards = newCards.map((c, idx) => ({...c, id: c.id || `${nome}_${idx}`}));
                newBaralhos.push({ id: Date.now() + Math.random(), nome, cartas: newCards, adicionado: false, ...newCards]); return { ...b, adicionado: true };
            } return b;
        }));
     };
    const removerBaralho = (baralhoId: number) => {
         setBaralhosCarregados((prev) => prev.map((b) => {
            if (b.id === baralhoId && b });
            } catch (error: any) { loadErrors.push(`Erro ao ler ${file.name}: ${error.message}`); }
        }
        if (newBaralhos.length > 0) { setBaralhos.adicionado) {
                setCards((oldCards) => oldCards.filter((c) => {
                    if (c.origBaralhoId === baralhoId) { return c.edited && manterCartasEditadas; } return true;
                })); return { ...b, adicionado: false };
            } return b;
         }));
     };
    const handleAddOpcao = () =>Carregados((prev) => [...prev, ...newBaralhos]); }
        if (loadErrors.length > 0) { setErrorMessage(loadErrors.join(" ")); }
        setIsLoading(false); e.target.value = '';
 { if (novaOpcao.trim() !== "") { const newId = opcoes.length > 0 ? Math.max(...opcoes.map(o => o.id)) + 1 : 1; setOpcoes(prev => [...prev, { id: newId, texto: novaOpcao, ordemTemp: tipo === 'Ordem' ? '' : undefined }]); setNovaOp     };
    const adicionarBaralho = (baralhoId: number) => {
        setBaralhosCarregados((prev) => prev.map((b) => {
            if (b.id === baralhoId && !b.adicionado) {
                const newCards: CartaInterna[] = b.cartas.map((c) => ({ ...c, id: c.id || `${b.nome}_${Math.random().toString(16).slice(2)}`, origBaralhoIdcao(""); }};
    const handleRemoveOpcao = (id: number) => { setOpcoes((prev) => prev.filter(o => o.id !== id)); setRespostaCorreta((prev) => prev.filter(rcId => rcId !== id)); };
    const handleToggleRespostaCorreta = (id: number) => { if (tipo: b.id, edited: false }));
                setCards((oldCards) => [...oldCards, ...newCards]); return { ...b, adicionado: true };
            } return b;
        }));
     };
    const remover === "Pergunta" || tipo === "ContraTempo") { setRespostaCorreta(prev => prev.includes(id) ? [] : [id]); } else if (tipo === "MultiplaEscolha" || tipo === "Outras") {Baralho = (baralhoId: number) => {
         setBaralhosCarregados((prev) => prev.map((b) => {
            if (b.id === baralhoId && b.adicionado) {
                setCards((oldCards) => oldCards.filter((c) => {
                    if (c.origBaralhoId === baralhoId) { setRespostaCorreta(prev => prev.includes(id) ? prev.filter(rcId => rcId !== id) : [...prev, id]); }};
    const handleSetOrder = (optionId: number, orderValue: string) => { setOpcoes(prev => prev.map(op => op.id === optionId ? { ...op, ordemTemp: orderValue } return c.edited && manterCartasEditadas; } return true;
                })); return { ...b, adicionado: false };
            } return b;
         }));
     };
    const handleAddOpcao = () => { if (novaOpcao. : op)); };
    const handleAddColunaA = () => { if (novaColunaA.trim()) { const newId = colunaAItems.length > 0 ? Math.max(...colunaAItems.map(i => i.id)) + 1trim() !== "") { const newId = opcoes.length > 0 ? Math.max(...opcoes.map(o => o.id)) + 1 : 1; setOpcoes(prev => [...prev, { id: newId, texto: novaOpcao, ordemTemp: tipo === 'Ordem' ? '' : undefined }]); : 1; setColunaAItems(prev => [...prev, { id: newId, texto: novaColunaA }]); setNovaColunaA(""); }};
    const handleRemoveColunaA = (id: number) => setColunaAItems( setNovaOpcao(""); }};
    const handleRemoveOpcao = (id: number) => { setOpcoes((prev) => prev.filter(o => o.id !== id)); setRespostaCorreta((prev) => prev.filter(rcprev => prev.filter(i => i.id !== id));
    const handleAddColunaB = () => { if (novaColunaB.trim()) { const newId = colunaBItems.length > 0 ? Math.max(...colunaBItems.map(i => i.id), 100) + 1 : 101; setColunaBItems(prevId => rcId !== id)); };
    const handleToggleRespostaCorreta = (id: number) => { if (tipo === "Pergunta" || tipo === "ContraTempo") { setRespostaCorreta(prev => prev.includes(id) ? [] => [...prev, { id: newId, texto: novaColunaB }]); setNovaColunaB(""); }};
    const handleRemoveColunaB = (id: number) => setColunaBItems(prev => prev.filter( : [id]); } else if (tipo === "MultiplaEscolha" || tipo === "Outras") { setRespostaCorreta(prev => prev.includes(id) ? prev.filter(rcId => rcId !== id) : [...prev, id]); }};
    const handleSetOrder = (optionId: number, orderValue: string) => { setOpi => i.id !== id));
    const handleAddZona = () => {
         const id = zonasClicaveis.length > 0 ? Math.max(...zonasClicaveis.map(z => z.id)) + 1 : 1;
coes(prev => prev.map(op => op.id === optionId ? { ...op, ordemTemp: orderValue }         const x = parseFloat(String(novaZona.x || 0).replace(',', '.'));
         const y = parseFloat(String(novaZona.y || 0).replace(',', '.'));
         const w = parseFloat( : op)); };
    const handleAddColunaA = () => { if (novaColunaA.trim()) { const newId = colunaAItems.length > 0 ? Math.max(...colunaAItems.map(i => i.id)) + 1String(novaZona.largura || 0.1).replace(',', '.'));
         const h = parseFloat(String(novaZona.altura || 0.1).replace(',', '.'));
         if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) && w > 0 && : 1; setColunaAItems(prev => [...prev, { id: newId, texto: novaColunaA }]); setNovaColunaA(""); }};
    const handleRemoveColunaA = (id: number) => setColunaAItems(prev => prev.filter(i => i.id !== id));
    const handleAddColunaB = () => { if (novaColuna h > 0 && x>=0 && x<=1 && y>=0 && y<=1 && w+x<=1 && h+y<=1) {
            setZonasClicaveis(prev => [...prev, { id, x, y, largura: w, altura: h, descricao: novaZona.descricao || "" }]);
            setNovaB.trim()) { const newId = colunaBItems.length > 0 ? Math.max(...colunaBItems.map(i => i.id), 100) + 1 : 101; setColunaBItems(prev => [...prev, { id: newId, texto: novaColunaB }]); setNovaColunaB(""); }};
    const handleRemoveColunaB = (id: number) => setColunaBItems(prev => prev.filter(i => i.idZona({x:0, y:0, largura: 0.1, altura: 0.1});
         } else { alert("Valores inválidos para a zona (X, Y, Largura, Altura devem ser números entre 0 e 1, e X+Largura <= 1, Y+Altura <= 1). Use ponto ou vírgula."); }
     };
    const handleRemoveZona = (id: number) => { setZonasClicaveis(prev => prev.filter(z => !== id));
    const handleAddZona = () => {
         const id = zonasClicaveis.length > 0 ? Math.max(...zonasClicaveis.map(z => z.id)) + 1 : 1;
         const x = parseFloat(String(novaZona.x || 0).replace(',', '.'));
         const y = parseFloat(String(novaZona.y || 0).replace(',', '.'));
         const w = parseFloat(String( z.id !== id)); if (respostaCorretaPontoCerto === id) setRespostaCorretaPontoCerto(null); };
    const handleNovaZonaChange = (field: keyof Partial<ZonaClicavel>, value: string) => { setNovaZona(prev => ({ ...prev, [field]: value })); };
    const handleSetRespostaPontoCerto = (id: number) => setRespostaCorretaPontoCerto(id);
    const handleAddFragmento = ()novaZona.largura || 0.1).replace(',', '.'));
         const h = parseFloat(String(novaZona.altura || 0.1).replace(',', '.'));
         if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) && w > 0 && h > 0 && x>=0 && x<=1 && y>=0 && y<=1 && w+x<=1 && h+y<=1) {
            setZonasClicaveis(prev => [...prev, { id, x, y, largura: w, => { if (novoFragmento.trim()) { const newId = fragmentos.length > 0 ? Math.max(...fragmentos.map(f => f.id)) + 1 : 1; setFragmentos(prev => [...prev, { id: newId, texto: novoFragmento }]); setNovoFragmento(""); }};
    const handleRemoveFragmento = (id: number) => setFragmentos(prev => prev.filter(f => f.id !== id));
    const handleAddCategoria = () => altura: h, descricao: novaZona.descricao || "" }]);
            setNovaZona({x:0, y:0, largura: 0.1, altura: 0.1});
         } else { alert("Valores inválidos para a zona (X, Y, Largura, Altura devem ser números entre 0 e 1, e X+Larg { if (novaCategoria.trim() !== "" && !categorias.includes(novaCategoria)) { setCategorias((old) => [...old, novaCategoria]); setNovaCategoria(""); } };
    const handleRemoveCategoria = (cat: string) => { setCategorias((old) => old.filter((c) => c !== cat)); };
ura <= 1, Y+Altura <= 1). Use ponto ou vírgula."); }
     };
    const handleRemoveZona = (id: number) => { setZonasClicaveis(prev => prev.filter(z => z.id !== id)); if (respostaCorretaPontoCerto === id) setRespostaCorretaPontoC    const handleAddFonte = () => { if (novaFonte.trim() !== "" && !fontes.includes(novaFonte)) { setFontes((old) => [...old, novaFonte]); setNovaFonte(""); } };
    const handleRemoveerto(null); };
    const handleNovaZonaChange = (field: keyof Partial<ZonaClicavel>, value: string) => { setNovaZona(prev => ({ ...prev, [field]: value })); };
    const handleFonte = (f: string) => { setFontes((old) => old.filter((fon) => fon !== f)); };

    // --- Funções para Inserir HTML de Popup (ATUALIZADAS) ---
    const inserirTemplatePopup = (tipoPopupSetRespostaPontoCerto = (id: number) => setRespostaCorretaPontoCerto(id);
    const handleAddFragmento = () => { if (novoFragmento.trim()) { const newId = fragment: 'imagem' | 'video') => {
        const idUnico = `popup-${Date.now()}`;
        let urlos.length > 0 ? Math.max(...fragmentos.map(f => f.id)) + Principal = '';
        let desc = '';
        let thumbHtml = '';
        let mediaElementHtml = '';

        if (tipoPopup1 : 1; setFragmentos(prev => [...prev, { id: newId, texto: novoFragmento }]); setNovo === 'imagem') {
            if (!popupImageUrl.trim()) { alert("Insira a URL da Imagem."); return; }
            urlPrincipal = popupImageUrl;
            desc = 'Descrição da Imagem';
            thumbHtml = `<img src=\"${Fragmento(""); }};
    const handleRemoveFragmento = (id: number) => setFragmentos(prev => prevurlPrincipal}\" alt=\"Clique para ampliar\"/>`; // Usa a mesma URL
            mediaElementHtml = `<img.filter(f => f.id !== id));
    const handleAddCategoria = () => { if (novaCategoria.trim() !== "" && src=\"${urlPrincipal}\" alt=\"Imagem Ampliada\"/>`;
        } else { // video
            if (!popupVideoUrl !categorias.includes(novaCategoria)) { setCategorias((old) => [...old, novaCategoria]); setNovaCategoria(""); } };
    const handleRemoveCategoria = (cat: string) => { setCategorias((old) => old.trim()) { alert("Insira a URL do Vídeo (.mp4)."); return; }
            urlPrincipal = popupVideoUrl;
            desc = 'Descrição do Vídeo';
            thumbHtml = `<span>🎬.filter((c) => c !== cat)); };
    const handleAddFonte = () => { if (novaFonte.trim() !== "" && !fontes.includes(novaFonte)) { setFontes((old) => [...old, novaFonte]); setNovaFonte(""); Clique para ver o vídeo</span>`;
            mediaElementHtml = `<video id=\"media-${idUnico}\" controls width=\"100%\" style=\"max-width: 700px; max-height: 70vh;\ } };
    const handleRemoveFonte = (f: string) => { setFontes((old) => old.filter((fon) => fon">\n      <source src=\"${urlPrincipal}\" type=\"video/mp4\">\n      Seu navegador não suporta vídeo.\ !== f)); };

    // --- Funções para Inserir HTML de Popup (ATUALIZADAS com JS para parar mídia) ---
    const inserirTemplatePopup = (tipoPopup: 'imagem' | 'video') => {
        n    </video>`;
        }

        const templateCSS = `\n<style>\n.popup-overlay-${idUnico} { position: fixed; top: 0; left: 0; width: 100%; height:const idUnico = `popup-${Date.now()}`;
        const mediaId = `media-${idUnico}`; // 100%; background-color: rgba(0, 0, 0, 0.75); display: none; justify-content: center; align-items: center; z-index: 10 ID para img/video
        let urlPrincipal = '';
        let urlThumb = '';
        let desc =00; padding: 20px; box-sizing: border-box; }\n.popup-overlay-${idUnico}:target { display: flex; }\n.popup-content-${idUnico} { position: relative; background-color: #fff; padding '';
        let thumbHtml = '';
        let mediaElementHtml = '';

        if (tipoPopup === 'imagem') {
            if (!popupImageUrl.trim()) { alert("Insira a URL da Imagem."); return; }
            urlPrincipal = popupImageUrl;
            : 20px; border-radius: 8px; max-width: 90%; max-height: 90%; overflow: auto; }\n.popup-content-${idUnico} img, .popup-content-${idUnicourlThumb = popupImageUrl;
            desc = 'Descrição da Imagem';
            thumbHtml = `<img src=\"${urlThumb}\" alt=\"Clique para ampliar\"/>`;
            mediaElementHtml = `<img id=\"${mediaId}\" src=\"${urlPrincipal}\" alt=\"Imagem Ampliada\"/>`; // Adiciona ID
        } else {
            } video { display: block; max-width: 100%; max-height: 80vh; height: auto; margin: 0 auto 15px auto; }\n.popup-close-${idUnico}if (!popupVideoUrl.trim()) { alert("Insira a URL do Vídeo (.mp4)."); return { position: absolute; top: 10px; right: 15px; font-size: 24px; font-weight: bold; color: #555; text-decoration: none; line-height: 1;; }
            urlPrincipal = popupVideoUrl;
            desc = 'Descrição do Vídeo';
            thumbHtml = `<span>🎬 Clique para ver o vídeo</span>`;
            mediaElementHtml = `<video id=\"${mediaId}\" controls width=\"1 cursor:pointer; }\n.popup-close-${idUnico}:hover { color: #000; }\n.thumb-link-${idUnico} { display: block; margin: 10px auto; width: fit-content; cursor: zoom-in; border: 1px solid #ccc; padding: 3px; border00%\" style=\"max-width: 700px; max-height: 70vh-radius: 4px; background: white; }\n.thumb-link-${idUnico} img, .thumb-link-${id;\">\n      <source src=\"${urlPrincipal}\" type=\"video/mp4\">\n      Seu navegador não suporta vídeo.\n    </video>`; // Adiciona ID
        }

        const templateCSS = `\n<style>\n.popup-overlay-${idUnico} { position: fixed; top: 0; left: 0; widthUnico} span { max-width: 180px; height: auto; display: block; }\n.thumb-link-${idUnico} span{padding:10px; color:blue; text-decoration:underline}\n</: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.75); display: none; justify-content: center; align-items: center; z-index: style>\n`;
        // Adiciona onclick ao overlay e ao botão fechar
        const templateElemento =1000; padding: 20px; box-sizing: border-box; }\n.popup `<!-- Link/Thumb -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${id-overlay-${idUnico}:target { display: flex; }\n.popup-content-${idUnico}Unico}\" ${tipoPopup === 'video' ? 'style="border:none; background:none; padding:0;"' : ''}>\ { position: relative; background-color: #fff; padding: 20px; border-radius: 8px; maxn  ${thumbHtml}\n</a>\n\n<!-- Popup -->\n<div id=\"${idUnico}\" class=\"popup--width: 90%; max-height: 90%; overflow: auto; }\n.popup-content-${idUnico} img, .popup-content-${idUnico} video { display: block; max-width: overlay-${idUnico}\" onclick=\"document.location.hash='#'; pararMediaPorId('media-${idUnico}');\">\n  <div class=\"popup-content-${idUnico}\" onclick=\"event.stopPropagation()\">\n    <a100%; max-height: 80vh; height: auto; margin: 0 auto 15px auto; }\n.popup-close-${idUnico} { position: absolute; top: 10px; right: 15px; font-size: 24px; font-weight: bold; color: #555; text-decoration: none href=\"#\" onclick=\"pararMediaPorId('media-${idUnico}'); return true;\" class=\"popup-close-${; line-height: 1; cursor: pointer; }\n.popup-close-${idUnico}:hover { color: #000; }\n.thumb-link-${idUnico} { display: block; margin: 10idUnico}\" title=\"Fechar\">×</a>\n    ${mediaElementHtml}\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">${desc}</p>\n  </div>\n</div>\n`;
        const htmlParaInserir = `\n<px auto; width: fit-content; cursor: zoom-in; border: 1px solid #ccc; padding: 3px; border-radius: 4px; background: white; }\n.thumb-link-${idUnico} img, .thumb-link-${idUnico} span { max-width: 180px; height: auto; display: blockbr>\n${templateCSS}${templateElemento}<br>\n`;
        const textarea = perguntaTextareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart; const end = textarea.selectionEnd;
            const textoAtual = textarea.value;
            const novoTexto = textoAtual.substring(0, start) + html; }\n.thumb-link-${idUnico} span{padding:10px; color:blue; text-decoration:underlineParaInserir + textoAtual.substring(end);
            setPergunta(novoTexto);
            if(tipoPopup === 'imagem') { setPopupImageUrl(""); } else { setPopupVideoUrl(""); }
        } else { setPergunta(prev => prev + htmlParaInserir); }
}\n</style>\n`;
        // Link de fechar chama JS ANTES de mudar o hash
        const closeLinkHtml = `<    };

    const inserirTemplatePopupYouTube = () => {
        if (!popupYouTubeUrl.trim()) { alert("Insira aa href=\"#\" onclick=\"if(typeof pararMediaPorId === 'function') pararMediaPorId('${media URL do vídeo do YouTube."); return; }
        let videoId = '';
        const url = popupYouTubeUrl;
        const patterns = [ /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zAId}'); else console.error('pararMediaPorId not defined'); return true;\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>`;
        // Overlay também chama JS ao fechar
        const templateElemento-Z0-9_-]{11})/, /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a = `<!-- Link/Thumb -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\"-zA-Z0-9_-]{11})/, /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/ ${tipoPopup === 'video' ? 'style="border:none; background:none; padding:0;"' : ''}>\([a-zA-Z0-9_-]{11})/ ];
        for (const pattern of patterns) { const match =n  ${thumbHtml}\n</a>\n\n<!-- Popup -->\n<div id=\"${idUnico}\" class=\"popup- url.match(pattern); if (match && match[1]) { videoId = match[1]; break; } }
        if (!videoId) { alert("URL do YouTube inválida. Use o link completo (watch?v=..., youtu.beoverlay-${idUnico}\" onclick=\"if(typeof pararMediaPorId === 'function') pararMediaPorId('${mediaId}'); document.location.hash='#';\">\n  <div class=\"popup-content-${idUnico}\/... ou embed/...)."); return; }

        const idUnico = `popup-yt-${Date.now()}`;
        const iframeId = `media-${idUnico}`;
        const embedUrl = `https://www.youtube.com/embed/${videoId" onclick=\"event.stopPropagation()\">\n    ${closeLinkHtml}\n    ${mediaElementHtml}\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">${desc}</p>\}?enablejsapi=1`; // Habilita API JS

        const templateCSS = `\n<style>\n.popup-overlay-${idUnico} { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.85n  </div>\n</div>\n`;

        const htmlParaInserir = `\n<br>\n${templateCSS}${templateElemento}<br>\n`;
        const textarea = perguntaTextareaRef.current;
        ); display: none; justify-content: center; align-items: center; z-index: 1000; padding: 20px; box-sizing: border-box; }\n.popup-overlayif (textarea) {
            const start = textarea.selectionStart; const end = textarea.selectionEnd;
            const textoAtual = textarea.value;
            const novoTexto = textoAtual.substring(0, start) + htmlParaInserir + textoAtual.substring(end-${idUnico}:target { display: flex; }\n.popup-content-${idUnico} { position: relative; background-color: #000; padding: 10px; border-radius: 8px; width: 90%; max-width: 800px; aspect-ratio: 16 / );
            setPergunta(novoTexto);
            if(tipoPopup === 'imagem') { setPopupImageUrl(""); } else { setPopupVideoUrl(""); }
        } else { setPergunta(prev => prev + htmlParaInserir); }
    };

    const inserirTemplatePopupYouTube = () => {
        if (!popupYouTubeUrl.trim()) { alert("Insira a9; }\n.popup-content-${idUnico} iframe { display: block; width: 10 URL do vídeo do YouTube."); return; }
        let videoId = '';
        const url = popupYouTubeUrl;
        const patterns = [ /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a0%; height: 100%; border: none; }\n.popup-close-${idUnico}-zA-Z0-9_-]{11})/, /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/, /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/ { position: absolute; top: -15px; right: -15px; width: 30px; height: 30px; background: white; border-radius: 50%; font-size: 20px; font-weight: bold; color: #333; text-decoration: none; line-height: 30px; text-align: center; box-shadow: 0 0 5px black; cursor:pointer([a-zA-Z0-9_-]{11})/ ];
        for (const pattern of patterns) { const match = url.match(pattern); if (match && match[1]) { videoId = match[1]; break;; }\n.popup-close-${idUnico}:hover { color: #000; background: #eee; }\n.thumb-link-${idUnico} { display: block; margin: 10px auto; width } }
        if (!videoId) { alert("URL do YouTube inválida. Use o link completo (watch?v=..., youtu.be/... ou embed/...)."); return; }

        const idUnico = `popup-yt-${Date.now()}`;
        const iframeId = `media-${idUnico}`;
        const embedUrl = `https://www.youtube.com/embed/${videoId: fit-content; cursor: pointer; }\n.thumb-link-${idUnico} span { background:#eee; border: 1px solid #ccc; padding: 10px 15px; border-radius:}?enablejsapi=1`; // enablejsapi é importante

        const templateCSS = `\n<style>\n.popup-overlay-${idUnico} { position: fixed; top: 0; left: 0; width5px; color: #c4302b; font-weight: bold; display: flex; align-items: center; gap: 5px; }\n</style>\n`;
        const closeLinkHtml = `<a href=\"#\": 100%; height: 100%; background-color: rgba(0, 0, 0, 0.85); display: none; justify-content: center; align-items: center onclick=\"pararMediaPorId('${iframeId}'); return true;\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>`;
        const templateElemento = `<!-- Link/Thumb YouTube -->\n<a; z-index: 1000; padding: 20px; box-sizing: border-box; }\n.popup-overlay-${idUnico}:target { display: flex; }\n.popup-content-${idUnico} { position: relative; background-color: #000; padding: 10px; border href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\">\n  <span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"currentColor\" style=\"margin-right: 5px;\"><path d=\"M-radius: 8px; width: 90%; max-width: 800px; aspect-ratio: 16 / 9; }\n.popup-content-${idUnico} iframe { display: block; width: 100%; height: 100%; border: none; }\n.19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.02popup-close-${idUnico} { position: absolute; top: -15px; right: -15px; width: 30px; height: 30px; background: white; border-radius: 50%; font-size: 20px; font-weight: bold; color: #333; text-decoration9 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385: none; line-height: 30px; text-align: center; box-shadow: 0 0 5px black; cursor: pointer; }\n.popup-close-${idUnico}:hover { color: #-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z\"/000; background: #eee; }\n.thumb-link-${idUnico} { display: block; margin: 10px auto; width: fit-content; cursor: pointer; }\n.thumb-link-${idUnico} span { background:#eee; border: 1px solid #ccc; padding: 10px 15px; border-radius:></svg> Ver Vídeo YouTube</span>\n</a>\n\n<!-- Popup YouTube -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\" onclick=\"document.location.hash='#5px; color: #c4302b; font-weight: bold; display: flex; align-items: center; gap: 5px; }\n</style>\n`;
        const closeLinkHtml = `<a href=\"#\" onclick'; pararMediaPorId('${iframeId}');\">\n  <div class=\"popup-content-${idUnico}\" onclick=\"event.stopPropagation()\">\n    ${closeLinkHtml}\n    <iframe id=\"${iframeId}\" src=\"${embed=\"if(typeof pararMediaPorId === 'function') pararMediaPorId('${iframeId}'); else console.error('pararMediaPorId not defined'); return true;\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>`;
        constUrl}\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>\n  </div>\n templateElemento = `<!-- Link/Thumb YouTube -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\">\n  <span><svg xmlns=\"http://www.w3.org/2000/svg</div>\n`;
        const htmlParaInserir = `\n<br>\n${templateCSS}${templateElemento}<br>\n`;
        const textarea = perguntaTextareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart; const end = textarea.selectionEnd;
            const textoAtual = textarea.value;
\" width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"currentColor\" style=\"margin-right: 5px;\"><path d=\"M19.615             const novoTexto = textoAtual.substring(0, start) + htmlParaInserir + textoAtual.substring(end);
            setPergunta(novoTexto);
            setPopupYouTubeUrl("");
        } else { setPergunta(prev => prev + htmlParaInserir); }
    };

    const resetCarta = () => {
        3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 setTipo("Pergunta"); setTitulo(""); setPergunta(""); setOpcoes([]); setNovaOpcao("");
        setResposta2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.Correta([]); setDificuldade("facil");
        setVantagem(""); setDesvantagem(""); setDica6.245 11.626.246 15.23 0 3.897-.("");
        setTempoLimite(30); setColunaAItems([]); setNovaColunaA(""); setColunaBItems([]);266 4.356-2.62 4.385-8.816-. setNovaColunaB(""); setParesCorretosInput("");
        setImagemURLPontoCerto(""); setZonasClicaveis([]);029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z\"/></svg> Ver Vídeo YouTube</span>\n</a>\n\n<!-- setNovaZona({x:0, y:0, largura: 0.1, altura: 0.1}); setRespostaCorretaPontoCerto(null);
        setFraseIncompleta(""); setFragmentos([]); setNovoFragmento(""); setOrdemFragmentos("");
        if (!categoriasBloqueadas) setCategorias([]); Popup YouTube -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\" onclick=\"if(typeof pararMediaPorId === 'function') pararMediaPorId('${iframeId}'); document.location.hash='#';\">\n  <div class=\"popup-content-${idUnico}\" onclick=\"event.stopPropagation()\">\n    ${
        if (!fontesBloqueadas) setFontes([]);
        setEditIndex(null);
        setPopupImageUrl(""); setPopupVideoUrl(""); setPopupYouTubeUrl("");
    };

    const handleAddOrUpdateCard = () => {
        ifcloseLinkHtml}\n    <iframe id=\"${iframeId}\" src=\"${embedUrl}\" title=\"YouTube (!titulo.trim() || !tipo) { alert("Título e Tipo são obrigatórios."); return; }
        let finalRespostaCorreta video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-: number | number[] | { aId: number; bId: number }[] = [];
        let cartaEspecificaProps: any = {};picture; web-share\" allowfullscreen></iframe>\n  </div>\n</div>\n`;
        const htmlParaInserir = `\n<br>\n${templateCSS}${templateElemento}<br>\n`;
        const textarea = perguntaTextareaRef.current;
        

        try {
            switch (tipo) {
                case "Pergunta": case "ContraTempo":
                    if (respostaCorreta.length !== 1) throw new Error(`Tipo ${tipo} exige uma resposta correta.`);
                    finalRespostaCorreta = respostaCorreta[0];
                    cartaEspecificaProps.opcoes = opcoes;
                    if(if (textarea) {
            const start = textarea.selectionStart; const end = textarea.selectionEnd;
            const textoAtual = textarea.value;
            const novoTexto = textoAtual.substring(0, start) + htmlParaInserir + textoAtual.substringtipo === 'ContraTempo') cartaEspecificaProps.tempoLimite = tempoLimite;
                    break;
                case "MultiplaEscolha": case "Outras": case "Vantagem": case "Desvantagem":
(end);
            setPergunta(novoTexto);
            setPopupYouTubeUrl("");
        } else { setPergunta(prev => prev + htmlParaInserir); }
    };


    const resetCarta = () => {
        setTipo("                    finalRespostaCorreta = (tipo === "Vantagem") ? opcoes.map(o => o.id) : (tipo === "Desvantagem" ? [] : respostaCorreta);
                    cartaEspecificaProps.opcoes = opcoes;
                    break;
                case "Ordem":
                    const posicoes = new Map<number, number>();Pergunta"); setTitulo(""); setPergunta(""); setOpcoes([]); setNovaOpcao("");
        setRespostaCorreta([]); setDificuldade("facil");
        setVantagem(""); setDesvantagem(""); setDica("");
 let maxPos = 0;
                    const ordemIds: number[] = []; let ordemValida = true;
                            setTempoLimite(30); setColunaAItems([]); setNovaColunaA(""); setColunaBItems([]); setNovaopcoes.forEach(op => {
                        const pos = op.ordemTemp?.trim() ? parseInt(ColunaB(""); setParesCorretosInput("");
        setImagemURLPontoCerto(""); setZonasClicaveis([]); setNovaZona({x:0, y:0, largura: 0.1, altura: 0.1op.ordemTemp, 10) : NaN;
                        if (isNaN(pos) || pos <= 0 || posicoes.has(pos)) { ordemValida = false; }
                        else { posicoes.set(pos, op.id); maxPos = Math.max(maxPos, pos); }
                    });
                    if (!ordemValida || posicoes.}); setRespostaCorretaPontoCerto(null);
        setFraseIncompleta(""); setFragmentos([]); setNovosize !== opcoes.length || maxPos !== opcoes.length) { throw new Error("Erro na ordem: posições devem ser únicas de 1 a N."); }
                    for (let i = 1; i <= maxPos; i++) { ordemFragmento(""); setOrdemFragmentos("");
        if (!categoriasBloqueadas) setCategorias([]);
        if (!fontesBloqueadas) setFontes([]);
        setEditIndex(null);
        setPopupImageUrl(""); setPopupVideoUrl(""); setPopupIds.push(posicoes.get(i)!); }
                    finalRespostaCorreta = ordemIds;
                    cartaEspecificaProps.opcoes = opcoes.map(({ordemTemp, ...rest}) => rest);
                    break;
                case "RelacionarColunas":
                    try {
                        const pares = JSON.parse(paresCorretosInput || '[]');
                        if (!ArrayYouTubeUrl("");
    };

    const handleAddOrUpdateCard = () => {
        if (!titulo.trim() || !tipo) { alert("Título e Tipo são obrigatórios."); return; }
        let finalRespostaCorreta: number | number[] | {.isArray(pares) || !pares.every(p => typeof p === 'object' && 'aId' in p && 'bId' in p && typeof p.aId === 'number' && typeof p.b aId: number; bId: number }[] = [];
        let cartaEspecificaProps: any = {};Id === 'number')) throw new Error();
                        finalRespostaCorreta = pares;
                    } catch { throw new Error("Form

        try {
            switch (tipo) {
                case "Pergunta": case "ContraTempo":
                    if (respostaCorreta.length !== 1) throw new Error(`Tipo ${tipo} exige uma resposta correta.`);
                    ato JSON inválido para Pares Corretos."); }
                    cartaEspecificaProps.colunaA = colunaAItems;
                    cartaEspecificfinalRespostaCorreta = respostaCorreta[0];
                    cartaEspecificaProps.opcoes = opcoes;
                    if(aProps.colunaB = colunaBItems;
                    break;
                case "PontoCerto":tipo === 'ContraTempo') cartaEspecificaProps.tempoLimite = tempoLimite;
                    break;
                case
                    if (!imagemURLPontoCerto) throw new Error("URL da Imagem é obrigatória.");
                    if ( "MultiplaEscolha": case "Outras": case "Vantagem": case "Desvantagem":
                    finalRespostaCorreta = (tipo === "Vantagem") ? opcoes.map(o => o.idzonasClicaveis.length === 0) throw new Error("Adicione pelo menos uma Zona Clicável.");
                    if (resposta) : (tipo === "Desvantagem" ? [] : respostaCorreta);
                    cartaEspecificaProps.opcoes = opcoes;
CorretaPontoCerto === null || !zonasClicaveis.some(z => z.id ===                    break;
                case "Ordem":
                    const posicoes = new Map<number, number>(); let respostaCorretaPontoCerto)) throw new Error("Selecione uma Zona Correta válida.");
                    final maxPos = 0;
                    const ordemIds: number[] = []; let ordemValida = true;
                    RespostaCorreta = respostaCorretaPontoCerto;
                    cartaEspecificaProps.imagemURL = imagemURLPontoCerto;
                    cartaEspecificaProps.zonasClicaveis = zonasClicaveis;
                    break;
                caseopcoes.forEach(op => {
                        const pos = op.ordemTemp?.trim() ? parseInt(op.ordemTemp, 10) : NaN;
                        if (isNaN(pos) || pos <= "CompletarFrase":
                    if (!fraseIncompleta.trim()) throw new Error("Fr 0 || posicoes.has(pos)) { ordemValida = false; }
                        else { posicoes.set(posase Incompleta é obrigatória.");
                    if (fragmentos.length === 0) throw new Error("Adicione pelo menos um Fragmento.");
                    const ordemIdsFrag = ordemFragmentos.split(',').map(s => parseInt(s.trim(), 10))., op.id); maxPos = Math.max(maxPos, pos); }
                    });
                    if (!ordemValida || posicoes.size !== opcoes.length || maxPos !== opcoes.length) { throw new Error("Erro na ordem: posições devem ser únicas de 1 a N."); }
                    for (let i = 1; ifilter(n => !isNaN(n));
                    if (ordemIdsFrag.length === 0 || !ordemIdsFrag.every(id => fragmentos.some(f => f.id === id))) throw new Error("Ordem dos Fragmentos inválida ou IDs não encontrados.");
                    finalRespostaCorreta = ordemIdsFrag;
                    cartaEspecificaProps.fr <= maxPos; i++) { ordemIds.push(posicoes.get(i)!); }
                    finalRespostaCorreta = ordemIds;
                    cartaEspecificaProps.opcoes = opcoes.map(({ordemTemp, ...rest}) => rest);
                    break;aseIncompleta = fraseIncompleta;
                    cartaEspecificaProps.fragmentos = fragmentos;
                    break;
                default: const check: never = tipo; throw new Error(`Tipo de carta desconhecido: ${check}`);
            }
        } catch (error: any) { alert(`Erro ao preparar carta: ${error.message}`); return; }

        const cartaBaseProps = {

                case "RelacionarColunas":
                    try {
                        const pares = JSON.parse(paresCorretosInput || '[]');
                        if (!Array.isArray(pares) || !pares.every(p => typeof p === 'object' && 'aId'             id: editIndex !== null ? cards[editIndex].id : `new_${Date.now()}_${Math.random().toString(16).slice(2)}`,
             tipo, titulo, pergunta, dificuldade, categorias, fontes in p && 'bId' in p && typeof p.aId === 'number' && typeof p.bId === 'number')) throw new Error();
                        finalRespostaCorreta = pares;
                    } catch { throw new Error("Form,
             vantagem, desvantagem, dica,
             respostaCorreta: finalRespostaCorreta,
             editedato JSON inválido para Pares Corretos."); }
                    cartaEspecificaProps.colunaA = colunaAItems;
                    cartaEspecificaProps.colunaB = colunaBItems;
                    break;
                case "PontoCerto":: true,
             origBaralhoId: editIndex !== null ? cards[editIndex].origBaralhoId : undefined
        };

        if (!["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo)) {
            delete
                    if (!imagemURLPontoCerto) throw new Error("URL da Imagem é obrigatória.");
                    if (zonasClicaveis.length === 0) throw new Error("Adicione pelo menos uma Zona Clicável.");
                    if (respostaCorretaPontoCerto === null || !zonasClicaveis.some(z => z.id === respostaCorreta cartaEspecificaProps.opcoes;
        } else if (cartaEspecificaProps.opcoes === undefined) {
             cartaEspecificaProps.opcoes = [];
        }

        const novaCarta: CartaInterna = { ...cartaBaseProps, ...cartaEspecificaProps }PontoCerto)) throw new Error("Selecione uma Zona Correta válida.");
                    finalRespostaCorreta = respostaCorretaPontoCerto;
                    cartaEspecificaProps.imagemURL = imagemURLPontoCerto;
                    cartaEspecifica as CartaInterna;

        if (editIndex !== null) {
            setCards((oldCards) => oldCards.map((c, i) => i === editIndex ? novaCarta : c ));
        } elseProps.zonasClicaveis = zonasClicaveis;
                    break;
                case "CompletarFrase":
                    if (!fraseIncompleta.trim()) throw new Error("Frase Incompleta é obrigatória.");
                    if ( {
            setCards((oldCards) => [...oldCards, novaCarta]);
        }
        resetCarta();
    };

    const loadCardForEdit = (index: number) => {
        resetCarta();
        const carta = cards[index];
        setEditIndex(index); setTipo(carta.tipo as TipoCarta); setTitulo(carta.titulo);fragmentos.length === 0) throw new Error("Adicione pelo menos um Fragmento.");
                    const ordemIdsFrag = ordemFragmentos.split(',').map(s => parseInt(s.trim(), 10)). setPergunta(carta.pergunta);
        setDificuldade(carta.dificuldade as Dificuldade); setCategorias([...carta.categorias]); setFontes([...carta.fontes]);
        setVantagem(cartafilter(n => !isNaN(n));
                    if (ordemIdsFrag.length === 0 || !ordemIdsFrag.every(id => fragmentos.some(f => f.id === id))) throw new Error.vantagem); setDesvantagem(carta.desvantagem); setDica(carta.dica);

        switch (carta.tipo) {
            case "Pergunta": case "MultiplaEscolha": case "Vantagem": case "Des("Ordem dos Fragmentos inválida ou IDs não encontrados.");
                    finalRespostaCorreta = ordemIdsFrag;
                    cartaEspecificaProps.fraseIncompleta = fraseIncompleta;
                    cartaEspecificaProps.fragmentos = fragmentos;
                    break;
                default: const check: never = tipo; throw new Error(`Tipo de carta desconhecido: ${check}`);
vantagem": case "Outras": case "ContraTempo":
                setOpcoes(carta.opcoes ? [...carta.opcoes] : []);
                const rcArray = Array.isArray(carta.respostaCorreta) ? carta.respostaCorreta : (typeof carta.respostaCorreta === 'number' ? [carta.respostaCorreta] : []);
                setRespostaCorreta(rcArray.filter(id => typeof id === 'number'));
                if(carta.tipo === 'ContraTempo')            }
        } catch (error: any) { alert(`Erro ao preparar carta: ${error.message}`); return; }

        const cartaBaseProps = {
             id: editIndex !== null ? cards[editIndex].id : `new_${Date.now()}_${Math.random().toString(16).slice(2)}`,
             tipo, titulo, pergunta, dificuldade setTempoLimite((carta as CartaContraTempo).tempoLimite || 30);
                break;
            case "Ordem":
                 setOpcoes((carta as CartaOrdem).opcoes?.map(op => ({...op})) || []);
                 if (Array.isArray(carta.respostaCorreta) && carta.opcoes) {
                     const, categorias, fontes,
             vantagem, desvantagem, dica,
             respostaCorreta: finalRespostaCorreta,
             edited: true,
             origBaralhoId: editIndex !== null ? cards[editIndex].origBaralhoId : undefined
        };

        if (!["Pergunta", "MultiplaEscolha", "Ordem", ordemCorreta = carta.respostaCorreta as number[];
                     setOpcoes(currentOpts => currentOpts.map(op => ({...op, ordemTemp: ordemCorreta.indexOf(op.id) >= 0 ? String(ordemCorreta.indexOf(op.id) + 1) : "" })));
                 }
                 setRespostaCorreta([]);
                 break;
            case "RelacionarColunas":
                const cRel = carta as CartaRelacionarColunas; setColuna "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo)) {
            delete cartaEspecificaProps.opcoes;
        } else if (cartaEspecificaProps.opcoes === undefined) {
             cartaEspecificaProps.opcoes = [];
        }

        const novaCarta: CartaInterna = { ...cartaBaseProps, ...cartaEspecificaProps } as CartaInterna;

        if (editIndex !== null) {
            setCards((oldCards) => oldCards.map((c, i)AItems(cRel.colunaA ? [...cRel.colunaA] : []); setColunaBItems(cRel.colunaB ? [...cRel.colunaB] : []); setParesCorretosInput(Array.isArray(cRel.respostaCorreta) ? JSON.stringify(cRel.respostaCorreta, null, 2) : "[]"); break;
            case "P => i === editIndex ? novaCarta : c ));
        } else {
            setCards((oldCards) => [...oldCards, novaCarta]);
        }
        resetCarta();
    };

    const loadCardForEdit = (index:ontoCerto":
                const cPonto = carta as CartaPontoCerto; setImagemURLPontoCerto(cPonto.imagemURL || ""); setZonasClicaveis(cPonto.zonasClicaveis ? [...cPonto.zonasClicaveis] : []); setRespostaCorretaPontoCerto(typeof cPonto.respostaCorreta === 'number' ? number) => {
        resetCarta();
        const carta = cards[index];
        setEditIndex(index); setTipo(carta.tipo as TipoCarta); setTitulo(carta.titulo); setPergunta(carta.pergunta);
        setDificuldade(carta.dificuldade as Dificuldade); setCategorias([...carta.categorias]); setFont cPonto.respostaCorreta : null); break;
            case "CompletarFrase":
                const cFrase = carta as CartaCompletarFrase; setFraseIncompleta(cFrase.fraseIncompleta || ""); setFragmentos(cFrase.fragmentos ? [...cFrase.fragmentos] : []); setOrdemFragmentoses([...carta.fontes]);
        setVantagem(carta.vantagem); setDesvantagem(carta.desvantagem); setDica(carta.dica);

        switch (carta.tipo) {
            case "Pergunta": case "MultiplaEscolha": case "Vantagem": case "Desvantagem": case "Outras":(Array.isArray(cFrase.respostaCorreta) ? cFrase.respostaCorreta.join(', ') : ""); break;
        }
    };
    const deleteCard = (index: number) => {
        set case "ContraTempo":
                setOpcoes(carta.opcoes ? [...carta.opcoes] : []);
                const rcArray = Array.isArray(carta.respostaCorreta) ? carta.respostaCorreta : (typeof carta.respostaCorreta === 'number' ? [carta.respostaCorreta] : []);
                setRespostaCorreta(rcArray.filter(id => typeof id === 'number'));
                if(carta.tipo === 'ContraTempo')Cards((old) => old.filter((_, i) => i !== index));
        if (editIndex === index) { resetCarta(); }
    };
    const handleRemoveAllCards = () => {
        if (window.confirm(`Remover TODAS as ${cards.length} cartas?`)) {
            setCards([]); setEditIndex setTempoLimite((carta as CartaContraTempo).tempoLimite || 30);
                break;
            case "Ordem":
                 setOpcoes((carta as CartaOrdem).opcoes?.map(op => ({...op})) || []);
                 if (Array.isArray(carta.respostaCorreta) && carta.opcoes) {
                     const(null); resetCarta();
        }
    };
    const cancelEdit = () => { resetCarta(); };

    // --- Download (Corrigido) ---
    const prepareForDownload = (): Partial<Carta>[] => {
        return cards.map(({ origBaralhoId, edited, ...rest }: CartaInterna) => {
            const cardData: Partial<Carta> ordemCorreta = carta.respostaCorreta as number[];
                     setOpcoes(currentOpts => currentOpts.map(op => ({...op, ordemTemp: ordemCorreta.indexOf(op.id) >= 0 ? String(ordemCorreta.indexOf(op.id) + 1) : "" })));
                 }
                 setRespostaCorreta([]);
                 break;
            case "Rel = { ...rest };
            // Limpa campos específicos que NÃO pertencem ao tipo atual
            if (rest.tipo !== "ContraTempo") delete (cardData as Partial<CartaContraTempo>).tempoLimite; // OK
            if (rest.tipo !==acionarColunas":
                const cRel = carta as CartaRelacionarColunas; setColunaAItems(cRel.colunaA ? [...cRel.colunaA] : []); setColunaBItems(cRel.coluna "RelacionarColunas") { delete (cardData as Partial<CartaRelacionarColunas>).colunaA; delete (cardData as Partial<CartaRelacionarColunas>).colunaB; }
            if (rest.tipo !== "PontoCerto") { delete (cardData as Partial<CartaPontoB ? [...cRel.colunaB] : []); setParesCorretosInput(Array.isArray(cRel.respostaCorreta) ? JSON.stringify(cRel.respostaCorreta, null, 2) : "[]"); break;
            case "PontoCerto":
                const cPonto = carta as CartaPontoCerto; setImagemURLPontoCerto(cPCerto>).imagemURL; delete (cardData as Partial<CartaPontoCerto>).zonasClicaveis; }
            if (rest.tipo !== "CompletarFrase") { delete (cardData as Partial<CartaCompletarFrase>).fraseIncompleta; delete (cardData as Partial<onto.imagemURL || ""); setZonasClicaveis(cPonto.zonasClicaveis ? [...cPonto.zonasClicaveis] : []); setRespostaCorretaPontoCerto(typeof cPonto.respostaCorreta === 'number' ? cPonto.respostaCorreta : null); break;
            case "CompletarFrase":
                const cFrase = carta asCartaCompletarFrase>).fragmentos; }

            // Limpa 'opcoes' se não for um tipo que o utiliza
            if (!["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvant CartaCompletarFrase; setFraseIncompleta(cFrase.fraseIncompleta || ""); setFragmentos(cFrase.fragmentos ? [...cFrase.fragmentos] : []); setOrdemFragmentos(Array.isArray(cFrase.respostaCorreta) ? cFrase.respostaCorreta.join(', ') : ""); break;
        }
    };
    const deleteCard = (index: number) => {
        setagem", "Outras", "ContraTempo"].includes(rest.tipo)) {
                 delete cardData.opcoes;
            } else if (rest.tipo === "Ordem" && cardData.opcoes) {
                 // Remove ordemTemp das opções para Ordem
                 cardData.opcoes = cardData.opcoes.map(({ ordemTemp, ...o })Cards((old) => old.filter((_, i) => i !== index));
        if (editIndex === index) { resetCarta(); }
    };
    const handleRemoveAllCards = () => {
        if (window.confirm(`Remover TODAS as ${cards.length} cartas?`)) {
            setCards([]); setEditIndex(null); resetCarta();
 => o);
            } else if (cardData.opcoes === undefined) {
                 // Garante array vazio para tipos que DEVEM ter opções, se por acaso ficou undefined
                 if (["Pergunta", "MultiplaEscolha", "Or        }
    };
    const cancelEdit = () => { resetCarta(); };

    // --- Download (dem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(rest.tipo)){
                    cardData.Corrigido) ---
    const prepareForDownload = (): Partial<Carta>[] => {
        return cards.map(({ origBaralhoIdopcoes = [];
                 }
            }

            return cardData;
        });
    };
    const generateCode = (format: 'js' | 'json') => { const deckFinal = prepareForDownload(); if, edited, ...rest }: CartaInterna) => {
            const cardData: Partial<Carta> = { ...rest };
            // CORREÇÃO: Usar delete apenas em propriedades opcionais
            if (rest.tipo (format === 'json') { return JSON.stringify(deckFinal, null, 2); } else { const deck = JSON.stringify(deckFinal, null, 2); return `const ${deckName || 'meu !== "ContraTempo") delete cardData.tempoLimite; // Agora é opcional em CartaContraTempo
            if (rest.tipo !== "RelacionarColunas") { delete (cardData as Partial<CartaRelacionarColunas>)._baralho'} = ${deck};\n\nexport default ${deckName || 'meu_baralho'};`; } };
    const downloadCode = (format: 'js' | 'json') => { const element = document.createElement("a"); constcolunaA; delete (cardData as Partial<CartaRelacionarColunas>).colunaB; }
            if (rest.tipo !== "PontoCerto") { delete cardData.imagemURL; delete cardData.zon fileContent = generateCode(format); const fileType = format === 'js' ? 'text/javascript' : 'application/json'; const fileName = `${deckName || 'meu_baralho'}.${format}`; const fileasClicaveis; delete cardData.respostaCorreta; } // Tornados opcionais para PontoCerto
            if (rest = new Blob([fileContent], { type: fileType }); element.href = URL.createObjectURL(file); element.download = fileName; document.body.appendChild(element); element.click(); document.body.removeChild(element); };

    // ---.tipo !== "CompletarFrase") { delete cardData.fraseIncompleta; delete cardData.fragmentos; delete cardData.respostaCorreta;} // Tornados opcionais para CompletarFrase

            if (!["Pergunta", "MultiplaEscol JSX do Criador ---
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Criador de Cartas Eco Challenge</h1>

            ha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].{/* Seção Superior */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                    <CardHeader><CardTitle className="text-xl">Nome do Baralho & Download</CardTitle></CardHeader>
                    <CardContent className="space-y-4includes(rest.tipo)) {
                 delete cardData.opcoes; // Seguro pois 'opcoes' é opcional em CartaBase
            } else if (rest.tipo === "Ordem" && cardData.opcoes) {
                 card">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome (para arquivo .js)</label>
                            <Input type="text" value={deckName} onChange={(e) => setDeckName(e.targetData.opcoes = cardData.opcoes.map(({ ordemTemp, ...o }) => o);
            } else if (cardData.opcoes === undefined && ["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(rest.tipo)) {
.value.replace(/[^a-zA-Z0-9_]/g, '_'))} placeholder="meu_baralho"/>
                        </div>
                        <div className="flex space-x-4">
                            <Button onClick={() => downloadCode('js')} className="bg-blue-600 hover:bg-blue-700 text-white flex-1">Baixar .js                 cardData.opcoes = []; // Garante array vazio
            }
            return cardData;
        });
    };

    const generateCode = (format: 'js' | 'json') => { const deckFinal = prepare</Button>
                            <Button onClick={() => downloadCode('json')} className="bg-purple-600 hover:bg-purple-700 text-white flex-1">Baixar .json</Button>
ForDownload(); if (format === 'json') { return JSON.stringify(deckFinal, null, 2); } else { const deck = JSON.stringify(deckFinal, null, 2); return `const ${deckName || 'meu                        </div>
                         {cards.length > 0 && (
                            <Button onClick={handleRemoveAllCards} variant="destructive" className="w-full mt-2">Remover Todas as {cards.length} Cartas</Button>
                         _baralho'} = ${deck};\n\nexport default ${deckName || 'meu_baralho'};`; } };
    const downloadCode = (format: 'js' | 'json') => { const element = document.createElement("a"); const fileContent = generateCode(format); const fileType = format === 'js' ? 'text/javascript' :)}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-xl">Carregar/Gerenciar Baralhos</CardTitle></CardHeader>
                    <CardContent className="space- 'application/json'; const fileName = `${deckName || 'meu_baralho'}.${format}`; const file = new Blob([fileContent], { type: fileType }); element.href = URL.createObjectURL(file); element.download = fileName; document.body.appendChild(element); element.click(); document.body.removeChild(element); };y-3">
                        <Input type="file" accept=".js,.json" onChange={handleFileUpload} multiple />
                        {isLoading && <p className="text-sm text-blue-600">Carregando...</p>}
                        {errorMessage && <Alert variant="destructive"><AlertDescription>{errorMessage}</AlertDescription></Alert>}
                        {baralhosCarregados.length

    // --- JSX do Criador ---
    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Criador de Cartas Eco Challenge</h1>

            {/* Seção Superior */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* ... (Card > 0 && (
                             <>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="manterEditadas" checked={manterCartasEditadas} onCheckedChange={(checked) => setManterCartasEditadas(Boolean(checked))} />
                                    <label htmlFor="manterEditadas" className=" Nome & Download e Card Carregar/Gerenciar) ... */}
                 <Card>
                    <CardHeader><CardTitle className="text-xl">Nome do Baralho & Download</CardTitle></CardHeader>
                    <CardContent className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Manter editadas ao remover</label>
                                </div>
                                <ScrollArea className="h-40 border rounded-md p-2">
                                    <ul className="space-y-1">
                                        {baralhosCarregados.space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nome (para arquivo .js)</label>
                            <Input type="text" value={deckName} onChange={(e) =>map((b) => (
                                            <li key={b.id} className="flex items-center justify-between p-1 even:bg-gray-50">
                                                <div><span className="font-medium text-sm">{b.nome}</span><span className="text-xs text-gray-500 ml-2">({b.cart setDeckName(e.target.value.replace(/[^a-zA-Z0-9_]/g, '_'))} placeholder="meu_baralho"/>
                        </div>
                        <div className="flex space-x-4">
                            <Button onClick={() => downloadCode('js')} className="bg-blue-600 hover:bg-blue-700 text-whiteas.length})</span></div>
                                                {!b.adicionado ? (<Button onClick={() => adicionarBaralho(b.id)} size="sm" variant="outline" className="h-7 px-2 text-xs">Add</Button>) flex-1">Baixar .js</Button>
                            <Button onClick={() => downloadCode('json')} className="bg-purple-600 hover:bg-purple-700 text-white flex-1"> : (<Button onClick={() => removerBaralho(b.id)} size="sm" variant="destructive" className="h-7 px-Baixar .json</Button>
                        </div>
                         {cards.length > 0 && (
                            <Button onClick={handle2 text-xs">Remover</Button>)}
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollAreaRemoveAllCards} variant="destructive" className="w-full mt-2">Remover Todas as {cards.length} Cart>
                             </>
                        )}
                    </CardContent>
                </Card>
            </div>

             {/* Seção Principal: Layout 3 colunas */}
             <div className="grid grid-cols-1 lg:grid-cols-3as</Button>
                         )}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-xl">Carregar/Gerenciar Baralhos</CardTitle></CardHeader>
 gap-8">

                {/* Coluna Esquerda+Meio: Formulário */}
                <Card className="lg:col-span-2 max-h-[90vh] overflow-y-auto self-start">
                    <CardContent className="space-y-3">
                        <Input type="file" accept=".js,.json" onChange={handleFileUpload} multiple />
                        {isLoading && <p className="text-sm text-blue-600">Carregando...</p                    <CardHeader>
                         <CardTitle className="text-2xl">{editIndex !== null ? `Editando: ${cards[editIndex]?.titulo || `Carta ${editIndex + 1}`}` : "Criar Nova Carta"}</CardTitle>
                         <AlertDescription>Preencha os campos para {editIndex !== null ? 'atualizar' : 'criar'} uma carta>}
                        {errorMessage && <Alert variant="destructive"><AlertDescription>{errorMessage}</AlertDescription></Alert>}
                        {baralhosCarregados.length > 0 && (
                             <>
                                <div className="flex items-center space-x-2 pt-2">
                                    <Checkbox id="manterEditadas" checked={manter.</AlertDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 pb-6">
                         {/* Campos Comuns */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Tipo*</label>
                               CartasEditadas} onCheckedChange={(checked) => setManterCartasEditadas(Boolean(checked))} />
                                    <label htmlFor="manterEditadas" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Manter editadas ao remover</label>
                                 <Select value={tipo} onValueChange={(value) => setTipo(value as TipoCarta)}>
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                    <SelectContent>
                                        {CARD_TYPES.map((t</div>
                                <ScrollArea className="h-40 border rounded-md p-2">
                                    <ul className="space-y-1">
                                        {baralhosCarregados.map((b) => (
                               ) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium mb-1">Título*</label>
                                <Input type="             <li key={b.id} className="flex items-center justify-between p-1 even:bg-gray-50">
                                                <div><span className="font-medium text-sm">{b.nome}</span><span className="text-text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Pergunta/Descrição*xs text-gray-500 ml-2">({b.cartas.length})</span></div>
                                                {!b.adicionado ? (<Button onClick={() => adicionarBaralho(b.id)} size="sm" variant="outline (HTML)</label>
                             <Textarea ref={perguntaTextareaRef} value={pergunta} onChange={(e) => setPergunta(e.target.value)} className="h-36 font-mono text-sm" placeholder="Escreva aqui..."/>
                             {/* Inputs e botões para inserir popups */}
                             <Card className="mt-2 border" className="h-7 px-2 text-xs">Add</Button>) : (<Button onClick={() => removerBaralho(b.id)} size="sm" variant="destructive" className="h-7 px-2 text-xs">Remover</Button>)}
                                            </li>
                                        ))}
                                    </ul>
                                </ScrollArea>
                             </>
                        )}
-dashed">
                                <CardHeader className="p-2"><CardTitle className="text-sm font-medium">Inser                    </CardContent>
                </Card>
            </div>

             {/* Seção Principal: Layout 3 colunas */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Coluna Esquerda+Meio: Formulário */}
                <Card className="lg:col-span-2 max-h-[90vh] overflow-y-auto self-start">
                    <CardHeader>
                         <CardTitle className="text-2xl">{editIndex !== null ? `Editando: ${cards[editIndex]?.titulo || `Carta ${editIndex + 1}`}` : "Criar Nova Carta"}</CardTitle>
                         <AlertDescription>Preencha os campos para {editIndex !== null ? 'atualizar' : 'criar'} uma carta.</AlertDescription>
                    </CardHeader>
                    <CardContent className="spaceir Popup de Mídia na Pergunta</CardTitle></CardHeader>
                                <CardContent className="p-2 space-y-2">-y-5 pb-6">
                        {/* ... (Restante do formulário como na resposta anterior, com os campos condicionais e inputs) ... */}
                         {/* Campos Comuns */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1
                                    <div className="flex items-center gap-2">
                                         <ImageIcon className="h-4 w-4 text-gray-500 shrink-0"/>
                                         <Input type="text" value={popupImageUrl">Tipo*</label>
                                <Select value={tipo} onValueChange={(value) => setTipo(value as TipoCarta)}>
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>} onChange={e => setPopupImageUrl(e.target.value)} placeholder="URL Imagem" className="text
                                    <SelectContent>
                                        {CARD_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            -xs h-8 flex-1"/>
                                         <Button type="button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('imagem')} className="h-8 text-xs px-2 shrink-0">Add<div className="sm:col-span-2">
                                <label className="block text-sm font-medium mb-1">Título*</label>
                                <Input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label className="block text Img Popup</Button>
                                    </div>
                                     <div className="flex items-center gap-2">
                                         <Video className="h-4 w-4 text-gray-500 shrink-0"/>
                                         <Input type="text" value={popupVideoUrl} onChange={e => setPopupVideoUrl(e.target.value)} placeholder="URL Vídeo (.mp4)" className="text-xs h-8 flex-1"/>
                                         <Button type="-sm font-medium mb-1">Pergunta/Descrição* (HTML)</label>
                             <Textarea ref={perguntaTextareaRef} value={pergunta} onChange={(e) => setPergunta(e.target.value)} className="h-36 font-mono text-sm" placeholder="Escreva aqui..."/>
                             {/* Inputs e botões para inserir popups */}
                             button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('video')} className="h-8 text-xs px-2 shrink-0">Add Vídeo Popup</Button>
                                     </div>
                                      <div className="flex items-center gap-2">
                                          <Youtube className="h-4 w-4 text-red-600 shrink-0"/>
<Card className="mt-2 border-dashed">
                                <CardHeader className="p-2"><CardTitle className="text-sm font-medium">Inserir Popup de Mídia na Pergunta</CardTitle></CardHeader>
                                <CardContent className="p-2 space-y-2">
                                    <div className="flex items-center gap-2">
                                                                                   <Input type="text" value={popupYouTubeUrl} onChange={e => setPopupYouTubeUrl(e.target.value)} placeholder="URL YouTube (Completa)" className="text-xs h-8 flex-1"/>
                                          <Button type="button" size="sm" variant="outline" onClick={inserirTemplatePopupYouTube} className="h<ImageIcon className="h-4 w-4 text-gray-500 shrink-0"/>
                                         <Input type="text" value={popupImageUrl} onChange={e => setPopupImageUrl(e.target.value)} placeholder="URL Imagem" className="text-xs h-8 flex-1"/>
                                         <Button type="button" size-8 text-xs px-2 shrink-0">Add YouTube Popup</Button>
                                      </div>
                                </CardContent>
                             </Card>
                        </div>

                        {/* --- Campos Condicionais --- */}
                         {["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "Contra="sm" variant="outline" onClick={() => inserirTemplatePopup('imagem')} className="h-8 text-xs px-2 shrink-0">Add Img Popup</Button>
                                    </div>
                                     <div className="flex items-center gap-2">
                                         <Video className="h-4 w-4 text-gray-500 shrink-0"/>
                                         Tempo"].includes(tipo) && (
                            <Card className="bg-gray-50 border">
                                <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Opções</CardTitle></CardHeader>
                                <CardContent className="space-y-3 pt-0">
                                    <<Input type="text" value={popupVideoUrl} onChange={e => setPopupVideoUrl(e.target.value)} placeholder="URL Vídeo (.mp4)" className="text-xs h-8 flex-1"/>
                                         <Button type="button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('video')}div className="flex space-x-2">
                                        <Input type="text" value={novaOpcao} onChange={(e) => setNovaOpcao(e.target.value)} placeholder="Texto da nova opção" className="flex-1"/>
                                        <Button type="button" onClick={handleAddOpcao}>Adicionar</Button>
                                    </div>
                                    <Scroll className="h-8 text-xs px-2 shrink-0">Add Vídeo Popup</Button>
                                     </div>
                                      <div className="flex items-center gap-2">
                                          <Youtube className="h-4 w-4 text-red-600 shrink-0"/>
                                          <Input type="text" value={popupYouTubeUrl} onChange={Area className="max-h-48 pr-2 border rounded bg-white">
                                        <ul className="space-y-2 p-2">
                                            {opcoes.map((o) => (
                                                <li key={o.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 border-b pbe => setPopupYouTubeUrl(e.target.value)} placeholder="URL YouTube (Completa)" className="text-xs h-8 flex-1"/>
                                          <Button type="button" size="sm" variant="outline" onClick={inserirTemplatePopupYouTube} className="h-8 text-xs px-2 shrink-0">Add YouTube Popup</Button>
                                      -2 last:border-b-0">
                                                    <span className="flex-1 text-sm py-1">{o.id}: {o.texto}</span>
                                                    {tipo === "Ordem" && (
                                                        <</div>
                                </CardContent>
                             </Card>
                        </div>

                        {/* --- Campos Condicionais --- */}
                         {["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outdiv className="flex items-center space-x-1 my-1">
                                                            <label htmlFor={`order-${o.id}`} className="text-xs shrink-0">Pos:</label>
                                                            <Input id={`order-${o.id}`} typeras", "ContraTempo"].includes(tipo) && (
                            <Card className="bg-gray-50 border">
                                <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Opções</CardTitle></CardHeader>
                                <CardContent className="space-y-3 pt-0">
                                    <div className="flex space-x-="number" min="1" step="1" onChange={(e) => handleSetOrder(o.id, e.target.value)} value={o.ordemTemp ?? ""} className="border p-1 w-16 rounded text2">
                                        <Input type="text" value={novaOpcao} onChange={(e) => setNovaOpcao(-sm h-8 shrink-0"/>
                                                        </div>
                                                    )}
                                                    {(tipo === "Pergunta" || tipo === "MultiplaEscolha" || tipo === "Outras" || tipo === "ContraTempo") && (
e.target.value)} placeholder="Texto da nova opção" className="flex-1"/>
                                        <Button                                                        <Button type="button" onClick={() => handleToggleRespostaCorreta(o.id)} variant={respostaCorreta.includes(o.id) ? "default" : "outline"} size="sm" className={cn("h-8 type="button" onClick={handleAddOpcao}>Adicionar</Button>
                                    </div>
                                    <Scroll shrink-0", respostaCorreta.includes(o.id) && "bg-green-600 hover:bg-green-700")}>
                                                            {respostaCorreta.includes(o.id) ? "CorretaArea className="max-h-48 pr-2 border rounded bg-white">
                                        <ul className="space-y-2 p-2">
                                            {opcoes.map((o) => (
                                                <li key={o.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 border-b pb-2 last" : "Marcar"}
                                                        </Button>
                                                    )}
                                                    <Button type="button" onClick={() => handleRemoveOpcao(o.id)} variant="destructive" size="sm" className="h-8 shrink-0">Remover</Button:border-b-0">
                                                    <span className="flex-1 text-sm py-1">{o.id}: {o.texto}</span>
                                                    {tipo === "Ordem" && (
                                                        <div className="flex items-center space>
                                                </li>
                                            ))}
                                            {opcoes.length === 0 && <p className="text-xs text-center text-gray-500 py-2">Nenhuma opção.</p>}
                                        </ul>-x-1 my-1">
                                                            <label htmlFor={`order-${o.id}`} className="text-xs shrink-0">Pos:</label>
                                                            <Input id={`order-${o.id}`} type="number" min="1" step="1" onChange={(e) => handleSetOrder(o.id, e.target.value)} value={
                                    </ScrollArea>
                                    {tipo === "Ordem" && <p className="text-xs text-gray-500 mt-2">Defina a posição correta (1 a N).</p>}
                                    {tipo === "Vantagem" && <p className="text-xs text-green-600 mt-2">Opções são para confirmação.</p>}
                                    {tipo === "Desvantagem" && <p className="text-xs text-red-600 mt-o.ordemTemp ?? ""} className="border p-1 w-16 rounded text-sm h-8 shrink-0"/>
                                                        </div>
                                                    )}
                                                    {(tipo === "Pergunta" || tipo === "MultiplaEscolha" || tipo === "Outras" || tipo === "ContraTempo") && (
                                                        <Button type="button"2">Opções são para confirmação.</p>}
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "ContraTempo" && (
                            <Card className="bg-yellow-50 border border-yellow-200">
                                <CardContent className="pt-4">
                                    <label className="block text-sm font-medium mb-1">Tempo Limite (segundos)</label>
                                    <Input type="number" value={tempoLimite} onChange={(e) => setTempoLimite(Math.max(5, parseInt(e.target.value, 10) || 5 onClick={() => handleToggleRespostaCorreta(o.id)} variant={respostaCorreta.includes(o.id) ? "default" : "outline"} size="sm" className={cn("h-8 shrink-0", respostaCorreta.includes(o.id) && "bg-green-600 hover:bg-green-))} min="5" className="w-24"/>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "RelacionarColunas" && (
                            <Card className="bg-blue-50 border border-blue-200">
                                <CardHeader className="pb-2 pt-3"><CardTitle className="700")}>
                                                            {respostaCorreta.includes(o.id) ? "Correta" : "Marcar"}
                                                        </Button>
                                                    )}
                                                    <Button type="button" onClick={() => handleRemoveOpcao(o.id)} variant="destructive" size="sm" className="h-8 shrink-0">Remover</Button>
                                                text-lg">Relacionar Colunas</CardTitle></CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <div> {/* Coluna A */}
                                        <h4 className="text-md font-semibold mb-2">Coluna A</h4>
                                        <div className</li>
                                            ))}
                                            {opcoes.length === 0 && <p className="text-xs text-center text-gray-500 py-2">Nenhuma opção.</p>}
                                        </ul>="flex space-x-2 mb-2">
                                            <Input type="text" value={novaColunaA} onChange={e => setNovaColunaA(e.target.value)} placeholder="Texto item A" className="flex-1"/>
                                            <Button type="button" onClick={handleAddColunaA} size="sm">Add A</Button>
                                        
                                    </ScrollArea>
                                    {tipo === "Ordem" && <p className="text-xs text-gray-500 mt-2">Defina a posição correta (1 a N).</p>}
                                    {tipo === "Vantagem" && <p className="text-xs text-green-600 mt-2">Opções são para confirmação.</p>}
                                    {</div>
                                        <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{colunaAItems.map(item => <li key={item.tipo === "Desvantagem" && <p className="text-xs text-red-600 mt-2">Opções são para confirmação.</p>}
                                </CardContent>
                            </Card>
                        id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveColunaA(item.id)}>X</Button></li>)}</ul></ScrollArea>
                                    </div>
)}

                        {tipo === "ContraTempo" && (
                            <Card className="bg-yellow-50 border border-yellow-200">
                                <CardContent className="pt-4">
                                    <label className="block text-sm font-medium mb-1">Tempo Limite (segundos)</label>
                                    <Input type="number" value={tempo                                    <div> {/* Coluna B */}
                                        <h4 className="text-md font-semibold mb-2">Coluna B</h4>
                                        <div className="flex space-x-2 mb-2">
                                            <Input type="text" value={novaColunaB} onChange={e => setNovaColunaB(e.target.valueLimite} onChange={(e) => setTempoLimite(Math.max(5, parseInt(e.target.value, 10) || 5))} min="5" className="w-24"/>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "RelacionarColunas" && (
                            <Card className="bg)} placeholder="Texto item B" className="flex-1"/>
                                            <Button type="button" onClick={handleAddColunaB} size="sm">Add B</Button>
                                        </div>
                                        <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{colunaBItems.map(-blue-50 border border-blue-200">
                                <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Relacionar Colunas</CardTitle></CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <div> {/* Coluna A */}
item => <li key={item.id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveColunaB(item.id)}>X</Button></li>)}</ul></Scroll                                        <h4 className="text-md font-semibold mb-2">Coluna A</h4>
                                        <div className="flex space-x-2 mb-2">
                                            <Input type="text" value={novaColunaA} onChange={e => setNovaColunaA(e.target.value)} placeholder="Texto item A" className="flexArea>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Pares Corretos (JSON)</label>
                                        <Textarea value={paresCorretosInput} onChange={e => setParesCorretosInput(e.target.value-1"/>
                                            <Button type="button" onClick={handleAddColunaA} size="sm">Add A</Button>
                                        </div>
                                        <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{colunaAItems.map(item => <li key={item.id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button)} className="h-20 font-mono text-xs" placeholder='[{"aId": 1, "bId": 101}, {"aId": 2, "bId": 102}]'/>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "PontoCerto" type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveColunaA(item.id)}>X</Button></li>)}</ul></ScrollArea>
                                    </div>
 && (
                             <Card className="bg-indigo-50 border border-indigo-200">
                                <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Ponto Certo</CardTitle></CardHeader>
                                <CardContent className="space-y-4 pt-2">
                                    <div>                                    <div> {/* Coluna B */}
                                        <h4 className="text-md font-semibold mb-2">Coluna B</h4>
                                        <div className="flex space-x-2 mb-2">
                                            <Input type="text"
                                        <label className="block text-sm font-medium mb-1">URL da Imagem Principal*</label>
                                        <Input type="text" value={imagemURLPontoCerto} onChange={e => setImagemURLPontoC value={novaColunaB} onChange={e => setNovaColunaB(e.target.value)} placeholder="Texto item B" className="flex-1"/>
                                            <Button type="button" onClick={handleAddColunaB} size="sm">erto(e.target.value)} placeholder="/images/mapa.png" />
                                    </div>
                                    {/* Preview da Imagem e Zonas */}
                                    {imagemURLPontoCerto && (
                                        <Add B</Button>
                                        </div>
                                        <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{colunaBItems.map(item => <li key={item.div className="relative border rounded overflow-hidden max-w-sm mx-auto aspect-video bg-gray-20id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={()0 my-2">
                                            <img ref={previewImageRefPontoCerto} src={imagemURLPontoCerto} alt="Preview Ponto Certo" className="block w-full h-full object-contain" onError={(e) => { e => handleRemoveColunaB(item.id)}>X</Button></li>)}</ul></ScrollArea>
                                    .currentTarget.src = '/images/placeholder_error.png'; e.currentTarget.classList.add('opacity-50');}}/>
                                            {/* Renderiza zonas existentes */}
                                            {zonasClicaveis.map(</div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Pares Corretos (JSON)</label>
                                        <Textz => (
                                                <div key={`zone-vis-${z.id}`}
                                                     className={cn( "absolute border-2 pointer-events-none", respostaCorretaPontoCerto === z.id ? "borderarea value={paresCorretosInput} onChange={e => setParesCorretosInput(e.target.value)} className="h-20 font-mono text-xs" placeholder='[{"aId": 1, "bId": 101}, {"aId": 2, "bId": 102}]'/>
                                    </div>
-green-500 bg-green-500/30" : "border-dashed border-red-500 bg-red-500/20" )}
                                                     style={{ left: `${z.x *                                 </CardContent>
                            </Card>
                        )}

                        {tipo === "PontoCerto" && (
                             <Card className="bg-indigo-50 border border-indigo-200">
                                <100}%`, top: `${z.y * 100}%`, width: `${z.largura * 100}%`, height: `${z.altura * 100}%` }}
                                                     title={`CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Ponto Certo</CardTitle></CardHeader>
                                <CardContent className="space-y-4 pt-2">
                                    <div>ID: ${z.id} - ${z.descricao || 'Zona'}`}
                                                >
                                                    <span className="absolute -top-5 left-0 text-xs bg-black/50 text-white px-1 rounded">{z.id}</span>
                                                </div>
                                            ))}
                                             {/* Renderiza preview da NOVA
                                        <label className="block text-sm font-medium mb-1">URL da Imagem Principal*</label>
                                        <Input type="text" value={imagemURLPontoCerto} onChange={e => setImagemURLPontoC zona sendo editada */}
                                              {novaZona.x != null && novaZona.y != null && novaZona.largura != null && novaZona.altura != null && parseFloat(String(novaZona.largura || 0).replace(',','.')) > 0 && parseFloat(String(novaZona.altura || 0).replace(',','.'))erto(e.target.value)} placeholder="/images/mapa.png" />
                                    </div>
                                    {/* Preview da Imagem e Zonas */}
                                    {imagemURLPontoCerto && (
 > 0 && (
                                                <div
                                                    className="absolute border-2 border-blue-500 border-dotted pointer-events-none bg-blue-500/20"
                                                    style={{
                                        <div className="relative border rounded overflow-hidden max-w-sm mx-auto aspect-video bg-gray-200 my-2">
                                            <img ref={previewImageRefPontoCerto} src={imagemURLPontoCerto}                                                         left: `${(parseFloat(String(novaZona.x).replace(',','.')) || 0) * 100}%`,
                                                         top: `${(parseFloat(String(novaZona.y).replace(',','.')) ||  alt="Preview Ponto Certo" className="block w-full h-full object-contain" onError={(e) => { e.currentTarget.src = '/images/placeholder_error.png'; e.currentTarget.classList.add('opacity-50');}}/>
                                            {zonasClicaveis.map(z => (
                                                <div0) * 100}%`,
                                                         width: `${(parseFloat(String(novaZona.largura).replace(',','.')) || 0.1) * 100}%`,
                                                         height: `${(parseFloat(String(novaZona.altura).replace(',','.')) || 0.1) * 100}%`,
                                                    }}
 key={`zone-vis-${z.id}`}
                                                     className={cn( "absolute border-2 pointer-events-none", respostaCorretaPontoCerto === z.id ? "border-green-500 bg-green-500/                                                    title="Nova Zona (Preview)"
                                                />
                                              )}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-md font-semibold mb-2">Adicionar Zona Clicável</h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-30" : "border-dashed border-red-500 bg-red-500/20" )}
                                                     style={{ left: `${z.x * 100}%`, top: `${2 mb-2 border p-2 rounded items-end bg-white">
                                            <Input type="number" placeholder="X (0-1)" value={novaZona.x ?? ""} onChange={e => handleNovaZonaChange('x', e.z.y * 100}%`, width: `${z.largura * 100}%`, height: `${z.altura * 100}%` }}
                                                     title={`ID: ${z.id} - ${z.descricao || 'Zona'}`}
                                                >
                                                    <span className="absolute -top-5 left-0 text-xs bg-black/50 text-white px-1 rounded">{z.id}</span>
                                                </div>
                                            ))}
                                             {/* Renderiza preview da NOVA zona sendo editada */}
                                              {novaZona.x != null && novaZona.y != null && novaZona.largura != null && novaZona.altura != null && (
                                                <div
                                                    className="absolute border-2 border-blue-500 border-dotted pointer-events-none bg-blue-500/20"
                                                    style={{
                                                         left: `${(parseFloattarget.value)} className="text-sm h-9" step="0.01" min="0" max="1"/>
(String(novaZona.x).replace(',','.')) || 0) * 100}%`,
                                                         top: `${(parseFloat(String(novaZona.y).replace(',','.')) || 0) * 100}%`,
                                                         width: `${(parseFloat(String(novaZona.largura).replace(',','.')) || 0.1) *                                            <Input type="number" placeholder="Y (0-1)" value={novaZona.y ?? ""} 100}%`,
                                                         height: `${(parseFloat(String(novaZona.altura).replace(',','.')) || 0.1) * 100}%`,
                                                    }}
                                                    title="Nova Zona ( onChange={e => handleNovaZonaChange('y', e.target.value)} className="text-sm h-9" step="0.01" min="0" max="1"/>
                                            <Input type="Preview)"
                                                />
                                              )}
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-md font-semibold mb-2">Adicionar Zona Clicável</h4>
                                        <number" placeholder="Largura (0-1)" value={novaZona.largura ?? ""} onChange={e => handleNovaZonaChange('largura', e.target.value)} className="text-sm h-9" stepdiv className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2 border p-2 rounded items-end bg-white">
                                            <Input type="number" placeholder="X (0-1)" value={novaZona.x ??="0.01" min="0.01" max="1"/>
                                            <Input type="number" placeholder="Altura (0-1)" value={novaZona.altura ?? ""} onChange={e => handleNova ""} onChange={e => handleNovaZonaChange('x', e.target.value)} className="text-sm h-9" step="0.01" min="0" max="1"/>
                                            <Input type="number" placeholder="Y (0-1)" value={novaZona.y ?? ""} onChange={e => handleNovaZonaChangeZonaChange('altura', e.target.value)} className="text-sm h-9" step="0.01" min="0.01" max="1"/>
                                            <Input type="text" placeholder="Descrição (Opc)" value={novaZona.descricao ?? ""} onChange={e => handleNovaZonaChange('descricao', e.target.value)} className="text-sm h-9('y', e.target.value)} className="text-sm h-9" step="0.01" min="0" max="1"/>
                                            <Input type="number" placeholder="Largura (0 col-span-2 sm:col-span-3"/>
                                            <Button type="button" onClick={handleAddZona} size="sm" className="h-9">Add Zona</Button>
                                        </div>
                                         <h4 className="text-md font-semibold mb-1 mt-3">Zonas (Selecione a correta)</h4>
                                         <ScrollArea className="h-1)" value={novaZona.largura ?? ""} onChange={e => handleNovaZonaChange('largura', e.target.value)} className="text-sm h-9" step="0.01" min="0.01" max="1"/>
                                            <Input type="number" placeholder="Altura (0--32 border rounded p-1 bg-white">
                                             <ul className="text-sm space-y-1">
                                                {zonasClicaveis.map(z => (
                                                    <li key={z.id} className1)" value={novaZona.altura ?? ""} onChange={e => handleNovaZonaChange('altura', e.target.value)} className="text-sm h-9" step="0.01" min="0.0="flex justify-between items-center odd:bg-gray-50 even:bg-white px-1 py-0.5">
                                                        <span>ID:{z.id} ({z.x},{z.y}1" max="1"/>
                                            <Input type="text" placeholder="Descrição (Opc)" value={novaZona.descricao ?? ""} onChange={e => handleNovaZonaChange('descricao', e.target.value)} className="text-sm h {z.largura}x{z.altura}) {z.descricao}</span>
                                                        <div className="flex items-center gap-1">
                                                            <Button type="button" variant={respostaCorretaPontoCerto === z-9 col-span-2 sm:col-span-3"/>
                                            <Button type="button" onClick={handleAddZona} size="sm" className="h-9">Add Zona</Button>
                                        </div>.id ? "default" : "outline"} className={cn("h-6 px-1.5 text-xs", respostaCorretaPontoCerto === z.id && "bg-green-600")} onClick={() => handleSet
                                         <h4 className="text-md font-semibold mb-1 mt-3">Zonas (Selecione a correta)</h4>
                                         <ScrollArea className="h-32 border rounded p-1 bg-white">
                               RespostaPontoCerto(z.id)}>Correta</Button>
                                                            <Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={()              <ul className="text-sm space-y-1">
                                                {zonasClicaveis.map(z => (
                                                    <li key={z.id} className="flex justify-between items-center odd => handleRemoveZona(z.id)}>X</Button>
                                                        </div>
                                                    </li>
                                                ))}
                                                 {zonasClicaveis.length === 0 && <p className="text-xs text-center text-gray-500 py:bg-gray-50 even:bg-white px-1 py-0.5">
                                                        <span>ID:{z.id} ({z.x},{z.y} {z.largura}x{z.altura}) {z.descricao}</span>
                                                        <div className="flex items-center gap-1">
                                                            <Button type="button" variant-2">Nenhuma zona.</p>}
                                             </ul>
                                         </ScrollArea>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "CompletarFrase" && (
                            <Card className="bg-pink-50 border border-pink-200">
                                 <CardHeader className="pb={respostaCorretaPontoCerto === z.id ? "default" : "outline"} className={cn("h-6 px-1.5 text-xs", respostaCorretaPontoCerto === z.id && "bg-green-600")} onClick={() => handleSetRespostaPontoCerto(z.id)}>Correta</Button>-2 pt-3"><CardTitle className="text-lg">Completar Frase</CardTitle></CardHeader>
                                 <CardContent className="space-y-4 pt-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Frase Incompleta* (use __1__, __2__)</label>
                                                            <Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveZona(z.id)}>X</Button>
                                                        </div>
                                                    </li>
                                                ))}
                                                 {zonasClicaveis.length === 0 && <p className="
                                        <Textarea value={fraseIncompleta} onChange={e => setFraseIncompleta(e.target.value)} className="h-20 font-mono text-sm" placeholder="O __1__ é essencial para a __2__."/>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-text-xs text-center text-gray-500 py-2">Nenhuma zona.</p>}
                                             </ul>
                                         </ScrollArea>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {tipo === "CompletarFrase" && (
                            <Card className="bg-pink-50 border border-semibold mb-2">Fragmentos</h4>
                                        <div className="flex space-x-2 mb-2">
                                            <Input type="text" value={novoFragmento} onChange={e => setNovoFragmento(e.target.value)} placeholder="Texto do fragmento" className="flex-1"/>
                                            <Button type="button" onClick={handleAddFragmento}>Addpink-200">
                                 <CardHeader className="pb-2 pt-3"><CardTitle className="text-lg">Completar Frase</CardTitle></CardHeader>
                                 <CardContent className="space-y-4 pt-2"> Frag.</Button>
                                        </div>
                                         <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{fragmentos.map(f => <li key={f.
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Frase Incompleta* (use __1__, __2__)</label>
                                        <Textarea value={fraseIncompleta} onChange={eid} className="flex justify-between items-center"><span>{f.id}: {f.texto}</span><Button type=" => setFraseIncompleta(e.target.value)} className="h-20 font-mono text-sm" placeholder="O __1__ é essencial para a __2__."/>
                                    </div>
                                    button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveFragmento(f.id)}>X</Button></li>)}</ul></ScrollArea>
                                    </div>
                                    <div>
                                         <label className="block text-sm font-medium mb-1">Ordem Correta* (IDs por vírgula)</label>
                                         <Input type="text" value={ordemFragmentos} onChange={e<div>
                                        <h4 className="text-md font-semibold mb-2">Fragmentos</h4>
                                        <div className="flex space-x-2 mb-2">
                                            <Input type="text" value={novoFragmento} onChange={e => setNovoFragmento(e.target.value)} placeholder="Texto do fragmento" className="flex-1"/>
                                            <Button => setOrdemFragmentos(e.target.value)} placeholder="1, 3, 2" />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Dificuldade */}
                        <div className="pt-2">
                            <label className="block text-sm font-medium mb-1">Dific type="button" onClick={handleAddFragmento}>Add Frag.</Button>
                                        </div>
                                         <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="text-sm space-y-1">{fragmentos.map(f => <li key={f.id} className="flex justify-between items-center"><span>{f.id}: {fuldade</label>
                            <Select value={dificuldade} onValueChange={(value) => setDificuldade(value as Dificuldade)}>
                                <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <Select.texto}</span><Button type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveFragmento(f.id)}>X</Button></li>)}</ul></ScrollArea>
                                    </div>
                                    <div>
                                         <label className="block text-sm font-medium mb-1">OrContent>
                                    {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Categorias e Fontes */}
                        <dem Correta* (IDs por vírgula)</label>
                                         <Input type="text" value={ordemFragmentos} onChange={e => setOrdemFragmentos(e.target.value)} placeholder="1div className="space-y-4 pt-2"> {/* Layout Vertical */}
                            <Card className="bg-gray-50 border">
                                <CardHeader className="flex flex-row items-center justify-between space-y, 3, 2" />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Dificuldade */}
                        <div className="pt-2">
                            <label className="block text-sm font-0 pb-2 pt-3">
                                    <CardTitle className="text-base font-semibold">Categorias</CardTitle>
                                    <div className="flex items-center space-x-1">
                                        <Checkbox id="lockCat" checked={categoriasBloqueadas} onCheckedChange={checked => setCategoriasBloqueadas(Boolean(checked))} />
                               -medium mb-1">Dificuldade</label>
                            <Select value={dificuldade} onValueChange={(value) => setDificuldade(value as Dificuldade)}>
                                <SelectTrigger><SelectValue placeholder="Selecione..."         <label htmlFor="lockCat" className="text-xs">Travar</label>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2 pt-2">
                                    <div className="flex /></SelectTrigger>
                                <SelectContent>
                                    {DIFFICULTIES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

 space-x-2">
                                        <Input type="text" value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} placeholder="Nova categoria" className="flex-1 h-9"/>
                                        <Button                        {/* Categorias e Fontes */}
                        <div className="space-y-4 pt-2">
                            <Card className="bg-gray-50 border">
                                <CardHeader className="flex flex-row items-center justify type="button" onClick={handleAddCategoria} size="sm" className="h-9">Add</Button>
                                    </div>
                                    <ScrollArea className="h-24 border rounded p-1 bg-white"><-between space-y-0 pb-2 pt-3">
                                    <CardTitle className="text-base font-semibold">Categorias</CardTitle>
                                    <div className="flex items-center space-x-1">
                                        <Checkbox id="ul className="space-y-1 text-sm">{categorias.map((c, i) => <li key={i} className="flex justify-between items-center"><span>{c}</span><Button type="button" variant="ghost" classNamelockCat" checked={categoriasBloqueadas} onCheckedChange={checked => setCategoriasBloqueadas(Boolean(checked))} />="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveCategoria(c)}>
                                        <label htmlFor="lockCat" className="text-xs">Travar</label>
                                    </div>X</Button></li>)}</ul></ScrollArea>
                                </CardContent>
                            </Card>
                             <Card className="bg-
                                </CardHeader>
                                <CardContent className="space-y-2 pt-2">
                                    <div className="flex space-x-2">
                                        <Input type="text" value={novaCategoria} onChange={(e) => setNovaCategoria(egray-50 border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                                     <CardTitle className="text-base font-semibold">Fontes</CardTitle>
                                      .target.value)} placeholder="Nova categoria" className="flex-1 h-9"/>
                                        <Button type="button" onClick={handleAddCategoria} size="sm" className="h-9">Add</Button>
<div className="flex items-center space-x-1">
                                          <Checkbox id="lockFont" checked={fontesBloque                                    </div>
                                    <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="space-y-1 text-sm">{categorias.map((c, i) => <li key={adas} onCheckedChange={checked => setFontesBloqueadas(Boolean(checked))} />
                                          <label htmlFor="locki} className="flex justify-between items-center"><span>{c}</span><Button type="button" variant="ghostFont" className="text-xs">Travar</label>
                                      </div>
                                </CardHeader>
                                <CardContent" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveCategoria(c)}>X</Button></li>)}</ul></ScrollArea>
                                </CardContent>
                            </Card>
                             <Card className="bg- className="space-y-2 pt-2">
                                    <div className="flex space-x-2">
                                        <Input type="text" value={novaFonte} onChange={(e) => setNovaFonte(e.target.value)} placeholder="Nova fonte" className="flex-1 h-9"/>
                                        <Button type="button" onClick={gray-50 border">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                                     <CardTitle className="text-base font-semibold">Fontes</CardTitle>handleAddFonte} size="sm" className="h-9">Add</Button>
                                    </div>
                                    <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className="space-y-1 text-sm">{fontes.map((f
                                      <div className="flex items-center space-x-1">
                                          <Checkbox id="lock, i) => <li key={i} className="flex justify-between items-center"><span>{f}</span><ButtonFont" checked={fontesBloqueadas} onCheckedChange={checked => setFontesBloqueadas(Boolean(checked))} />
                                          <label htmlFor="lockFont" className="text-xs">Travar</label>
                                       type="button" variant="ghost" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveFonte(f)}>X</Button></li>)}</ul></ScrollArea>
                                </CardContent>
                             </div>
                                </CardHeader>
                                <CardContent className="space-y-2 pt-2">
                                    <div className="flex space-x-2">
                                        <Input type="text" value={novaFonte} onChange={(e) => setNovaFonte(e.target.value)} placeholder="Nova fonte" className="flex-1</Card>
                        </div>

                        {/* Vantagem, Desvantagem, Dica */}
                        <div className="space-y-4 pt-2"> {/* Layout Vertical */}
                             <div><label className="block text-sm font-medium mb- h-9"/>
                                        <Button type="button" onClick={handleAddFonte} size="sm" className="h-9">Add</Button>
                                    </div>
                                    <ScrollArea className="h-24 border rounded p-1 bg-white"><ul className1">Vantagem (Msg Acerto)</label><Input type="text" value={vantagem} onChange={(e) => setVantagem(e.target.value)} /></div>
                            <div><label className="block="space-y-1 text-sm">{fontes.map((f, i) => <li key={ text-sm font-medium mb-1">Desvantagem (Msg Erro)</label><Input type="text" value={desvantagem} onChange={(e) => setDesvantagem(e.target.value)} /></div>
                            <div><label className="block text-sm font-medium mb-1">Dica</label><i} className="flex justify-between items-center"><span>{f}</span><Button type="button" variant="ghostInput type="text" value={dica} onChange={(e) => setDica(e.target.value)} /></div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex flex-col sm" className="text-red-500 h-6 w-6 p-0" onClick={() => handleRemoveFonte(f)}>X</Button></li>)}</ul></ScrollArea>
                                </CardContent>
                             </Card>
                        </div>

                        {/* Vantagem, Desvantagem, Dica */}
                        <div className="space-y-:flex-row sm:space-x-4 space-y-2 sm:space-y-0 pt-4 border-t">
                            <Button type="button" onClick={handleAddOrUpdateCard} className="bg-green-600 hover:bg-green-700 text-white">
                                {editIndex !== null ? "Sal4 pt-2">
                             <div><label className="block text-sm font-medium mb-1">Vantagem (Msg Acerto)</label><Input type="text" value={vantagem} onChange={(e) => setVantagem(var Edições" : "Adicionar Carta"}
                            </Button>
                            {editIndex !== null && (<Button type="button" onClick={cancelEdit} variant="outline">Cancelar Edição</Button>)}
                            {/* Bote.target.value)} /></div>
                            <div><label className="block text-sm font-medium mb-1">Desvantagem (Msg Erro)</label><Input type="text" value={desvantagem} onChange={(e) => setDesvantagem(e.target.value)} /></div>
                            <div><label className="ão de Preview Removido */}
                        </div>
                    </CardContent>
                </Card>

                 {/* Coluna Direita: Lista de Cartas e Preview Fixo */}
                 <div className="space-y-4 lg:sticky lg:top-4 self-start">
                     <Card>
                        <CardHeader>
                            <CardTitle className="textblock text-sm font-medium mb-1">Dica</label><Input type="text" value={dica} onChange={(e) => setDica(e.target.value)} /></div>
                        </div>

                        {/* Botões de Ação-xl">Baralho Atual ({cards.length} Cartas)</CardTitle>
                            <AlertDescription>Clique em uma carta abaixo para editá-la.</AlertDescription>
                        </CardHeader>
                        <CardContent>
                             {cards.length === 0 ? (<p className="text-gray-500 italic">Nenhuma */}
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 pt-4 border-t">
                            <Button type="button" onClick={handleAddOrUpdate carta.</p>) : (
                                <ScrollArea className="h-[calc(50vh-6rem)] pr-3">
                                    <div className="space-y-2">
                                        {cards.map((c, index) => (
                                            <CardCard} className="bg-green-600 hover:bg-green-700 text-white">
                                {editIndex !== null ? "Salvar Edições" : "Adicionar Carta"}
                            </Button>
                            { key={`card-display-${c.id || index}`} className={cn("hover:shadow-md transition-shadow cursor-pointereditIndex !== null && (<Button type="button" onClick={cancelEdit} variant="outline">Cancelar Edição</Button>)}
                        </div>
                    </CardContent>
                </Card>

                 {/* Coluna Direita: Lista de Cartas e Preview Fixo", editIndex === index && "ring-2 ring-blue-500")} onClick={() => loadCardForEdit(index)}>
                                                <CardContent className="p-3 flex items-start justify-between gap-2">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-xs font-semibold text-blue-700">{c.tipo} - {c.dificuldade}</p>
                                                        <p className=" */}
                 <div className="space-y-4 lg:sticky lg:top-4 self-start">
                     <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Baralho Atualfont-medium truncate" title={c.titulo}>{c.titulo || `Carta ${index + 1}`}</p>
                                                    </div>
                                                    <Button onClick={(e) => {e.stopPropagation(); deleteCard(index)}} ({cards.length} Cartas)</CardTitle>
                            <AlertDescription>Clique em uma carta abaixo para editá-la.</AlertDescription>
                        </CardHeader>
                        <CardContent>
                             {cards.length === 0 ? (<p className="text- size="sm" variant="ghost" className="text-red-500 hover:bg-red-100 h-7 w-7 p-0 flex-shrink-0">
                                                        <Trash className="hgray-500 italic">Nenhuma carta.</p>) : (
                                <ScrollArea className="h-[45vh] pr-3">
                                    <div className="space-y-2">
                                        -4 w-4"/>
                                                    </Button>
                                                </CardContent>
                                            </Card{cards.map((c, index) => (
                                            <Card key={`card-display-${c.id || index}`} className={cn("hover:shadow-md transition-shadow cursor-pointer", editIndex === index && "ring-2 ring-blue-500" )} onClick={() => loadCardForEdit(index)}>
                                                <CardContent className="p-3 flex items-start justify-between gap-2">
                                                    <div className="flex-1 overflow-hidden">
                                                        <p className="text-xs font-semibold text-blue-700">{c.tipo} - {c.dificuldade}</p>
                                                        <p className="font-medium truncate" title={c.titulo}>{>
                                        ))}
                                    </div>
                                </ScrollArea>
                             )}
                         </CardContent>
                     </Cardc.titulo || `Carta ${index + 1}`}</p>
                                                    </div>
                                                    <Button onClick={(e) => {e.stopPropagation(); deleteCard(index)}} size="sm" variant="ghost" className="text-red-50>

                     {/* Preview Estático Fixo */}
                     <Card className="mt-4">
                            <CardHeader><CardTitle className="text-lg text-center">Preview Estático</CardTitle></CardHeader>
                            0 hover:bg-red-100 h-7 w-7 p-0 flex-shrink-0">
                                                        <Trash className="h-4 w-4"/>
                                                    </Button>
                                                </CardContent>
                                            </Card><CardContent>
                                 <CardStaticView card={
                                     editIndex !== null
                                     ? cards[editIndex]
                                     : { // Monta preview da carta sendo criada
                                         tipo, titulo,
                                        ))}
                                    </div>
                                </ScrollArea>
                             )}
                         </CardContent>
                     </Card>

                     {/* Preview Estático Fixo */}
                     <Card className="mt-4">
                            <CardHeader>< pergunta, opcoes,
                                         respostaCorreta: (() => {
                                             if (tipo === 'Pergunta' || tipo === 'ContraTempo') return respostaCorreta[0];
                                             if (tipo === 'PontoCerto') return respostaCorretaPontoCerto ??CardTitle className="text-lg text-center">Preview Estático</CardTitle></CardHeader>
                            <CardContent>
                                 <CardStaticView card={
                                     editIndex !== null
                                     ? cards[editIndex] undefined;
                                             if (tipo === 'RelacionarColunas') try { return JSON.parse(pares
                                     : { // Monta preview da carta sendo criada
                                         tipo, titulo, pergunta, opcoes,
                                         respostaCorreta: (() => {
                                             if (tipo === 'Pergunta' || tipo === 'ContraTempo') return respostaCorreta[0];
                                             if (tipo === 'PontoCerto') return respostaCorretaPontoCerto ??CorretosInput || '[]'); } catch { return []; }
                                             if (tipo === 'CompletarFrase') return ordemFragmentos.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN( undefined;
                                             if (tipo === 'RelacionarColunas') try { return JSON.parse(paresCorretosInput || '[]'); } catch { return []; }
                                             if (tipo === 'CompletarFrase') return ordemn));
                                             if (tipo === 'Ordem') {
                                                const sorted = [...opcoes].sort((a, b) => (parseInt(a.ordemTemp || '999', 10)Fragmentos.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
                                             if (tipo === 'Ordem') {
                                                const sorted = [...opcoes].sort((a - parseInt(b.ordemTemp || '999', 10)));
                                                return sorted.map(o => o.id);
                                             }
                                             if (tipo === 'Vantagem'), b) => (parseInt(a.ordemTemp || '999', 10) - parseInt(b.ordemTemp || '999', 10)));
                                                return sorted.map(o => o.id); return opcoes.map(o => o.id);
                                             if (tipo === 'Desvantagem') return [];

                                             }
                                             if (tipo === 'Vantagem') return opcoes.map(o => o                                             return respostaCorreta;
                                         })(),
                                         dificuldade, categorias, fontes, vantagem, desvantagem, dica, tempoLimite,
                                         colunaA: colunaAItems, colunaB: colunaBItems, imagem.id);
                                             if (tipo === 'Desvantagem') return [];
                                             return respostaCorreta;
                                         })URL: imagemURLPontoCerto, zonasClicaveis,
                                         fraseIncompleta, fragmentos
                                     }
                                 }/>
                             </CardContent>
                         </Card>
                 </div>
             </div>
        </div>
    );
};

export default CriadorDeCarta;