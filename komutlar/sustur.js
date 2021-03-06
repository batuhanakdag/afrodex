const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');
const ms = require("ms");

module.exports.run = async (bot, message, args) => {


  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply(`Bu Komutu Kullanmak İçin : ${ayarlar.prefix}sustur <Kullanıcı> <Süre> Olarak Yazmalısınız.`);
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Hata: Geçici olarak susturmaya çalıştığınız kişi yetkili veya bot'un yetkisi belirttiğiniz kişiyi geçici olarak susturmaya yetmiyor!");
let muterole = message.guild.roles.find(r => r.name === "Afro Muted");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Afro Susturucu",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply(`Bu Komutu Kullanmak İçin : ${ayarlar.prefix}sustur <Kullanıcı> <Süre> Olarak Yazmalısınız.`);

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> için ses kapatıldı! ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> Kişinin susturulma süresi dolduğu için mutesi kaldırıldı!`);
  }, ms(mutetime));



}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['geçici-sustur', 'gsustur'],
  kategori: "moderasyon",
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'Belirtilen Kullanıcıyı Süreli Susturur.',
  usage: 'sustur [Kullanıcı] [Süre]'
};