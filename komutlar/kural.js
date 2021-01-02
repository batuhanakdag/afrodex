const Discord = require('discord.js');


exports.run = function(client, message) {
  message.delete(100)
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» Aϝɾσ Bσƚ')
.setTimestamp()
.addField('» **Her sunucunun kuralları vardır bu sunucununda bir kuralları vardır!**', '**1)** Küfür,hakaret,kötüsöz... yasaktır \n **2)** İzinsiz reklam veya link paylaşımı yasaktır. \n **3)** Irkçılık , din , siyaset... yasaktır. \n **4)** Spam,flood yapmak yasaktır. \n **5)** NSFW paylaşımlar yasaktır. \n **6)** Rahatsız edici davranışlarda bulunma yasaktır. \n **7)** Kavga çıkarmak , tartışma oluşturmak yasaktır \n **__Herkes kuralları okumuş ve kabul etmiş sayılır! , ben bilmiyordum vb geçmez!__**')
.setFooter('© 2020 Aϝɾσ Bσƚ', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kurallar',
  description: 'Hazır sunucu kuralları.',
  usage: 'kurallar'
};