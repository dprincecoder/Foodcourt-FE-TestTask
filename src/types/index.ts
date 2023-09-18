export type contentType = {
  type: string;
  id: string;
  name: string;
  contents: filetype[];
  src: string;
  favourite: boolean;
  created_at: string;
};
export interface filetype extends contentType {
  size?: string;
  iconBgColor?: string;
}
