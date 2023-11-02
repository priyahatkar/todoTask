import { Pipe, PipeTransform } from '@angular/core';
import { Itodo } from '../model/totoInterface';

@Pipe({
  name: 'todoPipe'
})
export class TodoPipePipe implements PipeTransform {

  transform(value: Itodo[], searchString: string): Itodo[] {
    if(!value){
      return[]
    }

    if(!searchString){
    return value
    }

    let todoArray = value.filter(todo =>{
      return todo.title.toLowerCase().trim().includes(searchString.toLowerCase())
    })
    return todoArray
  }

}
