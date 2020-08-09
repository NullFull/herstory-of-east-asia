const path = require(`path`)

module.exports = {
    plugins: [
        `gatsby-plugin-resolve-src`,
        `gatsby-plugin-stylus`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `docs`,
                path: path.join(__dirname, `docs`)
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: path.join(__dirname, `src`, `images`)
            }
        },
        `gatsby-transformer-remark`
    ]
}
