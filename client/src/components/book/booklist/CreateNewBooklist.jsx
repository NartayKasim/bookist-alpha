import Input from "../../common/input/Input";
import classes from "./AddToBooklist.module.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function CreateNewBooklist({
   createNewBooklist,
   booklists,
   availableBooklists,
}) {
   const [newBooklistTitle, setNewBooklistTitle] = useState("");
   const [errorState, setErrorState] = useState("");
   const [disableSubmit, setDisableSubmit] = useState(true);
   const restrictedNames = [
      "Read Books",
      ...booklists.map((booklist) => booklist.booklist_title),
   ];

   const onNewBooklistTitleChange = (val) => {
      setDisableSubmit(false);
      setErrorState("");
      if (restrictedNames.includes(val)) {
         setErrorState("A booklist with that name already exists.");
         setDisableSubmit(true);
      }
      setNewBooklistTitle(val);
   };

   const onCreateNewBooklistClick = () => {
      if (newBooklistTitle.length === 0) {
         setDisableSubmit(true);
         setErrorState("Please type a booklist name above.");
      } else {
         createNewBooklist(newBooklistTitle);
      }
   };

   return (
      <div className={classes.createNewBooklist}>
         <div className={classes.createNewBooklistHeader}>
            <span className={classes.or}>-OR-</span>
            Create New Booklist
         </div>
         <div className={classes.createNewBooklistInput}>
            <Input
               type={"text"}
               onChangeFunc={onNewBooklistTitleChange}
               value={newBooklistTitle}
               id={uuidv4()}
               direction={"column"}
               placeholder="New Booklist"
            />
         </div>
         <div className={classes.errorState}>{errorState}</div>
         <div className={classes.createNewBooklistButtons}>
            <button
               disabled={disableSubmit}
               onClick={() => onCreateNewBooklistClick()}
               className={classes.addToBooklistButton}
            >
               Submit
            </button>
         </div>
      </div>
   );
}
