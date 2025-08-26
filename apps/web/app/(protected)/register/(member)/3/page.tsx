"use client"

import { useRegisterStatusActions } from "@/app/(protected)/_components/status/context"
import MemberRegisterForm, {
  ProcessedMemberRegisterSchemaType,
} from "@/app/(protected)/register/(member)/_components/form"
import { orpc } from "@/utils/orpc"
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

  const mutation = useMutation(orpc.register.member.set.mutationOptions())

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
    return router.push("/register/2")
  }

  const handleSubmit = (values: ProcessedMemberRegisterSchemaType) => {
    mutation.mutate({
      ...values,
      memberIndex: 3,
      national_doc: values.national_doc.filter((file): file is File => file !== null),
      face_picture: values.face_picture.filter((file): file is File => file !== null),
      p7_doc: values.p7_doc.filter((file): file is File => file !== null),
    })
  }

  return (
    <div className="h-full min-h-screen w-full bg-black p-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-2xl font-bold text-white">สมัครสมาชิกที่ 3</h1>
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
                }
              : undefined
          }
        />

        <Button
          onClick={() => submitMutation.mutate({})}
          disabled={submitMutation.isPending}
          className="bg-green-600 px-8 py-3 text-lg font-semibold text-white hover:bg-green-700">
          {submitMutation.isPending ? "กำลังส่ง..." : "ส่งใบสมัคร"}
        </Button>
      </div>
    </div>
  )
}
export default MemberPage3
