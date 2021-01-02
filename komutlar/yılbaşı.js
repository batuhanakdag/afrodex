const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
 
exports.run = async (client, message, args) => {
     
    var link = await client.channels.get(message.channel.id).createInvite()
    var sebep = args.slice(0).join(' ');
    if(!sebep) return message.channel.send(`Heyecanlı olduğunun farkındayım \n a!yılbaşı (hedefin) şeklinde yazarsan daha iyi iletebilirim \n \n Örnek olarak : a!yılbaşı Noel baba umarım onaylı bir bot olurum.`)
   
    const embed = new Discord.RichEmbed()
        .setDescription(`:white_check_mark: Mektup talebin Başarılı ! \n Noel babaya mektubunuzu Yolladınız ! \n**Mektup:** \`${sebep}\``)
        .setTimestamp()
        .setFooter(`Noel Babaya Mektup`)
        .setColor("RANDOM")
    message.channel.send(embed)
    message.delete()
     
    client.channels.get("792738918365397054").send(new Discord.RichEmbed()                                      
    .setDescription(`\nKullanıcı Adı: **${message.author.tag}** \nSunucu Adı: **${message.guild.name}** Davet Linki: [Tıkla](${link}) \nYılbaşı Hedefi: **${sebep}**`)                                    
    .setTimestamp()                            
    .setTitle(`Hedef`)      
    .setFooter(`Yılbaşı`)                            
    .setColor(`RANDOM`)                                    
    .setThumbnail(`${message.author.avatarURL}`))
 
};
 
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['yılbaşı', 'yılbaşı-hedefim'],
    permLevel: 0
};
 
exports.help = {
    name: 'yılbaşı',
    description: 'Bot hedefini ana sunucuya atar noel baba görmesi için sende görmek istersen a!davet yazarak gelebilirsin',
    usage: 'yılbaşı'
};