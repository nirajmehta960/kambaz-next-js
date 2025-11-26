"use client";
import * as client from "../../client";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setModules, updateModule, editModule } from "./reducer";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useState, useEffect } from "react";

export default function Modules() {
  const { cid } = useParams();
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const [moduleName, setModuleName] = useState("");

  const onCreateModuleForCourse = async () => {
    if (!courseId) return;
    try {
      const newModule = { name: moduleName };
      const module = await client.createModuleForCourse(courseId, newModule);
      dispatch(setModules([...modules, module]));
      setModuleName("");
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const onRemoveModule = async (moduleId: string) => {
    try {
      await client.deleteModule(moduleId);
      dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const onUpdateModule = async (module: any) => {
    try {
      // Remove UI-only fields before sending to backend
      const { editing, ...moduleToUpdate } = module;
      await client.updateModule(moduleToUpdate);
      // Update local state - remove editing flag and update name
      const newModules = modules.map((m: any) =>
        m._id === module._id ? { ...m, name: module.name, editing: false } : m
      );
      dispatch(setModules(newModules));
    } catch (error) {
      console.error("Error updating module:", error);
    }
  };

  const fetchModules = async () => {
    if (!courseId) return;
    try {
      const modules = await client.findModulesForCourse(courseId);
      dispatch(setModules(modules));
    } catch (error) {
      console.error("Error fetching modules:", error);
      // Set empty array on error to prevent UI issues
      dispatch(setModules([]));
    }
  };
  useEffect(() => {
    fetchModules();
  }, [courseId]);

  return (
    <div className="wd-modules">
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={onCreateModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-grow-1 me-3">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && <span>{module.name}</span>}
                {module.editing && (
                  <FormControl
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                    style={{ maxWidth: "300px" }}
                  />
                )}
              </div>
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={onRemoveModule}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
