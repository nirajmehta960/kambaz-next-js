import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { useSelector } from "react-redux";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
  addLesson,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
  addLesson?: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  return (
    <div className="float-end">
      {currentUser?.role === "FACULTY" && (
        <>
          <FaPencil
            onClick={() => editModule(moduleId)}
            className="text-primary me-3"
          />
          <FaTrash
            className="text-danger me-2 mb-1"
            onClick={() => deleteModule(moduleId)}
          />
        </>
      )}
      <GreenCheckmark />
      {currentUser?.role === "FACULTY" && addLesson && (
        <BsPlus
          className="fs-1 me-2"
          style={{ cursor: "pointer" }}
          onClick={() => addLesson(moduleId)}
        />
      )}
      {(!currentUser?.role || currentUser?.role !== "FACULTY") && (
        <BsPlus className="fs-1 me-2" />
      )}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
