import { Table, type TableRootProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export type StudyTableVariant = "default" | "subtle";
export type StudyTableSize = "sm" | "md";

export type StudyTableColumn<TItem> = {
  key: string;
  header: ReactNode;
  render: (item: TItem) => ReactNode;
  width?: string;
  align?: "start" | "center" | "end";
};

export type StudyTableProps<TItem> = Omit<
  TableRootProps,
  "children" | "variant" | "size"
> & {
  columns: StudyTableColumn<TItem>[];
  items: TItem[];
  getRowKey: (item: TItem) => string;
  tableVariant?: StudyTableVariant;
  tableSize?: StudyTableSize;
  emptyText?: ReactNode;
};

const variantStyles: Record<StudyTableVariant, TableRootProps> = {
  default: {
    bg: "surfaceBg",
  },

  subtle: {
    bg: "panelBgSubtle",
  },
};

const sizeStyles: Record<StudyTableSize, TableRootProps> = {
  sm: {
    size: "sm",
  },

  md: {
    size: "md",
  },
};

const cellAlignMap: Record<NonNullable<StudyTableColumn<unknown>["align"]>, string> = {
  start: "left",
  center: "center",
  end: "right",
};

export function StudyTable<TItem>({
  columns,
  items,
  getRowKey,
  tableVariant = "default",
  tableSize = "md",
  emptyText = "No items found.",
  ...props
}: StudyTableProps<TItem>) {
  return (
    <Table.Root
      w="full"
      rounded="card"
      overflow="hidden"
      borderWidth="1px"
      borderColor="borderStrong"
      {...variantStyles[tableVariant]}
      {...sizeStyles[tableSize]}
      {...props}
    >
      <Table.Header>
        <Table.Row bg="panelBgSubtle">
          {columns.map((column) => (
            <Table.ColumnHeader
              key={column.key}
              w={column.width}
              color="textMuted"
              fontSize="xs"
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
              borderColor="borderSubtle"
              textAlign={cellAlignMap[column.align ?? "start"]}
            >
              {column.header}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {items.length === 0 ? (
          <Table.Row>
            <Table.Cell
              colSpan={columns.length}
              color="textMuted"
              textAlign="center"
              py={8}
              borderColor="borderSubtle"
            >
              {emptyText}
            </Table.Cell>
          </Table.Row>
        ) : (
          items.map((item) => (
            <Table.Row
              key={getRowKey(item)}
              _hover={{
                bg: "activeBg",
              }}
              transitionProperty="background-color"
              transitionDuration="fast"
            >
              {columns.map((column) => (
                <Table.Cell
                  key={column.key}
                  borderColor="borderSubtle"
                  color="textMain"
                  textAlign={cellAlignMap[column.align ?? "start"]}
                >
                  {column.render(item)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
}