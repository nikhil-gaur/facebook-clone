import React from 'react';
import './HeaderApp.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import { Avatar, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import ForumIcon from '@material-ui/icons/Forum';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateValue } from './StateProvider';
import MenuIcon from '@material-ui/icons/Menu';
import Sidebar from './Sidebar';
import MessageSender from './MessageSender';
import Feed from './Feed';
import StoryReel from './StoryReel';


function HeaderApp() {

    function showSidebar() {
        document.getElementsByClassName('sidebar')[0].classList.toggle('sidebarHide');
        document.getElementsByClassName('sidebar')[0].parentNode.childNodes[1].classList.toggle('feedHide');
    
        //.classList.toggle('feedHide');
        
        // .classList.toggle('messageSenderHide');
    }

    const [{user}, dispatch] = useStateValue();

    return (
        <div className="headerApp">
            <div className="headerApp__top">

                <div className="headerApp__top__right">
                    <img src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="Facebook"/>
                </div>
                <div className="headerApp__top__left">
                    <div className="headerApp__input">
                        <SearchIcon fontSize="small"/>
                        <input placeholder="Search Facebook" type="text" />
                    </div>
                    <div>
                        <IconButton>
                            <ForumIcon />
                        </IconButton>
                    </div>
                </div>
            
            </div>

            <div className="headerApp__bottom">
                <div className="headerApp__options headerApp__options--active">
                    <HomeRoundedIcon fontSize="large" />
                </div>
                <div className="headerApp__options">
                    <SubscriptionsOutlinedIcon fontSize="large" />
                </div>
                <div className="headerApp__options">
                <SupervisedUserCircleOutlinedIcon fontSize="large" />
                </div>
                <div className="headerApp__options">
                    <NotificationsActiveOutlinedIcon fontSize="large" />
                </div>
                <div className="headerApp__options" onClick={showSidebar}>
                <div>
                <MenuIcon fontSize="large" />
                </div>
                </div>
               
            </div>
            
        </div>
    )
}

export default HeaderApp;