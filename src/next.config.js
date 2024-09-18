const path = require('path');

module.exports = {
    output: 'standalone',
    webpack: (config, { dev }) => {
        if (dev) {
            config.devtool = 'source-map';
        }

        config.resolve.alias['@'] = path.resolve(__dirname, 'src');

        return config;
    },
};


