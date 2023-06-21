// import React, { useMemo } from "react";
// import styled from "styled-components";
// import {
//   StackedCarousel,
//   ResponsiveContainer,
// } from "react-stacked-center-carousel";
// import {
//   BsFillArrowLeftCircleFill,
//   BsFillArrowRightCircleFill,
// } from "react-icons/bs";
// import jbplogo from "../photos/jbplogo.png";
// import pic from "../photos/jbplogo.png";

// export const data = [
//   {
//     UHID: 123,
//     Patient_Name: "Name Of The Patient",
//     Assigned_Doctor: "Name of Assigned Doctor",
//     Department: "Name of the Department",
//     Token_Generated_by: "Name of Receptionist",
//     Token_generated_on_Date: "Current Date & Time",
//     Room_No: "Room No of Assigned Doctor",
//     Counter_No: "Number Of Counter",
//     Token_No: "DEPID_DATE_01",
//   },
//   {
//     UHID: 123,
//     Patient_Name: "Name Of The Patient",
//     Assigned_Doctor: "Name of Assigned Doctor",
//     Department: "Name of the Department",
//     Token_Generated_by: "Name of Receptionist",
//     Token_generated_on_Date: "Current Date & Time",
//     Room_No: "Room No of Assigned Doctor",
//     Counter_No: "Number Of Counter",
//     Token_No: "DEPID_DATE_01",
//   },
//   {
//     UHID: 123,
//     Patient_Name: "Name Of The Patient",
//     Assigned_Doctor: "Name of Assigned Doctor",
//     Department: "Name of the Department",
//     Token_Generated_by: "Name of Receptionist",
//     Token_generated_on_Date: "Current Date & Time",
//     Room_No: "Room No of Assigned Doctor",
//     Counter_No: "Number Of Counter",
//     Token_No: "DEPID_DATE_01",
//   },
//   {
//     UHID: 123,
//     Patient_Name: "Name Of The Patient",
//     Assigned_Doctor: "Name of Assigned Doctor",
//     Department: "Name of the Department",
//     Token_Generated_by: "Name of Receptionist",
//     Token_generated_on_Date: "Current Date & Time",
//     Room_No: "Room No of Assigned Doctor",
//     Counter_No: "Number Of Counter",
//     Token_No: "DEPID_DATE_01",
//   },
//   {
//     UHID: 123,
//     Patient_Name: "Name Of The Patient",
//     Assigned_Doctor: "Name of Assigned Doctor",
//     Department: "Name of the Department",
//     Token_Generated_by: "Name of Receptionist",
//     Token_generated_on_Date: "Current Date & Time",
//     Room_No: "Room No of Assigned Doctor",
//     Counter_No: "Number Of Counter",
//     Token_No: "DEPID_DATE_01",
//   },
//   {
//     UHID: 123,
//     Patient_Name: "Name Of The Patient",
//     Assigned_Doctor: "Name of Assigned Doctor",
//     Department: "Name of the Department",
//     Token_Generated_by: "Name of Receptionist",
//     Token_generated_on_Date: "Current Date & Time",
//     Room_No: "Room No of Assigned Doctor",
//     Counter_No: "Number Of Counter",
//     Token_No: "DEPID_DATE_01",
//   },
//   {
//     UHID: 123,
//     Patient_Name: "Name Of The Patient",
//     Assigned_Doctor: "Name of Assigned Doctor",
//     Department: "Name of the Department",
//     Token_Generated_by: "Name of Receptionist",
//     Token_generated_on_Date: "Current Date & Time",
//     Room_No: "Room No of Assigned Doctor",
//     Counter_No: "Number Of Counter",
//     Token_No: "DEPID_DATE_01",
//   },
// ];

// export default function ResponsiveCarousel(props) {
//   const ref = React.useRef();
//   return (
//     <Container>
//       <div
//         style={{
//           width: "100%",
//           position: "absolute",
//           zIndex: "10",
//           marginBottom: "",
//         }}
//       >
//         <ResponsiveContainer
//           carouselRef={ref}
//           render={(parentWidth, carouselRef) => {
//             return (
//               <StackedCarousel
//                 ref={carouselRef}
//                 autoRotate={false}
//                 slideComponent={Card}
//                 infinite={false}
//                 slideWidth={parentWidth < 800 ? parentWidth - 40 : 500}
//                 carouselWidth={parentWidth}
//                 data={data}
//                 // currentVisibleSlide={currentVisibleSlide}
//                 maxVisibleSlide={3}
//                 useGrabCursor
//               />
//             );
//           }}
//         />
//         <>
//           <span
//             style={{
//               position: "absolute",
//               top: "40%",
//               left: 75,
//               fontSize: "3rem",
//               zIndex: 10,
//             }}
//             size="medium"
//             color="primary"
//             onClick={() => {
//               ref.current?.goBack();
//             }}
//           >
//             <BsFillArrowLeftCircleFill />
//           </span>
//           <span
//             style={{
//               position: "absolute",
//               top: "40%",
//               right: 75,
//               fontSize: "3rem",
//               zIndex: 10,
//             }}
//             size="small"
//             color="primary"
//             onClick={() => {
//               ref.current?.goNext(6);
//             }}
//           >
//             <BsFillArrowRightCircleFill />
//           </span>
//         </>
//       </div>
//     </Container>
//   );
// }

// // Very import to memoize your Slide component otherwise there might be performance issue
// // At minimum your should do a simple React.memo(SlideComponent)
// // If you want the absolute best performance then pass in a custom comparator function like below
// export const Card = (props) => {
//   const { data, dataIndex } = props;
//   const {} = data[dataIndex];
//   return (
// <div
//   style={{
//     width: "100%",
//     height: "100%",
//     // userSelect: "none",
//   }}
//   className="my-slide-component"
// >
//   <div
//     class="card mt-5"
//     style={{ width: "100%", height: "100%", border: "2px solid black" }}
//   >
//     <div
//       class="card-body"
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <img src={jbplogo} alt="Card" className="card-image" />
//       <div className="cardp mt-5 text-start">
//         <p className="fw-bold">UHID : 123</p>
//         <p> Patient Name : Name Of The Patient</p>
//         <p>Assigned Doctor : Name of Assigned Doctor</p>
//         <p>Department : Name of the Department</p>
//         <p>Token Generated by : Name of Receptionist</p>
//         <p>Token generated on Date: Current Date & Time</p>
//         <p>Room No : Room No of Assigned Doctor</p>
//         <p>Counter No : Number Of Counter</p>
//       </div>

//       <div className="card-content mt-5">
//         <h2 className="cardh"> Token No: DEPID_DATE_01</h2>
//       </div>
//     </div>
//   </div>
// </div>
//   );
// };

// const Container = styled.div`
// span {
//   @media (max-width: 500px) {
//     display: none;
//   }
//   @media (max-width: 376px) {
//     display: none;
//   }
// }
// img {
//   @media (max-width: 500px) {
//     width: 18rem;
//   }
//   @media (max-width: 376px) {
//     width: 18rem;
//   }
// }
// `;
