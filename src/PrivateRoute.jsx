// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element, user, ...rest }) => {
//   const styles = {
//     padding: "6rem 0 0 26rem",
//     backgroundColor: "#181818",
//     color: "#ffffff",
//     minHeight: "calc(100vh - 6rem)",
//   };

//   return (
//     // <Route
//     // 	{...rest}
//     // 	render={(props) =>
//     // 		user ? (
//     // 			<div style={styles}>
//     // 				<Component {...props} />
//     // 			</div>
//     // 		) : (
//     // 			<Redirect
//     // 				to={{ pathname: "/login", state: { from: props.location } }}
//     // 			/>
//     // 		)
//     // 	}
//     // />

//     <Route
//       {...rest}
//       element={
//         user ? (
//           <div style={styles}>{element}</div>
//         ) : (
//           <Navigate to="/login" state={{ from: rest.location }} replace />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element, user, ...rest }) => {
//   const styles = {
//     padding: "6rem 0 0 26rem",
//     backgroundColor: "#181818",
//     color: "#ffffff",
//     minHeight: "calc(100vh - 6rem)",
//   };

//   return (
//     <Route
//       {...rest}
//       element={
//         user ? (
//           <div style={styles}>{element}</div>
//         ) : (
//           <Navigate to="/login" state={{ from: rest.location }} replace />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element, user }) {
  const styles = {
    padding: "6rem 0 0 26rem",
    backgroundColor: "#181818",
    color: "#ffffff",
    minHeight: "calc(100vh - 6rem)",
  };
  return user ? (
    <div style={styles}>{element}</div>
  ) : (
    <Navigate to="/login" replace />
  );
}
