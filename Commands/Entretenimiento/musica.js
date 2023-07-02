const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel,
    NoSubscriberBehavior,
} = require("@discordjs/voice");
const play = require("play-dl");

const playlist = [];
let isPlaying = false;
let playlistMessage = null; 
let connection = null; 
let isEditingPlaylist = false;

module.exports = {
    mantenimiento: true,
    data: new SlashCommandBuilder()
        .setName("music")
        .setDescription("Reproduce música")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("play")
                .setDescription("Reproducir una canción")
                .addStringOption((option) =>
                    option
                        .setName("cancion")
                        .setDescription("URL o nombre de la canción")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand.setName("stop").setDescription("Detener la reproducción")
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("skip")
                .setDescription("Saltar a la siguiente canción")
        ),
    async execute(interaction) {
        await interaction.deferReply({
            ephemeral: true,
        });

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.followUp(
                "Debes estar en un canal de voz para reproducir música."
            );
        }

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "play") {
            const song = interaction.options.getString("cancion");

            const ytInfo = await play.search(song, { limit: 1 });
            const videoUrl = ytInfo[0].url;
            const duration = ytInfo[0].durationInSec;
            const thumbnail = ytInfo[0].thumbnails[0].url;
            const requestedBy = interaction.user.username;
            const playlistItem = { videoUrl, duration, thumbnail, requestedBy };
            playlist.push(playlistItem);

            if (!isPlaying && playlist.length === 1) {
                isPlaying = true;
                await playNextSong(voiceChannel, interaction);
            } else {
                const embed = createPlaylistEmbed(playlist);

                if (playlistMessage) {
                    await editPlaylistMessage(interaction, embed);
                } else {
                    await sendPlaylistMessage(interaction, embed);
                }
            }
        } else if (subcommand === "stop") {
            if (!isPlaying) {
                return interaction.followUp(
                    "No hay canciones reproduciéndose."
                );
            }

            playlist.length = 0; 
            isPlaying = false;
            playlistMessage = null; 

            if (connection) {
                connection.destroy();
                connection = null;
            }

            interaction.followUp("Reproducción detenida.");
        } else if (subcommand === "skip") {
            if (!isPlaying) {
                return interaction.followUp(
                    "No hay canciones reproduciéndose."
                );
            }

            if (playlist.length === 0) {
                return interaction.followUp(
                    "No hay más canciones en la lista."
                );
            }

            interaction.followUp("Canción saltada.");

            if (connection) {
                connection.destroy();
                connection = null;
            }

            playNextSong(voiceChannel, interaction);
        }
    },
};

async function playNextSong(voiceChannel, interaction) {
    const nextSong = playlist.shift(); 

    if (nextSong) {
        connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });

        const ytInfo = await play.search(nextSong.videoUrl, { limit: 1 });
        const videoUrl = ytInfo[0].url;
        const duration = ytInfo[0].durationInSec;
        const thumbnail = ytInfo[0].thumbnails[0].url;
        const requestedBy = nextSong.requestedBy;
        const stream = await play.stream(nextSong.videoUrl);
        const resource = createAudioResource(stream.stream, {
            inputType: stream.type,
        });
        const player = createAudioPlayer({
            behaviors: { noSubscriber: NoSubscriberBehavior.Play },
        });

        player.play(resource);
        connection.subscribe(player);

        const embed = createNowPlayingEmbed(
            ytInfo[0],
            videoUrl,
            duration,
            thumbnail,
            requestedBy,
            interaction
        );

        const channel = interaction.client.channels.cache.get(
            interaction.channelId
        );

        await channel.send({ embeds: [embed] });
        interaction.followUp("Cancion reproducida correctamente");

        player.on("idle", () => {
            if (playlist.length === 0) {
                isPlaying = false;
                playlistMessage = null; 
                player.stop(); 

                if (connection) {
                    connection.destroy();
                    connection = null;
                }

                return;
            }
         
            playNextSong(voiceChannel, interaction);
        });
    }
}

function createNowPlayingEmbed(
    ytInfo,
    videoUrl,
    duration,
    thumbnail,
    requestedBy,
    interaction
) {
    const embed = new EmbedBuilder()
        .setTitle("Reproduciendo música")
        .setDescription(
            "**Recuerda que si pones otra canción la canción se cambiará automáticamente**"
        )
        .addFields(
            {
                name: "Canción",
                value: `[${ytInfo.title}](${videoUrl})`,
                inline: false,
            },
            { name: "Duración", value: formatDuration(duration), inline: true },
            { name: "Vistas", value: formatNumber(ytInfo.views), inline: true },
            { name: "Canal", value: ytInfo.channel.name, inline: true }
        )
        .setThumbnail(thumbnail)
        .setFooter({
            text: "Solicitado por " + requestedBy,
            iconURL: interaction.user.displayAvatarURL(),
        });

    return embed;
}

function createPlaylistEmbed(playlist) {
    const embed = new EmbedBuilder()
        .setTitle("Lista de reproducción")
        .setDescription("Canciones en cola:")
        .setThumbnail(playlist[0].thumbnail)
        .setFooter({
            text: `Total de canciones en cola: ${playlist.length}`,
        });

    playlist.forEach((song, index) => {
        embed.addFields({
            name: `${index + 1}. ${song.videoUrl}`,
            value: `[Ver en YouTube](${song.videoUrl}) - Solicitado por ${song.requestedBy}`,
        });
    });

    return embed;
}

function formatDuration(duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function editPlaylistMessage(interaction, embed) {
    if (isEditingPlaylist) return; 

    const channel = interaction.client.channels.cache.get(
        interaction.channelId
    );

    try {
        isEditingPlaylist = true; 
        const message = await channel.messages.fetch(playlistMessage);
        await message.edit({ embeds: [embed] });
        interaction.followUp(`Lista actualizada`);
    } catch (error) {
        console.error(
            "Error al editar el mensaje de la lista de reproducción:",
            error
        );
    } finally {
        isEditingPlaylist = false; 
    }
}

async function sendPlaylistMessage(interaction, embed) {
    if (isEditingPlaylist) return; 

    const channel = interaction.client.channels.cache.get(
        interaction.channelId
    );

    try {
        isEditingPlaylist = true; 
        const reply = await channel.send({ embeds: [embed] });
        interaction.followUp("Se han añadido las canciones a la lista");
        playlistMessage = reply.id; 
    } catch (error) {
        console.error(
            "Error al enviar el mensaje de lista de reproducción:",
            error
        );
    } finally {
        isEditingPlaylist = false; 
    }
}
