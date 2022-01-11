import classes from "./Input.module.css";

export default function Input({
   type,
   onChangeFunc,
   placeholder,
   label,
   value,
   id,
   direction,
}) {
   return (
      <div className={classes.inputOuter} style={{ flexDirection: direction }}>
         {label && (
            <label className={classes.label} htmlFor={id}>
               {label}
            </label>
         )}
         <div className={classes.inputWrapper}>
            <input
               id={id}
               className={classes.input}
               type={type}
               onChange={(e) => onChangeFunc(e.target.value)}
               placeholder={placeholder || ""}
               value={value}
            />
         </div>
      </div>
   );
}
