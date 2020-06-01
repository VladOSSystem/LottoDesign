import React from 'react'
import SearchWidget from '../../widgets/search'
import RecentPostWidget from '../../widgets/recent-post'
import InstagramWidget from '../../widgets/instagram'
import {SidebarWrap} from './sidebar.stc'

const Sidebar = () => {
    return (
        <SidebarWrap>
            <SearchWidget/>
            <RecentPostWidget/>
            <InstagramWidget/>
        </SidebarWrap>
    )
}

export default Sidebar
 