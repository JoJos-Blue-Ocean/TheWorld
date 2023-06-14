require('dotenv').config();

module.exports = {
  expo: {
    name: 'the-world',
    slug: 'the-world',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: [
      '**/*',
    ],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: 'e49d8d78-95a8-4399-b3ae-e884c454dbbe',
      },
      apiUrl: process.env.API_URL,
      discogsKey: process.env.DISCOGS_CONSUMER_KEY,
      discogsSecret: process.env.DISCOGS_CONSUMER_SECRET,
      youtubeAPIKey: process.env.youtubeAPIKey,
    },
    owner: 'davidtran',
  },
};
