const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("review")
    .setDescription("Escribe una reseña sobre RetroKode.")
    .setDMPermission(false)
    .addStringOption(option => option.setName("reseña").setDescription("reseña").setRequired(true))
    .addStringOption(option => 
        option.setName("producto")
        .setDescription("Realiza una reseña a el bot, juego, web etc de RetroKode")
        .addChoices(
            { name: "RetroBooks", value: "RetroBooks"},
            { name: "RetroBot", value: "RetroBot"},
            { name: "RetroWeb", value: "RetroWeb"},
            { name: "Administración", value: "Administración"}
        )
        .setRequired(true))


    .addStringOption(option => 
        option.setName("estrellas")
        .setDescription("¿Cuantas estrellas le das?")
        .addChoices(
            { name: "⭐", value: "⭐⠀⠀⠀⠀"},
            { name: "⭐⭐", value: "⭐⭐⠀⠀⠀"},
            { name: "⭐⭐⭐", value: "⭐⭐⭐⠀⠀"},
            { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐⠀"},
            { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐"}
            
        )
        .setRequired(true)),

        /**
         * @param { ChatInputCommandInteraction} interaction
         */

        execute(interaction) {
            const channel = interaction.guild.channels.cache.find((c) => c.id === `1147997107857412147`); //ID del canal de sugerencias.
            const reseña = interaction.options.getString("reseña");
            const estrellas = interaction.options.getString("estrellas");
            const producto = interaction.options.getString("producto");

            const embed = new EmbedBuilder()
            .setTitle("Reseñas")
            .setDescription(`
                **Reseña**:         
                ${reseña}
    
                **Estrellas**:
                ${estrellas}

                **Producto**:
                ${producto}
                
                `)

                .setImage("https://cdn.discordapp.com/attachments/1135758529626644480/1146936170341732392/kmk_1.jpg")
                .setThumbnail("https://cdn.discordapp.com/attachments/1135758529626644480/1146935239910883400/5f2ceb2dfa47080a983c3d9358c2265c.gif")
                .setColor("#6f00ff")
                .setFooter({ text: `Enviada desde ${interaction.guild} por ${interaction.user.username}`})

                const embed2 = new EmbedBuilder()
                .setTitle("Reseña enviada correctamente ✅")
                .setDescription("Gracias por enviar tu reseña.")
                .setColor("#6f00ff")
                .setTimestamp()

                interaction.reply({ embeds: [embed2], ephemeral: true })

                channel.send({embeds: [embed], fetchReply: true});

                

        },
};
