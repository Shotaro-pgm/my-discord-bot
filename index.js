const heyFile = require('./commands/hey.js');
const { Client, Events, GatewayIntentBits } = require('discord.js');
/* const { token } = require('./config.json'); */
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
    console.log(`準備OKです！${c.user.tag}がログインします。`);
});

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === heyFile.data.name){
        try{
            await heyFile.execute(interaction);
        } catch(error) {
            console.log(error);
            if(interaction.replied || interaction.deferred){
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true});
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true});
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
});

client.login(process.env.DISCORD_TOKEN);