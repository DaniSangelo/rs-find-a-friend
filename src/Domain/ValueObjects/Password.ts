import crypto from 'node:crypto'

export default interface Password {
  value: string
  verify(value: string): boolean
}

export class PasswordPlain implements Password {
  value: string

  constructor(password: string) {
    this.value = password
  }

  verify(value: string): boolean {
    return value === this.value
  }
}

export class PasswordMd5 implements Password {
  value: string

  constructor(password: string) {
    this.value = crypto.createHash('md5').update(password).digest('hex')
  }

  verify(password: string): boolean {
    return (
      this.value === crypto.createHash('md5').update(password).digest('hex')
    )
  }
}

export class PasswordSha1 implements Password {
  value: string

  constructor(password: string) {
    this.value = crypto.createHash('sha1').update(password).digest('hex')
  }

  verify(password: string): boolean {
    return (
      this.value === crypto.createHash('sha1').update(password).digest('hex')
    )
  }
}
