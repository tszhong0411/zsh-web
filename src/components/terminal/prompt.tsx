import { type ReactNode } from 'react'

import { HOSTNAME, USERNAME } from '@/lib/constants'

type PromptProps = {
  children: ReactNode
}

const Prompt = (props: PromptProps) => {
  const { children } = props

  return (
    <div>
      <span>
        {USERNAME}@{HOSTNAME} ~ %&nbsp;
      </span>
      <div className='inline break-all'>{children}</div>
    </div>
  )
}

export default Prompt
