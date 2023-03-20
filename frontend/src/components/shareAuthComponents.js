import Cards from './card'
import SideComponent from './logsSideComponent';
import Buttons from './buttons'

export default function ShareAuth() {
    return (
        <>
            <section style={{marginTop: '70px'}}>
                <div className='grid md:grid-cols-2'>
                    <div className='md:h-screen'>
                        <Buttons />
                        <Cards />
                    </div>
                    <div className=' md:h-screen'>
                        <SideComponent />
                    </div>
                </div>
            </section>
        </>
    );
}