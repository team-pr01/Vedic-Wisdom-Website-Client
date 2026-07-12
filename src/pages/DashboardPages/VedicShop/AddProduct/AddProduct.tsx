import AddProductForm from "../../../../components/Dashboard/VedicShopPage/VendorDashboardPage/AddProductPage/AddProductForm/AddProductForm";
import ProductAddingGuidelines from "../../../../components/Dashboard/VedicShopPage/VendorDashboardPage/AddProductPage/ProductAddingGuidelines/ProductAddingGuidelines";

const AddProduct = () => {
  return (
    <div className="font-Manrope flex gap-10">
      <div className="w-[60%]">
        {" "}
        <AddProductForm />
      </div>
      <div className="w-[40%]">
        <ProductAddingGuidelines />
      </div>
    </div>
  );
};

export default AddProduct;
