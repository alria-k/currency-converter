import { useState, useEffect } from "react";

import { getFlags } from "../../api/currency";

export const Converter = () => {
  const [flags, setFlags] = useState([]);

  useEffect(() => {
    getFlags().then((data) => {
      setFlags(data);
    });
  }, []);

  console.log(flags);

  return <div>index</div>;
};
