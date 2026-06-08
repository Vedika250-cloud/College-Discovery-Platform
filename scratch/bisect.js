const { execSync } = require('child_process');
const fs = require('fs');
const files = fs.readdirSync('src/components').filter(f => f.endsWith('.tsx'));

for (const file of files) {
  console.log(`Testing ${file}...`);
  fs.writeFileSync('scratch/test_tailwind.css', `@import "tailwindcss";\n@source "../components/${file}";`);
  try {
    execSync('npx @tailwindcss/cli -i scratch/test_tailwind.css -o scratch/out.css', { stdio: 'inherit', timeout: 15000 });
    console.log(`[PASS] ${file}`);
  } catch (err) {
    console.log(`[FAIL/HANG] ${file}`);
  }
}
