import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import LegalPageLayout from "../../../layouts/LegalPageLayout";
import LegalSection from "../../../components/Reusable/LegalSection/LegalSection";

const RefundPolicy = () => {
  return (
    <LegalPageLayout
      title="Refund Policy"
      lastUpdated="July 15, 2026"
      description="Understand our refund terms for subscriptions, coins, and digital products."
    >
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
        ⚠️ Please read this policy carefully before making any purchase. By
        completing a transaction, you agree to the terms outlined below.
      </div>

      <LegalSection number={1} title="General Refund Policy">
        <p>
          Due to the digital nature of our products and services, all sales are
          generally <strong>final and non-refundable</strong>, except as
          explicitly stated in this policy or required by applicable law.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Eligible Refunds">
        <p className="flex items-center gap-2 text-green-600 font-medium">
          <FaCheckCircle /> Refunds may be granted in the following cases:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Duplicate payment made due to a technical error on our side
          </li>
          <li>
            Payment charged but service not delivered within 48 hours
          </li>
          <li>
            Unauthorized transaction confirmed by your bank
          </li>
          <li>
            Request made within 24 hours of purchase (for consultations only)
          </li>
        </ul>
      </LegalSection>

      <LegalSection number={3} title="Non-Refundable Items">
        <p className="flex items-center gap-2 text-red-500 font-medium">
          <FaTimesCircle /> The following are strictly non-refundable:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            <strong>Arya Coins:</strong> Once purchased, coins cannot be
            refunded or transferred
          </li>
          <li>
            <strong>Audio Books & Courses:</strong> Once accessed or downloaded
          </li>
          <li>
            <strong>Completed Consultations:</strong> Sessions already conducted
          </li>
          <li>
            <strong>Subscription Plans:</strong> Partial or unused periods
          </li>
          <li>
            <strong>Marketplace Purchases:</strong> Physical products once
            shipped
          </li>
          <li>
            <strong>Donations:</strong> Contributions to temple or community
            projects
          </li>
        </ul>
      </LegalSection>

      <LegalSection number={4} title="Subscription Cancellations">
        <p>
          You may cancel your subscription at any time. Cancellation stops
          future billing, but the current billing period will remain active
          until its end date. No partial refunds are provided.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Consultation Refunds">
        <p>
          Consultations can be refunded if cancelled at least 24 hours before
          the scheduled time. Cancellations within 24 hours are not eligible for
          a refund, but may be rescheduled once at no additional cost.
        </p>
      </LegalSection>

      <LegalSection number={6} title="How to Request a Refund">
        <p>To request a refund, follow these steps:</p>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Email us at support@vedicwisdom.com</li>
          <li>Include your order ID and transaction ID</li>
          <li>Explain the reason for your refund request</li>
          <li>Attach any supporting evidence (screenshots, bank statement)</li>
        </ol>
        <p className="mt-2">
          Our team will review your request within <strong>3–5 business days</strong>.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Refund Processing Time">
        <p>
          Approved refunds will be processed within 7–10 business days to the
          original payment method. Bank processing times may vary depending on
          your financial institution.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Chargebacks">
        <p>
          Initiating a chargeback without first contacting our support team may
          result in account suspension. We encourage you to reach out to us
          first so we can resolve the issue quickly.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Exceptional Circumstances">
        <p>
          We reserve the right to grant refunds on a case-by-case basis for
          exceptional situations at our sole discretion. Each case is evaluated
          individually to ensure fair treatment.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
};

export default RefundPolicy;