const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases: ["No aliases"],
  categories: "info",
  description: "Shows All Bot Commands",
  usage: "[command]",
  options: [{
    name: "command",
    description: "Type the name of any command",
    required: false,
    type: "STRING"
  }],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
//const roleColor = interaction.guild.me.displayHexColor === "#000000" ? "#ffffff": interaction.guild.me.displayHexColor;

  if (!args[0]) {
/*       let categories = [];

      let ignored = ["owner"];

const emo = {
info: "⁉️️ ❯",
other : "🔰️ ❯",
moderation: "️🛡️ ❯️",
"web-search": "🔎️ ❯",
fun: "🤣️ ❯"
};
readdirSync("./SlashCommands/").forEach((dir) => {
if (ignored.includes(dir.toLowerCase())) return;

const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;

let cats = new Object();

cats = {
name: name,
value: `\`/help ${dir.toLowerCase()}\``,
inline: false,
};

categories.push(cats);
});
*/
const embed = new MessageEmbed()
  .setTitle("🌸**Ohayo Senpai, Ruka Commands**🌸")
  .setFooter(`Working as a maid at ${client.guilds.cache.size} servers`, "")
  .setDescription("For More Info About The Command Type r!help <Command Name>")
  .setTimestamp()
  .addField("**BOT INFO**", `\`\`\`
help, ping, invite, server
\`\`\``)
  .addField("**MODERATION**", `\`\`\`
ban, unban, mute, unmute, clear, kick, userinfo, serverinfo, role, remove-role
\`\`\``)
  .addField("**FUN**", `\`\`\`
slap, kill, wink, punch, hug, pat, baka, poke, smug, tickle
\`\`\``)
  .addField("**WEB SEARCH**", `\`\`\`
anime, manga, character, movie, wallpaper
\`\`\``)
  .addField("**SOUNDBOARD**" , `\`\`\`
ara ara, yameta, ohayo, baka, senpai, onichan, ayaya, moshi, sad, smack, keyboard smack, to be continued, wow, yeet, yes, muri, wtf, hehe boi, nani, kawaii koto, ewww, nice, gomen, oooh
\`\`\``)
  .addField(`**USEFUL LINKS**`,`   [Invite Me](https://discord.com/api/oauth2/authorize?client_id=857289815673536533&permissions=8589934591&scope=bot%20applications.commands)`+` - `+`[Support Server](https://discord.gg/aVXREv3Me7)`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true, }))
  //.setImage("https://images-ext-2.discordapp.net/external/CjWIgsSoR7ErWZFKFOSguYwgEjnvKPNdHfwcBY9t_no/https/media.discordapp.net/attachments/692555215299411989/849290263834001418/AS_divider.gif")
  .setColor("#ff1ac6");

  return interaction.followUp({ embeds: [embed] });
  } else {

let cots = [];
let catts = [];

readdirSync("./SlashCommands/").forEach((dir) => {

if(dir.toLowerCase() !== args[0].toLowerCase()) return;
//console.log(dir)
const commands = readdirSync(`./SlashCommands/${dir}/`).filter((file) => file.endsWith(".js"));

const cmds = commands.map((command) => {

let file = require(`../../SlashCommands/${dir}/${command}`);

if(!file.name) return "No command name.";

let name = file.name.replace(".js", "");

let des = `${file.description}`;

let emo = `🌺️ ❯`;

let obj = {cname: `${emo} \`${name}\``,
des,};


cots.push(dir.toLowerCase())
return obj;
});

let dota = new Object();

cmds.map((co) => {
dota = {
name: `${cmds.length === 0 ? "Not Added Yet Senpai!":co.cname}`,
value: co.des?co.des:"No Description",
inline: false,
};

catts.push(dota);
});

//cots.push(dir.toLowerCase());
});

const command = client.slashCommands.get(args[0].toLowerCase()) ||
        client.slashCommands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
);

/* if(cots.includes(args[0].toLowerCase())) {
        
const combed = new MessageEmbed()

  .setTitle(`__${args[0].charAt(0).toUpperCase() + args[0].slice(1)} Commands Senpai!__`)
  .setFooter("Ruka Loves To Help")
  .setTimestamp()
  .setImage("https://images-ext-2.discordapp.net/external/CjWIgsSoR7ErWZFKFOSguYwgEjnvKPNdHfwcBY9t_no/https/media.discordapp.net/attachments/692555215299411989/849290263834001418/AS_divider.gif")
  .addFields(catts)
  .setColor("#ff1ac6")
      return interaction.followUp({ embeds: [combed] });
    }
    */
    if(!command) {
const embed = new MessageEmbed()
  .setTitle(`❌Invalid Command Name`)
  .setDescription(`Sorry Senpai, But The Command Name Is Invalid Type \`/help\` To See All Commands`)
  .setImage("https://images-ext-2.discordapp.net/external/CjWIgsSoR7ErWZFKFOSguYwgEjnvKPNdHfwcBY9t_no/https/media.discordapp.net/attachments/692555215299411989/849290263834001418/AS_divider.gif")
  .setColor("#ff1ac6")

return interaction.followUp({ embeds: [embed] });
      }
      const embed = new MessageEmbed()
.setTitle("Command Details Senpai!")
  .setDescription(`\`\`\`js
[] - optional
<> - required
& - or
remove (<>,&,[]) when using command!
\`\`\``)
  .addField("PREFIX:", `\`/\``)
  .addField("COMMAND:", command.name ? `\`${command.name}\`` : "No name for this command."
          )
  .addField("USAGE", command.usage? `\`/${command.name} ${command.usage}\``:`\`/${command.name}\``)
  .addField("DESCRIPTION:", command.description
? command.description: "No description for this command.")
  .setFooter(`I have no ideas about Senpai thoughts`)
  .setTimestamp()
  .setImage("https://images-ext-2.discordapp.net/external/CjWIgsSoR7ErWZFKFOSguYwgEjnvKPNdHfwcBY9t_no/https/media.discordapp.net/attachments/692555215299411989/849290263834001418/AS_divider.gif")
  .setColor("#ff1ac6");

      return interaction.followUp({ embeds: [embed] });
    }
  }
  }

