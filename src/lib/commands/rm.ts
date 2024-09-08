import type { Output } from '../handle-enter-key'

export const rm = (args: string[], output: Output) => {
  if (args.length === 0) {
    output('usage: rm [-f | -i] [-dIPRrvWx] file ...\n       unlink [--] file')
    return
  }

  for (const arg of args) {
    output(`rm: cannot remove '${arg}': No such file or directory`)
  }
}
