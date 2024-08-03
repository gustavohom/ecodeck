// components/cartas.js

const cartas = [
  {
    titulo: "TESTE - Importância do Inventário Florestal",
    pergunta: `O inventário florestal é uma ferramenta essencial para entender a composição e o estado das florestas. Qual é o principal objetivo de realizar um inventário florestal? 
    
    <img src="/1.jpg" alt="Inventário Florestal" class="img-media my-4" />
    
    A importância do inventário florestal não pode ser subestimada. Ele permite que os gestores de recursos florestais tomem decisões informadas sobre a conservação, manejo e uso sustentável das florestas. O processo envolve a coleta de dados detalhados sobre a flora e fauna de uma área específica, bem como informações sobre a qualidade do solo e da água. Ao longo dos anos, o inventário florestal evoluiu para incorporar tecnologias avançadas, como sensoriamento remoto e sistemas de informações geográficas (SIG), que aumentam a precisão e a eficiência dos dados coletados.`,
    opcoes: [
      { id: 1, texto: "Avaliar o valor econômico das florestas" },
      { id: 2, texto: "Medir a altura das árvores" },
    ],
    respostaCorreta: [1,2],
    dificuldade: "normal",
    categorias: ["Inventário Florestal", "Conservação da Biodiversidade", "teste 1", "teste 2", "teste 3", "teste 4", "teste 5"],
    fontes: [
      "1. Silva, J. (2020). Fundamentos de Inventário Florestal.",
      "2. Almeida, F. (2019). Técnicas Modernas em Inventário Florestal.",
    ],
    vantagem: "Avance 2 casas no tabuleiro!",
    desvantagem: "Perde 1 ponto de progresso.",
    dica: "",
  },
  {
    titulo: "Práticas de Manejo Florestal Sustentável",
    pergunta: `O manejo florestal sustentável visa equilibrar as necessidades ecológicas, sociais e econômicas das florestas. Qual é uma prática comum em manejo florestal sustentável? 
    
    <img src="/2.jpg" alt="Manejo Florestal Sustentável" class="img-grande my-4" />
    
    O manejo florestal sustentável é uma abordagem holística que busca manter e melhorar a saúde a longo prazo das florestas enquanto satisfaz as necessidades humanas. Esta prática envolve o uso de técnicas como a silvicultura de ciclo longo, que permite que as árvores cresçam até uma maturidade plena antes de serem colhidas, garantindo assim que as florestas continuem a fornecer serviços ecossistêmicos essenciais. Outra prática é o manejo comunitário, onde as comunidades locais são envolvidas no processo de decisão e gestão das florestas, promovendo a equidade e o desenvolvimento sustentável.`,
    opcoes: [
      { id: 1, texto: "Desmatamento seletivo" },
      { id: 2, texto: "Plantio de monoculturas" },
      { id: 3, texto: "Restauração de ecossistemas degradados" },
      { id: 4, texto: "Uso de pesticidas químicos" },
    ],
    respostaCorreta: 3,
    dificuldade: "dificil",
    categorias: ["Manejo Florestal", "Desenvolvimento Sustentável"],
    fontes: [
      "1. Oliveira, A. (2021). Práticas de Manejo Florestal Sustentável.",
      "2. Pereira, G. (2018). Gestão Florestal para o Futuro.",
    ],
    vantagem: "Ganhe 3 pontos de sustentabilidade!",
    desvantagem: "Perca 2 pontos de sustentabilidade.",
    dica: "A restauração de ecossistemas é uma prática-chave em manejo sustentável.",
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
];

export default cartas;
