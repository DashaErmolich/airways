import { SearchParams } from 'src/app/flight/models/flight.models';

export enum SearchParamsActionsTypes {
  chooseAllParams = '[SEARCH PARAMS] chooseAllParams',
  chooseDirections = '[SEARCH PARAMS] chooseDirections',
  chooseDate = '[SEARCH PARAMS] chooseDate',
}

// export type ActionTypes = typeof ChooseAllParamsAction;

export function chooseAllParamsAction(searchParams: SearchParams) {
  return { type: SearchParamsActionsTypes.chooseAllParams, preload: searchParams };
}
