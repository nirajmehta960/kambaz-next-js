import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { useParams, useRouter } from "next/navigation";

export default function AssignmentControlButtons() {
  const { cid } = useParams();
  const router = useRouter();
  return (
    <div className="float-end">
      <BsPlus
        className="fs-2"
        onClick={() => router.push(`/Courses/${cid}/Assignments/new`)}
        style={{ cursor: "pointer" }}
      />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
