import { Container } from "react-bootstrap"

const Header = () => {
    return (
        <>
            <div className="header text-center text-white fs-2 ">
                <Container>
                    <img src="./public/logo.png" alt="logo" target="logo" className='me-lg-3 ms-lg-1' />
                    <span>Google Keep</span>
                </Container>
            </div>
        </>
    )
}

export default Header