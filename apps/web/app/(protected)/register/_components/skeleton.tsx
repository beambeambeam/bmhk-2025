import { Spinner } from "@workspace/ui/components/spinner"

function RegisterFormSkeleton() {
  return (
    <div className="liquid grid h-[40rem] w-full max-w-[80rem] grid-cols-1 flex-col gap-5 rounded-[40px] p-4 2xl:gap-8 2xl:px-8 2xl:py-6">
      <Spinner className="size-20" />
    </div>
  )
}
export default RegisterFormSkeleton
