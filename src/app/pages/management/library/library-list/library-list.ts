import { Component ,inject ,OnInit, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { ILibraryShow } from '../../../../shared/models/interface/ILibrary';
import { LibraryShow } from '../../../../shared/models/class/Library';
import { IMember } from '../../../../shared/models/interface/IMembers';
import { LibraryService } from '../../../../services/management/library-service';

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
