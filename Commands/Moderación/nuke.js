const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("nuke")
    .setDescription("Comando para nukear un canal.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        var posicion = interaction.channel.position

        interaction.channel.clone().then((canal) => {
            interaction.channel.delete()

            canal.setPosition(posicion)

            const embed = new EmbedBuilder()
            .setTitle("💥 **NUKE**")
            .setDescription(`¡Este canal ha sido nukeado!, ahora lo verás completamente limpió.`)
            .setFooter({ text: "Equipo administrativo de restrokode" })
            .setColor("#6f00ff")
            .setImage("https://pfps.gg/assets/banners/4369-planet-explosion.gif")
            .setTimestamp()
            
            canal.send({ embeds: [embed] })

        })
    } 
}
