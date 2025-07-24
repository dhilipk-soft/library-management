
export class AddLoan {
  bookId: string;
  memberId: string;
  dueTime: string;

  constructor(init?: Partial<AddLoan>) {
    this.bookId = '';
    this.memberId = '';
    this.dueTime = new Date().toISOString().split('T')[0]; // Default: today (YYYY-MM-DD)

    Object.assign(this, init);
  }
}
