/**
 * @file
 * @author Albert Patterson <albert.patterson.code@gmail.com>
 * @see [Linkedin]{@link https://www.linkedin.com/in/apattersoncmu/}
 * @see [Github]{@link https://github.com/albertpatterson}
 * @see [npm]{@link https://www.npmjs.com/~apatterson189}
 * @see [Youtube]{@link https://www.youtube.com/channel/UCrECEffgWKBMCvn5tar9bYw}
 * @see [Medium]{@link https://medium.com/@albert.patterson.code}
 *
 * Free software under the GPLv3 licence. Permissions of this strong copyleft
 * license are conditioned on making available complete source code of
 * licensed works and modifications, which include larger works using a
 * licensed work, under the same license. Copyright and license notices must
 * be preserved. Contributors provide an express grant of patent rights.
 */

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
