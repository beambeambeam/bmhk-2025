"use client"

import MemberRegisterForm, {
  memberRegisterSchemaType,
} from "@/app/(protected)/register/(member)/_components/form"
import { orpc, queryClient } from "@/utils/orpc"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

function MemberPage1() {
  const router = useRouter()

  const teamQuery = useQuery(orpc.register.team.get.queryOptions())

  const memberQuery = useQuery(
    orpc.register.member.get.queryOptions({
      input: {
        memberIndex: 1,
      },
    })
  )

  const mutation = useMutation(
    orpc.register.member.set.mutationOptions({
      onSuccess: () => {
        router.push("/register/2")
        queryClient.invalidateQueries({
          queryKey: orpc.register.status.get.key(),
        })
      },
    })
  )

  if (teamQuery.isPending || memberQuery.isPending) {
    return <div>Loading...</div>
  }

  if (!teamQuery.data?.team) {
    router.push("/register/team")
  }

  const handleSubmit = (values: memberRegisterSchemaType) => {
    mutation.mutate({
      ...values,
      memberIndex: 1,
    })
  }

  return (
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
              national_doc: memberQuery.data.member.nationalDoc ? [memberQuery.data.member.nationalDoc] : [],
              face_picture: memberQuery.data.member.facePic ? [memberQuery.data.member.facePic] : [],
              p7_doc: memberQuery.data.member.p7Doc ? [memberQuery.data.member.p7Doc] : [],
              chronic_disease: memberQuery.data.member.chronicDisease ?? "",
            }
          : undefined
      }
      index={1}
    />
  )
}
export default MemberPage1
