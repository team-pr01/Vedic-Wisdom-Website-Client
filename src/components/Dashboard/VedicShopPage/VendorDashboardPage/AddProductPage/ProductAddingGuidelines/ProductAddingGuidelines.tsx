import { IMAGES } from "../../../../../../assets";
import {
  FaImage,
  FaTag,
  FaClipboardList,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const ProductAddingGuidelines = () => {
  const productAddingGuidelines = [
    {
      id: 1,
      title: "Provide Accurate Product Information",
      description:
        "Fill in all product details correctly including name, description, price, and category. No fake or misleading information allowed.",
      icon: <FaClipboardList className="text-primary-10" />,
    },
    {
      id: 2,
      title: "Upload High-Quality Product Images",
      description:
        "Use clear, high-resolution images (minimum 500x500px) that accurately represent your product. Multiple angles are encouraged.",
      icon: <FaImage className="text-primary-10" />,
    },
    {
      id: 3,
      title: "Set Competitive & Honest Pricing",
      description:
        "Ensure your product pricing is fair and competitive. Include all applicable taxes and shipping costs in your pricing.",
      icon: <FaTag className="text-primary-10" />,
    },
    {
      id: 4,
      title: "Review Process Before Approval",
      description:
        "All products undergo a thorough review by our team to ensure quality and authenticity. This process takes 24-48 hours.",
      icon: <FaClock className="text-primary-10" />,
    },
    {
      id: 5,
      title: "Authenticity & Quality Assurance",
      description:
        "Only list authentic products. Any fake, counterfeit, or misrepresented items will be rejected immediately.",
      icon: <FaShieldAlt className="text-primary-10" />,
    },
  ];

  return (
    <div className="rounded-4xl border border-primary-50 bg-neutral-65 p-6 relative overflow-hidden">
      {/* Background Gradient */}
      <img
        src={IMAGES.referBonusGradient}
        alt=""
        className="absolute bottom-0 left-0 right-0 w-full rounded-b-4xl opacity-60"
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-neutral-40 text-2xl font-bold">
            Product Adding <span className="text-primary-10">Guidelines</span>
          </h1>
          <p className="text-neutral-60 font-medium mt-2">
            Please read the guidelines carefully before adding a product
          </p>
        </div>

        {/* Guidelines List */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          {productAddingGuidelines.map((guideline) => (
            <div
              key={guideline.id}
              className="flex items-start gap-3 bg-white border-l-2 border-primary-10/50 rounded-r-lg px-4 py-3 hover:shadow-md shadow"
            >
              <div className="mt-0.5 text-lg bg-primary-10/10 p-2 rounded-full">
                {guideline.icon}
              </div>
              <div>
                <h3 className="text-neutral-5 font-semibold text-sm">
                  {guideline.title}
                </h3>
                <p className="text-neutral-50 text-xs mt-0.5">
                  {guideline.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductAddingGuidelines;
