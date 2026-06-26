interface Props {
  selected: string;
  setSelected: (value: string) => void;
}

function FilterBar({
  selected,
  setSelected,
}: Props) {
  return (
    <select
      value={selected}
      onChange={(e) =>
        setSelected(e.target.value)
      }
    >
      <option value="All">
        All Categories
      </option>

      <option value="Food">
        Food
      </option>

      <option value="Travel">
        Travel
      </option>

      <option value="Shopping">
        Shopping
      </option>

      <option value="Entertainment">
        Entertainment
      </option>
    </select>
  );
}

export default FilterBar;