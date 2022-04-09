export default interface File {
  _id: any;
  name: string;
  type: string;
  children?: any[];
  size?: number;
  date?: Date;
}
