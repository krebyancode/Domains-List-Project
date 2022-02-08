import AppRouter from "./router/AppRouter";
import "./App.css";
import AuthContextProvider from "./context/AuthContext";
import BlogContextProvider from "./context/BlogContext";

function App() {
  return (
    <div className="App">
      <BlogContextProvider>
        <AuthContextProvider>
          <AppRouter />
        </AuthContextProvider>
      </BlogContextProvider>
    </div>
  );
}

export default App;
