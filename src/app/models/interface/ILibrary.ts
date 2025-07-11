import { IMember } from "./IMembers";

export interface ILibrary {
  libraryName: string;
  membersIds: string[];
}

export interface ILibraryShow {
  libraryName: string;
  members: IMember[];
}

export interface ILibraryDetail{
  libraryName: string;
  libraryId: string;
}