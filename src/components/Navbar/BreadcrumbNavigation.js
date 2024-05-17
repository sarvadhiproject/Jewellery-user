// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const getBreadcrumbName = (pathname, state, pathNames, index) => {
//   if (pathname === '/product-by-category') {
//     return state?.category_name || 'Category';
//   } else if (pathname === '/product-details') {
//     return state?.product_name || 'Product';
//   } else {
//     return pathNames[index] || pathname.slice(1);
//   }
// };

// const BreadcrumbNavigation = () => {
//   const location = useLocation();
//   const [pathNames, setPathNames] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const updatedPathNames = location.pathname.split('/').filter((path) => path !== '');
//     setPathNames(updatedPathNames);
//     setCurrentIndex(updatedPathNames.length - 1);
//   }, [location.pathname]);

//   useEffect(() => {
//     console.log('Navigation index:', currentIndex);
//   }, [currentIndex]);

//   return (
//     <div style={{ backgroundColor: '#FCF9F9', padding: '15px', display: 'flex', alignItems: 'center' }}>
//       <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', marginLeft: '205px', fontFamily: 'Nunito Sans', fontWeight: '600' }}>
//         <ol className="breadcrumb" style={{ marginBottom: '0px' }}>
//           <li className="breadcrumb-item">
//             <Link to="/" style={{ color: 'black' }}>
//               Home
//             </Link>
//           </li>
//           {pathNames.map((path, index) => (
//             <li key={index} className="breadcrumb-item">
//               {index === pathNames.length - 1 ? (
//                 <span>{getBreadcrumbName(location.pathname, location.state, pathNames, index)}</span>
//               ) : (
//                 <Link to={`/${pathNames.slice(0, index + 1).join('/')}`}>
//                   {getBreadcrumbName(location.pathname, location.state, pathNames, index)}
//                 </Link>
//               )}
//             </li>
//           ))}
//         </ol>
//       </nav>
//     </div>
//   );
// };

// export default BreadcrumbNavigation;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// BreadcrumbNavigation.js

const getBreadcrumbName = (pathname, state, pathNames, index) => {
  if (pathname === '/product-by-category') {
    return state?.category_name || 'Category';
  } else if (pathname === '/product-details') {
    return state?.product_name || 'Product';
  } else {
    return pathNames[index];
  }
};

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const [pathNames, setPathNames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updatedPathNames = location.pathname.split('/').filter((path) => path !== '');
    setPathNames([ ...updatedPathNames]); // Add an empty string to represent the root path
    setCurrentIndex(updatedPathNames.length);
  }, [location.pathname]);

  useEffect(() => {
    console.log('Navigation index:', currentIndex);
  }, [currentIndex]);

  return (
    <div style={{ backgroundColor: '#FCF9F9', padding: '15px', display: 'flex', alignItems: 'center' }}>
      <nav aria-label="breadcrumb" style={{ display: 'flex', alignItems: 'center', marginLeft: '205px', fontFamily: 'Nunito Sans', fontWeight: '600' }}>
        <ol className="breadcrumb" style={{ marginBottom: '0px' }}>
          <li className="breadcrumb-item">
            <Link to="/" style={{ color: 'black' }}>
              Home
            </Link>
          </li>
          {pathNames.map((path, index) => (
            <li key={index} className="breadcrumb-item">
              {index === pathNames.length - 1 ? (
                <span>{getBreadcrumbName(location.pathname, location.state, pathNames, index)}</span>
              ) : (
                <Link to={`/${pathNames.slice(1, index + 1).join('/')}`}>
                  {getBreadcrumbName(location.pathname, location.state, pathNames, index)}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default BreadcrumbNavigation;