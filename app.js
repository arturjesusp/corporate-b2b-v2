/* =================================================================
   Roy Turk Industrial Sales Ltd. — landing page prototype logic
   Vanilla JS, no dependencies. 100% client-side (no real network).
   ================================================================= */
(function () {
  'use strict';

  /* ===============================================================
     SAMPLE DATA  —  EDIT PRODUCTS / PRICES HERE
     ---------------------------------------------------------------
     Each product:
       id          unique slug
       name        display name
       brand       manufacturer (Crown Chemical = house brand)
       crown       true  -> Roy Turk house brand styling
       bestSeller  true  -> shown in the "Best Sellers" carousel
       onSpecial   true  -> shown under "Monthly Specials"
       category    primary category (matches a "Shop by Category" tile)
       tags        extra categories this product should appear under
       buckets     search-dropdown buckets it belongs to
       sizes       size / pack badges
       casePricing show the "Case pricing available" tag
       icon        which placeholder glyph to draw
       price       null -> shows "Sign in for pricing" (B2B). Set a
                   string like "$24.95 / 4L" to display a real price.
     =============================================================== */
  var SAMPLE_PRODUCTS = [
    /* ---- Crown Chemical best sellers (house brand) ---- */
    { id: 'crown-winter-rinse', name: 'Winter Rinse Calcium Stain Remover', brand: 'Crown Chemical', crown: true, bestSeller: true, onSpecial: true,
      category: 'Floor Care', tags: ['Cleaning Chemicals', 'Floor Care', 'Monthly Specials'], buckets: ['Chemicals'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'pail', price: null,
      blurb: 'Removes salt, calcium & efflorescence stains from floors.' },

    { id: 'crown-lift-off', name: 'Lift Off Specialty Cleaner', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Degreasers', tags: ['Cleaning Chemicals', 'Degreasers'], buckets: ['Chemicals'],
      sizes: ['1L', '4L'], casePricing: true, icon: 'spray', price: null,
      blurb: 'Lifts adhesive, ink, tar & scuff marks fast.' },

    { id: 'crown-odorex', name: 'Odorex Deodorizer', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Disinfectants & Deodorants', tags: ['Cleaning Chemicals', 'Disinfectants & Deodorants'], buckets: ['Chemicals'],
      sizes: ['4L'], casePricing: true, icon: 'bottle', price: null,
      blurb: 'Industrial odour counteractant for any facility.' },

    { id: 'crown-no-strip-lemon', name: 'No Strip Lemon Neutral Floor Cleaner', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Floor Care', tags: ['Cleaning Chemicals', 'Floor Care'], buckets: ['Chemicals'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'pail', price: null,
      blurb: 'Neutral-pH daily cleaner that won’t dull finish.' },

    { id: 'crown-crystal-clear', name: 'Crystal Clear Glass Cleaner', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Glass Cleaners', tags: ['Cleaning Chemicals', 'Glass Cleaners'], buckets: ['Chemicals'],
      sizes: ['1L', '4L'], casePricing: true, icon: 'spray', price: null,
      blurb: 'Streak-free glass, mirror & surface cleaner.' },

    { id: 'crown-white-pearl', name: 'White Pearl Premium Grade Hand Soap', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Hand Cleaners & Soap', tags: ['Hand Cleaners & Soap', 'Skin Care & Hand Hygiene'], buckets: ['Skin Care'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'soap', price: null,
      blurb: 'Premium pearlized lotion hand soap.' },

    { id: 'crown-pink-pearl', name: 'Pink Pearl Anti-Bacterial Hand Soap', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Hand Cleaners & Soap', tags: ['Hand Cleaners & Soap', 'Skin Care & Hand Hygiene'], buckets: ['Skin Care'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'soap', price: null,
      blurb: 'Anti-bacterial pink lotion soap for high traffic.' },

    { id: 'crown-oven-griddle', name: 'Oven & Griddle Cleaner', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Dishwashing & Kitchen', tags: ['Cleaning Chemicals', 'Degreasers', 'Dishwashing & Kitchen'], buckets: ['Chemicals'],
      sizes: ['1L', '4L'], casePricing: true, icon: 'spray', price: null,
      blurb: 'Heavy-duty cleaner for ovens, grills & griddles.' },

    { id: 'crown-aluminum', name: 'Aluminum Cleaner & Brightener', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Cleaning Chemicals', tags: ['Cleaning Chemicals', 'Degreasers'], buckets: ['Chemicals'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'pail', price: null,
      blurb: 'Acidic brightener for aluminum, trailers & rims.' },

    { id: 'crown-laundry', name: 'Liquid Laundry Detergent', brand: 'Crown Chemical', crown: true, bestSeller: true,
      category: 'Laundry', tags: ['Cleaning Chemicals', 'Laundry'], buckets: ['Chemicals'],
      sizes: ['20L pail'], casePricing: true, icon: 'pail', price: null,
      blurb: 'High-efficiency commercial laundry detergent.' },

    { id: 'crown-enzyme', name: 'Liquid Enzyme Waste Treatment', brand: 'Crown Chemical', crown: true, bestSeller: true, onSpecial: true,
      category: 'Cleaning Chemicals', tags: ['Cleaning Chemicals', 'Monthly Specials'], buckets: ['Chemicals'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'bottle', price: null, badge: 'New',
      blurb: 'Enzyme digestant for drains, grease traps & odours.' },

    /* ---- More Crown house-brand items (fill out categories) ---- */
    { id: 'crown-degreaser', name: 'Heavy-Duty Industrial Degreaser', brand: 'Crown Chemical', crown: true,
      category: 'Degreasers', tags: ['Cleaning Chemicals', 'Degreasers'], buckets: ['Chemicals'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'pail', price: null,
      blurb: 'Cuts baked-on grease in kitchens & shops.' },
    { id: 'crown-disinfectant', name: 'Crown Disinfectant Cleaner (DIN)', brand: 'Crown Chemical', crown: true,
      category: 'Disinfectants & Deodorants', tags: ['Cleaning Chemicals', 'Disinfectants & Deodorants'], buckets: ['Chemicals'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'bottle', price: null,
      blurb: 'Health-Canada DIN disinfectant & sanitizer.' },
    { id: 'crown-bowl', name: 'Bowl & Bathroom Acid Cleaner', brand: 'Crown Chemical', crown: true,
      category: 'Bathroom & Bowl Cleaners', tags: ['Cleaning Chemicals', 'Bathroom & Bowl Cleaners'], buckets: ['Chemicals'],
      sizes: ['1L', '4L'], casePricing: true, icon: 'bottle', price: null,
      blurb: 'Descales bowls, urinals & washroom fixtures.' },
    { id: 'crown-carpet', name: 'Carpet & Upholstery Shampoo', brand: 'Crown Chemical', crown: true,
      category: 'Carpet & Upholstery', tags: ['Cleaning Chemicals', 'Carpet & Upholstery'], buckets: ['Chemicals'],
      sizes: ['4L', '20L pail'], casePricing: true, icon: 'spray', price: null,
      blurb: 'Low-foam extraction shampoo for carpet & fabric.' },

    /* ---- Karcher equipment (Authorized Dealer) ---- */
    { id: 'karcher-hd', name: 'Kärcher HD Cold-Water Pressure Washer', brand: 'Kärcher', crown: false,
      category: 'Equipment & Machines', tags: ['Karcher Equipment', 'Equipment & Machines'], buckets: ['Equipment'],
      sizes: ['Electric'], casePricing: false, icon: 'machine', price: null, badge: 'Authorized Dealer',
      blurb: 'Compact cold-water pressure washer for daily use.' },
    { id: 'karcher-scrubber', name: 'Kärcher Walk-Behind Floor Scrubber', brand: 'Kärcher', crown: false,
      category: 'Equipment & Machines', tags: ['Karcher Equipment', 'Floor Machines', 'Equipment & Machines'], buckets: ['Equipment', 'Floor Machines'],
      sizes: ['Battery'], casePricing: false, icon: 'machine', price: null, badge: 'Authorized Dealer',
      blurb: 'Scrub & dry hard floors in a single pass.' },
    { id: 'nss-pacer', name: 'NSS Pacer Commercial Upright Vacuum', brand: 'NSS', crown: false,
      category: 'Equipment & Machines', tags: ['Floor Machines', 'Equipment & Machines'], buckets: ['Equipment', 'Floor Machines'],
      sizes: ['14 in'], casePricing: false, icon: 'machine', price: null,
      blurb: 'Durable upright vacuum for high-traffic carpet.' },
    { id: 'rubbermaid-brute', name: 'Rubbermaid BRUTE Waste Container', brand: 'Rubbermaid', crown: false,
      category: 'Equipment & Machines', tags: ['Equipment & Machines', 'Safety Supplies'], buckets: ['Equipment'],
      sizes: ['32 gal', '44 gal'], casePricing: false, icon: 'bin', price: null,
      blurb: 'Heavy-duty container for waste & transport.' },

    /* ---- Skin care & hand hygiene ---- */
    { id: 'purell-gel', name: 'Purell Advanced Hand Sanitizer Gel', brand: 'GOJO / Purell', crown: false,
      category: 'Hand Cleaners & Soap', tags: ['Skin Care & Hand Hygiene', 'Hand Cleaners & Soap'], buckets: ['Skin Care'],
      sizes: ['1L refill', '4L'], casePricing: true, icon: 'sanitizer', price: null,
      blurb: '70% alcohol gel — kills 99.99% of germs.' },
    { id: 'gojo-foam', name: 'GOJO Foaming Hand Soap Refill', brand: 'GOJO / Purell', crown: false,
      category: 'Hand Cleaners & Soap', tags: ['Skin Care & Hand Hygiene', 'Hand Cleaners & Soap', 'Dispensers'], buckets: ['Skin Care'],
      sizes: ['1200 mL'], casePricing: true, icon: 'soap', price: null,
      blurb: 'Foaming soap refill for GOJO dispensers.' },

    /* ---- Paper & dispensers ---- */
    { id: 'tork-roll-towel', name: 'Tork Universal Hardwound Roll Towel', brand: 'Tork', crown: false,
      category: 'Paper Products', tags: ['Paper Products'], buckets: ['Paper'],
      sizes: ['800 ft', 'Case of 6'], casePricing: true, icon: 'paper', price: null,
      blurb: 'Economical hardwound roll towel, 6/case.' },
    { id: 'scott-tissue', name: 'Scott Essential Jumbo Roll Tissue', brand: 'Kimberly-Clark', crown: false,
      category: 'Paper Products', tags: ['Paper Products'], buckets: ['Paper'],
      sizes: ['2-ply', 'Case of 12'], casePricing: true, icon: 'paper', price: null,
      blurb: 'JRT jumbo roll bath tissue, 12/case.' },
    { id: 'bobrick-dispenser', name: 'Bobrick Roll Towel Dispenser', brand: 'Bobrick', crown: false,
      category: 'Dispensers', tags: ['Dispensers'], buckets: ['Dispensers'],
      sizes: ['Surface mount'], casePricing: false, icon: 'dispenser', price: null,
      blurb: 'Stainless steel surface-mount towel dispenser.' },

    /* ---- Bags, wipers, safety, shipping ---- */
    { id: 'can-liners', name: 'Industrial Can Liners / Garbage Bags 35×50', brand: 'Roy Turk', crown: false,
      category: 'Garbage Bags', tags: ['Garbage Bags & Liners', 'Garbage Bags'], buckets: ['Garbage Bags'],
      sizes: ['Strong', 'X-Strong', '100/case'], casePricing: true, icon: 'bag', price: null,
      blurb: 'Heavy-gauge can liners, 100 per case.' },
    { id: 'microfiber', name: 'Colour-Coded Microfiber Cloths', brand: 'Roy Turk', crown: false,
      category: 'Wipers & Microfiber', tags: ['Wipers & Microfiber'], buckets: ['Wipers'],
      sizes: ['16×16', '12/pack'], casePricing: true, icon: 'wiper', price: null,
      blurb: 'Lint-free microfibre, 12 per pack.' },
    { id: 'nitrile-gloves', name: 'Powder-Free Nitrile Gloves', brand: 'Roy Turk', crown: false,
      category: 'Safety Supplies', tags: ['Safety Supplies'], buckets: ['Safety'],
      sizes: ['S–XL', '100/box'], casePricing: true, icon: 'glove', price: null,
      blurb: 'Disposable nitrile exam gloves, 100/box.' },
    { id: 'stretch-wrap', name: 'Hand Stretch Wrap / Pallet Film', brand: 'Roy Turk', crown: false,
      category: 'Equipment & Machines', tags: ['Shipping Supplies'], buckets: ['Shipping'],
      sizes: ['18 in', '4 rolls/case'], casePricing: true, icon: 'box', price: null,
      blurb: 'Clear hand stretch film for pallets, 4/case.' },

    /* ---- Seasonal / winter (Monthly Specials) ---- */
    { id: 'ice-melt', name: 'Calcium Chloride Ice Melt Pellets', brand: 'Roy Turk', crown: false, onSpecial: true,
      category: 'Safety Supplies', tags: ['Safety Supplies', 'Monthly Specials'], buckets: ['Safety'],
      sizes: ['20 kg bag'], casePricing: true, icon: 'snow', price: null,
      blurb: 'Fast-acting ice melt rated to −25 °C.' },
    { id: 'entrance-mat', name: 'Scraper Entrance Matting', brand: 'Roy Turk', crown: false, onSpecial: true,
      category: 'Safety Supplies', tags: ['Safety Supplies', 'Monthly Specials'], buckets: ['Safety'],
      sizes: ['3×5', '4×6'], casePricing: false, icon: 'mat', price: null,
      blurb: 'Traps slush & grit at the door all winter.' },
    { id: 'diversey-finish', name: 'Diversey High-Solids Floor Finish', brand: 'Diversey', crown: false,
      category: 'Floor Care', tags: ['Cleaning Chemicals', 'Floor Care'], buckets: ['Chemicals'],
      sizes: ['5L', '20L pail'], casePricing: true, icon: 'pail', price: null,
      blurb: 'Durable high-gloss floor finish / wax.' }
  ];

  /* "Shop by Category" tiles (name must match product.category / tags) */
  var CATEGORIES = [
    { name: 'Cleaning Chemicals', icon: 'bottle' },
    { name: 'Degreasers', icon: 'spray' },
    { name: 'Disinfectants & Deodorants', icon: 'spray' },
    { name: 'Floor Care', icon: 'pail' },
    { name: 'Carpet & Upholstery', icon: 'wiper' },
    { name: 'Glass Cleaners', icon: 'spray' },
    { name: 'Bathroom & Bowl Cleaners', icon: 'bottle' },
    { name: 'Dishwashing & Kitchen', icon: 'bottle' },
    { name: 'Laundry', icon: 'pail' },
    { name: 'Hand Cleaners & Soap', icon: 'soap' },
    { name: 'Paper Products', icon: 'paper' },
    { name: 'Garbage Bags', icon: 'bag' },
    { name: 'Wipers & Microfiber', icon: 'wiper' },
    { name: 'Safety Supplies', icon: 'glove' },
    { name: 'Equipment & Machines', icon: 'machine' },
    { name: 'Dispensers', icon: 'dispenser' }
  ];

  /* Brand strip (Crown is highlighted as the house brand) */
  var BRANDS = ['Kärcher', 'Kimberly-Clark', 'GOJO', 'Purell', 'Deb', 'Tork',
    'Diversey', 'Rubbermaid', '3M', 'NSS', 'Bobrick', 'Crown Chemical'];

  /* ===============================================================
     SVG PLACEHOLDER GENERATOR (inline, offline, descriptive label)
     Swap these for real product photos later.
     =============================================================== */
  var ICONS = {
    pail: function (c) { return "<path d='M70 72 l6 56 a5 5 0 005 5 h38 a5 5 0 005 -5 l6 -56' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M64 72 h72' stroke='" + c + "' stroke-width='5' stroke-linecap='round'/><path d='M77 72 q23 -20 46 0' fill='none' stroke='" + c + "' stroke-width='4'/>"; },
    bottle: function (c) { return "<path d='M88 46 h24 v9 l6 11 v62 a5 5 0 01-5 5 H87 a5 5 0 01-5 -5 V66 l6 -11 z' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><rect x='89' y='88' width='22' height='30' rx='2' fill='none' stroke='" + c + "' stroke-width='3'/><path d='M92 42 h16' stroke='" + c + "' stroke-width='5' stroke-linecap='round'/>"; },
    spray: function (c) { return "<rect x='82' y='80' width='34' height='52' rx='5' fill='none' stroke='" + c + "' stroke-width='4'/><path d='M92 80 V62 h20' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M112 62 l16 -6 v12 z' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M92 70 H78 l-9 -7' fill='none' stroke='" + c + "' stroke-width='4' stroke-linecap='round'/>"; },
    soap: function (c) { return "<rect x='80' y='80' width='40' height='52' rx='6' fill='none' stroke='" + c + "' stroke-width='4'/><path d='M92 80 V64 h16 v16' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M100 64 V52 h18' fill='none' stroke='" + c + "' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/>"; },
    sanitizer: function (c) { return "<rect x='82' y='82' width='36' height='50' rx='6' fill='none' stroke='" + c + "' stroke-width='4'/><path d='M92 82 V66 h16 v16' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M100 66 V54 h16' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M124 70 q5 7 0 13 q-5 -6 0 -13z' fill='" + c + "'/>"; },
    machine: function (c) { return "<rect x='74' y='58' width='44' height='46' rx='6' fill='none' stroke='" + c + "' stroke-width='4'/><path d='M82 72 h28' stroke='" + c + "' stroke-width='4' stroke-linecap='round'/><circle cx='86' cy='124' r='10' fill='none' stroke='" + c + "' stroke-width='4'/><circle cx='112' cy='124' r='10' fill='none' stroke='" + c + "' stroke-width='4'/><path d='M118 68 q22 -4 22 24' fill='none' stroke='" + c + "' stroke-width='4'/>"; },
    paper: function (c) { return "<rect x='72' y='66' width='58' height='46' rx='6' fill='none' stroke='" + c + "' stroke-width='4'/><ellipse cx='72' cy='89' rx='8' ry='23' fill='none' stroke='" + c + "' stroke-width='4'/><path d='M130 89 h14' stroke='" + c + "' stroke-width='4' stroke-linecap='round'/>"; },
    bag: function (c) { return "<path d='M76 74 h48 l-5 56 a5 5 0 01-5 5 H86 a5 5 0 01-5 -5 z' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M80 74 q4 -16 20 -16 t20 16' fill='none' stroke='" + c + "' stroke-width='4'/>"; },
    glove: function (c) { return "<path d='M82 132 V98 q0 -8 -4 -14 a6 6 0 0110 -5 q3 4 4 9 V58 a6 6 0 0112 0 v18 q4 -1 8 1 v4 q5 -1 8 3 v22 a18 18 0 01-6 14 v10 z' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/>"; },
    wiper: function (c) { return "<path d='M70 70 h60 v40 q-15 9 -30 1 q-15 -8 -30 1 z' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M70 84 h60 M70 97 h60' stroke='" + c + "' stroke-width='2' opacity='.55'/>"; },
    bin: function (c) { return "<path d='M77 76 l5 54 a5 5 0 005 5 h26 a5 5 0 005 -5 l5 -54' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><rect x='70' y='66' width='60' height='10' rx='3' fill='none' stroke='" + c + "' stroke-width='4'/><path d='M92 88 v38 M108 88 v38' stroke='" + c + "' stroke-width='3' opacity='.55'/>"; },
    dispenser: function (c) { return "<rect x='76' y='54' width='48' height='66' rx='8' fill='none' stroke='" + c + "' stroke-width='4'/><circle cx='100' cy='76' r='8' fill='none' stroke='" + c + "' stroke-width='3'/><path d='M90 108 h20' stroke='" + c + "' stroke-width='4' stroke-linecap='round'/><path d='M88 120 v8 h24 v-8' fill='none' stroke='" + c + "' stroke-width='4'/>"; },
    box: function (c) { return "<path d='M70 80 l30 -16 30 16 v34 l-30 16 -30 -16 z' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M70 80 l30 16 30 -16 M100 96 v34' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/>"; },
    snow: function (c) { return "<g stroke='" + c + "' stroke-width='4' stroke-linecap='round'><path d='M100 48 v60 M74 63 l52 30 M126 63 l-52 30'/><path d='M100 48 l-8 11 M100 48 l8 11 M100 108 l-8 -11 M100 108 l8 -11 M74 63 l1 13 M74 63 l13 1 M126 63 l-1 13 M126 63 l-13 1'/></g>"; },
    mat: function (c) { return "<path d='M64 94 l36 -17 36 17 -36 17 z' fill='none' stroke='" + c + "' stroke-width='4' stroke-linejoin='round'/><path d='M80 92 l20 -9 M92 98 l20 -9 M88 86 l20 9 M100 102 l20 -9' stroke='" + c + "' stroke-width='2' opacity='.55'/>"; }
  };

  function escapeXml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Returns a data-URI SVG thumbnail with a descriptive label. */
  function placeholderImage(label, icon, crown) {
    // Hatched "blueprint" placeholder with a faint icon watermark + uppercase label.
    var stroke = crown ? '#e32613' : '#7a8590';
    var draw = (ICONS[icon] || ICONS.bottle)(stroke);
    var short = (label.length > 26 ? label.slice(0, 25) + '…' : label).toUpperCase();
    var svg =
      "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' role='img'>" +
      "<defs><pattern id='hatch' width='28' height='28' patternUnits='userSpaceOnUse' patternTransform='rotate(45)'>" +
      "<rect width='28' height='28' fill='#e9ebee'/><rect width='14' height='28' fill='#e2e5e9'/></pattern></defs>" +
      "<rect width='200' height='200' fill='url(#hatch)'/>" +
      "<g opacity='0.5'>" + draw + "</g>" +
      "<text x='100' y='178' text-anchor='middle' font-family='Arial,Helvetica,sans-serif' font-size='11' font-weight='700' letter-spacing='1.6' fill='#9aa3ac'>" + escapeXml(short) + "</text>" +
      "</svg>";
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }

  /* ===============================================================
     Small helpers + element refs
     =============================================================== */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var els = {
    header: $('#siteHeader'),
    // search
    searchForm: $('#searchForm'), searchInput: $('#searchInput'), searchCat: $('#searchCat'), searchResults: $('#searchResults'),
    // quote cart
    openQuote: $('#openQuote'), openQuoteFooter: $('#openQuoteFooter'), quoteCount: $('#quoteCount'),
    quotePanel: $('#quotePanel'), quoteClose: $('#quoteClose'), quoteBody: $('#quoteBody'),
    quotePanelCount: $('#quotePanelCount'), submitQuote: $('#submitQuote'),
    // mega
    openMenu: $('#openMenu'), openMenuMobile: $('#openMenuMobile'), megaMenu: $('#megaMenu'), megaClose: $('#megaClose'), megaList: $('#megaList'),
    // hero
    heroViewport: $('#heroViewport'), heroPrev: $('#heroPrev'), heroNext: $('#heroNext'), heroDots: $('#heroDots'),
    // products
    productTrack: $('#productTrack'), productCarousel: $('#productCarousel'), prodPrev: $('#prodPrev'), prodNext: $('#prodNext'),
    productsHeading: $('#productsHeading'), productsFilter: $('#productsFilter'), productsChip: $('#productsChip'),
    // category + brand
    categoryGrid: $('#categoryGrid'), brandStrip: $('#brandStrip'),
    // modal
    modal: $('#quoteModal'), modalClose: $('#modalClose'), quoteForm: $('#quoteForm'),
    modalSuccess: $('#modalSuccess'), modalDone: $('#modalDone'),
    // misc
    backdrop: $('#backdrop'), toast: $('#toast'), backToTop: $('#backToTop')
  };

  /* ===============================================================
     TOAST
     =============================================================== */
  var toastTimer;
  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.hidden = false;
    requestAnimationFrame(function () { els.toast.classList.add('is-open'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      els.toast.classList.remove('is-open');
      setTimeout(function () { els.toast.hidden = true; }, 220);
    }, 2600);
  }

  /* ===============================================================
     PRODUCT RENDERING + category/search filtering
     =============================================================== */
  function bestSellers() { return SAMPLE_PRODUCTS.filter(function (p) { return p.bestSeller; }); }

  function inCategory(p, cat) {
    if (cat === 'Crown Chemical Brand') return p.crown;
    if (cat === 'Monthly Specials') return p.onSpecial;
    return p.category === cat || (p.tags || []).indexOf(cat) !== -1;
  }

  function productCardHTML(p) {
    var sizes = (p.sizes || []).map(function (s) { return '<span class="product__size">' + escapeHtml(s) + '</span>'; }).join('');
    var caseTag = p.casePricing
      ? '<span class="product__case"><svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M5 12.5l4 4 10-10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>Case pricing available</span>'
      : '';
    var price = p.price
      ? '<p class="product__price"><strong>' + escapeHtml(p.price) + '</strong></p>'
      : '<p class="product__price">Sign in for pricing</p>';
    var badge = p.badge ? '<span class="product__brandtag" style="left:auto;right:8px;background:#E31E26;color:#fff;border-color:#E31E26">' + escapeHtml(p.badge) + '</span>' : '';
    var alt = p.name + ' — ' + p.brand + ' (placeholder image)';
    return '' +
      '<li class="product' + (p.crown ? ' product--crown' : '') + '">' +
        '<div class="product__imgwrap">' +
          '<img class="product__img" loading="lazy" decoding="async" width="186" height="186" src="' + placeholderImage(p.name, p.icon, p.crown) + '" alt="' + escapeHtml(alt) + '">' +
          '<span class="product__brandtag">' + escapeHtml(p.brand) + '</span>' + badge +
        '</div>' +
        '<h3 class="product__name">' + escapeHtml(p.name) + '</h3>' +
        '<div class="product__sizes">' + sizes + '</div>' +
        caseTag + price +
        '<div class="product__btn"><button class="btn btn--primary" type="button" data-add="' + p.id + '">Add to Quote</button></div>' +
      '</li>';
  }

  // current product view state
  var view = { type: 'best' };

  function applyProductView(next) {
    view = next;
    var list, heading, chipLabel = null, grid = true;

    if (next.type === 'category') {
      list = SAMPLE_PRODUCTS.filter(function (p) { return inCategory(p, next.cat); });
      heading = next.cat;
      chipLabel = next.cat;
    } else if (next.type === 'search') {
      list = searchMatches(next.query, next.bucket);
      heading = 'Results for “' + next.query + '”';
      chipLabel = '“' + next.query + '”';
    } else {
      list = bestSellers();
      heading = 'Crown Chemical Best Sellers';
      grid = false;
    }

    els.productsHeading.textContent = heading;
    els.productCarousel.classList.toggle('is-grid', grid);
    els.productTrack.classList.toggle('is-grid', grid);

    if (list.length === 0) {
      els.productTrack.innerHTML =
        '<li class="panel__empty" style="grid-column:1/-1">' +
          '<p>No products found in <strong>' + escapeHtml(heading.replace('Results for ', '')) + '</strong> yet.</p>' +
          '<button class="btn btn--primary" type="button" data-open-modal="quote">Request a Quote</button>' +
        '</li>';
    } else {
      els.productTrack.innerHTML = list.map(productCardHTML).join('');
    }

    // filter chip (clear control)
    if (chipLabel) {
      els.productsFilter.hidden = false;
      els.productsChip.innerHTML = escapeHtml(list.length + ' result' + (list.length === 1 ? '' : 's') + ' · ' + chipLabel) +
        ' <button type="button" id="clearFilter" aria-label="Clear filter">×</button>';
    } else {
      els.productsFilter.hidden = true;
      els.productsChip.innerHTML = '';
    }
    els.productTrack.scrollLeft = 0;
    updateProdArrows();
  }

  function renderCategoryTiles() {
    els.categoryGrid.innerHTML = CATEGORIES.map(function (c) {
      return '<li><button class="cat-tile" type="button" data-cat="' + escapeHtml(c.name) + '">' +
        '<img class="cat-tile__img" loading="lazy" decoding="async" width="200" height="200" src="' + placeholderImage(c.name, c.icon, false) + '" alt="' + escapeHtml(c.name) + ' category">' +
        '<span class="cat-tile__name">' + escapeHtml(c.name) + '</span>' +
      '</button></li>';
    }).join('');
  }

  function renderBrandStrip() {
    els.brandStrip.innerHTML = BRANDS.map(function (b) {
      var crown = b === 'Crown Chemical';
      return '<li class="' + (crown ? 'is-crown' : '') + '">' + escapeHtml(b) + '</li>';
    }).join('');
  }

  function renderMegaList() {
    var cats = ['Cleaning Chemicals', 'Crown Chemical Brand', 'Paper Products', 'Garbage Bags & Liners',
      'Skin Care & Hand Hygiene', 'Karcher Equipment', 'Floor Machines', 'Wipers & Microfiber',
      'Safety Supplies', 'Shipping Supplies', 'Dispensers', 'Monthly Specials'];
    els.megaList.innerHTML = cats.map(function (c) {
      return '<li><a href="#products" data-cat="' + escapeHtml(c) + '">' + escapeHtml(c) + '</a></li>';
    }).join('');
  }

  /* Product carousel arrows */
  function updateProdArrows() {
    var t = els.productTrack;
    if (t.classList.contains('is-grid')) { els.prodPrev.hidden = true; els.prodNext.hidden = true; return; }
    var max = t.scrollWidth - t.clientWidth - 2;
    els.prodPrev.hidden = t.scrollLeft <= 2;
    els.prodNext.hidden = t.scrollLeft >= max;
  }
  function scrollProducts(dir) {
    var amount = Math.min(els.productTrack.clientWidth * 0.9, 520);
    els.productTrack.scrollBy({ left: dir * amount, behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  /* ===============================================================
     QUOTE CART
     =============================================================== */
  var quote = {}; // id -> qty

  function quoteCountTotal() {
    return Object.keys(quote).reduce(function (n, id) { return n + quote[id]; }, 0);
  }
  function findProduct(id) {
    for (var i = 0; i < SAMPLE_PRODUCTS.length; i++) { if (SAMPLE_PRODUCTS[i].id === id) return SAMPLE_PRODUCTS[i]; }
    return null;
  }
  function updateQuoteBadge() {
    var n = quoteCountTotal();
    els.quoteCount.textContent = n;
    els.openQuote.setAttribute('aria-label', 'Open quote cart, ' + n + ' item' + (n === 1 ? '' : 's'));
    els.quotePanelCount.textContent = '(' + n + ')';
    els.submitQuote.disabled = n === 0;
    // bump animation
    els.quoteCount.classList.add('is-bump');
    setTimeout(function () { els.quoteCount.classList.remove('is-bump'); }, 160);
  }

  function addToQuote(id) {
    var p = findProduct(id); if (!p) return;
    quote[id] = (quote[id] || 0) + 1;
    updateQuoteBadge();
    renderQuotePanel();
    showToast('Added “' + p.name + '” to your quote');
  }
  function setQty(id, qty) {
    if (qty <= 0) { delete quote[id]; } else { quote[id] = qty; }
    updateQuoteBadge();
    renderQuotePanel();
  }

  function renderQuotePanel() {
    var ids = Object.keys(quote);
    if (ids.length === 0) {
      els.quoteBody.innerHTML =
        '<div class="q-empty">' +
          '<svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true"><path d="M3 4h2l2.2 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 8H6.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9.5" cy="20" r="1.6" fill="currentColor"/><circle cx="18" cy="20" r="1.6" fill="currentColor"/></svg>' +
          '<p>Your quote request is empty.</p>' +
          '<button class="btn btn--primary" type="button" data-close-overlay data-scroll="#products">Browse best sellers</button>' +
        '</div>';
      return;
    }
    els.quoteBody.innerHTML = ids.map(function (id) {
      var p = findProduct(id); var qty = quote[id];
      return '<div class="q-item">' +
        '<img class="q-item__img" src="' + placeholderImage(p.name, p.icon, p.crown) + '" alt="" loading="lazy">' +
        '<div class="q-item__main">' +
          '<p class="q-item__name">' + escapeHtml(p.name) + '</p>' +
          '<p class="q-item__meta">' + escapeHtml(p.brand) + (p.sizes ? ' · ' + escapeHtml(p.sizes[0]) : '') + '</p>' +
          '<div class="q-item__controls">' +
            '<span class="stepper">' +
              '<button type="button" data-dec="' + id + '" aria-label="Decrease quantity of ' + escapeHtml(p.name) + '">−</button>' +
              '<span aria-live="polite">' + qty + '</span>' +
              '<button type="button" data-inc="' + id + '" aria-label="Increase quantity of ' + escapeHtml(p.name) + '">+</button>' +
            '</span>' +
            '<button class="q-item__remove" type="button" data-remove="' + id + '">Remove</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function submitQuoteRequest() {
    if (quoteCountTotal() === 0) return;
    quote = {};
    updateQuoteBadge();
    els.quoteBody.innerHTML =
      '<div class="q-empty">' +
        '<svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="none" stroke="#0a7d33" stroke-width="1.8"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#0a7d33" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '<p><strong>Thanks, we’ll be in touch!</strong></p>' +
        '<p style="font-size:13px">Your quote request was received. A Roy Turk rep will follow up with pricing &amp; availability. <br>(Prototype — nothing was actually sent.)</p>' +
        '<button class="btn btn--outline" type="button" data-close-overlay>Keep browsing</button>' +
      '</div>';
    showToast('Quote request submitted — thanks!');
  }

  /* ===============================================================
     LIVE SEARCH
     =============================================================== */
  function bucketMatch(p, bucket) { return bucket === 'All' || (p.buckets || []).indexOf(bucket) !== -1; }

  function searchMatches(query, bucket) {
    var q = query.trim().toLowerCase();
    if (!q) return [];
    return SAMPLE_PRODUCTS.filter(function (p) {
      if (!bucketMatch(p, bucket)) return false;
      var hay = (p.name + ' ' + p.brand + ' ' + p.category + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function highlight(text, query) {
    var q = query.trim();
    if (!q) return escapeHtml(text);
    var idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return escapeHtml(text);
    return escapeHtml(text.slice(0, idx)) + '<mark>' + escapeHtml(text.slice(idx, idx + q.length)) + '</mark>' + escapeHtml(text.slice(idx + q.length));
  }

  var activeResult = -1;
  function renderSearch() {
    var query = els.searchInput.value;
    var bucket = els.searchCat.value;
    activeResult = -1;
    if (!query.trim()) { closeSearch(); return; }
    var matches = searchMatches(query, bucket);
    var html;
    if (matches.length === 0) {
      html = '<p class="search__empty">No products match “' + escapeHtml(query.trim()) + '”.<br>Try “soap”, “paper”, “Kärcher” or “winter”.</p>';
    } else {
      html = matches.slice(0, 7).map(function (p, i) {
        return '<button class="search__result" type="button" role="option" data-result="' + p.id + '" data-index="' + i + '">' +
          '<img src="' + placeholderImage(p.name, p.icon, p.crown) + '" alt="" loading="lazy">' +
          '<span><span class="search__result-name">' + highlight(p.name, query) + '</span><br>' +
          '<span class="search__result-meta">' + escapeHtml(p.brand + ' · ' + p.category) + '</span></span>' +
        '</button>';
      }).join('');
      html += '<button class="search__viewall" type="button" id="searchViewAll">See all ' + matches.length + ' result' + (matches.length === 1 ? '' : 's') + ' →</button>';
    }
    els.searchResults.innerHTML = html;
    els.searchResults.hidden = false;
    els.searchInput.setAttribute('aria-expanded', 'true');
  }
  function closeSearch() {
    els.searchResults.hidden = true;
    els.searchResults.innerHTML = '';
    els.searchInput.setAttribute('aria-expanded', 'false');
    activeResult = -1;
  }
  function commitSearch() {
    var query = els.searchInput.value.trim();
    if (!query) return;
    applyProductView({ type: 'search', query: query, bucket: els.searchCat.value });
    closeSearch();
    smoothScrollTo('#products');
  }
  function moveActive(delta) {
    var items = els.searchResults.querySelectorAll('.search__result');
    if (!items.length) return;
    activeResult = (activeResult + delta + items.length) % items.length;
    items.forEach(function (it, i) { it.classList.toggle('is-active', i === activeResult); if (i === activeResult) it.scrollIntoView({ block: 'nearest' }); });
  }

  /* ===============================================================
     HERO CAROUSEL
     =============================================================== */
  var heroSlides = Array.prototype.slice.call(document.querySelectorAll('.hero__slide'));
  var heroIndex = 0, heroTimer = null;

  function buildHeroDots() {
    var frag = '';
    for (var i = 0; i < heroSlides.length; i++) {
      frag += '<button type="button" role="tab" aria-label="Go to slide ' + (i + 1) + '" data-hero-dot="' + i + '"' + (i === 0 ? ' aria-selected="true"' : ' aria-selected="false"') + '></button>';
    }
    els.heroDots.innerHTML = frag;
  }
  function showHero(i) {
    heroIndex = (i + heroSlides.length) % heroSlides.length;
    heroSlides.forEach(function (s, idx) {
      var on = idx === heroIndex;
      s.hidden = !on;
      s.classList.toggle('is-active', on);
    });
    var dots = els.heroDots.querySelectorAll('[data-hero-dot]');
    dots.forEach(function (d, idx) { d.setAttribute('aria-selected', idx === heroIndex ? 'true' : 'false'); });
  }
  function nextHero() { showHero(heroIndex + 1); }
  function startHero() {
    if (prefersReduced || heroSlides.length < 2) return;
    stopHero();
    heroTimer = setInterval(nextHero, 6000);
  }
  function stopHero() { if (heroTimer) { clearInterval(heroTimer); heroTimer = null; } }
  function resetHero() { stopHero(); startHero(); }

  /* ===============================================================
     OVERLAYS (mega menu / quote panel / modal) — single active
     =============================================================== */
  var activeOverlay = null, lastFocused = null;
  function focusable(el) {
    return Array.prototype.slice.call(el.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )).filter(function (n) { return n.offsetParent !== null || n === document.activeElement; });
  }
  function trapTab(e) {
    if (e.key !== 'Tab' || !activeOverlay) return;
    var f = focusable(activeOverlay);
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function openOverlay(el, trigger) {
    if (activeOverlay === el) return;
    if (activeOverlay) closeOverlay(true);
    lastFocused = trigger || document.activeElement;
    el.hidden = false; els.backdrop.hidden = false;
    requestAnimationFrame(function () { els.backdrop.classList.add('is-open'); el.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    activeOverlay = el;
    if (trigger && trigger.setAttribute) trigger.setAttribute('aria-expanded', 'true');
    el._trigger = trigger || null;
    var f = focusable(el); if (f.length) f[0].focus();
    document.addEventListener('keydown', trapTab);
  }
  function closeOverlay(skipFocus) {
    var el = activeOverlay; if (!el) return;
    el.classList.remove('is-open'); els.backdrop.classList.remove('is-open');
    document.removeEventListener('keydown', trapTab);
    var trig = el._trigger;
    if (trig && trig.setAttribute) trig.setAttribute('aria-expanded', 'false');
    setTimeout(function () { el.hidden = true; if (!activeOverlay) els.backdrop.hidden = true; }, 220);
    document.body.style.overflow = '';
    activeOverlay = null;
    if (!skipFocus && lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* ===============================================================
     MODAL (quote request form)
     =============================================================== */
  function openModal(trigger) {
    els.quoteForm.hidden = false;
    els.modalSuccess.hidden = true;
    els.quoteForm.reset();
    clearErrors();
    openOverlay(els.modal, trigger);
  }
  function clearErrors() {
    els.quoteForm.querySelectorAll('.field').forEach(function (f) { f.classList.remove('is-invalid'); });
    els.quoteForm.querySelectorAll('.field__error').forEach(function (e) { e.textContent = ''; });
  }
  function setError(id, msg) {
    var input = $('#' + id);
    var field = input.closest('.field');
    field.classList.add('is-invalid');
    $('#' + id + 'Err').textContent = msg;
    input.setAttribute('aria-invalid', 'true');
  }
  function validateQuoteForm() {
    clearErrors();
    var ok = true, firstBad = null;
    var name = $('#qName'), company = $('#qCompany'), email = $('#qEmail'), msg = $('#qMessage');
    if (!name.value.trim()) { setError('qName', 'Please enter your name.'); ok = false; firstBad = firstBad || name; }
    if (!company.value.trim()) { setError('qCompany', 'Please enter your company.'); ok = false; firstBad = firstBad || company; }
    if (!email.value.trim()) { setError('qEmail', 'Please enter your email.'); ok = false; firstBad = firstBad || email; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError('qEmail', 'Please enter a valid email.'); ok = false; firstBad = firstBad || email; }
    if (!msg.value.trim()) { setError('qMessage', 'Tell us what you need a quote on.'); ok = false; firstBad = firstBad || msg; }
    if (!ok && firstBad) firstBad.focus();
    return ok;
  }

  /* ===============================================================
     SMOOTH SCROLL with sticky-header offset
     =============================================================== */
  function headerHeight() { return els.header ? els.header.offsetHeight : 0; }
  function smoothScrollTo(sel) {
    var target = document.querySelector(sel);
    if (!target) return;
    var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight() - 8;
    window.scrollTo({ top: Math.max(0, top), behavior: prefersReduced ? 'auto' : 'smooth' });
  }
  function setHeaderVar() {
    document.documentElement.style.setProperty('--header-h', headerHeight() + 'px');
  }

  /* ===============================================================
     EVENT WIRING
     =============================================================== */
  function init() {
    renderCategoryTiles();
    renderBrandStrip();
    renderMegaList();
    buildHeroDots();
    showHero(0);
    startHero();
    applyProductView({ type: 'best' });
    updateQuoteBadge();
    renderQuotePanel();
    setHeaderVar();

    /* ---- Global click delegation ---- */
    document.addEventListener('click', function (e) {
      var t = e.target;

      // open quote-request modal
      var modalTrig = t.closest('[data-open-modal]');
      if (modalTrig) { e.preventDefault(); openModal(modalTrig); return; }

      // simple toast links (disabled prototype features)
      var toastEl = t.closest('[data-toast]');
      if (toastEl) { e.preventDefault(); showToast(toastEl.getAttribute('data-toast')); return; }

      // category / nav filter links
      var catEl = t.closest('[data-cat]');
      if (catEl) {
        e.preventDefault();
        var cat = catEl.getAttribute('data-cat');
        var href = catEl.getAttribute('href') || '#products';
        applyProductView({ type: 'category', cat: cat });
        if (activeOverlay) closeOverlay(true);
        smoothScrollTo(href);
        return;
      }

      // generic close-overlay buttons (inside panels)
      if (t.closest('[data-close-overlay]')) {
        var sc = t.closest('[data-close-overlay]').getAttribute('data-scroll');
        closeOverlay();
        if (sc) setTimeout(function () { smoothScrollTo(sc); }, 260);
        return;
      }

      // in-page anchors (smooth scroll)
      var anchor = t.closest('a[href^="#"]');
      if (anchor) {
        var hash = anchor.getAttribute('href');
        if (hash.length > 1) {
          e.preventDefault();
          if (activeOverlay) closeOverlay(true);
          smoothScrollTo(hash);
        }
        return;
      }
    });

    /* ---- Add to quote (delegated) ---- */
    els.productTrack.addEventListener('click', function (e) {
      var add = e.target.closest('[data-add]');
      if (add) addToQuote(add.getAttribute('data-add'));
    });

    /* ---- Clear product filter ---- */
    els.productsChip.addEventListener('click', function (e) {
      if (e.target.id === 'clearFilter') applyProductView({ type: 'best' });
    });

    /* ---- Quote panel controls (delegated) ---- */
    els.quoteBody.addEventListener('click', function (e) {
      var inc = e.target.closest('[data-inc]'); var dec = e.target.closest('[data-dec]'); var rm = e.target.closest('[data-remove]');
      if (inc) { var id = inc.getAttribute('data-inc'); setQty(id, (quote[id] || 0) + 1); }
      else if (dec) { var id2 = dec.getAttribute('data-dec'); setQty(id2, (quote[id2] || 0) - 1); }
      else if (rm) { setQty(rm.getAttribute('data-remove'), 0); }
    });
    els.submitQuote.addEventListener('click', submitQuoteRequest);

    /* ---- Quote panel open/close ---- */
    els.openQuote.addEventListener('click', function () { openOverlay(els.quotePanel, els.openQuote); });
    els.openQuoteFooter.addEventListener('click', function () { openOverlay(els.quotePanel, els.openQuoteFooter); });
    els.quoteClose.addEventListener('click', function () { closeOverlay(); });

    /* ---- Mega menu ---- */
    els.openMenu.addEventListener('click', function () { openOverlay(els.megaMenu, els.openMenu); });
    els.openMenuMobile.addEventListener('click', function () { openOverlay(els.megaMenu, els.openMenuMobile); });
    els.megaClose.addEventListener('click', function () { closeOverlay(); });

    /* ---- Backdrop + Escape ---- */
    els.backdrop.addEventListener('click', function () { closeOverlay(); });
    els.modal.addEventListener('click', function (e) { if (e.target === els.modal) closeOverlay(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        if (!els.searchResults.hidden) { closeSearch(); return; }
        if (activeOverlay) closeOverlay();
      }
    });

    /* ---- Modal close / done ---- */
    els.modalClose.addEventListener('click', function () { closeOverlay(); });
    els.modalDone.addEventListener('click', function () { closeOverlay(); });
    els.quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateQuoteForm()) return;
      els.quoteForm.hidden = true;
      els.modalSuccess.hidden = false;
      els.modalDone.focus();
    });

    /* ---- Hero carousel controls ---- */
    els.heroPrev.addEventListener('click', function () { showHero(heroIndex - 1); resetHero(); });
    els.heroNext.addEventListener('click', function () { showHero(heroIndex + 1); resetHero(); });
    els.heroDots.addEventListener('click', function (e) {
      var dot = e.target.closest('[data-hero-dot]');
      if (dot) { showHero(parseInt(dot.getAttribute('data-hero-dot'), 10)); resetHero(); }
    });
    els.heroViewport.addEventListener('mouseenter', stopHero);
    els.heroViewport.addEventListener('mouseleave', startHero);
    els.heroViewport.addEventListener('focusin', stopHero);
    els.heroViewport.addEventListener('focusout', startHero);
    document.addEventListener('visibilitychange', function () { if (document.hidden) stopHero(); else startHero(); });

    /* ---- Product carousel arrows ---- */
    els.prodPrev.addEventListener('click', function () { scrollProducts(-1); });
    els.prodNext.addEventListener('click', function () { scrollProducts(1); });
    var prodTick = false;
    els.productTrack.addEventListener('scroll', function () {
      if (prodTick) return; prodTick = true;
      requestAnimationFrame(function () { updateProdArrows(); prodTick = false; });
    });

    /* ---- Search ---- */
    var searchDebounce;
    els.searchInput.addEventListener('input', function () {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(renderSearch, 120);
    });
    els.searchCat.addEventListener('change', function () { if (els.searchInput.value.trim()) renderSearch(); });
    els.searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveActive(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveActive(-1); }
      else if (e.key === 'Enter') {
        var items = els.searchResults.querySelectorAll('.search__result');
        if (activeResult >= 0 && items[activeResult]) { e.preventDefault(); items[activeResult].click(); }
        // else: let the form submit handler run
      }
    });
    els.searchForm.addEventListener('submit', function (e) { e.preventDefault(); commitSearch(); });
    els.searchResults.addEventListener('click', function (e) {
      var res = e.target.closest('[data-result]');
      if (res) {
        els.searchInput.value = findProduct(res.getAttribute('data-result')).name;
        commitSearch();
        return;
      }
      if (e.target.id === 'searchViewAll') commitSearch();
    });
    // close search dropdown on outside click
    document.addEventListener('click', function (e) {
      if (!els.searchForm.contains(e.target)) closeSearch();
    });

    /* ---- Back to top ---- */
    els.backToTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' }); });

    /* ---- Sticky header state + measurements ---- */
    var stuckTick = false;
    window.addEventListener('scroll', function () {
      if (stuckTick) return; stuckTick = true;
      requestAnimationFrame(function () {
        els.header.classList.toggle('is-stuck', window.scrollY > 4);
        stuckTick = false;
      });
    }, { passive: true });
    window.addEventListener('resize', function () { setHeaderVar(); updateProdArrows(); });
    window.addEventListener('load', setHeaderVar);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
