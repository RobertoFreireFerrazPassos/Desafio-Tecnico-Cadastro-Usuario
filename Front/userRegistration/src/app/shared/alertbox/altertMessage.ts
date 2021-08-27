export enum TypeAlert {
  Success = 'sucess',
  Error = 'error',
  Unknown = ''
}

export class MessageAlert {
  message : String;
  type : TypeAlert;
  active : Boolean;
}
