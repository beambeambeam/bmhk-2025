"use client"

import AdviserRegisterForm from "@/app/(protected)/register/adviser/_components/form"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"

function AdviserRegisterPage() {
  const query = useQuery(orpc.register.adviser.get.queryOptions())

  if (query.isPending) {
    return
  }

  return (
    <div className="h-full min-h-screen w-full bg-black">
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
                national_doc: [],
                teacher_doc: [],
              }
            : undefined
        }
      />
    </div>
  )
}
export default AdviserRegisterPage
