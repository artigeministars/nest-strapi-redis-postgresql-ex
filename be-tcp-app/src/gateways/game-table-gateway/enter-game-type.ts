export class EnterGameType {
    status: number;
    message: string;
    data: EnterGameDataType[];
    user_count: number;
}

export class EnterGameDataType {
  id: number;
  title: string;
  config: EnterGameDataConfigType;
  uIDs: EnterGameDataUIDType[];
}

export class EnterGameDataConfigType {
   kav: number;
   maxCoin: number;
   minCoin: number;
}

export class EnterGameDataUIDType {
   uId: string;
   seatingOrder: number;
   wallet: number;
}