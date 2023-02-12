import fs from 'fs';

const migrate = async () => {
  let data = await fs.promises.readFile('./src/database/migrationsList.txt', 'utf-8');
  const migrationsList = data.trim().split('\n');

  data = await fs.promises.readFile('./src/database/migratedList.txt', 'utf-8');
  const migratedList = data.trim().split('\n');
  const lastMigration = migratedList[migratedList.length-1];

  let migrationIndex = migrationsList.length-1;
  while (migrationIndex >= 0 && migrationsList[migrationIndex] !== lastMigration) {
    try {
      const { up } = await import(`../migrations/${migrationsList[migrationIndex]}.js`);
      const error = await up();
      if (error) {
        throw error;
      }

      console.log('migrated successfully!');
    }
    catch (error) {
      console.log(`error running migration ${migrationsList[migrationIndex]}`);
      console.log(error);
      break;
    }
    migrationIndex--;
  }
};

migrate();
