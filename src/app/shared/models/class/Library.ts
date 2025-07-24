import { Member } from "./members";

export class Library{
      libraryName: string;
      membersIds: string[];

      constructor(
    ){
        this.libraryName = "";
        this.membersIds = [];
      }
}

export class LibraryShow{
    libraryName: string;
    members: Member[];

    constructor(
  ){
      this.libraryName = "";
      this.members = [];
  }
}