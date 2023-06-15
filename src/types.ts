import { ImageSourcePropType } from 'react-native/types';
import Format from '@kichiyaki/react-native-barcode-generator';
export type LoginFormData = {
  email: string;
  password: string;
};

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  passwordRepeated: string;
};

export type BusinessRegistrationFormData = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  NIP: string;
  KRS: string;
  REGON: string;
  businessName: string;
  businessAddress: string;
  postalCode: string;
  city: string;
};

export type Date = {
  //idk jak nazwac xd
  type: string;
  //format: date-time
  nullable: boolean;
};

export type BenefitFormData = {
  name: string;
  price: number; //int
  description: string;
  imageId: string;
  startDate: Date;
  endDate: Date;
  maxAmount: number; //int
};

type UUID = string;

export type Benefit = {
  publicId: UUID;
  name: string;
  price: number; //int
  description: string;
  imageId: UUID;
  startDate: Date;
  endDate: Date;
  maxAmount: number; //int
  available: boolean;
};

export type ItemDefinition = {
  publicId: UUID;
  name: string;
  price: number;
  description: string;
  gpsCoordinates: string;
  bannerImageId: ImageSourcePropType; //temp, string od api (adapter)?
  iconImageId: string;
  menuImageIds?: string[];
  itemDefinitions?: Benefit[];
};

export type InventoryElem = {
  publicId: UUID;
  amount: number;
  name: string;
  price: number;
};

export type BusinessDetails = {
  publicId: UUID;
  name: string;
  address: string;
  description?: string;
  gpsCoordinates: string;
  bannerImageId: UUID;
  iconImageId: UUID;
  menuImageIds: string[];
  itemDefinitions: ItemDefinition[];
};

export type VirtualCard = {
  ownedItems: { publicId: UUID; definitionId: UUID }[];
  businessDetails: BusinessDetails;
  points?: number; //int
  inventory?: InventoryElem[];
};

export type LocalCard = {
  publicId: string;
  name: string;
  type?: string;
  code: string;
  imageUrl: string; //jw
};

export type Card = (VirtualCard | LocalCard) & {
  isAdded?: boolean;
  //type: 'virtual' | 'local';
  barcodeType?: Format;
};
