exports.run = async (client, msg, args) => {
    let ask=[
      "Aşk ölçer %3 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %6 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %9 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %12 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %18 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %20 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %23 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %26 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %29 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %30 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %40 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %50 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %60 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %70 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %73 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %76 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %79 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %82 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %85 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %88 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %90 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %91 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %92 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %93 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %94 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %95 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %96 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %97 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %98 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %99 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
      "Aşk ölçer %100 Gösteriyor.<a:2266_Rainbow_heart:791205569628471327>",
    ]
      let member = msg.mentions.members.first()
     if(!member)return msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: ('🚫 Kimi Sevdiğini etiketlemelisin..')
  }});
 
 
 
    else{
    msg.channel.send({embed: {
   color: Math.floor(Math.random() * (0xFFFFFF + 1)),
   description: (`${member} ${ask[Math.floor(Math.random() * 30)]}.`)
    }})
    }
 
 
  }
 
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
  kategori: 'Eğlence',
    permLevel: 0
   };
 
  exports.help = {
    name: 'aşkölçer',
    description: 'Aşk Ölçmeni sağlar.',
    usage: 'aşkölçer'
   }