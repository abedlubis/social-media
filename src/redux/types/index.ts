export interface IPageConfigSetLoadingAction {
  isLoading: boolean;
}

export interface IPageConfigSetFormAction<T> {
  form: T;
}

export interface IPageConfigSetFormDefaultAction<T> {
  formDefault: T
}

export interface IPageConfigSetErrorsAction<T> {
  errors: T;
}
