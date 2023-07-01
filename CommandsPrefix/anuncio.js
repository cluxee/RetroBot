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
        .setTitle("ADVERTISEMENT - ANUNCIO")
        .setDescription(`${contenido}`)
        .setThumbnail("https://i0.wp.com/gamerfocus.co/wp-content/uploads/2016/11/no-mans-sky-hello-games-anuncio-nueva-actualizacion-foundation-update-1.gif?resize=740%2C425&ssl=1")
        .setColor('#000001')
        .setFooter({ text: ("         Equipo adminsitrativo de RetroKode") })
        .setTimestamp()
        .setImage("https://blog.vicensvives.com/wp-content/uploads/2019/02/10-gifs-gatos.jpg")

        message.channel.send({ content: "||@everyone/@here||", embeds: [embed] })
    }
}