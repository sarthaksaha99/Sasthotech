export interface IDoctor {
  name: string;
  field: string;
  designation: string;
}
export interface ITest {
  name: string;
  price: number;
  room?: string;
}
export interface IFormData {
  email: string;
  password: string;
  institution: string;
  logo: string;
  address: string;
  doctors: IDoctor[];
  tests: ITest[];
}
export interface IFormContextType {
  data: IFormData;
  setFormValues: (value: Partial<IFormData>) => void;
}
