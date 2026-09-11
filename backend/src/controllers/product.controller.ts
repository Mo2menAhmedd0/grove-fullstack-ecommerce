import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
} from "../services/product.service";

export const getProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await getAllProducts();

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Get products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export const getProduct = async (
  req: Request<{ slug: string }>,
  res: Response
): Promise<void> => {
  try {
    const product = await getProductBySlug(req.params.slug);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Get product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

export const editProduct = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const product = await updateProduct(req.params.id, req.body);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

export const removeProduct = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const product = await deleteProduct(req.params.id);

    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
};