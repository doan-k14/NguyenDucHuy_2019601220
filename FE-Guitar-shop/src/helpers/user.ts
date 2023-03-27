export const getAvatar = (name: string) => {
  const arrName = name.split(' ')
  const firstLetter = arrName[0] ? arrName[0].charAt(0) : ''
  const secondLetter = arrName[1] ? arrName[1].charAt(0) : ''

  return firstLetter.concat(secondLetter)
}
