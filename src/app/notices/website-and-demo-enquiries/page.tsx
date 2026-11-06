import Link from "next/link"
import { LegalPageShell } from "@/src/components/legal-page-shell"
import { NoticeSections, NoticeVersionLine, type NoticeSectionData } from "@/src/components/privacy-notice"
import { ComplainText, LanguageNote, RightsText, WithdrawText } from "@/src/components/notice-common"

const ENGLISH: NoticeSectionData[] = [
  {
    heading: "Exact data we collect",
    body: (
      <>
        <p>
          Name, work email, phone (optional), company, team size, what you want to do (for example, a demo) and a
          message (optional).
        </p>
        <p>If you download the brochure: name, work email, phone and city.</p>
        <p>If you use the form on a blog post: name, email and phone (optional).</p>
        <p>After you submit, you may also tell us how you heard of Firmity (optional).</p>
        <p>
          To keep proof of your choices we also record the form you used, the date and time, the notice version, a
          one-way hash of your IP address and your device type (mobile, tablet or desktop). We do not keep your IP
          address itself.
        </p>
      </>
    ),
  },
  {
    heading: "Why we collect it",
    body: (
      <p>
        To answer your demo or contact request. If you tick the optional box, to send you product updates, offers and
        event invitations.
      </p>
    ),
  },
  { heading: "How to withdraw consent", body: <WithdrawText /> },
  { heading: "How to use your rights", body: <RightsText /> },
  { heading: "How to complain", body: <ComplainText /> },
]

// Hindi draft from the Policy Pack's FDP-14 sheet. The data, purpose and withdrawal lines add the
// same items the English notice lists; the sheet asks for a Hindi reader to check the translation.
const HINDI: NoticeSectionData[] = [
  {
    heading: "हम कौन सा डेटा लेते हैं",
    body: (
      <>
        <p>
          नाम, कार्यालयीन ईमेल, फ़ोन (वैकल्पिक), कंपनी, टीम का आकार, आप क्या करना चाहते हैं (जैसे डेमो), संदेश
          (वैकल्पिक)।
        </p>
        <p>ब्रोशर डाउनलोड करने पर: नाम, कार्यालयीन ईमेल, फ़ोन और शहर।</p>
        <p>ब्लॉग पोस्ट के फ़ॉर्म में: नाम, ईमेल और फ़ोन (वैकल्पिक)।</p>
        <p>भेजने के बाद आप बता सकते हैं कि आपने Firmity के बारे में कैसे सुना (वैकल्पिक)।</p>
        <p>
          आपकी पसंद का प्रमाण रखने के लिए हम यह भी दर्ज करते हैं: आपने कौन सा फ़ॉर्म इस्तेमाल किया, तारीख और समय,
          सूचना का संस्करण, आपके आईपी पते का एक-तरफ़ा हैश और आपके डिवाइस का प्रकार (मोबाइल, टैबलेट या डेस्कटॉप)।
          हम आपका आईपी पता स्वयं नहीं रखते।
        </p>
      </>
    ),
  },
  {
    heading: "क्यों लेते हैं",
    body: (
      <p>
        आपके डेमो या संपर्क अनुरोध का उत्तर देने के लिए। यदि आप वैकल्पिक बॉक्स पर टिक करते हैं, तो उत्पाद अपडेट, ऑफ़र
        और कार्यक्रम आमंत्रण भेजने के लिए।
      </p>
    ),
  },
  {
    heading: "सहमति कैसे वापस लें",
    body: (
      <p>
        सहमति वापस लेने से फ़ॉलो-अप रुक जाता है। <Link href="/unsubscribe" className="text-[#2b6cb0] underline underline-offset-2">&lsquo;सहमति वापस लें&rsquo;</Link>{" "}
        फ़ॉर्म का उपयोग करें, किसी भी मार्केटिंग ईमेल में &lsquo;अनसब्सक्राइब&rsquo; पर क्लिक करें, या dpo@ufirm.in पर
        लिखें। हम 48 घंटे में रोक देंगे।
      </p>
    ),
  },
  {
    heading: "आपके अधिकार",
    body: (
      <p>
        आप अपने डेटा को देखने, सुधारने या मिटाने का अनुरोध कर सकते हैं, या किसी व्यक्ति को नामित कर सकते हैं। इसके लिए{" "}
        <Link href="/data-rights" className="text-[#2b6cb0] underline underline-offset-2">&lsquo;Your Data Rights&rsquo;</Link>{" "}
        फ़ॉर्म या dpo@ufirm.in का उपयोग करें। हम 30 दिनों में उत्तर देंगे।
      </p>
    ),
  },
  {
    heading: "शिकायत कैसे करें",
    body: (
      <p>
        संजीव कुमार, डीपीओ / शिकायत अधिकारी, dpo@ufirm.in को लिखें। संतुष्ट न होने पर आप भारतीय डेटा संरक्षण बोर्ड में
        शिकायत कर सकते हैं।
      </p>
    ),
  },
]

export default function WebsiteNoticePage() {
  return (
    <LegalPageShell
      wide
      kicker="Privacy notice"
      title="Website and demo enquiries"
      intro={
        <>
          What we collect when you send a demo or contact request, and your choices. See also our{" "}
          <Link href="/privacy" className="underline underline-offset-2 text-white">Privacy Policy</Link>.{" "}
          <a href="#hindi" className="underline underline-offset-2 text-white">हिंदी में पढ़ें</a>
        </>
      }
    >
      <NoticeVersionLine />
      <NoticeSections sections={ENGLISH} />
      <div id="hindi" className="mt-12 scroll-mt-24">
        <h2 lang="hi" className="font-serif text-[1.4rem] font-light text-[#114dac] mb-1">वेबसाइट और डेमो पूछताछ</h2>
        <p lang="hi" className="text-[12px] text-[#718096] font-light mb-6">सूचना संस्करण 1.0 &nbsp;·&nbsp; 5 नवंबर 2026</p>
        <NoticeSections sections={HINDI} lang="hi" />
      </div>
      <LanguageNote />
    </LegalPageShell>
  )
}
