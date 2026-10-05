/**
 * Catálogo da Contém Amor — banco de dados estático do cardápio.
 *
 * ATENÇÃO EDIMAR:
 * Os itens abaixo são EXEMPLOS para o catálogo funcionar enquanto os dados reais
 * não chegam. Troque nome, categoria, descrição, preço e imagem de cada produto
 * pelos produtos reais da Contém Amor. Não é preciso tocar em nenhum outro arquivo.
 *
 * category precisa ser uma das chaves definidas em CATEGORIES (app.js usa isso
 * para montar os filtros automaticamente).
 *
 * image: caminho do arquivo em assets/images/products/. Se o arquivo ainda não
 * existir, o site mostra um ícone no lugar da foto (sem usar banco de imagem
 * genérico) até a foto real ser adicionada.
 */

export const CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'biscoitos', label: 'Biscoitos' },
  { id: 'casadinhos', label: 'Casadinhos' },
  { id: 'amanteigados', label: 'Amanteigados' },
  { id: 'kits', label: 'Kits/Presentes' },
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Cookie de Chocolate',
    category: 'cookies',
    description: 'Casquinha crocante por fora, macio por dentro, com gotas de chocolate.',
    price: 8.0,
    image: 'assets/images/products/cookie-chocolate.jpg',
    featured: true,
  },
  {
    id: 2,
    name: 'Cookie de Doce de Leite',
    category: 'cookies',
    description: 'Massa amanteigada recheada com doce de leite cremoso.',
    price: 8.5,
    image: 'assets/images/products/cookie-doce-de-leite.jpg',
    featured: false,
  },
  {
    id: 3,
    name: 'Biscoito de Polvilho',
    category: 'biscoitos',
    description: 'Receita tradicional, assado lentamente até ficar bem crocante.',
    price: 14.0,
    image: 'assets/images/products/biscoito-polvilho.jpg',
    featured: false,
  },
  {
    id: 4,
    name: 'Biscoito Amanteigado de Nata',
    category: 'biscoitos',
    description: 'Feito com manteiga de verdade e um toque de nata.',
    price: 15.0,
    image: 'assets/images/products/biscoito-nata.jpg',
    featured: false,
  },
  {
    id: 5,
    name: 'Casadinho Tradicional',
    category: 'casadinhos',
    description: 'Dupla de biscoitos amanteigados unidos por doce de leite.',
    price: 2.5,
    image: 'assets/images/products/casadinho-tradicional.jpg',
    featured: true,
  },
  {
    id: 6,
    name: 'Casadinho de Chocolate',
    category: 'casadinhos',
    description: 'A mesma receita tradicional, com cobertura de chocolate.',
    price: 3.0,
    image: 'assets/images/products/casadinho-chocolate.jpg',
    featured: false,
  },
  {
    id: 7,
    name: 'Amanteigado Simples',
    category: 'amanteigados',
    description: 'Derrete na boca — só manteiga, açúcar e carinho.',
    price: 13.0,
    image: 'assets/images/products/amanteigado-simples.jpg',
    featured: false,
  },
  {
    id: 8,
    name: 'Amanteigado com Chocolate',
    category: 'amanteigados',
    description: 'A receita clássica da casa com gotas de chocolate meio amargo.',
    price: 15.0,
    image: 'assets/images/products/amanteigado-chocolate.jpg',
    featured: false,
  },
  {
    id: 9,
    name: 'Kit Degustação',
    category: 'kits',
    description: 'Uma amostra de cada biscoito da casa — ideal para conhecer a Contém Amor.',
    price: 35.0,
    image: 'assets/images/products/kit-degustacao.jpg',
    featured: true,
  },
  {
    id: 10,
    name: 'Caixa Presente',
    category: 'kits',
    description: 'Seleção especial embalada para presentear com carinho.',
    price: 45.0,
    image: 'assets/images/products/caixa-presente.jpg',
    featured: false,
  },
];
