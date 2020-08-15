const TagContext = React.createContext({})

const TagsProvider = ({ children }) => {
  const [tags, setTags] = React.useState('')

  return (
    <TagContext.Provider value={{ tags, setTags }}>
      {children}
    </TagContext.Provider>
  )
}

export default TagProvider