import { readdirSync, statSync, readFileSync, existsSync,writeFileSync } from 'node:fs';
import { join } from 'node:path';

const directoryPath = process.cwd();

const config = [];

const files = readdirSync(directoryPath);
files.forEach(file => {
  const filePath = join(directoryPath, file);
  const stats = statSync(filePath);

  if (stats.isDirectory()) {
    const packageJsonPath = join(filePath, 'package.json');
    //判断是否存在package.json
    if (!existsSync(packageJsonPath)) {
      return;
    }

    const Buffer = readFileSync(packageJsonPath, 'utf-8');
    const { name, description } = JSON.parse(Buffer);
    config.push({
      name,
      description,
      path: filePath.replace(directoryPath, '').replace(/\\/g, ''),
    });
  }
});

//将config写入到config.json中,格式化
writeFileSync(
  join(directoryPath, 'config.json'),
  JSON.stringify(config, null, 2),
);

