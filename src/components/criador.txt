// src/components/CriadorDeCarta.tsx

import React, { useState, ChangeEvent, useEffect } from "react";

// --- Interfaces ---

interface Opcao {
  id: number;
  texto: string;
  ordemTemp?: string; // Temporary state for ordering UI (Ordem type)
}

// Represents an item in Column B for RelacionarColunas type
interface OpcaoColunaB {
    id: number;
    texto: string;
}

// Represents a single correct pairing for RelacionarColunas
interface Pairing {
    colunaAId: number;
    colunaBId: number | null; // null means no match selected yet
}

// Flexible type for respostaCorreta depending on card type
type RespostaCorreta = number | number[] | Pairing[];

interface Carta {
  tipo: TipoCarta;
  titulo: string;
  pergunta: string; // Can contain HTML
  opcoes: Opcao[]; // Main options OR Column A items for RelacionarColunas
  respostaCorreta: RespostaCorreta; // Single ID, array of IDs, or array of Pairings
  dificuldade: Dificuldade;
  categorias: string[];
  fontes: string[];
  vantagem: string;
  desvantagem: string;
  dica: string;
  imageType?: "clickable" | "hero"; // How the image should be displayed
  imagem?: string; // Path to the image file
  meta?: Record<string, any>; // Extra metadata (e.g., timeLimit, colunaB for Relacionar)
  origBaralhoId?: number; // For tracking origin when loading decks
  edited?: boolean; // Flag if the card was edited after loading
}

// --- Constants ---

const CARD_TYPES = [
  "Pergunta",          // Single correct answer (usually)
  "MultiplaEscolha",   // Multiple correct answers possible
  "Ordem",             // Options must be sequenced correctly
  "RelacionarColunas", // Match items between two columns
  "AreaClicavel",      // Click correct areas on an image (defined as options)
  "Tempo",             // A question with a time limit (structure like Pergunta/Multipla)
  "Vantagem",          // All options are considered 'correct' (or beneficial)
  "Desvantagem",       // All options are considered 'incorrect' (or detrimental)
  "Outras",            // Flexible type, correctness defined by respostaCorreta
] as const;
type TipoCarta = (typeof CARD_TYPES)[number];

const DIFFICULTIES = ["facil", "normal", "dificil"] as const;
type Dificuldade = (typeof DIFFICULTIES)[number];

interface BaralhoCarregado {
  id: number;
  nome: string;
  cartas: Carta[];
  adicionado: boolean;
}

// --- Helper Function for Unique IDs ---
const generateId = (): number => Date.now() + Math.random();

// --- Static Card Preview Component ---
const CardStaticView: React.FC<{ card: Carta }> = ({ card }) => {
  const {
    tipo,
    titulo,
    pergunta,
    opcoes, // Represents Column A for RelacionarColunas
    respostaCorreta,
    dificuldade,
    categorias,
    fontes,
    vantagem,
    desvantagem,
    dica,
    meta,
  } = card;

  let renderedOptions: React.ReactNode = null;
  const colunaBOpcoes = meta?.colunaB as OpcaoColunaB[] || []; // Get Column B options if they exist

  // Determine correct answers based on type for display
  const correctSet = new Set<number>(); // For standard types
  const pairingsMap = new Map<number, number | null>(); // For RelacionarColunas: { colAId -> colBId }

  if (tipo === "Vantagem") {
    opcoes.forEach((o) => correctSet.add(o.id));
  } else if (tipo === "Desvantagem") {
    // No options are correct
  } else if (tipo === "Pergunta" || tipo === "Tempo" || tipo === "AreaClicavel") {
    if (typeof respostaCorreta === "number" && respostaCorreta !== 0) {
      correctSet.add(respostaCorreta);
    } else if (Array.isArray(respostaCorreta) && respostaCorreta.length === 1 && typeof respostaCorreta[0] === 'number') {
       correctSet.add(respostaCorreta[0]); // Handle if saved as array[1]
    }
  } else if (tipo === "MultiplaEscolha" || tipo === "Outras") {
    if (Array.isArray(respostaCorreta)) {
      (respostaCorreta as number[]).forEach((x) => typeof x === 'number' && correctSet.add(x)); // Ensure it's a number
    } else if (typeof respostaCorreta === 'number' && respostaCorreta !== 0) {
      correctSet.add(respostaCorreta); // Handle single number case if needed
    }
  } else if (tipo === "RelacionarColunas" && Array.isArray(respostaCorreta)) {
      (respostaCorreta as Pairing[]).forEach(p => {
          if (typeof p === 'object' && p !== null && 'colunaAId' in p) { // Basic check for Pairing structure
             pairingsMap.set(p.colunaAId, p.colunaBId);
          }
      });
  }

  // Render options based on type
  if (tipo === "Ordem") {
    const seq = Array.isArray(respostaCorreta) ? (respostaCorreta as number[]).filter(id => typeof id === 'number') : [];
    const ordemMap = new Map<number, number>();
    seq.forEach((id, index) => {
      ordemMap.set(id, index + 1);
    });

    renderedOptions = (
      <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyle: "none" }}>
        {opcoes.map((op) => {
          const pos = ordemMap.get(op.id);
          const displayPos = pos !== undefined ? `${pos}.` : "?.";
          return (
            <li key={op.id} style={{ marginBottom: "4px" }}>
              {displayPos} {op.texto}
            </li>
          );
        })}
      </ul>
    );
  } else if (tipo === "RelacionarColunas") {
     // Simple two-column display for preview
     const colBMap = new Map(colunaBOpcoes.map(o => [o.id, o.texto]));
     renderedOptions = (
        <div style={{ marginTop: "8px", display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '8px', alignItems: 'center' }}>
             <div style={{fontWeight: 'bold', textAlign: 'center'}}>Coluna A</div>
             <div></div> {/* Spacer */}
             <div style={{fontWeight: 'bold', textAlign: 'center'}}>Coluna B</div>
             {opcoes.map((opA) => {
                 const matchedBId = pairingsMap.get(opA.id);
                 const matchedBText = (matchedBId !== undefined && matchedBId !== null) ? colBMap.get(matchedBId) ?? '???' : '---';
                 return (
                     <React.Fragment key={opA.id}>
                         <div style={{ padding: '4px', border: '1px solid #eee', borderRadius: '4px', textAlign: 'left' }}>{opA.texto}</div>
                         <div style={{ textAlign: 'center', color: '#555' }}>↔</div>
                         <div style={{ padding: '4px', border: '1px solid #eee', borderRadius: '4px', textAlign: 'left', color: matchedBId !== undefined && matchedBId !== null ? 'green' : 'inherit', fontWeight: matchedBId !== undefined && matchedBId !== null ? 'bold': 'normal' }}>{matchedBText}</div>
                     </React.Fragment>
                 );
             })}
        </div>
     );

  } else { // Pergunta, MultiplaEscolha, Tempo, AreaClicavel, Vantagem, Desvantagem, Outras
    renderedOptions = (
      <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyle: "none" }}>
        {opcoes.map((op) => {
          const isCorrect = correctSet.has(op.id);
          const isVantagem = tipo === "Vantagem";
          const isDesvantagem = tipo === "Desvantagem";
          const marker = isVantagem ? '👍' : (isDesvantagem ? '👎' : (isCorrect ? "✓" : "✗"));
          const color = isVantagem ? 'darkgreen' : (isDesvantagem ? 'darkred' : (isCorrect ? "green" : "inherit"));
          const fontWeight = (isCorrect || isVantagem || isDesvantagem) ? "bold" : "normal";

          return (
            <li
              key={op.id}
              style={{
                marginBottom: "4px",
                color: color,
                fontWeight: fontWeight,
              }}
            >
              {marker} {op.texto}
            </li>
          );
        })}
      </ul>
    );
  }

  // Filter meta for display (exclude colunaB)
  const displayMeta = meta ? Object.fromEntries(
      Object.entries(meta).filter(([key]) => key !== 'colunaB')
  ) : null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "500px", // Slightly wider for columns
        margin: "1rem auto", // Centered preview
        fontFamily: "sans-serif",
        fontSize: "14px",
        background: "#fff", // White background for the card
      }}
    >
      <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "4px", marginTop: 0, color: '#333' }}>
        {titulo}
      </h2>
      <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "8px", marginTop: 0 }}>
        Tipo: {tipo} | Dificuldade: {dificuldade}
        {tipo === "Tempo" && meta?.timeLimit && ` | Tempo: ${meta.timeLimit}s`}
      </p>

      {/* Render question HTML safely */}
      <div
        style={{ margin: "12px 0", fontSize: "0.9rem", lineHeight: '1.5' }}
        dangerouslySetInnerHTML={{ __html: pergunta }}
      />

      {opcoes.length > 0 && renderedOptions}

      {/* Display other fields */}
      <div style={{ marginTop: "16px", paddingTop: '10px', borderTop: '1px dashed #eee', fontSize: "0.75rem", color: "#555" }}>
        {categorias && categorias.length > 0 && <p style={{ margin: '3px 0' }}><strong>Categorias:</strong> {categorias.join(", ")}</p>}
        {fontes && fontes.length > 0 && <p style={{ margin: '3px 0' }}><strong>Fontes:</strong> {fontes.join(", ")}</p>}
      </div>

      {dica && (
        <p style={{ fontSize: "0.75rem", color: "#4a4", marginTop: "6px", marginBottom: '3px' }}>
          <strong>Dica:</strong> {dica}
        </p>
      )}
      {vantagem && (
        <p style={{ fontSize: "0.75rem", color: "#090", marginTop: "6px", marginBottom: '3px' }}>
          <strong>Vantagem:</strong> {vantagem}
        </p>
      )}
      {desvantagem && (
        <p style={{ fontSize: "0.75rem", color: "#900", marginTop: "6px", marginBottom: '3px' }}>
          <strong>Desvantagem:</strong> {desvantagem}
        </p>
      )}
       {displayMeta && Object.keys(displayMeta).length > 0 && (
         <div style={{ marginTop: "10px", fontSize: "0.75rem", color: "#777", borderTop: '1px dashed #eee', paddingTop: '6px' }}>
            <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Metadados Adicionais:</p>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f9f9f9', padding: '6px', borderRadius: '4px', fontSize: '11px' }}>
                {JSON.stringify(displayMeta, null, 2)}
            </pre>
         </div>
       )}
    </div>
  );
};


// --- Main Creator Component ---
const CriadorDeCarta: React.FC = () => {
  // Deck state
  const [deckName, setDeckName] = useState("meu_baralho");
  const [cards, setCards] = useState<Carta[]>([]);

  // --- Current Card Form State ---
  const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
  const [titulo, setTitulo] = useState("");
  const [pergunta, setPergunta] = useState(""); // Raw text/HTML content

  // Options Handling (adapts based on type)
  const [opcoes, setOpcoes] = useState<Opcao[]>([]); // Also Column A for RelacionarColunas
  const [novaOpcao, setNovaOpcao] = useState("");
  // --- New state for RelacionarColunas Column B ---
  const [colunaBOpcoes, setColunaBOpcoes] = useState<OpcaoColunaB[]>([]);
  const [novaOpcaoB, setNovaOpcaoB] = useState("");
  // --- State for managing pairings in RelacionarColunas UI ---
  const [pairings, setPairings] = useState<Pairing[]>([]); // { colunaAId: number, colunaBId: number | null }

  const [imageType, setImageType] = useState<"clickable" | "hero">("clickable");
  const [imagem, setImagem] = useState(""); // Image path/URL

  // Stores correct answer(s). Structure depends on 'tipo'.
  const [respostaCorretaState, setRespostaCorretaState] = useState<any>([]);

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

  // --- New state for Tempo type ---
  const [timeLimit, setTimeLimit] = useState<number | string>(""); // Store as string for input flexibility

  // Metadata state
  const [currentMeta, setCurrentMeta] = useState<Record<string, any>>({});
  const [metaKey, setMetaKey] = useState("");
  const [metaValue, setMetaValue] = useState("");

  // Editing/UI state
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Loaded deck state
  const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
  const [manterCartasEditadas, setManterCartasEditadas] = useState(false);

  // --- Effects ---
  // Reset specific fields when type changes
  useEffect(() => {
      setOpcoes([]); // Reset options
      setColunaBOpcoes([]); // Reset col B options
      setPairings([]); // Reset pairings
      setRespostaCorretaState([]); // Reset correct answers
      setNovaOpcao("");
      setNovaOpcaoB("");
      setTimeLimit(""); // Reset time limit
      // Keep meta for now, maybe selectively clear later?
      // setCurrentMeta({});
  }, [tipo]);

  // Update pairings state when options (Column A) change for RelacionarColunas
  useEffect(() => {
      if (tipo === "RelacionarColunas") {
          setPairings(prevPairings => {
              const existingAIds = new Set(opcoes.map(o => o.id));
              const validPrevPairings = prevPairings.filter(p => existingAIds.has(p.colunaAId));
              const newPairings = opcoes
                  .filter(opA => !validPrevPairings.some(p => p.colunaAId === opA.id))
                  .map(opA => ({ colunaAId: opA.id, colunaBId: null }));
              return [...validPrevPairings, ...newPairings];
          });
      } else {
         // Clear pairings if type is not RelacionarColunas
         if (pairings.length > 0) setPairings([]);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opcoes, tipo]); // Rerun when options or type changes


  // --- Deck Loading ---
  const parseJSDeckFile = (content: string): Carta[] => {
    // More robust regex to find the array assignment
    const match = content.match(/(?:const|let|var)\s+\w+\s*=\s*(\[[\s\S]*?\]);?/m);
    if (!match || !match[1]) {
      console.error("JS Content:", content); // Log content for debugging
      throw new Error("Não foi possível encontrar um array de cartas exportado no arquivo JS. Verifique se ele tem o formato `const nome = [...];`");
    }
    const arrayStr = match[1];
    try {
      // Use Function constructor for safety over eval
      const array = new Function(`"use strict"; return ${arrayStr};`)();
      // Basic validation (can be expanded)
      if (!Array.isArray(array)) {
        throw new Error("O conteúdo extraído não é um array.");
      }
      // Add more checks per card if needed (e.g., check for 'tipo', 'titulo')
      return array as Carta[];
    } catch (e: any) {
       throw new Error(`Erro ao parsear o array do JS: ${e.message}`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newBaralhos: BaralhoCarregado[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = await file.text();
      try {
        let newCards: Carta[] = [];
        const nome = file.name.replace(/\.(js|json)$/, "");

        if (file.name.endsWith(".js")) {
          newCards = parseJSDeckFile(content);
        } else if (file.name.endsWith(".json")) {
          newCards = JSON.parse(content) as Carta[];
          if (!Array.isArray(newCards)) {
            throw new Error("Arquivo JSON não contém um array de cartas.");
          }
        } else {
          alert(`Formato de arquivo não suportado: ${file.name}. Use apenas .js ou .json`);
          continue;
        }

        // Basic validation on loaded cards
        if (newCards.length > 0 && (!newCards[0].tipo || !newCards[0].titulo)) {
           console.warn(`Arquivo ${file.name} carregado, mas as cartas parecem não ter os campos 'tipo' ou 'titulo'. Verifique o formato.`);
        }

         // --- Data Migration/Validation (Optional but recommended) ---
         newCards = newCards.map(card => {
             let migratedCard = { ...card };
             // Ensure required fields have default values if missing
             migratedCard.opcoes = migratedCard.opcoes ?? [];
             migratedCard.categorias = migratedCard.categorias ?? [];
             migratedCard.fontes = migratedCard.fontes ?? [];
             migratedCard.respostaCorreta = migratedCard.respostaCorreta ?? (migratedCard.tipo === 'Pergunta' ? 0 : []); // Default based on type maybe?

             // Example: Ensure 'meta' exists if needed by type and add defaults
             if (migratedCard.tipo === 'Tempo') {
                 migratedCard.meta = { ...migratedCard.meta }; // Ensure meta object exists
                 if (!migratedCard.meta.timeLimit) {
                    console.warn(`Carta "${migratedCard.titulo}" do tipo Tempo sem timeLimit no meta. Adicionando default 60.`);
                    migratedCard.meta.timeLimit = 60; // Default 60s
                 }
             }
             if (migratedCard.tipo === 'RelacionarColunas') {
                 migratedCard.meta = { ...migratedCard.meta }; // Ensure meta object exists
                  if (!migratedCard.meta.colunaB || !Array.isArray(migratedCard.meta.colunaB)) {
                      console.warn(`Carta "${migratedCard.titulo}" do tipo RelacionarColunas sem colunaB válida no meta. Adicionando default [].`);
                     migratedCard.meta.colunaB = [];
                 }
                  // Ensure respostaCorreta has the correct format for RelacionarColunas
                 if (!Array.isArray(migratedCard.respostaCorreta) || (migratedCard.respostaCorreta.length > 0 && (typeof migratedCard.respostaCorreta[0] !== 'object' || !('colunaAId' in migratedCard.respostaCorreta[0])))) {
                     console.warn(`Carta "${migratedCard.titulo}" do tipo RelacionarColunas com formato de resposta incorreto. Resetando para [].`);
                     migratedCard.respostaCorreta = []; // Reset pairings if format is wrong
                 } else {
                     // Ensure loaded pairings are valid pairings
                     migratedCard.respostaCorreta = (migratedCard.respostaCorreta as any[]).filter(p => typeof p === 'object' && p !== null && 'colunaAId' in p);
                 }
             }
             // Ensure standard respostaCorreta is array of numbers or single number
             if (['Pergunta', 'MultiplaEscolha', 'Ordem', 'Outras', 'Tempo', 'AreaClicavel', 'Vantagem', 'Desvantagem'].includes(migratedCard.tipo)) {
                  if (Array.isArray(migratedCard.respostaCorreta)) {
                      migratedCard.respostaCorreta = (migratedCard.respostaCorreta as any[]).filter(id => typeof id === 'number');
                  } else if (typeof migratedCard.respostaCorreta !== 'number') {
                       console.warn(`Carta "${migratedCard.titulo}" com tipo de resposta incorreta. Resetando.`);
                       migratedCard.respostaCorreta = migratedCard.tipo === 'Pergunta' ? 0 : [];
                  }
             }


             return migratedCard;
         });

        newBaralhos.push({
          id: generateId(), // Use helper for ID
          nome,
          cartas: newCards,
          adicionado: false,
        });
      } catch (error: any) {
        alert(`Erro ao processar o arquivo ${file.name}: ${error.message}`);
        console.error(`Erro no arquivo ${file.name}:`, error);
      }
    }

    if (newBaralhos.length > 0) {
      setBaralhosCarregados((prev) => [...prev, ...newBaralhos]);
    }
    // Clear the file input value to allow reloading the same file
    if (e.target) e.target.value = "";
  };

  const adicionarBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId && !b.adicionado) {
          const newCards = b.cartas.map((c) => ({
            ...c,
             // Deep copy potentially complex fields to avoid reference issues
             opcoes: c.opcoes?.map(o => ({...o})) ?? [],
             meta: c.meta ? JSON.parse(JSON.stringify(c.meta)) : undefined,
             respostaCorreta: c.respostaCorreta ? JSON.parse(JSON.stringify(c.respostaCorreta)) : (c.tipo === 'Pergunta' ? 0 : []),
             categorias: [...(c.categorias ?? [])],
             fontes: [...(c.fontes ?? [])],
            origBaralhoId: b.id,
            edited: false, // Mark as not edited initially
          }));
          setCards((oldCards) => [...oldCards, ...newCards]);
          return { ...b, adicionado: true };
        }
        return b;
      })
    );
  };

  const removerBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId && b.adicionado) {
          setCards((oldCards) =>
            oldCards.filter((c) => {
              if (c.origBaralhoId !== baralhoId) return true;
              if (c.edited && manterCartasEditadas) return true;
              return false;
            })
          );
          return { ...b, adicionado: false };
        }
        return b;
      })
    );
  };


  // --- Form Handlers ---

  const handleAddOpcao = (coluna: 'A' | 'B' = 'A') => {
      const text = (coluna === 'A' ? novaOpcao : novaOpcaoB).trim();
      if (text !== "") {
          const nextId = generateId(); // Use helper for unique ID

          if (coluna === 'A') {
              const newOption: Opcao = { id: nextId, texto: text };
              if (tipo === "Ordem") {
                newOption.ordemTemp = ""; // Add temp field for Order type
              }
              setOpcoes((old) => [...old, newOption]);
              setNovaOpcao("");
          } else { // Coluna B
              setColunaBOpcoes((old) => [...old, { id: nextId, texto: text }]);
              setNovaOpcaoB("");
          }
      }
  };

  const handleRemoveOpcao = (id: number, coluna: 'A' | 'B' = 'A') => {
      if (coluna === 'A') {
          setOpcoes((old) => old.filter((o) => o.id !== id));
          // Also remove from correct answers if it was selected (for standard types)
          if (Array.isArray(respostaCorretaState)) {
              setRespostaCorretaState((rc: any[]) => rc.filter((x) => x !== id));
          } else if (typeof respostaCorretaState === 'number' && respostaCorretaState === id) {
              setRespostaCorretaState(tipo === 'Pergunta' ? 0 : []); // Reset if the single correct one is removed
          }
          // Remove any pairings involving this option A
          setPairings(prev => prev.filter(p => p.colunaAId !== id));

      } else { // Coluna B
          setColunaBOpcoes((old) => old.filter((o) => o.id !== id));
           // Update pairings: set colunaBId to null if the removed B option was selected
          setPairings(prev => prev.map(p => p.colunaBId === id ? { ...p, colunaBId: null } : p));
      }
  };

   // --- Specific Handler for RelacionarColunas Pairing ---
   const handlePairingChange = (colunaAId: number, selectedColunaBId: string) => {
      const bId = selectedColunaBId ? parseInt(selectedColunaBId, 10) : null;
      setPairings(prev => prev.map(p =>
          p.colunaAId === colunaAId ? { ...p, colunaBId: bId } : p
      ));
   };

  // Toggle correctness for Pergunta, MultiplaEscolha, Outras, Tempo, AreaClicavel
  const handleToggleRespostaCorreta = (id: number) => {
    const relevantTypes: TipoCarta[] = ["Pergunta", "MultiplaEscolha", "Outras", "Tempo", "AreaClicavel"];
    if (!relevantTypes.includes(tipo)) return;

    if (tipo === "Pergunta" || tipo === "Tempo" || tipo === "AreaClicavel") { // Single answer types
      setRespostaCorretaState((prev: any) => (Array.isArray(prev) && prev.includes(id)) ? [] : [id]);
    } else { // MultiplaEscolha, Outras
      setRespostaCorretaState((prev: any[]) => {
          // Ensure prev is an array
          const currentArray = Array.isArray(prev) ? prev : [];
          return currentArray.includes(id)
            ? currentArray.filter((x) => x !== id)
            : [...currentArray, id]
      });
    }
  };

  // Handle temporary order input for 'Ordem' type
  const handleSetOrder = (optionId: number, newValue: string) => {
    const sanitizedValue = newValue.replace(/[^0-9]/g, '');
    setOpcoes((old) =>
      old.map((op) =>
        op.id === optionId
          ? { ...op, ordemTemp: sanitizedValue }
          : op
      )
    );
  };

  // Handle Time Limit input for 'Tempo' type
  const handleTimeLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Allow only positive integers or empty string
       if (/^\d*$/.test(value)) {
           setTimeLimit(value === "" ? "" : Math.max(0, parseInt(value, 10))); // Store as number or empty string
       }
  }

  const handleAddCategoria = () => {
    const catTrimmed = novaCategoria.trim();
    if (catTrimmed !== "" && !categorias.includes(catTrimmed)) {
      setCategorias((old) => [...old, catTrimmed]);
      setNovaCategoria("");
    }
  };
  const handleRemoveCategoria = (cat: string) => {
    setCategorias((old) => old.filter((c) => c !== cat));
  };

  const handleAddFonte = () => {
    const fonteTrimmed = novaFonte.trim();
    if (fonteTrimmed !== "" && !fontes.includes(fonteTrimmed)) {
      setFontes((old) => [...old, fonteTrimmed]);
      setNovaFonte("");
    }
  };
  const handleRemoveFonte = (f: string) => {
    setFontes((old) => old.filter((fon) => fon !== f));
  };

  // --- Metadata Handlers ---
  const handleAddMeta = () => {
    const key = metaKey.trim();
    const value = metaValue.trim();
    if (key) {
      let parsedValue: any = value;
      try {
        if (/^\d+(\.\d+)?$/.test(value)) {
            parsedValue = Number(value);
        } else if (value.toLowerCase() === 'true') {
            parsedValue = true;
        } else if (value.toLowerCase() === 'false') {
            parsedValue = false;
        } // Keep as string otherwise
      } catch (e) { /* Keep as string */ }

      setCurrentMeta(prev => ({ ...prev, [key]: parsedValue }));
      setMetaKey("");
      setMetaValue("");
    }
  };

  const handleRemoveMeta = (key: string) => {
    setCurrentMeta(prev => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };


  // --- Card Management ---

  const resetCarta = (keepLocked = true) => {
    setTipo("Pergunta");
    setTitulo("");
    setPergunta("");
    setOpcoes([]);
    setNovaOpcao("");
    setColunaBOpcoes([]);
    setNovaOpcaoB("");
    setPairings([]);
    setImagem("");
    setDica("");
    setVantagem("");
    setDesvantagem("");
    setRespostaCorretaState([]); // Reset correct answers state to empty array
    setDificuldade("facil");
    setImageType("clickable");
    setTimeLimit("");
    setCurrentMeta({});
    setMetaKey("");
    setMetaValue("");
    setEditIndex(null);
    setShowPreview(false);

    if (keepLocked) {
        if (!categoriasBloqueadas) setCategorias([]);
        if (!fontesBloqueadas) setFontes([]);
    } else {
        setCategorias([]);
        setFontes([]);
        setCategoriasBloqueadas(false);
        setFontesBloqueadas(false);
    }
  };

  // Helper to build the 'pergunta' HTML with embedded image if needed
  const buildPerguntaHtml = (rawPergunta: string, imgPath: string, imgType: "clickable" | "hero", cardTitle: string): string => {
    if (!imgPath) {
      return rawPergunta; // No image, return text as is
    }
     const uniqueSuffix = cardTitle.replace(/[^a-zA-Z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 8);
     const modalId = `zoomModal-${uniqueSuffix}`;

    if (imgType === "clickable") {
      const css = `
        .zoom-modal-${uniqueSuffix} { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: none; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.85); z-index: 10000; }
        .zoom-modal-content-${uniqueSuffix} { margin: 1rem; max-width: 95%; max-height: 95%; position: relative; }
        .zoom-modal-content-${uniqueSuffix} img { display: block; margin: auto; width: auto; max-width: 100%; height: auto; max-height: 90vh; object-fit: contain; }
        .zoom-modal-close-${uniqueSuffix} { position: absolute; top: 0.5rem; right: 1rem; color: white; font-size: 2.5rem; text-decoration: none; cursor: pointer; line-height: 1; }
      `;
      return `
<style>${css}</style>
<div style="text-align: center; margin-bottom: 1em;">
    <img src="${imgPath}" alt="Imagem para ${cardTitle} (clique para ampliar)" style="max-width: 300px; height: auto; display: block; margin: 0 auto; border: 1px solid #eee; cursor: pointer;" onclick="document.getElementById('${modalId}').style.display='flex'" />
</div>
<div id="${modalId}" class="zoom-modal-${uniqueSuffix}" onclick="this.style.display='none'">
  <div class="zoom-modal-content-${uniqueSuffix}" onclick="event.stopPropagation()">
    <a class="zoom-modal-close-${uniqueSuffix}" onclick="document.getElementById('${modalId}').style.display='none'">×</a>
    <img src="${imgPath}" alt="${cardTitle}" />
  </div>
</div>
${rawPergunta}
`;
    } else if (imgType === "hero") {
      return `
<div style="text-align: center; margin-bottom: 1em;">
    <img src="${imgPath}" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #ccc; object-fit: cover; margin: 0 auto;" alt="${cardTitle}" />
</div>
${rawPergunta}
`;
    }
    return rawPergunta; // Fallback
  };


  const handleAddOrUpdateCard = () => {
    // --- Input Validation ---
    if (!titulo.trim()) {
        alert("O título da carta é obrigatório.");
        return;
    }

    const needsOptions = ["Pergunta", "MultiplaEscolha", "Ordem", "Vantagem", "Desvantagem", "Outras", "Tempo", "AreaClicavel"];
    if (needsOptions.includes(tipo) && opcoes.length === 0) {
        alert(`Cartas do tipo '${tipo}' devem ter pelo menos uma opção.`);
        return;
    }
    if (tipo === "RelacionarColunas" && (opcoes.length === 0 || colunaBOpcoes.length === 0)) {
         alert(`Cartas do tipo 'RelacionarColunas' devem ter itens em ambas as colunas.`);
         return;
    }
    if (tipo === "Tempo") {
        const limit = parseInt(String(timeLimit), 10);
        if (isNaN(limit) || limit <= 0) {
            alert("Para cartas do tipo 'Tempo', por favor insira um limite de tempo válido (número positivo de segundos).");
            return;
        }
    }
    if (tipo === "AreaClicavel" && !imagem) {
         alert("Cartas do tipo 'AreaClicavel' requerem uma imagem.");
         return;
    }


    // --- Prepare RespostaCorreta based on Type ---
    let finalRespostaCorreta: RespostaCorreta = []; // Default

    if (tipo === "Ordem") {
      const sorted = [...opcoes]
        .filter(o => o.ordemTemp?.trim() && parseInt(o.ordemTemp, 10) > 0)
        .sort((a, b) => parseInt(a.ordemTemp!, 10) - parseInt(b.ordemTemp!, 10));
      const orderNumbers = sorted.map(o => parseInt(o.ordemTemp!, 10));
      if (new Set(orderNumbers).size !== orderNumbers.length) {
          alert("Erro: Números de ordem duplicados ou inválidos detectados para o tipo 'Ordem'. Use números positivos únicos.");
          return;
      }
       if (opcoes.some(o => !o.ordemTemp?.trim() || parseInt(o.ordemTemp, 10) <= 0)) {
            console.warn("Algumas opções do tipo 'Ordem' não têm número de ordem válido definido.");
       }
      finalRespostaCorreta = sorted.map((o) => o.id);

    } else if (tipo === "Vantagem") {
      finalRespostaCorreta = opcoes.map((o) => o.id);

    } else if (tipo === "Desvantagem") {
      finalRespostaCorreta = [];

    } else if (tipo === "Pergunta" || tipo === "Tempo" || tipo === "AreaClicavel") {
      const selectedAnswers = Array.isArray(respostaCorretaState) ? respostaCorretaState.filter(id => typeof id === 'number') : [];
      if (selectedAnswers.length === 1) {
        finalRespostaCorreta = selectedAnswers[0]; // Store as single number
      } else {
         alert(`Erro: Cartas do tipo '${tipo}' devem ter exatamente uma resposta correta selecionada.`);
         return;
      }

    } else if (tipo === "MultiplaEscolha" || tipo === "Outras") {
        const selectedAnswers = Array.isArray(respostaCorretaState) ? respostaCorretaState.filter(id => typeof id === 'number') : [];
        if (selectedAnswers.length === 0 && tipo === "MultiplaEscolha") {
             console.warn("Carta 'MultiplaEscolha' salva sem nenhuma resposta correta selecionada.");
            // alert("Erro: Selecione pelo menos uma resposta correta para 'MultiplaEscolha'."); return; // Uncomment to enforce selection
        }
        finalRespostaCorreta = [...selectedAnswers]; // Store as array

    } else if (tipo === "RelacionarColunas") {
       const validPairings = pairings.filter(p => p.colunaBId !== null && typeof p.colunaBId === 'number');
       if (validPairings.length !== opcoes.length) {
            const confirmUnmatched = window.confirm(`Atenção: ${opcoes.length - validPairings.length} item(ns) da Coluna A não foram pareados com um item da Coluna B. Deseja salvar assim mesmo? (Itens não pareados serão salvos como 'null')`);
            if (!confirmUnmatched) return;
       }
       // Check for duplicate B selections
       const bCounts = pairings.reduce((acc, p) => {
            if (p.colunaBId !== null) {
                acc[p.colunaBId] = (acc[p.colunaBId] || 0) + 1;
            }
            return acc;
       }, {} as Record<number, number>);
       const duplicates = Object.entries(bCounts).filter(([_, count]) => count > 1);
       if (duplicates.length > 0) {
           const duplicateBNames = duplicates.map(([bId]) => colunaBOpcoes.find(o => o.id === parseInt(bId))?.texto || `ID ${bId}`);
           alert(`Erro: O(s) item(ns) da Coluna B [${duplicateBNames.join(', ')}] foram selecionados mais de uma vez. Cada item da Coluna B só pode ser pareado com um item da Coluna A.`);
           return;
       }

       finalRespostaCorreta = pairings; // Store the full pairing structure {colunaAId, colunaBId | null}

    } else {
        // Fallback for potentially unhandled types? Default to empty array.
        finalRespostaCorreta = [];
    }

    // --- Prepare Metadata ---
    const finalMeta: Record<string, any> = { ...currentMeta }; // Start with generic meta
    if (tipo === "Tempo") {
        finalMeta.timeLimit = parseInt(String(timeLimit), 10);
    }
     if (tipo === "RelacionarColunas") {
        finalMeta.colunaB = colunaBOpcoes.map(o => ({ id: o.id, texto: o.texto }));
    } else {
        delete finalMeta.colunaB; // Clean up if type changed away from RelacionarColunas
    }
    // Remove timeLimit if type is not Tempo
    if (tipo !== "Tempo") {
        delete finalMeta.timeLimit;
    }


    // --- Prepare Pergunta HTML ---
    const computedPergunta = buildPerguntaHtml(pergunta, imagem, imageType, titulo);

    // --- Create/Update Card Object ---
    const cartaData: Omit<Carta, 'origBaralhoId' | 'edited'> = {
      tipo,
      titulo,
      pergunta: computedPergunta,
      imageType: imagem ? imageType : undefined,
      imagem: imagem || undefined,
      opcoes: opcoes.map(({ ordemTemp, ...rest }) => rest), // Clean temp field
      respostaCorreta: finalRespostaCorreta,
      dificuldade,
      categorias: [...categorias],
      fontes: [...fontes],
      vantagem: tipo !== 'Desvantagem' ? vantagem : '',
      desvantagem: tipo !== 'Vantagem' ? desvantagem : '',
      dica,
      meta: Object.keys(finalMeta).length > 0 ? finalMeta : undefined,
    };


    if (editIndex !== null) {
      setCards((oldCards) =>
        oldCards.map((c, i) =>
          i === editIndex
            ? { ...c, ...cartaData, edited: true } // Keep origBaralhoId, mark edited
            : c
        )
      );
    } else {
      setCards((oldCards) => [...oldCards, { ...cartaData, edited: true }]);
    }

    resetCarta(true); // Reset form, keeping locked fields
  };


  const loadCardForEdit = (index: number) => {
    setShowPreview(false);
    const carta = cards[index];
    if (!carta) return;

    resetCarta(false); // Full reset before loading
    setEditIndex(index);
    setTipo(carta.tipo as TipoCarta);
    setTitulo(carta.titulo || "");

    // --- Image and Pergunta Handling ---
    let p = carta.pergunta || "";
    let extractedImage = carta.imagem || "";
    let extractedImageType = carta.imageType || "clickable";
    if (!extractedImage && p.includes('<img')) {
        const modalImgRegex = /<div style="text-align: center[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*onclick="document\.getElementById\('zoomModal-[^']+'\)\.style\.display='flex'"[^>]*>/;
        const heroImgRegex = /<div style="text-align: center[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*style="[^"]*border-radius: 50%[^"]*"[^>]*>/;

        const modalMatch = p.match(modalImgRegex);
        const heroMatch = p.match(heroImgRegex);

         if (modalMatch && modalMatch[1]) {
            extractedImage = modalMatch[1];
            extractedImageType = "clickable";
             p = p.replace(/<style>[\s\S]*?<\/style>/, '').replace(modalMatch[0], '').trim();
        } else if (heroMatch && heroMatch[1]) {
            extractedImage = heroMatch[1];
            extractedImageType = "hero";
            p = p.replace(heroMatch[0], '').trim();
        }
    }
    setImagem(extractedImage);
    setImageType(extractedImageType);
    setPergunta(p);


    // --- Options, Correct Answer, and Type-Specific Fields ---
     const copyOp = carta.opcoes?.map((o) => ({ ...o, ordemTemp: "" })) ?? []; // Base options / Col A

     // Default correct answer state
     let loadedRespostaState: any = [];

     if (carta.tipo === "RelacionarColunas") {
         const colB = (carta.meta?.colunaB as OpcaoColunaB[])?.map(o => ({...o})) ?? [];
         setColunaBOpcoes(colB);
         // Ensure pairings are loaded correctly, defaulting to null for B if missing
         const loadedPairings = (Array.isArray(carta.respostaCorreta) ? carta.respostaCorreta : [])
            .filter(p => typeof p === 'object' && p !== null && 'colunaAId' in p) // Basic validation
            .map(p => ({ colunaAId: p.colunaAId, colunaBId: p.colunaBId ?? null })) as Pairing[];
         setPairings(loadedPairings);
         // loadedRespostaState remains [] for this type

     } else if (carta.tipo === "Ordem") {
       const seq = (Array.isArray(carta.respostaCorreta) ? carta.respostaCorreta : []) as number[];
       copyOp.forEach((op) => {
         const pos = seq.indexOf(op.id);
         op.ordemTemp = pos >= 0 ? String(pos + 1) : "";
       });
       // loadedRespostaState remains [] for this type

     } else if (carta.tipo === "Vantagem" || carta.tipo === "Desvantagem") {
        // loadedRespostaState remains []

     } else if (tipo === "Pergunta" || tipo === "Tempo" || tipo === "AreaClicavel") { // Single answer types
         if (typeof carta.respostaCorreta === "number" && carta.respostaCorreta !== 0) {
             loadedRespostaState = [carta.respostaCorreta];
         } else if (Array.isArray(carta.respostaCorreta) && carta.respostaCorreta.length === 1 && typeof carta.respostaCorreta[0] === 'number') {
              loadedRespostaState = [carta.respostaCorreta[0]]; // Handle legacy array[1]
         } // else remains []

     } else { // MultiplaEscolha, Outras (Array of numbers)
         const arr = (Array.isArray(carta.respostaCorreta) ? carta.respostaCorreta : []) as number[];
         loadedRespostaState = arr.filter(x => typeof x === 'number' && x !== 0);
     }

    setOpcoes(copyOp); // Set options/Column A
    setRespostaCorretaState(loadedRespostaState); // Set the correct answer state

    // --- Load Time Limit ---
    if (carta.tipo === "Tempo") {
        setTimeLimit(String(carta.meta?.timeLimit || ""));
    } else {
        setTimeLimit("");
    }

    // --- Other Fields ---
    setDificuldade(carta.dificuldade as Dificuldade || 'facil'); // Default difficulty
    setCategorias([...(carta.categorias ?? [])]);
    setFontes([...(carta.fontes ?? [])]);
    setVantagem(carta.vantagem || "");
    setDesvantagem(carta.desvantagem || "");
    setDica(carta.dica || "");

    // Load other metadata, excluding fields handled separately
    const otherMeta = { ... (carta.meta || {}) };
    delete otherMeta.timeLimit;
    delete otherMeta.colunaB;
    setCurrentMeta(otherMeta);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteCard = (index: number) => {
    if (window.confirm(`Tem certeza que deseja excluir a carta "${cards[index]?.titulo || `Carta ${index + 1}`}"?`)) {
        setCards((old) => old.filter((_, i) => i !== index));
        if (editIndex === index) {
            resetCarta(true); // Reset form if deleting the card being edited
        } else if (editIndex !== null && editIndex > index) {
            // Adjust edit index if deleting a card before the one being edited
            setEditIndex(editIndex - 1);
        }
    }
  };

  const cancelEdit = () => {
    resetCarta(true); // Reset form, keep locked fields
  };

  // --- Exporting ---
  const prepareForDownload = (): Omit<Carta, 'origBaralhoId' | 'edited'>[] => {
    return cards.map(({ origBaralhoId, edited, opcoes: cardOpcoes, meta: cardMeta, ...rest }) => {
        const cleanOpcoes = cardOpcoes.map(({ ordemTemp, ...op }) => op);
        const cleanMeta = cardMeta ? Object.fromEntries(Object.entries(cardMeta).filter(([_, v]) => v !== null && v !== undefined && v !== '')) : undefined;

        // Ensure respostaCorreta for RelacionarColunas only contains valid pairings
        let finalResposta = rest.respostaCorreta;
        if (rest.tipo === 'RelacionarColunas' && Array.isArray(finalResposta)) {
            finalResposta = (finalResposta as Pairing[]).filter(p => typeof p === 'object' && p !== null && 'colunaAId' in p);
        }

        return {
            ...rest,
            opcoes: cleanOpcoes,
            meta: cleanMeta && Object.keys(cleanMeta).length > 0 ? cleanMeta : undefined,
            respostaCorreta: finalResposta,
        };
    });
  };


  const generateCode = () => {
    const deckFinal = prepareForDownload();
    const varName = deckName.replace(/[^a-zA-Z0-9_$]/g, '_') || 'meu_baralho';
    // Use a replacer function to handle potential circular references if any were introduced, although unlikely here
    const deck = JSON.stringify(deckFinal, (key, value) => {
        // Simple check for undefined or potentially problematic values if needed
        // if (value === undefined) { return null; } // Example
        return value;
    }, 2); // Indent with 2 spaces

    return `// Baralho gerado por CriadorDeCarta
// Nome: ${deckName}
// Data: ${new Date().toISOString()}

const ${varName} = ${deck};

// Para compatibilidade com CommonJS (Node.js) ou ES Modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ${varName};
} else if (typeof exports !== 'undefined') {
  // Support basic export for environments like older bundlers or direct script includes
  exports.${varName} = ${varName};
  // Attempt default export as well for ES module compatibility
  try { Object.defineProperty(exports, "__esModule", { value: true }); exports.default = ${varName}; } catch (e) {}
}
`;
  };

  const downloadCode = () => {
    const sanitizedDeckName = deckName.replace(/[^a-zA-Z0-9_]/g, '_') || 'meu_baralho';
    const element = document.createElement("a");
    const file = new Blob([generateCode()], { type: "text/javascript;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${sanitizedDeckName}.js`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // --- Current Card Preview Data ---
  const getCurrentCardDataForPreview = (): Carta => {
     let previewRespostaCorreta: RespostaCorreta = [];
     const currentOpcoes = opcoes.map(({ ordemTemp, ...rest }) => rest); // Clean temp field

     // Use a different name for the local meta object to avoid shadowing state variable
     const previewMeta: Record<string, any> = { ...currentMeta }; // Create a typed copy from state

     if (tipo === "Ordem") {
        const sorted = [...opcoes]
          .filter(o => o.ordemTemp?.trim() && parseInt(o.ordemTemp, 10) > 0)
          .sort((a, b) => parseInt(a.ordemTemp!, 10) - parseInt(b.ordemTemp!, 10));
        previewRespostaCorreta = sorted.map(o => o.id);
     } else if (tipo === "Vantagem") {
        previewRespostaCorreta = currentOpcoes.map(o => o.id);
     } else if (tipo === "Desvantagem") {
         previewRespostaCorreta = [];
     } else if (tipo === "Pergunta" || tipo === "Tempo" || tipo === "AreaClicavel") {
          const selected = Array.isArray(respostaCorretaState) ? respostaCorretaState.filter(id => typeof id === 'number') : [];
          previewRespostaCorreta = selected.length > 0 ? selected[0] : 0; // Use 0 if none selected for preview?
     } else if (tipo === "MultiplaEscolha" || tipo === "Outras") {
         previewRespostaCorreta = Array.isArray(respostaCorretaState) ? [...respostaCorretaState.filter(id => typeof id === 'number')] : [];
     } else if (tipo === "RelacionarColunas") {
         previewRespostaCorreta = [...pairings]; // Use the current pairings from state
         // Add Col B to the local meta copy for preview component
         previewMeta.colunaB = colunaBOpcoes.map(o => ({id: o.id, texto: o.texto})); // Modify previewMeta
     }

     // Add Time Limit to the local meta copy if applicable
     if (tipo === "Tempo") {
         const limit = parseInt(String(timeLimit), 10);
         if (!isNaN(limit) && limit > 0) {
            previewMeta.timeLimit = limit; // Modify previewMeta
         }
     }

     const computedPergunta = buildPerguntaHtml(pergunta, imagem, imageType, titulo);

      return {
          tipo,
          titulo: titulo || "Carta Sem Título", // Provide default for preview
          pergunta: computedPergunta,
          imageType: imagem ? imageType : undefined,
          imagem: imagem || undefined,
          opcoes: currentOpcoes,
          respostaCorreta: previewRespostaCorreta,
          dificuldade,
          categorias: [...categorias], // Use copy
          fontes: [...fontes], // Use copy
          vantagem,
          desvantagem,
          dica,
          // Use the modified local copy here
          meta: Object.keys(previewMeta).length > 0 ? previewMeta : undefined,
          // Dummy values for type compatibility in preview context
          edited: false,
          origBaralhoId: undefined,
      };
  }

  // --- Render ---
  return (
    // Using light gray background for the whole page
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-indigo-50 min-h-screen font-sans">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center text-gray-800">Criador de Baralho</h1>

      {/* Deck Name & Loading Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 md:mb-8">
          {/* Deck Name */}
          <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg">
            <label htmlFor="deckNameInput" className="block text-sm font-medium text-gray-700 mb-2">Nome do Baralho:</label>
            <input
              id="deckNameInput"
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="Ex: baralho_historia_brasil"
              className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            />
            <p className="text-xs text-gray-500 mt-1">Usado no nome do arquivo e variável JS.</p>
          </div>

          {/* File Loading */}
          <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">Carregar/Mesclar Baralhos</h2>
            <p className="text-xs text-gray-500">
              Selecione arquivos <code>.js</code> ou <code>.json</code> para adicionar cartas ao baralho atual.
            </p>
            <input
                type="file"
                accept=".js,.json"
                onChange={handleFileUpload}
                multiple
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer transition duration-150"
            />
          </div>
      </div>


       {/* Loaded Decks Management */}
       {baralhosCarregados.length > 0 && (
        <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg mb-6 md:mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">Baralhos Carregados</h2>
          <div className="flex items-center space-x-3 mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
            <input
              id="keepEdited"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={manterCartasEditadas}
              onChange={(e) => setManterCartasEditadas(e.target.checked)}
            />
            <label htmlFor="keepEdited" className="text-sm text-gray-700">Manter cartas editadas ao remover baralho da lista</label>
          </div>
          <ul className="space-y-3">
            {baralhosCarregados.map((b) => (
              <li key={b.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 p-3 border border-gray-200 rounded-md bg-white hover:bg-gray-50 transition duration-150">
                <div>
                  <span className="font-medium text-indigo-800">{b.nome}</span>
                  <span className="text-sm text-gray-500 ml-2">({b.cartas.length} cartas)</span>
                </div>
                {!b.adicionado ? (
                  <button
                    onClick={() => adicionarBaralho(b.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-green-500"
                  >
                    Adicionar ao Baralho
                  </button>
                ) : (
                  <button
                    onClick={() => removerBaralho(b.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                  >
                    Remover da Lista
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* --- Card Editor Form --- */}
      <div className="bg-white shadow-xl p-5 md:p-8 rounded-lg mb-6 md:mb-8 border border-indigo-100">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-700 border-b pb-3">
            {editIndex !== null ? `Editando Carta: ${cards[editIndex]?.titulo || ''}` : "Adicionar Nova Carta"}
          </h2>
          <div className="space-y-6">

            {/* --- Card Type and Title --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cardType" className="block text-sm font-medium text-gray-700 mb-1">Tipo da Carta</label>
                <select
                  id="cardType"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as TipoCarta)}
                  className="border border-gray-300 p-2 rounded-md w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                >
                  {CARD_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Define a estrutura e lógica da carta.</p>
              </div>
              <div>
                <label htmlFor="cardTitle" className="block text-sm font-medium text-gray-700 mb-1">Título da Carta *</label>
                <input
                  id="cardTitle"
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  required
                />
                 <p className="text-xs text-gray-500 mt-1">Obrigatório.</p>
              </div>
            </div>

             {/* --- Image Options --- */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                 <h3 className="text-md font-semibold text-gray-700 mb-3">Imagem (Opcional)</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label htmlFor="imagePath" className="block text-sm font-medium text-gray-700 mb-1">Caminho/URL da Imagem</label>
                        <input
                          id="imagePath"
                          type="text"
                          value={imagem}
                          onChange={(e) => setImagem(e.target.value)}
                          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                          placeholder="Ex: /img/foto.png ou https://..."
                        />
                    </div>
                    <div className="md:col-span-1">
                        <label htmlFor="imageType" className="block text-sm font-medium text-gray-700 mb-1">Estilo da Imagem</label>
                        <select
                          id="imageType"
                          value={imageType}
                          onChange={(e) => setImageType(e.target.value as "clickable" | "hero")}
                          className="border border-gray-300 p-2 rounded-md w-full shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 disabled:opacity-50 disabled:bg-gray-100"
                          disabled={!imagem} // Disable if no image path
                        >
                          <option value="clickable">Clicável (Zoom)</option>
                          <option value="hero">Hero (Avatar)</option>
                        </select>
                    </div>
                </div>
                 <p className="text-xs text-gray-500 mt-2">
                   Preencha o caminho para incluir uma imagem. O estilo só é aplicável se houver um caminho.
                 </p>
                 {tipo === "AreaClicavel" && <p className="text-xs text-orange-600 mt-1 font-medium">O tipo AreaClicavel depende desta imagem.</p>}
            </div>

            {/* --- Pergunta/Description --- */}
            <div>
              <label htmlFor="cardQuestion" className="block text-sm font-medium text-gray-700 mb-1">Pergunta/Descrição</label>
              <textarea
                id="cardQuestion"
                value={pergunta}
                onChange={(e) => setPergunta(e.target.value)}
                placeholder="Digite a pergunta ou a descrição da carta aqui. Pode incluir HTML básico (use com cuidado)."
                className="border border-gray-300 p-2 w-full rounded-md h-24 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
              <p className="text-xs text-gray-500 mt-1">Se usar imagem, o HTML dela será adicionado acima deste texto.</p>
            </div>

             {/* --- Time Limit Input (Tempo Type) --- */}
             {tipo === "Tempo" && (
                 <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
                    <label htmlFor="timeLimit" className="block text-sm font-medium text-yellow-800 mb-1">Limite de Tempo (em segundos)</label>
                    <input
                      id="timeLimit"
                      type="number" // Use number type for better input control
                      min="1" // Minimum 1 second
                      step="1"
                      value={timeLimit}
                      onChange={handleTimeLimitChange}
                      className="border border-yellow-300 p-2 w-full md:w-48 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                      placeholder="Ex: 30"
                    />
                    <p className="text-xs text-yellow-700 mt-1">Define o tempo máximo para responder esta carta.</p>
                </div>
             )}


            {/* --- Options Section (Conditional Rendering) --- */}

            {/* Standard Options (Pergunta, MultiplaEscolha, Ordem, Tempo, AreaClicavel, Vantagem, Desvantagem, Outras) */}
            {["Pergunta", "MultiplaEscolha", "Ordem", "Tempo", "AreaClicavel", "Vantagem", "Desvantagem", "Outras"].includes(tipo) && (
              <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 space-y-4">
                <h3 className="text-lg font-semibold text-indigo-800">
                    {tipo === 'Vantagem' || tipo === 'Desvantagem' ? 'Opções' : (tipo === 'AreaClicavel' ? 'Áreas Clicáveis (Definir como Opções)' : 'Opções e Respostas')}
                </h3>
                {/* Add Option Input */}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={novaOpcao}
                    onChange={(e) => setNovaOpcao(e.target.value)}
                    placeholder={tipo === 'AreaClicavel' ? 'Nome da área (ex: Botão Vermelho)' : 'Texto da nova opção'}
                    className="border border-gray-300 p-2 rounded-md flex-1 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddOpcao('A')}
                  />
                  <button
                    onClick={() => handleAddOpcao('A')}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                  >
                    + Opção
                  </button>
                </div>

                {/* Options List */}
                {opcoes.length === 0 && <p className="text-sm text-gray-500 italic">Nenhuma opção adicionada ainda.</p>}
                <ul className="space-y-3">
                  {opcoes.map((o) => (
                    <li
                      key={o.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 bg-white p-3 border border-gray-200 rounded-md shadow-sm"
                    >
                      {/* Option Text */}
                      <span className={`flex-1 text-gray-800 mb-2 sm:mb-0 ${tipo === 'Vantagem' ? 'text-green-700' : (tipo === 'Desvantagem' ? 'text-red-700' : '')}`}>
                          {o.texto}
                      </span>

                      {/* Order Input (Ordem type) */}
                      {tipo === "Ordem" && (
                        <div className="flex items-center space-x-1 self-start sm:self-center">
                          <label htmlFor={`order-${o.id}`} className="text-sm text-gray-600">Pos:</label>
                          <input
                            id={`order-${o.id}`}
                            type="number"
                            min="1"
                            step="1"
                            onChange={(e) => handleSetOrder(o.id, e.target.value)}
                            value={o.ordemTemp ?? ""}
                            className="border border-gray-300 p-1 w-16 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center"
                            placeholder="#"
                          />
                        </div>
                      )}

                       {/* Correct Answer Toggle (relevant types only) */}
                      {["Pergunta", "MultiplaEscolha", "Outras", "Tempo", "AreaClicavel"].includes(tipo) && (
                         <button
                            onClick={() => handleToggleRespostaCorreta(o.id)}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition duration-150 ease-in-out whitespace-nowrap self-start sm:self-center ${
                                Array.isArray(respostaCorretaState) && respostaCorretaState.includes(o.id)
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                            title={Array.isArray(respostaCorretaState) && respostaCorretaState.includes(o.id) ? "Desmarcar como correta" : "Marcar como correta"}
                        >
                            {Array.isArray(respostaCorretaState) && respostaCorretaState.includes(o.id)
                                ? "✓ Correta"
                                : "Marcar"}
                        </button>
                      )}

                      {/* Remove Option Button */}
                      <button
                        onClick={() => handleRemoveOpcao(o.id, 'A')}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm font-bold leading-tight shadow-sm transition duration-150 ease-in-out self-end sm:self-center focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                        title="Remover opção"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                {/* Helper text for specific types */}
                 {tipo === "Ordem" && <p className="text-xs text-gray-600 mt-2">Preencha a posição correta (número positivo único) para cada item na sequência.</p>}
                 {(tipo === "Pergunta" || tipo === "Tempo" || tipo === "AreaClicavel") && <p className="text-xs text-gray-600 mt-2">Selecione exatamente uma opção/área correta.</p>}
                 {tipo === "MultiplaEscolha" && <p className="text-xs text-gray-600 mt-2">Selecione uma ou mais opções corretas.</p>}
                 {tipo === "Outras" && <p className="text-xs text-gray-600 mt-2">Selecione as opções corretas conforme a lógica da sua carta.</p>}
                 {tipo === "Vantagem" && <p className="text-xs text-green-700 mt-2 bg-green-100 p-2 rounded border border-green-200">Todas as opções listadas são consideradas vantagens.</p>}
                 {tipo === "Desvantagem" && <p className="text-xs text-red-700 mt-2 bg-red-100 p-2 rounded border border-red-200">Todas as opções listadas são consideradas desvantagens.</p>}
                 {tipo === "AreaClicavel" && <p className="text-xs text-blue-700 mt-2 bg-blue-100 p-2 rounded border border-blue-200">Liste os nomes das áreas clicáveis da imagem como opções. Marque a(s) correta(s). A lógica do jogo mapeará esses nomes para a imagem.</p>}
              </div>
            )}

            {/* RelacionarColunas Specific Section */}
             {tipo === "RelacionarColunas" && (
                <div className="bg-purple-50 p-4 rounded-md border border-purple-100 space-y-6">
                    <h3 className="text-lg font-semibold text-purple-800">Relacionar Colunas</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Column A */}
                         <div className="space-y-3">
                             <h4 className="font-medium text-purple-700">Coluna A</h4>
                             <div className="flex space-x-2">
                               <input
                                 type="text"
                                 value={novaOpcao}
                                 onChange={(e) => setNovaOpcao(e.target.value)}
                                 placeholder="Texto do item A"
                                 className="border border-gray-300 p-2 rounded-md flex-1 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                                 onKeyDown={(e) => e.key === 'Enter' && handleAddOpcao('A')}
                               />
                               <button
                                 onClick={() => handleAddOpcao('A')}
                                 className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500"
                               >
                                 + Item A
                               </button>
                             </div>
                             {opcoes.length === 0 && <p className="text-sm text-gray-500 italic">Nenhum item na Coluna A.</p>}
                             <ul className="space-y-2">
                               {opcoes.map((o) => (
                                 <li key={o.id} className="flex items-center space-x-2 bg-white p-2 border border-gray-200 rounded shadow-sm">
                                   <span className="flex-1 text-gray-800">{o.texto}</span>
                                   <button
                                     onClick={() => handleRemoveOpcao(o.id, 'A')}
                                     className="bg-red-500 hover:bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500"
                                     title="Remover item A"
                                   >
                                     ✕
                                   </button>
                                 </li>
                               ))}
                             </ul>
                         </div>
                         {/* Column B */}
                         <div className="space-y-3">
                             <h4 className="font-medium text-purple-700">Coluna B</h4>
                              <div className="flex space-x-2">
                               <input
                                 type="text"
                                 value={novaOpcaoB}
                                 onChange={(e) => setNovaOpcaoB(e.target.value)}
                                 placeholder="Texto do item B"
                                 className="border border-gray-300 p-2 rounded-md flex-1 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                                 onKeyDown={(e) => e.key === 'Enter' && handleAddOpcao('B')}
                               />
                               <button
                                 onClick={() => handleAddOpcao('B')}
                                 className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500"
                               >
                                 + Item B
                               </button>
                             </div>
                             {colunaBOpcoes.length === 0 && <p className="text-sm text-gray-500 italic">Nenhum item na Coluna B.</p>}
                              <ul className="space-y-2">
                               {colunaBOpcoes.map((o) => (
                                 <li key={o.id} className="flex items-center space-x-2 bg-white p-2 border border-gray-200 rounded shadow-sm">
                                   <span className="flex-1 text-gray-800">{o.texto}</span>
                                   <button
                                     onClick={() => handleRemoveOpcao(o.id, 'B')}
                                     className="bg-red-500 hover:bg-red-600 text-white px-1.5 py-0.5 rounded text-xs font-bold shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-red-500"
                                     title="Remover item B"
                                   >
                                     ✕
                                   </button>
                                 </li>
                               ))}
                             </ul>
                         </div>
                     </div>

                     {/* Pairing Section */}
                     {opcoes.length > 0 && colunaBOpcoes.length > 0 && (
                        <div className="pt-4 border-t border-purple-200">
                             <h4 className="font-medium text-purple-700 mb-3">Definir Pares Corretos</h4>
                              <div className="space-y-3">
                                {pairings.map((pairing) => {
                                    const itemA = opcoes.find(o => o.id === pairing.colunaAId);
                                    if (!itemA) return null; // Should not happen if state is synced
                                    return (
                                        <div key={pairing.colunaAId} className="grid grid-cols-3 gap-2 items-center bg-white p-2 rounded border border-gray-200">
                                            <span className="text-gray-800 truncate" title={itemA.texto}>{itemA.texto}</span>
                                            <span className="text-center text-gray-500">↔</span>
                                             <select
                                                value={pairing.colunaBId ?? ""}
                                                onChange={(e) => handlePairingChange(pairing.colunaAId, e.target.value)}
                                                className="border border-gray-300 p-1.5 rounded-md text-sm shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                                             >
                                                <option value="">-- Selecione Par --</option>
                                                {colunaBOpcoes.map(itemB => (
                                                    <option key={itemB.id} value={itemB.id}>{itemB.texto}</option>
                                                ))}
                                             </select>
                                        </div>
                                    );
                                })}
                              </div>
                               <p className="text-xs text-gray-600 mt-2">Selecione o item correspondente da Coluna B para cada item da Coluna A. Itens não pareados terão null como par.</p>
                        </div>
                     )}
                </div>
             )}

            {/* --- Difficulty --- */}
            <div>
              <label htmlFor="cardDifficulty" className="block text-sm font-medium text-gray-700 mb-1">Dificuldade</label>
              <select
                id="cardDifficulty"
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value as Dificuldade)}
                className="border border-gray-300 p-2 rounded-md w-full md:w-64 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)} {/* Capitalize */}
                  </option>
                ))}
              </select>
             </div>

            {/* --- Categories & Sources --- */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Categories */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <h3 className="text-lg font-semibold text-gray-700">Categorias</h3>
                    <button
                      onClick={() => setCategoriasBloqueadas(!categoriasBloqueadas)}
                      className={`px-3 py-1 rounded-md text-white text-xs font-medium shadow-sm transition duration-150 ease-in-out ${
                        categoriasBloqueadas ? "bg-orange-500 hover:bg-orange-600" : "bg-teal-500 hover:bg-teal-600"
                      }`}
                      title={categoriasBloqueadas ? "Categorias serão mantidas ao resetar" : "Categorias serão limpas ao resetar"}
                    >
                      {categoriasBloqueadas ? "🔒 Travado" : "🔓 Destravado"}
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={novaCategoria}
                      onChange={(e) => setNovaCategoria(e.target.value)}
                      placeholder="Nova categoria"
                      className="border border-gray-300 p-2 rounded-md flex-1 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCategoria()}
                    />
                    <button
                      onClick={handleAddCategoria}
                       className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                    >
                      + Cat
                    </button>
                  </div>
                  {categorias.length > 0 ? (
                     <div className="flex flex-wrap gap-2 pt-1">
                        {categorias.map((c, i) => (
                          <span key={i} className="flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium pl-2.5 pr-1 py-0.5 rounded-full">
                            {c}
                            <button
                              onClick={() => handleRemoveCategoria(c)}
                              className="ml-1 flex-shrink-0 bg-indigo-200 hover:bg-indigo-300 text-indigo-600 hover:text-indigo-800 rounded-full p-0.5"
                              title={`Remover ${c}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </span>
                        ))}
                     </div>
                   ) : (<p className="text-sm text-gray-500 italic">Nenhuma categoria adicionada.</p>)}
                    <p className="text-xs text-gray-500 mt-2">
                        {categoriasBloqueadas ? "Categorias atuais serão mantidas ao salvar/resetar." : "Categorias serão limpas ao salvar/resetar."}
                    </p>
                </div>

                {/* Fontes */}
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <h3 className="text-lg font-semibold text-gray-700">Fontes</h3>
                     <button
                      onClick={() => setFontesBloqueadas(!fontesBloqueadas)}
                       className={`px-3 py-1 rounded-md text-white text-xs font-medium shadow-sm transition duration-150 ease-in-out ${
                        fontesBloqueadas ? "bg-orange-500 hover:bg-orange-600" : "bg-teal-500 hover:bg-teal-600"
                      }`}
                       title={fontesBloqueadas ? "Fontes serão mantidas ao resetar" : "Fontes serão limpas ao resetar"}
                    >
                      {fontesBloqueadas ? "🔒 Travado" : "🔓 Destravado"}
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={novaFonte}
                      onChange={(e) => setNovaFonte(e.target.value)}
                      placeholder="Nova fonte ou URL"
                      className="border border-gray-300 p-2 rounded-md flex-1 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                       onKeyDown={(e) => e.key === 'Enter' && handleAddFonte()}
                    />
                    <button
                      onClick={handleAddFonte}
                       className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
                    >
                      + Fonte
                    </button>
                  </div>
                   {fontes.length > 0 ? (
                     <ul className="space-y-1 pt-1 max-h-24 overflow-y-auto">
                        {fontes.map((f, i) => (
                          <li key={i} className="flex items-center justify-between space-x-2 text-sm text-gray-700 bg-white px-2 py-1 border rounded-md">
                            <span className="truncate flex-1" title={f}>{f}</span>
                            <button
                              onClick={() => handleRemoveFonte(f)}
                              className="text-red-500 hover:text-red-700 text-xs flex-shrink-0"
                               title={`Remover ${f}`}
                            >
                               (X)
                            </button>
                          </li>
                        ))}
                     </ul>
                   ) : (<p className="text-sm text-gray-500 italic">Nenhuma fonte adicionada.</p>)}
                    <p className="text-xs text-gray-500 mt-2">
                        {fontesBloqueadas ? "Fontes atuais serão mantidas ao salvar/resetar." : "Fontes serão limpas ao salvar/resetar."}
                    </p>
                </div>
            </div>

             {/* --- Vantagem, Desvantagem, Dica --- */}
             {tipo !== 'Vantagem' && tipo !== 'Desvantagem' && ( // Hide entire section for these types
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-700">Textos Auxiliares (Opcional)</h3>

                    {/* Vantagem Field - Always show if outer condition met */}
                    <div>
                        <label htmlFor="cardAdvantage" className="block text-sm font-medium text-gray-700 mb-1">Vantagem:</label>
                        <input
                        id="cardAdvantage"
                        type="text"
                        value={vantagem}
                        onChange={(e) => setVantagem(e.target.value)}
                        placeholder="Texto explicando a vantagem (se houver)"
                        className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>

                    {/* Desvantagem Field - Always show if outer condition met */}
                    <div>
                        <label htmlFor="cardDisadvantage" className="block text-sm font-medium text-gray-700 mb-1">Desvantagem:</label>
                        <input
                        id="cardDisadvantage"
                        type="text"
                        value={desvantagem}
                        onChange={(e) => setDesvantagem(e.target.value)}
                        placeholder="Texto explicando a desvantagem (se houver)"
                        className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>

                    {/* Dica Field - Always show if outer condition met */}
                    <div>
                        <label htmlFor="cardHint" className="block text-sm font-medium text-gray-700 mb-1">Dica:</label>
                        <input
                        id="cardHint"
                        type="text"
                        value={dica}
                        onChange={(e) => setDica(e.target.value)}
                        placeholder="Dica para ajudar a responder"
                        className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        />
                    </div>
                </div>
             )}


             {/* --- Metadata Section --- */}
             {/* Hide if metadata is handled by specific fields already (Tempo, Relacionar) */}
             {tipo !== 'Tempo' && tipo !== 'RelacionarColunas' && (
                 <div className="bg-gray-50 p-4 rounded-md border border-gray-200 space-y-4">
                 <h3 className="text-lg font-semibold text-gray-700">Metadados Customizados (Opcional)</h3>
                 <p className="text-xs text-gray-500">Adicione pares chave-valor para dados específicos do jogo (ex: points, effectId). Valores numéricos, true ou false serão salvos como tal.</p>
                 <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                     <input
                     type="text"
                     value={metaKey}
                     onChange={(e) => setMetaKey(e.target.value)}
                     placeholder="Chave (ex: points)"
                     className="border border-gray-300 p-2 rounded-md flex-1 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                     />
                     <input
                     type="text"
                     value={metaValue}
                     onChange={(e) => setMetaValue(e.target.value)}
                     placeholder="Valor (ex: 100, true, bonus)"
                     className="border border-gray-300 p-2 rounded-md flex-1 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                     onKeyDown={(e) => e.key === 'Enter' && handleAddMeta()}
                     />
                     <button
                     onClick={handleAddMeta}
                     className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-teal-500"
                     >
                     + Meta
                     </button>
                 </div>
                 {Object.keys(currentMeta).length > 0 ? (
                     <ul className="space-y-1 pt-1 max-h-24 overflow-y-auto">
                     {Object.entries(currentMeta).map(([key, value]) => (
                         <li key={key} className="flex items-center justify-between bg-white p-1.5 border border-gray-200 rounded text-sm">
                         <span className="text-gray-700 font-mono text-xs break-all">
                             <strong className="text-teal-700">{key}:</strong> {JSON.stringify(value)}
                         </span>
                         <button
                             onClick={() => handleRemoveMeta(key)}
                             className="text-red-500 hover:text-red-700 text-xs ml-2 flex-shrink-0"
                             title={`Remover ${key}`}
                         >
                             (X)
                         </button>
                         </li>
                     ))}
                     </ul>
                 ) : (<p className="text-sm text-gray-500 italic">Nenhum metadado adicionado.</p>)}
                 </div>
             )}


            {/* --- Action Buttons --- */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-gray-200">
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleAddOrUpdateCard}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-md shadow-md font-semibold text-lg transition duration-150 ease-in-out w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    {editIndex !== null ? "✔ Atualizar Carta" : "➕ Adicionar Carta"}
                  </button>
                  {editIndex !== null && (
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm w-full md:w-auto transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancelar Edição
                    </button>
                  )}
                 </div>
               <button
                onClick={() => setShowPreview(!showPreview)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm w-full md:w-auto transition duration-150 ease-in-out flex items-center justify-center gap-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                  {showPreview ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 01-2.45 2.45l-1.514-1.514a4 4 0 00-1.44-1.44l-1.514-1.514a4 4 0 00-1.44-1.44l-1.514-1.514a4 4 0 00-1.44-1.44zM10 5a5 5 0 110 10 5 5 0 010-10zm-3.707 7.293a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414l-2 2a1 1 0 000 1.414z" clipRule="evenodd" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                    )}
                {showPreview ? "Fechar Preview" : "Ver Preview"}
              </button>
            </div>
          </div>
      </div> {/* End Card Editor Form */}


       {/* Static Preview Area */}
       {showPreview && (
        <div className="mb-6 md:mb-8 bg-gray-100 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-bold mb-3 text-center text-gray-700">Pré-visualização Estática</h2>
           <div className="flex justify-center">
               <CardStaticView card={getCurrentCardDataForPreview()} />
           </div>
        </div>
      )}

      {/* JSON Preview Area */}
      <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg mb-6 md:mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-700">Preview da Carta Atual (JSON)</h2>
        <div className="bg-gray-900 text-gray-200 p-4 rounded-md overflow-auto max-h-64 text-sm font-mono shadow-inner">
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(getCurrentCardDataForPreview(), null, 2)}
          </pre>
        </div>
      </div>

      {/* Created Cards List */}
      <div className="bg-white shadow-lg border border-gray-200 p-4 rounded-lg mb-6 md:mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Cartas no Baralho Atual ({cards.length})</h2>
        {cards.length === 0 ? (
          <p className="text-gray-500 mb-4 italic">Nenhuma carta criada ou adicionada ainda.</p>
        ) : (
          <div className="flex flex-wrap gap-3 mb-4">
            {cards.map((c, index) => (
              <div key={`${index}-${c.titulo}`} className={`flex items-center rounded-md shadow-sm border transition-all duration-200 ${index === editIndex ? 'ring-2 ring-offset-1 ring-indigo-500 border-indigo-300' : (c.edited ? 'border-blue-300 hover:border-blue-400' : 'border-gray-300 hover:border-gray-400')}`}>
                <button
                  onClick={() => loadCardForEdit(index)}
                  className={`pl-3 pr-2 py-1 rounded-l-md text-sm font-medium transition duration-150 ease-in-out flex items-center gap-1 ${index === editIndex ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'}`}
                  title={`Editar: ${c.titulo}`}
                >
                   <span className="max-w-[150px] truncate" title={c.titulo || `Carta ${index + 1}`}>{c.titulo || `Carta ${index + 1}`}</span>
                   {c.edited && <span className="text-blue-500 font-bold ml-0.5" title="Esta carta foi editada ou adicionada manualmente">*</span>}
                   {c.origBaralhoId && <span className="text-green-600 font-bold ml-0.5" title={`Originada do baralho ${baralhosCarregados.find(b=>b.id === c.origBaralhoId)?.nome || 'carregado'}`}>L</span>}
                </button>
                <button
                  onClick={() => deleteCard(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-r-md text-sm font-bold transition duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-red-400"
                  title={`Excluir: ${c.titulo}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8 pb-8">
        <button onClick={downloadCode} disabled={cards.length === 0} className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          Baixar Baralho <code>.js</code>
        </button>
      </div>
    </div> // End main container
  );
};

export default CriadorDeCarta;