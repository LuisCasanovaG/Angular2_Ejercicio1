import { Component, signal } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ejemplo1',
  imports: [CardModule, ButtonModule],
  templateUrl: './ejemplo1.component.html',
  styleUrl: './ejemplo1.component.scss'
})
export class Ejemplo1Component {
  conteoConSenal= signal(0); //la señal la inicaliza 
  conteoSinSenal=0;

  incrementarConteo(){
    this.conteoSinSenal=this.conteoSinSenal+1;
    this.conteoConSenal.update((valor)=> valor + 1 ); //incrementar con señal
  }

  decrementarConteo(){
    this.conteoSinSenal=this.conteoSinSenal-1;
    this.conteoConSenal.update((valor)=> valor - 1 ); 
  }

}
