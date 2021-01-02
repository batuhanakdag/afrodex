const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

    let p = args[0];
    
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("adminlere özel!");
    if(!p) return message.reply('yeni bir prefix yaz')
    if (args[0] === 'sıfırla') {
        
        if (db.has(`prefix.${message.guild.id}`) === false) return message.reply('zatn ayarlanmamış')
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("adminlere özel") 
  
        db.delete(`prefix.${message.guild.id}`)
      
        message.channel.send('sıfırladım')
  
    } else {
        
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("adminlere özel!") 
        if(!p) return message.reply('yeni bir ön ek yaz')
        if (p.length < 2) return message.reply(`2 karakterden fazla yazamazsın.`)
  
        db.set(`prefix.${message.guild.id}`, p)
        message.channel.send(`yeni prefix ${args[0]}`)

  }

};

exports.conf = {
  aliases: []
};

exports.help = {
  name: 'prefix'
};