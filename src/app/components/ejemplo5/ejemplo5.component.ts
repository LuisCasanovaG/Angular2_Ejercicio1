import { Component, computed, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-ejemplo5',
  imports: [
  CardModule,
  ButtonModule,
  InputTextModule,
  FormsModule,
  FloatLabel,
  TableModule
  ],
  templateUrl: './ejemplo5.component.html',
  styleUrl: './ejemplo5.component.scss'
})
export class Ejemplo5Component{
  precio= signal(0);
  IvaEnPorcentaje=signal(19);

  totaliva= computed(()=> this.precio()*(this.IvaEnPorcentaje()/100));
  total = computed( ()=> this.precio() + this.totaliva() );

  /// Listas de articulos
  listado = signal<any[]>([]); //<...> es para tiparlo, el any es para agregar objetos complejos

  onInputUpdate (event: Event){
    const newValue= +(event.target as HTMLInputElement).value; //el signo mas al inicio es para trasnformar  a  numero si es un string
    this.precio.set(newValue)
  }
  onInputIvaUpdate(event:Event){
    const newValue= +(event.target as HTMLInputElement).value;
    this.IvaEnPorcentaje.set(newValue);
  }

  save(){
    if (this.precio() <= 0) return;

    this.listado.update ((historial: any[])=>{
      const item={
        precio: this.precio(),
        ivaEnPorcentaje:this.IvaEnPorcentaje(),
        iva:this.totaliva(),
        total:this.total()
      }
      return [...historial, item]
    })
  }
}
