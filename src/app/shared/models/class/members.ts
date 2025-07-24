export class Member {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  password: string = ''

  constructor(init?: Partial<Member>) {
    Object.assign(this, init);
  }
}
