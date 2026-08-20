/**
 * L'AURA RESTAURANT — CULINARY MENU DATABASE
 * Curated gourmet dishes, botanical starters, prime mains, seafood, desserts & mixology.
 */

const MENU_ITEMS = [
  // 1. Starters & Small Plates
  {
    id: 'm1',
    name: 'Truffled Burrata & Heirloom Peach',
    category: 'starters',
    price: 24,
    description: 'Creamy artisanal burrata, grilled Okanagan peaches, 25-year aged balsamic caviar, micro-basil, toasted pine nuts.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    badge: "Chef's Special",
    dietary: ['vegetarian', 'glutenFree'],
    allergens: 'Dairy, Pine Nuts',
    winePairing: '2022 Domaine Leflaive Puligny-Montrachet',
    calories: '420 kcal',
    isSignature: true
  },
  {
    id: 'm2',
    name: 'Hamachi Crudo with Yuzu Ponzu',
    category: 'starters',
    price: 28,
    description: 'Thinly sliced Pacific yellowtail, compressed watermelon radish, serrano chili, white truffle oil, citrus sea salt.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    badge: 'Raw Bar',
    dietary: ['glutenFree'],
    allergens: 'Fish, Soy',
    winePairing: '2021 Sancerre Domaine Vacheron',
    calories: '280 kcal',
    isSignature: false
  },
  {
    id: 'm3',
    name: 'Crispy Roasted Bone Marrow',
    category: 'starters',
    price: 26,
    description: 'Herb-crusted beef bone marrow, smoked shallot marmalade, caperberry salsa verde, grilled sourdough brioche.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature',
    dietary: [],
    allergens: 'Gluten',
    winePairing: '2019 Barolo Pio Cesare',
    calories: '560 kcal',
    isSignature: true
  },
  {
    id: 'm4',
    name: 'Charred Spanish Octopus',
    category: 'starters',
    price: 29,
    description: 'Braised and plancha-seared octopus tentacle, saffron potato mousseline, chorizo oil, pickled pearl onions.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    dietary: ['glutenFree'],
    allergens: 'Mollusk',
    winePairing: '2020 Albariño de Fefiñanes',
    calories: '390 kcal',
    isSignature: false
  },

  // 2. Chef's Mains & Botanicals
  {
    id: 'm5',
    name: 'Pan-Seared Chilean Sea Bass',
    category: 'mains',
    price: 52,
    description: 'Glazed with white miso and ginger mirin, lemongrass dashi broth, baby bok choy, lotus root crisps.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    badge: "Chef's Special",
    dietary: ['glutenFree'],
    allergens: 'Fish, Soy',
    winePairing: '2020 Meursault Louis Jadot',
    calories: '610 kcal',
    isSignature: true
  },
  {
    id: 'm6',
    name: 'Wild Morel & Burrata Agnolotti',
    category: 'mains',
    price: 38,
    description: 'Hand-folded egg pasta filled with roasted ricotta and thyme, foraged French morels, brown butter hazelnut emulsion.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=800&q=80',
    badge: 'Handmade Pasta',
    dietary: ['vegetarian'],
    allergens: 'Gluten, Dairy, Hazelnuts',
    winePairing: '2018 Brunello di Montalcino',
    calories: '540 kcal',
    isSignature: true
  },
  {
    id: 'm7',
    name: 'Crispy Skin Duck Magret',
    category: 'mains',
    price: 46,
    description: 'Spiced maple honey glaze, parsnip velvet puree, sour cherry reduction, charred broccolini with toasted almonds.',
    image: 'https://images.unsplash.com/photo-1514944298352-780c354fa8df?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature',
    dietary: ['glutenFree'],
    allergens: 'Tree Nuts',
    winePairing: '2017 Pinot Noir Russian River Valley',
    calories: '690 kcal',
    isSignature: false
  },
  {
    id: 'm8',
    name: 'Roasted Romanesco & Cauliflower Steak',
    category: 'mains',
    price: 32,
    description: 'Turmeric tahini sauce, pomegranate jewel reduction, toasted pistachios, mint oil, ancient grain wild pilaf.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    badge: 'Organic Harvest',
    dietary: ['vegan', 'glutenFree'],
    allergens: 'Sesame, Pistachios',
    winePairing: '2022 Chenin Blanc Loire Valley',
    calories: '380 kcal',
    isSignature: false
  },

  // 3. Prime Cuts & Steaks
  {
    id: 'm9',
    name: 'A5 Miyazaki Wagyu Striploin',
    category: 'steaks',
    price: 98,
    description: '4oz Japanese A5 Wagyu, smoked bone marrow butter, shaved black Perigord truffles, roasted garlic jus.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    badge: 'World Class',
    dietary: ['glutenFree'],
    allergens: 'Dairy',
    winePairing: '2016 Château Margaux Premier Grand Cru',
    calories: '780 kcal',
    isSignature: true
  },
  {
    id: 'm10',
    name: '45-Day Dry Aged Prime Ribeye',
    category: 'steaks',
    price: 68,
    description: '14oz custom cut, rosemary sea salt rub, wild chanterelle mushrooms, caramelized shallots, house peppercorn glaze.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    badge: 'Prime Dry Aged',
    dietary: ['glutenFree'],
    allergens: 'None',
    winePairing: '2018 Cabernet Sauvignon Napa Valley',
    calories: '920 kcal',
    isSignature: false
  },

  // 4. Artisanal Desserts
  {
    id: 'm11',
    name: 'Smoked Valrhona Chocolate Sphere',
    category: 'desserts',
    price: 20,
    description: 'Dark 70% Guanaja chocolate dome, warm salted caramel pour-over, gold leaf flake, Madagascar bourbon vanilla gelato.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    badge: "Pastry Chef's Masterpiece",
    dietary: ['vegetarian'],
    allergens: 'Dairy, Soy',
    winePairing: 'Tawny Port 20 Year Taylor Fladgate',
    calories: '490 kcal',
    isSignature: true
  },
  {
    id: 'm12',
    name: 'Botanical Meyer Lemon Tart',
    category: 'desserts',
    price: 18,
    description: 'Almond sable crust, infused lavender honey meringue, candied thyme, raspberry coulis teardrops.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    badge: 'House Favorite',
    dietary: ['vegetarian'],
    allergens: 'Gluten, Dairy, Almonds',
    winePairing: '2017 Château d\'Yquem Sauternes',
    calories: '360 kcal',
    isSignature: false
  },

  // 5. Mixology & Cocktails
  {
    id: 'm13',
    name: 'The Golden Aura Elixir',
    category: 'drinks',
    price: 22,
    description: 'Empress 1908 Gin, elderflower liqueur, clarified yuzu, champagne float, 24k edible gold dust.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    badge: 'Signature Cocktail',
    dietary: ['vegan', 'glutenFree'],
    allergens: 'None',
    winePairing: 'N/A',
    calories: '180 kcal',
    isSignature: true
  },
  {
    id: 'm14',
    name: 'Smoked Rosemary Old Fashioned',
    category: 'drinks',
    price: 24,
    description: 'Small-batch Bourbon, Demerara nectar, Angostura & blood orange bitters, torched rosemary branch in glass cloche.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    badge: 'Bar Craft',
    dietary: ['vegan', 'glutenFree'],
    allergens: 'None',
    winePairing: 'N/A',
    calories: '210 kcal',
    isSignature: false
  }
];

window.MENU_ITEMS = MENU_ITEMS;
