"use client"

import { columns, Team } from "@/app/(protected)/round-1-comp/_components/team-table/columns"
import {
  getRound1CompTeams,
  getAllRound1CompTeamsForExport,
} from "@/app/(protected)/round-1-comp/_components/team-table/queries"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui/button"
import { useDataTable } from "@/hooks/use-data-table"
import { exportTableToCSV } from "@/lib/csv-export"
import { mapPrefixToThai } from "@/lib/format"
import { Row } from "@tanstack/react-table"
import { Download } from "lucide-react"
import { CSSProperties, use, useCallback } from "react"

interface Round1CompTeamTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getRound1CompTeams>>]>
}

function Round1CompTeamTable({ promises }: Round1CompTeamTableProps) {
  const [{ data, pageCount }] = use(promises)

  const { table } = useDataTable({
    data,
    columns,
    getRowId: (row) => row.id,
    pageCount,
    initialState: {
      columnPinning: { right: [] },
      columnVisibility: {},
    },
    shallow: false,
    clearOnDefault: true,
    meta: {
      getRowStyles: (row: Row<Team>): CSSProperties => ({
        background: row.original.rowShouldBeRed ? "rgba(239, 68, 68, 0.1)" : "transparent",
      }),
    },
  })

  const handleExportCSV = useCallback(async () => {
    try {
      const { data: allTeams } = await getAllRound1CompTeamsForExport()

      const csvData = allTeams.map((team: Team, index: number) => {
        const member1 = team.members.find((m: (typeof team.members)[0]) => m.index === 1)
        const member2 = team.members.find((m: (typeof team.members)[0]) => m.index === 2)
        const member3 = team.members.find((m: (typeof team.members)[0]) => m.index === 3)

        return {
          index: `${index + 1}`,
          code_name: `BH${team.index.toString().padStart(3, "0")}`,
          team_name: team.name,
          school: team.school,
          // Member 1 - Thai Names
          prefix_1_thai: member1 ? mapPrefixToThai(member1.prefix) : "",
          first_name_1_thai: member1 ? member1.thaiFirstname : "",
          middle_name_1_thai: member1 ? member1.thaiMiddlename || "" : "",
          last_name_1_thai: member1 ? member1.thaiLastname : "",
          // Member 1 - English Names
          prefix_1_eng: member1 ? member1.prefix : "",
          first_name_1_eng: member1 ? member1.firstName : "",
          middle_name_1_eng: member1 ? member1.middleName || "" : "",
          last_name_1_eng: member1 ? member1.lastname : "",
          // Member 1 - Contact & Info
          email_1: member1 ? member1.email : "",
          phone_1: member1 ? member1.phoneNumber : "",
          line_id_1: member1 ? member1.lineId || "" : "",
          parent_1: member1 ? member1.parent : "",
          parent_phone_1: member1 ? member1.parentPhoneNumber : "",
          food_allergy_1: member1 ? member1.foodAllergy || "" : "",
          food_type_1: member1 ? member1.foodType || "" : "",
          drug_allergy_1: member1 ? member1.drugAllergy || "" : "",
          chronic_disease_1: member1 ? member1.chronicDisease || "" : "",

          // Member 2 - Thai Names
          prefix_2_thai: member2 ? mapPrefixToThai(member2.prefix) : "",
          first_name_2_thai: member2 ? member2.thaiFirstname : "",
          middle_name_2_thai: member2 ? member2.thaiMiddlename || "" : "",
          last_name_2_thai: member2 ? member2.thaiLastname : "",
          // Member 2 - English Names
          prefix_2_eng: member2 ? member2.prefix : "",
          first_name_2_eng: member2 ? member2.firstName : "",
          middle_name_2_eng: member2 ? member2.middleName || "" : "",
          last_name_2_eng: member2 ? member2.lastname : "",
          // Member 2 - Contact & Info
          email_2: member2 ? member2.email : "",
          phone_2: member2 ? member2.phoneNumber : "",
          line_id_2: member2 ? member2.lineId || "" : "",
          parent_2: member2 ? member2.parent : "",
          parent_phone_2: member2 ? member2.parentPhoneNumber : "",
          food_allergy_2: member2 ? member2.foodAllergy || "" : "",
          food_type_2: member2 ? member2.foodType || "" : "",
          drug_allergy_2: member2 ? member2.drugAllergy || "" : "",
          chronic_disease_2: member2 ? member2.chronicDisease || "" : "",

          // Member 3 - Thai Names
          prefix_3_thai: member3 ? mapPrefixToThai(member3.prefix) : "",
          first_name_3_thai: member3 ? member3.thaiFirstname : "",
          middle_name_3_thai: member3 ? member3.thaiMiddlename || "" : "",
          last_name_3_thai: member3 ? member3.thaiLastname : "",
          // Member 3 - English Names
          prefix_3_eng: member3 ? member3.prefix : "",
          first_name_3_eng: member3 ? member3.firstName : "",
          middle_name_3_eng: member3 ? member3.middleName || "" : "",
          last_name_3_eng: member3 ? member3.lastname : "",
          // Member 3 - Contact & Info
          email_3: member3 ? member3.email : "",
          phone_3: member3 ? member3.phoneNumber : "",
          line_id_3: member3 ? member3.lineId || "" : "",
          parent_3: member3 ? member3.parent : "",
          parent_phone_3: member3 ? member3.parentPhoneNumber : "",
          food_allergy_3: member3 ? member3.foodAllergy || "" : "",
          food_type_3: member3 ? member3.foodType || "" : "",
          drug_allergy_3: member3 ? member3.drugAllergy || "" : "",
          chronic_disease_3: member3 ? member3.chronicDisease || "" : "",

          // Team Info
          notes: team.notes || "",
        }
      })

      exportTableToCSV(csvData, {
        filename: `round-1-competition-teams-${new Date().toISOString().split("T")[0]}.csv`,
      })
    } catch (error) {
      console.error("Error exporting CSV:", error)
    }
  }, [])

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <Button onClick={handleExportCSV} variant="outline" size="sm">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </DataTableToolbar>
    </DataTable>
  )
}

export default Round1CompTeamTable
