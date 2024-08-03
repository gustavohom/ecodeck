import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Jogo de Cartas Educativo</h1>
      <p className="mb-4">
        Bem-vindo ao nosso jogo de cartas educativo! Aqui estão as regras:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Cada carta contém uma pergunta de múltipla escolha sobre diversos temas.</li>
        <li>Escolha a resposta que você acredita ser correta.</li>
        <li>Ganhe pontos por respostas corretas e perca por incorretas.</li>
        <li>Seu progresso é mostrado na barra abaixo das opções.</li>
        <li>Use o botão de dica se precisar de ajuda.</li>
        <li>As fontes das informações estão indicadas no final de cada carta.</li>
      </ul>
      <Link href="/jogo">
        <Button>Começar o Jogo</Button>
      </Link>
    </div>
  );
}