import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const getBreadcrumbName = (pathname, state) => {
  const routeNames = {
    '/product-by-category': state?.category_name || 'Category',
    '/product-details': `${state?.category_name || ''} / ${state?.product_name || 'Product'}`,
  };

  return routeNames[pathname] || pathname.slice(1);
};

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((path) => path !== '');

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        {pathNames.map((path, index) => (
          <li key={index} className="breadcrumb-item">
            {index === pathNames.length - 1 ? (
              getBreadcrumbName(location.pathname, location.state)
            ) : (
              <Link to={`/${pathNames.slice(0, index).join('/')}`}>
                {getBreadcrumbName(`/${pathNames.slice(0, index).join('/')}`, null)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;