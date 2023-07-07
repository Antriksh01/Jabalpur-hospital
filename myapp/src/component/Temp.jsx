// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Temp() {
//   const [data, setData] = useState([]);
//   const [inpt, setInpt] = useState(data);
//   useEffect(() => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/users")
//       .then((res) => setData(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handlesearch = (e) => {
//     setInpt(
//       data.filter((item) => item.name.toLowerCase().includes(e.target.value))
//     );
//   };
//   return (
//     <>
//       <input type="text" placeholder="search" onChange={handlesearch} />
//       <ul>
//         {inpt.map((item) => {
//           return <li key={item.id}>{item.name}</li>;
//         })}
//       </ul>
//     </>
//   );
// }

// export default Temp;
