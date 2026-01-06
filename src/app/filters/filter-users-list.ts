import { isWithinInterval } from "date-fns";
import { IUser } from "../interfaces/user/user.interface";
import { IFilterOptions } from "../interfaces/filter-options.interface";

const filterUsersListByName = (name: string | undefined, usersList: IUser[]): IUser[] => {
  const NAME_NOT_TYPPED = name === undefined;
  if(NAME_NOT_TYPPED) {
    return usersList;
  }

  const filteredList = usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));
  return filteredList;
}

const filterUsersListByStatus = (status: boolean | undefined, usersList: IUser[]): IUser[] => {
  const STATUS_NOT_SET = status === undefined;
  if(STATUS_NOT_SET) {
    return usersList;
  }

  const filteredList = usersList.filter((user) => user.ativo === status);
  return filteredList;
}

const filterUsersListByDate = (startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] => {
  const DATES_NOT_SET = startDate === undefined || endDate === undefined;
  if(DATES_NOT_SET) {
    return usersList;
  }

  const checkDateInterval = (user: IUser) => isWithinInterval(new Date(user.dataCadastro), { start: startDate, end: endDate });
  const filteredList = usersList.filter(checkDateInterval);
  return filteredList;
}

const filterUsersList = (filter: IFilterOptions, usersList: IUser[]): IUser[] => {
  let filteredList: IUser[] = [];

  filteredList = filterUsersListByName(filter.name, usersList);
  filteredList = filterUsersListByStatus(filter.status, filteredList);
  filteredList = filterUsersListByDate(filter.startDate, filter.endDate, filteredList);

  return filteredList;
}

export { filterUsersList };
