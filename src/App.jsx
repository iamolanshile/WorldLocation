import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./Pages/ProtectedRoute";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(() => import("./Pages/Homepage"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Login = lazy(() => import("./Pages/Login"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import PageNotFound from "./Pages/PageNotFound";
// import AppLayout from "./Pages/AppLayout";
// import Login from "./Pages/Login";
// import CityList from "./components/CityList";
// import CountryList from "./components/CountryList";
// import City from "./components/City";
// import Form from "./components/Form";
// import { CitiesProvider } from "./contexts/CitiesContext";
// import { AuthProvider } from "./contexts/FakeAuthContext";
// import ProtectedRoute from "./Pages/ProtectedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       <CitiesProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route index element={<Homepage />} />
//             <Route path="product" element={<Product />} />
//             <Route path="pricing" element={<Pricing />} />
//             <Route path="login" element={<Login />} />
//             <Route
//               path="app"
//               element={
//                 <ProtectedRoute>
//                   <AppLayout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<Navigate replace to="cities" />} />
//               <Route path="cities" element={<CityList />} />
//               <Route path="cities/:id" element={<City />} />
//               <Route path="countries" element={<CountryList />} />
//               <Route path="form" element={<Form />} />
//             </Route>
//             <Route path="⭐" element={<PageNotFound />} />
//           </Routes>
//         </BrowserRouter>
//       </CitiesProvider>
//     </AuthProvider>
//   );
// }

// export default App;
