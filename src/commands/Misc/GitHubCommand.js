const { EmbedBuilder } = require('discord.js');
const { Command, colors } = require('../../utils')
const axios = require('axios');

module.exports = class github extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'github'
    this.aliases = ['github', 'git', 'hub']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const usuario = args.slice(0).join(' ')
    if (!usuario) message.reply('<a:9komi:663575133151035392> **Por favor!** Diga o nome de um usuário para pesquisar na lista ...')
    axios.get(`https://api.github.com/users/${usuario}`)
      .then(async function (response) {
        const nome = response.data.name
        const avatar = response.data.avatar_url
        const bio = response.data.bio
        const tipo = response.data.type
        const compania = response.data.company
        const link = response.data.html_url
        const embed = new EmbedBuilder()
          .setTitle(`Github`)
          .setColor(colors['default'])
          .setThumbnail(avatar)
          .addFields(`User`, `${usuario}`)
          .addFields(`Nome Do Usuario`, `${nome}`, true)
          .addFields(`Compania`, `${compania}`, true)
          .addFields(`Tipo De Usuario`, `${tipo}`, true)
          .addFields(`Bio`, `${bio}`, true)
          .addFields(`Link Para O Perfil`, `${link}`, true)
          .setFooter({ text: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
          .setTimestamp()

        message.reply({ embeds: [embed] })
      })
  }
};