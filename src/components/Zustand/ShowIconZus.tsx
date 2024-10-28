import { create } from "zustand";
import { DisplayIcon } from "../ContextAPI/DisplayIcon";

// Zustand store
const useStore = create((set) => ({
  pressedShow: false,
  toggleShow: () => set((state) => ({ pressedShow: !state.pressedShow })),
}));

export const Icon = () => {
  const { pressedShow, toggleShow } = useStore();

  return (
    <>
      <div className="pageLayout">
        {pressedShow && <DisplayIcon />}
        <div>
          <button onClick={toggleShow}>
            {pressedShow ? "Hide icon" : "Show icon"}
          </button>
        </div>
      </div>
    </>
  );
};
