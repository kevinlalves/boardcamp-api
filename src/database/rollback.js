import fs from 'fs';

const rollback = async () => {
  const data = await fs.promises.readFile('./src/database/migratedList.txt', 'utf-8');
  const migratedList = data.trim().split('\n');

  try {
    const { down } = await import(`../migrations/${migratedList[migratedList.length-1]}.js`);
    const error  = await down();
    if (error) {
      throw error;
    }

    const writeStream = fs.createWriteStream('./src/database/migratedList.txt', { flags: 'w' });
    migratedList.pop();
    writeStream.write(migratedList.join('\n')+'\n');
    console.log('rolled back successfully!');
  }
  catch (error) {
    console.log(`error running rollback ${migratedList[migratedList.length-1]}`);
    console.log(error);
  }
};

rollback();
