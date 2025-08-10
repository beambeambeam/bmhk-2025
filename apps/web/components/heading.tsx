interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

export function Heading({ text, ...props }: HeadingProps) {
  return (
    <div {...props}>
      <div className="flex w-full items-center justify-center gap-4 md:gap-8">
        <div className="w-17 h-0 rounded-full bg-gradient-to-l from-[#FFFFFF] via-[#C9DDFA61] via-[38%] to-transparent md:h-[1px] md:w-[338px] lg:h-[2px] lg:w-[360px]" />
        <div className="text-shadow-[0_0_5px_#FFFFFF] text-center text-2xl font-medium leading-loose text-white md:text-4xl md:leading-[56px] lg:text-5xl lg:leading-[140%]">
          {text}
        </div>
        <div className="w-17 h-0 rounded-full bg-gradient-to-r from-[#FFFFFF] via-[#C9DDFA61] via-[38%] to-transparent md:h-[1px] md:w-[338px] lg:h-[2px] lg:w-[360px]" />
      </div>
    </div>
  )
}
