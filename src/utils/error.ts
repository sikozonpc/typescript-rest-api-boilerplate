/**
 * Throw a new error with a specified status code and message
 */
export default (message: string, statusCode: number, data?: any) => {
  const error: any = new Error(message)
  error.statusCode = statusCode
  if (data) error.data = data

  return error
}
