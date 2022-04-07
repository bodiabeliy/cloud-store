export default interface File {
  _id: number;
  name: string;
  type: string;
  children?: any[];
  size?: number;
  date?: Date;
}
