import { HOME, HOSTNAME, USERNAME } from '@/lib/constants'

type PromptProps = {
  children: React.ReactNode
  pwd: string
}

const Prompt = (props: PromptProps) => {
  const { children, pwd } = props

  const currentPath = pwd === '/' ? '/' : pwd === HOME ? '~' : pwd.split('/').pop()

  return (
    <div>
      <span>
        {USERNAME}@{HOSTNAME} {currentPath} %&nbsp;
      </span>
      <div className='inline break-all'>{children}</div>
    </div>
  )
}

export default Prompt
