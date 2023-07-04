export interface ISerializable {
  serialize(): { [key: string]: any };
  filterSensitiveData?: () => this;
}

export interface ISerializableClass<T> {
  unserialize: (val: any) => T;
}
