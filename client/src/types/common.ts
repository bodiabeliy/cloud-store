export interface User {
  authKey: string;
  enabled: number;
  id: number;
  name: string;
  type: number;
  profile: {
    birthday: string | null;
    createTime: string;
    deleted: number;
    email: string;
    enabled: number;
    id: number;
    name: string;
    patronymic: string;
    phone: string;
    sex: string | null;
    surname: string;
    type: number;
    updateTime: string;
    username: string;
  };
}
