import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckMark from "./GreenCheckMark";
export default function ModuleControlButton() {
  return (
    <span className="d-flex align-items-center me-2 float-end">
      <GreenCheckMark />
      <IoEllipsisVertical className="fs-4" />
    </span>
  );
}
