const triggerTypeError = () => {
  // TypeError
  const bb = void 0
  bb.name
}
const triggerReferenceError = () => {
  // ReferenceError
  cc
}
const triggerRangeError = () => {
  // RangeError
  ;(function fn() {
    fn()
  })()
}
const triggerResourceError = () => {
  // ResourceError
  const img = document.createElement('img')
  img.src = 'http://asdvcxvgyre.com/aaa.png'
  document.body.append(img)
}
const triggerHttpError = () => {
  // HttpError
  fetch('http://localhost:132123/remote/notdefined', {})
}
