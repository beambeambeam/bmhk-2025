"use client"

import { Label } from "@/components/ui/label"
import MultipleSelector from "@/components/ui/multiselect"
import { Textarea } from "@/components/ui/textarea"

type VerifyFormProps = {
  id: string
}

function VerifyForm(_props: VerifyFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Label>Adviser</Label>
      <MultipleSelector
        commandProps={{
          label: "Select problems",
        }}
        placeholder="Select problems"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No problems found</p>}
        options={[
          {
            label: "ข้อมูลไม่ตรง",
            value: "data-mismatch",
          },
          // {
          //   label: "ปพ.7 มีปัญหา",
          //   value: "p7-problem",
          // },
          {
            label: "บัตรประชาชนมีบัญหา",
            value: "id-card-problem",
          },
          {
            label: "บัตรอาจารย์มีบัญหา",
            value: "teacher-card-problem",
          },
        ]}
      />
      <Label>Member 1</Label>
      <MultipleSelector
        commandProps={{
          label: "Select problems",
        }}
        placeholder="Select problems"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No problems found</p>}
        options={[
          {
            label: "ข้อมูลไม่ตรง",
            value: "data-mismatch",
          },
          {
            label: "ปพ.7 มีปัญหา",
            value: "p7-problem",
          },
          {
            label: "บัตรประชาชนมีบัญหา",
            value: "id-card-problem",
          },
        ]}
      />
      <Label>Member 2</Label>
      <MultipleSelector
        commandProps={{
          label: "Select problems",
        }}
        placeholder="Select problems"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No problems found</p>}
        options={[
          {
            label: "ข้อมูลไม่ตรง",
            value: "data-mismatch",
          },
          {
            label: "ปพ.7 มีปัญหา",
            value: "p7-problem",
          },
          {
            label: "บัตรประชาชนมีบัญหา",
            value: "id-card-problem",
          },
        ]}
      />
      <Label>Member 3</Label>
      <MultipleSelector
        commandProps={{
          label: "Select problems",
        }}
        placeholder="Select problems"
        hideClearAllButton
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No problems found</p>}
        options={[
          {
            label: "ข้อมูลไม่ตรง",
            value: "data-mismatch",
          },
          {
            label: "ปพ.7 มีปัญหา",
            value: "p7-problem",
          },
          {
            label: "บัตรประชาชนมีบัญหา",
            value: "id-card-problem",
          },
        ]}
      />
      <Label>หมายเหตุ</Label>
      <Textarea className="h-50" />
    </div>
  )
}
export default VerifyForm
