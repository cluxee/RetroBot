const { EmbedBuilder, Message, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "ad",

    /**
     * 
     * @param { Message } message
     */
    

    async execute(message, args) {

        if(!args.length && !intereaction.member.permissions.has(PermissionFlagsBits.Administrator)) return;
        message.delete();
        
        const contenido = args.join(" ");

        const embed = new EmbedBuilder()
        .setTitle("ADVERTISEMENT - ANUNCIO 📌")
        .setDescription(`${contenido}`)
        .setThumbnail("https://t4.ftcdn.net/jpg/03/82/30/01/360_F_382300191_q2UEGNykRGnwl6Dgjw6W8JqoaXIp1oRi.jpg")
        .setColor('#000001')
        .setFooter({ text: ("Equipo adminsitrativo de RetroKode") })
        .setTimestamp()
        .setImage("https://blog.vicensvives.com/wp-content/uploads/2019/02/10-gifs-gatos.jpg")

        message.channel.send({ content: "||@everyone/@here||", embeds: [embed] })
    }
}