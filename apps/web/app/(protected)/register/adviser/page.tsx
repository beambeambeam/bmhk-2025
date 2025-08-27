"use client"

import RegisterStatus from "@/app/(protected)/_components/status"
import AdviserRegisterForm from "@/app/(protected)/register/adviser/_components/form"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@workspace/ui/lib/utils"

function AdviserRegisterPage() {
  const query = useQuery(orpc.register.adviser.get.queryOptions())

  if (query.isPending) {
    return
  }

  const BACKGROUND_CLASS =
    "bg-[url(/static/background-image/register-form/xs.webp)] md:bg-[url(/static/background-image/register-form/md.webp)] lg:bg-[url(/static/background-image/register-form/lg.webp)] 2xl:bg-[url(/static/background-image/register-form/2xl.webp)]"

  return (
    <div
      className={cn(
        "flex h-full max-h-screen min-h-screen w-full items-center justify-center",
        BACKGROUND_CLASS
      )}>
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
                  chronic_disease: query.data.adviser.chronicDisease ?? "",
                }
              : undefined
          }
        />
      </div>
    </div>
  )
}
export default AdviserRegisterPage
