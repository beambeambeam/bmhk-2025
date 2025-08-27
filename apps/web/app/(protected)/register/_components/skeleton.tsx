import { Spinner } from "@workspace/ui/components/spinner"

function RegisterFormSkeleton() {
  return (
    <div className="liquid grid h-[40rem] w-full grid-cols-1 flex-col gap-5 rounded-[40px] p-4 px-3 md:px-[60px] lg:px-[100px] 2xl:gap-8 2xl:px-80 2xl:py-6">
      <Spinner className="size-20" />
    </div>
  )
}
export default RegisterFormSkeleton
