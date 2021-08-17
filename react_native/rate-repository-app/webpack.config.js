const path = require('path');
const createExpoWwebPackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWwebPackConfigAsync(env, argv);

  config.module.rules.push({
    test: [/\.js$/, /\.ts$/],
    loader: 'babel-loader',
    include: [path.join(__dirname, 'node_modules/react-router-native')],
  });

  return config;
};
