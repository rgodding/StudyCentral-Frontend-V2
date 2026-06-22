import {
  Box,
  Collapsible,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuChevronDown, LuChevronRight } from "react-icons/lu";

type Props = {
  height?: string;
  defaultOpen?: boolean;
  props?: React.ComponentProps<typeof Box>;
};

export function TestFoldableTallBox({
  height = "1800px",
  defaultOpen = false,
  props,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box borderWidth="1px" borderRadius="md" bg="white" {...props}>
      <Collapsible.Root
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      >
        <HStack
          justify="space-between"
          px={4}
          py={3}
          cursor="pointer"
          userSelect="none"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen((current) => !current)}
        >
          <Text fontWeight="semibold">Test foldable tall box</Text>

          <IconButton
            aria-label="Toggle test box"
            size="sm"
            variant="ghost"
            pointerEvents="none"
          >
            {open ? <LuChevronDown /> : <LuChevronRight />}
          </IconButton>
        </HStack>

        <Collapsible.Content>
          <Box h={height} bg="gray.100" borderTopWidth="1px" p={4}>
            <Text fontSize="sm" color="gray.600">
              Tall overflow test area.
            </Text>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}