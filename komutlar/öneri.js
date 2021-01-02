const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
 
exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`:x: Bu Komutu Kullanmak İçin **Yönetici** Olmalısın !`);
 
    var link = await client.channels.get(message.channel.id).createInvite()
    var sebep = args.slice(0).join(' ');
    if(!sebep) return message.channel.send(`:x: Lütfen Bir Sebep Belirtiniz !`)
   
    const embed = new Discord.RichEmbed()
        .setDescription(`:white_check_mark: Destek Talebiniz Başarılı ! \n Sahibime Destek Talebi Yolladınız ! \n**Sebebiniz:** \`${sebep}\``)
        .setTimestamp()
        .setFooter(`Destek Talebi`)
        .setColor("RANDOM")
    message.channel.send(embed)
    message.delete()
     
    client.users.get("755412954492698694").send(new Discord.RichEmbed()                                      
    .setDescription(`\nKullanıcı Adı: **${message.author.tag}** \nSunucu Adı: **${message.guild.name}** Davet Linki: [Tıkla](${link}) \nDestek Sebebi: **${sebep}**`)                                    
    .setTimestamp()                            
    .setTitle(`Talep İçeriği`)      
    .setFooter(`Destek Talebi`)                            
    .setColor(`RANDOM`)                                    
    .setThumbnail(`${message.author.avatarURL}`))
 
};
 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sahip-destek', 'destek'],
    permLevel: 0
};
 
exports.help = {
    name: 'bug-bildir',
    description: 'Bot Sahibine Destek Talebi Gönderir.',
    usage: 'öneri (sebep)'
};