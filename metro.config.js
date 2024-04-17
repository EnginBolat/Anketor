const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

module.exports = async () => {
  const defaultConfig = await getDefaultConfig(__dirname);

  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);

  const config = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: [...assetExts.filter(ext => ext !== 'svg'), 'zip'],
      sourceExts: [...sourceExts, 'svg', 'zip'],
    },
  };

  return mergeConfig(defaultConfig, config);
};