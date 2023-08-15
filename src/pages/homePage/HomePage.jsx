import React, {useEffect} from 'react';
import bird1 from '../../img/bird1.png'
const HomePage = (props) => {

    useEffect(() => {
        handleScroll()
    }, [])

    function handleScroll(){
        let text = document.getElementById('text')
        let bird1 = document.getElementById('bird1')
        let bird2 = document.getElementById('bird2')
        let forest = document.getElementById('forest')
        let btn = document.getElementById('btn')
        let rocks = document.getElementById('rocks')
        let war = document.getElementById('war')

        window.addEventListener('scroll', function (){
            let value = window.scrollY;

            text.style.top =  40 + value * -0.05 + '%';
            bird1.style.top = value * -1.5 + 'px';
            bird1.style.left = value * 2 + 'px';
            bird2.style.top = value * -1.5 + 'px';
            bird2.style.left = value * -4 + 'px';
            btn.style.marginTop = value * 1.5 + 'px';
            rocks.style.top = value * -0.12 + 'px';
            forest.style.top = value * 0.25 + 'px';
            // header.style.top = value * -0.5 + 'px';
            // war.style.top = 375 + value * -0.12 + 'px';
        });

    }

    return (
        <>
            <section>
                <h2 id="text">
                    <span> Alcazan Forest - mmorpg medieval </span>
                </h2>

                <img src={require('../../img/bird1.png').default} alt="" id="bird1" />
                <img src={require('../../img/bird2.png').default} alt="" id="bird2" />
                {/*<img src="img/moondetour2.png" alt="" id="moon" />*/}
                <img src={require('../../img/sun.png').default} alt="" id="sun" />
                <img src={require('../../img/waterfall2.png').default} alt="" id="forest" />
                <a href="/inscription" id="btn"><span>S'inscrire</span></a>
                <img src={require('../../img/rocks1.png').default} alt="" id="rocks" />
                {/*<img src={require('../img/war.png').default} alt="" id="war" />*/}

            </section>
            <div className="main-content">
                <div className="main-presentation">
                    <div className="homepage-about">
                        <h2 className="homepage-about-title">A propos d'Alcazan Forest </h2>
                        Alcazan Forest est un MMORPG sur navigateur web
                    </div>
                    <div className="homepage-feature">
                        <h2 className="homepage-about-title">Contenu </h2>
                        <ul className="homepage-about-feature-list">
                            <li className="homepage-about-feature-list-element"></li>
                            <li className="homepage-about-feature-list-element"></li>
                            <li className="homepage-about-feature-list-element"></li>
                            <li className="homepage-about-feature-list-element"></li>
                            <li className="homepage-about-feature-list-element"></li>
                            <li className="homepage-about-feature-list-element"></li>
                        </ul>
                    </div>
                </div>


            </div>

            <div className="main-content bg-green">
                <div className="presentation">
                    <h2>Screenshot</h2>
                    <div className="presentation-screenshots">
                        <img className="presentation-screenshot" src="../img/screen1.png" />
                        <img className="presentation-screenshot" src="../img/screen1.png" />
                        <img className="presentation-screenshot" src="../img/screen1.png" />
                        <img className="presentation-screenshot" src="../img/screen1.png" />
                        <img className="presentation-screenshot" src="../img/screen1.png" />
                        <img className="presentation-screenshot" src="../img/screen1.png" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage