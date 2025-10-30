import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function AssignmentControlButtons() {
  const { cid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="float-end">
      <BsPlus
        className="fs-2"
        onClick={() => {
          if (currentUser?.role === "FACULTY") {
            router.push(`/Courses/${cid}/Assignments/new`);
          }
        }}
        style={{ cursor: currentUser?.role === "FACULTY" ? "pointer" : "not-allowed", opacity: currentUser?.role === "FACULTY" ? 1 : 0.5 }}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
