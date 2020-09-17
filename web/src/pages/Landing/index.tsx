import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import logoImg from '../../asserts/images/logo.svg'
import landingImg from '../../asserts/images/landing.svg'
import studyIcon from '../../asserts/images/icons/study.svg'
import giveClassesIcon from '../../asserts/images/icons/give-classes.svg'
import purpleHeartIcon from '../../asserts/images/icons/purple-heart.svg'

import './styles.css'
import { api } from '../../services/api'

function Landing() {

    const [totalConnections, setTotalConnections] = useState(0)

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data

            setTotalConnections(total)
        })
    }, [])

    return (
        <div id='page-landing'>
            <div id="page-landing-content">
                <div className='logo-container'>
                    <img src={logoImg} alt="Proffy" />
                    <h2>Sua plataforma de estudos online</h2>
                </div>

                <img
                    src={landingImg}
                    alt="Plataforma de estudos"
                    className="hero-image"
                />

                <div className="buttons-container">

                    <Link to="/study" className="study" >
                        <img src={studyIcon} alt="Estudar" />
                        Estudar
                    </Link>

                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="" />
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
                </span>
            </div>
        </div>
    )
}

export default Landing