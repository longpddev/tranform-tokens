import { readdir, copyFile, unlink } from "fs/promises";
import { join, extname} from 'path'
async function run () {
  const rootDir = 'dist'
  const result = await readdir(rootDir, {recursive: true});

  const stack = [];
  for(const path of result) {
    const fullPath = join(rootDir, path);
    const extension = extname(fullPath)
    if(extension === '.js') {
      stack.push((async () => {
        const newPath = fullPath.replace(new RegExp(`(${extension})$`), '.mjs')
        await copyFile(fullPath, newPath);
        console.log("🚀 ~ stack.push ~ newPath:", newPath)
        await unlink(fullPath)
      })())
    }
  }

  await Promise.all(stack);

  console.log('rename extension done');
}

run()