import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "SW-001",
    name: "6A 1-Way Modular Switch",
    category: "Switches",
    brand: "Roma",
    description: "Elegant and durable 1-way switch designed for modern interiors. Smooth tactile feedback and high-grade polycarbonate material.",
    specs: ["6A Rated", "240V AC", "Glossy White Finish", "Modular Design"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "SW-002",
    name: "16A 1-Way Modular Switch",
    category: "Switches",
    brand: "GM",
    description: "Heavy-duty switch suitable for high-power appliances like geysers and air conditioners.",
    specs: ["16A Rated", "240V AC", "Sleek Design", "Spark-free Operation"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "SK-001",
    name: "6/16A Twin Socket",
    category: "Sockets",
    brand: "Anchor",
    description: "Combined socket for both 6A and 16A plugs. Features safety shutters to prevent accidental contact.",
    specs: ["Multi-pin Support", "Safety Shutter", "Polycarbonate Body", "Universal Fit"],
    image: "https://images.unsplash.com/photo-1620067925093-801122da1688?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "MCB-001",
    name: "32A SP MCB C-Curve",
    category: "MCBs",
    brand: "Havells",
    description: "Miniature Circuit Breaker for protecting electrical circuits from overload and short circuit.",
    specs: ["32A Single Pole", "C-Curve Type", "10kA Breaking Capacity", "DIN Rail Mount"],
    image: "https://images.unsplash.com/photo-1618330834871-dd22c2c22679?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "WRE-001",
    name: "1.5 Sq.mm FR Copper Wire",
    category: "Wires",
    brand: "Bajaj",
    description: "Flame Retardant (FR) PVC insulated copper wire. Ideal for residential wiring.",
    specs: ["1.5 Sq.mm", "90 Meter Coil", "Flame Retardant", "99.9% Pure Copper"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "LGT-001",
    name: "12W LED Panel Light",
    category: "Lighting",
    brand: "Orient",
    description: "Energy-efficient LED panel light with uniform brightness and long lifespan.",
    specs: ["12 Watts", "Cool White", "High Lumens", "Slim Design"],
    image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "SW-003",
    name: "Legrand Arteor 1-Way Switch",
    category: "Switches",
    brand: "Legrand",
    description: "International standard modular switch with  finish and ultra-smooth operation.",
    specs: ["10A Rated", "Magnolia Finish", "Modular System", "Silver Inlay"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "FAN-001",
    name: "Crompton Energion Ceiling Fan",
    category: "Fans",
    brand: "Crompton",
    description: "High-speed ceiling fan with BLDC technology for maximum energy savings.",
    specs: ["28W Power", "1200mm Sweep", "Remote Control", "5-Star Rating"],
    image: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "WRE-002",
    name: "Polycab 2.5 Sq.mm Green Wire",
    category: "Wires",
    brand: "Polycab",
    description: "Multi-strand copper wire with high conductivity and heat resistance.",
    specs: ["2.5 Sq.mm", "Oxygen Free Copper", "PVC Insulated", "Lead Free"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400"
  }
];

export const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);
export const brands = ["Roma", "GM", "Anchor", "Havells", "Bajaj", "Orient", "Arome", "Legrand", "Crompton", "Polycab"].filter(Boolean);
