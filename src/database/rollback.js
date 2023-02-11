import fs from 'fs';

const rollback = async () => {
  const data = await fs.promises.readFile('./src/database/migratedList.txt', 'utf-8');
  const migratedList = data.trim().split('\n');

  try {
    const { down } = await import(`../migrations/${migratedList[migratedList.length-1]}.js`);

    const error  = await down();
    console.log(error);
    if (error) {
      return;
    }

    const writeStream = fs.createWriteStream('./src/database/migratedList.txt', { flags: 'w' });
    migratedList.pop();
    writeStream.write(migratedList.join('\n'));
  }
  catch (error) {
    console.log(`Error running rollback ${migratedList[migratedList.length-1]}`);
    console.log(error);
  }
};

rollback();
