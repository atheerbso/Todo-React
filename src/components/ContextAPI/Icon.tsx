import { DisplayIcon } from "./DisplayIcon";
import { useIconContext } from "./useIconContext";

export const Icon = () => {
  const { pressedShow, setIcon } = useIconContext();

  return (
    <>
      <div className="pageLayout">
        {pressedShow && <DisplayIcon />}
        <div>
          <button onClick={() => setIcon(!pressedShow)}>
            {pressedShow ? "Hide icon" : "Show icon"}
          </button>
        </div>
      </div>
    </>
  );
};
