// One-page privacy notice layout shared by the notice pages: the five headings the
// audit asks for (what we collect, why, how to withdraw, your rights, how to complain).
import type { ReactNode } from "react"
import { NOTICE_DATE, NOTICE_VERSION } from "@/src/lib/dpdp-constants"

export interface NoticeSectionData {
  heading: string
  body: ReactNode
}

export function NoticeVersionLine() {
  return (
    <p className="text-[12px] text-[#718096] font-light mb-6">
      Notice version {NOTICE_VERSION} &nbsp;·&nbsp; {NOTICE_DATE}
    </p>
  )
}

export function NoticeSections({ sections, lang }: { sections: NoticeSectionData[]; lang?: string }) {
  return (
    <div lang={lang} className="flex flex-col gap-6">
      {sections.map((s) => (
        <section key={s.heading} className="border-t border-[#dbe5f0] pt-4">
          <h2 className="text-[13px] font-semibold text-[#114dac] mb-2">{s.heading}</h2>
          <div className="text-[13.5px] text-[#4a5568] font-light leading-[1.8] flex flex-col gap-2">{s.body}</div>
        </section>
      ))}
    </div>
  )
}
