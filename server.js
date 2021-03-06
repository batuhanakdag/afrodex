const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const Jimp = require('jimp');
const ms = require('ms');
const fs = require('fs');
const canvas = require('canvas');
const momenttimezone = require('moment-timezone')
const db = require('quick.db');
const YouTube = require('simple-youtube-api');
const superagent = require("superagent");
const { promisify } = require('util')
const chalk = require('chalk');
const weather = require('weather-js')
const moment = require('moment');
require('./util/eventLoader')(client)
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwMTY3NjM5MzQzMjc0MzkzNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ1NDA5ODYzfQ.UBd4sYZIn0IqfXUV2gdDkyeBBooh_5dWnacHEhWzDOw', client);
//TEŞEKKUR EDİN BARİ
dbl.on('posted', () => {
  console.log('[-] BOT: Server kısmını ayarladım !');
})

dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

const log = message => {
  console.log(`${message}`);
};

client.on('ready', () => {
  console.log(``);
});


  client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};
//
client.on('ready', () => require('quick.db').set('start', Date.now()))



//
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on('ready', ()=>{
client.channels.get('783397837140000779').join()
})

client.on('guildBanAdd', async (guild, member) => {
const kayitk = await db.fetch(`kayitlar_${member.guild.id}`); 
const kayitk2 = member.guild.channels.find('name', kayitk);
  if (!kayitk2) return;
   const embed = new Discord.RichEmbed()
			.setTitle('Üye yasaklandı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor("15158332")
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			kayitk2.send({embed});
	});
	
	client.on('guildBanRemove', async (guild, member) => {
    const kayitk = await db.fetch(`kayitlar_${member.guild.id}`); 
    const kayitk2 = member.guild.channels.find('name', kayitk);
    if (!kayitk2) return;
			var embed = new Discord.RichEmbed()
			.setTitle('Üyenin yasaklaması kaldırıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(3447003)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			kayitk2.send({embed});
		
	})
	
	client.on('messageDelete', async message => {
    const kayitk = await db.fetch(`kayitlar_${message.guild.id}`); 
    const kayitk2 = message.guild.channels.find('name', kayitk);
    if (!kayitk2) return;
			var embed = new Discord.RichEmbed()
			.setAuthor(message.author.tag, message.author.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${message.author.id}> tarafından <#${message.channel.id}> kanalına gönderilen mesajı silindi.`)
      .addField("Silinen Mesaj", `\`\`\`${message.content}\`\`\``)
			.setFooter(`ID: ${message.id}`)
			kayitk2.send({embed});
		
	});

	client.on('channelCreate', async channel => {
	  const kayitk = await db.fetch(`kayitlar_${channel.guild.id}`); 
    const kayitk2 = channel.guild.channels.find('name', kayitk);
    if (!kayitk2) return;
			if (channel.type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`<#${channel.id}> Adında Bir **Metin** Kanalı Oluşturuldu!`)
				.setFooter(`Kanal ID: ${channel.id}`)
				kayitk2.send({embed});
			};
			if (channel.type === "voice") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} Adında Bir **Sesli** Kanal Oluşturuldu!`)
				.setFooter(`Kanal ID: ${channel.id}`)
				kayitk2.send({embed});
			}
		
	});

		client.on('channelDelete', async channel => {
    const kayitk = await db.fetch(`kayitlar_${channel.guild.id}`); 
    const kayitk2 = channel.guild.channels.find('name', kayitk);
    if (!kayitk2) return;
			if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} Adında Bir **Metin** Kanalı Silindi!`)
				.setFooter(`Kanal ID: ${channel.id}`)
				kayitk2.send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} Adında Bir **Sesli** Kanal Silindi!`)
				.setFooter(`Kanal ID: ${channel.id}`)
				kayitk2.send({embed});
			}
		
	})

const serverStats = { // SUNUCU İSTATİSTİK
  guildID: '501124738085683201', //Sunucunun ID'si
  totalUsersID: '527346978582036490', //Toplam kullanıcı sayısının gözükmesini istediğin kanalın ID'si
  memberCountID: '527347216898195467', //Toplam Bot Olmayanların sayısının gözükmesini istediğin kanalın ID'si
  botCountID: '527347123730120715' //Toplam Bot Olanların sayısının gözükmesini istediğin kanalın ID'si
};

client.on('guildMemberAdd', member => {
  if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.totalUsersID).setName(`Toplam Kullanıcı Sayısı : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Üye Sayısı : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Bot Sayısı : ${member.guild.members.filter(m => m.user.bot).size}`);
 
});

client.on('guildMemberRemove', member => {
  if (member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.totalUsersID).setName(`Toplam Kullanıcı Sayısı : ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Üye Sayısı : ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Bot Sayısı : ${member.guild.members.filter(m => m.user.bot).size}`);
  
});
//////////////////////////////////////////////////////////













client.on("guildMemberAdd", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
if (prefix == null) prefix = '-'
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal) return;
  const skanal2 = member.guild.channels.find('name', skanal)
  const sayacgmesaj = await db.fetch(`sayacgm_${member.guild.id}`)
  skanal2.send(sayacgmesaj ? sayacgmesaj.replace('{kullanıcı}', `${member.user}`) .replace('{toplam}', `${sayac}`) .replace('{kalan}', `${sayac - member.guild.members.size}`) : `:inbox_tray: \`${member.user.tag}\` adlı kullanıcı sunucuya katıldı. \`${sayac}\` kullanıcı olmaya \`${sayac - member.guild.members.size}\` kullanıcı kaldı. <a:RainbowElmasGif:791205647101460530>`)

if (member.guild.members.size == sayac) {
    skanal2.send(`:tada: Sunucu \`${sayac}\` kullanıcıya ulaştı. Sayaç sıfırlandı.`)
    .then(db.delete(`sayac_${member.guild.id}`))
    .then(db.delete(`sayacK_${member.guild.id}`))
  }
});

client.on("guildMemberRemove", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
if (prefix == null) prefix = '-'
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!skanal) return;
  const skanal2 = member.guild.channels.find('name', skanal)
  const sayaccmesaj = await db.fetch(`sayaccm_${member.guild.id}`)
 skanal2.send(sayaccmesaj ? sayaccmesaj.replace('{kullanıcı}', `${member.user.tag}`) .replace('{sayı}', `${sayac}`) .replace('{kalan}', `${sayac - member.guild.members.size}`) : `:inbox_tray: \`${member.user.tag}\` adlı kullanıcı sunucudan ayrıldı. \`${sayac}\` kullanıcı olmaya \`${sayac - member.guild.members.size}\` kullanıcı kaldı. <a:RainbowElmasGif:791205647101460530>`)
});

client.on("message", async msg => {
  
  
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Küfür Ettiğin için sahibime bildirildin yakın zamanda sunucu sahibine bildirileceksin ').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${newMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!newMessage.member.hasPermission("BAN_MEMBERS")) {
                  newMessage.delete();
                          
                      return newMessage.reply('Bu Sunucuda Küfür Filtresi Aktiftir.').then(msg => msg.delete(3000));
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("message", async msg => {
  let reklam = await db.fetch(`reklam_${msg.guild.id}`)
      if (reklam == 'acik') {
          const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg", "discordapp", "discord.app",];
          if (reklam.some(word => msg.content.includes(word))) {
            try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
                    msg.delete();
                    msg.channel.send(`Bu sunucuda reklamlar **${client.user.username}** tarafından engellenmektedir! Reklam yapmana izin vermeyeceğim!`).then(msg => msg.delete(5000));
                        }              
                      } catch(err) {
                        console.log(err);
                      }
                    }
                }
                else if (reklam == 'kapali') {
                  
                }
                if (!reklam) return;
              });

client.on('message', async msg => {
  let komut = await db.fetch(`sunucuKomut_${msg.guild.id}`);
  let komutYazi;
  if (komut == null) komutYazi = 'ashahsgahgsjgasjhagsjhagsa'
  else komutYazi = ''+ komut +''
  if (msg.content.toLowerCase() === `${komutYazi}`) {
      let mesaj = await db.fetch(`sunucuMesaj_${msg.guild.id}`);
  let mesajYazi;
  if (mesaj == null) mesajYazi = 'Viçuğğğğ!!'
  else mesajYazi = ''+ mesaj +''
    msg.channel.send(mesajYazi)
  }
});

client.on("message", async msg => {
 let sa = await db.fetch(`saas_${msg.guild.id}`)
    if (sa == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 'sea' || msg.content.toLowerCase() == 'selamun aleyküm') {
          try {

                  return msg.reply('Aleyküm Selam Hoşgeldiniz ')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (sa == 'kapali') {
      
    }
    if (!sa) return;
  });

client.on("message", async message => {
    let afk_kullanici = message.mentions.users.first() || message.author;
    if(message.content.startsWith("-afk")) return; //! yazan yeri kendi botunuzun prefixi ile değiştirin.
  if (message.author.bot === true) return;
    if(message.content.includes(`<@${afk_kullanici.id}>`))
        if(await db.fetch(`afks_${afk_kullanici.id}`)) {
                message.channel.send(`**${client.users.get(afk_kullanici.id).tag}** adlı kullanıcı şuanda AFK! \n**Sebep:** \n${await db.fetch(`afks_${afk_kullanici.id}`)}`)
        }
        if(await db.fetch(`afks_${message.author.id}`)) {
                message.reply("başarıyla AFK modundan çıktın!")
            db.delete(`afks_${message.author.id}`)
        }
});

////////////
// eklendim
client.on('guildCreate', async guild => { client.channels.cache.get('791348501652176926').send(`${guild}, isimli sunucuya eklendim!`)})
// atıldım
client.on('guildRemove', async guild => { client.channels.cache.get('791348501652176926').send(`${guild}, isimli sunucudan atıldım.. :(`)})

////////
client.on('message', async msg => {
  if (msg.content === `<784373795283664906>`) return msg.channel.send(`Prefixim ${ayarlar.prefix}`);
});


/////////

////////////////////////slowmode
client.on('message', message => {
var antiraid = db.fetch(`sunucular.${message.guild.id}.spamkoruma`)
if(!antiraid) return;
if(message.author.bot) return;
message.guild.fetchMember(message.author).then(member => {
if(member.hasPermission('BAN_MEMBERS')) return;
var b = []
var aut = []
setTimeout(() => {
message.channel.fetchMessages({ limit: 10 }).then(m => {
m.forEach(a => {
if(m.filter(v => v.content === a.content).size > m.size / 2) {
message.guild.fetchMember(m.author).then(member2 => {
if(member2.hasPermission('BAN_MEMBERS')) return;
b.push(a)
aut.push(a.author)
})}})
if(!b.includes(":warning: | Saldırgan botlar susturulacak.")) { işlem() }
else {}
  
function işlem() {

if(b.length > 5) {
  message.channel.send(':warning: | Saldırı yapan botlar susturulacak.')
  aut.forEach(a => {
    message.channel.overwritePermissions(a, {
      "SEND_MESSAGES": false
    })
  })
  message.channel.send(client.emojiler.evet + ' | Saldırı yapan botlar susturuldu.')
} else return;
}
})})})})
///////////////////














//////////////

client.on('guildMemberAdd', async member => {
  
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let rol2 = member.guild.roles.find('name', rol);
  
  const rolk = await db.fetch(`rolK_${member.guild.id}`);
  if(!rolk) return;
  const rolk2 = member.guild.channels.find('name', rolk)
  const otorolmesaj = await db.fetch(`otorolm_${member.guild.id}`)
  
  member.addRole(rol2);
  rolk2.send(otorolmesaj ? otorolmesaj.replace('{kullanıcı}', `${member.user}`) .replace('{rol}',`${rol2.name}`) : ` \`${member.user.tag}\` adlı kullanıcıya \`${rol2.name}\` rolü verildi. <a:ver:694850273021132861>`)
});


////////////SUNUCU KUR/////////////////

client.on('message', async message => {
  const ms = require('ms');
  const args = message.content.slice(ayarlar.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let u = message.mentions.users.first() || message.author;
  if (command === "sunucu-kur") {
  if (message.guild.channels.find(channel => channel.name === "Bot Kullanımı")) return message.channel.send(" Bot Paneli Zaten Ayarlanmış.")
  if (!message.member.hasPermission('ADMINISTRATOR'))
  return message.channel.send(" Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir.");
    message.channel.send(`Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`)
      message.channel.awaitMessages(response => response.content === 'evet', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
    .then((collected) => {
   message.guild.createChannel('゜ÖNEMLİ KANALLAR ゜', 'category', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])



        
 message.guild.createChannel('📃゜kurallar', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "゜ÖNEMLİ KANALLAR ゜")));
 message.guild.createChannel('🚪゜gelen-giden', 'text', [{
  id: message.guild.id,
  deny: ['SEND_MESSAGES']
}])
.then(channel =>
       channel.setParent(message.guild.channels.find(channel => channel.name === "゜ÖNEMLİ KANALLAR ゜")));
       message.guild.createChannel('✅゜sayaç', 'text', [{
        id: message.guild.id,
        deny: ['SEND_MESSAGES']
      }])
.then(channel =>
             channel.setParent(message.guild.channels.find(channel => channel.name === "゜ÖNEMLİ KANALLAR ゜")));
             message.guild.createChannel('💾゜log-kanalı', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
            .then(channel => channel.setParent(message.guild.channels.find(channel => channel.name === "゜ÖNEMLİ KANALLAR ゜")));
            message.guild.createChannel('📢゜duyuru-odası', 'text', [{
              id: message.guild.id,
              deny: ['SEND_MESSAGES']
            }])
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "゜ÖNEMLİ KANALLAR ゜")));

       }) 
       .then((collected) => {
        message.guild.createChannel('゜GENEL KANALLAR ゜', 'category', [{
       id: message.guild.id,
     }]);
             
      message.guild.createChannel(`💡゜şikayet-ve-öneri`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "゜GENEL KANALLAR ゜")));
     message.guild.createChannel(`👥゜pre-arama-odası`, 'text')
     .then(channel =>
            channel.setParent(message.guild.channels.find(channel => channel.name === "゜GENEL KANALLAR ゜")));
     message.guild.createChannel(`📷゜görsel-içerik`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "゜GENEL KANALLAR ゜")));
     message.guild.createChannel(`「🤖」bot-komutları`, 'text')
     .then(channel =>
                  channel.setParent(message.guild.channels.find(channel => channel.name === "゜GENEL KANALLAR ゜")));
     message.guild.createChannel(`💬゜sohbet`, 'text')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "゜GENEL KANALLAR ゜")));

      message.guild.createChannel(`🏆•Kurucu Odası`, "voice")
      .then(channel =>
        channel.setParent(message.guild.channels.find(channel => channel.name === "゜SES KANALLARI ゜")))
      .then(c => {
        let role = message.guild.roles.find("name", "@everyone");
        let role2 = message.guild.roles.find("name", "Kurucu");
        
        c.overwritePermissions(role, {
            CONNECT: false,
        });
        c.overwritePermissions(role2, {
            CONNECT: true,
            
        });
    })

    message.guild.createChannel('゜SES KANALLARI ゜', 'category', [{
      id: message.guild.id,
    }]);

    message.guild.createChannel(`🏆•Yönetici Odası`, "voice")
    .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "゜SES KANALLARI ゜")))
    .then(c => {
      let role = message.guild.roles.find("name", "@everyone");
      let role2 = message.guild.roles.find("name", "Kurucu");
      let role3 = message.guild.roles.find("name", "Yönetici");
      c.overwritePermissions(role, {
          CONNECT: false,
      });
      c.overwritePermissions(role2, {
          CONNECT: true,
      });
      c.overwritePermissions(role3, {
          CONNECT: true,
      });
  })

  message.guild.createChannel(`💬•Sohbet Odası`, "voice")
  .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "゜SES KANALLARI ゜")))
  .then(c => {
    let role = message.guild.roles.find("name", "@everyone");
    c.overwritePermissions(role, {
        CONNECT: true,
    });
})

message.guild.createChannel('゜OYUN ODALARI ゜', 'category', [{
  id: message.guild.id,
}]);

message.guild.createChannel(`🎮•LOL`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "゜OYUN ODALARI ゜")))
 message.guild.createChannel(`🎮•ZULA`, 'voice')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "゜OYUN ODALARI ゜")))
 message.guild.createChannel(`🎮•COUNTER STRİKE`, 'voice')
.then(channel =>
 channel.setParent(message.guild.channels.find(channel => channel.name === "゜OYUN ODALARI ゜")))
 message.guild.createChannel(`🎮•PUBG`, 'voice')
 .then(channel =>
  channel.setParent(message.guild.channels.find(channel => channel.name === "゜OYUN ODALARI ゜")))
  message.guild.createChannel(`🎮•FORTNİTE`, 'voice')
  .then(channel =>
   channel.setParent(message.guild.channels.find(channel => channel.name === "゜OYUN ODALARI ゜")))
   message.guild.createChannel(`🎮•MİNECRAFT`, 'voice')
   .then(channel =>
    channel.setParent(message.guild.channels.find(channel => channel.name === "゜OYUN ODALARI ゜")))
    message.guild.createChannel(`🎮•ROBLOX`, 'voice')
    .then(channel =>
     channel.setParent(message.guild.channels.find(channel => channel.name === "゜OYUN ODALARI ゜")))
     message.guild.createChannel(`🎮•WOLFTEAM`, 'voice')
     .then(channel =>
      channel.setParent(message.guild.channels.find(channel => channel.name === "゜OYUN ODALARI ゜")))



      message.guild.createRole({
        name: 'Kurucu',
        color: 'RED',
        permissions: [
            "ADMINISTRATOR",
    ]
      })

      
      message.guild.createRole({
        name: 'Yönetici',
        color: 'BLUE',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES",
            "KICK_MEMBERS"
    ]
      })

      message.guild.createRole({
        name: 'Moderatör',
        color: 'GREEN',
        permissions: [
            "MANAGE_GUILD",
            "MANAGE_ROLES",
            "MUTE_MEMBERS",
            "DEAFEN_MEMBERS",
            "MANAGE_MESSAGES",
            "MANAGE_NICKNAMES"
    ]
      })

      message.guild.createRole({
        name: 'V.I.P',
        color: '00ffff',
      })

      message.guild.createRole({
        name: 'Üye',
        color: 'WHITE',
      })

      message.guild.createRole({
        name: 'Bot',
        color: 'ORANGE',
      })

       message.channel.send("Gerekli Odalar Kuruldu!")
     
            })   
    
}
});
///////////////////////////////////////////////







client.on("guildMemberAdd", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
if (prefix == null) prefix = '-'
  let mkanal = await db.fetch(`mgcK_${member.guild.id}`);
  if (!mkanal) return;
  const mkanal2 = member.guild.channels.find('name', mkanal)
  const gmesaj = await db.fetch(`girism_${member.guild.id}`)
  mkanal2.send(gmesaj ? gmesaj.replace('{kullanıcı}', `${member.user}`) .replace('{sunucu}', `${member.guild.name}`) : `\`${member.user.tag}\` Adlı Kullanıcı \`${member.guild.name}\` Adlı Sunucuya Katıldı. <a:gift:694850272715079690> )`)
});

client.on("guildMemberRemove", async member => {
  let prefix = await db.fetch(`prefix_${member.guild.id}`);
if (prefix == null) prefix = '-'
  let mkanal = await db.fetch(`mgcK_${member.guild.id}`);
  if (!mkanal) return;
  const mkanal2 = member.guild.channels.find('name', mkanal)
  const cmesaj = await db.fetch(`cikism_${member.guild.id}`)
 mkanal2.send(cmesaj ? cmesaj.replace('{kullanıcı}', `${member.user.tag}`) .replace('{sunucu}', `${member.guild.name}`) : `\`${member.user.tag}\` Adlı Kullanıcı \`${member.guild.name}\`Adlı Sunucudan Ayrıldı. <a:left:694880029665919026>  `)
});

client.config = require("./config.js")
client.logger = console
client.wait = promisify(setTimeout)
client.ayar = db

String.prototype.toProperCase = function() {
  return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: ", err);
});

client.login(ayarlar.token)






client.on("message", msg => {
 if (msg.content.toLowerCase() === "755412954492698694") {
 const id = "755412954492698694";
 const an = msg.guild.member(id);
 an.send(`${msg.author}(${msg.author.username},${msg.author.id}) kişisi **${msg.guild}**(${msg.guild.id}) sunucusunda seni etiketledi.`);
    }
  });

const express = require("express");
const app = express();
app.listen(process.env.PORT);
app.get("/", (request, response) => {
    response.sendStatus(200);
});












client.on('message', async message => {
  if (message.content === 'fakekatil') {
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
      }
  });
  client.on('message', async message => {
    if (message.content === 'fakeayril') {
      client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
        }
    });

client.on('userUpdate', (oldUser, newUser) => {//chimp 💕'b#0308
if(oldUser.avatarURL() !== newUser.avatarURL()) {

  client.guilds.cache.forEach(async guild => {
  if(guild.members.cache.get(newUser.id)) {
  
  const channeldata = await require('quick.db').fetch(`ppgif.${guild.id}`)
  if(!channeldata) return;
  let channel = await guild.channels.cache.get(channeldata)
  
  let avatar = new Discord.MessageAttachment(newUser.avatarURL())
  let gifkontrol;
  if(newUser.avatarURL().includes('.gif')) { gifkontrol = `**[GİF](${newUser.avatarURL()})**` }
  if(!newUser.avatarURL().includes('.gif')) { gifkontrol = `~~**[GİF](${newUser.avatarURL()})**~~` }
    
    
  const chimp2 = new Discord.MessageEmbed().setColor('GOLD').setAuthor(newUser.tag).setImage(newUser.avatarURL()).setDescription(`${gifkontrol} **[PNG](${newUser.avatarURL().replace('.gif', '.png').replace('.jpg', '.png').replace('.webp', '.png')})** **[JPG](${newUser.avatarURL().replace('.png', '.jpg').replace('.gif', '.jpg').replace('.webp', '.jpg')})** **[WEBP](${newUser.avatarURL().replace('.gif', '.webp').replace('.png', '.webp').replace('.jpg', '.webp')})**`)
  if(!newUser.avatarURL().includes('.gif')) return channel.send(chimp2)

  }
  })
}
})// codare ♥