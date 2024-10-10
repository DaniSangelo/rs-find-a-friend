import { PasswordType } from '../Enums/PasswordTypeEnum'
import {
  PasswordPlain,
  PasswordMd5,
  PasswordSha1,
} from '../ValueObjects/Password'

export default class PasswordFactory {
  static create(password: string, type: PasswordType) {
    switch (type) {
      case PasswordType.PLAIN:
        return new PasswordPlain(password)
      case PasswordType.MD5:
        return new PasswordMd5(password)
      case PasswordType.SHA1:
        return new PasswordSha1(password)
      default:
        throw new Error('Password type not implemented')
    }
  }
}
