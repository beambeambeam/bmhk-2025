interface HeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

export function Heading({ text, ...props }: HeadingProps) {
  return (
    <div {...props}>
      <div className="flex w-full items-center justify-center gap-4 lg:gap-8">
        <div className="h-[1px] w-[83.5px] rounded-full bg-gradient-to-l from-[#FFFFFF] via-[#C9DDFA61] via-[38%] to-transparent lg:w-[376.5px] 2xl:w-[361px]" />
        <div className="text-shadow-[0_0_5px_#FFFFFF] text-center text-2xl font-medium text-white lg:whitespace-nowrap lg:text-[2.5rem] 2xl:text-5xl">
          {text}
        </div>
        <div className="h-[1px] w-[83.5px] rounded-full bg-gradient-to-r from-[#FFFFFF] via-[#C9DDFA61] via-[38%] to-transparent lg:w-[376.5px] 2xl:w-[361px]" />
      </div>
    </div>
  )
}
