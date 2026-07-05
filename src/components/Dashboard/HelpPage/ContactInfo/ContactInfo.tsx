import { contactInfo } from "../../../../data/contactInfo";
import { ICONS } from "../../../../assets";

const ContactInfo = () => {
  return (
    <div className="w-[50%]">
      <h3 className="text-neutral-90 font-bold">Quick Contacts</h3>
      <p className="text-neutral-50 mt-1">
        You can reach out to our support team for any queries
      </p>

      <div className="space-y-4 mt-4">
        {contactInfo?.map((item) => (
          <a
            key={item?.title}
            href={item?.href}
            className="p-5 rounded-xl border border-primary-80 bg-white flex items-center justify-between group cursor-pointer"
          >
            <div className="space-y-2">
              <h4 className="text-neutral-90 font-bold">{item?.title}</h4>
              <h4 className="text-accent-35 font-bold group-hover:underline">
                {item?.value}
              </h4>
              <div className="flex items-center gap-2">
                <img src={ICONS.time} alt="" />
                <p className="text-neutral-50 text-sm">Available: 24/7</p>
              </div>
            </div>
            <div className="size-10 flex items-center justify-center rounded-full bg-accent-35 group-hover:scale-95 transition duration-300">
              <img src={item?.icon} alt="" className="size-6" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
