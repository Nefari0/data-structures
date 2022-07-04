import './Home.css'
import '../../Icon/Icon.css'

const Home = (props) => {

    return(<div className='home-container' >

        <svg className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => props.selectView('currentView','docsView')} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>

        <svg className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => props.selectView('currentView','tableView')} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>

        <svg className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => props.selectView('currentView','webDevTools')} >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>

        <svg className='icon' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} onClick={() => props.selectView('currentView','specDocs')}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>

    </div>)
}

export default Home