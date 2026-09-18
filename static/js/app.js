// Grovio - 10 Min Groceries & Chef Recipe Kits App
let allProducts = [];
let allRecipes = [];
let cart = {}; // { [productId]: { product, quantity, recipeTag } }
let currentView = 'home';
let selectedDepartment = 'all';
let selectedSubcategory = 'all';
let selectedRecipeCat = 'All';
let selectedRecipeCuisine = 'All';
let selectedRecipeDiet = 'all';

const CUISINE_DEFINITIONS = [
  {
    id: 'All',
    name: 'All Cuisines',
    icon: '🌟',
    desc: 'Explore chef-curated recipe kits across North India, Mughlai dastarkhwan, street food, Italian pastas & cafe fast foods.'
  },
  {
    id: 'Fast Food & Burgers',
    name: 'Fast Food & Burgers',
    icon: '🍔',
    desc: 'Crispy aloo herb burger, street chicken zinger burger & fiery loaded peri peri french fries.'
  },
  {
    id: 'Sandwiches & Toasts',
    name: 'Sandwiches & Toasts',
    icon: '🥪',
    desc: 'Mumbai Chowpatty masala grilled sandwich, tandoori paneer tikka sandwich & deli smoked chicken club.'
  },
  {
    id: 'Italian & Pasta',
    name: 'Italian & Pasta',
    icon: '🍝',
    desc: 'Creamy Alfredo white sauce penne, fiery Arrabiata fusilli & artisan cheesy thin-crust pan pizza.'
  },
  {
    id: 'Rolls & Wraps',
    name: 'Rolls & Wraps',
    icon: '🌯',
    desc: 'Kolkata Park Street flaky paneer kathi roll & double egg chicken bhuna street wraps.'
  },
  {
    id: 'Punjabi & Dhaba',
    name: 'Punjabi & Dhaba',
    icon: '🥘',
    desc: 'Iconic highway dhaba curries, dal makhani, pindi chole, sarson saag & butter chicken with pure desi ghee and butter.'
  },
  {
    id: 'Mughlai & Biryani',
    name: 'Mughlai & Biryani',
    icon: '👑',
    desc: 'Royal Shahi gravies, Awadhi slow-simmered dum biryani with fragrant basmati & whole saffron spices.'
  },
  {
    id: 'North Indian Street Food',
    name: 'Street Food',
    icon: '🌶️',
    desc: 'Chowpatty Mumbai butter pav bhaji & Delhi Purani Dilli matar chole kulche cooked fresh in minutes.'
  },
  {
    id: 'Indo-Chinese',
    name: 'Indo-Chinese',
    icon: '🥟',
    desc: 'Desi Chinese wok favorites: sizzling chilli paneer and tossing hakka noodles packed with spicy soy & schezwan.'
  },
  {
    id: 'South Indian Classics',
    name: 'South Indian',
    icon: '🥞',
    desc: 'Paper-crisp golden masala dosa with aromatic drumstick sambar & stone-ground naturally fermented batter.'
  },
  {
    id: 'Quick 15-Mins',
    name: 'Quick 15-Mins',
    icon: '⏱️',
    desc: 'Super fast, delicious meals: Mohali street egg bhurji, 10-min peri-peri fries & Bombay grilled sandwich.'
  },
  {
    id: 'Desi Mithai & Desserts',
    name: 'Desi Mithai',
    icon: '🍨',
    desc: 'North India celebration winter Gajar Ka Halwa slow-roasted in pure desi ghee, fresh khoya & crunchy nuts.'
  }
];

let activeCuisineDietFilter = 'all'; // 'all', 'veg', 'nonveg'
let isTricityFilterActive = false;
let searchQuery = '';

// Active Location & GPS State
let currentLocation = 'Flat 402, Royal Palms, Phase 3B2, Mohali';
let currentDeliveryTime = '8-10 MINS';
let currentDarkStore = 'Mohali Phase 7 Dark Store #104';
let currentCoords = { lat: 30.7046, lng: 76.7179 }; // Mohali Phase 3B2 default
let detectedAreaName = 'Phase 3B2, SAS Nagar, Mohali';
let selectedAddressTag = 'Home';
let leafletMap = null;

// Active Recipe Modal State
let activeRecipe = null;
let activeRecipeServings = 2;
let ingredientSelection = {};

// Order Tracking State
let trackingTimer = null;
let secondsRemaining = 540; // 9 mins

// -------------------------------------------------------------
// Blinkit Food & Drink Departments Architecture (12 Categories - 3 Rows of 4)
// -------------------------------------------------------------
const BLINKIT_STORE_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: '🌟' },
  { id: 'Vegetables & Fruits', name: 'Veggies & Fruits', icon: '🥦' },
  { id: 'Dairy, Bread & Eggs', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'Cold Drinks & Juices', name: 'Cold Drinks', icon: '🥤' },
  { id: 'Snacks & Munchies', name: 'Munchies', icon: '🍿' },
  { id: 'Atta, Rice & Dals', name: 'Atta & Dals', icon: '🌾' },
  { id: 'Oils, Ghee & Masalas', name: 'Oils & Spices', icon: '🫒' },
  { id: 'Instant & Frozen Food', name: 'Instant Food', icon: '🍜' },
  { id: 'Bakery, Sweets & Chocolates', name: 'Sweets & Choco', icon: '🍫' },
  { id: 'Tea, Coffee & Drinks', name: 'Tea & Coffee', icon: '☕' },
  { id: 'Meat, Poultry & Seafood', name: 'Fresh Meat', icon: '🍗' },
  { id: 'sub:Bread & Pav', name: 'Bakery & Bread', icon: '🍞' }
];

const STORE_DEPARTMENTS = BLINKIT_STORE_CATEGORIES;

const departmentSubcategories = {
  'all': [
    { id: 'all', label: '✨ All Items' },
    { id: 'Vegetables & Fruits', label: '🥦 Fresh Produce' },
    { id: 'Dairy, Bread & Eggs', label: '🥛 Dairy & Eggs' },
    { id: 'Cold Drinks & Juices', label: '🥤 Cold Drinks' },
    { id: 'Snacks & Munchies', label: '🍿 Munchies' },
    { id: 'Atta, Rice & Dals', label: '🌾 Atta & Dals' },
    { id: 'Oils, Ghee & Masalas', label: '🫒 Oils & Spices' },
    { id: 'Instant & Frozen Food', label: '🍜 Instant Food' },
    { id: 'Bakery, Sweets & Chocolates', label: '🍫 Chocolates & Mithai' }
  ],
  'Vegetables & Fruits': [
    { id: 'all', label: '✨ All Produce' },
    { id: 'Fresh Vegetables', label: '🥔 Fresh Vegetables' },
    { id: 'Fresh Fruits', label: '🍎 Fresh Fruits' },
    { id: 'Herbs & Lemon', label: '🍋 Herbs & Lemon' }
  ],
  'Dairy, Bread & Eggs': [
    { id: 'all', label: '✨ All Dairy & Eggs' },
    { id: 'Milk', label: '🥛 Fresh & Tetra Milk' },
    { id: 'Butter & Ghee', label: '🧈 Butter & Ghee' },
    { id: 'Paneer & Curd', label: '🧀 Paneer & Curd' },
    { id: 'Cheese', label: '🍕 Slices & Cubes' },
    { id: 'Bread & Pav', label: '🍞 Breads & Pav' },
    { id: 'Eggs', label: '🥚 Farm Eggs' }
  ],
  'Cold Drinks & Juices': [
    { id: 'all', label: '✨ All Drinks' },
    { id: 'Soft Drinks', label: '🥤 Cola & Sparkling' },
    { id: 'Fruit Juices', label: '🧃 Real & Tropicana' },
    { id: 'Energy Drinks', label: '⚡ Red Bull & Monster' },
    { id: 'Soda & Mixers', label: '💧 Soda & Water' },
    { id: 'Cold Coffee & Milk Drinks', label: '☕ Cold Coffee & Shakes' }
  ],
  'Snacks & Munchies': [
    { id: 'all', label: '✨ All Munchies' },
    { id: 'Chips & Crisps', label: '🥔 Lay\'s & Pringles' },
    { id: 'Namkeen & Bhujia', label: '🥨 Haldiram\'s Bhujia' },
    { id: 'Biscuits & Cookies', label: '🍪 Cookies & Parle-G' },
    { id: 'Dry Fruits & Nuts', label: '🥜 Almonds & Cashews' }
  ],
  'Atta, Rice & Dals': [
    { id: 'all', label: '✨ All Staples' },
    { id: 'Atta & Flours', label: '🌾 Chakki Atta & Besan' },
    { id: 'Basmati Rice & Grains', label: '🍚 Basmati Rice' },
    { id: 'Dals & Pulses', label: '🥣 Toor, Moong & Rajma' },
    { id: 'Salt, Sugar & Seasonings', label: '🧂 Sugar & Salt' }
  ],
  'Oils, Ghee & Masalas': [
    { id: 'all', label: '✨ All Oils & Spices' },
    { id: 'Cooking Oils', label: '🌻 Mustard & Sunflower' },
    { id: 'Pure Desi Ghee', label: '🧈 Verka Desi Ghee' },
    { id: 'Whole & Ground Spices', label: '🌶️ MDH & Everest Spices' },
    { id: 'Salt, Sugar & Seasonings', label: '🧂 Table Salt & Seasonings' }
  ],
  'Instant & Frozen Food': [
    { id: 'all', label: '✨ All Instant Food' },
    { id: 'Noodles & Pasta', label: '🍜 Maggi & Pasta' },
    { id: 'Frozen Snacks', label: '🍟 McCain Fries & Smiles' },
    { id: 'Sauces & Spreads', label: '🍅 Ketchup & Nutella' }
  ],
  'Bakery, Sweets & Chocolates': [
    { id: 'all', label: '✨ All Sweets' },
    { id: 'Chocolates', label: '🍫 Silk & KitKat' },
    { id: 'Indian Mithai', label: '🍯 Gulab Jamun & Rasgulla' }
  ],
  'Tea, Coffee & Drinks': [
    { id: 'all', label: '✨ All Hot Beverages' },
    { id: 'Tea', label: '🫖 Tata Tea & Green Tea' },
    { id: 'Coffee', label: '☕ Nescafe & Bru' },
    { id: 'Health Drinks', label: '🍫 Bournvita' }
  ],
  'Meat, Poultry & Seafood': [
    { id: 'all', label: '✨ All Fresh Meat' },
    { id: 'Fresh Chicken', label: '🍗 Curry Cut & Boneless' },
    { id: 'Cold Cuts & Sausages', label: '🥓 Sausages & Salami' }
  ]
};

// -------------------------------------------------------------
// Initialization
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initIosClock();
  loadData();
  setupSearchPlaceholderRotation();
  renderStoreDepartments();
  renderSubcategoryPills();
});

async function loadData() {
  try {
    let prodRes = null;
    let recRes = null;
    
    try {
      prodRes = await fetch('/api/products');
      if (!prodRes.ok) throw new Error('API route unavailable');
    } catch {
      prodRes = await fetch('./data/products.json');
    }

    try {
      recRes = await fetch('/api/recipes');
      if (!recRes.ok) throw new Error('API route unavailable');
    } catch {
      recRes = await fetch('./data/recipes.json');
    }

    allProducts = await prodRes.json();
    allRecipes = await recRes.json();

    renderHomeExperience();
    renderDepartmentShelves();
    renderStoreDepartments();
    renderCuisinesMenu();
    renderRecipes();
    renderProducts();
    renderOrderAgainView();
    updateCartUI();
  } catch (err) {
    console.error('Failed to load initial data:', err);
    showToast('⚠️ Could not connect to catalog server');
  }
}

// -------------------------------------------------------------
// Leaflet GPS Location Engine
// -------------------------------------------------------------
function openLocationModal() {
  document.getElementById('locationModalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  initLeafletMap();
}

function closeLocationModal() {
  document.getElementById('locationModalBackdrop').classList.remove('open');
  document.body.style.overflow = 'auto';
}

function initLeafletMap() {
  const mapBox = document.getElementById('leafletMapBox');
  if (!mapBox || typeof L === 'undefined') return;

  if (leafletMap) {
    setTimeout(() => {
      leafletMap.invalidateSize();
      leafletMap.setView([currentCoords.lat, currentCoords.lng], 15);
    }, 250);
    return;
  }

  leafletMap = L.map('leafletMapBox', {
    center: [currentCoords.lat, currentCoords.lng],
    zoom: 15,
    zoomControl: false
  });

  L.control.zoom({ position: 'bottomright' }).addTo(leafletMap);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    maxZoom: 19
  }).addTo(leafletMap);

  leafletMap.on('moveend', () => {
    const center = leafletMap.getCenter();
    currentCoords = { lat: center.lat, lng: center.lng };
    reverseGeocode(center.lat, center.lng);
  });

  setTimeout(() => leafletMap.invalidateSize(), 300);
}

async function reverseGeocode(lat, lng) {
  const coordsEl = document.getElementById('displayCoordinates');
  const addrEl = document.getElementById('displayDetectedAddress');
  if (coordsEl) {
    coordsEl.innerText = `GPS: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E • Finding nearest hub...`;
  }

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    const data = await res.json();
    if (data && data.address) {
      const addr = data.address;
      const road = addr.road || addr.residential || addr.neighbourhood || addr.suburb || 'Tricity Sector';
      const city = addr.city || addr.town || addr.county || 'Mohali';
      const state = addr.state || 'Punjab';
      detectedAreaName = `${road}, ${city}, ${state}`;
      if (addrEl) addrEl.innerText = data.display_name.split(',').slice(0, 3).join(', ');
    }
  } catch (e) {
    if (addrEl) addrEl.innerText = detectedAreaName;
  }

  assignDarkStoreFromCoords(lat, lng);
}

function assignDarkStoreFromCoords(lat, lng) {
  const coordsEl = document.getElementById('displayCoordinates');
  if (lng > 76.80) {
    currentDarkStore = 'Panchkula Sector 9 Dark Store #102';
    currentDeliveryTime = '9-11 Mins';
  } else if (lat > 30.72) {
    currentDarkStore = 'Sector 26 Mandi Express Hub #101';
    currentDeliveryTime = '8-10 Mins';
  } else if (lng < 76.68) {
    currentDarkStore = 'Sunny Enclave Express Pod #103';
    currentDeliveryTime = '10-12 Mins';
  } else {
    currentDarkStore = 'Mohali Phase 7 Dark Store #104';
    currentDeliveryTime = '8-10 Mins';
  }

  if (coordsEl) {
    coordsEl.innerText = `GPS: ${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E • ${currentDarkStore} (${currentDeliveryTime})`;
  }
}

function detectExactUserLocation() {
  const spinner = document.getElementById('gpsLoader');
  const status = document.getElementById('gpsStatusText');
  if (spinner) spinner.style.display = 'inline-block';
  if (status) status.innerText = 'Acquiring satellite GPS coordinates...';

  if (!navigator.geolocation) {
    showToast('⚠️ Geolocation not supported by browser');
    if (spinner) spinner.style.display = 'none';
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;
      currentCoords = { lat, lng };
      if (leafletMap) {
        leafletMap.flyTo([lat, lng], 16, { duration: 1.5 });
      }
      reverseGeocode(lat, lng);
      if (spinner) spinner.style.display = 'none';
      if (status) status.innerText = '✓ Exact doorstep GPS pinpointed!';
      showToast('🎯 Exact GPS location acquired!');
    },
    (err) => {
      console.warn('GPS location error:', err);
      if (spinner) spinner.style.display = 'none';
      if (status) status.innerText = '📍 Defaulted to central Mohali Hub';
      jumpToTricityCoordinates('Phase 3B2, Mohali', 30.7046, 76.7179, 'Mohali Phase 7 Dark Store #104', '8-10 Mins');
      showToast('📍 Centered on nearest Tricity Dark Store');
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

function jumpToTricityCoordinates(hubName, lat, lng, storeName, timeEst, btnEl) {
  currentCoords = { lat, lng };
  currentDarkStore = storeName;
  currentDeliveryTime = timeEst;
  detectedAreaName = hubName;

  document.querySelectorAll('.quick-hub-pill').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const addrEl = document.getElementById('displayDetectedAddress');
  if (addrEl) addrEl.innerText = hubName;

  if (leafletMap) {
    leafletMap.flyTo([lat, lng], 15, { duration: 1.2 });
  }
  assignDarkStoreFromCoords(lat, lng);
}

function selectAddressTag(tagName, btnEl) {
  selectedAddressTag = tagName;
  document.querySelectorAll('.addr-tag-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

function confirmSelectedAddress() {
  const flatHouse = document.getElementById('inputFlatHouse')?.value?.trim() || '';
  const landmark = document.getElementById('inputLandmark')?.value?.trim() || '';
  const detected = document.getElementById('displayDetectedAddress')?.innerText || detectedAreaName;

  let fullAddress = '';
  if (flatHouse) fullAddress += `${flatHouse}, `;
  fullAddress += detected;
  if (landmark) fullAddress += ` (Near ${landmark})`;

  currentLocation = fullAddress;

  document.getElementById('currentLocationText').innerText = `${fullAddress.length > 28 ? fullAddress.substring(0, 28) + '...' : fullAddress} ▾`;
  document.getElementById('currentDeliveryEstimate').innerText = currentDeliveryTime;
  document.getElementById('sectionDeliveryBadge').innerText = `⚡ ${currentDeliveryTime}`;

  if (document.getElementById('cartDeliveryHubTitle')) {
    document.getElementById('cartDeliveryHubTitle').innerText = `Delivery in ${currentDeliveryTime}`;
    document.getElementById('cartDeliveryHubSubtitle').innerText = `Growlio dark store: ${currentDarkStore}`;
  }

  closeLocationModal();
  showToast(`📍 Delivery set to: ${fullAddress}! (${currentDeliveryTime})`);
}

// -------------------------------------------------------------
// -------------------------------------------------------------
// View Switching & Master Departments Engine
// -------------------------------------------------------------
// -------------------------------------------------------------
// Grovio View Switching & Navigation Engine
// -------------------------------------------------------------
function switchView(viewName) {
  currentView = viewName;
  const homeTab = document.getElementById('tabBtnHome');
  const grocTab = document.getElementById('tabBtnGroceries');
  const recTab = document.getElementById('tabBtnRecipes');

  const homeView = document.getElementById('homeExperienceView');
  const grocSec = document.getElementById('groceriesSection');
  const recSec = document.getElementById('recipesSection');
  const orderAgainSec = document.getElementById('orderAgainSection');

  // Bottom nav items
  const bnavHome = document.getElementById('bnavHome');
  const bnavRecipes = document.getElementById('bnavRecipes');
  const bnavStore = document.getElementById('bnavStore');
  const bnavOrderAgain = document.getElementById('bnavOrderAgain');

  // Clear bottom nav and top tab active states
  [bnavHome, bnavRecipes, bnavStore, bnavOrderAgain].forEach(el => {
    if (el) el.classList.remove('active');
  });
  [homeTab, grocTab, recTab].forEach(el => {
    if (el) el.classList.remove('active');
  });

  // Hide all sections first
  if (homeView) homeView.style.display = 'none';
  if (grocSec) grocSec.style.display = 'none';
  if (recSec) recSec.style.display = 'none';
  if (orderAgainSec) orderAgainSec.style.display = 'none';

  if (viewName === 'home') {
    if (homeTab) homeTab.classList.add('active');
    if (bnavHome) bnavHome.classList.add('active');
    if (homeView) homeView.style.display = 'block';

    renderHomeExperience();
    renderDepartmentShelves();
  } else if (viewName === 'recipes') {
    if (recTab) recTab.classList.add('active');
    if (bnavRecipes) bnavRecipes.classList.add('active');
    if (recSec) recSec.style.display = 'block';

    renderCuisinesMenu();
    renderRecipes();
  } else if (viewName === 'groceries' || viewName === 'store') {
    if (grocTab) grocTab.classList.add('active');
    if (bnavStore) bnavStore.classList.add('active');
    if (grocSec) grocSec.style.display = 'block';

    renderStoreCategoriesGrid();
    renderProducts();
  } else if (viewName === 'order-again') {
    if (bnavOrderAgain) bnavOrderAgain.classList.add('active');
    if (orderAgainSec) orderAgainSec.style.display = 'block';

    renderOrderAgainView();
  }

  const viewport = document.getElementById('iphoneViewport');
  if (viewport) viewport.scrollTo({ top: 0, behavior: 'smooth' });
}

// -------------------------------------------------------------
// GROVIO HOME EXPERIENCE ENGINE (RECIPES SPOTLIGHT & AISLES)
// -------------------------------------------------------------
function setHomeCuisineDietFilter(diet, btnEl) {
  activeCuisineDietFilter = diet;
  document.querySelectorAll('#cuisinesDietToggleBar .cuisine-diet-pill').forEach(b => {
    b.classList.remove('active', 'veg', 'nonveg');
  });

  if (btnEl) {
    btnEl.classList.add('active');
    if (diet === 'veg') btnEl.classList.add('veg');
    if (diet === 'nonveg') btnEl.classList.add('nonveg');
  }

  renderHomeExperience();
}

function renderHomeExperience() {
  // 1. Regional Cuisines Bar (#homeCuisineDiscoveryRow)
  const cuisineRow = document.getElementById('homeCuisineDiscoveryRow');
  if (cuisineRow) {
    const validCuisines = CUISINE_DEFINITIONS.filter(c => c.id !== 'All').map(c => {
      let matching = allRecipes.filter(r => (r.cuisine === c.id || r.category === c.id));
      if (activeCuisineDietFilter === 'veg') {
        matching = matching.filter(r => r.diet === 'Vegetarian');
      } else if (activeCuisineDietFilter === 'nonveg') {
        matching = matching.filter(r => r.diet === 'Non-Vegetarian');
      }
      return { ...c, count: matching.length };
    }).filter(c => c.count > 0);

    cuisineRow.innerHTML = validCuisines.map(c => `
      <div class="home-cuisine-chip" onclick="selectRecipeCuisine('${c.id}', null); switchView('recipes');">
        <div class="home-cuisine-icon-box">${c.icon}</div>
        <div class="home-cuisine-info">
          <span class="home-cuisine-name">${c.name}</span>
          <span class="home-cuisine-count">${c.count} Kits</span>
        </div>
      </div>
    `).join('');
  }

  // 2. Trending Chef Recipe Kits Shelf (#homeTrendingRecipesShelf)
  const trendingShelf = document.getElementById('homeTrendingRecipesShelf');
  if (trendingShelf) {
    let trendingList = allRecipes;
    if (activeCuisineDietFilter === 'veg') {
      trendingList = trendingList.filter(r => r.diet === 'Vegetarian');
    } else if (activeCuisineDietFilter === 'nonveg') {
      trendingList = trendingList.filter(r => r.diet === 'Non-Vegetarian');
    }
    trendingShelf.innerHTML = trendingList.slice(0, 8).map(r => renderHomeRecipeCard(r)).join('');
  }

  // 3. 15-Minute Express Meals Shelf (#homeQuickMealsShelf)
  const quickShelf = document.getElementById('homeQuickMealsShelf');
  if (quickShelf) {
    let quickList = allRecipes.filter(r => {
      const t = parseInt(r.totalTime || r.cookTime || '30');
      return t <= 20 || r.category === 'Quick 15-Mins' || r.cuisine === 'Quick 15-Mins';
    });
    if (activeCuisineDietFilter === 'veg') {
      quickList = quickList.filter(r => r.diet === 'Vegetarian');
    } else if (activeCuisineDietFilter === 'nonveg') {
      quickList = quickList.filter(r => r.diet === 'Non-Vegetarian');
    }
    quickShelf.innerHTML = quickList.map(r => renderHomeRecipeCard(r)).join('');
  }
}


// -------------------------------------------------------------
// HELPER: IN-CART STATUS & HANDLER FOR RECIPE KITS
// -------------------------------------------------------------
function isRecipeInCart(recipe) {
  if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0) return false;
  return recipe.ingredients.some(ing => {
    const pid = ing.productId;
    return pid && cart[pid] && cart[pid].quantity > 0;
  });
}

function handleRecipeKitAdd(recipeId, btnEl) {
  addRecipeKitToCart(recipeId);
  if (btnEl) {
    btnEl.classList.add('in-cart');
    btnEl.innerHTML = '✓ IN CART';
  }
}

function renderHomeRecipeCard(r) {
  const isVeg = r.diet === 'Vegetarian';
  const dietBadge = isVeg 
    ? '<span class="diet-dot-veg">🟢</span> Veg' 
    : '<span class="diet-dot-nonveg">🔴</span> Non-Veg';

  const cuisineName = r.cuisine || r.category || 'Special';
  const kitPrice = r.kitPrice || 195;
  const ingCount = (r.ingredients || []).length;
  const ingredientNames = (r.ingredients || []).slice(0, 3).map(i => i.name.split(' ')[0]).join(', ');
  const ingredientsTeaser = ingCount > 0 
    ? `${ingredientNames}${ingCount > 3 ? ` +${ingCount - 3} more` : ''}` 
    : 'Fresh pre-measured kit';

  const inCart = isRecipeInCart(r);

  return `
    <div class="home-recipe-card" onclick="openRecipeModal('${r.id}')">
      <div class="home-recipe-img-box">
        <img src="${r.thumbnail}" alt="${r.name}" class="home-recipe-img" loading="lazy" />
        <div class="home-recipe-play">▶</div>
        <div class="home-recipe-time">⏱️ ${r.totalTime}</div>
        <div class="home-recipe-diet">${dietBadge}</div>
        <div class="home-recipe-cuisine">🥘 ${cuisineName}</div>
      </div>
      <div class="home-recipe-body">
        <div class="home-recipe-chef">👨‍🍳 ${r.chef ? r.chef.split('/')[0].trim() : 'MasterChef'}</div>
        <div class="home-recipe-title">${r.name}</div>
        <div class="home-recipe-ingredients-note">📦 <strong>Kit:</strong> ${ingredientsTeaser}</div>
        <div class="home-recipe-footer">
          <div class="home-recipe-price-box">
            <span class="home-recipe-price-label">Kit for 2:</span>
            <span class="home-recipe-price-val">₹${kitPrice}</span>
          </div>
          <button class="btn-home-add-kit ${inCart ? 'in-cart' : ''}" onclick="event.stopPropagation(); handleRecipeKitAdd('${r.id}', this)">
            ${inCart ? '✓ IN CART' : '+ Add Kit'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function openFullDepartment(deptName, subcatName = 'all') {
  selectedDepartment = deptName;
  selectedSubcategory = subcatName;
  switchView('groceries');

  const def = STORE_DEPARTMENTS.find(d => d.id === deptName);
  const titleEl = document.getElementById('sectionTitleText');
  if (titleEl) {
    titleEl.innerText = def ? `${def.icon} ${def.name}` : `🛒 ${deptName}`;
  }

  renderStoreDepartments();
  renderSubcategoryPills();
  renderProducts();

  const viewport = document.getElementById('iphoneViewport');
  if (viewport) viewport.scrollTo({ top: 0, behavior: 'smooth' });
}

function filterBySubcatDept(deptName, subcatName, tileEl) {
  openFullDepartment(deptName, subcatName);
}

function resetToAllDepartments() {
  selectedDepartment = 'all';
  selectedSubcategory = 'all';
  searchQuery = '';
  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput) searchInput.value = '';
  switchView('home');
}

// -------------------------------------------------------------
// ORDER AGAIN ENGINE (PAST ORDERS & FREQUENT STAPLES)
// -------------------------------------------------------------
function renderOrderAgainView() {
  const container = document.getElementById('frequentStaplesContainer');
  if (!container) return;

  // Curated list of daily staples frequently reordered in Tricity
  const stapleIds = [
    'prod_12',           // Verka Standard Gold Milk
    'prod_15',           // Verka Pure Desi Ghee
    'prod_13',           // Aashirvaad Shudh Chakki Atta
    'o_fortune_mustard', // Fortune Kachi Ghani Mustard Oil
    'prod_amul_butter',  // Amul Salted Butter
    'snk_maggi',         // Maggi 2-Minute Masala Noodles
    'snk_coke_zero',     // Coca-Cola Zero Sugar
    'hh_surf_excel',     // Surf Excel Matic Liquid
    'bp_dettol_soap',    // Dettol Original Bathing Soap
    'prod_v3'            // Shimla Fresh Red Tomatoes
  ];

  const stapleProds = stapleIds
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean);

  container.innerHTML = stapleProds.map(p => {
    const inCart = cart[p.id];
    const qty = inCart ? inCart.quantity : 0;

    let btnHtml = '';
    if (qty > 0) {
      btnHtml = `
        <div class="qty-counter" style="height: 26px;">
          <button class="qty-btn" style="padding: 2px 7px; font-size: 12px;" onclick="updateCartQty('${p.id}', -1)">−</button>
          <span class="qty-value" style="font-size: 11.5px; min-width: 14px;">${qty}</span>
          <button class="qty-btn" style="padding: 2px 7px; font-size: 12px;" onclick="updateCartQty('${p.id}', 1)">+</button>
        </div>
      `;
    } else {
      btnHtml = `
        <button class="shelf-btn-add" onclick="addToCart('${p.id}')">+ ADD</button>
      `;
    }

    return `
      <div class="shelf-product-card" style="width: auto; min-width: 0;">
        <div class="shelf-img-box">
          <img src="${p.image}" alt="${p.name}" class="shelf-img" loading="lazy" />
          <div class="shelf-delivery-pill">⚡ ${p.deliveryTime || '8 MINS'}</div>
        </div>
        <div class="shelf-title" title="${p.name}">${p.name}</div>
        <div class="shelf-weight">${p.weight}</div>
        <div class="shelf-price-row">
          <div class="shelf-price-block">
            <span class="shelf-price">₹${p.price}</span>
            <span class="shelf-mrp">₹${p.mrp}</span>
          </div>
          ${btnHtml}
        </div>
      </div>
    `;
  }).join('');
}

function reorderPastBasket() {
  const basketItemIds = ['prod_12', 'prod_24', 'prod_v1', 'prod_v3'];
  let addedCount = 0;

  basketItemIds.forEach(id => {
    const prod = allProducts.find(p => p.id === id);
    if (prod) {
      if (!cart[id]) {
        cart[id] = { product: prod, quantity: 1, recipeTag: 'Past Order Reorder' };
      } else {
        cart[id].quantity += 1;
      }
      addedCount++;
    }
  });

  updateCartUI();
  renderProducts();
  renderDepartmentShelves();
  renderOrderAgainView();
  showToast('🎉 Reordered 4 items from past basket (₹140)!');
  openCartDrawer();
}

function reorderRecipeKit(kitId) {
  if (kitId === 'paneer_butter_masala') {
    const kitIds = ['prod_12', 'prod_amul_butter', 'prod_v3', 'prod_v6', 'o_fortune_mustard', 'prod_amul_cream'];
    kitIds.forEach(id => {
      const prod = allProducts.find(p => p.id === id);
      if (prod) {
        if (!cart[id]) {
          cart[id] = { product: prod, quantity: 1, recipeTag: 'Paneer Butter Masala Kit' };
        } else {
          cart[id].quantity += 1;
        }
      }
    });

    updateCartUI();
    renderProducts();
    renderDepartmentShelves();
    renderOrderAgainView();
    showToast('🎉 Added Verka Paneer Butter Masala Kit ingredients to cart!');
    openCartDrawer();
  }
}

// -------------------------------------------------------------
// CATEGORIES HUB ENGINE ("SAB KUCH EK JAGAH")
// -------------------------------------------------------------
const masterCategoriesHubData = [
  {
    department: 'Grocery & Kitchen',
    icon: '🛒',
    subcategories: [
      { id: 'Dairy, Bread & Eggs', label: 'Dairy, Bread & Eggs', icon: '🥛', preview: 'Milk, Bread, Paneer, Eggs' },
      { id: 'Vegetables & Fruits', label: 'Vegetables & Fruits', icon: '🥦', preview: 'Mandi Onions, Tomatoes, Potatoes' },
      { id: 'Atta, Rice & Dals', label: 'Atta, Rice & Dals', icon: '🌾', preview: 'Aashirvaad Atta, Basmati, Dals' },
      { id: 'Oils, Ghee & Masalas', label: 'Oils, Ghee & Masalas', icon: '🫒', preview: 'Mustard Oil, Verka Ghee, Spices' },
      { id: 'Dry Fruits & Cereals', label: 'Dry Fruits & Cereals', icon: '🥜', preview: 'Almonds, Corn Flakes, Oats' },
      { id: 'Kitchen Tools & Storage', label: 'Kitchenware & Foil', icon: '🍳', preview: 'Aluminium Foil, Scrubbers, Boxes' }
    ]
  },
  {
    department: 'Snacks & Desserts',
    icon: '🍿',
    subcategories: [
      { id: 'Chips & Namkeen', label: 'Chips & Namkeen', icon: '🍟', preview: "Lay's, Kurkure, Haldiram's" },
      { id: 'Sweets & Chocolates', label: 'Sweets & Chocolates', icon: '🍫', preview: 'Dairy Milk Silk, Gulab Jamun' },
      { id: 'Ice Creams & Kulfi', label: 'Ice Creams & More', icon: '🍦', preview: "Amul, Kwality Wall's Feast" },
      { id: 'Cold Drinks & Juices', label: 'Cold Drinks & Juices', icon: '🥤', preview: 'Thums Up, Coke Zero, Real Juice' },
      { id: 'Biscuits & Cookies', label: 'Biscuits & Cookies', icon: '🍪', preview: 'Good Day, Parle-G, Oreo' },
      { id: 'Instant Noodles & Pasta', label: 'Noodles & Maggi', icon: '🍜', preview: 'Maggi 2-Min, Yippee Noodles' },
      { id: 'Tea & Coffee', label: 'Tea & Coffee', icon: '☕', preview: 'Tata Tea Gold, Nescafe Coffee' }
    ]
  },
  {
    department: 'Beauty & Personal Care',
    icon: '✨',
    subcategories: [
      { id: 'Bath & Body Soaps', label: 'Bath & Body Soaps', icon: '🧼', preview: 'Dove, Dettol Soap, Pears' },
      { id: 'Hair Care & Shampoo', label: 'Hair Care & Shampoo', icon: '🧴', preview: 'Head & Shoulders, Tresemme' },
      { id: 'Skin & Face Care', label: 'Skin & Face Care', icon: '🌸', preview: 'Nivea Soft, Garnier Facewash' },
      { id: 'Oral Care & Dental', label: 'Oral Care & Dental', icon: '🪥', preview: 'Colgate MaxFresh, Sensodyne' },
      { id: 'Shaving & Grooming', label: 'Shaving & Grooming', icon: '🪒', preview: 'Gillette Mach3, Shaving Foam' },
      { id: 'Feminine Hygiene', label: 'Feminine Hygiene', icon: '🩸', preview: 'Whisper Ultra, Sanitary Pads' }
    ]
  },
  {
    department: 'Household Essentials',
    icon: '🏠',
    subcategories: [
      { id: 'Laundry & Detergents', label: 'Laundry & Detergents', icon: '🧺', preview: 'Surf Excel Liquid, Ariel, Comfort' },
      { id: 'Dishwash & Utensils', label: 'Dishwash & Utensils', icon: '🧽', preview: 'Vim Lemon Gel, Pril Active' },
      { id: 'Floor & Toilet Cleaning', label: 'Cleaners & Disinfectants', icon: '🧹', preview: 'Lizol Floor, Harpic Toilet' },
      { id: 'Paper & Tissues', label: 'Paper & Tissues', icon: '🧻', preview: 'Origami Towel, Toilet Rolls' },
      { id: 'Pest Control & Repellents', label: 'Pest Control & Coil', icon: '🦟', preview: 'All Out Refill, Good Knight' },
      { id: 'Electricals & Batteries', label: 'Electricals & Batteries', icon: '🔋', preview: 'Duracell AA, Philips LED Bulb' }
    ]
  },
  {
    department: 'Electronics',
    icon: '🎧',
    subcategories: [
      { id: 'Audio & Headphones', label: 'Audio & Headphones', icon: '🎧', preview: 'boAt Earphones, Neckbands' },
      { id: 'Cables & Chargers', label: 'Cables & Chargers', icon: '⚡', preview: 'Portronics 20W, Type-C' },
      { id: 'Power Banks & Accessories', label: 'Power Banks', icon: '🔋', preview: 'Mi 10000mAh Power Bank' },
      { id: 'Kitchen Appliances', label: 'Kitchen Appliances', icon: '🍳', preview: 'Pigeon Electric Kettle' },
      { id: 'Personal Grooming Electronics', label: 'Grooming & Trimmers', icon: '🪒', preview: 'Philips Beard Trimmer' },
      { id: 'Batteries & Torches', label: 'Batteries & Torches', icon: '🔦', preview: 'Duracell Ultra AA Pack' }
    ]
  },
  {
    department: 'Gifting',
    icon: '🎁',
    subcategories: [
      { id: 'Chocolates & Hampers', label: 'Chocolates & Hampers', icon: '🍫', preview: 'Ferrero Rocher, Celebrations' },
      { id: 'Dry Fruit Hampers', label: 'Dry Fruit Hampers', icon: '🥜', preview: 'Royal Almond & Cashew Box' },
      { id: 'Traditional Sweets', label: 'Traditional Sweets', icon: '🍬', preview: 'Haldiram Kaju Katli Tin' },
      { id: 'Lifestyle Gifts', label: 'Lifestyle Gifts', icon: '🎁', preview: 'Aroma Soy Candles Luxury Set' }
    ]
  },
  {
    department: 'Decor',
    icon: '🛋️',
    subcategories: [
      { id: 'Festive & Mood Lighting', label: 'Fairy & Mood Lights', icon: '💡', preview: 'Warm LED Fairy Lights 10m' },
      { id: 'Aromatherapy & Candles', label: 'Aromatherapy & Candles', icon: '🕯️', preview: 'Vanilla Jar Candles' },
      { id: 'Plants & Greenery', label: 'Plants & Greenery', icon: '🪴', preview: 'Potted Artificial Succulents' },
      { id: 'Pooja & Metal Decor', label: 'Pooja & Metal Decor', icon: '🪔', preview: 'Brass Peacock Diyas' },
      { id: 'Home Fragrances', label: 'Home Fragrances', icon: '🌸', preview: 'Air Wick Room Spray' }
    ]
  },
  {
    department: 'Kids',
    icon: '🧸',
    subcategories: [
      { id: 'Diapers & Wipes', label: 'Diapers & Wipes', icon: '👶', preview: 'Pampers Pants, Himalaya Wipes' },
      { id: 'Baby Food & Nutrition', label: 'Baby Food & Nutrition', icon: '🥣', preview: 'Nestlé Cerelac Wheat Apple' },
      { id: 'Toys & Treats', label: 'Toys & Treats', icon: '🧸', preview: 'Kinder Joy with Surprise Toy' },
      { id: 'Art & Stationery', label: 'Art & Stationery', icon: '🎨', preview: 'Faber-Castell Wax Crayons' },
      { id: 'Baby Bath & Skincare', label: 'Baby Bath & Skincare', icon: '🛁', preview: "Johnson's Baby Shampoo" }
    ]
  }
];

let currentCatDeptFilter = 'all';

function renderCategoriesView(deptFilter = 'all', filterQuery = '') {
  const container = document.getElementById('categoriesDirectoryContainer');
  if (!container) return;

  const targetDepts = (deptFilter === 'all')
    ? masterCategoriesHubData
    : masterCategoriesHubData.filter(d => d.department === deptFilter);

  const query = (filterQuery || '').trim().toLowerCase();

  let html = '';

  targetDepts.forEach(dept => {
    // Filter subcategories by query if given
    let visibleSubcats = dept.subcategories;
    if (query) {
      visibleSubcats = dept.subcategories.filter(sc => {
        const inName = sc.label.toLowerCase().includes(query);
        const inPreview = sc.preview.toLowerCase().includes(query);
        const hasMatchingProduct = allProducts.some(p => 
          p.department === dept.department && 
          (p.subcategory === sc.id || p.category === sc.id) &&
          (p.name.toLowerCase().includes(query) || (p.tags && p.tags.some(t => t.toLowerCase().includes(query))))
        );
        return inName || inPreview || hasMatchingProduct;
      });
    }

    if (visibleSubcats.length === 0) return;

    // Calculate total items in this department
    const deptItemCount = allProducts.filter(p => p.department === dept.department).length;

    html += `
      <div class="cat-dept-card-group">
        <div class="cat-dept-heading-row">
          <div class="cat-dept-heading-title">
            <span>${dept.icon}</span>
            <span>${dept.department}</span>
          </div>
          <span class="cat-dept-count-badge">${deptItemCount} Products</span>
        </div>

        <div class="cat-grid-3col">
          ${visibleSubcats.map(sc => {
            const count = allProducts.filter(p => 
              p.department === dept.department && 
              (p.subcategory === sc.id || p.category === sc.id)
            ).length;

            return `
              <div class="hub-category-card" onclick="openCategoryFromHub('${dept.department}', '${sc.id}')">
                <div class="hub-icon-bubble">${sc.icon}</div>
                <div class="hub-cat-title">${sc.label}</div>
                <div class="hub-cat-count">${count || '5+'} Items</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  });

  if (!html) {
    html = `
      <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
        <div style="font-size: 38px; margin-bottom: 8px;">🔍</div>
        <div style="font-weight: 800; font-size: 14.5px; color: var(--text-dark);">No matching categories found</div>
        <p style="font-size: 12px; margin-top: 4px;">Try searching for "milk", "oil", "chips", or "soap"</p>
      </div>
    `;
  }

  container.innerHTML = html;
}

function filterCategoriesDept(deptName, btnEl) {
  currentCatDeptFilter = deptName;
  document.querySelectorAll('#categoriesDeptTabs .dept-tab-pill').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const searchInput = document.getElementById('catSearchInput');
  const q = searchInput ? searchInput.value : '';
  renderCategoriesView(deptName, q);
}

function filterCategoriesHub(query) {
  renderCategoriesView(currentCatDeptFilter, query);
}

function openCategoryFromHub(deptName, subcatId) {
  selectedDepartment = deptName;
  selectedSubcategory = subcatId;

  switchView('groceries');
  const masterWrap = document.getElementById('masterDepartmentsWrapper');
  const grocSec = document.getElementById('groceriesSection');
  if (masterWrap) masterWrap.style.display = 'none';
  if (grocSec) grocSec.style.display = 'block';

  const titleEl = document.getElementById('sectionTitleText');
  if (titleEl) titleEl.innerText = `${deptName} ➔ ${subcatId}`;

  // Change back button action so it goes back to Categories!
  const backBtn = document.querySelector('.btn-back-to-departments');
  if (backBtn) {
    backBtn.innerHTML = '⬅️ Back to Categories';
    backBtn.onclick = () => switchView('categories');
  }

  syncTopCategoryTab(deptName);

  renderSubcategoryPills();
  renderProducts();

  const viewport = document.getElementById('iphoneViewport');
  if (viewport) viewport.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDepartmentShelves() {
  const depts = [
    {
      id: 'shelfGroceryContainer',
      deptName: 'Grocery & Kitchen',
      items: allProducts.filter(p => p.department === 'Grocery & Kitchen').slice(0, 10)
    },
    {
      id: 'shelfSnacksContainer',
      deptName: 'Snacks & Desserts',
      items: allProducts.filter(p => p.department === 'Snacks & Desserts').slice(0, 10)
    }
  ];

  depts.forEach(d => {
    const el = document.getElementById(d.id);
    if (!el) return;

    el.innerHTML = d.items.map(p => {
      const inCart = cart[p.id];
      const qty = inCart ? inCart.quantity : 0;

      let btnHtml = '';
      if (qty > 0) {
        btnHtml = `
          <div class="qty-counter" style="height: 25px;">
            <button class="qty-btn" style="padding: 2px 7px; font-size: 12px;" onclick="updateCartQty('${p.id}', -1)">−</button>
            <span class="qty-value" style="font-size: 11px; min-width: 14px;">${qty}</span>
            <button class="qty-btn" style="padding: 2px 7px; font-size: 12px;" onclick="updateCartQty('${p.id}', 1)">+</button>
          </div>
        `;
      } else {
        btnHtml = `
          <button class="shelf-btn-add" onclick="addToCart('${p.id}')">+ ADD</button>
        `;
      }

      const discountPct = p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0;
      const discountTag = discountPct > 0 ? `<div class="shelf-discount-pill">${discountPct}% OFF</div>` : '';

      return `
        <div class="shelf-product-card">
          <div class="shelf-img-box">
            <img src="${p.image}" alt="${p.name}" class="shelf-img" loading="lazy" />
            <div class="shelf-delivery-pill">⚡ ${p.deliveryTime || '8 MINS'}</div>
            ${discountTag}
          </div>
          <div class="shelf-title" title="${p.name}">${p.name}</div>
          <div class="shelf-weight">${p.weight}</div>
          <div class="shelf-price-row">
            <div class="shelf-price-block">
              <span class="shelf-price">₹${p.price}</span>
              <span class="shelf-mrp">₹${p.mrp}</span>
            </div>
            ${btnHtml}
          </div>
        </div>
      `;
    }).join('');
  });
}

// -------------------------------------------------------------
// BLINKIT 4-COLUMN STORE CATEGORY GRID (PAIRS OF 4)
// -------------------------------------------------------------
function renderStoreCategoriesGrid() {
  const container = document.getElementById('storeCategoriesGrid');
  if (!container) return;

  container.innerHTML = BLINKIT_STORE_CATEGORIES.map(cat => {
    const isActive = (selectedDepartment === cat.id);
    return `
      <div class="blinkit-cat-card ${isActive ? 'active' : ''}" data-cat="${cat.id}" onclick="selectStoreCategory('${cat.id}', this)">
        <div class="blinkit-cat-icon-wrap">${cat.icon}</div>
        <span class="blinkit-cat-name">${cat.name}</span>
      </div>
    `;
  }).join('');
}

function selectStoreCategory(catId, cardEl) {
  selectedDepartment = catId;
  selectedSubcategory = 'all';

  document.querySelectorAll('.blinkit-cat-card').forEach(el => el.classList.remove('active'));
  if (cardEl) {
    cardEl.classList.add('active');
  } else {
    document.querySelectorAll('.blinkit-cat-card').forEach(el => {
      if (el.getAttribute('data-cat') === catId) {
        el.classList.add('active');
      }
    });
  }

  renderProducts();
}

function renderStoreDepartments() {
  renderStoreCategoriesGrid();
}

function selectStoreDepartment(deptId, chipEl) {
  selectStoreCategory(deptId, chipEl);
}

function renderSubcategoryPills() {
  // Intentionally blank - variety filter removed
}

function selectSubcategory(subcatId, btn) {
  // Legacy stub
}

function handleSearch(query) {
  searchQuery = query.trim().toLowerCase();
  const homeView = document.getElementById('homeExperienceView');
  const grocSec = document.getElementById('groceriesSection');
  const recSec = document.getElementById('recipesSection');

  if (searchQuery.length > 0) {
    if (homeView) homeView.style.display = 'none';
    if (recSec) recSec.style.display = 'none';
    if (grocSec) grocSec.style.display = 'block';
    const titleEl = document.getElementById('sectionTitleText');
    if (titleEl) titleEl.innerText = `Search: "${query}"`;
  } else {
    // Restore the appropriate view when query is cleared
    if (currentView === 'recipes') {
      if (homeView) homeView.style.display = 'none';
      if (grocSec) grocSec.style.display = 'none';
      if (recSec) recSec.style.display = 'block';
    } else if (currentView === 'groceries' || currentView === 'store') {
      if (homeView) homeView.style.display = 'none';
      if (recSec) recSec.style.display = 'none';
      if (grocSec) grocSec.style.display = 'block';
      const titleEl = document.getElementById('sectionTitleText');
      if (titleEl) titleEl.innerText = '🛒 Store';
    } else {
      if (homeView) homeView.style.display = 'block';
      if (recSec) recSec.style.display = 'none';
      if (grocSec) grocSec.style.display = 'none';
    }
  }

  renderProducts();
  renderRecipes();
}

// -------------------------------------------------------------
// Rendering Products Grid (Blinkit Style Cards)
// -------------------------------------------------------------
function renderProducts() {
  const container = document.getElementById('productsGridContainer');
  if (!container) return;

  let filtered = allProducts;

  // 1. Department Filter
  if (selectedDepartment && selectedDepartment !== 'all') {
    if (selectedDepartment.startsWith('sub:')) {
      const sub = selectedDepartment.slice(4);
      filtered = filtered.filter(p => p.subcategory === sub || p.subcat_dept === sub);
    } else {
      filtered = filtered.filter(p => p.department === selectedDepartment || p.category === selectedDepartment);
    }
  }

  // 2. Subcategory Filter
  if (selectedSubcategory && selectedSubcategory !== 'all') {
    filtered = filtered.filter(p => 
      p.subcat_dept === selectedSubcategory ||
      p.subcategory === selectedSubcategory || 
      p.subcatName === selectedSubcategory ||
      p.category === selectedSubcategory
    );
  }

  // 3. Search Filter
  if (searchQuery) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchQuery) ||
      (p.department && p.department.toLowerCase().includes(searchQuery)) ||
      (p.category && p.category.toLowerCase().includes(searchQuery)) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(searchQuery)) ||
      (p.subcat_dept && p.subcat_dept.toLowerCase().includes(searchQuery)) ||
      (p.description && p.description.toLowerCase().includes(searchQuery))
    );
  }

  const countEl = document.getElementById('productCountLabel');
  if (countEl) countEl.innerText = `${filtered.length} items`;

  // Prepend matching recipe kits when search query is active
  let matchingRecipesHtml = '';
  if (searchQuery) {
    const matchingRecipes = allRecipes.filter(r => 
      r.name.toLowerCase().includes(searchQuery) ||
      (r.cuisine && r.cuisine.toLowerCase().includes(searchQuery)) ||
      (r.category && r.category.toLowerCase().includes(searchQuery)) ||
      (r.chef && r.chef.toLowerCase().includes(searchQuery)) ||
      (r.ingredients && r.ingredients.some(i => i.name.toLowerCase().includes(searchQuery)))
    );

    if (matchingRecipes.length > 0) {
      matchingRecipesHtml = `
        <div class="search-recipe-results-block" style="grid-column: 1 / -1;">
          <div class="search-block-header">
            <h4>🍳 Matching Chef Recipe Kits (${matchingRecipes.length})</h4>
            <span class="search-block-subtitle">Pre-portioned fresh ingredients + HD video masterclass</span>
          </div>
          <div class="home-recipe-kits-scroll">
            ${matchingRecipes.map(r => renderHomeRecipeCard(r)).join('')}
          </div>
        </div>
        <div style="grid-column: 1 / -1; margin-top: 10px; margin-bottom: 6px; font-family: var(--font-heading); font-size: 14.5px; font-weight: 800; color: var(--text-dark);">
          🛒 Matching Groceries (${filtered.length})
        </div>
      `;
    }
  }

  if (filtered.length === 0) {
    if (matchingRecipesHtml) {
      container.innerHTML = matchingRecipesHtml + `
        <div style="grid-column: 1/-1; text-align: center; padding: 24px 20px; color: var(--text-muted);">
          <p style="font-size: 13px;">No individual grocery items matched "${searchQuery}", but you can order the complete recipe kit above!</p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
          <div style="font-size: 40px; margin-bottom: 12px;">🔍</div>
          <div style="font-family: var(--font-heading); font-size: 18px; font-weight: 800; color: var(--text-dark);">No items found</div>
          <p style="font-size: 13.5px; margin-top: 6px;">Try searching for 'dal makhani', 'paneer', 'biryani', 'milk', or 'butter'.</p>
        </div>
      `;
    }
    return;
  }

  container.innerHTML = matchingRecipesHtml + filtered.map(p => {
    const inCart = cart[p.id];
    const qty = inCart ? inCart.quantity : 0;

    let buttonHtml = '';
    if (qty > 0) {
      buttonHtml = `
        <div class="qty-counter">
          <button class="qty-btn" onclick="updateCartQty('${p.id}', -1)">−</button>
          <span class="qty-value">${qty}</span>
          <button class="qty-btn" onclick="updateCartQty('${p.id}', 1)">+</button>
        </div>
      `;
    } else {
      buttonHtml = `
        <button class="btn-add-item" onclick="addToCart('${p.id}')">ADD</button>
      `;
    }

    const discountBadge = p.discount 
      ? `<div class="discount-pill">${p.discount}</div>` 
      : '';

    const tricityTag = p.tricityBrand 
      ? `<div style="font-size: 10px; font-weight: 800; color: #740a12; background: #faecec; padding: 1px 6px; border-radius: 4px; display: inline-block; margin-bottom: 4px;">📍 ${p.tricityBrand}</div>` 
      : '';

    return `
      <div class="product-card">
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy" />
          <div class="delivery-tag">
            <span class="dot"></span>
            ${p.deliveryTime || '8 MINS'}
          </div>
          ${discountBadge}
        </div>
        ${tricityTag}
        <div class="product-weight">${p.weight}</div>
        <div class="product-title" title="${p.name}">${p.name}</div>
        <div class="product-bottom-row">
          <div class="price-container">
            <span class="price-current">₹${p.price}</span>
            <span class="price-mrp">₹${p.mrp}</span>
          </div>
          ${buttonHtml}
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// CUISINE MENU & RECIPES HUB ENGINE
// -------------------------------------------------------------
function renderCuisinesMenu() {
  const container = document.getElementById('cuisineMenuScroll');
  if (!container) return;

  container.innerHTML = CUISINE_DEFINITIONS.map(c => {
    const isActive = selectedRecipeCuisine === c.id;
    let recipesForCuisine = c.id === 'All' 
      ? allRecipes 
      : allRecipes.filter(r => (r.cuisine === c.id || r.category === c.id));

    if (selectedRecipeDiet === 'veg') {
      recipesForCuisine = recipesForCuisine.filter(r => r.diet === 'Vegetarian');
    } else if (selectedRecipeDiet === 'nonveg') {
      recipesForCuisine = recipesForCuisine.filter(r => r.diet === 'Non-Vegetarian');
    } else if (selectedRecipeDiet === 'quick') {
      recipesForCuisine = recipesForCuisine.filter(r => {
        const t = parseInt(r.totalTime || r.cookTime || '30');
        return t <= 25 || (r.prepTime && r.prepTime.includes('10')) || r.category === 'Quick 15-Mins' || r.cuisine === 'Quick 15-Mins';
      });
    }

    const count = recipesForCuisine.length;
    if (count === 0 && c.id !== 'All') return '';

    return `
      <div class="cuisine-card-chip ${isActive ? 'active' : ''}" onclick="selectRecipeCuisine('${c.id}', this)">
        <div class="cuisine-chip-icon-box">
          <span class="cuisine-chip-icon">${c.icon}</span>
        </div>
        <div class="cuisine-chip-name">${c.name}</div>
        <span class="cuisine-chip-count">${count}</span>
      </div>
    `;
  }).join('');
}

function selectRecipeCuisine(cuisineId, chipEl) {
  selectedRecipeCuisine = cuisineId;

  document.querySelectorAll('#cuisineMenuScroll .cuisine-card-chip').forEach(el => el.classList.remove('active'));
  if (chipEl) {
    chipEl.classList.add('active');
  } else {
    document.querySelectorAll('#cuisineMenuScroll .cuisine-card-chip').forEach(el => {
      const nameEl = el.querySelector('.cuisine-chip-name');
      if (nameEl && (nameEl.innerText.trim() === cuisineId || (cuisineId === 'All' && nameEl.innerText.includes('All')))) {
        el.classList.add('active');
      }
    });
  }

  renderRecipes();
}

function setRecipeDietFilter(filterType, btnEl) {
  selectedRecipeDiet = filterType;
  document.querySelectorAll('#recipeFilterChipsRow .recipe-diet-chip, #recipeFilterChipsRow .rec-filter-pill').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderCuisinesMenu();
  renderRecipes();
}

// -------------------------------------------------------------
// Rendering Recipes Grid (Streamlined, Minimalist, Classy)
// -------------------------------------------------------------
function renderRecipes() {
  const container = document.getElementById('recipesGridContainer');
  if (!container) return;

  let filtered = allRecipes;

  // Filter by Cuisine
  if (selectedRecipeCuisine !== 'All') {
    filtered = filtered.filter(r => (r.cuisine === selectedRecipeCuisine || r.category === selectedRecipeCuisine));
  }

  // Filter by Diet / Time / Rating
  if (selectedRecipeDiet === 'veg') {
    filtered = filtered.filter(r => r.diet === 'Vegetarian');
  } else if (selectedRecipeDiet === 'nonveg') {
    filtered = filtered.filter(r => r.diet === 'Non-Vegetarian');
  } else if (selectedRecipeDiet === 'quick') {
    filtered = filtered.filter(r => {
      const t = parseInt(r.totalTime || r.cookTime || '30');
      return t <= 25 || (r.prepTime && r.prepTime.includes('10')) || r.category === 'Quick 15-Mins' || r.cuisine === 'Quick 15-Mins';
    });
  } else if (selectedRecipeDiet === 'popular') {
    filtered = filtered.filter(r => (r.rating || 0) >= 4.95);
  }

  // Filter by Search Query
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(r => 
      r.name.toLowerCase().includes(q) ||
      (r.cuisine && r.cuisine.toLowerCase().includes(q)) ||
      (r.category && r.category.toLowerCase().includes(q)) ||
      (r.headline && r.headline.toLowerCase().includes(q)) ||
      (r.description && r.description.toLowerCase().includes(q))
    );
  }

  const countBadge = document.getElementById('recipeCountLabel');
  if (countBadge) countBadge.innerText = `${filtered.length} kits`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 45px 20px; color: var(--text-muted);">
        <div style="font-size: 36px; margin-bottom: 10px;">🍳</div>
        <div style="font-family: var(--font-heading); font-size: 16px; font-weight: 800; color: var(--text-dark);">No recipe kits found</div>
        <p style="font-size: 13px; margin-top: 4px;">No recipes match "${searchQuery || selectedRecipeDiet}".</p>
        <button class="btn-add-kit-direct" style="margin: 14px auto 0; display: inline-flex;" onclick="selectRecipeCuisine('All', null); setRecipeDietFilter('all', document.querySelector('#recipeFilterChipsRow .recipe-diet-chip'));">
          🔄 Show All Cuisines &amp; Kits
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(r => {
    const isVeg = r.diet === 'Vegetarian';
    const dietBadge = isVeg 
      ? '<span class="diet-dot-veg">🟢</span> Veg' 
      : '<span class="diet-dot-nonveg">🔴</span> Non-Veg';

    const cuisineName = r.cuisine || r.category || 'Regional';
    const kitPrice = r.kitPrice || 195;
    const ingCount = (r.ingredients || []).length;
    const ingredientNames = (r.ingredients || []).slice(0, 4).map(i => i.name.split(' ')[0]).join(', ');
    const ingredientsTeaser = ingCount > 0 
      ? `${ingredientNames}${ingCount > 4 ? ` +${ingCount - 4} more` : ''}` 
      : 'Fresh pre-portioned ingredients';

    const inCart = isRecipeInCart(r);

    return `
      <div class="recipe-card" onclick="openRecipeModal('${r.id}')">
        <div class="recipe-thumb-box">
          <img src="${r.thumbnail}" alt="${r.name}" class="recipe-thumb-img" loading="lazy" />
          <div class="play-video-overlay">
            <div class="play-circle">
              <span class="play-icon">▶</span>
              <span class="play-text">Masterclass</span>
            </div>
          </div>
          <div class="recipe-badge-diet">${dietBadge}</div>
          <div class="recipe-badge-time">⏱️ ${r.totalTime}</div>
        </div>

        <div class="recipe-content">
          <div class="recipe-meta-row">
            <span class="recipe-chef-tag">👨‍🍳 ${r.chef ? r.chef.split('/')[0].trim() : 'MasterChef'}</span>
            <span class="recipe-cuisine-pill">${cuisineName}</span>
          </div>
          <h3 class="recipe-title">${r.name}</h3>
          <p class="recipe-headline">${r.headline || r.description || ''}</p>

          <div class="recipe-ingredients-preview">
            <span class="preview-kit-label">📦 Kit:</span>
            <span class="preview-kit-items">${ingredientsTeaser}</span>
          </div>

          <div class="recipe-actions-row">
            <div class="recipe-kit-price-box">
              <span class="kit-price-label">Kit for ${r.defaultServings || 2}:</span>
              <span class="kit-price-val">₹${kitPrice}</span>
            </div>
            <button class="btn-add-kit-direct ${inCart ? 'in-cart' : ''}" onclick="event.stopPropagation(); handleRecipeKitAdd('${r.id}', this)">
              ${inCart ? '✓ IN CART' : '+ ADD KIT'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// -------------------------------------------------------------
// 1-Click Add Entire Recipe Kit to Cart
// -------------------------------------------------------------
function addRecipeKitToCart(recipeId) {
  const recipe = allRecipes.find(r => r.id === recipeId);
  if (!recipe) {
    showToast('Recipe kit not found');
    return;
  }

  let addedItems = 0;
  (recipe.ingredients || []).forEach(ing => {
    const prod = ing.product || allProducts.find(p => p.id === ing.productId) || {
      id: ing.productId || `kit_item_${recipe.id}_${Math.random().toString(36).substr(2, 5)}`,
      name: ing.name,
      price: Math.round((recipe.kitPrice || 195) / Math.max((recipe.ingredients || []).length, 1)),
      image: recipe.thumbnail,
      weight: `${(ing.amountPerServing || 100) * (recipe.defaultServings || 2)} ${ing.unit || 'g'}`
    };

    if (!cart[prod.id]) {
      cart[prod.id] = { product: prod, quantity: 1, recipeTag: recipe.name };
    } else {
      cart[prod.id].quantity += 1;
    }
    addedItems++;
  });

  updateCartUI();
  renderProducts();
  renderDepartmentShelves();
  renderOrderAgainView();
  renderRecipes();
  renderHomeExperience();
  showToast(`🎉 Added ${recipe.name} Kit (${addedItems} fresh items) to cart!`);
}

// -------------------------------------------------------------
// RECIPE DETAIL & VIDEO MODAL (THE CORE USP FEATURE)
// -------------------------------------------------------------
async function openRecipeModal(recipeId) {
  try {
    // 1. First check in-memory allRecipes (fast & safe for GitHub Pages static hosting)
    activeRecipe = allRecipes.find(r => r.id === recipeId);

    // 2. Fallback to API if not loaded in-memory
    if (!activeRecipe) {
      const res = await fetch(`/api/recipes/${recipeId}`);
      if (res.ok) activeRecipe = await res.json();
    }

    if (!activeRecipe) {
      showToast('⚠️ Recipe details unavailable');
      return;
    }

    activeRecipeServings = activeRecipe.defaultServings || 2;

    document.getElementById('modalRecipeTitle').innerHTML = `🍳 ${activeRecipe.name}`;
    document.getElementById('modalVideoFrame').src = activeRecipe.videoEmbed + '?autoplay=1&mute=0&rel=0';

    document.getElementById('modalMetaTime').innerText = `⏱️ ${activeRecipe.totalTime}`;
    document.getElementById('modalMetaCalories').innerText = `🔥 ${activeRecipe.calories}`;
    document.getElementById('modalMetaDifficulty').innerText = `⚡ ${activeRecipe.difficulty}`;
    document.getElementById('modalMetaDiet').innerHTML = activeRecipe.diet === 'Vegetarian' 
      ? '<span style="color:var(--maroon-primary);">🟢 100% Veg</span>' 
      : '<span style="color:#d63031;">🔴 Non-Veg</span>';
    
    document.getElementById('modalServingsCount').innerText = activeRecipeServings;

    // Initialize ingredient selection (all checked by default)
    ingredientSelection = {};
    (activeRecipe.ingredients || []).forEach((ing, index) => {
      ingredientSelection[index] = true;
    });

    renderModalIngredients();
    renderModalSteps();
    updateModalSummary();

    document.getElementById('recipeModalBackdrop').classList.add('open');
    document.body.style.overflow = 'hidden';
  } catch (err) {
    console.error('Failed to open recipe:', err);
    showToast('Failed to load recipe details');
  }
}

function closeRecipeModal() {
  const backdrop = document.getElementById('recipeModalBackdrop');
  backdrop.classList.remove('open');
  document.getElementById('modalVideoFrame').src = '';
  document.body.style.overflow = 'auto';
  activeRecipe = null;
}

function updateServings(delta) {
  if (!activeRecipe) return;
  const newServings = activeRecipeServings + delta;
  if (newServings < 1 || newServings > 8) return;

  activeRecipeServings = newServings;
  document.getElementById('modalServingsCount').innerText = activeRecipeServings;
  
  renderModalIngredients();
  updateModalSummary();
}

function renderModalIngredients() {
  if (!activeRecipe || !activeRecipe.ingredients) return;
  const container = document.getElementById('modalIngredientsList');

  container.innerHTML = activeRecipe.ingredients.map((ing, idx) => {
    const isSelected = !!ingredientSelection[idx];
    const prod = ing.product || allProducts.find(p => p.id === ing.productId) || {
      name: ing.name,
      price: 40,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200',
      weight: 'Standard pack'
    };

    const totalQtyNeeded = (ing.amountPerServing || 1) * activeRecipeServings;
    const formattedQty = `${totalQtyNeeded} ${ing.unit}`;

    const stapleBadge = ing.isPantryStaple 
      ? '<span class="pantry-tag">Pantry Staple</span>' 
      : '';

    const statusLabel = isSelected 
      ? '<span class="ingredient-status-label" style="color:var(--maroon-primary); font-weight:800;">🛒 In Cart Kit</span>' 
      : '<span style="font-size:10.5px; color:#888; font-weight:700;">🏠 At Home (Saved ₹' + prod.price + ')</span>';

    return `
      <div class="ingredient-row ${isSelected ? '' : 'excluded'}" onclick="toggleIngredientRow(${idx})">
        <input 
          type="checkbox" 
          class="ingredient-check-input" 
          ${isSelected ? 'checked' : ''} 
          onclick="event.stopPropagation(); toggleIngredient(${idx}, this.checked)"
        />
        <img src="${prod.image}" alt="${prod.name}" class="ingredient-img" />
        <div class="ingredient-details">
          <div class="ingredient-name">
            ${ing.name} ${stapleBadge}
          </div>
          <div class="ingredient-qty-note">
            Need: <strong>${formattedQty}</strong> • Store Item: ${prod.name} (${prod.weight})
          </div>
        </div>
        <div class="ingredient-price-col">
          <div class="ingredient-price">₹${prod.price}</div>
          ${statusLabel}
        </div>
      </div>
    `;
  }).join('');
}

function toggleIngredientRow(index) {
  ingredientSelection[index] = !ingredientSelection[index];
  renderModalIngredients();
  updateModalSummary();
}

function toggleIngredient(index, isChecked) {
  ingredientSelection[index] = isChecked;
  renderModalIngredients();
  updateModalSummary();
}

function toggleAllIngredients(selectAll) {
  if (!activeRecipe) return;
  activeRecipe.ingredients.forEach((_, idx) => {
    ingredientSelection[idx] = selectAll;
  });
  renderModalIngredients();
  updateModalSummary();
  showToast(selectAll ? 'All ingredients selected' : 'All ingredients deselected');
}

function deselectPantryStaples() {
  if (!activeRecipe) return;
  let deselectedCount = 0;
  activeRecipe.ingredients.forEach((ing, idx) => {
    if (ing.isPantryStaple) {
      ingredientSelection[idx] = false;
      deselectedCount++;
    } else {
      ingredientSelection[idx] = true;
    }
  });
  renderModalIngredients();
  updateModalSummary();
  showToast(`Excluded ${deselectedCount} pantry staples (Salt, Spices, Oil)`);
}

function updateModalSummary() {
  if (!activeRecipe) return;
  let count = 0;
  let totalPrice = 0;

  activeRecipe.ingredients.forEach((ing, idx) => {
    if (ingredientSelection[idx]) {
      count++;
      const prod = ing.product || allProducts.find(p => p.id === ing.productId);
      if (prod) totalPrice += prod.price;
    }
  });

  document.getElementById('modalSelectedSummary').innerText = `Selected ${count} of ${activeRecipe.ingredients.length} items`;
  document.getElementById('modalSelectedTotal').innerText = `₹${totalPrice}`;

  const addBtn = document.getElementById('btnBatchAddToCart');
  if (count === 0) {
    addBtn.disabled = true;
    addBtn.style.opacity = '0.5';
    addBtn.innerText = 'Select items to add';
  } else {
    addBtn.disabled = false;
    addBtn.style.opacity = '1';
    addBtn.innerText = `🛒 Add Selected (${count} items • ₹${totalPrice}) to Cart`;
  }
}

function renderModalSteps() {
  if (!activeRecipe || !activeRecipe.steps) return;
  const container = document.getElementById('modalStepsList');

  container.innerHTML = activeRecipe.steps.map(step => `
    <div class="step-card">
      <div class="step-badge-num">${step.stepNum}</div>
      <div class="step-body">
        <h5>
          ${step.title}
          <button class="step-timestamp-btn" onclick="seekVideo(${step.timestamp})">
            ▶ ${step.formattedTime} in video
          </button>
        </h5>
        <p>${step.instruction}</p>
      </div>
    </div>
  `).join('');
}

function seekVideo(seconds) {
  if (!activeRecipe) return;
  const baseEmbed = activeRecipe.videoEmbed;
  document.getElementById('modalVideoFrame').src = `${baseEmbed}?start=${seconds}&autoplay=1&rel=0`;
  showToast(`Jumped to step @ ${Math.floor(seconds/60)}m ${seconds%60}s`);
}

// -------------------------------------------------------------
// Batch Add Recipe Ingredients to Cart
// -------------------------------------------------------------
function batchAddSelectedIngredients() {
  if (!activeRecipe) return;
  let addedCount = 0;

  activeRecipe.ingredients.forEach((ing, idx) => {
    if (ingredientSelection[idx]) {
      const prod = ing.product || allProducts.find(p => p.id === ing.productId);
      if (prod) {
        if (!cart[prod.id]) {
          cart[prod.id] = { product: prod, quantity: 1, recipeTag: activeRecipe.name };
        } else {
          cart[prod.id].quantity += 1;
        }
        addedCount++;
      }
    }
  });

  closeRecipeModal();
  updateCartUI();
  renderProducts();
  renderDepartmentShelves();
  renderOrderAgainView();
  showToast(`🎉 Added ${addedCount} ingredients for "${activeRecipe.name}" to cart!`);
  openCartDrawer();
}

// -------------------------------------------------------------
// Cart Management
// -------------------------------------------------------------
function addToCart(productId, recipeTag = null) {
  const prod = allProducts.find(p => p.id === productId);
  if (!prod) return;

  if (!cart[productId]) {
    cart[productId] = { product: prod, quantity: 1, recipeTag };
  } else {
    cart[productId].quantity += 1;
  }

  updateCartUI();
  renderProducts();
  renderDepartmentShelves();
  renderOrderAgainView();
  showToast(`Added ${prod.name} to cart ⚡`);
}

function updateCartQty(productId, delta) {
  if (!cart[productId]) return;

  cart[productId].quantity += delta;
  if (cart[productId].quantity <= 0) {
    delete cart[productId];
  }

  updateCartUI();
  renderProducts();
  renderDepartmentShelves();
  renderOrderAgainView();
  renderCartDrawer();
}

function updateCartUI() {
  let totalCount = 0;
  let totalPrice = 0;

  Object.values(cart).forEach(item => {
    totalCount += item.quantity;
    totalPrice += (item.product.price * item.quantity);
  });

  const headerSummary = document.getElementById('headerCartSummary');
  if (headerSummary) headerSummary.innerText = `Cart (${totalCount}) • ₹${totalPrice}`;

  const iosCartBadge = document.getElementById('iosHeaderCartBadge');
  if (iosCartBadge) iosCartBadge.innerText = totalCount;

  const bottomBadge = document.getElementById('bottomNavCartBadge');
  if (bottomBadge) {
    const prevCount = parseInt(bottomBadge.innerText || '0', 10);
    bottomBadge.innerText = totalCount;
    bottomBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    if (totalCount !== prevCount) {
      bottomBadge.classList.remove('bounce');
      void bottomBadge.offsetWidth;
      bottomBadge.classList.add('bounce');
    }
  }

  const bottomBar = document.getElementById('floatingBottomBar');
  if (bottomBar) {
    if (totalCount > 0) {
      bottomBar.classList.add('visible');
      const itemCountEl = document.getElementById('bottomBarItemCount');
      if (itemCountEl) itemCountEl.innerText = `${totalCount} ${totalCount === 1 ? 'Item' : 'Items'}`;
      const priceEl = document.getElementById('bottomBarPrice');
      if (priceEl) priceEl.innerText = `₹${totalPrice} • Express ${currentDeliveryTime} Delivery to ${currentLocation}`;
    } else {
      bottomBar.classList.remove('visible');
    }
  }
}

function applyPromoWelcome() {
  showToast('🎉 Coupon "GROWLIO50" applied! ₹50 OFF on your order!');
  openCartDrawer();
}

function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartDrawerBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartDrawerBackdrop').classList.remove('open');
  document.body.style.overflow = 'auto';
}

function renderCartDrawer() {
  const container = document.getElementById('cartItemsList');
  const cartEntries = Object.values(cart);

  document.getElementById('cartDrawerTitle').innerText = `My Shopping Cart (${cartEntries.length})`;

  if (cartEntries.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 50px 10px; color: var(--text-muted);">
        <div style="font-size: 48px; margin-bottom: 12px;">🛒</div>
        <div style="font-family: var(--font-heading); font-weight: 800; font-size: 16px; color: var(--text-dark); margin-bottom: 6px;">Your cart is empty</div>
        <p style="font-size: 13px;">Add fresh Verka dairy, veggies or 1-click recipe kits!</p>
        <button style="margin-top: 16px; background: var(--maroon-primary); color:#fff; border:none; padding:10px 22px; border-radius: var(--radius-full); font-family: var(--font-heading); font-weight:700; cursor:pointer; box-shadow: var(--shadow-sm);" onclick="closeCartDrawer(); switchView('recipes')">
          Browse Recipe Kits
        </button>
      </div>
    `;
    updateBill(0);
    document.getElementById('btnProceedCheckout').disabled = true;
    document.getElementById('btnProceedCheckout').style.opacity = '0.5';
    return;
  }

  document.getElementById('btnProceedCheckout').disabled = false;
  document.getElementById('btnProceedCheckout').style.opacity = '1';

  let itemSubtotal = 0;

  container.innerHTML = cartEntries.map(entry => {
    const p = entry.product;
    const itemTotal = p.price * entry.quantity;
    itemSubtotal += itemTotal;

    const recipeBadge = entry.recipeTag 
      ? `<div class="cart-recipe-tag">For: ${entry.recipeTag}</div>` 
      : '';

    return `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <div class="cart-item-title">${p.name}</div>
          <div style="font-size: 11.5px; color: var(--text-muted);">${p.weight} • ₹${p.price} each</div>
          ${recipeBadge}
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <span style="font-family: var(--font-heading); font-size: 15px; font-weight: 800; color: var(--text-dark);">₹${itemTotal}</span>
          <div class="qty-counter">
            <button class="qty-btn" onclick="updateCartQty('${p.id}', -1)">−</button>
            <span class="qty-value">${entry.quantity}</span>
            <button class="qty-btn" onclick="updateCartQty('${p.id}', 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  updateBill(itemSubtotal);
}

function updateBill(itemTotal) {
  const deliveryFee = itemTotal >= 199 || itemTotal === 0 ? 0 : 15;
  const handlingFee = itemTotal > 0 ? 4 : 0;
  const tip = itemTotal > 0 ? 10 : 0;
  const grandTotal = itemTotal + deliveryFee + handlingFee + tip;

  document.getElementById('billItemTotal').innerText = `₹${itemTotal}`;
  document.getElementById('billDeliveryFee').innerText = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
  document.getElementById('billGrandTotal').innerText = `₹${grandTotal}`;
  document.getElementById('checkoutPayAmount').innerText = `₹${grandTotal}`;
}

// -------------------------------------------------------------
// Simulated Checkout & 8-10 Minute Order Tracking
// -------------------------------------------------------------
async function proceedToCheckout() {
  const cartEntries = Object.values(cart);
  if (cartEntries.length === 0) return;

  let totalAmount = 0;
  cartEntries.forEach(item => totalAmount += (item.product.price * item.quantity));

  let orderData = null;
  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartEntries,
        location: currentLocation,
        darkStore: currentDarkStore,
        totalAmount: totalAmount + 14
      })
    });
    if (res.ok) {
      orderData = await res.json();
    }
  } catch (err) {
    console.warn('Backend /api/order unavailable, using frontend simulation:', err);
  }

  if (!orderData) {
    orderData = {
      success: true,
      orderId: `GRO-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Order Placed & Packing',
      deliveryEstimate: '8-10 Mins',
      location: currentLocation,
      darkStore: currentDarkStore,
      placedAt: new Date().toLocaleTimeString(),
      rider: {
        name: 'Gurpreet Singh',
        rating: 4.95,
        phone: '+91 98765 12345',
        vehicle: 'Electric Scooter (CH-01-EV-2024)'
      },
      itemsCount: cartEntries.length,
      totalAmount: totalAmount + 14
    };
  }

  closeCartDrawer();
  cart = {};
  updateCartUI();
  renderProducts();
  renderDepartmentShelves();
  renderOrderAgainView();

  openTrackingModal(orderData);
}

function openTrackingModal(orderData) {
  const modal = document.getElementById('trackingModalBackdrop');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  secondsRemaining = 540; // 9 minutes
  clearInterval(trackingTimer);

  document.getElementById('trackingStatusHeadline').innerText = `🛵 Rider Gurpreet Singh is picking up order from ${currentDarkStore}`;
  document.getElementById('trackingRouteText').innerText = `Navigating to ${currentLocation} via express route (approx 3-4 mins)`;

  updateTrackingDisplay();

  trackingTimer = setInterval(() => {
    secondsRemaining -= 1;
    if (secondsRemaining <= 0) {
      clearInterval(trackingTimer);
      document.getElementById('trackingCountdown').innerText = '00:00';
      document.getElementById('trackingStatusHeadline').innerText = `🎉 Delivered at ${currentLocation}! Enjoy cooking your delicious meal!`;
      document.getElementById('nodeStep4').classList.add('completed');
      return;
    }
    updateTrackingDisplay();
  }, 1000);
}

function updateTrackingDisplay() {
  const minutes = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeStr = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  document.getElementById('trackingCountdown').innerText = timeStr;

  const progressPercent = Math.min(100, Math.round(((540 - secondsRemaining) / 540) * 100) + 18);
  document.getElementById('trackingProgressBar').style.width = `${progressPercent}%`;

  const headline = document.getElementById('trackingStatusHeadline');
  const s1 = document.getElementById('nodeStep1');
  const s2 = document.getElementById('nodeStep2');
  const s3 = document.getElementById('nodeStep3');
  const s4 = document.getElementById('nodeStep4');

  if (secondsRemaining > 480) {
    headline.innerText = `📦 ${currentDarkStore} fulfillment team is packing fresh Verka dairy & veggies...`;
    s1.className = 'timeline-node completed';
    s2.className = 'timeline-node active';
    s3.className = 'timeline-node';
    s4.className = 'timeline-node';
  } else if (secondsRemaining > 240) {
    headline.innerText = `🛵 Rider Gurpreet Singh picked up order. En route to ${currentLocation}...`;
    s1.className = 'timeline-node completed';
    s2.className = 'timeline-node completed';
    s3.className = 'timeline-node active';
    s4.className = 'timeline-node';
  } else if (secondsRemaining > 30) {
    headline.innerText = `⚡ Rider is 1-2 turns away from your location in ${currentLocation}!`;
    s1.className = 'timeline-node completed';
    s2.className = 'timeline-node completed';
    s3.className = 'timeline-node completed';
    s4.className = 'timeline-node active';
  } else {
    headline.innerText = `🔔 Arrived at doorstep in ${currentLocation}! Please collect your order!`;
    s1.className = 'timeline-node completed';
    s2.className = 'timeline-node completed';
    s3.className = 'timeline-node completed';
    s4.className = 'timeline-node completed';
  }
}

function closeTrackingModal() {
  clearInterval(trackingTimer);
  document.getElementById('trackingModalBackdrop').classList.remove('open');
  document.body.style.overflow = 'auto';
}

// -------------------------------------------------------------
// Toast & Helpers
// -------------------------------------------------------------
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const msgEl = document.getElementById('toastMessage');
  msgEl.innerText = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function setupSearchPlaceholderRotation() {
  const input = document.getElementById('globalSearchInput');
  if (!input) return;
  const suggestions = [
    "Search 'Verka Gold Milk'...",
    "Search 'Paneer Butter Masala Kit'...",
    "Search 'Fortune Mustard Oil'...",
    "Search 'Lay\\'s Magic Masala'...",
    "Search 'Aashirvaad Sharbati Atta'...",
    "Search 'Amul Fresh Malai Paneer'...",
    "Search 'Kwality Wall\\'s Feast'...",
    "Search 'Tata Tea Gold'..."
  ];
  let idx = 0;
  setInterval(() => {
    if (!document.activeElement || document.activeElement !== input) {
      if (!input.value || input.value.trim() === '') {
        idx = (idx + 1) % suggestions.length;
        input.placeholder = suggestions[idx];
      }
    }
  }, 2600);
}

// -------------------------------------------------------------
// iOS Native Helpers: Clock & Viewport Toggle
// -------------------------------------------------------------
function initIosClock() {
  function update() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    hours = hours % 12 || 12;
    const clockEl = document.getElementById('iosClock');
    if (clockEl) {
      clockEl.innerText = `${hours}:${minutes}`;
    }
  }
  update();
  setInterval(update, 10000);
}

function toggleIphoneView() {
  const shell = document.getElementById('iphoneShell');
  const btn = document.getElementById('toggleViewBtn');
  if (!shell) return;
  shell.classList.toggle('expanded-view');
  const isExpanded = shell.classList.contains('expanded-view');
  if (btn) {
    btn.innerHTML = isExpanded 
      ? '📱 Return to iPhone Frame' 
      : '🖥️ Toggle Fullscreen / Phone';
  }
  showToast(isExpanded ? 'Switched to Fullscreen view' : 'Switched to iPhone 16 Pro view');
}

