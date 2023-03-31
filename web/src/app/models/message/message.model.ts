
export class MessageMultiple<T> {
  message: string;
  data: T[];

  error?: string;

  constructor(message: string, data: T[], error?: string) {
    this.message = message;
    this.data = data;
    this.error = error;


  }
}

export class MessageSingle<T> {
  message: string;
  data: T;

  error?: string;

  constructor(message: string, data: T, error?: string) {
    this.message = message;
    this.data = data;
    this.error = error;

  }
}
