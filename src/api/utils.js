export function fileParse (file, type = 'base64') {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    if (type === 'base64') {
      fileReader.readAsDataURL(file)
    } else {
      fileReader.readAsArrayBuffer(file)
    }
    fileReader.onload = (ev) => {
      resolve(ev.target.result)
    }
  })
}