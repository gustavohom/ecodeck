// src/components/CriadorDeCarta.tsx

import React, { useState } from "react";

interface Opcao {
  id: number;
  texto: string;
  ordemTemp?: string; // Temporary state for ordering UI
}

interface Carta {
  tipo: string;
  titulo: string;
  pergunta: string; // Can contain HTML
  opcoes: Opcao[];
  respostaCorreta: number | number[]; // Single ID for Pergunta, array otherwise
  dificuldade: string;
  categorias: string[];
  fontes: string[];
  vantagem: string;
  desvantagem: string;
  dica: string;
  imageType?: "clickable" | "hero"; // How the image should be displayed
  imagem?: string; // Path to the image file
  meta?: Record<string, any>; // Extra metadata for game logic
  origBaralhoId?: number; // For tracking origin when loading decks
  edited?: boolean; // Flag if the card was edited after loading
}

const CARD_TYPES = [
  "Pergunta", // Single correct answer (usually)
  "MultiplaEscolha", // Multiple correct answers possible
  "Ordem", // Options must be sequenced correctly
  "Vantagem", // All options are considered 'correct' (or beneficial)
  "Desvantagem", // All options are considered 'incorrect' (or detrimental)
  "Outras", // Flexible type, correctness defined by respostaCorreta
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

// --- Static Card Preview Component ---
const CardStaticView: React.FC<{ card: Carta }> = ({ card }) => {
  const {
    tipo,
    titulo,
    pergunta,
    opcoes,
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

  // Determine correct answers based on type for display
  const correctSet = new Set<number>();
  if (tipo === "Vantagem") {
    opcoes.forEach((o) => correctSet.add(o.id));
  } else if (tipo === "Desvantagem") {
    // No options are correct
  } else if (tipo === "Pergunta") {
    // Strictly single answer expected for 'Pergunta' type in preview
    if (typeof respostaCorreta === "number" && respostaCorreta !== 0) {
      correctSet.add(respostaCorreta);
    } else if (Array.isArray(respostaCorreta) && respostaCorreta.length === 1) {
       correctSet.add(respostaCorreta[0]); // Handle if saved as array[1]
    }
  } else if (tipo !== "Ordem") { // MultiplaEscolha, Outras
    if (Array.isArray(respostaCorreta)) {
      respostaCorreta.forEach((x) => correctSet.add(x));
    } else if (typeof respostaCorreta === 'number' && respostaCorreta !== 0) {
      correctSet.add(respostaCorreta); // Handle single number case if needed
    }
  }

  // Render options based on type
  if (tipo === "Ordem") {
    const seq = Array.isArray(respostaCorreta) ? respostaCorreta : [];
    const ordemMap = new Map<number, number>();
    seq.forEach((id, index) => {
      ordemMap.set(id, index + 1);
    });

    // Use the current `opcoes` from the card, map position from `respostaCorreta`
    renderedOptions = (
      <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyle: "none" }}>
        {opcoes.map((op) => {
          const pos = ordemMap.get(op.id);
          const displayPos = pos !== undefined ? `${pos}.` : "?."; // Show sequence number
          return (
            <li key={op.id} style={{ marginBottom: "4px" }}>
              {displayPos} {op.texto}
            </li>
          );
        })}
      </ul>
    );
  } else {
    renderedOptions = (
      <ul style={{ marginTop: "8px", paddingLeft: "20px", listStyle: "none" }}>
        {opcoes.map((op) => {
          const isCorrect = correctSet.has(op.id);
          return (
            <li
              key={op.id}
              style={{
                marginBottom: "4px",
                color: isCorrect ? "green" : "inherit",
                fontWeight: isCorrect ? "bold" : "normal",
              }}
            >
              {isCorrect ? "✓" : "✗"} {op.texto} {/* Indicate correctness */}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        maxWidth: "400px",
        margin: "1rem 0",
        fontFamily: "sans-serif",
        fontSize: "14px",
      }}
    >
      <h2 style={{ fontSize: "1.1rem", fontWeight: "bold", marginBottom: "4px", marginTop: 0 }}>
        {titulo}
      </h2>
      <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "8px", marginTop: 0 }}>
        Tipo: {tipo} | Dificuldade: {dificuldade}
      </p>

      {/* Render question HTML safely */}
      <div
        style={{ margin: "8px 0", fontSize: "0.9rem" }}
        dangerouslySetInnerHTML={{ __html: pergunta }}
      />

      {opcoes.length > 0 && renderedOptions}

      {/* Display other fields */}
      <div style={{ marginTop: "12px", fontSize: "0.75rem", color: "#555" }}>
        {categorias.length > 0 && <p style={{ margin: '2px 0' }}><strong>Categorias:</strong> {categorias.join(", ")}</p>}
        {fontes.length > 0 && <p style={{ margin: '2px 0' }}><strong>Fontes:</strong> {fontes.join(", ")}</p>}
      </div>

      {dica && (
        <p style={{ fontSize: "0.75rem", color: "#0a0", marginTop: "4px", marginBottom: '2px' }}>
          <strong>Dica:</strong> {dica}
        </p>
      )}
      {vantagem && (
        <p style={{ fontSize: "0.75rem", color: "#090", marginTop: "4px", marginBottom: '2px' }}>
          <strong>Vantagem:</strong> {vantagem}
        </p>
      )}
      {desvantagem && (
        <p style={{ fontSize: "0.75rem", color: "#900", marginTop: "4px", marginBottom: '2px' }}>
          <strong>Desvantagem:</strong> {desvantagem}
        </p>
      )}
       {meta && Object.keys(meta).length > 0 && (
         <div style={{ marginTop: "8px", fontSize: "0.75rem", color: "#777", borderTop: '1px dashed #eee', paddingTop: '4px' }}>
            <p style={{ margin: '2px 0', fontWeight: 'bold' }}>Metadados:</p>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: '#f9f9f9', padding: '4px', borderRadius: '4px' }}>{JSON.stringify(meta, null, 2)}</pre>
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

  // Current card form state
  const [tipo, setTipo] = useState<TipoCarta>("Pergunta");
  const [titulo, setTitulo] = useState("");
  const [pergunta, setPergunta] = useState(""); // Raw text/HTML content
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [novaOpcao, setNovaOpcao] = useState("");

  const [imageType, setImageType] = useState<"clickable" | "hero">("clickable");
  const [imagem, setImagem] = useState(""); // Image path/URL

  // Stores IDs of correct options. Single for Pergunta, array otherwise.
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

        newBaralhos.push({
          id: Date.now() + Math.random(), // Simple unique ID
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
    e.target.value = "";
  };

  const adicionarBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId && !b.adicionado) {
          const newCards = b.cartas.map((c) => ({
            ...c,
            opcoes: c.opcoes.map(o => ({...o})), // Deep copy options
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
              // Keep card if it's not from this deck
              if (c.origBaralhoId !== baralhoId) return true;
              // If from this deck, keep only if edited and checkbox is checked
              if (c.edited && manterCartasEditadas) return true;
              // Otherwise, remove card from this deck
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

  const handleAddOpcao = () => {
    if (novaOpcao.trim() !== "") {
      // Ensure unique IDs even if options are deleted/re-added
      const nextId = opcoes.length > 0 ? Math.max(...opcoes.map((o) => o.id)) + 1 : 1;
      setOpcoes((old) => [
        ...old,
        {
          id: nextId,
          texto: novaOpcao,
          ordemTemp: tipo === "Ordem" ? "" : undefined, // Only relevant for Ordem type
        },
      ]);
      setNovaOpcao("");
    }
  };

  const handleRemoveOpcao = (id: number) => {
    setOpcoes((old) => old.filter((o) => o.id !== id));
    // Also remove from correct answers if it was selected
    setRespostaCorreta((rc) => rc.filter((x) => x !== id));
  };

  // Toggle correctness for Pergunta, MultiplaEscolha, Outras
  const handleToggleRespostaCorreta = (id: number) => {
    if (tipo === "Pergunta") {
      // If it's already the correct one, unselect it, otherwise select it
      setRespostaCorreta((prev) => (prev.includes(id) ? [] : [id]));
    } else if (tipo === "MultiplaEscolha" || tipo === "Outras") {
      setRespostaCorreta((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    }
    // No toggle needed for Vantagem, Desvantagem, Ordem here
  };

  // Handle temporary order input for 'Ordem' type
  const handleSetOrder = (optionId: number, newValue: string) => {
     // Allow only numbers or empty string
    const sanitizedValue = newValue.replace(/[^0-9]/g, '');
    setOpcoes((old) =>
      old.map((op) =>
        op.id === optionId
          ? { ...op, ordemTemp: sanitizedValue }
          : op
      )
    );
  };

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
      // Try to parse value as JSON (number, boolean, simple string)
      let parsedValue: any = value;
      try {
        // Check if it's a plain number string
        if (/^\d+(\.\d+)?$/.test(value)) {
            parsedValue = Number(value);
        } else if (value.toLowerCase() === 'true') {
            parsedValue = true;
        } else if (value.toLowerCase() === 'false') {
            parsedValue = false;
        } else {
           // Keep as string if not obviously number/boolean
           // We avoid full JSON.parse here to keep simple values simple
           parsedValue = value;
        }

      } catch (e) {
         // Keep as string if parsing fails
         parsedValue = value;
      }

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
    setImagem("");
    setDica("");
    setVantagem("");
    setDesvantagem("");
    setRespostaCorreta([]);
    setDificuldade("facil");
    setImageType("clickable");
    setCurrentMeta({}); // Reset metadata
    setMetaKey("");
    setMetaValue("");
    setEditIndex(null);
    setShowPreview(false);

    // Keep categories/sources if locked
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

    if (imgType === "clickable") {
      // Using unique ID based on title/randomness to avoid modal conflicts if multiple cards shown
      const modalId = `zoomModal-${cardTitle.replace(/\s+/g, '-')}-${Math.random().toString(36).substring(7)}`;
      return `
<style>
  /* Basic styles - ideally these should be global CSS */
  .zoom-container-${modalId} { position: relative; display: inline-block; cursor: pointer; text-align: center; margin-bottom: 1em; }
  .zoom-modal-${modalId} { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: none; align-items: center; justify-content: center; background-color: rgba(0,0,0,0.85); z-index: 10000; overflow-y: auto; }
  .zoom-modal-content-${modalId} { margin: 1rem auto; max-width: 90%; max-height: 90%; position: relative; }
  .zoom-modal-content-${modalId} img { display: block; margin: auto; width: auto; max-width: 100%; height: auto; max-height: 85vh; object-fit: contain; }
  .zoom-modal-close-${modalId} { position: absolute; top: 0.5rem; right: 1rem; color: white; font-size: 2.5rem; text-decoration: none; cursor: pointer; line-height: 1; }
</style>
<div class="zoom-container-${modalId}" onclick="document.getElementById('${modalId}').style.display='flex'">
  <img src="${imgPath}" alt="${cardTitle}" style="width: 300px; height: auto; display: block; margin: 0 auto; border: 1px solid #eee;" />
</div>
<div id="${modalId}" class="zoom-modal-${modalId}" onclick="this.style.display='none'">
  <div class="zoom-modal-content-${modalId}" onclick="event.stopPropagation()">
    <a class="zoom-modal-close-${modalId}" onclick="document.getElementById('${modalId}').style.display='none'">×</a>
    <img src="${imgPath}" alt="${cardTitle}" />
  </div>
</div>
${rawPergunta}
`;
    } else if (imgType === "hero") {
      return `
<img src="${imgPath}" style="display: block; margin: 0 auto 1em auto; width: 120px; height: auto; border-radius: 50%; border: 2px solid #ccc;" alt="${cardTitle}" /><br>
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
     if ((tipo === "Pergunta" || tipo === "MultiplaEscolha" || tipo === "Ordem" || tipo === "Vantagem" || tipo === "Desvantagem" || tipo === "Outras") && opcoes.length === 0) {
        alert(`Cartas do tipo '${tipo}' devem ter pelo menos uma opção.`);
        return;
     }


    // --- Prepare RespostaCorreta ---
    let finalRespostaCorreta: number | number[] = []; // Default to empty array

    if (tipo === "Ordem") {
      // Validate order inputs - check for duplicates and gaps? (optional)
      const sorted = [...opcoes]
        .filter(o => o.ordemTemp?.trim()) // Only consider options with an order defined
        .sort((a, b) => {
          const posA = parseInt(a.ordemTemp!, 10);
          const posB = parseInt(b.ordemTemp!, 10);
          return posA - posB;
        });
        // Check if all options have a valid, unique order number if needed
        const orderNumbers = sorted.map(o => parseInt(o.ordemTemp!, 10));
        if (new Set(orderNumbers).size !== orderNumbers.length) {
            alert("Erro: Números de ordem duplicados detectados para o tipo 'Ordem'.");
            return;
        }
        // Ensure all options intended for ordering have a number
        if (opcoes.some(o => !o.ordemTemp?.trim())) {
            // Decide if this is an error or just means unordered items go last
            console.warn("Algumas opções do tipo 'Ordem' não têm número de ordem definido.");
            // Optional: alert("Atenção: Algumas opções do tipo 'Ordem' não têm número de ordem. Elas não serão incluídas na sequência correta.")
        }

      finalRespostaCorreta = sorted.map((o) => o.id);
    } else if (tipo === "Vantagem") {
      finalRespostaCorreta = opcoes.map((o) => o.id); // All options are correct
    } else if (tipo === "Desvantagem") {
      finalRespostaCorreta = []; // No options are correct
    } else if (tipo === "Pergunta") {
      // Expects exactly one answer for 'Pergunta'
      if (respostaCorreta.length === 1) {
        finalRespostaCorreta = respostaCorreta[0]; // Store as single number
      } else if (respostaCorreta.length > 1) {
         alert("Erro: Cartas do tipo 'Pergunta' devem ter apenas uma resposta correta selecionada.");
         return;
      } else {
         // Allow creating question cards with no correct answer initially? Or force one?
         // Forcing one:
         alert("Erro: Selecione uma resposta correta para a carta do tipo 'Pergunta'.");
         return;
         // Allowing zero (store as 0 or empty array):
         // finalRespostaCorreta = 0; // Or keep as [] depending on game logic expectation
      }
    } else { // MultiplaEscolha, Outras
      finalRespostaCorreta = [...respostaCorreta]; // Store as array
    }

    // --- Prepare Pergunta HTML ---
    const computedPergunta = buildPerguntaHtml(pergunta, imagem, imageType, titulo);

    // --- Create/Update Card Object ---
    const cartaData: Carta = {
      tipo,
      titulo,
      pergunta: computedPergunta,
      imageType: imagem ? imageType : undefined, // Only store if image exists
      imagem: imagem || undefined, // Store image path or undefined
      opcoes: opcoes.map(({ ordemTemp, ...rest }) => rest), // Remove temporary order field before saving
      respostaCorreta: finalRespostaCorreta,
      dificuldade,
      categorias,
      fontes,
      vantagem,
      desvantagem,
      dica,
      meta: Object.keys(currentMeta).length > 0 ? currentMeta : undefined, // Only store meta if not empty
    };


    if (editIndex !== null) {
      // Update existing card
      setCards((oldCards) =>
        oldCards.map((c, i) =>
          i === editIndex
            ? { ...c, ...cartaData, edited: true } // Keep origBaralhoId, mark as edited
            : c
        )
      );
    } else {
      // Add new card
      setCards((oldCards) => [...oldCards, { ...cartaData, edited: true }]); // Mark new cards as edited too
    }

    resetCarta(true); // Reset form, keeping locked fields
  };


  const loadCardForEdit = (index: number) => {
    setShowPreview(false); // Close preview when editing
    const carta = cards[index];
    if (!carta) return;

    setEditIndex(index);
    setTipo(carta.tipo as TipoCarta);
    setTitulo(carta.titulo);

    // --- Image and Pergunta Handling ---
    let p = carta.pergunta;
    let extractedImage = carta.imagem || ""; // Prioritize existing image field
    let extractedImageType = carta.imageType || "clickable"; // Default if not set but image exists

    // If image field wasn't set, try to parse from HTML (legacy support)
    if (!extractedImage && p.includes('<img')) {
        const heroImgRegex = /<img[^>]+src="([^"]+)"[^>]*style="[^"]*display: block[^"]*"[^>]*>/; // Basic check for hero style
        const modalImgRegex = /<div class="zoom-container[^"]*"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>/; // Basic check for modal structure

        const modalMatch = p.match(modalImgRegex);
        const heroMatch = p.match(heroImgRegex); // Check hero after modal

        if (modalMatch && modalMatch[1]) {
            extractedImage = modalMatch[1];
            extractedImageType = "clickable";
            // Attempt to remove the entire zoom-container and its style block cleanly
            p = p.replace(/<style>[\s\S]*?<\/style>/, '').replace(modalMatch[0], '').trim();
        } else if (heroMatch && heroMatch[1]) {
            extractedImage = heroMatch[1];
            extractedImageType = "hero";
            p = p.replace(heroMatch[0], '').replace(/<br\s*\/?>/,'').trim(); // Remove image and potential trailing <br>
        }
        // Add more robust regex/parsing if needed
    }

    setImagem(extractedImage);
    setImageType(extractedImageType);
    // Set the pergunta state *after* potentially removing image HTML
    setPergunta(p);

    // --- Options and Correct Answer Handling ---
    const copyOp = carta.opcoes.map((o) => ({ ...o, ordemTemp: "" })); // Add temporary field back

    if (carta.tipo === "Ordem" && Array.isArray(carta.respostaCorreta)) {
      const seq = carta.respostaCorreta as number[];
      copyOp.forEach((op) => {
        const pos = seq.indexOf(op.id);
        op.ordemTemp = pos >= 0 ? String(pos + 1) : ""; // Set temporary order from saved sequence
      });
       setRespostaCorreta([]); // Clear selection state for Order type
    } else if (carta.tipo === "Vantagem" || carta.tipo === "Desvantagem") {
        setRespostaCorreta([]); // No specific options are marked correct in the UI
    } else if (carta.tipo === "Pergunta") {
       // Handle both number and array[1] format
       if (typeof carta.respostaCorreta === "number" && carta.respostaCorreta !== 0) {
           setRespostaCorreta([carta.respostaCorreta]);
       } else if (Array.isArray(carta.respostaCorreta) && carta.respostaCorreta.length === 1) {
           setRespostaCorreta([carta.respostaCorreta[0]]);
       } else {
           setRespostaCorreta([]); // No correct answer saved or invalid format
       }
    } else { // MultiplaEscolha, Outras
        const arr = Array.isArray(carta.respostaCorreta)
          ? (carta.respostaCorreta as number[])
          : (typeof carta.respostaCorreta === 'number' && carta.respostaCorreta !== 0 ? [carta.respostaCorreta] : []);
        setRespostaCorreta(arr.filter((x) => x !== 0)); // Ensure only valid IDs
    }

    setOpcoes(copyOp);

    // --- Other Fields ---
    setDificuldade(carta.dificuldade as Dificuldade);
    setCategorias(carta.categorias);
    setFontes(carta.fontes);
    setVantagem(carta.vantagem);
    setDesvantagem(carta.desvantagem);
    setDica(carta.dica);
    setCurrentMeta(carta.meta || {}); // Load metadata

    // Scroll to the form for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteCard = (index: number) => {
    if (window.confirm(`Tem certeza que deseja excluir a carta "${cards[index]?.titulo || `Carta ${index + 1}`}"?`)) {
        setCards((old) => old.filter((_, i) => i !== index));
        if (editIndex === index) {
            resetCarta(true); // Reset form if deleting the card being edited
        }
    }
  };

  const cancelEdit = () => {
    resetCarta(true); // Reset form, keep locked fields
  };

  // --- Exporting ---
  const prepareForDownload = (): Omit<Carta, 'origBaralhoId' | 'edited'>[] => {
    // Remove temporary UI state and internal tracking fields before export
    return cards.map(({ origBaralhoId, edited, opcoes: cardOpcoes, ...rest }) => ({
        ...rest,
        opcoes: cardOpcoes.map(({ ordemTemp, ...op }) => op) // Remove ordemTemp from options
    }));
  };

  const generateCode = () => {
    const deckFinal = prepareForDownload();
    // Sanitize deckName for variable name
    const varName = deckName.replace(/[^a-zA-Z0-9_$]/g, '_');
    const deck = JSON.stringify(deckFinal, null, 2);
    // Add comments and export
    return `// Baralho gerado por CriadorDeCarta
// Nome: ${deckName}
// Data: ${new Date().toISOString()}

const ${varName} = ${deck};

export default ${varName};
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
  // (Used for both JSON preview and static preview component)
  const getCurrentCardDataForPreview = (): Carta => {
     let finalRespostaCorreta: number | number[] = [];
     if (tipo === "Ordem") {
        const sorted = [...opcoes]
          .filter(o => o.ordemTemp?.trim())
          .sort((a, b) => parseInt(a.ordemTemp!, 10) - parseInt(b.ordemTemp!, 10));
        finalRespostaCorreta = sorted.map(o => o.id);
     } else if (tipo === "Vantagem") {
        finalRespostaCorreta = opcoes.map(o => o.id);
     } else if (tipo === "Desvantagem") {
         finalRespostaCorreta = [];
     } else if (tipo === "Pergunta") {
         finalRespostaCorreta = respostaCorreta.length > 0 ? respostaCorreta[0] : 0; // Use 0 if none selected for preview?
     } else {
         finalRespostaCorreta = [...respostaCorreta];
     }

     const computedPergunta = buildPerguntaHtml(pergunta, imagem, imageType, titulo);

      return {
          tipo,
          titulo,
          pergunta: computedPergunta,
          imageType: imagem ? imageType : undefined,
          imagem: imagem || undefined,
          opcoes: opcoes.map(({ ordemTemp, ...rest }) => rest), // Preview without temp field
          respostaCorreta: finalRespostaCorreta,
          dificuldade,
          categorias,
          fontes,
          vantagem,
          desvantagem,
          dica,
          meta: Object.keys(currentMeta).length > 0 ? currentMeta : undefined,
      };
  }

  // --- Render ---
  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Criador de Baralho</h1>

      {/* Deck Name */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <label htmlFor="deckNameInput" className="block text-sm font-medium text-gray-600 mb-2">Nome do Baralho (usado no nome do arquivo e variável):</label>
        <input
          id="deckNameInput"
          type="text"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder="Ex: baralho_historia_brasil"
          className="border p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* File Loading */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Carregar/Mesclar Baralhos</h2>
        <p className="text-sm text-gray-500">
          Selecione um ou mais arquivos <code>.js</code> ou <code>.json</code> contendo arrays de cartas para adicionar ao baralho atual.
        </p>
        <input type="file" accept=".js,.json" onChange={handleFileUpload} multiple className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
      </div>

      {/* Loaded Decks Management */}
      {baralhosCarregados.length > 0 && (
        <div className="bg-white shadow-md p-4 rounded-lg mb-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Baralhos Carregados</h2>
          <div className="flex items-center space-x-2 mb-4 bg-gray-50 p-2 rounded-md">
            <input
              id="keepEdited"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              checked={manterCartasEditadas}
              onChange={(e) => setManterCartasEditadas(e.target.checked)}
            />
            <label htmlFor="keepEdited" className="text-sm text-gray-600">Manter cartas editadas ao remover baralho da lista</label>
          </div>
          <ul className="space-y-3">
            {baralhosCarregados.map((b) => (
              <li key={b.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 sm:space-x-4 p-2 border rounded-md">
                <div>
                  <span className="font-medium text-gray-800">{b.nome}</span>
                  <span className="text-sm text-gray-500 ml-2">({b.cartas.length} cartas)</span>
                </div>
                {!b.adicionado ? (
                  <button
                    onClick={() => adicionarBaralho(b.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out"
                  >
                    Adicionar ao Baralho Atual
                  </button>
                ) : (
                  <button
                    onClick={() => removerBaralho(b.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm font-medium shadow-sm transition duration-150 ease-in-out"
                  >
                    Remover da Lista
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Adicionar copia as cartas do baralho carregado para o seu baralho principal. Remover da Lista remove as cartas originárias desse baralho (a menos que tenham sido editadas e a opção acima esteja marcada).
          </p>
        </div>
      )}

      {/* Card Editor Form */}
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        {editIndex !== null ? `Editando Carta: ${cards[editIndex]?.titulo || ''}` : "Adicionar Nova Carta"}
      </h2>
      <div className="bg-white shadow-lg p-6 rounded-lg mb-6 space-y-6 border border-indigo-100">

        {/* Card Type and Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="cardType" className="block text-sm font-medium text-gray-600 mb-1">Tipo da Carta</label>
            <select
              id="cardType"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoCarta)}
              className="border p-2 rounded-md w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {CARD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
             <p className="text-xs text-gray-500 mt-1">Define como as opções e respostas são tratadas.</p>
          </div>
          <div>
            <label htmlFor="cardTitle" className="block text-sm font-medium text-gray-600 mb-1">Título da Carta *</label>
            <input
              id="cardTitle"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="border p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Image Options */}
        <div className="bg-gray-50 p-4 rounded-md border">
             <h3 className="text-md font-semibold text-gray-700 mb-2">Imagem (Opcional)</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                    <label htmlFor="imageType" className="block text-sm font-medium text-gray-600 mb-1">Estilo da Imagem</label>
                    <select
                      id="imageType"
                      value={imageType}
                      onChange={(e) => setImageType(e.target.value as "clickable" | "hero")}
                      className="border p-2 rounded-md w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={!imagem} // Disable if no image path
                    >
                      <option value="clickable">Clicável (Zoom)</option>
                      <option value="hero">Hero (Pequena/Avatar)</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="imagePath" className="block text-sm font-medium text-gray-600 mb-1">Caminho/URL da Imagem</label>
                    <input
                      id="imagePath"
                      type="text"
                      value={imagem}
                      onChange={(e) => setImagem(e.target.value)}
                      className="border p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Ex: /imagens/minha_foto.png ou https://..."
                    />
                </div>
            </div>
             <p className="text-xs text-gray-500 mt-2">
               Preencha o caminho para incluir uma imagem. Clicável abre em tela cheia, Hero é menor e centralizada (bom para avatares).
             </p>
        </div>


        {/* Pergunta/Description */}
        <div>
          <label htmlFor="cardQuestion" className="block text-sm font-medium text-gray-600 mb-1">Pergunta/Descrição</label>
          <textarea
            id="cardQuestion"
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            placeholder="Digite a pergunta ou a descrição da carta aqui. Pode incluir HTML básico (use com cuidado)."
            className="border p-2 w-full rounded-md h-24 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
           <p className="text-xs text-gray-500 mt-1">Se usar imagem, o HTML dela será adicionado automaticamente acima deste texto.</p>
        </div>

        {/* Options Section */}
        {(tipo !== "Vantagem" && tipo !== "Desvantagem") && ( // Common logic for types needing specific answers
          <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 space-y-4">
            <h3 className="text-lg font-semibold text-indigo-800">Opções e Respostas</h3>
            {/* Add Option Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={novaOpcao}
                onChange={(e) => setNovaOpcao(e.target.value)}
                placeholder="Texto da nova opção"
                className="border p-2 rounded-md flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                onKeyDown={(e) => e.key === 'Enter' && handleAddOpcao()}
              />
              <button
                onClick={handleAddOpcao}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out"
              >
                + Opção
              </button>
            </div>

            {/* Options List */}
            {opcoes.length === 0 && <p className="text-sm text-gray-500">Nenhuma opção adicionada ainda.</p>}
            <ul className="space-y-3">
              {opcoes.map((o, index) => (
                <li
                  key={o.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 bg-white p-2 border rounded-md shadow-sm"
                >
                  <span className="flex-1 text-gray-800 mb-2 sm:mb-0">{o.texto}</span>

                  {/* Order Input (only for Ordem type) */}
                  {tipo === "Ordem" && (
                    <div className="flex items-center space-x-1">
                      <label htmlFor={`order-${o.id}`} className="text-sm text-gray-600">Posição:</label>
                      <input
                        id={`order-${o.id}`}
                        type="text" // Use text to allow empty easily
                        inputMode="numeric" // Hint for numeric keyboard on mobile
                        pattern="[0-9]*" // Basic pattern validation
                        min={1}
                        onChange={(e) => handleSetOrder(o.id, e.target.value)}
                        value={o.ordemTemp ?? ""}
                        className="border p-1 w-16 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-center"
                        placeholder="#"
                      />
                    </div>
                  )}

                  {/* Correct Answer Toggle (not for Ordem/Vantagem/Desvantagem) */}
                  {(tipo === "Pergunta" || tipo === "MultiplaEscolha" || tipo === "Outras") && (
                    <button
                      onClick={() => handleToggleRespostaCorreta(o.id)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition duration-150 ease-in-out ${
                        respostaCorreta.includes(o.id)
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      title={respostaCorreta.includes(o.id) ? "Desmarcar como correta" : "Marcar como correta"}
                    >
                      {respostaCorreta.includes(o.id)
                        ? "✓ Correta"
                        : "Marcar"}
                    </button>
                  )}

                  {/* Remove Option Button */}
                  <button
                    onClick={() => handleRemoveOpcao(o.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm shadow-sm transition duration-150 ease-in-out self-end sm:self-center"
                    title="Remover opção"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
             {tipo === "Ordem" && <p className="text-xs text-gray-500">Preencha a posição correta para cada item na sequência.</p>}
             {tipo === "Pergunta" && <p className="text-xs text-gray-500">Selecione exatamente uma opção correta.</p>}
             {tipo === "MultiplaEscolha" && <p className="text-xs text-gray-500">Selecione uma ou mais opções corretas.</p>}
             {tipo === "Outras" && <p className="text-xs text-gray-500">Selecione as opções corretas conforme a lógica da sua carta.</p>}
          </div>
        )}

        {/* Options Section for Vantagem/Desvantagem */}
        {(tipo === "Vantagem" || tipo === "Desvantagem") && (
          <div className="bg-gray-50 p-4 rounded-md border space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Opções</h3>
             {/* Add Option Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={novaOpcao}
                onChange={(e) => setNovaOpcao(e.target.value)}
                placeholder="Texto da nova opção"
                className="border p-2 rounded-md flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                 onKeyDown={(e) => e.key === 'Enter' && handleAddOpcao()}
              />
              <button
                onClick={handleAddOpcao}
                 className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out"
              >
                + Opção
              </button>
            </div>
            {/* Options List */}
             {opcoes.length === 0 && <p className="text-sm text-gray-500">Nenhuma opção adicionada ainda.</p>}
            <ul className="space-y-2">
              {opcoes.map((o) => (
                <li key={o.id} className="flex items-center space-x-2 bg-white p-2 border rounded-md shadow-sm">
                  <span className={`flex-1 ${tipo === 'Vantagem' ? 'text-green-700 font-medium' : 'text-red-700'}`}>{o.texto}</span>
                  <button
                    onClick={() => handleRemoveOpcao(o.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm shadow-sm transition duration-150 ease-in-out"
                    title="Remover opção"
                  >
                     ✕
                  </button>
                </li>
              ))}
            </ul>
            {tipo === "Desvantagem" && (
              <p className="text-xs text-gray-500 bg-red-100 p-2 rounded border border-red-200">
                <strong className="font-semibold">Nota:</strong> Para cartas de Desvantagem, todas as opções listadas são inerentemente consideradas incorretas ou representam uma desvantagem no contexto do jogo. Nenhuma precisa ser marcada.
              </p>
            )}
            {tipo === "Vantagem" && (
              <p className="text-xs text-gray-500 bg-green-100 p-2 rounded border border-green-200">
                <strong className="font-semibold">Nota:</strong> Para cartas de Vantagem, todas as opções listadas são inerentemente consideradas corretas ou representam uma vantagem no contexto do jogo. Nenhuma precisa ser marcada individualmente.
              </p>
            )}
          </div>
        )}

        {/* Difficulty */}
         <div>
              <label htmlFor="cardDifficulty" className="block text-sm font-medium text-gray-600 mb-1">Dificuldade</label>
              <select
                id="cardDifficulty"
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value as Dificuldade)}
                className="border p-2 rounded-md w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d.charAt(0).toUpperCase() + d.slice(1)} {/* Capitalize */}
                  </option>
                ))}
              </select>
          </div>

        {/* Categories */}
        <div className="bg-gray-50 p-4 rounded-md border space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-700">Categorias</h3>
            <button
              onClick={() => setCategoriasBloqueadas(!categoriasBloqueadas)}
              className={`px-4 py-1 rounded-md text-white text-sm font-medium shadow-sm transition duration-150 ease-in-out ${
                categoriasBloqueadas ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {categoriasBloqueadas ? "🔒 Travado (Manter ao Resetar)" : "🔓 Destravado (Limpar ao Resetar)"}
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Nova categoria"
              className="border p-2 rounded-md flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategoria()}
            />
            <button
              onClick={handleAddCategoria}
               className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out"
            >
              + Categoria
            </button>
          </div>
          {categorias.length > 0 ? (
             <ul className="flex flex-wrap gap-2">
                {categorias.map((c, i) => (
                  <li key={i} className="flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    <span>{c}</span>
                    <button
                      onClick={() => handleRemoveCategoria(c)}
                      className="ml-1.5 text-indigo-500 hover:text-indigo-700"
                      title={`Remover categoria ${c}`}
                    >
                      ×
                    </button>
                  </li>
                ))}
             </ul>
           ) : (<p className="text-sm text-gray-500">Nenhuma categoria adicionada.</p>)}
          <p className="text-xs text-gray-500">
            Se Travado estiver ativado, as categorias <strong>não</strong> serão limpas ao adicionar/atualizar uma carta.
          </p>
        </div>

        {/* Fontes */}
        <div className="bg-gray-50 p-4 rounded-md border space-y-4">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-700">Fontes/Referências</h3>
             <button
              onClick={() => setFontesBloqueadas(!fontesBloqueadas)}
              className={`px-4 py-1 rounded-md text-white text-sm font-medium shadow-sm transition duration-150 ease-in-out ${
                fontesBloqueadas ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {fontesBloqueadas ? "🔒 Travado (Manter ao Resetar)" : "🔓 Destravado (Limpar ao Resetar)"}
            </button>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              value={novaFonte}
              onChange={(e) => setNovaFonte(e.target.value)}
              placeholder="Nova fonte ou URL"
              className="border p-2 rounded-md flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
               onKeyDown={(e) => e.key === 'Enter' && handleAddFonte()}
            />
            <button
              onClick={handleAddFonte}
               className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out"
            >
              + Fonte
            </button>
          </div>
           {fontes.length > 0 ? (
             <ul className="space-y-1">
                {fontes.map((f, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>- {f}</span>
                    <button
                      onClick={() => handleRemoveFonte(f)}
                      className="text-red-500 hover:text-red-700 text-xs"
                       title={`Remover fonte ${f}`}
                    >
                       (Remover)
                    </button>
                  </li>
                ))}
             </ul>
           ) : (<p className="text-sm text-gray-500">Nenhuma fonte adicionada.</p>)}
            <p className="text-xs text-gray-500">
             Se Travado estiver ativado, as fontes <strong>não</strong> serão limpas ao adicionar/atualizar uma carta.
          </p>
        </div>

         {/* Vantagem, Desvantagem, Dica */}
        <div className="bg-gray-50 p-4 rounded-md border space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Textos Auxiliares (Opcional)</h3>
          <div>
            <label htmlFor="cardAdvantage" className="block text-sm font-medium text-gray-600 mb-1">Vantagem:</label>
            <input
              id="cardAdvantage"
              type="text"
              value={vantagem}
              onChange={(e) => setVantagem(e.target.value)}
              placeholder="Texto explicando a vantagem (se houver)"
              className="border p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="cardDisadvantage" className="block text-sm font-medium text-gray-600 mb-1">Desvantagem:</label>
            <input
              id="cardDisadvantage"
              type="text"
              value={desvantagem}
              onChange={(e) => setDesvantagem(e.target.value)}
               placeholder="Texto explicando a desvantagem (se houver)"
              className="border p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="cardHint" className="block text-sm font-medium text-gray-600 mb-1">Dica:</label>
            <input
              id="cardHint"
              type="text"
              value={dica}
              onChange={(e) => setDica(e.target.value)}
              placeholder="Dica para ajudar a responder"
              className="border p-2 w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Metadata Section */}
        <div className="bg-gray-50 p-4 rounded-md border space-y-4">
           <h3 className="text-lg font-semibold text-gray-700">Metadados Customizados (Opcional)</h3>
           <p className="text-xs text-gray-500">Adicione pares chave-valor para dados específicos do jogo (ex: timeLimit, pointsPerSecond, effectId). Valores serão salvos como número, booleano (true/false) ou string.</p>
           <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
             <input
               type="text"
               value={metaKey}
               onChange={(e) => setMetaKey(e.target.value)}
               placeholder="Chave (ex: timeLimit)"
               className="border p-2 rounded-md flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
             />
             <input
               type="text"
               value={metaValue}
               onChange={(e) => setMetaValue(e.target.value)}
               placeholder="Valor (ex: 30, true, special)"
               className="border p-2 rounded-md flex-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
               onKeyDown={(e) => e.key === 'Enter' && handleAddMeta()}
             />
             <button
               onClick={handleAddMeta}
               className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md shadow-sm font-medium transition duration-150 ease-in-out"
             >
               + Meta
             </button>
           </div>
           {Object.keys(currentMeta).length > 0 ? (
             <ul className="space-y-1">
               {Object.entries(currentMeta).map(([key, value]) => (
                 <li key={key} className="flex items-center justify-between bg-white p-1.5 border rounded text-sm">
                   <span className="text-gray-700 font-mono">
                      <strong className="text-teal-700">{key}:</strong> {JSON.stringify(value)}
                   </span>
                   <button
                     onClick={() => handleRemoveMeta(key)}
                      className="text-red-500 hover:text-red-700 text-xs ml-2"
                     title={`Remover metadado ${key}`}
                   >
                     (Remover)
                   </button>
                 </li>
               ))}
             </ul>
           ) : (<p className="text-sm text-gray-500">Nenhum metadado adicionado.</p>)}
        </div>


        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t">
            <div className="flex flex-col md:flex-row gap-4">
              <button
                onClick={handleAddOrUpdateCard}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md shadow-md font-semibold text-lg transition duration-150 ease-in-out w-full md:w-auto"
              >
                {editIndex !== null ? "✔ Atualizar Carta" : "➕ Adicionar Carta ao Baralho"}
              </button>
              {editIndex !== null && (
                <button
                  onClick={cancelEdit}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm w-full md:w-auto transition duration-150 ease-in-out"
                >
                  Cancelar Edição
                </button>
              )}
             </div>
           <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm w-full md:w-auto transition duration-150 ease-in-out"
          >
            {showPreview ? "🙈 Fechar Preview" : "👀 Preview Estático"}
          </button>
        </div>
      </div>

       {/* Static Preview Area */}
       {showPreview && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2 text-gray-700">Pré-visualização Estática da Carta Atual</h2>
           <div className="flex justify-center">
               <CardStaticView card={getCurrentCardDataForPreview()} />
           </div>
        </div>
      )}

      {/* JSON Preview Area */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h2 className="text-xl font-bold mb-2 text-gray-700">Preview da Carta Atual (JSON)</h2>
        <div className="bg-gray-800 text-white p-4 rounded-md overflow-auto max-h-64 text-sm">
          <pre className="whitespace-pre-wrap break-all font-mono">
            {JSON.stringify(getCurrentCardDataForPreview(), null, 2)}
          </pre>
        </div>
      </div>

      {/* Created Cards List */}
      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Cartas no Baralho Atual ({cards.length})</h2>
        {cards.length === 0 ? (
          <p className="text-gray-500 mb-4">Nenhuma carta criada ou adicionada ainda.</p>
        ) : (
          <div className="flex flex-wrap gap-3 mb-6">
            {cards.map((c, index) => (
              <div key={index} className={`flex items-center rounded-md shadow-sm border ${c.edited ? 'border-blue-300' : 'border-gray-300'} ${index === editIndex ? 'ring-2 ring-offset-1 ring-indigo-500' : ''}`}>
                <button
                  onClick={() => loadCardForEdit(index)}
                  className={`px-3 py-1 rounded-l-md text-sm font-medium transition duration-150 ease-in-out ${index === editIndex ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                  title={`Editar: ${c.titulo}`}
                >
                   {c.titulo || `Carta ${index + 1}`}
                   {c.edited && <span className="text-blue-500 ml-1" title="Editada">*</span>}
                </button>
                <button
                  onClick={() => deleteCard(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-r-md text-sm font-bold transition duration-150 ease-in-out"
                  title={`Excluir Carta: ${c.titulo}`}
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
        <button onClick={downloadCode} disabled={cards.length === 0} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg font-semibold text-lg transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
          💾 Baixar Baralho como Arquivo <code>.js</code>
        </button>
      </div>
    </div>
  );
};

export default CriadorDeCarta;