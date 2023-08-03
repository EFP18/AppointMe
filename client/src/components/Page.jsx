// import Helmet library
import { Helmet } from 'react-helmet-async';


// created Page component to add all other components into, so that the title of each page changes accordingly
function Page({ title, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
}

export default Page;
