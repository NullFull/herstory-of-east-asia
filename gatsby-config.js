module.exports = {
    plugins: [
        `gatsby-plugin-resolve-src`,
        `gatsby-plugin-stylus`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `docs`,
                path: `${__dirname}/docs`
            }
        },
        `gatsby-transformer-remark`
    ]
}
