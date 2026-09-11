import Product, { IProduct } from "../models/Product"

export const getAllProducts = async () => {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .lean()

  return products.map((product) => ({
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    producer: product.producer,
    origin: product.origin,
    unit: product.unit,
    price: product.price,
    category: product.category,
    image: product.image,
    tag: product.tag,
    note: product.note,
    stock: product.stock,
    featured: product.featured,
  }))
}

export const getProductBySlug = async (slug: string) => {
  const product = await Product.findOne({ slug }).lean()

  if (!product) {
    return null
  }

  return {
    id: product._id.toString(),
    name: product.name,
    slug: product.slug,
    producer: product.producer,
    origin: product.origin,
    unit: product.unit,
    price: product.price,
    category: product.category,
    image: product.image,
    tag: product.tag,
    note: product.note,
    stock: product.stock,
    featured: product.featured,
  }
}

export const createProduct = async (
  productData: Partial<IProduct>
): Promise<IProduct> => {
  const product = await Product.create(productData)

  return product
}

export const updateProduct = async (
  id: string,
  productData: Partial<IProduct>
): Promise<IProduct | null> => {
  return Product.findByIdAndUpdate(
    id,
    productData,
    {
      new: true,
      runValidators: true,
    }
  )
}

export const deleteProduct = async (
  id: string
): Promise<IProduct | null> => {
  return Product.findByIdAndDelete(id)
}