const { ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Crearas directamente el sistema de tickets.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction) {
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`tick`)
            .setLabel(`📞 Atencion`)
            .setStyle(ButtonStyle.Danger)
        );
        
            const embed = new EmbedBuilder()
            .setTitle(`Clickea el botón de abajo para crear un nuevo ticket.`)

            const embed2 = new EmbedBuilder()
            .setTitle(`Bienvenido a tu ticket.`)

            await interaction.channel.send({embeds: [embed], components: [button]})
            await interaction.reply({ content: `El mensaje de ticket se envió correctamente.`, ephemeral: true })

            const collector = interaction.channel.createMessageComponentCollector();

            collector.on(`collect`, async (i) => {
                const channel = await interaction.guild.channels.create({
                    name: `ticket ${i.user.tag}`,
                    type: ChannelType.GuildText,
                    parent: `1112468989545828564`
                })

                channel.permissionOverwrites.create(i.user.id, {
                    ViewChannel: true,
                    SendMessages: true
                });

                channel.permissionOverwrites.create(channel.guild.roles.everyone, {
                    ViewChannel: false,
                    SendMessages: false
                });

                await i.reply({ content: `Tu ticket se creo con éxito`, ephemeral: true })

                channel.send({ embeds: [embed2] })

            })
    },
};