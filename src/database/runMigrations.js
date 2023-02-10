import fs from 'fs';

async function runMigrations() {
  let data = await fs.promises.readFile('./src/database/migrationsList.txt', 'utf-8');
  const migrationsList = data.trim().split('\n');

  data = await fs.promises.readFile('./src/database/migratedList.txt', 'utf-8');
  const migratedList = data.trim().split('\n');
  const lastMigration = migratedList[migratedList.length-1];

  const writeStream = fs.createWriteStream('./src/database/migratedList.txt', { flags: 'a' });

  let migrationIndex = migrationsList.length-1;
  while (migrationIndex >= 0 && migrationsList[migrationIndex] !== lastMigration) {
    try {
      await import(`../migrations/${migrationsList[migrationIndex]}.js`);
      writeStream.write(migrationsList[migrationIndex]+'\n');
    } catch (error) {
      console.log(`Error running migration ${migrations[migrations.lenght-1]}`);
      console.log(error);
      break;
    }
    migrationIndex--;
  }
};


export default runMigrations;
