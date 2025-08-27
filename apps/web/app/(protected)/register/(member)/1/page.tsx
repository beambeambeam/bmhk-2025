"use client"

import MemberRegisterForm, {
  ProcessedMemberRegisterSchemaType,
} from "@/app/(protected)/register/(member)/_components/form"
import ScrollArea from "@/app/_components/scope/ScrollArea"
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

  const handleSubmit = (values: ProcessedMemberRegisterSchemaType) => {
    mutation.mutate({
      ...values,
      memberIndex: 1,
      national_doc: values.national_doc.filter((file): file is File => file !== null),
      face_picture: values.face_picture.filter((file): file is File => file !== null),
      p7_doc: values.p7_doc.filter((file): file is File => file !== null),
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
              national_doc: [],
              face_picture: [],
              p7_doc: [],
              chronic_disease: memberQuery.data.member.chronicDisease ?? "",
            }
          : undefined
      }
    />
  )
}
export default MemberPage1
