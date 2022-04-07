export default interface User {
  email: string;
  password: string;
  totalSize?: number;
  files?: any[];
}
