// import React, { useState, createContext } from "react";

// interface IconProviderProps {
//   children: React.ReactNode;
// }

// export const IconContext = createContext({
//   pressedShow: false,
//   setIcon: (pressedShow: boolean) => {},
// });

// export const IconProvider = ({ children }: IconProviderProps) => {
//   const [pressedShow, setIcon] = useState(false);

//   return (
//     <IconContext.Provider value={{ pressedShow, setIcon }}>
//       {children}
//     </IconContext.Provider>
//   );
// };
