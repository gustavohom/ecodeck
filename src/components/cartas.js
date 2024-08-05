// components/cartas.js

const cartas = [
  {
    titulo: "TESTE - TODAS ERRADAS",
    pergunta: `O inventário florestal é uma ferramenta essencial para entender a composição e o estado das florestas. Qual é o principal objetivo de realizar um inventário florestal? 
    
    <img src="/1.jpg" alt="Inventário Florestal" class="img-media my-4" />
    
    A importância do inventário florestal não pode ser subestimada. Ele permite que os gestores de recursos florestais tomem decisões informadas sobre a conservação, manejo e uso sustentável das florestas. O processo envolve a coleta de dados detalhados sobre a flora e fauna de uma área específica, bem como informações sobre a qualidade do solo e da água. Ao longo dos anos, o inventário florestal evoluiu para incorporar tecnologias avançadas, como sensoriamento remoto e sistemas de informações geográficas (SIG), que aumentam a precisão e a eficiência dos dados coletados.`,
    opcoes: [
      { id: 1, texto: "Avaliar o valor econômico das florestas" },
      { id: 2, texto: "Medir a altura das árvores" },
      { id: 3, texto: "Medir a altura das árvores" },
      { id: 4, texto: "Medir a altura das árvores" },
      { id: 5, texto: "Medir a altura das árvores" },
    ],
    tipo: "outra",
    respostaCorreta: 6,
    dificuldade: "normal",
    categorias: ["Inventário Florestal", "Conservação da Biodiversidade", "teste 1"],
    fontes: [
      "1. Silva, J. (2020). Fundamentos de Inventário Florestal.",
      "2. Almeida, F. (2019). Técnicas Modernas em Inventário Florestal.",
    ],
    vantagem: "Avance 2 casas no tabuleiro!",
    desvantagem: "Perde 1 ponto de progresso.",
    dica: "",
  },
  {
    titulo: "TESTE - TODAS CERTAS",
    pergunta: `O inventário florestal é uma ferramenta essencial para entender a composição e o estado das florestas. Qual é o principal objetivo de realizar um inventário florestal? 
    
    <img src="/1.jpg" alt="Inventário Florestal" class="img-media my-4" />
    
    A importância do inventário florestal não pode ser subestimada. Ele permite que os gestores de recursos florestais tomem decisões informadas sobre a conservação, manejo e uso sustentável das florestas. O processo envolve a coleta de dados detalhados sobre a flora e fauna de uma área específica, bem como informações sobre a qualidade do solo e da água. Ao longo dos anos, o inventário florestal evoluiu para incorporar tecnologias avançadas, como sensoriamento remoto e sistemas de informações geográficas (SIG), que aumentam a precisão e a eficiência dos dados coletados.`,
    opcoes: [
      { id: 1, texto: "Avaliar o valor econômico das florestas" },
      { id: 2, texto: "Medir a altura das árvores" },
      { id: 3, texto: "Medir a altura das árvores" },
      { id: 4, texto: "Medir a altura das árvores" },
      { id: 5, texto: "Medir a altura das árvores" },
    ],
    tipo: "outra",
    respostaCorreta: [1,2,3,4,5],
    dificuldade: "normal",
    categorias: ["Inventário Florestal", "Conservação da Biodiversidade", "teste 1"],
    fontes: [
      "1. Silva, J. (2020). Fundamentos de Inventário Florestal.",
      "2. Almeida, F. (2019). Técnicas Modernas em Inventário Florestal.",
    ],
    vantagem: "Avance 2 casas no tabuleiro!",
    desvantagem: "Perde 1 ponto de progresso.",
    dica: "",
  },
  {
    titulo: "TESTE - escolha uma opção",
    pergunta: `Escolha uma das seguintes opções`,
    opcoes: [
      { id: 1, texto: "Ganhe 10 moedas" },
      { id: 2, texto: "Surpresa " },
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Desenvolvimento Sustentável", "teste 1"],
    fontes: [
      "1. Oliveira, A. (2021). Práticas de Manejo Florestal Sustentável.",
      "2. Pereira, G. (2018). Gestão Florestal para o Futuro.",
    ],
    vantagem: "Ganhe 10 moedas",
    desvantagem: "Escolha um jogador para ficar uma rodada sem jogar",
    dica: "",
  },
  {
    titulo: "TESTE - escolha uma opção",
    pergunta: `GANHE 10 moedas`,
    opcoes: [
      { id: 1, texto: "Confirmar" },
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Desenvolvimento Sustentável", "teste 1"],
    fontes: [
      "1. Oliveira, A. (2021). Práticas de Manejo Florestal Sustentável.",
      "2. Pereira, G. (2018). Gestão Florestal para o Futuro.",
    ],
    vantagem: "Ganhe 10 moedas",
    desvantagem: "Escolha um jogador para ficar uma rodada sem jogar",
    dica: "",
  },
  {
    titulo: "Biodiversidade em Florestas Tropicais",
    pergunta: `As florestas tropicais são conhecidas por sua biodiversidade rica e única. Qual é um dos principais fatores que contribui para a alta biodiversidade nas florestas tropicais? 
    
    <img src="/3.jpg" alt="Florestas Tropicais" class="img-pequena my-4" />
    
    A biodiversidade das florestas tropicais é uma das mais altas do planeta. Esta riqueza biológica é resultado de milhões de anos de evolução e adaptação, em um ambiente que oferece condições ideais para a sobrevivência de uma grande variedade de espécies. As florestas tropicais abrigam mais da metade das espécies conhecidas no mundo, incluindo inúmeras plantas, animais, fungos e microrganismos. A estrutura complexa do dossel das florestas, juntamente com o clima quente e úmido, cria habitats diversificados que suportam uma ampla gama de vida.`,
    opcoes: [
      { id: 1, texto: "Clima temperado" },
      { id: 2, texto: "Altas taxas de precipitação" },
      { id: 3, texto: "Solo pobre em nutrientes" },
      { id: 4, texto: "Baixa densidade de árvores" },
    ],
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade"],
    fontes: [
      "1. Costa, L. (2022). Biodiversidade nas Florestas Tropicais.",
      "2. Mendes, R. (2019). Ecologia das Florestas Tropicais.",
    ],
    vantagem: "Avance 1 casa e ganhe uma dica extra!",
    desvantagem: "Volte 2 casas no tabuleiro.",
    dica: "As florestas tropicais são conhecidas por seu clima úmido.",
  },
  {
    titulo: "Tecnologia LiDAR em Silvicultura",
    pergunta: `O uso de LiDAR (Light Detection and Ranging) na silvicultura tem revolucionado o inventário florestal. Como essa tecnologia é usada para medir a densidade da floresta?
    
    <img src="/4.jpg" alt="Tecnologia LiDAR" class="img-grande my-4" />
    
    LiDAR é uma tecnologia de sensoriamento remoto que utiliza pulsos de laser para medir distâncias precisas entre um sensor e a superfície da Terra. Na silvicultura, o LiDAR é amplamente utilizado para mapear a topografia do terreno e a estrutura da vegetação. Com o uso de LiDAR, é possível determinar a densidade do dossel florestal, a altura das árvores, a biomassa, e até mesmo identificar espécies específicas. Esta tecnologia permite um monitoramento mais eficiente e preciso das florestas, apoiando decisões de manejo sustentável e conservação.`,
    opcoes: [
      { id: 1, texto: "Através de fotografias aéreas" },
      { id: 2, texto: "Com sensores de solo" },
      { id: 3, texto: "Usando pulsos de laser" },
      { id: 4, texto: "Por satélites de alta resolução" },
    ],
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Lima, M. (2020). Aplicações de LiDAR na Silvicultura.",
      "2. Ferreira, S. (2021). LiDAR e a Revolução do Inventário Florestal.",
    ],
    vantagem: "Receba um bônus de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "LiDAR utiliza pulsos de laser para medir a densidade.",
  },
  {
    titulo: "Impacto das Mudanças Climáticas nas Florestas",
    pergunta: `As mudanças climáticas representam um grande desafio para as florestas em todo o mundo. Qual é uma das consequências das mudanças climáticas nas florestas?
    
    <img src="/5.jpg" alt="Mudanças Climáticas" class="img-media my-4" />
    
    O impacto das mudanças climáticas nas florestas é uma preocupação global crescente. A elevação das temperaturas e as mudanças nos padrões de precipitação afetam a saúde e a produtividade das florestas. Além disso, as mudanças climáticas podem exacerbar a frequência e a intensidade de eventos extremos, como incêndios florestais, tempestades, e pragas. Essas alterações impactam negativamente a biodiversidade, a capacidade de sequestro de carbono e a capacidade das florestas de fornecer serviços ecossistêmicos críticos. A mitigação e adaptação são fundamentais para proteger as florestas das mudanças climáticas.`,
    opcoes: [
      { id: 1, texto: "Aumento na biodiversidade" },
      { id: 2, texto: "Redução da frequência de incêndios" },
      { id: 3, texto: "Aumento das pragas e doenças" },
      { id: 4, texto: "Aumento na produção de madeira" },
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Mudanças Climáticas", "Conservação da Biodiversidade"],
    fontes: [
      "1. Santos, P. (2022). Mudanças Climáticas e Florestas.",
      "2. Araújo, E. (2021). Impactos Climáticos na Biodiversidade Florestal.",
    ],
    vantagem: "Ganhe 4 pontos de adaptação!",
    desvantagem: "Perde 3 pontos de adaptação.",
    dica: "As mudanças climáticas frequentemente aumentam as pragas.",
  },
  {
    titulo: "Benefícios das Soluções Baseadas na Natureza",
    pergunta: `As Soluções Baseadas na Natureza (SbN) são estratégias inovadoras para enfrentar desafios ambientais. Qual é um exemplo de SbN aplicado ao manejo florestal?
    
    <img src="/6.jpg" alt="Soluções Baseadas na Natureza" class="img-pequena my-4" />
    
    As Soluções Baseadas na Natureza são abordagens que utilizam ecossistemas naturais e serviços ecossistêmicos para enfrentar desafios sociais e ambientais. No manejo florestal, as SbN incluem práticas como a restauração de paisagens degradadas, o uso de espécies nativas para reflorestamento, e a criação de corredores ecológicos para melhorar a conectividade de habitats. Estas soluções não apenas promovem a conservação da biodiversidade, mas também contribuem para a mitigação das mudanças climáticas, a melhoria da qualidade da água e a resiliência das comunidades locais.`,
    opcoes: [
      { id: 1, texto: "Plantio de árvores exóticas" },
      { id: 2, texto: "Construção de barragens" },
      { id: 3, texto: "Criação de corredores ecológicos" },
      { id: 4, texto: "Intensificação do uso do solo" },
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Soluções Baseadas na Natureza", "Manejo Florestal"],
    fontes: [
      "1. Mendes, T. (2020). Soluções Baseadas na Natureza no Contexto Florestal.",
      "2. Costa, J. (2021). SbN e o Futuro das Florestas.",
    ],
    vantagem: "Avance 3 casas com a ajuda da natureza!",
    desvantagem: "Perde 1 ponto de SbN.",
    dica: "Corredores ecológicos são um exemplo de SbN.",
  },
  {
    titulo: "Recuperação de Áreas Degradadas",
    pergunta: `A recuperação de áreas degradadas é um componente vital da restauração ecológica. Qual é uma técnica eficaz para recuperar áreas degradadas?
    
    <img src="/7.jpg" alt="Recuperação de Áreas" class="img-grande my-4" />
    
    A degradação ambiental é um dos maiores desafios enfrentados pela humanidade hoje. A recuperação de áreas degradadas visa restaurar a funcionalidade ecológica e a biodiversidade de habitats que foram danificados ou destruídos. Técnicas como o plantio de espécies nativas, a estabilização de solo e a remoção de espécies invasoras são amplamente utilizadas em projetos de restauração. O sucesso da recuperação depende da escolha de métodos apropriados que considerem o contexto ecológico e socioeconômico da área alvo.`,
    opcoes: [
      { id: 1, texto: "Uso de herbicidas químicos" },
      { id: 2, texto: "Estabilização do solo" },
      { id: 3, texto: "Desmatamento seletivo" },
      { id: 4, texto: "Plantio de espécies exóticas" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Recuperação de Áreas Degradadas", "Soluções Baseadas na Natureza"],
    fontes: [
      "1. Sousa, H. (2019). Técnicas de Recuperação de Áreas Degradadas.",
      "2. Martins, F. (2020). Estratégias para a Restauração Ecológica.",
    ],
    vantagem: "Receba uma carta de recuperação!",
    desvantagem: "Perca 2 pontos de recuperação.",
    dica: "A estabilização do solo é uma técnica-chave.",
  },
  {
    titulo: "Educação Ambiental em Florestas",
    pergunta: `A educação ambiental desempenha um papel crucial na conscientização sobre a conservação florestal. Como a educação ambiental pode ajudar a proteger as florestas?
    
    <img src="/8.jpg" alt="Educação Ambiental" class="img-media my-4" />
    
    A educação ambiental é uma ferramenta poderosa para aumentar a consciência pública sobre a importância da conservação das florestas. Ao educar as pessoas sobre o valor das florestas e os impactos negativos das atividades humanas, podemos promover práticas mais sustentáveis e responsáveis. Programas de educação ambiental em escolas e comunidades, bem como campanhas de conscientização, são essenciais para incentivar o engajamento comunitário e a proteção das florestas.`,
    opcoes: [
      { id: 1, texto: "Promovendo o uso de pesticidas" },
      { id: 2, texto: "Aumentando o desmatamento" },
      { id: 3, texto: "Conscientizando sobre a conservação" },
      { id: 4, texto: "Incentivando a monocultura" },
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Andrade, R. (2021). Educação Ambiental e Florestas.",
      "2. Silva, P. (2020). Conscientização e Conservação Florestal.",
    ],
    vantagem: "Ganhe 2 pontos de educação!",
    desvantagem: "Perca 1 ponto de educação.",
    dica: "A educação ambiental é vital para a conservação.",
  },
  {
    titulo: "Princípios de Silvicultura Sustentável",
    pergunta: `A silvicultura sustentável é a prática de gerenciar florestas para manter sua saúde e produtividade a longo prazo. Qual é um dos princípios da silvicultura sustentável?
    
    <img src="/9.jpg" alt="Silvicultura Sustentável" class="img-pequena my-4" />
    
    A silvicultura sustentável é um componente crucial da gestão florestal moderna. Seus princípios incluem a promoção da biodiversidade, o uso de métodos de colheita que minimizam o impacto ambiental, e a consideração das necessidades sociais e econômicas das comunidades locais. Essa abordagem garante que as florestas continuem a fornecer recursos e serviços ecossistêmicos vitais para as gerações futuras, enquanto protege os habitats naturais e a biodiversidade.`,
    opcoes: [
      { id: 1, texto: "Maximizar a produção de madeira" },
      { id: 2, texto: "Desmatamento em larga escala" },
      { id: 3, texto: "Promoção da biodiversidade" },
      { id: 4, texto: "Uso intensivo de fertilizantes" },
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Silvicultura", "Desenvolvimento Sustentável"],
    fontes: [
      "1. Oliveira, L. (2019). Princípios de Silvicultura Sustentável.",
      "2. Ferreira, J. (2020). Silvicultura e Gestão Sustentável.",
    ],
    vantagem: "Receba um certificado de sustentabilidade!",
    desvantagem: "Perca 2 pontos de silvicultura.",
    dica: "A biodiversidade é central na silvicultura sustentável.",
  },
  {
    titulo: "Desafios do Desenvolvimento Sustentável",
    pergunta: `O desenvolvimento sustentável busca equilibrar o crescimento econômico, a proteção ambiental e a equidade social. Qual é um dos principais desafios do desenvolvimento sustentável em relação às florestas?
    
    <img src="/10.jpg" alt="Desenvolvimento Sustentável" class="img-grande my-4" />
    
    O conceito de desenvolvimento sustentável foi popularizado pela primeira vez no relatório "Nosso Futuro Comum" da Comissão Mundial sobre Meio Ambiente e Desenvolvimento em 1987. Desde então, tornou-se um pilar fundamental na formulação de políticas de conservação e desenvolvimento. O desenvolvimento sustentável reconhece que a saúde do nosso planeta está intrinsecamente ligada ao bem-estar econômico e social da humanidade. No entanto, implementar práticas de desenvolvimento sustentável pode ser desafiador, especialmente em regiões onde o crescimento econômico rápido é priorizado sobre a conservação ambiental.`,
    opcoes: [
      { id: 1, texto: "Aumento do desmatamento" },
      { id: 2, texto: "Conservação da biodiversidade" },
      { id: 3, texto: "Incentivo ao reflorestamento" },
      { id: 4, texto: "Uso sustentável de recursos" },
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Desenvolvimento Sustentável", "Manejo Florestal"],
    fontes: [
      "1. Souza, M. (2021). Desafios do Desenvolvimento Sustentável.",
      "2. Rocha, F. (2020). Sustentabilidade e Gestão Florestal.",
    ],
    vantagem: "Avance 4 casas no tabuleiro!",
    desvantagem: "Volte 2 casas no tabuleiro.",
    dica: "O desmatamento é um desafio constante.",
  },
  {
    titulo: "Técnicas de Monitoramento Florestal",
    pergunta: `O monitoramento florestal é essencial para a gestão eficaz das florestas. Qual técnica é frequentemente usada para monitorar a saúde das florestas?
    
    <img src="/11.png" alt="Monitoramento Florestal" class="img-pequena my-4" />
    
    As técnicas de monitoramento florestal evoluíram significativamente com o advento das tecnologias modernas. Sensoriamento remoto, drones, e satélites são agora ferramentas padrão no arsenal de gestores florestais, permitindo a coleta de dados precisos e em tempo real. Essas tecnologias ajudam a monitorar a saúde das florestas, detectar mudanças no uso da terra, e avaliar os impactos de atividades humanas. O monitoramento contínuo é vital para detectar ameaças precocemente e implementar medidas de conservação de maneira eficaz.`,
    opcoes: [
      { id: 1, texto: "Observação direta no local" },
      { id: 2, texto: "Sensoriamento remoto por satélites" },
      { id: 3, texto: "Análise de solo" },
      { id: 4, texto: "Medição de temperatura" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Tecnologia em Florestas", "Monitoramento"],
    fontes: [
      "1. Carvalho, R. (2021). Técnicas de Monitoramento Florestal Modernas.",
      "2. Santos, L. (2020). Monitoramento Florestal e Tecnologia.",
    ],
    vantagem: "Ganhe um ponto de monitoramento!",
    desvantagem: "Perde 1 ponto de monitoramento.",
    dica: "Satélites são frequentemente usados no monitoramento.",
  },
  {
    titulo: "Inovações na Silvicultura Digital",
    pergunta: `A silvicultura digital integra tecnologia e dados para otimizar o manejo florestal. Qual é um exemplo de tecnologia usada na silvicultura digital?
    
    <img src="/12.png" alt="Silvicultura Digital" class="img-media my-4" />
    
    A silvicultura digital está transformando a forma como as florestas são geridas. O uso de tecnologias como Internet das Coisas (IoT), inteligência artificial, e big data estão permitindo aos gestores florestais coletar e analisar dados de maneiras sem precedentes. Sensores inteligentes podem monitorar condições ambientais em tempo real, enquanto algoritmos de aprendizado de máquina ajudam a prever o crescimento das árvores e o comportamento das pragas. Estas inovações estão tornando o manejo florestal mais eficiente e sustentável.`,
    opcoes: [
      { id: 1, texto: "Análise de big data" },
      { id: 2, texto: "Uso exclusivo de métodos tradicionais" },
      { id: 3, texto: "Desmatamento intensivo" },
      { id: 4, texto: "Exclusão de comunidades locais" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Gomes, D. (2020). Inovações na Silvicultura Digital.",
      "2. Almeida, P. (2021). Tecnologia e o Futuro das Florestas.",
    ],
    vantagem: "Avance 2 casas com a ajuda da tecnologia!",
    desvantagem: "Perde 1 ponto de inovação.",
    dica: "Big data é uma tecnologia-chave na silvicultura digital.",
  },
  {
    titulo: "Conservação de Florestas Urbanas",
    pergunta: `As florestas urbanas oferecem muitos benefícios às cidades. Qual é uma estratégia eficaz para conservar florestas urbanas?
    
    <img src="/13.png" alt="Florestas Urbanas" class="img-grande my-4" />
    
    As florestas urbanas são essenciais para melhorar a qualidade de vida nas cidades. Elas ajudam a purificar o ar, reduzir o efeito de ilha de calor urbana, e proporcionam espaços recreativos e educacionais para as comunidades. Estratégias para a conservação de florestas urbanas incluem o planejamento e a gestão participativa, a promoção de espécies nativas, e a implementação de políticas públicas que reconheçam o valor ecológico e social dessas áreas. A educação e o engajamento comunitário são também componentes críticos para o sucesso da conservação urbana.`,
    opcoes: [
      { id: 1, texto: "Expansão da infraestrutura urbana" },
      { id: 2, texto: "Uso de espécies exóticas" },
      { id: 3, texto: "Gestão participativa e planejamento" },
      { id: 4, texto: "Redução dos espaços verdes" },
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Moreira, V. (2021). Estratégias para Florestas Urbanas.",
      "2. Costa, N. (2020). Conservação Urbana e Sustentabilidade.",
    ],
    vantagem: "Ganhe 3 pontos de urbanismo!",
    desvantagem: "Perde 2 pontos de urbanismo.",
    dica: "O planejamento participativo é vital na conservação urbana.",
  },
  {
    titulo: "Resiliência das Florestas aos Incêndios",
    pergunta: `A resiliência das florestas a incêndios é crucial para sua sustentabilidade. Qual é uma prática que aumenta a resiliência das florestas aos incêndios?
    
    <img src="/14.png" alt="Resiliência a Incêndios" class="img-pequena my-4" />
    
    A resiliência das florestas a incêndios é um tópico importante no contexto das mudanças climáticas. A prática de manejo do fogo, que inclui a redução de combustível inflamável e a realização de queimas controladas, ajuda a minimizar o risco e o impacto dos incêndios florestais. Além disso, a restauração de paisagens florestais degradadas e o plantio de espécies nativas adaptadas ao fogo também são estratégias eficazes para aumentar a resiliência. Estas medidas não apenas protegem as florestas, mas também as comunidades humanas e a biodiversidade que dependem delas.`,
    opcoes: [
      { id: 1, texto: "Aumentar a quantidade de combustível inflamável" },
      { id: 2, texto: "Plantio de espécies nativas adaptadas ao fogo" },
      { id: 3, texto: "Evitar qualquer tipo de queima" },
      { id: 4, texto: "Promover desmatamento seletivo" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Conservação da Biodiversidade", "Mudanças Climáticas"],
    fontes: [
      "1. Silva, A. (2021). Estratégias de Resiliência Florestal.",
      "2. Pereira, M. (2020). Incêndios Florestais e Sustentabilidade.",
    ],
    vantagem: "Avance 4 casas com proteção contra incêndios!",
    desvantagem: "Perde 2 pontos de resiliência.",
    dica: "Espécies adaptadas ao fogo aumentam a resiliência.",
  },
  {
    titulo: "Impacto das Pragas nas Florestas",
    pergunta: `As pragas podem ter um impacto devastador nas florestas. Qual é uma estratégia eficaz para controlar pragas florestais?
    
    <img src="/15.png" alt="Controle de Pragas" class="img-grande my-4" />
    
    O controle de pragas é uma parte essencial do manejo florestal sustentável. As pragas, que podem incluir insetos, fungos, e plantas invasoras, têm o potencial de causar danos significativos às florestas. Estratégias de controle eficazes incluem o monitoramento contínuo, o uso de práticas de manejo integrado de pragas (MIP), e a promoção da biodiversidade para aumentar a resistência das florestas. A introdução de predadores naturais e o uso de agentes biológicos são também métodos sustentáveis para controlar populações de pragas.`,
    opcoes: [
      { id: 1, texto: "Uso exclusivo de pesticidas químicos" },
      { id: 2, texto: "Monitoramento contínuo e manejo integrado" },
      { id: 3, texto: "Destruição de habitats naturais" },
      { id: 4, texto: "Expansão de monoculturas" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação da Biodiversidade", "Manejo Florestal"],
    fontes: [
      "1. Costa, L. (2020). Controle de Pragas Florestais.",
      "2. Almeida, R. (2021). Estratégias Sustentáveis contra Pragas.",
    ],
    vantagem: "Receba um bônus de controle de pragas!",
    desvantagem: "Perde 1 ponto de controle de pragas.",
    dica: "O manejo integrado é uma abordagem eficaz.",
  },
  {
    titulo: "Contribuição das Florestas para o Ciclo do Carbono",
    pergunta: `As florestas desempenham um papel crucial no ciclo do carbono global. Como as florestas contribuem para o sequestro de carbono?
    
    <img src="/16.png" alt="Ciclo do Carbono" class="img-pequena my-4" />
    
    As florestas são essenciais para o sequestro de carbono, uma vez que absorvem dióxido de carbono (CO2) da atmosfera durante o processo de fotossíntese. Este carbono é armazenado na biomassa das árvores e no solo, ajudando a mitigar os efeitos das mudanças climáticas. A conservação e o manejo sustentável das florestas são fundamentais para maximizar o potencial de sequestro de carbono, tornando as florestas aliadas importantes na luta contra o aquecimento global. No entanto, o desmatamento e a degradação florestal reduzem a capacidade das florestas de sequestrar carbono, destacando a necessidade urgente de sua proteção.`,
    opcoes: [
      { id: 1, texto: "Liberando CO2 durante a fotossíntese" },
      { id: 2, texto: "Armazenando carbono na biomassa" },
      { id: 3, texto: "Aumentando a emissão de gases de efeito estufa" },
      { id: 4, texto: "Reduzindo a cobertura florestal" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Mudanças Climáticas", "Silvicultura"],
    fontes: [
      "1. Oliveira, F. (2021). Florestas e o Ciclo do Carbono.",
      "2. Santos, J. (2020). Sequestro de Carbono em Florestas.",
    ],
    vantagem: "Avance 2 casas com o sequestro de carbono!",
    desvantagem: "Perca 1 ponto de carbono.",
    dica: "O carbono é armazenado na biomassa das árvores.",
  },
  {
    titulo: "Benefícios das Áreas de Proteção Ambiental",
    pergunta: `As Áreas de Proteção Ambiental (APAs) são importantes para a conservação. Qual é um dos principais benefícios das APAs?
    
    <img src="/17.png" alt="Áreas de Proteção Ambiental" class="img-grande my-4" />
    
    As Áreas de Proteção Ambiental (APAs) são unidades de conservação que permitem o uso sustentável dos recursos naturais. Elas desempenham um papel crucial na proteção da biodiversidade, na manutenção de serviços ecossistêmicos, e na preservação de paisagens naturais. As APAs também oferecem oportunidades para a pesquisa científica, o turismo ecológico, e o desenvolvimento comunitário sustentável. A criação e a gestão eficaz dessas áreas são fundamentais para garantir a conservação da natureza e o bem-estar das populações humanas que dependem dos recursos naturais.`,
    opcoes: [
      { id: 1, texto: "Desmatamento intensivo" },
      { id: 2, texto: "Proteção da biodiversidade" },
      { id: 3, texto: "Expansão da agricultura" },
      { id: 4, texto: "Uso de espécies exóticas" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação da Biodiversidade", "Educação Ambiental"],
    fontes: [
      "1. Pereira, T. (2020). Benefícios das Áreas de Proteção Ambiental.",
      "2. Silva, C. (2021). Gestão de APAs e Conservação.",
    ],
    vantagem: "Ganhe um bônus de conservação!",
    desvantagem: "Perde 1 ponto de proteção.",
    dica: "APAs protegem a biodiversidade e os ecossistemas.",
  },
  {
    titulo: "Importância dos Corredores Ecológicos",
    pergunta: `Os corredores ecológicos são essenciais para a conectividade de habitats. Como eles beneficiam a biodiversidade?
    
    <img src="/18.png" alt="Corredores Ecológicos" class="img-pequena my-4" />
    
    Os corredores ecológicos são faixas de vegetação que conectam áreas de habitat isoladas, permitindo a movimentação de espécies entre elas. Eles são vitais para a manutenção da biodiversidade, pois facilitam o fluxo gênico e a dispersão de espécies, aumentando a resiliência dos ecossistemas. Os corredores também ajudam a mitigar os efeitos das mudanças climáticas e a reduzir a fragmentação dos habitats. A criação de corredores ecológicos é uma estratégia de conservação cada vez mais reconhecida globalmente.`,
    opcoes: [
      { id: 1, texto: "Aumentando o isolamento de populações" },
      { id: 2, texto: "Facilitando o fluxo gênico e a dispersão" },
      { id: 3, texto: "Reduzindo a conectividade entre habitats" },
      { id: 4, texto: "Promovendo a extinção de espécies" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade", "Soluções Baseadas na Natureza"],
    fontes: [
      "1. Martins, A. (2021). Corredores Ecológicos e Biodiversidade.",
      "2. Souza, G. (2020). Conectividade de Habitats e Conservação.",
    ],
    vantagem: "Avance 3 casas com os corredores ecológicos!",
    desvantagem: "Perde 2 pontos de conectividade.",
    dica: "Os corredores facilitam o fluxo gênico entre populações.",
  },
  {
    titulo: "Gestão de Riscos em Áreas Florestais",
    pergunta: `A gestão de riscos em áreas florestais é essencial para a segurança e a sustentabilidade. Qual é uma abordagem eficaz para a gestão de riscos florestais?
    
    <img src="/19.png" alt="Gestão de Riscos" class="img-grande my-4" />
    
    A gestão de riscos em áreas florestais envolve a identificação, avaliação e mitigação de ameaças potenciais às florestas. Isso inclui riscos naturais, como incêndios, pragas e mudanças climáticas, bem como riscos antrópicos, como desmatamento e poluição. Abordagens eficazes de gestão de riscos incluem o uso de tecnologias de monitoramento, a implementação de práticas de manejo adaptativo, e o envolvimento das comunidades locais na gestão e na resposta a emergências. Uma gestão de riscos bem-sucedida garante a resiliência e a sustentabilidade das florestas a longo prazo.`,
    opcoes: [
      { id: 1, texto: "Ignorar os riscos naturais" },
      { id: 2, texto: "Uso de tecnologias de monitoramento" },
      { id: 3, texto: "Aumento do desmatamento" },
      { id: 4, texto: "Expansão das áreas urbanas" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Mudanças Climáticas"],
    fontes: [
      "1. Almeida, N. (2021). Gestão de Riscos em Florestas.",
      "2. Costa, F. (2020). Estratégias de Mitigação de Riscos.",
    ],
    vantagem: "Receba um bônus de gestão de riscos!",
    desvantagem: "Perde 1 ponto de risco.",
    dica: "As tecnologias de monitoramento são essenciais.",
  },
  {
    titulo: "Benefícios da Agrofloresta",
    pergunta: `A agrofloresta combina práticas agrícolas e florestais para benefícios mútuos. Qual é um dos benefícios da agrofloresta?
    
    <img src="/20.png" alt="Agrofloresta" class="img-pequena my-4" />
    
    A agrofloresta é uma prática que integra árvores, culturas agrícolas e, em alguns casos, animais, em um sistema de uso da terra que maximiza os benefícios ambientais, sociais e econômicos. Um dos principais benefícios da agrofloresta é a melhoria da saúde do solo, que resulta em maior produtividade agrícola e resiliência a eventos climáticos extremos. Além disso, a agrofloresta contribui para o sequestro de carbono, a conservação da biodiversidade, e o sustento das comunidades rurais, tornando-se uma estratégia viável para o desenvolvimento sustentável.`,
    opcoes: [
      { id: 1, texto: "Redução da fertilidade do solo" },
      { id: 2, texto: "Aumento do sequestro de carbono" },
      { id: 3, texto: "Diminuição da biodiversidade" },
      { id: 4, texto: "Maior uso de pesticidas" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Soluções Baseadas na Natureza", "Silvicultura"],
    fontes: [
      "1. Lima, G. (2021). Benefícios da Agrofloresta.",
      "2. Santos, P. (2020). Agrofloresta e Desenvolvimento Sustentável.",
    ],
    vantagem: "Ganhe um bônus de agrofloresta!",
    desvantagem: "Perde 1 ponto de agrofloresta.",
    dica: "A agrofloresta aumenta o sequestro de carbono.",
  },
  {
    titulo: "Importância da Cobertura do Solo",
    pergunta: `Qual é o principal benefício da cobertura do solo nas florestas?`,
    opcoes: [
      { id: 1, texto: "Reduzir a erosão do solo" },
      { id: 2, texto: "Aumentar a temperatura do solo" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Conservação do Solo", "Manejo Florestal"],
    fontes: [
      "1. Silva, J. (2023). Gestão de Solos Florestais.",
      "2. Pereira, M. (2022). Técnicas de Cobertura do Solo.",
    ],
    vantagem: "Ganhe 1 ponto de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "",
  },
  {
    titulo: "Fotossíntese e Florestas",
    pergunta: `Verdadeiro ou Falso: As florestas desempenham um papel crucial no processo de fotossíntese global.`,
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia", "Silvicultura"],
    fontes: [
      "1. Oliveira, A. (2023). O Papel das Florestas na Fotossíntese.",
    ],
    vantagem: "Avance 1 casa!",
    desvantagem: "Volte 1 casa.",
    dica: "",
  },
  {
    titulo: "Inventário Florestal Avançado",
    pergunta: `Qual tecnologia é utilizada para obter dados precisos sobre o dossel das florestas?`,
    opcoes: [
      { id: 1, texto: "Fotografias aéreas" },
      { id: 2, texto: "LiDAR (Light Detection and Ranging)" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Tecnologia Florestal", "Inventário Florestal"],
    fontes: [
      "1. Lima, B. (2021). Tecnologias no Inventário Florestal.",
    ],
    vantagem: "Ganhe 2 pontos de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "LiDAR é amplamente usado em inventários modernos.",
  },
  {
    titulo: "Erosão do Solo",
    pergunta: `Qual prática agrícola contribui significativamente para a erosão do solo?`,
    opcoes: [
      { id: 1, texto: "Rotação de culturas" },
      { id: 2, texto: "Monocultura intensiva" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação do Solo", "Agricultura"],
    fontes: [
      "1. Santos, C. (2023). Impacto da Agricultura na Erosão do Solo.",
    ],
    vantagem: "Avance 1 casa e ganhe um ponto de solo!",
    desvantagem: "Volte 1 casa.",
    dica: "",
  },
  {
    titulo: "Plantas Invasoras",
    pergunta: `Qual é uma estratégia eficaz para controlar plantas invasoras?`,
    opcoes: [
      { id: 1, texto: "Uso de herbicidas seletivos" },
      { id: 2, texto: "Desmatamento total" },
    ],
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Biodiversidade"],
    fontes: [
      "1. Almeida, F. (2022). Controle de Plantas Invasoras.",
    ],
    vantagem: "Ganhe 3 pontos de biodiversidade!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "Herbicidas seletivos são mais sustentáveis.",
  },
  {
    titulo: "Prêmios de Inventário",
    pergunta: `Escolha seu prêmio favorito!`,
    opcoes: [
      { id: 1, texto: "Ganhe 5 MM" },
      { id: 2, texto: "Avance 2 casas" },
      { id: 3, texto: "Ganhe uma dica extra" },
      { id: 4, texto: "Receba um bônus especial" },
    ],
    respostaCorreta: [1, 2, 3, 4], // Todas as respostas estão corretas
    dificuldade: "facil",
    categorias: ["Prêmios", "Inventário"],
    fontes: [
      "1. Sousa, L. (2023). Práticas de Inventário Florestal.",
    ],
    vantagem: "Escolha seu prêmio!",
    desvantagem: "",
    dica: "",
  },
  {
    titulo: "Plantio de Árvores Nativas",
    pergunta: `Qual é o benefício de plantar árvores nativas em áreas degradadas?`,
    opcoes: [
      { id: 1, texto: "Reduz a biodiversidade" },
      { id: 2, texto: "Promove a restauração ecológica" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Restauração Ecológica", "Silvicultura"],
    fontes: [
      "1. Martins, J. (2023). Recuperação de Áreas Degradadas.",
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "Árvores nativas ajudam a restaurar ecossistemas.",
  },
  {
    titulo: "Impacto das Mudanças Climáticas",
    pergunta: `Verdadeiro ou Falso: As mudanças climáticas podem aumentar a frequência de incêndios florestais.`,
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" },
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Mudanças Climáticas", "Incêndios Florestais"],
    fontes: [
      "1. Castro, E. (2023). Impactos das Mudanças Climáticas.",
    ],
    vantagem: "Avance 1 casa!",
    desvantagem: "Volte 1 casa.",
    dica: "",
  },
  {
    titulo: "Ganhe 10 MM",
    pergunta: `Parabéns! Você ganhou 10 moedas mágicas!`,
    opcoes: [
      { id: 1, texto: "Entendi", style: { fontSize: "larger", textAlign: "center" } }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Prêmios"],
    fontes: [],
    vantagem: "Ganhe 10 MM!",
    desvantagem: "",
    dica: "",
  },
  {
    titulo: "Conservação de Habitats",
    pergunta: `Qual prática é mais benéfica para a conservação de habitats florestais?`,
    opcoes: [
      { id: 1, texto: "Construção de estradas" },
      { id: 2, texto: "Criação de áreas protegidas" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação", "Biodiversidade"],
    fontes: [
      "1. Moreira, T. (2023). Estratégias de Conservação de Habitats.",
    ],
    vantagem: "Ganhe 2 pontos de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "Áreas protegidas ajudam a manter a biodiversidade.",
  },
  {
    titulo: "Rotação de Culturas",
    pergunta: `Qual é o benefício da rotação de culturas no manejo agrícola?`,
    opcoes: [
      { id: 1, texto: "Aumenta a erosão do solo" },
      { id: 2, texto: "Melhora a saúde do solo" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Agricultura", "Manejo Florestal"],
    fontes: [
      "1. Fernandes, L. (2022). Práticas Agrícolas Sustentáveis.",
    ],
    vantagem: "Ganhe 1 ponto de saúde do solo!",
    desvantagem: "Perde 1 ponto de saúde do solo.",
    dica: "",
  },
  {
    titulo: "Manejo de Resíduos Florestais",
    pergunta: `Qual é uma prática sustentável para o manejo de resíduos florestais?`,
    opcoes: [
      { id: 1, texto: "Queima descontrolada" },
      { id: 2, texto: "Compostagem de resíduos" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Gestão de Resíduos", "Silvicultura"],
    fontes: [
      "1. Silva, M. (2022). Gestão Sustentável de Resíduos Florestais.",
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de sustentabilidade.",
    dica: "",
  },
  {
    titulo: "Conservação da Água",
    pergunta: `Qual técnica ajuda a conservar água em áreas florestais?`,
    opcoes: [
      { id: 1, texto: "Irrigação excessiva" },
      { id: 2, texto: "Uso de cobertura vegetal" },
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação de Água", "Silvicultura"],
    fontes: [
      "1. Santos, A. (2023). Técnicas de Conservação de Água.",
    ],
    vantagem: "Ganhe 1 ponto de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "",
  },
  {
    titulo: "Restauração de Ecossistemas",
    pergunta: `Qual é o principal objetivo da restauração de ecossistemas?`,
    opcoes: [
      { id: 1, texto: "Aumentar a urbanização" },
      { id: 2, texto: "Recuperar a biodiversidade" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Costa, R. (2022). Restauração de Ecossistemas.",
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "",
  },
  {
    titulo: "Árvores e Sequestro de Carbono",
    pergunta: `Como as árvores ajudam no sequestro de carbono?`,
    opcoes: [
      { id: 1, texto: "Liberando carbono" },
      { id: 2, texto: "Armazenando carbono na biomassa" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Mudanças Climáticas", "Silvicultura"],
    fontes: [
      "1. Oliveira, F. (2021). Florestas e o Ciclo do Carbono.",
    ],
    vantagem: "Ganhe 2 pontos de carbono!",
    desvantagem: "Perde 1 ponto de carbono.",
    dica: "As árvores armazenam carbono em sua biomassa.",
  },
  {
    titulo: "Áreas de Proteção Permanente",
    pergunta: `Qual é o principal benefício das Áreas de Proteção Permanente (APPs)?`,
    opcoes: [
      { id: 1, texto: "Reduzir a biodiversidade" },
      { id: 2, texto: "Proteger cursos d'água" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação", "Silvicultura"],
    fontes: [
      "1. Santos, C. (2023). Importância das APPs.",
    ],
    vantagem: "Ganhe 2 pontos de proteção!",
    desvantagem: "Perde 1 ponto de proteção.",
    dica: "",
  },
  {
    titulo: "Monitoramento de Pragas",
    pergunta: `Qual é a técnica mais eficaz para o controle de pragas florestais?`,
    opcoes: [
      { id: 1, texto: "Uso de pesticidas químicos" },
      { id: 2, texto: "Manejo integrado de pragas" },
    ],
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Conservação"],
    fontes: [
      "1. Almeida, R. (2023). Controle de Pragas Sustentável.",
    ],
    vantagem: "Ganhe 3 pontos de manejo!",
    desvantagem: "Perde 2 pontos de manejo.",
    dica: "",
  },
  {
    titulo: "Benefícios da Agrofloresta",
    pergunta: `A agrofloresta combina práticas agrícolas e florestais para benefícios mútuos. Qual é um dos benefícios da agrofloresta?
    
    <img src="/20.png" alt="Agrofloresta" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Redução da fertilidade do solo" },
      { id: 2, texto: "Aumento do sequestro de carbono" },
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Soluções Baseadas na Natureza", "Silvicultura"],
    fontes: [
      "1. Lima, G. (2021). Benefícios da Agrofloresta.",
    ],
    vantagem: "Ganhe um bônus de agrofloresta!",
    desvantagem: "Perde 1 ponto de agrofloresta.",
    dica: "A agrofloresta aumenta o sequestro de carbono.",
  },
  {
    titulo: "Fotossíntese nas Florestas",
    pergunta: `Verdadeiro ou Falso: As florestas são essenciais para o processo de fotossíntese.`,
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Ecologia", "Silvicultura"],
    fontes: [
      "1. Oliveira, A. (2023). O Papel das Florestas na Fotossíntese."
    ],
    vantagem: "Avance 1 casa!",
    desvantagem: "Volte 1 casa.",
    dica: ""
  },
  {
    titulo: "Importância do Inventário",
    pergunta: `Verdadeiro ou Falso: O inventário florestal ajuda a determinar a biodiversidade de uma área.`,
    opcoes: [
      { id: 1, texto: "Verdadeiro" },
      { id: 2, texto: "Falso" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Inventário Florestal"],
    fontes: [
      "1. Silva, J. (2023). Gestão de Inventário Florestal."
    ],
    vantagem: "Ganhe 1 ponto de inventário!",
    desvantagem: "Perde 1 ponto de inventário.",
    dica: ""
  },
  {
    titulo: "Benefícios da Cobertura Vegetal",
    pergunta: `Qual é o principal benefício da cobertura vegetal nas florestas?`,
    opcoes: [
      { id: 1, texto: "Reduz a erosão do solo" },
      { id: 2, texto: "Aumenta a erosão do solo" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Conservação do Solo", "Manejo Florestal"],
    fontes: [
      "1. Santos, C. (2023). Impacto da Cobertura Vegetal."
    ],
    vantagem: "Ganhe 1 ponto de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: ""
  },
  {
    titulo: "Conservação de Água",
    pergunta: `Qual prática ajuda a conservar a água nas florestas?`,
    opcoes: [
      { id: 1, texto: "Desmatamento" },
      { id: 2, texto: "Uso de cobertura vegetal" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação de Água", "Silvicultura"],
    fontes: [
      "1. Santos, A. (2023). Técnicas de Conservação de Água."
    ],
    vantagem: "Ganhe 1 ponto de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: ""
  },
  {
    titulo: "Ganhe 10 MM",
    pergunta: `Parabéns! Você ganhou 10 moedas mágicas!`,
    opcoes: [
      { id: 1, texto: "Entendi", style: { fontSize: "larger", textAlign: "center" } }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Prêmios"],
    fontes: [],
    vantagem: "Ganhe 10 MM!",
    desvantagem: "",
    dica: ""
  },

  // Fáceis com 3 alternativas (20%)
  {
    titulo: "Erosão do Solo",
    pergunta: `Qual prática agrícola contribui para a erosão do solo?`,
    opcoes: [
      { id: 1, texto: "Rotação de culturas" },
      { id: 2, texto: "Plantio direto" },
      { id: 3, texto: "Monocultura intensiva" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Conservação do Solo", "Agricultura"],
    fontes: [
      "1. Pereira, M. (2023). Impacto da Agricultura na Erosão do Solo."
    ],
    vantagem: "Avance 1 casa e ganhe um ponto de solo!",
    desvantagem: "Volte 1 casa.",
    dica: ""
  },
  {
    titulo: "Importância da Água",
    pergunta: `Qual é o papel da água nas florestas?`,
    opcoes: [
      { id: 1, texto: "Evaporação constante" },
      { id: 2, texto: "Suporte à biodiversidade" },
      { id: 3, texto: "Diminuição da biodiversidade" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação de Água", "Biodiversidade"],
    fontes: [
      "1. Almeida, L. (2023). O Papel da Água nas Florestas."
    ],
    vantagem: "Ganhe 1 ponto de biodiversidade!",
    desvantagem: "Perde 1 ponto de biodiversidade.",
    dica: ""
  },
  {
    titulo: "Rotação de Culturas",
    pergunta: `Qual é o benefício da rotação de culturas no manejo agrícola?`,
    opcoes: [
      { id: 1, texto: "Aumenta a erosão do solo" },
      { id: 2, texto: "Melhora a saúde do solo" },
      { id: 3, texto: "Reduz a produtividade" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Agricultura", "Manejo Florestal"],
    fontes: [
      "1. Fernandes, L. (2022). Práticas Agrícolas Sustentáveis."
    ],
    vantagem: "Ganhe 1 ponto de saúde do solo!",
    desvantagem: "Perde 1 ponto de saúde do solo.",
    dica: ""
  },
  {
    titulo: "Importância da Biodiversidade",
    pergunta: `Qual é o benefício da biodiversidade para as florestas?`,
    opcoes: [
      { id: 1, texto: "Aumenta a resiliência" },
      { id: 2, texto: "Reduz a saúde da floresta" },
      { id: 3, texto: "Diminui a diversidade" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Biodiversidade", "Conservação"],
    fontes: [
      "1. Moreira, T. (2023). Importância da Biodiversidade."
    ],
    vantagem: "Ganhe 1 ponto de biodiversidade!",
    desvantagem: "Perde 1 ponto de biodiversidade.",
    dica: ""
  },
  {
    titulo: "Ganhe 5 MM",
    pergunta: `Escolha sua recompensa favorita!`,
    opcoes: [
      { id: 1, texto: "Ganhe 5 MM" },
      { id: 2, texto: "Avance 2 casas" },
      { id: 3, texto: "Ganhe uma dica extra" }
    ],
    respostaCorreta: [1, 2, 3], // Todas as respostas estão corretas
    dificuldade: "facil",
    categorias: ["Prêmios"],
    fontes: [],
    vantagem: "Escolha sua recompensa!",
    desvantagem: "",
    dica: ""
  },

  // Fáceis com 4 alternativas (70%)
  {
    titulo: "Benefícios das Florestas",
    pergunta: `Qual é um dos benefícios das florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da desertificação" },
      { id: 2, texto: "Fornecimento de oxigênio" },
      { id: 3, texto: "Redução de habitat" },
      { id: 4, texto: "Aumento da erosão" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Biodiversidade", "Conservação"],
    fontes: [
      "1. Costa, L. (2022). Benefícios das Florestas Tropicais."
    ],
    vantagem: "Ganhe 2 pontos de biodiversidade!",
    desvantagem: "Perde 1 ponto de biodiversidade.",
    dica: ""
  },
  {
    titulo: "Fotossíntese e Árvores",
    pergunta: `Qual é o papel das árvores na fotossíntese?`,
    opcoes: [
      { id: 1, texto: "Absorvem oxigênio" },
      { id: 2, texto: "Produzem oxigênio" },
      { id: 3, texto: "Emitem dióxido de carbono" },
      { id: 4, texto: "Reduzem a água" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecologia", "Silvicultura"],
    fontes: [
      "1. Oliveira, A. (2023). O Papel das Árvores na Fotossíntese."
    ],
    vantagem: "Ganhe 2 pontos de ecologia!",
    desvantagem: "Perde 1 ponto de ecologia.",
    dica: ""
  },
  {
    titulo: "Impacto das Mudanças Climáticas",
    pergunta: `Qual é um dos impactos das mudanças climáticas nas florestas?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Redução da frequência de incêndios" },
      { id: 3, texto: "Aumento das pragas e doenças" },
      { id: 4, texto: "Aumento da produção de madeira" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Mudanças Climáticas", "Conservação da Biodiversidade"],
    fontes: [
      "1. Santos, P. (2022). Mudanças Climáticas e Florestas."
    ],
    vantagem: "Ganhe 2 pontos de adaptação!",
    desvantagem: "Perde 1 ponto de adaptação.",
    dica: "As mudanças climáticas frequentemente aumentam as pragas."
  },
  {
    titulo: "Educação Ambiental",
    pergunta: `Como a educação ambiental pode ajudar a proteger as florestas?`,
    opcoes: [
      { id: 1, texto: "Promovendo o uso de pesticidas" },
      { id: 2, texto: "Aumentando o desmatamento" },
      { id: 3, texto: "Conscientizando sobre a conservação" },
      { id: 4, texto: "Incentivando a monocultura" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Andrade, R. (2021). Educação Ambiental e Florestas."
    ],
    vantagem: "Ganhe 2 pontos de educação!",
    desvantagem: "Perca 1 ponto de educação.",
    dica: "A educação ambiental é vital para a conservação."
  },
  {
    titulo: "Princípios de Silvicultura Sustentável",
    pergunta: `Qual é um dos princípios da silvicultura sustentável?`,
    opcoes: [
      { id: 1, texto: "Maximizar a produção de madeira" },
      { id: 2, texto: "Desmatamento em larga escala" },
      { id: 3, texto: "Promoção da biodiversidade" },
      { id: 4, texto: "Uso intensivo de fertilizantes" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Silvicultura", "Desenvolvimento Sustentável"],
    fontes: [
      "1. Oliveira, L. (2019). Princípios de Silvicultura Sustentável."
    ],
    vantagem: "Receba um certificado de sustentabilidade!",
    desvantagem: "Perca 2 pontos de silvicultura.",
    dica: "A biodiversidade é central na silvicultura sustentável."
  },
  {
    titulo: "Gestão de Riscos em Áreas Florestais",
    pergunta: `Qual é uma abordagem eficaz para a gestão de riscos florestais?`,
    opcoes: [
      { id: 1, texto: "Ignorar os riscos naturais" },
      { id: 2, texto: "Uso de tecnologias de monitoramento" },
      { id: 3, texto: "Aumento do desmatamento" },
      { id: 4, texto: "Expansão das áreas urbanas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal", "Mudanças Climáticas"],
    fontes: [
      "1. Almeida, N. (2021). Gestão de Riscos em Florestas."
    ],
    vantagem: "Receba um bônus de gestão de riscos!",
    desvantagem: "Perde 1 ponto de risco.",
    dica: "As tecnologias de monitoramento são essenciais."
  },
  {
    titulo: "Uso de Energias Renováveis",
    pergunta: `Qual é o benefício do uso de energias renováveis nas florestas?`,
    opcoes: [
      { id: 1, texto: "Aumento da poluição" },
      { id: 2, texto: "Redução das emissões de carbono" },
      { id: 3, texto: "Destruição de habitats naturais" },
      { id: 4, texto: "Diminuição da biodiversidade" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Energias Renováveis", "Mudanças Climáticas"],
    fontes: [
      "1. Silva, R. (2023). Energias Renováveis e Florestas."
    ],
    vantagem: "Ganhe 2 pontos de carbono!",
    desvantagem: "Perde 1 ponto de carbono.",
    dica: "Energias renováveis ajudam a reduzir as emissões de carbono."
  },
  {
    titulo: "Plantio de Árvores Nativas",
    pergunta: `Qual é o benefício de plantar árvores nativas em áreas degradadas?`,
    opcoes: [
      { id: 1, texto: "Reduz a biodiversidade" },
      { id: 2, texto: "Promove a restauração ecológica" },
      { id: 3, texto: "Aumenta a erosão" },
      { id: 4, texto: "Diminui a fertilidade do solo" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Restauração Ecológica", "Silvicultura"],
    fontes: [
      "1. Martins, J. (2023). Recuperação de Áreas Degradadas."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "Árvores nativas ajudam a restaurar ecossistemas."
  },
  {
    titulo: "Efeitos das Pragas Florestais",
    pergunta: `Qual é uma estratégia eficaz para controlar pragas florestais?`,
    opcoes: [
      { id: 1, texto: "Uso de pesticidas químicos" },
      { id: 2, texto: "Manejo integrado de pragas" },
      { id: 3, texto: "Destruição de habitats naturais" },
      { id: 4, texto: "Aumento de monoculturas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Manejo Florestal", "Biodiversidade"],
    fontes: [
      "1. Almeida, F. (2022). Controle de Pragas Florestais."
    ],
    vantagem: "Ganhe 2 pontos de manejo!",
    desvantagem: "Perde 1 ponto de manejo.",
    dica: "O manejo integrado é uma abordagem eficaz."
  },
  {
    titulo: "Impacto do Desmatamento",
    pergunta: `Qual é uma consequência do desmatamento desenfreado?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Redução de habitats" },
      { id: 3, texto: "Melhoria na qualidade do ar" },
      { id: 4, texto: "Aumento da resiliência florestal" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Desmatamento", "Biodiversidade"],
    fontes: [
      "1. Sousa, P. (2023). Impactos do Desmatamento."
    ],
    vantagem: "Ganhe 2 pontos de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: ""
  },
  {
    titulo: "Recuperação de Áreas Degradadas",
    pergunta: `Qual é uma técnica eficaz para recuperar áreas degradadas?`,
    opcoes: [
      { id: 1, texto: "Uso de herbicidas químicos" },
      { id: 2, texto: "Estabilização do solo" },
      { id: 3, texto: "Desmatamento seletivo" },
      { id: 4, texto: "Plantio de espécies exóticas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Recuperação de Áreas Degradadas", "Soluções Baseadas na Natureza"],
    fontes: [
      "1. Sousa, H. (2019). Técnicas de Recuperação de Áreas Degradadas.",
      "2. Martins, F. (2020). Estratégias para a Restauração Ecológica."
    ],
    vantagem: "Receba uma carta de recuperação!",
    desvantagem: "Perca 2 pontos de recuperação.",
    dica: "A estabilização do solo é uma técnica-chave."
  },
  {
    titulo: "Importância das APPs",
    pergunta: `Qual é o principal benefício das Áreas de Proteção Permanente (APPs)?`,
    opcoes: [
      { id: 1, texto: "Reduzir a biodiversidade" },
      { id: 2, texto: "Proteger cursos d'água" },
      { id: 3, texto: "Aumentar a poluição" },
      { id: 4, texto: "Diminuição da fauna" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação", "Silvicultura"],
    fontes: [
      "1. Santos, C. (2023). Importância das APPs."
    ],
    vantagem: "Ganhe 2 pontos de proteção!",
    desvantagem: "Perde 1 ponto de proteção.",
    dica: ""
  },
  {
    titulo: "Monitoramento Florestal",
    pergunta: `Qual técnica é frequentemente usada para monitorar a saúde das florestas?
    
    <img src="/11.png" alt="Monitoramento Florestal" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Observação direta no local" },
      { id: 2, texto: "Sensoriamento remoto por satélites" },
      { id: 3, texto: "Análise de solo" },
      { id: 4, texto: "Medição de temperatura" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Tecnologia em Florestas", "Monitoramento"],
    fontes: [
      "1. Carvalho, R. (2021). Técnicas de Monitoramento Florestal Modernas."
    ],
    vantagem: "Ganhe um ponto de monitoramento!",
    desvantagem: "Perde 1 ponto de monitoramento.",
    dica: "Satélites são frequentemente usados no monitoramento."
  },
  {
    titulo: "Benefícios dos Corredores Ecológicos",
    pergunta: `Qual é um dos benefícios dos corredores ecológicos para a biodiversidade?`,
    opcoes: [
      { id: 1, texto: "Aumenta o isolamento de espécies" },
      { id: 2, texto: "Promove a extinção de espécies" },
      { id: 3, texto: "Facilita o fluxo gênico" },
      { id: 4, texto: "Reduz a conectividade de habitats" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Biodiversidade", "Conservação"],
    fontes: [
      "1. Oliveira, G. (2023). Benefícios dos Corredores Ecológicos."
    ],
    vantagem: "Ganhe 2 pontos de conectividade!",
    desvantagem: "Perde 1 ponto de conectividade.",
    dica: "Corredores ecológicos facilitam o fluxo gênico."
  },
  {
    titulo: "Tecnologia em Silvicultura",
    pergunta: `Qual é um exemplo de tecnologia usada na silvicultura digital?
    
    <img src="/12.png" alt="Silvicultura Digital" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Análise de big data" },
      { id: 2, texto: "Uso exclusivo de métodos tradicionais" },
      { id: 3, texto: "Desmatamento intensivo" },
      { id: 4, texto: "Exclusão de comunidades locais" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Gomes, D. (2020). Inovações na Silvicultura Digital."
    ],
    vantagem: "Avance 2 casas com a ajuda da tecnologia!",
    desvantagem: "Perde 1 ponto de inovação.",
    dica: "Big data é uma tecnologia-chave na silvicultura digital."
  },
  {
    titulo: "Conservação de Florestas Urbanas",
    pergunta: `Qual é uma estratégia eficaz para conservar florestas urbanas?
    
    <img src="/13.png" alt="Florestas Urbanas" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Expansão da infraestrutura urbana" },
      { id: 2, texto: "Uso de espécies exóticas" },
      { id: 3, texto: "Gestão participativa e planejamento" },
      { id: 4, texto: "Redução dos espaços verdes" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Moreira, V. (2021). Estratégias para Florestas Urbanas."
    ],
    vantagem: "Ganhe 3 pontos de urbanismo!",
    desvantagem: "Perde 2 pontos de urbanismo.",
    dica: "O planejamento participativo é vital na conservação urbana."
  },
  {
    titulo: "Importância das Áreas Protegidas",
    pergunta: `Qual é um dos principais benefícios das Áreas de Proteção Ambiental (APAs)?`,
    opcoes: [
      { id: 1, texto: "Desmatamento intensivo" },
      { id: 2, texto: "Proteção da biodiversidade" },
      { id: 3, texto: "Expansão da agricultura" },
      { id: 4, texto: "Uso de espécies exóticas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação da Biodiversidade", "Educação Ambiental"],
    fontes: [
      "1. Pereira, T. (2020). Benefícios das Áreas de Proteção Ambiental."
    ],
    vantagem: "Ganhe um bônus de conservação!",
    desvantagem: "Perde 1 ponto de proteção.",
    dica: "APAs protegem a biodiversidade e os ecossistemas."
  },
  {
    titulo: "Inovações na Silvicultura Digital",
    pergunta: `Qual é um exemplo de tecnologia usada na silvicultura digital?`,
    opcoes: [
      { id: 1, texto: "Análise de big data" },
      { id: 2, texto: "Uso exclusivo de métodos tradicionais" },
      { id: 3, texto: "Desmatamento intensivo" },
      { id: 4, texto: "Exclusão de comunidades locais" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Gomes, D. (2020). Inovações na Silvicultura Digital."
    ],
    vantagem: "Avance 2 casas com a ajuda da tecnologia!",
    desvantagem: "Perde 1 ponto de inovação.",
    dica: "Big data é uma tecnologia-chave na silvicultura digital."
  },
  {
    titulo: "Princípios de Gestão Florestal",
    pergunta: `Qual é um dos princípios da gestão florestal sustentável?`,
    opcoes: [
      { id: 1, texto: "Desmatamento irrestrito" },
      { id: 2, texto: "Uso responsável de recursos" },
      { id: 3, texto: "Redução da biodiversidade" },
      { id: 4, texto: "Expansão de monoculturas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Gestão Florestal", "Silvicultura"],
    fontes: [
      "1. Oliveira, J. (2023). Princípios da Gestão Florestal."
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de sustentabilidade.",
    dica: "A gestão florestal sustentável envolve o uso responsável de recursos."
  },
  {
    titulo: "Conservação de Espécies",
    pergunta: `Qual é uma estratégia eficaz para a conservação de espécies ameaçadas?`,
    opcoes: [
      { id: 1, texto: "Destruição de habitats" },
      { id: 2, texto: "Criação de reservas naturais" },
      { id: 3, texto: "Aumento da caça" },
      { id: 4, texto: "Introdução de espécies invasoras" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação", "Biodiversidade"],
    fontes: [
      "1. Lima, S. (2023). Estratégias de Conservação de Espécies."
    ],
    vantagem: "Ganhe 2 pontos de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "Reservas naturais são eficazes na conservação de espécies ameaçadas."
  },
  {
    titulo: "Restauração de Paisagens",
    pergunta: `Qual é o objetivo principal da restauração de paisagens florestais?`,
    opcoes: [
      { id: 1, texto: "Aumento do desmatamento" },
      { id: 2, texto: "Recuperação da funcionalidade ecológica" },
      { id: 3, texto: "Redução da biodiversidade" },
      { id: 4, texto: "Expansão de áreas urbanas" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Costa, P. (2023). Restauração de Paisagens Florestais."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "A restauração visa recuperar a funcionalidade ecológica."
  },
  {
    titulo: "Ciclo do Carbono",
    pergunta: `Qual é o papel das florestas no ciclo do carbono?`,
    opcoes: [
      { id: 1, texto: "Emissão de carbono" },
      { id: 2, texto: "Sequestro de carbono" },
      { id: 3, texto: "Aumento do dióxido de carbono" },
      { id: 4, texto: "Diminuição do oxigênio" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Mudanças Climáticas", "Silvicultura"],
    fontes: [
      "1. Santos, D. (2023). Florestas e o Ciclo do Carbono."
    ],
    vantagem: "Ganhe 2 pontos de carbono!",
    desvantagem: "Perde 1 ponto de carbono.",
    dica: "As florestas ajudam a sequestrar carbono da atmosfera."
  },
  {
    titulo: "Ecoturismo",
    pergunta: `Qual é um dos benefícios do ecoturismo para as florestas?`,
    opcoes: [
      { id: 1, texto: "Destruição de habitats" },
      { id: 2, texto: "Geração de renda sustentável" },
      { id: 3, texto: "Aumento do desmatamento" },
      { id: 4, texto: "Redução da biodiversidade" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Ecoturismo", "Conservação"],
    fontes: [
      "1. Lima, T. (2023). Benefícios do Ecoturismo para as Florestas."
    ],
    vantagem: "Ganhe 2 pontos de ecoturismo!",
    desvantagem: "Perde 1 ponto de ecoturismo.",
    dica: "O ecoturismo gera renda sustentável e promove a conservação."
  },
  {
    titulo: "Reciclagem e Sustentabilidade",
    pergunta: `Qual é o impacto da reciclagem na sustentabilidade florestal?`,
    opcoes: [
      { id: 1, texto: "Aumento do desperdício" },
      { id: 2, texto: "Redução do consumo de recursos" },
      { id: 3, texto: "Diminuição da saúde ambiental" },
      { id: 4, texto: "Aumento da poluição" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Sustentabilidade", "Conservação"],
    fontes: [
      "1. Almeida, R. (2023). Impacto da Reciclagem na Sustentabilidade."
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de sustentabilidade.",
    dica: "A reciclagem ajuda a reduzir o consumo de recursos."
  },
  {
    titulo: "Benefícios das Soluções Baseadas na Natureza",
    pergunta: `Qual é um exemplo de SbN aplicado ao manejo florestal?
    
    <img src="/6.jpg" alt="Soluções Baseadas na Natureza" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Plantio de árvores exóticas" },
      { id: 2, texto: "Construção de barragens" },
      { id: 3, texto: "Criação de corredores ecológicos" },
      { id: 4, texto: "Intensificação do uso do solo" }
    ],
    respostaCorreta: 3,
    dificuldade: "facil",
    categorias: ["Soluções Baseadas na Natureza", "Manejo Florestal"],
    fontes: [
      "1. Mendes, T. (2020). Soluções Baseadas na Natureza no Contexto Florestal.",
      "2. Costa, J. (2021). SbN e o Futuro das Florestas."
    ],
    vantagem: "Avance 3 casas com a ajuda da natureza!",
    desvantagem: "Perde 1 ponto de SbN.",
    dica: "Corredores ecológicos são um exemplo de SbN."
  },
  {
    titulo: "Recuperação de Ecossistemas",
    pergunta: `Qual é a principal meta da recuperação de ecossistemas?`,
    opcoes: [
      { id: 1, texto: "Expansão urbana" },
      { id: 2, texto: "Recuperação da biodiversidade" },
      { id: 3, texto: "Aumento de monoculturas" },
      { id: 4, texto: "Destruição de habitats" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Costa, R. (2022). Restauração de Ecossistemas."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "A restauração visa recuperar a biodiversidade perdida."
  },
  {
    titulo: "Proteção de Espécies Ameaçadas",
    pergunta: `Qual é uma medida eficaz para proteger espécies ameaçadas?`,
    opcoes: [
      { id: 1, texto: "Destruição de habitats" },
      { id: 2, texto: "Estabelecimento de áreas protegidas" },
      { id: 3, texto: "Expansão da caça" },
      { id: 4, texto: "Introdução de espécies invasoras" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação", "Biodiversidade"],
    fontes: [
      "1. Lima, S. (2023). Proteção de Espécies Ameaçadas."
    ],
    vantagem: "Ganhe 2 pontos de proteção!",
    desvantagem: "Perde 1 ponto de proteção.",
    dica: "Áreas protegidas são cruciais para a proteção de espécies ameaçadas."
  },
  {
    titulo: "Importância dos Corredores Ecológicos",
    pergunta: `Os corredores ecológicos são essenciais para a conectividade de habitats. Como eles beneficiam a biodiversidade?
    
    <img src="/18.png" alt="Corredores Ecológicos" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Aumentando o isolamento de populações" },
      { id: 2, texto: "Facilitando o fluxo gênico e a dispersão" },
      { id: 3, texto: "Reduzindo a conectividade entre habitats" },
      { id: 4, texto: "Promovendo a extinção de espécies" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Conservação da Biodiversidade", "Soluções Baseadas na Natureza"],
    fontes: [
      "1. Martins, A. (2021). Corredores Ecológicos e Biodiversidade.",
      "2. Souza, G. (2020). Conectividade de Habitats e Conservação."
    ],
    vantagem: "Avance 3 casas com os corredores ecológicos!",
    desvantagem: "Perde 2 pontos de conectividade.",
    dica: "Os corredores facilitam o fluxo gênico entre populações."
  },
  {
    titulo: "Gestão de Resíduos Florestais",
    pergunta: `Qual é uma prática sustentável para o manejo de resíduos florestais?`,
    opcoes: [
      { id: 1, texto: "Queima descontrolada" },
      { id: 2, texto: "Compostagem de resíduos" },
      { id: 3, texto: "Descarte em rios" },
      { id: 4, texto: "Expansão de aterros sanitários" }
    ],
    respostaCorreta: 2,
    dificuldade: "facil",
    categorias: ["Gestão de Resíduos", "Silvicultura"],
    fontes: [
      "1. Silva, M. (2022). Gestão Sustentável de Resíduos Florestais."
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de sustentabilidade.",
    dica: ""
  },

  // Normais (Sempre 4 alternativas)
  {
    titulo: "Inventário Florestal Avançado",
    pergunta: `Qual tecnologia é utilizada para obter dados precisos sobre o dossel das florestas?`,
    opcoes: [
      { id: 1, texto: "Fotografias aéreas" },
      { id: 2, texto: "LiDAR (Light Detection and Ranging)" },
      { id: 3, texto: "Satélites ópticos" },
      { id: 4, texto: "Sensores térmicos" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Tecnologia Florestal", "Inventário Florestal"],
    fontes: [
      "1. Lima, B. (2021). Tecnologias no Inventário Florestal."
    ],
    vantagem: "Ganhe 2 pontos de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "LiDAR é amplamente usado em inventários modernos."
  },
  {
    titulo: "Erosão do Solo",
    pergunta: `Qual prática agrícola contribui para a erosão do solo?`,
    opcoes: [
      { id: 1, texto: "Rotação de culturas" },
      { id: 2, texto: "Plantio direto" },
      { id: 3, texto: "Monocultura intensiva" },
      { id: 4, texto: "Agrofloresta" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Conservação do Solo", "Agricultura"],
    fontes: [
      "1. Pereira, M. (2023). Impacto da Agricultura na Erosão do Solo."
    ],
    vantagem: "Avance 1 casa e ganhe um ponto de solo!",
    desvantagem: "Volte 1 casa.",
    dica: ""
  },
  {
    titulo: "Impacto das Mudanças Climáticas",
    pergunta: `Qual é um dos impactos das mudanças climáticas nas florestas?
    
    <img src="/5.jpg" alt="Mudanças Climáticas" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Aumento na biodiversidade" },
      { id: 2, texto: "Redução da frequência de incêndios" },
      { id: 3, texto: "Aumento das pragas e doenças" },
      { id: 4, texto: "Aumento na produção de madeira" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Mudanças Climáticas", "Conservação da Biodiversidade"],
    fontes: [
      "1. Santos, P. (2022). Mudanças Climáticas e Florestas.",
      "2. Araújo, E. (2021). Impactos Climáticos na Biodiversidade Florestal."
    ],
    vantagem: "Ganhe 4 pontos de adaptação!",
    desvantagem: "Perde 3 pontos de adaptação.",
    dica: "As mudanças climáticas frequentemente aumentam as pragas."
  },
  {
    titulo: "Tecnologia LiDAR em Silvicultura",
    pergunta: `O uso de LiDAR (Light Detection and Ranging) na silvicultura tem revolucionado o inventário florestal. Como essa tecnologia é usada para medir a densidade da floresta?
    
    <img src="/4.jpg" alt="Tecnologia LiDAR" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Através de fotografias aéreas" },
      { id: 2, texto: "Com sensores de solo" },
      { id: 3, texto: "Usando pulsos de laser" },
      { id: 4, texto: "Por satélites de alta resolução" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Lima, M. (2020). Aplicações de LiDAR na Silvicultura.",
      "2. Ferreira, S. (2021). LiDAR e a Revolução do Inventário Florestal."
    ],
    vantagem: "Receba um bônus de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "LiDAR utiliza pulsos de laser para medir a densidade."
  },
  {
    titulo: "Plantio de Árvores Nativas",
    pergunta: `Qual é o benefício de plantar árvores nativas em áreas degradadas?`,
    opcoes: [
      { id: 1, texto: "Reduz a biodiversidade" },
      { id: 2, texto: "Promove a restauração ecológica" },
      { id: 3, texto: "Aumenta a erosão" },
      { id: 4, texto: "Diminui a fertilidade do solo" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Restauração Ecológica", "Silvicultura"],
    fontes: [
      "1. Martins, J. (2023). Recuperação de Áreas Degradadas."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "Árvores nativas ajudam a restaurar ecossistemas."
  },
  {
    titulo: "Impacto das Mudanças Climáticas nas Florestas",
    pergunta: `As mudanças climáticas representam um grande desafio para as florestas em todo o mundo. Qual é uma das consequências das mudanças climáticas nas florestas?`,
    opcoes: [
      { id: 1, texto: "Aumento na biodiversidade" },
      { id: 2, texto: "Redução da frequência de incêndios" },
      { id: 3, texto: "Aumento das pragas e doenças" },
      { id: 4, texto: "Aumento na produção de madeira" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Mudanças Climáticas", "Conservação da Biodiversidade"],
    fontes: [
      "1. Santos, P. (2022). Mudanças Climáticas e Florestas.",
      "2. Araújo, E. (2021). Impactos Climáticos na Biodiversidade Florestal."
    ],
    vantagem: "Ganhe 4 pontos de adaptação!",
    desvantagem: "Perde 3 pontos de adaptação.",
    dica: "As mudanças climáticas frequentemente aumentam as pragas."
  },
  {
    titulo: "Resiliência das Florestas aos Incêndios",
    pergunta: `A resiliência das florestas a incêndios é crucial para sua sustentabilidade. Qual é uma prática que aumenta a resiliência das florestas aos incêndios?`,
    opcoes: [
      { id: 1, texto: "Aumentar a quantidade de combustível inflamável" },
      { id: 2, texto: "Plantio de espécies nativas adaptadas ao fogo" },
      { id: 3, texto: "Evitar qualquer tipo de queima" },
      { id: 4, texto: "Promover desmatamento seletivo" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade", "Mudanças Climáticas"],
    fontes: [
      "1. Silva, A. (2021). Estratégias de Resiliência Florestal.",
      "2. Pereira, M. (2020). Incêndios Florestais e Sustentabilidade."
    ],
    vantagem: "Avance 4 casas com proteção contra incêndios!",
    desvantagem: "Perde 2 pontos de resiliência.",
    dica: "Espécies adaptadas ao fogo aumentam a resiliência."
  },
  {
    titulo: "Tecnologia em Monitoramento Florestal",
    pergunta: `Qual tecnologia é amplamente utilizada para monitorar florestas e detectar mudanças no uso do solo?
    
    <img src="/11.png" alt="Monitoramento Florestal" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Sensores de solo" },
      { id: 2, texto: "Sensoriamento remoto por satélites" },
      { id: 3, texto: "Observação a olho nu" },
      { id: 4, texto: "Análise de temperatura" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Tecnologia Florestal", "Monitoramento"],
    fontes: [
      "1. Carvalho, R. (2023). Tecnologias de Monitoramento Florestal."
    ],
    vantagem: "Ganhe 2 pontos de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "Sensoriamento remoto é essencial para monitoramento de larga escala."
  },
  {
    titulo: "Importância da Restauração Florestal",
    pergunta: `Qual é o objetivo principal da restauração florestal?`,
    opcoes: [
      { id: 1, texto: "Aumento do desmatamento" },
      { id: 2, texto: "Conservação da biodiversidade" },
      { id: 3, texto: "Expansão de monoculturas" },
      { id: 4, texto: "Redução da fertilidade do solo" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Costa, R. (2023). Práticas de Restauração Florestal."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "A restauração florestal visa conservar a biodiversidade."
  },
  {
    titulo: "Efeitos do Desmatamento",
    pergunta: `Qual é um dos principais efeitos do desmatamento desenfreado?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Redução de habitats naturais" },
      { id: 3, texto: "Melhoria na qualidade do ar" },
      { id: 4, texto: "Aumento da resiliência florestal" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Desmatamento", "Biodiversidade"],
    fontes: [
      "1. Sousa, P. (2023). Impactos do Desmatamento nas Florestas."
    ],
    vantagem: "Ganhe 2 pontos de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "O desmatamento leva à perda de habitats naturais."
  },
  {
    titulo: "Controle de Espécies Invasoras",
    pergunta: `Qual é uma prática eficaz para controlar espécies invasoras em florestas?`,
    opcoes: [
      { id: 1, texto: "Uso de pesticidas em larga escala" },
      { id: 2, texto: "Introdução de predadores naturais" },
      { id: 3, texto: "Desmatamento completo" },
      { id: 4, texto: "Ignorar a presença de invasoras" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação", "Manejo Florestal"],
    fontes: [
      "1. Almeida, F. (2023). Controle de Espécies Invasoras em Florestas."
    ],
    vantagem: "Ganhe 2 pontos de manejo!",
    desvantagem: "Perde 1 ponto de manejo.",
    dica: "Predadores naturais ajudam a controlar espécies invasoras."
  },
  {
    titulo: "Desafios do Desenvolvimento Sustentável",
    pergunta: `O desenvolvimento sustentável busca equilibrar o crescimento econômico, a proteção ambiental e a equidade social. Qual é um dos principais desafios do desenvolvimento sustentável em relação às florestas?
    
    <img src="/10.jpg" alt="Desenvolvimento Sustentável" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Aumento do desmatamento" },
      { id: 2, texto: "Conservação da biodiversidade" },
      { id: 3, texto: "Incentivo ao reflorestamento" },
      { id: 4, texto: "Uso sustentável de recursos" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Desenvolvimento Sustentável", "Manejo Florestal"],
    fontes: [
      "1. Souza, M. (2021). Desafios do Desenvolvimento Sustentável.",
      "2. Rocha, F. (2020). Sustentabilidade e Gestão Florestal."
    ],
    vantagem: "Avance 4 casas no tabuleiro!",
    desvantagem: "Volte 2 casas no tabuleiro.",
    dica: "O desmatamento é um desafio constante."
  },
  {
    titulo: "Benefícios da Agrofloresta",
    pergunta: `A agrofloresta combina práticas agrícolas e florestais para benefícios mútuos. Qual é um dos benefícios da agrofloresta?
    
    <img src="/20.png" alt="Agrofloresta" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Redução da fertilidade do solo" },
      { id: 2, texto: "Aumento do sequestro de carbono" },
      { id: 3, texto: "Diminuição da biodiversidade" },
      { id: 4, texto: "Maior uso de pesticidas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Soluções Baseadas na Natureza", "Silvicultura"],
    fontes: [
      "1. Lima, G. (2021). Benefícios da Agrofloresta.",
      "2. Santos, P. (2020). Agrofloresta e Desenvolvimento Sustentável."
    ],
    vantagem: "Ganhe um bônus de agrofloresta!",
    desvantagem: "Perde 1 ponto de agrofloresta.",
    dica: "A agrofloresta aumenta o sequestro de carbono."
  },
  {
    titulo: "Importância dos Corredores Ecológicos",
    pergunta: `Os corredores ecológicos são essenciais para a conectividade de habitats. Como eles beneficiam a biodiversidade?
    
    <img src="/18.png" alt="Corredores Ecológicos" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Aumentando o isolamento de populações" },
      { id: 2, texto: "Facilitando o fluxo gênico e a dispersão" },
      { id: 3, texto: "Reduzindo a conectividade entre habitats" },
      { id: 4, texto: "Promovendo a extinção de espécies" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade", "Soluções Baseadas na Natureza"],
    fontes: [
      "1. Martins, A. (2021). Corredores Ecológicos e Biodiversidade.",
      "2. Souza, G. (2020). Conectividade de Habitats e Conservação."
    ],
    vantagem: "Avance 3 casas com os corredores ecológicos!",
    desvantagem: "Perde 2 pontos de conectividade.",
    dica: "Os corredores facilitam o fluxo gênico entre populações."
  },
  {
    titulo: "Restauração Ecológica",
    pergunta: `Qual é o principal objetivo da restauração ecológica?`,
    opcoes: [
      { id: 1, texto: "Destruir habitats" },
      { id: 2, texto: "Recuperar a biodiversidade" },
      { id: 3, texto: "Aumentar a poluição" },
      { id: 4, texto: "Reduzir a diversidade" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Silva, T. (2023). Práticas de Restauração Ecológica."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "A restauração visa recuperar a biodiversidade perdida."
  },
  {
    titulo: "Tecnologia em Silvicultura",
    pergunta: `Qual é um exemplo de tecnologia usada na silvicultura digital?`,
    opcoes: [
      { id: 1, texto: "Análise de big data" },
      { id: 2, texto: "Uso exclusivo de métodos tradicionais" },
      { id: 3, texto: "Desmatamento intensivo" },
      { id: 4, texto: "Exclusão de comunidades locais" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Gomes, D. (2020). Inovações na Silvicultura Digital."
    ],
    vantagem: "Avance 2 casas com a ajuda da tecnologia!",
    desvantagem: "Perde 1 ponto de inovação.",
    dica: "Big data é uma tecnologia-chave na silvicultura digital."
  },
  {
    titulo: "Gestão de Riscos em Áreas Florestais",
    pergunta: `Qual é uma abordagem eficaz para a gestão de riscos florestais?`,
    opcoes: [
      { id: 1, texto: "Ignorar os riscos naturais" },
      { id: 2, texto: "Uso de tecnologias de monitoramento" },
      { id: 3, texto: "Aumento do desmatamento" },
      { id: 4, texto: "Expansão das áreas urbanas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Mudanças Climáticas"],
    fontes: [
      "1. Almeida, N. (2021). Gestão de Riscos em Florestas."
    ],
    vantagem: "Receba um bônus de gestão de riscos!",
    desvantagem: "Perde 1 ponto de risco.",
    dica: "As tecnologias de monitoramento são essenciais."
  },
  {
    titulo: "Benefícios da Agrofloresta",
    pergunta: `Qual é um dos benefícios da agrofloresta?`,
    opcoes: [
      { id: 1, texto: "Redução da fertilidade do solo" },
      { id: 2, texto: "Aumento do sequestro de carbono" },
      { id: 3, texto: "Diminuição da biodiversidade" },
      { id: 4, texto: "Maior uso de pesticidas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Soluções Baseadas na Natureza", "Silvicultura"],
    fontes: [
      "1. Lima, G. (2021). Benefícios da Agrofloresta.",
      "2. Santos, P. (2020). Agrofloresta e Desenvolvimento Sustentável."
    ],
    vantagem: "Ganhe um bônus de agrofloresta!",
    desvantagem: "Perde 1 ponto de agrofloresta.",
    dica: "A agrofloresta aumenta o sequestro de carbono."
  },
  {
    titulo: "Conservação de Florestas Urbanas",
    pergunta: `Qual é uma estratégia eficaz para conservar florestas urbanas?
    
    <img src="/13.png" alt="Florestas Urbanas" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Expansão da infraestrutura urbana" },
      { id: 2, texto: "Uso de espécies exóticas" },
      { id: 3, texto: "Gestão participativa e planejamento" },
      { id: 4, texto: "Redução dos espaços verdes" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Moreira, V. (2021). Estratégias para Florestas Urbanas.",
      "2. Costa, N. (2020). Conservação Urbana e Sustentabilidade."
    ],
    vantagem: "Ganhe 3 pontos de urbanismo!",
    desvantagem: "Perde 2 pontos de urbanismo.",
    dica: "O planejamento participativo é vital na conservação urbana."
  },
  {
    titulo: "Impacto das Pragas nas Florestas",
    pergunta: `As pragas podem ter um impacto devastador nas florestas. Qual é uma estratégia eficaz para controlar pragas florestais?`,
    opcoes: [
      { id: 1, texto: "Uso exclusivo de pesticidas químicos" },
      { id: 2, texto: "Monitoramento contínuo e manejo integrado" },
      { id: 3, texto: "Destruição de habitats naturais" },
      { id: 4, texto: "Expansão de monoculturas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade", "Manejo Florestal"],
    fontes: [
      "1. Costa, L. (2020). Controle de Pragas Florestais.",
      "2. Almeida, R. (2021). Estratégias Sustentáveis contra Pragas."
    ],
    vantagem: "Receba um bônus de controle de pragas!",
    desvantagem: "Perde 1 ponto de controle de pragas.",
    dica: "O manejo integrado é uma abordagem eficaz."
  },
  {
    titulo: "Gestão de Resíduos Florestais",
    pergunta: `Qual é uma prática sustentável para o manejo de resíduos florestais?`,
    opcoes: [
      { id: 1, texto: "Queima descontrolada" },
      { id: 2, texto: "Compostagem de resíduos" },
      { id: 3, texto: "Descarte em rios" },
      { id: 4, texto: "Expansão de aterros sanitários" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Gestão de Resíduos", "Silvicultura"],
    fontes: [
      "1. Silva, M. (2022). Gestão Sustentável de Resíduos Florestais.",
      "2. Pereira, J. (2021). Manejo de Resíduos na Silvicultura."
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de sustentabilidade.",
    dica: ""
  },
  {
    titulo: "Importância da Cobertura do Solo",
    pergunta: `Qual é o principal benefício da cobertura do solo nas florestas?`,
    opcoes: [
      { id: 1, texto: "Reduzir a erosão do solo" },
      { id: 2, texto: "Aumentar a temperatura do solo" },
      { id: 3, texto: "Reduzir a biodiversidade" },
      { id: 4, texto: "Aumentar a erosão do solo" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Conservação do Solo", "Manejo Florestal"],
    fontes: [
      "1. Silva, J. (2023). Gestão de Solos Florestais.",
      "2. Pereira, M. (2022). Técnicas de Cobertura do Solo."
    ],
    vantagem: "Ganhe 1 ponto de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: ""
  },
  {
    titulo: "Recuperação de Áreas Degradadas",
    pergunta: `A recuperação de áreas degradadas é um componente vital da restauração ecológica. Qual é uma técnica eficaz para recuperar áreas degradadas?
    
    <img src="/7.jpg" alt="Recuperação de Áreas" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Uso de herbicidas químicos" },
      { id: 2, texto: "Estabilização do solo" },
      { id: 3, texto: "Desmatamento seletivo" },
      { id: 4, texto: "Plantio de espécies exóticas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Recuperação de Áreas Degradadas", "Soluções Baseadas na Natureza"],
    fontes: [
      "1. Sousa, H. (2019). Técnicas de Recuperação de Áreas Degradadas.",
      "2. Martins, F. (2020). Estratégias para a Restauração Ecológica."
    ],
    vantagem: "Receba uma carta de recuperação!",
    desvantagem: "Perca 2 pontos de recuperação.",
    dica: "A estabilização do solo é uma técnica-chave."
  },
  {
    titulo: "Princípios de Silvicultura Sustentável",
    pergunta: `A silvicultura sustentável é a prática de gerenciar florestas para manter sua saúde e produtividade a longo prazo. Qual é um dos princípios da silvicultura sustentável?
    
    <img src="/9.jpg" alt="Silvicultura Sustentável" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Maximizar a produção de madeira" },
      { id: 2, texto: "Desmatamento em larga escala" },
      { id: 3, texto: "Promoção da biodiversidade" },
      { id: 4, texto: "Uso intensivo de fertilizantes" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Silvicultura", "Desenvolvimento Sustentável"],
    fontes: [
      "1. Oliveira, L. (2019). Princípios de Silvicultura Sustentável.",
      "2. Ferreira, J. (2020). Silvicultura e Gestão Sustentável."
    ],
    vantagem: "Receba um certificado de sustentabilidade!",
    desvantagem: "Perca 2 pontos de silvicultura.",
    dica: "A biodiversidade é central na silvicultura sustentável."
  },
  {
    titulo: "Tecnologia LiDAR em Silvicultura",
    pergunta: `O uso de LiDAR (Light Detection and Ranging) na silvicultura tem revolucionado o inventário florestal. Como essa tecnologia é usada para medir a densidade da floresta?
    
    <img src="/4.jpg" alt="Tecnologia LiDAR" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Através de fotografias aéreas" },
      { id: 2, texto: "Com sensores de solo" },
      { id: 3, texto: "Usando pulsos de laser" },
      { id: 4, texto: "Por satélites de alta resolução" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Lima, M. (2020). Aplicações de LiDAR na Silvicultura.",
      "2. Ferreira, S. (2021). LiDAR e a Revolução do Inventário Florestal."
    ],
    vantagem: "Receba um bônus de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "LiDAR utiliza pulsos de laser para medir a densidade."
  },
  {
    titulo: "Biodiversidade em Florestas Tropicais",
    pergunta: `As florestas tropicais são conhecidas por sua biodiversidade rica e única. Qual é um dos principais fatores que contribui para a alta biodiversidade nas florestas tropicais?
    
    <img src="/3.jpg" alt="Florestas Tropicais" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Clima temperado" },
      { id: 2, texto: "Altas taxas de precipitação" },
      { id: 3, texto: "Solo pobre em nutrientes" },
      { id: 4, texto: "Baixa densidade de árvores" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade"],
    fontes: [
      "1. Costa, L. (2022). Biodiversidade nas Florestas Tropicais.",
      "2. Mendes, R. (2019). Ecologia das Florestas Tropicais."
    ],
    vantagem: "Avance 1 casa e ganhe uma dica extra!",
    desvantagem: "Volte 2 casas no tabuleiro.",
    dica: "As florestas tropicais são conhecidas por seu clima úmido."
  },
  {
    titulo: "Importância das APPs",
    pergunta: `Qual é o principal benefício das Áreas de Proteção Permanente (APPs)?`,
    opcoes: [
      { id: 1, texto: "Reduzir a biodiversidade" },
      { id: 2, texto: "Proteger cursos d'água" },
      { id: 3, texto: "Aumentar a poluição" },
      { id: 4, texto: "Diminuição da fauna" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação", "Silvicultura"],
    fontes: [
      "1. Santos, C. (2023). Importância das APPs.",
      "2. Lima, G. (2022). Áreas de Proteção Permanente."
    ],
    vantagem: "Ganhe 2 pontos de proteção!",
    desvantagem: "Perde 1 ponto de proteção.",
    dica: ""
  },
  {
    titulo: "Educação Ambiental",
    pergunta: `Como a educação ambiental pode ajudar a proteger as florestas?`,
    opcoes: [
      { id: 1, texto: "Promovendo o uso de pesticidas" },
      { id: 2, texto: "Aumentando o desmatamento" },
      { id: 3, texto: "Conscientizando sobre a conservação" },
      { id: 4, texto: "Incentivando a monocultura" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Andrade, R. (2021). Educação Ambiental e Florestas.",
      "2. Silva, P. (2020). Conscientização e Conservação Florestal."
    ],
    vantagem: "Ganhe 2 pontos de educação!",
    desvantagem: "Perca 1 ponto de educação.",
    dica: "A educação ambiental é vital para a conservação."
  },
  {
    titulo: "Recuperação de Ecossistemas",
    pergunta: `Qual é a principal meta da recuperação de ecossistemas?`,
    opcoes: [
      { id: 1, texto: "Expansão urbana" },
      { id: 2, texto: "Recuperação da biodiversidade" },
      { id: 3, texto: "Aumento de monoculturas" },
      { id: 4, texto: "Destruição de habitats" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Costa, R. (2022). Restauração de Ecossistemas.",
      "2. Almeida, F. (2023). Recuperação Ecológica de Paisagens."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "A restauração visa recuperar a biodiversidade perdida."
  },
  {
    titulo: "Impacto do Desmatamento",
    pergunta: `Qual é uma consequência do desmatamento desenfreado?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Redução de habitats" },
      { id: 3, texto: "Melhoria na qualidade do ar" },
      { id: 4, texto: "Aumento da resiliência florestal" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Desmatamento", "Biodiversidade"],
    fontes: [
      "1. Sousa, P. (2023). Impactos do Desmatamento.",
      "2. Martins, J. (2022). Consequências do Desmatamento."
    ],
    vantagem: "Ganhe 2 pontos de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: ""
  },
  {
    titulo: "Tecnologia em Monitoramento Florestal",
    pergunta: `Qual tecnologia é amplamente utilizada para monitorar florestas e detectar mudanças no uso do solo?
    
    <img src="/11.png" alt="Monitoramento Florestal" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Sensores de solo" },
      { id: 2, texto: "Sensoriamento remoto por satélites" },
      { id: 3, texto: "Observação a olho nu" },
      { id: 4, texto: "Análise de temperatura" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Tecnologia Florestal", "Monitoramento"],
    fontes: [
      "1. Carvalho, R. (2023). Tecnologias de Monitoramento Florestal.",
      "2. Souza, E. (2022). Uso de Satélites em Florestas."
    ],
    vantagem: "Ganhe 2 pontos de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "Sensoriamento remoto é essencial para monitoramento de larga escala."
  },
  {
    titulo: "Recuperação de Áreas Degradadas",
    pergunta: `Qual é uma técnica eficaz para recuperar áreas degradadas?`,
    opcoes: [
      { id: 1, texto: "Uso de herbicidas químicos" },
      { id: 2, texto: "Estabilização do solo" },
      { id: 3, texto: "Desmatamento seletivo" },
      { id: 4, texto: "Plantio de espécies exóticas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Recuperação de Áreas Degradadas", "Soluções Baseadas na Natureza"],
    fontes: [
      "1. Sousa, H. (2019). Técnicas de Recuperação de Áreas Degradadas.",
      "2. Martins, F. (2020). Estratégias para a Restauração Ecológica."
    ],
    vantagem: "Receba uma carta de recuperação!",
    desvantagem: "Perca 2 pontos de recuperação.",
    dica: "A estabilização do solo é uma técnica-chave."
  },
  {
    titulo: "Educação Ambiental em Florestas",
    pergunta: `A educação ambiental desempenha um papel crucial na conscientização sobre a conservação florestal. Como a educação ambiental pode ajudar a proteger as florestas?
    
    <img src="/8.jpg" alt="Educação Ambiental" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Promovendo o uso de pesticidas" },
      { id: 2, texto: "Aumentando o desmatamento" },
      { id: 3, texto: "Conscientizando sobre a conservação" },
      { id: 4, texto: "Incentivando a monocultura" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Andrade, R. (2021). Educação Ambiental e Florestas.",
      "2. Silva, P. (2020). Conscientização e Conservação Florestal."
    ],
    vantagem: "Ganhe 2 pontos de educação!",
    desvantagem: "Perca 1 ponto de educação.",
    dica: "A educação ambiental é vital para a conservação."
  },
  {
    titulo: "Importância das Áreas Protegidas",
    pergunta: `Qual é um dos principais benefícios das Áreas de Proteção Ambiental (APAs)?`,
    opcoes: [
      { id: 1, texto: "Desmatamento intensivo" },
      { id: 2, texto: "Proteção da biodiversidade" },
      { id: 3, texto: "Expansão da agricultura" },
      { id: 4, texto: "Uso de espécies exóticas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade", "Educação Ambiental"],
    fontes: [
      "1. Pereira, T. (2020). Benefícios das Áreas de Proteção Ambiental.",
      "2. Silva, C. (2021). Gestão de APAs e Conservação."
    ],
    vantagem: "Ganhe um bônus de conservação!",
    desvantagem: "Perde 1 ponto de proteção.",
    dica: "APAs protegem a biodiversidade e os ecossistemas."
  },
  {
    titulo: "Ciclo do Carbono",
    pergunta: `Qual é o papel das florestas no ciclo do carbono?`,
    opcoes: [
      { id: 1, texto: "Emissão de carbono" },
      { id: 2, texto: "Sequestro de carbono" },
      { id: 3, texto: "Aumento do dióxido de carbono" },
      { id: 4, texto: "Diminuição do oxigênio" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Mudanças Climáticas", "Silvicultura"],
    fontes: [
      "1. Santos, D. (2023). Florestas e o Ciclo do Carbono.",
      "2. Pereira, A. (2022). Papel das Florestas no Ciclo do Carbono."
    ],
    vantagem: "Ganhe 2 pontos de carbono!",
    desvantagem: "Perde 1 ponto de carbono.",
    dica: "As florestas ajudam a sequestrar carbono da atmosfera."
  },
  {
    titulo: "Impacto das Pragas nas Florestas",
    pergunta: `As pragas podem ter um impacto devastador nas florestas. Qual é uma estratégia eficaz para controlar pragas florestais?
    
    <img src="/15.png" alt="Controle de Pragas" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Uso exclusivo de pesticidas químicos" },
      { id: 2, texto: "Monitoramento contínuo e manejo integrado" },
      { id: 3, texto: "Destruição de habitats naturais" },
      { id: 4, texto: "Expansão de monoculturas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade", "Manejo Florestal"],
    fontes: [
      "1. Costa, L. (2020). Controle de Pragas Florestais.",
      "2. Almeida, R. (2021). Estratégias Sustentáveis contra Pragas."
    ],
    vantagem: "Receba um bônus de controle de pragas!",
    desvantagem: "Perde 1 ponto de controle de pragas.",
    dica: "O manejo integrado é uma abordagem eficaz."
  },
  {
    titulo: "Impacto das Mudanças Climáticas nas Florestas",
    pergunta: `As mudanças climáticas representam um grande desafio para as florestas em todo o mundo. Qual é uma das consequências das mudanças climáticas nas florestas?`,
    opcoes: [
      { id: 1, texto: "Aumento na biodiversidade" },
      { id: 2, texto: "Redução da frequência de incêndios" },
      { id: 3, texto: "Aumento das pragas e doenças" },
      { id: 4, texto: "Aumento na produção de madeira" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Mudanças Climáticas", "Conservação da Biodiversidade"],
    fontes: [
      "1. Santos, P. (2022). Mudanças Climáticas e Florestas.",
      "2. Araújo, E. (2021). Impactos Climáticos na Biodiversidade Florestal."
    ],
    vantagem: "Ganhe 4 pontos de adaptação!",
    desvantagem: "Perde 3 pontos de adaptação.",
    dica: "As mudanças climáticas frequentemente aumentam as pragas."
  },
  {
    titulo: "Tecnologia em Silvicultura",
    pergunta: `Qual é um exemplo de tecnologia usada na silvicultura digital?`,
    opcoes: [
      { id: 1, texto: "Análise de big data" },
      { id: 2, texto: "Uso exclusivo de métodos tradicionais" },
      { id: 3, texto: "Desmatamento intensivo" },
      { id: 4, texto: "Exclusão de comunidades locais" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Gomes, D. (2020). Inovações na Silvicultura Digital.",
      "2. Almeida, P. (2021). Tecnologia e o Futuro das Florestas."
    ],
    vantagem: "Avance 2 casas com a ajuda da tecnologia!",
    desvantagem: "Perde 1 ponto de inovação.",
    dica: "Big data é uma tecnologia-chave na silvicultura digital."
  },
  {
    titulo: "Conservação de Florestas Urbanas",
    pergunta: `Qual é uma estratégia eficaz para conservar florestas urbanas?
    
    <img src="/13.png" alt="Florestas Urbanas" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Expansão da infraestrutura urbana" },
      { id: 2, texto: "Uso de espécies exóticas" },
      { id: 3, texto: "Gestão participativa e planejamento" },
      { id: 4, texto: "Redução dos espaços verdes" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Moreira, V. (2021). Estratégias para Florestas Urbanas.",
      "2. Costa, N. (2020). Conservação Urbana e Sustentabilidade."
    ],
    vantagem: "Ganhe 3 pontos de urbanismo!",
    desvantagem: "Perde 2 pontos de urbanismo.",
    dica: "O planejamento participativo é vital na conservação urbana."
  },
  {
    titulo: "Biodiversidade em Florestas Tropicais",
    pergunta: `As florestas tropicais são conhecidas por sua biodiversidade rica e única. Qual é um dos principais fatores que contribui para a alta biodiversidade nas florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Clima temperado" },
      { id: 2, texto: "Altas taxas de precipitação" },
      { id: 3, texto: "Solo pobre em nutrientes" },
      { id: 4, texto: "Baixa densidade de árvores" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade"],
    fontes: [
      "1. Costa, L. (2022). Biodiversidade nas Florestas Tropicais.",
      "2. Mendes, R. (2019). Ecologia das Florestas Tropicais."
    ],
    vantagem: "Avance 1 casa e ganhe uma dica extra!",
    desvantagem: "Volte 2 casas no tabuleiro.",
    dica: "As florestas tropicais são conhecidas por seu clima úmido."
  },
  {
    titulo: "Benefícios das Soluções Baseadas na Natureza",
    pergunta: `Qual é um exemplo de SbN aplicado ao manejo florestal?
    
    <img src="/6.jpg" alt="Soluções Baseadas na Natureza" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Plantio de árvores exóticas" },
      { id: 2, texto: "Construção de barragens" },
      { id: 3, texto: "Criação de corredores ecológicos" },
      { id: 4, texto: "Intensificação do uso do solo" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Soluções Baseadas na Natureza", "Manejo Florestal"],
    fontes: [
      "1. Mendes, T. (2020). Soluções Baseadas na Natureza no Contexto Florestal.",
      "2. Costa, J. (2021). SbN e o Futuro das Florestas."
    ],
    vantagem: "Avance 3 casas com a ajuda da natureza!",
    desvantagem: "Perde 1 ponto de SbN.",
    dica: "Corredores ecológicos são um exemplo de SbN."
  },
  {
    titulo: "Gestão de Resíduos Florestais",
    pergunta: `Qual é uma prática sustentável para o manejo de resíduos florestais?`,
    opcoes: [
      { id: 1, texto: "Queima descontrolada" },
      { id: 2, texto: "Compostagem de resíduos" },
      { id: 3, texto: "Descarte em rios" },
      { id: 4, texto: "Expansão de aterros sanitários" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Gestão de Resíduos", "Silvicultura"],
    fontes: [
      "1. Silva, M. (2022). Gestão Sustentável de Resíduos Florestais.",
      "2. Pereira, J. (2021). Manejo de Resíduos na Silvicultura."
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de sustentabilidade.",
    dica: ""
  },
  {
    titulo: "Educação Ambiental",
    pergunta: `Como a educação ambiental pode ajudar a proteger as florestas?`,
    opcoes: [
      { id: 1, texto: "Promovendo o uso de pesticidas" },
      { id: 2, texto: "Aumentando o desmatamento" },
      { id: 3, texto: "Conscientizando sobre a conservação" },
      { id: 4, texto: "Incentivando a monocultura" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Andrade, R. (2021). Educação Ambiental e Florestas.",
      "2. Silva, P. (2020). Conscientização e Conservação Florestal."
    ],
    vantagem: "Ganhe 2 pontos de educação!",
    desvantagem: "Perca 1 ponto de educação.",
    dica: "A educação ambiental é vital para a conservação."
  },
  {
    titulo: "Conservação de Espécies",
    pergunta: `Qual é uma estratégia eficaz para a conservação de espécies ameaçadas?`,
    opcoes: [
      { id: 1, texto: "Destruição de habitats" },
      { id: 2, texto: "Criação de reservas naturais" },
      { id: 3, texto: "Aumento da caça" },
      { id: 4, texto: "Introdução de espécies invasoras" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação", "Biodiversidade"],
    fontes: [
      "1. Lima, S. (2023). Estratégias de Conservação de Espécies.",
      "2. Oliveira, A. (2022). Preservação da Biodiversidade."
    ],
    vantagem: "Ganhe 2 pontos de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "Reservas naturais são eficazes na conservação de espécies ameaçadas."
  },
  {
    titulo: "Recuperação de Ecossistemas",
    pergunta: `Qual é a principal meta da recuperação de ecossistemas?`,
    opcoes: [
      { id: 1, texto: "Expansão urbana" },
      { id: 2, texto: "Recuperação da biodiversidade" },
      { id: 3, texto: "Aumento de monoculturas" },
      { id: 4, texto: "Destruição de habitats" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Costa, R. (2022). Restauração de Ecossistemas.",
      "2. Almeida, F. (2023). Recuperação Ecológica de Paisagens."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "A restauração visa recuperar a biodiversidade perdida."
  },
  {
    titulo: "Princípios de Silvicultura Sustentável",
    pergunta: `A silvicultura sustentável é a prática de gerenciar florestas para manter sua saúde e produtividade a longo prazo. Qual é um dos princípios da silvicultura sustentável?
    
    <img src="/9.jpg" alt="Silvicultura Sustentável" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Maximizar a produção de madeira" },
      { id: 2, texto: "Desmatamento em larga escala" },
      { id: 3, texto: "Promoção da biodiversidade" },
      { id: 4, texto: "Uso intensivo de fertilizantes" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Silvicultura", "Desenvolvimento Sustentável"],
    fontes: [
      "1. Oliveira, L. (2019). Princípios de Silvicultura Sustentável.",
      "2. Ferreira, J. (2020). Silvicultura e Gestão Sustentável."
    ],
    vantagem: "Receba um certificado de sustentabilidade!",
    desvantagem: "Perca 2 pontos de silvicultura.",
    dica: "A biodiversidade é central na silvicultura sustentável."
  },
  {
    titulo: "Ciclo do Carbono",
    pergunta: `Qual é o papel das florestas no ciclo do carbono?`,
    opcoes: [
      { id: 1, texto: "Emissão de carbono" },
      { id: 2, texto: "Sequestro de carbono" },
      { id: 3, texto: "Aumento do dióxido de carbono" },
      { id: 4, texto: "Diminuição do oxigênio" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Mudanças Climáticas", "Silvicultura"],
    fontes: [
      "1. Santos, D. (2023). Florestas e o Ciclo do Carbono.",
      "2. Pereira, A. (2022). Papel das Florestas no Ciclo do Carbono."
    ],
    vantagem: "Ganhe 2 pontos de carbono!",
    desvantagem: "Perde 1 ponto de carbono.",
    dica: "As florestas ajudam a sequestrar carbono da atmosfera."
  },
  {
    titulo: "Conservação de Florestas Urbanas",
    pergunta: `Qual é uma estratégia eficaz para conservar florestas urbanas?
    
    <img src="/13.png" alt="Florestas Urbanas" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Expansão da infraestrutura urbana" },
      { id: 2, texto: "Uso de espécies exóticas" },
      { id: 3, texto: "Gestão participativa e planejamento" },
      { id: 4, texto: "Redução dos espaços verdes" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Moreira, V. (2021). Estratégias para Florestas Urbanas.",
      "2. Costa, N. (2020). Conservação Urbana e Sustentabilidade."
    ],
    vantagem: "Ganhe 3 pontos de urbanismo!",
    desvantagem: "Perde 2 pontos de urbanismo.",
    dica: "O planejamento participativo é vital na conservação urbana."
  },
  {
    titulo: "Inovações na Silvicultura Digital",
    pergunta: `Qual é um exemplo de tecnologia usada na silvicultura digital?`,
    opcoes: [
      { id: 1, texto: "Análise de big data" },
      { id: 2, texto: "Uso exclusivo de métodos tradicionais" },
      { id: 3, texto: "Desmatamento intensivo" },
      { id: 4, texto: "Exclusão de comunidades locais" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Gomes, D. (2020). Inovações na Silvicultura Digital.",
      "2. Almeida, P. (2021). Tecnologia e o Futuro das Florestas."
    ],
    vantagem: "Avance 2 casas com a ajuda da tecnologia!",
    desvantagem: "Perde 1 ponto de inovação.",
    dica: "Big data é uma tecnologia-chave na silvicultura digital."
  },
  {
    titulo: "Conservação de Florestas Urbanas",
    pergunta: `Qual é uma estratégia eficaz para conservar florestas urbanas?
    
    <img src="/13.png" alt="Florestas Urbanas" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Expansão da infraestrutura urbana" },
      { id: 2, texto: "Uso de espécies exóticas" },
      { id: 3, texto: "Gestão participativa e planejamento" },
      { id: 4, texto: "Redução dos espaços verdes" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Moreira, V. (2021). Estratégias para Florestas Urbanas.",
      "2. Costa, N. (2020). Conservação Urbana e Sustentabilidade."
    ],
    vantagem: "Ganhe 3 pontos de urbanismo!",
    desvantagem: "Perde 2 pontos de urbanismo.",
    dica: "O planejamento participativo é vital na conservação urbana."
  },
  {
    titulo: "Princípios de Silvicultura Sustentável",
    pergunta: `A silvicultura sustentável é a prática de gerenciar florestas para manter sua saúde e produtividade a longo prazo. Qual é um dos princípios da silvicultura sustentável?`,
    opcoes: [
      { id: 1, texto: "Maximizar a produção de madeira" },
      { id: 2, texto: "Desmatamento em larga escala" },
      { id: 3, texto: "Promoção da biodiversidade" },
      { id: 4, texto: "Uso intensivo de fertilizantes" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Silvicultura", "Desenvolvimento Sustentável"],
    fontes: [
      "1. Oliveira, L. (2019). Princípios de Silvicultura Sustentável.",
      "2. Ferreira, J. (2020). Silvicultura e Gestão Sustentável."
    ],
    vantagem: "Receba um certificado de sustentabilidade!",
    desvantagem: "Perca 2 pontos de silvicultura.",
    dica: "A biodiversidade é central na silvicultura sustentável."
  },
  {
    titulo: "Resiliência das Florestas aos Incêndios",
    pergunta: `A resiliência das florestas a incêndios é crucial para sua sustentabilidade. Qual é uma prática que aumenta a resiliência das florestas aos incêndios?
    
    <img src="/14.png" alt="Resiliência a Incêndios" class="img-pequena my-4" />`,
    opcoes: [
      { id: 1, texto: "Aumentar a quantidade de combustível inflamável" },
      { id: 2, texto: "Plantio de espécies nativas adaptadas ao fogo" },
      { id: 3, texto: "Evitar qualquer tipo de queima" },
      { id: 4, texto: "Promover desmatamento seletivo" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade", "Mudanças Climáticas"],
    fontes: [
      "1. Silva, A. (2021). Estratégias de Resiliência Florestal.",
      "2. Pereira, M. (2020). Incêndios Florestais e Sustentabilidade."
    ],
    vantagem: "Avance 4 casas com proteção contra incêndios!",
    desvantagem: "Perde 2 pontos de resiliência.",
    dica: "Espécies adaptadas ao fogo aumentam a resiliência."
  },
  {
    titulo: "Educação Ambiental",
    pergunta: `Como a educação ambiental pode ajudar a proteger as florestas?`,
    opcoes: [
      { id: 1, texto: "Promovendo o uso de pesticidas" },
      { id: 2, texto: "Aumentando o desmatamento" },
      { id: 3, texto: "Conscientizando sobre a conservação" },
      { id: 4, texto: "Incentivando a monocultura" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Andrade, R. (2021). Educação Ambiental e Florestas.",
      "2. Silva, P. (2020). Conscientização e Conservação Florestal."
    ],
    vantagem: "Ganhe 2 pontos de educação!",
    desvantagem: "Perca 1 ponto de educação.",
    dica: "A educação ambiental é vital para a conservação."
  },
  {
    titulo: "Tecnologia em Monitoramento Florestal",
    pergunta: `Qual tecnologia é amplamente utilizada para monitorar florestas e detectar mudanças no uso do solo?`,
    opcoes: [
      { id: 1, texto: "Sensores de solo" },
      { id: 2, texto: "Sensoriamento remoto por satélites" },
      { id: 3, texto: "Observação a olho nu" },
      { id: 4, texto: "Análise de temperatura" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Tecnologia Florestal", "Monitoramento"],
    fontes: [
      "1. Carvalho, R. (2023). Tecnologias de Monitoramento Florestal.",
      "2. Souza, E. (2022). Uso de Satélites em Florestas."
    ],
    vantagem: "Ganhe 2 pontos de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "Sensoriamento remoto é essencial para monitoramento de larga escala."
  },
  {
    titulo: "Educação Ambiental em Florestas",
    pergunta: `A educação ambiental desempenha um papel crucial na conscientização sobre a conservação florestal. Como a educação ambiental pode ajudar a proteger as florestas?
    
    <img src="/8.jpg" alt="Educação Ambiental" class="img-media my-4" />`,
    opcoes: [
      { id: 1, texto: "Promovendo o uso de pesticidas" },
      { id: 2, texto: "Aumentando o desmatamento" },
      { id: 3, texto: "Conscientizando sobre a conservação" },
      { id: 4, texto: "Incentivando a monocultura" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Educação Ambiental", "Conservação da Biodiversidade"],
    fontes: [
      "1. Andrade, R. (2021). Educação Ambiental e Florestas.",
      "2. Silva, P. (2020). Conscientização e Conservação Florestal."
    ],
    vantagem: "Ganhe 2 pontos de educação!",
    desvantagem: "Perca 1 ponto de educação.",
    dica: "A educação ambiental é vital para a conservação."
  },
  {
    titulo: "Impacto das Pragas nas Florestas",
    pergunta: `As pragas podem ter um impacto devastador nas florestas. Qual é uma estratégia eficaz para controlar pragas florestais?
    
    <img src="/15.png" alt="Controle de Pragas" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Uso exclusivo de pesticidas químicos" },
      { id: 2, texto: "Monitoramento contínuo e manejo integrado" },
      { id: 3, texto: "Destruição de habitats naturais" },
      { id: 4, texto: "Expansão de monoculturas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação da Biodiversidade", "Manejo Florestal"],
    fontes: [
      "1. Costa, L. (2020). Controle de Pragas Florestais.",
      "2. Almeida, R. (2021). Estratégias Sustentáveis contra Pragas."
    ],
    vantagem: "Receba um bônus de controle de pragas!",
    desvantagem: "Perde 1 ponto de controle de pragas.",
    dica: "O manejo integrado é uma abordagem eficaz."
  },
  {
    titulo: "Inovações na Silvicultura Digital",
    pergunta: `Qual é um exemplo de tecnologia usada na silvicultura digital?`,
    opcoes: [
      { id: 1, texto: "Análise de big data" },
      { id: 2, texto: "Uso exclusivo de métodos tradicionais" },
      { id: 3, texto: "Desmatamento intensivo" },
      { id: 4, texto: "Exclusão de comunidades locais" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Gomes, D. (2020). Inovações na Silvicultura Digital.",
      "2. Almeida, P. (2021). Tecnologia e o Futuro das Florestas."
    ],
    vantagem: "Avance 2 casas com a ajuda da tecnologia!",
    desvantagem: "Perde 1 ponto de inovação.",
    dica: "Big data é uma tecnologia-chave na silvicultura digital."
  },
  {
    titulo: "Impacto do Desmatamento",
    pergunta: `Qual é uma consequência do desmatamento desenfreado?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Redução de habitats" },
      { id: 3, texto: "Melhoria na qualidade do ar" },
      { id: 4, texto: "Aumento da resiliência florestal" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Desmatamento", "Biodiversidade"],
    fontes: [
      "1. Sousa, P. (2023). Impactos do Desmatamento.",
      "2. Martins, J. (2022). Consequências do Desmatamento."
    ],
    vantagem: "Ganhe 2 pontos de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: ""
  },
  {
    titulo: "Restauração de Paisagens",
    pergunta: `Qual é o objetivo principal da restauração de paisagens florestais?`,
    opcoes: [
      { id: 1, texto: "Aumento do desmatamento" },
      { id: 2, texto: "Recuperação da funcionalidade ecológica" },
      { id: 3, texto: "Redução da biodiversidade" },
      { id: 4, texto: "Expansão de áreas urbanas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Costa, P. (2023). Restauração de Paisagens Florestais.",
      "2. Lima, G. (2022). Estratégias de Restauração Ecológica."
    ],
    vantagem: "Ganhe 2 pontos de restauração!",
    desvantagem: "Perde 1 ponto de restauração.",
    dica: "A restauração visa recuperar a funcionalidade ecológica."
  },
  {
    titulo: "Benefícios do Ecoturismo",
    pergunta: `Qual é um dos benefícios do ecoturismo para as florestas?`,
    opcoes: [
      { id: 1, texto: "Destruição de habitats" },
      { id: 2, texto: "Geração de renda sustentável" },
      { id: 3, texto: "Aumento do desmatamento" },
      { id: 4, texto: "Redução da biodiversidade" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Ecoturismo", "Conservação"],
    fontes: [
      "1. Lima, T. (2023). Benefícios do Ecoturismo para as Florestas.",
      "2. Oliveira, S. (2022). Ecoturismo e Conservação Florestal."
    ],
    vantagem: "Ganhe 2 pontos de ecoturismo!",
    desvantagem: "Perde 1 ponto de ecoturismo.",
    dica: "O ecoturismo gera renda sustentável e promove a conservação."
  },
  {
    titulo: "Conservação de Espécies",
    pergunta: `Qual é uma estratégia eficaz para a conservação de espécies ameaçadas?`,
    opcoes: [
      { id: 1, texto: "Destruição de habitats" },
      { id: 2, texto: "Criação de reservas naturais" },
      { id: 3, texto: "Aumento da caça" },
      { id: 4, texto: "Introdução de espécies invasoras" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Conservação", "Biodiversidade"],
    fontes: [
      "1. Lima, S. (2023). Estratégias de Conservação de Espécies.",
      "2. Oliveira, A. (2022). Preservação da Biodiversidade."
    ],
    vantagem: "Ganhe 2 pontos de conservação!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "Reservas naturais são eficazes na conservação de espécies ameaçadas."
  },
  {
    titulo: "Tecnologia LiDAR em Silvicultura",
    pergunta: `O uso de LiDAR (Light Detection and Ranging) na silvicultura tem revolucionado o inventário florestal. Como essa tecnologia é usada para medir a densidade da floresta?
    
    <img src="/4.jpg" alt="Tecnologia LiDAR" class="img-grande my-4" />`,
    opcoes: [
      { id: 1, texto: "Através de fotografias aéreas" },
      { id: 2, texto: "Com sensores de solo" },
      { id: 3, texto: "Usando pulsos de laser" },
      { id: 4, texto: "Por satélites de alta resolução" }
    ],
    respostaCorreta: 3,
    dificuldade: "normal",
    categorias: ["Tecnologia em Florestas", "Silvicultura"],
    fontes: [
      "1. Lima, M. (2020). Aplicações de LiDAR na Silvicultura.",
      "2. Ferreira, S. (2021). LiDAR e a Revolução do Inventário Florestal."
    ],
    vantagem: "Receba um bônus de tecnologia!",
    desvantagem: "Perde 1 ponto de tecnologia.",
    dica: "LiDAR utiliza pulsos de laser para medir a densidade."
  },
  {
    titulo: "Desafios do Desenvolvimento Sustentável",
    pergunta: `O desenvolvimento sustentável busca equilibrar o crescimento econômico, a proteção ambiental e a equidade social. Qual é um dos principais desafios do desenvolvimento sustentável em relação às florestas?`,
    opcoes: [
      { id: 1, texto: "Aumento do desmatamento" },
      { id: 2, texto: "Conservação da biodiversidade" },
      { id: 3, texto: "Incentivo ao reflorestamento" },
      { id: 4, texto: "Uso sustentável de recursos" }
    ],
    respostaCorreta: 1,
    dificuldade: "normal",
    categorias: ["Desenvolvimento Sustentável", "Manejo Florestal"],
    fontes: [
      "1. Souza, M. (2021). Desafios do Desenvolvimento Sustentável.",
      "2. Rocha, F. (2020). Sustentabilidade e Gestão Florestal."
    ],
    vantagem: "Avance 4 casas no tabuleiro!",
    desvantagem: "Volte 2 casas no tabuleiro.",
    dica: "O desmatamento é um desafio constante."
  },
  {
    titulo: "Princípios de Gestão Florestal",
    pergunta: `Qual é um dos princípios da gestão florestal sustentável?`,
    opcoes: [
      { id: 1, texto: "Desmatamento irrestrito" },
      { id: 2, texto: "Uso responsável de recursos" },
      { id: 3, texto: "Redução da biodiversidade" },
      { id: 4, texto: "Expansão de monoculturas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Gestão Florestal", "Silvicultura"],
    fontes: [
      "1. Oliveira, J. (2023). Princípios da Gestão Florestal.",
      "2. Santos, M. (2022). Gestão Sustentável de Florestas."
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de sustentabilidade.",
    dica: "A gestão florestal sustentável envolve o uso responsável de recursos."
  },
  {
    titulo: "Gestão de Riscos em Áreas Florestais",
    pergunta: `Qual é uma abordagem eficaz para a gestão de riscos florestais?`,
    opcoes: [
      { id: 1, texto: "Ignorar os riscos naturais" },
      { id: 2, texto: "Uso de tecnologias de monitoramento" },
      { id: 3, texto: "Aumento do desmatamento" },
      { id: 4, texto: "Expansão das áreas urbanas" }
    ],
    respostaCorreta: 2,
    dificuldade: "normal",
    categorias: ["Manejo Florestal", "Mudanças Climáticas"],
    fontes: [
      "1. Almeida, N. (2021). Gestão de Riscos em Florestas.",
      "2. Costa, F. (2020). Estratégias de Mitigação de Riscos."
    ],
    vantagem: "Receba um bônus de gestão de riscos!",
    desvantagem: "Perde 1 ponto de risco.",
    dica: "As tecnologias de monitoramento são essenciais."
  },
  {
    titulo: "Importância das Árvores Nativas",
    pergunta: `Por que é importante plantar árvores nativas em projetos de reflorestamento?`,
    opcoes: [
      { id: 1, texto: "Adaptadas ao clima local" },
      { id: 2, texto: "Promovem biodiversidade" },
      { id: 3, texto: "Melhoram qualidade do solo" },
      { id: 4, texto: "Aumentam o desmatamento" }
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Reflorestamento", "Biodiversidade"],
    fontes: [
      "1. Silva, A. (2023). Reflorestamento com Espécies Nativas."
    ],
    vantagem: "Ganhe 3 pontos de reflorestamento!",
    desvantagem: "Perde 1 ponto de biodiversidade.",
    dica: "Árvores nativas são adaptadas e benéficas para o ecossistema local."
  },
  {
    titulo: "Benefícios do Ecoturismo",
    pergunta: `Quais são os benefícios do ecoturismo para a conservação ambiental?`,
    opcoes: [
      { id: 1, texto: "Geração de renda" },
      { id: 2, texto: "Educação ambiental" },
      { id: 3, texto: "Aumento da biodiversidade" },
      { id: 4, texto: "Poluição de habitats" }
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Ecoturismo", "Conservação"],
    fontes: [
      "1. Lima, T. (2023). Benefícios do Ecoturismo para a Conservação."
    ],
    vantagem: "Ganhe 2 pontos de ecoturismo!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "Ecoturismo promove a educação e conservação ambiental."
  },
  {
    titulo: "Práticas de Conservação",
    pergunta: `Quais práticas ajudam na conservação da biodiversidade?`,
    opcoes: [
      { id: 1, texto: "Proteção de habitats" },
      { id: 2, texto: "Controle de espécies invasoras" },
      { id: 3, texto: "Caça indiscriminada" },
      { id: 4, texto: "Restaurar ecossistemas degradados" }
    ],
    respostaCorreta: [1, 2, 4],
    dificuldade: "facil",
    categorias: ["Conservação", "Biodiversidade"],
    fontes: [
      "1. Oliveira, R. (2023). Práticas de Conservação Eficazes."
    ],
    vantagem: "Ganhe 3 pontos de conservação!",
    desvantagem: "Perde 1 ponto de biodiversidade.",
    dica: "Conservação envolve proteger e restaurar habitats."
  },
  {
    titulo: "Funções das Florestas",
    pergunta: `Quais são algumas funções ecológicas importantes das florestas?`,
    opcoes: [
      { id: 1, texto: "Sequestro de carbono" },
      { id: 2, texto: "Regulação do clima" },
      { id: 3, texto: "Produção de oxigênio" },
      { id: 4, texto: "Desertificação" }
    ],
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Ecologia", "Florestas"],
    fontes: [
      "1. Mendes, G. (2023). O Papel das Florestas no Equilíbrio Ecológico."
    ],
    vantagem: "Ganhe 2 pontos de ecologia!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "Florestas desempenham papéis vitais no ecossistema."
  },
  {
    titulo: "Restauração de Ecossistemas",
    pergunta: `Quais são os objetivos da restauração de ecossistemas?`,
    opcoes: [
      { id: 1, texto: "Recuperar biodiversidade" },
      { id: 2, texto: "Restaurar funções ecológicas" },
      { id: 3, texto: "Aumentar erosão do solo" },
      { id: 4, texto: "Conectar habitats fragmentados" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 4],
    dificuldade: "facil",
    categorias: ["Restauração Ecológica", "Conservação"],
    fontes: [
      "1. Almeida, F. (2023). Restauração de Ecossistemas e Conservação."
    ],
    vantagem: "Ganhe 3 pontos de restauração!",
    desvantagem: "Perde 1 ponto de biodiversidade.",
    dica: "A restauração visa a recuperação de ecossistemas."
  },
  {
    titulo: "Gestão de Recursos Hídricos",
    pergunta: `Quais práticas ajudam na gestão sustentável de recursos hídricos?`,
    opcoes: [
      { id: 1, texto: "Conservação de nascentes" },
      { id: 2, texto: "Uso racional de água" },
      { id: 3, texto: "Poluição de rios" },
      { id: 4, texto: "Tratamento de esgoto" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 4],
    dificuldade: "facil",
    categorias: ["Recursos Hídricos", "Sustentabilidade"],
    fontes: [
      "1. Sousa, J. (2023). Gestão Sustentável de Recursos Hídricos."
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de conservação.",
    dica: "Gestão hídrica envolve conservação e tratamento adequado."
  },
  {
    titulo: "Benefícios da Agrofloresta",
    pergunta: `Quais são alguns dos benefícios da agrofloresta?`,
    opcoes: [
      { id: 1, texto: "Melhoria da fertilidade do solo" },
      { id: 2, texto: "Diversificação de culturas" },
      { id: 3, texto: "Redução da biodiversidade" },
      { id: 4, texto: "Sequestro de carbono" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 4],
    dificuldade: "facil",
    categorias: ["Agrofloresta", "Sustentabilidade"],
    fontes: [
      "1. Pereira, L. (2023). Agrofloresta como Solução Sustentável."
    ],
    vantagem: "Ganhe 3 pontos de agrofloresta!",
    desvantagem: "Perde 1 ponto de biodiversidade.",
    dica: "A agrofloresta melhora o solo e sequestra carbono."
  },
  {
    titulo: "Conservação de Solo",
    pergunta: `Quais práticas são eficazes na conservação do solo?`,
    opcoes: [
      { id: 1, texto: "Cobertura vegetal" },
      { id: 2, texto: "Terraceamento" },
      { id: 3, texto: "Monocultura intensiva" },
      { id: 4, texto: "Rotações de cultura" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 4],
    dificuldade: "facil",
    categorias: ["Conservação do Solo", "Sustentabilidade"],
    fontes: [
      "1. Ribeiro, C. (2023). Práticas de Conservação do Solo."
    ],
    vantagem: "Ganhe 3 pontos de conservação!",
    desvantagem: "Perde 1 ponto de solo.",
    dica: "Práticas de conservação visam proteger e enriquecer o solo."
  },
  {
    titulo: "Práticas de Silvicultura Sustentável",
    pergunta: `Quais práticas são consideradas sustentáveis na silvicultura?`,
    opcoes: [
      { id: 1, texto: "Rotação de culturas" },
      { id: 2, texto: "Plantio de espécies nativas" },
      { id: 3, texto: "Desmatamento indiscriminado" },
      { id: 4, texto: "Manejo florestal responsável" }
    ], 
    tipo: "outra",
    respostaCorreta: [2, 4],
    dificuldade: "facil",
    categorias: ["Silvicultura", "Sustentabilidade"],
    fontes: [
      "1. Fernandes, H. (2023). Silvicultura Sustentável e Suas Práticas."
    ],
    vantagem: "Ganhe 2 pontos de sustentabilidade!",
    desvantagem: "Perde 1 ponto de manejo.",
    dica: "Silvicultura sustentável envolve práticas responsáveis."
  },
  {
    titulo: "Impactos das Mudanças Climáticas",
    pergunta: `Quais são os impactos negativos das mudanças climáticas nas florestas?`,
    opcoes: [
      { id: 1, texto: "Aumento de pragas" },
      { id: 2, texto: "Redução da biodiversidade" },
      { id: 3, texto: "Maior resiliência florestal" },
      { id: 4, texto: "Aumento de incêndios florestais" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 4],
    dificuldade: "facil",
    categorias: ["Mudanças Climáticas", "Conservação"],
    fontes: [
      "1. Gomes, T. (2023). Impactos das Mudanças Climáticas em Ecossistemas."
    ],
    vantagem: "Ganhe 2 pontos de adaptação!",
    desvantagem: "Perde 1 ponto de resiliência.",
    dica: "Mudanças climáticas afetam negativamente a biodiversidade."
  },

  // Perguntas Difíceis com 5 Alternativas
  {
    titulo: "Tecnologia de Dendrocronologia",
    pergunta: `Qual tecnologia é usada para estudar anéis de crescimento em árvores?`,
    opcoes: [
      { id: 1, texto: "Dendrometria" },
      { id: 2, texto: "Dendrocronologia" },
      { id: 3, texto: "Fitometria" },
      { id: 4, texto: "Ecocronologia" },
      { id: 5, texto: "Dendrofitometria" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Tecnologia Florestal", "Ecologia"],
    fontes: [
      "1. Lima, P. (2023). Aplicações da Dendrocronologia."
    ],
    vantagem: "Ganhe 5 pontos de pesquisa!",
    desvantagem: "Perde 3 pontos de tempo.",
    dica: "Estudo de anéis de crescimento é um método de datação."
  },
  {
    titulo: "Resiliência das Espécies Vegetais",
    pergunta: `Qual fator não contribui para a resiliência de espécies vegetais?`,
    opcoes: [
      { id: 1, texto: "Diversidade genética" },
      { id: 2, texto: "Monocultura" },
      { id: 3, texto: "Adaptação ao ambiente" },
      { id: 4, texto: "Resistência a pragas" },
      { id: 5, texto: "Capacidade de dispersão" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Ecologia", "Biodiversidade"],
    fontes: [
      "1. Silva, M. (2023). Resiliência Ecológica e Espécies Vegetais."
    ],
    vantagem: "Ganhe 4 pontos de biodiversidade!",
    desvantagem: "Perde 2 pontos de resiliência.",
    dica: "A diversidade é fundamental para a resiliência."
  },
  {
    titulo: "Impacto das Mudanças Climáticas",
    pergunta: `Qual das seguintes opções é uma consequência das mudanças climáticas nas florestas?`,
    opcoes: [
      { id: 1, texto: "Aumento da fertilidade do solo" },
      { id: 2, texto: "Aumento de incêndios florestais" },
      { id: 3, texto: "Redução de eventos extremos" },
      { id: 4, texto: "Desaparecimento de pragas" },
      { id: 5, texto: "Aumento na diversidade de espécies" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Mudanças Climáticas", "Ecologia"],
    fontes: [
      "1. Ferreira, R. (2023). Impactos Climáticos em Florestas."
    ],
    vantagem: "Ganhe 4 pontos de adaptação!",
    desvantagem: "Perde 2 pontos de resistência.",
    dica: "Mudanças climáticas frequentemente resultam em mais incêndios."
  },
  {
    titulo: "Gestão de Florestas Urbanas",
    pergunta: `Qual é um desafio comum na gestão de florestas urbanas?`,
    opcoes: [
      { id: 1, texto: "Excesso de biodiversidade" },
      { id: 2, texto: "Fragmentação de habitats" },
      { id: 3, texto: "Rápido crescimento de árvores" },
      { id: 4, texto: "Facilidade de manejo" },
      { id: 5, texto: "Redução da poluição" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Gestão Florestal", "Florestas Urbanas"],
    fontes: [
      "1. Costa, A. (2023). Desafios na Gestão de Florestas Urbanas."
    ],
    vantagem: "Ganhe 3 pontos de manejo urbano!",
    desvantagem: "Perde 2 pontos de planejamento.",
    dica: "A urbanização tende a fragmentar habitats."
  },
  {
    titulo: "Importância da Biodiversidade",
    pergunta: `Qual é a função da biodiversidade em ecossistemas florestais?`,
    opcoes: [
      { id: 1, texto: "Aumentar a resistência a mudanças" },
      { id: 2, texto: "Promover monoculturas" },
      { id: 3, texto: "Reduzir a resiliência" },
      { id: 4, texto: "Simplificar cadeias alimentares" },
      { id: 5, texto: "Aumentar a diversidade genética" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 5],
    dificuldade: "facil",
    categorias: ["Biodiversidade", "Ecologia"],
    fontes: [
      "1. Oliveira, J. (2023). Papel da Biodiversidade em Ecossistemas."
    ],
    vantagem: "Ganhe 4 pontos de biodiversidade!",
    desvantagem: "Perde 2 pontos de resistência.",
    dica: "A biodiversidade é fundamental para a resiliência e genética."
  },
  {
    titulo: "Inovações na Gestão Florestal",
    pergunta: `Qual é uma inovação recente na gestão florestal?`,
    opcoes: [
      { id: 1, texto: "Uso de big data" },
      { id: 2, texto: "Desmatamento convencional" },
      { id: 3, texto: "Monitoramento via drones" },
      { id: 4, texto: "Queima controlada" },
      { id: 5, texto: "Métodos manuais de inventário" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 3],
    dificuldade: "facil",
    categorias: ["Gestão Florestal", "Tecnologia"],
    fontes: [
      "1. Ribeiro, L. (2023). Inovações Tecnológicas em Florestas."
    ],
    vantagem: "Ganhe 5 pontos de tecnologia!",
    desvantagem: "Perde 2 pontos de inovação.",
    dica: "Tecnologia moderna está transformando a gestão florestal."
  },
  {
    titulo: "Soluções para a Destruição de Habitats",
    pergunta: `Quais ações podem reduzir a destruição de habitats naturais?`,
    opcoes: [
      { id: 1, texto: "Construção de estradas" },
      { id: 2, texto: "Criação de áreas protegidas" },
      { id: 3, texto: "Educação ambiental" },
      { id: 4, texto: "Expansão urbana" },
      { id: 5, texto: "Desmatamento sustentável" }
    ], 
    tipo: "outra",
    respostaCorreta: [2, 3],
    dificuldade: "facil",
    categorias: ["Conservação", "Ecologia"],
    fontes: [
      "1. Gomes, P. (2023). Soluções para a Destruição de Habitats."
    ],
    vantagem: "Ganhe 4 pontos de conservação!",
    desvantagem: "Perde 2 pontos de proteção.",
    dica: "Proteção e educação são chaves para conservar habitats."
  },
  {
    titulo: "Restauração de Ecossistemas Marinhos",
    pergunta: `Qual é uma prática eficaz na restauração de ecossistemas marinhos?`,
    opcoes: [
      { id: 1, texto: "Construção de portos" },
      { id: 2, texto: "Restauração de recifes de corais" },
      { id: 3, texto: "Pesca intensiva" },
      { id: 4, texto: "Destruição de habitats" },
      { id: 5, texto: "Educação ambiental marinha" }
    ], 
    tipo: "outra",
    respostaCorreta: [2, 5],
    dificuldade: "facil",
    categorias: ["Restauração Ecológica", "Ecologia Marinha"],
    fontes: [
      "1. Oliveira, M. (2023). Restauração de Ecossistemas Marinhos."
    ],
    vantagem: "Ganhe 4 pontos de restauração marinha!",
    desvantagem: "Perde 2 pontos de proteção marinha.",
    dica: "A restauração de recifes é crucial para ecossistemas marinhos."
  },
  {
    titulo: "Ameaças à Biodiversidade",
    pergunta: `Quais são algumas das principais ameaças à biodiversidade global?`,
    opcoes: [
      { id: 1, texto: "Mudanças climáticas" },
      { id: 2, texto: "Poluição" },
      { id: 3, texto: "Conservação de habitats" },
      { id: 4, texto: "Espécies invasoras" },
      { id: 5, texto: "Expansão agrícola" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 4, 5],
    dificuldade: "facil",
    categorias: ["Biodiversidade", "Conservação"],
    fontes: [
      "1. Santos, R. (2023). Ameaças à Biodiversidade Global."
    ],
    vantagem: "Ganhe 5 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "As ameaças incluem poluição e invasão de habitats."
  },
  {
    titulo: "Efeitos das Espécies Invasoras",
    pergunta: `Qual é um dos efeitos das espécies invasoras nos ecossistemas nativos?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade nativa" },
      { id: 2, texto: "Disrupção de cadeias alimentares" },
      { id: 3, texto: "Proteção de habitats" },
      { id: 4, texto: "Concorrência com espécies nativas" },
      { id: 5, texto: "Estabilização de ecossistemas" }
    ], 
    tipo: "outra",
    respostaCorreta: [2, 4],
    dificuldade: "facil",
    categorias: ["Ecologia", "Espécies Invasoras"],
    fontes: [
      "1. Fernandes, T. (2023). Impactos das Espécies Invasoras."
    ],
    vantagem: "Ganhe 3 pontos de ecologia!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "Espécies invasoras competem e afetam ecossistemas."
  },

  // Perguntas Difíceis com 6 Alternativas
  {
    titulo: "Restauração de Ecossistemas Terrestres",
    pergunta: `Qual prática é essencial na restauração de ecossistemas terrestres degradados?`,
    opcoes: [
      { id: 1, texto: "Uso de herbicidas" },
      { id: 2, texto: "Plantio de espécies invasoras" },
      { id: 3, texto: "Monitoramento contínuo" },
      { id: 4, texto: "Desmatamento intensivo" },
      { id: 5, texto: "Reintrodução de espécies nativas" },
      { id: 6, texto: "Queimadas não controladas" }
    ], 
    tipo: "outra",
    respostaCorreta: [3, 5],
    dificuldade: "facil",
    categorias: ["Restauração Ecológica", "Ecologia"],
    fontes: [
      "1. Silva, A. (2023). Práticas de Restauração Ecológica Terrestre."
    ],
    vantagem: "Ganhe 6 pontos de restauração!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "Reintrodução de espécies nativas é chave para restauração."
  },
  {
    titulo: "Desafios da Gestão de Florestas Tropicais",
    pergunta: `Qual é um dos maiores desafios na gestão de florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Facilidade de acesso" },
      { id: 2, texto: "Monitoramento eficaz" },
      { id: 3, texto: "Conservação da biodiversidade" },
      { id: 4, texto: "Redução do desmatamento ilegal" },
      { id: 5, texto: "Gestão sustentável de recursos" },
      { id: 6, texto: "Falta de biodiversidade" }
    ], 
    tipo: "outra",
    respostaCorreta: [3, 4, 5],
    dificuldade: "facil",
    categorias: ["Gestão Florestal", "Florestas Tropicais"],
    fontes: [
      "1. Costa, R. (2023). Gestão de Florestas Tropicais."
    ],
    vantagem: "Ganhe 5 pontos de gestão!",
    desvantagem: "Perde 3 pontos de sustentabilidade.",
    dica: "Desafios incluem a conservação e a redução de desmatamento ilegal."
  },
  {
    titulo: "Impacto das Alterações Climáticas em Corais",
    pergunta: `Quais são os efeitos das alterações climáticas nos recifes de corais?`,
    opcoes: [
      { id: 1, texto: "Branqueamento de corais" },
      { id: 2, texto: "Aumento da diversidade marinha" },
      { id: 3, texto: "Elevação do nível do mar" },
      { id: 4, texto: "Acidificação dos oceanos" },
      { id: 5, texto: "Redução de habitats marinhos" },
      { id: 6, texto: "Melhoria na saúde dos corais" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 3, 4, 5],
    dificuldade: "facil",
    categorias: ["Alterações Climáticas", "Ecologia Marinha"],
    fontes: [
      "1. Mendes, S. (2023). Impactos Climáticos em Recifes de Corais."
    ],
    vantagem: "Ganhe 6 pontos de adaptação!",
    desvantagem: "Perde 4 pontos de conservação marinha.",
    dica: "Mudanças climáticas afetam severamente os corais."
  },
  {
    titulo: "Ecossistemas de Água Doce",
    pergunta: `Qual é um dos principais desafios na conservação de ecossistemas de água doce?`,
    opcoes: [
      { id: 1, texto: "Poluição por resíduos industriais" },
      { id: 2, texto: "Conservação de biodiversidade aquática" },
      { id: 3, texto: "Exploração sustentável de recursos" },
      { id: 4, texto: "Introdução de espécies invasoras" },
      { id: 5, texto: "Redução de poluentes orgânicos" },
      { id: 6, texto: "Monitoramento de qualidade da água" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 4],
    dificuldade: "facil",
    categorias: ["Ecossistemas Aquáticos", "Conservação"],
    fontes: [
      "1. Oliveira, F. (2023). Desafios na Conservação de Ecossistemas de Água Doce."
    ],
    vantagem: "Ganhe 5 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "A poluição e as espécies invasoras são grandes desafios."
  },
  {
    titulo: "Ameaças à Vida Selvagem",
    pergunta: `Quais são algumas das principais ameaças à vida selvagem global?`,
    opcoes: [
      { id: 1, texto: "Caça furtiva" },
      { id: 2, texto: "Destruição de habitats" },
      { id: 3, texto: "Desenvolvimento urbano" },
      { id: 4, texto: "Conservação de espécies" },
      { id: 5, texto: "Exploração de recursos naturais" },
      { id: 6, texto: "Mudanças climáticas" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 5, 6],
    dificuldade: "facil",
    categorias: ["Vida Selvagem", "Conservação"],
    fontes: [
      "1. Santos, L. (2023). Ameaças à Vida Selvagem."
    ],
    vantagem: "Ganhe 6 pontos de proteção!",
    desvantagem: "Perde 4 pontos de conservação.",
    dica: "A caça furtiva e a destruição de habitats são ameaças críticas."
  },

  // Perguntas com Vantagens Diretas
  {
    titulo: "Ganhe 15 Moedas",
    pergunta: `GANHE 15 MM`,
    opcoes: [
      { id: 1, texto: "Entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Vantagens"],
    fontes: [],
    vantagem: "Ganhe 15 moedas!",
    desvantagem: "",
    dica: ""
  },
  {
    titulo: "Ganhe 5 Moedas",
    pergunta: `GANHE 5 MM`,
    opcoes: [
      { id: 1, texto: "Entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Vantagens"],
    fontes: [],
    vantagem: "Ganhe 5 moedas!",
    desvantagem: "",
    dica: ""
  },
  {
    titulo: "Ganhe 10 Moedas",
    pergunta: `GANHE 10 MM`,
    opcoes: [
      { id: 1, texto: "Entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Vantagens"],
    fontes: [],
    vantagem: "Ganhe 10 moedas!",
    desvantagem: "",
    dica: ""
  },
  {
    titulo: "Ganhe 20 Moedas",
    pergunta: `GANHE 20 MM`,
    opcoes: [
      { id: 1, texto: "Entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Vantagens"],
    fontes: [],
    vantagem: "Ganhe 20 moedas!",
    desvantagem: "",
    dica: ""
  },
  {
    titulo: "Ganhe 30 Moedas",
    pergunta: `GANHE 30 MM`,
    opcoes: [
      { id: 1, texto: "Entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Vantagens"],
    fontes: [],
    vantagem: "Ganhe 30 moedas!",
    desvantagem: "",
    dica: ""
  },
  {
    titulo: "Ganhe 50 Moedas",
    pergunta: `GANHE 50 MM`,
    opcoes: [
      { id: 1, texto: "Entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Vantagens"],
    fontes: [],
    vantagem: "Ganhe 50 moedas!",
    desvantagem: "",
    dica: ""
  },
  {
    titulo: "Escolha um Prêmio",
    pergunta: `Escolha um dos prêmios abaixo`,
    opcoes: [
      { id: 1, texto: "Ganhe 20 moedas" },
      { id: 2, texto: "Ganhe 30 moedas" },
      { id: 3, texto: "Ganhe 50 moedas" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Vantagens"],
    fontes: [],
    vantagem: "Escolha qualquer prêmio e receba moedas!",
    desvantagem: "",
    dica: ""
  },
  {
    titulo: "Ganhe 100 Moedas",
    pergunta: `GANHE 100 MM`,
    opcoes: [
      { id: 1, texto: "Entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Vantagens"],
    fontes: [],
    vantagem: "Ganhe 100 moedas!",
    desvantagem: "",
    dica: ""
  },

  // Perguntas com Desvantagens Diretas
  {
    titulo: "Perca 1 Rodada",
    pergunta: `PERCA 1 RODADA`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perca a próxima rodada!",
    dica: ""
  },
  {
    titulo: "Perca 5 Moedas",
    pergunta: `PERCA 5 MM`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 5 moedas!",
    dica: ""
  },
  {
    titulo: "Perca 10 Moedas",
    pergunta: `PERCA 10 MM`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 10 moedas!",
    dica: ""
  },
  {
    titulo: "Perca 15 Moedas",
    pergunta: `PERCA 15 MM`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 15 moedas!",
    dica: ""
  },
  {
    titulo: "Perca 20 Moedas",
    pergunta: `PERCA 20 MM`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 20 moedas!",
    dica: ""
  },
  {
    titulo: "Perca 30 Moedas",
    pergunta: `PERCA 30 MM`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 30 moedas!",
    dica: ""
  },
  {
    titulo: "Perca 50 Moedas",
    pergunta: `PERCA 50 MM`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 50 moedas!",
    dica: ""
  },
  {
    titulo: "Perca 1 Turno",
    pergunta: `PERCA 1 TURNO`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 1 turno!",
    dica: ""
  },
  {
    titulo: "Perca 2 Rodadas",
    pergunta: `PERCA 2 RODADAS`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ], 
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perca as próximas duas rodadas!",
    dica: ""
  },
  {
    titulo: "Escolha uma Desvantagem",
    pergunta: `Escolha uma das desvantagens abaixo`,
    opcoes: [
      { id: 1, texto: "Perca 10 moedas" },
      { id: 2, texto: "Perca 1 rodada" },
      { id: 3, texto: "Perca 20 moedas" }
    ], 
    tipo: "outra",
    respostaCorreta: [1, 2, 3],
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Escolha qualquer desvantagem!",
    dica: ""
  },
  {
    titulo: "Perca 100 Moedas",
    pergunta: `PERCA 100 MM`,
    opcoes: [
      { id: 1, texto: "Estou triste, mas entendi" }
    ],
    respostaCorreta: 1,
    dificuldade: "facil",
    categorias: ["Desvantagens"],
    fontes: [],
    vantagem: "",
    desvantagem: "Perde 100 moedas!",
    dica: ""
  },
  {
    titulo: "Impacto das Mudanças Climáticas",
    pergunta: `Qual é uma das principais consequências das mudanças climáticas nas florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Diminuição da frequência de incêndios" },
      { id: 3, texto: "Desertificação crescente" },
      { id: 4, texto: "Crescimento descontrolado de árvores" },
      { id: 5, texto: "Diminuição da fauna endêmica" }
    ], 
    tipo: "outra",
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Mudanças Climáticas", "Florestas Tropicais"],
    fontes: [
      "1. Santos, T. (2023). Efeitos das Mudanças Climáticas nas Florestas Tropicais."
    ],
    vantagem: "Ganhe 5 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "A fauna nativa é sensível a mudanças climáticas."
  },
  {
    titulo: "Gestão de Recursos Hídricos",
    pergunta: `Qual é o maior desafio na gestão de recursos hídricos em áreas de floresta tropical?`,
    opcoes: [
      { id: 1, texto: "Excesso de água durante todo o ano" },
      { id: 2, texto: "Poluição industrial" },
      { id: 3, texto: "Evaporação lenta" },
      { id: 4, texto: "Desertificação rápida" },
      { id: 5, texto: "Inundações sazonais intensas" }
    ], 
    tipo: "outra",
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Gestão de Recursos Hídricos", "Florestas Tropicais"],
    fontes: [
      "1. Oliveira, J. (2023). Desafios na Gestão de Recursos Hídricos em Florestas."
    ],
    vantagem: "Ganhe 4 pontos de gestão!",
    desvantagem: "Perde 2 pontos de sustentabilidade.",
    dica: "As inundações sazonais são comuns em áreas tropicais."
  },
  {
    titulo: "Conservação de Espécies Ameaçadas",
    pergunta: `Qual é a principal ameaça à sobrevivência de espécies ameaçadas em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Reprodução descontrolada" },
      { id: 2, texto: "Isolamento genético" },
      { id: 3, texto: "Interação com espécies exóticas" },
      { id: 4, texto: "Preservação do habitat" },
      { id: 5, texto: "Polinização excessiva" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Conservação", "Espécies Ameaçadas"],
    fontes: [
      "1. Silva, R. (2023). Conservação de Espécies Ameaçadas em Florestas Tropicais."
    ],
    vantagem: "Ganhe 6 pontos de conservação!",
    desvantagem: "Perde 4 pontos de biodiversidade.",
    dica: "Espécies isoladas enfrentam desafios genéticos."
  },
  {
    titulo: "Impacto de Pragas em Florestas",
    pergunta: `Qual é uma abordagem eficaz para mitigar os efeitos das pragas em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Uso de pesticidas químicos" },
      { id: 2, texto: "Introdução de predadores naturais" },
      { id: 3, texto: "Isolamento total das áreas afetadas" },
      { id: 4, texto: "Queima controlada de árvores" },
      { id: 5, texto: "Desmatamento seletivo" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Gestão de Pragas", "Florestas Tropicais"],
    fontes: [
      "1. Costa, A. (2023). Controle de Pragas em Florestas Tropicais."
    ],
    vantagem: "Ganhe 5 pontos de gestão!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "Predadores naturais ajudam no controle de pragas."
  },
  {
    titulo: "Conservação da Água em Ecossistemas Florestais",
    pergunta: `Qual é o maior benefício da conservação da água em ecossistemas florestais?`,
    opcoes: [
      { id: 1, texto: "Aumento da salinidade do solo" },
      { id: 2, texto: "Redução da biodiversidade aquática" },
      { id: 3, texto: "Manutenção de habitats aquáticos saudáveis" },
      { id: 4, texto: "Erosão acelerada do solo" },
      { id: 5, texto: "Poluição das fontes de água" }
    ], 
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Conservação da Água", "Ecossistemas Florestais"],
    fontes: [
      "1. Mendes, G. (2023). Conservação da Água em Ecossistemas Florestais."
    ],
    vantagem: "Ganhe 4 pontos de conservação!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "A conservação da água apoia habitats saudáveis."
  },
  {
    titulo: "Efeitos da Poluição nas Florestas",
    pergunta: `Qual tipo de poluição tem o impacto mais significativo nas florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Poluição sonora" },
      { id: 2, texto: "Poluição do solo" },
      { id: 3, texto: "Poluição luminosa" },
      { id: 4, texto: "Poluição térmica" },
      { id: 5, texto: "Poluição do ar" }
    ], 
    tipo: "outra",
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Poluição", "Florestas Tropicais"],
    fontes: [
      "1. Almeida, P. (2023). Impactos da Poluição nas Florestas Tropicais."
    ],
    vantagem: "Ganhe 3 pontos de sustentabilidade!",
    desvantagem: "Perde 2 pontos de conservação.",
    dica: "A poluição do ar afeta a saúde das florestas."
  },
  {
    titulo: "Gestão de Incêndios Florestais",
    pergunta: `Qual é a prática mais eficaz para a gestão de incêndios em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento do uso de combustível" },
      { id: 2, texto: "Extinção imediata de pequenos incêndios" },
      { id: 3, texto: "Queima controlada" },
      { id: 4, texto: "Construção de barreiras físicas" },
      { id: 5, texto: "Negligência dos focos de incêndio" }
    ], 
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Gestão de Incêndios", "Florestas Tropicais"],
    fontes: [
      "1. Pereira, M. (2023). Práticas de Gestão de Incêndios Florestais."
    ],
    vantagem: "Ganhe 5 pontos de controle!",
    desvantagem: "Perde 3 pontos de sustentabilidade.",
    dica: "A queima controlada ajuda a prevenir incêndios maiores."
  },
  {
    titulo: "Impactos da Desflorestação",
    pergunta: `Qual é uma das principais consequências da desflorestação nas regiões tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da cobertura florestal" },
      { id: 2, texto: "Diminuição da emissão de CO2" },
      { id: 3, texto: "Extinção de espécies nativas" },
      { id: 4, texto: "Melhoria da qualidade do solo" },
      { id: 5, texto: "Expansão de habitats naturais" }
    ], 
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Desflorestação", "Ecologia"],
    fontes: [
      "1. Silva, J. (2023). Consequências da Desflorestação em Regiões Tropicais."
    ],
    vantagem: "Ganhe 4 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "A desflorestação ameaça espécies nativas."
  },
  {
    titulo: "Gestão de Ecossistemas de Manguezais",
    pergunta: `Qual é a maior ameaça aos ecossistemas de manguezais?`,
    opcoes: [
      { id: 1, texto: "Sedimentação natural" },
      { id: 2, texto: "Poluição marinha" },
      { id: 3, texto: "Expansão agrícola" },
      { id: 4, texto: "Erosão do solo" },
      { id: 5, texto: "Pesca controlada" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Ecossistemas de Manguezais", "Conservação"],
    fontes: [
      "1. Rocha, F. (2023). Gestão de Ecossistemas de Manguezais."
    ],
    vantagem: "Ganhe 5 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "A poluição marinha afeta gravemente os manguezais."
  },
  {
    titulo: "Biodiversidade e Florestas",
    pergunta: `Qual é a maior vantagem da preservação da biodiversidade em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da monocultura" },
      { id: 2, texto: "Estabilização dos ecossistemas" },
      { id: 3, texto: "Redução de espécies endêmicas" },
      { id: 4, texto: "Extinção de espécies invasoras" },
      { id: 5, texto: "Diminuição da cobertura florestal" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Biodiversidade", "Florestas Tropicais"],
    fontes: [
      "1. Cardoso, L. (2023). Importância da Biodiversidade em Florestas Tropicais."
    ],
    vantagem: "Ganhe 4 pontos de biodiversidade!",
    desvantagem: "Perde 2 pontos de sustentabilidade.",
    dica: "A biodiversidade estabiliza ecossistemas."
  },
  {
    titulo: "Conservação de Corais",
    pergunta: `Qual é a maior ameaça à saúde dos recifes de corais?`,
    opcoes: [
      { id: 1, texto: "Preservação dos habitats" },
      { id: 2, texto: "Branqueamento dos corais" },
      { id: 3, texto: "Recuperação de ecossistemas" },
      { id: 4, texto: "Redução da pesca" },
      { id: 5, texto: "Conservação de espécies marinhas" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Conservação Marinha", "Recifes de Corais"],
    fontes: [
      "1. Mendes, J. (2023). Ameaças aos Recifes de Corais."
    ],
    vantagem: "Ganhe 5 pontos de conservação marinha!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "O branqueamento dos corais é uma grande ameaça."
  },
  {
    titulo: "Efeitos das Espécies Invasoras",
    pergunta: `Qual é o impacto mais significativo das espécies invasoras em ecossistemas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Extinção de espécies nativas" },
      { id: 3, texto: "Estabilização do ecossistema" },
      { id: 4, texto: "Redução do impacto humano" },
      { id: 5, texto: "Melhoria da qualidade do solo" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Espécies Invasoras", "Ecossistemas Tropicais"],
    fontes: [
      "1. Ferreira, C. (2023). Impactos das Espécies Invasoras em Ecossistemas Tropicais."
    ],
    vantagem: "Ganhe 6 pontos de controle de invasores!",
    desvantagem: "Perde 4 pontos de biodiversidade.",
    dica: "Espécies invasoras ameaçam espécies nativas."
  },
  {
    titulo: "Impacto das Mudanças Climáticas",
    pergunta: `Qual é uma das principais consequências das mudanças climáticas nas florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Diminuição da frequência de incêndios" },
      { id: 3, texto: "Desertificação crescente" },
      { id: 4, texto: "Crescimento descontrolado de árvores" },
      { id: 5, texto: "Diminuição da fauna endêmica" }
    ], 
    tipo: "outra",
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Mudanças Climáticas", "Florestas Tropicais"],
    fontes: [
      "1. Santos, T. (2023). Efeitos das Mudanças Climáticas nas Florestas Tropicais."
    ],
    vantagem: "Ganhe 5 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "A fauna nativa é sensível a mudanças climáticas."
  },
  {
    titulo: "Gestão de Recursos Hídricos",
    pergunta: `Qual é o maior desafio na gestão de recursos hídricos em áreas de floresta tropical?`,
    opcoes: [
      { id: 1, texto: "Excesso de água durante todo o ano" },
      { id: 2, texto: "Poluição industrial" },
      { id: 3, texto: "Evaporação lenta" },
      { id: 4, texto: "Desertificação rápida" },
      { id: 5, texto: "Inundações sazonais intensas" }
    ], 
    tipo: "outra",
    respostaCorreta: 4,
    dificuldade: "dificil",
    categorias: ["Gestão de Recursos Hídricos", "Florestas Tropicais"],
    fontes: [
      "1. Oliveira, J. (2023). Desafios na Gestão de Recursos Hídricos em Florestas."
    ],
    vantagem: "Ganhe 4 pontos de gestão!",
    desvantagem: "Perde 2 pontos de sustentabilidade.",
    dica: "As inundações sazonais são comuns em áreas tropicais."
  },
  {
    titulo: "Conservação de Espécies Ameaçadas",
    pergunta: `Qual é a principal ameaça à sobrevivência de espécies ameaçadas em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Reprodução descontrolada" },
      { id: 2, texto: "Isolamento genético" },
      { id: 3, texto: "Interação com espécies exóticas" },
      { id: 4, texto: "Preservação do habitat" },
      { id: 5, texto: "Polinização excessiva" }
    ], 
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Conservação", "Espécies Ameaçadas"],
    fontes: [
      "1. Silva, R. (2023). Conservação de Espécies Ameaçadas em Florestas Tropicais."
    ],
    vantagem: "Ganhe 6 pontos de conservação!",
    desvantagem: "Perde 4 pontos de biodiversidade.",
    dica: "Espécies isoladas enfrentam desafios genéticos."
  },
  {
    titulo: "Impacto de Pragas em Florestas",
    pergunta: `Qual é uma abordagem eficaz para mitigar os efeitos das pragas em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Uso de pesticidas químicos" },
      { id: 2, texto: "Introdução de predadores naturais" },
      { id: 3, texto: "Isolamento total das áreas afetadas" },
      { id: 4, texto: "Queima controlada de árvores" },
      { id: 5, texto: "Desmatamento seletivo" }
    ], 
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Gestão de Pragas", "Florestas Tropicais"],
    fontes: [
      "1. Costa, A. (2023). Controle de Pragas em Florestas Tropicais."
    ],
    vantagem: "Ganhe 5 pontos de gestão!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "Predadores naturais ajudam no controle de pragas."
  },
  {
    titulo: "Conservação da Água em Ecossistemas Florestais",
    pergunta: `Qual é o maior benefício da conservação da água em ecossistemas florestais?`,
    opcoes: [
      { id: 1, texto: "Aumento da salinidade do solo" },
      { id: 2, texto: "Redução da biodiversidade aquática" },
      { id: 3, texto: "Manutenção de habitats aquáticos saudáveis" },
      { id: 4, texto: "Erosão acelerada do solo" },
      { id: 5, texto: "Poluição das fontes de água" }
    ], 
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Conservação da Água", "Ecossistemas Florestais"],
    fontes: [
      "1. Mendes, G. (2023). Conservação da Água em Ecossistemas Florestais."
    ],
    vantagem: "Ganhe 4 pontos de conservação!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "A conservação da água apoia habitats saudáveis."
  },
  {
    titulo: "Efeitos da Poluição nas Florestas",
    pergunta: `Qual tipo de poluição tem o impacto mais significativo nas florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Poluição sonora" },
      { id: 2, texto: "Poluição do solo" },
      { id: 3, texto: "Poluição luminosa" },
      { id: 4, texto: "Poluição térmica" },
      { id: 5, texto: "Poluição do ar" }
    ], 
    tipo: "outra",
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Poluição", "Florestas Tropicais"],
    fontes: [
      "1. Almeida, P. (2023). Impactos da Poluição nas Florestas Tropicais."
    ],
    vantagem: "Ganhe 3 pontos de sustentabilidade!",
    desvantagem: "Perde 2 pontos de conservação.",
    dica: "A poluição do ar afeta a saúde das florestas."
  },
  {
    titulo: "Gestão de Incêndios Florestais",
    pergunta: `Qual é a prática mais eficaz para a gestão de incêndios em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento do uso de combustível" },
      { id: 2, texto: "Extinção imediata de pequenos incêndios" },
      { id: 3, texto: "Queima controlada" },
      { id: 4, texto: "Construção de barreiras físicas" },
      { id: 5, texto: "Negligência dos focos de incêndio" }
    ], 
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Gestão de Incêndios", "Florestas Tropicais"],
    fontes: [
      "1. Pereira, M. (2023). Práticas de Gestão de Incêndios Florestais."
    ],
    vantagem: "Ganhe 5 pontos de controle!",
    desvantagem: "Perde 3 pontos de sustentabilidade.",
    dica: "A queima controlada ajuda a prevenir incêndios maiores."
  },
  {
    titulo: "Impactos da Desflorestação",
    pergunta: `Qual é uma das principais consequências da desflorestação nas regiões tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da cobertura florestal" },
      { id: 2, texto: "Diminuição da emissão de CO2" },
      { id: 3, texto: "Extinção de espécies nativas" },
      { id: 4, texto: "Melhoria da qualidade do solo" },
      { id: 5, texto: "Expansão de habitats naturais" }
    ], 
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Desflorestação", "Ecologia"],
    fontes: [
      "1. Silva, J. (2023). Consequências da Desflorestação em Regiões Tropicais."
    ],
    vantagem: "Ganhe 4 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "A desflorestação ameaça espécies nativas."
  },
{
    titulo: "Impacto das Mudanças Climáticas",
    pergunta: `Qual é uma das principais consequências das mudanças climáticas nas florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da biodiversidade" },
      { id: 2, texto: "Diminuição da frequência de incêndios" },
      { id: 3, texto: "Desertificação crescente" },
      { id: 4, texto: "Crescimento descontrolado de árvores" },
      { id: 5, texto: "Diminuição da fauna endêmica" }
    ],
    tipo: "outra",
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Mudanças Climáticas", "Florestas Tropicais"],
    fontes: [
      "1. Santos, T. (2023). Efeitos das Mudanças Climáticas nas Florestas Tropicais."
    ],
    vantagem: "Ganhe 5 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "A fauna nativa é sensível a mudanças climáticas."
  },
  {
    titulo: "Gestão de Recursos Hídricos",
    pergunta: `Qual é o maior desafio na gestão de recursos hídricos em áreas de floresta tropical?`,
    opcoes: [
      { id: 1, texto: "Excesso de água durante todo o ano" },
      { id: 2, texto: "Poluição industrial" },
      { id: 3, texto: "Evaporação lenta" },
      { id: 4, texto: "Desertificação rápida" },
      { id: 5, texto: "Inundações sazonais intensas" }
    ],
    tipo: "outra",
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Gestão de Recursos Hídricos", "Florestas Tropicais"],
    fontes: [
      "1. Oliveira, J. (2023). Desafios na Gestão de Recursos Hídricos em Florestas."
    ],
    vantagem: "Ganhe 4 pontos de gestão!",
    desvantagem: "Perde 2 pontos de sustentabilidade.",
    dica: "As inundações sazonais são comuns em áreas tropicais."
  },
  {
    titulo: "Conservação de Espécies Ameaçadas",
    pergunta: `Qual é a principal ameaça à sobrevivência de espécies ameaçadas em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Reprodução descontrolada" },
      { id: 2, texto: "Isolamento genético" },
      { id: 3, texto: "Interação com espécies exóticas" },
      { id: 4, texto: "Preservação do habitat" },
      { id: 5, texto: "Polinização excessiva" }
    ],
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Conservação", "Espécies Ameaçadas"],
    fontes: [
      "1. Silva, R. (2023). Conservação de Espécies Ameaçadas em Florestas Tropicais."
    ],
    vantagem: "Ganhe 6 pontos de conservação!",
    desvantagem: "Perde 4 pontos de biodiversidade.",
    dica: "Espécies isoladas enfrentam desafios genéticos."
  },
  {
    titulo: "Impacto de Pragas em Florestas",
    pergunta: `Qual é uma abordagem eficaz para mitigar os efeitos das pragas em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Uso de pesticidas químicos" },
      { id: 2, texto: "Introdução de predadores naturais" },
      { id: 3, texto: "Isolamento total das áreas afetadas" },
      { id: 4, texto: "Queima controlada de árvores" },
      { id: 5, texto: "Desmatamento seletivo" }
    ],
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Gestão de Pragas", "Florestas Tropicais"],
    fontes: [
      "1. Costa, A. (2023). Controle de Pragas em Florestas Tropicais."
    ],
    vantagem: "Ganhe 5 pontos de gestão!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "Predadores naturais ajudam no controle de pragas."
  },
  {
    titulo: "Conservação da Água em Ecossistemas Florestais",
    pergunta: `Qual é o maior benefício da conservação da água em ecossistemas florestais?`,
    opcoes: [
      { id: 1, texto: "Aumento da salinidade do solo" },
      { id: 2, texto: "Redução da biodiversidade aquática" },
      { id: 3, texto: "Manutenção de habitats aquáticos saudáveis" },
      { id: 4, texto: "Erosão acelerada do solo" },
      { id: 5, texto: "Poluição das fontes de água" }
    ],
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Conservação da Água", "Ecossistemas Florestais"],
    fontes: [
      "1. Mendes, G. (2023). Conservação da Água em Ecossistemas Florestais."
    ],
    vantagem: "Ganhe 4 pontos de conservação!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "A conservação da água apoia habitats saudáveis."
  },
  {
    titulo: "Efeitos da Poluição nas Florestas",
    pergunta: `Qual tipo de poluição tem o impacto mais significativo nas florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Poluição sonora" },
      { id: 2, texto: "Poluição do solo" },
      { id: 3, texto: "Poluição luminosa" },
      { id: 4, texto: "Poluição térmica" },
      { id: 5, texto: "Poluição do ar" }
    ],
    tipo: "outra",
    respostaCorreta: 5,
    dificuldade: "dificil",
    categorias: ["Poluição", "Florestas Tropicais"],
    fontes: [
      "1. Almeida, P. (2023). Impactos da Poluição nas Florestas Tropicais."
    ],
    vantagem: "Ganhe 3 pontos de sustentabilidade!",
    desvantagem: "Perde 2 pontos de conservação.",
    dica: "A poluição do ar afeta a saúde das florestas."
  },
  {
    titulo: "Gestão de Incêndios Florestais",
    pergunta: `Qual é a prática mais eficaz para a gestão de incêndios em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento do uso de combustível" },
      { id: 2, texto: "Extinção imediata de pequenos incêndios" },
      { id: 3, texto: "Queima controlada" },
      { id: 4, texto: "Construção de barreiras físicas" },
      { id: 5, texto: "Negligência dos focos de incêndio" }
    ],
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Gestão de Incêndios", "Florestas Tropicais"],
    fontes: [
      "1. Pereira, M. (2023). Práticas de Gestão de Incêndios Florestais."
    ],
    vantagem: "Ganhe 5 pontos de controle!",
    desvantagem: "Perde 3 pontos de sustentabilidade.",
    dica: "A queima controlada ajuda a prevenir incêndios maiores."
  },
  {
    titulo: "Impactos da Desflorestação",
    pergunta: `Qual é uma das principais consequências da desflorestação nas regiões tropicais?`,
    opcoes: [
      { id: 1, texto: "Aumento da cobertura florestal" },
      { id: 2, texto: "Diminuição da emissão de CO2" },
      { id: 3, texto: "Extinção de espécies nativas" },
      { id: 4, texto: "Melhoria da qualidade do solo" },
      { id: 5, texto: "Expansão de habitats naturais" }
    ],
    tipo: "outra",
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Desflorestação", "Ecologia"],
    fontes: [
      "1. Silva, J. (2023). Consequências da Desflorestação em Regiões Tropicais."
    ],
    vantagem: "Ganhe 4 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "A desflorestação ameaça espécies nativas."
  },
  {
    titulo: "Gestão de Ecossistemas de Manguezais",
    pergunta: `Qual é a maior ameaça aos ecossistemas de manguezais?`,
    opcoes: [
      { id: 1, texto: "Elevação do nível do mar" },
      { id: 2, texto: "Aumento da biodiversidade" },
      { id: 3, texto: "Poluição por nutrientes" },
      { id: 4, texto: "Expansão agrícola" },
      { id: 5, texto: "Aumento da cobertura vegetal" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Ecossistemas de Manguezais", "Conservação"],
    fontes: [
      "1. Costa, L. (2023). Gestão e Conservação de Manguezais."
    ],
    vantagem: "Ganhe 4 pontos de gestão de ecossistemas!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "O aumento do nível do mar afeta os manguezais."
  },
  {
    titulo: "Erosão e Conservação do Solo",
    pergunta: `Qual é uma estratégia eficaz para reduzir a erosão do solo em áreas florestais?`,
    opcoes: [
      { id: 1, texto: "Remoção de cobertura vegetal" },
      { id: 2, texto: "Plantio de árvores nativas" },
      { id: 3, texto: "Aumento da agricultura intensiva" },
      { id: 4, texto: "Construção de estradas de terra" },
      { id: 5, texto: "Drenagem de áreas úmidas" }
    ],
    tipo: "outra",
    respostaCorreta: 2,
    dificuldade: "dificil",
    categorias: ["Erosão do Solo", "Conservação"],
    fontes: [
      "1. Mendes, R. (2023). Técnicas de Conservação do Solo."
    ],
    vantagem: "Ganhe 3 pontos de conservação do solo!",
    desvantagem: "Perde 2 pontos de sustentabilidade.",
    dica: "Árvores nativas ajudam na conservação do solo."
  },
  {
    titulo: "Impacto do Desmatamento",
    pergunta: `Qual é o principal impacto ambiental do desmatamento em florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Perda de biodiversidade" },
      { id: 2, texto: "Aumento da cobertura florestal" },
      { id: 3, texto: "Redução do efeito estufa" },
      { id: 4, texto: "Melhoria do ciclo da água" },
      { id: 5, texto: "Redução da erosão do solo" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Desmatamento", "Impacto Ambiental"],
    fontes: [
      "1. Souza, A. (2023). Impactos do Desmatamento nas Florestas Tropicais."
    ],
    vantagem: "Ganhe 5 pontos de conservação!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "O desmatamento afeta diretamente a biodiversidade."
  },
  {
    titulo: "Conservação de Corredores Ecológicos",
    pergunta: `Qual é o principal benefício dos corredores ecológicos para a fauna?`,
    opcoes: [
      { id: 1, texto: "Facilitam a migração de espécies" },
      { id: 2, texto: "Aumentam a fragmentação de habitats" },
      { id: 3, texto: "Reduzem a conectividade entre áreas" },
      { id: 4, texto: "Aumentam a competição por recursos" },
      { id: 5, texto: "Promovem a exclusão de espécies" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Corredores Ecológicos", "Conservação"],
    fontes: [
      "1. Silva, M. (2023). Corredores Ecológicos e Conservação da Fauna."
    ],
    vantagem: "Ganhe 4 pontos de conectividade!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "Corredores ecológicos conectam habitats isolados."
  },
  {
    titulo: "Poluição do Ar e Florestas",
    pergunta: `Qual componente da poluição do ar é mais prejudicial às florestas?`,
    opcoes: [
      { id: 1, texto: "Dióxido de enxofre (SO2)" },
      { id: 2, texto: "Monóxido de carbono (CO)" },
      { id: 3, texto: "Metano (CH4)" },
      { id: 4, texto: "Ozônio (O3)" },
      { id: 5, texto: "Hélio (He)" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Poluição do Ar", "Florestas"],
    fontes: [
      "1. Mendes, F. (2023). Poluição do Ar e Impactos Florestais."
    ],
    vantagem: "Ganhe 3 pontos de sustentabilidade!",
    desvantagem: "Perde 2 pontos de conservação.",
    dica: "O SO2 causa chuvas ácidas, afetando as florestas."
  },
  {
    titulo: "Erosão e Conservação do Solo",
    pergunta: `Qual prática é mais eficaz na prevenção da erosão do solo em áreas florestais?`,
    opcoes: [
      { id: 1, texto: "Plantio em contorno" },
      { id: 2, texto: "Aragem intensiva" },
      { id: 3, texto: "Desmatamento completo" },
      { id: 4, texto: "Remoção de cobertura vegetal" },
      { id: 5, texto: "Uso de pesticidas químicos" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Erosão do Solo", "Conservação"],
    fontes: [
      "1. Almeida, J. (2023). Técnicas de Conservação do Solo em Florestas."
    ],
    vantagem: "Ganhe 5 pontos de conservação do solo!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "O plantio em contorno reduz o escoamento superficial."
  },
  {
    titulo: "Controle de Pragas em Florestas",
    pergunta: `Qual método é mais sustentável para controlar pragas em florestas?`,
    opcoes: [
      { id: 1, texto: "Controle biológico" },
      { id: 2, texto: "Uso de pesticidas químicos" },
      { id: 3, texto: "Queima descontrolada" },
      { id: 4, texto: "Destruição de habitats naturais" },
      { id: 5, texto: "Desmatamento total" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Controle de Pragas", "Sustentabilidade"],
    fontes: [
      "1. Costa, R. (2023). Métodos Sustentáveis de Controle de Pragas."
    ],
    vantagem: "Ganhe 4 pontos de sustentabilidade!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "O controle biológico usa predadores naturais para pragas."
  },
  {
    titulo: "Benefícios da Silvicultura Sustentável",
    pergunta: `Qual é o principal objetivo da silvicultura sustentável?`,
    opcoes: [
      { id: 1, texto: "Manter o equilíbrio ecológico" },
      { id: 2, texto: "Maximizar a produção de madeira" },
      { id: 3, texto: "Reduzir a biodiversidade" },
      { id: 4, texto: "Eliminar todas as espécies invasoras" },
      { id: 5, texto: "Promover monoculturas" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Silvicultura", "Sustentabilidade"],
    fontes: [
      "1. Pereira, L. (2023). Princípios da Silvicultura Sustentável."
    ],
    vantagem: "Ganhe 5 pontos de equilíbrio ecológico!",
    desvantagem: "Perde 3 pontos de biodiversidade.",
    dica: "O equilíbrio ecológico é central na silvicultura sustentável."
  },
  {
    titulo: "Impactos da Agricultura nas Florestas",
    pergunta: `Qual prática agrícola é menos danosa para as florestas tropicais?`,
    opcoes: [
      { id: 1, texto: "Agrofloresta" },
      { id: 2, texto: "Monocultura intensiva" },
      { id: 3, texto: "Desmatamento para pastagens" },
      { id: 4, texto: "Expansão de áreas agrícolas" },
      { id: 5, texto: "Uso de fertilizantes sintéticos" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Agricultura", "Florestas Tropicais"],
    fontes: [
      "1. Nunes, T. (2023). Práticas Agrícolas e Florestas Tropicais."
    ],
    vantagem: "Ganhe 4 pontos de sustentabilidade agrícola!",
    desvantagem: "Perde 2 pontos de biodiversidade.",
    dica: "A agrofloresta integra árvores e cultivos de maneira sustentável."
  },
  {
    titulo: "Conservação de Recursos Hídricos",
    pergunta: `Qual é a melhor prática para conservar recursos hídricos em ecossistemas florestais?`,
    opcoes: [
      { id: 1, texto: "Proteção de nascentes e corpos d'água" },
      { id: 2, texto: "Desvio de cursos d'água" },
      { id: 3, texto: "Remoção de vegetação ribeirinha" },
      { id: 4, texto: "Canalização de rios" },
      { id: 5, texto: "Construção de represas" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Recursos Hídricos", "Conservação"],
    fontes: [
      "1. Oliveira, F. (2023). Conservação de Recursos Hídricos em Florestas."
    ],
    vantagem: "Ganhe 5 pontos de conservação hídrica!",
    desvantagem: "Perde 3 pontos de sustentabilidade.",
    dica: "Proteger nascentes é crucial para a conservação hídrica."
  },
  {
    titulo: "Efeitos das Mudanças Climáticas nas Florestas",
    pergunta: `Qual é o maior efeito das mudanças climáticas nas florestas boreais?`,
    opcoes: [
      { id: 1, texto: "Degelo do permafrost" },
      { id: 2, texto: "Aumento da biodiversidade" },
      { id: 3, texto: "Diminuição da temperatura" },
      { id: 4, texto: "Expansão da cobertura de neve" },
      { id: 5, texto: "Estabilidade do ecossistema" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Mudanças Climáticas", "Florestas Boreais"],
    fontes: [
      "1. Almeida, G. (2023). Efeitos Climáticos nas Florestas Boreais."
    ],
    vantagem: "Ganhe 4 pontos de adaptação climática!",
    desvantagem: "Perde 2 pontos de sustentabilidade.",
    dica: "O permafrost é sensível ao aquecimento global."
  },
  {
    titulo: "Manejo de Incêndios Florestais",
    pergunta: `Qual técnica de manejo de incêndios é mais eficaz em florestas secas?`,
    opcoes: [
      { id: 1, texto: "Queima prescrita" },
      { id: 2, texto: "Proibição total de queimadas" },
      { id: 3, texto: "Uso de combustíveis fósseis" },
      { id: 4, texto: "Plantio de espécies inflamáveis" },
      { id: 5, texto: "Expansão de áreas de cultivo" }
    ],
    tipo: "outra",
    respostaCorreta: 1,
    dificuldade: "dificil",
    categorias: ["Manejo de Incêndios", "Florestas Secas"],
    fontes: [
      "1. Costa, D. (2023). Manejo de Incêndios em Florestas Secas."
    ],
    vantagem: "Ganhe 5 pontos de controle de incêndios!",
    desvantagem: "Perde 3 pontos de sustentabilidade.",
    dica: "A queima prescrita ajuda a controlar o acúmulo de combustível."
  }
];

export default cartas;
