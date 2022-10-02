import { randomUUID } from "node:crypto"

const ZONAS = <const>["Setor Norte", "sadas"]
const NATURALIDADES = <const>["TO", "GO"]
const FAIXAS_ETARIAS = <const>["18 a 40", "50+"]
const SEXOS = <const>["MASCULINO", "FEMININO"]
const ESCOLARIDADES = <const>["Ensino Fundamental", "Ensino Superior"]
const PALAVRAS = <const>["ads"]
const QUESTIONAMENTOS = <const>[
  'CÓRREGO Como se chama aqui um rio pequeno, de uns dois metros de largura?',
  'PINGUELA ... tronco, pedaço de pau ou tábua que serve para passar por cima de um ______ (cf. item1)?',
  'FOZ ... o lugar onde o rio termina ou encontra com outro rio?',
  'REDEMOINHO (DE ÁGUA) Muitas vezes, num rio, a água começa a girar, formando um buraco na água que puxa para baixo. Como se chama isto?',
  'ONDA DE MAR ... o movimento de água do mar? (Imitar o balanço das águas)',
  'ONDA DE RIO ... o movimento da água do rio? (Idem item 5)',
  'REDEMOINHO (DO VENTO) ... o vento que vai virando em roda e levanta poeira, folhas e outras coisas leves?',
  'RELÂMPAGO ... um clarão que risca o céu em dias de chuva?',
  'RAIO 377 ... uma luz forte e rápida que sai das nuvens, podendo queimar uma árvore, matar as pessoas ou animais em dias de mau tempo?',
  'TROVÃO ... o barulho forte que se escuta logo depois de um _____ (cf. item 9)?',
  'TEMPORAL/ TEMPESTADE/ VENDAVAL ... uma chuva com vento forte que vem de repente, geralmente no verão?',
  'NOMES ESPECÍFICOS PARA TEMPORAL Existem outros nomes para ______ (cf. item 11)?',
  'TROMBA D’ÁGUA ... uma chuva de pouca duração, muito forte e pesada?',
  'CHUVA FORTE E uma chuva forte e contínua?',
  'CHUVA DE PEDRA Durante uma chuva podem cair bolinhas de gelo. Como chamam essa chuva?',
  'ESTIAR / COMPOR O TEMPO Como dizem aqui quando termina a chuva e o sol começa a aparecer?',
  'ARCO-ÍRIS Quase sempre, depois de uma chuva, aparece no céu uma faixa com listras coloridas e curvas (mímica). Que nomes dão a essa faixa?',
  'GAROA ...uma chuva bem fininha?',
  'TERRA UMEDECIDA PELA CHUVA 378 Depois de uma chuva bem fininha, quando a terra não fica nem seca, nem molhada, como é que se diz que a terra fica?',
  'ORVALHO/ SERENO De manhã cedo, o grama geralmente está molhado. Como chamam aquilo que molha a grama?',
  'NEVOEIRO Muitas vezes, principalmente de manhã cedo, quase não se pode enxergar por causa de uma coisa parecida com fumaça, que cobre tudo. Como chamam isso?',
  'AMANHECER ...a parte do dia quando começa a clarear?',
  'NASCER (DO SOL) O que é que acontece de manhã cedo?',
  'ALVORADA ... a claridade do céu antes de (cf. item 23)?',
  'PÔR (DO SOL) E o que acontece no céu no final da tarde?',
  'CREPÚSCULO ... a claridade que fica no céu depois do (cf. item 25)?',
  'ENTARDECER E quando o sol se põe?',
  'ANOITECER ... o começo da noite?',
  'ESTRELA MATUTINA/ VÊNUS/ ESTRELA DA MANHÃ/ESTRELA D`ALVA De manhã cedo, uma estrela brilha mais e é a última a desaparecer. Como chamam esta estrela?',
  'ESTRELA VESPERTINA/ VÊNUS/ ESTRELA DA TARDE De tardezinha, uma estrela aparece antes das outras, perto do horizonte, e brilha mais. Como chamam esta estrela?',
  'ESTRELA CADENTE/ ESTRELA FILANTE/METEORO/ ZELAÇÃO De noite, muitas vezes pode-se observar uma estrela que se desloca no céu e faz um risco de luz. Como chamam isso?',
  'MUDAR/ CORRER UMA ESTRELA E quando se vê uma ...( cf. item 31), como é que se diz? (OBSERVAR OS VERBOS PARA ESPRESSAR O MOVIMENTO)',
  'VIA LÁCTEA/ CAMINHO DE SANTIAGO Numa noite bem estrelada, aparece uma banda ou faixa que fica no céu de fora a fora, onde tem muitas estrelas muito perto umas das outras. Como chamam esta banda ou faixa?',
  'MESES DO ANO Quais são os meses do ano?',
  'MESES COM NOMES ESPECIAIS Alguns desses meses têm outro nome, por exemplo, junho, julho, etc.?',
  'ONTEM 380 ... Hoje é segunda-feira. E domingo, que dia foi?',
  'ANTEONTEM ... o dia que foi antes desse dia? [E um dia para trás?]',
  'TRASANTEONTEM ... o dia que foi antes de _____ (cf. item 37)? [E mais um dia para trás?]',
  'TANGERINA/MEXERICA ... as frutas menores que a laranja, que se descascam com a mão, e, normalmente, deixam um cheiro na mão? Como elas são?',
  'AMENDOIM ... o grão coberto por uma casquinha dura, que se come assado, cozido, torrado ou moído?',
  'CAMOMILA ... umas florezinhas brancas com miolo amarelinho, ou florezinhas secas que se compram na farmácia e servem para fazer um chá amarelinho, cheirosos, bom para dor de barriga de nenê/bebê e até adulto e também para acalmar? (Mostrar)',
  'PENCA ... cada parte que se corta do cacho da bananeira para pôr para madurar?',
  'BANANA DUPLA/ FELIPE/ GÊMEAS ... duas bananas que nascem grudadas?',
  'PARTE TERMINAL DA INFLORESCÊNCIA DA BANANEIRA/ UMBIGO/CORAÇÃO ... a ponta roxa no cacho da banana?',
  'ESPIGA 381 Quando se vai colher o milho, o que é que tira do pé?',
  'SABUGO Quando se tira da ...(cf. item 43) todos os grãos do milho, o que sobra?',
  'SOCA/TOUCEIRA Depois que se corta o pé de arroz ou de fumo, ainda fica uma pequena parte no chão. Como se chama essa parte?',
  'GIRASSOL ... flor grande, amarela, redonda, com uma rodela de sementes no meio?',
  'VAGEM DO FEIJÃO/ BAINHA Onde é que ficam os grãos do feijão, no pé, antes de ser colhido?',
  'MANDIOCA/AIPIM ... aquela raiz branca por dentro, coberta por uma casca marrom, que se cozinha para comer?',
  'MANDIOCA Tem um tipo de ...(cf. item 50) que não serve para comer e se rala para fazer farinha (polvilho, goma). Como se chama essa raiz?',
  'CARRINHO DE MÃO/ CARRIOLA ... um veículo de uma roda, empurrado por uma pessoa, para pequenas cargas em trechos curtos?',
  'HASTES DO CARRINHO DE MÃO ... as duas partes em que a pessoa segura para empurrar o ... (cf. item 52)?',
  'CANGALHA/ FORQUILHA ... a armação de madeira, em forma de forquilha (mímica), que se coloca no pescoço de animais (porco, terneiro/bezerro, carneiro, vaca) para não atravessaram a cerca? 382',
  'CANGALHA ... armação de madeira que se coloca no lombo do cavalo ou do burro para levar cestos ou cargas?',
  'CANGA ... a peça de madeira que vai no pescoço do boi, para puxar o carro ou o arado?',
  'JACÁ / BALAIO ... aqueles objetos de vime, de taquara, de cipós trançados, para levar batatas (mandioca, macaxeira, aipim etc.), no lombo do cavalo ou do burro?',
  'BOLSA/ BRUACA E, se forem de couro, com tampa?',
  'BORREGO (DO NASCER ATÉ...) ... a cria da ovelha logo que nasce?',
  'PERDA DA CRIA Como se diz quando a fêmea de um animal perde a cria?',
  'TRABALHADOR DE ENXADA EM ROÇA ALHEIA ... homem que é contratado para trabalhar na roça de outro, que recebe por dia de trabalho?',
  'PICADA/ ATALHO ESTREITO O que é que se abre com o machado, o facão, a foice para passar por um mato fechado?',
  'TRILHO/ CAMINHO/ VEREDA. TRILHA ... o caminho, no pasto, onde não cresce mais grama, de tanto o animal ou o homem passarem por ali?',
  'URUBU ... a ave preta que come animal morto, podre?',
  'COLIBRI/ BEIJA-FLOR ... o passarinho bem pequeno, que bate muito rápido as asas, tem o bico comprido e fica parado no ar?',
  'JOÃO-DE-BARRO ... a ave que faz o ninho com terra, nos postes, nas árvores e até nos cantos da casa?',
  'GALINHA-D’ÁNGOLA/ GUINÉ/ COCAR ... ave de criação parecida com a galinha, de penas pretas com pintinhas brancas?',
  'PAPAGAIO ... a ave do mato, de bico curvo e penas coloridas; quando presa, pode aprender a falar?',
  'SURA ... uma galinha sem rabo?',
  'COTÓ ... um cachorro de rabo cortado?',
  'GAMBÁ ... o bicho que carrega os filhotes numa bolsa que tem na barriga e solta um cheiro muito ruim?',
  'PATAS DIANTEIRAS DO CAVALO ... as patas dianteiras do cavalo?',
  'CRINA DO PESCOÇO ... o cabelo em cima do pescoço do cavalo?',
  'CRINA DA CAUDA ... o cabelo comprido na traseira do cavalo? 384',
  'LOMBO ... a parte do cavalo onde vai a sela?',
  'ANCA/ GUARUPA/ CADEIRA ... aparte larga atrás do... (cf. item 75)?',
  'CHIFRE O que o boi tem na cabeça?',
  'BOI SEM CHIFRE ... ... o boi sem ______ (cf. item 77)?',
  'CABRA SEM CHIFRE ... a cabra que não tem _____(cf. item 77)?',
  'ÚBERE ... a parte da vaca onde fica o leite',
  'RABO ... a parte com que o boi espanta as moscas?',
  'MANCO ... o animal que tem uma perna mais curta e que puxa de uma perna?',
  'MOSCA VAREJEIRA ... um tipo de mosca grande, esverdeada, que faz um barulhão quando voa?',
  'SANGUESSUGA ... um bichinho que se gruda nas pernas das pessoas quando elas entram num banhado ou córrego (cf. item 1)?',
  'LIBÉLULA 385 ... o inseto de corpo comprido e fino, com quatro asas bem transparentes, que voa e a parte traseira na água?',
  'BICHO DE FRUTA ... aquele bichinho branco, enroladinho, que dá em goiaba, em coco?',
  'CORÓ ... aquele bicho que dá em esterco, em pau podre?',
  'PERNILONGO ... aquele inseto pequeno, de perninhas compridas, que canta no ouvido das pessoas, de noite? (Imitar o zumbido)',
  'PÁLPEBRAS/ CAPELA DOS OLHOS ... esta parte que cobre o olho? (Apontar)',
  'CISCO ... alguma coisinha que cai no olho e fica incomodando?',
  'CEGO DE UM OLHO ... a pessoa que só enxerga com um olho?',
  'VESGO ... a pessoa que tem os olhos olhando em direções diferentes? (Completar com um gesto dos dedos)',
  'MÍOPE ... a pessoa que não enxerga longe, e tem que usar óculos?',
  'TERÇOL/ VIÚVA ... a bolinha que nasce na _____ (cf. item 89), fica vermelha e incha? ',
  'CONJUNTIVITE/ DOR D`OLHOS ... a inflamação no olho que faz com que o olho fique vermelho e amanheça grudado?',
  'CATARATA ... aquela pele branca no olho que dá em pessoas mais idosas?',
  'DENTES CANINOS/ PRESAS ... esses dois dentes pontudos? (Apontar)',
  'DENTES DO SISO/ DO JUÍZO ... os últimos dentes, que nascem quando a pessoa já é adulta?',
  'DENTES MOLARES/ DENTE QUEIRO ... esses dentes grandes no fundo da boca, vizinhos dos _____ (cf. item 98)? (Apontar)',
  'DESDENTADO/ BANGUELA ... a pessoa que não tem dentes?',
  'FANHOSO/ FANHO ... a pessoa que parece falar pelo nariz? (Imitar)',
  'MELECA/ TATU ... a sujeirinha dura que se tira do nariz com o dedo?',
  'SOLUÇO ... este barulhinho que se faz? (Soluçar)',
  'NUCA ... isto? (Apontar)',
  'POMO-DE-ADÃO/ GOGÓ ... esta parte alta do pescoço do homem?',
  'CLAVÍCULA ... o osso que vai do pescoço até o ombro? (Apontar)',
  'CORCUNDA ... a pessoa que tem um calombo grande nas costas e fica assim?',
  'AXILA ... esta parte aqui? (Apontar)',
  'CHEIRO NAS AXILAS ... o mau cheiro embaixo dos braços?',
  'CANHOTO ... a pessoa que come com a mão esquerda, faz tudo com essa mão? (Completar com o gesto)',
  'SEIOS/ PEITO ... a parte do corpo da mulher com que ela amamenta os filhos?',
  'VOMITAR Se uma pessoa come muito e sente que vai pôr/botar para fora o que comeu, se diz que vai o quê?',
  'ÚTERO ... parte do corpo da mãe onde fica o nenê/bebê antes de nascer?',
  'PERNETA ... a pessoa que não tem uma perna? 388',
  'MANCO ... pessoa que puxa de uma perna?',
  'PESSOA DE PERNAS ARQUEADAS ... a pessoa de pernas curvas para os lados?',
  'RÓTULA/ PATACA ... o osso redondo que fica na frente do joelho',
  'TORNOZELO ... isto? (Apontar)',
  'CALCANHAR ... isto? (Apontar)',
  'CÓCEGAS Que sente uma criança quando se passa o dedo na sola do pé? (Mímica)',
  'MENSTRUAÇÃO As mulheres perdem sangue todos os meses. Como se chama isso?',
  'ENTRAR NA MENOPAUSA Numa certa idade acaba a/o ____(cf. item 121). Quando isso acontece, se diz que a mulher ____.',
  'PARTEIRA ... a mulher que ajuda a criança a nascer?',
  'DAR À LUZ 389 Chama-se a_____(cf. Item 123) quando a mulher está para _____.',
  'GÊMEOS ... duas crianças que nasceram no mesmo parto?',
  'ABORTO Quando a mulher grávida perde o filho, se diz que ela teve_____.',
  'ABORTAR Quando a mulher fica grávida, mas não quer ter a criança, ela toma remédio para quê?',
  'AMA-DE-LEITE Quando a mãe não tem leite e outra mulher amamenta a criança, como chamam essa mulher?',
  'IRMÃO DE LEITE O próprio filho da ____ (cf. item 128) e a criança que ela amamenta são o quê um do outro?',
  'FILHO ADOTIVO ... a criança que não é filho verdadeiro do casal, mas que é criado por ele como se fosse?',
  'FILHOS MAIS MOÇO/ CAÇULA ... o filho que nasceu por último?',
  'MENINO/ GURI/ PIÁ ... a criança de 5 a 10 anos, do sexo masculino?',
  'MENINA E se for do sexo feminino, como se chama?',
  'MADRASTA 390 Quando um homem fica viúvo e casa de novo, o que a segunda mulher é dos filhos que ele já tinha?',
  'FINADO/ FALECIDO Numa conversa para falar de uma pessoa que já morreu, geralmente as pessoas não a tratam pelo nome que tinha em vida. Como é que se referem a ela?',
  'PESSOA TAGARELA ... a pessoa que fala demais?',
  'PESSOA POUCO INTELIGENTE ... a pessoa que tem dificuldade de aprender as coisas?',
  'PESSOA SOVINA ... a pessoa que não gosta de gastar seu dinheiro, às vezes, até passa dificuldades para não gastar?',
  'MAU PAGADOR ... a pessoa que deixa suas contas penduradas',
  'ASSASSINO PAGO ... a pessoa que é paga para matar alguém?',
  'MARIDO ENGANADO ... o marido que a mulher passa para trás com outro homem?',
  'PROSTITUTA ... a mulher que se vende para qualquer homem?',
  'XARÁ ... a pessoa que tem o mesmo nome da gente?',
  'BÊBADO (DESIGNAÇÕES) Que nome dão a uma pessoa que bebe demais?',
  'CIGARRO DE PALHA Que nome dão ao cigarro que as pessoas faziam antigamente, enrolado à mão?',
  'TOCO DE CIGARRO ...o resto do cigarro que se joga fora?',
  'DIABO Deus está no céu e no inferno está _____.',
  'FANTASMA O que algumas pessoas dizem já ter visto, à noite, em cemitérios ou em casas, que se diz que é do outro mundo?',
  'FEITIÇO O que certas pessoas fazem para prejudicar alguém e botam, por exemplo, nas encruzilhadas?',
  'AMULETO ... o objeto que algumas pessoas usam para dar sorte ou afastar males?',
  'BENZEDEIRA ... uma mulher que cura, tira o mau olhado através de rezas e simpatias?',
  'CURANDEIRO ... a pessoa que trata de doenças através de ervas e plantas?',
  'MEDALHA 392 ... a chapinha de metal com um desenho de santo que as pessoas usam, geralmente no pescoço, presa numa corrente?',
  'PRESÉPIO No Natal, monta-se um grupo de figuras representando a Virgem Maria, São José, o Menino Jesus etc. Como chamam isso?',
  'CAMBALHOTA ... a brincadeira em que se gira o corpo sobre a cabeça e acaba sentado? (Mímica)',
  'BOLINHA DE GUDE ... as coisinhas redondas de vidro com que os meninos gostam de brincar?',
  'ESTILINGUE/ SETRA/ BODOQUE ... o brinquedo feito de uma forquilha e duas tiras de borracha (mímica), que os meninos usam para matar passarinho?',
  'PAPAGAIO DE PAPEL/ PIPA ... o brinquedo feito de varetas cobertas de papel que se empina no vento por meio de uma linha?',
  'PIPA / ARRAIA E um brinquedo parecido com o (a) ____ (cf. item 158), também feito de papel, mas sem varetas, que se empina ao vento por meio de uma linha?',
  'ESCONDE-ESCONDE ... a brincadeira em que uma criança fecha os olhos, enquanto as outras se escondem em algum lugar, e depois vai procurá-las?',
  'CABRA-CEGA ... a brincadeira em que uma criança, com os olhos vendados, tenta pegar as outras?',
  'PEGA-PEGA ... uma brincadeira em que uma criança corre atrás das outras para tocar numa delas antes que alcance um ponto combinado?',
  'FERROLHO/ SALVA/PICULA/ PIQUE ... esse ponto combinado?',
  'CHICOTE-QUEIMADO/LENÇO ATRÁS ... uma brincadeira em que as crianças ficam em círculo, enquanto uma outra vai passando com um objeto que deixa cair atrás de uma delas e esta pega o objeto e sai correndo?',
  'GANGORRA ... uma tábua apoiada no meio, em cujas pontas sentam duas crianças e quando uma sobe, a outra desce? (Mímica)',
  'BALANÇO ... uma tábua, pendurada por meio de cordas, onde uma criança senta e se move para frente e para trás? (Mímica)',
  'AMARELINHA ... a brincadeira em que as crianças riscam uma figura no chão, formada por quadrados numerados, jogam uma pedrinha (mímica) e vão pulando com uma perna só? solicitar a descrição.',
  'TRAMELA ... aquela pecinha de madeira, que gira ao redor de um prego, para fechar porta, janela...?',
  'VENEZIANA Quando uma janela tem duas partes, como se chama a parte de fora que é formada de tirinhas horizontais que permitem a ventilação e a claridade? (Mostrar gravuras)',
  'VASO SANITÁRIO/PATENTE Quando se vai ao banheiro, onde é que a pessoa se senta para fazer as necessidades?',
  'FULIGEM ... aquilo, preto, que se forma na chaminé, na parede ou no teto da cozinha, acima do fogão a lenha?',
  'BORRALHO ... a cinza quente que fica dentro do fogão a lenha?',
  'ISQUERO/ BINGA Para acender um cigarro, eu uso fósforo ou____.',
  'LANTERNA ... aquele objeto que se usa para clarear no escuro e se leva na mão assim? (Apontar)',
  'INTERRUPTOR DE LUZ Como se chama o objeto que fica nas paredes e serve para acender a lâmpada?',
  'CAFÉ DA MANHÃ ... a primeira refeição do dia, feita pela manhã?',
  'GELÉIA ... a pasta feita de frutas para passar no pão, biscoito?',
  'CARNE MOÍDA ... a carne depois de passada na máquina?',
  'CURAU/ CANJICA ... uma papa cremosa feita com coco e milho verde ralado, polvilhado com canela?',
  'CURAU E essa mesma papa, com milho verde ralado, sem coco, como é que chama?',
  'MUNGUNZÁ/ CANJICA ... aquele alimento feito com grãos de milho branco, coco e canela?',
  'AGUARDENTE Que nomes dão aqui para a bebida alcoólica feita de cana-de-açúcar?',
  'EMPANTURRADO Quando uma pessoa acha que comeu demais, ela diz: Comi tanto que estou _____.',
  'GLUTÃO ... uma pessoa que normalmente come demais?',
  'BALA/ CONFEITO/ BOMBOM ...aquilo embrulhado em papel colorido que se chupa? Mostrar',
  'PÃO FRANCÊS ... isto? (Mostrar',
  'PÃO BENGALA ... isto? (Mostrar)',
  'SUTIÃ Que peça do vestuário serve para segurar os seios?',
  'CUECA Que roupa o homem usa debaixo da calça?',
  'CALCINHA Que roupa a mulher usa debaixo da saia?',
  'ROUGE ... aquilo que as mulheres passam no rosto, nas bochechas, para ficarem mais rosadas?',
  'GRAMPO (COM PRESSÃO) / RAMONA/ MISSE ... um objeto fino de metal, para prender o cabelo? (Mostrar)',
  'DIADEMA/ ARCO/ TIARA ... o objeto de metal ou plástico que pega de um lado a outro da cabeça e serve para prender os cabelos ( mímica)',
  'SINALEIRO/ SEMÁFORO/ SINAL Na cidade, o que costuma ter em cruzamentos movimentados, com luz vermelha, verde e amarela? [Onde os carros devem parar para as pessoas ou outros carros passarem?]',
  'LOMBADA/ QUEBRA- MOLAS ... aquele morrinho atravessado no asfalto para os carros diminuírem a velocidade?',
  'CALÇADA/PASSEIO Na cidade, os automóveis andam no meio da rua e as pessoas nos dois lados, num caminho revestido de lajes ou ladrilhos. Como se chama este caminho?',
  'MEIO-FIO ... o que separa o____ (cf. item 196) da rua?',
  'ROTATÓRIA/ RÓTULA ... um desvio redondo em cruzamentos movimentados, para facilitar o trânsito?',
  'LOTE/TERRENO/DATA ... a área que é preciso ter ou comprar para se fazer uma casa na cidade?',
  'ÔNIBUS URBANO ... a condução que leva mais ou menos quarenta passageiro que faz o percurso dentro cidade ?',
  'ÔNIBUS INTERURBANO ... a condução que leva mais ou menos quarenta passageiro que faz o percurso de uma cidade a outra ?',
  'BODEGA/ BAR/ BOTECO ... um lugar pequeno, com um balcão, onde os homens costumam ir beber____ (cf. item 182) e onde também se pode comprar alguma outra coisa?'
]

type Relationship <L, D> = {
  metadata: { identity: string; label: L }
  data: D
  target: string
}
type Relationships = {
  NATURALIDADE: typeof NATURALIDADES[number]
  PALAVRA: typeof PALAVRAS[number]
}

type Entity <L, D> = {
  metadata: { identity: string; label: L }
  data: D
  relationships: { 
    [label in keyof Relationships]?: Record<string, Relationship<label, Relationships[label]>>
  }
}
type Entities = {
  ZONA: typeof ZONAS[number]
  FAIXA_ETARIA: typeof FAIXAS_ETARIAS[number]
  SEXO: typeof SEXOS[number]
  ESCOLARIDADE: typeof ESCOLARIDADES[number]
  QUESTIONAMENTO: typeof QUESTIONAMENTOS[number]
}

type AdjacencyList = {
  [entity in keyof Entities]?: {
    [identity: string]: Entity<entity, Entities[entity]>
  }  
}

const Graph = (adjacencyList: AdjacencyList = {}) => ({
  get: () => adjacencyList,
  addEntity: (label: keyof Entities, data: Entities[typeof label], identity = randomUUID()) => {
    console.log({ ... adjacencyList[label] })
    adjacencyList = { ... adjacencyList,
      [label]: { ... adjacencyList[label],
        [identity]: { 
          metadata: { identity, label }, 
          data,
          relationships: {} 
        }
      }
    }
  }
})

const adjacencyList = Graph()
adjacencyList.addEntity("ZONA", "Setor Norte")
adjacencyList.addEntity("ESCOLARIDADE", "18 a 40")
console.log(adjacencyList.get())

/*
const Entity = <L, D, T = void> (label: L, data: D, target?: T) => ({
  metadata: { identity: randomUUID(), label }, 
  data, 
  ...(target ? { target } : {})
})

const Node = <L, D> (label: L, data: D) => Entity(label, data)
const Relationship = <L, D> (label: L, data: D, target: string) => Entity(label, data, target)

type Entities = {
  ZONA: typeof ZONAS[number]
  NATURALIDADE: typeof NATURALIDADES[number]
  FAIXA_ETARIA: typeof FAIXAS_ETARIAS[number]
  SEXO: typeof SEXOS[number]
  ESCOLARIDADE: typeof ESCOLARIDADES[number]
  QUESTIONAMENTO: typeof QUESTIONAMENTOS[number]
  PALAVRA: typeof PALAVRAS[number]
}

type AdjacencyList = {
  [entity in keyof Entities]: {
    metadata: { identity: string; label: entity } 
    data: Entities[entity]
  }
}

const Seed = () => {
  const data = {}
}

// 1 – Setor Norte	W.G.S.R.	F	1	EF	TO	Formoso
const { log } = console

const Graph = (adjacencyList = new Map()) => ({
  get: () => adjacencyList,
  addNode: (label: string, data: any) => adjacencyList.set(label, Node(label, data)),
  addRelationship: (from: string, to: string) => {
    const target = adjacencyList.get()
  }
})

const adjacencyList = Graph()
adjacencyList.addNode("ZONA", "Setor Sul")
log(adjacencyList.get())
*/