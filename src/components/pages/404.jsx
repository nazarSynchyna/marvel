import ErrorMessage from "../errorMessage/errorMessage";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <meta name="description" content="This page is not found" />
        <title>This page is not found</title>
      </Helmet>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>
        Page doesn't exist
      </p>
      <button
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
          marginInline: "auto",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#9f0013",
        }}
        onClick={() => navigate(-1)}
      >
        Go back to previous page
      </button>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
