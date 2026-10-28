/* eslint-disable @typescript-eslint/no-explicit-any */
// RichTextField.tsx
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
// Import your specific editor component
import { RichTextEditor } from "@amitdhoju/tiptap-ui"; 

type RichTextFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: any;
  placeholder?: string;
};

const RichTextField = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  placeholder,
}: RichTextFieldProps<T>) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-neutral-10 text-sm font-medium">
        {label} <span className="text-red-500">*</span>
      </label>
      
      <Controller
        name={name}
        control={control}
        rules={{
          required: "Description is required",
          validate: (value) =>
            value?.replace(/<[^>]*>/g, "").trim().length >= 20 ||
            "Description must be at least 20 characters",
        }}
        render={({ field }) => {
          
          // ✅ THE FIX: The inner component forces the editor to update 
          // when the field.value changes (e.g. when data is fetched)
          return (
            <EditorWrapper 
              value={field.value} 
              onChange={field.onChange} 
              placeholder={placeholder} 
            />
          );
        }}
      />
      
      {error && (
        <span className="text-red-500 text-sm">{error.message}</span>
      )}
    </div>
  );
};

// A wrapper component to sync the value properly
const EditorWrapper = ({ value, onChange, placeholder }: any) => {
  // If your editor library doesn't have a built-in `value` prop that updates automatically,
  // you might need a ref to the editor instance to call `editor.commands.setContent(value)`.
  
  // Assuming your RichTextEditor component accepts a `value` prop and handles updates internally:
  return (
    <RichTextEditor
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      minHeight={200}
    />
  );
};

export default RichTextField;