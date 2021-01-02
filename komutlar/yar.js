const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const codare = new Discord.RichEmbed()

             .setColor('RED')
             .setAuthor(` `, message.author.avatarURL) 
             .setThumbnail(client.user.avatarURL)
             .addField(`▬▬▬▬▬[ <a:ver:791241568953696256> » Dipper Bot « <a:ver:791241568953696256> ]▬▬▬▬▬\n>  <a:2266_Rainbow_heart:791205569628471327> Aktif Prefixim :  ${prefix}  \n ▬▬▬▬▬▬[ :closed_lock_with_key: Komut Listesi :closed_lock_with_key: ]▬▬▬▬▬▬\n `) // bunlar boş kalırsa hata verir
             .addField(`> <a:ass:793018267588624395>  ${prefix}davet: Botun Bütün Davet Linkleri.\n> <a:awe:793018323800948767>  ${prefix}moderasyon: Moderasyon Komutlarını Gösterir.\n> <a:pembetik:793018369376911360>  ${prefix}kullanıcı: Kullanıcıların Kullanabileceği Komutları Gösterir.`) // bunlar boş kalırsa hata verir
             .addField(` \n> <a:mutlucivciv:790895211874222080>  ${prefix}eğlence: Eğlence Komutlarını Gösterir.\n> <a:mutlucivciv:790895211874222080>  ${prefix}eğlence2: Eğlence2 Komutlarını Gösterir.\n \n ▬▬▬▬▬▬[ :gear: Bilgilendirme :gear: ]▬▬▬▬▬▬\ `)
             .addField(`\n :dizzy: Botta Bulduğunuz Bugları Bize Bildiriniz ! : ${prefix}bug-bildir\n <a:yuuuh:791211767237443635>  Botun Bütün Davet Linkleri : ${prefix}davet\n <a:pembetik:793018369376911360>   Discord Js Sürümü: v12.5.0`) 
             .setFooter(`Menüyü ${message.author.username}  .`, message.author.avatarURL)
            
        return message.channel.sendEmbed(codare);
}

exports.conf = {
	enabled : true,
	guildOnly : false,
	aliases : ['eğlence'],
	permLevel : 0
}
//codare
exports.help = {
	name : 'eğlence',
	description : 'Komut kategorilerini atar',
	usage : 'eğlence'
}
