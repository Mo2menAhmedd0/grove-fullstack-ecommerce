
import dotenv from "dotenv"
import mongoose from "mongoose"
import Product from "../models/Product"

dotenv.config()

const products = [
  {
    name: "Organic Bananas",
    slug: "organic-bananas",
    producer: "Green Valley Farm",
    origin: "Kent",
    unit: "1kg bunch",
    price: 3.2,
    category: "produce",
    image: "https://images.pexels.com/photos/4114131/pexels-photo-4114131.jpeg",
    tag: "Best seller",
    note: "Naturally ripened bananas with a soft texture and plenty of sweetness.",
    stock: 60,
    featured: true,
  },

  {
    name: "Pink Lady Apples",
    slug: "pink-lady-apples",
    producer: "Rosewood Orchard",
    origin: "Herefordshire",
    unit: "6 apples",
    price: 4.8,
    category: "produce",
    image: "https://images.pexels.com/photos/5876762/pexels-photo-5876762.jpeg",
    tag: "Seasonal",
    note: "Crisp, juicy apples with a naturally sweet and slightly sharp finish.",
    stock: 45,
    featured: true,
  },

  {
    name: "Fresh Avocados",
    slug: "fresh-avocados",
    producer: "Sunny Grove",
    origin: "Kent",
    unit: "2 avocados",
    price: 4.5,
    category: "produce",
    image: "https://images.pexels.com/photos/19808820/pexels-photo-19808820.jpeg",
    tag: "Best seller",
    note: "Creamy ripe avocados, perfect for toast, salads, or guacamole.",
    stock: 35,
    featured: false,
  },

  {
    name: "Fresh Carrots",
    slug: "fresh-carrots",
    producer: "Meadow Fields",
    origin: "Norfolk",
    unit: "500g bunch",
    price: 2.4,
    category: "produce",
    image: "https://images.pexels.com/photos/6740693/pexels-photo-6740693.jpeg",
    tag: "Seasonal",
    note: "Crunchy young carrots with a naturally sweet flavour.",
    stock: 50,
    featured: false,
  },

  {
    name: "Sourdough Bread",
    slug: "sourdough-bread",
    producer: "The Daily Loaf",
    origin: "London",
    unit: "800g loaf",
    price: 5.5,
    category: "bakery",
    image: "https://images.pexels.com/photos/6605209/pexels-photo-6605209.jpeg",
    tag: "Best seller",
    note: "Slow fermented sourdough with a crisp crust and soft open crumb.",
    stock: 30,
    featured: true,
  },

  {
    name: "Wholemeal Bread",
    slug: "wholemeal-bread",
    producer: "The Daily Loaf",
    origin: "London",
    unit: "700g loaf",
    price: 4.2,
    category: "bakery",
    image: "https://images.pexels.com/photos/30888607/pexels-photo-30888607.jpeg",
    note: "Soft wholemeal bread baked with stone-ground flour.",
    stock: 35,
    featured: false,
  },

  {
    name: "Butter Croissants",
    slug: "butter-croissants",
    producer: "Morning Bakehouse",
    origin: "London",
    unit: "Pack of 4",
    price: 6.5,
    category: "bakery",
    image: "https://images.pexels.com/photos/3323202/pexels-photo-3323202.jpeg",
    tag: "New",
    note: "Golden, flaky croissants made with cultured butter.",
    stock: 25,
    featured: true,
  },

  {
    name: "Free Range Eggs",
    slug: "free-range-eggs",
    producer: "Willow Farm",
    origin: "Suffolk",
    unit: "Box of 6",
    price: 3.9,
    category: "dairy",
    image: "https://images.pexels.com/photos/7616441/pexels-photo-7616441.jpeg",
    tag: "Best seller",
    note: "Free range eggs with rich golden yolks.",
    stock: 50,
    featured: true,
  },

  {
    name: "Whole Milk",
    slug: "whole-milk",
    producer: "Hollow Dairy",
    origin: "Devon",
    unit: "1 litre",
    price: 2.6,
    category: "dairy",
    image: "https://images.pexels.com/photos/14127931/pexels-photo-14127931.jpeg",
    note: "Fresh whole milk from pasture-raised British cows.",
    stock: 45,
    featured: false,
  },

  {
    name: "Greek Yogurt",
    slug: "greek-yogurt",
    producer: "Hollow Dairy",
    origin: "Devon",
    unit: "500g tub",
    price: 4.4,
    category: "dairy",
    image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg",
    tag: "Best seller",
    note: "Thick and creamy Greek yogurt with a naturally rich taste.",
    stock: 35,
    featured: false,
  },

  {
    name: "Salted Butter",
    slug: "salted-butter",
    producer: "Hollow Dairy",
    origin: "Devon",
    unit: "250g block",
    price: 4.8,
    category: "dairy",
    image: "https://images.pexels.com/photos/1628086/pexels-photo-1628086.jpeg",
    note: "Cultured butter finished with a touch of sea salt.",
    stock: 30,
    featured: false,
  },

  {
    name: "Chicken Breast",
    slug: "chicken-breast",
    producer: "Willow Farm",
    origin: "Suffolk",
    unit: "500g pack",
    price: 8.9,
    category: "butcher",
    image: "https://images.pexels.com/photos/6107722/pexels-photo-6107722.jpeg",
    tag: "Best seller",
    note: "Tender free-range chicken breast, trimmed and ready to cook.",
    stock: 25,
    featured: true,
  },

  {
    name: "Beef Mince",
    slug: "beef-mince",
    producer: "Meadow Butchers",
    origin: "Yorkshire",
    unit: "500g pack",
    price: 9.5,
    category: "butcher",
    image: "https://images.pexels.com/photos/112781/pexels-photo-112781.jpeg",
    note: "Grass-fed beef mince with a rich flavour and balanced fat.",
    stock: 20,
    featured: false,
  },

  {
    name: "Sirloin Steak",
    slug: "sirloin-steak",
    producer: "Meadow Butchers",
    origin: "Yorkshire",
    unit: "300g steak",
    price: 15.5,
    category: "butcher",
    image: "https://images.pexels.com/photos/6542794/pexels-photo-6542794.jpeg",
    tag: "Best seller",
    note: "Tender grass-fed sirloin steak with a deep beefy flavour.",
    stock: 15,
    featured: true,
  },

  {
    name: "Basmati Rice",
    slug: "basmati-rice",
    producer: "Harvest Pantry",
    origin: "India",
    unit: "1kg bag",
    price: 4.9,
    category: "pantry",
    image: "https://images.pexels.com/photos/31555433/pexels-photo-31555433.jpeg",
    note: "Long-grain basmati rice with a light aroma and fluffy texture.",
    stock: 60,
    featured: false,
  },

  {
    name: "Penne Pasta",
    slug: "penne-pasta",
    producer: "Casa Molino",
    origin: "Italy",
    unit: "500g",
    price: 3.5,
    category: "pantry",
    image: "https://images.pexels.com/photos/14545365/pexels-photo-14545365.jpeg",
    tag: "Best seller",
    note: "Bronze-cut Italian pasta with a rough surface for holding sauce.",
    stock: 55,
    featured: true,
  },

  {
    name: "Tomato Passata",
    slug: "tomato-passata",
    producer: "Casa Verde",
    origin: "Italy",
    unit: "700ml bottle",
    price: 4.2,
    category: "pantry",
    image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg",
    note: "Smooth Italian tomato passata made from ripe summer tomatoes.",
    stock: 40,
    featured: false,
  },

  {
    name: "Extra Virgin Olive Oil",
    slug: "extra-virgin-olive-oil",
    producer: "Casa Verde",
    origin: "Spain",
    unit: "500ml bottle",
    price: 12.5,
    category: "pantry",
    image: "https://images.pexels.com/photos/7656594/pexels-photo-7656594.jpeg",
    tag: "Best seller",
    note: "Cold-pressed extra virgin olive oil with a fresh peppery finish.",
    stock: 30,
    featured: true,
  },

  {
    name: "Wildflower Honey",
    slug: "wildflower-honey",
    producer: "Golden Hive",
    origin: "Dorset",
    unit: "340g jar",
    price: 7.8,
    category: "pantry",
    image: "https://images.pexels.com/photos/5634205/pexels-photo-5634205.jpeg",
    note: "Raw wildflower honey collected from seasonal countryside blooms.",
    stock: 25,
    featured: false,
  },

  {
    name: "Orange Juice",
    slug: "orange-juice",
    producer: "Grove Kitchen",
    origin: "Valencia",
    unit: "750ml bottle",
    price: 5.2,
    category: "drinks",
    image: "https://images.pexels.com/photos/26791698/pexels-photo-26791698.jpeg",
    tag: "Seasonal",
    note: "Cold-pressed Valencia oranges with nothing added.",
    stock: 30,
    featured: true,
  },

  {
    name: "Apple Juice",
    slug: "apple-juice",
    producer: "Rosewood Orchard",
    origin: "Herefordshire",
    unit: "750ml bottle",
    price: 4.8,
    category: "drinks",
    image: "https://images.pexels.com/photos/27119202/pexels-photo-27119202.jpeg",
    note: "Cloudy apple juice pressed from crisp British apples.",
    stock: 25,
    featured: false,
  },

  {
    name: "Sparkling Water",
    slug: "sparkling-water",
    producer: "Spring House",
    origin: "Wales",
    unit: "750ml bottle",
    price: 2.5,
    category: "drinks",
    image: "https://images.pexels.com/photos/31012799/pexels-photo-31012799.jpeg",
    note: "Naturally mineralised sparkling water with fine bubbles.",
    stock: 50,
    featured: false,
  },

  {
    name: "Lemonade",
    slug: "lemonade",
    producer: "Grove Kitchen",
    origin: "London",
    unit: "750ml bottle",
    price: 4.5,
    category: "drinks",
    image: "https://images.pexels.com/photos/4725675/pexels-photo-4725675.jpeg",
    tag: "New",
    note: "Bright and refreshing lemonade made with real lemon juice.",
    stock: 30,
    featured: false,
  },
]

const seedProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined")
    }

    await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB connected")

    await Product.deleteMany({})

    console.log("Old products deleted")

    const createdProducts = await Product.insertMany(products)

    console.log(
      `${createdProducts.length} products inserted successfully`
    )

    await mongoose.disconnect()

    console.log("MongoDB disconnected")

    process.exit(0)
  } catch (error) {
    console.error("Seed failed:", error)

    await mongoose.disconnect()

    process.exit(1)
  }
}

seedProducts()

