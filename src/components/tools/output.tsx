"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// import { useReactToPrint } from "react-to-print";
// import { toast } from "sonner";

// import { addSavedData } from "@/lib/supabase-helpers";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

// import Edit from "../edit-btn";
// import CopyButton from "./copy-button";
// import Modal from "./modal";

interface OutputProps {
  output: string;
  disabled: boolean;
  editedOutput: (value: string) => void;
  edit: boolean;
  saveButton: boolean;
  data?: any;
  setSave: (value: boolean) => void;
  title: string;
}

export default function Output({
  output,
  disabled,
  editedOutput,
  edit,
  saveButton,
  data,
  setSave,
  title,
}: OutputProps) {
  const [editableContent, setEditableContent] = useState(output);
  const [originalOutput, setOriginalOutput] = useState(output);
  const [editMode, setEditMode] = useState(false);
  const componentRef = useRef(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [selectedText, setSelectedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const [outputModal, setOutputModal] = useState(false);
  const [newOutput, setNewOutput] = useState("");
  const [modifiable, setModifiable] = useState(false);
  const [editCommand, setEditCommand] = useState("");

  const handleTextSelection = () => {
    const selection = window.getSelection()!;
    const selectedText = selection.toString();

    if (selectedText) {
      setSelectedText(selectedText);

      // Calculate the position of the selected text
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      const position = {
        top: rect.top + window.scrollY - 800,
        left: rect.left + window.scrollX - 80,
      };

      setModalPosition(position);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Close the modal when the window is scrolled
  useEffect(() => {
    window.addEventListener("scroll", closeModal);
    return () => {
      window.removeEventListener("scroll", closeModal);
    };
  }, []);

  const handleTextInsertion = () => {
    var replacedText = editableContent.replace(selectedText, newOutput);

    setEditableContent(replacedText);

    setOutputModal(false);
    // toast.success("Modified Lesson Plan!");
  };

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: `${title} Lesson Plan`,
  //   onPrintError: () => alert("there is an error when printing"),
  //   pageStyle: "@page { size: A4; margin: 8.5mm; }",
  // });

  const handleEdit = () => {
    setOriginalOutput(output);
    setEditMode(true);
  };

  const toggleEditMode = () => {
    setEditableContent(output);
    setOriginalOutput(output);
    setEditMode(!editMode);
  };

  const handleSave = () => {
    editedOutput(editableContent);
    setOriginalOutput(editableContent);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditableContent(originalOutput);
    setEditMode(false);
  };

  // const handleSaveButton = () => {
  //   addSavedData(data.id, data.input, data.output, data.type);
  //   toast.success("Saved Concept!");
  //   setSave(false);
  // };

  const formattedOutput = output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .map((line, index) => {
      if (line.startsWith("Lesson Objective:")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Lesson Objective:</p>
            {line.split("Lesson Objective:")[1].trim()}
          </div>
        );
      } else if (line.startsWith("Opening:")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Opening:</p>
            {line.split("Opening:")[1].trim()}
          </div>
        );
      } else if (line.startsWith("Introduction to New Material:")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Introduction to New Material:</p>
            {line.split("Introduction to New Material:")[1].trim()}
          </div>
        );
      } else if (line.startsWith("Guided Practice:")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Guided Practice:</p>
            {line.split("Guided Practice:")[1].trim()}
          </div>
        );
      } else if (line.startsWith("Independent Practice:")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Independent Practice:</p>
            <ul>
              {/* {formattedOutput.slice(index + 1)
                  .map((strategy: any, strategyIndex: any) => {
                    if (strategy.startsWith('- ')) {
                      return <li key={strategyIndex}>{strategy.replace('-', '').trim()}</li>
                    } else {
                      return null
                    }
                  })} */}
              {line.split("Independent Practice:")[1].trim()}
            </ul>
          </div>
        );
      } else if (line.startsWith("Closing:")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Closing:</p>
            <ul>{line.split("Closing:")[1].trim()}</ul>
          </div>
        );
      } else {
        return <p key={index}>{line}</p>;
      }
    });

  return (
    <div>
      <div className="mt-5 flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          <li className="py-5">
            <div className="relative">
              <h2 className="flex items-baseline justify-between gap-3 text-2xl font-bold tracking-tight text-black">
                <div className="flex items-center gap-3">
                  <span>Output</span>
                  {/* <CopyButton value={output} /> */}
                  {editMode && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Show Guide</Button>
                      </DialogTrigger>
                      <DialogContent className="overflow-hidden">
                        <DialogHeader>
                          <DialogTitle>Use Guide Video</DialogTitle>
                        </DialogHeader>
                        <div className="py-4">
                          <video
                            className="rounded-xl shadow-xl"
                            autoPlay
                            muted
                            loop
                            src="https://user-images.githubusercontent.com/83456083/233063742-ca57e432-a4db-4d65-b7eb-20bd78e3ed72.mp4"
                          ></video>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
                {/* <Edit
                  isEdit={edit}
                  editMode={editMode}
                  toggleEditMode={toggleEditMode}
                  handleEdit={handleEdit}
                  handleCancel={handleCancel}
                  handleSave={handleSave}
                /> */}
              </h2>
              <div
                id="print-pdf"
                className="print:font-inter mt-2 whitespace-pre-line text-base leading-5 print:m-5 print:break-before-page print:break-after-page print:p-5"
                ref={componentRef}
              >
                {editMode ? (
                  <>
                    <textarea
                      id="myTextarea"
                      autoFocus
                      onMouseUp={handleTextSelection}
                      ref={textareaRef}
                      rows={output.split("\n").length}
                      value={editableContent}
                      className={`mt-1 w-full overflow-y-scroll rounded-lg border-2 border-black focus-visible:border-2 focus-visible:border-black focus-visible:ring-transparent ${
                        !editMode ? "hidden" : ""
                      }`}
                      onChange={(e) => setEditableContent(e.target.value)}
                      disabled={!editMode}
                    />
                    {outputModal && (
                      <div className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid max-h-[90vh] w-full max-w-[80vw] translate-x-[-50%] translate-y-[-50%] gap-4 overflow-auto border border-zinc-200 bg-zinc-100 p-5 shadow-lg duration-200 focus:outline-none focus-visible:outline-none sm:rounded-lg md:w-full  dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="pt-4 font-semibold">
                          <h1>{editCommand}</h1>
                        </div>
                        <div className="flex space-x-4 py-4">
                          <div className="w-[45%]">
                            <div className="pb-4 font-semibold underline">
                              Old
                            </div>
                            {selectedText}
                          </div>
                          <Separator orientation="vertical"></Separator>
                          <div className="w-[55%]">
                            <div className="pb-4 font-semibold underline">
                              New
                            </div>

                            {!newOutput ? (
                              // <LoadingDots color="black" style="large" />
                              <></>
                            ) : (
                              <div>
                                <div>{newOutput}</div>
                                {modifiable && (
                                  <div className="flex justify-end gap-x-3 pt-6">
                                    <Button
                                      variant="destructive"
                                      onClick={() => setOutputModal(false)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button onClick={handleTextInsertion}>
                                      Insert
                                    </Button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {modalVisible && (
                      <div
                        style={{
                          position: "absolute",
                          top: `${modalPosition.top}px`,
                          left: `${modalPosition.left}px`,
                          zIndex: "999",
                        }}
                      >
                        {/* <Modal
                          selectedText={selectedText}
                          closeModal={closeModal}
                          setOutputModal={setOutputModal}
                          setNewOutput={setNewOutput}
                          setModifiable={setModifiable}
                          setEditCommand={setEditCommand}
                        /> */}
                      </div>
                    )}
                  </>
                ) : (
                  formattedOutput
                )}
                <div className="footer hidden font-bold print:fixed print:bottom-0 print:right-0 print:block print:rounded-lg print:px-4 print:py-1.5 print:text-lg print:tracking-tight">
                  <Link href="app.teachingtools.ai">
                    Made with Teaching Tools AI
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-5 flex gap-5">
        <button
          // onClick={() => handleSaveButton()}
          disabled={!saveButton}
          className="w-full rounded-md bg-black px-4 py-2 text-xl font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
        >
          Save Lesson Plan
        </button>
        <button
          // onClick={handlePrint}
          disabled={disabled}
          className={cn(
            "w-full rounded-md bg-black px-4 py-2 text-lg font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
          )}
        >
          Download Lesson Plan
        </button>
      </div>
    </div>
  );
}

// export function ActivityOutput({
//   output,
//   disabled,
//   editedOutput,
//   edit,
//   saveButton,
//   data,
//   setSave,
//   title,
// }: OutputProps) {
//   const [editableContent, setEditableContent] = useState(output);
//   const [originalOutput, setOriginalOutput] = useState(output);
//   const [editMode, setEditMode] = useState(false);
//   const componentRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `${title} Activities`,
//     onPrintError: () => alert("there is an error when printing"),
//     pageStyle: "@page { size: A4; margin: 8.5mm; }",
//   });

//   const handleEdit = () => {
//     setOriginalOutput(output);
//     setEditMode(true);
//   };

//   const toggleEditMode = () => {
//     setEditableContent(output);
//     setOriginalOutput(output);
//     setEditMode(!editMode);
//   };

//   const handleSave = () => {
//     editedOutput(editableContent);
//     setOriginalOutput(editableContent);
//     setEditMode(false);
//   };

//   const handleCancel = () => {
//     setEditableContent(originalOutput);
//     setEditMode(false);
//   };

//   const handleSaveButton = () => {
//     addSavedData(data.id, data.input, data.output, data.type);
//     toast.success("Saved Concept!");
//     setSave(false);
//   };

//   const formattedOutput = output
//     .split("\n")
//     .map((line) => line.trim())
//     .filter((line) => line !== "")
//     .map((line, index) => {
//       if (line.startsWith("Activity Title:")) {
//         return (
//           <div key={index}>
//             <p className="mt-4 font-bold">Activity Title:</p>
//             {line.split("Activity Title:")[1].trim()}
//           </div>
//         );
//       } else if (line.startsWith("One line description of the activity:")) {
//         return (
//           <div key={index}>
//             <p className="mt-2 font-bold">Description:</p>
//             {line.split("One line description of the activity:")[1].trim()}
//           </div>
//         );
//       } else if (line.startsWith("Resources:")) {
//         return (
//           <div key={index}>
//             <p className="mt-2 font-bold">Resources:</p>
//             {line.split("Resources:")[1].trim()}
//           </div>
//         );
//       } else if (line.startsWith("Instructions for students:")) {
//         return (
//           <div key={index}>
//             <p className="mt-2 font-bold">Instructions for students:</p>
//             {line.split("Instructions for students:")[1].trim()}
//           </div>
//         );
//       } else {
//         return <p key={index}>{line}</p>;
//       }
//     });

//   return (
//     <div>
//       <div className="mt-10 flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left">
//         <ul role="list" className="-my-5 divide-y divide-gray-200">
//           <li className="py-5">
//             <div className="relative">
//               <h2 className="flex items-baseline justify-between gap-3 text-2xl font-bold tracking-tight text-black">
//                 <div className="flex items-center gap-3">
//                   <span>Output</span>
//                   <CopyButton value={output} />
//                 </div>
//                 <Edit
//                   isEdit={edit}
//                   editMode={editMode}
//                   toggleEditMode={toggleEditMode}
//                   handleEdit={handleEdit}
//                   handleCancel={handleCancel}
//                   handleSave={handleSave}
//                 />
//               </h2>
//               <div
//                 id="print-pdf"
//                 className="print:font-inter mt-2 whitespace-pre-line text-base leading-5 print:m-5 print:break-before-page print:break-after-page print:p-5"
//                 ref={componentRef}
//               >
//                 {editMode ? (
//                   <textarea
//                     autoFocus
//                     ref={textareaRef}
//                     rows={output.split("\n").length}
//                     value={editableContent}
//                     className={`mt-1 w-full overflow-y-scroll rounded-lg border-2 border-black focus-visible:border-2 focus-visible:border-black focus-visible:ring-transparent ${
//                       !editMode ? "hidden" : ""
//                     }`}
//                     onChange={(e) => setEditableContent(e.target.value)}
//                     disabled={!editMode}
//                   />
//                 ) : (
//                   formattedOutput
//                 )}
//                 <div className="footer hidden font-bold print:fixed print:bottom-0 print:right-0 print:block print:rounded-lg print:px-4 print:py-1.5 print:text-lg print:tracking-tight">
//                   <Link href="app.teachingtools.ai">
//                     Made with Teaching Tools AI
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <div className="mt-5 flex gap-5">
//         <button
//           onClick={() => handleSaveButton()}
//           disabled={!saveButton}
//           className="w-full rounded-md bg-black px-4 py-2 text-xl font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//         >
//           Save Activities
//         </button>
//         <button
//           onClick={handlePrint}
//           disabled={disabled}
//           className={cn(
//             "w-full rounded-md bg-black px-4 py-2 text-lg font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//           )}
//         >
//           Download Activities
//         </button>
//       </div>
//     </div>
//   );
// }

// export function FeedbackOutput({
//   output,
//   disabled,
//   editedOutput,
//   edit,
//   saveButton,
//   data,
//   setSave,
//   title,
// }: OutputProps) {
//   const [editableContent, setEditableContent] = useState(output);
//   const [originalOutput, setOriginalOutput] = useState(output);
//   const [editMode, setEditMode] = useState(false);
//   const componentRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `${title}'s Feedback`,
//     onPrintError: () => alert("there is an error when printing"),
//     pageStyle: "@page { size: A4; margin: 8.5mm; }",
//   });

//   const handleEdit = () => {
//     setOriginalOutput(output);
//     setEditMode(true);
//   };

//   const toggleEditMode = () => {
//     setEditableContent(output);
//     setOriginalOutput(output);
//     setEditMode(!editMode);
//   };

//   const handleSave = () => {
//     editedOutput(editableContent);
//     setOriginalOutput(editableContent);
//     setEditMode(false);
//   };

//   const handleCancel = () => {
//     setEditableContent(originalOutput);
//     setEditMode(false);
//   };

//   const handleSaveButton = () => {
//     addSavedData(data.id, data.input, data.output, data.type);
//     toast.success("Saved Concept!");
//     setSave(false);
//   };

//   const formattedOutput = output
//     .split("\n")
//     .map((line) => line.trim())
//     .filter((line) => line !== "")
//     .map((line, index) => {
//       if (line.startsWith("Feedback:") || line.startsWith("Feedback-")) {
//         const feedbackSection =
//           line.split("Feedback:")[1] || line.split("Feedback-")[1];
//         return (
//           <div key={index}>
//             <p className="font-bold">Feedback:</p>
//             {feedbackSection?.trim()}
//           </div>
//         );
//       } else if (
//         line.startsWith("Next steps:") ||
//         line.startsWith("Next steps-") ||
//         line.startsWith("Next Steps:") ||
//         line.startsWith("Next Steps-")
//       ) {
//         const nextStepsSection =
//           line.split("Next steps:")[1] ||
//           line.split("Next Steps:")[1] ||
//           line.split("Next steps-")[1] ||
//           line.split("Next Steps-")[1];
//         return (
//           <div key={index}>
//             <p className="mt-2 font-bold">Next Steps:</p>
//             {nextStepsSection?.trim()}
//           </div>
//         );
//       } else {
//         return <p key={index}>{line}</p>;
//       }
//     });

//   return (
//     <div>
//       <div className="mt-10 flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left">
//         <ul role="list" className="-my-5 divide-y divide-gray-200">
//           <li className="py-5">
//             <div className="relative">
//               <h2 className="flex items-baseline justify-between gap-3 text-2xl font-bold tracking-tight text-black">
//                 <div className="flex items-center gap-3">
//                   <span>Output</span>
//                   <CopyButton value={output} />
//                 </div>
//                 <Edit
//                   isEdit={edit}
//                   editMode={editMode}
//                   toggleEditMode={toggleEditMode}
//                   handleEdit={handleEdit}
//                   handleCancel={handleCancel}
//                   handleSave={handleSave}
//                 />
//               </h2>
//               <div
//                 id="print-pdf"
//                 className="print:font-inter mt-2 whitespace-pre-line text-base leading-5 print:m-5 print:break-before-page print:break-after-page print:p-5"
//                 ref={componentRef}
//               >
//                 {editMode ? (
//                   <textarea
//                     autoFocus
//                     ref={textareaRef}
//                     rows={output.split("\n").length}
//                     value={editableContent}
//                     className={`mt-1 w-full overflow-y-scroll rounded-lg border-2 border-black focus-visible:border-2 focus-visible:border-black focus-visible:ring-transparent ${
//                       !editMode ? "hidden" : ""
//                     }`}
//                     onChange={(e) => setEditableContent(e.target.value)}
//                     disabled={!editMode}
//                   />
//                 ) : (
//                   formattedOutput
//                 )}
//                 <div className="footer hidden font-bold print:fixed print:bottom-0 print:right-0 print:block print:rounded-lg print:px-4 print:py-1.5 print:text-lg print:tracking-tight">
//                   <Link href="app.teachingtools.ai">
//                     Made with Teaching Tools AI
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <div className="mt-5 flex gap-5">
//         <button
//           onClick={() => handleSaveButton()}
//           disabled={!saveButton}
//           className="w-full rounded-md bg-black px-4 py-2 text-xl font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//         >
//           Save Feedback
//         </button>
//         <button
//           onClick={handlePrint}
//           disabled={disabled}
//           className={cn(
//             "w-full rounded-md bg-black px-4 py-2 text-lg font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//           )}
//         >
//           Download Feedback
//         </button>
//       </div>
//     </div>
//   );
// }

// export function ConceptOutput({
//   output,
//   disabled,
//   editedOutput,
//   edit,
//   saveButton,
//   data,
//   setSave,
//   title,
// }: OutputProps) {
//   const [editableContent, setEditableContent] = useState(output);
//   const [originalOutput, setOriginalOutput] = useState(output);
//   const [editMode, setEditMode] = useState(false);
//   const componentRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `${title} Simplification`,
//     onPrintError: () => alert("there is an error when printing"),
//     pageStyle: "@page { size: A4; margin: 8.5mm; }",
//   });

//   const handleEdit = () => {
//     setOriginalOutput(output);
//     setEditMode(true);
//   };

//   const toggleEditMode = () => {
//     setEditableContent(output);
//     setOriginalOutput(output);
//     setEditMode(!editMode);
//   };

//   const handleSave = () => {
//     editedOutput(editableContent);
//     setOriginalOutput(editableContent);
//     setEditMode(false);
//   };

//   const handleSaveButton = () => {
//     addSavedData(data.id, data.input, data.output, data.type);
//     toast.success("Saved Concept!");
//     setSave(false);
//   };

//   const handleCancel = () => {
//     setEditableContent(originalOutput);
//     setEditMode(false);
//   };

//   return (
//     <div>
//       <div className="mt-10 flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left">
//         <ul role="list" className="-my-5 divide-y divide-gray-200">
//           <li className="py-5">
//             <div className="relative">
//               <h2 className="flex items-baseline justify-between gap-3 text-2xl font-bold tracking-tight text-black">
//                 <div className="flex items-center gap-3">
//                   <span>Output</span>
//                   <CopyButton value={output} />
//                 </div>
//                 <Edit
//                   isEdit={edit}
//                   editMode={editMode}
//                   toggleEditMode={toggleEditMode}
//                   handleEdit={handleEdit}
//                   handleCancel={handleCancel}
//                   handleSave={handleSave}
//                 />
//               </h2>
//               <div
//                 id="print-pdf"
//                 className="print:font-inter mt-2 whitespace-pre-line text-base leading-5 print:m-5 print:break-before-page print:break-after-page print:p-5"
//                 ref={componentRef}
//               >
//                 {editMode ? (
//                   <textarea
//                     autoFocus
//                     ref={textareaRef}
//                     rows={output.split("\n").length}
//                     value={editableContent}
//                     className={`mt-1 w-full overflow-y-scroll rounded-lg border-2 border-black focus-visible:border-2 focus-visible:border-black focus-visible:ring-transparent ${
//                       !editMode ? "hidden" : ""
//                     }`}
//                     onChange={(e) => setEditableContent(e.target.value)}
//                     disabled={!editMode}
//                   />
//                 ) : (
//                   output
//                 )}
//                 <div className="footer hidden font-bold print:fixed print:bottom-0 print:right-0 print:block print:rounded-lg print:px-4 print:py-1.5 print:text-lg print:tracking-tight">
//                   <Link href="app.teachingtools.ai">
//                     Made with Teaching Tools AI
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <div className="mt-5 flex gap-5">
//         <button
//           onClick={() => handleSaveButton()}
//           disabled={!saveButton}
//           className="w-full rounded-md bg-black px-4 py-2 text-xl font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//         >
//           Save Simplification
//         </button>
//         <button
//           onClick={handlePrint}
//           disabled={disabled}
//           className={cn(
//             "w-full rounded-md bg-black px-4 py-2 text-lg font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//           )}
//         >
//           Download Concepts
//         </button>
//       </div>
//     </div>
//   );
// }

// export function QuestionOutput({
//   output,
//   disabled,
//   editedOutput,
//   edit,
//   saveButton,
//   data,
//   setSave,
//   title,
// }: OutputProps) {
//   const [editableContent, setEditableContent] = useState(output);
//   const [originalOutput, setOriginalOutput] = useState(output);
//   const [editMode, setEditMode] = useState(false);
//   const componentRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `${title} Questions`,
//     onPrintError: () => alert("there is an error when printing"),
//     pageStyle: "@page { size: A4; margin: 8.5mm; }",
//   });

//   const handleEdit = () => {
//     setOriginalOutput(output);
//     setEditMode(true);
//   };

//   const toggleEditMode = () => {
//     setEditableContent(output);
//     setOriginalOutput(output);
//     setEditMode(!editMode);
//   };

//   const handleSave = () => {
//     editedOutput(editableContent);
//     setOriginalOutput(editableContent);
//     setEditMode(false);
//   };

//   const handleCancel = () => {
//     setEditableContent(originalOutput);
//     setEditMode(false);
//   };

//   const handleSaveButton = () => {
//     addSavedData(data.id, data.input, data.output, data.type);
//     toast.success("Saved Concept!");
//     setSave(false);
//   };

//   const formattedOutput = output
//     .split("\n")
//     .map((line) => line.trim())
//     .filter((line) => line !== "")
//     .map((line, index) => {
//       const questionMatch = line.match(/^Question (\d+):/);
//       const answerMatch = line.match(/^Answer (\d+):/);
//       if (questionMatch) {
//         const questionNumber = questionMatch[1];
//         const questionText = line.replace(questionMatch[0], "").trim();
//         return (
//           <div key={index}>
//             <p className="mt-4 font-bold">Question {questionNumber}:</p>
//             {questionText}
//           </div>
//         );
//       } else if (answerMatch) {
//         const answerNumber = answerMatch[1];
//         const questionText = line.replace(answerMatch[0], "").trim();
//         return (
//           <div key={index}>
//             <p className="mt-4 font-bold">Answer {answerNumber}:</p>
//             {questionText}
//           </div>
//         );
//       } else if (line.startsWith("Answer Key:")) {
//         return (
//           <div key={index} className="answer-key-section">
//             <p className="mt-2 text-lg font-bold">Answer Key:</p>
//             {line.split("Answer Key:")[1].trim()}
//           </div>
//         );
//       } else if (line.startsWith("Key Concepts:")) {
//         return (
//           <div key={index}>
//             <p className="mt-2 font-bold">Key Concepts:</p>
//             {line.split("Key Concepts:")[1].trim()}
//           </div>
//         );
//       } else {
//         return <p key={index}>{line}</p>;
//       }
//     });

//   useEffect(() => {
//     setEditableContent(output);
//   }, [output]);

//   return (
//     <div>
//       <div className="mt-10 flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left">
//         <ul role="list" className="-my-5 divide-y divide-gray-200">
//           <li className="py-5">
//             <div className="relative">
//               <h2 className="flex items-baseline justify-between gap-3 text-2xl font-bold tracking-tight text-black">
//                 <div className="flex items-center gap-3">
//                   <span>Output</span>
//                   <CopyButton value={output} />
//                 </div>
//                 <Edit
//                   isEdit={edit}
//                   editMode={editMode}
//                   toggleEditMode={toggleEditMode}
//                   handleEdit={handleEdit}
//                   handleCancel={handleCancel}
//                   handleSave={handleSave}
//                 />
//               </h2>
//               <div
//                 id="print-pdf"
//                 className="print:font-inter mt-2 whitespace-pre-line text-base leading-5 print:m-5 print:break-before-page print:break-after-page print:p-5"
//                 ref={componentRef}
//               >
//                 {editMode ? (
//                   <textarea
//                     autoFocus
//                     ref={textareaRef}
//                     rows={output.split("\n").length}
//                     value={editableContent}
//                     className={`mt-1 w-full overflow-y-scroll rounded-lg border-2 border-black focus-visible:border-2 focus-visible:border-black focus-visible:ring-transparent ${
//                       !editMode ? "hidden" : ""
//                     }`}
//                     onChange={(e) => setEditableContent(e.target.value)}
//                     disabled={!editMode}
//                   />
//                 ) : (
//                   formattedOutput
//                 )}
//                 <div className="footer hidden font-bold print:fixed print:bottom-0 print:right-0 print:block print:rounded-lg print:px-4 print:py-1.5 print:text-lg print:tracking-tight">
//                   <Link href="app.teachingtools.ai">
//                     Made with Teaching Tools AI
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <div className="mt-5 flex gap-5">
//         <button
//           onClick={() => handleSaveButton()}
//           disabled={!saveButton}
//           className="w-full rounded-md bg-black px-4 py-2 text-xl font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//         >
//           Save Questions
//         </button>
//         <button
//           onClick={handlePrint}
//           disabled={disabled}
//           className={cn(
//             "w-full rounded-md bg-black px-4 py-2 text-lg font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//           )}
//         >
//           Download Practice Questions
//         </button>
//       </div>
//     </div>
//   );
// }

export function WorksheetOutput({
  output,
  disabled,
  editedOutput,
  edit,
  saveButton,
  data,
  setSave,
  title,
}: OutputProps) {
  const [editableContent, setEditableContent] = useState(output);
  const [originalOutput, setOriginalOutput] = useState(output);
  const [editMode, setEditMode] = useState(false);
  const componentRef = useRef(null);
  const textareaRef = useRef(null);

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: `${title} Worksheet`,
  //   onPrintError: () => alert("there is an error when printing"),
  //   pageStyle: "@page { size: A4; margin: 8.5mm; }",
  // });

  const handleEdit = () => {
    setOriginalOutput(output);
    setEditMode(true);
  };

  const toggleEditMode = () => {
    setEditableContent(output);
    setOriginalOutput(output);
    setEditMode(!editMode);
  };

  const handleSave = () => {
    editedOutput(editableContent);
    setOriginalOutput(editableContent);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditableContent(originalOutput);
    setEditMode(false);
  };

  // const handleSaveButton = () => {
  //   addSavedData(data.id, data.input, data.output, data.type);
  //   toast.success("Saved Concept!");
  //   setSave(false);
  // };

  const formattedOutput = output
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .map((line, index) => {
      const questionMatch = line.match(/^Question (\d+):/);
      if (line.startsWith("Worksheet Title:")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Worksheet:</p>
            {line.split("Worksheet Title:")[1].trim()}
          </div>
        );
      } else if (
        line.startsWith("Section: Multiple Choice Questions (MCQs)") ||
        line.startsWith("Section: MCQs")
      ) {
        const mcqSection =
          line.split("Section: Multiple Choice Questions (MCQs)")[1] ||
          line.split("Section: MCQs")[1];
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Section: MCQs</p>
            {mcqSection?.trim()}
          </div>
        );
      } else if (line.startsWith("Instructions for students:")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Instructions for students:</p>
            {line.split("Instructions for students:")[1].trim()}
          </div>
        );
      } else if (line.startsWith("Section: Short Answer")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Section: Short Answer</p>
            {line.split("Section: Short Answer")[1].trim()}
          </div>
        );
      } else if (line.startsWith("Section: Long Answer")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Section: Long Answer</p>
            {line.split("Section: Long Answer")[1].trim()}
          </div>
        );
      } else if (line.startsWith("Section: True/False")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Section: True/False</p>
            <ul>{line.split("Section: True/False")[1].trim()}</ul>
          </div>
        );
      } else if (line.startsWith("Section: Reflection")) {
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Section: Reflection</p>
            <ul>{line.split("Section: Reflection")[1].trim()}</ul>
          </div>
        );
      } else if (line.startsWith("Answers:")) {
        return (
          <div key={index}>
            <p className="answer-key-section mt-2 text-lg font-bold">
              Answer Key:
            </p>
            <ul>{line.split("Answers:")[1].trim()}</ul>
          </div>
        );
      } else if (questionMatch) {
        const questionNumber = questionMatch[1];
        const questionText = line.replace(questionMatch[0], "").trim();
        // const questionSection =
        //   line.split("Questions")[1] || line.split("Question")[1]
        return (
          <div key={index}>
            <p className="mt-2 font-bold">Question {questionNumber}</p>
            {questionText}
          </div>
        );
      } else {
        return (
          <p className="my-2 whitespace-pre-line leading-5" key={index}>
            {line}
          </p>
        );
      }
    });

  return (
    <div>
      <div className="mt-5 flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          <li className="py-5">
            <div className="relative">
              <h2 className="flex items-baseline justify-between gap-3 text-2xl font-bold tracking-tight text-black">
                <div className="flex items-center gap-3">
                  <span>Output</span>
                  {/* <CopyButton value={output} /> */}
                </div>
                {/* <Edit
                  isEdit={edit}
                  editMode={editMode}
                  toggleEditMode={toggleEditMode}
                  handleEdit={handleEdit}
                  handleCancel={handleCancel}
                  handleSave={handleSave}
                /> */}
              </h2>
              <div
                id="print-pdf"
                className="print:font-inter mt-2 whitespace-pre-line text-base leading-5 print:m-5 print:break-before-page print:break-after-page print:p-5"
                ref={componentRef}
              >
                {editMode ? (
                  <textarea
                    autoFocus
                    ref={textareaRef}
                    rows={output.split("\n").length}
                    value={editableContent}
                    className={`mt-1 w-full overflow-y-scroll rounded-lg border-2 border-black focus-visible:border-2 focus-visible:border-black focus-visible:ring-transparent ${
                      !editMode ? "hidden" : ""
                    }`}
                    onChange={(e) => setEditableContent(e.target.value)}
                    disabled={!editMode}
                  />
                ) : (
                  formattedOutput
                )}
                <div className="footer hidden font-bold print:fixed print:bottom-0 print:right-0 print:block print:rounded-lg print:px-4 print:py-1.5 print:text-lg print:tracking-tight">
                  <Link href="app.teachingtools.ai">
                    Made with Teaching Tools AI
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-5 flex gap-5">
        <button
          // onClick={() => handleSaveButton()}
          disabled={!saveButton}
          className="w-full rounded-md bg-black px-4 py-2 text-xl font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
        >
          Save Worksheet
        </button>
        <button
          // onClick={handlePrint}
          disabled={disabled}
          className={cn(
            "w-full rounded-md bg-black px-4 py-2 text-lg font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
          )}
        >
          Download Worksheet
        </button>
      </div>
    </div>
  );
}

// export function SlideOutput({
//   output,
//   disabled,
//   editedOutput,
//   edit,
//   saveButton,
//   data,
//   setSave,
//   title,
// }: OutputProps) {
//   const [editableContent, setEditableContent] = useState(output);
//   const [originalOutput, setOriginalOutput] = useState(output);
//   const [editMode, setEditMode] = useState(false);
//   const componentRef = useRef(null);
//   const textareaRef = useRef(null);

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `${title} Slide Outline`,
//     onPrintError: () => alert("there is an error when printing"),
//     pageStyle: "@page { size: A4; margin: 8.5mm; }",
//   });

//   const formattedOutput = output
//     .split("\n")
//     .map((line) => line.trim())
//     .filter((line) => line !== "")
//     .map((line, index) => {
//       const slideMatch = line.match(/^Slide (\d+):/);
//       if (line.startsWith("Title:")) {
//         return (
//           <div key={index}>
//             <p className="mt-2 font-bold">Title:</p>
//             {line.split("Title:")[1].trim()}
//           </div>
//         );
//       } else if (line.startsWith("Content:")) {
//         return (
//           <div key={index}>
//             <p className="mt-2 font-bold">Content:</p>
//             {line.split("Content:")[1].trim()}
//           </div>
//         );
//       } else if (slideMatch) {
//         const slideNumber = slideMatch[1];
//         const slideText = line.replace(slideMatch[0], "").trim();
//         return (
//           <div key={index}>
//             <p className="mt-2 font-bold">Slide {slideNumber}:</p>
//             {slideText}
//           </div>
//         );
//       } else {
//         return (
//           <p className="my-1 whitespace-pre-line" key={index}>
//             {line}
//           </p>
//         );
//       }
//     });

//   const handleEdit = () => {
//     setOriginalOutput(output);
//     setEditMode(true);
//   };

//   const toggleEditMode = () => {
//     setEditableContent(output);
//     setOriginalOutput(output);
//     setEditMode(!editMode);
//   };

//   const handleSave = () => {
//     editedOutput(editableContent);
//     setOriginalOutput(editableContent);
//     setEditMode(false);
//   };

//   const handleCancel = () => {
//     setEditableContent(originalOutput);
//     setEditMode(false);
//   };

//   const handleSaveButton = () => {
//     addSavedData(data.id, data.input, data.output, data.type);
//     toast.success("Saved Concept!");
//     setSave(false);
//   };

//   return (
//     <div>
//       <div className="mt-5 flow-root rounded-lg border-2 border-dashed border-gray-900 px-5 py-6 text-left">
//         <ul role="list" className="-my-5 divide-y divide-gray-200">
//           <li className="py-5">
//             <div className="relative">
//               <h2 className="flex items-baseline justify-between gap-3 text-2xl font-bold tracking-tight text-black">
//                 <div className="flex items-center gap-3">
//                   <span>Output</span>
//                   <CopyButton value={output} />
//                 </div>
//                 <Edit
//                   isEdit={edit}
//                   editMode={editMode}
//                   toggleEditMode={toggleEditMode}
//                   handleEdit={handleEdit}
//                   handleCancel={handleCancel}
//                   handleSave={handleSave}
//                 />
//               </h2>
//               <div
//                 id="print-pdf"
//                 className="print:font-inter mt-2 whitespace-pre-line text-base leading-5 print:m-5 print:break-before-page print:break-after-page print:p-5"
//                 ref={componentRef}
//               >
//                 {editMode ? (
//                   <textarea
//                     autoFocus
//                     ref={textareaRef}
//                     rows={output.split("\n").length}
//                     value={editableContent}
//                     className={`mt-1 w-full overflow-y-scroll rounded-lg border-2 border-black focus-visible:border-2 focus-visible:border-black focus-visible:ring-transparent ${
//                       !editMode ? "hidden" : ""
//                     }`}
//                     onChange={(e) => setEditableContent(e.target.value)}
//                     disabled={!editMode}
//                   />
//                 ) : (
//                   formattedOutput
//                 )}
//                 <div className="footer hidden font-bold print:fixed print:bottom-0 print:right-0 print:block print:rounded-lg print:px-4 print:py-1.5 print:text-lg print:tracking-tight">
//                   <Link href="app.teachingtools.ai">
//                     Made with Teaching Tools AI
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <div className="mt-5 flex gap-5">
//         <button
//           onClick={() => handleSaveButton()}
//           disabled={!saveButton}
//           className="w-full rounded-md bg-black px-4 py-2 text-xl font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//         >
//           Save Slide Outline
//         </button>
//         <button
//           onClick={handlePrint}
//           disabled={disabled}
//           className={cn(
//             "w-full rounded-md bg-black px-4 py-2 text-lg font-bold text-white hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:bg-zinc-600"
//           )}
//         >
//           Download Slide Outline
//         </button>
//       </div>
//     </div>
//   );
// }
