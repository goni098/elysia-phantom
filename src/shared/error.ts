export class HttpException extends Error {
  constructor(
    public code: number,
    public message: string,
    public options?: ErrorOptions
  ) {
    super(message, options)
  }

  static BadRequest(message = "Bad Request") {
    return new HttpException(400, message)
  }

  static Unauthorized(message = "Unauthorized") {
    return new HttpException(401, message)
  }

  static Forbidden(message: "Forbidden") {
    return new HttpException(403, message)
  }

  static Internal(message = "Internal Server Error") {
    return new HttpException(500, message)
  }
}
