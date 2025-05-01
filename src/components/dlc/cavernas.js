const meu_baralho = [
  {
    "id": "new_1745788565347_cfa62e9fcd4a28",
    "tipo": "Outras",
    "titulo": "Caverna 1",
    "pergunta": "<!-- INÍCIO DO CÓDIGO DA CARTA INTERATIVA - CAVERNA LONGA FLORESTAL -->\n<style>\n/* Estilos Base (Reutilizados) */\n.cave-popup-lf { /* Sufixo -lf para Long Forest */\n  position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n  background-color: rgba(30, 41, 59, 0.85); /* Fundo mais escuro, tipo ardósia */\n  display: none; justify-content: center; align-items: center;\n  z-index: 1000; padding: 15px; box-sizing: border-box; text-align: center;\n}\n.cave-popup-lf:target { display: flex; }\n.cave-content-lf {\n  position: relative; background-color: #f1f5f9; /* Fundo ardósia claro */\n  padding: 25px 30px; border-radius: 10px; max-width: 550px; max-height: 90vh;\n  overflow-y: auto; box-shadow: 0 5px 20px rgba(0,0,0,0.3);\n  border: 3px solid #64748b; /* Borda ardósia média */\n}\n.cave-content-lf h5 {\n  margin-top: 0; margin-bottom: 18px; font-size: 1.3em; color: #1e293b; /* Ardósia escura */\n  border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;\n}\n.cave-content-lf p { margin-bottom: 15px; line-height: 1.6; color: #334155; font-size: 0.98em; }\n.cave-close-lf {\n  position: absolute; top: 10px; right: 15px; font-size: 26px; font-weight: bold;\n  color: #94a3b8; text-decoration: none; line-height: 1; cursor: pointer;\n}\n.cave-close-lf:hover { color: #475569; }\n\n/* Botões */\n.cave-start-btn-lf {\n  display: inline-block; padding: 12px 25px; background-color: #16a34a; /* Verde */\n  color: white; text-decoration: none; border-radius: 6px; margin-top: 15px;\n  font-weight: bold; border: none; cursor: pointer; transition: background-color 0.2s;\n  box-shadow: 0 3px 5px rgba(0,0,0,0.2);\n}\n.cave-start-btn-lf:hover { background-color: #15803d; }\n\n.cave-action-btn-lf {\n  display: inline-block; padding: 10px 18px; background-color: #3b82f6; /* Azul */\n  color: white; text-decoration: none; border-radius: 5px; margin: 8px 5px;\n  font-size: 0.9em; border: none; cursor: pointer; transition: background-color 0.2s;\n  min-width: 100px; /* Largura mínima */\n}\n.cave-action-btn-lf:hover { background-color: #2563eb; }\n\n.cave-final-btn-lf {\n   display: inline-block; padding: 10px 18px; background-color: #64748b; /* Ardósia média */\n  color: white; text-decoration: none; border-radius: 5px; margin: 8px 5px;\n  font-size: 0.9em; border: none; cursor: pointer; transition: background-color 0.2s;\n  min-width: 100px;\n}\n.cave-final-btn-lf:hover { background-color: #475569; }\n\n/* Estilo para Imagens */\n.cave-image {\n    display: block;\n    max-width: 80%; /* Largura máxima da imagem */\n    height: auto;\n    margin: 15px auto; /* Centralizar e dar espaço */\n    border-radius: 6px;\n    border: 2px solid #cbd5e1; /* Borda cinza claro */\n    box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n\n/* Estilos específicos para botões de risco/recompensa */\n.btn-success-lf { background-color: #22c55e; } /* Verde vivo */\n.btn-success-lf:hover { background-color: #16a34a; }\n.btn-warning-lf { background-color: #f59e0b; } /* Âmbar */\n.btn-warning-lf:hover { background-color: #d97706; }\n.btn-danger-lf { background-color: #ef4444; } /* Vermelho */\n.btn-danger-lf:hover { background-color: #dc2626; }\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você encontra a entrada de uma caverna escondida atrás de uma cachoeira densa. A placa diz: \"Caverna do Manejo Sustentável\".</p>\n<p style='text-align:center;'>🌳💧</p>\n<p style='text-align:center;'><a href=\"#caveLF-start\" class='cave-start-btn-lf'>Entrar na Caverna</a></p>\n\n<!-- Popups Escondidos -->\n\n<!-- Cena 1: Entrada e Primeira Escolha -->\n<div id=\"caveLF-start\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>Entrada da Caverna</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/bela-paisagem-de-uma-floresta-com-muitas-arvores-e-plantas-verdes_181624-15768.jpg?w=740\" alt=\"Entrada da Floresta\" class=\"cave-image\">\n    <p>O ar é úmido e cheira a terra molhada. Logo à frente, a trilha se bifurca. À <strong>esquerda</strong>, um caminho bem marcado, mas com sinais de desmatamento recente. À <strong>direita</strong>, uma trilha mais selvagem, coberta de musgo e raízes.</p>\n    <a href=\"#caveLF-desmatado\" class=\"cave-action-btn-lf btn-warning-lf\">Seguir Caminho Desmatado</a>\n    <a href=\"#caveLF-selvagem\" class=\"cave-action-btn-lf btn-success-lf\">Seguir Trilha Selvagem</a>\n  </div>\n</div>\n\n<!-- Ramo 1: Caminho Desmatado -->\n<div id=\"caveLF-desmatado\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>Área de Desmatamento</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/vista-aerea-de-uma-floresta-tropical-durante-o-dia_181624-8610.jpg?w=740\" alt=\"Área desmatada\" class=\"cave-image\">\n    <p>Você vê tocos de árvores e solo exposto. É mais fácil andar, mas a visão é desoladora. Você encontra um trator abandonado com a chave na ignição.</p>\n    <a href=\"#caveLF-trator\" class=\"cave-action-btn-lf\">Tentar ligar o trator</a>\n    <a href=\"#caveLF-ignora-trator\" class=\"cave-action-btn-lf\">Ignorar e seguir a pé</a>\n  </div>\n</div>\n\n<div id=\"caveLF-trator\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>\"Jeitinho Brasileiro\"</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/close-de-um-motor-de-trator_53876-31057.jpg?w=740\" alt=\"Motor de Trator\" class=\"cave-image\">\n    <p>O trator liga! Mas o barulho atrai fiscais ambientais escondidos. Você usou um equipamento de forma irregular!</p>\n    <p><strong>Efeito: Vá para a casa \"Jeitinho Brasileiro\"!</strong> (Penalidade específica do tabuleiro)</p>\n    <a href=\"#\" class=\"cave-final-btn-lf btn-danger-lf\">Aceitar Consequência</a>\n  </div>\n</div>\n\n<div id=\"caveLF-ignora-trator\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>Seguindo a Pé</h5>\n    <p>Você continua pela área aberta. Encontra uma mochila perdida por um dos trabalhadores ilegais. Dentro, há um mapa detalhado da região.</p>\n    <p><strong>Efeito: Ganhe um contador \"Mapa\"</strong> (Pode ser útil depois - informe o Mestre)</p>\n    <a href=\"#\" class=\"cave-final-btn-lf\">Pegar Mapa e Sair</a>\n  </div>\n</div>\n\n<!-- Ramo 2: Trilha Selvagem -->\n<div id=\"caveLF-selvagem\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>Trilha Selvagem</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/um-close-up-de-musgo-verde-brilhante-crescendo-em-uma-rocha_181624-58898.jpg?w=740\" alt=\"Trilha com Musgo\" class=\"cave-image\">\n    <p>A trilha é difícil, com raízes e pedras escorregadias cobertas de musgo. Você precisa ter cuidado. Você vê pegadas frescas de um animal grande e ouve um galho quebrando perto.</p>\n    <a href=\"#caveLF-investiga-animal\" class=\"cave-action-btn-lf btn-warning-lf\">Investigar o barulho</a>\n    <a href=\"#caveLF-continua-cauteloso\" class=\"cave-action-btn-lf\">Continuar cautelosamente</a>\n  </div>\n</div>\n\n<div id=\"caveLF-investiga-animal\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>Onça Pintada!</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/onca-pintada-perto-do-rio-pantanal-brasil_53876-62619.jpg?w=740\" alt=\"Onça Pintada\" class=\"cave-image\">\n    <p>Você dá de cara com uma onça pintada! Assustada, ela te arranha antes de fugir. Você se machucou.</p>\n    <p><strong>Efeito: Perca 2 estrelas!</strong> (Se não tiver, perca 15 progresso)</p>\n    <a href=\"#\" class=\"cave-final-btn-lf btn-danger-lf\">Recuar Ferido</a>\n  </div>\n</div>\n\n<div id=\"caveLF-continua-cauteloso\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>Travessia do Riacho</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/fluxo-da-agua-que-flui-em-uma-floresta_181624-14986.jpg?w=740\" alt=\"Riacho na Floresta\" class=\"cave-image\">\n    <p>Você chega a um riacho límpido. Do outro lado, vê uma clareira com mudas raras plantadas corretamente. Para atravessar, você pode tentar <strong>saltar sobre as pedras</strong> ou <strong>construir uma ponte improvisada</strong> com galhos caídos.</p>\n    <a href=\"#caveLF-salta-pedras\" class=\"cave-action-btn-lf\">Saltar nas Pedras</a>\n    <a href=\"#caveLF-constroi-ponte\" class=\"cave-action-btn-lf btn-success-lf\">Construir Ponte</a>\n  </div>\n</div>\n\n<div id=\"caveLF-salta-pedras\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>Escorregão!</h5>\n    <p>As pedras estavam mais lisas do que pareciam! Você cai na água e molha seus equipamentos.</p>\n    <p><strong>Efeito: Fique preso por 1 rodada</strong> (para secar tudo).</p>\n    <a href=\"#\" class=\"cave-final-btn-lf btn-warning-lf\">Esperar Secar</a>\n  </div>\n</div>\n\n<div id=\"caveLF-constroi-ponte\" class=\"cave-popup-lf\">\n  <div class=\"cave-content-lf\">\n    <a href=\"#\" class=\"cave-close-lf\">×</a>\n    <h5>Engenhosidade Florestal!</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/ponte-de-madeira-sobre-um-rio-cercado-por-uma-floresta-exuberante_181624-14778.jpg?w=740\" alt=\"Ponte Improvisada\" class=\"cave-image\">\n    <p>Com cuidado e usando os recursos naturais de forma sustentável, você constrói uma pequena ponte segura e atravessa. Na clareira, você identifica as mudas como uma espécie ameaçada!</p>\n    <p><strong>Efeito: Ganhe 2 Estrelas Fixas!</strong> (Pelo conhecimento e ação sustentável)</p>\n    <a href=\"#\" class=\"cave-final-btn-lf btn-success-lf\">Admirar e Sair</a>\n  </div>\n</div>\n\n<!-- Texto Final Geral -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>A aventura termina aqui. Clique na opção final para sair da caverna e aplicar o efeito no jogo.</p>\n<!-- FIM DO CÓDIGO DA CARTA INTERATIVA - CAVERNA LONGA FLORESTAL -->",
    "dificuldade": "facil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aceite as consequências da missão",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Completei a caverna"
      }
    ]
  },
  {
    "id": "new_1745789122635_45c3dbc4ba83d8",
    "tipo": "Outras",
    "titulo": "Caverna 2",
    "pergunta": "<!-- INÍCIO DA CARTA INTERATIVA - BOSQUE SUSSURRANTE -->\n<style>\n/* Estilos Base (Reutilizados ou Definidos se for a primeira vez) */\n.cave-popup-bs { /* Sufixo -bs para Bosque Sussurrante */\n  position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n  background-color: rgba(10, 100, 50, 0.85); /* Verde floresta escuro translúcido */\n  display: none; justify-content: center; align-items: center;\n  z-index: 1000; padding: 15px; box-sizing: border-box; text-align: center;\n  backdrop-filter: blur(2px);\n}\n.cave-popup-bs:target { display: flex; }\n.cave-content-bs {\n  position: relative; background-color: #f0fff4; /* Verde muito claro (Honeydew) */\n  padding: 25px 30px; border-radius: 10px; max-width: 600px; max-height: 90vh;\n  overflow-y: auto; box-shadow: 0 5px 20px rgba(0,0,0,0.3);\n  border: 4px solid #2f855a; /* Verde floresta médio */\n}\n.cave-content-bs h5 {\n  margin-top: 0; margin-bottom: 18px; font-size: 1.4em; color: #276749; /* Verde escuro */\n  border-bottom: 2px solid #9ae6b4; padding-bottom: 10px; font-family: 'Georgia', serif;\n}\n.cave-content-bs p { margin-bottom: 15px; line-height: 1.7; color: #2f855a; font-size: 1em; }\n.cave-close-bs {\n  position: absolute; top: 12px; right: 18px; font-size: 28px; font-weight: bold;\n  color: #9ae6b4; text-decoration: none; line-height: 1; cursor: pointer;\n}\n.cave-close-bs:hover { color: #48bb78; }\n\n/* Botões */\n.cave-start-btn-bs, .cave-action-btn-bs, .cave-final-btn-bs {\n  display: inline-block; padding: 10px 20px; color: white; text-decoration: none;\n  border-radius: 6px; margin: 8px 5px; font-size: 0.95em; font-weight: bold;\n  border: none; cursor: pointer; transition: background-color 0.2s, box-shadow 0.2s;\n  min-width: 120px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n}\n.cave-start-btn-bs:hover, .cave-action-btn-bs:hover, .cave-final-btn-bs:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.3); }\n.cave-start-btn-bs { background-color: #38a169; } /* Verde */\n.cave-start-btn-bs:hover { background-color: #2f855a; }\n.cave-action-btn-bs { background-color: #4299e1; } /* Azul */\n.cave-action-btn-bs:hover { background-color: #3182ce; }\n.cave-final-btn-bs { background-color: #a0aec0; } /* Cinza */\n.cave-final-btn-bs:hover { background-color: #718096; }\n\n/* Estilos específicos */\n.btn-success-bs { background-color: #48bb78; } .btn-success-bs:hover { background-color: #38a169; }\n.btn-warning-bs { background-color: #ecc94b; color: #744210;} .btn-warning-bs:hover { background-color: #d69e2e; }\n.btn-danger-bs { background-color: #f56565; } .btn-danger-bs:hover { background-color: #e53e3e; }\n.cave-image-bs { display: block; max-width: 85%; height: auto; margin: 18px auto; border-radius: 8px; border: 3px solid #9ae6b4; box-shadow: 0 3px 6px rgba(0,0,0,0.15); }\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você se aventura por um bosque antigo onde as árvores parecem sussurrar segredos. O caminho se estreita.</p>\n<p style='text-align:center;'>🌲✨</p>\n<p style='text-align:center;'><a href=\"#caveBS-start\" class='cave-start-btn-bs'>Avançar pelo Bosque</a></p>\n\n<!-- Popups Escondidos -->\n\n<!-- Cena 1: O Encontro com o Ent -->\n<div id=\"caveBS-start\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>O Guardião Ancestral</h5>\n    <img src=\"https://i.pinimg.com/originals/a0/95/1f/a0951fd83a9399751349174e7f8e8c5f.jpg\" alt=\"Um Ent imponente\" class=\"cave-image-bs\"> <!-- Substitua pela sua imagem de Ent -->\n    <p>Um gigantesco Ent, um espírito da floresta com forma de árvore, bloqueia o caminho. Seus olhos brilham com sabedoria antiga. Ele murmura: \"Viajante, para passar, deves provar teu respeito pela floresta. Qual tua área de especialização?\"</p>\n    <a href=\"#caveBS-silvicultura\" class=\"cave-action-btn-bs\">Silvicultura e Manejo</a>\n    <a href=\"#caveBS-ecologia\" class=\"cave-action-btn-bs\">Ecologia e Conservação</a>\n    <a href=\"#caveBS-tecnologia\" class=\"cave-action-btn-bs\">Tecnologia e Geoprocessamento</a>\n    <a href=\"#caveBS-tentar-enganar\" class=\"cave-action-btn-bs btn-warning-bs\">Tentar enganá-lo</a>\n  </div>\n</div>\n\n<!-- Ramo 1: Silvicultura -->\n<div id=\"caveBS-silvicultura\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Prova de Silvicultura</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/homem-asiatico-trabalhando-em-uma-serra_23-2150880111.jpg?w=740\" alt=\"Manejo florestal\" class=\"cave-image-bs\">\n    <p>O Ent aponta para uma área próxima com árvores jovens competindo por luz. \"Como garantirias o crescimento saudável destas futuras gigantes, sem desperdiçar os recursos da floresta?\"</p>\n    <a href=\"#caveBS-desbaste-seletivo\" class=\"cave-action-btn-bs\">Realizar desbaste seletivo e aproveitar madeira</a>\n    <a href=\"#caveBS-deixar-natureza\" class=\"cave-action-btn-bs\">Deixar a natureza seguir seu curso</a>\n  </div>\n</div>\n\n<div id=\"caveBS-desbaste-seletivo\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Manejo Inteligente</h5>\n    <p>\"Sábia decisão,\" ressoa o Ent. \"O manejo cuidadoso fortalece a floresta e provê recursos.\" Ele abre caminho.</p>\n    <p><strong>Efeito: Ganhe uma carta de jogador</strong> (Compre uma carta extra do monte do jogo)</p>\n    <a href=\"#\" class=\"cave-final-btn-bs btn-success-bs\">Avançar Aprovado</a>\n  </div>\n</div>\n\n<div id=\"caveBS-deixar-natureza\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Natureza Selvagem</h5>\n    <p>\"A inação nem sempre é a melhor ação,\" murmura o Ent, desapontado. \"Muitas destas árvores perecerão por falta de luz.\" Ele te deixa passar, mas com um olhar de reprovação.</p>\n    <p><strong>Efeito: Remova 3 das suas respostas CORRETAS acumuladas.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-bs btn-warning-bs\">Seguir com Menos Conhecimento</a>\n  </div>\n</div>\n\n<!-- Ramo 2: Ecologia -->\n<div id=\"caveBS-ecologia\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Prova de Ecologia</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/orquidea-selvagem-rara-crescendo-na-selva_181624-30026.jpg?w=740\" alt=\"Orquídea rara\" class=\"cave-image-bs\">\n    <p>O Ent mostra uma flor delicada e rara crescendo em um galho. \"Uma espécie sensível floresce aqui. Como protegerias seu habitat de perturbações externas?\"</p>\n    <a href=\"#caveBS-zona-tampao\" class=\"cave-action-btn-bs\">Criar zona de amortecimento e monitorar</a>\n    <a href=\"#caveBS-transplantar\" class=\"cave-action-btn-bs\">Tentar transplantar para local 'seguro'</a>\n  </div>\n</div>\n\n<div id=\"caveBS-zona-tampao\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Guardião do Habitat</h5>\n    <p>\"Proteger onde está é o caminho,\" aprova o Ent. \"A conservação in-situ preserva a teia da vida.\" Ele abre passagem.</p>\n    <p><strong>Efeito: Avance 5 casas no tabuleiro.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-bs btn-success-bs\">Prosseguir com Cuidado</a>\n  </div>\n</div>\n\n<div id=\"caveBS-transplantar\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Intervenção Arriscada</h5>\n    <p>\"Nem toda boa intenção leva a um bom resultado,\" lamenta o Ent. \"A delicada relação da flor com seu ambiente foi quebrada.\" A flor murcha em suas mãos.</p>\n    <p><strong>Efeito: Volte 5 casas no tabuleiro.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-bs btn-danger-bs\">Recuar Arrependido</a>\n  </div>\n</div>\n\n<!-- Ramo 3: Tecnologia -->\n<div id=\"caveBS-tecnologia\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Prova de Tecnologia</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/trabalhador-florestal-verificando-arvores-com-tablet-na-floresta_23-2148997520.jpg?w=740\" alt=\"Tecnologia na floresta\" class=\"cave-image-bs\">\n    <p>O Ent revela um mapa holográfico da floresta. \"Sensores indicam uma área com risco iminente de incêndio devido à seca. Como usarias a tecnologia para mitigar este risco?\"</p>\n    <a href=\"#caveBS-drone-map\" class=\"cave-action-btn-bs\">Mapeamento com drones e aceiros preventivos</a>\n    <a href=\"#caveBS-satelite-alert\" class=\"cave-action-btn-bs\">Monitoramento satelital e alerta rápido</a>\n  </div>\n</div>\n\n<div id=\"caveBS-drone-map\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Ação Preventiva</h5>\n    <p>\"A tecnologia a serviço da prevenção é valiosa,\" reconhece o Ent. \"Agir antes do fogo consumir é crucial.\" Ele te concede passagem.</p>\n    <p><strong>Efeito: Ganhe 1 contador \"Prevenção de Incêndio\"</strong> (Pode evitar uma futura penalidade - informe o Mestre)</p>\n    <a href=\"#\" class=\"cave-final-btn-bs btn-success-bs\">Continuar Preparado</a>\n  </div>\n</div>\n\n<div id=\"caveBS-satelite-alert\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Alerta Atrasado?</h5>\n    <p>\"Observar é importante, mas agir é vital,\" pondera o Ent. \"O alerta pode chegar tarde demais.\" Ele te deixa passar, mas sua confiança parece abalada.</p>\n    <p><strong>Efeito: Remova 3 das suas respostas ERRADAS acumuladas.</strong> (Você aprendeu algo, mas a ação direta era melhor).</p>\n    <a href=\"#\" class=\"cave-final-btn-bs btn-warning-bs\">Seguir com Menos Erros</a>\n  </div>\n</div>\n\n<!-- Ramo 4: Tentar Enganar -->\n<div id=\"caveBS-tentar-enganar\" class=\"cave-popup-bs\">\n  <div class=\"cave-content-bs\">\n    <a href=\"#\" class=\"cave-close-bs\">×</a>\n    <h5>Insulto à Sabedoria</h5>\n    <p>Você tenta balbuciar termos técnicos aleatórios. O Ent estreita os olhos, galhos rangem ameaçadoramente. \"A floresta não tolera falsidade!\"</p>\n    <p><strong>Efeito: Vá para a Cadeia!</strong> (Penalidade do Tabuleiro)</p>\n    <a href=\"#\" class=\"cave-final-btn-bs btn-danger-lf\">Ser Levado Preso</a>\n  </div>\n</div>\n\n<!-- Texto Final Geral -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Sua interação com o Guardião termina. Clique no botão final e aplique o efeito.</p>\n<!-- FIM DA CARTA INTERATIVA - BOSQUE SUSSURRANTE -->",
    "dificuldade": "facil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aceite as consequências",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Completei a caverna"
      }
    ]
  },
  {
    "id": "new_1745789240630_6cf331cd2d0368",
    "tipo": "Outras",
    "titulo": "Caverna 3",
    "pergunta": "<!-- INÍCIO DA CARTA INTERATIVA - LABORATÓRIO DE MICORRIZAS -->\n<style>\n/* Estilos Base (Reutilizados ou Definidos) */\n.cave-popup-lm { /* Sufixo -lm para Lab Micorrizas */\n  position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n  background-color: rgba(80, 40, 120, 0.85); /* Roxo escuro translúcido */\n  display: none; justify-content: center; align-items: center;\n  z-index: 1000; padding: 15px; box-sizing: border-box; text-align: center;\n  backdrop-filter: blur(2px);\n}\n.cave-popup-lm:target { display: flex; }\n.cave-content-lm {\n  position: relative; background-color: #e9d5ff; /* Roxo muito claro */\n  padding: 25px 30px; border-radius: 10px; max-width: 600px; max-height: 90vh;\n  overflow-y: auto; box-shadow: 0 5px 20px rgba(0,0,0,0.3);\n  border: 4px solid #7e22ce; /* Roxo médio */\n}\n.cave-content-lm h5 {\n  margin-top: 0; margin-bottom: 18px; font-size: 1.4em; color: #581c87; /* Roxo escuro */\n  border-bottom: 2px solid #c084fc; padding-bottom: 10px; font-family: 'Trebuchet MS', sans-serif;\n}\n.cave-content-lm p { margin-bottom: 15px; line-height: 1.7; color: #6b21a8; font-size: 1em; }\n.cave-close-lm {\n  position: absolute; top: 12px; right: 18px; font-size: 28px; font-weight: bold;\n  color: #c084fc; text-decoration: none; line-height: 1; cursor: pointer;\n}\n.cave-close-lm:hover { color: #9333ea; }\n\n/* Botões */\n.cave-start-btn-lm, .cave-action-btn-lm, .cave-final-btn-lm {\n  display: inline-block; padding: 10px 20px; color: white; text-decoration: none;\n  border-radius: 6px; margin: 8px 5px; font-size: 0.95em; font-weight: bold;\n  border: none; cursor: pointer; transition: background-color 0.2s, box-shadow 0.2s;\n  min-width: 120px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n}\n.cave-start-btn-lm:hover, .cave-action-btn-lm:hover, .cave-final-btn-lm:hover { box-shadow: 0 4px 8px rgba(0,0,0,0.3); }\n.cave-start-btn-lm { background-color: #7e22ce; } /* Roxo */\n.cave-start-btn-lm:hover { background-color: #6b21a8; }\n.cave-action-btn-lm { background-color: #3b82f6; } /* Azul */\n.cave-action-btn-lm:hover { background-color: #2563eb; }\n.cave-final-btn-lm { background-color: #a855f7; } /* Roxo claro */\n.cave-final-btn-lm:hover { background-color: #9333ea; }\n\n/* Estilos específicos */\n.btn-success-lm { background-color: #84cc16; } /* Verde lima */ .btn-success-lm:hover { background-color: #65a30d; }\n.btn-danger-lm { background-color: #ef4444; } /* Vermelho */ .btn-danger-lm:hover { background-color: #dc2626; }\n.cave-image-lm { display: block; max-width: 70%; height: auto; margin: 18px auto; border-radius: 50%; border: 4px dotted #c084fc; box-shadow: 0 0 15px rgba(192, 132, 252, 0.5); }\n.choice-text { font-style: italic; color: #7e22ce; margin-top: -10px; margin-bottom: 20px; display: block;}\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você descobre uma passagem secreta sob as raízes de um Jequitibá-Rei. Dentro, um laboratório brilhante com fungos bioluminescentes.</p>\n<p style='text-align:center;'>🍄🔬✨</p>\n<p style='text-align:center;'><a href=\"#caveLM-start\" class='cave-start-btn-lm'>Investigar o Laboratório</a></p>\n\n<!-- Popups Escondidos -->\n\n<!-- Cena 1: O Laboratório e o Desafio -->\n<div id=\"caveLM-start\" class=\"cave-popup-lm\">\n  <div class=\"cave-content-lm\">\n    <a href=\"#\" class=\"cave-close-lm\">×</a>\n    <h5>Laboratório de Micorrizas</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/cogumelos-magicos-de-neon-brilhantes-em-uma-floresta-escura_76964-12308.jpg?w=740\" alt=\"Fungos brilhantes\" class=\"cave-image-lm\">\n    <p>Frascos borbulham e redes de micélio pulsam com luz. Uma voz etérea ecoa: \"Bem-vindo, estudioso da simbiose. Para provar seu valor, complete minha pesquisa: qual o impacto de um fungicida de amplo espectro nas redes micorrízicas e na saúde geral do ecossistema?\"</p>\n    <a href=\"#caveLM-impacto-negativo\" class=\"cave-action-btn-lm\">Impacto altamente negativo</a>\n    <a href=\"#caveLM-impacto-positivo\" class=\"cave-action-btn-lm\">Impacto positivo ou neutro</a>\n  </div>\n</div>\n\n<!-- Resposta Correta -->\n<div id=\"caveLM-impacto-negativo\" class=\"cave-popup-lm\">\n  <div class=\"cave-content-lm\">\n    <a href=\"#\" class=\"cave-close-lm\">×</a>\n    <h5>Compreensão da Rede</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/conexao-de-rede-global-de-negocios-tecnologia-de-internet-iot-elemento-desta-imagem-fornecida-pela-nasa_53876-128509.jpg?w=740\" alt=\"Rede Conectada\" class=\"cave-image-lm\">\n    <p>\"Correto!\" ecoa a voz. \"A destruição indiscriminada da vida fúngica rompe a teia vital que nutre a floresta.\" Uma porta adornada com cogumelos se abre.</p>\n    <p>Você entra em uma sala com um mapa estelar e uma alavanca...</p>\n    <a href=\"#caveLM-mapa-estelar\" class=\"cave-action-btn-lm btn-success-lm\">Examinar Mapa Estelar</a>\n    <a href=\"#caveLM-puxar-alavanca\" class=\"cave-action-btn-lm btn-warning-lm\">Puxar Alavanca</a>\n  </div>\n</div>\n\n<!-- Resposta Incorreta -->\n<div id=\"caveLM-impacto-positivo\" class=\"cave-popup-lm\">\n  <div class=\"cave-content-lm\">\n    <a href=\"#\" class=\"cave-close-lm\">×</a>\n    <h5>Visão Limitada</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/solo-esteril-e-rachado-em-clima-quente_1048944-25928939.jpg?w=740\" alt=\"Solo Rachado\" class=\"cave-image-lm\">\n    <p>\"Sua compreensão é superficial,\" lamenta a voz. \"Ignorar a importância dos fungos é ignorar a base da saúde do solo.\" Esporos soníferos são liberados no ar.</p>\n    <p><strong>Efeito: Escolha um jogador (pode ser você mesmo) para ficar 2 rodadas sem jogar.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-lm btn-danger-lm\">Cair no Sono</a>\n  </div>\n</div>\n\n<!-- Ramo Correto: Sub-escolha -->\n<div id=\"caveLM-mapa-estelar\" class=\"cave-popup-lm\">\n  <div class=\"cave-content-lm\">\n    <a href=\"#\" class=\"cave-close-lm\">×</a>\n    <h5>Conexão Cósmica</h5>\n     <img src=\"https://img.freepik.com/fotos-premium/via-lactea-com-estrelas-e-poeira-espacial-no-universo_670382-67849.jpg?w=740\" alt=\"Mapa Estelar\" class=\"cave-image-lm\">\n    <p>O mapa mostra constelações ligadas por finas linhas de luz, similar à rede micorrízica. Você sente uma compreensão profunda sobre a interconexão universal.</p>\n    <p><strong>Efeito: Ganhe 2 estrelas fixas!</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-lm btn-success-lm\">Sair Iluminado</a>\n  </div>\n</div>\n\n<div id=\"caveLM-puxar-alavanca\" class=\"cave-popup-lm\">\n  <div class=\"cave-content-lm\">\n    <a href=\"#\" class=\"cave-close-lm\">×</a>\n    <h5>Transporte Inesperado!</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/aviao-de-passageiros-voando-acima-das-nuvens-em-dramatica-luz-do-por-do-sol_176474-6918.jpg?w=740\" alt=\"Avião no Céu\" class=\"cave-image-lm\">\n    <p>Ao puxar a alavanca, o chão sob seus pés some! Você é teleportado para o alto!</p>\n    <p><strong>Efeito: Role o dado e vá para a casa \"Avião\"!</strong> (Movimento especial do tabuleiro)</p>\n    <a href=\"#\" class=\"cave-final-btn-lm btn-warning-lm\">Aceitar o Teleporte</a>\n  </div>\n</div>\n\n<!-- Texto Final Geral -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Suas escolhas no laboratório definiram seu destino. Clique no botão final.</p>\n<!-- FIM DA CARTA INTERATIVA - LABORATÓRIO DE MICORRIZAS -->",
    "dificuldade": "facil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aceite as consequências",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Completei a caverna"
      }
    ]
  },
  {
    "id": "new_1745789410778_07dcba5dd889a8",
    "tipo": "Outras",
    "titulo": "Caverna 4",
    "pergunta": "<!-- INÍCIO DA CARTA INTERATIVA - DILEMA DO GRIFO -->\n<style>\n/* Estilos Base (Reutilizados ou Definidos) */\n.cave-popup-dg { /* Sufixo -dg para Dilema Grifo */\n  position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n  background-color: rgba(200, 180, 140, 0.85); /* Bege/Areia translúcido */\n  display: none; justify-content: center; align-items: center;\n  z-index: 1000; padding: 15px; box-sizing: border-box; text-align: center;\n  backdrop-filter: blur(1px);\n}\n.cave-popup-dg:target { display: flex; }\n.cave-content-dg {\n  position: relative; background-color: #fdf6e3; /* Creme (Solarized Light) */\n  padding: 25px 30px; border-radius: 10px; max-width: 650px; max-height: 90vh;\n  overflow-y: auto; box-shadow: 0 5px 20px rgba(0,0,0,0.2);\n  border: 4px solid #b58900; /* Ouro velho (Solarized Yellow) */\n}\n.cave-content-dg h5 {\n  margin-top: 0; margin-bottom: 18px; font-size: 1.4em; color: #856700; /* Ouro escuro */\n  border-bottom: 2px solid #eee8d5; padding-bottom: 10px; font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;\n}\n.cave-content-dg p { margin-bottom: 15px; line-height: 1.7; color: #586e75; font-size: 1em; } /* Cinza azulado */\n.cave-close-dg {\n  position: absolute; top: 12px; right: 18px; font-size: 28px; font-weight: bold;\n  color: #93a1a1; text-decoration: none; line-height: 1; cursor: pointer;\n}\n.cave-close-dg:hover { color: #657b83; }\n\n/* Botões */\n.cave-start-btn-dg, .cave-action-btn-dg, .cave-final-btn-dg, .benefit-option-dg {\n  display: inline-block; padding: 10px 20px; color: white; text-decoration: none;\n  border-radius: 6px; margin: 8px 5px; font-size: 0.95em; font-weight: bold;\n  border: none; cursor: pointer; transition: background-color 0.2s, box-shadow 0.2s, transform 0.1s;\n  min-width: 120px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n}\n.cave-start-btn-dg:hover, .cave-action-btn-dg:hover, .cave-final-btn-dg:hover, .benefit-option-dg:hover {\n  box-shadow: 0 4px 8px rgba(0,0,0,0.3); transform: translateY(-1px);\n}\n.cave-start-btn-dg { background-color: #b58900; } /* Ouro velho */\n.cave-start-btn-dg:hover { background-color: #856700; }\n.cave-action-btn-dg { background-color: #268bd2; } /* Azul Solarized */\n.cave-action-btn-dg:hover { background-color: #2070a8; }\n.cave-final-btn-dg { background-color: #839496; } /* Cinza Solarized */\n.cave-final-btn-dg:hover { background-color: #657b83; }\n\n/* Estilos específicos */\n.btn-success-dg { background-color: #859900; } /* Verde Solarized */ .btn-success-dg:hover { background-color: #6d7f00; }\n.btn-danger-dg { background-color: #dc322f; } /* Vermelho Solarized */ .btn-danger-dg:hover { background-color: #b32825; }\n.cave-image-dg { display: block; max-width: 60%; height: auto; margin: 18px auto; border-radius: 50%; border: 5px ridge #b58900; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }\n.benefit-option-dg {\n    background-color: #eee8d5; /* Base3 Solarized */\n    color: #586e75; /* Base00 Solarized */\n    border: 2px dashed #93a1a1;\n    width: 80%; /* Ocupa mais largura */\n    margin: 10px auto; /* Centraliza */\n    display: block; /* Empilha */\n}\n.benefit-option-dg:hover { border-color: #2aa198; background-color: #fdf6e3; } /* Ciano e Base3 */\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você escala uma montanha e encontra um ninho colossal. Um Grifo majestoso, com penas douradas e garras de obsidiana, guarda a passagem.</p>\n<p style='text-align:center;'>🦅🦁</p>\n<p style='text-align:center;'><a href=\"#caveDG-start\" class='cave-start-btn-dg'>Aproximar-se do Grifo</a></p>\n\n<!-- Popups Escondidos -->\n\n<!-- Cena 1: O Grifo Fiscalizador -->\n<div id=\"caveDG-start\" class=\"cave-popup-dg\">\n  <div class=\"cave-content-dg\">\n    <a href=\"#\" class=\"cave-close-dg\">×</a>\n    <h5>O Guardião Alado</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/grifo-fantastico-com-grandes-asas-em-um-fundo-cinza_1048944-27053288.jpg?w=740\" alt=\"Grifo majestoso\" class=\"cave-image-dg\"> <!-- Substitua pela sua imagem de Grifo -->\n    <p>\"Halt, mortal!\" troveja o Grifo, seus olhos como âmbar derretido. \"Este cume é protegido. Vejo em sua jornada tanto ações de preservação quanto de exploração. A balança está equilibrada... por ora. Você deve escolher um caminho que definirá seu legado florestal.\"</p>\n    <a href=\"#caveDG-preservar\" class=\"cave-action-btn-dg btn-success-dg\">Priorizar preservação total (ignorar recursos)</a>\n    <a href=\"#caveDG-manejo\" class=\"cave-action-btn-dg\">Buscar manejo sustentável (equilíbrio)</a>\n    <a href=\"#caveDG-explorar\" class=\"cave-action-btn-dg btn-danger-dg\">Maximizar exploração (ignorar longo prazo)</a>\n  </div>\n</div>\n\n<!-- Ramo 1: Preservação Total -->\n<div id=\"caveDG-preservar\" class=\"cave-popup-dg\">\n  <div class=\"cave-content-dg\">\n    <a href=\"#\" class=\"cave-close-dg\">×</a>\n    <h5>O Santuário Intocado</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/vista-da-majestosa-cordilheira-coberta-de-neve-sob-o-ceu-nublado_181624-27018.jpg?w=740\" alt=\"Montanha intocada\" class=\"cave-image-dg\">\n    <p>\"Nobre, porém ingênuo,\" diz o Grifo, com um toque de tristeza. \"A floresta vive e respira, e o manejo sábio pode fortalecê-la. Sua inação, embora bem-intencionada, pode levar à estagnação.\"</p>\n    <p>Ele te permite passar, mas você sente que perdeu uma oportunidade de aprendizado.</p>\n    <p><strong>Efeito: Perca 1 contador (escolha qual, se tiver algum).</strong> Se não tiver, perca 10 de progresso.</p>\n    <a href=\"#\" class=\"cave-final-btn-dg\">Seguir o Caminho da Pureza</a>\n  </div>\n</div>\n\n<!-- Ramo 2: Manejo Sustentável (Leva à Escolha de Benefício) -->\n<div id=\"caveDG-manejo\" class=\"cave-popup-dg\">\n  <div class=\"cave-content-dg\">\n    <a href=\"#\" class=\"cave-close-dg\">×</a>\n    <h5>A Busca pelo Equilíbrio</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/close-up-em-plantas-verdes-exoticas-na-natureza_23-2150878473.jpg?w=740\" alt=\"Equilíbrio na natureza\" class=\"cave-image-dg\">\n    <p>\"Ah, um verdadeiro engenheiro florestal!\" exclama o Grifo, suas penas eriçando de aprovação. \"Compreender que a floresta pode prosperar JUNTO à humanidade, através do respeito e da ciência, é a chave.\"</p>\n    <p>\"Por sua sabedoria, ofereço-lhe uma bênção. Escolha sabiamente, pois cada dádiva molda seu caminho:\"</p>\n    <!-- Opções de Benefício -->\n    <a href=\"#caveDG-benefit-stars\" class='benefit-option-dg'>🌟 Bênção da Sorte (+2 Estrelas Fixas)</a>\n    <a href=\"#caveDG-benefit-card\" class='benefit-option-dg'>🃏 Dádiva do Conhecimento (Ganhe uma carta de jogador)</a>\n    <a href=\"#caveDG-benefit-skip\" class='benefit-option-dg'>✈️ Voo do Grifo (Role o dado e vá para casa Avião)</a>\n  </div>\n</div>\n\n<!-- Ramo 3: Exploração Máxima -->\n<div id=\"caveDG-explorar\" class=\"cave-popup-dg\">\n  <div class=\"cave-content-dg\">\n    <a href=\"#\" class=\"cave-close-dg\">×</a>\n    <h5>Ganância Desenfreada</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/foto-aerea-de-uma-area-florestal-parcialmente-desmatada_181624-4886.jpg?w=740\" alt=\"Exploração excessiva\" class=\"cave-image-dg\">\n    <p>\"Tolo!\" ruge o Grifo, batendo as asas e levantando poeira. \"Sua ganância cega a visão do futuro! A floresta oferece muito, mas exige respeito em troca. Você falhou no teste!\"</p>\n    <p>Com uma rajada de vento, ele te joga montanha abaixo.</p>\n    <p><strong>Efeito: Perca 2 estrelas E volte 5 casas!</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-dg btn-danger-dg\">Cair em Desgraça</a>\n  </div>\n</div>\n\n<!-- Popups Finais da Escolha de Benefício -->\n<div id=\"caveDG-benefit-stars\" class=\"cave-popup-dg\">\n  <div class=\"cave-content-dg\">\n    <a href=\"#\" class=\"cave-close-dg\">×</a>\n    <h5>Bênção da Sorte Recebida!</h5>\n    <p>As estrelas parecem brilhar mais intensamente para você.</p>\n    <p><strong>Efeito: +2 Estrelas Fixas</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-dg btn-success-dg\">Agradecer e Seguir</a>\n  </div>\n</div>\n\n<div id=\"caveDG-benefit-card\" class=\"cave-popup-dg\">\n  <div class=\"cave-content-dg\">\n    <a href=\"#\" class=\"cave-close-dg\">×</a>\n    <h5>Dádiva do Conhecimento Recebida!</h5>\n    <p>Um pergaminho antigo materializa-se em suas mãos.</p>\n    <p><strong>Efeito: Ganhe uma carta de jogador</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-dg btn-success-dg\">Agradecer e Seguir</a>\n  </div>\n</div>\n\n<div id=\"caveDG-benefit-skip\" class=\"cave-popup-dg\">\n  <div class=\"cave-content-dg\">\n    <a href=\"#\" class=\"cave-close-dg\">×</a>\n    <h5>Voo do Grifo Concedido!</h5>\n    <p>O Grifo te oferece uma pena dourada que te impulsiona aos céus!</p>\n    <p><strong>Efeito: Role o dado e vá para casa Avião</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-dg btn-success-dg\">Agradecer e Voar</a>\n  </div>\n</div>\n\n<!-- Texto Final Geral -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>O Grifo observa sua partida. Clique na sua escolha final e aplique o efeito.</p>\n<!-- FIM DA CARTA INTERATIVA - DILEMA DO GRIFO -->",
    "dificuldade": "facil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aceite as conseqências",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Completei a caverna",
        "ordemTemp": ""
      }
    ]
  },
  {
    "id": "new_1745790134411_a7576d98f1a738",
    "tipo": "Outras",
    "titulo": "Caverna 5",
    "pergunta": "<!-- INÍCIO DA CARTA INTERATIVA - FENDA TELÚRICA -->\n<style>\n/* Estilos Base (Adaptados para Fenda Telúrica) */\n.cave-popup-ft { /* Sufixo -ft para Fenda Telúrica */\n  position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n  background-color: rgba(60, 50, 40, 0.9); /* Marrom terra escuro translúcido */\n  display: none; justify-content: center; align-items: center;\n  z-index: 1000; padding: 15px; box-sizing: border-box; text-align: center;\n  backdrop-filter: blur(2px);\n}\n.cave-popup-ft:target { display: flex; }\n.cave-content-ft {\n  position: relative; background-color: #fffbeb; /* Amarelo muito pálido (Amber 50) */\n  padding: 25px 30px; border-radius: 10px; max-width: 680px; max-height: 90vh;\n  overflow-y: auto; box-shadow: 0 6px 25px rgba(0,0,0,0.35);\n  border: 5px solid #a16207; /* Amarelo/Ocre escuro */\n  color: #78350f; /* Marrom escuro */\n}\n.cave-content-ft h5 {\n  margin-top: 0; margin-bottom: 20px; font-size: 1.6em; color: #854d0e; /* Marrom médio */\n  border-bottom: 2px solid #fcd34d; padding-bottom: 12px; font-family: 'Times New Roman', Times, serif;\n  text-shadow: 1px 1px 1px #fff;\n}\n.cave-content-ft p { margin-bottom: 18px; line-height: 1.7; font-size: 1.05em; }\n.cave-close-ft {\n  position: absolute; top: 10px; right: 15px; font-size: 30px; font-weight: bold;\n  color: #d97706; text-decoration: none; line-height: 1; cursor: pointer;\n  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);\n}\n.cave-close-ft:hover { color: #b45309; }\n\n/* Botões */\n.cave-start-btn-ft, .cave-action-btn-ft, .cave-final-btn-ft, .benefit-option-ft {\n  display: inline-block; padding: 12px 22px; color: white; text-decoration: none;\n  border-radius: 8px; margin: 8px 6px; font-size: 1em; font-weight: 600;\n  border: none; cursor: pointer; transition: all 0.2s ease-in-out;\n  min-width: 150px; box-shadow: 0 3px 6px rgba(0,0,0,0.2);\n  border-bottom: 3px solid rgba(0,0,0,0.3); /* Efeito 3D leve */\n}\n.cave-start-btn-ft:hover, .cave-action-btn-ft:hover, .cave-final-btn-ft:hover, .benefit-option-ft:hover {\n   box-shadow: 0 5px 10px rgba(0,0,0,0.3); transform: translateY(-2px); border-bottom-width: 5px;\n}\n.cave-start-btn-ft:active, .cave-action-btn-ft:active, .cave-final-btn-ft:active, .benefit-option-ft:active {\n    transform: translateY(1px); box-shadow: 0 1px 3px rgba(0,0,0,0.3); border-bottom-width: 3px;\n}\n.cave-start-btn-ft { background-color: #854d0e; border-bottom-color: #522e00; } /* Marrom */\n.cave-start-btn-ft:hover { background-color: #78350f; }\n.cave-action-btn-ft { background-color: #1d4ed8; border-bottom-color: #1e3a8a; } /* Azul forte */\n.cave-action-btn-ft:hover { background-color: #1e40af; }\n.cave-final-btn-ft { background-color: #4b5563; border-bottom-color: #1f2937; } /* Cinza escuro */\n.cave-final-btn-ft:hover { background-color: #374151; }\n\n/* Estilos específicos */\n.btn-success-ft { background-color: #16a34a; border-bottom-color: #14532d;} .btn-success-ft:hover { background-color: #15803d; }\n.btn-warning-ft { background-color: #d97706; border-bottom-color: #7c2d12; color: #fff;} .btn-warning-ft:hover { background-color: #b45309; }\n.btn-danger-ft { background-color: #dc2626; border-bottom-color: #7f1d1d;} .btn-danger-ft:hover { background-color: #b91c1c; }\n.cave-image-ft { display: block; max-width: 80%; height: auto; margin: 20px auto; border-radius: 8px; border: 4px solid #ca8a04; box-shadow: 0 5px 15px rgba(0,0,0,0.25); }\n.benefit-option-ft {\n    background-color: #fef3c7; /* Ambar 100 */\n    color: #78350f; /* Marrom escuro */\n    border: 2px dashed #fcd34d; /* Ambar 300 */\n    width: 90%; margin: 12px auto; display: block;\n}\n.benefit-option-ft:hover { border-color: #fbbf24; background-color: #fffbeb; } /* Ambar 400 */\n\n/* Estilos para o enigma das runas */\n.rune-puzzle-area { padding: 15px; margin-top: 15px; background-color: rgba(0,0,0,0.05); border-radius: 8px; }\n.rune-display { font-size: 2.5em; margin-bottom: 15px; font-family: 'Courier New', monospace; letter-spacing: 10px; color: #ca8a04; text-shadow: 1px 1px #fff; }\n.rune-input { width: 80%; max-width: 250px; padding: 10px; margin-bottom: 15px; border: 2px solid #d97706; border-radius: 4px; font-size: 1.1em; text-align: center; text-transform: uppercase; }\n.rune-submit-btn { /* Estilo igual aos botões de ação */ }\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>O chão treme levemente. Uma fenda se abre, revelando uma escadaria que desce para as profundezas da terra. O ar que sobe tem um cheiro antigo e terroso.</p>\n<p style='text-align:center;'>🌍⬇️❓</p>\n<p style='text-align:center;'><a href=\"#caveFT-start\" class='cave-start-btn-ft'>Descer pela Fenda Telúrica</a></p>\n\n<!-- Popups Escondidos -->\n\n<!-- Cena 1: A Descida e os Caminhos -->\n<div id=\"caveFT-start\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Profundezas da Terra</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/escada-de-pedra-escura-que-desce-em-um-porao-escuro_181624-22905.jpg?w=740\" alt=\"Escadaria subterrânea\" class=\"cave-image-ft\">\n    <p>Após uma longa descida, você chega a uma vasta caverna iluminada por geodos pulsantes. Raízes grossas como troncos atravessam o teto e mergulham no solo. O caminho se divide: seguir um veio de água cristalina que corre por um túnel polido (<strong>Caminho Hídrico</strong>) ou adentrar um bosque de cogumelos gigantes e musgos fosforescentes (<strong>Caminho Bioluminescente</strong>).</p>\n    <a href=\"#caveFT-waterPath\" class=\"cave-action-btn-ft\">Seguir Caminho Hídrico</a>\n    <a href=\"#caveFT-bioPath\" class=\"cave-action-btn-ft\">Seguir Caminho Bioluminescente</a>\n  </div>\n</div>\n\n<!-- Ramo 1: Caminho Hídrico -->\n<div id=\"caveFT-waterPath\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Aquífero Ancestral</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/formacoes-rochosas-incomuns-na-caverna_23-2150759694.jpg?w=740\" alt=\"Rio cristalino subterrâneo\" class=\"cave-image-ft\">\n    <p>A água é incrivelmente pura. Peixes cegos e transparentes nadam nela. A correnteza leva a uma câmara onde a água despenca em uma cachoeira subterrânea. Você pode tentar <strong>escalar cuidadosamente ao lado da cachoeira</strong> ou procurar por <strong>uma passagem escondida atrás da queda d'água</strong>.</p>\n    <a href=\"#caveFT-climbFall\" class=\"cave-action-btn-ft btn-warning-ft\">Escalar ao lado da Cachoeira</a>\n    <a href=\"#caveFT-behindFall\" class=\"cave-action-btn-ft\">Procurar atrás da Cachoeira</a>\n  </div>\n</div>\n\n<!-- Sub-Ramo 1.1: Escalar Cachoeira -->\n<div id=\"caveFT-climbFall\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Escalada Escorregadia</h5>\n    <p>As rochas são lisas e úmidas. No meio da subida, um Elemental da Água surge da cachoeira, irritado pela sua presença!</p>\n     <img src=\"https://i.pinimg.com/originals/b8/68/1e/b8681e9e8f66212081a3f18e604f5f37.jpg\" alt=\"Elemental da água\" class=\"cave-image-ft\"> <!-- Imagem de Elemental -->\n    <p>Ele cria um redemoinho que te puxa para baixo!</p>\n    <p><strong>Efeito: Volte 5 casas E fique preso 1 rodada.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-ft btn-danger-ft\">Ser Arrastado de Volta</a>\n  </div>\n</div>\n\n<!-- Sub-Ramo 1.2: Atrás da Cachoeira -->\n<div id=\"caveFT-behindFall\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Passagem Secreta Aquática</h5>\n    <p>Atrás da cortina de água, uma passagem estreita revela uma pequena gruta. No centro, sobre uma pedra lisa, repousa um objeto estranho: um pequeno broto de árvore encapsulado em âmbar.</p>\n     <img src=\"https://img.freepik.com/fotos-premium/pedaco-de-ambar-amarelo-com-uma-planta-dentro_1048944-24217571.jpg?w=740\" alt=\"Broto em Âmbar\" class=\"cave-image-ft\">\n    <a href=\"#caveFT-takeAmber\" class=\"cave-action-btn-ft btn-success-ft\">Pegar o Broto em Âmbar</a>\n    <a href=\"#caveFT-leaveAmber\" class=\"cave-action-btn-ft\">Deixar o artefato intocado</a>\n  </div>\n</div>\n\n<div id=\"caveFT-takeAmber\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Relíquia Viva</h5>\n    <p>Ao tocar o âmbar, você sente a energia vital pulsante da pequena planta. Este é um espécime de valor incalculável!</p>\n    <p><strong>Efeito: Ganhe 2 Estrelas Fixas.</strong></p>\n    <a href=\"#caveFT-crystalChamber\" class=\"cave-action-btn-ft btn-success-ft\">Continuar com a Relíquia</a>\n  </div>\n</div>\n\n<div id=\"caveFT-leaveAmber\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Respeito Silencioso</h5>\n    <p>Você decide não perturbar o descanso milenar da planta. A água ao redor parece brilhar com aprovação por um instante.</p>\n    <p><strong>Efeito: Ganhe 1 Pulo.</strong></p>\n    <a href=\"#caveFT-crystalChamber\" class=\"cave-action-btn-ft\">Continuar Ponderando</a>\n  </div>\n</div>\n\n\n<!-- Ramo 2: Caminho Bioluminescente -->\n<div id=\"caveFT-bioPath\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Bosque Fúngico</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/floresta-magica-de-cogumelos-brilhantes-a-noite_1048944-15884574.jpg?w=740\" alt=\"Cogumelos brilhantes\" class=\"cave-image-ft\">\n    <p>Cogumelos gigantes pulsam com luz própria. O ar é denso com esporos cintilantes. Você vê um brilho intenso vindo de uma clareira e, em outra direção, ouve um zumbido baixo e ritmado.</p>\n    <a href=\"#caveFT-followGlow\" class=\"cave-action-btn-ft\">Seguir o Brilho Intenso</a>\n    <a href=\"#caveFT-followHum\" class=\"cave-action-btn-ft\">Seguir o Zumbido</a>\n  </div>\n</div>\n\n<!-- Sub-Ramo 2.1: Brilho Intenso -->\n<div id=\"caveFT-followGlow\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Armadilha de Esporos!</h5>\n    <p>O brilho vem de um fungo enorme que libera uma nuvem densa de esporos alucinógenos ao se aproximar!</p>\n     <img src=\"https://img.freepik.com/fotos-premium/cogumelo-venenoso-na-floresta-escura_777271-31083.jpg?w=740\" alt=\"Fungo perigoso\" class=\"cave-image-ft\">\n    <p>Sua percepção da realidade fica distorcida por um tempo.</p>\n    <p><strong>Efeito: Escolha um jogador (NÃO pode ser você) para ficar 2 rodadas sem jogar.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-ft btn-danger-ft\">Fugir da Nuvem Tóxica</a>\n  </div>\n</div>\n\n<!-- Sub-Ramo 2.2: Zumbido -->\n<div id=\"caveFT-followHum\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n<h5>Colmeia Cristalina</h5>\n     <img src=\"https://img.freepik.com/fotos-premium/close-up-de-uma-colmeia-com-abelhas-dentro_912484-1895.jpg?w=740\" alt=\"Colmeia\" class=\"cave-image-ft\"> <!-- Imagem de Colmeia -->\n    <p>O zumbido vem de uma colmeia feita de cristais geodésicos, habitada por abelhas feitas de pura energia luminosa. Elas parecem ocupadas demais para notar você. Ao lado, há um pote de Mel Cristalizado.</p>\n    <a href=\"#caveFT-takeHoney\" class=\"cave-action-btn-ft btn-warning-ft\">Pegar o Mel Cristalizado</a>\n    <a href=\"#caveFT-observeBees\" class=\"cave-action-btn-ft\">Apenas Observar as Abelhas</a>\n  </div>\n</div>\n\n<div id=\"caveFT-takeHoney\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Néctar Energético (e Pegajoso)</h5>\n    <p>O mel é delicioso e revigorante, mas incrivelmente pegajoso. Você atrai insetos estranhos e perde tempo se limpando.</p>\n    <p><strong>Efeito: Ganhe 10 de Progresso, MAS Perca 1 Rodada.</strong></p>\n    <a href=\"#caveFT-crystalChamber\" class=\"cave-action-btn-ft btn-warning-ft\">Continuar Melecado</a>\n  </div>\n</div>\n\n<div id=\"caveFT-observeBees\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Lições de Polinização</h5>\n    <p>Observando as abelhas energéticas, você compreende melhor os intrincados processos de polinização e dispersão na natureza.</p>\n    <p><strong>Efeito: Remova 3 respostas ERRADAS acumuladas.</strong></p>\n    <a href=\"#caveFT-crystalChamber\" class=\"cave-action-btn-ft btn-success-ft\">Continuar Esclarecido</a>\n  </div>\n</div>\n\n<!-- Convergência Final: Câmara da Árvore-Coração (Puzzle de Runas) -->\n<div id=\"caveFT-crystalChamber\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>A Árvore-Coração</h5>\n     <img src=\"https://i.pinimg.com/originals/7b/3a/a3/7b3aa3d3789e0b9763a93828d954482e.jpg\" alt=\"Árvore brilhante em caverna\" class=\"cave-image-ft\"> <!-- Imagem de Árvore brilhante -->\n    <p>Todos os caminhos levam a esta câmara magnífica. No centro, uma árvore gigantesca com um coração cristalino pulsante ilumina tudo. Runas antigas brilham em seu tronco. Uma voz ancestral sussurra: \"A chave para o conhecimento profundo reside na palavra que conecta a madeira ao tempo... a ciência que a estuda.\"</p>\n    <p><strong>Dica:</strong> Qual ciência estuda os anéis das árvores?</p>\n    <div class=\"rune-puzzle-area\">\n      <div class=\"rune-display\">?????????</div> <!-- 9 letras para DENDROLOGIA -->\n      <input type=\"text\" id=\"rune-input-ft\" class=\"rune-input\" placeholder=\"Digite a palavra-chave\" maxlength=\"11\">\n      <a href=\"#caveFT-checkRune\" class=\"cave-action-btn-ft rune-submit-btn\">Verificar Runa</a>\n    </div>\n     <a href=\"#caveFT-giveUpRune\" class=\"cave-action-btn-ft btn-danger-ft\" style=\"margin-top: 15px;\">Desistir do Enigma</a>\n  </div>\n</div>\n\n<!-- Checar Runa (JavaScript seria ideal, mas faremos resultado binário com CSS) -->\n<!-- Para simplificar com CSS, vamos apenas ter um resultado \"correto\" genérico -->\n<!-- Se fosse JS, compararíamos o valor do input com \"DENDROLOGIA\" -->\n<div id=\"caveFT-checkRune\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>O Coração Desperta!</h5>\n     <img src=\"https://img.freepik.com/fotos-premium/arvore-com-raizes-e-luz-brilhante-no-centro_1048944-23099312.jpg?w=740\" alt=\"Árvore com coração brilhante\" class=\"cave-image-ft\">\n    <p>A palavra correta ressoa com as runas! (Assumindo que você digitou \"DENDROLOGIA\"). A Árvore-Coração pulsa com mais força, oferecendo uma dádiva final.</p>\n    <p><strong>Escolha sua Recompensa:</strong></p>\n    <a href=\"#caveFT-finalStars\" class='benefit-option-ft'>🌟🌟 Bênção das Eras (+2 Estrelas Fixas)</a>\n    <a href=\"#caveFT-finalCard\" class='benefit-option-ft'>📜 Sabedoria da Madeira (Ganhe uma carta de jogador)</a>\n    <a href=\"#caveFT-finalSkip\" class='benefit-option-ft'>✈️ Atalho das Raízes (Role o dado e vá para casa Avião)</a>\n  </div>\n</div>\n\n<div id=\"caveFT-giveUpRune\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Conhecimento Selado</h5>\n    <p>As runas se apagam. A árvore permanece em silêncio. O conhecimento ancestral continua fora do seu alcance.</p>\n    <p><strong>Efeito: Sem Bônus/Penalidade</strong> (Mas perdeu a chance da recompensa)</p>\n    <a href=\"#\" class=\"cave-final-btn-ft\">Sair da Câmara</a>\n  </div>\n</div>\n\n\n<!-- Popups Finais de Confirmação da Recompensa -->\n<div id=\"caveFT-finalStars\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Recompensa: Bênção das Eras!</h5>\n    <p>A longevidade da floresta te fortalece!</p>\n    <p><strong>Efeito: +2 Estrelas Fixas</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-ft btn-success-ft\">Sair Iluminado</a>\n  </div>\n</div>\n\n<div id=\"caveFT-finalCard\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Recompensa: Sabedoria da Madeira!</h5>\n    <p>Um novo entendimento floresce em sua mente.</p>\n    <p><strong>Efeito: Ganhe uma carta de jogador</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-ft btn-success-ft\">Sair Sábio</a>\n  </div>\n</div>\n\n<div id=\"caveFT-finalSkip\" class=\"cave-popup-ft\">\n  <div class=\"cave-content-ft\">\n    <a href=\"#\" class=\"cave-close-ft\">×</a>\n    <h5>Recompensa: Atalho das Raízes!</h5>\n    <p>As raízes da Árvore-Coração te impulsionam para longe!</p>\n    <p><strong>Efeito: Role o dado e vá para casa Avião</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-ft btn-success-ft\">Sair Velozmente</a>\n  </div>\n</div>\n\n\n<!-- Texto Final Geral -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Sua exploração na Fenda Telúrica chega ao fim. Confirme sua escolha/resultado.</p>\n<!-- FIM DA CARTA INTERATIVA - FENDA TELÚRICA -->",
    "dificuldade": "facil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aceite as consequências",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Completei a caverna"
      }
    ]
  },
  {
    "id": "new_1745790434684_2eef571cc9a168",
    "tipo": "Outras",
    "titulo": "Caverna 6",
    "pergunta": "<!-- INÍCIO DA CARTA INTERATIVA - CORREDOR DAS RAÍZES -->\n<style>\n/* Estilos Base (Adaptados para Corredor das Raízes) */\n.cave-popup-cr { /* Sufixo -cr para Corredor Raízes */\n  position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n  background-color: rgba(40, 60, 40, 0.9); /* Verde musgo escuro translúcido */\n  display: none; justify-content: center; align-items: center;\n  z-index: 1000; padding: 15px; box-sizing: border-box; text-align: center;\n  backdrop-filter: blur(3px);\n}\n.cave-popup-cr:target { display: flex; }\n.cave-content-cr {\n  position: relative; background-color: #f0fdf4; /* Verde muito pálido (Green 50) */\n  padding: 25px 30px; border-radius: 10px; max-width: 650px; max-height: 90vh;\n  overflow-y: auto; box-shadow: 0 6px 25px rgba(0,0,0,0.35);\n  border: 5px solid #4ade80; /* Verde lima brilhante */\n  color: #166534; /* Verde escuro */\n}\n.cave-content-cr h5 {\n  margin-top: 0; margin-bottom: 20px; font-size: 1.5em; color: #15803d; /* Verde médio */\n  border-bottom: 2px solid #86efac; padding-bottom: 12px; font-family: 'Papyrus', fantasy; /* Fonte temática */\n  text-shadow: 1px 1px 1px #fff;\n}\n.cave-content-cr p { margin-bottom: 18px; line-height: 1.7; font-size: 1.05em; }\n.cave-close-cr {\n  position: absolute; top: 10px; right: 15px; font-size: 30px; font-weight: bold;\n  color: #86efac; text-decoration: none; line-height: 1; cursor: pointer;\n  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);\n}\n.cave-close-cr:hover { color: #4ade80; }\n\n/* Botões */\n.cave-start-btn-cr, .cave-action-btn-cr, .cave-final-btn-cr, .benefit-option-cr {\n  display: inline-block; padding: 12px 22px; color: white; text-decoration: none;\n  border-radius: 8px; margin: 8px 6px; font-size: 1em; font-weight: 600;\n  border: none; cursor: pointer; transition: all 0.2s ease-in-out;\n  min-width: 150px; box-shadow: 0 3px 6px rgba(0,0,0,0.2);\n  border-bottom: 3px solid rgba(0,0,0,0.3);\n}\n.cave-start-btn-cr:hover, .cave-action-btn-cr:hover, .cave-final-btn-cr:hover, .benefit-option-cr:hover {\n   box-shadow: 0 5px 10px rgba(0,0,0,0.3); transform: translateY(-2px); border-bottom-width: 5px;\n}\n.cave-start-btn-cr:active, .cave-action-btn-cr:active, .cave-final-btn-cr:active, .benefit-option-cr:active {\n    transform: translateY(1px); box-shadow: 0 1px 3px rgba(0,0,0,0.3); border-bottom-width: 3px;\n}\n.cave-start-btn-cr { background-color: #16a34a; border-bottom-color: #14532d;} /* Verde */\n.cave-start-btn-cr:hover { background-color: #15803d; }\n.cave-action-btn-cr { background-color: #ca8a04; border-bottom-color: #78350f; } /* Amarelo Ouro */\n.cave-action-btn-cr:hover { background-color: #a16207; }\n.cave-final-btn-cr { background-color: #52525b; border-bottom-color: #18181b; } /* Zinco escuro */\n.cave-final-btn-cr:hover { background-color: #3f3f46; }\n\n/* Estilos específicos */\n.btn-success-cr { background-color: #22c55e; border-bottom-color: #15803d;} .btn-success-cr:hover { background-color: #16a34a; }\n.btn-warning-cr { background-color: #f97316; border-bottom-color: #9a3412; color: white;} .btn-warning-cr:hover { background-color: #ea580c; }\n.btn-danger-cr { background-color: #ef4444; border-bottom-color: #991b1b;} .btn-danger-cr:hover { background-color: #dc2626; }\n.cave-image-cr { display: block; max-width: 80%; height: auto; margin: 20px auto; border-radius: 10px; border: 4px solid #86efac; box-shadow: 0 5px 15px rgba(0,0,0,0.25); }\n.benefit-option-cr {\n    background-color: #dcfce7; /* Verde muito claro */\n    color: #166534; /* Verde escuro */\n    border: 2px dashed #86efac; /* Verde claro */\n    width: 90%; margin: 12px auto; display: block;\n}\n.benefit-option-cr:hover { border-color: #4ade80; background-color: #f0fdf4; }\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você encontra uma abertura na base de uma árvore colossal, coberta por raízes retorcidas que parecem se mover sutilmente.</p>\n<p style='text-align:center;'>🌳🌀入口</p>\n<p style='text-align:center;'><a href=\"#caveCR-start\" class='cave-start-btn-cr'>Entrar no Corredor das Raízes</a></p>\n\n<!-- Popups Escondidos -->\n\n<!-- Cena 1: O Corredor Vivo -->\n<div id=\"caveCR-start\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>O Corredor Vivo</h5>\n    <img src=\"https://i.pinimg.com/originals/5b/c8/f8/5bc8f803473260a6f77e76636f2db6c0.jpg\" alt=\"Corredor de raízes\" class=\"cave-image-cr\"> <!-- Substitua por imagem de corredor de raízes -->\n    <p>As paredes são formadas por raízes vivas que pulsam com uma energia tênue. O ar é espesso e antigo. A trilha segue em frente, mas você nota uma pequena abertura lateral escondida por cipós (<strong>Fenda Oculta</strong>) e ouve um gotejar constante vindo de uma passagem acima (<strong>Goteira Misteriosa</strong>).</p>\n    <a href=\"#caveCR-mainPath1\" class=\"cave-action-btn-cr\">Seguir Caminho Principal</a>\n    <a href=\"#caveCR-hiddenGap\" class=\"cave-action-btn-cr\">Investigar Fenda Oculta</a>\n    <a href=\"#caveCR-drippingPath\" class=\"cave-action-btn-cr\">Subir em Direção à Goteira</a>\n  </div>\n</div>\n\n<!-- Ramo 1: Caminho Principal - Trecho 1 -->\n<div id=\"caveCR-mainPath1\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Encruzilhada das Raízes</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/labirinto-de-raizes-de-arvores-em-uma-floresta-escura_1048944-25450319.jpg?w=740\" alt=\"Encruzilhada de raízes\" class=\"cave-image-cr\">\n    <p>O corredor principal se alarga. Raízes formam arcos e pontes naturais. Você vê três passagens à frente: uma com gravuras de animais (<strong>Passagem Fauna</strong>), uma com símbolos de plantas medicinais (<strong>Passagem Flora</strong>), e uma escura e silenciosa (<strong>Passagem Sombria</strong>).</p>\n    <a href=\"#caveCR-faunaPath\" class=\"cave-action-btn-cr\">Passagem Fauna</a>\n    <a href=\"#caveCR-floraPath\" class=\"cave-action-btn-cr\">Passagem Flora</a>\n    <a href=\"#caveCR-darkPath\" class=\"cave-action-btn-cr btn-warning-cr\">Passagem Sombria</a>\n  </div>\n</div>\n\n<!-- Ramo 2: Fenda Oculta -->\n<div id=\"caveCR-hiddenGap\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Ninho de Dríades?</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/floresta-magica-com-drades-e-folhas-verdes-brilhantes_818261-9210.jpg?w=740\" alt=\"Ninho na árvore\" class=\"cave-image-cr\"> <!-- Imagem sugere ninho/morada -->\n    <p>A fenda leva a uma pequena câmara aconchegante forrada de musgo. No centro, um pequeno baú de madeira adornado com folhas. Parece ser o lar de pequenas criaturas da floresta. Você pode <strong>abrir o baú</strong> ou <strong>sair respeitosamente</strong>.</p>\n    <a href=\"#caveCR-openChest\" class=\"cave-action-btn-cr btn-warning-cr\">Abrir o Baú</a>\n    <a href=\"#caveCR-leaveRespect\" class=\"cave-action-btn-cr\">Sair Respeitosamente</a>\n  </div>\n</div>\n\n<div id=\"caveCR-openChest\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Tesouro das Dríades (e Maldição!)</h5>\n    <p>Dentro do baú, você encontra sementes cintilantes! Mas, ao pegá-las, pequenas dríades surgem das paredes, furiosas por ter invadido seu lar!</p>\n    <p><strong>Efeito: Ganhe 1 contador \"Sementes Mágicas\", MAS vá para a Cadeia!</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-cr btn-danger-cr\">Ser Capturado pelas Dríades</a>\n  </div>\n</div>\n\n<div id=\"caveCR-leaveRespect\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Bênção Silenciosa</h5>\n    <p>Você deixa o local intocado. Ao sair, sente uma brisa suave e revigorante, como um agradecimento silencioso.</p>\n    <p><strong>Efeito: Ganhe 1 Pulo.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-cr\">Retornar à Trilha Principal</a> <!-- Poderia voltar para #caveCR-start ou outro ponto se quisesse mais complexidade -->\n  </div>\n</div>\n\n<!-- Ramo 3: Goteira Misteriosa -->\n<div id=\"caveCR-drippingPath\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Fonte Telúrica</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/a-agua-esta-pingando-de-uma-caverna_916191-10133.jpg?w=740\" alt=\"Goteira na caverna\" class=\"cave-image-cr\">\n    <p>Você sobe por raízes até uma pequena nascente onde a água, pura e energizada, goteja do teto rochoso coberto de musgo luminoso. Você pode <strong>beber da fonte</strong> ou apenas <strong>observar sua energia</strong>.</p>\n    <a href=\"#caveCR-drinkSource\" class=\"cave-action-btn-cr btn-success-cr\">Beber da Fonte</a>\n    <a href=\"#caveCR-observeSource\" class=\"cave-action-btn-cr\">Observar a Energia</a>\n  </div>\n</div>\n\n<div id=\"caveCR-drinkSource\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Vitalidade Renovada</h5>\n    <p>A água tem um gosto de terra e energia. Você se sente revigorado e mais conectado à floresta.</p>\n    <p><strong>Efeito: Avance 5 casas.</strong></p>\n    <a href=\"#caveCR-mainPath1\" class=\"cave-action-btn-cr btn-success-cr\">Retornar à Encruzilhada Revigorado</a> <!-- Volta para o caminho principal -->\n  </div>\n</div>\n\n<div id=\"caveCR-observeSource\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Paciência e Percepção</h5>\n    <p>Observando a fonte, você nota pequenos cristais se formando onde a água toca a pedra, aprendendo sobre processos geológicos lentos.</p>\n    <p><strong>Efeito: Remova 3 respostas ERRADAS.</strong></p>\n    <a href=\"#caveCR-mainPath1\" class=\"cave-action-btn-cr\">Retornar à Encruzilhada Observador</a> <!-- Volta para o caminho principal -->\n  </div>\n</div>\n\n\n<!-- Sub-Ramo 1.1: Passagem Fauna -->\n<div id=\"caveCR-faunaPath\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Santuário Animal</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/coruja-das-torres-perto-de-um-tronco-oco_23-2148092401.jpg?w=740\" alt=\"Animais na caverna\" class=\"cave-image-cr\">\n    <p>Esta seção da caverna abriga pequenos animais noturnos e morcegos frugívoros essenciais para a dispersão de sementes. Um morcego maior parece guardar um pequeno nicho na parede.</p>\n    <a href=\"#caveCR-approachBat\" class=\"cave-action-btn-cr btn-warning-cr\">Aproximar-se do Morcego Guardião</a>\n    <a href=\"#caveCR-leaveFauna\" class=\"cave-action-btn-cr\">Deixar os animais em paz</a>\n  </div>\n</div>\n\n<div id=\"caveCR-approachBat\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Guardião Territorial</h5>\n    <p>O morcego guinchou e voou em sua direção, desorientando-o com suas ondas sônicas! Você tropeça e cai.</p>\n    <p><strong>Efeito: Perca 1 Estrela Fixa.</strong> (Se não tiver, perca 10 progresso).</p>\n    <a href=\"#caveCR-finalChamber\" class=\"cave-action-btn-cr btn-danger-cr\">Fugir Atordoado para a Câmara Final</a>\n  </div>\n</div>\n\n<div id=\"caveCR-leaveFauna\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Observador Respeitoso</h5>\n    <p>Você admira a biodiversidade e segue em frente, entendendo a importância de cada criatura.</p>\n    <p><strong>Efeito: Ganhe 10 de Progresso.</strong></p>\n    <a href=\"#caveCR-finalChamber\" class=\"cave-action-btn-cr btn-success-cr\">Seguir para a Câmara Final</a>\n  </div>\n</div>\n\n<!-- Sub-Ramo 1.2: Passagem Flora -->\n<div id=\"caveCR-floraPath\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Jardim Secreto</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/erva-medicinal-planta-ginseng-na-floresta_1048944-7002934.jpg?w=740\" alt=\"Plantas medicinais\" class=\"cave-image-cr\">\n    <p>Plantas medicinais raras crescem aqui, iluminadas por frestas no teto. Você reconhece uma erva poderosa usada em tratamentos florestais avançados, mas colhê-la pode prejudicar a população local. Você pode <strong>Coletar uma amostra</strong> ou <strong>Mapear a localização</strong>.</p>\n    <a href=\"#caveCR-collectHerb\" class=\"cave-action-btn-cr btn-warning-cr\">Coletar Amostra da Erva</a>\n    <a href=\"#caveCR-mapHerb\" class=\"cave-action-btn-cr\">Mapear Localização para Estudo</a>\n  </div>\n</div>\n\n<div id=\"caveCR-collectHerb\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Coleta Impactante</h5>\n    <p>Você pega uma amostra, mas sente a energia do local diminuir. O conhecimento tem um custo.</p>\n    <p><strong>Efeito: Ganhe 1 contador \"Erva Rara\", MAS perca 10 de Progresso.</strong></p>\n    <a href=\"#caveCR-finalChamber\" class=\"cave-action-btn-cr btn-warning-cr\">Seguir para a Câmara Final com a Erva</a>\n  </div>\n</div>\n\n<div id=\"caveCR-mapHerb\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Registro Sustentável</h5>\n    <p>Você mapeia a área e coleta dados sem perturbar as plantas. O conhecimento adquirido será valioso.</p>\n    <p><strong>Efeito: Ganhe uma carta de jogador.</strong></p>\n    <a href=\"#caveCR-finalChamber\" class=\"cave-action-btn-cr btn-success-cr\">Seguir para a Câmara Final com Dados</a>\n  </div>\n</div>\n\n\n<!-- Sub-Ramo 1.3: Passagem Sombria -->\n<div id=\"caveCR-darkPath\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Armadilha de Raízes</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/textura-de-raiz-de-arvore_1373-479.jpg?w=740\" alt=\"Raízes emaranhadas\" class=\"cave-image-cr\">\n    <p>O caminho escuro se revela uma armadilha! Raízes vivas se prendem aos seus pés, tentando te puxar para baixo.</p>\n    <p><strong>Efeito: Vá para a Cadeia!</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-cr btn-danger-cr\">Ser Imobilizado</a>\n  </div>\n</div>\n\n<!-- Câmara Final (Convergência dos Ramos Principais) -->\n<div id=\"caveCR-finalChamber\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>O Eco da Floresta - Escolha sua Dádiva</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/luz-brilhante-no-final-de-uma-caverna-escura_1048944-11719757.jpg?w=740\" alt=\"Luz no fim do túnel\" class=\"cave-image-cr\">\n    <p>Você emerge em uma câmara final onde os sons da floresta exterior ecoam suavemente. Você provou sua resiliência e interação com este ecossistema subterrâneo. A energia da caverna oferece uma última escolha, uma bênção para continuar sua jornada:</p>\n    <!-- Opções Finais -->\n    <a href=\"#caveCR-finalBlessingStars\" class='benefit-option-cr'>🌟🌟 Conexão Celestial (Ganhe 2 Estrelas Fixas)</a>\n    <a href=\"#caveCR-finalBlessingCard\" class='benefit-option-cr'>📜 Eco do Conhecimento (Ganhe 1 Carta de Jogador)</a>\n    <a href=\"#caveCR-finalBlessingSkip\" class='benefit-option-cr'>✈️ Impulso Telúrico (Role o dado e vá para casa Avião)</a>\n  </div>\n</div>\n\n<!-- Popups Finais de Confirmação da Recompensa -->\n<div id=\"caveCR-finalBlessingStars\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Recompensa: Conexão Celestial!</h5>\n    <p>As estrelas guiam seu caminho florestal!</p>\n    <p><strong>Efeito: +2 Estrelas Fixas</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-cr btn-success-cr\">Sair Fortalecido</a>\n  </div>\n</div>\n\n<div id=\"caveCR-finalBlessingCard\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Recompensa: Eco do Conhecimento!</h5>\n    <p>Os sussurros da floresta te trazem nova sabedoria.</p>\n    <p><strong>Efeito: Ganhe uma carta de jogador</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-cr btn-success-cr\">Sair Esclarecido</a>\n  </div>\n</div>\n\n<div id=\"caveCR-finalBlessingSkip\" class=\"cave-popup-cr\">\n  <div class=\"cave-content-cr\">\n    <a href=\"#\" class=\"cave-close-cr\">×</a>\n    <h5>Recompensa: Impulso Telúrico!</h5>\n    <p>A própria terra te impulsiona para frente!</p>\n    <p><strong>Efeito: Role o dado e vá para casa Avião</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-cr btn-success-cr\">Sair Impulsionado</a>\n  </div>\n</div>\n\n\n<!-- Texto Final Geral -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Sua jornada pelo Corredor das Raízes chega ao fim. Escolha sua recompensa final e aplique o efeito.</p>\n<!-- FIM DA CARTA INTERATIVA - CORREDOR DAS RAÍZES -->",
    "dificuldade": "facil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aceite as consequências",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Missão concluida"
      }
    ]
  },
  {
    "id": "cave_adv_1",
    "tipo": "Outras",
    "titulo": "Caverna dos Cristais Cintilantes",
    "pergunta": "<style>\n/* Estilos gerais dos popups da caverna (reutilizados) */\n.cave-popup { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(30, 41, 59, 0.9); display:none; justify-content:center; align-items:center; z-index:1010; padding:15px; }\n.cave-popup:target { display:flex; }\n.cave-content { background:#475569; color: #e2e8f0; padding:25px; border-radius:8px; max-width:380px; text-align:center; position:relative; border: 3px solid #64748b; }\n.cave-content h5 { margin:0 0 15px 0; color: #cbd5e1; border-bottom: 1px solid #64748b; padding-bottom: 8px; }\n.cave-content p { margin-bottom: 15px; font-size:0.95em; line-height:1.5; }\n.cave-content a { color: #93c5fd; text-decoration: underline; margin: 0 10px; cursor: pointer; }\n.cave-close { position:absolute; top:8px; right:12px; font-size:24px; color:#9ca3af; text-decoration:none; }\n.cave-close:hover { color: white; }\n.cave-start-btn { display:inline-block; padding: 10px 15px; background:#6366f1; color:white; border-radius:5px; text-decoration:none; font-weight:bold; }\n</style>\n<p style='text-align:center;'>Você encontra a entrada de uma caverna escura, com um brilho azulado vindo de dentro...</p>\n<p style='text-align:center;'><a href=\"#cave1-start\" class='cave-start-btn'>Entrar na Caverna</a></p>\n\n<!-- Cenas da Caverna 1 -->\n<div id=\"cave1-start\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Entrada Ecoante</h5>\n    <p>O ar é úmido. Você vê um túnel estreito à <strong>esquerda</strong> e uma passagem mais larga à <strong>direita</strong> que desce.</p>\n    <a href=\"#cave1-left\">Ir pela Esquerda</a> <a href=\"#cave1-right\">Ir pela Direita</a>\n  </div>\n</div>\n<div id=\"cave1-left\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Túnel Estreito</h5>\n    <p>Você se espreme e encontra uma pequena câmara com um cristal cintilante!</p>\n    <p><strong>Efeito: +1 Estrela Bônus</strong></p>\n    <a href=\"#\">Sair com o Cristal</a>\n  </div>\n</div>\n<div id=\"cave1-right\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Passagem Descendente</h5>\n    <p>Você desce com cuidado. O caminho termina abruptamente em um abismo escuro. Você quase caiu!</p>\n    <p><strong>Efeito: Perca 1 Rodada (susto e tempo perdido)</strong></p>\n    <a href=\"#\">Retornar com Cuidado</a>\n  </div>\n</div>\n<p style='text-align:center; font-size:0.8em;'>Explore e clique na opção final correspondente.</p>",
    "dificuldade": "facil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aventura na Caverna Concluída!",
    "desvantagem": "Aventura na Caverna Concluída!",
    "dica": "Brilho geralmente indica algo bom...",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Aceite as consequências"
      }
    ]
  },
  {
    "id": "cave_adv_2",
    "tipo": "Outras",
    "titulo": "Caverna do Rio Murmurante",
    "pergunta": "<!-- INÍCIO DO CÓDIGO DA CARTA INTERATIVA -->\n<style>\n/* Estilos Base para Popups da Caverna (Reutilizados ou Definidos se for a primeira vez) */\n.cave-popup {\n  position: fixed; /* Cobre a tela */\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.75); /* Fundo escuro semi-transparente */\n  display: none; /* Escondido por padrão */\n  justify-content: center;\n  align-items: center;\n  z-index: 1000; /* Fica sobre outros elementos */\n  padding: 20px;\n  box-sizing: border-box;\n  text-align: center; /* Centraliza texto dentro do popup */\n}\n\n/* Mostra o popup quando seu ID é o alvo do link */\n.cave-popup:target {\n  display: flex;\n}\n\n/* Caixa de Conteúdo do Popup */\n.cave-content {\n  position: relative; /* Para posicionar o botão de fechar */\n  background-color: #fff; /* Fundo branco */\n  padding: 30px;\n  border-radius: 8px;\n  max-width: 500px; /* Largura máxima */\n  max-height: 90vh; /* Altura máxima */\n  overflow-y: auto; /* Adiciona scroll se necessário */\n  box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n}\n\n/* Título dentro do Popup */\n.cave-content h5 {\n  margin-top: 0;\n  margin-bottom: 15px;\n  font-size: 1.2em;\n  color: #333;\n}\n\n/* Parágrafos dentro do Popup */\n.cave-content p {\n  margin-bottom: 15px;\n  line-height: 1.6;\n  color: #555;\n  font-size: 0.95em;\n}\n\n/* Botão de Fechar (X) */\n.cave-close {\n  position: absolute;\n  top: 10px;\n  right: 15px;\n  font-size: 24px;\n  font-weight: bold;\n  color: #888;\n  text-decoration: none;\n  line-height: 1;\n  cursor: pointer;\n}\n.cave-close:hover {\n  color: #000;\n}\n\n/* Botão Inicial (Verde) */\n.cave-start-btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background-color: #4CAF50; /* Verde */\n  color: white;\n  text-decoration: none;\n  border-radius: 5px;\n  margin-top: 10px;\n  font-weight: bold;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-start-btn:hover {\n  background-color: #45a049;\n}\n\n/* Botões de Ação dentro dos Popups (Azul) */\n.cave-action-btn {\n  display: inline-block;\n  padding: 8px 15px;\n  background-color: #007bff; /* Azul */\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  margin: 5px 10px; /* Espaçamento entre botões */\n  font-size: 0.9em;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-action-btn:hover {\n  background-color: #0056b3;\n}\n\n/* Estilo para links de saída/finalização (Cinza) */\n.cave-final-btn {\n   display: inline-block;\n  padding: 8px 15px;\n  background-color: #6c757d; /* Cinza */\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  margin: 5px 10px;\n  font-size: 0.9em;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-final-btn:hover {\n  background-color: #5a6268;\n}\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Um rio some por uma fenda na rocha. Você decide seguir...</p>\n<p style='text-align:center;'><a href=\"#cave2-start\" class='cave-start-btn'>Seguir o Rio</a></p>\n\n<!-- Popups Escondidos (Cenas da Caverna 2) -->\n<div id=\"cave2-start\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Seguindo o Rio Subterrâneo</h5>\n    <p>Você acompanha o rio subterrâneo. Ouve um barulho estranho à frente. O caminho se divide: seguir pela <strong>margem seca</strong> ou tentar atravessar por <strong>pedras escorregadias</strong> no meio do rio?</p>\n    <a href=\"#cave2-dry\" class=\"cave-action-btn\">Margem Seca</a>\n    <a href=\"#cave2-wet\" class=\"cave-action-btn\">Pedras Molhadas</a>\n  </div>\n</div>\n\n<div id=\"cave2-dry\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Margem Seca</h5>\n    <p>Seguro, mas lento. Você avança e vê a saída, mas parece que perdeu algo pelo caminho.</p>\n    <p><strong>Efeito: Sem Bônus/Penalidade</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Sair da Caverna</a>\n  </div>\n</div>\n\n<div id=\"cave2-wet\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Pedras Molhadas - Recompensa!</h5>\n    <p>Você escorrega, mas se segura! Ao se levantar, vê algo brilhando na água: uma Gema Rara!</p>\n    <p><strong>Efeito: +1 Estrela Fixa</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Sair com a Gema</a>\n  </div>\n</div>\n\n<!-- Texto Final -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Explore e clique na opção final correspondente.</p>\n<!-- FIM DO CÓDIGO DA CARTA INTERATIVA -->",
    "dificuldade": "normal",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aventura no Rio Concluída!",
    "desvantagem": "Aventura no Rio Concluída!",
    "dica": "Às vezes, o caminho mais arriscado tem recompensas.",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Aceite as consequências"
      }
    ]
  },
  {
    "id": "cave_adv_3",
    "tipo": "Outras",
    "titulo": "Caverna dos Ecos Perdidos",
    "pergunta": "<!-- INÍCIO DO CÓDIGO DA CARTA INTERATIVA -->\n<style>\n/* Estilos Base para Popups da Caverna (Reutilizados ou Definidos se for a primeira vez) */\n.cave-popup {\n  position: fixed; /* Cobre a tela */\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.75); /* Fundo escuro semi-transparente */\n  display: none; /* Escondido por padrão */\n  justify-content: center;\n  align-items: center;\n  z-index: 1000; /* Fica sobre outros elementos */\n  padding: 20px;\n  box-sizing: border-box;\n  text-align: center; /* Centraliza texto dentro do popup */\n}\n\n/* Mostra o popup quando seu ID é o alvo do link */\n.cave-popup:target {\n  display: flex;\n}\n\n/* Caixa de Conteúdo do Popup */\n.cave-content {\n  position: relative; /* Para posicionar o botão de fechar */\n  background-color: #fff; /* Fundo branco */\n  padding: 30px;\n  border-radius: 8px;\n  max-width: 500px; /* Largura máxima */\n  max-height: 90vh; /* Altura máxima */\n  overflow-y: auto; /* Adiciona scroll se necessário */\n  box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n}\n\n/* Título dentro do Popup */\n.cave-content h5 {\n  margin-top: 0;\n  margin-bottom: 15px;\n  font-size: 1.2em;\n  color: #333;\n}\n\n/* Parágrafos dentro do Popup */\n.cave-content p {\n  margin-bottom: 15px;\n  line-height: 1.6;\n  color: #555;\n  font-size: 0.95em;\n}\n\n/* Botão de Fechar (X) */\n.cave-close {\n  position: absolute;\n  top: 10px;\n  right: 15px;\n  font-size: 24px;\n  font-weight: bold;\n  color: #888;\n  text-decoration: none;\n  line-height: 1;\n  cursor: pointer;\n}\n.cave-close:hover {\n  color: #000;\n}\n\n/* Botão Inicial (Verde) */\n.cave-start-btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background-color: #4CAF50; /* Verde */\n  color: white;\n  text-decoration: none;\n  border-radius: 5px;\n  margin-top: 10px;\n  font-weight: bold;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-start-btn:hover {\n  background-color: #45a049;\n}\n\n/* Botões de Ação dentro dos Popups (Azul) */\n.cave-action-btn {\n  display: inline-block;\n  padding: 8px 15px;\n  background-color: #007bff; /* Azul */\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  margin: 5px 10px; /* Espaçamento entre botões */\n  font-size: 0.9em;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-action-btn:hover {\n  background-color: #0056b3;\n}\n\n/* Estilo para links de saída/finalização (Cinza) */\n.cave-final-btn {\n   display: inline-block;\n  padding: 8px 15px;\n  background-color: #6c757d; /* Cinza */\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  margin: 5px 10px;\n  font-size: 0.9em;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-final-btn:hover {\n  background-color: #5a6268;\n}\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Esta caverna parece um labirinto. Você grita 'Olá!' e ouve ecos vindo de múltiplas direções...</p>\n<p style='text-align:center;'><a href=\"#cave3-start\" class='cave-start-btn'>Explorar o Labirinto</a></p>\n\n<!-- Popups Escondidos (Cenas da Caverna 3) -->\n<div id=\"cave3-start\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Encruzilhada dos Ecos</h5>\n    <p>Um eco parece vir da <strong>esquerda</strong> (som metálico), um da <strong>frente</strong> (som de água), e um da <strong>direita</strong> (silêncio).</p>\n    <a href=\"#cave3-left\" class=\"cave-action-btn\">Seguir Som Metálico</a>\n    <a href=\"#cave3-front\" class=\"cave-action-btn\">Seguir Som de Água</a>\n    <a href=\"#cave3-right\" class=\"cave-action-btn\">Seguir Silêncio</a>\n  </div>\n</div>\n\n<div id=\"cave3-left\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Som Metálico - Tesouro!</h5>\n    <p>Você encontra ferramentas de mineração abandonadas. Útil!</p>\n    <p><strong>Efeito: Ganha 1 'Kit de Reparo' (recurso - informar ao Mestre)</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Sair com o Kit</a>\n  </div>\n</div>\n\n<div id=\"cave3-front\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Som de Água - Beleza Natural</h5>\n    <p>Você acha uma bela cachoeira subterrânea. Refrescante!</p>\n    <p><strong>Efeito: +10 Progresso</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Sair Revigorado</a>\n  </div>\n</div>\n\n<div id=\"cave3-right\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Caminho Silencioso - Beco sem Saída</h5>\n    <p>O túnel termina em uma parede... sem saída. Você perde tempo voltando.</p>\n    <p><strong>Efeito: Perca 1 Rodada (fique uma rodada sem jogar)</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Retornar Frustrado</a>\n  </div>\n</div>\n\n<!-- Texto Final -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Siga os ecos e clique na opção final correspondente.</p>\n<!-- FIM DO CÓDIGO DA CARTA INTERATIVA -->",
    "dificuldade": "normal",
    "categorias": [],
    "fontes": [],
    "vantagem": "Exploração do Labirinto Concluída!",
    "desvantagem": "Exploração do Labirinto Concluída!",
    "dica": "Confie nos seus ouvidos... ou na sua intuição.",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Aceite as consequencias"
      }
    ]
  },
  {
    "id": "cave_adv_4",
    "tipo": "Outras",
    "titulo": "Covil do Guardião Rochoso",
    "pergunta": "<!-- INÍCIO DO CÓDIGO DA CARTA INTERATIVA -->\n<style>\n/* Estilos Base para Popups da Caverna */\n.cave-popup {\n  position: fixed; /* Cobre a tela */\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.75); /* Fundo escuro semi-transparente */\n  display: none; /* Escondido por padrão */\n  justify-content: center;\n  align-items: center;\n  z-index: 1000; /* Fica sobre outros elementos */\n  padding: 20px;\n  box-sizing: border-box;\n  text-align: center; /* Centraliza texto dentro do popup */\n}\n\n/* Mostra o popup quando seu ID é o alvo do link */\n.cave-popup:target {\n  display: flex;\n}\n\n/* Caixa de Conteúdo do Popup */\n.cave-content {\n  position: relative; /* Para posicionar o botão de fechar */\n  background-color: #fff; /* Fundo branco */\n  padding: 30px;\n  border-radius: 8px;\n  max-width: 500px; /* Largura máxima */\n  max-height: 90vh; /* Altura máxima */\n  overflow-y: auto; /* Adiciona scroll se necessário */\n  box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n}\n\n/* Título dentro do Popup */\n.cave-content h5 {\n  margin-top: 0;\n  margin-bottom: 15px;\n  font-size: 1.2em;\n  color: #333;\n}\n\n/* Parágrafos dentro do Popup */\n.cave-content p {\n  margin-bottom: 15px;\n  line-height: 1.6;\n  color: #555;\n  font-size: 0.95em;\n}\n\n/* Botão de Fechar (X) */\n.cave-close {\n  position: absolute;\n  top: 10px;\n  right: 15px;\n  font-size: 24px;\n  font-weight: bold;\n  color: #888;\n  text-decoration: none;\n  line-height: 1;\n  cursor: pointer;\n}\n.cave-close:hover {\n  color: #000;\n}\n\n/* Botão Inicial (Verde) */\n.cave-start-btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background-color: #4CAF50; /* Verde */\n  color: white;\n  text-decoration: none;\n  border-radius: 5px;\n  margin-top: 10px;\n  font-weight: bold;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-start-btn:hover {\n  background-color: #45a049;\n}\n\n/* Botões de Ação dentro dos Popups (Azul) */\n.cave-action-btn {\n  display: inline-block;\n  padding: 8px 15px;\n  background-color: #007bff; /* Azul */\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  margin: 5px 10px; /* Espaçamento entre botões */\n  font-size: 0.9em;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-action-btn:hover {\n  background-color: #0056b3;\n}\n\n/* Estilo para links de saída/finalização (Cinza) */\n.cave-final-btn {\n   display: inline-block;\n  padding: 8px 15px;\n  background-color: #6c757d; /* Cinza */\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  margin: 5px 10px;\n  font-size: 0.9em;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-final-btn:hover {\n  background-color: #5a6268;\n}\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você entra em uma câmara ampla. No centro, uma criatura feita de pedra dorme profundamente. Atrás dela, um baú antigo.</p>\n<p style='text-align:center;'><a href=\"#cave4-start\" class='cave-start-btn'>Avaliar a Situação</a></p>\n\n<!-- Popups Escondidos (Cenas da Caverna 4) -->\n<div id=\"cave4-start\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>O Guardião Adormecido</h5>\n    <p>O Guardião Rochoso ressona. Você pode tentar <strong>passar furtivamente</strong> até o baú ou <strong>tentar acordá-lo</strong> (?).</p>\n    <a href=\"#cave4-sneak\" class=\"cave-action-btn\">Passar Furtivamente</a>\n    <a href=\"#cave4-wake\" class=\"cave-action-btn\">Tentar Acordar</a>\n    <a href=\"#cave4-leave\" class=\"cave-action-btn\" style=\"background-color: #f0ad4e; border-color: #eea236;\">Sair sem arriscar</a> <!-- Botão Laranja -->\n  </div>\n</div>\n\n<div id=\"cave4-sneak\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Furtividade Falhou!</h5>\n    <p>Você pisa em falso! O Guardião acorda furioso!</p>\n    <p><strong>Efeito: Perca 20 Progresso e fuja!</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Fugir!</a>\n  </div>\n</div>\n\n<div id=\"cave4-wake\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Guardião Amigável?</h5>\n    <p>Inesperadamente, o Guardião abre um olho, sorri (!?) e aponta para o baú, como se o oferecesse.</p>\n    <p><strong>Efeito: Abra o Baú! (+1 Estrela Fixa e +1 Pulo)</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Agradecer e Pegar</a>\n  </div>\n</div>\n\n<div id=\"cave4-leave\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Sair Quieto</h5>\n    <p>Você decide não arriscar e sai da caverna.</p>\n    <p><strong>Efeito: Sem Bônus/Penalidade</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Sair em Segurança</a>\n  </div>\n</div>\n\n<!-- Texto Final -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Qual sua decisão? Confirme o resultado no jogo.</p>\n<!-- FIM DO CÓDIGO DA CARTA INTERATIVA -->",
    "dificuldade": "dificil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Decisão tomada na caverna!",
    "desvantagem": "Decisão tomada na caverna!",
    "dica": "Aparências podem enganar...",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Aceite as consequencias"
      }
    ]
  },
  {
    "id": "cave_adv_5",
    "tipo": "Outras",
    "titulo": "Santuário dos Artefatos",
    "pergunta": "<!-- INÍCIO DO CÓDIGO DA CARTA INTERATIVA -->\n<style>\n/* Estilos Base para Popups da Caverna (Reutilizados ou Definidos se for a primeira vez) */\n.cave-popup {\n  position: fixed; /* Cobre a tela */\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.75); /* Fundo escuro semi-transparente */\n  display: none; /* Escondido por padrão */\n  justify-content: center;\n  align-items: center;\n  z-index: 1000; /* Fica sobre outros elementos */\n  padding: 20px;\n  box-sizing: border-box;\n  text-align: center; /* Centraliza texto dentro do popup */\n}\n\n/* Mostra o popup quando seu ID é o alvo do link */\n.cave-popup:target {\n  display: flex;\n}\n\n/* Caixa de Conteúdo do Popup */\n.cave-content {\n  position: relative; /* Para posicionar o botão de fechar */\n  background-color: #fff; /* Fundo branco */\n  padding: 30px;\n  border-radius: 8px;\n  max-width: 500px; /* Largura máxima */\n  max-height: 90vh; /* Altura máxima */\n  overflow-y: auto; /* Adiciona scroll se necessário */\n  box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n}\n\n/* Título dentro do Popup */\n.cave-content h5 {\n  margin-top: 0;\n  margin-bottom: 15px;\n  font-size: 1.2em;\n  color: #333;\n}\n\n/* Parágrafos dentro do Popup */\n.cave-content p {\n  margin-bottom: 15px;\n  line-height: 1.6;\n  color: #555;\n  font-size: 0.95em;\n}\n\n/* Botão de Fechar (X) */\n.cave-close {\n  position: absolute;\n  top: 10px;\n  right: 15px;\n  font-size: 24px;\n  font-weight: bold;\n  color: #888;\n  text-decoration: none;\n  line-height: 1;\n  cursor: pointer;\n}\n.cave-close:hover {\n  color: #000;\n}\n\n/* Botão Inicial (Verde) */\n.cave-start-btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background-color: #4CAF50; /* Verde */\n  color: white;\n  text-decoration: none;\n  border-radius: 5px;\n  margin-top: 10px;\n  font-weight: bold;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-start-btn:hover {\n  background-color: #45a049;\n}\n\n/* Botões de Ação dentro dos Popups (Azul) */\n.cave-action-btn {\n  display: inline-block;\n  padding: 8px 15px;\n  background-color: #007bff; /* Azul */\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  margin: 5px 10px; /* Espaçamento entre botões */\n  font-size: 0.9em;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-action-btn:hover {\n  background-color: #0056b3;\n}\n\n/* Estilo para links de saída/finalização (Cinza) */\n.cave-final-btn {\n   display: inline-block;\n  padding: 8px 15px;\n  background-color: #6c757d; /* Cinza */\n  color: white;\n  text-decoration: none;\n  border-radius: 4px;\n  margin: 5px 10px;\n  font-size: 0.9em;\n  border: none;\n  cursor: pointer;\n  transition: background-color 0.2s;\n}\n.cave-final-btn:hover {\n  background-color: #5a6268;\n}\n\n/* Estilos específicos para os Artefatos */\n.artifact-option {\n  display: block; /* Faz ocupar a largura disponível no flex container */\n  border: 2px solid #e2e8f0; /* Cinza claro */\n  padding: 12px;\n  margin: 5px 0; /* Margem vertical entre eles */\n  border-radius: 6px;\n  cursor: pointer;\n  background: #f8fafc; /* Fundo levemente acinzentado */\n  text-decoration: none;\n  color: #1e293b; /* Cor do texto escura */\n  font-weight: 500;\n  transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;\n  text-align: center;\n}\n.artifact-option:hover {\n  border-color: #60a5fa; /* Azul claro no hover */\n  background-color: #eff6ff; /* Fundo azul muito claro */\n  box-shadow: 0 2px 5px rgba(0,0,0,0.1);\n}\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você chega a um santuário antigo com três artefatos em pedestais. Você só pode levar um.</p>\n<p style='text-align:center;'><a href=\"#cave5-start\" class='cave-start-btn'>Examinar Artefatos</a></p>\n\n<!-- Popups Escondidos (Cenas da Caverna 5) -->\n<div id=\"cave5-start\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Escolha seu Artefato</h5>\n    <p>Selecione um para levar:</p>\n    <!-- Flex container para os artefatos -->\n    <div style='display:flex; flex-direction: column; gap: 10px; margin-top:15px;'>\n      <a href=\"#cave5-orb\" class='artifact-option'>🔮 Orbe da Visão (+10 Progresso)</a>\n      <a href=\"#cave5-boots\" class='artifact-option'>👟 Botas da Leveza (+1 Pulo)</a>\n      <a href=\"#cave5-shield\" class='artifact-option'>🛡️ Escudo Protetor (Ignora próxima Desvantagem)</a>\n    </div>\n  </div>\n</div>\n\n<!-- Popups de Resultado -->\n<div id=\"cave5-orb\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Orbe da Visão Escolhido!</h5>\n    <p>Você sente o poder do Orbe fluir!</p>\n    <p><strong>Efeito: +10 Progresso</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Sair com o Orbe</a>\n  </div>\n</div>\n\n<div id=\"cave5-boots\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Botas da Leveza Escolhidas!</h5>\n    <p>Seus pés parecem mais leves!</p>\n    <p><strong>Efeito: +1 Pulo</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Sair com as Botas</a>\n  </div>\n</div>\n\n<div id=\"cave5-shield\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a>\n    <h5>Escudo Protetor Escolhido!</h5>\n    <p>Uma barreira tênue te envolve!</p>\n    <p><strong>Efeito: Ignora próxima Desvantagem (informe o Mestre)</strong></p>\n    <a href=\"#\" class=\"cave-final-btn\">Sair com o Escudo</a>\n  </div>\n</div>\n\n<!-- Texto Final -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Escolha um artefato clicando nele e confirme o efeito no jogo.</p>\n<!-- FIM DO CÓDIGO DA CARTA INTERATIVA -->",
    "dificuldade": "normal",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Artefato adquirido!",
    "desvantagem": "Artefato adquirido!",
    "dica": "Escolha o que mais te ajudará agora.",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Aceite as consequencias"
      }
    ]
  },
  {
    "id": "adv_florestal_caverna_1",
    "tipo": "Outras",
    "titulo": "A Caverna da Raiz Ancestral",
    "pergunta": "<style>\n/* Estilos gerais dos popups da caverna */\n.cave-popup { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(30, 41, 59, 0.9); display:none; justify-content:center; align-items:center; z-index:1010; padding:15px; }\n.cave-popup:target { display:flex; }\n.cave-content { background:#475569; color: #e2e8f0; padding:25px; border-radius:8px; max-width:400px; /* Largura aumentada */ text-align:center; position:relative; border: 3px solid #64748b; }\n.cave-content h5 { margin:0 0 15px 0; color: #cbd5e1; border-bottom: 1px solid #64748b; padding-bottom: 8px; font-size: 1.1em; }\n.cave-content p { margin-bottom: 15px; font-size:0.95em; line-height:1.5; }\n.cave-content img { display: block; max-width: 150px; /* Tamanho imagem interna */ height: auto; margin: 10px auto; border-radius: 5px; border: 1px solid #9ca3af; }\n.cave-content a { color: #93c5fd; text-decoration: underline; margin: 5px 10px; cursor: pointer; display: inline-block; }\n.cave-close { position:absolute; top:8px; right:12px; font-size:24px; color:#9ca3af; text-decoration:none; }\n.cave-close:hover { color: white; }\n.cave-start-btn { display:inline-block; padding: 10px 15px; background:#16a34a; color:white; border-radius:5px; text-decoration:none; font-weight:bold; }\n.boss-actions a { background: #dc2626; color: white; padding: 8px 12px; border-radius: 4px; font-weight: bold; }\n.boss-actions a:hover { background: #b91c1c; }\n</style>\n<p style='text-align:center;'>Você descobre uma entrada de caverna oculta por raízes grossas e musgo luminoso...</p>\n<p style='text-align:center;'><a href=\"#cf1-start\" class='cave-start-btn'>Entrar na Caverna Ancestral</a></p>\n\n<!-- Cenas da Caverna Florestal -->\n\n<!-- Entrada -->\n<div id=\"cf1-start\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Entrada Verdejante</h5>\n    <img src=\"/images/caverna/entrada_raizes.png\" alt=\"Entrada com raízes\">\n    <p>O ar é terroso e úmido. Raízes enormes serpenteiam pelas paredes. O caminho se divide: um túnel com <strong>cogumelos bioluminescentes</strong> à esquerda, e outro com <strong>marcas de garras</strong> à direita.</p>\n    <a href=\"#cf1-cogumelos\">Seguir Cogumelos</a> <a href=\"#cf1-garras\">Seguir Garras</a>\n  </div>\n</div>\n\n<!-- Caminho Cogumelos -->\n<div id=\"cf1-cogumelos\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Trilha dos Fungos</h5>\n    <img src=\"/images/caverna/cogumelos_brilhantes.png\" alt=\"Cogumelos brilhantes\">\n    <p>A luz suave dos cogumelos ilumina o caminho. Você encontra um córrego subterrâneo com água pura. Você pode <strong>beber a água</strong> ou <strong>analisar a formação rochosa</strong> incomum na parede.</p>\n    <a href=\"#cf1-agua\">Beber Água</a> <a href=\"#cf1-rocha\">Analisar Rocha</a>\n  </div>\n</div>\n\n<!-- Caminho Garras -->\n<div id=\"cf1-garras\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Rastro da Fera</h5>\n    <img src=\"/images/caverna/marcas_garras.png\" alt=\"Marcas de garras na parede\">\n    <p>As marcas de garras são profundas. Você ouve um rosnado baixo à frente. Você pode <strong>preparar uma armadilha improvisada</strong> com cipós ou <strong>avançar com cautela</strong>.</p>\n    <a href=\"#cf1-armadilha\">Preparar Armadilha</a> <a href=\"#cf1-cautela\">Avançar Cautelosamente</a>\n  </div>\n</div>\n\n<!-- Sub-caminhos Esquerda -->\n<div id=\"cf1-agua\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Água Revigorante</h5>\n    <p>A água é pura e fresca! Você se sente revigorado.</p>\n    <p><strong>Efeito: +15 Progresso</strong></p>\n    <a href=\"#cf1-final-bom\">Seguir Adiante</a>\n  </div>\n</div>\n<div id=\"cf1-rocha\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Formação Incomum</h5>\n    <p>Ao examinar a rocha, você percebe que é um veio de minério útil para ferramentas!</p>\n    <p><strong>Efeito: +1 Recurso 'Metal Raro'</strong></p>\n    <a href=\"#cf1-final-bom\">Seguir Adiante</a>\n  </div>\n</div>\n\n<!-- Sub-caminhos Direita -->\n<div id=\"cf1-armadilha\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Armadilha Pronta</h5>\n    <p>Você monta a armadilha. Ouve a criatura se aproximando e caindo nela! Era um Javali Selvagem gigante. Você passa seguro.</p>\n    <p><strong>Efeito: +5 Progresso (Engenhosidade)</strong></p>\n    <a href=\"#cf1-final-medio\">Seguir Caminho Livre</a>\n  </div>\n</div>\n<div id=\"cf1-cautela\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Avanço Cauteloso</h5>\n    <p>Você avança em silêncio... tarde demais! Um Morcego-Gigante das Cavernas te ataca!</p>\n    <img src=\"/images/caverna/morcego_gigante.png\" alt=\"Morcego gigante\">\n    <p><strong>Efeito: Perca 10 Progresso e fuja ferido!</strong></p>\n    <a href=\"#cf1-final-ruim\">Fugir!</a>\n  </div>\n</div>\n\n<!-- Final da Caverna -->\n<div id=\"cf1-final-bom\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Coração da Caverna</h5>\n    <img src=\"/images/caverna/raiz_ancestral.png\" alt=\"Raiz Ancestral brilhante\">\n    <p>Você chega ao centro da caverna, onde uma Raiz Ancestral gigante pulsa com energia vital. Ela te oferece uma bênção.</p>\n    <p><strong>Recompensa Final: +1 Estrela Fixa!</strong></p>\n    <a href=\"#\">Sair Abençoado</a>\n  </div>\n</div>\n<div id=\"cf1-final-medio\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Saída Segura</h5>\n    <p>Você encontra a saída da caverna, um pouco tenso, mas ileso e com o que conseguiu no caminho.</p>\n    <p><strong>Recompensa Final: O que você coletou (+5 Progresso ou +1 Kit Reparo)</strong></p>\n    <a href=\"#\">Sair da Caverna</a>\n  </div>\n</div>\n<div id=\"cf1-final-ruim\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Fuga Desesperada</h5>\n    <p>Você escapa por pouco do morcego, mas sai de mãos vazias e machucado.</p>\n    <p><strong>Resultado Final: -10 Progresso Total</strong></p>\n    <a href=\"#\">Sair Ferido</a>\n  </div>\n</div>\n\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Escolha seu caminho e clique na opção final correspondente.</p>",
    "dificuldade": "dificil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aventura na Caverna Ancestral concluída!",
    "desvantagem": "Aventura na Caverna Ancestral concluída!",
    "dica": "Pese os riscos e recompensas de cada escolha.",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Aceite as consequencias"
      }
    ]
  },
  {
    "id": "cave_longa_1",
    "tipo": "Outras",
    "titulo": "A Caverna das Raízes Retorcidas",
    "pergunta": "<style>\n/* Estilos .cave-* reutilizados e ajustados */\n.cave-popup { position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(41, 37, 36, 0.9); /* Marrom escuro */ display:none; justify-content:center; align-items:center; z-index:1010; padding:15px; overflow-y: auto; /* Permite rolagem se conteúdo for grande */}\n.cave-popup:target { display:flex; }\n.cave-content { background:#78716c; /* Cinza pedra */ color: #f1f5f9; padding:25px; border-radius:8px; max-width:420px; /* Pouco maior */ text-align:center; position:relative; border: 3px solid #57534e; }\n.cave-content h5 { margin:0 0 15px 0; color: #e2e8f0; border-bottom: 1px solid #a1a1aa; padding-bottom: 8px; font-size: 1.2em; }\n.cave-content p { margin-bottom: 15px; font-size:1em; line-height:1.6; }\n.cave-content img { display: block; max-width: 180px; /* Imagem pouco maior */ height: auto; margin: 15px auto; border-radius: 5px; border: 1px solid #a1a1aa; background: #e5e7eb; }\n.cave-content a { color: #bfdbfe; text-decoration: underline; margin: 8px 12px; cursor: pointer; display: inline-block; font-weight: 500; }\n.cave-content a:hover { color: #60a5fa; }\n.cave-close { position:absolute; top:8px; right:12px; font-size:24px; color:#a1a1aa; text-decoration:none; }\n.cave-close:hover { color: white; }\n.cave-start-btn { display:inline-block; padding: 10px 15px; background:#166534; color:white; border-radius:5px; text-decoration:none; font-weight:bold; }\n.final-reward { font-weight: bold; font-size: 1.1em; color: #bbf7d0; /* Verde claro para recompensa */ margin-top:10px;}\n.final-penalty { font-weight: bold; font-size: 1.1em; color: #fecaca; /* Vermelho claro para penalidade */ margin-top:10px;}\n.final-neutral { font-weight: bold; font-size: 1.1em; color: #e5e7eb; /* Cinza claro para neutro */ margin-top:10px;}\n</style>\n<p style='text-align:center;'>A entrada da caverna é uma fenda escura entre raízes gigantes e retorcidas. Um cheiro de terra molhada e algo antigo emana de dentro.</p>\n<p style='text-align:center;'><a href=\"#caveL1-start\" class='cave-start-btn'>Avançar pela Escuridão</a></p>\n\n<!-- === Cenas da Caverna Longa === -->\n\n<!-- Entrada / Bifurcação 1 -->\n<div id=\"caveL1-start\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Encruzilhada das Raízes</h5>\n    <img src=\"/images/caverna/bifurcacao_raizes.png\" alt=\"Bifurcação com raízes\">\n    <p>Após alguns metros, a luz da entrada some. À <strong>esquerda</strong>, um caminho com musgo luminoso e gotas d'água. À <strong>direita</strong>, um túnel seco com ossos espalhados.</p>\n    <a href=\"#caveL1-left-musgo\">Seguir Musgo (Esquerda)</a> \n    <a href=\"#caveL1-right-ossos\">Seguir Ossos (Direita)</a>\n  </div>\n</div>\n\n<!-- === CAMINHO DA ESQUERDA === -->\n<div id=\"caveL1-left-musgo\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Trilha Luminescente</h5>\n    <img src=\"/images/caverna/musgo_luminoso.png\" alt=\"Musgo brilhante\">\n    <p>O musgo ilumina suavemente. Você encontra um veio brilhante na parede e um lago subterrâneo logo adiante.</p>\n    <a href=\"#caveL1-left-minerio\">Examinar Veio de Minério</a> \n    <a href=\"#caveL1-left-lago\">Aproximar-se do Lago</a>\n  </div>\n</div>\n\n<!-- Esquerda -> Minério (Fim A) -->\n<div id=\"caveL1-left-minerio\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Descoberta Mineral</h5>\n    <img src=\"/images/caverna/minerio_raro.png\" alt=\"Minério Raro\">\n    <p>É um minério raro usado em ferramentas avançadas!</p>\n    <p class=\"final-reward\">Resultado: +1 Recurso 'Metal Raro'</p>\n    <a href=\"#\">Sair com o Minério</a>\n  </div>\n</div>\n\n<!-- Esquerda -> Lago -->\n<div id=\"caveL1-left-lago\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Lago Subterrâneo</h5>\n    <img src=\"/images/caverna/lago_subterraneo.png\" alt=\"Lago Subterrâneo\">\n    <p>A água é cristalina, mas profunda. Algo brilha no fundo. Você pode tentar <strong>mergulhar</strong> ou <strong>contornar</strong> pela margem estreita.</p>\n    <a href=\"#caveL1-left-mergulhar\">Mergulhar pelo Brilho</a> \n    <a href=\"#caveL1-left-contornar\">Contornar pela Margem</a>\n  </div>\n</div>\n\n<!-- Esquerda -> Lago -> Mergulhar (Fim B) -->\n<div id=\"caveL1-left-mergulhar\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Tesouro Submerso</h5>\n    <img src=\"/images/caverna/artefato_submerso.png\" alt=\"Artefato Antigo\">\n    <p>Com esforço, você alcança o fundo e recupera um artefato antigo!</p>\n    <p class=\"final-reward\">Resultado: +1 Estrela Fixa</p>\n    <a href=\"#\">Sair com o Artefato</a>\n  </div>\n</div>\n\n<!-- Esquerda -> Lago -> Contornar (Fim C) -->\n<div id=\"caveL1-left-contornar\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Margem Segura</h5>\n    <p>Você contorna o lago com segurança e encontra a saída da caverna logo adiante, mas não encontrou nada de especial.</p>\n    <p class=\"final-neutral\">Resultado: Sem Bônus/Penalidade</p>\n    <a href=\"#\">Sair da Caverna</a>\n  </div>\n</div>\n\n<!-- === CAMINHO DA DIREITA === -->\n<div id=\"caveL1-right-ossos\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Vale dos Ossos</h5>\n    <img src=\"/images/caverna/ossos_espalhados.png\" alt=\"Ossos no chão\">\n    <p>Ossos de animais grandes estão por toda parte. Você ouve um som de algo pesado se arrastando à frente. Você pode <strong>investigar o som</strong> ou tentar <strong>escalar uma parede lateral</strong> para evitar o que quer que seja.</p>\n    <a href=\"#caveL1-right-som\">Investigar Som</a> \n    <a href=\"#caveL1-right-escalar\">Escalar Parede</a>\n  </div>\n</div>\n\n<!-- Direita -> Investigar Som -->\n<div id=\"caveL1-right-som\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Encontro com a Fera</h5>\n    <img src=\"/images/caverna/urso_caverna.png\" alt=\"Urso da Caverna\">\n    <p>É um enorme Urso da Caverna! Ele te vê e se prepara para atacar. Rápido! <strong>Atacar</strong> com o que tiver ou <strong>Fugir</strong>?</p>\n    <div class=\"boss-actions\">\n      <a href=\"#caveL1-right-atacar\">Atacar!</a> \n      <a href=\"#caveL1-right-fugir\">Fugir!</a>\n    </div>\n  </div>\n</div>\n\n<!-- Direita -> Som -> Atacar (Fim D) -->\n<div id=\"caveL1-right-atacar\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Vitória!</h5>\n    <p>Com coragem (e sorte!), você consegue afugentar o Urso! Ele deixa para trás restos de suas caças.</p>\n    <p class=\"final-reward\">Resultado: +1 Pulo (Coragem) e +5 Progresso</p>\n    <a href=\"#\">Sair Vitorioso</a>\n  </div>\n</div>\n\n<!-- Direita -> Som -> Fugir (Fim E) -->\n<div id=\"caveL1-right-fugir\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Fuga por Pouco</h5>\n    <p>Você corre desesperadamente e encontra uma saída estreita, mas deixou cair alguns suprimentos na pressa.</p>\n    <p class=\"final-penalty\">Resultado: -5 Progresso</p>\n    <a href=\"#\">Sair Correndo</a>\n  </div>\n</div>\n\n<!-- Direita -> Escalar Parede (Fim F) -->\n<div id=\"caveL1-right-escalar\" class=\"cave-popup\">\n  <div class=\"cave-content\">\n    <a href=\"#\" class=\"cave-close\">×</a> <h5>Escalada Arriscada</h5>\n    <img src=\"/images/caverna/parede_escalada.png\" alt=\"Parede da caverna\">\n    <p>A escalada é difícil. Você escorrega, mas consegue se segurar! Chega a uma plataforma elevada com vista para a saída.</p>\n    <p class=\"final-neutral\">Resultado: Cansativo, mas seguro. Sem Bônus/Penalidade.</p>\n    <a href=\"#\">Sair pela Plataforma</a>\n  </div>\n</div>\n\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Explore os caminhos e, quando chegar a um final, clique na opção abaixo.</p>",
    "dificuldade": "dificil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Você sobreviveu à Caverna das Raízes Retorcidas!",
    "desvantagem": "",
    "dica": "Cada escolha leva a um destino diferente.",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Concluir Exploração da Caverna"
      }
    ]
  },
  {
    "id": "new_1745796410016_131966b810aaa8",
    "tipo": "Outras",
    "titulo": "Caverna ancestral",
    "pergunta": "<!-- INÍCIO DA CARTA INTERATIVA - SANTUÁRIO ESQUECIDO -->\n<style>\n/* Estilos Base (Estilo Reflorestamento Místico - adaptado) */\n.cave-popup-sf { /* Sufixo -sf para Santuário Esquecido */\n  position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n  background-color: rgba(210, 255, 230, 0.92); /* Fundo Verde muito pálido translúcido */\n  display: none; justify-content: center; align-items: center;\n  z-index: 1000; padding: 15px; box-sizing: border-box; text-align: center;\n  backdrop-filter: blur(1.5px);\n}\n.cave-popup-sf:target { display: flex; }\n.cave-content-sf {\n  position: relative; background: linear-gradient(145deg, #ffffff, #f0fdfa); /* Branco para Ciano muito claro */\n  padding: 25px 35px; border-radius: 15px; max-width: 650px; max-height: 90vh;\n  overflow-y: auto; box-shadow: 0 8px 30px rgba(10, 100, 80, 0.25);\n  border: 5px solid #5eead4; /* Ciano claro */\n  color: #134e4a; /* Ciano escuro */\n}\n.cave-content-sf h5 {\n  margin-top: 0; margin-bottom: 20px; font-size: 1.6em; color: #115e59; /* Ciano médio-escuro */\n  border-bottom: 2px solid #99f6e4; padding-bottom: 12px; font-family: 'Georgia', serif;\n  text-shadow: 1px 1px 1px #ccfbf1;\n}\n.cave-content-sf p { margin-bottom: 18px; line-height: 1.7; font-size: 1.05em; }\n.cave-close-sf {\n  position: absolute; top: 15px; right: 20px; font-size: 30px; font-weight: bold;\n  color: #5eead4; text-decoration: none; line-height: 1; cursor: pointer;\n  transition: color 0.2s;\n}\n.cave-close-sf:hover { color: #2dd4bf; }\n\n/* Botões */\n.cave-start-btn-sf, .cave-action-btn-sf, .cave-final-btn-sf, .benefit-option-sf {\n  display: inline-block; padding: 12px 25px; color: white; text-decoration: none;\n  border-radius: 30px; margin: 10px 8px; font-size: 1em; font-weight: 600;\n  border: none; cursor: pointer; transition: all 0.2s ease-in-out;\n  min-width: 160px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);\n  text-shadow: 1px 1px 1px rgba(0,0,0,0.2);\n}\n.cave-start-btn-sf:hover, .cave-action-btn-sf:hover, .cave-final-btn-sf:hover, .benefit-option-sf:hover {\n   box-shadow: 0 6px 12px rgba(0,0,0,0.25); transform: translateY(-2px);\n}\n.cave-start-btn-sf:active, .cave-action-btn-sf:active, .cave-final-btn-sf:active, .benefit-option-sf:active {\n    transform: translateY(0px); box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n}\n.cave-start-btn-sf { background: linear-gradient(45deg, #2dd4bf, #14b8a6); color: #042f2e;} /* Ciano */\n.cave-start-btn-sf:hover { background: linear-gradient(45deg, #14b8a6, #0d9488); }\n.cave-action-btn-sf { background: linear-gradient(45deg, #a7f3d0, #6ee7b7); color:#065f46 } /* Verde Claro */\n.cave-action-btn-sf:hover { background: linear-gradient(45deg, #6ee7b7, #34d399); }\n.cave-final-btn-sf { background: linear-gradient(45deg, #86efac, #4ade80); color:#14532d;} /* Verde Lima */\n.cave-final-btn-sf:hover { background: linear-gradient(45deg, #4ade80, #22c55e); }\n\n/* Estilos específicos */\n.btn-warning-sf { background: linear-gradient(45deg, #fbbf24, #f59e0b); color: #422006;} .btn-warning-sf:hover { background: linear-gradient(45deg, #f59e0b, #d97706); }\n.btn-danger-sf { background: linear-gradient(45deg, #fca5a5, #f87171); } .btn-danger-sf:hover { background: linear-gradient(45deg, #f87171, #ef4444); }\n.cave-image-sf { display: block; max-width: 75%; height: auto; margin: 20px auto; border-radius: 15px; border: 5px solid #ccfbf1; box-shadow: 0 6px 12px rgba(0,0,0,0.2); }\n\n/* Benefícios Finais */\n.benefit-option-sf {\n    background: linear-gradient(to bottom right, #ecfdf5, #d1fae5); /* Gradiente verde claro */\n    color: #065f46; border: 2px solid #6ee7b7; width: 90%; margin: 12px auto; display: block;\n}\n.benefit-option-sf:hover { border-color: #34d399; background: linear-gradient(to bottom right, #d1fae5, #a7f3d0); }\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você descobre um caminho oculto que leva a um vale esquecido, onde ruínas de um antigo santuário florestal emergem da vegetação densa.</p>\n<p style='text-align:center;'>🏛️🌿✨</p>\n<p style='text-align:center;'><a href=\"#caveSF-entry\" class='cave-start-btn-sf'>Explorar o Santuário Esquecido</a></p>\n\n<!-- Popups Escondidos -->\n\n<!-- Cena 1: Entrada do Santuário -->\n<div id=\"caveSF-entry\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Ruínas Ancestrais</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/templo-na-selva-no-cambodja-gerado-por-ia_1112-11168.jpg?w=740\" alt=\"Ruínas na floresta\" class=\"cave-image-sf\">\n    <p>Videiras grossas cobrem pedras esculpidas com símbolos da natureza. O ar é pesado com o silêncio de séculos. Você vê dois caminhos principais: um leva a uma <strong>estrutura central em ruínas</strong>, parcialmente coberta por uma árvore gigante, e o outro segue por um <strong>jardim abandonado</strong> com plantas estranhas.</p>\n    <a href=\"#caveSF-centralRuin\" class=\"cave-action-btn-sf\">Ir para a Estrutura Central</a>\n    <a href=\"#caveSF-abandonedGarden\" class=\"cave-action-btn-sf\">Explorar Jardim Abandonado</a>\n  </div>\n</div>\n\n<!-- Ramo 1: Estrutura Central -->\n<div id=\"caveSF-centralRuin\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>O Coração do Santuário</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/arvore-antiga-com-raizes-expostas-e-tronco-grosso_1048944-11375275.jpg?w=740\" alt=\"Árvore gigante nas ruínas\" class=\"cave-image-sf\">\n    <p>Uma árvore imensa cresceu através do teto colapsado da estrutura principal. Suas raízes formam um labirinto no interior. Você nota um brilho fraco vindo de uma abertura nas raízes (<strong>Nicho da Raiz</strong>) e um som de água pingando de uma câmara adjacente (<strong>Câmara Ecoante</strong>).</p>\n    <a href=\"#caveSF-rootNiche\" class=\"cave-action-btn-sf\">Investigar Nicho da Raiz</a>\n    <a href=\"#caveSF-echoChamber\" class=\"cave-action-btn-sf\">Entrar na Câmara Ecoante</a>\n    <a href=\"#caveSF-leaveRuin\" class=\"cave-action-btn-sf btn-warning-sf\">Sair da Estrutura (Voltar)</a>\n  </div>\n</div>\n\n<!-- Ramo 1.1: Nicho da Raiz -->\n<div id=\"caveSF-rootNiche\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Altar Escondido</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/antigo-tesouro-no-peito_87394-15365.jpg?w=740\" alt=\"Baú antigo\" class=\"cave-image-sf\">\n    <p>Dentro do nicho, um pequeno altar de pedra sustenta um baú de madeira escura, selado com vinhas resistentes. Você pode tentar <strong>forçar o baú</strong> ou <strong>procurar um mecanismo</strong> de abertura nas raízes.</p>\n    <a href=\"#caveSF-forceChest\" class=\"cave-action-btn-sf btn-danger-sf\">Forçar o Baú</a>\n    <a href=\"#caveSF-findMechanism\" class=\"cave-action-btn-sf\">Procurar Mecanismo</a>\n  </div>\n</div>\n\n<!-- Ramo 1.1.1: Forçar o Baú -->\n<div id=\"caveSF-forceChest\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Armadilha de Espinhos!</h5>\n    <p>Ao forçar a tampa, espinhos afiados saem das laterais! Você se fere e o baú se revela vazio, exceto por uma poeira irritante.</p>\n    <p><strong>Efeito: Perca 1 Estrela Fixa E fique preso 1 rodada.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-sf btn-danger-sf\">Recuar Ferido e Irritado</a>\n  </div>\n</div>\n\n<!-- Ramo 1.1.2: Procurar Mecanismo -->\n<div id=\"caveSF-findMechanism\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Segredo das Raízes</h5>\n    <p>Seguindo as vinhas, você encontra uma raiz com um nó diferente. Ao pressioná-la, o baú se abre suavemente, revelando um conjunto de ferramentas de enxertia antigas e perfeitamente preservadas.</p>\n    <img src=\"https://img.freepik.com/fotos-gratis/equipamento-de-jardinagem-com-espaco-de-copia_23-2148102136.jpg?w=740\" alt=\"Ferramentas de jardinagem\" class=\"cave-image-sf\">\n    <p><strong>Efeito: Ganhe 1 contador \"Ferramentas Ancestrais\".</strong></p>\n    <a href=\"#caveSF-finalChamber\" class=\"cave-action-btn-sf btn-success-sf\">Prosseguir para a Câmara Final</a> <!-- Pula para a câmara final -->\n  </div>\n</div>\n\n<!-- Ramo 1.2: Câmara Ecoante -->\n<div id=\"caveSF-echoChamber\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Poço dos Ecos</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/tiro-vertical-de-um-lago-em-uma-caverna-com-longa-exposicao_181624-23681.jpg?w=740\" alt=\"Poço em caverna\" class=\"cave-image-sf\">\n    <p>A câmara contém um poço profundo de onde vem o som da água. O eco é estranho, quase como se respondesse. Você pode <strong>gritar no poço</strong> ou <strong>atirar uma pedra</strong> para testar a profundidade.</p>\n    <a href=\"#caveSF-shoutWell\" class=\"cave-action-btn-sf\">Gritar no Poço</a>\n    <a href=\"#caveSF-throwStone\" class=\"cave-action-btn-sf\">Atirar uma Pedra</a>\n  </div>\n</div>\n\n<div id=\"caveSF-shoutWell\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Eco Hostil</h5>\n    <p>Seu grito é devolvido com uma força sônica que te desorienta e atrai Morcegos-Cristal agressivos!</p>\n     <img src=\"https://img.freepik.com/fotos-premium/morcegos-voando-em-uma-caverna-escura_783464-2292.jpg?w=740\" alt=\"Morcegos\" class=\"cave-image-sf\">\n    <p><strong>Efeito: Perca 1 Pulo E remova 3 respostas CORRETAS</strong> (conhecimento perdido na confusão).</p>\n    <a href=\"#\" class=\"cave-final-btn-sf btn-danger-sf\">Fugir dos Morcegos</a>\n  </div>\n</div>\n\n<div id=\"caveSF-throwStone\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Resposta Aquática</h5>\n    <p>A pedra cai na água com um 'plop'. Segundos depois, um tentáculo de água sobe e deposita uma Pérola Lunar brilhante na borda do poço antes de recuar.</p>\n    <p><strong>Efeito: Ganhe 1 contador \"Pérola Lunar\".</strong></p>\n    <a href=\"#caveSF-finalChamber\" class=\"cave-action-btn-sf btn-success-sf\">Pegar a Pérola e Ir para Câmara Final</a> <!-- Pula para a câmara final -->\n  </div>\n</div>\n\n\n<!-- Ramo 1.3: Sair da Ruína -->\n<div id=\"caveSF-leaveRuin\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Retorno Cauteloso</h5>\n    <p>Você decide não explorar mais a estrutura central por enquanto e retorna à entrada do santuário.</p>\n    <p><em>(Você retorna à cena #caveSF-entry - Clique no botão abaixo para simular ou feche e clique na opção do Jardim)</em></p> <!-- Nota para o jogador -->\n    <a href=\"#caveSF-entry\" class=\"cave-action-btn-sf\">Voltar para a Entrada</a>\n  </div>\n</div>\n\n\n<!-- Ramo 2: Jardim Abandonado -->\n<div id=\"caveSF-abandonedGarden\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Jardim das Plantas Bizarras</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/plantas-carnivoras-coloridas-brilhantes-na-selva_818261-30306.jpg?w=740\" alt=\"Plantas estranhas\" class=\"cave-image-sf\">\n    <p>Plantas que brilham, outras que se movem sozinhas, e algumas que parecem observar você crescem aqui. No centro, uma fonte seca está cercada por três tipos de solo: <strong>Argiloso</strong>, <strong>Arenoso</strong> e <strong>Humífero</strong> (rico em matéria orgânica).</p>\n    <a href=\"#caveSF-examineClay\" class=\"cave-action-btn-sf\">Examinar Solo Argiloso</a>\n    <a href=\"#caveSF-examineSand\" class=\"cave-action-btn-sf\">Examinar Solo Arenoso</a>\n    <a href=\"#caveSF-examineHumus\" class=\"cave-action-btn-sf btn-success-sf\">Examinar Solo Humífero</a>\n  </div>\n</div>\n\n<!-- Sub-Ramo 2.1: Solo Argiloso -->\n<div id=\"caveSF-examineClay\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Argila Pegajosa</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/textura-de-lama-molhada_1194-7020.jpg?w=740\" alt=\"Argila\" class=\"cave-image-sf\">\n    <p>O solo argiloso está úmido e gruda em suas botas, dificultando o movimento. Parece infértil.</p>\n    <p><strong>Efeito: Fique preso 1 rodada.</strong></p>\n    <a href=\"#\" class=\"cave-final-btn-sf btn-warning-sf\">Limpar as Botas</a>\n  </div>\n</div>\n\n<!-- Sub-Ramo 2.2: Solo Arenoso -->\n<div id=\"caveSF-examineSand\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Areia Movediça Mística!</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/detalhe-de-areia-na-praia_1398-2405.jpg?w=740\" alt=\"Areia\" class=\"cave-image-sf\">\n    <p>A areia fina começa a te sugar! Você luta para sair, perdendo energia e quase sendo engolido por completo!</p>\n    <p><strong>Efeito: Perca 2 Estrelas Fixas!</strong> (Se não tiver, vá para a cadeia).</p>\n    <a href=\"#\" class=\"cave-final-btn-sf btn-danger-sf\">Escapar por um Triz</a>\n  </div>\n</div>\n\n<!-- Sub-Ramo 2.3: Solo Humífero -->\n<div id=\"caveSF-examineHumus\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>Terra Fértil e Segredos</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/textura-de-solo-marrom-de-vista-superior-para-jardinagem_1150-6683.jpg?w=740\" alt=\"Solo rico\" class=\"cave-image-sf\">\n    <p>O solo humífero é rico e cheio de vida microscópica. Remexendo-o, você encontra uma chave de cristal enferrujada.</p>\n    <p><strong>Efeito: Ganhe 1 contador \"Chave Enferrujada\".</strong></p>\n    <a href=\"#caveSF-finalChamber\" class=\"cave-action-btn-sf btn-success-sf\">Ir para a Câmara Final com a Chave</a>\n  </div>\n</div>\n\n<!-- Câmara Final (Convergência) -->\n<div id=\"caveSF-finalChamber\" class=\"cave-popup-sf\">\n  <div class=\"cave-content-sf\">\n    <a href=\"#\" class=\"cave-close-sf\">×</a>\n    <h5>O Altar da Escolha Final</h5>\n     <img src=\"https://img.freepik.com/fotos-premium/altar-de-pedra-antiga-na-floresta_1048944-24505470.jpg?w=740\" alt=\"Altar na floresta\" class=\"cave-image-sf\">\n    <p>Você chega a uma câmara final tranquila. Um altar de pedra irradia uma energia calma. A aventura está quase no fim, mas o santuário oferece uma última dádiva baseada no caminho que você trilhou (ou na sorte!). Escolha sua bênção:</p>\n    <a href=\"#caveSF-finalStars\" class='benefit-option-sf'>🌟🌟 Favor dos Ancestrais (+2 Estrelas)</a>\n    <a href=\"#caveSF-finalCard\" class='benefit-option-sf'>📜 Visão Esclarecida (Ganhe 1 Carta Jogador)</a>\n    <a href=\"#caveSF-finalCurse\" class='benefit-option-sf'>👻 Assombrar Rival (Penalizar Jogador -2 Rodadas)</a>\n    <a href=\"#caveSF-finalPlane\" class='benefit-option-sf'>✈️ Voo das Águias (Ir p/ casa Avião)</a>\n  </div>\n</div>\n\n<!-- Popups Finais de Confirmação da Recompensa -->\n<div id=\"caveSF-finalStars\" class=\"cave-popup-sf\"> <div class=\"cave-content-sf\"> <a href=\"#\" class=\"cave-close-sf\">×</a><h5>Recompensa: Favor dos Ancestrais!</h5><p>Os espíritos da floresta te guiam.</p><p><strong>Efeito: +2 Estrelas Fixas</strong></p><a href=\"#\" class=\"cave-final-btn-sf btn-success-sf\">Sair Iluminado</a></div></div>\n<div id=\"caveSF-finalCard\" class=\"cave-popup-sf\"> <div class=\"cave-content-sf\"> <a href=\"#\" class=\"cave-close-sf\">×</a><h5>Recompensa: Visão Esclarecida!</h5><p>Um novo entendimento sobre a floresta.</p><p><strong>Efeito: Ganhe 1 Carta de Jogador</strong></p><a href=\"#\" class=\"cave-final-btn-sf btn-success-sf\">Sair Sábio</a></div></div>\n<div id=\"caveSF-finalCurse\" class=\"cave-popup-sf\"> <div class=\"cave-content-sf\"> <a href=\"#\" class=\"cave-close-sf\">×</a><h5>Recompensa: Assombrar Rival!</h5><p>Sombras da floresta distrairão um oponente.</p><p><strong>Efeito: Escolha um jogador para ficar 2 rodadas sem jogar</strong></p><a href=\"#\" class=\"cave-final-btn-sf btn-warning-sf\">Sair Travesso</a></div></div>\n<div id=\"caveSF-finalPlane\" class=\"cave-popup-sf\"> <div class=\"cave-content-sf\"> <a href=\"#\" class=\"cave-close-sf\">×</a><h5>Recompensa: Voo das Águias!</h5><p>Você sente o vento te carregar para longe!</p><p><strong>Efeito: Role o dado e vá para casa Avião</strong></p><a href=\"#\" class=\"cave-final-btn-sf btn-success-sf\">Alçar Voo</a></div></div>\n\n<!-- Texto Final Geral -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>O Santuário revela seus últimos segredos. Escolha sua bênção final e aplique o efeito.</p>\n<!-- FIM DA CARTA INTERATIVA - SANTUÁRIO ESQUECIDO -->",
    "dificuldade": "facil",
    "categorias": [],
    "fontes": [],
    "vantagem": "Caverna concluida",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas",
    "respostaCorreta": [
      1
    ],
    "opcoes": [
      {
        "id": 1,
        "texto": "Aceite as consequências"
      }
    ]
  },
  {
    "id": "new_1745796600850_8a33dc0d9c376",
    "tipo": "Outras",
    "titulo": "Caverna elemental 1",
    "pergunta": "<!-- INÍCIO DA CARTA INTERATIVA - CLAREIRA DOS CRISTAIS (ESCOLHA DIRETA) -->\n<style>\n/* Estilos Base (Reutilizados - Reflorestamento Místico) */\n.reforest-popup-ce { /* Sufixo -ce para Crystal Elemental */\n  position: fixed; top: 0; left: 0; width: 100%; height: 100%;\n  background-color: rgba(210, 255, 230, 0.9);\n  display: none; justify-content: center; align-items: center;\n  z-index: 1000; padding: 15px; box-sizing: border-box; text-align: center;\n  backdrop-filter: blur(1px);\n}\n.reforest-popup-ce:target { display: flex; }\n.reforest-content-ce {\n  position: relative; background: linear-gradient(135deg, #ffffff, #e0f2fe);\n  padding: 30px 35px; border-radius: 15px; max-width: 600px; max-height: 90vh;\n  overflow-y: auto; box-shadow: 0 8px 30px rgba(0, 100, 50, 0.2);\n  border: 5px solid #a7f3d0; color: #065f46;\n}\n.reforest-content-ce h5 {\n  margin-top: 0; margin-bottom: 20px; font-size: 1.6em; color: #047857;\n  border-bottom: 2px solid #6ee7b7; padding-bottom: 12px; font-family: 'Georgia', serif;\n}\n.reforest-content-ce p { margin-bottom: 18px; line-height: 1.7; font-size: 1.05em; }\n.reforest-close-ce {\n  position: absolute; top: 15px; right: 20px; font-size: 30px; font-weight: bold;\n  color: #6ee7b7; text-decoration: none; line-height: 1; cursor: pointer;\n}\n.reforest-close-ce:hover { color: #34d399; }\n\n/* Botões */\n.reforest-start-btn-ce, .reforest-action-btn-ce, .reforest-final-btn-ce, .element-option-ce {\n  display: inline-block; padding: 12px 25px; color: white; text-decoration: none;\n  border-radius: 30px; margin: 10px 8px; font-size: 1em; font-weight: 600;\n  border: none; cursor: pointer; transition: all 0.2s ease-in-out;\n  min-width: 160px; box-shadow: 0 4px 8px rgba(0,0,0,0.15);\n  text-shadow: 1px 1px 1px rgba(0,0,0,0.2);\n}\n.reforest-start-btn-ce:hover, .reforest-action-btn-ce:hover, .reforest-final-btn-ce:hover, .element-option-ce:hover {\n   box-shadow: 0 6px 12px rgba(0,0,0,0.25); transform: translateY(-2px);\n}\n.reforest-start-btn-ce:active, .reforest-action-btn-ce:active, .reforest-final-btn-ce:active, .element-option-ce:active {\n    transform: translateY(0px); box-shadow: 0 2px 4px rgba(0,0,0,0.2);\n}\n.reforest-start-btn-ce { background: linear-gradient(45deg, #34d399, #10b981); }\n.reforest-start-btn-ce:hover { background: linear-gradient(45deg, #10b981, #059669); }\n/* Botão de Ação será usado para as opções de elementos */\n.reforest-action-btn-ce { background: linear-gradient(45deg, #a7f3d0, #6ee7b7); color:#065f46 }\n.reforest-action-btn-ce:hover { background: linear-gradient(45deg, #6ee7b7, #34d399); }\n.reforest-final-btn-ce { background: linear-gradient(45deg, #5eead4, #2dd4bf); color:#0f766e;}\n.reforest-final-btn-ce:hover { background: linear-gradient(45deg, #2dd4bf, #14b8a6); }\n\n/* Estilos específicos */\n.reforest-image-ce { display: block; max-width: 75%; height: auto; margin: 20px auto; border-radius: 15px; border: 5px solid #a7f3d0; box-shadow: 0 6px 12px rgba(0,0,0,0.2); }\n\n/* Opções de Elemento */\n.element-option-ce {\n    width: 80%; margin: 12px auto; display: block;\n    border: 3px solid transparent; /* Borda inicial transparente */\n}\n.element-option-ce.earth { background: linear-gradient(135deg, #ca8a04, #a16207); border-color: #78350f; } /* Marrom */\n.element-option-ce.water { background: linear-gradient(135deg, #60a5fa, #2563eb); border-color: #1e3a8a; } /* Azul */\n.element-option-ce.light { background: linear-gradient(135deg, #fde047, #facc15); border-color: #ca8a04; color: #713f12; text-shadow: none;} /* Amarelo */\n\n.element-option-ce:hover {\n    filter: brightness(1.15);\n    border-style: dashed;\n}\n\n</style>\n\n<!-- Conteúdo Visível Inicialmente -->\n<p style='text-align:center;'>Você encontra uma clareira onde o solo está ressecado, mas três grandes cristais elementais pulsam com energia latente: Terra, Água e Luz.</p>\n<p style='text-align:center;'>⛰️💧☀️</p>\n<p style='text-align:center;'><a href=\"#caveCE-start\" class='reforest-start-btn-ce'>Canalizar Energia Elemental</a></p>\n\n<!-- Popups Escondidos -->\n\n<!-- Cena 1: A Escolha Elemental -->\n<div id=\"caveCE-start\" class=\"reforest-popup-ce\">\n  <div class=\"reforest-content-ce\">\n    <a href=\"#\" class=\"reforest-close-ce\">×</a>\n    <h5>Qual Elemento Despertar?</h5>\n    <img src=\"https://img.freepik.com/fotos-premium/fantasia-da-floresta-magica-com-cogumelos-brilhantes-e-rio_787069-733.jpg?w=740\" alt=\"Clareira mágica\" class=\"reforest-image-ce\">\n    <p>Você sente que pode canalizar a energia de apenas UM cristal para tentar revitalizar a área. Cada um trará um resultado diferente.</p>\n    <a href=\"#caveCE-earthChosen\" class=\"element-option-ce earth\">Canalizar Cristal da Terra ⛰️</a>\n    <a href=\"#caveCE-waterChosen\" class=\"element-option-ce water\">Canalizar Cristal da Água 💧</a>\n    <a href=\"#caveCE-lightChosen\" class=\"element-option-ce light\">Canalizar Cristal da Luz ☀️</a>\n  </div>\n</div>\n\n<!-- Resultado 1: Escolheu Terra -->\n<div id=\"caveCE-earthChosen\" class=\"reforest-popup-ce\">\n  <div class=\"reforest-content-ce\">\n    <a href=\"#\" class=\"reforest-close-ce\">×</a>\n    <h5>Poder da Terra</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/campo-agricola-verde_1112-1014.jpg?w=740\" alt=\"Solo fértil\" class=\"reforest-image-ce\">\n    <p>O cristal da Terra pulsa. O solo racha suavemente e se torna escuro e fértil, pronto para novas sementes. Uma pequena bolsa de couro aparece a seus pés.</p>\n    <p><strong>Recompensa Imediata:</strong> Solo preparado.</p>\n    <p><strong>Escolha sua Bênção Adicional:</strong></p>\n    <a href=\"#caveCE-finalEarthStars\" class='reforest-action-btn-ce btn-success-ce'>Bolsa de Sementes Estelares (+2 Estrelas)</a>\n    <a href=\"#caveCE-finalEarthSkip\" class='reforest-action-btn-ce'>Mapa das Linhas Ley (Ir p/ casa Avião)</a>\n  </div>\n</div>\n\n<!-- Resultado 2: Escolheu Água -->\n<div id=\"caveCE-waterChosen\" class=\"reforest-popup-ce\">\n  <div class=\"reforest-content-ce\">\n    <a href=\"#\" class=\"reforest-close-ce\">×</a>\n    <h5>Dádiva da Água</h5>\n    <img src=\"https://img.freepik.com/fotos-gratis/closeup-de-gotas-de-agua-em-folhas-verdes-frescas-apos-a-chuva_181624-24068.jpg?w=740\" alt=\"Gotas de água\" class=\"reforest-image-ce\">\n    <p>O cristal da Água brilha. Uma névoa suave cobre a clareira, umedecendo o solo. Pequenas poças de água pura se formam. Você encontra um pergaminho flutuando em uma delas.</p>\n    <p><strong>Recompensa Imediata:</strong> Solo umedecido.</p>\n    <p><strong>Escolha sua Bênção Adicional:</strong></p>\n    <a href=\"#caveCE-finalWaterCard\" class='reforest-action-btn-ce btn-success-ce'>Pergaminho da Nascente (Ganhe 1 Carta)</a>\n    <a href=\"#caveCE-finalWaterCleanse\" class='reforest-action-btn-ce'>Névoa Purificadora (Remova 3 Erradas)</a>\n  </div>\n</div>\n\n<!-- Resultado 3: Escolheu Luz -->\n<div id=\"caveCE-lightChosen\" class=\"reforest-popup-ce\">\n  <div class=\"reforest-content-ce\">\n    <a href=\"#\" class=\"reforest-close-ce\">×</a>\n    <h5>Foco da Luz</h5>\n     <img src=\"https://img.freepik.com/fotos-gratis/raios-de-sol-brilhando-atraves-das-arvores-em-uma-floresta_181624-17861.jpg?w=740\" alt=\"Luz do sol na floresta\" class=\"reforest-image-ce\">\n    <p>O cristal da Luz irradia calor. Pequenos brotos começam a surgir timidamente do solo, atraídos pela energia. Um pequeno inseto de luz pousa em seu ombro e sussurra um segredo.</p>\n    <p><strong>Recompensa Imediata:</strong> Primeiros brotos.</p>\n    <p><strong>Escolha sua Bênção Adicional:</strong></p>\n    <a href=\"#caveCE-finalLightCurse\" class='reforest-action-btn-ce btn-warning-ce'>Sussurro Maligno (Penalizar Jogador)</a>\n    <a href=\"#caveCE-finalLightStars\" class='reforest-action-btn-ce btn-success-ce'>Guia Luminoso (+2 Estrelas)</a>\n  </div>\n</div>\n\n\n<!-- Popups Finais de Confirmação das Bênçãos -->\n<div id=\"caveCE-finalEarthStars\" class=\"reforest-popup-ce\"> <div class=\"reforest-content-ce\"> <a href=\"#\" class=\"reforest-close-ce\">×</a><h5>Bênção da Terra: Sementes Estelares!</h5><p>As sementes brilham com potencial cósmico.</p><p><strong>Efeito: +2 Estrelas Fixas</strong></p><a href=\"#\" class=\"reforest-final-btn-ce btn-success-ce\">Sair com as Sementes</a></div></div>\n<div id=\"caveCE-finalEarthSkip\" class=\"reforest-popup-ce\"> <div class=\"reforest-content-ce\"> <a href=\"#\" class=\"reforest-close-ce\">×</a><h5>Bênção da Terra: Mapa das Linhas Ley!</h5><p>O mapa revela conexões ocultas da terra.</p><p><strong>Efeito: Role o dado e vá para casa Avião</strong></p><a href=\"#\" class=\"reforest-final-btn-ce btn-success-ce\">Seguir as Linhas Ley</a></div></div>\n<div id=\"caveCE-finalWaterCard\" class=\"reforest-popup-ce\"> <div class=\"reforest-content-ce\"> <a href=\"#\" class=\"reforest-close-ce\">×</a><h5>Bênção da Água: Pergaminho da Nascente!</h5><p>Nova sabedoria flui para você.</p><p><strong>Efeito: Ganhe uma carta de jogador</strong></p><a href=\"#\" class=\"reforest-final-btn-ce btn-success-ce\">Sair Hidratado</a></div></div>\n<div id=\"caveCE-finalWaterCleanse\" class=\"reforest-popup-ce\"> <div class=\"reforest-content-ce\"> <a href=\"#\" class=\"reforest-close-ce\">×</a><h5>Bênção da Água: Névoa Purificadora!</h5><p>Erros passados são lavados.</p><p><strong>Efeito: Remova 3 respostas ERRADAS</strong></p><a href=\"#\" class=\"reforest-final-btn-ce btn-success-ce\">Sair Purificado</a></div></div>\n<div id=\"caveCE-finalLightCurse\" class=\"reforest-popup-ce\"> <div class=\"reforest-content-ce\"> <a href=\"#\" class=\"reforest-close-ce\">×</a><h5>Bênção da Luz: Sussurro Maligno!</h5><p>O inseto te dá o poder de atrapalhar um rival.</p><p><strong>Efeito: Escolha um jogador para ficar 2 rodadas sem jogar</strong></p><a href=\"#\" class=\"reforest-final-btn-ce btn-warning-ce\">Usar o Sussurro</a></div></div>\n<div id=\"caveCE-finalLightStars\" class=\"reforest-popup-ce\"> <div class=\"reforest-content-ce\"> <a href=\"#\" class=\"reforest-close-ce\">×</a><h5>Bênção da Luz: Guia Luminoso!</h5><p>A luz te guiará em sua jornada.</p><p><strong>Efeito: +2 Estrelas Fixas</strong></p><a href=\"#\" class=\"reforest-final-btn-ce btn-success-ce\">Sair Iluminado</a></div></div>\n\n<!-- Texto Final Geral -->\n<p style='text-align:center; font-size:0.8em; margin-top: 15px;'>Você canalizou a energia elemental. Escolha sua bênção final e aplique o efeito.</p>\n<!-- FIM DA CARTA INTERATIVA - CLAREIRA DOS CRISTAIS -->",
    "dificuldade": "facil",
    "categorias": [],
    "fontes": [],
    "vantagem": "",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas",
    "respostaCorreta": [],
    "opcoes": []
  },
  {
    "id": "new_1745797433478_64a903fb07ebf",
    "tipo": "Pergunta",
    "titulo": "Caverna Elemental 2 - cristais",
    "pergunta": `<!-- INÍCIO DA CARTA INTERATIVA - CLAREIRA DOS CRISTAIS (v4 - Fluxo Corrigido) -->
<style>
  /* Estilos Base (Reutilizados - Reflorestamento Místico) */
  .cave-popup-ce4 { /* Sufixo -ce4 */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(210, 255, 230, 0.92);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 15px;
    box-sizing: border-box;
    text-align: center;
    backdrop-filter: blur(1.5px);
  }
  .cave-popup-ce4:target {
    display: flex;
  }
  .cave-content-ce4 {
    position: relative;
    background: linear-gradient(145deg, #ffffff, #e0f2fe);
    padding: 25px 35px;
    border-radius: 15px;
    max-width: 650px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 8px 30px rgba(0, 100, 80, 0.25);
    border: 5px solid #a7f3d0;
    color: #065f46;
  }
  .cave-content-ce4 h5 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.6em;
    color: #047857;
    border-bottom: 2px solid #6ee7b7;
    padding-bottom: 12px;
    font-family: 'Georgia', serif;
    text-shadow: 1px 1px 1px #ccfbf1;
  }
  .cave-content-ce4 p {
    margin-bottom: 18px;
    line-height: 1.7;
    font-size: 1.05em;
  }
  .cave-close-ce4 {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #6ee7b7;
    text-decoration: none;
    line-height: 1;
    cursor: pointer;
    transition: color 0.2s;
  }
  .cave-close-ce4:hover {
    color: #34d399;
  }

  /* Botões */
  .cave-start-btn-ce4,
  .cave-action-btn-ce4,
  .cave-final-btn-ce4,
  .element-option-ce4,
  .benefit-option-ce4 {
    display: inline-block;
    padding: 12px 25px;
    color: white;
    text-decoration: none;
    border-radius: 30px;
    margin: 10px 8px;
    font-size: 1em;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    min-width: 160px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
  }
  .cave-start-btn-ce4:hover,
  .cave-action-btn-ce4:hover,
  .cave-final-btn-ce4:hover,
  .element-option-ce4:hover,
  .benefit-option-ce4:hover {
    box-shadow: 0 6px 12px rgba(0,0,0,0.25);
    transform: translateY(-2px);
  }
  .cave-start-btn-ce4:active,
  .cave-action-btn-ce4:active,
  .cave-final-btn-ce4:active,
  .element-option-ce4:active,
  .benefit-option-ce4:active {
    transform: translateY(0px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
  .cave-start-btn-ce4 {
    background: linear-gradient(45deg, #34d399, #10b981);
  }
  .cave-start-btn-ce4:hover {
    background: linear-gradient(45deg, #10b981, #059669);
  }
  .cave-action-btn-ce4 {
    background: linear-gradient(45deg, #a7f3d0, #6ee7b7);
    color: #065f46;
  }
  .cave-action-btn-ce4:hover {
    background: linear-gradient(45deg, #6ee7b7, #34d399);
  }
  .cave-final-btn-ce4 {
    background: linear-gradient(45deg, #5eead4, #2dd4bf);
    color: #0f766e;
  }
  .cave-final-btn-ce4:hover {
    background: linear-gradient(45deg, #2dd4bf, #14b8a6);
  }

  /* Estilos específicos */
  .btn-warning-ce4 {
    background: linear-gradient(45deg, #fbbf24, #f59e0b);
    color: #422006;
  }
  .btn-warning-ce4:hover {
    background: linear-gradient(45deg, #f59e0b, #d97706);
  }
  .btn-danger-ce4 {
    background: linear-gradient(45deg, #fca5a5, #f87171);
  }
  .btn-danger-ce4:hover {
    background: linear-gradient(45deg, #f87171, #ef4444);
  }
  .btn-success-ce4 {
    background: linear-gradient(45deg, #86efac, #4ade80);
    color: #14532d;
  }
  .btn-success-ce4:hover {
    background: linear-gradient(45deg, #4ade80, #22c55e);
  }
  .cave-image-ce4 {
    display: block;
    max-width: 75%;
    height: auto;
    margin: 20px auto;
    border-radius: 15px;
    border: 5px solid #a7f3d0;
    box-shadow: 0 6px 12px rgba(0,0,0,0.2);
  }

  /* Opções de Elemento/Benefício */
  .element-option-ce4,
  .benefit-option-ce4 {
    width: 90%;
    margin: 12px auto;
    display: block;
    border: 3px solid transparent;
    text-align: center;
    padding: 14px 20px;
  }
  .element-option-ce4.earth {
    background: linear-gradient(135deg, #ca8a04, #a16207);
    border-color: #78350f;
  }
  .element-option-ce4.water {
    background: linear-gradient(135deg, #60a5fa, #2563eb);
    border-color: #1e3a8a;
  }
  .element-option-ce4.light {
    background: linear-gradient(135deg, #fde047, #facc15);
    border-color: #ca8a04;
    color: #713f12;
    text-shadow: none;
  }
  .element-option-ce4:hover {
    filter: brightness(1.15);
    border-style: dashed;
  }

  .benefit-option-ce4 {
    background: linear-gradient(to bottom right, #ecfdf5, #d1fae5);
    color: #065f46;
    border: 2px solid #6ee7b7;
  }
  .benefit-option-ce4:hover {
    border-color: #34d399;
    background: linear-gradient(to bottom right, #d1fae5, #a7f3d0);
  }
</style>

<!-- Conteúdo Visível Inicialmente (Tela 1)-->
<p style="text-align:center;">
  Você segue uma trilha quase invisível e chega a um vale escondido.
  Um portal de pedra coberto de musgo luminoso marca a entrada para o que
  parece ser um santuário antigo.
</p>
<p style="text-align:center;">🏛️🌿✨</p>
<p style="text-align:center;">
  <a href="#caveCE4-entry" class="cave-start-btn-ce4">Atravessar o Portal</a>
</p>

<!-- Popups Escondidos -->

  <!-- Tela 1: Entrada do Santuário -->
  <div id="caveCE4-entry" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>O Limiar do Santuário</h5>
      <img
        src="/cav/portal152.jpg"
        alt="Portal de pedra"
        class="cave-image-ce4"
      />
      <p>
        Ao passar pelo portal, o ar muda, tornando-se carregado de energia
        elemental. Você está em um pátio circular. Há duas passagens principais
        visíveis:
      </p>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 10px;">
          <strong>Opção 1:</strong> Uma escadaria que desce para uma área com sons
          de água corrente e vegetação luxuriante.
        </li>
        <li style="margin-bottom: 10px;">
          <strong>Opção 2:</strong> Um túnel que sobe em direção a uma luz
          bruxuleante e cheiro de ozônio.
        </li>
      </ul>
      <a href="#caveCE4-path1-start" class="cave-action-btn-ce4">Descer pela Escadaria (Opção 1)</a>
      <a href="#caveCE4-path2-start" class="cave-action-btn-ce4">Subir pelo Túnel (Opção 2)</a>
    </div>
  </div>

  <!-- CAMINHO DA OPÇÃO 1 (Caminho Hídrico) -->

  <!-- Tela 1.1: O Riacho Subterrâneo -->
  <div id="caveCE4-path1-start" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>O Riacho Serpenteante</h5>
      <img
        src="/cav/riacho2.jpg"
        alt="Riacho subterrâneo"
        class="cave-image-ce4"
      />
      <p>
        A escadaria leva a uma caverna ampla cortada por um riacho cristalino.
        Plantas bioluminescentes crescem nas margens. O riacho parece continuar
        por um túnel estreito à frente (<strong>Seguir Fluxo</strong>) ou você
        pode tentar escalar uma parede úmida coberta de vinhas para uma plataforma
        elevada (<strong>Escalar Vinhas</strong>).
      </p>
      <a href="#caveCE4-path1-1-follow" class="cave-action-btn-ce4">Seguir Fluxo do Riacho</a>
      <a href="#caveCE4-path1-1-climb" class="cave-action-btn-ce4 btn-warning-ce4">Escalar Vinhas</a>
    </div>
  </div>

  <!-- Tela 1.1.1: Seguir o Fluxo (Guardião Aquático) -->
  <div id="caveCE4-path1-1-follow" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Gruta do Guardião Aquático</h5>
      <img
        src="/cav/creature152.jpg"
        alt="Criatura aquática"
        class="cave-image-ce4"
      />
      <p>
        O túnel leva a uma gruta com uma lagoa. Um Elemental da Água emerge,
        parecendo curioso. Ele aponta para um lado da gruta onde a água parece
        mais turva e estagnada, e para outro onde a água flui límpida para uma
        fenda.
      </p>
      <a href="#caveCE4-path1-1-1-stagnant" class="cave-action-btn-ce4 btn-warning-ce4">Investigar Água Estagnada</a>
      <a href="#caveCE4-path1-1-2-clearFlow" class="cave-action-btn-ce4">Seguir Fluxo Límpido</a>
    </div>
  </div>

  <!-- Tela 1.1.1.1: Água Estagnada (Penalidade) -->
  <div id="caveCE4-path1-1-1-stagnant" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Lodo Prendedor</h5>
      <img
        src="/cav/lodo152.jpg"
        alt="Lodo"
        class="cave-image-ce4"
      />
      <p>Ao se aproximar da água parada, um lodo pegajoso te prende!</p>
      <p><strong>Efeito: Fique preso 1 rodada E perca 5 de progresso.</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-danger-ce4">Libertar-se do Lodo</a>
    </div>
  </div>

  <!-- Tela 1.1.1.2: Fluxo Límpido (Continua o Caminho 1) -->
  <div id="caveCE4-path1-1-2-clearFlow" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Passagem da Nascente</h5>
      <p>
        Você segue a água límpida por uma fenda estreita. O som da água fica mais
        forte, levando a uma câmara com uma cachoeira.
      </p>
      <a href="#caveCE4-path1-nextStep" class="cave-action-btn-ce4">Continuar para a Cachoeira</a>
    </div>
  </div>

  <!-- Tela 1.1.2: Escalar Vinhas -->
  <div id="caveCE4-path1-1-climb" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Plataforma Elevada</h5>
      <img
        src="/cav/plataforma152.jpg"
        alt="Plataforma na caverna"
        class="cave-image-ce4"
      />
      <p>
        Você escala e chega a uma plataforma seca. Vê um mecanismo antigo com
        alavancas (<strong>Ativar Mecanismo</strong>) e uma abertura estreita
        (<strong>Fresta de Luz</strong>).
      </p>
      <a href="#caveCE4-path1-1-2-1-mechanism" class="cave-action-btn-ce4 btn-warning-ce4">Ativar Mecanismo</a>
      <a href="#caveCE4-path1-1-2-2-lightGap" class="cave-action-btn-ce4">Investigar Fresta de Luz</a>
    </div>
  </div>

  <!-- Tela 1.1.2.1: Ativar Mecanismo (Penalidade) -->
  <div id="caveCE4-path1-1-2-1-mechanism" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Engrenagens Emperradas</h5>
      <img
        src="/cav/engrenagem.jpg"
        alt="Engrenagens antigas"
        class="cave-image-ce4"
      />
      <p>
        Você força uma alavanca enferrujada. Ela quebra! Poeira e detritos caem,
        bloqueando parcialmente o caminho de volta.
      </p>
      <p><strong>Efeito: Remova 3 respostas CORRETAS (conhecimento perdido).</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-danger-ce4">Desistir do Mecanismo</a>
    </div>
  </div>

  <!-- Tela 1.1.2.2: Fresta de Luz -->
  <div id="caveCE4-path1-1-2-2-lightGap" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Vislumbre Distante</h5>
      <p>
        A fresta oferece uma vista de uma câmara brilhante mais abaixo, mas a
        descida daqui parece perigosa e instável.
      </p>
      <a href="#caveCE4-descendRisk" class="cave-action-btn-ce4 btn-danger-ce4">Tentar Descida Arriscada</a>
      <a href="#caveCE4-path1-start" class="cave-action-btn-ce4">Voltar ao Riacho</a>
      <!-- Volta para 1.1 -->
    </div>
  </div>

  <!-- Tela 1.1.2.2.1: Descida Arriscada -->
  <div id="caveCE4-descendRisk" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Queda e Sorte</h5>
      <p>
        Você escorrega nas pedras soltas! Cai rolando, mas aterrissa sobre um monte
        de musgo espesso na câmara brilhante abaixo – a Clareira dos Cristais!
      </p>
      <p><strong>Sorte: Você chegou ao final, mas perdeu 1 Pulo na queda.</strong></p>
      <a href="#caveCE4-finalCrystalChoice" class="cave-action-btn-ce4 btn-success-ce4">Entrar na Clareira (Machucado)</a>
    </div>
  </div>

  <!-- Tela 1.3 (Continuação dos caminhos 1.1.1.2): Câmara da Cachoeira -->
  <div id="caveCE4-path1-nextStep" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Câmara da Cachoeira Interna</h5>
      <img
        src="/cav/camaraa.jpg"
        alt="Cachoeira subterrânea"
        class="cave-image-ce4"
      />
      <p>
        A fenda se abre nesta câmara úmida. A água despenca ruidosamente. Atrás
        da cachoeira parece haver uma passagem (<strong>Investigar Cortina d'Água</strong>).
        Ao lado, uma trilha de pedras escorregadias sobe (<strong>Subir Trilha Úmida</strong>).
      </p>
      <a href="#caveCE4-path1-3-1-behindWaterfall" class="cave-action-btn-ce4">Investigar Cortina d'Água</a>
      <a href="#caveCE4-path1-3-2-climbWet" class="cave-action-btn-ce4 btn-warning-ce4">Subir Trilha Úmida</a>
    </div>
  </div>

  <!-- Tela 1.3.1: Atrás da Cachoeira (Tesouro) -->
  <div id="caveCE4-path1-3-1-behindWaterfall" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Alcova Secreta</h5>
      <p>
        Atrás da água, uma pequena alcova seca guarda um diário antigo e uma bússola
        que sempre aponta para o norte magnético.
      </p>
      <img
        src="/cav/diario.jpg"
        alt="Bússola e diário"
        class="cave-image-ce4"
      />
      <p><strong>Efeito: Ganhe 1 contador "Diário+Bússola" E Ganhe 1 Pulo.</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-success-ce4">Sair com os Achados</a>
      <!-- FINAL BOM -->
    </div>
  </div>

  <!-- Tela 1.3.2: Subir Trilha Úmida -->
  <div id="caveCE4-path1-3-2-climbWet" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Escorregão Inevitável</h5>
      <p>
        A trilha é traiçoeira. Você perde o equilíbrio e escorrega de volta para
        a base da cachoeira.
      </p>
      <p><strong>Efeito: Perca 1 Rodada.</strong></p>
      <!-- Volta para a câmara da cachoeira -->
      <a href="#caveCE4-path1-nextStep" class="cave-final-btn-ce4 btn-warning-ce4">Tentar Novamente?</a>
    </div>
  </div>

  <!-- CAMINHO DA OPÇÃO 2 (Caminho Elétrico) -->

  <!-- Tela 2.1: Túnel Ascendente -->
  <div id="caveCE4-path2-start" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Túnel Crepitante</h5>
      <img
        src="/cav/ports.jpg"
        alt="Túnel com eletricidade estática"
        class="cave-image-ce4"
      />
      <p>
        O túnel sobe. O ar vibra com energia. Faíscas dançam. Você vê um console
        de pedra (<strong>Examinar Console</strong>) e adiante, uma ponte estreita
        sobre um abismo faiscante (<strong>Cruzar Ponte</strong>).
      </p>
      <a href="#caveCE4-path2-1-console" class="cave-action-btn-ce4">Examinar Console</a>
      <a href="#caveCE4-path2-2-bridge" class="cave-action-btn-ce4 btn-warning-ce4">Cruzar Ponte Instável</a>
    </div>
  </div>

  <!-- Tela 2.1: Examinar Console -->
  <div id="caveCE4-path2-1-console" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Painel de Controle Ancestral</h5>
      <img
        src="/cav/painel.jpg"
        alt="Console antigo"
        class="cave-image-ce4"
      />
      <p>
        O console tem encaixes e alavancas. Parece controlar o fluxo de energia.
        Você pode <strong>Tentar Realinhar</strong> ou <strong>Puxar Alavanca Aleatória</strong>.
      </p>
      <a href="#caveCE4-path2-1-1-realign" class="cave-action-btn-ce4">Realinhar Cristais</a>
      <a href="#caveCE4-path2-1-2-pullLever" class="cave-action-btn-ce4 btn-warning-ce4">Puxar Alavanca Aleatória</a>
    </div>
  </div>

  <!-- Tela 2.1.1: Realinhar Cristais (Caminho para a Clareira Final - MELHOR CAMINHO) -->
  <div id="caveCE4-path2-1-1-realign" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Fluxo Estabilizado</h5>
      <p>
        Com cuidado, você ajusta os cristais. A energia do túnel se acalma,
        revelando um caminho seguro para a clareira final.
      </p>
      <p><strong>Recompensa Intermediária: Ganhe 10 de Progresso.</strong></p>
      <a href="#caveCE4-finalCrystalChoice" class="cave-action-btn-ce4 btn-success-ce4">Entrar na Clareira dos Cristais</a>
      <!-- CONVERGE PARA O FINAL -->
    </div>
  </div>

  <!-- Tela 2.1.2: Puxar Alavanca Aleatória -->
  <div id="caveCE4-path2-1-2-pullLever" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Sobrecarga!</h5>
      <p>Você puxa uma alavanca e o console solta uma descarga elétrica!</p>
      <p><strong>Efeito: Perca 2 Estrelas Fixas!</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-danger-ce4">Recuar Chamuscado</a>
      <!-- FINAL RUIM -->
    </div>
  </div>

  <!-- Tela 2.2: Cruzar a Ponte Instável -->
  <div id="caveCE4-path2-2-bridge" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Ponte Eletro-Estática</h5>
      <img
        src="/cav/ponte.jpg"
        alt="Ponte sobre abismo"
        class="cave-image-ce4"
      />
      <p>
        A ponte estreita crepita com energia. Arriscado! <strong>Correr</strong> ou
        <strong>Testar com um galho</strong>?
      </p>
      <a href="#caveCE4-path2-2-1-runBridge" class="cave-action-btn-ce4 btn-danger-ce4">Correr pela Ponte</a>
      <a href="#caveCE4-path2-2-2-testBridge" class="cave-action-btn-ce4">Testar com Galho</a>
    </div>
  </div>

  <!-- Tela 2.2.1: Correr pela Ponte -->
  <div id="caveCE4-path2-2-1-runBridge" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Ponte Colapsa!</h5>
      <p>
        A ponte estala e desaba! Você cai no abismo faiscante, mas aterrissa em
        vinhas energizadas.
      </p>
      <p><strong>Efeito: Vá para a Cadeia!</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-danger-ce4">Cair na Armadilha</a>
      <!-- FINAL RUIM -->
    </div>
  </div>

  <!-- Tela 2.2.2: Testar com Galho -->
  <div id="caveCE4-path2-2-2-testBridge" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Travessia Prudente</h5>
      <p>
        O galho atrai uma forte descarga! Esperando o momento certo, você
        atravessa em segurança.
      </p>
      <p><strong>Recompensa Intermediária: Remova 3 respostas ERRADAS.</strong></p>
      <!-- Após testar, ele pode ter a opção de ir para a clareira final, recompensa pela cautela -->
      <a href="#caveCE4-finalCrystalChoice" class="cave-action-btn-ce4 btn-success-ce4">Continuar para a Clareira</a>
    </div>
  </div>

  <!-- SEÇÃO FINAL: CLAREIRA DOS CRISTAIS (Único caminho que chega aqui é o "correto" ou mais elaborado) -->
  <div id="caveCE4-finalCrystalChoice" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Qual Elemento Despertar?</h5>
      <img
        src="/cav/cristais.jpg"
        alt="Clareira mágica"
        class="cave-image-ce4"
      />
      <p>
        Você chegou à clareira final! O solo está ressecado, mas pronto. Canalize
        a energia de UM cristal para definir a bênção final do santuário.
      </p>
      <a href="#caveCE4-earthChosen" class="element-option-ce4 earth">Canalizar Cristal da Terra ⛰️</a>
      <a href="#caveCE4-waterChosen" class="element-option-ce4 water">Canalizar Cristal da Água 💧</a>
      <a href="#caveCE4-lightChosen" class="element-option-ce4 light">Canalizar Cristal da Luz ☀️</a>
    </div>
  </div>

  <!-- Resultado 1: Escolheu Terra -->
  <div id="caveCE4-earthChosen" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Poder da Terra</h5>
      <img
        src="/cav/cristalterra.jpg"
        alt="Solo fértil"
        class="cave-image-ce4"
      />
      <p>O cristal da Terra pulsa. O solo torna-se fértil. Uma bolsa de couro aparece.</p>
      <p><strong>Escolha sua Bênção Final:</strong></p>
      <a href="#caveCE4-finalEarthStars" class="benefit-option-ce4">Bolsa de Sementes Estelares (+2 Estrelas)</a>
      <a href="#caveCE4-finalEarthSkip" class="benefit-option-ce4">Mapa das Linhas Ley (Ir p/ casa Avião)</a>
    </div>
  </div>

  <!-- Resultado 2: Escolheu Água -->
  <div id="caveCE4-waterChosen" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Dádiva da Água</h5>
      <img
        src="/cav/cristalagua.jpg"
        alt="Gotas de água"
        class="cave-image-ce4"
      />
      <p>O cristal da Água brilha. Uma névoa umedece o solo. Um pergaminho flutua numa poça.</p>
      <p><strong>Escolha sua Bênção Final:</strong></p>
      <a href="#caveCE4-finalWaterCard" class="benefit-option-ce4">Pergaminho da Nascente (Ganhe 1 Carta)</a>
      <a href="#caveCE4-finalWaterCleanse" class="benefit-option-ce4">Névoa Purificadora (Remova 3 Erradas)</a>
    </div>
  </div>

  <!-- Resultado 3: Escolheu Luz -->
  <div id="caveCE4-lightChosen" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Foco da Luz</h5>
      <img
        src="/cav/cristalsol.jpg"
        alt="Luz do sol na floresta"
        class="cave-image-ce4"
      />
      <p>O cristal da Luz irradia calor. Brotos surgem. Um inseto de luz sussurra um segredo.</p>
      <p><strong>Escolha sua Bênção Final:</strong></p>
      <a href="#caveCE4-finalLightCurse" class="benefit-option-ce4">Sussurro Maligno (Penalizar Jogador)</a>
      <a href="#caveCE4-finalLightStars" class="benefit-option-ce4">Guia Luminoso (+2 Estrelas)</a>
    </div>
  </div>

  <!-- Popups Finais de Confirmação das Bênçãos -->
  <div id="caveCE4-finalEarthStars" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Bênção da Terra: Sementes Estelares!</h5>
      <p>As sementes brilham com potencial cósmico.</p>
      <p><strong>Efeito: +2 Estrelas Fixas</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-success-ce4">Sair com as Sementes</a>
    </div>
  </div>
  <div id="caveCE4-finalEarthSkip" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Bênção da Terra: Mapa das Linhas Ley!</h5>
      <p>O mapa revela conexões ocultas da terra.</p>
      <p><strong>Efeito: Role o dado e vá para casa Avião</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-warning-ce4">Seguir as Linhas Ley</a>
    </div>
  </div>
  <div id="caveCE4-finalWaterCard" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Bênção da Água: Pergaminho da Nascente!</h5>
      <p>Nova sabedoria flui para você.</p>
      <p><strong>Efeito: Ganhe uma carta de jogador</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-success-ce4">Sair Hidratado</a>
    </div>
  </div>
  <div id="caveCE4-finalWaterCleanse" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Bênção da Água: Névoa Purificadora!</h5>
      <p>Erros passados são lavados.</p>
      <p><strong>Efeito: Remova 3 respostas ERRADAS</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-success-ce4">Sair Purificado</a>
    </div>
  </div>
  <div id="caveCE4-finalLightCurse" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Bênção da Luz: Sussurro Maligno!</h5>
      <p>O inseto te dá o poder de atrapalhar um rival.</p>
      <p><strong>Efeito: Escolha um jogador para ficar 2 rodadas sem jogar</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-warning-ce4">Usar o Sussurro</a>
    </div>
  </div>
  <div id="caveCE4-finalLightStars" class="cave-popup-ce4">
    <div class="cave-content-ce4">
      <a href="#" class="cave-close-ce4">×</a>
      <h5>Bênção da Luz: Guia Luminoso!</h5>
      <p>A luz te guiará em sua jornada.</p>
      <p><strong>Efeito: +2 Estrelas Fixas</strong></p>
      <a href="#" class="cave-final-btn-ce4 btn-success-ce4">Sair Iluminado</a>
    </div>
  </div>

<!-- Texto Final Geral -->
<p style="text-align:center; font-size:0.8em; margin-top: 15px;">
  Sua jornada pelo santuário termina aqui. Confirme sua escolha final e aplique o efeito.
</p>
<!-- FIM DA CARTA INTERATIVA - TRILHA DO SANTUÁRIO CRISTALINO (v3) -->`,
    "dificuldade": "facil",
    "categorias": [
      "Caverna"
    ],
    "fontes": [],
    "vantagem": "Aceita as consequências",
    "desvantagem": "",
    "dica": "",
    "baralho": "Cavernas_prontas",
    "respostaCorreta": 1,
    "opcoes": [
      {
        "id": 1,
        "texto": "Consegui terminar a caverna"
      }
    ]
  }
];

export default meu_baralho;