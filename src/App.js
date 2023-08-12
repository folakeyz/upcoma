import RoutesWrapper from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // if ("serviceWorker" in navigator) {
  //   window.addEventListener("load", () => {
  //     navigator.serviceWorker
  //       .register("/service-worker.js")
  //       .then((registration) => {
  //         console.log("ServiceWorker registration successful:", registration);
  //       })
  //       .catch((error) => {
  //         console.log("ServiceWorker registration failed:", error);
  //       });
  //   });
  // }
  return (
    <>
      <RoutesWrapper />
      <ToastContainer />
    </>
  );
}

export default App;
