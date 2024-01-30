import React, { useEffect } from 'react';
//bootstrap
import { Col } from 'react-bootstrap';
//csss
import "./PageNavigator.css";
import { useNavigate } from 'react-router-dom';

export const PageNavigator = ({ page }) => {

    const navigate = useNavigate();

    const redirect = (page) => {
        let direction;

        switch (page) {
            case "partidas":
                
                direction = "/games/my-games"
                break;
        
            default:
                break;
        }
        
        navigate(direction);
    };

    return (
        <div className='pageNavigatorDesign text-primary-emphasis p-0 m-1' onClick={() => redirect(page)}>{page + " >"}</div>
    )
};
