import LegalSection from "../../../components/Reusable/LegalSection/LegalSection";
import LegalPageLayout from "../../../layouts/LegalPageLayout";

const PrivacyPolicy = () => {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="July 15, 2026"
      description="Your privacy matters to us. Learn how we collect, use, and protect your information."
    >
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
        🔒 We are committed to protecting your personal information. This policy
        explains what data we collect, how we use it, and your rights regarding
        your information.
      </div>

      <LegalSection number={1} title="Information We Collect">
        <p>We collect information you provide directly, including:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Personal Information:</strong> Name, email, phone number,
            and profile picture
          </li>
          <li>
            <strong>Location Data:</strong> Country, state, city for
            personalized content
          </li>
          <li>
            <strong>Payment Information:</strong> Processed securely through
            third-party providers
          </li>
          <li>
            <strong>Usage Data:</strong> Pages visited, interactions, and
            preferences
          </li>
        </ul>
      </LegalSection>

      <LegalSection number={2} title="How We Use Your Information">
        <p>Your information is used to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Provide and personalize our spiritual services</li>
          <li>Process payments and manage subscriptions</li>
          <li>Send relevant updates, newsletters, and notifications</li>
          <li>Improve our platform and user experience</li>
          <li>Ensure platform security and prevent fraud</li>
        </ul>
      </LegalSection>

      <LegalSection number={3} title="Information Sharing">
        <p>
          We do <strong>not</strong> sell your personal information. We may share
          data only with:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Payment processors (SSL Commerz) for secure transactions</li>
          <li>Cloud storage providers for secure data hosting</li>
          <li>Analytics tools to improve our services</li>
          <li>Law enforcement when required by law</li>
        </ul>
      </LegalSection>

      <LegalSection number={4} title="Data Security">
        <p>
          We implement industry-standard encryption, secure servers, and
          access controls to protect your data. However, no method of
          transmission over the internet is 100% secure, and we cannot
          guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Cookies & Tracking">
        <p>
          We use cookies and similar technologies to enhance your browsing
          experience, remember preferences, and analyze usage patterns. You can
          manage cookie preferences through your browser settings.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Your Rights">
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Access and download your personal data</li>
          <li>Correct or update inaccurate information</li>
          <li>Request deletion of your account and data</li>
          <li>Opt out of marketing communications</li>
          <li>Object to data processing in certain circumstances</li>
        </ul>
      </LegalSection>

      <LegalSection number={7} title="Children's Privacy">
        <p>
          Our services are not intended for children under 13. We do not
          knowingly collect personal information from children. If we become
          aware of such data, we will delete it promptly.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Data Retention">
        <p>
          We retain your personal data as long as your account is active or as
          needed to provide services. Upon account deletion, data is removed
          within 30 days unless required by law.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Changes to This Policy">
        <p>
          We may update this Privacy Policy periodically. Significant changes
          will be communicated via email or a prominent notice on our platform.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
};

export default PrivacyPolicy;