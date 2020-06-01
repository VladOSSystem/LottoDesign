import React from 'react'
import NavBar, {NavItem, NavLink} from '../../shared/navbar'
import {MobileMenuWrap} from './mobilemenu.stc'

export const MobileMenu = ({menuData}) => {
    return (
        <MobileMenuWrap>
            <NavBar>
                {menuData.map((menu, i) => {
                    return(
                        <NavItem 
                            key={`menu-item-${i}`} 
                            id={`menu-item-${i}`}>
                            {menu.slug !== "lottojackpot.ru" ? <NavLink path={`/page/${menu.slug}`}>{menu.title}</NavLink> :
                         <NavLink path={`/`}>{menu.title}</NavLink>}
                    {menu.child_items !== null ? menu.child_items.map((m) =>{
                        return (
                            <NavLink key={`menu-item${m.title}`} style={{marginLeft:'15px'}} path={`/page/${m.slug}`}>- {m.title}</NavLink>
                        )
                    }
                    ) : ''}
                        </NavItem>
                    )
                })}
            </NavBar>
        </MobileMenuWrap>
    )
}
