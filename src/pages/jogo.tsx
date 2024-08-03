import JogoCartasMultiplaEscolha from '@/components/JogoCartasMultiplaEscolha';

export default function Jogo() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jogo de Cartas</h1>
      <JogoCartasMultiplaEscolha />
    </div>
  );
}