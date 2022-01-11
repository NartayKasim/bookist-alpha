import { useLocation } from "react-router";

export const withRouter = (WrappedComponent) => (props) => {
   const location = useLocation();
   const id = new URLSearchParams(location.search).get("id");
   const author = new URLSearchParams(location.search).get("author");
   const title = new URLSearchParams(location.search).get("title");
   return (
      <WrappedComponent
         {...props}
         author={author}
         title={title}
         id={id}
         location={location}
      />
   );
};
