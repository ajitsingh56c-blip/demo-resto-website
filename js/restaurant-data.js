/**
 * AJIT RESTAURANT — CENTRAL DATA & CONFIGURATION STORE
 * Currency: INR (₹) | Configurable 5% GST | Indian Menu Catalog | Reviews
 */

const AJIT_CONFIG = {
  name: "AJIT RESTAURANT",
  tagline: "Taste That Brings Everyone Together.",
  currency: "₹",
  currencyCode: "INR",
  phone: "+91 98765 43210",
  phoneFormatted: "+91 98765 43210",
  phoneClean: "+919876543210",
  email: "contact@ajitrestaurant.com",
  address: "Plot 12, Cyber Hub Boulevard, DLF Phase 2, Gurugram, Delhi NCR 122002",
  hoursWeekday: "11:30 AM – 11:00 PM",
  hoursWeekend: "11:30 AM – 11:30 PM",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.248386348981!2d77.08643807532938!3d28.490847975742407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19389270e5b7%3A0xb6975a6c382f6e92!2sDLF%20Cyber%20Hub!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  directionsUrl: "https://maps.google.com/?q=DLF+Cyber+Hub+Gurugram",
  
  // Tax & Delivery Configurations
  gstRate: 0.05, // 5% GST
  deliveryFee: 40, // ₹40
  freeDeliveryThreshold: 499, // Free delivery above ₹499
  demoModeBadge: "🟡 TEST / DEMO PAYMENT MODE",
  isTestMode: true
};

const AJIT_MENU = [
  // 1. STARTERS & TANDOOR
  {
    id: "dish-1",
    name: "Paneer Tikka",
    category: "starters",
    type: "veg",
    price: 249,
    description: "Cottage cheese cubes marinated in saffron spiced yogurt, carom seeds, and mustard oil, flame-roasted in clay tandoor.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Medium"
  },
  {
    id: "dish-2",
    name: "Chicken Tikka",
    category: "starters",
    type: "nonveg",
    price: 299,
    description: "Boneless chicken chunks marinated in Kashmiri red chili paste, hung curd, and roasted garam masala.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: false,
    spiceLevel: "Hot"
  },
  {
    id: "dish-3",
    name: "Hara Bhara Kebab",
    category: "starters",
    type: "veg",
    price: 199,
    description: "Crispy pan-fried spinach and green pea patties stuffed with roasted cashews and aromatic herbs.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Mild"
  },
  {
    id: "dish-4",
    name: "Crispy Corn Chatpata",
    category: "starters",
    type: "veg",
    price: 179,
    description: "Golden sweet corn kernels tossed with crunchy bell peppers, freshly squeezed lemon juice, and chaat masala.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Medium"
  },
  {
    id: "dish-5",
    name: "Tandoori Malai Chaap",
    category: "starters",
    type: "veg",
    price: 219,
    description: "Soya chaap marinated in rich cashew paste, cardamom cream, and black pepper, grilled till golden.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Mild"
  },
  {
    id: "dish-6",
    name: "Amritsari Fish Fry",
    category: "starters",
    type: "nonveg",
    price: 319,
    description: "Crispy carom-spiced gram flour battered fish fillets served with spicy mint-coriander chutney.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Medium"
  },

  // 2. MAIN COURSE (VEGETARIAN)
  {
    id: "dish-7",
    name: "Paneer Butter Masala",
    category: "veg",
    type: "veg",
    price: 279,
    description: "Tender paneer cubes simmered in a silky tomato, cashew nut, and butter gravy with kasuri methi.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Mild"
  },
  {
    id: "dish-8",
    name: "Ajit Special Dal Makhani",
    category: "veg",
    type: "veg",
    price: 229,
    description: "Black lentils and kidney beans slow-cooked overnight for 24 hours on clay tandoor embers with pure butter and cream.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Mild"
  },
  {
    id: "dish-9",
    name: "Kadhai Paneer",
    category: "veg",
    type: "veg",
    price: 269,
    description: "Cottage cheese cooked with freshly pounded coriander seeds, red chilies, and crunchy capsicum in a spicy gravy.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Hot"
  },
  {
    id: "dish-10",
    name: "Palak Paneer",
    category: "veg",
    type: "veg",
    price: 259,
    description: "Fresh farm spinach puree tempered with garlic, ginger, green chilies, and soft paneer cubes.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Medium"
  },

  // 3. MAIN COURSE (NON-VEGETARIAN)
  {
    id: "dish-11",
    name: "Ajit Signature Butter Chicken",
    category: "nonveg",
    type: "nonveg",
    price: 349,
    description: "Tandoori chicken pieces cooked in our legendary velvet tomato makhani gravy with pure butter and cream.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Mild"
  },
  {
    id: "dish-12",
    name: "Kadhai Chicken",
    category: "nonveg",
    type: "nonveg",
    price: 329,
    description: "Tender chicken pieces tossed with freshly roasted kadhai spices, onions, and bell peppers in a rich onion-tomato masala.",
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: false,
    spiceLevel: "Hot"
  },
  {
    id: "dish-13",
    name: "Mutton Rogan Josh",
    category: "nonveg",
    type: "nonveg",
    price: 399,
    description: "Slow-braised tender goat meat cooked with Kashmiri red chilies, ratan jot, saffron, and fennel seed extract.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Hot"
  },

  // 4. RICE & BIRYANI
  {
    id: "dish-14",
    name: "Veg Dum Biryani",
    category: "biryani",
    type: "veg",
    price: 249,
    description: "Layered aromatic Basmati rice with fresh vegetables, mint, caramelized onions, and saffron. Served with raita.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Medium"
  },
  {
    id: "dish-15",
    name: "Chicken Dum Biryani",
    category: "biryani",
    type: "nonveg",
    price: 299,
    description: "Fragrant long-grain Basmati rice and spiced marinated chicken slow-cooked in clay handi on dum with saffron.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Medium"
  },
  {
    id: "dish-16",
    name: "Jeera Rice",
    category: "biryani",
    type: "veg",
    price: 149,
    description: "Steamed long-grain Basmati rice tempered with roasted cumin seeds and desi ghee.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Mild"
  },

  // 5. BREADS (TANDOOR)
  {
    id: "dish-17",
    name: "Butter Naan",
    category: "breads",
    type: "veg",
    price: 59,
    description: "Traditional soft leavened white flour bread baked in tandoor and brushed generously with butter.",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: false,
    spiceLevel: "Mild"
  },
  {
    id: "dish-18",
    name: "Garlic Naan",
    category: "breads",
    type: "veg",
    price: 79,
    description: "Tandoor baked naan topped with crushed fresh garlic, coriander, and melted butter.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Mild"
  },
  {
    id: "dish-19",
    name: "Tandoori Roti",
    category: "breads",
    type: "veg",
    price: 39,
    description: "Whole wheat bread baked to perfection in our charcoal clay oven.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Mild"
  },
  {
    id: "dish-20",
    name: "Laccha Paratha",
    category: "breads",
    type: "veg",
    price: 69,
    description: "Multi-layered flaky whole wheat bread baked crisp with pure desi ghee.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Mild"
  },

  // 6. DESSERTS
  {
    id: "dish-21",
    name: "Gulab Jamun (2 Pcs)",
    category: "desserts",
    type: "veg",
    price: 99,
    description: "Hot, melt-in-mouth milk solid dumplings dipped in rose and cardamom sugar syrup with pistachio garnishing.",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Sweet"
  },
  {
    id: "dish-22",
    name: "Rasmalai (2 Pcs)",
    category: "desserts",
    type: "veg",
    price: 129,
    description: "Soft cottage cheese patties soaked in chilled, saffron-infused creamy milk topped with slivered almonds.",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: false,
    spiceLevel: "Sweet"
  },
  {
    id: "dish-23",
    name: "Kesar Pista Kulfi",
    category: "desserts",
    type: "veg",
    price: 119,
    description: "Traditional slow-reduced dense Indian ice cream loaded with Kashmiri saffron and Iranian pistachios.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: true,
    spiceLevel: "Sweet"
  },

  // 7. BEVERAGES
  {
    id: "dish-24",
    name: "Masala Chai",
    category: "beverages",
    type: "veg",
    price: 59,
    description: "Freshly brewed Assam tea leaves with crushed ginger, green cardamom, cinnamon, and whole milk.",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: false,
    spiceLevel: "Spiced"
  },
  {
    id: "dish-25",
    name: "Mango Lassi",
    category: "beverages",
    type: "veg",
    price: 119,
    description: "Thick churned creamy yogurt blended with sweet Alphonso mango pulp and cardamom.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    isPopular: true,
    isSignature: true,
    spiceLevel: "Sweet"
  },
  {
    id: "dish-26",
    name: "Cold Coffee with Ice Cream",
    category: "beverages",
    type: "veg",
    price: 129,
    description: "Rich chilled espresso blended with milk and topped with a scoop of vanilla ice cream and chocolate drizzle.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Sweet"
  },
  {
    id: "dish-27",
    name: "Fresh Lime Soda (Sweet & Salt)",
    category: "beverages",
    type: "veg",
    price: 89,
    description: "Sparkling soda with freshly squeezed lime juice, black salt, and roasted cumin.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    isPopular: false,
    isSignature: false,
    spiceLevel: "Tangy"
  }
];

const AJIT_REVIEWS = [
  {
    name: "Rohit Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Family Dinner",
    quote: "Ajit Restaurant delivers authentic, soulful taste that truly brings the entire family together! The Butter Chicken and Dal Makhani are absolute perfection."
  },
  {
    name: "Priya Malhotra",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Weekend Gathering",
    quote: "The royal hospitality, piping hot Garlic Naan straight from the tandoor, and the Paneer Butter Masala made our evening special. 10/10 dining experience!"
  },
  {
    name: "Rajesh Singhania",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Biryani Lover",
    quote: "Best Chicken Dum Biryani in town. The aroma when opening the handi seal, the tender pieces, and saffron flavor are unmatched."
  },
  {
    name: "Ananya Deshmukh",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    tag: "Anniversary Celebration",
    quote: "From the warm welcome to the hot Gulab Jamuns, Ajit Restaurant treated us like royalty. We are lifelong patrons now!"
  }
];

window.AJIT_CONFIG = AJIT_CONFIG;
window.AJIT_MENU = AJIT_MENU;
window.AJIT_REVIEWS = AJIT_REVIEWS;
