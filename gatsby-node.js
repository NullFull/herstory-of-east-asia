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

const fetchEvents = async () => {
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
    return events
}

const fetchTags = async () => {
    const response = await fetch(`https://docs.google.com/spreadsheets/d/e/2PACX-1vTZO-2qE3ZYaJWf68HVCadcJT2hnyb2vdycYu2zYruYbStnPL1zNjvP8Zt7EjE8O2Fc5NXZ2oqjeeRK/pub?gid=824519574&single=true&output=csv`)
    const text = await response.text()
    const data = Papa.parse(text).data

    const headers = data[0]
    const tags = {}

    headers.map(col => {
        tags[col] = {}
    })

    data.slice(1).map(row => {
        headers.map((header, index) => {
            if (row[index]) {
                const key = row[0].trim()
                const value = row[index].trim()
                tags[header][key] = value
            }
        })
    })

    return tags
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
        const { html, fields: { name, code } } = node
        if (!docs[name]) {
            docs[name] = {}
        }

        docs[name][code] = html
    })

    const events = await fetchEvents()
    const tagDict = await fetchTags()

    const tags = events
        .map(item => item['Tags'])
        .join()
        .split(',')
        .filter((value, index, self) => {
            value = value.trim()
            return (self.indexOf(value) === index) && value.length > 0
        })

    const countries = events.map(item => item['Country/Region']).filter((value, index, self) => self.indexOf(value) === index)

    const context = {
        introduce: docs.introduce,
        tags,
        countries,
        events,
        tagDict,
    }

    createPage({
        path: `/`,
        component: require.resolve(`./src/templates/index.js`),
        context: {
            ...context,
        }
    })

    events.map(event => {
        event['Tags'] = event['Tags'].split(',').map(tag => tag.trim())
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
