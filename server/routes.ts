import React from 'react';
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertCategorySchema, 
  insertProductSchema, 
  insertOrderSchema, 
  insertOrderItemSchema, 
  insertReviewSchema,
  cartItemSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Error handling middleware
  const handleErrors = (err: any, res: Response) => {
    if (err instanceof ZodError) {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: fromZodError(err).message 
      });
    }
    
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  };

  // Categories endpoints
  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  // Products endpoints
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  app.get("/api/products/featured", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const products = await storage.getFeaturedProducts(limit);
      res.json(products);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  app.get("/api/products/new", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const products = await storage.getNewProducts(limit);
      res.json(products);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  app.get("/api/products/sale", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const products = await storage.getSaleProducts(limit);
      res.json(products);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  app.get("/api/products/category/:categoryId", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      
      if (isNaN(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const products = await storage.getProductsByCategory(categoryId);
      res.json(products);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  // Orders endpoints
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body.order);
      const cartItems = z.array(cartItemSchema).parse(req.body.items);
      
      // Create order
      const order = await storage.createOrder(orderData);
      
      // Create order items
      const orderItems = [];
      let total = 0;
      
      for (const item of cartItems) {
        const product = await storage.getProductById(item.productId);
        
        if (!product) {
          return res.status(404).json({ 
            message: `Product with ID ${item.productId} not found` 
          });
        }
        
        if (!product.inStock) {
          return res.status(400).json({ 
            message: `Product ${product.name} is out of stock` 
          });
        }
        
        const price = parseFloat(product.price.toString());
        const subtotal = price * item.quantity;
        total += subtotal;
        
        const orderItem = await storage.createOrderItem({
          orderId: order.id,
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          subtotal: subtotal.toString()
        });
        
        orderItems.push(orderItem);
      }
      
      // Update order total
      // Note: In a real DB, we would update the order record, but for in-memory
      // we're directly manipulating the object
      order.total = total.toString();
      
      res.status(201).json({ 
        order,
        orderItems
      });
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  // Reviews endpoints
  app.get("/api/products/:productId/reviews", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      
      if (isNaN(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const reviews = await storage.getReviews(productId);
      res.json(reviews);
    } catch (err) {
      handleErrors(err, res);
    }
  });
  
  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      
      // Verify the product exists
      const product = await storage.getProductById(reviewData.productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (err) {
      handleErrors(err, res);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
