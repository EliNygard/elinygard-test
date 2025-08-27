import { Select } from "@oliasoft-open-source/react-ui-library";

export const SortOrderSelect = ({ onChange }) => (
  <Select
    native
    onChange={onChange}
    options={[
      {
        label: "Sort by name",
        type: "Heading",
      },
      {
        label: "A-Z",
        value: "asc",
      },
      {
        label: "Z-A",
        value: "desc",
      },
    ]}
  />
);
