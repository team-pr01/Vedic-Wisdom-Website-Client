import ContactInfo from "../../../components/Dashboard/HelpPage/ContactInfo/ContactInfo";
import SendEmergencyMessageForm from "../../../components/Dashboard/HelpPage/SendEmergencyMessageForm/SendEmergencyMessageForm";

const Help = () => {
  return (
    <div className="font-Manrope">
      <h2 className="heading-dashboard">My Profile</h2>

      <div className="flex gap-10 mt-6">
        <div className="w-[50%]">
          <h3 className="text-neutral-90 font-bold">
            24/7 Emergency Assistance
          </h3>
          <p className="text-neutral-50 mt-1">
            You can reach out to our support team for any queries
          </p>

          <SendEmergencyMessageForm />
        </div>

        <ContactInfo />
      </div>
    </div>
  );
};

export default Help;
