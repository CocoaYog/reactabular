Given sometimes you might want to display rows in a nested manner, you can use resolvers for this purpose. One way to do this is to use a `children` field and then convert the tree structure to something flat that Reactabular understands. Reactabular core doesn't know anything about trees but it works thanks to this conversion step.

**Example:**

```jsx
/*
import React from 'react';
import * as Table from '@reactabular/table';
import * as resolve from 'table-resolver';
*/

const columns = [
  {
    property: 'color',
    headerCell: 'Color'
  },
  {
    headerCell: 'Name',
    children: [
      {
        property: 'name.first',
        headerCell: 'First Name'
      },
      {
        property: 'name.last',
        headerCell: 'Last Name'
      }
    ]
  },
  {
    headerCell: 'About',
    children: [
      {
        property: 'company',
        headerCell: 'Company'
      },
      {
        property: 'sentence',
        headerCell: 'Sentence'
      }
    ]
  }
];

const rows = [
  {
    id: 1,
    color: 'red',
    name: {
      first: 'John',
      last: 'Johnson'
    },
    company: 'John Inc.',
    sentence: 'consequatur nihil minima corporis omnis nihil rem'
  },
  {
    id: 2,
    color: 'blue',
    name: {
      first: 'Mike',
      last: 'Mikeson'
    },
    company: 'Mike Inc.',
    sentence: 'a sequi doloremque sed id quo voluptatem voluptatem ut voluptatibus'
  }
];

const NestedColumnsTable = () => {
  const resolvedColumns = resolve.columnChildren({ columns });
  const resolvedRows = resolve.resolve({
    columns: resolvedColumns,
    method: resolve.nested
  })(rows);

  // TODO: Fix resolver to pass colSpan/rowSpan without nesting in props property
  console.log(resolve.headerRows({ columns }));

  return (
    <Table.Provider columns={resolvedColumns}>
      <Table.Header
        headerRows={resolve.headerRows({ columns })}
      />

      <Table.Body
        rows={resolvedRows}
        rowKey="id"
      />
    </Table.Provider>
  );
};

<NestedColumnsTable />
```

## See Also

* [Resolving](/resolving)
