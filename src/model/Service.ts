export interface Service {
  serviceID: number;
  serviceName: string;
  combo: Combo;
}

interface Combo {
  comboID: number;
  comboName: string;
  comboPrice: number;
  comboDescription: string;
  services: string[];
}
