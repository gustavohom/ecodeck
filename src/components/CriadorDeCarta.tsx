// src/components/CriadorDeCarta.tsx

import React, { useState, useRef, useEffect } from "react";

// --- Tipos de Dados (COPIADOS/ATUALIZADOS de EcoChallenge.tsx) ---

interface Opcao { id: number; texto: string; ordemTemp?: string; } // ordemTemp adicionado para UI
interface ItemRelacionar { id: number; texto: string; }
interface ZonaClicavel { id: number; x: number; y: number; largura: number; altura: number; descricao?: string; }
interface FragmentoCompletar { id: number; texto: string; }

interface CartaBase {
    id: string | number; tipo: string; titulo: string; pergunta: string;
    dificuldade: "facil" | "normal" | "dificil"; categorias: string[]; fontes: string[];
    vantagem: string; desvantagem: string; dica: string;
}
interface CartaPergunta extends CartaBase { tipo: "Pergunta"; opcoes: Opcao[]; respostaCorreta: number; }
interface CartaMultiplaEscolha extends CartaBase { tipo: "MultiplaEscolha"; opcoes: Opcao[]; respostaCorreta: number[]; }
interface CartaOrdem extends CartaBase { tipo: "Ordem"; opcoes: Opcao[]; respostaCorreta: number[]; } // Usa opcoes, resposta é array de IDs
interface CartaVantagem extends CartaBase { tipo: "Vantagem"; opcoes: Opcao[]; respostaCorreta: number[]; } // Geralmente todas as opcoes.id
interface CartaDesvantagem extends CartaBase { tipo: "Desvantagem"; opcoes: Opcao[]; respostaCorreta: number[]; } // Geralmente []
interface CartaOutras extends CartaBase { tipo: "Outras"; opcoes: Opcao[]; respostaCorreta: number[]; }
interface CartaContraTempo extends CartaBase { tipo: "ContraTempo"; opcoes: Opcao[]; respostaCorreta: number; tempoLimite: number; }
interface CartaRelacionarColunas extends CartaBase { tipo: "RelacionarColunas"; colunaA: ItemRelacionar[]; colunaB: ItemRelacionar[]; respostaCorreta: { aId: number; bId: number }[]; opcoes: []; }
interface CartaPontoCerto extends CartaBase { tipo: "PontoCerto"; imagemURL: string; zonasClicaveis: ZonaClicavel[]; respostaCorreta: number; opcoes: []; }
interface CartaCompletarFrase extends CartaBase { tipo: "CompletarFrase"; fraseIncompleta: string; fragmentos: FragmentoCompletar[]; respostaCorreta: number[]; opcoes: []; }

type Carta =
    | CartaPergunta | CartaMultiplaEscolha | CartaOrdem | CartaVantagem | CartaDesvantagem | CartaOutras
    | CartaContraTempo | CartaRelacionarColunas | CartaPontoCerto | CartaCompletarFrase;

// --- Fim dos Tipos ---

const CARD_TYPES = [ // Atualizado com todos os tipos
    "Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras",
    "ContraTempo", "RelacionarColunas", "PontoCerto", "CompletarFrase"
] as const;
type TipoCarta = typeof CARD_TYPES[number];

const DIFFICULTIES = ["facil", "normal", "dificil"] as const;
type Dificuldade = typeof DIFFICULTIES[number];

interface BaralhoCarregado {
    id: number; nome: string; cartas: Carta[]; adicionado: boolean;
}

// --- Componente de Preview Estático (ATUALIZADO) ---
const CardStaticView: React.FC<{ card: Partial<Carta> }> = ({ card }) => {
    // Lida com carta potencialmente incompleta durante a criação
    const {
        tipo = "Pergunta", titulo = "", pergunta = "", opcoes = [], respostaCorreta,
        dificuldade = "facil", categorias = [], fontes = [], vantagem = "", desvantagem = "", dica = "",
        // Campos específicos
        tempoLimite, colunaA, colunaB, imagemURL, zonasClicaveis, fraseIncompleta, fragmentos
    } = card;

    let renderedSpecifics: React.ReactNode = null;
    let renderedOptions: React.ReactNode = null;

    // Renderiza campos específicos do tipo
    switch (tipo) {
        case "ContraTempo":
            renderedSpecifics = <p className="text-xs text-orange-600">Tempo Limite: {tempoLimite || '?'}s</p>;
            break;
        case "RelacionarColunas":
            renderedSpecifics = (
                <div className="flex gap-4 text-xs mt-2">
                    <div className="flex-1"><strong>Coluna A:</strong><ul>{colunaA?.map(i => <li key={`a-${i.id}`}>{i.id}: {i.texto}</li>)}</ul></div>
                    <div className="flex-1"><strong>Coluna B:</strong><ul>{colunaB?.map(i => <li key={`b-${i.id}`}>{i.id}: {i.texto}</li>)}</ul></div>
                </div>
            );
            // Resposta formatada
             const pairs = Array.isArray(respostaCorreta) ? (respostaCorreta as {aId: number, bId: number}[]).map(p => `${p.aId}-${p.bId}`).join(', ') : 'Inválida';
             renderedOptions = <p className="text-xs mt-1">Pares Corretos: [{pairs}]</p>;
            break;
        case "PontoCerto":
            renderedSpecifics = (
                <>
                    <p className="text-xs">Imagem: {imagemURL || '(Nenhuma)'}</p>
                    {zonasClicaveis && zonasClicaveis.length > 0 && (
                        <details className="text-xs mt-1">
                            <summary className="cursor-pointer">Zonas Clicáveis ({zonasClicaveis.length})</summary>
                            <ul>{zonasClicaveis.map(z => <li key={z.id}>ID:{z.id} ({z.x},{z.y} - {z.largura}x{z.altura}) {z.descricao}</li>)}</ul>
                        </details>
                    )}
                </>
            );
            renderedOptions = <p className="text-xs mt-1">Zona Correta ID: {typeof respostaCorreta === 'number' ? respostaCorreta : 'Inválido'}</p>;
            break;
        case "CompletarFrase":
            renderedSpecifics = <p className="text-xs mt-1 italic">Frase: "{fraseIncompleta || '...'}"</p>;
            renderedOptions = (
                <>
                 {fragmentos && fragmentos.length > 0 && (
                    <details className="text-xs mt-1">
                        <summary className="cursor-pointer">Fragmentos ({fragmentos.length})</summary>
                        <ul>{fragmentos.map(f => <li key={f.id}>{f.id}: {f.texto}</li>)}</ul>
                    </details>
                  )}
                 <p className="text-xs mt-1">Ordem Correta: [{(Array.isArray(respostaCorreta) ? respostaCorreta.join(', ') : 'Inválida')}]</p>
                </>
            );
            break;
        default:
            // Para os tipos com opções padrão
            const correctSet = new Set<number>();
            if (tipo === "Vantagem") {
                opcoes.forEach(o => correctSet.add(o.id));
            } else if (tipo !== "Desvantagem") { // Pergunta, Multipla, Outras
                if (Array.isArray(respostaCorreta)) { respostaCorreta.forEach(id => typeof id === 'number' && correctSet.add(id)); }
                else if (typeof respostaCorreta === 'number') { correctSet.add(respostaCorreta); }
            }

            renderedOptions = (
                <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyle: 'decimal' }}>
                    {opcoes.map((op) => {
                        const isCorrect = correctSet.has(op.id);
                        const orderInfo = tipo === 'Ordem' && Array.isArray(respostaCorreta) && (respostaCorreta as number[]).includes(op.id)
                            ? ` (Pos: ${(respostaCorreta as number[]).indexOf(op.id) + 1})`
                            : tipo === 'Ordem' ? ` (Ordem Inválida)` : '';

                        return (
                            <li key={op.id} className={cn("mb-1 text-sm", isCorrect && "text-green-700 font-semibold")}>
                                {op.texto}
                                {isCorrect && tipo !== 'Vantagem' && tipo !== 'Ordem' && <span className="text-green-600 text-xs"> (Correta)</span>}
                                {tipo === 'Ordem' && orderInfo}
                            </li>
                        );
                    })}
                </ul>
            );
            break;
    }

    return (
        <div className="border border-gray-300 rounded-lg p-4 max-w-md mx-auto my-4 bg-white shadow">
            <h2 className="text-lg font-bold mb-1">{titulo || "(Sem Título)"}</h2>
            <p className="text-xs text-gray-500 mb-2">
                Tipo: <span className="font-medium">{tipo}</span> | Dificuldade: <span className="font-medium capitalize">{dificuldade}</span>
            </p>

            {/* Renderiza campos específicos primeiro, se houver */}
            {renderedSpecifics}

            {/* Renderiza a pergunta/descrição principal */}
            <div className="text-sm my-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: pergunta || "(Sem Pergunta)" }} />

            {/* Renderiza opções ou info de resposta */}
            {renderedOptions}

            {/* Info Adicional */}
            <div className="mt-3 text-xs text-gray-600 border-t pt-2">
                {categorias.length > 0 && <p>Categorias: {categorias.join(", ")}</p>}
                {fontes.length > 0 && <p>Fontes: {fontes.join(", ")}</p>}
            </div>
            {dica && <p className="text-xs text-blue-600 mt-1"><strong>Dica:</strong> {dica}</p>}
            {vantagem && <p className="text-xs text-green-600 mt-1"><strong>Vantagem:</strong> {vantagem}</p>}
            {desvantagem && <p className="text-xs text-red-600 mt-1"><strong>Desvantagem:</strong> {desvantagem}</p>}
        </div>
    );
};


// --- Componente Criador Principal (ATUALIZADO) ---
const CriadorDeCarta: React.FC = () => {
    const [deckName, setDeckName] = useState("meu_baralho");
    const [cards, setCards] = useState<Carta[]>([]);

    // Estados da Carta Atual
    const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
    const [titulo, setTitulo] = useState("");
    const [pergunta, setPergunta] = useState("");
    const [opcoes, setOpcoes] = useState<Opcao[]>([]);
    const [novaOpcao, setNovaOpcao] = useState("");
    const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]); // Sempre array para UI, converte no save
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

    // Estados específicos dos novos tipos
    const [tempoLimite, setTempoLimite] = useState<number>(30);
    const [colunaAItems, setColunaAItems] = useState<ItemRelacionar[]>([]); // Para RelacionarColunas
    const [novaColunaA, setNovaColunaA] = useState("");
    const [colunaBItems, setColunaBItems] = useState<ItemRelacionar[]>([]); // Para RelacionarColunas
    const [novaColunaB, setNovaColunaB] = useState("");
    const [paresCorretosInput, setParesCorretosInput] = useState(""); // Input para JSON dos pares
    const [imagemURLPontoCerto, setImagemURLPontoCerto] = useState(""); // Para PontoCerto
    const [zonasClicaveis, setZonasClicaveis] = useState<ZonaClicavel[]>([]); // Para PontoCerto
    const [novaZona, setNovaZona] = useState<Partial<ZonaClicavel>>({}); // Para PontoCerto
    const [respostaCorretaPontoCerto, setRespostaCorretaPontoCerto] = useState<number | null>(null); // Para PontoCerto
    const [fraseIncompleta, setFraseIncompleta] = useState(""); // Para CompletarFrase
    const [fragmentos, setFragmentos] = useState<FragmentoCompletar[]>([]); // Para CompletarFrase
    const [novoFragmento, setNovoFragmento] = useState("");
    const [ordemFragmentos, setOrdemFragmentos] = useState(""); // Input para ordem correta

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
    const [manterCartasEditadas, setManterCartasEditadas] = useState(false);
    const perguntaTextareaRef = useRef<HTMLTextAreaElement>(null); // Ref para inserir HTML

    // Funções de Carregar/Gerenciar Baralhos (sem mudanças significativas)
    const parseJSDeckFileLocal = (content: string): Carta[] => { /* ... (igual anterior) ... */
        const match = content.match(/export default\s+(\[[\s\S]*?\]);?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?\s*export default\s+\w+;?/m) || content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
        if (!match || !match[1]) { throw new Error("Array não encontrado no arquivo JS."); }
        const arrayStr = match[1]; const rawArray = new Function(`return ${arrayStr};`)() as any[];
        return rawArray.map((card, index) => ({ ...card, id: card.id || `custom_${Date.now()}_${index}` })) as Carta[];
     };
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => { /* ... (igual anterior) ... */
        const files = e.target.files; if (!files) return;
        const newBaralhos: BaralhoCarregado[] = []; setIsLoading(true); setErrorMessage(null);
        for (let i = 0; i < files.length; i++) {
            const file = files[i]; const content = await file.text();
            try {
                let newCards: Carta[] = []; const nome = file.name.replace(/\.(js|json)$/, "");
                if (baralhosCarregados.some(b => b.nome === nome)) { errors.push(`Baralho "${nome}" já carregado.`); continue; } // Evita duplicar na lista
                if (file.name.endsWith(".js")) { newCards = parseJSDeckFileLocal(content); }
                else if (file.name.endsWith(".json")) { newCards = JSON.parse(content) as Carta[]; }
                else { alert("Formato não suportado."); continue; }
                newBaralhos.push({ id: Date.now() + Math.random(), nome, cartas: newCards, adicionado: false });
            } catch (error: any) { alert(`Erro ao ler ${file.name}: ${error.message}`); }
        }
        if (newBaralhos.length > 0) { setBaralhosCarregados((prev) => [...prev, ...newBaralhos]); }
        setIsLoading(false); e.target.value = ''; // Limpa input
     };
    const adicionarBaralho = (baralhoId: number) => { /* ... (igual anterior) ... */
        setBaralhosCarregados((prev) => prev.map((b) => {
            if (b.id === baralhoId && !b.adicionado) {
                const newCards = b.cartas.map((c) => ({ ...c, id: c.id || `${b.nome}_${Math.random().toString(16).slice(2)}`, origBaralhoId: b.id, edited: false }));
                setCards((oldCards) => [...oldCards, ...newCards]); return { ...b, adicionado: true };
            } return b;
        }));
     };
    const removerBaralho = (baralhoId: number) => { /* ... (igual anterior) ... */
         setBaralhosCarregados((prev) => prev.map((b) => {
            if (b.id === baralhoId && b.adicionado) {
                setCards((oldCards) => oldCards.filter((c) => {
                    if (c.origBaralhoId === baralhoId) { return c.edited && manterCartasEditadas; } return true;
                })); return { ...b, adicionado: false };
            } return b;
         }));
     };
     const [isLoading, setIsLoading] = useState(false); // Adicionado estado de loading
     const [errorMessage, setErrorMessage] = useState<string | null>(null); // Adicionado estado de erro
     const [errors, setErrors] = useState<string[]>([]); // Adicionado estado de erros

    // --- Handlers para Opções, Categorias, Fontes (ATUALIZADOS/ADICIONADOS) ---
    const handleAddOpcao = () => {
        if (novaOpcao.trim() !== "") {
            const newId = opcoes.length > 0 ? Math.max(...opcoes.map(o => o.id)) + 1 : 1;
            setOpcoes(prev => [...prev, { id: newId, texto: novaOpcao, ordemTemp: tipo === 'Ordem' ? '' : undefined }]);
            setNovaOpcao("");
        }
    };
    const handleRemoveOpcao = (id: number) => {
        setOpcoes((prev) => prev.filter(o => o.id !== id));
        // Remove da resposta correta também, se estiver lá
        setRespostaCorreta((prev) => prev.filter(rcId => rcId !== id));
    };
    const handleToggleRespostaCorreta = (id: number) => {
        if (tipo === "Pergunta" || tipo === "ContraTempo") {
            setRespostaCorreta(prev => prev.includes(id) ? [] : [id]); // Só pode ter uma
        } else if (tipo === "MultiplaEscolha" || tipo === "Outras") {
            setRespostaCorreta(prev => prev.includes(id) ? prev.filter(rcId => rcId !== id) : [...prev, id]);
        }
        // Vantagem/Desvantagem/Ordem são tratados ao salvar
    };
    const handleSetOrder = (optionId: number, orderValue: string) => {
        setOpcoes(prev => prev.map(op => op.id === optionId ? { ...op, ordemTemp: orderValue } : op));
    };

    // Coluna A
    const handleAddColunaA = () => { if (novaColunaA.trim()) { const newId = colunaAItems.length > 0 ? Math.max(...colunaAItems.map(i => i.id)) + 1 : 1; setColunaAItems(prev => [...prev, { id: newId, texto: novaColunaA }]); setNovaColunaA(""); }};
    const handleRemoveColunaA = (id: number) => setColunaAItems(prev => prev.filter(i => i.id !== id));
    // Coluna B
    const handleAddColunaB = () => { if (novaColunaB.trim()) { const newId = colunaBItems.length > 0 ? Math.max(...colunaBItems.map(i => i.id)) + 1 : 101; setColunaBItems(prev => [...prev, { id: newId, texto: novaColunaB }]); setNovaColunaB(""); }}; // Começa ID de B em 101 para evitar conflito fácil
    const handleRemoveColunaB = (id: number) => setColunaBItems(prev => prev.filter(i => i.id !== id));

     // Zonas Clicáveis
     const handleAddZona = () => {
         const id = zonasClicaveis.length > 0 ? Math.max(...zonasClicaveis.map(z => z.id)) + 1 : 1;
         const x = parseFloat(String(novaZona.x || 0));
         const y = parseFloat(String(novaZona.y || 0));
         const w = parseFloat(String(novaZona.largura || 0.1)); // Default 10%
         const h = parseFloat(String(novaZona.altura || 0.1)); // Default 10%
         if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
            setZonasClicaveis(prev => [...prev, { id, x, y, largura: w, altura: h, descricao: novaZona.descricao || "" }]);
            setNovaZona({}); // Limpa o formulário da nova zona
         } else {
            alert("Valores inválidos para a zona (X, Y, Largura, Altura devem ser números > 0). Use ponto como separador decimal.");
         }
     };
    const handleRemoveZona = (id: number) => { setZonasClicaveis(prev => prev.filter(z => z.id !== id)); if (respostaCorretaPontoCerto === id) setRespostaCorretaPontoCerto(null); };
    const handleNovaZonaChange = (field: keyof Partial<ZonaClicavel>, value: string | number) => { setNovaZona(prev => ({ ...prev, [field]: value })); };
    const handleSetRespostaPontoCerto = (id: number) => setRespostaCorretaPontoCerto(id);

    // Fragmentos
    const handleAddFragmento = () => { if (novoFragmento.trim()) { const newId = fragmentos.length > 0 ? Math.max(...fragmentos.map(f => f.id)) + 1 : 1; setFragmentos(prev => [...prev, { id: newId, texto: novoFragmento }]); setNovoFragmento(""); }};
    const handleRemoveFragmento = (id: number) => setFragmentos(prev => prev.filter(f => f.id !== id));

    // Categorias e Fontes (sem mudanças)
    const handleAddCategoria = () => { if (novaCategoria.trim() !== "" && !categorias.includes(novaCategoria)) { setCategorias((old) => [...old, novaCategoria]); setNovaCategoria(""); } };
    const handleRemoveCategoria = (cat: string) => { setCategorias((old) => old.filter((c) => c !== cat)); };
    const handleAddFonte = () => { if (novaFonte.trim() !== "" && !fontes.includes(novaFonte)) { setFontes((old) => [...old, novaFonte]); setNovaFonte(""); } };
    const handleRemoveFonte = (f: string) => { setFontes((old) => old.filter((fon) => fon !== f)); };

    // --- Função para Inserir HTML de Popup ---
    const inserirTemplatePopup = (tipoPopup: 'imagem' | 'video') => {
        const idUnico = `popup-${Date.now()}`; // Gera um ID único para o target
        const templateCSS = `\n<style>\n.popup-overlay-${idUnico} { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.75); display: none; justify-content: center; align-items: center; z-index: 1000; padding: 20px; box-sizing: border-box; }\n.popup-overlay-${idUnico}:target { display: flex; }\n.popup-content-${idUnico} { position: relative; background-color: #fff; padding: 20px; border-radius: 8px; max-width: 90%; max-height: 90%; overflow: auto; }\n.popup-content-${idUnico} img, .popup-content-${idUnico} video { display: block; max-width: 100%; max-height: 80vh; height: auto; margin: 0 auto 15px auto; }\n.popup-close-${idUnico} { position: absolute; top: 10px; right: 15px; font-size: 24px; font-weight: bold; color: #555; text-decoration: none; line-height: 1; }\n.popup-close-${idUnico}:hover { color: #000; }\n.thumb-link-${idUnico} { display: inline-block; cursor: zoom-in; border: 1px solid #ccc; padding: 3px; border-radius: 4px; background: white; }\n.thumb-link-${idUnico} img, .thumb-link-${idUnico} video { max-width: 180px; height: auto; display: block; }\n</style>\n`;
        let templateElemento: string;

        if (tipoPopup === 'imagem') {
            templateElemento = `<!-- Link/Thumb da Imagem -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\">\n  <img src=\"/images/placeholder_thumb.png\" alt=\"Clique para ampliar\"/>\n</a>\n\n<!-- Popup da Imagem -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\">\n  <div class=\"popup-content-${idUnico}\">\n    <a href=\"#\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>\n    <img src=\"/images/placeholder_grande.png\" alt=\"Imagem Ampliada\"/>\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">Descrição da Imagem</p>\n  </div>\n</div>\n`;
        } else { // Video
            templateElemento = `<!-- Link/Thumb do Vídeo -->\n<a href=\"#${idUnico}\" class=\"thumb-link-${idUnico}\">\n  <span>🎬 Clique para ver o vídeo</span> <!-- Ou uma imagem de thumbnail -->\n</a>\n\n<!-- Popup do Vídeo -->\n<div id=\"${idUnico}\" class=\"popup-overlay-${idUnico}\">\n  <div class=\"popup-content-${idUnico}\">\n    <a href=\"#\" class=\"popup-close-${idUnico}\" title=\"Fechar\">×</a>\n    <video controls width=\"100%\" style=\"max-width: 700px; max-height: 70vh;\">\n      <source src=\"/videos/placeholder_video.mp4\" type=\"video/mp4\">\n      Seu navegador não suporta vídeo.\n    </video>\n    <p style=\"text-align: center; font-size: 0.9em; color: #666;\">Descrição do Vídeo</p>\n  </div>\n</div>\n`;
        }

        const htmlParaInserir = templateCSS + templateElemento;

        // Insere no textarea na posição atual do cursor, ou no final
        const textarea = perguntaTextareaRef.current;
        if (textarea) {
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const textoAtual = textarea.value;
            const novoTexto = textoAtual.substring(0, start) + htmlParaInserir + textoAtual.substring(end);
            setPergunta(novoTexto);
            // Foca e ajusta o cursor para depois do texto inserido (opcional)
            // textarea.focus();
            // setTimeout(() => textarea.setSelectionRange(start + htmlParaInserir.length, start + htmlParaInserir.length), 0);
        } else {
            setPergunta(prev => prev + htmlParaInserir); // Fallback: adiciona no final
        }
    };


    // --- Reset e Save/Update (ATUALIZADOS) ---
    const resetCarta = () => {
        setTipo("Pergunta"); setTitulo(""); setPergunta(""); setOpcoes([]); setNovaOpcao("");
        setRespostaCorreta([]); setDificuldade("facil");
        setVantagem(""); setDesvantagem(""); setDica("");
        setTempoLimite(30); setColunaAItems([]); setNovaColunaA(""); setColunaBItems([]); setNovaColunaB(""); setParesCorretosInput("");
        setImagemURLPontoCerto(""); setZonasClicaveis([]); setNovaZona({}); setRespostaCorretaPontoCerto(null);
        setFraseIncompleta(""); setFragmentos([]); setNovoFragmento(""); setOrdemFragmentos("");
        if (!categoriasBloqueadas) setCategorias([]);
        if (!fontesBloqueadas) setFontes([]);
        setEditIndex(null); setShowPreview(false);
    };

    const handleAddOrUpdateCard = () => {
        // Validar campos obrigatórios básicos
        if (!titulo.trim() || !tipo) {
            alert("Título e Tipo são obrigatórios.");
            return;
        }

        let finalRespostaCorreta: number | number[] | { aId: number; bId: number }[] = [];
        let cartaEspecificaProps: Partial<Carta> = {};

        // Lógica baseada no tipo selecionado
        switch (tipo) {
            case "Pergunta":
            case "ContraTempo":
                if (respostaCorreta.length !== 1) { alert(`Tipo ${tipo} exige exatamente uma resposta correta.`); return; }
                finalRespostaCorreta = respostaCorreta[0];
                cartaEspecificaProps = { opcoes, tempoLimite: tipo === 'ContraTempo' ? tempoLimite : undefined };
                break;
            case "MultiplaEscolha":
            case "Outras":
                finalRespostaCorreta = respostaCorreta; // Já é array
                cartaEspecificaProps = { opcoes };
                break;
            case "Ordem":
                const posicoes = new Set<number>();
                const ordemIds: number[] = [];
                let ordemValida = true;
                opcoes.forEach(op => {
                    const pos = op.ordemTemp?.trim() ? parseInt(op.ordemTemp, 10) : NaN;
                    if (isNaN(pos) || pos <= 0 || pos > opcoes.length || posicoes.has(pos)) {
                        ordemValida = false;
                    } else {
                        posicoes.add(pos);
                        ordemIds[pos - 1] = op.id; // Monta array na ordem correta
                    }
                });
                if (!ordemValida || posicoes.size !== opcoes.length) { alert("Erro na definição da ordem: Verifique se todas as posições de 1 a N foram usadas exatamente uma vez."); return; }
                finalRespostaCorreta = ordemIds;
                cartaEspecificaProps = { opcoes }; // Salva opcoes originais
                break;
            case "Vantagem":
                finalRespostaCorreta = opcoes.map(o => o.id); // Todas opções são "corretas"
                cartaEspecificaProps = { opcoes };
                break;
            case "Desvantagem":
                finalRespostaCorreta = []; // Nenhuma opção é "correta"
                cartaEspecificaProps = { opcoes };
                break;
            case "RelacionarColunas":
                try {
                    const pares = JSON.parse(paresCorretosInput);
                    if (!Array.isArray(pares) || !pares.every(p => typeof p === 'object' && 'aId' in p && 'bId' in p && typeof p.aId === 'number' && typeof p.bId === 'number')) {
                        throw new Error();
                    }
                    finalRespostaCorreta = pares;
                } catch { alert("Formato inválido para 'Pares Corretos'. Use JSON: [{aId: 1, bId: 10}, ...]"); return; }
                cartaEspecificaProps = { colunaA: colunaAItems, colunaB: colunaBItems, opcoes: [] };
                break;
            case "PontoCerto":
                if (!imagemURLPontoCerto) { alert("URL da Imagem é obrigatória para Ponto Certo."); return; }
                if (zonasClicaveis.length === 0) { alert("Adicione pelo menos uma Zona Clicável."); return; }
                if (respostaCorretaPontoCerto === null || !zonasClicaveis.some(z => z.id === respostaCorretaPontoCerto)) { alert("Selecione uma Zona Correta válida."); return; }
                finalRespostaCorreta = respostaCorretaPontoCerto;
                cartaEspecificaProps = { imagemURL: imagemURLPontoCerto, zonasClicaveis, opcoes: [] };
                break;
            case "CompletarFrase":
                if (!fraseIncompleta.trim()) { alert("Frase Incompleta é obrigatória."); return; }
                if (fragmentos.length === 0) { alert("Adicione pelo menos um Fragmento."); return; }
                const ordemIdsFrag = ordemFragmentos.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
                if (ordemIdsFrag.length === 0 || !ordemIdsFrag.every(id => fragmentos.some(f => f.id === id))) { alert("Ordem dos Fragmentos inválida ou IDs não encontrados."); return; }
                finalRespostaCorreta = ordemIdsFrag;
                cartaEspecificaProps = { fraseIncompleta, fragmentos, opcoes: [] };
                break;
        }

        const novaCarta: Carta = {
            id: editIndex !== null ? cards[editIndex].id : `new_${Date.now()}`, // Mantém ID antigo ou gera novo
            tipo, titulo, pergunta, dificuldade, categorias, fontes,
            vantagem, desvantagem, dica,
            respostaCorreta: finalRespostaCorreta,
            ...cartaEspecificaProps, // Adiciona props específicas do tipo
        } as Carta; // Cast final para garantir tipo

        if (editIndex !== null) {
            setCards((oldCards) => oldCards.map((c, i) => i === editIndex ? { ...novaCarta, origBaralhoId: c.origBaralhoId, edited: true } : c ));
        } else {
            setCards((oldCards) => [...oldCards, { ...novaCarta, edited: true }]);
        }
        resetCarta();
    };

    // --- Load Card for Edit (ATUALIZADO) ---
    const loadCardForEdit = (index: number) => {
        setShowPreview(false);
        resetCarta(); // Limpa tudo antes de carregar

        const carta = cards[index];
        setEditIndex(index);
        setTipo(carta.tipo as TipoCarta);
        setTitulo(carta.titulo);
        setPergunta(carta.pergunta); // Carrega HTML como está, sem tentar extrair imagem daqui
        setDificuldade(carta.dificuldade as Dificuldade);
        setCategorias(carta.categorias); setFontes(carta.fontes);
        setVantagem(carta.vantagem); setDesvantagem(carta.desvantagem); setDica(carta.dica);

        // Carrega campos específicos do tipo
        switch (carta.tipo) {
            case "Pergunta":
            case "MultiplaEscolha":
            case "Vantagem":
            case "Desvantagem":
            case "Outras":
                setOpcoes((carta as any).opcoes ? [...(carta as any).opcoes] : []);
                const rcArray = Array.isArray(carta.respostaCorreta) ? carta.respostaCorreta : (typeof carta.respostaCorreta === 'number' ? [carta.respostaCorreta] : []);
                setRespostaCorreta(rcArray.filter(id => typeof id === 'number')); // Garante array de números
                break;
            case "Ordem":
                 setOpcoes((carta as CartaOrdem).opcoes.map(op => ({...op}))); // Copia opções
                 if (Array.isArray(carta.respostaCorreta)) {
                     const ordemCorreta = carta.respostaCorreta as number[];
                     setOpcoes(currentOpts => currentOpts.map(op => {
                         const pos = ordemCorreta.indexOf(op.id);
                         return {...op, ordemTemp: pos >= 0 ? String(pos + 1) : "" };
                     }));
                     setRespostaCorreta(ordemCorreta); // Mantém a ordem correta para referência
                 }
                 break;
            case "ContraTempo":
                setOpcoes((carta as CartaContraTempo).opcoes ? [...(carta as CartaContraTempo).opcoes] : []);
                setTempoLimite((carta as CartaContraTempo).tempoLimite || 30);
                setRespostaCorreta(typeof carta.respostaCorreta === 'number' ? [carta.respostaCorreta] : []);
                break;
            case "RelacionarColunas":
                const cRel = carta as CartaRelacionarColunas;
                setColunaAItems(cRel.colunaA ? [...cRel.colunaA] : []);
                setColunaBItems(cRel.colunaB ? [...cRel.colunaB] : []);
                setParesCorretosInput(Array.isArray(cRel.respostaCorreta) ? JSON.stringify(cRel.respostaCorreta) : "");
                setOpcoes([]); setRespostaCorreta([]);
                break;
            case "PontoCerto":
                const cPonto = carta as CartaPontoCerto;
                setImagemURLPontoCerto(cPonto.imagemURL || "");
                setZonasClicaveis(cPonto.zonasClicaveis ? [...cPonto.zonasClicaveis] : []);
                setRespostaCorretaPontoCerto(typeof cPonto.respostaCorreta === 'number' ? cPonto.respostaCorreta : null);
                setOpcoes([]); setRespostaCorreta([]);
                break;
            case "CompletarFrase":
                const cFrase = carta as CartaCompletarFrase;
                setFraseIncompleta(cFrase.fraseIncompleta || "");
                setFragmentos(cFrase.fragmentos ? [...cFrase.fragmentos] : []);
                setOrdemFragmentos(Array.isArray(cFrase.respostaCorreta) ? cFrase.respostaCorreta.join(', ') : "");
                setOpcoes([]); setRespostaCorreta([]);
                break;
        }
    };

    const deleteCard = (index: number) => {
        if(window.confirm(`Tem certeza que deseja excluir a carta "${cards[index]?.titulo || `Carta ${index+1}`}"?`)){
             setCards((old) => old.filter((_, i) => i !== index));
             if (editIndex === index) { resetCarta(); }
        }
    };
    const cancelEdit = () => { resetCarta(); };

    // --- Download ---
    const prepareForDownload = (): Partial<Carta>[] => {
        return cards.map(({ origBaralhoId, edited, ...rest }) => {
            // Limpa campos não relevantes para o tipo atual antes de salvar
            const cardData: Partial<Carta> = { ...rest };
            if (rest.tipo !== "ContraTempo") delete (cardData as Partial<CartaContraTempo>).tempoLimite;
            if (rest.tipo !== "RelacionarColunas") { delete (cardData as Partial<CartaRelacionarColunas>).colunaA; delete (cardData as Partial<CartaRelacionarColunas>).colunaB; }
            if (rest.tipo !== "PontoCerto") { delete (cardData as Partial<CartaPontoCerto>).imagemURL; delete (cardData as Partial<CartaPontoCerto>).zonasClicaveis; }
            if (rest.tipo !== "CompletarFrase") { delete (cardData as Partial<CartaCompletarFrase>).fraseIncompleta; delete (cardData as Partial<CartaCompletarFrase>).fragmentos; }
            if (!["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(rest.tipo)) { delete (cardData as CartaPergunta).opcoes; } // Remove opcoes se não for tipo compatível
            if (rest.tipo === "RelacionarColunas" || rest.tipo === "PontoCerto" || rest.tipo === "CompletarFrase") { cardData.opcoes = []; } // Garante opcoes vazias
            return cardData;
        });
    };
    const generateCode = (format: 'js' | 'json') => {
        const deckFinal = prepareForDownload();
        if (format === 'json') {
            return JSON.stringify(deckFinal, null, 2);
        } else {
            const deck = JSON.stringify(deckFinal, null, 2);
            return `const ${deckName || 'meu_baralho'} = ${deck};\n\nexport default ${deckName || 'meu_baralho'};`;
        }
    };
    const downloadCode = (format: 'js' | 'json') => {
        const element = document.createElement("a");
        const fileContent = generateCode(format);
        const fileType = format === 'js' ? 'text/javascript' : 'application/json';
        const fileName = `${deckName || 'meu_baralho'}.${format}`;
        const file = new Blob([fileContent], { type: fileType });
        element.href = URL.createObjectURL(file);
        element.download = fileName;
        document.body.appendChild(element); element.click(); document.body.removeChild(element);
    };

    // --- JSX do Criador ---
    return (
        <div className="p-4 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Criador de Cartas Eco Challenge</h1>

            {/* Nome do Baralho e Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow p-4 rounded">
                    <label className="block text-sm font-medium mb-2">Nome do Baralho (para arquivo .js):</label>
                    <Input
                        type="text"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value.replace(/[^a-zA-Z0-9_]/g, '_'))} // Sanitiza nome
                        placeholder="meu_baralho"
                        className="border p-2 w-full rounded"
                    />
                </div>
                <div className="bg-white shadow p-4 rounded space-y-2">
                    <h2 className="text-lg font-semibold">Carregar Baralhos Existentes</h2>
                    <Input type="file" accept=".js,.json" onChange={handleFileUpload} multiple />
                    {isLoading && <p className="text-sm text-blue-600">Carregando...</p>}
                    {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                </div>
            </div>

            {/* Lista de Baralhos Carregados */}
            {baralhosCarregados.length > 0 && (
                <div className="bg-white shadow p-4 rounded mb-6 space-y-3">
                    <h2 className="text-xl font-semibold">Gerenciar Baralhos Carregados</h2>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="manterEditadas" checked={manterCartasEditadas} onChange={(e) => setManterCartasEditadas(e.target.checked)} />
                        <label htmlFor="manterEditadas" className="text-sm">Manter cartas editadas ao remover baralho</label>
                    </div>
                    <ul className="space-y-2 max-h-48 overflow-y-auto">
                        {baralhosCarregados.map((b) => (
                            <li key={b.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                                <div>
                                    <span className="font-medium">{b.nome}</span>
                                    <span className="text-sm text-gray-500 ml-2">({b.cartas.length} cartas)</span>
                                </div>
                                {!b.adicionado ? (
                                    <Button onClick={() => adicionarBaralho(b.id)} size="sm" variant="outline" className="bg-green-100 border-green-300 text-green-800 hover:bg-green-200">Adicionar ao Editor</Button>
                                ) : (
                                    <Button onClick={() => removerBaralho(b.id)} size="sm" variant="destructive">Remover do Editor</Button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Formulário de Criação/Edição */}
            <h2 className="text-2xl font-bold mb-4">{editIndex !== null ? `Editando: ${cards[editIndex]?.titulo || `Carta ${editIndex + 1}`}` : "Criar Nova Carta"}</h2>
            <div className="bg-white shadow p-6 rounded mb-6 space-y-6">

                {/* Campos Comuns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tipo da Carta*</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoCarta)} className="border p-2 rounded w-full bg-white">
                            {CARD_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Título da Carta*</label>
                        <Input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="border p-2 w-full rounded" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Pergunta/Descrição* (HTML permitido)</label>
                    <textarea
                        ref={perguntaTextareaRef} // Adiciona a ref
                        value={pergunta}
                        onChange={(e) => setPergunta(e.target.value)}
                        className="border p-2 w-full rounded h-32 font-mono text-sm"
                        placeholder="Escreva a pergunta ou descrição. Use HTML se precisar."
                    />
                    <div className="flex gap-2 mt-1">
                        <Button type="button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('imagem')}>Inserir Popup Imagem</Button>
                        <Button type="button" size="sm" variant="outline" onClick={() => inserirTemplatePopup('video')}>Inserir Popup Vídeo</Button>
                    </div>
                </div>

                {/* Campos Condicionais */}
                {/* Opções (para tipos compatíveis) */}
                {["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "ContraTempo"].includes(tipo) && (
                    <div className="bg-gray-50 p-4 rounded space-y-4 border">
                        <h3 className="text-lg font-semibold text-gray-800">Opções de Resposta</h3>
                        <div className="flex space-x-2">
                            <Input type="text" value={novaOpcao} onChange={(e) => setNovaOpcao(e.target.value)} placeholder="Texto da nova opção" className="border p-2 rounded flex-1"/>
                            <Button type="button" onClick={handleAddOpcao}>Adicionar Opção</Button>
                        </div>
                        <ul className="space-y-3">
                            {opcoes.map((o) => (
                                <li key={o.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 border-t pt-2">
                                    <span className="flex-1 text-sm py-1">{o.id}: {o.texto}</span>
                                    {tipo === "Ordem" && (
                                        <div className="flex items-center space-x-1 my-1">
                                            <label htmlFor={`order-${o.id}`} className="text-xs">Pos:</label>
                                            <Input id={`order-${o.id}`} type="number" min="1" step="1" onChange={(e) => handleSetOrder(o.id, e.target.value)} value={o.ordemTemp ?? ""} className="border p-1 w-16 rounded text-sm h-8"/>
                                        </div>
                                    )}
                                    {(tipo === "Pergunta" || tipo === "MultiplaEscolha" || tipo === "Outras" || tipo === "ContraTempo") && tipo !== "Vantagem" && tipo !== "Desvantagem" && (
                                        <Button type="button" onClick={() => handleToggleRespostaCorreta(o.id)} variant={respostaCorreta.includes(o.id) ? "default" : "outline"} size="sm" className={cn(respostaCorreta.includes(o.id) && "bg-green-600 hover:bg-green-700")}>
                                            {respostaCorreta.includes(o.id) ? "Correta" : "Marcar"}
                                        </Button>
                                    )}
                                    <Button type="button" onClick={() => handleRemoveOpcao(o.id)} variant="destructive" size="sm">Remover</Button>
                                </li>
                            ))}
                        </ul>
                        {tipo === "Ordem" && <p className="text-xs text-gray-500">Defina a posição correta (1, 2, 3...) para cada opção.</p>}
                        {tipo === "Vantagem" && <p className="text-xs text-green-600">Todas as opções serão consideradas corretas.</p>}
                        {tipo === "Desvantagem" && <p className="text-xs text-red-600">Nenhuma opção será considerada correta.</p>}
                    </div>
                )}

                {/* Tempo Limite (ContraTempo) */}
                {tipo === "ContraTempo" && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Tempo Limite (segundos)</label>
                        <Input type="number" value={tempoLimite} onChange={(e) => setTempoLimite(Math.max(5, parseInt(e.target.value, 10) || 5))} min="5" className="border p-2 rounded w-24"/>
                    </div>
                )}

                {/* Colunas (RelacionarColunas) */}
                {tipo === "RelacionarColunas" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded border">
                        <div>
                             <h3 className="text-lg font-semibold mb-2">Coluna A</h3>
                             <div className="flex space-x-2 mb-2">
                                 <Input type="text" value={novaColunaA} onChange={e => setNovaColunaA(e.target.value)} placeholder="Texto item A" className="flex-1"/>
                                 <Button type="button" onClick={handleAddColunaA}>Add A</Button>
                             </div>
                             <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                                 {colunaAItems.map(item => <li key={item.id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => handleRemoveColunaA(item.id)}>X</Button></li>)}
                             </ul>
                        </div>
                         <div>
                             <h3 className="text-lg font-semibold mb-2">Coluna B</h3>
                             <div className="flex space-x-2 mb-2">
                                 <Input type="text" value={novaColunaB} onChange={e => setNovaColunaB(e.target.value)} placeholder="Texto item B" className="flex-1"/>
                                 <Button type="button" onClick={handleAddColunaB}>Add B</Button>
                             </div>
                             <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                                 {colunaBItems.map(item => <li key={item.id} className="flex justify-between items-center"><span>{item.id}: {item.texto}</span><Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => handleRemoveColunaB(item.id)}>X</Button></li>)}
                             </ul>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Pares Corretos (Formato JSON)</label>
                            <textarea value={paresCorretosInput} onChange={e => setParesCorretosInput(e.target.value)} className="border p-2 w-full rounded h-20 font-mono text-xs" placeholder='[{"aId": 1, "bId": 101}, {"aId": 2, "bId": 102}]'/>
                            <p className="text-xs text-gray-500">Use os IDs definidos acima.</p>
                        </div>
                    </div>
                )}

                 {/* Imagem e Zonas (PontoCerto) */}
                {tipo === "PontoCerto" && (
                    <div className="bg-gray-50 p-4 rounded space-y-4 border">
                        <h3 className="text-lg font-semibold">Configuração Ponto Certo</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">URL da Imagem Principal*</label>
                            <Input type="text" value={imagemURLPontoCerto} onChange={e => setImagemURLPontoCerto(e.target.value)} placeholder="/images/mapa_interativo.png" className="w-full"/>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold mb-2">Zonas Clicáveis</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2 border p-2 rounded">
                                <Input type="number" placeholder="X (0-1)" value={novaZona.x ?? ""} onChange={e => handleNovaZonaChange('x', e.target.value)} className="text-sm h-8"/>
                                <Input type="number" placeholder="Y (0-1)" value={novaZona.y ?? ""} onChange={e => handleNovaZonaChange('y', e.target.value)} className="text-sm h-8"/>
                                <Input type="number" placeholder="Largura (0-1)" value={novaZona.largura ?? ""} onChange={e => handleNovaZonaChange('largura', e.target.value)} className="text-sm h-8"/>
                                <Input type="number" placeholder="Altura (0-1)" value={novaZona.altura ?? ""} onChange={e => handleNovaZonaChange('altura', e.target.value)} className="text-sm h-8"/>
                                <Input type="text" placeholder="Descrição (Opcional)" value={novaZona.descricao ?? ""} onChange={e => handleNovaZonaChange('descricao', e.target.value)} className="text-sm h-8 md:col-span-2"/>
                                <Button type="button" onClick={handleAddZona} size="sm" className="md:col-span-3">Adicionar Zona</Button>
                            </div>
                             <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                                {zonasClicaveis.map(z => (
                                    <li key={z.id} className="flex justify-between items-center odd:bg-white even:bg-gray-100 px-1 py-0.5">
                                        <span>ID:{z.id} ({z.x},{z.y} {z.largura}x{z.altura}) {z.descricao}</span>
                                        <div className="flex items-center gap-1">
                                            <Button type="button" variant={respostaCorretaPontoCerto === z.id ? "default" : "outline"} size="xs" className={cn(respostaCorretaPontoCerto === z.id && "bg-green-600")} onClick={() => handleSetRespostaPontoCerto(z.id)}>Correta</Button>
                                            <Button type="button" variant="ghost" size="xs" className="text-red-500" onClick={() => handleRemoveZona(z.id)}>X</Button>
                                        </div>
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>
                )}

                {/* Frase e Fragmentos (CompletarFrase) */}
                 {tipo === "CompletarFrase" && (
                    <div className="bg-gray-50 p-4 rounded space-y-4 border">
                        <h3 className="text-lg font-semibold">Configuração Completar Frase</h3>
                        <div>
                            <label className="block text-sm font-medium mb-1">Frase Incompleta* (use __1__, __2__, etc.)</label>
                            <textarea value={fraseIncompleta} onChange={e => setFraseIncompleta(e.target.value)} className="border p-2 w-full rounded h-20 font-mono text-sm" placeholder="O __1__ é essencial para a __2__."/>
                        </div>
                        <div>
                            <h4 className="text-md font-semibold mb-2">Fragmentos</h4>
                            <div className="flex space-x-2 mb-2">
                                <Input type="text" value={novoFragmento} onChange={e => setNovoFragmento(e.target.value)} placeholder="Texto do fragmento" className="flex-1"/>
                                <Button type="button" onClick={handleAddFragmento}>Add Frag.</Button>
                            </div>
                             <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                                {fragmentos.map(f => <li key={f.id} className="flex justify-between items-center"><span>{f.id}: {f.texto}</span><Button type="button" variant="ghost" size="sm" className="text-red-500" onClick={() => handleRemoveFragmento(f.id)}>X</Button></li>)}
                             </ul>
                        </div>
                        <div>
                             <label className="block text-sm font-medium mb-1">Ordem Correta dos Fragmentos* (IDs separados por vírgula)</label>
                             <Input type="text" value={ordemFragmentos} onChange={e => setOrdemFragmentos(e.target.value)} placeholder="1, 3, 2" className="w-full"/>
                        </div>
                    </div>
                )}


                {/* Campos Comuns Finais */}
                <div>
                    <label className="block text-sm font-medium mb-1">Dificuldade</label>
                    <select value={dificuldade} onChange={(e) => setDificuldade(e.target.value as Dificuldade)} className="border p-2 rounded w-full bg-white">
                        {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>

                {/* Categorias e Fontes (com trava) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded space-y-3 border">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Categorias</h3>
                            <Button type="button" size="sm" variant={categoriasBloqueadas ? "destructive" : "secondary"} onClick={() => setCategoriasBloqueadas(!categoriasBloqueadas)}>
                                {categoriasBloqueadas ? "Destravar" : "Travar"}
                            </Button>
                        </div>
                        <div className="flex space-x-2">
                            <Input type="text" value={novaCategoria} onChange={(e) => setNovaCategoria(e.target.value)} placeholder="Nova categoria" className="border p-2 rounded flex-1"/>
                            <Button type="button" onClick={handleAddCategoria}>Add</Button>
                        </div>
                        <ul className="space-y-1 text-sm max-h-20 overflow-y-auto">
                            {categorias.map((c, i) => <li key={i} className="flex justify-between items-center"><span>{c}</span><Button type="button" variant="ghost" size="xs" className="text-red-500" onClick={() => handleRemoveCategoria(c)}>X</Button></li>)}
                        </ul>
                    </div>
                    <div className="bg-gray-50 p-4 rounded space-y-3 border">
                        <div className="flex justify-between items-center">
                             <h3 className="text-lg font-semibold">Fontes</h3>
                             <Button type="button" size="sm" variant={fontesBloqueadas ? "destructive" : "secondary"} onClick={() => setFontesBloqueadas(!fontesBloqueadas)}>
                                {fontesBloqueadas ? "Destravar" : "Travar"}
                             </Button>
                        </div>
                        <div className="flex space-x-2">
                            <Input type="text" value={novaFonte} onChange={(e) => setNovaFonte(e.target.value)} placeholder="Nova fonte" className="border p-2 rounded flex-1"/>
                            <Button type="button" onClick={handleAddFonte}>Add</Button>
                        </div>
                         <ul className="space-y-1 text-sm max-h-20 overflow-y-auto">
                             {fontes.map((f, i) => <li key={i} className="flex justify-between items-center"><span>{f}</span><Button type="button" variant="ghost" size="xs" className="text-red-500" onClick={() => handleRemoveFonte(f)}>X</Button></li>)}
                         </ul>
                    </div>
                </div>

                 {/* Vantagem, Desvantagem, Dica */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div>
                        <label className="block text-sm font-medium mb-1">Vantagem (Mensagem Acerto)</label>
                        <Input type="text" value={vantagem} onChange={(e) => setVantagem(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Desvantagem (Mensagem Erro)</label>
                        <Input type="text" value={desvantagem} onChange={(e) => setDesvantagem(e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Dica</label>
                        <Input type="text" value={dica} onChange={(e) => setDica(e.target.value)} />
                    </div>
                </div>

                 {/* Botões de Ação */}
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 pt-4 border-t">
                    <Button type="button" onClick={handleAddOrUpdateCard} className="bg-green-600 hover:bg-green-700 text-white">
                        {editIndex !== null ? "Atualizar Carta" : "Adicionar Carta ao Baralho"}
                    </Button>
                    {editIndex !== null && (
                        <Button type="button" onClick={cancelEdit} variant="outline">Cancelar Edição</Button>
                    )}
                    <Button type="button" onClick={() => setShowPreview(!showPreview)} variant="outline">
                        {showPreview ? "Esconder Preview" : "Mostrar Preview Estático"}
                    </Button>
                </div>
            </div>

            {/* Preview Estático (se ativo) */}
            {showPreview && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Pré-visualização Estática</h2>
                    <CardStaticView card={{
                        tipo, titulo, pergunta, opcoes, respostaCorreta: tipo === 'Pergunta' || tipo === 'ContraTempo' ? (respostaCorreta[0] ?? 0) : respostaCorreta,
                        dificuldade, categorias, fontes, vantagem, desvantagem, dica, tempoLimite,
                        colunaA: colunaAItems, colunaB: colunaBItems, imagemURL: imagemURLPontoCerto, zonasClicaveis,
                        fraseIncompleta, fragmentos
                    }}/>
                </div>
            )}

            {/* Lista de Cartas Criadas e Download */}
            <div className="bg-white shadow p-4 rounded">
                 <h2 className="text-2xl font-bold mb-4">Baralho Atual ({cards.length} Cartas)</h2>
                 {cards.length === 0 && (<p className="text-gray-500 mb-4">Nenhuma carta no baralho ainda.</p>)}
                 <div className="max-h-96 overflow-y-auto mb-4 pr-2">
                    {cards.map((c, index) => (
                        <div key={`card-${c.id || index}`} className="flex items-center justify-between border-b py-2 gap-2">
                            <span className="text-sm font-medium truncate">{c.titulo || `Carta ${index + 1}`} ({c.tipo})</span>
                            <div className="flex-shrink-0 flex gap-1">
                                <Button onClick={() => loadCardForEdit(index)} size="sm" variant="outline">Editar</Button>
                                <Button onClick={() => deleteCard(index)} size="sm" variant="destructive">Excluir</Button>
                            </div>
                        </div>
                    ))}
                 </div>
                 <div className="flex space-x-4 pt-4 border-t">
                    <Button onClick={() => downloadCode('js')} className="bg-blue-600 hover:bg-blue-700 text-white">Baixar como .js</Button>
                    <Button onClick={() => downloadCode('json')} className="bg-purple-600 hover:bg-purple-700 text-white">Baixar como .json</Button>
                </div>
            </div>

        </div>
    );
};

export default CriadorDeCarta;