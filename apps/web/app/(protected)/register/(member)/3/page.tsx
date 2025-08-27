"use client"

import { useRegisterStatusActions } from "@/app/(protected)/_components/status/context"
import MemberRegisterForm, {
  memberRegisterSchemaType,
} from "@/app/(protected)/register/(member)/_components/form"
import { orpc, queryClient } from "@/utils/orpc"
import { useMutation, useQuery } from "@tanstack/react-query"
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
    return <div>Loading...</div>
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
                national_doc: [],
                face_picture: [],
                p7_doc: [],
                chronic_disease: memberQuery.data.member.chronicDisease ?? "",
              }
            : undefined
        }
        index={3}>
        <Button onClick={() => submitMutation.mutate({})} disabled={submitMutation.isPending}>
          {submitMutation.isPending ? "กำลังส่ง..." : "ส่งใบสมัคร"}
        </Button>
      </MemberRegisterForm>
    </>
  )
}
export default MemberPage3
