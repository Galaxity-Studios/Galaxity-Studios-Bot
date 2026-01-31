module.exports = {
  customId: "mi-botoncito",

  async execute(interaction) {
    await interaction.reply({
      content: "💀 botón funcionando",
      ephemeral: true
    });
  }
};
