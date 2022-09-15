class CustomError extends Error {
  code: string;

  status: number;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;