export interface Gifts {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  points: number;
  quantity: number;
  rescuePoints: number;
}

export const gifts: Gifts[] = [
  {
    id: '1',
    imageUrl:
      'https://a-static.mlcdn.com.br/450x450/chaveiro-jeep-aguiar-carimbos/aguiarcarimbos/85e35dc2b48711eda7a74201ac185019/140777ac60aba0c3da91e65afa30b70b.jpeg',
    name: 'Chaveiro Jeep',
    description: 'Chaveiro Jeep',
    price: 0,
    points: 0,
    quantity: 0,
    rescuePoints: 500,
  },
  {
    id: '2',
    imageUrl:
      'https://www.hangar33.com.br/dw/image/v2/BFCG_PRD/on/demandware.static/-/Sites-masterCatalog_Lunelli/default/dw0987a661/large/hangar33-1.74782-000156-D1.jpg?sw=900&sfrm=jpg&sm=fit&q=80  ',
    name: 'Boné Basico',
    description: 'Boné Basico',
    price: 0,
    points: 0,
    quantity: 0,
    rescuePoints: 1000,
  },
  {
    id: '3',
    imageUrl:
      'https://www.martdigital.com.br/wp-content/uploads/2019/09/mockup-camiseta.jpg',
    name: 'Camiseta Personalizada',
    description: 'Camiseta Personalizada',
    price: 0,
    points: 0,
    quantity: 0,
    rescuePoints: 1500,
  },
];
