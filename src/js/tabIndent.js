const SUPPORT_TARGET = new Set(['pull_request[body]', 'issue[body]', 'comment[body]'])

const isValidTarget = (name) => SUPPORT_TARGET.has(name)

function extension(e) {
  const textarea = this.value

  if (!textarea) {
    return
  }

  let start = this.selectionStart
  let end = this.selectionEnd

  if (e.key === 'Tab') {
    e.preventDefault()

    // for single character
    // TODO: using deprecated method because of undo. needs another way.
    if (start === end) {
      if (!e.shiftKey) {
        document.execCommand('insertText', false, '\t')
      } else if (start > 0 && textarea[start - 1] === '\t') {
        document.execCommand('delete')
      }
    }
  }
}

export function globalIndentHook() {
  Array.from(document.querySelectorAll("textarea[name$='[body]']"))
    .filter((elem) => isValidTarget(elem.name))
    .map((elem) => {
      elem.addEventListener('keydown', extension)
      console.debug(`extension attached: ${elem.name}`)
    })
}
