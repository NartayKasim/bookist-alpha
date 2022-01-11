import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import LibraryPage from "./pages/library/LibraryPage";
import SearchPage from "./pages/search/SearchPage";
import BookPage from "./pages/book/BookPage";
// import SettingsPage from "./pages/settings/SettingsPage";
import BooklistPage from "./pages/booklist/BooklistPage";

export default function PageRoutes() {
   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/library" element={<LibraryPage />} />
         <Route path="/booklist" element={<BooklistPage />} />
         <Route
            path="/booklist/?id=:id&title=:booklist_title"
            element={<BooklistPage />}
         />
         <Route path="/search" element={<SearchPage />} />
         <Route path="?query=:searchTerm" element={<SearchPage />} />
         <Route path="/book" element={<BookPage />} />
         <Route
            path="/book/?author=:author&title=:title"
            element={<BookPage />}
         />
         {/* <Route path="/settings" element={<SettingsPage />} /> */}
      </Routes>
   );
}
