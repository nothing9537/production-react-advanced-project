export interface RatingCardProps {
  className?: string;
  title: string;
  rate?: number;
  feedback?: {
    title: string;
    placeholder: string;
  }
  onAccept?: (actionRating: number, feedback?: string) => void;
  onCancel?: (actionRating: number) => void;
  'data-testid'?: string;
}
