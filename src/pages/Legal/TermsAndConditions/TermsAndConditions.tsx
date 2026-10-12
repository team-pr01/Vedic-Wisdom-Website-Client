import LegalSection from "../../../components/Reusable/LegalSection/LegalSection";
import LegalPageLayout from "../../../layouts/LegalPageLayout";

const TermsAndConditions = () => {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      lastUpdated="July 15, 2026"
      description="Please read these terms carefully before using our platform."
    >
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        By accessing or using <strong>Vedic Wisdom</strong>, you agree to be
        bound by these Terms & Conditions. If you disagree with any part of
        these terms, please do not use our services.
      </div>

      <LegalSection number={1} title="Acceptance of Terms">
        <p>
          By creating an account or using our services, you acknowledge that you
          have read, understood, and agree to be bound by these Terms &
          Conditions and our Privacy Policy. You must be at least 18 years old
          or have parental consent to use our platform.
        </p>
      </LegalSection>

      <LegalSection number={2} title="User Accounts">
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials. You agree to:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Provide accurate and complete registration information</li>
          <li>Keep your password secure and confidential</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>Accept responsibility for all activities under your account</li>
        </ul>
      </LegalSection>

      <LegalSection number={3} title="Use of Services">
        <p>You agree not to use the platform to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe on intellectual property rights of others</li>
          <li>Upload harmful, offensive, or misleading content</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Engage in any form of harassment or abuse</li>
        </ul>
      </LegalSection>

      <LegalSection number={4} title="Purchases & Payments">
        <p>
          All payments for premium features, audio books, consultations, or
          other digital products are processed securely through our payment
          partners. Prices are displayed in the applicable currency and may
          change without prior notice.
        </p>
        <p>
          Coins purchased on the platform are non-transferable and can only be
          used within the Vedic Wisdom ecosystem.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Intellectual Property">
        <p>
          All content on the platform — including text, images, videos, audio,
          logos, and software — is the property of Vedic Wisdom or its content
          providers and is protected by copyright and intellectual property
          laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, or create derivative works
          without explicit written permission.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Consultations & Services">
        <p>
          Our consultants provide spiritual, astrological, and wellness guidance
          for informational purposes only. We do not guarantee specific outcomes
          from any consultation. All advice should be used at your own
          discretion.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Termination">
        <p>
          We reserve the right to suspend or terminate your account at any time
          if you violate these terms. Upon termination, your right to use the
          platform will immediately cease. Outstanding obligations will survive
          termination.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Limitation of Liability">
        <p>
          Vedic Wisdom shall not be liable for any indirect, incidental,
          special, or consequential damages arising from your use of the
          platform. Our total liability shall not exceed the amount you paid to
          us in the preceding 12 months.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Changes to Terms">
        <p>
          We may update these Terms & Conditions from time to time. Continued
          use of the platform after changes constitutes acceptance of the
          updated terms. We encourage you to review this page periodically.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Governing Law">
        <p>
          These terms shall be governed by and construed in accordance with the
          laws of Bangladesh. Any disputes shall be resolved exclusively in the
          courts located in Dhaka, Bangladesh.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
};

export default TermsAndConditions;