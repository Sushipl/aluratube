import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReaset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";


function HomePage() {


    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu />
                <Header />
                <TimeLine playlists={config.playlists} />
                <Fav favs={config.favoritos}/>
            </div>
        </>
    )
}

/*function Menu(props) {
    return (
        <div>
            {props.children}
        </div>
    )
}*/

const StyledHeader = styled.div`
    img.ft {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    img.banner{
        width: 100%;
        height: 30em;
    }
    .user-info {
        margin-top:50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (
        <StyledHeader>
            <img className="banner" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"/>
            <section className="user-info">
                <img className="ft" src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function TimeLine(props) {
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                <a href={video.url}>
                                    <img src={video.thumb} />
                                    <span>
                                        {video.title}
                                    </span>
                                </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

const Favori = styled.div`
    img.ft {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    section.alinha{
        display: grid;
        margin: 16px;
        text-align: center;
    }
    display: flex;
    padding: 16px;
    
` 
function Fav(props){
    return (
        <Favori>        
            {props.favs.map((e) => {
            return (
                    <section className="alinha">
                        
                        <img className="ft" src={`https://github.com/${e.arroba}.png`}/>
                        <span>@{e.arroba}</span>
                    </section>
                
            )})}
        </Favori>
    )
}

export default HomePage