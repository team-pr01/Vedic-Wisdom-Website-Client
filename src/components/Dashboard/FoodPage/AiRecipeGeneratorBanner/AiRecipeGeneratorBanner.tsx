import { ICONS } from "../../../../assets";
import Button from "../../../Reusable/Button/Button";

const AiRecipeGeneratorBanner = () => {
  const aiRecipeGeneratorFeatures = [
    "100% Sattvic Compliance",
    "100% Health Benefits",
    "100% Authenticity",
  ];
  return (
    <div className="p-6 bg-ai-food-generator-card border-primary-80 space-y-4 rounded-2xl">
      <div className="bg-primary-50 flex items-center justify-center rounded-xl p-2 size-12">
        <img src={ICONS.aiBot} alt="" />
      </div>

      <div>
        <h4 className="text-neutral-90 font-bold text-xl">
          AI Recipe Generator
        </h4>
        <p className="description mt-2">
          Instantly create customized Sattvic or Prasad recipes based on the
          ingredients you have at home.
        </p>
      </div>

      <div className="space-y-3">
        {aiRecipeGeneratorFeatures.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <img src={ICONS.checkMark} alt="" />
            <p className="text-neutral-81 text-sm font-semibold">{feature}</p>
          </div>
        ))}
      </div>

      <Button label="Try AI Assistant" className="w-full" />
    </div>
  );
};

export default AiRecipeGeneratorBanner;
