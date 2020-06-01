import React, {useState} from 'react'
import NavBar, {NavItem, NavLink} from '../../shared/navbar'
import {MainMenuWrap} from './mainmenu.stc'
 
export const MainMenu = ({menuData, ...props}) => {
    const menuarr = menuData; 
    const [open, setOpen] = useState(false);
    const styleMenu = {
        backgroundColor:'white',
        opacity:'0.8',
        borderRadius:'10%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        contentItems:'center',
        flexDirection:'column',
        zIndex:'9999',
        position:'absolute',
        transition: ' 2s'
    }
    return (
        <MainMenuWrap {...props}>  
            <NavBar>
                {menuarr.map((menu, i) => { 
                    return (
                        <NavItem key={`mainmenu-${i}`}>
                        {menu.slug !== "lottojackpot.ru" ? <NavLink path={`/page/${menu.slug}`}>{menu.title}</NavLink> :
                        <NavLink className='icon-button' onMouseEnter={() => setOpen(!open)} onMouseLeave={() => setOpen(false)}  path={`/`}>{menu.title}</NavLink>}
                        {menu.child_items !== null ? (
                        <div style={styleMenu} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                        {open === true && menu.child_items !== null ? menu.child_items.map((m) =>{
                            return (
                                <React.Fragment key={m.slug}>
                                <NavLink key={m.slug} style={{marginTop:'10px',padding:'17px 17px 17px 17px'}} path={`/page/${m.slug}`}><p style={{color:'black'}}>{m.title}</p></NavLink>
                                <hr style={{backgroundColor:'black', height:'1px',width:'80%',margin:'0 auto'}}/>
                                </React.Fragment>
                                )
                            }
                            ) : ''} 
                            </div>) : null}
                        </NavItem>
                    )
                })}     
            </NavBar>
        </MainMenuWrap>
    )
} 