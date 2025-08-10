export interface RegisterUserData {
  email: string;
  avatar_url: string;
  first_name: string;
  last_name: string;
  mfa_enabled: boolean;
  password: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export enum DistanceUnit {
  METERS = "m",
  YARDS = "yd",
}

export enum WeightUnit {
  KG = "kg",
  LB = "lb",
}

export enum AngleUnit {
  MIL = "mil",
  MOA = "moa",
}
