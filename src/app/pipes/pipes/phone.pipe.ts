import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(phone: string): string {
    const INVALID_PHONE = !phone || phone.length < 10 || phone.length > 11;
    if(INVALID_PHONE) {
      return 'Telefone indisponível ou inválido';
    }

    const TYPEPHONE = phone.length === 11 ? 7 : 6;
    return `(${phone.substring(0, 2)}) ${phone.substring(2, TYPEPHONE)}-${phone.substring(TYPEPHONE)}`
  }
}
