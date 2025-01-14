import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./components/account/sign-up";
import SignIn from "./components/account/sign-in";
import { Provider } from "react-redux";
import Store from "./store/store";

export default function App() {
  return <>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
}

