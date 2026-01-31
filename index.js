require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();
client.interactionActions = new Collection();


// Cargar comandos
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  client.commands.set(command.data.name, command);
}

const actionsPath = path.join(__dirname, 'acciones');
if (fs.existsSync(actionsPath)) {
  const actionFiles = fs.readdirSync(actionsPath).filter(f => f.endsWith('.js'));

  for (const file of actionFiles) {
    const action = require(path.join(actionsPath, file));
    if (action.customId && action.execute) {
      client.interactionActions.set(action.customId, action);
    }
  }
}

client.once('clientReady', () => {
  console.log(`🤖 Bot conectado como ${client.user.tag}`);
  client.user.setPresence({
    activities: [{
        type: ActivityType.Custom,
        name: config.status.name,
        state: config.status.text
    }],
    status: config.status['type-online'] // e.g. "online"
});
});

client.on('interactionCreate', async interaction => {

  // 🔹 SLASH COMMANDS
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: '❌ Error al ejecutar el comando',
        ephemeral: true
      });
    }
    return;
  }

  // 🔹 BOTONES / MENÚS / MODALES
  if (
    interaction.isButton() ||
    interaction.isStringSelectMenu() ||
    interaction.isModalSubmit()
  ) {
    const action = client.interactionActions.get(interaction.customId);
    if (!action) return;

    try {
      await action.execute(interaction);
    } catch (error) {
      console.error(error);
      if (!interaction.replied) {
        await interaction.reply({
          content: '❌ Error en la acción',
          ephemeral: true
        });
      }
    }
  }
});



client.login(process.env.DISCORD_TOKEN);
