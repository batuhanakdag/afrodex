const config = {
  token: "Nzg0MzczNzk1MjgzNjY0OTA2.X8oXBQ.bGJo-fQmhaZ15j9mBjrcStirmkA", //Botunuzun Tokeni
  sahip: "755412954492698694", //idniz

  dashboard: {
    oauthSecret: "KI2V97fmIJJJo39aHqTMP9b1XDfVsVoS", // Secrec Keyiniz
    callbackURL: "https://sakk-si.glitch.me/callback", //Dönüş Linki
    sessionSecret: "super-secret-session-thing", //Burayı Ellemiyoruz
    domain: "https://sakk-si.glitch.me", //alanadınız domaininiz
    port: 8080 //glitch kullanıyorsanız ellemeyin vds ise 80 yapın // SSL için cloudflare kullanıcaz 443 yapmayın portu 80 kalsın (vds için)
  }
};

module.exports = config;
