export interface IInputProps {
  customInputClass?: string;
  customLabelClass?: string;
  onChange?: (inputParams: string | number) => void;
  label?: string;
  placeholder: string;
  inputValue: string | number
}
