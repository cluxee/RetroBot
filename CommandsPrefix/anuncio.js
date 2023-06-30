const { EmbedBuilder, Message, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "anuncio",

    /**
     * 
     * @param { Message } message
     */
    

    async execute(message, args) {

        if(!args.length && !intereaction.member.permissions.has(PermissionFlagsBits.Administrator)) return;
        message.delete();
        
        const contenido = args.join(" ");

        const embed = new EmbedBuilder()
        .setTitle("ANUNCIO")
        .setDescription(`${contenido}`)
        .setThumbnail("https://img.freepik.com/vector-premium/diseno-logo-rk_731343-702.jpg")
        .setColor('#000001')
        .setFooter({ text: ("         Equipo adminsitrativo de RetroKode") })
        .setTimestamp()
        .setImage("https://i.pinimg.com/originals/4f/79/d1/4f79d16b5be08fbbdfd8a1978bb59075.gif")

        message.channel.send({ embeds: [embed] })
    }
}