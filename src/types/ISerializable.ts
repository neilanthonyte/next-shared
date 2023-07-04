export interface ISerializable {
  serialize(): { [key: string]: any };
  /**
   * Provides a "safe" version of the class.
   */
  filterSensitiveData?: () => this;
}

export interface ISerializableClass<T> {
  unserialize: (val: any) => T;
}
