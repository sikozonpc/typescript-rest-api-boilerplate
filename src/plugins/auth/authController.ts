import UserModel from '../../models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import $error from '../../utils/error'
import { HTTP401Error } from '../../utils/httpErrors'

export type Credentials = {
  firstName: string,
  lastName: string,
  password: string,
  email: string,
}

export type LoginCredentials = {
  email: Credentials['email'],
  password: Credentials['password'],
}

/**
 * Registers a new user.
 */
export const registerUser = async (credentials: Credentials) => {
  const hashedPassword = await bcrypt.hash(credentials.password, 12)

  const freshUser = new UserModel({ ...credentials, password: hashedPassword })
  freshUser.save()

  return {
    message: 'Account has been successfuly registred!',
    user_id: freshUser._id,
  }
}

/**
 * Logins a user and returns an `access_token` with a validity time.
 */
export const loginUser = async (loginCredentials: LoginCredentials) => {
  const { email, password } = loginCredentials

  // Find if the user exists
  const user = await UserModel.findOne({ email })

  if (!user) {
    throw new HTTP401Error(`Email ${email} is not linked to any user, please register.`)
  }

  // Validate password and hashed one
  const comparePasswords = await bcrypt.compare(password, user.password)

  if (!comparePasswords) {
    throw new HTTP401Error('Wrong password.')
  }

  // Create an access token for the user to access the app
  if (!process.env.JTW_SECRET) {
    throw new HTTP401Error('No JWT_SECRET in .env')
  }

  const accessToken = jwt.sign(
    { email, id: user._id.toString() },
    process.env.JTW_SECRET,
    {
      expiresIn: '24h',
    })

  return {
    message: 'Logged in successfuly!',
    'access_token': accessToken,
    expiresIn: '24h',
    id: user._id.toString(),
  }
}
