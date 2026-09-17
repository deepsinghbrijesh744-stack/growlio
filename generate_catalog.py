import json

p = []

def add(id, name, brand, cat, subcat, subcatName, unit, price, mrp, discount, img, rating, tricity=False, desc="):
 p.append({
 id: id, name: name, brand: brand, category: cat,
 subcategory: subcat, subcatName: subcatName, unit: unit,
 price: price, mrp: mrp, discount: discount, image: img,
 rating: rating, tricitySpecial: tricity, deliveryTime: 8 mins,
 inStock: True, description: desc
 })

# --- ALL MILKS ---
add(p_m1, Verka Standard Fresh Milk, Verka, dairy, milks, All Milks, 500 ml, 31, 33, 6% OFF, https://images.unsplash.com/photo-1550583724-b2692b85b150?w=350&auto=format&fit=crop&q=80, 4.9, True, Punjab favorite standard pasteurized milk from Verka Mohali Plant.)
add(p_m2, Verka Gold Full Cream Milk, Verka, dairy, milks, All Milks, 500 ml, 34, 36, 6% OFF, https://images.unsplash.com/photo-1563636619-e9143da7973b?w=350&auto=format&fit=crop&q=80, 4.95, True, Rich 6.0% milk fat full cream milk for rich tea, kheer & homemade malai.)
add(p_m3, Verka Cow Milk (Fresh), Verka, dairy, milks, All Milks, 500 ml, 29, 31, 6% OFF, https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=350&auto=format&fit=crop&q=80, 4.85, True, Pure cow milk with light yellow hue and easily digestible protein.)
add(p_m4, Amul Gold Full Cream Milk, Amul, dairy, milks, All Milks, 500 ml, 34, 35, 3% OFF, https://images.unsplash.com/photo-1550583724-b2692b85b150?w=350&auto=format&fit=crop&q=80, 4.9, False, Pasteurized homogenized full cream Amul milk with 6.0% fat.)
add(p_m5, Amul Taaza Toned Fresh Milk, Amul, dairy, milks, All Milks, 500 ml, 28, 29, 3% OFF, https://images.unsplash.com/photo-1563636619-e9143da7973b?w=350&auto=format&fit=crop&q=80, 4.8, False, 3.0% fat pasteurized toned fresh milk for everyday health.)
add(p_m6, Mother Dairy Classic Toned Milk, Mother Dairy, dairy, milks, All Milks, 500 ml, 28, 29, 3% OFF, https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?w=350&auto=format&fit=crop&q=80, 4.75, False, Nutritious daily milk packed with Vitamin A & D.)
add(p_m7, Country Delight Buffalo Milk, Country Delight, dairy, milks, All Milks, 500 ml, 42, 45, 7% OFF, https://images.unsplash.com/photo-1550583724-b2692b85b150?w=350&auto=format&fit=crop&q=80, 4.9, False, Naturally thick farm-fresh buffalo milk.)
add(p_m8, Nestle A+ Nourish Toned Milk, Nestle, dairy, milks, All Milks, 1 Litre, 105, 115, 9% OFF, https://images.unsplash.com/photo-1563636619-e9143da7973b?w=350&auto=format&fit=crop&q=80, 4.8, False, UHT treated long-life milk packed in 6-layer protective packaging.)

# --- PANEER & CURD ---
add(p_pan1, Verka Fresh Malai Paneer, Verka, dairy, paneer_curd, Paneer & Curd, 200 g, 85, 95, 11% OFF, https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=350&auto=format&fit=crop&q=80, 4.95, True, Melt-in-mouth cottage cheese sourced daily from Verka Milk Plant Mohali.)
add(p_pan2, Amul Fresh Malai Paneer, Amul, dairy, paneer_curd, Paneer & Curd, 200 g, 90, 98, 8% OFF, https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=350&auto=format&fit=crop&q=80, 4.85, False, Rich and spongy real milk paneer from Amul.)
add(p_dah1, Verka Fresh Rich Dahi, Verka, dairy, paneer_curd, Paneer & Curd, 400 g Tub, 40, 45, 11% OFF, https://images.unsplash.com/photo-1488477181946-6428a0291777?w=350&auto=format&fit=crop&q=80, 4.9, True, Thick set curd with natural probiotics and no added preservatives.)
add(p_dah2, Epigamia Greek Yogurt (Natural), Epigamia, dairy, paneer_curd, Paneer & Curd, 90 g, 55, 60, 8% OFF, https://images.unsplash.com/photo-1488477181946-6428a0291777?w=350&auto=format&fit=crop&q=80, 4.8, False, High-protein strained greek yogurt, 6g protein per cup.)
add(p_but1, Amul Salted Butter, Amul, dairy, butter_cheese, Butter & Cheese, 100 g, 58, 60, 3% OFF, https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&auto=format&fit=crop&q=80, 4.95, False, Utterly butterly delicious classic salted table butter.)
add(p_che1, Britannia Processed Cheese Slices, Britannia, dairy, butter_cheese, Butter & Cheese, 200 g (10 Slices), 140, 155, 10% OFF, https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=350&auto=format&fit=crop&q=80, 4.85, False, Foil-wrapped cheese slices for burgers and sandwiches.)
add(p_brd1, Harvest Gold 100% Atta Bread, Harvest Gold, dairy, bread_eggs, Breads & Eggs, 400 g, 50, 55, 9% OFF, https://images.unsplash.com/photo-1509440159596-0249088772ff?w=350&auto=format&fit=crop&q=80, 4.8, False, Zero maida high-fibre whole wheat brown bread.)
add(p_egg1, Farm Fresh White Eggs, Fresh Daily, dairy, bread_eggs, Breads & Eggs, 6 Pack, 54, 60, 10% OFF, https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=350&auto=format&fit=crop&q=80, 4.9, True, Fresh graded poultry eggs from Barwala / Derabassi farms.)

# --- ALL COOKING OILS ---
add(p_oil1, Fortune Kachi Ghani Mustard Oil, Fortune, oils_masalas, cooking_oils, All Cooking Oils, 1 Litre Pouch, 142, 165, 14% OFF, https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&auto=format&fit=crop&q=80, 4.9, False, Pungent cold pressed mustard oil for rich North Indian curries.)
add(p_oil2, Dhara Kachi Ghani Mustard Oil, Dhara, oils_masalas, cooking_oils, All Cooking Oils, 1 Litre Bottle, 148, 170, 13% OFF, https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&auto=format&fit=crop&q=80, 4.85, False, Traditional sarson tel with high pungency and omega-3.)
add(p_oil3, Saffola Gold Pro Blended Oil, Saffola, oils_masalas, cooking_oils, All Cooking Oils, 1 Litre Pouch, 158, 185, 15% OFF, https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&auto=format&fit=crop&q=80, 4.9, False, Rice bran and sunflower blend with antioxidants for heart health.)
add(p_oil4, Fortune Sunlite Refined Sunflower Oil, Fortune, oils_masalas, cooking_oils, All Cooking Oils, 1 Litre Pouch, 135, 155, 13% OFF, https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&auto=format&fit=crop&q=80, 4.8, False, Light, cholesterol-free cooking oil with Vitamin A & D.)
add(p_oil5, Figaro Extra Virgin Olive Oil, Figaro, oils_masalas, cooking_oils, All Cooking Oils, 500 ml Glass, 490, 550, 11% OFF, https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&auto=format&fit=crop&q=80, 4.95, False, Cold extracted extra virgin olive oil for pasta & healthy salads.)
add(p_oil6, Engine Brand Mustard Oil, Engine, oils_masalas, cooking_oils, All Cooking Oils, 1 Litre Bottle, 152, 175, 13% OFF, https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=350&auto=format&fit=crop&q=80, 4.88, True, Iconic pungent mustard oil widely favored across Punjab.)
add(p_ghe1, Verka Pure Desi Ghee, Verka, oils_masalas, ghee_butter, Pure Desi Ghee, 1 Litre Tin, 575, 620, 7% OFF, https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&auto=format&fit=crop&q=80, 4.98, True, Granular (Danedar) pure cow and buffalo milk ghee, pride of Punjab.)
add(p_ghe2, Amul Pure Cow Ghee, Amul, oils_masalas, ghee_butter, Pure Desi Ghee, 1 Litre Jar, 590, 630, 6% OFF, https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&auto=format&fit=crop&q=80, 4.9, False, Aromatic golden cow ghee with natural granular texture.)
add(p_spc1, MDH Degi Mirch Powder, MDH, oils_masalas, spices, Spices & Masalas, 100 g, 82, 90, 9% OFF, https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&auto=format&fit=crop&q=80, 4.9, False, Blend of red chillies giving vibrant restaurant-style gravy colour.)
add(p_spc2, Everest Royal Garam Masala, Everest, oils_masalas, spices, Spices & Masalas, 100 g, 88, 96, 8% OFF, https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&auto=format&fit=crop&q=80, 4.85, False, Finely ground whole spices giving authentic aroma to curries.)
add(p_spc3, Catch Kasuri Methi, Catch, oils_masalas, spices, Spices & Masalas, 50 g, 38, 45, 15% OFF, https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&auto=format&fit=crop&q=80, 4.9, False, Sundried fragrant fenugreek leaves that elevate Punjabi curries.)
add(p_slt1, Tata Salt Vacuum Evaporated, Tata Salt, oils_masalas, spices, Spices & Masalas, 1 kg, 27, 28, 4% OFF, https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=350&auto=format&fit=crop&q=80, 4.95, False, Desh Ka Namak. Pure vacuum evaporated iodised salt.)

# --- ATTA, RICE & DALS ---
add(p_att1, Aashirvaad Sharbati Whole Wheat Atta, Aashirvaad, atta_dals, atta_flours, Atta & Flours, 5 kg, 275, 310, 11% OFF, https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=350&auto=format&fit=crop&q=80, 4.9, False, 100% pure whole wheat MP Sharbati grains for soft, fluffy rotis.)
add(p_att2, Punjab Golden Chakki Fresh Atta, Punjab Golden, atta_dals, atta_flours, Atta & Flours, 5 kg, 240, 270, 11% OFF, https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=350&auto=format&fit=crop&q=80, 4.92, True, Freshly stone-ground wheat from Khanna Mandi with high bran content.)
add(p_ric1, Fortune Special Biryani Basmati Rice, Fortune, atta_dals, rice_grains, Basmati Rice, 1 kg, 145, 175, 17% OFF, https://images.unsplash.com/photo-1586201375761-83865001e31c?w=350&auto=format&fit=crop&q=80, 4.88, False, Extra-long grain aromatic basmati rice aged to perfection.)
add(p_ric2, Daawat Rozana Super Basmati Rice, Daawat, atta_dals, rice_grains, Basmati Rice, 1 kg, 105, 125, 16% OFF, https://images.unsplash.com/photo-1586201375761-83865001e31c?w=350&auto=format&fit=crop&q=80, 4.82, False, Fluffy daily basmati rice for everyday home cooking.)
add(p_dal1, Tata Sampann Unpolished Toor Dal, Tata Sampann, atta_dals, dals_pulses, Dals & Pulses, 1 kg, 175, 195, 10% OFF, https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=350&auto=format&fit=crop&q=80, 4.9, False, Unpolished toor dal rich in natural dietary fibre and protein.)
add(p_dal2, Tata Sampann Kabuli Chana, Tata Sampann, atta_dals, dals_pulses, Dals & Pulses, 500 g, 85, 99, 14% OFF, https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=350&auto=format&fit=crop&q=80, 4.9, False, Large chickpeas for rich Punjabi Amritsari Pindi Chole.)

# --- MANDI FRESH ---
add(p_vg1, Sector 26 Mandi Farm Fresh Tomatoes, Mandi Fresh, produce, fresh_veggies, Fresh Vegetables, 1 kg, 38, 50, 24% OFF, https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=350&auto=format&fit=crop&q=80, 4.9, True, Firm, ripe red tomatoes direct from Chandigarh Sector 26 Sabzi Mandi.)
add(p_vg2, Mohali Subzi Mandi Red Onions, Mandi Fresh, produce, fresh_veggies, Fresh Vegetables, 1 kg, 42, 55, 23% OFF, https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=350&auto=format&fit=crop&q=80, 4.88, True, Crisp red onions sourced from Mohali Phase 8 Sabzi Mandi.)
add(p_vg3, Fresh Pahadi Potatoes (Aloo), Mandi Fresh, produce, fresh_veggies, Fresh Vegetables, 1 kg, 32, 40, 20% OFF, https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=350&auto=format&fit=crop&q=80, 4.82, True, Earthy mountain potatoes that do not turn sweet; great for curries.)
add(p_vg4, Kalka Shimla Fresh Green Capsicum, Mandi Fresh, produce, fresh_veggies, Fresh Vegetables, 500 g, 40, 55, 27% OFF, https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=350&auto=format&fit=crop&q=80, 4.9, True, Crunchy sweet bell peppers from Himachal foothills.)
add(p_vg5, Himalayan Fresh Garlic & Ginger, Mandi Fresh, produce, herbs_aromatics, Herbs & Aromatics, 250g + 250g, 75, 95, 21% OFF, https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=350&auto=format&fit=crop&q=80, 4.92, True, Aromatic juicy ginger and strong-flavoured Himalayan garlic.)
add(p_vg6, Fresh Coriander & Green Chillies, Mandi Fresh, produce, herbs_aromatics, Herbs & Aromatics, 150 g Pack, 20, 30, 33% OFF, https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?w=350&auto=format&fit=crop&q=80, 4.9, True, Crisp green dhania and fiery chillies for garnishing.)
add(p_fr1, Shimla Royal Crisp Apples, Mandi Fresh, produce, fresh_fruits, Fresh Fruits, 4 pcs (500g), 110, 140, 21% OFF, https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=350&auto=format&fit=crop&q=80, 4.88, True, Sweet crunchy orchard-picked apples direct from Kotgarh.)
add(p_fr2, Robusta Ripe Bananas, Mandi Fresh, produce, fresh_fruits, Fresh Fruits, 1 kg (6-7 pcs), 55, 70, 21% OFF, https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=350&auto=format&fit=crop&q=80, 4.85, False, Naturally ripened sweet bananas packed with potassium.)

# --- MUNCHIES & CHIPS ---
add(p_ch1, Lay's India's Magic Masala Chips, Lay's, munchies, chips_crisps, Chips & Crisps, 50 g, 20, 20, HOT, https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=350&auto=format&fit=crop&q=80, 4.9, False, Crispy ridges coated with bold Indian spices.)
add(p_ch2, Kurkure Masala Munch Crisps, Kurkure, munchies, chips_crisps, Chips & Crisps, 80 g, 20, 20, HOT, https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=350&auto=format&fit=crop&q=80, 4.85, False, Crunchy corn puffs with tangy punchy masala.)
add(p_ch3, Haldiram's Nagpur Aloo Bhujia, Haldiram's, munchies, namkeen_biscuits, Namkeen & Biscuits, 200 g, 55, 60, 8% OFF, https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=350&auto=format&fit=crop&q=80, 4.95, False, Spicy potato noodle namkeen spiced with mint and mango powder.)
add(p_bi1, Cadbury Oreo Vanilla Cream Biscuits, Oreo, munchies, namkeen_biscuits, Namkeen & Biscuits, 120 g, 35, 40, 12% OFF, https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=350&auto=format&fit=crop&q=80, 4.9, False, Classic twist, lick and dunk dark cocoa biscuits.)
add(p_bi2, Britannia Good Day Butter Cookies, Britannia, munchies, namkeen_biscuits, Namkeen & Biscuits, 100 g, 30, 35, 14% OFF, https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=350&auto=format&fit=crop&q=80, 4.88, False, Loaded with crunchy roasted cashews and butter.)

# --- COLD DRINKS & BEVERAGES ---
add(p_dr1, Coca-Cola Original Taste, Coca-Cola, beverages, soft_drinks, Soft Drinks, 750 ml Bottle, 40, 40, CHILLED, https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=350&auto=format&fit=crop&q=80, 4.9, False, Chilled refreshing cola drink dispatched ice cold.)
add(p_dr2, Thums Up Charged Carbonated Beverage, Thums Up, beverages, soft_drinks, Soft Drinks, 750 ml Bottle, 40, 40, CHILLED, https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=350&auto=format&fit=crop&q=80, 4.92, False, Taste the thunder! Strong fizzy spicy cola.)
add(p_dr3, Real Activ 100% Mixed Fruit Juice, Real, beverages, juices_energy, Juices & Energy, 1 Litre Tetra, 130, 150, 13% OFF, https://images.unsplash.com/photo-1613478223719-2ab802602423?w=350&auto=format&fit=crop&q=80, 4.85, False, No added sugar, pure blend of 8 fruits.)
add(p_dr4, Red Bull Energy Drink, Red Bull, beverages, juices_energy, Juices & Energy, 250 ml Can, 125, 125, CHILLED, https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=350&auto=format&fit=crop&q=80, 4.95, False, Vitalizes body and mind with caffeine & taurine.)
add(p_dr5, Verka Sweet Punjabi Lassi, Verka, beverages, juices_energy, Juices & Energy, 200 ml Tetra, 20, 22, 9% OFF, https://images.unsplash.com/photo-1550583724-b2692b85b150?w=350&auto=format&fit=crop&q=80, 4.95, True, Creamy chilled Punjabi sweet lassi from Verka plant.)

# --- PERSONAL CARE ---
add(p_pc1, Dettol Original Liquid Handwash Refill, Dettol, personal_care, bathing_hygiene, Bathing & Hygiene, 675 ml Pouch, 99, 125, 21% OFF, https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&auto=format&fit=crop&q=80, 4.9, False, 10x better germ protection with moisturizers.)
add(p_pc2, Dove Intense Repair Keratin Shampoo, Dove, personal_care, bathing_hygiene, Bathing & Hygiene, 180 ml, 150, 180, 17% OFF, https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=350&auto=format&fit=crop&q=80, 4.88, False, Deeply repairs damaged hair with keratin actives.)
add(p_pc3, Colgate Total 12-Hour Protection Toothpaste, Colgate, personal_care, oral_care, Oral Care, 120 g, 105, 120, 12% OFF, https://images.unsplash.com/photo-1559599101-f09722fb4948?w=350&auto=format&fit=crop&q=80, 4.85, False, Whole mouth health: cleans teeth, tongue & gums.)

# --- CLEANING & HOUSEHOLD ---
add(p_cl1, Surf Excel Matic Front Load Liquid, Surf Excel, cleaning, laundry, Laundry & Wash, 1 Litre Pouch, 220, 255, 14% OFF, https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=350&auto=format&fit=crop&q=80, 4.94, False, Faster stain removal in machines with fragrance.)
add(p_cl2, Vim Anti-Smell Dishwash Gel (Lemon), Vim, cleaning, kitchen_cleaning, Dishwash & Surface, 500 ml, 115, 135, 15% OFF, https://images.unsplash.com/photo-1585670270608-b404fb0f498c?w=350&auto=format&fit=crop&q=80, 4.9, False, Cuts tough grease with power of 100 lemons.)
add(p_cl3, Colin Ultra Glass Cleaner Spray, Colin, cleaning, kitchen_cleaning, Dishwash & Surface, 500 ml, 105, 120, 12% OFF, https://images.unsplash.com/photo-1585670270608-b404fb0f498c?w=350&auto=format&fit=crop&q=80, 4.88, False, Streak-free shine across glass, mirror & surfaces.)
add(p_cl4, Origami 3-Ply Kitchen Towels, Origami, cleaning, paper_tissues, Paper & Tissues, 2 Rolls Pack, 120, 140, 14% OFF, https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=350&auto=format&fit=crop&q=80, 4.85, False, Highly absorbent paper rolls for kitchen spills.)

# --- ELECTRONICS ---
add(p_el1, boAt Deuce USB Type-C Fast Cable, boAt, electronics, cables_power, Cables & Power, 1.5m Braided, 249, 499, 50% OFF, https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=350&auto=format&fit=crop&q=80, 4.85, False, Fast charging 3A power cable with nylon braided coat.)
add(p_el2, Duracell Ultra Alkaline AA Batteries, Duracell, electronics, cables_power, Cables & Power, 4 Pack, 160, 180, 11% OFF, https://images.unsplash.com/photo-1619725002198-6a689b72f41d?w=350&auto=format&fit=crop&q=80, 4.95, False, Lasts up to 100% longer with POWERCHECK technology.)

with open(data/products.json, w, encoding=utf-8) as f:
 json.dump(p, f, indent=2)

print(fDONE: Generated {len(p)} products in data/products.json)
