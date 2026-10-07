import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/appBanner";
import ComicsList from "../comicsList/comicsList";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
