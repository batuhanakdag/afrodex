const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client, message, args) => {
const dmyardım = db.fetch(`${message.guild.id}.dmyardım`) 

  let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply("Lütfen **aç** veya **kapat** Kullanınız.");

  if(args[0].toLowerCase() === "aç") {
    if(dmyardım) return message.reply("Zaten DM Yardım Açık");
      db.set(`${message.guild.id}.dmyardım`, true)
    message.channel.send("Başarıyla DM Yardımı Açtın.")
  }

  if(args[0] === "kapat") {
    if (dmyardım === false) return message.reply("Zaten DM Yardım Kapalı")
      db.set(`${message.guild.id}.dmyardım`, false)
    message.channel.send("Başarıyla DM Yardımı Kapattın.")
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['dmyardım', 'yardımdm','dm yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'dm-yardım',
  description: "DM'denYardım açıp kapatırsın",
  usage: 'dm-yardım <aç/kapat>'
};