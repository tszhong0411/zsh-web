import { useTerminalContext } from '@/contexts/terminal'
import { HOME, HOSTNAME, USERNAME } from '@/lib/constants'

type PromptProps = {
  children: React.ReactNode
}

const Prompt = (props: PromptProps) => {
  const { children } = props
  const { pwd } = useTerminalContext()

  return (
    <div>
      <span>
        {USERNAME}@{HOSTNAME} {pwd === HOME ? '~' : pwd.split('/').pop()} %&nbsp;
      </span>
      <div className='inline break-all'>{children}</div>
    </div>
  )
}

export default Prompt
