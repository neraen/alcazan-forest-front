import React, {useEffect} from 'react';
import bird1 from '../img/bird1.png'
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
            war.style.top = 375 + value * -0.12 + 'px';
        });
    }

    return (
        <>
            <section>
                <h2 id="text">
                    <span> Alcazan Forest </span>
                </h2>

                <img src="../img/bird1.png" alt="" id="bird1" />
                <img src="../img/bird2.png" alt="" id="bird2" />
                {/*<img src="img/moondetour2.png" alt="" id="moon" />*/}
                <img src="../img/sun.png" alt="" id="sun" />
                <img src="../img/waterfall.png" alt="" id="forest" />
                <a href="" id="btn"><span>S'inscrire</span></a>
                <img src="../img/rocks1.png" alt="" id="rocks" />
                <img src="../img/war.png" alt="" id="war" />

            </section>
            <div className="sec">
                <h2>

                </h2>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid, amet aperiam asperiores
                assumenda beatae dicta est explicabo iste laborum magni maiores nobis quia rerum ut vitae voluptate?
                Ipsum, similique
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur dolorum error esse
                    et
                    illum libero molestias odio quam qui rem temporibus unde vero. Dolores dolorum fugit porro quod
                    sunt?
                </p>
                <p>Adipisci, atque corporis cumque debitis dolore dolorem eveniet fugiat illum in itaque iusto libero
                    minus
                    neque non numquam, officiis omnis pariatur quas quasi quibusdam ratione recusandae reiciendis rerum
                    tenetur
                    voluptatem.
                </p>
                <p>Ad culpa ducimus eius, et eveniet ex illum ipsam laborum minima, quia quod repudiandae. A
                    consequuntur
                    eligendi eos error labore laboriosam libero, magni maxime nesciunt perspiciatis rem, sapiente ut
                    voluptas.
                </p>
                <p>Alias, eligendi enim eos iure molestias nostrum optio quas quo? Commodi cupiditate ducimus et eveniet
                    facere harum illum inventore ipsa neque odio provident quaerat quod repudiandae, sequi veritatis,
                    vitae
                    voluptatem.
                </p>
                <p>Adipisci at ducimus et eveniet facilis ipsa iste itaque iusto quasi, rem, rerum, tempora! A aut
                    consequuntur corporis delectus eaque eligendi, id impedit magnam nulla quaerat quam, reprehenderit,
                    rerum
                    sint!
                </p>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid, amet aperiam asperiores
                assumenda beatae dicta est explicabo iste laborum magni maiores nobis quia rerum ut vitae voluptate?
                Ipsum, similique
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur dolorum error esse
                    et
                    illum libero molestias odio quam qui rem temporibus unde vero. Dolores dolorum fugit porro quod
                    sunt?
                </p>
                <p>Adipisci, atque corporis cumque debitis dolore dolorem eveniet fugiat illum in itaque iusto libero
                    minus
                    neque non numquam, officiis omnis pariatur quas quasi quibusdam ratione recusandae reiciendis rerum
                    tenetur
                    voluptatem.
                </p>
                <p>Ad culpa ducimus eius, et eveniet ex illum ipsam laborum minima, quia quod repudiandae. A
                    consequuntur
                    eligendi eos error labore laboriosam libero, magni maxime nesciunt perspiciatis rem, sapiente ut
                    voluptas.
                </p>
                <p>Alias, eligendi enim eos iure molestias nostrum optio quas quo? Commodi cupiditate ducimus et eveniet
                    facere harum illum inventore ipsa neque odio provident quaerat quod repudiandae, sequi veritatis,
                    vitae
                    voluptatem.
                </p>
                <p>Adipisci at ducimus et eveniet facilis ipsa iste itaque iusto quasi, rem, rerum, tempora! A aut
                    consequuntur corporis delectus eaque eligendi, id impedit magnam nulla quaerat quam, reprehenderit,
                    rerum
                    sint!
                </p>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid, amet aperiam asperiores
                assumenda beatae dicta est explicabo iste laborum magni maiores nobis quia rerum ut vitae voluptate?
                Ipsum, similique
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur dolorum error esse
                    et
                    illum libero molestias odio quam qui rem temporibus unde vero. Dolores dolorum fugit porro quod
                    sunt?
                </p>
                <p>Adipisci, atque corporis cumque debitis dolore dolorem eveniet fugiat illum in itaque iusto libero
                    minus
                    neque non numquam, officiis omnis pariatur quas quasi quibusdam ratione recusandae reiciendis rerum
                    tenetur
                    voluptatem.
                </p>
                <p>Ad culpa ducimus eius, et eveniet ex illum ipsam laborum minima, quia quod repudiandae. A
                    consequuntur
                    eligendi eos error labore laboriosam libero, magni maxime nesciunt perspiciatis rem, sapiente ut
                    voluptas.
                </p>
                <p>Alias, eligendi enim eos iure molestias nostrum optio quas quo? Commodi cupiditate ducimus et eveniet
                    facere harum illum inventore ipsa neque odio provident quaerat quod repudiandae, sequi veritatis,
                    vitae
                    voluptatem.
                </p>
                <p>Adipisci at ducimus et eveniet facilis ipsa iste itaque iusto quasi, rem, rerum, tempora! A aut
                    consequuntur corporis delectus eaque eligendi, id impedit magnam nulla quaerat quam, reprehenderit,
                    rerum
                    sint!
                </p>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid, amet aperiam asperiores
                assumenda beatae dicta est explicabo iste laborum magni maiores nobis quia rerum ut vitae voluptate?
                Ipsum, similique
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, aspernatur dolorum error esse
                    et
                    illum libero molestias odio quam qui rem temporibus unde vero. Dolores dolorum fugit porro quod
                    sunt?
                </p>
                <p>Adipisci, atque corporis cumque debitis dolore dolorem eveniet fugiat illum in itaque iusto libero
                    minus
                    neque non numquam, officiis omnis pariatur quas quasi quibusdam ratione recusandae reiciendis rerum
                    tenetur
                    voluptatem.
                </p>
                <p>Ad culpa ducimus eius, et eveniet ex illum ipsam laborum minima, quia quod repudiandae. A
                    consequuntur
                    eligendi eos error labore laboriosam libero, magni maxime nesciunt perspiciatis rem, sapiente ut
                    voluptas.
                </p>
                <p>Alias, eligendi enim eos iure molestias nostrum optio quas quo? Commodi cupiditate ducimus et eveniet
                    facere harum illum inventore ipsa neque odio provident quaerat quod repudiandae, sequi veritatis,
                    vitae
                    voluptatem.
                </p>
                <p>Adipisci at ducimus et eveniet facilis ipsa iste itaque iusto quasi, rem, rerum, tempora! A aut
                    consequuntur corporis delectus eaque eligendi, id impedit magnam nulla quaerat quam, reprehenderit,
                    rerum
                    sint!
                </p>
            </div>
        </>
    )
}

export default HomePage