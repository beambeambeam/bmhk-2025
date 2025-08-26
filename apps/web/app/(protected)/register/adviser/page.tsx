"use client"

import RegisterStatus from "@/app/(protected)/_components/status"
import AdviserRegisterForm from "@/app/(protected)/register/adviser/_components/form"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"

function AdviserRegisterPage() {
  const query = useQuery(orpc.register.adviser.get.queryOptions())

  if (query.isPending) {
    return
  }

  return (
    <div className="flex h-full max-h-screen min-h-screen w-full items-center justify-center bg-black">
      <div className="h-[50rem] w-full max-w-[62rem]">
        <RegisterStatus />
        <AdviserRegisterForm
          defaultValues={
            query.data && query.data.success && query.data.adviser
              ? {
                  prefix: query.data.adviser.prefix as "MR" | "MS" | "MRS",
                  thai_firstname: query.data.adviser.thaiFirstname ?? "",
                  thai_middlename: query.data.adviser.thaiMiddlename ?? "",
                  thai_lastname: query.data.adviser.thaiLastname ?? "",
                  english_firstname: query.data.adviser.firstName ?? "",
                  english_middlename: query.data.adviser.middleName ?? "",
                  english_lastname: query.data.adviser.lastname ?? "",
                  food_allergy: query.data.adviser.foodAllergy ?? "",
                  food_type: query.data.adviser.foodType ?? "",
                  drug_allergy: query.data.adviser.drugAllergy ?? "",
                  email: query.data.adviser.email ?? "",
                  phone_number: query.data.adviser.phoneNumber ?? "",
                  line_id: query.data.adviser.lineId ?? "",
                  national_doc: query.data.adviser.nationalDoc ? [query.data.adviser.nationalDoc] : [],
                  teacher_doc: query.data.adviser.teacherDoc ? [query.data.adviser.teacherDoc] : [],
                }
              : undefined
          }
        />
      </div>
    </div>
  )
}
export default AdviserRegisterPage
