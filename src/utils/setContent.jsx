import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/errorMessage";
import Skeleton from "../components/skeleton/skeleton";

const setContent = (process, Component, data) => {
  switch (process) {
    case "waiting":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "confirmed":
      return <Component data={data} />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Enexpected process state");
  }
};

export default setContent;
