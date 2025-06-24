interface Product {
  id: string;
  name: string;
  sizes: string[];
  thumbnail: string;
  pictures: { [color: string]: string[] };
  colours: string[];
  price: number;
  mrp: number;
  orderedBy: number;
  category: string;
  style: string;
  collection: string;
}

export interface CartItem {
  name: string;
  size: string;
  quantity: number;
  picture: string;
  price: number;
}

export default Product;
