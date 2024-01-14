const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        '@assets': 'src/assets',
        '@components': 'src/components',
        '@global': 'src/global',
        '@icons': 'src/global/icons.js',
        '@pages': 'src/pages',
        '@providers': 'src/store/providers',
        '@hooks': 'src/hooks',
    })(config);

    return config;
};