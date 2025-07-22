import { Product } from '../types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
    price: 199.99 * 83,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    rating: 4.8,
    stock: 25,
    tags: ['wireless', 'bluetooth', 'audio', 'music']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitor and GPS',
    price: 299.99 * 83,
    category: 'Electronics',
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg',
    rating: 4.6,
    stock: 18,
    tags: ['fitness', 'smartwatch', 'health', 'gps']
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt',
    price: 29.99 * 83,
    category: 'Clothing',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    rating: 4.5,
    stock: 50,
    tags: ['organic', 'cotton', 'sustainable', 'casual']
  },
  {
    id: '4',
    name: 'Premium Coffee Beans',
    description: 'Single-origin Ethiopian coffee beans, medium roast',
    price: 24.99 * 83,
    category: 'Food & Beverages',
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg',
    rating: 4.9,
    stock: 35,
    tags: ['coffee', 'organic', 'ethiopian', 'medium-roast']
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and wireless charging',
    price: 79.99 * 83,
    category: 'Home & Office',
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
    rating: 4.7,
    stock: 12,
    tags: ['led', 'wireless-charging', 'minimalist', 'desk']
  },
  {
    id: '6',
    name: 'Yoga Mat Pro',
    description: 'Professional-grade yoga mat with superior grip and cushioning',
    price: 59.99 * 83,
    category: 'Sports & Fitness',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
    rating: 4.4,
    stock: 28,
    tags: ['yoga', 'fitness', 'exercise', 'mat']
  },
  {
    id: '7',
    name: 'ASUS ROG Phone 7',
    description: 'High-performance gaming smartphone with Snapdragon processor and AMOLED display.',
    price: 999.99 * 83,
    category: 'Electronics',
    image: '/assests/asus-rog-7.jpg',
    rating: 4.9,
    stock: 10,
    tags: ['asus', 'rog', 'phone', 'gaming', 'smartphone']
  },
  {
    id: '8',
    name: 'GeForce RTX 4070 Super',
    description: 'NVIDIA GeForce RTX 4070 Super graphics card for ultimate gaming and creative performance.',
    price: 799.99 * 83,
    category: 'Electronics',
    image: '/assests/geforce-rtx-4070-super.jpg',
    rating: 4.8,
    stock: 8,
    tags: ['nvidia', 'geforce', 'rtx', 'gpu', 'graphics card']
  },
  {
    id: '9',
    name: 'RTX Branded T-Shirt',
    description: 'Comfortable cotton t-shirt featuring the RTX logo. Perfect for gamers and tech enthusiasts.',
    price: 24.99 * 83,
    category: 'Clothing',
    image: '/assests/rtx-tshirt.jpg',
    rating: 4.7,
    stock: 30,
    tags: ['rtx', 't-shirt', 'clothing', 'gaming', 'merch']
  },
  {
    id: '10',
    name: 'Gamer Snack Box',
    description: 'Curated snack box for long gaming sessions, packed with energy and flavor.',
    price: 19.99 * 83,
    category: 'Food & Beverages',
    image: '/assests/Gamer Snack Box.webp',
    rating: 4.6,
    stock: 25,
    tags: ['snack', 'gamer', 'food', 'box']
  },
  {
    id: '11',
    name: 'Energy Drink Variety Pack',
    description: 'Assorted flavors of gamer-focused energy drinks for a boost during play.',
    price: 14.99 * 83,
    category: 'Food & Beverages',
    image: '/assests/Energy Drink Variety Pack.jpg',
    rating: 4.5,
    stock: 30,
    tags: ['energy drink', 'beverage', 'gamer', 'variety']
  },
  {
    id: '12',
    name: 'Ergonomic Gaming Chair',
    description: 'Adjustable chair with lumbar support and RGB accents for ultimate comfort.',
    price: 249.99 * 83,
    category: 'Home & Office',
    image: '/assests/Ergonomic Gaming Chair.webp',
    rating: 4.8,
    stock: 12,
    tags: ['chair', 'gaming', 'ergonomic', 'rgb']
  },
  {
    id: '13',
    name: 'Smart RGB Light Strip',
    description: 'App-controlled LED strip to enhance your gaming or work setup.',
    price: 29.99 * 83,
    category: 'Home & Office',
    image: '/assests/Smart RGB Light Strip.jpg',
    rating: 4.7,
    stock: 20,
    tags: ['rgb', 'light', 'smart', 'led']
  },
  {
    id: '14',
    name: 'Blue Light Blocking Glasses',
    description: 'Reduce eye strain during long gaming or work sessions with these stylish glasses.',
    price: 24.99 * 83,
    category: 'Accessories',
    image: '/assests/Blue Light Blocking Glasses.webp',
    rating: 4.4,
    stock: 40,
    tags: ['glasses', 'blue light', 'accessory', 'eye care']
  },
  {
    id: '15',
    name: 'Wireless Charging Mouse Pad',
    description: 'Large mouse pad with integrated wireless charging for your devices.',
    price: 39.99 * 83,
    category: 'Accessories',
    image: '/assests/Wireless Charging Mouse Pad.webp',
    rating: 4.6,
    stock: 18,
    tags: ['mouse pad', 'wireless charging', 'accessory']
  },
  {
    id: '16',
    name: 'Mechanical Keyboard Keycap Set',
    description: 'Custom keycaps with gaming and retro themes for mechanical keyboards.',
    price: 34.99 * 83,
    category: 'Accessories',
    image: '/assests/Mechanical Keyboard Keycap Set.webp',
    rating: 4.5,
    stock: 22,
    tags: ['keycap', 'keyboard', 'mechanical', 'accessory']
  },
  {
    id: '17',
    name: 'RGB LED Gamer Hoodie',
    description: 'Hoodie with built-in LED strips and USB power for a unique gaming look.',
    price: 49.99 * 83,
    category: 'Clothing',
    image: '/assests/RGB LED Gamer Hoodie.webp',
    rating: 4.3,
    stock: 15,
    tags: ['hoodie', 'clothing', 'rgb', 'gamer']
  },
  {
    id: '18',
    name: 'Razer DeathAdder V2 Mouse',
    description: 'Ergonomic gaming mouse with customizable RGB lighting.',
    price: 59.99 * 83,
    category: 'Electronics',
    image: '/assests/Razer DeathAdder V2 Mouse.jpg',
    rating: 4.8,
    stock: 25,
    tags: ['mouse', 'razer', 'gaming', 'electronics']
  },
  {
    id: '19',
    name: 'Samsung 2TB NVMe SSD',
    description: 'Ultra-fast storage for gaming PCs and workstations.',
    price: 179.99 * 83,
    category: 'Electronics',
    image: '/assests/Samsung 2TB NVMe SSD.jpg',
    rating: 4.9,
    stock: 10,
    tags: ['ssd', 'storage', 'samsung', 'electronics']
  },
  {
    id: '20',
    name: 'Elgato Stream Deck Mini',
    description: 'Customizable control pad for streamers and content creators.',
    price: 99.99 * 83,
    category: 'Electronics',
    image: '/assests/Elgato Stream Deck Mini.jpg',
    rating: 4.7,
    stock: 8,
    tags: ['elgato', 'stream', 'deck', 'electronics']
  },
  {
    id: '21',
    name: 'Steam Deck Handheld Console',
    description: 'Portable PC gaming console with a 7-inch touchscreen.',
    price: 399.99 * 83,
    category: 'Electronics',
    image: '/assests/Steam Deck Handheld Console.jpg',
    rating: 4.8,
    stock: 6,
    tags: ['steam', 'console', 'handheld', 'gaming']
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Food & Beverages',
  'Home & Office',
  'Sports & Fitness',
  'Home & Garden'
];