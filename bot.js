const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

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

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("guildMemberAdd", async member => {
  let ototag = await db.fetch(`ototag_${member.guild.id}`);
  let kanal = await db.fetch(`ototagKanal_${member.guild.id}`);

  if (ototag){
    return member.setNickname(`${ototag} ${member.user.username}`)}

    if (kanal){
    const embed = new Discord.RichEmbed()
      .setDescription(
        `**✅ | Sunucuya Yeni Katılan \`${member.user.username}\` İsimli Kullanıcının İsmine  \`${ototag}\`  Tagı Eklendi!**`
      )
      .setTimestamp()
      .setColor("0x36393E")
      .setFooter(`Owner Bot | Oto-Tag Sistemi `);
    member.guild.channels.get(kanal).send(embed)}
  })

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'prefix') {
    msg.reply('Prefiximiz: **stc.**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Prefix') {
    msg.reply('Prefiximiz: **stc.**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'PREFİX') {
    msg.reply('Prefiximiz: **stc.**');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm selam,  hoş geldin ^^');
  }
});

client.on('ready', ()=>{
client.channels.get('751416393383018496').join()
})

client.on('message', msg => {

if(client.ping > 550) {

            let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
            'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
            'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
            'russia']
           let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
           let sChannel = msg.guild.channels.find(c => c.name === "saldırı-koruma")

           sChannel.send(`⚠UYARI⚠\n \n🔸 Sunucunun Pingi Yükseldiğinden Dolayı Bölge Değiştirildi!\n🔸 Yeni Bölge: ${yenibölge} `+ client.ping)
           msg.guild.setRegion(yenibölge)
           .then(g => console.log("🌍 Bölge:" + g.region))
           .then(g => msg.channel.send("✅ Bölge **"+ g.region  + " Olarak Değiştirildi! 🏡"))
           .then(msg.reply('✅ Bölge Değiştirildi! ')) 
           .catch(console.error);
}});

client.on("message", async msg => {
  if (msg.channel.type === "dm") return;
  if (msg.author.bot) return;
  if (msg.content.length > 4) {
    if (db.fetch(`capslock_${msg.guild.id}`)) {
      let caps = msg.content.toUpperCase();
      if (msg.content == caps) {
        if (!msg.member.hasPermission("ADMINISTRATOR")) {
          if (!msg.mentions.users.first()) {
            msg.delete();
            return msg.channel
              .send(`✋ Lütfen Büyük Harf Kullanma!`)
              .then(m => m.delete(5000));
          }
        }
      }
    }
  }
});

client.on("message", async msg => { 
const dcskelime = ["669590859599314944"]; 
if (dcskelime.some(dcss => msg.content.includes(dcss))) {
msg.reply("Etiketleme Lütfen!")
msg.delete()
}}) 

    client.on("guildMemberAdd", async member => {
    let gkanal = await db.fetch('rgiris_'+member.guild.id)
    const gözelkanal = member.guild.channels.get(gkanal)
    if (!gözelkanal) return; //dcs ekibi
     let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {
  
          const bg = await Jimp.read("https://cdn.discordapp.com/attachments/596076560293953565/613821209880297502/giris_yapt.png");
            const userimg = await Jimp.read(member.user.avatarURL);
            var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(300, 300);
            await bg.composite(userimg, 50, 20).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              }, 10000);
        }
    })
client.on("guildMemberRemove", async member => {
   let gkanal = await db.fetch('rgiris_'+member.guild.id)
    const gözelkanal = member.guild.channels.get(gkanal)
    if (!gözelkanal) return; //dcs ekibi
        let username = member.user.username;
        if (gözelkanal === undefined || gözelkanal === null) return;
        if (gözelkanal.type === "text") {              
           const bg = await Jimp.read("https://cdn.discordapp.com/attachments/596076560293953565/613821573249499177/cksyapt.png");
            const userimg = await Jimp.read(member.user.avatarURL);
          var font;
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
            await bg.print(font, 430, 170, member.user.tag);
            await userimg.resize(300, 300);
            await bg.composite(userimg, 50, 20).write("./img/"+ member.id + ".png");
              setTimeout(function () {
                    gözelkanal.send(new Discord.Attachment("./img/" + member.id + ".png"));
              }, 1000);
              setTimeout(function () {
                fs.unlink("./img/" + member.id + ".png");
              
              }, 10000);
        }
    })    

client.on("guildMemberRemove", member => {
  const profil = JSON.parse(fs.readFileSync("./sayaç.json", "utf8"));
  if (!profil[member.guild.id]) return;
  if (profil[member.guild.id]) {
    let sayaçkanalID = profil[member.guild.id].kanal;
    let sayaçsayı = profil[member.guild.id].sayi;
    let sayaçkanal = client.channels.get(sayaçkanalID);
    let aralık = parseInt(sayaçsayı) - parseInt(member.guild.members.size);
    sayaçkanal.sendMessage(
      "🔸 `" +
        `${member.user.tag}` +
        "` Sunucudan Ayrıldı! \n🔸 `" +
        sayaçsayı +
        "` Kişi Olmamıza `" +
        aralık +
        "` Kişi Kaldı! \n🔸 `" +
        member.guild.members.size +
        "` Kişiyiz!"
    );
  }
});

client.on("guildCreate", guild => {
  let dcs_kanal = client.channels.get("752961011732054086")

 const dcs = new Discord.RichEmbed()
.setTitle("SUNUCUYA EKLENDİM")
.setColor("GREEN")
.addField('▪ Sunucu İsmi', `\`${guild.name}\``)
.addField('▪ Üye Sayısı', `\`${guild.members.size}\``)
.addField('▪ Kurucu', `\`${guild.owner.user.tag}\``)
dcs_kanal.send(dcs)
});

client.on("guildDelete", guild => {
  let dcs_kanal = client.channels.get("752961011732054086")

 const dcs = new Discord.RichEmbed()
.setTitle("SUNUCUDAN AYRILDIM")
.setColor("RED")
.addField('▪ Sunucu İsmi', `\`${guild.name}\``)
.addField('▪ Üye Sayısı', `\`${guild.members.size}\``)
.addField('▪ Kurucu', `\`${guild.owner.user.tag}\``)
dcs_kanal.send(dcs)
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on("ready", async () => {
 setInterval(() => {
    let mesajlar = [
      `🔥 | +mute`,
      `🔥 | +sa-as sistemi`,
      `🔥 | +yenilikler`,
      `🔥 | +canlıdestek`,
      `🔥 | +kick`,
      `🔥 | +ban`,
      `🔥 | +ototag`,
      `🔥 | +say`,
      `🔥 | +report`
    ];

    const mesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];

    client.user.setPresence({
      game: {
        name: mesaj,
        type: "WATCHING"
      },
      status: "online"
    });
  }, 2000);   //1000= 1 saniye - 20000=20 saniye
})

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);