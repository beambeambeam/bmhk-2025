"use client"

import {
  useIsReadyForFinalSubmit,
  useRegisterStatusActions,
} from "@/app/(protected)/_components/status/context"
import MemberRegisterForm, {
  memberRegisterSchemaType,
} from "@/app/(protected)/register/(member)/_components/form"
import { orpc, queryClient } from "@/utils/orpc"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Button } from "@workspace/ui/components/button"
import { useRouter } from "next/navigation"

function MemberPage2() {
  const router = useRouter()
  const { setSubmitRegister } = useRegisterStatusActions()

  const teamQuery = useQuery(orpc.register.team.get.queryOptions())

  const memberQuery = useQuery(
    orpc.register.member.get.queryOptions({
      input: {
        memberIndex: 2,
      },
    })
  )

  const mutation = useMutation(
    orpc.register.member.set.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: orpc.register.status.get.key(),
        })
        if (teamQuery.data?.success && teamQuery.data.team?.memberCount === 3) {
          router.push("/register/3")
        }
      },
    })
  )

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

  const isReadyForSubmit = useIsReadyForFinalSubmit(2)
  const showFinalSubmit =
    teamQuery.data?.success && teamQuery.data.team?.memberCount === 2 && isReadyForSubmit

  if (teamQuery.isPending || memberQuery.isPending) {
    return <div>Loading...</div>
  }

  if (!teamQuery.data?.team) {
    router.push("/register/team")
  }

  const handleSubmit = (values: memberRegisterSchemaType) => {
    mutation.mutate({
      ...values,
      memberIndex: 2,
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
        index={2}
        isPending={mutation.isPending}>
        <Button
          onClick={() => submitMutation.mutate({})}
          disabled={submitMutation.isPending || showFinalSubmit}
          className="liquid mb-8 flex h-fit w-full items-center justify-between gap-4 rounded-[20px] py-3 pl-6 pr-3 md:w-auto md:pl-8 md:pr-4 2xl:py-4 2xl:pl-10 2xl:pr-6">
          <span className="text-[20px] font-medium text-white 2xl:text-[22px]">ลงทะเบียน</span>
        </Button>
      </MemberRegisterForm>
    </>
  )
}
export default MemberPage2
