export const hasCodeTag = (node) => {
  return node?.parentElement?.localName === 'code'
}
