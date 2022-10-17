export default abstract class Entity<TData> {
  private data?: TData = undefined;

  constructor(data: TData, validation = true) {
    this.set(data, validation);
  }

  get() {
    return this.data;
  }

  set(newData: TData | ((data?: TData) => TData), validation = true) {
    if (newData instanceof Function) {
      this.data = newData(this.data);
    } else {
      this.data = newData;
    }

    if (validation) {
      this.validate();
    }
  }

  abstract validate(): void;
}
