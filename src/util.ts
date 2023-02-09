export const mobileNumberValidation = (val: string) => {
  return /^[789]d{9}$/.test(val);
};

export interface supplierAddresProps {
  AddressName: string;
  City: string;
  CompanyName: string;
  Country: string;
  DateCreated: string;
  FirstName: string;
  ID: string;
  LastName: string;
  Phone: any;
  State: string;
  Street1: string;
  Street2: string;
  Zip: string;
  xp: any;
  supplierId: string;
}

export interface userDetialsProps {
  name: string;
  email: string;
  termsAndCondition: boolean;
  subscribeWhatsApp: boolean;
}
