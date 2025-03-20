import { Component, computed, signal } from '@angular/core';

import { products } from './products';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ejemplo7',
  imports: [
    CardModule, 
ButtonModule,
InputTextModule,
FormsModule,
FloatLabel,
TableModule
  ],
  templateUrl: './ejemplo7.component.html',
  styleUrl: './ejemplo7.component.scss'
})
export class Ejemplo7Component {
  readonly firstPage =1;
  itemsPerPage =5;

  searchInput= signal('');
  currentPage=signal (this.firstPage);// pagina actual

  isNextPageNotAvailable = computed(()=>{ //cuando es varias lineas el computed lleva llaves si no, no
    const filterProducts=products
      .filter ((product)=>product.title.toLocaleLowerCase().includes(this.searchInput().toLocaleLowerCase()) )
      return filterProducts.length<(this.currentPage()+1) * this.itemsPerPage;
  })

  filterProducts=computed(()=> {
    const startIndex=(this.currentPage()-1)* this.itemsPerPage;
    const endIndex=(startIndex + this.itemsPerPage);
    return products.filter(product => product.title.toLocaleLowerCase().includes(this.searchInput().toLocaleLowerCase()))
      .slice(startIndex, endIndex)
  })

  searchProduct(searchText:string){
    this.searchInput.set(searchText);
    if(this.currentPage()>this.firstPage){
      this.currentPage.set(this.firstPage);
    }
  }

  goToPrevPage(){
    this.currentPage.update(currentPage=> Math.max(currentPage - 1, 1))
  }
  goToNextPage(){
    this.currentPage.update( currentPage=> Math.min(currentPage+1, this.itemsPerPage + 1))
  }


}
