import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReaset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";
import { useEffect, useState } from "react";
import { videoService } from "../src/services/videoService";

function HomePage() {
    const service = videoService();
    const [search, setSearch] = useState("");
    const [playlists, setPlaylists] = useState({})

    useEffect(() => {
        service.getAllVideos()
            .then((dados) => {
                const novasPlaylists = {...playlists}
                dados.data.forEach((video) => {
                    if(!novasPlaylists[video.playlist]) {
                        novasPlaylists[video.playlist] = [];
                    }
                    novasPlaylists[video.playlist].push(video)
                })
                setPlaylists(novasPlaylists)
        });
    }, [])
    
    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu set={setSearch} searchValue={search}/>
                <Header />
                <TimeLine searchValue={search} playlists={playlists} />
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
    background-color: ${({ theme }) => theme.backgroundLevel1};

    img.ft {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {

        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-image: url(${({ bg }) => bg});
    height: 230px;
    width: 100%;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg}/>
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

function TimeLine({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);
    
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {

                                return video.title.toLowerCase().includes(searchValue.toLowerCase())
                            }).map((video) => {
                                return (
                                <a key={video.url+video.id} href={video.url}>
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
                    <section key={e.arroba} className="alinha">
                        
                        <img className="ft" src={`https://github.com/${e.arroba}.png`}/>
                        <span>@{e.arroba}</span>
                    </section>
                
            )})}
        </Favori>
    )
}

export default HomePage