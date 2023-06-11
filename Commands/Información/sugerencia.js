const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("sugerencia")
    .setDescription("Crea una sugerencia para RetroKode.")
    .addStringOption((option) => option.setName(`sugerencia`).setDescription(`Describe tu sugerencia`).setRequired(true)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction){

        const sugerencia = interaction.options.getString(`sugerencia`);

        const { guild } = interaction;
        const { user } = interaction;
        const channel = interaction.guild.channels.cache.find((c) => c.id === `1117584827038847078`); //ID del canal de sugerencias.
        
        const embed = new EmbedBuilder()
        .setTitle(`Sugerencia de ${interaction.user.username}`)
        .setColor(`#6f00ff`)
        .setDescription(`${sugerencia}

        🟢 ¡Buena sugerencia!
        🔴 Mala idea...
        🔵 Podria funcionar.`)
        .setFooter({
            text: `${guild.name}`,
            iconURL: `${guild.iconURL({ dynamic: true }) || "https://cdn.discordapp.com/attachments/1069421539457503355/1112164624675131473/918194cf363e75f01ba729ab5379ecc2.jpg"}`
        })
        .setTimestamp()
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)

        const message = await channel.send({embeds: [embed], fetchReply: true});

        message.react(`🟢`);
        message.react(`🔴`);
        message.react(`🔵`);

        interaction.reply({content: `Tu sugerencia fue aenviada exitosamente.`, ephemeral: true,
        });
    },
};

