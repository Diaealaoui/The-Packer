import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  products, type Product, type InsertProduct,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  reviews, type Review, type InsertReview
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // Users (keeping original methods)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getNewProducts(limit?: number): Promise<Product[]>;
  getSaleProducts(limit?: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  
  // Order Items
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Reviews
  getReviews(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private reviews: Map<number, Review>;
  
  private userId: number;
  private categoryId: number;
  private productId: number;
  private orderId: number;
  private orderItemId: number;
  private reviewId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.reviews = new Map();
    
    this.userId = 1;
    this.categoryId = 1;
    this.productId = 1;
    this.orderId = 1;
    this.orderItemId = 1;
    this.reviewId = 1;
    
    // Initialize with sample data
    this.initSampleData();
  }

  private initSampleData() {
    // Create categories
    const electronics = this.createCategory({
      name: "Electronics",
      slug: "electronics",
      imageUrl: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147"
    });
    
    const clothing = this.createCategory({
      name: "Clothing",
      slug: "clothing",
      imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f"
    });
    
    const homeKitchen = this.createCategory({
      name: "Home & Kitchen",
      slug: "home-kitchen",
      imageUrl: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea"
    });
    
    const beauty = this.createCategory({
      name: "Beauty",
      slug: "beauty",
      imageUrl: "https://images.unsplash.com/photo-1571875257727-256c39da42af"
    });
    
    // Create products
    this.createProduct({
      name: "Wireless Headphones",
      slug: "wireless-headphones",
      description: "Experience crystal clear sound with our premium wireless headphones. These headphones feature Bluetooth 5.0 technology, 40 hours of battery life, and active noise cancellation for an immersive audio experience.",
      price: "129.99",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      categoryId: electronics.id,
      inStock: true,
      isFeatured: true,
      isNew: false,
      isSale: false
    });
    
    this.createProduct({
      name: "Smart Watch",
      slug: "smart-watch",
      description: "Stay connected with our feature-packed smart watch. Track your fitness, receive notifications, and more with this sleek and stylish wearable device.",
      price: "199.99",
      originalPrice: "249.99",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      categoryId: electronics.id,
      inStock: true,
      isFeatured: true,
      isNew: false,
      isSale: true
    });
    
    this.createProduct({
      name: "Running Shoes",
      slug: "running-shoes",
      description: "Enhance your running experience with our comfortable and durable running shoes. Perfect for both professional athletes and casual joggers.",
      price: "89.99",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      categoryId: clothing.id,
      inStock: true,
      isFeatured: true,
      isNew: false,
      isSale: false
    });
    
    this.createProduct({
      name: "Polaroid Camera",
      slug: "polaroid-camera",
      description: "Capture memories instantly with our vintage-inspired polaroid camera. Creates physical photos on the spot with excellent image quality.",
      price: "149.99",
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      categoryId: electronics.id,
      inStock: true,
      isFeatured: true,
      isNew: true,
      isSale: false
    });
    
    this.createProduct({
      name: "Scented Candle Set",
      slug: "scented-candle-set",
      description: "Set of 3 luxurious scented candles to create a relaxing atmosphere in your home. Long-lasting and made with natural ingredients.",
      price: "34.99",
      imageUrl: "https://images.unsplash.com/photo-1603006905086-ec3d4471e668",
      categoryId: homeKitchen.id,
      inStock: true,
      isFeatured: false,
      isNew: true,
      isSale: false
    });
    
    this.createProduct({
      name: "Skincare Set",
      slug: "skincare-set",
      description: "Complete skincare routine set with cleanser, toner, moisturizer, and serum. Made with natural ingredients suitable for all skin types.",
      price: "79.99",
      originalPrice: "99.99",
      imageUrl: "https://images.unsplash.com/photo-1556760544-74068565f05c",
      categoryId: beauty.id,
      inStock: true,
      isFeatured: false,
      isNew: false,
      isSale: true
    });
    
    // Add sample reviews
    this.createReview({
      productId: 1,
      rating: 5,
      customerName: "Sarah J.",
      comment: "The headphones I purchased exceeded my expectations. The sound quality is amazing and the battery life is impressive. Highly recommend!"
    });
    
    this.createReview({
      productId: 2,
      rating: 4,
      customerName: "Michael T.",
      comment: "Great smartwatch with lots of features. The battery could last a bit longer, but overall I'm very satisfied with my purchase."
    });
  }

  // Users implementation (keeping original methods)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Categories implementation
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Products implementation
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    const featuredProducts = Array.from(this.products.values()).filter(
      (product) => product.isFeatured,
    );
    
    return limit ? featuredProducts.slice(0, limit) : featuredProducts;
  }
  
  async getNewProducts(limit?: number): Promise<Product[]> {
    const newProducts = Array.from(this.products.values()).filter(
      (product) => product.isNew,
    );
    
    return limit ? newProducts.slice(0, limit) : newProducts;
  }
  
  async getSaleProducts(limit?: number): Promise<Product[]> {
    const saleProducts = Array.from(this.products.values()).filter(
      (product) => product.isSale,
    );
    
    return limit ? saleProducts.slice(0, limit) : saleProducts;
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      createdAt: new Date()
    };
    this.products.set(id, product);
    return product;
  }
  
  // Orders implementation
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderId++;
    const order: Order = { 
      ...insertOrder, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }
  
  // Order Items implementation
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (orderItem) => orderItem.orderId === orderId,
    );
  }
  
  async createOrderItem(insertOrderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemId++;
    const orderItem: OrderItem = { ...insertOrderItem, id };
    this.orderItems.set(id, orderItem);
    return orderItem;
  }
  
  // Reviews implementation
  async getReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.productId === productId,
    );
  }
  
  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.reviewId++;
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
