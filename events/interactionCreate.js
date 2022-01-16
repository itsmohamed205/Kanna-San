const {
    MessageEmbed
} = require("discord.js")
const client = require("../index");
client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({
            ephemeral: false
        }).catch(() => {});
        const command = client.slashCommands.get(interaction.commandName);

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({
                content: "Guess this command got deleted..."
            });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        let permsname;
        if (command.permissions === "" || !command.permissions) {
            permsname = "no name"
        } else {
            permsname = command.permissions.toLowerCase().replace("_", " ")
        }
        let perms = new MessageEmbed()
            .setDescription(`Sorry Senpai, You don't have ${permsname} permissions to run the command.`)
            .setTitle("❌Missing Permissions!")
            .setImage("https://images-ext-2.discordapp.net/external/CjWIgsSoR7ErWZFKFOSguYwgEjnvKPNdHfwcBY9t_no/https/media.discordapp.net/attachments/692555215299411989/849290263834001418/AS_divider.gif")
            .setColor("#ff1ac6");
        if (!interaction.member.permissions.has(command.permissions || []))
            return interaction.editReply({
                embeds: [perms]
            });

        cmd.run(client, interaction, args);
    }
});