export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  points: number;
  quantity: number;
}

export const products: Product[] = [
  {
    id: '1',
    imageUrl:
      'https://f450c.org/wp-content/uploads/2019/04/7-Benefits-of-T-Shirt-Design-Software-For-e-commerce-business.jpg',
    name: 'Blusa My Bookshelf',
    description: 'Blusa estampada',
    price: 59.9,
    points: 100,
    quantity: 1,
  },
  {
    id: '2',
    imageUrl:
      'https://rlv.zcache.com/trust_me_im_an_architect_t_shirt-re3969087a27a47af89c967f8eca3883e_k2gm8_704.webp',
    name: 'Blusa Trust Me',
    description: 'Blusa estampada',
    price: 59.9,
    points: 100,
    quantity: 1,
  },
  {
    id: '3',
    imageUrl:
      'https://mercadoadaptado.com.br/wp-content/uploads/2021/05/gif-ecommerce-freeda-395-foco-1-ziper-calca-bauby_mercadoadaptado.jpg',
    name: 'Calça Jeans Bauby',
    description: 'calça jeans preta',
    price: 159.9,
    points: 268,
    quantity: 1,
  },
  {
    id: '4',
    imageUrl:
      'https://armadillo.vteximg.com.br/arquivos/ids/173540/20883---calca-jogger-melbourne-caqui--vitrine-.jpg?v=637855592675730000',
    name: 'Calça Moletom Jogger',
    description: 'calça moletom marrom',
    price: 129.9,
    points: 216,
    quantity: 1,
  },
  {
    id: '5',
    imageUrl:
      'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/usereise/media/uploads/produtos/foto/b0498517bfbcetenis-masculino-rs8-nobuck-preto-03.jpg',
    name: 'Sapato Urban',
    description: 'Sapato casual',
    price: 119.9,
    points: 200,
    quantity: 1,
  },
  {
    id: '6',
    imageUrl:
      'https://noha.vteximg.com.br/arquivos/ids/160154-1000-1000/Fotos-E-commerce--2-.png?v=638010056292670000',
    name: 'Tênis Curt Preto',
    description: 'Tênis casual',
    price: 119.9,
    points: 200,
    quantity: 1,
  },
];
