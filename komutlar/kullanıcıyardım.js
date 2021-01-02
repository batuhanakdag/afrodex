const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {

        const codare = new Discord.RichEmbed()
 
.setTitle("Afro Noel |Kullanıcı Menüsü")
.setURL("https://google.com.tr")
.setAuthor("Afro Noel", "https://cdn.discordapp.com/avatars/784373795283664906/c1c0e3d6fc4390bd803d14601568906e.png?size=2048" ) 
.setThumbnail("https://cdn.discordapp.com/avatars/784373795283664906/c1c0e3d6fc4390bd803d14601568906e.png?size=2048") 
.setDescription("<a:kullanici:793018267588624395> a!avatar: Avatarınızı Atar \n <a:kullanici:793018267588624395>  a!yenilikler: Botta Yapılan Yenilikleri Gösterir.. \n <a:kullanici:793018267588624395> a!havadurumu: İstediğiniz Yerin Hava Durumunu Gösteririr. \n <a:kullanici:793018267588624395> a!korona: Korona Hakkında Güncel Bilgileri Gösterir.\n  <a:kullanici:793018267588624395> a!deprembilgi: Son 10 Deprem Hakkında Bilgileri Gösterir. \n <a:kullanici:793018267588624395> a!döviz: Güncel Alış-Satış Kurlarını Gösterir. \n <a:kullanici:793018267588624395> a!steam: Steam Marketinde Arama Yapar.\n  <a:kullanici:793018267588624395> a!burçyorum: İstediğiniz Burç'un Günlük Yorumunu Gösterir. \n <a:kullanici:793018267588624395> a!sunucubilgi: Sunucu Hakkında Bilgileri Gösterir. \n <a:kullanici:793018267588624395> a!kullanıcıbilgi: Kullanıcı Hakkında Bilgileri Gösterir.\n  <a:kullanici:793018267588624395> a!afk: AFK Sistemi.\n  <a:kullanici:793018267588624395> a!sunucuicon: Sunucu Iconunu Gösterir. \n <a:kullanici:793018267588624395> a!v11tov12: V11 Komutları V12 Komutlara Çevirir. \n <a:kullanici:793018267588624395> a!youtube: YouTube'de Arama Yapar. \n <a:kullanici:793018267588624395> a!ping: Botun Pingini ve Kullandığı RAM'i Gösterir. \n <a:kullanici:793018267588624395> a!davet: Bütün Davet Linklerini Atar.")
.setFooter("✨Afroyu Desteklediğiniz İçin Teşekkür Ederiz✨, ")
.setImage("https://cdn.discordapp.com/attachments/769928411099168768/793438419707101214/standard.gif")
            
        return message.channel.sendEmbed(codare);
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : ['kullanıcı'],
    permLevel : 0
}
//codare
exports.help = {
    name : 'kullanıcı',
    description : 'kullanıcı Komut kategorilerini atar',
    usage : 'kullanıcı'
}


