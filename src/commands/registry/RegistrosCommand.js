const { Command, colors } = require('../../utils')

module.exports = class RegistrosCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'registros'
    this.aliases = ['topregistros']
    this.category = 'registry'
    this.subcommandsOnly = false
  }

  async run(message) {
    await this.client.database.Guilds.findById(message.guild.id).lean()
      .then(async guildTable => {
        if (!guildTable) {
          const newGuild = new this.client.database.Guilds({ _id: message.guild.id });
          newGuild.save().catch(console.error);
          return message.reply('Nenhum usuário foi registrado neste servidor').catch(() => { });
        }
        const { Collection } = require('discord.js');
        let members = new Collection();
        if (message.guild.memberCount >= 250) {
          const g = await message.guild.members.fetch().catch(() => { });
          members = g.members;
        } else {
          members = message.guild.members;
        }
        const registradores = guildTable.registradores;
        const top = [];
        registradores.forEach((registrador, index, registradores) => {
          const registradorMembro = message.guild.members.cache.get(registrador._id);
          if (!registradorMembro) {
            return registradores = registradores.splice(index, 0);
          }
          let m = 0;
          let f = 0;
          let n = 0;
          registrador.membrosRegistrados.forEach(membro => {
            if (membro.genero === 'M') ++m;
            if (membro.genero === 'F') ++f;
            if (membro.genero === 'N') ++n;
          });
          const current = {
            username: registradorMembro.user.username,
            m,
            f,
            n,
            t: m + f + n
          };
          if (top.length) {
            for (let i = 0; i < top.length; ++i) {
              if (current.t > top[i].t) {
                top.splice(i, 0, current);
                break;
              }
            }
            if (top.length < 5) top.push(current);
            if (top.length > 5) top.pop();
          } else {
            top[0] = current;
          }
        });
        if (!top.length) {
          return message.reply('Nenhum usuário foi registrado neste servidor').catch(() => { });
        }
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
          .setTitle(`Rank dos registradores do: ${message.guild.name}`)
          .setColor(colors['default'])
          .setFooter(`Comando requisitado por: ${message.author}`, message.author.displayAvatarURL({ dynamic: true, size: 1024 }));
        const positionToEmoji = position => {
          const arr = [
            ':first_place:',
            ':second_place:',
            ':third_place:',
            ':flag_br:',
            ':cyclone: '
          ];
          return arr[position - 1];
        };
        for (let i = 0, pos = 1, lastPos = 1; i < top.length; ++i) {
          if (i === 0) {
            pos = 1;
          } else if (top[i].t === top[i - 1].t) {
            pos = lastPos;
          } else {
            pos = i + 1;
          }
          embed.addField(`**${positionToEmoji(pos)}__${top[i].username}__**`,

            ` **Masculino:** ${top[i].m}\n` +
            ` **Feminino:** ${top[i].f}\n` +
            ` **Não Binário:** ${top[i].n}\n` +
            `**Total: ${top[i].t}**`
          );
        }
        message.channel.send({ embeds: [embed] }).catch(() => { });
      })
      .catch(console.error);
  }
}