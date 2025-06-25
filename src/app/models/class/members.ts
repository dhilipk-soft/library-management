export class Member {
  memberId: string = '';
  fullName: string = '';
  email: string = '';
  phone: string = '';

  constructor(init?: Partial<Member>) {
    Object.assign(this, init);
  }
}
