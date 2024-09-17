module.exports = {
    output: 'standalone',
    webpack: (config, { dev }) => {
        if (dev) {
            config.devtool = 'source-map';
        }
        return config;
    },
};
