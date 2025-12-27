import { Component, OnInit } from '@angular/core';
import { IFilterOptions } from 'src/app/interfaces/filter-options.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent {

  filterOptions: IFilterOptions = {
    name: '',
    startDate: undefined,
    endDate: undefined,
    status: ''
  }

  dateSelected(date: any) {
    console.log(date);
  }
}
