export interface IButtonProps {
  customClass?: string;
  onButtonClicked?: () => void;
  isDisabled?: boolean;
  text: string;
  propMessage: string;
  commponentName: string;
}
