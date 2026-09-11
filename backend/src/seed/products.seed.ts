import dotenv from "dotenv"
import mongoose from "mongoose"
import Product from "../models/Product"

dotenv.config()

const products = [
  {
    name: "Vine Cherry Tomatoes",
    slug: "cherry-tomatoes",
    producer: "Ash Farm",
    origin: "Kent",
    unit: "400g punnet",
    price: 4.2,
    category: "produce",
    image: "/images/products/cherry-tomatoes.png",
    tag: "Seasonal",
    note: "Grown in soil, not water. Sugars concentrate in the last week on the vine.",
    stock: 50,
    featured: true,
  },

  {
    name: "Rainbow Chard",
    slug: "rainbow-chard",
    producer: "Marsh Market Garden",
    origin: "Somerset",
    unit: "Large bunch",
    price: 3.1,
    category: "produce",
    image: "/images/products/rainbow-chard.png",
    note: "Cut to order the morning your box is packed. Stems braise, leaves wilt.",
    stock: 40,
    featured: false,
  },

  {
    name: "Heirloom Apple Mix",
    slug: "heirloom-apples",
    producer: "Colby Orchard",
    origin: "Herefordshire",
    unit: "1.2kg",
    price: 6.5,
    category: "produce",
    image: "/images/products/heirloom-apples.png",
    tag: "Best seller",
    note: "Six old varieties in one crate — russet, pippin, and three we cannot pronounce.",
    stock: 35,
    featured: true,
  },

  {
    name: "Sweet Bell Peppers",
    slug: "bell-peppers",
    producer: "Glasshouse No. 4",
    origin: "Isle of Wight",
    unit: "3 peppers",
    price: 3.8,
    category: "produce",
    image: "/images/products/bell-peppers.png",
    note: "Ripened to full colour on the plant, which takes three weeks longer.",
    stock: 45,
    featured: false,
  },

  {
    name: "Romanesco & Purple Cauliflower",
    slug: "romanesco",
    producer: "Marsh Market Garden",
    origin: "Somerset",
    unit: "2 heads",
    price: 5.4,
    category: "produce",
    image: "/images/products/romanesco.png",
    tag: "Last few",
    note: "A fractal you can roast. Keeps its colour if you go hot and fast.",
    stock: 15,
    featured: false,
  },

  {
    name: "Country Sourdough",
    slug: "sourdough-loaf",
    producer: "Bench Bakery",
    origin: "London Fields",
    unit: "900g loaf",
    price: 5.5,
    category: "bakery",
    image: "/images/products/sourdough-loaf.png",
    tag: "Best seller",
    note: "Three flours, a 36-hour cold ferment, and one baker who refuses to rush it.",
    stock: 30,
    featured: true,
  },

  {
    name: "Dark Rye Loaf",
    slug: "rye-loaf",
    producer: "Bench Bakery",
    origin: "London Fields",
    unit: "750g loaf",
    price: 5.9,
    category: "bakery",
    image: "/images/products/rye-loaf.png",
    note: "Dense, malty, and better on day three. Cut it thin.",
    stock: 25,
    featured: false,
  },

  {
    name: "Butter Croissants",
    slug: "croissants",
    producer: "Bench Bakery",
    origin: "London Fields",
    unit: "Pack of 4",
    price: 7.2,
    category: "bakery",
    image: "/images/products/croissants.png",
    tag: "New",
    note: "Laminated with the same cultured butter we sell two rows down.",
    stock: 20,
    featured: true,
  },

  {
    name: "Pasture Duck Eggs",
    slug: "duck-eggs",
    producer: "Willow Yard",
    origin: "Suffolk",
    unit: "Box of 6",
    price: 4.6,
    category: "dairy",
    image: "/images/products/duck-eggs.png",
    note: "Richer yolks than hen eggs. Unbeatable in a custard or a fried rice.",
    stock: 40,
    featured: false,
  },

  {
    name: "Cultured Butter",
    slug: "cultured-butter",
    producer: "Hollow Dairy",
    origin: "Devon",
    unit: "250g block",
    price: 5.8,
    category: "dairy",
    image: "/images/products/cultured-butter.png",
    tag: "Best seller",
    note: "Cream soured for 18 hours before churning. Salted with Maldon flakes.",
    stock: 30,
    featured: true,
  },

  {
    name: "18-Month Alpine Cheese",
    slug: "aged-cheese",
    producer: "Fell Creamery",
    origin: "Cumbria",
    unit: "220g wedge",
    price: 9.4,
    category: "dairy",
    image: "/images/products/aged-cheese.png",
    note: "Raw milk, brushed rind, and crystals that crunch. Cut from a full wheel weekly.",
    stock: 18,
    featured: false,
  },

  {
    name: "Dry-Aged Ribeye",
    slug: "dry-aged-ribeye",
    producer: "Hart & Sons",
    origin: "Yorkshire",
    unit: "350g steak",
    price: 16.5,
    category: "butcher",
    image: "/images/products/dry-aged-ribeye.png",
    tag: "Last few",
    note: "Grass-fed, hung 35 days on the bone. Rest it as long as you cook it.",
    stock: 10,
    featured: false,
  },

  {
    name: "Free-Range Whole Chicken",
    slug: "free-range-chicken",
    producer: "Willow Yard",
    origin: "Suffolk",
    unit: "1.6kg bird",
    price: 13.9,
    category: "butcher",
    image: "/images/products/free-range-chicken.png",
    note: "Slow-grown to 81 days. Enough carcass for a proper stock afterwards.",
    stock: 15,
    featured: true,
  },

  {
    name: "Day Boat Sea Bass",
    slug: "sea-bass",
    producer: "Kittiwake",
    origin: "Cornwall",
    unit: "2 fillets",
    price: 11.2,
    category: "butcher",
    image: "/images/products/sea-bass.png",
    tag: "Seasonal",
    note: "Line caught yesterday, filleted this morning, scored for the pan.",
    stock: 12,
    featured: false,
  },

  {
    name: "First Press Olive Oil",
    slug: "olive-oil",
    producer: "Casa Verde",
    origin: "Jaén",
    unit: "500ml",
    price: 14.8,
    category: "pantry",
    image: "/images/products/olive-oil.png",
    tag: "Best seller",
    note: "Single estate picoal, milled within four hours of picking. Peppery finish.",
    stock: 25,
    featured: true,
  },

  {
    name: "Bronze-Cut Spaghetti",
    slug: "spaghetti",
    producer: "Molino Sesto",
    origin: "Gragnano",
    unit: "500g",
    price: 4.4,
    category: "pantry",
    image: "/images/products/spaghetti.png",
    note: "Rough surface, slow dried for 40 hours. Sauce actually sticks to it.",
    stock: 50,
    featured: false,
  },

  {
    name: "Wildflower Honey",
    slug: "wild-honey",
    producer: "Ninefold Apiary",
    origin: "Dorset",
    unit: "340g jar",
    price: 8.6,
    category: "pantry",
    image: "/images/products/wild-honey.png",
    note: "Unfiltered and unheated, so it sets. That is the honey working properly.",
    stock: 30,
    featured: false,
  },

  {
    name: "Filter Coffee Beans",
    slug: "coffee-beans",
    producer: "Kiln Roasters",
    origin: "Huila",
    unit: "250g whole bean",
    price: 12.5,
    category: "drinks",
    image: "/images/products/coffee-beans.png",
    tag: "New",
    note: "Washed caturra roasted last Tuesday. Stone fruit, cane sugar, no bitterness.",
    stock: 20,
    featured: false,
  },

  {
    name: "Cold-Pressed Orange Juice",
    slug: "orange-juice",
    producer: "Grove Kitchen",
    origin: "Valencia",
    unit: "750ml",
    price: 5.2,
    category: "drinks",
    image: "/images/products/orange-juice.png",
    note: "Fourteen oranges per bottle. Nothing added, not even water.",
    stock: 25,
    featured: true,
  },

  {
    name: "Elderflower Pressé",
    slug: "elderflower-presse",
    producer: "Hedgerow Co.",
    origin: "Wiltshire",
    unit: "750ml",
    price: 4.9,
    category: "drinks",
    image: "/images/products/elderflower-presse.png",
    tag: "Seasonal",
    note: "Foraged blossom steeped for two days. Dry, floral, barely sweet.",
    stock: 18,
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