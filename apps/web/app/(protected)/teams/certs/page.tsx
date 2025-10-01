import CertPreview from "@/app/(protected)/teams/certs/cert"

function CertPage() {
  return (
    <div>
      <CertPreview memberIndex={1} />
      <CertPreview memberIndex={2} />
      <CertPreview memberIndex={3} />
    </div>
  )
}
export default CertPage
