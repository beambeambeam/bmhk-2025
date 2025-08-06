interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

export function Heading({ text, ...props }: HeadingProps) {
  return (
    <div {...props}>
      <div className="flex w-full items-center justify-center gap-8">
        <div className="h-[2px] w-[360px] rounded-full bg-gradient-to-l from-[#FFFFFF] via-[#C9DDFA61] via-[38%] to-transparent" />
        <div className="text-shadow-[0_0_5px_#FFFFFF] text-center text-5xl font-medium leading-[140%] text-white">
          {text}
        </div>
        <div className="h-[2px] w-[360px] rounded-full bg-gradient-to-r from-[#FFFFFF] via-[#C9DDFA61] via-[38%] to-transparent" />
      </div>
    </div>
  )
}
