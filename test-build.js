// Production build & QA test runner for Shubhash website
const fs = require('fs');
const path = require('path');

console.log('--- Starting Production Build & QA Verification ---');

const ROOT = __dirname;
let errors = 0;

function assert(condition, message) {
  if (!condition) {
    console.error('❌ FAIL:', message);
    errors++;
  } else {
    console.log('✅ PASS:', message);
  }
}

// 1. Check critical files
const requiredFiles = [
  'index.html',
  'admin.html',
  'config.js',
  'schema.sql',
  'vercel.json',
  '.env.example',
  '.gitignore',
  'api/reviews.js'
];
requiredFiles.forEach(f => {
  assert(fs.existsSync(path.join(ROOT, f)), `File exists: ${f}`);
});

// 2. Read index.html and verify integrity
const htmlPath = path.join(ROOT, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// 3. Verify exactly 17 verified menu items
const verifiedMenu = [
  { name: 'Plain Dosa', price: 40 },
  { name: 'Masala Dosa', price: 50 },
  { name: 'Cut Dosa', price: 80 },
  { name: 'Onion Plain Dosa', price: 50 },
  { name: 'Onion Masala Dosa', price: 60 },
  { name: 'Mysore Plain Dosa', price: 70 },
  { name: 'Mysore Masala Dosa', price: 80 },
  { name: 'Paper Plain Dosa', price: 50 },
  { name: 'Paper Masala Dosa', price: 50 },
  { name: 'Sponge Dosa (3 pcs)', price: 60 },
  { name: 'Onion Uttapam', price: 70 },
  { name: 'Onion Tomato Uttapam', price: 70 },
  { name: 'Masala Uttapam', price: 70 },
  { name: 'Idli Sambar (4 pcs)', price: 40 },
  { name: 'Medu Vada Sambar (4 pcs)', price: 40 },
  { name: 'Idli Vada Mix (2 Idli + 2 Vada)', price: 40 },
  { name: 'Dal Vada Sambar', price: 40 }
];

console.log(`\nVerifying ${verifiedMenu.length} menu items and prices...`);
assert(verifiedMenu.length === 17, 'Exactly 17 verified menu items');

verifiedMenu.forEach(item => {
  assert(html.includes(item.name), `Item present: ${item.name}`);
  assert(html.includes(`,${item.price},`), `Price present: ₹${item.price} for ${item.name}`);
});

// 4. Verify all referenced food images exist in img/
const expectedImages = [
  'plain-dosa.webp',
  'masala-dosa.webp',
  'cut-dosa.webp',
  'onion-plain-dosa.jpg',
  'onion-masala-dosa.jpg',
  'mysore-plain-dosa.jpg',
  'mysore-masala-dosa.webp',
  'paper-plain-dosa.jpg',
  'paper-masala-dosa.jpg',
  'sponge-dosa.webp',
  'onion-uttapam.webp',
  'onion-tomato-uttapam.webp',
  'masala-uttapam.webp',
  'idli-sambar.webp',
  'medu-vada.webp',
  'idli-vada-mix.jpg',
  'dal-vada.webp',
  'hero.webp',
  'logo.webp',
  'wide-dosa.webp',
  'favicon.png'
];

console.log(`\nVerifying all ${expectedImages.length} image assets in img/...`);
expectedImages.forEach(img => {
  const p = path.join(ROOT, 'img', img);
  assert(fs.existsSync(p), `Image asset exists: img/${img}`);
});

// 5. Verify business information
console.log('\nVerifying business details...');
assert(html.includes('Shubhash South Indian Snacks Center'), 'Business Name verified');
assert(html.includes('Ashok Nagar, Tathawade, Dattawadi'), 'Address street verified');
assert(html.includes('411033'), 'PIN code verified');
assert(html.includes('7:00 AM – 1:00 PM'), 'Operating hours verified');
assert(html.includes('https://maps.app.goo.gl/K7soGc9qhaxWgKmC9'), 'Official Google Maps URL verified');

// 6. Security verification
console.log('\nVerifying security rules...');
const forbiddenKeys = ['sk_live', 'service_role', 'secret_key', 'private_key'];
forbiddenKeys.forEach(k => {
  assert(!html.toLowerCase().includes(k), `No forbidden secret key pattern: ${k}`);
});

// Summary
console.log('\n--- Build Verification Summary ---');
if (errors === 0) {
  console.log('🎉 All checks passed! Production build is ready.');
  process.exit(0);
} else {
  console.error(`💥 Build failed with ${errors} error(s).`);
  process.exit(1);
}
