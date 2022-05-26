import fs from 'fs';
import jsdoc2md from 'jsdoc-to-markdown';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const templateText = await fs.promises.readFile(
    path.resolve(__dirname, 'template.md')
  );
  const documentation = await jsdoc2md.render({
    files: path.resolve(__dirname, '..', 'index.js'),
  });

  const fullText = templateText + '\n' + documentation;

  await fs.promises.writeFile(
    path.resolve(__dirname, '..', 'README.md'),
    fullText
  );
})();
