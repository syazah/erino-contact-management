const ErrorHandler = (statusCode: number, message: string) => {
  const err: any = new Error(message);
  err.statusCode = statusCode;
  return err;
};

export default ErrorHandler;
