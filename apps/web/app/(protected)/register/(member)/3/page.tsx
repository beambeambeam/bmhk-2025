"use client"

import {
  useIsReadyForFinalSubmit,
  useRegisterStatusActions,
} from "@/app/(protected)/_components/status/context"
import MemberRegisterForm, {
  memberRegisterSchemaType,
} from "@/app/(protected)/register/(member)/_components/form"
import RegisterFormSkeleton from "@/app/(protected)/register/_components/skeleton"
import { orpc, queryClient } from "@/utils/orpc"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Button } from "@workspace/ui/components/button"
import { useRouter } from "next/navigation"

function MemberPage3() {
  const router = useRouter()
  const { setSubmitRegister } = useRegisterStatusActions()

  const teamQuery = useQuery(orpc.register.team.get.queryOptions())

  const memberQuery = useQuery(
    orpc.register.member.get.queryOptions({
      input: {
        memberIndex: 3,
      },
    })
  )

  const mutation = useMutation(
    orpc.register.member.set.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.register.status.get.key(),
        })
      },
    })
  )

  const isReadyForSubmit = useIsReadyForFinalSubmit(2)
  const showFinalSubmit =
    teamQuery.data?.success && teamQuery.data.team?.memberCount === 2 && isReadyForSubmit

  const submitMutation = useMutation(
    orpc.register.status.submit.mutationOptions({
      onSuccess: (data) => {
        if (data.registerStatus?.submitRegister) {
          setSubmitRegister(data.registerStatus.submitRegister)
        }
        router.push("/teams")
      },
    })
  )

  if (teamQuery.isPending || memberQuery.isPending) {
    return <RegisterFormSkeleton />
  }

  if (!teamQuery.data?.team) {
    router.push("/register/team")
  }

  if (teamQuery.data?.team?.memberCount === 2) {
    router.push("/register/2")
    return null
  }

  const handleSubmit = (values: memberRegisterSchemaType) => {
    mutation.mutate({
      ...values,
      memberIndex: 3,
    })
  }
  return (
    <>
      <MemberRegisterForm
        onSubmit={handleSubmit}
        disabled={mutation.isPending}
        defaultValues={
          memberQuery.data && memberQuery.data.success && memberQuery.data.member
            ? {
                prefix: memberQuery.data.member.prefix as "MR" | "MS" | "MRS",
                thai_firstname: memberQuery.data.member.thaiFirstname ?? "",
                thai_middlename: memberQuery.data.member.thaiMiddlename ?? "",
                thai_lastname: memberQuery.data.member.thaiLastname ?? "",
                english_firstname: memberQuery.data.member.firstName ?? "",
                english_middlename: memberQuery.data.member.middleName ?? "",
                english_lastname: memberQuery.data.member.lastname ?? "",
                food_allergy: memberQuery.data.member.foodAllergy ?? "",
                food_type: memberQuery.data.member.foodType ?? "",
                drug_allergy: memberQuery.data.member.drugAllergy ?? "",
                email: memberQuery.data.member.email ?? "",
                phone_number: memberQuery.data.member.phoneNumber ?? "",
                line_id: memberQuery.data.member.lineId ?? "",
                parent: memberQuery.data.member.parent ?? "",
                parent_phone: memberQuery.data.member.parentPhoneNumber ?? "",
                national_doc: memberQuery.data.member.nationalDoc
                  ? [memberQuery.data.member.nationalDoc]
                  : [],
                face_picture: memberQuery.data.member.facePic ? [memberQuery.data.member.facePic] : [],
                p7_doc: memberQuery.data.member.p7Doc ? [memberQuery.data.member.p7Doc] : [],
                chronic_disease: memberQuery.data.member.chronicDisease ?? "",
              }
            : undefined
        }
        index={3}
        isPending={mutation.isPending}>
        {showFinalSubmit && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                disabled={submitMutation.isPending}
                className="liquid mb-8 flex h-fit w-full items-center justify-between gap-4 rounded-[32px] py-3 pl-6 pr-3 md:w-auto md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
                <span className="text-[20px] font-medium text-white 2xl:text-[22px]">ลงทะเบียน</span>
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="liquid max-w-md rounded-3xl border border-white/10 bg-white/10 px-6 py-8 text-white shadow-xl backdrop-blur-2xl">
              <AlertDialogHeader className="space-y-2 text-center">
                <AlertDialogTitle className="text-center text-base font-medium text-white lg:text-lg 2xl:text-2xl">
                  ยืนยันการลงทะเบียนหรือไม่
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-sm text-white/70 lg:text-base 2xl:text-lg">
                  หากยืนยันแล้ว จะไม่สามารถแก้ไขข้อมูลได้อีก
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="mt-6 flex justify-end gap-3">
                <AlertDialogCancel className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm text-white hover:bg-white/10">
                  ยกเลิก
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => submitMutation.mutate({})}
                  className="text-nav-2 rounded-full !bg-green-600 px-6 py-2 text-sm font-medium !text-white shadow-lg hover:opacity-90">
                  ยืนยัน
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </MemberRegisterForm>
    </>
  )
}
export default MemberPage3
