import React, { useState } from "react";
import Navigation from "../organisms/Navigation";
import HeaderBlock from '../organisms/Header';
import Filter from "../organisms/Filter";


const HeaderNav = props => {

    const [mobileOpen, setMobileOpen] = useState(false);
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    return (
        <>
            <HeaderBlock handleDrawerToggle={handleDrawerToggle}></HeaderBlock>
            <Navigation
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            ><Filter isChecked={props.isChecked} /></Navigation>
        </>
    )
}

export default HeaderNav;