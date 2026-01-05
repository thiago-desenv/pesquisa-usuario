import { Component, OnInit } from '@angular/core';
import { IUser } from './interfaces/user/user.interface';
import { UsersList } from './data/users-list';
import { IFilterOptions } from './interfaces/filter-options.interface';
import { isWithinInterval } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userSelected: IUser = {} as IUser;
  showUserDetails: boolean = false;

   usersList: IUser[] = [];
   usersListFiltered: IUser[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.usersList = UsersList;
      this.usersListFiltered = this.usersList;
    }, 500);
  }

  onUserSelected(user: IUser) {
    this.userSelected = user;
    this.showUserDetails = true;
  }

  onFilter(filter: IFilterOptions) {
    console.log(filter);
    this.usersListFiltered = this.filterUsersList(filter, this.usersList);
  }

  filterUsersList(filter: IFilterOptions, usersList: IUser[]): IUser[] {
    let filteredList: IUser[] = [];

    filteredList = this.filterUsersListByName(filter.name, usersList);
    filteredList = this.filterUsersListByStatus(filter.status, filteredList);
    filteredList = this.filterUsersListByDate(filter.startDate, filter.endDate, filteredList);

    return filteredList;
  }

  filterUsersListByName(name: string | undefined, usersList: IUser[]): IUser[] {
    const NAME_NOT_TYPPED = name === undefined;
    if(NAME_NOT_TYPPED) {
      return usersList;
    }

    const filteredList = usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));
    return filteredList;
  }

  filterUsersListByStatus(status: boolean | undefined, usersList: IUser[]): IUser[] {
    const STATUS_NOT_SET = status === undefined;
    if(STATUS_NOT_SET) {
      return usersList;
    }

    const filteredList = usersList.filter((user) => user.ativo === status);
    return filteredList;
  }

  filterUsersListByDate(startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] {
    const DATES_NOT_SET = startDate === undefined || endDate === undefined;
    if(DATES_NOT_SET) {
      return usersList;
    }

    const checkDateInterval = (user: IUser) => isWithinInterval(new Date(user.dataCadastro), { start: startDate, end: endDate });
    const filteredList = usersList.filter(checkDateInterval);
    return filteredList;
  }
}
