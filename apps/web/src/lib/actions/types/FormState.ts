type FormErrors<T> = Partial<Record<keyof T, string>>;

export type FormState<T> = Promise<{
  data: Partial<T>;
  errors?: FormErrors<T>;
  message?: string;
}>;
