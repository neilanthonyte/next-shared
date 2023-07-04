// namespaces any columns that have a table specified
// this avoids column name collisions when joining tables
// can take an array of columns
/*
e.g.
namespaceColumns([
    'user.name',
    'user.age',
    'user.date',
    'login.key',
    'login.date',
    'asdf',
    '1 as one'
])
=
[
    'user.name as user_name',
    'user.age as user_age',
    'user.date as user_date',
    'login.key as login_key',
    'login.date as login_date',
    'asdf',
    '1 as one'
]
 */
export function namespaceColumns(columns: string[]): string[] {
  return columns.map((col) => {
    if (
      col.indexOf(" as ") === -1 && // alias not manually specified
      col.indexOf(".") !== -1 // table name is specified
    ) {
      // dont change anything if the col has already been aliased
      return `${col} as ${col.replace(".", "_")}`;
    }

    return col;
  });
}

/**
 * Exclude and name space columns to leave behind just the field name base on the prefix.
 *
 * eg. dbRow = {
 *        orders_id: "test"
 *        orders_total: 30
 *        refunds_id: "test"
 *     }
 *     excludeNamespaceColumns(dbRow, "orders");
 *     =
 *     dbRow = {
 *        id: "test"
 *        total: 30
 *     }
 */
export function excludeNamespaceColumns(dbRow: any, prefix: string = "") {
  const newDbRow: any = {};
  for (const key in dbRow) {
    if (key in dbRow) {
      if (key.includes(prefix + "_")) {
        const newKey = key.replace(prefix + "_", "");
        newDbRow[newKey] = dbRow[key];
      }
    }
  }
  return newDbRow;
}
