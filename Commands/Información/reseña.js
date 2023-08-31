const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("reseñas")
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
            const canal = interaction.guild.channels.cache.get("1146932590629093508");
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


                interaction.channel.send({ embeds: [embed] });
                interaction.reply({
                    content: "Gracias por darnos una reseña.",
                    ephemeral: true,
                });
        },
};