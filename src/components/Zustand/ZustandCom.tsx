// import { create } from "zustand";
// import { DisplayIcon } from "../ContextAPI/DisplayIcon";

// // Zustand store
// const useStore = create((set) => ({
//   pressedShow: false,
//   toggleShow: () => set((state) => ({ pressedShow: !state.pressedShow })),
// }));

// export const Icon = () => {
//   const { pressedShow, toggleShow } = useStore();

//   return (
//     <>
//       <div className="pageLayout">
//         {pressedShow && <DisplayIcon />}
//         <div>
//           <button onClick={toggleShow}>
//             {pressedShow ? "Hide icon" : "Show icon"}
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

import { create } from "zustand";
import Button from "../ContextTheme/Button";

interface ThemeStore {
  darkMode: boolean;
  toggleTheme: () => void;
}

const useStore = create<ThemeStore>((set) => ({
  darkMode: true, // Initial dark mode state
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}));

export const ZustandCom = () => {
  return <Button></Button>;
};
