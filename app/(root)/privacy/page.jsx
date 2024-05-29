import FaqSection from "../components/FaqSection";

export default function Map() {
    return (
      <main className=''>
        <h1 className="text-2xl text-center font-semibold my-10">
          Our Privacy Policies
        </h1>

        <div className="flex gap-8 flex-col w-full mb-10 px-3">
          <FaqSection question={"Overview"}>
            <p>Once again, welcome to Amebo Connect! <br /> We value your privacy and are committed to protecting your personal data. This privacy notice outlines how we collect, use, and share your information when you use our platform. <br />By using Amebo Connect, you agree to the practices described in this policy.</p>
          </FaqSection> 

          <FaqSection question={"Information We Collect"}>
            <ol>
              <li>
                <em className="font-semibold">Personal Information:</em> When you sign up for an account, we collect information such as your name, email address, phone number, profile photo, and other contact details.
              </li>
              <li>
              <em className="font-semibold">Content and Usage Data:</em> We collect content you upload, such as photos, posts, comments, and messages. We also collect data on how you interact with the platform, including your connections, job applications, event participations, and marketplace activities.
              </li>
              <li>
              <em className="font-semibold">Location Data:</em> If you use our geolocation features, we collect your precise location information. You can control your location settings through your device permissions.
              </li>
            </ol>
          </FaqSection>

          <FaqSection question={"How We Use Your Information"}>
            <ol>
              <li>
              <em className="font-semibold">To Provide and Improve Services:</em> We use your information to operate, maintain, and improve the features of Amebo Connect, including facilitating connections, job searches, and marketplace functionality.
              </li>
              <li>
              <em className="font-semibold">Personalization:</em> We use your data to personalize your experience, such as suggesting friends, jobs, and content that may interest you.
              </li>
              <li>
              <em className="font-semibold">Safety and Security:</em> We use your information to protect our platform and users from fraud, abuse, and other harmful activities.
              </li>
            </ol>
          </FaqSection>

          <FaqSection question={"Sharing Your Information"}>
            <ol>
                <li>
                <em className="font-semibold">With Other Users:</em> Information such as your profile, posts, and location (if enabled) may be visible to other users depending on your privacy settings.
                </li>
                <li>
                <em className="font-semibold">Legal Obligations:</em> We may disclose your information if required by law or to protect the rights, property, or safety of Amebo Connect, our users, or others.
                </li>
                <li>
                <em className="font-semibold">Business Transfers:</em> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.
                </li>
              </ol>
          </FaqSection>


          <FaqSection question={"Your Choices and Controls"}>
              <ol>
                <li>
                  <em className="font-semibold">Location Sharing:</em> You can enable or disable location sharing on the maps page.
                </li>
                <li>
                <em className="font-semibold"> Access and Correction:</em> You can access and update your personal information through your account settings.
                </li>
                <li>
                <em className="font-semibold">Account Deactivation:</em> You can deactivate your account at any time. Upon deactivation, your profile and data will no longer be visible to other users. Contact an admin for more info.
                </li>
              </ol>
          </FaqSection>

          <FaqSection question={"Data Security"}>
            <p>We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. Your Information is safe with us.</p>
          </FaqSection>

          <FaqSection question={"Children's Privacy"}>
            <p>Amebo Connect is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information</p>
          </FaqSection>

          <FaqSection question={"Changes to This Privacy Policy"}>
            <p>We may update this privacy policy from time to time. If we make significant changes, we will notify you through the platform or by email. Your continued use of Amebo Connect after any changes indicates your acceptance of the new privacy policy.</p>
          </FaqSection>

          <FaqSection question={"Contact"}>
            <p>If you have any questions or concerns about this privacy policy, please contact us at:
             <br />Email: naijaameboconnect@gmail.com
             <br />Tel: +234 708 677 3237
            </p>
          </FaqSection>
        </div>
        <p className="text-center my-4">By using Amebo Connect, you agree to this privacy policy. Thank you for being a part of our community!</p>
      </main>
    )
  }
  