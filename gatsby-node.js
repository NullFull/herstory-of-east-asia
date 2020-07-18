const path = require(`path`)
const fetch = require(`isomorphic-unfetch`)
const Papa = require(`papaparse`)


exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === `build-html`) {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /three.interaction/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
}


exports.onCreateNode = ({ node, getNode, actions: { createNodeField } }) => {
    if (node.internal.type === `MarkdownRemark`) {
        const fileNode = getNode(node.parent)
        createNodeField({
            node,
            name: `code`,
            value: fileNode.relativeDirectory
        })
        createNodeField({
            node,
            name: `name`,
            value: fileNode.name
        })
    }
}


exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const query = await graphql(`
        query allDocs {
          allMarkdownRemark {
            nodes{
              id
              html
              fields {
                name
                code
              }
            }
          }
        }
    `)

    const docs = {}
    query.data.allMarkdownRemark.nodes.forEach(node => {
        const {html, fields: {name, code}} = node
        if (!docs[name]) {
            docs[name] = {}
        }

        docs[name][code] = html
    })

    const response = await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vTZO-2qE3ZYaJWf68HVCadcJT2hnyb2vdycYu2zYruYbStnPL1zNjvP8Zt7EjE8O2Fc5NXZ2oqjeeRK/pub?gid=1683764614&single=true&output=csv`)
    const text = await response.text()
    const data = Papa.parse(text).data

    const header = data[0]
    const events = data.slice(1).map(row => {
        let obj = {
            id: row[0]
        }
        header.forEach((key, j) => {
            obj[key] = row[j].trim()

            if (key === 'Location') {
                obj[key] = obj[key].split(',')
            }
        })
        return obj
    })
    events.sort((a, b) => a['Start'] - b['Start'])

    const context = {
        introduce: docs.introduce,
        events,
    }

    createPage({
        path: `/`,
        component: require.resolve(`./src/templates/index.js`),
        context: {
            ...context
        }
    })

    events.map(event => {
        createPage({
            path: `/p/${event.id}`,
            component: require.resolve(`./src/templates/index.js`),
            context: {
                ...context,
                event,
            }
        })
    })
}
