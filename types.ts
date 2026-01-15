
// ViewState enum defines the navigation states of the application
export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  BLOG = 'BLOG',
  CART = 'CART',
  STUDIO = 'STUDIO',
  CONTACT = 'CONTACT'
}

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  badge?: string;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  cartCount: number;
  total: number;
}

// API Product Types
export interface ProductSpec {
  key: string;
  value: string;
}

export interface SpecGroup {
  group: string;
  specs: ProductSpec[];
}

export interface ProductVariant {
  id: string;
  name: string;
  images: string[];
  inventory: number;
  sellingPrice: number;
  priceCurrency: string;
}

export interface Product {
  uuid: string;
  slug: string;
  title: string;
  description: string;
  specifications: SpecGroup[];
  seo: {
    title: string;
    description: string;
  };
  collections: string[];
  categories: string[];
  variants: ProductVariant[];
}
