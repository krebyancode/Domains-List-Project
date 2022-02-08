import { createContext, useState } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../helpers/firebase";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
  const [domainInfo, setDomainInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const colRef = collection(db, "domains");

  const q = query(colRef, orderBy("createdAt"));

  const getDomains = () => {
    setIsLoading(true);
    getDocs(q)
      .then((snapshot) => {
        let domains = [];
        snapshot.docs.forEach((doc) => {
          domains.push({ ...doc.data(), id: doc.id });
        });
        console.log(domains);
        setDomainInfo(domains);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <BlogContext.Provider value={{ domainInfo, getDomains, isLoading }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
