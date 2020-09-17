import React from 'react'

import { Link } from 'react-router-dom'

import logoImg from '../../asserts/images/logo.svg'
import backImg from '../../asserts/images/icons/back.svg'

import './style.css'

interface PageHeaderProps {
    title: string
    description?: string
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (

        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={backImg} alt="Voltar" />
                </Link>
                <img src={logoImg} alt="" />
            </div>

            <div className="header-content">
                <strong>{props.title}</strong>
                {/* //! essa estrutura e semelhante ao if porem ele so executa se a primeira condicao 
                //! executa se a primeira condicao  for verdadeira */}
                {props.description && <p>{props.description}</p>}
                {props.children}
            </div>
        </header>

    )
}

export default PageHeader