require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const config = require('./config.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

const route = config['guild-commands']
  ? Routes.applicationGuildCommands(
      process.env.CLIENT_ID,
      process.env.GUILD_ID
    )
  : Routes.applicationCommands(process.env.CLIENT_ID);

(async () => {
  try {
    console.log('🔄 Registrando comandos...');

    await rest.put(route, { body: commands });

    console.log(
      `✅ Comandos registrados como ${
        config['guild-commands'] ? 'GUILD' : 'GLOBAL'
      }`
    );
  } catch (error) {
    console.error('❌ Error registrando comandos:', error);
  }
})();
