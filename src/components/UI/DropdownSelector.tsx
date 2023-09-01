import { getAllDirectors } from "@/lib/director.actions";
import { useEffect, useState } from "react";

const DropDownSelector = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [allDirectors, setAllDirectors] = useState([]);
  const [selectedStates, setSelectedStates] = useState<Record<string, boolean>>(
    {}
  );

  console.log("selected states", selectedStates);

  useEffect(() => {
    const getAll = async () => {
      const res = await getAllDirectors();
      console.log(res);

      setAllDirectors(res);
    };
    getAll();
  }, []);

  return (
    <fieldset>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="form-input-text text-left"
      >
        -- Select your states --
      </button>
      {isDropdownOpen && (
        <div>
          {allDirectors.map((state) => (
            <div key={state.id}>
              <input
                onChange={(e) =>
                  setSelectedStates({
                    ...selectedStates,
                    [state.id]: e.target.checked,
                  })
                }
                checked={selectedStates[state.id]}
                id={`input-${state.id}`}
                type="checkbox"
              />
              <label htmlFor={`input-${state.id}`}>{state.name}</label>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
};

export default DropDownSelector;
