import { useWindowFocus } from '@/hooks/use-window-focus'
import { cn } from '@/utils/cn'

const Controls = () => {
  const isFocused = useWindowFocus()

  return (
    <div className='space-x-2'>
      <button
        type='button'
        className={cn(
          'size-3 rounded-full',
          isFocused
            ? 'border-[0.5px] border-black/20 bg-[#ff5f57]'
            : 'bg-[#4e4e51]'
        )}
      />
      <button
        type='button'
        className={cn(
          'size-3 rounded-full',
          isFocused
            ? 'border-[0.5px] border-black/20 bg-[#febc2e]'
            : 'bg-[#4e4e51]'
        )}
      />
      <button
        type='button'
        className={cn(
          'size-3 rounded-full',
          isFocused
            ? 'border-[0.5px] border-black/20 bg-[#28c840]'
            : 'bg-[#4e4e51]'
        )}
      />
    </div>
  )
}

export default Controls
