import Link from "next/link"
import { MODULES_LIST, MODULE_PAGES } from "@/src/components/home-sections"

// Homepage "What is Firmity?" answer block + modules-at-a-glance table. Sits
// right under the hero so the most citable, self-contained definition of the
// product is in the first part of the page. Server-renderable (no hooks): the
// text is in the initial HTML for crawlers that don't run JavaScript.

export const FIRMITY_DEFINITION =
  "Firmity is a cloud-based facility management platform, built by UFIRM Technologies in India, that combines a computerised maintenance management system (CMMS) with ERP workflows in a single product. Facility teams use it to schedule preventive maintenance and work orders, track assets and spares with QR tags, resolve complaints against service-level targets, manage inventory and vendors, control visitor entry, record staff attendance, run payroll, monitor facility expenses and keep compliance records. Every module reads and writes the same live data, so a work order, the spare part it used and the cost it created stay linked instead of living in separate spreadsheets. Firmity runs in the browser and on Android and iOS, and can be deployed on the cloud or on-premise. It is designed for manufacturing plants, educational campuses, residential societies and other multi-site facility operations across India."

export function HomeAnswerSection() {
  return (
    <section className="bg-white py-14 lg:py-20" aria-labelledby="what-is-firmity">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          <h2
            id="what-is-firmity"
            className="font-serif font-light leading-[1.15] tracking-tight text-[#114dac] mb-5"
            style={{ fontSize: "clamp(1.6rem,3.6vw,2.4rem)" }}
          >
            What is Firmity?
          </h2>
          <p className="text-[14px] font-light leading-[1.85] text-[#000000]">{FIRMITY_DEFINITION}</p>
        </div>

        <h3 className="font-serif font-light text-[#114dac] text-[1.25rem] mt-12 mb-4">
          Firmity modules at a glance
        </h3>
        <div className="overflow-x-auto border border-[#dbe5f0] rounded-[4px]">
          <table className="w-full text-left text-[13px] min-w-[560px]">
            <caption className="sr-only">Firmity modules and what each one automates</caption>
            <thead className="bg-[#f4f7fb] text-[#114dac]">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold w-[34%]">Module</th>
                <th scope="col" className="px-4 py-3 font-semibold">What it automates</th>
              </tr>
            </thead>
            <tbody>
              {MODULES_LIST.map((m) => {
                const href = MODULE_PAGES[m.slug]
                return (
                  <tr key={m.slug} className="border-t border-[#e2e8f0] align-top">
                    <th scope="row" className="px-4 py-3 font-medium text-[#114dac]">
                      {href ? (
                        <Link href={href} className="hover:underline">
                          {m.title}
                        </Link>
                      ) : (
                        m.title
                      )}
                    </th>
                    <td className="px-4 py-3 font-light text-[#1a202c]">{m.desc}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
