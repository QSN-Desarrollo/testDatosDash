import { Config } from "src/interface/tweetsInterface";

export  const config:Config  = {
   dbConfig : {
    Facebook: 'mongodb://usuario:contraseña@localhost:27017/Facebook',
    Twitter: 'mongodb://usuario:contraseña@localhost:27017/Twitter',
    Instagram: 'mongodb://usuario:contraseña@localhost:27017/Instagram',
      },
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
    env: process.env.NODE_ENV || 'dev' || 'production',
    // port: process.env.PORT || '3000',
    DB: {
      url: process.env.MONGO_URL || 'mongodb://root:root@localhost:27017/?authSource=admin',
      urlProduction: process.env.MONGO_URL || `mongodb://redes:85%5EX1v%40h_8bW@200.58.107.250:27017/?authMechanism=SCRAM-SHA-1`,
      urlProductionFacebook: process.env.MONGO_URL || 'mongodb://qsn:aNg866%23%3E@200.58.107.250:27017/Facebook?authSource=admin&authMechanism=SCRAM-SHA-1',
      urlProductionTwitter: process.env.MONGO_URL || 'mongodb://redes:85%5EX1v%40h_8bW@200.58.107.250:27017/Twitter?authSource=admin&authMechanism=SCRAM-SHA-1',
      urlProductionInstagrams: process.env.MONGO_URL || 'mongodb://qsn:aNg866%23%3E@200.58.107.250:27017/Instagrams?authSource=admin&authMechanism=SCRAM-SHA-1',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    },
    accessToken: process.env.ACCESS_TOKEN_SECRET || 'Access_secret',
    refressToken: process.env.REFRESH_TOKEN_SECRET || 'Refresh_secret',
  };

