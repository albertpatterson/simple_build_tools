import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import chalk from 'chalk';
import webpackRaw from 'webpack';
import archiver from 'archiver';
import ncp from 'ncp';

/**
 * Convert a callback executing asynchronouse function into a promise returning one
 * @param {Function} fcn asynchronous function that executes a callback
 * @returns {Promise}
 */
export function toProm(fcn) {
  return (...args) =>
    new Promise((res, rej) => {
      fcn(...args, (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
}

/**
 * Copy a single file
 * @async
 * @param {string} src path to the source file
 * @param {string} dest path to the destination file
 * @returns {Promise<void>}
 */
export async function copyFile(src, dest) {
  await assertParentDir(dest);
  await fs.promises.copyFile(src, dest);
}

/**
 * Copy an entire directory
 * @param {string} src path to the source directory
 * @param {string} dest path to the destination directory
 * @returns {Promise<void>}
 */
export async function copyDir(src, dest) {
  await assertParentDir(dest);
  await toProm(ncp)(src, dest);
}

/**
 * Copy and transorm a file
 * @param {string} src path to the source file
 * @param {string} dest path to the destination file
 * @param {Function} transform text transforming funciton
 * @returns {Promise<void>}
 */
export async function transformFile(src, dest, transform) {
  const contents = await fs.promises.readFile(src);
  const transformed = transform(contents);
  await assertParentDir(dest);
  await fs.promises.writeFile(dest, transformed);
}

/**
 * Ensure that a directory exists
 * @param {string} dir the path to the directory that must exist
 * @returns {Promise<void>}
 */
async function assertDir(dir) {
  try {
    await fs.promises.mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Ensure that a file's parent directory exists
 * @param {string} file the path to the file whose parent must exist
 * @returns {Promise<void>}
 */
async function assertParentDir(file) {
  const parent = path.dirname(file);
  await assertDir(parent);
}

/**
 * remove contents recursively
 * @param {string} path the path of the item to be removed
 * @returns {Promise<void>}
 */
export async function rmrf(path) {
  await toProm(rimraf)(path);
}

/**
 * Run a build task and report it's time and result
 * @param {Function} task a build task that should be timed and reported
 * @returns {Promise<void>}
 */
async function runAndReport(task) {
  const start = Date.now();
  const taskName = task.name;
  const doLog = !['runParallelTasks', 'runSeriesTasks'].includes(taskName);
  if (doLog) {
    console.log(chalk.bgHex('#d6e9ff')(`start\t${task.name}`));
  }
  await task();
  if (doLog) {
    console.log(
      chalk.bgHex('#dcffdc')(`finish\t${task.name} in ${Date.now() - start}ms`)
    );
  }
}

/**
 * join a set of tasks in series
 * @param {Function[]} tasks tasks to join
 * @returns {Promise<void>}
 */
export function series(tasks) {
  return async function runSeriesTasks() {
    for (const task of tasks) {
      await runAndReport(task);
    }
  };
}

/**
 * join a set of tasks in parallel
 * @param {Function[]} tasks tasks to join
 * @returns {Promise<void>}
 */
export function parallel(tasks) {
  return async function runParallelTasks() {
    await Promise.all(tasks.map((task) => runAndReport(task)));
  };
}

/**
 * run a task an report it's time and result
 * @param {Function} task task to run and report time and result
 * @returns {Promise<void>}
 */
export async function runTasks(task) {
  const start = Date.now();
  let completed = false;
  try {
    await task();
    completed = true;
  } catch (error) {
    console.error(
      chalk.red('\n' + error.message || error.details || error + '\n')
    );
  }

  const timing = `in ${Date.now() - start}ms`;

  if (completed) {
    console.log(chalk.bgGreen(`Completed ${timing}`));
  } else {
    console.log(chalk.bgRed(`Failed ${timing}`));
  }
}

const webpackAsyncRaw = async (config) =>
  new Promise((res, rej) => {
    webpackRaw(config, (err, stats) => {
      if (err) {
        rej(err);
        return;
      }

      if (stats) {
        const info = stats.toJson();

        if (stats.hasWarnings()) {
          for (const warning of info.warnings) {
            console.warn(
              chalk.yellow(
                '\n' + warning.message || warning.details || warning + '\n'
              )
            );
          }
        }

        if (stats.hasErrors()) {
          rej(info.errors);
          return;
        }
      }

      res(
        stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true, // Shows colors in the console
        })
      );
    });
  });

/**
 * Run webpack and report the result
 * @param {Object} config the webpack config and report result
 * @returns {Promise<string>}
 */
export async function webpack(config) {
  try {
    return await webpackAsyncRaw(config);
  } catch (err) {
    const errs = err instanceof Array ? err : [err];

    const fullMessageParts = [];

    for (const err of errs) {
      fullMessageParts.push(err.message || err.details || err);
    }

    const fullErrorText = fullMessageParts.join('\n\n');

    throw new Error(fullErrorText);
  }
}

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
export function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}
