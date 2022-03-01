const { Command, colors } = require('../../utils')
const Discord = require('discord.js')
const { error } = require('console')

module.exports = class Ban extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'ban'
    this.aliases = ['ban', 'banir', 'vaza', 'some']
    this.category = 'Mod'
  }

  async run(message, args) {

    const escolha = new Discord.MessageEmbed()
      .setColor(colors.default)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Sistema Trust & Safety')
      .setDescription('**Por favor, escolha um motivo válido abaixo para aplicar o banimento!** \n<a:JT1:739977300564639835> - Conteúdo pornográfico/Gore \n<a:JT2:739977300921024522> - Promover ou participar de Raids a outros servidores \n<a:JT3:739977300895858708> - Discurso de ódio ou Racismo e derivados \n<a:JT4:739977300472234078> - Apologia ao Nazismo e/ou pornografia infântil \n<a:JT5:739977300719697941> - Ações que comprometem o servidor ou os usuários \n<a:JT6:739977300795457687> - Divulgação inapropriada')
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))

    const link = new Discord.MessageEmbed()
      .setColor(colors.default)
      .setDescription('<:a_blurplecertifiedmoderator:856174396225355776> **Usuário inválido!** o usuário que você inseriu não existe ou não foi reconhecido, por favor tente novamente utilizando o ID')

    // motivo dos banimentos
    const primeiro = 'Conteúdo pornográfico/Gore'
    const segundo = 'Promover ou participar de Raids a outros servidores'
    const terceiro = 'Discurso de ódio ou Racismo e derivados'
    const quarto = 'Apologia ao Nazismo e/ou pornografia infântil'
    const quinto = 'Ações que comprometem o servidor ou os usuários'
    const sexto = 'Divulgação inapropriada'

    if (!args[0]) return message.reply(link)

    const membro17 = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ''))
    if (!membro17) {
      message.channel.send(link)
    }

    const membro14 = await this.client.users.fetch(args[0].replace(/[<@!>]/g, ''))
    if (!membro14) {
      message.channel.send(link)
    }
    const guildDocument1 = await this.client.database.user.getOrCreate(membro14.id)

    const embedA = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(colors.mod)
      .setTitle('**Err:**', true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`BAN_MEMBERS`', true)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))

    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send({ embeds: [embedA] })
    const userDocuent = await this.client.database.user.getOrCreate(message.author.id)
    // ban padrão 17
    const bannable = message.guild.member(membro17, membro14)
    if (bannable) {
      if (!bannable.bannable) return message.reply('eu não posso banir este usuário, o cargo dele é maior que o meu.')
      if (bannable.roles.highest.position > message.member.roles.highest.position) return message.reply(`você não pode banir esse usuário, pois o cargo dele é maior ou igual ao seu.`)
    }

    const warnembed17 = new Discord.MessageEmbed()

      .setThumbnail(membro17.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Ação | Ban')
      .setColor('#ff112b')
      .setImage(`${userDocuent.gifban || ''}`)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    // banimento private
    const bans = await message.guild.fetchBans('753778869013577739');
    let reason = args.slice(1).join(' ') || 'Nenhum motivo especificado';

    const warnembed14 = new Discord.MessageEmbed()

      .setThumbnail(membro14.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setAuthor(`${message.author.username} Já baniu ${bans.size} usuários`, message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setColor('#ff112b')
      .setImage(`${userDocuent.gifban || ''}`)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTimestamp(new Date());

    const warnembed18 = new Discord.MessageEmbed()

      .setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 }))
      .setTitle(`${message.author.username}`)
      .setDescription(`:do_not_litter: **Você foi banido do servidor ${message.guild.name} :no_entry_sign:**`)
      .setColor('#ffefad')
      .addField('<:pepe:651487933148299291> **Staffer:**', `${message.author}`)
      .addField('📝 Motivo:', `${reason}`)
      .setFooter('Banido do servidor da Jeth? neste caso você pode recorrer appeals@jeth.live 🥶')
      .setImage('https://media1.tenor.com/images/4c906e41166d0d154317eda78cae957a/tenor.gif?itemid=12646581')
      .setTimestamp(new Date());

    const argumentos = args.slice(1).join(' ');
    if (argumentos) {
      message.guild.members.ban(membro17)
      warnembed18.fields[1].value = argumentos
      warnembed17.setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro17.username} \n**ID:** ${membro17.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${argumentos}`)
      warnembed14.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro14.username} \n**ID:** ${membro14.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${argumentos}`)
      message.channel.send(warnembed14)
      try {
        membro14.send(warnembed18)
      } catch { error }
    } else {
      message.channel.send(escolha).then(m => {

        m.react('739977300564639835')
        m.react('739977300921024522')
        m.react('739977300895858708')
        m.react('739977300472234078')
        m.react('739977300719697941')
        m.react('739977300795457687').then(() =>
          m.delete({ timeout: 15000 })
        )

        const filter = m.createReactionfilter(
          ((_, u) => _ && u.id === message.author.id),
          { time: 60000 }
        )
        const col = m.createReactionfilter({ filter, time: 180_000, errors: ['time'] })
        col.on('collect', async (reaction) => {

          console.log(reaction.emoji.name)

          switch (reaction.emoji.name) {

            case 'JT1':
              reason = primeiro
              warnembed18.fields[1].value = reason
              warnembed17.setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro17.username} \n**ID:** ${membro17.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              warnembed14.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro14.username} \n**ID:** ${membro14.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              filter.stop()
              message.guild.members.ban(guildDocument1.id, {
                reason: reason
              }).then(() => {
                message.channel.send(warnembed14)
                try {
                  guildDocument1.send(warnembed18)
                } catch { error }
              }).catch(() => message.reply(`Algum erro ocorreu ao tentar banir esse usuário.\nErro:\n\`\`\`erro\`\`\``))
              break
            case 'JT2':
              reason = segundo
              warnembed18.fields[1].value = reason
              warnembed17.setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro17.username} \n**ID:** ${membro17.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              warnembed14.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro14.username} \n**ID:** ${membro14.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              filter.stop()
              message.guild.members.ban(membro14, {
                reason: reason
              }).then(() => {
                message.channel.send(warnembed14)
                try {
                  guildDocument1.send(warnembed18)
                } catch { error }
              }).catch(() => message.reply(`Algum erro ocorreu ao tentar banir esse usuário.\nErro:\n\`\`\`erro\`\`\``))
              break
            case 'JT3':
              reason = terceiro
              warnembed18.fields[1].value = reason
              warnembed17.setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro17.username} \n**ID:** ${membro17.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              warnembed14.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro14.username} \n**ID:** ${membro14.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              filter.stop()
              message.guild.members.ban(membro14, {
                reason: reason
              }).then(() => {
                message.channel.send(warnembed14)
                try {
                  guildDocument1.send(warnembed18)
                } catch { error }
              }).catch(() => message.reply(`Algum erro ocorreu ao tentar banir esse usuário.\nErro:\n\`\`\`erro\`\`\``))
              break
            case 'JT4':
              reason = quarto
              warnembed18.fields[1].value = reason
              warnembed17.setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro17.username} \n**ID:** ${membro17.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              warnembed14.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro14.username} \n**ID:** ${membro14.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              filter.stop()
              message.guild.members.ban(membro14, {
                reason: reason
              }).then(() => {
                message.channel.send(warnembed14)
                try {
                  guildDocument1.send(warnembed18)
                } catch { error }
              }).catch(() => message.reply(`Algum erro ocorreu ao tentar banir esse usuário.\nErro:\n\`\`\`erro\`\`\``))
              break
            case 'JT5':
              reason = quinto
              warnembed18.fields[1].value = reason
              warnembed17.setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro17.username} \n**ID:** ${membro17.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              warnembed14.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro14.username} \n**ID:** ${membro14.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              filter.stop()
              message.guild.members.ban(membro14, {
                reason: reason
              }).then(() => {
                message.channel.send(warnembed14)
                try {
                  guildDocument1.send(warnembed18)
                } catch { error }
              }).catch(() => message.reply(`Algum erro ocorreu ao tentar banir esse usuário.\nErro:\n\`\`\`erro\`\`\``))
              break
            case 'JT6':
              reason = sexto
              warnembed18.fields[1].value = reason
              warnembed17.setDescription(`\n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro17.username} \n**ID:** ${membro17.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              warnembed14.setDescription(`**Banido!** \n \n<:Kaeltec:673592197177933864> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:Kaeltec:673592197177933864> **Banido:** ${membro14.username} \n**ID:** ${membro14.id}` + `\n<:Registrado:673592197077270558> **Motivo:** ${reason}`)
              filter.stop()
              message.guild.members.ban(membro14, {
                reason: reason
              }).then(() => {
                message.channel.send(warnembed14)
                try {
                  guildDocument1.send(warnembed18)
                } catch { error }
              }).catch(() => message.reply(`Algum erro ocorreu ao tentar banir esse usuário.\nErro:\n\`\`\`erro\`\`\``))
              break
          }
        })
      })
    }
  }
}