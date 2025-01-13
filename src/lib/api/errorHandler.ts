// CHECK NOTES

// ---------------- EXAMPLE FROM DOCS TO FIGURE OUT WHAT KIND OF ERROR IT IS
// if (error) {
//     if ('status' in error) {
//       // you can access all properties of `FetchBaseQueryError` here
//       const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

//       return (
//         <div>
//           <div>An error has occurred:</div>
//           <div>{errMsg}</div>
//         </div>
//       )
//     }
//     // you can access all properties of `SerializedError` here
//     return <div>{error.message}</div>
//   }
