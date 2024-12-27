// src/components/CriadorDeCarta.tsx

import React, { useState } from 'react';

/* ================================ 
   Tipos e interfaces
   ================================ */
interface Opcao {
  id: number;
  texto: string;
}

interface Carta {
  tipo: string;
  titulo: string;
  pergunta: string;
  opcoes: Opcao[];
  respostaCorreta: number | number[];
  dificuldade: string;
  categorias: string[];
  fontes: string[];
  vantagem: string;
  desvantagem: string;
  dica: string;
  imageType?: 'clickable' | 'hero';
  imagem?: string;
  origBaralhoId?: number;
  edited?: boolean;
}

const CARD_TYPES = [
  'Pergunta',
  'MultiplaEscolha',
  'Ordem',
  'Vantagem',
  'Desvantagem',
  'Outras',
] as const;
type TipoCarta = typeof CARD_TYPES[number];

const DIFFICULTIES = ['facil', 'normal', 'dificil'] as const;
type Dificuldade = typeof DIFFICULTIES[number];

interface BaralhoCarregado {
  id: number;
  nome: string;
  cartas: Carta[];
  adicionado: boolean;
}

/* 
  Para evitar o erro de no overlap,
  usamos um array e checamos se tipo está incluso nele.
*/
const ALLOW_MARK = ['Pergunta', 'MultiplaEscolha', 'Ordem', 'Outras'] as const;

/* ================================
   Componente estático de Preview
   ================================ */
const CardStaticView: React.FC<{ card: Carta }> = ({ card }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '400px',
        margin: '1rem 0',
      }}
    >
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{card.titulo}</h2>
      <p style={{ fontSize: '0.875rem', color: '#666' }}>
        Tipo: {card.tipo} | Dificuldade: {card.dificuldade}
      </p>

      {/* Renderiza a pergunta (pode conter <img> etc.) */}
      <div
        style={{ margin: '8px 0', fontSize: '0.875rem' }}
        // Se houver &quot; no HTML, não deve quebrar
        dangerouslySetInnerHTML={{ __html: card.pergunta }}
      />

      {/* Lista de opções, sem clique */}
      {card.opcoes && card.opcoes.length > 0 && (
        <ul
          style={{
            marginTop: '8px',
            paddingLeft: '20px',
            fontSize: '0.875rem',
          }}
        >
          {card.opcoes.map((op) => (
            <li key={op.id}>{op.texto}</li>
          ))}
        </ul>
      )}

      {/* Categorias, Fontes, etc */}
      <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#999' }}>
        <p>Categorias: {card.categorias.join(', ')}</p>
        <p>Fontes: {card.fontes.join(', ')}</p>
      </div>

      {card.dica && (
        <p style={{ fontSize: '0.75rem', color: '#0a0' }}>
          Dica: {card.dica}
        </p>
      )}
      {card.vantagem && (
        <p style={{ fontSize: '0.75rem', color: '#090' }}>
          Vantagem: {card.vantagem}
        </p>
      )}
      {card.desvantagem && (
        <p style={{ fontSize: '0.75rem', color: '#900' }}>
          Desvantagem: {card.desvantagem}
        </p>
      )}
    </div>
  );
};

/* ================================ 
   Criador de Cartas
   ================================ */
const CriadorDeCarta: React.FC = () => {
  const [deckName, setDeckName] = useState('meu_baralho');
  const [cards, setCards] = useState<Carta[]>([]);

  // Estados da carta atual
  const [tipo, setTipo] = useState<TipoCarta>('Pergunta');
  const [titulo, setTitulo] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [opcoes, setOpcoes] = useState<Opcao[]>([]);
  const [novaOpcao, setNovaOpcao] = useState('');

  const [imageType, setImageType] = useState<'clickable' | 'hero'>('clickable');
  const [imagem, setImagem] = useState('');

  const [respostaCorreta, setRespostaCorreta] = useState<number[]>([]);
  const [dificuldade, setDificuldade] = useState<Dificuldade>('facil');

  const [categorias, setCategorias] = useState<string[]>([]);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [categoriasBloqueadas, setCategoriasBloqueadas] = useState(false);

  const [fontes, setFontes] = useState<string[]>([]);
  const [novaFonte, setNovaFonte] = useState('');
  const [fontesBloqueadas, setFontesBloqueadas] = useState(false);

  const [vantagem, setVantagem] = useState('');
  const [desvantagem, setDesvantagem] = useState('');
  const [dica, setDica] = useState('');

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [baralhosCarregados, setBaralhosCarregados] = useState<BaralhoCarregado[]>([]);
  const [manterCartasEditadas, setManterCartasEditadas] = useState(false);

  /* ================================
     Ler arquivo .js ou .json
     ================================ */
  const parseJSDeckFile = (content: string): Carta[] => {
    const match = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*?\]);/);
    if (!match) {
      throw new Error(
        'Nao foi possivel encontrar um array exportado no arquivo JS.'
      );
    }
    const arrayStr = match[1];
    const json = JSON.parse(arrayStr) as Carta[];
    return json;
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
        if (file.name.endsWith('.js')) {
          newCards = parseJSDeckFile(content);
        } else if (file.name.endsWith('.json')) {
          newCards = JSON.parse(content) as Carta[];
        } else {
          alert('Formato nao suportado. Use arquivos .js ou .json');
          continue;
        }
        const nome = file.name.replace(/\.(js|json)$/, '');
        newBaralhos.push({
          id: Date.now() + Math.random(),
          nome,
          cartas: newCards,
          adicionado: false,
        });
      } catch (error: any) {
        alert('Erro ao ler o arquivo ' + file.name + ': ' + error.message);
      }
    }

    if (newBaralhos.length > 0) {
      setBaralhosCarregados((prev) => [...prev, ...newBaralhos]);
    }
  };

  const adicionarBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId) {
          const newCards = b.cartas.map((carta) => ({
            ...carta,
            origBaralhoId: baralhoId,
            edited: false,
          }));
          setCards((old) => [...old, ...newCards]);
          return { ...b, adicionado: true };
        }
        return b;
      })
    );
  };

  const removerBaralho = (baralhoId: number) => {
    setBaralhosCarregados((prev) =>
      prev.map((b) => {
        if (b.id === baralhoId) {
          setCards((oldCards) =>
            oldCards.filter((c) => {
              if (c.origBaralhoId === baralhoId) {
                if (c.edited && manterCartasEditadas) {
                  return true;
                } else if (c.edited && !manterCartasEditadas) {
                  return false;
                } else if (!c.edited) {
                  return false;
                }
              }
              return true;
            })
          );
          return { ...b, adicionado: false };
        }
        return b;
      })
    );
  };

  /* ================================
     Opções: adicionar, remover, mover (tipo Ordem)
     ================================ */
  const handleAddOpcao = () => {
    if (novaOpcao.trim() !== '') {
      setOpcoes((prev) => [...prev, { id: prev.length + 1, texto: novaOpcao }]);
      setNovaOpcao('');
    }
  };

  const handleRemoveOpcao = (id: number) => {
    setOpcoes(opcoes.filter((o) => o.id !== id));
    setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
  };

  // Mover para cima
  const moveUp = (index: number) => {
    if (index <= 0) return;
    const newOpcoes = [...opcoes];
    const temp = newOpcoes[index];
    newOpcoes[index] = newOpcoes[index - 1];
    newOpcoes[index - 1] = temp;
    setOpcoes(newOpcoes);
  };

  // Mover para baixo
  const moveDown = (index: number) => {
    if (index >= opcoes.length - 1) return;
    const newOpcoes = [...opcoes];
    const temp = newOpcoes[index];
    newOpcoes[index] = newOpcoes[index + 1];
    newOpcoes[index + 1] = temp;
    setOpcoes(newOpcoes);
  };

  // "Marcar correta" se for Pergunta/MultiplaEscolha/Ordem/Outras
  const handleToggleRespostaCorreta = (id: number) => {
    if (tipo === 'Pergunta') {
      setRespostaCorreta([id]);
    } else if (ALLOW_MARK.includes(tipo)) {
      // MultiplaEscolha, Ordem, Outras (ou Pergunta, mas já tratada acima)
      if (respostaCorreta.includes(id)) {
        setRespostaCorreta(respostaCorreta.filter((rc) => rc !== id));
      } else {
        setRespostaCorreta([...respostaCorreta, id]);
      }
    }
  };

  /* ================================
     Categorias / Fontes
     ================================ */
  const handleAddCategoria = () => {
    if (!categoriasBloqueadas && novaCategoria.trim() !== '') {
      setCategorias((prev) => [...prev, novaCategoria]);
      setNovaCategoria('');
    }
  };

  const handleRemoveCategoria = (cat: string) => {
    if (!categoriasBloqueadas) {
      setCategorias(categorias.filter((c) => c !== cat));
    }
  };

  const handleAddFonte = () => {
    if (!fontesBloqueadas && novaFonte.trim() !== '') {
      setFontes((prev) => [...prev, novaFonte]);
      setNovaFonte('');
    }
  };

  const handleRemoveFonte = (f: string) => {
    if (!fontesBloqueadas) {
      setFontes(fontes.filter((fon) => fon !== f));
    }
  };

  /* ================================
     Criar/Atualizar Carta
     ================================ */
  const resetCarta = () => {
    setTipo('Pergunta');
    setTitulo('');
    setPergunta('');
    setOpcoes([]);
    setNovaOpcao('');
    setImagem('');
    setDica('');
    setVantagem('');
    setDesvantagem('');
    setFontes([]);
    setRespostaCorreta([]);
    setDificuldade('facil');
    setImageType('clickable');
    setEditIndex(null);
    setShowPreview(false);
  };

  const handleAddOrUpdateCard = () => {
    let finalRespostaCorreta: number | number[] = respostaCorreta;

    if (tipo === 'Ordem') {
      // Se for "Ordem", a sequência final é a ordem atual das opcoes
      finalRespostaCorreta = opcoes.map((o) => o.id);
    } else if (tipo === 'Vantagem') {
      // todas corretas
      finalRespostaCorreta = opcoes.map((o) => o.id);
    } else if (tipo === 'Desvantagem') {
      // todas erradas
      finalRespostaCorreta = [];
    } else if (tipo === 'Pergunta') {
      // só uma correta
      finalRespostaCorreta =
        respostaCorreta.length > 0 ? respostaCorreta[0] : 0;
    }
    // Para MultiplaEscolha / Outras, já fica como está

    const novaCarta: Carta = {
      tipo,
      titulo,
      pergunta:
        imageType === 'hero' && imagem
          ? '<img src=\"' +
            imagem +
            '\" style=\"display: block; margin: 0 auto; width: 120px; height: auto;\" alt=\"' +
            titulo +
            '\" /><br>\n' +
            pergunta
          : imagem
          ? '<img src=\"' +
            imagem +
            '\" alt=\"' +
            titulo +
            '\" class=\"img-media my-4\" />\n' +
            pergunta
          : pergunta,
      imageType,
      imagem,
      opcoes,
      respostaCorreta: finalRespostaCorreta,
      dificuldade,
      categorias,
      fontes,
      vantagem,
      desvantagem,
      dica,
    };

    if (editIndex !== null) {
      // Edição
      setCards((oldCards) =>
        oldCards.map((c, i) => {
          if (i === editIndex) {
            return { ...novaCarta, origBaralhoId: c.origBaralhoId, edited: true };
          }
          return c;
        })
      );
    } else {
      // Nova carta
      setCards((oldCards) => [...oldCards, { ...novaCarta, edited: true }]);
    }
    resetCarta();
  };

  const loadCardForEdit = (index: number) => {
    setShowPreview(false);

    const carta = cards[index];
    setEditIndex(index);
    setTipo(carta.tipo as TipoCarta);
    setTitulo(carta.titulo);

    let p = carta.pergunta;
    let extractedImage = '';
    let usedHeroStyle = false;

    const heroImgRegex = /<img[^>]+style=\"[^\"]+\"[^>]*src=\"([^\"]+)\"[^>]*>/;
    const clickableImgRegex = /<img[^>]+class=\"[^\"]+\"[^>]*src=\"([^\"]+)\"[^>]*>/;

    const heroMatch = p.match(heroImgRegex);
    const clickableMatch = p.match(clickableImgRegex);

    if (heroMatch) {
      usedHeroStyle = true;
      extractedImage = heroMatch[1];
      p = p.replace(heroMatch[0], '');
    } else if (clickableMatch) {
      extractedImage = clickableMatch[1];
      p = p.replace(clickableMatch[0], '');
    }

    setImagem(extractedImage);
    setImageType(usedHeroStyle ? 'hero' : 'clickable');
    setPergunta(p.trim());
    setOpcoes(carta.opcoes);

    // Carrega respostaCorreta
    if (carta.tipo === 'Ordem') {
      setRespostaCorreta([]);
    } else if (carta.tipo === 'Vantagem') {
      setRespostaCorreta(carta.opcoes.map((o) => o.id));
    } else if (carta.tipo === 'Desvantagem') {
      setRespostaCorreta([]);
    } else if (carta.tipo === 'Pergunta') {
      const correctId =
        typeof carta.respostaCorreta === 'number' ? carta.respostaCorreta : 0;
      setRespostaCorreta(correctId ? [correctId] : []);
    } else {
      // MultiplaEscolha / Outras
      const arr = Array.isArray(carta.respostaCorreta)
        ? (carta.respostaCorreta as number[])
        : [carta.respostaCorreta];
      setRespostaCorreta(arr.filter((x) => x !== 0));
    }

    setDificuldade(carta.dificuldade as Dificuldade);
    setCategorias(carta.categorias);
    setFontes(carta.fontes);
    setVantagem(carta.vantagem);
    setDesvantagem(carta.desvantagem);
    setDica(carta.dica);
  };

  const deleteCard = (index: number) => {
    setCards((old) => old.filter((_, i) => i !== index));
    if (editIndex === index) {
      resetCarta();
    }
  };

  const cancelEdit = () => {
    resetCarta();
  };

  /* ================================
     Baixar
     ================================ */
  const prepareForDownload = (): Carta[] => {
    return cards.map(({ origBaralhoId, edited, ...rest }) => rest);
  };

  const generateCode = () => {
    const deckFinal = prepareForDownload();
    const deck = JSON.stringify(deckFinal, null, 2);
    return 'const ' + deckName + ' = ' + deck + ';\n\nexport default ' + deckName + ';';
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([generateCode()], { type: 'text/javascript' });
    element.href = URL.createObjectURL(file);
    element.download = deckName + '.js';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  /* ================================
     Render principal
     ================================ */
  return (
    <div className='p-4 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Criador de Baralho</h1>

      {/* Nome do Baralho */}
      <div className='bg-white shadow p-4 rounded mb-6'>
        <label className='block text-sm font-medium mb-2'>Nome do Baralho:</label>
        <input
          type='text'
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          placeholder='Nome do baralho'
          className='border p-2 w-full rounded'
        />
      </div>

      {/* Carregar Baralhos */}
      <div className='bg-white shadow p-4 rounded mb-6 space-y-4'>
        <h2 className='text-xl font-semibold'>Carregar Baralhos</h2>
        <p className='text-sm text-gray-500'>
          Selecione um ou mais arquivos .js ou .json contendo arrays de cartas.
        </p>
        <input type='file' accept='.js,.json' onChange={handleFileUpload} multiple />
      </div>

      {/* Lista de Baralhos Carregados */}
      {baralhosCarregados.length > 0 && (
        <div className='bg-white shadow p-4 rounded mb-6 space-y-4'>
          <h2 className='text-xl font-semibold'>Baralhos Carregados</h2>
          <div className='flex items-center space-x-2 mb-4'>
            <input
              type='checkbox'
              checked={manterCartasEditadas}
              onChange={(e) => setManterCartasEditadas(e.target.checked)}
            />
            <label className='text-sm'>
              Manter cartas editadas ao remover baralho
            </label>
          </div>
          <ul className='space-y-2'>
            {baralhosCarregados.map((b) => (
              <li key={b.id} className='flex items-center space-x-4'>
                <span className='font-medium'>{b.nome}</span>
                <span className='text-sm text-gray-500'>{b.cartas.length} cartas</span>
                {!b.adicionado ? (
                  <button
                    onClick={() => adicionarBaralho(b.id)}
                    className='bg-green-500 text-white px-4 py-1 rounded'
                  >
                    Adicionar
                  </button>
                ) : (
                  <button
                    onClick={() => removerBaralho(b.id)}
                    className='bg-red-500 text-white px-4 py-1 rounded'
                  >
                    Remover
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className='text-xs text-gray-500'>
            Ao remover um baralho, cartas nao editadas desse baralho serao removidas
            do baralho principal. Se Manter cartas editadas estiver marcado,
            as editadas permanecem.
          </p>
        </div>
      )}

      {/* Formulário de Criação/Edição */}
      <h2 className='text-2xl font-bold mb-4'>
        {editIndex !== null ? 'Editar Carta' : 'Adicionar Carta'}
      </h2>

      <div className='bg-white shadow p-4 rounded mb-6 space-y-4'>
        {/* Tipo da Carta */}
        <div>
          <label className='block text-sm font-medium mb-1'>Tipo da Carta</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoCarta)}
            className='border p-2 rounded w-full'
          >
            {CARD_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <p className='text-xs text-gray-500 mt-1'>
            Pergunta: 1 correta; MultiplaEscolha: várias corretas;
            Ordem: mover para cima/baixo; Vantagem: todas corretas;
            Desvantagem: todas erradas; Outras: mistas.
          </p>
        </div>

        {/* Título */}
        <div>
          <label className='block text-sm font-medium mb-1'>Título da Carta</label>
          <input
            type='text'
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className='border p-2 w-full rounded'
          />
        </div>

        {/* Tipo de imagem e caminho */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          <div>
            <label className='block text-sm font-medium mb-1'>Tipo de Imagem</label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value as 'clickable' | 'hero')}
              className='border p-2 rounded w-full'
            >
              <option value='clickable'>Clicavel (Zoom)</option>
              <option value='hero'>Personagem (Hero)</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Caminho da Imagem</label>
            <input
              type='text'
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
              className='border p-2 w-full rounded'
              placeholder='/minha_imagem.png'
            />
          </div>
        </div>
        <p className='text-xs text-gray-500'>
          Clicavel → usa Zoom, Hero → imagem centralizada etc.
        </p>

        {/* Pergunta/Descrição */}
        <div>
          <label className='block text-sm font-medium mb-1'>
            Pergunta/Descrição
          </label>
          <textarea
            value={pergunta}
            onChange={(e) => setPergunta(e.target.value)}
            className='border p-2 w-full rounded h-24'
          />
        </div>

        {/* Se for Vantagem ou Desvantagem, sem Marcar correta */}
        {(tipo === 'Vantagem' || tipo === 'Desvantagem') && (
          <div className='bg-gray-50 p-4 rounded space-y-4'>
            <h3 className='text-lg font-semibold'>Opções</h3>
            <div className='flex space-x-2'>
              <input
                type='text'
                value={novaOpcao}
                onChange={(e) => setNovaOpcao(e.target.value)}
                placeholder='Texto da opção'
                className='border p-2 rounded flex-1'
              />
              <button
                onClick={handleAddOpcao}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Adicionar Opção
              </button>
            </div>
            <ul className='space-y-2'>
              {opcoes.map((o) => (
                <li key={o.id} className='flex items-center space-x-2'>
                  <span className='flex-1'>{o.texto}</span>
                  <button
                    onClick={() => handleRemoveOpcao(o.id)}
                    className='bg-red-500 text-white px-2 py-1 rounded text-sm'
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <label className='block text-sm font-medium mb-1'>
                Dificuldade
              </label>
              <select
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value as Dificuldade)}
                className='border p-2 rounded w-full'
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            {tipo === 'Desvantagem' && (
              <p className='text-xs text-gray-500'>
                Todas as opções serão incorretas.
              </p>
            )}
            {tipo === 'Vantagem' && (
              <p className='text-xs text-gray-500'>
                Todas as opções serão corretas.
              </p>
            )}
          </div>
        )}

        {tipo === 'Ordem' && (
          // Se for ORDEM, exibe up/down
          <div className='bg-gray-50 p-4 rounded space-y-4'>
            <h3 className='text-lg font-semibold'>
              Opções (mover para cima/baixo)
            </h3>
            <div className='flex space-x-2'>
              <input
                type='text'
                value={novaOpcao}
                onChange={(e) => setNovaOpcao(e.target.value)}
                placeholder='Texto da opção'
                className='border p-2 rounded flex-1'
              />
              <button
                onClick={handleAddOpcao}
                className='bg-blue-500 text-white px-4 py-2 rounded'
              >
                Adicionar Opção
              </button>
            </div>

            <ul className='space-y-2'>
              {opcoes.map((o, idx) => (
                <li
                  key={o.id}
                  className='flex flex-col sm:flex-row sm:items-center sm:space-x-2'
                >
                  <span className='flex-1'>{o.texto}</span>

                  {/* Botões para mover */}
                  <div className='flex space-x-1 mt-1 sm:mt-0'>
                    <button
                      onClick={() => moveUp(idx)}
                      className='bg-gray-300 px-2 py-1 rounded text-sm'
                      title='Mover para cima'
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      className='bg-gray-300 px-2 py-1 rounded text-sm'
                      title='Mover para baixo'
                    >
                      ↓
                    </button>
                  </div>

                  {/* Se quisermos marcar como correta em "Ordem" também */}
                  {ALLOW_MARK.includes(tipo) && (
                    <button
                      onClick={() => handleToggleRespostaCorreta(o.id)}
                      className={`${
                        respostaCorreta.includes(o.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300'
                      } px-2 py-1 rounded text-sm mt-1 sm:mt-0`}
                    >
                      {respostaCorreta.includes(o.id)
                        ? 'Correta'
                        : 'Marcar correta'}
                    </button>
                  )}

                  <button
                    onClick={() => handleRemoveOpcao(o.id)}
                    className='bg-red-500 text-white px-2 py-1 rounded text-sm mt-1 sm:mt-0'
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            <div>
              <label className='block text-sm font-medium mb-1'>
                Dificuldade
              </label>
              <select
                value={dificuldade}
                onChange={(e) => setDificuldade(e.target.value as Dificuldade)}
                className='border p-2 rounded w-full'
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Se for Pergunta, MultiplaEscolha ou Outras (mas nao Vantagem/Desvantagem/Ordem) */}
        {tipo !== 'Vantagem' &&
          tipo !== 'Desvantagem' &&
          tipo !== 'Ordem' && (
            <div className='bg-gray-50 p-4 rounded space-y-4'>
              <h3 className='text-lg font-semibold'>Opções</h3>
              <div className='flex space-x-2'>
                <input
                  type='text'
                  value={novaOpcao}
                  onChange={(e) => setNovaOpcao(e.target.value)}
                  placeholder='Texto da opção'
                  className='border p-2 rounded flex-1'
                />
                <button
                  onClick={handleAddOpcao}
                  className='bg-blue-500 text-white px-4 py-2 rounded'
                >
                  Adicionar Opção
                </button>
              </div>
              <ul className='space-y-2'>
                {opcoes.map((o) => (
                  <li
                    key={o.id}
                    className='flex flex-col md:flex-row md:items-center md:space-x-2'
                  >
                    <div className='flex-1'>{o.texto}</div>

                    {/* So mostra "Marcar correta" se tipo for Pergunta/MultiplaEscolha/Outras */}
                    {ALLOW_MARK.includes(tipo) && (
                      <button
                        onClick={() => handleToggleRespostaCorreta(o.id)}
                        className={`${
                          respostaCorreta.includes(o.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300'
                        } px-2 py-1 rounded text-sm`}
                      >
                        {respostaCorreta.includes(o.id)
                          ? 'Correta'
                          : 'Marcar correta'}
                      </button>
                    )}

                    <button
                      onClick={() => handleRemoveOpcao(o.id)}
                      className='bg-red-500 text-white px-2 py-1 rounded text-sm mt-1 md:mt-0'
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <label className='block text-sm font-medium mb-1'>
                  Dificuldade
                </label>
                <select
                  value={dificuldade}
                  onChange={(e) =>
                    setDificuldade(e.target.value as Dificuldade)
                  }
                  className='border p-2 rounded w-full'
                >
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

        {/* Categorias */}
        <div className='bg-gray-50 p-4 rounded space-y-4'>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>Categorias</h3>
            <button
              onClick={() => setCategoriasBloqueadas(!categoriasBloqueadas)}
              className={`px-4 py-1 rounded text-white ${
                categoriasBloqueadas ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {categoriasBloqueadas ? 'Destravar Categorias' : 'Travar Categorias'}
            </button>
          </div>
          <div className='flex space-x-2'>
            <input
              type='text'
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder='Nova categoria'
              className='border p-2 rounded flex-1'
              disabled={categoriasBloqueadas}
            />
            <button
              onClick={handleAddCategoria}
              className={`${
                categoriasBloqueadas ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'
              } text-white px-4 py-2 rounded`}
              disabled={categoriasBloqueadas}
            >
              Adicionar
            </button>
          </div>
          <ul className='space-y-1'>
            {categorias.map((c, i) => (
              <li key={i} className='flex items-center space-x-2'>
                <span>{c}</span>
                <button
                  onClick={() => handleRemoveCategoria(c)}
                  className={`bg-red-500 text-white px-2 py-1 rounded text-sm ${
                    categoriasBloqueadas ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={categoriasBloqueadas}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <p className='text-xs text-gray-500'>
            Ao travar as categorias, nao e possivel adicionar ou remover mais.
          </p>
        </div>

        {/* Fontes */}
        <div className='bg-gray-50 p-4 rounded space-y-4'>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg font-semibold'>Fontes</h3>
            <button
              onClick={() => setFontesBloqueadas(!fontesBloqueadas)}
              className={`px-4 py-1 rounded text-white ${
                fontesBloqueadas ? 'bg-red-500' : 'bg-green-500'
              }`}
            >
              {fontesBloqueadas ? 'Destravar Fontes' : 'Travar Fontes'}
            </button>
          </div>
          <div className='flex space-x-2'>
            <input
              type='text'
              value={novaFonte}
              onChange={(e) => setNovaFonte(e.target.value)}
              placeholder='Nova fonte'
              className='border p-2 rounded flex-1'
              disabled={fontesBloqueadas}
            />
            <button
              onClick={handleAddFonte}
              className={`${
                fontesBloqueadas ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'
              } text-white px-4 py-2 rounded`}
              disabled={fontesBloqueadas}
            >
              Adicionar
            </button>
          </div>
          <ul className='space-y-1'>
            {fontes.map((f, i) => (
              <li key={i} className='flex items-center space-x-2'>
                <span>{f}</span>
                <button
                  onClick={() => handleRemoveFonte(f)}
                  className={`bg-red-500 text-white px-2 py-1 rounded text-sm ${
                    fontesBloqueadas ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={fontesBloqueadas}
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <p className='text-xs text-gray-500'>
            Ao travar as fontes, nao e possivel adicionar ou remover mais.
          </p>
        </div>

        {/* Vantagem, Desvantagem, Dica */}
        <div className='bg-gray-50 p-4 rounded space-y-4'>
          <div>
            <label className='block text-sm font-medium mb-1'>Vantagem:</label>
            <input
              type='text'
              value={vantagem}
              onChange={(e) => setVantagem(e.target.value)}
              className='border p-2 w-full rounded'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Desvantagem:</label>
            <input
              type='text'
              value={desvantagem}
              onChange={(e) => setDesvantagem(e.target.value)}
              className='border p-2 w-full rounded'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-1'>Dica:</label>
            <input
              type='text'
              value={dica}
              onChange={(e) => setDica(e.target.value)}
              className='border p-2 w-full rounded'
            />
          </div>
        </div>

        {/* Botoes de acao */}
        <div className='flex flex-col md:flex-row md:space-x-4'>
          <button
            onClick={handleAddOrUpdateCard}
            className='bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto mt-4'
          >
            {editIndex !== null ? 'Atualizar Carta' : 'Adicionar Carta'}
          </button>
          {editIndex !== null && (
            <button
              onClick={cancelEdit}
              className='bg-gray-400 text-white px-4 py-2 rounded w-full md:w-auto mt-4'
            >
              Cancelar Edição
            </button>
          )}
          {/* Botão para Preview */}
          <button
            onClick={() => setShowPreview((prev) => !prev)}
            className='bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto mt-4'
          >
            {showPreview ? 'Fechar Preview' : 'Preview da Carta'}
          </button>
        </div>
      </div>

      {/* Se showPreview, mostramos a carta estatica */}
      {showPreview && (
        <div>
          <h2 className='text-2xl font-bold mb-2'>Pré-visualização</h2>
          <CardStaticView
            card={{
              tipo,
              titulo,
              pergunta:
                imageType === 'hero' && imagem
                  ? '<img src=\"' +
                    imagem +
                    '\" style=\"display: block; margin: 0 auto; width: 120px; height: auto;\" alt=\"' +
                    titulo +
                    '\" /><br>\n' +
                    pergunta
                  : imagem
                  ? '<img src=\"' +
                    imagem +
                    '\" alt=\"' +
                    titulo +
                    '\" class=\"img-media my-4\" />\n' +
                    pergunta
                  : pergunta,
              opcoes,
              respostaCorreta:
                tipo === 'Ordem'
                  ? opcoes.map((o) => o.id)
                  : tipo === 'Vantagem'
                  ? opcoes.map((o) => o.id)
                  : tipo === 'Desvantagem'
                  ? []
                  : respostaCorreta,
              dificuldade,
              categorias,
              fontes,
              vantagem,
              desvantagem,
              dica,
              imageType,
              imagem,
            }}
          />
        </div>
      )}

      {/* Cartas Criadas */}
      <h2 className='text-2xl font-bold mb-4'>Cartas Criadas</h2>
      {cards.length === 0 && (
        <p className='text-gray-500 mb-4'>Nenhuma carta criada ainda.</p>
      )}
      <div className='flex flex-wrap gap-2 mb-6'>
        {cards.map((c, index) => (
          <div key={index} className='flex items-center space-x-2'>
            <button
              onClick={() => loadCardForEdit(index)}
              className='bg-blue-500 text-white px-4 py-2 rounded'
            >
              {c.titulo || 'Carta ' + (index + 1)}
            </button>
            <button
              onClick={() => deleteCard(index)}
              className='bg-red-500 text-white px-2 py-2 rounded'
              title='Excluir Carta'
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* Botao de download */}
      <div className='flex space-x-4'>
        <button onClick={downloadCode} className='bg-blue-500 text-white px-4 py-2 rounded'>
          Baixar Código
        </button>
      </div>
    </div>
  );
};

export default CriadorDeCarta;
