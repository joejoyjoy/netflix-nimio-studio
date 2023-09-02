interface Arr {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  label: string;
  pattern: string;
  required: boolean;
  minLength?: undefined;
  maxLength?: undefined;
  dataLimit?: undefined;
}

export const textAndTextareaFields = (inputs: Array<Arr>) => {
  const fields = inputs.filter(
    (input) => input.type === "text" || input.type === "textarea"
  );
  return fields;
};

export const fileFields = (inputs: Array<Arr>) => {
  const fields = inputs.filter((input) => input.type === "file");
  return fields;
};

export const checkboxFields = (inputs: Array<Arr>) => {
  const fields = inputs.filter((input) => input.type === "checkbox");
  return fields;
};
