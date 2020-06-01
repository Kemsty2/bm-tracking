export interface Device {
  id: string;
  name: string;
  groupId: number;
  uniqueId: string;
  status: DeviceStatus;
  lastUpdate: Date;
  positionId: number;
  phone: string;
  model: string;
  contact: string;
  category: string;
  disabled: boolean;
}

export enum DeviceStatus {
  Offline = 'Offline',
  Online = 'Online',
}
