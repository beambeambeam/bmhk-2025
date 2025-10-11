import CertPreview from "@/app/(protected)/teams/certs/cert"

function CertPage() {
  return (
    <div className="flex flex-col">
      <p>Adviser</p>
      <CertPreview member="adviser" />
      <p>Member1</p>
      <CertPreview member="member1" />
      <p>Member2</p>
      <CertPreview member="member2" />
      <p>Member3</p>
      <CertPreview member="member3" />
    </div>
  )
}
export default CertPage
