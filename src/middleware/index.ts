import {
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
} from './common'
import { handleAPIDocs } from './apiDocs'

export default [
  handleBodyRequestParsing,
  handleCompression,
  handleCors,
  handleAPIDocs,
]
