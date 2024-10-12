import { PasswordTypeEnum } from '../Enums/PasswordTypeEnum'
import {
  PasswordPlain,
  PasswordMd5,
  PasswordSha1,
} from '../ValueObjects/Password'

export default class PasswordFactory {
  static create(password: string, type: PasswordTypeEnum) {
    switch (type) {
      case PasswordTypeEnum.PLAIN:
        return new PasswordPlain(password)
      case PasswordTypeEnum.MD5:
        return new PasswordMd5(password)
      case PasswordTypeEnum.SHA1:
        return new PasswordSha1(password)
      default:
        throw new Error('Password type not implemented')
    }
  }
}
