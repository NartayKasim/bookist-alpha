import PageRoutes from "./routes";
import Navigation from "./components/navigation/Navigation";

function App() {
   return (
      <>
         <nav>
            <Navigation />
         </nav>
         <PageRoutes />
      </>
   );
}

export default App;
