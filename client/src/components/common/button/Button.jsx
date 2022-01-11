import classes from "./Button.module.css";

export default function Button({ onClickFunc, children }) {
   return (
      <button onClick={() => onClickFunc()} className={classes.buttonWrapper}>
         {children}
      </button>
   );
}
