# Galaxity Bot Studios
¿No sabes como hacer un bot o necesitas ayuda? Pues, **Galaxity Bot Studios** es tu salvacion. 

[**LINK COMPLETO DEL TUTORIAL EN DISCORD**](https://discord.com/channels/1407567117620088943/1465112441561022548)

> [!IMPORTANT]
> Si quieres mayor velocidad, usa alternativas a npm. El creador, que es **Nord** recomienda PNPM. Si no eres avanzado, usa npm.

## ¿Como usar?

**1.** Cumplir unos requisitos.

Para poder ejecutar el codigo debes cumplir un numero de requisitos.

**Requisitos:** Tener **Node.JS** instalado y un editor de codigo como **VSCode**

**2.** Descargamos el codigo.

Para descargar el codigo, puedes usar Git, GitHub CLI o descargar el .zip. El ejemplo que usare sera de git

`git clone https://github.com/Galaxity-Studios/Galaxity-Studios-Bot.git`

**3.** Instalamos las dependencias. 

Para poder instalar las dependencias, debemos estar en la carpeta con el codigo, que se llamara como tu pusistes, o Galaxity-Studios-Bot.

```bash
npm i
## O si usas PNPM
pnpm i
```

**4.** Configuramos

***¿Como poner el Token?***

Para poner el token tienen que renombrar el archivo **.env.example** a **.env**. Despues de renombrarlo, tienes que rellenarlo

```env
DISCORD_TOKEN=TU TOKEN
CLIENT_ID=CLIENT ID
GUILD_ID=ID_DEL_SERVIDOR
```
Despues de rellenar el **.env**, hay que configurar el **config.json**

```json
{
    "guild-commands": false,
    "status": {
        "type-online": "online",
        "text": "Example Bot | /help"
    }
}
```

Si quieres que solo registre comandos en un servidor, activa esta opcion.

**5.** Registrar los comandos. 

Actualmente, solo hay un comando, que es el **/ping**. Tambien tengo que decir que por ahora solo hay slash command, que son los comandos con /. 

Para **registrarlos** tienes que ejecutar este codigo:

```bash
npm run register-commands
## O con PNPM
pnpm register-commands 
```

**6.** Ejecutar el bot.

Para ejecutar el bot debes tener los anteriores pasos y ejecutar este comando:

```bash
npm run start
```

**7.** Crear mas comandos. (Opcional)

Para añadir mas **comandos**, hay dos maneras.

**1. Manera**

La Primera manera es usar los comandos que damos en **Galaxity Studios** que son los del canal [**#🌠・code-bots**](<https://discord.com/channels/1407567117620088943/1465112441561022548>).

**2. Manera**

La Segunda manera es crear tus propios comandos: Aqui dejo el ejemplo del comando.

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ejemplo')
    .setDescription('Comando de ejemplo'),

  async execute(interaction) {
    await interaction.reply('Comandito de ejemplo');
  }
};

```