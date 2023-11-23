import React from 'react';
import { RouteProps } from 'react-router';

const NlAuthorization: React.FC<RouteProps> = ({ children, ...props }) => <div>{children}</div>;
export default NlAuthorization;
