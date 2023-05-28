const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Sacaré a un miembro del servidor.")
    .addUserOption((option) => option.setName(`target`).setDescription(`Usuario a echar`).setRequired(true))
    .addStringOption((option) => option.setName(`razon`).setDescription(`Razón de el kick`))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */

    async execute (interaction, client) {
        const user = interaction.options.getUser(`target`);
        const { guild } = interaction;

        let razon = interaction.options.getString(`razon`);
        const member = await interaction.guild.members.fetch(user.id).catch(console.error);

    if (!razon) razon = "El administrador no ha dado una razón.";
    if (user.id === interaction.user.id) return interaction.reply({ content: `😒 No puedes echarte a ti mismo. ¡Imbécil!`, ephemeral: true });
    if (user.id === client.user.id) return interaction.reply({ content: `¿Qué intentas hacer? 🤨, no me puedes echar.`, ephemeral: true });
    if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `¿Qué haces? 🙄, no puedes echar a alguien con tu mismo rango o superior.`, ephemeral: true });
    if (!member.kickable) return interaction.reply({ content: `¡No puedo echar a alguien con un rol superior al mio! 😑`, ephemeral: true});
    
    const embed = new EmbedBuilder()
    .setAuthor({ name: `${guild.name}`, iconURL: `${guild.iconURL({ dynamic: true }) || "https://cdn.discordapp.com/attachments/1069421539457503355/1112164624675131473/918194cf363e75f01ba729ab5379ecc2.jpg"}`})
    .setTitle(`He sacado a ${user.tag} de RetroKode.`)
    .setColor(`#6f00ff`)
    .setTimestamp()
    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
    .addFields({ name: `Razón`, value: `${razon}`});

    await member.kick(razon).catch(console.error);

    interaction.reply({ embeds: [embed]});
    },
};