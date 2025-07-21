import { Component ,inject ,OnInit, signal} from '@angular/core';
import { LibraryService } from '../../../services/management//library-service';
import { ILibrary, ILibraryShow } from '../../../shared/models/interface/ILibrary';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibraryShow } from '../../../shared/models/class/Library';
import { IMember } from '../../../shared/models/interface/IMembers';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-library-list',
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './library-list.html',
  styleUrl: './library-list.css'
})
export class LibraryList implements OnInit{

  libraryList = signal<ILibraryShow []>([])
  selectedLibrary: LibraryShow = new LibraryShow()
  selectedLibraryMembers = signal<IMember []>([])

  libraryService = inject(LibraryService);

  ngOnInit(): void {
      this.loadLibrary();
  }

  loadLibrary():void{
    this.libraryService.getAllLibraries().subscribe((data)=>{
      this.libraryList.set(data);
      // console.log(this.libraryList())
    })
  }

  handleListMembers(): void{
    const find = this.libraryList().find(library => library.libraryName == this.selectedLibrary.libraryName)
    // console.log(find)
    if(find){
      this.selectedLibraryMembers.set(find.members)
    }
    // console.log(this.selectedLibraryMembers())
  }




}
